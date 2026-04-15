import { getJobsForFollowUp, updateJob, getBusinessById, logEmail } from '@/lib/db';
import { sendFollowUpEmail } from '@/lib/email';
import { draftFollowUp } from '@/lib/ai';

// Vercel Cron — runs every hour
// vercel.json: { "crons": [{ "path": "/api/cron/followup", "schedule": "0 * * * *" }] }

export async function GET(request) {
  const secret = request.headers.get('Authorization');
  if (process.env.CRON_SECRET && secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobs = await getJobsForFollowUp();
  let processed = 0;

  for (const job of jobs) {
    try {
      const business = job.businesses || await getBusinessById(job.business_id);
      if (!business || !job.customer_email) continue;

      const prefs = business.ai_preferences || null;
      const approveBeforeSend = business.approve_before_send !== false;
      const signature = business.email_signature || '';

      const draft = await draftFollowUp(business.business_name, job.customer_name, job.service, prefs);
      const result = await sendFollowUpEmail({
        to: job.customer_email,
        businessName: business.business_name,
        customerName: job.customer_name,
        service: job.service,
        jobId: job.id,
        customerId: job.customer_id,
        signature,
        approveBeforeSend,
        subject: draft.subject,
        body: draft.body,
      });

      if (result?.pending) {
        await logEmail({ business_id: job.business_id, job_id: job.id, customer_id: job.customer_id, to: job.customer_email, subject: result.subject, html: result.html, type: 'followup', status: 'pending' });
      }

      await updateJob(job.id, { followup_sent_at: new Date().toISOString() });
      processed++;
    } catch (err) {
      console.error('Follow-up error for job', job.id, err);
    }
  }

  return Response.json({ success: true, processed });
}
