import { useState, useRef } from "react";

const GRAPH = {
  "consciousness": ["mind", "qualia", "self", "perception", "intentionality"],
  "mind": ["consciousness", "reason", "body", "knowledge", "language"],
  "qualia": ["consciousness", "perception", "subjectivity", "phenomenology"],
  "self": ["consciousness", "identity", "freedom", "soul", "ego"],
  "perception": ["qualia", "experience", "knowledge", "appearance"],
  "intentionality": ["consciousness", "meaning", "language", "desire"],
  "reason": ["mind", "logic", "knowledge", "ethics", "truth"],
  "body": ["mind", "nature", "pleasure", "perception", "mortality"],
  "knowledge": ["reason", "truth", "perception", "belief", "certainty"],
  "language": ["meaning", "mind", "truth", "logic", "intentionality"],
  "identity": ["self", "persistence", "soul", "society", "change"],
  "freedom": ["self", "will", "ethics", "society", "necessity"],
  "soul": ["self", "body", "god", "identity", "mortality"],
  "ego": ["self", "desire", "pleasure", "will"],
  "subjectivity": ["qualia", "experience", "truth", "phenomenology"],
  "phenomenology": ["qualia", "subjectivity", "experience", "intentionality"],
  "experience": ["perception", "knowledge", "subjectivity", "phenomenology"],
  "logic": ["reason", "language", "truth", "necessity"],
  "ethics": ["reason", "freedom", "justice", "virtue", "duty"],
  "truth": ["knowledge", "language", "logic", "reason", "belief"],
  "meaning": ["language", "intentionality", "existence", "value"],
  "belief": ["knowledge", "truth", "certainty", "will"],
  "certainty": ["knowledge", "belief", "doubt", "truth"],
  "doubt": ["certainty", "skepticism", "knowledge"],
  "skepticism": ["doubt", "knowledge", "appearance"],
  "appearance": ["perception", "reality", "skepticism"],
  "reality": ["appearance", "existence", "nature", "god"],
  "existence": ["reality", "meaning", "being", "god", "mortality"],
  "being": ["existence", "nothing", "time", "god"],
  "nothing": ["being", "void", "death"],
  "time": ["being", "change", "mortality", "causality"],
  "change": ["time", "identity", "nature", "causality"],
  "causality": ["time", "change", "necessity", "nature"],
  "necessity": ["causality", "logic", "freedom", "god"],
  "nature": ["body", "causality", "god", "reality", "change"],
  "god": ["soul", "existence", "necessity", "nature", "being"],
  "mortality": ["body", "soul", "existence", "time"],
  "desire": ["ego", "pleasure", "will", "ethics"],
  "pleasure": ["desire", "body", "virtue", "value"],
  "will": ["freedom", "belief", "desire", "ego"],
  "virtue": ["ethics", "pleasure", "soul", "justice"],
  "justice": ["ethics", "society", "virtue", "duty"],
  "society": ["freedom", "identity", "justice", "power"],
  "power": ["society", "will", "knowledge", "value"],
  "value": ["meaning", "ethics", "pleasure", "beauty"],
  "beauty": ["value", "art", "appearance", "harmony"],
  "art": ["beauty", "meaning", "expression", "creation"],
  "expression": ["art", "language", "meaning", "emotion"],
  "emotion": ["expression", "desire", "reason", "body"],
  "duty": ["ethics", "justice", "reason", "will"],
  "creation": ["art", "god", "being", "meaning"],
  "harmony": ["beauty", "nature", "virtue", "balance"],
};

const PUZZLES = [
  {
    start: "justice",
    end: "consciousness",
    solution: ["justice", "ethics", "reason", "mind", "consciousness"],
    explanation: "Justice grounds ethics, ethics requires reason, reason is a faculty of mind, mind includes consciousness.",
  },
  {
    start: "beauty",
    end: "god",
    solution: ["beauty", "harmony", "nature", "god"],
    explanation: "Beauty implies harmony, harmony found in nature, nature leads to its creator or ground.",
  },
  {
    start: "doubt",
    end: "freedom",
    solution: ["doubt", "certainty", "knowledge", "reason", "ethics", "freedom"],
    explanation: "Doubt undermines certainty, certainty is sought through knowledge, knowledge relies on reason, reason grounds ethics, ethics requires freedom.",
  },
];

function bfs(start, end, graph) {
  if (start === end) return [start];
  const queue = [[start]];
  const visited = new Set([start]);
  while (queue.length) {
    const path = queue.shift();
    const node = path[path.length - 1];
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        const newPath = [...path, neighbor];
        if (neighbor === end) return newPath;
        visited.add(neighbor);
        queue.push(newPath);
      }
    }
  }
  return null;
}

function isConnected(a, b) {
  return GRAPH[a]?.includes(b) || GRAPH[b]?.includes(a);
}

