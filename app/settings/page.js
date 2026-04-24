'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';

const GRK = "'Space Grotesk', system-ui, sans-serif";
const INT = "'Inter Tight', system-ui, sans-serif";

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('trial')

  useEffect(() => {
    try {
      const e = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail') || ''
      setEmail(e)
    } catch {}
  }, [])

  async function handleLogout() {
    try {
      await fetch('/api/user/logout', { method: 'POST' })
    } catch {}
    window.location.href = '/'
  }

  return (
    <>
      <style>{`* { box-sizing: border-box; } @media(max-width:640px){.page-wrap{flex-direction:column!important}.content-area{padding:20px!important}}`}</style>
      <div className="page-wrap" style={{ display: 'flex', height: '100dvh', background: '#fff', fontFamily: INT }}>
        <Sidebar />

        <div className="content-area" style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>

            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
                Settings
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: GRK, letterSpacing: '-0.03em' }}>
                Your account
              </div>
            </div>

            {/* Account */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 14 }}>
                Account
              </div>
              <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>{email || 'Not available'}</div>
                  </div>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Plan</div>
                    <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>
                      {plan === 'trial' ? '3-day free trial' : 'No Collar · $99/mo'}
                    </div>
                  </div>
                  {plan === 'trial' && (
                    <Link href="/subscribe" style={{
                      background: '#0a0a0a', color: '#fff', border: 'none',
                      borderRadius: 9, padding: '8px 14px', fontSize: 13,
                      fontWeight: 700, textDecoration: 'none', fontFamily: INT,
                    }}>
                      Upgrade
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Billing */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 14 }}>
                Billing
              </div>
              <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Manage billing</div>
                  <Link href="/api/stripe/portal" style={{
                    fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.5)',
                    textDecoration: 'none',
                  }}>
                    Open portal →
                  </Link>
                </div>
              </div>
            </div>

            {/* Danger */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 14 }}>
                Session
              </div>
              <button onClick={handleLogout} style={{
                background: 'transparent', color: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10,
                padding: '10px 18px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: INT,
              }}>
                Log out
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
