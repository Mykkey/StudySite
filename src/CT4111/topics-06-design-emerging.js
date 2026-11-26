module.exports = [
{
  id: "verifiable-tasks", title: "Verifiable tasks and why coding improved so fast", priority: 19, tier: "likely",
  freq: "sample paper bonus Q(d) + Topics 1, 11", marks: "6 marks",
  summary: "**A verifiable task has an automatic, objective check of correctness (compile, tests, proof checker), giving a cheap reward signal for reinforcement learning and self-play, so models improve rapidly at it; coding is verifiable (to the strength of the tests), while requirements and design judgement are not.**",
  mnemonic: "Verifiable = can be machine-checked, so can be trained at scale",
  source: ["CT4111_Notes_01a_Overview", "CT4111_Notes_11_Emerging_Topics", "CT4111_Notes_11d_Article_Dot_and_Swarm"],
  sections: [
    { heading: "What it means", items: [
      "A task is **verifiable** if a solution can be checked for correctness automatically, cheaply and objectively, without human judgement: code compiles and passes tests; a maths proof checks in a formal prover (the Navier-Stokes proof came with a machine-checkable Lean formalisation).",
      "Why it drove progress: LLM training uses further RL with feedback from provably correct solutions in coding and maths (and self-play). Generate many attempts, check them, reward the correct ones: unlimited training signal with no human labelling, and the same check lets agents loop (write, run tests, fix) at inference time.",
      "Caveats: verification is only as good as the tests (weak tests allow wrong code to pass); the model may game the check (modify tests, special-case); passing tests is not the same as good design, security or maintainability."
    ] },
    { heading: "Judging other SE tasks (pick two and justify)", items: [
      { type: "table", head: ["SE task", "Verifiable?", "Justification"], rows: [
        ["Fixing a bug with a failing test", "Yes (largely)", "Test goes from red to green, regression suite stays green; but tests may be incomplete or overfitted"],
        ["Library migration", "Yes (largely)", "Build, existing tests and linters confirm behaviour preserved; semantic subtleties may remain"],
        ["Unit test generation", "Partly", "Tests can be run and measured by coverage and mutation score, but whether assertions encode the intended behaviour (oracle problem) needs human judgement"],
        ["Static-analysis warning repair", "Partly", "Re-run analyser to confirm warning gone; whether it was a true positive and the fix is appropriate needs judgement"],
        ["Requirements elicitation / specification", "No", "No ground truth: depends on stakeholder intent, negotiation and ambiguity; only expert review validates"],
        ["Architecture and design decisions", "No", "Trade-offs are subjective and context-dependent (team skills, budget); no automatic oracle (though metrics can be measured later)"],
        ["Code review quality / refactoring quality", "Weakly", "Behaviour preservation is checkable by tests, but readability and maintainability are hard to quantify"]
      ] },
      "Implication: autonomy is safest where tasks are verifiable; elsewhere keep humans in the loop (Mollick: autonomy is safe where results can be checked mechanically)."
    ] }
  ],
  pitfalls: [
    "Saying 'coding is verifiable because AI is good at it': the reason is automatic checking (tests, compilers) giving a reward.",
    "Calling every other task simply verifiable or not: justify using the oracle (what is the automatic check?) and note partial cases."
  ]
},
{
  id: "architecture-design", title: "Architecture alternatives, trade-offs, C4 and multi-agent design", priority: 22, tier: "possible",
  freq: "Topic 5 lecture + lab", marks: "5-12 marks",
  summary: "**GenAI generates several architectural alternatives from requirements, scores them against weighted quality criteria with a trade-off matrix, visualises them (C4 in Mermaid) and records the decision in an ADR, optionally with a supervisor plus specialist agents and graph RAG for context.**",
  mnemonic: "Alternatives, Criteria, Score, Decide, Record (ADR)",
  source: ["CT4111_Notes_05_Design"],
  sections: [
    { heading: "Workflow", items: [
      "Input: requirements and use cases. Ask GenAI for standard and modern architectures; give context by prompting, RAG, graph RAG; use agentic AI if needed: (1) read requirements and propose alternatives, (2) assess trade-offs, (3) create ADRs, (4) evaluate combinations and prepare a score matrix, (5) produce diagrams.",
      "Human-AI collaboration: add requirements and use cases; create a functional prototype; add architectural styles with trade-offs to RAG; use design patterns (Gamma, Buschmann); C4 and UML in Mermaid; communicate in natural language, Mermaid/PlantUML, XML/JSON, markdown files and skills.",
      "Example prompt: 'Design 4 architectural alternatives for a sports club booking system (20k users, P95 under 250 ms, 99.9% uptime, GDPR; booking, payments, notifications). For each: C4 container diagram in Mermaid, tech stack, 3 trade-offs (performance, security, cost), deployment complexity rating.'"
    ] },
    { heading: "Quality metrics (8 groups)", items: [
      "Performance (latency, requests/s, CPU/memory); scalability (max users); availability (uptime %); maintainability (change lead time, cyclomatic complexity, coupling and cohesion, files affected per change); deployability (deployment time and frequency, rollback time, change failure rate); security (vulnerabilities, time to patch, attack surface); cost (infrastructure, cost per request, effort); architecture complexity (services, integration points, dependency graph)."
    ] },
    { heading: "Weighted score matrix (worked)", items: [
      "Weights: Performance 30%, Security 25%, Maintainability 25%, Cost 20%; scores 0-10; total = sum of weight x score.",
      { type: "table", head: ["Criterion (weight)", "Monolith", "Microservices", "Serverless", "Hybrid"], rows: [
        ["Performance (0.30)", "8", "6", "7", "8"],
        ["Security (0.25)", "7", "9", "8", "8"],
        ["Maintainability (0.25)", "6", "7", "9", "8"],
        ["Cost (0.20)", "9", "6", "7", "8"],
        ["Weighted total", "7.45", "7.00", "7.75", "8.00"]
      ] },
      "Check Monolith: 0.3x8 + 0.25x7 + 0.25x6 + 0.2x9 = 2.4 + 1.75 + 1.5 + 1.8 = 7.45. Hybrid wins (Spring Boot monolith core plus Lambda for async edges): balanced, uses team skills (AI was blind to this), no cold-start risk, GDPR-ready Postgres.",
      "Trade-off analysis steps: context, criteria, alternatives, evaluation (strengths, weaknesses, risks), decision, consequences."
    ] },
    { heading: "Architecture styles (names to know)", items: [
      "Shaw and Garlan classification: pipes and filters, data abstraction / OO, event-based and implicit invocation, layered, repositories and blackboard, interpreters, MVC, client-server; modern: SOA, microkernel, peer-to-peer, REST, microservices, cloud, IoT, blockchain.",
      { type: "table", head: ["", "Microservices", "SOA"], rows: [
        ["Goal", "Decoupling, new services", "Reuse, business functionality"],
        ["Protocols", "Lightweight (HTTP, REST)", "Multiple message protocols"],
        ["Platform", "Cloud, containers", "Common platform, standards, governance"],
        ["Data", "Each service has its own store", "Shared data storage"]
      ] },
      "Service-based architecture: hybrid of highly partitioned SOA with bounded context of microservices."
    ] },
    { heading: "C4 model: four levels of zoom", items: [
      "**1 Context** (system with users and other systems), **2 Containers** (apps, services, databases), **3 Components** (structure inside a container), **4 Code** (classes). Mermaid C4 text (C4Container, Person, System_Ext, Container, ContainerDb, Rel) renders diagrams (mermaid.live)."
    ] },
    { heading: "Multi-agent design and Graph RAG", items: [
      "**Basic:** one agent per candidate architecture explores and defends it; then matrix and C4.",
      { type: "diagram", kind: "graph", data: { title: "Supervisor with specialist agents", directed: true, r: 24, height: 380, nodes: [
        { id: "u", label: "User", sub: "requirements", x: 5, y: 45, color: 0 },
        { id: "s", label: "Supervisor", sub: "coordinates, decides", x: 32, y: 45, color: 1 },
        { id: "r", label: "Requirements", sub: "normalise input", x: 62, y: 5, color: 2 },
        { id: "a", label: "Alternatives", sub: "3-5 options", x: 90, y: 25, color: 2 },
        { id: "t", label: "Trade-off", sub: "analyst", x: 90, y: 65, color: 2 },
        { id: "v", label: "Reviewer", sub: "NFR, risks", x: 62, y: 85, color: 2 },
        { id: "w", label: "ADR writer", sub: "draft ADR", x: 32, y: 85, color: 2 }
      ], edges: [
        { from: "u", to: "s" }, { from: "s", to: "r" }, { from: "r", to: "a" }, { from: "a", to: "t" },
        { from: "t", to: "v" }, { from: "v", to: "w" }, { from: "w", to: "s", label: "draft", curve: 30 }
      ] }, caption: "Supervisor decides if output is good enough or must be revised; final decision is the human's." },
      "Agent roles: requirements agent (structured input), alternatives agent (3-5 options), trade-off analyst (performance, security, maintainability, cost), reviewer (NFR coverage, risks, consistency), ADR writer, supervisor. Benefits: focused sub-tasks, specialisation, explicit supervised reasoning, links to ADR and score matrix.",
      "**Graph RAG:** architectural knowledge is a network of requirements, ADRs, C4 components, incidents, trade-offs and constraints; extract entities and relationships into a knowledge graph (triplets subject-predicate-object with natural-language descriptions) so retrieval answers 'which solutions did we reject?' and 'which components are affected by this change?'. Pipeline: documents, extraction, knowledge graph, graph RAG retrieval, prompt with precise context, 3-5 alternatives, ADR and score matrix."
    ] }
  ],
  pitfalls: ["AI is blind to team skills and budget: always add them in the criteria or human review."]
},
{
  id: "re-fundamentals", title: "Requirements engineering fundamentals and AI-in-RE research", priority: 32, tier: "possible",
  freq: "Topic 4 lecture (first and last parts)", marks: "4-8 marks",
  summary: "**RE is a cross-cutting critical success factor (only 31% of projects succeed); classic RE has analysis (elicitation, interpretation, negotiation, documentation, validation) and management (change, tracing); AI scales it but needs human validation; the research and adoption slides are labelled non-examinable.**",
  mnemonic: "31-50-19: success, challenged, failed",
  source: ["CT4111_Notes_04_Requirements_Engineering"],
  sections: [
    { heading: "Why RE matters and why it is hard", items: [
      "Standish CHAOS 2020: **31% successful** (on time, budget, scope), **50% challenged**, **19% failed** (cancelled or unused). Monserrat et al. 2026: 30 experts, 49 critical success factors in 6 categories (team, organisational, technical, development, process and PM, project). Requirements-related: detailed requirements analysis, involvement of all participants, good communication, scope management, stakeholder management, change management.",
      "RE is hard at scale: elicitation of abstract needs, structured documentation, validation and negotiation (traceability, conflict detection), management (change control, baselines); millions of text artefacts, ambiguity, manual traceability cost."
    ] },
    { heading: "Classical RE process (Pohl)", items: [
      "**Requirements analysis (iterative):** elicitation (identify stakeholders and sources, gather raw requirements), interpretation (structure, classify, refine), negotiation (dependencies, inconsistencies, prioritisation), documentation (specify), validation (correctness, completeness, consistency).",
      "**Requirements management:** change management (handle requests, versions, propagate), tracing (record sources and how requirements are implemented).",
      "**SRS (IEEE 830-1998, ISO/IEC/IEEE 29148:2018):** context and scope, assumptions, stakeholders and user classes, system boundary, glossary; functional requirements (use cases, user stories, business rules), data, interfaces, non-functional (performance, security, reliability, usability, portability, maintainability), regulatory (GDPR), traceability matrix, acceptance criteria, prioritisation (MoSCoW: Must, Should, Could, Won't), versioning."
    ] },
    { heading: "AI in RE: opportunities and risks", items: [
      "Opportunities: mining requirements from diverse sources, clustering feedback, LLM interviews and guides, meeting summaries. Risks: hallucinated requirements, bias towards vocal users, privacy (GDPR). Vision: AI augments, the engineer governs.",
      "Research (non-examinable): LLMs without agents (elicitation, specification, analysis and QA, reviews); **NICE** (non-functional requirement identification, classification, explanation with small language models: GPT-4o generates synthetic labelled data, T5/Llama 3.1/Phi-3 fine-tuned, multi-label F1 about 0.90, cheaper and faster than large LLMs); **multi-agent requirements analysis** (Sami et al.): Product Owner, Developer, QA and Manager agents generate user stories, check them (INVEST, ISO 29148), prioritise together, and merge a final ranking; limits: no baseline, tiny evaluation, LLM grading its own output.",
      "Adoption (non-examinable): Stack Overflow 2024 about 62% of developers use or plan to use AI tools; Copilot study 55% faster task completion (Peng 2023); only 14% of 74 AI+RE studies have industrial validation; accelerators: domain-tuned models/RAG, tool-native integration (DOORS, Jira), standards, longitudinal studies."
    ] }
  ],
  pitfalls: ["Spending time memorising the research papers: the lecture marks that part non-examinable."]
},
{
  id: "ai-code-review", title: "How the Claude Code team does code review", priority: 34, tier: "possible",
  freq: "Topic 11 article 3", marks: "4-8 marks",
  summary: "**Anthropic moved most code reading to machines with layered checks and human approval scaled to risk, rejecting 'a human read it' as a proxy for safety; the goal is less human time per change with no more reverts, backed by fast rollback; critics question self-review independence and generalisability.**",
  mnemonic: "Layers, risk-scaled humans, fast undo",
  source: ["CT4111_Notes_11e_Article_Code_Review", "CT4111_Notes_11_Emerging_Topics"],
  sections: [
    { heading: "Main points", items: [
      "Context (Osmani, Westlee Lunt, Wang, Oct 2026): about 90% of Claude Code's code is written by Claude; about 2,500 changes landed per day in May, 30,000+ in September in the monorepo; merged PRs more than doubled while share reverted fell by over 40%.",
      "Review was not dropped: reading moved to machines; human attention is the scarce resource spent according to risk; fast undo is the safety net. Two jobs of review: find problems before shipping; build shared understanding.",
      "**Layers:** (1) before PR: tests and build, fresh-context subagent reviews diff; (2) AI review on every PR; (3) separate security review blocks merge; (4) required CI (lint, types, tests, build); (5) human approval scaled to risk; (6) merge queue re-runs checks on latest main; (7) feature flags and staged release; (8) monitoring and fast rollback.",
      "AI reviewer: reads diff against whole repo and intent; several agents hunt bugs in parallel and others vote; only findings with enough agreement posted; tagged Important, Nit, Pre-existing. Instruction files: **CLAUDE.md** (stack, conventions, goals) and **REVIEW.md** (code owners define what failure means, cap nits).",
      "Human approval by risk: low risk none once checks pass; medium one; high two. Tier set by the change not the author; an agent's approval never counts as a person's; whoever prompted the agent must review the PR.",
      "Convergence: after three rounds ask the author to rethink; re-review only the new diff; mean reviews to pass 2.08 down to 1.32. Reviewer improvement: incidents and reverts become eval cases, scored daily.",
      "Humans keep judgement and accountability (what to build, risky code, architecture, owning outcomes); Claude does reading, verification and security scanning. 'Nobody keeps a complete mental model, and we do not think anyone needs to' (explainers on demand).",
      "Not solved: no circuit breakers when revert rates rise; agent author vs agent reviewer can loop; slowing down rejected."
    ] },
    { heading: "Critiques and discussion questions", items: [
      "'Claude reviewing Claude' (paddo): same-model reviewers share blind spots, not independent; second model found serious bugs in 29 of 51 passed changes; use a different model family. No one has a causal model to debug when something critical breaks.",
      "Self-reported figures, vendor promoting a paid product (about $15-25 per review), SOC 2 may require a second human, 30,000 changes is whole monorepo.",
      "Is this hand-built scaffolding the bitter lesson predicts will disappear, or durable engineering? What would you need to know before owning such a codebase?"
    ] }
  ],
  pitfalls: ["Treating the article's statistics as independent evidence: they are Anthropic's own."]
},
{
  id: "dot-and-swarm", title: "The Dot and the Swarm (Mollick)", priority: 35, tier: "low",
  freq: "Topic 11 article 2", marks: "4-6 marks",
  summary: "**Mollick admits he wrongly expected humans to design agent organisation for years; applying the bitter lesson, models organise themselves (a personal agent 'dot' and a 10,000-agent 'swarm' that attacked Navier-Stokes), so what remains is choosing the target and checking results, with the principal-agent problem still open.**",
  mnemonic: "Dot = personal agent, Swarm = self-organising agents; specify and verify",
  source: ["CT4111_Notes_11d_Article_Dot_and_Swarm"],
  sections: [
    { heading: "Summary", items: [
      "**Claim:** agents organise themselves; careful human design of agent organisations matters much less than he thought: 'organizing work is just one more thing AI can learn to do', a case of the bitter lesson (hand-built retrieval, prompt chains, planning prompts, org designs replaced by better models).",
      "**The dot:** 'clawlike' personal agents with access to your computer and accounts that react to events and message you first (e.g. spotting a wrong permit number, an expiring airline credit); what matters is what you no longer have to specify.",
      "**The swarm:** OpenAI reported about 10,000 agents over about 88 hours and 2.7 million messages tackling a Millennium Prize problem (Navier-Stokes) with little human coordination; at small scale, Codex started three agents unprompted and thirteen when told about three teams.",
      "Why less management is needed: no turf, promotions or free-riding; messages are cheap; communication cost (Brooks's law) does not bite. Limits: agents cannot replace much human work, long mundane tasks unproven, self-organisation can go rogue (Hugging Face incident); principal-agent problem remains (GPT-6.1 Astra shelved after acting without permission).",
      "Critiques: agents are near-identical copies of one model so shared errors look like consensus; the human role is a beekeeper (set conditions, watch aggregates, control edges); faster longer runs raise the cost of poor setup; the case had one principal and a machine-checkable proof (verifiable); the proof was under review; cost about 130 billion tokens (estimate about $22 million)."
    ] }
  ],
  pitfalls: ["Over-generalising from a verifiable maths problem with one owner to everyday team software work."]
}
];
