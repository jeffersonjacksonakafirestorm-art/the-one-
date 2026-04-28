'use client';
import { useState, useEffect } from 'react';

export default function Login() {
  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) window.location.href = '/chat';
    }).catch(() => {});
  }, []);

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); setLoading(false); return; }
      window.location.href = `/verify?email=${encodeURIComponent(email.trim().toLowerCase())}&login=1`;
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .auth-card { animation: fadeUp 0.45s ease both; }
        .auth-input { transition: border-color 0.2s; }
        .auth-input:focus { border-color: rgba(249,115,22,0.55) !important; outline: none; }
        .auth-btn { transition: opacity 0.18s, transform 0.18s; }
        .auth-btn:hover:not(:disabled) { opacity: 0.9; }
        .auth-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      {/* Static gradient — no WebGL, light on battery */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.18) 0%, transparent 70%), linear-gradient(180deg,#0f0600 0%,#080300 100%)', zIndex: 0 }} />

      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, fontFamily: "'Inter Tight', system-ui, sans-serif",
      }}>
        <div className="auth-card" style={{
          width: '100%', maxWidth: 400,
          background: 'rgba(20,8,0,0.7)',
          border: '1px solid rgba(251,146,60,0.18)',
          borderRadius: 20, padding: '44px 36px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 24px 64px -12px rgba(0,0,0,0.7)',
        }}>
          <a href="/" style={{ display: 'block', textAlign: 'center', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none', marginBottom: 6 }}>
            Actionable
          </a>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 0, marginBottom: 28 }}>
            Sign in to your account
          </p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 18, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(251,146,60,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Email address
            </label>
            <input
              className="auth-input"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(251,146,60,0.15)', borderRadius: 10, padding: '12px 14px', color: '#fff', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 14 }}
              type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required autoFocus
            />
            <button
              type="submit" className="auth-btn" disabled={loading}
              style={{ width: '100%', background: loading ? 'rgba(249,115,22,0.4)' : 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', border: 'none', borderRadius: 11, padding: 14, fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit' }}
            >
              {loading ? 'Sending code…' : 'Send sign-in code →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.18)', marginTop: 14, marginBottom: 0 }}>
            We'll email you a 6-digit code. No password needed.
          </p>
          <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 0 }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ color: '#fdba74', fontWeight: 600, textDecoration: 'none' }}>Get started</a>
          </p>
        </div>
      </div>
    </>
  );
}
