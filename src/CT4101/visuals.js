// "Big picture" graphic per topic. G = boxes of short points, F = step-by-step flow.
const G = (...g) => ({ kind: 'groups', data: { groups: g.map(([title, items]) => ({ title, items: items.split('|') })) } });
const F = (...s) => ({ kind: 'flow', data: { direction: 'col', steps: s.map((x, i) => { const [label, sub] = x.split(':'); return { label, sub, color: i % 5 }; }) } });
module.exports = {
  'eval-metrics': G(['Precision', 'TP / (TP + FP)|Of predicted positives'], ['Recall', 'TP / (TP + FN)|Of actual positives'], ['Specificity', 'TN / (TN + FP)|Of actual negatives'], ['F1', 'Harmonic mean of precision and recall']),
  'validation-cv': F('Split off a test set:do not touch it', 'Training data:fit everything, including scaling', 'Validation or k folds:tune', 'Test set:report once'),
  'knn': F('Scale the features', 'Compute distance to every training point', 'Take the k closest', 'Vote (classes) or average (numbers)'),
  'ensembles': G(['Bagging / random forest', 'Trees trained independently|Bootstrap samples|Average or vote|Reduces variance'], ['Boosting', 'Weak learners in sequence|Each fixes the last|Reduces bias']),
  'pca': F('Centre (and scale)', 'Covariance matrix', 'Eigenvectors, sorted by eigenvalue', 'Project onto the top few', 'Variance explained:eigenvalue / sum of eigenvalues'),
  'data-prep': F('Audit the data', 'Fix invalid values', 'Handle missing values', 'Scale numbers', 'Encode categories:learn all settings on training data only'),
  'cnn': F('Image', 'Convolution:small shared filters make feature maps', 'Pooling:shrinks the maps', 'Dense head', 'Prediction'),
  'interpretability': G(['Transparent models', 'Linear|Trees'], ['Global (whole model)', 'Permutation importance|PDP'], ['Local (one prediction)', 'LIME|SHAP|Counterfactuals']),
  'fairness-ai': G(['Bias enters via', 'Data|Labels|Features|Model|Deployment'], ['Measure', 'Demographic parity|Equal opportunity'], ['Manage', 'Oversight|Model cards|Privacy|EU AI Act']),
  'feature-eng': G(['Good features', 'Available at prediction time|Meaningful|Stable'], ['Selection', 'Filter|Wrapper|Embedded'], ['Why', 'Curse of dimensionality: data gets sparse']),
  'deployment': F('Choose serving:batch, real-time or human in the loop', 'Release safely:shadow, canary, blue-green', 'Monitor:data, model and system drift', 'Retrain:automated, versioned pipeline'),
  'sequence-models': G(['RNN', 'Step by step|Hidden state|Vanishing gradients'], ['LSTM', 'Adds gates'], ['Transformer', 'Self-attention|Parallel training']),
  'python-ecosystem': G(['Environment', 'Isolated and recorded'], ['NumPy', 'Fast arrays'], ['pandas', 'Tables'], ['scikit-learn', 'fit / predict / transform|Pipelines']),
};
