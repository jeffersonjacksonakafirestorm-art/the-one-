'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

const ALL_TOOLS = [
  { name: 'Stripe', emoji: '💳', category: 'Finance', desc: 'Payments, invoices, subscriptions', live: true },
  { name: 'Calendly', emoji: '📅', category: 'Scheduling', desc: 'Booking links and availability', live: true },
  { name: 'Gmail', emoji: '📧', category: 'Email', desc: 'Send, receive, and manage email', live: true },
  { name: 'Twilio', emoji: '📱', category: 'SMS/Calls', desc: 'SMS, calls, missed call detection', live: true },
  { name: 'Slack', emoji: '💬', category: 'Messaging', desc: 'Team messaging and notifications', live: false },
  { name: 'HubSpot', emoji: '🎯', category: 'CRM', desc: 'Contacts, deals, pipelines', live: false },
  { name: 'Notion', emoji: '📝', category: 'Productivity', desc: 'Notes, databases, wikis', live: false },
  { name: 'YouTube', emoji: '▶️', category: 'Content', desc: 'Upload, schedule, manage videos', live: false },
  { name: 'Shopify', emoji: '🛍️', category: 'eCommerce', desc: 'Orders, products, inventory', live: false },
  { name: 'QuickBooks', emoji: '📊', category: 'Accounting', desc: 'Books, expenses, invoicing', live: false },
  { name: 'Airtable', emoji: '📋', category: 'Database', desc: 'Tables, automations, records', live: false },
  { name: 'Zapier', emoji: '⚡', category: 'Automation', desc: 'Connect any app to any app', live: false },
  { name: 'Google Calendar', emoji: '📆', category: 'Scheduling', desc: 'Events, reminders, scheduling', live: false },
  { name: 'LinkedIn', emoji: '💼', category: 'Social', desc: 'Posts, outreach, connections', live: false },
  { name: 'Discord', emoji: '🎮', category: 'Community', desc: 'Servers, messages, bots', live: false },
  { name: 'Salesforce', emoji: '☁️', category: 'CRM', desc: 'Enterprise CRM and automation', live: false },
  { name: 'GitHub', emoji: '🐙', category: 'Dev', desc: 'Repos, issues, pull requests', live: false },
  { name: 'WhatsApp', emoji: '🟢', category: 'Messaging', desc: 'Messages and notifications', live: false },
  { name: 'Typeform', emoji: '📋', category: 'Forms', desc: 'Surveys, forms, lead capture', live: false },
  { name: 'Mailchimp', emoji: '📬', category: 'Email', desc: 'Email campaigns and lists', live: false },
  { name: 'Intercom', emoji: '💬', category: 'Support', desc: 'Customer chat and support', live: false },
  { name: 'Webflow', emoji: '🌐', category: 'Website', desc: 'Site updates and CMS', live: false },
  { name: 'Dropbox', emoji: '📦', category: 'Storage', desc: 'Files and document management', live: false },
  { name: 'Zoom', emoji: '🎥', category: 'Video', desc: 'Meetings and recordings', live: false },
]

const CATEGORIES = ['All', ...Array.from(new Set(ALL_TOOLS.map(t => t.category)))]

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = ALL_TOOLS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || t.category === category
    return matchSearch && matchCat
  })

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(0,0,0,0.28); }
        .tool-card:hover { border-color: rgba(0,0,0,0.18) !important; background: #fafafa !important; }
        .cat-chip:hover { background: rgba(0,0,0,0.06) !important; }
        @media(max-width:640px){.page-wrap{flex-direction:column!important}.content-area{padding:20px!important}.tools-grid{grid-template-columns:1fr 1fr!important}}
      `}</style>
      <div className="page-wrap" style={{ display: 'flex', height: '100dvh', background: '#fff', fontFamily: INT }}>
        <Sidebar />

        <div className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
                Tools
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: GRK, letterSpacing: '-0.03em', marginBottom: 6 }}>
                Every tool your agents can run
              </div>
              <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
                Search any tool. Connect it. Your agents handle the rest in the background via API and OAuth.
              </div>
            </div>

            {/* Search */}
            <input
              style={{
                width: '100%', background: '#fafafa', border: '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 12, padding: '12px 16px', fontSize: 15, fontFamily: INT,
                color: '#0a0a0a', outline: 'none', marginBottom: 16,
              }}
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            {/* Category filters */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
              {CATEGORIES.slice(0, 10).map(cat => (
                <button
                  key={cat}
                  className="cat-chip"
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                    border: 'none', cursor: 'pointer', fontFamily: INT, transition: 'background 0.15s',
                    background: category === cat ? '#0a0a0a' : 'rgba(0,0,0,0.05)',
                    color: category === cat ? '#fff' : 'rgba(0,0,0,0.6)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tools grid */}
            <div className="tools-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
            }}>
              {filtered.map(tool => (
                <div key={tool.name} className="tool-card" style={{
                  background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)',
                  borderRadius: 14, padding: '18px 20px',
                  display: 'flex', flexDirection: 'column', gap: 10,
                  cursor: 'default', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 24 }}>{tool.emoji}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                      textTransform: 'uppercase', padding: '3px 8px', borderRadius: 100,
                      background: tool.live ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.05)',
                      color: tool.live ? '#16a34a' : 'rgba(0,0,0,0.35)',
                    }}>
                      {tool.live ? 'Available' : 'Soon'}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, fontFamily: GRK, marginBottom: 3 }}>{tool.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.48)', lineHeight: 1.5 }}>{tool.desc}</div>
                  </div>
                  {tool.live ? (
                    <button style={{
                      background: '#0a0a0a', color: '#fff', border: 'none',
                      borderRadius: 8, padding: '8px 14px', fontSize: 12,
                      fontWeight: 700, cursor: 'pointer', fontFamily: INT, marginTop: 'auto',
                    }}>
                      Connect
                    </button>
                  ) : (
                    <div style={{
                      fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.3)',
                      padding: '8px 0', marginTop: 'auto',
                    }}>
                      Coming soon
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(0,0,0,0.35)' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>No tools match "{search}"</div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
