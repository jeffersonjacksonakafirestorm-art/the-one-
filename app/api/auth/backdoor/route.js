import { NextResponse } from 'next/server';
import { getUserByEmail, createUser, updateUser } from '@/lib/db';
import { generateSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(req) {
  try {
    const { phrase } = await req.json();
    const expected = process.env.BACKDOOR_PHRASE;

    if (!expected || phrase !== expected) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) return NextResponse.json({ error: 'Not configured.' }, { status: 500 });

    let user = await getUserByEmail(adminEmail);
    if (!user) user = await createUser(adminEmail);

    const token = generateSessionToken();
    await updateUser(user.id, { session_token: token, plan: 'pro', subscription_status: 'active' });
    setSessionCookie(token);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('backdoor error:', err);
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }
}
