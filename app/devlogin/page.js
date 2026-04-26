'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DevLoginInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState('logging in...');

  useEffect(() => {
    const phrase = params.get('k');
    if (!phrase) { setStatus('nothing to see here'); return; }

    fetch('/api/auth/backdoor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phrase }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.ok) window.location.href = '/chat';
        else setStatus('nothing to see here');
      })
      .catch(() => setStatus('nothing to see here'));
  }, []);

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontFamily: 'monospace', fontSize: 13 }}>
      {status}
    </div>
  );
}

export default function DevLogin() {
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <DevLoginInner />
    </Suspense>
  );
}
