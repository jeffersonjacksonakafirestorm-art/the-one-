import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getDB } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) return NextResponse.json({ completed: [], streak: 0, chatCount: 0 })

    const db = getDB()

    const { data: milestone } = await db.from('milestones').select('completed').eq('user_id', user.id).single()
    const { count: chatCount } = await db.from('messages').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
    const { count: referralCount } = await db.from('referrals').select('*', { count: 'exact', head: true }).eq('referrer_id', user.id)

    const streak = calcStreak(user.last_active)

    return NextResponse.json({
      completed: milestone?.completed || [],
      streak,
      chatCount: chatCount || 0,
      referralCount: referralCount || 0,
      referralCode: user.referral_code,
      plan: user.stripe_plan,
    })
  } catch {
    return NextResponse.json({ completed: [], streak: 0, chatCount: 0 })
  }
}

export async function POST(req) {
  try {
    const user = await getSession()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { completed } = await req.json()
    const db = getDB()

    await db.from('milestones').upsert({ user_id: user.id, completed }, { onConflict: 'user_id' })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

function calcStreak(lastActive) {
  if (!lastActive) return 0
  const diff = Date.now() - new Date(lastActive).getTime()
  if (diff > 2 * 24 * 60 * 60 * 1000) return 0
  return 1
}
