import { useState, useEffect, useRef } from 'react'
import SEO from '../../components/SEO'
import { HERMENEUTIC_EASY, HERMENEUTIC_HARD } from './hermeneutic'

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function GameBoard({ puzzle, onNewGame }) {
    const [shown, setShown] = useState(1)
    const [guesses, setGuesses] = useState([])
    const [status, setStatus] = useState('playing') // 'playing' | 'win' | 'lose'
    const [input, setInput] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (status === 'playing' && inputRef.current) {
            inputRef.current.focus()
        }
    }, [status, shown])

    function handleGuess() {
        const val = input.trim().toLowerCase()
        if (!val || status !== 'playing') return
        setInput('')

        const correct = val === puzzle.answer.toLowerCase()
        const newGuesses = [...guesses, val]
        setGuesses(newGuesses)

        if (correct) {
            setStatus('win')
        } else if (newGuesses.length >= 6) {
            setStatus('lose')
        } else {
            setShown(Math.min(shown + 1, puzzle.clues.length))
        }
        inputRef.current?.focus()
    }

    function handleKey(e) {
        if (e.key === 'Enter') handleGuess()
    }

    const attemptsLeft = 6 - guesses.length

    return (
        <div className="max-w-2xl mx-auto">
            {/* Clues */}
            <div className="mb-6 space-y-2">
                {puzzle.clues.map((clue, i) => {
                    const isLive = i < shown || status !== 'playing'
                    const isNewest = i < shown && i === shown - 1
                    return (
                        <div
                            key={i}
                            className={`rounded-lg border px-4 py-3 font-body text-sm leading-relaxed italic transition-all duration-300 ${
                                isLive
                                    ? 'border-gold/30 bg-cream dark:bg-cream-dark text-ink/80'
                                    : 'border-cream-dark bg-cream/40 dark:bg-cream-dark/30 text-ink/25'
                            } ${isNewest ? 'animate-slide-up' : ''}`}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: clue }}
                                className={
                                    isLive ? '' : 'blur-[3px] select-none'
                                }
                            />
                        </div>
                    )
                })}
            </div>

            {/* Wrong guesses */}
            {guesses.length > 0 && (
                <div className="mb-4">
                    <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
                        Guesses
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {guesses.map((g, i) => {
                            const isCorrect = g === puzzle.answer.toLowerCase()
                            return (
                                <span
                                    key={i}
                                    style={{ animationDelay: `${i * 30}ms` }}
                                    className={`animate-pop-in font-mono text-xs px-3 py-1 rounded-full border ${
                                        isCorrect
                                            ? 'bg-green text-cream border-transparent'
                                            : 'bg-terracotta/10 text-terracotta border-terracotta/20'
                                    }`}
                                >
                                    {g}
                                </span>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Input */}
            {status === 'playing' && (
                <div className="flex gap-3 mt-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Enter your guess…"
                        className="flex-1 px-4 py-2.5 rounded-lg border border-gold/30 bg-cream dark:bg-cream-dark focus:outline-none focus:border-gold font-body text-sm text-ink placeholder-ink/30 transition-colors duration-150"
                    />
                    <button
                        onClick={handleGuess}
                        disabled={!input.trim()}
                        className="px-5 py-2.5 rounded-lg bg-green text-cream font-body text-sm hover:bg-green/90 disabled:opacity-40 disabled:cursor-default transition-colors duration-150"
                    >
                        Guess
                    </button>
                </div>
            )}

            {/* Attempts counter */}
            {status === 'playing' && (
                <p className="font-mono text-xs text-ink/35 mt-3 tracking-wide">
                    {attemptsLeft} {attemptsLeft === 1 ? 'guess' : 'guesses'}{' '}
                    remaining · {Math.min(shown, puzzle.clues.length)} of{' '}
                    {puzzle.clues.length} clues revealed
                </p>
            )}

            {/* Win banner */}
            {status === 'win' && (
                <div
                    className="mt-6 bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in"
                    role="status"
                    aria-live="polite"
                >
                    <p className="font-mono text-xs tracking-widest uppercase text-green/70 mb-1">
                        Correct
                    </p>
                    <p className="font-heading text-2xl font-light text-green mb-2">
                        {puzzle.answer}
                    </p>
                    <p className="font-body text-sm text-ink/65 leading-relaxed">
                        Identified in {guesses.length}{' '}
                        {guesses.length === 1 ? 'guess' : 'guesses'} with{' '}
                        {shown} {shown === 1 ? 'clue' : 'clues'} revealed.
                    </p>
                </div>
            )}

            {/* Lose banner */}
            {status === 'lose' && (
                <div
                    className="mt-6 bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in"
                    role="status"
                    aria-live="polite"
                >
                    <p className="font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-1">
                        Not quite
                    </p>
                    <p className="font-heading text-2xl font-light text-ink mb-2">
                        {puzzle.answer}
                    </p>
                    <p className="font-body text-sm text-ink/65 leading-relaxed">
                        The answer was{' '}
                        <span className="font-semibold text-ink">
                            {puzzle.answer}
                        </span>
                        . All clues trace this concept through its key
                        appearances in Western philosophy.
                    </p>
                </div>
            )}

            {/* Play again */}
            {status !== 'playing' && (
                <button
                    onClick={onNewGame}
                    className="mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150"
                >
                    New puzzle
                </button>
            )}
        </div>
    )
}

export default function GameHermeneutic() {
    const [difficulty, setDifficulty] = useState('easy')
    const [gameKey, setGameKey] = useState(0)
    const [currentPuzzle, setCurrentPuzzle] = useState(() =>
        rand(HERMENEUTIC_EASY),
    )

    function handleNewGame() {
        const pool = difficulty === 'easy' ? HERMENEUTIC_EASY : HERMENEUTIC_HARD
        setCurrentPuzzle(rand(pool))
        setGameKey((k) => k + 1)
    }

    function handleDifficulty(next) {
        if (next === difficulty) return
        setDifficulty(next)
        const pool = next === 'easy' ? HERMENEUTIC_EASY : HERMENEUTIC_HARD
        setCurrentPuzzle(rand(pool))
        setGameKey((k) => k + 1)
    }

    return (
        <div className="pt-20 animate-on-load">
            <SEO
                title="Hermeneutic —"
                path="/games/hermeneutic"
                description="Guess the philosophical term from progressively revealing clues. Each wrong answer unveils another layer of context."
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
                        Hermeneutic
                    </span>
                </div>

                {/* Difficulty toggle */}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={() => handleDifficulty('easy')}
                        className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${
                            difficulty === 'easy'
                                ? 'bg-green text-cream border-transparent'
                                : 'border-gold/30 text-ink/50 hover:border-gold/60 hover:text-ink/70'
                        }`}
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => handleDifficulty('hard')}
                        className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${
                            difficulty === 'hard'
                                ? 'bg-green text-cream border-transparent'
                                : 'border-gold/30 text-ink/50 hover:border-gold/60 hover:text-ink/70'
                        }`}
                    >
                        Hard
                    </button>
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
