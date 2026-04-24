import { Resend } from 'resend'

export async function sendVerificationCode(email, code) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  await resend.emails.send({
    from,
    to: email,
    subject: `${code} — Your No Collar login code`,
    html: `
      <div style="background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 32px;">
        <h1 style="font-size:26px;font-weight:800;letter-spacing:-0.02em;margin:0 0 6px;">No Collar</h1>
        <p style="color:rgba(255,255,255,0.4);margin:0 0 40px;font-size:13px;">AI employees that work while you sleep</p>
        <p style="font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 24px;">Here's your login code:</p>
        <div style="background:#fff;color:#000;font-size:42px;font-weight:900;letter-spacing:0.15em;text-align:center;padding:24px;border-radius:12px;margin:0 0 32px;">${code}</div>
        <p style="font-size:13px;color:rgba(255,255,255,0.35);margin:0;">Expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  })
}

export async function sendWeeklyReport(email, data) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  await resend.emails.send({
    from,
    to: email,
    subject: `Your weekly report — No Collar`,
    html: `
      <div style="background:#0a0a0a;color:#fff;font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 32px;">
        <h1 style="font-size:26px;font-weight:800;letter-spacing:-0.02em;margin:0 0 6px;">No Collar</h1>
        <h2 style="font-size:18px;font-weight:600;margin:0 0 32px;color:rgba(255,255,255,0.6);">Your weekly summary</h2>
        <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:24px;margin-bottom:16px;">
          <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.4);letter-spacing:0.06em;text-transform:uppercase;">Agents run</p>
          <p style="margin:0;font-size:36px;font-weight:800;">${data.milestonesCompleted}</p>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.4);letter-spacing:0.06em;text-transform:uppercase;">Active streak</p>
          <p style="margin:0;font-size:36px;font-weight:800;">${data.streak} days</p>
        </div>
        <p style="font-size:15px;color:rgba(255,255,255,0.65);line-height:1.65;">${data.summary}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/home" style="display:block;background:#fff;color:#000;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;margin-top:32px;font-size:15px;">Open No Collar</a>
      </div>
    `,
  })
}
