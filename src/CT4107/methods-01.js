module.exports = [
{
  id: 'pick-beachhead', topicId: 'beachhead-market', title: 'Pick a beachhead market (scoring recipe)',
  when: 'Asked to choose and justify one target segment for a startup idea',
  mnemonic: 'LIST 5-6, SCORE 7 criteria, KILL show-stoppers, RANK, JUSTIFY',
  steps: [
    '1. List 5-6 distinct candidate segments (end user + task, not industries).',
    '2. Draw a table: rows = 7 criteria (economics, access, value proposition, complete product, competition, strategic value, personal alignment), columns = candidates.',
    '3. Rate each cell Very High / High / Medium / Low / Show Stopper (or 5 to 1); give a 3-word reason where marks matter.',
    '4. Eliminate any candidate with a show stopper.',
    '5. Total (or weigh) the scores and rank 1 = most attractive.',
    '6. Name the deciding factors and state the winner.',
    '7. Name the runner-up as the first adjacent market and check the three market conditions for the winner (same product, same sales process, word of mouth).'
  ],
  example: {
    problem: 'Idea: DampDetect, a sensor that warns of hidden damp. Candidates: student landlords, social housing providers, private homeowners, hotels. Choose a beachhead.',
    solution: [
      'Scores 1-5 in order (economics, access, value, complete product, competition, strategic value, personal alignment):',
      'Student landlords: 4,4,5,4,3,4,5 = 29',
      'Social housing providers: 5,2,5,3,3,5,3 = 26',
      'Private homeowners: 2,2,3,5,2,2,3 = 19',
      'Hotels: 3,3,2,3,2,3,2 = 18',
      'Rank: 1 student landlords (29), 2 social housing (26), 3 homeowners (19), 4 hotels (18).',
      'Winner: student landlords. Deciding factors: strong urgent pain (damp complaints and deposit disputes), reachable through landlord associations and college accommodation offices, team knows the student rental market, word of mouth among landlords.',
      'Social housing is the best next market (big budgets but slow procurement: low access now).'
    ]
  }
},
{
  id: 'segment-matrix', topicId: 'market-segmentation', title: 'Segment a market (matrix recipe)',
  when: 'Asked to segment the market for an idea',
  mnemonic: 'WHO does WHAT, how URGENT, how MANY, vs WHOM',
  steps: [
    '1. State the idea and the core technology/benefit in one line.',
    '2. Brainstorm segments by end user and task (different users, industries, use contexts).',
    '3. For each of 4-6 segments fill: end user, task, benefit, urgency, example users, willingness to change, size (order of magnitude), competition incl. do-nothing.',
    '4. Add complete-product needs and partners.',
    '5. Cut to top 5-6 and pass to the beachhead scoring.'
  ],
  example: {
    problem: 'Segment the market for a mobile app that tracks pregnancy for first-time mothers (Ireland).',
    solution: [
      'Segments: first-time mothers 25-35 (urban), first-time mothers under 20, first-time mothers over 35 (high-risk), expectant partners, midwives/clinics, private maternity hospitals.',
      'Row for first-time mothers 25-35: end user = the mother; task = track symptoms, appointments and milestones; benefit = reassurance and fewer worried calls; urgency = high for 9 months; size = about 10Ks (30,306 first-time mothers per year, subset 25-35); competition = existing apps, forums, midwife; do nothing = paper booklet.',
      'Narrow to 5-6, then score on the beachhead criteria.'
    ]
  }
},
{
  id: 'calc-tam', topicId: 'tam-sam-som', title: 'Calculate TAM / SAM / SOM',
  when: 'Asked to size the market or decide if the beachhead is big enough',
  mnemonic: 'N x Q x F x P, then cut down for SAM and SOM',
  steps: [
    '1. Define the beachhead end users precisely and count them (N) from data; cite the source.',
    '2. Units bought at a time (Q) and how often per year (F). If one-time, divide by product life.',
    '3. Fix a price (P); label it an assumption and cross-check with budget or comparables.',
    '4. TAM = N x Q x F x P (EUR per year).',
    '5. SAM = TAM x fraction you can serve (geography, channel, price).',
    '6. SOM = SAM x realistic share (capacity, competition) in year 1-3.',
    '7. Interpret: is it big enough to be interesting? Cross-check top-down.'
  ],
  example: {
    problem: 'DampDetect: 18,000 student landlords in Ireland (assume), each with 3 rental properties, sensor price EUR 60 per property, life 4 years. Serviceable: Galway, Cork, Dublin = 55% of landlords. Realistic share in year 3: 8%. Compute TAM, SAM, SOM.',
    solution: [
      'Units: N x Q = 18,000 x 3 = 54,000 sensors in use.',
      'Annualised price: 60 / 4 = EUR 15 per sensor per year (F = 1).',
      'TAM = 54,000 x 15 = EUR 810,000 per year (one-time equivalent EUR 3,240,000).',
      'SAM = 810,000 x 0.55 = EUR 445,500 per year.',
      'SOM = 445,500 x 0.08 = EUR 35,640 per year.',
      'Interpretation: a small beachhead, fine for a first segment but needs add-on subscription revenue or adjacent markets (social housing) to grow.'
    ]
  }
},
{
  id: 'tam-per-user', topicId: 'tam-sam-som', title: 'Annual revenue per user (workbook method)',
  when: 'Asked to estimate revenue per end user using the three data points',
  mnemonic: 'ONE-TIME, BUDGET, COMPARABLE, then consensus',
  steps: [
    '1. One-time charge: (price x units per user) / life in years.',
    '2. Budget: user budget x % that reasonably goes to this solution.',
    '3. Comparables: list comparable products and convert to annual revenue.',
    '4. Compare the data points; choose a consensus range and explain how you got it.',
    '5. TAM = number of end users x chosen annual revenue.'
  ],
  example: {
    problem: 'Gym-chain smart rack: price 1,200, 1 unit, life 4 years; budget 10,000 with 5% available; comparable spend 400 per year. 3,000 end users.',
    solution: [
      '(1) 1,200 x 1 / 4 = 300 per year.',
      '(2) 10,000 x 0.05 = 500 per year.',
      '(3) comparable = 400 per year.',
      'Consensus range 300-500; take 400.',
      'TAM = 3,000 x 400 = 1,200,000 per year.'
    ]
  }
},
{
  id: 'write-persona', topicId: 'customer-persona', title: 'Write a persona',
  when: 'Asked to create the persona or end-user profile for a beachhead',
  mnemonic: 'NAME, STORY, GOALS, PAINS, PRIORITIES, REACH',
  steps: [
    '1. Base it on the End-User Profile and research from the beachhead (interviews, observation).',
    '2. Give one fictional named person and a photo description.',
    '3. Demographics: age, role, location, income, family.',
    '4. Psychographics and behaviours: values, habits, tech attitude, spending habits, proxy products.',
    '5. Goals and how she measures success (gains).',
    '6. Pains: bad day, fears, obstacles, responsibilities.',
    '7. Weighted priorities (sum 100) and where to reach her (watering holes).'
  ],
  example: {
    problem: 'Persona for student landlords (DampDetect).',
    solution: [
      'Name: Maeve Ryan, 47, accountant and landlord of 3 student houses in Galway (income 85k, married, 2 teenagers).',
      'Psychographics: cautious, protects her pension asset, dislikes call-outs, uses WhatsApp and the Daft.ie portal, owns a smart thermostat (proxy product).',
      'Goals: full occupancy, no deposit disputes, less time on repairs.',
      'Pains: tenants report damp late, repair bills EUR 4,000+, fears property-damage claims, is 2 hours from the houses.',
      'Priorities: avoid repair cost 40, save time 25, keep tenants happy 20, minimise upfront cost 15 = 100.',
      'Reach: landlord association events, Facebook groups, letting agents.'
    ]
  }
},
{
  id: 'write-qvp', topicId: 'qvp', title: 'Write a Quantified Value Proposition',
  when: 'Asked for the QVP or to quantify the benefit',
  mnemonic: 'PRIORITY #1, AS-IS X, TO-BE Y, DIFFERENCE, PROOF',
  steps: [
    '1. Take the persona\'s #1 priority and its metric.',
    '2. Measure/estimate the As-Is state X (current solution or do nothing).',
    '3. Estimate the To-Be state Y with your product.',
    '4. Compute the difference and the percentage; add the money or time per period.',
    '5. State the evidence that supports it (pilot, benchmark, research) and label estimates as hypotheses.',
    '6. Check that no other key priority gets worse.',
    '7. Write it as one sentence.'
  ],
  example: {
    problem: 'Maeve\'s top priority: avoid repair cost from late-detected damp. As-Is: damp found after 6 weeks on average, repair cost EUR 4,200. To-Be: detected within 3 days, repair EUR 600.',
    solution: [
      'Time to detection: 42 days to 3 days = 39 days earlier (93% faster).',
      'Repair cost: 4,200 - 600 = EUR 3,600 saved per incident (3,600 / 4,200 = 85.7% lower).',
      'If 1 in 6 properties has an incident each year, a 3-property landlord saves 0.5 x 3,600 = EUR 1,800 per year, against a sensor cost of EUR 15 per sensor per year.',
      'QVP: "For landlords like Maeve, DampDetect cuts damp repair cost from EUR 4,200 to EUR 600 per incident by detecting it in 3 days instead of 6 weeks." Support: pilot on 20 homes (to be validated). Other priorities: install time 5 minutes, no loss of tenant satisfaction.'
    ]
  }
},
{
  id: 'fill-bmc', topicId: 'business-model-canvas', title: 'Fill in the Business Model Canvas',
  when: 'Asked to complete or critique a BMC for a startup',
  mnemonic: 'SEGMENT, VALUE, CHANNEL, RELATIONSHIP, REVENUE, RESOURCE, ACTIVITY, PARTNER, COST',
  steps: [
    '1. Customer segments: beachhead end user and economic buyer (one entry per side if two-sided).',
    '2. Value propositions: the QVP per segment.',
    '3. Channels and customer relationships: how found, sold, delivered, retained.',
    '4. Revenue streams: who pays, how (unit, subscription, fee), indicative price.',
    '5. Key resources, key activities, key partnerships needed to deliver the value.',
    '6. Cost structure: biggest cost drivers, fixed vs variable.',
    '7. Consistency check: every value proposition has a segment, channel and revenue stream; every cost maps to an activity or resource.'
  ],
  example: {
    problem: 'Complete a BMC for DampDetect.',
    solution: [
      'Customer segments: student landlords (buyer = user), later social housing providers.',
      'Value proposition: detect damp in 3 days not 6 weeks; save about EUR 3,600 per incident.',
      'Channels: landlord association events, letting agents, online shop, Daft/Facebook ads.',
      'Customer relationships: self-service app, alerts, annual check call, upsell extra rooms.',
      'Revenue: EUR 60 sensor sale plus EUR 2 per month alert subscription.',
      'Key resources: sensor design IP, cloud alert platform, engineers, working capital for stock.',
      'Key activities: hardware design, app development, customer acquisition, support.',
      'Key partnerships: sensor manufacturer, letting agents, landlord association.',
      'Cost structure: cost of goods about EUR 22 per sensor (variable), salaries and cloud (fixed), marketing.'
    ]
  }
},
{
  id: 'lifecycle-recipe', topicId: 'life-cycle-use-case', title: 'Write the full life-cycle use case',
  when: 'Asked to describe the customer journey for the persona',
  mnemonic: '10 stages x (who, when, where, how)',
  steps: [
    '1. Use the persona by name.',
    '2. List the 10 stages: need, find, analyse, acquire, pay, install, use, value, buy more, tell others.',
    '3. For each give who, when, where, how in a short line.',
    '4. Flag the barrier to adoption at each stage.',
    '5. Note what each stage tells you (pricing, go-to-market, COCA, CLV).'
  ],
  example: {
    problem: 'Life cycle for Maeve and DampDetect.',
    solution: [
      '1 Need: tenant complains of smell in winter; trigger = deposit dispute last year.',
      '2 Find: searches Google and asks the landlord association Facebook group.',
      '3 Analyse: compares with a handheld meter and a surveyor visit; wants proof of savings.',
      '4-5 Acquire/pay: online order, card payment, shipped in 3 days.',
      '6 Install: tenant fixes it to the wall in 5 minutes using app instructions.',
      '7 Use: app alerts Maeve and tenant when humidity stays above threshold.',
      '8 Value: sees an early alert avoid a EUR 4,200 repair; annual summary.',
      '9 Buy more: adds sensors to her other two houses.',
      '10 Tell others: posts in the Facebook group, refers friends for a discount.',
      'Barriers: trust in claims (stage 3), tenant cooperation (stage 6).'
    ]
  }
},
{
  id: 'position-chart', topicId: 'core-competitive-position', title: 'Draw a competitive position chart',
  when: 'Asked to position the product against alternatives',
  mnemonic: 'TOP 2 PRIORITIES, GOOD vs BAD, PLOT incl. DO-NOTHING',
  steps: [
    '1. Take persona priorities 1 and 2 as x and y axes.',
    '2. Label low (bad) near the origin and high (good) far from it.',
    '3. List direct competitors, indirect alternatives, future entrants and do nothing.',
    '4. Place each with a one-line justification.',
    '5. Place your product top-right and state what stops competitors copying (your core).',
    '6. Add the supporting SWOT if asked.'
  ],
  example: {
    problem: 'Position DampDetect for Maeve: priority 1 = early detection, priority 2 = ease of use.',
    solution: [
      'Do nothing: slow detection (about 6 weeks), very easy. Low x, high y.',
      'Handheld damp meter: manual checks, so slow detection and hard to use consistently. Low x, low y.',
      'Surveyor visit: accurate but occasional, so medium detection, low ease. Medium x, low y.',
      'Competing smart sensor: fast detection, complex setup. High x, low-medium y.',
      'DampDetect: 3-day detection with 5-minute install. High x, high y.',
      'Core: humidity-pattern algorithm trained on proprietary data (unique, grows, important).'
    ]
  }
},
{
  id: 'product-brochure', topicId: 'product-spec-mvbp', title: 'Write the high-level product spec (brochure)',
  when: 'Asked to outline the product spec or brochure for the beachhead',
  mnemonic: 'NAME, HEADLINE BENEFIT, 2 MORE, MAGNITUDE, ACT (no price!)',
  steps: [
    '1. Name and tagline.',
    '2. A visual showing how it works in the customer\'s workflow.',
    '3. Headline benefit tied to the persona\'s #1 priority.',
    '4. Two additional benefits.',
    '5. Magnitude: pilot targets from the QVP.',
    '6. Call to action (where to buy or find out more).',
    '7. Check: benefits not features, no price, nothing built yet.'
  ],
  example: {
    problem: 'Brochure outline for DampDetect.',
    solution: [
      'Name: DampDetect, "Catch damp in days, not weeks".',
      'Visual: sensor on a bedroom wall, phone alert, before/after repair.',
      'Headline: Cut damp repair bills by up to 85% (pilot target).',
      'Additional: 5-minute install; automatic evidence report for deposit disputes.',
      'Magnitude: detection in 3 days vs 6 weeks; to be validated with 20 pilot homes.',
      'Call to action: Join the landlord pilot at the association meeting.'
    ]
  }
},
{
  id: 'essay-structure', topicId: 'intro-innovation', title: 'Answer structure: define-explain-example essays',
  when: 'Asked to discuss, compare or explain a concept (innovation types, creativity, entrepreneurship teachable?)',
  mnemonic: 'DEFINE, MECHANISM, EXAMPLE, EVALUATE',
  steps: [
    '1. Define each term in one sentence in lecture vocabulary.',
    '2. Explain the mechanism or the steps (numbered).',
    '3. Give one named example per item (3M, Airbnb, GE ECG...).',
    '4. For compare questions use a table: dimension, A, B; then one sentence on when each applies.',
    '5. Evaluate: advantage, limitation, link to the startup being designed.',
    '6. Finish with a one-line conclusion answering the question asked.'
  ],
  example: {
    problem: 'Distinguish invention and innovation (6 marks).',
    solution: [
      'Definition (2): invention = a creative idea; innovation = turning it into a feasible product or service that satisfies customers.',
      'Equation (1): innovation = invention x commercialisation; zero commercialisation means zero innovation.',
      'Example (2): Spencer Silver invented the low-tack adhesive at 3M in 1968; it became innovation only when sold as Post-it notes.',
      'Conclusion (1): value to customers, not novelty alone, is what makes an innovation.'
    ]
  }
},
{
  id: 'apply-scamper', topicId: 'ideation-techniques', title: 'Apply SCAMPER to a product',
  when: 'Asked to generate ideas for improving a product',
  mnemonic: 'S-C-A-M-P-E-R, one idea per letter',
  steps: [
    '1. Name the product and the user.',
    '2. Substitute: a part, material or person to replace.',
    '3. Combine: two features or products to merge.',
    '4. Adapt: copy an idea from another field.',
    '5. Modify (magnify/minify): size, shape, more or less of a feature.',
    '6. Put to another use: other market or user.',
    '7. Eliminate, then Reverse; finish by selecting with criteria.'
  ],
  example: {
    problem: 'SCAMPER a reusable coffee cup.',
    solution: [
      'Substitute: plastic lid with a bamboo-fibre lid.',
      'Combine: cup with a built-in loyalty NFC tag.',
      'Adapt: telescopic collapsing like a camping cup.',
      'Modify: smaller 150 ml cup for espresso.',
      'Put to other use: soup cup for office lunches.',
      'Eliminate: remove the sleeve using double-wall design.',
      'Reverse: cafe provides the cup deposit on the way out instead of upfront.',
      'Select with criteria such as cost, safety, differentiation.'
    ]
  }
}
];
