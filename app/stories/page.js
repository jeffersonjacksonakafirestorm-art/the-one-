'use client';
import { useState, useEffect, useRef } from 'react';

const AVATAR_COLORS = ['#f97316','#ef4444','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ec4899'];

function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function Avatar({ name, size = 38 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: avatarColor(name || 'M'),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.42), fontWeight: 700, color: '#fff',
      flexShrink: 0, letterSpacing: '-0.02em',
    }}>
      {(name || 'M')[0].toUpperCase()}
    </div>
  );
}

function timeAgo(date) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60)    return 'just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function StoryCard({ story, currentUser, onDelete, onEdited }) {
  const [expanded,       setExpanded]       = useState(false);
  const [editing,        setEditing]        = useState(false);
  const [editForm,       setEditForm]       = useState({ title: story.title, content: story.content });
  const [liked,          setLiked]          = useState(story.user_liked);
  const [likeCount,      setLikeCount]      = useState(story.like_count);
  const [showComments,   setShowComments]   = useState(false);
  const [comments,       setComments]       = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [commentInput,   setCommentInput]   = useState('');
  const [commentCount,   setCommentCount]   = useState(story.comment_count);
  const [posting,        setPosting]        = useState(false);
  const commentRef = useRef(null);

  const isOwn = currentUser?.id === story.user_id;
  const contentLong = story.content.length > 220;

  async function toggleLike() {
    if (!currentUser) { window.location.href = '/login'; return; }
    const prev = { liked, likeCount };
    setLiked(!liked);
    setLikeCount(n => liked ? n - 1 : n + 1);
    const res = await fetch(`/api/stories/${story.id}/like`, { method: 'POST' });
    if (!res.ok) { setLiked(prev.liked); setLikeCount(prev.likeCount); }
    else { const d = await res.json(); setLikeCount(d.like_count); setLiked(d.liked); }
  }

  async function loadComments() {
    if (commentsLoaded) return;
    const res = await fetch(`/api/stories/${story.id}/comments`);
    const d = await res.json();
    setComments(d.comments || []);
    setCommentsLoaded(true);
  }

  function toggleComments() {
    if (!showComments) loadComments();
    setShowComments(v => !v);
    setTimeout(() => commentRef.current?.focus(), 100);
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!commentInput.trim() || posting) return;
    if (!currentUser) { window.location.href = '/login'; return; }
    setPosting(true);
    const res = await fetch(`/api/stories/${story.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: commentInput }),
    });
    if (res.ok) {
      const d = await res.json();
      setComments(c => [...c, d.comment]);
      setCommentCount(n => n + 1);
      setCommentInput('');
    }
    setPosting(false);
  }

  async function deleteComment(commentId) {
    await fetch(`/api/stories/${story.id}/comments/${commentId}`, { method: 'DELETE' });
    setComments(c => c.filter(x => x.id !== commentId));
    setCommentCount(n => n - 1);
  }

  async function saveEdit() {
    const res = await fetch(`/api/stories/${story.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      const d = await res.json();
      onEdited(d.story);
      setEditing(false);
    }
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 0' }}>
        <Avatar name={story.author_name} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.2 }}>
            {story.author_name}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
            {timeAgo(story.created_at)}
          </div>
        </div>
        {isOwn && !editing && (
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setEditing(true)} style={btnGhost}>Edit</button>
            <button onClick={() => onDelete(story.id)} style={btnDanger}>Delete</button>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '10px 16px 12px' }}>
        {editing ? (
          <>
            <input
              value={editForm.title}
              onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
              style={editInput}
              placeholder="Title"
            />
            <textarea
              value={editForm.content}
              onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))}
              style={{ ...editInput, minHeight: 80, resize: 'none', marginBottom: 8 }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={saveEdit} style={btnOrange}>Save</button>
              <button onClick={() => setEditing(false)} style={btnGhost}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.35 }}>
              {story.title}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {contentLong && !expanded
                ? story.content.slice(0, 220) + '…'
                : story.content}
            </div>
            {contentLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                style={{ background: 'none', border: 'none', color: '#f97316', fontSize: 13, cursor: 'pointer', padding: '4px 0 0', fontFamily: 'inherit' }}
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </>
        )}
      </div>

      {/* Footer: likes + comments */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '8px 16px 12px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <button onClick={toggleLike} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: 5,
          color: liked ? '#f97316' : 'rgba(255,255,255,0.35)',
          fontSize: 13, fontFamily: 'inherit', transition: 'color 0.15s',
        }}>
          <span style={{ fontSize: 16 }}>{liked ? '♥' : '♡'}</span>
          <span>{likeCount || ''}</span>
        </button>
        <button onClick={toggleComments} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: 5,
          color: showComments ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
          fontSize: 13, fontFamily: 'inherit', transition: 'color 0.15s',
        }}>
          <span style={{ fontSize: 15 }}>💬</span>
          <span>{commentCount > 0 ? `${commentCount} comment${commentCount !== 1 ? 's' : ''}` : 'Comment'}</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '12px 16px 14px' }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <Avatar name={c.author_name} size={28} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{c.author_name}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{timeAgo(c.created_at)}</span>
                  {currentUser?.id === c.user_id && (
                    <button onClick={() => deleteComment(c.id)} style={{ background: 'none', border: 'none', fontSize: 11, color: 'rgba(239,68,68,0.5)', cursor: 'pointer', padding: 0, fontFamily: 'inherit', marginLeft: 'auto' }}>×</button>
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, marginTop: 2 }}>{c.content}</div>
              </div>
            </div>
          ))}
          {commentsLoaded && comments.length === 0 && (
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', marginBottom: 10 }}>No comments yet — be the first.</div>
          )}
          {currentUser ? (
            <form onSubmit={submitComment} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginTop: 4 }}>
              <Avatar name={currentUser.name || currentUser.email?.split('@')[0] || 'M'} size={28} />
              <input
                ref={commentRef}
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Add a comment…"
                maxLength={500}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '7px 10px', color: '#fff', fontSize: 13,
                  fontFamily: 'inherit', outline: 'none',
                }}
              />
              <button type="submit" disabled={posting || !commentInput.trim()} style={{
                background: commentInput.trim() ? 'linear-gradient(135deg,#f97316,#fbbf24)' : 'rgba(255,255,255,0.08)',
                color: commentInput.trim() ? '#000' : 'rgba(255,255,255,0.2)',
                border: 'none', borderRadius: 8, padding: '7px 14px',
                fontSize: 13, fontWeight: 700, cursor: commentInput.trim() ? 'pointer' : 'default',
                fontFamily: 'inherit', flexShrink: 0,
              }}>Post</button>
            </form>
          ) : (
            <a href="/login" style={{ fontSize: 13, color: '#f97316', textDecoration: 'none' }}>Sign in to comment →</a>
          )}
        </div>
      )}
    </div>
  );
}

