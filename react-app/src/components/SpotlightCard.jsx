import { useRef } from 'react'

/**
 * Wraps children in a card that tracks mouse position and renders a radial
 * gradient spotlight. Position is stored in CSS custom properties so no
 * re-render is needed on every mousemove — the gradient is computed by the GPU.
 */
export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(201,164,76,0.12)' }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
    cardRef.current.style.setProperty('--spotlight', spotlightColor)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  )
}
