import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/session'
import { streamChat } from '@/lib/ai'
import { getDB } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(req) {
  try {
    const user = await getSession()
    if (!user) return NextResponse.json({ messages: [] })

    const db = getDB()
    const { data } = await db
      .from('messages')
      .select('role, content')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(100)

    return NextResponse.json({ messages: data || [] })
  } catch {
    return NextResponse.json({ messages: [] })
  }
}

export async function POST(req) {
  try {
    const { messages, imageBase64, imageMimeType, isTrial } = await req.json()
    const user = await getSession()

    if (!user && !isTrial) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (user) {
      const plan = user.stripe_plan
      if (!plan && !isTrial) {
        return NextResponse.json({ error: 'Subscription required', upgrade: true }, { status: 402 })
      }
    }

    if (isTrial && !user) {
      const cookieStore = cookies()
      const trialUsed = cookieStore.get('trial_used')?.value
      if (trialUsed) {
        return NextResponse.json({ error: 'Trial already used', upgrade: true }, { status: 402 })
      }
    }

    const db = user ? getDB() : null
    const userProfile = user ? user : null

    const stream = await streamChat({ messages, userProfile, imageBase64, imageMimeType })

    let fullText = ''

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            const text = event.delta.text
            fullText += text
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()

        if (user && db) {
          const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
          if (lastUserMsg) {
            await db.from('messages').insert([
              { user_id: user.id, role: 'user', content: lastUserMsg.content },
              { user_id: user.id, role: 'assistant', content: fullText },
            ])
          }
          await db.from('users').update({ last_active: new Date().toISOString() }).eq('id', user.id)
        }

        if (isTrial && !user) {
          const cookieStore = cookies()
          cookieStore.set('trial_used', '1', { maxAge: 365 * 24 * 60 * 60, path: '/' })
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (err) {
    console.error('chat error:', err)
    return NextResponse.json({ error: 'AI unavailable' }, { status: 500 })
  }
}
