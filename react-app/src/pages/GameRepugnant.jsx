import { useState, useEffect } from "react";

// Each step: compare WorldA (current) with WorldB (proposal)
// Structure: { a: {n, w, label}, b: {n, w, label}, prompt, aReason, bReason }
// n = relative population units, w = welfare (0–100)

function World({ n, w, label, selected, onSelect, disabled }) {
  const barCount = Math.min(n, 20);
  const barWidth = Math.max(3, Math.floor(160 / barCount));
  const barH = Math.round(w * 1.2);

  return (
    <div
      onClick={disabled ? undefined : onSelect}
      style={{
        flex: 1,
        background: selected ? "#0d2b1e" : "#0a0f0d",
        border: `1.5px solid ${selected ? "#00e87a" : "#1a2e1f"}`,
        padding: "20px 18px",
        cursor: disabled ? "default" : "pointer",
        transition: "all .18s",
        position: "relative",
      }}
    >
      <p style={{ margin: "0 0 6px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: selected ? "#00e87a" : "#3a5c3f", fontFamily: "'Space Mono', monospace" }}>
        {label}
      </p>
      <div style={{ fontSize: 11, color: selected ? "#7effa8" : "#4a7a50", fontFamily: "'Space Mono', monospace", marginBottom: 14, lineHeight: 1.7 }}>
        <span>{n <= 32 ? "×" + n : "×" + n} people</span>
        <br />
        <span>welfare: {w % 1 === 0 ? w : w.toFixed(1)}</span>
        <br />
        <span style={{ color: selected ? "#3eff8a" : "#2a5c30" }}>total: {(n * w % 1 === 0 ? n * w : (n * w).toFixed(0))}</span>
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80, marginBottom: 8 }}>
        {Array.from({ length: barCount }).map((_, i) => (
          <div key={i} style={{
            width: barWidth,
            height: Math.max(2, barH),
            background: selected ? "#00e87a" : "#1d4a24",
            transition: "height .3s",
            flexShrink: 0,
          }} />
        ))}
        {n > 20 && (
          <span style={{ fontSize: 9, color: "#2a5c30", alignSelf: "center", marginLeft: 4, fontFamily: "'Space Mono', monospace" }}>
            +{n - 20} more
          </span>
        )}
      </div>
      <div style={{ height: 1, background: selected ? "#00e87a" : "#1a2e1f" }} />

      {selected && (
        <div style={{ position: "absolute", top: 10, right: 12, fontSize: 14, color: "#00e87a" }}>✓</div>
      )}
    </div>
  );
}

