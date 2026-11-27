module.exports = [
  {
    "id": "linear-regression",
    "title": "Linear regression: least squares, gradient descent, assumptions, Ridge/Lasso",
    "priority": 3,
    "tier": "core",
    "freq": "est. high",
    "marks": "10-15 marks",
    "summary": "**Linear regression predicts a number by adding up weighted features. It picks the weights that make the squared misses as small as possible.**",
    "mnemonic": "LINE: Least squares, Intercept, Normal equation, Errors squared",
    "source": [
      "CT4101_Notes_05_Linear_Logistic_Regression"
    ],
    "sections": [
      {
        "heading": "Model",
        "items": [
          "One feature: y_hat = w0 + w1 x.",
          "**w0** (intercept): the prediction when x = 0.",
          "**w1** (slope): how much the prediction changes when x goes up by 1.",
          "Many features: y_hat = w0 + w1x1 + ... + wd xd, or Xw in matrix form.",
          "**Residual** = real value minus prediction.",
          "Categories become 0/1 columns, compared with a reference category.",
          "An **interaction** (x1 x2) lets one feature's effect depend on another.",
          "A coefficient means: change in prediction per unit, holding the rest fixed. It is a link, **not cause**.",
          "Its size depends on units, so size alone is not importance.",
          "**Example**: 12 + 2.5 × temperature. At 20 degrees: 12 + 2.5 × 20 = 62."
        ]
      },
      {
        "heading": "Loss and least squares",
        "items": [
          "\"**Least squares**\" means: make the sum of squared misses as small as possible.",
          {
            "type": "formula",
            "label": "Sum of squared errors / MSE",
            "text": "SSE = sum (y_i - y_hat_i)^2 ; MSE = SSE / n ; fit = choose w to minimise SSE"
          },
          {
            "type": "p",
            "text": "One feature: direct formula"
          },
          {
            "type": "formula",
            "label": "Simple regression closed form",
            "text": "w1 = Sxy / Sxx = sum (x_i - x_mean)(y_i - y_mean) / sum (x_i - x_mean)^2 ; w0 = y_mean - w1 x_mean"
          },
          {
            "type": "p",
            "text": "Many features: the normal equation"
          },
          {
            "type": "formula",
            "label": "Normal equation (multiple)",
            "text": "w = (X^T X)^(-1) X^T y   (needs X^T X invertible; fails or is unstable with collinear features)"
          },
          "Why square? Misses cannot cancel, big ones count more, and there is one clear best answer.",
          "The downside: sensitive to outliers.",
          "The direct formula is exact but slow with many features. Gradient descent scales better."
        ]
      },
      {
        "heading": "Worked example: least squares",
        "items": [
          "Data: x = 1,2,3,4,5 and y = 2,4,5,4,5. Averages: x = 3, y = 4.",
          "**Sxy** = (-2)(-2) + (-1)(0) + (0)(1) + (1)(0) + (2)(1) = 6.",
          "**Sxx** = 4 + 1 + 0 + 1 + 4 = 10.",
          "w1 = 6 / 10 = **0.6**. w0 = 4 - 0.6 × 3 = **2.2**.",
          "Model: y_hat = 2.2 + 0.6x.",
          "Predictions: 2.8, 3.4, 4.0, 4.6, 5.2. Residuals: -0.8, 0.6, 1.0, -0.6, -0.2.",
          "SSE = 0.64 + 0.36 + 1.00 + 0.36 + 0.04 = 2.4. MSE = 0.48. RMSE = 0.693.",
          "SST = 4 + 0 + 1 + 0 + 1 = 6. R squared = 1 - 2.4/6 = **0.60**.",
          {
            "type": "diagram",
            "kind": "scatter",
            "caption": "Data points and the least-squares line y_hat = 2.2 + 0.6x (dense dots).",
            "data": {
              "title": "Least-squares fit",
              "xLabel": "x",
              "yLabel": "y",
              "xMin": 0,
              "xMax": 6,
              "yMin": 0,
              "yMax": 6,
              "series": [
                {
                  "name": "Data (x, y)",
                  "points": [
                    [
                      1,
                      2
                    ],
                    [
                      2,
                      4
                    ],
                    [
                      3,
                      5
                    ],
                    [
                      4,
                      4
                    ],
                    [
                      5,
                      5
                    ]
                  ]
                },
                {
                  "name": "Fitted line",
                  "points": [
                    [
                      0.5,
                      2.5
                    ],
                    [
                      1,
                      2.8
                    ],
                    [
                      1.5,
                      3.1
                    ],
                    [
                      2,
                      3.4
                    ],
                    [
                      2.5,
                      3.7
                    ],
                    [
                      3,
                      4
                    ],
                    [
                      3.5,
                      4.3
                    ],
                    [
                      4,
                      4.6
                    ],
                    [
                      4.5,
                      4.9
                    ],
                    [
                      5,
                      5.2
                    ],
                    [
                      5.5,
                      5.5
                    ]
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "heading": "Gradient descent",
        "items": [
          "**Gradient descent**: start with a guess, then take small steps downhill until the error stops falling.",
          "**alpha** (learning rate) is the step size.",
          {
            "type": "formula",
            "label": "Update rule",
            "text": "w_j <- w_j - alpha x dJ/dw_j   (alpha = learning rate)"
          },
          {
            "type": "formula",
            "label": "Gradients for J = (1/n) sum (y_hat - y)^2",
            "text": "dJ/dw0 = (2/n) sum (y_hat_i - y_i) ; dJ/dw1 = (2/n) sum (y_hat_i - y_i) x_i"
          },
          "Too big a step: it overshoots. Too small: very slow. Scale the features.",
          "**Batch** uses all data per step, **stochastic** one example, **mini-batch** a few (usual choice).",
          {
            "type": "p",
            "text": "One step by hand"
          },
          "Start w0 = w1 = 0, alpha = 0.01. All predictions are 0.",
          "Errors (prediction - real): -2, -4, -5, -4, -5. J = 17.2.",
          "dJ/dw0 = (2/5)(-20) = -8.",
          "dJ/dw1 = (2/5)(-2 -8 -15 -16 -25) = (2/5)(-66) = -26.4.",
          "w0 = 0 - 0.01(-8) = 0.08. w1 = 0 - 0.01(-26.4) = 0.264.",
          "New J = 10.49, down from 17.2. Repeating reaches w0 = 2.2, w1 = 0.6."
        ]
      },
      {
        "heading": "Assumptions and diagnostics",
        "items": [
          {
            "type": "p",
            "text": "What the model assumes"
          },
          "**Linearity**: the average of y follows a straight-line form. A curved residual plot says no.",
          "**Independent errors**: rows do not influence each other.",
          "**Constant spread**: a funnel-shaped plot says no.",
          "**Normal errors**: matters mainly for small-sample statistics, not prediction.",
          "**No strong multicollinearity**: features that move together make coefficients unstable.",
          {
            "type": "p",
            "text": "Odd points"
          },
          "**Outlier**: a large miss. **High leverage**: an unusual x. **Influential**: it moves the fitted line.",
          "Investigate them, do not just delete. Do not predict far outside the data."
        ]
      },
      {
        "heading": "Regularisation: Ridge, Lasso, Elastic Net",
        "items": [
          "**Regularisation** adds a penalty for large weights, to stop the model overreacting to the data.",
          {
            "type": "p",
            "text": "Ridge: shrinks all weights"
          },
          {
            "type": "formula",
            "label": "Ridge (L2)",
            "text": "J = MSE + lambda x sum w_j^2   (shrinks all weights towards zero, none exactly zero; closed form w = (X^T X + lambda I)^(-1) X^T y)"
          },
          {
            "type": "p",
            "text": "Lasso: can set weights to exactly zero"
          },
          "So it also picks features.",
          {
            "type": "formula",
            "label": "Lasso (L1)",
            "text": "J = MSE + lambda x sum |w_j|   (can set weights exactly to zero: built-in feature selection, sparse model)"
          },
          {
            "type": "p",
            "text": "Elastic Net: a mix of both"
          },
          {
            "type": "formula",
            "label": "Elastic Net",
            "text": "J = MSE + lambda [ r sum |w_j| + (1 - r)/2 sum w_j^2 ]   (mix of L1 sparsity and L2 stability)"
          },
          "**lambda** sets the strength: 0 = ordinary regression, large = very simple model. Choose by cross-validation (RidgeCV, LassoCV).",
          "**Standardise features first**. The intercept is not penalised.",
          "Ridge shares weight among related features. Lasso picks one of them fairly arbitrarily.",
          "A zero Lasso weight does not prove a feature is useless."
        ]
      },
      {
        "heading": "Lecture detail (Week 5)",
        "items": [
          {
            "type": "p",
            "text": "Why start here (Week 5)"
          },
          "It is **fast**, **readable** and often **competitive**.",
          "If a complex model is not clearly better, keep this one.",
          {
            "type": "p",
            "text": "Data layout"
          },
          "In the table X, rows are examples and columns are features. How you prepare data decides what each coefficient means.",
          "Assumptions matter differently for **predicting** and for **explaining**.",
          {
            "type": "p",
            "text": "Reading the residual plot"
          },
          "Random cloud: fine. Curve: missing shape or interaction. Funnel: uneven spread.",
          {
            "type": "p",
            "text": "Multicollinearity signs and fixes"
          },
          "**Signs**: coefficients jump between folds, odd signs, great uncertainty. Predictions may still be fine.",
          "**Fixes**: drop or combine features, regularise, reduce dimensions.",
          {
            "type": "p",
            "text": "Cautions when interpreting"
          },
          "It depends on which features are included, and leaving one out changes the others.",
          "\"One unit more\" may be unrealistic.",
          "Category coefficients depend on the reference category.",
          "Interactions change what the main effects mean.",
          "Scaling changes the size of coefficients. Unscaled means per raw unit, standardised means per standard deviation.",
          "Predicting well does not show that changing x changes y.",
          "Check stability across folds, penalty strengths and resamples.",
          {
            "type": "p",
            "text": "Practical points"
          },
          "`make_pipeline(preprocessor, RidgeCV(alphas=[0.01, 0.1, 1, 10, 100]))`",
          "Elastic Net's l1_ratio sets the mix. Use it with many related features.",
          "Report MAE, RMSE, R squared and residual plots, against a `DummyRegressor`.",
          "Prediction intervals need extra methods.",
          "**Common mistakes**: causal language, unscaled penalties, predicting outside the data, choosing settings on the test set, ignoring interactions."
        ]
      }
    ],
    "pitfalls": [
      "Square the misses, or positives and negatives cancel.",
      "Say whether you divide by n or n-1.",
      "Scale features before Ridge, Lasso or gradient descent.",
      "A coefficient does not show cause.",
      "R squared on training data does not show it will work on new data."
    ]
  },
  {
    "id": "logistic-regression",
    "title": "Logistic regression: sigmoid, odds, decision boundary, log-loss",
    "priority": 4,
    "tier": "core",
    "freq": "est. high",
    "marks": "10-15 marks",
    "summary": "**Logistic regression predicts the probability of \"yes\". It makes a straight-line score, then squashes it into the range 0 to 1.**",
    "mnemonic": "SLOG: Sigmoid squashes, Linear score, Odds ratio, Gradient on log-loss",
    "source": [
      "CT4101_Notes_05_Linear_Logistic_Regression",
      "CT4101_Notes_09_Neural_Networks"
    ],
    "sections": [
      {
        "heading": "Why not linear regression for classes",
        "items": [
          "A straight line can give values below 0 or above 1, which cannot be probabilities.",
          "Despite its name, logistic regression is a **classifier**."
        ]
      },
      {
        "heading": "Model",
        "items": [
          {
            "type": "p",
            "text": "Step 1: score, then squash with the sigmoid"
          },
          {
            "type": "formula",
            "label": "Score and sigmoid",
            "text": "z = w0 + w1x1 + ... + wd xd ;  p = sigma(z) = 1 / (1 + e^(-z)) = P(y = 1 | x)"
          },
          "z = 0 gives p = 0.5. Large z gives nearly 1. Very negative z gives nearly 0.",
          "sigma(-z) = 1 - sigma(z).",
          {
            "type": "p",
            "text": "Odds"
          },
          "**Odds** = chance of yes divided by chance of no.",
          {
            "type": "formula",
            "label": "Odds and log-odds (logit)",
            "text": "odds = p / (1 - p) ;  ln( p / (1 - p) ) = w0 + w . x"
          },
          {
            "type": "p",
            "text": "Deciding"
          },
          "Predict \"yes\" if p ≥ 0.5, which is the same as z ≥ 0.",
          "The **boundary** w0 + w.x = 0 is a straight line (or flat surface).",
          "For curved boundaries, add squared or combined features.",
          "**Odds ratio**: exp(w) is how much the odds multiply when that feature rises by 1.",
          "Example: weight on age 0.12 gives exp(0.12) = 1.13, so 13% higher odds per year.",
          "The 0.5 threshold is a choice. Pick it on validation data using error costs."
        ]
      },
      {
        "heading": "Loss: log-loss (binary cross-entropy)",
        "items": [
          "**Log-loss** measures how bad the probabilities are.",
          {
            "type": "formula",
            "label": "Log-loss",
            "text": "L = -(1/n) sum [ y_i ln(p_i) + (1 - y_i) ln(1 - p_i) ]"
          },
          "Right and confident: near 0. Confidently wrong: huge (p = 0.01 for a true \"yes\" costs 4.6).",
          "There is one best set of weights, but no direct formula, so it is found step by step (gradient descent, L-BFGS, saga).",
          "The gradient looks like linear regression's: dL/dw_j = (1/n) sum (p_i - y_i) x_ij, and dL/dw0 = (1/n) sum (p_i - y_i).",
          "Making the data most likely is the same as making log-loss smallest."
        ]
      },
      {
        "heading": "Worked example",
        "items": [
          "Model: z = -4 + 1.0 x, where x = hours studied. The boundary is at 4 hours.",
          {
            "type": "table",
            "head": [
              "x",
              "y",
              "z",
              "p = sigma(z)",
              "loss -ln(p or 1-p)"
            ],
            "rows": [
              [
                "2",
                "0",
                "-2",
                "0.1192",
                "0.1269"
              ],
              [
                "3",
                "0",
                "-1",
                "0.2689",
                "0.3133"
              ],
              [
                "5",
                "1",
                "1",
                "0.7311",
                "0.3133"
              ],
              [
                "6",
                "1",
                "2",
                "0.8808",
                "0.1269"
              ]
            ]
          },
          "Average log-loss = (0.1269 + 0.3133 + 0.3133 + 0.1269) / 4 = **0.2201**. All 4 are classed correctly.",
          "Odds ratio = e^1 = 2.718: each extra hour multiplies the odds of passing by 2.7.",
          "At x = 5, odds = 0.7311 / 0.2689 = 2.718.",
          {
            "type": "p",
            "text": "One gradient step (alpha = 0.5)"
          },
          "Errors p - y: 0.1192, 0.2689, -0.2689, -0.1192.",
          "dL/dw0 = 0.",
          "dL/dw1 = (0.2384 + 0.8067 - 1.3445 - 0.7152) / 4 = -0.2537.",
          "w0 stays -4. w1 = 1 - 0.5(-0.2537) = 1.1268.",
          "New log-loss 0.2077, down from 0.2201.",
          {
            "type": "diagram",
            "kind": "line",
            "caption": "Sigmoid for z = -4 + x: probability crosses 0.5 at x = 4 (decision boundary).",
            "data": {
              "title": "P(y = 1 | x) = sigmoid(-4 + x)",
              "xLabel": "Hours studied x",
              "yLabel": "Probability",
              "xMin": 0,
              "xMax": 8,
              "yMin": 0,
              "yMax": 1,
              "series": [
                {
                  "name": "Sigmoid",
                  "points": [
                    [
                      0,
                      0.018
                    ],
                    [
                      1,
                      0.047
                    ],
                    [
                      2,
                      0.119
                    ],
                    [
                      3,
                      0.269
                    ],
                    [
                      4,
                      0.5
                    ],
                    [
                      5,
                      0.731
                    ],
                    [
                      6,
                      0.881
                    ],
                    [
                      7,
                      0.953
                    ],
                    [
                      8,
                      0.982
                    ]
                  ]
                }
              ],
              "hlines": [
                {
                  "y": 0.5,
                  "label": "Threshold 0.5"
                }
              ]
            }
          }
        ]
      },
      {
        "heading": "Regularisation, multiclass, imbalance",
        "items": [
          "scikit-learn adds an L2 penalty by default. **C = 1/lambda**, so a smaller C shrinks more.",
          "An L1 penalty (saga or liblinear) sets some weights to zero. Scale features first.",
          "**More than two classes**: **softmax** gives one probability per class, adding to 1. **One-vs-rest** builds one yes/no model per class.",
          "**Imbalanced classes**: class weights penalise rare-class mistakes more. Then choose the threshold from precision and recall.",
          "No single setting \"solves\" imbalance.",
          "**Good**: simple, fast, gives probabilities, readable, strong baseline.",
          "**Bad**: straight boundary, upset by related features and leakage, needs engineered features for curves."
        ]
      },
      {
        "heading": "Linear vs logistic summary",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "Linear regression",
              "Logistic regression"
            ],
            "rows": [
              [
                "Target",
                "Continuous number",
                "Binary (or multiclass) category"
              ],
              [
                "Output",
                "y_hat = w.x (unbounded)",
                "p = sigmoid(w.x) in (0, 1)"
              ],
              [
                "Loss",
                "Squared error (MSE)",
                "Log-loss (cross-entropy)"
              ],
              [
                "Solution",
                "Closed form or gradient descent",
                "Iterative only"
              ],
              [
                "Metrics",
                "MAE, RMSE, R squared, residuals",
                "Confusion matrix, precision/recall, ROC, log-loss"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Lecture detail (Week 5)",
        "items": [
          {
            "type": "p",
            "text": "Why not linear regression for yes/no"
          },
          "**Range**: it can go below 0 or above 1.",
          "**Errors**: they are not evenly spread or bell-shaped.",
          "**Shape**: we need a probability tied to a straight boundary.",
          {
            "type": "p",
            "text": "Three separate jobs"
          },
          "The **model** gives a probability. The **threshold** turns it into a class. The **costs** decide which mistake matters more.",
          "Never tune the threshold on the test set.",
          {
            "type": "p",
            "text": "Code"
          },
          "`LogisticRegression(C=1.0, max_iter=1000)`.",
          "`predict_proba(X)[:, 1]` gives the probability of \"yes\", and `pred = prob >= 0.5`.",
          "Elastic Net needs a compatible solver such as saga. Choose C by cross-validation.",
          "`class_weight` changes what the model optimises, not reality.",
          "Defaults depend on the library version.",
          {
            "type": "p",
            "text": "Comparing the two workflows"
          },
          "**Regression**: number target. MAE, RMSE, R squared, residuals.",
          "**Classification**: category target. Log loss, ROC or PR, calibration, confusion matrix, threshold.",
          "Both need protected testing, baselines and no leakage.",
          {
            "type": "p",
            "text": "Portfolio baseline"
          },
          "Fit the model with your Week 3 preparation and Week 4 testing, compare with a dummy, report main and extra measures with their variation, explain a few coefficients, and try one regularised version."
        ]
      }
    ],
    "pitfalls": [
      "The sigmoid is 1 / (1 + e to the minus z).",
      "The boundary is p = 0.5 (z = 0), not p = 0.",
      "A weight changes the log-odds, not the probability directly.",
      "Do not tune the threshold or C on the test set.",
      "Scale features before regularised or step-by-step fitting."
    ]
  },
  {
    "id": "knn",
    "title": "k-nearest neighbours (instance-based learning)",
    "priority": 7,
    "tier": "core",
    "freq": "est. high",
    "marks": "8-12 marks",
    "summary": "**k-NN stores the training data and predicts for a query by taking the k closest examples (by a distance such as Euclidean) and voting (classification) or averaging (regression); it needs scaled features and a tuned k, and is slow at prediction time.**",
    "mnemonic": "k-NN = ask your k neighbours",
    "source": [
      "CT4101_Notes_06_Instance_and_Tree_Based_Learning",
      "CT4101_Notes_03_Data_Prep_Feature_Engineering"
    ],
    "sections": [
      {
        "heading": "Idea",
        "items": [
          "**Instance-based (lazy) learning**: no explicit model is built; computation is deferred until prediction. A **non-parametric** method for classification and regression.",
          "Assumption: similar inputs have similar outputs, so the feature space and distance must express similarity.",
          "Training = store the examples (cheap). Prediction = compute distance to all n stored examples, find k smallest, aggregate (expensive: O(n d) per query by brute force; KD-trees / ball trees help in low dimension)."
        ]
      },
      {
        "heading": "Distance measures",
        "items": [
          {
            "type": "formula",
            "label": "Euclidean (L2)",
            "text": "d(a, b) = sqrt( sum_j (a_j - b_j)^2 )   (straight line)"
          },
          {
            "type": "formula",
            "label": "Manhattan (L1)",
            "text": "d(a, b) = sum_j |a_j - b_j|   (axis-aligned steps; cheaper, less outlier-sensitive)"
          },
          {
            "type": "formula",
            "label": "Minkowski",
            "text": "d(a, b) = ( sum_j |a_j - b_j|^p )^(1/p)   (p = 1 Manhattan, p = 2 Euclidean)"
          },
          "Others: cosine similarity (direction, text), Hamming / Jaccard (binary or categorical).",
          "Example: a = (5.00, 2.50), b = (2.75, 7.50): Manhattan = 2.25 + 5.00 = 7.25; Euclidean = sqrt(5.0625 + 25) = 5.48."
        ]
      },
      {
        "heading": "Algorithm",
        "items": [
          "1. Choose k and a distance; scale features.",
          "2. Compute the distance from the query to every training example.",
          "3. Select the k nearest.",
          "4. Classification: majority vote (optionally weighted); regression: mean (or weighted mean) of their targets; neighbour proportions give a class probability.",
          "5. Break ties by odd k, by reducing k, or by choosing the nearest neighbour's class.",
          {
            "type": "formula",
            "label": "Distance-weighted vote and regression",
            "text": "weight w_i = 1 / d_i^2 (or 1/d) ; class score = sum of weights of neighbours in that class ; regression y_hat = sum(w_i y_i) / sum(w_i)"
          }
        ]
      },
      {
        "heading": "Worked example: query q = (3, 3)",
        "items": [
          {
            "type": "table",
            "head": [
              "Point",
              "Coordinates",
              "Class",
              "Euclidean distance to q",
              "Rank"
            ],
            "rows": [
              [
                "P6",
                "(2, 3)",
                "A",
                "1.000",
                "1"
              ],
              [
                "P3",
                "(4, 4)",
                "B",
                "1.414",
                "2"
              ],
              [
                "P4",
                "(3, 5)",
                "B",
                "2.000",
                "3"
              ],
              [
                "P2",
                "(2, 1)",
                "A",
                "2.236",
                "4"
              ],
              [
                "P1",
                "(1, 1)",
                "A",
                "2.828",
                "5"
              ],
              [
                "P5",
                "(6, 3)",
                "B",
                "3.000",
                "6"
              ]
            ]
          },
          "**k = 1**: nearest is P6, so class A.",
          "**k = 3** (P6 A, P3 B, P4 B): unweighted vote B = 2, A = 1, so class B.",
          "**k = 3 with weights 1/d^2**: A = 1/1 = 1.000; B = 1/2 + 1/4 = 0.750; A wins. Weighting flips the answer because the single closest neighbour is very close.",
          "**k = 5** (adds P2 A, P1 A): A = 3, B = 2, so class A (weighted: A = 1 + 0.2 + 0.125 = 1.325 vs B = 0.75, A).",
          "Lesson: the prediction depends on k and on weighting; choose k by cross-validation."
        ]
      },
      {
        "heading": "Choosing k and bias-variance",
        "items": [
          "Small k (k = 1): flexible, jagged boundary, low bias, **high variance**, overfits noise.",
          "Large k: smooth boundary, high bias, **underfits**; with imbalance the majority class dominates; k = n predicts the majority class everywhere.",
          "Typical range 5-21; use odd k for binary problems; pick by cross-validated score inside a Pipeline."
        ]
      },
      {
        "heading": "Practical issues",
        "items": [
          "**Scaling is essential**: income in the tens of thousands swamps age in tens. Example: query (age 25, income 50 000) vs X (26, 20 000) and Y (60, 50 500): raw Euclidean makes Y far closer (about 500 vs 30 000) despite a 35-year age gap. Standardise or min-max scale (inside the pipeline, fitted on the training set).",
          "**Irrelevant features** add noise to distances; use feature selection or weighting.",
          "**Curse of dimensionality**: in high dimensions all points become almost equidistant, neighbourhoods stop being local, and data become sparse; reduce dimension (PCA) or select features.",
          "**Categorical features**: one-hot encoding with Euclidean distance can mislead; use Hamming / Gower or mixed distances.",
          "Sensitive to outliers and noisy labels for small k; class imbalance biases votes (weighted voting, resampling)."
        ]
      },
      {
        "heading": "Strengths and weaknesses",
        "items": [
          "Strengths: very simple, no training, naturally multiclass, non-linear boundaries, adapts as data is added, works for regression too.",
          "Weaknesses: slow and memory heavy at prediction, needs scaling and a good metric, poor in high dimensions, no interpretable model, poor extrapolation (regression stays within observed targets)."
        ]
      },
      {
        "heading": "Lecture detail (Week 6)",
        "items": [
          "Instance-based vs model-based: kNN stores training examples and delays most computation until prediction (the local neighbourhood is the model); a decision tree learns a compact hierarchy of feature tests in training and predicts along one root-to-leaf path. Both are non-parametric supervised methods for classification and regression.",
          "**Inductive bias** (each algorithm assumes useful structure): kNN = nearby cases in the represented feature space have similar targets; decision tree = useful predictions can be expressed by axis-aligned recursive rules.",
          "kNN procedure (5 steps): store prepared training examples; measure distance to the query; select the k nearest; aggregate neighbour labels; return class or class probability (neighbour proportion = local probability estimate). Slide example: k = 3 neighbours magenta, green, green gives green; k = 5 neighbours magenta, green, green, magenta, magenta gives magenta (k changes the answer).",
          "Lecture dataset **College Athletes** (Speed, Agility, Draft yes/no, 20 instances): similarity is measured as distance in feature space, each feature is a dimension, and this scales to arbitrarily high dimensions. Example: ID 12 = [5.00, 2.50] vs query [2.75, 7.50]: Euclidean = sqrt(2.25^2 + 5^2) = 5.483; Manhattan = 2.25 + 5.00 = 7.25.",
          "Distance comparison: Euclidean and Manhattan are the most common; Minkowski generalises both (p = 1 Manhattan, p = 2 Euclidean) so infinitely many metrics exist; Manhattan is cheaper (no squares or square root), a good choice for very large datasets with limited compute; try several metrics for the dataset; other measures: cosine similarity, Russel-Rao, Sokal-Michener.",
          "Categorical features: one-hot mismatch adds distance even when categories have no natural order; high cardinality gives many sparse indicators that dominate neighbourhoods; mixed numeric and categorical data may not suit a single Euclidean metric. Scaling defines the geometry of neighbourhoods (use StandardScaler or RobustScaler inside the pipeline).",
          "Weighting: uniform (each neighbour equal) vs distance (closer neighbours count more, often inverse distance); weighting helps local predictions but can amplify noisy near-duplicates.",
          "Choosing k (lecture): at least 3 if not using 1-NN, often 5-21, application dependent, so experiment. Increasing k has a smoothing effect: too low overfits noisy data, too high underfits; in imbalanced data the majority class dominates for larger k. **k does not affect computational cost much**: most cost is computing distances from the query to all stored instances (linear in number of cases and attributes). Distance-weighted kNN can use all cases.",
          "kNN regression: y_hat(x) = (1/k) sum of the k neighbours' targets; distance-weighted mean variant; predictions stay within the range of nearby observed targets, so extrapolation is poor.",
          "Cost profile: training cost low (store examples, maybe build a search index); prediction cost high (compare with many stored examples or search an index: brute force, KD Tree, Ball Tree); memory cost = retain training data and targets. Curse of dimensionality: sparse space, distance concentration (nearest and farthest distances less distinguishable), feature noise from irrelevant dimensions; feature selection, representation design and enough data matter more than a better search structure.",
          "sklearn: `KNeighborsClassifier(n_neighbors=7, weights=\"distance\")` with `metric` / `p` controlling geometry; tune `n_neighbors`, `weights` (uniform / distance) and `p` (1, 2) with `GridSearchCV` over the whole pipeline (param name `kneighborsclassifier__n_neighbors`), scoring e.g. f1; near-equal settings may not be meaningful; do error analysis (local ambiguity, minority-class misses, scaling issues).",
          "Strengths: simple intuition, flexible boundaries, classification and regression, few modelling assumptions. Limitations: sensitive to scale, irrelevant features, dimension and local density; costly prediction. Best fit: moderate data size, meaningful distance, locally smooth target structure."
        ]
      }
    ],
    "pitfalls": [
      "Not scaling features (the biggest-unit feature dominates).",
      "Choosing k on the test set, or scaling before the split.",
      "Forgetting that k-NN \"training\" is storage and prediction is the expensive step.",
      "Using even k for binary classes and getting ties.",
      "Stating that larger k always improves accuracy."
    ]
  }
];
