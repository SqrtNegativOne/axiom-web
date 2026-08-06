import { useState } from 'react'
import SEO from '../../components/SEO'
import { FALLACY, FALLACY_OPTS } from './fallacy'

const MAX_GUESSES = 4

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

// Result type styles
const RESULT_STYLES = {
    ok: {
        btn: 'bg-green text-cream border-transparent',
        label: 'Correct',
        labelClass: 'text-green',
        dot: '#2C4A3E',
    },
    cls: {
        btn: 'border-transparent text-ink',
        style: {
            background: '#C9A44C22',
            borderColor: '#C9A44C66',
            color: '#7A5C1E',
        },
        label: 'Same class',
        labelClass: 'text-gold',
        dot: '#C9A44C',
    },
    fam: {
        btn: 'border-transparent',
        style: {
            background: '#4A6A8822',
            borderColor: '#4A6A8844',
            color: '#2A4A68',
        },
        label: 'Same family',
        labelClass: 'text-ink/60',
        dot: '#4A6A88',
    },
    no: {
        btn: 'bg-terracotta/10 text-terracotta border-terracotta/20',
        label: 'Wrong',
        labelClass: 'text-terracotta',
        dot: '#C4704F',
    },
}

function GameBoard({ puzzle, onNewGame }) {
    const [guesses, setGuesses] = useState([]) // [{name, result, idx}]
    const [status, setStatus] = useState('playing')

    function handlePick(i) {
        if (status !== 'playing') return
        const f = FALLACY_OPTS[i]
        if (guesses.find((g) => g.name === f.name)) return

        let result
        if (f.name === puzzle.answer) result = 'ok'
        else if (f.cls === puzzle.cls) result = 'cls'
        else if (f.family === puzzle.family) result = 'fam'
        else result = 'no'

        const newGuesses = [...guesses, { name: f.name, result, idx: i }]
        setGuesses(newGuesses)
        if (result === 'ok') setStatus('win')
        else if (newGuesses.length >= MAX_GUESSES) setStatus('lose')
    }

    function getGuess(i) {
        return guesses.find((g) => g.idx === i)
    }

    const attemptsLeft = MAX_GUESSES - guesses.length

    return (
        <div className="max-w-2xl mx-auto">
            {/* Argument */}
            <div className="border border-gold/30 rounded-lg px-5 py-4 mb-5">
                <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
                    Argument
                </p>
                <p className="font-body text-sm text-ink/80 leading-relaxed italic">
                    &ldquo;{puzzle.argument}&rdquo;
                </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5 font-mono text-xs text-ink/50">
                {Object.entries(RESULT_STYLES).map(([key, val]) => (
                    <span key={key} className="flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-sm inline-block flex-shrink-0"
                            style={{ background: val.dot }}
                        />
                        {val.label}
                    </span>
                ))}
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-2 mb-5">
                {FALLACY_OPTS.map((opt, i) => {
                    const guess = getGuess(i)
                    const r = guess?.result
                    const style = r ? RESULT_STYLES[r] : null
                    const alreadyGuessed = !!guess
                    const isDisabled = status !== 'playing' || alreadyGuessed

                    let className =
                        'px-3 py-2.5 rounded-lg border font-body text-xs text-left leading-snug cursor-pointer transition-all duration-150 '

                    if (r) {
                        className += style.btn + ' animate-pop-in'
                    } else if (isDisabled) {
                        className += 'border-gold/15 text-ink/25 cursor-default'
                    } else {
                        className +=
                            'border-gold/25 text-ink/65 hover:border-gold/50 hover:bg-cream-dark hover:text-ink'
                    }

                    return (
                        <div key={opt.name} className="relative">
                            <button
                                onClick={() => handlePick(i)}
                                disabled={isDisabled}
                                className={className + ' w-full pr-7'}
                                style={
                                    r && style.style ? style.style : undefined
                                }
                            >
                                <span className="block font-medium">
                                    {opt.name}
                                </span>
                                {!opt.noLabel && (
                                    <span className="block text-[10px] mt-0.5 opacity-60">
                                        {opt.family} · {opt.cls}
                                    </span>
                                )}
                            </button>
                            {/* Definition tooltip trigger */}
                            <span className="group/tip absolute right-2 top-1/2 -translate-y-1/2">
                                <span className="w-4 h-4 rounded-full bg-ink/15 flex items-center justify-center font-mono text-[9px] text-ink/50 cursor-default select-none">
                                    ?
                                </span>
                                {/* Tooltip with dark mode contrast fix */}
                                <div className="pointer-events-none invisible group-hover/tip:visible absolute z-20 bottom-full right-0 mb-1.5 w-64 px-3 py-2 rounded-md bg-ink text-cream font-body text-[11px] leading-snug shadow-lg dark:bg-[#1A1A18] dark:text-cream">
                                    {opt.definition}
                                </div>
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* Counter */}
            {status === 'playing' && (
                <p className="font-mono text-xs text-ink/30 tracking-wide mb-5">
                    {attemptsLeft} {attemptsLeft === 1 ? 'guess' : 'guesses'}{' '}
                    remaining
                </p>
            )}

            {/* Win banner */}
            {status === 'win' && (
                <div className="bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in">
                    <p className="font-mono text-xs tracking-widest uppercase text-green/70 mb-1">
                        Identified
                    </p>
                    <p className="font-heading text-xl font-light text-green mb-2">
                        {puzzle.answer}
                    </p>
                    <p className="font-body text-sm text-ink/65 leading-relaxed">
                        {puzzle.explanation}
                    </p>
                </div>
            )}

            {/* Lose banner */}
            {status === 'lose' && (
                <div className="bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in">
                    <p className="font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-1">
                        Four guesses used
                    </p>
                    <p className="font-heading text-xl font-light text-ink mb-2">
                        {puzzle.answer}
                    </p>
                    <p className="font-body text-sm text-ink/65 leading-relaxed">
                        {puzzle.explanation}
                    </p>
                </div>
            )}

            {/* Play again */}
            {status !== 'playing' && (
                <button
                    onClick={onNewGame}
                    className="mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150"
                >
                    New argument
                </button>
            )}
        </div>
    )
}

export default function GameFallacy() {
    const [gameKey, setGameKey] = useState(0)
    const [currentPuzzle, setCurrentPuzzle] = useState(() => rand(FALLACY))

    function handleNewGame() {
        setCurrentPuzzle(rand(FALLACY))
        setGameKey((k) => k + 1)
    }

    return (
        <div className="pt-20 animate-on-load">
            <SEO
                title="Fallacy —"
                path="/games/fallacy"
                description="Identify the logical fallacy in a philosophical argument. Hints reveal whether your guess shares the right family or class."
            />

            {/* Header */}
            <section className="max-w-2xl mx-auto px-6 py-10">
                <div className="flex items-center gap-3 mb-6">
                    <a
                        href="/games"
                        className="font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150"
                    >
                        ← Games
                    </a>
                    <span className="text-gold/30">/</span>
                    <span className="font-mono text-xs tracking-widest uppercase text-ink/40">
                        Fallacy
                    </span>
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
