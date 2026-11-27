// "Big picture" graphic per topic. G = boxes of short points, F = step-by-step flow.
const G = (...g) => ({ kind: 'groups', data: { groups: g.map(([title, items]) => ({ title, items: items.split('|') })) } });
const F = (...s) => ({ kind: 'flow', data: { direction: 'col', steps: s.map((x, i) => { const [label, sub] = x.split(':'); return { label, sub, color: i % 5 }; }) } });
module.exports = {
  'query-performance-prediction': G(['Pre-retrieval (cheap)', 'AvgIDF|Scope|SCQ|PMI|Query length, ambiguity'], ['Post-retrieval (accurate)', 'Clarity|Stability / robustness|Score analysis (NQC)']),
  'cf-issues-evaluation': G(['Problems', 'Cold start|Sparsity|Scale|Grey sheep|Shilling, noise'], ['Fixes', 'Content information|Hybrid systems'], ['Measures', 'MAE / RMSE|Precision, recall at k|Coverage, diversity, novelty|A/B tests']),
  'query-expansion-analysis': G(['Local analysis', 'Terms from top retrieved docs|Association, metric, scalar clusters'], ['Global analysis', 'Terms from the whole collection'], ['Thesaurus', 'Fixed, hand-built resource']),
  'diversity': F('Candidate items:all relevant ones', 'Score each:relevance minus similarity to what is chosen', 'Pick the best:add it to the list', 'Repeat:until k items'),
  'pseudo-relevance-feedback': F('Run query', 'Assume top k are relevant:no user effort', 'Expand the query:from those documents', 'Run again:risk of query drift if top k were wrong'),
  'tf-idf-weighting': G(['Reward', 'tf: frequent in this document'], ['Penalise', 'idf: common across collection'], ['Adjust', 'Document length normalisation'], ['Query', 'Weight query terms too']),
  'length-normalisation': G(['Why long docs win', 'Verbosity: higher tf|Scope: more distinct terms'], ['Fixes', 'Cosine|Max-tf|Pivoted|BM25'], ['Watch out', 'Do not over-penalise long docs']),
  'axiomatic-weighting': G(['Term frequency', 'TFC1|TFC2'], ['Term discrimination', 'TDC'], ['Length', 'LNC1|LNC2'], ['Interaction', 'TF-LNC']),
  'independence-assumption': G(['Hurts', 'Synonyms do not match|Polysemes not separated|Phrases and order lost'], ['Fixes', 'LSI / embeddings|Query expansion, thesauri|Phrase and proximity models']),
  'ranked-metrics': G(['P@k', 'Precision in the top k'], ['AP / MAP', 'Precision at each relevant doc|MAP averages over queries'], ['MRR', '1 / rank of first relevant'], ['nDCG', 'Graded gains|log discount|Divide by ideal']),
  'cluster-hypothesis-evaluation': G(['Hypothesis', 'Associated documents are relevant to the same requests'], ['Internal', 'RSS'], ['External', 'Purity|Rand index'], ['Task', 'Does retrieval improve?']),
  'inverted-index': F('Documents', 'Tokenise and pre-process', 'Lexicon:sorted vocabulary', 'Postings:sorted doc IDs, tf, positions', 'Query:merge postings, score only matching docs'),
  'boolean-models': G(['Classical Boolean', 'Exact match|No ranking'], ['Extended (p-norm)', 'Graded scores|p = 1: like vector model|p = infinity: min / max'], ['In ranked setting', 'Boolean structure inside a scored query']),
  'web-search': G(['The web is...', 'Huge and distributed|Volatile|Redundant|Adversarial'], ['So we need...', 'Distributed crawl and index|Fresh crawling|De-duplication|Spam defences'], ['Also', 'Links: link analysis|Short queries: query assistance']),
  'user-oriented-evaluation': G(['User measures', 'Coverage|Novelty'], ['Offline', 'Test collections'], ['Online', 'A/B tests|Interleaving|Clicks are biased']),
  'neural-ir': G(['Bag of words (BM25, tf-idf)', 'Exact token match|Terms independent'], ['Neural', 'Dense contextual vectors|car matches automobile|Word order captured']),
};
