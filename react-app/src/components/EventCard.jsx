import { useState } from 'react'

export default function EventCard({ title, date, location, description, images, index }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const validImages = (images || []).filter(Boolean)

  // Zero-padded event number for editorial styling
  const num = String((index ?? 0) + 1).padStart(2, '0')

  return (
    <article className="group relative grid grid-cols-1 md:grid-cols-[4rem_1fr] gap-0 md:gap-8 pb-16 mb-16 border-b border-gold/20 last:border-none last:mb-0">

      {/* ── Sidebar: event number ──────────────────────────────────────── */}
      <div className="hidden md:flex flex-col items-end pt-1">
        <span
          className="font-mono text-gold/25 group-hover:text-gold/50 transition-colors duration-300 select-none"
          style={{ fontSize: '2.8rem', fontWeight: 300, lineHeight: 1 }}
        >
          {num}
        </span>
        {/* Vertical tick line */}
        <div className="w-px flex-1 bg-gold/15 mt-3 group-hover:bg-gold/30 transition-colors duration-300" />
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="min-w-0">
        {/* Metadata */}
        <div className="flex flex-wrap gap-4 mb-3 items-center">
          <span className="font-mono text-gold text-xs tracking-widest">{date}</span>
          <span className="font-mono text-ink/40 text-xs tracking-wider">·</span>
          <span className="font-mono text-ink/50 text-xs tracking-wider">{location}</span>
        </div>

        {/* Title */}
        <h3
          className="font-heading text-green font-light mb-4 group-hover:text-terracotta transition-colors duration-300"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
        >
          {title}
        </h3>

        <p className="font-body text-ink/65 leading-relaxed mb-6 max-w-3xl"
           style={{ fontSize: '0.95rem' }}>
          {description}
        </p>

        {/* Image strip */}
        {validImages.length > 0 && (
          <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin max-w-full">
            {validImages.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIdx(idx)}
                className="flex-shrink-0 w-44 h-28 overflow-hidden focus:outline-none focus:ring-1 focus:ring-gold/50 group/img relative"
                aria-label={`View ${title} photo ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`${title} — photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.parentElement.style.display = 'none' }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover/img:bg-ink/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="font-mono text-xs text-cream opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
                    expand
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-ink/92 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 font-mono text-cream/50 hover:text-cream text-2xl leading-none transition-colors"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-5 font-mono text-xs text-cream/40 tracking-widest">
            {String(lightboxIdx + 1).padStart(2,'0')} / {String(validImages.length).padStart(2,'0')}
          </p>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-cream/40 hover:text-cream text-3xl px-3 py-6 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i - 1 + validImages.length) % validImages.length) }}
            aria-label="Previous"
          >‹</button>

          <img
            src={validImages[lightboxIdx]}
            alt={`${title} — photo ${lightboxIdx + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-cream/40 hover:text-cream text-3xl px-3 py-6 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i + 1) % validImages.length) }}
            aria-label="Next"
          >›</button>

          {/* Title */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-cream/40 tracking-widest">
            {title.toLowerCase()}
          </p>
        </div>
      )}
    </article>
  )
}
