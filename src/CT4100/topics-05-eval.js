module.exports = [
  {
    "id": "precision-recall",
    "title": "Precision, recall, F-measure and the precision-recall graph",
    "priority": 9,
    "tier": "core",
    "freq": "8/9 papers (PR graph 5 times)",
    "marks": "5-8 marks",
    "summary": "**Precision = relevant retrieved / retrieved; recall = relevant retrieved / all relevant. For a ranked list, compute P and R after each relevant document, interpolate precision (max precision at recall >= r) at the 11 standard recall levels, plot, and average over queries.**",
    "mnemonic": "P = Positives found right; R = Reality covered",
    "source": [
      "CT4100_Notes_04_Metrics"
    ],
    "sections": [
      {
        "heading": "Precision and recall",
        "items": [
          "To test search we need a **test collection**: documents, queries and judgements of which documents are relevant. Relevance is judged against what the user **needs**, not the exact words typed.",
          "Judging everything is impossible, so only each system's top results are judged (**pooling**). TREC is the best-known source.",
          "**R** is the set of relevant documents and **A** is the set the system returned.",
          {
            "type": "formula",
            "label": "Precision and recall",
            "text": "Precision = |R ∩ A| / |A| = TP / (TP + FP);   Recall = |R ∩ A| / |R| = TP / (TP + FN)"
          },
          "**Precision**: of what was returned, how much is relevant. **Recall**: of what is relevant, how much was returned.",
          {
            "type": "table",
            "head": [
              "",
              "Relevant",
              "Non-relevant"
            ],
            "rows": [
              [
                "Retrieved",
                "True positive (TP)",
                "False positive (FP)"
              ],
              [
                "Not retrieved",
                "False negative (FN)",
                "True negative (TN)"
              ]
            ]
          },
          {
            "type": "formula",
            "label": "F-measure (weighted harmonic mean)",
            "text": "F_β = (β^2 + 1) P R / (β^2 P + R);  F1 = 2PR/(P + R). β > 1 emphasises recall, β < 1 emphasises precision."
          },
          "**F-measure** combines them. β above 1 favours recall, below 1 favours precision. It stays low if either is low.",
          "Returning everything gives recall 1 but poor precision. Web search cares about precision in the top 10; legal and patent search care about recall.",
          "**Accuracy** is useless here: almost every document is irrelevant, so returning nothing scores about 99.99%.",
          {
            "type": "p",
            "text": "Lecture example (20 documents, 10 relevant)"
          },
          "First result relevant: precision 1, recall 0.1. Two relevant: 1 and 0.2. Third not relevant: precision 0.67, recall 0.2.",
          "Plotting these gives a curve. A system better at low recall suits web search; one better at high recall suits legal search. Average the curves over many queries.",
          "To compare two systems query by query, plot the difference in **R-precision** (precision after R results) for each query."
        ]
      },
      {
        "heading": "Building a precision-recall graph (2021-22, 2022-23, 2024-25: 5-8 marks)",
        "items": [
          "1. Take the ranked answer set and the judgements; know |R| (total relevant in collection).",
          "2. Go down the ranking; at each rank k compute precision = (relevant in top k)/k and recall = (relevant in top k)/|R|.",
          "3. Recall only changes at relevant documents; so the sawtooth curve has a point at each relevant document.",
          "4. **Interpolate:** P_interp(r) = max precision at any recall level ≥ r (removes the sawtooth, makes the curve non-increasing).",
          "5. Evaluate at the 11 standard recall levels 0, 0.1, ..., 1.0.",
          "6. **Average over all queries:** P(r) = (1/N_q) Σ_i P_i(r); plot precision (y) against recall (x).",
          "Reading it: a curve high and to the right is better; an ideal system has precision 1 at recall 1; a system better at low recall (system A, web search) vs better at high recall (system B, legal search) cross over. Gives a summary of behaviour over the whole ranking and lets us compare systems; area under the curve approximates MAP."
        ]
      },
      {
        "heading": "Worked example",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Find precision and recall at each rank. Then at cut-off 10 find P, R, F1 and F2, and the 11-point interpolated precision."
            ]
          },
          "Ranked list of 10 documents, relevant ones at ranks 1, 3, 6, 8; collection has |R| = 5 relevant documents (one never retrieved).",
          {
            "type": "table",
            "head": [
              "Rank",
              "Relevant?",
              "Precision",
              "Recall"
            ],
            "rows": [
              [
                "1",
                "yes",
                "1/1 = 1.000",
                "1/5 = 0.2"
              ],
              [
                "2",
                "no",
                "1/2 = 0.500",
                "0.2"
              ],
              [
                "3",
                "yes",
                "2/3 = 0.667",
                "2/5 = 0.4"
              ],
              [
                "4",
                "no",
                "2/4 = 0.500",
                "0.4"
              ],
              [
                "5",
                "no",
                "2/5 = 0.400",
                "0.4"
              ],
              [
                "6",
                "yes",
                "3/6 = 0.500",
                "3/5 = 0.6"
              ],
              [
                "7",
                "no",
                "3/7 = 0.429",
                "0.6"
              ],
              [
                "8",
                "yes",
                "4/8 = 0.500",
                "4/5 = 0.8"
              ],
              [
                "9",
                "no",
                "4/9 = 0.444",
                "0.8"
              ],
              [
                "10",
                "no",
                "4/10 = 0.400",
                "0.8"
              ]
            ]
          },
          "At cut-off 10: P = 0.4, R = 0.8, F1 = 2(0.4)(0.8)/1.2 = 0.533, F2 = 5(0.4)(0.8)/(4(0.4)+0.8) = 0.667 (recall weighted).",
          "**Interpolation:** recall 0 to 0.2: max precision at recall ≥ level = 1.0; 0.3 and 0.4: 0.667; 0.5 to 0.8: 0.5 (best precision after recall 0.5 is 0.5); 0.9 and 1.0: 0 (those recall levels are never reached).",
          {
            "type": "table",
            "head": [
              "Recall",
              "0",
              "0.1",
              "0.2",
              "0.3",
              "0.4",
              "0.5",
              "0.6",
              "0.7",
              "0.8",
              "0.9",
              "1.0"
            ],
            "rows": [
              [
                "Interpolated precision",
                "1.0",
                "1.0",
                "1.0",
                "0.667",
                "0.667",
                "0.5",
                "0.5",
                "0.5",
                "0.5",
                "0",
                "0"
              ]
            ]
          },
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Interpolated precision-recall curve (11 points)",
              "xLabel": "recall",
              "yLabel": "interpolated precision",
              "xMin": 0,
              "xMax": 1,
              "yMin": 0,
              "yMax": 1.05,
              "series": [
                {
                  "name": "interpolated",
                  "points": [
                    [
                      0,
                      1
                    ],
                    [
                      0.1,
                      1
                    ],
                    [
                      0.2,
                      1
                    ],
                    [
                      0.3,
                      0.667
                    ],
                    [
                      0.4,
                      0.667
                    ],
                    [
                      0.5,
                      0.5
                    ],
                    [
                      0.6,
                      0.5
                    ],
                    [
                      0.7,
                      0.5
                    ],
                    [
                      0.8,
                      0.5
                    ],
                    [
                      0.9,
                      0
                    ],
                    [
                      1,
                      0
                    ]
                  ]
                },
                {
                  "name": "raw (P,R at each relevant doc)",
                  "points": [
                    [
                      0.2,
                      1
                    ],
                    [
                      0.4,
                      0.667
                    ],
                    [
                      0.6,
                      0.5
                    ],
                    [
                      0.8,
                      0.5
                    ]
                  ]
                }
              ]
            },
            "caption": "Values from the worked table: the interpolated curve is the upper envelope of the raw points."
          }
        ]
      },
      {
        "heading": "Strengths and limits of precision and recall",
        "items": [
          "**Strengths**: widely used, clearly defined, easy to read.",
          {
            "type": "p",
            "text": "Limits"
          },
          "**1.** Recall needs every relevant document to be known, which is impossible for the web.",
          "**2.** Relevance is only yes or no, and the basic form ignores position.",
          "**3.** Ignores how the user interacts and the effort they spend.",
          "**4.** An average hides differences between queries.",
          "**5.** Web users only see the top results, so recall matters little to them.",
          "**6.** Treats documents separately, ignoring repetition and variety.",
          "**7.** Two numbers must be combined to compare systems.",
          "**8.** Judges disagree with each other (measured by Cohen's kappa, agreement beyond chance).",
          "**Other measures**: F-measure, P@k, average precision, MAP, nDCG (for graded relevance), and online tests with real users."
        ]
      }
    ],
    "pitfalls": [
      "Computing recall with the number retrieved in the denominator (it is the number of RELEVANT in the collection).",
      "Plotting raw sawtooth precision without interpolation when asked for the standard 11-point curve.",
      "Forgetting to average over queries.",
      "Using the arithmetic mean for F; it is the harmonic mean."
    ]
  },
  {
    "id": "ranked-metrics",
    "title": "Ranked metrics: P@k, AP, MAP, MRR, nDCG",
    "priority": 17,
    "tier": "core",
    "freq": "2/9 papers directly (MAP, user-experience measure); essential for numerics",
    "marks": "5-8 marks",
    "summary": "**AP averages precision at each relevant document (divided by total relevant); MAP averages AP over queries; MRR averages 1/rank of the first relevant; nDCG discounts graded gains by log2(rank+1) and normalises by the ideal ranking.**",
    "mnemonic": "AP = average of P at the hits; nDCG = gain over log-rank, divided by ideal",
    "source": [
      "CT4100_Notes_04_Metrics"
    ],
    "sections": [
      {
        "heading": "Single-value measures from the notes",
        "items": [
          "1. Precision when every new relevant document is retrieved (-> AP). 2. Average over queries (**MAP**). 3. Precision when the first relevant document is retrieved (-> **reciprocal rank**). 4. **R-precision**: precision after R documents (R = number of relevant). 5. **P@k**.",
          {
            "type": "formula",
            "label": "Precision at k",
            "text": "P@k = (relevant documents in top k) / k.   R-precision = P@R."
          },
          {
            "type": "formula",
            "label": "Average precision (AP) and MAP",
            "text": "AP(q) = (1/|R_q|) Σ_{k: d_k relevant} P@k;  MAP = (1/|Q|) Σ_q AP(q). Divide by ALL relevant documents, so unretrieved relevant documents count as precision 0."
          },
          {
            "type": "formula",
            "label": "Mean reciprocal rank",
            "text": "MRR = (1/|Q|) Σ_q 1 / rank_q, rank_q = rank of the first relevant document for query q."
          },
          {
            "type": "formula",
            "label": "DCG and nDCG",
            "text": "DCG@k = Σ_{i=1..k} rel_i / log2(i + 1);  nDCG@k = DCG@k / IDCG@k, IDCG = DCG of the ideal ordering (sorted by relevance). 0 ≤ nDCG ≤ 1. (A variant uses gain 2^rel - 1.)"
          }
        ]
      },
      {
        "heading": "Worked examples",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "**AP:** a ranked list reads R N R N N R N R N N (R = relevant), and 5 relevant documents exist.",
              "**MAP:** a second query has relevant documents at ranks 2 and 4, and only those 2 exist.",
              "**MRR:** three queries have their first relevant result at ranks 1, 3 and 2.",
              "For the first list also find P@5 and R-precision.",
              "**nDCG@5:** the top 5 results have graded relevance 3, 2, 3, 0, 1."
            ]
          },
          "**AP:** list R N R N N R N R N N, |R| = 5. Precisions at relevant ranks: 1/1, 2/3, 3/6, 4/8 = 1, 0.667, 0.5, 0.5 (sum 2.667). AP = 2.667/5 = **0.533** (the fifth relevant document was not retrieved, contributing 0). If AP is divided by 4 retrieved-relevant it would be 0.667: do not do this.",
          "**MAP:** second query has relevant at ranks 2 and 4 of 2 relevant: AP = (1/2 + 2/4)/2 = 0.5. MAP = (0.533 + 0.5)/2 = **0.517**.",
          "**MRR:** first relevant at ranks 1, 3, 2 for three queries: (1 + 1/3 + 1/2)/3 = **0.611**.",
          "**P@5** for the first list = 2/5 = 0.4. R-precision (R = 5) = P@5 = 0.4.",
          "**nDCG@5:** graded relevance of the top 5 = 3, 2, 3, 0, 1. Discount terms 3/1, 2/1.585, 3/2, 0/2.322, 1/2.585 = 3, 1.262, 1.5, 0, 0.387. DCG = **6.149**. Ideal order 3, 3, 2, 1, 0: DCG = 3 + 1.893 + 1 + 0.431 + 0 = 6.323 (computed 3/1 + 3/1.585 + 2/2 + 1/2.322 + 0). nDCG = 6.149/6.323 = **0.972**."
        ]
      },
      {
        "heading": "MAP: benefits and limits",
        "items": [
          "**AP** (average precision) is the average of the precision values at each relevant document. **MAP** is the mean of AP over many queries.",
          {
            "type": "p",
            "text": "Benefits"
          },
          "One number, so easy to compare. Uses the whole ranking, with no cut-off. Rewards relevant documents near the top. Standard in TREC and fairly stable.",
          {
            "type": "p",
            "text": "Limits"
          },
          "Relevance is only yes or no (use **nDCG** for grades). Needs all relevant documents to be known. Assumes users want to find everything, but web users look at the top few (use P@10 or MRR). An average can hide very poor queries (**GMAP** highlights them). Needs many queries and a significance test. Ignores repetition and variety, and does not measure user experience. Cannot be compared across different collections."
        ]
      },
      {
        "heading": "Choosing a measure",
        "items": [
          {
            "type": "table",
            "head": [
              "Need",
              "Use"
            ],
            "rows": [
              [
                "Web search, user reads top few",
                "P@5/P@10, MRR (known-item)"
              ],
              [
                "Recall-oriented (legal, patent, research)",
                "Recall@k, MAP, F2"
              ],
              [
                "Graded relevance",
                "nDCG@k"
              ],
              [
                "Whole-ranking single number",
                "MAP"
              ],
              [
                "Diversity/novelty",
                "α-nDCG, S-recall"
              ],
              [
                "Real users",
                "A/B tests, interleaving, click metrics"
              ]
            ]
          },
          "Compare systems query by query with a **significance test** (paired t-test or Wilcoxon), which checks the difference is not luck. A **precision histogram** plots the difference in R-precision between two systems for each query."
        ]
      }
    ],
    "pitfalls": [
      "Dividing AP by the number of retrieved relevant documents instead of the total relevant.",
      "Forgetting log2(i+1): the first rank has denominator 1 (log2 2).",
      "Computing nDCG without sorting the ideal ranking, or using the system list as its own ideal.",
      "Calling MAP \"mean of precision at all ranks\": it is mean over queries of the average of precision at relevant ranks."
    ]
  },
  {
    "id": "user-oriented-evaluation",
    "title": "User-oriented measures, test collections and online evaluation",
    "priority": 26,
    "tier": "likely",
    "freq": "3/9 papers (\"suggest a measure capturing the user experience\")",
    "marks": "8 marks",
    "summary": "**Coverage and novelty measure how well the system serves what the user already knows and what is new; online methods (A/B tests, interleaving) use real behaviour but clicks are biased.**",
    "mnemonic": "Coverage = known found; Novelty = new found",
    "source": [
      "CT4100_Notes_04_Metrics",
      "CT4100_Notes_08_Web_Search"
    ],
    "sections": [
      {
        "heading": "Coverage and novelty (answer to \"suggest a user-experience measure\", 2022-23/2023-24)",
        "items": [
          "Let D = document set, R = relevant set, A = answer set returned, U = relevant documents previously known to the user, AU = returned documents previously known to the user (A ∩ U), New = relevant returned documents previously unknown to the user.",
          {
            "type": "formula",
            "label": "Coverage and novelty",
            "text": "Coverage = |AU| / |U|;   Novelty = |New| / (|New| + |AU|)"
          },
          "Coverage: how much of what the user already knows is relevant is found: a trust measure (\"does the system find the things I know about?\"). Novelty: of the relevant documents returned, how many are new to the user: usefulness/value.",
          "Worked: user knows |U| = 10 relevant documents. System returns 20 documents; 4 are known relevant (AU) and 6 are relevant but unknown (New). Coverage = 4/10 = 0.4; Novelty = 6/(6 + 4) = 0.6.",
          {
            "type": "p",
            "text": "Other measures of the user's experience"
          },
          "**Expected search length**: how far the user reads before being satisfied. **MRR**: position of the first relevant result.",
          "**Rank-biased precision**: assumes the user continues to each next result with a set probability p.",
          "Also nDCG, diversity measures, number of queries needed, questionnaires, and how often users give up."
        ]
      },
      {
        "heading": "Test collections and their issues",
        "items": [
          "A **test collection** is documents, queries and relevance judgements, reused to compare systems.",
          "**Cranfield** (1960s) started the method: 1,400 documents, 225 queries, everything judged.",
          "**TREC** (run by the US standards body NIST since 1992) scaled it up. Too big to judge fully, so it uses **pooling**: judge only each system's top results.",
          "Similar campaigns: CLEF (many languages), NTCIR (Asian languages), FIRE (South Asian languages). Modern benchmarks: MS MARCO (real web queries) and BEIR (many mixed collections).",
          {
            "type": "p",
            "text": "What TREC studies now"
          },
          "Answers generated from retrieved passages, multilingual report writing, video questions, tracking a topic over time, and whether AI can replace human judges or users.",
          {
            "type": "p",
            "text": "What is measured"
          },
          "Whether it works, how fast and how much space it takes, and how useful the results are. Ordinary database lookup has one exact answer, so usefulness is not an issue there.",
          {
            "type": "p",
            "text": "Issues"
          },
          "Judging is expensive; judges disagree; relevance comes in degrees; tune on one collection and test on another. Whole search sessions are harder to evaluate than one query."
        ]
      },
      {
        "heading": "Offline vs online evaluation",
        "items": [
          "**Offline:** fixed collection and judgements; repeatable and cheap; judges are not real users.",
          "**Online:** observe real users (clicks, dwell time, reformulations, abandonment). **A/B test:** split users, show ranker A to one group and B to the other, compare behaviour (simple, realistic, needs much traffic). **Interleaving:** merge two rankings into one list, credit each click to the contributing ranker (each user compares the rankers directly, needs far less traffic; position bias hits both equally).",
          "**Clicks are biased evidence:** position bias (top results get clicks because they are top), presentation bias (snippets, titles), and \"no click\" is ambiguous (irrelevant, unseen, or the snippet answered the question: zero-click).",
          "Web evaluation uses Prec@5, Prec@10 (recall impossible to compute, users do not care about it) and click-through data."
        ]
      }
    ],
    "pitfalls": [
      "Giving novelty/coverage formulas inverted: coverage is over the user's KNOWN relevant set U; novelty over (New + AU).",
      "Stating that clicks equal relevance without mentioning position bias.",
      "Suggesting a user measure without saying what aspect of the user experience it captures."
    ]
  },
  {
    "id": "independence-assumption",
    "title": "Term independence assumption and vocabulary mismatch",
    "priority": 16,
    "tier": "core",
    "freq": "4/9 papers (10 marks in 2024-25 both papers; 5 marks 2025-26)",
    "marks": "5-10 marks",
    "summary": "**The independence assumption treats every term as an unrelated dimension (orthogonal axes, bag of words), so synonyms do not match, polysemes are not separated, and phrases/order are lost; fix it with LSI/embeddings, query expansion/thesauri, and phrase/proximity models.**",
    "mnemonic": "Orthogonal terms: no synonyms, no senses, no phrases",
    "source": [
      "CT4100_Notes_02a_IR_Models",
      "CT4100_Notes_05_Weighting_Schemes",
      "CT4100_Notes_10_Query_Difficulty_Prediction"
    ],
    "sections": [
      {
        "heading": "What the assumption is",
        "items": [
          "**Term independence:** each term is weighted and matched in isolation; the presence of one term says nothing about another. In the vector space the terms are **orthogonal dimensions** (the dot product of two different terms is 0).",
          "Related: **bag of words**: word order is ignored (\"Mary is quicker than John\" = \"John is quicker than Mary\"). Both are simplifications that make weighting and indexing tractable and work surprisingly well, but they limit semantics.",
          "The Boolean model, VSM and the classic probabilistic models (Binary Independence Model) all make this assumption."
        ]
      },
      {
        "heading": "How treating words as independent hurts",
        "items": [
          "**Synonyms**: you type \"car hire\", the document says \"vehicle rental\". No shared words, so it scores 0. You miss relevant documents (hurts **recall**).",
          "**Several meanings**: \"jaguar\", \"bank\". All meanings are treated as one, so irrelevant documents match (hurts **precision**).",
          "**Related words**: \"doctor\" and \"hospital\" are not seen as connected.",
          "**Phrases**: \"new york\" is counted as two unrelated words.",
          "**Order**: \"dog bites man\" looks the same as \"man bites dog\", and \"not\" is lost.",
          "**Double counting**: words that always appear together each add weight.",
          "**Exam example**: query \"automobile accident\". \"Car crash on the motorway\" scores 0, while \"automobile manufacturing, accident of birth\" matches both words and ranks higher."
        ]
      },
      {
        "heading": "Vocabulary mismatch and how to reduce it",
        "items": [
          "**Vocabulary mismatch**: writers and searchers use different words for the same thing. Two people often choose different words for one idea.",
          {
            "type": "p",
            "text": "Fix it when building the index"
          },
          "Cut words to their stem (**stemming**). Add likely queries or related words to each document (**document expansion**). Use a **thesaurus** (list of related words). Match by hidden topics (**latent semantic indexing**) or by meaning (**embeddings**, number lists where similar words sit close). Index the text of links pointing to a page.",
          {
            "type": "p",
            "text": "Fix it when the query arrives"
          },
          "Add related words to the query (**query expansion**), assume the top results are relevant and learn from them (**pseudo-relevance feedback**), correct spelling and suggest queries, or ask the user for feedback."
        ]
      },
      {
        "heading": "Ways to capture links between words",
        "items": [
          "**1. Add related words** to the query using a thesaurus or the top results.",
          "**2. Word-similarity table**: let the match score count pairs of related words, not just identical ones (the **generalised vector space model**).",
          "**3. Latent semantic indexing (LSI)**: compress the word-by-document table into 100-300 hidden topics using a matrix method called SVD. Words used in similar places end up close, which handles synonyms. Costly, and the topics are hard to interpret.",
          "**4. Embeddings and neural models** (word2vec, BERT): number lists learned from text. Some also capture word order.",
          "**5. Phrases and closeness**: index word pairs and positions, and reward query words found near each other.",
          "**6. Other probability models** that allow for dependence between words."
        ]
      }
    ],
    "pitfalls": [
      "Saying the assumption means terms do not co-occur: it means the MODEL ignores their relationships.",
      "Only naming synonymy: also give polysemy, phrases and order, with an example.",
      "Offering a \"solution\" without stating its cost or limitation (LSI is expensive, expansion can drift).",
      "Not giving a concrete example (car vs automobile; new york)."
    ]
  }
];
