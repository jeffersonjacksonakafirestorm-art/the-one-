'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const s = {
  page: { display: 'flex', height: '100vh', background: '#000', fontFamily: "'Inter Tight', system-ui, sans-serif", overflow: 'hidden' },
  sidebar: { width: 260, borderRight: '1px solid #111', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' },
  sidebarTop: { padding: '16px 12px', borderBottom: '1px solid #111' },
  logoRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  logo: { fontSize: 16, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' },
  newChatBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  chatList: { flex: 1, overflowY: 'auto', padding: '8px' },
  chatItem: { padding: '10px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 },
  chatItemActive: { padding: '10px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#fff', fontWeight: 600, background: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 },
  sidebarBottom: { padding: '12px', borderTop: '1px solid #111' },
  sidebarLink: { display: 'block', padding: '8px 12px', borderRadius: 8, fontSize: 13, color: '#555', textDecoration: 'none', marginBottom: 2 },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: { padding: '16px 24px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
  headerTitle: { fontSize: 15, fontWeight: 600, color: '#fff' },
  mobileMenuBtn: { display: 'none', background: 'none', border: 'none', color: '#888', fontSize: 20, cursor: 'pointer', padding: 0 },
  messages: { flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 },
  empty: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyTitle: { fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' },
  emptySub: { fontSize: 15, color: '#555' },
  emptyPrompts: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16, width: '100%', maxWidth: 480 },
  emptyPrompt: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#888', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' },
  msgRow: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  msgRowUser: { display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: 'row-reverse' },
  avatar: { width: 32, height: 32, borderRadius: 8, background: '#111', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 },
  avatarUser: { width: 32, height: 32, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 },
  bubble: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: '14px 18px', fontSize: 15, color: '#e0e0e0', lineHeight: 1.75, maxWidth: '80%', whiteSpace: 'pre-wrap' },
  bubbleUser: { background: '#fff', borderRadius: 16, padding: '14px 18px', fontSize: 15, color: '#000', lineHeight: 1.75, maxWidth: '80%', whiteSpace: 'pre-wrap' },
  imagePreview: { maxWidth: 200, borderRadius: 10, marginBottom: 8, display: 'block' },
  typing: { display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' },
  dot: { width: 6, height: 6, borderRadius: '50%', background: '#555', animation: 'pulse 1.4s ease-in-out infinite' },
  inputArea: { padding: '16px 24px', borderTop: '1px solid #111', flexShrink: 0 },
  inputBox: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: '12px 16px' },
  imageThumb: { maxHeight: 80, borderRadius: 8, marginBottom: 8, display: 'block' },
  inputRow: { display: 'flex', alignItems: 'flex-end', gap: 8 },
  textarea: { flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: 15, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: 1.6, maxHeight: 150, minHeight: 24 },
  iconBtn: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', fontSize: 18, display: 'flex', alignItems: 'center', flexShrink: 0 },
  sendBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, flexShrink: 0 },
  mobileSidebar: { position: 'fixed', top: 0, left: 0, bottom: 0, width: 280, background: '#000', borderRight: '1px solid #111', zIndex: 100, display: 'flex', flexDirection: 'column' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 99 },
};

const STARTER_PROMPTS = [
  "I'm making $2,800/month at a job I hate. Help me plan my exit.",
  "I have $500 to invest and zero investing knowledge. Where do I start?",
  "I want to start freelancing but don't know where to begin. I'm good at design.",
  "I owe $23,000 in student loans and make $35k/year. What's the fastest way out?",
];

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [listening, setListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => { loadChats(); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function loadChats() {
    try {
      const res = await fetch('/api/chats');
      if (res.status === 401) { window.location.href = '/login'; return; }
      const data = await res.json();
      setChats(data.chats || []);
    } catch {}
  }

  async function selectChat(id) {
    setActiveChatId(id);
    setSidebarOpen(false);
    try {
      const res = await fetch(`/api/chats/${id}/messages`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {}
  }

  async function newChat() {
    try {
      const res = await fetch('/api/chats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'New Chat' }) });
      const data = await res.json();
      setChats(c => [data.chat, ...c]);
      setActiveChatId(data.chat.id);
      setMessages([]);
      setSidebarOpen(false);
    } catch {}
  }

  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage({ base64: reader.result.split(',')[1], mediaType: file.type });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function toggleVoice() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) { alert('Voice input not supported in this browser. Try Chrome.'); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.continuous = false;
    r.interimResults = false;
    r.onresult = e => { setInput(prev => prev + ' ' + e.results[0][0].transcript); };
    r.onend = () => setListening(false);
    recognitionRef.current = r;
    r.start();
    setListening(true);
  }

  async function send(text = null) {
    const content = (text || input).trim();
    if ((!content && !image) || streaming) return;

    let chatId = activeChatId;
    if (!chatId) {
      const res = await fetch('/api/chats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: content.slice(0, 50) || 'New Chat' }) });
      const data = await res.json();
      chatId = data.chat.id;
      setChats(c => [data.chat, ...c]);
      setActiveChatId(chatId);
    }

    const userMsg = { role: 'user', content, image_url: imagePreview, id: Date.now() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setImage(null);
    setImagePreview(null);
    setStreaming(true);

    const assistantMsg = { role: 'assistant', content: '', id: Date.now() + 1 };
    setMessages(m => [...m, assistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          imageBase64: image?.base64 || null,
          imageMediaType: image?.mediaType || null,
        }),
      });

      if (!res.ok) { setStreaming(false); return; }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages(m => m.map(msg => msg.id === assistantMsg.id ? { ...msg, content: full } : msg));
      }

      const firstUserMsg = messages.length === 0;
      if (firstUserMsg && content) {
        const title = content.slice(0, 50);
        await fetch(`/api/chats/${chatId}/title`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
        setChats(c => c.map(chat => chat.id === chatId ? { ...chat, title } : chat));
      }
    } catch {}
    setStreaming(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
  }

  const SidebarContent = () => (
    <>
      <div style={s.sidebarTop}>
        <div style={s.logoRow}>
          <a href="/" style={s.logo}>Actionable</a>
          <button style={s.newChatBtn} onClick={newChat}>+ New</button>
        </div>
      </div>
      <div style={s.chatList}>
        {chats.map(chat => (
          <div
            key={chat.id}
            style={chat.id === activeChatId ? s.chatItemActive : s.chatItem}
            onClick={() => selectChat(chat.id)}
          >
            {chat.title || 'New Chat'}
          </div>
        ))}
        {chats.length === 0 && <div style={{ padding: '12px', fontSize: 13, color: '#333' }}>No chats yet</div>}
      </div>
      <div style={s.sidebarBottom}>
        <a href="/dashboard" style={s.sidebarLink}>📈 Progress</a>
        <a href="/stories" style={s.sidebarLink}>💬 Stories</a>
        <a href="/dashboard#account" style={s.sidebarLink}>⚙️ Account</a>
      </div>
    </>
  );

  return (
    <div style={s.page}>
      {/* Desktop sidebar */}
      <div style={{ ...s.sidebar, '@media(max-width:768px)': { display: 'none' } }}>
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div style={s.overlay} onClick={() => setSidebarOpen(false)} />
          <div style={s.mobileSidebar}>
            <SidebarContent />
          </div>
        </>
      )}

      {/* Main */}
      <div style={s.main}>
        <div style={s.header}>
          <button style={{ ...s.iconBtn, display: 'flex' }} onClick={() => setSidebarOpen(true)}>☰</button>
          <span style={s.headerTitle}>
            {activeChatId ? (chats.find(c => c.id === activeChatId)?.title || 'Chat') : 'Actionable AI'}
          </span>
          <button style={s.newChatBtn} onClick={newChat}>+ New chat</button>
        </div>

        <div style={s.messages}>
          {messages.length === 0 && (
            <div style={s.empty}>
              <div style={s.emptyTitle}>What's your situation?</div>
              <div style={s.emptySub}>Be specific — the more detail, the better your plan.</div>
              <div style={s.emptyPrompts}>
                {STARTER_PROMPTS.map(p => (
                  <button key={p} style={s.emptyPrompt} onClick={() => { setInput(p); textareaRef.current?.focus(); }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={msg.id || i} style={msg.role === 'user' ? s.msgRowUser : s.msgRow}>
              <div style={msg.role === 'user' ? s.avatarUser : s.avatar}>
                {msg.role === 'user' ? '👤' : '⚡'}
              </div>
              <div style={msg.role === 'user' ? s.bubbleUser : s.bubble}>
                {msg.image_url && <img src={msg.image_url} alt="uploaded" style={s.imagePreview} />}
                {msg.content === '' && streaming && i === messages.length - 1 ? (
                  <div style={s.typing}>
                    <div style={{ ...s.dot, animationDelay: '0s' }} />
                    <div style={{ ...s.dot, animationDelay: '0.2s' }} />
                    <div style={{ ...s.dot, animationDelay: '0.4s' }} />
                  </div>
                ) : msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={s.inputArea}>
          <div style={s.inputBox}>
            {imagePreview && <img src={imagePreview} alt="preview" style={s.imageThumb} />}
            <div style={s.inputRow}>
              <textarea
                ref={textareaRef}
                style={{ ...s.textarea, height: 24 }}
                placeholder="Describe your situation or ask anything..."
                value={input}
                onChange={e => { setInput(e.target.value); autoResize(e); }}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button style={{ ...s.iconBtn, color: listening ? '#fff' : '#555' }} onClick={toggleVoice} title="Voice input">
                🎙
              </button>
              <button style={s.iconBtn} onClick={() => fileRef.current?.click()} title="Upload photo">
                📎
              </button>
              <button
                style={{ ...s.sendBtn, opacity: (!input.trim() && !image) || streaming ? 0.4 : 1 }}
                onClick={() => send()}
                disabled={(!input.trim() && !image) || streaming}
              >
                ↑
              </button>
            </div>
          </div>
        </div>

        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageSelect} />
      </div>

      <style>{`
        @keyframes pulse { 0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        @media (max-width: 768px) { .desktop-sidebar { display: none !important; } }
      `}</style>
    </div>
  );
}
