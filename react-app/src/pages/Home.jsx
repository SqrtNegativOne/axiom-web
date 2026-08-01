import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import PullQuote from '../components/PullQuote'
import SectionDivider from '../components/SectionDivider'
import SpotlightCard from '../components/SpotlightCard'
const ctaCards = [
    {
        num: '01',
        title: 'Meet the Team',
        description:
            'Meet the team, discover our origins, and read what our alumni say.',
        link: '/team',
        internal: true,
    },
    {
        num: '02',
        title: 'Events',
        description:
            "From Chai Pe Charcha to Wheel of Doom: explore what we've been up to.",
        link: '/events',
        internal: true,
    },
    {
        num: '03',
        title: 'Newsletter',
        description:
            'Long-form essays, philosophical musings, and ideas worth sitting with.',
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
        <div>
            <SEO
                path="/"
                description="Axiom is the philosophy society at NSUT — fostering philosophical inquiry since 2017."
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            '@id': 'https://axiomnsut.in/#organization',
                            name: 'Axiom — The Philosophy Society',
                            alternateName: 'Axiom NSUT',
                            url: 'https://axiomnsut.in',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://axiomnsut.in/assets/logo.png',
                            },
                            description:
                                'Axiom is the philosophy society at NSUT, established in 2017. We foster intellectual curiosity and philosophical inquiry.',
                            foundingDate: '2017',
                            memberOf: {
                                '@type': 'EducationalOrganization',
                                name: 'Netaji Subhas University of Technology',
                                alternateName: 'NSUT',
                                url: 'https://www.nsut.ac.in',
                            },
                            sameAs: ['https://www.instagram.com/axiomnsut/'],
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            '@id': 'https://axiomnsut.in/#website',
                            url: 'https://axiomnsut.in',
                            name: 'Axiom — The Philosophy Society',
                            publisher: {
                                '@id': 'https://axiomnsut.in/#organization',
                            },
                        },
                    ])}
                </script>
            </Helmet>

            <Hero />

            <section className="w-[90%] max-w-5xl mx-auto py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text */}
                    <div>
                        <PullQuote attribution="Socrates">
                            The unexamined life is not worth living.
                        </PullQuote>
                        <p
                            className="font-body text-ink/70 leading-relaxed mt-8"
                            style={{
                                fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
                            }}
                        >
                            Axiom was born from a simple conviction: that
                            philosophy is not merely an academic discipline but
                            a way of inhabiting the world with greater depth and
                            honesty. We create spaces where students from all
                            departments can grapple with fundamental questions
                            about knowledge, morality, consciousness, and
                            society.
                        </p>
                        <p
                            className="font-body text-ink/70 leading-relaxed mt-4"
                            style={{
                                fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
                            }}
                        >
                            Whether it's a spirited Chai Pe Charcha on free
                            will, a walking seminar around campus, or a curated
                            newsletter essay;{' '}
                            <i>Axiom is where curiosity finds a home.</i>
                        </p>
                    </div>

                    {/* Right Column: Image */}
                    <div className="hidden md:flex justify-center md:justify-end mt-8 md:mt-0">
                        <img
                            src="/assets/the-thinker.png"
                            alt="The Thinker"
                            className="w-full max-w-sm md:max-w-md object-contain"
                            style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                            }}
                        />
                    </div>
                </div>
            </section>

            <SectionDivider className="w-[90%] max-w-5xl mx-auto" />

            <section className="w-[90%] max-w-6xl mx-auto py-14">
                <p className="label-mono mb-2">— Explore</p>
                <h2 className="section-heading mb-12">
                    Where would you like to go?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ctaCards.map(
                        ({ num, title, description, link, internal }) => (
                            <SpotlightCard
                                key={title}
                                className="p-8 group transition-shadow duration-300 hover:shadow-lg"
                            >
                                <p
                                    className="font-mono text-gold/40 mb-4 transition-colors duration-200 group-hover:text-gold/70"
                                    style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 300,
                                        lineHeight: 1,
                                    }}
                                >
                                    {num}
                                </p>
                                <h3 className="font-heading text-xl text-green mb-3">
                                    {title}
                                </h3>
                                <p className="font-body text-base text-ink/60 leading-relaxed mb-8">
                                    {description}
                                </p>
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
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </SpotlightCard>
                        ),
                    )}
                </div>
            </section>

            <SectionDivider className="w-[90%] max-w-5xl mx-auto" />

            {/* ── NEWSLETTER PREVIEW ────────────────────────────────────────────── */}
            <section className="w-[90%] max-w-5xl mx-auto py-14">
                <div className="flex items-baseline justify-between mb-4 flex-wrap gap-4">
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
                                                style={{
                                                    fontSize:
                                                        'clamp(1.35rem, 2.7vw, 1.8rem)',
                                                }}
                                            >
                                                {post.title}
                                            </h3>
                                        </a>
                                        {post.author && (
                                            <p className="font-body text-xs text-ink/50 mt-1">
                                                by {post.author}
                                            </p>
                                        )}
                                        {post.excerpt && (
                                            <p className="font-body text-base text-ink/60 leading-relaxed mt-2 max-w-2xl">
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

            <SectionDivider className="w-[90%] max-w-5xl mx-auto" />

            {/* ── JOIN US HERO — Creation of Adam ───────────────────────────────── */}
            <section
                className="relative w-full overflow-hidden"
                style={{ minHeight: '70vh' }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url(https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg)',
                    }}
                />
                <div className="absolute inset-0 bg-[#1A1A18]/70" />
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '128px 128px',
                    }}
                />

                <div
                    className="relative flex flex-col items-center justify-center text-center px-6"
                    style={{ minHeight: '70vh' }}
                >
                    <p className="label-mono text-cream/50 mb-4">
                        Become part of the dialogue
                    </p>
                    <h2
                        className="font-heading font-light text-cream tracking-[0.2em] mb-8"
                        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
                    >
                        JOIN US
                    </h2>
                    <a
                        href="https://chat.whatsapp.com/DGTXdFZKd53B93VvDbPuv6"
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
