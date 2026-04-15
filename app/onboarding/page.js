'use client';
import { useState, useEffect } from 'react';

const s = {
  page: { minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '48px 24px' },
  header: { width: '100%', maxWidth: 580, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 },
  logo: { fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', textDecoration: 'none', color: '#fff' },
  stepIndicator: { display: 'flex', alignItems: 'center', gap: 8 },
  stepDot: { width: 8, height: 8, borderRadius: '50%', background: '#222', border: '1px solid #333' },
  stepDotActive: { width: 8, height: 8, borderRadius: '50%', background: '#fff' },
  stepDotDone: { width: 8, height: 8, borderRadius: '50%', background: '#fff', opacity: 0.4 },
  card: { width: '100%', maxWidth: 580, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 20, padding: '44px 40px' },
  stepTag: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 },
  sub: { fontSize: 14, color: '#888', lineHeight: 1.65, marginBottom: 32 },
  group: { marginBottom: 18 },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' },
  input: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '11px 14px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' },
  textarea: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '11px 14px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 80 },
  infoBox: { background: '#111', border: '1px solid #222', borderRadius: 10, padding: '16px 20px', marginBottom: 24 },
  infoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 14 },
  infoLabel: { color: '#888', fontSize: 13 },
  infoValue: { color: '#fff', fontWeight: 600, fontSize: 13 },
  serviceInput: { display: 'flex', gap: 10, marginBottom: 12 },
  serviceInputName: { flex: 1, background: '#111', border: '1px solid #222', borderRadius: 8, padding: '10px 14px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none' },
  serviceInputPrice: { width: 120, background: '#111', border: '1px solid #222', borderRadius: 8, padding: '10px 14px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none' },
  addBtn: { background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '10px 18px', fontFamily: 'inherit', fontSize: 13, color: '#fff', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  serviceList: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  serviceItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px' },
  serviceName: { fontSize: 14, fontWeight: 600 },
  servicePrice: { fontSize: 13, color: '#888' },
  serviceRemove: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, padding: '2px 6px' },
  emptyServices: { textAlign: 'center', padding: '24px 0', color: '#555', fontSize: 13, border: '1px dashed #222', borderRadius: 10, marginBottom: 16 },
  toggleRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid #1a1a1a' },
  toggleLabel: { fontSize: 14, fontWeight: 600 },
  toggleSub: { fontSize: 12, color: '#888', marginTop: 3 },
  toggle: { position: 'relative', width: 44, height: 24, cursor: 'pointer' },
  toggleTrack: (on) => ({ width: 44, height: 24, borderRadius: 12, background: on ? '#fff' : '#222', border: '1px solid ' + (on ? '#fff' : '#333'), position: 'relative', transition: 'background 0.15s' }),
  toggleThumb: (on) => ({ position: 'absolute', top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: on ? '#000' : '#555', transition: 'left 0.15s' }),
  actions: { display: 'flex', gap: 12, marginTop: 32 },
  btnPrimary: { flex: 1, background: '#fff', color: '#000', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, padding: '13px 24px', border: 'none', borderRadius: 10, cursor: 'pointer' },
  btnSecondary: { background: 'none', border: '1px solid #333', borderRadius: 10, padding: '13px 20px', fontFamily: 'inherit', fontSize: 14, color: '#888', cursor: 'pointer' },
  skipBtn: { background: 'none', border: 'none', color: '#555', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', padding: '8px 0', textAlign: 'center', width: '100%', marginTop: 12 },
  error: { background: 'rgba(255,255,255,0.04)', border: '1px solid #333', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 16 },
  successIcon: { textAlign: 'center', padding: '16px 0 28px' },
  successTitle: { fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 12 },
  successSub: { fontSize: 15, color: '#888', lineHeight: 1.7, textAlign: 'center', marginBottom: 32 },
};

const TOTAL_STEPS = 4;

