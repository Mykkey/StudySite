module.exports = [
{
  id: 'learning-to-rank',
  title: 'Learning to rank (pointwise, pairwise, listwise) and neural LTR',
  priority: 6,
  tier: 'core',
  freq: '4/9 papers directly (2025-26 both papers: 20 marks each sitting); learning in general 9/9',
  marks: '10 marks',
  summary: '**LTR treats ranking as supervised learning over query-document feature vectors with relevance labels; pointwise predicts a score/label per document, pairwise learns which of two documents is better, listwise optimises the whole ranked list (nDCG); neural LTR learns the features from raw text.**',
  mnemonic: 'Point = one doc, Pair = two docs, List = whole ranking',
  source: ['past papers (not in notes)', 'CT4100_Notes_01_Introduction', 'CT4100_Notes_08_Web_Search'],
  sections: [
    { heading: 'Idea and advantage over hand-tuned ranking', items: [
      'Many signals indicate relevance: BM25 on body/title/anchor text, tf, idf, document length, PageRank/HITS, URL depth and type, click statistics, freshness. How to combine them? The notes: "learn the optimal way to combine all the signals" (neural nets, SVM, Bayesian networks; genetic programming; LETOR benchmark).',
      '**Key advantage over manually tuned functions:** (1) automatically combines hundreds of features and their interactions, which humans cannot tune by hand; (2) **optimises the target metric directly** (nDCG, MAP) on training data; (3) adapts to new data, languages, domains and changing signals by retraining; (4) reproducible, less expert effort; (5) generalises to unseen queries better than a few guessed weights, and can exploit click data.',
      'Typical pipeline: first-stage retrieval (BM25) gets top 100-1000 candidates, then the learned ranker **re-ranks** them.',
      { type: 'diagram', kind: 'flow', data: { steps: [ { label: 'Query', sub: 'user input' }, { label: 'First-stage retrieval', sub: 'BM25 inverted index, top 1000' }, { label: 'Feature extraction', sub: 'one vector per (q,d) pair' }, { label: 'Learned ranker', sub: 'score f(x)' }, { label: 'Final ranking', sub: 'sorted by score' } ] }, caption: 'Learning-to-rank as a re-ranking stage.' }
    ] },
    { heading: 'Training example and data', items: [
      '**One training instance:** a query q, a document d, a **feature vector** x(q,d) (e.g. BM25 body 7.2, BM25 title 3.1, tf-idf 0.4, PageRank 0.0003, doc length 1200, URL length 25) and a **relevance label** y (binary or graded 0-4 from assessors, or derived from clicks).',
      '**Training set:** many queries, each with a list of judged documents (grouped by query). Datasets: LETOR, MSLR-WEB30K, Yahoo LTR, MS MARCO. Labels come from human assessors or click logs (position-bias corrected).',
      '**Evaluation metrics to guide the search / training:** nDCG@k (graded relevance, position discount, main choice), MAP (binary), MRR, ERR, P@k. Metrics are **non-differentiable** (depend on sorting), so methods optimise smooth surrogates or use metric-weighted gradients (LambdaRank). Always evaluate on held-out queries (cross-validation by query).'
    ] },
    { heading: 'Three paradigms (2025-26 P2 Q3a: loss function and unit of training)', items: [
      { type: 'table', head: ['', 'Pointwise', 'Pairwise', 'Listwise'], rows: [
        ['Unit of training', 'One document (q,d) at a time', 'A pair of documents for the same query (d_i more relevant than d_j)', 'The entire ranked list for a query'],
        ['Problem type', 'Regression (predict grade), classification (relevant?) or ordinal regression', 'Binary classification of pairs: is i above j?', 'Direct list/metric optimisation'],
        ['Loss', 'Squared error (f(x) - y)^2, cross-entropy', 'Hinge (RankSVM) or logistic RankNet loss on score differences', 'Listwise cross-entropy (ListNet), likelihood (ListMLE), or metric-based lambdas (nDCG gain of swapping)'],
        ['Example algorithms', 'Linear/logistic regression, McRank, PRank', 'RankNet, RankSVM, RankBoost, LambdaRank', 'ListNet, ListMLE, AdaRank, LambdaMART (strictly pairwise gradients weighted by listwise metric)'],
        ['Pros', 'Simple, scalable, any regressor', 'Uses relative order, closer to ranking', 'Closest to the evaluation metric; handles position'],
        ['Cons', 'Ignores relative order and query context; queries with many documents dominate; score calibration across queries irrelevant for ranking', 'Many pairs (O(n^2)); all pairs weighted equally regardless of rank position; noisy labels', 'Complex, costly; metric not differentiable']
      ] },
      { type: 'formula', label: 'RankNet pairwise loss', text: 'P(i ▷ j) = 1 / (1 + exp(-(s_i - s_j))), loss = -log P(i ▷ j) when i is truly more relevant. s = model score.' },
      'Worked: s_i = 2.0, s_j = 1.5 gives P = 0.622, loss 0.474 (small); wrong order s_i = 1.0, s_j = 2.0 gives P = 0.269, loss 1.313 (large). Gradient descent pushes the correctly ordered pair apart.',
      { type: 'formula', label: 'Pointwise loss (regression)', text: 'L = Σ_{(q,d)} (f(x_{q,d}) - y_{q,d})^2. Example: label 3, prediction 2.4 gives loss 0.36.' },
      '**LambdaRank/LambdaMART:** each pair\'s gradient is multiplied by |ΔnDCG| from swapping the two documents, so mistakes at the top of the ranking are fixed first. LambdaMART (gradient-boosted trees) is the classic strong baseline and was long state of the art.'
    ] },
    { heading: 'Neural LTR vs traditional LTR (2025-26 P1 Q4b)', items: [
      { type: 'table', head: ['', 'Traditional LTR (linear, SVM, boosted trees)', 'Neural LTR'], rows: [
        ['Feature representation', 'Hand-crafted features: BM25, tf, idf, PageRank, document length, URL; need feature engineering', 'Learned representations: word/subword embeddings, transformer (BERT) encodings of raw query and document text; features learned end to end; can also take hand features as extra input'],
        ['Term dependencies', 'Bag of words; no semantics', 'Contextual semantics, synonyms, word order, so reduces vocabulary mismatch'],
        ['Computational requirements', 'Cheap: CPU, fast training and inference (milliseconds)', 'Expensive: GPUs, large training data, long training, inference per query-document pair (cross-encoders); only used to re-rank top 100-1000; bi-encoders precompute document vectors'],
        ['Data requirements', 'Modest labelled data', 'Large labelled data or pre-training (MS MARCO) plus fine-tuning; risk of poor out-of-domain generalisation (BEIR)'],
        ['Interpretability', 'Higher: feature weights/importances, tree paths can be inspected', 'Low: black box; hard to explain why a document ranks high; harder to debug and audit'],
        ['Typical performance', 'Strong on structured features and web data', 'Higher effectiveness on semantic matching; combined with BM25 in hybrid systems']
      ] },
      'Architectures: **cross-encoder** (query and document concatenated into one transformer: accurate, slow), **bi-encoder** (separate query and document encoders: fast with precomputed vectors, vector index), **late interaction** (ColBERT: token-level vectors), listwise or pairwise neural losses on top. See Neural IR topic.'
    ] },
    { heading: 'Limitations and practical issues (any LTR answer)', items: [
      'Requires **labelled data**: judgements are expensive; click data is noisy and biased (position and presentation bias).',
      'Features must be chosen and normalised per query; **overfitting** to training queries; train/test mismatch (distribution shift).',
      'Metric non-differentiability; computational cost of pairs/lists; need for regular retraining; **explainability**; fairness and feedback loops from click-trained models.'
    ] }
  ],
  pitfalls: [
    'Mixing up unit of training: pointwise = a document, pairwise = a pair of documents, listwise = a list.',
    'Saying "loss = nDCG": nDCG is not differentiable; listwise losses are surrogates or lambda weights.',
    'Forgetting to state the training example (query, document, features, label) when the question asks what constitutes one.',
    'Describing neural LTR only as "more accurate": the question asks about features, compute and interpretability.'
  ]
},
{
  id: 'learning-term-weights',
  title: 'Learning in IR: learning term weights (GA/GP, neural nets), learning tasks',
  priority: 7,
  tier: 'core',
  freq: '9/9 papers (learning an IR task or term weights: 6-10 marks each)',
  marks: '6-10 marks',
  summary: '**Pick one approach (neural network or genetic programming), state the data (queries + documents + relevance judgements), the representation, the learning loop, how fitness/error is computed, how it is tested on unseen queries, and the limitations (labels, overfitting, cost, interpretability).**',
  mnemonic: 'D-R-L-E-L: Data, Representation, Learning rule, Evaluation, Limitations',
  source: ['CT4100_Notes_01_Introduction', 'CT4100_Notes_08_Web_Search', 'past papers (not in notes)'],
  sections: [
    { heading: 'Recurring question', items: [
      '"Learning mechanisms have been used successfully in IR. Using an approach of your choice, suggest a learning mechanism to identify good weights to apply to terms in documents. Discuss limitations." (2021-22, 2024-25 x2) and "outline learning approaches for any IR task: the data available, the learning mechanism, limitations" (2022-23, 2023-24 x2).',
      'The course lists **Learning to rank, Neural networks, Evolutionary computation** (genetic algorithms/genetic programming) as the learning-in-IR topics. Learn ONE well, and keep a second as backup.'
    ] },
    { heading: 'Approach A: genetic programming to evolve a weighting function', items: [
      '**Data:** a training collection with queries and relevance judgements (e.g. TREC). Split queries into training and test.',
      '**Representation:** each individual is a **tree** representing a term-weighting function. Terminals: tf, idf, df, N, document length, average length, constants. Functions: +, -, ×, ÷, log, sqrt. Example tree: (tf × log(N/df)) / sqrt(dl). (GA alternative: a fixed-length vector of parameters such as BM25 k1, b and mixture weights.)',
      '**Fitness:** run retrieval over training queries using the individual as the weighting function; fitness = MAP (or nDCG, P@10) of the resulting rankings.',
      '**Loop:** initialise a random population (e.g. 100-500 trees); evaluate fitness; select parents (tournament/roulette); **crossover** (swap subtrees), **mutation** (replace a node/subtree), reproduction/elitism; repeat for G generations or until fitness stops improving; return the best tree.',
      '**Evaluation:** apply the best function to unseen test queries (and a different collection) and compare with tf-idf/BM25 baselines; use significance tests.',
      '**Limitations:** needs many relevance judgements; **overfitting** to training queries and collection; very expensive (each fitness evaluation runs retrieval on many queries); stochastic, so results vary run to run and may hit local optima; evolved functions can be bloated and hard to interpret; may not beat BM25; must keep the function efficient for inverted-index use; sensitive to GA parameters (population size, mutation rate).'
    ] },
    { heading: 'Approach B: neural network / learning feature weights', items: [
      '**Data:** training triples (query, document, label) with relevance judgements; document features such as tf, idf, tf-idf, document length, term position, whether in title, query-term frequency; or term-level features with the label "term is important for this document".',
      '**Model:** a single neuron (perceptron/logistic regression) or small multi-layer network f(x) = σ(w · x + b) giving a relevance score or term weight.',
      '**Learning:** gradient descent/back-propagation on a loss (squared error or cross-entropy for pointwise; pairwise margin loss). Repeat over epochs, validate on held-out queries to stop early.',
      { type: 'diagram', kind: 'layers', data: { title: 'Network mapping term features to a weight', layers: [4, 5, 3, 1], labels: ['Features: tf, idf, doc length, position', 'Hidden layer', 'Hidden layer', 'Term weight / relevance score'] }, caption: 'A small feed-forward network that learns how to combine term features into a term weight.' },
      'Worked pairwise perceptron update: features x = (tf, idf, 1/len). x_rel = (3, 2, 0.5), x_nonrel = (1, 2, 0.2), w = (0, 0, 0), η = 0.1. Scores tie at 0 so update w ← w + η (x_rel - x_nonrel) = (0.2, 0, 0.03). New scores: relevant 0.615, non-relevant 0.206: correct order.',
      '**Limitations:** same as above plus black-box weights, need for feature design and normalisation, local minima, risk of learning collection-specific quirks, need for retraining when the collection changes, large training data for deep nets.'
    ] },
    { heading: 'Other IR tasks where learning is used (data / mechanism / limits)', items: [
      { type: 'table', head: ['Task', 'Data available', 'Learning mechanism', 'Limitations'], rows: [
        ['Ranking (LTR)', 'Queries, feature vectors, graded judgements or clicks', 'Pointwise/pairwise/listwise models, LambdaMART, neural rankers', 'Labels expensive; click bias; overfitting; interpretability'],
        ['Query expansion/term selection', 'Query, top documents, candidate terms, whether adding a term improved AP', 'Classifier/regressor predicting useful terms; neural expansion', 'Training labels per term costly; drift; collection dependence'],
        ['Query difficulty prediction', 'Queries with predictor values and actual AP', 'Regression combining pre- and post-retrieval predictors', 'Few training queries; poor correlation reported'],
        ['Document classification/filtering', 'Labelled documents (spam/not spam, topic)', 'Naive Bayes, SVM, neural classifiers', 'Concept drift; imbalanced classes; need labels'],
        ['Recommendation', 'User-item ratings', 'Matrix factorisation, neural collaborative filtering', 'Cold start, sparsity, bias'],
        ['Clustering (unsupervised)', 'Document vectors, no labels', 'k-means, hierarchical', 'Number of clusters; evaluation']
      ] }
    ] }
  ],
  pitfalls: [
    'Giving only a generic "use machine learning" answer: specify features/representation, the label source and the training procedure.',
    'Omitting limitations (overfitting, label cost, computation, interpretability): asked in every version of this question.',
    'Evaluating on the training queries; always test on unseen queries.',
    'Confusing learning term weights (a scoring function) with learning to rank (combining many features).'
  ]
},
{
  id: 'neural-ir',
  title: 'Neural IR, embeddings and term dependence',
  priority: 27,
  tier: 'likely',
  freq: '2/9 papers (2025-26 both)',
  marks: '5 marks (Q1) or part of LTR 10 marks',
  summary: '**Neural retrievers map queries and documents to dense contextual vectors, so semantically related words (car, automobile) and word order are captured implicitly, unlike bag-of-words models (tf-idf, BM25) that treat terms as independent exact-match tokens.**',
  mnemonic: 'Embeddings = meaning in numbers; BoW = words in a bag',
  source: ['past papers (not in notes)', 'CT4100_Notes_04_Metrics', 'CT4100_Notes_06_Relevance_Feedback'],
  sections: [
    { heading: 'Why embeddings capture term dependencies (2025-26 P2 Q1f)', items: [
      '**Embeddings** (word2vec, GloVe, BERT) are dense low-dimensional vectors learned from large text by predicting context ("you shall know a word by the company it keeps"). Words used in similar contexts get nearby vectors, so synonyms and related terms (car, automobile, vehicle) are close: **semantic similarity is captured without exact term overlap**.',
      '**Contextual** models (transformers) give a word a different vector depending on neighbouring words ("bank" in river bank vs bank account), so word order, phrases and syntax are captured through self-attention. Terms are therefore NOT independent: the representation of one term depends on the others.',
      '**Bag-of-words contrast:** tf-idf/BM25 treat each term as an independent dimension; word order is ignored ("Mary is quicker than John" = "John is quicker than Mary"); terms match only if the strings match (vocabulary mismatch); synonyms and polysemes are not handled; new york is two unrelated terms. Advantages of BoW: fast inverted-index retrieval, transparent, no training, strong baseline (BM25 still the baseline neural models are compared with).'
    ] },
    { heading: 'Neural retrieval architectures', items: [
      '**Dense retrieval / bi-encoder:** query encoder and document encoder produce vectors; relevance = dot product or cosine; document vectors precomputed and searched with approximate nearest-neighbour indexes; fast, handles mismatch, but can lose exact-match signals (rare terms, IDs).',
      '**Cross-encoder (monoBERT):** query and document passed together through a transformer; very accurate, too slow for the whole collection, so used to **re-rank** the top 100-1000 from BM25.',
      '**Late interaction (ColBERT):** token-level vectors, MaxSim matching: between bi- and cross-encoder in cost.',
      '**Learned sparse (SPLADE, doc2query):** neural models expand documents/queries with related terms but keep an inverted index.',
      '**Hybrid:** combine BM25 and dense scores (the strongest practical systems).'
    ] },
    { heading: 'Evaluation data and caveats', items: [
      'Benchmarks: **MS MARCO** (real queries, millions of passages, typically one judged relevant passage per query), **BEIR** (heterogeneous collections that test generalisation to unseen domains). Metrics: MRR@10, nDCG@10, recall@100.',
      'Caveats: large compute and data; weaker out-of-domain than BM25 sometimes; black box; embeddings reflect biases; need relevance labels or synthetic labels; some published neural methods were beaten by well-tuned simple baselines (also noted for neural recommenders).',
      'Applications: question answering and **retrieval-augmented generation (RAG)**: retrieve passages, then an LLM generates a cited answer.'
    ] }
  ],
  pitfalls: [
    'Saying neural models "understand" language: say they learn distributional semantics from context.',
    'Forgetting to contrast explicitly with the bag-of-words/independence assumption in a "contrast" question.',
    'Claiming dense retrieval is always better: BM25 remains a strong baseline and hybrids are common.'
  ]
}
];
