'use client';
import { useState, useEffect } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif" },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #111' },
  logo: { fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' },
  navLinks: { display: 'flex', gap: 8 },
  navLink: { padding: '8px 14px', fontSize: 13, color: '#555', textDecoration: 'none', borderRadius: 8 },
  chatBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' },
  content: { maxWidth: 900, margin: '0 auto', padding: '40px 24px' },
  greeting: { fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6 },
  sub: { fontSize: 15, color: '#555', marginBottom: 36 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 32 },
  stat: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px' },
  statVal: { fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#555' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 },
  card: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px' },
  milestoneRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #0f0f0f' },
  milestoneCheck: { width: 22, height: 22, borderRadius: 6, border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', fontSize: 12 },
  milestoneCheckDone: { width: 22, height: 22, borderRadius: 6, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', fontSize: 12, color: '#000' },
  milestoneText: { fontSize: 14, color: '#ccc' },
  milestoneTextDone: { fontSize: 14, color: '#444', textDecoration: 'line-through' },
  planBadge: { display: 'inline-block', background: '#111', border: '1px solid #222', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 16 },
  acctRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #0f0f0f' },
  acctLabel: { fontSize: 14, color: '#888' },
  acctVal: { fontSize: 14, color: '#fff', fontWeight: 600 },
  portalBtn: { background: 'none', border: '1px solid #222', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#888', cursor: 'pointer', fontFamily: 'inherit' },
  logoutBtn: { background: 'none', border: 'none', padding: '8px 0', fontSize: 13, color: '#444', cursor: 'pointer', fontFamily: 'inherit', marginTop: 16 },
  referralBox: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px', marginBottom: 32 },
  referralTitle: { fontSize: 16, fontWeight: 700, marginBottom: 6 },
  referralSub: { fontSize: 14, color: '#555', marginBottom: 16 },
  referralCode: { background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '12px 16px', fontFamily: 'monospace', fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  copyBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 },
};

const DEFAULT_MILESTONES = [
  'Complete the onboarding quiz',
  'Have your first coaching session',
  'Define your 90-day goal with Actionable',
  'Identify your top skill or asset',
  'Set up your emergency fund plan',
  'Build your first income stream plan',
  'Reach $100 in new income or savings',
  'Hit your 7-day streak',
  'Share your story with the community',
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState([0]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (!d.user) { window.location.href = '/login'; return; }
      setUser(d.user);
      setLoading(false);
    }).catch(() => { window.location.href = '/login'; });
    const saved = localStorage.getItem('actionable_milestones');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  function toggleMilestone(i) {
    const next = completed.includes(i) ? completed.filter(x => x !== i) : [...completed, i];
    setCompleted(next);
    localStorage.setItem('actionable_milestones', JSON.stringify(next));
  }

  function copyReferral() {
    const url = `${window.location.origin}/signup?ref=${user.referral_code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function openPortal() {
    const res = await fetch('/api/stripe/portal', { method: 'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }

  const streakDays = completed.length;
  const planLabel = user?.plan === 'pro' ? 'Pro' : user?.plan === 'basic' ? 'Basic' : 'Inactive';

  if (loading) return <div style={{ background: '#000', minHeight: '100vh' }} />;

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <a href="/" style={s.logo}>Actionable</a>
        <div style={s.navLinks}>
          <a href="/stories" style={s.navLink}>Stories</a>
          <a href="/chat" style={s.chatBtn}>Open Coach →</a>
        </div>
      </nav>

      <div style={s.content}>
        <div style={s.greeting}>Your progress</div>
        <div style={s.sub}>Keep moving. Every step counts.</div>

        {/* Stats */}
        <div style={s.grid}>
          <div style={s.stat}>
            <div style={s.statVal}>{completed.length}</div>
            <div style={s.statLabel}>Milestones hit</div>
          </div>
          <div style={s.stat}>
            <div style={s.statVal}>{Math.round((completed.length / DEFAULT_MILESTONES.length) * 100)}%</div>
            <div style={s.statLabel}>Roadmap complete</div>
          </div>
          <div style={s.stat}>
            <div style={s.statVal}>{planLabel}</div>
            <div style={s.statLabel}>Current plan</div>
          </div>
          {user?.referral_credits > 0 && (
            <div style={s.stat}>
              <div style={s.statVal}>{user.referral_credits}</div>
              <div style={s.statLabel}>Free months earned</div>
            </div>
          )}
        </div>

        {/* Milestones */}
        <div style={s.section}>
          <div style={s.sectionTitle}>Your roadmap</div>
          <div style={s.card}>
            {DEFAULT_MILESTONES.map((m, i) => (
              <div key={i} style={{ ...s.milestoneRow, borderBottom: i < DEFAULT_MILESTONES.length - 1 ? '1px solid #0f0f0f' : 'none' }}>
                <div style={completed.includes(i) ? s.milestoneCheckDone : s.milestoneCheck} onClick={() => toggleMilestone(i)}>
                  {completed.includes(i) ? '✓' : ''}
                </div>
                <div style={completed.includes(i) ? s.milestoneTextDone : s.milestoneText}>{m}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral */}
        {user?.plan !== 'none' && user?.referral_code && (
          <div style={s.referralBox}>
            <div style={s.referralTitle}>Give a month, get a month</div>
            <div style={s.referralSub}>Share your link. When a friend subscribes, you both get one month free.</div>
            <div style={s.referralCode}>
              <span>{window.location.origin}/signup?ref={user.referral_code}</span>
              <button style={s.copyBtn} onClick={copyReferral}>{copied ? 'Copied!' : 'Copy'}</button>
            </div>
          </div>
        )}

        {/* Account */}
        <div style={s.section} id="account">
          <div style={s.sectionTitle}>Account</div>
          <div style={s.card}>
            <div style={s.acctRow}><span style={s.acctLabel}>Email</span><span style={s.acctVal}>{user?.email}</span></div>
            <div style={s.acctRow}><span style={s.acctLabel}>Plan</span><span style={s.acctVal}>{planLabel}</span></div>
            <div style={s.acctRow}><span style={s.acctLabel}>Status</span><span style={s.acctVal}>{user?.subscription_status || 'inactive'}</span></div>
          </div>
          {user?.stripe_customer_id && (
            <button style={{ ...s.portalBtn, marginTop: 12 }} onClick={openPortal}>Manage billing →</button>
          )}
          <div><button style={s.logoutBtn} onClick={logout}>Sign out</button></div>
        </div>
      </div>
    </div>
  );
}
