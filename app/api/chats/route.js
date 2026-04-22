import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getChats, createChat } from '@/lib/db';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const chats = await getChats(user.id);
  return NextResponse.json({ chats });
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title } = await req.json();
  const chat = await createChat(user.id, title || 'New Chat');
  return NextResponse.json({ chat });
}
