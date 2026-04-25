'use client';
import { useState, useEffect } from 'react';

const AUTOMATIONS = [
  {
    icon: '📞',
    title: 'Missed Call Text-Back',
    desc: 'The second a call is missed, your lead gets an automatic text. You recover jobs your competitors never even knew they lost.',
    stat: '43% of missed calls convert when texted back within 60 seconds',
  },
  {
    icon: '⚡',
    title: 'Instant Lead Response',
    desc: 'New form submission? They get a personal text in under 2 minutes — before they even close the tab and call someone else.',
    stat: 'Responding in 5 min vs 30 min = 21x higher contact rate',
  },
  {
    icon: '📋',
    title: 'Estimate Follow-Up Sequence',
    desc: 'Sent a quote and heard nothing? A 3-touch automated sequence follows up at day 1, 3, and 7 — without you lifting a finger.',
    stat: '60% of jobs are won on the follow-up, not the first call',
  },
  {
    icon: '⭐',
    title: 'Review Request Automation',
    desc: 'Job complete? Your customer gets a text 2 hours later asking for a Google review. More 5-stars, more inbound calls.',
    stat: 'Businesses with 50+ reviews get 3x more calls from Google Maps',
  },
  {
    icon: '🔄',
    title: 'Cold Lead Reactivation',
    desc: 'Leads who went quiet 30, 60, or 90 days ago get a re-engagement campaign. Turn dead leads into booked jobs.',
    stat: 'Average contractor has $40,000+ in dormant leads sitting in their CRM',
  },
];

const RESULTS = [
  { number: '2-3', label: 'Extra jobs recovered per week from missed calls' },
  { number: '$18K+', label: 'Monthly revenue recovered on average' },
  { number: '10hrs', label: 'Saved weekly on manual follow-up calls' },
  { number: '4.8★', label: 'Average Google rating after 90 days' },
];

const STEPS = [
  {
    num: '01',
    title: 'Book a Free Strategy Call',
    desc: 'We spend 30 minutes mapping out exactly where your business is leaking revenue. No pitch — just your real numbers.',
    time: 'Day 1',
  },
  {
    num: '02',
    title: 'We Build Your System',
    desc: 'VELO builds every automation for your business — missed call text-back, lead sequences, review requests, all of it. You don\'t touch a thing.',
    time: 'Days 2–5',
  },
  {
    num: '03',
    title: 'Go Live & Watch It Work',
    desc: 'We flip the switch. From day one, every missed call gets a text, every lead gets followed up, every completed job gets a review request.',
    time: 'Day 6',
  },
  {
    num: '04',
    title: 'You Get a Dashboard',
    desc: 'Log in anytime and see every lead, every automation, every result in real time. Full visibility, zero extra work.',
    time: 'Ongoing',
  },
];

const FAQS = [
  {
    q: 'Do I need to change my current phone system?',
    a: 'No. We plug into whatever you already use. Setup takes less than a week and you don\'t touch a thing.',
  },
  {
    q: 'What if I don\'t have a CRM?',
    a: 'We set one up for you as part of onboarding. You\'ll have a full dashboard showing every lead, every follow-up, every result.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most clients recover their first missed-call job within the first 48 hours of going live.',
  },
  {
    q: 'Is there a contract?',
    a: 'Month to month. No lock-in. If it\'s not making you money, cancel anytime.',
  },
];

