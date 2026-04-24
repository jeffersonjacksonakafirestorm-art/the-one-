'use client';
import { useState } from 'react';
import Link from 'next/link';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

const NAV_ITEMS = [
  { icon: '⌂', label: 'Home' },
  { icon: '⚡', label: 'My Agents' },
  { icon: '⚙', label: 'Tools' },
  { icon: '◎', label: 'Community' },
  { icon: '✦', label: 'Learn' },
  { icon: '○', label: 'Settings' },
]

export default function HomePage() {
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    sessionStorage.setItem('pendingSearch', query.trim())
    window.location.href = '/signup'
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 640px) {
          .sidebar-preview { display: none !important; }
          .main-content { padding: 40px 20px !important; }
          .hero-title { font-size: 38px !important; }
        }
        input::placeholder { color: rgba(0,0,0,0.28); }
      `}</style>

      <div style={{ display: 'flex', height: '100dvh', background: '#fff', fontFamily: INT, overflow: 'hidden' }}>

        {/* Sidebar — locked preview */}
        <div className="sidebar-preview" style={{
          width: 220, minWidth: 220, background: '#fafafa',
          borderRight: '1px solid rgba(0,0,0,0.07)',
          display: 'flex', flexDirection: 'column',
          padding: '24px 0', flexShrink: 0,
        }}>
          {/* Brand */}
          <div style={{ padding: '0 20px 32px', fontFamily: GRK, fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: '#0a0a0a' }}>
            No Collar
          </div>

          {/* Locked nav items */}
          <div style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_ITEMS.map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 12px', borderRadius: 9,
                opacity: 0.35, cursor: 'default',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>{item.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)' }}>🔒</span>
              </div>
            ))}
          </div>

          {/* Locked new chat */}
          <div style={{ padding: '16px 10px 0' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 12px', borderRadius: 9,
              opacity: 0.35, cursor: 'default',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 15 }}>🎬</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>New Chat</span>
              </div>
              <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)' }}>🔒</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="main-content" style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '60px 40px', overflowY: 'auto',
        }}>
          <div style={{ width: '100%', maxWidth: 600 }}>

            {/* Top nav */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              padding: '18px 28px', display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <Link href="/login" style={{
                padding: '8px 16px', borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.12)', background: 'transparent',
                color: '#0a0a0a', fontSize: 13, fontWeight: 600,
                textDecoration: 'none', fontFamily: INT,
              }}>Log in</Link>
              <Link href="/signup" style={{
                padding: '8px 16px', borderRadius: 8,
                background: '#0a0a0a', color: '#fff', border: 'none',
                fontSize: 13, fontWeight: 700, textDecoration: 'none', fontFamily: INT,
              }}>Sign up free</Link>
            </div>

            {/* Hero text */}
            <div style={{ marginBottom: 40, textAlign: 'center' }}>
              <div style={{
                display: 'inline-block', background: '#0a0a0a', color: '#fff',
                borderRadius: 100, padding: '5px 14px',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: 24,
              }}>
                AI Employees · No Collar
              </div>
              <h1 className="hero-title" style={{
                fontSize: 52, fontWeight: 700, letterSpacing: '-0.04em',
                lineHeight: 1.05, margin: '0 0 16px',
                fontFamily: GRK, color: '#0a0a0a',
              }}>
                What's your situation?
              </h1>
              <p style={{
                fontSize: 16, color: 'rgba(0,0,0,0.48)', lineHeight: 1.65,
                margin: 0, fontFamily: INT,
              }}>
                Type it in plain English. We'll tell you exactly which AI agents can run in the background and handle it for you.
              </p>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch}>
              <div style={{
                background: '#fafafa', border: '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 16, padding: '16px 20px',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <textarea
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    color: '#0a0a0a', fontSize: 16, fontFamily: INT,
                    resize: 'none', width: '100%', minHeight: 80,
                    lineHeight: 1.6,
                  }}
                  placeholder="e.g. I work a 9-5 and keep missing calls from potential clients. I do follow-ups manually every evening and it's killing my time..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" style={{
                    background: '#0a0a0a', color: '#fff', border: 'none',
                    borderRadius: 10, padding: '11px 22px',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: INT,
                  }}>
                    Find my agents →
                  </button>
                </div>
              </div>
            </form>

            {/* Sign up nudge */}
            <p style={{
              textAlign: 'center', fontSize: 13, color: 'rgba(0,0,0,0.35)',
              marginTop: 16, fontFamily: INT,
            }}>
              3 days free · then $99/mo · cancel anytime
            </p>

            {/* What's locked preview — small hint text */}
            <div style={{
              marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
            }}>
              {['My Agents', 'Tools', 'Community', 'Learn'].map(label => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 12, color: 'rgba(0,0,0,0.32)', fontWeight: 600,
                }}>
                  <span style={{ fontSize: 9 }}>🔒</span>
                  {label}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
