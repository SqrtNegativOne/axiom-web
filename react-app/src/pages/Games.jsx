import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SectionDivider from '../components/SectionDivider'
import { FALLACY_OPTS } from '../data/fallacy'

const externalExperiments = [
  {
    title: 'Philosophy Experiments',
    url: 'https://philosophyexperiments.com',
    domain: 'philosophyexperiments.com',
    desc: '26 browser-based experiments by Jeremy Stangroom: Battleground God (contradiction detection), Morality Play (reveals your ethical framework), Staying Alive (Parfit\'s personal identity), Whose Body Is It Anyway? (Thomson\'s violinist), and Talking with God (Euthyphro dilemma).',
  },
  {
    title: 'MIT Moral Machine',
    url: 'https://moralmachine.mit.edu',
    domain: 'moralmachine.mit.edu',
    desc: 'Trolley-problem variants across 13 scenarios. Reveals how your moral judgements compare globally, and lets you design your own cases.',
  },
  {
    title: 'Absurd Trolley Problems',
    url: 'https://neal.fun/absurd-trolley-problems',
    domain: 'neal.fun',
    desc: '28 escalating trolley variants with crowd-sourced results per dilemma.',
  },
  {
    title: 'The Evolution of Trust',
    url: 'https://ncase.me/trust',
    domain: 'ncase.me',
    desc: 'An interactive game-theory tutorial by Nicky Case on the Prisoner\'s Dilemma, and how cooperation can emerge from it.',
  },
  {
    title: 'Milton',
    url: 'https://milton-23eac.web.app/',
    domain: 'milton-23eac.web.app',
    desc: 'A philosophical dialogue game exploring questions of mind, identity, and consciousness through conversation.',
  },
  {
    title: 'Milton (mirror)',
    url: 'https://mindany2.fr/milton/?lang=enu',
    domain: 'mindany2.fr',
    desc: 'Alternate host for the Milton experience — use if the primary link is unavailable.',
  },
  {
    title: 'History of Philosophy',
    url: 'https://www.denizcemonduygu.com/philo/browse/',
    domain: 'denizcemonduygu.com',
    desc: 'An interactive visual map of Western philosophy by Deniz Cem Önduygu — browse 200+ philosophers across 25 centuries, explore influence connections, and click any thinker to see who they shaped and who shaped them.',
  },
]

const externalGames = [
  {
    title: 'Socrates Jones: Pro Philosopher',
    url: 'https://store.steampowered.com/app/2120060/Socrates_Jones_Pro_Philosopher/',
    domain: 'Steam (free)',
    desc: 'Ace Attorney-style debate mechanics. You debate Euthyphro, Protagoras, Hobbes, Mill, and Kant using pure elenchus: request clarification, challenge relevance, demand backing.',
  },
  {
    title: 'The Talos Principle',
    url: 'https://store.steampowered.com/app/257510/The_Talos_Principle/',
    domain: 'Steam',
    desc: 'A first-person puzzle game by Croteam in which an android navigates a world saturated with philosophical texts — Anaxagoras, Milton, Goethe — and must decide whether it is conscious, free, and worthy of existence.',
  },
  {
    title: 'The Talos Principle 2',
    url: 'https://store.steampowered.com/app/835960/The_Talos_Principle_2/',
    domain: 'Steam',
    desc: 'The sequel deepens the inquiry into AI consciousness, political philosophy, and the ethics of civilisation. Features branching arguments with in-world characters representing distinct philosophical positions.',
  },
  {
    title: 'Disco Elysium',
    url: 'https://store.steampowered.com/app/632470/Disco_Elysium__The_Final_Cut/',
    domain: 'Steam',
    desc: 'A detective RPG in which your fractured psyche — 24 competing skill-voices — debates every action. Engages directly with Marxism, existentialism, Taoism, and the phenomenology of failure. Widely considered the most philosophically dense game ever made.',
  },
]

