'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

export default function CommunityPage() {
  const [posts, setPosts] = useState([])
  const [draft, setDraft] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    try {
      const res = await fetch('/api/stories')
      if (res.ok) {
        const data = await res.json()
        if (data.stories) setPosts(data.stories)
      }
    } catch {}
  }

  async function submitPost(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setPosting(true)
    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: draft.trim() }),
      })
      if (res.ok) {
        setDraft('')
        loadPosts()
      }
    } catch {}
    setPosting(false)
  }

  function timeAgo(ts) {
    const diff = Date.now() - new Date(ts).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 1) return 'just now'
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  return (
    <>
      <style>{`* { box-sizing: border-box; } textarea::placeholder{color:rgba(0,0,0,0.28);} @media(max-width:640px){.page-wrap{flex-direction:column!important}.content-area{padding:20px!important}}`}</style>
      <div className="page-wrap" style={{ display: 'flex', height: '100dvh', background: '#fff', fontFamily: INT }}>
        <Sidebar />

        <div className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
                Community
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: GRK, letterSpacing: '-0.03em' }}>
                What's working for people
              </div>
            </div>

            {/* Post box */}
            <form onSubmit={submitPost} style={{ marginBottom: 32 }}>
              <div style={{
                background: '#fafafa', border: '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 16, padding: '16px 20px',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <textarea
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    color: '#0a0a0a', fontSize: 15, fontFamily: INT,
                    resize: 'none', width: '100%', minHeight: 72, lineHeight: 1.6,
                  }}
                  placeholder="Share what's working, what you've learned, or what you're building..."
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  maxLength={500}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.28)' }}>{draft.length}/500</span>
                  <button type="submit" disabled={posting || !draft.trim()} style={{
                    background: '#0a0a0a', color: '#fff', border: 'none',
                    borderRadius: 10, padding: '9px 18px', fontSize: 13,
                    fontWeight: 700, cursor: posting ? 'default' : 'pointer', fontFamily: INT,
                  }}>
                    {posting ? 'Posting...' : 'Share'}
                  </button>
                </div>
              </div>
            </form>

            {/* Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {posts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(0,0,0,0.3)', fontSize: 14 }}>
                  Be the first to share something.
                </div>
              )}
              {posts.map(post => (
                <div key={post.id} style={{
                  background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 14, padding: '18px 22px',
                }}>
                  <div style={{ fontSize: 15, lineHeight: 1.65, color: '#0a0a0a', whiteSpace: 'pre-wrap', marginBottom: 10 }}>
                    {post.content}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.32)' }}>
                    {timeAgo(post.created_at)}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
