'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('crai_token', data.token);
      localStorage.setItem('crai_user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const s = {
    page: {
      minHeight: '100vh',
      background: '#07080b',
      fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
      color: '#efefef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      background: '#0e1018',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: '48px 40px',
    },
    logo: { textAlign: 'center', fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' },
    acc: { color: '#6c47ff' },
    sub: { textAlign: 'center', fontSize: '0.85rem', color: '#888', marginBottom: '36px' },
    label: { display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' },
    input: { width: '100%', background: '#14161f', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '8px', padding: '12px 14px', fontFamily: 'inherit', fontSize: '0.9rem', color: '#efefef', outline: 'none', boxSizing: 'border-box' },
    group: { marginBottom: '18px' },
    btn: { width: '100%', background: '#6c47ff', color: '#fff', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, padding: '14px', border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '8px' },
    error: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '12px', fontSize: '0.85rem', color: '#f87171', marginBottom: '16px', textAlign: 'center' },
    sw: { textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: '#888' },
    swLink: { color: '#6c47ff', fontWeight: 600, textDecoration: 'none' },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>
          CallRecover<span style={s.acc}>AI</span>
        </div>
        <p style={s.sub}>Sign in to your dashboard</p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={s.group}>
            <label style={s.label}>Email Address</label>
            <input
              style={s.input}
              type="email"
              placeholder="john@abcroofing.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              required
            />
          </div>
          <div style={s.group}>
            <label style={s.label}>Password</label>
            <input
              style={s.input}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => update('password', e.target.value)}
              required
            />
          </div>
          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={s.sw}>
          Don&apos;t have an account?{' '}
          <a href="/signup" style={s.swLink}>Start free trial</a>
        </p>
      </div>
    </div>
  );
}
