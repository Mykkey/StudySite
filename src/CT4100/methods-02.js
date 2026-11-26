module.exports = [
{
  id: 'm-kmeans', topicId: 'clustering-algorithms', title: 'Run k-means by hand',
  when: 'Given points/vectors, K and initial seeds',
  mnemonic: 'Assign, Average, Repeat until nothing moves',
  steps: [
    '1. Set the K seeds as the initial centroids.',
    '2. Compute the distance (Euclidean or 1 - cosine) from every point to every centroid.',
    '3. Assign each point to its nearest centroid (break ties consistently).',
    '4. Recompute each centroid as the mean of its points (coordinate by coordinate).',
    '5. Repeat 2-4; stop when no assignment changes (or RSS stops falling).',
    '6. Optionally report RSS = Σ squared distance to own centroid.'
  ],
  example: {
    problem: 'Points A(1,1), B(1.5,2), C(3,4), D(5,7), E(3.5,5), F(4.5,5), G(3.5,4.5). K = 2, seeds A and B.',
    solution: [
      'Iteration 1 assignment: A is nearer A (0 vs 1.12). B..G are nearer B (e.g. C: 3.61 vs 2.50; G: 4.30 vs 3.20). Clusters {A}, {B,C,D,E,F,G}.',
      'Recompute: μ1 = (1,1); μ2 = ((1.5+3+5+3.5+4.5+3.5)/6, (2+4+7+5+5+4.5)/6) = (3.5, 4.583). RSS = 20.71.',
      'Iteration 2: B is nearer μ1 (1.12 vs 3.27); C is nearer μ2 (0.77 vs 3.61); D, E, F, G stay. Clusters {A,B}, {C,D,E,F,G}.',
      'Recompute: μ1 = (1.25, 1.5); μ2 = (3.9, 5.1). RSS = 8.53.',
      'Iteration 3: no point changes: converged. Final clusters {A,B} and {C,D,E,F,G}.'
    ]
  },
  diagram: { kind: 'scatter', data: { title: 'k-means final clusters', xLabel: 'x', yLabel: 'y', xMin: 0, xMax: 6, yMin: 0, yMax: 8, series: [ { name: 'cluster 1', points: [[1,1],[1.5,2]] }, { name: 'cluster 2', points: [[3,4],[5,7],[3.5,5],[4.5,5],[3.5,4.5]] }, { name: 'centroids', points: [[1.25,1.5],[3.9,5.1]] } ] }, caption: 'Converged clusters and centroids.' }
},
{
  id: 'm-hac', topicId: 'clustering-algorithms', title: 'Hierarchical agglomerative clustering (single, complete, average link)',
  when: 'Given points or a distance matrix and asked for the merge order/dendrogram',
  mnemonic: 'Merge the closest pair; recompute cluster distance by the link rule',
  steps: [
    '1. Start with every item as a cluster; write the pairwise distance matrix.',
    '2. Find the two closest clusters; merge them and record the merge distance.',
    '3. Cluster distance: single = min pairwise, complete = max pairwise, average = mean of all pairwise.',
    '4. Update distances to the new cluster using the same rule.',
    '5. Repeat until one cluster remains; draw the dendrogram with merge heights.',
    '6. Cut at a height (or K clusters) to read off clusters; mention chaining (single) vs compactness (complete).'
  ],
  example: {
    problem: 'One-dimensional points a = 1, b = 2, c = 4, d = 7, e = 11. Give the merges for single, complete and average link.',
    solution: [
      'Single: a+b @1; c+{a,b} @2 (c to b); d+{a,b,c} @3 (d to c); e+rest @4 (e to d).',
      'Complete: a+b @1; c+d @3; {a,b}+{c,d} @6 (a to d); e+rest @10 (a to e).',
      'Average: a+b @1; c+{a,b} @2.5 (mean of 3 and 2); d+e @4 (beats d to {a,b,c} = 4.67); {a,b,c}+{d,e} @6.67 (sum 6+10+5+9+3+7 = 40, over 6 pairs).',
      'Single link chains one point at a time; complete link gives two compact groups {a,b},{c,d} before e joins.'
    ]
  }
},
{
  id: 'm-extended-boolean', topicId: 'boolean-models', title: 'Extended Boolean (p-norm) relevance of AND / OR queries',
  when: 'Asked to calculate the relevance of document d to "t1 AND t2" and "t1 OR t2"',
  mnemonic: 'OR from the origin, AND from (1,1)',
  steps: [
    '1. Get term weights w1, w2 in [0,1]: usually (tf/max tf) × (idf/max idf); state your assumption.',
    '2. Choose p (2 is standard); mention p = 1 and p = ∞ limits.',
    '3. OR: sim = ((w1^p + w2^p)/2)^(1/p).',
    '4. AND: sim = 1 - (((1-w1)^p + (1-w2)^p)/2)^(1/p).',
    '5. NOT t: use weight 1 - w; for n terms divide by n.',
    '6. Compare with min/max (fuzzy) and rank documents by the result.'
  ],
  example: {
    problem: 'N = 1000; df(highway) = 100, df(revisited) = 10; in d: tf(highway) = 3, tf(revisited) = 1 (max tf 3). Compute highway AND revisited and highway OR revisited with p = 2.',
    solution: [
      'idf: highway log10(1000/100) = 1; revisited log10(1000/10) = 2 (max idf 2).',
      'w_highway = (3/3)(1/2) = 0.5; w_revisited = (1/3)(2/2) = 0.333.',
      'OR = sqrt((0.25 + 0.111)/2) = sqrt(0.1806) = 0.425.',
      'AND = 1 - sqrt((0.5^2 + 0.667^2)/2) = 1 - sqrt(0.3472) = 1 - 0.589 = 0.411.',
      'Check limits: p = 1 gives both 0.417; fuzzy gives AND = min = 0.333, OR = max = 0.5.'
    ]
  }
},
{
  id: 'm-qpp-compute', topicId: 'query-performance-prediction', title: 'Compute pre- and post-retrieval difficulty predictors',
  when: 'Given df values, collection size or a list of retrieval scores',
  mnemonic: 'IDF averages, scope fractions, NQC spread',
  steps: [
    '1. AvgIDF = mean over query terms of log(N/df).',
    '2. Scope = (documents containing at least one query term)/N.',
    '3. PMI(t1,t2) = log[ P(t1,t2)/(P(t1)P(t2)) ] with P = df/N; average over pairs.',
    '4. Clarity: KL(P(w|Q) || P(w|C)) between result and collection word distributions.',
    '5. NQC = sqrt(mean (s - μ)^2 over the top-k scores) / collection score.',
    '6. Interpret: high AvgIDF/clarity/NQC suggest easy; tiny scope suggests misspelling; negative correlation with AP means a bad predictor.'
  ],
  example: {
    problem: 'N = 10,000; df: apple 50, pie 500, the 9000. Query A "apple pie", query B "the pie". Also scores A = 9.5, 8.7, 7.9, 3.2, 2.8, 2.5, 2.2, 2.0; B = 6.1, 5.9, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3.',
    solution: [
      'idf: apple log10(200) = 2.301; pie log10(20) = 1.301; the log10(1.11) = 0.046.',
      'AvgIDF("apple pie") = (2.301 + 1.301)/2 = 1.80 (specific, easier); AvgIDF("the pie") = (0.046 + 1.301)/2 = 0.67 (stop word dilutes).',
      'PMI example: P(t1) = 0.1, P(t2) = 0.05, P(t1,t2) = 0.02: log2(0.02/0.005) = 2 bits: terms co-occur more than chance.',
      'Score spread: list A mean 4.85, std = sqrt(9.17) = 3.03; list B mean 5.66, std = 0.25. NQC numerator A 3.03 >> B 0.25: A predicted easier (sharp separation after rank 3).'
    ]
  }
},
{
  id: 'm-mmr', topicId: 'diversity', title: 'Select diverse items or terms with MMR',
  when: 'Asked to pick k terms/documents balancing relevance and novelty',
  mnemonic: 'Take the best, then the best that is not like what I have',
  steps: [
    '1. Score every candidate for relevance (association with the query, retrieval score).',
    '2. Fix λ (e.g. 0.7) and a similarity measure between candidates.',
    '3. Select the highest-relevance candidate first.',
    '4. For each remaining candidate compute λ rel - (1-λ) max sim to the selected set.',
    '5. Pick the maximum; repeat until k items chosen.',
    '6. Evaluate relevance and diversity together (nDCG with S-recall/ILD).'
  ],
  example: {
    problem: 'λ = 0.7. Relevance d1 0.9, d2 0.85, d3 0.6, d4 0.5. Similarities: d1d2 0.95, d1d3 0.2, d1d4 0.1, d2d3 0.25, d2d4 0.15, d3d4 0.3. Select 3.',
    solution: [
      'Pick d1 (highest relevance).',
      'Round 2: d2 = 0.7(0.85) - 0.3(0.95) = 0.31; d3 = 0.7(0.6) - 0.3(0.2) = 0.36; d4 = 0.7(0.5) - 0.3(0.1) = 0.32. Pick d3.',
      'Round 3: d2 = 0.595 - 0.3(max(0.95, 0.25)) = 0.31; d4 = 0.35 - 0.3(max(0.1, 0.3)) = 0.26. Pick d2.',
      'MMR order d1, d3, d2 (d4 last) vs relevance order d1, d2, d3: near-duplicate d2 demoted.'
    ]
  }
},
{
  id: 'm-ltr-loss', topicId: 'learning-to-rank', title: 'Compute pointwise and pairwise LTR losses',
  when: 'Asked to illustrate loss functions for pointwise/pairwise learning to rank',
  mnemonic: 'Point: error of one score; Pair: sigmoid of the score gap',
  steps: [
    '1. Pointwise: loss = (f(x) - y)^2 for each (query, document) example.',
    '2. Pairwise: for a pair (i better than j) compute P = 1/(1 + exp(-(s_i - s_j))).',
    '3. Pairwise loss = -log P; large when the order is wrong.',
    '4. Listwise/LambdaRank: weight each pair gradient by |ΔnDCG| of swapping the pair.',
    '5. Update parameters by gradient descent; evaluate nDCG on held-out queries.'
  ],
  example: {
    problem: 'Label 3, prediction 2.4 (pointwise). Pair with s_i = 2.0, s_j = 1.5, and the reversed pair s_i = 1.0, s_j = 2.0 where i is truly better.',
    solution: [
      'Pointwise loss = (2.4 - 3)^2 = 0.36.',
      'Correct order: P = 1/(1 + e^-0.5) = 0.622; loss = -ln 0.622 = 0.474.',
      'Wrong order: P = 1/(1 + e^1) = 0.269; loss = -ln 0.269 = 1.313: the model is pushed to raise s_i above s_j.'
    ]
  }
},
{
  id: 'm-learn-weights', topicId: 'learning-term-weights', title: 'Design a learning mechanism for term weights (GP / neural answer)',
  when: 'Asked to "suggest a learning mechanism to identify good weights" and discuss limitations',
  mnemonic: 'D-R-L-E-L: Data, Representation, Learning, Evaluation, Limitations',
  steps: [
    '1. Data: queries, documents, relevance judgements; split train/validation/test queries.',
    '2. Representation: GP tree over tf, idf, length (or a feature vector for a network).',
    '3. Learning rule: GP fitness = MAP and crossover/mutation/selection; or back-propagation / perceptron updates.',
    '4. Stop criterion: fixed generations, no fitness gain, validation error rising.',
    '5. Evaluate the learned function on unseen queries against tf-idf and BM25; significance test.',
    '6. Limitations: labels, overfitting, cost, local optima, interpretability, retraining.'
  ],
  example: {
    problem: 'Show one pairwise perceptron update for features (tf, idf, 1/length).',
    solution: [
      'x_rel = (3, 2, 0.5), x_non = (1, 2, 0.2), w = (0,0,0), η = 0.1.',
      'Scores tie (0 and 0) so update w = w + η(x_rel - x_non) = 0.1(2, 0, 0.3) = (0.2, 0, 0.03).',
      'New scores: relevant 0.2(3) + 0.03(0.5) = 0.615; non-relevant 0.2(1) + 0.03(0.2) = 0.206: now ordered correctly.',
      'GP alternative: tree (tf × idf)/sqrt(dl); fitness is MAP over training queries.'
    ]
  }
},
{
  id: 'm-assoc-cluster', topicId: 'query-expansion-analysis', title: 'Select expansion terms with association clusters (local analysis)',
  when: 'Asked how to choose terms for query expansion from the retrieved set',
  mnemonic: 'Retrieve, count co-occurrence, Jaccard, sum over query terms, take top m',
  steps: [
    '1. Run the query and keep the top-k documents (local set).',
    '2. Count f(t) (documents containing t) and f(t,s) (containing both) for candidate and query terms.',
    '3. Association M(t,s) = f(t,s)/(f(t) + f(s) - f(t,s)).',
    '4. Score candidate t: S(t) = Σ_{s in query} M(t,s).',
    '5. Take the highest m (e.g. 3-10), optionally diversify with MMR; weight lower than original terms.',
    '6. Re-run; state limitations (drift, sample size).'
  ],
  example: {
    problem: 'Top-10 docs. Query term "jaguar": f = 6. Candidate "engine": f = 5, both = 4; candidate "cat": f = 4, both = 2; candidate "car": f = 6, both = 5. Rank candidates.',
    solution: [
      'engine: 4/(6 + 5 - 4) = 4/7 = 0.571.',
      'cat: 2/(6 + 4 - 2) = 2/8 = 0.25.',
      'car: 5/(6 + 6 - 5) = 5/7 = 0.714.',
      'Order: car, engine, cat. Note the sense issue: cat is a different sense; a diversity step would keep one term per sense (car and cat) rather than car and engine.'
    ]
  }
}
];
