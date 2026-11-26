module.exports = [
{
  id: "modes-of-ai-use", title: "Modes of AI use in coding", priority: 1, tier: "core", hint: undefined,
  freq: "sample paper Q1(a)(b) + Topic 2 lecture", marks: "10 + 5 marks",
  summary: "**Modes differ by who drives, how much context the AI has, whether you watch it (foreground) or leave it (background), and whether the loop is synchronous or asynchronous; the more autonomous the mode, the more the human moves from author to supervisor and approver.**",
  mnemonic: "Ask - Edit - Delegate: the human goes Author, Director, Task-specifier",
  source: ["CT4111_Notes_02_Topic_2", "CT4111_Notes_01b_Getting_Started_AI_Coding", "CT4111_Notes_06_Implementation_Workflows"],
  sections: [
    { heading: "The three exam modes (define and distinguish)", items: [
      "**(i) Conversational (advisory, detached chat):** you talk to a chatbot (ChatGPT, Claude app) outside your code. The AI sees only what you paste or upload. It explains code, interprets errors, proposes snippets and pseudocode. Human = **author**, fully in control, copy-pastes results.",
      "**(ii) Conversational editing (IDE assistant):** chat panel inside the IDE (Copilot Chat, Cline, Gemini in Colab, Cursor chat). It sees the current file or workspace and proposes or applies **bounded edits** as a diff you Keep or Undo. Human = **director**: you give an instruction and approve every change.",
      "**(iii) Repository agent (delegated workflow):** you hand over a task (usually an issue); the agent works in its own sandbox on a repository snapshot, runs commands and tests, and returns a **branch, commits or pull request**. Human = **task specifier and approver**, reviewing like a teammate's contribution.",
      { type: "table", head: ["Aspect", "Conversational", "Conversational editing", "Repository agent"], rows: [
        ["Where it runs", "Separate chat window or app", "Inside the IDE", "Cloud or CLI sandbox on the repo"],
        ["Foreground / background", "Foreground (you are in the chat)", "Foreground (you watch the diff)", "Background (you work on something else)"],
        ["Sync / async", "Synchronous turn-taking", "Synchronous, short loop (seconds)", "Asynchronous: you return later to a PR"],
        ["Context the AI has", "Only what you paste or upload", "Current file or project workspace", "Whole repository plus sandbox tools and tests"],
        ["Typical output", "Explanation, snippet, pseudocode", "Patch or modified file", "Branch, commits, pull request"],
        ["Human role", "Author (you write and integrate)", "Director (you instruct, approve each diff)", "Task specifier and approver (you review the PR)"],
        ["Control / risk", "Highest control, slowest, lowest risk", "Medium control, quick checking", "Lowest per-step control; reviewing is the bottleneck"]
      ] }
    ] },
    { heading: "Foreground vs background, sync vs async (the vocabulary)", items: [
      { type: "note", text: "Slide-explicit vs inferred: the slides label only the interactive agent as foreground, say the repository agent works asynchronously as a delegated workflow, and give loop times of seconds to minutes for interactive use. Foreground/background and sync/async for chat and editing are standard inference (general knowledge) from those labels; they are not printed in the taxonomy table." },
      "**Foreground:** the AI works while you watch and can interrupt it; your attention is tied up (chat, editing, interactive agent). **Background:** it works while you do other things (repository agent, automated review).",
      "**Synchronous:** you wait for each reply and the loop is turn-based (seconds to minutes). **Asynchronous:** you submit a task and are notified when it finishes (hours); results arrive as a PR.",
      "**Interactive coding agent (foreground):** a middle step: reads the repo, edits several files, runs tests itself, and you watch and interrupt (Claude Code CLI, Copilot agent mode, Cursor agent). Role = supervisor.",
      "**Inline completion:** predicts the next tokens or lines while you type (Copilot inline). Human = author, finest control.",
      "**Automated review (pipeline-integrated):** direction reverses: you write the code and the AI critiques the diff when you push or open a PR. Human = accountable author. Does not replace human review."
    ] },
    { heading: "Spectrum diagram", items: [
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "Advisory chat", sub: "Author", color: 0 },
        { label: "Inline completion", sub: "Author", color: 0 },
        { label: "Conversational editing", sub: "Director", color: 1 },
        { label: "Interactive agent", sub: "Supervisor (foreground)", color: 1 },
        { label: "Repository agent", sub: "Task specifier + approver (background)", color: 2 }
      ], direction: "row" }, caption: "More autonomy to the right: less human control per step, more reliance on tests, specification and review." }
    ] },
    { heading: "Which mode for which scenario (recommendation recipe)", items: [
      "**Conversational:** learning and understanding, explaining legacy code, interpreting an error, comparing design options, brainstorming before implementing. Why: human keeps full ownership, low risk, no repo access needed, good for confidential code you will not expose.",
      "**Conversational editing:** a well-bounded change you can check quickly: add a function, write unit tests for a class, rename or small refactor, generate boilerplate. Why: faster than copy-paste, diff gives immediate review.",
      "**Repository agent:** well-bounded, well-tested tasks with clear specification: fix a labelled bug with a failing test, dependency bump, routine migration, documentation, many similar tickets in parallel. Why: runs in the background, scales, PR gives audit trail. Avoid for tasks needing product judgement or with weak tests.",
      "Rule: match autonomy to **task clarity x test coverage x cost of error**. Suggested workflow: advisory first to design, then editing to implement, then agent for the routine bulk.",
      "Results depend on three human factors: the prompt, how precisely you specify the task, how carefully you read the result."
    ] },
    { heading: "Tool examples (taxonomy table)", items: [
      "Advisory (slide table, Aug 2026): ChatGPT app, Claude app, Gemini app, Copilot Chat on github.com, Cursor chat, local models via Ollama / LM Studio. Advisory context can be pasted code, uploaded files, a folder, a connected repository or screenshots of errors.",
      "Inline completion: Copilot completions, Cursor Tab, Antigravity, Gemini in Colab, Continue, Tabby. Conversational editing: Codex IDE extension, Claude Code in IDE, Antigravity IDE, Copilot Chat, Cursor chat, Cline, Roo Code (Gemini in Colab is the lecture's worked editing example).",
      "Interactive agent: Claude Code CLI and Code view, Codex CLI, Antigravity CLI, Copilot agent mode and Copilot CLI, Cursor agent, Aider, OpenCode.",
      "Repository agent: Claude Code on the web, Codex cloud, Jules, Copilot cloud agent, Cursor background agents, self-hosted CI runners (lecture example: ChatGPT Codex on a shopping-planner GitHub repo); results also depend on repository context, tests and tooling, and environment fidelity. Automated review: Codex code review, Claude Code Review / GitHub Action, Code Assist for GitHub (enterprise), Copilot code review, Bugbot, CodeRabbit, Qodo, Greptile; it catches missing error handling, unsafe input and forgotten edge cases."
    ] }
  ],
  pitfalls: [
    "Describing the modes without naming the human role, foreground/background and sync/async: the question asks for all three.",
    "Saying a repository agent is 'fully autonomous so no review needed': you still approve the PR; the human is the accountable approver.",
    "Recommending one mode for everything: part (b) wants a different scenario and reason for each of the three.",
    "Confusing automated review (AI checks your code) with a repository agent (AI writes code)."
  ]
},
{
  id: "genai-definitions", title: "Core definitions: GenAI, ML, guardrails, self-play, human in the loop", priority: 2, tier: "core",
  freq: "sample paper Q1(c) + Topic 1 lecture", marks: "10 marks (2 per term)",
  summary: "**Be able to give a one-sentence definition plus one example for each of: AI, machine learning, deep learning, foundation model, LLM, generative AI, guardrails, self-play, human in the loop, agentic AI.**",
  mnemonic: "AI > ML > DL > GenAI/LLM nesting; guardrails guard, self-play self-teaches, HITL holds responsibility",
  source: ["CT4111_Notes_01a_Overview", "CT4111_Notes_02_Topic_2", "CT4111_Notes_06_Implementation_Workflows", "CT4111_Notes_11c_Article_Bitter_Lesson"],
  sections: [
    { heading: "The five sample-paper terms (two to three lines each)", items: [
      "**Generative AI:** AI models that generate new content (text, code, images, audio) resembling their training data, by learning patterns from large datasets; LLMs are the text/code case. Example: Claude writing a function from a prompt.",
      "**Machine learning:** Samuel 1959: the field of study that gives computers the ability to learn without being explicitly programmed. A model's behaviour is learnt from data rather than hand-coded rules. Example: a spam classifier trained on labelled SMS.",
      "**Guardrails:** constraints and controls that keep an AI system's behaviour within safe, intended bounds. Technical: types, interfaces and unit tests specified in the prompt, permission and auto-approve settings, PII-filtering proxy, sandbox, version control with revertible branches. Procedural: review, audit trails, approved tool policies.",
      "**Self-play:** a training method where a model improves by competing against, or generating and checking tasks for, copies of itself, with reward from the outcome (win, tests pass, proof checks) and no human examples. Examples: AlphaGo/chess self-play (Sutton's bitter lesson); RL on verifiable code and maths problems used to train LLMs.",
      "**Human in the loop (HITL):** a design where a human reviews, decides or approves at key points in an AI workflow, and holds responsibility for quality and adverse outcomes (possibly legal). Needs the human to be skilled; debated whether it is a real safeguard or a false sense of security (deskilling, rubber-stamping)."
    ] },
    { heading: "The AI terminology ladder", items: [
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "Artificial Intelligence", sub: "1950s", color: 0 },
        { label: "Machine Learning", sub: "1980s", color: 0 },
        { label: "Deep Learning", sub: "2010s", color: 1 },
        { label: "Generative AI / LLMs", sub: "2020s", color: 2 }
      ], direction: "row" }, caption: "Each is a subset of the one before; LLMs can also do non-generative tasks like sentiment classification." },
      "**AI (EU AI Act):** a machine-based system designed to operate with varying autonomy, that may adapt after deployment, and infers from input how to generate outputs (predictions, content, recommendations, decisions) that can influence physical or virtual environments.",
      "**Deep learning:** machine learning using deep neural networks with many layers; after training the network is an implicit, approximate summary of its training data. Architectures: CNNs, Transformers.",
      "**Foundation model:** a deep network pre-trained for one task (e.g. next-token prediction) that can be adapted to related tasks.",
      "**LLM (large language model):** a deep-learning foundation model that predicts the next token in a sequence; a chatbot = LLM + web UI + tools + rules.",
      "**Token:** a word or part of a word. **Context window:** the limited number of previous tokens the model can read when predicting the next one.",
      "**Agentic AI:** an LLM with a harness that makes it proactive, long-running, goal-driven and autonomous (perceive-plan-act loop, tools, memory): 'from chatting to doing'.",
      "**RLHF:** reinforcement learning with human feedback: trains the LLM to take turns, be polite, stay on topic."
    ] },
    { heading: "How an LLM is trained (for 'define' questions)", items: [
      "1. **Pre-training:** learn to predict the next token over web pages, books, code.",
      "2. **RLHF:** shape behaviour using human preference feedback.",
      "3. **Further RL:** feedback from AI or from provably correct solutions (code, maths), or **self-play**.",
      "Training now: Train, Prompt, Predict: new tasks are given by prompting, not retraining (contrast the old pre-train and fine-tune approach, which needed many labelled examples per task)."
    ] }
  ],
  pitfalls: [
    "Defining 'guardrails' only as content filters: in this course they include prompt constraints, tests, version control and PII proxies.",
    "Defining self-play as 'two humans playing': it is a model competing with copies of itself to learn without human data.",
    "Forgetting the 'human responsible' element of human in the loop.",
    "Writing one word per term: two clear sentences plus an example earns the 2 marks."
  ]
},
{
  id: "ai4re-process", title: "AI for Requirements Engineering (AI4RE): process and resources", priority: 3, tier: "core",
  freq: "sample paper Q2(a) + Topic 4 lecture (long)", marks: "10 marks",
  summary: "**AI4RE (IREB) uses LLMs, with a human firmly in the loop, to support four RE activities (elicitation, documentation, validation, management) through structured prompt templates with placeholders; the Prompt Guide gives a six-part page per template and the engineer validates every output.**",
  mnemonic: "EDVM: Elicit, Document, Validate, Manage; and always HITL",
  source: ["CT4111_Notes_04_Requirements_Engineering"],
  sections: [
    { heading: "What AI4RE is", items: [
      "IREB = International Requirements Engineering Board (non-profit, since 2006, CPRE certification, 70+ countries). **AI4RE** is its concept and module for using generative AI in RE.",
      "Principles: **pragmatic and responsible AI** (what modern AI such as LLMs, chatbots and RAG can do, plus clear limits); **human-in-the-loop** (AI is an assistant, never the final authority: filters noise, hallucinations, bias); **built-in risk management** (data privacy, IP confidentiality, critical evaluation of output).",
      "Vision: AI does not replace the RE; the role expands from elicitor, documenter and validator to **governor of AI-supported processes**."
    ] },
    { heading: "The process (what you do in the lab)", items: [
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "1 Define placeholders", sub: "[DOMAIN] [SYSTEM] [FORMAT]" },
        { label: "2 Run Prompt 1", sub: "stakeholder groups, Onion layers" },
        { label: "3 Attach org chart", sub: "optional, as a file" },
        { label: "4 Run Prompt 2", sub: "map groups to individuals/roles" },
        { label: "5 Validate with experts", sub: "groups, mappings, assumptions" }
      ], direction: "row" }, caption: "The five lecture steps for the Identify Stakeholders templates. (Generic AI4RE pattern: pick RE task, choose template, fill placeholders, run, validate, refine; that framing is general knowledge.)" },
      "Concrete example, **Identify Stakeholders** (Italian restaurant delivery service): Prompt 1 gets stakeholder groups, sorted by influence and classified with the **Onion Model** (System / Immediate / Wider), assumptions listed separately, output as a Markdown table. Prompt 2 maps each group to individuals or roles using an attached org chart, stating assumptions where mapping is missing and keeping group names consistent with Prompt 1.",
      "Onion model layers: 1 The product (core), 2 The system (users, developers, operators, maintainers), 3 The containing system (customers, sponsors, neighbouring systems), 4 The wider environment (regulators, public, competitors). Purpose: a checklist so indirect stakeholders are not overlooked.",
      "Note the AI found a non-obvious stakeholder (owner's son wanting reuse) from a side remark, but without an org chart Prompt 2 is only illustrative: **validate with domain experts** before planning interviews.",
      "Prompt anatomy used: AI's role (domain expert), my role (requirements engineer), purpose (prepare interviews and workshops), task, input (file), format.",
      "Worked output (Prompt 1): Customers, Restaurant Owner, Delivery Riders, Kitchen staff = System layer; Payment providers (High), Google Maps, IT/maintenance team = Immediate; Owner's son (Low), Regulatory bodies (Medium), Local competitors (Low) = Wider. Assumptions listed separately (payment providers and Google Maps counted because they impose constraints; regulators generic until the country is known; no point-of-sale system mentioned).",
      "Four pillars of AI support in RE (IREB): **Elicitation** (interview questions, simulated personas, brainstorming), **Documentation** (formatting, structuring user stories, translating, drafting specs), **Validation** (syntax and consistency checks, flag contradictions, early quality feedback), **Management** (categorise raw requirements, prioritisation matrices, downstream tracing). The Prompt Guide was built by an IREB Special Interest Group and warns against prompting in isolation (prompt chaos)."
    ] },
    { heading: "Resources AI4RE provides", items: [
      "**AI4RE Syllabus and study guide** (IREB, 2026) and the CPRE certification pathway (Foundation, Advanced, Expert, micro-credentials).",
      "**AI4RE Prompt Guide:** structured, continuously updated templates for four core RE phases:",
      { type: "table", head: ["Template group", "What it supports"], rows: [
        ["Elicitation", "Simulated interviews, role-playing stakeholder personas, domain questionnaires, stakeholder identification, brainstorming"],
        ["Documentation", "Formatting and spelling, user stories, translating technical terms, turning raw notes into formal specs"],
        ["Validation", "Rules to scan drafts for ambiguity, vagueness, internal conflict; automated syntax and consistency checks; early quality feedback"],
        ["Management", "Classify and tag requirements, prioritisation matrices (e.g. MoSCoW), tracing downstream"]
      ] },
      "**Six-part structure of every prompt-guide page:** (1) RE task description, (2) AI approach, (3) conclusion (added value and where human validation still matters), (4) prompt templates with [PLACEHOLDER] variables defining AI role, user role, task, output format, (5) filled example with real output, (6) pitfalls and tips (data privacy, tool limits).",
      "Guidance principle: do not write RE prompts in isolation; anchor them in artefacts (use cases, models, constraints) to avoid 'prompt chaos'.",
      "Pitfalls given: do not upload org charts or personal data to public AI tools without approval (GDPR; anonymise or use role IDs); free chatbot tiers may not accept uploads (about 20 MB limit on paid tiers: split files); chatbots cannot read Teams recordings (transcribe first)."
    ] },
    { heading: "Four human roles in the AI-augmented RE (IREB AI4RE syllabus)", items: [
      "**AI process designer and integrator:** selects tools, defines integration into the RE process.",
      "**Prompt designer and quality reviewer:** crafts and refines prompts, evaluates output against domain knowledge and quality criteria.",
      "**Risk and compliance manager:** protects data, avoids bias, ensures regulatory compliance.",
      "**Stakeholder communicator and trust builder:** keeps stakeholders informed about use, benefits and limits of AI."
    ] },
    { heading: "Opportunities and risks of AI in RE", items: [
      "Opportunities: mining requirements from diverse sources (reviews, interviews), topic modelling and clustering feedback, LLM-assisted elicitation (interview guides, follow-up questions), meeting summaries.",
      "Risks: hallucinated or fabricated requirements, bias in 'voice of the customer' data (over-represents vocal users), data privacy and confidentiality (GDPR), review overhead."
    ] }
  ],
  pitfalls: [
    "Describing only generic 'use ChatGPT to write requirements': the answer must name the template-based Prompt Guide, the four phases, placeholders, and expert validation.",
    "Forgetting the human-in-the-loop and risk management pillars.",
    "Listing resources without saying what they contain (six-part page structure, worked examples)."
  ]
},
{
  id: "adr-genai", title: "Architecture Decision Records and GenAI benefits", priority: 4, tier: "core",
  freq: "sample paper Q2(c)(d) + Topic 5 lecture", marks: "4 + 8 marks",
  summary: "**An ADR is a short structured document recording one architectural decision: title, status, date, author/deciders, context, decision, alternatives considered with pros and cons, and consequences; GenAI improves consistency, research, onboarding and governance but must be reviewed (hallucination, accountability gap).**",
  mnemonic: "ADR = the WHY behind the code. Benefits: C R O G (Consistency, Research, Onboarding, Governance)",
  source: ["CT4111_Notes_05_Design"],
  sections: [
    { heading: "Why ADRs exist", items: [
      "Traditional: senior dev says 'we will do microservices' and the team agrees. Problems: single point of failure (senior leaves), no documented trade-offs, after 6 months nobody knows why, alternatives unknown.",
      "ADR = living documentation in the repository (e.g. docs/architecture/adr/001-title.md) that records the decision, context, alternatives and consequences."
    ] },
    { heading: "Main components of an ADR", items: [
      { type: "table", head: ["Component", "Content"], rows: [
        ["Title", "Short decision title, numbered (ADR-001)"],
        ["Status", "Proposed, Accepted, Deprecated or Superseded"],
        ["Date, Author, Deciders", "Who proposed it, who is accountable, when"],
        ["Context", "Problem being solved, requirements, constraints, current system"],
        ["Decision", "The single clear choice and why"],
        ["Alternatives considered", "Options A, B, C each with pros and cons (winner marked)"],
        ["Consequences", "What we gain and what we accept (trade-offs, costs, risks, follow-ups)"]
      ] },
      "Slide template fields: Title (ADR-001), **Status** (Proposed | Accepted | Deprecated | Superseded), Date, Author, Deciders, **Context**, **Decision**, **Alternatives Considered** (Options A, B, C with pros and cons, winner marked); consequences appear in the final example. The initial example ADR is Proposed (2026-05-10); the final is titled FINAL with status Accepted.",
      "AI-assisted versions add an **AI analysis** note (e.g. alternatives scored with a weighted matrix). Workflow: AI drafts an ADR with status Proposed, team discusses (AI may contribute), edit until Accepted/Final.",
      "Trade-off analysis steps: context, criteria, alternatives, evaluation (strengths, weaknesses, risks), decision, consequences."
    ] },
    { heading: "Advantages of GenAI for ADRs (answer each of the four)", items: [
      { type: "table", head: ["Aspect", "Traditional", "AI-enhanced"], rows: [
        ["Consistency", "Manually checked, prone to human error and varied formats", "Auto-detects conflicts with previous decisions; enforces the template and terminology across all ADRs"],
        ["Research", "Hours of manual trade-off analysis", "Generates instant pros and cons based on technology trends; proposes 3-5 alternatives and a score matrix"],
        ["Onboarding", "New hires must read hundreds of files", "Semantic search / Q&A: 'Why don't we use NoSQL?' gives the rationale and links the ADR"],
        ["Governance", "Documentation goes out of date; drift unnoticed", "Proactive alerts when code drifts from ADR intent; audit trail of decisions and status changes"]
      ] }
    ] },
    { heading: "Risks and disadvantages", items: [
      "**Technical hallucinations:** AI favours plausible text over architectural correctness, may invent features or cite deprecated patterns.",
      "**Contextual blindness:** unaware of tribal knowledge, team skills (e.g. the Spring Boot expertise that made the hybrid option win), budget, legacy debt.",
      "**Accountability gap:** rubber-stamping AI ADRs destroys ownership when production fails.",
      "Principle: **co-pilot, not pilot**: AI drafts options, humans decide and sign."
    ] },
    { heading: "Worked example: sports court booking system", items: [
      "Requirements: 20k users, 2k bookings a day, P95 under 250 ms, 99.9% uptime, GDPR, audit log. Alternatives: monolith, microservices, serverless, hybrid.",
      "Weighted score (verified against the slide image; weights 30/25/25/20): Monolith 7.45, Microservices 7.0, Serverless 7.75, Hybrid 8.00. Hybrid wins: Spring Boot monolith core plus Lambda for async notifications, managed PostgreSQL for GDPR and audit; 3 weeks vs 8 weeks for microservices.",
      "Final ADR consequences: P95 180 ms, GDPR audit log in Postgres, cost 25% lower than microservices, team learning curve for Lambda."
    ] }
  ],
  pitfalls: [
    "Listing only Context/Decision/Consequences: also give status, alternatives (with pros and cons), date, deciders.",
    "For the four benefits, giving a single generic sentence ('saves time'): each of the four needs its own specific advantage.",
    "Forgetting that a human must still approve the ADR."
  ]
},
{
  id: "sdlc-genai", title: "SDLC phases and where to use GenAI", priority: 5, tier: "core",
  freq: "sample paper Q3(a) + Topic 1 lecture exam questions", marks: "12 marks",
  summary: "**Six phases: requirements gathering, design, coding, testing, deployment, feedback; to pick one phase for GenAI, justify it by volume of repetitive work, ease of verification and cost of error, and explicitly say why the other five are done traditionally.**",
  mnemonic: "R-D-C-T-D-F: Requirements, Design, Coding, Testing, Deployment, Feedback",
  source: ["CT4111_Notes_01a_Overview"],
  sections: [
    { heading: "Six phases: activities and AI contributions", items: [
      { type: "table", head: ["Phase", "Activities", "GenAI contributions"], rows: [
        ["1 Requirements gathering", "Planning, scope, objectives, resources; functional and technical requirements; reviews and approval", "Summarise meeting notes, web-search existing products, generate initial user stories and a project timeline"],
        ["2 Design", "Architecture, database design and relationships, component logic, APIs, tables", "Discuss alternatives iteratively; summarise into design documents and acceptance criteria; ADRs, C4 diagrams"],
        ["3 Coding", "Writing code, code review, static analysis, version control, pull requests", "Code generation and completion, review of PRs, pull-request descriptions"],
        ["4 Testing", "Test cases, unit, integration, system, user acceptance tests", "Auto-generate tests, test data, mocks; analyse failures"],
        ["5 Deployment", "Build and DevOps, smoke-testing the live environment", "Debug and review devops config files, generate pipelines"],
        ["6 Feedback", "Interact with stakeholders, bug reports, customer input", "Summarise customer feedback, classify and prioritise bug reports"]
      ] },
      "Agile reminder: short sprints, each delivering a shippable increment, CI/CD, frequent customer feedback, definition of done, user stories ('As a [role], I want [feature], so that [benefit]'), technical debt and retrospectives."
    ] },
    { heading: "How to answer 'only one phase' (12 marks)", items: [
      "1. State your choice clearly and give the criteria: repetitive/boilerplate volume, output **verifiable** by tests or tools, **low blast radius** if wrong, human can review quickly, high productivity gain.",
      "2. Give 3-4 reasons for the chosen phase with a concrete example.",
      "3. Refer to **each of the other five phases** in one or two lines: why you would NOT choose it (risk, judgement, accountability) and what you would do traditionally.",
      "4. Mention safeguards (human review, tests, version control) and one limitation of your choice.",
      "**Model choice A: Testing.** Gains: tests are generated fast (unit, edge, regression, data, mocks); result is verifiable (run, mutation score, coverage); wrong tests are caught by a human reading assertions and by running them; lowers the 'tests take too long' barrier. Risk: oracle problem and shallow tests, so humans define business rules.",
      "**Alternative choice B: Coding.** Gains: biggest effort and highest model capability (coding is a verifiable task: compile and test). Risks: security, licensing, tech debt (duplication up, reuse down), review bottleneck.",
      "Why not the others: **Requirements** (needs stakeholder judgement, ambiguity and politics; hallucinated or biased requirements are expensive downstream); **Design** (needs tribal knowledge, long-term trade-offs and accountability; AI blind to team skills); **Deployment** (high blast radius, credentials and production access, but config generation is helpful under review); **Feedback** (needs human empathy and prioritisation, but summarising is low risk, so it is a good second choice)."
    ] },
    { heading: "Related lecture exam questions (Topic 1)", items: [
      "Name and define the six phases of the SDLC (table above).",
      "How can an LLM help in the final phase (feedback)? Summarise and cluster customer feedback, classify and prioritise bug reports, draft replies, detect trends; human decides priorities.",
      "A single LLM run reads all text so far and produces one token; how is it made useful? Loop it (autoregressive generation), give it good prompts and context (RAG), tools, chain of thought, and an agent harness."
    ] }
  ],
  pitfalls: [
    "Choosing a phase but not mentioning the other five (part asks to refer to all six).",
    "Choosing on 'AI is good at it' alone: give verification, risk and accountability reasons.",
    "Forgetting that software engineering is more than coding: requirements, docs, testing, maintenance, deployment, legal and ethics."
  ]
},
{
  id: "se-principles-changed", title: "SE principles changed by GenAI", priority: 6, tier: "core",
  freq: "sample paper Q3(b) + Topic 1 lecture", marks: "8 marks (2 per principle)",
  summary: "**For each principle say whether it changed, how and why: DRY weakens (copies are cheap to make and fix, but duplication still harms review and context), abstraction shifts to specifications and modular context, requirements-before-code is strengthened (prompt = specification), infrastructure as code extends to prompts, skills and agent config.**",
  mnemonic: "DRY relaxed, Abstraction moved, Requirements raised, IaC extended",
  source: ["CT4111_Notes_01a_Overview", "CT4111_Notes_06_Implementation_Workflows", "CT4111_Notes_08_Maintenance", "CT4111_Notes_11e_Article_Code_Review"],
  sections: [
    { heading: "Principles listed in the lecture", items: [
      { type: "table", head: ["Group", "Principles"], rows: [
        ["Design", "Separation of concerns, abstraction / information hiding, high cohesion, DRY, KISS / YAGNI, design for change, fail fast"],
        ["Process", "Requirements before code, user stories, iterative development with continuous testing, version control everything, code review as quality gate, measure before optimising"],
        ["Team and organisation", "Conway's law, shared code ownership, CI/CD"],
        ["Operations", "Automate repetitive tasks, observability, infrastructure as code"],
        ["Documentation", "Document decisions (ADRs), single source of truth"]
      ] },
      "Module philosophy: GenAI has changed some things and the change will not stop, so learn what changed, what is still changing and what stays the same."
    ] },
    { heading: "The four sample-paper principles: how and why they changed", items: [
      "**(i) Don't repeat yourself: weakened but not dead.** Why it was important: duplicated code means fixing a bug in many places and humans hate typing it. Change: AI makes copies near-free to write and can refactor/unify code quickly, so some teams accept duplication for clarity, and generated code is often regenerated rather than maintained. Evidence: study of 211M lines shows duplication and churn up, reuse down with AI. Still matters: duplication hurts maintainability, review and AI context (inconsistent fixes). Net: DRY becomes a clean-up target AI can help with ('technical deflation') rather than a rule enforced at write time.",
      "**(ii) Abstraction / information hiding: shifts level.** Why it was important: humans have limited working memory, so hide details behind interfaces. Change: LLMs can read large amounts of code and needs less hiding to understand it, 'nobody on the team holds a complete mental model' (Anthropic); the abstraction humans work at moves up to the **specification/prompt** and the contract (tests, interfaces). Still matters: context windows are finite and models hallucinate with too little or too much context, so modular code and clear interfaces help AI too; and guardrails like types and interfaces constrain generation.",
      "**(iii) Requirements before code: strengthened and reshaped.** Why: with LLMs the 'what' and 'how' are decoupled; LLMs cannot guess what to build, so the developer must specify the 'what' thoroughly (prompting as specification, more emphasis on RE). Change: prototypes and vibe coding make code cheap, tempting 'code first', but ambiguity then produces wrong software at speed; tests (TDD) and user stories become the executable requirements; clarification-before-coding ('ask questions, state assumptions') is a prompting principle.",
      "**(iv) Infrastructure as code: extended.** Why: reproducible, reviewable, versioned environments. Change: GenAI generates and reviews IaC and devops config quickly, and agents with shell access (embodied agents) can change infrastructure directly, so IaC and version control become the guardrail that makes AI changes auditable and revertible. The 'as code' idea extends to prompts, skills, CLAUDE.md/REVIEW.md instruction files and agent configuration: treat prompts as first-class versioned artefacts to avoid prompt debt."
    ] },
    { heading: "Other principles that changed (bonus examples)", items: [
      "**Code review as quality gate:** AI review runs on every PR; human approval scaled to risk (Anthropic).",
      "**Shared ownership / Conway's law:** agents are team members whose organisation can emerge by itself (Mollick).",
      "**Automate repetitive tasks:** extends to boilerplate, docs, tests.",
      "**Document decisions:** AI drafts ADRs but accountability remains human.",
      "Unchanged: separation of concerns, design for change, fail fast, measure before optimising still hold; AI is better when architecture is clean."
    ] }
  ],
  pitfalls: [
    "Answering 'all four changed completely' or 'none changed': give a nuanced which/how/why for each of the four.",
    "No 'why': each principle needs the original reason and the GenAI-driven reason it moved.",
    "Presenting your reasoning as slide fact: it is fine to argue, but anchor in lecture points (decoupled what/how, duplication study, prompts as artefacts)."
  ]
},
{
  id: "rag-context", title: "Retrieval Augmented Generation (RAG) and context management", priority: 15, tier: "likely",
  freq: "sample paper Q3(c) + Topics 1, 3, 5", marks: "5 marks",
  summary: "**RAG gives an LLM relevant external knowledge at query time: documents are chunked and embedded into a vector store at setup, the question is embedded, nearest chunks are retrieved and pasted into the prompt, then the LLM generates a grounded answer; goals are fewer hallucinations, up-to-date and private knowledge, and fitting a finite context window.**",
  mnemonic: "Chunk, Embed, Store; then Embed query, Retrieve, Paste, Generate",
  source: ["CT4111_Notes_03_Prompting_and_Context", "CT4111_Notes_01a_Overview", "CT4111_Notes_05_Design"],
  sections: [
    { heading: "The problem RAG solves", items: [
      "An LLM only 'knows' what is in its weights (likely words) plus what we put in its context window. Everything else (your codebase, docs, new libraries) must be provided.",
      "Naive approach: paste the whole file, all function docs and the task. Breaks when code grows: context windows are finite, long middle content is forgotten (primacy and recency bias), too much information and too little both cause hallucination, codebase changes so context goes stale."
    ] },
    { heading: "How RAG works (goals and workings)", items: [
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "Chunk documents", sub: "setup time" },
        { label: "Embed chunks", sub: "small model gives vectors" },
        { label: "Store in vector DB", sub: "reused at runtime" },
        { label: "Embed the question", sub: "query time", color: 1 },
        { label: "Retrieve nearest chunks", sub: "embedding similarity", color: 1 },
        { label: "Paste into prompt", sub: "context window", color: 1 },
        { label: "LLM generates answer", sub: "grounded in chunks", color: 2 }
      ], direction: "row" }, caption: "RAG pipeline: set-up (first three) then each query (last four)." },
      "**Embeddings** are numeric vectors representing the meaning of text; similarity (e.g. cosine) finds relevant chunks without exact keyword matches.",
      "**Goals:** ground answers in current, private or domain data; reduce hallucination; fit only relevant content into the finite context window; avoid retraining the model.",
      "Keep the knowledge base up to date (libraries make re-indexing easy). RAG is 'a Google search over your codebase': the AI decides to search and results come into context.",
      "Consumer chatbots often use plain web search as a tool instead (no embeddings).",
      "In practice: Cursor indexes your project with embeddings; Claude Code often uses grep as the lookup tool."
    ] },
    { heading: "Context management patterns", items: [
      "**Context as prompt (naive):** include everything; breaks at scale.",
      "**Context on request:** the model emits something like a LOOKUP tool call; an API retrieves functions and docstrings and adds them. The LLM decides when to call the tool.",
      "**RAG:** retrieve only relevant chunks. **Graph RAG:** retrieve from a knowledge graph of entities and relationships (requirements, ADRs, C4 components, incidents) via triplets (subject, predicate, object); answers 'what did we reject before?'.",
      "**Keep context clean:** outdated docs cause hallucinations; long chats cost more and may auto-compact; start a new session after writing notes (TODO.md); prefer plain text (.md over .docx); supply niche library docs (e.g. context7).",
      "Good results need context that is **complete, correct and well presented**."
    ] }
  ],
  pitfalls: [
    "Describing RAG as 'the model searches the internet': the answer needs retrieval of relevant chunks and insertion into the prompt, with embeddings and a vector store.",
    "Omitting the goal (less hallucination, current data, limited context).",
    "Saying RAG retrains the model: it does not change weights."
  ]
}
];
