'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

const S = {
  page: { background: '#fafafa', color: '#0a0a0a', minHeight: '100vh', fontFamily: INT },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 100 },
  navLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  backBtn: { display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(0,0,0,0.45)', textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: INT },
  navDivider: { width: 1, height: 18, background: 'rgba(0,0,0,0.1)' },
  navTitle: { fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: GRK, color: '#0a0a0a' },
  navRight: { display: 'flex', gap: 8 },
  btnNav: { padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.13)', background: 'transparent', color: '#0a0a0a', fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', fontFamily: INT },
  btnNavDark: { padding: '8px 16px', borderRadius: 8, background: '#0a0a0a', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', fontFamily: INT },

  header: { padding: '52px 32px 40px', maxWidth: 1180, margin: '0 auto' },
  pageLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: 14 },
  pageTitle: { fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.035em', fontFamily: GRK, color: '#0a0a0a', lineHeight: 1.08, marginBottom: 12 },
  pageSub: { fontSize: 16, color: 'rgba(0,0,0,0.48)', lineHeight: 1.65, maxWidth: 480, fontFamily: INT },

  filterRow: { padding: '0 32px 24px', maxWidth: 1180, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' },
  filterChip: { padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.12)', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: INT, color: '#0a0a0a' },
  filterChipActive: { padding: '6px 14px', borderRadius: 100, border: 'none', background: '#0a0a0a', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: INT },

  grid: { padding: '0 32px 80px', maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 },

  card: { background: '#fff', border: '1.5px solid rgba(0,0,0,0.09)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' },
  cardFeatured: { background: '#0a0a0a', border: 'none', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' },

  cardBadge: { position: 'absolute', top: 16, right: 16, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100 },
  badgeLive: { background: 'rgba(34,197,94,0.12)', color: '#16a34a' },
  badgeSoon: { background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.4)' },
  badgeLiveLight: { background: 'rgba(34,197,94,0.2)', color: '#4ade80' },

  iconWrap: { width: 46, height: 46, borderRadius: 13, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },
  iconWrapDark: { width: 46, height: 46, borderRadius: 13, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },

  category: { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', fontFamily: INT },
  categoryLight: { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: INT },
  cardName: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.025em', fontFamily: GRK, color: '#0a0a0a' },
  cardNameLight: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.025em', fontFamily: GRK, color: '#fff' },
  cardDesc: { fontSize: 14, color: 'rgba(0,0,0,0.52)', lineHeight: 1.65, flexGrow: 1, fontFamily: INT },
  cardDescLight: { fontSize: 14, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, flexGrow: 1, fontFamily: INT },
  toolsRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  chip: { background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.55)', borderRadius: 100, padding: '4px 10px', fontSize: 12, fontWeight: 600, fontFamily: INT },
  chipLight: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.62)', borderRadius: 100, padding: '4px 10px', fontSize: 12, fontWeight: 600, fontFamily: INT },

  btnDeploy: { display: 'block', textAlign: 'center', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: INT, marginTop: 'auto' },
  btnDeployLight: { display: 'block', textAlign: 'center', background: '#fff', color: '#0a0a0a', border: 'none', borderRadius: 10, padding: '12px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: INT, marginTop: 'auto' },
  btnComingSoon: { display: 'block', textAlign: 'center', background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.35)', border: 'none', borderRadius: 10, padding: '12px 18px', fontSize: 14, fontWeight: 600, cursor: 'default', textDecoration: 'none', fontFamily: INT, marginTop: 'auto' },
}

const AGENTS = [
  {
    id: 'commander',
    icon: '⚡',
    name: 'The Commander',
    category: 'All-in-one',
    desc: 'One agent that handles billing, scheduling, outreach, and reporting. Talk to it in plain English — it handles the rest across every tool you\'ve connected.',
    tools: ['Stripe', 'Calendly', 'Gmail', 'CRM', 'Slack'],
    live: true,
    featured: true,
  },
  {
    id: 'revenue-manager',
    icon: '💳',
    name: 'Revenue Manager',
    category: 'Finance',
    desc: 'Monitors your Stripe, flags overdue invoices, drafts payment reminders, and gives you a daily revenue summary — without you lifting a finger.',
    tools: ['Stripe', 'Gmail'],
    live: false,
    featured: false,
  },
  {
    id: 'schedule-manager',
    icon: '📅',
    name: 'Schedule Manager',
    category: 'Scheduling',
    desc: 'Manages your Calendly, confirms bookings, sends reminders, and handles reschedules — 24 hours a day.',
    tools: ['Calendly', 'Google Cal', 'Gmail'],
    live: false,
    featured: false,
  },
  {
    id: 'outreach-agent',
    icon: '📨',
    name: 'Outreach Agent',
    category: 'Sales',
    desc: 'Drafts follow-up sequences, tracks responses, and flags leads that go cold. Keeps your pipeline warm without manual effort.',
    tools: ['Gmail', 'HubSpot'],
    live: false,
    featured: false,
  },
  {
    id: 'content-agent',
    icon: '🎬',
    name: 'Content Agent',
    category: 'Content',
    desc: 'Schedules and publishes content to YouTube, LinkedIn, and more from plain-English instructions. You create — it distributes.',
    tools: ['YouTube', 'LinkedIn', 'Notion'],
    live: false,
    featured: false,
  },
  {
    id: 'support-agent',
    icon: '💬',
    name: 'Support Agent',
    category: 'Support',
    desc: 'Handles common customer inquiries, escalates when needed, and logs every interaction. Keeps your inbox under control.',
    tools: ['Gmail', 'Slack', 'Notion'],
    live: false,
    featured: false,
  },
]

const CATEGORIES = ['All', 'Finance', 'Scheduling', 'Sales', 'Content', 'Support', 'All-in-one']

export default function MarketPage() {
  const router = useRouter()

  function deploy(agentId) {
    router.push(`/chat?agent=${agentId}`)
  }

  return (
    <>
      <style>{`
        @media (max-width: 780px) {
          .market-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1020px) and (min-width: 781px) {
          .market-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <div style={S.page}>

        {/* Nav */}
        <nav style={S.nav}>
          <div style={S.navLeft}>
            <Link href="/chat" style={S.backBtn}>← Chat</Link>
            <div style={S.navDivider} />
            <div style={S.navTitle}>AI Employee Market</div>
          </div>
          <div style={S.navRight}>
            <Link href="/login" style={S.btnNav}>Log in</Link>
            <Link href="/signup" style={S.btnNavDark}>Get started</Link>
          </div>
        </nav>

        {/* Page Header */}
        <div style={S.header}>
          <div style={S.pageLabel}>Browse Agents</div>
          <div style={S.pageTitle}>Find your next<br />AI employee.</div>
          <p style={S.pageSub}>Deploy agents that work your tools while you focus on what actually matters. Plain English. No setup scripts.</p>
        </div>

        {/* Agent Grid */}
        <div style={S.grid} className="market-grid">
          {AGENTS.map(a => (
            <div key={a.id} style={a.featured ? S.cardFeatured : S.card}>
              <div style={{ ...(a.featured ? S.badgeLiveLight : (a.live ? S.badgeLive : S.badgeSoon)), ...S.cardBadge }}>
                {a.live ? 'Available' : 'Coming soon'}
              </div>
              <div style={a.featured ? S.iconWrapDark : S.iconWrap}>{a.icon}</div>
              <div style={a.featured ? S.categoryLight : S.category}>{a.category}</div>
              <div style={a.featured ? S.cardNameLight : S.cardName}>{a.name}</div>
              <div style={a.featured ? S.cardDescLight : S.cardDesc}>{a.desc}</div>
              <div style={S.toolsRow}>
                {a.tools.map(t => (
                  <span key={t} style={a.featured ? S.chipLight : S.chip}>{t}</span>
                ))}
              </div>
              {a.live ? (
                <button
                  style={a.featured ? S.btnDeployLight : S.btnDeploy}
                  onClick={() => deploy(a.id)}
                >
                  Deploy this agent →
                </button>
              ) : (
                <div style={S.btnComingSoon}>Coming soon</div>
              )}
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
