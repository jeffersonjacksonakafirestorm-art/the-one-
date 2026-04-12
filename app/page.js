'use client';

export default function Home() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: #fff;
          color: #1d1d1f;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 52px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
        }
        .nav-logo {
          font-size: 17px;
          font-weight: 700;
          color: #1d1d1f;
          text-decoration: none;
          letter-spacing: -0.02em;
        }
        .nav-logo span { color: #34c759; }
        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
        }
        .nav-links a {
          font-size: 13px;
          color: #6e6e73;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .nav-links a:hover { color: #1d1d1f; }
        .nav-cta {
          background: #34c759;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          padding: 7px 18px;
          border-radius: 980px;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .nav-cta:hover { opacity: 0.85; }

        /* HERO */
        .hero {
          padding: 160px 40px 120px;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          font-size: 13px;
          font-weight: 600;
          color: #34c759;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .hero h1 {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: #1d1d1f;
          margin-bottom: 24px;
        }
        .hero h1 span { color: #34c759; }
        .hero-sub {
          font-size: clamp(18px, 2.2vw, 24px);
          color: #6e6e73;
          line-height: 1.5;
          max-width: 620px;
          margin: 0 auto 48px;
          font-weight: 400;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #34c759;
          color: #fff;
          font-size: 17px;
          font-weight: 600;
          padding: 14px 36px;
          border-radius: 980px;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .btn-primary:hover { opacity: 0.85; }
        .btn-ghost {
          font-size: 17px;
          font-weight: 500;
          color: #34c759;
          text-decoration: none;
        }
        .btn-ghost:hover { text-decoration: underline; }
        .hero-note {
          margin-top: 20px;
          font-size: 13px;
          color: #aeaeb2;
        }

        /* STATS BAR */
        .stats-bar {
          border-top: 1px solid #f2f2f2;
          border-bottom: 1px solid #f2f2f2;
          padding: 40px;
          display: flex;
          justify-content: center;
          gap: 80px;
          flex-wrap: wrap;
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #1d1d1f;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 13px;
          color: #aeaeb2;
          font-weight: 500;
        }

        /* SECTION BASE */
        .section {
          padding: 100px 40px;
          max-width: 980px;
          margin: 0 auto;
        }
        .section-center { text-align: center; }
        .section-eyebrow {
          font-size: 13px;
          font-weight: 600;
          color: #34c759;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #1d1d1f;
          margin-bottom: 16px;
        }
        .section-sub {
          font-size: 19px;
          color: #6e6e73;
          line-height: 1.5;
          max-width: 560px;
          margin: 0 auto;
        }

        /* HOW IT WORKS */
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 64px;
          background: #f2f2f2;
          border: 2px solid #f2f2f2;
          border-radius: 18px;
          overflow: hidden;
        }
        .step {
          background: #fff;
          padding: 48px 36px;
        }
        .step-num {
          font-size: 13px;
          font-weight: 600;
          color: #34c759;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .step-title {
          font-size: 22px;
          font-weight: 700;
          color: #1d1d1f;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .step-desc {
          font-size: 15px;
          color: #6e6e73;
          line-height: 1.6;
        }

        /* PHONE DEMO */
        .demo-wrap {
          padding: 100px 40px;
          background: #f5f5f7;
          text-align: center;
        }
        .demo-inner {
          max-width: 980px;
          margin: 0 auto;
        }
        .phone-frame {
          width: 300px;
          margin: 56px auto 0;
          background: #1d1d1f;
          border-radius: 44px;
          padding: 16px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.15);
        }
        .phone-screen {
          background: #fff;
          border-radius: 32px;
          overflow: hidden;
          min-height: 480px;
        }
        .phone-header {
          background: #f2f2f2;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #e5e5e5;
        }
        .phone-avatar {
          width: 36px; height: 36px;
          background: #34c759;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: #fff;
        }
        .phone-contact-name {
          font-size: 14px; font-weight: 600; color: #1d1d1f;
        }
        .phone-contact-sub {
          font-size: 11px; color: #34c759; font-weight: 500;
        }
        .phone-messages {
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .msg-missed {
          font-size: 11px;
          color: #aeaeb2;
          text-align: center;
          padding: 8px 0;
        }
        .msg-bubble {
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
        }
        .msg-ai {
          background: #f2f2f2;
          color: #1d1d1f;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .msg-user {
          background: #34c759;
          color: #fff;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .msg-time {
          font-size: 11px;
          color: #aeaeb2;
          text-align: center;
          margin-top: 4px;
        }

        /* FEATURES */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 64px;
          background: #f2f2f2;
          border: 2px solid #f2f2f2;
          border-radius: 18px;
          overflow: hidden;
        }
        .feature-card {
          background: #fff;
          padding: 40px 32px;
        }
        .feature-icon-wrap {
          width: 44px; height: 44px;
          background: #f5f5f7;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          margin-bottom: 20px;
        }
        .feature-title {
          font-size: 17px;
          font-weight: 700;
          color: #1d1d1f;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .feature-desc {
          font-size: 14px;
          color: #6e6e73;
          line-height: 1.6;
        }

        /* PRICING */
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-top: 64px;
          background: #f2f2f2;
          border: 2px solid #f2f2f2;
          border-radius: 18px;
          overflow: hidden;
        }
        .price-card {
          background: #fff;
          padding: 56px 48px;
        }
        .price-card-featured {
          background: #1d1d1f;
        }
        .price-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #aeaeb2;
          margin-bottom: 20px;
        }
        .price-label-green { color: #34c759; }
        .price-amount {
          font-size: 80px;
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 1;
          color: #1d1d1f;
          margin-bottom: 6px;
        }
        .price-amount-white { color: #fff; }
        .price-period {
          font-size: 15px;
          color: #aeaeb2;
          margin-bottom: 36px;
          font-weight: 500;
        }
        .price-features {
          list-style: none;
          margin-bottom: 40px;
        }
        .price-features li {
          font-size: 15px;
          color: #6e6e73;
          padding: 10px 0;
          border-bottom: 1px solid #f2f2f2;
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .price-card-featured .price-features li {
          border-color: #2d2d2f;
          color: #aeaeb2;
        }
        .price-check { color: #34c759; font-weight: 700; }
        .price-btn {
          display: block;
          text-align: center;
          padding: 14px;
          border-radius: 980px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
        }
        .price-btn-green {
          background: #34c759;
          color: #fff;
        }
        .price-btn-outline {
          background: transparent;
          color: #34c759;
          border: 1.5px solid #34c759;
        }

        /* INDUSTRIES */
        .niche-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 64px;
          background: #f2f2f2;
          border: 2px solid #f2f2f2;
          border-radius: 18px;
          overflow: hidden;
        }
        .niche-card {
          background: #fff;
          padding: 36px 28px;
        }
        .niche-icon {
          font-size: 28px;
          margin-bottom: 14px;
        }
        .niche-name {
          font-size: 17px;
          font-weight: 700;
          color: #1d1d1f;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }
        .niche-desc {
          font-size: 13px;
          color: #6e6e73;
          line-height: 1.5;
        }
        .niche-tag {
          display: inline-block;
          margin-top: 12px;
          font-size: 11px;
          font-weight: 600;
          color: #34c759;
          background: #f0fdf4;
          padding: 3px 10px;
          border-radius: 980px;
          letter-spacing: 0.03em;
        }

        /* FAQ */
        .faq-list { margin-top: 56px; }
        .faq-item {
          border-bottom: 1px solid #f2f2f2;
          padding: 24px 0;
        }
        .faq-q {
          font-size: 17px;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }
        .faq-a {
          font-size: 15px;
          color: #6e6e73;
          line-height: 1.7;
        }

        /* FINAL CTA */
        .cta-final {
          padding: 140px 40px;
          text-align: center;
          background: #f5f5f7;
        }
        .cta-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #1d1d1f;
          margin-bottom: 32px;
        }
        .cta-sub {
          font-size: 19px;
          color: #6e6e73;
          margin-bottom: 40px;
          line-height: 1.5;
        }

        /* FOOTER */
        .footer {
          border-top: 1px solid #f2f2f2;
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #aeaeb2;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-links {
          display: flex;
          gap: 24px;
        }
        .footer-links a {
          color: #aeaeb2;
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-links a:hover { color: #1d1d1f; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .steps, .features-grid, .niche-grid { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .stats-bar { gap: 40px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">CallRecover<span>AI</span></a>
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a href="#signup" className="nav-cta">Start Free Trial</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">Missed Call Automation</div>
        <h1>Miss a call.<br /><span>Texted back<br />in 30 seconds.</span></h1>
        <p className="hero-sub">
          Someone just called your business. You didn't answer.
          We texted them back in 30 seconds. They're still talking to you right now.
        </p>
        <div className="hero-actions">
          <a href="#signup" className="btn-primary">Add Your Business Number</a>
          <a href="#how" className="btn-ghost">See how it works →</a>
        </div>
        <p className="hero-note">14-day free trial. No credit card required.</p>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num">&lt;30s</div>
          <div className="stat-label">Average AI response time</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">30–50%</div>
          <div className="stat-label">Of calls go unanswered</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">$8k+</div>
          <div className="stat-label">Average job value saved</div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section section-center" id="how">
        <div className="section-eyebrow">How It Works</div>
        <h2 className="section-title">Three steps.<br />No missed revenue.</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">Step 01</div>
            <div className="step-title">You miss the call</div>
            <p className="step-desc">You're on a job, in a meeting, it's 11pm. Doesn't matter. The call goes unanswered.</p>
          </div>
          <div className="step">
            <div className="step-num">Step 02</div>
            <div className="step-title">AI texts them back</div>
            <p className="step-desc">Within 30 seconds, they get a text from your number. It sounds like you. It qualifies the lead.</p>
          </div>
          <div className="step">
            <div className="step-num">Step 03</div>
            <div className="step-title">You close the job</div>
            <p className="step-desc">We capture their name, number, and what they need. They're still warm when you follow up.</p>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <div className="demo-wrap">
        <div className="demo-inner">
          <div className="section-eyebrow">Live Example</div>
          <h2 className="section-title">What your customer sees<br />the moment you miss their call.</h2>
          <div className="phone-frame">
            <div className="phone-screen">
              <div className="phone-header">
                <div className="phone-avatar">AC</div>
                <div>
                  <div className="phone-contact-name">ABC Roofing</div>
                  <div className="phone-contact-sub">● Responding now</div>
                </div>
              </div>
              <div className="phone-messages">
                <div className="msg-missed">📞 Missed call from ABC Roofing</div>
                <div className="msg-bubble msg-ai">Hey — sorry we missed you. This is ABC Roofing. Still need help with your roof?</div>
                <div className="msg-time">Delivered in 18 seconds</div>
                <div className="msg-bubble msg-user">Yes, got a leak — need someone ASAP</div>
                <div className="msg-bubble msg-ai">On it. What's your zip? I can get someone out today. ✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section section-center" id="features">
        <div className="section-eyebrow">Features</div>
        <h2 className="section-title">Everything it needs.<br />Nothing it doesn't.</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap">⚡</div>
            <div className="feature-title">30-Second Response</div>
            <p className="feature-desc">Faster than any employee. Before they dial your competitor.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">🤖</div>
            <div className="feature-title">AI Trained on Your Business</div>
            <p className="feature-desc">Knows your services, prices, and common questions. Sounds like you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">🚨</div>
            <div className="feature-title">Emergency Escalation</div>
            <p className="feature-desc">Set keywords that instantly text your personal cell. You decide what's urgent.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">📋</div>
            <div className="feature-title">Lead Summaries</div>
            <p className="feature-desc">Every conversation logged. Name, number, what they need, when.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">📱</div>
            <div className="feature-title">Your Existing Number</div>
            <p className="feature-desc">Texts come from your number. Customers think it's you — because it is.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap">⚙️</div>
            <div className="feature-title">Live in 10 Minutes</div>
            <p className="feature-desc">No tech skills needed. No downtime. You fill out a form, we handle the rest.</p>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section-center" style={{background:'#f5f5f7', maxWidth:'100%', padding:'100px 40px'}}>
        <div style={{maxWidth:'980px', margin:'0 auto'}}>
          <div className="section-eyebrow">Best Fit</div>
          <h2 className="section-title">If one job is worth $3k–$20k,<br />one saved call pays for months.</h2>
          <div className="niche-grid">
            {[
              {icon:'🏠', name:'Roofing', desc:'Avg job: $5k–$20k. One saved lead covers 5+ months.', tag:'Most Popular'},
              {icon:'❄️', name:'HVAC', desc:'Emergencies don\'t wait. First to respond wins the job.', tag:'High Urgency'},
              {icon:'🔧', name:'Plumbing', desc:'Customers call 3–4 companies. Fastest reply wins.', tag:'Speed Wins'},
              {icon:'💉', name:'Med Spas', desc:'High-margin treatments. Missed inquiries are lost revenue.', tag:'High Margin'},
              {icon:'⚖️', name:'Law Firms', desc:'One client = $5k–$50k. Every missed call is a catastrophic miss.', tag:'Ultra High-Ticket'},
              {icon:'🚗', name:'Auto Shops', desc:'Quick decisions. If you don\'t reply, they\'re already at the next shop.', tag:'Fast Decisions'},
            ].map((n, i) => (
              <div key={i} className="niche-card">
                <div className="niche-icon">{n.icon}</div>
                <div className="niche-name">{n.name}</div>
                <p className="niche-desc">{n.desc}</p>
                <div className="niche-tag">{n.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section section-center" id="pricing">
        <div className="section-eyebrow">Pricing</div>
        <h2 className="section-title">One price. Flat rate.</h2>
        <p className="section-sub">One saved job pays for the whole year. This is overhead that pays for itself.</p>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-label">Free Trial</div>
            <div className="price-amount">$0</div>
            <div className="price-period">for 14 days — full access</div>
            <ul className="price-features">
              <li><span className="price-check">✓</span> Every feature, no limits</li>
              <li><span className="price-check">✓</span> No credit card to start</li>
              <li><span className="price-check">✓</span> Cancel before day 14, pay nothing</li>
              <li><span className="price-check">✓</span> Setup in under 10 minutes</li>
            </ul>
            <a href="#signup" className="price-btn price-btn-outline">Start Free Trial</a>
          </div>
          <div className="price-card price-card-featured">
            <div className="price-label price-label-green">Monthly Plan</div>
            <div className="price-amount price-amount-white">$225</div>
            <div className="price-period">per month — cancel anytime</div>
            <ul className="price-features">
              <li><span className="price-check">✓</span> Unlimited missed call responses</li>
              <li><span className="price-check">✓</span> AI trained on your business</li>
              <li><span className="price-check">✓</span> Emergency escalation to your cell</li>
              <li><span className="price-check">✓</span> Full lead history and summaries</li>
              <li><span className="price-check">✓</span> Onboarding support included</li>
            </ul>
            <a href="#signup" className="price-btn price-btn-green">Get Started Now</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{background:'#f5f5f7', maxWidth:'100%', padding:'100px 40px'}}>
        <div style={{maxWidth:'720px', margin:'0 auto'}}>
          <div className="section-eyebrow" style={{textAlign:'center'}}>FAQ</div>
          <h2 className="section-title" style={{textAlign:'center', marginBottom:'8px'}}>Before you ask.</h2>
          <div className="faq-list">
            {[
              {q:"What if the caller doesn't want texts?", a:"Every message includes an opt-out. We're TCPA compliant and A2P 10DLC registered. Opt-outs are instant and automatic."},
              {q:"How does the AI know what to say?", a:"You tell us your business — services, prices, common questions. The AI handles the rest. You can update it anytime."},
              {q:"Does it work for any industry?", a:"Any business that takes inbound calls and loses money when they miss one. If one job is worth $3k+, this pays for itself in one save."},
              {q:"What if someone has an emergency?", a:"Set emergency keywords and we'll text your personal cell immediately. You decide what counts as urgent."},
              {q:"Can I cancel anytime?", a:"Yes. Cancel from your dashboard before your next billing date. No calls, no negotiations, no fees."},
              {q:"Is there a contract?", a:"No contract. Month to month. First 14 days are free — cancel before then and you pay absolutely nothing."},
            ].map((item, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{item.q}</div>
                <p className="faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final" id="signup">
        <h2 className="cta-title">Stop losing jobs<br />to missed calls.</h2>
        <p className="cta-sub">The moment you miss a call, we're already texting them back.</p>
        <a href="mailto:hello@callrecoverai.com" className="btn-primary" style={{fontSize:'19px', padding:'16px 48px'}}>
          Start Your Free Trial
        </a>
        <p className="hero-note" style={{marginTop:'20px'}}>14 days free. No credit card. Cancel anytime.</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2025 CallRecoverAI. All rights reserved.</span>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="mailto:hello@callrecoverai.com">Contact</a>
        </div>
      </footer>
    </>
  );
}
