module.exports = [
{
  id: 'mock1', title: 'Mock Paper 1', duration: 120,
  instructions: 'FORMAT ASSUMED: no real paper was supplied for CT4107. This mock assumes: 120 minutes, answer any 3 of 5 questions, 20 marks each. Show assumptions and arithmetic. Original questions.',
  questions: [
    { n: 1, marks: 20,
      scenario: 'FarmFlow is an app that lets small farms share tractors, balers and sprayers. Owners list machines and book them by the day; a booking service handles insurance and payment.',
      parts: [
        { label: 'a', marks: 6, topicId: 'market-segmentation', text: 'Segment the market for FarmFlow. Identify at least five segments and, for two of them, state the end user, task and benefit.',
          outline: ['Five distinct segments by end user and task: dairy farmers, tillage farmers, sheep/hill farmers, farm contractors, machinery co-ops, agricultural colleges (1 each up to 4)', 'End user is a real person, not an organisation (1)', 'Two segments with end user, task, benefit (2)', 'Mentions urgency, size or competition including do nothing (1)'] },
        { label: 'b', marks: 10, topicId: 'beachhead-market', text: 'Choose a beachhead market using the seven beachhead criteria. Present a scoring table for four candidates and justify your choice.',
          outline: ['Seven criteria named: economics, access, value proposition, complete product, competition, strategic value, personal alignment (2)', 'Table with 4 candidates and consistent scores (3)', 'Show stoppers considered/eliminated (1)', 'Ranking and winner (1)', 'Justification with deciding factors tied to scenario (2)', 'Mentions the three market conditions or adjacent next market (1)'] },
        { label: 'c', marks: 4, topicId: 'beachhead-market', text: 'Why should a startup select only one beachhead market?',
          outline: ['Focus limited resources (1)', 'One tailored message and persona (1)', 'Word of mouth within one community and dominance (1)', 'Base to attack adjacent markets (1)'] }
      ] },
    { n: 2, marks: 20,
      scenario: 'Use FarmFlow with the beachhead "dairy farms in Munster with 60-150 cows". Assume 6,000 such farms, 1 booking account per farm, an average of 12 bookings a year, and a platform fee of EUR 40 per booking. 70% of farms are in the counties you can serve first; you expect 10% of those in year 3.',
      parts: [
        { label: 'a', marks: 4, topicId: 'tam-sam-som', text: 'Define TAM, SAM and SOM.',
          outline: ['TAM: annual revenue at 100% share of the beachhead (1)', 'SAM: part you can serve given geography, price, distribution (1)', 'SOM: part of SAM you can realistically capture (1)', 'TAM >= SAM >= SOM (1)'] },
        { label: 'b', marks: 8, topicId: 'tam-sam-som', text: 'Calculate TAM, SAM and SOM in EUR per year. Show formula and arithmetic.',
          outline: ['Formula N x Q x F x P (2)', 'TAM = 6,000 x 1 x 12 x 40 = EUR 2,880,000 (2)', 'SAM = 2,880,000 x 0.7 = EUR 2,016,000 (2)', 'SOM = 2,016,000 x 0.1 = EUR 201,600 (2)'] },
        { label: 'c', marks: 4, topicId: 'tam-sam-som', text: 'Compare top-down and bottom-up TAM estimation. Which did you use?',
          outline: ['Top-down: start from industry total and cut by percentages (1)', 'Bottom-up: build from units, frequency and price (1)', 'Bottom-up more credible, ties to real buyers; top-down good for sanity check (1)', 'States bottom-up used (1)'] },
        { label: 'd', marks: 4, topicId: 'tam-sam-som', text: 'Is the beachhead market large enough to be interesting? Comment on your result and how you would grow it.',
          outline: ['Interprets SOM about EUR 200k as small for a company (1)', 'Notes assumptions need validation (1)', 'Growth: more bookings, subscription, adjacent segments such as tillage or contractors (2)'] }
      ] },
    { n: 3, marks: 20,
      scenario: 'Continue with FarmFlow and dairy farmers.',
      parts: [
        { label: 'a', marks: 6, topicId: 'customer-persona', text: 'Write a persona for the beachhead. Include demographics, psychographics, goals, pains and priorities.',
          outline: ['Named fictional individual with background (1)', 'Demographics (1)', 'Psychographics and behaviours (1)', 'Goals/gains (1)', 'Pains (1)', 'Weighted priorities summing to 100 (1)'] },
        { label: 'b', marks: 4, topicId: 'end-user-profile', text: 'Distinguish an end-user profile from a persona and state the six parts of the profile.',
          outline: ['Profile = narrow group average; persona = one representative fictional person (2)', 'Demographics, psychographics, proxy products, watering holes, day in the life, priorities (2)'] },
        { label: 'c', marks: 10, topicId: 'life-cycle-use-case', text: 'Describe the full life-cycle use case for your persona. Give all ten stages with who, when, where and how for at least five of them.',
          outline: ['Ten stages named: need, find, analyse, acquire, pay, install, use, value, buy more, tell others (3)', 'Five stages with who/when/where/how in scenario terms (5)', 'Identifies adoption barriers (trust, insurance, timing in season) (1)', 'Links stages to later steps (pricing, COCA, go-to-market) (1)'] }
      ] },
    { n: 4, marks: 20,
      scenario: 'Continue with FarmFlow.',
      parts: [
        { label: 'a', marks: 8, topicId: 'qvp', text: 'Write a quantified value proposition for FarmFlow. State assumptions about the as-is and to-be states.',
          outline: ['Persona top priority identified, e.g. cost of machinery access (2)', 'As-Is state with number, e.g. owning a baler costs EUR 9,000 per year for 8 days use (2)', 'To-Be state with number (2)', 'Difference computed and one-sentence QVP (1)', 'Evidence/validation and other priorities not worsened (1)'] },
        { label: 'b', marks: 6, topicId: 'core-competitive-position', text: 'Define your core and explain whether it forms a competitive moat. Draw (describe) a competitive position chart with two priorities.',
          outline: ['Core: what you do better and protect (1)', 'Candidate core e.g. network of machine owners and trust/insurance data (1)', 'Moat tests: unique, grows, important (1)', 'Axes are persona priorities (1)', 'Competitors and do nothing plotted (1)', 'Own product top-right with reason (1)'] },
        { label: 'c', marks: 6, topicId: 'product-spec-mvbp', text: 'Outline the high-level product specification and define the minimum viable business product.',
          outline: ['Spec: visual, benefits not features, customer view, no price, do not build yet (2)', 'Brochure items: headline benefit, two more, magnitude, call to action (2)', 'MVBP: customer gets value, pays, starts feedback loop (2)'] }
      ] },
    { n: 5, marks: 20,
      parts: [
        { label: 'a', marks: 10, topicId: 'business-model-canvas', text: 'Complete a Business Model Canvas for FarmFlow, naming all nine blocks with one or two entries each.',
          outline: ['All nine blocks present (4.5)', 'Two-sided segments: machine owners and renters (1)', 'Revenue: fee per booking / subscription (1)', 'Resources: platform, insurance partner, trust data (1)', 'Costs: platform dev, insurance, acquisition, fixed vs variable (1)', 'Internal consistency (1.5)'] },
        { label: 'b', marks: 4, topicId: 'business-model-basics', text: 'Distinguish a business model from a business plan.',
          outline: ['Model: how value is created, delivered, captured (1)', 'Plan: detailed strategy and multi-year financials (1)', 'Model first gives earlier customer feedback (1)', 'Plan is easier to write once the model is clear (1)'] },
        { label: 'c', marks: 6, topicId: 'types-of-innovation', text: 'Is FarmFlow a product, process or business model innovation? Compare incremental and disruptive innovation with an example of each.',
          outline: ['FarmFlow mainly business model / sharing platform (1)', 'Incremental: small improvements for existing customers, e.g. phone camera upgrades (2)', 'Disruptive: low-end entrant overtakes incumbents, e.g. Airbnb (2)', 'Classification justified (1)'] }
      ] }
  ]
}
];
