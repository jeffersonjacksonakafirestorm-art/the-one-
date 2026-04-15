'use client';
import React from 'react';
import { useState } from 'react';

const S = {
  page: { background: '#000', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif", minHeight: '100vh' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 64, borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, background: '#000', zIndex: 10 },
  logo: { fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', textDecoration: 'none', color: '#fff' },
  navLinks: { display: 'flex', gap: 32 },
  navLink: { fontSize: 14, color: '#888', textDecoration: 'none', fontWeight: 500 },
  navCta: { background: '#fff', color: '#000', fontSize: 14, fontWeight: 700, padding: '9px 20px', borderRadius: 8, textDecoration: 'none' },
  navSignIn: { fontSize: 14, color: '#888', textDecoration: 'none', fontWeight: 500 },
  hero: { maxWidth: 1100, margin: '0 auto', padding: '120px 40px 100px' },
  tag: { display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #333', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 28 },
  dot: { width: 6, height: 6, background: '#fff', borderRadius: '50%' },
  h1: { fontSize: 'clamp(3rem, 5.5vw, 4.8rem)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.04em', marginBottom: 24, maxWidth: 760 },
  heroSub: { fontSize: 18, color: '#888', lineHeight: 1.7, marginBottom: 44, maxWidth: 580 },
  heroCtas: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 },
  btnPrimary: { background: '#fff', color: '#000', fontWeight: 700, fontSize: 15, padding: '13px 28px', borderRadius: 10, textDecoration: 'none', display: 'inline-block' },
  btnGhost: { color: '#888', fontWeight: 500, fontSize: 14, textDecoration: 'none' },
  statsRow: { display: 'flex', alignItems: 'center', gap: 36, paddingTop: 8 },
  statItem: { display: 'flex', flexDirection: 'column', gap: 3 },
  statNum: { fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' },
  statLabel: { fontSize: 12, color: '#888' },
  statSep: { width: 1, height: 32, background: '#222' },
  divider: { borderTop: '1px solid #1a1a1a', background: '#0a0a0a', padding: '28px 0' },
  section: { maxWidth: 1100, margin: '0 auto', padding: '100px 40px' },
  sectionTag: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 16 },
  sectionH2: { fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 },
  sectionSub: { fontSize: 16, color: '#888', lineHeight: 1.7, maxWidth: 560 },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 56, background: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden' },
  stepCard: { background: '#000', padding: '36px 28px' },
  stepNum: { fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#555', marginBottom: 20, display: 'block' },
  stepH3: { fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' },
  stepP: { fontSize: 14, color: '#888', lineHeight: 1.65 },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 56, background: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden' },
  featCard: { background: '#000', padding: '36px 32px' },
  featLabel: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 12, display: 'block' },
  featH3: { fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 },
  featP: { fontSize: 14, color: '#888', lineHeight: 1.7 },
  featDetail: { marginTop: 16, paddingTop: 16, borderTop: '1px solid #111', fontSize: 12, color: '#555' },
  pricingWrap: { background: '#0a0a0a', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' },
  pricingInner: { maxWidth: 1100, margin: '0 auto', padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'center' },
  includesList: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 },
  includesItem: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#888' },
  checkMark: { color: '#fff', fontWeight: 700, flexShrink: 0, marginTop: 1 },
  priceCard: { background: '#000', border: '1px solid #333', borderRadius: 20, overflow: 'hidden' },
  priceTop: { padding: '36px 36px 28px', borderBottom: '1px solid #1a1a1a' },
  priceName: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 16 },
  priceAmt: { fontSize: 60, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10 },
  priceDollar: { fontSize: 30, verticalAlign: 'super' },
  pricePer: { fontSize: 16, fontWeight: 500, color: '#888' },
  priceTagline: { fontSize: 13, color: '#888', marginTop: 8 },
  priceFeatures: { padding: '24px 36px', display: 'flex', flexDirection: 'column', gap: 10 },
  priceItem: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 },
  priceCta: { display: 'block', background: '#fff', color: '#000', textAlign: 'center', fontWeight: 700, fontSize: 15, padding: '15px 24px', margin: '0 36px 16px', borderRadius: 10, textDecoration: 'none' },
  priceNote: { textAlign: 'center', fontSize: 12, color: '#555', padding: '0 36px 28px' },
  faqWrap: { background: '#0a0a0a', borderTop: '1px solid #1a1a1a' },
  faqInner: { maxWidth: 760, margin: '0 auto', padding: '100px 40px' },
  faqList: { border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden', marginTop: 40 },
  faqItem: { borderBottom: '1px solid #1a1a1a' },
  faqQ: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 24px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', textAlign: 'left', gap: 16 },
  faqIcon: { fontSize: 20, fontWeight: 300, color: '#555', flexShrink: 0 },
  faqA: { padding: '0 24px 20px', fontSize: 14, color: '#888', lineHeight: 1.75 },
  ctaFinal: { textAlign: 'center', padding: '120px 40px', maxWidth: 620, margin: '0 auto' },
  ctaH2: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 },
  ctaP: { fontSize: 16, color: '#888', lineHeight: 1.7, marginBottom: 36 },
  ctaNote: { marginTop: 14, fontSize: 12, color: '#555' },
  footer: { background: '#0a0a0a', borderTop: '1px solid #1a1a1a', padding: '56px 40px 32px' },
  footerInner: { maxWidth: 1100, margin: '0 auto' },
  footerTop: { display: 'flex', gap: 80, marginBottom: 40 },
  footerBrand: { maxWidth: 220 },
  footerBrandP: { fontSize: 13, color: '#888', lineHeight: 1.6, marginTop: 10 },
  footerLinks: { display: 'flex', gap: 56, flex: 1, justifyContent: 'flex-end' },
  footerCol: { display: 'flex', flexDirection: 'column', gap: 10 },
  footerColH4: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 4 },
  footerColA: { fontSize: 13, color: '#888', textDecoration: 'none' },
  footerBottom: { borderTop: '1px solid #1a1a1a', paddingTop: 20, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#555' },
};

const faqs = [
  { q: 'What kinds of businesses is Groundwork built for?', a: 'Groundwork is purpose-built for trade and service businesses — roofing, HVAC, plumbing, electrical, landscaping, and similar. If you take jobs, send quotes, and have repeat customers, Groundwork is for you.' },
  { q: 'How does the automation actually work?', a: 'You add jobs to the pipeline. Groundwork handles the rest — drafting and queueing quote emails, sending follow-ups after 48 hours of silence, generating invoices when jobs complete, and scheduling reactivation emails to past customers at the right time.' },
  { q: 'Do I have to approve every email before it sends?', a: 'By default, yes — every outgoing email goes into your Pending tab for review. You can approve, edit, or dismiss each one. You can also turn off approval-gating in Settings if you prefer full automation.' },
  { q: 'What is the Pulse Report?', a: 'Every Monday at 7am, Groundwork sends you a summary of the past week — jobs added, quotes sent, close rate, revenue invoiced, and revenue collected. One email, every week, no dashboard required.' },
  { q: 'How does customer reactivation work?', a: 'When a job is marked complete, Groundwork schedules a reactivation email for 6–12 months later, timed to the right season for your trade. A roofing customer gets a spring check-in; an HVAC customer gets a pre-summer tune-up prompt.' },
  { q: 'Is there a free trial?', a: 'Yes. Start a free trial with no credit card required. Explore the full platform. When you\'re ready, continue at $497/month with no long-term contract.' },
];

const priceIncludes = [
  'Full job pipeline (New → Quoted → Booked → In Progress → Complete → Invoiced → Paid)',
  'AI-drafted quote, follow-up, and invoice emails',
  'Customer reactivation campaigns',
  'Weekly Pulse Report every Monday',
  'Approve-before-send email control',
  'Service menu with custom pricing',
  'Unlimited customers and jobs',
  'No contracts — cancel anytime',
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={S.page}>
      {/* NAV */}
      <nav style={S.nav}>
        <a href="/" style={S.logo}>Groundwork</a>
        <div style={S.navLinks}>
          <a href="#how" style={S.navLink}>How It Works</a>
          <a href="#features" style={S.navLink}>Features</a>
          <a href="#pricing" style={S.navLink}>Pricing</a>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/login" style={S.navSignIn}>Sign In</a>
          <a href="/signup" style={S.navCta}>Start Free Trial</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={S.hero}>
        <div style={S.tag}>
          <span style={S.dot} />
          Built for roofing, HVAC, plumbing, electrical, landscaping
        </div>
        <h1 style={S.h1}>The Operating System for Your Trade Business.</h1>
        <p style={S.heroSub}>
          Groundwork automates your quotes, follow-ups, invoices, customer reactivation, and weekly business reports — so you can stay on the job without letting work fall through the cracks.
        </p>
        <div style={S.heroCtas}>
          <a href="/signup" style={S.btnPrimary}>Start Free Trial</a>
          <a href="#how" style={S.btnGhost}>See how it works &darr;</a>
        </div>
        <div style={S.statsRow}>
          <div style={S.statItem}>
            <strong style={S.statNum}>7</strong>
            <span style={S.statLabel}>pipeline stages</span>
          </div>
          <div style={S.statSep} />
          <div style={S.statItem}>
            <strong style={S.statNum}>48h</strong>
            <span style={S.statLabel}>auto follow-up</span>
          </div>
          <div style={S.statSep} />
          <div style={S.statItem}>
            <strong style={S.statNum}>$0</strong>
            <span style={S.statLabel}>to start</span>
          </div>
          <div style={S.statSep} />
          <div style={S.statItem}>
            <strong style={S.statNum}>100%</strong>
            <span style={S.statLabel}>yours to control</span>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={S.section}>
          <div style={S.sectionTag}>How it works</div>
          <h2 style={S.sectionH2}>Up and running<br />in three steps.</h2>
          <p style={S.sectionSub}>No complicated setup. No new phone system. Groundwork works the way your business already works.</p>
          <div style={S.stepsGrid}>
            <div style={S.stepCard}>
              <span style={S.stepNum}>01</span>
              <h3 style={S.stepH3}>Set up your service menu and pricing</h3>
              <p style={S.stepP}>Add the services you offer and your standard rates. Groundwork uses these to pre-fill quotes and invoices automatically — no typing the same thing twice.</p>
            </div>
            <div style={{ ...S.stepCard, borderLeft: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}>
              <span style={S.stepNum}>02</span>
              <h3 style={S.stepH3}>Add jobs as they come in</h3>
              <p style={S.stepP}>When a customer calls or you land a new lead, add a job in seconds. Pick the customer, pick the service, add any notes. That&apos;s it — Groundwork takes it from there.</p>
            </div>
            <div style={S.stepCard}>
              <span style={S.stepNum}>03</span>
              <h3 style={S.stepH3}>Groundwork handles everything else automatically</h3>
              <p style={S.stepP}>Quotes get drafted. Follow-ups go out at 48 hours. Invoices generate when jobs close. Past customers get reactivated. Your Pulse Report lands every Monday morning.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features">
        <div style={S.section}>
          <div style={S.sectionTag}>What you get</div>
          <h2 style={S.sectionH2}>Three engines running<br />while you work.</h2>
          <p style={S.sectionSub}>Groundwork is built around three core automations that keep your pipeline moving and your revenue growing.</p>
          <div style={S.featGrid}>
            <div style={S.featCard}>
              <span style={S.featLabel}>Job Lifecycle Engine</span>
              <h3 style={S.featH3}>Every job, every step, handled.</h3>
              <p style={S.featP}>Track jobs from first call to final payment in a 7-stage pipeline. When you move a job to Quoted, Groundwork drafts the email. When it closes, the invoice goes out. When it&apos;s paid, the reactivation timer starts. Zero tasks fall through the cracks.</p>
              <div style={S.featDetail}>New &rarr; Quoted &rarr; Booked &rarr; In Progress &rarr; Complete &rarr; Invoiced &rarr; Paid</div>
            </div>
            <div style={{ ...S.featCard, borderLeft: '1px solid #1a1a1a' }}>
              <span style={S.featLabel}>Customer Reactivation</span>
              <h3 style={S.featH3}>Bring last year&apos;s customers back.</h3>
              <p style={S.featP}>When a job is marked paid, Groundwork schedules a reactivation email for 6–12 months later — timed to the season that makes sense for your trade. A roofing customer gets a spring maintenance prompt. HVAC gets a pre-summer tune-up. No manual follow-up list required.</p>
              <div style={S.featDetail}>AI-drafted &middot; Seasonally timed &middot; Fully controllable</div>
            </div>
            <div style={{ ...S.featCard, borderLeft: '1px solid #1a1a1a' }}>
              <span style={S.featLabel}>Business Pulse Report</span>
              <h3 style={S.featH3}>Your week in one email, every Monday.</h3>
              <p style={S.featP}>Jobs added. Quotes sent. Close rate. Revenue invoiced. Revenue collected. Every Monday at 7am, Groundwork sends a clear business summary so you always know where you stand — without logging in.</p>
              <div style={S.featDetail}>Delivered every Monday 7am &middot; Calculated from your real data</div>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={S.pricingWrap}>
        <div style={S.pricingInner}>
          <div>
            <div style={S.sectionTag}>Pricing</div>
            <h2 style={S.sectionH2}>One flat rate.<br />Everything included.</h2>
            <p style={S.sectionSub}>No per-seat fees. No usage limits. No add-ons. Just the full platform at a single monthly price — less than most tools charge for one feature.</p>
            <div style={S.includesList}>
              {priceIncludes.map((item, i) => (
                <div key={i} style={S.includesItem}>
                  <span style={S.checkMark}>&#10003;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={S.priceCard}>
            <div style={S.priceTop}>
              <div style={S.priceName}>Groundwork</div>
              <div style={S.priceAmt}><span style={S.priceDollar}>$</span>497<span style={S.pricePer}>/mo</span></div>
              <p style={S.priceTagline}>Free trial included. Cancel anytime. No credit card to start.</p>
            </div>
            <div style={S.priceFeatures}>
              {['Job pipeline (7 stages)', 'AI-drafted emails', 'Quote & invoice automation', '48h follow-up automation', 'Customer reactivation', 'Weekly Pulse Report', 'Service menu + custom pricing', 'Approve-before-send control'].map(item => (
                <div key={item} style={S.priceItem}>
                  <span style={S.checkMark}>&#10003;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href="/signup" style={S.priceCta}>Start Free Trial</a>
            <p style={S.priceNote}>No credit card required to start</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={S.faqWrap}>
        <div style={S.faqInner}>
          <div style={S.sectionTag}>Questions</div>
          <h2 style={{ ...S.sectionH2, marginBottom: 0 }}>FAQ</h2>
          <div style={S.faqList}>
            {faqs.map((f, i) => (
              <div key={i} style={{ ...S.faqItem, ...(i === faqs.length - 1 ? { borderBottom: 'none' } : {}) }}>
                <button style={S.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span style={S.faqIcon}>{openFaq === i ? '\u2212' : '+'}</span>
                </button>
                {openFaq === i && <p style={S.faqA}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={S.ctaFinal}>
        <h2 style={S.ctaH2}>Ready to run your business like a business?</h2>
        <p style={S.ctaP}>Stop losing jobs to missed follow-ups and slow invoices. Groundwork keeps your pipeline moving automatically.</p>
        <a href="/signup" style={S.btnPrimary}>Start Free Trial</a>
        <p style={S.ctaNote}>No credit card required &middot; Free trial &middot; Cancel anytime</p>
      </div>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div style={S.footerTop}>
            <div style={S.footerBrand}>
              <a href="/" style={{ ...S.logo, textDecoration: 'none', color: '#fff', fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em' }}>Groundwork</a>
              <p style={S.footerBrandP}>The operating system for trade and service businesses.</p>
            </div>
            <div style={S.footerLinks}>
              <div style={S.footerCol}>
                <h4 style={S.footerColH4}>Product</h4>
                <a href="#how" style={S.footerColA}>How It Works</a>
                <a href="#features" style={S.footerColA}>Features</a>
                <a href="#pricing" style={S.footerColA}>Pricing</a>
              </div>
              <div style={S.footerCol}>
                <h4 style={S.footerColH4}>Account</h4>
                <a href="/signup" style={S.footerColA}>Start Free Trial</a>
                <a href="/login" style={S.footerColA}>Sign In</a>
              </div>
              <div style={S.footerCol}>
                <h4 style={S.footerColH4}>Legal</h4>
                <a href="/privacy" style={S.footerColA}>Privacy Policy</a>
                <a href="/terms" style={S.footerColA}>Terms of Service</a>
              </div>
            </div>
          </div>
          <div style={S.footerBottom}>
            <span>&copy; 2026 Groundwork. All rights reserved.</span>
            <span>Built for roofing, HVAC, plumbing, electrical &amp; landscaping.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
