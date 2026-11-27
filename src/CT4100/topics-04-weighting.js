module.exports = [
  {
    "id": "tf-idf-weighting",
    "title": "Term weighting: tf-idf and what makes a good weighting scheme",
    "priority": 11,
    "tier": "core",
    "freq": "6/9 papers (\"main constituents of a good weighting scheme\")",
    "marks": "8-9 marks",
    "summary": "**A good weighting scheme rewards terms frequent in the document (tf), penalises terms frequent across the collection (idf), normalises for document length, and weights query terms: sim = Σ ntf(t,d) × gwt(t) × qwt(t,q).**",
    "mnemonic": "TIL: Term frequency, Inverse document frequency, Length normalisation",
    "source": [
      "CT4100_Notes_05_Weighting_Schemes",
      "CT4100_Notes_02a_IR_Models",
      "CT4100_Notes_02b_IR_Models_Notes"
    ],
    "sections": [
      {
        "heading": "Core ideas",
        "items": [
          "**tf (term frequency)**: number of occurrences of term t in document d. The more frequent, the better t describes d.",
          "**df (document frequency)**: number of DOCUMENTS containing t (not occurrences). **idf = log(N/df)**: rare terms discriminate between documents; terms in every document get idf 0.",
          "**Resolving power (Luhn 1958):** the best content words are neither too frequent (stop words) nor too rare. tf-idf approximates Luhn's upper/lower cut-offs with smooth weights instead of hard thresholds.",
          {
            "type": "formula",
            "label": "Basic tf-idf (Spärck Jones / Salton & Fox)",
            "text": "w(t,d) = f(t,d) × log(N / n_t), f = (possibly normalised) frequency of t in d, N = number of documents, n_t = number of documents containing t."
          },
          {
            "type": "formula",
            "label": "Max-tf normalised document weight (Salton & Buckley)",
            "text": "w(t,d) = ( tf(t,d) / max_s tf(s,d) ) × log(N / df(t))"
          },
          {
            "type": "formula",
            "label": "Query weight (Salton & Buckley)",
            "text": "w(t,q) = ( 0.5 + 0.5 × tf(t,q) / max_s tf(s,q) ) × log(N / df(t)): every query term starts at 0.5 and rises with its frequency in the query."
          },
          {
            "type": "formula",
            "label": "Sublinear tf",
            "text": "w(t,d) = 1 + log tf(t,d) if tf > 0, else 0. (base 10: tf 1, 10, 30, 100 gives 1, 2, 2.48, 3). 30 occurrences is not 30 times as significant as 1."
          }
        ]
      },
      {
        "heading": "General structure of modern schemes",
        "items": [
          {
            "type": "formula",
            "label": "Local x global x query",
            "text": "sim(q,d) = Σ_{t in q∩d} ntf(t,d) × gwt(t) × qwt(t,q); ntf = normalised local frequency, gwt = global weight (idf), qwt = weight of t in the query."
          },
          "Example: tf-idf: ntf = tf/max tf, gwt = log(N/df), qwt = 0.5 + 0.5 tf_q/max tf_q. BM25 and pivoted normalisation fit the same mould (local = saturated, length-normalised tf)."
        ]
      },
      {
        "heading": "What a good weighting scheme needs",
        "items": [
          "**1. Within the document**: more occurrences count for more, but with **diminishing returns** (the 30th is worth much less than the 2nd).",
          "**2. Across the collection**: rare words weigh more (idf), very common words almost nothing.",
          "**3. Document length**: allow for long documents repeating words more and covering more topics, without punishing them too much.",
          "**4. The query**: handle repeated query words sensibly.",
          "**5. Obeys common-sense rules** (called **axioms**, see that topic): more matches score higher, extra irrelevant words score lower.",
          "**6. Practical**: few settings to tune, works well, fast to compute."
        ]
      },
      {
        "heading": "Worked example (tf-idf with cosine) - see also the VSM topic",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "N = 5 documents. df: cat 3, dog 2, mouse 2, bird 2, fish 1. Use log base 10.",
              "Find each idf. Then find the tf-idf weights for d1 = \"cat cat dog\" and d3 = \"dog dog bird\"."
            ]
          },
          "Collection N = 5. df(cat) = 3 so idf = log10(5/3) = 0.222; df(dog) = 2 so idf = log10(5/2) = 0.398; df(mouse) = df(bird) = 2 so 0.398; df(fish) = 1 so 0.699.",
          "Doc d1 = \"cat cat dog\": w(cat) = 2 × 0.222 = 0.444, w(dog) = 1 × 0.398 = 0.398. Doc d3 = \"dog dog bird\": w(dog) = 0.796, w(bird) = 0.398.",
          "Note how rare \"fish\" (idf 0.699) gets high weight, but tf alone would give \"cat\" (3 docs) more weight: idf demotes common terms."
        ]
      },
      {
        "heading": "Two simplifying assumptions behind tf-idf",
        "items": [
          "**Bag of words:** order ignored. \"Mary is quicker than John\" and \"John is quicker than Mary\" get identical vectors.",
          "**Term independence:** each term weighted in isolation; terms are orthogonal dimensions, so \"new\" and \"york\" contribute separately. Both make weighting and indexing tractable and work surprisingly well."
        ]
      }
    ],
    "pitfalls": [
      "Confusing df (documents containing the term) with collection frequency (total occurrences).",
      "Writing idf as 1/df: it is the LOG of N/df.",
      "Forgetting the length-normalisation constituent in \"constituents of a good scheme\".",
      "Not using the query weight (0.5 + 0.5 tf/max tf) when asked for the Salton-Buckley scheme."
    ]
  },
  {
    "id": "vector-space-model",
    "title": "Vector space model: cosine ranking, strengths and limitations",
    "priority": 12,
    "tier": "core",
    "freq": "5/9 papers",
    "marks": "5-8 marks",
    "summary": "**VSM represents documents and queries as weighted term vectors in N-dimensional space and ranks by the cosine of the angle between them; it gives partial matching and ranked output but assumes term independence.**",
    "mnemonic": "DOT over LENGTHS",
    "source": [
      "CT4100_Notes_02a_IR_Models",
      "CT4100_Notes_02b_IR_Models_Notes",
      "CT4100_Notes_05_Weighting_Schemes"
    ],
    "sections": [
      {
        "heading": "The model",
        "items": [
          "IR model = (D, Q, F, R): document representations, query representations, a framework relating them, and a ranking function R(q_i, d_j).",
          "Index terms t_1 ... t_M (M = vocabulary size). Each document d_j = (w_{1,j}, ..., w_{M,j}); query q = (w_{1,q}, ..., w_{M,q}); weight 0 if the term is absent. Weights are NON-binary (unlike Boolean) and usually tf-idf.",
          "**Similarity** = cosine of the angle between vectors; documents ranked by decreasing similarity. Ranked list lets the user stop anywhere; the top answers can be used for relevance feedback.",
          {
            "type": "formula",
            "label": "Cosine similarity",
            "text": "sim(q,d) = (q · d) / (|q| |d|) = Σ_t w(t,q) w(t,d) / ( sqrt(Σ_t w(t,q)^2) × sqrt(Σ_t w(t,d)^2) ). Range 0..1 for non-negative weights."
          },
          "Cosine uses **angle, not length**: scaling a vector (doubling every weight) leaves it unchanged. Because |q| is the same for all documents, it does not affect the ranking."
        ]
      },
      {
        "heading": "Worked ranking example",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Rank the documents for this query using tf-idf weights and cosine similarity (log base 10)."
            ],
            "uses": [
              "Basic tf-idf (Spärck Jones / Salton & Fox)",
              "Cosine similarity"
            ]
          },
          "Documents (term counts): d1 = cat 2, dog 1; d2 = cat 1, mouse 1; d3 = dog 2, bird 1; d4 = bird 2, mouse 1; d5 = cat 1, fish 3. N = 5. Query \"cat dog\" (tf 1 each, weight = idf).",
          "idf: cat log10(5/3) = 0.222; dog log10(5/2) = 0.398; mouse = bird = 0.398; fish = 0.699. Query vector (cat 0.222, dog 0.398), |q| = 0.456.",
          {
            "type": "table",
            "head": [
              "Doc",
              "weights",
              "dot with q",
              "|d|",
              "cosine"
            ],
            "rows": [
              [
                "d1",
                "cat 0.444, dog 0.398",
                "0.444(0.222)+0.398(0.398)=0.257",
                "0.596",
                "0.257/(0.596×0.456) = **0.946**"
              ],
              [
                "d3",
                "dog 0.796, bird 0.398",
                "0.796(0.398)=0.317",
                "0.890",
                "0.317/(0.890×0.456) = **0.781**"
              ],
              [
                "d2",
                "cat 0.222, mouse 0.398",
                "0.222(0.222)=0.049",
                "0.456",
                "0.049/(0.456×0.456) = **0.237**"
              ],
              [
                "d5",
                "cat 0.222, fish 2.097",
                "0.049",
                "2.109",
                "0.049/(2.109×0.456) = **0.051**"
              ],
              [
                "d4",
                "bird 0.796, mouse 0.398",
                "0",
                "0.890",
                "**0**"
              ]
            ]
          },
          {
            "type": "diagram",
            "kind": "bar",
            "data": {
              "title": "Cosine similarity to query \"cat dog\"",
              "yLabel": "cosine",
              "bars": [
                {
                  "label": "d1",
                  "value": 0.946
                },
                {
                  "label": "d3",
                  "value": 0.781
                },
                {
                  "label": "d2",
                  "value": 0.237
                },
                {
                  "label": "d5",
                  "value": 0.051
                },
                {
                  "label": "d4",
                  "value": 0
                }
              ]
            },
            "caption": "Ranking: d1 > d3 > d2 > d5 > d4. d5 is long (fish dominates its vector) so cosine penalises it despite containing \"cat\"."
          }
        ]
      },
      {
        "heading": "Limitations of the vector space model",
        "items": [
          "It treats each word separately and ignores order, so synonyms, words with several meanings and phrases are missed. When query and document use different words it is called **vocabulary mismatch**.",
          "The weights are rules of thumb, and the similarity score is not a probability of relevance.",
          "Cosine tends to **over-penalise long documents**.",
          "Number lists are very long and mostly zero, and adding documents changes idf for everything.",
          "It cannot say \"must contain\" or \"not\", and ignores layout and how close words are.",
          "**Fixes**: LSI or embeddings (match by meaning), adding query words and feedback, phrase features, BM25."
        ]
      }
    ],
    "pitfalls": [
      "Computing cosine without dividing by BOTH vector lengths.",
      "Including query length |q| as if it changes the ranking: it is constant across documents.",
      "Using term counts but forgetting idf (then common terms dominate).",
      "Writing \"VSM assumes term independence\" without an example of what goes wrong (see independence topic)."
    ]
  },
  {
    "id": "length-normalisation",
    "title": "Document length normalisation (cosine, max-tf, pivoted) and the concatenated-document problem",
    "priority": 13,
    "tier": "core",
    "freq": "4/9 papers",
    "marks": "5-8 marks",
    "summary": "**Long documents have higher tf (verbosity) and more distinct terms (scope); without normalisation they score higher regardless of relevance. Cosine, max-tf, pivoted and BM25 normalisations compensate, and the best ones avoid over-penalising long documents.**",
    "mnemonic": "Verbosity vs Scope; pivot on the average",
    "source": [
      "CT4100_Notes_05_Weighting_Schemes"
    ],
    "sections": [
      {
        "heading": "Why documents must be adjusted for length",
        "items": [
          "Long documents repeat words more (**verbosity**) and cover more topics (**scope**), so they match more queries. Without a correction they win whether or not they are relevant. **Normalisation** makes different lengths comparable.",
          {
            "type": "p",
            "text": "Thought experiment"
          },
          "Glue a document to a copy of itself. Nothing new is said, so the score should not change.",
          "With plain tf-idf and no correction, every count doubles, so the score doubles (0.257 becomes 0.514).",
          {
            "type": "p",
            "text": "How modern methods handle it"
          },
          "**1.** **Cosine**: only direction matters, so the doubled copy scores the same.",
          "**2.** **Diminishing returns** on repeats (1 + log tf, or BM25's cap).",
          "**3.** **BM25 or pivoted** correction compares length with the average. b is the setting for how strongly (b = 1 is full).",
          "BM25 example (k1 = 1.2, b = 0.75): the word part is 1.375 for the original and only 1.443 for the doubled copy, not 2.75."
        ]
      },
      {
        "heading": "Ways to normalise",
        "items": [
          "**Cosine**: divide the weights by the vector's length. Simple and scores stay 0 to 1, but it punishes long documents too much.",
          "**Max-tf**: divide each count by the largest count in the document. Cheap, but one very frequent word can distort it.",
          "**Sublinear tf** (1 + log tf): repeats count less, but it does not allow for length by itself.",
          "**Pivoted**: divide by (1 - s) + s × length / average length, with s about 0.2. Documents longer than average are punished less than under cosine. s must be tuned.",
          "**BM25**: tf / (tf + k1 × ((1 - b) + b × length / average length)). Smooth, and b sets the strength.",
          "**Why pivot**: very long documents are more often relevant than cosine allows for, so the correction line is tilted around the average length."
        ]
      },
      {
        "heading": "Answer template: \"explain why normalisation is necessary, describe a technique, discuss effectiveness\" (2024-25)",
        "items": [
          "1. Why: verbosity and scope; unfair comparison; example of d concatenated with d.",
          "2. Technique: cosine (state formula, show doubling invariance) or pivoted/BM25 (state formula and parameter).",
          "3. Advantages: scale invariance, bounded scores, comparability.",
          "4. Drawbacks: over-penalises long documents, favours short ones, ignores document scope; needs tuning; sensitive to stop-word choice/outliers.",
          "5. Better: pivoted normalisation relative to average length."
        ]
      }
    ],
    "pitfalls": [
      "Claiming cosine normalisation is perfect: it over-corrects for long documents with genuine scope.",
      "Not noting that raw tf-idf with an unnormalised dot product doubles the score for a duplicated document.",
      "Mixing up verbosity (repeats) and scope (more topics).",
      "In pivoted normalisation, forgetting that avgdl is the pivot and s controls strength."
    ]
  },
  {
    "id": "bm25",
    "title": "BM25 (Okapi): formula, parameters k1 and b, worked example",
    "priority": 14,
    "tier": "core",
    "freq": "2/9 papers (both 2025-26) but baseline everywhere",
    "marks": "5 marks",
    "summary": "**BM25 = idf × saturated, length-normalised tf: Σ log((N-df+0.5)/(df+0.5)) × tf(k1+1) / (tf + k1((1-b) + b|d|/avgdl)) × tf_q; k1 controls tf saturation, b controls length normalisation.**",
    "mnemonic": "k1 = Knee of saturation; b = Body-length penalty",
    "source": [
      "CT4100_Notes_05_Weighting_Schemes"
    ],
    "sections": [
      {
        "heading": "Formula and components",
        "items": [
          {
            "type": "formula",
            "label": "BM25 score of document d for query q",
            "text": "score(q,d) = Σ_{t in q} [ log( (N - df_t + 0.5) / (df_t + 0.5) ) ] × [ tf_{t,d} (k1 + 1) / ( tf_{t,d} + k1 ( (1 - b) + b |d| / avgdl ) ) ] × tf_{t,q}"
          },
          "**Global weight (idf):** log((N-df+0.5)/(df+0.5)) (Robertson-Spärck Jones). Near the classic log(N/df) for rare terms; becomes **negative when df > N/2** (matching a very common term lowers the score). Lucene uses log(1 + (N-df+0.5)/(df+0.5)) to stay positive.",
          "**Local weight:** saturating tf with length normalisation. **Query weight:** tf_{t,q} (often 1).",
          "N = documents, df_t = documents with t, tf_{t,d} = term frequency in d, |d| = document length, avgdl = average length, k1 and b = free parameters.",
          "**k1 (about 1.2-2.0):** controls **tf saturation**. As tf grows the local weight approaches k1+1 (an upper bound). k1 = 0 gives binary (presence only); large k1 approaches raw tf. Larger k1 means tf counts for more and saturates more slowly.",
          "**b (0 to 1, default 0.75):** controls **document length normalisation**. b = 0 none; b = 1 full normalisation by |d|/avgdl; |d|/avgdl > 1 means longer than average, so tf is discounted.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "BM25 tf saturation (average-length document)",
              "xLabel": "term frequency tf",
              "yLabel": "local weight tf(k1+1)/(tf+k1)",
              "xMin": 0,
              "xMax": 20,
              "yMin": 0,
              "yMax": 3,
              "series": [
                {
                  "name": "k1 = 0.5 (limit 1.5)",
                  "points": [
                    [
                      0,
                      0
                    ],
                    [
                      1,
                      1
                    ],
                    [
                      2,
                      1.2
                    ],
                    [
                      3,
                      1.286
                    ],
                    [
                      5,
                      1.364
                    ],
                    [
                      8,
                      1.412
                    ],
                    [
                      12,
                      1.44
                    ],
                    [
                      16,
                      1.455
                    ],
                    [
                      20,
                      1.463
                    ]
                  ]
                },
                {
                  "name": "k1 = 1.2 (limit 2.2)",
                  "points": [
                    [
                      0,
                      0
                    ],
                    [
                      1,
                      1
                    ],
                    [
                      2,
                      1.375
                    ],
                    [
                      3,
                      1.571
                    ],
                    [
                      5,
                      1.774
                    ],
                    [
                      8,
                      1.913
                    ],
                    [
                      12,
                      2
                    ],
                    [
                      16,
                      2.047
                    ],
                    [
                      20,
                      2.075
                    ]
                  ]
                },
                {
                  "name": "k1 = 2 (limit 3)",
                  "points": [
                    [
                      0,
                      0
                    ],
                    [
                      1,
                      1
                    ],
                    [
                      2,
                      1.5
                    ],
                    [
                      3,
                      1.8
                    ],
                    [
                      5,
                      2.143
                    ],
                    [
                      8,
                      2.4
                    ],
                    [
                      12,
                      2.571
                    ],
                    [
                      16,
                      2.667
                    ],
                    [
                      20,
                      2.727
                    ]
                  ]
                }
              ]
            },
            "caption": "The first occurrences matter most; later ones add little. Values computed from tf(k1+1)/(tf+k1)."
          }
        ]
      },
      {
        "heading": "Worked example",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Documents: A has length 80 with tf(information) = 3 and tf(retrieval) = 2. B has the same counts but length 200. C has length 100, tf(information) = 10 and no \"retrieval\".",
              "Score and rank them with BM25."
            ]
          },
          "N = 1000, avgdl = 100, k1 = 1.2, b = 0.75. Query \"information retrieval\": df(information) = 100, df(retrieval) = 20.",
          "idf(information) = ln(900.5/100.5) = 2.193; idf(retrieval) = ln(980.5/20.5) = 3.868.",
          "**Doc A:** |d| = 80, tf(information) = 3, tf(retrieval) = 2. Length factor (1-b) + b·80/100 = 0.85, so denominators use k1 × 0.85 = 1.02. information: 3(2.2)/(3 + 1.02) = 1.642, × 2.193 = 3.600. retrieval: 2(2.2)/(2 + 1.02) = 1.457, × 3.868 = 5.635. **Score A = 9.24.**",
          "**Doc B:** same tfs but |d| = 200: length factor 0.25 + 0.75(2) = 1.75, so k1 × 1.75 = 2.1. information: 6.6/5.1 = 1.294 × 2.193 = 2.838; retrieval: 4.4/4.1 = 1.073 × 3.868 = 4.150. **Score B = 6.99** (longer, same tf: penalised).",
          "**Doc C:** |d| = 100, tf(information) = 10, no \"retrieval\": 10(2.2)/(10 + 1.2) = 1.964 × 2.193 = **4.31**. Ten occurrences of ONE term score far less than a few of both: saturation rewards coverage of query terms."
        ]
      },
      {
        "heading": "Extreme values of b (2025-26 P2 Q1c)",
        "items": [
          "**b = 0:** no length normalisation; the tf part is tf(k1+1)/(tf + k1) for every document. Long documents (naturally larger tf, more terms) are favoured, verbosity rewarded. Example: tf = 3 scores 1.571 whatever the length.",
          "**b = 1:** full normalisation; the denominator uses k1 |d|/avgdl. Long documents are penalised heavily (tf 3: 1.22 at length 2×avg, 1.83 at half average): over-penalises long documents that are genuinely broader (scope) and rewards short ones. A document concatenated with itself gets exactly the same score.",
          "**Neither is desirable** because document length reflects both verbosity (should be corrected) and scope (should not). Observed relevance rises with length, so a partial correction (b about 0.3-0.8) works best; default 0.75.",
          "**Setting b in practice:** tune on a training set of queries with relevance judgements (grid search, e.g. b in {0.2,...,1.0}, k1 in {0.8,...,2.0}), maximise MAP/nDCG with cross-validation; collections with uniform short length (abstracts, tweets) need small b; collections of very variable length (web) larger b; per-field b (BM25F); or learn parameters with LTR/GA."
        ]
      },
      {
        "heading": "BM25 vs tf-idf",
        "items": [
          "BM25 is probabilistic in origin (Robertson-Spärck Jones weights), has bounded saturating tf, integrated length normalisation and two tunable parameters; typically beats plain tf-idf-cosine. Still the standard baseline for neural models; also used as first-stage retrieval and as a feature in LTR.",
          "Weaknesses: parameters need tuning; bag of words (independence); negative idf for very common terms; no semantic matching."
        ]
      }
    ],
    "pitfalls": [
      "Mixing up k1 and b: k1 = tf saturation, b = length normalisation.",
      "Forgetting the (k1+1) in the numerator and the idf term.",
      "Saying b = 1 is \"best because it fully normalises\": it over-penalises long, genuinely broad documents.",
      "Using log10 vs ln inconsistently within one calculation."
    ]
  },
  {
    "id": "axiomatic-weighting",
    "title": "Axiomatic approaches to weighting (retrieval constraints)",
    "priority": 15,
    "tier": "likely",
    "freq": "4/9 papers",
    "marks": "8 marks",
    "summary": "**Axiomatic IR states formal constraints (TFC1, TFC2, TDC, LNC1, LNC2, TF-LNC) that any good ranking function should satisfy, then uses them to analyse, design and learn weighting schemes.**",
    "mnemonic": "More matches up, filler down, rare words count, repeats taper",
    "source": [
      "CT4100_Notes_05_Weighting_Schemes",
      "past papers (not in notes)"
    ],
    "sections": [
      {
        "heading": "The idea of axioms",
        "items": [
          "Instead of inventing scoring formulas by trial and error, first write down rules any good formula should obey. These rules are called **axioms** or constraints.",
          "They describe how a document's score should **change** when the document changes: a word added, repeated, or the whole text copied.",
          "A good formula obeys all of them. (Fang, Tao and Zhai, 2004.)"
        ]
      },
      {
        "heading": "The rules in plain words",
        "items": [
          {
            "type": "table",
            "head": [
              "Name",
              "Rule",
              "Why"
            ],
            "rows": [
              [
                "TFC1",
                "More occurrences of a query word score higher",
                "More evidence"
              ],
              [
                "TFC2",
                "Each extra occurrence adds less than the one before",
                "Diminishing returns"
              ],
              [
                "TFC3",
                "With the same total, matching more different query words is better",
                "Covers more of the query"
              ],
              [
                "TDC",
                "Matching a rarer word is worth more",
                "Rare words tell more (idf)"
              ],
              [
                "LNC1",
                "Adding a word not in the query must lower the score",
                "That is irrelevant content"
              ],
              [
                "LNC2",
                "A document copied k times must not score lower than the original",
                "Do not over-punish length"
              ],
              [
                "TF-LNC",
                "Adding another query word must raise the score, even though the document is longer",
                "A match outweighs the length"
              ]
            ]
          },
          "The names stand for term frequency constraint (TFC), term discrimination constraint (TDC) and length normalisation constraint (LNC).",
          "\"How similarity should change when terms are added\": a query word raises it, another word lowers it."
        ]
      },
      {
        "heading": "Which formulas obey the rules",
        "items": [
          "**BM25**: obeys them mostly. Counts rise with diminishing returns, rare words weigh more, and longer documents score lower when b is above 0. One flaw: its idf goes **negative** for words in more than half of documents.",
          "**Raw tf-idf with no length correction**: no diminishing returns (breaks TFC2), no length penalty (breaks LNC1), and doubles on copying.",
          "**Cosine tf-idf**: penalises length, but too much, which can break TF-LNC and LNC2.",
          "**Pivoted**: can break rules if s is large, so the rules tell you the safe range for s.",
          "In an exam, use the rules to explain why log tf, idf and length correction are all needed."
        ]
      },
      {
        "heading": "Why the axiomatic approach helps, and its limits",
        "items": [
          "**Principled**: clear requirements instead of guessing.",
          "**Diagnosis**: shows exactly which rule a formula breaks, and which setting values keep it valid.",
          "**Design**: change the formula until all rules hold.",
          "**Less testing data needed**, and the rules can keep machine-learned formulas sensible.",
          "**Limits**: obeying every rule does not guarantee good results; which rules to include is a judgement; they only cover simple word counting; you still need real testing."
        ]
      }
    ],
    "pitfalls": [
      "Reciting names without stating what each axiom says in terms of adding terms to a document.",
      "Saying axioms guarantee good performance: they are necessary conditions.",
      "Forgetting to relate a concrete scheme (tf-idf or BM25) to the axioms when asked."
    ]
  },
  {
    "id": "text-statistics",
    "title": "Text statistics: tokens/types, Zipf's law, Heaps' law, Luhn",
    "priority": 29,
    "tier": "possible",
    "freq": "0/9 papers directly; supports weighting and index design",
    "marks": "3-5 marks",
    "summary": "**Zipf: frequency × rank is roughly constant (a few words dominate, half the types occur once); Heaps: vocabulary M = k·T^β grows without bound with collection size T (β about 0.4-0.6).**",
    "mnemonic": "Zipf = rank-frequency; Heaps = vocabulary growth",
    "source": [
      "CT4100_Notes_05_Weighting_Schemes"
    ],
    "sections": [
      {
        "heading": "Tokens and types",
        "items": [
          "Token = one occurrence of a word; type = a distinct word. \"the cat sat on the mat\": 6 tokens, 5 types.",
          "A few words are extremely common (the top two can be about 10% of all tokens), while about half of all types appear only once."
        ]
      },
      {
        "heading": "Zipf's law",
        "items": [
          {
            "type": "formula",
            "label": "Zipf",
            "text": "f × r ≈ constant, i.e. f ≈ C / r (more generally f ∝ r^(-α), α ≈ 1): a straight line on a log-log plot. r = rank by frequency, f = frequency."
          },
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Zipf on TREC Volume 3: observed vs C/r",
              "xLabel": "rank",
              "yLabel": "occurrences (millions)",
              "xMin": 1,
              "xMax": 10,
              "yMin": 0,
              "yMax": 8,
              "series": [
                {
                  "name": "observed",
                  "points": [
                    [
                      1,
                      7.4
                    ],
                    [
                      2,
                      3.89
                    ],
                    [
                      3,
                      3.36
                    ],
                    [
                      4,
                      3.32
                    ],
                    [
                      5,
                      2.31
                    ],
                    [
                      6,
                      1.56
                    ],
                    [
                      7,
                      1.31
                    ],
                    [
                      8,
                      1.14
                    ],
                    [
                      9,
                      1.07
                    ],
                    [
                      10,
                      1.03
                    ]
                  ]
                },
                {
                  "name": "C/r with C = 7.4",
                  "points": [
                    [
                      1,
                      7.4
                    ],
                    [
                      2,
                      3.7
                    ],
                    [
                      3,
                      2.47
                    ],
                    [
                      4,
                      1.85
                    ],
                    [
                      5,
                      1.48
                    ],
                    [
                      6,
                      1.23
                    ],
                    [
                      7,
                      1.06
                    ],
                    [
                      8,
                      0.93
                    ],
                    [
                      9,
                      0.82
                    ],
                    [
                      10,
                      0.74
                    ]
                  ]
                }
              ]
            },
            "caption": "Counts from the notes (the, of, to, and, in, is, for, The, that, said). The fit is approximate: the top ten account for about 20% of tokens."
          },
          {
            "type": "p",
            "text": "What this means"
          },
          "The most common words carry little meaning. The rarest are of little use for matching. Words in the middle tell documents apart best (Luhn). The skew also helps compression and is why idf works."
        ]
      },
      {
        "heading": "Heaps' law",
        "items": [
          {
            "type": "formula",
            "label": "Heaps",
            "text": "M = k T^β, M = vocabulary size (types), T = collection size in tokens, typically 10 ≤ k ≤ 100 and 0.4 ≤ β ≤ 0.6."
          },
          "Brown corpus fit: M = 22 T^0.56. Vocabulary never stops growing (misspellings, names, numbers, identifiers). Implication: the dictionary may not fit in memory for large collections; indexes must handle growth."
        ]
      }
    ],
    "pitfalls": [
      "Confusing tokens and types.",
      "Stating Heaps with β > 1: vocabulary grows sublinearly."
    ]
  }
];
