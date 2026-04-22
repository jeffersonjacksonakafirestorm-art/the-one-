import { NextResponse } from 'next/server';
import { verifyCode, getUserByEmail, createUser, updateUser } from '@/lib/db';
import { generateSessionToken, setSessionCookie } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req) {
  try {
    const { email, code, plan, ref, login } = await req.json();
    if (!email || !code) return NextResponse.json({ error: 'Email and code required.' }, { status: 400 });

    const valid = await verifyCode(email.toLowerCase(), code);
    if (!valid) return NextResponse.json({ error: 'Invalid or expired code.' }, { status: 400 });

    let user = await getUserByEmail(email.toLowerCase());
    const isNew = !user;

    if (!user) {
      user = await createUser(email.toLowerCase());
      if (ref) {
        const { getUserByReferralCode } = await import('@/lib/db');
        // store referral for later credit after payment
      }
    }

    const token = generateSessionToken();
    user = await updateUser(user.id, { session_token: token });
    setSessionCookie(token);

    if (isNew && !login) {
      sendWelcomeEmail(email.toLowerCase()).catch(() => {});
    }

    return NextResponse.json({ ok: true, isNew });
  } catch (err) {
    console.error('verify error:', err);
    return NextResponse.json({ error: 'Verification failed.' }, { status: 500 });
  }
}
