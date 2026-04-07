import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const N = 34
const patches = Array.from({ length: N }, (_, i) => ({
  id: i,
  g: Math.round((i * 165) / (N - 1)),
}))
const toRGB = (g) => `rgb(255,${g},0)`

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

const stripBar = (
  <div style={{ display: 'flex', width: '100%', height: 18, marginBottom: 40 }}>
    {patches.map((p) => (
      <div key={p.id} style={{ flex: 1, background: toRGB(p.g) }} />
    ))}
  </div>
)

function SoritesBoard({ onNewGame }) {
  const [phase, setPhase] = useState('intro')
  const [order] = useState(() => [
    0,
    N - 1,
    ...shuffle(Array.from({ length: N - 2 }, (_, i) => i + 1)),
  ])
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState({})

  function classify(v) {
    const id = order[step]
    const newAns = { ...ans, [id]: v }
    setAns(newAns)
    if (step + 1 >= N) setPhase('reveal')
    else setStep((s) => s + 1)
  }

  const sorted = [...patches].sort((a, b) => a.g - b.g)
  const lastRedIdx = sorted.reduce(
    (best, p, i) => (ans[p.id] === true ? i : best),
    -1
  )
  const firstNotIdx = sorted.findIndex((p) => ans[p.id] === false)
  const hasInversion =
    lastRedIdx >= 0 && firstNotIdx >= 0 && lastRedIdx > firstNotIdx
  const cleanBoundary =
    lastRedIdx >= 0 && firstNotIdx >= 0 && !hasInversion
  const redCount = Object.values(ans).filter(Boolean).length
  const stepSize = Math.round(165 / (N - 1))
  const redPatch = lastRedIdx >= 0 ? sorted[lastRedIdx] : null
  const notRedPatch = firstNotIdx >= 0 ? sorted[firstNotIdx] : null

  if (phase === 'intro')
    return (
      <div
        style={{
          fontFamily: MONO,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 0 80px',
        }}
      >
        <style>{`
          .sor-start-btn { background:${INK}; color:${BG}; border:none; padding:14px 40px; font-family:${MONO}; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:opacity .15s; }
          .sor-start-btn:hover { opacity:0.75; }
        `}</style>
        <div style={{ maxWidth: 520, width: '100%' }}>
          {stripBar}
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              color: '#999',
              textTransform: 'uppercase',
              margin: '0 0 14px',
            }}
          >
            Experiment · The Sorites Paradox
          </p>
          <h2
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: INK,
              margin: '0 0 28px',
              lineHeight: 1.1,
              fontFamily: MONO,
            }}
          >
            Where does
            <br />
            red end?
          </h2>
          <p
            style={{
              fontSize: 13,
              color: '#555',
              lineHeight: 1.85,
              margin: '0 0 12px',
            }}
          >
            You will be shown {N} color patches from the spectrum above, one at
            a time. For each, answer a single question:
          </p>
          <p
            style={{
              fontSize: 16,
              color: INK,
              fontWeight: 500,
              margin: '0 0 28px',
              letterSpacing: '0.02em',
            }}
          >
            Is this red?
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#888',
              lineHeight: 1.8,
              margin: '0 0 44px',
            }}
          >
            No trick. Answer honestly. You will be shown your own contradictions
            at the end.
          </p>
          <button
            className="sor-start-btn"
            onClick={() => setPhase('classify')}
          >
            Begin
          </button>
        </div>
      </div>
    )

  if (phase === 'classify') {
    const p = patches[order[step]]
    const pct = Math.round((step / N) * 100)
    const isAnchor = step < 2
    return (
      <div
        style={{
          fontFamily: MONO,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 0 80px',
        }}
      >
        <style>{`
          .sor-cls-btn { flex:1; padding:18px 0; font-family:${MONO}; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; border:1.5px solid; transition:all .12s; background:transparent; }
          .sor-yes-b { border-color:${INK}; color:${INK}; }
          .sor-yes-b:hover { background:${INK}; color:${BG}; }
          .sor-no-b { border-color:#bbb; color:#999; }
          .sor-no-b:hover { background:#bbb; color:${BG}; border-color:#bbb; }
        `}</style>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 52,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: '#ddd',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 1,
                  background: INK,
                  width: `${pct}%`,
                  transition: 'width 0.2s',
                }}
              />
            </div>
            <span style={{ fontSize: 10, color: '#aaa', whiteSpace: 'nowrap' }}>
              {step + 1} / {N}
            </span>
          </div>

          <div
            style={{
              width: '100%',
              aspectRatio: '4/3',
              background: toRGB(p.g),
              marginBottom: 44,
            }}
          />

          <p
            style={{
              fontSize: 22,
              textAlign: 'center',
              color: INK,
              margin: '0 0 32px',
              fontWeight: 500,
            }}
          >
            Is this{' '}
            <span style={{ color: 'rgb(210,0,0)' }}>red</span>?
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="sor-cls-btn sor-yes-b"
              onClick={() => classify(true)}
            >
              Yes
            </button>
            <button
              className="sor-cls-btn sor-no-b"
              onClick={() => classify(false)}
            >
              No
            </button>
          </div>

          {isAnchor && (
            <p
              style={{
                fontSize: 10,
                color: '#ccc',
                textAlign: 'center',
                marginTop: 20,
                letterSpacing: '0.1em',
              }}
            >
              rgb(255, {p.g}, 0)
            </p>
          )}
        </div>
      </div>
    )
  }

  if (phase === 'reveal') {
    return (
      <div
        style={{
          fontFamily: MONO,
          padding: '0 0 80px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              color: '#999',
              textTransform: 'uppercase',
              margin: '0 0 10px',
            }}
          >
            Analysis
          </p>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: INK,
              margin: '0 0 40px',
              fontFamily: MONO,
            }}
          >
            Your classifications
          </h2>

          {/* Classified strip */}
          <div style={{ display: 'flex', marginBottom: 6 }}>
            {sorted.map((p) => (
              <div
                key={p.id}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{ width: '100%', height: 36, background: toRGB(p.g) }}
                />
                <div
                  style={{
                    width: '100%',
                    height: 6,
                    background:
                      ans[p.id] === true
                        ? INK
                        : ans[p.id] === false
                        ? '#e0ddd6'
                        : '#ccc',
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 48,
            }}
          >
            <span style={{ fontSize: 10, color: '#999' }}>
              ▲ red ({redCount})
            </span>
            <span style={{ fontSize: 10, color: '#bbb' }}>
              ▲ not red ({N - redCount})
            </span>
          </div>

          {redCount === N && (
            <div
              style={{
                background: INK,
                color: BG,
                padding: '22px 28px',
                marginBottom: 32,
              }}
            >
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85 }}>
                You called all {N} patches red, including rgb(255, 165, 0) — the
                colour of ripe tangerines.
                <br />
                <br />
                You escaped the paradox, but you must now classify pumpkins,
                autumn leaves, saffron, and amber as red.
              </p>
            </div>
          )}

          {redCount === 0 && (
            <div
              style={{
                background: INK,
                color: BG,
                padding: '22px 28px',
                marginBottom: 32,
              }}
            >
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85 }}>
                You called nothing red, including pure rgb(255, 0, 0).
                <br />
                <br />
                You escaped the paradox by eliminating the concept of redness
                altogether.
              </p>
            </div>
          )}

          {hasInversion && notRedPatch && redPatch && (
            <div
              style={{
                background: '#b50000',
                color: '#fff',
                padding: '22px 28px',
                marginBottom: 32,
              }}
            >
              <strong
                style={{
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 10,
                }}
              >
                Direct contradiction
              </strong>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85 }}>
                You called rgb(255, {notRedPatch.g}, 0) NOT RED, but also called
                rgb(255, {redPatch.g}, 0) RED — even though G={redPatch.g} is{' '}
                <em>more orange</em> than G={notRedPatch.g}.
              </p>
            </div>
          )}

          {cleanBoundary && redPatch && notRedPatch && (
            <>
              <div
                style={{
                  background: INK,
                  color: BG,
                  padding: '22px 28px',
                  marginBottom: 32,
                }}
              >
                <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.85 }}>
                  You drew a line.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    marginBottom: 14,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: toRGB(redPatch.g),
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12 }}>
                    rgb(255, {redPatch.g}, 0) →{' '}
                    <strong style={{ color: '#f90' }}>RED</strong>
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    marginBottom: 14,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: toRGB(notRedPatch.g),
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12 }}>
                    rgb(255, {notRedPatch.g}, 0) →{' '}
                    <strong style={{ color: '#888' }}>NOT RED</strong>
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>
                  Difference: {notRedPatch.g - redPatch.g} green units &nbsp;·&nbsp;{' '}
                  {(((notRedPatch.g - redPatch.g) / 255) * 100).toFixed(1)}% of
                  channel
                </p>
              </div>

              <h3
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: '#999',
                  margin: '0 0 14px',
                  fontFamily: MONO,
                }}
              >
                The tolerance chain
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: '#666',
                  lineHeight: 1.9,
                  margin: '0 0 20px',
                }}
              >
                <strong style={{ color: INK }}>P1:</strong> rgb(255, 0, 0) is
                red. <em>(You agreed — step 1.)</em>
                <br />
                <strong style={{ color: INK }}>P2:</strong> If S is red, and S′
                differs from S by only {stepSize} green units,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then S′ is also red.{' '}
                <em>(Each step is perceptually negligible.)</em>
                <br />
                <strong style={{ color: INK }}>C:</strong> By {firstNotIdx}{' '}
                applications of P2: rgb(255, {notRedPatch.g}, 0) is red.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 3,
                  marginBottom: 32,
                }}
              >
                {sorted.slice(0, firstNotIdx + 1).map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        background: toRGB(p.g),
                        outline:
                          ans[p.id] === false ? '2px solid #b50000' : 'none',
                        outlineOffset: 1,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 7,
                        color: ans[p.id] === false ? '#b50000' : '#ccc',
                        marginTop: 2,
                      }}
                    >
                      {ans[p.id] === false ? '✗' : '·'}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: '#b50000',
                  color: '#fff',
                  padding: '22px 28px',
                  marginBottom: 48,
                }}
              >
                <strong
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 10,
                  }}
                >
                  Contradiction
                </strong>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85 }}>
                  The tolerance chain forces rgb(255, {notRedPatch.g}, 0) to be
                  red. You said it is not. Premises 1 and 2 together, with your
                  own first answer, imply your last answer is wrong.
                </p>
              </div>
            </>
          )}

          <h3
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#999',
              margin: '0 0 20px',
              fontFamily: MONO,
            }}
          >
            Four exits from the paradox
          </h3>
          {[
            [
              'Epistemicism',
              'A sharp boundary exists; we simply cannot know where it is. Vagueness is epistemic, not metaphysical. Your line is correct — you just drew it somewhere arbitrary. (Williamson 1994)',
            ],
            [
              'Fuzzy logic',
              "'Red' admits of degrees: G=82 is 0.5 red. No contradiction arises at a non-classical truth value. The binary judgment forced by this game is the culprit, not the predicate.",
            ],
            [
              'Reject tolerance',
              "Premise 2 is false. Imperceptible differences can be decisive — they accumulate. 'Red' has a sharp extension even if individual differences are sub-threshold.",
            ],
            [
              'Supervaluationism',
              "Statements about borderline cases are neither true nor false. 'G=82 is red' has no truth value, so the inductive step fails. Classical logic still holds for clear cases.",
            ],
          ].map(([name, desc]) => (
            <div
              key={name}
              style={{
                borderLeft: '2px solid #ddd',
                paddingLeft: 18,
                marginBottom: 22,
              }}
            >
              <strong
                style={{
                  fontSize: 13,
                  color: INK,
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                {name}
              </strong>
              <p
                style={{
                  fontSize: 12,
                  color: '#666',
                  margin: 0,
                  lineHeight: 1.8,
                }}
              >
                {desc}
              </p>
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
            onMouseEnter={(e) => {
              e.target.style.borderColor = INK
              e.target.style.color = INK
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#ccc'
              e.target.style.color = '#666'
            }}
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
        description="Where does red end? Classify 34 color patches and discover the Sorites paradox — the contradiction hiding in your own judgements about vagueness."
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
          runs the same logic through colour — and exposes the contradiction in
          your own judgements.
        </p>
      </section>

      {/* Game area */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <SoritesBoard key={gameKey} onNewGame={() => setGameKey((k) => k + 1)} />
      </section>
    </div>
  )
}
