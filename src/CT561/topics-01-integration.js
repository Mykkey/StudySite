module.exports = [
  {
    "id": "euler-integration",
    "title": "Stocks, net flow, graphical integration and Euler's method",
    "priority": 1,
    "tier": "core",
    "freq": "est. very high (a full 25-mark question on both sheets)",
    "marks": "25 marks (12 + 5 + 8)",
    "summary": "**A stock is a level that builds up over time. Its net flow (in minus out) says how fast it changes. Euler's method estimates it one time step at a time: new stock = old stock + step size × (inflows − outflows).**",
    "mnemonic": "Net flow = SLOPE of the stock; stock = AREA under net flow; Euler = rectangle on the LEFT edge",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Core ideas",
        "items": [
          "A **stock** is something that builds up or drains away, like water in a bath.",
          "The **net flow** is all inflows minus all outflows. It is how fast the stock changes.",
          {
            "type": "p",
            "text": "Reading a net flow graph (graphical integration)"
          },
          "Net flow **above zero**: the stock rises.",
          "Net flow **below zero**: the stock falls.",
          "Net flow **crosses zero**: the stock is at a peak or a low point.",
          "The change over a period is the **area** between the net flow curve and zero (negative below it).",
          "The bigger the net flow, the **steeper** the stock line.",
          "If net flow is itself increasing, the stock curve bends upwards. If it is decreasing, it bends downwards.",
          {
            "type": "p",
            "text": "When a chart question asks for a stock and flow model"
          },
          "Draw one stock box with a valve for each inflow and outflow.",
          "Add a helper variable **Net Flow** = Inflow One + Inflow Two − Outflow, with links from each flow.",
          {
            "type": "p",
            "text": "In symbols"
          },
          "Stock(t) = Stock(t0) + integral of (inflow − outflow) dt.",
          "d(Stock)/dt = net flow."
        ]
      },
      {
        "heading": "Euler's method (numerical integration)",
        "items": [
          {
            "type": "formula",
            "label": "Euler update",
            "text": "Stock(t + DT) = Stock(t) + DT x [Inflow(t) - Outflow(t)]"
          },
          "**DT** is the time step (how far you jump each time).",
          "Use the flow values at the **start** of the step.",
          {
            "type": "p",
            "text": "The two assumptions"
          },
          "**1.** The net flow stays **constant** during each step, at its starting value.",
          "**2.** DT is **small enough** for that to be nearly true.",
          {
            "type": "p",
            "text": "Where the error comes from"
          },
          "Euler replaces the curve with a flat rectangle. The error is the area between them.",
          "Net flow **increasing** during the step: Euler **underestimates** (rectangle is below the curve).",
          "Net flow **decreasing**: Euler **overestimates** (rectangle is above).",
          {
            "type": "p",
            "text": "Choosing DT"
          },
          "Smaller DT means less error. A DT that is too big gives large errors and wild results.",
          "Rule of thumb: at most a quarter to a half of the shortest delay or adjustment time (**time constant**) in the model.",
          "For a flow that heads towards a goal with adjustment time AT: DT = AT jumps straight there, and DT > 2 AT swings further and further away.",
          "Other methods (Runge-Kutta, trapezoid) use more than one point per step. Euler is the simplest and is what the exam expects."
        ]
      },
      {
        "heading": "Sheet 1 Q4: sawtooth outflow (stock starts at 100)",
        "items": [
          {
            "type": "p",
            "text": "Sheet 1 Q4: a zig-zag (sawtooth) outflow"
          },
          "The stock starts at **100**. Inflow One = 30 and Inflow Two = 20, both constant.",
          "The outflow goes from 100 down to 0 (at t = 5) and back to 100 (at t = 10), repeating every 10 minutes.",
          "First stretch (0 to 5): Outflow = 100 − 20t. Second stretch (5 to 10): Outflow = 20(t − 5).",
          {
            "type": "formula",
            "label": "Net flow",
            "text": "Net(t) = 30 + 20 - Outflow(t) = 50 - Outflow(t): Net = -50 + 20t on [0,5], then 150 - 20t on [5,10]"
          },
          "Net flow is −50 at t = 0, zero at t = 2.5, +50 at t = 5, zero at t = 7.5 and −50 at t = 10.",
          "The pattern repeats, so it also crosses zero at 12.5 and 17.5.",
          {
            "type": "p",
            "text": "Working out the stock"
          },
          "Each triangle of area is 0.5 × 2.5 × 50 = **62.5**.",
          "So the stock goes 100, then 37.5 (t = 2.5), 100 (t = 5), 162.5 (t = 7.5), 100 (t = 10).",
          "Average outflow = 50 = inflow, so the stock **cycles** and does not drift up or down.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Sheet 1 Q4: net flow and stock",
              "xLabel": "Minutes",
              "yLabel": "Units/min and units",
              "series": [
                {
                  "name": "Net flow",
                  "points": [
                    [
                      0,
                      -50
                    ],
                    [
                      2.5,
                      0
                    ],
                    [
                      5,
                      50
                    ],
                    [
                      7.5,
                      0
                    ],
                    [
                      10,
                      -50
                    ],
                    [
                      12.5,
                      0
                    ],
                    [
                      15,
                      50
                    ],
                    [
                      17.5,
                      0
                    ],
                    [
                      20,
                      -50
                    ]
                  ]
                },
                {
                  "name": "Stock (exact)",
                  "points": [
                    [
                      0,
                      100
                    ],
                    [
                      1,
                      60
                    ],
                    [
                      2,
                      40
                    ],
                    [
                      2.5,
                      37.5
                    ],
                    [
                      3,
                      40
                    ],
                    [
                      4,
                      60
                    ],
                    [
                      5,
                      100
                    ],
                    [
                      6,
                      140
                    ],
                    [
                      7,
                      160
                    ],
                    [
                      7.5,
                      162.5
                    ],
                    [
                      8,
                      160
                    ],
                    [
                      9,
                      140
                    ],
                    [
                      10,
                      100
                    ],
                    [
                      11,
                      60
                    ],
                    [
                      12,
                      40
                    ],
                    [
                      12.5,
                      37.5
                    ],
                    [
                      13,
                      40
                    ],
                    [
                      14,
                      60
                    ],
                    [
                      15,
                      100
                    ],
                    [
                      16,
                      140
                    ],
                    [
                      17,
                      160
                    ],
                    [
                      17.5,
                      162.5
                    ],
                    [
                      18,
                      160
                    ],
                    [
                      19,
                      140
                    ],
                    [
                      20,
                      100
                    ]
                  ]
                }
              ]
            },
            "caption": "Computed exactly: stock has minima 37.5 at t = 2.5, 12.5 and maxima 162.5 at t = 7.5, 17.5."
          },
          {
            "type": "table",
            "head": [
              "Interval (min)",
              "Net flow",
              "Stock behaviour mode"
            ],
            "rows": [
              [
                "0 - 2.5",
                "negative, rising from -50 to 0",
                "falls at a decreasing rate (100 to 37.5), reaching its minimum at 2.5"
              ],
              [
                "2.5 - 5",
                "positive, rising 0 to +50",
                "rises at an increasing rate (37.5 to 100)"
              ],
              [
                "5 - 7.5",
                "positive, falling +50 to 0",
                "rises at a decreasing rate (100 to 162.5), maximum at 7.5"
              ],
              [
                "7.5 - 10",
                "negative, falling 0 to -50",
                "falls at an increasing rate (162.5 to 100)"
              ],
              [
                "10 - 20",
                "repeat of 0 - 10",
                "same cycle again: min 37.5 at 12.5, max 162.5 at 17.5, ends at 100"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Sheet 1 Q4(b),(c): Euler on the sawtooth",
        "items": [
          {
            "type": "p",
            "text": "Parts (b) and (c): apply Euler to the sawtooth"
          },
          "From 0 to 5 the net flow is **increasing** (−50 to +50), so Euler **underestimates**.",
          "The true stock at t = 5 is 100 (area −62.5 + 62.5 = 0).",
          "**DT = 5**: Stock(5) = 100 + 5 × (−50) = **−150**. The error is −250.",
          "**DT = 1**: net values at t = 0, 1, 2, 3, 4 are −50, −30, −10, 10, 30 (total −50). Stock(5) = 100 − 50 = **50**. The error is −50.",
          "A smaller DT shrinks the error, but it still underestimates.",
          "**DT = 10** (part c): Net(0) = 50 − 100 = −50 and Net(10) = −50.",
          {
            "type": "table",
            "head": [
              "t",
              "Net(t)",
              "Euler stock",
              "True stock"
            ],
            "rows": [
              [
                "0",
                "-50",
                "100",
                "100"
              ],
              [
                "10",
                "-50",
                "100 + 10(-50) = -400",
                "100"
              ],
              [
                "20",
                "-50",
                "-400 + 10(-50) = -900",
                "100"
              ]
            ]
          },
          "DT = 10 is exactly one full cycle, so every step sees the worst value, −50.",
          "Euler heads towards −900 while the real stock just cycles around 100.",
          {
            "type": "note",
            "text": "Lesson: DT must be much smaller than the fastest change in the flows."
          }
        ]
      },
      {
        "heading": "Sheet 2 Q1: ramp-down, flat, ramp-up inflow with constant outflow 50 (stock starts at 100)",
        "items": [
          {
            "type": "p",
            "text": "Sheet 2 Q1: inflow ramps down, stays flat, ramps up"
          },
          "The stock starts at **100**. Outflow is a constant 50. Net = inflow − 50.",
          "**Inflow**: 100 down to 0 over days 0-5 (100 − 20t), 0 over days 5-10, 0 up to 100 over days 10-15 (20(t − 10)), 100 over days 15-20, then 100 down to 0 over days 20-25.",
          {
            "type": "formula",
            "label": "Net flow",
            "text": "Net = 50 - 20t [0,5]; -50 [5,10]; -50 + 20(t - 10) [10,15]; +50 [15,20]; 50 - 20(t - 20) [20,25]"
          },
          {
            "type": "table",
            "head": [
              "Interval (days)",
              "Net flow",
              "Stock behaviour mode",
              "Stock"
            ],
            "rows": [
              [
                "0 - 2.5",
                "+50 falling to 0",
                "rises at a decreasing rate to a peak",
                "100 to 162.5"
              ],
              [
                "2.5 - 5",
                "0 to -50",
                "falls at an increasing rate",
                "162.5 to 100"
              ],
              [
                "5 - 10",
                "constant -50",
                "falls linearly (constant rate); goes negative at t = 7, allowed by the question",
                "100 to -150"
              ],
              [
                "10 - 12.5",
                "-50 rising to 0",
                "falls at a decreasing rate to a trough",
                "-150 to -212.5"
              ],
              [
                "12.5 - 15",
                "0 to +50",
                "rises at an increasing rate",
                "-212.5 to -150"
              ],
              [
                "15 - 20",
                "constant +50",
                "rises linearly",
                "-150 to 100"
              ],
              [
                "20 - 22.5",
                "+50 to 0",
                "rises at a decreasing rate to a peak",
                "100 to 162.5"
              ],
              [
                "22.5 - 25",
                "0 to -50",
                "falls at an increasing rate",
                "162.5 to 100"
              ]
            ]
          },
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Sheet 2 Q1: net flow and exact stock",
              "xLabel": "Days",
              "yLabel": "Units/day and units",
              "series": [
                {
                  "name": "Net flow",
                  "points": [
                    [
                      0,
                      50
                    ],
                    [
                      2.5,
                      0
                    ],
                    [
                      5,
                      -50
                    ],
                    [
                      10,
                      -50
                    ],
                    [
                      12.5,
                      0
                    ],
                    [
                      15,
                      50
                    ],
                    [
                      20,
                      50
                    ],
                    [
                      22.5,
                      0
                    ],
                    [
                      25,
                      -50
                    ]
                  ]
                },
                {
                  "name": "Stock (exact)",
                  "points": [
                    [
                      0,
                      100
                    ],
                    [
                      1,
                      140
                    ],
                    [
                      2,
                      160
                    ],
                    [
                      2.5,
                      162.5
                    ],
                    [
                      3,
                      160
                    ],
                    [
                      4,
                      140
                    ],
                    [
                      5,
                      100
                    ],
                    [
                      6,
                      50
                    ],
                    [
                      7,
                      0
                    ],
                    [
                      8,
                      -50
                    ],
                    [
                      9,
                      -100
                    ],
                    [
                      10,
                      -150
                    ],
                    [
                      11,
                      -190
                    ],
                    [
                      12,
                      -210
                    ],
                    [
                      12.5,
                      -212.5
                    ],
                    [
                      13,
                      -210
                    ],
                    [
                      14,
                      -190
                    ],
                    [
                      15,
                      -150
                    ],
                    [
                      16,
                      -100
                    ],
                    [
                      17,
                      -50
                    ],
                    [
                      18,
                      0
                    ],
                    [
                      19,
                      50
                    ],
                    [
                      20,
                      100
                    ],
                    [
                      21,
                      140
                    ],
                    [
                      22,
                      160
                    ],
                    [
                      22.5,
                      162.5
                    ],
                    [
                      23,
                      160
                    ],
                    [
                      24,
                      140
                    ],
                    [
                      25,
                      100
                    ]
                  ]
                }
              ]
            },
            "caption": "Stock returns to 100 at t = 25 because total inflow area (1250) equals total outflow area (1250)."
          },
          "The stock returns to 100 at t = 25 because total inflow (1250) equals total outflow (1250).",
          {
            "type": "p",
            "text": "Part (b): Euler with DT = 0.5"
          },
          "From 0 to 2.5 the net flow is **decreasing** (50 to 0), so Euler **overestimates**.",
          "Net values at t = 0, 0.5, 1, 1.5, 2 are 50, 40, 30, 20, 10.",
          "Stock at t = 0.5 to 2.5 is 125, 145, 160, 170, 175.",
          "The true value is 162.5, so the error is **+12.5**.",
          {
            "type": "p",
            "text": "Part (c): DT = 5"
          },
          "Net flow at t = 0, 5, 10, 15, 20 is +50, −50, −50, +50, +50.",
          {
            "type": "table",
            "head": [
              "t",
              "Net(t)",
              "Euler stock S(t)",
              "True stock"
            ],
            "rows": [
              [
                "0",
                "+50",
                "100",
                "100"
              ],
              [
                "5",
                "-50",
                "100 + 5(50) = 350",
                "100"
              ],
              [
                "10",
                "-50",
                "350 + 5(-50) = 100",
                "-150"
              ],
              [
                "15",
                "+50",
                "100 + 5(-50) = -150",
                "-150"
              ],
              [
                "20",
                "+50",
                "-150 + 5(50) = 100",
                "100"
              ],
              [
                "25",
                "-",
                "100 + 5(50) = 350",
                "100"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Answer template: \"describe Euler's method and its assumptions\"",
        "items": [
          {
            "type": "p",
            "text": "\"Describe Euler's method and its assumptions\""
          },
          "**1.** Write the equation and say what each symbol means.",
          "**2.** The idea: step through time, using today's flows to predict the next stock value.",
          "**3.** Assumptions: flows constant during each DT, and DT small.",
          "**4.** Say when it overestimates (net flow falling) and underestimates (net flow rising).",
          "**5.** Back it up with a number from the chart: compare Euler with the exact area."
        ]
      }
    ],
    "pitfalls": [
      "Use the flow at the **start** of the step, not the end.",
      "Do not forget to multiply by DT.",
      "Rising net flow means Euler underestimates. Falling means it overestimates.",
      "Write an equation for each line segment of a chart (slope × t + intercept) and check the corners.",
      "Say how the stock moves (\"rising more slowly\") and where it turns, not just \"up\" or \"down\".",
      "Draw Net Flow on the stock and flow diagram, linked from every flow."
    ]
  },
  {
    "id": "stocks-flows-basics",
    "title": "Stock and flow diagrams: notation and conventions",
    "priority": 12,
    "tier": "likely",
    "freq": "est. high (asked in every model-building question)",
    "marks": "3-5 marks per diagram",
    "summary": "**Stocks (boxes) accumulate; flows (valves on pipes) change stocks; clouds mark the system boundary; auxiliaries (variables) and constants feed flows via information links, never directly into stocks.**",
    "mnemonic": "Boxes hold, valves move, clouds bound, arrows inform",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026",
      "CT561_Notes_09_Disease_Modelling_2"
    ],
    "sections": [
      {
        "heading": "Building blocks",
        "items": [
          "**Stock** (rectangle): a quantity that accumulates and can be measured at one instant (population, backlog, staff, bank balance). Only changed by flows; has an initial value.",
          "**Flow** (pipe with valve): rate of change per unit time (people/day). Inflow adds, outflow subtracts. A flow has units of stock/time.",
          "**Cloud**: a source or sink outside the model boundary (infinite supply or disposal).",
          "**Auxiliary / variable**: calculated from other variables at each time step (for example Work Pressure, force of infection).",
          "**Constant / parameter**: fixed input (R0, D, N, adjustment time).",
          "**Information link (thin arrow)**: shows that one variable is used in the equation of another; it does not move material. Material only moves along flow pipes.",
          "Conservation: in the SIR model S + I + R = N always (closed population, flows move people between stocks)."
        ]
      },
      {
        "heading": "Rules for drawing a correct model",
        "items": [
          "Every stock needs at least one flow; every flow needs a stock at one end or a cloud.",
          "Units must match: flow = quantity / time.",
          "Links go from the variable used to the variable that uses it, with a polarity (+/-) when you are asked for feedback.",
          "Use a **flag** (0 or 1) to switch a structure on or off: effective value = parameter x flag.",
          "Initial values: stocks need them (S = N - I0, I = I0, R = 0); an equilibrium start means inflows = outflows at t = 0."
        ]
      },
      {
        "heading": "Typical equations",
        "items": [
          {
            "type": "formula",
            "label": "Stock equation (Euler form)",
            "text": "Stock(t + DT) = Stock(t) + DT x (Inflow - Outflow)"
          },
          {
            "type": "formula",
            "label": "Continuous form",
            "text": "d(Stock)/dt = Inflow - Outflow, Stock(0) = initial value"
          },
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Generic stock and flow",
              "height": 200,
              "nodes": [
                {
                  "id": "c1",
                  "label": "src",
                  "x": 5,
                  "y": 50
                },
                {
                  "id": "st",
                  "label": "Stock",
                  "sub": "initial value",
                  "x": 50,
                  "y": 50,
                  "color": 1
                },
                {
                  "id": "c2",
                  "label": "snk",
                  "x": 95,
                  "y": 50
                },
                {
                  "id": "aux",
                  "label": "Net Flow",
                  "x": 50,
                  "y": 5,
                  "color": 2
                }
              ],
              "edges": [
                {
                  "from": "c1",
                  "to": "st",
                  "label": "Inflow"
                },
                {
                  "from": "st",
                  "to": "c2",
                  "label": "Outflow"
                },
                {
                  "from": "st",
                  "to": "aux",
                  "curve": 25
                }
              ]
            },
            "caption": "Material flows along the pipes; the net flow auxiliary is calculated from the flows (draw links from both flows to it)."
          }
        ]
      }
    ],
    "pitfalls": [
      "Drawing an information arrow straight into a stock: stocks change only through flows.",
      "Forgetting clouds or giving a flow no units.",
      "Omitting initial values and parameters in \"design a model with equations\" questions."
    ]
  },
  {
    "id": "basic-flow-structures",
    "title": "Fractional increase, fractional decrease and adjustment to a goal",
    "priority": 9,
    "tier": "core",
    "freq": "est. high (Sheet 1 Q2a 6 marks; Sheet 2 Q2a 8 marks)",
    "marks": "6-8 marks",
    "summary": "**Fractional increase (inflow = Stock x fraction) gives exponential growth (R loop); fractional decrease (outflow = Stock x fraction, or Stock/lifetime) gives exponential decay (B loop); adjustment to a goal (flow = (Goal - Stock)/AT) gives S-shaped or goal-seeking behaviour (B loop).**",
    "mnemonic": "Grow by fraction R, decay by fraction B, chase a goal B",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Fractional increase rate",
        "items": [
          {
            "type": "formula",
            "label": "Fractional increase",
            "text": "Inflow = Stock x g,  g = fractional growth rate (per time unit)"
          },
          "Reinforcing loop: bigger stock, bigger inflow, bigger stock. Behaviour: **exponential growth**, Stock(t) = Stock(0) e^(g t); doubling time about 0.69 / g.",
          "Examples: population births (births = population x birth fraction), compound interest, early epidemic growth (contagion loop), viral content.",
          "Numeric: Stock = 100, g = 0.10 per year, DT = 1: inflow 10, then stock 110 gives inflow 11, stock 121, inflow 12.1, stock 133.1."
        ]
      },
      {
        "heading": "Fractional decrease rate",
        "items": [
          {
            "type": "formula",
            "label": "Fractional decrease",
            "text": "Outflow = Stock x f = Stock / L,  f = fractional decrease rate, L = 1/f = average lifetime"
          },
          "Balancing loop: bigger stock, bigger outflow, smaller stock. Behaviour: **exponential decay** towards zero, Stock(t) = Stock(0) e^(-f t); half-life about 0.69 L.",
          "Examples: staff quits (quits = staff x quit fraction), recovery (recovery = Infected / D), radioactive decay, depreciation, customer churn.",
          "Numeric: Stock = 100, f = 0.2 per month, DT = 1: outflow 20, stock 80, outflow 16, stock 64, outflow 12.8, stock 51.2."
        ]
      },
      {
        "heading": "Adjustment to a goal (goal seeking)",
        "items": [
          {
            "type": "formula",
            "label": "Adjustment to a goal",
            "text": "Net flow = (Goal - Stock) / AT,  AT = adjustment time (time constant)"
          },
          "Discrepancy = Goal - Stock; the flow closes a fraction 1/AT of the gap each time unit. Balancing loop. Behaviour: **goal-seeking, exponential approach** that is fast at first and slows as the gap closes; about 63% of the gap closed after one AT and 95% after 3 AT.",
          "Examples: room temperature to thermostat setting, workforce moving to a target, pressure to clean up the environment, a vaccination fraction moving to its maximum.",
          "Numeric: Goal = 100, Stock = 20, AT = 4, DT = 1: flow 20 then stock 40, flow 15 then stock 55, flow 11.25 then stock 66.25, flow 8.4 then stock 74.7.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "The three structures, each starting at 20 (goal 100, rate 0.1, AT 4)",
              "xLabel": "Time",
              "yLabel": "Stock",
              "series": [
                {
                  "name": "Fractional increase (g = 0.1)",
                  "points": [
                    [
                      0,
                      20
                    ],
                    [
                      2,
                      24.4
                    ],
                    [
                      4,
                      29.8
                    ],
                    [
                      6,
                      36.4
                    ],
                    [
                      8,
                      44.5
                    ],
                    [
                      10,
                      54.4
                    ],
                    [
                      12,
                      66.4
                    ],
                    [
                      14,
                      81.1
                    ],
                    [
                      16,
                      99.1
                    ]
                  ]
                },
                {
                  "name": "Fractional decrease (f = 0.1)",
                  "points": [
                    [
                      0,
                      20
                    ],
                    [
                      2,
                      16.4
                    ],
                    [
                      4,
                      13.4
                    ],
                    [
                      6,
                      11
                    ],
                    [
                      8,
                      9
                    ],
                    [
                      10,
                      7.4
                    ],
                    [
                      12,
                      6
                    ],
                    [
                      14,
                      4.9
                    ],
                    [
                      16,
                      4
                    ]
                  ]
                },
                {
                  "name": "Adjustment to goal (AT = 4)",
                  "points": [
                    [
                      0,
                      20
                    ],
                    [
                      2,
                      51.5
                    ],
                    [
                      4,
                      70.6
                    ],
                    [
                      6,
                      82.1
                    ],
                    [
                      8,
                      89.2
                    ],
                    [
                      10,
                      93.4
                    ],
                    [
                      12,
                      96
                    ],
                    [
                      14,
                      97.6
                    ],
                    [
                      16,
                      98.5
                    ]
                  ]
                }
              ]
            },
            "caption": "Continuous-time values computed from the exact solutions."
          }
        ]
      },
      {
        "heading": "Expected enrolments structure (Sheet 2 Q4a, 5 marks)",
        "items": [
          "Given: stock **Students** with inflow **Enrolments** and outflow **Graduations** (both clouds). Task: add a stock and flow structure, with equations, that models **expected enrolments**.",
          "Idea: managers do not see the true future inflow; they form an expectation by **smoothing past enrolments** (first-order information delay, an adjustment-to-a-goal where the goal is the actual Enrolments). Expected Enrolments can then drive planning (for example Desired Staff = Expected Enrolments x programme length / student-staff ratio).",
          {
            "type": "table",
            "head": [
              "Variable",
              "Equation",
              "Initial"
            ],
            "rows": [
              [
                "Students (stock)",
                "Students + DT x (Enrolments - Graduations)",
                "400 (example)"
              ],
              [
                "Graduations",
                "Students / Programme Duration (a material delay, 4 years)",
                "100 per year"
              ],
              [
                "Enrolments",
                "Applications x Acceptance Fraction, or an exogenous input (step/ramp)",
                "100 per year"
              ],
              [
                "Expected Enrolments (new stock)",
                "Expected + DT x Change in Expected Enrolments",
                "100 = Enrolments (start in equilibrium)"
              ],
              [
                "Change in Expected Enrolments (new flow)",
                "(Enrolments - Expected Enrolments) / Time to Perceive Enrolments",
                "0"
              ],
              [
                "Time to Perceive Enrolments",
                "constant, e.g. 3 years",
                "3"
              ]
            ]
          },
          "Link polarities: Enrolments to Change in Expected +; Expected Enrolments to Change in Expected - (balancing loop, goal seeking: the expectation chases reality); Time to Perceive to Change -. Expected Enrolments to whatever it drives (+).",
          "Numeric check (Enrolments steps from 100 to 120 at year 2, time to perceive 3, DT = 1): Expected = 100, 100, 100, 106.67, 111.11, 114.07 at years 0-5, closing 1/3 of the gap each year and lagging reality (63% after one time constant).",
          "Alternative accepted structure: Expected Enrolments as a trend or as an adjustment to a demand goal (Applications), same form: change = (goal - expected)/adjustment time."
        ]
      },
      {
        "heading": "Varying decrease fraction (Sheet 2 Q2a)",
        "items": [
          "Problem: stock S with outflow = S x G where the fraction G itself changes over time, moving to a maximum G* with adjustment constant AT.",
          {
            "type": "formula",
            "label": "Equations",
            "text": "Outflow = S x G;  G(t + DT) = G(t) + DT x (G* - G)/AT;  G(0) = initial fraction (for example 0)"
          },
          "Treat G as a second stock: its only flow is the adjustment inflow (G* - G)/AT, a balancing goal-seeking loop. S has the usual balancing loop (S up, outflow up, S down). G is not affected by S, so G is exogenous to the S loop.",
          "Real-world use: **vaccination fraction** ramping up as capacity is built, the staff quit fraction rising as morale falls, a policy whose effect phases in gradually, customers adopting a technology, drug resistance building up, or a person gradually changing behaviour. It models a policy or behaviour that does not switch on instantly but is implemented gradually.",
          "Effect: slow start (G small so the outflow is small), then the decay accelerates as G rises, then levels at the rate set by G*; S follows an S-like reduction curve rather than a pure exponential."
        ]
      }
    ],
    "pitfalls": [
      "Writing Goal - Stock the wrong way round (flow would push the stock away from its goal).",
      "Calling goal seeking \"linear\": it is exponential approach, never actually reaching the goal in finite time.",
      "Forgetting to say which loop type each structure creates (increase = R, decrease = B, goal = B).",
      "For the varying fraction question, forgetting that G needs its own initial value and its own equation."
    ]
  },
  {
    "id": "feedback-polarity",
    "title": "Feedback, link polarity and loop polarity",
    "priority": 6,
    "tier": "core",
    "freq": "est. high (Sheet 1 Q1a, Q1c; Sheet 2 Q3a, Q3c)",
    "marks": "5-8 marks",
    "summary": "**A feedback loop is a closed chain of causal links where a variable eventually influences itself; link polarity (+ same direction, - opposite) decides the loop type: an even number of negative links is reinforcing (R, growth/collapse), an odd number is balancing (B, goal seeking).**",
    "mnemonic": "Count the minuses: even = Reinforcing, odd = Balancing",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026",
      "CT561_Notes_09_Disease_Modelling_2"
    ],
    "sections": [
      {
        "heading": "Definitions",
        "items": [
          "**Feedback**: causality that forms a closed loop; a change in a variable travels round the chain and comes back to change the variable itself.",
          "**Link polarity**: sign on a causal link A to B. **Positive (+)**: if A increases, B increases above what it would otherwise have been (and if A decreases, B decreases). **Negative (-)**: if A increases, B decreases (opposite direction).",
          "**Loop polarity**: the type of loop obtained by multiplying the link signs, i.e. counting negative links. **Even number (including zero) of negatives: reinforcing (R)**. **Odd number: balancing (B)**.",
          "Stock-flow links: inflow to stock is +, outflow to stock is -. A flow that drains the stock gives a negative link.",
          "**Reinforcing loop**: amplifies change (exponential growth or collapse, vicious or virtuous circle); in the SIR model, the Contagion loop.",
          "**Balancing loop**: counteracts change and seeks a goal or equilibrium; in SIR the Depletion loop and the Recovery loop."
        ]
      },
      {
        "heading": "Behaviour",
        "items": [
          "R loop alone: exponential growth (or decay if it starts falling). B loop alone: goal-seeking (exponential approach); with a delay in the loop it can **oscillate** around the goal.",
          "Real systems have both; the behaviour depends on which loop dominates, and dominance shifts over time (shifting loop dominance, for example an epidemic: R dominates early, B dominates after the peak).",
          "**Advantages of adding feedback structures to a stock and flow model**: the model generates behaviour endogenously instead of by imposed inputs; captures the policy response (managers react to a gap); shows why systems resist change or grow; allows testing policies; reveals unintended side effects; explains oscillation, overshoot and goal seeking."
        ]
      },
      {
        "heading": "Procedure to find loop polarity (use in every question)",
        "items": [
          "1. Write the loop as a cycle of variables starting at the stock. 2. Put a sign on every link. 3. Trace an increase of the stock around the loop and see whether it comes back as an increase (reinforcing) or a decrease (balancing). 4. Cross-check by counting negatives. 5. Name the loop and mark it R or B on the diagram."
        ]
      },
      {
        "heading": "Worked example: Sheet 2 Q3(a) environment loop",
        "items": [
          "Loop: Environmental Quality to Pressure to Clean Up Environment to Cleanup Effort back to Environmental Quality.",
          "Signs: Environmental Quality to Pressure is **negative** (the better the quality, the less the pressure); Pressure to Cleanup Effort is **positive**; Cleanup Effort to Environmental Quality is **positive**.",
          "One negative link (odd), so the loop is **balancing**. Trace: quality falls, pressure rises, effort rises, quality rises again: it corrects the change.",
          "Behaviour: goal seeking: quality is pulled towards the level where pressure is zero (the goal). With delays in effort or environment response the loop would overshoot and oscillate around the goal; with no delay it approaches smoothly.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Environment balancing loop (B)",
              "directed": true,
              "height": 280,
              "nodes": [
                {
                  "id": "p",
                  "label": "Pressure to Clean Up",
                  "x": 50,
                  "y": 5
                },
                {
                  "id": "e",
                  "label": "Cleanup Effort",
                  "x": 90,
                  "y": 85
                },
                {
                  "id": "q",
                  "label": "Environmental Quality",
                  "x": 10,
                  "y": 85
                }
              ],
              "edges": [
                {
                  "from": "q",
                  "to": "p",
                  "label": "-",
                  "curve": -25
                },
                {
                  "from": "p",
                  "to": "e",
                  "label": "+",
                  "curve": -25
                },
                {
                  "from": "e",
                  "to": "q",
                  "label": "+",
                  "curve": -25
                }
              ]
            },
            "caption": "One negative link: balancing."
          }
        ]
      }
    ],
    "pitfalls": [
      "Defining polarity of a link as \"good/bad\": it is about direction of change, not desirability.",
      "Forgetting that outflow to stock is a negative link.",
      "Counting only the policy links and missing the final link back into the stock.",
      "Saying a balancing loop always stabilises: with delays it can oscillate.",
      "Not tracing an actual increase (the question says \"confirm polarity by tracing\")."
    ]
  },
  {
    "id": "workload-backlog-models",
    "title": "Workload / backlog models: policy loops and side-effect loops",
    "priority": 5,
    "tier": "core",
    "freq": "est. very high (Sheet 1 Q1b,c; Sheet 2 Q3b,c: 12 + 7-8 marks)",
    "marks": "19-20 marks",
    "summary": "**Work piles up as a backlog, which creates pressure. Each response to the pressure helps at first, but has a side effect that adds work back or slows you down.**",
    "mnemonic": "Pressure triggers POLICIES (B loops); policies leak SIDE EFFECTS (R loops)",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Generic structure",
        "items": [
          "**Backlog** is a stock: work waiting to be done.",
          "**Goes in**: new work and **rework** (work redone because it was wrong).",
          "**Goes out**: completed work.",
          "More backlog means more **work pressure**.",
          "Pressure triggers responses (**policies**), such as working longer.",
          {
            "type": "p",
            "text": "Two kinds of loop"
          },
          "**Policy loops are balancing**: pressure rises, you respond, more gets done, backlog falls.",
          "**Side-effect loops are reinforcing**: the response also causes rework or tiredness, so the backlog grows again.",
          "**Delays** (hiring, training, fatigue building up) make effects arrive late and can cause swings and over-reaction."
        ]
      },
      {
        "heading": "Sheet 1 Q1: Assignment Backlog (student workload)",
        "items": [
          {
            "type": "p",
            "text": "Sheet 1 Q1: student assignment backlog"
          },
          "A **+** link means both move the same way. A **−** link means they move opposite ways.",
          "**Into the backlog**: Allocated +, Rework +. **Out**: Completed −.",
          "**Backlog**: more of it raises Work Pressure (+).",
          "**Pressure**: Time per Assignment (−), Weekly Study Hours (+), Time to Submit, such as an extension (+).",
          "**Time per Assignment**: Rework (−), Completed (−).",
          "**Study Hours**: Completed (+), Fatigue (+).",
          "**Time to Submit**: Work Pressure (−). **Fatigue**: Completed (−).",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Assignment backlog model (link polarities)",
              "height": 520,
              "nodes": [
                {
                  "id": "alloc",
                  "label": "Allocated",
                  "x": 5,
                  "y": 5
                },
                {
                  "id": "rew",
                  "label": "Rework",
                  "x": 5,
                  "y": 40
                },
                {
                  "id": "bl",
                  "label": "Assignment Backlog",
                  "x": 40,
                  "y": 20,
                  "color": 1
                },
                {
                  "id": "comp",
                  "label": "Completed",
                  "x": 80,
                  "y": 40
                },
                {
                  "id": "wp",
                  "label": "Work Pressure",
                  "x": 40,
                  "y": 50,
                  "color": 2
                },
                {
                  "id": "tpa",
                  "label": "Time Per Assignment",
                  "x": 10,
                  "y": 80
                },
                {
                  "id": "swh",
                  "label": "Weekly Study Hours",
                  "x": 55,
                  "y": 85
                },
                {
                  "id": "tts",
                  "label": "Amount of Time to Submit",
                  "x": 85,
                  "y": 65
                },
                {
                  "id": "fat",
                  "label": "Fatigue",
                  "x": 90,
                  "y": 90
                }
              ],
              "edges": [
                {
                  "from": "alloc",
                  "to": "bl",
                  "label": "+"
                },
                {
                  "from": "rew",
                  "to": "bl",
                  "label": "+"
                },
                {
                  "from": "comp",
                  "to": "bl",
                  "label": "-"
                },
                {
                  "from": "bl",
                  "to": "wp",
                  "label": "+"
                },
                {
                  "from": "wp",
                  "to": "tpa",
                  "label": "-"
                },
                {
                  "from": "wp",
                  "to": "swh",
                  "label": "+"
                },
                {
                  "from": "wp",
                  "to": "tts",
                  "label": "+"
                },
                {
                  "from": "tpa",
                  "to": "rew",
                  "label": "-"
                },
                {
                  "from": "tpa",
                  "to": "comp",
                  "label": "-",
                  "curve": 20
                },
                {
                  "from": "swh",
                  "to": "comp",
                  "label": "+"
                },
                {
                  "from": "swh",
                  "to": "fat",
                  "label": "+"
                },
                {
                  "from": "tts",
                  "to": "wp",
                  "label": "-",
                  "curve": 20
                },
                {
                  "from": "fat",
                  "to": "comp",
                  "label": "-",
                  "curve": -20
                }
              ]
            },
            "caption": "Flows drawn as nodes for the causal view; in the stock and flow diagram Allocated, Rework (inflows) and Completed (outflow) are valves on the Backlog stock."
          },
          {
            "type": "table",
            "head": [
              "Loop",
              "Path",
              "Negatives",
              "Type"
            ],
            "rows": [
              [
                "B1 Work harder",
                "Backlog +, Work Pressure +, Weekly Study Hours +, Completed -, Backlog",
                "1",
                "Balancing"
              ],
              [
                "B2 Cut time per assignment",
                "Backlog +, Work Pressure -, Time Per Assignment -, Completed -, Backlog",
                "3",
                "Balancing"
              ],
              [
                "B3 Deadline extension",
                "Work Pressure +, Amount of Time to Submit -, Work Pressure",
                "1",
                "Balancing"
              ],
              [
                "R1 Rework (side effect of B2)",
                "Backlog +, Work Pressure -, Time Per Assignment -, Rework +, Backlog",
                "2",
                "Reinforcing"
              ],
              [
                "R2 Fatigue (side effect of B1)",
                "Backlog +, Work Pressure +, Weekly Study Hours +, Fatigue -, Completed -, Backlog",
                "2",
                "Reinforcing"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Trace each loop, starting \"backlog goes up\""
          },
          "**B1** (study more): pressure up, hours up, completed up, backlog down.",
          "**B2** (rush): pressure up, time per assignment down, completed up, backlog down.",
          "**B3** (extension): pressure up, time to submit up, pressure down.",
          "**R1** (rushing causes mistakes): time per assignment down, rework up, backlog up.",
          "**R2** (tiredness): hours up, fatigue up, completed down, backlog up."
        ]
      },
      {
        "heading": "Sheet 2 Q3: Claims Backlog (insurance)",
        "items": [
          {
            "type": "p",
            "text": "Sheet 2 Q3: insurance claims backlog"
          },
          "**Into the backlog**: New Claims +, Reworked Claims +. **Out**: Claims Completed −.",
          "**Backlog** raises Work Pressure (+).",
          "**Pressure**: Time per Claim (−), Temporary Staff (+), Workweek length (+).",
          "**Raise claims completed**: Temporary Staff (+), Workweek (+).",
          "**Time per Claim**: Claims Completed (−), Reworked Claims (−).",
          "**Side effects**: Temporary Staff raises Time per Claim (+). Workweek raises Fatigue (+). Fatigue lowers Claims Completed (−).",
          {
            "type": "table",
            "head": [
              "Loop",
              "Path (start at Backlog)",
              "Negatives",
              "Type"
            ],
            "rows": [
              [
                "Policy B1: reduce time per claim",
                "Work Pressure +, Time per Claim -, Completed -, Backlog",
                "3",
                "Balancing"
              ],
              [
                "Policy B2: temporary staff",
                "Work Pressure +, Temp Staff +, Completed +, Backlog -",
                "1",
                "Balancing"
              ],
              [
                "Policy B3: longer workweek",
                "Work Pressure +, Workweek +, Completed +, Backlog -",
                "1",
                "Balancing"
              ],
              [
                "Side effect R1: rework",
                "Work Pressure +, Time per Claim -, Reworked Claims -, Backlog +",
                "2",
                "Reinforcing"
              ],
              [
                "Side effect R2: temp staff slow time per claim",
                "Work Pressure +, Temp Staff +, Time per Claim +, Completed -, Backlog -",
                "2",
                "Reinforcing"
              ],
              [
                "Side effect R3: fatigue",
                "Work Pressure +, Workweek +, Fatigue +, Completed -, Backlog -",
                "2",
                "Reinforcing"
              ]
            ]
          },
          "There is also an extra helpful loop: temporary staff raise time per claim, which reduces rework.",
          "The three side-effect loops that undermine the responses are **R1, R2 and R3**.",
          "In the stock and flow diagram the claim flows are valves on the Backlog stock: inflows +, outflow −."
        ]
      },
      {
        "heading": "Discussion: best response to a workload increase (Sheet 2 Q3c)",
        "items": [
          {
            "type": "p",
            "text": "Sheet 2 Q3c: what is the best response to more work?"
          },
          "**Spend less time per claim**: fast, but quality drops and rework grows (R1). Possibly a net loss. Short term only, if at all.",
          "**Longer week**: works at once, but tiredness builds up (R3) and overtime costs money. Short peaks only.",
          "**Temporary staff**: adds capacity without much loss of quality. They need training, which slows work at first (R2), and hiring takes time. Still the most sustainable.",
          {
            "type": "p",
            "text": "Recommendation"
          },
          "Mainly **temporary staff**, plus a short spell of longer weeks to cover the hiring delay.",
          "Do not cut time per claim.",
          "Watch rework and fatigue as early warnings, and reduce incoming work if you can.",
          "**Link to feedback**: each response is a balancing loop with a reinforcing side effect. Pick the one whose side effect is weakest and slowest."
        ]
      }
    ],
    "pitfalls": [
      "The rushing policy loop has **three** negative links, so it is balancing.",
      "The extension loop only goes through Work Pressure and Time to Submit, not the backlog.",
      "Mark every link with + or − and every loop with R or B.",
      "Trace the loops if asked, do not just name them.",
      "Completed is an outflow (−). Rework is an inflow (+)."
    ]
  }
];
