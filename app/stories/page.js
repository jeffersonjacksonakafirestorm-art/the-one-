'use client';
import { useState, useEffect } from 'react';
import ShaderBackground from '@/components/ShaderBackground';

function timeAgo(date) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Stories() {
  const [stories, setStories]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [user, setUser]           = useState(null);
  const [form, setForm]           = useState({ title: '', content: '' });
  const [posting, setPosting]     = useState(false);
  const [postErr, setPostErr]     = useState('');
  const [flagged, setFlagged]     = useState(new Set());
  const [editing, setEditing]     = useState(null); // story id being edited
  const [editForm, setEditForm]   = useState({ title: '', content: '' });

  useEffect(() => {
    loadStories();
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) setUser(d.user);
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
    setPostErr('');
    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setPostErr(data.error || 'Failed to post.'); setPosting(false); return; }
      setStories(s => [data.story, ...s]);
      setForm({ title: '', content: '' });
    } catch { setPostErr('Something went wrong.'); }
    setPosting(false);
  }

  async function deleteStory(id) {
    if (!confirm('Delete this story?')) return;
    await fetch(`/api/stories/${id}`, { method: 'DELETE' });
    setStories(s => s.filter(x => x.id !== id));
  }

  async function saveEdit(id) {
    const res = await fetch(`/api/stories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      const data = await res.json();
      setStories(s => s.map(x => x.id === id ? data.story : x));
      setEditing(null);
    }
  }

  async function flagStory(id) {
    if (flagged.has(id)) return;
    setFlagged(f => new Set([...f, id]));
    await fetch(`/api/stories/${id}/flag`, { method: 'POST' });
  }

  const card = {
    background: 'rgba(20,10,0,0.65)',
    border: '1px solid rgba(251,146,60,0.15)',
    borderRadius: 16,
    padding: '22px 24px',
    backdropFilter: 'blur(12px)',
  };

  return (
    <>
      <style>{`
        .story-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(251,146,60,0.15); border-radius:10px; padding:11px 14px; color:#fff; font-size:14px; font-family:inherit; outline:none; box-sizing:border-box; margin-bottom:10px; line-height:1.6; }
        .story-input:focus { border-color:rgba(249,115,22,0.5); }
        textarea.story-input { resize:none; min-height:100px; }
        .story-btn { background:linear-gradient(135deg,#f97316,#fbbf24); color:#000; border:none; border-radius:8px; padding:10px 20px; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; transition:opacity 0.18s; }
        .story-btn:disabled { opacity:0.5; }
        .ghost-btn { background:none; border:1px solid rgba(251,146,60,0.2); border-radius:8px; padding:8px 14px; font-size:13px; color:rgba(255,255,255,0.4); cursor:pointer; font-family:inherit; }
        .ghost-btn:hover { border-color:rgba(251,146,60,0.4); color:rgba(255,255,255,0.7); }
        .danger-btn { background:none; border:none; font-size:12px; color:rgba(239,68,68,0.5); cursor:pointer; font-family:inherit; padding:0; }
        .danger-btn:hover { color:#f87171; }
      `}</style>

      <ShaderBackground />

      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif" }}>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px' }}>
          <a href="/" style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' }}>Actionable</a>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user ? (
              <a href="/chat" style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', borderRadius: 999, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Open Coach →</a>
            ) : (
              <>
                <a href="/login" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', border: '1px solid rgba(251,146,60,0.2)', borderRadius: 999, padding: '7px 14px' }}>Sign in</a>
                <a href="/signup" style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', borderRadius: 999, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get started</a>
              </>
            )}
          </div>
        </nav>

        {/* Hero */}
        <div style={{ padding: '48px 24px 36px', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px,6vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 12px' }}>Real stories.<br />Real people.</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>People who were in rough spots and built their way out.</p>
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 80px' }}>

          {/* Post form */}
          {user ? (
            <div style={{ ...card, marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#fff' }}>Share your story</div>
              {postErr && <div style={{ fontSize: 13, color: '#f87171', marginBottom: 12 }}>{postErr}</div>}
              <form onSubmit={postStory}>
                <input className="story-input" placeholder="Title — e.g. 'From broke to $4k/month in 8 months'" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required maxLength={120} />
                <textarea className="story-input" placeholder="Tell your story. Where you were, what you did, where you are now. Be real." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required maxLength={2000} />
                <button type="submit" className="story-btn" disabled={posting}>{posting ? 'Posting...' : 'Post story →'}</button>
              </form>
            </div>
          ) : (
            <div style={{ ...card, marginBottom: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Have a breakthrough to share?</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Sign in or create a free account to post your story.</div>
              <a href="/login" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Sign in to post →</a>
            </div>
          )}

          {/* Stories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loading && <div style={{ textAlign: 'center', padding: 48, color: 'rgba(255,255,255,0.3)' }}>Loading...</div>}
            {!loading && stories.length === 0 && (
              <div style={{ textAlign: 'center', padding: 48, color: 'rgba(255,255,255,0.3)' }}>No stories yet — be the first to share yours.</div>
            )}
            {stories.map(story => (
              <div key={story.id} style={card}>
                {editing === story.id ? (
                  <>
                    <input className="story-input" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} />
                    <textarea className="story-input" value={editForm.content} onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="story-btn" onClick={() => saveEdit(story.id)}>Save</button>
                      <button className="ghost-btn" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#fff' }}>{story.title}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 14, whiteSpace: 'pre-wrap' }}>{story.content}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'rgba(255,255,255,0.2)' }}>{timeAgo(story.created_at)}</span>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        {user?.id === story.user_id && (
                          <>
                            <button className="ghost-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => { setEditing(story.id); setEditForm({ title: story.title, content: story.content }); }}>Edit</button>
                            <button className="danger-btn" onClick={() => deleteStory(story.id)}>Delete</button>
                          </>
                        )}
                        {(!user || user.id !== story.user_id) && (
                          <button style={{ background: 'none', border: 'none', fontSize: 12, color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }} onClick={() => flagStory(story.id)}>
                            {flagged.has(story.id) ? 'Reported' : 'Report'}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
