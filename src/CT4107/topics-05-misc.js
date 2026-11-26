module.exports = [
{
  id: 'windows-of-opportunity', title: 'Windows of opportunity and triggers', priority: 15, tier: 'possible',
  freq: 'est. medium', marks: '4-6 marks',
  summary: '**A window of opportunity (WoO) is a time when the buyer is open to your offer; a trigger is a specific action you take inside it that creates urgency (discount, limited supply, time limit, free stuff, sales-rep interaction).**',
  mnemonic: 'WINDOW = when they are open; TRIGGER = what you do to make them act NOW',
  source: ['CT4107_Notes_09_Business_Model_Canvas'],
  sections: [
    { heading: 'Definitions', items: [
      '**Window of opportunity**: a time when your target end user, economic buyer, champion or influencer will be particularly open to considering your offering.',
      '**Trigger**: within the window, a specific action you take to create urgency or a strong incentive for the target customer to act.',
      'Illustration (general knowledge, not from the slides): lemonade sells on a hot day (window) but not in snow; even then you need a well-designed trigger.'
    ] },
    { heading: 'Examples', items: [
      { type: 'table', head: ['Windows', 'Triggers'], rows: [
        ['Holiday season', 'Discount (expiring)'],
        ['End of fiscal year, beginning of budgeting cycle', 'Limited supply / scarcity'],
        ['Life transitions, change in leadership', 'Time-bounded offer'],
        ['Crisis, or a competitor acquired (e.g. by Oracle)', 'Free stuff, e.g. free audit of customer\'s status'],
        ['Start of school year (students)', 'Back-to-school sales, giveaways, trade-in programme'],
        ['After a high-visibility security breach', 'Sales-rep interaction; avoid-disaster messaging'],
        ['Valentine\'s Day', 'Jewellery discount']
      ] },
      'Expedia "2 seats remaining at this price" combines scarcity with a looking-at-flights window.',
      'Use in the life-cycle use case: stage 1 catalyst to act; and in go-to-market planning.'
    ] },
    {"heading":"How to create a trigger (slide)","items":["Five trigger pictures on the slide: **expiring discount**, **time-limited offer**, **scarcity**, **free stuff**, **sales-rep interaction**. Written list: discount, limited supply, time bounded, community, avoid disaster.","Slide title: 'but you also need a well-designed trigger'. The windows list also includes life transitions, change in leadership and crisis."]},
    { heading: 'Typical exam angles', items: [
      'Define WoO and trigger and give an example for a named startup.',
      'Identify the window and the trigger in a scenario.'
    ] }
  ],
  pitfalls: [
    'Treating a trigger as the window: window = timing/context; trigger = your action.',
    'Triggers with no real incentive or urgency.'
  ]
},
{
  id: 'disciplined-entrepreneurship', title: 'Disciplined Entrepreneurship: the 24 steps and course deliverables', priority: 13, tier: 'likely',
  freq: 'est. medium-high', marks: '5-10 marks',
  summary: '**Aulet\'s 24-step MIT framework is a teachable process for building a startup around six themes; the course deliverables follow the early steps: idea, segmentation/beachhead/profile, persona and use case, QVP/spec, BMC, video pitch.**',
  mnemonic: '6 themes: WHO customer, WHAT for them, HOW they buy, MONEY, BUILD, SCALE',
  source: ['CT4107_Notes_01_Introduction', 'CT4107_Notes_03_Segmentation_Beachhead_TAM', 'CT4107_Notes_07_Product_Spec_QVP'],
  sections: [
    { heading: 'What it is', items: [
      'Disciplined Entrepreneurship (Bill Aulet, MIT) turns entrepreneurship into a **process**: six questions and 24 steps (the "DE canvas").',
      'Benefits: raises odds of success, structures the startup, gives a common language, exposes weak points.',
      'Six themes: **Who is your customer? What can you do for your customer? How does your customer acquire your product? How do you make money? How do you design and build your product? How do you scale?**'
    ] },
    { heading: 'The 24 steps', items: [
      { type: 'table', head: ['Theme', 'Steps'], rows: [
        ['Who is your customer?', '1 Market segmentation, 2 Select a beachhead market, 3 Build an end-user profile, 4 Calculate the TAM size for the beachhead market, 5 Profile the persona for the beachhead market, 9 Identify your next 10 customers'],
        ['What can you do for your customer?', '6 Full life-cycle use case, 7 High-level product specification, 8 Quantify the value proposition, 10 Define your core, 11 Chart your competitive position'],
        ['How does your customer acquire your product?', '12 Determine the decision-making unit (DMU) of the customer, 13 Map the process to acquire a paying customer, 18 Map the sales process to acquire a customer'],
        ['How do you make money off your product?', '15 Design a business model, 16 Set your pricing framework, 17 Calculate the lifetime value (LTV) of an acquired customer, 19 Calculate the cost of customer acquisition (COCA)'],
        ['How do you design and build your product?', '20 Identify key assumptions, 21 Test key assumptions, 22 Define the minimum viable business product (MVBP), 23 Show that "the dogs will eat the dog food"'],
        ['How do you scale your business?', '14 Calculate the TAM size for follow-on markets, 24 Develop a product plan']
      ] },
      { type: 'note', text: 'The lecture works through steps 1-11 in detail and the business model (step 15) via the BMC. Steps 12-24 are named on the slide map; know their names and their place in the sequence.' }
    ] },
    { heading: 'Course deliverables (team portfolio)', items: [
      { type: 'table', head: ['Week', 'Deliverable'], rows: [
        ['2', 'Idea generation'],
        ['4', 'Market segmentation, beachhead market analysis, end-user profiling'],
        ['6', 'Customer persona, life-cycle use case'],
        ['8', 'Quantified value proposition, high-level specification'],
        ['10', 'Business model canvas / business plan'],
        ['12', 'Video pitch (submit to Student Entrepreneur Awards)']
      ] },
      'Also competitive positioning and mapping the product acquisition process; attendance and participation. Teams of **2 to 4**; assessed on quality of work, collaboration, design and justification of choices.',
      'Teams keep an online portfolio documenting their journey.'
    ] },
    { heading: 'Using AI tools (MIT Orbit / AI Jetpack)', items: [
      'The class trials MIT Orbit, whose AI assistant fills out the 24 steps from your idea.',
      'AI output is treated as **unproven hypotheses** to validate or invalidate with your own research.',
      'Keep an **AI Interaction Log** (exact prompts, weaknesses of responses, iterations forced).',
      'Append a **Delta Log** for each DE step using Orbit: how you cross-referenced, audited and corrected the AI assumptions (users, behaviour, market size, data, technology).'
    ] },
    { heading: 'Idea pitch before step 1', items: [
      'Pick your best idea: what it does, the problem solved, customers, value, competitors, USP, who/what is needed.',
      '**Elevator pitch** components: the **benefit** (what the customer gets, not the product), the **differentiator**, the **ask** (call to action, e.g. another meeting or feedback).'
    ] },
    {"heading":"Extra from the slides","items":["The 24 steps are drawn as a snaking game board starting at step 1 (market segmentation) and ending at step 24 (develop a product plan). Step numbers follow the order of work, but the six themes group them differently (for example step 9 sits in 'who is your customer' and step 14 in 'how do you scale').","Slide: 'What's one of the most important components of a new commercial enterprise?' Answer shown: **paying customers**.","Slide: for the pitch, pick your best idea and answer: what it does, what problem it solves, who the customers are, what value, who the competitors are, your USP, who or what is needed to make it real.","Slide rules for AI use: from step 1 you may use the AI-assisted tool or do the work yourselves in the workbooks; either way validate all assumptions and claims with references; 'it is foolish to assume the AI-generated analysis is trustworthy'.","Team formation slide: 'Which team would you prefer to work in? Think about key success factors in high-performing teams you have been in'. Work on an idea the team is excited about; ideation and team formation determine your experience; change the idea mid-semester if it dead-ends.","The class needs **Idea, Team, Process**."]},
    { heading: 'Typical exam angles', items: [
      'Outline the 24-step process and justify why it is useful.',
      'Order the steps from segmentation to MVBP and say what each produces.',
      'How should AI output be treated in the process? (hypotheses, delta log.)'
    ] }
  ],
  pitfalls: [
    'Mixing up step order (profile before TAM, persona before use case).',
    'Treating AI output as fact.',
    'Forgetting that the process is iterative: change the idea if it dead-ends.'
  ]
},
{
  id: 'pitch-video-deliverables', title: 'Video pitch and Student Entrepreneur Awards', priority: 19, tier: 'low',
  freq: 'est. low', marks: '2-5 marks',
  summary: '**The final deliverable is a 2-minute video pitch: be clear and upfront about the idea, USP, competition and facts and figures with references; sound quality is vital.**',
  mnemonic: 'IDEA, USP, COMPETITION, FACTS + REFS; sound is VITAL',
  source: ['CT4107_Notes_11_Video', 'CT4107_Notes_11b_Useful_Tools_Links', 'CT4107_Notes_09_Business_Model_Canvas'],
  sections: [
    { heading: 'Video pitch rules', items: [
      'Be very clear and upfront about: your idea, USP, competition, facts and figures on need and market.',
      'Cite sources for facts (e.g. author and year); show the full references as an image at the end.',
      'Use the space well and really sell your idea; **sound quality is vital**.',
      'Include facts, figures and references.'
    ] },
    { heading: 'Student Entrepreneur Awards (Enterprise Ireland)', items: [
      'Stage 1: submit a 2-minute video pitch (provisional close 6 March 2026).',
      'Stage 2: top 50 submit a business plan (announced 27 March, plans due 1 May).',
      'Stage 3: top 10 chosen (15 May) and present to a judging panel (28 May); winner announced 29 May.',
      'Note: dates are provisional on the slide; the course deadline for the video is week 12.'
    ] },
    { heading: 'Production tools (not examinable detail)', items: [
      'Free clips and images (Pixabay, Pexels, Unsplash), royalty-free music, text-to-audio, online editors (Photopea, Kapwing, Animoto), desktop editors (Filmora leaves a watermark, VideoPad does not).'
    ] },
    {"heading":"Enterprise Ireland guidance shown on the slides","items":["How to sell the idea to the judges: be **passionate** (judges want the people as well as the idea); be **impactful and clear** (two minutes to tell the full story, define the proposition clearly in the first **30 seconds**); stage one is the two-minute video and it is referenced through every later stage.","Five video requirements: (1) clearly define the business proposition/idea, (2) explain the problem it solves and how it works, (3) highlight how the idea is innovative, (4) identify the target customer and why they would buy it, (5) highlight the idea's **export potential**.","How to stand out: imagine pitching to customers (level tone of delivery), practice makes perfect, record in a quiet place (no background noise, good sound), ask friends or family for feedback.","Entry criteria: students own, control and manage their IP where applicable; not-for-profit and social entrepreneurship applicants must operate in a commercial domain; ambition to start the business in Ireland with headquarters here; **maximum five students per team** (the course teams are 2-4).","What judges look for: is there a market/commercial potential? what is the unique selling point? has the team built a proof of concept? have students tested with real users in the target market? does the team understand key financials?","Stages: stage 1 two-minute video; stage 2 top 50 submit a business plan; stage 3 ten projects present to the judging panel at the ceremony. The slides also show the 2025 dates (video 14 March, top 50 on 4 April, plans 9 May, top 10 on 23 May, final 5-6 June); the 2026 dates in the other deck are provisional.","Course note: one deliverable left after the canvas, the video, to be completed by the end of week 12."]},
  ],
  pitfalls: [
    'Pitch with claims but no sources.',
    'Poor audio.',
    'Describing the product instead of the benefit and differentiator.'
  ]
}
];
