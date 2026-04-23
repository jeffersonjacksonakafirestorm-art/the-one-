import { NextResponse } from 'next/server'
import { getDB } from '@/lib/db'
import { sendVerificationCode } from '@/lib/email'

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const code = generateCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
    const db = getDB()

    await db.from('verification_codes').upsert({
      email: email.toLowerCase(),
      code,
      expires_at: expiresAt,
    }, { onConflict: 'email' })

    await sendVerificationCode(email, code)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('send code error:', err)
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 })
  }
}
