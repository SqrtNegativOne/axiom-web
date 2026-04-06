import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SectionDivider from '../components/SectionDivider'

const games = [
  {
    num: '01',
    path: '/games/hermeneutic',
    eyebrow: 'Word Puzzle',
    title: 'Hermeneutic',
    desc: 'Guess the philosophical term from progressively revealing clues. Each wrong guess unveils another layer of context — from etymology to Heidegger.',
    hint: 'Up to 5 clues · 6 guesses',
  },
  {
    num: '02',
    path: '/games/epoche',
    eyebrow: 'Classification',
    title: 'Époche',
    desc: 'A proposition is placed before you. Classify it across four philosophical axes: analytic or synthetic, a priori or a posteriori, necessary or contingent, descriptive or normative.',
    hint: '4 axes · 3 attempts',
  },
  {
    num: '03',
    path: '/games/fallacy',
    eyebrow: 'Identification',
    title: 'Fallacy',
    desc: "Identify the logical fallacy embedded in a philosophical argument. Wrong guesses reveal whether you're in the right family or class — narrowing the field.",
    hint: '12 options · 4 guesses · colour-coded hints',
  },
  {
    num: '04',
    path: '/games/dialectic',
    eyebrow: 'Synthesis',
    title: 'Dialectic',
    desc: 'A thesis is presented. First identify its historical antithesis, then select the synthesis that resolves the contradiction — tracing the actual movement of Western thought.',
    hint: '2 stages · 2 attempts each',
  },
]

export default function Games() {
  return (
    <div className="pt-20 animate-on-load">
      <SEO
        title="Philosophy Games"
        path="/games"
        description="Four interactive philosophy games — guess a term from clues, classify propositions, identify fallacies, and trace dialectical movements in the history of thought."
      />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="label-mono mb-4">Play & Think</p>
        <h1 className="section-heading mb-6">Philosophy Games</h1>
        <div className="h-px w-16 bg-gold/50 mx-auto mb-8" />
        <p
          className="font-body text-ink/70 leading-relaxed max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
        >
          Four games drawn from the practice of philosophy itself — hermeneutics,
          phenomenological suspension, informal logic, and dialectical method. Each
          puzzle is a small exercise in the kind of thinking we do at Axiom.
        </p>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Game cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map(({ num, path, eyebrow, title, desc, hint }) => (
            <Link
              key={path}
              to={path}
              className="group block bg-cream-dark border border-gold/20 rounded-lg p-8 relative overflow-hidden hover:border-gold/50 transition-all duration-300"
            >
              {/* Terracotta left-border on hover */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-terracotta group-hover:h-full transition-all duration-500" />

              <div className="pl-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="label-mono text-gold">{eyebrow}</p>
                  <span className="font-mono text-3xl font-light text-gold/30 leading-none select-none">
                    {num}
                  </span>
                </div>

                <h2 className="font-heading font-light text-green mb-3 group-hover:text-terracotta transition-colors duration-200"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                  {title}
                </h2>

                <p className="font-body text-sm text-ink/65 leading-relaxed mb-6">
                  {desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold/70 tracking-wide">{hint}</span>
                  <span className="font-body text-xs text-terracotta/0 group-hover:text-terracotta transition-colors duration-200 tracking-wide">
                    Play →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Footer note */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="font-body text-sm text-ink/50 leading-relaxed">
          Puzzles are drawn from canonical texts in Western philosophy — Plato, Aristotle,
          Kant, Hegel, and their interpreters. New puzzles are added as the year progresses.
        </p>
      </section>
    </div>
  )
}
