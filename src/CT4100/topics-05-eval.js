module.exports = [
{
  id: 'precision-recall',
  title: 'Precision, recall, F-measure and the precision-recall graph',
  priority: 9,
  tier: 'core',
  freq: '8/9 papers (PR graph 5 times)',
  marks: '5-8 marks',
  summary: '**Precision = relevant retrieved / retrieved; recall = relevant retrieved / all relevant. For a ranked list, compute P and R after each relevant document, interpolate precision (max precision at recall >= r) at the 11 standard recall levels, plot, and average over queries.**',
  mnemonic: 'P = Positives found right; R = Reality covered',
  source: ['CT4100_Notes_04_Metrics'],
  sections: [
    { heading: 'Definitions', items: [
      'Test collection: documents D, information needs/queries, relevance judgements for query-document pairs (Cranfield paradigm; TREC with **pooling**: judge only the top-k of each system). Relevance is judged for the information NEED, not the query string.',
      'R = relevant set for the query; A = answer set returned.',
      { type: 'formula', label: 'Precision and recall', text: 'Precision = |R ∩ A| / |A| = TP / (TP + FP);   Recall = |R ∩ A| / |R| = TP / (TP + FN)' },
      { type: 'table', head: ['', 'Relevant', 'Non-relevant'], rows: [['Retrieved', 'True positive (TP)', 'False positive (FP)'], ['Not retrieved', 'False negative (FN)', 'True negative (TN)']] },
      { type: 'formula', label: 'F-measure (weighted harmonic mean)', text: 'F_β = (β^2 + 1) P R / (β^2 P + R);  F1 = 2PR/(P + R). β > 1 emphasises recall, β < 1 emphasises precision.' },
      'Trade-off: returning everything gives recall 1 but poor precision. Recall never decreases as more documents are returned; precision usually decreases. Web search emphasises precision (P@10); legal/patent/research emphasise recall.',
      '**Why accuracy is not used in IR:** (tp + tn)/all is dominated by the huge number of true negatives (almost all documents are non-relevant), so a system returning nothing scores about 99.99%.',
      'Harmonic mean (not arithmetic) is used for F because it is low if either P or R is low.',
      'Lecture example: |D| = 20, |R| = 10, ranked list of 10. After the first document: P = 1, R = 0.1; after two: P = 1, R = 0.2; after three (third not relevant): P = 0.67, R = 0.2; plot for recall 0% to 100%. Curves: system A better at low recall (web search?), system B better at high recall (legal search?). Average over N queries: P(r) = (1/N) Σ_i P_i(r).',
      '**Precision histogram:** compare two systems A and B by plotting R-precision difference RP_A - RP_B for each query (positive = A better); use a paired test over queries to see if the difference is real.'
    ] },
    { heading: 'Building a precision-recall graph (2021-22, 2022-23, 2024-25: 5-8 marks)', items: [
      '1. Take the ranked answer set and the judgements; know |R| (total relevant in collection).',
      '2. Go down the ranking; at each rank k compute precision = (relevant in top k)/k and recall = (relevant in top k)/|R|.',
      '3. Recall only changes at relevant documents; so the sawtooth curve has a point at each relevant document.',
      '4. **Interpolate:** P_interp(r) = max precision at any recall level ≥ r (removes the sawtooth, makes the curve non-increasing).',
      '5. Evaluate at the 11 standard recall levels 0, 0.1, ..., 1.0.',
      '6. **Average over all queries:** P(r) = (1/N_q) Σ_i P_i(r); plot precision (y) against recall (x).',
      'Reading it: a curve high and to the right is better; an ideal system has precision 1 at recall 1; a system better at low recall (system A, web search) vs better at high recall (system B, legal search) cross over. Gives a summary of behaviour over the whole ranking and lets us compare systems; area under the curve approximates MAP.'
    ] },
    { heading: 'Worked example', items: [
{"type":"task","show":1,"q":["Find precision and recall at each rank. Then at cut-off 10 find P, R, F1 and F2, and the 11-point interpolated precision."]},
      'Ranked list of 10 documents, relevant ones at ranks 1, 3, 6, 8; collection has |R| = 5 relevant documents (one never retrieved).',
      { type: 'table', head: ['Rank', 'Relevant?', 'Precision', 'Recall'], rows: [['1', 'yes', '1/1 = 1.000', '1/5 = 0.2'], ['2', 'no', '1/2 = 0.500', '0.2'], ['3', 'yes', '2/3 = 0.667', '2/5 = 0.4'], ['4', 'no', '2/4 = 0.500', '0.4'], ['5', 'no', '2/5 = 0.400', '0.4'], ['6', 'yes', '3/6 = 0.500', '3/5 = 0.6'], ['7', 'no', '3/7 = 0.429', '0.6'], ['8', 'yes', '4/8 = 0.500', '4/5 = 0.8'], ['9', 'no', '4/9 = 0.444', '0.8'], ['10', 'no', '4/10 = 0.400', '0.8']] },
      'At cut-off 10: P = 0.4, R = 0.8, F1 = 2(0.4)(0.8)/1.2 = 0.533, F2 = 5(0.4)(0.8)/(4(0.4)+0.8) = 0.667 (recall weighted).',
      '**Interpolation:** recall 0 to 0.2: max precision at recall ≥ level = 1.0; 0.3 and 0.4: 0.667; 0.5 to 0.8: 0.5 (best precision after recall 0.5 is 0.5); 0.9 and 1.0: 0 (those recall levels are never reached).',
      { type: 'table', head: ['Recall', '0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'], rows: [['Interpolated precision', '1.0', '1.0', '1.0', '0.667', '0.667', '0.5', '0.5', '0.5', '0.5', '0', '0']] },
      { type: 'diagram', kind: 'line', data: { title: 'Interpolated precision-recall curve (11 points)', xLabel: 'recall', yLabel: 'interpolated precision', xMin: 0, xMax: 1, yMin: 0, yMax: 1.05, series: [ { name: 'interpolated', points: [[0,1],[0.1,1],[0.2,1],[0.3,0.667],[0.4,0.667],[0.5,0.5],[0.6,0.5],[0.7,0.5],[0.8,0.5],[0.9,0],[1,0]] }, { name: 'raw (P,R at each relevant doc)', points: [[0.2,1],[0.4,0.667],[0.6,0.5],[0.8,0.5]] } ] }, caption: 'Values from the worked table: the interpolated curve is the upper envelope of the raw points.' }
    ] },
    { heading: 'Advantages and limitations of precision and recall (2021-22 P2: 7 marks)', items: [
      '**Advantages:** widely used, well defined, interpretable, plots summarise behaviour across the ranking.',
      '**Limitations:** (1) recall needs complete judgements for all relevant documents, impossible on the web/large collections (pooling gives incomplete judgements); (2) binary relevance: ignores graded relevance and where in the ranking relevant documents appear (for the unranked versions); (3) batch mode: ignores user interaction, effort, session; (4) averaged curves hide per-query variation; (5) may not interest users (users look only at the top few results; recall irrelevant on the web); (6) assume relevance is independent per document: ignores redundancy/novelty and diversity; (7) the two numbers must be combined to compare systems; (8) judgements are subjective, judges disagree (Cohen kappa).',
      '**Alternatives:** F-measure / E-measure; P@k, R-precision; AP, MAP, MRR; GMAP; nDCG (graded); rank-biased precision; expected search length; user-oriented coverage and novelty; α-nDCG and S-recall for diversity; online: clicks, A/B tests, interleaving.'
    ] }
  ],
  pitfalls: [
    'Computing recall with the number retrieved in the denominator (it is the number of RELEVANT in the collection).',
    'Plotting raw sawtooth precision without interpolation when asked for the standard 11-point curve.',
    'Forgetting to average over queries.',
    'Using the arithmetic mean for F; it is the harmonic mean.'
  ]
},
{
  id: 'ranked-metrics',
  title: 'Ranked metrics: P@k, AP, MAP, MRR, nDCG',
  priority: 17,
  tier: 'core',
  freq: '2/9 papers directly (MAP, user-experience measure); essential for numerics',
  marks: '5-8 marks',
  summary: '**AP averages precision at each relevant document (divided by total relevant); MAP averages AP over queries; MRR averages 1/rank of the first relevant; nDCG discounts graded gains by log2(rank+1) and normalises by the ideal ranking.**',
  mnemonic: 'AP = average of P at the hits; nDCG = gain over log-rank, divided by ideal',
  source: ['CT4100_Notes_04_Metrics'],
  sections: [
    { heading: 'Single-value measures from the notes', items: [
      '1. Precision when every new relevant document is retrieved (-> AP). 2. Average over queries (**MAP**). 3. Precision when the first relevant document is retrieved (-> **reciprocal rank**). 4. **R-precision**: precision after R documents (R = number of relevant). 5. **P@k**.',
      { type: 'formula', label: 'Precision at k', text: 'P@k = (relevant documents in top k) / k.   R-precision = P@R.' },
      { type: 'formula', label: 'Average precision (AP) and MAP', text: 'AP(q) = (1/|R_q|) Σ_{k: d_k relevant} P@k;  MAP = (1/|Q|) Σ_q AP(q). Divide by ALL relevant documents, so unretrieved relevant documents count as precision 0.' },
      { type: 'formula', label: 'Mean reciprocal rank', text: 'MRR = (1/|Q|) Σ_q 1 / rank_q, rank_q = rank of the first relevant document for query q.' },
      { type: 'formula', label: 'DCG and nDCG', text: 'DCG@k = Σ_{i=1..k} rel_i / log2(i + 1);  nDCG@k = DCG@k / IDCG@k, IDCG = DCG of the ideal ordering (sorted by relevance). 0 ≤ nDCG ≤ 1. (A variant uses gain 2^rel - 1.)' }
    ] },
    { heading: 'Worked examples', items: [
{"type":"task","show":0,"q":["**AP:** a ranked list reads R N R N N R N R N N (R = relevant), and 5 relevant documents exist.","**MAP:** a second query has relevant documents at ranks 2 and 4, and only those 2 exist.","**MRR:** three queries have their first relevant result at ranks 1, 3 and 2.","For the first list also find P@5 and R-precision.","**nDCG@5:** the top 5 results have graded relevance 3, 2, 3, 0, 1."]},
      '**AP:** list R N R N N R N R N N, |R| = 5. Precisions at relevant ranks: 1/1, 2/3, 3/6, 4/8 = 1, 0.667, 0.5, 0.5 (sum 2.667). AP = 2.667/5 = **0.533** (the fifth relevant document was not retrieved, contributing 0). If AP is divided by 4 retrieved-relevant it would be 0.667: do not do this.',
      '**MAP:** second query has relevant at ranks 2 and 4 of 2 relevant: AP = (1/2 + 2/4)/2 = 0.5. MAP = (0.533 + 0.5)/2 = **0.517**.',
      '**MRR:** first relevant at ranks 1, 3, 2 for three queries: (1 + 1/3 + 1/2)/3 = **0.611**.',
      '**P@5** for the first list = 2/5 = 0.4. R-precision (R = 5) = P@5 = 0.4.',
      '**nDCG@5:** graded relevance of the top 5 = 3, 2, 3, 0, 1. Discount terms 3/1, 2/1.585, 3/2, 0/2.322, 1/2.585 = 3, 1.262, 1.5, 0, 0.387. DCG = **6.149**. Ideal order 3, 3, 2, 1, 0: DCG = 3 + 1.893 + 1 + 0.431 + 0 = 6.323 (computed 3/1 + 3/1.585 + 2/2 + 1/2.322 + 0). nDCG = 6.149/6.323 = **0.972**.'
    ] },
    { heading: 'MAP: benefits and limitations (2025-26 P1 Q1h, 5 marks)', items: [
      'Explain: MAP = mean over queries of AP; AP is the area under the (un-interpolated) precision-recall curve; one number summarising ranking quality.',
      '**Benefits:** a single figure for easy comparison; uses the whole ranking and all recall levels (no cut-off k); rewards relevant documents early (high precision at each hit); averages over many queries for stable comparisons; standard in TREC; good discrimination/stability; interpretable; no need to choose k.',
      '**Limitations:** binary relevance only (no graded gains: use nDCG); needs judgements of ALL relevant documents (recall base) which pooling only approximates; assumes the user wants to find all relevant documents (recall-oriented) while web users look at the top few (P@10, MRR better); treats all queries equally so queries with many relevant documents dominate or hide variation (GMAP emphasises poor queries); needs enough queries and significance tests; ignores diversity, novelty, redundancy; position discount is implicit and not user-model based; does not reflect user experience or effort; not comparable across collections.'
    ] },
    { heading: 'Choosing a measure', items: [
      { type: 'table', head: ['Need', 'Use'], rows: [['Web search, user reads top few', 'P@5/P@10, MRR (known-item)'], ['Recall-oriented (legal, patent, research)', 'Recall@k, MAP, F2'], ['Graded relevance', 'nDCG@k'], ['Whole-ranking single number', 'MAP'], ['Diversity/novelty', 'α-nDCG, S-recall'], ['Real users', 'A/B tests, interleaving, click metrics']] },
      'Compare systems with a **paired significance test over queries** (paired t-test or Wilcoxon); the query is the unit of analysis. Precision histograms: plot R-precision difference between systems A and B for each query.'
    ] }
  ],
  pitfalls: [
    'Dividing AP by the number of retrieved relevant documents instead of the total relevant.',
    'Forgetting log2(i+1): the first rank has denominator 1 (log2 2).',
    'Computing nDCG without sorting the ideal ranking, or using the system list as its own ideal.',
    'Calling MAP "mean of precision at all ranks": it is mean over queries of the average of precision at relevant ranks.'
  ]
},
{
  id: 'user-oriented-evaluation',
  title: 'User-oriented measures, test collections and online evaluation',
  priority: 26,
  tier: 'likely',
  freq: '3/9 papers ("suggest a measure capturing the user experience")',
  marks: '8 marks',
  summary: '**Coverage and novelty measure how well the system serves what the user already knows and what is new; online methods (A/B tests, interleaving) use real behaviour but clicks are biased.**',
  mnemonic: 'Coverage = known found; Novelty = new found',
  source: ['CT4100_Notes_04_Metrics', 'CT4100_Notes_08_Web_Search'],
  sections: [
    { heading: 'Coverage and novelty (answer to "suggest a user-experience measure", 2022-23/2023-24)', items: [
      'Let D = document set, R = relevant set, A = answer set returned, U = relevant documents previously known to the user, AU = returned documents previously known to the user (A ∩ U), New = relevant returned documents previously unknown to the user.',
      { type: 'formula', label: 'Coverage and novelty', text: 'Coverage = |AU| / |U|;   Novelty = |New| / (|New| + |AU|)' },
      'Coverage: how much of what the user already knows is relevant is found: a trust measure ("does the system find the things I know about?"). Novelty: of the relevant documents returned, how many are new to the user: usefulness/value.',
      'Worked: user knows |U| = 10 relevant documents. System returns 20 documents; 4 are known relevant (AU) and 6 are relevant but unknown (New). Coverage = 4/10 = 0.4; Novelty = 6/(6 + 4) = 0.6.',
      '**Other user-experience measures (limit to one aspect):** time/effort: **expected search length** or rank of first relevant (MRR); patience-based **rank-biased precision** RBP = (1-p) Σ rel_i p^(i-1) (p = persistence, probability the user continues to the next result); nDCG with position discount; **diversity/novelty** (α-nDCG); session-level cost (number of queries to success); time-biased gain; satisfaction questionnaires; abandonment; interactive systems need session duration and effort.'
    ] },
    { heading: 'Test collections and their issues', items: [
      'Cranfield (1960s): 1,400 abstracts, 225 queries, all documents judged for all queries. **TREC** (NIST since 1992): shared collections, topics, uniform scoring, annual workshop. **Pooling:** judge only the union of the top-k documents from each participating system, since exhaustive judging is impossible. Other campaigns: CLEF (multilingual), NTCIR, FIRE; benchmarks MS MARCO and BEIR (neural IR).',
      '**Cranfield paradigm (Cleverdon, 1960s):** 1,400 aeronautics abstracts, 225 queries, every document judged for every query; established documents + information needs + relevance judgements, reused to compare systems. **TREC** scaled it up (shared collections and queries, uniform scoring, annual workshop; too large to judge exhaustively so **pooling**).',
      '**Other campaigns:** CLEF (Europe; multilingual and cross-language), NTCIR (Japan; Asian and cross-language), FIRE (India; South Asian languages). **Benchmarks:** MS MARCO (real web queries, millions of passages, typically one judged relevant passage per query); BEIR (heterogeneous collections to test generalisation to unseen domains).',
      '**TREC tracks today (lecture):** RAG (retrieval plus answers generated from passages); RAGTIME (multilingual report generation from news, citation-based evaluation); Video QA; Change Detection (an expert follows a topic over time via a daily reading queue; rewards importance and novelty); Million LLM (rank LLMs by ability to answer a query); AutoJudge (can LLMs replace human assessors?); User Simulation (can simulated users replace user studies?). Earlier tracks: ad hoc, Web, Million Query, Interactive, QA, Spam, Entity, Microblog, Genomics, Conversational. Evaluating generated answers, and evaluation itself, are now research problems.',
      '**Scope of evaluation (lecture):** functional requirements, standard testing, and performance (response time, space requirements; empirical analysis of algorithm and data-structure efficiency); retrieval performance (how useful is the system) is not an issue in data retrieval, where an exact correct answer exists. Related issues for interactive sessions: user satisfaction comes from HCI (monitoring behaviour, surveys); information visualisation.',
      'Issues: judging is costly (crowdsourcing; LLMs as assessors: cheap but do they agree with humans? TREC AutoJudge); judges disagree (Cohen kappa); relevance can be graded; **tune on one collection and test on another**; user simulation as an alternative to user studies.',
      'Interaction can be one-off query or interactive session: quality of returned set vs session duration and effort; harder to evaluate.'
    ] },
    { heading: 'Offline vs online evaluation', items: [
      '**Offline:** fixed collection and judgements; repeatable and cheap; judges are not real users.',
      '**Online:** observe real users (clicks, dwell time, reformulations, abandonment). **A/B test:** split users, show ranker A to one group and B to the other, compare behaviour (simple, realistic, needs much traffic). **Interleaving:** merge two rankings into one list, credit each click to the contributing ranker (each user compares the rankers directly, needs far less traffic; position bias hits both equally).',
      '**Clicks are biased evidence:** position bias (top results get clicks because they are top), presentation bias (snippets, titles), and "no click" is ambiguous (irrelevant, unseen, or the snippet answered the question: zero-click).',
      'Web evaluation uses Prec@5, Prec@10 (recall impossible to compute, users do not care about it) and click-through data.'
    ] }
  ],
  pitfalls: [
    'Giving novelty/coverage formulas inverted: coverage is over the user\'s KNOWN relevant set U; novelty over (New + AU).',
    'Stating that clicks equal relevance without mentioning position bias.',
    'Suggesting a user measure without saying what aspect of the user experience it captures.'
  ]
},
{
  id: 'independence-assumption',
  title: 'Term independence assumption and vocabulary mismatch',
  priority: 16,
  tier: 'core',
  freq: '4/9 papers (10 marks in 2024-25 both papers; 5 marks 2025-26)',
  marks: '5-10 marks',
  summary: '**The independence assumption treats every term as an unrelated dimension (orthogonal axes, bag of words), so synonyms do not match, polysemes are not separated, and phrases/order are lost; fix it with LSI/embeddings, query expansion/thesauri, and phrase/proximity models.**',
  mnemonic: 'Orthogonal terms: no synonyms, no senses, no phrases',
  source: ['CT4100_Notes_02a_IR_Models', 'CT4100_Notes_05_Weighting_Schemes', 'CT4100_Notes_10_Query_Difficulty_Prediction'],
  sections: [
    { heading: 'What the assumption is', items: [
      '**Term independence:** each term is weighted and matched in isolation; the presence of one term says nothing about another. In the vector space the terms are **orthogonal dimensions** (the dot product of two different terms is 0).',
      'Related: **bag of words**: word order is ignored ("Mary is quicker than John" = "John is quicker than Mary"). Both are simplifications that make weighting and indexing tractable and work surprisingly well, but they limit semantics.',
      'The Boolean model, VSM and the classic probabilistic models (Binary Independence Model) all make this assumption.'
    ] },
    { heading: 'How it hurts (impact on semantic relationships)', items: [
      '**Synonymy (vocabulary mismatch):** query "car hire", document says "vehicle rental": no shared terms so cosine = 0 although perfectly relevant. Hurts **recall**.',
      '**Polysemy:** "jaguar" (car/cat), "bank" (river/money): one dimension for all senses; irrelevant documents match. Hurts **precision**.',
      '**Related/associated terms:** "doctor" and "physician", "hospital" and "nurse": semantic relatedness is not represented, so documents about the topic but using different words score low.',
      '**Phrases and compounds:** "new york", "information retrieval", "machine learning": counted as separate unrelated terms; "new" and "york" far apart still match.',
      '**Word order and structure:** negation ("not relevant"), roles ("dog bites man" vs "man bites dog").',
      '**Over-counting correlated terms:** terms that always co-occur (e.g. "neural" and "network") each add weight, double counting evidence.',
      'Example for the exam: query "automobile accident". Doc 1 "car crash on the motorway" has cosine 0 with the query; Doc 2 "automobile manufacturing, accident of birth" matches both terms. The VSM ranks Doc 2 above Doc 1.'
    ] },
    { heading: 'Vocabulary mismatch (2025-26 P2 Q1e): definition and two mitigations', items: [
      '**Definition:** the people who write documents and those who write queries use different words for the same concept (synonymy, abbreviations, spelling variants, different levels of specificity), so relevant documents do not contain the query terms. Studies show the probability that two people use the same term for the same concept is small (under about 20-30%).',
      '**Indexing-time approaches:** stemming/lemmatisation; **document expansion** (add related terms or doc2query: generate likely queries and append them); thesaurus-based indexing/controlled vocabulary; **latent semantic indexing** or dense embeddings so documents are matched in a latent concept space; indexing anchor text (describes a page with other people\'s words).',
      '**Query-time approaches:** **query expansion** with thesaurus/WordNet or local/global analysis; **pseudo-relevance feedback** (Rocchio); query suggestion and spelling correction; embedding-based or neural query rewriting; relevance feedback from the user.'
    ] },
    { heading: 'Approaches to capture term relationships (answer: "suggest a general approach")', items: [
      '**1. Query expansion / thesauri:** add related terms (WordNet, association clusters from local/global analysis, PRF).',
      '**2. Generalised vector space model / term-term correlation:** use a term-term similarity matrix S so that sim(q,d) = q^T S d where S(i,j) is based on co-occurrence; terms are no longer orthogonal.',
      '**3. Latent semantic indexing (LSI):** factorise the term-document matrix X ≈ U_k Σ_k V_k^T (truncated SVD, k about 100-300). Documents and queries are mapped to a k-dimensional latent space (query folded in as q_k = q^T U_k Σ_k^-1) where terms that co-occur in similar contexts have similar vectors; similarity by cosine in the latent space. Handles synonymy and some polysemy. Limits: cost of SVD, k choice, dense vectors, no probabilistic interpretation, still bag of words.',
      '**4. Word/document embeddings and neural models:** word2vec/BERT dense vectors; dense retrieval (see Neural IR). Contextual models capture order and dependencies.',
      '**5. Phrase and proximity models:** index phrases/n-grams, positional index for phrase and NEAR queries, proximity scoring; Markov random field models (term dependence models: full dependence, sequential dependence) combine unigram, ordered-bigram and unordered-window features.',
      '**6. Probabilistic models with dependence** (Bahadur-Lazarsfeld, tree dependence), and statistical translation language models.'
    ] }
  ],
  pitfalls: [
    'Saying the assumption means terms do not co-occur: it means the MODEL ignores their relationships.',
    'Only naming synonymy: also give polysemy, phrases and order, with an example.',
    'Offering a "solution" without stating its cost or limitation (LSI is expensive, expansion can drift).',
    'Not giving a concrete example (car vs automobile; new york).'
  ]
}
];
