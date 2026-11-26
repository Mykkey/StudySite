module.exports = [
{
  id: 'clustering-algorithms',
  title: 'Clustering: k-means, hierarchical (single/complete/average link), choosing K',
  priority: 18,
  tier: 'likely',
  freq: '7/9 papers (clustering approach, evaluation, uses)',
  marks: '8-9 marks',
  summary: '**K-means repeats reassign-to-nearest-centroid and recompute-centroids until stable, minimising RSS; hierarchical agglomerative clustering merges the closest two clusters repeatedly, with single (min), complete (max) or average link distance.**',
  mnemonic: 'K-means: Assign, Average, Repeat. HAC: single = chain, complete = compact, average = compromise',
  source: ['CT4100_Notes_09_Clustering'],
  sections: [
    { heading: 'Definition and types', items: [
      '**Document clustering** groups documents so that documents in a cluster are similar and documents in different clusters are dissimilar. Most common **unsupervised** learning (no labels; classification is supervised with human-defined classes). Outcome influenced by number of clusters, similarity measure, document representation.',
      '**Flat** (partition into K clusters; k-means) vs **hierarchical** (tree: bottom-up agglomerative or top-down divisive). **Hard** (each document in exactly one cluster; common, easier) vs **soft** (a document can be in several: better for browsable hierarchies, e.g. sneakers in "sports apparel" and "shoes").',
      'Desiderata: appropriate number of clusters; avoid very small and very large clusters; easy-to-explain clusters.',
      'Representation: VSM vectors (tf-idf); similarity cosine or Euclidean distance (equivalent ranking for length-normalised vectors).',
      '**Classification vs clustering (lecture):** classification = supervised, classes are human-defined and part of the input to the learner; clustering = unsupervised, clusters are inferred from the data without human input. Yet the outcome can be steered by the number of clusters, the similarity measure and the document representation.',
      '**Flat algorithms** compute a partition of N documents into K clusters: given a set of documents and K, find the partition that optimises the chosen partitioning criterion. **Global optimisation** (enumerate all partitions and pick the best) is **not tractable**; the effective heuristic is **K-means**. Flat algorithms usually start from a random (partial) partitioning and refine it iteratively.',
      'Lecture exercise: a scatter plot with clear cluster structure (visibly separated groups of points): "propose an algorithm for finding the cluster structure". Answer: K-means (below).'
    ] },
    { heading: 'K-means', items: [
      'Each cluster is defined by its **centroid** μ(ω) = (1/|ω|) Σ_{x in ω} x. Objective: minimise the **RSS** (residual sum of squares) = Σ_k Σ_{x in ω_k} |x - μ_k|^2.',
      '**Algorithm:** 1. choose K seeds (random documents) as initial centroids. 2. **Reassignment:** assign each vector to its closest centroid. 3. **Recomputation:** recompute each centroid as the mean of its members. 4. Repeat 2-3 until a stopping criterion (no change, RSS small, max iterations). Output centroids/clusters.',
      '**Convergence guaranteed:** RSS never increases in reassignment (a vector moves to a closer or equal centroid) or recomputation (the mean minimises squared distance), and there are finitely many clusterings. But it may converge to a **local optimum**: bad seeds give poor clusterings. Convergence time unknown (usually under 10-20 iterations for practical purposes).',
      '**Better initialisation:** heuristic seeds (remove outliers, good coverage), seeds from hierarchical clustering, or run with i (e.g. 10) different random seeds and keep the lowest RSS (k-means++ spreads seeds).',
      '**Pros:** simple, fast (O(K N I) distance computations), good default/baseline, scales to large collections. **Cons:** K must be given; sensitive to seeds and outliers; assumes roughly spherical clusters; hard clustering only; depends on distance measure; centroids are dense vectors.',
      { type: 'code', text: 'K-MEANS({x1..xN}, K)\n  (s1..sK) = SELECTRANDOMSEEDS({x1..xN}, K)\n  for k = 1 to K: mu_k = s_k\n  while stopping criterion not met:\n    for k = 1 to K: omega_k = {}\n    for n = 1 to N:\n      j = argmin_j |mu_j - x_n|;  omega_j = omega_j + {x_n}      (reassignment of vectors)\n    for k = 1 to K: mu_k = (1/|omega_k|) * sum of x in omega_k     (recomputation of centroids)\n  return {mu_1..mu_K}' },
      '**Lecture worked example (24 slides, a picture with no numeric coordinates):** about 20 points in the plane, K = 2, two points marked as the initial seeds (random selection of initial centroids). The slides then alternate **assign points to closest centroid** (each point is labelled 1 or 2), **recompute cluster centroids** (the two centroids move to the mean of their labelled points), over roughly seven rounds. Each round only points near the boundary switch cluster and the centroids shift less and less; the last slide ("centroids and assignments after convergence") shows the final labelling with nothing changing.',
      '**Our own numeric practice example** (the lecture example has no coordinates, so this one is for practising the arithmetic):',
      { type: 'table', head: ['Point', 'x', 'y'], rows: [['A', '1', '1'], ['B', '1.5', '2'], ['C', '3', '4'], ['D', '5', '7'], ['E', '3.5', '5'], ['F', '4.5', '5'], ['G', '3.5', '4.5']] },
      'Practice example, K = 2, seeds A (1,1) and B (1.5,2). **Iteration 1 assign:** A to cluster 1 (distance 0 vs 1.12); B, C, D, E, F, G are nearer B: e.g. C 3.61 vs 2.50, G 4.30 vs 3.20. Clusters {A}, {B,C,D,E,F,G}. **Recompute:** μ1 = (1,1); μ2 = (3.5, 4.583) (x: 21/6, y: 27.5/6). **Iteration 2 assign:** B is now closer to μ1 (1.12 vs 3.27) so B moves; C 3.61 vs 0.77 stays in cluster 2. Clusters {A,B}, {C,D,E,F,G}; **recompute** μ1 = (1.25, 1.5), μ2 = (3.9, 5.1). **Iteration 3:** no point changes, **converged**. RSS fell from 20.71 (after iteration 1) to **8.53**.',
      { type: 'diagram', kind: 'scatter', data: { title: 'K-means result (K = 2)', xLabel: 'x', yLabel: 'y', xMin: 0, xMax: 6, yMin: 0, yMax: 8, series: [ { name: 'cluster 1: A, B', points: [[1,1],[1.5,2]] }, { name: 'cluster 2: C, D, E, F, G', points: [[3,4],[5,7],[3.5,5],[4.5,5],[3.5,4.5]] }, { name: 'centroids', points: [[1.25,1.5],[3.9,5.1]] } ] }, caption: 'Final clusters and centroids (1.25, 1.5) and (3.9, 5.1) from the worked example.' }
    ] },
    { heading: 'Hierarchical agglomerative clustering (HAC)', items: [
      '**Algorithm:** start with each document as its own cluster; compute pairwise distances; repeatedly **merge the two closest clusters**; stop at one cluster (or a similarity threshold / K). Record merge distances to draw a **dendrogram**; cut the dendrogram at a level to get clusters. Deterministic, no K needed in advance, gives a hierarchy (good for browsing). Cost O(N^2) memory, O(N^2 log N) time: expensive for large N.',
      { type: 'table', head: ['Linkage', 'Distance between clusters', 'Behaviour'], rows: [['Single link', 'MIN: distance of the closest pair', 'Chaining: long, straggly clusters; can merge distinct groups via a bridge; good at non-spherical shapes'], ['Complete link', 'MAX: distance of the farthest pair', 'Compact, roughly equal-diameter clusters; sensitive to outliers'], ['Average link', 'Mean of all pairwise distances (UPGMA)', 'Compromise; less sensitive to outliers'], ['Centroid', 'Distance between centroids', 'Can produce inversions']] },
      'Worked example: 1-D points a = 1, b = 2, c = 4, d = 7, e = 11.',
      { type: 'table', head: ['Step', 'Single link', 'Complete link', 'Average link'], rows: [['1', 'a+b @ 1', 'a+b @ 1', 'a+b @ 1'], ['2', 'c + {a,b} @ 2 (c to b)', 'c+d @ 3', 'c + {a,b} @ 2.5 (avg of 3 and 2)'], ['3', 'd + {a,b,c} @ 3 (d to c)', '{a,b}+{c,d} @ 6 (a to d)', 'd+e @ 4 (4 < 4.67 d to {a,b,c})'], ['4', 'e + rest @ 4 (e to d)', 'e + rest @ 10 (a to e)', '{a,b,c}+{d,e} @ 6.67 (40/6 pairs)']] },
      { type: 'diagram', kind: 'tree', data: { root: { label: 'single link: all @ 4', children: [ { label: 'e', edge: '4' }, { label: '{a,b,c,d} @ 3', edge: '3', children: [ { label: 'd' }, { label: '{a,b,c} @ 2', edge: '2', children: [ { label: 'c' }, { label: '{a,b} @ 1', edge: '1', children: [ { label: 'a' }, { label: 'b' } ] } ] } ] } ] } }, caption: 'Single-link dendrogram of a=1, b=2, c=4, d=7, e=11: each point joins the chain (chaining effect). Complete link instead gives {{a,b},{c,d}} then e.' }
    ] },
    { heading: 'How many clusters? (K)', items: [
      'K may be given by the application (Scatter-Gather could show only 10-20 clusters). Otherwise minimising RSS fails: RSS = 0 at K = N.',
      '**Lecture formulation:** cost of a document = its (squared) distance to its centroid; **total distortion RSS(K)** = sum of all document costs (proportional to the average squared distance); penalise each cluster with a cost λ so the total cluster penalty is Kλ; **total cost = RSS(K) + λK**; start at K = 1 and keep adding clusters; select the K that minimises RSS(K) + λK (we still need a good value for λ). **Knee in the curve (slide):** RSS plotted against number of clusters (2 to 10, RSS falling from about 1950 to 1750); pick the number where the curve flattens, here **4 or 9**. '
      + '**Penalised criterion:** choose K minimising RSS(K) + λK (each cluster costs λ; trade distortion against number of clusters; λ needs choosing). **Knee/elbow method:** plot RSS against K and pick where the curve flattens. Also silhouette, gap statistic, cut a dendrogram at a large gap.'
    ] }
  ],
  pitfalls: [
    'Forgetting that k-means needs K and is only guaranteed to find a LOCAL optimum.',
    'Mixing up single and complete link (single = min distance = chaining).',
    'In k-means worked examples, forgetting to recompute centroids after reassigning.',
    'Choosing K by minimising RSS (always picks K = N).'
  ]
},
{
  id: 'cluster-hypothesis-evaluation',
  title: 'Cluster hypothesis, uses of clustering in IR, and evaluating clusters',
  priority: 20,
  tier: 'likely',
  freq: '5/9 papers (cluster evaluation 2022-23, 2023-24 x1, 2025-26 x2; uses in IR 3 papers)',
  marks: '5-9 marks',
  summary: '**Cluster hypothesis: closely associated documents tend to be relevant to the same requests; all IR uses of clustering rest on it. Evaluate clusters internally (RSS), externally (purity, Rand index against a gold standard) and by task effectiveness.**',
  mnemonic: 'Relevant docs are neighbours: test with nearest neighbours',
  source: ['CT4100_Notes_09_Clustering', 'CT4100_Notes_06_Relevance_Feedback'],
  sections: [
    { heading: 'The cluster hypothesis', items: [
      '**Statement:** documents in the same cluster behave similarly with respect to relevance to information needs (van Rijsbergen: "closely associated documents tend to be relevant to the same requests"). Relevance feedback shares the underlying assumption that relevant documents have similar vectors and occupy a similar region.',
      '**An experiment to test it (2025-26 P2 Q1d, 5 marks):** (1) choose a collection with queries and relevance judgements. (2) **Nearest-neighbour test (Voorhees 1985):** for each relevant document of each query, find its n nearest neighbours (e.g. n = 5) in the whole collection by cosine similarity on tf-idf vectors; compute the fraction that are relevant. Average over relevant documents and queries. (3) Compare with the random baseline |R_q|/|D| (fraction expected by chance). If the measured fraction is much larger, the hypothesis holds. (4) **Overlap test (Jardine and van Rijsbergen 1971):** compute similarity distributions for relevant-relevant pairs and relevant-non-relevant pairs; little overlap = hypothesis holds. (5) Report per query (it holds for some queries, not others) and repeat with different representations/similarity measures.',
      '**Implications for feedback algorithms:** if it holds, a centroid of relevant/top-ranked documents is a good query (Rocchio, PRF, query expansion, cluster-based retrieval work). If it fails (relevant documents scattered, multi-faceted queries, or relevant ones no closer to each other than to non-relevant), centroid-based feedback drifts and can hurt; use diversification or multi-cluster feedback (several queries), restrict PRF to queries where neighbours are coherent (check using QPP/clarity), and rely less on top-k similarity.',
      '**When the assumption fails (2025-26 P1 Q1g):** multi-faceted or ambiguous queries with disjoint relevant sets (jaguar); relevance defined by non-topical aspects (opinion, quality, recency, authority); heterogeneous collections (web) and varied vocabulary (relevant documents use different words: vocabulary mismatch); very broad topics; short/sparse documents; poor initial ranking. **Effect:** the feedback centroid falls between clusters and matches neither; expansion terms are generic or from the wrong sense; precision falls, query drift, gains vary and can be negative.'
    ] },
    { heading: 'Uses of clustering in IR (2022-23, 2024-25: "two IR tasks")', items: [
      '**The four applications on the slides:** (1) **search result clustering** (what is clustered: search results; benefit: more effective information presentation to the user); (2) **Scatter-Gather** (clusters of (subsets of) the collection; benefit: an alternative user interface, "search without typing"); (3) **collection clustering** (the collection; benefit: effective presentation for exploratory browsing); (4) **cluster-based retrieval** (the collection; benefit: higher efficiency, faster search). All applications rest on the cluster hypothesis.',
      '**Scatter-Gather (Xerox PARC, 1992) example:** scatter the collection into clusters (Education, Domestic, Iraq, Arts, Sports, Oil, Germany, Legal); the user **gathers** the interesting ones (Iraq, Oil, Germany) into "International Stories"; **scatter** again (Deployment, Politics, Germany, Pakistan, Africa, Markets, Oil, Hostages); gather Pakistan and Africa into "Smaller International Stories"; scatter again (Trinidad, W. Africa, S. Africa, Security, International, Lebanon, Pakistan, Japan). Repeated scatter and gather refines the topic without typing a query. In the 1990s it was hard to show more than 10-20 clusters on a monitor.',
      '**Search result clustering over the years:** Scatter/Gather (1992, Xerox PARC, browse by scatter and gather); Vivisimo and Clusty (early 2000s, results grouped into folders); KartOO (2001-2010, map of topics, click to refine the query); Grokker (2002-c.2009, nested circles of categories and subcategories); Carrot2 (2001-today, open source, Folders, Circles and FoamTree views; FoamTree = Voronoi treemap whose cell size reflects cluster size). Carrot2 uses algorithms designed for search results: **Lingo** and **Suffix Tree Clustering**. Example query: "jaguar" (cars, animals, Mac OS X, the Club).',
      { type: 'table', head: ['Application', 'What is clustered', 'Benefit', 'Suitable algorithm and why'], rows: [
        ['Search result clustering (Vivisimo, Carrot2, Scatter-Gather)', 'Top results (snippets) of a query', 'Better navigation; shows senses/aspects of ambiguous queries (jaguar)', 'Suffix-tree clustering/Lingo or fast k-means/HAC on snippets: must be fast, produce labelled clusters, clusters overlapping (soft)'],
        ['Collection clustering / Scatter-Gather', 'Whole collection or a chosen subset', 'Browsing without typing; exploratory search; hierarchical topic view', 'Hierarchical clustering for a browsable hierarchy; k-means to re-cluster selected subsets'],
        ['Cluster-based retrieval', 'Collection clustered in advance', 'Efficiency: compare query with centroids first; Recall: return other documents in the cluster of a matching document (car finds automobile documents)', 'k-means (fast, centroids); query matched against centroids'],
        ['Query expansion/diverse feedback', 'Terms or feedback documents', 'Diverse terms, one per cluster', 'k-means on term vectors'],
        ['Recommenders', 'Users or items', 'Neighbour search over cluster instead of all users; handles sparsity', 'k-means over users'],
        ['Duplicate detection, topic detection and tracking, language model smoothing, summarisation, source selection in distributed IR', 'Documents/news stories', 'Group near-duplicates, track stories', 'Single-pass incremental clustering, shingling + MinHash']
      ] },
      'Challenges: choosing K, cluster labelling, hard vs soft assignment, cost for dynamic collections, similarity measure choice. Discussion point in the notes: mainstream web engines still show a ranked list although cluster interfaces exist since the 1990s (users prefer simplicity and speed; clusters can be hard to label; the cluster hypothesis fails for many queries).'
    ] },
    { heading: 'Evaluating a clustering algorithm (2022-23, 2023-24: 8 marks)', items: [
      '**Internal criteria:** RSS/average distance to centroid in k-means, intra-cluster similarity (cohesion) vs inter-cluster similarity (separation), silhouette. Weakness: they do not measure usefulness to an application and favour the algorithm\'s own objective.',
      '**External criteria (gold standard of human-defined classes):**',
      { type: 'formula', label: 'Purity', text: 'purity(Ω, C) = (1/N) Σ_k max_j |ω_k ∩ c_j|: for each cluster take the count of its majority class, sum, divide by the total number of points.' },
      'Worked (lecture figure, 17 points, three classes x, o and diamond): cluster 1 = 5 x + 1 o (majority x, 5); cluster 2 = 4 o + 1 x + 1 diamond (majority o, 4); cluster 3 = 3 diamonds + 2 x (majority diamond, 3). Purity = (5+4+3)/17 = **0.71**. Easy to get purity 1 with N singleton clusters, so combine with a measure that penalises many clusters.',
      { type: 'table', head: ['Pairs of documents', 'same cluster', 'different clusters'], rows: [['same class', 'true positives (TP)', 'false negatives (FN)'], ['different classes', 'false positives (FP)', 'true negatives (TN)']] },
      'Lecture framing: TP + FN + FP + TN = C(N,2) = the number of pairs for N documents; each pair is positive or negative (the clustering puts the two documents in the same or in different clusters) and true or false (the decision is correct or incorrect).',
      { type: 'formula', label: 'Rand index (pair counting)', text: 'RI = (TP + TN) / (TP + FP + FN + TN) over all N(N-1)/2 document pairs. TP = same class and same cluster; FP = different classes but same cluster; FN = same class but different clusters; TN = different both.' },
      'Worked (same 17-document figure; recomputed from the cluster contents, the slides give only the definition): 136 pairs; TP = 20, FP = 20, FN = 24, TN = 72 gives RI = 92/136 = **0.68**. Other measures: F-measure on pairs (precision of pair decisions), normalised mutual information.',
      '**Task-based (extrinsic) evaluation:** does cluster-based retrieval improve MAP/recall/efficiency; does the **cluster hypothesis test** hold; user studies (can users find documents faster with clusters; quality and labels of clusters); stability under sub-sampling and different seeds; cluster size distribution; scalability.',
      '**Procedure to quote:** build a labelled test collection (human classes), run the algorithm with several K and seeds, compute purity/Rand/RSS and compare against baselines (random clusters, k-means vs HAC), repeat for robustness, and finally evaluate in the application.'
    ] }
  ],
  pitfalls: [
    'Stating the cluster hypothesis without saying how to test it or what follows from it.',
    'Reporting purity alone (trivially maximised by many clusters).',
    'Evaluating clusters only internally; the question usually wants external or task-based evaluation too.',
    'For "two IR applications" naming the application but not the clustering algorithm and rationale.'
  ]
},
{
  id: 'document-similarity-structured',
  title: 'Similarity and clustering of structured documents (scientific articles)',
  priority: 19,
  tier: 'likely',
  freq: '5/9 papers (10 marks in 2025-26)',
  marks: '8-10 marks',
  summary: '**Combine several similarity sources: per-field tf-idf cosine (title, abstract, keywords, body), citation-based bibliographic coupling from the reference lists, and author/keyword overlap, via a weighted sum; then cluster (HAC or k-means) into topic sub-collections.**',
  mnemonic: 'Fields + Citations + Authors, weighted, then cluster',
  source: ['past papers (not in notes)', 'CT4100_Notes_08_Web_Search', 'CT4100_Notes_09_Clustering', 'CT4100_Notes_01_Introduction'],
  sections: [
    { heading: 'The question (5 papers)', items: [
      '"Given scientific articles (title, abstract, authors, keywords, main body, bibliography) suggest an approach to measure similarity between documents [and group them into useful sub-clusters / clustering for two IR tasks]". Typical marks: 8-10.'
    ] },
    { heading: 'Similarity measures per component', items: [
      '**Textual content (title, abstract, keywords, body):** pre-process (tokenise, lower-case, stop words, stemming), build a separate tf-idf (or BM25) vector for each **field**, cosine similarity per field. Title and keywords are short, high precision; abstract is a concentrated summary; body has most vocabulary but is noisy (long, length normalisation needed). Idf computed per field.',
      '**Keywords:** treat as a set; Jaccard |K1 ∩ K2| / |K1 ∪ K2| or cosine over controlled keywords; expand with a thesaurus for synonyms.',
      '**Bibliography (citations):** **bibliographic coupling**: two papers are related if they cite the same papers; strength = |B_1 ∩ B_2| (number of shared references), normalised: cosine = |B_1 ∩ B_2| / sqrt(|B_1||B_2|) or Jaccard. **Co-citation** (two papers cited together by other papers) needs the citing graph; in a collection with only reference lists we can compute it by inverting the citations. Citation links are independent of vocabulary and so solve vocabulary mismatch. Also citation-graph measures (SimRank, PageRank-biased similarity).',
      '**Authors:** author overlap (Jaccard) or co-authorship network proximity; same group tends to work on the same topic but the evidence is weak (prolific authors across topics, common names).',
      '**Combination:** sim(d_i,d_j) = Σ_f w_f sim_f(d_i,d_j), w_f ≥ 0, Σ w_f = 1. Example weights: title 0.15, abstract 0.30, keywords 0.15, body 0.15, bibliography 0.20, authors 0.05. Choose weights by tuning on judged similar pairs, or learn them (regression, LTR), or use BM25F-style field weighting (per-field tf combined before saturation). Alternatively concatenate field vectors with weights into one vector and use cosine; or use document embeddings (SPECTER, trained on citations) as one more signal.',
      'Justify the choice: complementary evidence (text for topic, citations for vocabulary-independent relatedness, authors/keywords as cheap metadata); length normalisation for the body; normalise each similarity to [0,1] before mixing.',
      { type: 'diagram', kind: 'flow', data: { steps: [ { label: 'Parse fields', sub: 'title, abstract, keywords, body, refs, authors' }, { label: 'Pre-process', sub: 'stop words, stemming' }, { label: 'Per-field similarity', sub: 'tf-idf cosine, Jaccard, bibliographic coupling' }, { label: 'Weighted combination', sub: 'sum of w_f x sim_f' }, { label: 'Cluster', sub: 'HAC or k-means on similarity' } ] }, caption: 'Pipeline for similarity and clustering of scientific articles.' }
    ] },
    { heading: 'Clustering the collection into sub-collections', items: [
      '**Algorithm choice:** hierarchical agglomerative (average-link) on the combined similarity matrix gives a topic hierarchy for browsing and works directly from a similarity matrix; or k-means on the concatenated weighted field vectors (cheaper for large collections; K by RSS knee or penalty). Soft clustering helps interdisciplinary papers that belong to several topics.',
      '**Steps:** compute N×N similarity matrix; run clustering; cut the dendrogram at a threshold or choose K; **label** each cluster by its highest-weight terms/keywords; evaluate (purity against subject categories, silhouette, cluster hypothesis test: relevance of papers within clusters).',
      '**Uses for search:** cluster-based retrieval (match query to cluster centroids first; return neighbours of matches, improving recall and speed); browsing/Scatter-Gather; diversified results; recommend related papers; query expansion from cluster terms; restrict a search to a sub-collection.',
      '**Limitations:** weights need tuning and labelled data; bibliography parsing errors; recently published papers have few citations and self-citation distorts; fields vary in length; O(N^2) similarity matrix and HAC cost for large collections; multi-topic papers; clusters may not align with user needs; labels hard to interpret.'
    ] }
  ],
  pitfalls: [
    'Only describing text similarity: the question lists authors, keywords and bibliography to be used.',
    'Not saying how the evidence sources are combined (weights) or how weights are chosen.',
    'Forgetting limitations and evaluation, both usually requested.',
    'Confusing bibliographic coupling (shared references) with co-citation (cited together by others).'
  ]
}
];
