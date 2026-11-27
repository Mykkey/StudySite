module.exports = [
{
  id: 'inverted-index',
  title: 'Inverted index, positional index, phrase queries and efficient query processing',
  priority: 21,
  tier: 'likely',
  freq: '4/9 papers (indexing for VSM x3; positional index and sparsity 2025-26)',
  marks: '5-9 marks',
  summary: '**An inverted index = a lexicon (sorted vocabulary) + postings lists (sorted doc IDs, optionally with tf and positions); queries are answered by merging postings, scoring only documents that contain query terms; positions enable phrase and proximity queries at a storage cost.**',
  mnemonic: 'Lexicon + Postings; merge sorted lists; positions for phrases',
  source: ['CT4100_Notes_03_Indexing'],
  sections: [
    { heading: 'Term-document matrix and why it is sparse (2025-26 P2 Q1a)', items: [
      '**Term-document (incidence) matrix** M: M[i][j] = 1 (or tf / weight) if term t_i occurs in document d_j, else 0. Rows = terms (vocabulary), columns = documents.',
      '**Sparse:** a typical document contains only a few hundred distinct terms out of a vocabulary of 10^5 to 10^6+ (Heaps\' law), so with hundreds of millions of documents and 30,000+ terms only about **0.01% of entries are non-zero** (Zipf: most terms are rare).',
      '**Implications:** storing the dense matrix is infeasible (N × M cells, mostly zeros); store only non-zero entries (inverted index). For similarity at query time only documents that share at least one term with the query have non-zero dot product, so we **score only the union of the query terms\' postings lists**, not every document; cost is proportional to postings length, not to collection size. Zero entries contribute nothing to cosine; document lengths (norms) can be precomputed. Sparsity also enables compression.'
    ] },
    { heading: 'Query types the index must support (lecture)', items: [
      'Single term ("python"); Boolean expressions ("(python OR java) AND NOT beginner"); **phrase** queries ("machine learning algorithms"); **proximity** queries ("web" within 5 words of "search"); **wildcard** queries ("automat*" matches automatic, automation); **prefix** queries (all terms starting "auto"). Each type places different demands on the index structure (phrase and proximity need positions; wildcard and prefix need a trie or B+ tree lexicon).',
      'Setup: collection D = {d1..dn}, vocabulary Σ = {t1..tm}; Boolean queries use AND, OR, NOT. The **term-document incidence matrix** (M_ij = 1 iff term t_i occurs in d_j) is the starting point; the inverted index stores only its non-zero entries.'
    ] },
    { heading: 'Structure of an inverted index', items: [
      '**Lexicon (dictionary):** sorted vocabulary of unique terms; one entry per term (with df and a pointer to its postings). Compact, fast lookup (< 1 ms).',
      '**Postings list:** for each term the **document IDs sorted ascending**; optional: term frequency tf, **positions**, precomputed scores, block information. Stored compressed on disk.',
      { type: 'table', head: ['Term (df)', 'Postings: doc [tf] (positions)'], rows: [['new (4)', 'D1 [1] (1); D2 [1] (2); D3 [1] (2); D4 [1] (3)'], ['york (4)', 'D1 [1] (2); D2 [1] (3); D3 [1] (1); D4 [1] (4)'], ['big (2)', 'D1 [1] (5); D4 [1] (1)']] },
      'Granularity trade-off (**block-based indexing**): store (a) tf only, (b) tf plus every position, or (c) tf plus the block (sentence/paragraph) numbers where it occurs; trade run-time work vs index size.',
      '**Lexicon data structures:** sorted array + binary search O(log n); **hash table** O(1) exact match but no range queries; **B+ tree** disk-based, O(log n) and range queries (terms starting "ca"); **trie** (prefix tree) excellent for prefix/wildcard queries (auto*). In practice hybrid: frequent terms (80% of queries) in memory, rest in B+ tree on disk.'
    ] },
    { heading: 'Building the index', items: [
      '1. **Tokenise and normalise** each document (case folding, stop words, stemming). 2. For every token emit (term, docID, position). 3. **Sort** by term then docID. 4. Merge entries of the same term into postings lists; compute df and tf. 5. Write lexicon and postings to disk. For large collections: build partial indexes in memory-sized blocks (blocked sort-based indexing / SPIMI), then **merge** them. Update with a small in-memory index merged periodically.'
    ] },
    { heading: 'Query processing', items: [
      '**Single term:** look up term in lexicon, read postings.',
      '**AND:** merge two sorted postings lists with two pointers; O(n1 + n2). Example cat [1,3,5] AND dog [2,3,4] gives [3]. **OR:** union; **NOT:** difference. Process rare terms first (shortest lists), smallest-first for AND chains.',
      '**Phrase query "new york" with a positional index:** (1) intersect postings for new and york to find documents containing both; (2) in each such document check that a position of york = position of new + 1. For D1: new at 1, york at 2 yes. D2: 2, 3 yes. D3: new 2, york 1: no (wrong order). D4: 3, 4 yes. **Answer {D1, D2, D4}** while Boolean AND would give D3 as well. **Proximity "web" NEAR/5 "search":** check |pos_a - pos_b| ≤ 5. Longer phrases chain the same check: positions p, p+1, p+2.',
      '**Storage overhead of positional index (2025-26 P2 Q1b):** a standard (non-positional) postings entry stores docID (and tf): about one entry per distinct term per document. A positional index stores **one position per occurrence**, so size grows with total token count rather than distinct terms; typically **2 to 4 times larger** than a docID+tf index (positions are small integers, delta-encoded/compressed, but there are many). Frequent terms (stop words) cost most; query time also rises (position comparison). Alternatives: **bi-word (phrase) index** of word pairs (large vocabulary), indexing common phrases only, or a hybrid (positions only for frequent terms); block-level positions.',
      '**Wildcard/prefix queries:** trie or B+ tree on the lexicon (also permuterm / k-gram index).'
    ] },
    { heading: 'Scored retrieval (VSM) with an inverted index', items: [
      'Index stores df and tf in postings (and lexicon idf); document lengths |d| (for cosine) in a separate array. Term-at-a-time scoring with **accumulators:** (1) initialise accumulator per document = 0; (2) for each query term fetch postings and **add** the term\'s contribution (w_{t,q} × w_{t,d}) to each document\'s accumulator; (3) divide by document length; (4) pick top-k using a heap.',
      'Notes toy example: Doc1 "cat cat dog", Doc2 "cat mouse", Doc3 "dog dog bird", query "cat dog" scoring by summed tf. After cat: Doc1 2, Doc2 1; after dog: Doc1 3, Doc3 2, Doc2 1. Ranking **Doc1 > Doc3 > Doc2** (simplified: no idf or normalisation). Only documents in the union of postings are scored.'
    ] },
    { heading: 'Efficiency techniques', items: [
      '**Skip lists:** skip pointers in postings let the merge jump ahead; reduce cost from O(n) to about O(√n) per list; multiple levels help.',
      '**Dynamic pruning (top-k):** precompute per-term upper bounds on contributions, keep the threshold (k-th best score so far), skip documents whose sum of upper bounds is below it (WAND, MaxScore).',
      '**Query optimisation:** process rare terms first; adapt pruning to navigational vs exploratory queries.',
      '**Index partitioning:** document sharding (split documents across machines, send query to all, merge) vs term partitioning (distribute terms, route query).',
      '**Compression:** **delta (gap) encoding** of sorted doc IDs (store differences: [3,7,11,20] becomes [3,4,4,9]; small numbers) with variable-byte/Elias/Golomb codes; **quantisation** of scores (8 bits instead of 32: 75% smaller with tiny accuracy loss); compress the lexicon (front coding). Benefits: less disk and memory, faster I/O.'
    ] },
    { heading: 'Answer template: "outline an indexing approach for VSM queries"', items: [
      '1. Pre-process (tokenise, stop words, stem). 2. Build an inverted index: lexicon with df/idf, postings with doc, tf. 3. Store document lengths/norms. 4. Query: pre-process query, look up terms, term-at-a-time accumulate tf-idf products, normalise, rank top-k. 5. Optimisations: sorted postings merge, skip lists, pruning, compression, sharding. 6. Trade-offs: positional info for phrases (size), update cost, memory.'
    ] }
  ],
  pitfalls: [
    'Describing a forward index (document to terms) instead of the inverted index (term to documents).',
    'Forgetting that postings are sorted by docID (needed for linear merge and for compression).',
    'For phrase queries: forgetting the consecutive-position check (a plain AND is not a phrase match).',
    'Quoting storage overhead without explaining why (one position per occurrence).'
  ]
},
{
  id: 'boolean-models',
  title: 'Boolean, extended Boolean (p-norm) and Boolean queries in a ranked framework',
  priority: 22,
  tier: 'likely',
  freq: '4/9 papers (2 calculations)',
  marks: '8-10 marks',
  summary: '**Classical Boolean gives unranked exact matches; extended Boolean (p-norm) gives graded scores: OR = ((w1^p + w2^p)/2)^(1/p), AND = 1 - (((1-w1)^p + (1-w2)^p)/2)^(1/p); p = 1 behaves like the vector model, p = infinity like fuzzy min/max.**',
  mnemonic: 'AND uses distance from 1, OR uses distance from 0',
  source: ['CT4100_Notes_02a_IR_Models', 'CT4100_Notes_02b_IR_Models_Notes', 'past papers (not in notes)'],
  sections: [
    { heading: 'Classical Boolean model', items: [
      'Based on set theory and Boolean algebra; query = Boolean expression (AND, OR, NOT); term weights binary {0,1} (present/absent). A document is relevant iff it satisfies the query: **no ranking, no partial match**.',
      'Query to **disjunctive normal form:** q = t1 AND (t2 OR NOT t3) = (1,1,0) OR (1,1,1) OR (1,0,0); a document whose term vector equals any component is returned.',
      '**Advantages:** clean formalism, simple, widely used, efficient with an inverted index, user control (precise, predictable), good for professional search.',
      '**Disadvantages:** hard for users to formulate queries (natural language and/or differ from Boolean meaning); too many or too few results (AND too strict, OR too lax); no ranking; ignores term frequency; synonymy/polysemy; terms independent; performance poor.'
    ] },
    { heading: 'Extended Boolean model (p-norm, Salton, Fox and Wu)', items: [
      'Document weights w_1, w_2 in [0,1] for the two query terms, e.g. normalised tf-idf: w = (tf/max tf) × (idf/max idf). Geometric view: the point (w1,w2) in the unit square; OR query: similarity = distance from (0,0) (the "worst" point) so far from origin is good; AND query: similarity = 1 - distance from (1,1).',
      { type: 'formula', label: 'p-norm similarity for two terms (p between 1 and infinity)', text: 'sim(d, t1 OR t2) = ( (w1^p + w2^p) / 2 )^(1/p);   sim(d, t1 AND t2) = 1 - ( ( (1-w1)^p + (1-w2)^p ) / 2 )^(1/p);   NOT t: weight (1 - w).' },
      'For n terms divide by n. p = 1: both = average of weights (vector-like, no Boolean distinction); p = 2: Euclidean; **p → ∞: fuzzy set model: OR = max(w1,w2), AND = min(w1,w2)** (classical Boolean when weights are 0/1). Typical p = 2 to 5 gives a mix. Parameter p can differ per operator.',
      'Properties: results are **ranked**; partial matching: a document with only one of two ANDed terms still gets non-zero score (AND of w1 = 1, w2 = 0 with p = 2: 1 - sqrt(0.5) = 0.293); OR is lenient; AND is strict: higher p makes AND stricter, OR looser.'
    ] },
    { heading: 'Worked example (2021-22, 2024-25: "calculate relevance to highway AND revisited and highway OR revisited")', items: [
{"type":"task","show":1,"q":["Find the term weights, then the score for highway OR revisited and for highway AND revisited with p = 2, p = 1 and p = ∞."]},
      'Collection N = 1000; df(highway) = 100 so idf = log10(1000/100) = 1; df(revisited) = 10 so idf = 2. Document d: tf(highway) = 3, tf(revisited) = 1, max tf in d = 3.',
      'Weights: w_highway = (3/3)(1/2) = **0.5**; w_revisited = (1/3)(2/2) = **0.333** (idf normalised by the maximum idf 2).',
      '**p = 2:** OR = sqrt((0.25 + 0.111)/2) = sqrt(0.1806) = **0.425**. AND = 1 - sqrt(((0.5)^2 + (0.667)^2)/2) = 1 - sqrt((0.25 + 0.444)/2) = 1 - sqrt(0.347) = 1 - 0.589 = **0.411**.',
      '**p = 1:** OR = AND = (0.5 + 0.333)/2 = 0.417. **p = ∞ (fuzzy):** OR = max = 0.5; AND = min = 0.333. Note that for 1 < p < ∞, OR (0.425) > AND (0.411): OR is typically at least as high as AND for the same document.',
      'General case with w1 = 0.6, w2 = 0.2, p = 2: OR = sqrt((0.36+0.04)/2) = 0.447; AND = 1 - sqrt((0.16+0.64)/2) = 1 - 0.632 = 0.368.'
    ] },
    { heading: 'Boolean queries in a ranked/vector framework (2023-24 P2 Q4c, 2024-25 P2 Q3c: 8-10 marks)', items: [
      'Goal: let users type Boolean expressions yet receive a ranked list; handle AND, OR, NOT with partial matching.',
      '**Option 1: Boolean filter then rank.** Evaluate the Boolean expression on the inverted index to get the candidate set, then rank those candidates by VSM cosine (or BM25) between the query terms (positive terms only) and the documents. Simple, exact constraints respected, rank by tf-idf.',
      '**Option 2: extended Boolean (p-norm).** Compute document term weights with tf-idf; evaluate the expression bottom-up with the p-norm formulas: AND via 1 - ((Σ(1-w_i)^p)/n)^(1/p), OR via ((Σ w_i^p)/n)^(1/p), NOT t = 1 - w_t. Rank by the result; choose p by experiment.',
      '**Option 3: fuzzy/min-max.** AND = min, OR = max, NOT = 1 - w (the p → ∞ case).',
      '**Option 4: map to vectors.** Convert the query to DNF; each conjunctive component is a vector of 0/1 (or weights) over the terms; rank documents by the **maximum (or sum) of cosine** between the document vector and the component vectors. OR = union of component vectors, AND = all terms required in a component, NOT = negative weight (or a penalty) for the excluded term.',
      '**Adaptations:** AND needs all terms (use min or penalise missing); OR needs any (max or sum); NOT removes or penalises documents containing the term (negative weights or hard exclusion). Use idf so rare terms count more. Evaluate with ranked metrics against pure Boolean.'
    ] }
  ],
  pitfalls: [
    'Swapping the AND/OR formulas: AND measures distance from (1,1) so it uses (1-w), OR measures distance from the origin so it uses w.',
    'Forgetting to divide by the number of terms (2) inside the root.',
    'Not stating how w_i are obtained (tf-idf normalised to [0,1]).',
    'Saying Boolean is "bad": it is useful, precise and efficient; the weakness is no ranking and rigidity.'
  ]
},
{
  id: 'preprocessing',
  title: 'Text pre-processing: tokenisation, stop words, stemming, normalisation',
  priority: 28,
  tier: 'likely',
  freq: '2/9 papers (9 marks in 2023-24 both)',
  marks: '5-9 marks',
  summary: '**Pre-processing converts raw text into index terms: tokenise, case-fold, remove punctuation and stop words, stem; it shrinks the index and boosts recall but can cost precision and phrase meaning.**',
  mnemonic: 'T-C-P-S-S: Tokenise, Case-fold, Punctuation, Stop words, Stem',
  source: ['CT4100_Notes_02a_IR_Models', 'CT4100_Notes_02b_IR_Models_Notes', 'CT4100_Notes_02c_Preprocessing_Example'],
  sections: [
    { heading: 'Pipeline', items: [
      { type: 'diagram', kind: 'flow', data: { steps: [ { label: 'Raw text' }, { label: 'Tokenise', sub: 'split into words' }, { label: 'Normalise', sub: 'case folding, punctuation, accents' }, { label: 'Stop word removal', sub: 'the, of, is' }, { label: 'Stemming', sub: 'Porter / Lovins' }, { label: 'Index terms', sub: 'term frequencies' } ] }, caption: 'Pre-processing pipeline applied identically to documents and queries.' },
      'Same pre-processing must be applied to **queries** and **documents** or terms will not match.'
    ] },
    { heading: 'The main steps with examples and expected impact (2023-24: three steps, 9 marks)', items: [
      '**Stop-word removal:** drop very frequent words with little meaning (the, is, of, for, in, and). Examples: "the", "of". **Impact:** index size reduced (stop words are often 30-50% of tokens), faster processing, less noise in weights; tf-idf already gives them near-zero idf. **Risks:** phrase and special queries ("to be or not to be", "The Who", "vitamin A", "IT"); modern systems often keep them with compression.',
      '**Normalisation:** case folding (Information = information), punctuation removal, accent removal (café = cafe), number/date normalisation, contractions, spelling correction. **Impact:** treats variants as one term (higher recall, smaller vocabulary); may merge distinct terms (US vs us, Bush vs bush).',
      '**Stemming:** reduce words to a common stem: computerisation, computing, computers → comput; searching, searched → search. Algorithms: **Porter** (rule-based suffix stripping in steps), **Lovins** (single pass longest-match). **Impact:** vocabulary and index smaller (10-30%), **recall improves** (morphological variants match); precision may fall: over-stemming (university and universe → univers), under-stemming (data and datum), stems are not words (retriev, scienc).',
      '**Lemmatisation:** uses vocabulary and morphology to return the dictionary form (better → good, mice → mouse); more accurate than stemming but slower and needs linguistic resources.',
      '**Thesaurus construction:** group synonyms (manual or automatic) to tackle vocabulary mismatch; used for query expansion.',
      '**Others:** tokenisation rules (hyphens, URLs, emails), named entity detection, language detection, HTML/markup removal, n-grams/phrase detection.'
    ] },
    { heading: 'Porter stemmer in outline', items: [
      'Works in five rule steps, each rule has a condition on the **measure m** of the stem (m = number of vowel-consonant sequences: tree m = 0, trouble m = 1, oats m = 1, troubles m = 2).',
      'Step 1a plurals: sses → ss, ies → i, ss → ss, s → (nothing): caresses → caress, ponies → poni, cats → cat. Step 1b: (m > 0) eed → ee (agreed → agree); (stem has vowel) ed, ing → (nothing): plastered → plaster, motoring → motor. Step 1c: stem has vowel and y → i: happy → happi. Step 2: double suffixes mapped (ational → ate, izer → ize, ousness → ous). Step 3: icate → ic, ative → (nothing), alize → al. Step 4: remove -al, -ance, -er, -ic, -able, -ant, -ment, -ent, -ism, -ous, -ive, -ize when m > 1. Step 5: remove final e (m > 1), ll → l.'
    ] },
    { heading: 'Worked example from the notes', items: [
      'Original: "Information retrieval is the science of searching for information in documents. Modern search engines use sophisticated ranking algorithms."',
      '**1. Stop words removed** (is, the, of, for, in): "Information retrieval science searching information documents. Modern search engines use sophisticated ranking algorithms."',
      '**2. Case folding and punctuation removed:** "information retrieval science searching information documents modern search engines use sophisticated ranking algorithms".',
      '**3. Stemming:** inform retriev scienc search inform document modern search engin use sophist rank algorithm.',
      '**4. Term frequencies:** algorithm 1, document 1, engin 1, **inform 2**, modern 1, rank 1, retriev 1, scienc 1, **search 2** (from "searching" and "search"), sophist 1, use 1. Total **13 tokens** (11 distinct terms). Note: the slide total of 14 is a slip; the column sums to 13, and the original sentence has 18 words, 13 after stop-word removal.'
    ] }
  ],
  pitfalls: [
    'Stating stemming only improves things: it can reduce precision (over-stemming).',
    'Forgetting to give concrete examples and the expected impact of each step, which is exactly what is asked.',
    'Applying different pre-processing to queries and documents.'
  ]
},
{
  id: 'ir-models-overview',
  title: 'IR overview: data vs information retrieval, filtering, architecture, models',
  priority: 30,
  tier: 'possible',
  freq: '0/9 papers directly; foundations for Q1 parts',
  marks: '3-5 marks',
  summary: '**IR retrieves relevant unstructured documents for an information need; an IR model is (D, Q, F, R); the system = collection + preprocessing + representation + comparison/ranking + feedback.**',
  mnemonic: 'D-Q-F-R: Documents, Queries, Framework, Ranking',
  source: ['CT4100_Notes_01_Introduction', 'CT4100_Notes_02a_IR_Models', 'CT4100_Notes_02b_IR_Models_Notes', 'CT4100_Notes_08_Web_Search'],
  sections: [
    { heading: 'Definitions', items: [
      '**IR** = finding material (usually documents) of an **unstructured** nature that satisfies an **information need** from within large collections (Manning).',
      '**Data retrieval** (SQL): well-structured items with well-defined meaning; query specifies exactly what is wanted; a correct answer exists (exact match). **Information retrieval:** semi/unstructured natural language, ambiguous semantics; system must interpret content and **rank** documents by estimated relevance; relevance judged for the need, not the query.',
      '**Information filtering:** same models/representations; differs in (1) information need: long-standing profile vs one-off query; (2) document set: a stream with decisions made without seeing the whole collection vs a relatively static collection. Recommenders are filtering systems.',
      '**User role:** formulate query, view results, give feedback, reformulate; in modern hypertext systems users interleave browsing and querying and the need evolves.',
      'Need types on the web: informational, navigational, transactional.'
    ] },
    { heading: 'Architecture and model definition', items: [
      { type: 'diagram', kind: 'flow', data: { steps: [ { label: 'Collection', sub: 'documents' }, { label: 'Pre-processing', sub: 'stemming, stop words' }, { label: 'Representation / index', sub: 'vectors, inverted index' }, { label: 'Comparison and ranking', sub: 'R(q,d)' }, { label: 'Ranked results' } ], loopBack: 'user feedback modifies the query' }, caption: 'High-level IR system: query goes through the same pre-processing; feedback module modifies the query.' },
      'Model = **[D, Q, F, R(q_i, d_j)]**: D = logical document representations, Q = logical query representations, F = framework for modelling D, Q and their relationships, R = ranking function ordering documents for a query.',
      'Families (lecture taxonomy): **Boolean** (classical Boolean, fuzzy set approach, extended Boolean), **vector** (vector space approach, latent semantic indexing, neural networks), **probabilistic** (inference network, belief network; also BIM and BM25 in general). Index terms t_1..t_n with weights w_{i,j}; a document or query is a vector of weights d_j = (w_1, w_2, ...).',
      '**Pre-processing on the slides:** stemming (Lovins and Porter are the most common; computerisation, computing, computers all reduce to comput), stop-word removal (very frequent terms adding little meaning), thesaurus construction (identify synonyms, built manually or automatically).',
      '**Course map (11 topics):** models; system architecture (pre-processing, indexing, compression); evaluation; relevance feedback; term weighting; collaborative filtering; web search (HITS, PageRank); clustering; structured document retrieval; learning in IR (LTR, neural networks, evolutionary computation); query difficulty. Grading: exam 80%, two assignments 10% each. Lecturer: Colm O\'Riordan. Texts: Baeza-Yates and Ribeiro-Neto; Grossman; Manning et al.'
    ] }
  ],
  pitfalls: ['Confusing information retrieval with data retrieval (exact match vs ranked relevance).']
}
];
