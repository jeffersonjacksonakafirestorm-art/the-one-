import { NextResponse } from 'next/server';
import { clearSessionCookie, getCurrentUser } from '@/lib/auth';
import { updateUser } from '@/lib/db';

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (user) await updateUser(user.id, { session_token: null });
    clearSessionCookie();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
