module.exports = [
{
  id: 'm-purity-rand', topicId: 'cluster-hypothesis-evaluation', title: 'Compute purity and Rand index for a clustering',
  when: 'Given clusters and gold-standard classes (the lecture figure: 17 points, 3 clusters, classes x, o, diamond)',
  mnemonic: 'Purity = majority counts over N; Rand = right pair decisions over all pairs',
  steps: [
    '1. Tabulate, for each cluster, how many members belong to each class.',
    '2. Purity: take the largest count in each cluster, add them, divide by N.',
    '3. Pairs: total pairs = N(N-1)/2.',
    '4. TP + FP = Σ over clusters of C(cluster size, 2) (same-cluster pairs).',
    '5. TP = Σ over cluster-class cells of C(count, 2) (same cluster and same class); FP = (TP + FP) - TP.',
    '6. FN = Σ over classes of C(class size, 2) minus TP; TN = total - TP - FP - FN.',
    '7. Rand index = (TP + TN) / total pairs.'
  ],
  example: {
    problem: 'Cluster 1 = 5 x + 1 o; cluster 2 = 1 x + 4 o + 1 diamond; cluster 3 = 2 x + 3 diamond (N = 17).',
    solution: [
      'Purity = (5 + 4 + 3)/17 = 12/17 = 0.71.',
      'Total pairs = 17 x 16 / 2 = 136. Same-cluster pairs: C(6,2) + C(6,2) + C(5,2) = 15 + 15 + 10 = 40 = TP + FP.',
      'TP = C(5,2) + C(4,2) + C(3,2) + C(2,2) = 10 + 6 + 3 + 1 = 20 (x in cluster 1, o in cluster 2, diamonds in cluster 3, x in cluster 3). FP = 40 - 20 = 20.',
      'Same-class pairs: x (8 members) C(8,2) = 28; o (5) 10; diamond (4) 6; total 44. FN = 44 - 20 = 24.',
      'TN = 136 - 20 - 20 - 24 = 72. Rand index = (20 + 72)/136 = 92/136 = 0.68.'
    ]
  }
}
];
