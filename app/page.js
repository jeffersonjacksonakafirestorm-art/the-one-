'use client';
import { useState, useRef } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #111', position: 'sticky', top: 0, background: '#000', zIndex: 50 },
  logo: { fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' },
  navLinks: { display: 'flex', gap: 8, alignItems: 'center' },
  navBtn: { background: 'transparent', border: '1px solid #222', borderRadius: 8, padding: '8px 16px', color: '#888', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'inherit' },
  navBtnPrimary: { background: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: 'inherit' },
  hero: { maxWidth: 760, margin: '0 auto', padding: '80px 24px 40px', textAlign: 'center' },
  badge: { display: 'inline-block', border: '1px solid #222', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 24, letterSpacing: '0.04em' },
  h1: { fontSize: 'clamp(38px, 7vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', margin: '0 0 20px', color: '#fff' },
  sub: { fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#888', lineHeight: 1.6, margin: '0 0 48px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' },
  trialBox: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '28px 24px', maxWidth: 680, margin: '0 auto 40px', textAlign: 'left' },
  trialLabel: { fontSize: 12, fontWeight: 700, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 },
  textarea: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 12, padding: '14px 16px', color: '#fff', fontSize: 15, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box', minHeight: 120 },
  trialActions: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, gap: 12 },
  charCount: { fontSize: 12, color: '#444' },
  sendBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 },
  responseBox: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px', marginTop: 16 },
  responseLabel: { fontSize: 11, fontWeight: 700, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 },
  responseText: { fontSize: 15, color: '#e0e0e0', lineHeight: 1.75, whiteSpace: 'pre-wrap' },
  ctaAfterTrial: { background: '#fff', borderRadius: 16, padding: '20px 24px', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' },
  ctaText: { fontSize: 15, fontWeight: 700, color: '#000' },
  ctaSub: { fontSize: 13, color: '#555', marginTop: 2 },
  ctaBtn: { background: '#000', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', flexShrink: 0 },
  features: { maxWidth: 960, margin: '0 auto', padding: '80px 24px' },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 },
  featCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px' },
  featIcon: { fontSize: 24, marginBottom: 12 },
  featTitle: { fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 },
  featDesc: { fontSize: 14, color: '#666', lineHeight: 1.6 },
  section: { maxWidth: 960, margin: '0 auto', padding: '60px 24px' },
  sectionLabel: { fontSize: 12, fontWeight: 700, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 },
  sectionH2: { fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 40px', color: '#fff' },
  pricingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 },
  pricingCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '32px 28px' },
  pricingCardFeatured: { background: '#fff', borderRadius: 20, padding: '32px 28px' },
  planName: { fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#555', marginBottom: 12 },
  planNameDark: { fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 },
  planPrice: { fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#000', margin: '0 0 4px' },
  planPriceDark: { fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 4px' },
  planPer: { fontSize: 13, color: '#666', marginBottom: 24 },
  planPerDark: { fontSize: 13, color: '#555', marginBottom: 24 },
  planFeatures: { listStyle: 'none', padding: 0, margin: '0 0 28px' },
  planFeat: { fontSize: 14, color: '#222', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8, alignItems: 'flex-start' },
  planFeatDark: { fontSize: 14, color: '#888', padding: '6px 0', borderBottom: '1px solid #111', display: 'flex', gap: 8, alignItems: 'flex-start' },
  planBtn: { display: 'block', width: '100%', background: '#000', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' },
  planBtnDark: { display: 'block', width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' },
  divider: { borderColor: '#111', borderTopWidth: 1, margin: '0 24px' },
  footer: { borderTop: '1px solid #111', padding: '32px 24px', textAlign: 'center' },
  footerText: { fontSize: 13, color: '#444' },
  footerLinks: { display: 'flex', gap: 24, justifyContent: 'center', marginTop: 12 },
  footerLink: { fontSize: 13, color: '#444', textDecoration: 'none' },
};

const FEATURES = [
  { icon: '⚡', title: 'Personalized to your situation', desc: 'Tell Actionable your income, debt, goals, and constraints. Get a plan built only for you — not generic advice.' },
  { icon: '📸', title: 'Photo & document analysis', desc: 'Upload your pay stub, bank statement, or business idea. Actionable reads it and coaches based on the real numbers.' },
  { icon: '🎙', title: 'Voice input', desc: 'Talk through your situation. Actionable listens, responds, and guides you — no typing required.' },
  { icon: '📈', title: 'Progress tracking', desc: 'Milestone checklists and streak tracking keep you accountable and show you exactly how far you\'ve come.' },
  { icon: '💬', title: 'Full chat history', desc: 'Every conversation saved. Pick up where you left off across sessions, weeks, and months.' },
  { icon: '🤝', title: 'Community stories', desc: 'Read real stories from people who broke out. Post yours when you make it.' },
];

export default function Landing() {
  const [scenario, setScenario] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [trialUsed, setTrialUsed] = useState(false);
  const fileRef = useRef(null);

  async function runFreeTrial() {
    if (!scenario.trim() || loading || trialUsed) return;
    setLoading(true);
    try {
      const res = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenario.trim() }),
      });
      const data = await res.json();
      if (data.error) {
        setResponse('Something went wrong. Please try again.');
      } else {
        setResponse(data.response);
        setTrialUsed(true);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('actionable_trial_used', '1');
        }
      }
    } catch {
      setResponse('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div style={s.page}>
      {/* Nav */}
      <nav style={s.nav}>
        <a href="/" style={s.logo}>Actionable</a>
        <div style={s.navLinks}>
          <a href="/stories" style={s.navBtn}>Stories</a>
          <a href="/login" style={s.navBtn}>Sign in</a>
          <a href="/signup" style={s.navBtnPrimary}>Get started</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={s.hero}>
        <span style={s.badge}>AI Life Coach · Financial Freedom · No Degree Required</span>
        <h1 style={s.h1}>Stop asking<br />permission.</h1>
        <p style={s.sub}>
          Actionable is your personal AI coach for building financial freedom on your own terms — no degree, no 9-to-5, no gatekeepers.
        </p>

        {/* Free trial box */}
        <div style={s.trialBox}>
          <div style={s.trialLabel}>Try it free — no account needed</div>
          {!trialUsed ? (
            <>
              <textarea
                style={s.textarea}
                placeholder="Describe your situation. Be specific — income, debt, goals, what you've tried. The more detail, the better your plan."
                value={scenario}
                onChange={e => setScenario(e.target.value)}
                maxLength={1000}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runFreeTrial(); }}
              />
              <div style={s.trialActions}>
                <span style={s.charCount}>{scenario.length}/1000</span>
                <button
                  style={{ ...s.sendBtn, opacity: (!scenario.trim() || loading) ? 0.5 : 1 }}
                  onClick={runFreeTrial}
                  disabled={!scenario.trim() || loading}
                >
                  {loading ? 'Getting your plan...' : 'Get My Plan →'}
                </button>
              </div>
            </>
          ) : null}

          {response && (
            <>
              <div style={s.responseBox}>
                <div style={s.responseLabel}>Your personalized plan</div>
                <div style={s.responseText}>{response}</div>
              </div>
              <div style={s.ctaAfterTrial}>
                <div>
                  <div style={s.ctaText}>Want your full coaching plan?</div>
                  <div style={s.ctaSub}>Unlimited sessions · Photo analysis · Progress tracking · $15/mo</div>
                </div>
                <a href="/signup" style={s.ctaBtn}>Start for $15/mo →</a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={s.features}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={s.sectionLabel}>Everything you need</div>
          <h2 style={{ ...s.sectionH2, margin: 0 }}>Built for people who move different</h2>
        </div>
        <div style={s.featGrid}>
          {FEATURES.map(f => (
            <div key={f.title} style={s.featCard}>
              <div style={s.featIcon}>{f.icon}</div>
              <div style={s.featTitle}>{f.title}</div>
              <div style={s.featDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={s.section}>
        <div style={s.sectionLabel}>Simple pricing</div>
        <h2 style={s.sectionH2}>One coach. Two plans.</h2>
        <div style={s.pricingGrid}>
          {/* Basic */}
          <div style={s.pricingCard}>
            <div style={s.planNameDark}>Basic</div>
            <div style={s.planPriceDark}>$15</div>
            <div style={s.planPerDark}>per month</div>
            <ul style={s.planFeatures}>
              {['Unlimited AI coaching sessions','Photo & document analysis','Voice input','Full chat history','Progress roadmap','Community stories','Mobile app (PWA)'].map(f => (
                <li key={f} style={s.planFeatDark}><span>✓</span>{f}</li>
              ))}
            </ul>
            <a href="/signup?plan=basic" style={s.planBtnDark}>Get Basic →</a>
          </div>
          {/* Pro */}
          <div style={s.pricingCardFeatured}>
            <div style={s.planName}>Pro — Most popular</div>
            <div style={s.planPrice}>$49</div>
            <div style={s.planPer}>per month</div>
            <ul style={s.planFeatures}>
              {['Everything in Basic','Weekly AI progress reports','Priority response speed','Downloadable financial plans','Referral program — give & get free months','Early access to new features'].map(f => (
                <li key={f} style={s.planFeat}><span>✓</span>{f}</li>
              ))}
            </ul>
            <a href="/signup?plan=pro" style={s.planBtn}>Get Pro →</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerText}>© {new Date().getFullYear()} Actionable AI. Built for people who move different.</div>
        <div style={s.footerLinks}>
          <a href="/privacy" style={s.footerLink}>Privacy</a>
          <a href="/terms" style={s.footerLink}>Terms</a>
          <a href="/stories" style={s.footerLink}>Stories</a>
        </div>
      </footer>
    </div>
  );
}
