module.exports = [
  {
    "id": "decision-trees",
    "title": "Decision trees: entropy, information gain, Gini, pruning",
    "priority": 2,
    "tier": "core",
    "freq": "est. high",
    "marks": "10-18 marks",
    "summary": "**A decision tree asks one question at a time. At each step it picks the question that best separates the classes, repeats, and is then trimmed so it does not just memorise.**",
    "mnemonic": "Split to be PURE: pick max Gain (parent impurity minus weighted child impurity)",
    "source": [
      "CT4101_Notes_06_Instance_and_Tree_Based_Learning",
      "CT4101_Notes_07_Ensemble_Methods"
    ],
    "sections": [
      {
        "heading": "Structure and prediction",
        "items": [
          "**Internal node**: a question about one feature.",
          "**Branch**: an answer.",
          "**Leaf**: the final prediction.",
          "To predict, follow one path from the top to a leaf. It reads like a set of if-then rules.",
          "It needs no scaling, handles numbers and categories, and is easy to explain.",
          "**ID3** uses entropy. **C4.5** uses gain ratio and handles numbers and missing values. **CART** uses Gini, splits in two and also does regression."
        ]
      },
      {
        "heading": "Impurity measures",
        "items": [
          "**Impurity** means how mixed a group is. A pure group has only one class.",
          {
            "type": "p",
            "text": "Entropy"
          },
          "0 = pure. 1 = a 50/50 split of two classes.",
          {
            "type": "formula",
            "label": "Entropy of a node",
            "text": "H(S) = - sum_c p_c log2(p_c)   (p_c = proportion of class c; 0 = pure, 1 = 50/50 binary, log2(C) maximum for C classes; take 0 log 0 = 0)"
          },
          {
            "type": "p",
            "text": "Information gain: how much did the split reduce the mix?"
          },
          {
            "type": "formula",
            "label": "Information gain of splitting S on feature A",
            "text": "IG(S, A) = H(S) - sum_v (|S_v| / |S|) x H(S_v)   (parent entropy minus size-weighted child entropy)"
          },
          {
            "type": "p",
            "text": "Gini: another measure of mix"
          },
          "0 = pure. 0.5 = most mixed, with two classes.",
          {
            "type": "formula",
            "label": "Gini impurity",
            "text": "Gini(S) = 1 - sum_c p_c^2   (0 = pure, 0.5 maximum for two classes); gain = Gini(S) - sum_v (|S_v|/|S|) Gini(S_v)"
          },
          "**Catch**: information gain loves features with many values. An ID column looks perfect but is useless.",
          "**Gain ratio** corrects for this.",
          "**Misclassification error** is a third, less sensitive, measure."
        ]
      },
      {
        "heading": "Algorithm (greedy, top-down)",
        "items": [
          "**1.** Stop and make a leaf if the group is pure, no features remain, or a limit is hit.",
          "**2.** Otherwise, work out the gain for each unused feature. For numbers, try cut points.",
          "**3.** Split on the best one.",
          "**4.** Repeat on each branch.",
          "It is **greedy**: it takes the best step now and never goes back, so the tree may not be the best possible."
        ]
      },
      {
        "heading": "Worked example (10 examples)",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Find the entropy and Gini of the whole set, then decide which feature to split on first and build the tree."
            ]
          },
          {
            "type": "table",
            "head": [
              "#",
              "Outlook",
              "Windy",
              "Play"
            ],
            "rows": [
              [
                "1",
                "Sunny",
                "True",
                "No"
              ],
              [
                "2",
                "Sunny",
                "False",
                "No"
              ],
              [
                "3",
                "Sunny",
                "False",
                "No"
              ],
              [
                "4",
                "Sunny",
                "False",
                "Yes"
              ],
              [
                "5",
                "Overcast",
                "True",
                "Yes"
              ],
              [
                "6",
                "Overcast",
                "False",
                "Yes"
              ],
              [
                "7",
                "Overcast",
                "True",
                "Yes"
              ],
              [
                "8",
                "Rain",
                "False",
                "Yes"
              ],
              [
                "9",
                "Rain",
                "True",
                "No"
              ],
              [
                "10",
                "Rain",
                "False",
                "Yes"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Start"
          },
          "6 Yes and 4 No. H = -(0.6 log2 0.6 + 0.4 log2 0.4) = 0.971. Gini = 1 - 0.36 - 0.16 = 0.48.",
          {
            "type": "p",
            "text": "Try splitting on Outlook"
          },
          "Sunny (4 cases: 1 Yes, 3 No): H = 0.811.",
          "Overcast (3 cases: all Yes): H = 0.",
          "Rain (3 cases: 2 Yes, 1 No): H = 0.918.",
          "Weighted: 0.4(0.811) + 0.3(0) + 0.3(0.918) = 0.600.",
          "**IG(Outlook) = 0.971 - 0.600 = 0.371**.",
          {
            "type": "p",
            "text": "Try splitting on Windy"
          },
          "True (4: 2 Yes, 2 No): H = 1.000. False (6: 4 Yes, 2 No): H = 0.918.",
          "Weighted: 0.4(1) + 0.6(0.918) = 0.951.",
          "**IG(Windy) = 0.020**.",
          "Outlook wins, so it goes at the top. Overcast is already pure (Yes).",
          {
            "type": "p",
            "text": "Same check with Gini"
          },
          "Outlook: 0.375, 0, 0.444 give 0.4(0.375) + 0.3(0.444) = 0.283. Gain = 0.48 - 0.283 = 0.197.",
          "Windy: 0.5 and 0.444 give 0.467. Gain = 0.013. Same winner.",
          {
            "type": "p",
            "text": "Next level"
          },
          "**Rain** (2 Yes, 1 No), split on Windy: True is {No}, False is {Yes, Yes}. Both pure. Gain = 0.918.",
          "**Sunny** (1 Yes, 3 No): splitting on Windy gains only 0.123 and stays mixed, so stop and predict No.",
          {
            "type": "diagram",
            "kind": "tree",
            "caption": "Resulting tree: Outlook at the root; Rain is split on Windy; Sunny is a majority-class leaf (3 of 4 are No).",
            "data": {
              "root": {
                "label": "Outlook?",
                "children": [
                  {
                    "label": "No (3 of 4)",
                    "edge": "Sunny"
                  },
                  {
                    "label": "Yes (3 of 3)",
                    "edge": "Overcast"
                  },
                  {
                    "label": "Windy?",
                    "edge": "Rain",
                    "children": [
                      {
                        "label": "No",
                        "edge": "True"
                      },
                      {
                        "label": "Yes",
                        "edge": "False"
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
      },
      {
        "heading": "Overfitting and pruning",
        "items": [
          "Left alone, a tree grows until every leaf is pure. It memorises noise.",
          "Small data changes then give a very different tree.",
          "**Pre-pruning** (stop early): max_depth, min_samples_split, min_samples_leaf, minimum gain.",
          "**Post-pruning** (grow, then trim): remove branches that do not help on validation data (reduced-error or cost-complexity pruning, setting ccp_alpha).",
          "Choose these settings with cross-validation."
        ]
      },
      {
        "heading": "Regression trees",
        "items": [
          "To predict a number, each leaf gives the **average** of its examples.",
          "Splits are chosen to reduce the spread (variance or MSE).",
          "Predictions come in steps, and it cannot predict beyond the range it has seen."
        ]
      },
      {
        "heading": "Strengths, weaknesses, comparison with k-NN",
        "items": [
          "**Good**: readable rules, no scaling, mixed data types, fast predictions, shows which features matter.",
          "**Bad**: unstable, greedy, only straight cuts along one feature (diagonal boundaries need many), favours many-valued features.",
          "Fix with pruning or **ensembles** (random forests, boosting).",
          "**vs k-NN**: k-NN waits until prediction, uses distances, needs scaling and is slow to predict. A tree learns rules up front, needs no scaling and predicts fast."
        ]
      },
      {
        "heading": "Lecture worked example: Anyone for Tennis? (weather data)",
        "items": [
          {
            "type": "task",
            "show": 3,
            "q": [
              "Build the decision tree using information gain."
            ]
          },
          {
            "type": "p",
            "text": "The lecture data: will we play tennis?"
          },
          "14 days. Features: outlook, temperature, humidity, windy. Target: play (9 yes, 5 no). The file is weather.csv on Canvas.",
          {
            "type": "table",
            "head": [
              "ID",
              "Outlook",
              "Temp",
              "Humidity",
              "Windy",
              "Play?"
            ],
            "rows": [
              [
                "A",
                "sunny",
                "hot",
                "high",
                "false",
                "no"
              ],
              [
                "B",
                "sunny",
                "hot",
                "high",
                "true",
                "no"
              ],
              [
                "C",
                "overcast",
                "hot",
                "high",
                "false",
                "yes"
              ],
              [
                "D",
                "rainy",
                "mild",
                "high",
                "false",
                "yes"
              ],
              [
                "E",
                "rainy",
                "cool",
                "normal",
                "false",
                "yes"
              ],
              [
                "F",
                "rainy",
                "cool",
                "normal",
                "true",
                "no"
              ],
              [
                "G",
                "overcast",
                "cool",
                "normal",
                "true",
                "yes"
              ],
              [
                "H",
                "sunny",
                "mild",
                "high",
                "false",
                "no"
              ],
              [
                "I",
                "sunny",
                "cool",
                "normal",
                "false",
                "yes"
              ],
              [
                "J",
                "rainy",
                "mild",
                "normal",
                "false",
                "yes"
              ],
              [
                "K",
                "sunny",
                "mild",
                "normal",
                "true",
                "yes"
              ],
              [
                "L",
                "overcast",
                "mild",
                "high",
                "true",
                "yes"
              ],
              [
                "M",
                "overcast",
                "hot",
                "normal",
                "false",
                "yes"
              ],
              [
                "N",
                "rainy",
                "mild",
                "high",
                "true",
                "no"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Method"
          },
          "**1.** Work out the gain for each unused attribute.",
          "**2.** Choose the highest.",
          "**3.** Split the data on it, and repeat inside each part.",
          "**Entropy** (Shannon, 1948) measures uncertainty, in **bits**. Lowest 0, highest log2 of the number of classes.",
          "Use log base 2. In Excel: LOG(x, 2). The minus sign makes the answer positive.",
          {
            "type": "p",
            "text": "The numbers"
          },
          "Top of tree: Ent([9+,5-]) = -9/14 log2(9/14) - 5/14 log2(5/14) = **0.9403** (Gini 0.459).",
          "Windy false = [6+,2-], entropy **0.8112**. Windy true = [3+,3-], entropy **1.0**.",
          "Gain(Windy) = 0.940 - (6/14)(1.00) - (8/14)(0.811) = **0.048**.",
          {
            "type": "table",
            "head": [
              "Attribute",
              "Partitions [yes+, no-]",
              "Information gain",
              "Gini gain"
            ],
            "rows": [
              [
                "Outlook",
                "sunny [2+,3-], overcast [4+,0-], rainy [3+,2-]",
                "0.247 (best)",
                "0.116"
              ],
              [
                "Humidity",
                "high [3+,4-], normal [6+,1-]",
                "0.152",
                "0.092"
              ],
              [
                "Windy",
                "false [6+,2-], true [3+,3-]",
                "0.048",
                "0.031"
              ],
              [
                "Temp",
                "hot [2+,2-], mild [4+,2-], cool [3+,1-]",
                "0.029",
                "0.019"
              ]
            ]
          },
          "Outlook has the highest gain, so it is the top question. Overcast is all yes.",
          {
            "type": "p",
            "text": "Sunny days (A, B, H, I, K = no, no, no, yes, yes; entropy 0.971)"
          },
          "**Humidity** separates them perfectly: high {A,B,H} all no, normal {I,K} all yes. Gain 0.971.",
          "Temperature gains 0.571, Windy 0.020.",
          {
            "type": "p",
            "text": "Rainy days (D, E, F, J, N = yes, yes, no, yes, no; entropy 0.971)"
          },
          "**Windy** separates them perfectly: false {D,E,J} all yes, true {F,N} all no. Gain 0.971.",
          "Temperature and humidity gain only 0.020.",
          {
            "type": "diagram",
            "kind": "tree",
            "caption": "Final tree for the weather data (entropy / information gain).",
            "data": {
              "root": {
                "label": "Outlook?",
                "children": [
                  {
                    "label": "Humidity?",
                    "edge": "sunny",
                    "children": [
                      {
                        "label": "No",
                        "edge": "high"
                      },
                      {
                        "label": "Yes",
                        "edge": "normal"
                      }
                    ]
                  },
                  {
                    "label": "Yes",
                    "edge": "overcast"
                  },
                  {
                    "label": "Windy?",
                    "edge": "rainy",
                    "children": [
                      {
                        "label": "Yes",
                        "edge": "false"
                      },
                      {
                        "label": "No",
                        "edge": "true"
                      }
                    ]
                  }
                ]
              }
            }
          },
          "**Gini** is the default in scikit-learn: Gini(S) = 1 - sum p_i^2.",
          "Gini gain and information gain both mean: parent's mix minus the weighted mix of the children.",
          "**Root node**: the first split, holding all the data."
        ]
      },
      {
        "heading": "Cost-complexity pruning and using trees in scikit-learn",
        "items": [
          "**Pruning** means cutting branches off a tree so it does not memorise the data.",
          "**Cost-complexity pruning** scores each smaller tree as: R(T) = training error + alpha × number of leaves. Lowest score wins.",
          "alpha is the price of each leaf. Small alpha keeps a big tree, large alpha gives a small one. Choose it by cross-validation.",
          {
            "type": "p",
            "text": "In scikit-learn (the Python library)"
          },
          "Trees need no scaling, but categories must be turned into numbers first.",
          "Missing values are only handled by some versions, so fill them in yourself in a documented way.",
          "`DecisionTreeClassifier(criterion=\"gini\" or \"entropy\", max_depth=4, min_samples_leaf=10, random_state=42)`",
          "`plot_tree` draws it. Leaves with very few examples give shaky explanations, and a split does not show that one thing causes another."
        ]
      },
      {
        "heading": "Decision tree compared with k-NN",
        "items": [
          "**k-NN** (k nearest neighbours) predicts by finding the k most similar stored examples and letting them vote.",
          {
            "type": "table",
            "head": [
              "Property",
              "kNN",
              "Decision tree"
            ],
            "rows": [
              [
                "Training",
                "Store examples",
                "Learn recursive splits"
              ],
              [
                "Prediction",
                "Neighbour search",
                "One root-to-leaf path"
              ],
              [
                "Scaling",
                "Usually essential",
                "Usually unnecessary"
              ],
              [
                "Dimension",
                "Sensitive to irrelevant dimensions",
                "Selects features through splits"
              ],
              [
                "Boundary",
                "Locally flexible",
                "Axis-aligned rectangles"
              ],
              [
                "Interpretation",
                "Example-based",
                "Rule / path-based"
              ],
              [
                "Extrapolation",
                "Poor",
                "Poor (piecewise constant)"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Both have a flexibility dial"
          },
          "**k-NN**: small k is flexible but jumpy. Large k is smooth but can miss detail.",
          "**Tree**: a deep tree is flexible but jumpy. A shallow one is smooth but can miss detail.",
          {
            "type": "p",
            "text": "Comparing them fairly"
          },
          "Use the same cross-validation folds and the same measures. Scale the features for k-NN only.",
          "Do not choose on score alone: consider speed, memory, stability and how easy it is to explain.",
          "**Common mistakes**: not scaling for k-NN, tuning on the test set, different folds, trusting a huge tree picture, reading feature importance as cause."
        ]
      }
    ],
    "pitfalls": [
      "Use log base 2 for entropy.",
      "Weight each child's entropy by its share of the examples.",
      "Do not split again on a category already used on that path.",
      "Gain = parent's entropy minus the weighted children.",
      "Trees do not need feature scaling."
    ]
  },
  {
    "id": "ensembles",
    "title": "Ensemble methods: bagging, random forests, boosting",
    "priority": 11,
    "tier": "likely",
    "freq": "est. medium-high",
    "marks": "8-12 marks",
    "summary": "**Ensembles combine many models: bagging / random forests train independent high-variance trees on bootstrap samples and average them (reduces variance); boosting trains weak learners sequentially, each correcting the previous ones (reduces bias).**",
    "mnemonic": "Bagging = Parallel crowd vote; Boosting = Sequential coaches fixing mistakes",
    "source": [
      "CT4101_Notes_07_Ensemble_Methods"
    ],
    "sections": [
      {
        "heading": "Why ensembles work",
        "items": [
          "Different errors can cancel when averaged; many copies of the same mistake do not help, so **diversity** is needed (different data samples, features, algorithms).",
          "For B models with variance s^2 and average pairwise correlation r: Var(average) = r s^2 + (1 - r) s^2 / B. More models shrink the second term; low correlation shrinks the first.",
          "Example (s^2 = 1, B = 100): r = 0.5 gives 0.505; r = 0.1 gives 0.109. Decorrelating the trees matters more than adding trees.",
          "Combine by majority / soft vote (classification) or averaging (regression); stacking trains a meta-model on base predictions."
        ]
      },
      {
        "heading": "Bagging (bootstrap aggregating)",
        "items": [
          "1. Draw B **bootstrap samples**: n examples sampled **with replacement** from the n training examples.",
          "2. Train one model (typically a deep, unpruned tree) on each sample, independently (parallelisable).",
          "3. Aggregate: vote or average.",
          "Each bootstrap sample contains about 63.2% of distinct examples: P(example in sample) = 1 - (1 - 1/n)^n, tending to 1 - 1/e = 0.632 (n = 5 gives 0.672). The rest (about 36.8%) are **out-of-bag (OOB)**.",
          "**OOB error**: predict each example using only trees that did not train on it, giving a free validation estimate without a hold-out set.",
          "Reduces **variance** of unstable learners (trees); little bias change. Little help for stable, high-bias models."
        ]
      },
      {
        "heading": "Random forest",
        "items": [
          "Bagged trees + **random feature subset at every split** (e.g. sqrt(d) for classification, d/3 for regression) so trees are less correlated and a dominant feature cannot control every tree.",
          "Key hyperparameters: n_estimators (more is rarely harmful, with diminishing returns), max_features, max_depth, min_samples_leaf, bootstrap, n_jobs.",
          "No scaling needed; handles mixed features; robust, strong default; OOB estimate; gives feature importances.",
          "**Impurity importance** (mean decrease in impurity) is cheap but biased towards high-cardinality features; **permutation importance** (drop in score when a feature is shuffled) is model-agnostic but misleading with correlated features.",
          "Cost: lower interpretability than a single tree, more memory and slower prediction."
        ]
      },
      {
        "heading": "Boosting",
        "items": [
          "Sequential: each new **weak learner** (e.g. depth 1-3 tree) focuses on what the ensemble currently gets wrong. Mainly reduces bias; can overfit if run too long.",
          "**AdaBoost**: keep example weights w_i (start 1/n). Train a learner on the weighted data, compute weighted error e, learner weight a = 0.5 ln((1 - e)/e), then multiply weights of misclassified examples by exp(a) and correct ones by exp(-a), and renormalise. Final prediction = sign of sum a_m h_m(x).",
          "**Gradient boosting**: start with a constant prediction F0 (the mean for squared error); at each stage fit a small tree to the **residuals** (negative gradient of the loss) and add it scaled by the learning rate: F_m = F_(m-1) + eta x h_m.",
          "Hyperparameters: number of stages, learning rate eta (smaller = slower but better generalisation, needs more stages), tree depth, subsampling, loss function.",
          "Implementations: scikit-learn GradientBoosting / HistGradientBoosting, XGBoost, LightGBM (speed, regularisation, missing values, categorical support)."
        ]
      },
      {
        "heading": "Worked examples",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "**AdaBoost:** 10 examples, each weight 0.1. The first stump gets 2 wrong. Find the error, the stump weight and the new example weights.",
              "**Gradient boosting:** y = 3, 5, 8. Start from the mean, find the residuals, and make one step with learning rate 0.1."
            ],
            "own": [
              {
                "type": "formula",
                "label": "AdaBoost stump weight",
                "text": "a = 0.5 × ln((1 − e) / e), where e is the weighted error"
              },
              {
                "type": "formula",
                "label": "AdaBoost reweighting",
                "text": "wrong: weight × e^a. right: weight × e^(−a). Then rescale so the weights add to 1."
              }
            ]
          },
          "**AdaBoost weights**: 10 examples, each weight 0.1; the first stump misclassifies 2. Weighted error e = 0.2; a = 0.5 ln(0.8 / 0.2) = 0.5 ln 4 = 0.693.",
          "Misclassified: 0.1 x e^0.693 = 0.1 x 2 = 0.2 each (total 0.4). Correct: 0.1 x 0.5 = 0.05 each (total 0.4). Sum 0.8, so normalise: misclassified 0.25 each, correct 0.0625 each (totals 0.5 and 0.5). The next stump now sees the hard cases as half the total weight.",
          "**Gradient boosting (squared error)**: y = 3, 5, 8. F0 = mean = 5.333. Residuals = -2.333, -0.333, +2.667. Suppose the first tree fits the residuals exactly and eta = 0.1: F1 = 5.333 + 0.1 x residual = 5.100, 5.300, 5.600. Each stage moves a small step towards the targets."
        ]
      },
      {
        "heading": "Comparison",
        "items": [
          {
            "type": "table",
            "head": [
              "Property",
              "Bagging / RF",
              "Boosting"
            ],
            "rows": [
              [
                "Training",
                "Parallel, independent",
                "Sequential, dependent"
              ],
              [
                "Main effect",
                "Reduces variance",
                "Reduces bias (and some variance)"
              ],
              [
                "Base learner",
                "Deep (low-bias, high-variance) trees",
                "Shallow weak learners"
              ],
              [
                "Overfitting risk",
                "Low; more trees do not hurt",
                "Higher; needs early stopping / small eta"
              ],
              [
                "Noise sensitivity",
                "Robust",
                "Can chase noisy labels and outliers"
              ],
              [
                "Tuning",
                "Few hyperparameters, robust defaults",
                "More careful tuning (eta, stages, depth)"
              ],
              [
                "Speed",
                "Parallelisable",
                "Sequential (but fast libraries exist)"
              ]
            ]
          },
          "Versus a single tree: higher accuracy and stability but less interpretable, more compute. Always compare with simpler baselines, report training and prediction time, and use the same folds."
        ]
      },
      {
        "heading": "Why many models can beat one",
        "items": [
          "An **ensemble** combines several models. Each one is called a **base learner**.",
          "It needs three things: **accuracy** (each is better than guessing), **diversity** (they make different mistakes) and **aggregation** (a way to combine them). Copies of the same mistake do not help.",
          {
            "type": "p",
            "text": "Ways to make them differ"
          },
          "Give each a different sample of the data, a different subset of features, use different algorithms, or train them one after another so each fixes earlier errors.",
          "Averaging reduces **variance** (how much predictions swing with the data), but only if the models do not all fail together. Each extra model adds less and costs more.",
          "**Hard voting**: each gives a label and the majority wins. **Soft voting**: average their probabilities, then pick the largest, which needs those probabilities to be trustworthy. Choose weights using validation data."
        ]
      },
      {
        "heading": "Bootstrap and bagging",
        "items": [
          "**Bootstrap sample**: draw n examples from n **with replacement**, so some appear twice and some not at all. Drawing 2, 5, 2, 1, 5 from examples 1 to 5 repeats 2 and 5 and leaves out 3 and 4. Those left out are **out-of-bag (OOB)**.",
          "**Bagging**: **1.** make many bootstrap samples, **2.** train one model on each, **3.** let each predict, **4.** vote or average, **5.** evaluate the whole thing.",
          "Deep trees suit bagging: each is flexible but unstable, and averaging steadies them. Bagging cannot fix a mistake that every model makes.",
          "`BaggingClassifier(estimator=DecisionTreeClassifier(), n_estimators=200, bootstrap=True)`: 200 trees, each on its own sample."
        ]
      },
      {
        "heading": "Random forests",
        "items": [
          "A **random forest** is bagged trees with one extra step: at each split only a random few features are considered. This stops one strong feature dominating every tree, so the trees differ more.",
          {
            "type": "p",
            "text": "Settings"
          },
          "`n_estimators`: number of trees. Add more until the score stops changing.",
          "`max_features`: fewer gives more variety but weaker splits.",
          "`max_depth` and minimum leaf size: how detailed each tree is.",
          "`class_weight`: makes errors on a class count more, but does not replace careful evaluation.",
          "No scaling needed; categories must be turned into numbers.",
          "**OOB score**: test each example using only the trees that never saw it. A handy check, but not a replacement for a test set.",
          {
            "type": "p",
            "text": "Feature importance"
          },
          "**Impurity importance** (built in, fast) favours features with many possible split points.",
          "**Permutation importance**: shuffle one feature in unseen data and see how much the score drops.",
          "Features that carry the same information can share or hide each other's importance.",
          {
            "type": "p",
            "text": "Strengths and limits"
          },
          "Strong on tables with little preparation. But big, slower to predict, hard to read, and cannot predict beyond the values it has seen."
        ]
      },
      {
        "heading": "Boosting",
        "items": [
          "**Boosting** trains models one after another, each concentrating on what is still wrong. It mainly reduces **bias** (being too simple). Bagging trains them separately and mainly reduces variance.",
          "The models are **weak learners**: shallow trees that each capture one small pattern. The **learning rate** sets how much each one counts.",
          "**AdaBoost**: fit a weak model, give more weight to the cases it got wrong, fit the next, then combine by weighted vote.",
          "**Gradient boosting**: start with one constant guess, then repeatedly fit a small tree to the remaining errors and add a scaled-down version of it.",
          {
            "type": "formula",
            "label": "Additive model",
            "text": "F_m(x) = F_(m-1)(x) + eta x h_m(x)   (F_(m-1) = current ensemble prediction, eta = learning rate controlling update size, h_m = new weak learner fitted to the current error signal)"
          },
          {
            "type": "p",
            "text": "Settings"
          },
          "A large learning rate learns fast but can overshoot. A small one needs more trees. Tune the two together.",
          "A **stump** is a tree with one split. Shallow trees are the usual choice; deep ones overfit more easily.",
          "`GradientBoostingClassifier(n_estimators=200, learning_rate=0.05, max_depth=2, subsample=0.8)`: `subsample` below 1 trains each tree on a random part of the data.",
          "**Histogram gradient boosting** groups numbers into bins to run faster on big data, and can handle missing values and categories.",
          "**Early stopping**: stop adding trees when validation loss stops improving.",
          "**Good**: very strong on tables. **Bad**: slower to train, fussy to tune, sensitive to noise and outliers, hard to read."
        ]
      },
      {
        "heading": "Comparing the ensembles and using them responsibly",
        "items": [
          {
            "type": "table",
            "head": [
              "Property",
              "Bagging",
              "Random forest",
              "Gradient boosting"
            ],
            "rows": [
              [
                "Training",
                "Parallel resamples",
                "Parallel + random features",
                "Sequential corrections"
              ],
              [
                "Main effect",
                "Reduce variance",
                "Reduce variance + tree correlation",
                "Reduce bias"
              ],
              [
                "Base learner",
                "Any unstable learner",
                "Decision trees",
                "Weak (shallow) trees"
              ],
              [
                "Scaling",
                "Model dependent",
                "Usually unnecessary",
                "Usually unnecessary"
              ],
              [
                "Tuning sensitivity",
                "Moderate",
                "Moderate",
                "Higher"
              ],
              [
                "Interpretability",
                "Reduced",
                "Reduced",
                "Reduced"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Probabilities and explanations"
          },
          "A forest's probabilities are averages and may need **calibration** (adjusting so that \"80%\" means right 80% of the time). Pick thresholds on validation data using the costs of mistakes.",
          "Feature importance describes the model, not cause and effect. Use permutation importance, **partial dependence** plots (how the prediction changes as one feature varies), checks on individual predictions and on groups of errors.",
          "Compare fairly: same folds, same measures, plus training time, prediction time and size.",
          {
            "type": "p",
            "text": "Common mistakes"
          },
          "Thinking more trees is always better; treating OOB as the test set; believing boosting cannot overfit; treating importance as an explanation; ignoring calibration, speed and risk; searching huge numbers of settings with no plan.",
          {
            "type": "p",
            "text": "Module interim review (Week 7) expects"
          },
          "A project that runs from a clean setup, earlier baselines kept, at least one random forest and one justified boosting model, the same cross-validation for all, error and timing comparisons, updated logs, and a preferred model with evidence, trade-offs and next steps."
        ]
      }
    ],
    "pitfalls": [
      "Saying bagging reduces bias (it mainly reduces variance).",
      "Sampling without replacement for bootstrap.",
      "Claiming random forests need feature scaling or cannot overfit at all.",
      "Treating impurity importance as causal or unbiased.",
      "Forgetting that boosting is sequential so it cannot be trivially parallelised across stages."
    ]
  }
];
