'use client';
import { useState } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter Tight', system-ui, sans-serif" },
  card: { width: '100%', maxWidth: 460, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '48px 40px' },
  logo: { textAlign: 'center', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6, color: '#fff', textDecoration: 'none', display: 'block' },
  sub: { textAlign: 'center', fontSize: 13, color: '#888', marginBottom: 8 },
  badge: { display: 'block', textAlign: 'center', border: '1px solid #333', borderRadius: 100, padding: '4px 0', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 28 },
  group: { marginBottom: 16 },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' },
  input: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '11px 14px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' },
  select: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '11px 14px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none', appearance: 'none', boxSizing: 'border-box' },
  hint: { fontSize: 11, color: '#555', marginTop: 5 },
  btn: { width: '100%', background: '#fff', color: '#000', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, padding: 14, border: 'none', borderRadius: 10, cursor: 'pointer', marginTop: 8 },
  error: { background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: 8, padding: 12, fontSize: 13, color: '#f87171', marginBottom: 16, textAlign: 'center' },
  sw: { textAlign: 'center', marginTop: 18, fontSize: 13, color: '#888' },
  swLink: { color: '#fff', fontWeight: 600, textDecoration: 'none' },
};

const industries = ['Roofing','HVAC','Plumbing','Electrical','Landscaping','Law Firm','Med Spa / Aesthetics','Dental','Real Estate','Water & Fire Restoration','Solar','Other'];

export default function Signup() {
  const [form, setForm] = useState({ business_name: '', owner_name: '', email: '', password: '', phone: '', industry: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Store user locally — backend activates when credentials are configured
      const user = { ...form, id: Date.now().toString(), plan: 'trial', created_at: new Date().toISOString() };
      localStorage.setItem('crai_user', JSON.stringify(user));
      localStorage.setItem('crai_authed', '1');
      window.location.href = '/dashboard';
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <a href="/" style={s.logo}>CallRecoverAI</a>
        <p style={s.sub}>Start recovering missed calls today</p>
        <span style={s.badge}>✦ Free trial — no credit card required</span>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={submit}>
          <div style={s.group}>
            <label style={s.label}>Business Name</label>
            <input style={s.input} type="text" placeholder="ABC Roofing Co." value={form.business_name} onChange={e => up('business_name', e.target.value)} required />
          </div>
          <div style={s.group}>
            <label style={s.label}>Your Name</label>
            <input style={s.input} type="text" placeholder="John Smith" value={form.owner_name} onChange={e => up('owner_name', e.target.value)} required />
          </div>
          <div style={s.group}>
            <label style={s.label}>Email Address</label>
            <input style={s.input} type="email" placeholder="john@abcroofing.com" value={form.email} onChange={e => up('email', e.target.value)} required />
          </div>
          <div style={s.group}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="At least 8 characters" value={form.password} onChange={e => up('password', e.target.value)} minLength={8} required />
          </div>
          <div style={s.group}>
            <label style={s.label}>Business Phone</label>
            <input style={s.input} type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => up('phone', e.target.value)} required />
            <p style={s.hint}>The number your customers already call.</p>
          </div>
          <div style={s.group}>
            <label style={s.label}>Industry</label>
            <select style={s.select} value={form.industry} onChange={e => up('industry', e.target.value)} required>
              <option value="">Select your industry</option>
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <button type="submit" style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Start Free Trial →'}
          </button>
        </form>
        <p style={s.sw}>Already have an account? <a href="/login" style={s.swLink}>Sign in</a></p>
      </div>
    </div>
  );
}
