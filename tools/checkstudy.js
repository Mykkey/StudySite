// Usage: node tools/checkstudy.js   Checks spaced review, the "Study now" choice and every calculation drill.
const assert = require('assert');
const Review = require('../js/review.js');
const Planner = require('../js/planner.js');
const Drills = require('../js/drills.js');
const Maths = require('../js/maths.js');
let n = 0;
const test = (name, fn) => { try { fn(); n++; } catch (e) { console.log('FAIL ' + name + ': ' + e.message); process.exitCode = 1; } };

const day = Review.dayOf('2027-01-01');
const mod = (ids, cards) => ({ topics: ids.map((id, i) => ({ id, title: id, priority: i + 1 })), flashcards: cards || [], mocks: [{}] });

test('boxes climb and reset', () => {
  const s = {};
  [1, 3, 7, 14, 14].forEach(gap => { Review.rate(s, 'A:c', 'know', day); assert.strictEqual(s.srs['A:c'].due - day, gap); });
  Review.rate(s, 'A:c', 'learn', day);
  assert.deepStrictEqual(s.srs['A:c'], { box: 0, due: day });
});
test('never due after the exam', () => {
  const s = { exams: { A: '2027-01-04' }, srs: { 'A:c': { box: 3, due: day } } };
  Review.rate(s, 'A:c', 'know', day);
  assert.strictEqual(s.srs['A:c'].due, day + 2);
});
test('old marks become due', () => {
  const s = { cards: { 'A:1': 'know', 'A:2': 'learn' } };
  Review.migrate(s, day);
  assert.deepStrictEqual(s.srs, { 'A:1': { box: 2, due: day }, 'A:2': { box: 0, due: day } });
});
test('session: due first, then new cards of finished topics, mixed, max 10', () => {
  const cards = p => Array.from({ length: 8 }, (_, i) => ({ id: p + i, topicId: 't' }));
  const mods = { A: mod(['t'], cards('a')), B: mod(['t'], cards('b')) };
  const s = { done: { 'A:t': true, 'B:t': true }, srs: { 'B:b0': { box: 1, due: day }, 'A:a0': { box: 1, due: day + 5 } } };
  const q = Review.session(s, mods, day).map(x => x.key);
  assert.strictEqual(q.length, 10);
  assert.strictEqual(q[0], 'B:b0');
  assert.deepStrictEqual(q.slice(1, 3), ['A:a1', 'B:b1']);
  assert(!q.includes('A:a0'));
});

const mods = { A: mod(['a1', 'a2']), B: mod(['b1', 'b2', 'b3']) };
test('study now: most pressing module', () => {
  const x = Planner.next({ exams: { A: '2027-01-03', B: '2027-02-01' } }, mods, day);
  assert.strictEqual(x.kind + x.topic.id, 'topica1');
});
test('study now: dated before undated, past skipped', () => {
  assert.strictEqual(Planner.next({ exams: { B: '2027-03-01' } }, mods, day).code, 'B');
  assert.strictEqual(Planner.next({ exams: { A: '2026-12-01' } }, mods, day).code, 'B');
});
test('study now: resume first', () => {
  const x = Planner.next({ pos: { 'A:a2': 3 } }, mods, day);
  assert.strictEqual(x.kind + x.topic.id, 'resumea2');
});
test('study now: change of subject after two in a row', () => {
  const exams = { A: '2027-01-11', B: '2027-01-16' };   // 2/10 and 3/15: equally pressing
  const first = Planner.next({ exams }, mods, day).code, second = first === 'A' ? 'B' : 'A';
  assert.strictEqual(Planner.next({ exams, recent: [first, first] }, mods, day).code, second);
});
test('study now: reviews when ten are due, mock when finished', () => {
  const m = { A: mod(['t'], Array.from({ length: 12 }, (_, i) => ({ id: 'c' + i, topicId: 't' }))) };
  const srs = {}; m.A.flashcards.forEach(c => { srs['A:' + c.id] = { box: 1, due: day }; });
  assert.strictEqual(Planner.next({ srs }, m, day).kind, 'review');
  assert.strictEqual(Planner.next({ done: { 'A:t': true } }, m, day).kind, 'mock');
  assert.strictEqual(Planner.next({ done: { 'A:t': true }, exams: { A: '2026-01-01' } }, m, day).kind, 'none');
});

