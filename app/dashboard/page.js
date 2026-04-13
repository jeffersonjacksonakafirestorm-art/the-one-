'use client';
import { useState, useEffect } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', fontFamily: "'Inter Tight', system-ui, sans-serif", color: '#fff' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 60, borderBottom: '1px solid #1a1a1a', background: '#000' },
  logo: { fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em' },
  navRight: { display: 'flex', alignItems: 'center', gap: 20 },
  bizName: { fontSize: 13, color: '#888' },
  logoutBtn: { background: 'none', border: '1px solid #222', borderRadius: 8, padding: '7px 14px', fontFamily: 'inherit', fontSize: 13, color: '#888', cursor: 'pointer' },
  main: { maxWidth: 1000, margin: '0 auto', padding: '40px 32px' },
  tabs: { display: 'flex', gap: 0, borderBottom: '1px solid #1a1a1a', marginBottom: 40 },
  tab: { padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#555', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', borderBottom: '2px solid transparent' },
  tabActive: { color: '#fff', borderBottom: '2px solid #fff' },
  // Setup tab
  setupCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16, padding: 32, marginBottom: 20 },
  setupH3: { fontSize: 17, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' },
  setupP: { fontSize: 14, color: '#888', lineHeight: 1.7, marginBottom: 20 },
  numberBox: { background: '#111', border: '1px solid #333', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  numberLabel: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 4 },
  number: { fontSize: 20, fontWeight: 800, letterSpacing: '0.02em' },
  pendingBadge: { fontSize: 11, background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, padding: '4px 10px', color: '#888' },
  stepsList: { display: 'flex', flexDirection: 'column', gap: 16 },
  step: { display: 'flex', gap: 16, alignItems: 'flex-start' },
  stepNum: { width: 28, height: 28, border: '1px solid #333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#888', flexShrink: 0, marginTop: 1 },
  stepText: { fontSize: 14, color: '#888', lineHeight: 1.65 },
  codeBlock: { display: 'inline-block', background: '#111', border: '1px solid #222', borderRadius: 6, padding: '3px 8px', fontFamily: 'monospace', fontSize: 13, color: '#fff', margin: '4px 0' },
  // Empty state
  emptyWrap: { textAlign: 'center', padding: '80px 0' },
  emptyIcon: { fontSize: 40, marginBottom: 16 },
  emptyH3: { fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' },
  emptyP: { fontSize: 14, color: '#888', lineHeight: 1.7, maxWidth: 360, margin: '0 auto' },
  // Status
  statusWrap: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden', marginBottom: 32 },
  kpi: { background: '#0a0a0a', padding: '24px 20px' },
  kpiVal: { fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 },
  kpiLabel: { fontSize: 12, color: '#888' },
};

const TABS = ['Setup', 'Calls', 'Voicemails'];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('Setup');

  useEffect(() => {
    const authed = localStorage.getItem('crai_authed');
    if (!authed) { window.location.href = '/login'; return; }
    const stored = localStorage.getItem('crai_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function logout() {
    localStorage.removeItem('crai_authed');
    window.location.href = '/login';
  }

  if (!user) return <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 14 }}>Loading...</div>;

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <span style={s.logo}>CallRecoverAI</span>
        <div style={s.navRight}>
          <span style={s.bizName}>{user.business_name}</span>
          <button style={s.logoutBtn} onClick={logout}>Sign Out</button>
        </div>
      </nav>

      <div style={s.main}>
        {/* Tabs */}
        <div style={s.tabs}>
          {TABS.map(t => (
            <button key={t} style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {/* Setup tab */}
        {tab === 'Setup' && (
          <div>
            <div style={s.statusWrap}>
              <div style={s.kpi}><div style={s.kpiVal}>0</div><div style={s.kpiLabel}>Calls Recovered</div></div>
              <div style={s.kpi}><div style={s.kpiVal}>0</div><div style={s.kpiLabel}>Leads Qualified</div></div>
              <div style={s.kpi}><div style={{ ...s.kpiVal, fontSize: 16, color: '#888', marginTop: 6 }}>Trial Active</div><div style={s.kpiLabel}>Plan</div></div>
            </div>

            <div style={s.setupCard}>
              <h3 style={s.setupH3}>Your CallRecoverAI Number</h3>
              <p style={s.setupP}>This is the number your missed calls will forward to. Share it with no one — it's only for call forwarding.</p>
              <div style={s.numberBox}>
                <div>
                  <div style={s.numberLabel}>Your dedicated number</div>
                  <div style={s.number}>Activating soon...</div>
                </div>
                <span style={s.pendingBadge}>Pending setup</span>
              </div>
              <p style={{ fontSize: 13, color: '#555' }}>Your number will appear here once your account is fully activated.</p>
            </div>

            <div style={s.setupCard}>
              <h3 style={s.setupH3}>Set Up Call Forwarding</h3>
              <p style={s.setupP}>Once you have your number, dial one of these codes on your business phone. Takes 30 seconds.</p>
              <div style={s.stepsList}>
                <div style={s.step}>
                  <div style={s.stepNum}>1</div>
                  <div>
                    <p style={s.stepText}><strong style={{ color: '#fff' }}>Most carriers (AT&T, T-Mobile, Verizon):</strong></p>
                    <code style={s.codeBlock}>**61*+1[YOUR-CALLRECOVERAI-NUMBER]#</code>
                    <p style={{ ...s.stepText, marginTop: 4 }}>This forwards unanswered calls (after ~4 rings).</p>
                  </div>
                </div>
                <div style={s.step}>
                  <div style={s.stepNum}>2</div>
                  <p style={s.stepText}>Press <strong style={{ color: '#fff' }}>Call</strong> — you'll hear a confirmation tone. That's it. Your existing number stays the same.</p>
                </div>
                <div style={s.step}>
                  <div style={s.stepNum}>3</div>
                  <p style={s.stepText}>Test it: call your own number and don't pick up. Watch for the AI text below.</p>
                </div>
                <div style={s.step}>
                  <div style={s.stepNum}>4</div>
                  <p style={s.stepText}>To remove forwarding later: dial <code style={{ ...s.codeBlock, fontSize: 12 }}>#61#</code> on your phone.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calls tab */}
        {tab === 'Calls' && (
          <div style={s.emptyWrap}>
            <div style={s.emptyIcon}>📞</div>
            <h3 style={s.emptyH3}>No calls recovered yet</h3>
            <p style={s.emptyP}>Complete the setup on the Setup tab, then miss a call to see the AI in action. Recovered leads will appear here.</p>
          </div>
        )}

        {/* Voicemails tab */}
        {tab === 'Voicemails' && (
          <div style={s.emptyWrap}>
            <div style={s.emptyIcon}>🎙</div>
            <h3 style={s.emptyH3}>No voicemails yet</h3>
            <p style={s.emptyP}>When callers leave voicemails, they'll be automatically transcribed and appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
