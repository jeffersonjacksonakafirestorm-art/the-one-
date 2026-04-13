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
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 transition-all duration-200 ${
        comingSoon
          ? 'bg-slate-900/40 border-slate-800 opacity-60'
          : 'bg-slate-900 border-slate-700 hover:border-blue-600/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/40'
      }`}
    >
      {/* Badge */}
      {badge && !comingSoon && (
        <span className="absolute -top-3 left-6 inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full tracking-wide">
          {badge}
        </span>
      )}
      {comingSoon && (
        <span className="absolute -top-3 left-6 inline-block px-3 py-1 bg-slate-700 text-slate-400 text-xs font-bold rounded-full tracking-wide">
          Coming Soon
        </span>
      )}

      {/* Title + price */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-2xl font-black text-white">
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
              className="w-4 h-4 mt-0.5 text-blue-500 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {comingSoon ? (
        <button
          disabled
          className="w-full py-3 rounded-md bg-slate-800 text-slate-500 text-sm font-semibold cursor-not-allowed"
        >
          Coming Soon
        </button>
      ) : buyUrl ? (
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold text-center transition-colors"
        >
          Buy Now on Gumroad
        </a>
      ) : (
        <button
          disabled
          className="w-full py-3 rounded-md bg-slate-800 text-slate-500 text-sm font-semibold cursor-not-allowed"
        >
          Link Not Configured
        </button>
      )}
    </div>
  )
}
