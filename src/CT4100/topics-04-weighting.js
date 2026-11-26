module.exports = [
{
  id: 'tf-idf-weighting',
  title: 'Term weighting: tf-idf and what makes a good weighting scheme',
  priority: 11,
  tier: 'core',
  freq: '6/9 papers ("main constituents of a good weighting scheme")',
  marks: '8-9 marks',
  summary: '**A good weighting scheme rewards terms frequent in the document (tf), penalises terms frequent across the collection (idf), normalises for document length, and weights query terms: sim = Σ ntf(t,d) × gwt(t) × qwt(t,q).**',
  mnemonic: 'TIL: Term frequency, Inverse document frequency, Length normalisation',
  source: ['CT4100_Notes_05_Weighting_Schemes', 'CT4100_Notes_02a_IR_Models', 'CT4100_Notes_02b_IR_Models_Notes'],
  sections: [
    { heading: 'Core ideas', items: [
      '**tf (term frequency)**: number of occurrences of term t in document d. The more frequent, the better t describes d.',
      '**df (document frequency)**: number of DOCUMENTS containing t (not occurrences). **idf = log(N/df)**: rare terms discriminate between documents; terms in every document get idf 0.',
      '**Resolving power (Luhn 1958):** the best content words are neither too frequent (stop words) nor too rare. tf-idf approximates Luhn\'s upper/lower cut-offs with smooth weights instead of hard thresholds.',
      { type: 'formula', label: 'Basic tf-idf (Spärck Jones / Salton & Fox)', text: 'w(t,d) = f(t,d) × log(N / n_t), f = (possibly normalised) frequency of t in d, N = number of documents, n_t = number of documents containing t.' },
      { type: 'formula', label: 'Max-tf normalised document weight (Salton & Buckley)', text: 'w(t,d) = ( tf(t,d) / max_s tf(s,d) ) × log(N / df(t))' },
      { type: 'formula', label: 'Query weight (Salton & Buckley)', text: 'w(t,q) = ( 0.5 + 0.5 × tf(t,q) / max_s tf(s,q) ) × log(N / df(t)): every query term starts at 0.5 and rises with its frequency in the query.' },
      { type: 'formula', label: 'Sublinear tf', text: 'w(t,d) = 1 + log tf(t,d) if tf > 0, else 0. (base 10: tf 1, 10, 30, 100 gives 1, 2, 2.48, 3). 30 occurrences is not 30 times as significant as 1.' }
    ] },
    { heading: 'General structure of modern schemes', items: [
      { type: 'formula', label: 'Local x global x query', text: 'sim(q,d) = Σ_{t in q∩d} ntf(t,d) × gwt(t) × qwt(t,q); ntf = normalised local frequency, gwt = global weight (idf), qwt = weight of t in the query.' },
      'Example: tf-idf: ntf = tf/max tf, gwt = log(N/df), qwt = 0.5 + 0.5 tf_q/max tf_q. BM25 and pivoted normalisation fit the same mould (local = saturated, length-normalised tf).'
    ] },
    { heading: 'The constituents of a good scheme (2021-22, 2022-23: say these)', items: [
      '1. **Local (term frequency) component:** increases with tf but **sublinear/saturating** (diminishing returns), maybe bounded (BM25 limit k1+1).',
      '2. **Global (discrimination) component:** idf/collection statistics: rare terms weigh more; very common terms (stop words) weigh almost nothing; avoid negative weights.',
      '3. **Document length normalisation:** compensate for longer documents having higher tf (verbosity) and more distinct terms (scope); neither ignore length nor over-penalise (pivoted, BM25 b).',
      '4. **Query term weighting:** repeated query terms and query length treated sensibly.',
      '5. **Satisfies retrieval constraints (axioms):** more query-term occurrences means higher score, adding non-query terms lowers it, discriminative terms count more. (See axiomatic topic.)',
      '6. **Tunable and robust:** few parameters (k1, b, s) tuned per collection; empirically effective; efficient to compute with an inverted index.'
    ] },
    { heading: 'Worked example (tf-idf with cosine) - see also the VSM topic', items: [
      'Collection N = 5. df(cat) = 3 so idf = log10(5/3) = 0.222; df(dog) = 2 so idf = log10(5/2) = 0.398; df(mouse) = df(bird) = 2 so 0.398; df(fish) = 1 so 0.699.',
      'Doc d1 = "cat cat dog": w(cat) = 2 × 0.222 = 0.444, w(dog) = 1 × 0.398 = 0.398. Doc d3 = "dog dog bird": w(dog) = 0.796, w(bird) = 0.398.',
      'Note how rare "fish" (idf 0.699) gets high weight, but tf alone would give "cat" (3 docs) more weight: idf demotes common terms.'
    ] },
    { heading: 'Two simplifying assumptions behind tf-idf', items: [
      '**Bag of words:** order ignored. "Mary is quicker than John" and "John is quicker than Mary" get identical vectors.',
      '**Term independence:** each term weighted in isolation; terms are orthogonal dimensions, so "new" and "york" contribute separately. Both make weighting and indexing tractable and work surprisingly well.'
    ] }
  ],
  pitfalls: [
    'Confusing df (documents containing the term) with collection frequency (total occurrences).',
    'Writing idf as 1/df: it is the LOG of N/df.',
    'Forgetting the length-normalisation constituent in "constituents of a good scheme".',
    'Not using the query weight (0.5 + 0.5 tf/max tf) when asked for the Salton-Buckley scheme.'
  ]
},
{
  id: 'vector-space-model',
  title: 'Vector space model: cosine ranking, strengths and limitations',
  priority: 12,
  tier: 'core',
  freq: '5/9 papers',
  marks: '5-8 marks',
  summary: '**VSM represents documents and queries as weighted term vectors in N-dimensional space and ranks by the cosine of the angle between them; it gives partial matching and ranked output but assumes term independence.**',
  mnemonic: 'DOT over LENGTHS',
  source: ['CT4100_Notes_02a_IR_Models', 'CT4100_Notes_02b_IR_Models_Notes', 'CT4100_Notes_05_Weighting_Schemes'],
  sections: [
    { heading: 'The model', items: [
      'IR model = (D, Q, F, R): document representations, query representations, a framework relating them, and a ranking function R(q_i, d_j).',
      'Index terms t_1 ... t_M (M = vocabulary size). Each document d_j = (w_{1,j}, ..., w_{M,j}); query q = (w_{1,q}, ..., w_{M,q}); weight 0 if the term is absent. Weights are NON-binary (unlike Boolean) and usually tf-idf.',
      '**Similarity** = cosine of the angle between vectors; documents ranked by decreasing similarity. Ranked list lets the user stop anywhere; the top answers can be used for relevance feedback.',
      { type: 'formula', label: 'Cosine similarity', text: 'sim(q,d) = (q · d) / (|q| |d|) = Σ_t w(t,q) w(t,d) / ( sqrt(Σ_t w(t,q)^2) × sqrt(Σ_t w(t,d)^2) ). Range 0..1 for non-negative weights.' },
      'Cosine uses **angle, not length**: scaling a vector (doubling every weight) leaves it unchanged. Because |q| is the same for all documents, it does not affect the ranking.'
    ] },
    { heading: 'Worked ranking example', items: [
      'Documents (term counts): d1 = cat 2, dog 1; d2 = cat 1, mouse 1; d3 = dog 2, bird 1; d4 = bird 2, mouse 1; d5 = cat 1, fish 3. N = 5. Query "cat dog" (tf 1 each, weight = idf).',
      'idf: cat log10(5/3) = 0.222; dog log10(5/2) = 0.398; mouse = bird = 0.398; fish = 0.699. Query vector (cat 0.222, dog 0.398), |q| = 0.456.',
      { type: 'table', head: ['Doc', 'weights', 'dot with q', '|d|', 'cosine'], rows: [
        ['d1', 'cat 0.444, dog 0.398', '0.444(0.222)+0.398(0.398)=0.257', '0.596', '0.257/(0.596×0.456) = **0.946**'],
        ['d3', 'dog 0.796, bird 0.398', '0.796(0.398)=0.317', '0.890', '0.317/(0.890×0.456) = **0.781**'],
        ['d2', 'cat 0.222, mouse 0.398', '0.222(0.222)=0.049', '0.456', '0.049/(0.456×0.456) = **0.237**'],
        ['d5', 'cat 0.222, fish 2.097', '0.049', '2.109', '0.049/(2.109×0.456) = **0.051**'],
        ['d4', 'bird 0.796, mouse 0.398', '0', '0.890', '**0**']
      ] },
      { type: 'diagram', kind: 'bar', data: { title: 'Cosine similarity to query "cat dog"', yLabel: 'cosine', bars: [ { label: 'd1', value: 0.946 }, { label: 'd3', value: 0.781 }, { label: 'd2', value: 0.237 }, { label: 'd5', value: 0.051 }, { label: 'd4', value: 0 } ] }, caption: 'Ranking: d1 > d3 > d2 > d5 > d4. d5 is long (fish dominates its vector) so cosine penalises it despite containing "cat".' }
    ] },
    { heading: 'Strengths (2023-24: "describe VSM, discuss strengths and limitations")', items: [
      'Non-binary weights give **partial matching and a ranked list** (a natural ranking), improving over Boolean.',
      'tf-idf weighting improves performance; simple, intuitive geometry; efficient with an inverted index (only documents sharing query terms need scoring).',
      'Document length normalisation built in through the cosine; flexible: any weighting scheme can be plugged in; query and documents are treated uniformly so a document can be a query (query by example, clustering, relevance feedback via Rocchio).',
      'Easy to extend (feedback, expansion, clustering, LSI).'
    ] },
    { heading: 'Limitations', items: [
      '**Term independence (orthogonality) and bag of words**: ignores synonymy, polysemy, word order, phrases and semantic relations; **vocabulary mismatch**.',
      'Weighting is heuristic (no formal justification of tf-idf); similarity is not a probability of relevance.',
      'Cosine **over-penalises long documents** and can favour short ones; needs better normalisation (pivoted).',
      'High-dimensional, sparse vectors; new documents change idf (global statistics).',
      'Boolean precision lost: cannot express "must contain" or NOT without extension; no handling of structure or proximity.',
      'Fixes: LSI/embeddings, query expansion and feedback, phrase/proximity features, BM25.'
    ] }
  ],
  pitfalls: [
    'Computing cosine without dividing by BOTH vector lengths.',
    'Including query length |q| as if it changes the ranking: it is constant across documents.',
    'Using term counts but forgetting idf (then common terms dominate).',
    'Writing "VSM assumes term independence" without an example of what goes wrong (see independence topic).'
  ]
},
{
  id: 'length-normalisation',
  title: 'Document length normalisation (cosine, max-tf, pivoted) and the concatenated-document problem',
  priority: 13,
  tier: 'core',
  freq: '4/9 papers',
  marks: '5-8 marks',
  summary: '**Long documents have higher tf (verbosity) and more distinct terms (scope); without normalisation they score higher regardless of relevance. Cosine, max-tf, pivoted and BM25 normalisations compensate, and the best ones avoid over-penalising long documents.**',
  mnemonic: 'Verbosity vs Scope; pivot on the average',
  source: ['CT4100_Notes_05_Weighting_Schemes'],
  sections: [
    { heading: 'Why normalise', items: [
      'Longer documents (1) repeat terms more (**verbosity**: higher tf for the same content) and (2) contain more distinct terms (**scope**: genuinely cover more topics), so they match more query terms.',
      'Unnormalised inner product therefore favours long documents irrespective of relevance. Normalisation makes vectors **comparable** across documents of different length.',
      '**Thought experiment (2025-26 P1 Q1d):** let d\' be d concatenated with itself. d\' contains no new information so should score the same as d. With **basic tf-idf and an unnormalised inner product** every tf doubles, so every weight doubles and score(d\',q) = 2 × score(d,q) (e.g. 0.257 becomes 0.514) although d\' is no more relevant. This highlights that raw tf-idf rewards length/repetition, not relevance.',
      '**How modern schemes address it:** (1) cosine normalisation: scaling a vector does not change the cosine, so d\' = d; (2) **sublinear tf** (1 + log tf) and **BM25 saturation** (tf contribution bounded by k1+1) limit repetition gains; (3) **BM25/pivoted length normalisation** relative to the average length; with b = 1 BM25 gives d\' exactly the same score as d (tf and length both double); with b < 1 a small increase is allowed (scope may be real). Example: k1 = 1.2, tf 2 at average length: ntf = 1.375; concatenated (tf 4, length 2×avg, b = 0.75): ntf = 1.443 (not 2.75).'
    ] },
    { heading: 'Approaches', items: [
      { type: 'table', head: ['Method', 'Formula / idea', 'Pros', 'Cons'], rows: [
        ['Cosine (L2) normalisation', 'Divide weights by |d| = sqrt(Σ w^2)', 'Scale invariant, bounded 0..1, simple, built into VSM', 'Over-penalises long documents (which are more likely relevant); favours short docs; length measured via all term weights'],
        ['Max-tf normalisation', 'ntf = a + (1-a) tf / max_s tf (a about 0.4-0.5)', 'Cheap; a sets a floor, dampens tf differences', 'Unstable (max depends on stop-word handling and one outlier term), ignores distribution and true length, a needs tuning'],
        ['Sublinear tf', '1 + log tf', 'Diminishing returns on repetition', 'Does not account for length by itself'],
        ['Pivoted length normalisation', 'Divisor (1-s) + s |d|/avgdl; local part 1 + ln(1 + ln tf); score Σ [1+ln(1+ln tf)] / [(1-s) + s|d|/avgdl] × ln((N+1)/df) × tf_q; s about 0.2', 'Pivot at average length: docs longer than average penalised less than under cosine, shorter ones more; matches observed probability of relevance by length', 'Needs tuning of s (too large over-penalises long documents again)'],
        ['BM25 length component', 'tf / (tf + k1((1-b) + b |d|/avgdl))', 'Smooth, parameter b controls strength, tf saturation too', 'Parameters need tuning; idf can be negative']
      ] },
      'Pivoted normalisation idea: plot probability of relevance against length versus the probability of retrieval; cosine under-retrieves long documents; rotate the normalisation line about the pivot (average length) to correct it.'
    ] },
    { heading: 'Answer template: "explain why normalisation is necessary, describe a technique, discuss effectiveness" (2024-25)', items: [
      '1. Why: verbosity and scope; unfair comparison; example of d concatenated with d.',
      '2. Technique: cosine (state formula, show doubling invariance) or pivoted/BM25 (state formula and parameter).',
      '3. Advantages: scale invariance, bounded scores, comparability.',
      '4. Drawbacks: over-penalises long documents, favours short ones, ignores document scope; needs tuning; sensitive to stop-word choice/outliers.',
      '5. Better: pivoted normalisation relative to average length.'
    ] }
  ],
  pitfalls: [
    'Claiming cosine normalisation is perfect: it over-corrects for long documents with genuine scope.',
    'Not noting that raw tf-idf with an unnormalised dot product doubles the score for a duplicated document.',
    'Mixing up verbosity (repeats) and scope (more topics).',
    'In pivoted normalisation, forgetting that avgdl is the pivot and s controls strength.'
  ]
},
{
  id: 'bm25',
  title: 'BM25 (Okapi): formula, parameters k1 and b, worked example',
  priority: 14,
  tier: 'core',
  freq: '2/9 papers (both 2025-26) but baseline everywhere',
  marks: '5 marks',
  summary: '**BM25 = idf × saturated, length-normalised tf: Σ log((N-df+0.5)/(df+0.5)) × tf(k1+1) / (tf + k1((1-b) + b|d|/avgdl)) × tf_q; k1 controls tf saturation, b controls length normalisation.**',
  mnemonic: 'k1 = Knee of saturation; b = Body-length penalty',
  source: ['CT4100_Notes_05_Weighting_Schemes'],
  sections: [
    { heading: 'Formula and components', items: [
      { type: 'formula', label: 'BM25 score of document d for query q', text: 'score(q,d) = Σ_{t in q} [ log( (N - df_t + 0.5) / (df_t + 0.5) ) ] × [ tf_{t,d} (k1 + 1) / ( tf_{t,d} + k1 ( (1 - b) + b |d| / avgdl ) ) ] × tf_{t,q}' },
      '**Global weight (idf):** log((N-df+0.5)/(df+0.5)) (Robertson-Spärck Jones). Near the classic log(N/df) for rare terms; becomes **negative when df > N/2** (matching a very common term lowers the score). Lucene uses log(1 + (N-df+0.5)/(df+0.5)) to stay positive.',
      '**Local weight:** saturating tf with length normalisation. **Query weight:** tf_{t,q} (often 1).',
      'N = documents, df_t = documents with t, tf_{t,d} = term frequency in d, |d| = document length, avgdl = average length, k1 and b = free parameters.',
      '**k1 (about 1.2-2.0):** controls **tf saturation**. As tf grows the local weight approaches k1+1 (an upper bound). k1 = 0 gives binary (presence only); large k1 approaches raw tf. Larger k1 means tf counts for more and saturates more slowly.',
      '**b (0 to 1, default 0.75):** controls **document length normalisation**. b = 0 none; b = 1 full normalisation by |d|/avgdl; |d|/avgdl > 1 means longer than average, so tf is discounted.',
      { type: 'diagram', kind: 'line', data: { title: 'BM25 tf saturation (average-length document)', xLabel: 'term frequency tf', yLabel: 'local weight tf(k1+1)/(tf+k1)', xMin: 0, xMax: 20, yMin: 0, yMax: 3, series: [ { name: 'k1 = 0.5 (limit 1.5)', points: [[0,0],[1,1],[2,1.2],[3,1.286],[5,1.364],[8,1.412],[12,1.44],[16,1.455],[20,1.463]] }, { name: 'k1 = 1.2 (limit 2.2)', points: [[0,0],[1,1],[2,1.375],[3,1.571],[5,1.774],[8,1.913],[12,2],[16,2.047],[20,2.075]] }, { name: 'k1 = 2 (limit 3)', points: [[0,0],[1,1],[2,1.5],[3,1.8],[5,2.143],[8,2.4],[12,2.571],[16,2.667],[20,2.727]] } ] }, caption: 'The first occurrences matter most; later ones add little. Values computed from tf(k1+1)/(tf+k1).' }
    ] },
    { heading: 'Worked example', items: [
      'N = 1000, avgdl = 100, k1 = 1.2, b = 0.75. Query "information retrieval": df(information) = 100, df(retrieval) = 20.',
      'idf(information) = ln(900.5/100.5) = 2.193; idf(retrieval) = ln(980.5/20.5) = 3.868.',
      '**Doc A:** |d| = 80, tf(information) = 3, tf(retrieval) = 2. Length factor (1-b) + b·80/100 = 0.85, so denominators use k1 × 0.85 = 1.02. information: 3(2.2)/(3 + 1.02) = 1.642, × 2.193 = 3.600. retrieval: 2(2.2)/(2 + 1.02) = 1.457, × 3.868 = 5.635. **Score A = 9.24.**',
      '**Doc B:** same tfs but |d| = 200: length factor 0.25 + 0.75(2) = 1.75, so k1 × 1.75 = 2.1. information: 6.6/5.1 = 1.294 × 2.193 = 2.838; retrieval: 4.4/4.1 = 1.073 × 3.868 = 4.150. **Score B = 6.99** (longer, same tf: penalised).',
      '**Doc C:** |d| = 100, tf(information) = 10, no "retrieval": 10(2.2)/(10 + 1.2) = 1.964 × 2.193 = **4.31**. Ten occurrences of ONE term score far less than a few of both: saturation rewards coverage of query terms.'
    ] },
    { heading: 'Extreme values of b (2025-26 P2 Q1c)', items: [
      '**b = 0:** no length normalisation; the tf part is tf(k1+1)/(tf + k1) for every document. Long documents (naturally larger tf, more terms) are favoured, verbosity rewarded. Example: tf = 3 scores 1.571 whatever the length.',
      '**b = 1:** full normalisation; the denominator uses k1 |d|/avgdl. Long documents are penalised heavily (tf 3: 1.22 at length 2×avg, 1.83 at half average): over-penalises long documents that are genuinely broader (scope) and rewards short ones. A document concatenated with itself gets exactly the same score.',
      '**Neither is desirable** because document length reflects both verbosity (should be corrected) and scope (should not). Observed relevance rises with length, so a partial correction (b about 0.3-0.8) works best; default 0.75.',
      '**Setting b in practice:** tune on a training set of queries with relevance judgements (grid search, e.g. b in {0.2,...,1.0}, k1 in {0.8,...,2.0}), maximise MAP/nDCG with cross-validation; collections with uniform short length (abstracts, tweets) need small b; collections of very variable length (web) larger b; per-field b (BM25F); or learn parameters with LTR/GA.'
    ] },
    { heading: 'BM25 vs tf-idf', items: [
      'BM25 is probabilistic in origin (Robertson-Spärck Jones weights), has bounded saturating tf, integrated length normalisation and two tunable parameters; typically beats plain tf-idf-cosine. Still the standard baseline for neural models; also used as first-stage retrieval and as a feature in LTR.',
      'Weaknesses: parameters need tuning; bag of words (independence); negative idf for very common terms; no semantic matching.'
    ] }
  ],
  pitfalls: [
    'Mixing up k1 and b: k1 = tf saturation, b = length normalisation.',
    'Forgetting the (k1+1) in the numerator and the idf term.',
    'Saying b = 1 is "best because it fully normalises": it over-penalises long, genuinely broad documents.',
    'Using log10 vs ln inconsistently within one calculation.'
  ]
},
{
  id: 'axiomatic-weighting',
  title: 'Axiomatic approaches to weighting (retrieval constraints)',
  priority: 15,
  tier: 'likely',
  freq: '4/9 papers',
  marks: '8 marks',
  summary: '**Axiomatic IR states formal constraints (TFC1, TFC2, TDC, LNC1, LNC2, TF-LNC) that any good ranking function should satisfy, then uses them to analyse, design and learn weighting schemes.**',
  mnemonic: 'More matches up, filler down, rare words count, repeats taper',
  source: ['CT4100_Notes_05_Weighting_Schemes', 'past papers (not in notes)'],
  sections: [
    { heading: 'Idea', items: [
      'Instead of designing weighting functions by trial and error, state **desirable properties (axioms/constraints)** about how the similarity of a document to a query should CHANGE when the document is modified (terms added, repeated, concatenated). A good function satisfies all the constraints. (Fang, Tao, Zhai 2004; notes: "axiomatic and inductive approaches state constraints that good functions should satisfy, which can be used to analyse, design and learn weighting schemes".)'
    ] },
    { heading: 'The constraints', items: [
      { type: 'table', head: ['Constraint', 'Statement', 'Intuition'], rows: [
        ['TFC1 (term frequency)', 'Same length documents, d1 has more occurrences of query term w than d2: score(d1) > score(d2)', 'More occurrences of a query term = higher score'],
        ['TFC2 (diminishing returns)', 'The gain from an extra occurrence decreases as tf grows (1st to 2nd occurrence adds more than 2nd to 3rd)', 'Sublinear tf, saturation'],
        ['TFC3', 'With equal total tf, prefer the document matching more DISTINCT query terms', 'Coverage of the query'],
        ['TDC (term discrimination)', 'Two documents otherwise equal, one has the more discriminative (higher idf) query term: higher score', 'Rare terms matter more: idf'],
        ['LNC1 (length)', 'Adding a NON-query term to a document must decrease its score', 'Penalise irrelevant content / longer docs'],
        ['LNC2', 'A document concatenated with itself k times must score at least as high as the original', 'Do not penalise longer documents more than justified'],
        ['TF-LNC', 'Adding extra occurrences of a query term to a document must increase its score even though length grows', 'Match evidence outweighs length penalty']
      ] },
      'The 2021-22 phrase "how the similarity should change given the addition of terms to a document" refers to: adding a query term (TFC1, TF-LNC: score up) vs adding a non-query term (LNC1: score down) vs adding repeated content (LNC2).'
    ] },
    { heading: 'How well-known schemes adhere (2021-22 Q3b, 2024-25 Q1c)', items: [
      '**BM25:** TFC1 yes (increasing in tf); TFC2 yes (concave, bounded by k1+1); TDC yes through idf (but idf becomes negative if df > N/2, violating the spirit); LNC1 yes when b > 0 (longer document, lower score); LNC2 yes for b < 1 or equal at b = 1; TF-LNC yes.',
      '**Raw tf-idf with unnormalised dot product:** TFC1 yes but not TFC2 (linear tf); no length penalty so it violates LNC1 and doubles on concatenation. **Cosine-normalised tf-idf:** LNC1 by the larger norm; but over-penalises, TF-LNC and LNC2 can be problematic. **Pivoted normalisation:** can violate constraints for large s; the constraints give parameter bounds.',
      'Use the axioms to explain why log tf, idf and length normalisation are the constituents of a good scheme.'
    ] },
    { heading: 'Advantages of the axiomatic approach (2022-23, 2021-22)', items: [
      '**Principled and analytical:** replaces trial and error with explicit, interpretable requirements; independent of collection and model.',
      '**Diagnosis:** shows exactly where an existing function fails (which constraint, under which parameters), and gives parameter ranges (e.g. bounds on s or b) that keep a function valid.',
      '**Design guidance:** modify the function until all constraints hold (e.g. repair BM25 negative idf); gives improvements without extensive tuning.',
      '**Reduces dependence on test collections** and expensive relevance judgements; helps explain results; constraints can be used as regularisers or inductive bias when learning weighting functions (GP/neural) so evolved functions stay sensible and generalise.',
      '**Limitations:** constraints are necessary not sufficient (a function can satisfy all and still perform badly); choosing the constraint set is subjective; limited to bag-of-words scoring; still needs empirical validation.'
    ] }
  ],
  pitfalls: [
    'Reciting names without stating what each axiom says in terms of adding terms to a document.',
    'Saying axioms guarantee good performance: they are necessary conditions.',
    'Forgetting to relate a concrete scheme (tf-idf or BM25) to the axioms when asked.'
  ]
},
{
  id: 'text-statistics',
  title: 'Text statistics: tokens/types, Zipf\'s law, Heaps\' law, Luhn',
  priority: 29,
  tier: 'possible',
  freq: '0/9 papers directly; supports weighting and index design',
  marks: '3-5 marks',
  summary: '**Zipf: frequency × rank is roughly constant (a few words dominate, half the types occur once); Heaps: vocabulary M = k·T^β grows without bound with collection size T (β about 0.4-0.6).**',
  mnemonic: 'Zipf = rank-frequency; Heaps = vocabulary growth',
  source: ['CT4100_Notes_05_Weighting_Schemes'],
  sections: [
    { heading: 'Tokens and types', items: [
      'Token = one occurrence of a word; type = a distinct word. "the cat sat on the mat": 6 tokens, 5 types.',
      'A few types are very common (the two most frequent can be about 10% of tokens; top 10 over 20% in TREC Vol. 3 of 125.7M tokens, 508k types); about half of all types occur once (hapax legomena).'
    ] },
    { heading: 'Zipf\'s law', items: [
      { type: 'formula', label: 'Zipf', text: 'f × r ≈ constant, i.e. f ≈ C / r (more generally f ∝ r^(-α), α ≈ 1): a straight line on a log-log plot. r = rank by frequency, f = frequency.' },
      { type: 'diagram', kind: 'line', data: { title: 'Zipf on TREC Volume 3: observed vs C/r', xLabel: 'rank', yLabel: 'occurrences (millions)', xMin: 1, xMax: 10, yMin: 0, yMax: 8, series: [ { name: 'observed', points: [[1,7.40],[2,3.89],[3,3.36],[4,3.32],[5,2.31],[6,1.56],[7,1.31],[8,1.14],[9,1.07],[10,1.03]] }, { name: 'C/r with C = 7.4', points: [[1,7.4],[2,3.7],[3,2.47],[4,1.85],[5,1.48],[6,1.23],[7,1.06],[8,0.93],[9,0.82],[10,0.74]] } ] }, caption: 'Counts from the notes (the, of, to, and, in, is, for, The, that, said). The fit is approximate: the top ten account for about 20% of tokens.' },
      'Implications: stop words (head) carry little information; very rare words (tail) are poor for matching and for learning; middle-frequency words have highest **resolving power (Luhn)**; compression and index design exploit the skew; idf is justified because document frequency follows the same skew.'
    ] },
    { heading: 'Heaps\' law', items: [
      { type: 'formula', label: 'Heaps', text: 'M = k T^β, M = vocabulary size (types), T = collection size in tokens, typically 10 ≤ k ≤ 100 and 0.4 ≤ β ≤ 0.6.' },
      'Brown corpus fit: M = 22 T^0.56. Vocabulary never stops growing (misspellings, names, numbers, identifiers). Implication: the dictionary may not fit in memory for large collections; indexes must handle growth.'
    ] }
  ],
  pitfalls: ['Confusing tokens and types.', 'Stating Heaps with β > 1: vocabulary grows sublinearly.']
}
];
