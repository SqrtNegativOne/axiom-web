import { useState } from 'react'

export default function EventCard({ title, date, location, description, images }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const validImages = (images || []).filter(Boolean)

  return (
    <article className="border-b border-gold/20 pb-12 mb-12 last:border-none last:mb-0">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-heading text-green font-light" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
          {title}
        </h3>
        <div className="flex flex-wrap gap-4 mt-2">
          <span className="font-body text-sm text-gold flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </span>
          <span className="font-body text-sm text-ink/50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </span>
        </div>
      </div>

      <p className="font-body text-ink/70 leading-relaxed mb-6 max-w-3xl">{description}</p>

      {/* Image strip */}
      {validImages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {validImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxIdx(idx)}
              className="flex-shrink-0 w-40 h-28 overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold group"
              aria-label={`View ${title} photo ${idx + 1}`}
            >
              <img
                src={src}
                alt={`${title} — photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.parentElement.style.display = 'none' }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 text-cream/70 hover:text-cream text-3xl leading-none"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="absolute left-4 text-cream/70 hover:text-cream text-3xl p-4"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i - 1 + validImages.length) % validImages.length) }}
            aria-label="Previous"
          >
            ‹
          </button>
          <img
            src={validImages[lightboxIdx]}
            alt={`${title} — photo ${lightboxIdx + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-cream/70 hover:text-cream text-3xl p-4"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i + 1) % validImages.length) }}
            aria-label="Next"
          >
            ›
          </button>
          <p className="absolute bottom-4 text-cream/50 font-body text-sm">
            {lightboxIdx + 1} / {validImages.length}
          </p>
        </div>
      )}
    </article>
  )
}
