import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { updateUser } from '@/lib/db';

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { answers } = await req.json();
    await updateUser(user.id, { onboarding_data: answers, onboarding_complete: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('onboarding error:', err);
    return NextResponse.json({ error: 'Failed to save onboarding data.' }, { status: 500 });
  }
}
