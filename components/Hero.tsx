export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">

      {/* Animated gradient background */}
      <div aria-hidden="true" className="hero-animated-gradient pointer-events-none absolute inset-0" />

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(ellipse at center, #2563eb 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── LEFT: copy ── */}
          <div className="flex-1 text-center lg:text-left">
            <p className="section-label mb-6">TradrPros &amp; ParkerFitness</p>

            <h1 className="text-6xl sm:text-7xl lg:text-[88px] font-black tracking-tight text-white leading-[1.02] mb-6">
              Education Built on{' '}
              <span className="text-blue-500">Real&nbsp;Experience</span>
            </h1>

            <p className="section-sub max-w-lg mb-10 text-base sm:text-lg lg:text-left">
              Parker here. I&apos;m 17 with 4 years of hands-on experience in both fitness
              training and financial markets. I put everything I&apos;ve learned into
              straightforward programs you can actually use.
            </p>

            {/* Social proof inline */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mb-10 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              <span>4 Years Real Experience</span>
              <span className="text-blue-600">·</span>
              <span>2 Programs</span>
              <span className="text-blue-600">·</span>
              <span>Trusted by Real Traders &amp; Athletes</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#trading"
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-colors text-sm"
              >
                Day Trading Education
              </a>
              <a
                href="#fitness"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-slate-700 hover:border-slate-500 text-white font-semibold rounded-md transition-colors text-sm"
              >
                Fitness Programs
              </a>
            </div>
          </div>

          {/* ── RIGHT: headshot placeholder ── */}
          <div className="shrink-0 w-64 sm:w-72 lg:w-80">
            <div className="relative">
              {/*
                ┌─ TO ADD YOUR PHOTO ───────────────────────────────────┐
                │ 1. Put your photo in the /public folder, e.g.         │
                │    /public/parker.jpg                                  │
                │ 2. Replace the <div class="...placeholder..."> below  │
                │    with:                                               │
                │    <img                                                │
                │      src="/parker.jpg"                                 │
                │      alt="Parker"                                      │
                │      className="w-full rounded-2xl object-cover       │
                │                 aspect-[3/4]"                          │
                │    />                                                  │
                └───────────────────────────────────────────────────────┘
              */}
              <div className="w-full aspect-[3/4] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 flex flex-col items-center justify-center gap-3 text-center relative overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/6 to-transparent pointer-events-none" />
                {/* Person icon */}
                <svg
                  className="w-20 h-20 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.8}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span className="text-xs font-bold tracking-widest uppercase text-slate-600">
                  Your&nbsp;Photo
                </span>
              </div>

              {/* Gradient overlay fading photo into background */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black to-transparent rounded-b-2xl pointer-events-none" />

              {/* Floating credential badge */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 backdrop-blur-sm border border-blue-600/40 whitespace-nowrap shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                <span className="text-xs font-semibold text-slate-300">TradrPros &amp; ParkerFitness</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex justify-center opacity-40">
          <svg
            className="w-5 h-5 text-slate-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
