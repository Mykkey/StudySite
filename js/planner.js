/* "Study now": picks the next thing to do from exam dates and progress, so you do not have to decide.
   Loads in the browser and in node (for tests). */
(function (root) {
  'use strict';
  var Review = typeof module !== 'undefined' && module.exports ? require('./review.js') : root.Review;

  function mainTopics(m) { return (m.topics || []).filter(function (t) { return t.tier !== 'low'; }).sort(function (a, b) { return a.priority - b.priority; }); }
  /* per module: how much is left, how long is left */
  function info(state, code, m, today) {
    var exam = Review.dayOf((state.exams || {})[code]), days = exam == null ? null : exam - today;
    var all = mainTopics(m), left = all.filter(function (t) { return !(state.done || {})[code + ':' + t.id]; });
    return {
      code: code, days: days, left: left, total: all.length,
      past: days != null && days < 0,
      perDay: days == null || days < 0 ? null : Math.ceil(left.length / Math.max(1, days)),
      urgency: days == null ? left.length / Math.max(1, all.length) : left.length / Math.max(1, days)
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
    if (list.length) {
      var pick = list[0], r = state.recent || [], other = list[1];
      /* a change of subject after two in a row, if something else is nearly as pressing */
      if (other && r.length > 1 && r[r.length - 1] === pick.code && r[r.length - 2] === pick.code && (pick.days == null) === (other.days == null) && other.urgency >= 0.8 * pick.urgency) pick = other;
      return { kind: 'topic', code: pick.code, topic: pick.left[0], why: pick.code + ': ' + when(pick.days) + ', ' + pick.left.length + ' main topics to go.' };
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

  var api = { info: info, ranked: ranked, next: next, href: href, when: when };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Planner = api;
})(this);
