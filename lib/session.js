import { cookies } from 'next/headers'
import { getDB } from './db'

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return null

  const db = getDB()
  const { data } = await db
    .from('sessions')
    .select('user_id, expires_at, users(*)')
    .eq('token', token)
    .single()

  if (!data) return null
  if (new Date(data.expires_at) < new Date()) return null

  return data.users
}

export async function createSession(userId) {
  const db = getDB()
  const token = crypto.randomUUID() + crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  await db.from('sessions').insert({
    token,
    user_id: userId,
    expires_at: expiresAt.toISOString(),
  })

  return token
}

export async function deleteSession(token) {
  const db = getDB()
  await db.from('sessions').delete().eq('token', token)
}
