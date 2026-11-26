module.exports = {
  name: 'Systems Modelling & Simulation',
  evidence: 'past-papers',
  exam: {
    summary: [
      'Duration 2 hours (CT561, examiners Dr Enda Howley and Prof Jim Duggan); the paper has 4 questions and the instruction is "Answer 3 questions out of 4. All questions will be marked equally".',
      'Every question is worth 25 marks, split into 2-4 lettered parts (5 to 15 marks each), so you are scoring out of 75 and the best three of four count in effect.',
      'The two papers supplied (2024-25 Semester 2, 2025-26 Semester 1) each contain the same four question types, one of each, in a different order and with changed numbers, so the paper is highly predictable.',
      'Almost every part asks you to DO something: draw a stock and flow model, write equations with initial values, trace and label loops (R or B), calculate with Euler or the SIR formulas, or sketch a behaviour over time.'
    ],
    structure: [
      { label: 'Type A: graphical integration and Euler', detail: '25 marks = (a) 12: draw the stock and flow model with net flow, calculate net flow, plot the stock by graphical integration and name the behaviour mode of each interval; (b) 5: describe Euler, its assumptions, and when it over- or underestimates, supported by a chosen interval and DT; (c) 8: calculate the stock with Euler at a large DT. Chart is given (sawtooth or ramps).' },
      { label: 'Type B: feedback and workload backlog', detail: '25 marks = (a) 5-6: define feedback, link polarity, loop polarity, two loop types (and behaviour of a given loop); (b) 12: construct a backlog stock and flow model from a numbered description with link polarities (and loop polarities); (c) 7-8: name three balancing policy loops and the reinforcing side-effect loops, trace each, and discuss the best response.' },
      { label: 'Type C: flow structures, stock management, staffing', detail: '25 marks over 3-4 parts: describe fractional increase / decrease / adjustment to a goal (6-8), a varying decrease fraction (8), or add an expected-enrolments structure (5); explain stock management = anchor + adjustment and the delay that builds the anchor (5-7); build a staffing model with equations (10-12, University staff/students or a three-grade pharmaceutical company); sketch the response to a change in target (5 in the 2025-26 paper, plot with name of key auxiliary in 2024-25).' },
      { label: 'Type D: disease modelling', detail: '25 marks: force of infection, R0 and herd immunity threshold calculation (5); design an SIR model with quarantine (flag, QF) or with quarantine + vaccination (goal-seeking vaccination fraction) with all equations and feedbacks and attack rate (12-15); cohorts (5) or a sketch of attack rate against QF and vaccination fraction (5).' },
      { label: 'Question order', detail: '2024-25: Q1 feedback/backlog, Q2 flow structures and staffing, Q3 disease, Q4 integration. 2025-26: Q1 integration, Q2 varying fraction and SIR countermeasures, Q3 feedback/backlog, Q4 expected enrolments, stock management and pharma staffing.' }
    ],
    freq: [
      { topic: 'Graphical integration and Euler (net flow, stock plot, over/under, large DT)', count: 2, of: 2 },
      { topic: 'Feedback loops: link/loop polarity and backlog policy vs side-effect loops', count: 2, of: 2 },
      { topic: 'Stock management structure (anchor + adjustment, delay for the anchor)', count: 2, of: 2 },
      { topic: 'Staff recruitment model with equations (University; pharmaceutical)', count: 2, of: 2 },
      { topic: 'Fractional increase, decrease, adjustment to a goal (incl. varying fraction)', count: 2, of: 2 },
      { topic: 'SIR with quarantine (and vaccination, attack rate, flag)', count: 2, of: 2 },
      { topic: 'R0, force of infection, herd immunity threshold calculation', count: 1, of: 2 },
      { topic: 'Cohort extension (young/elderly)', count: 1, of: 2 },
      { topic: 'Sensitivity sketch: attack rate vs QF and vaccination fraction', count: 1, of: 2 },
      { topic: 'Expected enrolments structure', count: 1, of: 2 }
    ],
    years: [
      { year: '2024-25 Semester 2', themes: [
        'Q1 (25): (a) feedback loop definition, two types, advantages of feedback (5); (b) assignment backlog stock and flow model with link polarities (12); (c) three balancing and two reinforcing loops, traced (8)',
        'Q2 (25): (a) fractional increase, fractional decrease, adjustment to a goal (6); (b) stock management structure, anchor, adjustment, delay structure for the anchor (7); (c) University staff recruitment model, plot to t = 30, key auxiliary (12)',
        'Q3 (25): (a) force of infection and herd immunity threshold, measles R0 = 12 (5); (b) influenza SIR with quarantine fraction and control flag, explain force of infection (15); (c) cohorts (5)',
        'Q4 (25): (a) sawtooth outflow with two constant inflows: model, net flow, graphical integration (12); (b) Euler, assumptions, when it underestimates, interval 0-5 (5); (c) Euler with DT = 10 (8)'
      ] },
      { year: '2025-26 Semester 1', themes: [
        'Q1 (25): (a) ramp inflow with constant outflow 50: model, net flow, graphical integration, stock may go negative (12); (b) Euler, when it overestimates, 0-2.5 with DT = 0.5 (5); (c) Euler with DT = 5 (8)',
        'Q2 (25): (a) fractional decrease with a varying fraction G as adjustment to a goal, real-world use (8); (b) SIR with quarantine stock (20%), vaccinated stock (goal-seeking fraction to 0.15), attack rate, all equations and feedbacks (12); (c) sketch of attack rate against QF and final vaccination fraction with circles (5)',
        'Q3 (25): (a) link polarity, loop polarity, feedback using the Environmental Quality loop, behaviour (6); (b) insurance claims backlog model with link and loop polarities (12); (c) three policy loops and three side-effect loops, best course of action (7)',
        'Q4 (25): (a) expected enrolments structure for Students stock (5); (b) adjustment to a goal extended to stock management, key difference, anchor and adjustment (5); (c) pharmaceutical staff model, Trainee/Experienced/Senior, with all equations and feedbacks (10); (d) sketch and explain response when the target drops from 300 to 100 (5)'
      ] }
    ],
    tips: [
      'Pick your three questions in the first 5 minutes: types A (integration) and D/B are the most mechanical; give each about 35 minutes (roughly 1.4 minutes per mark), and do not attempt all four.',
      'Every model answer needs three things: the stock and flow diagram with link polarities, every equation with initial values, and the feedback loops named with their polarity (R or B).',
      'Show numbers: write the formula, substitute, then give the result with units. For Euler questions tabulate t, net flow, stock.',
      'For polarity: trace an INCREASE in the stock around the loop and count the negative links; an even count means reinforcing (R), odd means balancing (B). The exam says "confirm by tracing", so write the trace.',
      'In graphical integration, label every time interval with its behaviour mode (for example "falling at a decreasing rate") and mark where the net flow crosses zero (stock peak or trough). The question tells you a negative stock is acceptable.',
      'Learn the shared parts word for word: Euler equation and assumptions, over/under rule (rising net = under, falling = over), anchor and adjustment definitions, force of infection explanation.',
      'State assumptions explicitly when the question leaves a value free (adjustment time, quit fraction, time unit of attrition); the examiner marks structure, not your chosen number.'
    ],
    note: 'Evidence: the two problem sheets are the actual 2024-25 and 2025-26 papers (cover pages state 2 hours, answer 3 of 4, equal marks), so frequency counts are out of 2 papers only. Lecture 9 (Infectious Disease Modelling Part 2) supplies the theory for the disease parts: threshold dynamics, Rn, herd immunity, quarantine countermeasures, sensitivity analysis and the SEIR challenge. The system dynamics topics (Euler, feedback, stock management) are built from the papers and standard practice, because those lectures were not supplied.'
  },
  hints: null
};
