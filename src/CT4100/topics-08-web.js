module.exports = [
  {
    "id": "pagerank",
    "title": "PageRank: random surfer, damping/teleportation, power iteration",
    "priority": 23,
    "tier": "likely",
    "freq": "1/9 papers directly (10 marks) plus link analysis in 2025-26",
    "marks": "8-10 marks",
    "summary": "**PageRank of a page = probability that a random surfer is on it: PR(W) = T/N + (1-T) Σ PR(W_i)/O(W_i) over pages W_i linking to W; teleportation T (about 0.15) fixes dangling pages and rank sinks; computed by power iteration.**",
    "mnemonic": "Rank flows along links, split by out-degree; jump with probability T",
    "source": [
      "CT4100_Notes_08_Web_Search"
    ],
    "sections": [
      {
        "heading": "The idea of PageRank",
        "items": [
          "A link to a page is like a **recommendation**. PageRank gives each page an importance score from the links alone, **independent of any query**.",
          {
            "type": "p",
            "text": "The random surfer"
          },
          "Imagine someone clicking links at random. Sometimes they get bored and jump to any page (**teleporting**, with probability T). A page's PageRank is the share of time the surfer spends there. Each page splits its score equally among the pages it links to.",
          {
            "type": "p",
            "text": "Two problems teleporting solves"
          },
          "**Dangling page**: no links out, so the surfer is stuck (treat it as linking to every page).",
          "**Rank sink**: a loop of pages that collects score and never passes it on."
        ]
      },
      {
        "heading": "Formula and algorithm",
        "items": [
          {
            "type": "formula",
            "label": "PageRank",
            "text": "PR(W) = T/N + (1 - T) × [ PR(W_1)/O(W_1) + PR(W_2)/O(W_2) + ... + PR(W_n)/O(W_n) ]. W_i = pages linking to W; O(W_i) = number of outlinks of W_i; T = teleportation probability (damping factor d = 1 - T, typically 0.85); N = number of pages."
          },
          "**How to compute it** (power iteration): **1.** give every page 1/N. **2.** Recompute every page from the previous values using the formula. **3.** Repeat until the values stop changing. The total stays 1.",
          "It settles quickly: 52 rounds on 322 million links in early Google tests."
        ]
      },
      {
        "heading": "Worked example (from the notes)",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Starting every page at 0.25, work out the PageRank scores for a few iterations."
            ]
          },
          "Four pages: A links to B and C; B links to C; C links to A; D links to C. T = 0.15, N = 4, so T/N = 0.0375 and damping 0.85.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Link graph",
              "directed": true,
              "r": 22,
              "height": 300,
              "nodes": [
                {
                  "id": "A",
                  "label": "A",
                  "x": 20,
                  "y": 25
                },
                {
                  "id": "B",
                  "label": "B",
                  "x": 80,
                  "y": 25
                },
                {
                  "id": "C",
                  "label": "C",
                  "x": 80,
                  "y": 75
                },
                {
                  "id": "D",
                  "label": "D",
                  "x": 20,
                  "y": 75
                }
              ],
              "edges": [
                {
                  "from": "A",
                  "to": "B"
                },
                {
                  "from": "A",
                  "to": "C"
                },
                {
                  "from": "B",
                  "to": "C"
                },
                {
                  "from": "C",
                  "to": "A",
                  "curve": 30
                },
                {
                  "from": "D",
                  "to": "C"
                }
              ]
            },
            "caption": "A to B, A to C, B to C, C to A, D to C. D has no in-links; C passes all its rank to A."
          },
          "Iteration 1: A = 0.0375 + 0.85(PR(C)/1) = 0.0375 + 0.85(0.25) = 0.250; B = 0.0375 + 0.85(PR(A)/2) = 0.0375 + 0.85(0.125) = 0.144; C = 0.0375 + 0.85(PR(A)/2 + PR(B)/1 + PR(D)/1) = 0.0375 + 0.85(0.125 + 0.25 + 0.25) = 0.569; D = 0.0375 (no in-links).",
          {
            "type": "table",
            "head": [
              "Iteration",
              "A",
              "B",
              "C",
              "D"
            ],
            "rows": [
              [
                "0",
                "0.250",
                "0.250",
                "0.250",
                "0.250"
              ],
              [
                "1",
                "0.250",
                "0.144",
                "0.569",
                "0.038"
              ],
              [
                "2",
                "0.521",
                "0.144",
                "0.298",
                "0.038"
              ],
              [
                "3",
                "0.291",
                "0.259",
                "0.413",
                "0.038"
              ],
              [
                "converged",
                "0.373",
                "0.196",
                "0.394",
                "0.038"
              ]
            ]
          },
          "Observations: D (no in-links) only gets teleportation; A has a single in-link yet ranks about as high as C because C passes ALL its rank to A; scores sum to 1; more in-links from important pages = higher rank."
        ]
      },
      {
        "heading": "Using PageRank, variants and limits",
        "items": [
          "**In search**: mix it with a text match score, such as λ × BM25 + (1-λ) × PageRank, or use it as a learning-to-rank feature. It is computed in advance.",
          {
            "type": "p",
            "text": "Variants"
          },
          "**Personalised**: teleport only to pages this user likes. **TrustRank**: teleport only to hand-checked good pages, to push spam down. **Content-biased**: give more score through links whose topic matches. **Temporal**: take link age and change into account.",
          {
            "type": "p",
            "text": "Limits"
          },
          "**1.** Ignores the query, so a high-ranked page may be irrelevant.",
          "**2.** Favours old pages; new ones have no links yet.",
          "**3.** Treats every link the same, including adverts and spam.",
          "**4.** Can be gamed with **link farms** (many pages built to link to one).",
          "**5.** Costly to compute for billions of pages, and ignores time.",
          {
            "type": "p",
            "text": "Related ideas from citation analysis"
          },
          "**Co-citation**: two works are cited together. **Bibliographic coupling**: two works cite the same sources."
        ]
      }
    ],
    "pitfalls": [
      "Dividing by the number of INlinks instead of the OUTlinks of the linking page.",
      "Leaving out the T/N teleportation term, or using T where (1 - T) is needed.",
      "Not mentioning dangling pages and rank sinks and how teleportation fixes them.",
      "Presenting PageRank as query dependent (it is not; HITS is)."
    ]
  },
  {
    "id": "hits",
    "title": "HITS: hubs and authorities, and comparison with PageRank",
    "priority": 24,
    "tier": "likely",
    "freq": "1/9 papers directly (10 marks 2025-26)",
    "marks": "10 marks",
    "summary": "**HITS computes, for the base set of a query, an authority score (pointed to by good hubs) and a hub score (points to good authorities) by mutual reinforcement: a = M^T h, h = M a, normalised each round.**",
    "mnemonic": "Good hubs point to good authorities; good authorities are pointed to by good hubs",
    "source": [
      "CT4100_Notes_08_Web_Search"
    ],
    "sections": [
      {
        "heading": "Concepts (Kleinberg 1998)",
        "items": [
          "**Authority:** a page with good content on the topic, pointed to by many good hubs. **Hub:** a page that is a good directory of links, pointing to many good authorities (resource list, link page). The two definitions are **mutually recursive**; a page can be both.",
          "Motivation: authoritative pages often do not describe themselves as such; many links are purely navigational or advertising; a query returns too many links: need the most authoritative.",
          "**Which pages are analysed**: take the top results of a normal search (the **root set**), then add the pages they link to and the pages linking to them (the **base set**). So HITS depends on the query."
        ]
      },
      {
        "heading": "Algorithm",
        "items": [
          "1. Initialise a_p = h_p = 1 for all p in S. 2. Repeat until scores stop changing: **a_p = Σ_{q → p} h_q** (sum of hub scores of pages linking to p); **h_p = Σ_{p → q} a_q** (sum of authority scores of pages p links to); **normalise** a and h (e.g. so each sums to 1 or has unit length; otherwise they grow without bound; only relative scores matter). 3. Output the pages with the highest a_p as authorities and highest h_p as hubs.",
          {
            "type": "formula",
            "label": "Matrix form",
            "text": "M = adjacency matrix of S (M_ij = 1 iff page i links to page j). a ← M^T h;  h ← M a, so a ∝ M^T M a and h ∝ M M^T h. Repeated multiplication (power method) converges to the principal eigenvector of M^T M (authorities) and of M M^T (hubs)."
          }
        ]
      },
      {
        "heading": "Worked example (from the notes)",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Starting every hub score at 1, find the best authority and the best hubs."
            ]
          },
          "Pages A, B, C, D with links A to C, A to D, B to C, B to D, D to C.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Base set link graph",
              "directed": true,
              "r": 22,
              "height": 300,
              "nodes": [
                {
                  "id": "A",
                  "label": "A",
                  "x": 15,
                  "y": 20
                },
                {
                  "id": "B",
                  "label": "B",
                  "x": 15,
                  "y": 80
                },
                {
                  "id": "D",
                  "label": "D",
                  "x": 55,
                  "y": 50
                },
                {
                  "id": "C",
                  "label": "C",
                  "x": 90,
                  "y": 50
                }
              ],
              "edges": [
                {
                  "from": "A",
                  "to": "C"
                },
                {
                  "from": "A",
                  "to": "D"
                },
                {
                  "from": "B",
                  "to": "C"
                },
                {
                  "from": "B",
                  "to": "D"
                },
                {
                  "from": "D",
                  "to": "C"
                }
              ]
            },
            "caption": "A and B are hubs, C is the main authority, D is both."
          },
          "Iteration 1 (h = 1 for all): authority a = M^T h = (A 0, B 0, C 3 (from A, B, D), D 2 (from A, B)); hub h = M a = (A: a_C + a_D = 5, B: 5, C: 0, D: a_C = 3). Normalise (each sums to 1): a = (0, 0, 0.60, 0.40); h = (0.385, 0.385, 0, 0.231).",
          "Iteration 2: a_C = h_A + h_B + h_D = 0.385 + 0.385 + 0.231 = 1.0, a_D = h_A + h_B = 0.77: a = (0, 0, 0.565, 0.435). Converges within about 3 iterations to **a = (0, 0, 0.56, 0.44), h = (0.39, 0.39, 0, 0.22)**.",
          "Result: **C is the best authority; A and B are the best hubs; D is both** (a decent authority and a modest hub); C has no outlinks so hub 0; A, B have no inlinks so authority 0."
        ]
      },
      {
        "heading": "HITS vs PageRank (2025-26 P1 Q3b)",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "HITS",
              "PageRank"
            ],
            "rows": [
              [
                "Scores",
                "Two per page: hub and authority",
                "One per page: importance"
              ],
              [
                "Query dependence",
                "Query-dependent: computed on the base set for each query at query time",
                "Query-independent: computed offline for the whole web"
              ],
              [
                "Graph",
                "Small subgraph (base set)",
                "Entire web graph"
              ],
              [
                "Model",
                "Mutual reinforcement of hubs and authorities (eigenvectors of M^T M, M M^T)",
                "Random surfer Markov chain with teleportation (principal eigenvector of the Google matrix)"
              ],
              [
                "Teleportation/damping",
                "None",
                "Teleportation T handles dangling pages and sinks"
              ],
              [
                "Cost",
                "Query time cost (but small graph)",
                "Heavy offline cost, cheap at query time"
              ],
              [
                "Spam robustness",
                "Weak: anyone can create hubs by adding outlinks; small base set; tightly knit communities dominate; unstable",
                "Better: outlinks do not help; global graph dilutes small farms; teleportation limits sinks; still gameable by link farms"
              ],
              [
                "Problems",
                "Topic drift (hubs with mixed topics), narrow topics, tightly-knit communities, instability",
                "Query-independent, favours old pages, link spam, uniform link weights"
              ],
              [
                "Application",
                "Topic distillation, finding resource lists (hubs) and best sources (authorities)",
                "General ranking signal for web search"
              ]
            ]
          },
          "**Limitations of link-only approaches (notes):** narrow topics may have few exact references and hubs link to more general pages; potential drift from the main topic (hub with a range of topics); all links treated as equally important; timeliness hard to identify; sensitivity to malicious attack; edges with wrong semantics."
        ]
      }
    ],
    "pitfalls": [
      "Computing authority from out-links (it uses IN-links: authority = sum of hub scores of pages pointing to it).",
      "Forgetting to normalise each iteration.",
      "Not saying the base set is built per query (HITS is query-dependent).",
      "Giving only similarities between HITS and PageRank: the question asks how they DIFFER."
    ]
  },
  {
    "id": "web-search",
    "title": "Web search vs traditional IR: crawling, ranking signals, spam, near-duplicates",
    "priority": 25,
    "tier": "likely",
    "freq": "1/9 papers directly (10 marks 2025-26 P2)",
    "marks": "10 marks",
    "summary": "**The web is huge, distributed, volatile, redundant, adversarial, link-structured and queried by short ill-defined queries; each characteristic motivates a design decision (distributed crawl/index, freshness crawling, dedup, link analysis, spam defences, query assistance).**",
    "mnemonic": "Big, Dynamic, Duplicated, Dirty (spam), Linked, Short queries",
    "source": [
      "CT4100_Notes_08_Web_Search"
    ],
    "sections": [
      {
        "heading": "How web search differs from classic search",
        "items": [
          "**Classic search**: a fairly fixed collection; the goal is documents with relevant content.",
          "**Web search**: constantly changing pages; the goal is high-quality results for this need. Needs are **informational** (learn something), **navigational** (reach a site) or **transactional** (do something, such as buy).",
          {
            "type": "p",
            "text": "New problems"
          },
          "Data spread over many machines, changing constantly, huge, 30-40% near-copies, full of spam, many languages and formats, connected by links.",
          {
            "type": "p",
            "text": "Web users"
          },
          "Short, vague queries, attention on the first few results, rephrasing rather than reading page two, often mobile or voice, and often getting the answer without clicking."
        ]
      },
      {
        "heading": "Web characteristics and the design choices they force",
        "items": [
          {
            "type": "table",
            "head": [
              "Characteristic",
              "Design choice"
            ],
            "rows": [
              [
                "Huge and spread out",
                "A distributed **crawler** (program that fetches pages); an index split and copied across machines; caching"
              ],
              [
                "Always changing",
                "Revisit fast-changing pages more often; update the index continuously"
              ],
              [
                "Pages link to each other",
                "Use link analysis (PageRank, HITS) and the text of links"
              ],
              [
                "Spam",
                "Spam detectors, TrustRank, combining many signals"
              ],
              [
                "Many near-copies",
                "Detect and remove duplicates"
              ],
              [
                "Short, vague queries",
                "Focus on the top 5-10, suggest and correct queries, vary results"
              ],
              [
                "Many languages and quality levels",
                "Detect language, use quality signals"
              ],
              [
                "Impossible to judge everything",
                "Measure precision at 5 or 10, clicks and A/B tests"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Parts of a search engine, and its generations",
        "items": [
          "**Crawler (spider)**: follows links to collect pages. **Indexer**: builds the inverted index. **Query processor**: rewrites the query, matches and ranks.",
          "Crawlers must be polite (obey robots.txt, a site's rules file, and not flood it), fetch important pages first, stay fresh and avoid endless or duplicate pages.",
          {
            "type": "p",
            "text": "Generations"
          },
          "**1st** (mid-1990s): used only the words on the page.",
          "**2nd** (Google): added link analysis and clicks.",
          "**3rd**: tries to understand the query and context (place, history), and helps with spelling and suggestions.",
          "**Ranking signals**: content (BM25), structure (titles, link text, address), usage (clicks, time) and links, combined by a weighted sum or learning to rank.",
          "Today results also include direct answers and AI summaries, so many searches end without a click."
        ]
      },
      {
        "heading": "Near-duplicates, personalisation and spam",
        "items": [
          {
            "type": "p",
            "text": "Shingling: spot near-copies"
          },
          "Break a document into overlapping runs of k words (**shingles**), then compare two sets with **Jaccard**: shared / all different.",
          "\"the cat sat on the mat\" and \"the cat sat on a mat\", k = 3: 2 shared out of 6, so **0.33**.",
          "**MinHash** is a shortcut: keep a short fingerprint of each document so that matching fingerprints estimate the Jaccard value.",
          {
            "type": "p",
            "text": "Personalisation"
          },
          "Uses location, language, history, device and time to settle ambiguity. Costs: filter bubbles, privacy, fairness and harder testing.",
          {
            "type": "p",
            "text": "Spam"
          },
          "**Link spam** (link farms) and **content spam** (stuffing keywords, showing crawlers a different page, generated text). Defences: TrustRank, links marked not to pass rank (nofollow), spam classifiers."
        ]
      }
    ],
    "pitfalls": [
      "Listing characteristics without the design decision each motivates (the question asks for both).",
      "Calling the web \"static\" or forgetting adversarial content (spam).",
      "Describing PageRank only: web search combines many signals."
    ]
  }
];
