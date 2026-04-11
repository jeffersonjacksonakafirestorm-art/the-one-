'use client';
import { useEffect, useState } from 'react';

const MOCK_CALLS = [
  { id: 1, caller: 'Mike R.', initials: 'MR', number: '+1 (623) 555-0142', time: '2 min ago', status: 'recovered', note: 'Roof inspection — Wed 9am', conversation: [{ role: 'ai', text: "Hey — sorry we missed you. This is ABC Roofing. Still need help?" }, { role: 'user', text: "Yes! My roof is leaking after the storm." }, { role: 'ai', text: "We're on it. What's your zip code?" }, { role: 'user', text: "85201" }, { role: 'ai', text: "Perfect — available today 2–5pm?" }, { role: 'user', text: "3pm works." }, { role: 'ai', text: "Booked! See you at 3pm." }] },
  { id: 2, caller: 'Sarah L.', initials: 'SL', number: '+1 (480) 555-0198', time: '8 min ago', status: 'active', note: 'HVAC emergency — qualifying', conversation: [{ role: 'ai', text: "Hey — sorry we missed you. How can we help?" }, { role: 'user', text: "AC is out. It's 108 degrees." }, { role: 'ai', text: "Oh no — we can get someone out today. What's your address?" }] },
  { id: 3, caller: 'Tom K.', initials: 'TK', number: '+1 (602) 555-0071', time: '23 min ago', status: 'recovered', note: 'Plumbing quote — Thu 2pm', conversation: [{ role: 'ai', text: "Hi — sorry we missed your call. How can we help?" }, { role: 'user', text: "Need a quote on a water heater replacement." }, { role: 'ai', text: "Happy to help. Can you do Thursday afternoon?" }, { role: 'user', text: "2pm works." }, { role: 'ai', text: "Booked! See you Thursday at 2pm." }] },
  { id: 4, caller: 'Dana R.', initials: 'DR', number: '+1 (520) 555-0033', time: '41 min ago', status: 'recovered', note: 'Botox consult — Fri 11am', conversation: [{ role: 'ai', text: "Hi — this is the office. Sorry we missed you!" }, { role: 'user', text: "I wanted to book a Botox consultation." }, { role: 'ai', text: "We'd love to help. Friday at 11am work?" }, { role: 'user', text: "Perfect." }, { role: 'ai', text: "Booked! See you Friday at 11." }] },
];

const MOCK_VOICEMAILS = [
  { id: 1, caller: '+1 (623) 555-0199', time: '1 hour ago', duration: '0:32', transcript: "Hi, this is James calling about getting a quote on my roof. It's got some storm damage and I need someone to come take a look. Please give me a call back when you get a chance. Thanks." },
  { id: 2, caller: '+1 (480) 555-0044', time: '3 hours ago', duration: '0:18', transcript: "Hey, I'm looking to get my HVAC system serviced before summer. Can someone call me back? My number is 480-555-0044. Thanks." },
];

