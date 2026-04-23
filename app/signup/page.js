'use client';
import { useState } from 'react';
import Link from 'next/link';

const S = {
  page: { minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter Tight', system-ui, sans-serif" },
  box: { width: '100%', maxWidth: 400 },
  logo: { fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 40, textAlign: 'center' },
  title: { fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 15, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 36, lineHeight: 1.5 },
  label: { display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.45)', marginBottom: 8, textTransform: 'uppercase' },
  input: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' },
  btn: { width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', marginTop: 16 },
  switch: { textAlign: 'center', marginTop: 28, fontSize: 14, color: 'rgba(255,255,255,0.45)' },
  link: { color: '#fff', textDecoration: 'none', fontWeight: 700 },
  err: { background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#ff6060', marginTop: 16 },
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
      sessionStorage.setItem('pendingEmail', email.trim())
      window.location.href = '/verify'
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={S.page}>
      <div style={S.box}>
        <div style={S.logo}>Actionable AI</div>
        <h1 style={S.title}>Create your account</h1>
        <p style={S.sub}>Enter your email and we'll send you a login code. No password needed.</p>
        <form onSubmit={handleSubmit}>
          <label style={S.label}>Email address</label>
          <input style={S.input} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          {error && <div style={S.err}>{error}</div>}
          <button style={S.btn} disabled={loading}>{loading ? 'Sending code...' : 'Continue →'}</button>
        </form>
        <div style={S.switch}>Already have an account? <Link href="/login" style={S.link}>Log in</Link></div>
      </div>
    </div>
  )
}
