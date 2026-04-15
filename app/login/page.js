'use client';
import { useState } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter Tight', system-ui, sans-serif" },
  card: { width: '100%', maxWidth: 400, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '48px 40px' },
  logo: { textAlign: 'center', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6, color: '#fff', textDecoration: 'none', display: 'block' },
  sub: { textAlign: 'center', fontSize: 13, color: '#888', marginBottom: 32 },
  group: { marginBottom: 16 },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' },
  input: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '11px 14px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' },
  btn: { width: '100%', background: '#fff', color: '#000', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, padding: 14, border: 'none', borderRadius: 10, cursor: 'pointer', marginTop: 8 },
  error: { background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: 8, padding: 12, fontSize: 13, color: '#f87171', marginBottom: 16, textAlign: 'center' },
  sw: { textAlign: 'center', marginTop: 18, fontSize: 13, color: '#888' },
  swLink: { color: '#fff', fontWeight: 600, textDecoration: 'none' },
};

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const stored = localStorage.getItem('crai_user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === form.email && user.password === form.password) {
        localStorage.setItem('crai_authed', '1');
        // Check if onboarding is done
        const onboardingDone = localStorage.getItem('onboarding_complete');
        window.location.href = onboardingDone ? '/dashboard' : '/onboarding';
        return;
      }
    }
    setError('Invalid email or password.');
    setLoading(false);
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <a href="/" style={s.logo}>Groundwork</a>
        <p style={s.sub}>Sign in to your dashboard</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={submit}>
          <div style={s.group}>
            <label style={s.label}>Email Address</label>
            <input style={s.input} type="email" placeholder="john@abcroofing.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <div style={s.group}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
          </div>
          <button type="submit" style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In \u2192'}
          </button>
        </form>
        <p style={s.sw}>Don&apos;t have an account? <a href="/signup" style={s.swLink}>Start free trial</a></p>
      </div>
    </div>
  );
}
