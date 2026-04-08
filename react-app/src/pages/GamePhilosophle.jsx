import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// ─── Word list ────────────────────────────────────────────────────────────────
// 3 letters  (7 guesses)
const WORDS_3 = ['MAP', 'EGO', 'AGI', 'VOI', 'TAO', 'ZEN', 'YIN']

// 4 letters  (6 guesses)
const WORDS_4 = [
  'MIND', 'REAL', 'IDEA', 'SELF', 'SOUL',
  'KANT', 'HUME', 'MARX', 'MILL', 'ZENO',
  'NOUS', 'DOXA', 'EROS', 'MAYA', 'RASA',
  'VICE', 'ERGO', 'YANG', 'KOAN',
]

// 5 letters  (6 guesses)
const WORDS_5 = [
  'ALIEF', 'LOGOS', 'LINDY', 'OCCAM', 'RAZOR',
  'MANAS', 'MORAL', 'TRUTH', 'CAUSE', 'BEING',
  'AGENT', 'IDEAL', 'PLATO', 'HEGEL', 'LOCKE',
  'BACON', 'RAWLS', 'CAMUS', 'LAOZI', 'FREGE',
  'DEWEY', 'QUINE', 'RORTY', 'NAGEL', 'TELOS',
  'EIDOS', 'ARETE', 'POLIS', 'AGORA', 'ETHOS',
  'MONAD', 'ANIMA', 'DEISM', 'ANGST', 'ENNUI',
  'AXIOM', 'LOGIC', 'VALID', 'MODAL', 'ATMAN',
  'NOMOS', 'NOEMA', 'BONUM', 'PIETY', 'KARMA',
]

// 6 letters  (6 guesses)
const WORDS_6 = [
  'BUDDHI', 'CHITTA', 'UBUNTU', 'QUALIA', 'KLUDGE',
  'BELIEF', 'NATURE', 'REASON', 'MENTAL', 'SPIRIT',
  'CHOICE', 'ACTION', 'EFFECT', 'DIVINE', 'SARTRE',
  'HOBBES', 'SENECA', 'THALES', 'ARENDT', 'ANSELM',
  'OCKHAM', 'POPPER', 'NOZICK', 'PARFIT', 'PUTNAM',
  'KRIPKE', 'SEARLE', 'BUDDHA', 'APORIA', 'PATHOS',
  'MYTHOS', 'KAIROS', 'PHYSIS', 'PRAXIS', 'TECHNE',
  'COGITO', 'ANIMUS', 'DASEIN', 'MONISM', 'THEISM',
  'VIRTUE', 'PHILIA', 'DHARMA', 'AHIMSA', 'DUKKHA',
  'PRIORI', 'CORPUS', 'TABULA', 'SUMMUM', 'EPOCHE',
  'NOESIS', 'HUBRIS', 'PNEUMA',
]

// 7 letters  (6 guesses)
const WORDS_7 = [
  'ASCETIC', 'CONATUS', 'SPINOZA', 'LEIBNIZ', 'RUSSELL',
  'BERGSON', 'HUSSERL', 'MENCIUS', 'MIMESIS', 'POIESIS',
  'NEMESIS', 'SOPHIST', 'SOPHISM', 'SKEPTIC', 'DUALISM',
]

const ALL_WORDS = [...WORDS_3, ...WORDS_4, ...WORDS_5, ...WORDS_6, ...WORDS_7]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickWord() {
  return rand(ALL_WORDS)
}

function maxGuesses(wordLen) {
  return wordLen === 3 ? 7 : 6
}

/**
 * Evaluate a guess against the answer.
 * Returns an array of 'correct' | 'present' | 'absent' per position.
 */
function evaluate(guess, answer) {
  const result = Array(answer.length).fill('absent')
  const ansLeft = answer.split('')
  const gLeft = guess.split('')

  // First pass: greens
  for (let i = 0; i < answer.length; i++) {
    if (gLeft[i] === ansLeft[i]) {
      result[i] = 'correct'
      ansLeft[i] = null
      gLeft[i] = null
    }
  }

  // Second pass: yellows
  for (let i = 0; i < guess.length; i++) {
    if (gLeft[i] === null) continue
    const idx = ansLeft.indexOf(gLeft[i])
    if (idx !== -1) {
      result[i] = 'present'
      ansLeft[idx] = null
    }
  }

  return result
}