const STEPS = [
  {
    aLabel: "World A",
    bLabel: "World A+",
    a: { n: 10, w: 100 },
    b: { n: 20, w: 75 },
    prompt: "World A+ is World A, plus 10 additional people whose lives are worth living (welfare 75), plus a welfare boost for everyone. Is A+ at least as good as A?",
    bArgument: "More happy lives exist. Nobody is worse off. Total welfare is higher.",
    aArgument: "Average welfare falls. The original people deserve to keep their quality of life.",
  },
  {
    aLabel: "World A+",
    bLabel: "World B",
    a: { n: 20, w: 75 },
    b: { n: 20, w: 75 },
    prompt: "World B has the same 20 people and the same total welfare as A+, but distributed more equally. Is B at least as good as A+?",
    bArgument: "Equality is better. Same total welfare, same population, more fair.",
    aArgument: "(These are actually identical in population and welfare — equality is the only difference.)",
    tricky: true,
  },
  {
    aLabel: "World B",
    bLabel: "World B+",
    a: { n: 20, w: 75 },
    b: { n: 40, w: 56 },
    prompt: "World B+ adds 20 more people at welfare 56 (good lives, below average). Is B+ at least as good as B?",
    bArgument: "Again: more happy lives, nobody worse off, total utility rises.",
    aArgument: "Average welfare fell from 75 to 56. Adding lower-welfare lives drags down the mean.",
  },
  {
    aLabel: "World B+",
    bLabel: "World C",
    a: { n: 40, w: 56 },
    b: { n: 40, w: 56 },
    prompt: "World C equalises welfare across all 40 people. Is C at least as good as B+?",
    bArgument: "Same reasoning: equality is an improvement.",
    aArgument: "(Same population and total welfare — only equality changes.)",
    tricky: true,
  },
  {
    aLabel: "World C",
    bLabel: "World C+",
    a: { n: 40, w: 56 },
    b: { n: 80, w: 42 },
    prompt: "World C+ adds 40 more people with welfare 42. Their lives are worth living. Is C+ at least as good as C?",
    bArgument: "More people with lives worth living. Nobody worse off. Total utility rises again.",
    aArgument: "Average welfare now 42. Quantity is replacing quality.",
  },
  {
    aLabel: "World C+",
    bLabel: "World D",
    a: { n: 80, w: 42 },
    b: { n: 80, w: 42 },
    prompt: "World D equalises welfare again across 80 people. Is D at least as good as C+?",
    bArgument: "Equality is better. Same total welfare, same population.",
    aArgument: "",
    tricky: true,
  },
  {
    aLabel: "World D",
    bLabel: "World D+",
    a: { n: 80, w: 42 },
    b: { n: 160, w: 31 },
    prompt: "World D+ again adds lives worth living. Welfare is 31 — unpleasant in many ways, but above zero. Is D+ at least as good as D?",
    bArgument: "Every life added has positive welfare. More is better.",
    aArgument: "Welfare 31 is a grim existence: perpetual mild suffering, few joys.",
  },
  {
    aLabel: "World D+",
    bLabel: "World E",
    a: { n: 160, w: 31 },
    b: { n: 160, w: 31 },
    prompt: "World E equalises. Is E at least as good as D+?",
    bArgument: "Equality is better, as before.",
    aArgument: "",
    tricky: true,
  },
  {
    aLabel: "World E",
    bLabel: "World Z",
    a: { n: 160, w: 31 },
    b: { n: 10000, w: 1 },
    prompt: "World Z contains 10,000× more people, each at welfare 1. Their lives are barely worth living — just above the threshold of a life not worth having. Is Z at least as good as E?",
    bArgument: "Each life has positive welfare. By the logic applied at every prior step, total utility is what matters.",
    aArgument: "These lives are miserable by any ordinary standard. 'Barely worth living' is not what we owe future people.",
    final: true,
  },
];

