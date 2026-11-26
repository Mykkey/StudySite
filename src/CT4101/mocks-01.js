module.exports = [
{
  id: 'mock1', title: 'Mock Paper 1', duration: 120,
  instructions: 'Answer any 4 of 6 questions. Each question is worth 25 marks. Duration 2 hours. NOTE: this format is ASSUMED (no real CT4101 paper was supplied); questions are original practice questions.',
  questions: [
    { n: 1, marks: 25, parts: [
      { label: 'a', marks: 5, topicId: 'eval-metrics', text: 'Define precision, recall and F1 score for a binary classifier and state, with a real-world example for each, when you would prioritise precision and when recall. [5]',
        outline: ['Precision = TP/(TP+FP): of predicted positives how many are real', 'Recall = TP/(TP+FN): of actual positives how many are found', 'F1 = 2PR/(P+R), harmonic mean, ignores TN', 'Prioritise precision when false positives are costly (spam filter deleting real mail)', 'Prioritise recall when false negatives are costly (cancer screening, fraud)'] },
      { label: 'b', marks: 10, topicId: 'eval-metrics', text: 'A classifier is tested on 300 cases: TP = 72, FN = 18, FP = 24, TN = 186. Draw the confusion matrix and compute accuracy, precision, recall, specificity and F1. [10]',
        outline: ['Matrix: actual positive 72 / 18, actual negative 24 / 186 (predicted positive, predicted negative)', 'Accuracy = 258/300 = 0.86', 'Precision = 72/96 = 0.75', 'Recall = 72/90 = 0.80', 'Specificity = 186/210 = 0.886', 'F1 = 2(0.75)(0.80)/1.55 = 0.774', 'Method marks for correct formulas shown'] },
      { label: 'c', marks: 4, topicId: 'eval-metrics', text: 'The majority-class baseline for part (b) would score what accuracy? Explain why this matters when interpreting the classifier. [4]',
        outline: ['Negatives = 210 of 300 so baseline = 0.70', 'Classifier 0.86 beats baseline by 16 points', 'Accuracy alone hides class-specific errors: report precision/recall, balanced accuracy (0.843)', 'With stronger imbalance accuracy becomes uninformative'] },
      { label: 'd', marks: 6, topicId: 'validation-cv', text: 'Explain 5-fold cross-validation and describe two ways data leakage could occur when the data are scaled and a model is tuned. [6]',
        outline: ['Split into 5 folds; train on 4, validate on 1, rotate; report mean and std', 'Uses all data for validation once, shows variability', 'Leakage 1: scaler fitted on all data before splitting; fix with Pipeline fitted per training fold', 'Leakage 2: choosing hyperparameters or threshold using the test set; use validation / nested CV and open the test set once'] }
    ]},
    { n: 2, marks: 25, parts: [
      { label: 'a', marks: 4, topicId: 'decision-trees', text: 'Define entropy and information gain and explain how a decision tree uses them to choose a split. [4]',
        outline: ['Entropy H = -sum p log2 p: impurity, 0 pure, 1 for 50/50 binary', 'IG = H(parent) minus weighted average child entropy', 'Choose the feature with highest IG at each node (greedy), recurse'] },
      { label: 'b', marks: 14, topicId: 'decision-trees', text: 'Eight loan applications: (High income, Student, Approve), (High, Student, Approve), (High, Not student, Approve), (High, Not student, Reject), (Low, Student, Approve), (Low, Not student, Reject), (Low, Not student, Reject), (Low, Not student, Reject). Compute the entropy of the root, the information gain of Income and of Student, choose the root, and then complete the tree. Draw it. [14]',
        outline: ['Root: 4 Approve, 4 Reject: H = 1.000 (Gini 0.5)', 'Income: High 3A1R (H 0.811), Low 1A3R (0.811): weighted 0.811; IG = 0.189', 'Student: Yes 3A0R (H 0), No 1A4R (H 0.722): weighted 5/8 x 0.722 = 0.451; IG = 0.549', 'Student is the root', 'Student = Yes: pure Approve', 'Student = No (1A, 4R): split on Income: Low = 3R pure Reject; High = 1A1R tie (no features left), leaf with tie-break/majority rule noted', 'Tree drawn with edge labels'],
        diagram: { kind: 'tree', caption: 'Model answer tree', data: { root: { label: 'Student?', children: [{ label: 'Approve', edge: 'Yes' }, { label: 'Income?', edge: 'No', children: [{ label: 'Reject', edge: 'Low' }, { label: 'Tie 1A / 1R', edge: 'High' }] }] } } } },
      { label: 'c', marks: 7, topicId: 'decision-trees', text: 'Explain why unrestricted trees overfit and describe two methods to control it. How do random forests further improve on a single tree? [7]',
        outline: ['Grow to pure leaves, memorise noise: low bias high variance, unstable', 'Pre-pruning: max depth, min samples per leaf / split, min gain', 'Post-pruning: grow then prune with validation (cost-complexity)', 'Random forest: bootstrap samples + random feature subset per split, average votes: variance falls, more stable', 'Cost: less interpretable'] }
    ]},
    { n: 3, marks: 25, parts: [
      { label: 'a', marks: 12, topicId: 'linear-regression', text: 'Data (x, y): (1, 3), (2, 5), (3, 4), (4, 8). Use least squares to find the regression line, compute SSE and R squared, and predict y at x = 5. [12]',
        outline: ['xm = 2.5, ym = 5', 'Sxy = (-1.5)(-2) + (-0.5)(0) + (0.5)(-1) + (1.5)(3) = 3 + 0 - 0.5 + 4.5 = 7; Sxx = 5', 'w1 = 1.4; w0 = 5 - 3.5 = 1.5; y_hat = 1.5 + 1.4x', 'Predictions 2.9, 4.3, 5.7, 7.1; residuals 0.1, 0.7, -1.7, 0.9; SSE = 0.01 + 0.49 + 2.89 + 0.81 = 4.2', 'SST = 4 + 0 + 1 + 9 = 14; R squared = 1 - 4.2/14 = 0.70', 'Prediction at x = 5: 1.5 + 7 = 8.5'] },
      { label: 'b', marks: 7, topicId: 'linear-regression', text: 'Starting from w0 = 1, w1 = 1 with learning rate 0.05 and loss J = (1/n) sum (y_hat - y)^2, perform one gradient-descent update on the data in (a) and show the loss decreases. [7]',
        outline: ['Errors y_hat - y: 2-3 = -1, 3-5 = -2, 4-4 = 0, 5-8 = -3', 'J = (1 + 4 + 0 + 9)/4 = 3.5', 'dJ/dw0 = (2/4)(-6) = -3; dJ/dw1 = (2/4)(-1 - 4 + 0 - 12) = -8.5', 'w0 = 1 + 0.15 = 1.15; w1 = 1 + 0.425 = 1.425', 'New J = 1.133 < 3.5'] },
      { label: 'c', marks: 6, topicId: 'linear-regression', text: 'Explain how Ridge and Lasso regression differ and when you would prefer each. Why must features be standardised? [6]',
        outline: ['Ridge adds lambda sum w^2: shrinks, rarely zero, handles multicollinearity', 'Lasso adds lambda sum |w|: exact zeros, sparse, feature selection', 'Prefer Ridge for many correlated useful features; Lasso when few features matter / want selection; Elastic Net compromise', 'Penalty depends on coefficient size which depends on units; standardise so penalty is fair', 'lambda chosen by CV'] }
    ]},
    { n: 4, marks: 25, parts: [
      { label: 'a', marks: 6, topicId: 'neural-nets', text: 'Describe an artificial neuron, and explain why a network needs non-linear activation functions. Give the formula and one use for each of sigmoid, ReLU and softmax. [6]',
        outline: ['Neuron: z = w.x + b, a = phi(z)', 'Without non-linearity, layers collapse to one linear map', 'Sigmoid 1/(1+e^-z): binary output probability', 'ReLU max(0,z): hidden layers default', 'Softmax e^zi / sum e^zj: multiclass output'] },
      { label: 'b', marks: 11, topicId: 'neural-nets', text: 'A network has inputs x = (1, 2), two ReLU hidden neurons and one sigmoid output. Hidden 1: weights (0.5, 0.25), bias -0.5. Hidden 2: weights (-1, 0.5), bias -1.5. Output weights (2, -1), bias 0.1. Compute the output probability and the binary cross-entropy if the true label is 1 and if it is 0. Count the parameters. [11]',
        outline: ['z1 = 0.5 + 0.5 - 0.5 = 0.5, h1 = 0.5', 'z2 = -1 + 1 - 1.5 = -1.5, ReLU gives h2 = 0 (inactive)', 'zo = 2(0.5) - 1(0) + 0.1 = 1.1; p = sigmoid(1.1) = 0.750', 'Loss if y = 1: -ln 0.750 = 0.287; if y = 0: -ln 0.250 = 1.387', 'Parameters: hidden 2x2 + 2 = 6, output 2 + 1 = 3, total 9'] },
      { label: 'c', marks: 8, topicId: 'neural-nets', text: 'Logits for a three-class problem are (3, 2, 1) and the true class is the first. Compute the softmax probabilities and the categorical cross-entropy. State which output activation and loss you would use for (i) regression, (ii) binary, (iii) multilabel classification. [8]',
        outline: ['exp: 20.09, 7.389, 2.718; sum 30.19', 'Softmax 0.665, 0.245, 0.090 (same as logits 2,1,0: shift invariance)', 'Loss = -ln 0.665 = 0.408', '(i) linear + MSE', '(ii) sigmoid + binary cross-entropy', '(iii) independent sigmoids + binary cross-entropy per label'] }
    ]},
    { n: 5, marks: 25, parts: [
      { label: 'a', marks: 10, topicId: 'kmeans-clustering', text: 'Apply k-means with k = 2 to the one-dimensional data 1, 2, 4, 9, 11, 12 with initial centroids 1 and 4. Show every iteration, the final clusters and the final SSE. [10]',
        outline: ['Iter 1: 1,2 to C1 (distance 0, 1 vs 3, 2); 4, 9, 11, 12 to C2', 'Centroids 1.5 and (4+9+11+12)/4 = 9', 'Iter 2: 4 now nearer 1.5? |4-1.5| = 2.5 vs |4-9| = 5: moves to C1; clusters {1,2,4}, {9,11,12}', 'Centroids 2.333 and 10.667', 'Iter 3: no change: converged', 'SSE = (1.78 + 0.11 + 2.78) + (2.78 + 0.11 + 1.78) = 9.33'] },
      { label: 'b', marks: 5, topicId: 'kmeans-clustering', text: 'Name two weaknesses of k-means and describe how DBSCAN overcomes one of them. [5]',
        outline: ['k must be chosen; local optima/seed sensitivity; spherical clusters; outliers; scaling', 'DBSCAN: eps and min_samples; core / border / noise', 'Finds arbitrary shapes, no k, labels noise'] },
      { label: 'c', marks: 10, topicId: 'pca', text: 'A covariance matrix of two centred features is [[3, 1], [1, 3]]. Find the eigenvalues and eigenvectors, the proportion of variance explained by each component, and explain what PCA would do with this data. Why standardise first? [10]',
        outline: ['det: (3 - L)^2 - 1 = 0 so L = 4 and 2', 'Eigenvectors (1,1)/sqrt2 for 4; (1,-1)/sqrt2 for 2', 'Explained variance 4/6 = 66.7% and 33.3%', 'PCA rotates to these axes; keeping PC1 retains two thirds of the variance (dimension reduction 2 to 1)', 'Standardise because PCA is variance based and unit-sensitive; fit on training data only'] }
    ]},
    { n: 6, marks: 25, parts: [
      { label: 'a', marks: 8, topicId: 'interpretability', text: 'Distinguish global and local explanations. Describe permutation importance and LIME, and state one limitation of each. [8]',
        outline: ['Global: overall drivers; local: one prediction', 'Permutation importance: shuffle a feature on held-out data, drop in score; limitation correlated features', 'LIME: perturb instance, fit weighted simple surrogate locally; limitation instability / only local fidelity', 'Importances are not causal'] },
      { label: 'b', marks: 9, topicId: 'fairness-ai', text: 'A hiring model selects 40% of 200 group X applicants and 20% of 100 group Y applicants. Compute the disparate-impact ratio, comment using the four-fifths rule, and describe three sources of bias and two mitigation strategies. [9]',
        outline: ['Selection rates 0.40 and 0.20: ratio 0.5 < 0.8 so adverse impact / demographic parity violated', 'Sources: historical, sampling, measurement / proxy features, label bias, evaluation bias', 'Mitigation: reweighting / better data, fairness constraints, group thresholds, human oversight, monitoring', 'Mention impossibility of satisfying all criteria when base rates differ'] },
      { label: 'c', marks: 8, topicId: 'deployment', text: 'Explain data drift and concept drift and describe how you would monitor and respond to drift after deploying a model. [8]',
        outline: ['Data drift P(x) changes; concept drift P(y|x) changes', 'Monitor software, input and output metrics; performance once labels arrive; subgroup metrics; alert thresholds', 'Response: investigate, collect new data, retrain candidate, validate, canary / blue-green release, rollback plan', 'Feedback loops and ownership'] }
    ]}
  ]
}
];
