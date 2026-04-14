import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const N = 34
const patches = Array.from({ length: N }, (_, i) => ({ id: i, t: i / (N - 1) }))

const PRESET_COLOURS = [
  { name: 'red',    rgb: [220, 38,  38]  },
  { name: 'orange', rgb: [249, 115, 22]  },
  { name: 'amber',  rgb: [245, 158, 11]  },
  { name: 'yellow', rgb: [234, 179, 8]   },
  { name: 'lime',   rgb: [132, 204, 22]  },
  { name: 'green',  rgb: [34,  197, 94]  },
  { name: 'teal',   rgb: [20,  184, 166] },
  { name: 'blue',   rgb: [59,  130, 246] },
  { name: 'violet', rgb: [139, 92,  246] },
  { name: 'purple', rgb: [168, 85,  247] },
  { name: 'pink',   rgb: [236, 72,  153] },
  { name: 'brown',  rgb: [161, 72,  27]  },
]

function lerpRGB(a, b, t) {
  return `rgb(${Math.round(a[0] + t * (b[0] - a[0]))},${Math.round(a[1] + t * (b[1] - a[1]))},${Math.round(a[2] + t * (b[2] - a[2]))})`
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const BG = '#F8F4EC'
const INK = '#1A1A18'
const MONO = "'IBM Plex Mono', 'Courier New', monospace"

function SoritesBoard({ onNewGame }) {
  const [phase, setPhase] = useState('setup')
  const [setupStep, setSetupStep] = useState('fav')
  const [favColour, setFavColour] = useState(null)
  const [leastColour, setLeastColour] = useState(null)

  const [order] = useState(() => [
    0,
    N - 1,
    ...shuffle(Array.from({ length: N - 2 }, (_, i) => i + 1)),
  ])
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState({})

  function toRGB(t) {
    if (!favColour || !leastColour) return '#ccc'
    return lerpRGB(favColour.rgb, leastColour.rgb, t)
  }

  function classify(v) {
    const id = order[step]
    const newAns = { ...ans, [id]: v }
    setAns(newAns)
    if (step + 1 >= N) setPhase('reveal')
    else setStep((s) => s + 1)
  }

  function stripBar() {
    return (
      <div style={{ display: 'flex', width: '100%', height: 18, marginBottom: 40 }}>
        {patches.map((p) => (
          <div key={p.id} style={{ flex: 1, background: toRGB(p.t) }} />
        ))}
      </div>
    )
  }

  // ── Setup phase ──────────────────────────────────────────────────────────────

  if (phase === 'setup') {
    const pickerColours =
      setupStep === 'fav'
        ? PRESET_COLOURS
        : PRESET_COLOURS.filter((c) => c.name !== favColour?.name)

    return (
      <div style={{ fontFamily: MONO, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0 80px' }}>
        <style>{`
          .sor-swatch { border: none; padding: 0; cursor: pointer; background: transparent; text-align: center; }
          .sor-swatch-inner { width: 100%; aspect-ratio: 1; transition: transform 0.12s, outline 0.12s; outline: 2px solid transparent; outline-offset: 2px; }
          .sor-swatch:hover .sor-swatch-inner { transform: scale(1.06); outline-color: ${INK}; }
          .sor-swatch-label { font-family: ${MONO}; font-size: 9px; color: #888; letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-top: 5px; }
        `}</style>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', color: '#999', textTransform: 'uppercase', margin: '0 0 14px' }}>
            Setup · {setupStep === 'fav' ? 'Step 1 of 2' : 'Step 2 of 2'}
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 600, color: INK, margin: '0 0 10px', lineHeight: 1.15, fontFamily: MONO }}>
            {setupStep === 'fav'
              ? 'Choose your favourite colour.'
              : 'Choose your least favourite.'}
          </h2>
          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.8, margin: '0 0 36px' }}>
            {setupStep === 'fav'
              ? 'The gradient will run from this colour. You will be asked: "Is this [your colour]?"'
              : 'The gradient will end here — at the colour you find least appealing.'}
          </p>

          {setupStep === 'least' && favColour && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{ width: 20, height: 20, background: `rgb(${favColour.rgb.join(',')})`, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                favourite: {favColour.name}
              </span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            {pickerColours.map((colour) => (
              <button
                key={colour.name}
                className="sor-swatch"
                onClick={() => {
                  if (setupStep === 'fav') {
                    setFavColour(colour)
                    setSetupStep('least')
                  } else {
                    setLeastColour(colour)
                    setPhase('intro')
                  }
                }}
              >
                <div
                  className="sor-swatch-inner"
                  style={{ background: `rgb(${colour.rgb.join(',')})` }}
                />
                <span className="sor-swatch-label">{colour.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Intro phase ───────────────────────────────────────────────────────────────

  if (phase === 'intro')
    return (
      <div style={{ fontFamily: MONO, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0 80px' }}>
        <style>{`
          .sor-start-btn { background:${INK}; color:${BG}; border:none; padding:14px 40px; font-family:${MONO}; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:opacity .15s; }
          .sor-start-btn:hover { opacity:0.75; }
        `}</style>
        <div style={{ maxWidth: 520, width: '100%' }}>
          {stripBar()}
          <p style={{ fontSize: 10, letterSpacing: '0.22em', color: '#999', textTransform: 'uppercase', margin: '0 0 14px' }}>
            Experiment · The Sorites Paradox
          </p>
          <h2 style={{ fontSize: 40, fontWeight: 600, color: INK, margin: '0 0 28px', lineHeight: 1.1, fontFamily: MONO }}>
            Where does
            <br />
            {favColour.name} end?
          </h2>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.85, margin: '0 0 12px' }}>
            You will be shown {N} colour patches running from{' '}
            <span style={{ color: toRGB(0), fontWeight: 600 }}>{favColour.name}</span> to{' '}
            <span style={{ color: toRGB(1), fontWeight: 600 }}>{leastColour.name}</span>, one at a time.
            For each, answer a single question:
          </p>
          <p style={{ fontSize: 16, color: INK, fontWeight: 500, margin: '0 0 28px', letterSpacing: '0.02em' }}>
            Is this{' '}
            <span style={{ color: toRGB(0) }}>{favColour.name}</span>?
          </p>
          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.8, margin: '0 0 44px' }}>
            No trick. Answer honestly. You will be shown your own contradictions at the end.
          </p>
          <button className="sor-start-btn" onClick={() => setPhase('classify')}>
            Begin
          </button>
        </div>
      </div>
    )

  // ── Classify phase ─────────────────────────────────────────────────────────────

  if (phase === 'classify') {
    const p = patches[order[step]]
    const pct = Math.round((step / N) * 100)
    const isAnchor = step < 2
    return (
      <div style={{ fontFamily: MONO, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0 80px' }}>
        <style>{`
          .sor-cls-btn { flex:1; padding:18px 0; font-family:${MONO}; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; border:1.5px solid; transition:all .12s; background:transparent; }
          .sor-yes-b { border-color:${INK}; color:${INK}; }
          .sor-yes-b:hover { background:${INK}; color:${BG}; }
          .sor-no-b { border-color:#bbb; color:#999; }
          .sor-no-b:hover { background:#bbb; color:${BG}; border-color:#bbb; }
        `}</style>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 52 }}>
            <div style={{ flex: 1, height: 1, background: '#ddd', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: 1, background: INK, width: `${pct}%`, transition: 'width 0.2s' }} />
            </div>
            <span style={{ fontSize: 10, color: '#aaa', whiteSpace: 'nowrap' }}>
              {step + 1} / {N}
            </span>
          </div>

          <div style={{ width: '100%', aspectRatio: '4/3', background: toRGB(p.t), marginBottom: 44 }} />

          <p style={{ fontSize: 22, textAlign: 'center', color: INK, margin: '0 0 32px', fontWeight: 500 }}>
            Is this{' '}
            <span style={{ color: toRGB(0) }}>{favColour.name}</span>?
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="sor-cls-btn sor-yes-b" onClick={() => classify(true)}>Yes</button>
            <button className="sor-cls-btn sor-no-b" onClick={() => classify(false)}>No</button>
          </div>

          {isAnchor && (
            <p style={{ fontSize: 10, color: '#ccc', textAlign: 'center', marginTop: 20, letterSpacing: '0.1em' }}>
              {lerpRGB(favColour.rgb, leastColour.rgb, p.t)}
            </p>
          )}
        </div>
      </div>
    )
  }

  // ── Reveal phase ───────────────────────────────────────────────────────────────

  if (phase === 'reveal') {
    const favName = favColour.name
    const sorted = [...patches].sort((a, b) => a.t - b.t)
    const lastFavIdx = sorted.reduce((best, p, i) => (ans[p.id] === true ? i : best), -1)
    const firstNotFavIdx = sorted.findIndex((p) => ans[p.id] === false)
    const hasInversion = lastFavIdx >= 0 && firstNotFavIdx >= 0 && lastFavIdx > firstNotFavIdx
    const cleanBoundary = lastFavIdx >= 0 && firstNotFavIdx >= 0 && !hasInversion
    const favCount = Object.values(ans).filter(Boolean).length
    const favPatch = lastFavIdx >= 0 ? sorted[lastFavIdx] : null
    const notFavPatch = firstNotFavIdx >= 0 ? sorted[firstNotFavIdx] : null

    // ── Heap Escaper easter egg ────────────────────────────────────────────────
    if (favCount === N || favCount === 0) {
      const escapedRGB = favCount === N ? favColour.rgb : leastColour.rgb
      const monoCSS = `rgb(${escapedRGB.join(',')})`
      return (
        <div style={{ fontFamily: MONO, padding: '0 0 80px' }}>
          <div style={{ display: 'flex', width: '100%', height: 22, marginBottom: 56 }}>
            {patches.map((p) => (
              <div key={p.id} style={{ flex: 1, background: monoCSS }} />
            ))}
          </div>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', color: monoCSS, textTransform: 'uppercase', margin: '0 0 20px' }}>
              Easter Egg · Heap Escaper
            </p>
            <h2 style={{ fontSize: 52, fontWeight: 700, letterSpacing: '0.06em', color: monoCSS, margin: '0 0 8px', lineHeight: 1 }}>
              PARADOX
            </h2>
            <h2 style={{ fontSize: 52, fontWeight: 700, letterSpacing: '0.06em', color: INK, margin: '0 0 40px', lineHeight: 1 }}>
              ESCAPED
            </h2>
            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.85, margin: '0 0 36px', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
              {favCount === N
                ? `You called all ${N} patches ${favName} — absorbing ${leastColour.name} into your favourite colour. The sorites paradox cannot arise if the predicate swallows the entire spectrum.`
                : `You called nothing ${favName} — not even the pure ${favName} at position 1. The paradox dissolves when the predicate has no extension at all.`}
            </p>
            <div style={{ borderLeft: '3px solid', borderColor: monoCSS, paddingLeft: 20, textAlign: 'left', margin: '0 auto 48px', maxWidth: 440 }}>
              <p style={{ fontSize: 14, fontStyle: 'italic', color: INK, lineHeight: 1.8, margin: '0 0 8px' }}>
                "Everything is vague to a degree you do not realise till you have tried to make it precise."
              </p>
              <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#999', textTransform: 'uppercase', margin: 0 }}>
                Bertrand Russell
              </p>
            </div>
            <button
              onClick={onNewGame}
              style={{
                padding: '12px 28px',
                border: `1px solid`,
                borderColor: monoCSS,
                background: 'transparent',
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                color: monoCSS,
                transition: 'all .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = monoCSS; e.currentTarget.style.color = BG }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = monoCSS }}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    // ──────────────────────────────────────────────────────────────────────────

    function Swatch({ t, size = 16 }) {
      return (
        <span
          style={{ display: 'inline-block', width: size, height: size, background: toRGB(t), verticalAlign: 'middle', margin: '0 3px', flexShrink: 0 }}
        />
      )
    }

    return (
      <div style={{ fontFamily: MONO, padding: '0 0 80px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', color: '#999', textTransform: 'uppercase', margin: '0 0 10px' }}>
            Analysis
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: INK, margin: '0 0 40px', fontFamily: MONO }} role="status" aria-live="polite">
            Your classifications
          </h2>

          {/* Classified strip */}
          <div style={{ display: 'flex', marginBottom: 6 }}>
            {sorted.map((p) => (
              <div key={p.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: 36, background: toRGB(p.t) }} />
                <div
                  style={{
                    width: '100%',
                    height: 6,
                    background: ans[p.id] === true ? INK : ans[p.id] === false ? '#e0ddd6' : '#ccc',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48 }}>
            <span style={{ fontSize: 10, color: '#999' }}>▲ {favName} ({favCount})</span>
            <span style={{ fontSize: 10, color: '#bbb' }}>▲ not {favName} ({N - favCount})</span>
          </div>

          {/* Inversion */}
          {hasInversion && notFavPatch && favPatch && (
            <div style={{ background: '#b50000', color: '#fff', padding: '22px 28px', marginBottom: 32 }}>
              <strong style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
                Direct contradiction
              </strong>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85 }}>
                You called <Swatch t={notFavPatch.t} /> NOT {favName}, but also called{' '}
                <Swatch t={favPatch.t} /> {favName} — even though the second patch is{' '}
                <em>further from {favName}</em> in the gradient.
              </p>
            </div>
          )}

          {/* Clean boundary */}
          {cleanBoundary && favPatch && notFavPatch && (
            <>
              <div style={{ background: INK, color: BG, padding: '22px 28px', marginBottom: 32 }}>
                <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.85 }}>You drew a line.</p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 14, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, background: toRGB(favPatch.t), flexShrink: 0 }} />
                  <span style={{ fontSize: 12 }}>
                    position {lastFavIdx + 1}/{N} →{' '}
                    <strong style={{ color: toRGB(0) }}>{favName.toUpperCase()}</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 14, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, background: toRGB(notFavPatch.t), flexShrink: 0 }} />
                  <span style={{ fontSize: 12 }}>
                    position {firstNotFavIdx + 1}/{N} →{' '}
                    <strong style={{ color: '#888' }}>NOT {favName.toUpperCase()}</strong>
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>
                  Gap: {firstNotFavIdx - lastFavIdx} step{firstNotFavIdx - lastFavIdx !== 1 ? 's' : ''} in the gradient &nbsp;·&nbsp;{' '}
                  {(((notFavPatch.t - favPatch.t) / 1) * 100).toFixed(1)}% of total span
                </p>
              </div>

              <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#999', margin: '0 0 14px', fontFamily: MONO }}>
                The tolerance chain
              </h3>
              <p style={{ fontSize: 12, color: '#666', lineHeight: 1.9, margin: '0 0 20px' }}>
                <strong style={{ color: INK }}>P1:</strong> <Swatch t={0} size={12} />{' '}
                {favName} (position 1) is {favName}. <em>(You agreed — step 1.)</em>
                <br />
                <strong style={{ color: INK }}>P2:</strong> If S is {favName}, and S′ is one step further in the gradient,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then S′ is also {favName}.{' '}
                <em>(Each of the {N - 1} steps is perceptibly negligible.)</em>
                <br />
                <strong style={{ color: INK }}>C:</strong> By {firstNotFavIdx} applications of P2:{' '}
                <Swatch t={notFavPatch.t} size={12} /> position {firstNotFavIdx + 1} is {favName}.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 32 }}>
                {sorted.slice(0, firstNotFavIdx + 1).map((p) => (
                  <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        background: toRGB(p.t),
                        outline: ans[p.id] === false ? '2px solid #b50000' : 'none',
                        outlineOffset: 1,
                      }}
                    />
                    <span style={{ fontSize: 7, color: ans[p.id] === false ? '#b50000' : '#ccc', marginTop: 2 }}>
                      {ans[p.id] === false ? '✗' : '·'}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ background: '#b50000', color: '#fff', padding: '22px 28px', marginBottom: 48 }}>
                <strong style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
                  Contradiction
                </strong>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85 }}>
                  The tolerance chain forces position {firstNotFavIdx + 1} to be {favName}.
                  You said it is not. Your first answer, combined with the negligibility premise,
                  makes your later answer logically impossible.
                </p>
              </div>
            </>
          )}

          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#999', margin: '0 0 20px', fontFamily: MONO }}>
            Four exits from the paradox
          </h3>
          {[
            [
              'Epistemicism',
              'https://en.wikipedia.org/wiki/Epistemicism',
              `A sharp boundary exists; we simply cannot know where it is. Vagueness is epistemic, not metaphysical. Your line is correct — you just drew it somewhere arbitrary. (Williamson 1994)`,
            ],
            [
              'Fuzzy logic',
              'https://en.wikipedia.org/wiki/Fuzzy_logic',
              `'${favName}' admits of degrees: the borderline patch is 0.5 ${favName}. No contradiction arises at a non-classical truth value. The binary yes/no forced by this game is the culprit, not the predicate.`,
            ],
            [
              'Reject tolerance',
              'https://en.wikipedia.org/wiki/Sorites_paradox#Responses',
              `Premise 2 is false. Imperceptible differences can be decisive — they accumulate. '${favName}' has a sharp extension even if individual differences are sub-threshold.`,
            ],
            [
              'Supervaluationism',
              'https://en.wikipedia.org/wiki/Supervaluationism',
              `Statements about borderline cases are neither true nor false. 'Patch 17 is ${favName}' has no truth value, so the inductive step fails to go through. Classical logic still holds for clear cases.`,
            ],
          ].map(([name, url, desc]) => (
            <div key={name} style={{ borderLeft: '2px solid #ddd', paddingLeft: 18, marginBottom: 22 }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: INK, display: 'block', marginBottom: 5, textDecoration: 'none', fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
              >
                {name} ↗
              </a>
              <p style={{ fontSize: 12, color: '#666', margin: 0, lineHeight: 1.8 }}>{desc}</p>
            </div>
          ))}

          <button
            onClick={onNewGame}
            style={{
              marginTop: 40,
              padding: '12px 28px',
              border: '1px solid #ccc',
              background: 'transparent',
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: '#666',
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = INK; e.currentTarget.style.color = INK }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#666' }}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default function GameSorites() {
  const [gameKey, setGameKey] = useState(0)

  return (
    <div className="pt-20 animate-on-load">
      <SEO
        title="Sorites — Philosophy Games"
        path="/games/sorites"
        description="Pick two colours, then classify 34 patches between them. Discover the Sorites paradox — the contradiction hiding in your own judgements about vagueness."
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
            Sorites
          </span>
        </div>

        <p className="label-mono mb-3 text-gold">Experiment · 05</p>
        <h1
          className="font-heading font-light text-green mb-4"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
        >
          Sorites
        </h1>
        <div className="h-px w-12 bg-gold/40 mb-5" />
        <p className="font-body text-sm text-ink/60 leading-relaxed">
          The Sorites paradox asks: if removing one grain from a heap still
          leaves a heap, how can a heap ever become a non-heap? This experiment
          runs the same logic through your own colour preferences — and exposes
          the contradiction in your own judgements about vagueness and borderline cases.
        </p>
      </section>

      {/* Game area */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <SoritesBoard key={gameKey} onNewGame={() => setGameKey((k) => k + 1)} />
      </section>
    </div>
  )
}
