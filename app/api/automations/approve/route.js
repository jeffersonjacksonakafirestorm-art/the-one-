import { getPendingEmails, updateEmailLog } from '@/lib/db';

function getBusinessId(request) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [id] = decoded.split(':');
    return id;
  } catch { return token; }
}

export async function GET(request) {
  const businessId = getBusinessId(request);
  if (!businessId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const emails = await getPendingEmails(businessId);
  return Response.json({ emails });
}

export async function POST(request) {
  const businessId = getBusinessId(request);
  if (!businessId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { email_id, action, subject, html } = await request.json();
  if (!email_id) return Response.json({ error: 'email_id required' }, { status: 400 });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (action === 'dismiss') {
    await updateEmailLog(email_id, { status: 'dismissed' });
    return Response.json({ success: true });
  }

  // Get the pending email
  const pending = await getPendingEmails(businessId);
  const email = pending.find(e => e.id === email_id);
  if (!email) return Response.json({ error: 'Email not found' }, { status: 404 });

  const finalSubject = subject || email.subject;
  const finalHtml = html || email.html;

  if (RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Groundwork <noreply@groundwork.app>', to: email.to, subject: finalSubject, html: finalHtml }),
    });
    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: `Send failed: ${err}` }, { status: 500 });
    }
  } else {
    console.log('[approve] Would send to:', email.to, 'subject:', finalSubject);
  }

  await updateEmailLog(email_id, { status: 'sent', sent_at: new Date().toISOString(), subject: finalSubject });
  return Response.json({ success: true });
}
