module.exports = [
{
  id: 'euler-integration', title: 'Stocks, net flow, graphical integration and Euler\'s method', priority: 1, tier: 'core',
  freq: 'est. very high (a full 25-mark question on both sheets)', marks: '25 marks (12 + 5 + 8)',
  summary: '**A stock is the accumulated net flow: Stock(t+DT) = Stock(t) + DT x (inflows - outflows) evaluated at time t (Euler); the stock rises when net flow > 0, falls when < 0, peaks or bottoms where net flow = 0, and its slope at any time equals the net flow.**',
  mnemonic: 'Net flow = SLOPE of the stock; stock = AREA under net flow; Euler = rectangle on the LEFT edge',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026'],
  sections: [
    { heading: 'Core ideas', items: [
      '**Stock** = accumulation (integral) of its net flow: Stock(t) = Stock(t0) + integral of [inflow - outflow] dt.',
      '**Net flow** = sum of inflows minus sum of outflows; it is the rate of change of the stock: d(Stock)/dt = Net flow.',
      '**Graphical integration**: net flow above zero, the stock rises; below zero, it falls; at zero crossings the stock has a maximum or minimum; the change over an interval is the signed area under the net flow curve.',
      'The **steepness** of the stock equals the size of the net flow; the **curvature** follows whether the net flow is rising (stock accelerating upward / decelerating downward) or falling.',
      'Stock and flow model for a chart question: one stock box, valves for each inflow and outflow, plus an auxiliary variable **Net Flow** = Inflow One + Inflow Two - Outflow (shown by links from the flows).'
    ] },
    { heading: 'Euler\'s method (numerical integration)', items: [
      { type: 'formula', label: 'Euler update', text: 'Stock(t + DT) = Stock(t) + DT x [Inflow(t) - Outflow(t)]' },
      '**DT** = time step (size of the interval); Stock(t) = value at the start of the step; Inflow(t), Outflow(t) = flow values at the START of the step.',
      '**Assumption 1**: the net flow is constant over each time step, equal to its value at the start of the step.',
      '**Assumption 2**: DT is small enough that this is a good approximation (smaller DT gives smaller error; DT too large gives large errors and instability).',
      'The error is the difference between the area under the true net flow curve and the rectangle DT x Net(t).',
      '**Underestimates** the true stock change when the net flow is **increasing** over the step (the left-hand rectangle is below the curve); **overestimates** when the net flow is **decreasing** (rectangle above the curve).',
      'Rule of thumb: pick DT at most one quarter to one half of the smallest time constant in the model (the shortest delay or adjustment time). For a goal-seeking flow with adjustment time AT, DT = AT jumps straight to the goal, DT > 2 AT oscillates and diverges.',
      'Other methods exist (Runge-Kutta, trapezoid) which use flow values at more than one point in the step; Euler is the simplest and is what the exam expects.'
    ] },
    { heading: 'Sheet 1 Q4: sawtooth outflow (stock starts at 100)', items: [
      'Flows: Inflow One = 30, Inflow Two = 20 (constant), Outflow sawtooth 100 -> 0 (t = 5) -> 100 (t = 10), repeating every 10 minutes: Outflow = 100 - 20t for 0 <= t <= 5 and 20(t - 5) for 5 <= t <= 10.',
      { type: 'formula', label: 'Net flow', text: 'Net(t) = 30 + 20 - Outflow(t) = 50 - Outflow(t): Net = -50 + 20t on [0,5], then 150 - 20t on [5,10]' },
      'Net flow is -50 at t = 0, crosses zero at t = 2.5, +50 at t = 5, zero at t = 7.5, -50 at t = 10; the pattern repeats (zero crossings at 12.5 and 17.5).',
      'Area of each triangle = 0.5 x 2.5 x 50 = 62.5, so the stock moves 100 -> 37.5 (t = 2.5) -> 100 (t = 5) -> 162.5 (t = 7.5) -> 100 (t = 10), and repeats; **mean outflow = 50 = mean inflow so the stock is periodic, not drifting**.',
      { type: 'diagram', kind: 'line', data: { title: 'Sheet 1 Q4: net flow and stock', xLabel: 'Minutes', yLabel: 'Units/min and units', series: [
        { name: 'Net flow', points: [[0,-50],[2.5,0],[5,50],[7.5,0],[10,-50],[12.5,0],[15,50],[17.5,0],[20,-50]] },
        { name: 'Stock (exact)', points: [[0,100],[1,60],[2,40],[2.5,37.5],[3,40],[4,60],[5,100],[6,140],[7,160],[7.5,162.5],[8,160],[9,140],[10,100],[11,60],[12,40],[12.5,37.5],[13,40],[14,60],[15,100],[16,140],[17,160],[17.5,162.5],[18,160],[19,140],[20,100]] }
      ] }, caption: 'Computed exactly: stock has minima 37.5 at t = 2.5, 12.5 and maxima 162.5 at t = 7.5, 17.5.' },
      { type: 'table', head: ['Interval (min)', 'Net flow', 'Stock behaviour mode'], rows: [
        ['0 - 2.5', 'negative, rising from -50 to 0', 'falls at a decreasing rate (100 to 37.5), reaching its minimum at 2.5'],
        ['2.5 - 5', 'positive, rising 0 to +50', 'rises at an increasing rate (37.5 to 100)'],
        ['5 - 7.5', 'positive, falling +50 to 0', 'rises at a decreasing rate (100 to 162.5), maximum at 7.5'],
        ['7.5 - 10', 'negative, falling 0 to -50', 'falls at an increasing rate (162.5 to 100)'],
        ['10 - 20', 'repeat of 0 - 10', 'same cycle again: min 37.5 at 12.5, max 162.5 at 17.5, ends at 100']
      ] }
    ] },
    { heading: 'Sheet 1 Q4(b),(c): Euler on the sawtooth', items: [
      'Net flow over 0-5 is increasing from -50 to +50, so Euler **underestimates** the stock. True stock at t = 5 is 100 (area -62.5 + 62.5 = 0).',
      'Euler DT = 5 on 0-5: Stock(5) = 100 + 5 x (-50) = -150: error -250. Euler DT = 1: net values at t = 0,1,2,3,4 are -50, -30, -10, 10, 30 (sum -50), so Stock(5) = 100 - 50 = 50: error -50. Smaller DT shrinks the error but still underestimates.',
      'Part (c), DT = 10: Net(0) = 50 - 100 = -50, Net(10) = 50 - 100 = -50.',
      { type: 'table', head: ['t', 'Net(t)', 'Euler stock', 'True stock'], rows: [['0', '-50', '100', '100'], ['10', '-50', '100 + 10(-50) = -400', '100'], ['20', '-50', '-400 + 10(-50) = -900', '100']] },
      'DT = 10 equals the full period of the sawtooth, so every step uses the worst-case value -50: the stock heads to -900 while the true stock is periodic around 100. Lesson: DT must be much smaller than the shortest time scale of the flows.'
    ] },
    { heading: 'Sheet 2 Q1: ramp-down, flat, ramp-up inflow with constant outflow 50 (stock starts at 100)', items: [
      'Inflow: 100 -> 0 on [0,5] (100 - 20t), 0 on [5,10], 0 -> 100 on [10,15] (20(t - 10)), 100 on [15,20], 100 -> 0 on [20,25]. Outflow = 50 constant. Net = Inflow - 50.',
      { type: 'formula', label: 'Net flow', text: 'Net = 50 - 20t [0,5]; -50 [5,10]; -50 + 20(t - 10) [10,15]; +50 [15,20]; 50 - 20(t - 20) [20,25]' },
      { type: 'table', head: ['Interval (days)', 'Net flow', 'Stock behaviour mode', 'Stock'], rows: [
        ['0 - 2.5', '+50 falling to 0', 'rises at a decreasing rate to a peak', '100 to 162.5'],
        ['2.5 - 5', '0 to -50', 'falls at an increasing rate', '162.5 to 100'],
        ['5 - 10', 'constant -50', 'falls linearly (constant rate); goes negative at t = 7, allowed by the question', '100 to -150'],
        ['10 - 12.5', '-50 rising to 0', 'falls at a decreasing rate to a trough', '-150 to -212.5'],
        ['12.5 - 15', '0 to +50', 'rises at an increasing rate', '-212.5 to -150'],
        ['15 - 20', 'constant +50', 'rises linearly', '-150 to 100'],
        ['20 - 22.5', '+50 to 0', 'rises at a decreasing rate to a peak', '100 to 162.5'],
        ['22.5 - 25', '0 to -50', 'falls at an increasing rate', '162.5 to 100']
      ] },
      { type: 'diagram', kind: 'line', data: { title: 'Sheet 2 Q1: net flow and exact stock', xLabel: 'Days', yLabel: 'Units/day and units', series: [
        { name: 'Net flow', points: [[0,50],[2.5,0],[5,-50],[10,-50],[12.5,0],[15,50],[20,50],[22.5,0],[25,-50]] },
        { name: 'Stock (exact)', points: [[0,100],[1,140],[2,160],[2.5,162.5],[3,160],[4,140],[5,100],[6,50],[7,0],[8,-50],[9,-100],[10,-150],[11,-190],[12,-210],[12.5,-212.5],[13,-210],[14,-190],[15,-150],[16,-100],[17,-50],[18,0],[19,50],[20,100],[21,140],[22,160],[22.5,162.5],[23,160],[24,140],[25,100]] }
      ] }, caption: 'Stock returns to 100 at t = 25 because total inflow area (1250) equals total outflow area (1250).' },
      'Part (b): over 0-2.5 the net flow is decreasing (50 -> 0), so Euler **overestimates**. With DT = 0.5 the net values at t = 0, 0.5, 1, 1.5, 2 are 50, 40, 30, 20, 10, giving stock 125, 145, 160, 170, 175 at t = 0.5 ... 2.5. True value 162.5, so error +12.5.',
      'Part (c), DT = 5: net at t = 0, 5, 10, 15, 20 is +50, -50, -50, +50, +50.',
      { type: 'table', head: ['t', 'Net(t)', 'Euler stock S(t)', 'True stock'], rows: [['0', '+50', '100', '100'], ['5', '-50', '100 + 5(50) = 350', '100'], ['10', '-50', '350 + 5(-50) = 100', '-150'], ['15', '+50', '100 + 5(-50) = -150', '-150'], ['20', '+50', '-150 + 5(50) = 100', '100'], ['25', '-', '100 + 5(50) = 350', '100']] }
    ] },
    { heading: 'Answer template: "describe Euler\'s method and its assumptions"', items: [
      '1. Equation and symbols (above). 2. Idea: step through time, using the current flows to predict the next stock value. 3. Assumptions: flows constant over each DT, DT small. 4. When it over/under-estimates (flow decreasing/increasing). 5. Support with a number from the given chart (compare Euler with the exact area).'
    ] }
  ],
  pitfalls: [
    'Using the flow at the END of the step instead of the START (that is not Euler).',
    'Forgetting to multiply by DT.',
    'Mixing up over/under: rising net flow means Euler UNDERestimates; falling means OVERestimates.',
    'Reading a chart value wrongly: write the equation of each line segment (slope x t + intercept) and check at the corners.',
    'Describing the stock only as "up" or "down": examiners want the mode (rising at a decreasing rate, linear, ...) and the turning points.',
    'Forgetting the net flow is also a variable on the stock and flow diagram; draw it with links from every flow.'
  ]
},
{
  id: 'stocks-flows-basics', title: 'Stock and flow diagrams: notation and conventions', priority: 12, tier: 'likely',
  freq: 'est. high (asked in every model-building question)', marks: '3-5 marks per diagram',
  summary: '**Stocks (boxes) accumulate; flows (valves on pipes) change stocks; clouds mark the system boundary; auxiliaries (variables) and constants feed flows via information links, never directly into stocks.**',
  mnemonic: 'Boxes hold, valves move, clouds bound, arrows inform',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026', 'CT561_Notes_09_Disease_Modelling_2'],
  sections: [
    { heading: 'Building blocks', items: [
      '**Stock** (rectangle): a quantity that accumulates and can be measured at one instant (population, backlog, staff, bank balance). Only changed by flows; has an initial value.',
      '**Flow** (pipe with valve): rate of change per unit time (people/day). Inflow adds, outflow subtracts. A flow has units of stock/time.',
      '**Cloud**: a source or sink outside the model boundary (infinite supply or disposal).',
      '**Auxiliary / variable**: calculated from other variables at each time step (for example Work Pressure, force of infection).',
      '**Constant / parameter**: fixed input (R0, D, N, adjustment time).',
      '**Information link (thin arrow)**: shows that one variable is used in the equation of another; it does not move material. Material only moves along flow pipes.',
      'Conservation: in the SIR model S + I + R = N always (closed population, flows move people between stocks).'
    ] },
    { heading: 'Rules for drawing a correct model', items: [
      'Every stock needs at least one flow; every flow needs a stock at one end or a cloud.',
      'Units must match: flow = quantity / time.',
      'Links go from the variable used to the variable that uses it, with a polarity (+/-) when you are asked for feedback.',
      'Use a **flag** (0 or 1) to switch a structure on or off: effective value = parameter x flag.',
      'Initial values: stocks need them (S = N - I0, I = I0, R = 0); an equilibrium start means inflows = outflows at t = 0.'
    ] },
    { heading: 'Typical equations', items: [
      { type: 'formula', label: 'Stock equation (Euler form)', text: 'Stock(t + DT) = Stock(t) + DT x (Inflow - Outflow)' },
      { type: 'formula', label: 'Continuous form', text: 'd(Stock)/dt = Inflow - Outflow, Stock(0) = initial value' },
      { type: 'diagram', kind: 'graph', data: { title: 'Generic stock and flow', height: 200, nodes: [
        { id: 'c1', label: 'src', x: 5, y: 50 }, { id: 'st', label: 'Stock', sub: 'initial value', x: 50, y: 50, color: 1 }, { id: 'c2', label: 'snk', x: 95, y: 50 },
        { id: 'aux', label: 'Net Flow', x: 50, y: 5, color: 2 }
      ], edges: [ { from: 'c1', to: 'st', label: 'Inflow' }, { from: 'st', to: 'c2', label: 'Outflow' }, { from: 'st', to: 'aux', curve: 25 } ] }, caption: 'Material flows along the pipes; the net flow auxiliary is calculated from the flows (draw links from both flows to it).' }
    ] }
  ],
  pitfalls: [
    'Drawing an information arrow straight into a stock: stocks change only through flows.',
    'Forgetting clouds or giving a flow no units.',
    'Omitting initial values and parameters in "design a model with equations" questions.'
  ]
},
{
  id: 'basic-flow-structures', title: 'Fractional increase, fractional decrease and adjustment to a goal', priority: 9, tier: 'core',
  freq: 'est. high (Sheet 1 Q2a 6 marks; Sheet 2 Q2a 8 marks)', marks: '6-8 marks',
  summary: '**Fractional increase (inflow = Stock x fraction) gives exponential growth (R loop); fractional decrease (outflow = Stock x fraction, or Stock/lifetime) gives exponential decay (B loop); adjustment to a goal (flow = (Goal - Stock)/AT) gives S-shaped or goal-seeking behaviour (B loop).**',
  mnemonic: 'Grow by fraction R, decay by fraction B, chase a goal B',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026'],
  sections: [
    { heading: 'Fractional increase rate', items: [
      { type: 'formula', label: 'Fractional increase', text: 'Inflow = Stock x g,  g = fractional growth rate (per time unit)' },
      'Reinforcing loop: bigger stock, bigger inflow, bigger stock. Behaviour: **exponential growth**, Stock(t) = Stock(0) e^(g t); doubling time about 0.69 / g.',
      'Examples: population births (births = population x birth fraction), compound interest, early epidemic growth (contagion loop), viral content.',
      'Numeric: Stock = 100, g = 0.10 per year, DT = 1: inflow 10, then stock 110 gives inflow 11, stock 121, inflow 12.1, stock 133.1.'
    ] },
    { heading: 'Fractional decrease rate', items: [
      { type: 'formula', label: 'Fractional decrease', text: 'Outflow = Stock x f = Stock / L,  f = fractional decrease rate, L = 1/f = average lifetime' },
      'Balancing loop: bigger stock, bigger outflow, smaller stock. Behaviour: **exponential decay** towards zero, Stock(t) = Stock(0) e^(-f t); half-life about 0.69 L.',
      'Examples: staff quits (quits = staff x quit fraction), recovery (recovery = Infected / D), radioactive decay, depreciation, customer churn.',
      'Numeric: Stock = 100, f = 0.2 per month, DT = 1: outflow 20, stock 80, outflow 16, stock 64, outflow 12.8, stock 51.2.'
    ] },
    { heading: 'Adjustment to a goal (goal seeking)', items: [
      { type: 'formula', label: 'Adjustment to a goal', text: 'Net flow = (Goal - Stock) / AT,  AT = adjustment time (time constant)' },
      'Discrepancy = Goal - Stock; the flow closes a fraction 1/AT of the gap each time unit. Balancing loop. Behaviour: **goal-seeking, exponential approach** that is fast at first and slows as the gap closes; about 63% of the gap closed after one AT and 95% after 3 AT.',
      'Examples: room temperature to thermostat setting, workforce moving to a target, pressure to clean up the environment, a vaccination fraction moving to its maximum.',
      'Numeric: Goal = 100, Stock = 20, AT = 4, DT = 1: flow 20 then stock 40, flow 15 then stock 55, flow 11.25 then stock 66.25, flow 8.4 then stock 74.7.',
      { type: 'diagram', kind: 'line', data: { title: 'The three structures, each starting at 20 (goal 100, rate 0.1, AT 4)', xLabel: 'Time', yLabel: 'Stock', series: [
        { name: 'Fractional increase (g = 0.1)', points: [[0,20],[2,24.4],[4,29.8],[6,36.4],[8,44.5],[10,54.4],[12,66.4],[14,81.1],[16,99.1]] },
        { name: 'Fractional decrease (f = 0.1)', points: [[0,20],[2,16.4],[4,13.4],[6,11],[8,9],[10,7.4],[12,6],[14,4.9],[16,4]] },
        { name: 'Adjustment to goal (AT = 4)', points: [[0,20],[2,51.5],[4,70.6],[6,82.1],[8,89.2],[10,93.4],[12,96],[14,97.6],[16,98.5]] }
      ] }, caption: 'Continuous-time values computed from the exact solutions.' }
    ] },
    { heading: 'Expected enrolments structure (Sheet 2 Q4a, 5 marks)', items: [
      'Given: stock **Students** with inflow **Enrolments** and outflow **Graduations** (both clouds). Task: add a stock and flow structure, with equations, that models **expected enrolments**.',
      'Idea: managers do not see the true future inflow; they form an expectation by **smoothing past enrolments** (first-order information delay, an adjustment-to-a-goal where the goal is the actual Enrolments). Expected Enrolments can then drive planning (for example Desired Staff = Expected Enrolments x programme length / student-staff ratio).',
      { type: 'table', head: ['Variable', 'Equation', 'Initial'], rows: [
        ['Students (stock)', 'Students + DT x (Enrolments - Graduations)', '400 (example)'],
        ['Graduations', 'Students / Programme Duration (a material delay, 4 years)', '100 per year'],
        ['Enrolments', 'Applications x Acceptance Fraction, or an exogenous input (step/ramp)', '100 per year'],
        ['Expected Enrolments (new stock)', 'Expected + DT x Change in Expected Enrolments', '100 = Enrolments (start in equilibrium)'],
        ['Change in Expected Enrolments (new flow)', '(Enrolments - Expected Enrolments) / Time to Perceive Enrolments', '0'],
        ['Time to Perceive Enrolments', 'constant, e.g. 3 years', '3']
      ] },
      'Link polarities: Enrolments to Change in Expected +; Expected Enrolments to Change in Expected - (balancing loop, goal seeking: the expectation chases reality); Time to Perceive to Change -. Expected Enrolments to whatever it drives (+).',
      'Numeric check (Enrolments steps from 100 to 120 at year 2, time to perceive 3, DT = 1): Expected = 100, 100, 100, 106.67, 111.11, 114.07 at years 0-5, closing 1/3 of the gap each year and lagging reality (63% after one time constant).',
      'Alternative accepted structure: Expected Enrolments as a trend or as an adjustment to a demand goal (Applications), same form: change = (goal - expected)/adjustment time.'
    ] },
    { heading: 'Varying decrease fraction (Sheet 2 Q2a)', items: [
      'Problem: stock S with outflow = S x G where the fraction G itself changes over time, moving to a maximum G* with adjustment constant AT.',
      { type: 'formula', label: 'Equations', text: 'Outflow = S x G;  G(t + DT) = G(t) + DT x (G* - G)/AT;  G(0) = initial fraction (for example 0)' },
      'Treat G as a second stock: its only flow is the adjustment inflow (G* - G)/AT, a balancing goal-seeking loop. S has the usual balancing loop (S up, outflow up, S down). G is not affected by S, so G is exogenous to the S loop.',
      'Real-world use: **vaccination fraction** ramping up as capacity is built, the staff quit fraction rising as morale falls, a policy whose effect phases in gradually, customers adopting a technology, drug resistance building up, or a person gradually changing behaviour. It models a policy or behaviour that does not switch on instantly but is implemented gradually.',
      'Effect: slow start (G small so the outflow is small), then the decay accelerates as G rises, then levels at the rate set by G*; S follows an S-like reduction curve rather than a pure exponential.'
    ] }
  ],
  pitfalls: [
    'Writing Goal - Stock the wrong way round (flow would push the stock away from its goal).',
    'Calling goal seeking "linear": it is exponential approach, never actually reaching the goal in finite time.',
    'Forgetting to say which loop type each structure creates (increase = R, decrease = B, goal = B).',
    'For the varying fraction question, forgetting that G needs its own initial value and its own equation.'
  ]
},
{
  id: 'feedback-polarity', title: 'Feedback, link polarity and loop polarity', priority: 6, tier: 'core',
  freq: 'est. high (Sheet 1 Q1a, Q1c; Sheet 2 Q3a, Q3c)', marks: '5-8 marks',
  summary: '**A feedback loop is a closed chain of causal links where a variable eventually influences itself; link polarity (+ same direction, - opposite) decides the loop type: an even number of negative links is reinforcing (R, growth/collapse), an odd number is balancing (B, goal seeking).**',
  mnemonic: 'Count the minuses: even = Reinforcing, odd = Balancing',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026', 'CT561_Notes_09_Disease_Modelling_2'],
  sections: [
    { heading: 'Definitions', items: [
      '**Feedback**: causality that forms a closed loop; a change in a variable travels round the chain and comes back to change the variable itself.',
      '**Link polarity**: sign on a causal link A to B. **Positive (+)**: if A increases, B increases above what it would otherwise have been (and if A decreases, B decreases). **Negative (-)**: if A increases, B decreases (opposite direction).',
      '**Loop polarity**: the type of loop obtained by multiplying the link signs, i.e. counting negative links. **Even number (including zero) of negatives: reinforcing (R)**. **Odd number: balancing (B)**.',
      'Stock-flow links: inflow to stock is +, outflow to stock is -. A flow that drains the stock gives a negative link.',
      '**Reinforcing loop**: amplifies change (exponential growth or collapse, vicious or virtuous circle); in the SIR model, the Contagion loop.',
      '**Balancing loop**: counteracts change and seeks a goal or equilibrium; in SIR the Depletion loop and the Recovery loop.'
    ] },
    { heading: 'Behaviour', items: [
      'R loop alone: exponential growth (or decay if it starts falling). B loop alone: goal-seeking (exponential approach); with a delay in the loop it can **oscillate** around the goal.',
      'Real systems have both; the behaviour depends on which loop dominates, and dominance shifts over time (shifting loop dominance, for example an epidemic: R dominates early, B dominates after the peak).',
      '**Advantages of adding feedback structures to a stock and flow model**: the model generates behaviour endogenously instead of by imposed inputs; captures the policy response (managers react to a gap); shows why systems resist change or grow; allows testing policies; reveals unintended side effects; explains oscillation, overshoot and goal seeking.'
    ] },
    { heading: 'Procedure to find loop polarity (use in every question)', items: [
      '1. Write the loop as a cycle of variables starting at the stock. 2. Put a sign on every link. 3. Trace an increase of the stock around the loop and see whether it comes back as an increase (reinforcing) or a decrease (balancing). 4. Cross-check by counting negatives. 5. Name the loop and mark it R or B on the diagram.'
    ] },
    { heading: 'Worked example: Sheet 2 Q3(a) environment loop', items: [
      'Loop: Environmental Quality to Pressure to Clean Up Environment to Cleanup Effort back to Environmental Quality.',
      'Signs: Environmental Quality to Pressure is **negative** (the better the quality, the less the pressure); Pressure to Cleanup Effort is **positive**; Cleanup Effort to Environmental Quality is **positive**.',
      'One negative link (odd), so the loop is **balancing**. Trace: quality falls, pressure rises, effort rises, quality rises again: it corrects the change.',
      'Behaviour: goal seeking: quality is pulled towards the level where pressure is zero (the goal). With delays in effort or environment response the loop would overshoot and oscillate around the goal; with no delay it approaches smoothly.',
      { type: 'diagram', kind: 'graph', data: { title: 'Environment balancing loop (B)', directed: true, height: 280, nodes: [
        { id: 'p', label: 'Pressure to Clean Up', x: 50, y: 5 }, { id: 'e', label: 'Cleanup Effort', x: 90, y: 85 }, { id: 'q', label: 'Environmental Quality', x: 10, y: 85 }
      ], edges: [ { from: 'q', to: 'p', label: '-', curve: -25 }, { from: 'p', to: 'e', label: '+', curve: -25 }, { from: 'e', to: 'q', label: '+', curve: -25 } ] }, caption: 'One negative link: balancing.' }
    ] }
  ],
  pitfalls: [
    'Defining polarity of a link as "good/bad": it is about direction of change, not desirability.',
    'Forgetting that outflow to stock is a negative link.',
    'Counting only the policy links and missing the final link back into the stock.',
    'Saying a balancing loop always stabilises: with delays it can oscillate.',
    'Not tracing an actual increase (the question says "confirm polarity by tracing").'
  ]
},
{
  id: 'workload-backlog-models', title: 'Workload / backlog models: policy loops and side-effect loops', priority: 5, tier: 'core',
  freq: 'est. very high (Sheet 1 Q1b,c; Sheet 2 Q3b,c: 12 + 7-8 marks)', marks: '19-20 marks',
  summary: '**A backlog stock with Work Pressure drives balancing policy loops (work harder, cut time per task, extend deadline, add staff) whose side effects (rework, fatigue, lower efficiency) create reinforcing loops that undermine them.**',
  mnemonic: 'Pressure triggers POLICIES (B loops); policies leak SIDE EFFECTS (R loops)',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026'],
  sections: [
    { heading: 'Generic structure', items: [
      'Stock: Backlog. Inflows: new work (Allocated / New Claims) and Rework. Outflow: Completed.',
      'Backlog to Work Pressure (+). Work Pressure drives one or more policies (all aimed at raising Completed or reducing pressure).',
      '**Policy loops** are balancing: backlog rises, pressure rises, policy acts, completion rises, backlog falls.',
      '**Side-effect loops** are reinforcing: the policy also raises rework or fatigue, which pushes the backlog up again, reducing the policy\'s benefit.',
      'Delays (hiring, training, fatigue building up) make the effects of policies late, and can cause oscillation and over-reaction.'
    ] },
    { heading: 'Sheet 1 Q1: Assignment Backlog (student workload)', items: [
      'Links with polarity: Allocated to Backlog +; Rework to Backlog +; Completed to Backlog -; Backlog to Work Pressure +; Work Pressure to Time Per Assignment -; Work Pressure to Weekly Study Hours +; Work Pressure to Amount of Time to Submit +; Time Per Assignment to Rework -; Time Per Assignment to Completed -; Weekly Study Hours to Completed +; Weekly Study Hours to Fatigue +; Amount of Time to Submit to Work Pressure -; Fatigue to Completed -.',
      { type: 'diagram', kind: 'graph', data: { title: 'Assignment backlog model (link polarities)', height: 520, nodes: [
        { id: 'alloc', label: 'Allocated', x: 5, y: 5 }, { id: 'rew', label: 'Rework', x: 5, y: 40 },
        { id: 'bl', label: 'Assignment Backlog', x: 40, y: 20, color: 1 }, { id: 'comp', label: 'Completed', x: 80, y: 40 },
        { id: 'wp', label: 'Work Pressure', x: 40, y: 50, color: 2 },
        { id: 'tpa', label: 'Time Per Assignment', x: 10, y: 80 }, { id: 'swh', label: 'Weekly Study Hours', x: 55, y: 85 },
        { id: 'tts', label: 'Amount of Time to Submit', x: 85, y: 65 }, { id: 'fat', label: 'Fatigue', x: 90, y: 90 }
      ], edges: [
        { from: 'alloc', to: 'bl', label: '+' }, { from: 'rew', to: 'bl', label: '+' }, { from: 'comp', to: 'bl', label: '-' },
        { from: 'bl', to: 'wp', label: '+' }, { from: 'wp', to: 'tpa', label: '-' }, { from: 'wp', to: 'swh', label: '+' }, { from: 'wp', to: 'tts', label: '+' },
        { from: 'tpa', to: 'rew', label: '-' }, { from: 'tpa', to: 'comp', label: '-', curve: 20 }, { from: 'swh', to: 'comp', label: '+' },
        { from: 'swh', to: 'fat', label: '+' }, { from: 'tts', to: 'wp', label: '-', curve: 20 }, { from: 'fat', to: 'comp', label: '-', curve: -20 }
      ] }, caption: 'Flows drawn as nodes for the causal view; in the stock and flow diagram Allocated, Rework (inflows) and Completed (outflow) are valves on the Backlog stock.' },
      { type: 'table', head: ['Loop', 'Path', 'Negatives', 'Type'], rows: [
        ['B1 Work harder', 'Backlog +, Work Pressure +, Weekly Study Hours +, Completed -, Backlog', '1', 'Balancing'],
        ['B2 Cut time per assignment', 'Backlog +, Work Pressure -, Time Per Assignment -, Completed -, Backlog', '3', 'Balancing'],
        ['B3 Deadline extension', 'Work Pressure +, Amount of Time to Submit -, Work Pressure', '1', 'Balancing'],
        ['R1 Rework (side effect of B2)', 'Backlog +, Work Pressure -, Time Per Assignment -, Rework +, Backlog', '2', 'Reinforcing'],
        ['R2 Fatigue (side effect of B1)', 'Backlog +, Work Pressure +, Weekly Study Hours +, Fatigue -, Completed -, Backlog', '2', 'Reinforcing']
      ] },
      'Trace, increasing backlog: B1: backlog up, pressure up, hours up, completed up, backlog down (balancing). B2: backlog up, pressure up, time per assignment DOWN, completed UP, backlog down (balancing). B3: pressure up, time to submit up, pressure down (balancing). R1: backlog up, pressure up, time per assignment down, rework UP, backlog UP (reinforcing). R2: backlog up, pressure up, hours up, fatigue up, completed DOWN, backlog UP (reinforcing).'
    ] },
    { heading: 'Sheet 2 Q3: Claims Backlog (insurance)', items: [
      'Links: New Claims +, Reworked Claims + into Backlog; Claims Completed - from Backlog; Backlog to Work Pressure +; Work Pressure to Time per Claim -; Work Pressure to Temporary Staff +; Work Pressure to Workweek +; Time per Claim to Claims Completed -; Temporary Staff to Claims Completed +; Workweek to Claims Completed +; Time per Claim to Reworked Claims -; Temporary Staff to Time per Claim +; Workweek to Fatigue +; Fatigue to Claims Completed -.',
      { type: 'table', head: ['Loop', 'Path (start at Backlog)', 'Negatives', 'Type'], rows: [
        ['Policy B1: reduce time per claim', 'Work Pressure +, Time per Claim -, Completed -, Backlog', '3', 'Balancing'],
        ['Policy B2: temporary staff', 'Work Pressure +, Temp Staff +, Completed +, Backlog -', '1', 'Balancing'],
        ['Policy B3: longer workweek', 'Work Pressure +, Workweek +, Completed +, Backlog -', '1', 'Balancing'],
        ['Side effect R1: rework', 'Work Pressure +, Time per Claim -, Reworked Claims -, Backlog +', '2', 'Reinforcing'],
        ['Side effect R2: temp staff slow time per claim', 'Work Pressure +, Temp Staff +, Time per Claim +, Completed -, Backlog -', '2', 'Reinforcing'],
        ['Side effect R3: fatigue', 'Work Pressure +, Workweek +, Fatigue +, Completed -, Backlog -', '2', 'Reinforcing']
      ] },
      'Note: the Temp Staff, Time per Claim, Reworked Claims path (Time per Claim up gives fewer reworks, Reworked Claims - into Backlog) is an additional balancing side-benefit loop; the three side-effect loops that undermine the policies are R1, R2, R3.',
      'In the stock and flow model the claims flows are valves on the Backlog stock; polarity of flow to stock is + (inflow) and - (outflow).'
    ] },
    { heading: 'Discussion: best response to a workload increase (Sheet 2 Q3c)', items: [
      '**Reduce time per claim**: fast but quality drops, rework grows (R1), possibly a net loss; avoid except as a short-term measure.',
      '**Longer workweek**: immediate effect but fatigue accumulates and productivity falls (R3), also costs overtime; use only for short peaks.',
      '**Temporary staff**: adds capacity without hurting quality much; side effect is training/induction slowing average time per claim (R2) and a hiring delay, but it is the most sustainable.',
      'Recommended: combine **temporary staff as the main response** (structural capacity), a limited temporary workweek increase to cover the delay, and avoid cutting time per claim; monitor rework and fatigue as leading indicators; also reduce the inflow if possible.',
      'Tie to feedback: policies are balancing loops but each side effect is a reinforcing loop; the best policy has the weakest, slowest side-effect loop.'
    ] }
  ],
  pitfalls: [
    'Mislabelling loops: Time Per Assignment is reduced by pressure (negative link) and reduces completion time (a negative link to Completed), so the policy loop has THREE negatives.',
    'Drawing the Time to Submit loop through the stock: it only involves Work Pressure and Time to Submit.',
    'Not showing link polarities and loop labels (R/B) on the diagram (explicit marks in the question).',
    'Giving loop names without tracing: show the trace as the question asks.',
    'Forgetting the flow into the stock: Completed is an outflow (negative), Rework an inflow (positive).'
  ]
}
];
