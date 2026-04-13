export default function PrivacyPolicy() {
  const styles = {
    page: {
      backgroundColor: '#07080b',
      color: '#efefef',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '0',
      margin: '0',
    },
    container: {
      maxWidth: '860px',
      margin: '0 auto',
      padding: '60px 32px 100px',
    },
    header: {
      borderBottom: '1px solid #1e2030',
      paddingBottom: '32px',
      marginBottom: '48px',
    },
    logo: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#6c47ff',
      letterSpacing: '-0.5px',
      marginBottom: '24px',
      display: 'block',
    },
    h1: {
      fontSize: '40px',
      fontWeight: '700',
      color: '#efefef',
      margin: '0 0 12px',
      letterSpacing: '-0.5px',
      lineHeight: '1.15',
    },
    updated: {
      color: '#888',
      fontSize: '14px',
      margin: '0',
    },
    h2: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#efefef',
      margin: '48px 0 16px',
      borderLeft: '3px solid #6c47ff',
      paddingLeft: '14px',
    },
    p: {
      fontSize: '16px',
      lineHeight: '1.75',
      color: '#c8c8d0',
      margin: '0 0 16px',
    },
    ul: {
      margin: '0 0 16px',
      paddingLeft: '24px',
    },
    li: {
      fontSize: '16px',
      lineHeight: '1.75',
      color: '#c8c8d0',
      marginBottom: '6px',
    },
    accent: {
      color: '#6c47ff',
      fontWeight: '600',
    },
    highlight: {
      backgroundColor: '#0f1120',
      border: '1px solid #1e2030',
      borderRadius: '8px',
      padding: '20px 24px',
      margin: '24px 0',
    },
    highlightText: {
      fontSize: '15px',
      lineHeight: '1.7',
      color: '#b0b0c0',
      margin: '0',
    },
    contact: {
      backgroundColor: '#0d0e1a',
      border: '1px solid #6c47ff40',
      borderRadius: '10px',
      padding: '28px 32px',
      marginTop: '56px',
    },
    contactHeading: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#efefef',
      margin: '0 0 10px',
    },
    link: {
      color: '#6c47ff',
      textDecoration: 'none',
    },
    divider: {
      border: 'none',
      borderTop: '1px solid #1e2030',
      margin: '48px 0',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <span style={styles.logo}>CallRecoverAI</span>
          <h1 style={styles.h1}>Privacy Policy</h1>
          <p style={styles.updated}>Last Updated: April 2026</p>
        </header>

        <p style={styles.p}>
          CallRecoverAI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is operated by{' '}
          <strong style={{ color: '#efefef' }}>[COMPANY NAME], LLC</strong>, a limited liability
          company organized under the laws of the State of{' '}
          <strong style={{ color: '#efefef' }}>[STATE]</strong>. This Privacy Policy explains how we
          collect, use, disclose, and protect information when you use our AI-powered missed-call
          text-back service (&quot;Service&quot;).
        </p>
        <p style={styles.p}>
          By using the Service, you agree to the collection and use of information in accordance
          with this policy.
        </p>

        <h2 style={styles.h2}>1. Information We Collect</h2>

        <p style={styles.p}>
          We collect information in several categories depending on your role (business subscriber
          or end caller):
        </p>

        <p style={{ ...styles.p, fontWeight: '600', color: '#efefef', marginBottom: '8px' }}>
          A. Business Account Information
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Business name, owner name, and contact email address</li>
          <li style={styles.li}>Phone number(s) registered to the Service</li>
          <li style={styles.li}>Business type and industry (if provided)</li>
          <li style={styles.li}>Account credentials and authentication tokens</li>
        </ul>

        <p style={{ ...styles.p, fontWeight: '600', color: '#efefef', marginBottom: '8px' }}>
          B. Caller Information (End Users)
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>
            Phone numbers of individuals who place a missed call to a subscriber&apos;s business
            line
          </li>
          <li style={styles.li}>SMS conversation logs between the AI and the caller</li>
          <li style={styles.li}>Voicemail recordings or transcriptions (if enabled)</li>
          <li style={styles.li}>Date, time, and duration of inbound call attempts</li>
          <li style={styles.li}>Opt-out requests (STOP commands) and opt-out timestamps</li>
        </ul>

        <p style={{ ...styles.p, fontWeight: '600', color: '#efefef', marginBottom: '8px' }}>
          C. Payment Information
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>
            Billing name and address associated with your subscription payment method
          </li>
          <li style={styles.li}>
            Subscription status, plan tier, and billing history (managed by Stripe — we do not
            store raw card numbers)
          </li>
        </ul>

        <p style={{ ...styles.p, fontWeight: '600', color: '#efefef', marginBottom: '8px' }}>
          D. Usage and Technical Data
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}>Dashboard activity logs</li>
          <li style={styles.li}>API request metadata and error logs</li>
          <li style={styles.li}>Browser type and IP address (for dashboard access)</li>
        </ul>

        <h2 style={styles.h2}>2. How We Use Your Information</h2>

        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>AI Text-Back Service:</strong> When a caller
            misses a connection with your business, we use their phone number and call metadata to
            send an automated SMS follow-up via our AI assistant, qualifying leads and answering
            basic questions on your behalf.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Lead Qualification:</strong> Conversation data is
            processed by our AI to identify caller intent, schedule callbacks, and collect contact
            details for your business.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Weekly Reports:</strong> We aggregate call and
            conversation data to generate performance summaries delivered to your registered email.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Billing and Account Management:</strong> Payment
            information is used to process your subscription through Stripe and communicate billing
            updates.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Service Improvement:</strong> Anonymized,
            aggregated usage data may be used to improve the accuracy and quality of our AI
            responses.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Legal Compliance:</strong> We retain certain
            records to comply with applicable laws, including TCPA opt-out records.
          </li>
        </ul>

        <h2 style={styles.h2}>3. Third-Party Service Processors</h2>

        <p style={styles.p}>
          We rely on trusted third-party processors to deliver the Service. Each processor handles
          data only as described below and under their own privacy terms:
        </p>

        <div style={styles.highlight}>
          <p style={{ ...styles.highlightText, fontWeight: '600', color: '#efefef', marginBottom: '8px' }}>
            Twilio — SMS Delivery Processor
          </p>
          <p style={styles.highlightText}>
            Twilio, Inc. processes outbound and inbound SMS messages on our behalf. Caller phone
            numbers and message content are transmitted through Twilio&apos;s infrastructure to
            deliver text-back messages. Twilio&apos;s privacy policy is available at{' '}
            <a href="https://www.twilio.com/legal/privacy" style={styles.link} target="_blank" rel="noopener noreferrer">
              twilio.com/legal/privacy
            </a>.
          </p>
        </div>

        <div style={styles.highlight}>
          <p style={{ ...styles.highlightText, fontWeight: '600', color: '#efefef', marginBottom: '8px' }}>
            Stripe — Payment Processor
          </p>
          <p style={styles.highlightText}>
            Stripe, Inc. processes all subscription payments. We share your billing name, email,
            and payment method details with Stripe to facilitate charges. We do not store credit
            card numbers on our servers. Stripe&apos;s privacy policy is available at{' '}
            <a href="https://stripe.com/privacy" style={styles.link} target="_blank" rel="noopener noreferrer">
              stripe.com/privacy
            </a>.
          </p>
        </div>

        <div style={styles.highlight}>
          <p style={{ ...styles.highlightText, fontWeight: '600', color: '#efefef', marginBottom: '8px' }}>
            Anthropic — AI Processing
          </p>
          <p style={styles.highlightText}>
            Anthropic, PBC provides the Claude AI models that power our text-back conversation
            engine. Inbound SMS content may be transmitted to Anthropic&apos;s API to generate
            responses. Anthropic&apos;s privacy policy is available at{' '}
            <a href="https://www.anthropic.com/privacy" style={styles.link} target="_blank" rel="noopener noreferrer">
              anthropic.com/privacy
            </a>.
          </p>
        </div>

        <h2 style={styles.h2}>4. TCPA Compliance</h2>

        <div style={{ ...styles.highlight, borderColor: '#6c47ff80' }}>
          <p style={styles.highlightText}>
            CallRecoverAI is designed to comply with the Telephone Consumer Protection Act (TCPA).
            Our platform operates on the principle of <strong style={{ color: '#efefef' }}>implied
            consent</strong>: we only send automated text messages to individuals who have
            initiated contact by calling a subscriber&apos;s business line. This missed-call
            context constitutes a reasonable business expectation of follow-up communication.
          </p>
          <br />
          <p style={styles.highlightText}>
            Every first outbound message includes a clear <strong style={{ color: '#efefef' }}>STOP
            opt-out instruction</strong> (e.g., &quot;Reply STOP to unsubscribe&quot;). Upon
            receipt of a STOP reply, we immediately cease all further automated messages to that
            number and log the opt-out for compliance records.
          </p>
        </div>

        <h2 style={styles.h2}>5. Data Retention</h2>

        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Conversation logs and SMS records:</strong> Retained
            for <strong style={{ color: '#6c47ff' }}>90 days</strong> from the date of the
            conversation, after which they are permanently deleted.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Opt-out records (STOP requests):</strong> Retained
            indefinitely to ensure compliance with TCPA opt-out requirements.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Payment and billing records:</strong> Retained for
            the period required by applicable law (typically 7 years) and as required by our
            payment processor agreements.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Business account data:</strong> Retained while
            your account is active and for up to 30 days after account cancellation, unless earlier
            deletion is requested.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Voicemail recordings:</strong> Retained for 90
            days unless the business subscriber deletes them earlier from the dashboard.
          </li>
        </ul>

        <h2 style={styles.h2}>6. Your Rights</h2>

        <p style={styles.p}>Depending on your jurisdiction, you may have the following rights:</p>

        <ul style={styles.ul}>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Access:</strong> Request a copy of the personal
            data we hold about you or your callers.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Correction:</strong> Request correction of
            inaccurate or incomplete data.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Deletion:</strong> Request deletion of your
            personal data, subject to our legal retention obligations.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Portability:</strong> Request a machine-readable
            export of your conversation and account data.
          </li>
          <li style={styles.li}>
            <strong style={{ color: '#efefef' }}>Opt-Out of AI Processing:</strong> Cancel your
            subscription at any time; upon cancellation, no further AI processing of new caller
            data will occur.
          </li>
        </ul>

        <p style={styles.p}>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:[support@callrecoverai.com]" style={styles.link}>
            [support@callrecoverai.com]
          </a>. We will respond within 30 days.
        </p>

        <h2 style={styles.h2}>7. Data Security</h2>

        <p style={styles.p}>
          We implement industry-standard security measures including TLS encryption in transit,
          access controls, and regular security reviews. However, no system is completely secure.
          We encourage you to use strong, unique passwords for your account and notify us
          immediately if you suspect unauthorized access.
        </p>

        <h2 style={styles.h2}>8. Children&apos;s Privacy</h2>

        <p style={styles.p}>
          The Service is intended for businesses and individuals aged 18 and older. We do not
          knowingly collect personal information from children under 13. If you believe we have
          inadvertently collected such information, please contact us for immediate deletion.
        </p>

        <h2 style={styles.h2}>9. Changes to This Policy</h2>

        <p style={styles.p}>
          We may update this Privacy Policy from time to time. We will notify active subscribers
          via email at least 14 days before material changes take effect. Continued use of the
          Service after the effective date constitutes acceptance of the updated policy.
        </p>

        <hr style={styles.divider} />

        <div style={styles.contact}>
          <p style={styles.contactHeading}>Contact Us</p>
          <p style={{ ...styles.p, margin: '0' }}>
            For privacy-related questions, data requests, or to report a concern:
            <br />
            <strong style={{ color: '#efefef' }}>[COMPANY NAME], LLC</strong>
            <br />
            Email:{' '}
            <a href="mailto:[support@callrecoverai.com]" style={styles.link}>
              [support@callrecoverai.com]
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
