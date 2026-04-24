'use client';
import { useState } from 'react';
import Link from 'next/link';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

const S = {
  page: { background: '#fafafa', color: '#0a0a0a', minHeight: '100vh', fontFamily: INT },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 100 },
  navLogo: { fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: GRK },
  navLinks: { display: 'flex', gap: 8, alignItems: 'center' },
  btnNav: { padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.14)', background: 'transparent', color: '#0a0a0a', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  btnNavDark: { padding: '8px 16px', borderRadius: 8, border: 'none', background: '#0a0a0a', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },

  hero: { textAlign: 'center', padding: '96px 24px 80px', maxWidth: 820, margin: '0 auto' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 7, background: '#0a0a0a', color: '#fff', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 36 },
  badgeDot: { width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0 },
  h1: { fontSize: 'clamp(44px, 8.5vw, 82px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.0, margin: '0 0 24px', fontFamily: GRK, color: '#0a0a0a' },
  sub: { fontSize: 18, color: 'rgba(0,0,0,0.52)', lineHeight: 1.7, margin: '0 auto 44px', maxWidth: 520, fontFamily: INT },
  heroForm: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 },
  heroInput: { padding: '14px 18px', borderRadius: 10, border: '1.5px solid rgba(0,0,0,0.14)', background: '#fff', color: '#0a0a0a', fontSize: 15, outline: 'none', fontFamily: INT, width: 280 },
  btnHero: { padding: '14px 24px', borderRadius: 10, background: '#0a0a0a', color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', fontFamily: INT },
  heroClaim: { fontSize: 13, color: 'rgba(0,0,0,0.38)', fontFamily: INT },

  divider: { height: 1, background: 'rgba(0,0,0,0.07)' },

  section: { padding: '80px 32px', maxWidth: 1180, margin: '0 auto' },
  sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 14 },
  sectionTitle: { fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.035em', marginBottom: 48, fontFamily: GRK, color: '#0a0a0a', lineHeight: 1.08 },

  agentGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 },
  agentCard: { background: '#fff', border: '1.5px solid rgba(0,0,0,0.09)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 14 },
  agentCardFeatured: { background: '#0a0a0a', border: 'none', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 14 },
  agentIconWrap: { width: 46, height: 46, borderRadius: 13, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },
  agentIconWrapDark: { width: 46, height: 46, borderRadius: 13, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },
  agentName: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.025em', fontFamily: GRK, color: '#0a0a0a' },
  agentNameLight: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.025em', fontFamily: GRK, color: '#fff' },
  agentDesc: { fontSize: 14, color: 'rgba(0,0,0,0.52)', lineHeight: 1.65, flexGrow: 1, fontFamily: INT },
  agentDescLight: { fontSize: 14, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, flexGrow: 1, fontFamily: INT },
  toolsRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  chip: { background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.58)', borderRadius: 100, padding: '4px 10px', fontSize: 12, fontWeight: 600 },
  chipLight: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', borderRadius: 100, padding: '4px 10px', fontSize: 12, fontWeight: 600 },
  btnDeploy: { display: 'block', textAlign: 'center', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', marginTop: 'auto', fontFamily: INT },
  btnDeployLight: { display: 'block', textAlign: 'center', background: '#fff', color: '#0a0a0a', border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', marginTop: 'auto', fontFamily: INT },
  viewAllLink: { textAlign: 'center', marginTop: 28, fontSize: 14, color: 'rgba(0,0,0,0.45)', textDecoration: 'none', fontWeight: 600 },

  toolsSection: { padding: '80px 32px', background: '#fff' },
  toolsInner: { maxWidth: 1180, margin: '0 auto' },
  toolsGrid: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 },
  toolCard: { background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 12, padding: '18px 10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 },
  toolEmoji: { fontSize: 22 },
  toolName: { fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.55)', fontFamily: INT },
  toolsNote: { textAlign: 'center', fontSize: 13, color: 'rgba(0,0,0,0.32)', marginTop: 22, fontFamily: INT },

  stepsSection: { padding: '80px 32px' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 },
  step: { display: 'flex', flexDirection: 'column', gap: 14 },
  stepNum: { width: 30, height: 30, borderRadius: 9, background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 },
  stepTitle: { fontSize: 18, fontWeight: 700, letterSpacing: '-0.025em', fontFamily: GRK, color: '#0a0a0a' },
  stepDesc: { fontSize: 14, color: 'rgba(0,0,0,0.52)', lineHeight: 1.65, fontFamily: INT },

  pricingSection: { padding: '80px 32px', background: '#fff' },
  pricingInner: { maxWidth: 980, margin: '0 auto' },
  pricingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 48 },
  pCard: { background: '#fafafa', border: '1.5px solid rgba(0,0,0,0.09)', borderRadius: 20, padding: 30, display: 'flex', flexDirection: 'column' },
  pCardDark: { background: '#0a0a0a', border: 'none', borderRadius: 20, padding: 30, display: 'flex', flexDirection: 'column' },
  pLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 16 },
  pLabelLight: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 },
  pPrice: { fontSize: 50, fontWeight: 700, letterSpacing: '-0.04em', fontFamily: GRK, lineHeight: 1, color: '#0a0a0a' },
  pPricePer: { fontSize: 13, color: 'rgba(0,0,0,0.38)', marginBottom: 24, marginTop: 4 },
  pPricePerLight: { fontSize: 13, color: 'rgba(255,255,255,0.38)', marginBottom: 24, marginTop: 4 },
  pFeatures: { listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 },
  pFeature: { display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 14, color: 'rgba(0,0,0,0.65)', fontFamily: INT },
  pFeatureLight: { display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.68)', fontFamily: INT },
  btnPlan: { display: 'block', textAlign: 'center', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: INT },
  btnPlanLight: { display: 'block', textAlign: 'center', background: '#fff', color: '#0a0a0a', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: INT },

  builderSection: { padding: '80px 32px', background: '#0a0a0a' },
  builderInner: { maxWidth: 640, margin: '0 auto', textAlign: 'center' },
  builderLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 },
  builderTitle: { fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.035em', fontFamily: GRK, color: '#fff', lineHeight: 1.1, marginBottom: 18 },
  builderSub: { fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 36, fontFamily: INT },
  btnBuilder: { display: 'inline-block', background: '#fff', color: '#0a0a0a', border: 'none', borderRadius: 11, padding: '14px 26px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: INT },

  footer: { padding: '36px 32px', textAlign: 'center', color: 'rgba(0,0,0,0.35)', fontSize: 13, background: '#fff', borderTop: '1px solid rgba(0,0,0,0.07)', fontFamily: INT },
  footerLinks: { display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' },
  footerLink: { color: 'rgba(0,0,0,0.38)', textDecoration: 'none' },
}

const AGENTS = [
  {
    id: 'revenue-manager',
    icon: '💳',
    name: 'Revenue Manager',
    desc: 'Monitors your Stripe in real time, flags overdue invoices, summarizes weekly revenue, and drafts payment reminders — hands-free.',
    tools: ['Stripe', 'Gmail'],
    featured: false,
  },
  {
    id: 'commander',
    icon: '⚡',
    name: 'The Commander',
    desc: 'One agent. Every tool. Tell it what you need in plain English and it handles the rest — billing, scheduling, outreach, and reporting.',
    tools: ['Stripe', 'Calendly', 'Gmail', 'CRM', '+more'],
    featured: true,
  },
  {
    id: 'schedule-manager',
    icon: '📅',
    name: 'Schedule Manager',
    desc: 'Manages your Calendly availability, confirms bookings, sends reminders, and reschedules when things come up — 24/7.',
    tools: ['Calendly', 'Google Cal', 'Gmail'],
    featured: false,
  },
]

const TOOLS = [
  { emoji: '💳', name: 'Stripe' },
  { emoji: '📅', name: 'Calendly' },
  { emoji: '📧', name: 'Gmail' },
  { emoji: '💬', name: 'Slack' },
  { emoji: '🎯', name: 'HubSpot' },
  { emoji: '📝', name: 'Notion' },
  { emoji: '▶️', name: 'YouTube' },
  { emoji: '🛍️', name: 'Shopify' },
  { emoji: '📊', name: 'QuickBooks' },
  { emoji: '📋', name: 'Airtable' },
  { emoji: '⚡', name: 'Zapier' },
  { emoji: '📱', name: 'Twilio' },
  { emoji: '📆', name: 'Google Cal' },
  { emoji: '💼', name: 'LinkedIn' },
  { emoji: '🎮', name: 'Discord' },
  { emoji: '☁️', name: 'Salesforce' },
  { emoji: '🐙', name: 'GitHub' },
  { emoji: '🟢', name: 'WhatsApp' },
]

const STEPS = [
  {
    num: 1,
    title: 'Browse the market',
    desc: 'Find an AI employee built for your exact use case — billing, scheduling, outreach, content, and more.',
  },
  {
    num: 2,
    title: 'Connect your tools',
    desc: 'Link Stripe, Calendly, or your CRM. Your agent needs access to actually do the work — not just talk about it.',
  },
  {
    num: 3,
    title: 'Talk to it in plain English',
    desc: '"Send invoices to everyone who hasn\'t paid" or "Block my calendar next Tuesday." It handles the rest.',
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    per: 'forever',
    features: ['1 AI employee', '100 messages / month', 'Connect 1 tool', 'Chat interface'],
    dark: false,
    cta: 'Start free',
    href: '/signup',
  },
  {
    name: 'Pro',
    price: '$49',
    per: 'per month',
    features: ['5 AI employees', 'Unlimited messages', 'Connect all tools', 'Priority support', 'Early access to new agents'],
    dark: true,
    cta: 'Start Pro',
    href: '/subscribe?plan=pro',
  },
  {
    name: 'Builder',
    price: '$99',
    per: 'per month',
    features: ['Everything in Pro', 'List your own agents', 'Revenue share on deployments', 'Builder analytics', 'Beta features first'],
    dark: false,
    cta: 'Apply for access',
    href: '/signup?plan=builder',
  },
]

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleStart(e) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        sessionStorage.setItem('pendingEmail', email.trim())
        window.location.href = '/verify'
      }
    } catch {}
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .agent-grid { grid-template-columns: 1fr !important; }
          .tools-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .nav-market { display: none !important; }
          .hero-input { width: 100% !important; }
        }
        @media (max-width: 500px) {
          .tools-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
      <div style={S.page}>

        {/* Nav */}
        <nav style={S.nav}>
          <div style={S.navLogo}>Actionable AI</div>
          <div style={S.navLinks}>
            <Link href="/market" style={S.btnNav} className="nav-market">Market</Link>
            <Link href="/login" style={S.btnNav}>Log in</Link>
            <Link href="/signup" style={S.btnNavDark}>Get started</Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={S.hero}>
          <div style={S.badge}>
            <span style={S.badgeDot} />
            Beta — Now live
          </div>
          <h1 style={S.h1}>AI employees that<br />work while you sleep.</h1>
          <p style={S.sub}>
            Deploy intelligent agents that manage your Stripe, run your Calendly, and operate your CRM — in plain English. No code. No babysitting.
          </p>
          <form onSubmit={handleStart} style={S.heroForm}>
            <input
              style={S.heroInput}
              className="hero-input"
              type="email"
              placeholder="Your work email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button style={S.btnHero} type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Deploy your first agent →'}
            </button>
          </form>
          <div style={S.heroClaim}>Free to start · No credit card needed</div>
        </div>

        <div style={S.divider} />

        {/* Agent Cards */}
        <div style={S.section}>
          <div style={S.sectionLabel}>The Market</div>
          <div style={S.sectionTitle}>Meet your new team.</div>
          <div style={S.agentGrid} className="agent-grid">
            {AGENTS.map(a => (
              <div key={a.id} style={a.featured ? S.agentCardFeatured : S.agentCard}>
                <div style={a.featured ? S.agentIconWrapDark : S.agentIconWrap}>{a.icon}</div>
                <div style={a.featured ? S.agentNameLight : S.agentName}>{a.name}</div>
                <div style={a.featured ? S.agentDescLight : S.agentDesc}>{a.desc}</div>
                <div style={S.toolsRow}>
                  {a.tools.map(t => (
                    <span key={t} style={a.featured ? S.chipLight : S.chip}>{t}</span>
                  ))}
                </div>
                <Link href={`/market`} style={a.featured ? S.btnDeployLight : S.btnDeploy}>
                  Deploy →
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link href="/market" style={S.viewAllLink}>View all agents in the market →</Link>
          </div>
        </div>

        <div style={S.divider} />

        {/* Tools Grid */}
        <div style={S.toolsSection}>
          <div style={S.toolsInner}>
            <div style={{ ...S.sectionLabel, textAlign: 'center' }}>Integrations</div>
            <div style={{ ...S.sectionTitle, textAlign: 'center', marginBottom: 40 }}>
              Connect to the tools<br />your business runs on.
            </div>
            <div style={S.toolsGrid} className="tools-grid">
              {TOOLS.map(t => (
                <div key={t.name} style={S.toolCard}>
                  <div style={S.toolEmoji}>{t.emoji}</div>
                  <div style={S.toolName}>{t.name}</div>
                </div>
              ))}
            </div>
            <p style={S.toolsNote}>Integrations are rolling out progressively. Some are in active development.</p>
          </div>
        </div>

        <div style={S.divider} />

        {/* How It Works */}
        <div style={S.stepsSection}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={S.sectionLabel}>How it works</div>
            <div style={{ ...S.sectionTitle, maxWidth: 420 }}>Up and running<br />in three steps.</div>
            <div style={S.stepsGrid} className="steps-grid">
              {STEPS.map(s => (
                <div key={s.num} style={S.step}>
                  <div style={S.stepNum}>{s.num}</div>
                  <div style={S.stepTitle}>{s.title}</div>
                  <div style={S.stepDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={S.divider} />

        {/* Pricing */}
        <div style={S.pricingSection}>
          <div style={S.pricingInner}>
            <div style={{ ...S.sectionLabel, textAlign: 'center' }}>Pricing</div>
            <div style={{ ...S.sectionTitle, textAlign: 'center', marginBottom: 0 }}>Straightforward pricing.</div>
            <div style={S.pricingGrid}>
              {PLANS.map(p => (
                <div key={p.name} style={p.dark ? S.pCardDark : S.pCard}>
                  <div style={p.dark ? S.pLabelLight : S.pLabel}>{p.name}</div>
                  <div style={{ ...S.pPrice, color: p.dark ? '#fff' : '#0a0a0a' }}>{p.price}</div>
                  <div style={p.dark ? S.pPricePerLight : S.pPricePer}>{p.per}</div>
                  <ul style={S.pFeatures}>
                    {p.features.map(f => (
                      <li key={f} style={p.dark ? S.pFeatureLight : S.pFeature}>
                        <span style={{ opacity: 0.5, marginTop: 1 }}>→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={p.href} style={p.dark ? S.btnPlanLight : S.btnPlan}>{p.cta}</Link>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.32)', fontSize: 13, marginTop: 22, fontFamily: INT }}>
              Cancel anytime. No lock-in.
            </p>
          </div>
        </div>

        {/* Builder CTA */}
        <div style={S.builderSection}>
          <div style={S.builderInner}>
            <div style={S.builderLabel}>For Builders</div>
            <div style={S.builderTitle}>Build agents.<br />List them. Earn.</div>
            <p style={S.builderSub}>
              If you can define what an agent should do, you can list it in the marketplace. Revenue share launches with the next build cycle. First movers get the best positioning.
            </p>
            <Link href="/signup?plan=builder" style={S.btnBuilder}>Apply for builder access →</Link>
          </div>
        </div>

        {/* Footer */}
        <div style={S.footer}>
          <div style={S.footerLinks}>
            <Link href="/privacy" style={S.footerLink}>Privacy</Link>
            <Link href="/terms" style={S.footerLink}>Terms</Link>
            <Link href="/market" style={S.footerLink}>Market</Link>
            <Link href="/chat" style={S.footerLink}>Chat</Link>
          </div>
          <div>© 2025 Actionable AI. All rights reserved.</div>
        </div>

      </div>
    </>
  )
}
