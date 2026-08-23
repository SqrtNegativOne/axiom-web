"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { core, members } from '../../data/team-2026'
import alumniQuotes from '../../data/alumni-quotes'
import TeamPortraitCard from '../../components/TeamPortraitCard'
import AlumniQuoteCard from '../../components/AlumniQuoteCard'
import GalleryCarousel from '../../components/GalleryCarousel'
import SectionDivider from '../../components/SectionDivider'
import PullQuote from '../../components/PullQuote'

export default function Team() {
    const [cpcClicked, setCpcClicked] = useState(false)

    const people = [
        ...core.flatMap((group) =>
            group.members.map((member) => ({ ...member, jobTitle: group.role })),
        ),
        ...members.map((member) => ({ ...member, jobTitle: 'Member' })),
    ]

    // Easter egg (2026): if any rendered text contains "Sunrise parabellum", wrap it
    // in a link to the Disco Elysium fitgirl page. No data-file changes needed.
    useEffect(() => {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
        )
        const toWrap = []
        let node
        while ((node = walker.nextNode())) {
            if (node.textContent.includes('Sunrise parabellum'))
                toWrap.push(node)
        }
        toWrap.forEach((textNode) => {
            const parts = textNode.textContent.split('Sunrise parabellum')
            const frag = document.createDocumentFragment()
            parts.forEach((part, i) => {
                frag.appendChild(document.createTextNode(part))
                if (i < parts.length - 1) {
                    const a = document.createElement('a')
                    a.href = 'https://fitgirl-repacks.site/disco-elysium/'
                    a.target = '_blank'
                    a.rel = 'noopener noreferrer'
                    a.textContent = 'Sunrise parabellum'
                    a.style.cssText =
                        'color:inherit;text-decoration:underline;text-underline-offset:3px'
                    frag.appendChild(a)
                }
            })
            textNode.parentNode.replaceChild(frag, textNode)
        })
    }, [])

    return (
        <div className="pt-20 animate-on-load">
            {/* Page header */}
            <section className="max-w-4xl mx-auto px-6 py-16 text-center">
                <p className="label-mono mb-3">Who We Are</p>
                <h1 className="section-heading mb-6">About Axiom</h1>
                <div className="h-px w-16 bg-gold/50 mx-auto mb-8" />
                <p
                    className="font-body text-ink/70 leading-relaxed max-w-2xl mx-auto"
                    style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
                >
                    Axiom is the philosophy society of Netaji Subhas University
                    of Technology. Founded by a group of students who believed
                    that the engineer's mind is incomplete without the
                    philosopher's eye, we have grown into a vibrant community of
                    curious thinkers.
                </p>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            {/* Origin story */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <p className="label-mono mb-3">Our Story</p>
                <h2 className="font-heading text-green font-light text-3xl mb-8">
                    How it began
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <p
                            className="font-body text-ink/70 leading-relaxed mb-4"
                            style={{
                                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                            }}
                        >
                            Like all great societies, Axiom had its genesis in a question.
                            No one remembers what this question was, but it sparked a
                            prarie fire that consumed our intellectual ennui,
                            leaving only the legacy of curiosity in its wake.
                            Something far greater than the true answer to the original question could have given us.
                        </p>
                        <p
                            className="font-body text-ink/70 leading-relaxed"
                            style={{
                                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                            }}
                        >

                            What started as informal chai sessions in the NSUT
                            canteen gradually evolved into structured events,
                            philosophical walks, annual festivals, and
                            eventually this — a full-fledged society with a
                            newsletter, alumni network, and a reputation for
                            being the most intellectually adventurous society on
                            campus.
                        </p>
                    </div>
                    <div>
                        <PullQuote>
                            Philosophy begins in wonder. And at Axiom, the
                            wonder never stops.
                        </PullQuote>
                        <p
                            className="font-body text-ink/70 leading-relaxed mt-4"
                            style={{
                                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                            }}
                        >
                            Our signature event,{' '}
                            <span
                                onClick={() => setCpcClicked(true)}
                                style={{
                                    cursor: cpcClicked ? 'default' : 'pointer',
                                }}
                            >
                                {cpcClicked
                                    ? 'Charas Par Charcha'
                                    : 'Chai Pe Charcha'}
                            </span>{' '}
                            (CPC), remains the beating heart of Axiom. Every
                            week, without fail, students gather over hot cups of
                            chai to debate, discuss, and occasionally disagree —
                            loudly, joyfully, philosophically.
                        </p>
                    </div>
                </div>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="section-heading text-center mb-3">The Core</h2>
                <p className="font-body text-ink/60 text-center mb-14 max-w-xl mx-auto">
                    Dedicated stewards sworn to steer Axiom.
                </p>

                {core.map((group) => (
                    <div key={group.role} className="mb-14">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gold/20" />
                            <h3 className="label-mono px-4">{group.role}</h3>
                            <div className="h-px flex-1 bg-gold/20" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-10">
                            {group.members.map((member) => (
                                <div key={member.name} className="w-40">
                                    <TeamPortraitCard {...member} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="section-heading text-center mb-3">Members</h2>
                <p className="font-body text-ink/60 text-center mb-14 max-w-xl mx-auto">
                    The reasoned foot-soldiers of Axiom.
                </p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
                    {members.map((member) => (
                        <div key={member.name} className="w-[120px]">
                            <TeamPortraitCard {...member} compact />
                        </div>
                    ))}
                </div>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            <section className="max-w-6xl mx-auto px-6 py-16">
                <p className="label-mono mb-3 text-center">
                    Emigrants of Omelas
                </p>
                <h2 className="section-heading text-center mb-3">Alumni</h2>
                <p className="font-body text-ink/60 text-center mb-12 max-w-xl mx-auto">
                    In their own words — what Axiom meant to the people who
                    built it.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alumniQuotes.map((person) => (
                        <AlumniQuoteCard key={person.name} {...person} />
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Link
                        href="/team/2025"
                        className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
                    >
                        See previous leadership &rarr;
                    </Link>
                </div>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            {/* Gallery */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6 mb-8">
                    <h2 className="section-heading text-center mb-4">
                        Gallery
                    </h2>
                </div>
                <GalleryCarousel />
            </section>
        </div>
    )
}