const games = [
  {
    path: '/games/hermeneutic',
    eyebrow: 'Word Puzzle',
    title: 'Hermeneutic',
    desc: 'Guess the philosophical term from progressively revealing clues. Each wrong guess unveils another layer of context, from etymology to Heidegger.',
    hint: 'Up to 5 clues · 6 guesses',
  },
  {
    path: '/games/epoche',
    eyebrow: 'Classification',
    title: 'Époche',
    desc: 'A proposition is placed before you. Classify it across four philosophical axes: analytic or synthetic, a priori or a posteriori, necessary or contingent, descriptive or normative.',
    hint: '4 axes · 3 attempts',
  },
  {
    path: '/games/fallacy',
    eyebrow: 'Identification',
    title: 'Fallacy',
    desc: "Identify the logical fallacy embedded in a philosophical argument. Wrong guesses reveal whether you're in the right family or class, narrowing the field.",
    hint: `${FALLACY_OPTS.length} options · 4 guesses · colour-coded hints`,
  },
  {
    path: '/games/dialectic',
    eyebrow: 'Synthesis',
    title: 'Dialectic',
    desc: 'A thesis is presented. First identify its historical antithesis, then select the synthesis that resolves the contradiction, tracing the actual movement of Western thought.',
    hint: '2 stages · 2 attempts each',
  },
  {
    path: '/games/sorites',
    eyebrow: 'Experiment',
    title: 'Sorites',
    desc: 'Pick your favourite and least favourite colour. Classify 34 patches across the gradient between them and discover the Sorites paradox hiding in your own judgements.',
    hint: '34 patches · personalised gradient · reveals your contradictions',
  },
  {
    path: '/games/repugnant',
    eyebrow: 'Population Ethics',
    title: 'The Repugnant Conclusion',
    desc: 'Make a series of world-comparisons, each individually reasonable. Follow your own logic through 9 steps and discover whether you endorse the conclusion Parfit called the most important problem in ethics.',
    hint: '9 steps · Parfit 1984 · no right answer',
  },
  {
    path: '/games/philosophle',
    eyebrow: 'Word Puzzle',
    title: 'Philosophle',
    desc: 'Guess the hidden philosophical term — a concept, thinker, or Greek root between 3 and 7 letters. Colour-coded feedback narrows each attempt. Three-letter words grant an extra guess.',
    hint: '3-7 letters · 6 guesses',
  },
  {
    path: '/games/butterfly-job',
    eyebrow: 'Counterfactual History',
    title: 'The Butterfly Job',
    desc: 'Step into seven minor roles across the twentieth century and make one decision in each moment. Watch how tiny choices preserve or derail recorded history.',
    hint: '7 decisions · divergence scoring · final timeline report',
  },
]

export default function Games() {
  return (
    <div className="pt-20 animate-on-load">
      <SEO
        title="Philosophy Games"
        path="/games"
        description="Interactive philosophy games: guess a term from clues, classify propositions, identify fallacies, and trace dialectical movements in the history of thought."
      />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-6 text-center">
        <p className="label-mono mb-3">Play & Think</p>
        <h1 className="section-heading mb-3">Philosophy Games</h1>
        <div className="h-px w-16 bg-gold/50 mx-auto mb-3" />
      </section>

      {/* Game cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map(({ path, eyebrow, title, desc, hint }) => (
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

      {/* External resources */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="label-mono mb-4">Around the Web</p>
          <h2
            className="font-heading font-light text-green mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            External Experiments &amp; Games
          </h2>
          <div className="h-px w-16 bg-gold/50 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Experiments column */}
          <div className="lg:col-span-2">
            <p className="label-mono text-gold mb-5">Interactive Experiments</p>
            <div className="space-y-0 divide-y divide-gold/12">
              {externalExperiments.map(({ title, url, domain, desc }) => (
                <div key={url} className="py-5 group">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-light text-green group-hover:text-terracotta transition-colors duration-150"
                      style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
                    >
                      {title}
                    </a>
                    <span className="font-mono text-xs text-gold/50 whitespace-nowrap pt-1 shrink-0">
                      {domain} ↗
                    </span>
                  </div>
                  <p className="font-body text-sm text-ink/55 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Games column */}
          <div>
            <p className="label-mono text-gold mb-5">External Games</p>
            <div className="space-y-0 divide-y divide-gold/12">
              {externalGames.map(({ title, url, domain, desc }) => (
                <div key={url} className="py-5 group">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-light text-green group-hover:text-terracotta transition-colors duration-150"
                      style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
                    >
                      {title}
                    </a>
                    <span className="font-mono text-xs text-gold/50 whitespace-nowrap pt-1 shrink-0">
                      {domain} ↗
                    </span>
                  </div>
                  <p className="font-body text-sm text-ink/55 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider className="px-6 max-w-6xl mx-auto" />

      {/* Footer note */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="font-body text-sm text-ink/50 leading-relaxed">
          New puzzles are added as the year progresses.
        </p>
      </section>
    </div>
  )
}
