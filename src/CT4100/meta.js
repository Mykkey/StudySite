module.exports = {
  name: 'Information Retrieval',
  evidence: 'past-papers',
  exam: {
    summary: [
      'Duration 2 hours. Latest format (2025-26): Question 1 compulsory (40 marks) + any TWO of Q2-Q4 (20 marks each) = 80 marks of exam paper (module is 80% exam).',
      'Q1 = eight short 5-mark parts (about 7 minutes each). Q2-Q4 = two 10-mark parts each (about 15 minutes each, 12 minutes if you rush).',
      'Older papers (2021-2025) were 3 of 4 questions at 25 marks with 7-10 mark parts: same topics, just longer answers. Use them for practice but write tighter.',
      'Questions are mostly discussion/design questions ("describe", "suggest an approach", "discuss limitations"), with an occasional calculation (extended Boolean, precision-recall graph). The notes from the lecturer are the marking scheme: use their terminology.'
    ],
    structure: [
      { label: 'Q1 (compulsory)', detail: '40 marks: eight 5-mark parts (a-h). Sampled from the whole syllabus: VSM, independence assumption, BM25, normalisation, metrics (MAP), diversity, relevance feedback, cluster hypothesis, indexing, vocabulary mismatch, neural IR.' },
      { label: 'Q2 (optional)', detail: '20 marks: two 10-mark parts. In 2025-26 these were QPP + collaborative filtering/cold start, or web search + cold start.' },
      { label: 'Q3 (optional)', detail: '20 marks: two 10-mark parts. 2025-26: query expansion (local vs thesaurus) + HITS, or learning to rank + QPP.' },
      { label: 'Q4 (optional)', detail: '20 marks: two 10-mark parts. 2025-26: learning to rank + neural LTR, or document similarity/clustering + thesaurus vs corpus expansion.' },
      { label: 'Time plan', detail: 'About 1 minute per mark: Q1 about 45 min, two optional questions about 30 min each, 15 min to check. Pick the two optional questions whose BOTH halves you can answer.' }
    ],
    freq: [
      { topic: 'Collaborative filtering / recommender systems (steps, evaluation, cold start, content info)', count: 9, of: 9 },
      { topic: 'Query difficulty / query performance prediction (pre- and post-retrieval)', count: 9, of: 9 },
      { topic: 'Relevance feedback, Rocchio, pseudo-relevance feedback, local analysis / query expansion', count: 9, of: 9 },
      { topic: 'Learning in IR (learn term weights, learning to rank, neural LTR)', count: 9, of: 9 },
      { topic: 'Diversity (diverse expansion terms, result diversification, diversity measure, diverse recommendations)', count: 8, of: 9 },
      { topic: 'Precision/recall, PR graph, MAP, user-oriented and other evaluation measures', count: 8, of: 9 },
      { topic: 'Term weighting: good weighting scheme, axioms, normalisation, BM25', count: 8, of: 9 },
      { topic: 'Clustering (algorithms, evaluation, uses in IR, cluster hypothesis)', count: 7, of: 9 },
      { topic: 'Vector space model and the term-independence assumption', count: 5, of: 9 },
      { topic: 'Similarity of structured (scientific) documents', count: 5, of: 9 },
      { topic: 'Indexing (inverted index, positional index, term-document matrix)', count: 4, of: 9 },
      { topic: 'Boolean / extended Boolean / Boolean in a ranked framework', count: 4, of: 9 },
      { topic: 'Web search: PageRank, HITS, web vs traditional collections', count: 3, of: 9 },
      { topic: 'Pre-processing (stemming, stop words)', count: 2, of: 9 },
      { topic: 'Thesaurus vs corpus-derived expansion, vocabulary mismatch, query drift, neural retrieval', count: 2, of: 9 }
    ],
    years: [
      { year: '2021-22 Paper 1 (3 of 4, 25 marks each)', themes: ['Q1 CF stages (10), CF evaluation (8), diverse recommendations (7)', 'Q2 extended Boolean AND/OR calc (10), PR graph (5), learning term weights (10)', 'Q3 axioms (8), good weighting scheme (9), local analysis expansion (8)', 'Q4 query difficulty (8), similarity of scientific articles (8), clustering approach (9)'] },
      { year: '2021-22 Paper 2 (repeat)', themes: ['Q1 CF stages, CF evaluation, content info in recommender', 'Q2 precision/recall + PR graph (8), limitations of P/R + alternatives (7), learning term weights (10)', 'Q3 good weighting scheme (9), local analysis (8), diverse local analysis (8)', 'Q4 query difficulty, similarity of articles, clustering'] },
      { year: '2022-23', themes: ['Q1 good weighting scheme (8), advantages of axiomatic approaches (8), indexing for VSM (9)', 'Q2 explicit feedback in VSM (8), diverse candidate terms (8), identify a difficult query (9)', 'Q3 precision-recall graph (8), evaluating a clustering algorithm (8), clustering in IR systems (9)', 'Q4 CF steps (8), content info to improve coverage (7), learning approaches for two IR tasks (10)'] },
      { year: '2023-24 Paper 1', themes: ['Q1 three pre-processing steps (9), VSM strengths/limits (8), indexing (8)', 'Q2 user feedback to modify query (7), diverse candidate terms (8), Rocchio vs PRF (10)', 'Q3 user-experience measure (8), clustering evaluation (8), CF steps with example (9)', 'Q4 PageRank (10), three pre-retrieval measures (9), learning approach (6)'] },
      { year: '2023-24 Paper 2 (repeat)', themes: ['Q1 pre-processing (9), indexing (8), document length normalisation (8)', 'Q2 graded 1-5 feedback (9), diverse terms (8), Rocchio vs PRF (8)', 'Q3 user-experience measure (8), difficulties of CF (9), recommender effectiveness measures (8)', 'Q4 pre-retrieval predictors (9), learning approach (8), Boolean queries with ranked output (8)'] },
      { year: '2024-25 Paper 1', themes: ['Q1 VSM normalisation (7), term independence assumption (10), axiomatic weighting (8)', 'Q2 QPP three sources (9), Rocchio + limitations (7), diverse suggested terms, no feedback (9)', 'Q3 extended Boolean AND/OR calc (10), PR graph (5), learning term weights (10)', 'Q4 CF pros/cons (8), similarity of scientific articles (9), clustering for two IR tasks (8)'] },
      { year: '2024-25 Paper 2 (repeat)', themes: ['Q1 normalisation (7), independence assumption (10), pseudo-relevance feedback (8)', 'Q2 QPP three sources (9), Rocchio (7), result diversification algorithm (9)', 'Q3 ML to learn term weights (10), PR curve (5), Boolean in vector space (10)', 'Q4 document similarity (9), clustering for two IR applications (8), CF + cold start (8)'] },
      { year: '2025-26 Paper 1 (NEW FORMAT)', themes: ['Q1 (40): VSM + similarity; independence assumption; diversity measure of top-k; concatenated docs and tf-idf; BM25 components/parameters; Rocchio with graded feedback; cluster hypothesis failing; MAP pros/cons', 'Q2: QPP three sources (10) + movie CF, cold start, identify hard-to-recommend users (10)', 'Q3: query expansion local vs thesaurus (10) + HITS and difference to PageRank (10)', 'Q4: learning to rank advantage/training example/metrics (10) + neural LTR vs traditional (10)'] },
      { year: '2025-26 Paper 2 (repeat, NEW FORMAT)', themes: ['Q1 (40): term-document matrix sparsity; positional index and phrase queries; BM25 b=0/b=1; testing the cluster hypothesis; vocabulary mismatch; neural retrieval vs bag of words; query drift; biased feedback sample', 'Q2: web vs traditional collections (10) + cold start in CF (10)', 'Q3: pointwise/pairwise/listwise LTR (10) + pre- vs post-retrieval QPP and uses (10)', 'Q4: similarity + clustering of scientific articles (10) + thesaurus vs corpus-derived expansion (10)'] }
    ],
    tips: [
      'Recurring topics are repeated almost verbatim across years (CF, QPP, local analysis, diverse terms, PR graph, learning term weights, scientific-article similarity). Have a rehearsed 8-10 mark answer for each of these.',
      'Newest papers (2025-26) added: learning to rank (point/pair/list), neural LTR, BM25 parameters, positional indexes, cold start in depth, HITS vs PageRank, cluster hypothesis tests, vocabulary mismatch, query drift, neural retrieval. Revise these even though the lecture decks only touch some.',
      'For "discuss/compare" questions use a template: definition, mechanism (steps), advantages, limitations/risks, example. Marks go for each distinct point: write 1 point per line and aim for about 1 point per mark plus an example.',
      'Always give a small concrete example (a query like "jaguar speed", a 3-user rating table) and write formulas with every symbol defined.',
      'For "suggest an approach" questions (diverse terms, similarity of scientific articles, learning term weights) state: data, representation, algorithm, how it is evaluated, limitations. Limitations are explicitly asked for almost every time.',
      'Q1 parts are 5 marks: about 5 points, 6-8 lines. Do not overwrite; do not leave any Q1 part blank because it is compulsory and spans the syllabus.',
      'Calculation questions: show the formula, plug in numbers, state the result. Even with a wrong final value, method marks are given.'
    ],
    note: 'Papers supplied: 9 (two sittings for 2021-22, 2023-24, 2024-25, 2025-26 and one for 2022-23). Topic counts above are number of papers containing the topic. Some 2025-26 topics (learning to rank, neural IR, positional index, cold-start detail, vocabulary mismatch, query drift, cluster hypothesis tests) are covered only lightly or not at all in the lecture-note decks supplied; those topics in this module are marked "past papers (not in notes)".'
  },
  hints: null
};
