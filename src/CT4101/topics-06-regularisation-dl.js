module.exports = [
  {
    "id": "regularisation",
    "title": "Regularisation: L1, L2, dropout, early stopping, data augmentation",
    "priority": 10,
    "tier": "core",
    "freq": "est. high",
    "marks": "8-12 marks",
    "summary": "**Regularisation trades a little training fit for lower variance: L2 shrinks weights, L1 makes them sparse, dropout randomly silences units during training, early stopping halts when validation loss stops improving; strength is chosen on validation data.**",
    "mnemonic": "Shrink (L2), Sparse (L1), Skip units (dropout), Stop early",
    "source": [
      "CT4101_Notes_05_Linear_Logistic_Regression",
      "CT4101_Notes_09_Neural_Networks",
      "CT4101_Notes_10_Deep_Learning_Applications"
    ],
    "sections": [
      {
        "heading": "Why",
        "items": [
          "Overfitting = high variance: the model uses its freedom to fit noise. Regularisation **restricts effective complexity** to improve generalisation.",
          "It also stabilises coefficients under multicollinearity and (L1) gives feature selection."
        ]
      },
      {
        "heading": "L2 (Ridge / weight decay)",
        "items": [
          {
            "type": "formula",
            "label": "L2 penalised loss",
            "text": "J = Loss + lambda x sum_j w_j^2   (lambda >= 0 = strength; bias not penalised)"
          },
          "Gradient adds 2 lambda w, so each update multiplies weights by (1 - eta x 2 lambda): **weight decay**. Shrinks all weights smoothly, rarely to exactly zero; prefers many small weights; handles correlated features.",
          "In scikit-learn logistic regression and SVM, **C = 1/lambda**: small C = strong regularisation."
        ]
      },
      {
        "heading": "L1 (Lasso)",
        "items": [
          {
            "type": "formula",
            "label": "L1 penalised loss",
            "text": "J = Loss + lambda x sum_j |w_j|"
          },
          "Constant-size pull towards zero so many weights become **exactly 0**: sparse model, built-in feature selection, interpretable. With correlated features it picks one arbitrarily.",
          "Elastic Net = L1 + L2.",
          "Numeric comparison: w = (3, -2, 0.5): L2 term = 9 + 4 + 0.25 = 13.25; L1 term = 3 + 2 + 0.5 = 5.5. With lambda = 0.1 the penalties added to the loss are 1.325 (L2) and 0.55 (L1). L2 punishes the largest weight most; L1 pushes small weights like 0.5 all the way to zero.",
          "Both need **standardised features** (otherwise a feature is penalised just for its units) and lambda chosen by cross-validation."
        ]
      },
      {
        "heading": "Dropout (neural networks)",
        "items": [
          "During training each hidden unit is **dropped (set to 0) with probability p** (e.g. 0.2-0.5) at every mini-batch, giving a different thinned network each step.",
          "Prevents co-adaptation (units relying on specific partners) and acts like averaging an ensemble of many sub-networks.",
          "At prediction time dropout is **off** and activations are scaled consistently (inverted dropout scales kept units by 1/(1 - p) during training).",
          "Example: layer of 100 units, p = 0.5: about 50 active per step; kept units are multiplied by 2 during training."
        ]
      },
      {
        "heading": "Early stopping",
        "items": [
          "Monitor **validation loss** each epoch; stop when it has not improved for **patience** epochs and restore the weights of the best epoch. Cheap and effective; limits effective training time.",
          "Example (train / validation loss by epoch):",
          {
            "type": "table",
            "head": [
              "Epoch",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10"
            ],
            "rows": [
              [
                "Train loss",
                "0.90",
                "0.60",
                "0.45",
                "0.35",
                "0.28",
                "0.22",
                "0.17",
                "0.13",
                "0.10",
                "0.08"
              ],
              [
                "Val loss",
                "0.95",
                "0.70",
                "0.55",
                "0.48",
                "0.46",
                "0.47",
                "0.50",
                "0.55",
                "0.61",
                "0.68"
              ]
            ]
          },
          "Best validation loss 0.46 at epoch 5. With patience = 2, epochs 6 (0.47) and 7 (0.50) fail to beat 0.46, so training stops at epoch 7 and the epoch-5 weights are restored.",
          {
            "type": "diagram",
            "kind": "line",
            "caption": "Training loss keeps falling while validation loss turns upward after epoch 5 (0.46): the overfitting point where early stopping restores the best weights.",
            "data": {
              "title": "Early stopping",
              "xLabel": "Epoch",
              "yLabel": "Loss",
              "yMin": 0,
              "yMax": 1,
              "series": [
                {
                  "name": "Training loss",
                  "points": [
                    [
                      1,
                      0.9
                    ],
                    [
                      2,
                      0.6
                    ],
                    [
                      3,
                      0.45
                    ],
                    [
                      4,
                      0.35
                    ],
                    [
                      5,
                      0.28
                    ],
                    [
                      6,
                      0.22
                    ],
                    [
                      7,
                      0.17
                    ],
                    [
                      8,
                      0.13
                    ],
                    [
                      9,
                      0.1
                    ],
                    [
                      10,
                      0.08
                    ]
                  ]
                },
                {
                  "name": "Validation loss",
                  "points": [
                    [
                      1,
                      0.95
                    ],
                    [
                      2,
                      0.7
                    ],
                    [
                      3,
                      0.55
                    ],
                    [
                      4,
                      0.48
                    ],
                    [
                      5,
                      0.46
                    ],
                    [
                      6,
                      0.47
                    ],
                    [
                      7,
                      0.5
                    ],
                    [
                      8,
                      0.55
                    ],
                    [
                      9,
                      0.61
                    ],
                    [
                      10,
                      0.68
                    ]
                  ]
                }
              ],
              "points": [
                {
                  "x": 5,
                  "y": 0.46,
                  "label": "Best epoch 5"
                }
              ]
            }
          }
        ]
      },
      {
        "heading": "Other techniques",
        "items": [
          "**Data augmentation** (flips, crops, rotations, noise) enlarges the effective dataset; transformations must preserve the label.",
          "**More data**, simpler architecture, fewer parameters, **batch normalisation** (mild regulariser), **pruning** for trees, **bagging** for trees, feature selection, transfer learning with a frozen base.",
          "Hyperparameter choices (lambda, dropout rate, patience, depth) are tuned on validation folds, not the test set."
        ]
      },
      {
        "heading": "Comparison",
        "items": [
          {
            "type": "table",
            "head": [
              "Technique",
              "Where",
              "Effect",
              "Key setting"
            ],
            "rows": [
              [
                "L2 / weight decay",
                "Linear models, NNs",
                "Shrinks all weights",
                "lambda (or C = 1/lambda)"
              ],
              [
                "L1",
                "Linear models, NNs",
                "Sparse weights",
                "lambda"
              ],
              [
                "Dropout",
                "NNs",
                "Ensemble-like robustness",
                "Drop probability p"
              ],
              [
                "Early stopping",
                "Iterative learners",
                "Limits training time",
                "Patience, monitored metric"
              ],
              [
                "Augmentation",
                "Images, audio, text",
                "More varied data",
                "Transform set"
              ],
              [
                "Pruning / depth limit",
                "Trees",
                "Fewer splits",
                "max_depth, ccp_alpha"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Regularising neural networks in practice",
        "items": [
          "**Regularisation** means anything that stops the network memorising the training data.",
          {
            "type": "p",
            "text": "Early stopping"
          },
          "**1.** Set aside validation data. **2.** Train epoch by epoch. **3.** Watch the validation loss. **4.** Stop when it has not improved for a while. **5.** Go back to the best weights.",
          {
            "type": "p",
            "text": "L2 weight decay"
          },
          "Add to the loss: lambda x the sum of squared weights, a small fee for big weights. Too little lambda does little, too much underfits. Still scale the inputs.",
          {
            "type": "p",
            "text": "Dropout"
          },
          "During training, each hidden neuron is switched off at random (say a 40% chance) for each batch. No neuron can rely on a particular partner, so knowledge spreads out. When the network is used for real, every neuron is on and outputs are scaled to match.",
          {
            "type": "p",
            "text": "Sometimes the problem is the data"
          },
          "Get more representative data, use a smaller network, build better features, or **augment** (make realistic variants of images, audio or text, not random table rows).",
          "**Validation leakage**: layers, widths, epochs, learning rate and regularisation are all chosen on validation data, so open the test set only when all of these are fixed."
        ]
      }
    ],
    "pitfalls": [
      "Applying L1/L2 to unscaled features.",
      "Leaving dropout on at test time.",
      "Setting lambda by test-set performance.",
      "Saying L2 produces exactly sparse models (that is L1).",
      "Using too strong a penalty and creating underfitting (high bias)."
    ]
  },
  {
    "id": "cnn",
    "title": "Convolutional neural networks, pooling and transfer learning",
    "priority": 15,
    "tier": "likely",
    "freq": "est. medium",
    "marks": "8-12 marks",
    "summary": "**CNNs exploit image structure with small shared filters (local connectivity + weight sharing) that produce feature maps, pooling that shrinks them, and a dense head; transfer learning reuses a pretrained base via feature extraction or fine-tuning.**",
    "mnemonic": "Conv finds, Pool shrinks, Dense decides",
    "source": [
      "CT4101_Notes_10_Deep_Learning_Applications"
    ],
    "sections": [
      {
        "heading": "Why CNNs for images",
        "items": [
          "An image is a grid of numbers: greyscale = one table; colour = three channels (RGB). A 224 x 224 RGB image has 150,528 inputs.",
          "A fully connected layer on flattened pixels loses spatial structure, needs enormous weights (150,528 inputs x 100 units = 15 million), and ignores that a pattern (an edge, an eye) is the same wherever it appears.",
          "CNN ideas: **local connectivity** (each unit sees a small patch), **weight sharing** (one filter slid over the whole image: learn once, reuse everywhere), **translation equivariance**, far fewer parameters."
        ]
      },
      {
        "heading": "Convolution",
        "items": [
          "A **filter (kernel)**, e.g. 3x3, slides across the input; at each position it computes the dot product of kernel and patch (plus bias) giving one value of the **feature map**. Large magnitude = pattern present. The filter values are learned.",
          "A conv layer has many filters (e.g. 32 or 64), each producing a feature map; the output is a stack of maps. Input channels must match the kernel depth.",
          {
            "type": "formula",
            "label": "Output size",
            "text": "O = (N + 2P - K) / S + 1   (N input size, K kernel size, P padding, S stride; floor if not an integer)"
          },
          "**Stride** = step size (stride 2 halves the resolution). **Padding**: \"valid\" = none (output shrinks); \"same\" = zero-pad so output size equals input size at stride 1.",
          "Examples: N = 5, K = 3, P = 0, S = 1 gives O = 3; with P = 1 gives O = 5 (same); N = 5, K = 3, S = 2, P = 0 gives O = 2.",
          {
            "type": "formula",
            "label": "Conv layer parameters",
            "text": "params = (K x K x C_in + 1) x C_out   (+1 = bias per filter)"
          },
          "Example: 3x3 filters on a 32x32x3 image, 16 filters: (3 x 3 x 3 + 1) x 16 = 448 parameters; same-padding output 32x32x16.",
          "Hierarchy of features: early layers detect edges and colours, middle layers textures and parts, deep layers whole objects."
        ]
      },
      {
        "heading": "Worked convolution",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Compute the feature map, apply ReLU, then 2×2 max pooling."
            ]
          },
          "Input I = [[1,2,0],[0,1,3],[2,1,0]], kernel K = [[1,0],[0,-1]], stride 1, no padding, so output is 2x2.",
          "O(0,0) = 1(1) + 2(0) + 0(0) + 1(-1) = 0 ; O(0,1) = 2(1) + 0(0) + 1(0) + 3(-1) = -1 ; O(1,0) = 0(1) + 1(0) + 2(0) + 1(-1) = -1 ; O(1,1) = 1(1) + 3(0) + 1(0) + 0(-1) = 1.",
          "Feature map [[0,-1],[-1,1]]. Apply ReLU: [[0,0],[0,1]]. 2x2 max-pool gives a single value 1."
        ]
      },
      {
        "heading": "Pooling and architecture",
        "items": [
          "**Pooling** (max or average, e.g. 2x2 stride 2) summarises local regions: halves height and width, reduces computation, gives small translation invariance, has no learned weights. Max pooling keeps the strongest response; **global average pooling** collapses each map to one number before the classifier.",
          "Typical stack: [Conv -> ReLU -> Pool] repeated (the **convolutional base**), then flatten / global average pool, then dense layers + softmax (the **classification head**).",
          "Shape example: 32x32x3 input, Conv 3x3 same with 16 filters gives 32x32x16, Max-pool 2x2 gives 16x16x16, Conv with 32 filters then pool gives 8x8x32, flatten 2048, dense 10 + softmax."
        ]
      },
      {
        "heading": "Transfer learning",
        "items": [
          "Reuse a network **pretrained** on a large dataset (e.g. ImageNet; MobileNet, ResNet) because early features are generic. Needs far less data and training time.",
          "**Feature extraction**: freeze the pretrained base, train only a new head. Use when the new dataset is small or similar to the original.",
          "**Fine-tuning**: unfreeze some top layers and train them with a **very small learning rate**. Use with more data or when the domain differs; risk of overfitting and of damaging pretrained weights.",
          "Match the pretrained model's input size and preprocessing; keep batch-norm layers in inference mode when frozen; compare with a classical baseline."
        ]
      },
      {
        "heading": "Augmentation, evaluation and use",
        "items": [
          "Augmentation: flips, small rotations, crops, brightness changes; invalid transformations (flipping digits or text) break labels.",
          "Evaluate with class-level errors (confusion matrix), robustness checks, calibration and confidence, not accuracy alone; inspect failure cases (background cues, spurious correlations).",
          "Applications: image classification, object detection, segmentation, medical imaging, also 1D convolutions for audio and text.",
          "Deep learning is appropriate when data are unstructured and plentiful, performance gains justify cost, and misuse can be monitored; otherwise prefer simpler models."
        ]
      },
      {
        "heading": "Images as numbers, and why dense layers fail on them",
        "items": [
          "Deep learning helps most when the network's design matches the shape of the data: images, sound, language.",
          "Each pixel is a brightness from 0 (black) to 255 (white). A grey image is a grid. A colour image has three grids (red, green, blue). 224 x 224 x 3 = 150,528 numbers.",
          "A **dense** layer links every input to every unit. With 1,000 units that is 150,528 x 1,000 weights + 1,000 biases = 150,529,000 parameters.",
          {
            "type": "p",
            "text": "Three problems"
          },
          "**Too many parameters.** **Layout is lost**: flattening a grid into one long list separates neighbouring pixels. **Nothing is reused**: a line learned in one place must be learned again elsewhere.",
          "A **CNN** (convolutional neural network) fixes this: each unit looks at a small patch (say 3 x 3), and the same small set of weights is reused everywhere. A 3 x 3 filter has 9 weights whatever the image size."
        ]
      },
      {
        "heading": "Convolution, step size and padding",
        "items": [
          "A **filter** (kernel) is a small grid of numbers. **Convolution**: lay it on a patch, multiply matching cells, add them up, slide along. A high result means the patch matches the pattern. The grid of results is the **feature map**.",
          "Example: 5 x 5 image with rows 11100, 01110, 00111, 00110, 01100 and filter rows 101, 010, 101. The first position gives 4, and the whole feature map is [[4,3,4],[2,4,3],[2,3,4]].",
          {
            "type": "p",
            "text": "Stride and padding"
          },
          "**Stride** is how far the window moves each step. A bigger stride gives a smaller output and less detail.",
          "**Padding** adds a border of zeros so the window can centre on edge pixels. **Valid** = no padding, output shrinks. **Same** = enough padding to keep the size (with stride 1).",
          "Adding up a 3 x 3 window on that image: stride 1 gives [[6,7,6],[4,7,7],[4,6,6]]; stride 2 gives [[6,6],[4,6]].",
          "Output size = (N + 2P - K)/S + 1, with N the input width, P padding, K filter width, S stride (round the division down).",
          "N=5, K=3: P=0, S=1 gives 3. P=1 gives 5. S=2 gives 2. N=224, K=7, P=3, S=2 gives 112."
        ]
      },
      {
        "heading": "Pooling, layers and shapes",
        "items": [
          "**Pooling** shrinks a feature map by summarising each small block. For rows 1321, 4650, 3110, 1284: 2 x 2 **max** pooling gives [[6,5],[3,8]] and **average** gives [[3.5,2],[1.75,3.25]].",
          "It saves work and tolerates small shifts, but loses detail.",
          "A small CNN: convolution + ReLU, pooling, convolution + ReLU, **global average pooling** (one average per feature map), then a dense output layer.",
          "Each filter spans all input channels and produces one output channel: 32 filters give 32 feature maps.",
          "Early layers find edges; deeper ones combine them into textures, parts and objects.",
          {
            "type": "p",
            "text": "Following the shapes"
          },
          "Input 32x32x3, 32 filters: 32x32x32, pool: 16x16x32, 64 filters: 16x16x64, pool: 8x8x64, global average: 64, output: 10 classes.",
          "In Keras (a Python library) those layers are stacked in `Sequential([...])` and trained with the Adam optimiser and `sparse_categorical_crossentropy` (the loss for classes given as numbers)."
        ]
      },
      {
        "heading": "Augmentation and what to check",
        "items": [
          "**Augmentation**: make extra training images by flipping, rotating, cropping or changing colour, only where the label stays true. Never on the test data.",
          "Look beyond accuracy: errors per class (confusion matrix, example failures), **robustness** (different lighting, angle, background, camera) and whether the confidence can be trusted."
        ]
      },
      {
        "heading": "Transfer learning",
        "items": [
          "**Transfer learning** reuses a network already trained on millions of images. The **base** is its feature-finding layers; the **head** is the final part that picks the class.",
          "**1.** Load the trained base. **2.** Remove its head. **3.** **Freeze** the base (its weights cannot change). **4.** Add your own head. **5.** Train the head. **6.** Optionally **fine-tune**.",
          "Training only the head (**feature extraction**) is fast and safe with little data. **Fine-tuning** unfreezes the top layers and trains them gently (low learning rate): more adaptable, easier to overfit or damage.",
          "Fine-tune one change at a time, recompile the model after unfreezing, and watch the validation loss. Take care with **batch normalisation** layers (they rescale values inside the network).",
          {
            "type": "p",
            "text": "Example: MobileNetV2"
          },
          "A small pretrained network. `include_top=False` drops its original head, `base.trainable = False` freezes it, then add pooling, dropout and a softmax layer for your classes.",
          "It suits limited data similar to ordinary photos, and suits very different images poorly. Compare it with simpler methods under the same test."
        ]
      },
      {
        "heading": "Where deep learning is used, and when to use it",
        "items": [
          "Uses: vision, language, audio, medical imaging, robotics and science (proteins, weather, materials).",
          "A **foundation model** is a very large model pretrained on broad data, then adapted by prompting, feature extraction, fine-tuning or giving it retrieved documents. It still needs testing and safety work, and can carry over unknown data, bias and security risks.",
          {
            "type": "p",
            "text": "Six questions before using deep learning"
          },
          "**Data**: enough, or a suitable pretrained model? **Structure**: does the design fit it? **Compute**: can you afford training and running it? **Baseline**: does it beat something simpler? **Risk**: can you monitor errors and misuse? **Value**: does the gain matter?"
        ]
      }
    ],
    "pitfalls": [
      "Forgetting the +1 bias per filter or the input-channel depth in parameter counts.",
      "Applying the output formula without padding on both sides (the 2P term).",
      "Saying pooling has learned parameters.",
      "Fine-tuning with a large learning rate (destroys pretrained features).",
      "Flipping or cropping augmentations that change the label."
    ]
  },
  {
    "id": "sequence-models",
    "title": "Sequence models: RNN, LSTM, attention and transformers (basics)",
    "priority": 21,
    "tier": "low",
    "freq": "est. low (RNN/LSTM/transformer detail is NOT in the lecture slides; only language and audio are named as application areas)",
    "marks": "4-8 marks",
    "summary": "**RNNs process sequences step by step with a hidden state (and suffer vanishing gradients); LSTMs add gates; transformers replace recurrence with self-attention, softmax(QK^T / sqrt(d)) V, enabling parallel training and large pretrained models.**",
    "mnemonic": "RNN remembers, LSTM gates, Transformer attends",
    "source": [
      "CT4101_Notes_10_Deep_Learning_Applications",
      "CT4101_Notes_01_Intro_to_ML",
      "CT4101_Notes_12_Integration_Communication_Case_Studies"
    ],
    "sections": [
      {
        "heading": "Sequential data and RNNs",
        "items": [
          "**Beyond the slides**: the Week 10 deck only lists language / audio / multimodal as application areas and foundation models; the RNN, LSTM and attention detail below is general background in case it is asked, not lecturer-specific.",
          "Sequence data (text, speech, time series) has order and variable length; feed-forward nets and CNNs do not model order dependence directly.",
          {
            "type": "formula",
            "label": "RNN step",
            "text": "h_t = tanh( W_x x_t + W_h h_(t-1) + b ) ;  y_t = W_y h_t   (same weights shared across time steps; h_t = hidden state memory)"
          },
          "Trained by **backpropagation through time** (unrolling the network). Long sequences: gradients are multiplied many times, so they **vanish** (cannot learn long-range dependencies) or **explode** (clip gradients).",
          "Patterns: many-to-one (sentiment), one-to-many (captioning), many-to-many (translation, tagging)."
        ]
      },
      {
        "heading": "LSTM and GRU",
        "items": [
          "**LSTM** adds a **cell state** (a protected memory path) controlled by gates: **forget gate** (what to erase), **input gate** (what to write), **output gate** (what to expose). Gates are sigmoid units (0 to 1) multiplying information; additive cell-state updates ease gradient flow.",
          "**GRU**: simplified gated unit with update and reset gates, fewer parameters.",
          "Still sequential (hard to parallelise) and limited over very long ranges."
        ]
      },
      {
        "heading": "Attention and transformers",
        "items": [
          "Attention lets each position look at all others and weight them by relevance.",
          {
            "type": "formula",
            "label": "Scaled dot-product attention",
            "text": "Attention(Q, K, V) = softmax( Q K^T / sqrt(d_k) ) V   (Q queries, K keys, V values; d_k key dimension, scaling prevents saturated softmax)"
          },
          "Example: scores for one query against three keys = [2, 1, 0.1], d_k = 4 so divide by 2 giving [1, 0.5, 0.05]; softmax = [0.502, 0.304, 0.194]; the output is that weighted mix of the value vectors.",
          "**Self-attention** + **positional encoding** (order information) + feed-forward layers + residual connections + layer normalisation + multi-head attention make a **transformer**. Processes all tokens in parallel (fast training on GPUs), captures long-range dependencies.",
          "Cost: attention is quadratic in sequence length; needs a lot of data and compute.",
          "Pretrain on huge unlabelled corpora then adapt (fine-tune, prompt): **foundation models** / large language models; the same transfer idea as CNN pretraining."
        ]
      },
      {
        "heading": "Applications and cautions",
        "items": [
          "Text classification, translation, summarisation, speech recognition and tagging, time-series forecasting, code and multimodal models (vision-language).",
          "Cautions: hallucination, bias in training data, privacy and copyright, high energy cost, evaluation difficulty, need for human oversight; always compare with a simple baseline."
        ]
      }
    ],
    "pitfalls": [
      "Saying RNN weights differ at each time step (they are shared).",
      "Forgetting the sqrt(d_k) scaling in attention.",
      "Claiming transformers have no notion of order (they need positional encodings).",
      "Calling an LSTM gate a hard switch (it is a smooth 0-1 multiplier)."
    ]
  }
];
