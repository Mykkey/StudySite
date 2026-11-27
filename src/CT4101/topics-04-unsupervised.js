module.exports = [
  {
    "id": "kmeans-clustering",
    "title": "Clustering: k-means, hierarchical, DBSCAN, choosing k, evaluation",
    "priority": 12,
    "tier": "likely",
    "freq": "est. high",
    "marks": "8-15 marks",
    "summary": "**k-means alternates (1) assign each point to its nearest centroid and (2) move each centroid to the mean of its points until assignments stop changing, minimising within-cluster SSE; hierarchical clustering builds a dendrogram; DBSCAN finds density-based clusters and noise.**",
    "mnemonic": "k-means: ASSIGN then UPDATE, repeat till STABLE",
    "source": [
      "CT4101_Notes_08_Unsupervised_Dimensionality_Reduction",
      "CT4101_Notes_01_Intro_to_ML"
    ],
    "sections": [
      {
        "heading": "Unsupervised learning and clustering",
        "items": [
          "No target labels: the algorithm reveals structure. Main tasks: **clustering**, **dimensionality reduction**, anomaly / density estimation, relationship (association) discovery.",
          "**Clustering** groups examples so that members of a group are similar and members of different groups are not. There is often no single correct answer; features, units, encodings and the distance define what \"similar\" means.",
          "Always scale features first (large-unit variables dominate Euclidean distance); one-hot and ordinal choices change the geometry.",
          "Uses: customer segmentation, document grouping, size design (for example XS to XL), preprocessing, exploration."
        ]
      },
      {
        "heading": "k-means algorithm",
        "items": [
          "1. Choose k and initialise k centroids (random points, or **k-means++** for well-spread seeds).",
          "2. **Assignment step**: assign each point to the nearest centroid (Euclidean distance).",
          "3. **Update step**: recompute each centroid as the mean of the points assigned to it.",
          "4. Repeat 2-3 until assignments (or centroids) stop changing or a maximum number of iterations is reached.",
          {
            "type": "formula",
            "label": "Objective (inertia / within-cluster SSE)",
            "text": "SSE = sum over clusters j, sum over points x in C_j of || x - mu_j ||^2   (mu_j = centroid = mean of C_j)"
          },
          "Each step cannot increase SSE, so it converges, but only to a **local minimum**; results depend on the seeds. Run several initialisations (n_init) and keep the lowest SSE. A bad start can even leave a cluster empty.",
          "Complexity roughly O(n k d) per iteration. Assumes compact, roughly spherical, similar-size clusters; sensitive to outliers (means) and to scaling; k must be given."
        ]
      },
      {
        "heading": "Worked example (k = 2)",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Run k-means until the clusters stop changing."
            ],
            "uses": [
              "Euclidean (L2)",
              "Objective (inertia / within-cluster SSE)"
            ]
          },
          "Points: A(1,1), B(1.5,2), C(3,3.5), D(5,7), E(3.5,5), F(4.5,5), G(3.5,4.5). Initial centroids: mu1 = A(1,1), mu2 = D(5,7).",
          {
            "type": "table",
            "head": [
              "Point",
              "d to mu1",
              "d to mu2",
              "Assigned"
            ],
            "rows": [
              [
                "A (1,1)",
                "0.00",
                "7.21",
                "C1"
              ],
              [
                "B (1.5,2)",
                "1.12",
                "6.10",
                "C1"
              ],
              [
                "C (3,3.5)",
                "3.20",
                "4.03",
                "C1"
              ],
              [
                "D (5,7)",
                "7.21",
                "0.00",
                "C2"
              ],
              [
                "E (3.5,5)",
                "4.72",
                "2.50",
                "C2"
              ],
              [
                "F (4.5,5)",
                "5.32",
                "2.06",
                "C2"
              ],
              [
                "G (3.5,4.5)",
                "4.30",
                "2.92",
                "C2"
              ]
            ]
          },
          "Update: mu1 = ((1 + 1.5 + 3)/3, (1 + 2 + 3.5)/3) = (1.833, 2.167); mu2 = ((5 + 3.5 + 4.5 + 3.5)/4, (7 + 5 + 5 + 4.5)/4) = (4.125, 5.375).",
          "Iteration 2: distances to the new centroids give the same assignments (C: 1.77 vs 2.19; E: 3.29 vs 0.73 and so on), so **converged**. Final SSE = 10.71.",
          "Note: this is a local optimum from these seeds: an exhaustive search finds a 5 + 2 partition with SSE 9.83, which shows why several restarts are used.",
          "Cluster summary: C1 = {A, B, C} centre (1.83, 2.17); C2 = {D, E, F, G} centre (4.13, 5.38)."
        ]
      },
      {
        "heading": "Choosing k",
        "items": [
          "**Elbow method**: plot SSE (inertia) against k; SSE always falls as k grows; pick the \"elbow\" where gains diminish. Often ambiguous.",
          {
            "type": "diagram",
            "kind": "line",
            "caption": "Elbow plot for the 7-point data (best SSE found per k): the big drops stop after k = 3 (37.36, 9.83, 3.31, 1.46, 0.75).",
            "data": {
              "title": "Elbow method",
              "xLabel": "k (number of clusters)",
              "yLabel": "SSE (inertia)",
              "yMin": 0,
              "yMax": 40,
              "series": [
                {
                  "name": "SSE",
                  "points": [
                    [
                      1,
                      37.36
                    ],
                    [
                      2,
                      9.83
                    ],
                    [
                      3,
                      3.31
                    ],
                    [
                      4,
                      1.46
                    ],
                    [
                      5,
                      0.75
                    ]
                  ]
                }
              ]
            }
          },
          "**Silhouette score**: for a point, a = mean distance to its own cluster, b = mean distance to the nearest other cluster, s = (b - a) / max(a, b), in [-1, 1]; near 1 = well clustered, 0 = on the boundary, negative = probably wrong cluster. Average over points; pick k with the highest mean.",
          "Example (k = 2 above), point A: a = (d(A,B) + d(A,C))/2 = 2.16; b = mean distance to D, E, F, G = 5.39; s = (5.39 - 2.16)/5.39 = 0.60.",
          "Other: gap statistic, domain knowledge (for example five garment sizes means k = 5), stability under resampling. Internal scores do not prove real-world validity.",
          "External validation, if labels exist: Adjusted Rand Index, purity; a cluster need not equal a class."
        ]
      },
      {
        "heading": "Hierarchical (agglomerative) clustering",
        "items": [
          "Start with every point as its own cluster; repeatedly **merge the two closest clusters** until one remains. The result is a **dendrogram**; cut it at a height to get k clusters. No k needed in advance; deterministic.",
          "**Linkage** defines cluster distance: **single** (closest pair; chains, finds elongated shapes, sensitive to noise), **complete** (farthest pair; compact clusters), **average** (mean pairwise distance), **Ward** (merge that least increases within-cluster variance; similar to k-means).",
          "Cost O(n^2) memory and at least O(n^2) time, so it does not scale to very large data."
        ]
      },
      {
        "heading": "DBSCAN (density-based)",
        "items": [
          "Parameters: **eps** (neighbourhood radius) and **min_samples** (points needed in the eps-neighbourhood).",
          "**Core point**: at least min_samples points (including itself) within eps. **Border point**: within eps of a core point but not core. **Noise**: neither.",
          "Clusters = connected groups of density-reachable core points plus their border points. Noise points are labelled -1.",
          "Strengths: arbitrary shapes (moons, rings), no k, identifies outliers. Weaknesses: one global eps struggles with varying density; sensitive to eps and scaling; distance becomes meaningless in high dimensions."
        ]
      },
      {
        "heading": "Comparison",
        "items": [
          {
            "type": "table",
            "head": [
              "Method",
              "Cluster notion",
              "Needs k?",
              "Shapes",
              "Outliers"
            ],
            "rows": [
              [
                "k-means",
                "Centroid / variance",
                "Yes",
                "Compact, convex",
                "Sensitive"
              ],
              [
                "Hierarchical",
                "Nested merges, linkage",
                "Cut level",
                "Depends on linkage",
                "Single linkage sensitive"
              ],
              [
                "DBSCAN",
                "Density",
                "No (eps, min_samples)",
                "Arbitrary",
                "Marks as noise"
              ]
            ]
          },
          "Reporting clustering results: state preprocessing, k / eps / linkage, instability, representative and borderline examples, and avoid over-claiming meaning."
        ]
      },
      {
        "heading": "Clusters depend on your choices",
        "items": [
          "**Supervised** learning has known answers to check against. **Unsupervised** learning has none, so we judge the structure by its shape, whether it stays stable, whether it is useful and what experts say.",
          "Unsupervised tasks: **clustering** (grouping), **dimensionality reduction** (fewer columns) and **anomaly detection** (finding unusual points).",
          "A **cluster** is not a discovered fact. It depends on which **features** you use, how you measure **similarity**, which **algorithm** you pick (each prefers certain shapes) and how you **interpret** it.",
          "Letters can be grouped by colour, by capital or small, or by character. None is the \"true\" grouping.",
          "Preparation matters: unscaled large numbers dominate, how categories are coded changes distances, and filling missing values can make things look alike."
        ]
      },
      {
        "heading": "k-means in detail",
        "items": [
          "**k-means** is the best-known clustering method: simple, fast and usually effective. It uses the same distance measures as k-NN.",
          "A **centroid** is the centre point of a cluster: the average of its members' values.",
          "The goal: split the data into k groups so that the total squared distance from each point to its centroid is as small as possible. You choose k.",
          {
            "type": "p",
            "text": "Steps"
          },
          "**1.** Pick k random starting centroids.",
          "**2.** Measure each point's distance to every centroid.",
          "**3.** Put each point in the cluster of the nearest one.",
          "**4.** Move each centroid to the average of its points.",
          "**5.** Repeat 2 to 4 until no point changes cluster (it has **converged**).",
          "Example: a 9-customer cluster's new centre is the average of their data usage (-0.5727) and the average of their call volume (-0.0706).",
          "It outputs a cluster number for each point (which can be used as a new feature) and the k centroids.",
          {
            "type": "p",
            "text": "Things that matter"
          },
          "**Starting points**: different random starts give different answers, some poor, and a bad start can leave a cluster empty. Use real data points as starts, run several times, keep the best.",
          "**Distance**: Euclidean is normal. Others can stop it converging; **k-medoids** (centres must be real points) handles that.",
          "**Scaling**: without it, the feature with the biggest range dominates."
        ]
      },
      {
        "heading": "Inertia and choosing k",
        "items": [
          "**Inertia** is the sum of squared distances from every point to its own centroid. k-means tries to make it small.",
          "Example: 0.47^2 + 0.19^2 + 0.34^2 + 0.25^2 + 0.58^2 + 0.36^2 + 0.44^2 = 1.095.",
          "**Elbow method**: plot inertia against k and pick where the curve stops dropping steeply. There is no definitive method.",
          "Domain knowledge helps: for T-shirts, cluster customer heights and weights with k = 3 (S, M, L) or k = 5 (XS to XL), compare costs and sales, and keep the more profitable.",
          "So use three things: the elbow, the **silhouette** score (explained below) and usefulness.",
          {
            "type": "p",
            "text": "When k-means struggles"
          },
          "It suits compact, roundish groups of similar size. Outliers drag centroids. It cannot average categories.",
          "In scikit-learn: `KMeans(n_clusters=4)` after `StandardScaler`; look at `labels_` and `cluster_centers_`."
        ]
      },
      {
        "heading": "Hierarchical clustering",
        "items": [
          "It builds **clusters inside clusters**, shown as a tree called a **dendrogram**. The top is one cluster of everything; the bottom is each point alone.",
          "**Agglomerative** (bottom-up): start with every point alone and keep merging the two most similar clusters. No k needed in advance.",
          "It can find shapes k-means cannot, such as rings or half-moons. It can cost more to compute.",
          {
            "type": "p",
            "text": "Reading a dendrogram"
          },
          "Leaves are individual examples. Joins show merges, and a higher join means the two were less alike.",
          "Cutting the tree at a height gives that many groups. It offers possible groupings, not proof of real categories.",
          "In scikit-learn: `AgglomerativeClustering(n_clusters=4, linkage=\"ward\")`. **Linkage** is the rule for the distance between two clusters."
        ]
      },
      {
        "heading": "DBSCAN",
        "items": [
          "**DBSCAN** finds clusters as crowded areas. Two settings: **eps** (how far counts as \"nearby\") and **min_samples** (how many neighbours make an area crowded).",
          "**1.** Pick a point and count the points within eps.",
          "**2.** If there are at least min_samples, start a cluster.",
          "**3.** Add neighbours, and keep spreading through any that are also crowded.",
          "**4.** When it stops, look elsewhere for another cluster.",
          "**Core point**: has enough neighbours (counting itself). **Border point**: next to a core point but not crowded itself. **Noise**: in no crowded area.",
          "**Good**: any shape, no k, marks noise. **Bad**: one eps struggles when clusters differ in density, sensitive to settings, needs scaling.",
          {
            "type": "p",
            "text": "Choosing a method"
          },
          "**k-means**: compact roundish groups; you choose k. **Agglomerative**: nested groups; choose linkage and where to cut. **DBSCAN**: odd shapes and noise; choose eps and min_samples."
        ]
      },
      {
        "heading": "Judging a clustering",
        "items": [
          {
            "type": "p",
            "text": "Without known labels"
          },
          "**Cohesion**: points in a cluster are close. **Separation**: clusters are far apart.",
          "**Silhouette** per point: (b - a) / max(a, b), where a is the average distance to its own cluster and b to the nearest other one. Near +1 is well placed, near 0 on a boundary, negative probably wrong.",
          "**Davies-Bouldin**: how similar each cluster is to its closest rival; lower is better.",
          "**Calinski-Harabasz**: spread between clusters compared with spread inside them; higher is better.",
          "Inertia always falls as k rises, so it cannot choose k alone.",
          {
            "type": "p",
            "text": "With known labels"
          },
          "**Adjusted Rand Index** and **Adjusted Mutual Information** score agreement with the labels, allowing for chance. A cluster need not match a class.",
          "**Stability**: change the sample, the starting points or the settings and see whether the same points stay together.",
          {
            "type": "p",
            "text": "Interpreting"
          },
          "Check cluster sizes, whole feature distributions, typical and borderline members, and whether one odd feature is causing the split. Ask experts."
        ]
      },
      {
        "heading": "Using clusters responsibly",
        "items": [
          "**Workflow**: define the purpose, prepare and scale, try several methods, check shape and stability, interpret with domain knowledge.",
          "Avoid **leakage** (test data influencing training): fit scaling and clusters on training data only, and do not let future data shape the past.",
          "**Risks**: clusters may mirror protected traits or unfairness; naming a cluster makes it seem like a fixed identity; a cluster alone does not justify treating people differently. Report instability, exclusions and noise.",
          "**Common mistakes**: not scaling, using only the elbow, treating a 2-D plot as proof, treating cluster numbers as an order, over-naming groups, fitting before splitting."
        ]
      }
    ],
    "pitfalls": [
      "Not scaling features before clustering.",
      "Assuming k-means finds the global optimum or that SSE alone picks k (it always falls with k).",
      "Updating a centroid as the median or a sample point instead of the mean (that is k-medians / k-medoids).",
      "Believing a cluster is a real class or social category.",
      "Stopping after one iteration: you must verify assignments no longer change."
    ]
  },
  {
    "id": "pca",
    "title": "Principal Component Analysis (dimensionality reduction)",
    "priority": 13,
    "tier": "likely",
    "freq": "est. medium-high",
    "marks": "8-12 marks",
    "summary": "**PCA centres (and scales) the data, finds orthogonal directions of maximum variance (eigenvectors of the covariance matrix, ordered by eigenvalue), and projects onto the top few; eigenvalue / sum of eigenvalues is the variance explained.**",
    "mnemonic": "PCA: Centre, Covariance, Eigen, Project",
    "source": [
      "CT4101_Notes_08_Unsupervised_Dimensionality_Reduction",
      "CT4101_Notes_03_Data_Prep_Feature_Engineering"
    ],
    "sections": [
      {
        "heading": "Purpose",
        "items": [
          "Unsupervised **dimensionality reduction**: represent many correlated features with fewer informative ones for visualisation, compression, noise reduction, speeding up models and fighting the curse of dimensionality.",
          "Principal components are new axes: linear combinations of the original features, **orthogonal** (uncorrelated) to each other, ordered by variance captured.",
          "PCA is a rotation of the coordinate system toward directions of greatest variance; keeping the first m components keeps the most variance possible with m dimensions."
        ]
      },
      {
        "heading": "Steps",
        "items": [
          "1. **Standardise** (at least centre; scale when features have different units, because PCA is variance based).",
          "2. Compute the **covariance matrix** C = (1/(n-1)) X_c^T X_c (d x d).",
          "3. Compute its **eigenvalues** (variance along each component) and **eigenvectors** (component directions); sort by eigenvalue descending.",
          "4. Choose m components: keep enough to reach a target such as 90-95% cumulative explained variance, or use a scree plot elbow.",
          "5. **Project**: scores Z = X_c W_m where W_m holds the top m eigenvectors as columns.",
          {
            "type": "formula",
            "label": "Explained variance ratio",
            "text": "EVR_j = lambda_j / (lambda_1 + ... + lambda_d)   (lambda_j = j-th eigenvalue; trace of C = total variance)"
          },
          "Equivalent via SVD of the centred data matrix (what scikit-learn does). Fit the scaler and PCA on training data only, inside a Pipeline."
        ]
      },
      {
        "heading": "Worked example",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "Points (x, y): (1, 1), (2, 3), (3, 2), (4, 5), (5, 4).",
              "Find the covariance matrix, its eigenvalues and eigenvectors, and how much variance the first component explains."
            ],
            "own": [
              {
                "type": "formula",
                "label": "Sample variance and covariance",
                "text": "var(x) = Σ (x − mean x)² / (n − 1). cov(x, y) = Σ (x − mean x)(y − mean y) / (n − 1)."
              },
              {
                "type": "formula",
                "label": "Eigenvalues",
                "text": "solve det(C − λ I) = 0"
              }
            ]
          },
          "Points (x, y): (1,1), (2,3), (3,2), (4,5), (5,4). Means = (3, 3). Centred: (-2,-2), (-1,0), (0,-1), (1,2), (2,1).",
          "Var(x) = (4 + 1 + 0 + 1 + 4)/4 = 2.5; Var(y) = (4 + 0 + 1 + 4 + 1)/4 = 2.5; Cov(x,y) = (4 + 0 + 0 + 2 + 2)/4 = 2.0.",
          "Covariance matrix C = [[2.5, 2.0], [2.0, 2.5]].",
          "Characteristic equation: (2.5 - L)^2 - 2^2 = 0, so L = 2.5 +/- 2: **lambda1 = 4.5, lambda2 = 0.5**.",
          "Eigenvectors: for 4.5, (C - 4.5 I)v = 0 gives v1 = (1, 1)/sqrt(2) = (0.707, 0.707); for 0.5, v2 = (1, -1)/sqrt(2).",
          "Explained variance: PC1 = 4.5/5.0 = **90%**, PC2 = 10%. Keeping one component retains 90% of the variance.",
          "Project to PC1: score = (0.707)(x_c + y_c): (-2,-2) gives -2.83; (-1,0) gives -0.71; (0,-1) gives -0.71; (1,2) gives 2.12; (2,1) gives 2.12. Variance of the scores = (8 + 0.5 + 0.5 + 4.5 + 4.5)/4 = 4.5 = lambda1 (check).",
          "Reconstruction error from dropping PC2 equals the discarded variance share (10%)."
        ]
      },
      {
        "heading": "Choosing components and interpretation",
        "items": [
          "**Scree plot**: eigenvalues versus component number; look for the elbow. **Cumulative explained variance** curve: pick the smallest m reaching the target.",
          "**Loadings** (eigenvector entries) show how original features contribute; components are hard to interpret and mix features.",
          "Components are not guaranteed to be good for prediction: high variance does not mean high class separation (supervised alternatives: LDA)."
        ]
      },
      {
        "heading": "Limitations and relatives",
        "items": [
          "Linear only; sensitive to scaling and outliers; assumes variance is information; loses original feature meaning; centring/scaling must come from training data only.",
          "Non-linear / visualisation methods: t-SNE, UMAP (preserve local neighbourhoods; not for new data pipelines or distances), kernel PCA, autoencoders.",
          "Contrast with **feature selection**, which keeps a subset of original features, while PCA builds new ones."
        ]
      },
      {
        "heading": "Why PCA, and how it works",
        "items": [
          "**PCA** (principal component analysis) replaces many features with a few new ones that keep most of the variation.",
          "Uses: **plotting** in 2 or 3 dimensions, **compressing** data, and merging features that repeat each other. It can throw away useful information.",
          "**PC1** is the direction along which the data varies most. **PC2** is at right angles to it, with the next most. Each new feature is a **component**.",
          "Each example's position along a component is its **score**. The **loadings** say how much each original feature contributes to a component. A component's sign can flip without meaning anything.",
          {
            "type": "p",
            "text": "Choosing how many"
          },
          "**Explained variance** is the share of the variation each component keeps. A **scree plot** shows it per component; add them up for the total kept.",
          "Keep enough to reach a chosen share, or pick the number that gives the best model on validation data.",
          "High variance does not mean useful for prediction."
        ]
      },
      {
        "heading": "PCA in practice and its limits",
        "items": [
          "scikit-learn centres the data but does **not** scale it, so features with big numbers can dominate. Decide on scaling from what the measurements mean.",
          "`PCA(n_components=0.90)` after `StandardScaler` keeps enough components for 90% of the variance. Fit on training data only.",
          "For mostly-zero data, `TruncatedSVD` is a similar method that avoids centring.",
          "**Limits**: only finds straight directions, ignores the classes, components are hard to explain, and outliers change them.",
          "**With clustering**: PCA first can remove noise but may also remove the structure. Or cluster first and use PCA only to draw it. Compare both.",
          "**Mistakes**: fitting PCA before splitting; treating a 2-D plot as proof (it can distort distances)."
        ]
      }
    ],
    "pitfalls": [
      "Forgetting to centre / standardise the data first.",
      "Dividing by n instead of n-1 inconsistently when computing covariance (state your convention).",
      "Reporting eigenvalues as percentages without dividing by their sum.",
      "Fitting PCA on the full dataset before the train/test split (leakage).",
      "Claiming principal components are interpretable original features."
    ]
  }
];