export default function Onboarding() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Step 2: Services
  const [services, setServices] = useState([]);
  const [newSvcName, setNewSvcName] = useState('');
  const [newSvcPrice, setNewSvcPrice] = useState('');

  // Step 3: First customer
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });

  // Step 4: Email prefs
  const [emailPrefs, setEmailPrefs] = useState({ fromName: '', replyTo: '', approveBeforeSend: true, signature: '' });

  useEffect(() => {
    const authed = localStorage.getItem('crai_authed');
    if (!authed) { window.location.href = '/login'; return; }
    const onboardingDone = localStorage.getItem('onboarding_complete');
    if (onboardingDone) { window.location.href = '/dashboard'; return; }
    const stored = localStorage.getItem('crai_user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setEmailPrefs(p => ({ ...p, fromName: u.owner_name || u.business_name || '', replyTo: u.email || '', signature: u.owner_name ? `— ${u.owner_name}\n${u.business_name}` : '' }));
    }
  }, []);

  function addService() {
    if (!newSvcName.trim()) return;
    setServices(s => [...s, { id: Date.now().toString(), name: newSvcName.trim(), price: newSvcPrice ? parseFloat(newSvcPrice) : null }]);
    setNewSvcName('');
    setNewSvcPrice('');
  }

  function removeService(id) {
    setServices(s => s.filter(x => x.id !== id));
  }

  function nextStep() {
    setError('');
    if (step === 2 && services.length === 0) {
      setError('Please add at least one service before continuing.');
      return;
    }
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      finish();
    }
  }

  function prevStep() {
    if (step > 1) setStep(s => s - 1);
  }

  function finish() {
    // Save all onboarding data
    localStorage.setItem('gw_services', JSON.stringify(services));
    localStorage.setItem('gw_email_prefs', JSON.stringify(emailPrefs));

    // Save first customer if filled
    if (customer.name.trim()) {
      const existing = JSON.parse(localStorage.getItem('gw_customers') || '[]');
      const newCustomer = {
        id: Date.now().toString(),
        ...customer,
        created_at: new Date().toISOString(),
        last_job: null,
        reactivation_date: null,
        unsubscribed: false,
      };
      localStorage.setItem('gw_customers', JSON.stringify([...existing, newCustomer]));
    }

    localStorage.setItem('onboarding_complete', '1');
    window.location.href = '/dashboard';
  }

  if (!user) return <div style={{ ...s.page, justifyContent: 'center', color: '#555', fontSize: 14 }}>Loading...</div>;

  const stepDots = Array.from({ length: TOTAL_STEPS }, (_, i) => {
    const n = i + 1;
    const style = n === step ? s.stepDotActive : n < step ? s.stepDotDone : s.stepDot;
    return <div key={n} style={style} />;
  });

  return (
    <div style={s.page}>
      <div style={s.header}>
        <a href="/" style={s.logo}>Groundwork</a>
        <div style={s.stepIndicator}>{stepDots}</div>
      </div>

      <div style={s.card}>
        {/* STEP 1: Confirm business details */}
        {step === 1 && (
          <>
            <div style={s.stepTag}>Step 1 of {TOTAL_STEPS}</div>
            <h2 style={s.title}>Confirm your details</h2>
            <p style={s.sub}>We pulled this from your signup. Make sure everything looks right before we continue.</p>
            <div style={s.infoBox}>
              <div style={s.infoRow}><span style={s.infoLabel}>Business</span><span style={s.infoValue}>{user.business_name}</span></div>
              <div style={s.infoRow}><span style={s.infoLabel}>Owner</span><span style={s.infoValue}>{user.owner_name}</span></div>
              <div style={s.infoRow}><span style={s.infoLabel}>Email</span><span style={s.infoValue}>{user.email}</span></div>
              <div style={s.infoRow}><span style={s.infoLabel}>Phone</span><span style={s.infoValue}>{user.phone}</span></div>
              <div style={s.infoRow}><span style={s.infoLabel}>Trade</span><span style={s.infoValue}>{user.industry}</span></div>
            </div>
            <div style={s.actions}>
              <button style={s.btnPrimary} onClick={nextStep}>Looks good &rarr;</button>
            </div>
          </>
        )}

        {/* STEP 2: Service menu */}
        {step === 2 && (
          <>
            <div style={s.stepTag}>Step 2 of {TOTAL_STEPS}</div>
            <h2 style={s.title}>Build your service menu</h2>
            <p style={s.sub}>Add the services you offer with your standard rates. Groundwork uses these to auto-fill quotes and invoices. You can always add more later.</p>
            {error && <div style={s.error}>{error}</div>}
            <div style={s.serviceInput}>
              <input
                style={s.serviceInputName}
                placeholder="e.g. Roof Inspection"
                value={newSvcName}
                onChange={e => setNewSvcName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addService()}
              />
              <input
                style={s.serviceInputPrice}
                placeholder="Price ($)"
                type="number"
                min="0"
                value={newSvcPrice}
                onChange={e => setNewSvcPrice(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addService()}
              />
              <button style={s.addBtn} onClick={addService}>Add</button>
            </div>
            {services.length === 0 ? (
              <div style={s.emptyServices}>No services added yet. Add your first service above.</div>
            ) : (
              <div style={s.serviceList}>
                {services.map(svc => (
                  <div key={svc.id} style={s.serviceItem}>
                    <span style={s.serviceName}>{svc.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={s.servicePrice}>{svc.price != null ? `$${svc.price.toLocaleString()}` : 'Price TBD'}</span>
                      <button style={s.serviceRemove} onClick={() => removeService(svc.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={s.actions}>
              <button style={s.btnSecondary} onClick={prevStep}>Back</button>
              <button style={s.btnPrimary} onClick={nextStep}>Continue &rarr;</button>
            </div>
          </>
        )}

        {/* STEP 3: First customer */}
        {step === 3 && (
          <>
            <div style={s.stepTag}>Step 3 of {TOTAL_STEPS}</div>
            <h2 style={s.title}>Add your first customer</h2>
            <p style={s.sub}>Optional, but a great way to hit the ground running. You can import more from the dashboard at any time.</p>
            <div style={s.group}>
              <label style={s.label}>Full Name</label>
              <input style={s.input} type="text" placeholder="Jane Doe" value={customer.name} onChange={e => setCustomer(c => ({ ...c, name: e.target.value }))} />
            </div>
            <div style={s.group}>
              <label style={s.label}>Email</label>
              <input style={s.input} type="email" placeholder="jane@example.com" value={customer.email} onChange={e => setCustomer(c => ({ ...c, email: e.target.value }))} />
            </div>
            <div style={s.group}>
              <label style={s.label}>Phone</label>
              <input style={s.input} type="tel" placeholder="(555) 000-0000" value={customer.phone} onChange={e => setCustomer(c => ({ ...c, phone: e.target.value }))} />
            </div>
            <div style={s.group}>
              <label style={s.label}>Address</label>
              <input style={s.input} type="text" placeholder="123 Main St, Phoenix, AZ 85001" value={customer.address} onChange={e => setCustomer(c => ({ ...c, address: e.target.value }))} />
            </div>
            <div style={s.actions}>
              <button style={s.btnSecondary} onClick={prevStep}>Back</button>
              <button style={s.btnPrimary} onClick={nextStep}>Continue &rarr;</button>
            </div>
            <button style={s.skipBtn} onClick={nextStep}>Skip for now</button>
          </>
        )}

        {/* STEP 4: Email preferences */}
        {step === 4 && (
          <>
            <div style={s.stepTag}>Step 4 of {TOTAL_STEPS}</div>
            <h2 style={s.title}>Set up your emails</h2>
            <p style={s.sub}>Groundwork will send quotes, follow-ups, invoices, and reactivation emails on your behalf. Set your preferences here.</p>
            <div style={s.group}>
              <label style={s.label}>From Name</label>
              <input style={s.input} type="text" placeholder="John at ABC Roofing" value={emailPrefs.fromName} onChange={e => setEmailPrefs(p => ({ ...p, fromName: e.target.value }))} />
            </div>
            <div style={s.group}>
              <label style={s.label}>Reply-To Email</label>
              <input style={s.input} type="email" placeholder="john@abcroofing.com" value={emailPrefs.replyTo} onChange={e => setEmailPrefs(p => ({ ...p, replyTo: e.target.value }))} />
            </div>
            <div style={s.group}>
              <label style={s.label}>Email Signature</label>
              <textarea style={s.textarea} placeholder={'— John Smith\nABC Roofing Co.\n(555) 000-0000'} value={emailPrefs.signature} onChange={e => setEmailPrefs(p => ({ ...p, signature: e.target.value }))} />
            </div>
            <div style={s.toggleRow}>
              <div>
                <div style={s.toggleLabel}>Review emails before sending</div>
                <div style={s.toggleSub}>You&apos;ll approve each email in your Pending tab before it goes out. Recommended.</div>
              </div>
              <div style={s.toggle} onClick={() => setEmailPrefs(p => ({ ...p, approveBeforeSend: !p.approveBeforeSend }))}>
                <div style={s.toggleTrack(emailPrefs.approveBeforeSend)}>
                  <div style={s.toggleThumb(emailPrefs.approveBeforeSend)} />
                </div>
              </div>
            </div>
            <div style={s.actions}>
              <button style={s.btnSecondary} onClick={prevStep}>Back</button>
              <button style={s.btnPrimary} onClick={nextStep}>Finish setup &rarr;</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
