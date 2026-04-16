// game.js — Parser, game logic, UI

// ══════════════════════════════════════════════════════
//  MARKDOWN PARSER
//  Parses CriticMarkup-annotated case files into game data.
//
//  Format:
//    ---
//    id: ...
//    label: ...
//    title: ...
//    context: ...
//    ---
//
//    Plain sentence.
//    {==Fallacy sentence.==}{>>fallacy_id | Explanation text.<<}
//    {==First sentence of a multi-sentence fallacy,==}
//    {==Second sentence — the comment closes the group.==}{>>fallacy_id | Explanation.<<}
// ══════════════════════════════════════════════════════

function parseCaseMarkdown(text) {
  // 1. Extract YAML-style frontmatter
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const meta = {};
  if (fmMatch) {
    fmMatch[1].split(/\r?\n/).forEach(line => {
      const colon = line.indexOf(':');
      if (colon === -1) return;
      meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    });
    text = text.slice(fmMatch[0].length);
  }

  const sentences = [];
  const fallacies  = [];
  let   pendingSis = []; // sentence indices accumulated for current fallacy group

  // 2. Process line by line (each non-blank line = one sentence)
  const lines = text.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    // Does this line contain a highlight block?
    const hlRe    = /^\{==([\s\S]*?)==\}(.*)$/;
    const hlMatch = line.match(hlRe);

    if (hlMatch) {
      const sentenceText = hlMatch[1];
      const remainder    = hlMatch[2].trim(); // may be empty or contain {>>...<<}

      const si = sentences.length;
      sentences.push(sentenceText);
      pendingSis.push(si);

      // Does the remainder contain a comment that closes this group?
      const cmMatch = remainder.match(/^\{>>([\s\S]*?)<<\}$/);
      if (cmMatch) {
        const sep  = cmMatch[1].indexOf('|');
        const fid  = cmMatch[1].slice(0, sep).trim();
        const expl = cmMatch[1].slice(sep + 1).trim();
        fallacies.push({ sis: [...pendingSis], fid, expl });
        pendingSis = [];
      }
      // If no comment: line is the first/middle of a multi-sentence fallacy — keep accumulating.

    } else {
      // Plain sentence — flush any orphaned pending group (shouldn't happen in valid markup)
      if (pendingSis.length > 0) pendingSis = [];
      sentences.push(line);
    }
  }

  return {
    id:       meta.id       || 'unknown',
    label:    meta.label    || 'Case File',
    title:    meta.title    || 'Untitled',
    context:  meta.context  || '',
    sentences,
    fallacies,
  };
}

// ══════════════════════════════════════════════════════
//  ASYNC LOADER
// ══════════════════════════════════════════════════════

async function loadAllCases() {
  const results = await Promise.all(
    CASE_FILES.map(path =>
      fetch(path)
        .then(r => {
          if (!r.ok) throw new Error(`Failed to load ${path}: ${r.status}`);
          return r.text();
        })
        .then(parseCaseMarkdown)
    )
  );
  return results;
}

// ══════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════

let ROUNDS           = [];   // loaded from .md files
let curRound         = 0;
let selectedSents    = new Set();  // sentence indices currently highlighted
let foundFallacies   = new Set();  // indices into ROUNDS[curRound].fallacies
let totalFound       = 0;
let selectedFallacyId = '';

// ══════════════════════════════════════════════════════
//  ENTRY POINT
// ══════════════════════════════════════════════════════

async function startGame() {
  const btn = document.querySelector('.btn-go');
  btn.textContent = 'Loading cases…';
  btn.disabled = true;

  try {
    ROUNDS = await loadAllCases();
  } catch (err) {
    btn.textContent = 'Open First Case File →';
    btn.disabled = false;
    alert(`Could not load case files.\n\nMake sure you are serving this folder from a local web server (e.g. "npx serve ." or "python -m http.server").\n\nError: ${err.message}`);
    return;
  }

  document.getElementById('intro').style.display = 'none';
  document.getElementById('game').style.display  = 'flex';
  buildCombobox();
  loadRound(0);
}

