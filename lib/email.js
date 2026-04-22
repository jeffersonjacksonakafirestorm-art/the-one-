const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendEmail({ to, subject, text, html, from }) {
  if (!RESEND_API_KEY) {
    console.log('[email] No RESEND_API_KEY — would send to:', to, 'subject:', subject);
    return { id: 'dev-' + Date.now() };
  }
  const body = html || `<p>${text?.replace(/\n/g, '<br>') || ''}</p>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: from || 'SetterBot <noreply@setterbot.ai>',
      to,
      subject,
      html: body,
    }),
  });
  if (!res.ok) throw new Error(`Resend: ${await res.text()}`);
  return res.json();
}
