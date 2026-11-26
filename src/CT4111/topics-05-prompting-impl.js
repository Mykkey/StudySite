module.exports = [
{
  id: "programmatic-prompts", title: "Programmatic prompts: LLM as an API", priority: 16, tier: "likely",
  freq: "sample paper Q2(b) + Topic 3", marks: "3 marks",
  summary: "**A programmatic prompt is one built by a program and consumed by a program: your code assembles a prompt, calls the LLM through an API, and parses the structured output into the next step, e.g. automatic bug-report classification in a CI script.**",
  mnemonic: "Program in, program out",
  source: ["CT4111_Notes_03_Prompting_and_Context", "CT4111_Notes_04_Requirements_Engineering"],
  sections: [
    { heading: "Three workflows and who creates / consumes the prompt", items: [
      { type: "table", head: ["Setting", "Prompt and context created by", "Output consumed by"], rows: [
        ["Standalone chatbot (chat UI)", "Human", "Human"],
        ["Chatbot integrated with codebase (IDE prompt)", "Human (plus tool-added context)", "Human"],
        ["Programmatic prompt (LLM as an API)", "Program", "Program"]
      ] },
      "Example from lecture: using the IDE interactively is human/human; 'our team's scripts for bug classification' is program/program."
    ] },
    { heading: "Scenario answer (3 marks)", items: [
      "**Scenario:** a team's CI script receives each new bug report, builds a prompt from a template (instruction, project context, the report text, a few labelled examples, output format 'respond only with JSON {severity, component, duplicate_of}'), calls the LLM API, validates and parses the JSON, then sets labels and assignee in the issue tracker; low-confidence or invalid results go to a human.",
      "**Why it fits:** repetitive, high-volume, well-defined text task; no human in the loop for each call; the LLM replaces training a custom classifier (new task = new prompt).",
      "**Other scenarios:** NFR classification of requirements documents; extracting API endpoints into JSON; generating commit messages or release notes; summarising logs; PII redaction; test-data generation; code-review comments on every PR; migrating thousands of files with a fixed prompt (library migration).",
      "**Design points:** explicit output format (JSON) and validation with retry because there is no guarantee of compliance; system prompts and templates (Ollama SYSTEM); few-shot examples; low temperature for consistency; handle cost, latency, rate limits; protect privacy of data sent; version and test prompts like code."
    ] }
  ],
  pitfalls: ["Giving a chatbot scenario: the point is that no human types the prompt or reads the raw output."]
},
{
  id: "prompt-engineering", title: "Prompt engineering for code", priority: 20, tier: "possible",
  freq: "Topics 2 and 3 (two lectures) + labs", marks: "5-12 marks",
  summary: "**A good prompt has instruction, context, input data and output indicator; be specific, say what to do rather than what not to do, give examples (few-shot), allow reasoning (chain of thought), fix the output format, and iterate: test, analyse, improve.**",
  mnemonic: "I-C-I-O: Instruction, Context, Input, Output; then iterate",
  source: ["CT4111_Notes_03_Prompting_and_Context", "CT4111_Notes_02_Topic_2"],
  sections: [
    { heading: "Paradigm shift and elements", items: [
      "Old deep learning: pre-train then fine-tune on many labelled examples; new task needs new data and training. **Now: train, prompt, predict**: new task without retraining by describing it.",
      "**Prompt:** a set of instructions and input that guides what response you get. **Elements:** Instruction (task, a verb: write, classify, summarise), Context (external information steering the model), Input data (the question or data), Output indicator (type or format).",
      "Anatomy variant (Topic 2): Context, Task, Requirements, Constraints. Good vs bad: 'Write a Python function that sorts a list of dictionaries by the price key ascending; handle missing keys gracefully' beats 'Write a function to sort data'.",
      "Sample prompt: 'Create a Python Flask REST API with GET /users, GET /users/:id, POST, PUT, DELETE; include validation and error handling; in-memory store.'"
    ] },
    { heading: "Practical tips", items: [
      "**Instruction:** use a verb, experiment with wording, headers like ### Instruction ###.",
      "**Specificity:** descriptive and detailed prompts work better, but overly long prompts can hurt; avoid imprecision ('2-3 sentences', not 'briefly'; 'for high school students').",
      "**Do or do not:** LLMs tend to do things they are told NOT to do; say what to do, give fail cases, say 'if you do not know say I do not know'.",
      "Use AI to convert a bad prompt into a good one (e.g. rewrite and critique user stories).",
      "**Few-shot prompting:** 1-5 examples in the prompt. Pros: better performance, format specified, low effort. Cons: sensitive to number and choice of examples; hard for complex tasks. LLMs, like humans, do better with examples, struggle with negatives, underspecified tasks and irrelevant information, and prefer first and last items (primacy and recency).",
      "**Chain-of-thought (CoT):** model reasons step by step before answering. Pros: solves complex problems, errors visible. Cons: long output, more computation, errors in steps, may loop. **think tags:** a convention giving a space for reasoning, not a built-in function; many UIs hide it.",
      "**Output formatting:** explicit instructions (single code snippet, JSON) give consistency and allow processing; no guarantee, so retry if invalid.",
      "**Iterative design:** simple zero-shot test; then improve (change instructions, add examples, more CoT); analyse output (ambiguous or incorrect? over- or under-specified? style/format right?).",
      "Managing ambiguity: identify missing or conflicting requirements, ask questions, state assumptions, do not generate code until uncertainties are resolved. Critique-revise loops and incremental prompting.",
      "Best practices: start small, iterate, give relevant code, specify constraints (performance, security), use guardrails (types, interfaces, tests), request explanations, define success criteria, review and refine."
    ] },
    { heading: "Risks of generated code", items: [
      "Next-token prediction hallucinates: fabricated libraries and APIs, false logic. Security and legal: vulnerabilities, sending proprietary code to third parties, copyright and licence violations. Misaligned agents may modify tests to pass them.",
      "Prompts for reuse and maintainability: write prompts that can be reused, encourage clean modular documented code."
    ] }
  ],
  pitfalls: ["Writing 'don't do X' lists without positive instructions.", "Assuming the output format will always be obeyed."]
},
{
  id: "implementation-workflows", title: "Implementation workflows: perspectives and five levels of AI adoption", priority: 24, tier: "possible",
  freq: "Topic 6 lecture", marks: "6-10 marks",
  summary: "**Five workflows with increasing AI autonomy (reviewer, support, junior developer, test-driven, vibecoding), each with different pros, cons and best-fit tasks, viewed through four perspectives: prompting as specification, human in the loop, embodied agents, agents as an orchestra.**",
  mnemonic: "Review, Support, Junior, Test, Vibes (RSJTV)",
  source: ["CT4111_Notes_06_Implementation_Workflows"],
  sections: [
    { heading: "Four perspectives", items: [
      "**1 Prompting as specification:** in traditional SWE code defines what and how; with LLMs they decouple. LLMs cannot guess the 'what', so the developer must specify it thoroughly: more emphasis on requirements engineering.",
      "**2 Human in the loop:** a human for difficult decisions, responsibility for quality and adverse outcomes; needs skilled humans but LLMs may cause deskilling or skill shift: necessary safeguard or false sense of security?",
      "**3 Embodied agents:** with shell access (cd, ls, cat) an agent 'exists' in a place, can move and interact, and can have different instructions per location: an actor, not a stateless advisor.",
      "**4 Agents as an orchestra:** run many agents (e.g. LangChain) with roles, tools and locations; you are the conductor; e.g. an agent per failed test, a merging agent, an implementing agent."
    ] },
    { heading: "Five workflows", items: [
      { type: "table", head: ["Workflow", "How", "Pros", "Cons / best when"], rows: [
        ["0 No AI", "Dev implements, human PR review", "High quality, no compute cost, strong codebase awareness", "Slow, limited by team skills, lazy 'LGTM' reviews, knowledge loss when devs leave"],
        ["1 LLM as reviewer", "Dev implements; LLM reviews PR; discussion with LLM", "Rapid review and back-and-forth; developer keeps awareness", "Less cross-pollination and mentoring (safeguard: knowledge-sharing sessions); does not replace linters/tests; substitute or additional to human?"],
        ["2 LLM as support", "Dev implements with LLM help (search, explain, implement, trace, brainstorm edge cases, pre-review)", "Fully in loop, high expertise, no org change, low risk", "Limited speed-up; deskilling unclear. Best when LLM has context (RAG, MCP), dev keeps control, task needs human expertise"],
        ["3 LLM as junior developer", "Ticket assigned to agent; agent opens PR; human reviews", "Very rapid; control via issue and review", "Review becomes bottleneck; reviewers rarely validate everything so hallucinations slip through. Best with strong quality safeguards, well-specified incremental tasks, clear context"],
        ["4 LLM in TDD", "Dev writes tests; agents implement until pass", "Removes review bottleneck; requirements enforced by tests", "Needs thorough tests; LLM may cheat tests; LLM lock-in; token cost"],
        ["5 Vibecoding", "LLM writes ticket, code, review; human just uses product", "No or low skills; quick start", "Low quality, hard to control, correctness unknown. Best for rapid prototypes with no reuse, hackathons, unfamiliar language"]
      ] },
      "Summary line from lecture: review = quick turnaround but risks technical debt; support = maintain quality, limited speed; junior = faster, reviewing is the bottleneck; test = expensive upfront, hard to maintain; vibes = requires no expertise, very rapid, inflexible.",
      "Skills: reusable instruction bundles (e.g. test-generation skill with steps and constraints) are part of agent workflows."
    ] }
  ],
  pitfalls: ["Calling vibecoding 'bad' without saying when it is appropriate (prototypes, hackathons)."]
},
{
  id: "version-control-ai", title: "Version control for AI-assisted development", priority: 29, tier: "possible",
  freq: "Topic 2 lecture + lab", marks: "4-6 marks",
  summary: "**Version control provides auditability and recoverability: commit before an AI works, give it its own branch, review its diff and merge only if it holds up; treat the AI like a junior developer.**",
  mnemonic: "Commit, Branch, Diff, Review, Merge-or-Revert",
  source: ["CT4111_Notes_02_Topic_2"],
  sections: [
    { heading: "Git model", items: [
      "Four places: **working tree** (files now), **staging area** (selected for next commit), **local repository** (.git history, offline), **remote repository** (shared).",
      "Commands: git add, commit, push move changes down; clone, pull bring them back; status shows state; **diff** shows unstaged changes; git show shows what a commit changed; log reads history; **git restore** discards uncommitted work; **git revert** undoes a shared commit.",
      "A **commit** is a saved snapshot (who, when, why). A **branch** is a parallel line of development (one per feature or fix); merging combines lines, **conflicts** appear when the same lines changed and need human resolution.",
      "GitHub/GitLab host remotes and add pull requests (merge requests), review threads, issues and permissions (not part of git). **The diff is the unit of review; the PR is the unit of decision.**"
    ] },
    { heading: "Good practice with AI", items: [
      "**Commit before** setting an AI tool to work: a clean working tree means git diff shows exactly what it did. If wrong: restore or revert.",
      "Treat the AI like a **junior developer**: its own branch, review its diff, merge only if it holds up. A repository agent works on the repo directly; automated review agents read diffs.",
      "Benefits: auditable record of all AI and human changes; ability to revert errors; version control adds guardrails to AI.",
      "Lab: fork a repo, make a small change on a branch using AI, open a PR, accept it on your fork."
    ] }
  ],
  pitfalls: ["Letting an agent edit an uncommitted working tree: you cannot separate its changes from yours."]
},
{
  id: "llm-concepts", title: "LLM concepts: tokens, context, hallucination, jagged frontier, chain of thought, tools", priority: 26, tier: "possible",
  freq: "Topic 1 'some exam questions'", marks: "3-6 marks",
  summary: "**An LLM predicts the next token from a limited context window; it can seem brilliant and fail on easy tasks (jagged frontier), hallucinate confidently, and becomes useful through chain of thought, tools, RAG and agentic harnesses.**",
  mnemonic: "Predict, Context, Jagged, Hallucinate, Think, Tools",
  source: ["CT4111_Notes_01a_Overview"],
  sections: [
    { heading: "Concepts and exam-style answers", items: [
      "**Next-token predictor:** generates one token at a time, appending it to the context and repeating; 'stochastic parrot' view: just prediction, yet it learns to plan ahead to produce coherent text. Output is non-deterministic.",
      "**Jagged intelligence (jagged frontier):** AI exceeds humans on some specific tasks yet fails on others that seem easier, so performance is uneven and unpredictable (Dell'Acqua et al.).",
      "**False positives and false negatives about LLM ability:** false negative = 'it cannot solve this easy problem' (it could with a different prompt, newer model or another run); false positive = 'it solved this hard problem!' (maybe the task was in the training data or something similar was, e.g. coding a website or game from scratch).",
      "**Hallucination:** wrong answers, or specifically fabricated things (calling a non-existent function); like an exam student guessing to gain marks; sounds confident. Mitigate: context, RAG, tests, verification.",
      "**Chain of thought (CoT):** use extra tokens to think before answering (restate the problem and assumptions, infer step by step). Useful: improves accuracy on complex tasks, reveals reasoning errors (though UIs hide thinking tokens). Cost: more tokens and time.",
      "**Tools:** web search, calculator, search/run/test code on local disk, grep, shell, MCP servers. **RAG:** 'a Google search over your codebase'. **Reasoning models** and **agentic models** (LLM plus harness: proactive, long-running, goal-driven).",
      "**Making a one-token-at-a-time model useful:** loop it, prompt well, give context and tools, let it think, and wrap it in an agent with feedback from tests.",
      "**Context window:** limited tokens; middle content forgotten; long chats cost more.",
      "Statistics (for colour): 41% of code AI-generated; 80%+ of devs report productivity gains but only 33% trust AI output and 75% manually review every snippet."
    ] },
    { heading: "A day in the life: pre-AI vs post-AI engineer", items: [
      "Pre-AI: read bug tickets, load context into your brain, hand-write boilerplate, test manually, write docs from scratch. Post-AI: AI-prioritised tickets, one agent per ticket with red-green tests to confirm fixes, review generated code for style, consistency and bloat, auto-generated docs, time to plan architecture."
    ] }
  ],
  pitfalls: ["Calling hallucination 'lying': it is plausible-sounding prediction without grounding."]
},
{
  id: "agents-and-tools", title: "Generative vs agentic AI, agent types and tools", priority: 36, tier: "low",
  freq: "Topic 2 + Topic 5 (IBM classification marked not examinable) + getting-started lab", marks: "2-4 marks",
  summary: "**Generative AI is reactive and stateless per call; agentic AI runs a perceive-plan-act loop with memory and tools; the IBM agent taxonomy (simple reflex to hybrid) is not examinable; tool set-up slides (Copilot, Cline + Gemini) are practical only.**",
  mnemonic: "Reactive vs proactive; reflex, model, goal, utility, learning",
  source: ["CT4111_Notes_02_Topic_2", "CT4111_Notes_05_Design", "CT4111_Notes_01b_Getting_Started_AI_Coding"],
  sections: [
    { heading: "Generative vs agentic", items: [
      { type: "table", head: ["Generative AI", "Agentic AI"], rows: [
        ["Reactive prompt-response", "Proactive perceive-plan-act loop without manual triggers"],
        ["Content creation, translation, transformation", "Autonomous multi-step goal achievement"],
        ["Stateless per call unless augmented (RAG)", "Persistent memory and context across steps and sessions"],
        ["Outputs for human review", "Calls external tools, services, APIs"],
        ["Informational risk: hallucination checks", "Operational risk: strict guardrails and audit trails"]
      ] }
    ] },
    { heading: "Agent types (IBM, not examinable)", items: [
      "Simple reflex (if-then rules, no memory); model-based reflex (internal world model); goal-based; utility-based (maximises a utility score); learning agent (critic, learning element, problem generator); hierarchical (manager delegating to low-level agents); multi-agent systems; hybrid; **reflexion agent** (generator, search tool, revisor produce verifiable cited answers).",
      "Tools: GitHub Copilot, Claude Code, ChatGPT and Codex, Cursor, Amazon Q Developer."
    ] },
    { heading: "Getting started (lab, practical only)", items: [
      "Free options in VS Code: GitHub Copilot (Student Developer Pack via education.github.com; needs verified university email, name matching student card, proof of enrolment) and Google Gemini Flash with API key via the Cline extension (bring your own key, auto-approve settings). Treat API keys like passwords; never submit them."
    ] }
  ],
  pitfalls: ["Spending exam time on IBM agent types: slides say not examinable."]
}
];
