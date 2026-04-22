import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getMessages } from '@/lib/db';

export async function GET(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const messages = await getMessages(params.id);
  return NextResponse.json({ messages });
}
