/* "Study now": picks the next thing to do from exam dates and progress, so you do not have to decide.
   Loads in the browser and in node (for tests). */
(function (root) {
  'use strict';
  var Review = typeof module !== 'undefined' && module.exports ? require('./review.js') : root.Review;

  function mainTopics(m) { return (m.topics || []).filter(function (t) { return t.tier !== 'low'; }).sort(function (a, b) { return a.priority - b.priority; }); }
  /* days kept free before each exam for exam paper revision */
  function paperDays(state, code) { return Math.max(0, Math.min(60, Math.floor(+(state.paperDays || {})[code]) || 0)); }
  /* remember what was already done when the day began, so today's list does not move as you tick things off */
  function snapshot(state, today) {
    if (state.start && state.start.day === today) return false;
    state.start = { day: today, done: Object.keys(state.done || {}) };
    return true;
  }
  /* day by day from today to the last exam: topics to learn, modules on paper revision, exams.
     Soonest deadline first, each topic goes on the lightest day before its module's paper revision starts,
     so the days come out about equally full.
     Worked out afresh each time, so anything missed is shared over the days that are left. */
  function schedule(state, mods, today) {
    today = today == null ? Review.dayNum() : today;
    var done = state.done || {}, early = {};
    (state.start && state.start.day === today ? state.start.done : Object.keys(done)).forEach(function (k) { early[k] = true; });
    var dated = [], undated = [];
    Object.keys(mods).forEach(function (c) { var i = info(state, c, mods[c], today); if (i.days == null) undated.push(c); else if (!i.past) dated.push(i); });
    dated.sort(function (a, b) { return a.days - b.days; });
    var days = [], tight = [], last = dated.length ? dated[dated.length - 1].days : -1, n;
    for (n = 0; n <= last; n++) days.push({ day: today + n, topics: [], papers: [], exams: [] });
    var load = days.map(function () { return 0; });
    dated.slice().sort(function (a, b) { return a.study - b.study; }).forEach(function (x) {
      days[x.days].exams.push(x.code);
      for (var d = Math.max(0, x.days - paperDays(state, x.code)); d < x.days; d++) days[d].papers.push(x.code);
      var list = mainTopics(mods[x.code]).filter(function (t) { var k = x.code + ':' + t.id; return !(done[k] && early[k]); });
      if (!list.length) return;
      if (x.study === 0 && x.left.length) tight.push(x.code);
      if (x.days === 0) return;
      var span = Math.max(1, x.study), picked = [];
      list.forEach(function () {
        var best = 0, d;
        for (d = 1; d < span; d++) if (load[d] < load[best]) best = d;
        load[best]++; picked.push(best);
      });
      picked.sort(function (a, b) { return a - b; });   /* most important topics on the earliest of those days */
      list.forEach(function (t, i) { days[picked[i]].topics.push({ code: x.code, topic: t, done: !!done[x.code + ':' + t.id] }); });
    });
    return { days: days, tight: tight, undated: undated };
  }
  /* per module: how much is left, how long is left */
  function info(state, code, m, today) {
    var exam = Review.dayOf((state.exams || {})[code]), days = exam == null ? null : exam - today;
    var all = mainTopics(m), left = all.filter(function (t) { return !(state.done || {})[code + ':' + t.id]; });
    var study = days == null || days < 0 ? null : Math.max(0, days - paperDays(state, code));
    return {
      code: code, days: days, study: study, left: left, total: all.length,
      past: days != null && days < 0,
      perDay: study == null ? null : Math.ceil(left.length / Math.max(1, study)),
      urgency: days == null ? left.length / Math.max(1, all.length) : left.length / Math.max(1, days - paperDays(state, code))
    };
  }
  /* modules with work left, most pressing first; undated ones after dated ones */
  function ranked(state, mods, today) {
    return Object.keys(mods).map(function (c) { return info(state, c, mods[c], today); })
      .filter(function (x) { return !x.past && x.left.length; })
      .sort(function (a, b) { return (a.days == null) - (b.days == null) || b.urgency - a.urgency || (a.days || 0) - (b.days || 0); });
  }
  function when(d) { return d == null ? 'no exam date set' : d === 0 ? 'exam today' : d === 1 ? 'exam tomorrow' : 'exam in ' + d + ' days'; }

  function next(state, mods, today) {
    today = today == null ? Review.dayNum() : today;
    var due = Review.pool(state, mods, today).due.length;
    if (due >= Review.SIZE) return { kind: 'review', why: due + ' cards are due. A set of ' + Review.SIZE + ' takes a few minutes.' };
    var list = ranked(state, mods, today), i, j, x;
    for (i = 0; i < list.length; i++) {
      x = list[i];
      for (j = 0; j < x.left.length; j++) if ((state.pos || {})[x.code + ':' + x.left[j].id]) return { kind: 'resume', code: x.code, topic: x.left[j], why: 'You are partway through this one (' + when(x.days) + ').' };
    }
    /* follow today's calendar first, then paper revision, then get ahead */
    var plan = schedule(state, mods, today).days[0] || { topics: [], papers: [] };
    var todo = plan.topics.filter(function (p) { return !p.done; }), planned = {};
    todo.forEach(function (p) { if (!planned[p.code]) planned[p.code] = p.topic; });
    var onPlan = list.filter(function (y) { return planned[y.code]; });
    if (!onPlan.length && plan.papers.length) return { kind: 'mock', code: plan.papers[0], why: 'Today is set aside for ' + plan.papers.join(', ') + ' exam paper revision.' };
    if (list.length) {
      var from = onPlan.length ? onPlan : list, pick = from[0], r = state.recent || [], other = from[1];
      /* a change of subject after two in a row, if something else is nearly as pressing */
      if (other && r.length > 1 && r[r.length - 1] === pick.code && r[r.length - 2] === pick.code && (pick.days == null) === (other.days == null) && other.urgency >= 0.8 * pick.urgency) pick = other;
      var rest = onPlan.length ? todo.length + (todo.length === 1 ? ' topic' : ' topics') + ' left on today\'s plan.' : pick.left.length + ' main topics to go.';
      return { kind: 'topic', code: pick.code, topic: planned[pick.code] || pick.left[0], why: pick.code + ': ' + when(pick.days) + ', ' + rest };
    }
    if (due) return { kind: 'review', why: due + (due === 1 ? ' card is' : ' cards are') + ' due.' };
    var open = Object.keys(mods).filter(function (c) { return !info(state, c, mods[c], today).past && (mods[c].mocks || []).length; });
    open.sort(function (a, b) { var p = info(state, a, mods[a], today).days, q = info(state, b, mods[b], today).days; return (p == null) - (q == null) || (p || 0) - (q || 0); });
    if (open.length) return { kind: 'mock', code: open[0], why: 'Every main topic is done. Try a mock paper.' };
    return { kind: 'none', why: 'All your exams are over. Well done.' };
  }
  function href(n) {
    if (n.kind === 'review') return '#review';
    if (n.kind === 'mock') return 'module.html?m=' + n.code + '#mocks';
    if (n.kind === 'none') return '#';
    return 'module.html?m=' + n.code + '#learn/' + n.topic.id;
  }

  var api = { paperDays: paperDays, snapshot: snapshot, schedule: schedule, info: info, ranked: ranked, next: next, href: href, when: when };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Planner = api;
})(this);
