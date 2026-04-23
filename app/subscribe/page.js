'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const S = {
  page: { minHeight: '100vh', background: '#000', padding: '40px 24px', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  logo: { fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 48, textAlign: 'center' },
  title: { fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 8 },
  sub: { fontSize: 15, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 48, lineHeight: 1.5 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, maxWidth: 700, margin: '0 auto 40px' },
  card: { background: 'rgba(255,255,255,0.04)', border: '2px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28, cursor: 'pointer', transition: 'border-color 0.15s' },
  cardActive: { background: 'rgba(255,255,255,0.06)', border: '2px solid #fff', borderRadius: 20, padding: 28, cursor: 'pointer' },
  cardWhite: { background: '#fff', color: '#000', border: '2px solid #fff', borderRadius: 20, padding: 28, cursor: 'pointer' },
  planName: { fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 },
  planNameW: { fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 8 },
  price: { fontSize: 44, fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 4px' },
  priceW: { fontSize: 44, fontWeight: 900, letterSpacing: '-0.04em', color: '#000', margin: '0 0 4px' },
  per: { fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 },
  perW: { fontSize: 13, color: 'rgba(0,0,0,0.5)', marginBottom: 20 },
  features: { listStyle: 'none', padding: 0, margin: 0 },
  feature: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'flex', gap: 8 },
  featureW: { fontSize: 13, color: 'rgba(0,0,0,0.7)', marginBottom: 8, display: 'flex', gap: 8 },
  btn: { display: 'block', width: '100%', maxWidth: 340, margin: '0 auto', background: '#fff', color: '#000', border: 'none', borderRadius: 12, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', textAlign: 'center' },
  btnDisabled: { display: 'block', width: '100%', maxWidth: 340, margin: '0 auto', background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', border: 'none', borderRadius: 12, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'not-allowed', textAlign: 'center' },
  note: { textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16 },
  err: { textAlign: 'center', fontSize: 13, color: '#ff6060', marginTop: 12 },
}

const PLANS = {
  basic: {
    name: 'Basic', price: '$15', per: 'per month',
    features: ['Unlimited AI coaching', 'Photo & document analysis', 'Voice input', 'Progress roadmap', 'Community access', 'Chat history'],
  },
  pro: {
    name: 'Pro', price: '$49', per: 'per month',
    features: ['Everything in Basic', 'Weekly AI progress reports', 'Downloadable financial plans', 'Priority responses', 'Early feature access'],
  },
}

export default function SubscribePage() {
  const [plan, setPlan] = useState('basic')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('plan')
    if (p === 'pro') setPlan('pro')
  }, [])

  async function handleCheckout() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
      if (data.url) window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={S.page}>
      <div style={S.logo}>Actionable AI</div>
      <h1 style={S.title}>Choose your plan</h1>
      <p style={S.sub}>Cancel anytime. No commitment.</p>

      <div style={S.grid}>
        {Object.entries(PLANS).map(([key, p]) => {
          const isPro = key === 'pro'
          const isSelected = plan === key
          const cardStyle = isPro ? S.cardWhite : (isSelected ? S.cardActive : S.card)
          return (
            <div key={key} style={cardStyle} onClick={() => setPlan(key)}>
              <div style={isPro ? S.planNameW : S.planName}>{p.name}</div>
              <div style={isPro ? S.priceW : S.price}>{p.price}</div>
              <div style={isPro ? S.perW : S.per}>{p.per}</div>
              <ul style={S.features}>
                {p.features.map(f => (
                  <li key={f} style={isPro ? S.featureW : S.feature}>
                    <span>✓</span><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <button style={loading ? S.btnDisabled : S.btn} onClick={handleCheckout} disabled={loading}>
        {loading ? 'Redirecting...' : `Start ${PLANS[plan].name} — ${PLANS[plan].price}/mo`}
      </button>
      {error && <div style={S.err}>{error}</div>}
      <p style={S.note}>You'll be taken to Stripe's secure checkout. Cancel anytime from your dashboard.</p>
    </div>
  )
}
