import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getDB } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getDB()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata?.user_id
    const plan = session.metadata?.plan

    if (userId) {
      await db.from('users').update({
        stripe_customer_id: session.customer,
        stripe_plan: plan,
        stripe_subscription_id: session.subscription,
      }).eq('id', userId)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object
    await db.from('users').update({
      stripe_plan: null,
      stripe_subscription_id: null,
    }).eq('stripe_customer_id', sub.customer)
  }

  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object
    const priceId = sub.items?.data[0]?.price?.id
    const db2 = getDB()
    let plan = null
    if (priceId === process.env.STRIPE_BASIC_PRICE_ID) plan = 'basic'
    if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'pro'
    if (plan) {
      await db2.from('users').update({ stripe_plan: plan }).eq('stripe_customer_id', sub.customer)
    }
  }

  return NextResponse.json({ received: true })
}
