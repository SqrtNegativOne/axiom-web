import { useState, useRef, useLayoutEffect } from 'react'
import DefaultAvatar from './ui/DefaultAvatar'

// Measures the name element after render and shortens it if it wraps to a second line.
// Strategy: drop the last word until it fits; if it's one word and still too long, truncate with '..'.
function useSingleLineName(name) {
  const ref = useRef(null)
  const [displayName, setDisplayName] = useState(name)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24

    // Already fits on one line
    if (el.offsetHeight <= lineHeight * 1.4) return

    const words = name.split(' ')

    // Drop last word(s) until it fits
    while (words.length > 1) {
      words.pop()
      el.textContent = words.join(' ')
      if (el.offsetHeight <= lineHeight * 1.4) {
        setDisplayName(words.join(' '))
        return
      }
    }

    // Single word still too long — truncate characters with '..'
    let chars = words[0]
    while (chars.length > 2) {
      chars = chars.slice(0, -1)
      el.textContent = chars + '..'
      if (el.offsetHeight <= lineHeight * 1.4) {
        setDisplayName(chars + '..')
        return
      }
    }

    setDisplayName(chars + '..')
  }, [name])

  return { ref, displayName }
}

function SocialIcons({ name, socials }) {
  if (!socials) return null
  const { linkedin, instagram } = socials
  const hasLinkedin = linkedin && linkedin !== '#'
  const hasInstagram = instagram && instagram !== '#'
  if (!hasLinkedin && !hasInstagram) return null

  return (
    <div className="flex gap-2.5 mt-2">
      {hasLinkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink/30 hover:text-terracotta transition-colors duration-200"
          aria-label={`${name} on LinkedIn`}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
      {hasInstagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink/30 hover:text-terracotta transition-colors duration-200"
          aria-label={`${name} on Instagram`}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      )}
    </div>
  )
}

export default function TeamPortraitCard({ name, image, quote, socials, compact = false }) {
  const [imgFailed, setImgFailed] = useState(false)
  const { ref: nameRef, displayName } = useSingleLineName(name)

  const avatarSize = compact ? 'w-20 h-20' : 'w-32 h-32'

  return (
    <div className="flex flex-col items-center text-center group">
      {/* Photo + thought bubble wrapper */}
      <div className="relative">
        <div className={`${avatarSize} rounded-full overflow-hidden mb-3 ring-2 ring-gold/30 group-hover:ring-gold transition-all duration-300`}>
          {image && !imgFailed ? (
            <img
              src={image}
              alt={`Portrait of ${name}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <DefaultAvatar className="w-full h-full" />
          )}
        </div>

        {/* Thought bubble — compact mode only, shown on hover when a quote exists */}
        {compact && quote && (
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20"
            aria-hidden="true"
          >
            <div className="bg-cream dark:bg-[#142219] border border-gold/40 rounded-2xl px-3.5 py-2.5 shadow-md">
              <p className="font-body text-xs text-ink/70 italic leading-relaxed text-center">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
            {/* Thought bubble tail dots */}
            <div className="flex justify-center items-end gap-1 mt-1">
              <div className="w-2 h-2 rounded-full bg-cream dark:bg-[#142219] border border-gold/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-cream dark:bg-[#142219] border border-gold/40" />
              <div className="w-1 h-1 rounded-full bg-cream dark:bg-[#142219] border border-gold/40" />
            </div>
          </div>
        )}
      </div>

      {/* Name — single line, drops overflowing words */}
      <h4 ref={nameRef} className={`font-heading font-medium text-green ${compact ? 'text-base mb-0.5' : 'text-xl mb-1'}`}>
        {displayName}
      </h4>

      {/* Quote — non-compact only, always visible */}
      {!compact && quote && (
        <p className="font-body text-sm text-ink/60 italic leading-relaxed max-w-xs">
          &ldquo;{quote}&rdquo;
        </p>
      )}

      {/* Social icons — always visible, small and gray */}
      <SocialIcons name={name} socials={socials} />
    </div>
  )
}
