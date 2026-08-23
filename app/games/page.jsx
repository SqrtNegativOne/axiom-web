"use client";
import SectionDivider from '../../components/SectionDivider'
import Link from 'next/link'

import { externalExperiments, externalGames } from '../../data/externalGamesList'

import { gamesList as games } from '../../data/gamesList'

export default function Games() {
    return (
        <div className="pt-20 animate-on-load">
            {/* Header */}
            <section className="max-w-4xl mx-auto px-6 py-6 text-center">
                <p className="label-mono mb-3">Play & Think</p>
                <h1 className="section-heading mb-3">Games</h1>
                <div className="h-px w-16 bg-gold/50 mx-auto mb-3" />
            </section>

            {/* Game cards */}
            <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map(({ path, href, eyebrow, title, desc }) => {
                        const cardClass =
                            'group block bg-cream-dark border border-gold/20 rounded-lg p-6 relative overflow-hidden hover:border-gold/50 transition-all duration-300'
                        const cardInner = (
                            <>
                                {/* Terracotta left-border on hover */}
                                <div className="absolute top-0 left-0 w-1 h-0 bg-terracotta group-hover:h-full transition-all duration-500" />

                                <div className="pl-4">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <p className="label-mono text-gold">
                                            {eyebrow}
                                        </p>
                                    </div>

                                    <h2
                                        className="font-heading font-light text-green mb-3 group-hover:text-terracotta transition-colors duration-200"
                                        style={{
                                            fontSize:
                                                'clamp(1.25rem, 2vw, 1.75rem)',
                                        }}
                                    >
                                        {title}
                                    </h2>

                                    <p className="font-body text-sm text-ink/65 leading-relaxed mb-6">
                                        {desc}
                                    </p>
                                </div>
                            </>
                        )
                        return href ? (
                            <Link key={href} href={href} className={cardClass}>
                                {cardInner}
                            </Link>
                        ) : (
                            <Link key={path} href={`/games/${path}`} className={cardClass}>
                                {cardInner}
                            </Link>
                        )
                    })}
                </div>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            {/* External resources */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <p className="label-mono mb-4">Around the Web</p>
                    <h2
                        className="font-heading font-light text-green mb-3"
                        style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
                    >
                        External Experiments &amp; Games
                    </h2>
                    <div className="h-px w-16 bg-gold/50 mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Experiments column */}
                    <div className="lg:col-span-2">
                        <p className="label-mono text-gold mb-5">
                            Interactive Experiments
                        </p>
                        <div className="space-y-0 divide-y divide-gold/12">
                            {externalExperiments.map(
                                ({ title, url, domain, links, desc }) => {
                                    const linkList = links ?? [{ url, domain }]
                                    return (
                                        <div
                                            key={linkList[0].url}
                                            className="py-5 group relative"
                                        >
                                            <a
                                                href={linkList[0].url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute -inset-x-4 inset-y-0 z-0 rounded-xl hover:bg-ink/5 dark:hover:bg-cream/5 transition-colors"
                                                aria-label={title}
                                            ></a>
                                            <div className="relative z-10 pointer-events-none">
                                                <div className="flex items-start justify-between gap-4 mb-1.5">
                                                    <span
                                                        className="font-heading font-light text-green group-hover:text-terracotta transition-colors duration-150 min-w-0"
                                                        style={{
                                                            fontSize:
                                                                'clamp(1rem, 1.5vw, 1.15rem)',
                                                        }}
                                                    >
                                                        {title}
                                                    </span>
                                                    <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 pt-1 pointer-events-auto">
                                                        {linkList.map(
                                                            ({
                                                                url: lu,
                                                                domain: ld,
                                                            }) => (
                                                                <a
                                                                    key={lu}
                                                                    href={lu}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="font-mono text-xs text-gold/50 hover:text-gold whitespace-nowrap transition-colors duration-150"
                                                                >
                                                                    {ld} ↗
                                                                </a>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="font-body text-sm text-ink/55 leading-relaxed">
                                                    {desc}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                },
                            )}
                        </div>
                    </div>

                    {/* Games column */}
                    <div>
                        <p className="label-mono text-gold mb-5">
                            External Games
                        </p>
                        <div className="space-y-0 divide-y divide-gold/12">
                            {externalGames.map(
                                ({ title, url, domain, desc }) => (
                                    <div key={url} className="py-5 group relative">
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute -inset-x-4 inset-y-0 z-0 rounded-xl hover:bg-ink/5 dark:hover:bg-cream/5 transition-colors"
                                            aria-label={title}
                                        ></a>
                                        <div className="relative z-10 pointer-events-none">
                                            <div className="flex items-start justify-between gap-4 mb-1.5">
                                                <span
                                                    className="font-heading font-light text-green group-hover:text-terracotta transition-colors duration-150 min-w-0"
                                                    style={{
                                                        fontSize:
                                                            'clamp(1rem, 1.5vw, 1.15rem)',
                                                    }}
                                                >
                                                    {title}
                                                </span>
                                                <span className="font-mono text-xs text-gold/50 whitespace-nowrap pt-1">
                                                    {domain} ↗
                                                </span>
                                            </div>
                                            <p className="font-body text-sm text-ink/55 leading-relaxed">
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            {/* Footer note */}
            <section className="max-w-4xl mx-auto px-6 py-12 text-center">
                <p className="font-body text-sm text-ink/50 leading-relaxed">
                    New puzzles are added as the year progresses.
                </p>
            </section>
        </div>
    )
}


