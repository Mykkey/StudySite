/* Focus-friendly study layer: bite-size lessons, checkpoints, recaps, XP/streak, reading settings.
   app.js passes its helpers to Study.init(); progress lives in the same saved state object. */
(function () {
  'use strict';
  var X, state, L = null; // X = helpers from app.js, L = lesson in progress
  var GOAL = 100, PER_LEVEL = 250, STAGE = 5;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function dayKey(back) { var d = new Date(); d.setDate(d.getDate() - (back || 0)); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }

  function init(helpers) {
    X = helpers; state = X.state;
    state.xp = state.xp || 0; state.days = state.days || {}; state.pos = state.pos || {}; state.seen = state.seen || {}; state.paid = state.paid || {};
    state.prefs = state.prefs || { font: 'lexend', size: 'm', space: 'roomy' };
    applyPrefs();
  }

  /* ---------- XP, streak, toast ---------- */
  function today() { return state.days[dayKey()] || 0; }
  function streak() { var n = 0, i = state.days[dayKey()] ? 0 : 1; while (state.days[dayKey(i)]) { n++; i++; } return n; }
  function toast(msg) {
    var t = $('#toast'); if (!t) { document.body.insertAdjacentHTML('beforeend', '<div id="toast" role="status"></div>'); t = $('#toast'); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function award(id, points) {
    if (state.paid[id]) return; state.paid[id] = 1;
    var before = today(), lv = Math.floor(state.xp / PER_LEVEL);
    state.xp += points; state.days[dayKey()] = before + points; X.save();
    if (before < GOAL && before + points >= GOAL) { toast('Daily goal reached!'); confetti(); }
    else if (Math.floor(state.xp / PER_LEVEL) > lv) { toast('Level ' + (Math.floor(state.xp / PER_LEVEL) + 1) + '!'); confetti(); }
    else toast('+' + points + ' XP');
    refreshHud();
  }
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var box = document.createElement('div'); box.className = 'confetti'; box.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 60; i++) { var p = document.createElement('i'); p.style.left = Math.random() * 100 + '%'; p.style.background = 'var(--c' + (1 + i % 5) + ')'; p.style.animationDelay = Math.random() * 0.4 + 's'; p.style.animationDuration = 1.2 + Math.random() + 's'; box.appendChild(p); }
    document.body.appendChild(box); setTimeout(function () { box.remove(); }, 2800);
  }
  function ring(pc, label, size) {
    return '<span class="ring" style="--p:' + pc + ';--s:' + (size || 56) + 'px" role="img" aria-label="' + pc + '% ' + (label || '') + '"><b>' + pc + '%</b></span>';
  }
  function hudInner() {
    var week = [], max = GOAL;
    for (var i = 6; i >= 0; i--) { var v = state.days[dayKey(i)] || 0; max = Math.max(max, v); var d = new Date(); d.setDate(d.getDate() - i); week.push({ v: v, d: 'SMTWTFS'.charAt(d.getDay()) }); }
    var t = today(), pc = Math.min(100, Math.round(t / GOAL * 100));
    return '<div class="hud-item">' + ring(pc, 'of daily goal') + '<div><b>Today</b><small>' + t + ' / ' + GOAL + ' XP</small></div></div>' +
      '<div class="hud-item"><span class="big">' + streak() + '</span><div><b>Day streak</b><small>' + (state.days[dayKey()] ? 'kept today' : 'earn XP to keep it') + '</small></div></div>' +
      '<div class="hud-item"><span class="big">' + (Math.floor(state.xp / PER_LEVEL) + 1) + '</span><div><b>Level</b><small>' + (PER_LEVEL - state.xp % PER_LEVEL) + ' XP to next</small></div></div>' +
      '<div class="week" aria-label="XP over the last 7 days">' + week.map(function (w) { return '<span title="' + w.v + ' XP"><i style="height:' + Math.max(3, Math.round(w.v / max * 36)) + 'px" class="' + (w.v >= GOAL ? 'hit' : '') + '"></i><small>' + w.d + '</small></span>'; }).join('') + '</div>';
  }
  function hud() { return '<div class="hud" id="hud">' + hudInner() + '</div>'; }
  function refreshHud() { var h = $('#hud'); if (h) h.innerHTML = hudInner(); }

  /* ---------- reading settings ---------- */
  var PREFS = {
    font: { title: 'Font', opts: [['lexend', 'Lexend'], ['atkinson', 'Atkinson Hyperlegible'], ['system', 'System']] },
    size: { title: 'Text size', opts: [['s', 'Small'], ['m', 'Medium'], ['l', 'Large']] },
    space: { title: 'Spacing', opts: [['normal', 'Normal'], ['roomy', 'Roomy'], ['wide', 'Extra wide']] }
  };
  function applyPrefs() { Object.keys(PREFS).forEach(function (k) { document.documentElement.setAttribute('data-' + k, state.prefs[k]); }); }
  function settings() {
    var old = $('#prefs'); if (old) { old.remove(); return; }
    var h = '<div class="overlay" id="prefs"><div class="card"><h2 style="margin-top:0">Reading settings</h2>';
    Object.keys(PREFS).forEach(function (k) { h += '<h3>' + PREFS[k].title + '</h3><div class="toolbar">' + PREFS[k].opts.map(function (o) { return '<button data-pref="' + k + '" data-val="' + o[0] + '" aria-pressed="' + (state.prefs[k] === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div>'; });
    h += '<p class="stat">The quick brown fox jumps over the lazy dog. 0123456789</p><button class="primary" id="closeprefs">Done</button></div></div>';
    document.body.insertAdjacentHTML('beforeend', h);
    $$('#prefs [data-pref]').forEach(function (b) { b.onclick = function () { state.prefs[b.dataset.pref] = b.dataset.val; X.save(); applyPrefs(); $$('#prefs [data-pref="' + b.dataset.pref + '"]').forEach(function (o) { o.setAttribute('aria-pressed', o === b); }); }; });
    $('#closeprefs').onclick = function () { $('#prefs').remove(); };
  }

  /* ---------- chunking a topic into screens ---------- */
  function words(it) {
    if (typeof it === 'string') return it.split(/\s+/).length;
    if (it.rows) return it.rows.join(' ').split(/[\s,]+/).length;
    return String(it.text || '').split(/\s+/).length + (it.type === 'diagram' ? 20 : 0);
  }
  function chunkSection(s) {
    var out = [], cur = [], w = 0;
    function flush() { if (cur.length) out.push(cur); cur = []; w = 0; }
    (s.items || []).forEach(function (it) {
      var n = words(it), big = it && (it.type === 'table' || it.type === 'diagram' || it.type === 'code');
      if (big) { if (w > 25) flush(); cur.push(it); flush(); return; }
      /* a "p" item introduces what follows: start a screen with it and never leave it stranded at the bottom */
      if (it && it.type === 'p' && w > 25) flush();
      if (cur.length && (cur.length >= 5 || w + n > 70)) {
        var last = cur[cur.length - 1], carry = cur.length > 1 && last && last.type === 'p';
        if (carry) cur.pop();
        flush();
        if (carry) { cur.push(last); w = words(last); }
      }
      cur.push(it); w += n;
    });
    flush();
    return out;
  }
  function icon(heading) {
    var h = heading.toLowerCase();
    var map = [[/worked|example|case|scenario/, '🧪'], [/formula|calculat|metric|measure|maths/, '🧮'], [/vs|versus|compar|trade/, '⚖️'], [/advantage|benefit|strength/, '👍'], [/limit|risk|issue|problem|pitfall|weakness|caution|challenge/, '⚠️'], [/exam|answer|model|template|how to/, '🎯'], [/step|process|build|algorithm|how|workflow|resol/, '🪜'], [/what|defin|concept|idea|why|purpose/, '💡']];
    for (var i = 0; i < map.length; i++) if (map[i][0].test(h)) return map[i][1];
    return '📌';
  }
  function visualHtml(t) { return t.visual ? '<div class="bigpic"><span class="tag">Big picture</span>' + window.Diagrams.render(t.visual.kind, t.visual.data || {}, t.visual.caption) + '</div>' : ''; }

  function buildSteps(M, t) {
    var body = [];
    (t.sections || []).forEach(function (s) {
      var parts = chunkSection(s);
      parts.forEach(function (items, i) { body.push({ type: 'read', heading: s.heading, part: i + 1, of: parts.length, items: items }); });
    });
    var cards = (M.flashcards || []).filter(function (c) { return c.topicId === t.id; });
    var checks = Math.min(Math.floor(body.length / 3), Math.ceil(cards.length / 2));
    if (!checks && cards.length) checks = 1;
    var steps = [{ type: 'intro' }], every = checks ? Math.ceil(body.length / checks) : 0, used = 0, done = 0;
    body.forEach(function (b, i) {
      steps.push(b);
      if (checks && ((i + 1) % every === 0 || i === body.length - 1) && done < checks && used < cards.length) {
        done++;
        steps.push({ type: 'check', n: done, cards: cards.slice(used, used + 2) }); used += 2;
      }
    });
    if (t.pitfalls && t.pitfalls.length) steps.push({ type: 'traps' });
    steps.push({ type: 'recap' });
    steps.forEach(function (s) { if (s.type === 'check') s.of = done; });
    return steps;
  }
  function minutes(M, t) {
    var w = 0; (t.sections || []).forEach(function (s) { (s.items || []).forEach(function (i) { w += words(i); }); });
    return Math.max(2, Math.round(w / 160));
  }

  /* ---------- lesson player ---------- */
  function ordered(M) { return (M.topics || []).slice().sort(function (a, b) { return (a.tier === 'low') - (b.tier === 'low') || a.priority - b.priority; }); }
  function nextTopic(code, M, afterId) {
    var ts = ordered(M), from = afterId ? ts.map(function (t) { return t.id; }).indexOf(afterId) + 1 : 0;
    return ts.slice(from).concat(ts.slice(0, from)).filter(function (t) { return !state.done[code + ':' + t.id] && t.id !== afterId; })[0];
  }
  function lesson(topicId) {
    var t = (X.M().topics || []).filter(function (x) { return x.id === topicId; })[0];
    if (!t) { X.go('topics'); return; }
    var steps = buildSteps(X.M(), t), key = X.code() + ':' + t.id;
    var i = state.pos[key] || 0; if (i >= steps.length - 1) i = 0;
    L = { t: t, steps: steps, key: key, i: i, shown: 0, rated: {} };
    render();
  }
  function minsLeft() { var n = 0; for (var i = L.i; i < L.steps.length; i++) n += L.steps[i].type === 'read' ? 25 : 15; return Math.max(1, Math.round(n / 60)); }

  function render() {
    var t = L.t, s = L.steps[L.i], n = L.steps.length, h = '';
    h += '<div class="lesson"><div class="lesson-top"><button class="sm" data-act="exit">✕ Exit</button><span class="lesson-title">' + X.esc(t.title) + '</span><span class="stat">' + (s.type === 'recap' ? 'done' : '~' + minsLeft() + ' min left') + '</span></div>';
    h += '<div class="segs" role="progressbar" aria-valuemin="1" aria-valuemax="' + n + '" aria-valuenow="' + (L.i + 1) + '">' + L.steps.map(function (x, k) { return '<i class="' + (k < L.i ? 'past' : k === L.i ? 'now' : '') + (x.type === 'check' ? ' cp' : '') + '"></i>'; }).join('') + '</div>';
    h += '<p class="stat center">Step ' + (L.i + 1) + ' of ' + n + '</p><div class="screen ' + s.type + '">';
    if (s.type === 'intro') {
      h += '<h2>🚀 ' + X.esc(t.title) + '</h2>';
      if (t.summary) h += '<p class="gist">' + X.fmt(t.summary) + '</p>';
      if (t.mnemonic) h += '<div class="callout hook">🧠 Memory hook: ' + X.fmt(t.mnemonic) + '</div>';
      h += visualHtml(t);
      var heads = (t.sections || []).map(function (x) { return x.heading; });
      h += '<p><b>You will cover ' + heads.length + ' things:</b></p><ol class="roadmap">' + heads.map(function (x) { return '<li>' + X.fmt(x) + '</li>'; }).join('') + '</ol>';
    } else if (s.type === 'read') {
      h += '<h2>' + icon(s.heading) + ' ' + X.fmt(s.heading) + (s.of > 1 ? ' <span class="badge">' + s.part + ' of ' + s.of + '</span>' : '') + '</h2>' + X.renderItems(s.items);
    } else if (s.type === 'check') {
      h += '<h2>🚩 Checkpoint ' + s.n + ' of ' + s.of + '</h2><p class="stat">Answer out loud or in your head, then reveal.</p>';
      s.cards.forEach(function (c, k) {
        if (k > L.shown) return;
        var r = L.rated[c.id];
        h += '<div class="quiz"><p class="q">' + X.fmt(c.front) + '</p>';
        if (!r && !L['open_' + c.id]) h += '<button class="primary" data-act="reveal" data-id="' + X.esc(c.id) + '">Show answer <span class="kbd">Space</span></button>';
        else {
          h += '<div class="answer">' + X.fmt(c.back) + (c.hook ? '<br><small>Hook: ' + X.fmt(c.hook) + '</small>' : '') + '</div>';
          h += r ? '<p class="stat">' + (r === 'know' ? '✅ Got it' : '🔁 Saved for review') + '</p>' : '<div class="actions"><button class="bad" data-act="rate" data-v="learn" data-id="' + X.esc(c.id) + '">Not yet <span class="kbd">1</span></button><button class="good" data-act="rate" data-v="know" data-id="' + X.esc(c.id) + '">Got it <span class="kbd">2</span></button></div>';
        }
        h += '</div>';
      });
    } else if (s.type === 'traps') {
      h += '<h2>⚠️ Where marks get lost</h2><div class="traps">' + t.pitfalls.map(function (p) { return '<div class="callout warn">' + X.fmt(p) + '</div>'; }).join('') + '</div>';
    } else {
      var ids = Object.keys(L.rated), good = ids.filter(function (id) { return L.rated[id] === 'know'; }).length;
      var cards = (X.M().flashcards || []).filter(function (c) { return c.topicId === t.id; }), nx = nextTopic(X.code(), X.M(), t.id), st = X.stats(X.code());
      h += '<h2>🏁 Recap</h2>';
      if (ids.length) h += '<div class="score">' + ring(Math.round(good / ids.length * 100), 'checkpoint score', 84) + '<p>You got <b>' + good + ' of ' + ids.length + '</b> checkpoint questions.</p></div>';
      if (t.summary) h += '<p class="gist">' + X.fmt(t.summary) + '</p>';
      if (t.mnemonic) h += '<div class="callout hook">🧠 ' + X.fmt(t.mnemonic) + '</div>';
      h += '<p><b>Say one thing about each, from memory:</b></p><ul class="ticks">' + (t.sections || []).map(function (x) { return '<li>' + X.fmt(x.heading) + '</li>'; }).join('') + '</ul>';
      h += '<p class="stat">Module: ' + st.done + ' of ' + st.topics + ' topics complete</p><div class="bar"><i style="width:' + Math.round(st.done / st.topics * 100) + '%"></i></div>';
      h += '<div class="actions">' + (cards.length ? '<button data-act="drill">Drill ' + cards.length + ' flashcards</button>' : '') + '<button data-act="again">Read again</button>' + (nx ? '<button class="primary" data-act="next-topic" data-id="' + X.esc(nx.id) + '">Next: ' + X.esc(nx.title) + ' →</button>' : '') + '</div>';
      if (st.done && st.done % STAGE === 0) h += '<div class="callout">☕ ' + st.done + ' topics done. Good moment for a 5-minute break: stand up, get water.</div>';
    }
    h += '</div>';
    if (s.type !== 'recap') h += '<div class="lesson-nav"><button data-act="back"' + (L.i ? '' : ' disabled') + '>Back <span class="kbd">←</span></button><button class="primary big" data-act="next">' + (s.type === 'intro' ? 'Start' : s.type === 'check' ? 'Carry on' : 'Got it, next') + ' <span class="kbd">→</span></button></div>';
    h += '</div>';
    var v = $('#view'); v.innerHTML = h;
    $$('[data-act]', v).forEach(function (b) { b.onclick = function () { act(b.dataset.act, b.dataset); }; });
  }

  function show() { render(); window.scrollTo(0, 0); }
  function move(d) {
    var s = L.steps[L.i];
    if (d > 0 && s.type !== 'check') award('s:' + L.key + ':' + L.i, 5);
    L.i = Math.max(0, Math.min(L.steps.length - 1, L.i + d)); L.shown = 0;
    state.pos[L.key] = L.i; X.save();
    if (L.steps[L.i].type === 'recap') finish();
    show();
  }
  function finish() {
    var first = !state.done[L.key];
    X.markDone(L.t.id);
    delete state.pos[L.key]; X.save();
    award('t:' + L.key, 50);
    if (first) confetti();
  }
  function rate(id, v) {
    L.rated[id] = v; state.cards[X.code() + ':' + id] = v; X.save();
    award('c:' + X.code() + ':' + id, 10);
    L.shown++; render();
  }
  function act(a, d) {
    if (a === 'exit') X.go('topics');
    else if (a === 'back') move(-1);
    else if (a === 'next') move(1);
    else if (a === 'reveal') { L['open_' + d.id] = true; render(); }
    else if (a === 'rate') rate(d.id, d.v);
    else if (a === 'again') { L.i = 0; L.shown = 0; L.rated = {}; show(); }
    else if (a === 'drill') X.drill(L.t.id);
    else if (a === 'next-topic') { location.hash = '#learn/' + d.id; }
  }
  /* returns true when the key was used */
  function key(e) {
    if (!L) return false;
    var k = e.key, s = L.steps[L.i], onButton = e.target && e.target.tagName === 'BUTTON';
    if (onButton && (k === ' ' || k === 'Enter')) return true;
    var card = s.type === 'check' ? s.cards.filter(function (c) { return !L.rated[c.id]; })[0] : null;
    if (k === 'ArrowLeft') { if (L.i) move(-1); return true; }
    if (k === 'ArrowRight') { if (s.type !== 'recap') move(1); return true; }
    if (k === ' ' || k === 'Enter') {
      e.preventDefault();
      if (card && !L['open_' + card.id]) act('reveal', { id: card.id });
      else if (!card && s.type !== 'recap') move(1);
      return true;
    }
    if ((k === '1' || k === '2') && card && L['open_' + card.id]) { rate(card.id, k === '2' ? 'know' : 'learn'); return true; }
    return /^[1-6]$/.test(k);
  }
  function leave() { L = null; }

  window.Study = {
    init: init, hud: hud, ring: ring, settings: settings, award: award, toast: toast, confetti: confetti,
    lesson: lesson, key: key, leave: leave, nextTopic: nextTopic, minutes: minutes, visualHtml: visualHtml, STAGE: STAGE
  };
})();
