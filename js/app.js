/* StudySite app: home page + module page. No dependencies. */
(function () {
  'use strict';
  var MODS = window.MODULES, MAN = window.MANIFEST, S = window.Study;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function fmt(s) { return window.Maths.html(s); }   /* bold, code and paper-style maths */
  function formula(it) {
    var h = '<div class="formula">' + (it.label ? '<small>' + esc(it.label) + '</small>' : '');
    if (!it.math) return h + '<div class="ftext">' + esc(it.text) + '</div></div>';
    h += it.math.map(function (l) { return '<div class="fline">' + window.Maths.tex(l, true) + '</div>'; }).join('');
    return h + (it.where ? '<p class="fwhere">' + fmt(it.where) + '</p>' : '') + explain(it) + '</div>';
  }
  function explain(it) {
    if (!it.explain && !it.example) return '';
    function line(l) { return l.tex ? '<div class="fline">' + window.Maths.tex(l.tex, true) + '</div>' : '<p>' + fmt(l) + '</p>'; }
    return '<details class="explain"><summary>💡 Explain this formula</summary>' +
      (it.explain ? '<h4>How it works</h4><ul>' + it.explain.map(function (l) { return '<li>' + fmt(l) + '</li>'; }).join('') + '</ul>' : '') +
      (it.example ? '<h4>Example</h4>' + it.example.map(line).join('') : '') + '</details>';
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function plain(s) { return String(s == null ? '' : s).replace(/[`*]/g, ''); }

  var CALC = /calculat|comput|work out|\bfind the\b|how many|what is the value/i;   /* questions that need a formula */

  /* ---------- storage (guarded) ---------- */
  var mem = {}, KEY = 'studysite.v1';
  var state = (function () { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return mem; } })();
  state.done = state.done || {}; state.cards = state.cards || {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }
  function applyTheme() { if (state.theme) document.documentElement.setAttribute('data-theme', state.theme); }
  applyTheme();

  /* ---------- content rendering ---------- */
  /* "Term: explanation" bullets get a bold term so the eye has somewhere to land */
  function leadIn(s) { var m = /^([^:`*]{2,40}):\s+(\S[\s\S]*)$/.exec(s); return m ? '<b>' + fmt(m[1]) + ':</b> ' + fmt(m[2]) : fmt(s); }
  /* every formula box of a topic (or, with "uses", the named ones from anywhere in the module) */
  function formulasOf(mod, topicId, uses) {
    var out = [], seen = {};
    (mod && mod.topics || []).forEach(function (t) {
      if (!uses && t.id !== topicId) return;
      (t.sections || []).forEach(function (s) {
        (s.items || []).forEach(function (it) {
          if (!it) return;
          (it.type === 'formula' ? [it] : it.type === 'task' ? it.own || [] : []).forEach(function (f) {
            if (/^Worked example:|^Result$/.test(f.label) || seen[f.label] || (uses && uses.indexOf(f.label) < 0)) return;
            seen[f.label] = true; out.push(f);
          });
        });
      });
    });
    return out;
  }
  /* names only, so you can jog your memory without being shown everything */
  function formulaPicker(list) {
    if (!list.length) return '';
    return '<details class="flist"><summary>🔤 Forgot a formula? Show the names</summary><div>' + list.map(function (f) { return '<details class="fname"><summary>' + esc(f.label) + '</summary>' + formula(f) + '</details>'; }).join('') + '</div></details>';
  }
  /* a worked example: the question, a nudge to try it, then the working behind a button */
  function taskBlock(items) {
    var t = items[0], rest = items.slice(1), n = t.show || 0;
    var list = formulasOf(window.M_NOW, t.topic, t.uses);
    (t.own || []).forEach(function (f) { if (!list.some(function (x) { return x.label === f.label; })) list.push(f); });
    return '<div class="task"><p class="try">✍️ <b>Try it yourself first</b>, on paper. Then open the worked solution.</p>' +
      (t.q || []).map(function (l) { return '<p>' + fmt(l) + '</p>'; }).join('') + (n ? renderItems(rest.slice(0, n)) : '') +
      formulaPicker(list) + '<details class="solve"><summary>✅ Show the worked solution</summary>' + renderItems(rest.slice(n)) + '</details></div>';
  }
  function renderItems(items) {
    if (items && items[0] && items[0].type === 'task') return taskBlock(items);
    var h = '', ul = false;
    (items || []).forEach(function (it) {
      if (typeof it === 'string') { if (!ul) { h += '<ul>'; ul = true; } h += '<li>' + leadIn(it) + '</li>'; return; }
      if (ul) { h += '</ul>'; ul = false; }
      switch (it.type) {
        case 'p': h += '<p>' + fmt(it.text) + '</p>'; break;
        case 'note': h += '<div class="callout">' + fmt(it.text) + '</div>'; break;
        case 'warn': h += '<div class="callout warn">' + fmt(it.text) + '</div>'; break;
        case 'formula': h += formula(it); break;
        case 'code': h += '<pre><code>' + esc(it.text) + '</code></pre>'; break;
        case 'table':
          h += '<table class="t"><thead><tr>' + it.head.map(function (c) { return '<th>' + fmt(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
            it.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + fmt(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
          break;
        case 'diagram': h += window.Diagrams.render(it.kind, it.data || {}, it.caption); break;
        case 'screen': h += '<hr class="stepline">'; break;
        default: h += '<p>' + fmt(JSON.stringify(it)) + '</p>';
      }
    });
    if (ul) h += '</ul>';
    return h;
  }
  function list(arr) { return '<ul>' + (arr || []).map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>'; }

  function modOf(code) { return MAN.filter(function (m) { return m.code === code; })[0]; }
  function stats(code) {
    var m = MODS[code]; if (!m) return { topics: 0, done: 0, cards: 0, known: 0 };
    var done = 0, known = 0;
    (m.topics || []).forEach(function (t) { if (state.done[code + ':' + t.id]) done++; });
    (m.flashcards || []).forEach(function (c) { if (state.cards[code + ':' + c.id] === 'know') known++; });
    return { topics: (m.topics || []).length, done: done, cards: (m.flashcards || []).length, known: known };
  }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

  /* ---------- search ---------- */
  var index = null;
  function buildIndex() {
    index = [];
    MAN.forEach(function (mm) {
      var m = MODS[mm.code]; if (!m) return;
      (m.topics || []).forEach(function (t) {
        var txt = [t.summary].concat((t.sections || []).map(function (s) { return s.heading + ' ' + (s.items || []).map(function (i) { return typeof i === 'string' ? i : (i.text || (i.rows ? i.rows.join(' ') : '')); }).join(' '); })).concat(t.pitfalls || []).join(' ');
        index.push({ code: mm.code, kind: 'Topic', title: t.title, text: plain(txt), href: 'module.html?m=' + mm.code + '#topics/' + t.id });
      });
      (m.flashcards || []).forEach(function (c) { index.push({ code: mm.code, kind: 'Flashcard', title: plain(c.front), text: plain(c.back), href: 'module.html?m=' + mm.code + '#cards/' + c.id }); });
      (m.methods || []).forEach(function (c) { index.push({ code: mm.code, kind: 'Method', title: c.title, text: plain((c.steps || []).join(' ') + ' ' + (c.when || '')), href: 'module.html?m=' + mm.code + '#methods/' + c.id }); });
      (m.practice || []).forEach(function (c) { index.push({ code: mm.code, kind: 'Practice', title: plain(c.question).slice(0, 90), text: plain(c.question), href: 'module.html?m=' + mm.code + '#practice/' + c.id }); });
    });
  }
  function search(q) {
    if (!index) buildIndex();
    var toks = q.toLowerCase().split(/\s+/).filter(Boolean); if (!toks.length) return [];
    var out = [];
    index.forEach(function (d) {
      var t = d.title.toLowerCase(), x = d.text.toLowerCase(), sc = 0, ok = true;
      toks.forEach(function (k) { var a = t.indexOf(k) >= 0, b = x.indexOf(k) >= 0; if (!a && !b) ok = false; sc += (a ? 5 : 0) + (b ? 1 : 0); });
      if (ok) out.push({ d: d, sc: sc });
    });
    out.sort(function (a, b) { return b.sc - a.sc; });
    return out.slice(0, 40).map(function (o) { return o.d; });
  }
  function initSearch() {
    var box = $('#q'), res = $('#results'); if (!box) return;
    var sel = -1;
    function show() {
      var r = search(box.value.trim());
      if (!box.value.trim()) { res.hidden = true; return; }
      res.hidden = false; sel = -1;
      res.innerHTML = r.length ? r.map(function (d) { return '<a href="' + d.href + '"><span class="badge mod">' + d.code + '</span> <span class="badge">' + d.kind + '</span> ' + esc(d.title) + '<small>' + esc(d.text.slice(0, 110)) + '</small></a>'; }).join('') : '<a>No matches</a>';
    }
    box.addEventListener('input', show);
    box.addEventListener('keydown', function (e) {
      var items = $$('a[href]', res);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, Math.min(items.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1))); items.forEach(function (a, i) { a.classList.toggle('sel', i === sel); }); if (items[sel]) items[sel].scrollIntoView({ block: 'nearest' }); }
      else if (e.key === 'Enter' && items[Math.max(sel, 0)]) { location.href = items[Math.max(sel, 0)].getAttribute('href'); }
      else if (e.key === 'Escape') { box.value = ''; res.hidden = true; box.blur(); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search')) res.hidden = true; });
  }

  /* ---------- keyboard help ---------- */
  var HELP = {
    'Lesson': [['Space / Enter', 'Next step, or show answer'], ['Right / Left', 'Next / previous step'], ['2 / 1', 'Got it / not yet'], ['Esc', 'Exit lesson']],
    'Mixed review': [['Space / Enter', 'Flip card'], ['2 / 1', 'I know it / not yet'], ['Esc', 'Back to home']],
    'Drills': [['Enter', 'Check answers, then new numbers'], ['Tab', 'Next answer box']],
    'Everywhere': [['F', 'Focus timer'], ['/', 'Focus search'], ['?', 'This help'], ['D', 'Toggle dark/light'], ['G then H', 'Go home']],
    'Module tabs': [['1 - 6', 'Jump to tab (not on Flashcards)'], [', and .', 'Previous / next tab'], ['[ and ]', 'Previous / next topic'], ['E', 'Expand / collapse all topics'], ['C', 'Mark focused topic complete']],
    'Flashcards': [['Space / Enter', 'Flip card'], ['Right / J', 'Next card'], ['Left / K', 'Previous card'], ['2 or Up', 'I know it (then next)'], ['1 or Down', 'Still learning (then next)'], ['S', 'Shuffle'], ['M', 'Toggle missed-only'], ['R', 'Restart deck']],
    'Mock papers': [['T', 'Start / pause timer'], ['A', 'Show / hide model answer for focused part'], ['Right / Left', 'Next / previous question'], ['Up / Down', 'Move focus between parts']]
  };
  function showHelp() {
    if ($('#help')) { $('#help').remove(); return; }
    var h = '<div class="overlay" id="help"><div class="card"><h2 style="margin-top:0">Keyboard shortcuts</h2>';
    Object.keys(HELP).forEach(function (g) { h += '<h3>' + g + '</h3><table>' + HELP[g].map(function (r) { return '<tr><td><span class="kbd">' + esc(r[0]) + '</span></td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</table>'; });
    h += '<p><button class="primary" id="closehelp">Close (Esc)</button></p></div></div>';
    document.body.insertAdjacentHTML('beforeend', h);
    $('#closehelp').onclick = function () { $('#help').remove(); };
  }

  /* ---------- HOME ---------- */
  function studyNow() {
    var n = window.Planner.next(state, MODS), due = window.Review.pool(state, MODS).due.length;
    var title = n.kind === 'review' ? 'Review ' + window.Review.SIZE + ' cards or fewer' : n.kind === 'resume' ? 'Resume: ' + n.topic.title : n.kind === 'topic' ? 'Learn: ' + n.topic.title : n.kind === 'mock' ? 'Exam papers: ' + n.code : 'All done';
    var todayPlan = (window.Planner.schedule(state, MODS).days[0] || { topics: [] }).topics;
    return '<a class="continue now" href="' + window.Planner.href(n) + '"><span><small>Study now</small><b>' + esc(title) + '</b><small>' + esc(n.why) + '</small></span><span class="go">Start ▶</span></a>' +
      '<div class="toolbar"><a class="btn" href="#calendar">📅 My calendar' + (todayPlan.length ? ' <span class="badge">today ' + todayPlan.filter(function (p) { return p.done; }).length + '/' + todayPlan.length + '</span>' : '') + '</a><a class="btn" href="#review">🔁 Mixed review' + (due ? ' <span class="badge p1">' + due + ' due</span>' : '') + '</a><a class="btn" href="#drills">🧮 Calculation drills</a></div>';
  }
  function datesLabel() { var n = Object.keys(state.exams || {}).length; return n ? n + ' set' : 'add yours for a countdown'; }
  function examDates() {
    return '<details class="fold" id="examdates"><summary>📅 Exam dates <span class="badge">' + datesLabel() + '</span></summary><div class="fbody"><p>"Paper days" are the days just before an exam that you keep for exam paper revision. Topics are planned to finish before them.</p><div class="dates">' +
      MAN.map(function (mm) {
        return '<div class="daterow"><span>' + mm.code + ' <small>' + esc(mm.name) + '</small></span>' +
          '<label><small>Exam date</small><input type="date" data-exam="' + mm.code + '" value="' + esc((state.exams || {})[mm.code] || '') + '"></label>' +
          '<label><small>Paper days</small><input type="number" min="0" max="60" inputmode="numeric" placeholder="0" data-paper="' + mm.code + '" value="' + (window.Planner.paperDays(state, mm.code) || '') + '"></label></div>';
      }).join('') + '</div></div></details>';
  }
  /* save in place, so the panel stays open and keeps focus; refresh redraws what depends on the dates */
  function wireDates(refresh) {
    function changed() { save(); $('#examdates summary .badge').textContent = datesLabel(); refresh(); }
    $$('[data-exam]').forEach(function (inp) {
      inp.onchange = function () {
        state.exams = state.exams || {};
        if (inp.value) state.exams[inp.dataset.exam] = inp.value; else delete state.exams[inp.dataset.exam];
        changed();
      };
    });
    $$('[data-paper]').forEach(function (inp) {
      inp.onchange = function () {
        var code = inp.dataset.paper;
        state.paperDays = state.paperDays || {};
        state.paperDays[code] = +inp.value || 0;
        var n = window.Planner.paperDays(state, code);
        if (n) state.paperDays[code] = n; else delete state.paperDays[code];
        inp.value = n || '';
        changed();
      };
    });
  }
  /* ---------- CALENDAR ---------- */
  function dayText(day, opts) { return new Date(day * 864e5).toLocaleDateString('en-IE', Object.assign({ timeZone: 'UTC' }, opts)); }
  function longDay(day) { return dayText(day, { weekday: 'long', day: 'numeric', month: 'long' }); }
  function colourOf(code) { var m = MAN.filter(function (x) { return x.code === code; })[0]; return m ? m.colour : '#888'; }
  function calDay(p, today) {
    var h = '<h2>' + (p.day === today ? 'Today, ' : '') + esc(longDay(p.day)) + '</h2>';
    p.exams.forEach(function (c) { h += '<div class="callout warn"><b>' + c + ' exam.</b> Good luck.</div>'; });
    MAN.forEach(function (mm) {
      var list = p.topics.filter(function (x) { return x.code === mm.code; }), papers = p.papers.indexOf(mm.code) >= 0;
      if (!list.length && !papers) return;
      h += '<div class="calmod" style="--mc:' + mm.colour + '"><h3>' + mm.code + ' <small>' + esc(mm.name) + '</small></h3><ul>' +
        (papers ? '<li><a href="module.html?m=' + mm.code + '#mocks">📝 Exam paper revision</a></li>' : '') +
        list.map(function (x) { return '<li' + (x.done ? ' class="done"' : '') + '><a href="module.html?m=' + mm.code + '#learn/' + esc(x.topic.id) + '">' + (x.done ? '✓ ' : '') + esc(plain(x.topic.title)) + '</a></li>'; }).join('') + '</ul></div>';
    });
    if (!p.topics.length && !p.papers.length && !p.exams.length) h += '<p>Nothing planned. Rest, or review some cards.</p>';
    return h;
  }
  function calBody() {
    var today = window.Review.dayNum(), plan = window.Planner.schedule(state, MODS, today), box = $('#cal');
    if (!plan.days.length) { box.innerHTML = '<p class="callout">Add at least one exam date above to get a calendar.</p>'; return; }
    var lead = (today + 3) % 7, total = Math.ceil((plan.days.length + lead) / 7) * 7, h = '', i;   /* weeks start on Monday */
    if (plan.tight.length) h += '<div class="callout warn">No days left before paper revision for ' + plan.tight.join(', ') + '. Remaining topics are all put on today (or left out if the exam is today). Fewer paper days would spread them out.</div>';
    if (plan.undated.length) h += '<p class="stat">Not in the calendar (no exam date): ' + plan.undated.join(', ') + '</p>';
    h += '<div class="cal">' + ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(function (d) { return '<b>' + d + '</b>'; }).join('');
    for (i = 0; i < total; i++) {
      var n = i - lead, p = plan.days[n], chips = '';
      if (!p) { h += '<span></span>'; continue; }
      p.exams.forEach(function (c) { chips += '<i class="exam" style="--mc:' + colourOf(c) + '">' + c.slice(2) + '<em> exam</em></i>'; });
      MAN.forEach(function (mm) {
        var k = p.topics.filter(function (x) { return x.code === mm.code; }).length;
        if (p.papers.indexOf(mm.code) >= 0) chips += '<i class="pp" style="--mc:' + mm.colour + '">📝' + mm.code.slice(2) + '</i>';
        if (k) chips += '<i style="--mc:' + mm.colour + '">' + mm.code.slice(2) + '<em> ×' + k + '</em></i>';
      });
      h += '<button data-day="' + n + '" aria-pressed="' + (n === 0) + '" aria-label="' + esc(longDay(p.day)) + '"><span>' + esc(dayText(p.day, n === 0 || new Date(p.day * 864e5).getUTCDate() === 1 ? { day: 'numeric', month: 'short' } : { day: 'numeric' })) + '</span>' + chips + '</button>';
    }
    h += '</div><p class="stat">Numbers are module codes without "CT". <span class="wide">×2 means two topics. </span>📝 means exam papers. Pick a day to see it.</p><div id="calday">' + calDay(plan.days[0], today) + '</div>';
    box.innerHTML = h;
    $$('[data-day]', box).forEach(function (btn) {
      btn.onclick = function () {
        $$('[data-day]', box).forEach(function (o) { o.setAttribute('aria-pressed', o === btn); });
        $('#calday').innerHTML = calDay(plan.days[+btn.dataset.day], today);
        $('#calday').scrollIntoView({ block: 'nearest' });
      };
    });
  }
  function calendar() {
    $('#app').innerHTML = '<p><a class="btn" href="#">← Home</a></p><h1>My calendar</h1><p class="lead">Your main topics, shared over the days you have. Miss a day and it re-plans itself.</p>' + examDates() + '<div id="cal"></div>';
    wireDates(calBody);
    calBody();
  }
  function countdown(code, m) {
    var i = window.Planner.info(state, code, m, window.Review.dayNum());
    if (i.days == null) return '';
    if (i.past) return '<p class="stat">Exam done</p>';
    return '<p class="countdown' + (i.days <= 7 ? ' soon' : '') + '"><b>' + (i.days === 0 ? 'Today' : i.days + (i.days === 1 ? ' day left' : ' days left')) + '</b>' + (i.left.length ? ' · about ' + i.perDay + (i.perDay === 1 ? ' topic' : ' topics') + ' a day' : ' · main topics done') + '</p>';
  }
  /* progress lives in this browser only: a file carries it to another one */
  function backupPanel() {
    return '<details class="fold"><summary>💾 Save or move your progress</summary><div class="fbody"><p>Progress is kept in this browser only. Export it to a file, then import that file in another browser or on another device.</p>' +
      '<div class="toolbar"><button id="export">Export to a file</button><button id="import">Import from a file</button></div><input type="file" id="importfile" accept=".json,application/json" hidden><p id="backupmsg" role="status"></p></div></details>';
  }
  function backupWire() {
    var msg = $('#backupmsg'), pick = $('#importfile');
    function obj(o) { return !!o && typeof o === 'object' && !Array.isArray(o); }
    $('#export').onclick = function () {
      var d = new Date(), day = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      var a = document.createElement('a'), url = URL.createObjectURL(new Blob([JSON.stringify({ app: 'studysite', saved: day, state: state })], { type: 'application/json' }));
      a.href = url; a.download = 'studysite-progress-' + day + '.json'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      msg.textContent = 'Saved ' + a.download + ' to your downloads.';
    };
    $('#import').onclick = function () { pick.value = ''; pick.click(); };
    pick.onchange = function () {
      if (!pick.files[0]) return;
      var r = new FileReader();
      r.onload = function () {
        var data;
        try { data = JSON.parse(r.result); } catch (e) { data = null; }
        if (!data || data.app !== 'studysite' || !obj(data.state) || !obj(data.state.done) || !obj(data.state.cards)) { msg.textContent = 'That is not a StudySite progress file. Nothing was changed.'; return; }
        if (!window.confirm('Replace the progress in this browser with the file saved on ' + (data.saved || 'an unknown date') + '?')) return;
        try { localStorage.setItem(KEY, JSON.stringify(data.state)); } catch (e) { msg.textContent = 'This browser would not save it. Nothing was changed.'; return; }
        location.reload();
      };
      r.readAsText(pick.files[0]);
    };
  }
  function home() {
    window.Review.migrate(state); save();
    var h = '<h1>4th Year Exam Revision</h1><p class="lead">Press Study now. One small step at a time.</p><div id="studynow">' + studyNow() + '</div>' + S.hud() + examDates() + '<div class="grid">';
    MAN.forEach(function (mm) {
      var s = stats(mm.code), m = MODS[mm.code];
      h += '<a class="card modcard" href="module.html?m=' + mm.code + '" style="--mc:' + mm.colour + '"><h3>' + mm.code + (m && m.evidence === 'estimated' ? ' <span class="badge est" title="No past papers available: ranking estimated from lecture emphasis">estimated</span>' : '') + (m && m.hints ? ' <span class="badge likely">hints</span>' : '') + '</h3><div>' + esc(mm.name) + '</div>';
      if (!m) h += '<p class="stat">Content not built yet.</p>';
      else { var nx = S.nextTopic(mm.code, m); h += '<div data-count="' + mm.code + '">' + countdown(mm.code, m) + '</div><div class="rings">' + S.ring(pct(s.done, s.topics), 'topics') + '<span class="stat">Topics<br>' + s.done + '/' + s.topics + '</span>' + S.ring(pct(s.known, s.cards), 'cards') + '<span class="stat">Cards<br>' + s.known + '/' + s.cards + '</span></div><p class="stat">' + (nx ? 'Next up: ' + esc(nx.title) : 'All topics complete') + '</p>'; }
      h += '</a>';
    });
    h += '</div>' + backupPanel() + '<div class="disclaimer">Content is synthesised from your notes and past papers. Lecturer hints are second-hand and unverified. Mock papers and model answers are AI-written practice material, not official marking schemes.</div>';
    $('#app').innerHTML = h;
    backupWire();
    wireDates(function () {
      $('#studynow').innerHTML = studyNow();
      $$('[data-count]').forEach(function (d) { d.innerHTML = countdown(d.dataset.count, MODS[d.dataset.count]); });
    });
  }
  function homeParts() { return location.hash.replace(/^#/, '').split('/'); }
  function homeRoute() {
    var p = homeParts(), app = $('#app');
    if (p[0] === 'review') window.Review.view({ state: state, save: save, mods: MODS, app: app, fmt: fmt, award: S.award, confetti: S.confetti });
    else if (p[0] === 'drills') window.Drills.view({ app: app, man: MAN, esc: esc, fmt: fmt, formulas: function (refs) { var list = []; refs.forEach(function (r) { var p = r.split('/'); list = list.concat(formulasOf(MODS[p[0]], p[1])); }); return formulaPicker(list); }, award: S.award, today: window.Review.dayNum }, p[1] || '');
    else if (p[0] === 'calendar') calendar();
    else home();
    window.scrollTo(0, 0);
  }

  /* ---------- MODULE ---------- */
  var TABS = [['exam', 'Exam breakdown'], ['topics', 'Topics'], ['cards', 'Flashcards'], ['methods', 'Methods'], ['practice', 'Past questions'], ['mocks', 'Mock papers']];
  var code, M, tab = 'topics', focusT = -1, fc = { topic: 'all', missed: false, order: [], i: 0, flipped: false }, mk = { mi: 0, qi: 0, fp: 0, secs: null, run: false, timer: null, shown: {} };

  function route() {
    var parts = location.hash.replace(/^#/, '').split('/'); tab = parts[0] || 'topics';
    if (tab !== 'learn' && !TABS.some(function (t) { return t[0] === tab; })) tab = 'topics';
    var target = parts[1] ? decodeURIComponent(parts[1]) : null;
    renderTab(target);
  }
  function go(t) { location.hash = '#' + t; }

  function moduleShell() {
    var mm = modOf(code);
    if (!mm) { $('#app').innerHTML = '<h1>Unknown module</h1><p><a href="index.html">Home</a></p>'; return false; }
    if (!M) { $('#app').innerHTML = '<h1>' + code + ' ' + esc(mm.name) + '</h1><p>This module\'s content file (data/' + code + '.js) has not been built yet.</p>'; return false; }
    var h = '<h1 style="border-left:6px solid ' + mm.colour + ';padding-left:10px">' + code + ' <small style="font-weight:400">' + esc(mm.name) + '</small></h1>';
    if (M.evidence === 'estimated') h += '<div class="disclaimer">No past papers were available for this module, so topic order is <b>estimated</b> from lecture emphasis.</div>';
    h += '<nav class="tabs" role="tablist">' + TABS.map(function (t, i) { return '<button role="tab" data-tab="' + t[0] + '" aria-selected="' + (t[0] === tab) + '">' + (i + 1) + '. ' + t[1] + '</button>'; }).join('') + '</nav><div id="view"></div>';
    $('#app').innerHTML = h;
    $$('nav.tabs button').forEach(function (b) { b.onclick = function () { go(b.dataset.tab); }; });
    return true;
  }

  function renderTab(target) {
    S.leave();
    if (!moduleShell()) return;
    var v = $('#view');
    document.body.classList.toggle('in-lesson', tab === 'learn');
    if (tab === 'learn') { S.lesson(target); window.scrollTo(0, 0); return; }
    if (tab === 'exam') v.innerHTML = examView();
    else if (tab === 'topics') { v.innerHTML = topicsView(); bindTopics(target); }
    else if (tab === 'cards') { cardsInit(target); }
    else if (tab === 'methods') { v.innerHTML = methodsView(); scrollTo(target); bindToggles(v); }
    else if (tab === 'practice') { v.innerHTML = practiceView(); scrollTo(target); bindToggles(v); }
    else if (tab === 'mocks') { mocksView(); }
  }
  function openUp(el) { for (; el; el = el.parentElement) if (el.tagName === 'DETAILS') el.open = true; }
  function scrollTo(id) { if (!id) return; var el = document.getElementById('x-' + id); if (el) { openUp(el); el.scrollIntoView({ block: 'center' }); } }
  function bindToggles(root) { $$('[data-toggle]', root).forEach(function (b) { b.onclick = function () { var el = document.getElementById(b.dataset.toggle); el.hidden = !el.hidden; var what = b.dataset.what || 'model outline'; b.textContent = (el.hidden ? 'Show ' : 'Hide ') + what; if (!el.hidden && b.dataset.xp) S.award(b.dataset.xp, 10); }; }); }
  function fold(title, body, open) { return '<details class="fold"' + (open ? ' open' : '') + '><summary>' + title + '</summary><div class="fbody">' + body + '</div></details>'; }

  /* --- exam --- */
  function examView() {
    var e = M.exam || {}, h = '';
    if (e.summary) h += '<div class="card"><h3 style="margin-top:0">Format at a glance</h3>' + list(e.summary) + '</div>';
    if (M.hints) {
      var hs = M.hints, before = h; h = '';
      h += '<div class="disclaimer">' + esc(hs.source || 'Second-hand, unverified.') + '</div>';
      if (hs.questionShapes) h += '<h3>Question shapes</h3>' + list(hs.questionShapes);
      h += '<div class="grid"><div class="card"><h3 style="margin-top:0">Likely</h3>' + list(hs.likely) + '</div><div class="card"><h3 style="margin-top:0">Unlikely</h3>' + list(hs.unlikely) + '</div></div>';
      if (hs.notes && hs.notes.length) h += '<h3>Other notes</h3>' + list(hs.notes);
      h = before + fold('🗣️ Lecturer hints <span class="badge likely">as reported</span>', h);
    }
    if (e.structure) h += '<h2>Structure</h2><table class="t"><thead><tr><th>Part</th><th>Details</th></tr></thead><tbody>' + e.structure.map(function (r) { return '<tr><td>' + fmt(r.label) + '</td><td>' + fmt(r.detail) + '</td></tr>'; }).join('') + '</tbody></table>';
    if (e.freq && e.freq.length) h += '<h2>Topic frequency in past papers</h2>' + window.Diagrams.render('bar', { title: 'Appearances (out of ' + (e.freq[0].of || '?') + ' papers)', yLabel: 'papers', bars: e.freq.slice(0, 10).map(function (f, i) { return { label: String(f.topic).slice(0, 14), value: f.count, color: i < 3 ? 4 : 0 }; }) }, 'Top topics by number of papers they appeared in.') + '<table class="t"><thead><tr><th>Topic</th><th>Papers</th></tr></thead><tbody>' + e.freq.map(function (f) { return '<tr><td>' + fmt(f.topic) + '</td><td>' + f.count + '/' + f.of + '</td></tr>'; }).join('') + '</tbody></table>';
    if (e.years && e.years.length) h += fold('🗂️ Paper by paper', e.years.map(function (y) { return fold(fmt(y.year), list(y.themes)); }).join(''));
    if (e.tips) h += '<h2>🎯 How to score</h2><div class="tips">' + e.tips.map(function (x) { return '<div class="callout">' + fmt(x) + '</div>'; }).join('') + '</div>';
    if (e.note) h += '<div class="disclaimer">' + fmt(e.note) + '</div>';
    return h;
  }

  /* --- topics --- */
  function topicCard(t) {
    var key = code + ':' + t.id, done = !!state.done[key];
    var h = '<details class="topic' + (done ? ' done' : '') + '" id="x-' + esc(t.id) + '" data-id="' + esc(t.id) + '"><summary><input type="checkbox" aria-label="Mark complete" ' + (done ? 'checked' : '') + ' data-done="' + esc(t.id) + '"><span class="ttl">' + esc(t.title) + '</span>' +
      '<span class="badge' + (t.priority <= 3 ? ' p1' : '') + '">#' + t.priority + '</span>' + (t.freq ? '<span class="badge">' + esc(t.freq) + '</span>' : '') + (t.marks ? '<span class="badge">' + esc(t.marks) + '</span>' : '') +
      (t.hint ? '<span class="badge ' + esc(t.hint) + '">Lecturer: ' + esc(t.hint) + '</span>' : '') +
      '<a class="btn learn" href="#learn/' + esc(t.id) + '">' + (done ? 'Review' : state.pos[key] ? 'Resume' : 'Learn') + ' ▶ <small>' + S.minutes(M, t) + ' min</small></a></summary><div class="tbody">';
    if (t.summary) h += '<p><b>' + fmt(t.summary) + '</b></p>';
    if (t.mnemonic) h += '<div class="callout hook">Memory hook: ' + fmt(t.mnemonic) + '</div>';
    h += S.visualHtml(t);
    (t.sections || []).forEach(function (s) { h += fold(fmt(s.heading), renderItems(s.items)); });
    if (t.pitfalls && t.pitfalls.length) h += '<div class="callout warn"><b>Marks are lost by:</b>' + list(t.pitfalls) + '</div>';
    if (t.source) h += '<p class="stat">Source: ' + esc([].concat(t.source).join(', ')) + '</p>';
    return h + '</div></details>';
  }
  function topicsView() {
    var ts = (M.topics || []).slice().sort(function (a, b) { return a.priority - b.priority; });
    var main = ts.filter(function (t) { return t.tier !== 'low'; }), low = ts.filter(function (t) { return t.tier === 'low'; });
    var s = stats(code);
    var nx = S.nextTopic(code, M);
    var h = nx ? '<a class="continue" href="#learn/' + esc(nx.id) + '"><span><small>' + (state.pos[code + ':' + nx.id] ? 'Pick up where you left off' : 'Up next') + '</small><b>' + esc(nx.title) + '</b><small>about ' + S.minutes(M, nx) + ' min, in bite-size steps</small></span><span class="go">Continue ▶</span></a>' : '<div class="callout">🎉 Every topic is complete. Try a mock paper.</div>';
    h += S.hud();
    h += '<div class="toolbar"><button id="expall">Expand / collapse all <span class="kbd">E</span></button><button id="hidedone" aria-pressed="false">Hide completed</button><span class="stat" style="align-self:center">' + s.done + ' of ' + s.topics + ' complete</span></div><div class="bar"><i style="width:' + pct(s.done, s.topics) + '%"></i></div>';
    h += '<p class="stat">Ordered by likelihood and marks (#1 = revise first). <span class="kbd">[</span> <span class="kbd">]</span> move between topics, <span class="kbd">C</span> marks complete.</p>';
    var openStage = false;
    for (var i = 0; i < main.length; i += S.STAGE) {
      var group = main.slice(i, i + S.STAGE), n = i / S.STAGE + 1;
      var got = group.filter(function (t) { return state.done[code + ':' + t.id]; }).length, isOpen = !openStage && got < group.length;
      if (isOpen) openStage = true;
      h += '<details class="stage' + (got === group.length ? ' complete' : '') + '"' + (isOpen ? ' open' : '') + '><summary><span class="num">' + (got === group.length ? '✓' : n) + '</span><span class="ttl">Stage ' + n + '</span><span class="dots">' + group.map(function (t) { return '<i data-dot="' + esc(t.id) + '" class="' + (state.done[code + ':' + t.id] ? 'on' : '') + '"></i>'; }).join('') + '</span><span class="stat">' + got + '/' + group.length + '</span></summary><div class="sbody">' + group.map(topicCard).join('') +
        '<button class="sm" data-toggle="recap-' + n + '" data-what="stage recap">Show stage recap</button><div class="recap" id="recap-' + n + '" hidden><p class="stat">Say each one from memory before you read it.</p>' + group.map(function (t) { return '<div class="callout"><b>' + esc(t.title) + '</b><br>' + fmt(t.summary || '') + (t.mnemonic ? '<br><small>🧠 ' + fmt(t.mnemonic) + '</small>' : '') + '</div>'; }).join('') + '</div></div></details>';
    }
    if (low.length) h += '<h2>Only if time (lecturer says unlikely, or low value)</h2><p class="stat">Still examinable in principle: keep a light pass over these.</p>' + low.map(topicCard).join('');
    return h;
  }
  function topicEls() { return $$('details.topic'); }
  function setFocusT(i) { var els = topicEls(); if (!els.length) return; focusT = Math.max(0, Math.min(els.length - 1, i)); els.forEach(function (e, k) { e.classList.toggle('focus', k === focusT); }); openUp(els[focusT].parentElement); els[focusT].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  function bindTopics(target) {
    $$('input[data-done]').forEach(function (cb) {
      cb.onclick = function (e) { e.stopPropagation(); };
      cb.onchange = function () { toggleDone(cb.dataset.done, cb.checked); };
    });
    $$('details.topic').forEach(function (d, i) { d.addEventListener('toggle', function () { if (d.open) { focusT = i; $$('details.topic').forEach(function (e, k) { e.classList.toggle('focus', k === i); }); } }); });
    bindToggles($('#view'));
    $$('a.learn').forEach(function (a) { a.onclick = function (e) { e.stopPropagation(); }; });
    $('#expall').onclick = expandAll;
    $('#hidedone').onclick = function () { var on = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', on); $$('details.topic.done').forEach(function (d) { d.style.display = on ? 'none' : ''; }); };
    if (target) scrollTo(target);
  }
  function toggleDone(id, val) {
    var k = code + ':' + id; if (val) state.done[k] = true; else delete state.done[k]; save();
    var d = document.getElementById('x-' + id); if (d) { d.classList.toggle('done', val); var cb = $('input[data-done]', d); if (cb) cb.checked = val; }
    var dot = $('[data-dot="' + id + '"]'); if (dot) dot.classList.toggle('on', val);
    if (val) S.award('t:' + k, 50);
    var s = stats(code); var bar = $('#view .toolbar + .bar > i'); if (bar) bar.style.width = pct(s.done, s.topics) + '%';
    var st = $('#view .toolbar .stat'); if (st) st.textContent = s.done + ' of ' + s.topics + ' complete';
  }
  function expandAll() { var els = topicEls(), anyClosed = els.some(function (e) { return !e.open; }); els.forEach(function (e) { e.open = anyClosed; }); if (anyClosed) $$('details.stage').forEach(function (e) { e.open = true; }); }

  /* --- methods --- */
  function methodsView() {
    var ms = M.methods || []; if (!ms.length) return '<p>No methods for this module.</p>';
    var drill = window.Drills.forCode(code).length ? '<p><a class="btn" href="index.html#drills/' + code + '">🧮 Practise with new numbers</a></p>' : '';
    return '<p class="lead">One recipe at a time. Open it, learn the hook, try the example, then check.</p>' + drill + ms.map(function (m, mi) {
      var h = '<details class="fold method" id="x-' + esc(m.id) + '"><summary>🪜 ' + esc(m.title) + '</summary><div class="fbody">';
      if (m.when) h += '<p class="stat">Use when: ' + fmt(m.when) + '</p>';
      if (m.mnemonic) h += '<div class="callout hook">🧠 Memory hook: ' + fmt(m.mnemonic) + '</div>';
      h += '<ol class="steps">' + (m.steps || []).map(function (s) { return '<li>' + fmt(String(s).replace(/^\d+[.)]\s*/, '')) + '</li>'; }).join('') + '</ol>';
      if (m.example) h += '<div class="eg"><b>🧪 Your turn.</b> ' + fmt(m.example.problem) + formulaPicker(formulasOf(M, m.topicId)) + (m.example.solution ? '<div><button class="sm primary" data-toggle="eg-' + mi + '" data-what="worked answer" data-xp="m:' + code + ':' + esc(m.id) + '">Show worked answer</button></div><div id="eg-' + mi + '" hidden>' + list(m.example.solution) + '</div>' : '') + '</div>';
      if (m.diagram) h += window.Diagrams.render(m.diagram.kind, m.diagram.data, m.diagram.caption);
      return h + '</div></details>';
    }).join('');
  }

  /* --- practice --- */
  function practiceView() {
    var ps = M.practice || []; if (!ps.length) return '<p>No past questions recorded.</p>';
    var tt = {}; (M.topics || []).forEach(function (t) { tt[t.id] = t; });
    var order = [], groups = {};
    ps.forEach(function (p, i) {
      if (!groups[p.topicId]) { groups[p.topicId] = []; order.push(p.topicId); }
      groups[p.topicId].push('<div class="card method" id="x-' + esc(p.id) + '" style="margin:10px 0"><span class="badge">' + esc(p.source || '') + '</span> <span class="badge">' + esc(p.marks || '') + ' marks</span> ' + (tt[p.topicId] ? '<span class="badge mod">' + esc(tt[p.topicId].title) + '</span>' : '') + '<p>' + fmt(p.question) + '</p>' + (CALC.test(p.question) ? formulaPicker(formulasOf(M, p.topicId)) : '') + '<button class="sm" data-toggle="o-' + i + '" data-xp="q:' + code + ':' + esc(p.id) + '">Show model outline</button><div class="answer" id="o-' + i + '" hidden>' + list(p.outline) + '</div></div>');
    });
    order.sort(function (a, b) { return (tt[a] ? tt[a].priority : 999) - (tt[b] ? tt[b].priority : 999); });
    return '<p class="lead">Real past-paper questions. Pick one topic, attempt a question, then reveal the outline (my synthesis from your notes, not an official scheme).</p>' + order.map(function (id) { return fold(esc(tt[id] ? tt[id].title : 'Other') + ' <span class="badge">' + groups[id].length + '</span>', groups[id].join('')); }).join('');
  }

  /* --- flashcards --- */
  function cardList() {
    var all = M.flashcards || [];
    return all.filter(function (c) { return (fc.topic === 'all' || c.topicId === fc.topic) && (!fc.missed || state.cards[code + ':' + c.id] !== 'know'); });
  }
  function cardsInit(target) {
    if (!(M.flashcards || []).length) { $('#view').innerHTML = '<p>No flashcards for this module.</p>'; return; }
    fc.order = cardList().map(function (c) { return c.id; }); fc.i = 0; fc.flipped = false;
    if (target) { var ix = fc.order.indexOf(target); if (ix >= 0) fc.i = ix; }
    cardsRender();
  }
  function rebuildDeck(keepId) { fc.order = cardList().map(function (c) { return c.id; }); fc.i = Math.max(0, Math.min(fc.i, fc.order.length - 1)); fc.flipped = false; }
  function cardsRender() {
    var byId = {}; (M.flashcards || []).forEach(function (c) { byId[c.id] = c; });
    var s = stats(code), tt = {}; (M.topics || []).forEach(function (t) { tt[t.id] = t; });
    var topicOpts = '<option value="all">All topics</option>' + (M.topics || []).map(function (t) { return '<option value="' + esc(t.id) + '"' + (fc.topic === t.id ? ' selected' : '') + '>' + esc(t.title) + '</option>'; }).join('');
    var h = '<div class="deckbar"><select id="fctopic" aria-label="Topic filter">' + topicOpts + '</select><button id="fcmiss" aria-pressed="' + fc.missed + '">Missed only <span class="kbd">M</span></button><button id="fcshuf">Shuffle <span class="kbd">S</span></button><button id="fcreset">Restart <span class="kbd">R</span></button><button id="fcclear" title="Forget all know/learning marks for this module">Clear marks</button><span class="stat">Known ' + s.known + '/' + s.cards + '</span></div><div class="bar"><i style="width:' + pct(s.known, s.cards) + '%"></i></div>';
    if (!fc.order.length) { h += '<div class="card"><p>Nothing in this deck' + (fc.missed ? ' (every card here is marked known: nice)' : '') + '.</p></div>'; $('#view').innerHTML = h; bindCards(); return; }
    var c = byId[fc.order[fc.i]], st = state.cards[code + ':' + c.id];
    var rn = fc.round ? fc.round.n : 0;
    h += '<div class="round" aria-label="' + rn + ' of 10 in this round">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return '<i class="' + (i < rn ? 'on' : '') + '"></i>'; }).join('') + '<span class="stat">to checkpoint</span></div>';
    h += '<p class="stat" style="text-align:center">Card ' + (fc.i + 1) + ' of ' + fc.order.length + (tt[c.topicId] ? ' &middot; ' + esc(tt[c.topicId].title) : '') + '</p>';
    h += '<div class="fc' + (fc.flipped ? ' flipped' : '') + (st === 'know' ? ' known' : st === 'learn' ? ' learn' : '') + '" id="fc"><div class="fc-inner"><div class="fc-face front"><span class="tag">Question</span>' + fmt(c.front) + '<small>click or press Space to flip</small></div><div class="fc-face back"><span class="tag">Answer</span><div>' + fmt(c.back) + '</div>' + (c.hook ? '<small>Hook: ' + fmt(c.hook) + '</small>' : '') + '</div></div></div>';
    h += '<div class="actions"><button id="fcprev">Prev <span class="kbd">&larr;</span></button><button class="bad" id="fclearn">Still learning <span class="kbd">1</span></button><button class="good" id="fcknow">I know it <span class="kbd">2</span></button><button id="fcnext">Next <span class="kbd">&rarr;</span></button></div>';
    $('#view').innerHTML = h; bindCards();
  }
  function bindCards() {
    var f = $('#fc'); if (f) { f.onclick = cardFlip; var x0 = null; f.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true }); f.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) cardMove(dx < 0 ? 1 : -1); }); }
    var on = function (id, fn) { var el = $(id); if (el) el.onclick = fn; };
    on('#fcprev', function () { cardMove(-1); }); on('#fcnext', function () { cardMove(1); });
    on('#fcknow', function () { cardRate('know'); }); on('#fclearn', function () { cardRate('learn'); });
    on('#fcshuf', cardShuffle); on('#fcreset', cardRestart); on('#fcmiss', cardMissed);
    on('#fcclear', function () { (M.flashcards || []).forEach(function (c) { delete state.cards[code + ':' + c.id]; if (state.srs) delete state.srs[code + ':' + c.id]; }); save(); rebuildDeck(); cardsRender(); });
    var sel = $('#fctopic'); if (sel) sel.onchange = function () { fc.topic = sel.value; fc.i = 0; rebuildDeck(); cardsRender(); };
  }
  function cardFlip() { fc.flipped = !fc.flipped; var f = $('#fc'); if (f) f.classList.toggle('flipped', fc.flipped); }
  function cardMove(d) { if (!fc.order.length) return; fc.i = (fc.i + d + fc.order.length) % fc.order.length; fc.flipped = false; cardsRender(); }
  function cardRate(v) { if (!fc.order.length) return; window.Review.rate(state, code + ':' + fc.order[fc.i], v); state.cards[code + ':' + fc.order[fc.i]] = v; save(); S.award('c:' + code + ':' + fc.order[fc.i], 10);
    fc.round = fc.round || { n: 0, know: 0 }; fc.round.n++; if (v === 'know') fc.round.know++;
    if (fc.round.n >= 10) { S.toast('Checkpoint: ' + fc.round.know + ' of 10 known'); if (fc.round.know >= 8) S.confetti(); fc.round = null; } if (fc.missed && v === 'know') { var keep = fc.i; fc.order.splice(fc.i, 1); fc.i = Math.min(keep, fc.order.length - 1); fc.flipped = false; cardsRender(); } else cardMove(1); }
  function cardShuffle() { for (var i = fc.order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = fc.order[i]; fc.order[i] = fc.order[j]; fc.order[j] = t; } fc.i = 0; fc.flipped = false; cardsRender(); }
  function cardRestart() { fc.i = 0; rebuildDeck(); cardsRender(); }
  function cardMissed() { fc.missed = !fc.missed; fc.i = 0; rebuildDeck(); cardsRender(); }

  /* --- mocks --- */
  function mocksView() {
    var ms = M.mocks || [], v = $('#view');
    if (!ms.length) { v.innerHTML = '<p>No mock papers for this module yet.</p>'; return; }
    var mock = ms[mk.mi] || ms[0], q = mock.questions[mk.qi] || mock.questions[0];
    if (mk.secs == null) mk.secs = (mock.duration || 120) * 60;
    var h = '<div class="disclaimer">AI-written practice paper modelled on the real format and lecturer hints. Not an official paper; model outlines are suggestions.</div>';
    h += '<div class="toolbar">' + ms.map(function (m, i) { return '<button data-mock="' + i + '" aria-pressed="' + (i === mk.mi) + '">' + esc(m.title) + '</button>'; }).join('') + '<button onclick="window.print()">Print</button></div>';
    h += '<div class="paper"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><div><b>' + code + ' ' + esc(mock.title) + '</b><br><span class="stat">' + esc(mock.instructions || '') + '</span></div><div><span class="timer" id="timer">' + clock(mk.secs) + '</span> <button id="tbtn">' + (mk.run ? 'Pause' : 'Start') + ' <span class="kbd">T</span></button></div></div>';
    h += '<div class="qtabs">' + mock.questions.map(function (qq, i) { return '<button data-q="' + i + '" aria-pressed="' + (i === mk.qi) + '">Q' + qq.n + ' (' + qq.marks + ')</button>'; }).join('') + '</div>';
    h += '<div class="qpane"><h3>Question ' + q.n + ' <span class="badge">' + q.marks + ' marks</span></h3>';
    if (q.scenario) h += '<div class="scenario">' + fmt(q.scenario) + '</div>';
    q.parts.forEach(function (p, i) {
      var id = 'a-' + mk.mi + '-' + mk.qi + '-' + i, shown = !!mk.shown[id];
      h += '<div class="part' + (i === mk.fp ? ' focus' : '') + '" data-p="' + i + '"><b>(' + esc(p.label) + ')</b> ' + fmt(p.text) + ' <span class="badge">' + p.marks + '</span>' + (CALC.test(p.text) ? formulaPicker(formulasOf(M, p.topicId)) : '') + '<div><button class="sm" data-ans="' + id + '">' + (shown ? 'Hide' : 'Show') + ' model outline</button></div><div class="answer" id="' + id + '"' + (shown ? '' : ' hidden') + '>' + list(p.outline) + '</div></div>';
    });
    h += '</div></div>';
    v.innerHTML = h;
    $$('[data-mock]').forEach(function (b) { b.onclick = function () { mk.mi = +b.dataset.mock; mk.qi = 0; mk.fp = 0; mk.secs = null; stopTimer(); mocksView(); }; });
    $$('[data-q]').forEach(function (b) { b.onclick = function () { mk.qi = +b.dataset.q; mk.fp = 0; mocksView(); }; });
    $$('[data-ans]').forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); mk.shown[b.dataset.ans] = !mk.shown[b.dataset.ans]; mocksView(); }; });
    $$('.part').forEach(function (p) { p.onclick = function () { mk.fp = +p.dataset.p; $$('.part').forEach(function (x) { x.classList.toggle('focus', x === p); }); }; });
    $('#tbtn').onclick = toggleTimer;
  }
  function clock(s) { s = Math.max(0, s); var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ':' : '') + String(m).padStart(h ? 2 : 1, '0') + ':' + String(x).padStart(2, '0'); }
  function stopTimer() { mk.run = false; clearInterval(mk.timer); mk.timer = null; }
  function toggleTimer() {
    if (mk.run) stopTimer(); else { mk.run = true; mk.timer = setInterval(function () { mk.secs--; var t = $('#timer'); if (t) t.textContent = clock(mk.secs); if (mk.secs <= 0) stopTimer(); }, 1000); }
    var b = $('#tbtn'); if (b) b.innerHTML = (mk.run ? 'Pause' : 'Start') + ' <span class="kbd">T</span>';
  }
  function mockStep(d) { var mock = (M.mocks || [])[mk.mi]; if (!mock) return; mk.qi = (mk.qi + d + mock.questions.length) % mock.questions.length; mk.fp = 0; mocksView(); }
  function mockFocus(d) { var q = ((M.mocks || [])[mk.mi] || {}).questions; if (!q) return; var n = q[mk.qi].parts.length; mk.fp = Math.max(0, Math.min(n - 1, mk.fp + d)); $$('.part').forEach(function (x, i) { x.classList.toggle('focus', i === mk.fp); }); var el = $$('.part')[mk.fp]; if (el) el.scrollIntoView({ block: 'nearest' }); }
  function mockAnswer() { var id = 'a-' + mk.mi + '-' + mk.qi + '-' + mk.fp; mk.shown[id] = !mk.shown[id]; mocksView(); }

  /* ---------- keyboard ---------- */
  var gPending = false;
  function onKey(e) {
    var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    if (t && t.tagName === 'SUMMARY' && (e.key === ' ' || e.key === 'Enter')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape') { var hp = $('#help'); if (hp) { hp.remove(); return; } var pr = $('#prefs'); if (pr) { pr.remove(); return; } if (page === 'module' && (tab === 'cards' || tab === 'learn') && !typing) { go('topics'); } if (page === 'home' && location.hash.length > 1) location.hash = ''; return; }
    if (typing) return;
    var k = e.key, lk = k.length === 1 ? k.toLowerCase() : k;
    if (gPending) { gPending = false; if (lk === 'h') { location.href = 'index.html'; return; } }
    if (lk === '/') { e.preventDefault(); var q = $('#q'); if (q) q.focus(); return; }
    if (k === '?') { showHelp(); return; }
    if (lk === 'd') { state.theme = (document.documentElement.getAttribute('data-theme') === 'dark' || (!state.theme && matchMedia('(prefers-color-scheme: dark)').matches)) ? 'light' : 'dark'; applyTheme(); save(); return; }
    if (lk === 'g') { gPending = true; setTimeout(function () { gPending = false; }, 900); return; }
    if (lk === 'f') { window.Timer.toggle(); return; }
    if (page === 'home' && homeParts()[0] === 'review') { window.Review.key(e); return; }
    if (page !== 'module' || !M) return;
    if (tab === 'learn' && S.key(e)) return;
    var ti = TABS.map(function (x) { return x[0]; }).indexOf(tab);
    if (k === ',' || k === '.') { go(TABS[(ti + (k === '.' ? 1 : -1) + TABS.length) % TABS.length][0]); return; }
    if (tab === 'cards') {
      if (k === ' ' || k === 'Enter') { e.preventDefault(); cardFlip(); return; }
      if (k === 'ArrowRight' || lk === 'j') { cardMove(1); return; }
      if (k === 'ArrowLeft' || lk === 'k') { cardMove(-1); return; }
      if (k === '2' || k === 'ArrowUp') { e.preventDefault(); cardRate('know'); return; }
      if (k === '1' || k === 'ArrowDown') { e.preventDefault(); cardRate('learn'); return; }
      if (lk === 's') { cardShuffle(); return; } if (lk === 'm') { cardMissed(); return; } if (lk === 'r') { cardRestart(); return; }
    } else if (/^[1-6]$/.test(k)) { go(TABS[+k - 1][0]); return; }
    if (tab === 'topics') {
      if (k === ']') { setFocusT(focusT + 1); return; } if (k === '[') { setFocusT(focusT - 1); return; }
      if (lk === 'e') { expandAll(); return; }
      if (lk === 'c' && focusT >= 0) { var d = topicEls()[focusT]; toggleDone(d.dataset.id, !state.done[code + ':' + d.dataset.id]); return; }
      if ((k === ' ' || k === 'Enter') && focusT >= 0) { e.preventDefault(); var dd = topicEls()[focusT]; dd.open = !dd.open; return; }
    }
    if (tab === 'mocks') {
      if (lk === 't') { toggleTimer(); return; } if (lk === 'a') { mockAnswer(); return; }
      if (k === 'ArrowRight') { mockStep(1); return; } if (k === 'ArrowLeft') { mockStep(-1); return; }
      if (k === 'ArrowDown') { e.preventDefault(); mockFocus(1); return; } if (k === 'ArrowUp') { e.preventDefault(); mockFocus(-1); return; }
    }
  }

  /* ---------- boot ---------- */
  var page = document.body.getAttribute('data-page');
  S.init({
    state: state, save: save, esc: esc, fmt: fmt, renderItems: renderItems, stats: stats, go: go,
    code: function () { return code; }, M: function () { return M; },
    markDone: function (id) { state.done[code + ':' + id] = true; save(); },
    drill: function (id) { fc.topic = id; fc.missed = false; go('cards'); }
  });
  var pb = $('#prefbtn'); if (pb) pb.onclick = S.settings;
  initSearch();
  document.addEventListener('keydown', onKey);
  var hb = $('#helpbtn'); if (hb) hb.onclick = showHelp;
  var th = $('#themebtn'); if (th) th.onclick = function () { onKey({ key: 'd', target: document.body }); };
  if (window.Planner.snapshot(state, window.Review.dayNum())) save();
  window.Timer.init({ state: state, save: save });
  if (page === 'home') { homeRoute(); window.addEventListener('hashchange', homeRoute); }
  else {
    code = (new URLSearchParams(location.search).get('m') || '').toUpperCase(); M = MODS[code];
    window.M_NOW = M;
    if (M && M.exam === undefined) M.exam = {};
    document.title = code + ' revision';
    window.addEventListener('hashchange', route); route();
  }
})();
