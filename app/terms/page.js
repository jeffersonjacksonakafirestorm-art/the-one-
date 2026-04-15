export const metadata = { title: 'Terms of Service — CallRecoverAI' }

const s = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #000; color: #fff; font-family: 'Inter Tight', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 720px; margin: 0 auto; padding: 80px 24px 120px; }
  a.logo { font-size: 17px; font-weight: 800; text-decoration: none; color: #fff; display: inline-block; margin-bottom: 56px; }
  .tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 12px; }
  h1 { font-size: 40px; font-weight: 800; letter-spacing: -0.03em; color: #fff; margin-bottom: 8px; line-height: 1.1; }
  .updated { font-size: 13px; color: #888; margin-bottom: 56px; }
  h2 { font-size: 18px; font-weight: 700; color: #fff; margin: 48px 0 12px; border-left: 3px solid #444; padding-left: 14px; letter-spacing: -0.01em; }
  p { font-size: 15px; color: #888; line-height: 1.75; margin-bottom: 16px; }
  ul { padding-left: 20px; margin-bottom: 16px; }
  li { font-size: 15px; color: #888; line-height: 1.75; margin-bottom: 6px; }
  strong { color: #fff; }
  .box { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px 28px; margin: 24px 0; }
  .box-important { background: #0a0a0a; border: 1px solid #333; border-radius: 12px; padding: 28px 32px; margin: 28px 0; }
  .box-important h3 { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.06em; }
  hr { border: none; border-top: 1px solid #1a1a1a; margin: 48px 0; }
  .footer-box { border: 1px solid #1a1a1a; border-radius: 12px; padding: 28px 32px; margin-top: 56px; }
  .footer-box h3 { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; }
  a { color: #fff; }
`;

export default function Terms() {
  return (
    <>
      <style>{s}</style>
      <div className="wrap">
        <a href="/" className="logo">CallRecoverAI</a>
        <p className="tag">Legal</p>
        <h1>Terms of Service</h1>
        <p className="updated">Last Updated: April 2026</p>

        <p>These Terms of Service (&quot;Terms&quot;) govern your access to and use of CallRecoverAI (&quot;Service,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By creating an account or using the Service, you agree to these Terms in full.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using CallRecoverAI, you confirm that you are at least <strong>18 years of age</strong> or have legal authority to bind the business entity you represent, and that you have read and agree to these Terms. If you do not agree, do not use the Service.</p>

        <h2>2. Description of Service</h2>
        <p>CallRecoverAI is an AI-powered missed call text-back service. When a caller dials your registered business number and the call goes unanswered, our system automatically sends an SMS to the caller on your behalf, using AI to qualify the lead and maintain the conversation.</p>
        <p>The Service includes:</p>
        <ul>
          <li>Automated SMS text-back to missed callers</li>
          <li>AI-driven lead qualification conversations</li>
          <li>Voicemail transcription</li>
          <li>A business dashboard showing recovered calls and conversations</li>
          <li>Weekly performance email reports</li>
        </ul>

        <h2>3. Free Trial</h2>
        <p>New accounts receive a one-time free trial. The trial is limited to <strong>one per business entity</strong>. Creating multiple accounts to obtain additional trials is prohibited and may result in permanent termination of all associated accounts.</p>

        <h2>4. Subscription and Billing</h2>
        <div className="box">
          <p><strong>Price:</strong> $225.00 per month (USD)</p>
          <p><strong>Billing:</strong> Monthly, charged automatically at the start of each billing period</p>
          <p><strong>Payment processor:</strong> Stripe, Inc. — we do not store your card details</p>
          <p style={{ marginBottom: 0 }}><strong>Cancellation:</strong> You may cancel at any time. Cancellation takes effect at the end of the current billing period. You retain full access until that date.</p>
        </div>
        <p>We reserve the right to change pricing with 30 days&apos; advance written notice to your registered email address.</p>

        <h2>5. TCPA Compliance — Your Responsibility</h2>
        <p>You are solely responsible for ensuring that your use of the Service complies with the Telephone Consumer Protection Act (TCPA) and all applicable federal and state laws governing automated text messages.</p>
        <p>CallRecoverAI sends text messages only to individuals who have placed an inbound call to your registered business number, which constitutes implied consent under current TCPA guidance. However:</p>
        <ul>
          <li>You are responsible for any consent requirements specific to your business or industry</li>
          <li>You must not manipulate the Service to contact individuals who have not called your number</li>
          <li>All STOP opt-out requests are honored automatically and immediately</li>
          <li>You must not circumvent or disable the opt-out mechanism</li>
        </ul>
        <p>CallRecoverAI is not responsible for TCPA violations arising from your misuse of the Service.</p>

        <h2>6. Prohibited Uses</h2>
        <p>You may not use CallRecoverAI to:</p>
        <ul>
          <li>Send unsolicited or spam text messages</li>
          <li>Contact individuals who have not called your registered business number</li>
          <li>Engage in harassment, fraud, or any illegal activity</li>
          <li>Impersonate another business or individual</li>
          <li>Violate any applicable federal, state, or local law</li>
          <li>Reverse-engineer, scrape, or otherwise attempt to extract the underlying software or AI models</li>
        </ul>

        <h2>7. No Guarantee of Results</h2>
        <div className="box-important">
          <h3>Disclaimer</h3>
          <p>Testimonials, case studies, and revenue figures shown on our website represent individual results and are not guarantees of future performance. <strong>Results vary significantly</strong> based on your industry, call volume, lead quality, response rate, and other factors outside our control. CallRecoverAI does not guarantee any specific number of recovered leads, booked jobs, or revenue outcomes.</p>
        </div>

        <h2>8. Limitation of Liability</h2>
        <div className="box-important">
          <h3>Important — Please Read</h3>
          <p>To the maximum extent permitted by applicable law, <strong>CallRecoverAI&apos;s total liability to you for any claim arising out of or relating to these Terms or the Service shall not exceed the amount you paid us in the 30 days immediately preceding the event giving rise to the claim.</strong></p>
          <p>We are not liable for any indirect, incidental, consequential, special, or punitive damages, including lost profits, lost revenue, loss of data, or business interruption, even if we have been advised of the possibility of such damages.</p>
        </div>

        <h2>9. Binding Arbitration</h2>
        <div className="box-important">
          <h3>Arbitration Agreement</h3>
          <p>Any dispute, claim, or controversy arising out of or relating to these Terms or the Service — including questions about the existence, validity, or termination of these Terms — shall be resolved by <strong>binding individual arbitration</strong>, not in court.</p>
          <p><strong>You waive your right to participate in a class action lawsuit or class-wide arbitration.</strong> All claims must be brought in an individual capacity only.</p>
          <p>Arbitration shall be conducted by a mutually agreed-upon arbitrator in [STATE] under the rules of the American Arbitration Association (AAA). The arbitrator&apos;s decision is final and binding.</p>
        </div>

        <h2>10. Termination</h2>
        <p>We may suspend or terminate your account at our discretion if you violate these Terms, engage in fraudulent activity, or cause harm to other users or to our systems. You may terminate your account at any time by cancelling your subscription in the dashboard.</p>
        <p>Upon termination, your access ends at the conclusion of the current billing period. Conversation logs and data are deleted per our <a href="/privacy">Privacy Policy</a> retention schedule.</p>

        <h2>11. Modifications to Terms</h2>
        <p>We may update these Terms at any time. Material changes will be communicated to your registered email address with at least 14 days&apos; notice. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.</p>

        <h2>12. Governing Law</h2>
        <p>These Terms are governed by the laws of the State of [STATE], without regard to its conflict of laws provisions. Any arbitration or legal proceeding shall take place in [STATE].</p>

        <hr />

        <div className="footer-box">
          <h3>Questions?</h3>
          <p>If you have questions about these Terms, contact us at <a href="mailto:support@callrecoverai.com">support@callrecoverai.com</a>.</p>
          <p style={{ marginBottom: 0 }}><a href="/privacy">Privacy Policy</a></p>
        </div>
      </div>
    </>
  );
}
