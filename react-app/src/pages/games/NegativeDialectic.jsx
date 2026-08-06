import { useState } from 'react'
import SEO from '../../components/SEO'
import { NEGATIVE_DIALECTIC } from './negativeDialectic'

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
        className +=
            'bg-terracotta/8 border-terracotta/20 text-terracotta/70 cursor-default'
    } else if (result === 'reveal') {
        className +=
            'bg-green/8 border-green/25 text-ink/60 cursor-default italic'
    } else if (pending) {
        className +=
            'border-gold/60 bg-cream-dark text-ink cursor-pointer ring-1 ring-gold/30'
    } else if (disabled) {
        className += 'border-gold/15 text-ink/30 cursor-default'
    } else {
        className +=
            'border-gold/25 text-ink/70 hover:border-gold/50 hover:bg-cream-dark hover:text-ink cursor-pointer'
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
                    This was the answer
                </span>
            )}
            {text}
        </button>
    )
}

function GameBoard({ puzzle, onNewGame }) {
    const [antitheses] = useState(() => shuffle(puzzle.antithesisOptions))
    const [residuals] = useState(() => shuffle(puzzle.residualOptions))

    const [stage, setStage] = useState(1) // 1 or 2
    const [aAttempts, setAAttempts] = useState(0)
    const [aResult, setAResult] = useState(null) // {idx, correct, revealIdx?}
    const [rAttempts, setRAttempts] = useState(0)
    const [rResult, setRResult] = useState(null)
    const [status, setStatus] = useState('playing')

    function pickAntithesis(idx) {
        if (stage !== 1 || aResult?.correct || aResult?.revealIdx !== undefined)
            return
            
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

    function pickResidual(idx) {
        if (stage !== 2 || status !== 'playing') return
        
        const correct = residuals[idx].correct
        const newAttempts = rAttempts + 1
        setRAttempts(newAttempts)
        setRResult({ idx, correct })
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

    function getResidualResult(idx) {
        if (!rResult) return null
        const correct = residuals[idx].correct
        if (rResult.idx === idx) return rResult.correct ? 'correct' : 'wrong'
        if (status !== 'playing' && correct) return 'reveal'
        return null
    }

    const contextParts = puzzle.context.split(' → ').map((part) => part.trim())

    return (
        <div className="max-w-4xl mx-auto">
            {/* Context breadcrumb */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 mb-10 font-mono text-xs tracking-wide">
                {contextParts.map((part, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                        <span
                            className={
                                i === 0
                                    ? 'text-gold'
                                    : i === 1
                                      ? stage >= 1
                                          ? 'text-ink/80'
                                          : 'text-ink/40'
                                      : stage >= 2
                                        ? 'text-ink/80'
                                        : 'text-ink/40'
                            }
                        >
                            {part}
                        </span>
                        {i < contextParts.length - 1 && (
                            <span className="text-gold/40">→</span>
                        )}
                    </span>
                ))}
            </div>

            {/* Top Section: Thesis and Antithesis */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
                {/* Thesis */}
                <div className="md:w-1/2">
                    <div className="border-l-4 border-terracotta/50 pl-4 h-full">
                        <p className="font-mono text-xs text-terracotta/60 tracking-widest uppercase mb-3">
                            Thesis
                        </p>
                        <p
                            className="font-heading font-light text-ink italic leading-relaxed"
                            style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.15rem)' }}
                        >
                            {puzzle.thesis}
                        </p>
                    </div>
                </div>

                {/* Antithesis */}
                <div className="md:w-1/2">
                    <p
                        className={`font-mono text-xs tracking-widest uppercase mb-3 ${stage >= 1 ? 'text-ink' : 'text-ink/40'}`}
                    >
                        <span className="text-gold/70 mr-2">01</span>
                        {stage === 1 ? 'Select the antithesis' : 'Antithesis'}
                    </p>
                    <div className="space-y-2">
                        {antitheses.map((a, i) => (
                            <OptionButton
                                key={i}
                                text={a.text}
                                result={getAntithesisResult(i)}
                                pending={false}
                                onClick={() => pickAntithesis(i)}
                                disabled={
                                    stage !== 1 ||
                                    aResult?.correct ||
                                    aResult?.revealIdx !== undefined
                                }
                            />
                        ))}
                    </div>
                    {aResult && !aResult.correct && stage === 1 && (
                        <p className="font-body text-xs text-terracotta/80 mt-2 animate-slide-up text-right">
                            Not quite — one more attempt.
                        </p>
                    )}
                </div>
            </div>

            {/* Stage 2: False Synthesis and Residual */}
            {stage === 2 && (
                <div className="animate-slide-up relative mt-10 md:mt-16">
                    {/* SVG Arrows (visible on md and up) */}
                    <div className="hidden md:block absolute -top-16 left-0 right-0 h-16 pointer-events-none z-0 opacity-60">
                        <svg
                            className="w-full h-full"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                        >
                            {/* Path from left center to bottom middle */}
                            <path
                                d="M 25 0 C 25 60, 50 60, 50 90"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-gold/60"
                            />
                            {/* Path from right center to bottom middle */}
                            <path
                                d="M 75 0 C 75 60, 50 60, 50 90"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-gold/60"
                            />
                            {/* Arrow head at the meeting point */}
                            <polygon
                                points="50,96 46,86 54,86"
                                fill="currentColor"
                                className="text-gold/60"
                            />
                        </svg>
                    </div>

                    {/* False Synthesis Box */}
                    <div className="flex flex-col items-center relative z-10 mb-12">
                        <div className="bg-cream-dark border border-gold/25 p-6 md:p-8 rounded-xl max-w-3xl text-center shadow-md relative overflow-hidden">
                            {/* Terracotta top border accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-terracotta/60" />
                            <p className="font-mono text-xs tracking-widest uppercase text-terracotta/90 mb-4">
                                The False Synthesis
                            </p>
                            <p
                                className="font-heading font-light text-ink leading-relaxed"
                                style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)' }}
                            >
                                "{puzzle.falseSynthesis}"
                            </p>
                        </div>
                    </div>

                    {/* Residual Selection */}
                    <div className="max-w-2xl mx-auto">
                        <p className="font-mono text-xs tracking-widest uppercase mb-4 text-ink text-center">
                            <span className="text-gold/70 mr-2">02</span>
                            {status === 'playing'
                                ? 'Predict the Residual'
                                : 'The Residual'}
                        </p>
                        <p className="text-center font-body text-sm text-ink/60 mb-6 italic">
                            What reality did this synthesis repress or fail to capture?
                        </p>
                        
                        <div className="space-y-3">
                            {residuals.map((r, i) => (
                                <OptionButton
                                    key={i}
                                    text={r.text}
                                    result={getResidualResult(i)}
                                    pending={false}
                                    onClick={() => pickResidual(i)}
                                    disabled={status !== 'playing'}
                                />
                            ))}
                        </div>
                        
                        {rResult && !rResult.correct && status === 'playing' && (
                            <div className="mt-4 bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 animate-slide-up">
                                <p className="font-body text-sm font-semibold text-terracotta/90 mb-1">
                                    Not quite — one more attempt.
                                </p>
                                {residuals[rResult.idx]?.explanation && (
                                    <p className="font-body text-sm text-terracotta/80 leading-relaxed">
                                        {residuals[rResult.idx].explanation}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Win banner */}
            {status === 'win' && (
                <div
                    className="mt-8 bg-green/10 border border-green/30 rounded-lg px-6 py-5 animate-pop-in max-w-2xl mx-auto text-center"
                    role="status"
                    aria-live="polite"
                >
                    <p className="font-mono text-xs tracking-widest uppercase text-green/80 mb-2">
                        Critique Successful
                    </p>
                    <p className="font-body text-sm text-ink/75 leading-relaxed">
                        You successfully identified the non-identical remainder. The false synthesis has been dismantled.
                    </p>
                </div>
            )}

            {/* Lose banner */}
            {status === 'lose' && (
                <div
                    className="mt-8 bg-terracotta/8 border border-terracotta/25 rounded-lg px-6 py-5 animate-pop-in max-w-2xl mx-auto text-center"
                    role="status"
                    aria-live="polite"
                >
                    <p className="font-mono text-xs tracking-widest uppercase text-terracotta/80 mb-3">
                        Attempts Exhausted
                    </p>
                    {rResult && !rResult.correct && residuals[rResult.idx]?.explanation && (
                        <div className="mb-4 pb-4 border-b border-terracotta/15 text-left">
                            <p className="font-body text-sm text-terracotta/80 leading-relaxed">
                                {residuals[rResult.idx].explanation}
                            </p>
                        </div>
                    )}
                    <p className="font-body text-sm text-ink/75 leading-relaxed">
                        The correct residual is highlighted above. Critical theory demands we always look for what the system excludes.
                    </p>
                </div>
            )}

            {/* Play again */}
            {status !== 'playing' && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={onNewGame}
                        className="px-6 py-3 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/80 hover:border-gold hover:text-ink transition-colors duration-150 shadow-sm"
                    >
                        Critique another Synthesis
                    </button>
                </div>
            )}
        </div>
    )
}

export default function GameNegativeDialectic() {
    const [gameKey, setGameKey] = useState(0)
    const [currentPuzzle, setCurrentPuzzle] = useState(() => rand(NEGATIVE_DIALECTIC))

    function handleNewGame() {
        setCurrentPuzzle(rand(NEGATIVE_DIALECTIC))
        setGameKey((k) => k + 1)
    }

    return (
        <div className="pt-20 animate-on-load">
            <SEO
                title="Negative Dialectics — Philosophy Games"
                path="/games/negative-dialectics"
                description="Dismantle a false historical synthesis by predicting its residual—the marginalized reality it represses or fails to capture."
            />

            {/* Header */}
            <section className="max-w-4xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <a
                                href="/games"
                                className="font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150"
                            >
                                ← Games
                            </a>
                            <span className="text-gold/30">/</span>
                        </div>
                        <h1
                            className="font-heading font-light text-green uppercase tracking-wide"
                            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
                        >
                            Negative Dialectics
                        </h1>
                    </div>
                    <div className="md:w-1/2">
                        <div className="h-px w-12 bg-gold/40 mb-4" />
                        <p className="font-body text-sm text-ink/60 leading-relaxed">
                            Instead of finding harmony, your goal is to identify what the system represses. 
                            First, establish the historical contradiction. Then, when presented with the false synthesis 
                            that claimed to resolve it, find the <i>residual</i>—the non-identical remainder left behind.
                        </p>
                    </div>
                </div>
            </section>

            {/* Game area */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <GameBoard
                    key={gameKey}
                    puzzle={currentPuzzle}
                    onNewGame={handleNewGame}
                />
            </section>
        </div>
    )
}
