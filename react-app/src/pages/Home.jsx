import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DitherCanvas from '../components/DitherCanvas'
import SpotlightCard from '../components/SpotlightCard'
import SectionDivider from '../components/SectionDivider'
import PullQuote from '../components/PullQuote'

// ── Rotating philosophical prompts for the hero tagline ─────────────────────
const PROMPTS = [
  '> What do you know?',
  '> What ought you do?',
  '> What can be known?',
  '> What is the good life?',
  '> Does free will exist?',
  '> What is consciousness?',
]

function RotatingPrompt() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % PROMPTS.length)
        setVisible(true)
      }, 400)
    }, 3200)
    return () => clearInterval(cycle)
  }, [])

  return (
    <span
      className="font-mono text-gold/80 transition-opacity duration-400"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {PROMPTS[idx]}
      <span className="animate-blink ml-0.5">_</span>
    </span>
  )
}

// ── CTA card data ────────────────────────────────────────────────────────────
const ctaCards = [
  {
    num: '01',
    title: 'About Us',
    description: 'Meet the team, discover our origins, and read what our alumni say.',
    link: '/about-us',
    internal: true,
  },
  {
    num: '02',
    title: 'Events',
    description: "From Chai Pe Charcha to Wheel of Doom — explore what we've been up to.",
    link: '/events',
    internal: true,
  },
  {
    num: '03',
    title: 'Newsletter',
    description: 'Long-form essays, philosophical musings, and ideas worth sitting with.',
    link: '/newsletter/',
    internal: false,
  },
]

// ── Newsletter preview ───────────────────────────────────────────────────────
function useLatestPosts(n = 3) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('/newsletter/posts.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setPosts(data.slice(0, n)))
      .catch(() => {})
  }, [n])
  return posts
}

// ── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  const latestPosts = useLatestPosts(3)

  return (
    <div className="animate-on-load">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ minHeight: '100svh' }}
      >
        {/* Dithered gradient canvas background */}
        <DitherCanvas />

        {/* Grid overlay on top of canvas */}
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(26,46,38,0.7) 100%)' }}
        />

        {/* Content */}
        <div className="relative max-w-3xl mx-auto">
          {/* Monospace top label */}
          <p className="label-mono text-gold/60 mb-8 delay-100 animate-on-load" style={{ animationDelay: '100ms' }}>
            φ&nbsp;&nbsp;nsut · philosophy society&nbsp;&nbsp;φ
          </p>

          {/* Wordmark */}
          <h1
            className="font-heading font-light text-cream tracking-[0.3em] mb-4 delay-200 animate-on-load"
            style={{ fontSize: 'clamp(4rem, 14vw, 9rem)', animationDelay: '150ms' }}
          >
            AXIOM
          </h1>

          {/* Gold rule */}
          <div className="flex items-center justify-center gap-4 mb-6" style={{ animationDelay: '250ms' }}>
            <div className="h-px w-16 bg-gold/50" />
            <span className="font-mono text-gold/50" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>
              EST. NSUT
            </span>
            <div className="h-px w-16 bg-gold/50" />
          </div>

          {/* Rotating prompt */}
          <div className="h-8 mb-8 animate-on-load" style={{ animationDelay: '300ms' }}>
            <RotatingPrompt />
          </div>

          {/* Tagline */}
          <p
            className="font-heading italic font-light text-cream/60 mb-10 animate-on-load"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', animationDelay: '350ms' }}
          >
            Where curious minds gather over chai and ideas.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center animate-on-load" style={{ animationDelay: '450ms' }}>
            <Link to="/about-us" className="btn-ghost text-xs tracking-[0.15em] uppercase">
              Discover Axiom
            </Link>
            <Link to="/events" className="inline-block border border-gold/50 text-gold/90 px-6 py-3 font-body text-xs tracking-[0.15em] uppercase transition-all duration-200 hover:border-gold hover:text-gold">
              Our Events
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="w-px h-8 bg-cream/50" />
          <div className="w-1 h-1 rounded-full bg-cream/50" />
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="label-mono mb-6">— Purpose</p>
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
          or a curated newsletter essay — Axiom is where curiosity finds a home at NSUT.
        </p>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* ── CTA CARDS ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="label-mono mb-3">— Explore</p>
        <h2 className="section-heading mb-12">Where would you like to go?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ctaCards.map(({ num, title, description, link, internal }) => (
            <SpotlightCard key={title} className="p-8 group transition-shadow duration-300 hover:shadow-lg">
              {/* Number accent */}
              <p className="font-mono text-gold/40 mb-4 transition-colors duration-200 group-hover:text-gold/70"
                 style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1 }}>
                {num}
              </p>
              <h3 className="font-heading text-xl text-green mb-3">{title}</h3>
              <p className="font-body text-sm text-ink/60 leading-relaxed mb-8">{description}</p>
              {internal ? (
                <Link
                  to={link}
                  className="font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider"
                >
                  explore →
                </Link>
              ) : (
                <a
                  href={link}
                  className="font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider"
                >
                  explore →
                </a>
              )}
              {/* Bottom border that draws in on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </SpotlightCard>
          ))}
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* ── NEWSLETTER PREVIEW ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="label-mono mb-2">— Latest writing</p>
            <h2 className="section-heading">From the Newsletter</h2>
          </div>
          <a
            href="/newsletter/"
            className="font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider"
          >
            all essays →
          </a>
        </div>

        {latestPosts.length > 0 ? (
          <div className="divide-y divide-gold/20">
            {latestPosts.map((post) => (
              <article key={post.url} className="py-8 group">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                  <span className="font-mono text-gold/60 text-xs tracking-widest flex-shrink-0">
                    {post.dateReadable}
                  </span>
                  <div className="flex-1">
                    <a href={post.url} className="block">
                      <h3
                        className="font-heading font-light text-green group-hover:text-terracotta transition-colors duration-200"
                        style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
                      >
                        {post.title}
                      </h3>
                    </a>
                    {post.author && (
                      <p className="font-body text-xs text-ink/50 mt-1">by {post.author}</p>
                    )}
                    {post.excerpt && (
                      <p className="font-body text-sm text-ink/60 leading-relaxed mt-2 max-w-2xl">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <a
                    href={post.url}
                    className="font-mono text-xs text-terracotta/70 group-hover:text-terracotta transition-colors duration-200 tracking-wider flex-shrink-0 self-start md:self-center"
                  >
                    read →
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="font-mono text-xs text-ink/40 tracking-wider">
            // no posts yet — check back soon
          </p>
        )}
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* ── SOCIAL / FIND US ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="label-mono mb-6">— Connect</p>
        <div className="flex gap-8 items-center">
          <a
            href="https://www.instagram.com/axiom.nsut"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-ink/50 hover:text-terracotta transition-colors duration-200 tracking-wider"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @axiom.nsut
          </a>
          <div className="w-px h-4 bg-ink/20" />
          <a
            href="https://www.linkedin.com/company/axiom-nsut"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-ink/50 hover:text-terracotta transition-colors duration-200 tracking-wider"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            axiom.nsut
          </a>
        </div>
      </section>

    </div>
  )
}
