import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getDB } from '@/lib/db'

export async function GET() {
  try {
    const db = getDB()
    const { data } = await db
      .from('stories')
      .select('id, content, created_at')
      .eq('hidden', false)
      .order('created_at', { ascending: false })
      .limit(50)
    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(req) {
  try {
    const user = await getSession()
    if (!user) return NextResponse.json({ error: 'Sign in to post' }, { status: 401 })

    const { content } = await req.json()
    if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 })
    if (content.length > 500) return NextResponse.json({ error: 'Max 500 characters' }, { status: 400 })

    const db = getDB()
    const { data, error } = await db.from('stories').insert({
      user_id: user.id,
      content: content.trim(),
      hidden: false,
      flag_count: 0,
    }).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('story post error:', err)
    return NextResponse.json({ error: 'Failed to post' }, { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const action = searchParams.get('action')

    if (action === 'flag' && id) {
      const db = getDB()
      const { data: story } = await db.from('stories').select('flag_count').eq('id', id).single()
      const newCount = (story?.flag_count || 0) + 1
      await db.from('stories').update({
        flag_count: newCount,
        hidden: newCount >= 3,
      }).eq('id', id)
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
