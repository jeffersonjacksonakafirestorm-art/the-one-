'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const S = {
  page: { minHeight: '100vh', background: '#000', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  logo: { fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em' },
  nav: { display: 'flex', gap: 8 },
  navBtn: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  main: { maxWidth: 680, margin: '0 auto', padding: '32px 24px' },
  title: { fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4 },
  sub: { fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 32 },
  postBox: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 20, marginBottom: 28 },
  textarea: { width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 15, fontFamily: 'inherit', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' },
  postFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' },
  charCount: { fontSize: 12, color: 'rgba(255,255,255,0.3)' },
  postBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 800, cursor: 'pointer' },
  postBtnDisabled: { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 800, cursor: 'not-allowed' },
  stories: { display: 'flex', flexDirection: 'column', gap: 16 },
  story: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 },
  storyContent: { fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', marginBottom: 14, whiteSpace: 'pre-wrap' },
  storyFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  storyMeta: { fontSize: 12, color: 'rgba(255,255,255,0.3)' },
  flagBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' },
  empty: { textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)', fontSize: 15 },
  err: { fontSize: 13, color: '#ff6060', marginTop: 8 },
}

export default function StoriesPage() {
  const [stories, setStories] = useState([])
  const [content, setContent] = useState('')
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')
  const [flagged, setFlagged] = useState(new Set())

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const res = await fetch('/api/stories')
      if (res.ok) setStories(await res.json())
    } catch {}
  }

  async function post() {
    if (!content.trim() || posting) return
    setPosting(true)
    setError('')
    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Failed to post. Please try again.')
        setPosting(false)
        return
      }
      setContent('')
      await load()
    } catch { setError('Network error. Try again.') }
    setPosting(false)
  }

  async function flag(id) {
    setFlagged(f => new Set([...f, id]))
    await fetch(`/api/stories?id=${id}&action=flag`, { method: 'PATCH' })
  }

  function timeAgo(ts) {
    const d = Date.now() - new Date(ts).getTime()
    if (d < 60000) return 'just now'
    if (d < 3600000) return `${Math.floor(d / 60000)}m ago`
    if (d < 86400000) return `${Math.floor(d / 3600000)}h ago`
    return `${Math.floor(d / 86400000)}d ago`
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.logo}>Actionable AI</div>
        <div style={S.nav}>
          <Link href="/chat" style={S.navBtn}>Chat</Link>
          <Link href="/dashboard" style={S.navBtn}>Dashboard</Link>
        </div>
      </div>
      <div style={S.main}>
        <h1 style={S.title}>Community Stories</h1>
        <p style={S.sub}>Real wins from real people. Share yours.</p>

        <div style={S.postBox}>
          <textarea
            style={S.textarea}
            rows={3}
            placeholder="Share a win, a lesson, or where you're at in your journey..."
            value={content}
            onChange={e => setContent(e.target.value.slice(0, 500))}
          />
          <div style={S.postFooter}>
            <span style={S.charCount}>{content.length}/500</span>
            <button style={content.trim() && !posting ? S.postBtn : S.postBtnDisabled} onClick={post} disabled={!content.trim() || posting}>
              {posting ? 'Posting...' : 'Share story'}
            </button>
          </div>
          {error && <div style={S.err}>{error}</div>}
        </div>

        <div style={S.stories}>
          {stories.length === 0 && <div style={S.empty}>No stories yet. Be the first to share.</div>}
          {stories.map(s => (
            <div key={s.id} style={S.story}>
              <div style={S.storyContent}>{s.content}</div>
              <div style={S.storyFooter}>
                <span style={S.storyMeta}>{timeAgo(s.created_at)}</span>
                {!flagged.has(s.id) && (
                  <button style={S.flagBtn} onClick={() => flag(s.id)}>Report</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
