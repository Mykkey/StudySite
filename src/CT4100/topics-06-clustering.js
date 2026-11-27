module.exports = [
  {
    "id": "clustering-algorithms",
    "title": "Clustering: k-means, hierarchical (single/complete/average link), choosing K",
    "priority": 18,
    "tier": "likely",
    "freq": "7/9 papers (clustering approach, evaluation, uses)",
    "marks": "8-9 marks",
    "summary": "**K-means repeats reassign-to-nearest-centroid and recompute-centroids until stable, minimising RSS; hierarchical agglomerative clustering merges the closest two clusters repeatedly, with single (min), complete (max) or average link distance.**",
    "mnemonic": "K-means: Assign, Average, Repeat. HAC: single = chain, complete = compact, average = compromise",
    "source": [
      "CT4100_Notes_09_Clustering"
    ],
    "sections": [
      {
        "heading": "What clustering is",
        "items": [
          "**Clustering** groups documents so those in a group are alike and those in different groups are not. It is **unsupervised**: no labels are given. (**Classification** is supervised: people define the classes.)",
          "The result depends on the number of groups, the similarity measure and how documents are described (usually tf-idf number lists, compared by cosine or distance).",
          {
            "type": "p",
            "text": "Types"
          },
          "**Flat**: split into K groups (k-means). **Hierarchical**: a tree of groups within groups, built bottom-up (**agglomerative**) or top-down (**divisive**).",
          "**Hard**: each document is in one group. **Soft**: it can be in several (sneakers under both \"sports\" and \"shoes\").",
          "We want a sensible number of groups, none tiny or huge, each easy to explain.",
          "Checking every possible grouping is far too slow, so flat methods start with a rough split and improve it. **K-means** is the usual one.",
          "Exam-style prompt: shown a scatter of clearly separate point clouds, suggest an algorithm. Answer: K-means."
        ]
      },
      {
        "heading": "K-means",
        "items": [
          "A **centroid** is the average point of a group. K-means tries to make **RSS** (the sum of squared distances from points to their centroid) as small as possible.",
          "**1.** Choose K documents as starting centroids. **2.** Put each point with the nearest centroid. **3.** Move each centroid to the average of its points. **4.** Repeat 2 and 3 until nothing changes.",
          "It **always stops**, because neither step can increase RSS. But it may stop at a poor answer if the starting points were bad (a **local optimum**).",
          "**Better starts**: remove outliers, spread the starting points (**k-means++**), or run about 10 times and keep the lowest RSS.",
          "**Good**: simple, fast, scales well. **Bad**: you must choose K, sensitive to starts and outliers, assumes round groups, each point in only one group.",
          {
            "type": "code",
            "text": "K-MEANS({x1..xN}, K)\n  (s1..sK) = SELECTRANDOMSEEDS({x1..xN}, K)\n  for k = 1 to K: mu_k = s_k\n  while stopping criterion not met:\n    for k = 1 to K: omega_k = {}\n    for n = 1 to N:\n      j = argmin_j |mu_j - x_n|;  omega_j = omega_j + {x_n}      (reassignment of vectors)\n    for k = 1 to K: mu_k = (1/|omega_k|) * sum of x in omega_k     (recomputation of centroids)\n  return {mu_1..mu_K}"
          },
          {
            "type": "p",
            "text": "The lecture picture"
          },
          "About 20 points, K = 2. The slides alternate \"label each point with its nearest centroid\" and \"move the centroids\" for about seven rounds. Fewer points switch each time until nothing changes.",
          {
            "type": "p",
            "text": "Practice with numbers"
          },
          {
            "type": "table",
            "head": [
              "Point",
              "x",
              "y"
            ],
            "rows": [
              [
                "A",
                "1",
                "1"
              ],
              [
                "B",
                "1.5",
                "2"
              ],
              [
                "C",
                "3",
                "4"
              ],
              [
                "D",
                "5",
                "7"
              ],
              [
                "E",
                "3.5",
                "5"
              ],
              [
                "F",
                "4.5",
                "5"
              ],
              [
                "G",
                "3.5",
                "4.5"
              ]
            ]
          },
          "K = 2, starting at A (1,1) and B (1.5,2).",
          "**Round 1**: only A is nearest A; all the rest are nearer B. New centroids (1,1) and (3.5, 4.583).",
          "**Round 2**: B is now nearer the first centroid (1.12 against 3.27), so it moves. New centroids (1.25, 1.5) and (3.9, 5.1).",
          "**Round 3**: nothing changes, so stop. RSS fell from 20.71 to **8.53**.",
          {
            "type": "diagram",
            "kind": "scatter",
            "data": {
              "title": "K-means result (K = 2)",
              "xLabel": "x",
              "yLabel": "y",
              "xMin": 0,
              "xMax": 6,
              "yMin": 0,
              "yMax": 8,
              "series": [
                {
                  "name": "cluster 1: A, B",
                  "points": [
                    [
                      1,
                      1
                    ],
                    [
                      1.5,
                      2
                    ]
                  ]
                },
                {
                  "name": "cluster 2: C, D, E, F, G",
                  "points": [
                    [
                      3,
                      4
                    ],
                    [
                      5,
                      7
                    ],
                    [
                      3.5,
                      5
                    ],
                    [
                      4.5,
                      5
                    ],
                    [
                      3.5,
                      4.5
                    ]
                  ]
                },
                {
                  "name": "centroids",
                  "points": [
                    [
                      1.25,
                      1.5
                    ],
                    [
                      3.9,
                      5.1
                    ]
                  ]
                }
              ]
            },
            "caption": "Final clusters and centroids (1.25, 1.5) and (3.9, 5.1) from the worked example."
          }
        ]
      },
      {
        "heading": "Hierarchical agglomerative clustering (HAC)",
        "items": [
          "**Algorithm:** start with each document as its own cluster; compute pairwise distances; repeatedly **merge the two closest clusters**; stop at one cluster (or a similarity threshold / K). Record merge distances to draw a **dendrogram**; cut the dendrogram at a level to get clusters. Deterministic, no K needed in advance, gives a hierarchy (good for browsing). Cost O(N^2) memory, O(N^2 log N) time: expensive for large N.",
          {
            "type": "table",
            "head": [
              "Linkage",
              "Distance between clusters",
              "Behaviour"
            ],
            "rows": [
              [
                "Single link",
                "MIN: distance of the closest pair",
                "Chaining: long, straggly clusters; can merge distinct groups via a bridge; good at non-spherical shapes"
              ],
              [
                "Complete link",
                "MAX: distance of the farthest pair",
                "Compact, roughly equal-diameter clusters; sensitive to outliers"
              ],
              [
                "Average link",
                "Mean of all pairwise distances (UPGMA)",
                "Compromise; less sensitive to outliers"
              ],
              [
                "Centroid",
                "Distance between centroids",
                "Can produce inversions"
              ]
            ]
          },
          "Worked example: 1-D points a = 1, b = 2, c = 4, d = 7, e = 11.",
          {
            "type": "table",
            "head": [
              "Step",
              "Single link",
              "Complete link",
              "Average link"
            ],
            "rows": [
              [
                "1",
                "a+b @ 1",
                "a+b @ 1",
                "a+b @ 1"
              ],
              [
                "2",
                "c + {a,b} @ 2 (c to b)",
                "c+d @ 3",
                "c + {a,b} @ 2.5 (avg of 3 and 2)"
              ],
              [
                "3",
                "d + {a,b,c} @ 3 (d to c)",
                "{a,b}+{c,d} @ 6 (a to d)",
                "d+e @ 4 (4 < 4.67 d to {a,b,c})"
              ],
              [
                "4",
                "e + rest @ 4 (e to d)",
                "e + rest @ 10 (a to e)",
                "{a,b,c}+{d,e} @ 6.67 (40/6 pairs)"
              ]
            ]
          },
          {
            "type": "diagram",
            "kind": "tree",
            "data": {
              "root": {
                "label": "single link: all @ 4",
                "children": [
                  {
                    "label": "e",
                    "edge": "4"
                  },
                  {
                    "label": "{a,b,c,d} @ 3",
                    "edge": "3",
                    "children": [
                      {
                        "label": "d"
                      },
                      {
                        "label": "{a,b,c} @ 2",
                        "edge": "2",
                        "children": [
                          {
                            "label": "c"
                          },
                          {
                            "label": "{a,b} @ 1",
                            "edge": "1",
                            "children": [
                              {
                                "label": "a"
                              },
                              {
                                "label": "b"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            },
            "caption": "Single-link dendrogram of a=1, b=2, c=4, d=7, e=11: each point joins the chain (chaining effect). Complete link instead gives {{a,b},{c,d}} then e."
          }
        ]
      },
      {
        "heading": "How many clusters?",
        "items": [
          "Sometimes the task fixes it (a screen could show only 10-20 groups).",
          "You cannot just minimise RSS: with one group per point it is 0.",
          "**Penalty**: charge a cost λ for each cluster and pick the K with the smallest RSS(K) + λK, starting from K = 1. λ must be chosen.",
          "**Knee (elbow)**: plot RSS against K and pick where the curve flattens. The slide's curve suggests 4 or 9.",
          "Other aids: the silhouette score (how well each point fits its group), and cutting a dendrogram where there is a big gap."
        ]
      }
    ],
    "pitfalls": [
      "Forgetting that k-means needs K and is only guaranteed to find a LOCAL optimum.",
      "Mixing up single and complete link (single = min distance = chaining).",
      "In k-means worked examples, forgetting to recompute centroids after reassigning.",
      "Choosing K by minimising RSS (always picks K = N)."
    ]
  },
  {
    "id": "cluster-hypothesis-evaluation",
    "title": "Cluster hypothesis, uses of clustering in IR, and evaluating clusters",
    "priority": 20,
    "tier": "likely",
    "freq": "5/9 papers (cluster evaluation 2022-23, 2023-24 x1, 2025-26 x2; uses in IR 3 papers)",
    "marks": "5-9 marks",
    "summary": "**Cluster hypothesis: closely associated documents tend to be relevant to the same requests; all IR uses of clustering rest on it. Evaluate clusters internally (RSS), externally (purity, Rand index against a gold standard) and by task effectiveness.**",
    "mnemonic": "Relevant docs are neighbours: test with nearest neighbours",
    "source": [
      "CT4100_Notes_09_Clustering",
      "CT4100_Notes_06_Relevance_Feedback"
    ],
    "sections": [
      {
        "heading": "The cluster hypothesis and how to test it",
        "items": [
          "**The claim**: documents that are alike tend to be relevant to the same queries. Relevance feedback relies on the same idea.",
          {
            "type": "p",
            "text": "Nearest-neighbour test (Voorhees)"
          },
          "**1.** Take queries with known relevant documents. **2.** For each relevant document, find its 5 most similar documents (cosine on tf-idf). **3.** Count what share are relevant. **4.** Compare with the share you would get by chance (relevant documents / all documents). Much higher means the claim holds.",
          {
            "type": "p",
            "text": "Overlap test (Jardine and van Rijsbergen)"
          },
          "Compare how similar relevant-relevant pairs are with relevant-irrelevant pairs. If the two barely overlap, the claim holds.",
          "It holds for some queries and not others, so report per query.",
          {
            "type": "p",
            "text": "Why it matters for feedback"
          },
          "If it holds, the average of the relevant documents makes a good new query (Rocchio and similar). If not, that average drifts and can hurt, so use several queries or varied results.",
          {
            "type": "p",
            "text": "When it fails"
          },
          "Ambiguous or multi-part queries (\"jaguar\"), relevance that is not about topic (opinion, quality, date), mixed collections with varied wording, very broad topics, very short documents, or poor first results."
        ]
      },
      {
        "heading": "Uses of clustering in search",
        "items": [
          {
            "type": "p",
            "text": "The four on the slides"
          },
          "**1. Grouping search results**: results are easier to scan.",
          "**2. Scatter-Gather**: browse without typing.",
          "**3. Grouping the whole collection**: explore by topic.",
          "**4. Cluster-based retrieval**: faster search.",
          "All four rely on the cluster hypothesis.",
          {
            "type": "p",
            "text": "Scatter-Gather"
          },
          "The system **scatters** the collection into topic groups. You **gather** the interesting ones, and it scatters just those into finer groups. Repeat until you find what you want.",
          "Tools that grouped web results include Vivisimo, Clusty and Carrot2. Searching \"jaguar\" gives groups for cars, animals and Mac software.",
          {
            "type": "p",
            "text": "What each use needs"
          },
          {
            "type": "table",
            "head": [
              "Use",
              "What is grouped",
              "Benefit",
              "Suitable method"
            ],
            "rows": [
              [
                "Result grouping",
                "Top results of one query",
                "Shows the different meanings",
                "Fast, with readable labels; groups may overlap"
              ],
              [
                "Browsing",
                "Whole collection or part",
                "Explore without typing",
                "Hierarchical, or k-means on the chosen part"
              ],
              [
                "Cluster-based retrieval",
                "Collection, in advance",
                "Compare with centroids first, then search that group; finds related documents with other words",
                "k-means"
              ],
              [
                "Varied suggestions",
                "Words or documents",
                "One suggestion per group",
                "k-means"
              ],
              [
                "Recommenders",
                "Users or items",
                "Search only your group for neighbours",
                "k-means"
              ]
            ]
          },
          "Other uses: finding near-duplicates, tracking news stories, summarising.",
          "**Challenges**: choosing the number of groups, labelling them, changing collections. Big search engines still show a plain ranked list, because it is simple and fast."
        ]
      },
      {
        "heading": "Evaluating a clustering",
        "items": [
          "**Internal measures** use only the data: how tight each group is and how far apart groups are (RSS, silhouette). They do not tell you whether the groups are useful.",
          "**External measures** compare with groups that people defined.",
          {
            "type": "p",
            "text": "Purity"
          },
          {
            "type": "formula",
            "label": "Purity",
            "text": "purity(Ω, C) = (1/N) Σ_k max_j |ω_k ∩ c_j|: for each cluster take the count of its majority class, sum, divide by the total number of points."
          },
          "Worked (17 points, three classes): the biggest class in each of three clusters has 5, 4 and 3 members. Purity = (5+4+3)/17 = **0.71**. One cluster per point gives purity 1, so it cannot be used alone.",
          {
            "type": "p",
            "text": "Rand index: judge every pair of documents"
          },
          {
            "type": "table",
            "head": [
              "Pair of documents",
              "Same cluster",
              "Different clusters"
            ],
            "rows": [
              [
                "Same class",
                "True positive (TP)",
                "False negative (FN)"
              ],
              [
                "Different classes",
                "False positive (FP)",
                "True negative (TN)"
              ]
            ]
          },
          {
            "type": "formula",
            "label": "Rand index (pair counting)",
            "text": "RI = (TP + TN) / (TP + FP + FN + TN) over all N(N-1)/2 document pairs. TP = same class and same cluster; FP = different classes but same cluster; FN = same class but different clusters; TN = different both."
          },
          "Same example: 136 pairs, TP = 20, FP = 20, FN = 24, TN = 72, so (20+72)/136 = **0.68**. Others: F-measure on pairs, normalised mutual information.",
          {
            "type": "p",
            "text": "Does it help the task?"
          },
          "Check whether cluster-based search improves results or speed, whether the cluster hypothesis holds, whether users find things faster, and whether results stay stable with different starting points."
        ]
      }
    ],
    "pitfalls": [
      "Stating the cluster hypothesis without saying how to test it or what follows from it.",
      "Reporting purity alone (trivially maximised by many clusters).",
      "Evaluating clusters only internally; the question usually wants external or task-based evaluation too.",
      "For \"two IR applications\" naming the application but not the clustering algorithm and rationale."
    ]
  },
  {
    "id": "document-similarity-structured",
    "title": "Similarity and clustering of structured documents (scientific articles)",
    "priority": 19,
    "tier": "likely",
    "freq": "5/9 papers (10 marks in 2025-26)",
    "marks": "8-10 marks",
    "summary": "**Combine several similarity sources: per-field tf-idf cosine (title, abstract, keywords, body), citation-based bibliographic coupling from the reference lists, and author/keyword overlap, via a weighted sum; then cluster (HAC or k-means) into topic sub-collections.**",
    "mnemonic": "Fields + Citations + Authors, weighted, then cluster",
    "source": [
      "past papers (not in notes)",
      "CT4100_Notes_08_Web_Search",
      "CT4100_Notes_09_Clustering",
      "CT4100_Notes_01_Introduction"
    ],
    "sections": [
      {
        "heading": "The question (5 papers)",
        "items": [
          "\"Given scientific articles (title, abstract, authors, keywords, main body, bibliography) suggest an approach to measure similarity between documents [and group them into useful sub-clusters / clustering for two IR tasks]\". Typical marks: 8-10."
        ]
      },
      {
        "heading": "Comparing documents part by part",
        "items": [
          "The exam gives articles with a title, abstract, authors, keywords, body and reference list. Compare each part separately, then combine.",
          {
            "type": "p",
            "text": "Text (title, abstract, keywords, body)"
          },
          "Clean the words (lower case, remove very common words, cut to stems), build a tf-idf vector for each part and compare with **cosine similarity**. Titles are short and precise; the body is large and noisy.",
          {
            "type": "p",
            "text": "Keywords"
          },
          "**Jaccard**: shared keywords divided by all different keywords. Add synonyms from a thesaurus.",
          {
            "type": "p",
            "text": "Reference lists"
          },
          "**Bibliographic coupling**: two papers cite the same sources. **Co-citation**: other papers cite the two together. These work even when the papers use different words.",
          {
            "type": "p",
            "text": "Authors"
          },
          "Shared authors suggest shared topics, but weakly (common names, authors who switch topics).",
          {
            "type": "p",
            "text": "Combining"
          },
          "Add the part scores with weights that sum to 1, for example title 0.15, abstract 0.30, keywords 0.15, body 0.15, references 0.20, authors 0.05. Tune the weights on pairs people have judged, or learn them. Put each score on a 0 to 1 scale first.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Parse fields",
                  "sub": "title, abstract, keywords, body, refs, authors"
                },
                {
                  "label": "Pre-process",
                  "sub": "stop words, stemming"
                },
                {
                  "label": "Per-field similarity",
                  "sub": "tf-idf cosine, Jaccard, bibliographic coupling"
                },
                {
                  "label": "Weighted combination",
                  "sub": "sum of w_f x sim_f"
                },
                {
                  "label": "Cluster",
                  "sub": "HAC or k-means on similarity"
                }
              ]
            },
            "caption": "Pipeline for similarity and clustering of scientific articles."
          }
        ]
      },
      {
        "heading": "Grouping the collection, and using the groups",
        "items": [
          "**Which method**: hierarchical clustering gives a browsable tree and works straight from similarity scores. k-means is cheaper for big collections. Soft clustering suits papers covering two fields.",
          "**Steps**: compute similarity between all pairs, cluster, choose the number of groups, **label** each group with its most characteristic words, then check quality.",
          "**Uses**: search groups first then within them, browse by topic, diversify results, recommend related papers, add query words from a group.",
          "**Limits**: weights need tuning, reference lists are hard to read automatically, new papers have few citations, comparing all pairs is slow, and labels can be unclear."
        ]
      }
    ],
    "pitfalls": [
      "Only describing text similarity: the question lists authors, keywords and bibliography to be used.",
      "Not saying how the evidence sources are combined (weights) or how weights are chosen.",
      "Forgetting limitations and evaluation, both usually requested.",
      "Confusing bibliographic coupling (shared references) with co-citation (cited together by others)."
    ]
  }
];
