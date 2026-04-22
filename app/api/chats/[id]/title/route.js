import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { updateChatTitle } from '@/lib/db';

export async function PATCH(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title } = await req.json();
  await updateChatTitle(params.id, title);
  return NextResponse.json({ ok: true });
}
