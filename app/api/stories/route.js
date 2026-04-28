import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  const { data } = await db()
    .from('stories')
    .select('id, title, content, category, flag_count, created_at, user_id')
    .eq('hidden', false)
    .order('created_at', { ascending: false })
    .range(0, 29);
  return NextResponse.json({ stories: data || [] });
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in to share your story.' }, { status: 401 });

  const { title, content, category } = await req.json();
  if (!title?.trim() || !content?.trim()) return NextResponse.json({ error: 'Title and content required.' }, { status: 400 });

  const { data, error } = await db()
    .from('stories')
    .insert({ user_id: user.id, title: title.trim(), content: content.trim(), category: category || 'general' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to post.' }, { status: 500 });
  return NextResponse.json({ story: data });
}