/* worked examples already on the site */
const ans = (id, p) => Drills.byId(id).make(p).fields.map(f => f.answer);
const near = (got, want, tol = 0.002) => want.forEach((w, i) => assert(Math.abs(got[i] - w) <= tol, `answer ${i}: ${got[i]} != ${w}`));
test('precision/recall example', () => near(ans('prf', { tp: 40, fp: 10, fn: 20, tn: 130 }), [0.8, 0.667, 0.727]));
test('PageRank example', () => near(ans('pagerank', { out: { A: ['B', 'C'], B: ['C'], C: ['A'], D: ['C'] } }), [0.25, 0.144, 0.569, 0.0375]));
test('SLI example', () => near([ans('slo', { days: 30, slo: 99.9, down: 25, elapsed: 15 })[0], ans('slo', { days: 30, slo: 99.9, down: 25, elapsed: 15 })[1]], [99.942, 43.2]));
test('herd immunity example', () => near(ans('epidemic', { R0: 12, D: 7, N: 10000, I: 200 }), [1.714, 0.0343, 91.667], 0.001));
test('nDCG: ideal order scores higher', () => { const a = ans('ndcg', { rel: [3, 2, 3, 0, 1] }); near(a, [5.761, 6.0, 0.96], 0.4); assert(a[2] < 1 && a[1] >= a[0]); });
test('information gain of a perfect split is the parent entropy', () => near(ans('infogain', { a: 4, b: 0, c: 0, d: 4 }), [1, 0, 1]));
test('TAM', () => near(ans('tam', { users: 3000, price: 1200, units: 1, life: 4 }), [300, 900000]));
test('Euler', () => near(ans('euler', { s0: 100, inflow: 30, frac: 0.1, dt: 1 }), [120, 138, 154.2]));
test('mutation ratio', () => near(ans('mutation', { total: 20, eq: 3, killed: 14 }), [82.353, 3], 0.01));
test('tf-idf', () => near(ans('tfidf', { N: 1000, df: 100, tf: 3 }), [1, 3]));

test('typed answers', () => {
  assert.strictEqual(Drills.parse('2/3').toFixed(3), '0.667');
  assert.strictEqual(Drills.parse(' 1,200 '), 1200);
  assert.strictEqual(Drills.parse('80%'), 80);
  assert(isNaN(Drills.parse('')) && isNaN(Drills.parse('abc')));
  assert(Drills.right({ answer: 2 / 3, tol: 0.006 }, '0.67') && !Drills.right({ answer: 2 / 3, tol: 0.006 }, '0.6'));
});

test('every module has a drill', () => ['CT4100', 'CT417', 'CT4111', 'CT4101', 'CT4107', 'CT561'].forEach(c => assert(Drills.forCode(c).length, c)));
let seed = 1;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
Drills.list.forEach(d => test('2000 random ' + d.id, () => {
  for (let i = 0; i < 2000; i++) {
    const x = d.make(d.params(rand));
    x.fields.forEach(f => {
      assert(Number.isFinite(f.answer), f.label + ' not finite: ' + x.q);
      assert(Drills.right(f, String(+f.answer.toFixed(4))), f.label + ' rejects its own answer');
    });
    assert(!/NaN|Infinity|undefined/.test(x.q + JSON.stringify(x.solution)), 'bad text: ' + x.q);
    if (i < 50) x.solution.forEach(l => { if (l.tex) Maths.tex(l.tex, true); else Maths.html(l); });
  }
}));
console.log(n + ' checks passed' + (process.exitCode ? ', some FAILED' : ''));
