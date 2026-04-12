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
          background: #f5f5f5;
          color: #111;
          font-family: 'Inter Tight', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 58px;
          background: rgba(245,245,245,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .nav.scrolled { border-bottom-color: #ddd; }
        .nav-logo { font-size: 16px; font-weight: 800; letter-spacing: -0.5px; text-decoration: none; color: #111; }
        .nav-logo span { color: #6c47ff; }
        .nav-right { display: flex; align-items: center; gap: 24px; }
        .nav-link { font-size: 13px; color: #888; text-decoration: none; }
        .nav-link:hover { color: #111; }
        .btn-cta {
          background: #111; color: #fff;
          padding: 9px 18px; font-size: 13px; font-weight: 600;
          border-radius: 4px; text-decoration: none;
          font-family: 'Inter Tight', system-ui, sans-serif;
          display: inline-block; transition: background 0.15s;
          border: none; cursor: pointer;
        }
        .btn-cta:hover { background: #000; }
        .btn-outline {
          background: transparent; color: #555;
          padding: 9px 18px; font-size: 13px; font-weight: 500;
          border-radius: 4px; text-decoration: none;
          font-family: 'Inter Tight', system-ui, sans-serif;
          display: inline-block; border: 1.5px solid #ccc;
          transition: all 0.15s; cursor: pointer;
        }
        .btn-outline:hover { border-color: #888; color: #111; }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 100px 24px 60px;
          border-bottom: 1px solid #ddd;
        }
        .hero-h1 {
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.05em;
          color: #0a0a0a;
          max-width: 900px;
          margin-bottom: 28px;
        }
        .hero-sub {
          font-size: 17px; font-weight: 400;
          color: #666; line-height: 1.6;
          max-width: 400px; margin-bottom: 40px;
        }
        .hero-ctas {
          display: flex; align-items: center; gap: 10px;
          justify-content: center; margin-bottom: 14px;
        }
        .hero-ctas .btn-cta { padding: 13px 28px; font-size: 15px; border-radius: 5px; }
        .hero-ctas .btn-outline { padding: 13px 28px; font-size: 15px; border-radius: 5px; }
        .hero-fine { font-size: 11px; color: #bbb; letter-spacing: 0.02em; }

        /* CONVO */
        .convo-wrap {
          margin-top: 64px; width: 100%; max-width: 400px;
        }
        .convo-tag {
          font-size: 10px; font-weight: 600; color: #bbb;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 12px; text-align: center;
        }
        .convo {
          background: #fff; border: 1px solid #ddd;
          border-radius: 12px; padding: 20px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .convo-ts { font-size: 10px; color: #ccc; text-align: center; margin-bottom: 2px; }
        .msg { display: flex; }
        .msg.r { justify-content: flex-end; }
        .bub {
          padding: 9px 13px; border-radius: 14px;
          font-size: 13px; line-height: 1.5; max-width: 80%;
        }
        .bub.a { background: #ebebeb; color: #111; border-bottom-left-radius: 3px; }
        .bub.u { background: #6c47ff; color: #fff; border-bottom-right-radius: 3px; }

        /* STRIP */
        .strip {
          display: grid; grid-template-columns: repeat(3,1fr);
          border-bottom: 1px solid #ddd;
        }
        .strip-item {
          padding: 40px 48px;
          border-right: 1px solid #ddd;
        }
        .strip-item:last-child { border-right: none; }
        .strip-num {
          font-size: 10px; font-weight: 700; color: #bbb;
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 28px;
        }
        .strip-h {
          font-size: 18px; font-weight: 700;
          letter-spacing: -0.025em; color: #111;
          line-height: 1.2; margin-bottom: 10px;
        }
        .strip-p { font-size: 13px; color: #777; line-height: 1.7; }

        /* SETUP */
        .setup {
          max-width: 1160px; margin: 0 auto;
          padding: 80px 48px;
          border-bottom: 1px solid #ddd;
        }
        .setup-head { margin-bottom: 56px; }
        .eyebrow {
          font-size: 10px; font-weight: 700; color: #bbb;
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .big-h {
          font-size: clamp(38px, 5vw, 60px);
          font-weight: 800; line-height: 0.97;
          letter-spacing: -0.04em; color: #0a0a0a;
          margin-bottom: 16px;
        }
        .big-p { font-size: 16px; color: #777; line-height: 1.6; max-width: 440px; }

        .steps {}
        .step {
          display: grid; grid-template-columns: 60px 1fr;
          padding: 32px 0; border-top: 1px solid #ddd;
        }
        .step:last-child { border-bottom: 1px solid #ddd; }
        .step-n {
          font-size: 11px; font-weight: 700; color: #ccc;
          letter-spacing: 0.08em; padding-top: 4px;
        }
        .step-h {
          font-size: 20px; font-weight: 700;
          letter-spacing: -0.025em; color: #111; margin-bottom: 8px;
        }
        .step-p { font-size: 14px; color: #777; line-height: 1.65; max-width: 540px; }

        /* PRICING */
        .pricing {
          display: grid; grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #ddd;
        }
        .pricing-l {
          padding: 80px 48px;
          border-right: 1px solid #ddd;
        }
        .pricing-r { padding: 80px 48px; }
        .price-big {
          font-size: 96px; font-weight: 800;
          letter-spacing: -0.06em; color: #0a0a0a;
          line-height: 1; margin-top: 32px;
        }
        .price-mo { font-size: 14px; color: #aaa; margin-top: 4px; margin-bottom: 40px; }
        .feat-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
        .feat-list li { font-size: 14px; color: #444; display: flex; align-items: center; gap: 10px; }
        .tick { color: #6c47ff; font-weight: 700; }
        .price-btn {
          display: block; width: 100%; text-align: center;
          background: #111; color: #fff; padding: 15px;
          border-radius: 5px; font-size: 14px; font-weight: 600;
          text-decoration: none;
          font-family: 'Inter Tight', system-ui, sans-serif;
          transition: background 0.15s;
        }
        .price-btn:hover { background: #000; }
        .price-fine { font-size: 11px; color: #bbb; text-align: center; margin-top: 12px; }

        /* FAQ */
        .faq {
          max-width: 1160px; margin: 0 auto;
          padding: 80px 48px;
          border-bottom: 1px solid #ddd;
        }
        .faq-list {}
        .faq-row { padding: 24px 0; border-top: 1px solid #ddd; }
        .faq-row:last-child { border-bottom: 1px solid #ddd; }
        .faq-q { font-size: 16px; font-weight: 700; color: #111; margin-bottom: 8px; letter-spacing: -0.01em; }
        .faq-a { font-size: 14px; color: #777; line-height: 1.7; max-width: 600px; }

        /* BOTTOM */
        .bottom {
          background: #0a0a0a; padding: 120px 48px;
          text-align: center;
        }
        .bottom-h {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.05em; line-height: 0.92;
          margin-bottom: 48px;
        }
        .bottom .btn-white {
          background: #fff; color: #111;
          padding: 15px 36px; font-size: 15px; font-weight: 700;
          border-radius: 5px; display: inline-block;
          text-decoration: none;
          font-family: 'Inter Tight', system-ui, sans-serif;
          transition: background 0.15s;
        }
        .bottom .btn-white:hover { background: #eee; }

        /* FOOTER */
        .footer {
          padding: 28px 48px;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid #ddd;
        }
        .footer-logo { font-size: 14px; font-weight: 800; color: #111; text-decoration: none; }
        .footer-logo span { color: #6c47ff; }
        .footer-links { display: flex; gap: 24px; }
        .footer-link { font-size: 12px; color: #aaa; text-decoration: none; }
        .footer-link:hover { color: #333; }
        .footer-copy { font-size: 11px; color: #ccc; }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .hero-h1 { font-size: clamp(48px, 12vw, 72px); }
          .strip { grid-template-columns: 1fr; }
          .strip-item { border-right: none; border-bottom: 1px solid #ddd; }
          .strip-item:last-child { border-bottom: none; }
          .setup { padding: 60px 20px; }
          .step { grid-template-columns: 44px 1fr; }
          .pricing { grid-template-columns: 1fr; }
          .pricing-l { border-right: none; border-bottom: 1px solid #ddd; padding: 60px 20px; }
          .pricing-r { padding: 60px 20px; }
          .faq { padding: 60px 20px; }
          .bottom { padding: 80px 20px; }
          .footer { flex-direction: column; gap: 16px; text-align: center; padding: 24px 20px; }
          .footer-links { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/" className="nav-logo">CallRecover<span>AI</span></a>
        <div className="nav-right">
          <a href="/login" className="nav-link">Sign In</a>
          <a href="/signup" className="btn-cta">Start Free Trial</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-h1">Every missed call<br />is a job you<br />didn't get.</h1>
        <p className="hero-sub">
          Someone just called your business. You didn't answer.
          We texted them back in 30 seconds.
          They're still talking to you right now.
        </p>
        <div className="hero-ctas">
          <a href="/signup" className="btn-cta">Start Free Trial</a>
          <a href="#setup" className="btn-outline">See how it works</a>
        </div>
        <p className="hero-fine">$225/mo &nbsp;&middot;&nbsp; No contracts &nbsp;&middot;&nbsp; Cancel anytime</p>
        <div className="convo-wrap">
          <p className="convo-tag">Happening right now while you're on the job</p>
          <div className="convo">
            <p className="convo-ts">Delivered &middot; 28 seconds ago</p>
            <div className="msg">
              <div className="bub a">Hey, sorry we missed your call — this is Pacific Roofing. How can we help?</div>
            </div>
            <div className="msg r">
              <div className="bub u">Hi, I need a quote for a roof replacement</div>
            </div>
            <div className="msg">
              <div className="bub a">We'd love to help. What's your address and when are you looking to start?</div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE STRIP */}
      <div className="strip">
        <div className="strip-item">
          <p className="strip-num">01</p>
          <h3 className="strip-h">Missed call text-back</h3>
          <p className="strip-p">You miss the call. 30 seconds later they get a text. AI handles the whole conversation. Lead qualified before you even check your phone.</p>
        </div>
        <div className="strip-item">
          <p className="strip-num">02</p>
          <h3 className="strip-h">Voicemail transcription</h3>
          <p className="strip-p">No more listening to 2-minute voicemails. Every message transcribed and sent to you as text. Two seconds to read. Move on.</p>
        </div>
        <div className="strip-item">
          <p className="strip-num">03</p>
          <h3 className="strip-h">Weekly revenue report</h3>
          <p className="strip-p">Every week: calls missed, leads recovered, revenue saved. That number makes it impossible to cancel.</p>
        </div>
      </div>

      {/* SETUP */}
      <div className="setup" id="setup">
        <div className="setup-head">
          <p className="eyebrow">Setup</p>
          <h2 className="big-h">Ten minutes.<br />Then forget about it.</h2>
          <p className="big-p">Dial one code. Done. Your number doesn't change. Nothing changes. Except missed calls start getting answered.</p>
        </div>
        <div className="steps">
          {[
            ['01', 'You sign up. We give you a number.', 'Two minutes. You get a dedicated CallRecoverAI number assigned to your business.'],
            ['02', 'One code on your phone.', 'Forward missed calls to your CallRecoverAI number. 30 seconds. Your main number stays exactly the same.'],
            ['03', 'AI takes it from here.', 'Miss a call → customer texted in 30 seconds → AI qualifies the lead → you get notified. Review every conversation whenever you want.'],
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
      </div>

      {/* PRICING */}
      <div className="pricing" id="pricing">
        <div className="pricing-l">
          <p className="eyebrow">Pricing</p>
          <h2 className="big-h">One price.<br />No surprises.</h2>
          <p className="big-p">One missed job pays for six months. Most owners see it pay for itself in the first week.</p>
          <div className="price-big">$225</div>
          <p className="price-mo">per month</p>
        </div>
        <div className="pricing-r">
          <p className="eyebrow" style={{marginBottom: 32}}>What's included</p>
          <ul className="feat-list">
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
          <a href="/signup" className="price-btn">Start Free Trial</a>
          <p className="price-fine">Free trial · No credit card required · Cancel anytime</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq" id="faq">
        <p className="eyebrow" style={{marginBottom: 40}}>Before you ask.</p>
        <div className="faq-list">
          {[
            ['Does my phone number change?', 'No. Your main number stays exactly the same. You just forward missed calls to your CallRecoverAI number. 30 seconds to set up.'],
            ['What does the AI say?', 'Whatever you tell it to. You set your business name, industry, and tone during signup. It introduces itself as your business. Every conversation is in your dashboard.'],
            ['What if a customer replies?', 'AI keeps going — gets their name, what they need, best time to reach them. You get a notification. Everything is waiting for you when you check in.'],
            ['Is there a contract?', 'No. Month to month. Cancel from your dashboard in one click.'],
            ['What happens when I cancel?', 'Active until the end of your billing period. Then it stops. No charges, no hassle.'],
          ].map(([q, a]) => (
            <div className="faq-row" key={q}>
              <p className="faq-q">{q}</p>
              <p className="faq-a">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bottom">
        <h2 className="bottom-h">Stop leaving<br />money on the table.</h2>
        <a href="/signup" className="btn-white">Start Free Trial</a>
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
