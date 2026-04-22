import { Resend } from 'resend';

let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@actionable.ai';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://actionable.ai';

export async function sendVerificationCode(email, code) {
  const r = getResend();
  await r.emails.send({
    from: FROM,
    to: email,
    subject: `${code} — Your Actionable verification code`,
    html: `
      <div style="background:#000;padding:48px 24px;font-family:system-ui,sans-serif;max-width:480px;margin:0 auto">
        <div style="text-align:center;margin-bottom:32px">
          <span style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em">Actionable</span>
        </div>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;padding:40px 32px;text-align:center">
          <p style="color:#888;font-size:14px;margin:0 0 24px">Your verification code</p>
          <div style="font-size:48px;font-weight:900;color:#fff;letter-spacing:12px;margin:0 0 24px">${code}</div>
          <p style="color:#555;font-size:13px;margin:0">Expires in 10 minutes. Do not share this code.</p>
        </div>
        <p style="text-align:center;color:#333;font-size:12px;margin-top:24px">
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email) {
  const r = getResend();
  await r.emails.send({
    from: FROM,
    to: email,
    subject: 'Welcome to Actionable — your plan starts now',
    html: `
      <div style="background:#000;padding:48px 24px;font-family:system-ui,sans-serif;max-width:480px;margin:0 auto">
        <div style="text-align:center;margin-bottom:32px">
          <span style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em">Actionable</span>
        </div>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;padding:40px 32px">
          <h2 style="color:#fff;font-size:24px;font-weight:800;margin:0 0 16px;letter-spacing:-0.02em">You're in.</h2>
          <p style="color:#888;font-size:15px;line-height:1.6;margin:0 0 24px">
            Your personalized plan is ready. Tell Actionable your exact situation — income, debt, goals, timeline — and get a step-by-step roadmap built specifically for you.
          </p>
          <a href="${APP_URL}/chat" style="display:block;background:#fff;color:#000;text-decoration:none;padding:14px;border-radius:10px;font-weight:700;font-size:15px;text-align:center">
            Start Your Session →
          </a>
        </div>
        <p style="text-align:center;color:#333;font-size:12px;margin-top:24px">
          Actionable AI · <a href="${APP_URL}" style="color:#555">actionable.ai</a>
        </p>
      </div>
    `,
  });
}

export async function sendReferralEmail(email, referralCode) {
  const r = getResend();
  const referralUrl = `${APP_URL}/signup?ref=${referralCode}`;
  await r.emails.send({
    from: FROM,
    to: email,
    subject: 'Share Actionable — get a free month',
    html: `
      <div style="background:#000;padding:48px 24px;font-family:system-ui,sans-serif;max-width:480px;margin:0 auto">
        <div style="text-align:center;margin-bottom:32px">
          <span style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em">Actionable</span>
        </div>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;padding:40px 32px">
          <h2 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 12px">Give a month, get a month</h2>
          <p style="color:#888;font-size:14px;line-height:1.6;margin:0 0 20px">Share your link. When a friend subscribes, you both get one month free.</p>
          <div style="background:#111;border:1px solid #222;border-radius:8px;padding:14px;font-family:monospace;font-size:13px;color:#fff;word-break:break-all;margin-bottom:20px">${referralUrl}</div>
          <a href="mailto:?subject=Check out Actionable AI&body=I've been using Actionable AI to build my financial freedom plan. Try it free: ${referralUrl}" style="display:block;background:#fff;color:#000;text-decoration:none;padding:14px;border-radius:10px;font-weight:700;font-size:15px;text-align:center">
            Share Your Link →
          </a>
        </div>
      </div>
    `,
  });
}
