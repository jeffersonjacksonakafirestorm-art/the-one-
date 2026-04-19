import { getBusinessById, updateBusiness } from '@/lib/db';
import Stripe from 'stripe';

function getBusinessId(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    return decoded.split(':')[0];
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const businessId = getBusinessId(token);
    if (!businessId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const business = await getBusinessById(businessId);
    if (!business) {
      return Response.json({ error: 'Business not found' }, { status: 404 });
    }

    // Trial — no Stripe subscription, just mark cancelled
    if (!business.stripe_subscription_id) {
      await updateBusiness(businessId, {
        plan: 'cancelled',
        cancelled_at: new Date().toISOString(),
      });
      return Response.json({ message: 'Trial cancelled.' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Cancel at period end — customer keeps access until billing period ends
    const subscription = await stripe.subscriptions.update(
      business.stripe_subscription_id,
      { cancel_at_period_end: true }
    );

    const cancelsAt = new Date(subscription.cancel_at * 1000).toISOString();

    await updateBusiness(businessId, {
      plan: 'cancelling',
      cancels_at: cancelsAt,
    });

    return Response.json({
      message: 'Subscription will cancel at end of billing period.',
      cancels_at: cancelsAt,
    });
  } catch (err) {
    console.error('Cancel error:', err);
    return Response.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
