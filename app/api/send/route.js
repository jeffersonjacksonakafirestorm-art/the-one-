import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const fmt = (n) => '$' + Math.round(n).toLocaleString();

export async function POST(req) {
  try {
    const { name, email, practice, surgeons, referrals, caseValue, totalLost, recoveryLow, recoveryHigh } = await req.json();

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Parker at JointSync <parker@jointsyncsystems.com>',
      to: email,
      bcc: 'parker@jointsyncsystems.com',
      subject: `${name}, here's what your practice is leaking — JointSync Analysis`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0A1628;font-family:'Inter Tight',Inter,system-ui,sans-serif;color:#fff;">
  <div style="max-width:580px;margin:0 auto;padding:40px 24px;">

    <div style="margin-bottom:32px;">
      <span style="font-size:18px;font-weight:800;letter-spacing:-0.02em;">Joint<span style="color:#00C9A7;">Sync</span> Systems</span>
    </div>

    <h1 style="font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;margin:0 0 12px;">
      Hi ${name} — here's your<br/>personalized revenue leak analysis.
    </h1>
    <p style="font-size:15px;color:rgba(255,255,255,0.55);line-height:1.7;margin:0 0 32px;">
      Based on ${practice ? `<strong style="color:#fff;">${practice}</strong>'s` : 'your'} numbers — ${surgeons} surgeon${surgeons > 1 ? 's' : ''}, ~${referrals} referrals/week, ${fmt(caseValue)} avg case value — here's what we found.
    </p>

    <!-- Loss Card -->
    <div style="background:rgba(255,59,59,0.08);border:1px solid rgba(255,107,107,0.25);border-radius:14px;padding:28px;margin-bottom:16px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,107,107,0.7);margin-bottom:16px;">What You're Currently Losing</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.75);">Referrals lost per week</td>
          <td style="padding:10px 0;font-size:14px;font-weight:700;text-align:right;color:#FF6B6B;">~${Math.round(referrals * 0.23)}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.75);">Surgical cases missed per week</td>
          <td style="padding:10px 0;font-size:14px;font-weight:700;text-align:right;color:#FF6B6B;">~${Math.round(referrals * 0.23 * 0.5)}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.75);">Staff time lost chasing records</td>
          <td style="padding:10px 0;font-size:14px;font-weight:700;text-align:right;color:#FF6B6B;">$17,160/yr</td>
        </tr>
        <tr>
          <td style="padding:16px 0 4px;font-size:15px;font-weight:700;">Total annual revenue lost</td>
          <td style="padding:16px 0 4px;font-size:24px;font-weight:800;letter-spacing:-0.03em;text-align:right;color:#FF6B6B;">${fmt(totalLost)}+</td>
        </tr>
      </table>
    </div>

    <!-- Recovery Card -->
    <div style="background:rgba(0,201,167,0.08);border:1px solid rgba(0,201,167,0.25);border-radius:14px;padding:28px;margin-bottom:32px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(0,201,167,0.7);margin-bottom:8px;">JointSync Recovery Estimate</div>
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.03em;color:#00C9A7;">${fmt(recoveryLow)} – ${fmt(recoveryHigh)}/yr</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:6px;">Conservative estimate. Your exact number requires an audit call.</div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;background:rgba(0,201,167,0.06);border:1px solid rgba(0,201,167,0.15);border-radius:14px;padding:36px 28px;">
      <h2 style="font-size:20px;font-weight:800;letter-spacing:-0.02em;margin:0 0 10px;">Want your exact numbers?</h2>
      <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;margin:0 0 24px;">
        Book a free 30-minute audit call. I'll map your specific intake workflow, show you exactly where revenue is leaking, and tell you if JointSync is a fit — no pressure.
      </p>
      <a href="https://calendly.com/parkerpiehl/30min" style="display:inline-block;background:#00C9A7;color:#0A1628;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
        Book Free Audit Call →
      </a>
    </div>

    <div style="margin-top:32px;font-size:13px;color:rgba(255,255,255,0.3);line-height:1.7;">
      <strong style="color:rgba(255,255,255,0.6);">Parker Piehl</strong><br/>
      JointSync Systems<br/>
      <a href="mailto:parker@jointsyncsystems.com" style="color:#00C9A7;text-decoration:none;">parker@jointsyncsystems.com</a>
    </div>

    <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:rgba(255,255,255,0.2);">
      JointSync Systems · Clinical Continuity Automation for Orthopedic Practices · HIPAA Compliant
    </div>
  </div>
</body>
</html>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
