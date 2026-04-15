let _supabase = null;

function getSupabase() {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const { createClient } = require('@supabase/supabase-js');
  _supabase = createClient(url, key);
  return _supabase;
}

// In-memory fallback for dev / when Supabase not configured
const mem = { businesses: [], customers: [], jobs: [], emails_log: [], service_menu: [], email_prefs: [] };

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function now() { return new Date().toISOString(); }

// ── Businesses ────────────────────────────────────────────────
export async function createBusiness(data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('businesses').insert(data).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const row = { id: uid(), ...data, created_at: now() };
  mem.businesses.push(row);
  return row;
}

export async function getBusinessByEmail(email) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('businesses').select('*').eq('email', email).single();
    return data;
  }
  return mem.businesses.find(b => b.email === email) || null;
}

export async function getBusinessById(id) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('businesses').select('*').eq('id', id).single();
    return data;
  }
  return mem.businesses.find(b => b.id === id) || null;
}

export async function updateBusiness(id, data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('businesses').update(data).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const idx = mem.businesses.findIndex(b => b.id === id);
  if (idx > -1) mem.businesses[idx] = { ...mem.businesses[idx], ...data };
  return mem.businesses[idx];
}

// ── Customers ─────────────────────────────────────────────────
export async function createCustomer(data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('customers').insert(data).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const row = { id: uid(), ...data, created_at: now() };
  mem.customers.push(row);
  return row;
}

export async function getCustomersByBusiness(businessId) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('customers').select('*').eq('business_id', businessId).order('created_at', { ascending: false });
    return data || [];
  }
  return mem.customers.filter(c => c.business_id === businessId);
}

export async function getCustomerById(id) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('customers').select('*').eq('id', id).single();
    return data;
  }
  return mem.customers.find(c => c.id === id) || null;
}

export async function updateCustomer(id, data) {
  const db = getSupabase();
  if (db) {
    const { data: row } = await db.from('customers').update(data).eq('id', id).select().single();
    return row;
  }
  const idx = mem.customers.findIndex(c => c.id === id);
  if (idx > -1) mem.customers[idx] = { ...mem.customers[idx], ...data };
  return mem.customers[idx];
}

// ── Jobs ──────────────────────────────────────────────────────
export async function createJob(data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('jobs').insert(data).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const row = { id: uid(), ...data, created_at: now(), updated_at: now() };
  mem.jobs.push(row);
  return row;
}

export async function getJobsByBusiness(businessId) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('jobs').select('*, customers(*)').eq('business_id', businessId).order('created_at', { ascending: false });
    return data || [];
  }
  return mem.jobs.filter(j => j.business_id === businessId);
}

export async function updateJob(id, data) {
  const db = getSupabase();
  const updates = { ...data, updated_at: now() };
  if (db) {
    const { data: row, error } = await db.from('jobs').update(updates).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const idx = mem.jobs.findIndex(j => j.id === id);
  if (idx > -1) mem.jobs[idx] = { ...mem.jobs[idx], ...updates };
  return mem.jobs[idx];
}

export async function getJobsForFollowUp() {
  const db = getSupabase();
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  if (db) {
    const { data } = await db.from('jobs').select('*, businesses(*), customers(*)').eq('status', 'quoted').lt('quote_sent_at', cutoff).is('followup_sent_at', null);
    return data || [];
  }
  return mem.jobs.filter(j => j.status === 'quoted' && j.quote_sent_at < cutoff && !j.followup_sent_at);
}

export async function getJobsDueReactivation() {
  const db = getSupabase();
  const today = new Date().toISOString().split('T')[0];
  if (db) {
    const { data } = await db.from('jobs').select('*, businesses(*), customers(*)').eq('status', 'paid').not('reactivation_date', 'is', null).lte('reactivation_date', today).is('reactivation_sent_at', null);
    return data || [];
  }
  return mem.jobs.filter(j => j.status === 'paid' && j.reactivation_date && j.reactivation_date <= today && !j.reactivation_sent_at);
}

// ── Email Log ────────────────────────────────────────────────
export async function logEmail(data) {
  const db = getSupabase();
  if (db) {
    await db.from('emails_log').insert(data);
    return;
  }
  mem.emails_log.push({ id: uid(), ...data, created_at: now() });
}

export async function getPendingEmails(businessId) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('emails_log').select('*').eq('business_id', businessId).eq('status', 'pending').order('created_at', { ascending: false });
    return data || [];
  }
  return mem.emails_log.filter(e => e.business_id === businessId && e.status === 'pending');
}

export async function updateEmailLog(id, data) {
  const db = getSupabase();
  if (db) {
    await db.from('emails_log').update(data).eq('id', id);
    return;
  }
  const idx = mem.emails_log.findIndex(e => e.id === id);
  if (idx > -1) mem.emails_log[idx] = { ...mem.emails_log[idx], ...data };
}

// ── Weekly stats ─────────────────────────────────────────────
export async function getWeeklyStats(businessId) {
  const db = getSupabase();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  if (db) {
    const { data: jobs } = await db.from('jobs').select('*').eq('business_id', businessId).gte('created_at', weekAgo);
    return calcStats(jobs || []);
  }
  const jobs = mem.jobs.filter(j => j.business_id === businessId && j.created_at >= weekAgo);
  return calcStats(jobs);
}

function calcStats(jobs) {
  const quoted = jobs.filter(j => ['quoted', 'booked', 'in_progress', 'complete', 'invoiced', 'paid'].includes(j.status)).length;
  const booked = jobs.filter(j => ['booked', 'in_progress', 'complete', 'invoiced', 'paid'].includes(j.status)).length;
  const invoiced = jobs.filter(j => ['invoiced', 'paid'].includes(j.status)).length;
  const paid = jobs.filter(j => j.status === 'paid').length;
  const revenue = jobs.filter(j => j.status === 'paid').reduce((s, j) => s + (parseFloat(j.price) || 0), 0);
  const closeRate = quoted > 0 ? Math.round((booked / quoted) * 100) : 0;
  return { total: jobs.length, quoted, booked, invoiced, paid, revenue, closeRate };
}
