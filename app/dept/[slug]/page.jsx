import Link from 'next/link'
import { notFound } from 'next/navigation'
import MaterialIcon from '../../../components/MaterialIcon'
import { DEPARTMENTS, getDepartment } from '../../../data/departments'

export function generateStaticParams() {
    return DEPARTMENTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const dept = getDepartment(slug)
    if (!dept) return { title: 'Department Not Found | Axiom' }
    return {
        title: `${dept.name} | Axiom`,
        description: dept.blurb,
    }
}

export default async function DepartmentPage({ params }) {
    const { slug } = await params
    const dept = getDepartment(slug)
    if (!dept) notFound()

    const others = DEPARTMENTS.filter((d) => d.slug !== dept.slug)

    return (
        <div className="pt-20 animate-on-load">
            <section className="max-w-4xl mx-auto px-6 py-16">
                <Link
                    href="/dept"
                    className="label-mono mb-8 inline-block hover:text-terracotta transition-colors"
                >
                    &larr; All departments
                </Link>

                <MaterialIcon
                    name={dept.icon}
                    className="text-5xl text-gold/70"
                />
                <p className="label-mono mt-6 mb-3">
                    {dept.name} Department
                </p>
                <h1 className="section-heading mb-4">{dept.tagline}</h1>
                <div className="h-px w-16 bg-gold/50 mb-8" />

                <div className="space-y-4 font-body text-ink/75 leading-relaxed max-w-2xl">
                    {dept.intro.map((paragraph) => (
                        <p
                            key={paragraph}
                            style={{
                                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                            }}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {dept.links?.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-8">
                        {dept.links.map(({ label, href, external }) =>
                            external ? (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border border-gold/40 px-5 py-3 font-mono text-xs tracking-widest uppercase text-green hover:bg-cream-dark dark:hover:bg-cream-dark hover:border-gold/70 transition-colors duration-200"
                                >
                                    <MaterialIcon
                                        name="open_in_new"
                                        className="text-base opacity-70"
                                    />
                                    {label}
                                </a>
                            ) : (
                                <Link
                                    key={href}
                                    href={href}
                                    className="inline-flex items-center gap-2 border border-gold/40 px-5 py-3 font-mono text-xs tracking-widest uppercase text-green hover:bg-cream-dark dark:hover:bg-cream-dark hover:border-gold/70 transition-colors duration-200"
                                >
                                    {label}
                                </Link>
                            ),
                        )}
                    </div>
                )}

                {dept.comingSoon?.length > 0 && (
                    <div className="mt-10">
                        <p className="label-mono mb-3">Coming soon</p>
                        <div className="flex flex-wrap gap-2">
                            {dept.comingSoon.map((platform) => (
                                <span
                                    key={platform}
                                    className="font-mono text-xs text-ink/50 border border-gold/25 px-3 py-1.5"
                                >
                                    {platform}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {dept.embed?.type === 'youtube-playlist' && (
                <section className="max-w-4xl mx-auto px-6 pb-16">
                    <div className="border border-gold/20 p-2 bg-cream-dark dark:bg-cream-dark">
                        <div className="relative w-full aspect-video">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/videoseries?list=${dept.embed.list}`}
                                title={dept.embed.title}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    <p className="font-mono text-xs text-ink/40 mt-3 tracking-wider">
                        Latest uploads from{' '}
                        {dept.links?.[0]?.label ?? 'the channel'}
                    </p>
                </section>
            )}

            {dept.cta && (
                <section className="max-w-4xl mx-auto px-6 pb-16">
                    <div className="border border-gold/30 bg-cream-dark dark:bg-cream-dark p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                        <div className="flex items-start gap-4">
                            <MaterialIcon
                                name={dept.cta.icon ?? dept.icon}
                                className="text-3xl text-terracotta shrink-0"
                            />
                            <p className="font-heading text-xl sm:text-2xl font-light text-green leading-snug">
                                {dept.cta.text}
                            </p>
                        </div>
                        <Link
                            href={dept.cta.href}
                            className="shrink-0 inline-block border border-green/40 text-green px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-green hover:text-cream"
                        >
                            {dept.cta.label} →
                        </Link>
                    </div>
                </section>
            )}

            <section className="max-w-4xl mx-auto px-6 pb-24">
                <div className="border-t border-gold/20 pt-8">
                    <p className="label-mono mb-5">Other departments</p>
                    <div className="flex flex-wrap gap-4">
                        {others.map((other) => (
                            <Link
                                key={other.slug}
                                href={`/dept/${other.slug}`}
                                className="inline-flex items-center gap-2 font-body text-sm text-ink/70 hover:text-terracotta transition-colors"
                            >
                                <MaterialIcon
                                    name={other.icon}
                                    className="text-lg text-gold/60"
                                />
                                {other.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
