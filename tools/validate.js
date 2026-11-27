// Usage: node tools/validate.js [CODE ...]   Validates data/<CODE>.js against the site schema.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {} }; ctx.window.window = ctx.window; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data/manifest.js'), 'utf8'), ctx);
const codes = process.argv.length > 2 ? process.argv.slice(2) : ctx.window.MANIFEST.map(m => m.code);
const KINDS = { line: ['series'], scatter: ['series'], bar: ['bars'], graph: ['nodes', 'edges'], tree: ['root'], layers: ['layers'], flow: ['steps'], groups: ['groups'] };
let errors = 0, warns = 0;
const err = (c, m) => { errors++; console.log(`  ERROR [${c}] ${m}`); };
const warn = (c, m) => { warns++; console.log(`  warn  [${c}] ${m}`); };
const ART = /[─-╿═-╬]|[+][-]{3,}[+]|\|\s*[-]{3,}/;   // box-drawing / ascii tables

function checkItems(c, where, items, collect) {
  if (!Array.isArray(items)) return err(c, `${where}: items must be an array`);
  items.forEach((it, i) => {
    if (typeof it === 'string') { if (ART.test(it)) err(c, `${where}[${i}]: looks like text art`); collect.push(it); return; }
    if (!it || typeof it !== 'object') return err(c, `${where}[${i}]: bad item`);
    const t = it.type;
    if (['p', 'note', 'warn'].includes(t)) { if (!it.text) err(c, `${where}[${i}] ${t} needs text`); }
    else if (t === 'formula' || t === 'code') { if (!it.text) err(c, `${where}[${i}] ${t} needs text`); else if (ART.test(it.text) && t === 'formula') err(c, `${where}[${i}]: formula looks like text art`); }
    else if (t === 'table') { if (!Array.isArray(it.head) || !Array.isArray(it.rows)) err(c, `${where}[${i}] table needs head/rows`); else it.rows.forEach((r, k) => { if (r.length !== it.head.length) err(c, `${where}[${i}] row ${k} has ${r.length} cells, head has ${it.head.length}`); }); }
    else if (t === 'diagram') {
      const need = KINDS[it.kind]; if (!need) return err(c, `${where}[${i}] unknown diagram kind ${it.kind}`);
      if (!it.data) return err(c, `${where}[${i}] diagram has no data`);
      need.forEach(k => { if (it.data[k] == null) err(c, `${where}[${i}] diagram ${it.kind} missing data.${k}`); });
      if (it.kind === 'graph') { const ids = new Set((it.data.nodes || []).map(n => n.id)); (it.data.edges || []).forEach(e => { if (!ids.has(e.from) || !ids.has(e.to)) err(c, `${where}[${i}] edge ${e.from}->${e.to} references missing node`); }); (it.data.nodes || []).forEach(n => { if (n.x == null || n.y == null) err(c, `${where}[${i}] node ${n.id} needs x,y (0-100)`); }); }
      if (it.kind === 'line' || it.kind === 'scatter') (it.data.series || []).forEach(s => { if (!Array.isArray(s.points) || !s.points.length) err(c, `${where}[${i}] series ${s.name} has no points`); });
    } else err(c, `${where}[${i}] unknown item type ${t}`);
  });
}

