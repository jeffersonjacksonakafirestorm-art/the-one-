interface ProductCardProps {
  title: string
  description: string
  price: string
  features: string[]
  buyUrl?: string
  badge?: string
  comingSoon?: boolean
}

export default function ProductCard({
  title,
  description,
  price,
  features,
  buyUrl,
  badge,
  comingSoon = false,
}: ProductCardProps) {
  /* Treat unconfigured URL (no buyUrl, not explicitly comingSoon) the same as Coming Soon */
  const isComingSoon = comingSoon || !buyUrl

  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 transition-all duration-200 ${
        isComingSoon
          ? 'bg-slate-900/40 border-slate-800'
          : 'bg-slate-900 border-slate-700 hover:border-blue-600/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-950/50'
      }`}
    >
      {/* Badge — show Coming Soon for both comingSoon and unconfigured */}
      {!isComingSoon && badge && (
        <span className="absolute -top-3 left-6 inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full tracking-wide">
          {badge}
        </span>
      )}
      {isComingSoon && (
        <span className="absolute -top-3 left-6 inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold rounded-full tracking-wide">
          Coming Soon
        </span>
      )}

      {/* Title + price */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className={`text-2xl font-black ${isComingSoon ? 'text-slate-500' : 'text-white'}`}>
          {price}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{description}</p>

      {/* Features */}
      <ul className="flex flex-col gap-2 mb-6 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
            <svg
              className={`w-4 h-4 mt-0.5 shrink-0 ${isComingSoon ? 'text-slate-600' : 'text-blue-500'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className={isComingSoon ? 'text-slate-500' : ''}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isComingSoon ? (
        <div className="w-full py-3 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-400 text-sm font-semibold text-center cursor-default select-none">
          Coming Soon
        </div>
      ) : (
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-md bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-bold text-center transition-all duration-150 shadow-md hover:shadow-blue-600/40 hover:shadow-lg"
        >
          Get It Now →
        </a>
      )}
    </div>
  )
}
