import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getStripe, PLANS } from '@/lib/stripe'

export async function POST(req) {
  try {
    const { plan } = await req.json()
    const user = await getSession()
    const priceId = PLANS[plan]?.priceId
    if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?subscribed=1`,
      cancel_url: `${baseUrl}/subscribe`,
      allow_promotion_codes: true,
    }

    if (user?.stripe_customer_id) {
      params.customer = user.stripe_customer_id
    } else if (user?.email) {
      params.customer_email = user.email
    }

    if (user?.id) {
      params.metadata = { user_id: user.id, plan }
    }

    const session = await stripe.checkout.sessions.create(params)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
