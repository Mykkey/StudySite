module.exports = [
{
  id: 'linear-regression', title: 'Linear regression: least squares, gradient descent, assumptions, Ridge/Lasso',
  priority: 3, tier: 'core', freq: 'est. high', marks: '10-15 marks',
  summary: '**Linear regression predicts a number as a weighted sum of features, y_hat = w0 + w1x1 + ...; weights minimise the sum of squared residuals, solved by the normal equation or gradient descent; Ridge (L2) and Lasso (L1) add a penalty to control variance.**',
  mnemonic: 'LINE: Least squares, Intercept, Normal equation, Errors squared',
  source: ['CT4101_Notes_05_Linear_Logistic_Regression'],
  sections: [
    { heading: 'Model', items: [
      'Simple linear regression: y_hat = w0 + w1 x. **w0** is the intercept (prediction when x = 0), **w1** the slope (change in prediction per one-unit increase in x).',
      'Multiple regression: y_hat = w0 + w1x1 + ... + wd xd = w . x (with x0 = 1). In matrix form y_hat = Xw.',
      'Residual e = y - y_hat. Categorical features enter as one-hot indicators (coefficient = difference from the reference category). Interaction terms (x1 x2) allow one effect to depend on another.',
      'Interpretation: coefficient = expected change in prediction for a one-unit change in that feature holding the others fixed. Association, not causation. Scaling changes coefficient magnitude, so magnitude is not importance unless features are on comparable scales.',
      'Example: temperature model 12 + 2.5 x temp gives 12 + 2.5 x 20 = 62 at 20 degrees C.'
    ]},
    { heading: 'Loss and least squares', items: [
      { type: 'formula', label: 'Sum of squared errors / MSE', text: 'SSE = sum (y_i - y_hat_i)^2 ; MSE = SSE / n ; fit = choose w to minimise SSE' },
      { type: 'formula', label: 'Simple regression closed form', text: 'w1 = Sxy / Sxx = sum (x_i - x_mean)(y_i - y_mean) / sum (x_i - x_mean)^2 ; w0 = y_mean - w1 x_mean' },
      { type: 'formula', label: 'Normal equation (multiple)', text: 'w = (X^T X)^(-1) X^T y   (needs X^T X invertible; fails or is unstable with collinear features)' },
      'Squaring: residuals positive, large errors penalised heavily, objective smooth and convex (one global minimum), but sensitive to outliers.',
      'Closed form is exact but costs O(d^3) and needs the inverse; gradient descent scales to many features and regularised or non-linear models.'
    ]},
    { heading: 'Worked example: least squares', items: [
      'Data: x = 1,2,3,4,5 and y = 2,4,5,4,5. x_mean = 3, y_mean = 4.',
      'Sxy = (-2)(-2) + (-1)(0) + (0)(1) + (1)(0) + (2)(1) = 6. Sxx = 4 + 1 + 0 + 1 + 4 = 10.',
      'w1 = 6 / 10 = 0.6 ; w0 = 4 - 0.6 x 3 = 2.2. Model: y_hat = 2.2 + 0.6x.',
      'Predictions 2.8, 3.4, 4.0, 4.6, 5.2; residuals -0.8, 0.6, 1.0, -0.6, -0.2.',
      'SSE = 0.64 + 0.36 + 1.00 + 0.36 + 0.04 = 2.4; MSE = 0.48; RMSE = 0.693. SST = 4 + 0 + 1 + 0 + 1 = 6; R squared = 1 - 2.4/6 = 0.60.',
      { type: 'diagram', kind: 'scatter', caption: 'Data points and the least-squares line y_hat = 2.2 + 0.6x (dense dots).', data: {
        title: 'Least-squares fit', xLabel: 'x', yLabel: 'y', xMin: 0, xMax: 6, yMin: 0, yMax: 6,
        series: [
          { name: 'Data (x, y)', points: [[1, 2], [2, 4], [3, 5], [4, 4], [5, 5]] },
          { name: 'Fitted line', points: [[0.5, 2.5], [1, 2.8], [1.5, 3.1], [2, 3.4], [2.5, 3.7], [3, 4.0], [3.5, 4.3], [4, 4.6], [4.5, 4.9], [5, 5.2], [5.5, 5.5]] } ] } }
    ]},
    { heading: 'Gradient descent', items: [
      'Start from initial weights, repeatedly move each weight a small step against the gradient of the loss.',
      { type: 'formula', label: 'Update rule', text: 'w_j <- w_j - alpha x dJ/dw_j   (alpha = learning rate)' },
      { type: 'formula', label: 'Gradients for J = (1/n) sum (y_hat - y)^2', text: 'dJ/dw0 = (2/n) sum (y_hat_i - y_i) ; dJ/dw1 = (2/n) sum (y_hat_i - y_i) x_i' },
      'Learning rate too large: oscillates or diverges. Too small: very slow. Scale features so one alpha suits all weights.',
      'Variants: batch (all data per step), stochastic (one example), mini-batch (a small batch; the usual default).',
      'Worked step with the data above, start w0 = w1 = 0, alpha = 0.01: predictions all 0, errors (y_hat - y) = -2, -4, -5, -4, -5. J = 17.2.',
      'dJ/dw0 = (2/5)(-20) = -8 ; dJ/dw1 = (2/5)(-2 -8 -15 -16 -25) = (2/5)(-66) = -26.4.',
      'w0 = 0 - 0.01(-8) = 0.08 ; w1 = 0 - 0.01(-26.4) = 0.264. New J = 10.49 (down from 17.2). Repeating converges to w0 = 2.2, w1 = 0.6.'
    ]},
    { heading: 'Assumptions and diagnostics', items: [
      '**Linearity**: mean of y is linear in the features (check residual vs fitted: curves mean missing non-linearity).',
      '**Independent errors**: no autocorrelation or grouped rows.',
      '**Constant variance (homoscedasticity)**: residual spread stable across fitted values (a funnel shape violates it).',
      '**Normality** of errors matters mainly for small-sample inference, not prediction.',
      'No severe **multicollinearity**: correlated predictors make coefficients unstable and hard to interpret even though predictions stay fine.',
      'Outlier (large residual), high-leverage point (extreme x), influential point (moves the fit): inspect, do not blindly delete.',
      'Do not extrapolate far outside the observed feature range.'
    ]},
    { heading: 'Regularisation: Ridge, Lasso, Elastic Net', items: [
      { type: 'formula', label: 'Ridge (L2)', text: 'J = MSE + lambda x sum w_j^2   (shrinks all weights towards zero, none exactly zero; closed form w = (X^T X + lambda I)^(-1) X^T y)' },
      { type: 'formula', label: 'Lasso (L1)', text: 'J = MSE + lambda x sum |w_j|   (can set weights exactly to zero: built-in feature selection, sparse model)' },
      { type: 'formula', label: 'Elastic Net', text: 'J = MSE + lambda [ r sum |w_j| + (1 - r)/2 sum w_j^2 ]   (mix of L1 sparsity and L2 stability)' },
      'lambda (alpha in scikit-learn) controls strength: 0 = ordinary least squares, large = heavy shrinkage (towards underfitting). Choose by cross-validation (RidgeCV, LassoCV).',
      'Features **must be standardised** first so the penalty treats all coefficients fairly; the intercept is not penalised.',
      'Ridge copes with multicollinearity (spreads weight across correlated features); Lasso picks one of a correlated group arbitrarily; Elastic Net is the compromise.',
      'A zero Lasso coefficient does not prove the feature is irrelevant.'
    ]},
    {"heading":"Lecture detail (Week 5)","items":["Why start with an interpretable baseline: **fast** (cheap to train and predict), **transparent** (coefficients show direction and relative change under stated assumptions), **competitive** (linear decision functions work when representation is suitable). If a complex model cannot improve meaningfully, keep the simpler workflow. Both linear and logistic regression are linear in their parameters.","Why square the residuals: positive and negative residuals cannot cancel and large errors get more weight; implication: extreme target errors strongly influence the fitted coefficients. Normal equation = theoretical, less suitable for large or ill-conditioned problems; iterative gradient-based solvers suit large data and regularised objectives.","Design matrix X: rows = examples, columns = represented features; preprocessing decides the columns and therefore the meaning of the coefficients. Categorical indicator coefficients compare a category with the reference category; interaction terms let one feature slope vary with another.","Assumptions (prediction vs inference are different goals): linearity (conditional mean captured by the chosen features), independent errors (dependence invalidates uncertainty estimates), constant variance (for classical standard errors), error distribution (normality mainly matters for small-sample inference, not for making predictions).","Residual vs fitted plot: random cloud = supports linear mean and stable spread; curve = missing nonlinear structure or interaction; funnel = non-constant variance or target-scale effects.","Outlier = unusual target value given the features; **high leverage** = unusual combination of feature values; **influential point** = substantially changes fitted parameters or predictions. Investigate provenance and sensitivity; do not delete a point merely because it is inconvenient.","Multicollinearity symptoms: large coefficient changes across folds, counterintuitive signs, wide uncertainty, unstable attribution; combined prediction may still be adequate. Responses: domain selection, combining variables, regularisation, dimensionality reduction.","Seven interpretation cautions: conditional on included features and transformations; omitted variables change relationships; a one-unit change may be unrealistic or outside the observed range; categorical coefficients depend on encoding and reference category; interactions change meaning of main effects; scaling changes magnitude and units; prediction evidence does not establish an intervention effect.","Why regularise: variance control (less sensitivity to the training sample), multicollinearity (more stable estimates for correlated variables), feature control (L1 zeroes coefficients). Ridge: features need comparable scales; tune lambda inside CV. Lasso: among strongly correlated features the selected variables can change across samples (instability); zero does not prove irrelevance. Elastic Net: penalty = lambda [alpha |w| + (1 - alpha) w^2] with l1_ratio mixing Ridge-like and Lasso-like behaviour; use with many correlated candidate features wanting shrinkage plus some sparsity.","Regularised pipeline: `make_pipeline(preprocessor, RidgeCV(alphas=[0.01, 0.1, 1, 10, 100]))`; compare predictive performance and coefficient stability. Evaluate with MAE / RMSE / R squared plus residual diagnostics, and compare with `DummyRegressor`. Prediction intervals need additional methods.","Coefficient comparison: unscaled coefficient = one raw unit; standardised coefficient = one training standard deviation. Check stability across CV folds, along the regularisation path (coefficients vs penalty strength) and by bootstrap / sensitivity analysis.","Common mistakes: causal language, unscaled penalties, extrapolation, test-set selection of features or C, ignoring interactions, ranking by coefficient magnitude (not importance unless representation and scale are comparable)."]}
  ],
  pitfalls: [
    'Forgetting to square the residuals (positives and negatives cancel).',
    'Dividing by n vs n-1 inconsistently; state which you use.',
    'Using unscaled features with Ridge/Lasso or gradient descent.',
    'Claiming a coefficient shows causation.',
    'Interpreting R squared on training data as generalisation.'
  ]
},
{
  id: 'logistic-regression', title: 'Logistic regression: sigmoid, odds, decision boundary, log-loss',
  priority: 4, tier: 'core', freq: 'est. high', marks: '10-15 marks',
  summary: '**Logistic regression passes a linear score z = w0 + w.x through the sigmoid p = 1/(1+e^-z) to get P(y=1|x), classifies with a threshold (boundary at z = 0), and is trained by minimising log-loss; exp(w_j) is the odds ratio.**',
  mnemonic: 'SLOG: Sigmoid squashes, Linear score, Odds ratio, Gradient on log-loss',
  source: ['CT4101_Notes_05_Linear_Logistic_Regression', 'CT4101_Notes_09_Neural_Networks'],
  sections: [
    { heading: 'Why not linear regression for classes', items: [
      'A linear output is unbounded (below 0 or above 1), so it is not a probability; binary outcomes do not have constant variance.',
      'Logistic regression is a **classifier** despite the name: a linear model for the log-odds.'
    ]},
    { heading: 'Model', items: [
      { type: 'formula', label: 'Score and sigmoid', text: 'z = w0 + w1x1 + ... + wd xd ;  p = sigma(z) = 1 / (1 + e^(-z)) = P(y = 1 | x)' },
      { type: 'formula', label: 'Odds and log-odds (logit)', text: 'odds = p / (1 - p) ;  ln( p / (1 - p) ) = w0 + w . x' },
      'sigma(0) = 0.5; sigma(z) tends to 1 as z grows and to 0 as z falls; sigma(-z) = 1 - sigma(z).',
      '**Decision rule**: predict class 1 if p >= 0.5 (equivalently z >= 0). The boundary is the hyperplane w0 + w.x = 0: **linear** in the features.',
      'Non-linear boundaries: add polynomial or interaction features.',
      '**Odds ratio**: exp(w_j) is the factor by which the odds multiply for a one-unit rise in x_j (others fixed). Example: w_age = 0.12 gives exp(0.12) = 1.13, so +13% odds per year.',
      'The threshold (default 0.5) is a separate policy decision: choose it on validation data using error costs.'
    ]},
    { heading: 'Loss: log-loss (binary cross-entropy)', items: [
      { type: 'formula', label: 'Log-loss', text: 'L = -(1/n) sum [ y_i ln(p_i) + (1 - y_i) ln(1 - p_i) ]' },
      'Confident and correct: loss near 0. Confidently wrong: loss very large (p = 0.01 for a true 1 costs 4.6). Penalises overconfidence; convex in the weights.',
      'Gradient (same form as linear regression!): dL/dw_j = (1/n) sum (p_i - y_i) x_ij and dL/dw0 = (1/n) sum (p_i - y_i). No closed form: solved iteratively (gradient descent, L-BFGS, saga).',
      'Maximising the likelihood of the labels is equivalent to minimising log-loss.'
    ]},
    { heading: 'Worked example', items: [
      'Model: z = -4 + 1.0 x, where x = hours studied. Boundary at x = 4 (z = 0, p = 0.5).',
      { type: 'table', head: ['x', 'y', 'z', 'p = sigma(z)', 'loss -ln(p or 1-p)'], rows: [
        ['2', '0', '-2', '0.1192', '0.1269'],
        ['3', '0', '-1', '0.2689', '0.3133'],
        ['5', '1', '1', '0.7311', '0.3133'],
        ['6', '1', '2', '0.8808', '0.1269'] ] },
      'Mean log-loss = (0.1269 + 0.3133 + 0.3133 + 0.1269) / 4 = 0.2201. Accuracy at threshold 0.5 = 4/4.',
      'Odds ratio for w1 = 1: e^1 = 2.718 (each extra hour multiplies the odds of passing by 2.7). At x = 5, odds = 0.7311/0.2689 = 2.718 = e^1.',
      'One gradient step (alpha = 0.5): errors p - y = 0.1192, 0.2689, -0.2689, -0.1192. dL/dw0 = 0 ; dL/dw1 = (0.2384 + 0.8067 - 1.3445 - 0.7152)/4 = -0.2537.',
      'w0 = -4 - 0.5(0) = -4 ; w1 = 1 - 0.5(-0.2537) = 1.1268. New mean log-loss 0.2077 (down from 0.2201).',
      { type: 'diagram', kind: 'line', caption: 'Sigmoid for z = -4 + x: probability crosses 0.5 at x = 4 (decision boundary).', data: {
        title: 'P(y = 1 | x) = sigmoid(-4 + x)', xLabel: 'Hours studied x', yLabel: 'Probability', xMin: 0, xMax: 8, yMin: 0, yMax: 1,
        series: [{ name: 'Sigmoid', points: [[0, 0.018], [1, 0.047], [2, 0.119], [3, 0.269], [4, 0.5], [5, 0.731], [6, 0.881], [7, 0.953], [8, 0.982]] }],
        hlines: [{ y: 0.5, label: 'Threshold 0.5' }] } }
    ]},
    { heading: 'Regularisation, multiclass, imbalance', items: [
      'scikit-learn applies L2 by default. **C = 1/lambda**: smaller C = stronger shrinkage. L1 penalty (solver such as saga/liblinear) gives sparse coefficients. Scale features first.',
      '**Multiclass**: softmax (multinomial) regression optimises a joint cross-entropy with one score per class, probabilities sum to 1; or one-vs-rest fits one binary classifier per class.',
      '**Imbalance**: class weights change the objective (more penalty for minority errors); then pick the operating point using precision-recall evidence. Changing a parameter does not "solve" imbalance.',
      'Strengths: simple, fast, probabilistic output, interpretable coefficients, strong baseline. Weaknesses: linear boundary, sensitive to multicollinearity and leakage, needs feature engineering for non-linearity.'
    ]},
    { heading: 'Linear vs logistic summary', items: [
      { type: 'table', head: ['', 'Linear regression', 'Logistic regression'], rows: [
        ['Target', 'Continuous number', 'Binary (or multiclass) category'],
        ['Output', 'y_hat = w.x (unbounded)', 'p = sigmoid(w.x) in (0, 1)'],
        ['Loss', 'Squared error (MSE)', 'Log-loss (cross-entropy)'],
        ['Solution', 'Closed form or gradient descent', 'Iterative only'],
        ['Metrics', 'MAE, RMSE, R squared, residuals', 'Confusion matrix, precision/recall, ROC, log-loss'] ] }
    ]},
    {"heading":"Lecture detail (Week 5)","items":["Three reasons not to use linear regression for a binary target: **range** (prediction can fall below 0 or above 1), **error structure** (binary outcomes do not have constant, Gaussian residuals), **decision geometry** (we need a probability model linked to a linear boundary).","z = 0: p = 0.5; z > 0: p above 0.5 approaching 1; z < 0: p below 0.5 approaching 0. Log-loss intuition: correct and confident = low loss; uncertain (p near 0.5) = moderate; confidently wrong = very large.","Decision boundary w0 + w.x = 0 corresponds to p = 0.5; parallel score levels map to different class probabilities (probability contours); polynomial or interaction features give nonlinear boundaries in raw input space.","Model estimates probability or ranking; threshold converts score to class using validation evidence; decision cost decides whether false positives or false negatives weigh more. Never tune the threshold on the protected test set.","scikit-learn: `LogisticRegression(C=1.0, max_iter=1000)`; C = inverse regularisation strength (smaller = stronger); `predict_proba(X)[:, 1]` gives P(class 1); `pred = prob >= 0.5`. L2 default (shrinks all); L1 gives sparse coefficients when the solver supports it; Elastic Net mixes both and needs a compatible solver such as saga. Choose C and any mixing parameter in cross-validation.","Class imbalance: `class_weight` increases the contribution of selected classes during fitting (alters the objective, not the data reality); choose a threshold matching error costs; evaluate with confusion counts, PR evidence and calibration. Never claim imbalance is solved by one parameter.","Multiclass: multinomial = joint cross-entropy objective with class probabilities summing to one; one-vs-rest = one binary classifier per class, combined. Solver and library version determine defaults.","Compare workflows: regression = continuous target, MAE / RMSE / R squared, residual patterns; classification = categorical target, probabilities, log loss, ROC / PR, calibration, confusion matrix, threshold selection. Both need protected evaluation, baselines and leakage-resistant preprocessing.","Portfolio baseline: fit Linear/LogisticRegression with the Week 3 preprocessing and Week 4 evaluation, compare to the dummy baseline, report primary and secondary metrics with CV variability, diagnostics, interpret a few coefficients in their units with limitations, fit one regularised alternative and compare performance and coefficient stability."]}
  ],
  pitfalls: [
    'Writing the sigmoid with the wrong sign (it is e to the minus z in the denominator).',
    'Saying the boundary is p = 0 (it is p = 0.5, z = 0).',
    'Reading w_j as a change in probability (it is a change in log-odds; exp(w_j) is the odds ratio).',
    'Tuning the threshold or C on the test set.',
    'Forgetting to scale features before regularised or gradient-based fitting.'
  ]
},
{
  id: 'knn', title: 'k-nearest neighbours (instance-based learning)',
  priority: 7, tier: 'core', freq: 'est. high', marks: '8-12 marks',
  summary: '**k-NN stores the training data and predicts for a query by taking the k closest examples (by a distance such as Euclidean) and voting (classification) or averaging (regression); it needs scaled features and a tuned k, and is slow at prediction time.**',
  mnemonic: 'k-NN = ask your k neighbours',
  source: ['CT4101_Notes_06_Instance_and_Tree_Based_Learning', 'CT4101_Notes_03_Data_Prep_Feature_Engineering'],
  sections: [
    { heading: 'Idea', items: [
      '**Instance-based (lazy) learning**: no explicit model is built; computation is deferred until prediction. A **non-parametric** method for classification and regression.',
      'Assumption: similar inputs have similar outputs, so the feature space and distance must express similarity.',
      'Training = store the examples (cheap). Prediction = compute distance to all n stored examples, find k smallest, aggregate (expensive: O(n d) per query by brute force; KD-trees / ball trees help in low dimension).'
    ]},
    { heading: 'Distance measures', items: [
      { type: 'formula', label: 'Euclidean (L2)', text: 'd(a, b) = sqrt( sum_j (a_j - b_j)^2 )   (straight line)' },
      { type: 'formula', label: 'Manhattan (L1)', text: 'd(a, b) = sum_j |a_j - b_j|   (axis-aligned steps; cheaper, less outlier-sensitive)' },
      { type: 'formula', label: 'Minkowski', text: 'd(a, b) = ( sum_j |a_j - b_j|^p )^(1/p)   (p = 1 Manhattan, p = 2 Euclidean)' },
      'Others: cosine similarity (direction, text), Hamming / Jaccard (binary or categorical).',
      'Example: a = (5.00, 2.50), b = (2.75, 7.50): Manhattan = 2.25 + 5.00 = 7.25; Euclidean = sqrt(5.0625 + 25) = 5.48.'
    ]},
    { heading: 'Algorithm', items: [
      '1. Choose k and a distance; scale features.',
      '2. Compute the distance from the query to every training example.',
      '3. Select the k nearest.',
      '4. Classification: majority vote (optionally weighted); regression: mean (or weighted mean) of their targets; neighbour proportions give a class probability.',
      '5. Break ties by odd k, by reducing k, or by choosing the nearest neighbour\'s class.',
      { type: 'formula', label: 'Distance-weighted vote and regression', text: 'weight w_i = 1 / d_i^2 (or 1/d) ; class score = sum of weights of neighbours in that class ; regression y_hat = sum(w_i y_i) / sum(w_i)' }
    ]},
    { heading: 'Worked example: query q = (3, 3)', items: [
      { type: 'table', head: ['Point', 'Coordinates', 'Class', 'Euclidean distance to q', 'Rank'], rows: [
        ['P6', '(2, 3)', 'A', '1.000', '1'],
        ['P3', '(4, 4)', 'B', '1.414', '2'],
        ['P4', '(3, 5)', 'B', '2.000', '3'],
        ['P2', '(2, 1)', 'A', '2.236', '4'],
        ['P1', '(1, 1)', 'A', '2.828', '5'],
        ['P5', '(6, 3)', 'B', '3.000', '6'] ] },
      '**k = 1**: nearest is P6, so class A.',
      '**k = 3** (P6 A, P3 B, P4 B): unweighted vote B = 2, A = 1, so class B.',
      '**k = 3 with weights 1/d^2**: A = 1/1 = 1.000; B = 1/2 + 1/4 = 0.750; A wins. Weighting flips the answer because the single closest neighbour is very close.',
      '**k = 5** (adds P2 A, P1 A): A = 3, B = 2, so class A (weighted: A = 1 + 0.2 + 0.125 = 1.325 vs B = 0.75, A).',
      'Lesson: the prediction depends on k and on weighting; choose k by cross-validation.'
    ]},
    { heading: 'Choosing k and bias-variance', items: [
      'Small k (k = 1): flexible, jagged boundary, low bias, **high variance**, overfits noise.',
      'Large k: smooth boundary, high bias, **underfits**; with imbalance the majority class dominates; k = n predicts the majority class everywhere.',
      'Typical range 5-21; use odd k for binary problems; pick by cross-validated score inside a Pipeline.'
    ]},
    { heading: 'Practical issues', items: [
      '**Scaling is essential**: income in the tens of thousands swamps age in tens. Example: query (age 25, income 50 000) vs X (26, 20 000) and Y (60, 50 500): raw Euclidean makes Y far closer (about 500 vs 30 000) despite a 35-year age gap. Standardise or min-max scale (inside the pipeline, fitted on the training set).',
      '**Irrelevant features** add noise to distances; use feature selection or weighting.',
      '**Curse of dimensionality**: in high dimensions all points become almost equidistant, neighbourhoods stop being local, and data become sparse; reduce dimension (PCA) or select features.',
      '**Categorical features**: one-hot encoding with Euclidean distance can mislead; use Hamming / Gower or mixed distances.',
      'Sensitive to outliers and noisy labels for small k; class imbalance biases votes (weighted voting, resampling).'
    ]},
    { heading: 'Strengths and weaknesses', items: [
      'Strengths: very simple, no training, naturally multiclass, non-linear boundaries, adapts as data is added, works for regression too.',
      'Weaknesses: slow and memory heavy at prediction, needs scaling and a good metric, poor in high dimensions, no interpretable model, poor extrapolation (regression stays within observed targets).'
    ]},
    {"heading":"Lecture detail (Week 6)","items":["Instance-based vs model-based: kNN stores training examples and delays most computation until prediction (the local neighbourhood is the model); a decision tree learns a compact hierarchy of feature tests in training and predicts along one root-to-leaf path. Both are non-parametric supervised methods for classification and regression.","**Inductive bias** (each algorithm assumes useful structure): kNN = nearby cases in the represented feature space have similar targets; decision tree = useful predictions can be expressed by axis-aligned recursive rules.","kNN procedure (5 steps): store prepared training examples; measure distance to the query; select the k nearest; aggregate neighbour labels; return class or class probability (neighbour proportion = local probability estimate). Slide example: k = 3 neighbours magenta, green, green gives green; k = 5 neighbours magenta, green, green, magenta, magenta gives magenta (k changes the answer).","Lecture dataset **College Athletes** (Speed, Agility, Draft yes/no, 20 instances): similarity is measured as distance in feature space, each feature is a dimension, and this scales to arbitrarily high dimensions. Example: ID 12 = [5.00, 2.50] vs query [2.75, 7.50]: Euclidean = sqrt(2.25^2 + 5^2) = 5.483; Manhattan = 2.25 + 5.00 = 7.25.","Distance comparison: Euclidean and Manhattan are the most common; Minkowski generalises both (p = 1 Manhattan, p = 2 Euclidean) so infinitely many metrics exist; Manhattan is cheaper (no squares or square root), a good choice for very large datasets with limited compute; try several metrics for the dataset; other measures: cosine similarity, Russel-Rao, Sokal-Michener.","Categorical features: one-hot mismatch adds distance even when categories have no natural order; high cardinality gives many sparse indicators that dominate neighbourhoods; mixed numeric and categorical data may not suit a single Euclidean metric. Scaling defines the geometry of neighbourhoods (use StandardScaler or RobustScaler inside the pipeline).","Weighting: uniform (each neighbour equal) vs distance (closer neighbours count more, often inverse distance); weighting helps local predictions but can amplify noisy near-duplicates.","Choosing k (lecture): at least 3 if not using 1-NN, often 5-21, application dependent, so experiment. Increasing k has a smoothing effect: too low overfits noisy data, too high underfits; in imbalanced data the majority class dominates for larger k. **k does not affect computational cost much**: most cost is computing distances from the query to all stored instances (linear in number of cases and attributes). Distance-weighted kNN can use all cases.","kNN regression: y_hat(x) = (1/k) sum of the k neighbours' targets; distance-weighted mean variant; predictions stay within the range of nearby observed targets, so extrapolation is poor.","Cost profile: training cost low (store examples, maybe build a search index); prediction cost high (compare with many stored examples or search an index: brute force, KD Tree, Ball Tree); memory cost = retain training data and targets. Curse of dimensionality: sparse space, distance concentration (nearest and farthest distances less distinguishable), feature noise from irrelevant dimensions; feature selection, representation design and enough data matter more than a better search structure.","sklearn: `KNeighborsClassifier(n_neighbors=7, weights=\"distance\")` with `metric` / `p` controlling geometry; tune `n_neighbors`, `weights` (uniform / distance) and `p` (1, 2) with `GridSearchCV` over the whole pipeline (param name `kneighborsclassifier__n_neighbors`), scoring e.g. f1; near-equal settings may not be meaningful; do error analysis (local ambiguity, minority-class misses, scaling issues).","Strengths: simple intuition, flexible boundaries, classification and regression, few modelling assumptions. Limitations: sensitive to scale, irrelevant features, dimension and local density; costly prediction. Best fit: moderate data size, meaningful distance, locally smooth target structure."]}
  ],
  pitfalls: [
    'Not scaling features (the biggest-unit feature dominates).',
    'Choosing k on the test set, or scaling before the split.',
    'Forgetting that k-NN "training" is storage and prediction is the expensive step.',
    'Using even k for binary classes and getting ties.',
    'Stating that larger k always improves accuracy.'
  ]
}
];
