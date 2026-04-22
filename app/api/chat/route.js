import { NextResponse } from 'next/server';
import { streamChat } from '@/lib/ai';
import { getCurrentUser } from '@/lib/auth';
import { saveMessage, getMessages, touchChat } from '@/lib/db';

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!['basic', 'pro'].includes(user.plan) || user.subscription_status !== 'active') {
      return NextResponse.json({ error: 'Subscription required.' }, { status: 403 });
    }

    const { chatId, messages, imageBase64, imageMediaType } = await req.json();
    if (!chatId || !messages?.length) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg.role !== 'user') return NextResponse.json({ error: 'Last message must be from user.' }, { status: 400 });

    await saveMessage(chatId, 'user', lastUserMsg.content, null);

    const aiMessages = messages.slice(-20);
    const stream = await streamChat(aiMessages, imageBase64 || null, imageMediaType || null);

    let fullContent = '';

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta?.type === 'text_delta') {
              const text = chunk.delta.text;
              fullContent += text;
              controller.enqueue(encoder.encode(text));
            }
          }
        } finally {
          controller.close();
          await saveMessage(chatId, 'assistant', fullContent);
          await touchChat(chatId);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error('chat error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
