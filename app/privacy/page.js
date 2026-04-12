export const metadata = {
  title: 'Privacy Policy — CallRecoverAI',
}

export default function Privacy() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f8f8f8; color: #222; font-family: 'Inter Tight', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        .nav { display: flex; align-items: center; justify-content: space-between; padding: 0 52px; height: 64px; border-bottom: 1px solid #e8e8e8; background: #f8f8f8; }
        .nav-logo { font-size: 17px; font-weight: 700; text-decoration: none; color: #111; }
        .nav-logo span { color: #6c47ff; }
        .wrap { max-width: 720px; margin: 0 auto; padding: 80px 24px 120px; }
        .label { font-size: 11px; font-weight: 600; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
        h1 { font-size: 42px; font-weight: 800; letter-spacing: -0.03em; color: #0a0a0a; margin-bottom: 8px; }
        .updated { font-size: 13px; color: #aaa; margin-bottom: 64px; }
        h2 { font-size: 18px; font-weight: 700; color: #111; margin-top: 48px; margin-bottom: 12px; letter-spacing: -0.01em; }
        p { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 16px; }
        ul { padding-left: 20px; margin-bottom: 16px; }
        li { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 6px; }
        a { color: #6c47ff; }
        .footer { border-top: 1px solid #e8e8e8; padding: 36px 52px; display: flex; align-items: center; justify-content: space-between; }
        .footer-logo { font-size: 15px; font-weight: 700; color: #111; text-decoration: none; }
        .footer-logo span { color: #6c47ff; }
        .footer-copy { font-size: 12px; color: #ccc; }
        @media (max-width: 600px) { .nav { padding: 0 20px; } .footer { padding: 24px 20px; flex-direction: column; gap: 12px; } }
      `}</style>

      <nav className="nav">
        <a href="/" className="nav-logo">CallRecover<span>AI</span></a>
      </nav>

      <div className="wrap">
        <p className="label">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: April 2025</p>

        <p>CallRecoverAI ("we", "us", or "our") operates the CallRecoverAI service. This policy explains what data we collect, how we use it, and your rights regarding that data.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following information when you use our service:</p>
        <ul>
          <li><strong>Business information:</strong> Business name, owner name, email address, phone number, and industry.</li>
          <li><strong>Customer phone numbers:</strong> Phone numbers of individuals who call your business and are subsequently sent automated text messages.</li>
          <li><strong>Conversation logs:</strong> Text message conversations between the AI and your customers, stored for your review in your dashboard.</li>
          <li><strong>Voicemail audio and transcripts:</strong> Voicemails left for your business number, transcribed and stored for your review.</li>
          <li><strong>Payment information:</strong> Processed securely through Stripe. We do not store credit card numbers.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To operate the missed call text-back service on your behalf</li>
          <li>To generate AI responses to your customers' inquiries</li>
          <li>To transcribe voicemails left for your business</li>
          <li>To send you weekly revenue recovery reports</li>
          <li>To process subscription payments</li>
          <li>To provide your business dashboard and account management</li>
        </ul>

        <h2>3. TCPA Compliance</h2>
        <p>We send text messages only to individuals who have initiated contact by calling your business number. This constitutes implied prior express consent under the Telephone Consumer Protection Act (TCPA). Every first outbound message includes a STOP opt-out instruction. We immediately honor all STOP requests and cease messaging the requesting number.</p>

        <h2>4. Third-Party Service Providers</h2>
        <p>We use the following third-party processors who may access your data only to perform services on our behalf:</p>
        <ul>
          <li><strong>Twilio:</strong> SMS and voice infrastructure. Processes phone numbers and message content to deliver texts.</li>
          <li><strong>Anthropic:</strong> AI model provider. Processes conversation content to generate AI responses.</li>
          <li><strong>Stripe:</strong> Payment processing. Handles all billing and subscription management.</li>
          <li><strong>Supabase:</strong> Database infrastructure. Stores business and conversation data securely.</li>
          <li><strong>Vercel:</strong> Hosting and infrastructure.</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>We retain conversation logs and voicemail transcripts for 90 days by default. Business account information is retained for the duration of your subscription and for 30 days after cancellation, after which it is deleted. You may request deletion at any time by contacting us.</p>

        <h2>6. Data Security</h2>
        <p>Passwords are hashed using bcrypt with a cost factor of 12. All data is transmitted over HTTPS. We do not sell your data or your customers' data to any third party.</p>

        <h2>7. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data at any time. Your customers may opt out of receiving text messages by replying STOP to any message. Contact us at the address below to exercise any of these rights.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this policy from time to time. We will notify you of material changes by email. Continued use of the service after changes constitutes acceptance of the updated policy.</p>

        <h2>9. Contact</h2>
        <p>For privacy-related questions or data requests, contact us at: <a href="mailto:privacy@callrecoverai.com">privacy@callrecoverai.com</a></p>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">CallRecover<span>AI</span></a>
        <p className="footer-copy">&copy; 2025 CallRecoverAI</p>
      </footer>
    </>
  )
}
