module.exports = [
  {
    "id": "r0-herd-immunity",
    "title": "R0, transmission rate, force of infection, Rn and herd immunity threshold",
    "priority": 7,
    "tier": "core",
    "freq": "est. very high (Lecture 9 challenges 10.1; Sheet 1 Q3a)",
    "marks": "5 marks",
    "summary": "**beta = R0/D, force of infection lambda = beta x I/N, Rn = R0 x S/N, herd immunity threshold HIT = 1 - 1/R0: an epidemic grows only while Rn > 1, and vaccinating a fraction above HIT stops it.**",
    "mnemonic": "BETA = R0 over D; LAMBDA = BETA times I/N; HIT = 1 minus 1 over R0",
    "source": [
      "CT561_Notes_09_Disease_Modelling_2",
      "CT561_Problem_Sheet_01_2024-2025"
    ],
    "sections": [
      {
        "heading": "Definitions and formulas",
        "items": [
          "**R0 (basic reproduction number)**: average number of secondary infections one infectious person produces in a **totally susceptible** population. R0 = c x i x d (contacts per day x probability of transmission per contact x duration of infectiousness).",
          "**D** (or d): average duration of infectiousness = **recovery delay** (days); recovery rate = I/D.",
          "**c**: contact rate (contacts per person per day). **i**: infectivity (probability that a contact with an infectious person transmits).",
          {
            "type": "formula",
            "label": "Transmission rate beta (per day)",
            "text": "beta = c x i = R0 / D"
          },
          {
            "type": "formula",
            "label": "Force of infection lambda (per day, per susceptible)",
            "text": "lambda = beta x I / N  (probability per day that a susceptible is infected)"
          },
          {
            "type": "formula",
            "label": "Infection rate",
            "text": "Infection Rate IR = S x lambda = beta x S x I / N = c x i x (S/N) x I"
          },
          "I/N is the **prevalence** (probability that a random contact is infectious); S/N is the chance that a contact is still susceptible.",
          {
            "type": "formula",
            "label": "Net (effective) reproduction number",
            "text": "Rn = R0 x (S/N)  (changes over time as S falls)"
          },
          "Rn: average number of secondary cases per infectious person when some individuals are already immune (by infection or vaccination). **Rn <= 1: no epidemic and the infectious stock falls to zero.**",
          {
            "type": "formula",
            "label": "Herd immunity threshold",
            "text": "HIT = 1 - 1 / R0"
          },
          "Derivation: Rn = 1 when S/N = 1/R0, so the susceptible fraction must be pushed below 1/R0, i.e. immune fraction above 1 - 1/R0. Vaccination coverage above HIT makes substantial outbreaks unlikely (assumes a perfect vaccine and random mixing).",
          "Examples: R0 = 2: HIT 50%. R0 = 4: 75%. R0 = 12 (measles): 91.7%. R0 = 14: 92.9%. Higher R0 means a higher threshold."
        ]
      },
      {
        "heading": "Worked example: Lecture challenge 10.1",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Find beta, lambda and the infection rate."
            ]
          },
          "N = 100,000, 1% infectious (I = 1000), R0 = 14, D = 7 days.",
          "beta = R0/D = 14/7 = **2 per day**. lambda = beta x I/N = 2 x 1000/100000 = **0.02 per day**. (Infection rate = S x lambda = 99,000 x 0.02 = 1,980 people per day.)"
        ]
      },
      {
        "heading": "Worked example: Sheet 1 Q3(a) measles",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Find beta, lambda and the herd immunity threshold."
            ]
          },
          "N = 10,000, 2% infectious (I = 200), R0 = 12, D = 7 days.",
          "beta = 12/7 = 1.714 per day. lambda = 1.714 x 200/10000 = **0.0343 per day** (3.4% of susceptibles infected per day).",
          "HIT = 1 - 1/12 = 0.9167 = **91.7%**, i.e. about 9,167 of 10,000 must be immune."
        ]
      },
      {
        "heading": "Interpretation",
        "items": [
          "If Rn > 1 the infected stock rises; Rn = 1 at the peak; Rn < 1 after the peak.",
          "In the SIR simulation (R0 = 2, N = 10,000) the peak occurs when S/N = 1/R0, i.e. S = 5000 (it is about 5135 at the peak at t = 18, matching).",
          "R0 describes the pathogen in a given population and behaviour, not a constant of nature; measures (c, i, d) change the effective R.",
          "With imperfect vaccine efficacy E the coverage needed is HIT/E (extra, not from the notes)."
        ]
      },
      {
        "heading": "Herd immunity: lecture slide data and the HIT curve",
        "items": [
          "Lecture slide quoted from Fine, Eames and Heymann (\"Herd immunity: a rough guide\"): vaccination programmes aim for coverage **above** the HIT, because if the immune proportion is above it, substantial outbreaks are unlikely.",
          {
            "type": "table",
            "head": [
              "Infection",
              "Serial interval",
              "R0",
              "Herd immunity (slide)"
            ],
            "rows": [
              [
                "Diphtheria",
                "2-30 days",
                "6-7",
                "85%"
              ],
              [
                "Influenza",
                "2-4 days",
                "2-4",
                "50-75%"
              ],
              [
                "Malaria",
                "20 days",
                "5-100",
                "80-99%"
              ],
              [
                "Measles",
                "7-16 days",
                "12-18",
                "83-94%"
              ],
              [
                "Pertussis",
                "5-35 days",
                "12-17",
                "92-94%"
              ]
            ]
          },
          "The slide values are empirical ranges; the formula HIT = 1 - 1/R0 gives 91.7% (R0 12) to 94.4% (R0 18) for measles. Higher R0 means a higher threshold, but the curve flattens: going from R0 5 to R0 10 adds only 10 points, whereas R0 1 to 2 adds 50.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Herd immunity threshold against R0 (HIT = 1 - 1/R0)",
              "xLabel": "R0",
              "yLabel": "HIT (%)",
              "yMin": 0,
              "yMax": 100,
              "series": [
                {
                  "name": "HIT",
                  "points": [
                    [
                      1,
                      0
                    ],
                    [
                      1.5,
                      33.3
                    ],
                    [
                      2,
                      50
                    ],
                    [
                      3,
                      66.7
                    ],
                    [
                      4,
                      75
                    ],
                    [
                      5,
                      80
                    ],
                    [
                      6,
                      83.3
                    ],
                    [
                      8,
                      87.5
                    ],
                    [
                      10,
                      90
                    ],
                    [
                      12,
                      91.7
                    ],
                    [
                      15,
                      93.3
                    ],
                    [
                      20,
                      95
                    ]
                  ]
                }
              ]
            },
            "caption": "Shape to sketch: starts at 0 when R0 = 1, rises steeply, then flattens towards 100% (it never reaches 100%). Influenza A sits low on the curve, rubella in the middle, measles near the top."
          }
        ]
      }
    ],
    "pitfalls": [
      "Using beta = R0 x D (should be R0 / D).",
      "Dividing by S instead of N in the force of infection.",
      "Quoting HIT as 1/R0 (that is the susceptible threshold; HIT is its complement).",
      "Forgetting units (per day) or giving the HIT as a fraction without saying so.",
      "Confusing R0 (fully susceptible) with Rn (current)."
    ]
  },
  {
    "id": "sir-model",
    "title": "SIR model: structure, equations and epidemic curve",
    "priority": 8,
    "tier": "core",
    "freq": "est. high (basis of every disease question)",
    "marks": "8-15 marks",
    "summary": "**SIR splits a closed population N into Susceptible, Infected and Recovered stocks: S falls by IR = beta S I/N, I rises by IR and falls by I/D, R rises by I/D; it has a Contagion (R) loop and Depletion and Recovery (B) loops.**",
    "mnemonic": "S gives to I gives to R; one R loop (contagion), two B loops (depletion, recovery)",
    "source": [
      "CT561_Notes_09_Disease_Modelling_2",
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Structure and equations",
        "items": [
          "**SIR** splits a population into three stocks: **Susceptible** (can catch it), **Infected** (has it and can pass it on) and **Recovered** (immune).",
          {
            "type": "p",
            "text": "Assumptions"
          },
          "**Closed population**: no births, deaths or migration.",
          "**Homogeneous mixing**: everyone is equally likely to meet everyone else.",
          "Recovered people are immune. Parameters stay constant.",
          "**Deterministic**: no randomness, so every run gives the same result.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "SIR compartment flow",
              "height": 200,
              "nodes": [
                {
                  "id": "S",
                  "label": "S",
                  "sub": "Susceptible",
                  "x": 10,
                  "y": 50
                },
                {
                  "id": "I",
                  "label": "I",
                  "sub": "Infected",
                  "x": 50,
                  "y": 50,
                  "color": 2
                },
                {
                  "id": "R",
                  "label": "R",
                  "sub": "Recovered",
                  "x": 90,
                  "y": 50,
                  "color": 1
                }
              ],
              "edges": [
                {
                  "from": "S",
                  "to": "I",
                  "label": "IR = beta S I/N"
                },
                {
                  "from": "I",
                  "to": "R",
                  "label": "RR = I/D"
                }
              ]
            }
          },
          {
            "type": "formula",
            "label": "Differential form",
            "text": "dS/dt = -beta S I/N;  dI/dt = beta S I/N - I/D;  dR/dt = I/D"
          },
          {
            "type": "formula",
            "label": "Difference (Euler) form",
            "text": "S(t+DT) = S(t) - DT x IR(t);  I(t+DT) = I(t) + DT x (IR(t) - RR(t));  R(t+DT) = R(t) + DT x RR(t)"
          },
          {
            "type": "p",
            "text": "Parameters"
          },
          "**beta** (transmission rate) = R0/D. **lambda** (force of infection) = beta I/N. **IR** (infection rate) = S x lambda. **RR** (recovery rate) = I/D.",
          "**R0** is the number of people one case infects when everyone is susceptible; **D** is how many days a person stays infectious.",
          "Start: I(0) = I0, S(0) = N - I0, R(0) = 0. S + I + R = N always.",
          "**Attack rate** = the proportion of the population that has been infected = (N - S)/N = (I + R)/N. With quarantine and vaccination: (N - S - V)/N.",
          {
            "type": "p",
            "text": "Feedback loops"
          },
          "**Contagion (reinforcing)**: more infected, more infections, more infected.",
          "**Depletion (balancing)**: more infections, fewer susceptibles, fewer infections.",
          "**Recovery (balancing)**: more infected, more recoveries, fewer infected."
        ]
      },
      {
        "heading": "Worked Euler steps (N = 1000, I0 = 10, R0 = 3, D = 4, DT = 1)",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "SIR model: N = 1000, 10 infected, R0 = 3, D = 4, DT = 1.",
              "Do three Euler steps for S, I and R."
            ]
          },
          "beta = 3/4 = 0.75. Step 0: IR = 0.75 x 990 x 10/1000 = 7.425; RR = 10/4 = 2.5. So S = 982.58, I = 10 + 7.425 - 2.5 = 14.93, R = 2.5.",
          "Step 1: IR = 0.75 x 982.58 x 14.93/1000 = 11.00; RR = 3.73. S = 971.58, I = 22.19, R = 6.23.",
          "Step 2: IR = 16.17; RR = 5.55. S = 955.41, I = 32.82, R = 11.78 (check: sums to 1000)."
        ]
      },
      {
        "heading": "Epidemic curve (N = 10,000, I0 = 1, R0 = 2, D = 2 days)",
        "items": [
          "Computed with DT = 0.01. Peak: about 1537 infected at t = 18.2 days. Final: S about 2029, attack rate about 79.7% (the final size equation z = 1 - e^(-R0 z) gives 0.797).",
          "Phases: slow exponential start (contagion dominates), peak when Rn = 1 (S = N/R0 = 5000), then decline (depletion and recovery dominate). The epidemic ends with many still susceptible: it dies out because Rn < 1, not because S is zero.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "SIR epidemic curve (R0 = 2, D = 2, N = 10000, I0 = 1)",
              "xLabel": "Days",
              "yLabel": "People",
              "series": [
                {
                  "name": "Susceptible",
                  "points": [
                    [
                      0,
                      9999
                    ],
                    [
                      2,
                      9996
                    ],
                    [
                      4,
                      9986
                    ],
                    [
                      6,
                      9961
                    ],
                    [
                      8,
                      9894
                    ],
                    [
                      10,
                      9720
                    ],
                    [
                      12,
                      9289
                    ],
                    [
                      14,
                      8364
                    ],
                    [
                      16,
                      6842
                    ],
                    [
                      18,
                      5135
                    ],
                    [
                      20,
                      3816
                    ],
                    [
                      22,
                      3009
                    ],
                    [
                      24,
                      2561
                    ],
                    [
                      26,
                      2319
                    ],
                    [
                      28,
                      2187
                    ],
                    [
                      30,
                      2116
                    ],
                    [
                      32,
                      2077
                    ],
                    [
                      34,
                      2055
                    ],
                    [
                      36,
                      2043
                    ],
                    [
                      38,
                      2037
                    ],
                    [
                      40,
                      2033
                    ]
                  ]
                },
                {
                  "name": "Infected",
                  "points": [
                    [
                      0,
                      1
                    ],
                    [
                      2,
                      3
                    ],
                    [
                      4,
                      7
                    ],
                    [
                      6,
                      20
                    ],
                    [
                      8,
                      53
                    ],
                    [
                      10,
                      139
                    ],
                    [
                      12,
                      343
                    ],
                    [
                      14,
                      743
                    ],
                    [
                      16,
                      1262
                    ],
                    [
                      18,
                      1535
                    ],
                    [
                      20,
                      1370
                    ],
                    [
                      22,
                      990
                    ],
                    [
                      24,
                      633
                    ],
                    [
                      26,
                      378
                    ],
                    [
                      28,
                      218
                    ],
                    [
                      30,
                      123
                    ],
                    [
                      32,
                      69
                    ],
                    [
                      34,
                      38
                    ],
                    [
                      36,
                      21
                    ],
                    [
                      38,
                      12
                    ],
                    [
                      40,
                      6
                    ]
                  ]
                },
                {
                  "name": "Recovered",
                  "points": [
                    [
                      0,
                      0
                    ],
                    [
                      2,
                      2
                    ],
                    [
                      4,
                      6
                    ],
                    [
                      6,
                      19
                    ],
                    [
                      8,
                      53
                    ],
                    [
                      10,
                      142
                    ],
                    [
                      12,
                      368
                    ],
                    [
                      14,
                      893
                    ],
                    [
                      16,
                      1896
                    ],
                    [
                      18,
                      3330
                    ],
                    [
                      20,
                      4814
                    ],
                    [
                      22,
                      6001
                    ],
                    [
                      24,
                      6806
                    ],
                    [
                      26,
                      7303
                    ],
                    [
                      28,
                      7595
                    ],
                    [
                      30,
                      7761
                    ],
                    [
                      32,
                      7855
                    ],
                    [
                      34,
                      7907
                    ],
                    [
                      36,
                      7936
                    ],
                    [
                      38,
                      7952
                    ],
                    [
                      40,
                      7960
                    ]
                  ]
                }
              ]
            }
          },
          "Effect of R0 (computed attack rates, peak infected): R0 = 1: about 0.9% (no epidemic); 1.5: 58.3% (peak 631); 2: 79.7% (1537); 3: 94.1% (3011); 4: 98.0% (4044).",
          "Euler accuracy: the same model with DT = 1 gives a peak of about 1721 at t = 22 and attack rate 82.8%, noticeably different from DT = 0.01: choose DT small relative to D."
        ]
      }
    ],
    "pitfalls": [
      "Writing IR = beta x S x I (missing the /N) which breaks the units.",
      "Forgetting S + I + R = N when initialising (S0 = N - I0).",
      "Stating that the epidemic ends when everyone has been infected: it ends when Rn drops below 1.",
      "Mislabelling loops: contagion is the only reinforcing loop."
    ]
  },
  {
    "id": "sir-countermeasures",
    "title": "SIR with countermeasures: quarantine, vaccination, flags, attack rate",
    "priority": 2,
    "tier": "core",
    "freq": "est. very high (Sheet 1 Q3b 15 marks; Sheet 2 Q2b 12 marks; Lecture challenge 10.2)",
    "marks": "12-15 marks",
    "summary": "**Extend the epidemic model: some newly infected people go into quarantine (and stop spreading it), some healthy people get vaccinated, and an \"attack rate\" records how many ever caught it. Give every equation and feedback loop.**",
    "mnemonic": "SIQR + V: split the infection flow, drain S by vaccination, count the attack",
    "source": [
      "CT561_Notes_09_Disease_Modelling_2",
      "CT561_Problem_Sheet_01_2024-2025",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Sheet 1 Q3(b): influenza with quarantine and a control flag",
        "items": [
          "**SIR** = Susceptible (can catch it), Infected, Recovered.",
          {
            "type": "p",
            "text": "Sheet 1 Q3(b): flu with quarantine and an on/off switch"
          },
          "**R0** = 2 (people each case infects at the start). **D** = 2 days (infectious period). N = 10,000 people, 1 infected at the start.",
          "**QF** = 0.08: the fraction of new infections that quarantine.",
          "A **flag** (0 or 1) switches quarantine off or on.",
          "People in quarantine recover at the same speed as other infected people.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "SIR with quarantine",
              "height": 340,
              "nodes": [
                {
                  "id": "S",
                  "label": "S",
                  "sub": "Susceptible",
                  "x": 8,
                  "y": 25
                },
                {
                  "id": "I",
                  "label": "I",
                  "sub": "Infected",
                  "x": 50,
                  "y": 25,
                  "color": 2
                },
                {
                  "id": "R",
                  "label": "R",
                  "sub": "Recovered",
                  "x": 92,
                  "y": 55,
                  "color": 1
                },
                {
                  "id": "Q",
                  "label": "Q",
                  "sub": "Quarantined",
                  "x": 50,
                  "y": 85,
                  "color": 3
                }
              ],
              "edges": [
                {
                  "from": "S",
                  "to": "I",
                  "label": "(1 - QF x flag) IR"
                },
                {
                  "from": "S",
                  "to": "Q",
                  "label": "QF x flag x IR",
                  "curve": 30
                },
                {
                  "from": "I",
                  "to": "R",
                  "label": "I/D"
                },
                {
                  "from": "Q",
                  "to": "R",
                  "label": "Q/D"
                }
              ]
            },
            "caption": "The infection flow IR leaves S and is split between I and Q."
          },
          {
            "type": "table",
            "head": [
              "Variable",
              "Equation",
              "Value / initial"
            ],
            "rows": [
              [
                "S",
                "S + DT x (-Infection Rate)",
                "N - I0 = 9999"
              ],
              [
                "I",
                "I + DT x (Infection to I - Recovery I)",
                "1"
              ],
              [
                "Q",
                "Q + DT x (Infection to Q - Recovery Q)",
                "0"
              ],
              [
                "R",
                "R + DT x (Recovery I + Recovery Q)",
                "0"
              ],
              [
                "R0, D, N, QF, Flag",
                "constants (flag 0 or 1)",
                "2; 2 days; 10000; 0.08; 1"
              ],
              [
                "Transmission rate beta",
                "R0 / D",
                "1 per day"
              ],
              [
                "Force of infection lambda",
                "beta x I / N  (only I transmits; Q excluded)",
                "0.0001 at start"
              ],
              [
                "Infection Rate IR",
                "S x lambda",
                ""
              ],
              [
                "Effective quarantine fraction",
                "QF x Flag",
                "0.08 (0 if off)"
              ],
              [
                "Infection to Q",
                "IR x QF x Flag",
                ""
              ],
              [
                "Infection to I",
                "IR x (1 - QF x Flag)",
                ""
              ],
              [
                "Recovery I, Recovery Q",
                "I / D ; Q / D",
                ""
              ],
              [
                "Attack Rate",
                "(N - S) / N = (I + Q + R) / N",
                "rises from 0"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Force of infection (you may be asked to explain it)"
          },
          "**beta** = R0 / D: effective contacts per infectious person per day.",
          "**I / N**: the chance a random contact is infectious.",
          "Multiplied together (**lambda**): the daily chance one susceptible person gets infected.",
          "Lambda × S = new infections per day.",
          "Quarantined people are **not** in I, so they cannot infect anyone. That is how quarantine works.",
          {
            "type": "p",
            "text": "Feedback loops (R = reinforcing, B = balancing)"
          },
          "**Contagion (R)**: more infected, more new infections, more infected.",
          "**Depletion (B)**: infections use up susceptibles, which slows infections.",
          "**Recovery (B)**: more infected, more recoveries, fewer infected.",
          "**Quarantine recovery (B)**: the same for the quarantine stock.",
          "Quarantine lowers the effective R0 to R0 × (1 − QF) = 2 × 0.92 = **1.84**, so QF = 0.08 only helps a little.",
          {
            "type": "p",
            "text": "Two ways to read the question"
          },
          "**Standard** (lecture challenge 10.2): split the flow of **new** infections between quarantine and I.",
          "**Alternative** (Sheet 1 wording, \"a proportion of those infected will quarantine\"): move people from I to Q, with I to Q = I × detection fraction per day, and I to R = I / D.",
          "Either way the quarantined must not infect. **Say which one you are using.** Both fit the lecture's policy table (quarantine shortens the time an infected person circulates).",
          {
            "type": "p",
            "text": "Simulation results (time step DT 0.01)"
          },
          "**No quarantine**: peak infected about 1537, attack rate 79.7%.",
          "**QF = 0.08**: peak about 1153 (day 20.8), attack rate 74.7%.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Infected over time: no quarantine vs QF = 0.08",
              "xLabel": "Days",
              "yLabel": "Infected (I)",
              "series": [
                {
                  "name": "QF = 0",
                  "points": [
                    [
                      0,
                      1
                    ],
                    [
                      2,
                      3
                    ],
                    [
                      4,
                      7
                    ],
                    [
                      6,
                      20
                    ],
                    [
                      8,
                      53
                    ],
                    [
                      10,
                      139
                    ],
                    [
                      12,
                      343
                    ],
                    [
                      14,
                      743
                    ],
                    [
                      16,
                      1262
                    ],
                    [
                      18,
                      1535
                    ],
                    [
                      20,
                      1370
                    ],
                    [
                      22,
                      990
                    ],
                    [
                      24,
                      633
                    ],
                    [
                      26,
                      378
                    ],
                    [
                      28,
                      218
                    ],
                    [
                      30,
                      123
                    ],
                    [
                      32,
                      69
                    ],
                    [
                      34,
                      38
                    ],
                    [
                      36,
                      21
                    ],
                    [
                      38,
                      12
                    ],
                    [
                      40,
                      6
                    ],
                    [
                      42,
                      4
                    ],
                    [
                      44,
                      2
                    ],
                    [
                      46,
                      1
                    ],
                    [
                      48,
                      1
                    ],
                    [
                      50,
                      0
                    ]
                  ]
                },
                {
                  "name": "QF = 0.08",
                  "points": [
                    [
                      0,
                      1
                    ],
                    [
                      2,
                      2
                    ],
                    [
                      4,
                      5
                    ],
                    [
                      6,
                      12
                    ],
                    [
                      8,
                      28
                    ],
                    [
                      10,
                      64
                    ],
                    [
                      12,
                      142
                    ],
                    [
                      14,
                      298
                    ],
                    [
                      16,
                      565
                    ],
                    [
                      18,
                      900
                    ],
                    [
                      20,
                      1129
                    ],
                    [
                      22,
                      1111
                    ],
                    [
                      24,
                      900
                    ],
                    [
                      26,
                      640
                    ],
                    [
                      28,
                      420
                    ],
                    [
                      30,
                      263
                    ],
                    [
                      32,
                      160
                    ],
                    [
                      34,
                      96
                    ],
                    [
                      36,
                      57
                    ],
                    [
                      38,
                      34
                    ],
                    [
                      40,
                      20
                    ],
                    [
                      42,
                      12
                    ],
                    [
                      44,
                      7
                    ],
                    [
                      46,
                      4
                    ],
                    [
                      48,
                      2
                    ],
                    [
                      50,
                      1
                    ]
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "heading": "Sheet 2 Q2(b): quarantine + vaccination (goal-seeking vaccination fraction)",
        "items": [
          {
            "type": "p",
            "text": "Sheet 2 Q2(b): quarantine plus vaccination"
          },
          "20% of new infections go to quarantine and 80% to I (QF = 0.2). Quarantined people recover in 2 days and do not infect.",
          "Vaccination removes **only susceptibles**, through a flow S × VF.",
          "**VF** (vaccination fraction) starts at 0 and gradually moves towards 0.15 (**goal-seeking**).",
          "R0 = 2, D = 2, N = 10,000, 1 infected at the start. Include the **attack rate**.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "SIR + quarantine + vaccination",
              "height": 380,
              "nodes": [
                {
                  "id": "S",
                  "label": "S",
                  "sub": "Susceptible",
                  "x": 8,
                  "y": 25
                },
                {
                  "id": "I",
                  "label": "I",
                  "sub": "Infected",
                  "x": 50,
                  "y": 25,
                  "color": 2
                },
                {
                  "id": "R",
                  "label": "R",
                  "sub": "Recovered",
                  "x": 92,
                  "y": 55,
                  "color": 1
                },
                {
                  "id": "Q",
                  "label": "Q",
                  "sub": "Quarantined",
                  "x": 50,
                  "y": 85,
                  "color": 3
                },
                {
                  "id": "V",
                  "label": "V",
                  "sub": "Vaccinated",
                  "x": 8,
                  "y": 85,
                  "color": 4
                }
              ],
              "edges": [
                {
                  "from": "S",
                  "to": "I",
                  "label": "0.8 IR"
                },
                {
                  "from": "S",
                  "to": "Q",
                  "label": "0.2 IR",
                  "curve": 30
                },
                {
                  "from": "I",
                  "to": "R",
                  "label": "I/D"
                },
                {
                  "from": "Q",
                  "to": "R",
                  "label": "Q/D"
                },
                {
                  "from": "S",
                  "to": "V",
                  "label": "S x VF"
                }
              ]
            }
          },
          {
            "type": "table",
            "head": [
              "Variable",
              "Equation",
              "Initial"
            ],
            "rows": [
              [
                "S",
                "S + DT x (-IR - Vaccination)",
                "9999"
              ],
              [
                "I",
                "I + DT x (0.8 IR - I/D)  [(1 - QF) IR - Recovery I]",
                "1"
              ],
              [
                "Q",
                "Q + DT x (QF x IR - Q/D)",
                "0"
              ],
              [
                "R",
                "R + DT x (I/D + Q/D)",
                "0"
              ],
              [
                "V",
                "V + DT x Vaccination",
                "0"
              ],
              [
                "VF (stock)",
                "VF + DT x (VF Max - VF)/AT_v  (goal seeking); AT_v e.g. 10 days",
                "0"
              ],
              [
                "VF Max",
                "constant",
                "0.15 per day"
              ],
              [
                "Vaccination flow",
                "S x VF",
                ""
              ],
              [
                "beta; lambda; IR",
                "R0/D = 1; beta x I/N; S x lambda",
                "quarantined excluded from lambda"
              ],
              [
                "Attack Rate",
                "(N - S - V) / N = proportion ever infected",
                "0"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Feedback loops"
          },
          "**Contagion (R)** and **depletion (B)**. Depletion is now stronger: S falls through infection and vaccination.",
          "**Recovery (B)** and **quarantine recovery (B)**.",
          "**Vaccination (B)**: more susceptibles means more vaccinations, which means fewer susceptibles.",
          "**VF goal-seeking (B)**: VF is adjusted until it reaches its maximum.",
          "Vaccination lowers the current spread rate (**Rn**) by shrinking S / N.",
          {
            "type": "p",
            "text": "Check your answer"
          },
          "S + I + Q + R + V = N at all times.",
          "Rn = R0 × (1 − QF) × S / N drops below 1 early, so the epidemic stays small.",
          "With QF = 0.2, VF max = 0.15 and vaccination adjustment time 10: peak infected about 5, attack rate about 0.4%.",
          "With the same quarantine but no vaccination, the attack rate is 64.2%.",
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Infected with QF = 0.2: without and with vaccination (VF max 0.15)",
              "xLabel": "Days",
              "yLabel": "Infected",
              "series": [
                {
                  "name": "No vaccination",
                  "points": [
                    [
                      0,
                      1
                    ],
                    [
                      2,
                      2
                    ],
                    [
                      4,
                      3
                    ],
                    [
                      6,
                      6
                    ],
                    [
                      8,
                      11
                    ],
                    [
                      10,
                      20
                    ],
                    [
                      12,
                      35
                    ],
                    [
                      14,
                      63
                    ],
                    [
                      16,
                      109
                    ],
                    [
                      18,
                      184
                    ],
                    [
                      20,
                      292
                    ],
                    [
                      22,
                      428
                    ],
                    [
                      24,
                      559
                    ],
                    [
                      26,
                      641
                    ],
                    [
                      28,
                      641
                    ],
                    [
                      30,
                      569
                    ],
                    [
                      32,
                      460
                    ],
                    [
                      34,
                      346
                    ],
                    [
                      36,
                      249
                    ],
                    [
                      38,
                      173
                    ],
                    [
                      40,
                      117
                    ],
                    [
                      42,
                      79
                    ],
                    [
                      44,
                      52
                    ],
                    [
                      46,
                      34
                    ],
                    [
                      48,
                      23
                    ],
                    [
                      50,
                      15
                    ]
                  ]
                },
                {
                  "name": "VF max 0.15",
                  "points": [
                    [
                      0,
                      1
                    ],
                    [
                      2,
                      2
                    ],
                    [
                      4,
                      3
                    ],
                    [
                      6,
                      4
                    ],
                    [
                      8,
                      5
                    ],
                    [
                      10,
                      5
                    ],
                    [
                      12,
                      4
                    ],
                    [
                      14,
                      3
                    ],
                    [
                      16,
                      2
                    ],
                    [
                      18,
                      1
                    ],
                    [
                      20,
                      1
                    ],
                    [
                      22,
                      0
                    ],
                    [
                      24,
                      0
                    ],
                    [
                      26,
                      0
                    ],
                    [
                      28,
                      0
                    ],
                    [
                      30,
                      0
                    ]
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "heading": "Sheet 2 Q2(c): attack rate vs quarantine fraction and final vaccination fraction",
        "items": [
          {
            "type": "p",
            "text": "Sheet 2 Q2(c): sketch attack rate against both measures"
          },
          "Draw a 4 × 4 grid. Across: QF = 0, 0.05, 0.10, 0.15. Up: final VF = 0, 0.05, 0.10, 0.15.",
          "**Circle size** = final attack rate (the share who ever got infected).",
          "Values below use R0 = 2, D = 2, N = 10,000, 1 infected, vaccination adjustment time 10 days.",
          {
            "type": "table",
            "head": [
              "QF \\ final VF",
              "0",
              "0.05",
              "0.10",
              "0.15"
            ],
            "rows": [
              [
                "0",
                "0.797",
                "0.207",
                "0.040",
                "0.016"
              ],
              [
                "0.05",
                "0.768",
                "0.135",
                "0.026",
                "0.011"
              ],
              [
                "0.10",
                "0.733",
                "0.080",
                "0.016",
                "0.008"
              ],
              [
                "0.15",
                "0.691",
                "0.044",
                "0.010",
                "0.005"
              ]
            ]
          },
          {
            "type": "diagram",
            "kind": "scatter",
            "data": {
              "title": "Sketch: final attack rate (%) at each QF and final VF",
              "xLabel": "Quarantine fraction QF",
              "yLabel": "Final vaccination fraction VF",
              "xMin": -0.02,
              "xMax": 0.17,
              "yMin": -0.02,
              "yMax": 0.17,
              "series": [
                {
                  "name": "Grid points",
                  "points": [
                    [
                      0,
                      0
                    ],
                    [
                      0.05,
                      0
                    ],
                    [
                      0.1,
                      0
                    ],
                    [
                      0.15,
                      0
                    ],
                    [
                      0,
                      0.05
                    ],
                    [
                      0.05,
                      0.05
                    ],
                    [
                      0.1,
                      0.05
                    ],
                    [
                      0.15,
                      0.05
                    ],
                    [
                      0,
                      0.1
                    ],
                    [
                      0.05,
                      0.1
                    ],
                    [
                      0.1,
                      0.1
                    ],
                    [
                      0.15,
                      0.1
                    ],
                    [
                      0,
                      0.15
                    ],
                    [
                      0.05,
                      0.15
                    ],
                    [
                      0.1,
                      0.15
                    ],
                    [
                      0.15,
                      0.15
                    ]
                  ]
                }
              ],
              "points": [
                {
                  "x": 0,
                  "y": 0,
                  "label": "80"
                },
                {
                  "x": 0.05,
                  "y": 0,
                  "label": "77"
                },
                {
                  "x": 0.1,
                  "y": 0,
                  "label": "73"
                },
                {
                  "x": 0.15,
                  "y": 0,
                  "label": "69"
                },
                {
                  "x": 0,
                  "y": 0.05,
                  "label": "21"
                },
                {
                  "x": 0.05,
                  "y": 0.05,
                  "label": "14"
                },
                {
                  "x": 0.1,
                  "y": 0.05,
                  "label": "8"
                },
                {
                  "x": 0.15,
                  "y": 0.05,
                  "label": "4"
                },
                {
                  "x": 0,
                  "y": 0.1,
                  "label": "4"
                },
                {
                  "x": 0.05,
                  "y": 0.1,
                  "label": "3"
                },
                {
                  "x": 0.1,
                  "y": 0.1,
                  "label": "2"
                },
                {
                  "x": 0.15,
                  "y": 0.1,
                  "label": "1"
                },
                {
                  "x": 0,
                  "y": 0.15,
                  "label": "1.6"
                },
                {
                  "x": 0.05,
                  "y": 0.15,
                  "label": "1.1"
                },
                {
                  "x": 0.1,
                  "y": 0.15,
                  "label": "0.8"
                },
                {
                  "x": 0.15,
                  "y": 0.15,
                  "label": "0.5"
                }
              ]
            },
            "caption": "Labels are the computed final attack rates in %; in your sketch draw the circle area proportional to this value: huge at the bottom-left corner, tiny along the top row."
          },
          {
            "type": "p",
            "text": "How to explain the picture"
          },
          "Circles are biggest bottom-left (nothing done, 80%) and shrink towards top-right.",
          "**Vaccination is much stronger**: it removes susceptibles before the epidemic can grow.",
          "**Quarantine alone** only lowers the effective R0 (to 1.7 at best), so the attack rate only falls from 80% to 69%.",
          "**Together they help each other**: at VF 0.05, adding quarantine takes the attack rate from 21% to 4%.",
          "With high vaccination the attack rate is near zero whatever QF is.",
          "Exact numbers depend on how fast vaccination ramps up. The pattern does not."
        ]
      }
    ],
    "pitfalls": [
      "Quarantined people must not count in the force of infection.",
      "State whether you split the new-infection flow or move people out of I.",
      "Remember the flag: effective fraction = QF × flag.",
      "Only susceptibles move to vaccinated.",
      "Include the attack rate equation and all initial values.",
      "List the feedback loops: the question asks for them."
    ]
  },
  {
    "id": "threshold-policies",
    "title": "Threshold dynamics and the \"battle of the flows\" policies",
    "priority": 13,
    "tier": "likely",
    "freq": "est. medium (Lecture 9 slides 4-8)",
    "marks": "4-6 marks",
    "summary": "**The infectious stock rises only if the infection inflow exceeds the recovery outflow, which reduces to R0 S/N > 1; every public health policy either reduces the inflow (c, i, S) or increases the outflow (shorter d).**",
    "mnemonic": "Win the Battle of the Flows: cut the inflow (c, i, S) or speed the outflow (d)",
    "source": [
      "CT561_Notes_09_Disease_Modelling_2"
    ],
    "sections": [
      {
        "heading": "Threshold derivation",
        "items": [
          "Infectious stock: dI/dt = Inflow - Outflow = c i (S/N) I - I/d.",
          "Equilibrium (I does not rise or fall): c i S/N I = I/d, so c i S/N = 1/d, i.e. c i d S/N = 1, i.e. R0 S/N = 1.",
          "For I to increase: inflow > outflow, c i (S/N) I > I/d. In a totally susceptible population (S = N): c i > 1/d, so c i d > 1, so **R0 > 1**. In general Rn = R0 S/N > 1.",
          "Threshold on S: the epidemic grows if S/N > 1/R0 and declines if S/N < 1/R0."
        ]
      },
      {
        "heading": "Mapping the flow equation onto policy",
        "items": [
          {
            "type": "table",
            "head": [
              "Policy type",
              "Also known as",
              "Parameter changed",
              "Battle of the flows",
              "Outcome"
            ],
            "rows": [
              [
                "Non-pharmaceutical",
                "Restrictions, distancing, masks",
                "c (reduce contacts), i (reduce transmission)",
                "Reduce the inflow",
                "Stock of infectious falls"
              ],
              [
                "Non-pharmaceutical",
                "Test-Trace-Isolate (quarantine)",
                "d (reduce time infectious and circulating)",
                "Increase the outflow",
                "Stock of infectious falls"
              ],
              [
                "Pharmaceutical",
                "Antivirals (e.g. influenza)",
                "i (reduce viral load)",
                "Reduce the inflow",
                "Stock of infectious falls"
              ],
              [
                "Pharmaceutical",
                "Vaccination",
                "S (reduce susceptibles)",
                "Reduce the inflow",
                "Stock of infectious falls"
              ]
            ]
          },
          "In the equation c i S/N = 1/d: policies on the left (c, i, S) push the inflow down; policies on the right (shorter d) push the outflow up.",
          "Quarantine in the exam model: infected people in quarantine do not transmit, so they are removed from the infection force (reduces effective duration of circulation)."
        ]
      }
    ],
    "pitfalls": [
      "Saying vaccination increases the outflow: it reduces S, so it reduces the inflow.",
      "Forgetting that quarantine acts on d (time circulating), not on c or i."
    ]
  },
  {
    "id": "sensitivity-analysis",
    "title": "Sensitivity analysis / parameter sweeps",
    "priority": 14,
    "tier": "likely",
    "freq": "est. medium (Lecture challenge 10.2; Sheet 2 Q2c)",
    "marks": "5 marks",
    "summary": "**Sensitivity analysis runs the model repeatedly while one or two parameters vary over a range (for example QF from 0 to 1) and records an outcome (attack rate, peak) to see which parameters matter.**",
    "mnemonic": "Vary, rerun, record, compare",
    "source": [
      "CT561_Notes_09_Disease_Modelling_2",
      "CT561_Problem_Sheet_02_2025-2026"
    ],
    "sections": [
      {
        "heading": "Method",
        "items": [
          "Choose the parameter(s) and a range or grid (QF in [0,1]; QF x VF grid).",
          "Loop in code (Python in the lecture notebook; Vensim has sensitivity tools): set parameters, run to the end, store the output (final attack rate, peak infected, time of peak).",
          "Plot output against parameter (line for one parameter; bubble or heat map for two).",
          "Interpret: which parameter changes the outcome most, thresholds (R0 (1 - QF) < 1 means almost no outbreak), interactions between parameters, and robustness of conclusions to uncertainty."
        ]
      },
      {
        "heading": "Example: attack rate vs QF (R0 = 2, D = 2, N = 10,000, I0 = 1, no vaccination)",
        "items": [
          {
            "type": "diagram",
            "kind": "line",
            "data": {
              "title": "Final attack rate vs quarantine fraction",
              "xLabel": "QF",
              "yLabel": "Attack rate",
              "series": [
                {
                  "name": "Attack rate",
                  "points": [
                    [
                      0,
                      0.797
                    ],
                    [
                      0.1,
                      0.733
                    ],
                    [
                      0.2,
                      0.642
                    ],
                    [
                      0.3,
                      0.511
                    ],
                    [
                      0.4,
                      0.308
                    ],
                    [
                      0.5,
                      0.009
                    ],
                    [
                      0.6,
                      0.001
                    ]
                  ]
                }
              ]
            },
            "caption": "Computed by simulation (Euler, DT = 0.01). The curve collapses near QF = 0.5 because R0 (1 - QF) = 1: a threshold."
          }
        ]
      }
    ],
    "pitfalls": [
      "Varying several parameters at once and then attributing the effect to one.",
      "Reporting a single run when the question asks about the relationship across the range."
    ]
  }
];
