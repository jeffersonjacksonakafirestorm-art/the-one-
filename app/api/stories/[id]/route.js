import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

export async function DELETE(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await db()
    .from('stories')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, content } = await req.json();
  if (!title?.trim() || !content?.trim()) return NextResponse.json({ error: 'Title and content required.' }, { status: 400 });

  const { data, error } = await db()
    .from('stories')
    .update({ title: title.trim(), content: content.trim() })
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ story: data });
}
