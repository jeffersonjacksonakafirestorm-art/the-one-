import ProductCard from './ProductCard'

const TRADING_URL = process.env.NEXT_PUBLIC_GUMROAD_TRADING_URL

export default function TradingSection() {
  return (
    <section id="trading" className="bg-slate-950 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-3">Day Trading Education</p>
          <h2 className="section-heading mb-4">TradrPros</h2>
          <p className="section-sub max-w-xl">
            Self-taught over 4 years of consistent market study. These guides cover
            what I actually use — no fluff, no promises of overnight riches. Educational
            content only. Not financial advice.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          <ProductCard
            title="Day Trading Foundations"
            description="A complete breakdown of the core concepts I spent 4 years learning: technical analysis, chart reading, risk management, and building a consistent process."
            price="See on Gumroad"
            features={[
              'Chart pattern reference guide',
              'Risk and position sizing framework',
              'Entry and exit strategy breakdown',
              'Technical indicators explained simply',
              'Trading psychology fundamentals',
            ]}
            buyUrl={TRADING_URL}
            badge="Available Now"
          />
          <ProductCard
            title="Advanced Playbook"
            description="Deeper dives into setups, scanning for stocks, managing active trades, and reviewing your own performance to improve over time."
            price="See on Gumroad"
            features={[
              'High-probability setup breakdowns',
              'Pre-market scanning routine',
              'Trade journaling system',
              'Review and improvement framework',
              'Real chart walkthroughs',
            ]}
            comingSoon
          />
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-xs text-slate-600 max-w-xl">
          All content is educational. Nothing here is financial advice or a
          guarantee of profit. Trading involves significant risk and is not
          suitable for everyone.
        </p>

      </div>
    </section>
  )
}
