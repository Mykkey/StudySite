module.exports = [
  {
    "id": "learning-to-rank",
    "title": "Learning to rank (pointwise, pairwise, listwise) and neural LTR",
    "priority": 6,
    "tier": "core",
    "freq": "4/9 papers directly (2025-26 both papers: 20 marks each sitting); learning in general 9/9",
    "marks": "10 marks",
    "summary": "**LTR treats ranking as supervised learning over query-document feature vectors with relevance labels; pointwise predicts a score/label per document, pairwise learns which of two documents is better, listwise optimises the whole ranked list (nDCG); neural LTR learns the features from raw text.**",
    "mnemonic": "Point = one doc, Pair = two docs, List = whole ranking",
    "source": [
      "past papers (not in notes)",
      "CT4100_Notes_01_Introduction",
      "CT4100_Notes_08_Web_Search"
    ],
    "sections": [
      {
        "heading": "What learning to rank is, and why",
        "items": [
          "A search engine has many clues that a document is relevant. **Learning to rank (LTR)** means training a model to work out how to combine them, instead of a person guessing the weights.",
          {
            "type": "p",
            "text": "The clues (called features)"
          },
          "**BM25**: a standard score for how well the query words match, worked out separately for the body, title and link text.",
          "How often the words appear (tf), how rare they are (idf), and how long the document is.",
          "**PageRank** or HITS: how important the page is, judged by links to it.",
          "The web address, how often people click it, and how fresh it is.",
          {
            "type": "p",
            "text": "Why it beats hand-tuning"
          },
          "**1.** It can combine hundreds of features, and how they interact.",
          "**2.** It aims directly at the score you care about (such as nDCG or MAP, which measure how good a ranked list is).",
          "**3.** It adapts to new data or languages by retraining.",
          "**4.** It needs less expert effort and can be repeated.",
          "**5.** It can learn from users' clicks.",
          "**Usual set-up**: a fast method (BM25) picks the top 100-1000 documents, then the learned model **re-orders** them.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Query",
                  "sub": "user input"
                },
                {
                  "label": "First-stage retrieval",
                  "sub": "BM25 inverted index, top 1000"
                },
                {
                  "label": "Feature extraction",
                  "sub": "one vector per (q,d) pair"
                },
                {
                  "label": "Learned ranker",
                  "sub": "score f(x)"
                },
                {
                  "label": "Final ranking",
                  "sub": "sorted by score"
                }
              ]
            },
            "caption": "Learning-to-rank as a re-ranking stage."
          }
        ]
      },
      {
        "heading": "The training data",
        "items": [
          "One **training example** is a query, a document, the list of feature values for that pair, and a **relevance label** saying how good the match is.",
          "Example features: BM25 body 7.2, BM25 title 3.1, tf-idf 0.4, PageRank 0.0003, document length 1200, address length 25.",
          "The label is yes/no, or a grade from 0 to 4. It comes from human judges or from clicks (corrected, because people click top results more).",
          "The training set is many queries, each with its own list of judged documents. Public examples: LETOR, MSLR-WEB30K, Yahoo LTR, MS MARCO.",
          {
            "type": "p",
            "text": "Measuring success"
          },
          "**nDCG@k**: graded relevance, with higher positions counting more (the main choice). **MAP**, **MRR**, **P@k** are others (see the Ranked metrics topic).",
          "These measures jump only when documents swap places, so they cannot be improved smoothly step by step. Methods therefore train on a smooth stand-in.",
          "Always test on queries the model has not seen."
        ]
      },
      {
        "heading": "Three paradigms (2025-26 P2 Q3a: loss function and unit of training)",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "Pointwise",
              "Pairwise",
              "Listwise"
            ],
            "rows": [
              [
                "Unit of training",
                "One document (q,d) at a time",
                "A pair of documents for the same query (d_i more relevant than d_j)",
                "The entire ranked list for a query"
              ],
              [
                "Problem type",
                "Regression (predict grade), classification (relevant?) or ordinal regression",
                "Binary classification of pairs: is i above j?",
                "Direct list/metric optimisation"
              ],
              [
                "Loss",
                "Squared error (f(x) - y)^2, cross-entropy",
                "Hinge (RankSVM) or logistic RankNet loss on score differences",
                "Listwise cross-entropy (ListNet), likelihood (ListMLE), or metric-based lambdas (nDCG gain of swapping)"
              ],
              [
                "Example algorithms",
                "Linear/logistic regression, McRank, PRank",
                "RankNet, RankSVM, RankBoost, LambdaRank",
                "ListNet, ListMLE, AdaRank, LambdaMART (strictly pairwise gradients weighted by listwise metric)"
              ],
              [
                "Pros",
                "Simple, scalable, any regressor",
                "Uses relative order, closer to ranking",
                "Closest to the evaluation metric; handles position"
              ],
              [
                "Cons",
                "Ignores relative order and query context; queries with many documents dominate; score calibration across queries irrelevant for ranking",
                "Many pairs (O(n^2)); all pairs weighted equally regardless of rank position; noisy labels",
                "Complex, costly; metric not differentiable"
              ]
            ]
          },
          {
            "type": "formula",
            "label": "RankNet pairwise loss",
            "text": "P(i ▷ j) = 1 / (1 + exp(-(s_i - s_j))), loss = -log P(i ▷ j) when i is truly more relevant. s = model score."
          },
          "Worked: s_i = 2.0, s_j = 1.5 gives P = 0.622, loss 0.474 (small); wrong order s_i = 1.0, s_j = 2.0 gives P = 0.269, loss 1.313 (large). Gradient descent pushes the correctly ordered pair apart.",
          {
            "type": "formula",
            "label": "Pointwise loss (regression)",
            "text": "L = Σ_{(q,d)} (f(x_{q,d}) - y_{q,d})^2. Example: label 3, prediction 2.4 gives loss 0.36."
          },
          "**LambdaRank** and **LambdaMART**: while training on pairs, give more weight to the pairs whose swap would change nDCG the most, so mistakes near the top are fixed first. LambdaMART does this with boosted decision trees and is a classic strong baseline."
        ]
      },
      {
        "heading": "Neural LTR compared with traditional LTR",
        "items": [
          "**Traditional** LTR uses features people design, with simple models (linear, SVM, boosted trees). **Neural** LTR lets a neural network read the query and document text and learn its own features.",
          {
            "type": "table",
            "head": [
              "",
              "Traditional",
              "Neural"
            ],
            "rows": [
              [
                "Features",
                "Designed by hand (BM25, tf, idf, PageRank)",
                "Learned from the raw text"
              ],
              [
                "Meaning of words",
                "Matches exact words only",
                "Understands synonyms, context and word order"
              ],
              [
                "Cost",
                "Cheap and fast, runs on an ordinary processor",
                "Needs graphics cards and long training"
              ],
              [
                "Data needed",
                "A modest amount of labelled data",
                "A lot, or a model pretrained on large text"
              ],
              [
                "Explaining it",
                "Easier: you can inspect the weights",
                "Hard: a black box"
              ],
              [
                "Strength",
                "Good with structured clues",
                "Better when words differ but meaning matches"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Three neural designs"
          },
          "**Cross-encoder**: reads the query and document together. Accurate but slow, so used only to re-order the top results.",
          "**Bi-encoder**: turns query and document into number lists separately, so document lists can be computed in advance. Fast.",
          "**Late interaction** (ColBERT): keeps a number list per word and compares them at the end. In between."
        ]
      },
      {
        "heading": "Limits of learning to rank",
        "items": [
          "It needs **labelled data**: human judgements are expensive and clicks are biased towards whatever was shown first.",
          "It can **overfit** (learn the training queries too well), and fails if real queries differ from the training ones.",
          "Features must be chosen and put on a common scale. Training on pairs or lists costs a lot, and the model needs regular retraining.",
          "It can be hard to explain. A model trained on clicks can reinforce its own past choices."
        ]
      }
    ],
    "pitfalls": [
      "Mixing up unit of training: pointwise = a document, pairwise = a pair of documents, listwise = a list.",
      "Saying \"loss = nDCG\": nDCG is not differentiable; listwise losses are surrogates or lambda weights.",
      "Forgetting to state the training example (query, document, features, label) when the question asks what constitutes one.",
      "Describing neural LTR only as \"more accurate\": the question asks about features, compute and interpretability."
    ]
  },
  {
    "id": "learning-term-weights",
    "title": "Learning in IR: learning term weights (GA/GP, neural nets), learning tasks",
    "priority": 7,
    "tier": "core",
    "freq": "9/9 papers (learning an IR task or term weights: 6-10 marks each)",
    "marks": "6-10 marks",
    "summary": "**Pick one approach (neural network or genetic programming), state the data (queries + documents + relevance judgements), the representation, the learning loop, how fitness/error is computed, how it is tested on unseen queries, and the limitations (labels, overfitting, cost, interpretability).**",
    "mnemonic": "D-R-L-E-L: Data, Representation, Learning rule, Evaluation, Limitations",
    "source": [
      "CT4100_Notes_01_Introduction",
      "CT4100_Notes_08_Web_Search",
      "past papers (not in notes)"
    ],
    "sections": [
      {
        "heading": "What this question asks",
        "items": [
          "The exam asks: suggest a way for a computer to **learn** good weights for words in documents, and discuss its limits.",
          "A **term weight** is how much a word counts when matching a document to a query.",
          "The course lists three ways to learn in search: learning to rank, neural networks, and **evolutionary computation** (programs that improve by trial, selection and mixing). Learn one well and keep a second as backup."
        ]
      },
      {
        "heading": "Approach A: genetic programming",
        "items": [
          "**Genetic programming** evolves a formula the way breeding evolves animals: make many random formulas, keep the best, mix and mutate them, repeat.",
          {
            "type": "p",
            "text": "The ingredients"
          },
          "**Data**: queries with known relevant documents, split into training and test.",
          "**One candidate** is a weighting formula drawn as a tree. Its building blocks are tf, idf, df, document length, constants, and +, -, ×, ÷, log, sqrt. Example: (tf × log(N/df)) / sqrt(document length).",
          "**Fitness** (how good a candidate is): run searches with it and score the results with MAP or nDCG.",
          {
            "type": "p",
            "text": "The loop"
          },
          "**1.** Make 100-500 random formulas. **2.** Score each. **3.** Pick parents, favouring the best. **4.** **Crossover** (swap branches between two formulas) and **mutation** (change a branch at random). **5.** Repeat until scores stop improving.",
          "**Test** the winner on unseen queries against tf-idf and BM25, and check the difference is statistically real.",
          "A simpler **genetic algorithm** only tunes numbers in a fixed formula, such as BM25's k1 and b.",
          {
            "type": "p",
            "text": "Limits"
          },
          "Needs many relevance judgements, overfits, is very slow (each candidate runs many searches), gives different results each run, can produce bloated unreadable formulas, may not beat BM25, and depends on its own settings."
        ]
      },
      {
        "heading": "Approach B: a neural network",
        "items": [
          "**Data**: examples of (query, document, relevant or not), described by features such as tf, idf, document length, word position and whether the word is in the title.",
          "**Model**: a single artificial neuron or a small network that outputs a relevance score or a word weight.",
          "**Learning**: nudge the weights downhill to reduce the error (**gradient descent**), and stop when held-out queries stop improving.",
          {
            "type": "diagram",
            "kind": "layers",
            "data": {
              "title": "Network mapping term features to a weight",
              "layers": [
                4,
                5,
                3,
                1
              ],
              "labels": [
                "Features: tf, idf, doc length, position",
                "Hidden layer",
                "Hidden layer",
                "Term weight / relevance score"
              ]
            },
            "caption": "A small feed-forward network that learns how to combine term features into a term weight."
          },
          {
            "type": "p",
            "text": "Worked update with one pair"
          },
          "Features are (tf, idf, 1/length). Relevant document (3, 2, 0.5), non-relevant (1, 2, 0.2), weights start at (0, 0, 0), step size 0.1.",
          "Both score 0, a tie. Add 0.1 × (relevant - non-relevant) to the weights: new weights (0.2, 0, 0.03).",
          "Now the relevant one scores 0.615 and the other 0.206, so the order is right.",
          "**Limits**: as for approach A, plus it is a black box, needs features designed and scaled, can get stuck in a poor solution, may learn quirks of one collection, and needs retraining when the collection changes."
        ]
      },
      {
        "heading": "Other search tasks that use learning",
        "items": [
          "For each, say what data you have, how it learns, and one limit.",
          {
            "type": "table",
            "head": [
              "Task",
              "Data",
              "How it learns",
              "Limit"
            ],
            "rows": [
              [
                "Ranking",
                "Queries with judged documents or clicks",
                "Learning to rank",
                "Labels are expensive, clicks biased"
              ],
              [
                "Adding query words",
                "Whether each added word helped",
                "A model predicting useful words",
                "Costly to label, query can drift"
              ],
              [
                "Guessing query difficulty",
                "Predictor scores and real results",
                "Regression combining predictors",
                "Few training queries"
              ],
              [
                "Sorting documents into classes",
                "Labelled documents (spam or not)",
                "Naive Bayes, SVM, neural networks",
                "Topics change over time"
              ],
              [
                "Recommending",
                "User ratings",
                "Matrix factorisation (finding hidden taste factors)",
                "New users have no ratings"
              ],
              [
                "Clustering (no labels)",
                "Document vectors",
                "k-means or hierarchical",
                "Choosing the number of groups"
              ]
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "Giving only a generic \"use machine learning\" answer: specify features/representation, the label source and the training procedure.",
      "Omitting limitations (overfitting, label cost, computation, interpretability): asked in every version of this question.",
      "Evaluating on the training queries; always test on unseen queries.",
      "Confusing learning term weights (a scoring function) with learning to rank (combining many features)."
    ]
  },
  {
    "id": "neural-ir",
    "title": "Neural IR, embeddings and term dependence",
    "priority": 27,
    "tier": "likely",
    "freq": "2/9 papers (2025-26 both)",
    "marks": "5 marks (Q1) or part of LTR 10 marks",
    "summary": "**Neural retrievers map queries and documents to dense contextual vectors, so semantically related words (car, automobile) and word order are captured implicitly, unlike bag-of-words models (tf-idf, BM25) that treat terms as independent exact-match tokens.**",
    "mnemonic": "Embeddings = meaning in numbers; BoW = words in a bag",
    "source": [
      "past papers (not in notes)",
      "CT4100_Notes_04_Metrics",
      "CT4100_Notes_06_Relevance_Feedback"
    ],
    "sections": [
      {
        "heading": "Why embeddings capture links between words",
        "items": [
          "An **embedding** is a list of numbers for a word, learned from lots of text (word2vec, GloVe, BERT). Words used in similar surroundings get similar lists, so \"car\" and \"automobile\" end up close even with no shared letters.",
          "**Contextual** models (transformers) give a word a different list depending on its neighbours, so \"bank\" by a river differs from a bank account. Word order and phrases are captured, so words are no longer treated as independent.",
          {
            "type": "p",
            "text": "Compared with bag of words (tf-idf, BM25)"
          },
          "Bag of words ignores order and only matches identical words. But it is fast, easy to explain, needs no training and is still a strong baseline."
        ]
      },
      {
        "heading": "Neural retrieval designs",
        "items": [
          "**Bi-encoder** (dense retrieval): turn query and document into number lists separately; similar lists mean relevant. Document lists are computed in advance, so it is fast, but it can miss exact terms such as codes.",
          "**Cross-encoder**: read query and document together. Very accurate but slow, so only used to re-order BM25's top 100-1000.",
          "**Late interaction** (ColBERT): a list per word, compared at the end. In between.",
          "**Learned sparse** (SPLADE, doc2query): a network adds related words, then an ordinary inverted index is used.",
          "**Hybrid**: combine BM25 with a neural score. The strongest in practice."
        ]
      },
      {
        "heading": "Testing neural search, and cautions",
        "items": [
          "**Benchmarks**: MS MARCO and BEIR (tests unfamiliar subjects). **Measures**: MRR@10, nDCG@10, recall@100.",
          "**Cautions**: heavy computing and data; can do worse than BM25 on new subjects; hard to explain; can reflect biases in training text; simple well-tuned methods have sometimes beaten published neural ones.",
          "**Uses**: question answering and **retrieval-augmented generation (RAG)**: find passages, then a language model writes an answer citing them."
        ]
      }
    ],
    "pitfalls": [
      "Saying neural models \"understand\" language: say they learn distributional semantics from context.",
      "Forgetting to contrast explicitly with the bag-of-words/independence assumption in a \"contrast\" question.",
      "Claiming dense retrieval is always better: BM25 remains a strong baseline and hybrids are common."
    ]
  }
];
