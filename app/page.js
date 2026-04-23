'use client';
import { useState } from 'react';
import Link from 'next/link';

const S = {
  page: { background: '#000', color: '#fff', minHeight: '100vh', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  navLogo: { fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' },
  navLinks: { display: 'flex', gap: 8, alignItems: 'center' },
  btnOutline: { padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  btnWhite: { padding: '8px 16px', borderRadius: 8, border: 'none', background: '#fff', color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  hero: { textAlign: 'center', padding: '80px 24px 64px', maxWidth: 720, margin: '0 auto' },
  badge: { display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)', marginBottom: 28 },
  h1: { fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 24px' },
  sub: { fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 40px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' },
  trialBox: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '28px 32px', maxWidth: 480, margin: '0 auto 16px' },
  trialLabel: { fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginBottom: 12, textTransform: 'uppercase' },
  input: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 12 },
  btnBig: { width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.01em' },
  trialNote: { fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 8 },
  section: { padding: '80px 24px', maxWidth: 1100, margin: '0 auto' },
  sectionTitle: { fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48, textAlign: 'center' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 },
  cardIcon: { fontSize: 28, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' },
  cardDesc: { fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 },
  pricingSection: { padding: '80px 24px', background: 'rgba(255,255,255,0.02)' },
  pricingWrap: { maxWidth: 900, margin: '0 auto' },
  pricingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 48 },
  pricingCard: { background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32 },
  pricingCardPro: { background: '#fff', color: '#000', border: 'none', borderRadius: 20, padding: 32 },
  planName: { fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, color: 'rgba(255,255,255,0.5)' },
  planNamePro: { fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, color: 'rgba(0,0,0,0.5)' },
  price: { fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 4px' },
  pricePer: { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 },
  pricePerPro: { fontSize: 13, color: 'rgba(0,0,0,0.4)', marginBottom: 28 },
  featureList: { listStyle: 'none', padding: 0, margin: '0 0 28px' },
  featureItem: { display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12, fontSize: 14 },
  btnPlan: { width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer', textDecoration: 'none', display: 'block', textAlign: 'center' },
  btnPlanDark: { width: '100%', background: '#000', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer', textDecoration: 'none', display: 'block', textAlign: 'center' },
  divider: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '0' },
  footer: { padding: '40px 24px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 },
  footerLinks: { display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 16 },
}

const FEATURES = [
  { icon: '🎯', title: 'Your exact plan', desc: 'Tell us your income, debt, and goal. Get a specific roadmap built for your numbers — not a generic article.' },
  { icon: '📷', title: 'Send any document', desc: 'Upload a pay stub, bank statement, or credit card bill. The AI reads it and tells you exactly what to do.' },
  { icon: '📊', title: 'Track your progress', desc: 'Milestone checklist, streak tracking, and a visual roadmap showing how far you\'ve come.' },
  { icon: '🎙️', title: 'Talk or type', desc: 'Use your voice or keyboard. Ask follow-up questions anytime. The AI remembers your full situation.' },
  { icon: '🤝', title: 'Community stories', desc: 'Real wins from real people who started exactly where you are. Browse and post your own progress.' },
  { icon: '🎁', title: 'Referral rewards', desc: 'Give a friend 1 free month, get 1 free month. Share what\'s actually working.' },
]

const BASIC_FEATURES = ['Unlimited AI coaching', 'Photo & document analysis', 'Voice input', 'Progress roadmap', 'Community access', 'Chat history']
const PRO_FEATURES = ['Everything in Basic', 'Weekly AI progress reports', 'Downloadable financial plans', 'Priority responses', 'Early feature access']

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleTrial(e) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), trial: true }),
      })
      if (res.ok) {
        sessionStorage.setItem('pendingEmail', email.trim())
        sessionStorage.setItem('trialMode', 'true')
        window.location.href = '/verify'
      }
    } catch {}
    setLoading(false)
  }

  return (
    <div style={S.page}>
      {/* Nav */}
      <nav style={S.nav}>
        <div style={S.navLogo}>Actionable AI</div>
        <div style={S.navLinks}>
          <Link href="/login" style={S.btnOutline}>Log in</Link>
          <Link href="/signup" style={S.btnWhite}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.badge}>FREE TRIAL — NO ACCOUNT NEEDED</div>
        <h1 style={S.h1}>Stop getting<br />generic advice.</h1>
        <p style={S.sub}>Get a real financial plan built around your exact income, debt, and goal. One message. No fluff.</p>

        <form onSubmit={handleTrial} style={S.trialBox}>
          <div style={S.trialLabel}>Try it free — no credit card</div>
          <input
            style={S.input}
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button style={S.btnBig} type="submit" disabled={loading}>
            {loading ? 'Sending code...' : 'Get my free plan →'}
          </button>
          <p style={S.trialNote}>Enter your email → get a verification code → type your situation → get your plan</p>
        </form>
      </div>

      <div style={S.divider} />

      {/* Features */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Everything you need. Nothing you don't.</div>
        <div style={S.grid3}>
          {FEATURES.map(f => (
            <div key={f.title} style={S.card}>
              <div style={S.cardIcon}>{f.icon}</div>
              <div style={S.cardTitle}>{f.title}</div>
              <div style={S.cardDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* Proof */}
      <div style={S.section}>
        <div style={S.sectionTitle}>What people are saying</div>
        <div style={S.grid3}>
          {[
            { quote: "I uploaded my credit card statement and it built me a payoff plan in 30 seconds. I'd been avoiding this for 2 years.", name: "Marcus T.", detail: "Paid off $8,400 in 14 months" },
            { quote: "I'm 22 with $0 saved and working a 9-5. It gave me an actual number to hit each month. No one had ever done that for me.", name: "Jasmine R.", detail: "$1,200 saved in 60 days" },
            { quote: "Not a generic 'spend less latte' thing. It looked at my actual salary and told me exactly where to put each dollar.", name: "Devon K.", detail: "First $10k emergency fund" },
          ].map(t => (
            <div key={t.name} style={{ ...S.card, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', margin: 0 }}>"{t.quote}"</p>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* Pricing */}
      <div style={S.pricingSection}>
        <div style={S.pricingWrap}>
          <div style={{ ...S.sectionTitle, textAlign: 'center' }}>Simple pricing.</div>
          <div style={S.pricingGrid}>
            {/* Basic */}
            <div style={S.pricingCard}>
              <div style={S.planName}>Basic</div>
              <div style={S.price}>$15</div>
              <div style={S.pricePer}>per month</div>
              <ul style={S.featureList}>
                {BASIC_FEATURES.map(f => (
                  <li key={f} style={S.featureItem}>
                    <span style={{ color: '#fff', marginTop: 1 }}>✓</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/subscribe?plan=basic" style={S.btnPlan}>Start Basic</Link>
            </div>
            {/* Pro */}
            <div style={S.pricingCardPro}>
              <div style={S.planNamePro}>Pro</div>
              <div style={{ ...S.price, color: '#000' }}>$49</div>
              <div style={S.pricePerPro}>per month</div>
              <ul style={S.featureList}>
                {PRO_FEATURES.map(f => (
                  <li key={f} style={S.featureItem}>
                    <span style={{ color: '#000', marginTop: 1 }}>✓</span>
                    <span style={{ color: 'rgba(0,0,0,0.7)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/subscribe?plan=pro" style={S.btnPlanDark}>Start Pro</Link>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 24 }}>Try free first — no credit card. Cancel anytime.</p>
        </div>
      </div>

      {/* Footer */}
      <div style={S.footer}>
        <div style={S.footerLinks}>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Terms</Link>
          <Link href="/stories" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Community</Link>
        </div>
        <div>© 2025 Actionable AI. All rights reserved.</div>
      </div>
    </div>
  )
}
