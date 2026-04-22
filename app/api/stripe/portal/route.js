import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createBillingPortalSession } from '@/lib/stripe';

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!user.stripe_customer_id) return NextResponse.json({ error: 'No billing account.' }, { status: 400 });

    const session = await createBillingPortalSession(user.stripe_customer_id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('portal error:', err);
    return NextResponse.json({ error: 'Failed to open billing portal.' }, { status: 500 });
  }
}