export default function ConceptMap() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [path, setPath] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [won, setWon] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);

  const puzzle = PUZZLES[puzzleIdx];
  const optimal = bfs(puzzle.start, puzzle.end, GRAPH);
  const optimalLength = optimal ? optimal.length : 0;

  const currentConcept = path.length === 0 ? puzzle.start : path[path.length - 1];

  function handleAdd() {
    const term = input.trim().toLowerCase();
    setInput("");
    setError("");

    if (!term) return;

    if (term === puzzle.start && path.length === 0) {
      setError("That's your starting concept — type the next step.");
      return;
    }

    if (!GRAPH[term]) {
      setError(`"${term}" isn't in the concept network. Try another term.`);
      return;
    }

    if (path.includes(term)) {
      setError("You've already used that concept.");
      return;
    }

    if (!isConnected(currentConcept, term)) {
      setError(`"${term}" isn't directly connected to "${currentConcept}".`);
      return;
    }

    const newPath = [...path, term];
    setPath(newPath);

    if (term === puzzle.end) {
      setWon(true);
    }

    inputRef.current?.focus();
  }

  function handleKey(e) {
    if (e.key === "Enter") handleAdd();
  }

  function nextPuzzle() {
    const next = puzzleIdx + 1;
    if (next >= PUZZLES.length) {
      setGameOver(true);
    } else {
      setPuzzleIdx(next);
      setPath([]);
      setInput("");
      setError("");
      setWon(false);
      setShowSolution(false);
    }
  }

  const fullPath = [puzzle.start, ...path];
  const pathLen = fullPath.length;
  const score = won ? Math.max(0, optimalLength + 3 - pathLen) : 0;

  if (gameOver) {
    return (
      <div style={S.root}>
        <div style={S.endBox}>
          <div style={S.endGlyph}>◉</div>
          <div style={S.endTitle}>Network Traversed</div>
          <div style={S.endSub}>All three concept bridges crossed.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.root}>
      <div style={S.topBar}>
        <span style={S.brand}>CONCEPT MAP</span>
        <span style={S.puzzleCount}>{puzzleIdx + 1} / {PUZZLES.length}</span>
      </div>

      <div style={S.instruction}>
        Connect two philosophical concepts via the shortest possible chain of related ideas.
      </div>

      <div style={S.endpoints}>
        <div style={S.node}>
          <div style={S.nodeGlyph}>◎</div>
          <div style={S.nodeLabel}>START</div>
          <div style={S.nodeName}>{puzzle.start}</div>
        </div>
        <div style={S.arrow}>→</div>
        <div style={S.node}>
          <div style={S.nodeGlyph}>◉</div>
          <div style={S.nodeLabel}>END</div>
          <div style={S.nodeName}>{puzzle.end}</div>
        </div>
      </div>

      <div style={S.pathDisplay}>
        {fullPath.map((c, i) => (
          <span key={i} style={S.pathItem}>
            <span style={i === 0 ? S.pathStart : i === fullPath.length - 1 && won ? S.pathEnd : S.pathMid}>{c}</span>
            {i < fullPath.length - 1 && <span style={S.pathArrow}> — </span>}
          </span>
        ))}
        {!won && <span style={S.cursor}>▋</span>}
      </div>

      {!won && !showSolution && (
        <div style={S.inputRow}>
          <div style={S.fromLabel}>From <strong>{currentConcept}</strong>, go to:</div>
          <div style={S.inputWrap}>
            <input
              ref={inputRef}
              style={S.input}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
              onKeyDown={handleKey}
              placeholder="type a concept…"
              autoFocus
            />
            <button style={S.addBtn} onClick={handleAdd}>→</button>
          </div>
          {error && <div style={S.error}>{error}</div>}
        </div>
      )}

      {won && (
        <div style={S.wonBox}>
          <div style={S.wonTitle}>Path found — {pathLen - 1} step{pathLen - 2 !== 1 ? "s" : ""}</div>
          <div style={S.wonDetail}>
            Optimal: {optimalLength - 1} steps
            {pathLen === optimalLength ? " — perfect!" : pathLen <= optimalLength + 1 ? " — near-optimal." : "."}
          </div>
          {score > 0 && <div style={S.wonScore}>+{score} pts</div>}
          <button style={S.nextBtn} onClick={nextPuzzle}>
            {puzzleIdx + 1 < PUZZLES.length ? "Next Puzzle →" : "Finish"}
          </button>
        </div>
      )}

      {!won && !showSolution && path.length > optimalLength && (
        <button style={S.hintBtn} onClick={() => setShowSolution(true)}>
          Reveal optimal path
        </button>
      )}

      {showSolution && (
        <div style={S.solutionBox}>
          <div style={S.solutionLabel}>Optimal path:</div>
          <div style={S.solutionPath}>{puzzle.solution.join(" — ")}</div>
          <div style={S.solutionExp}>{puzzle.explanation}</div>
          <button style={S.nextBtn} onClick={nextPuzzle}>
            {puzzleIdx + 1 < PUZZLES.length ? "Next Puzzle →" : "Finish"}
          </button>
        </div>
      )}

      <div style={S.optimalHint}>Optimal: {optimalLength - 1} steps</div>
    </div>
  );
}

