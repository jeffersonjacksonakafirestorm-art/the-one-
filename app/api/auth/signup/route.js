import { NextResponse } from 'next/server';
import { createVerificationCode, getUserByEmail } from '@/lib/db';
import { sendVerificationCode } from '@/lib/email';
import { generateVerificationCode } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, plan, ref } = await req.json();
    if (!email?.includes('@')) return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });

    const code = generateVerificationCode();
    await createVerificationCode(email.toLowerCase(), code);
    await sendVerificationCode(email.toLowerCase(), code);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('signup error:', err);
    return NextResponse.json({ error: 'Failed to send verification code.' }, { status: 500 });
  }
}
