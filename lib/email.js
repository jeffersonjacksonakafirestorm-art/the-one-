const RESEND_API_KEY = process.env.RESEND_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://groundwork.vercel.app';

async function send({ to, subject, html, from }) {
  if (!RESEND_API_KEY) {
    console.log('[email] No RESEND_API_KEY — would send to:', to, 'subject:', subject);
    return { id: 'dev-' + Date.now() };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: from || `Groundwork <noreply@groundwork.app>`, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
  return res.json();
}

function unsubLink(customerId) {
  return `${BASE_URL}/unsubscribe?id=${customerId}`;
}

function footer(customerId) {
  return `<p style="font-size:12px;color:#999;margin-top:32px;border-top:1px solid #eee;padding-top:16px;">
    You received this because you previously contacted this business.
    <a href="${unsubLink(customerId)}" style="color:#999;">Unsubscribe</a>
  </p>`;
}

function wrap(body, customerId) {
  return `<!DOCTYPE html><html><body style="font-family:'Inter Tight',system-ui,sans-serif;background:#fff;color:#111;max-width:600px;margin:0 auto;padding:40px 24px;">
    ${body}
    ${footer(customerId)}
  </body></html>`;
}

export async function sendQuoteEmail({ to, businessName, customerName, service, price, jobId, customerId, signature, approveBeforeSend, subject, body }) {
  const emailSubject = subject || `Your quote from ${businessName}`;
  const emailBody = body || `<p>Hi ${customerName},</p>
    <p>Thanks for reaching out! Here's your quote for <strong>${service}</strong>:</p>
    <p style="font-size:28px;font-weight:800;margin:24px 0;">$${price}</p>
    <p>Reply to this email to confirm and get scheduled, or let us know if you have any questions.</p>
    ${signature ? `<p>${signature}</p>` : `<p>— ${businessName}</p>`}`;

  const html = wrap(emailBody, customerId);
  if (approveBeforeSend) return { pending: true, to, subject: emailSubject, html, type: 'quote', jobId, customerId };
  return send({ to, subject: emailSubject, html });
}

export async function sendFollowUpEmail({ to, businessName, customerName, service, jobId, customerId, signature, approveBeforeSend, subject, body }) {
  const emailSubject = subject || `Following up — ${businessName}`;
  const emailBody = body || `<p>Hi ${customerName},</p>
    <p>Just wanted to follow up on the quote we sent for <strong>${service}</strong>. Still interested? We'd love to get you scheduled.</p>
    <p>Reply to this email or give us a call anytime.</p>
    ${signature ? `<p>${signature}</p>` : `<p>— ${businessName}</p>`}`;

  const html = wrap(emailBody, customerId);
  if (approveBeforeSend) return { pending: true, to, subject: emailSubject, html, type: 'followup', jobId, customerId };
  return send({ to, subject: emailSubject, html });
}

export async function sendBookingConfirmation({ to, businessName, customerName, service, customerId, signature }) {
  const subject = `You're booked — ${businessName}`;
  const body = `<p>Hi ${customerName},</p>
    <p>Great news — your <strong>${service}</strong> job is confirmed. We'll be in touch with scheduling details shortly.</p>
    ${signature ? `<p>${signature}</p>` : `<p>— ${businessName}</p>`}`;
  return send({ to, subject, html: wrap(body, customerId) });
}

export async function sendInvoiceEmail({ to, businessName, customerName, service, price, jobId, customerId, signature, approveBeforeSend, subject, body }) {
  const emailSubject = subject || `Invoice from ${businessName}`;
  const emailBody = body || `<p>Hi ${customerName},</p>
    <p>Thank you for choosing ${businessName}! Here's your invoice for <strong>${service}</strong>:</p>
    <p style="font-size:28px;font-weight:800;margin:24px 0;">$${price}</p>
    <p>Please reply to arrange payment. We accept check, Venmo, Zelle, and cash.</p>
    ${signature ? `<p>${signature}</p>` : `<p>— ${businessName}</p>`}`;

  const html = wrap(emailBody, customerId);
  if (approveBeforeSend) return { pending: true, to, subject: emailSubject, html, type: 'invoice', jobId, customerId };
  return send({ to, subject: emailSubject, html });
}

export async function sendInvoiceReminder({ to, businessName, customerName, price, daysPast, customerId, signature }) {
  const subject = `Payment reminder — ${businessName}`;
  const body = `<p>Hi ${customerName},</p>
    <p>Just a friendly reminder that your invoice of <strong>$${price}</strong> from ${businessName} is ${daysPast} days past due.</p>
    <p>Please reply to arrange payment at your earliest convenience. Thank you!</p>
    ${signature ? `<p>${signature}</p>` : `<p>— ${businessName}</p>`}`;
  return send({ to, subject, html: wrap(body, customerId) });
}

export async function sendPulseReport({ to, businessName, stats }) {
  const subject = `Your weekly report — ${businessName}`;
  const body = `<h2 style="font-size:22px;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px;">Weekly Business Pulse</h2>
    <p style="color:#888;margin-bottom:32px;">${businessName}</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #eee;"><strong>Jobs added</strong></td>
        <td style="padding:16px 0;border-bottom:1px solid #eee;text-align:right;font-weight:700;">${stats.total}</td>
      </tr>
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #eee;"><strong>Quotes sent</strong></td>
        <td style="padding:16px 0;border-bottom:1px solid #eee;text-align:right;font-weight:700;">${stats.quoted}</td>
      </tr>
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #eee;"><strong>Jobs booked</strong></td>
        <td style="padding:16px 0;border-bottom:1px solid #eee;text-align:right;font-weight:700;">${stats.booked}</td>
      </tr>
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #eee;"><strong>Close rate</strong></td>
        <td style="padding:16px 0;border-bottom:1px solid #eee;text-align:right;font-weight:700;">${stats.closeRate}%</td>
      </tr>
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #eee;"><strong>Invoiced</strong></td>
        <td style="padding:16px 0;border-bottom:1px solid #eee;text-align:right;font-weight:700;">${stats.invoiced}</td>
      </tr>
      <tr>
        <td style="padding:16px 0;"><strong>Revenue collected</strong></td>
        <td style="padding:16px 0;text-align:right;font-size:22px;font-weight:800;">$${stats.revenue.toLocaleString()}</td>
      </tr>
    </table>
    <p style="margin-top:32px;color:#888;font-size:13px;">Next report: next Monday at 7am.</p>`;
  return send({ to, subject, html: wrap(body, 'owner') });
}

export async function sendReactivationEmail({ to, businessName, customerName, service, monthsAgo, customerId, signature, approveBeforeSend, subject, body }) {
  const emailSubject = subject || `${businessName} — time for your next service?`;
  const emailBody = body || `<p>Hi ${customerName},</p>
    <p>It's been ${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} since we completed your <strong>${service}</strong>. Just checking in to see if you need anything or if it's time for a follow-up.</p>
    <p>Reply to this email and we'll get you taken care of.</p>
    ${signature ? `<p>${signature}</p>` : `<p>— ${businessName}</p>`}`;

  const html = wrap(emailBody, customerId);
  if (approveBeforeSend) return { pending: true, to, subject: emailSubject, html, type: 'reactivation', customerId };
  return send({ to, subject: emailSubject, html });
}
