import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { EPOCHE } from '../data/puzzles'

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const AXIS_OPTIONS = {
  'Analytic / Synthetic': ['Analytic', 'Synthetic'],
  'A priori / A posteriori': ['A priori', 'A posteriori'],
  'Necessary / Contingent': ['Necessary', 'Contingent'],
  'Descriptive / Normative': ['Descriptive', 'Normative'],
}

function GameBoard({ puzzle, onNewGame }) {
  const axes = Object.keys(puzzle.axes)
  const [sel, setSel] = useState(() => Object.fromEntries(axes.map((a) => [a, null])))
  const [results, setResults] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState('playing') // 'playing' | 'win' | 'lose'

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
      <div className="border border-gold/30 bg-cream rounded-lg px-5 py-4 mb-6">
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
                    className={`ml-2 ${axisCorrect ? 'text-green' : 'text-terracotta'}`}
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
                  let btnClass =
                    'px-4 py-1.5 rounded-full border font-body text-xs cursor-pointer transition-all duration-150 '

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

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(axis, opt)}
                      disabled={status !== 'playing'}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Feedback after wrong attempt (still playing) */}
      {results && status === 'playing' && (
        <div className="bg-terracotta/8 border border-terracotta/20 rounded-lg px-5 py-3 mb-4">
          <p className="font-body text-sm text-terracotta/90">
            {wrongAxes.length === 1
              ? `One axis is wrong — check ${wrongAxes[0]}.`
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
        <div className="bg-green/10 border border-green/30 rounded-lg px-5 py-4">
          <p className="font-mono text-xs tracking-widest uppercase text-green/70 mb-2">
            Correct — all four axes
          </p>
          <p className="font-body text-sm text-ink/65 leading-relaxed">{puzzle.note}</p>
        </div>
      )}

      {/* Lose banner */}
      {status === 'lose' && (
        <div className="bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4">
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
        title="Époche — Philosophy Games"
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

        <p className="label-mono mb-3 text-gold">Classification · 02</p>
        <h1
          className="font-heading font-light text-green mb-4"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
        >
          Époche
        </h1>
        <div className="h-px w-12 bg-gold/40 mb-5" />
        <p className="font-body text-sm text-ink/60 leading-relaxed">
          A philosophical proposition is placed before you. Suspend your assumptions — as Husserl
          instructed — and classify it across four axes. You have three attempts.
        </p>
      </section>

      {/* Game area */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <GameBoard key={gameKey} puzzle={currentPuzzle} onNewGame={handleNewGame} />
      </section>
    </div>
  )
}
