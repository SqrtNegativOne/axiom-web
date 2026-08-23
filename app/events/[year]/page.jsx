import Link from 'next/link'
import EventCard from '../../../components/EventCard'
import SectionDivider from '../../../components/SectionDivider'
import eventsData from '../../../data/events.json'

export function generateStaticParams() {
    return Object.keys(eventsData).filter(k => k !== 'ongoing').map(year => ({ year }))
}

export async function generateMetadata({ params }) {
    const { year } = await params
    return {
        title: `Events ${year} | Axiom`,
        description: `All Axiom philosophy society events from ${year} at NSUT.`
    }
}

export default async function EventsByYear({ params }) {
    const { year } = await params
    const events = eventsData[year] || []
    const ongoing = eventsData.ongoing || []

    const allEvents = year ? [...events, ...ongoing] : []

    return (
        <div className="pt-20 animate-on-load">
            <section className="max-w-5xl mx-auto px-6 py-16">
                <Link
                    href="/events"
                    className="label-mono mb-4 inline-block hover:text-terracotta transition-colors"
                >
                    &larr; Back to Events
                </Link>
                <h1 className="section-heading mb-4">Events {year}</h1>
                <div className="h-px w-16 bg-gold/50 mb-8" />
                <p
                    className="font-body text-ink/70 leading-relaxed max-w-2xl"
                    style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
                >
                    {allEvents.length > 0
                        ? `A collection of ${allEvents.length} event${allEvents.length !== 1 ? 's' : ''} from ${year} — philosophical discussions, creative challenges, and community gatherings that defined this year.`
                        : `No events recorded for ${year} yet. Check back soon or explore other years!`}
                </p>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            {allEvents.length > 0 ? (
                <section className="max-w-5xl mx-auto px-6 py-16">
                    {allEvents.map((event, i) => (
                        <EventCard key={event.title} {...event} index={i} />
                    ))}
                </section>
            ) : (
                <section className="max-w-5xl mx-auto px-6 py-16 text-center">
                    <p className="font-body text-ink/50 text-lg">
                        No events to display for this year.
                    </p>
                </section>
            )}
        </div>
    )
}