// ══════════════════════════════════════════════════════
//  COMBOBOX (searchable fallacy picker)
// ══════════════════════════════════════════════════════

function buildCombobox() {
  const input = document.getElementById('f-search');
  const dd    = document.getElementById('f-dropdown');

  input.addEventListener('input', () => {
    selectedFallacyId = '';
    document.getElementById('f-desc').textContent = '';
    updateCheckBtn();
    renderDropdown(input.value);
  });

  input.addEventListener('focus', () => renderDropdown(input.value));

  // Close dropdown when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('#f-combo')) dd.style.display = 'none';
  });

  renderDropdown('');
}

function renderDropdown(query) {
  const dd = document.getElementById('f-dropdown');
  const q  = query.toLowerCase();
  const matches = FALLACIES.filter(f =>
    !q || f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)
  );

  dd.innerHTML = '';
  matches.forEach(f => {
    const div = document.createElement('div');
    div.className = 'f-opt' + (f.id === selectedFallacyId ? ' selected' : '');
    div.textContent = f.name;
    // mousedown fires before blur, preventing input from losing focus before we read the click
    div.addEventListener('mousedown', e => {
      e.preventDefault();
      selectFallacy(f);
    });
    dd.appendChild(div);
  });

  dd.style.display = matches.length ? 'block' : 'none';
}

function selectFallacy(f) {
  selectedFallacyId = f.id;
  document.getElementById('f-search').value       = f.name;
  document.getElementById('f-desc').textContent   = f.desc;
  document.getElementById('f-dropdown').style.display = 'none';
  updateCheckBtn();
}

function clearFallacySelection() {
  selectedFallacyId = '';
  document.getElementById('f-search').value     = '';
  document.getElementById('f-desc').textContent = '';
  updateCheckBtn();
}

// ══════════════════════════════════════════════════════
//  ROUND MANAGEMENT
// ══════════════════════════════════════════════════════

function loadRound(idx) {
  curRound = idx;
  selectedSents.clear();
  foundFallacies.clear();

  const R = ROUNDS[idx];
  document.getElementById('g-case-id').textContent = `Case ${idx + 1} of ${ROUNDS.length}`;
  document.getElementById('g-score').textContent   = `Found: ${totalFound}`;
  document.getElementById('c-label').textContent   = R.label;
  document.getElementById('c-title').textContent   = R.title;
  document.getElementById('c-ctx').textContent     = R.context;

  // Build passage
  const passageEl = document.getElementById('passage');
  passageEl.innerHTML = '';
  R.sentences.forEach((txt, i) => {
    const span = document.createElement('span');
    span.className   = 'sentence';
    span.dataset.i   = i;
    span.textContent = txt + ' ';
    span.addEventListener('click', () => toggleSentence(i));
    passageEl.appendChild(span);
  });

  updateProgress();
  resetControls();
}

function resetControls() {
  document.getElementById('sel-status').textContent = 'Click a sentence in the document to begin.';
  document.getElementById('sel-status').className  = 'sel-status';
  clearFallacySelection();
  document.getElementById('btn-check').disabled = true;
  hideFeedback();
  document.getElementById('found-all').style.display = 'none';
}

// ══════════════════════════════════════════════════════
//  SENTENCE SELECTION
// ══════════════════════════════════════════════════════

function toggleSentence(i) {
  const span = getSpan(i);
  if (selectedSents.has(i)) {
    selectedSents.delete(i);
    span.classList.remove('selected');
  } else {
    selectedSents.add(i);
    span.classList.add('selected');
  }
  updateSelStatus();
  updateCheckBtn();
}

function updateSelStatus() {
  const el = document.getElementById('sel-status');
  if (selectedSents.size === 0) {
    el.textContent = 'Click a sentence in the document to begin.';
    el.className   = 'sel-status';
  } else {
    const n = selectedSents.size;
    el.textContent = `${n} sentence${n > 1 ? 's' : ''} selected`;
    el.className   = 'sel-status active';
  }
}

