'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const s = {
  page: { minHeight: '100vh', background: '#000', padding: '48px 24px', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  logo: { display: 'block', textAlign: 'center', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none', marginBottom: 40 },
  h1: { textAlign: 'center', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 12px', color: '#fff' },
  sub: { textAlign: 'center', fontSize: 15, color: '#666', marginBottom: 48 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, maxWidth: 680, margin: '0 auto' },
  card: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '32px 28px', cursor: 'pointer', transition: 'border-color 0.15s' },
  cardActive: { background: '#fff', borderRadius: 20, padding: '32px 28px', cursor: 'pointer' },
  planName: { fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#555', marginBottom: 10 },
  planNameDark: { fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', marginBottom: 10 },
  price: { fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em', color: '#000', margin: '0 0 2px', lineHeight: 1 },
  priceDark: { fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 2px', lineHeight: 1 },
  per: { fontSize: 13, color: '#666', marginBottom: 20 },
  perDark: { fontSize: 13, color: '#555', marginBottom: 20 },
  feats: { listStyle: 'none', padding: 0, margin: '0 0 24px' },
  feat: { fontSize: 14, color: '#333', padding: '5px 0', display: 'flex', gap: 8 },
  featDark: { fontSize: 14, color: '#888', padding: '5px 0', display: 'flex', gap: 8 },
  selectBadge: { display: 'inline-block', background: '#000', color: '#fff', borderRadius: 100, padding: '4px 14px', fontSize: 12, fontWeight: 700 },
  btn: { width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 12, padding: '15px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 24 },
  err: { textAlign: 'center', color: '#f87171', fontSize: 14, marginTop: 16 },
  guarantee: { textAlign: 'center', fontSize: 13, color: '#333', marginTop: 24 },
};

const PLANS = {
  basic: {
    name: 'Basic',
    price: '$15',
    features: ['Unlimited AI coaching','Photo & document analysis','Voice input','Chat history','Progress roadmap','Community stories','Mobile app (PWA)'],
  },
  pro: {
    name: 'Pro',
    price: '$49',
    features: ['Everything in Basic','Weekly AI progress reports','Priority responses','Downloadable plans','Referral program','Early access'],
  },
};

function SubscribeForm() {
  const params = useSearchParams();
  const defaultPlan = params.get('plan') || 'basic';
  const [selected, setSelected] = useState(defaultPlan === 'pro' ? 'pro' : 'basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function checkout() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selected }),
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
    <div style={s.page}>
      <a href="/" style={s.logo}>Actionable</a>
      <h1 style={s.h1}>Choose your plan</h1>
      <p style={s.sub}>Cancel anytime. No hidden fees.</p>

      <div style={s.grid}>
        {Object.entries(PLANS).map(([key, plan]) => {
          const active = selected === key;
          return (
            <div key={key} style={active ? s.cardActive : s.card} onClick={() => setSelected(key)}>
              <div style={active ? s.planName : s.planNameDark}>
                {plan.name} {active && <span style={s.selectBadge}>Selected</span>}
              </div>
              <div style={active ? s.price : s.priceDark}>{plan.price}</div>
              <div style={active ? s.per : s.perDark}>per month</div>
              <ul style={s.feats}>
                {plan.features.map(f => (
                  <li key={f} style={active ? s.feat : s.featDark}><span>✓</span>{f}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <button style={{ ...s.btn, opacity: loading ? 0.6 : 1 }} onClick={checkout} disabled={loading}>
          {loading ? 'Redirecting to checkout...' : `Subscribe to ${PLANS[selected].name} — ${PLANS[selected].price}/mo →`}
        </button>
        {error && <div style={s.err}>{error}</div>}
        <p style={s.guarantee}>Secured by Stripe · Cancel anytime from your dashboard</p>
      </div>
    </div>
  );
}

export default function Subscribe() {
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <SubscribeForm />
    </Suspense>
  );
}
