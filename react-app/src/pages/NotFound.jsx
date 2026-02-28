import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="bg-cream min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="label-mono mb-6">404</p>
      <h1
        className="font-heading font-light text-green mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        The page you have requested exists only in your mind.
      </h1>
      <p className="font-heading italic font-light text-ink/40 mb-12" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
        — Sincerely, A Solipsist.
      </p>
      <Link
        to="/"
        className="font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider"
      >
        ← return to the phenomenal world
      </Link>
    </div>
  )
}
