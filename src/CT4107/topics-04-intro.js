module.exports = [
{
  id: 'intro-innovation', title: 'Innovation, invention, entrepreneurship and the entrepreneurial process', priority: 14, tier: 'possible',
  freq: 'est. medium', marks: '5-10 marks (essay)',
  summary: '**Innovation = invention x commercialisation: an invention is a creative idea, an innovation makes it feasible and turns it into a product or service customers value; entrepreneurship is creating a new venture that produces something valuable and is economically sustainable.**',
  mnemonic: 'INNOVATION = INVENTION x COMMERCIALISATION; venture must be economically sustainable',
  source: ['CT4107_Notes_01_Introduction', 'CT4107_Notes_02a_Week2_Part1'],
  sections: [
    { heading: 'Definitions', items: [
      '**Innovation**: using new technology and new ways of thinking to add value to an existing idea or product and make substantial changes in society; "new, organic value creation by applying creativity, in-depth relationships with consumers and customers, and new thinking".',
      'Also: executing an idea which addresses a specific challenge and achieves value for both company and customer; implementation or creation of something new that has realised value to others.',
      '**Invention** = a creative idea. **Innovation** = makes the idea feasible and turns it into a product/service that satisfies customers\' needs.',
      { type: 'formula', label: 'Lecture equation', text: 'Innovation = Invention x Commercialisation' },
      'If either factor is zero, innovation is zero: a brainstorm with dozens of ideas shows creativity but "there is no innovation until something gets implemented".',
      'Innovation is the cornerstone of sustained economic growth and prosperity (OECD).',
      '**Entrepreneurship / creation of new businesses**: the formation of a new venture that produces a product/offering that creates some value to make it **economically sustainable**.'
    ] },
    { heading: 'Innovation is more than new products', items: [
      'It can concern new markets, new marketing methods, new processes or new business models.',
      'It often builds on **old ideas and resources**: Scotch Tape (1930, industrial packaging) was later resold as Sellotape (tape plus dispenser) as an office commodity.',
      'It can be **accidental**: in 1968 Dr Spencer Silver at 3M tried to make a super-strong adhesive and instead made a low-tack reusable pressure-sensitive adhesive (later Post-it notes).',
      'Innovators watch for **changes** that hint at future opportunities. Problems lead to questions lead to innovations.',
      'Product innovation often grows around a **core technology**: the internal combustion engine led to cars, planes, boat engines; then fuel injection, turbocharging, rotary engines. Image-sensor core led to digital cameras, DSLRs and AI subject tracking.'
    ] },
    { heading: 'Existing business vs new innovation-based business', items: [
      { type: 'table', head: ['', 'Existing business', 'Innovation-based new business'], rows: [
        ['Model', 'Proven model; executes and optimises', 'Model unproven; must be discovered and validated'],
        ['Risk', 'Lower', 'High; "trying is the first step towards failure"'],
        ['Customers', 'Existing', 'Must be found, starting with one beachhead market'],
        ['Method', 'Operate efficiently', 'Experiment, iterate, pivot (disciplined process)']
      ] }
    ] },
    { heading: 'The entrepreneurial process', items: [
      { type: 'diagram', kind: 'flow', data: { direction: 'row', steps: ['Identify an opportunity', 'Establish a vision', 'Persuade others', 'Gather resources', 'Create new venture, product or market'], loopBack: 'Change and adapt with time' }, caption: 'Entrepreneurial process from the lecture' }
    ] },
    { heading: 'Is entrepreneurship teachable?', items: [
      'Yes: per Bill Aulet (MIT) it is "not magic, it is work, a process, and a process can be taught"; it is accessible (anyone can do it) yet produces unique products.',
      'A teachable craft, **not innate talent**; apprenticeship model: theory merged with practice.',
      'A process (disciplined entrepreneurship) substantially increases odds of success, gives structure to a critical element of starting a company, a **common language**, and identifies questions and weak points.',
      'Three things for the class: **Idea, Team, Process**. Take team formation seriously; be willing to change a dead-end idea.'
    ] },
    {"heading":"Extra lecture content: sources of innovation, ways to start, science-craft-art","items":["**Drucker's 7 sources of innovation** (slide): (1) the unexpected (surprise success or failure), (2) incongruities (discrepancy between what is and what should be), (3) process needs (a bottleneck or weak link in a critical process), (4) industry and market structure changes, (5) demographics (moving populations, changing age, education, disposable income), (6) changes in perception, meaning and mood (views of life, how people feel about things), (7) new knowledge (new technologies and discoveries). Innovators attend to changes that give clues to future opportunities.","Ways to start a new venture (slide cartoon): 'I have a technological breakthrough', 'I have an idea', 'I have a passion'.","'The truth' slide: entrepreneurship sits on a spectrum between **science** and **art**, nearest to **craft** (hence teachable). Slide jokes about the 'entrepreneurship gene' to make the point it is not innate.","Course objective: 'primary goal is not to give a fish but to teach how to fish' (Chinese proverb): learn the process.","'Everyone has the ability to innovate': problems lead to questions which lead to innovations. Businesses that invest in creativity: more likely to raise employee productivity by 73% and foster innovation by 83% (slide figures).","Post-it story dates: invented 1968 (Dr Spencer Silver, 3M); slide shows 1979, then USA 1980 and EU 1981.","Where to look for ideas: emerging technology lists (WEF Top 10 Emerging Technologies of 2025, EY emerging technologies, medical futurist, transport trends) or search 'emerging technology trends in X'."]},
    { heading: 'Typical exam angles', items: [
      'Distinguish invention, creativity and innovation, with an example.',
      'Explain the equation Innovation = Invention x Commercialisation.',
      'Outline the entrepreneurial process.',
      'Argue whether entrepreneurship can be taught.'
    ] }
  ],
  pitfalls: [
    'Equating innovation with invention or with "a new gadget".',
    'No example (3M sticky note, Scotch to Sellotape, ICE core technology).',
    'Forgetting that the venture must be economically sustainable.'
  ]
},
{
  id: 'types-of-innovation', title: 'Types of innovation', priority: 18, tier: 'possible',
  freq: 'est. medium', marks: '5-10 marks',
  summary: '**Know the types with a lecture example each: product, process, service, business model, incremental/sustaining, frugal, reinnovation, disruptive.**',
  mnemonic: 'P-P-S-B + I-F-R-D: Product, Process, Service, Business model; Incremental, Frugal, Re-innovation, Disruptive',
  source: ['CT4107_Notes_01_Introduction', 'CT4107_Notes_02a_Week2_Part1'],
  sections: [
    { heading: 'Types with definition and example', items: [
      { type: 'table', head: ['Type', 'Definition', 'Lecture example'], rows: [
        ['Product innovation', 'New or improved product: features, performance, look; often built on a core technology', 'Peloton: integrated hardware, software, social fitness platform; better camera on a phone'],
        ['Process innovation', 'New or significantly improved methods of producing a good or delivering a service: efficiency, effectiveness, value creation; remove bottlenecks, cut cost, increase speed and quality', 'Agile transformed how teams build software; automation; improving canteen, hospital, transport'],
        ['Service innovation', 'Improving the customer experience', 'Loyalty programme, easier online booking, personalised support'],
        ['Business model innovation', 'New ways to make money or deliver value', 'Switch to subscription, new market, partnering'],
        ['Incremental / sustaining innovation', 'Series of small improvements to an existing product/service to add or sustain value; lower risk than a brand-new product; targets existing customers', 'Apple/Samsung adding camera, processor, sensors; MS Office adding cloud and collaboration; cars with lane and parking assist; PS5 with backward compatibility'],
        ['Frugal innovation', 'Reducing complexity and cost of a good and its production, for overlooked consumers; volume offsets thin margins; remove non-essential features; may need more durability and unconventional distribution', 'GE portable ECG for rural India: lightweight, battery-operated, a fraction of hospital unit cost'],
        ['Reinnovation', 'Reusing or repurposing existing materials/products in new value-adding ways', 'Patagonia and Adidas melt ocean plastics and bottles into performance polyester yarn'],
        ['Disruptive innovation', 'Enters a niche at the low-price/commercial end, then rapidly overtakes incumbents through flexibility, pricing, novelty and a fast-growing customer base', 'Airbnb vs hotels; 3D printing vs bespoke tool making; PCs vs mainframes; digital photography vs film; budget airlines']
      ] }
    ] },
    { heading: 'Sustaining vs disruptive', items: [
      '**Sustaining/incremental**: improves existing products for existing customers; strengthens incumbents.',
      '**Disruptive**: starts simpler/cheaper for new or low-end customers, improves, and displaces incumbents.',
      'Why disruptors win: incumbents ignore low margins, are tied to existing customers, and are slow.'
    ] },
    {"heading":"Extra from the slides","items":["The lecture's diagram of innovation types shows seven circles around 'Innovation': **product, process, incremental, sustaining, frugal, reinnovation, disruptive**. The second deck then lists four **types of incremental innovation**: product, process, service and business model.","Incremental innovation (slide definition): a series of small-scale improvements to an existing product or service to add or sustain value; rather than a risky brand-new product it modifies a current one to improve retention, relevance and longevity. Sustaining innovation is 'pretty much the same': improving an existing product, service or process, often for existing customers, to strengthen market position (Apple/Samsung features, MS Office cloud integration, cars with lane/parking assist).","Process innovation outcomes (slide diagram): efficiency and cost reduction, quality improvement, speed and time savings, flexibility and adaptability, innovation enablement, competitive advantage. Method: scrutinise workflows, redesign procedures, use technology such as automation to remove bottlenecks. Exercise: look at services you use (canteen, hospital, transport) and ask how they can be improved.","Examples on the first deck: noise-cancelling earphones and continuous process improvement (incremental); PlayStation 5 backward compatibility (sustaining); Peloton (product); Agile (process); 3D printing disrupting bespoke tool making (disruptive).","Frugal innovation: designing for 'overlooked consumers' may also call for more durability and unconventional distribution channels when selling."]},
    { heading: 'Typical exam angles', items: [
      'Define and distinguish four types of innovation with examples.',
      'Is idea X incremental or disruptive? Justify.',
      'Explain frugal innovation and when it fits.'
    ] }
  ],
  pitfalls: [
    'Giving the type name but no example.',
    'Calling any new feature "disruptive": disruption means displacing incumbents from below.',
    'Confusing process innovation with product innovation.'
  ]
},
{
  id: 'creativity-ideation', title: 'Creativity and the 5-step creative process; defining the problem', priority: 16, tier: 'possible',
  freq: 'est. medium', marks: '5-12 marks',
  summary: '**Creativity = problem finding and solving with relevance, value and novelty; use the 5-step process (objective, data gathering, problem design, ideation, selection) and spend most time defining the problem.**',
  mnemonic: 'Creativity = Find, Relevant, Valuable, Novel. Process: OBJECTIVE, DATA, PROBLEM, IDEAS, PICK',
  source: ['CT4107_Notes_01_Introduction', 'CT4107_Notes_02a_Week2_Part1', 'CT4107_Notes_02b_Week2_Part2'],
  sections: [
    { heading: 'Creativity (four elements)', items: [
      '**Problem finding and solving**: creative people actively seek problems and imagine future situations.',
      '**Relevance**: how well the solution actually solves the problem at hand.',
      '**Value**: importance to the customer (and creator): is it useful?',
      '**Novelty**: originality; a unique element, or combining concepts from different fields.',
      'Creativity is different from innovation: ideas must be implemented. Businesses that invest in creativity report more productivity (73%) and innovation (83%).'
    ] },
    { heading: 'Know the problem first', items: [
      'Einstein (attributed): with one hour to save the world, spend 55 minutes defining the problem and 5 finding the solution.',
      'Three ways to define the problem: **rephrase** it, **expose and challenge assumptions**, **find multiple perspectives**.',
      'Rephrase: a Toyota executive asking for "ways to increase productivity" got blank stares, but "ways to make your jobs easier" produced a flood of ideas.',
      'Challenge assumptions: "restaurants have a menu" (a restaurant where customers bring dish ideas for the chef).',
      'Multiple perspectives: view "increase sales" from the customer\'s side (features worth paying more for).',
      'Problem vs outcome: distinguish the problem (excessive waiting) from the outcome sought (better patient outcomes, more orders handled).',
      'Analysis tools: **5 Whys**, **Root Cause Analysis**, **Fishbone (Ishikawa) diagram**.',
      '"Probable futures" exercise: how has an area changed in 5 years, how will it change in the next 5, what problems offer opportunities, what products/services will emerge?'
    ] },
    { heading: 'The 5-step creative process', items: [
      { type: 'diagram', kind: 'flow', data: { direction: 'row', steps: [{ label: '1 Objective', sub: 'Goal / ideal state' }, { label: '2 Data gathering', sub: 'Facts, feelings, questions' }, { label: '3 Problem design', sub: 'Right problem?' }, { label: '4 Ideation', sub: 'Many possibilities' }, { label: '5 Selection', sub: 'Criteria, ruthless' }] }, caption: 'Diverge and converge: data gathering and ideation diverge, then converge' },
      { type: 'table', head: ['Step', 'What you do'], rows: [
        ['1 Objective', 'Define the goal (a state of being, the result of a solution), not the solution. Complete "Wouldn\'t it be great if...". Then list problems to solve for that ideal state, solutions needed, and where to find them.'],
        ['2 Data gathering', 'Divergent: collect facts (history, who is involved, what worked and failed, obstacles, restrictions) and feelings (how people feel now and should feel). Raise new questions. Convergent: tag each item Vital, Interesting or Insight; summarise the objective in a one-minute explanation.'],
        ['3 Problem design', 'Check that solving the stated problem leads to the objective. Is it too broad (too many solutions)? Too specific (only scratches the surface)? Move up or down the **ladder of abstraction** to design the right problem.'],
        ['4 Ideation', 'Generate as many **possibilities** (not solutions) as possible: idea webs, input exercises, story structure. Quantity first.'],
        ['5 Selection', 'Set selection criteria ("the solution will work if it...", "will it...?", "does it...?"), strengthen and combine ideas, make each actionable, then apply criteria ruthlessly.']
      ] },
      { type: 'note', text: 'General idea-generation process also given in lecture: define the problem, agree judging criteria, set restrictions; then research, insight, generate ideas, hone, test (example: unhappy train commuters).' }
    ] },
    { heading: 'Good entrepreneurial business ideas (checklist)', items: [
      '**Solve a problem**, find a market need, are customer-focused (not product-driven), target an identified **sizeable market segment**.',
      '**Attractive** (demand), **Achievable**, **Durable**, **Value-creating**, **Safe**, **Affordable**.',
      '**Faster / better / cheaper**, differentiated vs commodity, have a "special sauce".',
      'Revenue stream; **sustainable** (market exists with purchase frequency); **scalable or replicable**; barriers to entry; growth potential; product pipeline; exit plan.',
      'Thomas Edison exercise: you have invented the light bulb; plan a business: What is the problem? Who is the market? Who is the competition? What is the USP?'
    ] },
    {"heading":"Good ideas grouped as in the lecture, plus the general idea process","items":[{"type":"table","head":["Heading on the slide","Attributes"],"rows":[["Market driven","Solves a problem; finds a market need; customer focused not product driven; targets an identified, sizeable market segment"],["Feasible","Attractive (there is demand), Achievable (can be done), Durable (it lasts), Value creating (worth something), Safe, Affordable"],["Unique","Faster/better/cheaper; differentiated versus commodity; has a special sauce"],["Fundable","Revenue stream; sustainable (market exists with frequency of purchase); scalable or replicable; barriers to entry; growth potential; product pipeline; exit plan"],["Innovative","Invention (totally new product/service/process); Extension (new use or application of an existing one); Duplication (replication of an existing concept); Synthesis (combining existing concepts or factors into a new formula)"]]},"Mnemonic for the grouping: **M-F-U-F-I**: Market driven, Feasible, Unique, Fundable, Innovative.","General process for generating ideas: define the problem, agree judging criteria, set restrictions; then **R**esearch, **I**nsight, **G**enerate ideas, **H**one, **T**est (spells RIGHT; example: unhappy train commuters).","Ideation slide goals: widen your potential ideas; refine those ideas for your new design; focus on user pain points; incorporate useful elements. In the 5-step pencil diagram: during ideation do not solve the problem, generate as many possibilities as possible and leave the judgement to the next stage; in selection be very specific about what constitutes a solution and be ruthless against the criteria.","Several ideation approaches share a lot: the 5-step creative process, IDEO, Systematic Inventive Thinking, SCAMPER. The IDEO, SIT and SCAMPER slides are marked **supplementary material** (worth knowing, helpful if stuck)."]},
    { heading: 'Typical exam angles', items: [
      'Define creativity and its four elements; distinguish creativity and innovation.',
      'Describe the 5-step creative process with an example.',
      'Why spend more time on the problem than the solution?',
      'List characteristics of a good business idea and assess a given idea against them.'
    ] }
  ],
  pitfalls: [
    'Jumping to ideation (step 4) and skipping the objective and data steps.',
    'Confusing a goal (state of being) with a solution.',
    'Ideation that judges ideas too early: separate generation from selection.',
    'Choosing ideas by gut feel instead of explicit selection criteria.'
  ]
},
{
  id: 'ideation-techniques', title: 'Ideation techniques: SCAMPER, SIT, IDEO', priority: 17, tier: 'low',
  freq: 'est. medium-low (marked "supplementary material")', marks: '4-8 marks',
  summary: '**SCAMPER (Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse) and SIT (Subtraction, Division, Multiplication, Unification, Attribute dependency) are systematic prompts for generating new ideas from existing products.**',
  mnemonic: 'SCAMPER = S-C-A-M-P-E-R; SIT = S-D-M-U-A',
  source: ['CT4107_Notes_02b_Week2_Part2'],
  sections: [
    { heading: 'SCAMPER (7 prompts, apply to an existing product)', items: [
      { type: 'table', head: ['Letter', 'Prompt', 'Lecture example'], rows: [
        ['S Substitute', 'What can be replaced (components, materials, people)?', 'Playhouse windows: glass to plastic; plastic bottle to biodegradable PLA'],
        ['C Combine', 'What can be merged (features, devices, steps)?', 'Phone + camera; sushi pizza'],
        ['A Adapt', 'What can be adapted or borrowed from elsewhere?', 'Smartphone with interchangeable lenses (from cameras); cars with built-in wifi'],
        ['M Modify (magnify, minify)', 'Change size, shape, colour, attribute; more or less of a feature', 'Baby sunglasses; folding/extending dining table'],
        ['P Put to another use', 'Different use, market or user?', 'Coffee filters as face-mask filters; industrial drones for wind turbine inspection'],
        ['E Eliminate', 'What can be removed or simplified?', 'Removing car cigarette lighters; simplifying an app\'s buttons'],
        ['R Reverse / rearrange', 'Reverse the process or order', 'Fast food: pay then eat; investors pitching to project owners']
      ] },
      'Flask example: substitute a plastic cap, combine with artist designs, adapt a telescopic extension, modify with a rubber grip, put to another use (couples\' detachable mug compartments), eliminate the handle, reverse (keep drinks cold).',
      'Use SCAMPER questions as a checklist, then select with criteria.'
    ] },
    {"heading":"SIT: Systematic Inventive Thinking (the five tools, from the slides)","items":["Principle (slides): **innovate by starting with the solution and then work backwards to the problem** ('why would that be beneficial?'). Also called the **Function Follows Form** principle.","Method: (1) start with an existing situation, (2) apply one of the five thinking tools, (3) ask **'Should we do it and can we do it?'**.","Component = a physical or tangible thing you can see or touch. Attribute = a characteristic of the product or service (or of its surrounding environment and people).",{"type":"table","head":["Tool","Slide definition","Procedure from the slides","Slide examples"],"rows":[["Subtraction","Elimination of an essential component of a product (finding innovative solutions by removing an apparently essential component of an existing solution)","1 List all the internal components. 2 Remove a component. 3 Ask: should we do it and can we do it? 4 Modify the concept.","Exercise bicycle (a bicycle with the wheels removed), powdered soup, contact lens, child's highchair: \"what do they have in common?\" (each is a familiar product with an apparently essential part taken away)"],["Division","Separate the product or its components and then rearrange them back into a product","1 List the product's internal components. 2 Divide the product or one of its components (functionally, physically or preservationally).","Functionally (slide picture: water skiing), physically (slide picture: car dashboard), preservationally (a cake divided into cupcakes: each smaller unit preserves the characteristics of the whole)"],["Multiplication","Copy an element already existing in a product, but change it in a counterintuitive way","1 List components. 2 Make a copy of one of the components and change it. 3 Look for potential benefits.","Procter & Gamble Febreze Plug: worksheet with columns component, attributes, virtual product"],["(Task) Unification","Assign additional tasks to an existing resource","1 List the product's internal and external components. 2 Select a component and assign an additional task. 3 Look for potential benefits. 4 Modify the concept to improve.","(1) internal takes the job of another internal component: coffee-maker jug with measuring marks; (2) internal takes the job of an external component: Nissan easy-fill tyre alert; (3) external takes the job of an internal component: billboard becomes the point of sale, commuters scan products and the shopping list is sent to the grocery store"],["Attribute dependency","One thing changes as another thing changes (create a dependency between attributes)","List attributes (external and internal); fill in \"as attribute __ changes, so does attribute __\"; identify potential benefits; modify and adapt the concept.","Alarm clock: as elapsed time of ringing increases, loudness increases"]]},{"type":"note","text":"Slide pictures for division (water skiing) and attribute dependency (sunglasses, toasting glasses) are not captioned; the functional/physical/preservational split and the picture readings above beyond the cake and dashboard are standard SIT teaching, not slide text. Learn the definitions and the procedures."},"**Attribute dependency, internal versus external attributes**: external = attributes of the surrounding environment and people related to the topic (width, length, height, gender, age, preferences, time); internal = attributes of the product itself (size, shape, colour).","**Alarm clock worked example (slide)**: external attributes = time of day, elapsed time of alarm ringing, duration of sleep, characteristics of user, restfulness of sleep; internal attributes = volume of alarm, type of alarm sound, colour, size, shape. A dependency: as elapsed time increases, the loudness of the alarm increases (or: the sound depends on how restful the sleep was)."]},
    {"heading":"SCAMPER: question prompts and extra examples from the slides","items":["Slide framing of each letter: **Substitute** = what can be replaced (components, materials, people)? **Combine** = what can be combined (other features, devices)? **Adapt** = what can be added (new elements or functions)? **Modify / magnify / minify** = change size, shape, colour or another attribute. **Put to other use** = other industry or purpose? **Eliminate or minimise** = what can be removed or simplified? **Reverse, reengineer or rearrange** = what can be swapped or flipped?","Prompt questions: Substitute: can we use another alternative of X, replace the product with a simpler one, where else could we sell it? Combine: can we merge two products, use two at the same time, mix components, combine X and Y technologies? Adapt: what would we change to reach better results, what are the tradeoffs, how can we make the product more flexible (you must also define how you measure 'better')? Modify: what if we had more or less of a feature, what if bigger or smaller, can it be portable? Put to another use: what other markets, users or companies might use it, can end-of-life products be recycled or repurposed? Eliminate: what would happen if we removed this part, can we get the same output without it, what if we had half the resources? Reverse: what if we reverse the process, rearrange the order of service or use, consider it backwards, interchange elements?","Extra lecture examples: windows for a children's playhouse (glass to plastic for safety); PLA biodegradable plastic bottles; 'sushi pizza'; phone plus camera; cars with built-in wifi; smartphone with interchangeable lenses; sunglasses for babies; foldable extending table; coffee filters used as mask filters in COVID-19; drones repurposed for wind-turbine inspection; removing cigarette lighters from cars; app with unnecessary buttons eliminated; fast food 'pay then eat'; crowdfunding platform where investors pitch to backers.","**Fast-food chain example (Adapt, Eliminate, Reverse)**: Adapt = selling restaurants and real estate instead of just hamburgers; Eliminate = letting customers serve themselves, avoiding expensive waiters; Reverse = customers pay before they eat.","**Redesign a common product** exercise on the slides: apply all seven SCAMPER letters to a desk lamp, toaster, washing machine, car key fob, home camera, sleep mask, extension lead or safety shoe."]},
    { heading: 'IDEO approach (summary)', items: [
      '**Understand** the market, the client, the technology.',
      '**Observe** what confuses, what is hated, what is not satisfied.',
      '**Visualise/realise**: role-play, storyboard, early prototype.',
      '**Evaluate and refine**: several prototypes, concurrent engineering.',
      '**Implement**: verify the final product works, commercialise, market.'
    ] },
    { heading: 'Typical exam angles', items: [
      'Apply SCAMPER (all seven letters) to a named product.',
      'Name the five SIT tools and give an example of two.',
      'Compare SCAMPER with the 5-step creative process (prompting tool vs full process).'
    ] }
  ],
  pitfalls: [
    'Applying only some SCAMPER letters when asked for all seven.',
    'Confusing SIT subtraction with SCAMPER eliminate (similar, but SIT then asks how the benefit arises) and attribute dependency with modify.',
    'Stopping at ideas without selection criteria.'
  ]
}
];
