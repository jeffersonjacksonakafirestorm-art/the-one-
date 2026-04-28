'use client';
import { useState, useEffect, useRef } from 'react';
import ShaderBackground from '@/components/ShaderBackground';

function cleanText(t) {
  return t
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/#{1,6} /gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/__([^_\n]+)__/g, '$1')
    .replace(/_([^_\n]+)_/g, '$1');
}

function PulseAvatar({ active }) {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 32; canvas.height = 32;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, 32, 32);
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const pulse = Math.sin(t * 0.08 + i * 0.6) * 7 + 10;
        ctx.beginPath();
        ctx.moveTo(16, 16);
        ctx.lineTo(16 + Math.cos(angle) * pulse, 16 + Math.sin(angle) * pulse);
        ctx.strokeStyle = `rgba(251,146,60,${0.3 + Math.sin(t * 0.08 + i * 0.6) * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(16, 16, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#f97316';
      ctx.fill();
      t++;
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  if (!active) return (
    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(251,146,60,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#f97316', flexShrink: 0 }}>A</div>
  );
  return <canvas ref={ref} style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 8 }} />;
}

const STARTERS = [
  "I'm making $2,800/month at a job I hate. Help me plan my exit.",
  "I have $500 to invest and zero investing knowledge. Where do I start?",
  "I want to start freelancing but don't know where to begin. I'm good at design.",
  "I owe $23,000 in student loans and make $35k/year. What's the fastest way out?",
];

export default function Chat() {
  const [chats, setChats]           = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages]     = useState([]);
  const [input, setInput]           = useState('');
  const [streaming, setStreaming]   = useState(false);
  const [image, setImage]           = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [listening, setListening]   = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileRef        = useRef(null);
  const textareaRef    = useRef(null);
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
    setSidebarOpen(false);
    setActiveChatId(id);
    try {
      const res = await fetch(`/api/chats/${id}/messages`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {}
  }

  async function newChat() {
    setSidebarOpen(false);
    setActiveChatId(null);
    setMessages([]);
    setInput('');
    setImage(null);
    setImagePreview(null);
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setImage({ base64: reader.result.split(',')[1], mediaType: file.type });
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result.slice(0, 3000);
        setInput(prev => (prev ? prev + '\n\n' : '') + `[File: ${file.name}]\n${text}`);
        textareaRef.current?.focus();
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  }

  function toggleVoice() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported — try Chrome.');
      return;
    }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.continuous = false;
    r.interimResults = false;
    r.onresult = e => setInput(prev => prev + ' ' + e.results[0][0].transcript);
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
      try {
        const res = await fetch('/api/chats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: content.slice(0, 50) || 'New Chat' }),
        });
        const data = await res.json();
        chatId = data.chat.id;
        setChats(c => [data.chat, ...c]);
        setActiveChatId(chatId);
      } catch { return; }
    }

    const userMsg = { role: 'user', content, image_url: imagePreview, id: Date.now() };
    const currentMessages = messages;
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
          messages: [...currentMessages, userMsg].map(m => ({ role: m.role, content: m.content })),
          imageBase64: image?.base64 || null,
          imageMediaType: image?.mediaType || null,
        }),
      });

      if (res.status === 403) { window.location.href = '/subscribe?plan=basic'; return; }
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

      if (currentMessages.length === 0 && content) {
        const title = content.slice(0, 50);
        await fetch(`/api/chats/${chatId}/title`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });
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

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,80%,100%{transform:scale(0.8);opacity:0.5}40%{transform:scale(1);opacity:1} }
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(251,146,60,0.15);border-radius:2px}
        .chat-item:hover{background:rgba(251,146,60,0.06)!important}
        .send-btn-hover:hover:not(:disabled){transform:scale(1.05)}
        .icon-action:hover{color:rgba(251,146,60,0.8)!important}
      `}</style>

      <ShaderBackground />

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99 }} onClick={() => setSidebarOpen(false)} />
          <div style={{
            position: 'fixed', top: 0, left: 0, bottom: 0, width: 280, zIndex: 100,
            background: 'rgba(10,5,0,0.97)',
            borderRight: '1px solid rgba(251,146,60,0.15)',
            display: 'flex', flexDirection: 'column',
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{ padding: '16px 14px', borderBottom: '1px solid rgba(251,146,60,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a href="/" style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' }}>Actionable</a>
              <button onClick={newChat} style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ New</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className="chat-item"
                  onClick={() => selectChat(chat.id)}
                  style={{
                    padding: '10px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13,
                    color: chat.id === activeChatId ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontWeight: chat.id === activeChatId ? 700 : 400,
                    background: chat.id === activeChatId ? 'rgba(251,146,60,0.1)' : 'transparent',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2,
                    border: chat.id === activeChatId ? '1px solid rgba(251,146,60,0.15)' : '1px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  {chat.title || 'New Chat'}
                </div>
              ))}
              {chats.length === 0 && <div style={{ padding: 12, fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>No chats yet</div>}
            </div>
            <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(251,146,60,0.1)' }}>
              <a href="/stories" style={{ display: 'block', padding: '9px 12px', borderRadius: 8, fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', marginBottom: 2 }}>Stories</a>
              <a href="/dashboard" style={{ display: 'block', padding: '9px 12px', borderRadius: 8, fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Account</a>
            </div>
          </div>
        </>
      )}

      {/* Main */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Inter Tight', system-ui, sans-serif" }}>

        {/* Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(251,146,60,0.1)',
          display: 'flex', alignItems: 'center', gap: 16,
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(12px)',
          flexShrink: 0,
        }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 18, cursor: 'pointer', padding: 4, lineHeight: 1, flexShrink: 0 }}>☰</button>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {activeChat?.title || 'Actionable AI'}
          </span>
          <button onClick={newChat} style={{ background: 'none', border: '1px solid rgba(251,146,60,0.25)', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: 'rgba(251,146,60,0.7)', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>+ New</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {messages.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              <div style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>What's your situation?</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Be specific — the more detail, the better your plan.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 520 }}>
                {STARTERS.map(p => (
                  <button key={p} onClick={() => { setInput(p); textareaRef.current?.focus(); }} style={{
                    background: 'rgba(20,10,0,0.6)', border: '1px solid rgba(251,146,60,0.12)',
                    borderRadius: 12, padding: '12px 16px', fontSize: 14, color: 'rgba(255,255,255,0.45)',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', lineHeight: 1.5,
                    backdropFilter: 'blur(8px)', transition: 'all 0.15s',
                  }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => {
            const isUser      = msg.role === 'user';
            const isThinking  = !isUser && msg.content === '' && streaming && i === messages.length - 1;
            return (
              <div key={msg.id || i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: isUser ? 'row-reverse' : 'row' }}>
                {isUser ? (
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, color: '#000', fontWeight: 700 }}>U</div>
                ) : (
                  <PulseAvatar active={isThinking} />
                )}
                <div style={{
                  background: isUser ? '#fff' : 'rgba(20,10,0,0.65)',
                  border: isUser ? 'none' : '1px solid rgba(251,146,60,0.12)',
                  borderRadius: 16,
                  padding: '13px 17px',
                  fontSize: 15,
                  color: isUser ? '#000' : 'rgba(255,255,255,0.85)',
                  lineHeight: 1.75,
                  maxWidth: '80%',
                  whiteSpace: 'pre-wrap',
                  backdropFilter: isUser ? 'none' : 'blur(8px)',
                }}>
                  {msg.image_url && <img src={msg.image_url} alt="uploaded" style={{ maxWidth: 200, borderRadius: 10, marginBottom: 8, display: 'block' }} />}
                  {isThinking ? (
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 0' }}>
                      {[0, 0.2, 0.4].map(d => (
                        <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', animation: `pulse 1.4s ${d}s ease-in-out infinite` }} />
                      ))}
                    </div>
                  ) : isUser ? msg.content : cleanText(msg.content)}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px 16px', borderTop: '1px solid rgba(251,146,60,0.08)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
          <div style={{
            background: 'rgba(20,10,0,0.7)',
            border: '1px solid rgba(251,146,60,0.2)',
            borderRadius: 16,
            padding: '10px 14px',
            backdropFilter: 'blur(16px)',
          }}>
            {imagePreview && <img src={imagePreview} alt="preview" style={{ maxHeight: 80, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
              <textarea
                ref={textareaRef}
                style={{ flex: 1, background: 'none', border: 'none', color: '#fff', fontSize: 15, fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: 1.6, maxHeight: 150, minHeight: 24, height: 24, caretColor: '#f97316' }}
                placeholder="Describe your situation or ask anything..."
                value={input}
                onChange={e => { setInput(e.target.value); autoResize(e); }}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button className="icon-action" onClick={toggleVoice} title="Voice input" style={{ background: 'none', border: 'none', color: listening ? '#f97316' : 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: 4, fontSize: 20, display: 'flex', alignItems: 'center', flexShrink: 0, transition: 'color 0.2s' }}>🎙</button>
              <button className="icon-action" onClick={() => fileRef.current?.click()} title="Upload file" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: 4, fontSize: 20, display: 'flex', alignItems: 'center', flexShrink: 0, transition: 'color 0.2s' }}>📎</button>
              <button
                className="send-btn-hover"
                onClick={() => send()}
                disabled={(!input.trim() && !image) || streaming}
                style={{
                  background: (input.trim() || image) && !streaming ? 'linear-gradient(135deg,#f97316,#fbbf24)' : 'rgba(255,255,255,0.08)',
                  color: (input.trim() || image) && !streaming ? '#000' : 'rgba(255,255,255,0.2)',
                  border: 'none', borderRadius: 10, width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: (input.trim() || image) && !streaming ? 'pointer' : 'default',
                  fontSize: 16, flexShrink: 0, transition: 'all 0.18s',
                }}
              >↑</button>
            </div>
          </div>
        </div>

        <input ref={fileRef} type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx" style={{ display: 'none' }} onChange={handleFileSelect} />
      </div>
    </>
  );
}
