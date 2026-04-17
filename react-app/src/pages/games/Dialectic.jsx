import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { DIALECTIC } from '../../data/dialectic'

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle(arr) {
  const b = [...arr]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

function OptionButton({ text, result, pending, onClick, disabled }) {
  let className =
    'w-full text-left px-4 py-3 rounded-lg border font-body text-sm leading-relaxed transition-all duration-150 '

  if (result === 'correct') {
    className += 'bg-green/10 border-green/40 text-ink cursor-default'
  } else if (result === 'wrong') {
    className += 'bg-terracotta/8 border-terracotta/20 text-terracotta/70 cursor-default'
  } else if (result === 'reveal') {
    className += 'bg-green/8 border-green/25 text-ink/60 cursor-default italic'
  } else if (pending) {
    className += 'border-gold/60 bg-cream-dark text-ink cursor-pointer ring-1 ring-gold/30'
  } else if (disabled) {
    className += 'border-gold/15 text-ink/30 cursor-default'
  } else {
    className += 'border-gold/25 text-ink/70 hover:border-gold/50 hover:bg-cream-dark hover:text-ink cursor-pointer'
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {result === 'correct' && (
        <span className="font-mono text-xs text-green tracking-widest uppercase block mb-1">
          Correct ✓
        </span>
      )}
      {result === 'wrong' && (
        <span className="font-mono text-xs text-terracotta tracking-widest uppercase block mb-1">
          Incorrect ✗
        </span>
      )}
      {result === 'reveal' && (
        <span className="font-mono text-xs text-green/60 tracking-widest uppercase block mb-1">
          This was the antithesis
        </span>
      )}
      {text}
    </button>
  )
}

function GameBoard({ puzzle, onNewGame }) {
  const [antitheses] = useState(() => shuffle(puzzle.antitheses))
  const [syntheses] = useState(() => shuffle(puzzle.syntheses))

  const [stage, setStage] = useState(1) // 1 or 2
  const [aAttempts, setAAttempts] = useState(0)
  const [aResult, setAResult] = useState(null) // {idx, correct, revealIdx?}
  const [sAttempts, setSAttempts] = useState(0)
  const [sResult, setSResult] = useState(null)
  const [status, setStatus] = useState('playing')
  const [pendingA, setPendingA] = useState(null) // idx | null
  const [pendingS, setPendingS] = useState(null) // idx | null

  function pickAntithesis(idx) {
    if (stage !== 1 || aResult?.correct || aResult?.revealIdx !== undefined) return
    setPendingA(idx)
  }

  function submitAntithesis() {
    const idx = pendingA
    if (idx === null) return
    setPendingA(null)
    const correct = antitheses[idx].correct
    const newAttempts = aAttempts + 1
    setAAttempts(newAttempts)

    if (correct) {
      setAResult({ idx, correct: true })
      setStage(2)
    } else if (newAttempts >= 2) {
      const revealIdx = antitheses.findIndex((a) => a.correct)
      setAResult({ idx, correct: false, revealIdx })
      setStage(2)
    } else {
      setAResult({ idx, correct: false })
    }
  }

  function pickSynthesis(idx) {
    if (stage !== 2 || status !== 'playing') return
    setPendingS(idx)
  }

  function submitSynthesis() {
    const idx = pendingS
    if (idx === null) return
    setPendingS(null)
    const correct = syntheses[idx].correct
    const newAttempts = sAttempts + 1
    setSAttempts(newAttempts)
    setSResult({ idx, correct })
    if (correct) setStatus('win')
    else if (newAttempts >= 2) setStatus('lose')
  }

  function getAntithesisResult(idx) {
    if (!aResult) return null
    if (aResult.correct && aResult.idx === idx) return 'correct'
    if (!aResult.correct) {
      if (aResult.idx === idx) return 'wrong'
      if (aResult.revealIdx === idx) return 'reveal'
    }
    return null
  }

  function getSynthesisResult(idx) {
    if (!sResult) return null
    const correct = syntheses[idx].correct
    if (sResult.idx === idx) return sResult.correct ? 'correct' : 'wrong'
    if (status !== 'playing' && correct) return 'reveal'
    return null
  }

  const contextParts = puzzle.context.split(' → ')

  return (
    <div className="max-w-2xl mx-auto">
      {/* Context breadcrumb */}
      <div className="flex items-center flex-wrap gap-1.5 mb-5 font-mono text-xs tracking-wide">
        {contextParts.map((part, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span
              className={
                i === 0
                  ? 'text-gold'
                  : i === 1
                  ? stage >= 1
                    ? 'text-ink/60'
                    : 'text-ink/25'
                  : stage >= 2
                  ? 'text-ink/60'
                  : 'text-ink/25'
              }
            >
              {part}
            </span>
            {i < contextParts.length - 1 && <span className="text-gold/30">→</span>}
          </span>
        ))}
      </div>

      {/* Thesis */}
      <div className="border-l-4 border-terracotta/50 pl-4 mb-6">
        <p className="font-mono text-xs text-terracotta/60 tracking-widest uppercase mb-2">
          Thesis
        </p>
        <p className="font-heading font-light text-ink italic leading-relaxed"
           style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
          {puzzle.thesis}
        </p>
      </div>

      {/* Stage 1: Antithesis */}
      <div className="mb-6">
        <p className={`font-mono text-xs tracking-widest uppercase mb-3 ${stage >= 1 ? 'text-ink' : 'text-ink/40'}`}>
          <span className="text-gold/70 mr-2">01</span>
          {stage === 1 ? 'Select the antithesis' : 'Antithesis'}
        </p>
        <div className="space-y-2">
          {antitheses.map((a, i) => (
            <OptionButton
              key={i}
              text={a.text}
              result={getAntithesisResult(i)}
              pending={pendingA === i && !aResult?.correct && aResult?.revealIdx === undefined}
              onClick={() => pickAntithesis(i)}
              disabled={stage !== 1 || aResult?.correct || aResult?.revealIdx !== undefined}
            />
          ))}
        </div>
        {aResult && !aResult.correct && stage === 1 && (
          <p className="font-body text-xs text-terracotta/80 mt-2 animate-slide-up">
            Not quite — one more attempt.
          </p>
        )}
        {stage === 1 && pendingA !== null && (
          <button
            onClick={submitAntithesis}
            className="mt-3 px-5 py-2 rounded-lg bg-green text-cream font-body text-sm hover:bg-green/90 transition-colors duration-150"
          >
            Submit
          </button>
        )}
      </div>

      {/* Stage 2: Synthesis (shown only when antithesis is done) */}
      {stage === 2 && (
        <div className="mb-6 animate-slide-up">
          <p className="font-mono text-xs tracking-widest uppercase mb-3 text-ink">
            <span className="text-gold/70 mr-2">02</span>
            {status === 'playing' ? 'Select the synthesis' : 'Synthesis'}
          </p>
          <div className="space-y-2">
            {syntheses.map((s, i) => (
              <OptionButton
                key={i}
                text={s.text}
                result={getSynthesisResult(i)}
                pending={pendingS === i && status === 'playing'}
                onClick={() => pickSynthesis(i)}
                disabled={status !== 'playing'}
              />
            ))}
          </div>
          {sResult && !sResult.correct && status === 'playing' && (
            <p className="font-body text-xs text-terracotta/80 mt-2 animate-slide-up">
              Not quite — one more attempt.
            </p>
          )}
          {status === 'playing' && pendingS !== null && (
            <button
              onClick={submitSynthesis}
              className="mt-3 px-5 py-2 rounded-lg bg-green text-cream font-body text-sm hover:bg-green/90 transition-colors duration-150"
            >
              Submit
            </button>
          )}
        </div>
      )}

      {/* Win banner */}
      {status === 'win' && (
        <div className="bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in" role="status" aria-live="polite">
          <p className="font-mono text-xs tracking-widest uppercase text-green/70 mb-1">
            Complete
          </p>
          <p className="font-body text-sm text-ink/65 leading-relaxed">
            You traced the dialectical movement correctly:{' '}
            <span className="font-semibold text-ink">{puzzle.context}</span>.
          </p>
        </div>
      )}

      {/* Lose banner */}
      {status === 'lose' && (
        <div className="bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in" role="status" aria-live="polite">
          <p className="font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-1">
            Attempts exhausted
          </p>
          <p className="font-body text-sm text-ink/65 leading-relaxed">
            The correct synthesis is highlighted above. The full movement:{' '}
            <span className="font-semibold text-ink">{puzzle.context}</span>.
          </p>
        </div>
      )}

      {/* Play again */}
      {status !== 'playing' && (
        <button
          onClick={onNewGame}
          className="mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150"
        >
          New dialectic
        </button>
      )}
    </div>
  )
}

export default function GameDialectic() {
  const [gameKey, setGameKey] = useState(0)
  const [currentPuzzle, setCurrentPuzzle] = useState(() => rand(DIALECTIC))

  function handleNewGame() {
    setCurrentPuzzle(rand(DIALECTIC))
    setGameKey((k) => k + 1)
  }

  return (
    <div className="pt-20 animate-on-load">
      <SEO
        title="Dialectic — Philosophy Games"
        path="/games/dialectic"
        description="Match a philosophical thesis to its historical antithesis, then identify the synthesis that resolved the contradiction."
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
          <span className="font-mono text-xs tracking-widest uppercase text-ink/40">Dialectic</span>
        </div>

        <p className="label-mono mb-3 text-gold">Synthesis · 04</p>
        <h1
          className="font-heading font-light text-green mb-4"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
        >
          Dialectic
        </h1>
        <div className="h-px w-12 bg-gold/40 mb-5" />
        <p className="font-body text-sm text-ink/60 leading-relaxed">
          A philosophical thesis is presented. First, identify the position that historically opposed
          it — the antithesis. Then select the synthesis that preserved and resolved the
          contradiction. Two stages, two attempts each.
        </p>
      </section>

      {/* Game area */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <GameBoard key={gameKey} puzzle={currentPuzzle} onNewGame={handleNewGame} />
      </section>
    </div>
  )
}
