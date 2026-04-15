import { getWeeklyStats, getBusinessById } from '@/lib/db';
import { sendPulseReport } from '@/lib/email';

// Vercel Cron — runs every Monday at 7am
// vercel.json: { "crons": [{ "path": "/api/cron/pulse", "schedule": "0 7 * * 1" }] }

export async function GET(request) {
  const secret = request.headers.get('Authorization');
  if (process.env.CRON_SECRET && secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get('business_id');

  // If specific business, run for that one. Otherwise this would iterate all.
  if (!businessId) return Response.json({ message: 'Pass business_id param' });

  const business = await getBusinessById(businessId);
  if (!business?.email) return Response.json({ error: 'Business not found' }, { status: 404 });

  const stats = await getWeeklyStats(businessId);
  await sendPulseReport({ to: business.email, businessName: business.business_name, stats });

  return Response.json({ success: true, stats });
}
