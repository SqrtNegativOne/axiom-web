"use client";
import { useState } from 'react'
import { DIALECTIC } from './dialectic'

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

function OptionButton({ text, explanation, result, onClick, disabled }) {
    let className =
        'w-full text-left px-4 py-3 rounded-lg border font-body text-sm leading-relaxed transition-all duration-150 '

    if (result === 'correct') {
        className += 'bg-green/15 dark:bg-green/20 border-green/50 text-ink cursor-default'
    } else if (result === 'wrong') {
        className +=
            'bg-terracotta/10 dark:bg-terracotta/20 border-terracotta/40 text-ink cursor-default'
    } else if (result === 'reveal') {
        className +=
            'bg-green/5 dark:bg-green/10 border-green/30 text-ink/80 cursor-default italic'
    } else if (disabled) {
        className += 'border-ink/20 text-ink/40 cursor-default'
    } else {
        className +=
            'border-ink/30 text-ink hover:border-gold hover:bg-cream-dark cursor-pointer'
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
                    Correct Answer
                </span>
            )}
            <div>{text}</div>
            {result === 'wrong' && explanation && (
                <div className="mt-2 pt-2 border-t border-terracotta/20 text-ink/80 text-sm">
                    {explanation}
                </div>
            )}
        </button>
    )
}

function GameBoard({ puzzle, onNewGame }) {
    const [antitheses] = useState(() => shuffle(puzzle.antitheses))
    const [syntheses] = useState(() => shuffle(puzzle.syntheses))

    const [aAttempts, setAAttempts] = useState([])
    const [sAttempts, setSAttempts] = useState([])

    const aCorrectIdx = antitheses.findIndex((a) => a.correct)
    const aSuccess = aAttempts.includes(aCorrectIdx)
    const aFailed = !aSuccess && aAttempts.length >= 2
    const stage = aSuccess || aFailed ? 2 : 1

    const sCorrectIdx = syntheses.findIndex((s) => s.correct)
    const sSuccess = sAttempts.includes(sCorrectIdx)
    const sFailed = !sSuccess && sAttempts.length >= 2
    const status = sSuccess ? 'win' : sFailed ? 'lose' : 'playing'

    function pickAntithesis(idx) {
        if (stage !== 1 || aAttempts.includes(idx)) return
        setAAttempts((prev) => [...prev, idx])
    }

    function pickSynthesis(idx) {
        if (stage !== 2 || status !== 'playing' || sAttempts.includes(idx)) return
        setSAttempts((prev) => [...prev, idx])
    }

    function getAntithesisResult(idx) {
        if (aAttempts.includes(idx)) {
            return idx === aCorrectIdx ? 'correct' : 'wrong'
        }
        if (aFailed && idx === aCorrectIdx) {
            return 'reveal'
        }
        return null
    }

    function getSynthesisResult(idx) {
        if (sAttempts.includes(idx)) {
            return idx === sCorrectIdx ? 'correct' : 'wrong'
        }
        if (sFailed && idx === sCorrectIdx) {
            return 'reveal'
        }
        return null
    }

    const contextParts = puzzle.context.split(' → ').map((part) => {
        const match = part.match(/^(.*?)\s*(\(.*\))$/)
        return match ? { name: match[1], date: match[2] } : { name: part, date: null }
    })

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
                            {part.name}
                            {part.date && (
                                <span className="opacity-50 ml-1 font-normal tracking-normal">{part.date}</span>
                            )}
                        </span>
                        {i < contextParts.length - 1 && (
                            <span className="text-gold/30">→</span>
                        )}
                    </span>
                ))}
            </div>

            {/* Thesis */}
            <div className="border-l-4 border-terracotta/50 pl-4 mb-6">
                <p className="font-mono text-xs text-terracotta/60 tracking-widest uppercase mb-2">
                    Thesis
                </p>
                <p
                    className="font-heading font-light text-ink italic leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
                >
                    {puzzle.thesis}
                </p>
            </div>

            {/* Stage 1: Antithesis */}
            <div className="mb-6">
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
                            explanation={a.explanation}
                            result={getAntithesisResult(i)}
                            onClick={() => pickAntithesis(i)}
                            disabled={stage !== 1}
                        />
                    ))}
                </div>
            </div>

            {/* Stage 2: Synthesis (shown only when antithesis is done) */}
            {stage === 2 && (
                <div className="mb-6 animate-slide-up">
                    <p className="font-mono text-xs tracking-widest uppercase mb-3 text-ink">
                        <span className="text-gold/70 mr-2">02</span>
                        {status === 'playing'
                            ? 'Select the synthesis'
                            : 'Synthesis'}
                    </p>
                    <div className="space-y-2">
                        {syntheses.map((s, i) => (
                            <OptionButton
                                key={i}
                                text={s.text}
                                explanation={s.explanation}
                                result={getSynthesisResult(i)}
                                onClick={() => pickSynthesis(i)}
                                disabled={status !== 'playing'}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Win banner */}
            {status === 'win' && (
                <output
                    className="bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in"
                    aria-live="polite"
                >
                    <p className="font-mono text-xs tracking-widest uppercase text-green/70 mb-1">
                        Complete
                    </p>
                    <p className="font-body text-sm text-ink/65 leading-relaxed">
                        You traced the dialectical movement correctly:{' '}
                        <span className="font-semibold text-ink">
                            {puzzle.context}
                        </span>
                        .
                    </p>
                </output>
            )}

            {/* Lose banner */}
            {status === 'lose' && (
                <output
                    className="bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in"
                    aria-live="polite"
                >
                    <p className="font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-2">
                        Attempts exhausted
                    </p>
                    <p className="font-body text-sm text-ink/65 leading-relaxed">
                        The correct synthesis is highlighted above. The full
                        movement:{' '}
                        <span className="font-semibold text-ink">
                            {puzzle.context}
                        </span>
                        .
                    </p>
                </output>
            )}

            {/* Play again */}
            {status !== 'playing' && (
                <button
                    onClick={onNewGame}
                    className="mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150"
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
            {/* Header */}
            <section className="max-w-2xl mx-auto px-6 py-10">
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
                            Dialectics
                        </h1>
                    </div>
                    <div className="md:w-1/2">
                        <div className="h-px w-12 bg-gold/40 mb-4" />
                        <p className="font-body text-sm text-ink/60 leading-relaxed">
                            A philosophical thesis is presented. First, identify the
                            position that historically opposed it — the antithesis. Then
                            select the synthesis that preserved and resolved the
                            contradiction. Two stages, two attempts each.
                        </p>
                    </div>
                </div>
            </section>

            {/* Game area */}
            <section className="max-w-2xl mx-auto px-6 pb-20">
                <GameBoard
                    key={gameKey}
                    puzzle={currentPuzzle}
                    onNewGame={handleNewGame}
                />
            </section>
        </div>
    )
}