function updateCheckBtn() {
  document.getElementById('btn-check').disabled =
    !(selectedSents.size > 0 && selectedFallacyId);
}

function updateProgress() {
  const R  = ROUNDS[curRound];
  const ul = document.getElementById('prog-list');
  ul.innerHTML = '';

  let doneCount = 0;
  R.fallacies.forEach((f, i) => {
    if (!foundFallacies.has(i)) return;
    doneCount++;
    const li   = document.createElement('li');
    li.className = 'prog-item done';
    const fname = FALLACIES.find(x => x.id === f.fid)?.name || f.fid;
    li.innerHTML = `<span class="prog-dot"></span><span>${fname}</span>`;
    ul.appendChild(li);
  });

  // "Keep looking" hint — never reveal the total count during play
  if (doneCount < R.fallacies.length) {
    const li = document.createElement('li');
    li.className = 'prog-item';
    li.innerHTML = `<span class="prog-dot"></span><span class="prog-hint">keep looking…</span>`;
    ul.appendChild(li);
  }

  if (doneCount === R.fallacies.length) {
    document.getElementById('found-all').style.display = 'block';
  }
}

// ══════════════════════════════════════════════════════
//  ANSWER CHECKING
// ══════════════════════════════════════════════════════

function checkAnswer() {
  const selArr = [...selectedSents];
  if (!selArr.length || !selectedFallacyId) return;

  const R = ROUNDS[curRound];

  // Unfound fallacies that overlap with at least one selected sentence
  const unfound = R.fallacies
    .map((f, idx) => ({ ...f, idx }))
    .filter(f => !foundFallacies.has(f.idx));

  const hits = unfound.filter(f => f.sis.some(si => selArr.includes(si)));

  // ── No fallacy in selection ──
  if (hits.length === 0) {
    flashSpans(selArr, 'flash-wrong');
    showFeedback('bad', 'No undiscovered fallacy in that sentence. Try another.');
    setTimeout(clearSelection, 650);
    return;
  }

  // ── Multiple sentences selected ──
  if (selArr.length > 1) {
    // Valid only if all selected sentences belong to a single fallacy's sis
    const exact = hits.find(f => selArr.every(si => f.sis.includes(si)));
    if (!exact) {
      flashSpans(selArr, 'flash-narrow');
      showFeedback('narrow', 'Your selection spans a fallacy — narrow it to a single sentence (or the exact sentences of a multi-sentence fallacy).');
      return;
    }
    // Proceed treating 'exact' as the sole hit candidate
    resolveHit([exact], selArr);
    return;
  }

  // ── Single sentence selected ──
  resolveHit(hits, selArr);
}

function resolveHit(hits, selArr) {
  const target = hits.find(f => f.fid === selectedFallacyId);

  if (!target) {
    flashSpans(selArr, 'flash-wrong');
    showFeedback('hint', 'That sentence does contain a fallacy — but that\'s not the right type. Try another.');
    return;
  }

  // ── Correct ──
  const fname = FALLACIES.find(f => f.id === target.fid)?.name || target.fid;
  foundFallacies.add(target.idx);
  totalFound++;

  // Flash then lock the primary (selected) sentence; softly mark the others
  target.sis.forEach(si => {
    const span = getSpan(si);
    if (!span) return;
    span.classList.remove('selected');
    if (selArr.includes(si)) {
      span.classList.add('flash-correct');
      setTimeout(() => {
        span.classList.remove('flash-correct');
        span.classList.add('found');
      }, 640);
    } else {
      // Secondary sentence in a multi-sentence fallacy
      setTimeout(() => span.classList.add('found'), 640);
    }
  });

  // Badge on the first sentence of the fallacy
  setTimeout(() => {
    const anchor = getSpan(target.sis[0]);
    if (anchor) {
      const badge = document.createElement('span');
      badge.className   = 'f-badge';
      badge.textContent = fname;
      anchor.appendChild(badge);
    }
  }, 660);

  selectedSents.clear();
  updateSelStatus();
  clearFallacySelection();
  updateProgress();
  document.getElementById('g-score').textContent = `Found: ${totalFound}`;
  showFeedback('ok', `✓  ${fname} — ${target.expl}`);
}

