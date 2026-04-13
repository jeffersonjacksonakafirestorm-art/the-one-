'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'TradrPros',        href: '#trading' },
    { label: 'ParkerFitness',    href: '#fitness'  },
    { label: 'Free Resources',   href: '#free'     },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-black/95 backdrop-blur shadow-lg shadow-black/40' : 'bg-transparent'
      } border-b border-slate-800/60`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            {/* Logo placeholder — replace with <Image> once you have an asset */}
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">P</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight leading-none">
              PARKER
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#trading"
            className="hidden md:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Get Started
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-black border-t border-slate-800 px-4 pb-4 pt-2 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#trading"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Get Started
          </a>
        </nav>
      )}
    </header>
  )
}
