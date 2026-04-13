'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function LeadMagnet() {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [msg, setMsg]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed.')
      setStatus('success')
      setName('')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section id="free" className="bg-slate-950 py-24 sm:py-32 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="max-w-xl">
          <p className="section-label mb-3">Free Resources</p>
          <h2 className="section-heading mb-4">Get the Free Starter Guide</h2>
          <p className="section-sub mb-8">
            Drop your name and email and I will send you a free resource covering
            the foundational concepts I wish I had when I started — covering both
            fitness and markets.
          </p>

          {status === 'success' ? (
            <div className="rounded-xl bg-blue-950/50 border border-blue-700/40 p-6">
              <p className="text-white font-semibold mb-1">You are on the list.</p>
              <p className="text-slate-400 text-sm">
                Check your inbox shortly. If you do not see it, check your spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                  First Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Parker"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none rounded-md text-white placeholder-slate-500 text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none rounded-md text-white placeholder-slate-500 text-sm transition-colors"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{msg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors text-sm"
              >
                {status === 'loading' ? 'Sending...' : 'Send Me the Free Guide'}
              </button>

              <p className="text-xs text-slate-600">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
