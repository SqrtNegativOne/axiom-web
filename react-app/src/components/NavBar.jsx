import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/', internal: true },
  { label: 'About Us', to: '/about-us', internal: true },
  { label: 'Events', to: '/events', internal: true },
  { label: 'Newsletter', to: '/newsletter/', internal: false },
]

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  // On home page: fully hidden until user scrolls; then slides in as cream bar
  // On other pages: always visible with cream background
  const hidden = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden
          ? 'opacity-0 -translate-y-full pointer-events-none'
          : 'opacity-100 translate-y-0 bg-cream/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / wordmark */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/assets/logo.svg"
            alt="Axiom"
            className="h-8 w-auto"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className="font-heading text-2xl font-light tracking-[0.15em] text-green group-hover:text-terracotta transition-colors duration-200">
            AXIOM
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, to, internal }) =>
            internal ? (
              <li key={to}>
                <Link
                  to={to}
                  className={`font-body text-sm tracking-wider uppercase transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                    pathname === to ? 'text-terracotta after:scale-x-100' : 'text-green hover:text-green'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ) : (
              <li key={to}>
                <a
                  href={to}
                  className="font-body text-sm tracking-wider uppercase text-green hover:text-terracotta transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-green transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-green transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-green transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream border-t border-gold/30 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ label, to, internal }) =>
              internal ? (
                <li key={to}>
                  <Link
                    to={to}
                    className={`font-body text-sm tracking-wider uppercase ${
                      pathname === to ? 'text-terracotta' : 'text-green'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ) : (
                <li key={to}>
                  <a href={to} className="font-body text-sm tracking-wider uppercase text-green">
                    {label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
