'use client';
import { useState, useEffect } from 'react';

const STATUSES = ['new', 'quoted', 'booked', 'in_progress', 'complete', 'invoiced', 'paid'];
const STATUS_LABELS = { new: 'New', quoted: 'Quoted', booked: 'Booked', in_progress: 'In Progress', complete: 'Complete', invoiced: 'Invoiced', paid: 'Paid' };
const TABS = ['Jobs', 'Pending', 'Customers', 'Pulse', 'Settings'];

const s = {
  page: { minHeight: '100vh', background: '#000', fontFamily: "'Inter Tight', system-ui, sans-serif", color: '#fff' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: 56, borderBottom: '1px solid #1a1a1a' },
  logo: { fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em' },
  bizName: { fontSize: 13, color: '#555' },
  logoutBtn: { background: 'none', border: '1px solid #1a1a1a', borderRadius: 8, padding: '6px 14px', fontFamily: 'inherit', fontSize: 13, color: '#555', cursor: 'pointer' },
  main: { padding: '0 28px 60px' },
  tabs: { display: 'flex', borderBottom: '1px solid #1a1a1a', marginBottom: 32 },
  tab: { padding: '14px 18px', fontSize: 13, fontWeight: 600, color: '#555', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', borderBottom: '2px solid transparent' },
  tabActive: { color: '#fff', borderBottom: '2px solid #fff' },
  // Pipeline
  pipeline: { display: 'flex', gap: 1, background: '#111', border: '1px solid #111', borderRadius: 12, overflow: 'auto', minHeight: 500 },
  col: { minWidth: 220, background: '#000', padding: 16, flex: 1 },
  colHead: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 12, display: 'flex', justifyContent: 'space-between' },
  colCount: { background: '#111', borderRadius: 4, padding: '1px 7px', fontSize: 11 },
  card: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 10, padding: '14px 16px', marginBottom: 8, cursor: 'pointer' },
  cardName: { fontSize: 13, fontWeight: 700, marginBottom: 4 },
  cardService: { fontSize: 12, color: '#888', marginBottom: 6 },
  cardPrice: { fontSize: 13, fontWeight: 700 },
  cardDate: { fontSize: 11, color: '#555', marginTop: 4 },
  // Add Job
  addBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '9px 18px', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 24 },
  // Modal
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 24 },
  modal: { background: '#0a0a0a', border: '1px solid #222', borderRadius: 16, padding: '36px 32px', width: '100%', maxWidth: 480 },
  modalTitle: { fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24 },
  group: { marginBottom: 16 },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' },
  input: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '10px 13px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' },
  select: { width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: '10px 13px', fontFamily: 'inherit', fontSize: 14, color: '#fff', outline: 'none', appearance: 'none', boxSizing: 'border-box' },
  modalBtns: { display: 'flex', gap: 10, marginTop: 24 },
  btnPrimary: { flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: 12, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' },
  btnSecondary: { background: 'none', border: '1px solid #222', borderRadius: 8, padding: '12px 18px', fontFamily: 'inherit', fontSize: 14, color: '#888', cursor: 'pointer' },
  // Status buttons
  statusBtns: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  statusBtn: { background: 'none', border: '1px solid #222', borderRadius: 6, padding: '5px 10px', fontFamily: 'inherit', fontSize: 11, fontWeight: 600, color: '#888', cursor: 'pointer' },
  statusBtnActive: { background: '#fff', color: '#000', border: '1px solid #fff' },
  // Pending
  pendingCard: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 12, padding: 24, marginBottom: 12 },
  pendingTo: { fontSize: 12, color: '#888', marginBottom: 6 },
  pendingSubject: { fontSize: 15, fontWeight: 700, marginBottom: 12 },
  pendingPreview: { fontSize: 13, color: '#888', lineHeight: 1.6, padding: 16, background: '#111', borderRadius: 8, marginBottom: 16 },
  pendingBtns: { display: 'flex', gap: 8 },
  approveBtn: { background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '9px 18px', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' },
  editBtn: { background: 'none', border: '1px solid #333', borderRadius: 8, padding: '9px 18px', fontFamily: 'inherit', fontSize: 13, color: '#fff', cursor: 'pointer' },
  dismissBtn: { background: 'none', border: 'none', padding: '9px 12px', fontFamily: 'inherit', fontSize: 13, color: '#555', cursor: 'pointer' },
  // Customers
  customerRow: { display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #0a0a0a' },
  customerAv: { width: 36, height: 36, borderRadius: '50%', background: '#111', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 },
  customerName: { fontSize: 14, fontWeight: 600, marginBottom: 2 },
  customerMeta: { fontSize: 12, color: '#555' },
  // Pulse
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden', marginBottom: 24 },
  kpi: { background: '#000', padding: '24px 20px' },
  kpiVal: { fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 },
  kpiLabel: { fontSize: 12, color: '#888' },
  // Settings
  settingsSection: { background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 12, padding: 24, marginBottom: 16 },
  settingsH3: { fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.01em' },
  serviceRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #111' },
  serviceRowLast: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' },
  removeBtn: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, padding: '0 4px' },
  toggle: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' },
  toggleLabel: { fontSize: 14, fontWeight: 600 },
  toggleSub: { fontSize: 12, color: '#888', marginTop: 2 },
  toggleBtn: { width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 },
  // Empty
  empty: { textAlign: 'center', padding: '60px 0', color: '#555' },
  emptyIcon: { fontSize: 32, marginBottom: 12 },
  emptyText: { fontSize: 14 },
};

function fmt(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('Jobs');
  const [jobs, setJobs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pending, setPending] = useState([]);
  const [services, setServices] = useState([]);
  const [prefs, setPrefs] = useState({ approveBeforeSend: true, fromName: '', replyTo: '', signature: '' });
  const [showAddJob, setShowAddJob] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({ customer_id: '', customer_name: '', customer_email: '', service: '', price: '', notes: '' });
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [newService, setNewService] = useState({ name: '', price: '' });

  useEffect(() => {
    if (!localStorage.getItem('crai_authed')) { window.location.href = '/login'; return; }
    if (!localStorage.getItem('onboarding_complete')) { window.location.href = '/onboarding'; return; }
    const u = JSON.parse(localStorage.getItem('crai_user') || '{}');
    setUser(u);
    setJobs(JSON.parse(localStorage.getItem('gw_jobs') || '[]'));
    setCustomers(JSON.parse(localStorage.getItem('gw_customers') || '[]'));
    setPending(JSON.parse(localStorage.getItem('gw_pending') || '[]'));
    setServices(JSON.parse(localStorage.getItem('gw_services') || '[]'));
    setPrefs(JSON.parse(localStorage.getItem('gw_prefs') || '{"approveBeforeSend":true,"fromName":"","replyTo":"","signature":""}'));
  }, []);

  function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function addJob(e) {
    e.preventDefault();
    const job = { ...newJob, id: Date.now().toString(), status: 'new', created_at: new Date().toISOString() };
    const updated = [job, ...jobs];
    setJobs(updated); save('gw_jobs', updated);
    setNewJob({ customer_id: '', customer_name: '', customer_email: '', service: '', price: '', notes: '' });
    setShowAddJob(false);
  }

  function updateStatus(jobId, status) {
    const updated = jobs.map(j => j.id === jobId ? { ...j, status } : j);
    setJobs(updated); save('gw_jobs', updated);
    setSelectedJob(prev => prev?.id === jobId ? { ...prev, status } : prev);
  }

  function addCustomer(e) {
    e.preventDefault();
    const customer = { ...newCustomer, id: Date.now().toString(), created_at: new Date().toISOString() };
    const updated = [customer, ...customers];
    setCustomers(updated); save('gw_customers', updated);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
    setShowAddCustomer(false);
  }

  function addService(e) {
    e.preventDefault();
    if (!newService.name || !newService.price) return;
    const updated = [...services, { id: Date.now().toString(), ...newService }];
    setServices(updated); save('gw_services', updated);
    setNewService({ name: '', price: '' });
  }

  function removeService(id) {
    const updated = services.filter(s => s.id !== id);
    setServices(updated); save('gw_services', updated);
  }

  function savePrefs(updates) {
    const updated = { ...prefs, ...updates };
    setPrefs(updated); save('gw_prefs', updated);
  }

  function approvePending(id) {
    const updated = pending.filter(p => p.id !== id);
    setPending(updated); save('gw_pending', updated);
  }

  const weekStats = {
    total: jobs.filter(j => new Date(j.created_at) > new Date(Date.now() - 7 * 86400000)).length,
    booked: jobs.filter(j => ['booked', 'in_progress', 'complete', 'invoiced', 'paid'].includes(j.status)).length,
    revenue: jobs.filter(j => j.status === 'paid').reduce((s, j) => s + (parseFloat(j.price) || 0), 0),
    closeRate: jobs.length > 0 ? Math.round((jobs.filter(j => j.status !== 'new').length / jobs.length) * 100) : 0,
    invoiced: jobs.filter(j => ['invoiced', 'paid'].includes(j.status)).length,
    outstanding: jobs.filter(j => j.status === 'invoiced').reduce((s, j) => s + (parseFloat(j.price) || 0), 0),
  };

  if (!user) return <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 14 }}>Loading...</div>;

  return (
    <div style={s.page}>
      {/* Nav */}
      <nav style={s.nav}>
        <span style={s.logo}>Groundwork</span>
        <span style={s.bizName}>{user.business_name}</span>
        <button style={s.logoutBtn} onClick={() => { localStorage.removeItem('crai_authed'); window.location.href = '/login'; }}>Sign Out</button>
      </nav>

      <div style={s.main}>
        {/* Tabs */}
        <div style={s.tabs}>
          {TABS.map(t => (
            <button key={t} style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }} onClick={() => setTab(t)}>
              {t}{t === 'Pending' && pending.length > 0 ? ` (${pending.length})` : ''}
            </button>
          ))}
        </div>

        {/* JOBS TAB */}
        {tab === 'Jobs' && (
          <>
            <button style={s.addBtn} onClick={() => setShowAddJob(true)}>+ Add Job</button>
            <div style={s.pipeline}>
              {STATUSES.map((status, si) => {
                const colJobs = jobs.filter(j => j.status === status);
                return (
                  <div key={status} style={{ ...s.col, ...(si > 0 ? { borderLeft: '1px solid #111' } : {}) }}>
                    <div style={s.colHead}>
                      <span>{STATUS_LABELS[status]}</span>
                      <span style={s.colCount}>{colJobs.length}</span>
                    </div>
                    {colJobs.map(job => (
                      <div key={job.id} style={s.card} onClick={() => setSelectedJob(job)}>
                        <div style={s.cardName}>{job.customer_name || 'Unknown'}</div>
                        <div style={s.cardService}>{job.service}</div>
                        {job.price && <div style={s.cardPrice}>${parseFloat(job.price).toLocaleString()}</div>}
                        <div style={s.cardDate}>{fmt(job.created_at)}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* PENDING TAB */}
        {tab === 'Pending' && (
          pending.length === 0
            ? <div style={s.empty}><div style={s.emptyIcon}>✓</div><p style={s.emptyText}>No emails waiting for approval</p></div>
            : pending.map(p => (
              <div key={p.id} style={s.pendingCard}>
                <div style={s.pendingTo}>To: {p.to}</div>
                <div style={s.pendingSubject}>{p.subject}</div>
                <div style={s.pendingPreview} dangerouslySetInnerHTML={{ __html: p.html?.replace(/<[^>]+>/g, ' ').slice(0, 300) + '...' }} />
                <div style={s.pendingBtns}>
                  <button style={s.approveBtn} onClick={() => approvePending(p.id)}>Approve & Send</button>
                  <button style={s.dismissBtn} onClick={() => approvePending(p.id)}>Dismiss</button>
                </div>
              </div>
            ))
        )}

        {/* CUSTOMERS TAB */}
        {tab === 'Customers' && (
          <>
            <button style={s.addBtn} onClick={() => setShowAddCustomer(true)}>+ Add Customer</button>
            {customers.length === 0
              ? <div style={s.empty}><div style={s.emptyIcon}>👤</div><p style={s.emptyText}>No customers yet</p></div>
              : customers.map(c => (
                <div key={c.id} style={s.customerRow}>
                  <div style={s.customerAv}>{initials(c.name)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={s.customerName}>{c.name}</div>
                    <div style={s.customerMeta}>{c.email}{c.phone ? ` · ${c.phone}` : ''}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#555' }}>{fmt(c.created_at)}</div>
                </div>
              ))
            }
          </>
        )}

        {/* PULSE TAB */}
        {tab === 'Pulse' && (
          <>
            <div style={s.kpiGrid}>
              <div style={s.kpi}><div style={s.kpiVal}>{weekStats.total}</div><div style={s.kpiLabel}>Jobs this week</div></div>
              <div style={s.kpi}><div style={s.kpiVal}>{weekStats.booked}</div><div style={s.kpiLabel}>Jobs booked</div></div>
              <div style={s.kpi}><div style={s.kpiVal}>{weekStats.closeRate}%</div><div style={s.kpiLabel}>Close rate</div></div>
              <div style={s.kpi}><div style={s.kpiVal}>{weekStats.invoiced}</div><div style={s.kpiLabel}>Invoiced</div></div>
              <div style={s.kpi}><div style={{ ...s.kpiVal, fontSize: 24 }}>${weekStats.outstanding.toLocaleString()}</div><div style={s.kpiLabel}>Outstanding</div></div>
              <div style={s.kpi}><div style={{ ...s.kpiVal, fontSize: 24 }}>${weekStats.revenue.toLocaleString()}</div><div style={s.kpiLabel}>Revenue collected</div></div>
            </div>
            <p style={{ fontSize: 13, color: '#555' }}>Weekly pulse report emails every Monday at 7am once email is configured.</p>
          </>
        )}

        {/* SETTINGS TAB */}
        {tab === 'Settings' && (
          <>
            <div style={s.settingsSection}>
              <h3 style={s.settingsH3}>Service Menu</h3>
              {services.map((svc, i) => (
                <div key={svc.id} style={i === services.length - 1 ? s.serviceRowLast : s.serviceRow}>
                  <span style={{ flex: 1, fontSize: 14 }}>{svc.name}</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>${svc.price}</span>
                  <button style={s.removeBtn} onClick={() => removeService(svc.id)}>×</button>
                </div>
              ))}
              <form onSubmit={addService} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <input style={{ ...s.input, flex: 1 }} placeholder="Service name" value={newService.name} onChange={e => setNewService(p => ({ ...p, name: e.target.value }))} />
                <input style={{ ...s.input, width: 100 }} placeholder="Price" value={newService.price} onChange={e => setNewService(p => ({ ...p, price: e.target.value }))} />
                <button type="submit" style={{ ...s.btnPrimary, flex: 'none', padding: '10px 16px' }}>Add</button>
              </form>
            </div>

            <div style={s.settingsSection}>
              <h3 style={s.settingsH3}>Email Preferences</h3>
              <div style={s.toggle}>
                <div>
                  <div style={s.toggleLabel}>Approve before send</div>
                  <div style={s.toggleSub}>Review every automated email before it goes out</div>
                </div>
                <button
                  style={{ ...s.toggleBtn, background: prefs.approveBeforeSend ? '#fff' : '#222' }}
                  onClick={() => savePrefs({ approveBeforeSend: !prefs.approveBeforeSend })}
                />
              </div>
              <div style={s.group}>
                <label style={s.label}>From Name</label>
                <input style={s.input} value={prefs.fromName} onChange={e => savePrefs({ fromName: e.target.value })} placeholder={user.business_name} />
              </div>
              <div style={s.group}>
                <label style={s.label}>Reply-To Email</label>
                <input style={s.input} type="email" value={prefs.replyTo} onChange={e => savePrefs({ replyTo: e.target.value })} placeholder={user.email} />
              </div>
              <div style={s.group}>
                <label style={s.label}>Email Signature</label>
                <textarea style={{ ...s.input, minHeight: 80, resize: 'vertical' }} value={prefs.signature} onChange={e => savePrefs({ signature: e.target.value })} placeholder={`— ${user.business_name}`} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ADD JOB MODAL */}
      {showAddJob && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowAddJob(false)}>
          <div style={s.modal}>
            <div style={s.modalTitle}>Add Job</div>
            <form onSubmit={addJob}>
              <div style={s.group}>
                <label style={s.label}>Customer</label>
                <select style={s.select} value={newJob.customer_id} onChange={e => {
                  const c = customers.find(c => c.id === e.target.value);
                  setNewJob(p => ({ ...p, customer_id: e.target.value, customer_name: c?.name || '', customer_email: c?.email || '' }));
                }}>
                  <option value="">Select customer</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              {!newJob.customer_id && (
                <>
                  <div style={s.group}>
                    <label style={s.label}>Or enter name</label>
                    <input style={s.input} placeholder="Customer name" value={newJob.customer_name} onChange={e => setNewJob(p => ({ ...p, customer_name: e.target.value }))} />
                  </div>
                  <div style={s.group}>
                    <label style={s.label}>Customer Email</label>
                    <input style={s.input} type="email" placeholder="customer@email.com" value={newJob.customer_email} onChange={e => setNewJob(p => ({ ...p, customer_email: e.target.value }))} />
                  </div>
                </>
              )}
              <div style={s.group}>
                <label style={s.label}>Service</label>
                <select style={s.select} value={newJob.service} onChange={e => {
                  const svc = services.find(s => s.name === e.target.value);
                  setNewJob(p => ({ ...p, service: e.target.value, price: svc?.price || p.price }));
                }}>
                  <option value="">Select service</option>
                  {services.map(s => <option key={s.id} value={s.name}>{s.name} — ${s.price}</option>)}
                  <option value="__custom">Custom...</option>
                </select>
                {newJob.service === '__custom' && (
                  <input style={{ ...s.input, marginTop: 8 }} placeholder="Service name" onChange={e => setNewJob(p => ({ ...p, service: e.target.value }))} />
                )}
              </div>
              <div style={s.group}>
                <label style={s.label}>Price</label>
                <input style={s.input} type="number" placeholder="0" value={newJob.price} onChange={e => setNewJob(p => ({ ...p, price: e.target.value }))} />
              </div>
              <div style={s.group}>
                <label style={s.label}>Notes (optional)</label>
                <input style={s.input} placeholder="Any details..." value={newJob.notes} onChange={e => setNewJob(p => ({ ...p, notes: e.target.value }))} />
              </div>
              <div style={s.modalBtns}>
                <button type="button" style={s.btnSecondary} onClick={() => setShowAddJob(false)}>Cancel</button>
                <button type="submit" style={s.btnPrimary}>Add Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JOB DETAIL MODAL */}
      {selectedJob && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setSelectedJob(null)}>
          <div style={s.modal}>
            <div style={s.modalTitle}>{selectedJob.customer_name}</div>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>{selectedJob.service}</p>
            {selectedJob.price && <p style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>${parseFloat(selectedJob.price).toLocaleString()}</p>}
            {selectedJob.customer_email && <p style={{ fontSize: 13, color: '#555', marginBottom: 16 }}>{selectedJob.customer_email}</p>}
            {selectedJob.notes && <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>{selectedJob.notes}</p>}
            <div style={s.label}>Move to</div>
            <div style={s.statusBtns}>
              {STATUSES.map(st => (
                <button key={st} style={{ ...s.statusBtn, ...(selectedJob.status === st ? s.statusBtnActive : {}) }}
                  onClick={() => updateStatus(selectedJob.id, st)}>
                  {STATUS_LABELS[st]}
                </button>
              ))}
            </div>
            <div style={s.modalBtns}>
              <button style={s.btnSecondary} onClick={() => setSelectedJob(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOMER MODAL */}
      {showAddCustomer && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowAddCustomer(false)}>
          <div style={s.modal}>
            <div style={s.modalTitle}>Add Customer</div>
            <form onSubmit={addCustomer}>
              <div style={s.group}><label style={s.label}>Name</label><input style={s.input} required value={newCustomer.name} onChange={e => setNewCustomer(p => ({ ...p, name: e.target.value }))} /></div>
              <div style={s.group}><label style={s.label}>Email</label><input style={s.input} type="email" value={newCustomer.email} onChange={e => setNewCustomer(p => ({ ...p, email: e.target.value }))} /></div>
              <div style={s.group}><label style={s.label}>Phone</label><input style={s.input} type="tel" value={newCustomer.phone} onChange={e => setNewCustomer(p => ({ ...p, phone: e.target.value }))} /></div>
              <div style={s.group}><label style={s.label}>Address</label><input style={s.input} value={newCustomer.address} onChange={e => setNewCustomer(p => ({ ...p, address: e.target.value }))} /></div>
              <div style={s.modalBtns}>
                <button type="button" style={s.btnSecondary} onClick={() => setShowAddCustomer(false)}>Cancel</button>
                <button type="submit" style={s.btnPrimary}>Add Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
