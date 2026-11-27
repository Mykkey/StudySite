/* Calculation drills: the same kind of question with new numbers each time, marked straight away.
   Each drill has params(rand) and make(params) -> { q, fields:[{label, answer, tol}], solution:[string | {tex}] }.
   make() is pure so it can be checked in node against known worked examples. */
(function (root) {
  'use strict';
  function int(r, lo, hi) { return lo + Math.floor(r() * (hi - lo + 1)); }
  function pick(r, a) { return a[Math.floor(r() * a.length)]; }
  function f(x, d) { return String(+x.toFixed(d == null ? 3 : d)); }
  function money(x) { return String(+x.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function num(label, answer, tol) { return { label: label, answer: answer, tol: tol == null ? 0.006 : tol }; }
  function sum(a) { return a.reduce(function (s, x) { return s + x; }, 0); }
  function T(s) { return { tex: s }; }

  var DRILLS = [
    {
      id: 'tfidf', title: 'tf-idf weight', codes: ['CT4100'],
      params: function (r) { var N = pick(r, [1000, 5000, 10000]); return { N: N, df: pick(r, [10, 20, 50, 100, 200, 500]), tf: int(r, 1, 9) }; },
      make: function (p) {
        var idf = Math.log10(p.N / p.df), w = p.tf * idf;
        return { q: 'A collection has **' + money(p.N) + '** documents. A term appears in **' + money(p.df) + '** of them, and **' + p.tf + '** times in document d. Find its idf (use log base 10) and its tf-idf weight in d.',
          fields: [num('idf', idf), num('weight', w, 0.011)],
          solution: [T('idf = \\log_{10} \\frac{N}{df} = \\log_{10} \\frac{' + p.N + '}{' + p.df + '} = ' + f(idf)), T('w = tf \\times idf = ' + p.tf + ' \\times ' + f(idf) + ' = ' + f(w))] };
      }
    },
    {
      id: 'ndcg', title: 'DCG and nDCG', codes: ['CT4100'],
      params: function (r) {
        var rel, ideal;
        do { rel = [0, 1, 2, 3, 4].map(function () { return int(r, 0, 3); }); ideal = rel.slice().sort(function (a, b) { return b - a; }); } while (!sum(rel) || rel.join() === ideal.join());
        return { rel: rel };
      },
      make: function (p) {
        function dcg(a) { return sum(a.map(function (x, i) { return x / (Math.log(i + 2) / Math.LN2); })); }
        var ideal = p.rel.slice().sort(function (a, b) { return b - a; }), d = dcg(p.rel), id = dcg(ideal);
        /* two short lines so it fits on a phone */
        function terms(name, a) {
          var t = a.map(function (x, i) { return '\\frac{' + x + '}{\\log_2 ' + (i + 2) + '}'; });
          return [T(name + ' = ' + t.slice(0, 3).join(' + ')), T('+ ' + t.slice(3).join(' + '))];
        }
        return { q: 'A search returns five documents with relevance grades, in rank order: **' + p.rel.join(', ') + '**. Find DCG@5, the ideal DCG@5 and nDCG@5.',
          fields: [num('DCG@5', d, 0.011), num('IDCG@5', id, 0.011), num('nDCG@5', d / id)],
          solution: [].concat(terms('\\var{DCG}', p.rel), [T('= ' + f(d)), 'Ideal order: ' + ideal.join(', ')], terms('\\var{IDCG}', ideal), [T('= ' + f(id)), T('\\var{nDCG} = \\frac{' + f(d) + '}{' + f(id) + '} = ' + f(d / id))]) };
      }
    },
    {
      id: 'pagerank', title: 'One PageRank step', codes: ['CT4100'],
      params: function (r) {
        var P = ['A', 'B', 'C', 'D'], out = {};
        P.forEach(function (a) {
          var others = P.filter(function (b) { return b !== a; }), to = others.filter(function () { return r() < 0.45; });
          out[a] = to.length ? to : [pick(r, others)];
        });
        return { out: out };
      },
      make: function (p) {
        var P = ['A', 'B', 'C', 'D'], Tp = 0.15, next = {};
        var parts = P.map(function (w) {
          var inn = P.filter(function (u) { return p.out[u].indexOf(w) >= 0; });
          next[w] = Tp / 4 + (1 - Tp) * sum(inn.map(function (u) { return 0.25 / p.out[u].length; }));
          var inner = inn.length ? inn.map(function (u) { return '\\frac{0.25}{' + p.out[u].length + '}'; }).join(' + ') : '0';
          return T(w + ' = 0.0375 + 0.85 ( ' + inner + ' ) = ' + f(next[w]));
        });
        return { q: 'Four pages link like this: ' + P.map(function (a) { return '**' + a + '** links to ' + p.out[a].join(', '); }).join('; ') + '. Every page starts at 0.25 and T = 0.15. Find each PageRank after one step (update all pages together).',
          fields: P.map(function (w) { return num(w, next[w]); }),
          solution: ['T/N = 0.15 / 4 = 0.0375. Each page shares its 0.25 equally between its outlinks.'].concat(parts) };
      }
    },
    {
      id: 'prf', title: 'Precision, recall, F1', codes: ['CT4101', 'CT4100'],
      params: function (r) { return { tp: int(r, 5, 60), fp: int(r, 2, 40), fn: int(r, 2, 40), tn: int(r, 40, 200) }; },
      make: function (p) {
        var P = p.tp / (p.tp + p.fp), R = p.tp / (p.tp + p.fn), F = 2 * P * R / (P + R);
        return { q: 'A classifier gives **TP = ' + p.tp + ', FP = ' + p.fp + ', FN = ' + p.fn + ', TN = ' + p.tn + '**. Find precision, recall and F1.',
          fields: [num('precision', P), num('recall', R), num('F1', F)],
          solution: [T('\\var{precision} = \\frac{TP}{TP + FP} = \\frac{' + p.tp + '}{' + (p.tp + p.fp) + '} = ' + f(P)), T('\\var{recall} = \\frac{TP}{TP + FN} = \\frac{' + p.tp + '}{' + (p.tp + p.fn) + '} = ' + f(R)), T('F_1 = \\frac{2 \\times ' + f(P) + ' \\times ' + f(R) + '}{' + f(P) + ' + ' + f(R) + '} = ' + f(F)), 'TN is not used by any of the three.'] };
      }
    },
    {
      id: 'infogain', title: 'Entropy and information gain', codes: ['CT4101'],
      params: function (r) { var a, b, c, d; do { a = int(r, 0, 8); b = int(r, 0, 8); c = int(r, 0, 8); d = int(r, 0, 8); } while (a + b < 2 || c + d < 2 || a + c < 1 || b + d < 1); return { a: a, b: b, c: c, d: d }; },
      make: function (p) {
        function H(x, y) { var n = x + y; return sum([x, y].map(function (k) { return k ? -(k / n) * Math.log(k / n) / Math.LN2 : 0; })); }
        var yes = p.a + p.c, no = p.b + p.d, n = yes + no, l = p.a + p.b, rt = p.c + p.d;
        var h = H(yes, no), hl = H(p.a, p.b), hr = H(p.c, p.d), child = l / n * hl + rt / n * hr;
        return { q: 'A node has **' + yes + ' yes** and **' + no + ' no**. A split gives a left branch with ' + p.a + ' yes, ' + p.b + ' no, and a right branch with ' + p.c + ' yes, ' + p.d + ' no. Find the parent entropy, the weighted child entropy and the information gain (log base 2).',
          fields: [num('parent entropy', h), num('child entropy', child), num('gain', h - child, 0.011)],
          solution: [T('H = - \\sum_{c} p_c \\log_2 p_c'), 'Parent: ' + f(h) + '. Left: ' + f(hl) + '. Right: ' + f(hr) + '.', T('\\text{children} = \\frac{' + l + '}{' + n + '} \\times ' + f(hl) + ' + \\frac{' + rt + '}{' + n + '} \\times ' + f(hr) + ' = ' + f(child)), T('\\var{gain} = ' + f(h) + ' - ' + f(child) + ' = ' + f(h - child))] };
      }
    },
    {
      id: 'slo', title: 'SLI, error budget, burn rate', codes: ['CT417'],
      params: function (r) { var days = pick(r, [7, 28, 30]), slo = pick(r, [99, 99.5, 99.9]), allowed = (1 - slo / 100) * days * 1440; return { days: days, slo: slo, down: Math.max(1, Math.round(allowed * (0.2 + r() * 1.1))), elapsed: int(r, 2, days - 1) }; },
      make: function (p) {
        var win = p.days * 1440, sli = (win - p.down) / win * 100, allowed = (1 - p.slo / 100) * win, used = p.down / allowed * 100, burn = (p.down / allowed) / (p.elapsed / p.days);
        return { q: 'The SLO is **' + p.slo + '%** availability over a **' + p.days + '-day** window. After **' + p.elapsed + ' days** there have been **' + p.down + ' minutes** of downtime. Find the SLI over the whole window (assume no more downtime), the allowed downtime in minutes, the percentage of budget used and the burn rate.',
          fields: [num('SLI %', sli, 0.006), num('allowed minutes', allowed, 0.11), num('budget used %', used, 0.15), num('burn rate', burn, 0.011)],
          solution: ['Window = ' + p.days + ' × 1,440 = ' + money(win) + ' minutes.', T('\\var{SLI} = \\frac{' + win + ' - ' + p.down + '}{' + win + '} \\times 100 = ' + f(sli) + ' \\%'), T('\\text{allowed} = (1 - ' + f(p.slo / 100, 4) + ') \\times ' + win + ' = ' + f(allowed, 2)), T('\\text{used} = \\frac{' + p.down + '}{' + f(allowed, 2) + '} \\times 100 = ' + f(used, 1) + ' \\%'), T('\\text{burn rate} = \\frac{' + f(used / 100) + '}{' + p.elapsed + ' / ' + p.days + '} = ' + f(burn, 2)), burn > 1 ? 'Above 1: the budget will run out before the window ends.' : '1 or below: on track.'] };
      }
    },
    {
      id: 'mutation', title: 'Mutation ratio', codes: ['CT4111'],
      params: function (r) { var total = int(r, 20, 80), eq = int(r, 1, 8); return { total: total, eq: eq, killed: int(r, Math.floor((total - eq) * 0.4), total - eq) }; },
      make: function (p) {
        var m = p.killed / (p.total - p.eq) * 100;
        return { q: 'A tool creates **' + p.total + '** mutants. **' + p.eq + '** are equivalent and your tests kill **' + p.killed + '**. Find the mutation ratio as a percentage, and how many non-equivalent mutants survived.',
          fields: [num('ratio %', m, 0.15), num('survivors', p.total - p.eq - p.killed, 0)],
          solution: [T('\\text{ratio} = \\frac{\\text{killed}}{\\text{total} - \\text{equivalent}} = \\frac{' + p.killed + '}{' + p.total + ' - ' + p.eq + '} = ' + f(m, 1) + ' \\%'), 'Survivors = ' + p.total + ' − ' + p.eq + ' − ' + p.killed + ' = ' + (p.total - p.eq - p.killed) + '. Write tests aimed at these.'] };
      }
    },
    {
      id: 'tam', title: 'Bottom-up TAM', codes: ['CT4107'],
      params: function (r) { return { users: pick(r, [3000, 12000, 20000, 45000, 80000]), price: pick(r, [5, 20, 120, 400, 1200]), units: int(r, 1, 4), life: pick(r, [2, 4, 5]) }; },
      make: function (p) {
        var each = p.price * p.units / p.life, tam = each * p.users;
        return { q: 'Your beachhead has **' + money(p.users) + '** users. Each buys **' + p.units + '** unit(s) at **€' + money(p.price) + '**, and a unit lasts **' + p.life + ' years**. Find the yearly revenue per user and the TAM per year (in euro).',
          fields: [num('per user per year', each, 0.51), num('TAM per year', tam, 1)],
          solution: [T('\\text{per user} = \\frac{' + p.price + ' \\times ' + p.units + '}{' + p.life + '} = ' + f(each, 2)), T('\\var{TAM} = ' + p.users + ' \\times ' + f(each, 2) + ' = ' + f(tam, 0)), 'TAM = €' + money(tam) + ' per year.'] };
      }
    },
    {
      id: 'euler', title: 'Euler steps', codes: ['CT561'],
      params: function (r) { return { s0: pick(r, [50, 100, 200, 400]), inflow: pick(r, [10, 20, 30, 50]), frac: pick(r, [0.1, 0.2, 0.25]), dt: pick(r, [0.5, 1, 2]) }; },
      make: function (p) {
        var s = p.s0, vals = [], lines = [];
        for (var i = 1; i <= 3; i++) {
          var out = p.frac * s, nx = s + p.dt * (p.inflow - out);
          lines.push(T('S_{' + i + '} = ' + f(s, 2) + ' + ' + p.dt + ' \\times (' + p.inflow + ' - ' + f(out, 2) + ') = ' + f(nx, 2)));
          s = nx; vals.push(nx);
        }
        return { q: 'A stock starts at **' + p.s0 + '**. Inflow is a constant **' + p.inflow + '** and outflow is **' + p.frac + ' × stock**. Using Euler with **DT = ' + p.dt + '**, find the stock after each of the first three steps.',
          fields: vals.map(function (v, k) { return num('step ' + (k + 1), v, 0.051); }),
          solution: [T('S_{new} = S + DT \\times (\\var{inflow} - \\var{outflow})')].concat(lines) };
      }
    },
    {
      id: 'epidemic', title: 'Beta, force of infection, herd immunity', codes: ['CT561'],
      params: function (r) { var N = pick(r, [1000, 10000, 50000]); return { R0: pick(r, [2, 3, 4, 5, 6, 12]), D: pick(r, [2, 4, 5, 7]), N: N, I: N * pick(r, [0.005, 0.01, 0.02, 0.05]) }; },
      make: function (p) {
        var beta = p.R0 / p.D, lam = beta * p.I / p.N, hit = (1 - 1 / p.R0) * 100;
        return { q: 'A disease has **R0 = ' + p.R0 + '** and an infectious period of **' + p.D + ' days**. In a population of **' + money(p.N) + '**, **' + money(p.I) + '** are infected. Find beta, the force of infection lambda, and the herd immunity threshold as a percentage.',
          fields: [num('beta', beta), num('lambda', lam, Math.max(0.0002, lam * 0.01)), num('HIT %', hit, 0.15)],
          solution: [T('\\beta = \\frac{R_0}{D} = \\frac{' + p.R0 + '}{' + p.D + '} = ' + f(beta)), T('\\lambda = \\beta \\times \\frac{I}{N} = ' + f(beta) + ' \\times \\frac{' + p.I + '}{' + p.N + '} = ' + f(lam, 5)), T('\\var{HIT} = 1 - \\frac{1}{R_0} = 1 - \\frac{1}{' + p.R0 + '} = ' + f(hit, 1) + ' \\%')] };
      }
    }
  ];

  function byId(id) { return DRILLS.filter(function (d) { return d.id === id; })[0]; }
  function forCode(code) { return DRILLS.filter(function (d) { return d.codes.indexOf(code) >= 0; }); }
  /* "0.8", "80%", "1,200", "€300" and "2/3" are all fine */
  function parse(s) {
    var t = String(s).replace(/[\s,%€]/g, ''), m = /^(-?\d*\.?\d+)\/(\d*\.?\d+)$/.exec(t);
    if (m) return +m[1] / +m[2];
    return /^-?(\d+\.?\d*|\.\d+)$/.test(t) ? +t : NaN;
  }
  function right(field, text) { var v = parse(text); return !isNaN(v) && Math.abs(v - field.answer) <= field.tol + 1e-9; }

  /* ---------- screen ---------- */
  var H, cur = null, count = 0;
  function view(helpers, arg) {
    H = helpers;
    var d = byId(arg);
    if (d) { cur = { d: d }; fresh(); return; }
    cur = null;
    var codes = H.man.map(function (m) { return m.code; }).filter(function (c) { return (!arg || c === arg) && forCode(c).length; });
    var h = '<p><a href="#">&larr; Home</a></p><h1>Calculation drills</h1><p class="lead">New numbers every time. Type your answers, press Enter, see the working.</p>';
    codes.forEach(function (c) {
      h += '<h2>' + c + '</h2><div class="toolbar">' + forCode(c).map(function (x) { return '<a class="btn" href="#drills/' + x.id + '">' + H.esc(x.title) + '</a>'; }).join('') + '</div>';
    });
    if (arg) h += '<p><a href="#drills">All drills</a></p>';
    H.app.innerHTML = h;
  }
  function fresh() {
    cur.x = cur.d.make(cur.d.params(Math.random)); cur.checked = false; cur.n = ++count;
    var x = cur.x;
    var h = '<p><a href="#drills">&larr; All drills</a></p><h1>' + H.esc(cur.d.title) + '</h1><form class="card drill" id="dform" autocomplete="off"><p class="q">' + H.fmt(x.q) + '</p>';
    h += x.fields.map(function (fl, i) { return '<label><span>' + H.esc(fl.label) + '</span><input type="text" inputmode="decimal" id="d' + i + '"><em id="m' + i + '"></em></label>'; }).join('');
    h += '<p class="stat">Round to 3 decimal places. Fractions like 2/3 are accepted.</p><div class="actions"><button class="primary" id="dgo">Check <span class="kbd">Enter</span></button></div><div id="dsol" class="answer" hidden></div></form>';
    H.app.innerHTML = h;
    H.app.querySelector('#dform').onsubmit = function (e) { e.preventDefault(); if (cur.checked) fresh(); else check(); };
    var first = H.app.querySelector('#d0'); if (first) first.focus();
  }
  function check() {
    var x = cur.x, all = true;
    var any = x.fields.some(function (fl, i) { return H.app.querySelector('#d' + i).value.trim(); });
    x.fields.forEach(function (fl, i) {
      var ok = right(fl, H.app.querySelector('#d' + i).value), m = H.app.querySelector('#m' + i);
      m.textContent = ok ? '✓' : '✗ ' + f(fl.answer, Math.abs(fl.answer) < 0.1 ? 5 : 3); m.className = ok ? 'ok' : 'no';
      if (!ok) all = false;
    });
    cur.checked = true;
    var sol = H.app.querySelector('#dsol');
    sol.innerHTML = '<b>' + (all ? 'All correct.' : any ? 'Here is the working.' : 'No worries. Here is how it is done.') + '</b>' + x.solution.map(function (l) { return l.tex ? '<div class="fline">' + root.Maths.tex(l.tex, true) + '</div>' : '<p>' + H.fmt(l) + '</p>'; }).join('');
    sol.hidden = false;
    H.app.querySelector('#dgo').innerHTML = 'New numbers <span class="kbd">Enter</span>';
    H.app.querySelector('#dgo').focus();
    if (all) { H.award('dr:' + cur.d.id + ':' + H.today() + ':' + cur.n + ':' + Date.now(), 10); }
  }

  var api = { list: DRILLS, byId: byId, forCode: forCode, parse: parse, right: right, view: view };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Drills = api;
})(this);
