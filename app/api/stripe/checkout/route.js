import { createCheckoutSession } from '@/lib/stripe';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await createCheckoutSession({
      email,
      successUrl: `${base}/onboarding?session={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${base}/?cancelled=1`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error('[stripe/checkout]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
