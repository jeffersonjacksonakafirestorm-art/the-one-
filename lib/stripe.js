import Stripe from 'stripe';

let stripe;
export function getStripe() {
  if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripe;
}

export const PLANS = {
  basic: {
    name: 'Basic',
    price: 15,
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: [
      'Unlimited AI coaching sessions',
      'Photo & document analysis',
      'Voice input',
      'Full chat history',
      'Progress roadmap',
      'Community stories access',
      'Mobile app (PWA)',
    ],
  },
  pro: {
    name: 'Pro',
    price: 49,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Everything in Basic',
      'Weekly AI progress reports',
      'Priority response speed',
      'Downloadable financial plans',
      'Referral program (give & get free months)',
      'Early access to new features',
    ],
  },
};

export async function createCheckoutSession(email, plan, userId, referralCode = null) {
  const s = getStripe();
  const priceId = PLANS[plan]?.priceId;
  if (!priceId) throw new Error('Invalid plan');

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const session = await s.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId, plan, referralCode: referralCode || '' },
    success_url: `${appUrl}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/subscribe`,
    allow_promotion_codes: true,
  });

  return session;
}

export async function createBillingPortalSession(customerId) {
  const s = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const session = await s.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}/dashboard`,
  });
  return session;
}

export function constructWebhookEvent(body, sig) {
  return getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
}
