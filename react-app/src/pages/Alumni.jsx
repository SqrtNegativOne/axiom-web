import { Link } from 'react-router-dom'
import teamLegacy from '../data/team-2024'
import TeamCard from '../components/TeamCard'
import SectionDivider from '../components/SectionDivider'

export default function Alumni() {
  return (
    <div className="pt-20 animate-on-load">
      {/* Page header */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="label-mono mb-4">Those Who Came Before</p>
        <h1 className="section-heading mb-6">Previous Leadership</h1>
        <div className="h-px w-16 bg-gold/50 mx-auto mb-8" />
        <p className="font-body text-ink/70 leading-relaxed max-w-2xl mx-auto"
           style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}>
          The people who built Axiom into what it is today. Their ideas, energy, and
          commitment live on in every conversation we have.
        </p>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Previous Leadership */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="label-mono mb-4 text-center">Previous Leadership</p>
        <h2 className="section-heading text-center mb-3">Team 2024</h2>
        <p className="font-body text-ink/60 text-center mb-14 max-w-xl mx-auto">
          The team that steered Axiom through its previous chapter.
        </p>

        {teamLegacy.map((group) => (
          <div key={group.role} className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gold/20" />
              <h3 className="label-mono px-4">{group.role}</h3>
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

      {/* Navigation links */}
      <section className="max-w-4xl mx-auto px-6 py-8 flex justify-center gap-8">
        <Link
          to="/about"
          className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
        >
          &larr; Back to current team
        </Link>
        <Link
          to="/about/2023"
          className="font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4"
        >
          Team 2023 &rarr;
        </Link>
      </section>
    </div>
  )
}
