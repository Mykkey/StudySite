module.exports = [
{
  id: 'regularisation', title: 'Regularisation: L1, L2, dropout, early stopping, data augmentation',
  priority: 10, tier: 'core', freq: 'est. high', marks: '8-12 marks',
  summary: '**Regularisation trades a little training fit for lower variance: L2 shrinks weights, L1 makes them sparse, dropout randomly silences units during training, early stopping halts when validation loss stops improving; strength is chosen on validation data.**',
  mnemonic: 'Shrink (L2), Sparse (L1), Skip units (dropout), Stop early',
  source: ['CT4101_Notes_05_Linear_Logistic_Regression', 'CT4101_Notes_09_Neural_Networks', 'CT4101_Notes_10_Deep_Learning_Applications'],
  sections: [
    { heading: 'Why', items: [
      'Overfitting = high variance: the model uses its freedom to fit noise. Regularisation **restricts effective complexity** to improve generalisation.',
      'It also stabilises coefficients under multicollinearity and (L1) gives feature selection.'
    ]},
    { heading: 'L2 (Ridge / weight decay)', items: [
      { type: 'formula', label: 'L2 penalised loss', text: 'J = Loss + lambda x sum_j w_j^2   (lambda >= 0 = strength; bias not penalised)' },
      'Gradient adds 2 lambda w, so each update multiplies weights by (1 - eta x 2 lambda): **weight decay**. Shrinks all weights smoothly, rarely to exactly zero; prefers many small weights; handles correlated features.',
      'In scikit-learn logistic regression and SVM, **C = 1/lambda**: small C = strong regularisation.'
    ]},
    { heading: 'L1 (Lasso)', items: [
      { type: 'formula', label: 'L1 penalised loss', text: 'J = Loss + lambda x sum_j |w_j|' },
      'Constant-size pull towards zero so many weights become **exactly 0**: sparse model, built-in feature selection, interpretable. With correlated features it picks one arbitrarily.',
      'Elastic Net = L1 + L2.',
      'Numeric comparison: w = (3, -2, 0.5): L2 term = 9 + 4 + 0.25 = 13.25; L1 term = 3 + 2 + 0.5 = 5.5. With lambda = 0.1 the penalties added to the loss are 1.325 (L2) and 0.55 (L1). L2 punishes the largest weight most; L1 pushes small weights like 0.5 all the way to zero.',
      'Both need **standardised features** (otherwise a feature is penalised just for its units) and lambda chosen by cross-validation.'
    ]},
    { heading: 'Dropout (neural networks)', items: [
      'During training each hidden unit is **dropped (set to 0) with probability p** (e.g. 0.2-0.5) at every mini-batch, giving a different thinned network each step.',
      'Prevents co-adaptation (units relying on specific partners) and acts like averaging an ensemble of many sub-networks.',
      'At prediction time dropout is **off** and activations are scaled consistently (inverted dropout scales kept units by 1/(1 - p) during training).',
      'Example: layer of 100 units, p = 0.5: about 50 active per step; kept units are multiplied by 2 during training.'
    ]},
    { heading: 'Early stopping', items: [
      'Monitor **validation loss** each epoch; stop when it has not improved for **patience** epochs and restore the weights of the best epoch. Cheap and effective; limits effective training time.',
      'Example (train / validation loss by epoch):',
      { type: 'table', head: ['Epoch', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], rows: [
        ['Train loss', '0.90', '0.60', '0.45', '0.35', '0.28', '0.22', '0.17', '0.13', '0.10', '0.08'],
        ['Val loss', '0.95', '0.70', '0.55', '0.48', '0.46', '0.47', '0.50', '0.55', '0.61', '0.68'] ] },
      'Best validation loss 0.46 at epoch 5. With patience = 2, epochs 6 (0.47) and 7 (0.50) fail to beat 0.46, so training stops at epoch 7 and the epoch-5 weights are restored.',
      { type: 'diagram', kind: 'line', caption: 'Training loss keeps falling while validation loss turns upward after epoch 5 (0.46): the overfitting point where early stopping restores the best weights.', data: {
        title: 'Early stopping', xLabel: 'Epoch', yLabel: 'Loss', yMin: 0, yMax: 1,
        series: [
          { name: 'Training loss', points: [[1, 0.90], [2, 0.60], [3, 0.45], [4, 0.35], [5, 0.28], [6, 0.22], [7, 0.17], [8, 0.13], [9, 0.10], [10, 0.08]] },
          { name: 'Validation loss', points: [[1, 0.95], [2, 0.70], [3, 0.55], [4, 0.48], [5, 0.46], [6, 0.47], [7, 0.50], [8, 0.55], [9, 0.61], [10, 0.68]] } ],
        points: [{ x: 5, y: 0.46, label: 'Best epoch 5' }] } }
    ]},
    { heading: 'Other techniques', items: [
      '**Data augmentation** (flips, crops, rotations, noise) enlarges the effective dataset; transformations must preserve the label.',
      '**More data**, simpler architecture, fewer parameters, **batch normalisation** (mild regulariser), **pruning** for trees, **bagging** for trees, feature selection, transfer learning with a frozen base.',
      'Hyperparameter choices (lambda, dropout rate, patience, depth) are tuned on validation folds, not the test set.'
    ]},
    { heading: 'Comparison', items: [
      { type: 'table', head: ['Technique', 'Where', 'Effect', 'Key setting'], rows: [
        ['L2 / weight decay', 'Linear models, NNs', 'Shrinks all weights', 'lambda (or C = 1/lambda)'],
        ['L1', 'Linear models, NNs', 'Sparse weights', 'lambda'],
        ['Dropout', 'NNs', 'Ensemble-like robustness', 'Drop probability p'],
        ['Early stopping', 'Iterative learners', 'Limits training time', 'Patience, monitored metric'],
        ['Augmentation', 'Images, audio, text', 'More varied data', 'Transform set'],
        ['Pruning / depth limit', 'Trees', 'Fewer splits', 'max_depth, ccp_alpha'] ] }
    ]},
    {"heading":"Lecture detail (Week 9): neural network regularisation","items":["**Early stopping** (5 steps): set aside validation data; train for successive epochs; monitor validation loss; stop after no improvement; restore the best weights (parameters from the best validation stage).","**L2 weight decay**: Loss_total = Loss_data + lambda x sum of squared weights (\"charge a small fee for big weights\"); encourages smaller, distributed weights; too little has limited effect, too much underfits; input scaling remains important.","**Dropout**: training uses a randomly thinned network for each mini-batch; inference uses the full network with appropriate activation scaling. Purpose: reduce co-adaptation and give stochastic regularisation. Lecture analogy: each hidden neuron has (for example) a 40% chance of being turned off, so no neuron can rely on particular partners and knowledge spreads across the whole team; when the network is used for real everyone is switched back on.","Data and capacity: some regularisation problems are data problems: more representative data (reduces variance), a smaller network (fewer parameters), better features (signal-to-noise), task-aware augmentation (plausible variants for images, audio or text, not arbitrary tabular rows).","Validation leakage in NNs: architecture search (layers and widths are hyperparameters), training choices (epoch count, learning rate, regularisation chosen on validation), final test opened only after the whole workflow is fixed."]}
  ],
  pitfalls: [
    'Applying L1/L2 to unscaled features.',
    'Leaving dropout on at test time.',
    'Setting lambda by test-set performance.',
    'Saying L2 produces exactly sparse models (that is L1).',
    'Using too strong a penalty and creating underfitting (high bias).'
  ]
},
{
  id: 'cnn', title: 'Convolutional neural networks, pooling and transfer learning',
  priority: 15, tier: 'likely', freq: 'est. medium', marks: '8-12 marks',
  summary: '**CNNs exploit image structure with small shared filters (local connectivity + weight sharing) that produce feature maps, pooling that shrinks them, and a dense head; transfer learning reuses a pretrained base via feature extraction or fine-tuning.**',
  mnemonic: 'Conv finds, Pool shrinks, Dense decides',
  source: ['CT4101_Notes_10_Deep_Learning_Applications'],
  sections: [
    { heading: 'Why CNNs for images', items: [
      'An image is a grid of numbers: greyscale = one table; colour = three channels (RGB). A 224 x 224 RGB image has 150,528 inputs.',
      'A fully connected layer on flattened pixels loses spatial structure, needs enormous weights (150,528 inputs x 100 units = 15 million), and ignores that a pattern (an edge, an eye) is the same wherever it appears.',
      'CNN ideas: **local connectivity** (each unit sees a small patch), **weight sharing** (one filter slid over the whole image: learn once, reuse everywhere), **translation equivariance**, far fewer parameters.'
    ]},
    { heading: 'Convolution', items: [
      'A **filter (kernel)**, e.g. 3x3, slides across the input; at each position it computes the dot product of kernel and patch (plus bias) giving one value of the **feature map**. Large magnitude = pattern present. The filter values are learned.',
      'A conv layer has many filters (e.g. 32 or 64), each producing a feature map; the output is a stack of maps. Input channels must match the kernel depth.',
      { type: 'formula', label: 'Output size', text: 'O = (N + 2P - K) / S + 1   (N input size, K kernel size, P padding, S stride; floor if not an integer)' },
      '**Stride** = step size (stride 2 halves the resolution). **Padding**: "valid" = none (output shrinks); "same" = zero-pad so output size equals input size at stride 1.',
      'Examples: N = 5, K = 3, P = 0, S = 1 gives O = 3; with P = 1 gives O = 5 (same); N = 5, K = 3, S = 2, P = 0 gives O = 2.',
      { type: 'formula', label: 'Conv layer parameters', text: 'params = (K x K x C_in + 1) x C_out   (+1 = bias per filter)' },
      'Example: 3x3 filters on a 32x32x3 image, 16 filters: (3 x 3 x 3 + 1) x 16 = 448 parameters; same-padding output 32x32x16.',
      'Hierarchy of features: early layers detect edges and colours, middle layers textures and parts, deep layers whole objects.'
    ]},
    { heading: 'Worked convolution', items: [
      'Input I = [[1,2,0],[0,1,3],[2,1,0]], kernel K = [[1,0],[0,-1]], stride 1, no padding, so output is 2x2.',
      'O(0,0) = 1(1) + 2(0) + 0(0) + 1(-1) = 0 ; O(0,1) = 2(1) + 0(0) + 1(0) + 3(-1) = -1 ; O(1,0) = 0(1) + 1(0) + 2(0) + 1(-1) = -1 ; O(1,1) = 1(1) + 3(0) + 1(0) + 0(-1) = 1.',
      'Feature map [[0,-1],[-1,1]]. Apply ReLU: [[0,0],[0,1]]. 2x2 max-pool gives a single value 1.'
    ]},
    { heading: 'Pooling and architecture', items: [
      '**Pooling** (max or average, e.g. 2x2 stride 2) summarises local regions: halves height and width, reduces computation, gives small translation invariance, has no learned weights. Max pooling keeps the strongest response; **global average pooling** collapses each map to one number before the classifier.',
      'Typical stack: [Conv -> ReLU -> Pool] repeated (the **convolutional base**), then flatten / global average pool, then dense layers + softmax (the **classification head**).',
      'Shape example: 32x32x3 input, Conv 3x3 same with 16 filters gives 32x32x16, Max-pool 2x2 gives 16x16x16, Conv with 32 filters then pool gives 8x8x32, flatten 2048, dense 10 + softmax.'
    ]},
    { heading: 'Transfer learning', items: [
      'Reuse a network **pretrained** on a large dataset (e.g. ImageNet; MobileNet, ResNet) because early features are generic. Needs far less data and training time.',
      '**Feature extraction**: freeze the pretrained base, train only a new head. Use when the new dataset is small or similar to the original.',
      '**Fine-tuning**: unfreeze some top layers and train them with a **very small learning rate**. Use with more data or when the domain differs; risk of overfitting and of damaging pretrained weights.',
      'Match the pretrained model\'s input size and preprocessing; keep batch-norm layers in inference mode when frozen; compare with a classical baseline.'
    ]},
    { heading: 'Augmentation, evaluation and use', items: [
      'Augmentation: flips, small rotations, crops, brightness changes; invalid transformations (flipping digits or text) break labels.',
      'Evaluate with class-level errors (confusion matrix), robustness checks, calibration and confidence, not accuracy alone; inspect failure cases (background cues, spurious correlations).',
      'Applications: image classification, object detection, segmentation, medical imaging, also 1D convolutions for audio and text.',
      'Deep learning is appropriate when data are unstructured and plentiful, performance gains justify cost, and misuse can be monitored; otherwise prefer simpler models.'
    ]},
    {"heading":"Lecture detail and worked examples (Week 10)","items":["Where deep learning adds value: architecture should exploit data structure. Images (local spatial patterns, repeated visual features, hierarchical structure), language and audio (sequential context, reusable representations, large-scale pretraining), multimodal systems (text, vision, audio in shared models). Most convincing when architecture or pretrained representation matches the data structure.","Images as numbers: each pixel is a light intensity 0-255 (0 = no light, 255 = white); greyscale = a table (rank-2 tensor), colour = three channels (rank-3 tensor, height x width x 3); 224 x 224 x 3 = 150,528 numbers.","**Dense layer worked example**: first layer with 1,000 units on a 224 x 224 RGB image: inputs 150,528; weights 150,528 x 1,000 = 150,528,000; plus 1,000 biases = **150,529,000** parameters. Flattening (28 x 28 into 784 numbers) loses neighbourhoods: the pixel below now sits 28 places away.","Three problems of dense nets on images: **parameter explosion**, loss of **spatial structure**, no **translation** reuse (a vertical line or circle appearing in different places should be \"learned once and used again and again\"). CNN fix: **local connectivity** (each neuron looks at a small patch such as 3 x 3, nearby pixels matter most) plus **weight sharing** (the same small filter reused at every position; a 3 x 3 filter has 9 weights whatever the image size).","A convolutional filter is a small square matrix of numbers; a convolutional layer is one or more filters; choosing the numbers carefully detects different image features. Convolution = slide, multiply element-wise, sum; each output value measures how well that patch matches the pattern.","**Worked convolution** (5 x 5 binary image, 3 x 3 kernel [[1,0,1],[0,1,0],[1,0,1]], stride 1, no padding): image rows 11100 / 01110 / 00111 / 00110 / 01100. Position 1 (row 1, col 1) = 1x1 + 1x0 + 1x1 + 0x0 + 1x1 + 1x0 + 0x1 + 0x0 + 1x1 = 4. Full feature map (3 x 3): [[4,3,4],[2,4,3],[2,3,4]] using the same 9 weights at every position (weight sharing).","**Stride and padding example** (3 x 3 window summing the ones): stride 1 gives 3 x 3 output [[6,7,6],[4,7,7],[4,6,6]] (9 stops); stride 2 gives 2 x 2 output [[6,6],[4,6]] (4 stops); larger stride = smaller feature map, less compute, lower spatial resolution. Padding 1 turns the 5 x 5 input into 7 x 7 so the output is 5 x 5 (\"same\", [[3,5,5,3,1],[3,6,7,6,3],[1,4,7,7,4],[1,4,6,6,3],[1,3,4,3,1]]); without padding the window cannot centre on edge pixels. Valid padding = no border, output shrinks; same padding = pad so stride 1 preserves height and width.","Output size O = (N + 2P - K)/S + 1 (valid convolution with P = 0: floor((N - K)/S) + 1). Slide table: N=5,K=3,P=0,S=1 gives 3; N=5,K=3,P=1,S=1 gives 5 (same); N=5,K=3,P=0,S=2 gives 2; N=224,K=7,P=3,S=2 gives 112.","**Pooling worked example**: 4 x 4 feature map rows 1 3 2 1 / 4 6 5 0 / 3 1 1 0 / 1 2 8 4. Max 2 x 2 gives [[6,5],[3,8]]; average 2 x 2 gives [[3.5,2],[1.75,3.25]]. Purpose: reduce computation and add limited local shift tolerance; trade-off: spatial detail discarded; alternatives: strided convolution or global average pooling.","Compact CNN: input image, Conv + ReLU, max pooling, Conv + ReLU, global average pool, dense output. Three parts: convolutional base (learns spatial feature maps), pooling / reduction (controls representation size), classification head (maps features to outputs). Channels: each filter spans all input channels and produces one output channel; 32 x 32 x 3 input with 32 filters of 3 x 3 x 3 gives 32 x 32 x 32 feature maps; each filter uses the same weights at every location.","Hierarchy: pixels, edges, textures, parts, objects; early layers respond to simple local contrasts, deeper layers combine them into larger receptive fields.","Trace tensor shapes (slide): input 32x32x3; Conv2D 32 filters same: 32x32x32; MaxPool 2x2: 16x16x32; Conv2D 64 filters same: 16x16x64; MaxPool 2x2: 8x8x64; GlobalAveragePooling: 64; Dense 10 classes: 10. Shape reasoning catches architecture errors early.","Keras: `Sequential([Input((32,32,3)), Rescaling(1./255), Conv2D(32, 3, padding=\"same\", activation=\"relu\"), MaxPooling2D(), Conv2D(64, 3, ...), MaxPooling2D(), GlobalAveragePooling2D(), Dense(10, activation=\"softmax\")])`, compile with Adam and `sparse_categorical_crossentropy` (integer multiclass labels). Evaluate with validation loss, class errors, protected test evidence.","Augmentation: small translations, flips, crops, rotations, colour changes when they preserve the label; applied to training examples only, not evaluation data; invalid transformations create label noise or unrealistic examples; assumptions must follow the application. Evaluate more than accuracy: class-level errors (confusion matrix, per-class precision / recall, representative failures), robustness (lighting, orientation, background, acquisition device, distribution shift), confidence (calibration and abstention for high-stakes use).","Transfer learning workflow (6 steps): load pretrained base; remove the old task head; freeze the base; add a new head; train the head; optionally fine-tune. The pretrained network supplies reusable visual features; the new head maps them to project classes. **Feature extraction** = freeze base, train only a new head (fast, stable, suits limited data or similar domains). **Fine-tuning** = unfreeze selected upper layers, continue at a low learning rate (more adaptable but easier to overfit or damage useful weights).","Fine-tuning safely (change one stage at a time): train frozen head; confirm convergence; unfreeze top layers; **recompile** (changes to trainable weights must be reflected by the optimiser); low learning rate; monitor validation; stop early (overfits quickly on small data); batch normalisation needs particular care.","MobileNetV2 example: `MobileNetV2(input_shape=(160,160,3), include_top=False, weights=\"imagenet\")` (include_top=False discards the ImageNet classifier), `base.trainable = False`, `preprocess_input`, `base(x, training=False)` (keeps BatchNorm stable), GlobalAveragePooling2D, Dropout(0.2), Dense(n_classes, softmax). Appropriate: limited labelled data, related source domain, suitable input format; poorer fit: very different image statistics, specialised modalities or features absent from pretraining. Compare frozen-base, fine-tuned and simpler baselines under one protocol.","Application patterns: vision (classification, detection, segmentation), language (classification, retrieval, generation), audio (speech recognition, tagging, synthesis), healthcare (imaging support, signal analysis), robotics (perception and control), science (protein, weather, material modelling).","**Foundation models**: broad data (text, images, audio, code, multimodal) and large-scale pretraining give a reusable representation adapted to downstream tasks by prompting, feature extraction, fine-tuning or retrieval; not task-complete (evaluation, safety and domain integration still needed). Task-specific training = collect labelled data, choose architecture, train for one task; pretrain-then-adapt = start from a broad model and adapt or prompt. Reuse lowers the barrier to strong capabilities but can import unknown data, bias, security and governance risks.","When is deep learning appropriate (6 questions): data (enough relevant data or a suitable pretrained model?), structure (does the architecture exploit image, sequence or multimodal structure?), compute (training and deployment cost and latency?), baseline (does it beat simpler validated models?), risk (can errors, shifts, misuse be monitored?), value (does the improvement matter?). Five-minute design activity: modality and task; structure to exploit; scratch vs pretrained; baseline to beat; failure slices and resource constraints."]}
  ],
  pitfalls: [
    'Forgetting the +1 bias per filter or the input-channel depth in parameter counts.',
    'Applying the output formula without padding on both sides (the 2P term).',
    'Saying pooling has learned parameters.',
    'Fine-tuning with a large learning rate (destroys pretrained features).',
    'Flipping or cropping augmentations that change the label.'
  ]
},
{
  id: 'sequence-models', title: 'Sequence models: RNN, LSTM, attention and transformers (basics)',
  priority: 21, tier: 'low', freq: 'est. low (RNN/LSTM/transformer detail is NOT in the lecture slides; only language and audio are named as application areas)', marks: '4-8 marks',
  summary: '**RNNs process sequences step by step with a hidden state (and suffer vanishing gradients); LSTMs add gates; transformers replace recurrence with self-attention, softmax(QK^T / sqrt(d)) V, enabling parallel training and large pretrained models.**',
  mnemonic: 'RNN remembers, LSTM gates, Transformer attends',
  source: ['CT4101_Notes_10_Deep_Learning_Applications', 'CT4101_Notes_01_Intro_to_ML', 'CT4101_Notes_12_Integration_Communication_Case_Studies'],
  sections: [
    { heading: 'Sequential data and RNNs', items: [
      '**Beyond the slides**: the Week 10 deck only lists language / audio / multimodal as application areas and foundation models; the RNN, LSTM and attention detail below is general background in case it is asked, not lecturer-specific.',
      'Sequence data (text, speech, time series) has order and variable length; feed-forward nets and CNNs do not model order dependence directly.',
      { type: 'formula', label: 'RNN step', text: 'h_t = tanh( W_x x_t + W_h h_(t-1) + b ) ;  y_t = W_y h_t   (same weights shared across time steps; h_t = hidden state memory)' },
      'Trained by **backpropagation through time** (unrolling the network). Long sequences: gradients are multiplied many times, so they **vanish** (cannot learn long-range dependencies) or **explode** (clip gradients).',
      'Patterns: many-to-one (sentiment), one-to-many (captioning), many-to-many (translation, tagging).'
    ]},
    { heading: 'LSTM and GRU', items: [
      '**LSTM** adds a **cell state** (a protected memory path) controlled by gates: **forget gate** (what to erase), **input gate** (what to write), **output gate** (what to expose). Gates are sigmoid units (0 to 1) multiplying information; additive cell-state updates ease gradient flow.',
      '**GRU**: simplified gated unit with update and reset gates, fewer parameters.',
      'Still sequential (hard to parallelise) and limited over very long ranges.'
    ]},
    { heading: 'Attention and transformers', items: [
      'Attention lets each position look at all others and weight them by relevance.',
      { type: 'formula', label: 'Scaled dot-product attention', text: 'Attention(Q, K, V) = softmax( Q K^T / sqrt(d_k) ) V   (Q queries, K keys, V values; d_k key dimension, scaling prevents saturated softmax)' },
      'Example: scores for one query against three keys = [2, 1, 0.1], d_k = 4 so divide by 2 giving [1, 0.5, 0.05]; softmax = [0.502, 0.304, 0.194]; the output is that weighted mix of the value vectors.',
      '**Self-attention** + **positional encoding** (order information) + feed-forward layers + residual connections + layer normalisation + multi-head attention make a **transformer**. Processes all tokens in parallel (fast training on GPUs), captures long-range dependencies.',
      'Cost: attention is quadratic in sequence length; needs a lot of data and compute.',
      'Pretrain on huge unlabelled corpora then adapt (fine-tune, prompt): **foundation models** / large language models; the same transfer idea as CNN pretraining.'
    ]},
    { heading: 'Applications and cautions', items: [
      'Text classification, translation, summarisation, speech recognition and tagging, time-series forecasting, code and multimodal models (vision-language).',
      'Cautions: hallucination, bias in training data, privacy and copyright, high energy cost, evaluation difficulty, need for human oversight; always compare with a simple baseline.'
    ]}
  ],
  pitfalls: [
    'Saying RNN weights differ at each time step (they are shared).',
    'Forgetting the sqrt(d_k) scaling in attention.',
    'Claiming transformers have no notion of order (they need positional encodings).',
    'Calling an LSTM gate a hard switch (it is a smooth 0-1 multiplier).'
  ]
}
];
