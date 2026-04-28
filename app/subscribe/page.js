'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SubscribeForm() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  async function checkout() {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'basic' }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) { setError(data.error || 'Could not start checkout.'); setLoading(false); return; }
      window.location.href = data.url;
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .sub-card { animation: fadeUp 0.45s ease both; }
        .sub-btn { transition: opacity 0.18s, transform 0.18s; }
        .sub-btn:hover:not(:disabled) { opacity: 0.92; }
        .sub-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.18) 0%, transparent 70%), linear-gradient(180deg,#0f0600 0%,#080300 100%)', zIndex: 0 }} />

      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', fontFamily: "'Inter Tight', system-ui, sans-serif", color: '#fff',
      }}>
        <a href="/" style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none', marginBottom: 36 }}>
          Actionable
        </a>

        <div className="sub-card" style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(251,146,60,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Simple pricing</div>
            <h1 style={{ fontSize: 'clamp(28px,6vw,40px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 8px', color: '#fff' }}>One plan. One coach.</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Cancel anytime. No hidden fees.</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg,rgba(249,115,22,0.12),rgba(251,191,36,0.07))',
            border: '1px solid rgba(251,146,60,0.3)',
            borderRadius: 20, padding: '32px 28px',
            backdropFilter: 'blur(12px)',
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', marginBottom: 4 }}>$15</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>per month — cancel anytime</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
              {[
                'Unlimited AI coaching sessions',
                'Photo & document analysis',
                'Voice input',
                'Full chat history',
                'Community stories',
              ].map(f => (
                <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ color: '#f97316', fontSize: 13 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button
              className="sub-btn"
              onClick={checkout}
              disabled={loading}
              style={{
                width: '100%', background: loading ? 'rgba(249,115,22,0.4)' : 'linear-gradient(135deg,#f97316,#fbbf24)',
                color: '#000', border: 'none', borderRadius: 12, padding: 16,
                fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit',
              }}
            >
              {loading ? 'Redirecting to checkout…' : 'Get started — $15/mo →'}
            </button>
          </div>

          {error && <div style={{ textAlign: 'center', color: '#f87171', fontSize: 13, marginBottom: 12 }}>{error}</div>}

          <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            Secured by Stripe · Cancel from your dashboard anytime
          </p>
        </div>
      </div>
    </>
  );
}

export default function Subscribe() {
  return (
    <Suspense fallback={<div style={{ background: '#0f0600', minHeight: '100vh' }} />}>
      <SubscribeForm />
    </Suspense>
  );
}
