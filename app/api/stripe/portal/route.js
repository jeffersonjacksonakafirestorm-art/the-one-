import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getStripe } from '@/lib/stripe'

export async function POST() {
  try {
    const user = await getSession()
    if (!user || !user.stripe_customer_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${baseUrl}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('portal error:', err)
    return NextResponse.json({ error: 'Portal failed' }, { status: 500 })
  }
}
