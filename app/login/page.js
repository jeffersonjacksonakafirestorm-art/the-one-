'use client';
import { useState } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '44px 36px' },
  logo: { display: 'block', textAlign: 'center', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none', marginBottom: 8 },
  tagline: { textAlign: 'center', fontSize: 13, color: '#555', marginBottom: 28 },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 },
  input: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' },
  group: { marginBottom: 16 },
  btn: { width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 },
  err: { background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 16, textAlign: 'center' },
  sw: { textAlign: 'center', marginTop: 20, fontSize: 13, color: '#555' },
  swLink: { color: '#fff', fontWeight: 600, textDecoration: 'none' },
  note: { textAlign: 'center', fontSize: 12, color: '#333', marginTop: 12 },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); setLoading(false); return; }
      setSent(true);
      window.location.href = `/verify?email=${encodeURIComponent(email.trim().toLowerCase())}&login=1`;
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <a href="/" style={s.logo}>Actionable</a>
          <p style={{ textAlign: 'center', color: '#888', fontSize: 15, marginTop: 8 }}>Check your email for your sign-in code.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <a href="/" style={s.logo}>Actionable</a>
        <p style={s.tagline}>Sign in with your email</p>
        {error && <div style={s.err}>{error}</div>}
        <form onSubmit={submit}>
          <div style={s.group}>
            <label style={s.label}>Email address</label>
            <input
              style={s.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit" style={{ ...s.btn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? 'Sending code...' : 'Send sign-in code →'}
          </button>
        </form>
        <p style={s.note}>We'll email you a 6-digit code. No password needed.</p>
        <p style={s.sw}>Don't have an account? <a href="/signup" style={s.swLink}>Get started</a></p>
      </div>
    </div>
  );
}
