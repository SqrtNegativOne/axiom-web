import { useState, useEffect, useRef, useCallback } from 'react'
import { FALLACIES, parseCaseMarkdown } from '../../data/fallacyDetective'

import therapyRaw from '../../data/cases/therapy.md?raw'
import climateRaw from '../../data/cases/climate-denial.md?raw'
import extremistRaw from '../../data/cases/extremist-speech.md?raw'
import equalPayRaw from '../../data/cases/equal-pay.md?raw'

const CASE_RAWS = [therapyRaw, climateRaw, extremistRaw, equalPayRaw]

// ── Styles (game is exempt from Axiom design system) ────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

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
  .fd-fade-1 { animation: fdFadeUp .55s .0s ease both; }
  .fd-fade-2 { animation: fdFadeUp .55s .1s ease both; }
  .fd-fade-3 { animation: fdFadeUp .55s .2s ease both; }
  .fd-fade-4 { animation: fdFadeUp .55s .3s ease both; }
  .fd-fade-5 { animation: fdFadeUp .55s .38s ease both; }
`

// ── Feedback bar colours ─────────────────────────────────────────────────────
const FEEDBACK_STYLES = {
  ok:     { borderColor:'#2a6644', background:'rgba(42,102,68,.15)', color:'#7fcf9f' },
  bad:    { borderColor:'#b83232', background:'rgba(184,50,50,.12)', color:'#e07070' },
  narrow: { borderColor:'#d4840a', background:'rgba(212,132,10,.1)', color:'#e8a83a' },
  hint:   { borderColor:'#c49a28', background:'rgba(196,154,40,.1)', color:'#c49a28' },
}

export default function FallacyDetective() {
  const rounds = useRef(CASE_RAWS.map(parseCaseMarkdown))

  const [phase, setPhase]           = useState('intro')    // intro | game | results | final
  const [curRound, setCurRound]     = useState(0)
  const [selectedSents, setSelectedSents] = useState(new Set())
  const [foundFallacies, setFoundFallacies] = useState(new Set())
  const [totalFound, setTotalFound] = useState(0)
  const [selectedFallacyId, setSelectedFallacyId] = useState('')
  const [searchQuery, setSearchQuery]   = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [feedback, setFeedback]     = useState(null)
  const [flashMap, setFlashMap]     = useState({})
  const [foundSentSet, setFoundSentSet] = useState(new Set())
  const [foundBadges, setFoundBadges]   = useState({})

  // mobile ctrl panel visibility
  const [ctrlOpen, setCtrlOpen] = useState(false)

  const searchRef  = useRef(null)
  const comboRef   = useRef(null)

  const R = rounds.current[curRound]

  // ── Combobox ──────────────────────────────────────────────────────────────
  const filteredFallacies = FALLACIES.filter(f => {
    const q = searchQuery.toLowerCase()
    return !q || f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)
  })

  const selectedFallacy = FALLACIES.find(f => f.id === selectedFallacyId)

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
    setFlashMap(prev => {
      const next = { ...prev }
      indices.forEach(i => { next[i] = cls })
      return next
    })
    setTimeout(() => {
      setFlashMap(prev => {
        const next = { ...prev }
        indices.forEach(i => { if (next[i] === cls) delete next[i] })
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
    setSelectedSents(prev => {
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
      .filter(f => !foundFallacies.has(f.idx))

    const hits = unfound.filter(f => f.sis.some(si => selArr.includes(si)))

    if (hits.length === 0) {
      flash(selArr, 'fd-flash-wrong')
      setFeedback({ type: 'bad', msg: 'No undiscovered fallacy in that sentence. Try another.' })
      setTimeout(() => {
        setSelectedSents(new Set())
        setFeedback(null)
      }, 650)
      return
    }

    if (selArr.length > 1) {
      const exact = hits.find(f => selArr.every(si => f.sis.includes(si)))
      if (!exact) {
        flash(selArr, 'fd-flash-narrow')
        setFeedback({ type: 'narrow', msg: 'Your selection spans a fallacy — narrow it to a single sentence (or the exact sentences of a multi-sentence fallacy).' })
        return
      }
      resolveHit([exact], selArr)
      return
    }

    resolveHit(hits, selArr)
  }

  function resolveHit(hits, selArr) {
    const target = hits.find(f => f.fid === selectedFallacyId)
    if (!target) {
      flash(selArr, 'fd-flash-wrong')
      setFeedback({ type: 'hint', msg: "That sentence does contain a fallacy — but that's not the right type. Try another." })
      return
    }

    const fname = FALLACIES.find(f => f.id === target.fid)?.name || target.fid

    flash(selArr, 'fd-flash-correct')

    setTimeout(() => {
      setFoundFallacies(prev => new Set([...prev, target.idx]))
      setFoundSentSet(prev => new Set([...prev, ...target.sis]))
      setFoundBadges(prev => ({ ...prev, [target.sis[0]]: fname }))
      setTotalFound(n => n + 1)
      setSelectedSents(new Set())
      setFeedback({ type: 'ok', msg: `✓  ${fname} — ${target.expl}` })
      clearFallacy()
    }, 650)
  }

  // ── Finish round ──────────────────────────────────────────────────────────
  function finishRound() {
    setPhase('results')
    setCtrlOpen(false)
  }

  function nextRound() {
    if (curRound >= rounds.current.length - 1) {
      setPhase('final')
    } else {
      startRound(curRound + 1)
      setPhase('game')
    }
  }

  function restartGame() {
    setTotalFound(0)
    startRound(0)
    setPhase('intro')
  }

  // ── Derived ───────────────────────────────────────────────────────────────
  const foundCount   = foundFallacies.size
  const allFound     = foundCount === R.fallacies.length
  const canSubmit    = selectedSents.size > 0 && !!selectedFallacyId
  const selCount     = selectedSents.size
  const totalFallacies = rounds.current.reduce((s, r) => s + r.fallacies.length, 0)
  const finalPct     = Math.round((totalFound / totalFallacies) * 100)

  const roundPct     = R.fallacies.length
    ? Math.round((foundCount / R.fallacies.length) * 100)
    : 0

  return (
    <>
      <style>{css}</style>

      <div className="fd-root" style={{ minHeight:'calc(100vh - 64px)', fontFamily:"var(--ff-body)" }}>

        {/* ═══ INTRO ══════════════════════════════════════════════════════════ */}
        {phase === 'intro' && (
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            minHeight:'calc(100vh - 64px)', textAlign:'center', padding:'2rem',
            background:'radial-gradient(ellipse 80% 60% at 30% 50%,rgba(196,154,40,.06) 0%,transparent 70%), radial-gradient(ellipse 60% 80% at 75% 55%,rgba(184,50,50,.05) 0%,transparent 70%), #17140f',
          }}>
            <div className="fd-fade-1" style={{ fontFamily:"var(--ff-mono)", fontSize:'.62rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#c49a28', border:'1px solid #c49a28', padding:'.28rem .8rem', marginBottom:'2rem', opacity:.75 }}>
              Logic Investigation Bureau · Est. mmxxv
            </div>
            <h1 className="fd-fade-2" style={{ fontFamily:"var(--ff-head)", fontSize:'clamp(3rem,9vw,5.5rem)', fontWeight:900, color:'#f0e8d8', lineHeight:.95, letterSpacing:'-.02em', marginBottom:'.5rem' }}>
              Fallacy<br /><em style={{ color:'#b83232', fontStyle:'italic' }}>Detective</em>
            </h1>
            <p className="fd-fade-2" style={{ fontFamily:"var(--ff-head)", fontStyle:'italic', fontSize:'1.05rem', color:'rgba(240,232,216,.4)', marginBottom:'2rem', letterSpacing:'.06em' }}>
              Can you spot the flawed reasoning?
            </p>
            <p className="fd-fade-3" style={{ maxWidth:500, fontSize:'1rem', lineHeight:1.75, color:'rgba(240,232,216,.68)', marginBottom:'2.5rem' }}>
              You'll receive a series of <strong style={{ color:'#f0e8d8' }}>case files</strong> — real-world documents laced with hidden logical fallacies.
              The number of fallacies in each document is unknown. Your job: find them, name them, close the case.
            </p>
            <div className="fd-fade-4" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem 1.2rem', maxWidth:460, marginBottom:'2.5rem', textAlign:'left' }}>
              {[
                ['01','Click a sentence you suspect contains a fallacy'],
                ['02','Search for and select the fallacy type'],
                ['03','Submit — get immediate feedback'],
                ['04','Close the case when ready — you may miss some'],
              ].map(([n, t]) => (
                <div key={n} style={{ display:'flex', alignItems:'flex-start', gap:'.5rem', fontFamily:"var(--ff-mono)", fontSize:'.68rem', lineHeight:1.55, color:'rgba(240,232,216,.52)' }}>
                  <span style={{ color:'#c49a28', fontWeight:700, flexShrink:0 }}>{n}</span>
                  {t}
                </div>
              ))}
            </div>
            <button
              className="fd-clip fd-fade-5"
              onClick={() => { startRound(0); setPhase('game') }}
              style={{ fontFamily:"var(--ff-mono)", fontSize:'.78rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#17140f', background:'#c49a28', border:'none', padding:'.85rem 2.5rem', cursor:'pointer', fontWeight:700 }}
            >
              Open First Case File →
            </button>
          </div>
        )}

        {/* ═══ GAME ═══════════════════════════════════════════════════════════ */}
        {phase === 'game' && (
          <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 64px)' }}>

            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'.55rem 1.2rem', borderBottom:'1px solid var(--border)', background:'var(--panel)', flexShrink:0 }}>
              <span style={{ fontFamily:"var(--ff-head)", fontSize:'.95rem', fontWeight:700, color:'#c49a28', letterSpacing:'.04em' }}>Fallacy Detective</span>
              <span style={{ fontFamily:"var(--ff-mono)", fontSize:'.65rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,232,216,.35)' }}>
                Case {curRound + 1} of {rounds.current.length}
              </span>
              <span style={{ fontFamily:"var(--ff-mono)", fontSize:'.75rem', color:'#c49a28', letterSpacing:'.08em' }}>
                Found: {totalFound}
              </span>
            </div>

            {/* Body — responsive split */}
            <div style={{ display:'flex', flex:1, minHeight:0, overflow:'hidden', flexDirection:'column' }} className="md-row">
              <style>{`.md-row { flex-direction: column; } @media (min-width: 768px) { .md-row { flex-direction: row !important; } }`}</style>

              {/* Document panel */}
              <div className="fd-scrollbar" style={{ flex:1, minWidth:0, overflowY:'auto', padding:'1.5rem 1rem', background:'var(--bg)', backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(196,154,40,.03) 27px,rgba(196,154,40,.03) 28px)' }}>
                <div className="fd-case-paper">
                  <div style={{ marginBottom:'1.2rem', paddingBottom:'.8rem', borderBottom:'1px solid var(--paper2)' }}>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.62rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#b83232', marginBottom:'.4rem' }}>{R.label}</div>
                    <div style={{ fontFamily:"var(--ff-head)", fontSize:'1.3rem', fontWeight:700, color:'var(--ink)', marginBottom:'.25rem' }}>{R.title}</div>
                    <div style={{ fontSize:'.9rem', fontStyle:'italic', color:'var(--ink2)' }}>{R.context}</div>
                  </div>
                  <div className="fd-passage">
                    {R.sentences.map((txt, i) => {
                      const isSelected = selectedSents.has(i)
                      const isFound    = foundSentSet.has(i)
                      const flashCls   = flashMap[i] || ''
                      const badge      = foundBadges[i]
                      const cls        = ['fd-sentence', isSelected && !isFound ? 'fd-selected' : '', isFound ? 'fd-found' : '', flashCls].filter(Boolean).join(' ')
                      return (
                        <span key={i} className={cls} onClick={() => toggleSentence(i)}>
                          {txt}{' '}
                          {badge && <span className="fd-badge">{badge}</span>}
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
                  onClick={() => setCtrlOpen(o => !o)}
                  className="fd-mobile-toggle"
                  style={{
                    alignItems:'center', justifyContent:'space-between',
                    padding:'.6rem 1rem', background:'var(--panel2)', border:'none',
                    borderBottom:'1px solid var(--border2)', cursor:'pointer', width:'100%',
                    fontFamily:"var(--ff-mono)", fontSize:'.68rem', letterSpacing:'.1em',
                    color:'rgba(240,232,216,.6)', textTransform:'uppercase',
                  }}
                >
                  <span>
                    {selCount > 0
                      ? `${selCount} sentence${selCount > 1 ? 's' : ''} selected${selectedFallacy ? ` · ${selectedFallacy.name}` : ''}`
                      : 'Controls'}
                  </span>
                  <span style={{ color:'#c49a28' }}>{ctrlOpen ? '▲' : '▼'}</span>
                </button>

                <div className="fd-ctrl-body">
                  {/* Selection status */}
                  <div style={{ padding:'.9rem 1.1rem', borderBottom:'1px solid var(--border2)' }}>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#c49a28', marginBottom:'.55rem', opacity:.75 }}>Selection</div>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.72rem', color: selCount > 0 ? 'rgba(240,232,216,.85)' : 'rgba(240,232,216,.4)', minHeight:'2rem', lineHeight:1.55 }}>
                      {selCount > 0 ? `${selCount} sentence${selCount > 1 ? 's' : ''} selected` : 'Click a sentence in the document to begin.'}
                    </div>
                  </div>

                  {/* Fallacy picker */}
                  <div style={{ padding:'.9rem 1.1rem', borderBottom:'1px solid var(--border2)' }}>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#c49a28', marginBottom:'.6rem', opacity:.75 }}>Identify the Fallacy</div>
                    <div ref={comboRef} style={{ position:'relative', marginBottom:'.45rem' }}>
                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); setSelectedFallacyId(''); }}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Search 50+ fallacies…"
                        autoComplete="off"
                        spellCheck={false}
                        style={{ width:'100%', background:'rgba(0,0,0,.35)', color:'var(--paper)', border:'1px solid rgba(196,154,40,.22)', padding:'.5rem .65rem', fontFamily:"var(--ff-mono)", fontSize:'.7rem', outline:'none', appearance:'none' }}
                        onFocus2={() => setShowDropdown(true)}
                      />
                      {showDropdown && filteredFallacies.length > 0 && (
                        <div className="fd-dropdown fd-scrollbar">
                          {filteredFallacies.map(f => (
                            <div
                              key={f.id}
                              className={`fd-opt${f.id === selectedFallacyId ? ' fd-opt-sel' : ''}`}
                              onMouseDown={e => { e.preventDefault(); pickFallacy(f) }}
                            >
                              {f.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.65rem', color:'rgba(240,232,216,.38)', fontStyle:'italic', lineHeight:1.5, minHeight:'1.8rem' }}>
                      {selectedFallacy?.desc || ''}
                    </div>
                    <button
                      onClick={checkAnswer}
                      disabled={!canSubmit}
                      className="fd-clip-sm"
                      style={{ width:'100%', fontFamily:"var(--ff-mono)", fontSize:'.72rem', letterSpacing:'.15em', textTransform:'uppercase', color:'#17140f', background:'#c49a28', border:'none', padding:'.65rem', cursor: canSubmit ? 'pointer' : 'not-allowed', fontWeight:700, marginTop:'.6rem', opacity: canSubmit ? 1 : .28 }}
                    >
                      Submit Answer
                    </button>
                    {feedback && (
                      <div style={{ marginTop:'.65rem', padding:'.6rem .75rem', fontFamily:"var(--ff-mono)", fontSize:'.7rem', lineHeight:1.55, borderLeft:'3px solid', ...FEEDBACK_STYLES[feedback.type] }}>
                        {feedback.msg}
                      </div>
                    )}
                  </div>

                  {/* Progress */}
                  <div style={{ padding:'.9rem 1.1rem', borderBottom:'1px solid var(--border2)' }}>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#c49a28', marginBottom:'.6rem', opacity:.75 }}>Case Progress</div>
                    <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                      {R.fallacies.map((f, i) => {
                        const done = foundFallacies.has(i)
                        if (!done) return null
                        const fname = FALLACIES.find(x => x.id === f.fid)?.name || f.fid
                        return (
                          <li key={i} style={{ display:'flex', alignItems:'center', gap:'.45rem', fontFamily:"var(--ff-mono)", fontSize:'.67rem', color:'#7fcf9f', padding:'.25rem 0', borderBottom:'1px solid rgba(196,154,40,.07)' }}>
                            <span style={{ width:7, height:7, borderRadius:'50%', background:'#7fcf9f', border:'1px solid #7fcf9f', flexShrink:0, display:'inline-block' }} />
                            {fname}
                          </li>
                        )
                      })}
                      {!allFound && (
                        <li style={{ display:'flex', alignItems:'center', gap:'.45rem', fontFamily:"var(--ff-mono)", fontSize:'.67rem', color:'rgba(240,232,216,.35)', padding:'.25rem 0' }}>
                          <span style={{ width:7, height:7, borderRadius:'50%', border:'1px solid rgba(240,232,216,.22)', flexShrink:0, display:'inline-block' }} />
                          <span style={{ fontStyle:'italic', letterSpacing:'.08em' }}>keep looking…</span>
                        </li>
                      )}
                    </ul>
                    {allFound && (
                      <div style={{ marginTop:'.65rem', padding:'.55rem .75rem', fontFamily:"var(--ff-mono)", fontSize:'.68rem', letterSpacing:'.05em', background:'rgba(42,102,68,.2)', border:'1px solid rgba(42,102,68,.4)', color:'#7fcf9f', textAlign:'center' }}>
                        All fallacies found — close the case!
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div style={{ padding:'.9rem 1.1rem', flex:1 }}>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#c49a28', marginBottom:'.5rem', opacity:.75 }}>Notes</div>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.64rem', lineHeight:1.75, color:'rgba(240,232,216,.33)' }}>
                      Click <strong style={{ color:'rgba(240,232,216,.52)' }}>one sentence</strong> at a time.<br />
                      Wrong type? Try again on the same sentence.<br />
                      "Close the case" reveals what you missed.
                    </div>
                  </div>

                  <button
                    onClick={finishRound}
                    style={{ margin:'auto 1.1rem 1.1rem', fontFamily:"var(--ff-mono)", fontSize:'.7rem', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(240,232,216,.52)', background:'transparent', border:'1px solid rgba(240,232,216,.18)', padding:'.55rem', cursor:'pointer' }}
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
          <div style={{ position:'fixed', inset:0, background:'rgba(23,20,15,.9)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem', backdropFilter:'blur(5px)' }}>
            <div className="fd-scrollbar" style={{ background:'var(--panel2)', border:'1px solid var(--border)', maxWidth:600, width:'100%', maxHeight:'85vh', overflowY:'auto', padding:'2rem', position:'relative' }}>
              <div style={{ position:'absolute', top:'1.2rem', right:'1.2rem', fontFamily:"var(--ff-mono)", fontSize:'.58rem', letterSpacing:'.28em', color:'#b83232', border:'1px solid #b83232', padding:'.2rem .55rem', opacity:.65 }}>Case Closed</div>
              <h2 style={{ fontFamily:"var(--ff-head)", fontSize:'1.7rem', fontWeight:700, color:'var(--paper)', marginBottom:'.25rem' }}>{R.title}</h2>
              <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.82rem', color:'#c49a28', marginBottom:'1.75rem', letterSpacing:'.08em' }}>
                {roundPct}% — {foundCount} of {R.fallacies.length} fallacies identified
              </div>
              <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(240,232,216,.28)', marginBottom:'.9rem' }}>Fallacy Report</div>
              {R.fallacies.map((f, i) => {
                const caught  = foundFallacies.has(i)
                const fallacy = FALLACIES.find(x => x.id === f.fid)
                const sent    = R.sentences[f.sis[0]]
                return (
                  <div key={i} style={{ marginBottom:'1.1rem', padding:'.85rem .95rem', borderLeft:`3px solid ${caught ? '#2a6644' : '#b83232'}`, background: caught ? 'rgba(42,102,68,.07)' : 'rgba(184,50,50,.07)' }}>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.72rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color: caught ? '#7fcf9f' : '#e07070', marginBottom:'.3rem' }}>
                      {caught ? '✓' : '✗'} {fallacy?.name || f.fid}
                    </div>
                    <div style={{ fontFamily:"var(--ff-body)", fontSize:'.9rem', color:'var(--paper)', fontStyle:'italic', marginBottom:'.3rem', lineHeight:1.5 }}>"{sent}"</div>
                    <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.64rem', color:'rgba(240,232,216,.45)', lineHeight:1.65 }}>{f.expl}</div>
                  </div>
                )
              })}
              <div style={{ display:'flex', gap:'.8rem', marginTop:'1.75rem' }}>
                <button
                  onClick={nextRound}
                  className="fd-clip"
                  style={{ flex:1, fontFamily:"var(--ff-mono)", fontSize:'.74rem', letterSpacing:'.14em', textTransform:'uppercase', color:'#17140f', background:'#c49a28', border:'none', padding:'.75rem', cursor:'pointer', fontWeight:700 }}
                >
                  {curRound >= rounds.current.length - 1 ? 'View Final Results →' : 'Next Case →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ FINAL ══════════════════════════════════════════════════════════ */}
        {phase === 'final' && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'calc(100vh - 64px)', textAlign:'center', padding:'2rem', background:'radial-gradient(ellipse 70% 50% at 50% 50%,rgba(196,154,40,.07) 0%,transparent 70%),#17140f' }}>
            <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.62rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#c49a28', border:'1px solid #c49a28', padding:'.28rem .8rem', marginBottom:'1.5rem', opacity:.7 }}>Investigation Complete</div>
            <h1 style={{ fontFamily:"var(--ff-head)", fontSize:'clamp(2.2rem,7vw,4.5rem)', fontWeight:900, color:'var(--paper)', lineHeight:.95, marginBottom:'.45rem' }}>Case Files<br />Closed</h1>
            <p style={{ fontFamily:"var(--ff-head)", fontStyle:'italic', fontSize:'1rem', color:'rgba(240,232,216,.38)', marginBottom:'2rem' }}>Here's your final assessment, Detective.</p>
            <div style={{ background:'var(--panel)', border:'1px solid var(--border)', padding:'1.75rem 3.5rem', marginBottom:'1.75rem', textAlign:'center' }}>
              <div style={{ fontFamily:"var(--ff-head)", fontSize:'4.5rem', fontWeight:900, color:'#c49a28', lineHeight:1 }}>{finalPct}%</div>
              <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.68rem', letterSpacing:'.1em', color:'rgba(240,232,216,.38)', marginTop:'.35rem' }}>{totalFound} of {totalFallacies} fallacies identified</div>
              <div style={{ fontFamily:"var(--ff-mono)", fontSize:'.58rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(240,232,216,.22)', marginTop:'.45rem' }}>Detection Rate</div>
            </div>
            <p style={{ fontFamily:"var(--ff-head)", fontSize:'1.25rem', fontStyle:'italic', color:'rgba(240,232,216,.65)', marginBottom:'2rem' }}>
              {finalPct === 100 ? '"Perfect case closure. A first-rate detective."'
               : finalPct >= 75 ? '"Sharp eyes — a few slipped through."'
               : finalPct >= 50 ? '"A solid start. Room to sharpen the instincts."'
               :                  '"The fallacies outwitted you today. Try again."'}
            </p>
            <button
              onClick={restartGame}
              className="fd-clip"
              style={{ fontFamily:"var(--ff-mono)", fontSize:'.78rem', letterSpacing:'.18em', textTransform:'uppercase', color:'#17140f', background:'#c49a28', border:'none', padding:'.85rem 2.5rem', cursor:'pointer', fontWeight:700 }}
            >
              Reopen All Cases
            </button>
          </div>
        )}
      </div>
    </>
  )
}
