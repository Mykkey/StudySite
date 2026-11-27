module.exports = [
  {
    "id": "data-prep",
    "title": "Data preparation: cleaning, missing data, scaling, encoding",
    "priority": 14,
    "tier": "core",
    "freq": "est. medium-high",
    "marks": "8-12 marks",
    "summary": "**Audit the data, handle invalid values and missingness, scale numeric features and encode categoricals using parameters learned on the training set only (inside a Pipeline / ColumnTransformer) to avoid leakage.**",
    "mnemonic": "Audit, Clean, Impute, Scale, Encode, all inside a Pipeline",
    "source": [
      "CT4101_Notes_03_Data_Prep_Feature_Engineering",
      "CT4101_Notes_02_Python_ML_Ecosystem"
    ],
    "sections": [
      {
        "heading": "Why preparation matters",
        "items": [
          "A model can only learn from the representation it is given: preparation is part of model design, not a neutral step.",
          "Cleaning (fix invalid data), transformation (change representation), feature engineering (create task-relevant features), feature selection (choose a subset).",
          "Data audit first: rows and columns, identifiers, conceptual vs stored type (a postcode stored as a number), target distribution, missingness pattern, duplicates, provenance, features unavailable at prediction time. Preserve raw data; make transformations reproducible in code."
        ]
      },
      {
        "heading": "Duplicates, invalid values, outliers",
        "items": [
          "Duplicates: identical rows are the simple case; repeated entities (same patient) or near-duplicates cause leakage across splits.",
          "Invalid values: impossible ranges, unit mismatches, wrong types. Correct from source, mark as missing, or transform.",
          "Outliers: detect with ranges, quantiles, boxplots (1.5 x IQR rule), robust z-scores; cause may be error or a rare valid case. Do not drop just because they hurt accuracy; cap (winsorise) or transform with justification.",
          "Label quality: errors in y can be more damaging than errors in X."
        ]
      },
      {
        "heading": "Missing data",
        "items": [
          "**MCAR** (missing completely at random): unrelated to any data. **MAR** (at random): explained by observed variables. **MNAR** (not at random): depends on the missing value itself (high earners hide income). The mechanism determines what can be inferred.",
          "Options: drop rows (only if few and MCAR), drop a mostly-empty column, **impute**: numeric mean/median (median robust to skew), categorical most frequent or an explicit \"unknown\" category; model-based (k-NN imputer, iterative).",
          "Add a **missingness indicator** flag when missing itself carries information.",
          "Imputation fills representation gaps; it does not recreate lost information. Fit the imputer on training data only.",
          "Example: ages 20, 22, 24, 90, missing: mean of observed = 39, median = 23; the median is the better fill because of the outlier 90."
        ]
      },
      {
        "heading": "Scaling numeric features",
        "items": [
          {
            "type": "formula",
            "label": "Standardisation (z-score)",
            "text": "z = (x - mean) / std   (mean 0, std 1; mean and std from the training set)"
          },
          {
            "type": "formula",
            "label": "Min-max scaling",
            "text": "x' = (x - min) / (max - min)   (maps to [0, 1]; sensitive to outliers)"
          },
          {
            "type": "formula",
            "label": "Robust scaling",
            "text": "x' = (x - median) / IQR   (IQR = Q3 - Q1; resistant to outliers)"
          },
          "Example values 10, 20, 30, 40, 100: mean 40, std (population) 31.62. z(100) = 1.90; z(20) = -0.63. Min-max of 20 = (20 - 10)/90 = 0.111. Robust: median 30, IQR 20 (Q1 20, Q3 40), so (100 - 30)/20 = 3.5.",
          "Needed for distance-based (k-NN, k-means), gradient-based (neural nets, logistic regression) and penalised models (Ridge, Lasso, PCA). **Trees and forests do not need scaling.**",
          "Scaling changes representation, not importance; it does not make a skewed variable Gaussian.",
          "Skewed variables: log, power or quantile transforms; binning (discards information). Fit with training parameters only."
        ]
      },
      {
        "heading": "Encoding categoricals",
        "items": [
          "**One-hot encoding** for nominal categories (no order): one binary column per category (drop one for linear models to avoid collinearity); handle unknown categories at prediction (handle_unknown).",
          "**Ordinal encoding** for ordered categories (low < medium < high) so the integers reflect real order.",
          "Never integer-code nominal inputs (it invents an order); LabelEncoder is for targets.",
          "**High cardinality** (postcode, ID): group rare values into \"other\", use frequency or target encoding (leakage-prone: must be computed out-of-fold), or derive meaningful features (region). Pure row IDs carry no generalisable signal.",
          "Example: colour in {red, green, blue}: red = (1,0,0), green = (0,1,0), blue = (0,0,1); size {S, M, L} as ordinal 0, 1, 2."
        ]
      },
      {
        "heading": "Pipelines and common mistakes",
        "items": [
          "**Pipeline** chains preprocessing and estimator; **ColumnTransformer** applies different processing to numeric and categorical columns. Learned values (medians, vocabularies, means) are fitted on training folds and re-applied to validation and test, also inside cross-validation and grid search.",
          "Mistakes: scaling before splitting, filling missing values globally, inconsistent handling of unseen categories, dropping outliers to raise accuracy, using post-outcome features, manual notebook state, restarting the kernel never.",
          "Group, temporal and duplicate leakage (repeated visits, overlapping time windows, patches from one image across partitions)."
        ]
      },
      {
        "heading": "Is the data fit for the job?",
        "items": [
          "Ask whether the examples and target suit the prediction, whether collecting or joining could have introduced errors, and who or what is missing.",
          "**Unit of analysis**: what one row is (a person, a transaction, a sensor reading, a piece of an image). Rows from the same person or image are linked and must not be split between training and test.",
          {
            "type": "p",
            "text": "First checks"
          },
          "Where the data came from and its licence; number of rows and columns; meaning and units of each column; whether a number is really a category or an ID; the spread of the target; missing values, duplicates and impossible values; features only known after the outcome.",
          "In pandas: `df.shape`, `head()`, `info()`, `describe()`, `isna().mean()`, `nunique()`, `duplicated().sum()`. Treat odd values as questions: an error, a rare real case, or something else going on.",
          "Types are about meaning: numbers, categories (unordered, yes/no or ordered), and dates, places or text. How the computer stores it is not what it means.",
          {
            "type": "p",
            "text": "Check the target"
          },
          "When and how was it recorded? How common is each value? Are labels consistent? Is it a stand-in for what you really care about?"
        ]
      },
      {
        "heading": "Duplicates, odd values and missing values",
        "items": [
          "**Duplicates**: exact copies (check before deleting), several rows about the same thing, and near-copies (a cropped image, a repeat measurement). Any of these can leak between training and test, so define what \"the same\" means.",
          "**Odd values**: **detect** (ranges, boxplots, unusual distance from the middle), **interpret** (mistake, wrong unit, rare real case), **act** (correct, mark missing, transform, cap only with a reason, or keep), **write down** what you did and how many rows.",
          "**Missing values**: start simple. For categories, use the most common value or a \"missing\" category. A flag column helps if the fact it is missing tells you something. Cleverer filling methods assume more."
        ]
      },
      {
        "heading": "Leakage and the safe order",
        "items": [
          "**Leakage** is when the model gets information it would not have at prediction time, so results look better than they are.",
          "**Target leakage**: a feature gives away the answer. **Contamination**: test data influences cleaning, scaling or tuning. **Group or time leakage**: linked rows or future data cross the split.",
          {
            "type": "p",
            "text": "Safe order"
          },
          "**1.** Define the unit, the groups and when predictions are made. **2.** Set aside the test data. **3.** Fit the filling, encoding and scaling on training data only. **4.** Apply them unchanged to validation and test. **5.** Train and evaluate.",
          "A scikit-learn **Pipeline** chains these steps so cross-validation repeats them correctly. A **ColumnTransformer** applies different steps to different columns: `fit` learns from training data, `transform` reuses what it learned."
        ]
      },
      {
        "heading": "Scaling, transforming and encoding",
        "items": [
          "**StandardScaler**: subtract the training mean, divide by the standard deviation. A value of +2 means two standard deviations above average.",
          "**MinMaxScaler**: squeeze the training range into, say, 0 to 1; sensitive to extremes.",
          "**RobustScaler**: uses the middle value and the middle half's width, so extremes matter less.",
          "Never refit a scaler on test data.",
          "**Long-tailed values** (income, counts): a log transform compresses them. **Binning** groups numbers into ranges, easier to read but loses detail.",
          {
            "type": "p",
            "text": "Categories"
          },
          "**One-hot encoding** makes one 0/1 column per category. `handle_unknown=\"ignore\"` copes with new values later.",
          "With thousands of categories: drop pure IDs, group rare ones into \"other\", extract something broader (postcode to region), or **target encoding** (replace a category by the average target, which leaks easily)."
        ]
      },
      {
        "heading": "Common preparation mistakes and the milestone",
        "items": [
          "**1.** Scaling before splitting. **2.** Filling missing values using all the data. **3.** Encoding new categories inconsistently. **4.** Dropping outliers because they hurt the score. **5.** Using features known only afterwards. **6.** Manual steps that cannot be repeated.",
          {
            "type": "p",
            "text": "Week 3 project milestone"
          },
          "A data dictionary, the unit of analysis, a summary of shape, target, missing values and duplicates, odd values, a preparation plan, at least three leakage risks, two ideas for new features, and a notebook that reruns. Compare several datasets before choosing."
        ]
      }
    ],
    "pitfalls": [
      "Fitting scaler or imputer on the whole dataset.",
      "Scaling features for a decision tree and claiming it was required.",
      "One-hot encoding an ID column.",
      "Using the mean to impute a heavily skewed variable.",
      "Treating \"missing\" as harmless noise without asking why it is missing."
    ]
  },
  {
    "id": "interpretability",
    "title": "Model interpretation: transparency, permutation importance, PDP, LIME, SHAP, counterfactuals",
    "priority": 16,
    "tier": "likely",
    "freq": "est. medium",
    "marks": "8-12 marks",
    "summary": "**Interpretability can come from transparent models (linear, trees) or post-hoc, model-agnostic tools: global (permutation importance, PDP) and local (LIME, SHAP, counterfactuals); explanations are evidence about the model, not causal truth.**",
    "mnemonic": "Global = what drives the model; Local = why THIS prediction",
    "source": [
      "CT4101_Notes_11_Interpretation_Ethics_Responsible_AI",
      "CT4101_Notes_07_Ensemble_Methods"
    ],
    "sections": [
      {
        "heading": "Why and key terms",
        "items": [
          "Needs: debugging (is it using spurious features?), trust and adoption, regulation / audit, fairness checks, **recourse** for people harmed by a decision, scientific insight.",
          "**Transparency**: the model's structure can be inspected. **Interpretability**: a human can understand how inputs relate to outputs. **Explanation**: a account of why a model made a prediction.",
          "**Global** explanation: what drives predictions overall. **Local** explanation: why one prediction was made.",
          "**Intrinsically transparent** models: linear / logistic regression (coefficients, odds ratios), short decision trees and rule lists, generalised additive models. **Post-hoc** explanations are applied to a fitted black box; **model-agnostic** methods work for any model.",
          "Accuracy-interpretability tension is real but not absolute: first try an interpretable baseline."
        ]
      },
      {
        "heading": "Global methods",
        "items": [
          "**Coefficients** (scaled features): sign and size, \"holding others fixed\", association not causation.",
          "**Impurity importance** (trees / forests): total impurity decrease from splits on a feature; fast but biased towards many-valued features.",
          "**Permutation importance**: shuffle one feature column on held-out data and measure the drop in score; model-agnostic, uses a real metric; repeat several shuffles. Weakness: correlated features share or hide importance.",
          "Example: baseline accuracy 0.90. Shuffle feature A: 0.70 (importance 0.20). Shuffle feature B: 0.89 (importance 0.01). A matters, B barely does.",
          "**Partial dependence plot (PDP)**: average predicted outcome as one feature varies, others averaged out. **ICE plots**: one line per example, revealing heterogeneity that the PDP average hides. Both can mislead with correlated features and off-distribution points."
        ]
      },
      {
        "heading": "Local methods",
        "items": [
          "**LIME**: perturb the instance, get black-box predictions for the perturbed samples, weight samples by closeness, fit a simple interpretable (sparse linear) model locally; its coefficients explain this prediction. Check **stability** (different samples can give different explanations) and that it highlights meaningful features (a classifier that \"looks at\" the image corner is broken).",
          "**SHAP**: based on **Shapley values** from game theory: each feature gets its average marginal contribution over all orderings of features. Attributions **add up**: prediction = base value + sum of feature attributions.",
          "Worked Shapley example: base value (average prediction) 0.30; f(A only) = 0.55, f(B only) = 0.45, f(A and B) = 0.80. phi_A = 0.5[(0.55 - 0.30) + (0.80 - 0.45)] = 0.5(0.25 + 0.35) = 0.30; phi_B = 0.5[(0.45 - 0.30) + (0.80 - 0.55)] = 0.5(0.15 + 0.25) = 0.20. Check: 0.30 + 0.30 + 0.20 = 0.80 = prediction.",
          "TreeSHAP is exact and fast for tree ensembles; KernelSHAP is model-agnostic but slow. SHAP values can aggregate to global importance (mean absolute SHAP).",
          "**Counterfactual explanation**: the smallest plausible change to inputs that flips the decision (\"loan approved if income were 3,000 higher\"). Basis for **algorithmic recourse**: it must be actionable (not \"be younger\"), plausible, and respect immutable features."
        ]
      },
      {
        "heading": "Cautions",
        "items": [
          "Importance and attribution are model evidence, **not causal effects**; causal claims need interventions (randomised experiments) or causal models. Ladder: seeing (association), doing (intervention), imagining (counterfactual).",
          "Explanations can be unstable, manipulated, or plausible but unfaithful; test on subgroups, ranges and operating conditions; show uncertainty.",
          "Match the explanation to the audience: owners, auditors and regulators, debuggers, affected individuals.",
          "Model cards and documentation complement explanations."
        ]
      },
      {
        "heading": "Why interpret a model, and the kinds of explanation",
        "items": [
          "**Interpreting** means working out why a model predicts what it does.",
          {
            "type": "p",
            "text": "Four reasons"
          },
          "**Debugging**: a \"husky\" detector was really looking at the snow behind the dog.",
          "**Finding bias**: seeing that a model that predicts re-offending uses things it should not.",
          "**Giving a way forward** (**recourse**): telling a refused loan applicant what would change the answer.",
          "**Knowing when to trust it**: if it relies on irrelevant features for one group, do not trust it for that group.",
          {
            "type": "p",
            "text": "Words to know"
          },
          "**Transparent model**: you can read its logic directly (a short rule list, linear regression). **Black box (opaque)**: you cannot (hundreds of trees, a neural network).",
          "**Intrinsic** explanation: built into a transparent model. **Post-hoc**: added after training by probing a black box.",
          "**Model-agnostic** methods work on any model. **Model-specific** ones work on one type.",
          "**Global** explanation: what drives predictions overall (for owners and auditors). **Local**: why this one prediction (for the affected person). A local one need not match the global picture."
        ]
      },
      {
        "heading": "Readable models, coefficients and permutation importance",
        "items": [
          "A post-hoc explanation is a summary of a model, not the model itself. If a readable model is as accurate, prefer it for high-stakes decisions.",
          "In a simulated heart-risk example the readable linear model was even more accurate than 300 boosted trees (AUC 0.75 against 0.72).",
          "**Linear regression coefficient**: change in the prediction when that feature rises by one and the others stay fixed. **Logistic regression**: e to the power of the coefficient is how many times the odds are multiplied.",
          "Scaling, related features, interactions and missing features all change what a coefficient means.",
          {
            "type": "p",
            "text": "Permutation importance"
          },
          "Shuffle one feature's values in unseen data and measure how much the score falls. Repeat several times and report the spread.",
          "Heart example (starting AUC 0.752, 30 shuffles): average fall for age 0.123, blood pressure 0.033, cholesterol ratio 0.024, BMI 0.006, HDL 0.001.",
          "Careful: two related features share the credit, so each looks weaker, and shuffling can create a patient who could not exist."
        ]
      },
      {
        "heading": "PDP, ICE, LIME and SHAP",
        "items": [
          "**PDP** (partial dependence plot): the average prediction as one feature is varied.",
          "**ICE** (individual conditional expectation): the same, but one line per person, so differences show.",
          "Both can mislead when features are related, because they test combinations that never occur.",
          {
            "type": "p",
            "text": "Explaining one prediction"
          },
          "**LIME** builds a simple model that copies the black box near one case. For a mushroom: \"foul smell\" pushes towards poisonous. For an image, it keeps only the patches that support the label.",
          "On chest X-rays, a model that highlights the lung shadow can be checked. One that highlights a corner marker is using a shortcut.",
          "**SHAP** starts from the average prediction and gives each feature a share, so the shares add up to this prediction.",
          "A share is not proof of cause, and changing that feature is not guaranteed to change the real outcome."
        ]
      },
      {
        "heading": "Cause, correlation and counterfactuals",
        "items": [
          {
            "type": "p",
            "text": "The ladder of causation (three kinds of question)"
          },
          "**1. Seeing**: what goes with what? Written P(y | x). PDP and SHAP answer only this.",
          "**2. Doing**: what happens if we deliberately change x? Written P(y | do(x)). Needs experiments or causal methods.",
          "**3. Imagining**: what would have happened to this person if things had been different? Needs a causal model.",
          {
            "type": "p",
            "text": "Confounding"
          },
          "Remedy sales and hospital admissions rise together (correlation 0.68) because **flu** causes both. A hidden common cause is a **confounder**.",
          "Compare days with the same flu level and the link vanishes. Draw a diagram of what causes what to see what to hold fixed.",
          "Formula: P(y | do(x)) = sum over z of P(y | x, z) P(z), where z is the confounder.",
          {
            "type": "p",
            "text": "Counterfactual explanations"
          },
          "\"What is the smallest change that would flip the decision?\" Only suggest things the person can change, keep it realistic and small, and offer several options.",
          "It describes the model, not the world: acting on it may not change the real outcome, and a retrained model may disagree."
        ]
      },
      {
        "heading": "Where interpretability is heading (2024-26)",
        "items": [
          "**Rising**: studying the inner workings of large language models, monitoring their written reasoning, and causal methods.",
          "**Becoming standard**: SHAP, permutation importance, explanations using human concepts, and model cards (short fact sheets about a model).",
          "**Questioned**: whether LIME and SHAP faithfully reflect the model, and whether explanations just make people trust a wrong model. Some argue for testing behaviour instead.",
          "The common thread: moving from \"what does it correlate with\" to \"what does it do when we change something\"."
        ]
      }
    ],
    "pitfalls": [
      "Reading feature importance as causation.",
      "Computing permutation importance on training data (should be held-out).",
      "Forgetting that SHAP values sum to prediction minus base value.",
      "Using LIME once and trusting it without checking stability.",
      "Presenting counterfactuals that change immutable or implausible features."
    ]
  },
  {
    "id": "fairness-ai",
    "title": "Fairness, ethics and responsible AI (bias, metrics, EU AI Act, model cards)",
    "priority": 17,
    "tier": "likely",
    "freq": "est. medium",
    "marks": "8-12 marks",
    "summary": "**Bias enters through data, labels, features, models and deployment; measure it with group metrics (demographic parity, equal opportunity), know they cannot all hold at once when base rates differ, and manage risk with oversight, documentation (model cards), privacy and regulation (EU AI Act).**",
    "mnemonic": "Bias in the DATA, the METRIC, the MODEL, the USE",
    "source": [
      "CT4101_Notes_11_Interpretation_Ethics_Responsible_AI",
      "CT4101_Notes_01_Intro_to_ML",
      "CT4101_Notes_12_Integration_Communication_Case_Studies"
    ],
    "sections": [
      {
        "heading": "Sources of bias and harm",
        "items": [
          "**Historical bias**: data reflect past discrimination (hiring records). **Sampling / representation bias**: groups under-represented. **Measurement bias**: proxy labels or features measured differently across groups (arrests as a proxy for crime). **Label bias**. **Aggregation bias**: one model for groups that behave differently. **Evaluation bias**: aggregate scores hide subgroup failures. **Deployment / use bias**: context differs from training; feedback loops.",
          "**Proxy features**: removing a protected attribute (gender, race, age, disability) does not remove bias when postcode or other features correlate with it.",
          "Other risks: privacy and consent (anonymisation is not absolute), distribution shift, misuse, over-reliance, opacity, environmental cost, accountability gaps.",
          "Limits of ML: correlation is not causation; the past is not the future; optimising a proxy metric can undermine the real mission."
        ]
      },
      {
        "heading": "Fairness metrics",
        "items": [
          {
            "type": "table",
            "head": [
              "Criterion",
              "Requires equal across groups",
              "Meaning"
            ],
            "rows": [
              [
                "Demographic (statistical) parity",
                "Selection rate P(y_hat = 1)",
                "Same share of positive decisions"
              ],
              [
                "Equal opportunity",
                "True positive rate (recall)",
                "Qualified people are accepted equally"
              ],
              [
                "Equalised odds",
                "TPR and FPR",
                "Equal error rates both ways"
              ],
              [
                "Predictive parity",
                "Precision (PPV)",
                "A positive prediction means the same"
              ],
              [
                "Calibration",
                "P(y = 1 | score) per group",
                "Scores mean the same in each group"
              ]
            ]
          },
          "Worked example: group A: 100 applicants, 50 selected (rate 50%); group B: 100 applicants, 25 selected (25%). Demographic parity violated; disparate-impact ratio = 25/50 = 0.5, below the common **four-fifths (0.8) rule**.",
          "Equal opportunity: group A has 50 qualified and 40 selected (TPR 80%); group B has 25 qualified and 15 selected (TPR 60%): a 20-point gap.",
          "**Impossibility result** (Kleinberg et al., 2016; Chouldechova): when base rates differ between groups, calibration and equal error rates cannot all hold (except for a perfect predictor), so choose the criterion by context and be explicit about the trade-off.",
          "Report metrics per subgroup with uncertainty (small groups give wide confidence intervals)."
        ]
      },
      {
        "heading": "Mitigation",
        "items": [
          "**Pre-processing**: rebalance / reweigh data, collect better data. **In-processing**: fairness constraints or penalties during training. **Post-processing**: group-specific thresholds. Plus human review, monitoring and appeal routes.",
          "Process: define stakeholders and harms, check data provenance, audit subgroups, document, monitor after deployment."
        ]
      },
      {
        "heading": "Responsible AI practice and regulation",
        "items": [
          "Principles: fairness, transparency / explainability, accountability, privacy and security, safety and robustness, human oversight, sustainability.",
          "**Model card**: intended use, data, evaluation (including subgroups), limits, owner, monitoring plan. **Datasheet / data statement** for datasets.",
          "**Human-in-the-loop** oversight, logging and audit trails, challenge and escalation routes, incident response.",
          "**EU AI Act** (risk-based): unacceptable risk (banned, e.g. social scoring), **high risk** (hiring, credit, medical, education; requires risk management, data governance, documentation, logging, human oversight, accuracy and robustness), limited risk (transparency duties: tell users they are talking to a chatbot, label synthetic media), minimal risk (no special duties).",
          "**GDPR**: lawful basis and consent, data minimisation, purpose limitation, rights regarding automated decisions and access to meaningful information about the logic.",
          "Decide first whether the system should be built; \"do not deploy\" can be a defensible project conclusion."
        ]
      },
      {
        "heading": "Where bias comes from and how fairness is measured",
        "items": [
          {
            "type": "p",
            "text": "Six sources of bias"
          },
          "**Historical**: the past data reflects unfairness. **Sampling**: some groups are under-represented. **Measurement**: features or labels measure groups differently. **Objective**: the target ignores important costs. **Evaluation**: an overall score hides failure for a group. **Deployment**: used differently from how it was built.",
          {
            "type": "p",
            "text": "Three fairness measures (illustrative numbers, two groups)"
          },
          "**Demographic parity**: both groups get \"yes\" equally often. Here 50% against 25%: violated.",
          "**Equal opportunity**: of those who deserve \"yes\", both groups get it equally often (**true positive rate**). Here 80% against 60%: violated.",
          "**Equalised odds**: equal true positive rates **and** equal false positive rates (wrong \"yes\"). Here also 20% against 10%: violated.",
          "When the groups really differ in how often \"yes\" is true, no model can satisfy all fairness measures at once.",
          "Small groups give shaky numbers: a measured 60% might really be anywhere from about 47% to 71%.",
          "Choose by the harm: in cancer screening, is it worse to miss a sick patient or to send a healthy one for tests?"
        ]
      },
      {
        "heading": "Privacy, safety and the rules",
        "items": [
          "**Privacy**: collect only what you need, protect it (access control, removing identities, logs), and remember a model can memorise personal data, so anonymising is not a guarantee.",
          "**Safety**: test misuse, failures and changing data. **Human oversight**: who can review, overrule and hear appeals. Also consider environmental and social effects.",
          {
            "type": "p",
            "text": "Two frameworks"
          },
          "**NIST AI Risk Management Framework** (US, voluntary): Govern, Map, Measure, Manage.",
          "**EU AI Act** sorts uses by risk. **Prohibited**: social scoring of patients. **High risk**: emergency triage or X-ray tools. **Transparency duty**: a chatbot must say it is an AI. **Minimal**: a spam filter. High-risk systems have a legal duty to explain."
        ]
      },
      {
        "heading": "Responsible use over a model's life, and model cards",
        "items": [
          "**Before**: purpose, who is affected, limits, who owns the risks, how it will be tested. **During**: human oversight, records, a way to challenge. **After**: watch for drift (data changing), incidents and effects on groups, and decide when to retire it.",
          {
            "type": "p",
            "text": "Model card"
          },
          "A short fact sheet: intended use and uses not allowed, the data, the measures including per-group results, example failures, owners and update plan.",
          "**Week 11 project work** also asks for one global and one local explanation with their limits, harms and misuse, oversight, monitoring signals, and whether deployment is justified.",
          {
            "type": "p",
            "text": "Six-question review"
          },
          "What decision could it affect? Who benefits and who suffers its errors? Which features drive it? Do error rates differ between groups? What data should not be kept? Who can overrule or stop it?"
        ]
      }
    ],
    "pitfalls": [
      "Claiming that dropping the protected attribute makes a model fair.",
      "Quoting one fairness metric as if it covered all notions.",
      "Ignoring base-rate differences when explaining why criteria conflict.",
      "Treating fairness as only a modelling issue (data, deployment and governance matter).",
      "Reporting only aggregate accuracy."
    ]
  },
  {
    "id": "feature-eng",
    "title": "Feature engineering, feature selection and the curse of dimensionality",
    "priority": 18,
    "tier": "likely",
    "freq": "est. medium",
    "marks": "6-10 marks",
    "summary": "**Engineered features must be available at prediction time, meaningful and stable; feature selection (filter, wrapper, embedded) fights the curse of dimensionality, where fixed data covers high-dimensional space ever more sparsely.**",
    "mnemonic": "Features: Available, Meaningful, Stable. Selection: Filter, Wrapper, Embedded",
    "source": [
      "CT4101_Notes_03_Data_Prep_Feature_Engineering",
      "CT4101_Notes_08_Unsupervised_Dimensionality_Reduction"
    ],
    "sections": [
      {
        "heading": "Feature engineering",
        "items": [
          "Good engineered feature: **available** at prediction time, **meaningful** for the task, **stable** for future data (no drift).",
          "Dates and time: day of week, month, hour, elapsed time. **Cyclical encoding**: hour_sin = sin(2 pi hour/24), hour_cos = cos(2 pi hour/24), so hour 23 is close to hour 0.",
          "Ratios and scale-free quantities (price per square metre, BMI), aggregates (customer mean spend, counts), interactions (x1 x2), polynomial features (allow a linear model to fit curves), log transforms, bins, text features (TF-IDF, embeddings), external context (weather, holidays).",
          "Danger: aggregates and encodings computed with the target or future rows leak; compute within training folds. Document each feature's rationale."
        ]
      },
      {
        "heading": "Curse of dimensionality",
        "items": [
          "As the number of features d grows with fixed n: data become sparse, volume grows exponentially, nearest and farthest distances become similar, more irrelevant dimensions distort distance-based methods, and overfitting risk rises (more parameters than evidence).",
          "Example: 10 bins per feature needs 10 examples in 1D to fill each bin, 100 in 2D, 10^10 in 10D.",
          "Remedies: domain reasoning, regularisation, feature selection, dimensionality reduction (PCA), more data, simpler models."
        ]
      },
      {
        "heading": "Feature selection",
        "items": [
          "**Filter** methods: score features independently of the model (correlation, chi-squared, mutual information, variance threshold). Fast but ignore interactions and redundancy.",
          "**Wrapper** methods: search subsets using a model's performance (forward selection, backward elimination, recursive feature elimination, RFE). Capture interactions but costly and prone to overfitting the validation data.",
          "**Embedded** methods: selection during training (Lasso zeroing weights, tree-based importances, elastic net).",
          "Must be done **inside cross-validation** on training folds; selecting features on all the data before splitting is leakage.",
          "Selection keeps original features (interpretable); PCA creates new ones."
        ]
      },
      {
        "heading": "Building good features, and the curse of dimensionality",
        "items": [
          "**Feature engineering** means making new input columns from the raw ones. Each new one is a guess, so test it like any other change.",
          "**Time**: use only information available before the outcome. Plain numbers do not show that hour 23 is next to hour 0. Seasonal patterns can change.",
          "**Ratios** (price per square metre; watch for dividing by zero). **Interactions** (one feature matters differently depending on another). **Aggregates** (averages from past data only). **Outside data** such as weather, matched to the right time and with a known source.",
          {
            "type": "p",
            "text": "Curse of dimensionality"
          },
          "With many features, a fixed amount of data covers the space very thinly, and useless features drown the useful ones.",
          "Answers: domain knowledge, regularisation, choosing fewer features, or dimensionality reduction.",
          {
            "type": "p",
            "text": "Choosing features"
          },
          "Do it **inside** training. Choosing before cross-validation leaks information from the validation data.",
          "**Filter**: score each feature alone; fast but misses combinations. **Wrapper**: try subsets by training models; costly and can overfit. **Embedded**: the model chooses as it trains."
        ]
      }
    ],
    "pitfalls": [
      "Selecting features using the whole dataset before cross-validation.",
      "Engineering a feature from information unavailable at prediction time.",
      "Using plain integer hour with no cyclical handling when wrap-around matters.",
      "Assuming more features always help."
    ]
  },
  {
    "id": "intro-ml",
    "title": "Introduction to ML: definitions, learning types, hypothesis, lifecycle",
    "priority": 19,
    "tier": "possible",
    "freq": "est. medium",
    "marks": "4-8 marks",
    "summary": "**ML improves performance P on task T through experience E; the main types are supervised (classification, regression), unsupervised, semi-supervised and reinforcement learning, and projects follow the data science lifecycle (frame, understand, prepare, model, evaluate, communicate).**",
    "mnemonic": "T-P-E: Task, Performance, Experience",
    "source": [
      "CT4101_Notes_01_Intro_to_ML"
    ],
    "sections": [
      {
        "heading": "Definitions",
        "items": [
          "**Samuel (1959)**: field of study that gives computers the ability to learn without being explicitly programmed.",
          "**Mitchell (1997)**: a program learns from experience E with respect to task T and performance measure P if its performance on T, measured by P, improves with E. Checkers: T = playing checkers, P = percentage of games won, E = playing practice games against itself.",
          "Traditional programming: rules + inputs give outputs. ML: examples + expected outputs give a model; the model + new inputs give predictions.",
          "AI is the broad goal of intelligent behaviour; ML is a data-driven approach within AI; **deep learning** is ML with multi-layer neural networks. **Data mining** stresses discovering patterns in large datasets; **data science** is the broader practice including data acquisition, software, statistics, domain knowledge, communication and deployment.",
          "Why ML: rules are hard to write (spam), patterns change, data are noisy, errors have different costs."
        ]
      },
      {
        "heading": "Types of learning",
        "items": [
          {
            "type": "table",
            "head": [
              "Type",
              "Data",
              "Tasks",
              "Examples"
            ],
            "rows": [
              [
                "Supervised",
                "Labelled (inputs and outputs)",
                "Classification, regression",
                "k-NN, linear regression, trees, neural nets"
              ],
              [
                "Unsupervised",
                "Unlabelled",
                "Clustering, dimensionality reduction, association",
                "k-means, PCA, association rules"
              ],
              [
                "Semi-supervised",
                "Few labels + many unlabelled",
                "Improve generalisation cheaply",
                "Self-training, co-training, pseudo-labelling"
              ],
              [
                "Reinforcement",
                "Agent in an environment, reward signal",
                "Sequential decisions",
                "Q-learning, SARSA"
              ]
            ]
          },
          "**Classification** predicts a category (binary, multiclass, multilabel); **regression** predicts a number.",
          "Reinforcement learning: agent observes a state, takes an action, receives a reward or punishment, learns by trial and error. Environments may be fully / partially observable, discrete / continuous, deterministic / stochastic, benign / adversarial.",
          "**Inductive** learning builds a general model from labelled data for any future input; **transductive** learning predicts labels for a specific known test set.",
          "Task selection: target outcome? yes means supervised, no means unsupervised; categorical target means classification, numeric means regression; an agent acting over time means reinforcement learning."
        ]
      },
      {
        "heading": "Hypothesis and search",
        "items": [
          "The learner searches a space of **hypotheses** for the one that best describes the data. Choices: how the hypothesis is expressed (equation, rules, tree, weights), how the search is done (systematic or heuristic), how quality is measured, what data format and how much data are needed.",
          "**Inductive bias**: assumptions that let a learner generalise beyond the training data (for example \"similar inputs give similar outputs\" in k-NN, preference for small trees)."
        ]
      },
      {
        "heading": "Data science lifecycle",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "caption": "Lifecycle is iterative: evaluation often sends the team back to framing or data preparation.",
            "data": {
              "steps": [
                {
                  "label": "Frame",
                  "sub": "goal, metric"
                },
                {
                  "label": "Understand",
                  "sub": "explore data"
                },
                {
                  "label": "Prepare",
                  "sub": "clean, features"
                },
                {
                  "label": "Model",
                  "sub": "train, tune"
                },
                {
                  "label": "Evaluate",
                  "sub": "validate"
                },
                {
                  "label": "Communicate",
                  "sub": "report, deploy"
                }
              ],
              "loopBack": "Iterate: back to framing or data"
            }
          },
          "Data reality checks: reliable, representative, leakage-free, legal and ethical.",
          "Applications: healthcare imaging and drug discovery, transport and self-driving, recommender systems, finance (fraud, credit), industry (predictive maintenance, agriculture, sorting).",
          "Limits: correlation is not causation, past is not future (distribution shift), metric is not mission. Future: foundation models, efficiency and sustainability, trust and regulation, human-AI collaboration."
        ]
      },
      {
        "heading": "What machine learning is, and its kinds",
        "items": [
          "\"Learning is changing behaviour so that performance gets better in the future\" (Witten and Frank, 1999). In short: a **task**, **experience** (data) and a **performance** measure.",
          "**Supervised** (answers given): **classification** predicts a category (fraud or not); **regression** predicts a number (house price). Predictions are uncertain, not a crystal ball.",
          "**Unsupervised** (no answers): clustering, reducing the number of features, and finding items that occur together. There may be no single right answer.",
          "**Semi-supervised**: a few labelled examples plus many unlabelled ones, useful when labelling is expensive. One method, **pseudo-labelling**, trains on the model's own confident guesses.",
          "**Reinforcement learning**: an agent sees the **state**, takes an **action** and gets a reward or punishment, over and over.",
          {
            "type": "p",
            "text": "Example algorithms"
          },
          "Classification: decision trees, SVMs (support vector machines). Regression: linear regression, neural networks, k-NN. Clustering: k-means, EM. Items together: association rules. Reinforcement: Q-learning."
        ]
      },
      {
        "heading": "Training, validation, test and the lifecycle",
        "items": [
          {
            "type": "table",
            "head": [
              "Split",
              "Purpose",
              "Size",
              "Analogy"
            ],
            "rows": [
              [
                "Training",
                "Fit parameters / weights; model sees it during optimisation",
                "Largest, about 60-80%",
                "Studying the material"
              ],
              [
                "Validation",
                "Model selection and hyperparameter tuning: choose complexity (layers, regularisation strength), early stopping, compare models",
                "About 10-20%",
                "Practice exams"
              ],
              [
                "Test",
                "Final unbiased estimate of generalisation; model and hyperparameters already fixed, never tune on it",
                "About 10-20%",
                "The real exam"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Choices when learning"
          },
          "How the learned pattern is written (equation, rules, tree, weights), how you search for it, how you measure quality, and what and how much data you need.",
          {
            "type": "p",
            "text": "Lifecycle steps"
          },
          "**Frame**: the goal and how success is measured. **Understand**: collect and explore data. **Prepare**: clean and build features. **Model**: pick, split, tune. **Evaluate**: check against the goal and that it did not just memorise. **Communicate**: present, and deploy if needed.",
          "**Five framing questions**: what decision do we want to improve, what type of task, what data, how do we measure success, what could go wrong?"
        ]
      },
      {
        "heading": "Limits, responsibility and the module",
        "items": [
          {
            "type": "p",
            "text": "Machine learning is not magic"
          },
          "Correlation is not cause. The past may not match the future. The measure is not the real goal. Accuracy is not usefulness. Automation is not neutral: people choose the data, goals and cut-offs.",
          "**Responsible ML**: fairness, privacy, transparency, accountability. Ask \"should we, and on what conditions?\"",
          "**Data questions**: is it reliable, representative, free of leakage (information you would not have when predicting) and legal to use?",
          {
            "type": "p",
            "text": "Where the field is heading"
          },
          "More everyday use, large general models, efficiency, safety and regulation, people working with AI, brain-inspired hardware, and ethics.",
          {
            "type": "p",
            "text": "Module assessment"
          },
          "70% written exam, 20% ML portfolio (programming project), 10% weekly Canvas quizzes (weeks 2-11)."
        ]
      }
    ],
    "pitfalls": [
      "Mixing T, P and E in Mitchell's definition.",
      "Calling clustering classification.",
      "Describing reinforcement learning as supervised.",
      "Forgetting to give examples for each learning type."
    ]
  },
  {
    "id": "deployment",
    "title": "Deployment, MLOps, monitoring and communicating results",
    "priority": 20,
    "tier": "possible",
    "freq": "est. medium-low",
    "marks": "6-10 marks",
    "summary": "**Choose batch, real-time or human-in-the-loop serving from latency, scale and risk; release safely (shadow, canary, blue-green), monitor data, model and system metrics for drift, and retrain through an automated, versioned pipeline.**",
    "mnemonic": "Ship it, Watch it, Fix it: serve, monitor, retrain",
    "source": [
      "CT4101_Notes_12_Integration_Communication_Case_Studies",
      "CT4101_Notes_11_Interpretation_Ethics_Responsible_AI"
    ],
    "sections": [
      {
        "heading": "End-to-end project and decision",
        "items": [
          "Stages: scope and feasibility (should we build it?), build and prove (data, baseline, experiments, evaluation, interpretation, decide whether to ship), ship and maintain (serve, monitor, retrain).",
          "The highest score is not automatically the best choice: weigh evidence needed by users, latency, throughput, memory, cost, failure costs, privacy, fairness and interpretability. A justified \"do not deploy\" is a valid outcome.",
          "Reproducible project: version code, data and models; fixed seeds; recorded environment (requirements file); documented run order; tests; restart-and-run-all notebooks."
        ]
      },
      {
        "heading": "Deployment patterns",
        "items": [
          "**Batch**: score many records on a schedule (nightly churn scores); simple, cheap, results can be stale.",
          "**Real-time (online)**: a service returns a prediction per request (fraud check); needs low latency, scaling, availability.",
          "**Human-in-the-loop**: model proposes, a person reviews or decides, especially for high-risk cases; low-confidence cases are escalated.",
          "**Edge** deployment runs on-device (privacy, latency, offline) with model size limits.",
          "Safe release: **shadow mode** (runs in parallel, outputs not used), **canary** (small share of traffic), **blue-green** (old and new environments, switch with instant rollback), A/B tests, pilots; rollback and manual fallback plans, named owners."
        ]
      },
      {
        "heading": "Monitoring and drift",
        "items": [
          "Monitor **software metrics** (latency, errors, memory), **input metrics** (feature distributions, missing rates), **output metrics** (prediction distribution, confidence) and, when labels arrive, performance and fairness by subgroup. Start with many metrics, set alarm thresholds, remove those that never prove useful.",
          "**Data (covariate) drift**: P(x) changes (younger customers). **Concept drift**: P(y | x) changes (relationship shifts, fraud tactics). **Label / prior drift**: class proportions change. Also training-serving skew (different preprocessing).",
          "Response: detect change, prepare new data, retrain a candidate, validate and approve, redeploy; or recalibrate, roll back.",
          "**Feedback loops**: predictions influence future data (recommendations shape clicks), so monitor for self-reinforcing bias."
        ]
      },
      {
        "heading": "MLOps maturity",
        "items": [
          "Level 0: manual, notebook-to-engineer hand-off. Level 1: automated training pipeline, continuous training with data / model validation. Level 2: automated CI/CD of the pipeline itself plus monitoring and triggers.",
          "**Data-centric AI**: when model and code changes plateau, improving label consistency and data quality often gives larger gains than tuning the model (case studies showed gains of several to over 15 percentage points)."
        ]
      },
      {
        "heading": "Communication",
        "items": [
          "Tell one story: question, data and context, method, evidence, limitations, recommendation. Use clear visuals, state uncertainty, avoid false precision, hidden negatives and vague limits.",
          "Deliverables: data statement, model card, evaluation protocol with leakage controls, reflective changelog, reproducible code.",
          "Checklist: runs cleanly, matches the brief, test set protected, claims supported by evidence, limits visible, AI assistance declared."
        ]
      },
      {
        "heading": "A project from idea to running system",
        "items": [
          "**Deployment** means putting a model into real use. A project has three phases.",
          "**Discovery** (\"should we build this?\"): the use case, success measure, data and feasibility.",
          "**Development** (\"build and prove it\"): data steps, training, evaluation, decide whether to release.",
          "**Deployment** (\"keep it healthy\"): speed, scale, cost, monitoring, retraining.",
          "The eight stages: frame the problem, understand data, prepare features, experiment, evaluate, interpret, deploy, monitor. The model is only one part.",
          {
            "type": "p",
            "text": "Voice search example"
          },
          "**1.** Set targets: accuracy, **latency** (delay) and **throughput** (requests per second). **2.** Label speech consistently (\"Um, today's weather\" or \"Um... today's weather\"). **3.** Train and study errors to decide whether to fix code or data. **4.** The phone detects speech and a server returns the text. **5.** Monitor: new phones or users change the audio.",
          "The model code is only about 5-10% of a real system."
        ]
      },
      {
        "heading": "Checking a project and choosing the final model",
        "items": [
          {
            "type": "p",
            "text": "Integration checklist"
          },
          "**Problem** (question, users, success criteria), **data** (source, quality, splits, gaps), **method** (steps, baselines, fair comparisons), **evaluation** (measures, spread, errors, untouched test), **responsibility** (explanations, groups, risks), **decision** (recommendation and conditions).",
          "**Reproducible**: someone else can set it up, run it in order and trace which data and settings gave each result.",
          {
            "type": "p",
            "text": "Choosing"
          },
          "The highest score is not automatically best. Weigh stability, calibration (are probabilities honest), how explainable it is, speed, cost and risk.",
          "Recommend one of: **proceed**, **pilot** (a limited, supervised trial) or **do not deploy**. A well-argued \"do not deploy\" is a good result."
        ]
      },
      {
        "heading": "Communicating results",
        "items": [
          "Tell it in this order: question, data, method, evidence, limits, recommendation. Do not narrate your code.",
          "**Technical reviewers** want methods and reproducibility; **subject experts** want errors and limits; **decision makers** want value, risk and cost.",
          {
            "type": "p",
            "text": "Useful figures"
          },
          "A comparison table, an error analysis, a learning curve, an explanation of features, results by group, and a workflow diagram.",
          {
            "type": "p",
            "text": "Six failures"
          },
          "Dumping every measure, claiming cause without evidence, decorative charts, too many decimal places, hiding failed experiments, vague limitations.",
          "**Five-minute demo**: problem, data, process, best evidence, one failure, interpretation, recommendation."
        ]
      },
      {
        "heading": "Releasing safely",
        "items": [
          "**Batch**: predictions run on a schedule. **Real-time**: on request through an API (a web address programs call). **Human in the loop**: a person reviews before acting.",
          {
            "type": "p",
            "text": "Rolling out gradually"
          },
          "**Shadow mode**: the model runs beside people but its output is not used.",
          "**Canary**: a small share of cases (say 5%) goes to the new model, then more.",
          "**Blue-green**: old and new versions both run and traffic is switched over.",
          "Have a way to roll back before going live.",
          {
            "type": "p",
            "text": "Readiness checklist"
          },
          "Defined inputs and outputs; same data preparation in training and live use; tests; security; a safe fallback; named people responsible."
        ]
      },
      {
        "heading": "MLOps",
        "items": [
          "**MLOps** is the set of practices for releasing ML reliably: **automate** testing, release and retraining; **version** code, data, models and settings; **observe** performance, change, speed, fairness and incidents.",
          "**CI/CD** means code is automatically tested and released after each change.",
          {
            "type": "table",
            "head": [
              "Level",
              "Name",
              "What is automated",
              "Notes"
            ],
            "rows": [
              [
                "0",
                "Manual process",
                "Nothing: script-driven, interactive",
                "Data scientists hand a model to engineers who deploy it as a prediction service; no CI, no CD, no monitoring"
              ],
              [
                "1",
                "ML pipeline automation",
                "Training pipeline automated and deployed (continuous training)",
                "Adds data and model validation, feature store, metadata; model retrains continuously in production"
              ],
              [
                "2",
                "CI/CD pipeline automation",
                "Pipeline components themselves are built, tested and deployed by CI/CD",
                "New ideas ship fast and reliably"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Monitoring, drift and retraining",
        "items": [
          "Watch the whole system: inputs and outputs, accuracy and fairness (true answers may arrive late), and speed, failures and resource use.",
          "Voice example: server load and delay; audio length, volume and missing values; how often the transcript is empty or the user gives up and types.",
          "Start with many measures, set alarms, drop those that never help.",
          {
            "type": "p",
            "text": "Drift: the world changes"
          },
          "**Data drift**: the inputs change (a new phone microphone, younger users).",
          "**Concept drift**: the link between input and answer changes (during COVID, normal online shopping began to look like fraud; inflation changed what a house is worth).",
          "It can be slow or sudden. Respond by investigating, collecting new labels, recalibrating, retraining, rolling back or retiring.",
          "**Retraining** needs rules: detect, prepare data, train a candidate, compare, approve, release, monitor. Newer is not automatically better."
        ]
      },
      {
        "heading": "Industry case studies",
        "items": [
          {
            "type": "p",
            "text": "Improve the data or the model?"
          },
          "Improving the data (consistent labels) beat improving the model: steel defects +16.9% against +0.0%, solar panels +3.06% against +0.04%, surfaces +0.4% against +0.00%.",
          {
            "type": "p",
            "text": "Recommendation systems"
          },
          "First pick a manageable set of possible items (**candidate generation**), then order them (**ranking**), then learn from feedback and experiments.",
          "**Netflix**: deep models did not at first beat well-tuned simple ones, helped more once many kinds of feature were added, and offline scores did not always match live results.",
          {
            "type": "p",
            "text": "Lessons"
          },
          "Beat the current process by enough to matter; the surrounding system is often most of the work; test live; predictions change future data; someone must own monitoring; do not hide who is harmed.",
          "**Case-study questions**: what decision improved, what was the baseline, how does the offline measure link to real impact, what bias or feedback loops exist, how is it monitored, who owns errors, and what would justify expanding or retiring it?"
        ]
      },
      {
        "heading": "Final portfolio and what comes next",
        "items": [
          "**Hand in**: a README, notebooks that run cleanly with their setup, a technical report, a data statement (source, variables, limits), a model card and a changelog with reflection.",
          "**Final check**: runs cleanly, matches the brief, test data protected, claims supported, limits visible, help declared, version frozen.",
          "A reviewer should grasp the question in 30 seconds.",
          "**Emerging directions**: large multi-purpose models, AI on small devices, people working with AI, and sustainable, governed AI."
        ]
      }
    ],
    "pitfalls": [
      "Treating deployment as the end of the project (monitoring and retraining follow).",
      "Confusing data drift with concept drift.",
      "Reporting a single favourable score without limitations.",
      "Deploying without a rollback or fallback plan."
    ]
  },
  {
    "id": "python-ecosystem",
    "title": "Python ML ecosystem: environments, NumPy, pandas, scikit-learn API",
    "priority": 22,
    "tier": "low",
    "freq": "est. low",
    "marks": "2-5 marks",
    "summary": "**Use an isolated virtual environment with recorded dependencies, NumPy for vectorised arrays, pandas for tables, and scikit-learn estimators with the fit / predict / transform interface, chained in Pipelines.**",
    "mnemonic": "fit learns, transform changes, predict answers",
    "source": [
      "CT4101_Notes_02_Python_ML_Ecosystem"
    ],
    "sections": [
      {
        "heading": "Environment and tools",
        "items": [
          "Python: readable, composable, huge ecosystem (JupyterLab, NumPy, pandas, Matplotlib, scikit-learn, Git and tests).",
          "Isolate dependencies: `python -m venv .venv`, activate, then `python -m pip install ...`. `python -m pip` guarantees pip belongs to the selected interpreter.",
          "Capture dependencies: `pip freeze > requirements.txt`; record Python version, setup commands, data location and execution order for reproducibility.",
          "**JupyterLab**: interactive code, narrative and output; risk of hidden state from out-of-order cells; restart kernel and run all before sharing."
        ]
      },
      {
        "heading": "Python, NumPy, pandas",
        "items": [
          "Collections: list (ordered, mutable), tuple (fixed record), dict (key-value), set (unique values). Slicing is half-open: values[1:4] gives elements 1 to 3. Comprehensions for a single clear transformation.",
          "**NumPy** ndarray: homogeneous, shape / ndim / dtype; rows = examples, columns = features; **vectorised** operations and **broadcasting** (check shapes) are faster and clearer than Python loops. Boolean masks filter.",
          "**pandas**: Series (labelled 1-D), DataFrame (labelled 2-D, mixed dtypes). `loc` label-based, `iloc` position-based; `isna().sum()`, `drop_duplicates()`, `fillna()`, `groupby().agg()`. Inspect shape, dtypes and head first; fit data-dependent cleaning on training data only."
        ]
      },
      {
        "heading": "scikit-learn",
        "items": [
          "**Estimator interface**: `fit(X, y)` learns parameters; `predict(X)` outputs targets; `transform(X)` converts representations (scalers, encoders); also `predict_proba`, `score`, `decision_function`.",
          "First model: split with `train_test_split(test_size=0.2, random_state=42, stratify=y)`, fit, predict, evaluate (accuracy is a start, not enough).",
          "`make_pipeline(StandardScaler(), LogisticRegression())` keeps preprocessing and model together: same fitted transformation at training and prediction, refitted inside each CV fold (no leakage), one object to deploy.",
          "`GridSearchCV` with parameter names like `model__C` searches pipeline hyperparameters by cross-validation; `cross_validate` for scores."
        ]
      },
      {
        "heading": "Why Python and which tools",
        "items": [
          "Python is readable, its libraries work together, and it covers everything from exploring data to deployment. You still need to understand the methods.",
          "**JupyterLab**: notebooks. **NumPy**: arrays of numbers. **pandas**: tables. **Matplotlib**: charts. **scikit-learn**: machine learning. **Git** and tests: keeping work repeatable.",
          "A session: load and look, clean, plot and question, split and model, evaluate and write up.",
          {
            "type": "p",
            "text": "Environments"
          },
          "A **virtual environment** is a private set of packages for one project. Activate it with `source .venv/bin/activate` (Mac/Linux) or `.venv\\Scripts\\Activate.ps1` (Windows).",
          "`python --version` and `python -m pip --version` show which Python you are using. Record versions (`pip freeze`), setup steps, data location and run order."
        ]
      },
      {
        "heading": "Python, NumPy and pandas habits",
        "items": [
          "A variable is not fixed to one type, so check inputs at the edges. Use clear names (`learning_rate`, not `lr`).",
          "Functions should say what they take, return and can fail on. A **pure function** uses only its inputs, so it is easy to test.",
          {
            "type": "p",
            "text": "NumPy"
          },
          "Rows are examples and columns are features. **shape** is the size, **dtype** the kind of number.",
          "**Vectorisation** works on whole arrays at once: clearer and faster. **Broadcasting** stretches shapes to fit, so check it did what you meant.",
          {
            "type": "p",
            "text": "pandas"
          },
          "Look at shape, column names, types and first rows before changing anything. `df[[\"a\",\"b\"]]` selects columns, `query()` filters rows, `groupby` splits into groups, summarises each and combines.",
          "Count missing values and ask why they are missing.",
          {
            "type": "p",
            "text": "Modelling"
          },
          "`train_test_split` holds back test data; `random_state` makes it repeatable; `stratify=y` keeps class proportions. A **Pipeline** chains preparation and model so nothing leaks."
        ]
      },
      {
        "heading": "Good habits",
        "items": [
          "Keep data, notebooks, code, tests and outputs separate. Track code with Git, never commit passwords or private data. Record versions and random seeds. Rerun from a clean start.",
          "Collect only the data you need, record its source and licence, treat unknown files and saved models as unsafe, keep results separate from opinions, and declare any help."
        ]
      },
      {
        "heading": "Building a neural network in code",
        "items": [
          "An **MLP** (multi-layer perceptron) is a basic neural network. Scale the numbers, turn categories into numbers, and fit these steps on training data only.",
          "`MLPClassifier(hidden_layer_sizes=(64, 32), alpha=1e-4, early_stopping=True)` in scikit-learn: two hidden layers of 64 and 32 units, `alpha` is the penalty on large weights, and early stopping holds back some data.",
          "A convergence warning means check scaling, learning rate and size before simply training longer.",
          {
            "type": "p",
            "text": "Keras (a deep learning library)"
          },
          "Stack layers with `Sequential`, choose the optimiser and loss with `compile`, train with `fit`.",
          "`EarlyStopping(patience=10, restore_best_weights=True)` stops after 10 epochs without improvement and keeps the best weights.",
          "**Compare with simpler models** on the same folds and test data, plus training time, memory and ease of explanation.",
          "**Common mistakes**: a huge network, no scaling, one random seed, accuracy only, no baseline, choosing epochs using the test data."
        ]
      }
    ],
    "pitfalls": [
      "Calling fit on test data or fit_transform on the test set.",
      "Mixing loc and iloc.",
      "Installing into the global interpreter instead of a virtual environment.",
      "Not restarting the notebook kernel, leaving hidden state."
    ]
  }
];
