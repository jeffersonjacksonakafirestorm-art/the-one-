export const metadata = {
  title: 'Terms of Service — CallRecoverAI',
}

export default function Terms() {
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
        <h1>Terms of Service</h1>
        <p className="updated">Last updated: April 2025</p>

        <p>These Terms of Service ("Terms") govern your use of CallRecoverAI ("Service"), operated by CallRecoverAI ("we", "us", "our"). By creating an account or using the Service, you agree to these Terms.</p>

        <h2>1. Eligibility</h2>
        <p>You must be 18 years of age or older, or have full legal authority to enter into agreements on behalf of a business entity, to use this Service. By signing up, you confirm that you meet this requirement. We reserve the right to terminate accounts where this requirement is not met.</p>

        <h2>2. The Service</h2>
        <p>CallRecoverAI provides an AI-powered missed call text-back system. When a customer calls your business phone number and you do not answer, our system sends an automated text message to that caller on your behalf and engages in a qualifying conversation. Additional features include voicemail transcription and weekly revenue recovery reports.</p>
        <p>The Service operates using artificial intelligence. AI responses are automated and may not always be accurate, complete, or appropriate for every situation. You are solely responsible for reviewing conversations in your dashboard and following up with leads directly.</p>

        <h2>3. Free Trial</h2>
        <p>We offer a one-time free trial per business. The trial allows you to experience the Service before providing payment information. The trial is limited to one per business entity, phone number, and email address. We reserve the right to terminate trial accounts that appear to be abusing this policy.</p>

        <h2>4. Subscription and Billing</h2>
        <p>After your free trial, continued use of the Service requires a paid subscription at $225 per month (or the price displayed at the time of signup). Billing occurs monthly on the date your subscription begins. All payments are processed securely through Stripe.</p>
        <p>You authorize us to charge your payment method on file each billing cycle. If a payment fails, we will notify you and may suspend your account until payment is resolved.</p>

        <h2>5. Cancellation Policy</h2>
        <p>You may cancel your subscription at any time from your account dashboard. Upon cancellation, your subscription will remain active until the end of the current billing period. You will not be charged for the next billing cycle. No partial refunds are issued for unused portions of a billing period. After the period ends, your account and data will be deactivated.</p>

        <h2>6. TCPA Compliance — Your Responsibilities</h2>
        <p>By using CallRecoverAI, you confirm and agree that:</p>
        <ul>
          <li>You will only use the Service to send text messages to individuals who have initiated contact with your business by calling your phone number (implied prior express consent).</li>
          <li>You will not use the Service to send unsolicited messages, spam, or messages to purchased phone number lists.</li>
          <li>You acknowledge that our system includes a STOP opt-out in every initial message and immediately honors all opt-out requests.</li>
          <li>You are solely responsible for ensuring your use of the Service complies with the Telephone Consumer Protection Act (TCPA) and all applicable federal, state, and local laws.</li>
        </ul>
        <p>We are not responsible for any TCPA violations resulting from your misuse of the Service.</p>

        <h2>7. No Guarantee of Results</h2>
        <p>Results vary by business, industry, call volume, and market conditions. Any revenue figures or recovery estimates referenced in our marketing materials are illustrative examples only and do not constitute a guarantee of results. Your actual results may be higher or lower.</p>

        <h2>8. Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, CALLRECOVERAI AND ITS OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.</p>
        <p>IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE EXCEED THE AMOUNT YOU PAID TO US IN THE THIRTY (30) DAYS IMMEDIATELY PRECEDING THE CLAIM.</p>

        <h2>9. Dispute Resolution and Arbitration</h2>
        <p>Any dispute, controversy, or claim arising out of or relating to these Terms or the Service shall be resolved by binding individual arbitration, not in a class action or representative proceeding. Arbitration shall be conducted by a mutually agreed-upon arbitrator under the American Arbitration Association (AAA) Consumer Arbitration Rules.</p>
        <p>You waive any right to participate in a class action lawsuit or class-wide arbitration against CallRecoverAI. This arbitration agreement does not apply to claims that may be brought in small claims court.</p>

        <h2>10. Termination</h2>
        <p>We reserve the right to suspend or terminate your account immediately and without notice if you violate these Terms, engage in fraudulent activity, or misuse the Service. Upon termination, your right to use the Service ceases immediately.</p>

        <h2>11. Changes to These Terms</h2>
        <p>We may update these Terms from time to time. We will notify you by email of material changes. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.</p>

        <h2>12. Governing Law</h2>
        <p>These Terms are governed by the laws of the State of Oregon, without regard to conflict of law principles.</p>

        <h2>13. Contact</h2>
        <p>Questions about these Terms: <a href="mailto:legal@callrecoverai.com">legal@callrecoverai.com</a></p>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">CallRecover<span>AI</span></a>
        <p className="footer-copy">&copy; 2025 CallRecoverAI</p>
      </footer>
    </>
  )
}
