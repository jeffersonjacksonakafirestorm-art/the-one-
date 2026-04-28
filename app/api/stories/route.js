import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  const currentUser = await getCurrentUser().catch(() => null);

  const { data: stories } = await db()
    .from('stories')
    .select('id, title, content, created_at, user_id, flag_count')
    .eq('hidden', false)
    .order('created_at', { ascending: false })
    .range(0, 49);

  if (!stories?.length) return NextResponse.json({ stories: [] });

  const storyIds = stories.map(s => s.id);
  const userIds  = [...new Set(stories.map(s => s.user_id))];

  const [usersRes, likesRes, commentsRes] = await Promise.all([
    db().from('users').select('id, name, email').in('id', userIds),
    db().from('story_likes').select('story_id, user_id').in('story_id', storyIds),
    db().from('story_comments').select('story_id').in('story_id', storyIds),
  ]);

  const userMap = {};
  for (const u of usersRes.data || []) userMap[u.id] = u;

  const likeCountMap = {};
  const userLikedSet = new Set();
  for (const l of likesRes.data || []) {
    likeCountMap[l.story_id] = (likeCountMap[l.story_id] || 0) + 1;
    if (currentUser && l.user_id === currentUser.id) userLikedSet.add(l.story_id);
  }

  const commentCountMap = {};
  for (const c of commentsRes.data || []) {
    commentCountMap[c.story_id] = (commentCountMap[c.story_id] || 0) + 1;
  }

  const enriched = stories.map(s => {
    const u = userMap[s.user_id];
    const authorName = u?.name || (u?.email ? u.email.split('@')[0] : 'Member');
    return {
      ...s,
      author_name: authorName,
      like_count: likeCountMap[s.id] || 0,
      comment_count: commentCountMap[s.id] || 0,
      user_liked: userLikedSet.has(s.id),
    };
  });

  return NextResponse.json({ stories: enriched });
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in to share your story.' }, { status: 401 });

  const { title, content } = await req.json();
  if (!title?.trim() || !content?.trim())
    return NextResponse.json({ error: 'Title and content required.' }, { status: 400 });

  const { data, error } = await db()
    .from('stories')
    .insert({ user_id: user.id, title: title.trim(), content: content.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to post.' }, { status: 500 });

  const authorName = user.name || user.email.split('@')[0];
  return NextResponse.json({
    story: { ...data, author_name: authorName, like_count: 0, comment_count: 0, user_liked: false },
  });
}
