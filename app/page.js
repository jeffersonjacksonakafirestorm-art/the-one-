'use client';
import { useState } from 'react';

const fmt = (n) => '$' + Math.round(n).toLocaleString();

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '14px 18px',
  color: '#fff',
  fontSize: 15,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.55)',
  marginBottom: 8,
  letterSpacing: '0.01em',
};

export default function Home() {
  const [form, setForm] = useState({
    name: '', email: '', practice: '',
    surgeons: '5', referrals: '40', caseValue: '3200',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const surgeons = parseInt(form.surgeons) || 5;
  const referrals = parseInt(form.referrals) || 40;
  const caseValue = parseInt(form.caseValue) || 3200;

  const lostReferrals = Math.round(referrals * 0.23);
  const lostCases = Math.round(lostReferrals * 0.5);
  const revenueLost = lostCases * 52 * caseValue;
  const staffCost = 15 * 52 * 22;
  const totalLost = revenueLost + staffCost;
  const recoveryLow = Math.round(revenueLost * 0.28);
  const recoveryHigh = Math.round(revenueLost * 0.55);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, surgeons, referrals, caseValue, totalLost, recoveryLow, recoveryHigh }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ background: '#080F1E', color: '#fff', minHeight: '100vh', fontFamily: "'Inter Tight', Inter, system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 48px', height: 68, borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: 'rgba(8,15,30,0.96)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
          Joint<span style={{ color: '#00C9A7' }}>Sync</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>Systems</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>HIPAA Compliant</span>
          <a href="https://calendly.com/parkerpiehl/30min" style={{ background: '#00C9A7', color: '#080F1E', fontWeight: 700, fontSize: 14, padding: '10px 22px', borderRadius: 8, textDecoration: 'none' }}>
            Book Free Audit →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: 'radial-gradient(ellipse, rgba(0,201,167,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '90px 48px 60px', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,201,167,0.08)', border: '1px solid rgba(0,201,167,0.2)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 600, color: '#00C9A7', marginBottom: 30, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, background: '#00C9A7', borderRadius: '50%', display: 'inline-block' }} />
            For Private Orthopedic Practices — TX &amp; FL
          </div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.4rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', marginBottom: 22 }}>
            Your Practice Is Bleeding<br /><span style={{ color: '#FF6B6B' }}>Six Figures</span> Every Year
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 20px' }}>
            Missed referrals, MRIs stuck in limbo, patients who never got booked. Fill out the form below and we'll send your personalized revenue leak analysis straight to your inbox.
          </p>
        </div>
      </div>

      {/* PAIN STRIP */}
      <div style={{ borderTop: '1px solid rgba(255,59,59,0.12)', borderBottom: '1px solid rgba(255,59,59,0.12)', background: 'rgba(255,59,59,0.04)', padding: '24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
          {[
            { stat: '23%', desc: 'of referrals lost to missed follow-up' },
            { stat: '15+ hrs', desc: 'per week chasing MRIs & records' },
            { stat: '$665k+', desc: 'revenue lost annually per practice' },
          ].map(({ stat, desc }) => (
            <div key={stat}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FF6B6B', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FORM + PREVIEW */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 28, alignItems: 'start' }}>

          {/* FORM */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '40px 36px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Free ROI Analysis</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 28, lineHeight: 1.2 }}>
              Get Your Numbers<br />Sent to Your Inbox
            </h2>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✓</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#00C9A7', marginBottom: 10 }}>Check your inbox</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 28 }}>
                  We sent your personalized ROI analysis to <strong style={{ color: '#fff' }}>{form.email}</strong>.<br />The next step is booking your free audit call.
                </div>
                <a href="https://calendly.com/parkerpiehl/30min" style={{ display: 'inline-block', background: '#00C9A7', color: '#080F1E', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 8, textDecoration: 'none' }}>
                  Book Free Audit Call →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input style={inputStyle} placeholder="Parker" value={form.name} onChange={set('name')} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Practice Email *</label>
                    <input style={inputStyle} type="email" placeholder="you@practice.com" value={form.email} onChange={set('email')} required />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Practice Name</label>
                  <input style={inputStyle} placeholder="Austin Orthopedic Associates" value={form.practice} onChange={set('practice')} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                  <div>
                    <label style={labelStyle}>Surgeons</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.surgeons} onChange={set('surgeons')}>
                      {[1,2,3,4,5,6,7,8,10,12,15].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Referrals / Week</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.referrals} onChange={set('referrals')}>
                      {[10,15,20,25,30,40,50,60,75,100].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Avg Case Value</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.caseValue} onChange={set('caseValue')}>
                      <option value="1500">$1,500</option>
                      <option value="2000">$2,000</option>
                      <option value="2500">$2,500</option>
                      <option value="3200">$3,200</option>
                      <option value="4000">$4,000</option>
                      <option value="5000">$5,000</option>
                      <option value="7500">$7,500</option>
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: '#00C9A7', color: '#080F1E', fontWeight: 700, fontSize: 15, padding: '15px', borderRadius: 10, border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? 0.7 : 1, fontFamily: 'inherit' }}>
                  {status === 'loading' ? 'Sending your analysis...' : 'Send My ROI Analysis →'}
                </button>
                {status === 'error' && <div style={{ fontSize: 13, color: '#FF6B6B', marginTop: 10, textAlign: 'center' }}>Something went wrong. Try again or email parker@jointsyncsystems.com</div>}
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', marginTop: 12, textAlign: 'center' }}>No spam. One email with your numbers + a calendar link.</div>
              </form>
            )}
          </div>

          {/* LIVE PREVIEW */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 90 }}>
            <div style={{ background: 'rgba(255,59,59,0.07)', border: '1px solid rgba(255,107,107,0.18)', borderRadius: 16, padding: '28px 26px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,107,107,0.65)', marginBottom: 16 }}>Estimated Annual Loss</div>
              <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#FF6B6B', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
                {fmt(totalLost)}+
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: `~${lostReferrals} referrals lost/wk`, sub: '23% miss rate' },
                  { label: `~${lostCases} cases missed/wk`, sub: '50% surgical conversion' },
                  { label: '$17,160/yr staff time', sub: '15 hrs/wk chasing records' },
                ].map(({ label, sub }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(0,201,167,0.07)', border: '1px solid rgba(0,201,167,0.18)', borderRadius: 16, padding: '24px 26px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(0,201,167,0.65)', marginBottom: 8 }}>JointSync Recovery Range</div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#00C9A7', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {fmt(recoveryLow)} – {fmt(recoveryHigh)}/yr
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Conservative estimate based on your inputs</div>
            </div>

            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '4px 0' }}>
              Numbers update as you fill the form
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '70px 48px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>The System</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 44 }}>Everything from fax to booked — automated.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {[
              { icon: '📋', title: 'Referral Intake', desc: 'Incoming faxes captured, parsed, and logged instantly. Zero staff touchpoint.' },
              { icon: '🔄', title: 'MRI & Record Chasing', desc: 'Automated follow-up sequences contact imaging centers until records arrive.' },
              { icon: '📅', title: 'Patient Scheduling', desc: 'Patients booked within hours of referral — not 4–6 days later.' },
              { icon: '📊', title: 'Live Dashboard', desc: 'Every referral, MRI status, and patient stage visible in real time.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'rgba(0,201,167,0.04)', border: '1px solid rgba(0,201,167,0.1)', borderRadius: 14, padding: '22px', display: 'flex', gap: 14 }}>
                <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 48px 80px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(0,201,167,0.1) 0%, rgba(0,201,167,0.03) 100%)', border: '1px solid rgba(0,201,167,0.18)', borderRadius: 20, padding: '56px 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Prefer to talk through it directly?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 30, maxWidth: 460, margin: '0 auto 30px' }}>
            30-minute audit call. We map your specific intake workflow and show you exactly where revenue is leaking.
          </p>
          <a href="https://calendly.com/parkerpiehl/30min" style={{ display: 'inline-block', background: '#00C9A7', color: '#080F1E', fontWeight: 700, fontSize: 15, padding: '15px 38px', borderRadius: 10, textDecoration: 'none' }}>
            Book Free Audit Call →
          </a>
          <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.22)', display: 'flex', justifyContent: 'center', gap: 16 }}>
            <span>No commitment</span><span>·</span><span>30 minutes</span><span>·</span><span>HIPAA Compliant</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '22px 48px', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>
        JointSync Systems &nbsp;·&nbsp; Clinical Continuity Automation for Orthopedic Practices &nbsp;·&nbsp; HIPAA Compliant
      </div>
    </div>
  );
}
