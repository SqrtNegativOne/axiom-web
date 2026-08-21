import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { gamesList } from '../data/gamesList.js'
import eventsData from '../data/events.json'

const SITE_NAME = 'Axiom ⋅ The Philosophy Society'
const SITE_URL = 'https://axiomnsut.in'
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.png`
const DEFAULT_DESCRIPTION =
    'Axiom is the philosophy society at NSUT. Fostering curiosity and philosophical inquiry since 2017.'

const SECTION_LABELS = {
    team: 'Team',
    events: 'Events',
    games: 'Games',
    colophon: 'Colophon',
    privacy: 'Privacy Policy',
}

function segmentLabel(segment) {
    if (SECTION_LABELS[segment]) return SECTION_LABELS[segment]
    const game = gamesList.find((g) => g.path === segment)
    if (game) return game.title
    return segment
}

function buildBreadcrumb(pathname) {
    const segments = pathname.split('/').filter(Boolean)
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`,
            },
            ...segments.map((segment, i) => ({
                '@type': 'ListItem',
                position: i + 2,
                name: segmentLabel(segment),
                item: `${SITE_URL}/${segments.slice(0, i + 1).join('/')}/`,
            })),
        ],
    }
}

function buildEventsItemList() {
    const years = Object.keys(eventsData).sort((a, b) => b.localeCompare(a))
    let position = 0
    const itemListElement = []
    for (const year of years) {
        for (const event of eventsData[year] || []) {
            position += 1
            itemListElement.push({
                '@type': 'ListItem',
                position,
                name: event.title,
                url: `${SITE_URL}/events/${year}/#${event.imageFolder}`,
            })
        }
    }
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Axiom — The Philosophy Society Events',
        numberOfItems: itemListElement.length,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement,
    }
}

export default function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    path = null,
    type = 'website',
    image = DEFAULT_IMAGE,
    noindex = false,
}) {
    const fullTitle = title ? `${title} ⋅ ${SITE_NAME}` : SITE_NAME
    const location = useLocation()
    const resolvedPath = path ?? location.pathname
    const canonicalUrl = `${SITE_URL}${resolvedPath}`

    const jsonLd = []
    if (!noindex && resolvedPath !== '/') {
        jsonLd.push(buildBreadcrumb(resolvedPath))
    }
    if (resolvedPath.replace(/\/+$/, '') === '/events') {
        jsonLd.push(buildEventsItemList())
    }

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {jsonLd.length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="512" />
            <meta property="og:image:height" content="512" />
            <meta
                property="og:image:alt"
                content="Axiom — The Philosophy Society logo"
            />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    )
}
