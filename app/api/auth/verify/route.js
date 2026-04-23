import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getDB } from '@/lib/db'
import { createSession } from '@/lib/session'

export async function POST(req) {
  try {
    const { email, code } = await req.json()
    if (!email || !code) return NextResponse.json({ error: 'Email and code required' }, { status: 400 })

    const db = getDB()

    const { data: codeRow } = await db
      .from('verification_codes')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('code', code)
      .single()

    if (!codeRow) return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
    if (new Date(codeRow.expires_at) < new Date()) return NextResponse.json({ error: 'Code expired. Request a new one.' }, { status: 400 })

    await db.from('verification_codes').delete().eq('email', email.toLowerCase())

    let { data: user } = await db.from('users').select('*').eq('email', email.toLowerCase()).single()
    let isNew = false

    if (!user) {
      const referralCode = Math.random().toString(36).slice(2, 10)
      const refParam = req.headers.get('referer')?.includes('/r/') ? req.headers.get('referer').split('/r/')[1] : null

      const { data: newUser } = await db.from('users').insert({
        email: email.toLowerCase(),
        referral_code: referralCode,
        referred_by: refParam || null,
      }).select().single()

      user = newUser
      isNew = true

      if (refParam) {
        const { data: referrer } = await db.from('users').select('id').eq('referral_code', refParam).single()
        if (referrer) {
          await db.from('referrals').insert({ referrer_id: referrer.id, referred_id: user.id })
        }
      }
    }

    const token = await createSession(user.id)

    const cookieStore = cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    return NextResponse.json({ ok: true, isNew, userId: user.id })
  } catch (err) {
    console.error('verify error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
