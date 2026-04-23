'use client';
import { useState } from 'react';

const S = {
  page: { minHeight: '100vh', background: '#000', padding: '40px 24px', fontFamily: "'Inter Tight', system-ui, sans-serif", maxWidth: 560, margin: '0 auto' },
  logo: { fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 48 },
  progress: { display: 'flex', gap: 4, marginBottom: 40 },
  dot: { flex: 1, height: 3, borderRadius: 100, background: 'rgba(255,255,255,0.1)' },
  dotActive: { flex: 1, height: 3, borderRadius: 100, background: '#fff' },
  step: { fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12 },
  q: { fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1.2 },
  hint: { fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 32, lineHeight: 1.5 },
  options: { display: 'flex', flexDirection: 'column', gap: 10 },
  option: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px', fontSize: 15, cursor: 'pointer', textAlign: 'left', color: '#fff', fontFamily: 'inherit' },
  optionActive: { background: 'rgba(255,255,255,0.08)', border: '1px solid #fff', borderRadius: 12, padding: '16px 20px', fontSize: 15, cursor: 'pointer', textAlign: 'left', color: '#fff', fontFamily: 'inherit' },
  input: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' },
  nav: { display: 'flex', gap: 12, marginTop: 36 },
  btnBack: { flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', color: '#fff', fontFamily: 'inherit' },
  btnNext: { flex: 2, background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' },
  btnNextDisabled: { flex: 2, background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'not-allowed', fontFamily: 'inherit' },
}

const STEPS = [
  { key: 'employment', q: "What's your current situation?", hint: 'This helps us focus on what matters most for you right now.', type: 'options', options: ['Working a 9-5', 'Self-employed / freelance', 'Side hustling on top of a job', 'Currently unemployed', 'Student', 'Recently graduated'] },
  { key: 'age', q: 'How old are you?', hint: 'Your age affects the strategy — timelines for investing and retirement differ significantly.', type: 'text', placeholder: 'e.g. 24', inputType: 'number' },
  { key: 'income', q: "What's your monthly take-home income?", hint: "After taxes and deductions — what actually hits your bank account each month.", type: 'text', placeholder: 'e.g. 3200', inputType: 'number', prefix: '$' },
  { key: 'debt', q: 'How much total debt do you have?', hint: 'Include credit cards, student loans, car loans, personal loans. Round to the nearest hundred.', type: 'text', placeholder: 'e.g. 14500', inputType: 'number', prefix: '$' },
  { key: 'goal', q: "What's your #1 financial goal right now?", hint: 'Pick the one that matters most. You can work on others later.', type: 'options', options: ['Get out of debt', 'Build an emergency fund', 'Save for a big purchase', 'Start investing', 'Increase my income', 'Retire early'] },
  { key: 'risk_tolerance', q: 'How do you feel about financial risk?', hint: 'Honest answer only — this affects how we build your plan.', type: 'options', options: ['Very conservative — safety first', 'Moderate — balanced approach', 'Aggressive — maximize growth', 'Not sure yet'] },
  { key: 'timeline', q: "What's your timeline for your main goal?", hint: 'Being realistic here makes the plan more achievable.', type: 'options', options: ['ASAP — within 6 months', '1 year', '2–3 years', '5 years', '10+ years'] },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const current = STEPS[step]
  const answer = answers[current.key] || ''

  function selectOption(val) { setAnswers(a => ({ ...a, [current.key]: val })) }
  function setInput(val) { setAnswers(a => ({ ...a, [current.key]: val })) }

  async function next() {
    if (step < STEPS.length - 1) { setStep(s => s + 1); return }
    setLoading(true)
    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })
      window.location.href = '/chat'
    } catch { setLoading(false) }
  }

  const canNext = answer && answer.toString().trim() !== ''

  return (
    <div style={S.page}>
      <div style={S.logo}>Actionable AI</div>
      <div style={S.progress}>
        {STEPS.map((_, i) => <div key={i} style={i <= step ? S.dotActive : S.dot} />)}
      </div>
      <div style={S.step}>Question {step + 1} of {STEPS.length}</div>
      <h2 style={S.q}>{current.q}</h2>
      <p style={S.hint}>{current.hint}</p>

      {current.type === 'options' ? (
        <div style={S.options}>
          {current.options.map(opt => (
            <button key={opt} style={answer === opt ? S.optionActive : S.option} onClick={() => selectOption(opt)}>
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {current.prefix && <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>{current.prefix}</span>}
          <input
            style={{ ...S.input, paddingLeft: current.prefix ? 28 : 16 }}
            type={current.inputType || 'text'}
            placeholder={current.placeholder}
            value={answer}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
        </div>
      )}

      <div style={S.nav}>
        {step > 0 && <button style={S.btnBack} onClick={() => setStep(s => s - 1)}>← Back</button>}
        <button style={canNext && !loading ? S.btnNext : S.btnNextDisabled} onClick={next} disabled={!canNext || loading}>
          {loading ? 'Saving...' : step === STEPS.length - 1 ? 'Build my plan →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
