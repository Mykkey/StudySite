module.exports = [
  {
    "id": "modes-of-ai-use",
    "title": "Modes of AI use in coding",
    "priority": 1,
    "tier": "core",
    "freq": "sample paper Q1(a)(b) + Topic 2 lecture",
    "marks": "10 + 5 marks",
    "summary": "**The ways of coding with AI differ in who is driving, how much the AI can see, and whether you watch it work. The more it does alone, the more you become a checker instead of a writer.**",
    "mnemonic": "Ask - Edit - Delegate: the human goes Author, Director, Task-specifier",
    "source": [
      "CT4111_Notes_02_Topic_2",
      "CT4111_Notes_01b_Getting_Started_AI_Coding",
      "CT4111_Notes_06_Implementation_Workflows"
    ],
    "sections": [
      {
        "heading": "The three exam modes (define and distinguish)",
        "items": [
          {
            "type": "p",
            "text": "Mode 1: Conversational (a separate chat)"
          },
          "You chat with a bot (ChatGPT, Claude app) outside your code.",
          "It only sees what you paste or upload.",
          "It explains code and errors, and suggests snippets.",
          "You are the **author**. You copy and paste what you want.",
          {
            "type": "p",
            "text": "Mode 2: Conversational editing (assistant in your editor)"
          },
          "A chat panel inside your code editor (Copilot Chat, Cline, Cursor chat, Gemini in Colab).",
          "It sees your file or project and suggests small edits.",
          "You see the change and click Keep or Undo.",
          "You are the **director**: you instruct and approve each change.",
          {
            "type": "p",
            "text": "Mode 3: Repository agent (you hand over a task)"
          },
          "You give it a task, usually an issue.",
          "It works alone in its own safe copy of the project, running commands and tests.",
          "It comes back with a **branch, commits or a pull request**.",
          "You **specify and approve**, reviewing it like a teammate's work.",
          {
            "type": "table",
            "head": [
              "Aspect",
              "Conversational",
              "Conversational editing",
              "Repository agent"
            ],
            "rows": [
              [
                "Where it runs",
                "Separate chat window or app",
                "Inside the IDE",
                "Cloud or CLI sandbox on the repo"
              ],
              [
                "Foreground / background",
                "Foreground (you are in the chat)",
                "Foreground (you watch the diff)",
                "Background (you work on something else)"
              ],
              [
                "Sync / async",
                "Synchronous turn-taking",
                "Synchronous, short loop (seconds)",
                "Asynchronous: you return later to a PR"
              ],
              [
                "Context the AI has",
                "Only what you paste or upload",
                "Current file or project workspace",
                "Whole repository plus sandbox tools and tests"
              ],
              [
                "Typical output",
                "Explanation, snippet, pseudocode",
                "Patch or modified file",
                "Branch, commits, pull request"
              ],
              [
                "Human role",
                "Author (you write and integrate)",
                "Director (you instruct, approve each diff)",
                "Task specifier and approver (you review the PR)"
              ],
              [
                "Control / risk",
                "Highest control, slowest, lowest risk",
                "Medium control, quick checking",
                "Lowest per-step control; reviewing is the bottleneck"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Foreground vs background, sync vs async (the vocabulary)",
        "items": [
          {
            "type": "note",
            "text": "What the slides actually say: only the interactive agent is labelled foreground, the repository agent is said to work asynchronously, and interactive loops take seconds to minutes. Calling chat and editing foreground and synchronous is a standard inference, not printed in the table."
          },
          "**Foreground**: you watch and can interrupt. Your attention is taken (chat, editing, interactive agent).",
          "**Background**: it works while you do something else (repository agent, automated review).",
          "**Synchronous**: you wait for each reply, turn by turn.",
          "**Asynchronous**: you submit and get told when it is done, perhaps hours later, usually as a pull request.",
          {
            "type": "p",
            "text": "Other modes"
          },
          "**Interactive coding agent**: in between. It reads the project, edits several files and runs tests while you watch (Claude Code CLI, Copilot agent mode, Cursor agent). You are the **supervisor**.",
          "**Inline completion**: guesses the next words as you type. You are the author.",
          "**Automated review**: the other way round. You write, the AI comments when you push. You stay responsible, and a human review is still needed."
        ]
      },
      {
        "heading": "Spectrum diagram",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Advisory chat",
                  "sub": "Author",
                  "color": 0
                },
                {
                  "label": "Inline completion",
                  "sub": "Author",
                  "color": 0
                },
                {
                  "label": "Conversational editing",
                  "sub": "Director",
                  "color": 1
                },
                {
                  "label": "Interactive agent",
                  "sub": "Supervisor (foreground)",
                  "color": 1
                },
                {
                  "label": "Repository agent",
                  "sub": "Task specifier + approver (background)",
                  "color": 2
                }
              ],
              "direction": "row"
            },
            "caption": "More autonomy to the right: less human control per step, more reliance on tests, specification and review."
          }
        ]
      },
      {
        "heading": "Which mode for which scenario (recommendation recipe)",
        "items": [
          {
            "type": "p",
            "text": "Use conversational when..."
          },
          "You are learning, decoding old code, reading an error or comparing designs.",
          "Why: you stay in charge, low risk, no access to your project needed.",
          {
            "type": "p",
            "text": "Use conversational editing when..."
          },
          "The change is small and quick to check: add a function, write tests, rename, boilerplate.",
          "Why: faster than copy-paste, and you see the changes straight away.",
          {
            "type": "p",
            "text": "Use a repository agent when..."
          },
          "The task is clearly defined and well tested: a labelled bug with a failing test, upgrading a library, routine migration, documentation, many similar tickets.",
          "Why: runs in the background, handles many at once, and the pull request records it.",
          "Avoid it when judgement about the product is needed or tests are weak.",
          "**Rule of thumb**: give more freedom only when the task is clear, tests are good and mistakes are cheap.",
          "A sensible order: chat to design, edit to build, agent for routine bulk work.",
          "Results depend on you: your prompt, how precise the task is, how carefully you read the output."
        ]
      },
      {
        "heading": "Tool examples (taxonomy table)",
        "items": [
          {
            "type": "p",
            "text": "Chat tools (slide table, Aug 2026)"
          },
          "ChatGPT, Claude and Gemini apps, Copilot Chat on github.com, Cursor chat, and local models (Ollama, LM Studio).",
          "You can give them pasted code, files, a folder, a repository or error screenshots.",
          {
            "type": "p",
            "text": "Completion and editing tools"
          },
          "**Completion**: Copilot, Cursor Tab, Antigravity, Gemini in Colab, Continue, Tabby.",
          "**Editing**: Codex IDE extension, Claude Code in IDE, Antigravity IDE, Copilot Chat, Cursor chat, Cline, Roo Code. The lecture's example is Gemini in Colab.",
          {
            "type": "p",
            "text": "Agent tools"
          },
          "**Interactive**: Claude Code CLI and Code view, Codex CLI, Antigravity CLI, Copilot agent mode and CLI, Cursor agent, Aider, OpenCode.",
          "**Repository**: Claude Code on the web, Codex cloud, Jules, Copilot cloud agent, Cursor background agents, self-hosted CI runners.",
          "The lecture example is ChatGPT Codex on a shopping-planner repository.",
          "Results also depend on the project's context, tests, tools and how true to life the environment is.",
          "**Review**: Codex code review, Claude Code Review and GitHub Action, Code Assist for GitHub, Copilot code review, Bugbot, CodeRabbit, Qodo, Greptile.",
          "These catch missing error handling, unsafe input and forgotten edge cases."
        ]
      }
    ],
    "pitfalls": [
      "For each mode give the human's role, foreground or background, and sync or async.",
      "A repository agent still needs your approval of its pull request.",
      "If asked, give a different scenario and reason for each mode.",
      "Automated review checks code. A repository agent writes it."
    ]
  },
  {
    "id": "genai-definitions",
    "title": "Core definitions: GenAI, ML, guardrails, self-play, human in the loop",
    "priority": 2,
    "tier": "core",
    "freq": "sample paper Q1(c) + Topic 1 lecture",
    "marks": "10 marks (2 per term)",
    "summary": "**Be able to define each key AI term in one sentence and give one example.**",
    "mnemonic": "AI > ML > DL > GenAI/LLM nesting; guardrails guard, self-play self-teaches, HITL holds responsibility",
    "source": [
      "CT4111_Notes_01a_Overview",
      "CT4111_Notes_02_Topic_2",
      "CT4111_Notes_06_Implementation_Workflows",
      "CT4111_Notes_11c_Article_Bitter_Lesson"
    ],
    "sections": [
      {
        "heading": "The five sample-paper terms (two to three lines each)",
        "items": [
          {
            "type": "p",
            "text": "Generative AI"
          },
          "AI that makes **new content** (text, code, images, audio) by learning patterns from lots of data.",
          "Example: Claude writing a function from your request.",
          {
            "type": "p",
            "text": "Machine learning"
          },
          "Computers learning **without being explicitly programmed** (Samuel, 1959).",
          "Behaviour comes from data, not hand-written rules.",
          "Example: a spam filter trained on labelled messages.",
          {
            "type": "p",
            "text": "Guardrails"
          },
          "Limits that keep an AI behaving **safely and as intended**.",
          "Technical: types and tests in the prompt, permission settings, a filter that strips personal data, a sandbox, version control.",
          "Process: review, audit trails, approved tool policies.",
          {
            "type": "p",
            "text": "Self-play"
          },
          "A model improves by competing with, or setting and checking tasks for, **copies of itself**.",
          "The reward comes from the outcome (win, tests pass), with no human examples.",
          "Examples: AlphaGo and chess; learning code and maths problems that can be checked.",
          {
            "type": "p",
            "text": "Human in the loop (HITL)"
          },
          "A person **reviews, decides or approves** at key points, and is responsible for the result.",
          "The person needs to be skilled.",
          "Debate: real safety check, or false comfort (people lose skills and rubber-stamp)?"
        ]
      },
      {
        "heading": "The AI terminology ladder",
        "items": [
          "Each term below fits inside the one before it.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Artificial Intelligence",
                  "sub": "1950s",
                  "color": 0
                },
                {
                  "label": "Machine Learning",
                  "sub": "1980s",
                  "color": 0
                },
                {
                  "label": "Deep Learning",
                  "sub": "2010s",
                  "color": 1
                },
                {
                  "label": "Generative AI / LLMs",
                  "sub": "2020s",
                  "color": 2
                }
              ],
              "direction": "row"
            },
            "caption": "Each is a subset of the one before; LLMs can also do non-generative tasks like sentiment classification."
          },
          "**AI** (EU AI Act): a machine system with some autonomy, which may adapt, and which works out from input how to produce predictions, content, recommendations or decisions that affect the world.",
          "**Deep learning**: machine learning with many-layered neural networks, such as CNNs and Transformers. The trained network is a rough summary of its data.",
          "**Foundation model**: a large network trained on one general task, then adapted to others.",
          "**LLM**: a foundation model that predicts the next token. A chatbot = LLM + web page + tools + rules.",
          "**Token**: a word or part of a word.",
          "**Context window**: how much earlier text the model can look at.",
          "**Agentic AI**: an LLM wrapped so it acts by itself towards a goal, using tools and memory. \"From chatting to doing.\"",
          "**RLHF** (reinforcement learning with human feedback): teaches the model to take turns, be polite and stay on topic.",
          "LLMs can also do non-creative jobs, such as judging whether a review is positive."
        ]
      },
      {
        "heading": "How an LLM is trained (for 'define' questions)",
        "items": [
          "**1. Pre-training**: learn to predict the next token from web pages, books and code.",
          "**2. RLHF**: shape behaviour using people's preferences.",
          "**3. More practice**: feedback from AI, from answers that can be proven right (code, maths), or from self-play.",
          "Today: **train, prompt, predict**. You give a new task by asking, not by retraining.",
          "The old way needed many labelled examples for every task."
        ]
      }
    ],
    "pitfalls": [
      "Guardrails are not just content filters. They include prompt limits, tests, version control and privacy filters.",
      "Self-play is a model against copies of itself, not two people.",
      "For human in the loop, say the human is responsible.",
      "Two clear sentences and an example earn the marks. One word does not."
    ]
  },
  {
    "id": "ai4re-process",
    "title": "AI for Requirements Engineering (AI4RE): process and resources",
    "priority": 3,
    "tier": "core",
    "freq": "sample paper Q2(a) + Topic 4 lecture (long)",
    "marks": "10 marks",
    "summary": "**AI4RE means using AI to help with requirements engineering, with a human firmly in charge. It uses fill-in-the-blank prompt templates, and an engineer checks everything.**",
    "mnemonic": "EDVM: Elicit, Document, Validate, Manage; and always HITL",
    "source": [
      "CT4111_Notes_04_Requirements_Engineering"
    ],
    "sections": [
      {
        "heading": "What AI4RE is",
        "items": [
          "**RE (requirements engineering)** is working out what a system must do.",
          "**IREB** is a non-profit RE board (since 2006, runs the CPRE certificate, 70+ countries).",
          "**AI4RE** is its programme for using generative AI in RE.",
          {
            "type": "p",
            "text": "Three principles"
          },
          "**Practical and responsible**: use what LLMs, chatbots and RAG can do, and be clear about limits.",
          "**Human in the loop**: AI assists but never has the final say. People filter out noise, made-up content and bias.",
          "**Risk management built in**: protect data and confidential material, and check output critically.",
          "AI does not replace the requirements engineer. Their job grows to include **overseeing** the AI."
        ]
      },
      {
        "heading": "The process (what you do in the lab)",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "1 Define placeholders",
                  "sub": "[DOMAIN] [SYSTEM] [FORMAT]"
                },
                {
                  "label": "2 Run Prompt 1",
                  "sub": "stakeholder groups, Onion layers"
                },
                {
                  "label": "3 Attach org chart",
                  "sub": "optional, as a file"
                },
                {
                  "label": "4 Run Prompt 2",
                  "sub": "map groups to individuals/roles"
                },
                {
                  "label": "5 Validate with experts",
                  "sub": "groups, mappings, assumptions"
                }
              ],
              "direction": "row"
            },
            "caption": "The five lecture steps for the Identify Stakeholders templates. (Generic AI4RE pattern: pick RE task, choose template, fill placeholders, run, validate, refine; that framing is general knowledge.)"
          },
          {
            "type": "p",
            "text": "Example: find stakeholders for an Italian restaurant delivery service"
          },
          "**Prompt 1**: list stakeholder groups, sorted by influence, sorted into the **Onion Model**, with assumptions listed separately, as a table.",
          "**Prompt 2**: match each group to real people or roles using an attached organisation chart. State any guesses, and keep the same group names.",
          {
            "type": "p",
            "text": "The Onion Model (rings from the middle out)"
          },
          "**1.** The product itself.",
          "**2.** The system: users, developers, operators, maintainers.",
          "**3.** The containing system: customers, sponsors, connected systems.",
          "**4.** The wider world: regulators, public, competitors.",
          "It is a checklist so indirect stakeholders are not missed.",
          {
            "type": "p",
            "text": "What happened"
          },
          "The AI spotted a hidden stakeholder (the owner's son, who wants to reuse the system) from a side remark.",
          "Without a real organisation chart, Prompt 2 is only illustrative. **Check with people who know the business.**",
          {
            "type": "p",
            "text": "Parts of the prompt"
          },
          "The AI's role (domain expert), your role (requirements engineer), the purpose (prepare interviews), the task, the input file and the output format.",
          {
            "type": "p",
            "text": "Output of Prompt 1"
          },
          "**System layer**: customers, restaurant owner, delivery riders, kitchen staff.",
          "**Immediate**: payment providers (high influence), Google Maps, IT team.",
          "**Wider**: owner's son (low), regulators (medium), competitors (low).",
          "Assumptions: payment and maps count because they set limits; regulators stay general until the country is known; no till system was mentioned.",
          {
            "type": "p",
            "text": "Four ways AI supports RE"
          },
          "**Elicitation**: interview questions, pretend personas, brainstorming.",
          "**Documentation**: formatting, user stories, translating, drafting.",
          "**Validation**: checking consistency and flagging contradictions.",
          "**Management**: sorting requirements, prioritising, tracing.",
          "The Prompt Guide warns against prompting each thing in isolation (\"prompt chaos\")."
        ]
      },
      {
        "heading": "Resources AI4RE provides",
        "items": [
          "**Syllabus and study guide** (IREB, 2026), with certificate levels (Foundation, Advanced, Expert, micro-credentials).",
          "**Prompt Guide**: regularly updated templates for four RE phases.",
          {
            "type": "table",
            "head": [
              "Template group",
              "What it supports"
            ],
            "rows": [
              [
                "Elicitation",
                "Simulated interviews, role-playing stakeholder personas, domain questionnaires, stakeholder identification, brainstorming"
              ],
              [
                "Documentation",
                "Formatting and spelling, user stories, translating technical terms, turning raw notes into formal specs"
              ],
              [
                "Validation",
                "Rules to scan drafts for ambiguity, vagueness, internal conflict; automated syntax and consistency checks; early quality feedback"
              ],
              [
                "Management",
                "Classify and tag requirements, prioritisation matrices (e.g. MoSCoW), tracing downstream"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Each Prompt Guide page has six parts"
          },
          "**1.** The RE task.",
          "**2.** How AI helps.",
          "**3.** Conclusion: the value, and where a human must still check.",
          "**4.** Templates with [PLACEHOLDERS] for AI role, your role, task and format.",
          "**5.** A filled-in example with real output.",
          "**6.** Pitfalls and tips (privacy, tool limits).",
          "Tie prompts to real project documents (use cases, models, limits).",
          {
            "type": "p",
            "text": "Warnings given"
          },
          "Do not upload charts or personal data to public AI tools without approval (GDPR). Anonymise.",
          "Free tiers may not accept files (about 20 MB limit on paid ones, so split them).",
          "Chatbots cannot read Teams recordings. Transcribe them first."
        ]
      },
      {
        "heading": "Four human roles in the AI-augmented RE (IREB AI4RE syllabus)",
        "items": [
          "**Process designer**: chooses tools and fits them into the RE process.",
          "**Prompt designer and reviewer**: refines prompts and judges the output.",
          "**Risk and compliance manager**: protects data, avoids bias, follows the rules.",
          "**Communicator and trust builder**: explains the AI's use, benefits and limits to stakeholders."
        ]
      },
      {
        "heading": "Opportunities and risks of AI in RE",
        "items": [
          {
            "type": "p",
            "text": "Opportunities"
          },
          "Pull requirements from reviews and interviews.",
          "Group feedback into topics.",
          "Help with interview guides and follow-up questions.",
          "Summarise meetings.",
          {
            "type": "p",
            "text": "Risks"
          },
          "Made-up requirements.",
          "Bias: loud users get over-represented.",
          "Privacy and confidentiality (GDPR).",
          "Time spent checking."
        ]
      }
    ],
    "pitfalls": [
      "Do not just say \"use ChatGPT\". Name the Prompt Guide, the four phases, placeholders and expert checking.",
      "Mention human in the loop and risk management.",
      "Say what the resources contain, not only their names."
    ]
  },
  {
    "id": "adr-genai",
    "title": "Architecture Decision Records and GenAI benefits",
    "priority": 4,
    "tier": "core",
    "freq": "sample paper Q2(c)(d) + Topic 5 lecture",
    "marks": "4 + 8 marks",
    "summary": "**An ADR is a short record of one design decision: what was decided, why, what else was considered and what follows. AI can help write it, but a human must check it.**",
    "mnemonic": "ADR = the WHY behind the code. Benefits: C R O G (Consistency, Research, Onboarding, Governance)",
    "source": [
      "CT4111_Notes_05_Design"
    ],
    "sections": [
      {
        "heading": "Why ADRs exist",
        "items": [
          "**ADR** = Architecture Decision Record.",
          "**The old way**: a senior developer says \"we will do microservices\" and everyone agrees.",
          "The problems: if that person leaves, the knowledge leaves.",
          "Trade-offs are never written down.",
          "Six months later nobody knows why, or what else was possible.",
          "**An ADR** is kept in the project (for example docs/architecture/adr/001-title.md).",
          "It records the decision, background, options and results."
        ]
      },
      {
        "heading": "Main components of an ADR",
        "items": [
          {
            "type": "table",
            "head": [
              "Component",
              "Content"
            ],
            "rows": [
              [
                "Title",
                "Short decision title, numbered (ADR-001)"
              ],
              [
                "Status",
                "Proposed, Accepted, Deprecated or Superseded"
              ],
              [
                "Date, Author, Deciders",
                "Who proposed it, who is accountable, when"
              ],
              [
                "Context",
                "Problem being solved, requirements, constraints, current system"
              ],
              [
                "Decision",
                "The single clear choice and why"
              ],
              [
                "Alternatives considered",
                "Options A, B, C each with pros and cons (winner marked)"
              ],
              [
                "Consequences",
                "What we gain and what we accept (trade-offs, costs, risks, follow-ups)"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Fields in the slide template"
          },
          "Title (such as ADR-001).",
          "**Status**: Proposed, Accepted, Deprecated or Superseded.",
          "Date, Author, Deciders.",
          "**Context**, **Decision**, and **Alternatives Considered** (Options A, B, C with pros and cons, winner marked).",
          "Consequences appear in the final example.",
          "In the lecture, the first version is Proposed (2026-05-10) and the final one is Accepted.",
          "With AI help there is also an **AI analysis** note, such as scoring options in a weighted table.",
          "**Workflow**: AI drafts it as Proposed, the team discusses, edits, then accepts.",
          "**Weighing options**: background, criteria, options, strengths and risks, decision, consequences."
        ]
      },
      {
        "heading": "Advantages of GenAI for ADRs (answer each of the four)",
        "items": [
          {
            "type": "table",
            "head": [
              "Aspect",
              "Traditional",
              "AI-enhanced"
            ],
            "rows": [
              [
                "Consistency",
                "Manually checked, prone to human error and varied formats",
                "Auto-detects conflicts with previous decisions; enforces the template and terminology across all ADRs"
              ],
              [
                "Research",
                "Hours of manual trade-off analysis",
                "Generates instant pros and cons based on technology trends; proposes 3-5 alternatives and a score matrix"
              ],
              [
                "Onboarding",
                "New hires must read hundreds of files",
                "Semantic search / Q&A: 'Why don't we use NoSQL?' gives the rationale and links the ADR"
              ],
              [
                "Governance",
                "Documentation goes out of date; drift unnoticed",
                "Proactive alerts when code drifts from ADR intent; audit trail of decisions and status changes"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Risks and disadvantages",
        "items": [
          "**Made-up technical facts**: AI writes what sounds right. It may invent features or suggest outdated patterns.",
          "**Missing context**: it does not know unwritten knowledge, team skills, budget or old code. (In the example, the team's Spring Boot skill decided the winner.)",
          "**Nobody owns it**: if people rubber-stamp AI text, no one is responsible when it fails.",
          "**Co-pilot, not pilot**: AI drafts, humans decide and sign."
        ]
      },
      {
        "heading": "Worked example: sports court booking system",
        "items": [
          "A sports court booking system.",
          "**Needs**: 20k users, 2k bookings a day, 95% of responses (P95) under 250 ms, 99.9% uptime, GDPR, an audit log.",
          "**Options**: monolith, microservices, serverless, hybrid.",
          "**Weights**: 30/25/25/20.",
          "**Scores**: Monolith 7.45, Microservices 7.0, Serverless 7.75, Hybrid 8.00.",
          "**Winner: hybrid**. A Spring Boot core, AWS Lambda for background notifications, and managed PostgreSQL for GDPR and audit.",
          "It takes 3 weeks, against 8 for microservices.",
          "**Final results**: P95 of 180 ms, audit log in Postgres, 25% cheaper than microservices, and the team must learn Lambda."
        ]
      }
    ],
    "pitfalls": [
      "Include status, alternatives with pros and cons, date and deciders, not only context, decision and consequences.",
      "Give each of the four benefits its own specific point, not just \"saves time\".",
      "Say a human still approves the ADR."
    ]
  },
  {
    "id": "sdlc-genai",
    "title": "SDLC phases and where to use GenAI",
    "priority": 5,
    "tier": "core",
    "freq": "sample paper Q3(a) + Topic 1 lecture exam questions",
    "marks": "12 marks",
    "summary": "**There are six phases of building software. If asked to use AI in only one, pick where work is repetitive, easy to check and cheap to get wrong, and say why not the other five.**",
    "mnemonic": "R-D-C-T-D-F: Requirements, Design, Coding, Testing, Deployment, Feedback",
    "source": [
      "CT4111_Notes_01a_Overview"
    ],
    "sections": [
      {
        "heading": "Six phases: activities and AI contributions",
        "items": [
          "**SDLC** = software development life cycle.",
          "The six phases: requirements, design, coding, testing, deployment, feedback.",
          {
            "type": "table",
            "head": [
              "Phase",
              "Activities",
              "GenAI contributions"
            ],
            "rows": [
              [
                "1 Requirements gathering",
                "Planning, scope, objectives, resources; functional and technical requirements; reviews and approval",
                "Summarise meeting notes, web-search existing products, generate initial user stories and a project timeline"
              ],
              [
                "2 Design",
                "Architecture, database design and relationships, component logic, APIs, tables",
                "Discuss alternatives iteratively; summarise into design documents and acceptance criteria; ADRs, C4 diagrams"
              ],
              [
                "3 Coding",
                "Writing code, code review, static analysis, version control, pull requests",
                "Code generation and completion, review of PRs, pull-request descriptions"
              ],
              [
                "4 Testing",
                "Test cases, unit, integration, system, user acceptance tests",
                "Auto-generate tests, test data, mocks; analyse failures"
              ],
              [
                "5 Deployment",
                "Build and DevOps, smoke-testing the live environment",
                "Debug and review devops config files, generate pipelines"
              ],
              [
                "6 Feedback",
                "Interact with stakeholders, bug reports, customer input",
                "Summarise customer feedback, classify and prioritise bug reports"
              ]
            ]
          },
          "**Agile reminder**: short sprints, each producing something usable, with frequent feedback.",
          "Also: continuous integration and delivery, a definition of done, technical debt and retrospectives.",
          "User story: \"As a [role], I want [feature], so that [benefit].\""
        ]
      },
      {
        "heading": "How to answer 'only one phase' (12 marks)",
        "items": [
          {
            "type": "p",
            "text": "Steps for a 12-mark answer"
          },
          "**1.** State your choice and your tests for choosing: lots of repetitive work, easy to check, small damage if wrong, quick to review, big time saving.",
          "**2.** Give 3-4 reasons with a concrete example.",
          "**3.** Cover **each of the other five phases**: why not, and what you would do instead.",
          "**4.** Add safeguards (review, tests, version control) and one limitation.",
          {
            "type": "p",
            "text": "Model choice A: Testing"
          },
          "Tests are generated fast (unit, edge cases, regression, data, mocks).",
          "Results are checkable (run them, mutation score, coverage).",
          "It removes the \"tests take too long\" excuse.",
          "**Risk**: AI may not know what correct means (the oracle problem), so tests can be shallow. Humans define the business rules.",
          {
            "type": "p",
            "text": "Alternative choice B: Coding"
          },
          "It is the most work, and where AI is strongest, since code can be compiled and tested.",
          "**Risks**: security, licensing, more duplicated code and a review bottleneck.",
          {
            "type": "p",
            "text": "Why not the others"
          },
          "**Requirements**: needs human judgement and politics. Wrong ones are costly later.",
          "**Design**: needs unwritten knowledge and long-term responsibility. AI does not know the team.",
          "**Deployment**: mistakes hit the live system and involve passwords and access. Drafting config under review is fine.",
          "**Feedback**: needs empathy and priorities. Summarising is low risk, so it is a good second choice."
        ]
      },
      {
        "heading": "Related lecture exam questions (Topic 1)",
        "items": [
          "Name and define the six phases (see the table).",
          {
            "type": "p",
            "text": "How can an LLM help with feedback?"
          },
          "Summarise and group comments, sort bug reports, draft replies, spot trends. A human sets priorities.",
          {
            "type": "p",
            "text": "An LLM makes one token at a time. How is it made useful?"
          },
          "Run it in a loop, give good prompts and context (RAG), add tools, step-by-step reasoning and an agent wrapper."
        ]
      }
    ],
    "pitfalls": [
      "Mention all six phases, not just your choice.",
      "Do not justify with \"AI is good at it\". Give reasons about checking, risk and responsibility.",
      "Software engineering is more than coding: requirements, documents, testing, maintenance, deployment, law and ethics."
    ]
  },
  {
    "id": "se-principles-changed",
    "title": "SE principles changed by GenAI",
    "priority": 6,
    "tier": "core",
    "freq": "sample paper Q3(b) + Topic 1 lecture",
    "marks": "8 marks (2 per principle)",
    "summary": "**For each principle say whether it changed, how and why: DRY weakens (copies are cheap to make and fix, but duplication still harms review and context), abstraction shifts to specifications and modular context, requirements-before-code is strengthened (prompt = specification), infrastructure as code extends to prompts, skills and agent config.**",
    "mnemonic": "DRY relaxed, Abstraction moved, Requirements raised, IaC extended",
    "source": [
      "CT4111_Notes_01a_Overview",
      "CT4111_Notes_06_Implementation_Workflows",
      "CT4111_Notes_08_Maintenance",
      "CT4111_Notes_11e_Article_Code_Review"
    ],
    "sections": [
      {
        "heading": "Principles listed in the lecture",
        "items": [
          {
            "type": "table",
            "head": [
              "Group",
              "Principles"
            ],
            "rows": [
              [
                "Design",
                "Separation of concerns, abstraction / information hiding, high cohesion, DRY, KISS / YAGNI, design for change, fail fast"
              ],
              [
                "Process",
                "Requirements before code, user stories, iterative development with continuous testing, version control everything, code review as quality gate, measure before optimising"
              ],
              [
                "Team and organisation",
                "Conway's law, shared code ownership, CI/CD"
              ],
              [
                "Operations",
                "Automate repetitive tasks, observability, infrastructure as code"
              ],
              [
                "Documentation",
                "Document decisions (ADRs), single source of truth"
              ]
            ]
          },
          "Module philosophy: GenAI has changed some things and the change will not stop, so learn what changed, what is still changing and what stays the same."
        ]
      },
      {
        "heading": "The four sample-paper principles: how and why they changed",
        "items": [
          "**(i) Don't repeat yourself: weakened but not dead.** Why it was important: duplicated code means fixing a bug in many places and humans hate typing it. Change: AI makes copies near-free to write and can refactor/unify code quickly, so some teams accept duplication for clarity, and generated code is often regenerated rather than maintained. Evidence: study of 211M lines shows duplication and churn up, reuse down with AI. Still matters: duplication hurts maintainability, review and AI context (inconsistent fixes). Net: DRY becomes a clean-up target AI can help with ('technical deflation') rather than a rule enforced at write time.",
          "**(ii) Abstraction / information hiding: shifts level.** Why it was important: humans have limited working memory, so hide details behind interfaces. Change: LLMs can read large amounts of code and needs less hiding to understand it, 'nobody on the team holds a complete mental model' (Anthropic); the abstraction humans work at moves up to the **specification/prompt** and the contract (tests, interfaces). Still matters: context windows are finite and models hallucinate with too little or too much context, so modular code and clear interfaces help AI too; and guardrails like types and interfaces constrain generation.",
          "**(iii) Requirements before code: strengthened and reshaped.** Why: with LLMs the 'what' and 'how' are decoupled; LLMs cannot guess what to build, so the developer must specify the 'what' thoroughly (prompting as specification, more emphasis on RE). Change: prototypes and vibe coding make code cheap, tempting 'code first', but ambiguity then produces wrong software at speed; tests (TDD) and user stories become the executable requirements; clarification-before-coding ('ask questions, state assumptions') is a prompting principle.",
          "**(iv) Infrastructure as code: extended.** Why: reproducible, reviewable, versioned environments. Change: GenAI generates and reviews IaC and devops config quickly, and agents with shell access (embodied agents) can change infrastructure directly, so IaC and version control become the guardrail that makes AI changes auditable and revertible. The 'as code' idea extends to prompts, skills, CLAUDE.md/REVIEW.md instruction files and agent configuration: treat prompts as first-class versioned artefacts to avoid prompt debt."
        ]
      },
      {
        "heading": "Other principles that changed (bonus examples)",
        "items": [
          "**Code review as quality gate:** AI review runs on every PR; human approval scaled to risk (Anthropic).",
          "**Shared ownership / Conway's law:** agents are team members whose organisation can emerge by itself (Mollick).",
          "**Automate repetitive tasks:** extends to boilerplate, docs, tests.",
          "**Document decisions:** AI drafts ADRs but accountability remains human.",
          "Unchanged: separation of concerns, design for change, fail fast, measure before optimising still hold; AI is better when architecture is clean."
        ]
      }
    ],
    "pitfalls": [
      "Answering 'all four changed completely' or 'none changed': give a nuanced which/how/why for each of the four.",
      "No 'why': each principle needs the original reason and the GenAI-driven reason it moved.",
      "Presenting your reasoning as slide fact: it is fine to argue, but anchor in lecture points (decoupled what/how, duplication study, prompts as artefacts)."
    ]
  },
  {
    "id": "rag-context",
    "title": "Retrieval Augmented Generation (RAG) and context management",
    "priority": 15,
    "tier": "likely",
    "freq": "sample paper Q3(c) + Topics 1, 3, 5",
    "marks": "5 marks",
    "summary": "**RAG gives an LLM relevant external knowledge at query time: documents are chunked and embedded into a vector store at setup, the question is embedded, nearest chunks are retrieved and pasted into the prompt, then the LLM generates a grounded answer; goals are fewer hallucinations, up-to-date and private knowledge, and fitting a finite context window.**",
    "mnemonic": "Chunk, Embed, Store; then Embed query, Retrieve, Paste, Generate",
    "source": [
      "CT4111_Notes_03_Prompting_and_Context",
      "CT4111_Notes_01a_Overview",
      "CT4111_Notes_05_Design"
    ],
    "sections": [
      {
        "heading": "The problem RAG solves",
        "items": [
          "An LLM only 'knows' what is in its weights (likely words) plus what we put in its context window. Everything else (your codebase, docs, new libraries) must be provided.",
          "Naive approach: paste the whole file, all function docs and the task. Breaks when code grows: context windows are finite, long middle content is forgotten (primacy and recency bias), too much information and too little both cause hallucination, codebase changes so context goes stale."
        ]
      },
      {
        "heading": "How RAG works (goals and workings)",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Chunk documents",
                  "sub": "setup time"
                },
                {
                  "label": "Embed chunks",
                  "sub": "small model gives vectors"
                },
                {
                  "label": "Store in vector DB",
                  "sub": "reused at runtime"
                },
                {
                  "label": "Embed the question",
                  "sub": "query time",
                  "color": 1
                },
                {
                  "label": "Retrieve nearest chunks",
                  "sub": "embedding similarity",
                  "color": 1
                },
                {
                  "label": "Paste into prompt",
                  "sub": "context window",
                  "color": 1
                },
                {
                  "label": "LLM generates answer",
                  "sub": "grounded in chunks",
                  "color": 2
                }
              ],
              "direction": "row"
            },
            "caption": "RAG pipeline: set-up (first three) then each query (last four)."
          },
          "**Embeddings** are numeric vectors representing the meaning of text; similarity (e.g. cosine) finds relevant chunks without exact keyword matches.",
          "**Goals:** ground answers in current, private or domain data; reduce hallucination; fit only relevant content into the finite context window; avoid retraining the model.",
          "Keep the knowledge base up to date (libraries make re-indexing easy). RAG is 'a Google search over your codebase': the AI decides to search and results come into context.",
          "Consumer chatbots often use plain web search as a tool instead (no embeddings).",
          "In practice: Cursor indexes your project with embeddings; Claude Code often uses grep as the lookup tool."
        ]
      },
      {
        "heading": "Context management patterns",
        "items": [
          "**Context as prompt (naive):** include everything; breaks at scale.",
          "**Context on request:** the model emits something like a LOOKUP tool call; an API retrieves functions and docstrings and adds them. The LLM decides when to call the tool.",
          "**RAG:** retrieve only relevant chunks. **Graph RAG:** retrieve from a knowledge graph of entities and relationships (requirements, ADRs, C4 components, incidents) via triplets (subject, predicate, object); answers 'what did we reject before?'.",
          "**Keep context clean:** outdated docs cause hallucinations; long chats cost more and may auto-compact; start a new session after writing notes (TODO.md); prefer plain text (.md over .docx); supply niche library docs (e.g. context7).",
          "Good results need context that is **complete, correct and well presented**."
        ]
      }
    ],
    "pitfalls": [
      "Describing RAG as 'the model searches the internet': the answer needs retrieval of relevant chunks and insertion into the prompt, with embeddings and a vector store.",
      "Omitting the goal (less hallucination, current data, limited context).",
      "Saying RAG retrains the model: it does not change weights."
    ]
  }
];
