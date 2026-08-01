import { useState } from 'react'

const ARGUMENTS = [
    {
        title: "Descartes' Cogito",
        philosopher: 'René Descartes, Meditations II (1641)',
        conclusion: 'I exist as a thinking thing.',
        correct: [
            'I can doubt everything I perceive through the senses.',
            'Even an evil demon could deceive me about the external world.',
            'But I cannot doubt that I am doubting.',
            'Doubting is a form of thinking.',
            'If I am thinking, then something must be doing the thinking.',
            'Therefore: I exist as a thinking thing.',
        ],
        hiddenPremise: 'The act of doubting cannot be faked from the inside.',
        hiddenIdx: 3,
        note: 'The hidden premise — that doubting cannot be doubted — is what seals the argument against the demon hypothesis.',
    },
    {
        title: 'Hume on Causation',
        philosopher:
            'David Hume, Enquiry Concerning Human Understanding (1748)',
        conclusion:
            'Our idea of necessary connection has no rational foundation.',
        correct: [
            'We believe that causes necessarily produce their effects.',
            'All ideas must be derived from prior impressions.',
            'We have never observed necessary connection itself — only regular succession.',
            'The idea of necessity therefore cannot come from sense experience.',
            'Nor can it come from reason alone, since any cause could conceivably have a different effect.',
            'Therefore: Our idea of necessary connection has no rational foundation.',
        ],
        hiddenPremise:
            'Custom or habit, not reason, produces our expectation of causes.',
        hiddenIdx: 4,
        note: "The hidden conclusion is that causation is a habit of the mind, not a fact about the world — Hume's most radical step.",
    },
    {
        title: "Kant's Moral Law",
        philosopher:
            'Immanuel Kant, Groundwork of the Metaphysics of Morals (1785)',
        conclusion:
            'Act only according to that maxim by which you can at the same time will that it become a universal law.',
        correct: [
            'Moral worth comes from acting from duty, not from inclination or consequence.',
            'A good will is good not because of what it achieves, but because of what it wills.',
            'The only unconditionally good thing is a good will.',
            'Rational beings are ends in themselves, never merely means.',
            'A rational being must be able to universalise the maxim of any action it performs.',
            'Therefore: Act only according to that maxim by which you can at the same time will that it become a universal law.',
        ],
        hiddenPremise: 'Moral law must be categorical, not hypothetical.',
        hiddenIdx: 4,
        note: 'The hidden premise — that moral law must be categorical — is what rules out consequentialist and prudential alternatives.',
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

function initItems(correct) {
    const body = correct.slice(0, -1)
    const shuffled = shuffle(body)
    return shuffled.map((text, i) => ({ id: i, text }))
}

function isCorrect(items, correct) {
    return items.every((item, i) => item.text === correct[i])
}

export default function ArgumentReconstruction() {
    const [argIdx, setArgIdx] = useState(0)
    const [items, setItems] = useState(() => initItems(ARGUMENTS[0].correct))
    const [dragging, setDragging] = useState(null)
    const [dragOver, setDragOver] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [showNote, setShowNote] = useState(false)
    const [done, setDone] = useState(false)
    const [attempts, setAttempts] = useState(0)

    const arg = ARGUMENTS[argIdx]
    const correct = arg.correct.slice(0, -1)
    const won = submitted && isCorrect(items, correct)

    function handleDragStart(idx) {
        setDragging(idx)
    }

    function handleDragEnter(idx) {
        if (dragging === null || dragging === idx) return
        const newItems = [...items]
        const [moved] = newItems.splice(dragging, 1)
        newItems.splice(idx, 0, moved)
        setItems(newItems)
        setDragging(idx)
    }

    function handleDragEnd() {
        setDragging(null)
        setDragOver(null)
    }

    function handleSubmit() {
        setAttempts((a) => a + 1)
        setSubmitted(true)
        if (isCorrect(items, correct)) {
            const pts = attempts === 0 ? 3 : 1
            setScore((s) => s + pts)
        }
    }

    function handleReset() {
        setItems(initItems(arg.correct))
        setSubmitted(false)
    }

    function handleNext() {
        const next = argIdx + 1
        if (next >= ARGUMENTS.length) {
            setDone(true)
        } else {
            setArgIdx(next)
            setItems(initItems(ARGUMENTS[next].correct))
            setSubmitted(false)
            setAttempts(0)
            setShowNote(false)
        }
    }

    if (done) {
        return (
            <div style={T.root}>
                <div style={T.doneCard}>
                    <div style={T.doneStamp}>§</div>
                    <div style={T.doneTitle}>All Arguments Reconstructed</div>
                    <div style={T.doneScore}>
                        Score: {score} / {ARGUMENTS.length * 3}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={T.root}>
            <div style={T.header}>
                <span style={T.brand}>ARGUMENT RECONSTRUCTION</span>
                <span style={T.score}>{score} pts</span>
            </div>

            <div style={T.meta}>
                <div style={T.argTitle}>{arg.title}</div>
                <div style={T.argPhil}>{arg.philosopher}</div>
            </div>

            <div style={T.task}>
                Drag the premises into the correct logical order. The conclusion
                is fixed.
            </div>

            <div style={T.argBox}>
                <div style={T.premisesSection}>
                    {items.map((item, i) => {
                        const isRight = submitted && item.text === correct[i]
                        const isWrong = submitted && item.text !== correct[i]
                        return (
                            <div
                                key={item.id}
                                draggable={!submitted}
                                onDragStart={() => handleDragStart(i)}
                                onDragEnter={() => handleDragEnter(i)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => e.preventDefault()}
                                style={{
                                    ...T.premise,
                                    ...(dragging === i
                                        ? T.premiseDragging
                                        : {}),
                                    ...(isRight ? T.premiseRight : {}),
                                    ...(isWrong ? T.premiseWrong : {}),
                                    cursor: submitted ? 'default' : 'grab',
                                }}
                            >
                                <span style={T.premiseNum}>{i + 1}</span>
                                <span style={T.premiseText}>{item.text}</span>
                                {!submitted && <span style={T.handle}>⠿</span>}
                                {isRight && <span style={T.tick}>✓</span>}
                                {isWrong && <span style={T.cross}>✗</span>}
                            </div>
                        )
                    })}
                </div>

                <div style={T.conclusion}>
                    <span style={T.conclusionLabel}>∴ CONCLUSION</span>
                    <span style={T.conclusionText}>{arg.conclusion}</span>
                </div>
            </div>

            {!submitted && (
                <button style={T.submitBtn} onClick={handleSubmit}>
                    Submit Order
                </button>
            )}

            {submitted && !won && (
                <div style={T.feedback}>
                    <div style={T.fbTitle}>
                        Not quite — review the highlighted premises and try
                        again.
                    </div>
                    <button style={T.retryBtn} onClick={handleReset}>
                        Reorder & Retry
                    </button>
                </div>
            )}

            {submitted && won && (
                <div style={T.wonBox}>
                    <div style={T.wonTitle}>
                        ✓ Correct reconstruction
                        {attempts === 1 ? ' — first attempt!' : ''}
                    </div>

                    {!showNote && (
                        <button
                            style={T.hintBtn}
                            onClick={() => setShowNote(true)}
                        >
                            Reveal hidden premise
                        </button>
                    )}

                    {showNote && (
                        <div style={T.noteBox}>
                            <div style={T.noteLabel}>HIDDEN PREMISE</div>
                            <div style={T.noteText}>"{arg.hiddenPremise}"</div>
                            <div style={T.noteExpl}>{arg.note}</div>
                        </div>
                    )}

                    <button style={T.nextBtn} onClick={handleNext}>
                        {argIdx + 1 < ARGUMENTS.length
                            ? 'Next Argument →'
                            : 'Finish'}
                    </button>
                </div>
            )}
        </div>
    )
}

const T = {
    root: {
        minHeight: '100vh',
        background: '#1a1814',
        color: '#d0c8b8',
        fontFamily: "'Courier New', Courier, monospace",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 16px 60px',
    },
    header: {
        width: '100%',
        maxWidth: 660,
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    brand: {
        fontSize: 10,
        letterSpacing: '0.25em',
        color: '#7a6a4a',
    },
    score: {
        fontSize: 10,
        color: '#7a6a4a',
        letterSpacing: '0.15em',
    },
    meta: {
        width: '100%',
        maxWidth: 660,
        borderLeft: '3px solid #5a4a2a',
        paddingLeft: 16,
        marginBottom: 24,
    },
    argTitle: {
        fontSize: 20,
        color: '#e0d0a0',
        marginBottom: 4,
        fontWeight: 'bold',
        letterSpacing: '0.04em',
    },
    argPhil: {
        fontSize: 12,
        color: '#6a5a3a',
        letterSpacing: '0.05em',
    },
    task: {
        fontSize: 12,
        color: '#5a4a2a',
        marginBottom: 20,
        alignSelf: 'flex-start',
        maxWidth: 660,
        width: '100%',
    },
    argBox: {
        width: '100%',
        maxWidth: 660,
        border: '1px solid #2a2218',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 20,
    },
    premisesSection: {
        padding: '4px 0',
        background: '#1e1a14',
    },
    premise: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        borderBottom: '1px solid #2a2218',
        transition: 'background 0.15s',
        userSelect: 'none',
    },
    premiseDragging: {
        background: '#2a2418',
        opacity: 0.7,
    },
    premiseRight: {
        background: '#1a2a18',
        borderLeft: '3px solid #4a8a4a',
    },
    premiseWrong: {
        background: '#2a1a18',
        borderLeft: '3px solid #8a4a4a',
    },
    premiseNum: {
        fontSize: 10,
        color: '#4a3a1a',
        minWidth: 16,
        paddingTop: 2,
        letterSpacing: '0.1em',
    },
    premiseText: {
        fontSize: 14,
        lineHeight: 1.6,
        flex: 1,
        color: '#c0b898',
    },
    handle: {
        fontSize: 16,
        color: '#3a3020',
        minWidth: 18,
    },
    tick: {
        color: '#4a8a4a',
        fontSize: 14,
        minWidth: 18,
    },
    cross: {
        color: '#8a4a4a',
        fontSize: 14,
        minWidth: 18,
    },
    conclusion: {
        padding: '16px 18px',
        background: '#121008',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        borderTop: '2px solid #3a3020',
    },
    conclusionLabel: {
        fontSize: 9,
        color: '#6a5a2a',
        letterSpacing: '0.2em',
        minWidth: 72,
        paddingTop: 3,
    },
    conclusionText: {
        fontSize: 14,
        color: '#e0d0a0',
        lineHeight: 1.6,
        fontStyle: 'italic',
    },
    submitBtn: {
        padding: '12px 32px',
        background: '#3a3020',
        border: '1px solid #5a4a2a',
        color: '#d0c080',
        fontSize: 13,
        fontFamily: 'monospace',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        borderRadius: 2,
        marginBottom: 16,
    },
    feedback: {
        width: '100%',
        maxWidth: 660,
        background: '#2a1818',
        border: '1px solid #4a2a2a',
        borderRadius: 3,
        padding: '16px 20px',
    },
    fbTitle: {
        fontSize: 13,
        color: '#a06060',
        marginBottom: 12,
    },
    retryBtn: {
        background: 'transparent',
        border: '1px solid #4a2a2a',
        color: '#a06060',
        fontSize: 12,
        padding: '8px 18px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        borderRadius: 2,
    },
    wonBox: {
        width: '100%',
        maxWidth: 660,
        background: '#141e12',
        border: '1px solid #2a4028',
        borderRadius: 3,
        padding: '20px 24px',
    },
    wonTitle: {
        fontSize: 15,
        color: '#70c070',
        marginBottom: 16,
    },
    hintBtn: {
        background: 'transparent',
        border: '1px dashed #2a4028',
        color: '#4a7a4a',
        fontSize: 12,
        padding: '8px 16px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        borderRadius: 2,
        marginBottom: 16,
        display: 'block',
    },
    noteBox: {
        background: '#0e160c',
        border: '1px solid #2a4028',
        borderRadius: 2,
        padding: '16px 18px',
        marginBottom: 16,
    },
    noteLabel: {
        fontSize: 9,
        letterSpacing: '0.2em',
        color: '#3a5a3a',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    noteText: {
        fontSize: 14,
        color: '#90c090',
        fontStyle: 'italic',
        marginBottom: 10,
        lineHeight: 1.6,
    },
    noteExpl: {
        fontSize: 12,
        color: '#4a6a4a',
        lineHeight: 1.7,
    },
    nextBtn: {
        background: '#1a2a18',
        border: '1px solid #2a4028',
        color: '#70c070',
        fontSize: 13,
        padding: '10px 24px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        borderRadius: 2,
        letterSpacing: '0.06em',
        display: 'block',
    },
    doneCard: {
        textAlign: 'center',
        marginTop: 80,
    },
    doneStamp: {
        fontSize: 60,
        color: '#5a4a2a',
        marginBottom: 16,
    },
    doneTitle: {
        fontSize: 20,
        color: '#d0c080',
        marginBottom: 12,
        letterSpacing: '0.06em',
    },
    doneScore: {
        fontSize: 16,
        color: '#7a6a4a',
        fontFamily: 'monospace',
    },
}
