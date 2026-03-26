import EventCarousel from './EventCarousel'
import imageManifest from '../data/images-manifest.json'

export default function EventCard({ title, date, location, description, imageFolder, index }) {
  // Get images from manifest if imageFolder is provided
  const images = imageFolder && imageManifest.events[imageFolder] 
    ? imageManifest.events[imageFolder].map(filename => `/data/events/${imageFolder}/${filename}`)
    : []

  const validImages = images.filter(Boolean)

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

        {/* 3D Carousel */}
        {validImages.length > 0 && (
          <EventCarousel images={validImages} eventTitle={title} />
        )}
      </div>
    </article>
  )
}
