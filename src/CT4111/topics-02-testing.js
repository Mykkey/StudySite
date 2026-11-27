module.exports = [
  {
    "id": "tdd-genai",
    "title": "Test-driven development and GenAI",
    "priority": 7,
    "tier": "core",
    "freq": "sample paper Q4(a) + Topics 6, 7",
    "marks": "9 marks (3 x 3)",
    "summary": "**TDD is red (failing test), green (minimal code), refactor; GenAI augments each stage: prompt-to-test for RED, auto-implementation for GREEN, AI code review and refactoring for REFACTOR, with the human verifying tests and architecture because writing a test is now the way you instruct the AI.**",
    "mnemonic": "RED = AI writes tests, GREEN = AI writes code, REFACTOR = AI cleans, HUMAN verifies",
    "source": [
      "CT4111_Notes_07_Testing",
      "CT4111_Notes_06_Implementation_Workflows"
    ],
    "sections": [
      {
        "heading": "TDD basics",
        "items": [
          "**TDD** (test-driven development): unit tests are written **before** the code. SWEBOK v4 (the standard guide to software engineering knowledge) calls it a construction method, which turns testing from an end check into a **design tool**.",
          "No code until there is a failing test. The tests define what the code must do.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "RED",
                  "sub": "write failing test",
                  "color": 0
                },
                {
                  "label": "GREEN",
                  "sub": "minimal code to pass",
                  "color": 2
                },
                {
                  "label": "REFACTOR",
                  "sub": "clean, tests stay green",
                  "color": 1
                }
              ],
              "direction": "row",
              "loopBack": "next requirement / test"
            },
            "caption": "The TDD micro-cycle."
          },
          "**RED**: write a small test for a new function. It must fail, which proves the test can catch a bug.",
          "**GREEN**: write the least code that passes. Do not worry about elegance.",
          "**REFACTOR**: tidy up and remove duplication without changing behaviour. The tests are your safety net.",
          "Mantra: \"If it is not green, do not optimise. If you have no tests, do not refactor.\"",
          "Value: less **technical debt** (future work caused by shortcuts), documentation that cannot go out of date, confident refactoring, and a more modular design. Slower at first, faster in the long run."
        ]
      },
      {
        "heading": "Three ways GenAI augments the TDD cycle (exam answer)",
        "items": [
          {
            "type": "p",
            "text": "1. Prompt-to-test (RED)"
          },
          "From a plain-English requirement or user story, the AI proposes test cases (valid, invalid, boundary, null, business rules) and writes the failing tests.",
          "Example: \"Users must create a secure password\" gives TC-01 3 characters returns false, TC-02 exactly 8 returns true, TC-03 no digit returns false, TC-04 null returns false.",
          "This removes the \"tests take too long\" excuse.",
          {
            "type": "p",
            "text": "2. Auto-implementation (GREEN)"
          },
          "The AI, or an **agent** looping \"run tests, read failure, edit\", writes the least code to pass and repeats until everything is green.",
          "The tests act as the specification and automatically check the AI's output.",
          {
            "type": "p",
            "text": "3. AI review and refactoring (REFACTOR)"
          },
          "The AI cleans up the messy passing code (pull out methods, remove duplication, rename) while the tests check behaviour is unchanged.",
          "It can also review the tests for weak assertions and missing **edge cases** (unusual or extreme inputs).",
          {
            "type": "p",
            "text": "Human checking"
          },
          "A senior developer confirms the design makes sense and reviews the assertions. This matters because of the **oracle problem**: the AI may not know what the correct answer is.",
          "Humans define the test goals, business rules, edge cases and **invariants** (things that must always be true)."
        ]
      },
      {
        "heading": "The lecture's examples of AI-assisted TDD",
        "items": [
          {
            "type": "p",
            "text": "QA workflow (4 steps)"
          },
          "(1) Business requirement. (2) GenAI defines quality criteria, the code paths and the edge cases (the core step; it can use the **AST**, the code's structure as a tree). (3) Red-green-refactor. (4) Robust, checked code.",
          "Example: a password rule (at least 8 characters, contains a digit). A messy passing `isValid` with three ifs is refactored into `PasswordValidator` with `isInvalidInput` and `containsDigit` helpers.",
          {
            "type": "p",
            "text": "Further help"
          },
          "AI can generate extra edge cases and **properties** that should hold for any input, explain failing tests, and support **mutation testing** (deliberately planting small bugs to see whether the tests notice)."
        ]
      },
      {
        "heading": "The multi-agent TDD figure",
        "items": [
          "An **agentic** workflow uses several AI agents with different jobs, with **human-in-the-loop** checkpoints where a person decides.",
          {
            "type": "p",
            "text": "Stage 1: context and design"
          },
          "Agent 1 analyses requirements, Agent 2 designs test scenarios, Agent 3 criticises them. **Human checkpoint 1**: approve the scenarios (go or no-go).",
          {
            "type": "p",
            "text": "Stage 2: automatic loop"
          },
          "One side produces, another criticises (**actor-critic**). Agent 4 writes unit tests, Agent 5 writes code (fail then pass), Agent 6 runs it and measures coverage, Agent 8 audits security with **SAST** (scanning source code), and a critic reviews refactoring.",
          {
            "type": "p",
            "text": "Stage 3: quality gates"
          },
          "Agent 9 checks metrics against limits: **LCOM** (lack of cohesion; lower is better) under 0.2, and **cyclomatic complexity** (number of paths through code) under 10. Agent 10 manages the release. **Human checkpoint 2**: final review and merge of the pull request."
        ]
      },
      {
        "heading": "Agentic TDD workflow and risks",
        "items": [
          {
            "type": "p",
            "text": "Workflow (Topic 6)"
          },
          "A developer writes or reviews the tests. A group of agents (one per test, a reviewer, an integrator, and a coordinator that calls a human when stuck) loops until all tests pass. Then a pull request and human review.",
          {
            "type": "p",
            "text": "Pros"
          },
          "Eases the bottleneck of humans reviewing code.",
          "Requirements are enforced by tests.",
          "Less need for code that humans can read.",
          {
            "type": "p",
            "text": "Cons"
          },
          "Needs thorough tests up front.",
          "The LLM may **cheat**: change the tests, or special-case them, so they pass without solving the problem.",
          "**Lock-in**: code only an LLM can work with.",
          "**Token** cost (models charge per chunk of text).",
          "Guardrail: make the tests read-only for the agent, and check with mutation testing and review.",
          "Willison's red-green rule for agents: make the agent write the failing test first, see it fail, then fix, which confirms each fix."
        ]
      }
    ],
    "pitfalls": [
      "Listing three ways but not tying each to a TDD stage (red / green / refactor).",
      "Forgetting the human role and the cheating risk (AI changes tests to make them pass).",
      "Saying TDD is 'testing after coding': tests come first."
    ]
  },
  {
    "id": "test-suite-prompting",
    "title": "Prompting for a test suite (ManagePrint example)",
    "priority": 8,
    "tier": "core",
    "freq": "sample paper Q4(b)(c) + Topic 7 prompts",
    "marks": "12 + 4 marks",
    "summary": "**A strong test-generation prompt states role, task and class, language and framework, context, business rules, scenarios to cover, what to avoid (shallow tests), quality rules and output format; the changes that matter most are naming business rules and edge cases, forbidding shallow asserts, and fixing the framework.**",
    "mnemonic": "ROSES: Role, Objective, Scenario, Expected solution, Steps (plus: Avoid and Output)",
    "source": [
      "CT4111_Notes_07_Testing",
      "CT4111_Notes_02_Topic_2"
    ],
    "sections": [
      {
        "heading": "The reusable template (Topic 7)",
        "items": [
          {
            "type": "code",
            "text": "Role: You are a senior software test engineer.\nTask: Generate tests for [CLASS / FUNCTION].\nLanguage/framework: [Java + JUnit 5 + Mockito, Python + pytest ...].\nContext: [short domain description].\nBusiness rules: [list the important rules].\nMust cover: [happy path, edge cases, errors, regression].\nAvoid: [trivial assertions, implementation details, shallow tests].\nOutput format: [test names + code + brief explanation]."
          },
          "**ROSES framework:** Role (e.g. senior SDET), Objective (single measurable goal), Scenario (stack, architecture, constraints), Expected solution (exact syntax, format, schema), Steps (algorithmic workflow for the reasoning).",
          "**SDET** means software developer in test. **BVA** (boundary value analysis) means testing just below, at and just above a limit. **Mocks** are fake stand-ins for other parts of the system.",
          "Instead of 'Write tests for BookingService', say: JUnit 5 and Mockito, do not only test happy paths, avoid shallow tests like assertNotNull, focus on business rules, edge cases and failure scenarios, assertions must verify meaningful behaviour and explain why each test matters, name the specific cases (overlap detection, invalid time ranges, authorisation, payment failure, audit log).",
          "Variants: integration tests (list integration points, scenarios, quality rules: verify DB state and side effects, not only HTTP status); API tests (status codes and bodies, authn/authz failure, conflict); value tests (boundaries and invariants); a **skill file** (steps: read class, write test class, run tests, never weaken an assertion, check JaCoCo coverage at least 80%, report which rule each test verifies; constraints: Mockito for externals, no getter/setter tests, Given/When/Then Javadoc, independent tests)."
        ]
      },
      {
        "heading": "Worked example: detailed prompt for ManagePrint (12 marks)",
        "items": [
          {
            "type": "code",
            "text": "Role: You are a senior Java QA engineer experienced in JUnit 5 and Mockito.\n\nTask: Generate a high-quality unit test suite for the class ManagePrint of a 3D-printing ordering system. Return test code only for the unit under test; use the mocks described below.\n\nContext: ManagePrint lets a user (1) select a print file, (2) select a printer type, (3) select a print material type, (4) set a deadline (day and time) and (5) pay. Collaborators to mock: FileService (validates and sizes the file), PrinterCatalog (supported printers and materials), PricingService, SchedulingService (estimates print duration and queue), PaymentGateway, AuditLog, Clock. I will paste the source of ManagePrint below.\n\nBusiness rules (assumed, correct me if wrong):\n- File must exist, be .stl or .3mf, non-empty and under 100 MB.\n- Material must be compatible with the printer type (e.g. FDM supports PLA/ABS/PETG, resin printers only resin).\n- Deadline must be in the future and at least the estimated print time plus queue time from now; use the injected Clock.\n- Price is computed from material usage; payment is taken only after all selections are valid.\n- If payment fails, no print job is queued and the user is told why. A print is queued exactly once even if pay is called twice.\n- Only authenticated users may order; every order and failure is written to the audit log.\n\nMust cover:\n1. Happy path for each printer and material combination.\n2. Invalid inputs: null or missing file, wrong extension, empty file, oversized file, null printer or material, incompatible printer/material.\n3. Boundary values for the file size limit (limit-1, limit, limit+1) and for the deadline (exactly feasible, 1 minute too early, in the past), time zone and daylight-saving edge cases.\n4. Payment: success, declined card, gateway timeout, double submission (idempotency); verify no job is queued on failure.\n5. Unauthorised user; scheduler unavailable; audit log entries for success and failure.\n6. Order of operations: payment is not attempted before validation passes.\n\nAvoid: shallow tests (assertNotNull, status only, 'method called once' with no outcome check), testing getters and setters, depending on test execution order, real clocks or network, asserting private implementation details.\n\nQuality rules: Arrange-Act-Assert; one scenario per test; descriptive names such as shouldRejectDeadline_WhenEarlierThanEstimatedPrintTime; Mockito for collaborators; parameterised tests for the compatibility matrix; every assertion checks a concrete value or state change.\n\nOutput format: a single ManagePrintTest class with grouped nested classes, followed by a table listing each test name, the business rule it verifies and why it matters. List any assumptions and any rule you could not test."
          },
          "Why each part is there (add 2-4 lines like these in the exam): role sets expertise level; context and rules give the oracle (AI cannot guess intended behaviour); explicit scenarios stop happy-path-only suites; BVA and time edge cases target classic defects; 'avoid' blocks shallow tests; framework fixes syntax; output format makes review easy; asking for assumptions exposes where the model guessed.",
          "Process around the prompt: human reviews assertions, adds missing edge cases, asks AI to refine; run coverage (branch) and mutation testing; iterate."
        ]
      },
      {
        "heading": "Prompt changes with the most impact (4 marks)",
        "items": [
          {
            "type": "p",
            "text": "Naming business rules and expected outcomes"
          },
          "The most effective change. It gives the **oracle** (knowledge of the right answer); without it the AI asserts trivial things or just copies what the code does.",
          {
            "type": "p",
            "text": "Asking beyond the happy path"
          },
          "\"Do not only test happy paths\" (the normal successful case) plus a list of scenarios (payment failure, room occupied, null input) produced failure tests and an edge test for yesterday's date.",
          {
            "type": "p",
            "text": "Banning weak assertions"
          },
          "\"Avoid shallow tests such as assertNotNull\" forces meaningful checks.",
          {
            "type": "p",
            "text": "Naming framework and style"
          },
          "\"JUnit 5 and Mockito\", **AAA** (arrange, act, assert) and a naming style give correct, consistent, readable tests.",
          {
            "type": "p",
            "text": "Giving the real code"
          },
          "Attaching the source (or retrieving it, called **RAG**) beats naming the class. Asking for a reason per test makes review quick.",
          {
            "type": "p",
            "text": "What helped less"
          },
          "Longer prose, politeness, repeating the same instruction."
        ]
      }
    ],
    "pitfalls": [
      "Writing a one-line prompt: 12 marks need role, context, business rules, scenarios, avoid-list, format and a short justification.",
      "Not covering all five ManagePrint inputs (file, printer type, material, deadline, payment).",
      "Asking for tests but giving no business rules, so the oracle is missing.",
      "Forgetting boundaries (deadline now, limit-1/limit/limit+1) and failure paths (payment declined)."
    ]
  },
  {
    "id": "mutation-testing",
    "title": "Mutation testing and GenAI",
    "priority": 17,
    "tier": "likely",
    "freq": "sample paper bonus Q(a) + Topic 7",
    "marks": "6 marks",
    "summary": "**Mutation testing injects small deliberate faults (mutants) into the code and re-runs the unit tests: killed mutants show the tests detect faults, surviving mutants reveal weak tests; GenAI helps by generating realistic mutants, spotting equivalent ones and writing new tests that kill survivors.**",
    "mnemonic": "Mutate, Run, Kill or Survive",
    "source": [
      "CT4111_Notes_07_Testing"
    ],
    "sections": [
      {
        "heading": "How mutation testing fits unit testing",
        "items": [
          "Unit tests show whether code works. Coverage shows what was run. **Mutation testing asks how good the tests themselves are.** It is a **white-box** technique (it uses the source code).",
          "A **mutant** is a copy of your code with one small deliberate bug.",
          "Coverage levels: class, method, line, **branch** (each outcome of a decision), **path** (each route through). Example given: 6 branches, 8 paths.",
          {
            "type": "p",
            "text": "Process"
          },
          "(1) Change the source to make a mutant (change `i++` to `i--`, flip a comparison, remove a statement).",
          "(2) Run the unit tests.",
          "(3) If no test fails, the tests may be weak, or a new one is needed.",
          "(4) Repeat with a different change.",
          {
            "type": "p",
            "text": "Outcomes"
          },
          "**Killed**: a test fails (good).",
          "**Surviving**: all tests pass (possibly bad: behaviour nobody checks).",
          "**Equivalent**: the change does not alter behaviour, so it cannot be detected and is ignored."
        ]
      },
      {
        "heading": "Mutation ratio and worked example",
        "items": [
          {
            "type": "formula",
            "label": "Mutation ratio (the slide's name; also called mutation score)",
            "text": "Mutation Ratio = #Killed / (#Total - #Equivalent)"
          },
          {
            "type": "formula",
            "label": "Related slide formulas",
            "text": "Test Pass Rate = #Passed tests / #Total tests (slide example 25 / 26 = about 0.96). Unit-level coverage = #Units tested at least once / #Total units."
          },
          "Worked example: 20 mutants, 3 equivalent, 14 killed, so 3 survive.",
          "Score = 14 / (20 - 3) = 14 / 17 = **82.4%**.",
          "The 3 survivors point to missing tests."
        ]
      },
      {
        "heading": "Typical GenAI support",
        "items": [
          "**Generate meaningful mutants:** LLM reads the code and proposes realistic, context-aware faults (off-by-one, wrong boundary, missing null check, wrong business rule) instead of only syntactic operators.",
          "An **off-by-one** error is being out by one at a boundary. **Syntactic operators** are mechanical changes such as swapping + for -.",
          "**Triage equivalent mutants:** LLM judges whether a surviving mutant is behaviourally equivalent (expensive to do by hand).",
          "**Close the gap (typical loop):** run mutation tool, feed the surviving mutants plus the code and existing tests to the LLM, ask for new tests that kill them, re-run, repeat until score target met; human reviews assertions.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Code + tests",
                  "sub": "baseline green"
                },
                {
                  "label": "Generate mutants",
                  "sub": "tool or LLM"
                },
                {
                  "label": "Run tests",
                  "sub": "killed / survived"
                },
                {
                  "label": "LLM writes tests for survivors",
                  "sub": "human reviews"
                },
                {
                  "label": "Re-run, new score",
                  "sub": "stop at target"
                }
              ],
              "direction": "row",
              "loopBack": "survivors remain"
            },
            "caption": "GenAI-supported mutation testing loop."
          },
          "Value: checks that AI-generated tests are not shallow (AI tests can pass without proving correctness)."
        ]
      }
    ],
    "pitfalls": [
      "Describing mutation testing as testing the application; it tests the quality of the tests.",
      "Forgetting equivalent mutants (cannot be killed).",
      "Giving only the process and no GenAI role (6 marks need both parts)."
    ]
  },
  {
    "id": "test-oracle-quality",
    "title": "Test oracle problem and test quality",
    "priority": 21,
    "tier": "possible",
    "freq": "Topic 7 learning outcomes",
    "marks": "5-8 marks",
    "summary": "**The oracle problem is deciding whether an observed result is correct: AI can generate inputs and assertions but may not know the intended behaviour, so it produces shallow tests that pass without proving anything; good tests are trustworthy, maintainable, refactor-resilient and thorough.**",
    "mnemonic": "Trust, Maintain, Resist, Thorough (TMRT) and AAA",
    "source": [
      "CT4111_Notes_07_Testing"
    ],
    "sections": [
      {
        "heading": "The oracle problem and misleading tests",
        "items": [
          "**Test oracle problem**: the difficulty of deciding whether a result is correct. What should the output be?",
          "**False confidence** is dangerous.",
          {
            "type": "p",
            "text": "What AI-written tests may do"
          },
          "Check trivial things.",
          "Copy what the code currently does, so its bugs get written into the tests.",
          "Miss business rules.",
          "Pass without proving anything is correct.",
          "Weak examples: checking only the status code; only checking a method was called once; only the happy path; `assertNotNull`.",
          {
            "type": "p",
            "text": "Checking compared with testing (Bach and Bolton)"
          },
          "**Checking**: mechanically confirming known expectations. **Testing**: critical evaluation using knowledge of the field and analysis of risk. AI is good at checks; humans decide the expectations.",
          {
            "type": "p",
            "text": "Improving the oracle"
          },
          "Use domain knowledge and specifications, state expected behaviour, check **invariants** (things that must always be true) across many inputs, and review AI assertions by hand. Test quality matters more than quantity."
        ]
      },
      {
        "heading": "Human-guided vs AI-guided workflow",
        "items": [
          {
            "type": "table",
            "head": [
              "Step",
              "Human-guided (preferred)",
              "AI-guided"
            ],
            "rows": [
              [
                "1",
                "Human defines test goals",
                "Human defines test goals"
              ],
              [
                "2",
                "AI generates draft tests",
                "AI generates draft tests"
              ],
              [
                "3",
                "Human reviews assertions",
                "AI reviews assertions"
              ],
              [
                "4",
                "Human adds missing edge cases",
                "AI adds missing edge cases"
              ],
              [
                "5",
                "AI refines and expands",
                "AI refines and expands"
              ]
            ]
          },
          "Humans supply domain rules, expected outcomes, important edge cases, risk areas and invariants; AI scales it into many tests."
        ]
      },
      {
        "heading": "Four test qualities",
        "items": [
          {
            "type": "p",
            "text": "Trustworthiness"
          },
          "No **flaky** tests (ones that randomly fail, due to time zones, randomness or outside services), and no false alarms or missed bugs.",
          {
            "type": "p",
            "text": "Maintainability and readability"
          },
          "Arrange, act, assert. Descriptive names (`shouldReturnFalse_WhenPasswordIsTooShort`). One scenario per test.",
          {
            "type": "p",
            "text": "Resilience to refactoring"
          },
          "Test **behaviour** (inputs and outputs), not how it is done inside. If renaming a private helper breaks a test, the test is fragile.",
          {
            "type": "p",
            "text": "Thoroughness"
          },
          "Go beyond the happy path (null, empty, negative).",
          "**Boundary value analysis**: test just below, at and just above a limit (17, 18, 19 for an age limit of 18).",
          "Cover both outcomes of every decision (**branch coverage**, worked out from the code's tree structure, the AST), not just every line."
        ]
      },
      {
        "heading": "Test doubles (fidelity)",
        "items": [
          "A **test double** is a stand-in for a real part during a test. **Fidelity** is how close it is to the real thing.",
          {
            "type": "table",
            "head": [
              "Double",
              "Meaning",
              "Asserted against?"
            ],
            "rows": [
              [
                "Actual object",
                "Real collaborator (database, file system), not a double",
                "-"
              ],
              [
                "Fake",
                "Simplified working implementation (in-memory database)",
                "No"
              ],
              [
                "Mock",
                "Replaces collaborator; interactions are verified",
                "Yes"
              ],
              [
                "Spy",
                "Replaces collaborator and records what happens",
                "Yes"
              ],
              [
                "Stub",
                "Returns predefined responses",
                "No"
              ],
              [
                "Dummy",
                "Placeholder parameter to satisfy an interface",
                "No"
              ]
            ]
          },
          "Slide example: `BookingService.createBooking` with the repository and payment processor mocked (JUnit 5 and Mockito). Five AI-written tests:",
          "(1) Happy path: returns true and the booking is saved.",
          "(2) Invalid input: a negative price throws `IllegalArgumentException`.",
          "(3) Edge case: a date in the past throws.",
          "(4) Room occupied: returns false and payment is never taken.",
          "(5) Payment fails: returns false and the booking is never saved.",
          "Prefer high fidelity when reasonable, but do not force it."
        ]
      },
      {
        "heading": "Load, stress, MTBF and the testing standard",
        "items": [
          "**Load testing**: behaviour under typical peak use. **Stress testing**: push until it breaks.",
          "**MTBF**: mean time between failures.",
          "**ISO/IEC/IEEE 29119** is the international software testing standard. Parts: 1 concepts, 2 test processes, 3 documentation, 4 techniques, 5 keyword-driven testing."
        ]
      },
      {
        "heading": "Test levels and types reminder",
        "items": [
          {
            "type": "p",
            "text": "Levels"
          },
          "**Unit**: smallest pieces on their own, with mocks.",
          "**Integration**: the joins between modules (data formats, timing, agreements).",
          "**System**: the whole product against requirements, including non-functional ones.",
          "**Acceptance**: does it meet the customer's needs and is it ready for use?",
          {
            "type": "p",
            "text": "Types"
          },
          "**Functional** (what it does) or **non-functional** (performance, including load and stress; security; usability; reliability such as MTBF).",
          "**Static** (without running, such as SonarQube), **dynamic** (running it), **regression** (checking old features still work).",
          "**Black box** (no knowledge of the code) or **white box** (code visible: unit tests, static analysis, mutation testing).",
          "GenAI can generate unit, integration, edge-case and regression tests, mock set-ups and test data: faster, wider coverage of obvious cases, less repetition."
        ]
      }
    ],
    "pitfalls": [
      "Equating a high number of generated tests with quality.",
      "Mixing up mock and stub: mocks are asserted against, stubs are not."
    ]
  },
  {
    "id": "qa-criteria-failure-analysis",
    "title": "QA criteria and GenAI test-failure analysis",
    "priority": 27,
    "tier": "possible",
    "freq": "Topic 7 sub-topics 4 and 5",
    "marks": "5 marks",
    "summary": "**GenAI acts as a QA architect (acceptance criteria, edge cases, severity, automation level from user stories) and as a failure analyst (root cause from stack trace plus test plus production code, bug in test or code, suggested fix).**",
    "mnemonic": "QA criteria in, root cause out",
    "source": [
      "CT4111_Notes_07_Testing"
    ],
    "sections": [
      {
        "heading": "Defining quality-assurance criteria with GenAI",
        "items": [
          "Generate acceptance criteria from user stories; identify edge cases and negative scenarios; turn business requirements into scenarios both business and automation can understand; validate testability (and so implementability) of a task.",
          "**QA** (quality assurance) is making sure the product meets its standard. **Acceptance criteria** are the conditions that must hold for a feature to count as done.",
          "**GenAI as QA architect**: a tireless brainstorming partner (20 angles on what could go wrong), that finds blind spots (decision logic implied by a requirement, missing combinations) and standardises a team's **definition of done** checklist.",
          "Blueprint prompt: 'Act as a Senior QA Architect... for each criterion list the conditions and outcomes (flag undefined), scenario description, decision rules covered, severity (Critical/Major/Minor), automation feasibility (Unit/Integration/E2E).'"
        ]
      },
      {
        "heading": "Using GenAI to analyse test failures",
        "items": [
          "Instant log parsing (root cause from a 200-line stack trace); contextual correlation (failing test plus production code pinpoints the diverging line); hypothesis generation (prioritised reasons).",
          "A **stack trace** is the list of method calls leading to an error. **Contextual correlation** means reading the failing test and the code together to find the line where they disagree.",
          "Prompt: Act as a Senior Java Test Engineer; here is the stack trace, the test, the production code; explain (1) root cause, (2) bug in test or production code, (3) corrected code.",
          "Example: MembershipService used plusDays(365) for a one-year expiry; start 15 Jan 2028 includes 29 Feb 2028 (366 days) so result was 14 Jan 2029 instead of 15 Jan 2029; fix: plusYears(1) using java.time.",
          "Human still verifies the diagnosis and the fix."
        ]
      },
      {
        "heading": "From requirement to test cases (TDD example)",
        "items": [
          {
            "type": "table",
            "head": [
              "Test",
              "Scenario",
              "Expected",
              "Category"
            ],
            "rows": [
              [
                "TC-01",
                "Shorter than 8 chars ('123')",
                "false",
                "Invalid input"
              ],
              [
                "TC-02",
                "Exactly 8 chars ('Abcde123')",
                "true",
                "Edge case / business rule"
              ],
              [
                "TC-03",
                "No digits ('Password')",
                "false",
                "Business rule"
              ],
              [
                "TC-04",
                "Null password",
                "false",
                "Robustness"
              ]
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "Accepting the AI's root-cause explanation without checking whether the bug is in the test or the code."
    ]
  }
];
