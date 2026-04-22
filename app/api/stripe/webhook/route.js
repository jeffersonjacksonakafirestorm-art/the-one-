import { constructWebhookEvent } from '@/lib/stripe';
import { upsertClient, updateClient, getClientByEmail } from '@/lib/db';

export async function POST(req) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = constructWebhookEvent(payload, sig);
  } catch (err) {
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await upsertClient({
          email: session.customer_email,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          subscription_status: 'active',
          agent_enabled: true,
        });
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object;
        const client = await getClientByEmail(sub.customer_email);
        if (client) {
          await updateClient(client.id, {
            subscription_status: sub.status,
            agent_enabled: sub.status === 'active' || sub.status === 'trialing',
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const client = await getClientByEmail(sub.customer_email);
        if (client) {
          await updateClient(client.id, {
            subscription_status: 'cancelled',
            agent_enabled: false,
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error('[stripe webhook handler]', err);
  }

  return Response.json({ received: true });
}

export const config = { api: { bodyParser: false } };
