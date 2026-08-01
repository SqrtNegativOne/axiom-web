import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import eventsData from '../../data/events.json'
import EventCard from '../../components/EventCard'
import SectionDivider from '../../components/SectionDivider'

export default function Events() {
    // Show 2025, 2026, and ongoing events on main page
    const currentEvents = [
        ...(eventsData['2026'] || []),
        ...(eventsData['2025'] || []),
        ...(eventsData['ongoing'] || []),
    ]

    const yearLinks = [
        { year: '2024', label: '2024' },
        { year: '2023', label: '2023' },
    ]

    return (
        <div className="pt-20 animate-on-load">
            <SEO
                title="Events"
                path="/events"
                description="Chai Pe Charcha, Wheel of Doom, Philo Walk and more — explore all of Axiom's philosophical events at NSUT."
            />
            {/* Page header */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <h1 className="section-heading mb-4">Events</h1>
                <p
                    className="font-body text-ink/70 leading-relaxed max-w-2xl"
                    style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
                >
                    Everything Axiom has put together for the curious minds
                    among us.
                </p>

                {/* Year navigation */}
                <div className="mt-8 flex flex-wrap gap-3">
                    <span className="font-mono text-xs tracking-[0.2em] uppercase text-gold/70">
                        Past Events:
                    </span>
                    {yearLinks.map(({ year, label }) => (
                        <Link
                            key={year}
                            to={`/events/${year}`}
                            className="font-mono text-xs tracking-[0.15em] uppercase text-green hover:text-terracotta transition-colors border border-green/20 hover:border-terracotta/40 px-4 py-2 rounded"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </section>

            <SectionDivider className="px-6 max-w-6xl mx-auto" />

            {/* Events list */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                {currentEvents.map((event, i) => (
                    <EventCard key={event.title} {...event} index={i} />
                ))}
            </section>
        </div>
    )
}
