"use client";
import { useState } from 'react'
const N = 34
const patches = Array.from({ length: N }, (_, i) => ({ id: i, t: i / (N - 1) }))

const PRESET_COLOURS = [
    { name: 'red', rgb: [220, 38, 38] },
    { name: 'orange', rgb: [249, 115, 22] },
    { name: 'amber', rgb: [245, 158, 11] },
    { name: 'yellow', rgb: [234, 179, 8] },
    { name: 'lime', rgb: [132, 204, 22] },
    { name: 'green', rgb: [34, 197, 94] },
    { name: 'teal', rgb: [20, 184, 166] },
    { name: 'blue', rgb: [59, 130, 246] },
    { name: 'violet', rgb: [139, 92, 246] },
    { name: 'purple', rgb: [168, 85, 247] },
    { name: 'pink', rgb: [236, 72, 153] },
    { name: 'brown', rgb: [161, 72, 27] },
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

const BG = 'var(--sor-bg, #F8F4EC)'
const INK = 'var(--sor-ink, #1A1A18)'
const MONO = "'IBM Plex Mono', 'Courier New', monospace"

function Swatch({ color, size = 16 }) {
    return (
        <span
            className="inline-block w-[size] h-[size] bg-[color] shrink-0" style={{verticalAlign: middle, margin: 0 3px,}}
        />
    )
}

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
        if (!favColour || !leastColour) return 'var(--sor-subtle, #ccc)'
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
            <div
                className="flex w-full h-[18] mb-[40]"
            >
                {patches.map((p) => (
                    <div
                        key={p.id}
                        className="flex-1 bg-[toRGB(p.t)]"
                    />
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
            <div
                className="font-[family:MONO] flex flex-col items-center" style={{padding: 40px 0 80px,}}
            >
                <style>{`
          .sor-swatch { border: none; padding: 0; cursor: pointer; background: transparent; text-align: center; }
          .sor-swatch-inner { width: 100%; aspect-ratio: 1; transition: transform 0.12s, outline 0.12s; outline: 2px solid transparent; outline-offset: 2px; }
          .sor-swatch:hover .sor-swatch-inner { transform: scale(1.06); outline-color: ${INK}; }
          .sor-swatch-label { font-family: ${MONO}; font-size: 9px; color: #888; letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-top: 5px; }
        `}</style>
                <div className="w-full" style={{maxWidth: 520,}}>
                    <p
                        className="text-[length:10] tracking-[0.22em] text-[var(--sor-muted] uppercase" style={{margin: 0 0 14px,}}
                    >
                        Setup ·{' '}
                        {setupStep === 'fav' ? 'Step 1 of 2' : 'Step 2 of 2'}
                    </p>
                    <h2
                        className="text-[length:34] font-[600] text-[INK] leading-[1.15] font-[family:MONO]" style={{margin: 0 0 10px,}}
                    >
                        {setupStep === 'fav'
                            ? 'Choose your favourite colour.'
                            : 'Choose your least favourite.'}
                    </h2>
                    <p
                        className="text-[length:12] text-[var(--sor-muted] leading-[1.8]" style={{margin: 0 0 36px,}}
                    >
                        {setupStep === 'fav'
                            ? 'The gradient will run from this colour. You will be asked: "Is this [your colour]?"'
                            : 'The gradient will end here — at the colour you find least appealing.'}
                    </p>

                    {setupStep === 'least' && favColour && (
                        <div
                            className="flex items-center gap-[10] mb-[28]"
                        >
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    background: `rgb(${favColour.rgb.join(',')})`,
                                    flexShrink: 0,
                                }}
                            />
                            <span
                                className="text-[length:10] text-[var(--sor-muted] tracking-[0.1em] uppercase"
                            >
                                favourite: {favColour.name}
                            </span>
                        </div>
                    )}

                    <div
                        className="grid gap-[12] mb-[20]" style={{gridTemplateColumns: repeat(4,}}
                    >
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
                                    style={{
                                        background: `rgb(${colour.rgb.join(',')})`,
                                    }}
                                />
                                <span className="sor-swatch-label">
                                    {colour.name}
                                </span>
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
            <div
                className="font-[family:MONO] flex flex-col items-center" style={{padding: 40px 0 80px,}}
            >
                <style>{`
          .sor-start-btn { background:${INK}; color:${BG}; border:none; padding:14px 40px; font-family:${MONO}; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:opacity .15s; }
          .sor-start-btn:hover { opacity:0.75; }
        `}</style>
                <div className="w-full" style={{maxWidth: 520,}}>
                    {stripBar()}
                    <p
                        className="text-[length:10] tracking-[0.22em] text-[var(--sor-muted] uppercase" style={{margin: 0 0 14px,}}
                    >
                        Experiment · The Sorites Paradox
                    </p>
                    <h2
                        className="text-[length:40] font-[600] text-[INK] leading-[1.1] font-[family:MONO]" style={{margin: 0 0 28px,}}
                    >
                        Where does
                        <br />
                        {favColour.name} end?
                    </h2>
                    <p
                        className="text-[length:13] text-[var(--sor-muted-dark] leading-[1.85]" style={{margin: 0 0 12px,}}
                    >
                        You will be shown {N} colour patches running from{' '}
                        <span className="text-[toRGB(0)] font-[600]">
                            {favColour.name}
                        </span>{' '}
                        to{' '}
                        <span className="text-[toRGB(1)] font-[600]">
                            {leastColour.name}
                        </span>
                        , one at a time. For each, answer a single question:
                    </p>
                    <p
                        className="text-[length:16] text-[INK] font-[500] tracking-[0.02em]" style={{margin: 0 0 28px,}}
                    >
                        Is this{' '}
                        <span className="text-[toRGB(0)]">
                            {favColour.name}
                        </span>
                        ?
                    </p>
                    <p
                        className="text-[length:12] text-[var(--sor-muted] leading-[1.8]" style={{margin: 0 0 44px,}}
                    >
                        No trick. Answer honestly. You will be shown your own
                        contradictions at the end.
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

    // ── Classify phase ─────────────────────────────────────────────────────────────

    if (phase === 'classify') {
        const p = patches[order[step]]
        const pct = Math.round((step / N) * 100)
        const isAnchor = step < 2
        return (
            <div
                className="font-[family:MONO] flex flex-col items-center" style={{padding: 40px 0 80px,}}
            >
                <style>{`
          .sor-cls-btn { flex:1; padding:18px 0; font-family:${MONO}; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; border:1.5px solid; transition:all .12s; background:transparent; }
          .sor-yes-b { border-color:${INK}; color:${INK}; }
          .sor-yes-b:hover { background:${INK}; color:${BG}; }
          .sor-no-b { border-color:#bbb; color:#999; }
          .sor-no-b:hover { background:#bbb; color:${BG}; border-color:#bbb; }
        `}</style>
                <div className="w-full" style={{maxWidth: 480,}}>
                    <div
                        className="flex items-center gap-[14] mb-[52]"
                    >
                        <div
                            className="flex-1 h-[1] bg-[var(--sor-border] relative"
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
                        <span
                            className="text-[length:10] text-[var(--sor-muted]" style={{whiteSpace: nowrap,}}
                        >
                            {step + 1} / {N}
                        </span>
                    </div>

                    <div
                        className="w-full bg-[toRGB(p.t)] mb-[44]" style={{aspectRatio: 4/3, transition: background 0.35s ease,}}
                    />

                    <p
                        className="text-[length:22] text-center text-[INK] font-[500]" style={{margin: 0 0 32px,}}
                    >
                        Is this{' '}
                        <span className="text-[toRGB(0)]">
                            {favColour.name}
                        </span>
                        ?
                    </p>

                    <div className="flex gap-[10]">
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
                            className="text-[length:10] text-[var(--sor-subtle] text-center mt-[20] tracking-[0.1em]"
                        >
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
        const lastFavIdx = sorted.reduce(
            (best, p, i) => (ans[p.id] === true ? i : best),
            -1,
        )
        const firstNotFavIdx = sorted.findIndex((p) => ans[p.id] === false)
        const hasInversion =
            lastFavIdx >= 0 &&
            firstNotFavIdx >= 0 &&
            lastFavIdx > firstNotFavIdx
        const cleanBoundary =
            lastFavIdx >= 0 && firstNotFavIdx >= 0 && !hasInversion
        const favCount = Object.values(ans).filter(Boolean).length
        const favPatch = lastFavIdx >= 0 ? sorted[lastFavIdx] : null
        const notFavPatch = firstNotFavIdx >= 0 ? sorted[firstNotFavIdx] : null

        // ── Heap Escaper easter egg ────────────────────────────────────────────────
        if (favCount === N || favCount === 0) {
            const escapedRGB = favCount === N ? favColour.rgb : leastColour.rgb
            const monoCSS = `rgb(${escapedRGB.join(',')})`
            return (
                <div className="font-[family:MONO]" style={{padding: 0 0 80px,}}>
                    <div
                        className="flex w-full h-[22] mb-[56]"
                    >
                        {patches.map((p) => (
                            <div
                                key={p.id}
                                className="flex-1 bg-[monoCSS]"
                            />
                        ))}
                    </div>
                    <div
                        className="text-center" style={{maxWidth: 560, margin: 0 auto,}}
                    >
                        <p
                            className="text-[length:9] tracking-[0.3em] text-[monoCSS] uppercase" style={{margin: 0 0 20px,}}
                        >
                            Easter Egg · Heap Escaper
                        </p>
                        <h2
                            className="text-[length:52] font-bold tracking-[0.06em] text-[monoCSS] leading-[1]" style={{margin: 0 0 8px,}}
                        >
                            PARADOX
                        </h2>
                        <h2
                            className="text-[length:52] font-bold tracking-[0.06em] text-[INK] leading-[1]" style={{margin: 0 0 40px,}}
                        >
                            ESCAPED
                        </h2>
                        <p
                            className="text-[length:12] text-[var(--sor-muted-dark] leading-[1.85] ml-[auto] mr-[auto]" style={{margin: 0 0 36px, maxWidth: 440,}}
                        >
                            {favCount === N
                                ? `You called all ${N} patches ${favName} — absorbing ${leastColour.name} into your favourite colour. The sorites paradox cannot arise if the predicate swallows the entire spectrum.`
                                : `You called nothing ${favName} — not even the pure ${favName} at position 1. The paradox dissolves when the predicate has no extension at all.`}
                        </p>
                        <div
                            className="pl-[20] text-left" style={{borderLeft: 3px solid, borderColor: monoCSS, margin: 0 auto 48px, maxWidth: 440,}}
                        >
                            <p
                                className="text-[length:14] italic text-[INK] leading-[1.8]" style={{margin: 0 0 8px,}}
                            >
                                "Everything is vague to a degree you do not
                                realise till you have tried to make it precise."
                            </p>
                            <p
                                className="text-[length:10] tracking-[0.15em] text-[var(--sor-muted] uppercase m-0"
                            >
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
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = monoCSS
                                e.currentTarget.style.color = BG
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.color = monoCSS
                            }}
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )
        }
        // ──────────────────────────────────────────────────────────────────────────



        return (
            <div className="font-[family:MONO]" style={{padding: 0 0 80px,}}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>
                    <p
                        className="text-[length:10] tracking-[0.22em] text-[var(--sor-muted] uppercase" style={{margin: 0 0 10px,}}
                    >
                        Analysis
                    </p>
                    <output
                        className="block text-[length:28] font-[600] text-[INK] font-[family:MONO]" style={{margin: 0 0 40px,}}
                        aria-live="polite"
                    >
                        Your classifications
                    </output>

                    {/* Classified strip */}
                    <div className="flex mb-[6]">
                        {sorted.map((p) => (
                            <div
                                key={p.id}
                                className="flex-1 flex flex-col items-center"
                            >
                                <div
                                    className="w-full h-[36] bg-[toRGB(p.t)]"
                                />
                                <div
                                    style={{
                                        width: '100%',
                                        height: 6,
                                        background:
                                            ans[p.id] === true
                                                ? INK
                                                : ans[p.id] === false
                                                  ? 'var(--sor-border-light, #e0ddd6)'
                                                  : 'var(--sor-subtle, #ccc)',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className="flex justify-between mb-[48]"
                    >
                        <span className="text-[length:10] text-[var(--sor-muted]">
                            ▲ {favName} ({favCount})
                        </span>
                        <span className="text-[length:10] text-[var(--sor-subtle-dark]">
                            ▲ not {favName} ({N - favCount})
                        </span>
                    </div>

                    {/* Inversion */}
                    {hasInversion && notFavPatch && favPatch && (
                        <div
                            className="bg-[#b50000] text-[#fff] mb-[32]" style={{padding: 22px 28px,}}
                        >
                            <strong
                                className="text-[length:10] tracking-[0.18em] uppercase block mb-[10]"
                            >
                                Direct contradiction
                            </strong>
                            <p
                                className="m-0 text-[length:13] leading-[1.85]"
                            >
                                You called <Swatch color={toRGB(notFavPatch.t)} /> NOT{' '}
                                {favName}, but also called{' '}
                                <Swatch color={toRGB(favPatch.t)} /> {favName} — even
                                though the second patch is{' '}
                                <em>further from {favName}</em> in the gradient.
                            </p>
                        </div>
                    )}

                    {/* Clean boundary */}
                    {cleanBoundary && favPatch && notFavPatch && (
                        <>
                            <div
                                className="bg-[INK] text-[BG] mb-[32]" style={{padding: 22px 28px,}}
                            >
                                <p
                                    className="text-[length:13] leading-[1.85]" style={{margin: 0 0 14px,}}
                                >
                                    You drew a line.
                                </p>
                                <div
                                    className="flex gap-[16] mb-[14] items-center"
                                >
                                    <div
                                        className="w-[40] h-[40] bg-[toRGB(favPatch.t)] shrink-0"
                                    />
                                    <span className="text-[length:12]">
                                        position {lastFavIdx + 1}/{N} →{' '}
                                        <strong className="text-[toRGB(0)]">
                                            {favName.toUpperCase()}
                                        </strong>
                                    </span>
                                </div>
                                <div
                                    className="flex gap-[16] mb-[14] items-center"
                                >
                                    <div
                                        className="w-[40] h-[40] bg-[toRGB(notFavPatch.t)] shrink-0"
                                    />
                                    <span className="text-[length:12]">
                                        position {firstNotFavIdx + 1}/{N} →{' '}
                                        <strong className="text-[var(--sor-muted]">
                                            NOT {favName.toUpperCase()}
                                        </strong>
                                    </span>
                                </div>
                                <p
                                    className="m-0 text-[length:12] text-[var(--sor-muted]"
                                >
                                    Gap: {firstNotFavIdx - lastFavIdx} step
                                    {firstNotFavIdx - lastFavIdx !== 1
                                        ? 's'
                                        : ''}{' '}
                                    in the gradient &nbsp;·&nbsp;{' '}
                                    {(
                                        ((notFavPatch.t - favPatch.t) / 1) *
                                        100
                                    ).toFixed(1)}
                                    % of total span
                                </p>
                            </div>

                            <h3
                                className="text-[length:11] uppercase tracking-[0.18em] text-[var(--sor-muted] font-[family:MONO]" style={{margin: 0 0 14px,}}
                            >
                                The tolerance chain
                            </h3>
                            <p
                                className="text-[length:12] text-[var(--sor-muted-dark] leading-[1.9]" style={{margin: 0 0 20px,}}
                            >
                                <strong className="text-[INK]">P1:</strong>{' '}
                                <Swatch color={toRGB(0)} size={12} /> {favName} (position
                                1) is {favName}. <em>(You agreed — step 1.)</em>
                                <br />
                                <strong className="text-[INK]">P2:</strong> If S
                                is {favName}, and S′ is one step further in the
                                gradient,
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then S′ is
                                also {favName}.{' '}
                                <em>
                                    (Each of the {N - 1} steps is perceptibly
                                    negligible.)
                                </em>
                                <br />
                                <strong className="text-[INK]">
                                    C:
                                </strong> By {firstNotFavIdx} applications of
                                P2: <Swatch color={toRGB(notFavPatch.t)} size={12} />{' '}
                                position {firstNotFavIdx + 1} is {favName}.
                            </p>

                            <div
                                className="flex gap-[3] mb-[32]" style={{flexWrap: wrap,}}
                            >
                                {sorted
                                    .slice(0, firstNotFavIdx + 1)
                                    .map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex flex-col items-center"
                                        >
                                            <div
                                                style={{
                                                    width: 22,
                                                    height: 22,
                                                    background: toRGB(p.t),
                                                    outline:
                                                        ans[p.id] === false
                                                            ? '2px solid #b50000'
                                                            : 'none',
                                                    outlineOffset: 1,
                                                }}
                                            />
                                            <span
                                                style={{
                                                    fontSize: 7,
                                                    color:
                                                        ans[p.id] === false
                                                            ? '#b50000'
                                                            : 'var(--sor-subtle, #ccc)',
                                                    marginTop: 2,
                                                }}
                                            >
                                                {ans[p.id] === false
                                                    ? '✗'
                                                    : '·'}
                                            </span>
                                        </div>
                                    ))}
                            </div>

                            <div
                                className="bg-[#b50000] text-[#fff] mb-[48]" style={{padding: 22px 28px,}}
                            >
                                <strong
                                    className="text-[length:10] tracking-[0.18em] uppercase block mb-[10]"
                                >
                                    Contradiction
                                </strong>
                                <p
                                    className="m-0 text-[length:13] leading-[1.85]"
                                >
                                    The tolerance chain forces position{' '}
                                    {firstNotFavIdx + 1} to be {favName}. You
                                    said it is not. Your first answer, combined
                                    with the negligibility premise, makes your
                                    later answer logically impossible.
                                </p>
                            </div>
                        </>
                    )}

                    <h3
                        className="text-[length:11] uppercase tracking-[0.18em] text-[var(--sor-muted] font-[family:MONO]" style={{margin: 0 0 20px,}}
                    >
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
                        <div
                            key={name}
                            className="pl-[18] mb-[22]" style={{borderLeft: 2px solid #ddd,}}
                        >
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[length:13] text-[INK] block mb-[5] font-[600]" style={{textDecoration: none,}}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.textDecoration =
                                        'underline'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.textDecoration =
                                        'none'
                                }}
                            >
                                {name} ↗
                            </a>
                            <p
                                className="text-[length:12] text-[var(--sor-muted-dark] m-0 leading-[1.8]"
                            >
                                {desc}
                            </p>
                        </div>
                    ))}

                    <button
                        onClick={onNewGame}
                        className="mt-[40] bg-transparent font-[family:MONO] text-[length:11] tracking-[0.14em] uppercase cursor-pointer text-[var(--sor-muted-dark]" style={{padding: 12px 28px, border: 1px solid #ccc, transition: all .15s,}}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = INK
                            e.currentTarget.style.color = INK
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--sor-subtle, #ccc)'
                            e.currentTarget.style.color = 'var(--sor-muted-dark, #666)'
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
        <div className="pt-20 animate-on-load dark:bg-[#0E1A14] min-h-screen">
            <style>{`
                .sorites-wrapper {
                    --sor-bg: #F8F4EC;
                    --sor-ink: #1A1A18;
                    --sor-muted: #888888;
                    --sor-muted-dark: #555555;
                    --sor-subtle: #cccccc;
                    --sor-subtle-dark: #bbbbbb;
                    --sor-border: #dddddd;
                    --sor-border-light: #e0ddd6;
                }
                .dark .sorites-wrapper {
                    --sor-bg: #0E1A14;
                    --sor-ink: #DDD8CD;
                    --sor-muted: #999999;
                    --sor-muted-dark: #aaaaaa;
                    --sor-subtle: #444444;
                    --sor-subtle-dark: #555555;
                    --sor-border: #333333;
                    --sor-border-light: #222222;
                }
            `}</style>
            <div className="sorites-wrapper">
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
                                className="font-heading font-light text-green uppercase tracking-wide text-[length:clamp(1.8rem]"
                                
                            >
                                Sorites
                            </h1>
                        </div>
                        <div className="md:w-1/2">
                            <div className="h-px w-12 bg-gold/40 mb-4" />
                            <p className="font-body text-sm text-ink/60 leading-relaxed">
                                The Sorites paradox asks: if removing one grain from a heap
                                still leaves a heap, how can a heap ever become a non-heap?
                                This experiment runs the same logic through your own colour
                                preferences — and exposes the contradiction in your own
                                judgements about vagueness and borderline cases.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Game area */}
                <section className="max-w-2xl mx-auto px-6 pb-20">
                    <SoritesBoard
                        key={gameKey}
                        onNewGame={() => setGameKey((k) => k + 1)}
                    />
                </section>
            </div>
        </div>
    )
}


