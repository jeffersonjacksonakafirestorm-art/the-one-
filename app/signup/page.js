'use client';
import { useState } from 'react';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    business_name: '',
    owner_name: '',
    email: '',
    password: '',
    phone: '',
    industry: '',
    welcome_message: '',
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      localStorage.setItem('crai_token', data.token);
      localStorage.setItem('crai_user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const industries = [
    'Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Landscaping',
    'Law Firm', 'Med Spa / Aesthetics', 'Dental', 'Real Estate',
    'Water & Fire Restoration', 'Solar', 'Other',
  ];

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#07080b',
      fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
      color: '#efefef',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    },
    card: {
      width: '100%',
      maxWidth: '480px',
      background: '#0e1018',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: '48px 40px',
    },
    logo: {
      textAlign: 'center',
      fontSize: '1.2rem',
      fontWeight: 800,
      marginBottom: '8px',
      letterSpacing: '-0.02em',
    },
    logoAccent: { color: '#6c47ff' },
    subtitle: {
      textAlign: 'center',
      fontSize: '0.85rem',
      color: '#888',
      marginBottom: '36px',
    },
    label: {
      display: 'block',
      fontSize: '0.75rem',
      fontWeight: 700,
      color: '#888',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
    input: {
      width: '100%',
      background: '#14161f',
      border: '1px solid rgba(255,255,255,0.11)',
      borderRadius: '8px',
      padding: '12px 14px',
      fontFamily: 'inherit',
      fontSize: '0.9rem',
      color: '#efefef',
      outline: 'none',
      boxSizing: 'border-box',
    },
    group: { marginBottom: '18px' },
    btn: {
      width: '100%',
      background: '#6c47ff',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: '1rem',
      fontWeight: 700,
      padding: '14px',
      border: 'none',
      borderRadius: '10px',
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.7 : 1,
      marginTop: '8px',
    },
    error: {
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.2)',
      borderRadius: '8px',
      padding: '12px',
      fontSize: '0.85rem',
      color: '#f87171',
      marginBottom: '16px',
      textAlign: 'center',
    },
    switch: { textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: '#888' },
    switchLink: { color: '#6c47ff', fontWeight: 600, textDecoration: 'none' },
    hint: { fontSize: '0.75rem', color: '#555', marginTop: '6px' },
    textarea: {
      width: '100%',
      background: '#14161f',
      border: '1px solid rgba(255,255,255,0.11)',
      borderRadius: '8px',
      padding: '12px 14px',
      fontFamily: 'inherit',
      fontSize: '0.9rem',
      color: '#efefef',
      outline: 'none',
      resize: 'vertical',
      minHeight: '80px',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      background: '#14161f',
      border: '1px solid rgba(255,255,255,0.11)',
      borderRadius: '8px',
      padding: '12px 14px',
      fontFamily: 'inherit',
      fontSize: '0.9rem',
      color: '#efefef',
      outline: 'none',
      appearance: 'none',
      boxSizing: 'border-box',
    },
    trialBadge: {
      display: 'inline-block',
      background: 'rgba(108,71,255,0.12)',
      border: '1px solid rgba(108,71,255,0.3)',
      borderRadius: '100px',
      padding: '4px 12px',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#a78bfa',
      marginBottom: '20px',
      textAlign: 'center',
      width: '100%',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          CallRecover<span style={styles.logoAccent}>AI</span>
        </div>
        <p style={styles.subtitle}>Start recovering missed calls today</p>
        <div style={styles.trialBadge}>✦ Free trial — no credit card required</div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Business Name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="ABC Roofing Co."
              value={form.business_name}
              onChange={e => update('business_name', e.target.value)}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Your Name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="John Smith"
              value={form.owner_name}
              onChange={e => update('owner_name', e.target.value)}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="john@abcroofing.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={e => update('password', e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Business Phone (your existing number)</label>
            <input
              style={styles.input}
              type="tel"
              placeholder="(555) 000-0000"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              required
            />
            <p style={styles.hint}>This is the number your customers already call.</p>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Industry</label>
            <select
              style={styles.select}
              value={form.industry}
              onChange={e => update('industry', e.target.value)}
              required
            >
              <option value="">Select your industry</option>
              {industries.map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Custom Opening Message (optional)</label>
            <textarea
              style={styles.textarea}
              placeholder={`Hey — sorry we missed your call, this is ${form.business_name || 'your business'}. How can we help?`}
              value={form.welcome_message}
              onChange={e => update('welcome_message', e.target.value)}
            />
            <p style={styles.hint}>Leave blank to use the default message above.</p>
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating your account...' : 'Start Free Trial →'}
          </button>
        </form>

        <p style={styles.switch}>
          Already have an account?{' '}
          <a href="/login" style={styles.switchLink}>Sign in</a>
        </p>
      </div>
    </div>
  );
}
