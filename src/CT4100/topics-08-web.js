module.exports = [
{
  id: 'pagerank',
  title: 'PageRank: random surfer, damping/teleportation, power iteration',
  priority: 23,
  tier: 'likely',
  freq: '1/9 papers directly (10 marks) plus link analysis in 2025-26',
  marks: '8-10 marks',
  summary: '**PageRank of a page = probability that a random surfer is on it: PR(W) = T/N + (1-T) Σ PR(W_i)/O(W_i) over pages W_i linking to W; teleportation T (about 0.15) fixes dangling pages and rank sinks; computed by power iteration.**',
  mnemonic: 'Rank flows along links, split by out-degree; jump with probability T',
  source: ['CT4100_Notes_08_Web_Search'],
  sections: [
    { heading: 'Idea', items: [
      'Link analysis: **a link to page p is a positive recommendation** of p (citation analysis analogy: impact factor = citations in current year to articles of previous two years / number of articles). PageRank uses the link structure to compute a **query-independent** importance score.',
      '**Random surfer (Markov chain):** states = pages; at each step the surfer follows a random outlink (probability 1/O(page)); with probability T gets bored and **teleports** to a random page (uniform over N pages). PageRank = long-run probability of being on the page. Rank is distributed along outgoing links equally.',
      '**Problems solved:** **dangling pages** (no outlinks; cannot pass rank) - assume links to all pages with equal probability; **rank sinks** (loops accumulating rank without distributing it) - teleportation provides an exit.'
    ] },
    { heading: 'Formula and algorithm', items: [
      { type: 'formula', label: 'PageRank', text: 'PR(W) = T/N + (1 - T) × [ PR(W_1)/O(W_1) + PR(W_2)/O(W_2) + ... + PR(W_n)/O(W_n) ]. W_i = pages linking to W; O(W_i) = number of outlinks of W_i; T = teleportation probability (damping factor d = 1 - T, typically 0.85); N = number of pages.' },
      '**Power iteration:** 1. PR(W) = 1/N for all pages. 2. Repeat: compute new PR for every page from the previous values using the formula. 3. Stop when changes < ε. Values always sum to 1. Early Google experiments: convergence in 52 iterations on 322 million links; iterations needed grows about O(log n) in the number of links, so it is efficient. (Matrix form: PR is the principal eigenvector of the Google matrix.)'
    ] },
    { heading: 'Worked example (from the notes)', items: [
{"type":"task","show":1,"q":["Starting every page at 0.25, work out the PageRank scores for a few iterations."]},
      'Four pages: A links to B and C; B links to C; C links to A; D links to C. T = 0.15, N = 4, so T/N = 0.0375 and damping 0.85.',
      { type: 'diagram', kind: 'graph', data: { title: 'Link graph', directed: true, r: 22, height: 300, nodes: [ { id: 'A', label: 'A', x: 20, y: 25 }, { id: 'B', label: 'B', x: 80, y: 25 }, { id: 'C', label: 'C', x: 80, y: 75 }, { id: 'D', label: 'D', x: 20, y: 75 } ], edges: [ { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'C' }, { from: 'C', to: 'A', curve: 30 }, { from: 'D', to: 'C' } ] }, caption: 'A to B, A to C, B to C, C to A, D to C. D has no in-links; C passes all its rank to A.' },
      'Iteration 1: A = 0.0375 + 0.85(PR(C)/1) = 0.0375 + 0.85(0.25) = 0.250; B = 0.0375 + 0.85(PR(A)/2) = 0.0375 + 0.85(0.125) = 0.144; C = 0.0375 + 0.85(PR(A)/2 + PR(B)/1 + PR(D)/1) = 0.0375 + 0.85(0.125 + 0.25 + 0.25) = 0.569; D = 0.0375 (no in-links).',
      { type: 'table', head: ['Iteration', 'A', 'B', 'C', 'D'], rows: [['0', '0.250', '0.250', '0.250', '0.250'], ['1', '0.250', '0.144', '0.569', '0.038'], ['2', '0.521', '0.144', '0.298', '0.038'], ['3', '0.291', '0.259', '0.413', '0.038'], ['converged', '0.373', '0.196', '0.394', '0.038']] },
      'Observations: D (no in-links) only gets teleportation; A has a single in-link yet ranks about as high as C because C passes ALL its rank to A; scores sum to 1; more in-links from important pages = higher rank.'
    ] },
    { heading: 'Variants, uses and limitations (2023-24: discuss limitations)', items: [
      '**Using it in search:** combine with content score, e.g. R(p,q) = λ BM25(p,q) + (1-λ) PR(p); or as a feature in learning to rank. It is computed offline for the whole web.',
      '**Personalised PageRank:** teleport to a user-specific seed set instead of any page (bias to user interests). **TrustRank:** personalised PageRank from a hand-checked seed of good pages to demote spam. **Content/semantically biased PageRank:** distribute rank in proportion to the similarity between link context and target. **Temporal link analysis:** freshness/rate of change annotations on nodes and edges.',
      '**Limitations:** query-independent (a highly ranked page may be irrelevant to the query; needs combining with content); favours old, established pages (new pages have no in-links: rich get richer); all links treated equally (navigational, advertising and spam links) and rank split equally regardless of link meaning; **link farms and link spam** can inflate rank (still gameable, though harder than for HITS); topic-insensitive (general popularity); expensive to compute and update for billions of pages; ignores time; vulnerable to dangling/sink structure (solved only by teleportation parameter); the value of T is a heuristic; ranks are probabilities that become tiny and hard to distinguish for most pages.',
      'Citation analysis background: **co-citation** (A and B cited together by a paper; strength = number of co-citing papers) and **bibliographic coupling** (A and B cite the same papers; Kessler 1963).'
    ] }
  ],
  pitfalls: [
    'Dividing by the number of INlinks instead of the OUTlinks of the linking page.',
    'Leaving out the T/N teleportation term, or using T where (1 - T) is needed.',
    'Not mentioning dangling pages and rank sinks and how teleportation fixes them.',
    'Presenting PageRank as query dependent (it is not; HITS is).'
  ]
},
{
  id: 'hits',
  title: 'HITS: hubs and authorities, and comparison with PageRank',
  priority: 24,
  tier: 'likely',
  freq: '1/9 papers directly (10 marks 2025-26)',
  marks: '10 marks',
  summary: '**HITS computes, for the base set of a query, an authority score (pointed to by good hubs) and a hub score (points to good authorities) by mutual reinforcement: a = M^T h, h = M a, normalised each round.**',
  mnemonic: 'Good hubs point to good authorities; good authorities are pointed to by good hubs',
  source: ['CT4100_Notes_08_Web_Search'],
  sections: [
    { heading: 'Concepts (Kleinberg 1998)', items: [
      '**Authority:** a page with good content on the topic, pointed to by many good hubs. **Hub:** a page that is a good directory of links, pointing to many good authorities (resource list, link page). The two definitions are **mutually recursive**; a page can be both.',
      'Motivation: authoritative pages often do not describe themselves as such; many links are purely navigational or advertising; a query returns too many links: need the most authoritative.',
      '**Base set construction (query-dependent):** root set R = top results from a standard engine (e.g. vector space). Base set S = R plus all pages that R pages point to plus all pages that point to R pages (often limited in size). Analyse the link graph of S only.'
    ] },
    { heading: 'Algorithm', items: [
      '1. Initialise a_p = h_p = 1 for all p in S. 2. Repeat until scores stop changing: **a_p = Σ_{q → p} h_q** (sum of hub scores of pages linking to p); **h_p = Σ_{p → q} a_q** (sum of authority scores of pages p links to); **normalise** a and h (e.g. so each sums to 1 or has unit length; otherwise they grow without bound; only relative scores matter). 3. Output the pages with the highest a_p as authorities and highest h_p as hubs.',
      { type: 'formula', label: 'Matrix form', text: 'M = adjacency matrix of S (M_ij = 1 iff page i links to page j). a ← M^T h;  h ← M a, so a ∝ M^T M a and h ∝ M M^T h. Repeated multiplication (power method) converges to the principal eigenvector of M^T M (authorities) and of M M^T (hubs).' }
    ] },
    { heading: 'Worked example (from the notes)', items: [
{"type":"task","show":1,"q":["Starting every hub score at 1, find the best authority and the best hubs."]},
      'Pages A, B, C, D with links A to C, A to D, B to C, B to D, D to C.',
      { type: 'diagram', kind: 'graph', data: { title: 'Base set link graph', directed: true, r: 22, height: 300, nodes: [ { id: 'A', label: 'A', x: 15, y: 20 }, { id: 'B', label: 'B', x: 15, y: 80 }, { id: 'D', label: 'D', x: 55, y: 50 }, { id: 'C', label: 'C', x: 90, y: 50 } ], edges: [ { from: 'A', to: 'C' }, { from: 'A', to: 'D' }, { from: 'B', to: 'C' }, { from: 'B', to: 'D' }, { from: 'D', to: 'C' } ] }, caption: 'A and B are hubs, C is the main authority, D is both.' },
      'Iteration 1 (h = 1 for all): authority a = M^T h = (A 0, B 0, C 3 (from A, B, D), D 2 (from A, B)); hub h = M a = (A: a_C + a_D = 5, B: 5, C: 0, D: a_C = 3). Normalise (each sums to 1): a = (0, 0, 0.60, 0.40); h = (0.385, 0.385, 0, 0.231).',
      'Iteration 2: a_C = h_A + h_B + h_D = 0.385 + 0.385 + 0.231 = 1.0, a_D = h_A + h_B = 0.77: a = (0, 0, 0.565, 0.435). Converges within about 3 iterations to **a = (0, 0, 0.56, 0.44), h = (0.39, 0.39, 0, 0.22)**.',
      'Result: **C is the best authority; A and B are the best hubs; D is both** (a decent authority and a modest hub); C has no outlinks so hub 0; A, B have no inlinks so authority 0.'
    ] },
    { heading: 'HITS vs PageRank (2025-26 P1 Q3b)', items: [
      { type: 'table', head: ['', 'HITS', 'PageRank'], rows: [
        ['Scores', 'Two per page: hub and authority', 'One per page: importance'],
        ['Query dependence', 'Query-dependent: computed on the base set for each query at query time', 'Query-independent: computed offline for the whole web'],
        ['Graph', 'Small subgraph (base set)', 'Entire web graph'],
        ['Model', 'Mutual reinforcement of hubs and authorities (eigenvectors of M^T M, M M^T)', 'Random surfer Markov chain with teleportation (principal eigenvector of the Google matrix)'],
        ['Teleportation/damping', 'None', 'Teleportation T handles dangling pages and sinks'],
        ['Cost', 'Query time cost (but small graph)', 'Heavy offline cost, cheap at query time'],
        ['Spam robustness', 'Weak: anyone can create hubs by adding outlinks; small base set; tightly knit communities dominate; unstable', 'Better: outlinks do not help; global graph dilutes small farms; teleportation limits sinks; still gameable by link farms'],
        ['Problems', 'Topic drift (hubs with mixed topics), narrow topics, tightly-knit communities, instability', 'Query-independent, favours old pages, link spam, uniform link weights'],
        ['Application', 'Topic distillation, finding resource lists (hubs) and best sources (authorities)', 'General ranking signal for web search']
      ] },
      '**Limitations of link-only approaches (notes):** narrow topics may have few exact references and hubs link to more general pages; potential drift from the main topic (hub with a range of topics); all links treated as equally important; timeliness hard to identify; sensitivity to malicious attack; edges with wrong semantics.'
    ] }
  ],
  pitfalls: [
    'Computing authority from out-links (it uses IN-links: authority = sum of hub scores of pages pointing to it).',
    'Forgetting to normalise each iteration.',
    'Not saying the base set is built per query (HITS is query-dependent).',
    'Giving only similarities between HITS and PageRank: the question asks how they DIFFER.'
  ]
},
{
  id: 'web-search',
  title: 'Web search vs traditional IR: crawling, ranking signals, spam, near-duplicates',
  priority: 25,
  tier: 'likely',
  freq: '1/9 papers directly (10 marks 2025-26 P2)',
  marks: '10 marks',
  summary: '**The web is huge, distributed, volatile, redundant, adversarial, link-structured and queried by short ill-defined queries; each characteristic motivates a design decision (distributed crawl/index, freshness crawling, dedup, link analysis, spam defences, query assistance).**',
  mnemonic: 'Big, Dynamic, Duplicated, Dirty (spam), Linked, Short queries',
  source: ['CT4100_Notes_08_Web_Search'],
  sections: [
    { heading: 'Web vs classical IR', items: [
      '**Classical IR:** relatively static collection, goal = retrieve documents with relevant content; classic relevance ignores context and the individual. **Web:** static plus dynamic content; goal = high-quality results relevant to the current need; need types **informational, navigational, transactional**.',
      '**Newer problems:** distributed data; volatile data; large volume (scaling); redundancy (30-40% near-duplicates); quality (hundreds of millions of spam pages); diversity (languages, encodings, formats); complex graph topology.',
      '**Web users:** short, imprecise, low-effort queries with poor syntax; wide variance in needs and knowledge; attention concentrated on the top few results; reformulate instead of paging; mobile, voice, autocomplete, sessions, zero-click answers.'
    ] },
    { heading: 'Three (or more) characteristics and the design decisions they motivate (2025-26 P2 Q2a, 10 marks)', items: [
      { type: 'table', head: ['Characteristic', 'Why different from traditional', 'Design decision'], rows: [
        ['Scale and distribution', 'Billions of pages on millions of servers; no central collection', 'Distributed crawler (spider) with URL frontier; sharded, replicated inverted index; caching; dynamic pruning and top-k early termination; compressed postings'],
        ['Volatility / freshness', 'Pages change, appear and disappear at different rates', 'Re-crawl policy by change rate (news hourly, static rarely); incremental/real-time indexing; tiered indexes; freshness as a ranking signal; temporal link analysis'],
        ['Link structure', 'Hyperlinks are implicit human recommendations', 'Link analysis (PageRank, HITS), anchor text indexing, link-based crawling priority, co-citation measures'],
        ['Spam and adversarial authors', 'Authors try to manipulate rankings (SEO, link farms, keyword stuffing, cloaking)', 'Spam classifiers (content + link features), TrustRank, link attributes that stop passing rank, combine many signals (hard to game all), manual penalties'],
        ['Redundancy / near-duplicates', '30-40% of pages are copies or near copies', 'Shingling + Jaccard, MinHash/fingerprints for dedupe at crawl and index time; canonical URLs; diversified results'],
        ['Short, ill-defined queries; top-heavy behaviour', 'Few terms; ambiguous (jaguar); users view top results only', 'Optimise precision at 5-10, query suggestion and autocomplete, spelling correction, query expansion, personalisation, diversification, snippets, answer boxes'],
        ['Heterogeneity and quality variation', 'Many languages, formats, quality levels', 'Language detection, parsers per format, quality and authority signals, learning to rank combining hundreds of features'],
        ['Evaluation difficulty', 'No complete judgements, recall unmeasurable', 'Prec@5/10, click data with bias correction, A/B testing, interleaving']
      ] }
    ] },
    { heading: 'Anatomy and generations', items: [
      '**Spider/crawler** (recursively follows links to build the corpus), **indexer** (fully inverted index; stemming, phrases), **query processor** (reformulation, Boolean operators, matching and ranking). Crawling concerns: **politeness** (robots.txt, rate limit per host), **prioritisation** (unbounded web: fetch important pages first), **freshness**, **traps and duplicates** (infinite URL spaces).',
      '**1st generation (1995-97, Lycos, Excite):** on-page information only (tf in document/title, idf-like factors, query logs), extended Boolean (AND, OR, NEAR, field operators). **2nd generation (Google):** link analysis and click-through data (PageRank; Clever/HITS; WebQuery). **3rd generation:** semantic analysis of the query, context (spatial, query stream, personal profile), helping the user (spelling, query refinement and suggestion, visualisation).',
      '**Ranking signals:** content (BM25 and variants), structural (anchor text, titles, URL), usage (clicks, dwell time), link-based. Combine: simple linear R = λ BM25 + (1-λ) PR, or **learning to rank**.',
      'Search today: answer boxes and featured snippets, knowledge panels, rich results, AI summaries citing sources; zero-click raises questions for publishers and for evaluation.'
    ] },
    { heading: 'Near-duplicate detection and personalisation', items: [
      '**Shingling:** represent a document by its set of k-word shingles; Jaccard J(A,B) = |A ∩ B| / |A ∪ B|. d1 "the cat sat on the mat" and d2 "the cat sat on a mat" with k = 3: shingle sets {the cat sat, cat sat on, sat on the, on the mat} and {the cat sat, cat sat on, sat on a, on a mat}; intersection 2, union 6, J = **2/6 = 0.33**.',
      '**MinHash:** comparing all shingle-set pairs is too expensive; for a random hash function h, Pr[min h(A) = min h(B)] = J(A,B); keep a short signature of minima and compare signatures.',
      '**Personalisation:** uses location, language, history, session, device, time; resolves ambiguity (jaguar), local results; re-rank with a user profile or personalised PageRank. **Costs:** filter bubbles, privacy, fairness/transparency, evaluation (no single correct ranking).',
      '**Spam defences compared:** link spam (link farms) vs content spam (keyword stuffing, cloaking, generated text); defences: TrustRank, nofollow attributes, classifiers.'
    ] }
  ],
  pitfalls: [
    'Listing characteristics without the design decision each motivates (the question asks for both).',
    'Calling the web "static" or forgetting adversarial content (spam).',
    'Describing PageRank only: web search combines many signals.'
  ]
}
];
