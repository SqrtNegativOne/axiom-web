import events from '../data/events'
import EventCard from '../components/EventCard'
import SectionDivider from '../components/SectionDivider'

export default function Events() {
  return (
    <div className="pt-20 animate-on-load">
      {/* Page header */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="label-mono mb-4">— What we do</p>
        <h1 className="section-heading mb-4">Events</h1>
        <div className="h-px w-16 bg-gold/50 mb-8" />
        <p className="font-body text-ink/70 leading-relaxed max-w-2xl"
           style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
          From intimate chai sessions to campus-wide philosophical games — here is everything
          Axiom has put together for the curious minds among us.
        </p>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Events list */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {events.map((event, i) => (
          <EventCard key={event.title} {...event} index={i} />
        ))}
      </section>
    </div>
  )
}
