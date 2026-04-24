'use client';
import { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

function parseInline(text) {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i}>{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 5px', borderRadius: 4, fontSize: 13, fontFamily: 'monospace' }}>{part.slice(1, -1)}</code>
    return part
  })
}

function renderMarkdown(text) {
  if (!text) return null
  return text.split('\n').map((line, i) => {
    if (line.startsWith('### ')) return <div key={i} style={{ fontWeight: 700, fontSize: 15, marginTop: 12, marginBottom: 3, fontFamily: GRK }}>{parseInline(line.slice(4))}</div>
    if (line.startsWith('## ')) return <div key={i} style={{ fontWeight: 700, fontSize: 16, marginTop: 16, marginBottom: 4, fontFamily: GRK }}>{parseInline(line.slice(3))}</div>
    if (line.startsWith('# ')) return <div key={i} style={{ fontWeight: 700, fontSize: 18, marginTop: 16, marginBottom: 6, fontFamily: GRK }}>{parseInline(line.slice(2))}</div>
    if (line.match(/^[-*] /)) return <div key={i} style={{ paddingLeft: 16, marginBottom: 4 }}>· {parseInline(line.slice(2))}</div>
    if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
    return <div key={i} style={{ marginBottom: 2 }}>{parseInline(line)}</div>
  })
}

