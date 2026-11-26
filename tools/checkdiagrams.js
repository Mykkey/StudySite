// Renders every diagram in every module through js/diagrams.js and flags errors / NaN output.
const vm = require('vm'), fs = require('fs');
const cx = { window: {}, Math, Object, String, Array, JSON, isFinite }; cx.window.window = cx.window; vm.createContext(cx);
vm.runInContext(fs.readFileSync('js/diagrams.js', 'utf8'), cx);
cx.window.MODULES = {};
['CT4100', 'CT417', 'CT4111', 'CT4101', 'CT4107', 'CT561'].forEach(c => vm.runInContext(fs.readFileSync('data/' + c + '.js', 'utf8'), cx));
let n = 0, bad = 0;
const walk = (c, where, items) => (items || []).forEach((it, i) => { if (it && it.type === 'diagram') { n++; const h = cx.window.Diagrams.render(it.kind, it.data, it.caption); if (/Diagram error|Unknown diagram|NaN|undefined|Infinity/.test(h)) { bad++; console.log('BAD', c, where, it.kind, (h.match(/Diagram error[^<]*|NaN|undefined|Infinity/) || [])[0]); } } });
Object.entries(cx.window.MODULES).forEach(([c, m]) => {
  m.topics.forEach(t => t.sections.forEach(s => walk(c, t.id, s.items)));
  (m.methods || []).forEach(x => { if (x.diagram) { n++; const h = cx.window.Diagrams.render(x.diagram.kind, x.diagram.data, x.diagram.caption); if (/Diagram error|NaN|undefined|Infinity/.test(h)) { bad++; console.log('BAD', c, x.id); } } });
});
console.log(n + ' diagrams, ' + bad + ' bad');