const S = {
  page: { background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: "'Inter Tight', system-ui, sans-serif", overflowX: 'hidden' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', zIndex: 100 },
  logo: { fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' },
  logoSub: { fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: 2 },
  navBtn: { padding: '10px 22px', borderRadius: 8, background: '#fff', color: '#000', fontSize: 13, fontWeight: 800, cursor: 'pointer', border: 'none', letterSpacing: '-0.01em' },
  hero: { maxWidth: 1100, margin: '0 auto', padding: '100px 32px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' },
  heroLeft: {},
  badge: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', marginBottom: 28, textTransform: 'uppercase' },
  dot: { width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' },
  h1: { fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px', color: '#fff' },
  accent: { color: 'transparent', backgroundImage: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' },
  sub: { fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 40px', maxWidth: 460 },
  btnPrimary: { display: 'inline-block', padding: '16px 32px', background: '#fff', color: '#000', borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: 'pointer', border: 'none', letterSpacing: '-0.02em', textDecoration: 'none' },
  btnSecondary: { display: 'inline-block', padding: '16px 32px', background: 'transparent', color: 'rgba(255,255,255,0.6)', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', letterSpacing: '-0.02em', textDecoration: 'none', marginLeft: 12 },
  heroRight: { display: 'flex', justifyContent: 'center' },
  photoWrap: { position: 'relative', width: 360, height: 440 },
  photo: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24, filter: 'grayscale(20%)' },
  photoOverlay: { position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.1)' },
  photoName: { fontSize: 15, fontWeight: 800, marginBottom: 2 },
  photoTitle: { fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 },
  liveTag: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#22c55e', float: 'right', marginTop: -2 },
  statsBar: { background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '32px' },
  statsInner: { maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 },
  statItem: { textAlign: 'center' },
  statNum: { fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 4 },
  statLabel: { fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 },
  section: { maxWidth: 1100, margin: '0 auto', padding: '80px 32px' },
  sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 16 },
  sectionTitle: { fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 },
  sectionSub: { fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 520, marginBottom: 56 },
  autoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 },
  autoCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 28, transition: 'border-color 0.2s' },
  autoIcon: { fontSize: 28, marginBottom: 16 },
  autoTitle: { fontSize: 17, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' },
  autoDesc: { fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 16 },
  autoStat: { fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 },
  divider: { height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 32px' },
  demoSection: { background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '80px 32px' },
  demoInner: { maxWidth: 1100, margin: '0 auto' },
  demoCard: { background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24, marginTop: 32 },
  demoHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' },
  demoDot: { width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' },
  demoTitle: { fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)' },
  demoTime: { fontSize: 12, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto' },
  faqSection: { maxWidth: 720, margin: '0 auto', padding: '80px 32px' },
  faqItem: { borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24, marginBottom: 24 },
  faqQ: { fontSize: 16, fontWeight: 700, marginBottom: 10, cursor: 'pointer', letterSpacing: '-0.01em' },
  faqA: { fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 },
  ctaSection: { textAlign: 'center', padding: '100px 32px', background: 'rgba(255,255,255,0.01)' },
  ctaTitle: { fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 20, lineHeight: 1.05 },
  ctaSub: { fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 40, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 },
  calBox: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '48px 32px', maxWidth: 500, margin: '0 auto' },
  calTitle: { fontSize: 18, fontWeight: 800, marginBottom: 8 },
  calSub: { fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 28 },
  calBtn: { display: 'block', width: '100%', padding: '16px', background: '#fff', color: '#000', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.02em', textDecoration: 'none', boxSizing: 'border-box', textAlign: 'center' },
  calNote: { fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 12 },
  footer: { padding: '32px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)', fontSize: 13 },
  stepsSection: { maxWidth: 1100, margin: '0 auto', padding: '80px 32px' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, position: 'relative', marginTop: 48 },
  stepCard: { padding: '0 32px 0 0' },
  stepNum: { fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', marginBottom: 12, textTransform: 'uppercase' },
  stepTime: { display: 'inline-block', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 14 },
  stepTitle: { fontSize: 17, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.3 },
  stepDesc: { fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 },
  stepLine: { height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 0 32px' },
};

function LiveDemo() {
  const [events, setEvents] = useState([
    { id: 1, type: 'missed_call', business: 'Summit Roofing LLC', time: '2m ago', status: 'Text sent', value: '$9,400' },
    { id: 2, type: 'lead', business: 'Apex HVAC Services', time: '8m ago', status: 'Sequence started', value: '$4,200' },
    { id: 3, type: 'review', business: 'ProFix Plumbing', time: '14m ago', status: '5★ received', value: '+3 calls/wk' },
    { id: 4, type: 'followup', business: 'Ridge Line Roofing', time: '31m ago', status: 'Estimate accepted', value: '$14,800' },
  ]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const newEvents = [
      { id: 10, type: 'missed_call', business: 'Blue Sky HVAC', time: 'just now', status: 'Text sent ✓', value: '$6,100' },
      { id: 11, type: 'lead', business: 'FastFix Roofing', time: 'just now', status: 'Sequence started', value: '$11,200' },
      { id: 12, type: 'review', business: 'Premier Plumbing Co', time: 'just now', status: '5★ received', value: '+5 calls/wk' },
    ];
    const interval = setInterval(() => {
      setCounter(c => {
        const next = (c + 1) % newEvents.length;
        setEvents(prev => [{ ...newEvents[next], time: 'just now' }, ...prev.slice(0, 3)]);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const typeColors = {
    missed_call: '#ef4444',
    lead: '#3b82f6',
    review: '#f59e0b',
    followup: '#22c55e',
  };

  const typeLabels = {
    missed_call: 'Missed Call',
    lead: 'New Lead',
    review: 'Review Request',
    followup: 'Follow-Up',
  };

  return (
    <div style={S.demoCard}>
      <div style={S.demoHeader}>
        <div style={S.demoDot} />
        <div style={S.demoTitle}>VELO Automation Dashboard — Live Feed</div>
        <div style={S.demoTime}>Updating live</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map((e, i) => (
          <div key={e.id} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            background: i === 0 ? 'rgba(255,255,255,0.05)' : 'transparent',
            borderRadius: 10, border: i === 0 ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
            transition: 'all 0.4s',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColors[e.type], flexShrink: 0, boxShadow: i === 0 ? `0 0 8px ${typeColors[e.type]}` : 'none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{e.business}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{typeLabels[e.type]} · {e.time}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>{e.status}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{e.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VeloLanding() {
  const CALENDLY_URL = 'https://calendly.com/parkerpiehl/30min';

  return (
    <div style={S.page}>
      {/* Nav */}
      <nav style={S.nav}>
        <div>
          <div style={S.logo}>VELO SYSTEMS</div>
          <div style={S.logoSub}>Automation Agency</div>
        </div>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={S.navBtn}>Book a Free Call →</button>
        </a>
      </nav>

      {/* Hero */}
      <div style={{ ...S.hero, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={S.heroLeft}>
          <div style={S.badge}>
            <span style={S.dot} />
            Serving Home Service Contractors
          </div>
          <h1 style={S.h1}>
            You're losing<br />
            <span style={S.accent}>$18,000/month</span><br />
            to slow follow-up.
          </h1>
          <p style={S.sub}>
            VELO Systems builds done-for-you automation that recovers missed calls, follows up with leads, and fills your calendar — without you doing anything.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={S.btnPrimary}>Book a Free Strategy Call →</button>
            </a>
            <a href="#demo" style={S.btnSecondary}>See it live ↓</a>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 16 }}>No contracts. No tech skills needed. Set up in under a week.</p>
        </div>
        <div style={S.heroRight}>
          <div style={S.photoWrap}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 12,
            }}>
              <div style={{ fontSize: 48 }}>👤</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '0 20px' }}>
                Add your photo here<br />
                <span style={{ fontSize: 11, opacity: 0.6 }}>Replace with your headshot for social media</span>
              </div>
            </div>
            <div style={S.photoOverlay}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={S.photoName}>Parker Piehl</div>
                  <div style={S.photoTitle}>Founder, VELO Systems</div>
                </div>
                <div style={S.liveTag}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Live
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={S.statsBar}>
        <div style={S.statsInner}>
          {RESULTS.map(r => (
            <div key={r.label} style={S.statItem}>
              <div style={S.statNum}>{r.number}</div>
              <div style={S.statLabel}>{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Automations */}
      <div style={S.section}>
        <div style={S.sectionLabel}>What we build for you</div>
        <div style={S.sectionTitle}>5 automations.<br />One system that runs itself.</div>
        <div style={S.sectionSub}>Every automation is built, tested, and handed to you ready to go. You flip it on. That's it.</div>
        <div style={S.autoGrid}>
          {AUTOMATIONS.map(a => (
            <div key={a.title} style={S.autoCard}>
              <div style={S.autoIcon}>{a.icon}</div>
              <div style={S.autoTitle}>{a.title}</div>
              <div style={S.autoDesc}>{a.desc}</div>
              <div style={S.autoStat}>{a.stat}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.divider} />

      {/* Live Demo */}
      <div id="demo" style={S.demoSection}>
        <div style={S.demoInner}>
          <div style={S.sectionLabel}>Live system demo</div>
          <div style={S.sectionTitle}>Watch it work in real time.</div>
          <div style={{ ...S.sectionSub, marginBottom: 0 }}>This is what your dashboard looks like when VELO is running. Every missed call, every new lead, every follow-up — tracked automatically.</div>
          <LiveDemo />
        </div>
      </div>

      <div style={S.divider} />

      {/* Onboarding Process */}
      <div style={S.stepsSection}>
        <div style={S.sectionLabel}>How it works</div>
        <div style={S.sectionTitle}>Live in 6 days.<br />Here's the process.</div>
        <div style={{ ...S.sectionSub, marginBottom: 0 }}>We handle everything. You just show up to the first call.</div>
        <div style={S.stepsGrid}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={S.stepCard}>
              <div style={{ ...S.stepLine, background: i === 0 ? '#fff' : 'rgba(255,255,255,0.08)' }} />
              <div style={S.stepNum}>Step {s.num}</div>
              <div style={S.stepTime}>{s.time}</div>
              <div style={S.stepTitle}>{s.title}</div>
              <div style={S.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="https://calendly.com/parkerpiehl/30min" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ ...S.btnPrimary, fontSize: 16 }}>Start with a Free Call →</button>
          </a>
        </div>
      </div>

      <div style={S.divider} />

      {/* FAQ */}
      <div style={S.faqSection}>
        <div style={{ ...S.sectionLabel, textAlign: 'center' }}>Common questions</div>
        <div style={{ ...S.sectionTitle, textAlign: 'center', marginBottom: 48 }}>Simple answers.</div>
        {FAQS.map(f => (
          <div key={f.q} style={S.faqItem}>
            <div style={S.faqQ}>{f.q}</div>
            <div style={S.faqA}>{f.a}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={S.ctaSection}>
        <div style={S.ctaTitle}>Ready to stop<br />losing jobs?</div>
        <p style={S.ctaSub}>Book a free 15-minute call. I'll show you exactly how much revenue you're leaving on the table and what it looks like when we fix it.</p>
        <div style={S.calBox}>
          <div style={S.calTitle}>Book Your Free Strategy Call</div>
          <div style={S.calSub}>15 minutes. No pitch. Just a real look at your numbers.</div>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={S.calBtn}>
            Choose a Time →
          </a>
          <div style={S.calNote}>Usually books within 24 hours · No credit card needed</div>
        </div>
      </div>

      {/* Footer */}
      <div style={S.footer}>
        © 2026 VELO Systems · Built for home service contractors
      </div>
    </div>
  );
}
