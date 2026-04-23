import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getDB } from '@/lib/db'

export async function POST(req) {
  try {
    const user = await getSession()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await req.json()
    const allowed = ['age', 'employment', 'income', 'debt', 'goal', 'risk_tolerance', 'timeline']
    const update = {}
    for (const key of allowed) {
      if (data[key] !== undefined) update[key] = data[key]
    }

    const db = getDB()
    await db.from('users').update(update).eq('id', user.id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
