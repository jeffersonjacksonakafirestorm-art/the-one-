'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

const NAV_ITEMS = [
  { icon: '⌂', label: 'Home', href: '/home' },
  { icon: '⚡', label: 'My Agents', href: '/agents' },
  { icon: '⚙', label: 'Tools', href: '/tools' },
  { icon: '◎', label: 'Community', href: '/community' },
  { icon: '✦', label: 'Learn', href: '/learn' },
  { icon: '○', label: 'Settings', href: '/settings' },
]

export default function Sidebar({ onNewChat }) {
  const pathname = usePathname()
  const router = useRouter()

  function handleNewChat() {
    if (onNewChat) onNewChat()
    else router.push('/home?new=1')
  }

  return (
    <>
      <style>{`
        .nav-item:hover { background: rgba(0,0,0,0.04) !important; }
        .new-chat-btn:hover { background: #222 !important; }
        @media (max-width: 640px) {
          .sidebar { display: none !important; }
        }
      `}</style>

      <div className="sidebar" style={{
        width: 220, minWidth: 220, background: '#fafafa',
        borderRight: '1px solid rgba(0,0,0,0.07)',
        display: 'flex', flexDirection: 'column',
        padding: '24px 0', flexShrink: 0, height: '100dvh',
        position: 'sticky', top: 0,
      }}>

        {/* Brand */}
        <div style={{
          padding: '0 20px 32px',
          fontFamily: GRK, fontWeight: 700, fontSize: 17,
          letterSpacing: '-0.02em', color: '#0a0a0a',
        }}>
          No Collar
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                <div className="nav-item" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 9,
                  background: active ? 'rgba(0,0,0,0.06)' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}>
                  <span style={{ fontSize: 15, width: 18, textAlign: 'center', color: '#0a0a0a' }}>{item.icon}</span>
                  <span style={{
                    fontSize: 14, fontWeight: active ? 700 : 500,
                    color: active ? '#0a0a0a' : 'rgba(0,0,0,0.6)',
                    fontFamily: INT,
                  }}>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* New Chat button */}
        <div style={{ padding: '16px 10px 0' }}>
          <button
            className="new-chat-btn"
            onClick={handleNewChat}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10,
              background: '#0a0a0a', color: '#fff',
              border: 'none', cursor: 'pointer',
              fontFamily: INT, fontSize: 14, fontWeight: 600,
              transition: 'background 0.15s',
            }}
          >
            <span style={{ fontSize: 15 }}>🎬</span>
            <span>New Chat</span>
          </button>
        </div>

      </div>
    </>
  )
}
