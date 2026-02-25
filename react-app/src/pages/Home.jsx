import { Link } from 'react-router-dom'
import SectionDivider from '../components/SectionDivider'
import PullQuote from '../components/PullQuote'

const ctaCards = [
  {
    title: 'About Us',
    description: 'Meet the team, discover our origins, and read what our alumni say.',
    link: '/about-us',
    internal: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Events',
    description: 'From Chai Pe Charcha to Wheel of Doom — explore what we\'ve been up to.',
    link: '/events',
    internal: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Newsletter',
    description: 'Long-form essays, philosophical musings, and ideas worth sitting with.',
    link: '/newsletter/',
    internal: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <div className="animate-on-load">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: '100svh' }}
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 40%, rgba(201,164,76,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Decorative top rule */}
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="h-px w-12 bg-gold/60" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold">Since NSUT</span>
            <div className="h-px w-12 bg-gold/60" />
          </div>

          {/* Wordmark */}
          <h1
            className="font-heading font-light text-green tracking-[0.25em] mb-6"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}
          >
            AXIOM
          </h1>

          {/* Tagline */}
          <p
            className="font-heading italic font-light text-ink/60 mb-4"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
          >
            The Philosophy Society of NSUT
          </p>

          <div className="h-px w-24 bg-gold/40 mx-auto mb-8" />

          {/* Mission line */}
          <p className="font-body text-ink/70 leading-relaxed max-w-xl mx-auto mb-12"
             style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)' }}>
            A space for those who question, wonder, and seek. We gather weekly over chai to wrestle
            with the oldest and most urgent questions of human existence.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/about-us"
              className="btn-primary text-sm tracking-wider uppercase"
            >
              Discover Axiom
            </Link>
            <Link
              to="/events"
              className="btn-outline text-sm tracking-wider uppercase"
            >
              Our Events
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-8 bg-gold/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6 text-center">Our Purpose</p>
        <PullQuote attribution="Socrates">
          The unexamined life is not worth living.
        </PullQuote>
        <p className="font-body text-ink/70 leading-relaxed mt-8" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
          Axiom was born from a simple conviction: that philosophy is not merely an academic
          discipline but a way of inhabiting the world with greater depth and honesty. We create
          spaces — both formal and informal — where students from all departments can grapple with
          fundamental questions about knowledge, morality, consciousness, and society.
        </p>
        <p className="font-body text-ink/70 leading-relaxed mt-4" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
          Whether it's a spirited Chai Pe Charcha on free will, a walking seminar around campus,
          or a curated newsletter essay on the meaning of justice — Axiom is where curiosity finds
          a home at NSUT.
        </p>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* CTA Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3 text-center">Explore</p>
        <h2 className="section-heading text-center mb-12">Where would you like to go?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ctaCards.map(({ title, description, link, internal, icon }) => (
            <div key={title} className="card group relative overflow-hidden">
              <div className="text-green/40 mb-4 group-hover:text-terracotta transition-colors duration-300">
                {icon}
              </div>
              <h3 className="font-heading text-xl text-green mb-2">{title}</h3>
              <p className="font-body text-sm text-ink/60 leading-relaxed mb-6">{description}</p>
              {internal ? (
                <Link
                  to={link}
                  className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 flex items-center gap-1 group-hover:gap-2"
                >
                  Explore <span>→</span>
                </Link>
              ) : (
                <a
                  href={link}
                  className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 flex items-center gap-1 group-hover:gap-2"
                >
                  Explore <span>→</span>
                </a>
              )}
              {/* Decorative bottom rule that reveals on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Social links */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Find Us</p>
        <h2 className="font-heading text-green font-light text-2xl mb-8">Join the conversation</h2>
        <div className="flex gap-6 justify-center">
          <a
            href="https://www.instagram.com/axiom.nsut"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-sm text-ink/60 hover:text-terracotta transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/axiom-nsut"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-sm text-ink/60 hover:text-terracotta transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}
