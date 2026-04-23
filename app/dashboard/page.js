'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const S = {
  page: { minHeight: '100vh', background: '#000', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  logo: { fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em' },
  nav: { display: 'flex', gap: 8 },
  navBtn: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  main: { maxWidth: 800, margin: '0 auto', padding: '32px 24px' },
  greeting: { fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 },
  subGreet: { fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 32 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 },
  statCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 },
  statLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 },
  statValue: { fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' },
  statSub: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 16 },
  milestones: { display: 'flex', flexDirection: 'column', gap: 10 },
  milestone: { display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', cursor: 'pointer' },
  milestoneCheck: { width: 22, height: 22, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  milestoneCheckDone: { width: 22, height: 22, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  milestoneText: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  milestoneTextDone: { fontSize: 14, color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' },
  progressBar: { background: 'rgba(255,255,255,0.08)', borderRadius: 100, height: 6, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', background: '#fff', borderRadius: 100, transition: 'width 0.5s ease' },
  referralBox: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 20 },
  referralTitle: { fontSize: 15, fontWeight: 800, marginBottom: 4 },
  referralSub: { fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16 },
  referralRow: { display: 'flex', gap: 8 },
  referralInput: { flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 13, fontFamily: 'inherit', outline: 'none' },
  copyBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' },
  planBadge: { display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)', marginBottom: 20 },
  manageBtn: { background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' },
  logoutBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 8 },
}

const DEFAULT_MILESTONES = [
  'Complete your financial profile',
  'Get your first AI coaching response',
  'Set up an emergency fund goal',
  'Create a debt payoff plan',
  'Track your first monthly budget',
  'Share your first win in the community',
  'Hit your first savings milestone',
]

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [completed, setCompleted] = useState(new Set())
  const [copied, setCopied] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const res = await fetch('/api/milestones')
      if (res.ok) {
        const d = await res.json()
        setData(d)
        setCompleted(new Set(d.completed || []))
      }
    } catch {}
  }

  async function toggleMilestone(idx) {
    const next = new Set(completed)
    if (next.has(idx)) next.delete(idx)
    else next.add(idx)
    setCompleted(next)
    await fetch('/api/milestones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: [...next] }),
    })
  }

  function copyReferral() {
    const url = data?.referralUrl || window.location.origin + '/r/' + (data?.referralCode || 'share')
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function manageBilling() {
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const d = await res.json()
    if (d.url) window.location.href = d.url
  }

  async function logout() {
    await fetch('/api/user/logout', { method: 'POST' })
    window.location.href = '/'
  }

  const pct = DEFAULT_MILESTONES.length > 0 ? Math.round((completed.size / DEFAULT_MILESTONES.length) * 100) : 0
  const referralUrl = (typeof window !== 'undefined' ? window.location.origin : '') + '/r/' + (data?.referralCode || 'loading')

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.logo}>Actionable AI</div>
        <div style={S.nav}>
          <Link href="/chat" style={S.navBtn}>Chat</Link>
          <Link href="/stories" style={S.navBtn}>Community</Link>
          <button style={S.logoutBtn} onClick={logout}>Log out</button>
        </div>
      </div>

      <div style={S.main}>
        <div style={S.planBadge}>{data?.plan ? data.plan.toUpperCase() + ' PLAN' : 'FREE TRIAL'}</div>
        <h1 style={S.greeting}>Your progress</h1>
        <p style={S.subGreet}>Keep going. Every step forward compounds.</p>

        {/* Stats */}
        <div style={S.grid}>
          <div style={S.statCard}>
            <div style={S.statLabel}>Streak</div>
            <div style={S.statValue}>{data?.streak || 0}</div>
            <div style={S.statSub}>days active</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Milestones</div>
            <div style={S.statValue}>{completed.size}</div>
            <div style={S.statSub}>of {DEFAULT_MILESTONES.length} complete</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Chats</div>
            <div style={S.statValue}>{data?.chatCount || 0}</div>
            <div style={S.statSub}>total messages</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Referrals</div>
            <div style={S.statValue}>{data?.referralCount || 0}</div>
            <div style={S.statSub}>friends joined</div>
          </div>
        </div>

        {/* Progress */}
        <div style={S.section}>
          <div style={S.sectionTitle}>Your roadmap — {pct}% complete</div>
          <div style={{ ...S.progressBar, marginBottom: 20 }}>
            <div style={{ ...S.progressFill, width: pct + '%' }} />
          </div>
          <div style={S.milestones}>
            {DEFAULT_MILESTONES.map((m, i) => (
              <div key={i} style={S.milestone} onClick={() => toggleMilestone(i)}>
                <div style={completed.has(i) ? S.milestoneCheckDone : S.milestoneCheck}>
                  {completed.has(i) && <span style={{ color: '#000', fontSize: 12, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={completed.has(i) ? S.milestoneTextDone : S.milestoneText}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Referral */}
        <div style={S.section}>
          <div style={S.sectionTitle}>Refer a friend</div>
          <div style={S.referralBox}>
            <div style={S.referralTitle}>Give 1 month free. Get 1 month free.</div>
            <div style={S.referralSub}>When your friend subscribes, you both get a free month.</div>
            <div style={S.referralRow}>
              <input style={S.referralInput} readOnly value={referralUrl} />
              <button style={S.copyBtn} onClick={copyReferral}>{copied ? 'Copied!' : 'Copy'}</button>
            </div>
          </div>
        </div>

        {/* Billing */}
        {data?.plan && (
          <div style={S.section}>
            <div style={S.sectionTitle}>Subscription</div>
            <button style={S.manageBtn} onClick={manageBilling}>Manage billing →</button>
          </div>
        )}
      </div>
    </div>
  )
}
