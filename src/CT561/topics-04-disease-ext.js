module.exports = [
{
  id: 'cohort-models', title: 'Cohort (age-structured) disease models', priority: 11, tier: 'likely',
  freq: 'est. medium-high (Sheet 1 Q3c, 5 marks)', marks: '5 marks',
  summary: '**To represent young and elderly cohorts, replicate the S, I, R stocks (and flows) for each cohort using subscripts, give each cohort its own parameters, and make each cohort\'s force of infection a sum over the infectious people in all cohorts via a contact matrix.**',
  mnemonic: 'Copy the structure per cohort, then couple them through the contact matrix',
  source: ['CT561_Problem_Sheet_01_2024-2025'],
  sections: [
    { heading: 'How to modify the model', items: [
      '1. **Subscript** every stock and flow by cohort j in {Young, Elderly}: S_j, I_j, R_j (and Q_j, V_j if used); N_j = cohort size.',
      '2. **Cohort-specific parameters**: initial sizes, recovery delay D_j, quarantine fraction, vaccination fraction (vaccination often targeted at the elderly), possibly infectivity, and mortality (extra Died stock for the elderly).',
      '3. **Coupling by a contact matrix**: c_jk = contacts per day of an individual in cohort j with individuals of cohort k.',
      { type: 'formula', label: 'Cohort force of infection', text: 'lambda_j = i x SUM over k of [ c_jk x I_k / N_k ];  IR_j = S_j x lambda_j;  RR_j = I_j / D_j' },
      '4. Keep the total balanced: S_j + I_j + R_j = N_j; add ageing flows between cohorts only for long-term models.',
      '5. Run the model by cohort and compare outcomes (attack rate by age group, deaths, effect of targeted vaccination).'
    ] },
    { heading: 'Why and trade-offs', items: [
      'Why: the real population is heterogeneous: young people have more contacts (school), the elderly have a higher risk of severe disease. A single homogeneous mixing assumption cannot represent these differences or evaluate targeted policies.',
      'Costs: more stocks and parameters, need for age-specific contact data, harder to calibrate and explain; same equations, so Vensim subscripts / Python arrays make it manageable.',
      'The feedback structure inside each cohort is unchanged (contagion, depletion, recovery); new reinforcing links appear between cohorts (infection in one raises infection in the other).'
    ] },
    { heading: 'Diagram', items: [
      { type: 'diagram', kind: 'graph', data: { title: 'Two cohorts coupled through contacts', height: 300, nodes: [
        { id: 'Sy', label: 'S young', x: 5, y: 15 }, { id: 'Iy', label: 'I young', x: 40, y: 15, color: 2 }, { id: 'Ry', label: 'R young', x: 80, y: 15, color: 1 },
        { id: 'Se', label: 'S elderly', x: 5, y: 85 }, { id: 'Ie', label: 'I elderly', x: 40, y: 85, color: 2 }, { id: 'Re', label: 'R elderly', x: 80, y: 85, color: 1 }
      ], edges: [ { from: 'Sy', to: 'Iy' }, { from: 'Iy', to: 'Ry' }, { from: 'Se', to: 'Ie' }, { from: 'Ie', to: 'Re' }, { from: 'Iy', to: 'Se', label: 'contacts', curve: 20 }, { from: 'Ie', to: 'Sy', label: 'contacts', curve: 20 } ] } }
    ] }
  ],
  pitfalls: [
    'Simply duplicating the model with no coupling (cohorts must infect each other through contacts).',
    'Dividing by total N instead of cohort sizes without saying so; state the convention.',
    'Forgetting that parameters (vaccination, D, mortality) can differ by cohort, which is the point of the extension.'
  ]
},
{
  id: 'seir-exploratory', title: 'SEIR and the exploratory model with clinical and sub-clinical streams', priority: 15, tier: 'likely',
  freq: 'est. medium (Lecture challenge 10.3)', marks: '8-12 marks',
  summary: '**SEIR adds an Exposed (latent, not yet infectious) stock between S and I; the exploratory model splits infections into clinical (pre-clinical then clinical, 60%) and sub-clinical (40%, half as infectious) streams, and three infectious compartments feed the force of infection.**',
  mnemonic: 'S, then E (latent), then split: clinical (pre, clinical) or sub-clinical, then R',
  source: ['CT561_Notes_09_Disease_Modelling_2'],
  sections: [
    { heading: 'SEIR basics', items: [
      '**E (Exposed)**: infected but not yet infectious (latent period). Flow E to I = E / Latent Time. Infection rate = S x lambda feeds E, not I.',
      { type: 'formula', label: 'SEIR', text: 'dS/dt = -beta S I/N;  dE/dt = beta S I/N - E/L;  dI/dt = E/L - I/D;  dR/dt = I/D  (L = latent time)' },
      'The latent delay slows the early growth and delays the peak compared with SIR. Same R0 = beta D and the same final size.'
    ] },
    { heading: 'Challenge 10.3 parameters', items: [
      { type: 'table', head: ['Parameter', 'Meaning', 'Value'], rows: [
        ['Latent Time', 'time in Exposed stock', '3 days'],
        ['Pre-Infectious Clinical Time', 'time pre-clinical (already spreading)', '2.1 days'],
        ['Infectious Time (Clinical)', 'time infectious with symptoms', '2.9 days'],
        ['Infectious Time (Sub-clinical)', 'time infectious without symptoms', '5 days'],
        ['Clinical Fraction', 'proportion of infected who show symptoms', '0.60'],
        ['Contacts', 'contacts per person per day', '10'],
        ['Infectivity', 'probability of transmission per contact', '0.06'],
        ['Transmission multiplier', 'sub-clinical relative infectiousness', '0.50']
      ] },
      'Population about 5 million, 10 initially infected (put in Exposed in the simulation below).'
    ] },
    { heading: 'Structure and equations', items: [
      { type: 'diagram', kind: 'graph', data: { title: 'SEIR with clinical and sub-clinical streams', height: 360, nodes: [
        { id: 'S', label: 'S', x: 3, y: 50 }, { id: 'E', label: 'E', sub: 'Exposed', x: 25, y: 50, color: 3 },
        { id: 'P', label: 'Pre-clinical', x: 52, y: 15, color: 2 }, { id: 'C', label: 'Clinical', x: 75, y: 15, color: 2 },
        { id: 'U', label: 'Sub-clinical', x: 62, y: 85, color: 2 }, { id: 'R', label: 'R', x: 97, y: 50, color: 1 }
      ], edges: [ { from: 'S', to: 'E', label: 'IR' }, { from: 'E', to: 'P', label: 'CF x E/L' }, { from: 'P', to: 'C', label: 'P/2.1' }, { from: 'C', to: 'R', label: 'C/2.9' }, { from: 'E', to: 'U', label: '(1-CF) E/L' }, { from: 'U', to: 'R', label: 'U/5' } ] } },
      { type: 'formula', label: 'Force of infection (three infectious compartments)', text: 'lambda = c x i x (Pre-clinical + Clinical + Multiplier x Sub-clinical) / N' },
      'Infection Rate = S x lambda. Flows: E to Pre-clinical = Clinical Fraction x E/Latent; E to Sub-clinical = (1 - CF) x E/Latent; Pre-clinical to Clinical = P/2.1; Clinical to R = C/2.9; Sub-clinical to R = U/5.',
      { type: 'formula', label: 'R0 for this model', text: 'R0 = c i [ CF (2.1 + 2.9) + (1 - CF) x 0.5 x 5 ] = 0.6 x [0.6 x 5 + 0.4 x 2.5] = 0.6 x 4 = 2.4' },
      'Simulation (DT 0.01 days): peak total infectious about 757,000 at day 89; E peaks about 431,000; attack rate about 87.9%.',
      { type: 'diagram', kind: 'line', data: { title: 'Exploratory SEIR model: Exposed and Infectious (thousands)', xLabel: 'Days', yLabel: 'Thousands of people', series: [
        { name: 'Exposed', points: [[0,0],[10,0],[20,0.1],[30,0.4],[40,2],[50,9.1],[60,40.6],[70,161.1],[80,419.1],[90,430.8],[100,181.6],[110,53.2],[120,14.5],[130,3.9],[140,1.1],[150,0.3]] },
        { name: 'Infectious (all three)', points: [[0,0],[10,0],[20,0.1],[30,0.4],[40,2],[50,9.1],[60,41.1],[70,170.3],[80,518.4],[90,753.1],[100,461.7],[110,169.7],[120,51],[130,14.3],[140,4],[150,1.1]] }
      ] } }
    ] }
  ],
  pitfalls: [
    'Feeding the infection flow into I instead of E.',
    'Leaving pre-clinical people out of the force of infection (they spread before symptoms).',
    'Forgetting the transmission multiplier for sub-clinical cases.'
  ]
},
{
  id: 'disease-model-variants', title: 'Compartment model variants, assumptions and limitations', priority: 16, tier: 'possible',
  freq: 'est. medium (supplementary to SIR; discuss-style questions)', marks: '5-8 marks',
  summary: '**SIR (permanent immunity), SIS (no immunity, endemic equilibrium) and SEIR (latent period) are compartment models; all assume homogeneous mixing and constant parameters, so real-world use needs extensions (cohorts, networks, stochasticity, behaviour).**',
  mnemonic: 'SIR immune, SIS return, SEIR wait',
  source: ['CT561_Notes_09_Disease_Modelling_2', 'CT561_Problem_Sheet_01_2024-2025'],
  sections: [
    { heading: 'Variants', items: [
      { type: 'table', head: ['Model', 'Flow', 'Use / feature'], rows: [
        ['SIR', 'S to I to R', 'permanent immunity (measles, a one-season flu); epidemic then extinction'],
        ['SIS', 'S to I to S', 'no lasting immunity (common cold, gonorrhoea); endemic equilibrium I* = N (1 - 1/R0) if R0 > 1'],
        ['SEIR', 'S to E to I to R', 'latent period before infectiousness (measles, COVID)'],
        ['SIQR / SIRV', 'adds Q or V', 'countermeasures: quarantine, vaccination']
      ] },
      'SIS example: N = 1000, R0 = 3 gives I* = 1000 x (1 - 1/3) = 667 and S* = N/R0 = 333; Rn = 1 at equilibrium (infection inflow balances recovery).',
      'Difference-equation form is what a simulation uses (Euler); the differential form is the continuous model.'
    ] },
    { heading: 'Assumptions and limitations', items: [
      'Homogeneous mixing (everyone has the same contact rate); real contacts are clustered by age, place and network.',
      'Closed population; no births, deaths or migration (add them for long-term models).',
      'Constant parameters; real behaviour changes (people distance when infections rise: a balancing loop not in basic SIR).',
      'Deterministic: with few initial cases chance matters (random extinction).',
      'Lifelong immunity in SIR; waning immunity needs SIRS.',
      'Aggregation: individuals are not tracked (no memory or history); compartments average everything.',
      'Detailed data needed for calibration (R0 uncertain); results sensitive to parameter values.'
    ] }
  ],
  pitfalls: [
    'Stating SIR is wrong rather than saying which assumptions fail and what extension fixes them.'
  ]
},
{
  id: 'implementation-tools', title: 'Implementations: Vensim and Python', priority: 17, tier: 'low',
  freq: 'est. low (Lecture overview only)', marks: '0-3 marks',
  summary: '**Models are built either graphically in Vensim (stock and flow diagram with equations, built-in Euler integration, sensitivity tools) or as code in Python (explicit time loop updating stocks; easy parameter sweeps).**',
  mnemonic: 'Vensim draws, Python loops',
  source: ['CT561_Notes_09_Disease_Modelling_2'],
  sections: [
    { heading: 'Comparison', items: [
      '**Vensim**: diagram-based system dynamics software; stocks, flows, variables with equations; subscripts for cohorts; built-in integration (Euler) with time step setting; sensitivity analysis; good for communication of feedback structure.',
      '**Python**: write the model as code: arrays for stocks, loop over time steps t = 0, DT, 2 DT ..., compute flows then update stocks (Euler); loops make parameter sweeps (lecture notebook varies QF) and plots easy.',
      'Python skeleton: compute beta = R0/D; per step: lambda = beta*I/N; IR = S*lambda; S -= DT*IR; I += DT*(IR - I/D); R += DT*I/D.',
      'Both implement the same equations; the choice is about speed of building, transparency and scripting.'
    ] }
  ],
  pitfalls: ['Updating stocks one by one inside the loop using already-updated values: compute all flows first, then update all stocks.']
},
{
  id: 'bg-modelling-process', title: 'Background: systems, models and simulation', priority: 18, tier: 'possible',
  freq: 'background (not in supplied notes)', marks: '3-5 marks',
  summary: '**A model is a simplified representation of a system built for a purpose; simulation runs it over time; system dynamics models feedback with stocks and flows, integrated numerically in small time steps.**',
  mnemonic: 'Purpose, boundary, structure, equations, test, use',
  source: ['CT561_Problem_Sheet_01_2024-2025'],
  sections: [
    { heading: 'Basics (standard background)', items: [
      '**System**: set of interacting parts with a purpose. **Model**: simplified abstraction answering a question. **Simulation**: executing a model over time to observe behaviour.',
      'Modelling process: define purpose and boundary; identify variables; draw causal loops; stock and flow diagram; formulate equations and parameters; simulate; test (verification: does the code do what we meant; validation: does the model represent the real system well enough for its purpose); sensitivity analysis; use for policy experiments.',
      'Continuous vs discrete: system dynamics treats quantities as continuous and uses numerical integration (Euler, DT); discrete-event and agent-based models change state at events or per agent.',
      'Endogenous (generated by feedback inside the boundary) vs exogenous (inputs).',
      'Behaviour modes: exponential growth, goal seeking, S-shaped growth, oscillation, overshoot and collapse.',
      'Good models are simple enough to understand and detailed enough for the question ("all models are wrong, some are useful").'
    ] }
  ],
  pitfalls: ['Confusing verification (built right) with validation (right model).']
},
{
  id: 'bg-stochastic-abm', title: 'Background: deterministic vs stochastic and agent-based models', priority: 19, tier: 'possible',
  freq: 'background (not in supplied notes)', marks: '3-5 marks',
  summary: '**Compartment (system dynamics) models are aggregate and deterministic (same inputs, same output); stochastic models include randomness (different runs), and agent-based models simulate individuals with their own rules and interactions.**',
  mnemonic: 'Aggregate and deterministic vs random vs individual',
  source: ['CT561_Notes_09_Disease_Modelling_2'],
  sections: [
    { heading: 'Comparison (standard background)', items: [
      { type: 'table', head: ['Aspect', 'Deterministic compartment (SD)', 'Stochastic', 'Agent-based'], rows: [
        ['Unit', 'groups (stocks)', 'groups or individuals with random events', 'individual agents'],
        ['Randomness', 'none: identical runs', 'yes: need many runs, distributions', 'usually yes'],
        ['Heterogeneity', 'by adding cohorts', 'same', 'natural (each agent differs, networks)'],
        ['Cost', 'cheap, fast', 'moderate', 'expensive, many parameters'],
        ['Best for', 'large populations, policy feedback', 'small populations, extinction risk', 'spatial/network effects, behaviour']
      ] },
      'Stochastic effect: with I0 = 1 an outbreak can die out by chance even when R0 > 1 (the deterministic model always takes off).',
      'Agent-based infection: each agent has a state and contacts; each contact transmits with probability i; emergent epidemic from many individual interactions.'
    ] }
  ],
  pitfalls: ['Saying deterministic models are "wrong": they give the average behaviour and are right for large populations.']
}
];
