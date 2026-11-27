module.exports = [
  {
    "id": "verifiable-tasks",
    "title": "Verifiable tasks and why coding improved so fast",
    "priority": 19,
    "tier": "likely",
    "freq": "sample paper bonus Q(d) + Topics 1, 11",
    "marks": "6 marks",
    "summary": "**A verifiable task has an automatic, objective check of correctness (compile, tests, proof checker), giving a cheap reward signal for reinforcement learning and self-play, so models improve rapidly at it; coding is verifiable (to the strength of the tests), while requirements and design judgement are not.**",
    "mnemonic": "Verifiable = can be machine-checked, so can be trained at scale",
    "source": [
      "CT4111_Notes_01a_Overview",
      "CT4111_Notes_11_Emerging_Topics",
      "CT4111_Notes_11d_Article_Dot_and_Swarm"
    ],
    "sections": [
      {
        "heading": "What it means",
        "items": [
          "A task is **verifiable** if a solution can be checked automatically, cheaply and objectively, without human judgement: code compiles and passes tests, or a maths proof is checked by a **formal prover** (a program that checks proofs; the Navier-Stokes proof came with a machine-checkable version in the language Lean).",
          {
            "type": "p",
            "text": "Why it drove progress"
          },
          "Models get further **reinforcement learning** (learning from rewards) using answers that can be proven right, in coding and maths, including playing against themselves.",
          "Generate many attempts, check them, reward the correct ones: unlimited training signal with no human labelling.",
          "The same check lets agents loop while working (write, test, fix).",
          {
            "type": "p",
            "text": "Cautions"
          },
          "Checking is only as good as the tests: weak tests let wrong code pass.",
          "The model may **game** the check (change the tests, or special-case them).",
          "Passing tests is not the same as good design, security or maintainability."
        ]
      },
      {
        "heading": "Judging other SE tasks (pick two and justify)",
        "items": [
          {
            "type": "table",
            "head": [
              "SE task",
              "Verifiable?",
              "Justification"
            ],
            "rows": [
              [
                "Fixing a bug with a failing test",
                "Yes (largely)",
                "Test goes from red to green, regression suite stays green; but tests may be incomplete or overfitted"
              ],
              [
                "Library migration",
                "Yes (largely)",
                "Build, existing tests and linters confirm behaviour preserved; semantic subtleties may remain"
              ],
              [
                "Unit test generation",
                "Partly",
                "Tests can be run and measured by coverage and mutation score, but whether assertions encode the intended behaviour (oracle problem) needs human judgement"
              ],
              [
                "Static-analysis warning repair",
                "Partly",
                "Re-run analyser to confirm warning gone; whether it was a true positive and the fix is appropriate needs judgement"
              ],
              [
                "Requirements elicitation / specification",
                "No",
                "No ground truth: depends on stakeholder intent, negotiation and ambiguity; only expert review validates"
              ],
              [
                "Architecture and design decisions",
                "No",
                "Trade-offs are subjective and context-dependent (team skills, budget); no automatic oracle (though metrics can be measured later)"
              ],
              [
                "Code review quality / refactoring quality",
                "Weakly",
                "Behaviour preservation is checkable by tests, but readability and maintainability are hard to quantify"
              ]
            ]
          },
          "Implication: autonomy is safest where tasks are verifiable; elsewhere keep humans in the loop (Mollick: autonomy is safe where results can be checked mechanically)."
        ]
      }
    ],
    "pitfalls": [
      "Saying 'coding is verifiable because AI is good at it': the reason is automatic checking (tests, compilers) giving a reward.",
      "Calling every other task simply verifiable or not: justify using the oracle (what is the automatic check?) and note partial cases."
    ]
  },
  {
    "id": "architecture-design",
    "title": "Architecture alternatives, trade-offs, C4 and multi-agent design",
    "priority": 22,
    "tier": "possible",
    "freq": "Topic 5 lecture + lab",
    "marks": "5-12 marks",
    "summary": "**GenAI generates several architectural alternatives from requirements, scores them against weighted quality criteria with a trade-off matrix, visualises them (C4 in Mermaid) and records the decision in an ADR, optionally with a supervisor plus specialist agents and graph RAG for context.**",
    "mnemonic": "Alternatives, Criteria, Score, Decide, Record (ADR)",
    "source": [
      "CT4111_Notes_05_Design"
    ],
    "sections": [
      {
        "heading": "Workflow",
        "items": [
          "**Software architecture** is how a system is split into parts and how they connect.",
          "**Input**: requirements and use cases. Ask GenAI for standard and modern architectures, giving context by prompting or retrieval (**RAG**). If needed, use agents to:",
          "(1) read the requirements and propose alternatives,",
          "(2) weigh trade-offs,",
          "(3) write **ADRs** (architecture decision records),",
          "(4) score the combinations in a **score matrix**,",
          "(5) draw diagrams.",
          {
            "type": "p",
            "text": "Working together"
          },
          "Add the requirements and use cases, build a working prototype, add architecture styles and their trade-offs to the searchable material, use **design patterns** (standard solutions; books by Gamma and by Buschmann), draw **C4** and **UML** diagrams in **Mermaid** (diagrams written as text), and communicate in plain language, diagram text (Mermaid or PlantUML), XML or JSON, markdown files and skills.",
          {
            "type": "p",
            "text": "Example prompt"
          },
          "\"Design 4 architectural alternatives for a sports club booking system (20k users, P95 under 250 ms, 99.9% uptime, GDPR; booking, payments, notifications). For each: C4 container diagram in Mermaid, tech stack, 3 trade-offs (performance, security, cost), deployment complexity rating.\"",
          "**P95 under 250 ms** means 95% of responses arrive within 250 milliseconds."
        ]
      },
      {
        "heading": "Quality metrics (8 groups)",
        "items": [
          "**Performance**: **latency** (delay), requests per second, CPU and memory use.",
          "**Scalability**: maximum number of users.",
          "**Availability**: percentage of time it is up.",
          "**Maintainability**: time to deliver a change, **cyclomatic complexity** (paths through code), **coupling** and **cohesion** (how tied together parts are, and how focused each is), files touched per change.",
          "**Deployability**: time and frequency of releases, rollback time, share of changes that fail.",
          "**Security**: vulnerabilities, time to fix them, **attack surface** (places an attacker can try).",
          "**Cost**: infrastructure, cost per request, effort.",
          "**Architecture complexity**: number of services and connections, dependency graph."
        ]
      },
      {
        "heading": "Weighted score matrix (worked)",
        "items": [
          {
            "type": "task",
            "show": 0,
            "q": [
              "Weights: performance 30%, security 25%, maintainability 25%, cost 20%. Scores out of 10, in that order:",
              "Monolith 8, 7, 6, 9. Microservices 6, 9, 7, 6. Serverless 7, 8, 9, 7. Hybrid 8, 8, 8, 8.",
              "Find each weighted total and choose a design."
            ],
            "own": [
              {
                "type": "formula",
                "label": "Weighted total",
                "text": "total = sum of weight × score"
              }
            ]
          },
          "Weights: Performance 30%, Security 25%, Maintainability 25%, Cost 20%; scores 0-10; total = sum of weight x score.",
          {
            "type": "table",
            "head": [
              "Criterion (weight)",
              "Monolith",
              "Microservices",
              "Serverless",
              "Hybrid"
            ],
            "rows": [
              [
                "Performance (0.30)",
                "8",
                "6",
                "7",
                "8"
              ],
              [
                "Security (0.25)",
                "7",
                "9",
                "8",
                "8"
              ],
              [
                "Maintainability (0.25)",
                "6",
                "7",
                "9",
                "8"
              ],
              [
                "Cost (0.20)",
                "9",
                "6",
                "7",
                "8"
              ],
              [
                "Weighted total",
                "7.45",
                "7.00",
                "7.75",
                "8.00"
              ]
            ]
          },
          "Check Monolith: 0.3x8 + 0.25x7 + 0.25x6 + 0.2x9 = 2.4 + 1.75 + 1.5 + 1.8 = 7.45. Hybrid wins (Spring Boot monolith core plus Lambda for async edges): balanced, uses team skills (AI was blind to this), no cold-start risk, GDPR-ready Postgres.",
          "Trade-off analysis steps: context, criteria, alternatives, evaluation (strengths, weaknesses, risks), decision, consequences."
        ]
      },
      {
        "heading": "Architecture styles (names to know)",
        "items": [
          "Shaw and Garlan's classification: **pipes and filters** (data flows through processing steps), data abstraction or object-oriented, **event-based** (parts react to announcements), **layered**, repositories and blackboard (shared data store), interpreters, **MVC** (model, view, controller), client-server.",
          "Modern styles: **SOA** (service-oriented architecture), microkernel (small core plus plug-ins), peer-to-peer, REST, **microservices** (many small independent services), cloud, IoT, blockchain.",
          {
            "type": "table",
            "head": [
              "",
              "Microservices",
              "SOA"
            ],
            "rows": [
              [
                "Goal",
                "Decoupling, new services",
                "Reuse, business functionality"
              ],
              [
                "Protocols",
                "Lightweight (HTTP, REST)",
                "Multiple message protocols"
              ],
              [
                "Platform",
                "Cloud, containers",
                "Common platform, standards, governance"
              ],
              [
                "Data",
                "Each service has its own store",
                "Shared data storage"
              ]
            ]
          },
          "**Service-based architecture** is a hybrid: finely divided like SOA, with the clear business boundaries (**bounded context**) of microservices."
        ]
      },
      {
        "heading": "C4 model: four levels of zoom",
        "items": [
          "The **C4 model** draws a system at four levels, from far out to close up.",
          "**1. Context**: the system with its users and other systems.",
          "**2. Containers**: the apps, services and databases inside it (not Docker containers).",
          "**3. Components**: the structure inside one container.",
          "**4. Code**: the classes.",
          "Mermaid has C4 text commands (`C4Container`, `Person`, `System_Ext`, `Container`, `ContainerDb`, `Rel`) that draw the diagrams (try mermaid.live)."
        ]
      },
      {
        "heading": "Multi-agent design and Graph RAG",
        "items": [
          {
            "type": "p",
            "text": "Basic version"
          },
          "One agent per candidate architecture explores and defends it. Then build the score matrix and C4 diagrams.",
          {
            "type": "diagram",
            "kind": "graph",
            "data": {
              "title": "Supervisor with specialist agents",
              "directed": true,
              "r": 24,
              "height": 380,
              "nodes": [
                {
                  "id": "u",
                  "label": "User",
                  "sub": "requirements",
                  "x": 5,
                  "y": 45,
                  "color": 0
                },
                {
                  "id": "s",
                  "label": "Supervisor",
                  "sub": "coordinates, decides",
                  "x": 32,
                  "y": 45,
                  "color": 1
                },
                {
                  "id": "r",
                  "label": "Requirements",
                  "sub": "normalise input",
                  "x": 62,
                  "y": 5,
                  "color": 2
                },
                {
                  "id": "a",
                  "label": "Alternatives",
                  "sub": "3-5 options",
                  "x": 90,
                  "y": 25,
                  "color": 2
                },
                {
                  "id": "t",
                  "label": "Trade-off",
                  "sub": "analyst",
                  "x": 90,
                  "y": 65,
                  "color": 2
                },
                {
                  "id": "v",
                  "label": "Reviewer",
                  "sub": "NFR, risks",
                  "x": 62,
                  "y": 85,
                  "color": 2
                },
                {
                  "id": "w",
                  "label": "ADR writer",
                  "sub": "draft ADR",
                  "x": 32,
                  "y": 85,
                  "color": 2
                }
              ],
              "edges": [
                {
                  "from": "u",
                  "to": "s"
                },
                {
                  "from": "s",
                  "to": "r"
                },
                {
                  "from": "r",
                  "to": "a"
                },
                {
                  "from": "a",
                  "to": "t"
                },
                {
                  "from": "t",
                  "to": "v"
                },
                {
                  "from": "v",
                  "to": "w"
                },
                {
                  "from": "w",
                  "to": "s",
                  "label": "draft",
                  "curve": 30
                }
              ]
            },
            "caption": "Supervisor decides if output is good enough or must be revised; final decision is the human's."
          },
          {
            "type": "p",
            "text": "Agent roles"
          },
          "**Requirements** agent (structures the input), **alternatives** agent (3 to 5 options), **trade-off analyst** (performance, security, maintainability, cost), **reviewer** (are non-functional requirements covered? risks? consistency?), **ADR writer**, and a **supervisor**.",
          "Benefits: focused sub-tasks, specialisation, supervised and visible reasoning, linked to the decision records and score matrix.",
          {
            "type": "p",
            "text": "Graph RAG"
          },
          "Architectural knowledge is a network: requirements, decision records, components, incidents, trade-offs, constraints.",
          "Pull out these things and their relationships into a **knowledge graph** (triples of subject, relation, object, with a description), so searching can answer \"which solutions did we reject?\" and \"what is affected by this change?\".",
          "Pipeline: documents, extraction, knowledge graph, retrieval, prompt with precise context, 3 to 5 alternatives, decision record and score matrix."
        ]
      }
    ],
    "pitfalls": [
      "AI is blind to team skills and budget: always add them in the criteria or human review."
    ]
  },
  {
    "id": "re-fundamentals",
    "title": "Requirements engineering fundamentals and AI-in-RE research",
    "priority": 32,
    "tier": "possible",
    "freq": "Topic 4 lecture (first and last parts)",
    "marks": "4-8 marks",
    "summary": "**RE is a cross-cutting critical success factor (only 31% of projects succeed); classic RE has analysis (elicitation, interpretation, negotiation, documentation, validation) and management (change, tracing); AI scales it but needs human validation; the research and adoption slides are labelled non-examinable.**",
    "mnemonic": "31-50-19: success, challenged, failed",
    "source": [
      "CT4111_Notes_04_Requirements_Engineering"
    ],
    "sections": [
      {
        "heading": "Why RE matters and why it is hard",
        "items": [
          "**RE** (requirements engineering) is working out and managing what a system must do.",
          {
            "type": "p",
            "text": "Why it matters"
          },
          "Standish CHAOS report 2020: **31%** of projects successful (on time, budget and scope), **50%** challenged, **19%** failed (cancelled or unused).",
          "Monserrat et al. 2026: 30 experts identified 49 critical success factors in 6 categories (team, organisational, technical, development, process and project management, project).",
          "Requirement-related factors: detailed analysis, involving all participants, good communication, managing scope, managing **stakeholders** (everyone with an interest), managing change.",
          {
            "type": "p",
            "text": "Why it is hard at scale"
          },
          "Drawing out vague needs, writing them in a structured way, checking and negotiating them (tracing them and spotting conflicts), and managing change (control and **baselines**: agreed snapshots).",
          "There are millions of text items, ambiguity, and costly manual tracing."
        ]
      },
      {
        "heading": "Classical RE process (Pohl)",
        "items": [
          {
            "type": "p",
            "text": "Requirements analysis (repeated)"
          },
          "**Elicitation**: identify stakeholders and sources, gather raw requirements.",
          "**Interpretation**: organise, classify, refine.",
          "**Negotiation**: dependencies, contradictions, priorities.",
          "**Documentation**: write them down.",
          "**Validation**: check they are correct, complete and consistent.",
          {
            "type": "p",
            "text": "Requirements management"
          },
          "**Change management**: handle change requests and versions.",
          "**Tracing**: record where each came from and how it is implemented."
        ]
      },
      {
        "heading": "The requirements document (SRS)",
        "items": [
          "An **SRS** is a software requirements specification. Standards: IEEE 830-1998 and ISO/IEC/IEEE 29148:2018.",
          "It covers: context and scope, assumptions, stakeholders and types of user, what is inside the system (**boundary**), a glossary.",
          "**Functional** requirements (use cases, user stories, business rules), data, interfaces.",
          "**Non-functional** requirements (performance, security, reliability, usability, portability, maintainability).",
          "Legal requirements (GDPR), a **traceability matrix** (table linking requirements to design and tests), acceptance criteria, versions.",
          "Priorities by **MoSCoW**: Must, Should, Could, Won't."
        ]
      },
      {
        "heading": "AI in RE: opportunities and risks",
        "items": [
          "**Opportunities**: mining requirements from many sources, grouping similar feedback, LLM interviews and interview guides, meeting summaries.",
          "**Risks**: invented requirements, bias towards the loudest users, privacy (GDPR).",
          "**Vision**: AI assists, the engineer stays in charge."
        ]
      },
      {
        "heading": "AI in RE: research and adoption (not examinable)",
        "items": [
          "**NICE**: spots, classifies and explains non-functional requirements using small language models. A large model (GPT-4o) makes artificial labelled examples; smaller ones (T5, Llama 3.1, Phi-3) are trained on them. Score about 0.90 (**F1**, out of 1), cheaper and faster than large models.",
          "**Multi-agent requirements analysis** (Sami et al.): agents playing product owner, developer, tester and manager write user stories, check them against quality rules (INVEST, ISO 29148), prioritise together and merge a ranking. Limits: nothing to compare against, tiny evaluation, the LLM grades its own work.",
          "**Adoption**: in 2024 about 62% of developers used or planned to use AI tools (Stack Overflow); a Copilot study found tasks 55% faster (Peng 2023); only 14% of 74 studies of AI in RE were tested in industry. What would speed adoption: models tuned to the field or using retrieval, building into existing tools (DOORS, Jira), standards, long-term studies."
        ]
      }
    ],
    "pitfalls": [
      "Spending time memorising the research papers: the lecture marks that part non-examinable."
    ]
  },
  {
    "id": "ai-code-review",
    "title": "How the Claude Code team does code review",
    "priority": 34,
    "tier": "possible",
    "freq": "Topic 11 article 3",
    "marks": "4-8 marks",
    "summary": "**Anthropic moved most code reading to machines with layered checks and human approval scaled to risk, rejecting 'a human read it' as a proxy for safety; the goal is less human time per change with no more reverts, backed by fast rollback; critics question self-review independence and generalisability.**",
    "mnemonic": "Layers, risk-scaled humans, fast undo",
    "source": [
      "CT4111_Notes_11e_Article_Code_Review",
      "CT4111_Notes_11_Emerging_Topics"
    ],
    "sections": [
      {
        "heading": "Background: AI doing the code review",
        "items": [
          "Source: Osmani, Westlee Lunt and Wang (October 2026), about Anthropic's own practice.",
          "About 90% of Claude Code's code is written by Claude. Changes landing per day in the shared repository (**monorepo**) rose from about 2,500 in May to over 30,000 in September. Merged pull requests more than doubled while the share undone (**reverted**) fell by over 40%.",
          "Review was not dropped: machines now do the reading. Human attention is the scarce resource, spent according to risk, with fast undo as the safety net.",
          "Review has two jobs: find problems before release, and build shared understanding."
        ]
      },
      {
        "heading": "The review layers and how the AI reviewer works",
        "items": [
          {
            "type": "p",
            "text": "Eight layers"
          },
          "(1) Before the pull request: tests and build, plus a helper AI that has not seen the work reviews the changes.",
          "(2) AI review on every pull request.",
          "(3) A separate security review that can block merging.",
          "(4) Required automatic checks (style, types, tests, build).",
          "(5) Human approval, according to risk.",
          "(6) A **merge queue** re-runs checks against the latest main branch.",
          "(7) **Feature flags** (switches) and gradual release.",
          "(8) Monitoring and fast rollback.",
          {
            "type": "p",
            "text": "The AI reviewer"
          },
          "It reads the changes against the whole repository and their intent. Several agents hunt for bugs in parallel and others vote; only findings with enough agreement are posted, tagged Important, Nit (minor) or Pre-existing.",
          "Instruction files: **CLAUDE.md** (technology, conventions, goals) and **REVIEW.md** (code owners define what counts as failure and limit nitpicks)."
        ]
      },
      {
        "heading": "Human approval, convergence and limits",
        "items": [
          {
            "type": "p",
            "text": "Approval by risk"
          },
          "Low risk: no human once checks pass. Medium: one. High: two. The level depends on the change, not the author. An agent's approval never counts as a person's, and whoever prompted the agent must review.",
          {
            "type": "p",
            "text": "Convergence and improvement"
          },
          "After three rounds, ask the author to rethink. Re-review only the new changes. The average number of reviews needed to pass fell from 2.08 to 1.32. Incidents and reverts become test cases (**evals**) for the reviewer, scored daily.",
          {
            "type": "p",
            "text": "Who does what"
          },
          "Humans keep judgement and accountability (what to build, risky code, architecture, outcomes). Claude does reading, checking and security scanning. \"Nobody keeps a complete mental model, and we do not think anyone needs to\" (explanations are produced on demand).",
          "**Not solved**: nothing automatically stops things when reverts rise; an AI author and AI reviewer can loop; slowing down was rejected."
        ]
      },
      {
        "heading": "Critiques and discussion questions",
        "items": [
          "**\"Claude reviewing Claude\"** (a writer called paddo): the same model has the same blind spots, so it is not independent. A second model found serious bugs in 29 of 51 changes that had passed, so use a different model family.",
          "No one has a mental picture to debug from when something critical breaks.",
          "The figures are self-reported by a company promoting a paid product (about $15-25 per review). **SOC 2** (a security audit standard) may require a second human. The 30,000 changes are across the whole shared repository.",
          "**Questions**: is this temporary scaffolding that better models will replace (the bitter lesson), or lasting engineering? What would you need to know before owning such a code base?"
        ]
      }
    ],
    "pitfalls": [
      "Treating the article's statistics as independent evidence: they are Anthropic's own."
    ]
  },
  {
    "id": "dot-and-swarm",
    "title": "The Dot and the Swarm (Mollick)",
    "priority": 35,
    "tier": "low",
    "freq": "Topic 11 article 2",
    "marks": "4-6 marks",
    "summary": "**Mollick admits he wrongly expected humans to design agent organisation for years; applying the bitter lesson, models organise themselves (a personal agent 'dot' and a 10,000-agent 'swarm' that attacked Navier-Stokes), so what remains is choosing the target and checking results, with the principal-agent problem still open.**",
    "mnemonic": "Dot = personal agent, Swarm = self-organising agents; specify and verify",
    "source": [
      "CT4111_Notes_11d_Article_Dot_and_Swarm"
    ],
    "sections": [
      {
        "heading": "The claim, the dot and the swarm",
        "items": [
          "**Claim** (Ethan Mollick): AI agents organise themselves, so carefully designing agent organisations matters much less than he had thought: \"organizing work is just one more thing AI can learn to do\". It is a case of the **bitter lesson** (hand-built machinery gets replaced by better models).",
          "**The dot**: personal agents with access to your computer and accounts, which react to events and message you first (spotting a wrong permit number, or an airline credit about to expire). What matters is what you no longer have to spell out.",
          "**The swarm**: OpenAI reported about 10,000 agents over about 88 hours and 2.7 million messages working on a famous unsolved maths problem (Navier-Stokes, one of the Millennium Prize problems) with little human coordination. At small scale, Codex started three agents without being asked, and thirteen when told about three teams."
        ]
      },
      {
        "heading": "Why it works, limits and critiques",
        "items": [
          "**Why less management is needed**: no office politics, promotions or freeloading; messages are cheap, so the usual cost of communication (**Brooks's law**: adding people to a late project makes it later) does not bite.",
          "**Limits**: agents cannot replace much human work; long dull tasks are unproven; self-organisation can go wrong (the Hugging Face incident); the **principal-agent problem** remains (an agent may not act as its owner wants: GPT-6.1 Astra was shelved after acting without permission).",
          "**Critiques**: the agents are near-identical copies of one model, so shared errors look like agreement. The human role is like a beekeeper: set conditions, watch the overall picture, control the edges. Faster, longer runs make a poor setup costlier. The example had one owner and a machine-checkable proof, the proof was still under review, and it cost about 130 billion tokens (estimated $22 million)."
        ]
      }
    ],
    "pitfalls": [
      "Over-generalising from a verifiable maths problem with one owner to everyday team software work."
    ]
  }
];
