import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getStories, createStory } from '@/lib/db';

export async function GET() {
  const stories = await getStories(30);
  return NextResponse.json({ stories });
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!['basic', 'pro'].includes(user.plan)) return NextResponse.json({ error: 'Subscription required.' }, { status: 403 });

  const { title, content, category } = await req.json();
  if (!title?.trim() || !content?.trim()) return NextResponse.json({ error: 'Title and content required.' }, { status: 400 });

  const story = await createStory(user.id, title.trim(), content.trim(), category || 'general');
  return NextResponse.json({ story });
}
