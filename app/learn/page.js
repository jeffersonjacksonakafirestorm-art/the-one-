'use client';
import Sidebar from '../../components/Sidebar';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

const LESSONS = [
  {
    category: 'Getting Started',
    items: [
      { title: 'What AI agents actually are', desc: 'Not chatbots. Not hype. A plain-English breakdown of what an agent does and why it\'s different from anything you\'ve used before.', time: '3 min read' },
      { title: 'The shift happening right now', desc: 'Blue collar and white collar work is being automated. Here\'s what that means for you and how to be on the right side of it.', time: '5 min read' },
      { title: 'Your first agent in 10 minutes', desc: 'Walk through deploying your first agent step by step — from describing your situation to watching it run in the background.', time: '10 min guide' },
    ]
  },
  {
    category: 'Tools & Integrations',
    items: [
      { title: 'How Stripe + an agent replaces your billing admin', desc: 'Missed invoices, manual reminders, late payments — one agent eliminates all of it. Here\'s exactly how.', time: '4 min read' },
      { title: 'Automating your calendar with Calendly', desc: 'Never manually confirm a booking again. Your agent handles confirmations, reminders, and follow-ups automatically.', time: '4 min read' },
      { title: 'Missed call recovery: the highest-ROI agent', desc: 'Every missed call is a missed client. Here\'s how an agent turns missed calls into booked appointments within 60 seconds.', time: '5 min read' },
    ]
  },
  {
    category: 'Building a Business with AI',
    items: [
      { title: 'Starting from zero: no money, no degree, no problem', desc: 'How people with nothing but a phone and a Wi-Fi connection are building real income with AI agents right now.', time: '6 min read' },
      { title: 'The AI hustle stack: tools that cost nothing to start', desc: 'Stripe, Calendly, Claude, No Collar — all free to start. Here\'s the exact stack people are using to build their first income.', time: '5 min read' },
      { title: 'Selling AI setup as a service', desc: 'You don\'t need to build anything. You configure agents for small businesses and charge for your time. Here\'s how.', time: '7 min read' },
    ]
  },
]

export default function LearnPage() {
  return (
    <>
      <style>{`* { box-sizing: border-box; } .lesson-card:hover{border-color:rgba(0,0,0,0.18)!important;background:#fafafa!important;cursor:pointer} @media(max-width:640px){.page-wrap{flex-direction:column!important}.content-area{padding:20px!important}}`}</style>
      <div className="page-wrap" style={{ display: 'flex', height: '100dvh', background: '#fff', fontFamily: INT }}>
        <Sidebar />

        <div className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
                Learn
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: GRK, letterSpacing: '-0.03em', marginBottom: 6 }}>
                Understand what's possible
              </div>
              <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
                Plain English. No fluff. Everything you need to know to use AI to change your situation.
              </div>
            </div>

            {LESSONS.map(section => (
              <div key={section.category} style={{ marginBottom: 40 }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.07em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
                  marginBottom: 16,
                }}>
                  {section.category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {section.items.map(item => (
                    <div key={item.title} className="lesson-card" style={{
                      background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)',
                      borderRadius: 14, padding: '20px 24px',
                      transition: 'all 0.15s',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, fontFamily: GRK, marginBottom: 5, letterSpacing: '-0.01em' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
                            {item.desc}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.35)',
                          whiteSpace: 'nowrap', marginTop: 2,
                        }}>
                          {item.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}
