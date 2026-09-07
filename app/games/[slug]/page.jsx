import { notFound } from 'next/navigation'
import { gamesList } from '../../../data/gamesList'

import Hermeneutic from '../Hermeneutic'
import Epoche from '../Epoche'
import Fallacy from '../Fallacy'
import Dialectic from '../Dialectic'
import NegativeDialectic from '../NegativeDialectic'
import Sorites from '../Sorites'
import Repugnant from '../Repugnant'
import Philosophle from '../Philosophle'
import ButterflyJob from '../ButterflyJob'
import FallacyDetective from '../FallacyDetective'
import PhilosopherMatch from '../PhilosopherMatch'
import ConceptMap from '../ConceptMap'
import ArgumentReconstruction from '../ArgumentReconstruction'
import ParadigmShift from '../ParadigmShift'

const GAME_COMPONENTS = {
    'hermeneutic': Hermeneutic,
    'epoche': Epoche,
    'fallacy': Fallacy,
    'dialectics': Dialectic,
    'dialectic': Dialectic,
    'negative-dialectics': NegativeDialectic,
    'sorites': Sorites,
    'repugnant': Repugnant,
    'philosophle': Philosophle,
    'butterfly-job': ButterflyJob,
    'fallacy-detective': FallacyDetective,
    'philosopher-match': PhilosopherMatch,
    'concept-map': ConceptMap,
    'argument-reconstruction': ArgumentReconstruction,
    'paradigm-shift': ParadigmShift,
}

export function generateStaticParams() {
    const slugs = gamesList.map((g) => ({ slug: g.path }))
    if (!slugs.some((s) => s.slug === 'dialectic')) {
        slugs.push({ slug: 'dialectic' })
    }
    return slugs
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const game =
        gamesList.find((g) => g.path === slug) ||
        (slug === 'dialectic' ? gamesList.find((g) => g.path === 'dialectics') : null)

    if (!game) {
        return {
            title: 'Game Not Found | Axiom',
        }
    }

    return {
        title: `${game.title} | Axiom Games`,
        description: game.desc,
    }
}

export default async function GamePage({ params }) {
    const { slug } = await params
    const Component = GAME_COMPONENTS[slug]

    if (!Component) {
        notFound()
    }

    return <Component />
}
