import { useState, useEffect, useRef } from 'react'

const galleryImages = [
  '/assets/gallery/gal1.jpg',
  '/assets/gallery/gal2.jpg',
  '/assets/gallery/gal3.jpg',
  '/assets/gallery/gal4.jpg',
  '/assets/gallery/gal5.jpg',
  '/assets/gallery/1742112133133.jpg',
  '/assets/gallery/1742113242276.jpg',
  '/assets/gallery/1742113242495.jpg',
]

export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const prev = () => setCurrent((i) => (i - 1 + galleryImages.length) % galleryImages.length)
  const next = () => setCurrent((i) => (i + 1) % galleryImages.length)

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 4000)
    }
    return () => clearInterval(intervalRef.current)
  }, [paused, current])

  return (
    <div
      className="relative overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ height: 'clamp(260px, 45vw, 520px)' }}
    >
      {galleryImages.map((src, idx) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: idx === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Gallery image ${idx + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.parentElement.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-4xl leading-none px-2 transition-colors"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-4xl leading-none px-2 transition-colors"
        aria-label="Next image"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {galleryImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-gold w-4' : 'bg-cream/40'
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
