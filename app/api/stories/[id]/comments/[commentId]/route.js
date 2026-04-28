import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

export async function DELETE(req, { params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await db()
    .from('story_comments')
    .delete()
    .eq('id', params.commentId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