export default function HomSearchPage() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deployingAgent, setDeployingAgent] = useState(null)
  const [showBriefing, setShowBriefing] = useState(false)
  const [briefingText, setBriefingText] = useState('')
  const [pendingAgent, setPendingAgent] = useState(null)
  const [deployedAgents, setDeployedAgents] = useState([])
  const responseRef = useRef()

  useEffect(() => {
    // Pick up search query stored before signup
    const saved = sessionStorage.getItem('pendingSearch')
    if (saved) {
      setQuery(saved)
      sessionStorage.removeItem('pendingSearch')
      runSearch(saved)
    }
  }, [])

  async function runSearch(text) {
    const q = text || query
    if (!q.trim()) return
    setLoading(true)
    setResponse(null)
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: q.trim() }),
      })
      if (res.ok) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let full = ''
        setResponse({ text: '', agents: [] })
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          for (const line of chunk.split('\n')) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.text) {
                  full += data.text
                  setResponse(prev => ({ ...prev, text: full }))
                }
                if (data.agents) {
                  setResponse(prev => ({ ...prev, agents: data.agents }))
                }
              } catch {}
            }
          }
        }
      }
    } catch {}
    setLoading(false)
    setTimeout(() => responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  function handleSubmit(e) {
    e.preventDefault()
    runSearch()
  }

  function startDeploy(agent) {
    setPendingAgent(agent)
    setShowBriefing(true)
  }

  function confirmDeploy() {
    if (!pendingAgent) return
    const agent = { ...pendingAgent, briefing: briefingText, deployedAt: new Date().toISOString(), status: 'running' }
    setDeployedAgents(prev => [...prev, agent])
    setShowBriefing(false)
    setBriefingText('')
    setPendingAgent(null)
    setDeployingAgent(pendingAgent.id)
    setTimeout(() => setDeployingAgent(null), 2000)
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        textarea::placeholder { color: rgba(0,0,0,0.28); }
        .search-area:focus-within { border-color: rgba(0,0,0,0.25) !important; }
        .deploy-btn:hover { background: #222 !important; }
        @media (max-width: 640px) {
          .page-wrap { flex-direction: column !important; }
          .content-area { padding: 20px !important; }
        }
      `}</style>

      <div className="page-wrap" style={{ display: 'flex', height: '100dvh', background: '#fff', fontFamily: INT }}>
        <Sidebar />

        <div className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>

            {/* Search bar */}
            <form onSubmit={handleSubmit}>
              <div className="search-area" style={{
                background: '#fafafa', border: '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 16, padding: '16px 20px',
                display: 'flex', flexDirection: 'column', gap: 12,
                marginBottom: 32, transition: 'border-color 0.15s',
              }}>
                <textarea
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    color: '#0a0a0a', fontSize: 16, fontFamily: INT,
                    resize: 'none', width: '100%', minHeight: 72, lineHeight: 1.6,
                  }}
                  placeholder="What's your situation? Type it in plain English..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); runSearch() } }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={loading || !query.trim()} style={{
                    background: loading ? 'rgba(0,0,0,0.3)' : '#0a0a0a',
                    color: '#fff', border: 'none', borderRadius: 10,
                    padding: '10px 20px', fontSize: 14, fontWeight: 700,
                    cursor: loading ? 'default' : 'pointer', fontFamily: INT,
                  }}>
                    {loading ? 'Thinking...' : 'Find my agents →'}
                  </button>
                </div>
              </div>
            </form>

            {/* Response */}
            {response && (
              <div ref={responseRef}>
                {/* AI response text */}
                {response.text && (
                  <div style={{
                    background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 16, padding: '24px 28px', marginBottom: 24,
                    fontSize: 15, lineHeight: 1.7, color: '#0a0a0a',
                  }}>
                    {renderMarkdown(response.text)}
                  </div>
                )}

                {/* Agent deploy cards — shown after response streams in */}
                {response.agents && response.agents.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {response.agents.map(agent => {
                      const alreadyDeployed = deployedAgents.some(d => d.id === agent.id)
                      return (
                        <div key={agent.id} style={{
                          background: '#fff', border: '1.5px solid rgba(0,0,0,0.09)',
                          borderRadius: 16, padding: '20px 24px',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                        }}>
                          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <div style={{
                              width: 42, height: 42, borderRadius: 12,
                              background: '#0a0a0a', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', fontSize: 20, flexShrink: 0,
                            }}>{agent.icon}</div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: GRK, marginBottom: 3 }}>{agent.name}</div>
                              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.52)', lineHeight: 1.5 }}>{agent.desc}</div>
                            </div>
                          </div>
                          {alreadyDeployed ? (
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: 6,
                              fontSize: 13, fontWeight: 600, color: '#16a34a',
                              whiteSpace: 'nowrap',
                            }}>
                              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                              Running
                            </div>
                          ) : (
                            <button
                              className="deploy-btn"
                              onClick={() => startDeploy(agent)}
                              style={{
                                background: '#0a0a0a', color: '#fff', border: 'none',
                                borderRadius: 10, padding: '10px 18px',
                                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                fontFamily: INT, whiteSpace: 'nowrap',
                                transition: 'background 0.15s',
                              }}
                            >
                              Deploy →
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Empty state */}
            {!response && !loading && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
                <div style={{ fontSize: 15, fontWeight: 600, fontFamily: GRK, color: 'rgba(0,0,0,0.4)' }}>
                  Describe your situation above
                </div>
                <div style={{ fontSize: 13, marginTop: 6, color: 'rgba(0,0,0,0.28)' }}>
                  No Collar finds the right agents and tells you exactly what to deploy
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Clone briefing modal */}
      {showBriefing && pendingAgent && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: 20,
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: 32,
            width: '100%', maxWidth: 520,
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 8 }}>
                Briefing your agent
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: GRK, marginBottom: 4 }}>
                {pendingAgent.icon} {pendingAgent.name}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                Before this agent runs autonomously, tell it how you want it to work — your tone, your limits, what it should never do, and anything specific to your situation.
              </div>
            </div>

            <textarea
              autoFocus
              style={{
                background: '#fafafa', border: '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 12, padding: '14px 16px',
                fontSize: 14, fontFamily: INT, color: '#0a0a0a',
                resize: 'none', minHeight: 120, lineHeight: 1.6, outline: 'none',
              }}
              placeholder={`e.g. Always use a friendly but professional tone. Never send more than 2 follow-ups. If someone says they're not interested, stop immediately. My business is called [name] and my booking link is [url]`}
              value={briefingText}
              onChange={e => setBriefingText(e.target.value)}
            />

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowBriefing(false); setBriefingText(''); setPendingAgent(null) }}
                style={{
                  background: 'transparent', color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: INT,
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeploy}
                style={{
                  background: '#0a0a0a', color: '#fff', border: 'none',
                  borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', fontFamily: INT,
                }}
              >
                Deploy agent →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