const WEEKLY_DATA = [
  { week: 'This week', missed: 23, recovered: 19, lost: 4, est_value: 57000 },
  { week: 'Last week', missed: 18, recovered: 14, lost: 4, est_value: 42000 },
  { week: '2 weeks ago', missed: 21, recovered: 16, lost: 5, est_value: 48000 },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCall, setSelectedCall] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('crai_user');
    if (!stored) {
      window.location.href = '/login';
      return;
    }
    setUser(JSON.parse(stored));
  }, []);

  function logout() {
    localStorage.removeItem('crai_token');
    localStorage.removeItem('crai_user');
    window.location.href = '/login';
  }

  if (!user) return (
    <div style={{ minHeight: '100vh', background: '#07080b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter Tight', sans-serif", color: '#888' }}>
      Loading...
    </div>
  );

  const recovered = MOCK_CALLS.filter(c => c.status === 'recovered').length;
  const active = MOCK_CALLS.filter(c => c.status === 'active').length;

  const s = {
    shell: { minHeight: '100vh', background: '#07080b', fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif", color: '#efefef', display: 'flex' },
    sidebar: { width: '220px', background: '#0e1018', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0, minHeight: '100vh' },
    sidebarLogo: { padding: '0 20px 24px', fontSize: '1rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '16px' },
    sidebarAcc: { color: '#6c47ff' },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px',
      fontSize: '0.875rem', fontWeight: active ? 700 : 500,
      color: active ? '#efefef' : '#888',
      background: active ? 'rgba(108,71,255,0.12)' : 'none',
      borderLeft: active ? '2px solid #6c47ff' : '2px solid transparent',
      cursor: 'pointer', transition: '0.2s', textDecoration: 'none',
    }),
    main: { flex: 1, padding: '32px', overflowY: 'auto' },
    topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' },
    pageTitle: { fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
    userName: { fontSize: '0.85rem', color: '#888' },
    logoutBtn: { background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#888', fontFamily: 'inherit', fontSize: '0.8rem', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' },
    kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' },
    kpi: (accent) => ({
      background: accent ? 'rgba(108,71,255,0.12)' : '#0e1018',
      border: `1px solid ${accent ? 'rgba(108,71,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: '12px', padding: '20px 24px',
    }),
    kpiVal: { fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '4px' },
    kpiLabel: { fontSize: '0.78rem', color: '#888' },
    section: { marginBottom: '28px' },
    sectionHead: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: '14px' },
    card: { background: '#0e1018', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' },
    callItem: (sel) => ({
      display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: sel ? 'rgba(108,71,255,0.08)' : 'none',
      cursor: 'pointer', transition: '0.2s',
    }),
    av: { width: '36px', height: '36px', borderRadius: '50%', background: '#14161f', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 },
    callName: { fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
    callMeta: { fontSize: '0.75rem', color: '#888', marginTop: '2px' },
    callTime: { fontSize: '0.72rem', color: '#555', marginLeft: 'auto', whiteSpace: 'nowrap' },
    tag: (type) => ({
      fontSize: '0.62rem', fontWeight: 700, padding: '2px 7px', borderRadius: '4px',
      background: type === 'recovered' ? 'rgba(34,197,94,0.12)' : 'rgba(108,71,255,0.15)',
      color: type === 'recovered' ? '#22c55e' : '#a78bfa',
    }),
    chatPanel: { background: '#0e1018', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px' },
    chatHead: { fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px', color: '#efefef' },
    chatMsg: (role) => ({
      fontSize: '0.82rem', lineHeight: 1.5, padding: '8px 12px', borderRadius: '10px',
      maxWidth: '80%', marginBottom: '8px',
      background: role === 'ai' ? '#14161f' : '#6c47ff',
      border: role === 'ai' ? '1px solid rgba(255,255,255,0.07)' : 'none',
      color: role === 'ai' ? '#efefef' : '#fff',
      alignSelf: role === 'ai' ? 'flex-start' : 'flex-end',
    }),
    chatWrap: { display: 'flex', flexDirection: 'column' },
    vmCard: { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    vmTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' },
    vmNum: { fontSize: '0.85rem', fontWeight: 600 },
    vmMeta: { fontSize: '0.75rem', color: '#888' },
    vmTranscript: { fontSize: '0.82rem', color: '#aaa', lineHeight: 1.7, fontStyle: 'italic' },
    weekRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    weekCard: { background: '#0e1018', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px' },
    weekLabel: { fontSize: '0.75rem', color: '#888', marginBottom: '12px', fontWeight: 600 },
    weekStat: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    weekStatLabel: { color: '#888' },
    setupBox: { background: 'rgba(108,71,255,0.08)', border: '1px solid rgba(108,71,255,0.2)', borderRadius: '12px', padding: '24px 28px' },
    setupTitle: { fontSize: '1rem', fontWeight: 700, marginBottom: '8px' },
    setupSub: { fontSize: '0.875rem', color: '#888', marginBottom: '20px', lineHeight: 1.6 },
    codeBox: { background: '#07080b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#a78bfa', marginBottom: '12px' },
    setupStep: { display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' },
    stepNum: { width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(108,71,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, color: '#a78bfa' },
    stepText: { fontSize: '0.875rem', color: '#aaa', lineHeight: 1.6 },
    tabs: { display: 'flex', gap: '0', marginBottom: '28px', background: '#0e1018', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '4px', width: 'fit-content' },
    tab: (active) => ({
      padding: '8px 18px', fontSize: '0.85rem', fontWeight: active ? 700 : 500,
      borderRadius: '7px', cursor: 'pointer',
      background: active ? '#14161f' : 'none',
      border: active ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      color: active ? '#efefef' : '#888', transition: '0.2s',
    }),
    liveTag: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '100px', padding: '3px 10px' },
    liveDot: { width: '6px', height: '6px', background: '#22c55e', borderRadius: '50', animation: 'pulse 2s infinite' },
  };

  const tabs = [
    { key: 'overview', label: '📊 Overview' },
    { key: 'calls', label: '📞 Calls' },
    { key: 'voicemails', label: '🎙 Voicemails' },
    { key: 'weekly', label: '📬 Weekly Report' },
    { key: 'setup', label: '⚙️ Setup' },
  ];

  const craiNumber = '+1 (602) 555-0001';

  return (
    <div style={s.shell}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.sidebarLogo}>
          CallRecover<span style={s.sidebarAcc}>AI</span>
        </div>
        {tabs.map(t => (
          <div key={t.key} style={s.navItem(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: '0.75rem', color: '#555', marginBottom: '4px' }}>{user.business_name || user.email}</div>
          <button onClick={logout} style={s.logoutBtn}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={s.main}>
        <div style={s.topBar}>
          <div>
            <div style={s.pageTitle}>
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'calls' && 'Recovered Calls'}
              {activeTab === 'voicemails' && 'Voicemail Transcripts'}
              {activeTab === 'weekly' && 'Weekly Revenue Report'}
              {activeTab === 'setup' && 'Setup Instructions'}
            </div>
          </div>
          <div style={s.userInfo}>
            <span style={s.liveTag}><span style={s.liveDot}></span> LIVE</span>
            <span style={s.userName}>{user.owner_name || user.email}</span>
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <div style={s.kpiRow}>
              <div style={s.kpi(false)}>
                <div style={s.kpiVal}>{MOCK_CALLS.length}</div>
                <div style={s.kpiLabel}>Calls Today</div>
              </div>
              <div style={s.kpi(true)}>
                <div style={s.kpiVal}>{recovered}</div>
                <div style={s.kpiLabel}>Leads Recovered</div>
              </div>
              <div style={s.kpi(false)}>
                <div style={s.kpiVal}>{active}</div>
                <div style={s.kpiLabel}>Active Conversations</div>
              </div>
              <div style={s.kpi(false)}>
                <div style={s.kpiVal}>{MOCK_VOICEMAILS.length}</div>
                <div style={s.kpiLabel}>Voicemails Transcribed</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={s.sectionHead}>Recent Conversations</div>
                <div style={s.card}>
                  {MOCK_CALLS.map(call => (
                    <div key={call.id} style={s.callItem(selectedCall?.id === call.id)} onClick={() => setSelectedCall(call)}>
                      <div style={s.av}>{call.initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={s.callName}>
                          {call.caller}
                          <span style={s.tag(call.status)}>{call.status === 'recovered' ? 'Recovered ✓' : 'Active'}</span>
                        </div>
                        <div style={s.callMeta}>{call.note}</div>
                      </div>
                      <div style={s.callTime}>{call.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={s.sectionHead}>
                  {selectedCall ? `Conversation — ${selectedCall.caller}` : 'Select a conversation'}
                </div>
                <div style={s.chatPanel}>
                  {selectedCall ? (
                    <div style={s.chatWrap}>
                      {selectedCall.conversation.map((m, i) => (
                        <div key={i} style={s.chatMsg(m.role)}>{m.text}</div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: '#555', fontSize: '0.85rem' }}>Click a call to view the AI conversation.</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* CALLS */}
        {activeTab === 'calls' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={s.sectionHead}>All Recovered Calls</div>
              <div style={s.card}>
                {MOCK_CALLS.map(call => (
                  <div key={call.id} style={s.callItem(selectedCall?.id === call.id)} onClick={() => setSelectedCall(call)}>
                    <div style={s.av}>{call.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={s.callName}>
                        {call.caller}
                        <span style={s.tag(call.status)}>{call.status === 'recovered' ? 'Recovered ✓' : 'Active'}</span>
                      </div>
                      <div style={s.callMeta}>{call.number}</div>
                      <div style={s.callMeta}>{call.note}</div>
                    </div>
                    <div style={s.callTime}>{call.time}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={s.sectionHead}>{selectedCall ? `AI Conversation — ${selectedCall.caller}` : 'Select a call'}</div>
              <div style={s.chatPanel}>
                {selectedCall ? (
                  <div style={s.chatWrap}>
                    {selectedCall.conversation.map((m, i) => (
                      <div key={i} style={s.chatMsg(m.role)}>{m.text}</div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: '#555', fontSize: '0.85rem' }}>Click a call to view the AI conversation.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VOICEMAILS */}
        {activeTab === 'voicemails' && (
          <>
            <div style={s.sectionHead}>Voicemail Transcripts</div>
            <div style={s.card}>
              {MOCK_VOICEMAILS.map(vm => (
                <div key={vm.id} style={s.vmCard}>
                  <div style={s.vmTop}>
                    <div>
                      <div style={s.vmNum}>{vm.caller}</div>
                      <div style={s.vmMeta}>{vm.time} · {vm.duration}</div>
                    </div>
                  </div>
                  <div style={s.vmTranscript}>&ldquo;{vm.transcript}&rdquo;</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* WEEKLY REPORT */}
        {activeTab === 'weekly' && (
          <>
            <div style={s.sectionHead}>Revenue Leakage Report</div>
            <div style={s.weekRow}>
              {WEEKLY_DATA.map((w, i) => (
                <div key={i} style={s.weekCard}>
                  <div style={s.weekLabel}>{w.week}</div>
                  <div style={s.weekStat}>
                    <span style={s.weekStatLabel}>Missed calls</span>
                    <strong>{w.missed}</strong>
                  </div>
                  <div style={s.weekStat}>
                    <span style={s.weekStatLabel}>Recovered by AI</span>
                    <strong style={{ color: '#22c55e' }}>{w.recovered}</strong>
                  </div>
                  <div style={s.weekStat}>
                    <span style={s.weekStatLabel}>Lost leads</span>
                    <strong style={{ color: '#f87171' }}>{w.lost}</strong>
                  </div>
                  <div style={{ ...s.weekStat, borderBottom: 'none', marginTop: '8px' }}>
                    <span style={s.weekStatLabel}>Est. value saved</span>
                    <strong style={{ color: '#6c47ff' }}>${w.est_value.toLocaleString()}</strong>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SETUP */}
        {activeTab === 'setup' && (
          <>
            <div style={s.setupBox}>
              <div style={s.setupTitle}>Your CallRecoverAI Number</div>
              <div style={s.codeBox}>{craiNumber}</div>
              <div style={s.setupSub}>
                Set up call forwarding so missed calls route through your AI. Follow these steps exactly — takes 30 seconds.
              </div>

              <div style={s.setupStep}>
                <div style={s.stepNum}>1</div>
                <div style={s.stepText}>Open your phone's dialer.</div>
              </div>
              <div style={s.setupStep}>
                <div style={s.stepNum}>2</div>
                <div style={s.stepText}>
                  Dial this exact code (replace the number with yours above):
                  <div style={{ ...s.codeBox, marginTop: '8px', fontSize: '0.85rem' }}>
                    **61*+16025550001#
                  </div>
                  This forwards unanswered calls to your CallRecoverAI number.
                </div>
              </div>
              <div style={s.setupStep}>
                <div style={s.stepNum}>3</div>
                <div style={s.stepText}>Press Call. You&apos;ll hear a confirmation tone or see a message. Done.</div>
              </div>
              <div style={s.setupStep}>
                <div style={s.stepNum}>4</div>
                <div style={s.stepText}>
                  Test it: call your business number from another phone and don&apos;t answer. You should receive an AI text back within 30 seconds.
                </div>
              </div>

              <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#555' }}>
                To disable forwarding at any time, dial: <span style={{ color: '#a78bfa', fontFamily: 'monospace' }}>#61#</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
