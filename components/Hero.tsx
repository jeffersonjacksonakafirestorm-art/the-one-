export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">

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

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse at center, #2563eb 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Eyebrow */}
        <p className="section-label mb-6">TradrPros &amp; ParkerFitness</p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
          Education Built on{' '}
          <span className="text-blue-500">Real Experience</span>
        </h1>

        {/* Sub */}
        <p className="section-sub max-w-xl mx-auto mb-10 text-base sm:text-lg">
          Parker here. I am 17 with 4 years of hands-on experience in both fitness
          training and financial markets. I put everything I have learned into
          straightforward programs you can actually use.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
