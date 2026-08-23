"use client";
import { useState, useEffect, useRef } from 'react'
import { FALLACIES, parseCaseMarkdown } from './fallacyDetective'

import therapyRaw from './cases/therapy.js'
import climateRaw from './cases/climate-denial.js'
import extremistRaw from './cases/extremist-speech.js'
import equalPayRaw from './cases/equal-pay.js'

const CASE_RAWS = [therapyRaw, climateRaw, extremistRaw, equalPayRaw]

// ── Styles (game is exempt from Axiom design system) ────────────────────────
const css = `
  /* Self-hosted fonts (latin subset) — served from /data/fonts/games/ */
  @font-face { font-family:'Playfair Display'; font-style:normal; font-weight:400; font-display:swap; src:url('/data/fonts/games/PlayfairDisplay-400.woff2') format('woff2'); }
  @font-face { font-family:'Playfair Display'; font-style:normal; font-weight:700; font-display:swap; src:url('/data/fonts/games/PlayfairDisplay-700.woff2') format('woff2'); }
  @font-face { font-family:'Playfair Display'; font-style:normal; font-weight:900; font-display:swap; src:url('/data/fonts/games/PlayfairDisplay-900.woff2') format('woff2'); }
  @font-face { font-family:'Playfair Display'; font-style:italic; font-weight:400; font-display:swap; src:url('/data/fonts/games/PlayfairDisplay-400i.woff2') format('woff2'); }
  @font-face { font-family:'Crimson Pro'; font-style:normal; font-weight:400; font-display:swap; src:url('/data/fonts/games/CrimsonPro-400.woff2') format('woff2'); }
  @font-face { font-family:'Crimson Pro'; font-style:normal; font-weight:600; font-display:swap; src:url('/data/fonts/games/CrimsonPro-600.woff2') format('woff2'); }
  @font-face { font-family:'Crimson Pro'; font-style:italic; font-weight:400; font-display:swap; src:url('/data/fonts/games/CrimsonPro-400i.woff2') format('woff2'); }
  @font-face { font-family:'Courier Prime'; font-style:normal; font-weight:400; font-display:swap; src:url('/data/fonts/games/CourierPrime-400.woff2') format('woff2'); }
  @font-face { font-family:'Courier Prime'; font-style:normal; font-weight:700; font-display:swap; src:url('/data/fonts/games/CourierPrime-700.woff2') format('woff2'); }
  @font-face { font-family:'Courier Prime'; font-style:italic; font-weight:400; font-display:swap; src:url('/data/fonts/games/CourierPrime-400i.woff2') format('woff2'); }

  .fd-root { --bg:#17140f; --panel:#1f1b14; --panel2:#261f16; --paper:#f0e8d8; --paper2:#e8deca; --ink:#1a1208; --ink2:#4a3820; --red:#b83232; --gold:#c49a28; --green:#2a6644; --border:rgba(196,154,40,0.22); --border2:rgba(196,154,40,0.12); --sel:rgba(255,215,40,0.42); --found:rgba(42,102,68,0.18); --ff-head:'Playfair Display',Georgia,serif; --ff-body:'Crimson Pro',Georgia,serif; --ff-mono:'Courier Prime','Courier New',monospace; }
  .fd-root { background: var(--bg); color: var(--paper); font-family: var(--ff-body); }

  .fd-sentence { cursor: pointer; border-radius: 2px; padding: 1px 3px; margin: 0 -3px; transition: background .12s; display: inline; }
  .fd-sentence:hover:not(.fd-found) { background: rgba(196,154,40,.16); }
  .fd-sentence.fd-selected:not(.fd-found) { background: var(--sel); }
  .fd-sentence.fd-found { background: var(--found); cursor: default; }

  .fd-flash-wrong  { animation: fdWrong  .55s ease both; }
  .fd-flash-narrow { animation: fdNarrow .55s ease both; }
  .fd-flash-correct{ animation: fdCorrect .6s ease both; }

  @keyframes fdWrong  { 0%,100%{background:var(--sel)} 40%{background:rgba(184,50,50,.38)} }
  @keyframes fdNarrow { 0%,100%{background:var(--sel)} 40%{background:rgba(220,130,30,.35)} }
  @keyframes fdCorrect{ 0%{background:var(--sel)} 100%{background:var(--found)} }

  .fd-badge { display:inline-block; font-family:var(--ff-mono); font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; color:#2a6644; background:rgba(42,102,68,.13); border:1px solid rgba(42,102,68,.38); padding:.1rem .4rem; margin-left:.4rem; vertical-align:middle; border-radius:2px; white-space:nowrap; }

  .fd-dropdown { position:absolute; top:100%; left:0; right:0; z-index:100; background:#1c170f; border:1px solid rgba(196,154,40,.28); border-top:none; max-height:180px; overflow-y:auto; }
  .fd-opt { padding:.4rem .65rem; font-family:var(--ff-mono); font-size:.7rem; color:rgba(240,232,216,.72); cursor:pointer; line-height:1.4; }
  .fd-opt:hover, .fd-opt.fd-opt-sel { background:rgba(196,154,40,.15); color:var(--paper); }

  .fd-passage { font-size:1.08rem; line-height:2.1; color:var(--ink); position:relative; }
  .fd-case-paper { background:var(--paper); color:var(--ink); padding:2rem 2.5rem; max-width:680px; margin:0 auto; box-shadow:0 6px 40px rgba(0,0,0,.55); position:relative; }
  .fd-case-paper::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:linear-gradient(90deg,#b83232,#922222); }

  .fd-clip { clip-path:polygon(0 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%); }
  .fd-clip-sm { clip-path:polygon(0 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%); }

  .fd-scrollbar::-webkit-scrollbar { width:4px; }
  .fd-scrollbar::-webkit-scrollbar-track { background:transparent; }
  .fd-scrollbar::-webkit-scrollbar-thumb { background:rgba(196,154,40,.28); border-radius:3px; }
  .fd-scrollbar::-webkit-scrollbar-thumb:hover { background:rgba(196,154,40,.5); }

  @keyframes fdFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fdPopIn  { from{opacity:0;transform:scale(.94) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
  .fd-results-panel { animation: fdPopIn .32s cubic-bezier(0.34,1.3,0.64,1) both; }
  .fd-progress-item { animation: fdFadeUp .3s ease both; }
  .fd-fade-1 { animation: fdFadeUp .55s .0s ease both; }
  .fd-fade-2 { animation: fdFadeUp .55s .1s ease both; }
  .fd-fade-3 { animation: fdFadeUp .55s .2s ease both; }
  .fd-fade-4 { animation: fdFadeUp .55s .3s ease both; }
  .fd-fade-5 { animation: fdFadeUp .55s .38s ease both; }
`