// ══════════════════════════════════════════════════════
//  FINISH ROUND → RESULTS OVERLAY
// ══════════════════════════════════════════════════════

function finishRound() {
  const R          = ROUNDS[curRound];
  const foundCount = foundFallacies.size;
  const total      = R.fallacies.length;
  const pct        = Math.round((foundCount / total) * 100);

  document.getElementById('r-title').textContent = R.title;
  document.getElementById('r-score').textContent =
    `${pct}% — ${foundCount} of ${total} fallacies identified`;

  const list = document.getElementById('r-list');
  list.innerHTML = '';
  R.fallacies.forEach((f, i) => {
    const caught  = foundFallacies.has(i);
    const fallacy = FALLACIES.find(x => x.id === f.fid);
    const primarySent = R.sentences[f.sis[0]];
    const div = document.createElement('div');
    div.className = `r-item ${caught ? 'caught' : 'missed'}`;
    div.innerHTML = `
      <div class="r-item-name">${caught ? '✓' : '✗'} ${fallacy ? fallacy.name : f.fid}</div>
      <div class="r-item-sent">"${primarySent}"</div>
      <div class="r-item-expl">${f.expl}</div>
    `;
    list.appendChild(div);
  });

  const isLast = curRound >= ROUNDS.length - 1;
  document.getElementById('btn-next').textContent = isLast ? 'View Final Results →' : 'Next Case →';
  document.getElementById('results-overlay').style.display = 'flex';
}

function nextRound() {
  document.getElementById('results-overlay').style.display = 'none';
  if (curRound >= ROUNDS.length - 1) {
    showFinal();
  } else {
    loadRound(curRound + 1);
  }
}

// ══════════════════════════════════════════════════════
//  FINAL SCREEN
// ══════════════════════════════════════════════════════

function showFinal() {
  document.getElementById('game').style.display  = 'none';
  document.getElementById('final').style.display = 'flex';

  const totalFallacies = ROUNDS.reduce((s, r) => s + r.fallacies.length, 0);
  const pct = Math.round((totalFound / totalFallacies) * 100);

  document.getElementById('fin-pct').textContent       = `${pct}%`;
  document.getElementById('fin-raw').textContent       = `${totalFound} of ${totalFallacies} fallacies identified`;
  document.getElementById('fin-grade').textContent     =
    pct === 100 ? '"Perfect case closure. A first-rate detective."'
    : pct >= 75  ? '"Sharp eyes — a few slipped through."'
    : pct >= 50  ? '"A solid start. Room to sharpen the instincts."'
    :              '"The fallacies outwitted you today. Try again."';
}

function restartGame() {
  totalFound = 0;
  curRound   = 0;
  document.getElementById('final').style.display = 'none';
  document.getElementById('intro').style.display = 'flex';
}

// ══════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════

function getSpan(i) {
  return document.querySelector(`.sentence[data-i="${i}"]`);
}

function flashSpans(arr, cls) {
  arr.forEach(i => {
    const s = getSpan(i);
    if (!s) return;
    s.classList.remove('flash-wrong', 'flash-narrow', 'flash-correct');
    void s.offsetWidth; // force reflow so the animation restarts
    s.classList.add(cls);
    setTimeout(() => s.classList.remove(cls), 620);
  });
}

function clearSelection() {
  selectedSents.forEach(i => getSpan(i)?.classList.remove('selected'));
  selectedSents.clear();
  updateSelStatus();
  updateCheckBtn();
}

function showFeedback(type, msg) {
  const fb = document.getElementById('feedback');
  fb.className       = `feedback ${type}`;
  fb.textContent     = msg;
  fb.style.display   = 'block';
}

function hideFeedback() {
  document.getElementById('feedback').style.display = 'none';
}