const S = {
  root: {
    minHeight: "100vh",
    background: "#0a0e1a",
    color: "#c8d8f0",
    fontFamily: "'Courier New', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "28px 16px 60px",
  },
  topBar: {
    width: "100%",
    maxWidth: 600,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  brand: {
    fontSize: 11,
    letterSpacing: "0.22em",
    color: "#4a7fc0",
    fontWeight: "bold",
  },
  puzzleCount: {
    fontSize: 11,
    color: "#456",
    letterSpacing: "0.1em",
  },
  instruction: {
    fontSize: 13,
    color: "#4a6a8a",
    maxWidth: 500,
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 36,
  },
  endpoints: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    marginBottom: 32,
  },
  node: {
    textAlign: "center",
  },
  nodeGlyph: {
    fontSize: 28,
    color: "#4a7fc0",
    marginBottom: 4,
  },
  nodeLabel: {
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "#345",
    marginBottom: 4,
  },
  nodeName: {
    fontSize: 18,
    color: "#90c0f0",
    fontWeight: "bold",
    letterSpacing: "0.05em",
  },
  arrow: {
    fontSize: 24,
    color: "#234",
  },
  pathDisplay: {
    width: "100%",
    maxWidth: 600,
    minHeight: 52,
    background: "#0f1520",
    border: "1px solid #1e2d45",
    borderRadius: 4,
    padding: "14px 18px",
    fontSize: 15,
    lineHeight: 1.8,
    marginBottom: 24,
    wordBreak: "break-word",
  },
  pathItem: {},
  pathStart: { color: "#4a7fc0" },
  pathMid: { color: "#90c0f0" },
  pathEnd: { color: "#50e090", fontWeight: "bold" },
  pathArrow: { color: "#234", margin: "0 2px" },
  cursor: { color: "#4a7fc0" },
  inputRow: {
    width: "100%",
    maxWidth: 600,
    marginBottom: 16,
  },
  fromLabel: {
    fontSize: 13,
    color: "#4a6a8a",
    marginBottom: 8,
  },
  inputWrap: {
    display: "flex",
    gap: 8,
  },
  input: {
    flex: 1,
    background: "#0f1520",
    border: "1px solid #2a4060",
    borderRadius: 3,
    color: "#90c0f0",
    fontSize: 15,
    padding: "10px 14px",
    fontFamily: "'Courier New', monospace",
    outline: "none",
  },
  addBtn: {
    background: "#1e3050",
    border: "1px solid #2a4060",
    color: "#4a7fc0",
    fontSize: 18,
    padding: "10px 18px",
    borderRadius: 3,
    cursor: "pointer",
  },
  error: {
    fontSize: 12,
    color: "#c05050",
    marginTop: 8,
    lineHeight: 1.5,
  },
  wonBox: {
    width: "100%",
    maxWidth: 600,
    background: "#0a1f14",
    border: "1px solid #2a5040",
    borderRadius: 4,
    padding: "20px 24px",
    marginBottom: 16,
  },
  wonTitle: {
    fontSize: 18,
    color: "#50e090",
    marginBottom: 6,
  },
  wonDetail: {
    fontSize: 13,
    color: "#3a8060",
    marginBottom: 12,
  },
  wonScore: {
    fontSize: 22,
    color: "#50e090",
    fontWeight: "bold",
    marginBottom: 16,
  },
  nextBtn: {
    background: "#1a3a28",
    border: "1px solid #2a5040",
    color: "#50e090",
    fontSize: 14,
    padding: "10px 24px",
    borderRadius: 3,
    cursor: "pointer",
    fontFamily: "monospace",
    letterSpacing: "0.05em",
  },
  hintBtn: {
    background: "transparent",
    border: "1px solid #2a4060",
    color: "#4a6a8a",
    fontSize: 12,
    padding: "8px 16px",
    borderRadius: 3,
    cursor: "pointer",
    fontFamily: "monospace",
    marginBottom: 16,
  },
  solutionBox: {
    width: "100%",
    maxWidth: 600,
    background: "#10141e",
    border: "1px solid #2a3050",
    borderRadius: 4,
    padding: "20px 24px",
    marginBottom: 16,
  },
  solutionLabel: {
    fontSize: 11,
    color: "#345",
    letterSpacing: "0.15em",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  solutionPath: {
    fontSize: 15,
    color: "#5090d0",
    marginBottom: 12,
    lineHeight: 1.6,
  },
  solutionExp: {
    fontSize: 13,
    color: "#4a6a8a",
    lineHeight: 1.7,
    fontStyle: "italic",
    marginBottom: 16,
  },
  optimalHint: {
    fontSize: 11,
    color: "#234",
    marginTop: 8,
    letterSpacing: "0.1em",
  },
  endBox: {
    textAlign: "center",
    marginTop: 80,
  },
  endGlyph: {
    fontSize: 48,
    color: "#4a7fc0",
    marginBottom: 16,
  },
  endTitle: {
    fontSize: 24,
    color: "#90c0f0",
    marginBottom: 8,
    letterSpacing: "0.08em",
  },
  endSub: {
    fontSize: 14,
    color: "#4a6a8a",
  },
};
