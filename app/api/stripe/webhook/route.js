import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const businessId = session.metadata?.business_id;
        console.log(`Payment completed for business ${businessId}`);
        // TODO: Update business plan to 'active' in database
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`Payment failed for customer ${invoice.customer}`);
        // TODO: Mark business as past_due, send notification
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const businessId = subscription.metadata?.business_id;
        console.log(`Subscription cancelled for business ${businessId}`);
        // TODO: Deactivate business account
        break;
      }

      default:
        // Ignore unhandled events
        break;
    }
  } catch (err) {
    console.error('Stripe webhook handler error:', err);
    return new Response('Handler error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
