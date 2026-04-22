import { NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { updateUser } from '@/lib/db';
import db from '@/lib/db';

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = constructWebhookEvent(body, sig);
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, plan } = session.metadata || {};
        if (!userId) break;
        await updateUser(userId, {
          plan,
          subscription_status: 'active',
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
        });
        break;
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object;
        const { data: users } = await db().from('users').select('id').eq('stripe_subscription_id', sub.id);
        if (users?.length) await updateUser(users[0].id, { subscription_status: sub.status });
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const { data: users } = await db().from('users').select('id').eq('stripe_subscription_id', sub.id);
        if (users?.length) await updateUser(users[0].id, { plan: 'none', subscription_status: 'canceled' });
        break;
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 });
  }
}
