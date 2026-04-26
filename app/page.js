'use client';
import { useState } from 'react';

const BLOBS = [
  { id: 1,  w: 110, h: 90,  left: 6,  dur: 14, delay: 0  },
  { id: 2,  w: 70,  h: 80,  left: 15, dur: 19, delay: 4  },
  { id: 3,  w: 190, h: 160, left: 26, dur: 23, delay: 8  },
  { id: 4,  w: 55,  h: 65,  left: 38, dur: 16, delay: 1  },
  { id: 5,  w: 130, h: 115, left: 48, dur: 21, delay: 6  },
  { id: 6,  w: 95,  h: 105, left: 58, dur: 13, delay: 11 },
  { id: 7,  w: 210, h: 185, left: 68, dur: 26, delay: 3  },
  { id: 8,  w: 65,  h: 75,  left: 78, dur: 17, delay: 7  },
  { id: 9,  w: 85,  h: 95,  left: 88, dur: 20, delay: 13 },
  { id: 10, w: 45,  h: 50,  left: 43, dur: 15, delay: 9  },
  { id: 11, w: 100, h: 90,  left: 20, dur: 22, delay: 16 },
  { id: 12, w: 155, h: 135, left: 72, dur: 25, delay: 5  },
  { id: 13, w: 75,  h: 85,  left: 33, dur: 18, delay: 12 },
  { id: 14, w: 120, h: 100, left: 52, dur: 24, delay: 2  },
];

const FEATURES = [
  { icon: '⚡', title: 'Personalized to your situation', desc: 'Tell Actionable your income, debt, goals, and constraints. Get a plan built only for you — not generic advice.' },
  { icon: '📸', title: 'Photo & document analysis', desc: 'Upload your pay stub, bank statement, or business idea. Actionable reads it and coaches based on the real numbers.' },
  { icon: '🎙', title: 'Voice input', desc: 'Talk through your situation. Actionable listens, responds, and guides you — no typing required.' },
  { icon: '📈', title: 'Progress tracking', desc: 'Milestone checklists and streak tracking keep you accountable and show you exactly how far you\'ve come.' },
  { icon: '💬', title: 'Full chat history', desc: 'Every conversation saved. Pick up where you left off across sessions, weeks, and months.' },
  { icon: '🤝', title: 'Community stories', desc: 'Read real stories from people who broke out. Post yours when you make it.' },
];

function detailHint(len) {
  if (len === 0)   return { text: '', color: 'transparent' };
  if (len < 80)    return { text: 'Keep going — add your income, debts, goals', color: '#444' };
  if (len < 250)   return { text: 'Good start — include what you\'ve tried', color: '#555' };
  if (len < 500)   return { text: 'Getting detailed — add your timeline', color: '#666' };
  if (len < 800)   return { text: 'Strong detail — include your biggest obstacle', color: '#888' };
  return           { text: '✓ Excellent detail — this will get a real plan', color: '#4ade80' };
}

