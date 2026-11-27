module.exports = [
  {
    "id": "modification-types",
    "title": "Modification request types and GenAI roles",
    "priority": 9,
    "tier": "core",
    "freq": "sample paper Q5(a) + Topic 8 (repeated slide)",
    "marks": "9 marks (3 x 3)",
    "summary": "**Modification requests split into Correction (corrective, preventive) and Enhancement (adaptive, perfective, additive); pick three and give two concrete GenAI contributions each.**",
    "mnemonic": "CPAPA: Corrective, Preventive, Adaptive, Perfective, Additive",
    "source": [
      "CT4111_Notes_08_Maintenance",
      "CT4111_Notes_09_Refactoring"
    ],
    "sections": [
      {
        "heading": "Taxonomy (SWEBOK v4)",
        "items": [
          {
            "type": "diagram",
            "kind": "tree",
            "data": {
              "root": {
                "label": "Modification request",
                "children": [
                  {
                    "label": "Correction",
                    "children": [
                      {
                        "label": "Corrective"
                      },
                      {
                        "label": "Preventive"
                      }
                    ]
                  },
                  {
                    "label": "Enhancement",
                    "children": [
                      {
                        "label": "Adaptive"
                      },
                      {
                        "label": "Perfective"
                      },
                      {
                        "label": "Additive"
                      }
                    ]
                  }
                ]
              }
            },
            "caption": "The course focuses on corrective and preventive maintenance."
          },
          {
            "type": "table",
            "head": [
              "Type",
              "Meaning",
              "Two ways GenAI contributes"
            ],
            "rows": [
              [
                "Corrective",
                "Fix runtime errors, security vulnerabilities, emergency patches",
                "1) Analyse error logs and stack traces to pinpoint anomalies and root causes faster. 2) Surface similar past bugs from codebase history to speed resolution; generate a candidate patch and regression test."
              ],
              [
                "Preventive",
                "Restructure and reduce technical debt to prevent future problems",
                "1) Scan dependencies for outdated or vulnerable libraries. 2) Prioritise what to refactor by risk level; suggest or apply refactorings (extract method, de-duplicate) with tests as safety net."
              ],
              [
                "Adaptive",
                "Adapt to a changing operating environment (OS, library, platform, regulation)",
                "1) Monitor for compatibility issues before they cause problems (deprecations, API changes). 2) Scan the codebase and find all affected areas when a dependency changes; perform migration edits (e.g. library migration)."
              ],
              [
                "Perfective",
                "Improve performance, maintainability or user experience",
                "1) Suggest code optimisations (query rewrites, indexing strategies). 2) Generate code for common patterns and boilerplate; improve readability and documentation."
              ],
              [
                "Additive",
                "Add major new functionality after delivery",
                "1) Identify and prioritise candidate features from requests, usage data and environment. 2) Assess impact and assist with the necessary adaptations (generate code, tests, docs for the new feature)."
              ]
            ]
          }
        ]
      },
      {
        "heading": "Answer recipe",
        "items": [
          "Choose three (corrective, preventive, adaptive are easiest). For each: one-line definition, then two numbered GenAI contributions with a concrete example, then (if time) the human check.",
          "Add a safeguard sentence: tests and version control validate AI changes; human reviews impact.",
          "**SWEBOK** is the standard guide to software engineering knowledge. A **patch** is a small fix; a **regression test** stops a fixed bug coming back; **deprecation** means a feature is marked for removal."
        ]
      }
    ],
    "pitfalls": [
      "Mixing up perfective (improve existing qualities) and additive (add new functionality).",
      "Preventive is not bug fixing: it is restructuring to prevent future problems (reduce tech debt).",
      "Giving only one GenAI contribution per type: the question asks for two different ones."
    ]
  },
  {
    "id": "fault-localisation-repair",
    "title": "Fault localisation and repair with GenAI",
    "priority": 10,
    "tier": "core",
    "freq": "sample paper Q5(b) + Topic 8 (many slides)",
    "marks": "10 marks",
    "summary": "**Run a human-guided loop: humans report and triage the bug and approve the fix; GenAI structures the report, understands the repo, localises the fault, explains it, generates candidate patches, and verifies them against tests and linters, repeating until validated.**",
    "mnemonic": "Understand, Localise, Patch, Validate, Human approves",
    "source": [
      "CT4111_Notes_08_Maintenance"
    ],
    "sections": [
      {
        "heading": "Process diagram with roles",
        "items": [
          "**Fault localisation** is finding where in the code a bug is. **Repair** is fixing it.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Fault localisation and repair loop (human vs GenAI)",
              "directed": true,
              "r": 24,
              "height": 440,
              "nodes": [
                {
                  "id": "h1",
                  "label": "Human",
                  "sub": "report, reproduce, triage",
                  "x": 10,
                  "y": 10,
                  "color": 0
                },
                {
                  "id": "g1",
                  "label": "GenAI",
                  "sub": "structure bug report",
                  "x": 38,
                  "y": 10,
                  "color": 1
                },
                {
                  "id": "g2",
                  "label": "GenAI agent",
                  "sub": "repo understanding + plan",
                  "x": 66,
                  "y": 10,
                  "color": 1
                },
                {
                  "id": "g3",
                  "label": "GenAI agent",
                  "sub": "fault localisation",
                  "x": 90,
                  "y": 40,
                  "color": 1
                },
                {
                  "id": "g4",
                  "label": "GenAI",
                  "sub": "patch generation",
                  "x": 66,
                  "y": 70,
                  "color": 1
                },
                {
                  "id": "t1",
                  "label": "Tools",
                  "sub": "tests, linters, build",
                  "x": 38,
                  "y": 70,
                  "color": 2
                },
                {
                  "id": "g5",
                  "label": "GenAI reviewer",
                  "sub": "verify vs intent",
                  "x": 10,
                  "y": 70,
                  "color": 1
                },
                {
                  "id": "h2",
                  "label": "Human",
                  "sub": "review, approve, merge",
                  "x": 10,
                  "y": 40,
                  "color": 0
                }
              ],
              "edges": [
                {
                  "from": "h1",
                  "to": "g1",
                  "label": "unstructured report"
                },
                {
                  "from": "g1",
                  "to": "g2",
                  "label": "description, steps, expected, env"
                },
                {
                  "from": "g2",
                  "to": "g3",
                  "label": "resolution plan"
                },
                {
                  "from": "g3",
                  "to": "g4",
                  "label": "buggy region"
                },
                {
                  "from": "g4",
                  "to": "t1",
                  "label": "candidate patch"
                },
                {
                  "from": "t1",
                  "to": "g4",
                  "label": "fail: errors fed back",
                  "curve": 40
                },
                {
                  "from": "t1",
                  "to": "g5",
                  "label": "pass"
                },
                {
                  "from": "g5",
                  "to": "h2",
                  "label": "patch + explanation"
                },
                {
                  "from": "h2",
                  "to": "h1",
                  "label": "reject: refine",
                  "curve": 40
                }
              ]
            },
            "caption": "Blue/purple nodes are GenAI, green is tooling; humans bracket the loop."
          },
          {
            "type": "p",
            "text": "The human software engineer"
          },
          "Reports and reproduces the bug, supplies failing tests and the intent (commit message, expected behaviour), sets priorities, decides which AI output to trust, reviews and approves the **patch** (the fix), owns the outcome, and checks nothing else broke.",
          {
            "type": "p",
            "text": "What GenAI does"
          },
          "(1) Tidies and summarises the bug report.",
          "(2) Understands the repository (folder tree, method signatures, summaries) and writes a plan with a guess at the **root cause**.",
          "(3) Locates the fault: searches files, classes and functions, follows dependencies, marks the buggy part.",
          "(4) Explains the code line by line (like explaining to a rubber duck) and finds similar past fixes.",
          "(5) Writes a patch.",
          "(6) Checks it fixes the goal and matches what the programmer intended.",
          {
            "type": "p",
            "text": "Ordinary tools (not AI)"
          },
          "Compiling, running tests, **linters** (style and mistake checkers) and **static analysis** (checking code without running it) give feedback. Repeat up to a limit, then pass to a human."
        ]
      },
      {
        "heading": "Research approaches: SWE-GPT and PReMM (name at least two)",
        "items": [
          {
            "type": "p",
            "text": "SWE-GPT (process-centred)"
          },
          "Three agents: one understands the repository, one localises the fault, one writes code. Their tools include viewing the structure, searching classes and functions, and git apply and diff.",
          "Stage 1: understand the repository and write a plan with root-cause analysis. Stage 2: search for the fault and reflect. Stage 3: generate a patch and check it with lint tools and error messages, repeating up to a limit.",
          "Example: issue #4253 to pull request #4259 in a project called GraphScope.",
          {
            "type": "p",
            "text": "PReMM"
          },
          "For bugs spread over **several methods**: split the problem up. The prompt includes the failing test and error, similar code from other files, the chain of calls from tests to faulty methods, and key words.",
          {
            "type": "p",
            "text": "The fact selection problem"
          },
          "Which information matters most for repair? Mostly the error message and the issue description, but it depends on the case."
        ]
      },
      {
        "heading": "Research approaches: ContrastRepair, RepairAgent, PATCH",
        "items": [
          {
            "type": "p",
            "text": "ContrastRepair"
          },
          "Repair by conversation, giving **contrasting pairs**: a failing test and a similar passing one, to focus the model.",
          {
            "type": "p",
            "text": "RepairAgent"
          },
          "An autonomous agent that moves between three states:",
          "**Understand the bug** (run tests, extract tests, run fault localisation).",
          "**Collect information** (search the code, find similar calls, read lines, extract a method).",
          "**Try to fix it** (write the fix, read lines).",
          "It can state a hypothesis, discard it, collect more information, or declare the goal reached.",
          {
            "type": "p",
            "text": "PATCH"
          },
          "Agents imitating a developer team, in four stages: bug reporting (tester), diagnosis and patch writing (developer), verification (reviewer), looping between the last two.",
          "Extra context: commit messages, dependencies, the buggy method, similar code.",
          "Roles include bug reporter, code explainer, pattern summariser (recalls similar fixes), patch writer and verifier. Collaboration beat a single prompt.",
          {
            "type": "p",
            "text": "Design issues"
          },
          "A pipeline of agents: design-issue analysis (static analysis), planning, program analysis (how many things call or are called by each part: **fan-in/out**, and **coupling**, how tied together parts are), prompt building, and ranking of likely locations."
        ]
      },
      {
        "heading": "Structured bug reports matter",
        "items": [
          "Unstructured reports mix up the description, steps and environment.",
          "GenAI (a method called BRMDS) pulls out separate fields: environment, expected behaviour, actual behaviour, bug category and suggested solution, each with its own instruction (such as \"in no more than 15 words\").",
          "Structured reports make finding the bug faster and later AI steps more accurate."
        ]
      },
      {
        "heading": "Cautions about AI repair",
        "items": [
          "The model may **hallucinate** (invent) a fix or break other behaviour.",
          "A patch that passes weak tests may still be wrong.",
          "Keep tests as the judge of correctness (the oracle) and have a human review.",
          "Do not touch highly **coupled** (interconnected) code without extra tests."
        ]
      },
      {
        "heading": "Cautions",
        "items": [
          "Models may hallucinate fixes or break other behaviour; patches that pass weak tests may not be correct; keep tests as the oracle and human review; avoid touching highly coupled code without extra tests."
        ]
      }
    ],
    "pitfalls": [
      "Drawing the loop without labelling who is human and who is GenAI: the question asks you to identify both.",
      "Leaving out validation feedback (tests/lint) and the repeat-until-valid loop.",
      "Omitting localisation (the question is localisation AND repair)."
    ]
  },
  {
    "id": "library-migration",
    "title": "Library migration at scale with GenAI",
    "priority": 11,
    "tier": "likely",
    "freq": "sample paper Q5(c) + Topic 9",
    "marks": "6 marks",
    "summary": "**Large codebases age unevenly; migrations (e.g. JUnit 3 to 4, Joda-Time to java.time) are slow manual work, so split them into discrete steps: find locations, transform each file with a detailed role-and-rules prompt, validate with traditional tools and tests, and release in paced batches for human review.**",
    "mnemonic": "Find, Transform, Validate, Review, Pace",
    "source": [
      "CT4111_Notes_09_Refactoring"
    ],
    "sections": [
      {
        "heading": "Why and what",
        "items": [
          "A **library** is code written by others that you reuse. **Library migration** means moving your code from one library (or version) to another.",
          "Libraries age: parts of a system fall behind with old versions, outdated interfaces and **deprecated** (due for removal) frameworks.",
          "Google's **one-version policy**: every dependency is kept up to date across the whole code base, to limit drifting apart.",
          "Updating cannot be fully automated, takes much manual work and often months or years, by which time it must be done again.",
          "GenAI makes rapid large-scale updates practical (Google internal case study, Nikolov 2025)."
        ]
      },
      {
        "heading": "Example answer: Joda-Time to java.time in a 5000-file Java codebase",
        "items": [
          "**Joda-Time** is an old date and time library; **java.time** is the one now built into Java.",
          "**Task**: replace every use of `org.joda.time` classes (Instant, Duration, DateTime) with java.time equivalents, fix imports and keep behaviour identical, across thousands of files.",
          {
            "type": "p",
            "text": "Pipeline"
          },
          "(1) **Discovery**: code search or static analysis lists the affected files and places.",
          "(2) A **deterministic** tool (same input always gives the same output) does the trivial rewrites.",
          "(3) The LLM transforms each file using the prompt below.",
          "(4) **Validate**: compile, run the file's tests and linters, and check the changes for anything unrelated (stray comments, reformatting).",
          "(5) Failed files are retried or given to a human.",
          "(6) Small batches become pull requests, paced so reviewers are not swamped.",
          "(7) Improve the prompt from the failures.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Find affected files",
                  "sub": "search / static analysis"
                },
                {
                  "label": "LLM transforms file",
                  "sub": "detailed migration prompt"
                },
                {
                  "label": "Validate",
                  "sub": "build, tests, lint, diff checks"
                },
                {
                  "label": "Human review",
                  "sub": "small paced PRs"
                }
              ],
              "direction": "row",
              "loopBack": "failures: fix prompt, retry"
            },
            "caption": "Library migration pipeline."
          }
        ]
      },
      {
        "heading": "The migration prompt",
        "items": [
          {
            "type": "code",
            "text": "You are a senior Java engineer, expert in Joda-Time and java.time. Your task is to remove all usage of org.joda.time from the provided files and replace it with java.time equivalents, preserving behaviour exactly.\n\nRules:\n1. Replace joda.time.Instant with java.time.Instant. new Instant(Long.MAX_VALUE) becomes Instant.MAX; new Instant(0) becomes Instant.EPOCH; the millisecond constructor becomes Instant.ofEpochMilli(); getMillis() becomes toEpochMilli().\n2. Replace joda.time.Duration with java.time.Duration.\n3. Do not call Instant.now(); use our TimeSource.system().now().\n4. Remove all org.joda.time imports and add the needed java.time imports.\n5. Do NOT change anything unrelated: no renaming, no reformatting, no comment edits, no new logging.\n6. If a construct has no safe equivalent, leave it unchanged and add a TODO(joda) comment.\n\nOutput: only the full migrated file, followed by a list of any TODO(joda) items.\n\nFiles: [paste files]"
          },
          "It works because it gives the AI a role, explicit mapping rules, limits against stray edits and a fixed output format.",
          "Prompts are kept in version control like code. A human writes the rules after migrating a sample by hand."
        ]
      },
      {
        "heading": "Lessons (Google)",
        "items": [
          "Split migrations into discrete specialised steps (more reliable, easier to debug). Prefer traditional validation to catch model quirks (stray comments, unwanted edits); traditional steps are cheaper when touching thousands of files.",
          "Pace migrations so review teams are not overwhelmed; build tooling for peripheral tasks (review triage, coordination).",
          "**Triage** means sorting by urgency. **JUnit** is Java's testing library; version 4 uses annotations (labels starting with @) instead of inheriting from `TestCase`.",
          "Second example prompt from the lecture: JUnit 3 to JUnit 4: remove junit.framework imports, add import static org.junit.Assert.*, drop the TestCase base class, replace with annotations."
        ]
      }
    ],
    "pitfalls": [
      "Giving only 'ask ChatGPT to migrate': the answer needs the task details, pipeline with validation, and an actual prompt.",
      "No validation and no human review step for the migrated code.",
      "Vague prompt: mapping rules and 'do not change anything else' are the key."
    ]
  },
  {
    "id": "static-analysis-agents",
    "title": "Agentic classification and repair of static-analysis warnings",
    "priority": 12,
    "tier": "core",
    "freq": "sample paper Q6(a) + bonus Q(b) + Topic 9",
    "marks": "9 + 5 marks",
    "summary": "**A CodeCureAgent-style pipeline uses agents to (1) classify each warning as true or false positive using code-reading tools, (2) plan and generate a minimal fix, (3) validate with the analyser, compiler and tests, (4) rank or review the patch, and (5) hand it to a human; GenAI is needed because rule-based tools give many false positives, no context and no fixes.**",
    "mnemonic": "Warn, Classify, Plan, Fix, Validate, Rank, Review",
    "source": [
      "CT4111_Notes_09_Refactoring",
      "CT4111_Notes_08_Maintenance"
    ],
    "sections": [
      {
        "heading": "Agentic approach and roles (diagram)",
        "items": [
          "**Static analysis** tools check code without running it and raise **warnings**. A **true positive** (TP) is a real problem; a **false positive** (FP) is a false alarm.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Agents for static-analysis warning classification and repair",
              "directed": true,
              "r": 24,
              "height": 480,
              "nodes": [
                {
                  "id": "sa",
                  "label": "Static analyser",
                  "sub": "SonarQube / Pylint warnings",
                  "x": 8,
                  "y": 10,
                  "color": 2
                },
                {
                  "id": "cl",
                  "label": "Classifier agent",
                  "sub": "true or false positive?",
                  "x": 38,
                  "y": 10,
                  "color": 1
                },
                {
                  "id": "tl",
                  "label": "Tools",
                  "sub": "read code/docs, find refs, search",
                  "x": 38,
                  "y": 42,
                  "color": 2
                },
                {
                  "id": "fp",
                  "label": "False positive",
                  "sub": "suppress with justification",
                  "x": 70,
                  "y": 10,
                  "color": 3
                },
                {
                  "id": "pl",
                  "label": "Planner agent",
                  "sub": "fix strategy, minimal change",
                  "x": 70,
                  "y": 42,
                  "color": 1
                },
                {
                  "id": "fx",
                  "label": "Fixer agent",
                  "sub": "generate patch",
                  "x": 70,
                  "y": 74,
                  "color": 1
                },
                {
                  "id": "va",
                  "label": "Validation",
                  "sub": "compile, tests, re-run analyser",
                  "x": 38,
                  "y": 74,
                  "color": 2
                },
                {
                  "id": "rk",
                  "label": "Ranker / reviewer agent",
                  "sub": "score patches 0-3",
                  "x": 10,
                  "y": 60,
                  "color": 1
                },
                {
                  "id": "hu",
                  "label": "Human",
                  "sub": "approve PR or suppression",
                  "x": 10,
                  "y": 88,
                  "color": 0
                }
              ],
              "edges": [
                {
                  "from": "sa",
                  "to": "cl",
                  "label": "warning"
                },
                {
                  "from": "cl",
                  "to": "tl",
                  "label": "investigate"
                },
                {
                  "from": "tl",
                  "to": "cl",
                  "label": "evidence",
                  "curve": 40
                },
                {
                  "from": "cl",
                  "to": "fp",
                  "label": "FP"
                },
                {
                  "from": "cl",
                  "to": "pl",
                  "label": "TP"
                },
                {
                  "from": "pl",
                  "to": "fx",
                  "label": "plan"
                },
                {
                  "from": "fx",
                  "to": "va",
                  "label": "patch"
                },
                {
                  "from": "va",
                  "to": "fx",
                  "label": "fail: feedback",
                  "curve": 40
                },
                {
                  "from": "va",
                  "to": "rk",
                  "label": "pass"
                },
                {
                  "from": "rk",
                  "to": "hu",
                  "label": "best patch"
                },
                {
                  "from": "fp",
                  "to": "hu",
                  "label": "confirm",
                  "curve": 35
                }
              ]
            },
            "caption": "Each agent keeps a history of previous actions and outcomes as memory."
          },
          {
            "type": "p",
            "text": "Lecture structure (CodeCureAgent, Joos 2026)"
          },
          "(1) Run static analysis on the project.",
          "(2) A classification agent (an LLM with tools) decides TP or FP.",
          "(3) A repair agent proposes a fix.",
          "(4) A change approver runs the build, the analysis and the tests. Rejected goes back to repair; approved is a plausible fix.",
          "Tools available: read docs and code, find references and definitions, search patterns, propose a fix or **suppression** (silencing the warning with a reason), plan, classify, complete.",
          "The separate planner, fixer and ranker boxes in the diagram combine CodeCureAgent with another system, CORE."
        ]
      },
      {
        "heading": "The roles, and the CORE method",
        "items": [
          {
            "type": "p",
            "text": "Roles"
          },
          "**Classifier**: TP or FP, using tools. Its main risks are making things up and shallow context.",
          "**Planner and fixer**: propose the smallest fix, or a justified suppression, one warning at a time and without creating new ones.",
          "**Validation**: compile, test and re-run the analyser to confirm the warning has gone and none are new. Failures loop back with error summaries, a limited number of times.",
          "**Ranker or reviewer**: a second LLM scores patches 0 to 3 (0 = strong reject for unrelated changes, 3 = strong accept: only edits that fix the warning with least impact). Deleting comments is allowed; adding print statements or renaming variables is not.",
          "**Human**: gives final approval of the pull request or suppression, supplies project conventions and sets policy.",
          {
            "type": "p",
            "text": "CORE (Wadhwa 2024), 5 steps"
          },
          "(1) Set up static tools in the build pipeline. (2) Process flagged files and the documentation. (3) A **proposer** LLM writes candidate fixes. (4) Discard those still flagged. (5) A **ranker** LLM scores the rest (strong reject, weak reject, weak accept, strong accept) for the developers."
        ]
      },
      {
        "heading": "Prompt components for an agent (CodeCureAgent)",
        "items": [
          "**Role and objectives**: for example, decide TP or FP.",
          "**Constraints**: do not ask the user for help, create no new warnings, one warning at a time.",
          "**Available tools** and how to call them.",
          "**Input warning**: such as \"class variable fields should not have public accessibility\".",
          "**Agent history**: previous actions and results (its memory, which stops repetition).",
          "**Response format**: JSON (structured text a program can read)."
        ]
      },
      {
        "heading": "Related approaches and failure modes",
        "items": [
          "A **code smell** is a warning sign of poor design.",
          "**iSMELL**: one LLM chooses which specialist tools to run for a smell; their results, the smell's definition and refactoring examples go to the LLM, which then refactors.",
          "**CORE**: proposes fixes, then a reviewer LLM ranks them, with static analysis filtering.",
          {
            "type": "p",
            "text": "Why static analysis alone struggles"
          },
          "False positives and low-priority warnings.",
          "Fixing needs information from elsewhere in the code, and may affect many files.",
          "Fixes can introduce new problems.",
          "Different tools disagree.",
          {
            "type": "p",
            "text": "Failure modes of the agents"
          },
          "Wrong classification (inventing, or ignoring context).",
          "Too little context (poor descriptions of the warning).",
          "Unusual cases and clashing project conventions.",
          "Bad fixes: incorrect changes, fixing several warnings at once, or being unable to create, rename or delete files."
        ]
      },
      {
        "heading": "Is GenAI needed for static analysis? (bonus part, 5 marks)",
        "items": [
          "**Yes, as a complement, not a replacement.**",
          {
            "type": "p",
            "text": "Traditional tools (SonarQube, ESLint, Pylint, PMD)"
          },
          "They are deterministic, fast and cheap.",
          "But they follow fixed rules with many false positives, see no whole-project context, cannot judge soft rules or intent, disagree with each other, and mostly cannot fix problems.",
          {
            "type": "p",
            "text": "What GenAI adds"
          },
          "Sorting warnings by importance, judging true or false using context, plain-language explanations, recognising the same idea written different ways (smells, near-copies), enforcing project guidelines, and automatic repair.",
          {
            "type": "p",
            "text": "Limits"
          },
          "Not deterministic, makes things up, costs money, limited context, may miss real bugs.",
          "So use a **hybrid**: traditional tools detect and verify; GenAI interprets, ranks and repairs; a human approves. Traditional checking is also cheaper at scale."
        ]
      }
    ],
    "pitfalls": [
      "Diagram with one box 'AI fixes warnings': the question wants different agents with distinct roles (classify, plan, fix, validate, rank) and a human.",
      "Forgetting classification (false positives): the pipeline is classify THEN repair.",
      "Answering 'no need' for GenAI without acknowledging false positives and missing repair."
    ]
  },
  {
    "id": "code-smells-refactoring",
    "title": "Code smells, design issues and refactoring with GenAI",
    "priority": 23,
    "tier": "possible",
    "freq": "Topic 9 (large) + Topic 8",
    "marks": "5-10 marks",
    "summary": "**Refactoring improves internal structure without changing behaviour; GenAI can detect smells, plan and implement refactorings (best in multi-agent loops with compile and test checks), but must be guided and validated because it changes semantics, deletes code or hallucinates.**",
    "mnemonic": "As-is, To-be, Test coverage, Refactor with tests (4-step workflow)",
    "source": [
      "CT4111_Notes_09_Refactoring",
      "CT4111_Notes_08_Maintenance"
    ],
    "sections": [
      {
        "heading": "Smells and clones",
        "items": [
          "A **code smell** (Fowler 1999) is a sign of low-quality code that should be **refactored** (restructured without changing behaviour). Causes: tight schedules, carelessness, shortcuts. It makes code harder to read and maintain.",
          "**Long method**: too long (many comments suggest splitting it).",
          "**Shotgun surgery**: one change means editing many classes.",
          "**Feature envy**: a method uses another class's data more than its own.",
          "**God class**: too many responsibilities.",
          "**Refused bequest**: a subclass ignores what it inherits.",
          "A **clone** is duplicated code:",
          {
            "type": "table",
            "head": [
              "Clone type",
              "Meaning"
            ],
            "rows": [
              [
                "Type 1",
                "Exact copy except whitespace and comments"
              ],
              [
                "Type 2",
                "Same structure, renamed identifiers"
              ],
              [
                "Type 3",
                "Similar with statements added, removed or changed"
              ],
              [
                "Type 4",
                "Different code, same functionality (loop vs stream)"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Test smells"
          },
          "**Eager test** (calls many things at once), duplicate assert, **assertion roulette** (several unexplained assertions, so you cannot tell which failed), **magic numbers** (unexplained values). In manual tests: ambiguous or conditional tests, steps or checks in the wrong place, actions never verified.",
          "Finding smells by hand is subjective, and tools (PMD, JDeodorant, DesigniteJava) disagree. GenAI handles the same idea expressed differently but has limits on input and context, so combine it with tools."
        ]
      },
      {
        "heading": "GenAI for smell detection",
        "items": [
          "**Direct detection**: give the model a role, define the smell (a god class: many responsibilities, poor cohesion), supply code measurements, and demand a strict **JSON** (structured) answer of True or False.",
          "**iSMELL**: choose suitable tools, run them, then prompt the LLM with their results, the definitions and examples.",
          "Filter and rank proposed fixes (the **CORE** method).",
          "Refine repeatedly using agents."
        ]
      },
      {
        "heading": "Refactoring and workflow",
        "items": [
          "**Refactoring**: improving the inside of code without changing what it does.",
          {
            "type": "p",
            "text": "Two levels"
          },
          "**Code level**: pull out or fold in a method or variable, swap an algorithm, rename.",
          "**Architecture level**: split a single large app (**monolith**) into services, pull out authentication.",
          "Rule of thumb: \"three strikes and you refactor\".",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "1 As-is structure",
                  "sub": "what to improve and why"
                },
                {
                  "label": "2 To-be structure",
                  "sub": "refactoring strategies"
                },
                {
                  "label": "3 Test coverage",
                  "sub": "check and fill gaps"
                },
                {
                  "label": "4 Implement",
                  "sub": "small steps, tests as safety net"
                }
              ],
              "direction": "row"
            },
            "caption": "General refactoring workflow."
          },
          {
            "type": "p",
            "text": "Prompting"
          },
          "A vague prompt gives variable results. Naming the type of refactoring and the target method works better (Liu et al.).",
          {
            "type": "p",
            "text": "RefAgent (several agents)"
          },
          "A tool gathers context (what depends on what, quality measures). A **planner** writes a plan (refactor or not, and how, per class and method). A **generator** writes the code. A **compiler** agent asks for fixes if it does not compile. A **tester** writes and runs tests; if they still fail after 20 tries, keep the original code.",
          "Refactoring tests: prompts that make the model reason in steps (understand intent, recognise smells, apply rules, rewrite), plus rules (turn duplicate asserts into one parameterised test; add messages to asserts), beat simple prompts.",
          "Success is more than still working: maintainability and readability are hard to measure."
        ]
      },
      {
        "heading": "Failure modes and mitigation",
        "items": [
          "**What goes wrong**: behaviour changes, unnecessary changes, deleted code, wrong or inconsistent renaming, naming and scope clashes, wrong **casts** (type conversions), unfinished refactoring, invented functions, syntax errors. Traditional refactoring tools also fail on unusual cases.",
          "**Reduce it**: structured prompts with step-by-step reasoning, a few examples, try different models, testing strategies, compile checks, human review. Keep tests as the safety net, and check the tests are good.",
          "**Prompt debt**: fragile prompts that depend on one model and are hard to maintain. Prevent it by versioning and documenting prompts, testing them, and requiring strict output formats."
        ]
      }
    ],
    "pitfalls": [
      "Saying AI refactoring is safe without tests: it can alter behaviour silently."
    ]
  },
  {
    "id": "maintenance-debt-triage",
    "title": "Maintenance, technical debt and triage",
    "priority": 28,
    "tier": "possible",
    "freq": "Topic 8 (first half)",
    "marks": "5-8 marks",
    "summary": "**Maintenance is the dominant lifecycle cost (60-80%); AI-generated code can accelerate duplication and technical debt, so AI must also be used to reduce maintenance; structured change management and bug reports make AI triage effective.**",
    "mnemonic": "Maintenance eats 60-80%; debt compounds; structure helps AI",
    "source": [
      "CT4111_Notes_08_Maintenance"
    ],
    "sections": [
      {
        "heading": "Definitions",
        "items": [
          "**Software maintenance** (ISO/IEC/IEEE 14764): all activities needed to support a software system. **Sustainment**: keeping the system or service running.",
          "**Maintainability** (ISO/IEC 25010): how effectively and efficiently the intended maintainers can modify a product.",
          {
            "type": "p",
            "text": "Its characteristics"
          },
          "**Analysability** (easy to understand and diagnose), **changeability**, **stability** (changes cause few surprises), **modularity**, **reusability**, **testability**.",
          "Maintenance is the main cost (60-80% of total).",
          "**Lehman's laws**: continuing change (a system must adapt or become less satisfactory) and increasing complexity (unless work is done to reduce it)."
        ]
      },
      {
        "heading": "Emerging maintenance crisis and economics",
        "items": [
          "Uncontrolled AI-accelerated growth brings duplication and inconsistency, defects that pile up, and shorter-lived software.",
          "**GitClear study** of 211 million lines (2020-2024): duplication and **churn** (code rewritten soon after) rose, and **reuse** (moving code into shared modules) fell sharply. These problems rarely fail immediately and are easy to miss in review.",
          "**Economics** (James Shore): every month's output adds maintenance burden. If AI output quality is not high, the productivity gain soon disappears and leaves a permanent maintenance penalty. So using AI to help with maintenance is essential."
        ]
      },
      {
        "heading": "Technical debt",
        "items": [
          "**Technical debt** (Cunningham): not-quite-right code that causes extra work for the next developer. Quick now, costlier later. Carry only a little and pay it off quickly.",
          "Kinds: code, design, documentation, test.",
          {
            "type": "p",
            "text": "AI forms of debt"
          },
          "**Governance** debt (over-reliance), **prompt** debt (unclear or undocumented prompts), **model** debt (behaviour differing across versions and providers), **fast-integration** debt (rapid merging without checking).",
          "**Technical deflation** (Shapiro): cleaning code keeps getting cheaper, so debt may even be a sensible investment (\"borrow expensive human hours, repay with cheap AI hours\"), but the friction still builds up."
        ]
      },
      {
        "heading": "Triage and planning",
        "items": [
          "**Triage** means sorting problems by urgency.",
          "Manage changes systematically: record needs, whether bugs can be reproduced, their type and the decisions, in an **issue tracker** and version control (**VCS**). Write down unspoken knowledge so AI can use it. The overhead can tempt people to skip steps.",
          {
            "type": "p",
            "text": "How GenAI helps"
          },
          "Makes records more explicit, structured and consistent.",
          "Checks that documentation, tests and **traceability links** (which requirement connects to which code) agree.",
          "Gives a first priority order, which humans confirm.",
          "Answers questions by meaning, to find where a function, data flow or error lives.",
          "Turns unstructured bug reports into description, steps to reproduce, expected behaviour and environment (**BRMDS**).",
          {
            "type": "p",
            "text": "Challenges and responses"
          },
          "Growing code, tight coupling, inconsistent names, old code without documentation or tests, duplication, limited long-range planning, and new libraries the model has never seen. Respond with structured prompts, examples, other models and tests.",
          "Use **static analysis** and measures (SonarQube, ESLint, Pylint; product and process **metrics**) to guide the AI, such as not touching highly coupled code without more tests. New AI measures: context limits, tokens, number of attempts, energy."
        ]
      }
    ],
    "pitfalls": [
      "Quoting numbers without source: 60-80% (maintenance share), 211M lines (GitClear)."
    ]
  },
  {
    "id": "reverse-engineering-recovery",
    "title": "Reverse engineering, re-engineering and architecture recovery",
    "priority": 33,
    "tier": "possible",
    "freq": "Topic 9 (first half)",
    "marks": "4-6 marks",
    "summary": "**Reverse engineering recovers design, architecture and requirements from code; re-engineering restructures software into a new form (refactor, migrate, retire); GenAI helps summarise and classify but works best combined with traditional tools and indicators.**",
    "mnemonic": "Recover, Restructure, Migrate, Retire",
    "source": [
      "CT4111_Notes_09_Refactoring"
    ],
    "sections": [
      {
        "heading": "Definitions",
        "items": [
          "**Reverse engineering**: examining an existing system to identify its parts and how they relate, to recover documentation and design.",
          "You might recover interfaces, architecture, technologies, business rules, requirements, or file and network formats; draw higher-level diagrams; or prepare for a migration. It needs knowledge of the field.",
          "**Re-engineering**: restructuring it into a new form: refactoring, renovation, rewriting.",
          "**Migration**: moving it to a different environment (operating system or database).",
          "**Retirement**: an organised end of life.",
          "Success is more than still working: maintainability, readability and extensibility depend on context and are hard to measure."
        ]
      },
      {
        "heading": "Architecture recovery",
        "items": [
          "**Architecture recovery** means rebuilding the system's real structure from what exists (mainly code).",
          "It is slow and error-prone for large systems and needs judgement to get from details to the big picture. Automation is limited: it sees words rather than context or patterns, and misses hidden dependencies.",
          "Example: **SemArc** groups Bash script files into modules and components.",
          "**GenAI strengths**: summarising, telling general concepts apart from design patterns, managing faults.",
          "**Challenges**: ambiguous names (\"model\" and \"view\"), different ways of implementing the same thing, frameworks and libraries.",
          {
            "type": "p",
            "text": "Indicators workflow"
          },
          "Define the patterns and signs to look for, decide how to search, run traditional tools, then let the LLM interpret the results (combine GenAI with non-GenAI).",
          "**Deductive recovery** asks the model to reason step by step from those signs, then the result is drawn as layered views."
        ]
      }
    ],
    "pitfalls": [
      "Confusing reverse engineering (understanding) with re-engineering (changing)."
    ]
  }
];
