module.exports = [
{
  id: 'mock2', title: 'Mock Paper 2', duration: 120,
  instructions: 'Answer any 4 of 6 questions. Each question is worth 25 marks. Duration 2 hours. NOTE: this format is ASSUMED (no real CT4101 paper was supplied); questions are original practice questions.',
  questions: [
    { n: 1, marks: 25, parts: [
      { label: 'a', marks: 6, topicId: 'bias-variance', text: 'Define bias, variance, underfitting and overfitting, and write the decomposition of expected squared error. [6]',
        outline: ['Bias: error from overly simple assumptions', 'Variance: sensitivity to the training sample', 'Underfitting: both errors high; overfitting: low train, high validation error', 'Error = bias^2 + variance + irreducible noise'] },
      { label: 'b', marks: 8, topicId: 'bias-variance', text: 'Models of increasing complexity give (training, validation) errors: A (0.45, 0.47), B (0.15, 0.20), C (0.03, 0.38). Diagnose each, choose the model to deploy, and propose two remedies for A and for C. Sketch the curves. [8]',
        outline: ['A: both high, gap 0.02: underfit / high bias', 'B: lowest validation error 0.20, small gap: choose B', 'C: gap 0.35: overfit / high variance', 'Remedies A: more features, more flexible model, less regularisation', 'Remedies C: more data, regularisation, early stopping, simpler model, pruning, bagging', 'Sketch: train falls monotonically, validation U-shaped with minimum at B'] },
      { label: 'c', marks: 11, topicId: 'regularisation', text: 'A model has weights (4, -1, 0.25). Compute the L1 and L2 penalty terms and the penalty added with lambda = 0.2 for each. Explain how L1 and L2 differ in effect, and describe dropout and early stopping. [11]',
        outline: ['L2 term = 16 + 1 + 0.0625 = 17.0625; penalty 3.4125', 'L1 term = 4 + 1 + 0.25 = 5.25; penalty 1.05', 'L2 shrinks all weights smoothly, penalises large weights most; L1 produces exact zeros / sparsity', 'Dropout: zero each hidden unit with probability p during training, off at test, ensemble-like, stops co-adaptation', 'Early stopping: stop when validation loss has not improved for patience epochs, restore best weights'] }
    ]},
    { n: 2, marks: 25, parts: [
      { label: 'a', marks: 6, topicId: 'logistic-regression', text: 'Explain why logistic regression is used for classification instead of linear regression, and write the model, the decision rule and the loss function. [6]',
        outline: ['Linear output unbounded, not a probability', 'p = sigmoid(w0 + w.x)', 'Predict 1 if p >= 0.5 (z >= 0); boundary w0 + w.x = 0 linear', 'Log-loss = -(1/n) sum [y ln p + (1-y) ln(1-p)]'] },
      { label: 'b', marks: 12, topicId: 'logistic-regression', text: 'A model uses z = -6 + 0.5 x1 + 1.0 x2. Compute P(y = 1) for (x1, x2) = (4, 2) and (8, 1.5). The true labels are 0 and 1 respectively: compute the log-loss for each and their mean. Give the odds ratio for x1 and the equation of the decision boundary. [12]',
        outline: ['(4,2): z = -2, p = 0.119 (predict 0, correct)', '(8,1.5): z = -0.5, p = 0.378 (predict 0, wrong)', 'Loss 1: -ln(1 - 0.119) = 0.127; loss 2: -ln(0.378) = 0.974; mean 0.551', 'Odds ratio for x1 = e^0.5 = 1.65', 'Boundary: 0.5 x1 + x2 = 6'] },
      { label: 'c', marks: 7, topicId: 'logistic-regression', text: 'Discuss two ways to handle a heavily imbalanced target in logistic regression and why accuracy is a poor metric. [7]',
        outline: ['Class weights, resampling, threshold moving chosen on validation data', 'Evaluate with PR curve, recall, precision, F1, AUC', 'Accuracy rewards predicting the majority class', 'Do not tune threshold on the test set'] }
    ]},
    { n: 3, marks: 25, parts: [
      { label: 'a', marks: 6, topicId: 'knn', text: 'Describe the k-NN algorithm for classification and regression, define lazy learning, and state the effect of k on bias and variance. [6]',
        outline: ['Find k nearest by distance, vote or average', 'Lazy: store data, compute at prediction', 'Small k: low bias high variance; large k: high bias low variance', 'Distance weighting optional'] },
      { label: 'b', marks: 13, topicId: 'knn', text: 'Training data (age, income in thousands, buys): (25, 40, N), (30, 60, Y), (45, 80, Y), (35, 50, N), (50, 100, Y). Classify the query (40, 70) with k = 3 using (i) raw Euclidean distance and (ii) min-max scaled features (age range 25-50, income range 40-100). Compare the neighbour rankings and comment. [13]',
        outline: ['Raw distances: N 33.54, Y 14.14, Y 11.18, N 20.62, Y 31.62', 'Raw k = 3: (45,80) Y, (30,60) Y, (35,50) N: Y', 'Scaling: age (a-25)/25, income (x-40)/60; query (0.60, 0.50)', 'Scaled distances: 0.781, 0.433, 0.260, 0.389, 0.640', 'Scaled k = 3: (45,80) Y, (35,50) N, (30,60) Y: Y', 'Both predict Y but the ranking changes; income dominated the raw distance (units); scaling is essential'] },
      { label: 'c', marks: 6, topicId: 'knn', text: 'Compare k-NN and decision trees in terms of training cost, prediction cost, need for scaling, interpretability and handling of high dimensions. [6]',
        outline: ['k-NN: no training, slow prediction, needs scaling, no model to inspect, suffers curse of dimensionality', 'Tree: training cost, fast prediction, no scaling, interpretable rules, can ignore irrelevant features but high variance', 'Choose by data and need'] }
    ]},
    { n: 4, marks: 25, parts: [
      { label: 'a', marks: 8, topicId: 'ensembles', text: 'Explain bagging and random forests. A bootstrap sample of 10 examples is drawn from 10: what fraction of the dataset is expected to be out-of-bag and why is that useful? [8]',
        outline: ['Bootstrap: sample n with replacement, train a tree on each, aggregate', 'Random forest adds random feature subset per split to decorrelate', 'P(not chosen) = (1 - 1/10)^10 = 0.349, so about 35% OOB (65.1% in-bag); limit 36.8%', 'OOB predictions give a free validation estimate'] },
      { label: 'b', marks: 7, topicId: 'ensembles', text: 'Average of B models with variance 1 and pairwise correlation r has variance r + (1 - r)/B. Compute it for r = 0.4, B = 50 and for r = 0.2, B = 50 and comment on why random forests decorrelate trees. [7]',
        outline: ['r = 0.4: 0.4 + 0.6/50 = 0.412', 'r = 0.2: 0.2 + 0.8/50 = 0.216', 'Reducing correlation matters more than adding trees: the r term is a floor', 'Random feature subsets stop a strong feature dominating all trees'] },
      { label: 'c', marks: 10, topicId: 'ensembles', text: 'Describe AdaBoost. Ten examples start with equal weight; the first weak learner misclassifies one. Compute its error, its weight alpha = 0.5 ln((1 - e)/e), and the normalised example weights. Then compare boosting with bagging. [10]',
        outline: ['e = 0.1; alpha = 0.5 ln 9 = 1.099', 'Misclassified weight 0.1 x e^alpha = 0.3; correct 0.1 / 3 = 0.0333 each (total 0.3)', 'Normalise by 0.6: misclassified 0.5; each correct 0.0556', 'Next learner focuses on the hard example', 'Boosting sequential, reduces bias, risk of noise chasing; bagging parallel, reduces variance, robust'] }
    ]},
    { n: 5, marks: 25, parts: [
      { label: 'a', marks: 9, topicId: 'data-prep', text: 'Values of a feature are 10, 20, 30, 40, 100. Compute the z-score of 100, the min-max scaled value of 20, and the robust-scaled value of 100 (median and IQR with Q1 = 20, Q3 = 40). Which scaler is least affected by the outlier? Which models need scaling? [9]',
        outline: ['mean 40, population std 31.62: z(100) = 1.90', 'Min-max of 20 = 10/90 = 0.111', 'Median 30, IQR 20: (100 - 30)/20 = 3.5', 'Robust scaler least affected by outliers', 'k-NN, k-means, PCA, neural nets, regularised linear models need it; trees do not', 'Fit statistics on training data only'] },
      { label: 'b', marks: 8, topicId: 'data-prep', text: 'Describe MCAR, MAR and MNAR missing data and three imputation strategies. Why must the imputer be fitted on training data only? [8]',
        outline: ['MCAR unrelated; MAR depends on observed; MNAR depends on the missing value itself', 'Mean/median, most frequent / unknown category, k-NN or iterative, missingness flag', 'Median for skew', 'Fitting on all data leaks test information; use Pipeline'] },
      { label: 'c', marks: 8, topicId: 'feature-eng', text: 'Explain filter, wrapper and embedded feature selection with an example of each, and explain the curse of dimensionality. [8]',
        outline: ['Filter: correlation / mutual information, model independent, fast', 'Wrapper: RFE / forward selection using model score, costly', 'Embedded: Lasso, tree importances', 'Curse: sparse data, distances converge, overfitting; fix with selection, PCA, regularisation, more data', 'Selection inside CV'] }
    ]},
    { n: 6, marks: 25, parts: [
      { label: 'a', marks: 12, topicId: 'cnn', text: 'A CNN takes 28 x 28 x 1 images. Layer 1: 8 filters 5x5, stride 1, no padding. Then 2x2 max-pooling. Layer 2: 16 filters 3x3, same padding. Then 2x2 max-pooling, flatten and a dense layer with 10 outputs. Give the output shape after each layer and the number of parameters in each learned layer and in total. [12]',
        outline: ['Conv1: (28 - 5)/1 + 1 = 24, shape 24x24x8; params (25 + 1) x 8 = 208', 'Pool: 12x12x8', 'Conv2: same padding, 12x12x16; params (3x3x8 + 1) x 16 = 1168', 'Pool: 6x6x16; flatten 576', 'Dense: 576 x 10 + 10 = 5770', 'Total 208 + 1168 + 5770 = 7146'] },
      { label: 'b', marks: 7, topicId: 'cnn', text: 'Explain local connectivity, weight sharing and pooling, and why they make CNNs better than fully connected nets for images. [7]',
        outline: ['Local: each unit sees a small patch', 'Sharing: same filter across positions, fewer parameters, translation equivariance', 'Pooling: shrinks maps, invariance, less computation', 'Dense nets: huge parameters, no spatial structure'] },
      { label: 'c', marks: 6, topicId: 'cnn', text: 'You have 800 labelled medical images. Describe transfer learning with feature extraction and fine-tuning and recommend an approach with justification. [6]',
        outline: ['Reuse pretrained base (ImageNet)', 'Feature extraction: freeze base, train new head', 'Fine-tuning: unfreeze top layers with very small learning rate', 'Small dataset: start with feature extraction, then cautious fine-tuning; augmentation; domain shift caveat; compare with baseline'] }
    ]}
  ]
}
];
