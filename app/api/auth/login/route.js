import { NextResponse } from 'next/server';
import { getUserByEmail, createVerificationCode } from '@/lib/db';
import { sendVerificationCode } from '@/lib/email';
import { generateVerificationCode } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email?.includes('@')) return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });

    const user = await getUserByEmail(email.toLowerCase());
    if (!user) return NextResponse.json({ error: 'No account found. Please sign up.' }, { status: 404 });

    const code = generateVerificationCode();
    await createVerificationCode(email.toLowerCase(), code);
    await sendVerificationCode(email.toLowerCase(), code);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('login error:', err);
    return NextResponse.json({ error: 'Failed to send sign-in code.' }, { status: 500 });
  }
}
