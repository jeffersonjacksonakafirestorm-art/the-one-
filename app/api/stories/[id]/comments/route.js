import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(req, { params }) {
  const { data: comments } = await db()
    .from('story_comments')
    .select('id, content, created_at, user_id')
    .eq('story_id', params.id)
    .order('created_at', { ascending: true });

  if (!comments?.length) return NextResponse.json({ comments: [] });

  const userIds = [...new Set(comments.map(c => c.user_id))];
  const { data: users } = await db().from('users').select('id, name, email').in('id', userIds);
  const userMap = {};
  for (const u of users || []) userMap[u.id] = u;

  const enriched = comments.map(c => {
    const u = userMap[c.user_id];
    return { ...c, author_name: u?.name || (u?.email ? u.email.split('@')[0] : 'Member') };
  });

  return NextResponse.json({ comments: enriched });
}

export async function POST(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in to comment.' }, { status: 401 });

  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: 'Comment cannot be empty.' }, { status: 400 });

  const { data, error } = await db()
    .from('story_comments')
    .insert({ story_id: params.id, user_id: user.id, content: content.trim().slice(0, 500) })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to post comment.' }, { status: 500 });

  const authorName = user.name || user.email.split('@')[0];
  return NextResponse.json({ comment: { ...data, author_name: authorName } });
}