const btnOrange = {
  background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', border: 'none',
  borderRadius: 7, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
};
const btnGhost = {
  background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 7,
  padding: '5px 10px', fontSize: 12, color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontFamily: 'inherit',
};
const btnDanger = {
  background: 'none', border: 'none', fontSize: 12, color: 'rgba(239,68,68,0.5)',
  cursor: 'pointer', fontFamily: 'inherit', padding: 0,
};
const editInput = {
  width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8, padding: '8px 10px', color: '#fff', fontSize: 13,
  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: 6,
};

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user,    setUser]    = useState(null);
  const [form,    setForm]    = useState({ title: '', content: '' });
  const [posting, setPosting] = useState(false);
  const [postErr, setPostErr] = useState('');
  const [showForm,setShowForm]= useState(false);

  useEffect(() => {
    load();
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); }).catch(() => {});
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/stories');
      const d = await res.json();
      setStories(d.stories || []);
    } catch {}
    setLoading(false);
  }

  async function postStory(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setPosting(true); setPostErr('');
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const d = await res.json();
    if (!res.ok) { setPostErr(d.error || 'Failed to post.'); setPosting(false); return; }
    setStories(s => [d.story, ...s]);
    setForm({ title: '', content: '' });
    setShowForm(false);
    setPosting(false);
  }

  function deleteStory(id) {
    if (!confirm('Delete this story?')) return;
    fetch(`/api/stories/${id}`, { method: 'DELETE' });
    setStories(s => s.filter(x => x.id !== id));
  }

  function editedStory(updated) {
    setStories(s => s.map(x => x.id === updated.id ? { ...x, ...updated } : x));
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::placeholder { color: rgba(255,255,255,0.25); }
        .compose-input { width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px 12px; color:#fff; font-size:14px; font-family:inherit; outline:none; }
        .compose-input:focus { border-color:rgba(249,115,22,0.4); }
        textarea.compose-input { resize:none; min-height:90px; line-height:1.65; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#100500 0%,#0a0300 60%,#060200 100%)',
        color: '#fff',
        fontFamily: "'Inter Tight', system-ui, sans-serif",
      }}>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 10, background: 'rgba(10,3,0,0.85)', backdropFilter: 'blur(16px)' }}>
          <a href="/" style={{ fontSize: 17, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' }}>Actionable</a>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {user ? (
              <>
                {!showForm && (
                  <button onClick={() => setShowForm(true)} style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', border: 'none', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    + Share story
                  </button>
                )}
                <a href="/chat" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 14px', textDecoration: 'none' }}>Coach →</a>
              </>
            ) : (
              <>
                <a href="/login"  style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 14px' }}>Sign in</a>
                <a href="/signup" style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get started</a>
              </>
            )}
          </div>
        </nav>

        <div style={{ maxWidth: 620, margin: '0 auto', padding: '24px 16px 80px' }}>

          {/* Page title */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 4px', color: '#fff' }}>Stories</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>Real people. Real progress.</p>
          </div>

          {/* Compose form */}
          {showForm && user && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 16, padding: '16px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Avatar name={user.name || user.email?.split('@')[0] || 'M'} size={36} />
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Share your story</div>
              </div>
              {postErr && <div style={{ fontSize: 13, color: '#f87171', marginBottom: 10 }}>{postErr}</div>}
              <form onSubmit={postStory}>
                <input
                  className="compose-input"
                  placeholder="Title — e.g. 'How I went from broke to $4k/month'"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required maxLength={120}
                  style={{ marginBottom: 8 }}
                />
                <textarea
                  className="compose-input"
                  placeholder="Tell your story. Where you were, what changed, where you are now."
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  required maxLength={2000}
                  style={{ marginBottom: 10 }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="submit" disabled={posting} style={{ ...btnOrange, padding: '9px 20px', fontSize: 13 }}>
                    {posting ? 'Posting…' : 'Post story →'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} style={{ ...btnGhost, padding: '9px 14px' }}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Not logged in prompt */}
          {!user && (
            <div style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)', borderRadius: 12, padding: '14px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Have a breakthrough to share?</div>
              <a href="/signup" style={{ fontSize: 13, fontWeight: 700, color: '#f97316', textDecoration: 'none' }}>Sign up free →</a>
            </div>
          )}

          {/* Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {loading && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>Loading…</div>
            )}
            {!loading && stories.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>
                Nothing here yet.{user ? '' : ' Sign up to be the first.'}
              </div>
            )}
            {stories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                currentUser={user}
                onDelete={deleteStory}
                onEdited={editedStory}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
