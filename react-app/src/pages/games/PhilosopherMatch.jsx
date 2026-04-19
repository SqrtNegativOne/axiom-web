import { useState } from "react";

const ROUNDS = [
  {
    topic: "The Nature of Mind",
    quotes: [
      {
        text: "The mind is a tabula rasa upon which experience writes its characters.",
        philosopher: "John Locke",
        tradition: "British Empiricism",
        century: "17th",
      },
      {
        text: "I think, therefore I am. But what am I? A thing that thinks.",
        philosopher: "René Descartes",
        tradition: "Continental Rationalism",
        century: "17th",
      },
      {
        text: "The unity of consciousness is nothing but the unity of the act of apperception.",
        philosopher: "Immanuel Kant",
        tradition: "German Idealism",
        century: "18th",
      },
      {
        text: "What is it like to be a bat? We cannot suppose that experience is absent in creatures so unlike us.",
        philosopher: "Thomas Nagel",
        tradition: "Analytic Philosophy",
        century: "20th",
      },
      {
        text: "The stream of thought flows on; but most of its segments fall into the bottomless abyss of oblivion.",
        philosopher: "William James",
        tradition: "American Pragmatism",
        century: "19th",
      },
    ],
  },
  {
    topic: "Truth and Knowledge",
    quotes: [
      {
        text: "Truth is subjectivity. The inward how is the truth.",
        philosopher: "Søren Kierkegaard",
        tradition: "Existentialism",
        century: "19th",
      },
      {
        text: "We can only know that we know nothing, and that is the highest degree of human wisdom.",
        philosopher: "Leo Tolstoy",
        tradition: "Literary Philosophy",
        century: "19th",
      },
      {
        text: "The whole is the true. The true is the whole.",
        philosopher: "Georg Wilhelm Friedrich Hegel",
        tradition: "German Idealism",
        century: "19th",
      },
      {
        text: "Whereof one cannot speak, thereof one must be silent.",
        philosopher: "Ludwig Wittgenstein",
        tradition: "Analytic Philosophy",
        century: "20th",
      },
      {
        text: "What is truth? Truth is not a thing; it is a process of verification.",
        philosopher: "William James",
        tradition: "American Pragmatism",
        century: "19th",
      },
    ],
  },
];

