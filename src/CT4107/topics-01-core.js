module.exports = [
{
  id: 'beachhead-market', title: 'Choosing the beachhead market (Step 2)', priority: 1, tier: 'core',
  freq: 'est. high', marks: '10-20 marks (applied)',
  summary: '**Pick exactly ONE segment to dominate first: score 4-6 candidates on seven criteria (economically attractive, accessible, strong value proposition, complete product, competition, strategic value, personal alignment), drop show-stoppers, rank, and justify the winner.**',
  mnemonic: 'E-A-V-C-C-S-P: Economics, Access, Value, Complete product, Competition, Strategy, Passion',
  source: ['CT4107_Notes_03_Segmentation_Beachhead_TAM', 'CT4107_Notes_09_Business_Model_Canvas'],
  sections: [
    { heading: 'Definition and why "beachhead"', items: [
      'A **beachhead market** is the single, specific market segment you enter first and aim to dominate.',
      'Name comes from D-Day: land on one beach with overwhelming force, then use it as a base to attack neighbouring territory.',
      'Once you hold a dominant share you have the strength, references and cash to attack **adjacent markets** with different offerings, building a larger company with each new following.',
      'A startup has too few resources to serve several segments at once: focus beats breadth.'
    ] },
    { heading: 'Why only ONE market', items: [
      'Focus of scarce resources (money, people, time).',
      'Tailored value proposition, persona and sales process; a single message works.',
      'Word of mouth stays inside one community, so customers refer each other.',
      'Easier to become the market leader (dominant share) and to build a defensible position.',
      'The product can be a **complete (whole) product** for one group, which customers actually buy, rather than half a solution for many.'
    ] },
    { heading: 'Three conditions that define "a market" (all must hold)', items: [
      'The customers will **buy the same product** (same needs, same features).',
      'They have a **similar sales process**: same kind of persona, same value proposition, same buying route.',
      '**Word of mouth exists**: they talk to one another, so a satisfied customer sells for you.',
      { type: 'note', text: 'If one of the three fails, you are looking at two markets, not one. Split it further.' }
    ] },
    { heading: 'Process (Step 1 feeds Step 2)', items: [
      '1. Brainstorm segments for the idea (Step 1, market segmentation).',
      '2. Narrow the field to the top **5-6 candidate markets**.',
      '3. Run primary market research on each (interviews, observation, landing pages).',
      '4. Fill in the **Beachhead Market Selection Worksheet**: rate each candidate on each criterion.',
      '5. Eliminate any with a **show stopper**, compute an overall rating, rank 1 (most attractive) to n.',
      '6. Record the **key deciding factors** (what mattered most) and pick the winner.',
      '7. Then define the End-User Profile and persona for it (Steps 3 and 5).'
    ] },
    { heading: 'The seven criteria (worksheet rows)', items: [
      { type: 'table', head: ['Criterion', 'Question to ask'], rows: [
        ['1. Economically attractive', 'Is the segment big enough and rich enough? Can customers pay a price that gives good margins?'],
        ['2. Accessible to our sales force', 'Can we reach decision makers cheaply (channels, contacts, events, referrals)?'],
        ['3. Strong value proposition', 'Do they have a compelling, urgent need and will they pay for our benefit? Is it quantifiable?'],
        ['4. Complete product', 'Can we deliver the full solution (including partners and complementary assets) in a reasonable time?'],
        ['5. Competition', 'Are we up against entrenched incumbents or is the field open? Competition includes "do nothing".'],
        ['6. Strategic value', 'Does winning this segment open doors to adjacent segments (references, learning, assets, brand)?'],
        ['7. Personal alignment', 'Does it fit the team: knowledge, contacts, passion, values, location?']
      ] },
      'Rating scale per cell: **Very High (best), High, Medium, Low, Show Stopper (worst)**. A show stopper in any one criterion removes the candidate.',
      'Overall rating then ranking: 1 = most attractive; list the **key deciding factors** that drove the ranking.'
    ] },
    { heading: 'Worked scoring: AI form-coach for weightlifting racks', items: [
      'Score 1-5 (5 = Very High). Candidates are the segments brainstormed in the lecture example. Scores are illustrative judgements for an exam answer.',
      { type: 'table', head: ['Criterion', 'High-end chain gyms', 'University gyms', 'Home gyms', 'Rehab facilities'], rows: [
        ['Economically attractive', '4', '3', '3', '3'],
        ['Accessible to sales force', '4', '5', '2', '2'],
        ['Strong value proposition', '5', '4', '3', '4'],
        ['Complete product', '4', '4', '5', '2'],
        ['Competition', '4', '4', '2', '3'],
        ['Strategic value', '5', '3', '3', '3'],
        ['Personal alignment', '4', '5', '3', '2'],
        ['TOTAL (max 35)', '30', '28', '21', '19'],
        ['Rank', '1', '2', '3', '4']
      ] },
      'Decision: **high-end chain gyms**. Deciding factors: one sale unlocks many sites (accessible), strong need to protect members from injury and justify premium fees (value), and a chain is a lead customer others will copy (strategic value).',
      'University gyms ranked second: easy access through the college but smaller budgets; a good second beachhead later (adjacent market).',
      { type: 'note', text: 'Home gyms have a complete product (easy to ship) but weak access and crowded consumer-fitness competition; rehab facilities need clinical validation, so the product is far from complete.' }
    ] },
    { heading: 'Totals as a chart', items: [
      { type: 'diagram', kind: 'bar', data: { title: 'Beachhead scores (out of 35)', yLabel: 'Total score', bars: [
        { label: 'High-end chains', value: 30 }, { label: 'University gyms', value: 28 }, { label: 'Home gyms', value: 21 }, { label: 'Rehab', value: 19 }
      ] }, caption: 'Totals from the scoring table above' }
    ] },
    {"heading":"Lecture extras: examples, funnel and narrowing form","items":["Beachhead strategy (slide wording): focus your resources on one key area, usually a smaller market segment or product category, and win (even dominate) it **before** moving into larger markets.","Proverb on the 'why only one market' slide: a person who chases two rabbits catches neither.","Lecture quiz: **Ryanair's beachhead** = fliers interested in low cost, with the trimmings removed. The slides also ask 'who was their beachhead?' for Facebook, Pinterest and Apple but give no answer (general knowledge, not on slides: Facebook began with college students).","Lecture example result: for the weightlifting smart rack the beachhead chosen was **high-end chain gyms** (examples shown: Equinox, Boston Sports Clubs, LA Fitness, 24 Hour Fitness, Anytime Fitness, David Barton Gym).","The 'Stage 1B: Narrow' form asks six questions per candidate end user, then a rank: (1) is the target customer readily accessible to the sales force? (2) is the target customer well-funded? (3) is there a compelling reason to buy? (4) can you deliver a whole product? (5) is there entrenched competition? (6) can you leverage this segment to enter others? These map onto the seven worksheet criteria.",{"type":"diagram","kind":"flow","data":{"direction":"row","steps":[{"label":"Brainstorm markets","sub":"Step 1 form"},{"label":"Deeper analysis","sub":"finite set A-E"},{"label":"Pick first-order beachhead","sub":"one segment"},{"label":"Segment it further","sub":"B1-B4"},{"label":"Target customer profile","sub":"Step 3"},{"label":"TAM","sub":"Step 4"},{"label":"Persona","sub":"Step 5"}]},"caption":"Slide: the journey to the holy grail of specificity (narrow until you reach one real representative customer)"}]},
    { heading: 'Typical exam angles', items: [
      'Define beachhead and explain the strategy (focus, dominate, then adjacent markets).',
      'Given an idea, list candidate segments, pick one, justify using the criteria.',
      'Why is it risky to target everyone? Why one market?',
      'State the three conditions that define a market.',
      'Discuss a segment that scores high on size but fails on accessibility (the trap: biggest is not best).'
    ] }
  ],
  pitfalls: [
    'Picking the biggest market rather than the one you can win first.',
    'Choosing without scoring or without naming deciding factors: the comparison is the marks.',
    'Segments that are too broad ("students") so the three market conditions do not hold.',
    'Ignoring "do nothing" as a competitor and forgetting complementary assets for the complete product.',
    'Treating a show stopper as just a low score: it eliminates the candidate.'
  ]
},
{
  id: 'market-segmentation', title: 'Market segmentation and the segmentation matrix (Step 1)', priority: 2, tier: 'core',
  freq: 'est. high', marks: '8-15 marks (applied)',
  summary: '**Step 1: brainstorm many possible market segments for the technology/idea, describe each in a segmentation matrix (end user, task, benefit, urgency, size, competition...), and narrow to 5-6 candidates.**',
  mnemonic: 'WHO does WHAT, why NOW, how MANY, vs WHOM',
  source: ['CT4107_Notes_03_Segmentation_Beachhead_TAM', 'CT4107_Notes_09_Business_Model_Canvas'],
  sections: [
    { heading: 'What it is', items: [
      'Market segmentation = dividing a customer base into groups of people who are similar in specific ways (age, gender, interests, spending habits, task, need).',
      '**Step 1 of Aulet\'s 24 steps**: market evaluation. Start from the idea/technology and ask "who could use this and for what?".',
      'Brainstorm widely (industries, user types, applications, geography), then **narrow the field to the top 5-6 candidate markets** using primary market research.',
      'Think through the **end-to-end customer journey as the customer sees it**, not just the touchpoints you control (McKinsey).'
    ] },
    { heading: 'Segmentation matrix: fields', items: [
      'Name the segment precisely: capture exactly the group you want and no more (can be general at first, narrow later).',
      { type: 'table', head: ['Field', 'What to write'], rows: [
        ['End user', 'The real person who uses the product (not the economic buyer, not an organisation)'],
        ['Task', 'What the end user does that you significantly affect or let them do for the first time'],
        ['Benefit', 'What the end user gains'],
        ['Urgency of need', 'How urgent is the problem or opportunity?'],
        ['Example end users', 'Named people you have or will talk to, to validate'],
        ['Lead customers', 'Influential (lighthouse) customers whom others will follow'],
        ['Willingness to change', 'How conservative is the segment? Is there a crisis forcing change?'],
        ['Frequency of buying', 'Buying cycle: how often do they buy new products?'],
        ['Concentration of buyers', 'Monopoly, oligopoly (few buyers) or many competitive buyers?'],
        ['Other market considerations', 'High staff turnover, thin margins, high growth, word-of-mouth virality...'],
        ['Size of market', 'Number of end users, to an order of magnitude (10s, 100s, 1Ks, 10Ks, 100Ks, 1M)'],
        ['Est. value of end user', 'First-pass annual value per end user ($1, $10, $100, $1K...)'],
        ['Competition / alternatives', 'From the end user\'s view, including the "do nothing" option'],
        ['Other components for a full solution', 'Complementary assets you do not have but need (the whole product)'],
        ['Important partners', 'Distributors / vendors you must fit into (workflow or channel)'],
        ['Other personal considerations', 'Geography, fit with team values, existing knowledge and contacts']
      ] }
    ] },
    { heading: 'Worked example: weightlifting-form technology', items: [
      'Idea: machine learning and computer vision to check lifting technique and give instant feedback (a smart rack).',
      'Candidate segments brainstormed: ordinary gyms, high-end gyms, university gyms, home gyms, rehab facilities, apartments/hotels, Olympic athletes.',
      'Each gets a column in the matrix, then primary research cuts the list before the beachhead scoring.',
      'The other example (Urban Cake Shop) shows segmenting by **behaviour**: morning commuters, seasonal celebrators, one-time weddings, casual drop-ins, each with different motivation and price sensitivity.'
    ] },
    { heading: 'Segmentation bases to mention', items: [
      '**Demographic**: age, gender, income, job title, education, family status.',
      '**Geographic**: country, urban/rural, region.',
      '**Psychographic**: values, aspirations, fears, lifestyle.',
      '**Behavioural**: buying frequency, usage, loyalty, occasion, benefit sought.',
      'In entrepreneurship the best segments are defined by **end user + task + need**, not demographics alone.'
    ] },
    {"heading":"Step 1 forms and lecture examples","items":["Step 1 is called **market evaluation**. **Stage 1 Brainstorm form**: 'What is my idea or technology? What industries and end users could my idea or technology apply to?' with three columns: industry or similar category, end users, what they would use it for.","**Stage 1B Narrow form** columns: end user | target customer readily accessible to sales force? | well-funded? | compelling reason to buy? | can you deliver a whole product? | entrenched competition? | can you leverage this segment to enter others? | rank. Output: the top 5-6 candidates.","Slide 'Very important step': see the world through the eyes of the **customer** versus through the perspective of the **company**. Segment from the customer's view.","Week 4 deliverable = market segmentation, beachhead market analysis and end-user profiling.",{"type":"note","text":"McKinsey's six actions for managing customer-experience journeys (slides): (1) step back and identify the journeys customers take, from the customer's point of view; (2) understand how they navigate across touchpoints; (3) anticipate needs, expectations and desires at each part of the journey; (4) understand what is working and what is not; (5) set priorities for the most important gaps and opportunities; (6) fix root-cause issues and redesign the journeys end to end."},"**Pregnancy-tracking app** example: market segments = pregnant women, first-time mothers, fathers-to-be, family, close friends, doctors. The lecture picks **first-time mothers** (and asks what the main requirements of such an app are).","**Weightlifting rack (Perch-style)** segmentation matrix, columns: chain gyms (discount/mainstream), chain gyms (high end), varsity athletic weight rooms (college), professional weight rooms, home gyms, rehab facilities, apartments/offices, Olympic training facilities, high-end non-chain gyms. Rows: examples, pros, cons, motivations of the economic buyer, regulatory climate, competitive environment, early adopters.","High-end chain gyms, **pros**: less concerned about equipment price; more concerned with image; easier to expand to other locations and to follow-on markets; large market size. **Cons**: current lack of contacts; equipment must be extremely good quality; improving athletes is not their main motivation (value proposition mismatch). Other potential markets: varsity/professional athletics programmes, home gyms, mainstream/budget gyms."]},
    { heading: 'Typical exam angles', items: [
      'Segment the market for idea X: list at least 4-6 distinct segments with a differentiator for each.',
      'Explain the difference between end user, economic buyer and customer (Step 12 introduces the buyer/champion).',
      'Fill a segmentation matrix row for one segment.',
      'Explain why segmentation must be backed by primary market research, not desk guesses.'
    ] }
  ],
  pitfalls: [
    'Listing industries instead of end users with a task ("healthcare" is not a segment).',
    'Writing an organisation as the end user; it must be a real person.',
    'Forgetting urgency and willingness to change: a big segment that does not care is no market.',
    'No evidence from interviews/observation.'
  ]
},
{
  id: 'tam-sam-som', title: 'TAM, SAM, SOM and calculating TAM (Step 4)', priority: 3, tier: 'core',
  freq: 'est. high', marks: '5-10 marks (calculation)',
  summary: '**TAM = annual revenue you would earn at 100% share of the beachhead market; estimate bottom-up (end users x units x purchases per year x price), cross-check top-down; SAM is the part you can serve, SOM the part you can realistically win.**',
  mnemonic: 'TAM = Total, SAM = Serve, SOM = Snatch (obtain)',
  source: ['CT4107_Notes_03_Segmentation_Beachhead_TAM'],
  sections: [
    { heading: 'Definitions', items: [
      '**TAM (Total Addressable Market)**: total market demand for the product, with no limits on geography, price or distribution. Aulet\'s Step 4: the **annual revenue (per year) you would earn if you won 100% share** of the beachhead market.',
      '**SAM (Serviceable Available Market)**: the part of TAM you can realistically target and serve, given geography, pricing, regulation and distribution.',
      '**SOM (Serviceable Obtainable Market)**: the part of SAM you can realistically capture given sales/marketing capability, competition and market saturation.',
      'Always TAM >= SAM >= SOM. A funnel: TAM (everyone) then SAM (those we can serve) then SOM (those we will win).',
      'Purpose: is the beachhead **big enough to be interesting** (to you, to investors), and is it sensible to start there?'
    ] },
    { heading: 'Top-down vs bottom-up', items: [
      { type: 'table', head: ['', 'Top-down', 'Bottom-up'], rows: [
        ['Method', 'Start from a big industry figure (population, total market from reports) and cut it down by percentages', 'Build from the unit: number of end users x units x purchase frequency x price'],
        ['Data', 'Industry research, census, analyst reports', 'Own research, interviews, price tests, comparables'],
        ['Strength', 'Quick; good sanity check', 'Credible, defensible, ties to your price and customers'],
        ['Weakness', 'Easy to overstate ("1% of a huge market"); not tied to real buyers', 'Needs realistic data and estimates; more work'],
        ['Lecture view', 'Use as a cross-check', 'The effective approach: needs **realistic data and realistic estimation**']
      ] }
    ] },
    { heading: 'Bottom-up formula (lecture)', items: [
      { type: 'formula', label: 'Bottom-up TAM (per year)', text: 'TAM = N x Q x F x P' },
      'N = total population of potential end users in the beachhead.',
      'Q = how many units each buys at a time.',
      'F = purchase frequency (purchases per year).',
      'P = intended selling price per unit.',
      'Aulet\'s workbook estimates the **annualised revenue per end user** three ways and takes a consensus range: (I) one-time charge: (price x units) / average life in years; (II) budget: end user\'s budget x % that could reasonably go to this solution; (III) comparables converted to annual revenue. Then TAM = number of end users x annual revenue per user.',
      { type: 'formula', label: 'One-time charge, annualised', text: 'Annual revenue per user = (price per unit x units per user) / average life of product in years' },
      { type: 'formula', label: 'Budget method', text: 'Annual revenue per user = total budget per user x % of budget that could go to this solution' }
    ] },
    { heading: 'Worked example 1: top-down then bottom-up (pregnancy app, Ireland)', items: [
      'Top-down funnel from the lecture (countrymeters): females in Ireland 2,465,802, then pregnancies per year about 75,713, then first-time mothers about 30,306 (40% of pregnancies).',
      'Bottom-up for an app: N = 30,306 first-time mothers, Q = 1 app per mother, F = 1 purchase (one-time, per pregnancy), price assumed EUR 5.',
      { type: 'formula', label: 'Result', text: 'TAM = 30,306 x 1 x 1 x EUR 5 = EUR 151,530 per year' },
      'Reading: a very small market (about EUR 150k a year) unless a higher price, a subscription or the wider EU is added. This answers "is it big enough to be interesting?" with: probably not as a standalone beachhead.',
      { type: 'diagram', kind: 'bar', data: { title: 'Top-down funnel, Ireland (people)', yLabel: 'People', bars: [
        { label: 'Females', value: 2465802 }, { label: 'Pregnant per year', value: 75713 }, { label: 'First-time mothers', value: 30306 }
      ] }, caption: 'Each filter cuts the population down to the real end users' }
    ] },
    { heading: 'Worked example 2: Perch-style smart gym racks (USA)', items: [
      'From the lecture: 35,000 gyms in the USA, of which 3,000 are high-end chain gyms; each gym would buy 4 racks.',
      'Units in beachhead = 3,000 x 4 = **12,000 units** (the lecture\'s "12k+ units"). Selling to all 35,000 gyms would be 140,000 units.',
      'Assume (for the exam) a price of USD 5,000 per rack: TAM = 12,000 x 5,000 = **USD 60,000,000** one-time.',
      'If a rack lasts 5 years and you annualise: 60,000,000 / 5 = **USD 12,000,000 per year**.',
      'Note how the beachhead (3,000 chain gyms) gives a much smaller but more focused TAM than all gyms.',
      { type: 'diagram', kind: 'bar', data: { title: 'Rack units (USA)', yLabel: 'Units', bars: [
        { label: 'All 35,000 gyms x4', value: 140000 }, { label: '3,000 high-end x4', value: 12000 }
      ] }, caption: 'TAM of the beachhead vs the whole gym market' }
    ] },
    { heading: 'Worked example 3: per-user annual revenue (workbook method)', items: [
      '(I) One-time: price 1,200, 1 unit, life 4 years: 1,200 x 1 / 4 = **300 per year**.',
      '(II) Budget: budget 10,000, 5% could go to this solution: 10,000 x 0.05 = **500 per year**.',
      '(III) Comparable product: 400 per year.',
      'Consensus range 300-500; take the mid-point **400** as the working figure. With 3,000 end users: TAM = 3,000 x 400 = **1,200,000 per year**.'
    ] },
    {"heading":"More lecture material: sanity check, three levels, rental example, top-down worksheet","items":["Step 4 slide: the beachhead TAM calculation is your **sanity check that you are headed in the right direction**. Sweet spot = big enough to get positive cash flow; too small = uninteresting; too big = danger (too big to veer, you cannot dominate it).","The lecture asks 'is the market big enough to be interesting?' and 'what % of the global market can we capture, how many customers can we obtain and what is the revenue per customer?'.","Make a **first-pass TAM for your first (beachhead) market only**. The strong preference is **bottom-up**: show from primary market research how many of the potential customers you identified and extrapolate to the broader market. Top-down (market-analysis reports, extrapolating without direct interaction and validation) is complementary but much less compelling, because very important subtleties are missed.","Venn on the Step 4 slides: **Total** market (everyone), **Served available** market (how many can I reach with my sales channel), **Target** market (for a startup: who will be the initial buyers). Note: slides label TAM both 'Total Addressable' and 'Total Available' market; use the Step 4 definition (annual revenue at 100% share of the beachhead).",{"type":"table","head":["Level (US rental units example)","Units","Revenue","How it is built"],"rows":[["Total available market: all US rental units","42.58M","USD 1.02B per year","42.58M x 2 residents per unit x USD 1 per month x 12"],["Served available market: Manhattan rental units","0.59M","USD 14.2M per year","0.59M x 2 x USD 1 x 12 = 14.16M"],["Target market: Manhattan high-rise buildings with over 100 units","190K","USD 1.4M per year","190K x 2 x 30% adoption x USD 1 x 12 = 1.368M"]]},"Sources cited on the slide: US Dept of Housing and Urban Development 2015; National Multifamily Housing Council; landlordstation.com. Assumptions stated on the slide: 2 residents per unit; 30% user adoption; USD 1 per month per user (always state assumptions and sources).","Top-down estimate **worksheet** (funnel): number of people in your largest demographic or psychographic characteristic, then 1st segmentation based on end-user profile (% of previous segment, assumptions, sources), then 2nd and 3rd segmentation, ending with the **end users in the beachhead market**. Every filter needs a stated %, an assumption and a source.","Smart-rack funnel from the slides (Perch example): 35,000 gyms in the USA, then 3,000 high-end chain gyms, then 4 racks each, giving TAM of 12k+ units. Total market context: 34 million Americans weightlifted in 2014, up 38% since 2000. Follow-on markets: mainstream chain/franchised gyms, budget gyms. Other potential beachheads: sports performance facilities, professional/college facilities.","Perch (the slide's example product) is software-enabled gym hardware that uses computer vision and machine learning to track movement during weightlifting and give instant feedback; slide claims: versatile, compact (attaches to any rack in minutes), passive (no wearables).","Workbook layout for annualised revenue per end user: I one-time charge (price per unit, units per end user, average life, annualised = price x units / life), II budget available (current spend, total budget, % that could go to this solution, annualised = budget x %), III comparables (who and which products, converted to annualised revenue), IV interpretation (consensus range, and how you reached it)."]},
    { heading: 'Typical exam angles', items: [
      'Define TAM, SAM, SOM with an example for a given idea.',
      'Compute a bottom-up TAM from given data and state assumptions.',
      'Compare top-down and bottom-up; which would an investor trust?',
      'Is the market big enough? Interpret the number (very small = too niche; very large and diffuse = not a beachhead).'
    ] }
  ],
  pitfalls: [
    'Using the "1% of a huge market" shortcut: it is unconvincing and not tied to buyers.',
    'Forgetting the time unit: TAM in the lecture is **per year**; if a product lasts several years, annualise it.',
    'Mixing end users with economic buyers (count the people who actually pay).',
    'Calculating TAM for the whole idea rather than for the **beachhead** only.',
    'No stated assumptions: every figure needs a source or a labelled assumption.'
  ]
},
{
  id: 'qvp', title: 'Quantified Value Proposition (Steps 8-9)', priority: 4, tier: 'core',
  freq: 'est. high', marks: '6-12 marks',
  summary: '**QVP = convert the benefit for the persona into one tangible metric on the persona\'s #1 priority: As-Is state (X) versus Possible/To-Be state (Y), so value = difference of X and Y.**',
  mnemonic: 'QVP: X (as-is) to Y (to-be) on Priority #1, in numbers',
  source: ['CT4107_Notes_07_Product_Spec_QVP'],
  sections: [
    { heading: 'Definition', items: [
      'A **Quantified Value Proposition** converts the benefits your persona gets into a tangible **metric aligned with the persona\'s top priority** (sometimes top priorities).',
      'Core question: "what value am I getting from this product?" answered in numbers, because **if you cannot measure it you cannot demonstrate added value**.',
      'Focus on what the customer **gains**, not on technology, features and functions.',
      'Build it, illustrate it and **validate it with multiple target customers**.',
      'Do not forget the other priorities: ensure nothing decreases in the persona\'s other key priorities that would offset your benefit.'
    ] },
    { heading: 'How to build it (steps)', items: [
      '1. Take the persona\'s **#1 priority** (the thing they care most about); this is the dimension on which value is measured.',
      '2. State the **As-Is state**: what do customers achieve on that dimension today (current solution, or do nothing)?',
      '3. State the **Possible (To-Be) state**: what could be achieved with your product?',
      '4. The value proposition is the **difference** between X (as-is) and Y (to-be), expressed in the same unit.',
      '5. Make sure it is a **significant improvement** and easy to buy; back the claim with the support that underpins it (pilot data, research, test results).',
      '6. Validate with customers; iterate.'
    ] },
    { heading: 'Template', items: [
      { type: 'table', head: ['Part', 'Fill in'], rows: [
        ['Persona and priority #1', 'e.g. gym owner, member retention'],
        ['As-Is state (X)', 'measured today on the priority metric'],
        ['To-Be state (Y)', 'measured with the product'],
        ['Quantified value', 'Y - X (and % change, time/money saved)'],
        ['Support (why believable)', 'pilot, benchmark, research reference'],
        ['Check other priorities', 'confirm no decrease elsewhere']
      ] },
      'Sentence form: "For [persona], whose top priority is [P], our product moves [metric] from [X] to [Y], saving/earning [Z] per [period]."'
    ] },
    { heading: 'Pains and gains (from benefits to metric)', items: [
      'List the persona\'s **pains** (what goes wrong, obstacles) and **gains** (what they want and how they measure success).',
      'Student accommodation app example: pains = search takes too long and is stressful, landlords respond slowly, no unified search app; gains = find clean suitable places near college, less stress. A quantified version: "reduce time to find accommodation from 6 weeks to 1 week".'
    ] },
    { heading: 'Lecture examples (worked)', items: [
      '**Bovine disease detection (Meater, "faster quarantine of sick animals")**: BRD symptoms appear biologically 2-4 days before cattle look visibly ill. Slide tree for 200 cattle that develop BRD: **As-Is** 50 deaths plus 150 illnesses = loss to disease **USD 63k**; **with Meater** 25 deaths plus 175 illnesses = loss **USD 40k**; **saving USD 23k**. Sale price USD 7 per cow and the device can be reused four times.',
      'Check from the slide unit costs: death = USD 997 lost revenue per head; each illness = treatment 16 + reduced feed efficiency 15 + lower-quality grade 58 = USD 89 per head. As-Is: 50 x 997 + 150 x 89 = 49,850 + 13,350 = 63,200. With sensor: 25 x 997 + 175 x 89 = 24,925 + 15,575 = 40,500. Saving = 22,700, about 23k.',
      'Check the saving: 63,000 - 40,000 = **23,000** per year.',
      '**X-treme sunscreen for athletes**: lasts 6 times longer, 5 times more effective, 3 times less quantity applied; stays 100% effective after all events. Every claim is a multiplier on the athlete\'s priority (protection during events).',
      'Another: a collaboration tool for ideation and design that reduces production time and accelerates product launches (metric: weeks to launch).'
    ] },
    { heading: 'QVP vs value proposition vs USP', items: [
      '**Value proposition**: the promise of benefit to a customer segment (qualitative).',
      '**QVP**: the same promise **with numbers** on the persona\'s #1 priority.',
      '**USP (unique selling proposition)**: what makes you different from alternatives; sustained over time by your **core** (the moat).',
      'In the lecture exercise the three are separate questions: "Value proposition? QVP? USP?"'
    ] },
    { heading: 'Chart: as-is vs to-be (bovine example)', items: [
      { type: 'diagram', kind: 'bar', data: { title: 'Loss to disease (USD thousand)', yLabel: 'USD k', bars: [
        { label: 'As-Is', value: 63 }, { label: 'With sensor', value: 40 }, { label: 'Saving', value: 23 }
      ] }, caption: 'QVP: loss falls from 63k to 40k, a saving of 23k' }
    ] },
    {"heading":"Value proposition: four essential elements (slide)","items":[{"type":"table","head":["Element","Question","Content"],"rows":[["1 The customer's perspective","Customer needs and insights","What problems do they need to solve? How can they increase sales? How can they reduce costs?"],["2 What's in it for them?","Promise of value that resonates","Benefits that add value; solving their urgent problems; why they should care about your solution"],["3 Why choose to buy from you?","Competitive differentiation","Demonstrate points of difference that matter to customers; put action plans in place to improve points of parity"],["4 Prove it","Proof and quantification","Create trust (why should the customer believe you?); quantify the benefits in your customers' language"]]},"A value proposition shows how products or services create value for a **specific customer segment**. Element 4 is what the QVP adds.","Slide on measurement (Lord Kelvin): if you cannot express what you are talking about in numbers, your knowledge is meagre; hence 'what value do I get out of this product?' must become a tangible metric (benefit to metric).","**Gain creators and pain relievers** (value-proposition-canvas language): list the persona's pains (up to 5) and gains (up to 5); your products and services act as pain relievers and gain creators; link back to the persona and user profile.","The chain of steps: user profile, then persona with ranked priorities, then pains and gains, then QVP (as-is X, possible state Y, value = difference measured on priority #1), which also feeds competitive positioning. 'You have to be sure there is no decrease in the other key priorities that offsets the benefits you create.'"]},
    {"heading":"More lecture examples with numbers","items":[{"type":"table","head":["Example: ideation-to-launch collaboration tool","Ideation","Design","Production","Commercialisation"],"rows":[["As-Is","3 weeks","10 days","1 week","1 month"],["To-Be","2 weeks","5 days","1 week","1 month"],["Reduction","33%","50%","0%","0%"]]},"Overall: 21+10+7+30 = 68 days as-is versus 14+5+7+30 = 56 days to-be, an **18% reduction** in time to launch (12/68 = 17.6%). Slide rule: **have references or justification for every figure**.",{"type":"table","head":["Sunscreen for athletes","Existing sunscreen","X-treme sunscreen"],"rows":[["Triathletes (events of about 2-10 hours: swim, bike, run)","Gone after the swim","Effective after all events"],["Marathon runners (about 4 hours)","Effectiveness falls from 100% to 45% to 20% during the run","100% effective after all events"],["Claims","-","Lasts 6 times longer; 5 times more effective; 3 times less quantity applied"]]},"**Sports application** (help people engage in new sports): pains = students find it difficult to join sports clubs; clubs find it difficult to recruit members. VP = students remain active and become more social; clubs regain members, increase revenue and boost morale. Note the VP is stated qualitatively; a QVP would add numbers (e.g. membership sign-ups).","Exercise on slides: for **Ryanair**, state the value proposition, the QVP and the USP (three different things)."]},
    { heading: 'Typical exam angles', items: [
      'Write a QVP for a given product and persona (with assumed numbers, labelled as hypotheses).',
      'Explain why quantifying matters and why benefits beat features.',
      'Critique a weak QVP (vague "better", no baseline, wrong priority).',
      'Link QVP to competitive positioning (the same two priorities become the chart axes).'
    ] }
  ],
  pitfalls: [
    'Describing features ("uses machine learning") instead of the benefit in the customer\'s metric.',
    'No As-Is baseline: an improvement from nothing is meaningless.',
    'Measuring on the wrong priority (not the persona\'s #1).',
    'Inventing precise numbers with no support; present them as pilot targets to validate.',
    'Ignoring side effects on other priorities (cost, usability) that cancel the gain.'
  ]
}
];
