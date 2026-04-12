'use client';

export default function Home() {
  const styles = {
    // NAV
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '58px',
      background: 'rgba(10,10,10,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1f1f1f',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
    },
    logo: {
      fontSize: '18px',
      fontWeight: 800,
      color: '#fff',
      textDecoration: 'none',
      letterSpacing: '-0.03em',
    },
    logoAccent: { color: '#22c55e' },
    navLinks: {
      display: 'flex',
      gap: '32px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: '#888',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'color 0.15s',
    },
    navCta: {
      background: '#22c55e',
      color: '#000',
      padding: '8px 20px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },

    // HERO
    hero: {
      paddingTop: '160px',
      paddingBottom: '80px',
      paddingLeft: '40px',
      paddingRight: '40px',
      maxWidth: '1100px',
      margin: '0 auto',
    },
    headline: {
      fontSize: 'clamp(56px, 9vw, 112px)',
      fontWeight: 900,
      lineHeight: 1.0,
      letterSpacing: '-0.05em',
      margin: '0 0 32px 0',
      color: '#fff',
    },
    headlineAccent: { color: '#22c55e' },
    subCopy: {
      fontSize: 'clamp(17px, 2vw, 22px)',
      color: '#888',
      lineHeight: 1.6,
      maxWidth: '640px',
      margin: '0 0 48px 0',
      fontWeight: 400,
    },
    heroCta: {
      display: 'inline-block',
      background: '#22c55e',
      color: '#000',
      padding: '16px 40px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    heroSubNote: {
      display: 'block',
      marginTop: '16px',
      fontSize: '13px',
      color: '#555',
    },

    // SECTION
    section: {
      padding: '80px 40px',
      maxWidth: '1100px',
      margin: '0 auto',
    },
    sectionLabel: {
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: '#22c55e',
      textTransform: 'uppercase',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: 'clamp(32px, 4vw, 56px)',
      fontWeight: 900,
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
      color: '#fff',
      margin: '0 0 16px 0',
    },
    sectionSub: {
      fontSize: '18px',
      color: '#666',
      maxWidth: '560px',
      lineHeight: 1.5,
    },

    // HOW IT WORKS
    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0',
      marginTop: '56px',
      border: '1px solid #1f1f1f',
    },
    step: {
      padding: '40px 32px',
      borderRight: '1px solid #1f1f1f',
    },
    stepLast: {
      padding: '40px 32px',
    },
    stepNum: {
      fontSize: '48px',
      fontWeight: 900,
      color: '#22c55e',
      lineHeight: 1,
      marginBottom: '16px',
      letterSpacing: '-0.04em',
    },
    stepTitle: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '10px',
      letterSpacing: '-0.02em',
    },
    stepDesc: {
      fontSize: '15px',
      color: '#666',
      lineHeight: 1.6,
    },

    // FEATURES
    featuresStrip: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0',
      marginTop: '56px',
      border: '1px solid #1f1f1f',
    },
    feature: {
      padding: '40px 32px',
      borderRight: '1px solid #1f1f1f',
    },
    featureLast: {
      padding: '40px 32px',
    },
    featureIcon: {
      fontSize: '28px',
      marginBottom: '16px',
      display: 'block',
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '10px',
      letterSpacing: '-0.02em',
    },
    featureDesc: {
      fontSize: '14px',
      color: '#666',
      lineHeight: 1.6,
    },

    // DIVIDER
    divider: {
      borderTop: '1px solid #1f1f1f',
      margin: '0 40px',
    },

    // PRICING
    pricingGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0',
      marginTop: '56px',
      border: '1px solid #1f1f1f',
    },
    pricingCard: {
      padding: '56px 48px',
      borderRight: '1px solid #1f1f1f',
    },
    pricingCardHighlight: {
      padding: '56px 48px',
      background: '#111',
    },
    pricingName: {
      fontSize: '13px',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: '#555',
      textTransform: 'uppercase',
      marginBottom: '24px',
    },
    pricingAmount: {
      fontSize: '96px',
      fontWeight: 900,
      color: '#fff',
      letterSpacing: '-0.05em',
      lineHeight: 1,
      marginBottom: '8px',
    },
    pricingAmountAccent: {
      fontSize: '96px',
      fontWeight: 900,
      color: '#22c55e',
      letterSpacing: '-0.05em',
      lineHeight: 1,
      marginBottom: '8px',
    },
    pricingPeriod: {
      fontSize: '16px',
      color: '#555',
      marginBottom: '32px',
      fontWeight: 500,
    },
    pricingFeatures: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 40px 0',
    },
    pricingFeatureItem: {
      fontSize: '15px',
      color: '#888',
      padding: '10px 0',
      borderBottom: '1px solid #1a1a1a',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    pricingCheck: { color: '#22c55e', fontWeight: 700 },
    pricingBtn: {
      display: 'block',
      textAlign: 'center',
      background: '#22c55e',
      color: '#000',
      padding: '14px 32px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    pricingBtnOutline: {
      display: 'block',
      textAlign: 'center',
      background: 'transparent',
      color: '#fff',
      padding: '14px 32px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      border: '1px solid #333',
    },

    // FAQ
    faqItem: {
      borderBottom: '1px solid #1f1f1f',
      padding: '28px 0',
    },
    faqQ: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#fff',
      marginBottom: '10px',
      letterSpacing: '-0.02em',
    },
    faqA: {
      fontSize: '15px',
      color: '#666',
      lineHeight: 1.7,
    },

    // FINAL CTA
    finalCta: {
      padding: '120px 40px',
      textAlign: 'center',
      borderTop: '1px solid #1f1f1f',
    },
    finalCtaTitle: {
      fontSize: 'clamp(40px, 6vw, 80px)',
      fontWeight: 900,
      letterSpacing: '-0.05em',
      lineHeight: 1.0,
      color: '#fff',
      margin: '0 0 40px 0',
    },
    finalCtaBtn: {
      display: 'inline-block',
      background: '#22c55e',
      color: '#000',
      padding: '18px 48px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '20px',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },

    // FOOTER
    footer: {
      borderTop: '1px solid #1f1f1f',
      padding: '32px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#444',
      fontSize: '13px',
    },
    footerLinks: {
      display: 'flex',
      gap: '24px',
    },
    footerLink: {
      color: '#444',
      textDecoration: 'none',
    },
  };

  const faq = [
    {
      q: 'What if the caller doesn\'t want to receive texts?',
      a: 'Every message includes a stop option. We comply with TCPA regulations and A2P 10DLC carrier registration. Opt-outs are handled automatically.',
    },
    {
      q: 'How does the AI know what to say?',
      a: 'You tell us your business: what you do, what you charge, what questions you get asked. The AI handles the conversation from there. You can update it any time.',
    },
    {
      q: 'Does it work for any business?',
      a: 'Any business that takes inbound calls and loses money when they miss one. Roofing, HVAC, plumbing, legal, med spas, auto shops — it works.',
    },
    {
      q: 'What happens if the caller has an urgent situation?',
      a: 'Set emergency keywords and we\'ll text your personal cell immediately. You decide what counts as urgent.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. Cancel from your dashboard before your next billing date and you won\'t be charged again. No calls, no negotiations.',
    },
    {
      q: 'Is there a contract?',
      a: 'No contract. Month to month. Your first 14 days are free — cancel before then and you pay nothing.',
    },
  ];

  return (
    <>
      {/* NAV */}
      <nav style={styles.nav}>
        <a href="#" style={styles.logo}>
          CallRecover<span style={styles.logoAccent}>AI</span>
        </a>
        <ul style={styles.navLinks}>
          <li><a href="#how" style={styles.navLink}>How It Works</a></li>
          <li><a href="#pricing" style={styles.navLink}>Pricing</a></li>
          <li><a href="#faq" style={styles.navLink}>FAQ</a></li>
        </ul>
        <a href="#signup" style={styles.navCta}>Start Free Trial</a>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.headline}>
          Miss a call.<br />
          <span style={styles.headlineAccent}>They're texted back<br />in 30 seconds.</span>
        </h1>
        <p style={styles.subCopy}>
          Someone just called your business. You didn't answer.
          We texted them back in 30 seconds.
          They're still talking to you right now.
        </p>
        <a href="#signup" style={styles.heroCta}>Add Your Business Number</a>
        <span style={styles.heroSubNote}>14-day free trial. No credit card required to start.</span>
      </section>

      <div style={styles.divider} />

      {/* HOW IT WORKS */}
      <section id="how" style={styles.section}>
        <div style={styles.sectionLabel}>How It Works</div>
        <h2 style={styles.sectionTitle}>Three steps.<br />No missed revenue.</h2>
        <div style={styles.stepsGrid}>
          <div style={styles.step}>
            <div style={styles.stepNum}>01</div>
            <div style={styles.stepTitle}>You miss the call</div>
            <p style={styles.stepDesc}>
              Doesn't matter why — you're on a job, in a meeting, it's 11pm. The call goes unanswered.
            </p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNum}>02</div>
            <div style={styles.stepTitle}>AI texts them back</div>
            <p style={styles.stepDesc}>
              Within 30 seconds, they get a text from your number. It sounds like you. It qualifies the lead.
            </p>
          </div>
          <div style={styles.stepLast}>
            <div style={styles.stepNum}>03</div>
            <div style={styles.stepTitle}>You close the job</div>
            <p style={styles.stepDesc}>
              We capture their info and intent. You get a summary. They're still warm when you follow up.
            </p>
          </div>
        </div>
      </section>

      <div style={styles.divider} />

      {/* FEATURES */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionLabel}>What You Get</div>
        <h2 style={styles.sectionTitle}>Everything it needs.<br />Nothing it doesn't.</h2>
        <div style={styles.featuresStrip}>
          <div style={styles.feature}>
            <span style={styles.featureIcon}>⚡</span>
            <div style={styles.featureTitle}>30-Second Response</div>
            <p style={styles.featureDesc}>
              Faster than any employee. Before they call your competitor.
            </p>
          </div>
          <div style={styles.feature}>
            <span style={styles.featureIcon}>🤖</span>
            <div style={styles.featureTitle}>AI Conversation</div>
            <p style={styles.featureDesc}>
              Qualifies the lead, answers basic questions, collects their info. Trained on your business.
            </p>
          </div>
          <div style={styles.featureLast}>
            <span style={styles.featureIcon}>🚨</span>
            <div style={styles.featureTitle}>Emergency Escalation</div>
            <p style={styles.featureDesc}>
              Set keywords that text your personal cell instantly. You decide what's urgent.
            </p>
          </div>
        </div>
        <div style={{ ...styles.featuresStrip, borderTop: 'none' }}>
          <div style={styles.feature}>
            <span style={styles.featureIcon}>📋</span>
            <div style={styles.featureTitle}>Lead Summaries</div>
            <p style={styles.featureDesc}>
              Every conversation logged. Name, number, what they need, when they need it.
            </p>
          </div>
          <div style={styles.feature}>
            <span style={styles.featureIcon}>🔢</span>
            <div style={styles.featureTitle}>Your Number</div>
            <p style={styles.featureDesc}>
              Texts come from your business number. The customer thinks it's you.
            </p>
          </div>
          <div style={styles.featureLast}>
            <span style={styles.featureIcon}>⚙️</span>
            <div style={styles.featureTitle}>Easy Setup</div>
            <p style={styles.featureDesc}>
              Live in under 10 minutes. No technical knowledge required.
            </p>
          </div>
        </div>
      </section>

      <div style={styles.divider} />

      {/* PRICING */}
      <section id="pricing" style={styles.section}>
        <div style={styles.sectionLabel}>Pricing</div>
        <h2 style={styles.sectionTitle}>One price.<br />Flat rate.</h2>
        <p style={{ ...styles.sectionSub, marginTop: '16px' }}>
          One saved job pays for the whole year. This is overhead that pays for itself.
        </p>
        <div style={styles.pricingGrid}>
          <div style={styles.pricingCard}>
            <div style={styles.pricingName}>Free Trial</div>
            <div style={styles.pricingAmount}>$0</div>
            <div style={styles.pricingPeriod}>for 14 days</div>
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> Full access — every feature</li>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> No credit card to start</li>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> Cancel before day 14, pay nothing</li>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> Setup takes under 10 minutes</li>
            </ul>
            <a href="#signup" style={styles.pricingBtnOutline}>Start Free Trial</a>
          </div>
          <div style={styles.pricingCardHighlight}>
            <div style={styles.pricingName}>Monthly</div>
            <div style={styles.pricingAmountAccent}>$225</div>
            <div style={styles.pricingPeriod}>per month, cancel anytime</div>
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> Unlimited missed call responses</li>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> AI trained on your business</li>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> Emergency escalation to your cell</li>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> Full lead history and summaries</li>
              <li style={styles.pricingFeatureItem}><span style={styles.pricingCheck}>✓</span> Dedicated onboarding support</li>
            </ul>
            <a href="#signup" style={styles.pricingBtn}>Get Started Now</a>
          </div>
        </div>
      </section>

      <div style={styles.divider} />

      {/* FAQ */}
      <section id="faq" style={styles.section}>
        <div style={styles.sectionLabel}>FAQ</div>
        <h2 style={styles.sectionTitle}>Before you ask.</h2>
        <div style={{ marginTop: '48px' }}>
          {faq.map((item, i) => (
            <div key={i} style={styles.faqItem}>
              <div style={styles.faqQ}>{item.q}</div>
              <p style={styles.faqA}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="signup" style={styles.finalCta}>
        <h2 style={styles.finalCtaTitle}>
          Stop losing jobs<br />to missed calls.
        </h2>
        <a href="mailto:hello@callrecoverai.com" style={styles.finalCtaBtn}>
          Start Your Free Trial
        </a>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span>© 2025 CallRecoverAI. All rights reserved.</span>
        <div style={styles.footerLinks}>
          <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
          <a href="/terms" style={styles.footerLink}>Terms of Service</a>
        </div>
      </footer>
    </>
  );
}
