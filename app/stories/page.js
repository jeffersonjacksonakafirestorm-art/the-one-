'use client';
import { useState, useEffect } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #111', position: 'sticky', top: 0, background: '#000', zIndex: 10 },
  logo: { fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' },
  navRight: { display: 'flex', gap: 8, alignItems: 'center' },
  btn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' },
  ghostBtn: { background: 'none', border: '1px solid #222', borderRadius: 8, padding: '8px 14px', fontSize: 13, color: '#888', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' },
  hero: { padding: '60px 24px 40px', maxWidth: 760, margin: '0 auto', textAlign: 'center' },
  h1: { fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 12px' },
  sub: { fontSize: 16, color: '#666', lineHeight: 1.6 },
  content: { maxWidth: 760, margin: '0 auto', padding: '0 24px 64px' },
  postBox: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '28px', marginBottom: 32 },
  postTitle: { fontSize: 16, fontWeight: 700, marginBottom: 12 },
  input: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '11px 14px', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: 10 },
  textarea: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '11px 14px', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'none', minHeight: 100, boxSizing: 'border-box', marginBottom: 10, lineHeight: 1.6 },
  submitBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  storyGrid: { display: 'flex', flexDirection: 'column', gap: 12 },
  storyCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: '22px' },
  storyTitle: { fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#fff' },
  storyContent: { fontSize: 14, color: '#888', lineHeight: 1.7, marginBottom: 14 },
  storyMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#444' },
  flagBtn: { background: 'none', border: 'none', color: '#333', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', padding: 0 },
  loading: { textAlign: 'center', padding: '48px', color: '#555' },
  empty: { textAlign: 'center', padding: '48px', color: '#555' },
};

function timeAgo(date) {
  const d = new Date(date);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canPost, setCanPost] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const [posting, setPosting] = useState(false);
  const [flagged, setFlagged] = useState(new Set());

  useEffect(() => {
    loadStories();
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user && ['basic', 'pro'].includes(d.user.plan)) setCanPost(true);
    }).catch(() => {});
  }, []);

  async function loadStories() {
    setLoading(true);
    try {
      const res = await fetch('/api/stories');
      const data = await res.json();
      setStories(data.stories || []);
    } catch {}
    setLoading(false);
  }

  async function postStory(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setPosting(true);
    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setStories(s => [data.story, ...s]);
        setForm({ title: '', content: '' });
      }
    } catch {}
    setPosting(false);
  }

  async function flagStory(id) {
    if (flagged.has(id)) return;
    setFlagged(f => new Set([...f, id]));
    await fetch(`/api/stories/${id}/flag`, { method: 'POST' });
  }

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <a href="/" style={s.logo}>Actionable</a>
        <div style={s.navRight}>
          <a href="/chat" style={s.ghostBtn}>Open Coach</a>
          <a href="/signup" style={s.btn}>Get started</a>
        </div>
      </nav>

      <div style={s.hero}>
        <h1 style={s.h1}>Real stories.<br />Real people.</h1>
        <p style={s.sub}>People who were in rough spots — and built their way out. No fluff. No filters.</p>
      </div>

      <div style={s.content}>
        {canPost && (
          <div style={s.postBox}>
            <div style={s.postTitle}>Share your story</div>
            <form onSubmit={postStory}>
              <input style={s.input} placeholder="Title — e.g. 'How I went from $0 to $4k/month in 8 months'" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required maxLength={120} />
              <textarea style={s.textarea} placeholder="Tell your story. Where you were, what you did, where you are now. Be real — that's what helps people." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required maxLength={2000} />
              <button type="submit" style={{ ...s.submitBtn, opacity: posting ? 0.6 : 1 }} disabled={posting}>
                {posting ? 'Posting...' : 'Post story →'}
              </button>
            </form>
          </div>
        )}

        {!canPost && (
          <div style={{ ...s.postBox, textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Want to share your story?</div>
            <div style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>Subscribe to Actionable to post your breakthrough moment.</div>
            <a href="/signup" style={{ ...s.btn, display: 'inline-block' }}>Get started →</a>
          </div>
        )}

        <div style={s.storyGrid}>
          {loading && <div style={s.loading}>Loading stories...</div>}
          {!loading && stories.length === 0 && <div style={s.empty}>No stories yet — be the first to share yours.</div>}
          {stories.map(story => (
            <div key={story.id} style={s.storyCard}>
              <div style={s.storyTitle}>{story.title}</div>
              <div style={s.storyContent}>{story.content}</div>
              <div style={s.storyMeta}>
                <span>{timeAgo(story.created_at)}</span>
                <button style={s.flagBtn} onClick={() => flagStory(story.id)}>
                  {flagged.has(story.id) ? 'Reported' : '⚑ Report'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
