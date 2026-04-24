'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

const S = {
  wrap: { display: 'flex', height: '100dvh', background: '#fafafa', fontFamily: INT, overflow: 'hidden' },

  // Sidebar
  sidebar: { width: 256, minWidth: 256, background: '#fff', borderRight: '1px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  sidebarTop: { padding: '20px 16px 12px' },
  sidebarBrand: { fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: GRK, color: '#0a0a0a', marginBottom: 16 },
  newChatBtn: { display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: INT, textAlign: 'left' },
  sidebarSection: { padding: '16px 16px 0' },
  sidebarSecLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: 8 },
  agentItem: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 9, background: 'rgba(0,0,0,0.04)', fontSize: 13, fontWeight: 600, color: '#0a0a0a', marginBottom: 4 },
  agentDot: { width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 },
  sidebarBottom: { marginTop: 'auto', padding: '16px' },
  marketLink: { display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(0,0,0,0.45)', textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '9px 12px', borderRadius: 9, border: '1px solid rgba(0,0,0,0.09)', justifyContent: 'center' },

  // Mobile header (shows instead of sidebar on small screens)
  mobileHeader: { display: 'none', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 },
  mobileLogo: { fontSize: 15, fontWeight: 700, fontFamily: GRK, color: '#0a0a0a' },
  mobileRight: { display: 'flex', gap: 8, alignItems: 'center' },
  iconBtn: { background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 8, padding: '6px 12px', color: '#0a0a0a', fontSize: 12, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', fontFamily: INT },

  // Chat area
  chatArea: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  trialBanner: { background: 'rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
  trialText: { fontSize: 13, color: 'rgba(0,0,0,0.55)', fontFamily: INT },
  trialBtn: { background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', fontFamily: INT },

  msgs: { flex: 1, overflowY: 'auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16 },
  msgUser: { alignSelf: 'flex-end', background: '#0a0a0a', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '12px 16px', maxWidth: '78%', fontSize: 15, lineHeight: 1.55, fontFamily: INT },
  msgAI: { alignSelf: 'flex-start', background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '4px 16px 16px 16px', padding: '14px 18px', maxWidth: '86%', fontSize: 15, lineHeight: 1.65, fontFamily: INT, color: '#0a0a0a' },
  msgImg: { maxWidth: 220, borderRadius: 10, marginBottom: 8, display: 'block' },
  typing: { alignSelf: 'flex-start', background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: '4px 16px 16px 16px', padding: '14px 18px', display: 'flex', gap: 5, alignItems: 'center' },
  dot: { width: 6, height: 6, background: 'rgba(0,0,0,0.25)', borderRadius: '50%', animation: 'pulse 1.2s ease-in-out infinite' },

  inputArea: { borderTop: '1px solid rgba(0,0,0,0.08)', padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-end', flexShrink: 0, background: '#fff' },
  textareaWrap: { flex: 1, background: '#fafafa', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 14, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 },
  textarea: { background: 'transparent', border: 'none', outline: 'none', color: '#0a0a0a', fontSize: 15, fontFamily: INT, resize: 'none', width: '100%', minHeight: 24, maxHeight: 120, lineHeight: 1.5 },
  attachRow: { display: 'flex', gap: 8, alignItems: 'center' },
  attachBtn: { background: 'none', border: 'none', color: 'rgba(0,0,0,0.3)', cursor: 'pointer', fontSize: 17, padding: 0, lineHeight: 1 },
  previewImg: { width: 38, height: 38, borderRadius: 6, objectFit: 'cover' },
  sendBtn: { background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 12, width: 44, height: 44, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sendBtnOff: { background: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.25)', border: 'none', borderRadius: 12, width: 44, height: 44, cursor: 'not-allowed', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },

  empty: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' },
  emptyTitle: { fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 8, fontFamily: GRK, color: '#0a0a0a' },
  emptySub: { fontSize: 14, color: 'rgba(0,0,0,0.45)', maxWidth: 320, lineHeight: 1.65, marginBottom: 28, fontFamily: INT },
  starters: { display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 420 },
  starter: { background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: 'rgba(0,0,0,0.7)', cursor: 'pointer', textAlign: 'left', fontFamily: INT },
}

const AGENT_META = {
  'revenue-manager': { icon: '💳', name: 'Revenue Manager' },
  'schedule-manager': { icon: '📅', name: 'Schedule Manager' },
  'commander': { icon: '⚡', name: 'The Commander' },
}

const STARTERS_DEFAULT = [
  "What can you help me with?",
  "Show me what's outstanding in my Stripe account.",
  "Help me draft a follow-up email to an unpaid client.",
  "What's the best way to automate my scheduling?",
]

const STARTERS_BY_AGENT = {
  'revenue-manager': [
    "What's my current Stripe balance and recent activity?",
    "Who are my top 3 unpaid invoices right now?",
    "Draft a payment reminder for clients overdue by 30 days.",
    "Give me a revenue summary for this month.",
  ],
  'schedule-manager': [
    "What does my Calendly look like this week?",
    "Block my calendar Thursday afternoon for deep work.",
    "Send a reminder to my 2pm appointment tomorrow.",
    "What meetings do I have coming up in the next 3 days?",
  ],
  'commander': [
    "What needs my attention today across all my tools?",
    "Send invoices to all unpaid clients and block my Friday morning.",
    "Give me a full status report: revenue, upcoming meetings, and overdue tasks.",
    "Draft a follow-up sequence for my last 5 Calendly no-shows.",
  ],
}

function parseInline(text) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i}>{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 5px', borderRadius: 4, fontSize: 13, fontFamily: 'monospace' }}>{part.slice(1, -1)}</code>
    return part
  })
}

function renderMarkdown(text) {
  if (!text) return null
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('### '))
      return <div key={i} style={{ fontWeight: 700, fontSize: 15, marginTop: 12, marginBottom: 3, fontFamily: GRK }}>{parseInline(line.slice(4))}</div>
    if (line.startsWith('## '))
      return <div key={i} style={{ fontWeight: 700, fontSize: 16, marginTop: 16, marginBottom: 4, fontFamily: GRK }}>{parseInline(line.slice(3))}</div>
    if (line.startsWith('# '))
      return <div key={i} style={{ fontWeight: 700, fontSize: 18, marginTop: 16, marginBottom: 6, fontFamily: GRK }}>{parseInline(line.slice(2))}</div>
    if (line.match(/^[-*] /))
      return <div key={i} style={{ paddingLeft: 16, marginBottom: 3 }}>{'· '}{parseInline(line.slice(2))}</div>
    if (line.match(/^\d+\. /))
      return <div key={i} style={{ paddingLeft: 16, marginBottom: 3 }}>{parseInline(line)}</div>
    if (line.trim() === '')
      return <div key={i} style={{ height: 6 }} />
    return <div key={i}>{parseInline(line)}</div>
  })
}

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTrial, setIsTrial] = useState(false)
  const [trialUsed, setTrialUsed] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [agentId, setAgentId] = useState(null)
  const bottomRef = useRef()
  const fileRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('trial') === '1') setIsTrial(true)
    const aid = params.get('agent')
    if (aid && AGENT_META[aid]) setAgentId(aid)
    loadHistory()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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

  function removeImage() {
    setImageFile(null)
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  function startNewChat() {
    setMessages([])
    setInput('')
    removeImage()
  }

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
          agentId,
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
        for (const line of chunk.split('\n')) {
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
  const activeAgent = agentId ? AGENT_META[agentId] : null
  const starters = agentId && STARTERS_BY_AGENT[agentId] ? STARTERS_BY_AGENT[agentId] : STARTERS_DEFAULT

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.25} 50%{opacity:0.9} }
        .dot1{animation-delay:0s} .dot2{animation-delay:0.2s} .dot3{animation-delay:0.4s}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.1);border-radius:4px}
        @media (max-width: 640px) {
          .sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
        }
        @media (min-width: 641px) {
          .mobile-header { display: none !important; }
        }
        textarea::placeholder { color: rgba(0,0,0,0.28); }
      `}</style>

      <div style={S.wrap}>

        {/* Sidebar */}
        <div style={S.sidebar} className="sidebar">
          <div style={S.sidebarTop}>
            <div style={S.sidebarBrand}>Your Actionable AI</div>
            <button style={S.newChatBtn} onClick={startNewChat}>
              <span style={{ fontSize: 16 }}>🎬</span>
              <span>New Chat</span>
            </button>
          </div>

          {activeAgent && (
            <div style={S.sidebarSection}>
              <div style={S.sidebarSecLabel}>Active Agents</div>
              <div style={S.agentItem}>
                <span style={S.agentDot} />
                <span>{activeAgent.icon} {activeAgent.name}</span>
              </div>
            </div>
          )}

          <div style={S.sidebarBottom}>
            <Link href="/market" style={S.marketLink}>
              ← Back to Market
            </Link>
          </div>
        </div>

        {/* Mobile header */}
        <div style={S.mobileHeader} className="mobile-header">
          <div style={S.mobileLogo}>Your Actionable AI</div>
          <div style={S.mobileRight}>
            <button style={{ ...S.iconBtn, cursor: 'pointer', fontFamily: INT }} onClick={startNewChat}>🎬 New Chat</button>
            <Link href="/market" style={S.iconBtn}>Market</Link>
          </div>
        </div>

        {/* Chat */}
        <div style={S.chatArea}>
          {isTrial && !trialUsed && (
            <div style={S.trialBanner}>
              <div style={S.trialText}>Free trial — 1 message remaining. Subscribe to unlock unlimited.</div>
              <Link href="/subscribe" style={S.trialBtn}>Subscribe $49/mo</Link>
            </div>
          )}

          {showEmpty ? (
            <div style={S.empty}>
              <div style={S.emptyTitle}>
                {activeAgent ? `${activeAgent.icon} ${activeAgent.name}` : 'What do you need done?'}
              </div>
              <p style={S.emptySub}>
                {activeAgent
                  ? `${activeAgent.name} is ready. Give it a task in plain English.`
                  : 'Tell me what to handle. I\'ll take it from there.'}
              </p>
              <div style={S.starters}>
                {starters.map(s => (
                  <button key={s} style={S.starter} onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : (
            <div style={S.msgs}>
              {messages.map((m, i) => (
                <div key={i} style={m.role === 'user' ? S.msgUser : S.msgAI}>
                  {m.imagePreview && <img src={m.imagePreview} style={S.msgImg} alt="" />}
                  {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
                </div>
              ))}
              {loading && (
                <div style={S.typing}>
                  <div style={S.dot} className="dot1" />
                  <div style={S.dot} className="dot2" />
                  <div style={S.dot} className="dot3" />
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
                  <button style={{ ...S.attachBtn, fontSize: 13 }} onClick={removeImage}>✕</button>
                </div>
              )}
              <textarea
                ref={textRef}
                style={S.textarea}
                placeholder="Give me a task..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <div style={S.attachRow}>
                <button style={S.attachBtn} onClick={() => fileRef.current?.click()} title="Attach image">📎</button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
              </div>
            </div>
            <button style={canSend ? S.sendBtn : S.sendBtnOff} onClick={() => send()} disabled={!canSend}>↑</button>
          </div>
        </div>

      </div>
    </>
  )
}
