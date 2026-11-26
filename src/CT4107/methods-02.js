module.exports = [
{
  id: 'apply-sit', topicId: 'ideation-techniques', title: 'Apply the five SIT tools to a product',
  when: 'Asked to generate ideas with Systematic Inventive Thinking, or to name and illustrate SIT tools',
  mnemonic: 'S-D-M-U-A: Subtract, Divide, Multiply, Unify, Attribute; then ask "Should we? Can we?"',
  steps: [
    '1. Start with an existing situation: name the product and list its internal components (and external ones for unification).',
    '2. Subtraction: remove one apparently essential component, then modify the concept so the remainder still works.',
    '3. Division: split the product or a component (functionally, physically or preservationally) and rearrange the parts.',
    '4. Multiplication: copy a component and change it in a counterintuitive way.',
    '5. Task unification: give an existing component (or an external one) an extra job.',
    '6. Attribute dependency: list external and internal attributes, then link two: "as attribute A changes, so does attribute B".',
    '7. For each idea look for potential benefits and ask: should we do it, and can we do it? Keep the best and state why.'
  ],
  example: {
    problem: 'Use SIT on a bicycle helmet.',
    solution: [
      'Components: shell, foam liner, straps, buckle, vents, visor.',
      'Subtraction: remove the straps and use a snug-fit band or magnetic closure; benefit: faster to put on for commuters.',
      'Division: physically split the shell into a foldable segmented shell; benefit: fits in a bag (preservational: each segment still protects).',
      'Multiplication: copy the rear vent as a rear light with a different role (signalling); benefit: visibility.',
      'Task unification: the buckle takes the job of a crash sensor (internal takes internal job) or a phone app takes the job of a bike lock reminder (external takes internal job).',
      'Attribute dependency: external attribute = ambient light; internal attribute = brightness of the rear light; as ambient light falls, brightness rises.',
      'Selection: keep attribute dependency (cheap, safe, clear benefit) and the foldable shell for later; ask "should we, can we?" for each.'
    ]
  }
},
{
  id: 'swot-analysis', topicId: 'core-competitive-position', title: 'Write a SWOT analysis',
  when: 'Asked to do a SWOT for a startup or a named company',
  mnemonic: 'Inside = S and W; Outside = O and T; positive, negative, then act',
  steps: [
    '1. Draw four boxes; label internal (Strengths, Weaknesses) and external (Opportunities, Threats).',
    '2. Strengths: what you do well, what separates you from competitors, key resources, IP and assets.',
    '3. Weaknesses: what you lack, what competitors do better, resource limits, unclear USP.',
    '4. Opportunities: underserved markets, few competitors, emerging needs, positive trends and press.',
    '5. Threats: emerging competitors, regulation, negative press, changing customer attitudes, costs.',
    '6. Give 3-5 specific points per box tied to the scenario (not generic).',
    '7. Finish with one line: how to use strengths on opportunities and how to defend against threats.'
  ],
  example: {
    problem: 'SWOT for a smart weightlifting rack startup selling to high-end chain gyms.',
    solution: [
      'Strengths: proprietary computer-vision form models; passive camera with no wearables; fits any rack in minutes.',
      'Weaknesses: no contacts with chain head offices; small team and cash; hardware must be very high quality.',
      'Opportunities: 3,000 high-end chains in the US (12k+ units TAM); 34 million lifters; follow-on markets in budget gyms.',
      'Threats: large fitness-equipment makers copying; injury-liability claims; gyms preferring human trainers.',
      'Action: use the model IP strength on the chain-gym opportunity via a pilot, and counter copying by growing the training-data moat.'
    ]
  }
},
{
  id: 'tam-three-levels', topicId: 'tam-sam-som', title: 'Size total, served and target market (rental units style)',
  when: 'Asked to show total market, serviceable market and target market with revenue',
  mnemonic: 'Everyone, Reachable, First buyers: units x people x price x 12',
  steps: [
    '1. Define the unit (e.g. rental unit) and the price per user per period (e.g. USD 1 per month).',
    '2. Total available market: all units in the country x users per unit x price x 12.',
    '3. Served available market: only units your sales channel can reach (e.g. one city).',
    '4. Target market: the first buyers (e.g. large high-rise buildings in that city); apply adoption %.',
    '5. Convert each level to annual revenue and label assumptions and sources.',
    '6. Sanity check: is the target level big enough for positive cash flow and small enough to dominate?'
  ],
  example: {
    problem: 'US rentals: 42.58M units (all US), 0.59M in Manhattan, 190K high-rise units over 100 per building. Assume 2 residents per unit, USD 1 per user per month, 30% adoption in the target market.',
    solution: [
      'Total: 42,580,000 x 2 x 1 x 12 = USD 1,021,920,000, about USD 1.02B per year.',
      'Served (Manhattan): 590,000 x 2 x 1 x 12 = USD 14,160,000, about USD 14.2M.',
      'Target: 190,000 x 2 x 0.30 x 1 x 12 = USD 1,368,000, about USD 1.4M.',
      'Reading: the target is a thin but winnable slice (about 0.13% of the total) good for a first beachhead; state sources and assumptions.'
    ]
  }
},
{
  id: 'qvp-time-saving', topicId: 'qvp', title: 'Quantify a QVP as a percentage improvement',
  when: 'Given as-is and to-be figures and asked to express the value proposition',
  mnemonic: '(X minus Y) over X, in the same unit',
  steps: [
    '1. Pick persona priority #1 and the metric (time, cost, loss, errors).',
    '2. Put every stage in the same unit (days) before adding.',
    '3. Compute as-is total X and to-be total Y.',
    '4. Value = X - Y (absolute) and (X - Y) / X x 100 (percent).',
    '5. Check other priorities do not worsen, and give a source for every figure.',
    '6. Write the sentence: "moves metric from X to Y, a Z% improvement".'
  ],
  example: {
    problem: 'Product development: as-is ideation 3 weeks, design 10 days, production 1 week, commercialisation 1 month (30 days). To-be: 2 weeks, 5 days, 1 week, 1 month.',
    solution: [
      'As-is in days: 21 + 10 + 7 + 30 = 68.',
      'To-be in days: 14 + 5 + 7 + 30 = 56.',
      'Saving: 68 - 56 = 12 days; 12 / 68 = 17.6%, quoted as about 18%.',
      'Stage view: ideation 7/21 = 33%, design 5/10 = 50%.',
      'Cattle example: 63k - 40k = 23k saving (about 37% lower disease loss) for USD 7 per cow.'
    ]
  }
}
];
