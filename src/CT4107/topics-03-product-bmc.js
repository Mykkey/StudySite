module.exports = [
{
  id: 'business-model-canvas', title: 'Business Model Canvas: the nine blocks', priority: 5, tier: 'core',
  freq: 'est. high', marks: '10-20 marks',
  summary: '**The BMC (Strategyzer/Osterwalder) is a one-page template with nine blocks (customer segments, value propositions, channels, customer relationships, revenue streams, key resources, key activities, key partnerships, cost structure) showing how a business creates, delivers and captures value.**',
  mnemonic: 'WHO (segments, relationships, channels), WHAT (value), HOW (activities, resources, partners), MONEY (revenue, costs)',
  source: ['CT4107_Notes_09_Business_Model_Canvas', 'CT4107_Notes_09b_What_Is_a_Business_Model_Canvas'],
  sections: [
    { heading: 'Definition', items: [
      'The **Business Model Canvas (BMC)** is a strategic management template for developing new or documenting existing business models: a visual chart with elements describing the firm\'s or product\'s **value proposition, infrastructure, customers and finances**.',
      'Nine building blocks cover four areas: **customers, product/service, infrastructure/operations, financial viability**.',
      'It shows how the business intends to make money; works equally for social enterprises (customers = clients, beneficiaries or audiences).',
      'Advantage over a full plan: you can start getting **customer feedback sooner** and adjust as the model evolves.'
    ] },
    { heading: 'Canvas layout', items: [
      { type: 'diagram', kind: 'graph', data: { title: 'Business Model Canvas layout', directed: false, r: 20, height: 420, nodes: [
        { id: 'kp', label: 'Key partnerships', sub: '8', x: 10, y: 38, color: 2 },
        { id: 'ka', label: 'Key activities', sub: '7', x: 31, y: 22, color: 2 },
        { id: 'kr', label: 'Key resources', sub: '6', x: 31, y: 56, color: 2 },
        { id: 'vp', label: 'Value propositions', sub: '2', x: 52, y: 38, color: 0 },
        { id: 'cr', label: 'Customer relationships', sub: '4', x: 73, y: 22, color: 1 },
        { id: 'ch', label: 'Channels', sub: '3', x: 73, y: 56, color: 1 },
        { id: 'cs', label: 'Customer segments', sub: '1', x: 92, y: 38, color: 1 },
        { id: 'co', label: 'Cost structure', sub: '9', x: 25, y: 90, color: 3 },
        { id: 're', label: 'Revenue streams', sub: '5', x: 75, y: 90, color: 3 }
      ], edges: [
        { from: 'vp', to: 'cs' }, { from: 'ka', to: 'vp' }, { from: 'kr', to: 'vp' }, { from: 'kp', to: 'ka' }, { from: 'cs', to: 're' }, { from: 'ka', to: 'co' }
      ] }, caption: 'Right side = customers (who), middle = value (what), left = infrastructure (how), bottom = finance' }
    ] },
    { heading: 'The nine blocks: question and what to write', items: [
      { type: 'table', head: ['Block', 'Key question', 'Contents / prompts'], rows: [
        ['1 Customer segments', 'Who do you sell to and help?', 'Groups you create value for; characteristics and personas; segmentation by age, gender, interests, spending habits; mass vs niche vs multi-sided'],
        ['2 Value propositions', 'What are your promises?', 'Problems solved, needs met, value delivered per segment; what is unique and why they prefer you to alternatives'],
        ['3 Channels', 'How do you reach them?', 'Avenues by which customers contact you and enter the sales cycle: communicate, sell, deliver, service; manage the journey from awareness to sale'],
        ['4 Customer relationships', 'How do you interact?', 'Face-to-face or remote; acquire, retain, upsell; added value'],
        ['5 Revenue streams', 'How much income do customers generate?', 'How the value proposition converts to financial gain: sources, pricing strategy, mix by segment, ancillary services'],
        ['6 Key resources', 'What resources are required?', 'Physical, intellectual property, human, financial (credit, working capital)'],
        ['7 Key activities', 'What tasks are key?', 'Actions needed to deliver value: R&D, production, marketing, sales, service, finance, admin; processes for efficiency'],
        ['8 Key partnerships', 'Which external parties are critical?', 'Suppliers, collaborators, distributors; what they do and provide; how to manage them'],
        ['9 Cost structure', 'What does it cost to launch and run?', 'Costs per stage (marketing, acquiring customers, team, partners, distribution); biggest cost driver; fixed vs variable; economies of scale']
      ] }
    ] },
    { heading: 'Worked example: Groupon (lecture)', items: [
      '**Customer segments**: two-sided: consumers (local, affluent, students, singles) and merchants (local shops, SMEs, global brands, event organisers).',
      '**Value propositions**: consumers get discounts/bargains (crowd-sourced buying power); merchants get effective advertising, a fast-built prospect list, a sell-and-fulfilment platform.',
      '**Channels**: email campaigns, website, social networks, mobile apps, B2B sales force, merchant web portal.',
      '**Customer relationships**: price/convenience, trust, virality for consumers; consulting on offer preparation for merchants.',
      '**Revenue streams**: percentage fee on transactions (ancillary: new products such as Gnow and Glive, credit cards).',
      '**Key resources**: databases, creative/publisher team, sales force and merchant database, web platform and software developers.',
      '**Key activities**: editorial/content and email marketing scheduling, B2B sales with city planner, contract management, business intelligence and profiling, M&A.',
      '**Key partners**: internet and coupon providers, POS and credit systems.',
      '**Cost structure**: consumer acquisition (marketing), merchant acquisition, IT and data-centre connectivity, editorial content.'
    ] },
    { heading: 'Worked example: filling the BMC for a startup (smart rack for gym chains)', items: [
      { type: 'table', head: ['Block', 'Entry'], rows: [
        ['Customer segments', 'High-end chain gyms (buyer: operations director; end user: lifter aged 25-45)'],
        ['Value proposition', 'Fewer injuries and better retention: instant form feedback; target 30% fewer injury incidents (to validate)'],
        ['Channels', 'Trade shows, direct sales to chain head offices, installer network'],
        ['Customer relationships', 'Dedicated account manager, pilot-then-roll-out, monthly performance report'],
        ['Revenue streams', 'Hardware lease plus monthly software subscription per rack'],
        ['Key resources', 'Computer-vision models and training data (IP), engineers, camera hardware supply'],
        ['Key activities', 'Model development, hardware integration, installation and support, sales'],
        ['Key partnerships', 'Rack manufacturer, camera supplier, gym chain pilot partners, installers'],
        ['Cost structure', 'Engineering salaries (largest), hardware cost of goods, sales, cloud hosting; mostly fixed early, variable with units']
      ] }
    ] },
    { heading: 'How to complete the canvas well', items: [
      'Start with **customer segments and value propositions**, then channels/relationships, then revenue, then resources/activities/partners, then costs.',
      'Be consistent: each value proposition needs a segment, a channel and a revenue stream; every cost should link to a key activity or resource.',
      'Treat entries as hypotheses and test them; a canvas is a living document.',
      'Keep it to one page; clearest possible picture of the existing or proposed model.'
    ] },
    {"heading":"Lecture block definitions and guiding questions","items":[{"type":"table","head":["Block","Lecture definition","Strategyzer guiding question (slides)"],"rows":[["Customer segments","Practice of dividing a customer base into groups similar in specific ways: age, gender, interests, spending habits","Which customers and users are you serving? Which jobs do they really want to get done?"],["Value proposition","The fundamental concept of the exchange of value between your business and your customer/clients","What are you offering them? What is that getting done for them? Do they care?"],["Channels","The avenues through which your customer comes into contact with your business and becomes part of your sales cycle","How does each customer segment want to be reached? Through which interaction points?"],["Customer relationships","How a business interacts with its customers: **get, keep, grow**","What relationships are you establishing with each segment: personal, automated, acquisitive, retentive?"],["Revenue streams","The way by which your business converts your value proposition or solution to the customer's problem into financial gain","What are customers really willing to pay for? How? Transactional or recurring revenue?"],["Key resources","The resources your business requires to do business","Which resources underpin your business model? Which assets are essential? (financial, physical, IP, HR)"],["Key activities","The actions your business undertakes to achieve the value proposition for your customers","Which activities do you need to perform well? What is crucial? (manufacturing, software, supply chain)"],["Key partners","A list of other external companies/suppliers/parties you may need to achieve your key activities and deliver value to the customer","Which partners and suppliers leverage your model? Who do you need to rely on? What do we get from and give them?"],["Cost structure","The monetary cost of operating as a business","What is the resulting cost structure? Which key elements drive costs? Fixed or variable?"]]},{"type":"note","text":"Two numbering orders appear. The Santander guide lists: 1 customer segments, 2 value propositions, 3 channels, 4 customer relationships, 5 revenue streams, 6 key resources, 7 key activities, 8 key partnerships, 9 cost. The lecture's yellow-template slides number the fill-in order as 1 customer segments, 2 value propositions, 3 channels, 4 customer relationships, 5 key activities, 6 key resources, 7 key partners, 8 revenue streams, 9 cost structure ('What is the most NB?'). Numbering is only an order of working; learn all nine blocks and the question each answers."},"Alternative labels on one canvas slide: partner network (key partners), offer (value proposition), distribution channels (channels). Cost structure and revenue streams sit along the bottom."]},
    {"heading":"More lecture examples: Ordr, LinkedIn and the bottom line","items":[{"type":"table","head":["Ordr (student project: platform that makes queueing for payment in pubs easy)","Canvas entries"],"rows":[["Customer segments","Bar managers, publicans, pub goers, drinks companies, social events, advertisers, till companies, drinks promoters"],["Value propositions","Speeds up the ordering process; more convenient payment for customers and the bar; guarantees customers are served in the correct order; avoids long queues"],["Channels","Virtual; mobile application stores; selling directly to pubs"],["Customer relationships","Social media; special offers; loyalty programme"],["Key activities","Installation of the product in the bar; sales; development and innovation of the mobile application"],["Key resources","Strong team of developers; in-depth knowledge of the bar trade; experienced sales team"],["Key partners","Event organisers, individual super-pubs, drinks companies (strategic alliances); a local IT admin company for installation; an online company paid to refer traffic to the website"],["Cost structure","Salaries, IT equipment, office, installation, marketing, maintenance"],["Revenue streams","Percentage of each transaction through the app; annual subscription fee; free installation and free app; advertising"]]},"**LinkedIn** canvas (businessmodelgeneration.com): segments = internet users, recruiters, advertisers and marketers, developers; value = manage professional identity and build a network, identify and reach the right talent, reach the target audience, access to the LinkedIn database via APIs and widgets; relationships = same-side and cross-side network effects; channels = website, mobile apps, field sales; revenue = free offerings and premium subscriptions, hiring solutions, marketing solutions; key activity = platform development; key resource = the LinkedIn platform; partners = Equinix (data centre), content providers; costs = web hosting, marketing and sales, product development, general and administrative.","**Bottom line** slide: no revenue model means no business; if you can cure a pain you can generate revenue; if there is no pain the best revenue model will not help; until someone pays you, it is just an idea. 'Revenue model = revenue streams such as ads and subscriptions.'"]},
    { heading: 'Typical exam angles', items: [
      'Name and explain the nine building blocks.',
      'Complete a BMC for a given startup (table with all nine blocks).',
      'Differences between business model and business plan; between BMC and a plan.',
      'Identify revenue streams and cost drivers; discuss a two-sided model (Groupon).',
      'Critique a BMC for inconsistency (e.g. free product but no revenue stream).'
    ] }
  ],
  pitfalls: [
    'Missing blocks or mixing them (channels vs customer relationships; key resources vs key activities).',
    'Generic statements not tied to the scenario.',
    'Revenue stream stated without how it is priced (per unit? subscription? fee on transaction?).',
    'Forgetting that multi-sided businesses need a canvas entry per side.',
    'Calling the canvas a business plan: the plan is far more detailed, with strategy and financial forecasts over years.'
  ]
},
{
  id: 'product-spec-mvbp', title: 'High-level product specification and MVBP (Steps 7 and 22)', priority: 9, tier: 'likely',
  freq: 'est. medium-high', marks: '6-10 marks',
  summary: '**Define the product visually and from the customer\'s view before building anything: benefits not features, no price, a living document (e.g. a brochure); the MVBP later is the minimum product where the customer gets value, pays, and gives feedback.**',
  mnemonic: 'DON\'T BUILD YET: customer view, benefits, visual, no price, keep testing',
  source: ['CT4107_Notes_07_Product_Spec_QVP', 'CT4107_Notes_09_Business_Model_Canvas'],
  sections: [
    { heading: 'What the high-level product specification is (Step 7)', items: [
      'A **visual representation of your product**: images and descriptions showing how it operates and, above all, **how it adds value for the beachhead market by addressing their main pain points**.',
      'Focuses on the **benefits created by the features**.',
      'Can be images, drawings, PowerPoint or short videos; one way is to build a **product brochure**.',
      'Includes where to buy or find out more.'
    ] },
    { heading: 'Rules (the five commandments)', items: [
      '**Do not build anything yet: define it first.**',
      'Define it from the **customer\'s perspective**, not yours.',
      'Talk about **benefits, not features**.',
      'Do not drown them in detail; **make it visual**.',
      '**Do not mention price**: far too early.',
      'It is a **living document**: test, validate, iterate.'
    ] },
    { heading: 'Brochure checklist (from the golf-package example)', items: [
      { type: 'table', head: ['Element', 'What it contains'], rows: [
        ['Name and tagline', 'Memorable product name and a one-line promise (e.g. HELMET: haptic cycling safety; SLIM: simple liquid inventory management)'],
        ['Visual of the product / journey', 'Picture or simple flow showing how it works'],
        ['Primary benefit aligned with persona #1 priority', 'Visually dominant headline (e.g. "More mid-week bookings, more revenue from capacity you already have")'],
        ['Two additional benefits', 'e.g. reach new customers; launch with less effort'],
        ['Sense of magnitude', 'Pilot targets to validate, e.g. +10-20% mid-week bookings; not guarantees until tested'],
        ['Clear call to action', 'e.g. "Join the pilot: book a 30-minute planning session"']
      ] },
      'Position one clear message; avoid presenting the service as a broad marketplace.'
    ] },
    { heading: 'MVBP: minimum viable business product (Step 22)', items: [
      'The **minimum viable business product** is the smallest version that does three things:',
      '1. The **customer gets value** out of using the product.',
      '2. The **customer pays** for the product.',
      '3. The product is enough to **start the customer feedback loop**, so the customer helps you iterate towards a better product.',
      'Difference from "MVP": it must be a viable **business** (customers pay), not just a technical prototype.',
      'Link: the high-level spec (Step 7) is the vision; the MVBP is the first thing you actually build and sell, informed by the QVP and key assumptions.'
    ] },
    { heading: 'Where these steps sit', items: [
      { type: 'diagram', kind: 'flow', data: { steps: ['Persona (5)', 'Life-cycle use case (6)', 'High-level spec (7)', 'QVP (8)', 'Core (10)', 'Competitive position (11)', 'MVBP (22)'] }, caption: 'Order of the customer-facing steps' }
    ] },
    {"heading":"More from the Step 7 slides","items":["Cartoon on the Step 7 slide: 'a picture is worth a thousand words': people interpret a text description differently, a visual removes the ambiguity.","Brochure examples shown: **H.E.L.M.E.T** (Haptic Environment Listener and Motion Event Telemetry: smart cycling helmet with ultrasonic sensor array, haptic feedback and heads-up display; customers: commuters, leisure cyclists, tech enthusiasts), **SLIM** (liquid inventory management: a scale measures stock, software updates inventory, cloud analytics, 'saves time, money and stress') and **Biegando** (app that brings local walking and running events and trails to your phone; 'first year free for every student'). Each has a name, tagline, benefit headline, simple visuals and contact details.","A template ('Product alignment with persona') links each of the persona's top priorities (1, 2, 3) to: how you will deliver a new level of value on that priority; what **features**; what **functions**; what **benefits**. The brochure itself leads with the benefits.","Do not focus on technology, features and functions; answer what potential customers want to gain when they buy and ask themselves 'what value do I get out of this product?'.","Step 22 slide ('minimum viable product'): the cartoon says the customer wanted the Taj Mahal but you first build what gets you the oxygen to keep going: real customer feedback and cash."]},
    { heading: 'Typical exam angles', items: [
      'Describe what a high-level product specification is and the rules for writing it.',
      'Write a brochure outline for a given idea (headline benefit, two more, magnitude, call to action).',
      'Define MVBP and explain its three conditions; compare with MVP.',
      'Why should you not mention price or build yet?'
    ] }
  ],
  pitfalls: [
    'Listing technical features and architecture instead of benefits.',
    'Mentioning price or building a prototype in the spec step.',
    'Magnitude claims stated as guarantees instead of hypotheses to validate.',
    'MVBP without a paying customer or without a feedback loop.'
  ]
},
{
  id: 'core-competitive-position', title: 'Define your core, moat and competitive position (Steps 10-11)', priority: 10, tier: 'likely',
  freq: 'est. medium-high', marks: '6-10 marks',
  summary: '**The core is the one thing you do better than anyone and protect at all costs (the moat: unique, grows, important); the competitive position chart plots you against alternatives on the persona\'s top two priorities, including the do-nothing option.**',
  mnemonic: 'MOAT = Unique, Grows, Important; chart = two priorities, good in the top right',
  source: ['CT4107_Notes_07_Product_Spec_QVP', 'CT4107_Notes_09_Business_Model_Canvas'],
  sections: [
    { heading: 'Core and competitive moat (Step 10)', items: [
      'Your **core** gives **sustainable competitive advantage**; you invest your resources in it to do better than anyone else and it is the source of your unique selling proposition over time.',
      'You do not want to create a product and market and then be unable to hold them: you need something **hard to replicate: the "moat"**.',
      'Competitive (economic) moat, popularised by Warren Buffett: a business\'s ability to keep competitive advantages that protect long-term profits and market share.',
      'Forms of core: an **algorithm** based on unique knowledge/research you own; a **process** (e.g. manufacturing); **expertise** (hard to acquire, difficult to put in a product, and potentially not unique).',
      'Three dimensions of a good core: **Unique** (hard for others to duplicate), **Grows** (strengthens over time relative to competitors), **Important** (ties directly to the quantified value proposition).'
    ] },
    { heading: 'Examples (lecture exercise)', items: [
      { type: 'table', head: ['Company', 'Value proposition', 'Core'], rows: [
        ['IKEA', 'Low cost, good designs', 'Logistics, vendor management'],
        ['DHL', 'Fast, reliable delivery', 'Operational excellence'],
        ['Google', 'World\'s information', 'Evolved from search to knowing everything (data)'],
        ['Amazon', 'The everything store', 'Huge experience in e-commerce services'],
        ['Apple', 'Instant productivity', 'User experience: consistently delivering quality experiences']
      ] },
      'Worksheet: write your value proposition, list 4-6 candidate moats from strongest to weakest, and decide your core.'
    ] },
    { heading: 'Competitive position chart (Step 11): recipe', items: [
      '1. Decide the persona\'s **top 2 priorities** (X and Y).',
      '2. Draw axes; split each in half. Write the priority name on the axis; near the origin write the **bad state** (e.g. low reliability), further out the **good state** (high).',
      '3. Plot your product and the main competitors (current and future) **and the customer\'s do-nothing / status-quo option**.',
      '4. You want to sit in the **top-right (good on both)**, separated from alternatives.',
      '5. Compare with the Quantified Value Proposition: priority #1 is measured on the x-axis.',
      'Lecture example: SunSpring is plotted on efficiency (x) vs reliability (y) against "with battery" and "no battery" alternatives; its value proposition is increased efficiency, flexibility, mobility, reliability and operational simplicity compared with competitors.',
      { type: 'diagram', kind: 'scatter', data: { title: 'Competitive position (illustrative)', xLabel: 'Efficiency (persona priority #1)', yLabel: 'Reliability (priority #2)', xMin: 0, xMax: 100, yMin: 0, yMax: 100, series: [{ name: 'Alternatives', points: [[30, 80], [75, 30], [20, 20]] }], points: [
        { x: 85, y: 85, label: 'OUR PRODUCT' }, { x: 30, y: 80, label: 'Alt 1' }, { x: 75, y: 30, label: 'Alt 2' }, { x: 20, y: 20, label: 'Do nothing' }
      ] }, caption: 'Own product top-right; alternatives and do-nothing elsewhere' }
    ] },
    { heading: 'How core and position link to other steps', items: [
      'Competitive position chart supports the **core**; the **resource plan** supports building the core.',
      'Axes come from the persona priorities; the QVP measures value on priority #1.',
      '**SWOT** is a complementary analysis: internal **S**trengths and **W**eaknesses, external **O**pportunities and **T**hreats (lecture example: Apple, strong brand and margin vs high prices; AI and green tech opportunities vs trade war risk).'
    ] },
    {"heading":"Core: more from the slides","items":["Slide title: **secret sauce** (castle and moat picture). 'What makes for a great core?' = Unique, Grows, Important.","Core worksheet: (1) what is your value proposition? (2) list your moats from strongest to weakest (up to six); (3) what is your core? Orbit-style output: value proposition, team assets (prioritised), proposed moats (strongest to weakest), potential cores, and a recommended core with why it is unique, why it matters to customers, how it can grow over time.","Link the core to superior value with a table: core capability, customer benefit, why competitors may not match it. The key work is to connect customer value to defensible assets, practical moats and a core that strengthens as the business grows. The slide 'how does your core map to what your customer really wants?' stresses the Important dimension.","Metaphor: **customer's nirvana** is across a river; the bridge to it is built by your core and is only passable to you; competitors and the as-is state are stuck on the near bank."]},
    {"heading":"Competitive position chart: more detail","items":["Chart template: target customer priorities 1 and 2; each axis runs from terrible/bad to great/good; a star marks you; place each alternative and the do-nothing option. Slide inconsistency: the written recipe puts priority #1 on the x-axis, the printed template puts priority #1 on the y-axis. Either is fine if labelled; the lecture example SunSpring plots efficiency on x and reliability on y.","SunSpring example (solar-powered water filtering system): competitors AquaSun, Spectra Watermakers, WorldWater and Solar Technologies, Blue Spring; reliability axis split into 'with battery' (low) and 'no battery' (high); SunSpring top-right.",{"type":"table","head":["Orbit-style competitive table","Priority 1 position","Priority 2 position","Rationale"],"rows":[["Your venture (golf mid-week packages)","High","High","Upper-right target: specialised solution"],["Golf travel agencies and tour operators","Medium-High","Medium","Package golf travel but favour established destinations"],["Online travel agencies","Medium","Low-Medium","Broad distribution, but operators build packages themselves"],["Golf tee-time marketplaces","Medium","Low","Fill tee times only, a narrow inventory problem"]]},"Follow-up questions in that format: are you in the upper-right corner? why are some competitors close? what is the principal competitive gap to overcome? how should the position be communicated? Slide exercise: chart the competitive position of **Airbnb** (decide top 2 priorities, compare with main competitors)."]},
    {"heading":"SWOT: lecture definitions and four company examples","items":["SWOT = internal factors (**Strengths**, **Weaknesses**) and external factors (**Opportunities**, **Threats**); strengths and opportunities are positive, weaknesses and threats negative.","Prompts: Strengths = things your company does well, qualities that separate you from competitors, internal resources (skilled staff), tangible assets (IP, capital, proprietary technology). Weaknesses = things your company lacks or competitors do better, resource limitations, unclear USP. Opportunities = underserved markets, few competitors in your area, emerging need for your products, press coverage. Threats = emerging competitors, changing regulation, negative press, changing customer attitudes.",{"type":"table","head":["Company","Strengths","Weaknesses","Opportunities","Threats"],"rows":[["Ryanair","Point-to-point flights; young uniform fleet; cheap outsourced labour; strong marketing model; innovator in cost reduction","Poor customer service; poor working conditions; bad public image","Market-share expansion; good relations with unions (e.g. BALPA); website and modern technology; competition committee","EU regulation; national laws; substitute transport; criticism of budget airlines; legal issues; fuel-price fluctuation; competition domination"],["Apple","World's strongest brand; very high margin; global reach; expanding consumer base","High prices; tracking allegations; software incompatibility","Growing customer base; green technology; artificial intelligence","Increasing competition; market penetration; risk of a significant trade war"],["Airbnb","Pleasant experience; affordability; uniqueness; accessible to all","Customer dissatisfaction; lawsuits; review dependency","Growing urbanisation; easy correspondence; competitive advantage; celebrity affiliation","Higher competitiveness; pandemic outrage; contagious virus"],["Amazon","Customer service; IT; efficient supply chain and logistics; huge global brand; early e-commerce retailer; diversified range","Diversified range (brand confusion); losses from free shipping","Public-sector collaboration; joint ventures (e.g. Toys-R-Us); entered China 2004 (Joyo.com); growth in US online sales","Brand competition (Kindle vs iPad); international competitors; poor publicity; currency fluctuation"]]}]},
    { heading: 'Typical exam angles', items: [
      'Define core/moat and give three properties; give examples for known companies.',
      'Draw and explain a competitive position chart for a given idea (with do-nothing).',
      'Distinguish value proposition, QVP, USP and core.',
      'Do a SWOT for the startup.'
    ] }
  ],
  pitfalls: [
    'Choosing a core that is easy to copy (e.g. "good customer service" with no mechanism).',
    'Axes that are features rather than customer priorities.',
    'Forgetting the do-nothing option as a competitor.',
    'Core not tied to the QVP (not important to the customer).'
  ]
},
{
  id: 'business-model-basics', title: 'Business model, revenue model and business plan', priority: 11, tier: 'likely',
  freq: 'est. medium', marks: '4-8 marks',
  summary: '**A business model describes how a company creates, delivers and captures value (who, what, when, where, why); the revenue model is how it makes money (pricing, channels); a business plan is the longer, detailed document of strategy and financial forecasts.**',
  mnemonic: 'MODEL = how value is created, delivered, captured; PLAN = years of detail',
  source: ['CT4107_Notes_09_Business_Model_Canvas', 'CT4107_Notes_09b_What_Is_a_Business_Model_Canvas'],
  sections: [
    { heading: 'Definitions', items: [
      '**Business plan**: a plan for the successful operation of a business, identifying sources of revenue, the intended customer base, products and details of financing; spells out strategy and expected financial performance over a number of years.',
      '**Business model**: the broader framework outlining how a company **creates, delivers and captures value** (the "value capture framework"); answers who, what, when, where, why.',
      '**Revenue model / revenue stream**: the method by which the business makes money, including how you price and which sales channels you choose (ads, subscriptions, transaction fees...).',
      'Developing a model first (rather than a plan) lets you gather customer feedback sooner and adjust; a plan written later is more realistic.'
    ] },
    { heading: 'Comparison', items: [
      { type: 'table', head: ['', 'Business model', 'Business plan'], rows: [
        ['Focus', 'How value is created, delivered, captured', 'Strategy, operations, forecasts'],
        ['Length', 'One page (canvas)', 'Detailed document'],
        ['Time horizon', 'Current/proposed logic', 'Several years of financials'],
        ['When', 'Early, to test and iterate', 'Later, once the model is clearer']
      ] }
    ] },
    { heading: 'Business model innovation examples', items: [
      '**Google**: before it, search engines fitted as many banner ads on a page as possible and charged as much as possible. Google used simple text ads targeted by search keywords, so advertisers got better data on ad effectiveness: a new value-capture framework.',
      '**Groupon**: two-sided platform earning a percentage fee on transactions, with ancillary services.',
      '**Ordr**: a platform that makes queueing for payment easy (idea used in the lecture to illustrate a model).',
      'Types of revenue stream to mention (general knowledge, not listed on the slides except ads and subscriptions): advertising, subscription, transaction fee, one-off sales, licensing, freemium, leasing.'
    ] },
    {"heading":"More from the Step 15 slides","items":["Cartoon: a seesaw comparing time spent on **value-creation innovation** with time spent on **value-capture innovation**; the message is to balance them (most teams neglect how they capture value).","Slide wheel for 'business model vs revenue model': core value, competencies, target customer, product and services, marketing, management, distribution, cost; 'the business model includes the revenue model'.","Step 15 definition on the slide (business plan wording): a plan for the successful operation of a business, identifying sources of revenue, the intended customer base, products and details of financing."]},
    { heading: 'Typical exam angles', items: [
      'Business model vs business plan vs revenue model.',
      'Explain how a named company makes money and what is novel about its model.'
    ] }
  ],
  pitfalls: [
    'Treating revenue model and business model as the same thing: revenue is only one part (one block of nine).',
    'Describing what a company sells but not how value is captured.'
  ]
}
];
