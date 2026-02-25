import events from '../data/events'
import EventCard from '../components/EventCard'
import SectionDivider from '../components/SectionDivider'

export default function Events() {
  return (
    <div className="pt-20 animate-on-load">
      {/* Page header */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">What We Do</p>
        <h1 className="section-heading mb-6">Events</h1>
        <div className="h-px w-16 bg-gold/50 mx-auto mb-8" />
        <p className="font-body text-ink/70 leading-relaxed max-w-2xl mx-auto"
           style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
          From intimate chai sessions to campus-wide philosophical games — here is everything
          Axiom has put together for the curious minds of NSUT.
        </p>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Events list */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </section>
    </div>
  )
}
