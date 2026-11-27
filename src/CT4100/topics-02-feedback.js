module.exports = [
  {
    "id": "rocchio-relevance-feedback",
    "title": "Relevance feedback and the Rocchio algorithm",
    "priority": 4,
    "tier": "core",
    "freq": "8/9 papers",
    "marks": "5-10 marks",
    "summary": "**The user marks results as relevant or not. Rocchio then moves the query towards the relevant documents and away from the others.**",
    "mnemonic": "Rocchio: Keep, Pull, Push (α keep original, β pull to relevant, γ push from non-relevant)",
    "source": [
      "CT4100_Notes_06_Relevance_Feedback"
    ],
    "sections": [
      {
        "heading": "Why relevance feedback",
        "items": [
          "Your first query may not say what you really need.",
          "It is easier to **recognise** a good document than to write a better query.",
          "**The cycle**: search, user judges some results, system changes the query, search again.",
          "The system changes weights on existing words and adds new words.",
          "**Example**: you search \"jaguar speed\" and mark the animal pages. Words like predator and wildlife gain weight. Car words lose it.",
          {
            "type": "p",
            "text": "Kinds of feedback"
          },
          "**Explicit**: the user rates results. Accurate, but people often will not bother.",
          "**Implicit**: clicks, time spent reading, saving. Plentiful but noisy.",
          "**Pseudo (blind)**: the system just assumes the top results are relevant.",
          "**Key assumption**: relevant documents use similar words, so they sit close together."
        ]
      },
      {
        "heading": "Notation and the ideal query",
        "items": [
          "Think of each document and query as a point in space (a **vector** of word weights).",
          "**C_R**: all relevant documents. We never really know this.",
          "**D_R**: results the user marked relevant. **D_N**: results marked not relevant.",
          "**N**: number of documents in the collection.",
          "The perfect query would be: centre of the relevant ones, minus centre of the rest. (A **centroid** is the average point.)",
          {
            "type": "formula",
            "label": "Ideal query vector (needs complete relevance knowledge)",
            "text": "q_ideal = (1/|C_R|) Σ_{d in C_R} d  -  (1/(N - |C_R|)) Σ_{d not in C_R} d  (difference of centroids)"
          },
          "We cannot compute it, so Rocchio estimates it from the judged documents only."
        ]
      },
      {
        "heading": "Rocchio formula",
        "items": [
          {
            "type": "formula",
            "label": "Rocchio",
            "text": "q_new = α q_orig + β (1/|D_R|) Σ_{d in D_R} d  -  γ (1/|D_N|) Σ_{d in D_N} d"
          },
          "**α**: how much to keep the original query.",
          "**β**: how hard to pull towards relevant documents.",
          "**γ**: how hard to push away from non-relevant ones.",
          "Typical values: α = 1, β = 0.75, γ = 0.25 (or 0).",
          "β is bigger than γ because positive feedback is more reliable.",
          "Any negative weights are set to **0** at the end.",
          "The new query usually contains many more words than before.",
          {
            "type": "p",
            "text": "Variants (Ide)"
          },
          "**Ide regular**: q_new = q_old + Σ_{D_R} d - Σ_{D_N} d (adds and subtracts, no averaging).",
          "**Ide dec-hi**: subtract only the top-ranked non-relevant document: q_new = q_old + Σ_{D_R} d - MAXNR(d)."
        ]
      },
      {
        "heading": "Worked example (from the notes)",
        "items": [
          {
            "type": "table",
            "head": [
              "Vector",
              "information",
              "retrieval",
              "indexing",
              "database"
            ],
            "rows": [
              [
                "original query q",
                "1",
                "1",
                "0",
                "0"
              ],
              [
                "relevant d1",
                "1",
                "2",
                "2",
                "0"
              ],
              [
                "relevant d2",
                "1",
                "1",
                "2",
                "0"
              ],
              [
                "non-relevant d3",
                "0",
                "0",
                "0",
                "2"
              ],
              [
                "Rocchio q_new (α=1, β=0.75, γ=0.25)",
                "1.75",
                "2.125",
                "1.5",
                "-0.5 -> 0"
              ]
            ]
          },
          "Average of the two relevant documents: ((1,2,2,0) + (1,1,2,0)) / 2 = (1, 1.5, 2, 0).",
          "q_new = (1,1,0,0) + 0.75 × (1, 1.5, 2, 0) - 0.25 × (0,0,0,2).",
          "That gives (1.75, 2.125, 1.5, -0.5).",
          "Set the negative to zero: **(1.75, 2.125, 1.5, 0)**.",
          "So \"indexing\" has been added and \"database\" stays out.",
          {
            "type": "diagram",
            "kind": "scatter",
            "data": {
              "title": "Rocchio in the (information, retrieval) plane",
              "xLabel": "weight of information",
              "yLabel": "weight of retrieval",
              "xMin": -0.25,
              "xMax": 2.25,
              "yMin": -0.25,
              "yMax": 2.5,
              "series": [
                {
                  "name": "original query",
                  "points": [
                    [
                      1,
                      1
                    ]
                  ]
                },
                {
                  "name": "relevant docs",
                  "points": [
                    [
                      1,
                      2
                    ],
                    [
                      1,
                      1
                    ]
                  ]
                },
                {
                  "name": "non-relevant d3",
                  "points": [
                    [
                      0,
                      0
                    ]
                  ]
                },
                {
                  "name": "new query",
                  "points": [
                    [
                      1.75,
                      2.125
                    ]
                  ]
                }
              ]
            },
            "caption": "Projection onto two terms: the query moves up and away from the non-relevant document."
          }
        ]
      },
      {
        "heading": "Graded feedback (1-5 scores) and weighted aggregation (2023-24 P2, 2025-26)",
        "items": [
          "Plain Rocchio treats every judged document equally.",
          "With ratings (say 1 to 5), let better ratings count for more.",
          "Give each document a weight f(d), such as the rating mapped to -2..+2, or rating/5.",
          "Then use **weighted** averages.",
          {
            "type": "formula",
            "label": "Graded Rocchio",
            "text": "q_new = α q_orig + β Σ_{d: f(d)>0} f(d) d / Σ f(d)  -  γ Σ_{d: f(d)<0} |f(d)| d / Σ |f(d)|"
          },
          {
            "type": "p",
            "text": "Worked example"
          },
          "Relevant d1 is rated 4 and d2 is rated 2.",
          "Weighted average: (4 d1 + 2 d2) / 6 = (1, 1.67, 2, 0).",
          "q_new = (1,1,0,0) + 0.75 (1, 1.67, 2, 0) - 0.25 (0,0,0,2) = (1.75, 2.25, 1.5, -0.5).",
          "The highly rated document now has more influence.",
          "You can also group ratings: 4-5 positive, 3 ignored, 1-2 negative.",
          "Other options: weight by rating and rank, or learn the weights."
        ]
      },
      {
        "heading": "Limitations and practical challenges of Rocchio",
        "items": [
          "Users often will not judge results, are inconsistent, and it takes time.",
          "α, β and γ must be tuned. There is no perfect setting.",
          "It assumes relevant documents form **one** group.",
          "If \"jaguar\" cars and cats are both relevant, the average lands between them and matches neither.",
          "If 4 of 5 judged documents share a subtopic, the query drifts to it and loses the others.",
          "The query gets long and slow, so limit the added words.",
          "If the first results are very bad, there is nothing to learn from.",
          "**Testing trap**: judged documents move up and inflate the score.",
          "Fix: **residual collection evaluation**. Remove judged documents, then compare old and new queries on what is left.",
          "It needs a vector-style model (other models have similar ideas)."
        ]
      },
      {
        "heading": "Effectiveness, evaluation and use beyond the vector model (lecture)",
        "items": [
          {
            "type": "p",
            "text": "The kinds of feedback and expansion"
          },
          "Explicit relevance feedback.",
          "Pseudo-relevance feedback.",
          "Collection-based expansion: **local** (from the retrieved set) or **global** (from the whole collection).",
          "Feedback can find useful words missing from the query, fix weights and rank relevant documents higher.",
          {
            "type": "p",
            "text": "When does it work?"
          },
          "It depends on how many judgements there are, how good and representative they are, the settings and the collection.",
          "Early vector-model studies showed large gains, but not every query improves.",
          {
            "type": "p",
            "text": "In other models"
          },
          "**Vector**: Rocchio and Ide change the query.",
          "**Probabilistic**: judgements update word weights.",
          "**Neural**: feedback adjusts the query representation, re-ranking or the model.",
          "**Filtering**: feedback refines a long-term interest profile.",
          "**Main challenges**: choosing good new words, avoiding drift, testing fairly, and getting feedback without annoying users."
        ]
      },
      {
        "heading": "Biased feedback samples: robust aggregation (2025-26 P2 Q1h)",
        "items": [
          "**Problem**: if 4 of 5 judged documents share a subtopic, the new query mostly finds more of it.",
          "Other aspects get missed and results are less varied.",
          {
            "type": "p",
            "text": "Fixes"
          },
          "**1.** Group the judged documents and give each group equal weight.",
          "**2.** Limit what one group or source can add, or down-weight near-copies.",
          "**3.** Use a sturdier centre (median or trimmed mean), or keep only words found in several documents.",
          "**4.** Keep α high so the original query still anchors it.",
          "**5.** Show varied results for judging in the first place (MMR).",
          "**6.** Make one query per group and merge the rankings."
        ]
      },
      {
        "heading": "Answer template: \"Discuss a feedback mechanism for the VSM\"",
        "items": [
          "**1.** Why feedback is useful.",
          "**2.** The judged sets D_R and D_N.",
          "**3.** The Rocchio formula, with α, β, γ and an example.",
          "**4.** Its effect: new weights, new words, negatives set to 0.",
          "**5.** How to test it (residual collection).",
          "**6.** Limits: effort, settings, one-group assumption, drift.",
          "**7.** Extensions: graded ratings, implicit feedback."
        ]
      }
    ],
    "pitfalls": [
      "Rocchio averages (divides by |D_R| and |D_N|). Without averaging, it is the Ide version.",
      "Set negative weights to zero at the end.",
      "β is normally bigger than γ, not the other way round.",
      "Mention that α keeps the original query in play."
    ]
  },
  {
    "id": "pseudo-relevance-feedback",
    "title": "Pseudo-relevance feedback, query drift and Rocchio comparison",
    "priority": 10,
    "tier": "core",
    "freq": "5/9 papers",
    "marks": "7-10 marks",
    "summary": "**Pseudo (blind) relevance feedback assumes the top-k results are relevant, expands the query from them automatically, and runs again: no user effort, but a wrong assumption causes query drift.**",
    "mnemonic": "PRF: Assume top-k, Expand, Re-run (and watch the Drift)",
    "source": [
      "CT4100_Notes_06_Relevance_Feedback"
    ],
    "sections": [
      {
        "heading": "How PRF works",
        "items": [
          "Also called blind relevance feedback. **No explicit judgements.**",
          "1. Run the original query. 2. Take the top **k** documents (k about 5-20) and assume they are relevant. 3. Select **expansion terms** from them: e.g. Rocchio centroid (highest-weight terms), top terms by tf-idf or by association with query terms (local analysis). 4. Add the best m terms (m about 10-30) with weights (original query terms weighted higher). 5. Re-run the expanded query and return the new ranking.",
          "**Key assumption:** the top-ranked documents contain useful information about the user's need (high precision at the top).",
          "In a vector model it is Rocchio with D_R = top-k, γ = 0 (or the bottom-ranked documents as D_N)."
        ]
      },
      {
        "heading": "Advantages and risks",
        "items": [
          "**Advantages:** fully automatic, no user burden; usually improves **recall** and average performance (MAP) by bridging vocabulary mismatch; simple to add to any ranker; works with short queries.",
          "**Risks:** if top-k are not relevant (poor initial query) it adds irrelevant terms; **query drift** moves the query away from the original intent; extra retrieval pass costs time; high variance across queries (helps some, hurts others); long expanded queries; ambiguous queries drift towards the dominant sense; does not help when no relevant documents exist.",
          "**Mitigations:** apply PRF only when the query is predicted easy (QPP); weight the original terms more (large α); restrict to few terms; weight documents by rank/score; use diverse term selection; verify with feedback from clarity scores."
        ]
      },
      {
        "heading": "Query drift (2025-26 P2 Q1g)",
        "items": [
          "**Definition:** the modified query gradually shifts away from the original information need (topic) over iterations so retrieved documents are about a related but different topic.",
          "**Most likely when:** the initial results have low precision (hard/ambiguous queries); many feedback iterations; many expansion terms or a small α; the feedback documents are broad or multi-topic; feedback sample is biased; terms from a dominant sense of an ambiguous word are added.",
          "**Detecting drift:** compare each iteration's query vector with the original by cosine similarity and flag when it falls below a threshold; measure overlap of the top-k results between the original and the current iteration (falling overlap); check that the original terms still carry enough weight; monitor clarity/score distributions; use a held-out set of judged documents or a user check; stop feedback (e.g. after 1-2 iterations) when change is large."
        ]
      },
      {
        "heading": "Rocchio (explicit) vs PRF: compare and contrast (10 marks, 2023-24)",
        "items": [
          {
            "type": "table",
            "head": [
              "Aspect",
              "Rocchio (explicit relevance feedback)",
              "Pseudo-relevance feedback"
            ],
            "rows": [
              [
                "Source of judgements",
                "User marks relevant/non-relevant documents",
                "Assume top-k relevant; no negatives (or bottom documents)"
              ],
              [
                "User effort",
                "Needs interaction and willingness",
                "None, automatic"
              ],
              [
                "Reliability of feedback",
                "High if the user is consistent",
                "Depends on initial precision; errors are amplified"
              ],
              [
                "Negative evidence",
                "Uses γ to push away from non-relevant",
                "Usually unavailable"
              ],
              [
                "Typical gain",
                "Large gains when judgements good",
                "Moderate average gain, high variance across queries"
              ],
              [
                "Risk",
                "Biased/small sample, single-cluster assumption",
                "Query drift when top-k are wrong"
              ],
              [
                "Suitable when",
                "Interactive/professional search, user willing, recall-oriented (legal, patent)",
                "Large-scale/web search with short queries, good initial precision, no interaction possible"
              ],
              [
                "Relationship",
                "Rocchio is the algorithm that updates the query vector",
                "PRF is a way of obtaining the feedback set; it can use the Rocchio update"
              ]
            ]
          },
          "Common weakness of both: the query becomes long; parameters (α, β, γ, k, number of terms) need tuning; neither fixes multi-faceted needs without diversity.",
          "Selection rule to quote: use explicit Rocchio when users can and will judge and precision at the top is uncertain; use PRF when interaction is impossible and the query is predicted easy."
        ]
      }
    ],
    "pitfalls": [
      "Treating PRF and Rocchio as alternatives: PRF supplies the relevant set; Rocchio (or local analysis) is how you use it.",
      "Not stating the assumption (top-k relevant) or not naming query drift as the main risk.",
      "Claiming PRF always improves results: it is high variance."
    ]
  },
  {
    "id": "query-expansion-analysis",
    "title": "Query expansion: local analysis, global analysis, thesaurus vs corpus-derived",
    "priority": 5,
    "tier": "core",
    "freq": "6/9 papers",
    "marks": "8-10 marks",
    "summary": "**Query expansion adds related words to your query so it finds more. The related words can come from the top results, from the whole collection, or from a thesaurus.**",
    "mnemonic": "Local = this query's results; Global = whole corpus; Thesaurus = human-built dictionary",
    "source": [
      "CT4100_Notes_06_Relevance_Feedback",
      "CT4100_Notes_08_Web_Search"
    ],
    "sections": [
      {
        "heading": "Concepts",
        "items": [
          "**Problem**: you say \"car\", the document says \"automobile\".",
          "**Fix**: add related words to the query, often with lower weights.",
          "This mainly improves **recall** (finding more of the relevant documents).",
          {
            "type": "p",
            "text": "Three places to find related words"
          },
          "**Local analysis**: the documents retrieved for this query.",
          "**Global analysis**: the whole collection, worked out in advance.",
          "**Thesaurus or ontology**: a hand-built word resource such as WordNet or MeSH."
        ]
      },
      {
        "heading": "Local analysis (2021-22: 8 marks, \"describe an approach and discuss limitations\")",
        "items": [
          "**Idea**: words that show up together in the top results are probably related.",
          {
            "type": "p",
            "text": "Steps"
          },
          "**1.** Run the query and keep the top k documents.",
          "**2.** Build a table of how strongly each pair of words goes together.",
          "**3.** For each query word, pick the words most strongly linked to it.",
          "**4.** Score the candidates and add the best few.",
          {
            "type": "p",
            "text": "Way 1: association (same documents)"
          },
          {
            "type": "formula",
            "label": "Association cluster (Jaccard over documents)",
            "text": "M(i,j) = f(i,j) / ( f(i) + f(j) - f(i,j) ), f(i) = number of local documents containing term i; f(i,j) = number containing both."
          },
          "Example: f(i) = 20, f(j) = 15, both = 10. M = 10 / (20 + 15 - 10) = **0.40**.",
          {
            "type": "p",
            "text": "Way 2: metric (close together)"
          },
          "Words nearer to each other count for more.",
          {
            "type": "formula",
            "label": "Metric cluster (proximity)",
            "text": "M(i,j) = Σ over pairs of occurrences (t_i, t_j) of 1 / dist(t_i, t_j). Closer occurrences contribute more."
          },
          {
            "type": "p",
            "text": "Way 3: scalar (similar company)"
          },
          "Two words are related if they keep the same company, even if they never appear together. This catches synonyms.",
          {
            "type": "formula",
            "label": "Scalar cluster (similar contexts)",
            "text": "v_i = (M(i,1), ..., M(i,n)); S(t_i,t_j) = (v_i · v_j) / (|v_i| |v_j|). Terms that co-occur with the same other terms are related even if they never appear together (synonyms)."
          },
          {
            "type": "table",
            "head": [
              "Method",
              "Basis",
              "Idea"
            ],
            "rows": [
              [
                "Association",
                "co-occurrence in documents",
                "terms in the same documents are related"
              ],
              [
                "Metric",
                "distance between occurrences",
                "nearby terms are more related; phrases"
              ],
              [
                "Scalar",
                "similarity of association vectors",
                "similar contexts mean related (synonyms)"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Choosing which words to add"
          },
          "Take the top few for each query word separately.",
          "Or add up each candidate's link to **all** query words, which favours words fitting the whole query.",
          "Or deliberately pick varied words (see the Diversity topic).",
          {
            "type": "p",
            "text": "Good points"
          },
          "Fits this particular query, so it can sort out ambiguity.",
          "Uses the collection's own vocabulary, including new words.",
          "Needs no outside resource.",
          {
            "type": "p",
            "text": "Weak points"
          },
          "If the first results are bad, the added words are bad (**drift**).",
          "Slow: an extra search while the user waits.",
          "Only k documents, so the statistics are shaky.",
          "Common or ambiguous words score too high.",
          "Added words may repeat each other.",
          "May not help very easy or very hard queries."
        ]
      },
      {
        "heading": "Global analysis",
        "items": [
          "Describe each word by which documents it appears in, across the whole collection.",
          "Words with similar patterns are related (measured with cosine).",
          "Turn the query into the same form: q_D = Σ_{t_i in q} w_i t_i.",
          "Add the words closest to the whole query.",
          "**Good**: done in advance, no extra search, does not depend on the first results, uses all the evidence.",
          "**Bad**: not tailored to the query (\"jaguar\" gets both car and animal words), costly to keep up to date, may add unhelpful words."
        ]
      },
      {
        "heading": "Local vs thesaurus: compare and contrast (2025-26 P1 Q3a, 10 marks)",
        "items": [
          {
            "type": "table",
            "head": [
              "Aspect",
              "Local analysis of the return set",
              "Fixed thesaurus / ontology"
            ],
            "rows": [
              [
                "Source",
                "Top-k documents for the query",
                "Manually built resource (WordNet, MeSH, domain ontology)"
              ],
              [
                "Context sensitivity",
                "High: reflects this query and this collection",
                "Low: senses are fixed and context-free (needs word sense disambiguation)"
              ],
              [
                "Vocabulary",
                "Domain and collection specific, includes new terms, slang, names",
                "Static, general; misses new terms; may not match the collection language"
              ],
              [
                "Cost",
                "Query-time cost; no construction effort",
                "High construction/maintenance effort but cheap lookup, precomputed"
              ],
              [
                "Quality of relations",
                "Association not semantics: may add co-occurring but unrelated terms",
                "Precise typed relations (synonym, broader, narrower), human-verified"
              ],
              [
                "Dependence on first retrieval",
                "Yes (drift risk)",
                "No"
              ],
              [
                "Risks",
                "Drift; noisy for hard queries",
                "Ambiguity (adds wrong senses), over-expansion, coverage gaps"
              ],
              [
                "Best for",
                "Large, dynamic, general collections",
                "Controlled-vocabulary domains (medical, legal)"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Thesaurus vs corpus-derived expansion (2025-26 P2 Q4b)",
        "items": [
          "The claim to judge: \"A hand-made thesaurus is always better, because people understand meaning and word counts only see surface patterns.\"",
          {
            "type": "p",
            "text": "Why learning from the documents can be better"
          },
          "It covers new words, names, jargon and slang that no thesaurus lists.",
          "It uses words that really appear in these documents.",
          "It is automatic, cheap to update and works in many languages.",
          "Local analysis can tell which meaning you want.",
          "It finds useful links that are not synonyms, such as \"python\" and \"pandas\".",
          "Weights can be learned from data.",
          {
            "type": "p",
            "text": "When the claim is right"
          },
          "The collection is small or specialist, with too little data for good statistics.",
          "Precision matters and there is a well-kept vocabulary (medical MeSH, legal, patents).",
          "Co-occurrence misleads: opposites appear together (hot, cold), and common words appear with everything.",
          "The system must show exact relations (broader, narrower) or work across languages.",
          "Queries are short and ambiguous, so local analysis drifts.",
          {
            "type": "p",
            "text": "Verdict"
          },
          "Neither always wins. **Combine them**: the thesaurus suggests precise relations, and collection statistics choose and weight them."
        ]
      }
    ],
    "pitfalls": [
      "Say how candidate words are scored, and give limitations.",
      "Local = at search time, top k. Global = in advance, whole collection.",
      "A thesaurus ignores context: it adds every meaning of an ambiguous word.",
      "For \"evaluate this claim\", argue both sides, then give a verdict."
    ]
  },
  {
    "id": "diversity",
    "title": "Diversity: diverse expansion terms, result diversification, measures",
    "priority": 8,
    "tier": "core",
    "freq": "8/9 papers",
    "marks": "5-9 marks",
    "summary": "**Diversity avoids redundancy: select items that are relevant AND dissimilar to those already chosen (MMR: λ·relevance - (1-λ)·max similarity to the selected set), and measure it with intra-list distance, subtopic recall or α-nDCG.**",
    "mnemonic": "MMR = Relevant but not Redundant",
    "source": [
      "CT4100_Notes_06_Relevance_Feedback",
      "CT4100_Notes_07_Collaborative_Filtering"
    ],
    "sections": [
      {
        "heading": "Why diversity",
        "items": [
          "Queries are ambiguous (jaguar) or multi-faceted; user intent is unknown. Returning many near-identical items wastes list space and risks missing the user's intent entirely.",
          "Applies to: **expansion terms** (don't add 5 near-synonyms), **search results** (cover all senses/aspects), **recommendations** (not 10 films from one franchise).",
          "There is a **trade-off**: pure relevance ranking maximises expected relevance of each item (probability ranking principle); diversification sacrifices some per-item relevance to maximise coverage of intents and reduce the risk of total failure."
        ]
      },
      {
        "heading": "Diverse candidate terms (no user feedback) - 8/9 papers",
        "items": [
          "Setting: suggest terms to the user to add to the query, from the top-k documents (pseudo-feedback) or the collection.",
          "**Algorithm (greedy, MMR style):** (1) retrieve top-k for the query; (2) build candidate terms and score each by association with the query (e.g. Σ_{t_i in q} M(i,t) with Jaccard/PMI/tf-idf); (3) pick the best-scoring term; (4) for each further pick choose the term maximising **λ × assoc(t,q) - (1-λ) × max_{s in selected} sim(t,s)** where sim is term-term similarity (scalar cluster cosine, co-occurrence, embedding cosine); (5) stop after m terms.",
          "**Alternative: cluster-then-pick:** cluster the candidate terms (e.g. k-means on their document-occurrence vectors or on word embeddings) and take the highest-scoring term from each cluster (one term per sense/aspect). Another: cluster the top documents and take terms from each cluster.",
          "Evaluation: show terms to users; measure the proportion of subtopics covered, redundancy among terms, retrieval gain when a user picks a term (MAP, S-recall), compare against the non-diverse list.",
          "Limitations: choosing λ and the number of clusters; needs a good term similarity; first retrieval may be poor; may drop highly relevant but similar terms."
        ]
      },
      {
        "heading": "MMR (Maximal Marginal Relevance)",
        "items": [
          {
            "type": "formula",
            "label": "MMR",
            "text": "next = argmax_{d in Candidates \\ S} [ λ · rel(d,q)  -  (1 - λ) · max_{d_j in S} sim(d, d_j) ]; S = items already selected; λ in [0,1] (1 = pure relevance, 0 = pure novelty)."
          },
          "Worked example, λ = 0.7: relevance d1 0.9, d2 0.85, d3 0.6, d4 0.5; sim(d1,d2)=0.95, sim(d1,d3)=0.2, sim(d1,d4)=0.1, sim(d2,d3)=0.25, sim(d2,d4)=0.15, sim(d3,d4)=0.3.",
          "Round 1: pick d1 (highest relevance). Round 2: d2 = 0.7(0.85) - 0.3(0.95) = 0.31; d3 = 0.7(0.6) - 0.3(0.2) = **0.36**; d4 = 0.7(0.5) - 0.3(0.1) = 0.32, so pick d3. Round 3: d2 = 0.595 - 0.3(max(0.95,0.25)) = 0.31; d4 = 0.35 - 0.3(max(0.1,0.3)) = 0.26, so pick d2. MMR order **d1, d3, d2, d4** versus relevance order d1, d2, d3, d4: the near-duplicate d2 is demoted."
        ]
      },
      {
        "heading": "Result diversification algorithms (2024-25 P2: describe one + trade-offs)",
        "items": [
          "**MMR** (above): greedy, similarity-based, no explicit aspects, O(k·n) comparisons.",
          "**xQuAD (explicit aspects):** estimate sub-queries/aspects of the query (from query suggestions, clusters or taxonomy); score = (1-λ) P(d|q) + λ Σ_aspects P(aspect|q) P(d|aspect) Π_{already selected d_j}(1 - P(d_j|aspect)): rewards documents covering aspects not yet covered.",
          "**Cluster-based:** cluster the results and interleave top documents of each cluster. **IA-Select / PM-2** are other aspect-based methods.",
          "**Trade-off relevance vs diversity:** λ controls it; high diversity lowers precision for the dominant intent; for unambiguous queries diversification hurts; for ambiguous/multi-faceted queries (jaguar, python) it raises the chance that every user finds something relevant (risk minimisation). Use QPP/ambiguity detection to decide when to diversify. Costs: extra computation, need aspect estimates, evaluation needs subtopic judgements."
        ]
      },
      {
        "heading": "Measuring diversity of the top-k (2025-26 P1 Q1c, 5 marks)",
        "items": [
          "**Intra-list distance (ILD):** average pairwise dissimilarity in the top-k: ILD = (2 / (k(k-1))) Σ_{i<j} (1 - cos(d_i, d_j)). Higher = more diverse. Needs document vectors only (no judgements).",
          "**Subtopic recall (S-recall@k):** fraction of the query's subtopics covered by at least one of the top-k documents (needs subtopic judgements, as in TREC Diversity).",
          "**α-nDCG:** DCG where a document's gain for a subtopic is discounted by (1-α)^(number of earlier documents already covering that subtopic); rewards novelty and penalises redundancy.",
          "**Cluster/class coverage:** number of distinct clusters or categories represented in the top-k; **ERR-IA** (intent-aware expected reciprocal rank) averages a metric over intents weighted by intent probability.",
          "**Recommender versions:** catalogue coverage, novelty, intra-list diversity. Mention that diversity must be reported with relevance (precision/nDCG) because it can be raised trivially by returning random items."
        ]
      }
    ],
    "pitfalls": [
      "Describing diversity as \"pick different terms\" without a concrete selection rule (MMR formula or cluster-pick).",
      "Not discussing the relevance-diversity trade-off or the λ parameter.",
      "Measuring diversity without relevance: random lists are diverse.",
      "For expansion terms, forgetting that the diversity step uses a term-term similarity."
    ]
  }
];
