module.exports = [
{
  id: 'kmeans-clustering', title: 'Clustering: k-means, hierarchical, DBSCAN, choosing k, evaluation',
  priority: 12, tier: 'likely', freq: 'est. high', marks: '8-15 marks',
  summary: '**k-means alternates (1) assign each point to its nearest centroid and (2) move each centroid to the mean of its points until assignments stop changing, minimising within-cluster SSE; hierarchical clustering builds a dendrogram; DBSCAN finds density-based clusters and noise.**',
  mnemonic: 'k-means: ASSIGN then UPDATE, repeat till STABLE',
  source: ['CT4101_Notes_08_Unsupervised_Dimensionality_Reduction', 'CT4101_Notes_01_Intro_to_ML'],
  sections: [
    { heading: 'Unsupervised learning and clustering', items: [
      'No target labels: the algorithm reveals structure. Main tasks: **clustering**, **dimensionality reduction**, anomaly / density estimation, relationship (association) discovery.',
      '**Clustering** groups examples so that members of a group are similar and members of different groups are not. There is often no single correct answer; features, units, encodings and the distance define what "similar" means.',
      'Always scale features first (large-unit variables dominate Euclidean distance); one-hot and ordinal choices change the geometry.',
      'Uses: customer segmentation, document grouping, size design (for example XS to XL), preprocessing, exploration.'
    ]},
    { heading: 'k-means algorithm', items: [
      '1. Choose k and initialise k centroids (random points, or **k-means++** for well-spread seeds).',
      '2. **Assignment step**: assign each point to the nearest centroid (Euclidean distance).',
      '3. **Update step**: recompute each centroid as the mean of the points assigned to it.',
      '4. Repeat 2-3 until assignments (or centroids) stop changing or a maximum number of iterations is reached.',
      { type: 'formula', label: 'Objective (inertia / within-cluster SSE)', text: 'SSE = sum over clusters j, sum over points x in C_j of || x - mu_j ||^2   (mu_j = centroid = mean of C_j)' },
      'Each step cannot increase SSE, so it converges, but only to a **local minimum**; results depend on the seeds. Run several initialisations (n_init) and keep the lowest SSE. A bad start can even leave a cluster empty.',
      'Complexity roughly O(n k d) per iteration. Assumes compact, roughly spherical, similar-size clusters; sensitive to outliers (means) and to scaling; k must be given.'
    ]},
    { heading: 'Worked example (k = 2)', items: [
      'Points: A(1,1), B(1.5,2), C(3,3.5), D(5,7), E(3.5,5), F(4.5,5), G(3.5,4.5). Initial centroids: mu1 = A(1,1), mu2 = D(5,7).',
      { type: 'table', head: ['Point', 'd to mu1', 'd to mu2', 'Assigned'], rows: [
        ['A (1,1)', '0.00', '7.21', 'C1'], ['B (1.5,2)', '1.12', '6.10', 'C1'], ['C (3,3.5)', '3.20', '4.03', 'C1'],
        ['D (5,7)', '7.21', '0.00', 'C2'], ['E (3.5,5)', '4.72', '2.50', 'C2'], ['F (4.5,5)', '5.32', '2.06', 'C2'], ['G (3.5,4.5)', '4.30', '2.92', 'C2'] ] },
      'Update: mu1 = ((1 + 1.5 + 3)/3, (1 + 2 + 3.5)/3) = (1.833, 2.167); mu2 = ((5 + 3.5 + 4.5 + 3.5)/4, (7 + 5 + 5 + 4.5)/4) = (4.125, 5.375).',
      'Iteration 2: distances to the new centroids give the same assignments (C: 1.77 vs 2.19; E: 3.29 vs 0.73 and so on), so **converged**. Final SSE = 10.71.',
      'Note: this is a local optimum from these seeds: an exhaustive search finds a 5 + 2 partition with SSE 9.83, which shows why several restarts are used.',
      'Cluster summary: C1 = {A, B, C} centre (1.83, 2.17); C2 = {D, E, F, G} centre (4.13, 5.38).'
    ]},
    { heading: 'Choosing k', items: [
      '**Elbow method**: plot SSE (inertia) against k; SSE always falls as k grows; pick the "elbow" where gains diminish. Often ambiguous.',
      { type: 'diagram', kind: 'line', caption: 'Elbow plot for the 7-point data (best SSE found per k): the big drops stop after k = 3 (37.36, 9.83, 3.31, 1.46, 0.75).', data: {
        title: 'Elbow method', xLabel: 'k (number of clusters)', yLabel: 'SSE (inertia)', yMin: 0, yMax: 40,
        series: [{ name: 'SSE', points: [[1, 37.36], [2, 9.83], [3, 3.31], [4, 1.46], [5, 0.75]] }] } },
      '**Silhouette score**: for a point, a = mean distance to its own cluster, b = mean distance to the nearest other cluster, s = (b - a) / max(a, b), in [-1, 1]; near 1 = well clustered, 0 = on the boundary, negative = probably wrong cluster. Average over points; pick k with the highest mean.',
      'Example (k = 2 above), point A: a = (d(A,B) + d(A,C))/2 = 2.16; b = mean distance to D, E, F, G = 5.39; s = (5.39 - 2.16)/5.39 = 0.60.',
      'Other: gap statistic, domain knowledge (for example five garment sizes means k = 5), stability under resampling. Internal scores do not prove real-world validity.',
      'External validation, if labels exist: Adjusted Rand Index, purity; a cluster need not equal a class.'
    ]},
    { heading: 'Hierarchical (agglomerative) clustering', items: [
      'Start with every point as its own cluster; repeatedly **merge the two closest clusters** until one remains. The result is a **dendrogram**; cut it at a height to get k clusters. No k needed in advance; deterministic.',
      '**Linkage** defines cluster distance: **single** (closest pair; chains, finds elongated shapes, sensitive to noise), **complete** (farthest pair; compact clusters), **average** (mean pairwise distance), **Ward** (merge that least increases within-cluster variance; similar to k-means).',
      'Cost O(n^2) memory and at least O(n^2) time, so it does not scale to very large data.'
    ]},
    { heading: 'DBSCAN (density-based)', items: [
      'Parameters: **eps** (neighbourhood radius) and **min_samples** (points needed in the eps-neighbourhood).',
      '**Core point**: at least min_samples points (including itself) within eps. **Border point**: within eps of a core point but not core. **Noise**: neither.',
      'Clusters = connected groups of density-reachable core points plus their border points. Noise points are labelled -1.',
      'Strengths: arbitrary shapes (moons, rings), no k, identifies outliers. Weaknesses: one global eps struggles with varying density; sensitive to eps and scaling; distance becomes meaningless in high dimensions.'
    ]},
    { heading: 'Comparison', items: [
      { type: 'table', head: ['Method', 'Cluster notion', 'Needs k?', 'Shapes', 'Outliers'], rows: [
        ['k-means', 'Centroid / variance', 'Yes', 'Compact, convex', 'Sensitive'],
        ['Hierarchical', 'Nested merges, linkage', 'Cut level', 'Depends on linkage', 'Single linkage sensitive'],
        ['DBSCAN', 'Density', 'No (eps, min_samples)', 'Arbitrary', 'Marks as noise'] ] },
      'Reporting clustering results: state preprocessing, k / eps / linkage, instability, representative and borderline examples, and avoid over-claiming meaning.'
    ]},
    {"heading":"Lecture detail (Week 8)","items":["Supervised vs unsupervised: supervised has known targets defining predictive loss, judged on unseen labelled data; unsupervised has no target defining correctness, so structure is assessed by geometry, stability, usefulness and domain evidence. Tasks: clustering, dimensionality reduction (fewer latent dimensions), anomaly / density analysis (unusual points or low-density regions).","Clusters are not discovered facts but outputs of choices: **representation** (features, units, encodings, transformations), **similarity** (Euclidean distance, graph links or density encode different relationships), **algorithm** (favours cluster shapes, sizes, densities), **interpretation** (domain knowledge decides if useful or harmful). Preprocessing: scaling (large-unit variables dominate), encoding (one-hot / ordinal change distances), missingness (imputation can create artificial similarity or separation).","Letters example: letters can be grouped by colour, case or character; there is no ground truth, so several groupings are valid because each highlights different characteristics. k-means is the most well-known clustering algorithm: simple, computationally efficient, easy to implement and usually effective; it reuses feature spaces and distance metrics from k-NN.","Formal goal: given dataset D of n instances d_1..d_n (each with m descriptive features), divide into k disjoint clusters C_1..C_k, k an input, by minimising the sum over clusters of sum of Dist(d, c_i)^2 where c_1..c_k are the **centroids** (vectors of coordinates in feature space).","Lecture pseudocode: require dataset D (n instances), k, a distance measure Dist. (1) select k random centroids c_1..c_k (each c_i = <c_i[1], ..., c_i[m]>); (2) repeat: (3) calculate the distance of each instance to each centroid using Dist; (4) assign each instance to the cluster of its closest centroid; (5) update each centroid to the average of the descriptive feature values of the instances in its cluster; (6) until no cluster reassignments occur during an iteration.","Issues: **distance metric** (Euclidean is common; others may break convergence guarantees; k-medoids addresses this); **normalisation** (as in k-NN, attributes with the largest ranges dominate); **convergence** = no cluster memberships change in a full iteration; choosing k (below).","Mobile Phone Customer dataset (normalised; features Data Usage and Call Volume): 3 natural clusters visible to a human, but real high-dimensional data cannot be eyeballed. Centroid update example for a cluster of 9 customers: c1[Data Usage] = (-0.9531 - 1.167 - 1.2329 - 0.8431 + 0.9285 - 1.005 + 0.2021 - 0.7426 - 0.3414)/9 = -0.5727; c1[Call Volume] = -0.0706 (mean of each feature over the cluster members). Outputs: a vector of cluster assignments and the k centroids; the assignments can be added to the dataset as a new generated feature (cluster membership).","Initial centroids (seeds) matter: different random starts give different, often sub-optimal clusterings (local minima); an unlucky start can leave a cluster with no members (easy fix: choose random instances from the dataset as seeds); remedy: multiple runs from different seeds, keep the best / most common clustering.","**Inertia** = sum of squared distances from each point to the centre of its assigned cluster (= SSE); the loss function we minimise; used to compare clusterings. Iris example: inertia = 0.47^2 + 0.19^2 + 0.34^2 + 0.25^2 + 0.58^2 + 0.36^2 + 0.44^2 = 1.095. Elbow method: plot inertia vs k; in the slide example k = 3 looks appropriate; there is no definitive method and domain knowledge may be needed; silhouette is a more complex alternative (not covered in depth in lectures).","Choosing k by domain value (Andrew Ng shirt example): cluster customer heights and weights with k = 3 (S, M, L) or k = 5 (XS, S, M, L, XL), compare projected costs and sales, pick the k that maximises profit. Three k criteria: elbow, silhouette evidence, domain usefulness.","k-means failure modes: cluster shape (best for compact, roughly convex groups), scale (unequal sizes or variances give unintuitive partitions), outliers (pull centroids), categorical data (means and Euclidean distance not defined for arbitrary categories). sklearn: `KMeans(n_clusters=4, n_init=\"auto\", random_state=42)` inside a pipeline with StandardScaler; inspect `labels_` and `cluster_centers_`.","Hierarchical clustering: a family that builds **nested clusters** by merging or splitting successively, shown as a tree (dendrogram); the root is the single cluster of all samples, leaves are single-sample clusters; can be more computationally expensive than k-means. **Agglomerative (AHC)** starts with each instance in its own cluster and merges the most similar adjacent clusters each iteration; no k needed in advance; can find clusters k-means cannot (circles and half-moons datasets, because k-means assumes spherical clusters around a centroid).","Dendrogram reading: leaves = individual examples, branches = nested merges at increasing distance (merge height = dissimilarity), the cut height decides the number of groups (examples shown: cut for k = 3 and k = 6). A dendrogram is a hierarchy of possible partitions, not proof of natural categories. sklearn: `AgglomerativeClustering(n_clusters=4, linkage=\"ward\")` or `distance_threshold`; optional connectivity graph constraints.","DBSCAN algorithm in words: pick a point; look within radius eps; if at least min_samples points are nearby it becomes part of a cluster; check those neighbours, and if they also have enough neighbours the cluster expands outward; continue until no more sufficiently connected points, then look elsewhere for another cluster; points never in a dense region are noise. Core point = at least min_samples within eps (including itself); border point = within a core neighbourhood but lacking enough support; noise = not density-reachable. Strengths: arbitrary shapes, no required k, explicit noise. Limits: one global eps struggles with varying densities; parameter sensitive; scaling still decisive.","Choosing a method: k-means = centroid / variance, compact convex groups, must choose k; agglomerative = hierarchy / linkage, nested groupings, choose linkage and cut; DBSCAN = local density, irregular shapes plus noise, choose eps and min_samples.","Cluster evaluation: internal (cohesion = close within cluster, separation = distinct from neighbours; inherits the chosen distance and may favour shapes), **silhouette** s(i) = [b(i) - a(i)] / max(a(i), b(i)) (near +1 well matched, near 0 boundary or overlap, negative possibly in the wrong cluster), **Davies-Bouldin** (average similarity of each cluster to its most similar alternative; lower is better), **Calinski-Harabasz** (between- vs within-cluster dispersion; higher is better), inertia (always decreases as k increases). External: **Adjusted Rand Index** (pairwise agreement with reference labels adjusted for chance), **Adjusted Mutual Information**; a cluster need not match a class label. Stability: resampling, different initialisations, parameter sensitivity (k, eps, linkage, preprocessing), align partitions and quantify membership consistency.","Interpretation checklist: inspect cluster sizes and extreme imbalance; summarise feature distributions not only means; examine representative and borderline examples; check whether separation is driven by one artefact or proxy; use domain experts; avoid naming clusters as essential identities; state instability, excluded cases and preprocessing dependence.","Unsupervised workflow: define purpose, prepare and scale, fit multiple plausible methods, evaluate geometry and stability, interpret with domain knowledge. Avoid leakage: fit scaling, PCA and cluster-derived features inside training folds; for temporal data do not let future structure shape past representations; separate exploratory full-data structure from validated predictive claims. Responsible clustering: proxy risk (clusters may reflect protected characteristics or structural inequality), reification (names make unstable clusters look like permanent identities), actionability (a cluster is not automatically a valid basis for treatment), transparency (report preprocessing, instability, excluded cases, noise).","Common mistakes: not scaling; choosing k from the elbow alone; PCA plot as proof; treating integer cluster labels as meaningful or ordered; over-naming groups; fitting PCA before the split."]}
  ],
  pitfalls: [
    'Not scaling features before clustering.',
    'Assuming k-means finds the global optimum or that SSE alone picks k (it always falls with k).',
    'Updating a centroid as the median or a sample point instead of the mean (that is k-medians / k-medoids).',
    'Believing a cluster is a real class or social category.',
    'Stopping after one iteration: you must verify assignments no longer change.'
  ]
},
{
  id: 'pca', title: 'Principal Component Analysis (dimensionality reduction)',
  priority: 13, tier: 'likely', freq: 'est. medium-high', marks: '8-12 marks',
  summary: '**PCA centres (and scales) the data, finds orthogonal directions of maximum variance (eigenvectors of the covariance matrix, ordered by eigenvalue), and projects onto the top few; eigenvalue / sum of eigenvalues is the variance explained.**',
  mnemonic: 'PCA: Centre, Covariance, Eigen, Project',
  source: ['CT4101_Notes_08_Unsupervised_Dimensionality_Reduction', 'CT4101_Notes_03_Data_Prep_Feature_Engineering'],
  sections: [
    { heading: 'Purpose', items: [
      'Unsupervised **dimensionality reduction**: represent many correlated features with fewer informative ones for visualisation, compression, noise reduction, speeding up models and fighting the curse of dimensionality.',
      'Principal components are new axes: linear combinations of the original features, **orthogonal** (uncorrelated) to each other, ordered by variance captured.',
      'PCA is a rotation of the coordinate system toward directions of greatest variance; keeping the first m components keeps the most variance possible with m dimensions.'
    ]},
    { heading: 'Steps', items: [
      '1. **Standardise** (at least centre; scale when features have different units, because PCA is variance based).',
      '2. Compute the **covariance matrix** C = (1/(n-1)) X_c^T X_c (d x d).',
      '3. Compute its **eigenvalues** (variance along each component) and **eigenvectors** (component directions); sort by eigenvalue descending.',
      '4. Choose m components: keep enough to reach a target such as 90-95% cumulative explained variance, or use a scree plot elbow.',
      '5. **Project**: scores Z = X_c W_m where W_m holds the top m eigenvectors as columns.',
      { type: 'formula', label: 'Explained variance ratio', text: 'EVR_j = lambda_j / (lambda_1 + ... + lambda_d)   (lambda_j = j-th eigenvalue; trace of C = total variance)' },
      'Equivalent via SVD of the centred data matrix (what scikit-learn does). Fit the scaler and PCA on training data only, inside a Pipeline.'
    ]},
    { heading: 'Worked example', items: [
      'Points (x, y): (1,1), (2,3), (3,2), (4,5), (5,4). Means = (3, 3). Centred: (-2,-2), (-1,0), (0,-1), (1,2), (2,1).',
      'Var(x) = (4 + 1 + 0 + 1 + 4)/4 = 2.5; Var(y) = (4 + 0 + 1 + 4 + 1)/4 = 2.5; Cov(x,y) = (4 + 0 + 0 + 2 + 2)/4 = 2.0.',
      'Covariance matrix C = [[2.5, 2.0], [2.0, 2.5]].',
      'Characteristic equation: (2.5 - L)^2 - 2^2 = 0, so L = 2.5 +/- 2: **lambda1 = 4.5, lambda2 = 0.5**.',
      'Eigenvectors: for 4.5, (C - 4.5 I)v = 0 gives v1 = (1, 1)/sqrt(2) = (0.707, 0.707); for 0.5, v2 = (1, -1)/sqrt(2).',
      'Explained variance: PC1 = 4.5/5.0 = **90%**, PC2 = 10%. Keeping one component retains 90% of the variance.',
      'Project to PC1: score = (0.707)(x_c + y_c): (-2,-2) gives -2.83; (-1,0) gives -0.71; (0,-1) gives -0.71; (1,2) gives 2.12; (2,1) gives 2.12. Variance of the scores = (8 + 0.5 + 0.5 + 4.5 + 4.5)/4 = 4.5 = lambda1 (check).',
      'Reconstruction error from dropping PC2 equals the discarded variance share (10%).'
    ]},
    { heading: 'Choosing components and interpretation', items: [
      '**Scree plot**: eigenvalues versus component number; look for the elbow. **Cumulative explained variance** curve: pick the smallest m reaching the target.',
      '**Loadings** (eigenvector entries) show how original features contribute; components are hard to interpret and mix features.',
      'Components are not guaranteed to be good for prediction: high variance does not mean high class separation (supervised alternatives: LDA).'
    ]},
    { heading: 'Limitations and relatives', items: [
      'Linear only; sensitive to scaling and outliers; assumes variance is information; loses original feature meaning; centring/scaling must come from training data only.',
      'Non-linear / visualisation methods: t-SNE, UMAP (preserve local neighbourhoods; not for new data pipelines or distances), kernel PCA, autoencoders.',
      'Contrast with **feature selection**, which keeps a subset of original features, while PCA builds new ones.'
    ]},
    {"heading":"Lecture detail (Week 8)","items":["Why reduce dimension: **visualisation** (project to 2-3 dimensions), **compression** (retain dominant variation with fewer numerical components), **redundancy control** (combine correlated features into orthogonal directions). It can discard predictive or subgroup-relevant information.","Intuition: take a dataset with many features and find new directions capturing as much variation as possible, keep only the most useful directions (e.g. 20 features to 5). **PC1** = direction through the data with the most variance; **PC2** = orthogonal direction with the next greatest variance; **projection** = each example represented by its scores along the selected components.","Preparation: scikit-learn PCA centres each feature but does **not** standardise; large-variance units may dominate components, so choose scaling from the meaning of the measurements, not by ritual.","Explained variance: scree plot (variance by component), cumulative variance (retained by the first q components); high variance is not necessarily predictive or important, so \"variance\" is not the same as \"information\". Choosing components: variance threshold (retain a declared proportion), downstream validation (tune component count inside a supervised pipeline), visualisation (2 components only with an honest variance statement).","**Scores** = coordinates of each example in component space; **loadings** = weights connecting original features to each component direction. The sign of a component can flip without changing the subspace.","sklearn: `PCA(n_components=0.90, random_state=42)` after `StandardScaler` in one pipeline (0.90 keeps enough components to explain at least 90% variance); fit directions on training data only; consider `TruncatedSVD` for sparse data where centring is unsuitable.","Limitations: linear structure (curved manifolds not captured compactly), variance objective (not class separation or causal relevance), interpretability (components mix features), outliers (extreme cases alter directions and variance).","PCA and clustering: PCA before clustering can reduce noise and redundancy but may remove low-variance cluster structure; clustering before PCA (cluster in the original prepared space, use PCA only to visualise); compare both for stability and domain usefulness. Mistakes: fitting PCA before the split; treating a 2-D PCA plot as proof (it can distort distances and separation)."]}
  ],
  pitfalls: [
    'Forgetting to centre / standardise the data first.',
    'Dividing by n instead of n-1 inconsistently when computing covariance (state your convention).',
    'Reporting eigenvalues as percentages without dividing by their sum.',
    'Fitting PCA on the full dataset before the train/test split (leakage).',
    'Claiming principal components are interpretable original features.'
  ]
}
];
