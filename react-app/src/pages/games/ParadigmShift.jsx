import { useState } from 'react'

const PHASES = [
    {
        id: 'pre',
        label: 'Pre-Science',
        color: '#6a6a7a',
        desc: 'No dominant paradigm; competing schools',
    },
    {
        id: 'normal',
        label: 'Normal Science',
        color: '#4a7aaa',
        desc: 'Puzzle-solving within accepted framework',
    },
    {
        id: 'anomaly',
        label: 'Anomaly',
        color: '#aa8a30',
        desc: 'Puzzle that resists standard solutions',
    },
    {
        id: 'crisis',
        label: 'Crisis',
        color: '#aa5a30',
        desc: 'Paradigm openly questioned; rules loosen',
    },
    {
        id: 'revolution',
        label: 'Revolution',
        color: '#7aaa4a',
        desc: 'New paradigm displaces the old',
    },
]

const CASES = [
    {
        paradigm: 'Ptolemaic Astronomy',
        statement:
            'Astronomers introduce epicycles upon epicycles to make planetary motion fit the Earth-centred model. The system still works... mostly.',
        correct: 'anomaly',
        explanation:
            'This is a textbook anomaly: the paradigm absorbs discrepancies through ad hoc adjustments rather than abandoning its core assumption.',
    },
    {
        paradigm: 'Newtonian Mechanics',
        statement:
            "A young physicist measures the perihelion precession of Mercury, noticing divergence from Newton's prediction by 43 arcseconds per century. The community notes the discrepancy but moves on.",
        correct: 'anomaly',
        explanation:
            'Known since 1859 and unresolved for sixty years, this was a persistent anomaly that eventually contributed to the crisis preceding relativity.',
    },
    {
        paradigm: 'Galenic Medicine',
        statement:
            'Medical schools throughout Europe teach that blood is consumed by the body and continuously produced by the liver. Students learn to diagnose imbalances in the four humours.',
        correct: 'normal',
        explanation:
            'Normal science: a settled framework being transmitted, applied, and extended — not questioned. Anomalies exist but are suppressed.',
    },
    {
        paradigm: 'Phlogiston Chemistry',
        statement:
            'Antoine Lavoisier demonstrates that metals gain mass when they calcinate. Phlogiston chemists cannot reconcile this: phlogiston should be released, not absorbed.',
        correct: 'crisis',
        explanation:
            'This marks crisis: the anomaly of weight gain attacks a core commitment of the paradigm. Competing explanations proliferate.',
    },
    {
        paradigm: 'Classical Physics',
        statement:
            'Einstein publishes the special theory of relativity. Initially dismissed, then debated fiercely, and finally, over two decades, adopted.',
        correct: 'revolution',
        explanation:
            "A revolution: a new paradigm replaces the old not by refutation alone, but through a gestalt shift in the community's fundamental commitments.",
    },
    {
        paradigm: 'Spontaneous Generation',
        statement:
            'Multiple naturalists conduct experiments on whether living things can arise from non-living matter, with inconsistent methodology and conflicting results.',
        correct: 'pre',
        explanation:
            "Pre-science: competing frameworks, no settled method, no exemplary achievement to guide puzzle-solving. The field is not yet a science in Kuhn's sense.",
    },
    {
        paradigm: 'Newtonian Mechanics',
        statement:
            'A 17th century engineer uses Newtonian mechanics to calculate the trajectory of a cannonball.',
        correct: 'normal',
        explanation:
            "Normal science in its purest form: applying the paradigm's tools to solve a puzzle it was designed for.",
    },
    {
        paradigm: 'Quantum Mechanics (Copenhagen)',
        statement:
            "Einstein, Podolsky, and Rosen argue that quantum mechanics must be incomplete. Bohr responds. Physicists split. Bell's inequalities are a generation away.",
        correct: 'crisis',
        explanation:
            'A prolonged crisis: the paradigm cannot fully satisfy its most eminent practitioners; foundational questions are reopened.',
    },
]

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function ParadigmShift() {
    const [cases] = useState(() => shuffle(CASES))
    const [idx, setIdx] = useState(0)
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [done, setDone] = useState(false)
    const [attempts, setAttempts] = useState(0)

    const c = cases[idx]
    const isCorrect = selected === c.correct

    function handleSelect(id) {
        if (submitted) return
        setSelected(id)
    }

    function handleSubmit() {
        if (!selected) return
        setAttempts((a) => a + 1)
        setSubmitted(true)
        if (selected === c.correct) {
            setScore((s) => s + (attempts === 0 ? 2 : 1))
        }
    }

    function handleNext() {
        if (idx + 1 >= cases.length) {
            setDone(true)
        } else {
            setIdx((i) => i + 1)
            setSelected(null)
            setSubmitted(false)
            setAttempts(0)
        }
    }

    function handleRetry() {
        setSelected(null)
        setSubmitted(false)
    }

    const maxScore = cases.length * 2

    if (done) {
        const pct = Math.round((score / maxScore) * 100)
        return (
            <div style={P.root}>
                <div style={P.doneWrap}>
                    <div style={P.doneCircle}>
                        {score}
                        <span style={P.doneMax}>/{maxScore}</span>
                    </div>
                    <div style={P.doneTitle}>Scientific Revolutions Mapped</div>
                    <div style={P.doneSub}>
                        {pct >= 80
                            ? 'Kuhn would call you a revolutionary scientist.'
                            : pct >= 55
                              ? 'Solid — you understand the structure of normal science.'
                              : 'The paradigm of your reasoning requires revision.'}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={P.root}>
            <div style={P.topBar}>
                <span style={P.brand}>PARADIGM SHIFT</span>
                <span style={P.progress}>
                    {idx + 1} / {cases.length}
                </span>
            </div>

            <div style={P.phaseKey}>
                {PHASES.map((ph) => (
                    <div key={ph.id} style={P.keyItem}>
                        <div style={{ ...P.keyDot, background: ph.color }} />
                        <span style={P.keyLabel}>{ph.label}</span>
                    </div>
                ))}
            </div>

            <div style={P.card}>
                <div style={P.paradigmLabel}>Paradigm</div>
                <div style={P.paradigmName}>{c.paradigm}</div>
                <div style={P.divider} />
                <div style={P.statement}>{c.statement}</div>
            </div>

            <div style={P.question}>
                Which Kuhnian phase does this describe?
            </div>

            <div style={P.phaseGrid}>
                {PHASES.map((ph) => {
                    let style = P.phaseBtn
                    if (selected === ph.id && !submitted)
                        style = {
                            ...style,
                            ...P.phaseBtnSelected,
                            borderColor: ph.color,
                            color: ph.color,
                        }
                    if (submitted && ph.id === c.correct)
                        style = {
                            ...style,
                            ...P.phaseBtnCorrect,
                            borderColor: ph.color,
                            color: ph.color,
                            background: ph.color + '18',
                        }
                    if (submitted && ph.id === selected && ph.id !== c.correct)
                        style = { ...style, ...P.phaseBtnWrong }
                    if (submitted && ph.id !== c.correct && ph.id !== selected)
                        style = { ...style, opacity: 0.3 }
                    return (
                        <button
                            key={ph.id}
                            style={style}
                            onClick={() => handleSelect(ph.id)}
                            disabled={submitted}
                        >
                            <div
                                style={{
                                    ...P.phaseDot,
                                    background:
                                        submitted && ph.id === c.correct
                                            ? ph.color
                                            : selected === ph.id
                                              ? ph.color
                                              : '#333',
                                }}
                            />
                            <div>
                                <div style={P.phaseBtnLabel}>{ph.label}</div>
                                <div style={P.phaseBtnDesc}>{ph.desc}</div>
                            </div>
                        </button>
                    )
                })}
            </div>

            {!submitted && (
                <button
                    style={{
                        ...P.submitBtn,
                        opacity: selected ? 1 : 0.4,
                        cursor: selected ? 'pointer' : 'default',
                    }}
                    onClick={handleSubmit}
                    disabled={!selected}
                >
                    Classify
                </button>
            )}

            {submitted && !isCorrect && (
                <div style={P.wrongBox}>
                    <div style={P.wrongTitle}>
                        Not quite. The correct phase is highlighted above.
                    </div>
                    <button style={P.retryBtn} onClick={handleRetry}>
                        Try again
                    </button>
                </div>
            )}

            {submitted && isCorrect && (
                <div style={P.correctBox}>
                    <div style={P.correctTitle}>
                        ✓ Correct —{' '}
                        {PHASES.find((p) => p.id === c.correct)?.label}
                    </div>
                    <div style={P.explanation}>{c.explanation}</div>
                    <button style={P.nextBtn} onClick={handleNext}>
                        {idx + 1 < cases.length ? 'Next Case →' : 'Final Score'}
                    </button>
                </div>
            )}
        </div>
    )
}

const P = {
    root: {
        minHeight: '100vh',
        background: '#12141c',
        color: '#b0b8c8',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 16px 60px',
    },
    topBar: {
        width: '100%',
        maxWidth: 680,
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    brand: {
        fontSize: 10,
        letterSpacing: '0.28em',
        color: '#4a5a7a',
        fontWeight: '600',
    },
    progress: {
        fontSize: 10,
        color: '#3a4a5a',
        letterSpacing: '0.1em',
    },
    phaseKey: {
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 28,
        maxWidth: 680,
        width: '100%',
    },
    keyItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },
    keyDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
    },
    keyLabel: {
        fontSize: 11,
        color: '#4a5a7a',
        letterSpacing: '0.06em',
    },
    card: {
        width: '100%',
        maxWidth: 680,
        background: '#1a1e28',
        border: '1px solid #2a3048',
        borderRadius: 6,
        padding: '24px 28px',
        marginBottom: 24,
    },
    paradigmLabel: {
        fontSize: 9,
        letterSpacing: '0.2em',
        color: '#3a4a6a',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    paradigmName: {
        fontSize: 18,
        color: '#8aacdc',
        fontWeight: '600',
        marginBottom: 16,
        letterSpacing: '0.02em',
    },
    divider: {
        height: 1,
        background: '#2a3048',
        marginBottom: 16,
    },
    statement: {
        fontSize: 16,
        lineHeight: 1.75,
        color: '#c0c8d8',
    },
    question: {
        fontSize: 13,
        color: '#4a5a7a',
        marginBottom: 16,
        alignSelf: 'flex-start',
        maxWidth: 680,
        width: '100%',
        letterSpacing: '0.04em',
    },
    phaseGrid: {
        width: '100%',
        maxWidth: 680,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 20,
    },
    phaseBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 18px',
        background: '#1a1e28',
        border: '1px solid #2a3048',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'all 0.15s',
        textAlign: 'left',
        color: '#7a8aaa',
    },
    phaseBtnSelected: {
        background: '#1e2438',
    },
    phaseBtnCorrect: {},
    phaseBtnWrong: {
        background: '#2a1820',
        borderColor: '#6a2a2a',
        color: '#6a4a4a',
    },
    phaseDot: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        flexShrink: 0,
        transition: 'background 0.15s',
    },
    phaseBtnLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
        letterSpacing: '0.02em',
    },
    phaseBtnDesc: {
        fontSize: 11,
        opacity: 0.6,
        letterSpacing: '0.02em',
    },
    submitBtn: {
        padding: '12px 36px',
        background: '#2a3a58',
        border: 'none',
        color: '#8aaad8',
        fontSize: 14,
        borderRadius: 5,
        fontWeight: '600',
        letterSpacing: '0.08em',
        marginBottom: 16,
        transition: 'opacity 0.15s',
    },
    wrongBox: {
        width: '100%',
        maxWidth: 680,
        background: '#1e1418',
        border: '1px solid #3a2228',
        borderRadius: 5,
        padding: '16px 20px',
    },
    wrongTitle: {
        fontSize: 13,
        color: '#8a5a5a',
        marginBottom: 10,
    },
    retryBtn: {
        background: 'transparent',
        border: '1px solid #3a2228',
        color: '#6a4a4a',
        fontSize: 12,
        padding: '7px 16px',
        borderRadius: 4,
        cursor: 'pointer',
    },
    correctBox: {
        width: '100%',
        maxWidth: 680,
        background: '#141e18',
        border: '1px solid #2a4030',
        borderRadius: 5,
        padding: '20px 24px',
    },
    correctTitle: {
        fontSize: 15,
        color: '#60b860',
        marginBottom: 10,
        fontWeight: '600',
    },
    explanation: {
        fontSize: 14,
        color: '#4a7a5a',
        lineHeight: 1.7,
        marginBottom: 18,
    },
    nextBtn: {
        background: '#1a3020',
        border: '1px solid #2a5030',
        color: '#60b860',
        fontSize: 13,
        padding: '10px 24px',
        borderRadius: 4,
        cursor: 'pointer',
        fontWeight: '600',
        letterSpacing: '0.05em',
    },
    doneWrap: {
        textAlign: 'center',
        marginTop: 80,
    },
    doneCircle: {
        fontSize: 64,
        color: '#6aace8',
        fontWeight: 'bold',
        marginBottom: 16,
        letterSpacing: '-0.02em',
    },
    doneMax: {
        fontSize: 32,
        color: '#3a5a8a',
    },
    doneTitle: {
        fontSize: 18,
        color: '#8aaad8',
        marginBottom: 10,
        letterSpacing: '0.04em',
    },
    doneSub: {
        fontSize: 14,
        color: '#4a5a7a',
        maxWidth: 360,
        margin: '0 auto',
        lineHeight: 1.6,
        fontStyle: 'italic',
    },
}
