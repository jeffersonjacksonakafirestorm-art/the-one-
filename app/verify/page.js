'use client';
import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const s = {
  page: { minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '44px 36px' },
  logo: { display: 'block', textAlign: 'center', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none', marginBottom: 8 },
  tagline: { textAlign: 'center', fontSize: 14, color: '#888', marginBottom: 8 },
  email: { textAlign: 'center', fontSize: 15, color: '#fff', fontWeight: 600, marginBottom: 28 },
  codeRow: { display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 },
  codeInput: { width: 52, height: 64, background: '#111', border: '1px solid #222', borderRadius: 10, textAlign: 'center', fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' },
  codeInputFocused: { borderColor: '#fff' },
  btn: { width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  err: { background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 16, textAlign: 'center' },
  resend: { textAlign: 'center', marginTop: 16, fontSize: 13, color: '#555' },
  resendBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0 },
};

function VerifyForm() {
  const params = useSearchParams();
  const email = params.get('email') || '';
  const plan = params.get('plan') || 'basic';
  const ref = params.get('ref') || '';

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const [focusIdx, setFocusIdx] = useState(null);
  const inputs = useRef([]);

  function handleChange(i, val) {
    const v = val.replace(/\D/, '').slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
    if (!v && i > 0) inputs.current[i - 1]?.focus();
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      setDigits(text.split(''));
      inputs.current[5]?.focus();
    }
    e.preventDefault();
  }

  async function submit(e) {
    e.preventDefault();
    const code = digits.join('');
    if (code.length !== 6) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, plan, ref }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid code.'); setLoading(false); return; }
      window.location.href = '/subscribe?plan=' + plan;
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  async function resendCode() {
    setResent(false);
    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, plan, ref }),
    });
    setResent(true);
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <a href="/" style={s.logo}>Actionable</a>
        <p style={s.tagline}>Check your email — we sent a code to</p>
        <p style={s.email}>{email}</p>
        {error && <div style={s.err}>{error}</div>}
        <form onSubmit={submit}>
          <div style={s.codeRow} onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                style={{ ...s.codeInput, ...(focusIdx === i ? s.codeInputFocused : {}) }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onFocus={() => setFocusIdx(i)}
                onBlur={() => setFocusIdx(null)}
                autoFocus={i === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            style={{ ...s.btn, opacity: (digits.join('').length !== 6 || loading) ? 0.5 : 1 }}
            disabled={digits.join('').length !== 6 || loading}
          >
            {loading ? 'Verifying...' : 'Verify & Continue →'}
          </button>
        </form>
        <p style={s.resend}>
          {resent ? 'Code sent!' : <>Didn't get it? <button style={s.resendBtn} onClick={resendCode}>Resend code</button></>}
        </p>
      </div>
    </div>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <VerifyForm />
    </Suspense>
  );
}