export default function GameRepugnant() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState([]); // true = chose B (better/equal), false = chose A
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("intro"); // intro | game | conclusion

  const current = STEPS[step];

  function choose(chooseB) {
    setChoices(c => [...c, chooseB]);
    setSelected(chooseB);
  }

  function advance() {
    if (step + 1 >= STEPS.length) {
      setPhase("conclusion");
    } else {
      setStep(s => s + 1);
      setSelected(null);
    }
  }

  const BG = "#040a06";
  const SANS = "'Space Grotesk', sans-serif";
  const MONO = "'Space Mono', monospace";
  const GREEN = "#00e87a";

  if (phase === "intro") return (
    <div style={{ minHeight: "100vh", background: BG, color: "#c8e6d0", fontFamily: SANS, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <style>{`
        .start-rp { background:${GREEN}; color:#040a06; border:none; padding:14px 44px; font-family:${MONO}; font-size:13px; font-weight:700; letter-spacing:0.12em; cursor:pointer; transition:opacity .15s; }
        .start-rp:hover { opacity:0.85; }
      `}</style>
      <div style={{ maxWidth: 500, width: "100%" }}>
        <div style={{ display: "flex", gap: 1, marginBottom: 48, height: 4 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ flex: 1, background: `rgba(0,232,122,${0.1 + i * 0.045})` }} />
          ))}
        </div>
        <p style={{ fontSize: 10, letterSpacing: "0.22em", color: "#2a5c30", textTransform: "uppercase", margin: "0 0 12px", fontFamily: MONO }}>
          Population Ethics · Parfit 1984
        </p>
        <h1 style={{ fontSize: 42, fontWeight: 700, color: "#c8e6d0", margin: "0 0 28px", lineHeight: 1.1 }}>
          The Repugnant<br />Conclusion
        </h1>
        <p style={{ fontSize: 14, color: "#5a8c64", lineHeight: 1.85, margin: "0 0 16px" }}>
          You will make a series of comparisons between possible worlds. Each comparison will seem reasonable. Follow your own reasoning to its conclusion.
        </p>
        <p style={{ fontSize: 14, color: "#5a8c64", lineHeight: 1.85, margin: "0 0 44px" }}>
          This experiment has {STEPS.length} steps.
        </p>
        <button className="start-rp" onClick={() => setPhase("game")}>Begin</button>
      </div>
    </div>
  );

  if (phase === "game") return (
    <div style={{ minHeight: "100vh", background: BG, color: "#c8e6d0", fontFamily: SANS, padding: "40px 20px 80px" }}>
      <style>{`
        .next-rp { background:${GREEN}; color:#040a06; border:none; padding:12px 32px; font-family:${MONO}; font-size:12px; font-weight:700; letter-spacing:0.12em; cursor:pointer; transition:opacity .15s; }
        .next-rp:hover { opacity:0.85; }
      `}</style>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 4, marginBottom: 44 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3,
              background: i < step ? GREEN : i === step ? "#1d4a24" : "#0d1f10"
            }} />
          ))}
        </div>

        <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#2a5c30", textTransform: "uppercase", margin: "0 0 8px", fontFamily: MONO }}>
          Step {step + 1} of {STEPS.length}
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#c8e6d0", margin: "0 0 8px" }}>
          {current.aLabel} vs {current.bLabel}
        </h2>
        <p style={{ fontSize: 13, color: "#5a8c64", lineHeight: 1.85, margin: "0 0 28px" }}>
          {current.prompt}
        </p>

        {/* World comparison */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <World
            n={current.a.n}
            w={current.a.w}
            label={current.aLabel}
            selected={selected === false}
            onSelect={() => choose(false)}
            disabled={selected !== null}
          />
          <World
            n={current.b.n}
            w={current.b.w}
            label={current.bLabel}
            selected={selected === true}
            onSelect={() => choose(true)}
            disabled={selected !== null}
          />
        </div>

        {selected === null && (
          <p style={{ fontSize: 11, color: "#2a5c30", fontFamily: MONO, textAlign: "center" }}>
            Click a world to select it.
          </p>
        )}

        {selected !== null && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ background: "#0a1f0e", border: "1px solid #1a3c1f", padding: "16px 20px", marginBottom: 16 }}>
              <p style={{ margin: "0 0 8px", fontSize: 10, color: "#3a7a44", fontFamily: MONO, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Reasoning for {selected ? current.bLabel : current.aLabel}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#8ab893", lineHeight: 1.8 }}>
                {selected ? current.bArgument : current.aArgument || "You resisted the addition of lower-welfare lives."}
              </p>
            </div>
            <button className="next-rp" onClick={advance}>
              {step + 1 < STEPS.length ? "Next comparison →" : "See conclusion →"}
            </button>
          </div>
        )}

        {/* Chain so far */}
        {choices.length > 0 && (
          <div style={{ marginTop: 32, padding: "14px 18px", background: "#060e08", border: "1px solid #0d1f10" }}>
            <p style={{ margin: "0 0 8px", fontSize: 10, color: "#2a4c2f", fontFamily: MONO, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Your chain so far
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "#3a6a44", fontFamily: MONO, lineHeight: 2 }}>
              {STEPS.slice(0, choices.length).map((s, i) => (
                <span key={i} style={{ color: choices[i] ? "#4a9a5a" : "#7a3a3a" }}>
                  {choices[i] ? `${s.bLabel} ≥ ${s.aLabel}` : `${s.aLabel} > ${s.bLabel}`}
                  {i < choices.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (phase === "conclusion") {
    const chainToZ = choices.every(Boolean);
    const firstRefusal = choices.findIndex(c => !c);

    return (
      <div style={{ minHeight: "100vh", background: BG, color: "#c8e6d0", fontFamily: SANS, padding: "60px 20px 80px" }}>
        <style>{`
          .reset-rp { background:transparent; color:#3a6a44; border:1px solid #1a3c1f; padding:10px 24px; font-family:${MONO}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; transition:all .15s; }
          .reset-rp:hover { background:#1a3c1f; color:${GREEN}; }
        `}</style>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.22em", color: "#2a5c30", textTransform: "uppercase", margin: "0 0 10px", fontFamily: MONO }}>
            Conclusion
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 700, color: "#c8e6d0", margin: "0 0 32px", lineHeight: 1.2 }}>
            {chainToZ ? "You have endorsed the Repugnant Conclusion." : "You resisted — but at a cost."}
          </h2>

          {/* Full chain */}
          <div style={{ background: "#060e08", border: "1px solid #0d2010", padding: "20px 22px", marginBottom: 28 }}>
            <p style={{ margin: "0 0 12px", fontSize: 10, color: "#2a4c2f", fontFamily: MONO, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Your complete chain of endorsements
            </p>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: choices[i] ? GREEN : "#7a3a3a", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontFamily: MONO, color: choices[i] ? "#4a9a5a" : "#7a4a4a", lineHeight: 1.7 }}>
                  {choices[i]
                    ? `${s.bLabel} ≥ ${s.aLabel}  ·  ${s.b.n} people @ welfare ${s.b.w % 1 === 0 ? s.b.w : s.b.w.toFixed(1)}`
                    : `STOPPED: preferred ${s.aLabel}  ·  ${s.a.n} people @ welfare ${s.a.w}`
                  }
                </span>
              </div>
            ))}
          </div>

          {chainToZ ? (
            <>
              <div style={{ background: "#0a1f0e", border: `1.5px solid ${GREEN}`, padding: "22px 24px", marginBottom: 28 }}>
                <p style={{ margin: "0 0 12px", fontSize: 14, color: "#c8e6d0", fontWeight: 600 }}>
                  By transitivity of "at least as good as":
                </p>
                <p style={{ margin: "0 0 12px", fontSize: 16, color: GREEN, fontFamily: MONO, fontWeight: 700 }}>
                  World Z ≥ World A
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "#8ab893", lineHeight: 1.85 }}>
                  World A: 10 people at welfare 100 (flourishing).<br />
                  World Z: 10,000 people at welfare 1 (barely worth living).<br /><br />
                  Your chain of endorsements — each individually reasonable — implies the vast, miserable Z is at least as good as the small, flourishing A. This is Parfit's <strong style={{ color: "#c8e6d0" }}>Repugnant Conclusion</strong>.
                </p>
              </div>

              <p style={{ fontSize: 13, color: "#5a8c64", lineHeight: 1.85, margin: "0 0 14px" }}>
                The conclusion follows from two widely-shared intuitions: (1) adding happy lives to the world makes it better, and (2) equal welfare distributions are at least as good as unequal ones with the same total. Together, via transitivity, they force Z ≥ A.
              </p>
            </>
          ) : (
            <div style={{ background: "#0a1f0e", border: "1.5px solid #3a7a44", padding: "22px 24px", marginBottom: 28 }}>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: "#c8e6d0", fontWeight: 600 }}>
                You broke the chain at step {firstRefusal + 1}.
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#8ab893", lineHeight: 1.85 }}>
                You refused to endorse {STEPS[firstRefusal].bLabel} over {STEPS[firstRefusal].aLabel}. This blocks the Repugnant Conclusion — but it requires accepting that adding lives with positive welfare does not always improve the world. You must explain <em>why</em> the addition is bad despite each new life being worth living.
              </p>
            </div>
          )}

          {/* Responses */}
          <h3 style={{ fontSize: 11, fontFamily: MONO, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2a5c30", margin: "0 0 20px" }}>
            Proposed exits
          </h3>
          {[
            ["Reject Total Utilitarianism", "Accept that 'better' is not simply 'higher total welfare'. Average utilitarianism or critical level utilitarianism can block the conclusion — but face their own counterexamples."],
            ["Reject transitivity of 'better than'", "Larry Temkin argues the relation 'better than' need not be transitive across populations. If so, the chain doesn't close. But rejecting transitivity is a drastic revision to logic."],
            ["Person-affecting view", "A world is better only if it is better for someone. Adding new people can't make things better because there is no prior person for whom things improve. The Repugnant Conclusion is blocked — but so is the obligation to have any children at all."],
            ["Accept it", "Parfit himself could not find a satisfying exit. He called this 'the most important problem in ethics' and concluded we may simply have to accept implications we cannot stomach."],
          ].map(([name, desc]) => (
            <div key={name} style={{ borderLeft: "2px solid #1a3c1f", paddingLeft: 18, marginBottom: 20 }}>
              <strong style={{ fontSize: 13, color: "#a8d4b0", display: "block", marginBottom: 5 }}>{name}</strong>
              <p style={{ fontSize: 12, color: "#5a8c64", margin: 0, lineHeight: 1.8 }}>{desc}</p>
            </div>
          ))}

          <button className="reset-rp" onClick={() => { setStep(0); setChoices([]); setSelected(null); setPhase("game"); }}>
            Restart
          </button>
        </div>
      </div>
    );
  }

  return null;
}
