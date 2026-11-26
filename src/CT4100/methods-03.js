module.exports = [
{
  id: 't-compare-local-thesaurus', topicId: 'query-expansion-analysis', title: 'Template: compare local analysis vs thesaurus expansion (or any "compare A and B")',
  when: '"Compare and contrast X and Y" questions (10 marks)',
  mnemonic: 'D-M-A-L: Define both, Mechanism, Advantages, Limitations, then a verdict',
  steps: [
    '1. One-line definition of each approach and what problem it solves (vocabulary mismatch, recall).',
    '2. Mechanism of each in 3-4 steps (local: top-k, association matrix, select terms; thesaurus: look up synonyms/broader terms).',
    '3. Comparison table on 5-6 axes: source, context sensitivity, vocabulary coverage, cost, dependence on first retrieval, risks.',
    '4. Advantages and limitations of each (drift, ambiguity, static, noise).',
    '5. When each is best (large general collection vs controlled domain).',
    '6. Verdict: hybrid, using the thesaurus for relations and corpus statistics to select and weight.'
  ],
  example: {
    problem: 'Compare local analysis of the return set with a fixed thesaurus (10 marks).',
    solution: [
      'Local: top-k documents of this query, association (Jaccard) matrix, add highest-scoring terms; context-sensitive, collection-specific, query-time cost, can drift.',
      'Thesaurus: precomputed lookup of synonyms/broader terms (WordNet, MeSH); precise relations, cheap lookup, but static, context-free (adds all senses), misses new terms.',
      'Axes: context (high vs low), coverage (new/domain terms vs fixed), cost (query time vs build time), risk (drift vs wrong sense).',
      'Verdict: combine them.'
    ]
  }
},
{
  id: 't-cold-start', topicId: 'cf-issues-evaluation', title: 'Template: discuss the cold-start problem',
  when: '"Describe cold start and discuss strategies/trade-offs"',
  mnemonic: 'Three cold starts, three fixes, trade quality against data',
  steps: [
    '1. Define: new user, new item (and new system); why CF fails (no ratings, no neighbours, never recommended).',
    '2. Related: sparsity and grey sheep.',
    '3. Strategy 1: elicit ratings/gauge set (quick, burdens user).',
    '4. Strategy 2: popularity/demographic/context defaults (no data, non-personalised, popularity bias).',
    '5. Strategy 3: content-based/hybrid (works for new items; needs metadata; over-specialisation). Add exploration and implicit signals.',
    '6. Evaluate each: quality vs data required; recommend a hybrid with a switching rule and shifting weight as ratings arrive.',
    '7. Identify hard users: few ratings, low similarity to all, disagreeing neighbours.'
  ],
  example: {
    problem: 'New user joins a movie platform. Outline handling.',
    solution: [
      'Onboarding: ask for ratings of 10-20 diverse popular films (gauge set).',
      'Until then recommend popular and trending films in the user\'s region/language.',
      'Switch to content-based (genre, director) on the few films rated, then blend CF weight upwards as the number of ratings n grows (e.g. weight n/(n+20)).',
      'Detect difficult users: n small, max neighbour similarity low, high variance of neighbours\' predictions; use content/popularity for them and monitor via A/B test.'
    ]
  }
},
{
  id: 't-independence', topicId: 'independence-assumption', title: 'Template: explain the independence assumption and its effect',
  when: '"What is the term independence assumption, how does it impact IR, how to overcome it?"',
  mnemonic: 'Define, Example, Effects (synonym, polysemy, phrase), Fix',
  steps: [
    '1. Define: terms weighted/matched independently; orthogonal axes; bag of words.',
    '2. Concrete example: car hire vs vehicle rental; new york; Mary/John word order.',
    '3. Effects: recall loss (synonymy), precision loss (polysemy), phrases, double counting.',
    '4. Fix 1: query expansion/thesaurus/PRF. Fix 2: LSI or embeddings. Fix 3: phrase/proximity models, positional index.',
    '5. Cost/limitations of the fix (drift, SVD cost, compute).'
  ],
  example: {
    problem: '5 marks: independence assumption.',
    solution: [
      'VSM treats terms as orthogonal dimensions; no relation between car and automobile (dot product 0).',
      'Query "car hire" does not match "vehicle rental" documents: recall falls; "jaguar" mixes car and cat documents: precision falls.',
      'Overcome with LSI (SVD of term-document matrix, compare in a concept space) or query expansion.'
    ]
  }
},
{
  id: 't-learning-task', topicId: 'learning-term-weights', title: 'Template: "outline a learning approach to an IR task"',
  when: 'Any question about learning in IR (data, mechanism, limitations)',
  mnemonic: 'D-R-L-E-L',
  steps: [
    '1. Name the task (term weighting, ranking, expansion, difficulty prediction).',
    '2. Data: what training signals exist (judgements, clicks).',
    '3. Representation: features or tree/network.',
    '4. Mechanism: GA/GP loop or gradient descent with loss named.',
    '5. Evaluation on unseen queries vs baseline.',
    '6. Limitations: labels, overfitting, cost, local optima, black box.'
  ],
  example: {
    problem: 'Learning to rank for web search.',
    solution: [
      'Data: queries, documents with graded labels, features (BM25, PageRank, length).',
      'Mechanism: pairwise RankNet / LambdaMART optimising nDCG.',
      'Evaluate: nDCG@10 on held-out queries vs BM25.',
      'Limits: labels expensive, click bias, retraining, interpretability.'
    ]
  }
},
{
  id: 't-scientific-articles', topicId: 'document-similarity-structured', title: 'Template: similarity and clustering of scientific articles',
  when: '"Given articles with title, abstract, authors, keywords, body, bibliography: measure similarity and group them"',
  mnemonic: 'Fields + Citations + Authors, weight, cluster, evaluate',
  steps: [
    '1. Pre-process text (tokenise, stop words, stem).',
    '2. Per-field tf-idf cosine: title, abstract, keywords, body.',
    '3. Bibliography: bibliographic coupling (shared references) and co-citation.',
    '4. Authors/keywords: Jaccard overlap.',
    '5. Combine: weighted sum of similarities; tune/learn weights.',
    '6. Cluster: average-link HAC or k-means; choose K by RSS knee; label by top terms.',
    '7. Evaluate (purity, cluster hypothesis) and give limitations.'
  ],
  example: {
    problem: 'Sketch the combined similarity.',
    solution: [
      'sim = 0.15 title + 0.30 abstract + 0.15 keywords + 0.15 body + 0.20 coupling + 0.05 authors.',
      'Title and keywords short but precise; abstract concentrated; citations independent of vocabulary.',
      'Cluster the similarity matrix with average-link HAC and cut at a threshold.'
    ]
  }
},
{
  id: 't-two-clustering-apps', topicId: 'cluster-hypothesis-evaluation', title: 'Template: clustering for two IR applications',
  when: '"Select two IR applications and show how clustering helps; state algorithm and rationale"',
  mnemonic: 'Application, what is clustered, algorithm, why, benefit',
  steps: [
    '1. Application 1: search result clustering (cluster snippets of top results).',
    '2. Algorithm and rationale: fast k-means or HAC on snippets, or suffix-tree/Lingo for labelled overlapping clusters.',
    '3. Application 2: cluster-based retrieval/collection browsing (cluster the collection offline).',
    '4. Algorithm and rationale: k-means for efficiency (match query to centroids) or HAC for a browsable hierarchy.',
    '5. Base both on the cluster hypothesis; state benefits (navigation, recall, efficiency) and limits (K, labels, cost).'
  ],
  example: {
    problem: 'Two applications.',
    solution: [
      'Search result clustering: query "jaguar" results grouped into car, animal, software; k-means on tf-idf of snippets, K about 5; user navigates by sense.',
      'Cluster-based retrieval: collection clustered offline by k-means (K about sqrt(N)); query compared to centroids, top clusters searched: faster and returns "automobile" documents for "car".'
    ]
  }
},
{
  id: 't-vocab-mismatch', topicId: 'independence-assumption', title: 'Template: vocabulary mismatch and two mitigations',
  when: '"Explain vocabulary mismatch; suggest one indexing-time and one query-time approach"',
  mnemonic: 'Define, example, index fix, query fix',
  steps: [
    '1. Definition: authors and searchers use different words for the same concept.',
    '2. Example: car hire / vehicle rental, doctor / physician.',
    '3. Indexing-time: document expansion (doc2query), LSI or embeddings, stemming.',
    '4. Query-time: query expansion (thesaurus/local analysis) or pseudo-relevance feedback.',
    '5. Trade-off: recall up, precision/drift risk.'
  ],
  example: {
    problem: '5 marks.',
    solution: [
      'Mismatch: relevant documents contain none of the query terms.',
      'Index time: add predicted queries/synonyms to documents (doc2query).',
      'Query time: expand with terms from top-k (PRF).',
      'Cost: drift and noise.'
    ]
  }
},
{
  id: 't-prf-vs-rocchio', topicId: 'pseudo-relevance-feedback', title: 'Template: Rocchio vs pseudo-relevance feedback',
  when: '10 mark compare question',
  mnemonic: 'Source, effort, reliability, risk, suitability',
  steps: [
    '1. Define Rocchio formula (α, β, γ) with user judgements.',
    '2. Define PRF: assume top-k relevant, automatic.',
    '3. Compare on source, effort, negative evidence, reliability, risk.',
    '4. Strengths/weaknesses of each (effort, drift, parameters, single cluster).',
    '5. Situations: Rocchio for interactive, recall-oriented search; PRF for automatic, short queries, easy queries.',
    '6. Note: PRF often applies the Rocchio update to the top-k.'
  ],
  example: {
    problem: 'Compare.',
    solution: [
      'Rocchio: q_new = α q + β mean(D_R) - γ mean(D_N) from user judgements; strong when judgements are reliable; costs effort.',
      'PRF: top-k assumed relevant; no effort; fails when initial precision is low (drift).',
      'Use PRF with high α and predicted-easy queries.'
    ]
  }
},
{
  id: 't-web-vs-trad', topicId: 'web-search', title: 'Template: web vs traditional collections (3 characteristics with design decisions)',
  when: '"Discuss three characteristics of the web that differ from traditional collections and motivate design decisions"',
  mnemonic: 'Characteristic, why different, design response (x3)',
  steps: [
    '1. Characteristic 1 (scale/distribution): distributed crawling, sharded index, caching, pruning.',
    '2. Characteristic 2 (volatility): freshness-based re-crawling, incremental indexing.',
    '3. Characteristic 3 (links): PageRank/HITS, anchor text.',
    '4. Add spam, duplicates, short queries for extra marks.',
    '5. Close with signal combination and evaluation by clicks/A/B.'
  ],
  example: {
    problem: 'Three characteristics.',
    solution: [
      'Scale: billions of pages: crawler with URL frontier, document-sharded inverted index.',
      'Volatility: news changes hourly: priority re-crawl by change rate.',
      'Spam: link farms: PageRank + TrustRank + classifiers.'
    ]
  }
},
{
  id: 't-pagerank-hits', topicId: 'hits', title: 'Template: explain HITS and how it differs from PageRank',
  when: '10 marks',
  mnemonic: 'Concepts, algorithm, example, differences table',
  steps: [
    '1. Define hub and authority with the mutual reinforcement idea.',
    '2. Base set construction (root set plus linked pages).',
    '3. Update rules a = M^T h, h = M a, normalise, iterate (eigenvectors).',
    '4. Short example (A, B hubs; C authority).',
    '5. Table of differences: query dependence, number of scores, graph size, teleportation, spam robustness, cost.',
    '6. Applications and limitations (drift, tightly-knit communities).'
  ],
  example: {
    problem: 'HITS vs PageRank in 3 lines.',
    solution: [
      'HITS: query-dependent, hub and authority scores on a small base set; PageRank: query-independent single score on the whole web with teleportation.',
      'HITS more spam-prone (hubs are self-made).'
    ]
  }
},
{
  id: 't-three-qpp', topicId: 'query-performance-prediction', title: 'Template: QPP from the query, collection and result list',
  when: '"Describe methods for predicting difficulty based on (i) the query (ii) collection statistics (iii) the result set"',
  mnemonic: 'Query: length/ambiguity; Collection: IDF/scope/PMI; Results: clarity/NQC/stability',
  steps: [
    '1. Define QPP (no judgements) and the need.',
    '2. (i) Query: length, ambiguity (WordNet senses) with an example.',
    '3. (ii) Collection: AvgIDF formula with numbers, scope, PMI/SCQ.',
    '4. (iii) Results: clarity (KL divergence), score spread (NQC), stability (overlap@k).',
    '5. How to evaluate (Pearson/Kendall) and uses (selective expansion).',
    '6. Caveat for each predictor.'
  ],
  example: {
    problem: 'One line each.',
    solution: [
      '(i) "mercury" has many senses: likely hard. (ii) AvgIDF: "apple pie" 1.80 vs "the pie" 0.67. (iii) NQC: spread 3.03 vs 0.25 for two ranked lists.'
    ]
  }
},
{
  id: 't-map-pros-cons', topicId: 'ranked-metrics', title: 'Template: explain MAP and discuss benefits and limitations',
  when: '5 marks',
  mnemonic: 'Define AP, define MAP, 2 benefits, 3 limits',
  steps: [
    '1. AP = mean of precision at each relevant document / total relevant; MAP = mean over queries.',
    '2. Show a mini example (AP = 0.533).',
    '3. Benefits: whole ranking, single number, early hits rewarded, no cut-off.',
    '4. Limitations: binary relevance, needs all judgements, recall-oriented, ignores diversity/user.',
    '5. Alternatives: nDCG, P@k, MRR.'
  ],
  example: {
    problem: 'Define and evaluate MAP.',
    solution: [
      'AP for relevant at ranks 1,3,6,8 with 5 relevant: (1 + 0.667 + 0.5 + 0.5)/5 = 0.533; MAP averages across queries.',
      'Good: summarises ranking quality; bad: binary, recall-biased.'
    ]
  }
},
{
  id: 't-diversity-measure', topicId: 'diversity', title: 'Template: measure the diversity of the top-k and diversify expansion terms',
  when: '"Suggest an approach to measure diversity" or "provide a diverse set of candidate terms"',
  mnemonic: 'ILD for similarity, S-recall for subtopics, MMR to build',
  steps: [
    '1. Define diversity (coverage of intents, low redundancy) and why it matters.',
    '2. Measure: ILD (average 1 - cosine), S-recall (subtopics covered), α-nDCG (novelty-aware).',
    '3. Build: MMR with λ over association score and term-term similarity, or cluster and take one per cluster.',
    '4. State the relevance-diversity trade-off and λ.',
    '5. Limitations: needs subtopics, similarity quality, poor first retrieval.'
  ],
  example: {
    problem: 'Diversity of top-10.',
    solution: [
      'ILD = 2/(k(k-1)) Σ_{i<j} (1 - cos(d_i, d_j)).',
      'S-recall@10 = subtopics covered/total subtopics.',
      'Report with nDCG to avoid rewarding random lists.'
    ]
  }
},
{
  id: 't-cluster-hypothesis-test', topicId: 'cluster-hypothesis-evaluation', title: 'Template: test the cluster hypothesis and state implications',
  when: '5 marks',
  mnemonic: 'Neighbours of relevant docs: relevant more than chance?',
  steps: [
    '1. State the hypothesis.',
    '2. Needs: collection, queries, judgements, similarity (cosine on tf-idf).',
    '3. For each relevant document find its n nearest neighbours; count the fraction relevant; average.',
    '4. Compare with the random baseline |R|/|D|; optional overlap test of similarity distributions.',
    '5. Implications: high means feedback/clustering helps; low means avoid centroid feedback, use diversified or multi-cluster feedback.'
  ],
  example: {
    problem: 'Short result.',
    solution: [
      'Collection 10,000 docs, query with 50 relevant: chance 0.5%. If the average neighbour fraction among the 5 nearest neighbours is 30%, hypothesis strongly holds (60× chance) so Rocchio/PRF is worthwhile.'
    ]
  }
},
{
  id: 't-good-weighting', topicId: 'tf-idf-weighting', title: 'Template: main constituents of a good weighting scheme (with BM25 as reference)',
  when: '8-9 marks',
  mnemonic: 'TIL + Q + axioms',
  steps: [
    '1. Pick a scheme (BM25 or tf-idf with normalisation) and give the formula.',
    '2. Constituent 1: tf, sublinear/saturating.',
    '3. Constituent 2: idf/global discrimination.',
    '4. Constituent 3: length normalisation (verbosity vs scope).',
    '5. Constituent 4: query weighting; tunable parameters.',
    '6. Link to axioms: TFC1/TFC2/TDC/LNC.',
    '7. Limitations: independence, negative idf, parameters.'
  ],
  example: {
    problem: 'Good weighting scheme.',
    solution: [
      'BM25: idf × tf(k1+1)/(tf + k1((1-b)+b|d|/avgdl)).',
      'tf saturates at k1+1 (TFC2), idf rewards rare terms (TDC), b penalises length (LNC1), repeated documents bounded (LNC2).'
    ]
  }
}
];
