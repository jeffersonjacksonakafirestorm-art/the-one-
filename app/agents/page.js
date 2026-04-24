'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

export default function AgentsPage() {
  const [agents, setAgents] = useState([])

  useEffect(() => {
    // In the full build this fetches from Supabase
    // For now reads from localStorage as prototype state
    try {
      const saved = localStorage.getItem('deployedAgents')
      if (saved) setAgents(JSON.parse(saved))
    } catch {}
  }, [])

  function toggleAgent(id) {
    setAgents(prev => {
      const updated = prev.map(a => a.id === id
        ? { ...a, status: a.status === 'running' ? 'paused' : 'running' }
        : a
      )
      localStorage.setItem('deployedAgents', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <>
      <style>{`* { box-sizing: border-box; } @media(max-width:640px){.page-wrap{flex-direction:column!important}.content-area{padding:20px!important}}`}</style>
      <div className="page-wrap" style={{ display: 'flex', height: '100dvh', background: '#fff', fontFamily: INT }}>
        <Sidebar />

        <div className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
                My Agents
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: GRK, letterSpacing: '-0.03em', color: '#0a0a0a' }}>
                Your deployed agents
              </div>
            </div>

            {agents.length === 0 ? (
              <div style={{
                background: '#fafafa', border: '1.5px dashed rgba(0,0,0,0.12)',
                borderRadius: 20, padding: '60px 40px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>⚡</div>
                <div style={{ fontSize: 17, fontWeight: 700, fontFamily: GRK, marginBottom: 8 }}>No agents deployed yet</div>
                <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', marginBottom: 24, lineHeight: 1.6 }}>
                  Go to Home, describe your situation, and deploy your first agent.
                </div>
                <Link href="/home" style={{
                  display: 'inline-block', background: '#0a0a0a', color: '#fff',
                  borderRadius: 10, padding: '11px 22px', fontSize: 14,
                  fontWeight: 700, textDecoration: 'none', fontFamily: INT,
                }}>
                  Find an agent →
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {agents.map(agent => (
                  <div key={agent.id} style={{
                    background: '#fff', border: '1.5px solid rgba(0,0,0,0.09)',
                    borderRadius: 18, padding: '22px 26px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                  }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 13,
                        background: '#0a0a0a', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                      }}>{agent.icon || '⚡'}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, fontFamily: GRK, marginBottom: 2 }}>{agent.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: agent.status === 'running' ? '#16a34a' : 'rgba(0,0,0,0.4)', fontWeight: 600 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: agent.status === 'running' ? '#22c55e' : 'rgba(0,0,0,0.2)', display: 'inline-block' }} />
                          {agent.status === 'running' ? 'Running in background' : 'Paused'}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => toggleAgent(agent.id)} style={{
                        background: 'transparent', color: 'rgba(0,0,0,0.55)',
                        border: '1px solid rgba(0,0,0,0.12)', borderRadius: 9,
                        padding: '8px 14px', fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', fontFamily: INT,
                      }}>
                        {agent.status === 'running' ? 'Pause' : 'Resume'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
