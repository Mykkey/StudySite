# Content schema (for authoring src/<CODE>/*.js parts)

Run `node tools/build.js <CODE>` then `node tools/validate.js <CODE>`; the validator must report 0 errors.
Text strings support only `**bold**` and `` `code` `` inline. No HTML. No ASCII/box-drawing art anywhere: use `diagram` items, `table` items or `code` items.

## meta.js
```js
module.exports = {
  name: 'Information Retrieval',
  evidence: 'past-papers',            // or 'estimated' when there are no past papers
  exam: {
    summary: ['4 bullets: duration, number of questions, choice rules, marks per question'],
    structure: [{ label: 'Q1 (compulsory)', detail: '40 marks: eight 5-mark parts' }],
    freq: [{ topic: 'BM25', count: 3, of: 9 }],      // past-paper tally, most frequent first; omit if no papers
    years: [{ year: '2025-26 Paper 1', themes: ['Q1a VSM similarity (5)', '...'] }],  // omit if no papers
    tips: ['how to score marks / answer style / time per mark'],
    note: 'optional caveat'
  },
  hints: null,   // or { source: 'Reported by student from lecturer X; unverified', likely: [...], unlikely: [...], questionShapes: [...], notes: [...] }
};
```

## topics-*.js (array)
```js
{ id: 'bm25',                 // lowercase-kebab, unique, used by cards/methods/practice/mocks
  title: 'BM25 weighting',
  priority: 1,                // 1 = revise first; unique integers across the module
  tier: 'core',               // core | likely | possible | low  ('low' goes to "Only if time")
  hint: 'likely',             // optional: likely | unlikely (lecturer hint)
  freq: '5/9 papers',         // evidence string; for no-paper modules use 'est. high' etc.
  marks: '5-10 marks',        // typical mark value
  summary: 'One bold sentence stating what to remember.',
  mnemonic: 'A short memory hook',
  source: ['CT4100_Notes_05_Weighting_Schemes'],
  sections: [ { heading: 'Definition', items: [ 'bullet string', { type:'p', text }, { type:'note', text }, { type:'warn', text },
      { type:'formula', label:'BM25 term weight', text:'...' }, { type:'code', text:'...' },
      { type:'table', head:['A','B'], rows:[['1','2']] },
      { type:'diagram', kind:'line', data:{...}, caption:'...' } ] } ],
  pitfalls: ['common ways marks are lost']
}
```
Aim: enough detail that a student reading only this topic could write a full-mark answer to any question on it (definitions, why/how, advantages/disadvantages, formulas with every symbol explained, a worked mini-example where it is calculational). Consecutive strings render as one bullet list; use short bullets, not paragraphs.

## Diagram kinds (data-driven SVG; coordinates for graph nodes are 0-100)
- `line` / `scatter`: `{ title, xLabel, yLabel, series:[{name, points:[[x,y],...]}], hlines?:[{y,label}], points?:[{x,y,label}], xMin?,xMax?,yMin?,yMax? }`
- `bar`: `{ title, yLabel, bars:[{label, value, color?}] }`
- `graph`: `{ title?, directed?:true, r?:22, height?:360, nodes:[{id,label?,sub?,x,y,color?}], edges:[{from,to,label?,curve?}] }` (use for link graphs, state machines, git history, architecture boxes as nodes, pipelines with branches)
- `tree`: `{ root:{ label, children:[{ label, edge?, children? }] } }` (decision trees, hierarchies, dendrograms)
- `layers`: `{ title?, layers:[3,5,5,2], labels?:['Input','Hidden','Hidden','Output'] }` (neural nets)
- `flow`: `{ steps:['A', {label:'B', sub:'detail', color:0}], direction?:'row'|'col', loopBack?:'text' }` (pipelines, lifecycles, processes)
Use diagrams wherever a picture helps (curves, graphs, trees, pipelines). Numbers in charts must be real/consistent with the worked example, not decorative.

## cards-*.js (array of flashcards)
`{ id:'bm25-b', topicId:'bm25', front:'What does BM25 parameter b control?', back:'Document length normalisation (0 = none, 1 = full)', hook:'optional memory hook' }`
One fact per card; front is a question or term; back is <= 2 short sentences. Cover EVERY definition, formula (symbol meanings), list ("name the 4 ..."), comparison and acronym in the module, not only exam-hot ones. Ids unique per module. Typically 80-200 per module.

## methods-*.js (array of problem-solving recipes)
`{ id:'cosine-sim', topicId:'vsm', title:'Compute cosine similarity', when:'Asked to rank documents against a query', mnemonic:'DOT over LENGTHS', steps:['1. ...','2. ...'], example:{ problem:'...', solution:['step with numbers', '...'] }, diagram?:{kind,data,caption} }`
Steps are short imperative lines (4-8). Every worked example must have numbers you have actually computed correctly.

## practice-*.js (array: REAL past-paper questions)
`{ id:'2025-p1-q1e', topicId:'bm25', source:'2025-26 Paper 1 Q1(e)', marks:5, question:'verbatim or lightly cleaned text', outline:['marking-point bullets a full-mark answer contains'] }`
Include every question from every past paper provided, one entry per lettered part (or per question if parts are tiny).

## mocks-*.js (array of mock papers)
`{ id:'mock1', title:'Mock Paper 1', duration:120, instructions:'Answer ...', questions:[ { n:1, marks:20, scenario:'optional shared scenario text', parts:[ { label:'a', marks:5, text:'...', topicId:'bm25', outline:['full-mark answer points'] } ] } ] }`
Part marks must sum to the question marks. Original questions in the real paper's style (never copy past questions). Outlines must be complete enough to self-mark.
