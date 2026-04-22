import { createClient } from '@supabase/supabase-js';

let _db = null;

function getDB() {
  if (_db) return _db;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _db = createClient(url, key);
  return _db;
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function now() { return new Date().toISOString(); }

// ── In-memory fallback for dev ────────────────────────────────
const mem = {
  clients: [],
  leads: [],
  messages: [],
  agent_actions: [],
  appointments: [],
};

// ── Clients ────────────────────────────────────────────────────
export async function getClientByEmail(email) {
  const db = getDB();
  if (db) {
    const { data } = await db.from('clients').select('*').eq('email', email).single();
    return data;
  }
  return mem.clients.find(c => c.email === email) || null;
}

export async function getClientById(id) {
  const db = getDB();
  if (db) {
    const { data } = await db.from('clients').select('*').eq('id', id).single();
    return data;
  }
  return mem.clients.find(c => c.id === id) || null;
}

export async function getClientByPhone(phone) {
  const db = getDB();
  if (db) {
    const { data } = await db.from('clients').select('*').eq('twilio_phone', phone).single();
    return data;
  }
  return mem.clients.find(c => c.twilio_phone === phone) || null;
}

export async function upsertClient(data) {
  const db = getDB();
  if (db) {
    const { data: row, error } = await db.from('clients').upsert(data, { onConflict: 'email' }).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const idx = mem.clients.findIndex(c => c.email === data.email);
  if (idx > -1) {
    mem.clients[idx] = { ...mem.clients[idx], ...data };
    return mem.clients[idx];
  }
  const row = { id: uid(), ...data, created_at: now() };
  mem.clients.push(row);
  return row;
}

export async function updateClient(id, data) {
  const db = getDB();
  if (db) {
    const { data: row } = await db.from('clients').update(data).eq('id', id).select().single();
    return row;
  }
  const idx = mem.clients.findIndex(c => c.id === id);
  if (idx > -1) mem.clients[idx] = { ...mem.clients[idx], ...data };
  return mem.clients[idx];
}

// ── Leads ──────────────────────────────────────────────────────
export async function createLead(data) {
  const db = getDB();
  const row = { id: uid(), status: 'new', message_count: 0, ...data, created_at: now(), updated_at: now() };
  if (db) {
    const { data: saved, error } = await db.from('leads').insert(row).select().single();
    if (error) throw new Error(error.message);
    return saved;
  }
  mem.leads.push(row);
  return row;
}

export async function getLeadById(id) {
  const db = getDB();
  if (db) {
    const { data } = await db.from('leads').select('*').eq('id', id).single();
    return data;
  }
  return mem.leads.find(l => l.id === id) || null;
}

export async function getLeadByPhone(clientId, phone) {
  const db = getDB();
  if (db) {
    const { data } = await db.from('leads').select('*').eq('client_id', clientId).eq('phone', phone).order('created_at', { ascending: false }).limit(1).single();
    return data;
  }
  return mem.leads.findLast(l => l.client_id === clientId && l.phone === phone) || null;
}

export async function getLeadsByClient(clientId, { limit = 50, status } = {}) {
  const db = getDB();
  if (db) {
    let q = db.from('leads').select('*').eq('client_id', clientId).order('created_at', { ascending: false }).limit(limit);
    if (status) q = q.eq('status', status);
    const { data } = await q;
    return data || [];
  }
  let leads = mem.leads.filter(l => l.client_id === clientId);
  if (status) leads = leads.filter(l => l.status === status);
  return leads.slice(0, limit);
}

export async function updateLead(id, data) {
  const db = getDB();
  const updates = { ...data, updated_at: now() };
  if (db) {
    const { data: row } = await db.from('leads').update(updates).eq('id', id).select().single();
    return row;
  }
  const idx = mem.leads.findIndex(l => l.id === id);
  if (idx > -1) mem.leads[idx] = { ...mem.leads[idx], ...updates };
  return mem.leads[idx];
}

export async function findOrCreateLead({ clientId, phone, email, name, channel }) {
  let lead = phone ? await getLeadByPhone(clientId, phone) : null;
  if (!lead && email) {
    const db = getDB();
    if (db) {
      const { data } = await db.from('leads').select('*').eq('client_id', clientId).eq('email', email).limit(1).single();
      lead = data;
    } else {
      lead = mem.leads.findLast(l => l.client_id === clientId && l.email === email) || null;
    }
  }
  if (!lead) {
    lead = await createLead({ client_id: clientId, phone, email, name, channel });
  }
  return lead;
}

// ── Messages ──────────────────────────────────────────────────
export async function saveMessage({ leadId, role, content, channel }) {
  const db = getDB();
  const row = { id: uid(), lead_id: leadId, role, content, channel, created_at: now() };
  if (db) {
    await db.from('messages').insert(row);
    await db.from('leads').update({ message_count: db.raw?.('message_count + 1') || undefined, updated_at: now() }).eq('id', leadId);
  } else {
    mem.messages.push(row);
    const idx = mem.leads.findIndex(l => l.id === leadId);
    if (idx > -1) mem.leads[idx].message_count = (mem.leads[idx].message_count || 0) + 1;
  }
  return row;
}

export async function getMessages(leadId, limit = 30) {
  const db = getDB();
  if (db) {
    const { data } = await db.from('messages').select('*').eq('lead_id', leadId).order('created_at', { ascending: true }).limit(limit);
    return data || [];
  }
  return mem.messages.filter(m => m.lead_id === leadId).slice(-limit);
}

// ── Agent Actions ─────────────────────────────────────────────
export async function logAction({ clientId, leadId, type, description, metadata }) {
  const db = getDB();
  const row = { id: uid(), client_id: clientId, lead_id: leadId, action_type: type, description, metadata: metadata || null, created_at: now() };
  if (db) {
    await db.from('agent_actions').insert(row);
  } else {
    mem.agent_actions.push(row);
  }
  return row;
}

export async function getRecentActions(clientId, limit = 50) {
  const db = getDB();
  if (db) {
    const { data } = await db.from('agent_actions').select('*').eq('client_id', clientId).order('created_at', { ascending: false }).limit(limit);
    return data || [];
  }
  return mem.agent_actions.filter(a => a.client_id === clientId).slice(-limit).reverse();
}

// ── Appointments ──────────────────────────────────────────────
export async function saveAppointment({ clientId, leadId, calendlyEventId, meetingTime }) {
  const db = getDB();
  const row = { id: uid(), client_id: clientId, lead_id: leadId, calendly_event_id: calendlyEventId, meeting_time: meetingTime, status: 'scheduled', created_at: now() };
  if (db) {
    await db.from('appointments').insert(row);
  } else {
    mem.appointments.push(row);
  }
  return row;
}

export async function getAppointmentCount(clientId) {
  const db = getDB();
  if (db) {
    const { count } = await db.from('appointments').select('*', { count: 'exact', head: true }).eq('client_id', clientId).eq('status', 'scheduled');
    return count || 0;
  }
  return mem.appointments.filter(a => a.client_id === clientId && a.status === 'scheduled').length;
}

// ── Dashboard Stats ───────────────────────────────────────────
export async function getDashboardStats(clientId) {
  const db = getDB();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  if (db) {
    const [{ count: totalLeads }, { count: newLeads }, { count: meetings }, { data: actions }] = await Promise.all([
      db.from('leads').select('*', { count: 'exact', head: true }).eq('client_id', clientId),
      db.from('leads').select('*', { count: 'exact', head: true }).eq('client_id', clientId).gte('created_at', weekAgo),
      db.from('appointments').select('*', { count: 'exact', head: true }).eq('client_id', clientId),
      db.from('agent_actions').select('*').eq('client_id', clientId).gte('created_at', weekAgo).order('created_at', { ascending: false }).limit(100),
    ]);

    const smsSent = (actions || []).filter(a => a.action_type === 'sms_sent').length;
    const emailSent = (actions || []).filter(a => a.action_type === 'email_sent').length;
    const qualified = (actions || []).filter(a => a.action_type === 'lead_qualified').length;

    return { totalLeads: totalLeads || 0, newLeads: newLeads || 0, meetings: meetings || 0, smsSent, emailSent, qualified };
  }

  const allLeads = mem.leads.filter(l => l.client_id === clientId);
  const weekLeads = allLeads.filter(l => l.created_at >= weekAgo);
  const allActions = mem.agent_actions.filter(a => a.client_id === clientId && a.created_at >= weekAgo);

  return {
    totalLeads: allLeads.length,
    newLeads: weekLeads.length,
    meetings: mem.appointments.filter(a => a.client_id === clientId).length,
    smsSent: allActions.filter(a => a.action_type === 'sms_sent').length,
    emailSent: allActions.filter(a => a.action_type === 'email_sent').length,
    qualified: allActions.filter(a => a.action_type === 'lead_qualified').length,
  };
}
