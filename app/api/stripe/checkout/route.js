import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { plan } = await req.json();
    if (!['basic', 'pro'].includes(plan)) return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });

    const session = await createCheckoutSession(user.email, plan, user.id, user.referred_by || null);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
