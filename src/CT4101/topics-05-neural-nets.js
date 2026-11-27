module.exports = [
  {
    "id": "neural-nets",
    "title": "Neural network fundamentals: neuron, activations, layers, forward pass, losses",
    "priority": 8,
    "tier": "core",
    "freq": "est. high",
    "marks": "10-15 marks",
    "summary": "**A neuron computes a weighted sum z = w.x + b then applies an activation phi(z); layers of neurons with non-linear activations learn non-linear functions; the output activation and loss are chosen by the task (linear + MSE, sigmoid + binary cross-entropy, softmax + categorical cross-entropy).**",
    "mnemonic": "Neuron = Weigh, Add bias, Activate",
    "source": [
      "CT4101_Notes_09_Neural_Networks",
      "CT4101_Notes_05_Linear_Logistic_Regression"
    ],
    "sections": [
      {
        "heading": "The artificial neuron (perceptron)",
        "items": [
          "Inspired by biological neurons: inputs, connection strengths, a firing decision.",
          {
            "type": "formula",
            "label": "Neuron",
            "text": "z = w1x1 + ... + wd xd + b = w.x + b ;  a = phi(z)   (w = weights, b = bias, phi = activation function, a = output)"
          },
          "The bias b is the intercept: it shifts the activation threshold so the decision boundary need not pass through the origin.",
          "McCulloch-Pitts / perceptron: a **step** activation (output 1 if z >= threshold, else 0) with hand-set weights; the perceptron learning rule learns weights for linearly separable data. A single neuron with sigmoid is exactly logistic regression; with identity activation it is linear regression.",
          "Learning means adjusting the weights and biases to reduce a loss on the training data."
        ]
      },
      {
        "heading": "Why non-linear activations",
        "items": [
          "Without a non-linearity, stacked layers collapse into one linear map (a product of matrices is a matrix), so depth adds nothing.",
          "Non-linear activations let a network model curved decision boundaries and complex interactions. **Universal approximation**: a network with one hidden layer and enough units can approximate any continuous function on a compact domain, but that does not say it is easy to learn from finite, noisy data, nor that it generalises."
        ]
      },
      {
        "heading": "Activation functions",
        "items": [
          {
            "type": "table",
            "head": [
              "Function",
              "Formula",
              "Range",
              "Notes"
            ],
            "rows": [
              [
                "Sigmoid (logistic)",
                "1 / (1 + e^-z)",
                "(0, 1)",
                "Binary output probability; saturates so gradients vanish in hidden layers; derivative s(1 - s) max 0.25"
              ],
              [
                "Tanh",
                "(e^z - e^-z)/(e^z + e^-z)",
                "(-1, 1)",
                "Zero-centred; still saturates"
              ],
              [
                "ReLU",
                "max(0, z)",
                "[0, inf)",
                "Default for hidden layers: cheap, no saturation for z > 0; \"dead\" units if z always < 0"
              ],
              [
                "Leaky ReLU",
                "max(0.01z, z)",
                "(-inf, inf)",
                "Small slope for negatives avoids dead units"
              ],
              [
                "Softmax",
                "e^(z_i) / sum_j e^(z_j)",
                "(0, 1), sums to 1",
                "Output layer for mutually exclusive classes"
              ],
              [
                "Identity (linear)",
                "z",
                "(-inf, inf)",
                "Output layer for regression"
              ]
            ]
          },
          "Softmax example: scores [2, 1, 0] give exponentials 7.389, 2.718, 1.000 (sum 11.107) so probabilities 0.665, 0.245, 0.090.",
          "ReLU example: z = 0.7 gives 0.7; z = -0.4 gives 0."
        ]
      },
      {
        "heading": "Architecture and parameter counts",
        "items": [
          "**Input layer** (one node per feature), one or more **hidden layers**, **output layer**. A **dense (fully connected)** layer connects every unit to every unit of the previous layer. \"Deep\" = many hidden layers.",
          "Layer parameters = (inputs x units) weights + units biases. Example: 10 inputs, 64 hidden, 32 hidden, 1 output: 10x64 + 64 = 704; 64x32 + 32 = 2080; 32x1 + 1 = 33; total 2817.",
          "Another: 50 hidden units to 3 classes: 50x3 + 3 = 153.",
          {
            "type": "diagram",
            "kind": "layers",
            "caption": "A 2-2-1 network (2 inputs, 2 hidden neurons, 1 output): hidden layer has 4 weights + 2 biases = 6, output has 2 weights + 1 bias = 3, so 9 parameters in all.",
            "data": {
              "title": "2-2-1 feed-forward network",
              "layers": [
                2,
                2,
                1
              ],
              "labels": [
                "Input",
                "Hidden",
                "Output"
              ]
            }
          }
        ]
      },
      {
        "heading": "Worked forward pass (sigmoid everywhere)",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Compute the hidden activations, the output and the loss L = 0.5 (t − y)²."
            ]
          },
          "Inputs x1 = 0.05, x2 = 0.10; target t = 1. Hidden weights: w11 = 0.15, w21 = 0.20 (into h1), w12 = 0.25, w22 = 0.30 (into h2); hidden biases b1 = b2 = 0.35. Output weights v1 = 0.40, v2 = 0.45, bias c = 0.60.",
          "Hidden pre-activations: z1 = 0.15(0.05) + 0.20(0.10) + 0.35 = **0.3775**; z2 = 0.25(0.05) + 0.30(0.10) + 0.35 = **0.3925**.",
          "Hidden activations: h1 = sigmoid(0.3775) = **0.5933**; h2 = sigmoid(0.3925) = **0.5969**.",
          "Output: zo = 0.40(0.5933) + 0.45(0.5969) + 0.60 = **1.1059**; y_hat = sigmoid(1.1059) = **0.7514**.",
          "Loss (squared error, L = 0.5 (t - y_hat)^2) = 0.5 (0.2486)^2 = **0.0309**. Backprop for this network is in the next topic."
        ]
      },
      {
        "heading": "Choosing output activation and loss",
        "items": [
          {
            "type": "table",
            "head": [
              "Task",
              "Output layer",
              "Loss"
            ],
            "rows": [
              [
                "Regression",
                "1 unit, linear (identity)",
                "MSE (or MAE / Huber)"
              ],
              [
                "Binary classification",
                "1 unit, sigmoid",
                "Binary cross-entropy"
              ],
              [
                "Multiclass (one label)",
                "C units, softmax",
                "Categorical cross-entropy"
              ],
              [
                "Multilabel",
                "C units, each sigmoid",
                "Binary cross-entropy per label"
              ]
            ]
          },
          {
            "type": "formula",
            "label": "Binary cross-entropy",
            "text": "L = -[ y ln(p) + (1 - y) ln(1 - p) ]   (p = predicted P(y = 1))"
          },
          {
            "type": "formula",
            "label": "Categorical cross-entropy",
            "text": "L = - sum_c y_c ln(p_c) = -ln(p_true class)   (y one-hot)"
          },
          "Cost of error: p = 0.9 for a true 1 costs 0.105; p = 0.5 costs 0.693 (the notes quote the jump from 0.9 to 0.5 as +0.59); p = 0.01 costs 4.6. Confident mistakes are punished hardest.",
          "Softmax example above with true class 1: L = -ln(0.665) = 0.408; if the true class were 2: -ln(0.245) = 1.408.",
          "MSE squares errors (large errors dominate, outlier-sensitive); MAE is robust but has constant gradient; cross-entropy gives strong gradients when confidently wrong."
        ]
      },
      {
        "heading": "When to use neural networks",
        "items": [
          "Strong on unstructured data (images, audio, text), complex interactions, and large datasets; need lots of data and compute, tuning, and are hard to interpret.",
          "On small tabular data, tree ensembles or regularised linear models are often as good or better: always beat a strong classical baseline before choosing deep learning.",
          "Practical checklist: scale inputs, start small, monitor training vs validation loss, use early stopping, fix random seeds, document the architecture and hyperparameters."
        ]
      },
      {
        "heading": "Why neural networks, and where they came from",
        "items": [
          "They help with **unstructured data** (images, audio, text), complicated combinations of features, and very large datasets.",
          "For ordinary tables of modest size, boosted trees are often still better. A network is a very flexible function, not understanding.",
          "The idea copies the brain, where about 100 billion connected cells (**neurons**) pass signals. Artificial networks date from the 1940s. \"**Deep** learning\" (mid-2000s on) means many layers.",
          "**Layers**: the input layer receives the features, hidden layers build in-between patterns, the output layer gives the prediction.",
          {
            "type": "p",
            "text": "The first artificial neuron (McCulloch and Pitts, 1943)"
          },
          "It is a switch: either fires or does not. **Step 1**: add up inputs times weights. **Step 2**: output 1 if the total reaches a **threshold**, else 0.",
          "Inputs 1, 0, 1 with weights 0.6, 0.9, 0.5 give 0.6 + 0 + 0.5 = 1.1. With threshold 1 it fires.",
          "Its weights and threshold were set by hand, which is very hard. Today the weights are **learned from data**."
        ]
      },
      {
        "heading": "The modern neuron and activation functions",
        "items": [
          "A neuron computes **z** = each input times its weight, added up, plus a **bias**. The bias is a constant that shifts the result, like the intercept of a line.",
          "A positive weight pushes towards firing (**excitatory**). A negative one pushes against (**inhibitory**).",
          "An **activation function** (written phi) then turns z into the output. One such unit is also called a **perceptron**.",
          "Neurons are named after their activation: a \"ReLU unit\", a \"logistic unit\".",
          "Example: inputs 2 and 1, weights 0.5 and -1, bias 0.2: z = 2(0.5) + 1(-1) + 0.2 = 0.2. Threshold gives 1, sigmoid gives 0.55, ReLU gives 0.2.",
          {
            "type": "p",
            "text": "The common activations"
          },
          "**Sigmoid (logistic)**: squeezes any number into 0 to 1.",
          "**Tanh**: squeezes into -1 to 1.",
          "**ReLU**: max(0, z). The most popular, with no upper limit.",
          "A **dead ReLU** always gets a negative z, outputs 0 and stops learning. **Leaky ReLU** keeps a small slope for negatives to avoid this.",
          "**Softmax**: turns several scores into probabilities that add to 1. Raising one score raises its share. They can still be overconfident.",
          {
            "type": "p",
            "text": "Output layer by task"
          },
          "Predicting a number: no activation (linear). Yes/no: one sigmoid. One of several classes: softmax.",
          "For several classes you need three things: one-hot target (a 1 for the right class, 0 elsewhere), softmax output and cross-entropy loss."
        ]
      },
      {
        "heading": "Layers, parameters and what size means",
        "items": [
          "A **dense** layer connects every input to every unit. In matrix form: z = W a_previous + b, then a = phi(z), where W holds the weights and b the biases.",
          "**Forward propagation** is computing layer by layer from input to prediction.",
          {
            "type": "p",
            "text": "Counting parameters (numbers to be learned)"
          },
          "For each layer: inputs x units + units (the biases).",
          "20 inputs to 50 units: 1,050. Then 50 to 3 outputs: 153. Total 1,203.",
          "A 10-64-32-1 network: 2,720 weights + 97 biases = 2,817.",
          "**Width** is units per layer. **Depth** is number of layers. Bigger can learn more but overfits more without enough data.",
          {
            "type": "p",
            "text": "Universal approximation is not a guarantee"
          },
          "A wide enough network **can represent** almost any function. That does not mean training will **find** it, that the data is good enough, or that it works on new cases."
        ]
      },
      {
        "heading": "Loss functions",
        "items": [
          "The **loss** is the number training tries to reduce. It must suit the task, because training follows the loss, not your scorecard.",
          "**Number**: mean squared error (punishes big misses) or mean absolute error.",
          "**Yes/no**: binary cross-entropy, with a sigmoid output.",
          "**Several classes**: categorical cross-entropy with softmax: only the probability given to the correct class counts, as -ln(p).",
          "For a true \"yes\": p = 0.9 costs 0.105, p = 0.5 costs 0.693, p = 0.1 costs 2.303, p = 0.01 costs 4.605. Being confidently wrong is punished hardest."
        ]
      },
      {
        "heading": "Lecture worked examples: tiny forward pass and the student network",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "**Tiny network**, input [1, 2]. h1 = ReLU(0.5·x1 − 0.2·x2 + 0.1), h2 = ReLU(−1.0·x1 + 0.2·x2 + 0.1), output = sigmoid(2.0·h1 + 1.0·h2 + 0.3).",
              "**Student network**, x1 = 2, x2 = 1, target 1. h1 = ReLU(0.4·x1 + 0.3·x2 + 0.1), h2 = ReLU(−0.2·x1 + 0.6·x2), output = sigmoid(0.5·h1 − 0.3·h2 − 0.1).",
              "Find both outputs, and the loss −ln(output) for the student."
            ]
          },
          "**Tiny 2-2-1 network**: x = [1, 2]. Hidden unit h1: z = 0.5(1) - 0.2(2) + 0.1 = 0.2 so ReLU gives 0.2. Hidden unit h2: z = -1.0(1) + 0.2(2) + 0.1 = -0.5 so ReLU gives 0 (switched off). Output: z = 2.0(0.2) + 1.0(0) + 0.3 = 0.7, sigmoid(0.7) = 0.67.",
          "**Student pass/fail network** (9 parameters; inputs x1 = 2 hours studied, x2 = 1 test; target y = 1 passed; ReLU hidden, sigmoid output). Hidden 1: weights 0.4, 0.3, bias 0.1. Hidden 2: weights -0.2, 0.6, bias 0. Output: weights 0.5 (from h1), -0.3 (from h2), bias -0.1.",
          {
            "type": "table",
            "head": [
              "Step",
              "Working",
              "Result"
            ],
            "rows": [
              [
                "h1 pre-activation",
                "0.4(2) + 0.3(1) + 0.1",
                "1.2"
              ],
              [
                "h2 pre-activation",
                "-0.2(2) + 0.6(1) + 0",
                "0.2"
              ],
              [
                "ReLU",
                "max(0, 1.2), max(0, 0.2)",
                "h1 = 1.2, h2 = 0.2"
              ],
              [
                "Output score",
                "0.5(1.2) - 0.3(0.2) - 0.1",
                "0.44"
              ],
              [
                "Sigmoid",
                "sigmoid(0.44)",
                "0.608"
              ],
              [
                "Loss (y = 1)",
                "-ln(0.608)",
                "0.497"
              ]
            ]
          },
          "Reading: a 60.8% guess for a student who passed, right direction but not confident. About a dozen multiply-adds; big networks do this billions of times."
        ]
      }
    ],
    "pitfalls": [
      "Forgetting the bias term in parameter counts.",
      "Using softmax with independent labels (use sigmoid per label) or sigmoid hidden layers everywhere in deep nets (vanishing gradients).",
      "Using MSE with a sigmoid output for classification instead of cross-entropy.",
      "Saying a network with no non-linear activation can learn non-linear functions.",
      "Treating universal approximation as a guarantee of good generalisation."
    ]
  },
  {
    "id": "training-nn",
    "title": "Training neural networks: backpropagation, gradient descent and optimisers",
    "priority": 9,
    "tier": "core",
    "freq": "est. high",
    "marks": "8-15 marks",
    "summary": "**Training repeats: forward pass, compute loss, backpropagate gradients with the chain rule, update weights opposite the gradient (w <- w - lr x grad); optimisers such as momentum, RMSprop and Adam adapt the step.**",
    "mnemonic": "Forward, Loss, Backward, Update (FLBU)",
    "source": [
      "CT4101_Notes_09_Neural_Networks"
    ],
    "sections": [
      {
        "heading": "Training loop and vocabulary",
        "items": [
          "**Epoch** = one pass over the full training set. **Batch / mini-batch** = examples used per weight update (batch size 32-256 typical). Iterations per epoch = n / batch size.",
          "Loop: 1) forward pass to get predictions; 2) compute loss; 3) backpropagation to get gradient of the loss w.r.t. every weight and bias; 4) optimiser updates the parameters. Repeat for many epochs while monitoring validation loss.",
          "**Gradient descent** moves each parameter opposite its gradient: w <- w - eta x dL/dw (eta = learning rate). Batch GD (all data), stochastic GD (one example, noisy), mini-batch GD (the standard compromise).",
          "Initialisation: small random weights (Xavier/Glorot for sigmoid/tanh, He for ReLU) to break symmetry; zero init makes all units in a layer identical."
        ]
      },
      {
        "heading": "Backpropagation (chain rule)",
        "items": [
          "Backprop computes all gradients efficiently by reusing local derivatives: propagate the error signal from the output back through the layers.",
          "For the loss L, define the **error signal** delta = dL/dz for each neuron. Output neuron: delta_out = dL/da x phi'(z). Hidden neuron: delta_h = ( sum of next-layer delta x connecting weight ) x phi'(z_h).",
          "Gradients: dL/dw (from unit i to unit j) = delta_j x a_i (the activation of the input side); dL/db_j = delta_j.",
          "Sigmoid derivative: phi'(z) = a(1 - a). ReLU derivative: 1 if z > 0 else 0. For softmax + cross-entropy the output delta simplifies to (p - y); for sigmoid + binary cross-entropy also (p - y).",
          "Modern frameworks use **automatic differentiation**; you only define the forward pass."
        ]
      },
      {
        "heading": "Worked backprop step (network from the forward-pass example)",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Compute the output and hidden deltas and the gradients."
            ],
            "own": [
              {
                "type": "formula",
                "label": "Output delta (squared error, sigmoid)",
                "text": "delta_o = (y − t) × y (1 − y)"
              },
              {
                "type": "formula",
                "label": "Hidden delta",
                "text": "delta_h = delta_o × v × h (1 − h)"
              },
              {
                "type": "formula",
                "label": "Gradient of a weight",
                "text": "gradient = delta of the neuron it feeds × the value that came in"
              },
              {
                "type": "formula",
                "label": "Gradient descent step",
                "text": "new weight = old weight − learning rate × gradient"
              }
            ]
          },
          "Recall: h1 = 0.5933, h2 = 0.5969, y_hat = 0.7514, t = 1, L = 0.0309, x1 = 0.05, x2 = 0.10, v1 = 0.40, v2 = 0.45.",
          "Output delta: dL/dy_hat = y_hat - t = -0.2486; sigmoid derivative = 0.7514 x 0.2486 = 0.1868; **delta_o = -0.2486 x 0.1868 = -0.04645**.",
          "Output gradients: dL/dv1 = delta_o x h1 = -0.02756; dL/dv2 = delta_o x h2 = -0.02772; dL/dc = -0.04645.",
          "Hidden deltas: delta_h1 = delta_o x v1 x h1(1 - h1) = -0.04645 x 0.40 x 0.2413 = **-0.004483**; delta_h2 = -0.04645 x 0.45 x 0.2407 = **-0.005029**.",
          "Hidden gradients: dL/dw11 = delta_h1 x x1 = -0.000224; dL/dw21 = delta_h1 x x2 = -0.000448 (similar for w12, w22 using delta_h2).",
          "Update with eta = 0.5: v1 = 0.40 - 0.5(-0.02756) = 0.4138; v2 = 0.4639; c = 0.6232; w11 = 0.1501; w21 = 0.2002 (hidden changes are tiny: the sigmoid layers shrink the gradient).",
          "After updating all nine parameters, the new forward pass gives y_hat = 0.7588 and L = 0.0291, down from 0.0309: one step has reduced the loss.",
          {
            "type": "diagram",
            "kind": "layers",
            "caption": "Forward pass goes left to right; error signals (deltas) flow right to left along the same connections.",
            "data": {
              "title": "Backpropagation on the 2-2-1 network",
              "layers": [
                2,
                2,
                1
              ],
              "labels": [
                "Input x1, x2",
                "Hidden h1, h2",
                "Output y_hat"
              ]
            }
          }
        ]
      },
      {
        "heading": "Optimisers",
        "items": [
          "**SGD**: w <- w - eta g. Simple; sensitive to learning rate and to ravines (oscillates).",
          "**SGD with momentum**: v <- beta v + g ; w <- w - eta v (beta about 0.9). Accumulates velocity, damps oscillations, speeds along consistent directions.",
          "**RMSprop**: keeps a running average of squared gradients s <- rho s + (1 - rho) g^2 ; w <- w - eta g / (sqrt(s) + eps). Per-parameter adaptive step.",
          "**Adam**: momentum + RMSprop with bias correction: m <- b1 m + (1 - b1) g ; v <- b2 v + (1 - b2) g^2 ; m_hat = m/(1 - b1^t), v_hat = v/(1 - b2^t) ; w <- w - eta m_hat / (sqrt(v_hat) + eps). Defaults b1 = 0.9, b2 = 0.999, eps = 1e-8. Robust default choice.",
          "Worked: w = 0.5, g = 0.2, eta = 0.1. SGD: 0.5 - 0.1(0.2) = 0.48. Adam step 1: m = 0.1(0.2) = 0.02, v = 0.001(0.04) = 0.00004; m_hat = 0.02/0.1 = 0.2, v_hat = 0.00004/0.001 = 0.04; step = 0.1 x 0.2/(0.2 + eps) = 0.1, so w = 0.40 (Adam's first step is about eta in size regardless of gradient scale).",
          "**Learning rate** is the most important hyperparameter: too high diverges or oscillates, too low is slow or stalls; use schedules (decay) or warm-up."
        ]
      },
      {
        "heading": "Training difficulties",
        "items": [
          "**Vanishing gradients**: products of small derivatives (sigmoid max 0.25) shrink gradients layer by layer, so early layers barely learn. Remedies: ReLU, good initialisation, batch normalisation, residual connections, LSTM for sequences.",
          "**Exploding gradients**: products of large values blow up; remedy gradient clipping, smaller learning rate.",
          "**Dead ReLU**: unit always outputs 0; use Leaky ReLU or lower learning rate.",
          "**Overfitting**: low training loss, rising validation loss; see Regularisation.",
          "**Local minima / saddle points**, plateaus; non-convex loss, so results depend on initialisation (seed).",
          "**Batch normalisation**: normalise layer inputs per mini-batch to stabilise and speed training.",
          "Monitor training and validation **loss curves**: both falling = fine; training falling and validation rising = overfitting; both flat and high = underfitting or bad learning rate."
        ]
      },
      {
        "heading": "Lecture worked example: backpropagation and one update (student network)",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "Student network: x1 = 2, x2 = 1, target 1. Hidden h1 = 1.2 and h2 = 0.2 (both ReLU). Output weights v1 = 0.5, v2 = −0.3. Predicted p = 0.608 (sigmoid output, cross-entropy loss).",
              "Work backwards: find the output blame, the output gradients, the hidden blame and the first-layer gradients, then do one update."
            ],
            "own": [
              {
                "type": "formula",
                "label": "Output delta (cross-entropy, sigmoid)",
                "text": "delta = p − y"
              },
              {
                "type": "formula",
                "label": "Gradient of a weight",
                "text": "gradient = delta of the neuron it feeds × the value that came in"
              },
              {
                "type": "formula",
                "label": "Gradient descent step",
                "text": "new weight = old weight − learning rate × gradient"
              }
            ]
          },
          "Chain rule intuition: multiply local effects along the path (if a weight changes a neuron by 2 and that neuron changes the loss by 2, the weight changes the loss by 4). Backprop = chain rule applied from the loss backwards, reusing work; it is **credit assignment** (which parameters contributed to the error): each operation supplies a local derivative, intermediate gradients are reused, frameworks build and differentiate the computation graph (automatic differentiation). Steps: output gradient, layer-by-layer chain rule, parameter gradients. Backward pass tells the optimiser which direction each parameter should move.",
          "Step 1 output blame: for sigmoid + cross-entropy the output delta = p - y = 0.608 - 1 = **-0.392** (negative = output too low, push up).",
          "Step 2 output weights (gradient = blame x what flowed in): v1: -0.392 x 1.2 = -0.470; v2: -0.392 x 0.2 = -0.078; output bias c: -0.392.",
          "Step 3 blame to hidden neurons (blame x weight sent forward; ReLU slope 1 since both positive): h1: -0.392 x 0.5 = -0.196; h2: -0.392 x -0.3 = +0.118 (opposite sign: it was pulling the answer down).",
          "Step 4 first-layer weights: h1: -0.196 x 2 = -0.392 and -0.196 x 1 = -0.196; h2: 0.118 x 2 = +0.235 and 0.118 x 1 = +0.118; biases -0.196 and +0.118. Negative gradient means turn that knob up; positive means turn it down.",
          {
            "type": "table",
            "head": [
              "Parameter",
              "Old",
              "Gradient",
              "New (eta = 0.5)"
            ],
            "rows": [
              [
                "hidden 1 hours",
                "0.400",
                "-0.392",
                "0.596"
              ],
              [
                "hidden 1 tests",
                "0.300",
                "-0.196",
                "0.398"
              ],
              [
                "hidden 2 hours",
                "-0.200",
                "+0.235",
                "-0.318"
              ],
              [
                "hidden 2 tests",
                "0.600",
                "+0.118",
                "0.541"
              ],
              [
                "output from h1",
                "0.500",
                "-0.470",
                "0.735"
              ],
              [
                "output from h2",
                "-0.300",
                "-0.078",
                "-0.261"
              ],
              [
                "biases b1, b2, c",
                "0.1, 0, -0.1",
                "-0.196, +0.118, -0.392",
                "0.198, -0.059, 0.096"
              ]
            ]
          },
          "New forward pass: h1 = 0.596(2) + 0.398(1) + 0.198 = 1.79; h2 = -0.318(2) + 0.541(1) - 0.059 = -0.15 so ReLU gives 0 (switched off for this student); output = sigmoid(0.735(1.79) + 0.096) = **0.804**; loss falls from 0.497 to **0.218** in one step (61% to 80%). Training the same network over all 13 students at eta = 0.5: average loss 0.599 initially, about 0.184 after 40 rounds and every student correct.",
          "Update rule: new weight = old weight - eta x gradient (eta = learning rate = step size). Gradient picture: loss is a landscape, the gradient is the slope underfoot, steps shrink as the slope flattens near the bottom. Learning rate: too small = safe but slow; suitable = consistent progress; too large = oscillation, divergence, dead activations."
        ]
      },
      {
        "heading": "Epochs, batches and optimisers",
        "items": [
          "**Epoch**: one pass through all the training data.",
          "**Batch size**: how many examples are used for each update (often 32, 64 or 128).",
          "**Iteration** (step): one update of the weights. Steps per epoch = examples / batch size.",
          "50,000 photos in batches of 100 = 500 steps per epoch, so 20 epochs = 10,000 updates.",
          "All data at once (**full batch**) is stable but slow. **Mini-batches** are the usual choice. One example at a time (**stochastic**) is very noisy.",
          {
            "type": "p",
            "text": "Optimisers: the rule for updating weights"
          },
          "**SGD**: step downhill. **Momentum** adds speed from earlier steps, like a heavy ball rolling down a valley instead of bouncing between its walls.",
          "**Adam**: momentum plus a separate step size for each weight. A good default, with learning rate 0.001.",
          "**LBFGS**: also estimates how the slope is curving. Can suit small tabular networks.",
          {
            "type": "p",
            "text": "Starting and stability"
          },
          "If all weights start at zero, every hidden unit learns the same thing, so start with small random values scaled to the layer size.",
          "**Vanishing gradients**: early layers get almost no update. **Exploding gradients**: huge updates; lower the learning rate, normalise, or cap them (clipping).",
          "Fix the random seed to repeat a run, but one seed does not show the result is stable."
        ]
      },
      {
        "heading": "Reading learning curves",
        "items": [
          "A **learning curve** plots training loss and validation loss against epochs.",
          "**Underfitting**: both stay high. Use a bigger network, train longer, improve features or optimisation.",
          "**Good fit**: both fall and stay close.",
          "**Overfitting**: training loss keeps falling while validation stalls or rises. Stop early, regularise, shrink the model or get more data.",
          "**Loss jumping about or growing**: lower the learning rate, scale the inputs, check for numerical problems.",
          "**Different result with each seed**: report the variation, and use a smaller model or more data."
        ]
      }
    ],
    "pitfalls": [
      "Updating weights with + gradient instead of - gradient.",
      "Using the wrong activation derivative or forgetting the chain rule factor of the next layer's weight.",
      "Updating weights one at a time while still using old activations inconsistently (compute all gradients first, then update).",
      "Confusing epoch, batch and iteration.",
      "Believing a lower training loss proves a better model."
    ]
  }
];
