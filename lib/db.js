import { createClient } from '@supabase/supabase-js';

let _supabase;
function db() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return _supabase;
}

export default db;

// ── Users ──────────────────────────────────────────────
export async function getUserByEmail(email) {
  const { data } = await db().from('users').select('*').eq('email', email).single();
  return data;
}

export async function getUserBySession(token) {
  if (!token) return null;
  const { data } = await db().from('users').select('*').eq('session_token', token).single();
  return data;
}

export async function createUser(email) {
  const { data, error } = await db().from('users').insert({ email }).select().single();
  if (error) throw error;
  return data;
}

export async function updateUser(id, fields) {
  const { data, error } = await db().from('users').update(fields).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function getUserById(id) {
  const { data } = await db().from('users').select('*').eq('id', id).single();
  return data;
}

// ── Verification codes ─────────────────────────────────
export async function createVerificationCode(email, code) {
  await db().from('verification_codes').delete().eq('email', email);
  const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const { error } = await db().from('verification_codes').insert({ email, code, expires_at });
  if (error) throw error;
}

export async function verifyCode(email, code) {
  const { data, error } = await db()
    .from('verification_codes')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .eq('used', false)
    .gte('expires_at', new Date().toISOString())
    .single();
  if (error) console.error('verifyCode DB error:', error.message, { email, code });
  if (!data) return false;
  await db().from('verification_codes').update({ used: true }).eq('id', data.id);
  return true;
}

// ── Chats ──────────────────────────────────────────────
export async function getChats(userId) {
  const { data } = await db()
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  return data || [];
}

export async function createChat(userId, title = 'New Chat') {
  const { data, error } = await db()
    .from('chats')
    .insert({ user_id: userId, title })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateChatTitle(chatId, title) {
  await db().from('chats').update({ title, updated_at: new Date().toISOString() }).eq('id', chatId);
}

export async function touchChat(chatId) {
  await db().from('chats').update({ updated_at: new Date().toISOString() }).eq('id', chatId);
}

// ── Messages ───────────────────────────────────────────
export async function getMessages(chatId) {
  const { data } = await db()
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });
  return data || [];
}

export async function saveMessage(chatId, role, content, imageUrl = null) {
  const { data, error } = await db()
    .from('messages')
    .insert({ chat_id: chatId, role, content, image_url: imageUrl })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Stories ────────────────────────────────────────────
export async function getStories(limit = 20, offset = 0) {
  const { data } = await db()
    .from('stories')
    .select('id, title, content, category, flag_count, created_at')
    .eq('hidden', false)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  return data || [];
}

export async function createStory(userId, title, content, category = 'general') {
  const { data, error } = await db()
    .from('stories')
    .insert({ user_id: userId, title, content, category })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function flagStory(storyId, userId) {
  const { error } = await db().from('story_flags').insert({ story_id: storyId, user_id: userId });
  if (error) return;
  const { data } = await db().from('stories').select('flag_count').eq('id', storyId).single();
  const newCount = (data?.flag_count || 0) + 1;
  const hidden = newCount >= 3;
  await db().from('stories').update({ flag_count: newCount, hidden }).eq('id', storyId);
}

// ── Free trial ─────────────────────────────────────────
export async function hasUsedFreeTrial(ip) {
  const { data } = await db().from('free_trial_sessions').select('id').eq('ip', ip).single();
  return !!data;
}

export async function recordFreeTrial(ip) {
  await db().from('free_trial_sessions').insert({ ip });
}
