module.exports = [
  {
    id: 'req-attributes',
    title: 'Attributes of good requirements, user stories and FR/NFR',
    priority: 1,
    tier: 'core',
    hint: 'likely',
    freq: 'hinted Q1 (important); 0/7 past papers',
    marks: '5-10 marks',
    summary: '**A good requirement states WHAT the system must do (not HOW), and is unambiguous, complete, necessary, verifiable, feasible, consistent and traceable.**',
    mnemonic: 'U-C-N-V-F-C-T: Unambiguous, Complete, Necessary, Verifiable, Feasible, Consistent, Traceable (WHAT, not HOW)',
    source: ['CT417_Notes_03_Requirements_Change_Management', 'CT417_Notes_01a_SE_Revision'],
    sections: [
      {
        heading: 'What is a requirement',
        items: [
          'A requirement is a statement of a need the system must satisfy: a capability, property or constraint that a stakeholder needs.',
          'Interpretation problem: "build a system to help TAs grade more efficiently" hides many questions (what is efficient, what does grading include?). Developers build the wrong thing when the request is taken at face value.',
          'A **stakeholder** is anyone affected by or affecting the system (users, owners, regulators, support staff). Missing one is like designing a building without asking who will live in it.',
          'Each stakeholder has different concerns, values and fears (students fear unfair grades, TAs fear workload, instructors fear complaints). Requirements must reconcile them.'
        ]
      },
      {
        heading: 'Attributes of good requirements (learn these for Q1)',
        items: [
          { type: 'table', head: ['Attribute', 'Meaning', 'Test question'], rows: [
            ['Unambiguous / clear', 'Only one possible interpretation; no vague words (fast, easy, user-friendly, efficient)', 'Could two developers read it differently?'],
            ['Complete', 'Contains everything needed to design and test it (who, what, conditions, limits)', 'Is any information missing?'],
            ['Concise', 'One requirement per statement, short', 'Does it say more than one thing?'],
            ['Necessary', 'Removing it would leave a real need unmet; appropriate to the hierarchy level', 'What happens if we leave it out?'],
            ['Verifiable (testable)', 'Can be proved by test, inspection, demonstration or analysis', 'How will we know it has been met?'],
            ['Attainable / feasible', 'Can be achieved within technology, budget, time', 'Can it actually be built?'],
            ['Consistent', 'Does not contradict other requirements (internally consistent)', 'Does it conflict with another?'],
            ['Traceable', 'Linked up to a stakeholder need and down to design, code and tests', 'Where did it come from and where is it implemented/tested?'],
            ['Solution-neutral (WHAT not HOW)', 'States the need, not the implementation, unless a constraint', 'Does it dictate a technology without reason?']
          ] },
          { type: 'note', text: 'Slide wording to quote: well-stated requirements are concise, unambiguous, solution-neutral where appropriate, internally consistent (non-contradictory), necessary, verifiable and attainable. They say WHAT not HOW, are verifiable by test or independent analysis, are necessary and appropriate for the system hierarchy level, feasible, and consistent and traceable with requirements above and below.' }
        ]
      },
      {
        heading: 'Functional vs non-functional requirements',
        items: [
          { type: 'table', head: ['', 'Functional (FR)', 'Non-functional (NFR)'], rows: [
            ['About', 'Product features: what the system does', 'Product properties: how well, the experience of the user'],
            ['Examples', 'Receptionist can book an appointment', 'Booking page loads in under 2 seconds'],
            ['Capture', 'Use cases, user stories, sequence diagrams, state machines', 'Global constraints, hard to capture in use cases'],
            ['Traceability', 'Usually traced to one module/class/function', 'Usually cannot be implemented in a single module'],
            ['Typical list', 'Create, read, update, delete, notify', 'Availability, maintainability, performance, privacy, reliability, scalability, security, usability']
          ] },
          'Turn a vague quality into a measurable one. Slide example: "With a 4-core server and 16 GB RAM the system should service at least 200 simultaneous clients with less than 300 ms latency."',
          'Vague: "The system should be fast." Measurable: "95% of search requests return in under 500 ms with 100 concurrent users."'
        ]
      },
      {
        heading: 'User stories',
        items: [
          { type: 'formula', label: 'User story template', text: 'As a <role> I want <capability> so that I can <get some benefit>' },
          'A user story says what should happen, for whom and why. It is short (fits a 3x5 card), may have prerequisites, has conditions of satisfaction and a priority.',
          '**Conditions of satisfaction** (acceptance criteria): testable behaviour from the user\'s point of view, numbered within the story (1.1, 1.2), each with a priority (E essential, D desirable in the pothole example).',
          'Pothole example: story 1 "As a citizen I want to report potholes so that the town can do something about them (E)". Conditions: 1.1 report a pothole (E); 1.2 see whether my pothole has been repaired (E); 1.3 see whether someone already reported it (D); 1.4 see estimated repair time (D).',
          'INVEST criteria for a good story: Independent, Negotiable, Valuable, Estimable, Small, Testable.'
        ]
      },
      {
        heading: 'Worked example: rewriting a bad requirement (veterinary clinic)',
        items: [
          { type: 'p', text: 'Bad: "The clinic system shall be easy to use and quickly show a pet\'s history." Problems: "easy" and "quickly" are ambiguous and unverifiable; "history" is incomplete; it mixes two requirements.' },
          'Better FR: "FR-12: A receptionist shall be able to retrieve all visits for a selected pet, ordered by date, from the pet record screen."',
          'Better NFR: "NFR-4: The visit list for a pet with up to 200 visits shall display within 2 seconds for 95% of requests with 20 concurrent users."',
          'Story: "As a vet I want to see a pet\'s previous visits so that I can avoid repeating treatments." Conditions: 1.1 visits listed newest first; 1.2 unknown pet gives a clear message; 1.3 existing full visit list still works.',
          { type: 'note', text: 'Assumptions (write these in the exam where the scenario is vague): visits are stored with a pet id; reception uses the existing web UI; 200 visits is a realistic upper bound.' }
        ]
      },
      {
        heading: 'How to get complete requirements (elicitation)',
        items: [
          'No single method is enough. Combine: 1 interview stakeholders (broad needs), 2 observe real work (hidden complexity), 3 run workshops with several stakeholders (resolve conflicts), 4 prototypes (validate understanding), 5 analyse policy documents (constraints), 6 walk through detailed scenarios (completeness).',
          'Red flags: only talking to managers, leading questions, a single method, missing quiet stakeholders.'
        ]
      }
    ],
    pitfalls: [
      'Listing only 2-3 attributes. Give at least six, each with a meaning and a vet-clinic style example.',
      'Writing HOW (use MySQL, use a dropdown) when asked for requirements; keep to WHAT unless it is a genuine constraint.',
      'Using unmeasurable words (fast, secure, user-friendly) in your own example requirements.',
      'Forgetting to state assumptions when the scenario is vague; the lecturer asks for them.'
    ]
  },

  {
    id: 'agile-manifesto',
    title: 'Agile Manifesto: 4 values and 12 principles',
    priority: 2,
    tier: 'core',
    hint: 'likely',
    freq: '2/7 papers (2023-24 x2) + hinted Q1a',
    marks: '4-9 marks',
    summary: '**The Manifesto has 4 value pairs (X over Y) and 12 principles about customer value, working software, people and continuous improvement. Q1a asks you to describe it and apply 2-3 principles to a scenario.**',
    mnemonic: 'Values: People, Software, Customer, Change (PSCC). Principles: Customer, People, Product, Reflect',
    source: ['CT417_Notes_01b_Agile_DevOps'],
    sections: [
      {
        heading: 'Agile in one paragraph',
        items: [
          'Agile = iterative and incremental development: software is built in small working increments, with constant customer feedback, frequent delivery and quick adaptation to change.',
          'The Manifesto for Agile Software Development (2001) says: we are uncovering better ways of developing software by doing it and helping others do it. These are the values and principles.',
          '"While there is value in the items on the right, we value the items on the left more."'
        ]
      },
      {
        heading: 'The four values',
        items: [
          { type: 'table', head: ['Value (preferred)', 'Over', 'What it means in practice'], rows: [
            ['Individuals and interactions', 'processes and tools', 'Talk to people daily; tools support the team, they do not replace conversation'],
            ['Working software', 'comprehensive documentation', 'A running increment is the measure of progress; document just enough'],
            ['Customer collaboration', 'contract negotiation', 'Customer is part of the team, reviews each sprint; do not hide behind the contract'],
            ['Responding to change', 'following a plan', 'Re-plan every sprint; changing requirements are welcome']
          ] },
          'Slide quote: "The highest priority is to satisfy the customer through early and continuous delivery of valuable software."'
        ]
      },
      {
        heading: 'The twelve principles (learn all; the exam picks one or more)',
        items: [
          { type: 'table', head: ['#', 'Principle (short)', 'Group'], rows: [
            ['1', 'Satisfy the customer through early and continuous delivery of valuable software', 'Customer'],
            ['2', 'Welcome changing requirements, even late in development; harness change for competitive advantage', 'Customer'],
            ['3', 'Deliver working software frequently, from a couple of weeks to a couple of months, preferring the shorter scale', 'Customer'],
            ['4', 'Business people and developers work together daily throughout the project', 'Customer'],
            ['5', 'Build projects around motivated individuals; give them the environment and support they need and trust them', 'People'],
            ['6', 'Face-to-face conversation is the most efficient and effective way to convey information', 'People'],
            ['7', 'Working software is the primary measure of progress', 'Product'],
            ['8', 'Agile processes promote sustainable development: a constant pace indefinitely', 'People'],
            ['9', 'Continuous attention to technical excellence and good design enhances agility', 'Product'],
            ['10', 'Simplicity, the art of maximising the amount of work not done, is essential', 'Product'],
            ['11', 'The best architectures, requirements and designs emerge from self-organising teams', 'People'],
            ['12', 'At regular intervals the team reflects on how to become more effective, then tunes and adjusts its behaviour', 'Reflect']
          ] }
        ]
      },
      {
        heading: 'Frameworks that implement Agile',
        items: [
          '**Scrum**: work in sprints (2-4 weeks) with sprint planning, daily stand-up, sprint review and retrospective. Roles: product owner (owns backlog/priorities), scrum master (removes blockers, coaches process), development team.',
          '**Kanban**: visualise workflow on a board and limit work in progress (WIP).',
          '**XP (Extreme Programming)**: technical excellence, pair programming, TDD, continuous integration, frequent small releases.',
          '**Lean**: minimise waste, maximise value.'
        ]
      },
      {
        heading: 'Model answers to the past-paper shapes',
        items: [
          { type: 'p', text: 'Shape 1: "Describe the Agile Manifesto and list TWO principles" (4 marks). Answer: 1 sentence on what it is + the four value pairs + two principles with one line each (e.g. 2 welcome changing requirements; 3 deliver working software frequently).' },
          { type: 'p', text: 'Shape 2: "Rapidly changing requirements and evolving data sources are causing delays. Pick one of the 12 principles and propose TWO solutions" (6 marks). Choose principle 2 (welcome change). Solutions: (1) keep a prioritised product backlog re-ordered every sprint planning so new requirements are slotted into the next sprint; (2) short 2-week sprints with a demo to stakeholders so wrong assumptions are caught early; (3) automated tests + CI so changes are cheap and safe.' },
          { type: 'p', text: 'Shape 3: "Five steps using principle 4 (business and developers collaborate daily) to fix poor predictions" (5 marks). Steps: (1) product owner embedded in the team, available daily; (2) joint backlog refinement to define "accurate enough" as measurable acceptance criteria (e.g. 70% match accuracy); (3) stakeholders attend sprint reviews and try the model; (4) feed user concerns into the backlog as stories; (5) retrospective to adjust data and models, then re-measure the metric.' },
          { type: 'p', text: 'Shape 4: "Three core principles XYZ should follow, and how to implement customer collaboration, responding to change and delivering working software in the CRM project with examples" (6 + 9 marks). Customer collaboration: product owner reviews user stories each sprint, sales staff test increments. Respond to change: backlog reprioritised each sprint, e.g. a new "lead scoring" request replaces a lower-value feature. Working software: each sprint ends with a deployable increment, e.g. a working contact search, demonstrated at the sprint review and shipped through CI/CD.' }
        ]
      }
    ],
    pitfalls: [
      'Reciting the values without applying them. Tie each point to the scenario (CRM, football predictions, vet clinic).',
      'Confusing the 4 values (X over Y) with the 12 principles. State both clearly.',
      'Writing an Agile vs Waterfall essay: the lecturer says 1a is NOT that; it is from the Manifesto.',
      'Saying Agile means no documentation or no planning. It values working software OVER comprehensive documentation, not instead of it.'
    ]
  },

  {
    id: 'req-change-management',
    title: 'Requirements engineering, management and change control',
    priority: 3,
    tier: 'core',
    hint: 'likely',
    freq: 'hinted Q1 (checkpoint style); 0/7 papers',
    marks: '8-15 marks',
    summary: '**Requirements are elicited, specified, validated and then managed: every change is recorded, assessed for impact, approved by a change authority, implemented, tested and traced. State your assumptions.**',
    mnemonic: 'Capture - Clarify - Commit - Change-control - Trace (the 5 Cs of requirements management)',
    source: ['CT417_Notes_03_Requirements_Change_Management'],
    sections: [
      {
        heading: 'Requirements engineering process',
        items: [
          { type: 'diagram', kind: 'flow', data: { steps: ['Elicit (interviews, observation, workshops)', 'Analyse and negotiate conflicts', 'Specify (stories, criteria, NFRs)', 'Validate (prototypes, review)', 'Manage (change, trace, baseline)'], direction: 'row', loopBack: 'requirements evolve, repeat' }, caption: 'Requirements engineering is iterative, not a one-off phase.' },
          'The request is only the starting point, not the specification. Preserve the original request, then add the clarified requirement, acceptance criteria and open questions.'
        ]
      },
      {
        heading: 'Requirements management (what it is)',
        items: [
          'Needs are captured from the market, business strategy, customers and other sources.',
          'Requirements are synthesised from the needs and the meaning is validated with the original sources.',
          'Commitment to the requirements is obtained from management and project staff.',
          'A history of changes and the rationale for changes is maintained as requirements evolve.',
          'Bidirectional traceability is maintained among requirements, project plans and work products.',
          'Inconsistencies among requirements, plans and work products are identified and resolved.'
        ]
      },
      {
        heading: 'Why we "engineer" requirements',
        items: [
          '**Trace satisfaction**: early assurance that top-level requirements are fully satisfied in the product.',
          '**Establish responsibility**: ownership of implementing each requirement is clear.',
          '**Create visibility**: expose allocation and cross-team interactions.',
          '**Assess change**: evaluate the impact of a changed requirement quickly.',
          '**Support V&V**: data for early verification and validation of requirements and design artefacts.'
        ]
      },
      {
        heading: 'Traceability and change authority',
        items: [
          'Requirements form a hierarchy (stakeholder needs, system requirements, component requirements). Bidirectional traceability links each level up (why does this exist?) and down (where is it designed, coded, tested?).',
          'A **change authority** (change control board, product owner or similar) decides whether a change request is accepted. Changes are not made informally by developers.',
          { type: 'table', head: ['Step', 'What happens', 'Output'], rows: [
            ['1 Raise', 'Stakeholder submits a change request (CR); original wording kept', 'CR recorded as an issue/work item'],
            ['2 Clarify', 'Ask what, why, who, edge cases; write acceptance criteria and open questions', 'Clarified requirement'],
            ['3 Impact analysis', 'Which requirements, components, tests, schedule, cost, risks are affected?', 'Impact report, estimate'],
            ['4 Decide', 'Change authority approves, rejects, defers; set priority', 'Decision recorded with rationale'],
            ['5 Implement', 'Branch, code, pull request with review', 'Change in code'],
            ['6 Verify', 'Tests prove the criteria and existing behaviour still works (regression)', 'Test evidence'],
            ['7 Update and trace', 'Update documents, link issue to PR and tests, release notes', 'Traceable history']
          ] }
        ]
      },
      {
        heading: 'Readiness vs priority (lecture point)',
        items: [
          'Readiness (raw request, clarified, ready for engineering) is different from priority (high, medium, low). A change can be urgent and still not ready.',
          'Ready = clarified requirement, acceptance criteria, open questions resolved or visible, owner assigned, enough agreement to start.',
          'Moving a card to "Ready" does not resolve missing decisions. The tool stores the agreement; it does not create it.'
        ]
      },
      {
        heading: 'Tooling: Jira vs GitHub Issues + Projects',
        items: [
          'Jira: larger organisational workflow (many teams, dependencies, roadmaps, permissions, reporting). Concepts: project, epic, story/task, backlog, assignee, status/workflow, board, priority, acceptance criteria.',
          'GitHub Issues + Projects: repository-centred. Issue = detailed work record (source request, clarified requirement, acceptance criteria, discussion). Project = backlog/board/roadmap view with status and priority. Pull request links the code to the issue.',
          'Mapping: work item = Issue; backlog = Project; status = project status; link to code = Pull Request. The tool changes; the engineering reasoning does not. Choose proportionate tooling.',
          'Engineering evidence chain: Issue, Pull Request, implementation, test, evidence (merged history, CI checks, traceability).'
        ]
      },
      {
        heading: 'Worked example: PetClinic CR-02 (veterinary clinic)',
        items: [
          { type: 'p', text: 'Request: "Staff have to retrieve the full visit list and inspect it manually. They need visits for a particular pet without breaking existing visit-list behaviour."' },
          'Requirement: callers can retrieve visits for a specified pet while the existing full-list behaviour remains available.',
          'Acceptance criteria: specified pet returns only that pet\'s visits; no pet id returns the existing full list unchanged.',
          'Open questions: unknown pet (404 or empty list?); malformed pet id (400?); known pet with no visits (empty list)?',
          'This is an additive API change (optional query parameter), so it is not breaking.',
          { type: 'note', text: 'Assumptions to state in an exam: visit ids and pet ids are numeric; the existing endpoint must stay backward compatible; the product owner (head vet) approves the change.' }
        ]
      },
      {
        heading: 'Answer template for "manage this change request" (20-mark Q1 style)',
        items: [
          '1. Assumptions (2-3 bullets).',
          '2. Stakeholders and what each cares about.',
          '3. Clarify and write the requirement as a user story + acceptance criteria + NFRs.',
          '4. Check against the attributes of a good requirement (unambiguous, verifiable, consistent, traceable).',
          '5. Change control steps: raise, impact analysis, decision by change authority, implement via branch and PR, test, update traceability.',
          '6. Tools: issue + project board + pull request link; Git history as audit trail.'
        ]
      }
    ],
    pitfalls: [
      'Describing a change process without naming who decides (change authority) or an impact analysis step.',
      'Forgetting traceability (link issue, PR, tests) and the rationale history.',
      'Not stating assumptions when the question says "where necessary, state any assumptions".',
      'Mixing up priority and readiness.'
    ]
  }
];
