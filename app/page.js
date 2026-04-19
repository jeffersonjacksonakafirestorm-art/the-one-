'use client';
import React from 'react';

export default function Home() {
  return (
    <div style={{ background: '#0A1628', color: '#fff', minHeight: '100vh', fontFamily: "'Inter Tight', Inter, system-ui, sans-serif" }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', height: 64, borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, background: '#0A1628', zIndex: 10 }}>
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em' }}>
          Joint<span style={{ color: '#00C9A7' }}>Sync</span> Systems
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.25)', color: '#00C9A7', fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20 }}>
            HIPAA Compliant
          </div>
          <a href="https://calendly.com/parkerpiehl/30min" style={{ background: '#00C9A7', color: '#0A1628', fontWeight: 700, fontSize: 14, padding: '10px 22px', borderRadius: 8, textDecoration: 'none' }}>
            Book Free Audit
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '90px 40px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(0,201,167,0.25)', borderRadius: 100, padding: '5px 16px', fontSize: 12, fontWeight: 600, color: '#00C9A7', marginBottom: 28, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          For Private Orthopedic Practices in TX &amp; FL
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: 22 }}>
          Stop Losing Referrals to<br /><span style={{ color: '#00C9A7' }}>Manual Intake &amp; MRI Chasing</span>
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 44, maxWidth: 580, margin: '0 auto 44px' }}>
          JointSync automates referral intake, MRI record chasing, and patient scheduling — so your staff stops chasing paper and your surgeons stay booked.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a href="https://calendly.com/parkerpiehl/30min" style={{ background: '#00C9A7', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 9, textDecoration: 'none' }}>
            Book Free Audit Call →
          </a>
          <a href="/roi-map.html" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 9, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
            See Your ROI Map
          </a>
        </div>
      </div>

      {/* STATS */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '32px 40px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', justifyContent: 'space-around', gap: 24, flexWrap: 'wrap', textAlign: 'center' }}>
          {[
            { num: '23%', label: 'of referrals lost to missed follow-up' },
            { num: '15+ hrs', label: 'staff time lost weekly chasing MRIs' },
            { num: '$665k+', label: 'in revenue lost per year per practice' },
          ].map(({ num, label }) => (
            <div key={num}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FF6B6B', letterSpacing: '-0.03em', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 6, maxWidth: 160 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE AUTOMATE */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>What JointSync Automates</div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 40 }}>
          Every step from referral received<br />to patient booked — handled.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {[
            { icon: '📋', title: 'Referral Intake', desc: 'Incoming faxes and referrals captured, parsed, and logged automatically — no staff touchpoint required.' },
            { icon: '🔄', title: 'MRI & Record Chasing', desc: 'Automated follow-up sequences contact imaging centers and referring offices until records arrive.' },
            { icon: '📅', title: 'Patient Scheduling Bridge', desc: 'Patients contacted and booked within hours of referral — not days — closing the conversion gap.' },
            { icon: '📊', title: 'Live Dashboard', desc: 'Real-time view of every referral, MRI status, and patient stage — no spreadsheets, no guesswork.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: 'rgba(0,201,167,0.05)', border: '1px solid rgba(0,201,167,0.13)', borderRadius: 12, padding: '20px 22px', display: 'flex', gap: 14 }}>
              <div style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>{icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW FAST */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '70px 40px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>Timeline</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 40 }}>Live in 4 weeks. Zero disruption.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { step: '1', week: 'Week 1', desc: 'Audit your current intake & MRI workflow. Map every gap.' },
              { step: '2', week: 'Week 2–3', desc: 'JointSync system built and integrated — no disruption to your staff.' },
              { step: '3', week: 'Week 4+', desc: 'Live. Referrals tracked, MRIs chased, patients booked automatically.' },
            ].map(({ step, week, desc }) => (
              <div key={step} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ width: 30, height: 30, background: 'rgba(0,201,167,0.12)', border: '1px solid rgba(0,201,167,0.3)', borderRadius: '50%', fontSize: 13, fontWeight: 700, color: '#00C9A7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{step}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{week}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '70px 40px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(0,201,167,0.1), rgba(0,201,167,0.03))', border: '1px solid rgba(0,201,167,0.22)', borderRadius: 18, padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            See What Your Practice Is Leaking
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, marginBottom: 28 }}>
            Book a free 30-minute audit call. We&apos;ll map your specific numbers — no pitch, no pressure.
          </p>
          <a href="https://calendly.com/parkerpiehl/30min" style={{ display: 'inline-block', background: '#00C9A7', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '15px 36px', borderRadius: 9, textDecoration: 'none' }}>
            Book Free Audit Call →
          </a>
          <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            No commitment required &nbsp;·&nbsp; 30 minutes &nbsp;·&nbsp; HIPAA Compliant
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 40px', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
        JointSync Systems &nbsp;|&nbsp; Clinical Continuity Automation for Orthopedic Practices &nbsp;|&nbsp; HIPAA Compliant
      </div>
    </div>
  );
}
