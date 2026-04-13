'use client';

const S = {
  // Layout
  page: { background: '#000', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif", minHeight: '100vh' },
  // Nav
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 64, borderBottom: '1px solid #222', position: 'sticky', top: 0, background: '#000', zIndex: 10 },
  logo: { fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', textDecoration: 'none', color: '#fff' },
  navLinks: { display: 'flex', gap: 32 },
  navLink: { fontSize: 14, color: '#888', textDecoration: 'none', fontWeight: 500 },
  navCta: { background: '#fff', color: '#000', fontSize: 14, fontWeight: 700, padding: '9px 20px', borderRadius: 8, textDecoration: 'none' },
  // Hero
  hero: { maxWidth: 1100, margin: '0 auto', padding: '120px 40px 100px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 80, alignItems: 'center' },
  tag: { display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #333', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 28 },
  dot: { width: 6, height: 6, background: '#fff', borderRadius: '50%' },
  h1: { fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 },
  heroSub: { fontSize: 17, color: '#888', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 },
  heroCtas: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56 },
  btnPrimary: { background: '#fff', color: '#000', fontWeight: 700, fontSize: 15, padding: '13px 28px', borderRadius: 10, textDecoration: 'none', display: 'inline-block' },
  btnGhost: { color: '#888', fontWeight: 500, fontSize: 14, textDecoration: 'none' },
  proof: { display: 'flex', alignItems: 'center', gap: 28 },
  proofItem: { display: 'flex', flexDirection: 'column', gap: 2 },
  proofNum: { fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' },
  proofLabel: { fontSize: 12, color: '#888' },
  proofSep: { width: 1, height: 28, background: '#333' },
  // Phone mock
  phone: { background: '#111', border: '1px solid #222', borderRadius: 32, overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.8)' },
  phoneBar: { background: '#0a0a0a', height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  phoneSpeaker: { width: 52, height: 4, background: '#333', borderRadius: 4 },
  phoneScreen: { padding: 16, minHeight: 300 },
  chatHeader: { display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12, borderBottom: '1px solid #222', marginBottom: 12 },
  chatAv: { width: 32, height: 32, borderRadius: '50%', background: '#222', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 },
  chatName: { fontSize: 13, fontWeight: 700 },
  chatStatus: { fontSize: 11, color: '#888', display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 },
  statusDot: { width: 5, height: 5, background: '#fff', borderRadius: '50%' },
  msgs: { display: 'flex', flexDirection: 'column', gap: 8 },
  missedMsg: { background: '#0a0a0a', border: '1px solid #222', borderRadius: 8, padding: '6px 10px', fontSize: 11, color: '#888', alignSelf: 'center', textAlign: 'center' },
  msgAI: { background: '#1a1a1a', border: '1px solid #333', borderRadius: 10, padding: '7px 10px', fontSize: 12, lineHeight: 1.45, maxWidth: '85%', alignSelf: 'flex-start' },
  msgUser: { background: '#fff', color: '#000', borderRadius: 10, padding: '7px 10px', fontSize: 12, lineHeight: 1.45, maxWidth: '85%', alignSelf: 'flex-end' },
  phoneLabel: { fontSize: 12, color: '#555', textAlign: 'center', marginTop: 12 },
  // Stats
  stats: { borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', background: '#0a0a0a', padding: '28px 0' },
  statsInner: { maxWidth: 1100, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  statNum: { fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' },
  statLabel: { fontSize: 12, color: '#888' },
  statSep: { width: 1, height: 32, background: '#222' },
  // Sections
  section: { maxWidth: 1100, margin: '0 auto', padding: '100px 40px' },
  sectionTag: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 16 },
  sectionH2: { fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 },
  sectionSub: { fontSize: 16, color: '#888', lineHeight: 1.7 },
  // Steps
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 56, background: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden' },
  stepCard: { background: '#000', padding: '36px 28px' },
  stepNum: { fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#888', marginBottom: 20 },
  stepH3: { fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' },
  stepP: { fontSize: 14, color: '#888', lineHeight: 1.65 },
  // Features
  featGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, marginTop: 56, background: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden' },
  featCard: { background: '#000', padding: '36px 32px' },
  featCardWide: { background: '#000', padding: '36px 32px', gridColumn: 'span 2' },
  featIcon: { fontSize: 24, marginBottom: 16, display: 'block' },
  featH3: { fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 },
  featP: { fontSize: 14, color: '#888', lineHeight: 1.7 },
  featDetail: { marginTop: 12, fontSize: 12, color: '#555', fontWeight: 500 },
  // Pricing
  pricingWrap: { background: '#0a0a0a', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' },
  pricingInner: { maxWidth: 1100, margin: '0 auto', padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'center' },
  mathBox: { background: '#000', border: '1px solid #222', borderRadius: 12, padding: 24, marginTop: 32 },
  mathRow: { display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14 },
  mathRowSpan: { color: '#888' },
  mathDivider: { height: 1, background: '#1a1a1a', margin: '6px 0' },
  mathResult: { display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14 },
  mathResultSpan: { fontWeight: 600 },
  mathResultStrong: { fontSize: 17, fontWeight: 800 },
  priceCard: { background: '#000', border: '1px solid #333', borderRadius: 20, overflow: 'hidden' },
  priceTop: { padding: '36px 36px 28px', borderBottom: '1px solid #1a1a1a' },
  priceName: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: 16 },
  priceAmt: { fontSize: 56, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 10 },
  priceDollar: { fontSize: 28, verticalAlign: 'super' },
  pricePer: { fontSize: 16, fontWeight: 500, color: '#888' },
  priceTagline: { fontSize: 13, color: '#888' },
  priceList: { padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 12 },
  priceItem: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 },
  check: { color: '#fff', fontWeight: 700, flexShrink: 0 },
  priceCta: { display: 'block', background: '#fff', color: '#000', textAlign: 'center', fontWeight: 700, fontSize: 15, padding: '15px 24px', margin: '0 36px 16px', borderRadius: 10, textDecoration: 'none' },
  priceNote: { textAlign: 'center', fontSize: 12, color: '#555', padding: '0 36px 24px' },
  // Guarantee
  guaranteeWrap: { maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px' },
  guaranteeCard: { display: 'flex', alignItems: 'flex-start', gap: 20, border: '1px solid #1a1a1a', borderRadius: 16, padding: '32px 36px', background: '#0a0a0a' },
  guaranteeCheck: { width: 44, height: 44, border: '1px solid #333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 },
  guaranteeH3: { fontSize: 17, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' },
  guaranteeP: { fontSize: 14, color: '#888', lineHeight: 1.7 },
  // FAQ
  faqWrap: { background: '#0a0a0a', borderTop: '1px solid #1a1a1a' },
  faqInner: { maxWidth: 780, margin: '0 auto', padding: '100px 40px' },
  faqList: { border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden', marginTop: 40 },
  faqItem: { borderBottom: '1px solid #1a1a1a' },
  faqQ: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 24px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', textAlign: 'left', gap: 16 },
  faqIcon: { fontSize: 20, fontWeight: 300, color: '#555', flexShrink: 0 },
  faqA: { padding: '0 24px 18px', fontSize: 14, color: '#888', lineHeight: 1.75 },
  // Final CTA
  ctaFinal: { textAlign: 'center', padding: '120px 40px', maxWidth: 600, margin: '0 auto' },
  ctaH2: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 },
  ctaP: { fontSize: 16, color: '#888', lineHeight: 1.7, marginBottom: 36 },
  ctaNote: { marginTop: 14, fontSize: 12, color: '#555' },
  // Footer
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
  { q: 'Do I have to change my existing phone number?', a: 'No. You dial one forwarding code on your phone — takes 30 seconds. Your customers still call the same number. Missed calls automatically route through CallRecoverAI.' },
  { q: 'How fast does the AI actually respond?', a: 'Under 30 seconds. Usually under 10. Responding within 5 minutes makes you 9x more likely to convert a lead. We respond in seconds — before they call your competitor.' },
  { q: 'Is texting missed callers legal?', a: 'Yes. When someone calls your business, that creates implied consent for a follow-up text. We only contact people who called you first. Every message includes a STOP opt-out. Fully TCPA compliant.' },
  { q: 'What does the AI say to customers?', a: 'You set the opening message during signup. Typical opener: "Hey — sorry we missed your call, this is [Business Name]. How can we help?" The AI responds naturally to whatever they say.' },
  { q: 'What\'s the free trial?', a: 'Try CallRecoverAI completely free — experience it live before paying anything. After your trial, continue at $225/month. No credit card required to start.' },
  { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no cancellation fees. Cancel in one click from your dashboard.' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div style={S.page}>
      {/* NAV */}
      <nav style={S.nav}>
        <a href="/" style={S.logo}>CallRecoverAI</a>
        <div style={S.navLinks}>
          <a href="#how" style={S.navLink}>How It Works</a>
          <a href="#features" style={S.navLink}>Features</a>
          <a href="#pricing" style={S.navLink}>Pricing</a>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/login" style={S.navLink}>Sign In</a>
          <a href="/signup" style={S.navCta}>Start Free Trial</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={S.hero}>
        <div>
          <div style={S.tag}>
            <span style={S.dot} />
            Live — businesses recovering leads now
          </div>
          <h1 style={S.h1}>Every Missed Call,<br /><em style={{ fontStyle: 'italic' }}>Answered in 30 Seconds.</em></h1>
          <p style={S.heroSub}>
            AI texts back every caller the moment you miss them — qualifying leads and keeping jobs from walking out the door.
          </p>
          <div style={S.heroCtas}>
            <a href="/signup" style={S.btnPrimary}>Start Free Trial</a>
            <a href="#how" style={S.btnGhost}>See how it works ↓</a>
          </div>
          <div style={S.proof}>
            <div style={S.proofItem}><strong style={S.proofNum}>&lt;30s</strong><span style={S.proofLabel}>first response</span></div>
            <div style={S.proofSep} />
            <div style={S.proofItem}><strong style={S.proofNum}>$225</strong><span style={S.proofLabel}>per month</span></div>
            <div style={S.proofSep} />
            <div style={S.proofItem}><strong style={S.proofNum}>0</strong><span style={S.proofLabel}>setup required</span></div>
          </div>
        </div>

        {/* Phone mock */}
        <div>
          <div style={S.phone}>
            <div style={S.phoneBar}><div style={S.phoneSpeaker} /></div>
            <div style={S.phoneScreen}>
              <div style={S.chatHeader}>
                <div style={S.chatAv}>🏠</div>
                <div>
                  <div style={S.chatName}>ABC Roofing</div>
                  <div style={S.chatStatus}><span style={S.statusDot} /> Responding now</div>
                </div>
              </div>
              <div style={S.msgs}>
                <div style={S.missedMsg}>📞 Missed call from ABC Roofing</div>
                <div style={S.msgAI}>Hey — sorry we missed your call, this is ABC Roofing. How can we help?</div>
                <div style={S.msgUser}>My roof is leaking after the storm. Need help ASAP</div>
                <div style={S.msgAI}>We're on it. What's your zip code?</div>
                <div style={S.msgUser}>85201</div>
                <div style={S.msgAI}>We cover that area. Available today 2–5pm? ✓</div>
              </div>
            </div>
          </div>
          <p style={S.phoneLabel}>What your customer sees — instantly</p>
        </div>
      </div>

      {/* STATS */}
      <div style={S.stats}>
        <div style={S.statsInner}>
          <div style={S.statItem}><strong style={S.statNum}>$2.4M+</strong><span style={S.statLabel}>in leads recovered</span></div>
          <div style={S.statSep} />
          <div style={S.statItem}><strong style={S.statNum}>4,900+</strong><span style={S.statLabel}>calls captured</span></div>
          <div style={S.statSep} />
          <div style={S.statItem}><strong style={S.statNum}>4.9★</strong><span style={S.statLabel}>average rating</span></div>
          <div style={S.statSep} />
          <div style={S.statItem}><strong style={S.statNum}>127</strong><span style={S.statLabel}>businesses live</span></div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={S.section}>
          <div style={S.sectionTag}>Simple setup</div>
          <h2 style={S.sectionH2}>Live in minutes.<br />No tech skills needed.</h2>
          <p style={S.sectionSub}>Forward your missed calls to your CallRecoverAI number. We do the rest.</p>
          <div style={S.stepsGrid}>
            <div style={S.stepCard}>
              <div style={S.stepNum}>01</div>
              <h3 style={S.stepH3}>Sign up & get your number</h3>
              <p style={S.stepP}>Create your account and receive your dedicated CallRecoverAI phone number instantly.</p>
            </div>
            <div style={{ ...S.stepCard, borderLeft: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}>
              <div style={S.stepNum}>02</div>
              <h3 style={S.stepH3}>Set up call forwarding</h3>
              <p style={S.stepP}>Dial one code on your phone. Missed calls forward automatically — your main number doesn't change.</p>
            </div>
            <div style={S.stepCard}>
              <div style={S.stepNum}>03</div>
              <h3 style={S.stepH3}>AI handles the rest</h3>
              <p style={S.stepP}>Miss a call → customer gets a text in 30 seconds → AI qualifies the lead → job saved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features">
        <div style={S.section}>
          <div style={S.sectionTag}>What you get</div>
          <h2 style={S.sectionH2}>Everything running<br />while you work.</h2>
          <div style={S.featGrid}>
            <div style={S.featCardWide}>
              <span style={S.featIcon}>⚡</span>
              <h3 style={S.featH3}>Instant Text-Back</h3>
              <p style={S.featP}>The moment you miss a call, your customer gets a text from your business — under 30 seconds. Before they dial anyone else.</p>
              <p style={S.featDetail}>AI-powered · Branded to your business · TCPA compliant</p>
            </div>
            <div style={{ ...S.featCard, borderTop: '1px solid #1a1a1a' }}>
              <span style={S.featIcon}>🎙</span>
              <h3 style={S.featH3}>Voicemail Transcription</h3>
              <p style={S.featP}>Every voicemail converted to text instantly. Read messages at a glance — no listening required.</p>
            </div>
            <div style={{ ...S.featCard, borderTop: '1px solid #1a1a1a', borderLeft: '1px solid #1a1a1a' }}>
              <span style={S.featIcon}>📊</span>
              <h3 style={S.featH3}>Lead Dashboard</h3>
              <p style={S.featP}>Every conversation, every recovered call, every voicemail — in one clean view. Log in anytime.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={S.pricingWrap}>
        <div style={S.pricingInner}>
          <div>
            <div style={S.sectionTag}>Pricing</div>
            <h2 style={S.sectionH2}>One missed job<br />pays for years.</h2>
            <p style={S.sectionSub}>Average job value for our customers is $8,000–$20,000. We charge $225/month.</p>
            <div style={S.mathBox}>
              <div style={S.mathRow}><span style={S.mathRowSpan}>One saved roofing job</span><strong>$12,000</strong></div>
              <div style={S.mathRow}><span style={S.mathRowSpan}>CallRecoverAI — 12 months</span><strong>$2,700</strong></div>
              <div style={S.mathDivider} />
              <div style={S.mathResult}><span style={S.mathResultSpan}>Your net gain</span><strong style={S.mathResultStrong}>$9,300</strong></div>
            </div>
          </div>
          <div style={S.priceCard}>
            <div style={S.priceTop}>
              <div style={S.priceName}>CallRecoverAI</div>
              <div style={S.priceAmt}><span style={S.priceDollar}>$</span>225<span style={S.pricePer}>/mo</span></div>
              <p style={S.priceTagline}>Free trial included. Cancel anytime.</p>
            </div>
            <ul style={{ ...S.priceList, listStyle: 'none', padding: '28px 36px' }}>
              {['Instant missed call text-back', 'AI-powered lead qualification', 'Voicemail transcription', 'Full lead dashboard', 'Weekly revenue leakage report', 'TCPA compliant', 'No contracts, cancel anytime'].map(item => (
                <li key={item} style={S.priceItem}><span style={S.check}>✓</span> {item}</li>
              ))}
            </ul>
            <a href="/signup" style={S.priceCta}>Start Free Trial</a>
            <p style={S.priceNote}>No credit card until you're ready</p>
          </div>
        </div>
      </div>

      {/* GUARANTEE */}
      <div style={S.guaranteeWrap}>
        <div style={{ ...S.guaranteeCard, marginTop: 40 }}>
          <div style={S.guaranteeCheck}>✓</div>
          <div>
            <h3 style={S.guaranteeH3}>30-Day Proof Guarantee</h3>
            <p style={S.guaranteeP}>If CallRecoverAI doesn't recover at least one paying lead in your first 30 days, we keep working free until it does. Full refund if you still want out. No questions.</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={S.faqWrap}>
        <div style={S.faqInner}>
          <div style={S.sectionTag}>Questions</div>
          <h2 style={S.sectionH2}>FAQ</h2>
          <div style={S.faqList}>
            {faqs.map((f, i) => (
              <div key={i} style={{ ...S.faqItem, ...(i === faqs.length - 1 ? { borderBottom: 'none' } : {}) }}>
                <button style={S.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span style={S.faqIcon}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <p style={S.faqA}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={S.ctaFinal}>
        <h2 style={S.ctaH2}>Stop leaving money on the table.</h2>
        <p style={S.ctaP}>Every missed call after today is a choice. Your competitors answer. Make sure you do too.</p>
        <a href="/signup" style={S.btnPrimary}>Start Free Trial</a>
        <p style={S.ctaNote}>No credit card required · Live in minutes · Cancel anytime</p>
      </div>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div style={S.footerTop}>
            <div style={S.footerBrand}>
              <a href="/" style={{ ...S.logo, fontSize: 15 }}>CallRecoverAI</a>
              <p style={S.footerBrandP}>Turning missed calls into booked jobs for service businesses.</p>
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
            <span>© 2026 CallRecoverAI. All rights reserved.</span>
            <span>TCPA compliant — we only contact people who called your business first.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Need React for useState
import React from 'react';
