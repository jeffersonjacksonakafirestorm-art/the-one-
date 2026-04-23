import Stripe from 'stripe'

let _stripe = null

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return _stripe
}

export const PLANS = {
  basic: {
    name: 'Basic',
    price: 1500,
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: [
      'Unlimited AI coaching chats',
      'Photo & document analysis',
      'Voice input',
      'Progress roadmap & milestones',
      'Community stories access',
      'Chat history',
    ],
  },
  pro: {
    name: 'Pro',
    price: 4900,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Everything in Basic',
      'Weekly AI progress reports',
      'Downloadable financial plan PDF',
      'Priority AI responses',
      'Early access to new features',
    ],
  },
}
