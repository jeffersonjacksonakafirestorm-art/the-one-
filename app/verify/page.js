'use client';
import { useState, useEffect, useRef } from 'react';

const S = {
  page: { minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter Tight', system-ui, sans-serif" },
  box: { width: '100%', maxWidth: 400 },
  logo: { fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 40, textAlign: 'center' },
  title: { fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 15, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 36, lineHeight: 1.5 },
  codeRow: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 },
  codeInput: { width: 48, height: 60, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, color: '#fff', fontSize: 28, fontWeight: 800, textAlign: 'center', outline: 'none', fontFamily: 'inherit', caretColor: 'transparent' },
  codeInputFocus: { border: '1px solid rgba(255,255,255,0.5)' },
  btn: { width: '100%', background: '#fff', color: '#000', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer' },
  btnDisabled: { width: '100%', background: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'not-allowed' },
  resend: { textAlign: 'center', marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.4)' },
  resendBtn: { background: 'none', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' },
  err: { background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.3)', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#ff6060', marginBottom: 16, textAlign: 'center' },
}

export default function VerifyPage() {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [focusIdx, setFocusIdx] = useState(0)
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

  useEffect(() => {
    const e = sessionStorage.getItem('pendingEmail')
    if (!e) window.location.href = '/signup'
    else setEmail(e)
    refs[0].current?.focus()
  }, [])

  function handleKey(i, e) {
    if (e.key === 'Backspace') {
      const next = [...digits]
      next[i] = ''
      setDigits(next)
      if (i > 0) { refs[i - 1].current.focus(); setFocusIdx(i - 1) }
      return
    }
    if (!/^\d$/.test(e.key)) return
    const next = [...digits]
    next[i] = e.key
    setDigits(next)
    if (i < 5) { refs[i + 1].current.focus(); setFocusIdx(i + 1) }
    else submit(next.join(''))
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length !== 6) return
    const next = text.split('')
    setDigits(next)
    refs[5].current.focus()
    setFocusIdx(5)
    submit(text)
  }

  async function submit(code) {
    setError('')
    setLoading(true)
    const isTrial = sessionStorage.getItem('trialMode') === 'true'
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Invalid code'); setLoading(false); setDigits(['', '', '', '', '', '']); refs[0].current?.focus(); return }
      sessionStorage.removeItem('pendingEmail')
      sessionStorage.removeItem('trialMode')
      if (data.redirect) window.location.href = data.redirect
      else if (isTrial) window.location.href = '/chat?trial=1'
      else if (data.isNew) window.location.href = '/onboarding'
      else window.location.href = '/chat'
    } catch {
      setError('Network error. Try again.')
      setLoading(false)
    }
  }

  async function resend() {
    await fetch('/api/auth/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
    setError('')
    setDigits(['', '', '', '', '', ''])
    refs[0].current?.focus()
  }

  const code = digits.join('')

  return (
    <div style={S.page}>
      <div style={S.box}>
        <div style={S.logo}>Actionable AI</div>
        <h1 style={S.title}>Check your email</h1>
        <p style={S.sub}>We sent a 6-digit code to<br /><strong style={{ color: '#fff' }}>{email}</strong></p>
        {error && <div style={S.err}>{error}</div>}
        <div style={S.codeRow} onPaste={handlePaste}>
          {refs.map((ref, i) => (
            <input
              key={i}
              ref={ref}
              style={{ ...S.codeInput, ...(focusIdx === i ? S.codeInputFocus : {}) }}
              maxLength={1}
              inputMode="numeric"
              value={digits[i]}
              onKeyDown={e => handleKey(i, e)}
              onFocus={() => setFocusIdx(i)}
              onChange={() => {}}
            />
          ))}
        </div>
        <button
          style={code.length === 6 && !loading ? S.btn : S.btnDisabled}
          disabled={code.length !== 6 || loading}
          onClick={() => submit(code)}
        >
          {loading ? 'Verifying...' : 'Verify code →'}
        </button>
        <div style={S.resend}>
          Didn't get it? <button style={S.resendBtn} onClick={resend}>Resend code</button>
        </div>
      </div>
    </div>
  )
}
