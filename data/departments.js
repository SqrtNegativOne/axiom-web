/**
 * Axiom departments.
 *
 * Each department gets a page at /dept/<slug>, generated statically from this
 * file. `icon` is a Google Material Symbols ligature name — the stylesheet is
 * loaded in app/layout.jsx.
 *
 * `embed.list` is a YouTube uploads-playlist id (channel id with the leading
 * "UC" swapped for "UU").
 */

export const DEPARTMENTS = [
    {
        slug: 'podcast',
        name: 'Podcast',
        icon: 'podcasts',
        blurb: 'We talk about stuff. Go listen.',
        tagline: 'Conversations worth sitting with.',
        intro: [
            'The Axiom Podcast is where we slow down and talk. Long-form conversation, half-formed hunches, and the occasional genuinely good idea — nothing scripted, nothing rehearsed.',
            'We record episodes around campus, in classrooms after hours, and anywhere a conversation decides to happen. Philosophy, culture, absurd hypotheticals, bad opinions defended well.',
        ],
        links: [
            {
                label: 'YouTube — @axiom_nsut',
                href: 'https://www.youtube.com/@axiom_nsut',
                external: true,
            },
        ],
        comingSoon: ['Apple Podcasts', 'Spotify', 'RSS'],
        embed: {
            type: 'youtube-playlist',
            title: 'Axiom Podcast',
            list: 'UU7Lt0ux2UL4rhxIy1V0aAZg',
        },
        cta: {
            text: 'Do you have a penchant for talking? Join us now at /join!',
            href: '/join',
            label: 'Join the society',
            icon: 'mic',
        },
    },
    {
        slug: 'design',
        name: 'Design',
        icon: 'palette',
        blurb: 'Check our Instagram!',
        tagline: 'Making philosophy look the way it feels.',
        intro: [
            'The Design department builds the visual language of Axiom — posters, carousels, reels, event branding, merch, and the odd questionable type experiment.',
            'We care about restraint, contrast, and the kind of detail nobody consciously notices but everybody feels. The feed is the portfolio.',
        ],
        links: [
            {
                label: 'Instagram — @axiomnsut',
                href: 'https://www.instagram.com/axiomnsut',
                external: true,
            },
        ],
        cta: {
            text: 'Do you have a penchant for d— … you get it.',
            href: '/join',
            label: 'Join the society',
            icon: 'palette',
        },
    },
    {
        slug: 'filmmaking',
        name: 'Filmmaking',
        icon: 'movie',
        blurb: 'Check YouTube @AxiomNSUT.',
        tagline: 'Moving pictures, moving arguments.',
        intro: [
            'The Filmmaking department shoots Axiom. Event aftermovies, sketches, interviews, short documentaries, and whatever else the semester allows us to get away with.',
            'From storyboards to colour grades, we make things you can watch. Cameras, mics, and an unreasonable tolerance for re-shoots provided.',
        ],
        links: [
            {
                label: 'YouTube — @AxiomNSUT',
                href: 'https://www.youtube.com/@AxiomNSUT',
                external: true,
            },
        ],
        cta: {
            text: 'Do you ha—',
            href: '/join',
            label: 'Join the society',
            icon: 'movie',
        },
    },
    {
        slug: 'content',
        name: 'Content',
        icon: 'edit_note',
        blurb: 'Check our newsletter!',
        tagline: 'Words, edited until they behave.',
        intro: [
            'The Content department writes and edits the Axiom Newsletter — long-form essays, philosophical musings, and ideas worth sitting with.',
            'We read closely, argue gently, and cut everything that is only there to sound clever. If you have ever wanted your thinking to survive an editorial pass, this is the room for it.',
        ],
        links: [
            {
                label: 'Newsletter',
                href: '/newsletter/',
                external: false,
            },
            {
                label: 'Digital Library',
                href: 'https://axiomarchive.notion.site/Axiom-Digital-Library-3758d41a5dce80b99cd2c2d0a27022c2',
                external: true,
            },
        ],
        cta: {
            text: 'Do you have a penchant for writing? Join us now at /join!',
            href: '/join',
            label: 'Join the society',
            icon: 'edit_note',
        },
    },
    {
        slug: 'tech',
        name: 'Tech',
        icon: 'code',
        blurb: 'We build the website you are looking at right now.',
        tagline: 'The website you are looking at right now.',
        intro: [
            'The Tech department designs, builds, and maintains this website — the games, the pages, the small interactions you barely notice, all of it. This page is our work.',
            'And no, you do not need to know anything about making websites to join. No knowledge of JavaScript, CSS, HTML, or React is required. We will teach you.',
            'We are not looking for people who already know how to code. We are looking for people who are interested — genuinely, stubbornly curious. That is the entire bar.',
        ],
        links: [
            {
                label: 'GitHub — axiom-web',
                href: 'https://github.com/SqrtNegativOne/axiom-web',
                external: true,
            },
        ],
        cta: {
            text: 'If you are seeking to join this department, no questions of tech will be asked in the interview at all. Just bring your interest.',
            href: '/join',
            label: 'Join the society',
            icon: 'code',
        },
    },
]

export function getDepartment(slug) {
    return DEPARTMENTS.find((d) => d.slug === slug)
}

export const DEPARTMENT_LINKS = DEPARTMENTS.map(({ name, slug, icon }) => ({
    label: name,
    to: `/dept/${slug}`,
    internal: true,
    icon,
}))
