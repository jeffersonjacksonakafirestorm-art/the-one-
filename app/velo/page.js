'use client';
import { useState } from 'react';

const GOLD = '#c9a84c';
const GOLD_LIGHT = '#e8c96b';
const GOLD_BG = 'rgba(201,168,76,0.08)';
const GOLD_BORDER = 'rgba(201,168,76,0.25)';

const S = {
  page: { background: '#0c0c0c', color: '#fff', minHeight: '100vh', fontFamily: "'Inter Tight', system-ui, sans-serif", overflowX: 'hidden' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: `1px solid rgba(255,255,255,0.06)` },
  logo: { fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' },
  logoAccent: { color: GOLD },
  hero: { textAlign: 'center', padding: '64px 24px 48px', maxWidth: 780, margin: '0 auto' },
  eyebrow: { display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD_BG, border: `1px solid ${GOLD_BORDER}`, borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: GOLD, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 28 },
  h1: { fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 20px', color: '#fff' },
  h1Gold: { color: GOLD },
  heroSub: { fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 0' },
  videoWrap: { maxWidth: 720, margin: '40px auto', borderRadius: 16, overflow: 'hidden', border: `1px solid ${GOLD_BORDER}`, position: 'relative', background: '#111', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  videoPlaceholder: { textAlign: 'center' },
  playBtn: { width: 64, height: 64, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 },
  videoLabel: { fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 },
  divider: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '0' },
  pathSection: { padding: '64px 24px', maxWidth: 860, margin: '0 auto' },
  pathTitle: { textAlign: 'center', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 },
  pathSub: { textAlign: 'center', fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 40 },
  pathGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 },
  pathCard: { borderRadius: 16, padding: 28, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.2s' },
  pathCardActive: { border: `2px solid ${GOLD}`, background: GOLD_BG },
  pathIcon: { fontSize: 32, marginBottom: 16 },
  pathCardTitle: { fontSize: 18, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' },
  pathCardDesc: { fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 },
  formSection: { padding: '0 24px 80px', maxWidth: 640, margin: '0 auto' },
  formTitle: { fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 8 },
  formTitleGold: { color: GOLD },
  formSub: { textAlign: 'center', fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 32, lineHeight: 1.6 },
  formCard: { background: '#111', border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 20, padding: '36px 32px' },
  label: { fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 8, display: 'block', letterSpacing: '0.02em' },
  input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 20 },
  radioGroup: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 },
  radioOption: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 14, background: 'rgba(255,255,255,0.02)', transition: 'all 0.15s' },
  radioOptionActive: { border: `1px solid ${GOLD}`, background: GOLD_BG, color: GOLD },
  radioCircle: { width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  radioCircleActive: { border: `2px solid ${GOLD}`, background: GOLD },
  radioInner: { width: 8, height: 8, borderRadius: '50%', background: '#000' },
  textarea: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 20, minHeight: 100, resize: 'vertical' },
  submitBtn: { width: '100%', background: GOLD, color: '#000', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 900, cursor: 'pointer', letterSpacing: '-0.01em' },
  submitBtnDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  successBox: { textAlign: 'center', padding: '48px 32px' },
  successIcon: { fontSize: 48, marginBottom: 16 },
  successTitle: { fontSize: 26, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.03em' },
  successSub: { fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32, lineHeight: 1.6 },
  calBtn: { display: 'inline-block', padding: '16px 32px', background: GOLD, color: '#000', borderRadius: 10, fontSize: 15, fontWeight: 900, textDecoration: 'none', letterSpacing: '-0.01em' },
  footer: { padding: '28px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)', fontSize: 13 },
};

const BUDGET_OPTIONS = [
  'Less than $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000+',
];

const SITUATION_OPTIONS_MENTOR = [
  'I want to start an AI agency from scratch',
  'I have a business and want to add automation',
  'I already have an agency and want to scale it',
];

const SITUATION_OPTIONS_CLIENT = [
  'I run a roofing or HVAC company',
  'I run a plumbing or home service business',
  'I own a different type of contracting business',
];

export default function VeloPage() {
  const [path, setPath] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', situation: '', budget: '', goal: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isMentor = path === 'mentor';
  const isClient = path === 'client';
  const calendlyUrl = isMentor
    ? 'https://calendly.com/parkerpiehl/1-1-mentoring'
    : 'https://calendly.com/parkerpiehl/30min';

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.situation) e.situation = 'Required';
    if (!form.budget) e.budget = 'Required';
    if (!form.goal.trim()) e.goal = 'Required';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  const situationOptions = isMentor ? SITUATION_OPTIONS_MENTOR : SITUATION_OPTIONS_CLIENT;

  return (
    <div style={S.page}>
      {/* Nav */}
      <nav style={S.nav}>
        <div style={S.logo}>VELO <span style={S.logoAccent}>SYSTEMS</span></div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>parkerpiehl@gmail.com</div>
      </nav>

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.eyebrow}>▶ Watch This First</div>
        <h1 style={S.h1}>
          Automate Your Business.<br />
          <span style={S.h1Gold}>Or Learn To Do It For Others.</span>
        </h1>
        <p style={S.heroSub}>
          VELO Systems builds done-for-you automation for home service contractors — and teaches motivated people how to run their own AI automation agency.
        </p>
      </div>

      {/* Video */}
      <div style={{ padding: '0 24px' }}>
        <div style={S.videoWrap}>
          <div style={S.videoPlaceholder}>
            <div style={S.playBtn}>▶</div>
            <div style={S.videoLabel}>Add your VSL video here</div>
          </div>
        </div>
      </div>

      <div style={{ ...S.divider, margin: '48px 0 0' }} />

      {/* Path Selector */}
      <div style={S.pathSection}>
        <div style={S.pathTitle}>Which one is you?</div>
        <div style={S.pathSub}>Pick your situation below to see the right option for you.</div>
        <div style={S.pathGrid}>
          <div
            onClick={() => { setPath('client'); setForm(f => ({ ...f, situation: '' })); setSubmitted(false); }}
            style={path === 'client' ? { ...S.pathCard, ...S.pathCardActive } : S.pathCard}
          >
            <div style={S.pathIcon}>🔧</div>
            <div style={S.pathCardTitle}>I Own A Home Service Business</div>
            <div style={S.pathCardDesc}>
              You run a roofing, HVAC, plumbing, or contracting company and want a done-for-you automation system that recovers missed calls and books more jobs — without you lifting a finger.
            </div>
          </div>
          <div
            onClick={() => { setPath('mentor'); setForm(f => ({ ...f, situation: '' })); setSubmitted(false); }}
            style={path === 'mentor' ? { ...S.pathCard, ...S.pathCardActive } : S.pathCard}
          >
            <div style={S.pathIcon}>🚀</div>
            <div style={S.pathCardTitle}>I Want To Run My Own AI Agency</div>
            <div style={S.pathCardDesc}>
              You want to learn how to build and sell automation systems to local businesses — and have Parker coach you 1-on-1 through the exact process he uses to land and deliver clients.
            </div>
          </div>
        </div>
      </div>

      <div style={S.divider} />

      {/* Application Form */}
      {path && (
        <div style={S.formSection}>
          <div style={{ height: 64 }} />
          <div style={S.formTitle}>
            Fill Out Your{' '}
            <span style={S.formTitleGold}>
              {isMentor ? 'Mentorship Application' : 'Strategy Call Application'}
            </span>
          </div>
          <p style={S.formSub}>
            {isMentor
              ? 'Answer a few quick questions. If it\'s a fit, you\'ll pick a time for your 1-on-1 call with Parker directly.'
              : 'Tell me about your business. I\'ll review it and you\'ll pick a time for a free 30-min strategy call.'}
          </p>

          <div style={S.formCard}>
            {submitted ? (
              <div style={S.successBox}>
                <div style={S.successIcon}>✅</div>
                <div style={S.successTitle}>Application Received</div>
                <p style={S.successSub}>
                  {isMentor
                    ? 'Pick a time for your 1-on-1 mentoring call with Parker below.'
                    : 'Pick a time for your free 30-minute strategy call below.'}
                </p>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" style={S.calBtn}>
                  Select Your Time Slot →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label style={S.label}>Full Name *</label>
                <input
                  style={{ ...S.input, borderColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />

                <label style={S.label}>Email *</label>
                <input
                  style={{ ...S.input, borderColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                  placeholder="your@email.com"
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                />

                <label style={S.label}>Phone *</label>
                <input
                  style={{ ...S.input, borderColor: errors.phone ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                  placeholder="Your phone number"
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                />

                <label style={S.label}>
                  {isMentor ? 'Which best describes you? *' : 'What type of business do you run? *'}
                </label>
                <div style={{ ...S.radioGroup, borderColor: errors.situation ? '#ef4444' : 'transparent' }}>
                  {situationOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => set('situation', opt)}
                      style={form.situation === opt ? { ...S.radioOption, ...S.radioOptionActive } : S.radioOption}
                    >
                      <div style={form.situation === opt ? { ...S.radioCircle, ...S.radioCircleActive } : S.radioCircle}>
                        {form.situation === opt && <div style={S.radioInner} />}
                      </div>
                      {opt}
                    </div>
                  ))}
                </div>

                <label style={S.label}>
                  {isMentor ? 'How much are you ready to invest in yourself? *' : 'What\'s your monthly revenue range? *'}
                </label>
                <div style={S.radioGroup}>
                  {BUDGET_OPTIONS.map(opt => (
                    <div
                      key={opt}
                      onClick={() => set('budget', opt)}
                      style={form.budget === opt ? { ...S.radioOption, ...S.radioOptionActive } : S.radioOption}
                    >
                      <div style={form.budget === opt ? { ...S.radioCircle, ...S.radioCircleActive } : S.radioCircle}>
                        {form.budget === opt && <div style={S.radioInner} />}
                      </div>
                      {opt}
                    </div>
                  ))}
                </div>

                <label style={S.label}>
                  {isMentor
                    ? 'Why do you want to build an AI agency? What\'s your goal? *'
                    : 'What\'s the biggest challenge in your business right now? *'}
                </label>
                <textarea
                  style={{ ...S.textarea, borderColor: errors.goal ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                  placeholder="Be specific — this helps me prepare for the call"
                  value={form.goal}
                  onChange={e => set('goal', e.target.value)}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{ ...S.submitBtn, ...(loading ? S.submitBtnDisabled : {}) }}
                >
                  {loading ? 'Submitting...' : 'Submit Application & Select A Time →'}
                </button>
                <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 12 }}>
                  No spam. Your info goes directly to Parker.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {!path && <div style={{ height: 80 }} />}

      {/* Footer */}
      <div style={S.footer}>
        © 2026 VELO Systems · Parker Piehl · parkerpiehl@gmail.com
      </div>
    </div>
  );
}
