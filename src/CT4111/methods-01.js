module.exports = [
{
  id: "define-and-distinguish", topicId: "genai-definitions", title: "Answer 'define and distinguish' questions",
  when: "Asked to define several terms or modes and compare them (e.g. three modes of AI use, or five terms)",
  mnemonic: "D-A-C-E: Define, Axes, Compare, Example",
  steps: [
    "1. Give each item a one-sentence definition using the lecture's wording (what it is, who drives it).",
    "2. List the comparison axes the question names (e.g. background/foreground, sync/async, human role) and cover EVERY axis for EVERY item.",
    "3. Lay the answer out as a small table or parallel bullets so each marker sees the same axes.",
    "4. Add one concrete example or tool per item.",
    "5. Finish with one sentence on the key difference (e.g. autonomy increases, human moves from author to approver).",
    "6. Budget: about one mark per distinct, named fact."
  ],
  example: {
    problem: "Define and distinguish conversational, conversational editing and repository-agent modes (10 marks).",
    solution: [
      "Conversational: chat outside the IDE, sees only pasted context, foreground and synchronous, human = author. Example: Claude app.",
      "Conversational editing: IDE chat sees file or workspace, proposes bounded diffs, foreground and synchronous (seconds), human = director who accepts or rejects each change. Example: Copilot Chat, Cline.",
      "Repository agent: sandbox with repo and tools, runs tests, returns a branch or PR, background and asynchronous, human = task specifier and approver. Example: Codex cloud, Copilot cloud agent.",
      "Key difference: context, autonomy and asynchrony grow, human control per step shrinks, so review and tests carry more weight."
    ]
  }
},
{
  id: "recommend-mode", topicId: "modes-of-ai-use", title: "Recommend an AI mode for a scenario",
  when: "Asked 'for what scenarios would you recommend each mode and why?'",
  mnemonic: "Clarity x Tests x Risk",
  steps: [
    "1. Rate the task on three axes: how clear/bounded the spec is, how good the test coverage is, how costly an error is.",
    "2. Unclear or learning-oriented or confidential: conversational (you stay author).",
    "3. Clear, local, quickly checkable by a diff: conversational editing.",
    "4. Clear, well-tested, routine or parallelisable: repository agent in the background.",
    "5. Give one concrete scenario and one 'why' per mode, plus one case where the mode is a bad choice.",
    "6. Mention the safeguard (version control, tests, human review)."
  ],
  example: {
    problem: "Recommend a mode for (1) understanding a legacy payroll module, (2) adding input validation to one class, (3) upgrading a logging library in 200 files.",
    solution: [
      "(1) Conversational: needs explanation and design thinking, no edits, human keeps ownership and no risk to the repo; upload the file or snippets.",
      "(2) Conversational editing: bounded change, context is the file and its tests, review the diff and run tests immediately.",
      "(3) Repository agent: routine, specified by rules, validated by build and tests, runs in the background in batches and returns PRs; avoid it for the payroll redesign because that needs product judgement."
    ]
  }
},
{
  id: "prompt-recipe", topicId: "prompt-engineering", title: "Write a prompt for X (role, context, task, constraints, format, examples)",
  when: "Asked 'write a prompt for generating/analysing/migrating X'",
  mnemonic: "R-C-T-C-F-E",
  steps: [
    "1. Role: who the model is (senior Java QA engineer).",
    "2. Context: domain, code or documents attached, tech stack, business rules.",
    "3. Task: one verb-led instruction, specific and measurable.",
    "4. Constraints: what to include or avoid, standards, limits (positive wording first, then 'avoid').",
    "5. Output format: structure, language, JSON schema, ordering, explanation per item.",
    "6. Examples: one or two few-shot examples or a fail case; ask for assumptions and questions about ambiguity.",
    "7. After the prompt add 2-3 lines justifying each part."
  ],
  example: {
    problem: "Write a prompt that turns informal user stories into reviewed user stories.",
    solution: [
      "Role: You are a senior requirements engineer.",
      "Context: Inventory management system for a warehouse; stories below are from stakeholders (attached).",
      "Task: For each story decide whether it is clear enough for engineers; rewrite unclear ones as 'As a [role], I want [feature], so that [benefit]'.",
      "Constraints: do not invent features; flag missing acceptance criteria; list assumptions separately.",
      "Format: Markdown table (story, clear yes/no, issue, improved story, acceptance criteria).",
      "Example: 'As Shawn I want to do my job as usual so that I can go home at 5' -> not clear: no feature; ask clarification.",
      "Why: role sets expertise, context prevents guessing, format makes validation easy, example shows the bad-story case."
    ]
  }
},
{
  id: "test-prompt-method", topicId: "test-suite-prompting", title: "Write a detailed prompt for a test suite",
  when: "Asked to propose a prompt for generating tests for a class or system",
  mnemonic: "ROSES + AVOID + FORMAT",
  steps: [
    "1. Role: senior test engineer in the language and framework (JUnit 5, Mockito).",
    "2. Context: name the class, its collaborators to mock, domain; attach source.",
    "3. Business rules: list every rule and expected outcome (the oracle).",
    "4. Must cover: happy path per input, invalid inputs, boundaries (X-1, X, X+1), failure paths, security, idempotency.",
    "5. Avoid: shallow asserts, getters and setters, order dependence, real clock and network.",
    "6. Quality rules: AAA, one scenario per test, descriptive names, parameterised tests.",
    "7. Output format: test class plus table of test name, rule verified, why it matters; list assumptions.",
    "8. After the prompt, state how you will check it: run, coverage, mutation score, human reviews assertions."
  ],
  example: {
    problem: "Prompt for tests of ParkingMeter.pay(ticket, minutes, card) where rate is 2 euro per hour, minimum 15 minutes, maximum 4 hours, declined cards are rejected.",
    solution: [
      "Role: You are a senior Java QA engineer using JUnit 5 and Mockito.",
      "Task: Generate unit tests for ParkingMeter.pay. Mock PaymentGateway and Clock.",
      "Rules: 2 euro per 60 minutes pro rata; minimum 15 minutes; maximum 240 minutes; declined card throws PaymentDeclined and issues no ticket extension; expired ticket cannot be extended.",
      "Cover: 14, 15, 16 minutes; 239, 240, 241 minutes; zero and negative minutes; null ticket or card; declined card; gateway timeout; double submission.",
      "Avoid: assertNotNull-only tests, testing getters, shared state between tests.",
      "Output: ParkingMeterTest with AAA structure and names like shouldReject_WhenMinutesExceedMaximum; then a table of test, rule, reason."
    ]
  }
},
{
  id: "choose-sdlc-phase", topicId: "sdlc-genai", title: "Choose the one SDLC phase for GenAI",
  when: "Asked which single phase you would use GenAI for, referring to all phases",
  mnemonic: "Choose, Criteria, Contrast five, Caveat",
  steps: [
    "1. Name the phase you choose.",
    "2. Give criteria: repetitive volume, verifiable output, low blast radius, quick human review, large gain.",
    "3. Give 3 reasons with a concrete GenAI task for the chosen phase.",
    "4. For each of the other five phases: one line on why not (risk, judgement, accountability) and the traditional approach.",
    "5. Add safeguards and one limitation of your pick."
  ],
  example: {
    problem: "Choose one phase (12 marks).",
    solution: [
      "Choice: testing. Criteria: repetitive, verifiable by running and by mutation score, errors caught before release, human reviews assertions.",
      "Reasons: generates unit, edge and regression tests quickly; analyses failures; lowers the barrier to TDD.",
      "Not requirements: ambiguity and stakeholder judgement, hallucinated requirements are costly. Not design: tribal knowledge and accountability for trade-offs. Not coding: I would write it with my own understanding (and avoid licence and security risk). Not deployment: production credentials and high blast radius. Not feedback: needs human prioritisation (summarising helps but I choose testing).",
      "Safeguards: humans supply business rules, review assertions, CI runs the tests. Limit: oracle problem."
    ]
  }
},
{
  id: "principle-answer", topicId: "se-principles-changed", title: "Answer 'has this principle changed?' (which, how, why)",
  when: "Asked whether traditional SE principles changed because of GenAI",
  mnemonic: "Was, Now, Why, Still",
  steps: [
    "1. State the principle and why it existed before (the original problem it solved).",
    "2. State the verdict: unchanged, weakened, strengthened or extended.",
    "3. Give the GenAI-driven reason (cost of generation, capability to read code, decoupled what/how, agents).",
    "4. Say what still holds or the risk of dropping it.",
    "5. One sentence of evidence or example."
  ],
  example: {
    problem: "Has 'don't repeat yourself' changed? (2 marks)",
    solution: [
      "Was: avoid duplication so a fix is made once and humans do not retype code.",
      "Now: weakened: AI writes copies in seconds and can later refactor them, so the cost that motivated DRY fell.",
      "Why still matters: duplication still bloats review and context and AI-assisted codebases show more duplication and less reuse (211M-line study), so clean-up becomes a regular AI task rather than a write-time rule."
    ]
  }
},
{
  id: "ai4re-chain", topicId: "ai4re-process", title: "Run an AI4RE prompt chain (stakeholders example)",
  when: "Asked to describe or apply the AI4RE process to a system",
  mnemonic: "Configure, Run, Chain, Validate",
  steps: [
    "1. Define the RE task and pick the template from the Prompt Guide (here: Identify Stakeholders).",
    "2. Fill placeholders: [DOMAIN], [SYSTEM] description, [FORMAT] (Markdown table).",
    "3. Run Prompt 1: groups, prioritised, classified by onion layer, assumptions separate.",
    "4. Attach supporting file (org chart) and run Prompt 2 mapping groups to roles, keeping group names consistent.",
    "5. Check privacy first: anonymise or use role IDs.",
    "6. Validate with domain experts, record assumptions, iterate before using for interviews."
  ],
  example: {
    problem: "Apply AI4RE to a university room-booking app.",
    solution: [
      "Placeholders: Domain = higher-education campus services; System = web app where staff and students book rooms with approval by timetabling; Format = table (Group, Onion layer, Role, Priority).",
      "Prompt 1 yields groups such as students and staff (System layer), timetabling office and IT (Immediate), estates, accessibility office and data protection officer (Containing and Wider), regulators (Wider).",
      "Prompt 2 with the org chart (names replaced by role IDs) maps groups to roles; ambiguous mappings are stated as assumptions.",
      "Validation: review with the timetabling manager; correct the missing 'accessibility office' priority before planning interviews."
    ]
  }
},
{
  id: "weighted-matrix", topicId: "architecture-design", title: "Weighted trade-off score matrix",
  when: "Asked to compare design alternatives or write the trade-off section of an ADR",
  mnemonic: "Weights sum to 1, multiply, add, then sanity-check",
  steps: [
    "1. List criteria relevant to the requirements (performance, security, maintainability, cost).",
    "2. Assign weights that sum to 100%.",
    "3. Score each alternative 0-10 per criterion with a one-line reason.",
    "4. Total = sum of weight x score.",
    "5. Pick the highest but apply human judgement for factors the AI is blind to (team skills, budget).",
    "6. Record in ADR: context, decision, alternatives, consequences."
  ],
  example: {
    problem: "Weights: performance 0.4, security 0.3, cost 0.3. A: 7, 6, 9. B: 9, 8, 5. C: 6, 9, 7.",
    solution: [
      "A = 0.4x7 + 0.3x6 + 0.3x9 = 2.8 + 1.8 + 2.7 = 7.3",
      "B = 0.4x9 + 0.3x8 + 0.3x5 = 3.6 + 2.4 + 1.5 = 7.5",
      "C = 0.4x6 + 0.3x9 + 0.3x7 = 2.4 + 2.7 + 2.1 = 7.2",
      "Winner B (7.5), but only 0.2 ahead of A: record the margin and the cost risk in the ADR consequences."
    ]
  }
},
{
  id: "mutation-score-calc", topicId: "mutation-testing", title: "Compute a mutation score and act on survivors",
  when: "Given mutant counts and asked for the score or what to do next",
  mnemonic: "Killed over (Total minus Equivalent)",
  steps: [
    "1. Remove equivalent mutants from the denominator.",
    "2. Divide killed by the remaining mutants.",
    "3. Survivors = total - equivalent - killed.",
    "4. For each survivor, find the behaviour no test checks; write a test that fails on the mutant.",
    "5. Re-run; repeat until the target score."
  ],
  example: {
    problem: "40 mutants, 5 equivalent, 28 killed. Score and survivors?",
    solution: [
      "Denominator = 40 - 5 = 35.",
      "Score = 28 / 35 = 0.80 = 80%.",
      "Survivors = 40 - 5 - 28 = 7: ask the LLM for tests that fail on each of the 7 mutants, review the assertions, re-run."
    ]
  }
},
{
  id: "bva-test-cases", topicId: "test-oracle-quality", title: "Derive test cases from a requirement (BVA)",
  when: "Asked to list test cases for a rule, e.g. in TDD",
  mnemonic: "Valid, Invalid, X-1 X X+1, Null",
  steps: [
    "1. Extract each rule and threshold from the requirement.",
    "2. Write a happy-path case.",
    "3. For each threshold X add X-1, X, X+1.",
    "4. Add invalid, empty, null, wrong-type and negative inputs.",
    "5. State the expected output per case and category.",
    "6. Order for TDD: write all as failing tests first."
  ],
  example: {
    problem: "Rule: orders of 100 euro or more get free delivery; basket must not be empty.",
    solution: [
      "Happy: 150.00 -> free delivery.",
      "Boundary: 99.99 -> charged; 100.00 -> free; 100.01 -> free.",
      "Invalid: empty basket -> rejected; null basket -> rejected; negative total -> rejected.",
      "Each case starts red (no code yet), then minimal code turns it green, then refactor."
    ]
  }
},
{
  id: "modification-answer", topicId: "modification-types", title: "Modification types: choose three, give two GenAI uses each",
  when: "Asked to select modification request types and outline GenAI contributions",
  mnemonic: "Type, Meaning, Two uses, Check",
  steps: [
    "1. Pick three types you know well (corrective, preventive, adaptive).",
    "2. One-line definition.",
    "3. Two different, concrete GenAI contributions numbered 1) and 2).",
    "4. One safeguard (tests, review).",
    "5. Keep each type to about 3 marks."
  ],
  example: {
    problem: "Corrective, preventive, adaptive (9 marks).",
    solution: [
      "Corrective: fix faults. 1) Analyse stack traces and logs to find root cause; 2) retrieve similar past bugs and propose a patch plus regression test.",
      "Preventive: restructure to avoid future faults. 1) Scan dependencies for vulnerable or outdated libraries; 2) rank refactoring candidates by risk and suggest refactorings.",
      "Adaptive: respond to environment change. 1) Monitor deprecations and compatibility; 2) locate all code affected by an API change and migrate it.",
      "All changes validated by tests and human review."
    ]
  }
},
{
  id: "repair-diagram", topicId: "fault-localisation-repair", title: "Draw the fault localisation and repair loop",
  when: "Asked to discuss a repair approach with a diagram identifying human and AI roles",
  mnemonic: "Report, Understand, Localise, Patch, Validate, Approve",
  steps: [
    "1. Draw boxes left to right: Human report -> GenAI structure report -> repo understanding and plan -> fault localisation -> patch generation.",
    "2. Add a Tools box (tests, linters, build) after patch generation.",
    "3. Draw arrows: tool failure back to patch generation (loop), pass to GenAI verifier.",
    "4. Verifier to Human review and approve; rejection arrow back to the start.",
    "5. Label each box Human, GenAI or Tool.",
    "6. Under the diagram write one line per role and the stopping rule (iteration limit, escalate)."
  ],
  example: {
    problem: "Describe the loop for a failing unit test in a Java service.",
    solution: [
      "Human files the failing test and report. GenAI structures it (environment, expected, actual).",
      "GenAI agent reads repo, ranks suspect files from the stack trace, narrows to a method, explains it line by line.",
      "GenAI generates a patch; Tool runs the test suite and linter; failures return to the generator (max 5 loops).",
      "GenAI reviewer checks the patch against intent; Human reviews the diff, approves or rejects."
    ]
  }
},
{
  id: "migration-prompt-method", topicId: "library-migration", title: "Library migration answer and prompt",
  when: "Asked for an example of GenAI library migration with task details and sample prompt",
  mnemonic: "Task, Pipeline, Prompt, Validate",
  steps: [
    "1. State the migration (old library to new, size of codebase).",
    "2. Describe pipeline: find, transform, validate, review in batches.",
    "3. Write the prompt: persona, mapping rules, 'change nothing else', output format, TODO rule.",
    "4. Name the validators (compile, tests, lint, diff filter).",
    "5. Mention pacing and human review."
  ],
  example: {
    problem: "Migrate 3000 Python files from requests to httpx.",
    solution: [
      "Task: replace requests.get/post calls, Session usage and exception types with httpx equivalents.",
      "Prompt: You are a senior Python engineer. Migrate the files from requests to httpx. Rules: requests.get(url, timeout=t) becomes httpx.get(url, timeout=t); requests.Session becomes httpx.Client; requests.exceptions.RequestException becomes httpx.HTTPError; add import httpx and remove import requests. Do not change formatting, names or comments. If unsure add TODO(httpx). Output only the migrated file.",
      "Validate: run mypy and the unit tests per file, reject diffs with unrelated lines, retry or escalate failures; merge 50 files per PR."
    ]
  }
},
{
  id: "agent-diagram", topicId: "static-analysis-agents", title: "Draw the agentic static-analysis triage and repair pipeline",
  when: "Asked to outline an agentic approach to classify and repair static analysis warnings",
  mnemonic: "Warn, Classify, Plan, Fix, Validate, Rank, Review",
  steps: [
    "1. Box: static analyser produces warning.",
    "2. Box: classifier agent with tools (read code and docs, find references) decides true or false positive.",
    "3. FP branch to justified suppression for human confirmation; TP branch to planner then fixer agent.",
    "4. Box: validation (compile, tests, re-run analyser); fail loops back to fixer.",
    "5. Box: ranker/reviewer agent scores candidate patches.",
    "6. Box: human approves PR; label roles and what is passed along each arrow."
  ],
  example: {
    problem: "Warning: 'class variable fields should not have public accessibility'.",
    solution: [
      "Classifier reads the class, finds references: a field used by 12 classes: true positive.",
      "Planner proposes: make field private, add getter/setter, update callers; keep change minimal.",
      "Fixer edits 13 files; validation compiles, tests pass, analyser shows the warning is gone with no new ones.",
      "Reviewer scores 3 (only warning-related edits); human approves the PR."
    ]
  }
},
{
  id: "legal-risk-answer", topicId: "legal-risks", title: "Legal risk with mitigation answer",
  when: "Asked for two legal risks of a GenAI-built product and mitigation for each",
  mnemonic: "Risk, How it arises, Consequence, Mitigation",
  steps: [
    "1. Choose two distinct categories (IP, GDPR, AI Act, liability).",
    "2. Name the risk and the relevant law or licence.",
    "3. Tie it to the scenario in one sentence (loan decisions, personal data).",
    "4. State the consequence (fines, forced open-sourcing, harm).",
    "5. Give 2-3 specific mitigations.",
    "6. 4 marks per risk: about 1 for naming, 1 for linking, 2 for mitigation."
  ],
  example: {
    problem: "Irish loan-approval startup using GenAI: two risks.",
    solution: [
      "Risk 1: EU AI Act high-risk (credit scoring): needs technical documentation, decision logging, bias testing and human oversight; non-compliance brings fines. Mitigation: classify early, log inputs, rule version and thresholds per decision, add human override and a tested suspension path, run bias tests.",
      "Risk 2: GDPR: developers paste applicants' financial data into an external LLM and generated code collects excess data; automated decisions need safeguards. Mitigation: DPIA, zero-retention or private LLM, PII-filter proxy, data minimisation review, documented lawful basis and human review route."
    ]
  }
},
{
  id: "opinion-two-reasons", topicId: "bitter-lesson", title: "Opinion answer with a fixed number of reasons",
  when: "'In your opinion... provide two reasons'",
  mnemonic: "Stance, Reason 1, Reason 2, Caveat",
  steps: [
    "1. Define the concept briefly (2-3 lines) if asked to explain it first.",
    "2. State a clear stance in one sentence.",
    "3. Give exactly the number of reasons asked, each with a concrete example from the course.",
    "4. Add one caveat or counter-argument showing balance.",
    "5. Conclude in one line."
  ],
  example: {
    problem: "Does the bitter lesson apply to SE with GenAI? Two reasons.",
    solution: [
      "Definition: general methods using computation (search and learning) beat built-in human knowledge in the long run.",
      "Stance: largely yes.",
      "Reason 1: elaborate scaffolding (prompt chains, hand-built retrieval, multi-agent org designs) is overtaken as models search code, plan and spawn agents themselves.",
      "Reason 2: coding is verifiable, so compute for RL and parallel search keeps improving ability.",
      "Caveat: specification, verification, guardrails and accountability stay human and durable."
    ]
  }
},
{
  id: "verifiable-judgement", topicId: "verifiable-tasks", title: "Judge whether an SE task is verifiable",
  when: "Asked to identify other tasks and justify verifiability",
  mnemonic: "What is the automatic check?",
  steps: [
    "1. Define verifiable: automatic, objective, cheap correctness check.",
    "2. For the task ask: what is the check (tests, compiler, formal checker)? is it complete?",
    "3. Verdict: yes, partly or no.",
    "4. Justify with the oracle and its limits.",
    "5. State the consequence for AI autonomy."
  ],
  example: {
    problem: "Two tasks: bug fixing with a failing test; architecture decision.",
    solution: [
      "Bug fix: verifiable largely: the test must flip to green and the suite stay green; limit: tests may be incomplete or overfitted.",
      "Architecture decision: not verifiable: trade-offs depend on team, budget and future change; no objective oracle, so humans decide and AI proposes."
    ]
  }
}
];