export default function Landing() {
  const [scenario, setScenario]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [response, setResponse]   = useState('');
  const [trialUsed, setTrialUsed] = useState(false);

  async function runFreeTrial() {
    if (!scenario.trim() || loading || trialUsed || scenario.length < 50) return;
    setLoading(true);
    try {
      const res = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenario.trim() }),
      });
      const data = await res.json();
      setResponse(data.error ? 'Something went wrong. Please try again.' : data.response);
      if (!data.error) {
        setTrialUsed(true);
        if (typeof localStorage !== 'undefined') localStorage.setItem('actionable_trial_used', '1');
      }
    } catch {
      setResponse('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  const hint    = detailHint(scenario.length);
  const canSend = scenario.trim().length >= 50 && !loading && !trialUsed;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700;900&display=swap');

        @keyframes blobRise {
          0%   { transform: translateY(0px) rotate(0deg);   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 0.7; }
          100% { transform: translateY(-115vh) rotate(180deg); opacity: 0; }
        }
        @keyframes blobMorph {
          0%   { border-radius: 62% 38% 34% 66% / 58% 32% 68% 42%; }
          20%  { border-radius: 40% 60% 55% 45% / 48% 62% 38% 52%; }
          40%  { border-radius: 55% 45% 38% 62% / 62% 44% 56% 38%; }
          60%  { border-radius: 38% 62% 62% 38% / 42% 56% 44% 58%; }
          80%  { border-radius: 60% 40% 44% 56% / 55% 38% 62% 45%; }
          100% { border-radius: 62% 38% 34% 66% / 58% 32% 68% 42%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .blob {
          position: absolute;
          bottom: -220px;
          background: radial-gradient(ellipse at 35% 35%,
            rgba(60, 110, 255, 0.55),
            rgba(30, 60, 200, 0.30) 55%,
            rgba(10, 20, 100, 0.10)
          );
          filter: blur(8px);
          animation:
            blobRise  var(--dur) var(--delay) infinite linear,
            blobMorph calc(var(--dur) * 0.65) var(--delay) infinite ease-in-out;
          will-change: transform, border-radius;
        }
        .response-in {
          animation: fadeUp 0.45s ease forwards;
        }
        .send-btn {
          transition: background 0.18s, color 0.18s, transform 0.1s;
        }
        .send-btn:active { transform: scale(0.97); }
        .dot-pulse {
          animation: pulse 1.2s ease-in-out infinite;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#070710', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif", position: 'relative' }}>

        {/* ── Blob layer (fixed, behind everything) ── */}
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          {BLOBS.map(b => (
            <div
              key={b.id}
              className="blob"
              style={{
                '--dur':   `${b.dur}s`,
                '--delay': `${b.delay}s`,
                left:   `${b.left}%`,
                width:  b.w,
                height: b.h,
              }}
            />
          ))}
          {/* Radial vignette so blobs don't overpower the center */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #07071088 70%, #07071022 100%)' }} />
        </div>

        {/* ── Content (above blobs) ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Nav */}
          <nav style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'sticky', top: 0, zIndex: 50,
            background: 'rgba(7,7,16,0.75)',
            backdropFilter: 'blur(24px)',
          }}>
            <a href="/" style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' }}>Actionable</a>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <a href="/stories" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Stories</a>
              <a href="/login"   style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Sign in</a>
              <a href="/signup"  style={{ background: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', color: '#000', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get started</a>
            </div>
          </nav>

          {/* ── Hero ── */}
          <div style={{
            minHeight: 'calc(100vh - 61px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '60px 24px 80px',
            textAlign: 'center',
          }}>

            {/* One-message badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100,
              padding: '6px 16px',
              marginBottom: 32,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.03)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0, boxShadow: '0 0 6px #4ade80' }} className="dot-pulse" />
              One free message · Make it count
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(42px, 8vw, 80px)',
              fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.045em',
              margin: '0 0 18px', color: '#fff', maxWidth: 660,
            }}>
              What's your<br />situation?
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.65, margin: '0 0 44px',
              maxWidth: 440,
            }}>
              One shot. Lay it all out — income, debt, goals, what's held you back. Get a real plan built for your exact life.
            </p>

            {/* ── Chat box ── */}
            <div style={{
              width: '100%', maxWidth: 660,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 22,
              overflow: 'hidden',
              backdropFilter: 'blur(28px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset, 0 32px 64px -16px rgba(0,0,0,0.6)',
            }}>

              {/* Warning banner — only before sending */}
              {!response && (
                <div style={{
                  padding: '13px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  background: 'rgba(255,200,50,0.03)',
                }}>
                  <span style={{ fontSize: 14, marginTop: 1 }}>⚡</span>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 700 }}>You have one free message.</span>{' '}
                    The more specific you are — exact income, total debt, real goals, what you've already tried — the more useful your plan will be. Don't rush this.
                  </p>
                </div>
              )}

              {/* Input area */}
              {!trialUsed && (
                <>
                  <textarea
                    style={{
                      width: '100%', background: 'transparent', border: 'none',
                      padding: '22px 22px 12px',
                      color: '#fff', fontSize: 15, fontFamily: 'inherit',
                      resize: 'none', outline: 'none', lineHeight: 1.75,
                      boxSizing: 'border-box', minHeight: 180,
                      caretColor: '#6080ff',
                    }}
                    placeholder={"I make $X/month, have $X in debt (credit cards, student loans, car…), want to X by X. I've tried Y but Z. My biggest obstacle right now is…"}
                    value={scenario}
                    onChange={e => setScenario(e.target.value)}
                    maxLength={1500}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runFreeTrial(); }}
                  />

                  {/* Footer bar */}
                  <div style={{
                    padding: '12px 18px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <span style={{ fontSize: 12, color: hint.color, transition: 'color 0.4s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {hint.text}
                      </span>
                      <span style={{ fontSize: 11, color: '#2a2a3a', flexShrink: 0 }}>{scenario.length}/1500</span>
                    </div>
                    <button
                      className="send-btn"
                      onClick={runFreeTrial}
                      disabled={!canSend}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: canSend ? '#fff' : 'rgba(255,255,255,0.07)',
                        color: canSend ? '#000' : 'rgba(255,255,255,0.2)',
                        border: 'none', borderRadius: 11,
                        padding: '11px 22px',
                        fontSize: 13, fontWeight: 700,
                        cursor: canSend ? 'pointer' : 'default',
                        fontFamily: 'inherit', flexShrink: 0,
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="dot-pulse">●</span> Building your plan...
                        </>
                      ) : (
                        <>Send →</>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Response */}
              {response && (
                <div className="response-in">
                  <div style={{ padding: '26px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>
                      Your plan
                    </div>
                    <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.82, whiteSpace: 'pre-wrap' }}>
                      {response}
                    </div>
                  </div>
                  <div style={{
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
                    background: 'rgba(255,255,255,0.02)',
                  }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Want the full roadmap?</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
                        Unlimited sessions · Photo analysis · Progress tracking · $15/mo
                      </div>
                    </div>
                    <a href="/signup" style={{
                      background: '#fff', color: '#000', borderRadius: 11,
                      padding: '12px 24px', fontSize: 13, fontWeight: 700,
                      textDecoration: 'none', flexShrink: 0,
                    }}>
                      Start for $15/mo →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {!response && (
              <p style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.12)' }}>
                ↓ See everything included
              </p>
            )}
          </div>

          {/* ── Features ── */}
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Everything you need</div>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0, color: '#fff' }}>Built for people who move different</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16, padding: '24px',
                }}>
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Pricing ── */}
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Simple pricing</div>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 40px', color: '#fff' }}>One coach. Two plans.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {/* Basic */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '32px 28px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Basic</div>
                <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 4px' }}>$15</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>per month</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {['Unlimited AI coaching sessions','Photo & document analysis','Voice input','Full chat history','Progress roadmap','Community stories','Mobile app (PWA)'].map(f => (
                    <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8 }}>
                      <span style={{ color: '#4ade80' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="/signup?plan=basic" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>
                  Get Basic →
                </a>
              </div>

              {/* Pro */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '32px 28px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#999', marginBottom: 12 }}>Pro — Most popular</div>
                <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#000', margin: '0 0 4px' }}>$49</div>
                <div style={{ fontSize: 13, color: '#777', marginBottom: 24 }}>per month</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {['Everything in Basic','Weekly AI progress reports','Priority response speed','Downloadable financial plans','Referral program — give & get free months','Early access to new features'].map(f => (
                    <li key={f} style={{ fontSize: 14, color: '#333', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8 }}>
                      <span>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="/signup?plan=pro" style={{ display: 'block', width: '100%', background: '#000', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>
                  Get Pro →
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Actionable AI. Built for people who move different.</div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 12 }}>
              {[['Privacy','/privacy'],['Terms','/terms'],['Stories','/stories']].map(([l,h]) => (
                <a key={l} href={h} style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
