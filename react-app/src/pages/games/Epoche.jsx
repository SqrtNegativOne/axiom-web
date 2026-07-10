import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { EPOCHE } from '../../data/epoche'

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const AXIS_OPTIONS = {
  'Analytic / Synthetic': ['Analytic', 'Synthetic'],
  'A priori / A posteriori': ['A priori', 'A posteriori'],
  'Necessary / Contingent': ['Necessary', 'Contingent'],
  'Descriptive / Normative': ['Descriptive', 'Normative'],
}

const TERMS = [
  {
    axis: 'Analytic / Synthetic',
    terms: [
      {
        name: 'Analytic',
        def: 'Truth follows from the meanings of its terms alone; predicate adds nothing beyond what is already contained in the subject.',
      },
      {
        name: 'Synthetic',
        def: 'Adds information beyond what is contained in the subject\'s meaning. Truth cannot be determined by concept analysis alone; it requires appeal to experience or further reasoning.',
      },
    ],
  },
  {
    axis: 'A priori / A posteriori',
    terms: [
      {
        name: 'A priori',
        def: 'Knowledge or justification independent of sensory experience.',
      },
      {
        name: 'A posteriori',
        def: 'Knowledge derived from and dependent on sensory experience. Empirical claims about the contingent world.',
      },
    ],
  },
  {
    axis: 'Necessary / Contingent',
    terms: [
      {
        name: 'Necessary',
        def: 'True in every possible world. Denial leads to contradiction.',
      },
      {
        name: 'Contingent',
        def: 'A proposition that is true but could have been false — true in some possible worlds, false in others. "Napoleon lost at Waterloo" is contingent: history could have gone differently.',
      },
    ],
  },
  {
    axis: 'Descriptive / Normative',
    terms: [
      {
        name: 'Descriptive',
        def: 'States how things are, were, or will be. Falsifiable.',
      },
      {
        name: 'Normative',
        def: 'States how things ought to be, what is good, right, or valuable.',
      },
    ],
  },
]

const TERM_DEFS = Object.fromEntries(
  TERMS.flatMap(({ terms }) => terms.map(({ name, def }) => [name, def]))
)

function Tooltip({ children, text }) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  function show() {
    clearTimeout(timerRef.current)
    setVisible(true)
  }
  function hide() {
    timerRef.current = setTimeout(() => setVisible(false), 80)
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 z-50"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' }}
        >
          <div className="bg-[#1A1A18] text-[#F8F4EC]/80 text-xs font-body leading-relaxed rounded-lg px-3 py-2.5">
            {text}
          </div>
          <div className="mx-auto w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#1A1A18]" />
        </div>
      )}
    </div>
  )
}

function getButtonClass(status, hasResult, isSelected, axisCorrect, isCorrectAnswer) {
  let btnClass = 'px-4 py-1.5 rounded-full border font-body text-xs cursor-pointer transition-all duration-150 '

  if (status === 'playing' && !hasResult) {
    btnClass += isSelected
      ? 'bg-green text-cream border-transparent'
      : 'border-gold/30 text-ink/60 hover:border-gold/60 hover:text-ink'
  } else if (status === 'playing' && hasResult) {
    // After submission but not yet done — show partial feedback
    if (isSelected && !axisCorrect) {
      btnClass += 'bg-terracotta/15 text-terracotta border-terracotta/25'
    } else if (isSelected && axisCorrect) {
      btnClass += 'bg-green text-cream border-transparent'
    } else {
      btnClass += 'border-gold/20 text-ink/35 cursor-default'
    }
  } else {
    // Done (win or lose): reveal correct
    if (isCorrectAnswer) {
      btnClass += 'bg-green text-cream border-transparent'
    } else if (isSelected && !isCorrectAnswer) {
      btnClass += 'bg-terracotta/15 text-terracotta border-terracotta/25'
    } else {
      btnClass += 'border-gold/20 text-ink/30 cursor-default'
    }
  }

  return btnClass
}

