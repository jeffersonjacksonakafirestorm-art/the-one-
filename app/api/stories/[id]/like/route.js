import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

export async function POST(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in to like stories.' }, { status: 401 });

  const { data: existing } = await db()
    .from('story_likes')
    .select('id')
    .eq('story_id', params.id)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    await db().from('story_likes').delete().eq('id', existing.id);
  } else {
    await db().from('story_likes').insert({ story_id: params.id, user_id: user.id });
  }

  const { count } = await db()
    .from('story_likes')
    .select('*', { count: 'exact', head: true })
    .eq('story_id', params.id);

  return NextResponse.json({ liked: !existing, like_count: count || 0 });
}
