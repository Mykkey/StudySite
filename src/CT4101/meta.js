module.exports = {
  name: 'Machine Learning',
  evidence: 'estimated',
  exam: {
    summary: [
      'Format unknown: no past paper supplied; likely mix of definitions, short answers and worked calculations.',
      'Assumed (not confirmed): 2 hours, answer any 4 of 6 questions, 25 marks each. Check the module page / lecturer for the real rules.',
      'Expect calculation parts (confusion matrix metrics, entropy / information gain, k-NN distances, linear or logistic regression, k-means, forward pass) next to explain-and-compare parts (bias-variance, ensembles, regularisation, fairness).',
      'Priorities in this site are ESTIMATED from lecture emphasis (time spent, number of slides, worked examples, formulas) and standard ML exam patterns, not from a tally of past papers.'
    ],
    structure: [
      { label: 'Assumed Section pattern', detail: '6 questions x 25 marks, answer 4. Each question typically 3 to 5 parts: a definition (3-5 marks), a worked calculation (8-12 marks), an explain / compare / critique part (6-10 marks).' },
      { label: 'Calculation parts', detail: 'Metrics from a confusion matrix, entropy / Gini / information gain, k-NN with a given k, a gradient-descent or least-squares step, a sigmoid / log-loss value, one k-means iteration, PCA variance explained, a neural-network forward pass (and maybe one backprop step).' },
      { label: 'Discussion parts', detail: 'Bias-variance and over/underfitting, leakage and evaluation design, regularisation (L1/L2/dropout/early stopping), bagging vs boosting, interpretability (SHAP/LIME/permutation importance), fairness and responsible AI, deployment and monitoring.' }
    ],
    tips: [
      'About 1.5 minutes per mark: a 25-mark question is roughly 30 minutes of a 2-hour paper.',
      'For calculations always write the formula first, then substitute numbers, then the result with 2-4 decimal places: method marks are given even if arithmetic slips.',
      'Name the denominators: precision = TP/(TP+FP), recall = TP/(TP+FN), specificity = TN/(TN+FP). State the result in words (what it means for the problem).',
      'For compare / explain questions use a tight structure: definition, mechanism, advantage, disadvantage, when to use, one example.',
      'Always connect evaluation answers to leakage: fit scalers, imputers, feature selection and hyperparameter search on training folds only; keep the test set until the very end.',
      'Draw small sketches when allowed (decision tree, training vs validation curve, network diagram): a labelled sketch earns marks quickly.'
    ],
    note: 'No past papers were supplied for CT4101, so frequency counts and years are omitted on purpose. Topic order is an estimate.'
  },
  hints: null
};
