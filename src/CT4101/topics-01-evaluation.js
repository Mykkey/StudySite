module.exports = [
  {
    "id": "eval-metrics",
    "title": "Evaluation metrics: confusion matrix, precision, recall, F1, ROC, regression errors",
    "priority": 1,
    "tier": "core",
    "freq": "est. high",
    "marks": "8-15 marks",
    "summary": "**First fill in the 2×2 table of right and wrong predictions. Then pick the measure that answers the question you care about.**",
    "mnemonic": "PRecision = Predicted positives; REcall = REal positives",
    "source": [
      "CT4101_Notes_04_Model_Evaluation",
      "CT4101_Notes_05_Linear_Logistic_Regression"
    ],
    "sections": [
      {
        "heading": "Why evaluate and what to estimate",
        "items": [
          "We want to know how well the model does on **new data**, not the data it learned from.",
          "Scores on training data look too good, because the model can just memorise.",
          "Choose your measure from the situation: what each mistake costs, whether the classes are balanced, and who uses the result.",
          "Always compare with a **baseline**: a very simple method, such as always guessing the most common answer."
        ]
      },
      {
        "heading": "Confusion matrix (binary classification)",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "Predicted positive",
              "Predicted negative"
            ],
            "rows": [
              [
                "Actual positive",
                "TP (true positive)",
                "FN (false negative, a miss)"
              ],
              [
                "Actual negative",
                "FP (false positive, a false alarm)",
                "TN (true negative)"
              ]
            ]
          },
          "Rows are what is **true**. Columns are what was **predicted**.",
          "**TP** = true positive, **FN** = missed positive, **FP** = false alarm, **TN** = true negative.",
          {
            "type": "p",
            "text": "Accuracy: how often are we right?"
          },
          {
            "type": "formula",
            "label": "Accuracy",
            "text": "accuracy = (TP + TN) / (TP + TN + FP + FN)   (fraction of all decisions that are correct)"
          },
          {
            "type": "p",
            "text": "Precision: when we say \"yes\", how often is it true?"
          },
          {
            "type": "formula",
            "label": "Precision (positive predictive value)",
            "text": "precision = TP / (TP + FP)   (of the cases predicted positive, how many really are)"
          },
          {
            "type": "p",
            "text": "Recall: of the real \"yes\" cases, how many did we find?"
          },
          {
            "type": "formula",
            "label": "Recall (sensitivity, true positive rate)",
            "text": "recall = TP / (TP + FN)   (of the actual positives, how many did we find)"
          },
          {
            "type": "p",
            "text": "Specificity: of the real \"no\" cases, how many did we reject?"
          },
          {
            "type": "formula",
            "label": "Specificity (true negative rate)",
            "text": "specificity = TN / (TN + FP)   (of the actual negatives, how many did we correctly reject); FPR = 1 - specificity = FP/(FP+TN)"
          },
          {
            "type": "p",
            "text": "F1: one number for precision and recall"
          },
          "It is low if either one is low. It ignores true negatives.",
          {
            "type": "formula",
            "label": "F1 score",
            "text": "F1 = 2 x (precision x recall) / (precision + recall) = 2TP / (2TP + FP + FN)   (harmonic mean: low if either is low; ignores TN)"
          },
          {
            "type": "formula",
            "label": "F-beta",
            "text": "F_beta = (1 + beta^2) x P x R / (beta^2 x P + R)   (beta > 1 weights recall more, beta < 1 weights precision more)"
          }
        ]
      },
      {
        "heading": "Worked example (200 cases)",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Work out accuracy, precision, recall, specificity, F1 and balanced accuracy, and compare with always predicting \"negative\"."
            ]
          },
          "200 cases: TP = 40, FP = 10, FN = 20, TN = 130.",
          "So 60 are really positive and 140 are really negative.",
          {
            "type": "table",
            "head": [
              "Metric",
              "Working",
              "Result"
            ],
            "rows": [
              [
                "Accuracy",
                "(40 + 130) / 200",
                "0.85"
              ],
              [
                "Precision",
                "40 / (40 + 10)",
                "0.80"
              ],
              [
                "Recall",
                "40 / (40 + 20)",
                "0.667"
              ],
              [
                "Specificity",
                "130 / (130 + 10)",
                "0.929"
              ],
              [
                "F1",
                "2 x 0.8 x 0.667 / (0.8 + 0.667)",
                "0.727"
              ],
              [
                "Balanced accuracy",
                "(0.667 + 0.929) / 2",
                "0.798"
              ],
              [
                "Baseline (always negative)",
                "140 / 200",
                "0.70 accuracy, recall 0"
              ]
            ]
          },
          "Accuracy of 85% sounds good.",
          "But always guessing \"negative\" already scores 70%.",
          "And a third of the real positives are missed (recall 0.667)."
        ]
      },
      {
        "heading": "Which metric when",
        "items": [
          "**Accuracy**: only when classes are balanced and mistakes cost about the same. A \"never fraud\" model can score 99% and be useless.",
          "**Precision**: when false alarms are costly (a spam filter deleting real mail).",
          "**Recall**: when misses are costly (cancer screening, fraud, safety faults).",
          "**F1**: when you need one number and the positive class is rare.",
          "**Specificity**: when false alarms hurt the negative group.",
          "When positives are rare, a precision-recall curve tells you more than ROC."
        ]
      },
      {
        "heading": "Multiclass averaging",
        "items": [
          "With more than two classes, score each class against all the others, then average.",
          "**Macro**: plain average. Every class counts equally, so it shows weak small classes.",
          "**Micro**: add up all TP, FP and FN first. Big classes dominate. With one label per item it equals accuracy.",
          "**Weighted**: average weighted by class size. It can hide poor results on rare classes."
        ]
      },
      {
        "heading": "Thresholds, ROC and AUC",
        "items": [
          "Many models give a probability. The **threshold** (usually 0.5) turns it into yes or no.",
          "**Raise** it: fewer \"yes\", higher precision, lower recall.",
          "**Lower** it: the reverse.",
          {
            "type": "p",
            "text": "ROC and AUC"
          },
          "**ROC curve**: recall plotted against false alarm rate, for every threshold.",
          "The diagonal is random guessing (AUC 0.5). The top left corner is perfect (AUC 1.0).",
          "**AUC**: the chance a random positive gets a higher score than a random negative.",
          "It does not depend on a threshold, and does not tell you which to use.",
          "**Precision-recall curve**: better when one class is very rare.",
          "Choose the threshold on **validation** data using the cost of errors. Never on the test set.",
          {
            "type": "p",
            "text": "Are the probabilities honest?"
          },
          "**Calibration**: of cases scored 0.8, are about 80% really positive?",
          "A model can rank well and still be badly calibrated.",
          "Check with a reliability diagram. Fix with Platt scaling or isotonic regression.",
          "**Log loss** scores the probabilities themselves and punishes confident mistakes."
        ]
      },
      {
        "heading": "Regression metrics",
        "items": [
          "Used when predicting a number. A **residual** is real value minus predicted: e = y - y_hat.",
          "Positive residual: guessed too low. Negative: guessed too high.",
          {
            "type": "p",
            "text": "MAE: the typical size of a miss"
          },
          "Same units as the target, and not thrown off much by extreme values.",
          {
            "type": "formula",
            "label": "MAE",
            "text": "MAE = (1/n) x sum |y_i - y_hat_i|   (same units as target; robust to outliers; each unit of error costs the same)"
          },
          {
            "type": "p",
            "text": "MSE and RMSE: punish big misses"
          },
          {
            "type": "formula",
            "label": "MSE and RMSE",
            "text": "MSE = (1/n) x sum (y_i - y_hat_i)^2 ; RMSE = sqrt(MSE)   (squaring penalises large errors strongly; RMSE is in target units)"
          },
          {
            "type": "p",
            "text": "R squared: how much better than guessing the average?"
          },
          "1 is perfect, 0 is no better than the average, and it can be negative on test data.",
          {
            "type": "formula",
            "label": "R squared",
            "text": "R^2 = 1 - SSE / SST, SSE = sum (y - y_hat)^2, SST = sum (y - y_mean)^2   (fraction of variance explained; 0 = no better than predicting the mean; can be negative on test data)"
          },
          "**MAPE** (percentage error) breaks when real values are zero or near zero.",
          "Always plot the residuals. A curve means something is missing. A funnel means uneven spread. A few huge points mean outliers.",
          "One good overall score can hide failure in some groups."
        ]
      },
      {
        "heading": "Typical exam angles",
        "items": [
          "Given TP, FP, FN, TN: work out the measures and say which fits, and why.",
          "Show with numbers why accuracy misleads on rare classes.",
          "Explain ROC and AUC, and what moving the threshold does.",
          "Compare MAE, MSE, RMSE and R squared.",
          "Explain macro vs micro averaging."
        ]
      },
      {
        "heading": "Testing the whole process, and baselines",
        "items": [
          "You are testing the **whole workflow** (preparing the data and predicting): how well will it work on future cases?",
          {
            "type": "p",
            "text": "Three kinds of error"
          },
          "**Training error** (on the data it learned from): useful for spotting problems, but too optimistic.",
          "**Validation error** (on data held back for choosing): used to pick models and settings. Reuse it too often and you start fitting to it.",
          "**Test error** (on data never touched): kept for one final check.",
          {
            "type": "p",
            "text": "Three kinds of baseline to beat"
          },
          "A **baseline** is something simple your model has to do better than.",
          "**Dummy**: always guess the most common class, or the average number.",
          "**Simple model**: linear or logistic regression, or a small decision tree.",
          "**Business rule**: whatever is used today.",
          "A complex model that barely beats the dummy is not a success.",
          {
            "type": "p",
            "text": "Say what your result covers"
          },
          "**Who** the data is about, whether the split copies **time** order, whether the rows are **independent**, whether the target can be trusted, which **errors matter**, and **what you chose** using the validation data."
        ]
      },
      {
        "heading": "Three qualities, other error measures and residuals",
        "items": [
          {
            "type": "p",
            "text": "Three separate qualities of a classifier"
          },
          "**Discrimination**: does it score the \"yes\" cases above the \"no\" cases?",
          "**Calibration**: are the probabilities honest (of cases given 80%, are about 80% \"yes\")?",
          "**Decision value**: do they help you act, given what each mistake costs?",
          "AUC only measures the first. It does not pick a threshold or include costs.",
          {
            "type": "p",
            "text": "Other error measures for number predictions"
          },
          "**Median absolute error**: the middle-sized miss. It ignores rare huge ones.",
          "**Quantile loss**: penalises guessing too low and too high by different amounts.",
          "**Domain cost**: measure the error in what it actually costs (time, energy, money, risk).",
          {
            "type": "p",
            "text": "Checking residuals (real value minus predicted)"
          },
          "Plot them against the predictions, look at their spread, compare groups or ranges, and study the worst cases."
        ]
      }
    ],
    "pitfalls": [
      "Precision divides by TP+FP. Recall divides by TP+FN.",
      "On rare classes, never quote accuracy without a baseline.",
      "AUC is not accuracy. Do not tune the threshold on the test set.",
      "F1 ignores true negatives.",
      "A high R squared does not prove the model is right."
    ]
  },
  {
    "id": "validation-cv",
    "title": "Train/validation/test splits, k-fold cross-validation, tuning and leakage",
    "priority": 5,
    "tier": "core",
    "freq": "est. high",
    "marks": "8-12 marks",
    "summary": "**Learn on the training data, choose settings on validation data, and use the test data once at the end. Anything learned from data must only see the training part.**",
    "mnemonic": "Train to LEARN, Validate to CHOOSE, Test to REPORT",
    "source": [
      "CT4101_Notes_01_Intro_to_ML",
      "CT4101_Notes_04_Model_Evaluation",
      "CT4101_Notes_03_Data_Prep_Feature_Engineering"
    ],
    "sections": [
      {
        "heading": "Three partitions, three roles",
        "items": [
          {
            "type": "table",
            "head": [
              "Set",
              "Used for",
              "Typical size",
              "Analogy"
            ],
            "rows": [
              [
                "Training",
                "Fit parameters (weights)",
                "60-80%",
                "Studying the material"
              ],
              [
                "Validation",
                "Model selection, hyperparameters, early stopping, threshold",
                "10-20%",
                "Practice exams"
              ],
              [
                "Test",
                "Final unbiased estimate, opened once the workflow is fixed",
                "10-20%",
                "The real exam"
              ]
            ]
          },
          "Example: 1000 rows split 60/20/20 gives 600, 200 and 200.",
          "**Parameters**: learned from data (weights, tree splits).",
          "**Hyperparameters**: chosen by you (k, tree depth, learning rate, C, number of trees).",
          "If you change anything after seeing the test result, that score is no longer honest."
        ]
      },
      {
        "heading": "Split strategies",
        "items": [
          "**Random split**: only if rows are independent.",
          "**Stratified**: keeps the same class mix in every part. Important with rare classes.",
          "**Group split**: all rows from one patient, device or customer stay together.",
          "**Time split**: learn from the past, test on the future. Never shuffle.",
          "Stratifying does not fix duplicates or time leaks."
        ]
      },
      {
        "heading": "k-fold cross-validation",
        "items": [
          "Cut the training data into k equal parts (**folds**).",
          "Train on k-1 folds, check on the one left out, and repeat for each fold.",
          "Report the **average and standard deviation** of the k scores.",
          "Every row is checked exactly once and used for training k-1 times.",
          "Usual k is 5 or 10. With k = n it is leave-one-out (costly and variable).",
          "It costs k times as much training.",
          "Use a **Pipeline** so preparation is redone inside each fold."
        ]
      },
      {
        "heading": "Worked example: 5-fold CV",
        "items": [
          {
            "type": "task",
            "show": 2,
            "q": [
              "Find the average accuracy, the variance and the standard deviation."
            ],
            "own": [
              {
                "type": "formula",
                "label": "Mean and variance of fold scores",
                "text": "mean = sum of scores / k. variance = sum of (score − mean)² / (k − 1). standard deviation = square root of the variance."
              }
            ]
          },
          "100 examples, 5 folds: each round trains on 80 and checks on 20.",
          {
            "type": "table",
            "head": [
              "Fold",
              "Validation accuracy"
            ],
            "rows": [
              [
                "1",
                "0.82"
              ],
              [
                "2",
                "0.78"
              ],
              [
                "3",
                "0.85"
              ],
              [
                "4",
                "0.80"
              ],
              [
                "5",
                "0.80"
              ]
            ]
          },
          "Average = (0.82 + 0.78 + 0.85 + 0.80 + 0.80) / 5 = **0.81**.",
          "Differences from the average: +0.01, -0.03, +0.04, -0.01, -0.01.",
          "Their squares add to 0.0028. Variance = 0.0028 / 4 = 0.0007. Standard deviation = **0.026**.",
          "Report: accuracy 0.81 ± 0.03 (5-fold CV). The spread shows how much one split could mislead."
        ]
      },
      {
        "heading": "Hyperparameter tuning and nested CV",
        "items": [
          "**Grid search**: try every combination.",
          "**Random search**: try a sample, often more efficient.",
          "Both score with cross-validation on training data.",
          "Try enough settings and you overfit the validation folds.",
          "**Nested CV**: an inner loop picks settings, an outer loop tests the whole process. This gives an honest score.",
          "Afterwards, retrain on all training data and test once."
        ]
      },
      {
        "heading": "Data leakage",
        "items": [
          "**Leakage** = the model gets information it would not have in real use. Results look great, then fail.",
          "**Target leakage**: a feature that follows from the answer (\"treatment given\" when predicting disease).",
          "**Preparation leakage**: scaling or filling gaps using all the data before splitting.",
          "**Group or time leakage**: the same patient, near-copies or future data in training.",
          "**Tuning leakage**: choosing models by test score.",
          "**Fix**: split first, learn preparation from training only, use a Pipeline, protect the test set."
        ]
      },
      {
        "heading": "Learning and validation curves (diagnostics)",
        "items": [
          "**Learning curve**: score against amount of training data.",
          "A big lasting gap means **high variance**: get more data or regularise.",
          "Both poor and close means **high bias**: use a richer model or better features.",
          "**Validation curve**: score against one complexity setting.",
          "To be repeatable, fix random_state and record settings and versions.",
          "Compare models on the same folds, and ask if the gain matters in practice."
        ]
      },
      {
        "heading": "Splitting without cheating",
        "items": [
          "Typical sizes: train 65-80%, validation 10-20%, test 10-20%. These are choices, not rules.",
          {
            "type": "p",
            "text": "When a random split gives a false answer"
          },
          "It fails when the same person, device, household, document or future time period appears in more than one part.",
          "The model then looks good because it has already seen something very close to the test cases.",
          "Group these together: one patient's visits, one sensor's readings, repeat listings of one property, pieces of one document.",
          "With data over time, watch for features that use past values, answers that arrive late, seasons, and overlapping time windows.",
          {
            "type": "p",
            "text": "Which splitter in scikit-learn"
          },
          "**KFold**: plain split, for regression or balanced classes.",
          "**StratifiedKFold**: keeps the class mix the same in every fold.",
          "**GroupKFold**: keeps each group (such as one patient) in one fold.",
          "**TimeSeriesSplit**: always trains on the past and tests on the future.",
          "**Repeated CV**: repeats the split to see how much it matters.",
          "`cross_validate` runs it with several measures. `GridSearchCV` also tries each setting and refits the best one."
        ]
      },
      {
        "heading": "Recording results, and six common failures",
        "items": [
          {
            "type": "p",
            "text": "What to write down"
          },
          "The **data** (source, version, what was left out, the split), the **code**, library **versions**, **settings**, **random seeds** (so it can be repeated) and **results**.",
          "Report the average and the spread, not just the best fold, then the final test score. Do not claim more precision than the data supports.",
          {
            "type": "p",
            "text": "Six common failures"
          },
          "**1.** Tuning on the test set.",
          "**2.** Preparing the data before splitting it for cross-validation.",
          "**3.** Splitting by the wrong unit (rows instead of people).",
          "**4.** Reporting only the most flattering measure.",
          "**5.** Relying on one lucky split.",
          "**6.** Ignoring that the future mix of classes may differ.",
          {
            "type": "p",
            "text": "A testing plan covers"
          },
          "The context, the splitter and number of folds, one main measure plus two others, baselines, three ways data could leak, a log of experiments with fixed seeds, and the rule for when the test set is opened."
        ]
      }
    ],
    "pitfalls": [
      "Do not scale or fill gaps before splitting.",
      "Do not use the test set to choose k, depth or threshold.",
      "Do not shuffle time data or split one patient's visits across folds.",
      "Report the spread, not just the average.",
      "Stratify when classes are imbalanced."
    ]
  },
  {
    "id": "bias-variance",
    "title": "Bias-variance trade-off, underfitting and overfitting",
    "priority": 6,
    "tier": "core",
    "freq": "est. high",
    "marks": "8-12 marks",
    "summary": "**Expected error = bias squared + variance + irreducible noise: simple models underfit (high bias, train and validation errors both high), complex models overfit (high variance, tiny training error but large gap to validation error).**",
    "mnemonic": "BV: Bias = too Basic, Variance = too Variable",
    "source": [
      "CT4101_Notes_04_Model_Evaluation",
      "CT4101_Notes_07_Ensemble_Methods",
      "CT4101_Notes_09_Neural_Networks"
    ],
    "sections": [
      {
        "heading": "Definitions",
        "items": [
          "**Underfitting**: the model is too simple to capture the pattern; high error on both training and validation data.",
          "**Overfitting**: the model fits noise and quirks of the training set; very low training error but much higher validation / test error.",
          "**Bias**: error from wrong assumptions of the model (a straight line fitted to a curve). High bias = underfitting.",
          "**Variance**: sensitivity of the fitted model to the particular training sample. High variance = overfitting; refitting on another sample gives a very different model.",
          "**Irreducible error**: noise in the data that no model can remove.",
          {
            "type": "formula",
            "label": "Decomposition (squared error)",
            "text": "E[(y - y_hat)^2] = Bias^2 + Variance + Irreducible noise"
          },
          "Generalisation = performance on unseen data from the same distribution; the true goal of learning."
        ]
      },
      {
        "heading": "Numeric illustration (polynomial degree)",
        "items": [
          "Fit polynomials of degree 1 to 8 to the same noisy data. Errors (mean squared error):",
          {
            "type": "table",
            "head": [
              "Degree",
              "Train error",
              "Validation error",
              "Bias squared",
              "Variance",
              "Noise",
              "Diagnosis"
            ],
            "rows": [
              [
                "1",
                "0.50",
                "0.52",
                "0.40",
                "0.05",
                "0.07",
                "Underfit (high bias)"
              ],
              [
                "4",
                "0.12",
                "0.17",
                "0.06",
                "0.04",
                "0.07",
                "Best trade-off"
              ],
              [
                "8",
                "0.02",
                "0.46",
                "0.01",
                "0.38",
                "0.07",
                "Overfit (high variance)"
              ]
            ]
          },
          "Check: validation error = bias squared + variance + noise: 0.40 + 0.05 + 0.07 = 0.52; 0.06 + 0.04 + 0.07 = 0.17; 0.01 + 0.38 + 0.07 = 0.46.",
          {
            "type": "diagram",
            "kind": "line",
            "caption": "Validation curve: training error keeps falling with complexity, validation error is U-shaped with its minimum at degree 4 (0.17).",
            "data": {
              "title": "Error versus model complexity",
              "xLabel": "Polynomial degree",
              "yLabel": "Mean squared error",
              "yMin": 0,
              "yMax": 0.6,
              "series": [
                {
                  "name": "Training error",
                  "points": [
                    [
                      1,
                      0.5
                    ],
                    [
                      2,
                      0.3
                    ],
                    [
                      3,
                      0.18
                    ],
                    [
                      4,
                      0.12
                    ],
                    [
                      5,
                      0.08
                    ],
                    [
                      6,
                      0.05
                    ],
                    [
                      7,
                      0.03
                    ],
                    [
                      8,
                      0.02
                    ]
                  ]
                },
                {
                  "name": "Validation error",
                  "points": [
                    [
                      1,
                      0.52
                    ],
                    [
                      2,
                      0.34
                    ],
                    [
                      3,
                      0.22
                    ],
                    [
                      4,
                      0.17
                    ],
                    [
                      5,
                      0.19
                    ],
                    [
                      6,
                      0.25
                    ],
                    [
                      7,
                      0.34
                    ],
                    [
                      8,
                      0.46
                    ]
                  ]
                }
              ],
              "hlines": [
                {
                  "y": 0.07,
                  "label": "Irreducible noise 0.07"
                }
              ]
            }
          }
        ]
      },
      {
        "heading": "Diagnosing from the curves",
        "items": [
          {
            "type": "table",
            "head": [
              "Symptom",
              "Diagnosis",
              "Remedies"
            ],
            "rows": [
              [
                "Train error high, val error high, small gap",
                "High bias (underfit)",
                "More complex model, more/better features, less regularisation, train longer"
              ],
              [
                "Train error low, val error much higher",
                "High variance (overfit)",
                "More data, simpler model, regularisation (L1/L2, dropout), early stopping, pruning, bagging/ensembles, feature selection"
              ],
              [
                "Both low and close",
                "Good fit",
                "Confirm on the test set once"
              ]
            ]
          },
          {
            "type": "diagram",
            "kind": "line",
            "caption": "Learning curve for a high-variance model: the gap (0.40 - 0.02 at n = 20, still 0.18 - 0.14 at n = 400) shrinks as data grows, so more data helps.",
            "data": {
              "title": "Learning curve (error versus training-set size)",
              "xLabel": "Training examples",
              "yLabel": "Error",
              "yMin": 0,
              "yMax": 0.5,
              "series": [
                {
                  "name": "Training error",
                  "points": [
                    [
                      20,
                      0.02
                    ],
                    [
                      50,
                      0.06
                    ],
                    [
                      100,
                      0.1
                    ],
                    [
                      200,
                      0.13
                    ],
                    [
                      400,
                      0.14
                    ]
                  ]
                },
                {
                  "name": "Validation error",
                  "points": [
                    [
                      20,
                      0.4
                    ],
                    [
                      50,
                      0.28
                    ],
                    [
                      100,
                      0.22
                    ],
                    [
                      200,
                      0.19
                    ],
                    [
                      400,
                      0.18
                    ]
                  ]
                }
              ]
            }
          },
          "Training error rises with more data (harder to memorise) while validation error falls; they converge at the model's limit."
        ]
      },
      {
        "heading": "Ways to control the trade-off",
        "items": [
          "Model capacity: tree depth / min samples per leaf, k in k-NN (small k = high variance, large k = high bias), polynomial degree, number of layers / units.",
          "Regularisation (Ridge, Lasso, weight decay, dropout, early stopping).",
          "Ensembles: bagging / random forests reduce variance; boosting reduces bias.",
          "More data and better features; feature selection to remove noise dimensions.",
          "Choose complexity using validation data / cross-validation, not training error."
        ]
      },
      {
        "heading": "Typical exam angles",
        "items": [
          "Define overfitting and underfitting, sketch the training / validation error curves and mark the best complexity.",
          "Given train and validation errors, say which problem it is and propose two remedies.",
          "Explain how k, tree depth, regularisation strength or number of epochs move a model along the bias-variance axis."
        ]
      }
    ],
    "pitfalls": [
      "Choosing complexity by training error (it always favours the most complex model).",
      "Saying \"overfitting means high training error\" (it is low training error with high validation error).",
      "Confusing a bias (systematic error) with a data bias (unfairness): the exam word can mean either; state which.",
      "Thinking more data always cures high bias (it does not; the model is too simple)."
    ]
  }
];
