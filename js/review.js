/* Spaced review: cards you miss come back soon, cards you know come back later.
   state.srs["CODE:cardId"] = { box: 0..4, due: day number }. Loads in the browser and in node (for tests). */
(function (root) {
  'use strict';
  var GAP = [0, 1, 3, 7, 14], SIZE = 10;
  function dayNum(d) { d = d || new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  /* "2027-01-15" from a date input */
  function dayOf(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 864e5) : null; }

  function rate(state, key, v, today) {
    today = today == null ? dayNum() : today;
    state.srs = state.srs || {};
    var old = state.srs[key], box = v === 'know' ? Math.min(GAP.length - 1, (old ? old.box : 0) + 1) : 0;
    var due = today + GAP[box], exam = dayOf((state.exams || {})[key.split(':')[0]]);
    if (exam != null && exam >= today) due = Math.min(due, Math.max(today, exam - 1));   /* see it again before the exam */
    state.srs[key] = { box: box, due: due };
  }
  /* marks made before spaced review existed are due straight away */
  function migrate(state, today) {
    today = today == null ? dayNum() : today;
    state.srs = state.srs || {};
    Object.keys(state.cards || {}).forEach(function (k) { if (!state.srs[k]) state.srs[k] = { box: state.cards[k] === 'know' ? 2 : 0, due: today }; });
  }
  function interleave(lists) {
    var out = [], i = 0, more = true;
    while (more) { more = false; lists.forEach(function (l) { if (i < l.length) { out.push(l[i]); more = true; } }); i++; }
    return out;
  }
  /* due cards (most overdue first), then unseen cards from topics already completed; mixed across modules */
  function pool(state, mods, today) {
    today = today == null ? dayNum() : today;
    var due = [], fresh = [];
    Object.keys(mods).forEach(function (code) {
      var exam = dayOf((state.exams || {})[code]); if (exam != null && exam < today) return;
      var d = [], f = [];
      (mods[code].flashcards || []).forEach(function (c) {
        var key = code + ':' + c.id, s = (state.srs || {})[key], item = { key: key, code: code, card: c };
        if (s) { if (s.due <= today) { item.s = s; d.push(item); } }
        else if ((state.done || {})[code + ':' + c.topicId]) f.push(item);
      });
      d.sort(function (a, b) { return a.s.due - b.s.due || a.s.box - b.s.box; });
      due.push(d); fresh.push(f);
    });
    return { due: interleave(due), fresh: interleave(fresh) };
  }
  function session(state, mods, today) { var p = pool(state, mods, today); return p.due.concat(p.fresh).slice(0, SIZE); }

  /* ---------- screen ---------- */
  var H, R = null;   /* H = helpers from app.js, R = session in progress */
  function start() { migrate(H.state); H.save(); R = { q: session(H.state, H.mods), i: 0, flipped: false, good: 0, seen: 0, again: {} }; }
  function view(helpers) { H = helpers; start(); render(); }
  function render() {
    var h = '<p><a href="#">&larr; Home</a></p><h1>Mixed review</h1>';
    if (!R.q.length) h += '<div class="card"><p>Nothing to review right now. Finish a lesson or rate some flashcards, and they will turn up here.</p></div>';
    else if (R.i >= R.q.length) {
      var left = session(H.state, H.mods).length;
      h += '<div class="card"><h2 style="margin-top:0">🏁 Set done</h2><p>You knew <b>' + R.good + ' of ' + R.seen + '</b>.</p><p class="stat">Cards you missed will come back soon.</p><div class="actions"><a class="btn" href="#">Done for now</a>' + (left ? '<button class="primary" id="rvmore">' + left + ' more</button>' : '') + '</div></div>';
    } else {
      var it = R.q[R.i], c = it.card;
      h += '<div class="bar"><i style="width:' + Math.round(R.i / R.q.length * 100) + '%"></i></div><p class="stat" style="text-align:center">Card ' + (R.i + 1) + ' of ' + R.q.length + ' &middot; ' + it.code + '</p>';
      h += '<div class="fc' + (R.flipped ? ' flipped' : '') + '" id="fc"><div class="fc-inner"><div class="fc-face front"><span class="tag">Question</span>' + H.fmt(c.front) + '<small>click or press Space to flip</small></div><div class="fc-face back"><span class="tag">Answer</span><div>' + H.fmt(c.back) + '</div>' + (c.hook ? '<small>Hook: ' + H.fmt(c.hook) + '</small>' : '') + '</div></div></div>';
      h += '<div class="actions"><button class="bad" id="rvlearn">Not yet <span class="kbd">1</span></button><button class="good" id="rvknow">I know it <span class="kbd">2</span></button></div>';
    }
    H.app.innerHTML = h;
    var on = function (id, fn) { var el = H.app.querySelector(id); if (el) el.onclick = fn; };
    on('#fc', flip); on('#rvlearn', function () { answer('learn'); }); on('#rvknow', function () { answer('know'); });
    on('#rvmore', function () { start(); render(); });
  }
  function flip() { R.flipped = !R.flipped; var f = H.app.querySelector('#fc'); if (f) f.classList.toggle('flipped', R.flipped); }
  function answer(v) {
    var it = R.q[R.i]; if (!it) return;
    rate(H.state, it.key, v); H.state.cards[it.key] = v; H.save();
    H.award('r:' + it.key + ':' + dayNum(), 10);
    if (!R.again[it.key]) { R.seen++; if (v === 'know') R.good++; }
    if (v === 'learn' && !R.again[it.key]) { R.again[it.key] = 1; R.q.push(it); }   /* once more before the set ends */
    R.i++; R.flipped = false; render();
    if (R.i >= R.q.length && R.good === R.seen) H.confetti();
  }
  function key(e) {
    if (!R || R.i >= R.q.length) return false;
    if (e.key === ' ' || e.key === 'Enter') { if (e.target && e.target.tagName === 'BUTTON') return true; e.preventDefault(); flip(); return true; }
    if (e.key === '1' || e.key === '2') { answer(e.key === '2' ? 'know' : 'learn'); return true; }
    return false;
  }

  var api = { rate: rate, migrate: migrate, pool: pool, session: session, dayNum: dayNum, dayOf: dayOf, view: view, key: key, SIZE: SIZE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Review = api;
})(this);