// ── Feedback bar colours ─────────────────────────────────────────────────────
const FEEDBACK_STYLES = {
    ok: {
        borderColor: '#2a6644',
        background: 'rgba(42,102,68,.15)',
        color: '#7fcf9f',
    },
    bad: {
        borderColor: '#b83232',
        background: 'rgba(184,50,50,.12)',
        color: '#e07070',
    },
    narrow: {
        borderColor: '#d4840a',
        background: 'rgba(212,132,10,.1)',
        color: '#e8a83a',
    },
    hint: {
        borderColor: '#c49a28',
        background: 'rgba(196,154,40,.1)',
        color: '#c49a28',
    },
}

export default function FallacyDetective() {
    const [roundsData] = useState(() => CASE_RAWS.map(parseCaseMarkdown))

    const [phase, setPhase] = useState('intro') // intro | game | results | final
    const [curRound, setCurRound] = useState(0)
    const [scores, setScores] = useState(() => {
        try {
            const stored = localStorage.getItem('fallacy-detective-scores')
            return stored ? JSON.parse(stored) : {}
        } catch {
            return {}
        }
    })
    const [selectedSents, setSelectedSents] = useState(new Set())
    const [foundFallacies, setFoundFallacies] = useState(new Set())
    const [selectedFallacyId, setSelectedFallacyId] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [feedback, setFeedback] = useState(null)
    const [flashMap, setFlashMap] = useState({})
    const [foundSentSet, setFoundSentSet] = useState(new Set())
    const [foundBadges, setFoundBadges] = useState({})

    // mobile ctrl panel visibility
    const [ctrlOpen, setCtrlOpen] = useState(false)

    const searchRef = useRef(null)
    const comboRef = useRef(null)

    const R = roundsData[curRound]

    // ── Combobox ──────────────────────────────────────────────────────────────
    const filteredFallacies = FALLACIES.filter((f) => {
        const q = searchQuery.toLowerCase()
        return (
            !q ||
            f.name.toLowerCase().includes(q) ||
            f.desc.toLowerCase().includes(q)
        )
    })

    const selectedFallacy = FALLACIES.find((f) => f.id === selectedFallacyId)

    function pickFallacy(f) {
        setSelectedFallacyId(f.id)
        setSearchQuery(f.name)
        setShowDropdown(false)
    }

    function clearFallacy() {
        setSelectedFallacyId('')
        setSearchQuery('')
    }

    // Close dropdown on outside click
    useEffect(() => {
        function handler(e) {
            if (comboRef.current && !comboRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // ── Helpers ───────────────────────────────────────────────────────────────
    function flash(indices, cls) {
        setFlashMap((prev) => {
            const next = { ...prev }
            indices.forEach((i) => {
                next[i] = cls
            })
            return next
        })
        setTimeout(() => {
            setFlashMap((prev) => {
                const next = { ...prev }
                indices.forEach((i) => {
                    if (next[i] === cls) delete next[i]
                })
                return next
            })
        }, 650)
    }

    function startRound(idx) {
        setCurRound(idx)
        setSelectedSents(new Set())
        setFoundFallacies(new Set())
        setFoundSentSet(new Set())
        setFoundBadges({})
        setFeedback(null)
        clearFallacy()
        setCtrlOpen(false)
    }

    // ── Sentence toggle ───────────────────────────────────────────────────────
    function toggleSentence(i) {
        if (foundSentSet.has(i)) return
        setSelectedSents((prev) => {
            const next = new Set(prev)
            if (next.has(i)) next.delete(i)
            else next.add(i)
            return next
        })
        setFeedback(null)
    }

    // ── Answer checking ───────────────────────────────────────────────────────
    function checkAnswer() {
        const selArr = [...selectedSents]
        if (!selArr.length || !selectedFallacyId) return

        const unfound = R.fallacies
            .map((f, idx) => ({ ...f, idx }))
            .filter((f) => !foundFallacies.has(f.idx))

        const hits = unfound.filter((f) =>
            f.sis.some((si) => selArr.includes(si)),
        )

        if (hits.length === 0) {
            flash(selArr, 'fd-flash-wrong')
            setFeedback({
                type: 'bad',
                msg: 'No undiscovered fallacy in that sentence. Try another.',
            })
            setTimeout(() => {
                setSelectedSents(new Set())
                setFeedback(null)
            }, 650)
            return
        }

        if (selArr.length > 1) {
            const exact = hits.find((f) =>
                selArr.every((si) => f.sis.includes(si)),
            )
            if (!exact) {
                flash(selArr, 'fd-flash-narrow')
                setFeedback({
                    type: 'narrow',
                    msg: 'Your selection spans a fallacy — narrow it to a single sentence (or the exact sentences of a multi-sentence fallacy).',
                })
                return
            }
            resolveHit([exact], selArr)
            return
        }

        resolveHit(hits, selArr)
    }

    function resolveHit(hits, selArr) {
        const target = hits.find((f) => f.fid === selectedFallacyId)
        if (!target) {
            flash(selArr, 'fd-flash-wrong')
            setFeedback({
                type: 'hint',
                msg: "That sentence does contain a fallacy — but that's not the right type. Try another.",
            })
            return
        }

        const fname =
            FALLACIES.find((f) => f.id === target.fid)?.name || target.fid

        flash(selArr, 'fd-flash-correct')

        setTimeout(() => {
            setFoundFallacies((prev) => new Set([...prev, target.idx]))
            setFoundSentSet((prev) => new Set([...prev, ...target.sis]))
            setFoundBadges((prev) => ({ ...prev, [target.sis[0]]: fname }))
            setSelectedSents(new Set())
            setFeedback({ type: 'ok', msg: `✓  ${fname} — ${target.expl}` })
            clearFallacy()
        }, 650)
    }

    // ── Finish round ──────────────────────────────────────────────────────────
    function finishRound() {
        const R_curr = roundsData[curRound]
        const count = foundFallacies.size
        const total = R_curr.fallacies.length
        const pct = total ? Math.round((count / total) * 100) : 0

        setScores((prev) => {
            const next = { ...prev, [curRound]: { found: count, total, pct } }
            try {
                localStorage.setItem('fallacy-detective-scores', JSON.stringify(next))
            } catch (e) {}
            return next
        })

        setPhase('results')
        setCtrlOpen(false)
    }

    function restartGame() {
        startRound(0)
        setPhase('intro')
    }

    // ── Derived ───────────────────────────────────────────────────────────────
    const foundCount = foundFallacies.size
    const allFound = foundCount === R.fallacies.length
    const canSubmit = selectedSents.size > 0 && !!selectedFallacyId
    const selCount = selectedSents.size
    
    const overallFound = Object.values(scores).reduce((sum, s) => sum + s.found, 0)
    const totalFallacies = roundsData.reduce(
        (s, r) => s + r.fallacies.length,
        0,
    )
    const finalPct = Math.round((overallFound / totalFallacies) * 100)

    const roundPct = R.fallacies.length
        ? Math.round((foundCount / R.fallacies.length) * 100)
        : 0

    return (
        <>
            <style>{css}</style>

            <div
                className="fd-root min-h-[calc(100vh - 64px)] font-[family:var(--ff-body)]"
                
            >
                {/* ═══ INTRO ══════════════════════════════════════════════════════════ */}
                {phase === 'intro' && (
                    <div
                        className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center p-8 bg-[radial-gradient(ellipse 80% 60% at 30% 50%]"
                        
                    >
                        <div
                            className="fd-fade-1 font-[family:var(--ff-mono)] text-[.62rem] tracking-[.3em] uppercase text-[#c49a28] border border-[#c49a28] px-3 py-1 mb-8 opacity-75"
                             
                        >
                            Logic Investigation Bureau · Est. mmxxv
                        </div>
                        <h1
                            className="fd-fade-2 font-[family:var(--ff-head)] text-[length:clamp(3rem,9vw,5.5rem)] font-black text-[#f0e8d8] leading-[0.95] tracking-[-.02em] mb-2"
                             
                        >
                            Fallacy
                            <br />
                            <em
                                className="text-[#b83232] italic" 
                            >
                                Detective
                            </em>
                        </h1>
                        <p
                            className="fd-fade-2 font-[family:var(--ff-head)] italic text-[1.05rem] text-[rgba(240,232,216,.4)] mb-8 tracking-[.06em]"
                             
                        >
                            Can you spot the flawed reasoning?
                        </p>
                        <p
                            className="fd-fade-3 max-w-[500px] text-[1rem] leading-[1.75] text-[rgba(240,232,216,.68)] mb-10"
                             
                        >
                            Select a <strong className="text-[#f0e8d8]" >case file</strong> below. They are real-world documents laced with hidden logical fallacies. Your job: find them, name them, close the case.
                        </p>

                        <div
                            className="fd-fade-4 grid gap-4 max-w-[800px] w-full mb-10 text-left"
                            
                            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
                        >
                            {roundsData.map((r, i) => {
                                const score = scores[i]
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            startRound(i)
                                            setPhase('game')
                                        }}
                                        className="bg-[var(--panel)] border border-[var(--border)] p-[1.2rem] cursor-pointer transition-colors duration-200" 
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(196,154,40,0.5)'
                                            e.currentTarget.style.background = 'var(--panel2)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border)'
                                            e.currentTarget.style.background = 'var(--panel)'
                                        }}
                                    >
                                        <div className="flex justify-between items-center mb-2" >
                                            <div className="font-[family:var(--ff-mono)] text-[.62rem] tracking-[.15em] uppercase"
                                                style={{ color: score ? (score.pct === 100 ? '#7fcf9f' : '#c49a28') : '#b83232' }}>
                                                {r.label}
                                            </div>
                                            {score && (
                                                <div className="font-[family:var(--ff-mono)] text-[.65rem] bg-[rgba(0,0,0,0.2)] px-2 py-1 rounded-[2px]"
                                                    style={{ color: score.pct === 100 ? '#7fcf9f' : 'rgba(240,232,216,.6)' }}>
                                                    {score.pct}% ({score.found}/{score.total})
                                                </div>
                                            )}
                                        </div>
                                        <div className="font-[family:var(--ff-head)] text-[1.2rem] text-[var(--paper)] mb-[.4rem] font-bold" >
                                            {r.title}
                                        </div>
                                        <div className="text-[.85rem] text-[rgba(240,232,216,.5)] leading-[1.4] italic line-clamp-2" >
                                            {r.context}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        
                        <div
                            className="fd-fade-5 flex items-center gap-4"
                             
                        >
                            <button
                                onClick={() => setPhase('final')}
                                className="font-[family:var(--ff-mono)] text-[.65rem] tracking-[.12em] uppercase text-[rgba(240,232,216,.4)] bg-transparent border border-[rgba(240,232,216,.15)] px-4 py-2 cursor-pointer" 
                            >
                                View Final Assessment →
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══ GAME ═══════════════════════════════════════════════════════════ */}
                {phase === 'game' && (
                    <div
                        className="flex flex-col h-[calc(100vh-64px)]" 
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-[1.2rem] py-[.55rem] border-b border-[var(--border)] bg-[var(--panel)] shrink-0" 
                        >
                            <span
                                className="font-[family:var(--ff-head)] text-[.95rem] font-bold text-[#c49a28] tracking-[.04em]" 
                            >
                                Fallacy Detective
                            </span>
                            <span
                                className="font-[family:var(--ff-mono)] text-[.65rem] tracking-[.18em] uppercase text-[rgba(240,232,216,.35)]" 
                            >
                                Case {curRound + 1} of {roundsData.length}
                            </span>
                            <span
                                className="font-[family:var(--ff-mono)] text-[.75rem] text-[#c49a28] tracking-[.08em]" 
                            >
                                Found: {foundFallacies.size} / {R.fallacies.length}
                            </span>
                        </div>

                        {/* Body — responsive split */}
                        <div
                            className="flex flex-1 min-h-0 overflow-hidden flex-col md-row" 
                            
                        >
                            <style>{`.md-row { flex-direction: column; } @media (min-width: 768px) { .md-row { flex-direction: row !important; } }`}</style>

                            {/* Document panel */}
                            <div
                                className="fd-scrollbar flex-1 min-w-0 overflow-y-auto px-4 py-6 bg-[var(--bg)]"
                                
                                style={{
                                    backgroundImage:
                                        'repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(196,154,40,.03) 27px,rgba(196,154,40,.03) 28px)',
                                }}
                            >
                                <div className="fd-case-paper">
                                    <div
                                        className="mb-[1.2rem] pb-[.8rem] border-b border-[var(--paper2)]" 
                                    >
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[.62rem] tracking-[.22em] uppercase text-[#b83232] mb-[.4rem]" 
                                        >
                                            {R.label}
                                        </div>
                                        <div
                                            className="font-[family:var(--ff-head)] text-[1.3rem] font-bold text-[var(--ink)] mb-1" 
                                        >
                                            {R.title}
                                        </div>
                                        <div
                                            className="text-[.9rem] italic text-[var(--ink2)]" 
                                        >
                                            {R.context}
                                        </div>
                                    </div>
                                    <div className="fd-passage">
                                        {R.sentences.map((txt, i) => {
                                            const isSelected =
                                                selectedSents.has(i)
                                            const isFound = foundSentSet.has(i)
                                            const flashCls = flashMap[i] || ''
                                            const badge = foundBadges[i]
                                            const cls = [
                                                'fd-sentence',
                                                isSelected && !isFound
                                                    ? 'fd-selected'
                                                    : '',
                                                isFound ? 'fd-found' : '',
                                                flashCls,
                                            ]
                                                .filter(Boolean)
                                                .join(' ')
                                            return (
                                                <span
                                                    key={i}
                                                    className={cls}
                                                    onClick={() =>
                                                        toggleSentence(i)
                                                    }
                                                >
                                                    {txt}{' '}
                                                    {badge && (
                                                        <span className="fd-badge">
                                                            {badge}
                                                        </span>
                                                    )}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Controls panel — desktop sidebar, mobile bottom drawer */}
                            <style>{`
                .fd-ctrl-wrap { width: 100%; flex-shrink: 0; background: var(--panel); border-top: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; }
                .fd-mobile-toggle { display: flex !important; }
                .fd-ctrl-body { display: ${ctrlOpen ? 'flex' : 'none'}; flex-direction: column; }
                @media (min-width: 768px) {
                  .fd-ctrl-wrap { width: 290px; border-top: none; border-left: 1px solid var(--border); height: 100%; }
                  .fd-mobile-toggle { display: none !important; }
                  .fd-ctrl-body { display: flex !important; flex-direction: column; flex: 1; min-height: 0; overflow-y: auto; }
                }
              `}</style>
                            <div className="fd-ctrl-wrap fd-scrollbar">
                                {/* Mobile toggle bar */}
                                <button
                                    onClick={() => setCtrlOpen((o) => !o)}
                                    className="fd-mobile-toggle"
                                    className="items-center justify-between px-4 py-[.6rem] bg-[var(--panel2)] border-none border-b border-[var(--border2)] cursor-pointer w-full font-[family:var(--ff-mono)] text-[.68rem] tracking-[.1em] text-[rgba(240,232,216,.6)] uppercase" 
                                >
                                    <span>
                                        {selCount > 0
                                            ? `${selCount} sentence${selCount > 1 ? 's' : ''} selected${selectedFallacy ? ` · ${selectedFallacy.name}` : ''}`
                                            : 'Controls'}
                                    </span>
                                    <span className="text-[#c49a28]" >
                                        {ctrlOpen ? '▲' : '▼'}
                                    </span>
                                </button>

                                <div className="fd-ctrl-body">
                                    {/* Selection status */}
                                    <div
                                        className="py-[.9rem] px-[1.1rem] border-b border-[var(--border2)]" 
                                    >
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[.58rem] tracking-[.22em] uppercase text-[#c49a28] mb-[.55rem] opacity-75" 
                                        >
                                            Selection
                                        </div>
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[.72rem] min-h-[2rem] leading-[1.55]"
                                            style={{ color: selCount > 0 ? 'rgba(240,232,216,.85)' : 'rgba(240,232,216,.4)' }}
                                        >
                                            {selCount > 0
                                                ? `${selCount} sentence${selCount > 1 ? 's' : ''} selected`
                                                : 'Click a sentence in the document to begin.'}
                                        </div>
                                    </div>

                                    {/* Fallacy picker */}
                                    <div
                                        className="py-[.9rem] px-[1.1rem] border-b border-[var(--border2)]" 
                                    >
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[.58rem] tracking-[.22em] uppercase text-[#c49a28] mb-[.6rem] opacity-75" 
                                        >
                                            Identify the Fallacy
                                        </div>
                                        <div
                                            ref={comboRef}
                                            className="relative mb-[.45rem]" 
                                        >
                                            <input
                                                ref={searchRef}
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(
                                                        e.target.value,
                                                    )
                                                    setSelectedFallacyId('')
                                                }}
                                                onFocus={() =>
                                                    setShowDropdown(true)
                                                }
                                                placeholder="Search 50+ fallacies…"
                                                autoComplete="off"
                                                spellCheck={false}
                                                className="w-full bg-[rgba(0] text-[var(--paper)] font-[family:var(--ff-mono)] text-[length:.7rem]" style={{border: 1px solid rgba(196, padding: .5rem .65rem, outline: none, appearance: none,}}
                                                onFocus2={() =>
                                                    setShowDropdown(true)
                                                }
                                            />
                                            {showDropdown &&
                                                filteredFallacies.length >
                                                    0 && (
                                                    <div className="fd-dropdown fd-scrollbar">
                                                        {filteredFallacies.map(
                                                            (f) => (
                                                                <div
                                                                    key={f.id}
                                                                    className={`fd-opt${f.id === selectedFallacyId ? ' fd-opt-sel' : ''}`}
                                                                    onMouseDown={(
                                                                        e,
                                                                    ) => {
                                                                        e.preventDefault()
                                                                        pickFallacy(
                                                                            f,
                                                                        )
                                                                    }}
                                                                >
                                                                    {f.name}
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[length:.65rem] text-[rgba(240] italic leading-[1.5] min-h-[1.8rem]"
                                        >
                                            {selectedFallacy?.desc || ''}
                                        </div>
                                        <button
                                            onClick={checkAnswer}
                                            disabled={!canSubmit}
                                            className="fd-clip-sm"
                                            style={{
                                                width: '100%',
                                                fontFamily: 'var(--ff-mono)',
                                                fontSize: '.72rem',
                                                letterSpacing: '.15em',
                                                textTransform: 'uppercase',
                                                color: '#17140f',
                                                background: '#c49a28',
                                                border: 'none',
                                                padding: '.65rem',
                                                cursor: canSubmit
                                                    ? 'pointer'
                                                    : 'not-allowed',
                                                fontWeight: 700,
                                                marginTop: '.6rem',
                                                opacity: canSubmit ? 1 : 0.28,
                                            }}
                                        >
                                            Submit Answer
                                        </button>
                                        {feedback && (
                                            <div
                                                className="mt-[.65rem] font-[family:var(--ff-mono)] text-[length:.7rem] leading-[1.55]" style={{padding: .6rem .75rem, borderLeft: 3px solid,}}
                                            >
                                                {feedback.msg}
                                            </div>
                                        )}
                                    </div>

                                    {/* Progress */}
                                    <div
                                        className="py-[.9rem] px-[1.1rem] border-b border-[var(--border2)]" 
                                    >
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[.58rem] tracking-[.22em] uppercase text-[#c49a28] mb-[.6rem] opacity-75" 
                                        >
                                            Case Progress
                                        </div>
                                        <ul
                                            className="p-0 m-0" style={{listStyle: none,}}
                                        >
                                            {R.fallacies.map((f, i) => {
                                                const done =
                                                    foundFallacies.has(i)
                                                if (!done) return null
                                                const fname =
                                                    FALLACIES.find(
                                                        (x) => x.id === f.fid,
                                                    )?.name || f.fid
                                                return (
                                                    <li
                                                        key={i}
                                                        className="fd-progress-item flex items-center gap-[.45rem] font-[family:var(--ff-mono)] text-[length:.67rem] text-[#7fcf9f]"
                                                         style={{padding: .25rem 0, borderBottom: 1px solid rgba(196,}}
                                                    >
                                                        <span
                                                            className="w-[7] h-[7] rounded-[50%] bg-[#7fcf9f] shrink-0 inline-block" style={{border: 1px solid #7fcf9f,}}
                                                        />
                                                        {fname}
                                                    </li>
                                                )
                                            })}
                                            {!allFound && (
                                                <li
                                                    className="flex items-center gap-[.45rem] font-[family:var(--ff-mono)] text-[length:.67rem] text-[rgba(240]" style={{padding: .25rem 0,}}
                                                >
                                                    <span
                                                        className="w-[7] h-[7] rounded-[50%] shrink-0 inline-block" style={{border: 1px solid rgba(240,}}
                                                    />
                                                    <span
                                                        className="italic tracking-[.08em]"
                                                    >
                                                        keep looking…
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                        {allFound && (
                                            <div
                                                className="mt-[.65rem] font-[family:var(--ff-mono)] text-[length:.68rem] tracking-[.05em] bg-[rgba(42] text-[#7fcf9f] text-center" style={{padding: .55rem .75rem, border: 1px solid rgba(42,}}
                                            >
                                                All fallacies found — close the
                                                case!
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    <div
                                        className="flex-1" style={{padding: .9rem 1.1rem,}}
                                    >
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[length:.58rem] tracking-[.22em] uppercase text-[#c49a28] mb-2 opacity-[0.75]"
                                        >
                                            Notes
                                        </div>
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[length:.64rem] leading-[1.75] text-[rgba(240]"
                                        >
                                            Click{' '}
                                            <strong
                                                className="text-[rgba(240]"
                                            >
                                                one sentence
                                            </strong>{' '}
                                            at a time.
                                            <br />
                                            Wrong type? Try again on the same
                                            sentence.
                                            <br />
                                            "Close the case" reveals what you
                                            missed.
                                        </div>
                                    </div>

                                    <button
                                        onClick={finishRound}
                                        className="font-[family:var(--ff-mono)] text-[length:.7rem] tracking-[.12em] uppercase text-[rgba(240] bg-transparent p-[.55rem] cursor-pointer" style={{margin: auto 1.1rem 1.1rem, border: 1px solid rgba(240,}}
                                    >
                                        Close This Case →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ RESULTS OVERLAY ════════════════════════════════════════════════ */}
                {phase === 'results' && (
                    <div
                        className="bg-[rgba(23] flex items-center justify-center p-[1.5rem]" style={{position: fixed, inset: 0, zIndex: 200, backdropFilter: blur(5px),}}
                    >
                        <div
                            className="fd-scrollbar fd-results-panel bg-[var(--panel2)] w-full overflow-y-auto p-8 relative"
                             style={{border: 1px solid var(--border), maxWidth: 600, maxHeight: 85vh,}}
                        >
                            <div
                                className="absolute font-[family:var(--ff-mono)] text-[length:.58rem] tracking-[.28em] text-[#b83232] opacity-[0.65]" style={{top: 1.2rem, right: 1.2rem, border: 1px solid #b83232, padding: .2rem .55rem,}}
                            >
                                Case Closed
                            </div>
                            <h2
                                className="font-[family:var(--ff-head)] text-[length:1.7rem] font-bold text-[var(--paper)] mb-[.25rem]"
                            >
                                {R.title}
                            </h2>
                            <div
                                className="font-[family:var(--ff-mono)] text-[length:.82rem] text-[#c49a28] mb-[1.75rem] tracking-[.08em]"
                            >
                                {roundPct}% — {foundCount} of{' '}
                                {R.fallacies.length} fallacies identified
                            </div>
                            <div
                                className="font-[family:var(--ff-mono)] text-[length:.58rem] tracking-[.22em] uppercase text-[rgba(240] mb-[.9rem]"
                            >
                                Fallacy Report
                            </div>
                            {R.fallacies.map((f, i) => {
                                const caught = foundFallacies.has(i)
                                const fallacy = FALLACIES.find(
                                    (x) => x.id === f.fid,
                                )
                                const sent = R.sentences[f.sis[0]]
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            marginBottom: '1.1rem',
                                            padding: '.85rem .95rem',
                                            borderLeft: `3px solid ${caught ? '#2a6644' : '#b83232'}`,
                                            background: caught
                                                ? 'rgba(42,102,68,.07)'
                                                : 'rgba(184,50,50,.07)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontFamily: 'var(--ff-mono)',
                                                fontSize: '.72rem',
                                                fontWeight: 700,
                                                letterSpacing: '.1em',
                                                textTransform: 'uppercase',
                                                color: caught
                                                    ? '#7fcf9f'
                                                    : '#e07070',
                                                marginBottom: '.3rem',
                                            }}
                                        >
                                            {caught ? '✓' : '✗'}{' '}
                                            {fallacy?.name || f.fid}
                                        </div>
                                        <div
                                            className="font-[family:var(--ff-body)] text-[length:.9rem] text-[var(--paper)] italic mb-[.3rem] leading-[1.5]"
                                        >
                                            "{sent}"
                                        </div>
                                        <div
                                            className="font-[family:var(--ff-mono)] text-[length:.64rem] text-[rgba(240] leading-[1.65]"
                                        >
                                            {f.expl}
                                        </div>
                                    </div>
                                )
                            })}
                            <div
                                className="flex gap-[.8rem] mt-[1.75rem]"
                            >
                                <button
                                    onClick={() => setPhase('intro')}
                                    className="fd-clip"
                                    className="flex-1 font-[family:var(--ff-mono)] text-[length:.74rem] tracking-[.14em] uppercase text-[#17140f] bg-[#c49a28] border-none p-[.75rem] cursor-pointer font-bold"
                                >
                                    Return to Case Files →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ FINAL ══════════════════════════════════════════════════════════ */}
                {phase === 'final' && (
                    <div
                        className="flex flex-col items-center justify-center min-h-[calc(100vh - 64px)] text-center p-8 bg-[radial-gradient(ellipse 70% 50% at 50% 50%]"
                    >
                        <div
                            className="font-[family:var(--ff-mono)] text-[length:.62rem] tracking-[.3em] uppercase text-[#c49a28] mb-[1.5rem] opacity-[0.7]" style={{border: 1px solid #c49a28, padding: .28rem .8rem,}}
                        >
                            Investigation Complete
                        </div>
                        <h1
                            className="font-[family:var(--ff-head)] text-[length:clamp(2.2rem] font-black text-[var(--paper)] leading-[0.95] mb-[.45rem]"
                        >
                            Case Files
                            <br />
                            Closed
                        </h1>
                        <p
                            className="font-[family:var(--ff-head)] italic text-[length:1rem] text-[rgba(240] mb-8"
                        >
                            Here's your final assessment, Detective.
                        </p>
                        <div
                            className="bg-[var(--panel)] mb-[1.75rem] text-center" style={{border: 1px solid var(--border), padding: 1.75rem 3.5rem,}}
                        >
                            <div
                                className="font-[family:var(--ff-head)] text-[length:4.5rem] font-black text-[#c49a28] leading-[1]"
                            >
                                {finalPct}%
                            </div>
                            <div
                                className="font-[family:var(--ff-mono)] text-[length:.68rem] tracking-[.1em] text-[rgba(240] mt-[.35rem]"
                            >
                                {overallFound} of {totalFallacies} fallacies
                                identified
                            </div>
                            <div
                                className="font-[family:var(--ff-mono)] text-[length:.58rem] tracking-[.22em] uppercase text-[rgba(240] mt-[.45rem]"
                            >
                                Detection Rate
                            </div>
                        </div>
                        <p
                            className="font-[family:var(--ff-head)] text-[length:1.25rem] italic text-[rgba(240] mb-8"
                        >
                            {finalPct === 100
                                ? '"Perfect case closure. A first-rate detective."'
                                : finalPct >= 75
                                  ? '"Sharp eyes — a few slipped through."'
                                  : finalPct >= 50
                                    ? '"A solid start. Room to sharpen the instincts."'
                                    : '"The fallacies outwitted you today. Try again."'}
                        </p>
                        <button
                            onClick={() => setPhase('intro')}
                            className="fd-clip"
                            className="font-[family:var(--ff-mono)] text-[length:.78rem] tracking-[.18em] uppercase text-[#17140f] bg-[#c49a28] border-none cursor-pointer font-bold" style={{padding: .85rem 2.5rem,}}
                        >
                            Return to Case Files
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

