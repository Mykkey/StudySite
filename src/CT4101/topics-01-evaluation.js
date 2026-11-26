module.exports = [
{
  id: 'eval-metrics', title: 'Evaluation metrics: confusion matrix, precision, recall, F1, ROC, regression errors',
  priority: 1, tier: 'core', freq: 'est. high', marks: '8-15 marks',
  summary: '**Build the confusion matrix first, then pick the metric whose denominator matches the question: precision = TP/(TP+FP), recall = TP/(TP+FN), specificity = TN/(TN+FP), F1 = harmonic mean of precision and recall.**',
  mnemonic: 'PRecision = Predicted positives; REcall = REal positives',
  source: ['CT4101_Notes_04_Model_Evaluation', 'CT4101_Notes_05_Linear_Logistic_Regression'],
  sections: [
    { heading: 'Why evaluate and what to estimate', items: [
      'Goal of evaluation: estimate performance on **unseen data**, not on the data used to fit the model.',
      'Training error is optimistic: it rewards memorisation and cannot reveal overfitting.',
      'Choose metrics from the decision context: the cost of each kind of error, class balance, who uses the output.',
      'Always compare with a **baseline** (dummy classifier = majority class, dummy regressor = training mean, a simple standard model, or the current business rule).'
    ]},
    { heading: 'Confusion matrix (binary classification)', items: [
      { type: 'table', head: ['', 'Predicted positive', 'Predicted negative'], rows: [
        ['Actual positive', 'TP (true positive)', 'FN (false negative, a miss)'],
        ['Actual negative', 'FP (false positive, a false alarm)', 'TN (true negative)'] ] },
      'Rows are the truth, columns are the prediction. TP + FN = actual positives; TN + FP = actual negatives; TP + FP = predicted positives.',
      { type: 'formula', label: 'Accuracy', text: 'accuracy = (TP + TN) / (TP + TN + FP + FN)   (fraction of all decisions that are correct)' },
      { type: 'formula', label: 'Precision (positive predictive value)', text: 'precision = TP / (TP + FP)   (of the cases predicted positive, how many really are)' },
      { type: 'formula', label: 'Recall (sensitivity, true positive rate)', text: 'recall = TP / (TP + FN)   (of the actual positives, how many did we find)' },
      { type: 'formula', label: 'Specificity (true negative rate)', text: 'specificity = TN / (TN + FP)   (of the actual negatives, how many did we correctly reject); FPR = 1 - specificity = FP/(FP+TN)' },
      { type: 'formula', label: 'F1 score', text: 'F1 = 2 x (precision x recall) / (precision + recall) = 2TP / (2TP + FP + FN)   (harmonic mean: low if either is low; ignores TN)' },
      { type: 'formula', label: 'F-beta', text: 'F_beta = (1 + beta^2) x P x R / (beta^2 x P + R)   (beta > 1 weights recall more, beta < 1 weights precision more)' }
    ]},
    { heading: 'Worked example (200 cases)', items: [
      'TP = 40, FP = 10, FN = 20, TN = 130. Actual positives = 60, actual negatives = 140.',
      { type: 'table', head: ['Metric', 'Working', 'Result'], rows: [
        ['Accuracy', '(40 + 130) / 200', '0.85'],
        ['Precision', '40 / (40 + 10)', '0.80'],
        ['Recall', '40 / (40 + 20)', '0.667'],
        ['Specificity', '130 / (130 + 10)', '0.929'],
        ['F1', '2 x 0.8 x 0.667 / (0.8 + 0.667)', '0.727'],
        ['Balanced accuracy', '(0.667 + 0.929) / 2', '0.798'],
        ['Baseline (always negative)', '140 / 200', '0.70 accuracy, recall 0'] ] },
      'Reading: 85% accuracy looks good but the majority-class baseline already scores 70%, and a third of the real positives are missed (recall 0.667).'
    ]},
    { heading: 'Which metric when', items: [
      'Accuracy: only when classes are roughly balanced and errors cost about the same. Fails under imbalance (the 99% accuracy of "never fraud").',
      'Precision matters when false positives are costly (spam filter deleting real mail, flagging innocent people).',
      'Recall matters when false negatives are costly (cancer screening, fraud detection, safety defects).',
      'F1 when you need one number balancing precision and recall on an imbalanced positive class.',
      'Specificity / FPR when the cost of false alarms to the negative group matters.',
      'Precision-recall curve is more informative than ROC when positives are rare.'
    ]},
    { heading: 'Multiclass averaging', items: [
      'Compute per-class precision / recall / F1 in a one-vs-rest way, then average.',
      '**Macro average**: unweighted mean over classes (every class counts equally; shows minority-class failure).',
      '**Micro average**: pool all TP, FP, FN across classes, then compute (dominated by common classes; for single-label multiclass equals accuracy).',
      '**Weighted average**: mean weighted by class support (class size).'
    ]},
    { heading: 'Thresholds, ROC and AUC', items: [
      'Many classifiers output a score or probability; the **decision threshold** (default 0.5) turns it into a class. Moving it trades precision against recall.',
      'Raising the threshold: fewer predicted positives, higher precision, lower recall. Lowering it: the reverse.',
      '**ROC curve**: plots TPR (recall) against FPR for every threshold. Diagonal = random guessing (AUC 0.5); top-left corner = perfect (AUC 1.0).',
      '**AUC**: probability that a random positive is scored higher than a random negative. Threshold-independent, but says nothing about the chosen operating point.',
      '**Precision-recall curve**: precision vs recall over thresholds; preferred for heavy imbalance.',
      'Choose the threshold on **validation** data using explicit error costs; never tune it on the test set.',
      '**Calibration**: do predicted probabilities match observed frequencies (cases scored 0.8 should be positive about 80% of the time)? A model can rank well (high AUC) yet be poorly calibrated. Check with a reliability diagram; fix with Platt scaling or isotonic regression.',
      'Log loss (cross-entropy) evaluates probability quality directly and punishes confident errors.'
    ]},
    { heading: 'Regression metrics', items: [
      'Residual (error) = observed minus predicted: e = y - y_hat. Negative = prediction too high.',
      { type: 'formula', label: 'MAE', text: 'MAE = (1/n) x sum |y_i - y_hat_i|   (same units as target; robust to outliers; each unit of error costs the same)' },
      { type: 'formula', label: 'MSE and RMSE', text: 'MSE = (1/n) x sum (y_i - y_hat_i)^2 ; RMSE = sqrt(MSE)   (squaring penalises large errors strongly; RMSE is in target units)' },
      { type: 'formula', label: 'R squared', text: 'R^2 = 1 - SSE / SST, SSE = sum (y - y_hat)^2, SST = sum (y - y_mean)^2   (fraction of variance explained; 0 = no better than predicting the mean; can be negative on test data)' },
      'MAPE (percentage error) breaks when actual values are zero or near zero.',
      'Always inspect **residual plots**: curves suggest missing non-linearity, a funnel suggests non-constant variance (heteroscedasticity), a few huge points suggest outliers.',
      'A strong aggregate score can hide systematic failure in subgroups or ranges: report more than one number plus diagnostics.'
    ]},
    { heading: 'Typical exam angles', items: [
      'Given TP/FP/FN/TN, compute all metrics and comment on which is most appropriate and why (imbalance, costs).',
      'Explain why accuracy is misleading for imbalanced data using a numeric example.',
      'Describe ROC/AUC; explain what moving the threshold does.',
      'Compare MAE, MSE, RMSE, R squared.',
      'Explain macro vs micro averaging.'
    ]},
    {"heading":"Lecture detail (Week 4)","items":["Central question: how well will this **workflow** (preparation, feature engineering and prediction together) generalise to future unseen cases? Metrics and thresholds come from error consequences, not habit. A number without a protocol is not evidence of generalisation.","Training error is useful for diagnosing optimisation and capacity but not an unbiased estimate; validation error supports model and hyperparameter choices (repeated decisions can overfit it); test error is reserved for final evaluation after the workflow is fixed.","An evaluation claim has a scope: **population** (who is represented), **time** (does the split imitate predicting the future), **unit** (are rows independent or grouped), **outcome** (how reliable is the target), **metric** (which errors matter), **procedure** (what was selected using validation).","Baselines: **dummy** (majority / frequency / stratified classifier; mean / median regressor), **simple learned** (logistic or linear regression, shallow tree, domain-standard method), **business / rules** (existing heuristic, current process, previous system). A complex model that barely beats a dummy is not a success.","Metric notes: accuracy suits reasonably balanced classes and costs; it fails when a rare positive class is ignored; use with confusion matrix and class prevalence. Specificity is useful when correct negative handling matters. A single F-score hides the operating threshold and error counts.","Multiclass averaging (slide wording): macro = compute each class metric then average equally (reveals weak minority classes); micro = aggregate all one-vs-rest decisions first (dominated by common classes); weighted = average by class support (can hide poor rare-class performance).","Discrimination vs calibration vs decision value: can the model rank positives above negatives; among cases predicted near 0.8, are about 80% positive; do the probabilities support a threshold or action with known costs. AUC does not choose the threshold or encode real-world costs. ROC AUC summarises ranking across thresholds, not performance at a chosen operating point; PR curve is often more informative when positives are rare.","Residual e = y - y_hat (positive = prediction too low, negative = too high). MAE: same units, each unit of error contributes linearly; MSE: strongly penalises large errors, squared units; RMSE = sqrt(MSE): same units but still sensitive to large errors.","R squared = 1 - SS_res / SS_tot compares squared error with predicting the training mean: 1 = perfect, near 0 = similar to the mean baseline, below 0 = worse than the mean. It is not an error in target units and does not guarantee useful predictions.","Other errors: MAPE (problematic when actuals are zero or near zero), **median absolute error** (robust summary of typical error; can hide costly extremes), **quantile loss** (asymmetric cost of under- vs over-prediction), domain cost (time, energy, money, risk, service impact).","Residual diagnostics: residual vs prediction (curves, funnels, changing spread; non-linearity, heteroscedasticity), residual distribution (skew, heavy tails), slices (regions, devices, groups, target ranges), worst cases (influential errors, data-quality problems)."]}
  ],
  pitfalls: [
    'Swapping the denominators of precision and recall (precision uses TP+FP; recall uses TP+FN).',
    'Quoting accuracy on imbalanced data without a majority-class baseline.',
    'Reading ROC AUC as accuracy; or tuning the threshold on the test set.',
    'Forgetting that F1 ignores true negatives.',
    'Using R squared as proof that a model is correct; it can be high with a bad residual pattern.'
  ]
},
{
  id: 'validation-cv', title: 'Train/validation/test splits, k-fold cross-validation, tuning and leakage',
  priority: 5, tier: 'core', freq: 'est. high', marks: '8-12 marks',
  summary: '**Fit on training data, tune on validation data (or cross-validation folds), report once on the untouched test set; every learned step (scaling, imputation, selection, tuning) must be fitted inside the training part only, or you get leakage.**',
  mnemonic: 'Train to LEARN, Validate to CHOOSE, Test to REPORT',
  source: ['CT4101_Notes_01_Intro_to_ML', 'CT4101_Notes_04_Model_Evaluation', 'CT4101_Notes_03_Data_Prep_Feature_Engineering'],
  sections: [
    { heading: 'Three partitions, three roles', items: [
      { type: 'table', head: ['Set', 'Used for', 'Typical size', 'Analogy'], rows: [
        ['Training', 'Fit parameters (weights)', '60-80%', 'Studying the material'],
        ['Validation', 'Model selection, hyperparameters, early stopping, threshold', '10-20%', 'Practice exams'],
        ['Test', 'Final unbiased estimate, opened once the workflow is fixed', '10-20%', 'The real exam'] ] },
      'Example: 1000 examples with a 60/20/20 split gives 600 train, 200 validation, 200 test.',
      '**Parameters** are learned from data (weights, tree splits). **Hyperparameters** are chosen by the practitioner (k in k-NN, tree depth, learning rate, C, number of trees).',
      'Test set contact rule: if you change anything after looking at test results, the test score is no longer an honest estimate.'
    ]},
    { heading: 'Split strategies', items: [
      '**Random hold-out**: fine only if rows are independent and exchangeable.',
      '**Stratified split / StratifiedKFold**: keep class proportions the same in every partition (essential for imbalanced classification).',
      '**Group split / GroupKFold**: all rows of the same patient, device, customer, document move together (prevents the same entity in train and test).',
      '**Time-series split**: train on the past, validate on the future; never shuffle (prevents future information leaking backwards).',
      'Stratification does not solve duplicate entities or temporal leakage.'
    ]},
    { heading: 'k-fold cross-validation', items: [
      'Split the training data into k equal folds. For each fold i: train on the other k-1 folds, validate on fold i. Report the **mean and standard deviation** of the k scores.',
      'Each example is used for validation exactly once and for training k-1 times; uses limited data efficiently and shows variability.',
      'Common k = 5 or 10. Larger k means less bias (more training data per fold) but more compute; k = n is leave-one-out (high variance, expensive).',
      'Cost: k times as many model fits.',
      'Use a **Pipeline** so scaling, imputation and encoding are refitted inside each training fold.'
    ]},
    { heading: 'Worked example: 5-fold CV', items: [
      'n = 100 training examples, k = 5: each fold has 20 examples; each round trains on 80 and validates on 20.',
      { type: 'table', head: ['Fold', 'Validation accuracy'], rows: [
        ['1', '0.82'], ['2', '0.78'], ['3', '0.85'], ['4', '0.80'], ['5', '0.80'] ] },
      'Mean = (0.82 + 0.78 + 0.85 + 0.80 + 0.80) / 5 = 0.81.',
      'Deviations from the mean: +0.01, -0.03, +0.04, -0.01, -0.01; squares sum to 0.0028; sample variance = 0.0028 / 4 = 0.0007; std = 0.026.',
      'Report: accuracy 0.81 +/- 0.03 (5-fold CV). The spread tells you how much a single split could mislead.'
    ]},
    { heading: 'Hyperparameter tuning and nested CV', items: [
      'Grid search tries every combination in a grid; random search samples combinations (often more efficient in high dimensions). Both score by cross-validation on the training data.',
      'Every search consumes validation evidence: with enough tries you overfit the validation folds.',
      '**Nested cross-validation**: an inner loop selects hyperparameters, an outer loop estimates the performance of the whole procedure (selection included). Gives an honest estimate of "tuning + model" rather than of one pre-picked model.',
      'After choosing the settings, refit on all training data and evaluate once on the test set.'
    ]},
    { heading: 'Data leakage', items: [
      '**Leakage** = information that would not be available at prediction time influences training or evaluation; results look great and fail in production.',
      'Target leakage: a feature that is a consequence or proxy of the label (for example "treatment given" when predicting disease).',
      'Preprocessing leakage: scaler, imputer, encoder or feature selector fitted on all data before splitting.',
      'Group / temporal leakage: same patient, near-duplicate rows or future data in the training set.',
      'Tuning leakage: repeatedly choosing the model by test performance.',
      'Fix: define unit and groups, split first, fit transformers on training only, wrap everything in a Pipeline, protect the test set.'
    ]},
    { heading: 'Learning and validation curves (diagnostics)', items: [
      '**Learning curve**: training and validation score versus training-set size. A big persistent gap means high variance (more data or regularisation helps); both poor and close means high bias (need a richer model or features).',
      '**Validation curve**: score versus one complexity hyperparameter (see Bias-variance topic).',
      'Reproducibility: set random_state, record configuration, versions, code and data version.',
      'Compare models on identical folds and report the fold-level spread; ask whether the improvement is practically significant.'
    ]},
    {"heading":"Lecture detail (Week 4)","items":["Slide split sizes: train 65-80%, validation 10-20%, test 10-20%; percentages are design choices, not universal rules. Validation chooses features, models, hyperparameters and thresholds.","Random splitting is appropriate only when rows are exchangeable: independent, future drawn from a similar distribution, no location or temporal dependence. Dangerous when the same person, device, household, entity, document source or future period appears in more than one partition. A random split can look tidy while answering the wrong deployment question.","Stratification reduces accidental variation in class proportions (esp. small or imbalanced data); it does not fix duplicated entities, temporal leakage or unrepresentative collection; for continuous targets preserve important ranges only with care.","Grouped evaluation examples: patient (multiple visits), device (many sensor windows), property (repeat listings), document (several text segments). Use `GroupKFold`. Time-aware: train on past, validate on later, final future test; watch lag features, delayed labels, seasonal drift, overlapping windows; random CV usually overstates future performance when time matters.","Choosing the splitter: **KFold** (regression or balanced independent rows), **StratifiedKFold** (classification), **GroupKFold**, **TimeSeriesSplit**, **Repeated CV** (sensitivity to random partitions), custom splitter (domain constraints). Aggregate fold scores: mean = central performance, spread = split sensitivity. Preprocessing is refit independently in each fold; do not report only the highest fold or search result; CV supports development while the test estimate stays protected. `cross_validate` with several scorers (e.g. f1, roc_auc) and `return_train_score`.","Parameters are learned from training data (coefficients, splits, weights); hyperparameters are chosen by the practitioner (depth, regularisation, neighbours, learning rate); the search space must be declared and evaluated by a valid validation procedure. Grid search: systematic but expensive as dimensions grow; random search: samples configurations, covers broad spaces efficiently. Use `GridSearchCV(..., param_grid={\"model__C\": [...]}, cv=cv, refit=True)`, search on training data, test once.","Nested CV: inner loop selects hyperparameters or features using only the outer-training portion; outer loop evaluates the full selection procedure on held-out outer folds; it estimates the workflow including tuning, not one preselected model.","Learning curve = scores vs training-set size; validation curve = scores vs one complexity parameter; large gap suggests variance, both poor suggests bias or representation limits.","What to record for reproducibility: data (source, version, exclusions, split indices), code (commit / tag, notebook order, pipeline), environment (Python and package versions), configuration (features, model, hyperparameters, threshold), randomness (all seeds and repetitions), results (fold scores, timing, errors, diagnostics).","Report more than one number: summary (mean and spread across CV folds), final estimate (protected test metric with class counts, target scale and threshold), diagnostics (confusion matrix, error slices, residuals, representative failures). Do not imply precision the sample size and design cannot support.","Model comparison: use the same folds and preprocessing, inspect fold-level or repeated paired differences (not only separate means), ask about practical value (decisions, risk, latency, cost, interpretability).","Six common evaluation failures: test-set tuning; preprocessing before CV; wrong split unit; metric shopping (reporting only the favourable measure); single lucky split; ignoring prevalence shift (future class balance differs).","Portfolio evaluation plan: prediction context; protected test strategy; CV splitter and folds; primary metric tied to error costs plus at least two secondary metrics; dummy and simple learned baseline; three leakage risks; experiment log and fixed seed policy; rule for when the test set may be opened."]}
  ],
  pitfalls: [
    'Scaling or imputing the whole dataset before splitting (leakage).',
    'Using the test set to choose k, depth or the threshold.',
    'Shuffling time-series data or splitting repeated visits of one patient across folds.',
    'Reporting only the mean CV score without the spread.',
    'Forgetting stratification on imbalanced classes.'
  ]
},
{
  id: 'bias-variance', title: 'Bias-variance trade-off, underfitting and overfitting',
  priority: 6, tier: 'core', freq: 'est. high', marks: '8-12 marks',
  summary: '**Expected error = bias squared + variance + irreducible noise: simple models underfit (high bias, train and validation errors both high), complex models overfit (high variance, tiny training error but large gap to validation error).**',
  mnemonic: 'BV: Bias = too Basic, Variance = too Variable',
  source: ['CT4101_Notes_04_Model_Evaluation', 'CT4101_Notes_07_Ensemble_Methods', 'CT4101_Notes_09_Neural_Networks'],
  sections: [
    { heading: 'Definitions', items: [
      '**Underfitting**: the model is too simple to capture the pattern; high error on both training and validation data.',
      '**Overfitting**: the model fits noise and quirks of the training set; very low training error but much higher validation / test error.',
      '**Bias**: error from wrong assumptions of the model (a straight line fitted to a curve). High bias = underfitting.',
      '**Variance**: sensitivity of the fitted model to the particular training sample. High variance = overfitting; refitting on another sample gives a very different model.',
      '**Irreducible error**: noise in the data that no model can remove.',
      { type: 'formula', label: 'Decomposition (squared error)', text: 'E[(y - y_hat)^2] = Bias^2 + Variance + Irreducible noise' },
      'Generalisation = performance on unseen data from the same distribution; the true goal of learning.'
    ]},
    { heading: 'Numeric illustration (polynomial degree)', items: [
      'Fit polynomials of degree 1 to 8 to the same noisy data. Errors (mean squared error):',
      { type: 'table', head: ['Degree', 'Train error', 'Validation error', 'Bias squared', 'Variance', 'Noise', 'Diagnosis'], rows: [
        ['1', '0.50', '0.52', '0.40', '0.05', '0.07', 'Underfit (high bias)'],
        ['4', '0.12', '0.17', '0.06', '0.04', '0.07', 'Best trade-off'],
        ['8', '0.02', '0.46', '0.01', '0.38', '0.07', 'Overfit (high variance)'] ] },
      'Check: validation error = bias squared + variance + noise: 0.40 + 0.05 + 0.07 = 0.52; 0.06 + 0.04 + 0.07 = 0.17; 0.01 + 0.38 + 0.07 = 0.46.',
      { type: 'diagram', kind: 'line', caption: 'Validation curve: training error keeps falling with complexity, validation error is U-shaped with its minimum at degree 4 (0.17).', data: {
        title: 'Error versus model complexity', xLabel: 'Polynomial degree', yLabel: 'Mean squared error', yMin: 0, yMax: 0.6,
        series: [
          { name: 'Training error', points: [[1, 0.50], [2, 0.30], [3, 0.18], [4, 0.12], [5, 0.08], [6, 0.05], [7, 0.03], [8, 0.02]] },
          { name: 'Validation error', points: [[1, 0.52], [2, 0.34], [3, 0.22], [4, 0.17], [5, 0.19], [6, 0.25], [7, 0.34], [8, 0.46]] } ],
        hlines: [{ y: 0.07, label: 'Irreducible noise 0.07' }] } }
    ]},
    { heading: 'Diagnosing from the curves', items: [
      { type: 'table', head: ['Symptom', 'Diagnosis', 'Remedies'], rows: [
        ['Train error high, val error high, small gap', 'High bias (underfit)', 'More complex model, more/better features, less regularisation, train longer'],
        ['Train error low, val error much higher', 'High variance (overfit)', 'More data, simpler model, regularisation (L1/L2, dropout), early stopping, pruning, bagging/ensembles, feature selection'],
        ['Both low and close', 'Good fit', 'Confirm on the test set once'] ] },
      { type: 'diagram', kind: 'line', caption: 'Learning curve for a high-variance model: the gap (0.40 - 0.02 at n = 20, still 0.18 - 0.14 at n = 400) shrinks as data grows, so more data helps.', data: {
        title: 'Learning curve (error versus training-set size)', xLabel: 'Training examples', yLabel: 'Error', yMin: 0, yMax: 0.5,
        series: [
          { name: 'Training error', points: [[20, 0.02], [50, 0.06], [100, 0.10], [200, 0.13], [400, 0.14]] },
          { name: 'Validation error', points: [[20, 0.40], [50, 0.28], [100, 0.22], [200, 0.19], [400, 0.18]] } ] } },
      'Training error rises with more data (harder to memorise) while validation error falls; they converge at the model\'s limit.'
    ]},
    { heading: 'Ways to control the trade-off', items: [
      'Model capacity: tree depth / min samples per leaf, k in k-NN (small k = high variance, large k = high bias), polynomial degree, number of layers / units.',
      'Regularisation (Ridge, Lasso, weight decay, dropout, early stopping).',
      'Ensembles: bagging / random forests reduce variance; boosting reduces bias.',
      'More data and better features; feature selection to remove noise dimensions.',
      'Choose complexity using validation data / cross-validation, not training error.'
    ]},
    { heading: 'Typical exam angles', items: [
      'Define overfitting and underfitting, sketch the training / validation error curves and mark the best complexity.',
      'Given train and validation errors, say which problem it is and propose two remedies.',
      'Explain how k, tree depth, regularisation strength or number of epochs move a model along the bias-variance axis.'
    ]}
  ],
  pitfalls: [
    'Choosing complexity by training error (it always favours the most complex model).',
    'Saying "overfitting means high training error" (it is low training error with high validation error).',
    'Confusing a bias (systematic error) with a data bias (unfairness): the exam word can mean either; state which.',
    'Thinking more data always cures high bias (it does not; the model is too simple).'
  ]
}
];
