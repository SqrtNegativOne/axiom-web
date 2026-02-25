import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Dither from '../components/Dither'
import SpotlightCard from '../components/SpotlightCard'
import SectionDivider from '../components/SectionDivider'
import PullQuote from '../components/PullQuote'

// ── Typewriter philosophical prompts ────────────────────────────────────────
const PROMPTS = [
  '> What do you know?',
  '> What ought you do?',
  '> What can be known?',
  '> What is the good life?',
  '> Does free will exist?',
  '> What is consciousness?',
]

function TypewriterPrompt() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'lingering' | 'erasing'

  useEffect(() => {
    const full = PROMPTS[idx]

    if (phase === 'typing') {
      if (displayed.length < full.length) {
        const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 22)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('lingering'), 2500)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'lingering') {
      const t = setTimeout(() => setPhase('erasing'), 0)
      return () => clearTimeout(t)
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 14)
        return () => clearTimeout(t)
      } else {
        setIdx((i) => (i + 1) % PROMPTS.length)
        setPhase('typing')
      }
    }
  }, [displayed, phase, idx])

  return (
    <span className="font-mono text-gold/80 text-sm md:text-base tracking-wider">
      {displayed}
      <span
        className="animate-blink inline-block bg-gold/80 align-text-bottom ml-0.5"
        style={{ width: '0.5em', height: '1.1em' }}
        aria-hidden="true"
      />
    </span>
  )
}

// ── CTA card data ───────────────────────────────────────────────────────────
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

// ── Newsletter preview ──────────────────────────────────────────────────────
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

// ── Home page ───────────────────────────────────────────────────────────────
export default function Home() {
  const latestPosts = useLatestPosts(3)

  return (
    <div className="animate-on-load">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ minHeight: '100svh' }}
      >
        {/* Reactbits WebGL dither background */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Dither
            waveColor={[0.23, 0.43, 0.33]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.1}
            colorNum={4}
            pixelSize={2}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay pointer-events-none" style={{ zIndex: 1 }} />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(10,22,17,0.9) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center" style={{ zIndex: 2 }}>

          {/* Image + AXIOM overlay — both centred in frame */}
          <div className="relative animate-on-load" style={{ animationDelay: '150ms' }}>
            {/* The image — transparent PNG so no wrapper background, no overflow-hidden */}
            <div
              className="relative"
              style={{ width: 'clamp(340px, 54vw, 580px)', height: 'clamp(340px, 54vw, 580px)' }}
            >
              <img
                src="https://icarusmarketing.nl/wp-content/uploads/2024/10/4-1024x1024.png"
                alt="Fall of Icarus"
                className="w-full h-full object-contain"
              />

              {/* Text overlay — centred in frame, column layout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">

                {/* EST. 2017 — directly above AXIOM, no gap */}
                <div style={{ marginBottom: '0.15em' }}>
                  <span className="font-mono text-cream" style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.3em',
                    backgroundColor: 'rgba(26,26,24,0.72)',
                    padding: '0.35em 0.8em',
                    display: 'inline-block',
                  }}>
                    EST. 2017
                  </span>
                </div>

                {/* AXIOM */}
                <h1 className="axiom-wordmark">
                  <span className="axiom-wordmark-text">AXIOM</span>
                </h1>

                {/* "the philosophy society" — directly below AXIOM */}
                <p
                  className="font-heading italic font-light text-cream/70 tracking-[0.12em]"
                  style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)', marginTop: '0.1em' }}
                >
                  the philosophy society
                </p>

              </div>
            </div>
          </div>

          {/* Typewriter prompt */}
          <div className="h-7 mt-2 animate-on-load" style={{ animationDelay: '350ms' }}>
            <TypewriterPrompt />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40" style={{ zIndex: 2 }}>
          <div className="w-px h-8 bg-cream/50" />
          <div className="w-1 h-1 rounded-full bg-cream/50" />
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="w-[90%] max-w-5xl mx-auto py-20">
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
          or a curated newsletter essay — Axiom is where curiosity finds a home.
        </p>
      </section>

      <SectionDivider className="w-[90%] max-w-7xl mx-auto" />

      {/* ── CTA CARDS ─────────────────────────────────────────────────────── */}
      <section className="w-[90%] max-w-7xl mx-auto py-20">
        <p className="label-mono mb-3">— Explore</p>
        <h2 className="section-heading mb-12">Where would you like to go?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ctaCards.map(({ num, title, description, link, internal }) => (
            <SpotlightCard key={title} className="p-8 group transition-shadow duration-300 hover:shadow-lg">
              <p className="font-mono text-gold/40 mb-4 transition-colors duration-200 group-hover:text-gold/70"
                 style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1 }}>
                {num}
              </p>
              <h3 className="font-heading text-xl text-green mb-3">{title}</h3>
              <p className="font-body text-sm text-ink/60 leading-relaxed mb-8">{description}</p>
              {internal ? (
                <Link to={link} className="font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider">
                  explore →
                </Link>
              ) : (
                <a href={link} className="font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider">
                  explore →
                </a>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </SpotlightCard>
          ))}
        </div>
      </section>

      <SectionDivider className="w-[90%] max-w-7xl mx-auto" />

      {/* ── NEWSLETTER PREVIEW ────────────────────────────────────────────── */}
      <section className="w-[90%] max-w-7xl mx-auto py-20">
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

      <SectionDivider className="w-[90%] max-w-7xl mx-auto" />

      {/* ── JOIN US HERO — Creation of Adam ───────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '70vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }} />

        <div className="relative flex flex-col items-center justify-center text-center px-6" style={{ minHeight: '70vh' }}>
          <p className="label-mono text-cream/50 mb-4">Become part of the dialogue</p>
          <h2
            className="font-heading font-light text-cream tracking-[0.2em] mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            JOIN US
          </h2>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-cream/40 text-cream/90 px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-cream hover:text-ink hover:border-cream"
          >
            Apply Now →
          </a>
        </div>
      </section>

    </div>
  )
}
