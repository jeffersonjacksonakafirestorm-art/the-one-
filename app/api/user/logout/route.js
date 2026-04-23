import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteSession } from '@/lib/session'

export async function POST() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('session')?.value
    if (token) await deleteSession(token)
    cookieStore.delete('session')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
