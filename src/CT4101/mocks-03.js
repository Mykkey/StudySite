module.exports = [
{
  id: 'mock3', title: 'Mock Paper 3', duration: 120,
  instructions: 'Answer any 4 of 6 questions. Each question is worth 25 marks. Duration 2 hours. NOTE: this format is ASSUMED (no real CT4101 paper was supplied); questions are original practice questions.',
  questions: [
    { n: 1, marks: 25, parts: [
      { label: 'a', marks: 14, topicId: 'eval-metrics', text: 'A model scores ten cases (score, true class): (0.90, +), (0.80, +), (0.70, -), (0.60, +), (0.50, -), (0.40, +), (0.30, -), (0.20, -), (0.10, -), (0.05, -). For thresholds 0.85, 0.65, 0.45 and 0.25 (predict positive if score >= threshold) give the confusion counts, TPR, FPR and precision. Sketch the ROC points and compute the AUC from pairs. [14]',
        outline: ['0.85: TP1 FP0 FN3 TN6; TPR 0.25, FPR 0, precision 1.0', '0.65: TP2 FP1 FN2 TN5; TPR 0.5, FPR 0.167, precision 0.667', '0.45: TP3 FP2 FN1 TN4; TPR 0.75, FPR 0.333, precision 0.6', '0.25: TP4 FP3 FN0 TN3; TPR 1.0, FPR 0.5, precision 0.571', 'ROC points (FPR, TPR): (0,0.25), (0.167,0.5), (0.333,0.75), (0.5,1), (1,1)', 'AUC = fraction of positive-negative pairs ranked correctly: 6 + 6 + 5 + 4 = 21 of 24 = 0.875'] },
      { label: 'b', marks: 6, topicId: 'eval-metrics', text: 'Explain how lowering the threshold changes precision and recall, and how you would choose the operating point for a disease-screening model. [6]',
        outline: ['Lower threshold: more predicted positives, recall up, precision generally down (seen in table)', 'Choose using validation data and error costs: missing disease costly so favour recall, accept false alarms, follow-up test', 'Use PR curve with imbalance; never tune on test'] },
      { label: 'c', marks: 5, topicId: 'eval-metrics', text: 'Compare MAE, RMSE and R squared for regression evaluation. [5]',
        outline: ['MAE average absolute error, robust, target units', 'RMSE penalises large errors, target units', 'R squared = 1 - SSE/SST variance explained, unitless, can be negative', 'Check residual plots too'] }
    ]},
    { n: 2, marks: 25, parts: [
      { label: 'a', marks: 15, topicId: 'decision-trees', text: 'A node holds 12 examples: 7 Yes and 5 No. Feature A splits it into left (6 Yes, 0 No) and right (1 Yes, 5 No). Feature B splits it into left (5 Yes, 3 No) and right (2 Yes, 2 No). Compute the Gini impurity of the node, the weighted Gini and Gini gain for A and B, and the entropy-based information gain for both. Which feature is chosen? [15]',
        outline: ['Node Gini = 1 - (7/12)^2 - (5/12)^2 = 0.486; entropy 0.980', 'A: Gini left 0, right 1 - (1/36 + 25/36) = 0.278; weighted 0.139; gain 0.347', 'B: Gini left 0.469, right 0.5; weighted 0.479; gain 0.007', 'Entropy A: left 0, right 0.650; weighted 0.325; IG = 0.655', 'Entropy B: left 0.954, right 1.0; weighted 0.970; IG = 0.010', 'Choose A under both criteria'] },
      { label: 'b', marks: 10, topicId: 'decision-trees', text: 'Describe how trees handle continuous features and regression targets, and discuss the strengths and weaknesses of decision trees. [10]',
        outline: ['Continuous: try thresholds between sorted values, choose best by gain', 'Regression: leaf = mean, split minimises variance / MSE', 'Strengths: interpretable, no scaling, mixed types, fast prediction, captures interactions', 'Weaknesses: high variance, unstable, greedy, axis-aligned boundaries, no extrapolation', 'Remedies: pruning, ensembles'] }
    ]},
    { n: 3, marks: 25, parts: [
      { label: 'a', marks: 5, topicId: 'training-nn', text: 'Outline the four stages of one training iteration of a neural network and define epoch and mini-batch. [5]',
        outline: ['Forward pass, loss, backpropagation (gradients by chain rule), parameter update', 'Epoch: one pass through all training data', 'Mini-batch: subset of examples per update', 'Iterations per epoch = n / batch size'] },
      { label: 'b', marks: 14, topicId: 'training-nn', text: 'A single sigmoid neuron has weights (0.5, -0.25), bias 0.1, input x = (1, 2) and target 1, with binary cross-entropy loss. Compute the output and loss, the gradients with respect to the weights and bias, and the updated parameters with learning rate 0.5. Show that the loss decreases. [14]',
        outline: ['z = 0.5 - 0.5 + 0.1 = 0.1; p = 0.525; loss = -ln 0.525 = 0.644', 'dL/dz = p - y = -0.475', 'dL/dw1 = -0.475; dL/dw2 = -0.950; dL/db = -0.475', 'w1 = 0.5 + 0.2375 = 0.7375; w2 = -0.25 + 0.475 = 0.225; b = 0.1 + 0.2375 = 0.3375', 'New z = 0.7375 + 0.45 + 0.3375 = 1.525; p = 0.821; loss 0.197 < 0.644'] },
      { label: 'c', marks: 6, topicId: 'training-nn', text: 'Describe the vanishing gradient problem and three ways to reduce it. Describe how Adam differs from plain SGD. [6]',
        outline: ['Gradients shrink through many small derivatives (sigmoid max 0.25), early layers do not learn', 'ReLU, good initialisation, batch norm, residual connections, LSTM', 'Adam: momentum (first moment) + RMSprop (second moment) with bias correction, per-parameter adaptive step'] }
    ]},
    { n: 4, marks: 25, parts: [
      { label: 'a', marks: 15, topicId: 'kmeans-clustering', text: 'Cluster the points (1,2), (2,1), (1,1), (8,9), (9,8), (8,8), (4,4) with k = 2 and initial centroids (1,2) and (8,9). Show the distance table, assignments, updated centroids, convergence and final SSE. [15]',
        outline: ['Distances to (1,2) / (8,9): (1,2) 0/9.90; (2,1) 1.41/10.00; (1,1) 1.00/10.63; (8,9) 9.90/0; (9,8) 10.00/1.41; (8,8) 9.22/1.00; (4,4) 3.61/6.40', 'Assign first three and (4,4) to C1; the other three to C2', 'Centroids C1 = (2, 2); C2 = (8.33, 8.33)', 'Second iteration: assignments unchanged: converged', 'SSE = 12 + 1.33 = 13.33'] },
      { label: 'b', marks: 10, topicId: 'kmeans-clustering', text: 'Explain the elbow method and the silhouette coefficient. Compute the silhouette of a point whose mean distance to its own cluster is 2 and to the nearest other cluster is 5. [10]',
        outline: ['Elbow: plot SSE against k, choose where improvement flattens; SSE always falls as k rises', 'Silhouette s = (b - a)/max(a, b) in [-1, 1]', 's = (5 - 2)/5 = 0.6: well clustered', 'Average over points, choose k with highest', 'Both subjective; domain knowledge'] }
    ]},
    { n: 5, marks: 25, parts: [
      { label: 'a', marks: 10, topicId: 'pca', text: 'Describe the steps of PCA and explain what an eigenvalue and an eigenvector represent. [10]',
        outline: ['Standardise / centre', 'Covariance matrix', 'Eigen decomposition: eigenvector = direction, eigenvalue = variance along it', 'Sort descending, choose m by cumulative variance / scree', 'Project X onto top m eigenvectors', 'Fit on training data only'] },
      { label: 'b', marks: 8, topicId: 'pca', text: 'The eigenvalues of a 4-feature covariance matrix are 5.0, 2.5, 1.5 and 1.0. Compute the explained-variance ratio of each component and the number of components needed for at least 85% variance. [8]',
        outline: ['Total 10', 'Ratios 0.50, 0.25, 0.15, 0.10', 'Cumulative 0.50, 0.75, 0.90, 1.0', 'Three components reach 90% (>= 85%); two give only 75%'] },
      { label: 'c', marks: 7, topicId: 'pca', text: 'Compare PCA with feature selection and state two limitations of PCA. [7]',
        outline: ['PCA builds new orthogonal combined features; selection keeps a subset of original features', 'Selection preserves interpretability', 'Limitations: linear, scale sensitive, variance is not class separation, components hard to interpret, leakage if fitted on all data', 'Alternatives: t-SNE, UMAP, autoencoders for non-linear'] }
    ]},
    { n: 6, marks: 25, parts: [
      { label: 'a', marks: 8, topicId: 'interpretability', text: 'Base value 0.20. A model predicts 0.35 using only feature A, 0.50 using only B, and 0.70 using both. Compute the Shapley values of A and B and verify they sum to the prediction minus the base value. [8]',
        outline: ['phi_A = 0.5[(0.35 - 0.20) + (0.70 - 0.50)] = 0.5(0.15 + 0.20) = 0.175', 'phi_B = 0.5[(0.50 - 0.20) + (0.70 - 0.35)] = 0.5(0.30 + 0.35) = 0.325', 'Sum 0.50 = 0.70 - 0.20', 'Interpretation: B contributes more; additive attribution'] },
      { label: 'b', marks: 9, topicId: 'fairness-ai', text: 'Define demographic parity, equal opportunity and predictive parity. Explain why they cannot generally all be satisfied and what a responsible team should do. [9]',
        outline: ['Demographic parity: equal selection rates', 'Equal opportunity: equal TPR', 'Predictive parity: equal precision', 'If base rates differ, calibration and equal error rates conflict (Kleinberg / Chouldechova)', 'Choose criterion from context and harm, document trade-off, audit subgroups, human oversight, model card, monitor'] },
      { label: 'c', marks: 8, topicId: 'deployment', text: 'Compare batch, real-time and human-in-the-loop deployment, and describe canary and blue-green releases. [8]',
        outline: ['Batch: scheduled scoring, cheap, stale', 'Real-time: per request, low latency, scaling', 'Human-in-the-loop: person reviews high-risk or low-confidence cases', 'Canary: small share of traffic first; blue-green: two environments, switch and rollback', 'Monitoring and rollback plan'] }
    ]}
  ]
}
];
