module.exports = [
{
  id: 'm-cosine-tfidf', topicId: 'vector-space-model', title: 'Rank documents with tf-idf and cosine similarity',
  when: 'Asked to compute/rank documents against a query in the vector space model',
  mnemonic: 'IDF first, DOT next, divide by LENGTHS',
  steps: [
    '1. Count N (documents) and df of every term that matters; compute idf = log(N/df) (state the log base).',
    '2. Weight each document term: w = tf × idf (or normalised tf × idf). Weight the query the same way (tf_q × idf).',
    '3. Compute the dot product q · d = Σ w_q × w_d over shared terms only.',
    '4. Compute the lengths |q| = sqrt(Σ w_q^2) and |d| = sqrt(Σ w_d^2) over ALL terms of each vector.',
    '5. cosine = dot / (|q| |d|); |q| is the same for all documents so it never changes the order.',
    '6. Sort by cosine, descending; documents sharing no term score 0.'
  ],
  example: {
    problem: 'N = 5 docs: d1 = cat 2, dog 1; d2 = cat 1, mouse 1; d3 = dog 2, bird 1; d4 = bird 2, mouse 1; d5 = cat 1, fish 3. Query "cat dog". Rank the documents (log10).',
    solution: [
      'df: cat 3, dog 2, mouse 2, bird 2, fish 1. idf: cat log10(5/3) = 0.222; dog = mouse = bird = log10(5/2) = 0.398; fish log10(5) = 0.699.',
      'Query vector: cat 0.222, dog 0.398 (tf 1 each), |q| = sqrt(0.0492 + 0.1584) = 0.456.',
      'd1: cat 2(0.222) = 0.444, dog 0.398; dot = 0.444(0.222) + 0.398(0.398) = 0.0985 + 0.1584 = 0.257; |d1| = sqrt(0.197 + 0.158) = 0.596; cosine = 0.257/(0.596 × 0.456) = 0.946.',
      'd3: dog 2(0.398) = 0.796, bird 0.398; dot = 0.796(0.398) = 0.317; |d3| = 0.890; cosine = 0.317/(0.890 × 0.456) = 0.781.',
      'd2: cat 0.222, mouse 0.398; dot = 0.049; |d2| = 0.456; cosine = 0.237. d5: cat 0.222, fish 3(0.699) = 2.097; dot 0.049; |d5| = 2.109; cosine = 0.051. d4: no query term: 0.',
      'Ranking: d1 (0.946) > d3 (0.781) > d2 (0.237) > d5 (0.051) > d4 (0).'
    ]
  },
  diagram: { kind: 'bar', data: { title: 'Cosine scores', yLabel: 'cosine', bars: [ { label: 'd1', value: 0.946 }, { label: 'd3', value: 0.781 }, { label: 'd2', value: 0.237 }, { label: 'd5', value: 0.051 }, { label: 'd4', value: 0 } ] }, caption: 'Result of the worked ranking.' }
},
{
  id: 'm-bm25', topicId: 'bm25', title: 'Compute a BM25 score',
  when: 'Given N, df, tf, document length, avgdl, k1, b',
  mnemonic: 'idf × saturated tf, with length in the denominator',
  steps: [
    '1. For each query term: idf = ln((N - df + 0.5)/(df + 0.5)).',
    '2. Length factor L = (1 - b) + b × |d|/avgdl.',
    '3. tf part = tf (k1 + 1) / (tf + k1 L).',
    '4. Term score = idf × tf part × tf_q (tf_q usually 1).',
    '5. Sum over query terms; documents with higher sums rank higher.',
    '6. Sanity check: longer document (same tf) should score lower when b > 0; tf part never exceeds k1 + 1.'
  ],
  example: {
    problem: 'N = 1000, avgdl = 100, k1 = 1.2, b = 0.75. Query "information retrieval", df = 100 and 20. Doc A: |d| = 80, tf = 3 and 2. Doc B: |d| = 200, same tfs. Score both.',
    solution: [
      'idf(information) = ln(900.5/100.5) = 2.193; idf(retrieval) = ln(980.5/20.5) = 3.868.',
      'Doc A: L = 0.25 + 0.75(0.8) = 0.85, so k1 L = 1.02. information: 3(2.2)/(3 + 1.02) = 1.642; × 2.193 = 3.600. retrieval: 2(2.2)/(2 + 1.02) = 1.457; × 3.868 = 5.635. Score = 9.24.',
      'Doc B: L = 0.25 + 0.75(2) = 1.75, k1 L = 2.1. information: 6.6/5.1 = 1.294; × 2.193 = 2.838. retrieval: 4.4/4.1 = 1.073; × 3.868 = 4.150. Score = 6.99.',
      'A > B: same term counts but B is twice the average length so its tf is discounted.'
    ]
  }
},
{
  id: 'm-pr-curve', topicId: 'precision-recall', title: 'Build an interpolated precision-recall curve (and P, R, F)',
  when: 'Given a ranked list with relevance judgements',
  mnemonic: 'Walk, record, interpolate (max to the right), average',
  steps: [
    '1. Write down |R| = total relevant in the collection.',
    '2. For each rank k: P = relevant so far / k, R = relevant so far / |R|.',
    '3. Interpolate: P_interp(r) = max P over all ranks whose recall ≥ r.',
    '4. Tabulate at recall 0, 0.1, ..., 1.0 (levels not reached have precision 0).',
    '5. Plot recall on x, interpolated precision on y; for many queries average each level.',
    '6. Quote single-point values if asked: P@k, R@k, F1 = 2PR/(P+R).'
  ],
  example: {
    problem: 'Ranked list of 10: relevant at ranks 1, 3, 6, 8; |R| = 5. Compute the interpolated 11-point curve and F1 at rank 10.',
    solution: [
      'Rank / P / R at relevant docs: 1: 1.000 / 0.2; 3: 0.667 / 0.4; 6: 0.500 / 0.6; 8: 0.500 / 0.8.',
      'Interpolated: recall 0, 0.1, 0.2 -> 1.0; 0.3, 0.4 -> 0.667; 0.5 to 0.8 -> 0.5; 0.9, 1.0 -> 0 (never reached).',
      'At rank 10: P = 4/10 = 0.4, R = 4/5 = 0.8, F1 = 2(0.4)(0.8)/1.2 = 0.533.'
    ]
  },
  diagram: { kind: 'line', data: { title: 'Interpolated precision-recall', xLabel: 'recall', yLabel: 'precision', xMin: 0, xMax: 1, yMin: 0, yMax: 1.05, series: [ { name: 'interpolated', points: [[0,1],[0.1,1],[0.2,1],[0.3,0.667],[0.4,0.667],[0.5,0.5],[0.6,0.5],[0.7,0.5],[0.8,0.5],[0.9,0],[1,0]] } ] }, caption: '11-point interpolated curve of the example.' }
},
{
  id: 'm-ap-map-mrr', topicId: 'ranked-metrics', title: 'Compute AP, MAP, MRR and P@k',
  when: 'Asked for a single-number ranking metric over one or more queries',
  mnemonic: 'AP: average the precisions at the hits; MAP: average the APs',
  steps: [
    '1. Mark relevant ranks for each query and know |R_q|.',
    '2. At each relevant rank k compute P@k.',
    '3. AP = (sum of those precisions) / |R_q| (not / number retrieved).',
    '4. MAP = mean of AP over queries.',
    '5. Reciprocal rank = 1/(rank of first relevant); MRR = mean over queries.',
    '6. P@k = relevant in top k / k; R-precision = P@R.'
  ],
  example: {
    problem: 'Query 1: relevant at ranks 1, 3, 6, 8 with |R| = 5. Query 2: relevant at ranks 2, 4 with |R| = 2. Query 3: first relevant at rank 2. Compute AP1, AP2, MAP (queries 1-2) and MRR (queries with first relevant at 1, 2, 3).',
    solution: [
      'AP1 = (1/1 + 2/3 + 3/6 + 4/8)/5 = 2.667/5 = 0.533.',
      'AP2 = (1/2 + 2/4)/2 = 0.5.',
      'MAP = (0.533 + 0.5)/2 = 0.517.',
      'MRR for first-relevant ranks 1, 3, 2 = (1 + 0.333 + 0.5)/3 = 0.611.',
      'P@5 for query 1 = 2/5 = 0.4.'
    ]
  }
},
{
  id: 'm-ndcg', topicId: 'ranked-metrics', title: 'Compute DCG and nDCG',
  when: 'Graded relevance judgements and a ranked list',
  mnemonic: 'Gain over log-rank; divide by the ideal',
  steps: [
    '1. List the graded relevances in ranked order.',
    '2. Discount: divide the grade at rank i by log2(i + 1) (rank 1 divides by 1).',
    '3. DCG@k = sum of discounted gains.',
    '4. Sort the same grades descending for the ideal list and compute IDCG@k the same way.',
    '5. nDCG = DCG / IDCG, between 0 and 1.'
  ],
  example: {
    problem: 'Top 5 grades in system order: 3, 2, 3, 0, 1. Compute nDCG@5.',
    solution: [
      'Discounts: log2(2)=1, log2(3)=1.585, log2(4)=2, log2(5)=2.322, log2(6)=2.585.',
      'DCG = 3/1 + 2/1.585 + 3/2 + 0/2.322 + 1/2.585 = 3 + 1.262 + 1.5 + 0 + 0.387 = 6.149.',
      'Ideal order 3, 3, 2, 1, 0: IDCG = 3 + 3/1.585 + 2/2 + 1/2.322 + 0 = 3 + 1.893 + 1 + 0.431 = 6.324.',
      'nDCG@5 = 6.149/6.324 = 0.972.'
    ]
  }
},
{
  id: 'm-rocchio', topicId: 'rocchio-relevance-feedback', title: 'Apply the Rocchio update (binary and graded)',
  when: 'Given a query vector, relevant and non-relevant documents and α, β, γ',
  mnemonic: 'Keep α, Pull β to the relevant mean, Push γ from the non-relevant mean',
  steps: [
    '1. Write q_orig and every judged document as vectors over the same vocabulary.',
    '2. Centroid of relevant = (sum of relevant vectors)/|D_R|; centroid of non-relevant likewise.',
    '3. q_new = α q_orig + β centroid_R - γ centroid_N, term by term.',
    '4. Truncate negative components to 0.',
    '5. For graded feedback replace the plain mean by a rating-weighted mean (weights normalised to sum 1).',
    '6. State what changed: new terms added, old terms re-weighted, terms removed.'
  ],
  example: {
    problem: 'Vocabulary (information, retrieval, indexing, database). q = (1,1,0,0); relevant d1 = (1,2,2,0), d2 = (1,1,2,0); non-relevant d3 = (0,0,0,2); α = 1, β = 0.75, γ = 0.25. Then repeat with ratings d1 = 4, d2 = 2.',
    solution: [
      'Centroid_R = ((1,2,2,0) + (1,1,2,0))/2 = (1, 1.5, 2, 0). Centroid_N = (0,0,0,2).',
      'q_new = (1,1,0,0) + 0.75(1,1.5,2,0) - 0.25(0,0,0,2) = (1.75, 2.125, 1.5, -0.5) -> truncated (1.75, 2.125, 1.5, 0).',
      'Graded: weighted centroid = (4 d1 + 2 d2)/6 = (1, 1.667, 2, 0); q_new = (1,1,0,0) + 0.75(1, 1.667, 2, 0) - (0,0,0,0.5) = (1.75, 2.25, 1.5, -0.5) -> (1.75, 2.25, 1.5, 0).',
      'Effect: "indexing" added, "retrieval" and "information" boosted, "database" suppressed; the higher-rated d1 pulls "retrieval" up more (2.25 vs 2.125).'
    ]
  }
},
{
  id: 'm-inverted-index', topicId: 'inverted-index', title: 'Build an inverted/positional index and answer Boolean and phrase queries',
  when: 'Given a few short documents and queries',
  mnemonic: 'Tokenise, emit (term, doc, pos), sort, merge',
  steps: [
    '1. Pre-process each document (lower-case, stop words, stem if asked); number tokens 1, 2, 3 ... for positions.',
    '2. For each term list the documents containing it (sorted) with tf and positions.',
    '3. Boolean AND: intersect the doc lists with two pointers; OR: union; NOT: difference.',
    '4. Phrase "t1 t2": intersect doc lists, then keep documents where some position of t2 equals a position of t1 plus 1.',
    '5. Proximity "t1 NEAR/k t2": keep documents with |pos1 - pos2| ≤ k.',
    '6. For ranked retrieval attach tf and idf and accumulate scores term by term.'
  ],
  example: {
    problem: 'D1 "new york is big", D2 "the new york times", D3 "york new year", D4 "big apple new york". Positional index; answer "new york" as a phrase and as AND.',
    solution: [
      'new: D1 [1]; D2 [2]; D3 [2]; D4 [3]. york: D1 [2]; D2 [3]; D3 [1]; D4 [4]. big: D1 [4]; D4 [1].',
      'AND (new AND york): all four documents {D1, D2, D3, D4}.',
      'Phrase "new york": D1 new 1, york 2 yes; D2 2, 3 yes; D3 new 2 but york 1 (no york at 3) no; D4 3, 4 yes. Result {D1, D2, D4}.',
      '"new york" AND big: {D1, D4}.'
    ]
  }
},
{
  id: 'm-preprocess', topicId: 'preprocessing', title: 'Pre-process a text passage (stop words, case, stemming, tf table)',
  when: 'Asked to show pre-processing steps on an example',
  mnemonic: 'Stop, Fold, Strip punctuation, Stem, Count',
  steps: [
    '1. Tokenise into words; remove punctuation.',
    '2. Case-fold to lower case.',
    '3. Remove stop words (the, is, of, for, in, and ...).',
    '4. Stem each word (Porter): plural -s, -ing, -ed, -ation, -ive ...',
    '5. Group identical stems and count frequency; sort alphabetically.',
    '6. Report total tokens and distinct terms; comment on impact (size, recall).'
  ],
  example: {
    problem: '"Information retrieval is the science of searching for information in documents. Modern search engines use sophisticated ranking algorithms."',
    solution: [
      'Stop words removed: is, the, of, for, in. After case-folding and punctuation removal: information retrieval science searching information documents modern search engines use sophisticated ranking algorithms.',
      'Stemmed: inform retriev scienc search inform document modern search engin use sophist rank algorithm.',
      'Frequencies: algorithm 1, document 1, engin 1, inform 2, modern 1, rank 1, retriev 1, scienc 1, search 2, sophist 1, use 1: 13 tokens, 11 terms (the slide total of 14 is a slip).',
      'Impact: 18 words reduced to 13 tokens; "information/informative" and "search/searching" merge, which helps recall.'
    ]
  }
},
{
  id: 'm-cf-user', topicId: 'collaborative-filtering', title: 'Predict a rating with user-user CF (Pearson, mean-centred)',
  when: 'Given a small user-item rating table and asked to predict an unseen rating',
  mnemonic: 'Co-rated Pearson, pick raters, mean-centred average',
  steps: [
    '1. For the active user a and each other user u: list co-rated items I(a,u) and the mean ratings over them.',
    '2. Pearson w(a,u) = Σ dev_a dev_u / sqrt(Σ dev_a^2 Σ dev_u^2).',
    '3. Keep neighbours who rated the target item (and meet threshold / best-n).',
    '4. Compute each neighbour\'s own mean over ALL their ratings.',
    '5. P = mean_a + Σ (r(u,i) - mean_u) w / Σ |w|.',
    '6. Comment: neighbours with few co-rated items are unreliable; consider significance weighting.'
  ],
  example: {
    problem: 'Messages 1-5 and 6 (target for Ken). Ken 1,5,-,2,4,?; Lee 4,2,-,5,1,2; Meg 2,4,3,-,-,5; Nan 2,4,-,5,1,-. Predict Ken on message 6.',
    solution: [
      'Ken-Lee co-rated 1,2,4,5: Ken (1,5,2,4) mean 3, Lee (4,2,5,1) mean 3; products -2, -2, -2, -2 = -8; squares 10 and 10; w = -0.8.',
      'Ken-Meg co-rated 1,2: Ken (1,5), Meg (2,4): w = +1.0. Ken-Nan: products sum 0 so w = 0 (Nan has not rated 6 anyway).',
      'Means over all ratings: Ken 3, Lee 2.8, Meg 3.5.',
      'P = 3 + [(2 - 2.8)(-0.8) + (5 - 3.5)(1.0)]/(0.8 + 1.0) = 3 + (0.64 + 1.5)/1.8 = 4.19.',
      'With significance weighting (Lee 4 items, Meg 2 items): w = -0.064 and 0.04 giving 4.07; requiring at least 3 co-rated items (Meg dropped): P = 3 + (-0.8)(-0.8)/0.8 = 3.80. Conclusion robust: Ken probably likes message 6.'
    ]
  }
},
{
  id: 'm-cf-item', topicId: 'collaborative-filtering', title: 'Predict a rating with item-item CF (adjusted cosine)',
  when: 'Asked for item-based prediction or to compare with user-user',
  mnemonic: 'Mean-centre by USER, compare item columns, weight the user\'s own ratings',
  steps: [
    '1. Compute each user\'s mean rating.',
    '2. For the target item i and each item j the active user rated: take users who rated both.',
    '3. s(i,j) = Σ_u (r_ui - mean_u)(r_uj - mean_u) / sqrt(Σ (r_ui - mean_u)^2 Σ (r_uj - mean_u)^2).',
    '4. Keep positive similarities (raw ratings) and the top-k items.',
    '5. P = Σ s(i,j) r(a,j) / Σ |s(i,j)|.',
    '6. Check how many users each similarity rests on; flag weak evidence.'
  ],
  example: {
    problem: 'Same table. Predict Ken on message 6 with item-item CF.',
    solution: [
      'User means: Lee 2.8, Meg 3.5 (Ken 3, Nan 3).',
      's(2,6): users Lee and Meg: Lee devs -0.8, -0.8; Meg 0.5, 1.5; numerator 0.64 + 0.75 = 1.39; denominator sqrt(0.89 × 2.89) = 1.604; s = 0.867. s(1,6): Lee 1.2 and -0.8, Meg -1.5 and 1.5: numerator -3.21, s = -0.983.',
      's(5,6) rests on Lee only (+1.0) and s(4,6) on Lee only (-1.0): single-user similarities are ±1 and unreliable.',
      'Positive neighbours that Ken rated: message 2 (Ken 5, s = 0.867) and message 5 (Ken 4, s = 1.0). P = (0.867 × 5 + 1.0 × 4)/(0.867 + 1.0) = 4.46.',
      'User-user gave 4.19: both predict Ken likes message 6; item-item rests on very few users here.'
    ]
  }
},
{
  id: 'm-pagerank', topicId: 'pagerank', title: 'Run PageRank power iterations',
  when: 'Given a small link graph, T (or damping) and asked for iterations',
  mnemonic: 'Teleport share + damped sum of rank/out-degree',
  steps: [
    '1. List each page\'s outlinks and in-links; N = number of pages.',
    '2. Initialise PR = 1/N for all pages.',
    '3. For each page W: PR_new(W) = T/N + (1 - T) Σ_{W_i → W} PR(W_i)/O(W_i).',
    '4. Compute all new values from the OLD values, then replace (synchronous update).',
    '5. Check values sum to 1; repeat until the change is below ε.',
    '6. Comment: pages with no in-links get only T/N; pages receiving from important pages rank higher.'
  ],
  example: {
    problem: 'Links: A to B, A to C, B to C, C to A, D to C. T = 0.15, N = 4. Iterate.',
    solution: [
      'T/N = 0.0375; damping 0.85. Start (0.25, 0.25, 0.25, 0.25).',
      'Iteration 1: A = 0.0375 + 0.85(PR(C)) = 0.25; B = 0.0375 + 0.85(PR(A)/2) = 0.144; C = 0.0375 + 0.85(PR(A)/2 + PR(B) + PR(D)) = 0.0375 + 0.85(0.125 + 0.25 + 0.25) = 0.569; D = 0.0375.',
      'Iteration 2: A = 0.0375 + 0.85(0.569) = 0.521; B = 0.0375 + 0.85(0.125) = 0.144; C = 0.0375 + 0.85(0.125 + 0.144 + 0.0375) = 0.298; D = 0.0375.',
      'Iteration 3: A 0.291, B 0.259, C 0.413, D 0.038. Converged: A 0.373, B 0.196, C 0.394, D 0.038 (sum 1).'
    ]
  }
},
{
  id: 'm-hits', topicId: 'hits', title: 'Run HITS hub/authority iterations',
  when: 'Given a link graph (base set) and asked for hub and authority scores',
  mnemonic: 'a from in-links of hubs; h from out-links to authorities; normalise',
  steps: [
    '1. Write the adjacency matrix M (M_ij = 1 if i links to j) or list links.',
    '2. Initialise all a = h = 1.',
    '3. a_p = sum of h_q over pages q that link to p.',
    '4. h_p = sum of a_q over pages q that p links to (use the new a).',
    '5. Normalise each vector (e.g. divide by its sum).',
    '6. Repeat until stable; report top authorities and hubs.'
  ],
  example: {
    problem: 'Links: A to C, A to D, B to C, B to D, D to C. Run two iterations and give the converged scores.',
    solution: [
      'Iteration 1: a = (A 0, B 0, C 3, D 2); h = (A a_C + a_D = 5, B 5, C 0, D a_C = 3). Normalised: a = (0, 0, 0.60, 0.40); h = (0.385, 0.385, 0, 0.231).',
      'Iteration 2: a_C = h_A + h_B + h_D = 1.0, a_D = h_A + h_B = 0.77, normalised (0, 0, 0.565, 0.435); h_A = a_C + a_D = 1.0 (before normalising) giving h = (0.39, 0.39, 0, 0.22).',
      'Converged: a = (0, 0, 0.56, 0.44); h = (0.39, 0.39, 0, 0.22): C best authority, A and B best hubs, D both.'
    ]
  }
}
];