codes.forEach(c => {
  const f = path.join(root, 'data', c + '.js');
  console.log(c);
  if (!fs.existsSync(f)) return console.log('  (no data file yet)');
  const cx = { window: {} }; cx.window.window = cx.window; cx.window.MODULES = {}; vm.createContext(cx);
  try { vm.runInContext(fs.readFileSync(f, 'utf8'), cx); } catch (e) { return err(c, 'cannot parse: ' + e.message); }
  const m = cx.window.MODULES[c]; if (!m) return err(c, `file does not set window.MODULES.${c}`);
  const text = []; const topicIds = new Set();
  if (!m.exam || !m.exam.summary) err(c, 'exam.summary missing');
  if (!['past-papers', 'estimated'].includes(m.evidence)) err(c, 'evidence must be "past-papers" or "estimated"');
  if (!Array.isArray(m.topics) || !m.topics.length) err(c, 'no topics');
  (m.topics || []).forEach((t, i) => {
    const w = `topics[${i}:${t.id}]`;
    ['id', 'title', 'priority', 'summary'].forEach(k => { if (t[k] == null || t[k] === '') err(c, `${w} missing ${k}`); });
    if (topicIds.has(t.id)) err(c, `${w} duplicate id`); topicIds.add(t.id);
    if (!/^[a-z0-9-]+$/.test(t.id || '')) err(c, `${w} id must be lowercase-kebab`);
    if (!t.sections || !t.sections.length) err(c, `${w} has no sections`); else t.sections.forEach((s, k) => { if (!s.heading) err(c, `${w}.sections[${k}] no heading`); checkItems(c, `${w}.sections[${k}]`, s.items, text); });
    if (!t.mnemonic) warn(c, `${w} no mnemonic`);
    if (!t.source) warn(c, `${w} no source files cited`);
    if (t.hint && !['likely', 'unlikely'].includes(t.hint)) err(c, `${w} hint must be likely|unlikely`);
    if (t.tier && !['core', 'likely', 'possible', 'low'].includes(t.tier)) err(c, `${w} bad tier`);
  });
  const pri = (m.topics || []).map(t => t.priority); if (new Set(pri).size !== pri.length) warn(c, 'duplicate priority numbers');
  const cids = new Set();
  (m.flashcards || []).forEach((f, i) => { const w = `flashcards[${i}:${f.id}]`; ['id', 'topicId', 'front', 'back'].forEach(k => { if (!f[k]) err(c, `${w} missing ${k}`); }); if (cids.has(f.id)) err(c, `${w} duplicate id`); cids.add(f.id); if (f.topicId && !topicIds.has(f.topicId)) err(c, `${w} unknown topicId ${f.topicId}`); });
  if ((m.flashcards || []).length < 15) warn(c, `only ${(m.flashcards || []).length} flashcards`);
  const mids = new Set();
  (m.methods || []).forEach((x, i) => { const w = `methods[${i}:${x.id}]`; ['id', 'title', 'steps'].forEach(k => { if (!x[k]) err(c, `${w} missing ${k}`); }); if (mids.has(x.id)) err(c, `${w} duplicate id`); mids.add(x.id); if (x.topicId && !topicIds.has(x.topicId)) err(c, `${w} unknown topicId`); if (!x.mnemonic) warn(c, `${w} no mnemonic`); if (!x.example) warn(c, `${w} no worked example`); (x.steps || []).forEach(s => { if (ART.test(s)) err(c, `${w} text art`); }); });
  const pids = new Set();
  (m.practice || []).forEach((p, i) => { const w = `practice[${i}:${p.id}]`; ['id', 'topicId', 'question', 'outline'].forEach(k => { if (!p[k]) err(c, `${w} missing ${k}`); }); if (pids.has(p.id)) err(c, `${w} duplicate id`); pids.add(p.id); if (p.topicId && !topicIds.has(p.topicId)) err(c, `${w} unknown topicId`); });
  (m.mocks || []).forEach((mock, i) => {
    const w = `mocks[${i}]`; if (!mock.title || !mock.questions || !mock.questions.length) return err(c, `${w} needs title/questions`);
    mock.questions.forEach((q, k) => { let sum = 0; (q.parts || []).forEach((p, j) => { sum += +p.marks || 0; if (!p.text || !p.outline || !p.outline.length) err(c, `${w}.q${q.n}.${p.label} needs text/outline`); if (p.topicId && !topicIds.has(p.topicId)) err(c, `${w}.q${q.n}.${p.label} unknown topicId ${p.topicId}`); }); if (sum !== +q.marks) warn(c, `${w} Q${q.n}: parts sum ${sum} but marks ${q.marks}`); });
  });
  if (m.hints && !(m.hints.likely && m.hints.unlikely)) err(c, 'hints needs likely[] and unlikely[]');
  // topics never referenced by cards / methods
  (m.topics || []).forEach(t => { if (!(m.flashcards || []).some(f => f.topicId === t.id)) warn(c, `topic ${t.id} has no flashcards`); });
  console.log(`  topics ${topicIds.size}, flashcards ${cids.size}, methods ${mids.size}, practice ${pids.size}, mocks ${(m.mocks || []).length}`);
});
console.log(`\n${errors} error(s), ${warns} warning(s)`);
process.exit(errors ? 1 : 0);
