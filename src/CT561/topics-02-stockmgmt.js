module.exports = [
  {
    "id": "stock-management",
    "title": "Stock management structure: anchor + adjustment",
    "priority": 3,
    "tier": "core",
    "freq": "est. very high (Sheet 1 Q2b, Sheet 2 Q4b)",
    "marks": "5-7 marks (plus model parts)",
    "summary": "**To keep a stock on target when it is always draining, the inflow needs two parts: replace what you expect to lose (the anchor) plus close the gap to the target (the adjustment).**",
    "mnemonic": "ANCHOR holds the level, ADJUSTMENT closes the gap",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "From adjustment to a goal to stock management",
        "items": [
          "**Example**: keeping the right number of staff while people keep quitting.",
          {
            "type": "p",
            "text": "First attempt: adjust towards a goal"
          },
          "Net flow = (Goal − Stock) / AT, where **AT** is the adjustment time (how quickly you close the gap).",
          "This works if nothing else drains the stock.",
          "**Problem**: if people quit (or stock sells), the stock settles **below** the goal and stays there.",
          "**Fix**: add an **anchor** that replaces the expected losses. This is the stock management structure.",
          {
            "type": "formula",
            "label": "Stock management structure",
            "text": "Inflow (Hire Rate) = MAX(0, Anchor + Adjustment)"
          },
          {
            "type": "formula",
            "label": "Adjustment",
            "text": "Adjustment = (Desired Stock - Stock) / AT,  AT = adjustment time"
          },
          {
            "type": "formula",
            "label": "Anchor",
            "text": "Anchor = Expected Outflow (smoothed outflow); in steady state Anchor = Outflow"
          },
          {
            "type": "p",
            "text": "The two parts"
          },
          "**Anchor**: the flow that would keep the stock level. It replaces what is lost (e.g. quits), usually smoothed.",
          "**Adjustment**: the correction for the gap, spread over AT. Positive when below target, negative when above.",
          "**Difference from plain goal-seeking**: the anchor. Without it you never quite reach the goal while there is an outflow.",
          "**MAX(0, ...)**: an inflow cannot be negative (you cannot \"un-hire\").",
          "If the target drops a lot, hiring stops until people leaving brings the number down."
        ]
      },
      {
        "heading": "The delay structure that builds the anchor",
        "items": [
          "Managers do not know the outflow instantly. So the anchor is an **expected outflow** that catches up gradually (**exponential smoothing**).",
          "**Build it** as a stock called Expected Quits.",
          "Its only flow is the change: (actual quits − expected quits) / smoothing time.",
          "**Start** it at the initial quit rate.",
          {
            "type": "formula",
            "label": "Anchor delay structure",
            "text": "Expected Quits(t + DT) = Expected Quits(t) + DT x (Quits - Expected Quits)/Time to Adjust Expectation"
          },
          "It is goal-seeking again: the goal is the actual quit rate.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Stock management structure (staff)",
              "height": 420,
              "nodes": [
                {
                  "id": "hire",
                  "label": "Hire Rate",
                  "x": 10,
                  "y": 40
                },
                {
                  "id": "staff",
                  "label": "Staff",
                  "x": 45,
                  "y": 40,
                  "color": 1
                },
                {
                  "id": "quits",
                  "label": "Quits",
                  "x": 85,
                  "y": 40
                },
                {
                  "id": "adj",
                  "label": "Adjustment",
                  "x": 10,
                  "y": 90
                },
                {
                  "id": "des",
                  "label": "Desired Staff",
                  "x": 45,
                  "y": 95,
                  "color": 2
                },
                {
                  "id": "anch",
                  "label": "Expected Quits (anchor)",
                  "x": 50,
                  "y": 5,
                  "color": 3
                },
                {
                  "id": "at",
                  "label": "AT",
                  "x": 25,
                  "y": 98
                }
              ],
              "edges": [
                {
                  "from": "hire",
                  "to": "staff",
                  "label": "+"
                },
                {
                  "from": "staff",
                  "to": "quits",
                  "label": "+"
                },
                {
                  "from": "quits",
                  "to": "staff",
                  "label": "-",
                  "curve": 25
                },
                {
                  "from": "staff",
                  "to": "adj",
                  "label": "-"
                },
                {
                  "from": "des",
                  "to": "adj",
                  "label": "+"
                },
                {
                  "from": "at",
                  "to": "adj",
                  "label": "-"
                },
                {
                  "from": "adj",
                  "to": "hire",
                  "label": "+"
                },
                {
                  "from": "quits",
                  "to": "anch",
                  "label": "+",
                  "curve": 15
                },
                {
                  "from": "anch",
                  "to": "hire",
                  "label": "+"
                }
              ]
            },
            "caption": "Loops: B1 adjustment (Staff, Adjustment, Hire Rate, Staff: one negative); B2 attrition (Staff, Quits, Staff); R3 anchor (Staff, Quits, Expected Quits, Hire Rate, Staff: all positive, but it only replaces losses)."
          },
          "**B1 adjustment**: staff, gap, hiring, staff (balancing).",
          "**B2 quitting**: more staff, more quits, fewer staff (balancing).",
          "**R3 anchor**: staff, quits, expected quits, hiring, staff (reinforcing, but it only replaces losses)."
        ]
      },
      {
        "heading": "Behaviour",
        "items": [
          "**Start**: staff = desired staff and expected quits = actual quits. Adjustment is 0, hiring = quits, nothing changes (**equilibrium**).",
          "**Target goes up**: hiring jumps above replacement level, then the gap closes quickly at first and ever more slowly (**goal-seeking**).",
          "**Short AT**: fast, with a bigger hiring spike. With extra delays it may overshoot.",
          "**Long AT**: smooth but slow.",
          "**AT is the main setting** for how quickly the model settles again.",
          "The smoothing time matters less: only while quit numbers are changing.",
          "The same structure works for stock levels in a shop, machine capacity and workforce size."
        ]
      }
    ],
    "pitfalls": [
      "You need **both** anchor and adjustment.",
      "Do not forget MAX(0, ...) on the inflow.",
      "Show the smoothing structure if asked how the anchor is built.",
      "The goal is the desired stock. The anchor is the expected outflow.",
      "Start Expected Quits at its equilibrium value."
    ]
  },
  {
    "id": "delays-smoothing",
    "title": "Delays: first-order smoothing and material delays",
    "priority": 10,
    "tier": "likely",
    "freq": "est. medium (anchor delay structure; pharma progression delays)",
    "marks": "3-5 marks",
    "summary": "**A first-order delay is a stock draining at Stock/Delay Time: an information delay smooths a signal (Smoothed changes by (Input - Smoothed)/ST), a material delay holds items for an average time (Stock = Inflow x Delay at steady state).**",
    "mnemonic": "Outflow = Stock / Delay; average residence time = Delay",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Material delay (first order)",
        "items": [
          "A stock between two flows: Outflow = Stock / Delay Time. Items stay on average Delay Time (average residence time).",
          {
            "type": "formula",
            "label": "First-order material delay",
            "text": "Outflow = Stock / D;  steady state: Stock = Inflow x D"
          },
          "Example: Trainees progress to Experienced at Trainee / 12 per month (progression delay 12 months). With 100 trainees, progression = 8.33 per month.",
          "It is a fractional decrease flow with fraction 1/D; step response of the output is an exponential approach with time constant D."
        ]
      },
      {
        "heading": "Information delay (smoothing)",
        "items": [
          {
            "type": "formula",
            "label": "Exponential smoothing",
            "text": "Smoothed(t + DT) = Smoothed(t) + DT x (Input - Smoothed(t))/ST,  ST = smoothing (perception) time"
          },
          "Models how perceptions, expectations or anchors lag reality. Smoothed value moves 63% towards a step change in one ST.",
          "Material is conserved in a material delay (output eventually equals input); an information delay only passes on a number, nothing is conserved.",
          "Higher-order delays are chains of first-order stocks; they make the output response S-shaped and sharper."
        ]
      },
      {
        "heading": "Why delays matter",
        "items": [
          "In a balancing loop, delays can cause **overshoot and oscillation** (acting on stale information).",
          "In the stock management structure the anchor smoothing and hiring/training delays slow the response.",
          "Euler needs DT well below the smallest delay (a quarter or less)."
        ]
      }
    ],
    "pitfalls": [
      "Using Stock x Delay for the outflow (should be divided).",
      "Treating the smoothing time as the time to reach the goal: about 63% after one ST and 95% after three."
    ]
  },
  {
    "id": "staff-recruitment-models",
    "title": "Staff recruitment models (University and pharmaceutical)",
    "priority": 4,
    "tier": "core",
    "freq": "est. very high (Sheet 1 Q2c 12 marks; Sheet 2 Q4c,d 15 marks)",
    "marks": "10-15 marks",
    "summary": "**Staff are a stock. Hiring replaces expected quits and closes the gap to the number you want. Start the model balanced, change the target, then describe what happens.**",
    "mnemonic": "Desired from the driver; Hire = Anchor + Adjustment; start balanced",
    "source": [
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Sheet 1 Q2c: University staff and students",
        "items": [
          {
            "type": "p",
            "text": "Sheet 1 Q2c: university staff and students"
          },
          "**Given**: 500 staff and 10,000 students, both steady. Wanted: 20 students per staff member, dropping to **10** at time 10. Run to time 30.",
          "**Values you choose (say so)**: quit fraction 0.1, adjustment time AT = 5, smoothing time 2.",
          "Students join and graduate at 0.25 per time unit, so they stay steady (2500 in, 2500 out).",
          "Hire = MAX(0, expected quits + (desired staff − staff) / AT). Quits = staff × quit fraction.",
          {
            "type": "table",
            "head": [
              "Element",
              "Equation",
              "Initial value"
            ],
            "rows": [
              [
                "Students (stock)",
                "Students(t+DT) = Students + DT x (Recruitment - Graduation)",
                "10000"
              ],
              [
                "Recruitment",
                "Students x Recruitment Fraction",
                "2500 (fraction 0.25)"
              ],
              [
                "Graduation",
                "Students x Graduation Fraction",
                "2500 (fraction 0.25)"
              ],
              [
                "Desired Staff",
                "Students / Desired Student Staff Ratio",
                "10000/20 = 500"
              ],
              [
                "Desired Student Staff Ratio",
                "20 for t < 10; 10 for t >= 10 (STEP of -10 at t = 10)",
                "20"
              ],
              [
                "Staff (stock)",
                "Staff(t+DT) = Staff + DT x (Hire Rate - Quits)",
                "500"
              ],
              [
                "Quits",
                "Staff x Quit Fraction",
                "50 (fraction 0.1)"
              ],
              [
                "Expected Quits (anchor stock)",
                "ExpQ(t+DT) = ExpQ + DT x (Quits - ExpQ)/Smoothing Time",
                "50"
              ],
              [
                "Adjustment",
                "(Desired Staff - Staff)/AT",
                "0"
              ],
              [
                "Hire Rate",
                "MAX(0, Expected Quits + Adjustment)",
                "50"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Feedback loops"
          },
          "**B1 staff adjustment** (balancing): fills the gap.",
          "**B2 quits** (balancing): more staff, more quits.",
          "**R3 anchor** (reinforcing): replaces leavers. B2 outweighs it.",
          "Students have their own two flows with balancing loops.",
          {
            "type": "p",
            "text": "Answer 1: describe the plot"
          },
          "Flat at 500 until time 10.",
          "Desired staff then jumps to 1000, so hiring jumps from 50 to 150 (50 replacement + 500 / 5).",
          "Staff rise fast, then ever more slowly, towards 1000.",
          "About 656 at t = 12, 754 at 14, 870 at 18, 905 at 20, 950 at 24 and 980 at 30 (not quite there).",
          "Hiring falls from 150 towards 100, the replacement level for 1000 staff.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Staff after the ratio drops from 20 to 10 at t = 10",
              "xLabel": "Time",
              "yLabel": "Staff",
              "yMin": 400,
              "yMax": 1050,
              "series": [
                {
                  "name": "AT = 2",
                  "points": [
                    [
                      0,
                      500
                    ],
                    [
                      10,
                      500
                    ],
                    [
                      11,
                      694.4
                    ],
                    [
                      12,
                      803.9
                    ],
                    [
                      13,
                      869.3
                    ],
                    [
                      14,
                      910.5
                    ],
                    [
                      16,
                      955.9
                    ],
                    [
                      18,
                      977.5
                    ],
                    [
                      20,
                      988.4
                    ],
                    [
                      22,
                      994
                    ],
                    [
                      24,
                      996.9
                    ],
                    [
                      26,
                      998.4
                    ],
                    [
                      28,
                      999.2
                    ],
                    [
                      30,
                      999.6
                    ]
                  ]
                },
                {
                  "name": "AT = 5",
                  "points": [
                    [
                      0,
                      500
                    ],
                    [
                      10,
                      500
                    ],
                    [
                      11,
                      588.3
                    ],
                    [
                      12,
                      656
                    ],
                    [
                      13,
                      710
                    ],
                    [
                      14,
                      754.1
                    ],
                    [
                      16,
                      821.7
                    ],
                    [
                      18,
                      870
                    ],
                    [
                      20,
                      905.1
                    ],
                    [
                      22,
                      930.6
                    ],
                    [
                      24,
                      949.3
                    ],
                    [
                      26,
                      962.9
                    ],
                    [
                      28,
                      972.9
                    ],
                    [
                      30,
                      980.2
                    ]
                  ]
                },
                {
                  "name": "AT = 10",
                  "points": [
                    [
                      0,
                      500
                    ],
                    [
                      10,
                      500
                    ],
                    [
                      11,
                      546.1
                    ],
                    [
                      12,
                      585.2
                    ],
                    [
                      13,
                      619.5
                    ],
                    [
                      14,
                      650.2
                    ],
                    [
                      16,
                      703.4
                    ],
                    [
                      18,
                      748
                    ],
                    [
                      20,
                      785.8
                    ],
                    [
                      22,
                      817.9
                    ],
                    [
                      24,
                      845.2
                    ],
                    [
                      26,
                      868.4
                    ],
                    [
                      28,
                      888.1
                    ],
                    [
                      30,
                      904.9
                    ]
                  ]
                }
              ]
            },
            "caption": "Euler simulation, DT = 0.125. Answer 2: the adjustment time AT controls how fast the model resets."
          },
          {
            "type": "p",
            "text": "Answer 2: what controls how fast it adjusts?"
          },
          "The **adjustment time (AT)**. Small AT: fast response and bigger hiring spike. Large AT: slow.",
          "The quit fraction also sets how much replacement hiring is needed."
        ]
      },
      {
        "heading": "Sheet 2 Q4c: pharmaceutical company (Trainee, Experienced, Senior)",
        "items": [
          {
            "type": "p",
            "text": "Sheet 2 Q4c: pharmaceutical company"
          },
          "**Three stocks** of 100 each: Trainee, Experienced, Senior.",
          "**Hiring** goes into Trainee.",
          "**Promotion**: Trainee to Experienced = Trainee / 12. Experienced to Senior = Experienced / 36.",
          "**Leaving (attrition)**: Trainee × 0.05, Experienced × 0.03, Senior × 0.01 (taken as per month).",
          {
            "type": "table",
            "head": [
              "Variable",
              "Equation",
              "Initial"
            ],
            "rows": [
              [
                "Trainee",
                "Trainee + DT x (Hire Rate - Progression TE - Attrition T)",
                "100"
              ],
              [
                "Experienced",
                "Experienced + DT x (Progression TE - Progression ES - Attrition E)",
                "100"
              ],
              [
                "Senior",
                "Senior + DT x (Progression ES - Attrition S)",
                "100"
              ],
              [
                "Progression TE / ES",
                "Trainee / 12 ; Experienced / 36",
                "8.33 ; 2.78"
              ],
              [
                "Attrition T / E / S",
                "0.05 x Trainee ; 0.03 x Experienced ; 0.01 x Senior",
                "5 ; 3 ; 1"
              ],
              [
                "Total Employees",
                "Trainee + Experienced + Senior",
                "300"
              ],
              [
                "Target Employees",
                "constant",
                "300"
              ],
              [
                "Total Attrition",
                "sum of three attrition flows",
                "9"
              ],
              [
                "Expected Attrition (anchor stock)",
                "ExpA + DT x (Total Attrition - ExpA)/Smoothing Time (assume 3)",
                "9"
              ],
              [
                "Adjustment",
                "(Target - Total Employees)/AT (assume AT = 6)",
                "0"
              ],
              [
                "Hire Rate",
                "MAX(0, Expected Attrition + Adjustment)",
                "9"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Feedback loops"
          },
          "**B1**: total staff, gap, hiring, then through the three stocks back to total (balancing).",
          "**B2 to B4**: each stock loses people in proportion to its size (balancing).",
          "**B5**: promotion drains the stock it leaves.",
          "**R**: leaving, expected leaving, hiring, total staff.",
          {
            "type": "warn",
            "text": "Honest caveat: 100 in each stock is not a true balance (Experienced gains 8.33 a month but loses 2.78 + 3 = 5.78). The **total** stays at 300, but the mix drifts: fewer trainees, more seniors. State this."
          },
          {
            "type": "p",
            "text": "Sheet 2 Q4d: the target drops to 100"
          },
          "Adjustment = (100 − 300) / 6 = −33.3 per month.",
          "Hiring = MAX(0, 9 − 33.3) = **0**. Hiring stops.",
          "The total can only fall as people leave, so it falls gradually.",
          "About 255 at month 6, 198 at 18, 148 at 36, 111 at 60, 102 at 72.",
          "Hiring restarts at about month 62, and the total settles at 100.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Total employees after the target drops to 100 (AT = 6 months)",
              "xLabel": "Months",
              "yLabel": "Total employees",
              "series": [
                {
                  "name": "Total",
                  "points": [
                    [
                      0,
                      300
                    ],
                    [
                      6,
                      254.7
                    ],
                    [
                      12,
                      222
                    ],
                    [
                      18,
                      197.3
                    ],
                    [
                      24,
                      177.8
                    ],
                    [
                      30,
                      162
                    ],
                    [
                      36,
                      148.8
                    ],
                    [
                      42,
                      137.5
                    ],
                    [
                      48,
                      127.6
                    ],
                    [
                      54,
                      118.9
                    ],
                    [
                      60,
                      111.1
                    ],
                    [
                      66,
                      104.6
                    ],
                    [
                      72,
                      101.7
                    ],
                    [
                      78,
                      100.4
                    ],
                    [
                      84,
                      99.9
                    ],
                    [
                      96,
                      99.7
                    ],
                    [
                      120,
                      99.8
                    ]
                  ]
                }
              ]
            },
            "caption": "Euler simulation DT = 0.05 months. Because you cannot fire staff the hire rate is clipped at zero by MAX(0, ...) and the total declines at the speed of attrition."
          },
          {
            "type": "p",
            "text": "Why it behaves like this"
          },
          "The adjustment is very negative, so MAX holds hiring at 0.",
          "The Trainee stock empties because nobody new arrives.",
          "As staff numbers fall, fewer people leave, and the negative adjustment shrinks.",
          "Once anchor + adjustment is above 0, hiring starts again at the new replacement level."
        ]
      }
    ],
    "pitfalls": [
      "Start in equilibrium: expected quits = actual quits.",
      "Hiring cannot go negative: use MAX.",
      "Desired staff depends on students and the ratio. It is not a fixed number.",
      "In sketches, staff level off smoothly. They do not jump.",
      "When you say how fast it responds, name the adjustment time as the cause."
    ]
  }
];
