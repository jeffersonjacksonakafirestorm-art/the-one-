'use client';
import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShaderBackground from '@/components/ShaderBackground';

function VerifyForm() {
  const params  = useSearchParams();
  const email   = params.get('email')  || '';
  const plan    = params.get('plan')   || 'basic';
  const ref     = params.get('ref')    || '';
  const isLogin = params.get('login')  === '1';

  const [digits, setDigits]   = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [resent, setResent]   = useState(false);
  const [focusIdx, setFocusIdx] = useState(null);
  const inputs = useRef([]);

  function handleChange(i, val) {
    const v = val.replace(/\D/, '').slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace') {
      if (digits[i]) {
        const next = [...digits];
        next[i] = '';
        setDigits(next);
      } else if (i > 0) {
        inputs.current[i - 1]?.focus();
      }
      e.preventDefault();
    }
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
        body: JSON.stringify({ email, code, plan, ref, login: isLogin ? '1' : undefined }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid code.'); setLoading(false); return; }
      window.location.href = isLogin ? '/chat' : '/subscribe?plan=' + plan;
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  async function resendCode() {
    setResent(false);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, plan, ref }),
    });
    setResent(true);
  }

  const filled = digits.join('').length === 6;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .auth-card { animation: fadeUp 0.5s 0.1s ease both; }
        .code-input { transition: border-color 0.15s, box-shadow 0.15s; }
        .code-input:focus { border-color: rgba(249,115,22,0.7) !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
        .auth-btn { transition: all 0.18s; }
        .auth-btn:hover:not(:disabled) { transform: scale(1.02); }
        .auth-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      <ShaderBackground />

      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, fontFamily: "'Inter Tight', system-ui, sans-serif",
      }}>
        <div className="auth-card" style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(20,10,0,0.75)',
          border: '1px solid rgba(251,146,60,0.2)',
          borderRadius: 20,
          padding: '44px 36px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 0 0 1px rgba(249,115,22,0.06) inset, 0 24px 64px -12px rgba(0,0,0,0.8)',
        }}>
          <a href="/" style={{ display: 'block', textAlign: 'center', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none', marginBottom: 6 }}>
            Actionable
          </a>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.35)', margin: '0 0 6px' }}>
            Check your email — we sent a code to
          </p>
          <p style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#fdba74', margin: '0 0 28px' }}>
            {email}
          </p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 18, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 22 }} onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => inputs.current[i] = el}
                  className="code-input"
                  style={{
                    width: 52, height: 64,
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${focusIdx === i ? 'rgba(249,115,22,0.6)' : 'rgba(251,146,60,0.15)'}`,
                    borderRadius: 12,
                    textAlign: 'center',
                    fontSize: 28, fontWeight: 800, color: '#fff',
                    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onFocus={() => setFocusIdx(i)}
                  onBlur={() => setFocusIdx(null)}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <button
              type="submit"
              className="auth-btn"
              disabled={!filled || loading}
              style={{
                width: '100%',
                background: (filled && !loading) ? 'linear-gradient(135deg,#f97316,#fbbf24)' : 'rgba(249,115,22,0.2)',
                color: (filled && !loading) ? '#000' : 'rgba(255,255,255,0.3)',
                border: 'none', borderRadius: 11, padding: 14,
                fontSize: 15, fontWeight: 700,
                cursor: (filled && !loading) ? 'pointer' : 'default',
                fontFamily: 'inherit',
              }}
            >
              {loading ? 'Verifying…' : 'Verify & Continue →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            {resent ? (
              <span style={{ color: '#fdba74' }}>Code sent!</span>
            ) : (
              <>
                Didn't get it?{' '}
                <button
                  onClick={resendCode}
                  style={{ background: 'none', border: 'none', color: '#fdba74', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
                >
                  Resend code
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <VerifyForm />
    </Suspense>
  );
}
