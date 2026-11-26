module.exports = [
{
  id: 'stock-management', title: 'Stock management structure: anchor + adjustment', priority: 3, tier: 'core',
  freq: 'est. very high (Sheet 1 Q2b, Sheet 2 Q4b)', marks: '5-7 marks (plus model parts)',
  summary: '**The stock management structure extends adjustment to a goal: Inflow = MAX(0, Anchor + Adjustment), where the anchor is the expected outflow (keeps the stock level when on target) and the adjustment is (Desired Stock - Stock)/AT (closes the gap).**',
  mnemonic: 'ANCHOR holds the level, ADJUSTMENT closes the gap',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026'],
  sections: [
    { heading: 'From adjustment to a goal to stock management', items: [
      '**Adjustment to a goal**: Net flow = (Goal - Stock)/AT. Fine when there is no other outflow: the stock reaches the goal.',
      '**Problem**: if the stock also has a drain (staff quits, inventory sales), the goal-seeking inflow alone equals the outflow only when the stock is below the goal: the stock settles **below** the goal with a steady-state error (where (Goal - S)/AT = outflow).',
      '**Fix**: add an **anchor** equal to the (expected) outflow so that at the goal the inflow exactly replaces the outflow. This is the stock management structure.',
      { type: 'formula', label: 'Stock management structure', text: 'Inflow (Hire Rate) = MAX(0, Anchor + Adjustment)' },
      { type: 'formula', label: 'Adjustment', text: 'Adjustment = (Desired Stock - Stock) / AT,  AT = adjustment time' },
      { type: 'formula', label: 'Anchor', text: 'Anchor = Expected Outflow (smoothed outflow); in steady state Anchor = Outflow' },
      '**(1) The anchor**: the baseline flow that would hold the stock constant: it replaces what is lost. Equal to the outflow (quits) as perceived by the manager, usually smoothed.',
      '**(2) The adjustment**: the correction to close the discrepancy between desired and actual stock, spread over the adjustment time AT. Positive when stock is below target (hire extra), negative when above.',
      '**Key difference from adjustment to a goal**: stock management has an extra term, the anchor (outflow replacement), so the stock converges to the goal even though there is a continuing outflow; adjustment to a goal alone has no anchor.',
      '**MAX(0, ...)**: an inflow cannot be negative (you cannot un-hire); when the target drops a long way, the hire rate sits at zero until attrition brings the stock down.'
    ] },
    { heading: 'The delay structure that builds the anchor', items: [
      'Managers do not respond instantly to the outflow: the anchor is an **expected outflow**, a **first-order information delay (exponential smoothing)**.',
      'Structure: a stock **Expected Outflow** (for example Expected Quits) whose only inflow is the **Change in Expected Outflow** = (Actual Outflow - Expected Outflow)/Time to Adjust (smoothing time). Expected Outflow starts at the initial outflow.',
      { type: 'formula', label: 'Anchor delay structure', text: 'Expected Quits(t + DT) = Expected Quits(t) + DT x (Quits - Expected Quits)/Time to Adjust Expectation' },
      'This is an adjustment-to-goal structure where the goal is the actual outflow. It adds a balancing loop around Expected Quits.',
      { type: 'diagram', kind: 'graph', data: { title: 'Stock management structure (staff)', height: 420, nodes: [
        { id: 'hire', label: 'Hire Rate', x: 10, y: 40 }, { id: 'staff', label: 'Staff', x: 45, y: 40, color: 1 }, { id: 'quits', label: 'Quits', x: 85, y: 40 },
        { id: 'adj', label: 'Adjustment', x: 10, y: 90 }, { id: 'des', label: 'Desired Staff', x: 45, y: 95, color: 2 },
        { id: 'anch', label: 'Expected Quits (anchor)', x: 50, y: 5, color: 3 }, { id: 'at', label: 'AT', x: 25, y: 98 }
      ], edges: [
        { from: 'hire', to: 'staff', label: '+' }, { from: 'staff', to: 'quits', label: '+' }, { from: 'quits', to: 'staff', label: '-', curve: 25 },
        { from: 'staff', to: 'adj', label: '-' }, { from: 'des', to: 'adj', label: '+' }, { from: 'at', to: 'adj', label: '-' }, { from: 'adj', to: 'hire', label: '+' },
        { from: 'quits', to: 'anch', label: '+', curve: 15 }, { from: 'anch', to: 'hire', label: '+' }
      ] }, caption: 'Loops: B1 adjustment (Staff, Adjustment, Hire Rate, Staff: one negative); B2 attrition (Staff, Quits, Staff); R3 anchor (Staff, Quits, Expected Quits, Hire Rate, Staff: all positive, but it only replaces losses).' }
    ] },
    { heading: 'Behaviour', items: [
      'At t = 0 with Staff = Desired Staff and Expected Quits = Quits: adjustment 0, Hire = Quits, stock constant (equilibrium).',
      'If desired staff rises: hire = anchor + (gap)/AT, a jump above the replacement level, then the gap closes exponentially: **goal-seeking growth to the new target**.',
      'Short AT: fast response, larger initial hiring spike, risk of overshoot with extra delays. Long AT: smooth but slow. **AT is the main parameter** controlling how quickly the model resets.',
      'The anchor smoothing time has a smaller effect: it only matters while quits are changing.',
      'Same structure applies to inventory (Production = expected sales + adjustment for inventory gap), capacity, and workforce models.'
    ] }
  ],
  pitfalls: [
    'Omitting the anchor and calling it stock management: the answer needs both terms.',
    'Forgetting MAX(0, ...) on the flow.',
    'Not showing the delay (smoothing) structure when asked for how the anchor is built.',
    'Describing the anchor as "the goal": the goal is the Desired Stock; the anchor is the expected outflow.',
    'Forgetting to initialise Expected Quits at the equilibrium value (otherwise the model does not start in steady state).'
  ]
},
{
  id: 'delays-smoothing', title: 'Delays: first-order smoothing and material delays', priority: 10, tier: 'likely',
  freq: 'est. medium (anchor delay structure; pharma progression delays)', marks: '3-5 marks',
  summary: '**A first-order delay is a stock draining at Stock/Delay Time: an information delay smooths a signal (Smoothed changes by (Input - Smoothed)/ST), a material delay holds items for an average time (Stock = Inflow x Delay at steady state).**',
  mnemonic: 'Outflow = Stock / Delay; average residence time = Delay',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026'],
  sections: [
    { heading: 'Material delay (first order)', items: [
      'A stock between two flows: Outflow = Stock / Delay Time. Items stay on average Delay Time (average residence time).',
      { type: 'formula', label: 'First-order material delay', text: 'Outflow = Stock / D;  steady state: Stock = Inflow x D' },
      'Example: Trainees progress to Experienced at Trainee / 12 per month (progression delay 12 months). With 100 trainees, progression = 8.33 per month.',
      'It is a fractional decrease flow with fraction 1/D; step response of the output is an exponential approach with time constant D.'
    ] },
    { heading: 'Information delay (smoothing)', items: [
      { type: 'formula', label: 'Exponential smoothing', text: 'Smoothed(t + DT) = Smoothed(t) + DT x (Input - Smoothed(t))/ST,  ST = smoothing (perception) time' },
      'Models how perceptions, expectations or anchors lag reality. Smoothed value moves 63% towards a step change in one ST.',
      'Material is conserved in a material delay (output eventually equals input); an information delay only passes on a number, nothing is conserved.',
      'Higher-order delays are chains of first-order stocks; they make the output response S-shaped and sharper.'
    ] },
    { heading: 'Why delays matter', items: [
      'In a balancing loop, delays can cause **overshoot and oscillation** (acting on stale information).',
      'In the stock management structure the anchor smoothing and hiring/training delays slow the response.',
      'Euler needs DT well below the smallest delay (a quarter or less).'
    ] }
  ],
  pitfalls: [
    'Using Stock x Delay for the outflow (should be divided).',
    'Treating the smoothing time as the time to reach the goal: about 63% after one ST and 95% after three.'
  ]
},
{
  id: 'staff-recruitment-models', title: 'Staff recruitment models (University and pharmaceutical)', priority: 4, tier: 'core',
  freq: 'est. very high (Sheet 1 Q2c 12 marks; Sheet 2 Q4c,d 15 marks)', marks: '10-15 marks',
  summary: '**Model staff as a stock with Hire = MAX(0, Expected Quits + (Desired - Staff)/AT) and Quits = Staff x fraction; desired staff from a driver (students / ratio, or a target); start in equilibrium, then trace the response to a change in the target.**',
  mnemonic: 'Desired from the driver; Hire = Anchor + Adjustment; start balanced',
  source: ['CT561_Problem_Sheet_01_2024-2025', 'CT561_Problem_Sheet_02_2025-2026'],
  sections: [
    { heading: 'Sheet 1 Q2c: University staff and students', items: [
      'Given: Staff = 500 (equilibrium), Students = 10,000 (equilibrium), desired student/staff ratio 20, drops to 10 at t = 10; run to t = 30.',
      'Chosen free parameters (state them): quit fraction 0.1 per time unit, AT = 5, smoothing time for expected quits 2, recruitment fraction = graduation fraction = 0.25 (students in equilibrium: 2500 in, 2500 out).',
      { type: 'table', head: ['Element', 'Equation', 'Initial value'], rows: [
        ['Students (stock)', 'Students(t+DT) = Students + DT x (Recruitment - Graduation)', '10000'],
        ['Recruitment', 'Students x Recruitment Fraction', '2500 (fraction 0.25)'],
        ['Graduation', 'Students x Graduation Fraction', '2500 (fraction 0.25)'],
        ['Desired Staff', 'Students / Desired Student Staff Ratio', '10000/20 = 500'],
        ['Desired Student Staff Ratio', '20 for t < 10; 10 for t >= 10 (STEP of -10 at t = 10)', '20'],
        ['Staff (stock)', 'Staff(t+DT) = Staff + DT x (Hire Rate - Quits)', '500'],
        ['Quits', 'Staff x Quit Fraction', '50 (fraction 0.1)'],
        ['Expected Quits (anchor stock)', 'ExpQ(t+DT) = ExpQ + DT x (Quits - ExpQ)/Smoothing Time', '50'],
        ['Adjustment', '(Desired Staff - Staff)/AT', '0'],
        ['Hire Rate', 'MAX(0, Expected Quits + Adjustment)', '50']
      ] },
      'Feedback loops: **B1 staff adjustment** (Staff, Adjustment, Hire, Staff; one negative); **B2 quits** (Staff, Quits, Staff; negative); **R3 anchor** (Staff, Quits, Expected Quits, Hire, Staff; all positive, but it is the replacement mechanism and is dominated by B2). Students has its own two flows (balancing loops via the fractions).',
      '**Plot (answer 1)**: flat at 500 until t = 10. At t = 10 desired staff jumps to 1000 so hire rate jumps from 50 to 150 (anchor 50 + 500/5). Staff then rises with decreasing slope, exponential goal seeking towards 1000: about 656 at t = 12, 754 at 14, 870 at 18, 905 at 20, 950 at 24, 980 at 30 (not quite 1000 yet). Hire rate falls from 150 towards the replacement level 100 (quits at 1000 staff).',
      { type: 'diagram', kind: 'line', data: { title: 'Staff after the ratio drops from 20 to 10 at t = 10', xLabel: 'Time', yLabel: 'Staff', yMin: 400, yMax: 1050, series: [
        { name: 'AT = 2', points: [[0,500],[10,500],[11,694.4],[12,803.9],[13,869.3],[14,910.5],[16,955.9],[18,977.5],[20,988.4],[22,994],[24,996.9],[26,998.4],[28,999.2],[30,999.6]] },
        { name: 'AT = 5', points: [[0,500],[10,500],[11,588.3],[12,656],[13,710],[14,754.1],[16,821.7],[18,870],[20,905.1],[22,930.6],[24,949.3],[26,962.9],[28,972.9],[30,980.2]] },
        { name: 'AT = 10', points: [[0,500],[10,500],[11,546.1],[12,585.2],[13,619.5],[14,650.2],[16,703.4],[18,748],[20,785.8],[22,817.9],[24,845.2],[26,868.4],[28,888.1],[30,904.9]] }
      ] }, caption: 'Euler simulation, DT = 0.125. Answer 2: the **adjustment time AT** controls how fast the model resets.' },
      '**Answer 2**: the auxiliary with the big influence is the **Adjustment Time (AT)**: small AT, fast response and larger hire spike; large AT, slow response. The quit fraction also sets the replacement hiring level.'
    ] },
    { heading: 'Sheet 2 Q4c: pharmaceutical company (Trainee, Experienced, Senior)', items: [
      'Stocks: Trainee, Experienced, Senior (100 each). Flows: Hire Rate into Trainee; Progression TE = Trainee/12; Progression ES = Experienced/36; Attrition per stock: Trainee x 0.05, Experienced x 0.03, Senior x 0.01 (assumed per month, the time unit of the delays).',
      { type: 'table', head: ['Variable', 'Equation', 'Initial'], rows: [
        ['Trainee', 'Trainee + DT x (Hire Rate - Progression TE - Attrition T)', '100'],
        ['Experienced', 'Experienced + DT x (Progression TE - Progression ES - Attrition E)', '100'],
        ['Senior', 'Senior + DT x (Progression ES - Attrition S)', '100'],
        ['Progression TE / ES', 'Trainee / 12 ; Experienced / 36', '8.33 ; 2.78'],
        ['Attrition T / E / S', '0.05 x Trainee ; 0.03 x Experienced ; 0.01 x Senior', '5 ; 3 ; 1'],
        ['Total Employees', 'Trainee + Experienced + Senior', '300'],
        ['Target Employees', 'constant', '300'],
        ['Total Attrition', 'sum of three attrition flows', '9'],
        ['Expected Attrition (anchor stock)', 'ExpA + DT x (Total Attrition - ExpA)/Smoothing Time (assume 3)', '9'],
        ['Adjustment', '(Target - Total Employees)/AT (assume AT = 6)', '0'],
        ['Hire Rate', 'MAX(0, Expected Attrition + Adjustment)', '9']
      ] },
      'Feedbacks: B1 adjustment (Total, Adjustment, Hire, Trainee, Experienced, Senior, Total: one negative link, balancing), B2/B3/B4 attrition loops at each stock (stock, attrition, stock: balancing), B5 progression (Trainee to Experienced: fractional decrease), R anchor loop (Total, Attrition, Expected Attrition, Hire, Total).',
      '**Caution (honest note)**: with these progression delays and attrition rates, 100 in each category is not an exact equilibrium for each stock (Experienced inflow 8.33 vs outflow 2.78 + 3 = 5.78). The **total** is held at 300 because hire = attrition and adjustment = 0; the split between categories drifts (simulation: Trainees fall, Seniors rise). State this assumption.',
      '**Sheet 2 Q4d, target drops to 100**: Adjustment = (100 - 300)/6 = -33.3 per month. Hire Rate = MAX(0, 9 - 33.3) = **0**: hiring stops. Total falls only through attrition (and the anchor falls as attrition falls) so the decline is gradual: total about 255 at month 6, 198 at month 18, 148 at month 36, 111 at month 60, 102 at month 72. Hiring restarts (anchor plus a small negative adjustment becomes positive) at about month 62, and the total settles at 100.',
      { type: 'diagram', kind: 'line', data: { title: 'Total employees after the target drops to 100 (AT = 6 months)', xLabel: 'Months', yLabel: 'Total employees', series: [
        { name: 'Total', points: [[0,300],[6,254.7],[12,222],[18,197.3],[24,177.8],[30,162],[36,148.8],[42,137.5],[48,127.6],[54,118.9],[60,111.1],[66,104.6],[72,101.7],[78,100.4],[84,99.9],[96,99.7],[120,99.8]] }
      ] }, caption: 'Euler simulation DT = 0.05 months. Because you cannot fire staff the hire rate is clipped at zero by MAX(0, ...) and the total declines at the speed of attrition.' },
      'How the equations react: the adjustment term turns strongly negative, MAX clips Hire Rate to 0, the Trainee stock empties (no new entrants), attrition shrinks as stocks shrink, so Expected Attrition falls and the negative adjustment shrinks; once Anchor + Adjustment > 0 hiring resumes at the new replacement level, and the total converges on 100 (goal seeking).'
    ] }
  ],
  pitfalls: [
    'Not starting in equilibrium (state initial Expected Quits = Quits).',
    'Letting hire go negative (no MAX).',
    'Forgetting desired staff is a function of students and the ratio (a driver), not a constant.',
    'For the sketch: staff must flatten smoothly towards the target, not jump.',
    'Quoting a speed without naming the adjustment time as the cause.'
  ]
}
];
