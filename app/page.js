'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: #f8f8f8;
          color: #222;
          font-family: 'Inter Tight', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px; height: 64px;
          background: rgba(248,248,248,0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .nav.scrolled { border-bottom-color: #e8e8e8; }
        .nav-logo { font-size: 17px; font-weight: 700; letter-spacing: -0.5px; text-decoration: none; color: #111; }
        .nav-logo span { color: #6c47ff; }
        .nav-right { display: flex; align-items: center; gap: 32px; }
        .nav-link { font-size: 14px; color: #777; text-decoration: none; font-weight: 400; }
        .nav-link:hover { color: #111; }
        .btn {
          display: inline-block; text-decoration: none;
          font-family: 'Inter Tight', system-ui, sans-serif;
          font-weight: 500; cursor: pointer; border: none;
          transition: all 0.15s;
        }
        .btn-dark {
          background: #111; color: #fff;
          padding: 10px 20px; font-size: 14px; border-radius: 6px;
        }
        .btn-dark:hover { background: #000; }
        .btn-ghost {
          background: transparent; color: #444;
          padding: 10px 20px; font-size: 14px; border-radius: 6px;
          border: 1.5px solid #ddd;
        }
        .btn-ghost:hover { border-color: #aaa; color: #111; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
        }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border: 1px solid #e8e8e8; border-radius: 100px;
          padding: 6px 14px 6px 8px;
          font-size: 12px; font-weight: 500; color: #666;
          margin-bottom: 48px; letter-spacing: 0.01em;
        }
        .hero-pill-dot {
          width: 20px; height: 20px; border-radius: 50%;
          background: #6c47ff1a; display: flex; align-items: center; justify-content: center;
        }
        .hero-pill-dot::after {
          content: ''; width: 7px; height: 7px;
          background: #6c47ff; border-radius: 50%;
        }
        .hero-h1 {
          font-size: clamp(52px, 8.5vw, 100px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.045em;
          color: #0a0a0a;
          max-width: 860px;
          margin-bottom: 32px;
        }
        .hero-sub {
          font-size: 18px; font-weight: 400;
          color: #777; line-height: 1.65;
          max-width: 440px; margin-bottom: 52px;
        }
        .hero-ctas {
          display: flex; align-items: center; gap: 12px;
          justify-content: center; margin-bottom: 16px;
        }
        .hero-ctas .btn-dark { padding: 14px 28px; font-size: 15px; border-radius: 8px; }
        .hero-ctas .btn-ghost { padding: 14px 28px; font-size: 15px; border-radius: 8px; }
        .hero-fine { font-size: 12px; color: #bbb; }

        /* CONVO MOCKUP */
        .convo-section {
          width: 100%; max-width: 420px;
          margin-top: 80px;
        }
        .convo-label {
          font-size: 11px; color: #bbb;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 16px; text-align: center;
        }
        .convo-card {
          background: #fff; border: 1px solid #e8e8e8;
          border-radius: 20px; padding: 24px;
          display: flex; flex-direction: column; gap: 10px;
          box-shadow: 0 2px 24px rgba(0,0,0,0.04);
        }
        .convo-time {
          font-size: 11px; color: #bbb; text-align: center; margin-bottom: 4px;
        }
        .msg { display: flex; }
        .msg.r { justify-content: flex-end; }
        .bubble {
          padding: 10px 14px; border-radius: 16px;
          font-size: 14px; line-height: 1.5; max-width: 82%;
        }
        .bubble.ai {
          background: #f0f0f0; color: #222;
          border-bottom-left-radius: 4px;
        }
        .bubble.user {
          background: #6c47ff; color: #fff;
          border-bottom-right-radius: 4px;
        }

        /* DIVIDER */
        .rule { width: 100%; height: 1px; background: #e8e8e8; }

        /* GENERIC SECTION */
        .section {
          max-width: 1160px; margin: 0 auto;
          padding: 120px 52px;
        }
        .eyebrow {
          font-size: 11px; font-weight: 600; color: #aaa;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .section-h {
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 800; line-height: 1.0;
          letter-spacing: -0.035em; color: #0a0a0a;
          max-width: 680px; margin-bottom: 20px;
        }
        .section-p {
          font-size: 17px; color: #777;
          line-height: 1.65; max-width: 480px;
          margin-bottom: 64px;
        }

        /* THREE CARDS */
        .cards {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 0;
          border: 1px solid #e8e8e8; border-radius: 16px; overflow: hidden;
        }
        .card {
          background: #fff; padding: 40px 36px;
          border-right: 1px solid #e8e8e8;
        }
        .card:last-child { border-right: none; }
        .card-num {
          font-size: 11px; font-weight: 600; color: #bbb;
          letter-spacing: 0.1em; margin-bottom: 36px;
        }
        .card-h {
          font-size: 19px; font-weight: 700;
          letter-spacing: -0.02em; color: #111;
          line-height: 1.25; margin-bottom: 12px;
        }
        .card-p { font-size: 14px; color: #777; line-height: 1.7; }

        /* STEPS */
        .steps { border-top: 1px solid #e8e8e8; }
        .step {
          display: grid; grid-template-columns: 72px 1fr;
          padding: 40px 0; border-bottom: 1px solid #e8e8e8;
          gap: 0;
        }
        .step-n { font-size: 12px; font-weight: 600; color: #bbb; padding-top: 3px; letter-spacing: 0.05em; }
        .step-h { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #111; margin-bottom: 10px; }
        .step-p { font-size: 15px; color: #777; line-height: 1.65; max-width: 560px; }

        /* PRICING */
        .pricing-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        .price-card {
          background: #fff; border: 1px solid #e8e8e8;
          border-radius: 20px; padding: 52px;
        }
        .price-num {
          font-size: 80px; font-weight: 800;
          letter-spacing: -0.05em; color: #0a0a0a; line-height: 1;
        }
        .price-unit { font-size: 15px; color: #aaa; margin-top: 6px; margin-bottom: 44px; }
        .features { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 44px; }
        .features li { font-size: 15px; color: #444; display: flex; align-items: center; gap: 12px; }
        .tick { color: #6c47ff; font-size: 15px; }
        .price-cta {
          display: block; width: 100%; text-align: center;
          background: #111; color: #fff; padding: 16px;
          border-radius: 8px; font-size: 15px; font-weight: 500;
          text-decoration: none; font-family: 'Inter Tight', system-ui, sans-serif;
          transition: background 0.15s;
        }
        .price-cta:hover { background: #000; }
        .price-note { font-size: 12px; color: #bbb; text-align: center; margin-top: 14px; }

        /* FAQ */
        .faq-list { border-top: 1px solid #e8e8e8; }
        .faq-row { padding: 28px 0; border-bottom: 1px solid #e8e8e8; }
        .faq-q { font-size: 17px; font-weight: 600; color: #111; margin-bottom: 10px; letter-spacing: -0.01em; }
        .faq-a { font-size: 15px; color: #777; line-height: 1.7; max-width: 640px; }

        /* BOTTOM CTA */
        .cta-band {
          background: #0a0a0a; padding: 140px 52px;
          text-align: center;
        }
        .cta-band-h {
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.045em; line-height: 0.95;
          margin-bottom: 24px;
        }
        .cta-band-p { font-size: 17px; color: rgba(255,255,255,0.4); margin-bottom: 52px; }
        .cta-band .btn-light {
          background: #fff; color: #111;
          padding: 16px 36px; font-size: 16px;
          border-radius: 8px; font-weight: 600;
          display: inline-block; text-decoration: none;
          font-family: 'Inter Tight', system-ui, sans-serif;
          transition: background 0.15s;
        }
        .cta-band .btn-light:hover { background: #eee; }

        /* FOOTER */
        .footer {
          border-top: 1px solid #e8e8e8;
          padding: 36px 52px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-logo { font-size: 15px; font-weight: 700; color: #111; text-decoration: none; }
        .footer-logo span { color: #6c47ff; }
        .footer-links { display: flex; gap: 28px; }
        .footer-link { font-size: 13px; color: #aaa; text-decoration: none; }
        .footer-link:hover { color: #333; }
        .footer-copy { font-size: 12px; color: #ccc; }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .section { padding: 80px 20px; }
          .cards { grid-template-columns: 1fr; }
          .card { border-right: none; border-bottom: 1px solid #e8e8e8; }
          .card:last-child { border-bottom: none; }
          .step { grid-template-columns: 48px 1fr; }
          .pricing-grid { grid-template-columns: 1fr; gap: 48px; }
          .footer { flex-direction: column; gap: 20px; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; }
          .cta-band { padding: 80px 20px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/" className="nav-logo">CallRecover<span>AI</span></a>
        <div className="nav-right">
          <a href="/login" className="nav-link">Sign In</a>
          <a href="/signup" className="btn btn-dark">Start Free Trial</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-pill">
          <span className="hero-pill-dot" />
          AI-powered missed call recovery
        </div>
        <h1 className="hero-h1">Every missed call<br />is a job you didn't get.</h1>
        <p className="hero-sub">
          CallRecoverAI texts back every missed caller in under 30 seconds —
          qualifying leads and keeping jobs from walking out the door.
        </p>
        <div className="hero-ctas">
          <a href="/signup" className="btn btn-dark">Start Free Trial</a>
          <a href="#how-it-works" className="btn btn-ghost">See how it works</a>
        </div>
        <p className="hero-fine">$225/mo &middot; No contracts &middot; Cancel anytime</p>

        <div className="convo-section">
          <p className="convo-label">What your customer sees — instantly</p>
          <div className="convo-card">
            <p className="convo-time">Delivered · Just now</p>
            <div className="msg">
              <div className="bubble ai">Hey, sorry we missed your call — this is Pacific Roofing. How can we help you today?</div>
            </div>
            <div className="msg r">
              <div className="bubble user">Hi, I need a quote for a roof replacement</div>
            </div>
            <div className="msg">
              <div className="bubble ai">We'd love to help with that. What's your address and when are you looking to get started?</div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* WHAT YOU GET */}
      <div className="section" style={{paddingBottom: 0}}>
        <p className="eyebrow">What you get</p>
      </div>
      <div className="section" style={{paddingTop: 40}}>
        <div className="cards">
          <div className="card">
            <p className="card-num">01</p>
            <h3 className="card-h">Missed call text-back</h3>
            <p className="card-p">The moment you miss a call, your customer gets a text. AI handles the conversation — qualifying the lead and capturing their info before they call your competitor.</p>
          </div>
          <div className="card">
            <p className="card-num">02</p>
            <h3 className="card-h">Voicemail transcription</h3>
            <p className="card-p">Every voicemail is instantly transcribed and sent to you as text. No more listening through 2-minute recordings. Read them in two seconds.</p>
          </div>
          <div className="card">
            <p className="card-num">03</p>
            <h3 className="card-h">Weekly revenue report</h3>
            <p className="card-p">Every week you see exactly how many leads were recovered and how much revenue was saved. The number that makes canceling impossible.</p>
          </div>
        </div>
      </div>

      <div className="rule" />

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <p className="eyebrow">Setup</p>
        <h2 className="section-h">Live in under<br />ten minutes.</h2>
        <p className="section-p">No tech skills, no hardware, no changing your number.</p>
        <div className="steps">
          {[
            ['01', 'Sign up and get your number', 'Create your account in under two minutes. You receive a dedicated CallRecoverAI phone number assigned specifically to your business.'],
            ['02', 'Set up call forwarding', 'Dial one code on your existing phone. Any call you miss forwards to your CallRecoverAI number automatically. Your main number never changes.'],
            ['03', 'AI handles everything else', 'Miss a call → customer gets a text in 30 seconds → AI qualifies the lead → you get a notification. Log in to review every conversation in your dashboard.'],
          ].map(([n, h, p]) => (
            <div className="step" key={n}>
              <span className="step-n">{n}</span>
              <div>
                <h3 className="step-h">{h}</h3>
                <p className="step-p">{p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule" />

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="pricing-grid">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 className="section-h">One price.<br />No surprises.</h2>
            <p className="section-p">One missed job covers months of service. Most clients see ROI in the first week.</p>
          </div>
          <div className="price-card">
            <div className="price-num">$225</div>
            <p className="price-unit">per month</p>
            <ul className="features">
              {[
                'Instant missed call text-back',
                'AI lead qualification conversations',
                'Voicemail transcription',
                'Business owner dashboard',
                'Weekly revenue recovery report',
                'Unlimited conversations',
              ].map(f => (
                <li key={f}><span className="tick">✓</span>{f}</li>
              ))}
            </ul>
            <a href="/signup" className="price-cta">Start Free Trial</a>
            <p className="price-note">Free trial · No credit card required · Cancel anytime</p>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* FAQ */}
      <section className="section" id="faq">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-h" style={{marginBottom: 56}}>Questions.</h2>
        <div className="faq-list">
          {[
            ['Does my phone number change?', 'No. Your main number stays exactly the same. You set up call forwarding so missed calls route to your CallRecoverAI number. Takes 30 seconds.'],
            ['What does the AI say to my customers?', 'During signup you set your business name, industry, and the tone you want. The AI introduces itself as your business and handles the conversation naturally. You review every message in your dashboard.'],
            ['What happens when a customer replies?', 'The AI continues the conversation — collecting their name, what they need, best time to call back, and any other details you want. You get a notification and see everything in your dashboard.'],
            ['Is there a contract?', 'No contracts. Month to month. Cancel any time from your dashboard in one click.'],
            ['What if I want to cancel?', 'Cancel from your dashboard instantly. Your number stays active until the end of your billing period.'],
          ].map(([q, a]) => (
            <div className="faq-row" key={q}>
              <p className="faq-q">{q}</p>
              <p className="faq-a">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="cta-band">
        <h2 className="cta-band-h">Stop leaving<br />money on the table.</h2>
        <p className="cta-band-p">Try it free. See a recovered lead before you pay anything.</p>
        <a href="/signup" className="btn-light">Start Free Trial</a>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <a href="/" className="footer-logo">CallRecover<span>AI</span></a>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/terms" className="footer-link">Terms</a>
          <a href="/login" className="footer-link">Sign In</a>
        </div>
        <p className="footer-copy">&copy; 2025 CallRecoverAI</p>
      </footer>
    </>
  )
}