function GameBoard({ puzzle, onNewGame }) {
  const axes = Object.keys(puzzle.axes)
  const [sel, setSel] = useState(() => Object.fromEntries(axes.map((a) => [a, null])))
  const [results, setResults] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState('playing') // 'playing' | 'win' | 'lose'
  const [firstAllWrong, setFirstAllWrong] = useState(false)

  const allSelected = axes.every((a) => sel[a] !== null)

  function handleSelect(axis, val) {
    if (status !== 'playing') return
    setSel((s) => ({ ...s, [axis]: val }))
  }

  function handleSubmit() {
    if (!allSelected || status !== 'playing') return
    const res = Object.fromEntries(axes.map((a) => [a, sel[a] === puzzle.axes[a]]))
    const allCorrect = axes.every((a) => res[a])
    const newAttempts = attempts + 1
    if (attempts === 0 && axes.every((a) => !res[a])) setFirstAllWrong(true)
    setResults(res)
    setAttempts(newAttempts)
    if (allCorrect) {
      setStatus('win')
    } else if (newAttempts >= 3) {
      setStatus('lose')
    }
  }

  const wrongAxes = results ? axes.filter((a) => !results[a]) : []

  return (
    <div className="max-w-2xl mx-auto">
      {/* Statement */}
      <div className="border border-gold/30 rounded-lg px-5 py-4 mb-6">
        <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">Proposition</p>
        <p className="font-heading font-light text-ink text-xl leading-snug">{puzzle.statement}</p>
      </div>

      {/* Axes */}
      <div className="border border-gold/20 rounded-lg overflow-hidden mb-5">
        {axes.map((axis, i) => {
          const opts = AXIS_OPTIONS[axis]
          const chosen = sel[axis]
          const correct = puzzle.axes[axis]
          const hasResult = results !== null
          const axisCorrect = hasResult ? results[axis] : null

          return (
            <div
              key={axis}
              className={`flex items-center gap-4 px-5 py-3 flex-wrap ${
                i < axes.length - 1 ? 'border-b border-gold/15' : ''
              }`}
            >
              {/* Label */}
              <span className="font-mono text-xs text-ink/50 tracking-wide flex-1 min-w-[160px]">
                {axis}
                {hasResult && (
                  <span
                    className={`ml-2 animate-pop-in ${axisCorrect ? 'text-green' : 'text-terracotta'}`}
                  >
                    {axisCorrect ? '✓' : '✗'}
                  </span>
                )}
              </span>

              {/* Option buttons */}
              <div className="flex gap-2">
                {opts.map((opt) => {
                  const isSelected = chosen === opt
                  const isCorrectAnswer = opt === correct
                  const btnClass = getButtonClass(status, hasResult, isSelected, axisCorrect, isCorrectAnswer)

                  return (
                    <Tooltip key={opt} text={TERM_DEFS[opt]}>
                      <button
                        onClick={() => handleSelect(axis, opt)}
                        disabled={status !== 'playing'}
                        className={btnClass}
                      >
                        {opt}
                      </button>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Feedback after wrong attempt (still playing) */}
      {results && status === 'playing' && (
        <div className="bg-terracotta/8 border border-terracotta/20 rounded-lg px-5 py-3 mb-4 animate-slide-up">
          <p className="font-body text-sm text-terracotta/90">
            {wrongAxes.length === 1
              ? `One axis is wrong — reconsider and try again.`
              : `${wrongAxes.length} axes are wrong — reconsider and try again.`}{' '}
            <span className="text-ink/40">({3 - attempts} {3 - attempts === 1 ? 'attempt' : 'attempts'} left)</span>
          </p>
        </div>
      )}

      {/* Submit */}
      {status === 'playing' && (
        <button
          onClick={handleSubmit}
          disabled={!allSelected}
          className="px-6 py-2.5 rounded-lg bg-green text-cream font-body text-sm hover:bg-green/90 disabled:opacity-40 disabled:cursor-default transition-colors duration-150"
        >
          Submit classification
        </button>
      )}

      {/* Win banner */}
      {status === 'win' && (
        <div className="bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in">
          <p className="font-mono text-xs tracking-widest uppercase text-green/70 mb-2">
            Correct — all four axes
          </p>
          <p className="font-body text-sm text-ink/65 leading-relaxed">{puzzle.note}</p>
        </div>
      )}

      {/* Unexamined Assumption easter egg */}
      {status === 'win' && firstAllWrong && (
        <div className="mt-4 border border-gold/40 rounded-lg overflow-hidden animate-slide-up">
          <div className="bg-gold/10 px-5 py-3 border-b border-gold/25">
            <p className="font-mono text-xs tracking-widest uppercase text-gold">
              Easter Egg · Unexamined Assumption
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="font-body text-sm text-ink/80 leading-relaxed mb-3">
              Your first attempt was wrong on all four axes — every classification the inverse of the truth.
              You bracketed your assumptions, reconsidered, and found your way through.
            </p>
            <blockquote className="border-l-4 border-terracotta pl-4 mb-3">
              <p className="font-heading font-light text-ink text-base italic leading-relaxed">
                "We put out of action the general positing which belongs to the essence of the natural attitude;
                we parenthesize everything which that positing encompasses."
              </p>
            </blockquote>
            <p className="font-mono text-xs tracking-widest uppercase text-gold/70">
              Edmund Husserl · Ideas I (1913)
            </p>
          </div>
        </div>
      )}

      {/* Lose banner */}
      {status === 'lose' && (
        <div className="bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in">
          <p className="font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-2">
            Three attempts used
          </p>
          <p className="font-body text-sm text-ink/65 leading-relaxed">{puzzle.note}</p>
        </div>
      )}

      {/* Attempts indicator */}
      {status === 'playing' && attempts > 0 && (
        <p className="font-mono text-xs text-ink/30 mt-3 tracking-wide">
          Attempt {attempts} of 3
        </p>
      )}

      {/* Play again */}
      {status !== 'playing' && (
        <button
          onClick={onNewGame}
          className="mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150"
        >
          New proposition
        </button>
      )}
    </div>
  )
}

export default function GameEpoche() {
  const [gameKey, setGameKey] = useState(0)
  const [currentPuzzle, setCurrentPuzzle] = useState(() => rand(EPOCHE))

  function handleNewGame() {
    setCurrentPuzzle(rand(EPOCHE))
    setGameKey((k) => k + 1)
  }

  return (
    <div className="pt-20 animate-on-load">
      <SEO
        title="Époche —"
        path="/games/epoche"
        description="Classify a philosophical proposition across four axes: analytic/synthetic, a priori/a posteriori, necessary/contingent, descriptive/normative."
      />

      {/* Header */}
      <section className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/games"
            className="font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150"
          >
            ← Games
          </Link>
          <span className="text-gold/30">/</span>
          <span className="font-mono text-xs tracking-widest uppercase text-ink/40">Époche</span>
        </div>

      </section>

      {/* Game area */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <GameBoard key={gameKey} puzzle={currentPuzzle} onNewGame={handleNewGame} />
      </section>
    </div>
  )
}
