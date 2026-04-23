'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const S = {
  app: { display: 'flex', flexDirection: 'column', height: '100dvh', background: '#000', fontFamily: "'Inter Tight', system-ui, sans-serif", maxWidth: 800, margin: '0 auto', position: 'relative' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 },
  logo: { fontSize: 16, fontWeight: 900, letterSpacing: '-0.02em' },
  headerRight: { display: 'flex', gap: 8, alignItems: 'center' },
  iconBtn: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  trialBanner: { background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
  trialText: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  trialBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  msgs: { flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 },
  msgUser: { alignSelf: 'flex-end', background: '#fff', color: '#000', borderRadius: '16px 16px 4px 16px', padding: '12px 16px', maxWidth: '80%', fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-wrap' },
  msgAI: { alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', maxWidth: '88%', fontSize: 15, lineHeight: 1.6, whiteSpace: 'pre-wrap' },
  msgImg: { maxWidth: 220, borderRadius: 10, marginBottom: 8, display: 'block' },
  typing: { alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)', borderRadius: '4px 16px 16px 16px', padding: '14px 18px', display: 'flex', gap: 5 },
  dot: { width: 6, height: 6, background: 'rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'pulse 1.2s ease-in-out infinite' },
  inputArea: { borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-end', flexShrink: 0 },
  textareaWrap: { flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 },
  textarea: { background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 15, fontFamily: 'inherit', resize: 'none', width: '100%', minHeight: 24, maxHeight: 120, lineHeight: 1.5 },
  attachRow: { display: 'flex', gap: 8, alignItems: 'center' },
  attachBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 },
  previewImg: { width: 40, height: 40, borderRadius: 6, objectFit: 'cover' },
  sendBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 12, width: 44, height: 44, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 },
  sendBtnDisabled: { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 12, width: 44, height: 44, cursor: 'not-allowed', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  empty: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' },
  emptyTitle: { fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 },
  emptySub: { fontSize: 14, color: 'rgba(255,255,255,0.45)', maxWidth: 320, lineHeight: 1.6, marginBottom: 28 },
  starters: { display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 400 },
  starter: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' },
}

const STARTERS = [
  "I make $3,200/month and have $8,000 in credit card debt. Where do I start?",
  "I want to save my first $10,000 but I'm living paycheck to paycheck. Help.",
  "I just got a raise to $55k. How should I use the extra income?",
  "I'm 25 with $40k in student loans. What's the smartest payoff strategy?",
]

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTrial, setIsTrial] = useState(false)
  const [trialUsed, setTrialUsed] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const bottomRef = useRef()
  const fileRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('trial') === '1') setIsTrial(true)
    loadHistory()
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function loadHistory() {
    try {
      const res = await fetch('/api/chat?history=1')
      if (res.ok) {
        const data = await res.json()
        if (data.messages) setMessages(data.messages)
      }
    } catch {}
  }

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  function removeImage() { setImageFile(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = '' }

  async function send(text) {
    const msg = text || input.trim()
    if (!msg && !imageFile) return
    if (isTrial && trialUsed) { window.location.href = '/subscribe'; return }

    const userMsg = { role: 'user', content: msg, imagePreview }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    removeImage()
    setLoading(true)

    let imageBase64 = null
    let imageMimeType = null
    if (imageFile) {
      const buf = await imageFile.arrayBuffer()
      imageBase64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
      imageMimeType = imageFile.type
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: msg }],
          imageBase64,
          imageMimeType,
          isTrial,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        if (err.upgrade) { window.location.href = '/subscribe'; return }
        setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
        setLoading(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let aiText = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.text) {
                aiText += data.text
                setMessages(prev => {
                  const next = [...prev]
                  next[next.length - 1] = { role: 'assistant', content: aiText }
                  return next
                })
              }
            } catch {}
          }
        }
      }

      if (isTrial) setTrialUsed(true)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }])
    }
    setLoading(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const canSend = (input.trim() || imageFile) && !loading
  const showEmpty = messages.length === 0 && !loading

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        .dot1{animation-delay:0s} .dot2{animation-delay:0.2s} .dot3{animation-delay:0.4s}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
      `}</style>
      <div style={S.app}>
        <div style={S.header}>
          <div style={S.logo}>Actionable AI</div>
          <div style={S.headerRight}>
            <Link href="/dashboard" style={S.iconBtn}>Dashboard</Link>
            <Link href="/stories" style={S.iconBtn}>Community</Link>
          </div>
        </div>

        {isTrial && !trialUsed && (
          <div style={S.trialBanner}>
            <div style={S.trialText}>Free trial — 1 message remaining. Subscribe to unlock unlimited.</div>
            <Link href="/subscribe" style={S.trialBtn}>Subscribe $15/mo</Link>
          </div>
        )}

        {showEmpty ? (
          <div style={S.empty}>
            <div style={S.emptyTitle}>What's your situation?</div>
            <p style={S.emptySub}>Tell me your income, debt, and goal — and I'll build you a real plan. Not generic advice.</p>
            <div style={S.starters}>
              {STARTERS.map(s => (
                <button key={s} style={S.starter} onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          </div>
        ) : (
          <div style={S.msgs}>
            {messages.map((m, i) => (
              <div key={i} style={m.role === 'user' ? S.msgUser : S.msgAI}>
                {m.imagePreview && <img src={m.imagePreview} style={S.msgImg} alt="" />}
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={S.typing}>
                <div style={{ ...S.dot, animationDelay: '0s' }} className="dot1" />
                <div style={{ ...S.dot, animationDelay: '0.2s' }} className="dot2" />
                <div style={{ ...S.dot, animationDelay: '0.4s' }} className="dot3" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        <div style={S.inputArea}>
          <div style={S.textareaWrap}>
            {imagePreview && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src={imagePreview} style={S.previewImg} alt="" />
                <button style={{ ...S.attachBtn, fontSize: 14 }} onClick={removeImage}>✕</button>
              </div>
            )}
            <textarea
              ref={textRef}
              style={S.textarea}
              placeholder="Type your situation..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <div style={S.attachRow}>
              <button style={S.attachBtn} onClick={() => fileRef.current?.click()} title="Attach image">📷</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
            </div>
          </div>
          <button style={canSend ? S.sendBtn : S.sendBtnDisabled} onClick={() => send()} disabled={!canSend}>↑</button>
        </div>
      </div>
    </>
  )
}
