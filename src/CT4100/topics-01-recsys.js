module.exports = [
{
  id: 'collaborative-filtering',
  title: 'Collaborative filtering (user-user and item-item)',
  priority: 1,
  tier: 'core',
  freq: '9/9 papers',
  marks: '8-10 marks (every paper, often 2 parts)',
  summary: '**CF recommends items using other people\'s ratings: (1) compute user-user similarity, (2) choose a neighbourhood, (3) predict the rating as the (mean-centred) similarity-weighted average of neighbours\' ratings.**',
  mnemonic: 'SNP: Similarity, Neighbourhood, Prediction',
  source: ['CT4100_Notes_07_Collaborative_Filtering'],
  sections: [
    { heading: 'What it is', items: [
      '**Content filtering** matches item content to a user\'s need. **Collaborative filtering (CF)** collects human judgements and matches people with the same tastes: the "word of mouth" principle (term coined for Tapestry, Xerox PARC 1992; also GroupLens 1994, Ringo 1995).',
      'Data: a set of **users**, a set of **items**, and **ratings** (numeric, e.g. 1-5) giving a sparse user-by-item matrix.',
      '**Explicit ratings**: user gives a number (may be unwilling; universal queries use a gauge set, user-selected queries leave a sparse matrix). **Implicit ratings**: purchases, clicks, plays, reading time, mapped to a numeric scale; usually positive-only (a missing entry may mean "not interested" or "never saw it"); most deployed systems rely mainly on implicit feedback.',
      'Advantages over content filtering: works where content cannot be analysed automatically (music, film), filters on **quality/taste**, can recommend items that do not contain the content the user expected (serendipity).',
      'Applications: Amazon ("customers who bought this also bought"), Netflix, YouTube, Spotify, news feeds, jobs; any setting with ratings/likes/relevance for a set of users.'
    ] },
    { heading: 'The three stages of user-user CF', items: [
      { type: 'diagram', kind: 'flow', data: { steps: [ { label: '1. Similarity', sub: 'user-user correlation w(a,u)' }, { label: '2. Neighbourhood', sub: 'threshold or best-n users' }, { label: '3. Prediction', sub: 'weighted average of neighbours' }, { label: 'Recommend', sub: 'top-N items by predicted rating' } ] }, caption: 'User-user collaborative filtering pipeline.' },
      '**Step 1: similarity.** Compare the active user a with every other user u using ratings on co-rated items. Options: Pearson correlation, constrained Pearson, Spearman rank correlation, vector (cosine) similarity.',
      '**Step 2: neighbourhood.** Correlation thresholding (keep |w| > e.g. 0.7) or best-n (n tuned, 20-50 common). Large neighbourhood: low-precision predictions (noise). Small: few or no predictions (poor coverage).',
      '**Step 3: prediction** for an item i the active user has not rated, using only neighbours who rated i.'
    ] },
    { heading: 'Formulas', items: [
      { type: 'formula', label: 'Pearson correlation between active user a and user u', text: 'w(a,u) = Σ_i (r(a,i) - mean_a)(r(u,i) - mean_u)  /  sqrt( Σ_i (r(a,i) - mean_a)^2 × Σ_i (r(u,i) - mean_u)^2 ), sums over i in I(a,u) = items rated by both. w is in [-1, 1].' },
      'r(a,i) = rating of user a for item i; mean_a = average rating of a (usually over the co-rated items). +1 = same taste, -1 = opposite taste, 0 = unrelated.',
      { type: 'formula', label: 'Cosine (vector) similarity', text: 'cos(a,u) = (a · u) / (|a| |u|), users as rating vectors with 0 for "not rated".' },
      { type: 'warn', text: 'Cosine treats a missing rating as a rating of 0 (strong dislike) and, with all ratings positive, every pair of users looks similar. Fix: subtract each user\'s mean and use only co-rated items (adjusted cosine) which is exactly Pearson.' },
      { type: 'formula', label: 'Prediction 1: weighted average of ratings', text: 'P(a,i) = Σ_u r(u,i) w(a,u) / Σ_u |w(a,u)|  (assumes everyone uses the rating scale in the same way)' },
      { type: 'formula', label: 'Prediction 2: mean-centred weighted average (preferred)', text: 'P(a,i) = mean_a + Σ_u (r(u,i) - mean_u) w(a,u) / Σ_u |w(a,u)|, sums over the n neighbours who rated i.' },
      'Mean-centring interprets a rating as its **distance from that neighbour\'s own mean**, so generous and harsh raters are comparable. |w| in the denominator keeps the prediction on the rating scale when some correlations are negative (a negative neighbour\'s below-average rating becomes evidence FOR the item).',
      { type: 'formula', label: 'Significance weighting (Herlocker 1999)', text: "w'(a,u) = min(|I(a,u)|, 50) / 50 × w(a,u)" },
      'Pearson ignores how many items were co-rated: with only 2 co-rated items w is always +1 or -1. Significance weighting discounts strong agreement based on little evidence.'
    ] },
    { heading: 'Worked example (Resnick et al.): does Ken like message 6?', items: [
      { type: 'table', head: ['Msg', 'Ken', 'Lee', 'Meg', 'Nan'], rows: [['1', '1', '4', '2', '2'], ['2', '5', '2', '4', '4'], ['3', '-', '-', '3', '-'], ['4', '2', '5', '-', '5'], ['5', '4', '1', '-', '1'], ['6', '?', '2', '5', '-']] },
      '**Step 1.** Ken vs Lee: co-rated 1,2,4,5; Ken ratings 1,5,2,4 (mean 3); Lee 4,2,5,1 (mean 3). Deviations Ken (-2,2,-1,1), Lee (1,-1,2,-2). Products -2,-2,-2,-2 = -8; sum of squares 10 and 10. w = -8/√(10×10) = **-0.8** (opposite tastes).',
      'Ken vs Meg: co-rated only 1,2: Ken (1,5), Meg (2,4) so w = **+1.0** (but based on only 2 items!). Ken vs Nan: co-rated 1,2,4,5: deviations Ken (-2,2,-1,1), Nan (-1,1,2,-2); products 2+2-2-2 = 0 so w = **0**.',
      '**Step 2.** Neighbours who rated message 6: Lee and Meg (Nan has not rated it, and w = 0 anyway).',
      '**Step 3.** Means over each user\'s own ratings: Ken 3, Lee 2.8, Meg 3.5. P = 3 + [(2 - 2.8)(-0.8) + (5 - 3.5)(1.0)] / (|-0.8| + |1.0|) = 3 + (0.64 + 1.5)/1.8 = **4.19**. Recommend message 6 to Ken.',
      'Sanity check (cosine, 0 = missing): Ken-Lee 0.58, Ken-Meg 0.44, Ken-Nan 0.78. Cosine says Lee is fairly similar to Ken although he has opposite tastes: the zero-as-dislike problem.',
      'Variants: significance weighting (Meg 2 items -> 0.04) gives about 4.07; requiring 3 co-rated items drops Meg and gives about 3.80. All point the same way here.'
    ] },
    { heading: 'Item-item CF', items: [
      'Turn the problem round: find items similar to the target item (columns of the matrix), then predict from the active user\'s OWN ratings of similar items. "Because you liked X".',
      { type: 'formula', label: 'Adjusted cosine item similarity', text: 's(i,j) = Σ_u (r(u,i) - mean_u)(r(u,j) - mean_u) / sqrt( Σ_u (r(u,i) - mean_u)^2 × Σ_u (r(u,j) - mean_u)^2 ), sums over users who rated both i and j.' },
      { type: 'formula', label: 'Item-item prediction', text: 'P(a,i) = Σ_j s(i,j) r(a,j) / Σ_j |s(i,j)|, j over the k items most similar to i that a has rated (use only positive similarities with raw ratings).' },
      { type: 'table', head: ['', 'User-user', 'Item-item'], rows: [['Similarity between', 'rows (users)', 'columns (items)'], ['Prediction from', 'neighbours\' ratings of i', 'active user\'s ratings of similar items'], ['Precompute offline?', 'hard: profiles change quickly', 'yes: item similarities are stable'], ['Explanation', '"people like you liked it"', '"because you liked X"'], ['Serendipity', 'higher', 'lower (more of the same)'], ['Scale', 'many users: expensive', 'usually fewer items than users: cheaper']] }
    ] },
    { heading: 'Answer template: "Describe the main steps of CF with an example"', items: [
      '1. Define: users x items ratings matrix, explicit/implicit ratings, active user.',
      '2. Stage 1 similarity: give Pearson formula, explain co-rated items and mean.',
      '3. Stage 2 neighbourhood: threshold or best-n, trade-off in size.',
      '4. Stage 3 prediction: mean-centred weighted average formula; recommend top-N items.',
      '5. Example: a 4-user table (like Ken, Lee, Meg, Nan) with one number worked through.',
      '6. Close with advantages (no content analysis, serendipity, taste) and limitations (sparsity, cold start, scalability, shilling attacks, grey sheep).'
    ] },
    { heading: 'Advantages and limitations (asked directly in 2024-25)', items: [
      '**Advantages:** domain independent (no content analysis, works for music, film, jokes); captures subjective quality and taste; can recommend serendipitous items; improves as ratings accumulate; item-item can be precomputed for scale.',
      '**Limitations:** sparsity; cold start (new user/new item); scalability of neighbour search; grey sheep (users with unusual taste); shilling/manipulation attacks; popularity bias and filter bubbles; ratings are noisy and drift over time; implicit data is positive-only; privacy (profiles of many users).'
    ] }
  ],
  pitfalls: [
    'Forgetting to use only CO-RATED items for Pearson, or to mean-centre in the prediction formula (the plain weighted average ignores that users rate on different scales).',
    'Using cosine with zeros for missing ratings without commenting on the problem.',
    'Dividing by the sum of w instead of the sum of |w| (breaks when some correlations are negative).',
    'Listing the stages without an example; the exam often says "illustrate" or "with a suitable example".'
  ]
},
{
  id: 'cf-issues-evaluation',
  title: 'CF issues: cold start, sparsity, evaluation, hybrids and content information',
  priority: 3,
  tier: 'core',
  freq: '7/9 papers (cold start is a full 10 marks in 2025-26)',
  marks: '7-10 marks',
  summary: '**Know the problems (sparsity, cold start, scale, grey sheep, shilling, noise) with a fix for each, the evaluation measures (MAE/RMSE, precision/recall at k, coverage, diversity, novelty, A/B tests) and how content information/hybrids cure cold start.**',
  mnemonic: 'Problems: S-C-S-G-S-N (Sparse, Cold, Size, Grey sheep, Shilling, Noise)',
  source: ['CT4100_Notes_07_Collaborative_Filtering'],
  sections: [
    { heading: 'Cold start (describe in detail, 10 marks in 2025-26)', items: [
      '**New user:** no ratings, so no basis for finding similar users. **New item:** no ratings, so pure CF never recommends it (and it can never get ratings: a vicious circle). Also **new system** (no data at all).',
      'Related: **sparsity** (Netflix prize: about 1% of the matrix filled; two users may have no items in common), and **grey sheep** (users whose tastes match no group).',
      { type: 'table', head: ['Strategy', 'How it helps', 'Trade-off (quality vs data needed)'], rows: [
        ['Ask for ratings of a gauge set (Ringo-style onboarding)', 'Gets a quick profile from a few well-chosen items', 'Good quality for little data but burdens the user, who may abandon; gauge set may be unrepresentative'],
        ['Recommend popular / trending items', 'Needs no user data at all', 'Low personalisation; reinforces popularity bias'],
        ['Demographics / context (location, device, time)', 'Cluster new user with similar demographic groups', 'Coarse; stereotyping; privacy concerns'],
        ['Content-based or hybrid recommenders', 'Use item features (genre, director, artist) so new items can be recommended and new users get matched on a few liked items', 'Needs good metadata; tends to over-specialise (more of the same)'],
        ['Blend global mean with user mean, shifting weight as ratings arrive', 'Smooth transition from non-personalised to personalised', 'Early predictions are weak'],
        ['Exploration (bandits): show new items to a few users to collect ratings', 'Solves new-item cold start', 'Costs short-term quality; needs traffic'],
        ['Implicit signals (clicks, dwell time) from the first session', 'Plentiful, no effort for user', 'Noisy; positive-only']
      ] },
      '**Identifying users for whom recommendation is hard** (2025-26 Q2b): users with very few ratings (low profile size); users with low similarity to everyone (grey sheep: all neighbour correlations small or neighbourhood tiny); high variance in the predictions of neighbours (neighbours disagree); low confidence/overlap (few co-rated items with neighbours); users with high rating entropy/inconsistency. This is query difficulty prediction transferred to users: pre-recommendation predictors (profile size, number of neighbours above a threshold) and post-recommendation predictors (spread of predicted scores of the top-k list).'
    ] },
    { heading: 'Other issues and mitigations (2023-24: "difficulties and how to tackle them")', items: [
      { type: 'table', head: ['Issue', 'Why', 'Mitigation'], rows: [
        ['Sparsity', 'Each user rates a tiny fraction; overlaps small or empty', 'Latent-factor / dimensionality reduction (SVD, matrix factorisation); item-item; significance weighting; use implicit data; hybrids'],
        ['Scalability (size of matrix)', 'Millions of users x items; neighbour search is costly', 'Item-item with offline similarities; clustering users; sampling; approximate nearest neighbours'],
        ['Cold start', 'No ratings for new users/items', 'See table above'],
        ['Neighbourhood size', 'No "right" size; large = noisy, small = few predictions', 'Tune n experimentally (20-50); thresholds; significance weighting'],
        ['Grey sheep', 'Tastes not shared by any group', 'Content-based fallback; hybrid'],
        ['Shilling attacks', 'Fake profiles built to look like many real users enter neighbourhoods and push/nuke items', 'Detect suspicious profiles; robust algorithms; limit influence of any single user'],
        ['Noise and time', 'Users are inconsistent; tastes drift; items age', 'Time-aware models; weight recent ratings; mean-centring'],
        ['Feedback loops / filter bubbles', 'Recommendations shape what is consumed, which becomes training data', 'Diversity, novelty and exploration; online testing']
      ] }
    ] },
    { heading: 'Evaluating a recommender', items: [
      '**Offline:** split known ratings into disjoint train and test sets (random, temporal split or leave-one-out); predict test ratings and compare. Temporal splits are closer to deployment; random splits let the model "see the future".',
      { type: 'formula', label: 'Statistical accuracy', text: 'MAE = (1/|T|) Σ |p(u,i) - r(u,i)|   RMSE = sqrt( (1/|T|) Σ (p(u,i) - r(u,i))^2 ), over test set T. RMSE punishes large errors more (Netflix prize metric).' },
      '**Coverage:** fraction of items (or user-item pairs) for which the system can produce a prediction. Trade-off: small neighbourhoods give high accuracy but low coverage.',
      '**Decision-support accuracy:** is the item good or bad (rating above a threshold)? Use precision, recall, F1, ROC. Real users see a short top-k list, so treat it as ranking: precision@k, recall@k, MAP, nDCG, MRR (same as IR metrics).',
      '**Beyond accuracy:** catalogue coverage (fraction of items ever recommended), diversity (items in a list are different), novelty (not already known), serendipity (surprising and relevant), popularity bias and fairness.',
      '**Online:** A/B tests (random groups, compare click-through, engagement, retention, sales) and user studies (trust, satisfaction).',
      '**Limitations of offline evaluation:** only known ratings can be scored (missing != dislike); data collected under the old recommender is biased; popularity baselines look strong; accuracy does not equal usefulness; rating-prediction error on items nobody will see does not matter; need statistical significance over users.'
    ] },
    { heading: 'Content information and hybrids (2021-22 P2, 2022-23)', items: [
      'Content is usually available: music (artist, album, year, genre, audio), films (director, genre, actors), books (author, genre, summary).',
      '**Content-based approach:** represent each item by a feature vector (tf-idf of text, one-hot genre/artist/year); build a user profile as the (rating-weighted) centroid of items they liked; recommend items with highest cosine similarity to the profile. Works for new items (no ratings needed) so **improves coverage** and handles item cold start.',
      '**Hybrid strategies:** *weighted* (combine scores of CF and content), *switching* (content-based for new items, CF otherwise), *feature augmentation* (one method\'s output is input to another), also *item-item similarity from content* to fill sparsity.',
      '**Music example (2022-23):** build track vectors from artist, album, year, genre; compute content similarity between tracks; for a user, score unrated tracks by similarity to tracks they played often; blend with CF score using a weight that favours content when a track has few plays. Coverage rises because tracks with no listening history still get scores.',
      'Limitations of content-based: over-specialisation (no serendipity), needs good metadata, cannot capture quality/taste.'
    ] },
    { heading: 'Recasting CF and current directions (lecture)', items: [
      '**Recasting as machine learning:** CF as classification (is the item relevant to the user or not), regression (predict the rating) or ranking. **Netflix Prize:** blending many models gave the winning margin but at a large engineering cost; several published neural recommenders were later outperformed by well-tuned simple baselines.',
      '**Sequential and session-based recommendation:** a history is a sequence, not a set; session-based systems often have no long-term profile; models borrowed from language modelling (recurrent networks); task = predict the next item, evaluated with ranking metrics.',
      '**LLMs:** conversational recommendation (needs stated in natural language and refined by dialogue), LLMs as recommenders, as generators of item/user descriptions, and as explainers; open questions: hallucinated items, bias, cost, evaluation.',
      '**Recent trends:** explaining recommendations (and how to visualise explanations), group recommendation, sequences of recommendations, fairness and multi-stakeholder recommendation (users, producers, platform), context-aware recommendation (time, location, device). **Neighbourhood-size note:** visualising or summarising the neighbourhood is an open question.'
    ] },
    { heading: 'Diverse recommendations (2021-22: 7 marks)', items: [
      'Re-rank a candidate list (e.g. top-50 by predicted rating) with **MMR**-style greedy selection: pick next item maximising λ × predicted relevance - (1-λ) × max similarity (content features) to items already selected. See the Diversity topic.',
      'Other options: cluster items and take the best from each cluster; penalise genre/artist repeats; add exploration; measure with intra-list diversity and catalogue coverage.'
    ] }
  ],
  pitfalls: [
    'Treating cold start as one problem: split new user / new item / new system and give a different fix for each.',
    'Evaluating only accuracy (MAE); the notes stress coverage, diversity, novelty and online A/B tests.',
    'Not discussing the trade-off requested in the question (quality vs data requirement) when asked to evaluate strategies.',
    'Saying content-based removes all problems: it over-specialises and needs metadata.'
  ]
},
{
  id: 'query-performance-prediction',
  title: 'Query performance / difficulty prediction (QPP)',
  priority: 2,
  tier: 'core',
  freq: '9/9 papers',
  marks: '8-10 marks (often 3 sub-sources)',
  summary: '**QPP estimates retrieval effectiveness without relevance judgements: pre-retrieval predictors use the query and collection statistics (AvgIDF, scope, SCQ, PMI, length, ambiguity); post-retrieval predictors analyse the ranked list (clarity, stability/robustness, score analysis such as NQC).**',
  mnemonic: 'Pre = Query + Collection; Post = Clarity, Stability, Score (C-S-S)',
  source: ['CT4100_Notes_10_Query_Difficulty_Prediction'],
  sections: [
    { heading: 'Why predict difficulty', items: [
      'Even strong systems fail badly on some queries; the average hides failures. Robustness problem: large variance across queries.',
      'Causes: ambiguous terms (mercury), vocabulary mismatch (car hire vs vehicle rental), missing content, a missing aspect of the query, over-emphasis of one term, preprocessing errors, ignoring proximity (New York).',
      '**Who benefits:** user (reformulate or go elsewhere); system (apply query expansion only to difficult queries, switch ranking model, ask a clarification); administrator (find gaps in the collection); distributed IR (weight sources by predicted quality); RAG (decide whether to retrieve or flag a low-confidence answer).',
      'Difficulty is not intrinsic: a query may be hard for one collection or system and easy for another (embeddings can bridge car hire/vehicle rental).',
      'TREC Robust Track (2003-05): human assessors judged difficulty poorly (r = 0.26 with system performance); predicting difficulty was hard and some predictors correlated negatively.'
    ] },
    { heading: 'Lecture details: robust track, evaluation example, linguistic predictors', items: [
      '**Definition (lecture):** predict how well a retrieval system will perform for a query on a given collection WITHOUT relevance judgements (query performance prediction, QPP). Predicted scores are not on the AP scale, so judge a predictor by correlation, not by value.',
      '**Example:** actual AP q1 0.62, q2 0.15, q3 0.40 vs predicted 0.81, 0.34, 0.52: the ordering is identical so Spearman ρ = Kendall τ = 1.0, Pearson r about 0.99. A predictor may rank queries correctly without estimating absolute AP.',
      '**TREC Robust Track (2003-2005, Carmel and Yom-Tov 2010):** focused on difficult topics; emphasised robustness across queries (GMAP, the geometric mean of AP, as well as AP); human experts assessed difficulty: correlation with system performance only r = 0.26, agreement between humans only r = 0.39. Participants ranked topics by predicted difficulty before seeing judgements; it proved challenging and some methods had **negative correlation** with actual performance (the predictor is inverted or misleading). This prompted the pre-/post-retrieval predictors.',
      '**Collection and system dependence:** relative difficulty is reasonably consistent across collections in some studies, but a query can be hard for one system and easy for another (car hire vs vehicle rental defeats exact matching, an embedding system may bridge it).',
      '**Linguistic (pre-retrieval) predictors:** analyse ambiguity, word senses (e.g. number of WordNet senses), entities, syntactic structure; most correlate weakly (polysemy and syntactic complexity are exceptions); LLMs make this analysis easier and revived interest. "jaguar speed" is ambiguous but may still work (documents about the animal speed are plentiful).',
      '**Scope examples (lecture):** "computer science" 8,000/10,000 = 0.80; "graph embedding" 2,000/10,000 = 0.20; "algorthim recusion" 30/10,000 = 0.003 (large scope = broad query; tiny scope = missing coverage or misspelling). Scope counts documents with ANY query term, so adding terms can only increase it.',
      '**Stability example:** original ranking [A, B, C, D, E]; small change 1 [A, C, B, D, E] gives Overlap@5 = 1.0, Overlap@3 = 1.0 (stable); small change 2 [X, Y, Z, A, B] gives Overlap@5 = 0.4, Overlap@3 = 0.0 (unstable). Perturb the query (drop a term), the documents (noise) or the system (several systems).',
      '**Lecture exercises (answers):** (1) combine pre- and post-retrieval predictors in a regression/learned estimator. (2) Transfer to a music recommender (predict a difficult item/user from profile size or neighbour similarity and score spread) and to predicting whether query expansion helped (compare score spread or overlap before and after). (3) High AvgIDF + low scope + flat score distribution: indicators disagree (specific rare terms but little coverage or a misspelling, and no clear top documents): likely difficult. (4) Measure a new predictor by correlating (Pearson, Spearman, Kendall τ) its scores with actual AP over many queries. (5) RAG deciding whether to retrieve can use only pre-retrieval predictors (post-retrieval need a retrieval run); it can use post-retrieval ones to flag low confidence after retrieval.'
    ] },
    { heading: 'Evaluating a predictor', items: [
      'Run on many queries: compare predicted scores with actual AP (or P@k) via **Pearson r** (linear), **Spearman ρ** (rank) or **Kendall τ** = (concordant - discordant pairs) / total pairs (most reported). A predictor should rank queries by difficulty, not estimate AP in absolute terms. A negative correlation means the predictor is harmful or inverted.'
    ] },
    { heading: 'Pre-retrieval predictors (no retrieval run: cheap)', items: [
      '**(i) Query-specific / linguistic:** query length; ambiguity (number of WordNet senses, polysemy, named entities); syntactic complexity. Most correlate weakly; polysemy is one exception. Example: "jaguar speed" is ambiguous but may still work.',
      '**(ii) Collection statistics (term specificity):**',
      { type: 'formula', label: 'AvgIDF / MaxIDF', text: 'AvgIDF(q) = (1/|q|) Σ_{t in q} log(N / df(t));  MaxIDF(q) = max_t log(N / df(t)). N = documents in collection, df(t) = documents containing t. High = specific = easier.' },
      { type: 'formula', label: 'Query scope', text: 'Scope(q) = |{d in C : d contains at least one query term}| / |C|.  Example: "computer science" 8000/10000 = 0.80 (broad); "algorthim recusion" 30/10000 = 0.003 (misspelling or missing coverage).' },
      { type: 'formula', label: 'Term relatedness: average pointwise mutual information', text: 'PMI(t1,t2) = log [ P(t1,t2) / (P(t1) P(t2)) ], P(t) = df(t)/N, P(t1,t2) = df(t1,t2)/N. Predictor = average PMI over all pairs of query terms. "neural network training" (terms co-occur) beats "neural banana training". Undefined for single-term queries.' },
      { type: 'formula', label: 'Collection-query similarity (SCQ, Zhao et al.; extra, not on the slides)', text: 'SCQ(t) = (1 + ln cf(t)) × ln(1 + N/df(t)); SCQ(q) = sum or max over query terms. cf = collection frequency. Higher = collection similarity of the query is higher = easier.' },
      'Other pre-retrieval ideas: variance of tf-idf weights of query terms (high variance = discriminating terms), collection query similarity, query-term co-occurrence coherence.',
      'Caveats: rare terms can be misspellings; scope grows with query length so a long query is not necessarily broad; co-occurrence does not establish relevance.'
    ] },
    { heading: 'Post-retrieval predictors (run the query, inspect the result list: more accurate, costs a retrieval)', items: [
      '**(iii-a) Clarity:** compare the language model of the top-ranked documents with the collection language model. High KL divergence = results use distinctive vocabulary = clear query. Low = results look like random collection text = ambiguous/poor.',
      { type: 'formula', label: 'Clarity score', text: 'Clarity(q) = Σ_w P(w|Q) log2( P(w|Q) / P(w|C) ), where P(w|Q) is the word distribution of the top-k retrieved documents (weighted by retrieval score) and P(w|C) the collection distribution.' },
      'Example (lecture): "jaguar": results mix cars and cats, so **low clarity**; "jaguar xk engine": results all about engines, so **high clarity**. Caveat: a coherent result set can still be consistently wrong. (The slides give the idea only; the KL formula above is the standard definition from Cronen-Townsend et al.)',
      '**(iii-b) Stability / robustness:** small perturbations should not change a reliable ranking. Perturb the query (drop one term, compare sub-query and full-query results), the documents (add noise and re-rank) or the system (several systems/settings) and measure overlap@k or Kendall τ between rankings. Caveat: a good reformulation can legitimately change the ranking.',
      '**(iii-c) Score analysis:** a sharp drop in scores (few clearly top documents) suggests an easy query; flat scores suggest difficulty. Raw scores are not comparable across queries, so normalise.',
      { type: 'formula', label: 'Normalised Query Commitment (NQC)', text: 'NQC(q) = sqrt( (1/k) Σ_{d in top-k} (s(d) - μ)^2 ) / |s(C)|, s(d) = retrieval score of d, μ = mean of the top-k scores, s(C) = score of the collection treated as one document (normaliser).' },
      'Worked: scores A = 9.5, 8.7, 7.9, 3.2, 2.8, 2.5, 2.2, 2.0 (mean 4.85, std 3.03) and B = 6.1, 5.9, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3 (mean 5.66, std 0.25). Large spread for A means the system is "committed" to its top documents: A is predicted easier. Caveat: top documents could still all be wrong.',
      'Also (extra, not on the slides): Weighted Information Gain (WIG), and neural QPP (BERT-based predictors).'
    ] },
    { heading: 'Pre vs post summary and uses', items: [
      { type: 'table', head: ['', 'Pre-retrieval', 'Post-retrieval'], rows: [['Evidence', 'Query text, collection statistics', 'Ranked list, scores, retrieved text'], ['Cost', 'Very cheap, before searching', 'Needs a retrieval run (some need extra runs)'], ['Accuracy', 'Usually lower', 'Usually higher'], ['Examples', 'AvgIDF, MaxIDF, scope, SCQ, PMI, length, ambiguity', 'Clarity, NQC, WIG, overlap/stability, score variance'], ['Use', 'Decide whether to expand, route queries, warn the user', 'Select between result lists, trigger feedback or expansion, merge sources']] },
      '**Practical uses of QPP:** selective query expansion (only expand predicted-difficult queries); choose the best ranker or retrieval strategy per query; ask the user to reformulate/clarify or suggest queries; distributed IR (rank/merge collections); decide whether a RAG system should retrieve; flag low-confidence results; collection management (find topics with poor coverage).',
      '**Combine** pre- and post-retrieval predictors (e.g. a learned regression over several predictors), or transfer to recommenders: predict a difficult user/item.'
    ] },
    { heading: 'Exam answer templates', items: [
      '"Methods for predicting difficulty based on (i) the query, (ii) collection-wide evidence, (iii) the returned list": (i) length, ambiguity, WordNet senses; (ii) AvgIDF, scope, SCQ, PMI with a worked mini-example; (iii) clarity, NQC/score spread, stability. Give one example each.',
      '"Explain three pre-retrieval measures with examples": AvgIDF (compute with N=10000, df=50 gives 2.3 for "apple" vs 0.05 for "the"), scope, PMI or query length/ambiguity.'
    ] }
  ],
  pitfalls: [
    'Listing predictors without saying whether high or low values mean easy.',
    'Calling clarity or NQC pre-retrieval (they need the retrieved list).',
    'Forgetting how a predictor is evaluated (correlation with actual AP) or what it is used for.',
    'Writing NQC without the square root/normaliser, or confusing the score of a document with a relevance probability.'
  ]
}
];
