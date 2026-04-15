import { getJobsDueReactivation, updateJob, logEmail } from '@/lib/db';
import { sendReactivationEmail } from '@/lib/email';
import { draftReactivation } from '@/lib/ai';

// Vercel Cron — runs every day at 8am
// vercel.json: { "crons": [{ "path": "/api/cron/reactivation", "schedule": "0 8 * * *" }] }

function getSeason() {
  const m = new Date().getMonth();
  if (m < 3) return 'winter';
  if (m < 6) return 'spring';
  if (m < 9) return 'summer';
  return 'fall';
}

function monthsAgo(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  return Math.round((now - then) / (1000 * 60 * 60 * 24 * 30));
}

export async function GET(request) {
  const secret = request.headers.get('Authorization');
  if (process.env.CRON_SECRET && secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobs = await getJobsDueReactivation();
  let processed = 0;

  for (const job of jobs) {
    try {
      const business = job.businesses;
      if (!business || !job.customer_email) continue;

      const prefs = business.ai_preferences || null;
      const approveBeforeSend = business.approve_before_send !== false;
      const signature = business.email_signature || '';
      const months = monthsAgo(job.updated_at || job.created_at);
      const season = getSeason();

      const draft = await draftReactivation(business.business_name, job.customer_name, job.service, months, season, prefs);
      const result = await sendReactivationEmail({
        to: job.customer_email,
        businessName: business.business_name,
        customerName: job.customer_name,
        service: job.service,
        monthsAgo: months,
        customerId: job.customer_id,
        signature,
        approveBeforeSend,
        subject: draft.subject,
        body: draft.body,
      });

      if (result?.pending) {
        await logEmail({ business_id: job.business_id, job_id: job.id, customer_id: job.customer_id, to: job.customer_email, subject: result.subject, html: result.html, type: 'reactivation', status: 'pending' });
      }

      // Schedule next reactivation at 6 months if this was the 30-day one
      const nextDate = new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      await updateJob(job.id, { reactivation_sent_at: new Date().toISOString(), reactivation_date: nextDate });
      processed++;
    } catch (err) {
      console.error('Reactivation error for job', job.id, err);
    }
  }

  return Response.json({ success: true, processed });
}
