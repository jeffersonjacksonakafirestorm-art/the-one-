import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { flagStory } from '@/lib/db';

export async function POST(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await flagStory(params.id, user.id);
  return NextResponse.json({ ok: true });
}
