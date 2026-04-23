import { Resend } from 'resend'

export async function sendVerificationCode(email, code) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL || 'hello@actionable.ai'

  await resend.emails.send({
    from,
    to: email,
    subject: `${code} — Your Actionable AI login code`,
    html: `
      <div style="background:#000;color:#fff;font-family:'Inter Tight',system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 32px;">
        <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.02em;margin:0 0 8px;">Actionable AI</h1>
        <p style="color:rgba(255,255,255,0.5);margin:0 0 40px;font-size:13px;">Your financial coach</p>
        <p style="font-size:15px;color:rgba(255,255,255,0.8);margin:0 0 24px;">Here's your login code:</p>
        <div style="background:#fff;color:#000;font-size:42px;font-weight:900;letter-spacing:0.15em;text-align:center;padding:24px;border-radius:12px;margin:0 0 32px;">${code}</div>
        <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  })
}

export async function sendWeeklyReport(email, data) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL || 'hello@actionable.ai'

  await resend.emails.send({
    from,
    to: email,
    subject: `Your weekly progress report — Actionable AI`,
    html: `
      <div style="background:#000;color:#fff;font-family:'Inter Tight',system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 32px;">
        <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.02em;margin:0 0 8px;">Actionable AI</h1>
        <h2 style="font-size:18px;font-weight:600;margin:0 0 32px;color:rgba(255,255,255,0.7);">Your weekly progress</h2>
        <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.5);">MILESTONES COMPLETED</p>
          <p style="margin:0;font-size:36px;font-weight:800;">${data.milestonesCompleted}</p>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.5);">CURRENT STREAK</p>
          <p style="margin:0;font-size:36px;font-weight:800;">${data.streak} days</p>
        </div>
        <p style="font-size:15px;color:rgba(255,255,255,0.7);line-height:1.6;">${data.summary}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/chat" style="display:block;background:#fff;color:#000;text-align:center;padding:16px;border-radius:10px;text-decoration:none;font-weight:700;margin-top:32px;">Continue Your Plan</a>
      </div>
    `,
  })
}
