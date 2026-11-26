module.exports = [
{
  id: 'rocchio-relevance-feedback',
  title: 'Relevance feedback and the Rocchio algorithm',
  priority: 4,
  tier: 'core',
  freq: '8/9 papers',
  marks: '5-10 marks',
  summary: '**Rocchio moves the query vector towards the centroid of relevant documents and away from the centroid of non-relevant ones: q_new = α q_orig + β mean(D_R) - γ mean(D_N).**',
  mnemonic: 'Rocchio: Keep, Pull, Push (α keep original, β pull to relevant, γ push from non-relevant)',
  source: ['CT4100_Notes_06_Relevance_Feedback'],
  sections: [
    { heading: 'Why relevance feedback', items: [
      'The initial query may not represent the information need; it is easier for users to **recognise** a relevant document than to write a better query.',
      'Cycle: user queries, system retrieves, user judges some documents (explicit feedback), system modifies the query by **re-weighting existing terms** and **adding new terms**, re-runs. May iterate.',
      'Example: "jaguar speed" returns cars and animals; user marks animal documents relevant, so terms running, predator, wildlife get weight and car terms lose weight.',
      '**Explicit feedback:** binary or graded judgements (users may be unwilling, inconsistent). **Implicit feedback:** clicks, dwell time, save/print: plentiful but indirect and noisy. **Pseudo (blind) feedback:** assume top-k relevant (separate topic).',
      '**Underlying assumption (cluster hypothesis):** relevant documents have similar term vectors and occupy a similar region of the vector space.'
    ] },
    { heading: 'Notation and the ideal query', items: [
      'C_R = all relevant documents (unknown); D_R = retrieved documents the user judged relevant (D_R ⊆ C_R); D_N = retrieved documents judged non-relevant; N = collection size.',
      { type: 'formula', label: 'Ideal query vector (needs complete relevance knowledge)', text: 'q_ideal = (1/|C_R|) Σ_{d in C_R} d  -  (1/(N - |C_R|)) Σ_{d not in C_R} d  (difference of centroids)' },
      'Cannot be computed (C_R unknown), so Rocchio approximates it using the judged sets only.'
    ] },
    { heading: 'Rocchio formula', items: [
      { type: 'formula', label: 'Rocchio', text: 'q_new = α q_orig + β (1/|D_R|) Σ_{d in D_R} d  -  γ (1/|D_N|) Σ_{d in D_N} d' },
      'α = weight of original query (keeps the query anchored), β = contribution of relevant documents (pull), γ = contribution of non-relevant documents (push). Typical: α=1, β=0.75, γ=0.25 (or γ=0). Positive feedback is usually more reliable, so β > γ.',
      'Negative weights are **truncated to 0** in the final vector. The new query has many more non-zero terms (query expansion) and re-weighted old terms.',
      '**Ide regular:** q_new = q_old + Σ_{D_R} d - Σ_{D_N} d (no averaging). **Ide dec-hi:** subtract only the highest-ranked non-relevant document: q_new = q_old + Σ_{D_R} d - MAXNR(d).'
    ] },
    { heading: 'Worked example (from the notes)', items: [
      { type: 'table', head: ['Vector', 'information', 'retrieval', 'indexing', 'database'], rows: [['original query q', '1', '1', '0', '0'], ['relevant d1', '1', '2', '2', '0'], ['relevant d2', '1', '1', '2', '0'], ['non-relevant d3', '0', '0', '0', '2'], ['Rocchio q_new (α=1, β=0.75, γ=0.25)', '1.75', '2.125', '1.5', '-0.5 -> 0']] },
      'Centroid of relevant = ((1,2,2,0) + (1,1,2,0))/2 = (1, 1.5, 2, 0). q_new = (1,1,0,0) + 0.75(1,1.5,2,0) - 0.25(0,0,0,2) = (1.75, 2.125, 1.5, -0.5). Truncate: **(1.75, 2.125, 1.5, 0)**. The new term "indexing" is added; "database" is excluded.',
      { type: 'diagram', kind: 'scatter', data: { title: 'Rocchio in the (information, retrieval) plane', xLabel: 'weight of information', yLabel: 'weight of retrieval', xMin: -0.25, xMax: 2.25, yMin: -0.25, yMax: 2.5, series: [ { name: 'original query', points: [[1, 1]] }, { name: 'relevant docs', points: [[1, 2], [1, 1]] }, { name: 'non-relevant d3', points: [[0, 0]] }, { name: 'new query', points: [[1.75, 2.125]] } ] }, caption: 'Projection onto two terms: the query moves up and away from the non-relevant document.' }
    ] },
    { heading: 'Graded feedback (1-5 scores) and weighted aggregation (2023-24 P2, 2025-26)', items: [
      'Binary Rocchio uses equal weight for every judged document. To use a **range of weights**, give each document a feedback weight f(d) (e.g. rating 1-5 mapped to -2..+2, or rating/5) and replace the centroids by **weighted centroids**:',
      { type: 'formula', label: 'Graded Rocchio', text: 'q_new = α q_orig + β Σ_{d: f(d)>0} f(d) d / Σ f(d)  -  γ Σ_{d: f(d)<0} |f(d)| d / Σ |f(d)|' },
      'Worked: relevant d1 (rating 4) and d2 (rating 2): weighted centroid = (4 d1 + 2 d2)/6 = (1, 1.67, 2, 0). q_new = (1,1,0,0) + 0.75 (1, 1.67, 2, 0) - 0.25 (0,0,0,2) = (1.75, 2.25, 1.5, -0.5): the highly rated document now dominates. Ratings can also be mapped to positive (4-5), neutral (3: ignored) and negative (1-2) groups.',
      'Alternative: scale the contribution of each document by its rating and by its rank, or learn weights (e.g. regression from ratings to term weights).'
    ] },
    { heading: 'Limitations and practical challenges of Rocchio', items: [
      'Needs user effort: users are often unwilling to judge; judgements are inconsistent; judging takes time.',
      'Parameters α, β, γ must be tuned per collection/user; no theoretical optimum.',
      'Assumes relevant documents form **one** cluster. Fails for multi-faceted information needs (disjoint relevant sets), e.g. "jaguar" with both car and cat relevant: the centroid lies between the clusters and matches neither.',
      '**Biased/small feedback sample:** if 4 of 5 judged documents come from one subtopic, the centroid and query drift to that subtopic and other relevant subtopics are lost (see below).',
      'Query becomes long (many terms), slowing retrieval; need to limit the number of expansion terms.',
      'Poor for low-recall or very bad initial results (no relevant documents to learn from); can drift (query drift).',
      'Evaluation trap: feedback documents move up the ranking, inflating scores. Use **residual collection evaluation**: remove documents judged during feedback and compare original and modified queries on the remaining collection.',
      'Works only if the model has vector representations (similar ideas exist for probabilistic and neural models).'
    ] },
    { heading: 'Effectiveness, evaluation and use beyond the vector model (lecture)', items: [
      '**Approaches to feedback and expansion (lecture taxonomy):** explicit relevance feedback; pseudo-relevance feedback; collection-based query expansion (local analysis = the retrieved set; global analysis = the whole collection). Feedback lets the system identify useful terms absent from the query, adjust existing term weights and improve the ranking of relevant documents.',
      '**Effectiveness** depends on the quality and quantity of judgements, how representative the feedback documents are, the parameters (α, β, γ) and the collection; early VSM studies reported substantial gains in average precision, but feedback does not improve every query.',
      '**Beyond the VSM:** vector models (Rocchio, Ide modify query vectors); **probabilistic** models use judgements to estimate or update term weights; **neural** models use feedback for query representations, reranking or model adaptation; **information filtering** uses feedback to refine a persistent user interest profile over time.',
      '**Challenges (lecture summary):** selecting useful expansion terms, avoiding query drift, evaluating improvements fairly, obtaining reliable user feedback without imposing effort.'
    ] },
    { heading: 'Biased feedback samples: robust aggregation (2025-26 P2 Q1h)', items: [
      '**Effect:** the updated query vector = centroid of the 5 judged documents, so 4 documents from one subtopic make the centroid sit inside that subtopic; the new query retrieves more of the same subtopic, hurts recall on other aspects and reduces diversity.',
      '**More robust strategies:** (1) cluster the judged relevant documents and give each cluster (subtopic) equal total weight (average of cluster centroids, not of documents); (2) cap per-cluster/per-source contribution or down-weight near-duplicates; (3) use a robust centroid (trimmed mean/median) or keep the top terms by document frequency across the judged set (term must appear in several documents); (4) keep a high α so the original query anchors the intent; (5) diversify what you show for judgement (MMR) so feedback is less biased in the first place; (6) use multiple queries, one per cluster, and fuse the rankings.'
    ] },
    { heading: 'Answer template: "Discuss a feedback mechanism for the VSM"', items: [
      '1. Why feedback; 2. explicit judgements D_R and D_N; 3. Rocchio formula with α, β, γ and example; 4. effect (re-weights, adds terms, truncates negatives); 5. evaluation (residual collection); 6. limitations (effort, parameters, single cluster, drift); 7. extension (graded weights, implicit feedback).'
    ] }
  ],
  pitfalls: [
    'Dividing by |D_R| and |D_N| is Rocchio; omitting the averaging is the Ide variant.',
    'Not truncating negative weights at the end (the notes do).',
    'Saying γ must be larger than β: positive feedback is usually trusted more, so β > γ.',
    'Forgetting to mention that the original query is retained through α.'
  ]
},
{
  id: 'pseudo-relevance-feedback',
  title: 'Pseudo-relevance feedback, query drift and Rocchio comparison',
  priority: 10,
  tier: 'core',
  freq: '5/9 papers',
  marks: '7-10 marks',
  summary: '**Pseudo (blind) relevance feedback assumes the top-k results are relevant, expands the query from them automatically, and runs again: no user effort, but a wrong assumption causes query drift.**',
  mnemonic: 'PRF: Assume top-k, Expand, Re-run (and watch the Drift)',
  source: ['CT4100_Notes_06_Relevance_Feedback'],
  sections: [
    { heading: 'How PRF works', items: [
      'Also called blind relevance feedback. **No explicit judgements.**',
      '1. Run the original query. 2. Take the top **k** documents (k about 5-20) and assume they are relevant. 3. Select **expansion terms** from them: e.g. Rocchio centroid (highest-weight terms), top terms by tf-idf or by association with query terms (local analysis). 4. Add the best m terms (m about 10-30) with weights (original query terms weighted higher). 5. Re-run the expanded query and return the new ranking.',
      '**Key assumption:** the top-ranked documents contain useful information about the user\'s need (high precision at the top).',
      'In a vector model it is Rocchio with D_R = top-k, γ = 0 (or the bottom-ranked documents as D_N).'
    ] },
    { heading: 'Advantages and risks', items: [
      '**Advantages:** fully automatic, no user burden; usually improves **recall** and average performance (MAP) by bridging vocabulary mismatch; simple to add to any ranker; works with short queries.',
      '**Risks:** if top-k are not relevant (poor initial query) it adds irrelevant terms; **query drift** moves the query away from the original intent; extra retrieval pass costs time; high variance across queries (helps some, hurts others); long expanded queries; ambiguous queries drift towards the dominant sense; does not help when no relevant documents exist.',
      '**Mitigations:** apply PRF only when the query is predicted easy (QPP); weight the original terms more (large α); restrict to few terms; weight documents by rank/score; use diverse term selection; verify with feedback from clarity scores.'
    ] },
    { heading: 'Query drift (2025-26 P2 Q1g)', items: [
      '**Definition:** the modified query gradually shifts away from the original information need (topic) over iterations so retrieved documents are about a related but different topic.',
      '**Most likely when:** the initial results have low precision (hard/ambiguous queries); many feedback iterations; many expansion terms or a small α; the feedback documents are broad or multi-topic; feedback sample is biased; terms from a dominant sense of an ambiguous word are added.',
      '**Detecting drift:** compare each iteration\'s query vector with the original by cosine similarity and flag when it falls below a threshold; measure overlap of the top-k results between the original and the current iteration (falling overlap); check that the original terms still carry enough weight; monitor clarity/score distributions; use a held-out set of judged documents or a user check; stop feedback (e.g. after 1-2 iterations) when change is large.'
    ] },
    { heading: 'Rocchio (explicit) vs PRF: compare and contrast (10 marks, 2023-24)', items: [
      { type: 'table', head: ['Aspect', 'Rocchio (explicit relevance feedback)', 'Pseudo-relevance feedback'], rows: [
        ['Source of judgements', 'User marks relevant/non-relevant documents', 'Assume top-k relevant; no negatives (or bottom documents)'],
        ['User effort', 'Needs interaction and willingness', 'None, automatic'],
        ['Reliability of feedback', 'High if the user is consistent', 'Depends on initial precision; errors are amplified'],
        ['Negative evidence', 'Uses γ to push away from non-relevant', 'Usually unavailable'],
        ['Typical gain', 'Large gains when judgements good', 'Moderate average gain, high variance across queries'],
        ['Risk', 'Biased/small sample, single-cluster assumption', 'Query drift when top-k are wrong'],
        ['Suitable when', 'Interactive/professional search, user willing, recall-oriented (legal, patent)', 'Large-scale/web search with short queries, good initial precision, no interaction possible'],
        ['Relationship', 'Rocchio is the algorithm that updates the query vector', 'PRF is a way of obtaining the feedback set; it can use the Rocchio update']
      ] },
      'Common weakness of both: the query becomes long; parameters (α, β, γ, k, number of terms) need tuning; neither fixes multi-faceted needs without diversity.',
      'Selection rule to quote: use explicit Rocchio when users can and will judge and precision at the top is uncertain; use PRF when interaction is impossible and the query is predicted easy.'
    ] }
  ],
  pitfalls: [
    'Treating PRF and Rocchio as alternatives: PRF supplies the relevant set; Rocchio (or local analysis) is how you use it.',
    'Not stating the assumption (top-k relevant) or not naming query drift as the main risk.',
    'Claiming PRF always improves results: it is high variance.'
  ]
},
{
  id: 'query-expansion-analysis',
  title: 'Query expansion: local analysis, global analysis, thesaurus vs corpus-derived',
  priority: 5,
  tier: 'core',
  freq: '6/9 papers',
  marks: '8-10 marks',
  summary: '**Query expansion adds related terms to improve recall; local analysis builds term associations from the top retrieved documents (association, metric, scalar clusters), global analysis from the whole collection, a thesaurus from a fixed hand-built resource.**',
  mnemonic: 'Local = this query\'s results; Global = whole corpus; Thesaurus = human-built dictionary',
  source: ['CT4100_Notes_06_Relevance_Feedback', 'CT4100_Notes_08_Web_Search'],
  sections: [
    { heading: 'Concepts', items: [
      'Goal: reduce **vocabulary mismatch** (query says car, document says automobile) and improve recall by adding related terms (possibly with lower weights).',
      '**Local analysis:** examine the documents retrieved for THIS query (query-dependent). **Global analysis:** relationships estimated from the entire collection (query-independent, precomputed). **Thesaurus/ontology:** fixed hand-built resource (WordNet, MeSH, domain ontology).'
    ] },
    { heading: 'Local analysis (2021-22: 8 marks, "describe an approach and discuss limitations")', items: [
      'Assumption: terms occurring together in retrieved documents are semantically or topically related.',
      '**Procedure:** (1) run the query, take the top-k documents (local set); (2) build a term-term association matrix M over this set; (3) for each query term look at its row, choose terms with high association; (4) combine into a score per candidate and add the top few terms, possibly weighted.',
      { type: 'formula', label: 'Association cluster (Jaccard over documents)', text: 'M(i,j) = f(i,j) / ( f(i) + f(j) - f(i,j) ), f(i) = number of local documents containing term i; f(i,j) = number containing both.' },
      'Worked: f(i)=20, f(j)=15, f(i,j)=10 gives M = 10/(20+15-10) = **0.40**.',
      { type: 'formula', label: 'Metric cluster (proximity)', text: 'M(i,j) = Σ over pairs of occurrences (t_i, t_j) of 1 / dist(t_i, t_j). Closer occurrences contribute more.' },
      { type: 'formula', label: 'Scalar cluster (similar contexts)', text: 'v_i = (M(i,1), ..., M(i,n)); S(t_i,t_j) = (v_i · v_j) / (|v_i| |v_j|). Terms that co-occur with the same other terms are related even if they never appear together (synonyms).' },
      { type: 'table', head: ['Method', 'Basis', 'Idea'], rows: [['Association', 'co-occurrence in documents', 'terms in the same documents are related'], ['Metric', 'distance between occurrences', 'nearby terms are more related; phrases'], ['Scalar', 'similarity of association vectors', 'similar contexts mean related (synonyms)']] },
      '**Selecting terms:** independent (top k for each query term), combined association S(t) = Σ_{t_i in q} M(i,t) (favours terms related to the whole query), and **diversity-aware** selection (see Diversity topic).',
      '**Advantages:** query-specific (resolves ambiguity in the context of this query); adapts to the collection\'s own vocabulary; no external resource; handles new terms.',
      '**Limitations:** depends on the quality of the initial retrieval (poor top-k means bad terms; **drift**); expensive at query time (extra retrieval + computation); small sample (k documents) gives noisy statistics; common terms/ambiguous senses get high association; expansion terms may be redundant (near-synonyms of each other) so diversity is needed; may not help already-good or very hard queries.'
    ] },
    { heading: 'Global analysis', items: [
      'Represent each term t_i as a vector over all N documents: t_i = (w_i1, ..., w_iN). Terms with similar document-occurrence patterns are related; sim(t_i,t_j) = cosine.',
      'Query vector in document space: q_D = Σ_{t_i in q} w_i t_i. Rank candidate terms by cosine to q_D; add the top few.',
      '**Pros:** computed offline, no extra query-time retrieval, robust (does not depend on the initial ranking), uses all evidence. **Cons:** not query-specific (cannot disambiguate: jaguar expands to both car and animal terms), costly to build and maintain for large changing collections, may add terms that are globally related but irrelevant to this query.'
    ] },
    { heading: 'Local vs thesaurus: compare and contrast (2025-26 P1 Q3a, 10 marks)', items: [
      { type: 'table', head: ['Aspect', 'Local analysis of the return set', 'Fixed thesaurus / ontology'], rows: [
        ['Source', 'Top-k documents for the query', 'Manually built resource (WordNet, MeSH, domain ontology)'],
        ['Context sensitivity', 'High: reflects this query and this collection', 'Low: senses are fixed and context-free (needs word sense disambiguation)'],
        ['Vocabulary', 'Domain and collection specific, includes new terms, slang, names', 'Static, general; misses new terms; may not match the collection language'],
        ['Cost', 'Query-time cost; no construction effort', 'High construction/maintenance effort but cheap lookup, precomputed'],
        ['Quality of relations', 'Association not semantics: may add co-occurring but unrelated terms', 'Precise typed relations (synonym, broader, narrower), human-verified'],
        ['Dependence on first retrieval', 'Yes (drift risk)', 'No'],
        ['Risks', 'Drift; noisy for hard queries', 'Ambiguity (adds wrong senses), over-expansion, coverage gaps'],
        ['Best for', 'Large, dynamic, general collections', 'Controlled-vocabulary domains (medical, legal)']
      ] }
    ] },
    { heading: 'Thesaurus vs corpus-derived expansion (2025-26 P2 Q4b)', items: [
      'Claim to evaluate: "a manually constructed thesaurus is always preferable because humans understand meaning whereas co-occurrence only captures surface patterns".',
      '**Advantages of corpus-derived expansion:** (1) **coverage and freshness**: includes new words, names, jargon, abbreviations, slang, domain-specific terms that no thesaurus lists; (2) **matches the collection**: terms actually used in these documents, so expanded queries retrieve real documents; (3) **automatic and cheap to maintain**, scales to many languages/domains; (4) **context sensitive** (local analysis disambiguates); (5) captures associations like "python" and "pandas" that are not synonyms but are useful; (6) weights can be learned from data.',
      '**Scenarios where the claim holds:** (1) small or specialised collections with too little data for reliable statistics; (2) controlled vocabularies where precision matters (medical MeSH, legal, patents) and the thesaurus is high quality and maintained; (3) when co-occurrence is misleading (antonyms co-occur: hot/cold; very common words co-occur with everything); (4) cross-language or explainable systems where exact semantic relations (broader/narrower) must be shown to users; (5) very short or ambiguous queries on a poor first retrieval, where local analysis drifts.',
      '**Verdict:** neither is always best; combine them (hybrid): use the thesaurus for precise relations and corpus statistics to select, weight and filter the candidate terms for context.'
    ] }
  ],
  pitfalls: [
    'Describing expansion without saying how terms are scored (give the association measure) and without limitations.',
    'Confusing local (query-time, top-k) with global (offline, whole collection).',
    'Forgetting that a thesaurus is context-free: it adds all senses of an ambiguous word.',
    'Writing a one-sided answer to an "evaluate this claim" question: give both advantages and scenarios where the argument holds, then a verdict.'
  ]
},
{
  id: 'diversity',
  title: 'Diversity: diverse expansion terms, result diversification, measures',
  priority: 8,
  tier: 'core',
  freq: '8/9 papers',
  marks: '5-9 marks',
  summary: '**Diversity avoids redundancy: select items that are relevant AND dissimilar to those already chosen (MMR: λ·relevance - (1-λ)·max similarity to the selected set), and measure it with intra-list distance, subtopic recall or α-nDCG.**',
  mnemonic: 'MMR = Relevant but not Redundant',
  source: ['CT4100_Notes_06_Relevance_Feedback', 'CT4100_Notes_07_Collaborative_Filtering'],
  sections: [
    { heading: 'Why diversity', items: [
      'Queries are ambiguous (jaguar) or multi-faceted; user intent is unknown. Returning many near-identical items wastes list space and risks missing the user\'s intent entirely.',
      'Applies to: **expansion terms** (don\'t add 5 near-synonyms), **search results** (cover all senses/aspects), **recommendations** (not 10 films from one franchise).',
      'There is a **trade-off**: pure relevance ranking maximises expected relevance of each item (probability ranking principle); diversification sacrifices some per-item relevance to maximise coverage of intents and reduce the risk of total failure.'
    ] },
    { heading: 'Diverse candidate terms (no user feedback) - 8/9 papers', items: [
      'Setting: suggest terms to the user to add to the query, from the top-k documents (pseudo-feedback) or the collection.',
      '**Algorithm (greedy, MMR style):** (1) retrieve top-k for the query; (2) build candidate terms and score each by association with the query (e.g. Σ_{t_i in q} M(i,t) with Jaccard/PMI/tf-idf); (3) pick the best-scoring term; (4) for each further pick choose the term maximising **λ × assoc(t,q) - (1-λ) × max_{s in selected} sim(t,s)** where sim is term-term similarity (scalar cluster cosine, co-occurrence, embedding cosine); (5) stop after m terms.',
      '**Alternative: cluster-then-pick:** cluster the candidate terms (e.g. k-means on their document-occurrence vectors or on word embeddings) and take the highest-scoring term from each cluster (one term per sense/aspect). Another: cluster the top documents and take terms from each cluster.',
      'Evaluation: show terms to users; measure the proportion of subtopics covered, redundancy among terms, retrieval gain when a user picks a term (MAP, S-recall), compare against the non-diverse list.',
      'Limitations: choosing λ and the number of clusters; needs a good term similarity; first retrieval may be poor; may drop highly relevant but similar terms.'
    ] },
    { heading: 'MMR (Maximal Marginal Relevance)', items: [
      { type: 'formula', label: 'MMR', text: 'next = argmax_{d in Candidates \\ S} [ λ · rel(d,q)  -  (1 - λ) · max_{d_j in S} sim(d, d_j) ]; S = items already selected; λ in [0,1] (1 = pure relevance, 0 = pure novelty).' },
      'Worked example, λ = 0.7: relevance d1 0.9, d2 0.85, d3 0.6, d4 0.5; sim(d1,d2)=0.95, sim(d1,d3)=0.2, sim(d1,d4)=0.1, sim(d2,d3)=0.25, sim(d2,d4)=0.15, sim(d3,d4)=0.3.',
      'Round 1: pick d1 (highest relevance). Round 2: d2 = 0.7(0.85) - 0.3(0.95) = 0.31; d3 = 0.7(0.6) - 0.3(0.2) = **0.36**; d4 = 0.7(0.5) - 0.3(0.1) = 0.32, so pick d3. Round 3: d2 = 0.595 - 0.3(max(0.95,0.25)) = 0.31; d4 = 0.35 - 0.3(max(0.1,0.3)) = 0.26, so pick d2. MMR order **d1, d3, d2, d4** versus relevance order d1, d2, d3, d4: the near-duplicate d2 is demoted.'
    ] },
    { heading: 'Result diversification algorithms (2024-25 P2: describe one + trade-offs)', items: [
      '**MMR** (above): greedy, similarity-based, no explicit aspects, O(k·n) comparisons.',
      '**xQuAD (explicit aspects):** estimate sub-queries/aspects of the query (from query suggestions, clusters or taxonomy); score = (1-λ) P(d|q) + λ Σ_aspects P(aspect|q) P(d|aspect) Π_{already selected d_j}(1 - P(d_j|aspect)): rewards documents covering aspects not yet covered.',
      '**Cluster-based:** cluster the results and interleave top documents of each cluster. **IA-Select / PM-2** are other aspect-based methods.',
      '**Trade-off relevance vs diversity:** λ controls it; high diversity lowers precision for the dominant intent; for unambiguous queries diversification hurts; for ambiguous/multi-faceted queries (jaguar, python) it raises the chance that every user finds something relevant (risk minimisation). Use QPP/ambiguity detection to decide when to diversify. Costs: extra computation, need aspect estimates, evaluation needs subtopic judgements.'
    ] },
    { heading: 'Measuring diversity of the top-k (2025-26 P1 Q1c, 5 marks)', items: [
      '**Intra-list distance (ILD):** average pairwise dissimilarity in the top-k: ILD = (2 / (k(k-1))) Σ_{i<j} (1 - cos(d_i, d_j)). Higher = more diverse. Needs document vectors only (no judgements).',
      '**Subtopic recall (S-recall@k):** fraction of the query\'s subtopics covered by at least one of the top-k documents (needs subtopic judgements, as in TREC Diversity).',
      '**α-nDCG:** DCG where a document\'s gain for a subtopic is discounted by (1-α)^(number of earlier documents already covering that subtopic); rewards novelty and penalises redundancy.',
      '**Cluster/class coverage:** number of distinct clusters or categories represented in the top-k; **ERR-IA** (intent-aware expected reciprocal rank) averages a metric over intents weighted by intent probability.',
      '**Recommender versions:** catalogue coverage, novelty, intra-list diversity. Mention that diversity must be reported with relevance (precision/nDCG) because it can be raised trivially by returning random items.'
    ] }
  ],
  pitfalls: [
    'Describing diversity as "pick different terms" without a concrete selection rule (MMR formula or cluster-pick).',
    'Not discussing the relevance-diversity trade-off or the λ parameter.',
    'Measuring diversity without relevance: random lists are diverse.',
    'For expansion terms, forgetting that the diversity step uses a term-term similarity.'
  ]
}
];
