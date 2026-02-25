import team from '../data/team'
import alumni from '../data/alumni'
import TeamCard from '../components/TeamCard'
import AlumniCard from '../components/AlumniCard'
import GalleryCarousel from '../components/GalleryCarousel'
import SectionDivider from '../components/SectionDivider'
import PullQuote from '../components/PullQuote'

const pillars = [
  {
    label: 'Mission',
    text: 'To cultivate a culture of philosophical inquiry at NSUT — creating regular, accessible spaces for rigorous yet welcoming dialogue on the deepest questions of human existence.',
  },
  {
    label: 'Vision',
    text: 'A university where critical thinking and philosophical reflection are part of everyday student life, preparing graduates who are not just skilled, but genuinely wise.',
  },
  {
    label: 'Philosophy',
    text: 'We believe every question deserves to be asked and every perspective deserves to be heard. We hold our certainties lightly and our curiosity firmly.',
  },
]

export default function AboutUs() {
  return (
    <div className="pt-20 animate-on-load">
      {/* Page header */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Who We Are</p>
        <h1 className="section-heading mb-6">About Axiom</h1>
        <div className="h-px w-16 bg-gold/50 mx-auto mb-8" />
        <p className="font-body text-ink/70 leading-relaxed max-w-2xl mx-auto"
           style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
          Axiom is the philosophy society of Netaji Subhas University of Technology. Founded by a
          group of students who believed that the engineer's mind is incomplete without the
          philosopher's eye, we have grown into a vibrant community of curious thinkers.
        </p>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Mission / Vision / Philosophy */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ label, text }) => (
            <div key={label} className="bg-cream-dark p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-terracotta group-hover:h-full transition-all duration-500" />
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 pl-4">{label}</p>
              <p className="font-body text-sm text-ink/70 leading-relaxed pl-4">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Origin story */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Our Story</p>
        <h2 className="font-heading text-green font-light text-3xl mb-8">How it began</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-body text-ink/70 leading-relaxed mb-4"
               style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
              Axiom began with a small group of students who found themselves unsatisfied with
              purely technical conversations. They wanted to ask bigger questions — about ethics in
              technology, the nature of consciousness, what it means to live a good life.
            </p>
            <p className="font-body text-ink/70 leading-relaxed"
               style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
              What started as informal chai sessions in the NSUT canteen gradually evolved into
              structured events, philosophical walks, annual festivals, and eventually this — a
              full-fledged society with a newsletter, alumni network, and a reputation for being the
              most intellectually adventurous society on campus.
            </p>
          </div>
          <div>
            <PullQuote>
              Philosophy begins in wonder. And at Axiom, the wonder never stops.
            </PullQuote>
            <p className="font-body text-ink/70 leading-relaxed mt-4"
               style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
              Our signature event, Chai Pe Charcha (CPC), remains the beating heart of Axiom.
              Every week, without fail, students gather over hot cups of chai to debate, discuss,
              and occasionally disagree — loudly, joyfully, philosophically.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 text-center">The People</p>
        <h2 className="section-heading text-center mb-3">Our Team</h2>
        <p className="font-body text-ink/60 text-center mb-14 max-w-xl mx-auto">
          Meet the brilliant minds who keep Axiom running — thinkers, organisers, and dedicated stewards of philosophical culture at NSUT.
        </p>

        {team.map((group) => (
          <div key={group.role} className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gold/20" />
              <h3 className="font-body text-xs tracking-[0.3em] uppercase text-gold px-4">{group.role}</h3>
              <div className="h-px flex-1 bg-gold/20" />
            </div>
            <div
              className={`grid gap-10 ${
                group.members.length === 1
                  ? 'grid-cols-1 place-items-center'
                  : group.members.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-lg mx-auto'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
              }`}
            >
              {group.members.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Alumni */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 text-center">Those Who Came Before</p>
        <h2 className="section-heading text-center mb-3">Alumni</h2>
        <p className="font-body text-ink/60 text-center mb-12 max-w-xl mx-auto">
          In their own words — what Axiom meant to the people who built it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((person) => (
            <AlumniCard key={person.name} {...person} />
          ))}
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 text-center">Moments</p>
          <h2 className="section-heading text-center mb-4">Gallery</h2>
        </div>
        <GalleryCarousel />
      </section>
    </div>
  )
}