const ALL_NAMES = [...new Set(ROUNDS.flatMap((r) => r.quotes.map((q) => q.philosopher)))];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getOptions(correct, pool) {
  const others = shuffle(pool.filter((n) => n !== correct)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export default function PhilosopherMatch() {
  const [roundIdx, setRoundIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(0); // 0 = no hints, 1 = century, 2 = tradition
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(null);

  const round = ROUNDS[roundIdx];
  const quote = round.quotes[quoteIdx];
  const options = getOptions(quote.philosopher, ALL_NAMES);

  function handleGuess(name) {
    if (correct) return;
    setSelected(name);
    if (name === quote.philosopher) {
      const pts = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setScore((s) => s + pts);
      setTotal((t) => t + 3);
      setCorrect(true);
    } else {
      setShake(name);
      setTimeout(() => setShake(null), 600);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts === 1) setRevealed(1);
      else if (newAttempts === 2) setRevealed(2);
    }
  }

  function next() {
    const nextQuote = quoteIdx + 1;
    if (nextQuote >= round.quotes.length) {
      const nextRound = roundIdx + 1;
      if (nextRound >= ROUNDS.length) {
        setDone(true);
        return;
      }
      setRoundIdx(nextRound);
      setQuoteIdx(0);
    } else {
      setQuoteIdx(nextQuote);
    }
    setAttempts(0);
    setRevealed(0);
    setSelected(null);
    setCorrect(false);
  }

  const progress = (roundIdx * ROUNDS[0].quotes.length + quoteIdx + (correct ? 1 : 0)) / (ROUNDS.length * ROUNDS[0].quotes.length);

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={styles.endIcon}>✦</div>
          <div style={styles.endTitle}>Round Complete</div>
          <div style={styles.endScore}>{score} / {total}</div>
          <div style={styles.endPct}>{pct}% accuracy</div>
          <div style={styles.endLabel}>
            {pct >= 80 ? "Prodigious. Hume himself would approve." :
             pct >= 55 ? "Respectable. A few more centuries to study." :
             "The examined life requires re-examination."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <span style={styles.logo}>PHILOSOPHER MATCH</span>
        <span style={styles.scoreLabel}>{score} pts</span>
      </div>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress * 100}%` }} />
      </div>

      <div style={styles.topicTag}>Topic: {round.topic}</div>

      <div style={styles.card}>
        <div style={styles.quoteNumber}>Quote {quoteIdx + 1} of {round.quotes.length}</div>
        <div style={styles.quoteText}>"{quote.text}"</div>

        {revealed >= 1 && (
          <div style={styles.hint}>
            <span style={styles.hintLabel}>Hint — Century:</span> {quote.century} century
          </div>
        )}
        {revealed >= 2 && (
          <div style={styles.hint}>
            <span style={styles.hintLabel}>Hint — Tradition:</span> {quote.tradition}
          </div>
        )}

        {correct && (
          <div style={styles.correctBanner}>
            ✓ {quote.philosopher}
            {attempts === 0 && <span style={styles.pointsBadge}>+3</span>}
            {attempts === 1 && <span style={styles.pointsBadge}>+2</span>}
            {attempts >= 2 && <span style={styles.pointsBadge}>+1</span>}
          </div>
        )}
      </div>

      <div style={styles.options}>
        {options.map((name) => {
          let style = styles.option;
          if (correct && name === quote.philosopher) style = { ...style, ...styles.optionCorrect };
          else if (correct && name !== quote.philosopher) style = { ...style, ...styles.optionDim };
          else if (shake === name) style = { ...style, ...styles.optionWrong };
          return (
            <button
              key={name}
              style={style}
              onClick={() => handleGuess(name)}
              disabled={correct}
            >
              {name}
            </button>
          );
        })}
      </div>

      {correct && (
        <button style={styles.nextBtn} onClick={next}>
          {quoteIdx + 1 < round.quotes.length || roundIdx + 1 < ROUNDS.length ? "Next Quote →" : "See Results"}
        </button>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#F5F0E8",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px 48px",
    color: "#1a1208",
  },
  header: {
    width: "100%",
    maxWidth: 640,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    fontSize: 13,
    fontFamily: "monospace",
    letterSpacing: "0.18em",
    fontWeight: "bold",
    color: "#6b4c1e",
  },
  scoreLabel: {
    fontSize: 13,
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    color: "#6b4c1e",
  },
  progressBar: {
    width: "100%",
    maxWidth: 640,
    height: 3,
    background: "#d8cdb8",
    marginBottom: 20,
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    background: "#6b4c1e",
    borderRadius: 2,
    transition: "width 0.5s ease",
  },
  topicTag: {
    fontSize: 12,
    letterSpacing: "0.12em",
    color: "#9e7a4a",
    textTransform: "uppercase",
    marginBottom: 16,
    fontFamily: "monospace",
    alignSelf: "flex-start",
    maxWidth: 640,
    width: "100%",
  },
  card: {
    width: "100%",
    maxWidth: 640,
    background: "#fff",
    border: "1px solid #d8cdb8",
    borderRadius: 2,
    padding: "32px 32px 28px",
    marginBottom: 24,
    boxShadow: "4px 4px 0 #d8cdb8",
  },
  quoteNumber: {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#aaa",
    letterSpacing: "0.1em",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  quoteText: {
    fontSize: 20,
    lineHeight: 1.65,
    color: "#1a1208",
    fontStyle: "italic",
    marginBottom: 20,
  },
  hint: {
    fontSize: 13,
    color: "#6b4c1e",
    background: "#fdf6ea",
    border: "1px solid #e8d9bb",
    padding: "8px 14px",
    borderRadius: 2,
    marginTop: 8,
    fontFamily: "monospace",
  },
  hintLabel: {
    fontWeight: "bold",
    marginRight: 6,
  },
  correctBanner: {
    marginTop: 16,
    padding: "10px 16px",
    background: "#eaf7ea",
    border: "1px solid #b5d9b5",
    color: "#2d6e2d",
    fontSize: 15,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsBadge: {
    background: "#2d6e2d",
    color: "#fff",
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 20,
    fontFamily: "monospace",
  },
  options: {
    width: "100%",
    maxWidth: 640,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 20,
  },
  option: {
    padding: "14px 12px",
    background: "#fff",
    border: "1px solid #c8bfaf",
    borderRadius: 2,
    fontSize: 14,
    color: "#1a1208",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    textAlign: "left",
    transition: "background 0.15s, transform 0.1s",
  },
  optionCorrect: {
    background: "#eaf7ea",
    border: "1px solid #2d6e2d",
    color: "#2d6e2d",
  },
  optionWrong: {
    background: "#fdeaea",
    border: "1px solid #c0392b",
    color: "#c0392b",
  },
  optionDim: {
    opacity: 0.4,
    cursor: "default",
  },
  nextBtn: {
    padding: "14px 36px",
    background: "#1a1208",
    color: "#F5F0E8",
    border: "none",
    borderRadius: 2,
    fontSize: 14,
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    letterSpacing: "0.05em",
  },
  endIcon: {
    fontSize: 40,
    color: "#6b4c1e",
    marginBottom: 16,
    textAlign: "center",
  },
  endTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: "0.08em",
  },
  endScore: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#6b4c1e",
    textAlign: "center",
    fontFamily: "monospace",
  },
  endPct: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "monospace",
  },
  endLabel: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    maxWidth: 360,
    margin: "0 auto",
    lineHeight: 1.6,
  },
};
