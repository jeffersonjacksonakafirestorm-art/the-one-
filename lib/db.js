/**
 * Database client
 * Uses Supabase when configured, falls back to in-memory store for dev
 */

let supabase = null;

function getSupabase() {
  if (supabase) return supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(url, key);
  return supabase;
}

// In-memory fallback (dev only — data resets on redeploy)
const memStore = {
  businesses: [],
  missed_calls: [],
  conversations: [],
  voicemails: [],
};

export async function createBusiness(data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('businesses').insert(data).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const row = { id: Date.now().toString(), ...data, created_at: new Date().toISOString() };
  memStore.businesses.push(row);
  return row;
}

export async function getBusinessByEmail(email) {
  const db = getSupabase();
  if (db) {
    const { data, error } = await db.from('businesses').select('*').eq('email', email).single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
  }
  return memStore.businesses.find(b => b.email === email) || null;
}

export async function getBusinessByPhone(phone) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('businesses').select('*').eq('twilio_number', phone).single();
    return data;
  }
  return memStore.businesses.find(b => b.twilio_number === phone) || null;
}

export async function getBusinessById(id) {
  const db = getSupabase();
  if (db) {
    const { data } = await db.from('businesses').select('*').eq('id', id).single();
    return data;
  }
  return memStore.businesses.find(b => b.id === id) || null;
}

export async function saveMissedCall(data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('missed_calls').insert(data).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const row = { id: Date.now().toString(), ...data, created_at: new Date().toISOString() };
  memStore.missed_calls.push(row);
  return row;
}

export async function saveConversation(data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('conversations').insert(data).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const row = { id: Date.now().toString(), ...data, created_at: new Date().toISOString() };
  memStore.conversations.push(row);
  return row;
}

export async function saveVoicemail(data) {
  const db = getSupabase();
  if (db) {
    const { data: row, error } = await db.from('voicemails').insert(data).select().single();
    if (error) throw new Error(error.message);
    return row;
  }
  const row = { id: Date.now().toString(), ...data, created_at: new Date().toISOString() };
  memStore.voicemails.push(row);
  return row;
}

export async function getConversationsByBusiness(businessId, limit = 50) {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from('conversations')
      .select('*, missed_calls(*)')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(limit);
    return data || [];
  }
  return memStore.conversations.filter(c => c.business_id === businessId).slice(0, limit);
}

export async function getVoicemailsByBusiness(businessId, limit = 50) {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from('voicemails')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(limit);
    return data || [];
  }
  return memStore.voicemails.filter(v => v.business_id === businessId).slice(0, limit);
}
