'use client';
import { useState } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter Tight', system-ui, sans-serif" },
  logo: { display: 'block', textAlign: 'center', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none', marginBottom: 40 },
  card: { width: '100%', maxWidth: 520, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '40px 36px' },
  progress: { display: 'flex', gap: 6, marginBottom: 32 },
  progressDot: { flex: 1, height: 3, borderRadius: 2, background: '#1a1a1a' },
  progressDotActive: { flex: 1, height: 3, borderRadius: 2, background: '#fff' },
  step: { fontSize: 12, fontWeight: 700, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 },
  question: { fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 },
  hint: { fontSize: 14, color: '#555', marginBottom: 24, lineHeight: 1.5 },
  options: { display: 'flex', flexDirection: 'column', gap: 10 },
  option: { background: '#111', border: '1px solid #222', borderRadius: 12, padding: '14px 16px', cursor: 'pointer', fontSize: 15, color: '#ccc', textAlign: 'left', fontFamily: 'inherit' },
  optionSelected: { background: '#fff', border: '1px solid #fff', borderRadius: 12, padding: '14px 16px', cursor: 'pointer', fontSize: 15, color: '#000', fontWeight: 700, textAlign: 'left', fontFamily: 'inherit' },
  actions: { display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 12 },
  backBtn: { background: 'none', border: '1px solid #222', borderRadius: 10, padding: '12px 20px', color: '#555', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
  nextBtn: { background: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
};

const STEPS = [
  { key: 'situation', question: "What's your current situation?", hint: 'Be honest — the more accurate this is, the better your plan.', options: ['Working a 9-to-5 and want out', 'Unemployed / between jobs', 'Student / recent grad with debt', 'Self-employed but struggling', 'Just starting from scratch', 'Other'] },
  { key: 'income', question: "What's your monthly income right now?", hint: 'Approximate is fine. Include all sources.', options: ['$0 — no income right now', '$1 – $1,500/month', '$1,500 – $3,000/month', '$3,000 – $5,000/month', '$5,000 – $10,000/month', '$10,000+/month'] },
  { key: 'debt', question: "How much total debt do you have?", hint: 'Credit cards, student loans, car loans — all of it.', options: ['$0 — no debt', 'Under $5,000', '$5,000 – $20,000', '$20,000 – $50,000', '$50,000 – $100,000', 'Over $100,000'] },
  { key: 'goal', question: "What's your #1 goal right now?", hint: 'Pick the one that matters most.', options: ['Replace my 9-to-5 income', 'Build an investment portfolio', 'Start and grow a business', 'Get out of debt fast', 'Create multiple income streams', 'Achieve total financial freedom'] },
  { key: 'timeline', question: "What's your timeline?", hint: 'When do you need to see serious progress?', options: ['3 months — I need results fast', '6 months', '1 year', '2-3 years — playing the long game', 'No rush — just want to learn'] },
  { key: 'skills', question: "What are your strongest skills or assets?", hint: "This helps Actionable find your fastest path forward.", options: ['Tech / coding / software', 'Sales / marketing / persuasion', 'Writing / content creation', 'Trades / physical skills', 'Customer service / communication', "Not sure yet — still figuring it out"] },
  { key: 'commitment', question: "How much time can you invest per week?", hint: 'Be realistic. Your plan will match your actual bandwidth.', options: ['1-5 hours — very limited', '5-10 hours/week', '10-20 hours/week', '20-40 hours/week', 'Full-time — this is my main focus'] },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const current = STEPS[step];
  const selected = answers[current.key];

  async function finish(finalAnswers) {
    setLoading(true);
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      });
    } catch {}
    window.location.href = '/chat';
  }

  function next() {
    if (!selected) return;
    if (step === STEPS.length - 1) { finish(answers); return; }
    setStep(s => s + 1);
  }

  function select(val) {
    const updated = { ...answers, [current.key]: val };
    setAnswers(updated);
  }

  return (
    <div style={s.page}>
      <a href="/" style={s.logo}>Actionable</a>
      <div style={s.card}>
        <div style={s.progress}>
          {STEPS.map((_, i) => <div key={i} style={i <= step ? s.progressDotActive : s.progressDot} />)}
        </div>
        <div style={s.step}>Step {step + 1} of {STEPS.length}</div>
        <div style={s.question}>{current.question}</div>
        <div style={s.hint}>{current.hint}</div>
        <div style={s.options}>
          {current.options.map(opt => (
            <button key={opt} style={selected === opt ? s.optionSelected : s.option} onClick={() => select(opt)}>
              {opt}
            </button>
          ))}
        </div>
        <div style={s.actions}>
          <button style={s.backBtn} onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
            ← Back
          </button>
          <button style={{ ...s.nextBtn, opacity: (!selected || loading) ? 0.4 : 1 }} onClick={next} disabled={!selected || loading}>
            {loading ? 'Building your plan...' : step === STEPS.length - 1 ? 'Start Coaching →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