/** Derive per-letter keyboard state from all submitted rows. */
function buildKeyState(rows) {
  const state = {}
  const priority = { correct: 3, present: 2, absent: 1 }
  for (const { letters, result } of rows) {
    letters.split('').forEach((ch, i) => {
      const prev = priority[state[ch]] ?? 0
      const next = priority[result[i]] ?? 0
      if (next > prev) state[ch] = result[i]
    })
  }
  return state
}

// ─── Cell ─────────────────────────────────────────────────────────────────────
function Cell({ letter, state, active, cellSize }) {
  let bg = 'bg-cream dark:bg-[#0E1A14]'
  let border = 'border-gold/20'
  let text = 'text-ink'

  if (state === 'correct') {
    bg = 'bg-[#2C4A3E]'
    border = 'border-[#2C4A3E]'
    text = 'text-cream'
  } else if (state === 'present') {
    bg = 'bg-[#C9A44C]'
    border = 'border-[#C9A44C]'
    text = 'text-cream'
  } else if (state === 'absent') {
    bg = 'bg-ink/15 dark:bg-ink/20'
    border = 'border-transparent'
    text = 'text-ink/60 dark:text-ink/50'
  } else if (letter) {
    // typed but not submitted yet
    border = 'border-gold/60'
  }

  const activeRing = active ? 'ring-1 ring-gold/40' : ''

  return (
    <div
      className={`flex items-center justify-center rounded border-2 font-mono font-semibold uppercase select-none transition-colors duration-300 ${bg} ${border} ${text} ${activeRing}`}
      style={{ width: cellSize, height: cellSize, fontSize: cellSize * 0.45 }}
    >
      {letter}
    </div>
  )
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
function Grid({ wordLen, rows, currentInput, maxRows }) {
  // Compute cell size so the grid fits comfortably
  const cellSize = wordLen <= 5 ? 56 : wordLen === 6 ? 48 : 42

  return (
    <div className="flex flex-col items-center gap-1.5">
      {Array.from({ length: maxRows }, (_, rowIdx) => {
        const submitted = rows[rowIdx]
        const isCurrent = !submitted && rowIdx === rows.length

        return (
          <div key={rowIdx} className="flex gap-1.5">
            {Array.from({ length: wordLen }, (_, colIdx) => {
              let letter = ''
              let state = null

              if (submitted) {
                letter = submitted.letters[colIdx]
                state = submitted.result[colIdx]
              } else if (isCurrent) {
                letter = currentInput[colIdx] || ''
              }

              return (
                <Cell
                  key={colIdx}
                  letter={letter}
                  state={state}
                  active={isCurrent && colIdx === currentInput.length && currentInput.length < wordLen}
                  cellSize={cellSize}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// ─── Keyboard ────────────────────────────────────────────────────────────────
const KB_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
]

function Keyboard({ keyState, onKey }) {
  function getStyle(key) {
    const s = keyState[key]
    if (s === 'correct') return 'bg-[#2C4A3E] text-cream border-transparent'
    if (s === 'present') return 'bg-[#C9A44C] text-cream border-transparent'
    if (s === 'absent') return 'bg-ink/15 dark:bg-ink/20 text-ink/40 border-transparent'
    return 'bg-cream-dark dark:bg-[#1A2A20] text-ink border-gold/20 hover:border-gold/40'
  }

  return (
    <div className="flex flex-col items-center gap-1.5 mt-6 select-none">
      {KB_ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === '⌫'
            return (
              <button
                key={key}
                onPointerDown={(e) => {
                  e.preventDefault()
                  onKey(key)
                }}
                className={`rounded border font-mono text-xs font-semibold uppercase transition-colors duration-150 ${getStyle(key)} ${isWide ? 'px-2.5 py-3 min-w-[3rem]' : 'w-9 h-10'}`}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ─── GameBoard ────────────────────────────────────────────────────────────────
function GameBoard({ answer, onNewGame }) {
  const wordLen = answer.length
  const totalGuesses = maxGuesses(wordLen)

  const [rows, setRows] = useState([])      // [{letters, result}]
  const [current, setCurrent] = useState('') // current typed letters
  const [status, setStatus] = useState('playing') // 'playing' | 'win' | 'lose'
  const [shake, setShake] = useState(false)

  const keyState = buildKeyState(rows)

  const submitGuess = useCallback(() => {
    if (current.length !== wordLen) {
      setShake(true)
      setTimeout(() => setShake(false), 600)
      return
    }

    const result = evaluate(current, answer)
    const newRows = [...rows, { letters: current, result }]
    setRows(newRows)
    setCurrent('')

    if (current === answer) {
      setStatus('win')
    } else if (newRows.length >= totalGuesses) {
      setStatus('lose')
    }
  }, [current, wordLen, answer, rows, totalGuesses])

  const handleKey = useCallback((key) => {
    if (status !== 'playing') return

    if (key === '⌫' || key === 'Backspace') {
      setCurrent((c) => c.slice(0, -1))
    } else if (key === 'ENTER' || key === 'Enter') {
      submitGuess()
    } else if (/^[A-Z]$/i.test(key) && current.length < wordLen) {
      setCurrent((c) => (c + key).toUpperCase())
    }
  }, [status, current, wordLen, submitGuess])

  // Physical keyboard support
  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      handleKey(e.key)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  const attemptsLeft = totalGuesses - rows.length

  return (
    <div className="flex flex-col items-center">
      {/* Grid */}
      <div className={shake ? 'animate-shake' : ''}>
        <Grid
          wordLen={wordLen}
          rows={rows}
          currentInput={current}
          maxRows={totalGuesses}
        />
      </div>

      {/* Status messages */}
      {status === 'playing' && (
        <p className="font-mono text-xs text-ink/35 mt-4 tracking-wide">
          {attemptsLeft} {attemptsLeft === 1 ? 'guess' : 'guesses'} remaining ·{' '}
          {wordLen} letters
          {wordLen === 3 && ' · +1 extra guess'}
        </p>
      )}

      {status === 'win' && (
        <div className="mt-5 w-full max-w-sm bg-green/10 border border-green/30 rounded-lg px-5 py-4 text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-green/70 mb-1">
            Correct
          </p>
          <p className="font-heading text-2xl font-light text-green mb-2">
            {answer}
          </p>
          <p className="font-body text-sm text-ink/65 leading-relaxed">
            Solved in {rows.length} {rows.length === 1 ? 'guess' : 'guesses'}.
          </p>
        </div>
      )}

      {status === 'lose' && (
        <div className="mt-5 w-full max-w-sm bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-1">
            Not quite
          </p>
          <p className="font-heading text-2xl font-light text-ink mb-2">
            {answer}
          </p>
          <p className="font-body text-sm text-ink/65 leading-relaxed">
            The word was <span className="font-semibold text-ink">{answer}</span>.
          </p>
        </div>
      )}

      {/* Play again */}
      {status !== 'playing' && (
        <button
          onClick={onNewGame}
          className="mt-4 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150"
        >
          New word
        </button>
      )}

      {/* Keyboard */}
      <Keyboard keyState={keyState} onKey={handleKey} />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GamePhilosophle() {
  const [gameKey, setGameKey] = useState(0)
  const [answer, setAnswer] = useState(() => pickWord())

  function handleNewGame() {
    setAnswer(pickWord())
    setGameKey((k) => k + 1)
  }

  return (
    <div className="pt-20 animate-on-load">
      <SEO
        title="Philosophle — Philosophy Games"
        path="/games/philosophle"
        description="A Wordle-style game using philosophical terms — concepts, thinkers, and Greek roots from 3 to 7 letters."
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
          <span className="font-mono text-xs tracking-widest uppercase text-ink/40">
            Philosophle
          </span>
        </div>

        <p className="label-mono mb-3 text-gold">Word Puzzle · 07</p>
        <h1
          className="font-heading font-light text-green mb-4"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
        >
          Philosophle
        </h1>
        <div className="h-px w-12 bg-gold/40 mb-5" />
        <p className="font-body text-sm text-ink/60 leading-relaxed">
          Guess the hidden philosophical term — a concept, thinker, or Greek root
          between 3 and 7 letters. Green means the letter is in the right place;
          gold means it appears somewhere else in the word. Three-letter words
          get an extra guess.
        </p>
      </section>

      {/* Legend */}
      <section className="max-w-2xl mx-auto px-6 pb-4">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#2C4A3E] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-cream">A</span>
            </div>
            <span className="font-mono text-xs text-ink/50 tracking-wide">Correct position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#C9A44C] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-cream">A</span>
            </div>
            <span className="font-mono text-xs text-ink/50 tracking-wide">Wrong position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-ink/15 flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-ink/50">A</span>
            </div>
            <span className="font-mono text-xs text-ink/50 tracking-wide">Not in word</span>
          </div>
        </div>
      </section>

      {/* Game area */}
      <section className="max-w-2xl mx-auto px-6 py-8 pb-20">
        <GameBoard key={gameKey} answer={answer} onNewGame={handleNewGame} />
      </section>
    </div>
  )
}
