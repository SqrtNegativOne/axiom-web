"use client";
import { useState, useEffect, useRef, useCallback } from 'react'
import OptimizedImage from './OptimizedImage'

const galleryImages = [
    '/data/gallery/gal1.webp',
    '/data/gallery/gal2.webp',
    '/data/gallery/gal3.webp',
    '/data/gallery/gal4.webp',
    '/data/gallery/gal5.webp',
    '/data/gallery/1742112133133.webp',
    '/data/gallery/1742113242276.webp',
    '/data/gallery/1742113242495.webp',
]

export default function GalleryCarousel() {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)
    const intervalRef = useRef(null)
    // Track which slides have been shown so we only fetch their images on first display
    const [loaded, setLoaded] = useState(() => new Set([0]))

    const show = useCallback((idx) => {
        setCurrent(idx)
        setLoaded((prev) => new Set(prev).add(idx))
    }, [])

    const prev = useCallback(
        () => show((current - 1 + galleryImages.length) % galleryImages.length),
        [current, show]
    )
    const next = useCallback(
        () => show((current + 1) % galleryImages.length),
        [current, show]
    )

    useEffect(() => {
        const onVisibility = () => setPaused(document.hidden)
        document.addEventListener('visibilitychange', onVisibility)
        return () =>
            document.removeEventListener('visibilitychange', onVisibility)
    }, [])

    useEffect(() => {
        if (!paused) {
            intervalRef.current = setInterval(next, 4000)
        }
        return () => clearInterval(intervalRef.current)
    }, [paused, next])

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
                    {loaded.has(idx) && (
                        <OptimizedImage
                            src={src}
                            alt={`Gallery image ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            onError={(e) => {
                                e.target.parentElement.parentElement.style.display =
                                    'none'
                            }}
                        />
                    )}
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
                        onClick={() => show(idx)}
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
