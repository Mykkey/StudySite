module.exports = [
{
  id: "tdd-genai", title: "Test-driven development and GenAI", priority: 7, tier: "core",
  freq: "sample paper Q4(a) + Topics 6, 7", marks: "9 marks (3 x 3)",
  summary: "**TDD is red (failing test), green (minimal code), refactor; GenAI augments each stage: prompt-to-test for RED, auto-implementation for GREEN, AI code review and refactoring for REFACTOR, with the human verifying tests and architecture because writing a test is now the way you instruct the AI.**",
  mnemonic: "RED = AI writes tests, GREEN = AI writes code, REFACTOR = AI cleans, HUMAN verifies",
  source: ["CT4111_Notes_07_Testing", "CT4111_Notes_06_Implementation_Workflows"],
  sections: [
    { heading: "TDD basics", items: [
      "**Definition (SWEBOK v4):** a construction method where unit tests are written before the source code, turning testing from end-of-cycle verification into a **design tool**.",
      "'First' philosophy: no code until there is a failing test; tests define the contract before implementation.",
      "**RED:** write a small test for a new function; it must fail (proves the test can catch a bug). **GREEN:** write the minimal code to pass; do not worry about elegance. **REFACTOR:** clean up, remove duplication, keep behaviour; tests are the safety net.",
      "Mantra: 'If it is not green, do not optimise. If you have no tests, do not refactor.'",
      "Values: less technical debt (refactoring built in), living documentation (tests never lie), fearless refactoring, better modular decoupled design. Slower at first, faster in the long run.",
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "RED", sub: "write failing test", color: 0 },
        { label: "GREEN", sub: "minimal code to pass", color: 2 },
        { label: "REFACTOR", sub: "clean, tests stay green", color: 1 }
      ], direction: "row", loopBack: "next requirement / test" }, caption: "The TDD micro-cycle." }
    ] },
    { heading: "Three ways GenAI augments the TDD cycle (exam answer)", items: [
      "**1. Prompt-to-test (RED):** from a natural-language requirement or user story, the AI proposes test cases (valid, invalid, boundary, null, business rules) and writes the failing tests. Example: 'Users must create a secure password' gives TC-01 3 chars returns false, TC-02 exactly 8 chars returns true, TC-03 no digit returns false, TC-04 null returns false. Removes the 'tests take too long' barrier.",
      "**2. Auto-implementation (GREEN):** the AI (or an agent looping run-tests, read-failure, edit) writes the minimal code to make the tests pass and iterates until green. Tests act as the specification and as automatic verification of the AI's output; no human reading of every line needed.",
      "**3. AI code review and refactoring (REFACTOR):** the AI cleans the messy green code (extract method, remove duplication, rename) while tests check behaviour is preserved; it can also review the tests for shallow assertions and missing edge cases.",
      "**Human verification:** a senior developer confirms architecture and logic make sense and reviews the assertions (oracle problem). Humans define test goals, domain rules, edge cases, invariants.",
      "Lecture QA workflow (4 steps): business requirement; GenAI defines QA criteria and AST paths/edge cases (the core step); TDD cycle red-green-refactor; robust verified code. Lecture TDD example: password rule (min 8 chars, contains a digit): messy green isValid with three ifs refactored into PasswordValidator with isInvalidInput and containsDigit helpers.",
      "Lecture agentic TDD with human-in-the-loop (figure): Stage 1 context and design (Agent 1 requirements analyzer, Agent 2 test scenario architect, Agent 3 scenario critic, Human Checkpoint 1 scenario validator, go/no-go); Stage 2 autonomous actor-critic loop (Agent 4 unit test generator, Agent 5 code implementer with red-fail / green-pass loop, Agent 6 runtime and coverage environment, Agent 8 security auditor with SAST, refactoring critic); Stage 3 quality gates (Agent 9 quality and metrics evaluator, thresholds LCOM < 0.2 and cyclomatic complexity < 10; Agent 10 release orchestrator; Human Checkpoint 2 final PR review and merge).",
      "Further augmentations: AI generating extra edge cases and property-based invariants; AI explaining failing tests; mutation testing to check test strength."
    ] },
    { heading: "Agentic TDD workflow and risks", items: [
      "Workflow (Topic 6): developer writes or reviews tests; an orchestra of agents (one per test, reviewer, integrator, coordinator that escalates to a human) loops until all tests pass; then PR and human review.",
      "Pros: resolves the human review bottleneck; requirements enforced by tests; lowers need for human-readable code.",
      "Cons: needs thorough tests up-front; the LLM may **cheat** (modify tests or special-case to pass them, satisfying the case but not the structure); LLM-lock-in if code is only LLM-friendly; token cost. Guardrail: make tests read-only to the agent and check with mutation testing and review.",
      "Red-green TDD for agents (Willison): have the agent write the failing test first, see it fail, then fix; confirms each fix."
    ] }
  ],
  pitfalls: [
    "Listing three ways but not tying each to a TDD stage (red / green / refactor).",
    "Forgetting the human role and the cheating risk (AI changes tests to make them pass).",
    "Saying TDD is 'testing after coding': tests come first."
  ]
},
{
  id: "test-suite-prompting", title: "Prompting for a test suite (ManagePrint example)", priority: 8, tier: "core",
  freq: "sample paper Q4(b)(c) + Topic 7 prompts", marks: "12 + 4 marks",
  summary: "**A strong test-generation prompt states role, task and class, language and framework, context, business rules, scenarios to cover, what to avoid (shallow tests), quality rules and output format; the changes that matter most are naming business rules and edge cases, forbidding shallow asserts, and fixing the framework.**",
  mnemonic: "ROSES: Role, Objective, Scenario, Expected solution, Steps (plus: Avoid and Output)",
  source: ["CT4111_Notes_07_Testing", "CT4111_Notes_02_Topic_2"],
  sections: [
    { heading: "The reusable template (Topic 7)", items: [
      { type: "code", text: "Role: You are a senior software test engineer.\nTask: Generate tests for [CLASS / FUNCTION].\nLanguage/framework: [Java + JUnit 5 + Mockito, Python + pytest ...].\nContext: [short domain description].\nBusiness rules: [list the important rules].\nMust cover: [happy path, edge cases, errors, regression].\nAvoid: [trivial assertions, implementation details, shallow tests].\nOutput format: [test names + code + brief explanation]." },
      "**ROSES framework:** Role (e.g. senior SDET), Objective (single measurable goal), Scenario (stack, architecture, constraints), Expected solution (exact syntax, format, schema), Steps (algorithmic workflow for the reasoning).",
      "Instead of 'Write tests for BookingService', say: JUnit 5 and Mockito, do not only test happy paths, avoid shallow tests like assertNotNull, focus on business rules, edge cases and failure scenarios, assertions must verify meaningful behaviour and explain why each test matters, name the specific cases (overlap detection, invalid time ranges, authorisation, payment failure, audit log).",
      "Variants: integration tests (list integration points, scenarios, quality rules: verify DB state and side effects, not only HTTP status); API tests (status codes and bodies, authn/authz failure, conflict); value tests (boundaries and invariants); a **skill file** (steps: read class, write test class, run tests, never weaken an assertion, check JaCoCo coverage at least 80%, report which rule each test verifies; constraints: Mockito for externals, no getter/setter tests, Given/When/Then Javadoc, independent tests)."
    ] },
    { heading: "Worked example: detailed prompt for ManagePrint (12 marks)", items: [
      { type: "code", text: "Role: You are a senior Java QA engineer experienced in JUnit 5 and Mockito.\n\nTask: Generate a high-quality unit test suite for the class ManagePrint of a 3D-printing ordering system. Return test code only for the unit under test; use the mocks described below.\n\nContext: ManagePrint lets a user (1) select a print file, (2) select a printer type, (3) select a print material type, (4) set a deadline (day and time) and (5) pay. Collaborators to mock: FileService (validates and sizes the file), PrinterCatalog (supported printers and materials), PricingService, SchedulingService (estimates print duration and queue), PaymentGateway, AuditLog, Clock. I will paste the source of ManagePrint below.\n\nBusiness rules (assumed, correct me if wrong):\n- File must exist, be .stl or .3mf, non-empty and under 100 MB.\n- Material must be compatible with the printer type (e.g. FDM supports PLA/ABS/PETG, resin printers only resin).\n- Deadline must be in the future and at least the estimated print time plus queue time from now; use the injected Clock.\n- Price is computed from material usage; payment is taken only after all selections are valid.\n- If payment fails, no print job is queued and the user is told why. A print is queued exactly once even if pay is called twice.\n- Only authenticated users may order; every order and failure is written to the audit log.\n\nMust cover:\n1. Happy path for each printer and material combination.\n2. Invalid inputs: null or missing file, wrong extension, empty file, oversized file, null printer or material, incompatible printer/material.\n3. Boundary values for the file size limit (limit-1, limit, limit+1) and for the deadline (exactly feasible, 1 minute too early, in the past), time zone and daylight-saving edge cases.\n4. Payment: success, declined card, gateway timeout, double submission (idempotency); verify no job is queued on failure.\n5. Unauthorised user; scheduler unavailable; audit log entries for success and failure.\n6. Order of operations: payment is not attempted before validation passes.\n\nAvoid: shallow tests (assertNotNull, status only, 'method called once' with no outcome check), testing getters and setters, depending on test execution order, real clocks or network, asserting private implementation details.\n\nQuality rules: Arrange-Act-Assert; one scenario per test; descriptive names such as shouldRejectDeadline_WhenEarlierThanEstimatedPrintTime; Mockito for collaborators; parameterised tests for the compatibility matrix; every assertion checks a concrete value or state change.\n\nOutput format: a single ManagePrintTest class with grouped nested classes, followed by a table listing each test name, the business rule it verifies and why it matters. List any assumptions and any rule you could not test." },
      "Why each part is there (add 2-4 lines like these in the exam): role sets expertise level; context and rules give the oracle (AI cannot guess intended behaviour); explicit scenarios stop happy-path-only suites; BVA and time edge cases target classic defects; 'avoid' blocks shallow tests; framework fixes syntax; output format makes review easy; asking for assumptions exposes where the model guessed.",
      "Process around the prompt: human reviews assertions, adds missing edge cases, asks AI to refine; run coverage (branch) and mutation testing; iterate."
    ] },
    { heading: "Prompt changes with the most impact (4 marks)", items: [
      "**Naming the business rules and expected outcomes** (the oracle): most effective, because without them the AI asserts trivial or implementation-copy properties.",
      "**'Do not only test happy paths' plus an explicit scenario list** (payment failure, occupied room, null input): triggered failure-path tests and an edge-case test for yesterday's date.",
      "**'Avoid shallow tests such as assertNotNull'**: forces meaningful assertions.",
      "**Specifying framework and style** ('JUnit 5 and Mockito', AAA, naming): gives correct modern annotations and consistent readable tests.",
      "**Giving the real source code and context** (RAG/file attached) rather than a class name; and **asking for a rationale per test**, which makes review quick.",
      "Less effective: longer prose, politeness, repeating the same instruction."
    ] }
  ],
  pitfalls: [
    "Writing a one-line prompt: 12 marks need role, context, business rules, scenarios, avoid-list, format and a short justification.",
    "Not covering all five ManagePrint inputs (file, printer type, material, deadline, payment).",
    "Asking for tests but giving no business rules, so the oracle is missing.",
    "Forgetting boundaries (deadline now, limit-1/limit/limit+1) and failure paths (payment declined)."
  ]
},
{
  id: "mutation-testing", title: "Mutation testing and GenAI", priority: 17, tier: "likely",
  freq: "sample paper bonus Q(a) + Topic 7", marks: "6 marks",
  summary: "**Mutation testing injects small deliberate faults (mutants) into the code and re-runs the unit tests: killed mutants show the tests detect faults, surviving mutants reveal weak tests; GenAI helps by generating realistic mutants, spotting equivalent ones and writing new tests that kill survivors.**",
  mnemonic: "Mutate, Run, Kill or Survive",
  source: ["CT4111_Notes_07_Testing"],
  sections: [
    { heading: "How mutation testing fits unit testing", items: [
      "Unit tests tell how good the code is functionally; coverage tells what was executed; **mutation testing asks how good the unit tests are** (white-box technique).",
      "Coverage levels: class, method, line, branch (each decision outcome), path (each route). Example given: 6 branches, 8 paths.",
      "Process: (1) systematically modify the source to create a mutant (e.g. change i++ to i--, flip a comparison, remove a statement); (2) run the unit tests; (3) if no test fails, the tests may be bad or a new test is needed; (4) repeat with a different mutation.",
      "**Killed:** a test fails (good). **Surviving:** all tests pass (possibly bad: missed behaviour). **Equivalent:** change does not alter behaviour, cannot be detected, ignored.",
      { type: "formula", label: "Mutation ratio (the slide's name; also called mutation score)", text: "Mutation Ratio = #Killed / (#Total - #Equivalent)" },
      { type: "formula", label: "Related slide formulas", text: "Test Pass Rate = #Passed tests / #Total tests (slide example 25 / 26 = about 0.96). Unit-level coverage = #Units tested at least once / #Total units." },
      "Worked example: 20 mutants, 3 equivalent, 14 killed, so 3 survivors: score = 14 / (20 - 3) = 14 / 17 = 82.4%. The 3 survivors point to missing tests."
    ] },
    { heading: "Typical GenAI support", items: [
      "**Generate meaningful mutants:** LLM reads the code and proposes realistic, context-aware faults (off-by-one, wrong boundary, missing null check, wrong business rule) instead of only syntactic operators.",
      "**Triage equivalent mutants:** LLM judges whether a surviving mutant is behaviourally equivalent (expensive to do by hand).",
      "**Close the gap (typical loop):** run mutation tool, feed the surviving mutants plus the code and existing tests to the LLM, ask for new tests that kill them, re-run, repeat until score target met; human reviews assertions.",
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "Code + tests", sub: "baseline green" },
        { label: "Generate mutants", sub: "tool or LLM" },
        { label: "Run tests", sub: "killed / survived" },
        { label: "LLM writes tests for survivors", sub: "human reviews" },
        { label: "Re-run, new score", sub: "stop at target" }
      ], direction: "row", loopBack: "survivors remain" }, caption: "GenAI-supported mutation testing loop." },
      "Value: checks that AI-generated tests are not shallow (AI tests can pass without proving correctness)."
    ] }
  ],
  pitfalls: [
    "Describing mutation testing as testing the application; it tests the quality of the tests.",
    "Forgetting equivalent mutants (cannot be killed).",
    "Giving only the process and no GenAI role (6 marks need both parts)."
  ]
},
{
  id: "test-oracle-quality", title: "Test oracle problem and test quality", priority: 21, tier: "possible",
  freq: "Topic 7 learning outcomes", marks: "5-8 marks",
  summary: "**The oracle problem is deciding whether an observed result is correct: AI can generate inputs and assertions but may not know the intended behaviour, so it produces shallow tests that pass without proving anything; good tests are trustworthy, maintainable, refactor-resilient and thorough.**",
  mnemonic: "Trust, Maintain, Resist, Thorough (TMRT) and AAA",
  source: ["CT4111_Notes_07_Testing"],
  sections: [
    { heading: "The oracle problem and misleading tests", items: [
      "**Test oracle problem:** the difficulty of deciding whether a result is correct (what is the expected output?). False confidence is dangerous.",
      "AI may assert trivial properties, copy implementation details (overfit to current code, so bugs are baked in), miss business rules, produce tests that pass without proving correctness.",
      "Weak test examples: check only status code; interaction-only test (method called once); happy path only; assertNotNull or result != null.",
      "**Bach and Bolton: checking vs testing.** Checking = superficial verification of known assertions; testing = critical evaluation, domain understanding, risk analysis. AI is good at checks; humans define expectations.",
      "Improve the oracle: domain knowledge and specifications, explicit expected behaviour, property-based checks and invariants, manual review of AI assertions. Test quality over quantity."
    ] },
    { heading: "Human-guided vs AI-guided workflow", items: [
      { type: "table", head: ["Step", "Human-guided (preferred)", "AI-guided"], rows: [
        ["1", "Human defines test goals", "Human defines test goals"],
        ["2", "AI generates draft tests", "AI generates draft tests"],
        ["3", "Human reviews assertions", "AI reviews assertions"],
        ["4", "Human adds missing edge cases", "AI adds missing edge cases"],
        ["5", "AI refines and expands", "AI refines and expands"]
      ] },
      "Humans supply domain rules, expected outcomes, important edge cases, risk areas and invariants; AI scales it into many tests."
    ] },
    { heading: "Four test qualities", items: [
      "**Trustworthiness:** no flaky tests (time zones, randomness, external APIs); no false positives or negatives.",
      "**Maintainability and readability:** Arrange-Act-Assert; descriptive names (shouldReturnFalse_WhenPasswordIsTooShort); one logical scenario per test.",
      "**Resilience to refactoring:** test behaviour (inputs and outputs), not implementation; if renaming a private helper breaks a test it is fragile.",
      "**Thoroughness:** beyond happy path (null, empty, negative); **boundary value analysis** X-1, X, X+1 (17, 18, 19 for age 18); branch coverage over the abstract syntax tree, not just line coverage."
    ] },
    { heading: "Test doubles (fidelity)", items: [
      { type: "table", head: ["Double", "Meaning", "Asserted against?"], rows: [
        ["Actual object", "Real collaborator (database, file system), not a double", "-"],
        ["Fake", "Simplified working implementation (in-memory database)", "No"],
        ["Mock", "Replaces collaborator; interactions are verified", "Yes"],
        ["Spy", "Replaces collaborator and records what happens", "Yes"],
        ["Stub", "Returns predefined responses", "No"],
        ["Dummy", "Placeholder parameter to satisfy an interface", "No"]
      ] },
      "Slide worked example (BookingService.createBooking, repository and paymentProcessor mocked, JUnit 5 + Mockito), five AI-generated tests: (1) happy path (assertTrue, verify save), (2) invalid input: negative price throws IllegalArgumentException, (3) edge case: date in the past throws, (4) room occupied returns false and payment never charged, (5) payment fails returns false and booking never saved.",
      "Load testing = typical peak load; stress testing = find the breaking point; MTBF = mean time between failures. ISO/IEC/IEEE 29119 parts: 1 concepts, 2 test processes, 3 documentation, 4 techniques, 5 keyword-driven testing.",
      "Prefer high fidelity when reasonable, but do not force it."
    ] },
    { heading: "Test levels and types reminder", items: [
      "**Unit** (smallest units in isolation with mocks), **integration** (interfaces between modules: data formats, timing, contracts), **system** (whole product vs requirements, non-functional), **acceptance** (customer needs, ready for production).",
      "Functional vs non-functional (performance: load and stress; security; usability; reliability: MTBF). **Static** (no execution, e.g. SonarQube) vs **dynamic** vs **regression**. **Black box** (no code knowledge) vs **white box** (code visible: unit, static analysis, mutation).",
      "GenAI can generate unit, integration, edge-case and regression tests, mock set-ups and test data: faster, more coverage of obvious cases, less repetition."
    ] }
  ],
  pitfalls: [
    "Equating a high number of generated tests with quality.",
    "Mixing up mock and stub: mocks are asserted against, stubs are not."
  ]
},
{
  id: "qa-criteria-failure-analysis", title: "QA criteria and GenAI test-failure analysis", priority: 27, tier: "possible",
  freq: "Topic 7 sub-topics 4 and 5", marks: "5 marks",
  summary: "**GenAI acts as a QA architect (acceptance criteria, edge cases, severity, automation level from user stories) and as a failure analyst (root cause from stack trace plus test plus production code, bug in test or code, suggested fix).**",
  mnemonic: "QA criteria in, root cause out",
  source: ["CT4111_Notes_07_Testing"],
  sections: [
    { heading: "Defining quality-assurance criteria with GenAI", items: [
      "Generate acceptance criteria from user stories; identify edge cases and negative scenarios; turn business requirements into scenarios both business and automation can understand; validate testability (and so implementability) of a task.",
      "**GenAI as QA architect:** tireless brainstorming partner (20 angles on what could go wrong), uncovers blind spots (decision logic implied by a requirement, missing combinations), standardises a team checklist for 'definition of done'.",
      "Blueprint prompt: 'Act as a Senior QA Architect... for each criterion list the conditions and outcomes (flag undefined), scenario description, decision rules covered, severity (Critical/Major/Minor), automation feasibility (Unit/Integration/E2E).'"
    ] },
    { heading: "Using GenAI to analyse test failures", items: [
      "Instant log parsing (root cause from a 200-line stack trace); contextual correlation (failing test plus production code pinpoints the diverging line); hypothesis generation (prioritised reasons).",
      "Prompt: Act as a Senior Java Test Engineer; here is the stack trace, the test, the production code; explain (1) root cause, (2) bug in test or production code, (3) corrected code.",
      "Example: MembershipService used plusDays(365) for a one-year expiry; start 15 Jan 2028 includes 29 Feb 2028 (366 days) so result was 14 Jan 2029 instead of 15 Jan 2029; fix: plusYears(1) using java.time.",
      "Human still verifies the diagnosis and the fix."
    ] },
    { heading: "From requirement to test cases (TDD example)", items: [
      { type: "table", head: ["Test", "Scenario", "Expected", "Category"], rows: [
        ["TC-01", "Shorter than 8 chars ('123')", "false", "Invalid input"],
        ["TC-02", "Exactly 8 chars ('Abcde123')", "true", "Edge case / business rule"],
        ["TC-03", "No digits ('Password')", "false", "Business rule"],
        ["TC-04", "Null password", "false", "Robustness"]
      ] }
    ] }
  ],
  pitfalls: ["Accepting the AI's root-cause explanation without checking whether the bug is in the test or the code."]
}
];
