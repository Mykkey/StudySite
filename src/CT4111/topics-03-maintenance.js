module.exports = [
{
  id: "modification-types", title: "Modification request types and GenAI roles", priority: 9, tier: "core",
  freq: "sample paper Q5(a) + Topic 8 (repeated slide)", marks: "9 marks (3 x 3)",
  summary: "**Modification requests split into Correction (corrective, preventive) and Enhancement (adaptive, perfective, additive); pick three and give two concrete GenAI contributions each.**",
  mnemonic: "CPAPA: Corrective, Preventive, Adaptive, Perfective, Additive",
  source: ["CT4111_Notes_08_Maintenance", "CT4111_Notes_09_Refactoring"],
  sections: [
    { heading: "Taxonomy (SWEBOK v4)", items: [
      { type: "diagram", kind: "tree", data: { root: { label: "Modification request", children: [
        { label: "Correction", children: [ { label: "Corrective" }, { label: "Preventive" } ] },
        { label: "Enhancement", children: [ { label: "Adaptive" }, { label: "Perfective" }, { label: "Additive" } ] }
      ] } }, caption: "The course focuses on corrective and preventive maintenance." },
      { type: "table", head: ["Type", "Meaning", "Two ways GenAI contributes"], rows: [
        ["Corrective", "Fix runtime errors, security vulnerabilities, emergency patches", "1) Analyse error logs and stack traces to pinpoint anomalies and root causes faster. 2) Surface similar past bugs from codebase history to speed resolution; generate a candidate patch and regression test."],
        ["Preventive", "Restructure and reduce technical debt to prevent future problems", "1) Scan dependencies for outdated or vulnerable libraries. 2) Prioritise what to refactor by risk level; suggest or apply refactorings (extract method, de-duplicate) with tests as safety net."],
        ["Adaptive", "Adapt to a changing operating environment (OS, library, platform, regulation)", "1) Monitor for compatibility issues before they cause problems (deprecations, API changes). 2) Scan the codebase and find all affected areas when a dependency changes; perform migration edits (e.g. library migration)."],
        ["Perfective", "Improve performance, maintainability or user experience", "1) Suggest code optimisations (query rewrites, indexing strategies). 2) Generate code for common patterns and boilerplate; improve readability and documentation."],
        ["Additive", "Add major new functionality after delivery", "1) Identify and prioritise candidate features from requests, usage data and environment. 2) Assess impact and assist with the necessary adaptations (generate code, tests, docs for the new feature)."]
      ] }
    ] },
    { heading: "Answer recipe", items: [
      "Choose three (corrective, preventive, adaptive are easiest). For each: one-line definition, then two numbered GenAI contributions with a concrete example, then (if time) the human check.",
      "Add a safeguard sentence: tests and version control validate AI changes; human reviews impact."
    ] }
  ],
  pitfalls: [
    "Mixing up perfective (improve existing qualities) and additive (add new functionality).",
    "Preventive is not bug fixing: it is restructuring to prevent future problems (reduce tech debt).",
    "Giving only one GenAI contribution per type: the question asks for two different ones."
  ]
},
{
  id: "fault-localisation-repair", title: "Fault localisation and repair with GenAI", priority: 10, tier: "core",
  freq: "sample paper Q5(b) + Topic 8 (many slides)", marks: "10 marks",
  summary: "**Run a human-guided loop: humans report and triage the bug and approve the fix; GenAI structures the report, understands the repo, localises the fault, explains it, generates candidate patches, and verifies them against tests and linters, repeating until validated.**",
  mnemonic: "Understand, Localise, Patch, Validate, Human approves",
  source: ["CT4111_Notes_08_Maintenance"],
  sections: [
    { heading: "Process diagram with roles", items: [
      { type: "diagram", kind: "graph", data: { title: "Fault localisation and repair loop (human vs GenAI)", directed: true, r: 24, height: 440, nodes: [
        { id: "h1", label: "Human", sub: "report, reproduce, triage", x: 10, y: 10, color: 0 },
        { id: "g1", label: "GenAI", sub: "structure bug report", x: 38, y: 10, color: 1 },
        { id: "g2", label: "GenAI agent", sub: "repo understanding + plan", x: 66, y: 10, color: 1 },
        { id: "g3", label: "GenAI agent", sub: "fault localisation", x: 90, y: 40, color: 1 },
        { id: "g4", label: "GenAI", sub: "patch generation", x: 66, y: 70, color: 1 },
        { id: "t1", label: "Tools", sub: "tests, linters, build", x: 38, y: 70, color: 2 },
        { id: "g5", label: "GenAI reviewer", sub: "verify vs intent", x: 10, y: 70, color: 1 },
        { id: "h2", label: "Human", sub: "review, approve, merge", x: 10, y: 40, color: 0 }
      ], edges: [
        { from: "h1", to: "g1", label: "unstructured report" },
        { from: "g1", to: "g2", label: "description, steps, expected, env" },
        { from: "g2", to: "g3", label: "resolution plan" },
        { from: "g3", to: "g4", label: "buggy region" },
        { from: "g4", to: "t1", label: "candidate patch" },
        { from: "t1", to: "g4", label: "fail: errors fed back", curve: 40 },
        { from: "t1", to: "g5", label: "pass" },
        { from: "g5", to: "h2", label: "patch + explanation" },
        { from: "h2", to: "h1", label: "reject: refine", curve: 40 }
      ] }, caption: "Blue/purple nodes are GenAI, green is tooling; humans bracket the loop." },
      "**Human software engineer:** reports and reproduces the bug, supplies failing tests and intent (commit message, expected behaviour), prioritises, chooses which AI output to trust, reviews and approves the patch, owns the outcome and accountability, checks for regressions.",
      "**GenAI roles:** (1) structure and summarise the bug report; (2) understand the repository (tree, signatures, summaries) and write a resolution plan with root-cause hypothesis; (3) localise the fault (search file, class, function, analyse dependencies, identify buggy region); (4) explain the code (rubber-duck line-by-line) and retrieve similar bug-fixes; (5) generate a patch; (6) verify it (fix goal, programmer intent).",
      "**Tools (non-AI):** compile, run test suite, linters, static analysis give feedback; repeat up to a limit then escalate to human."
    ] },
    { heading: "Research approaches covered (name at least two)", items: [
      "**SWE-GPT (process-centric; Repository Understander, Fault Localizer and Coder agents with tools such as repo structure, search class/function, git apply/diff; example issue #4253 to PR #4259 in GraphScope):** Stage 1 repository understanding (structure tree, navigation, summary, resolution plan with root-cause analysis), Stage 2 fault localisation (search, context, buggy region, reflection), Stage 3 patch generation with validation by lint tools and error messages, repeated up to a limit.",
      "**PReMM** (multi-method bugs, divide and conquer): prompt contains failing test spec and error, similar code segments from other files, invocation chains from tests to faulty methods, key tokens.",
      "**Fact selection problem:** which information matters most for repair? Mostly error message plus issue description; ultimately context-specific.",
      "**ContrastRepair:** conversation-based repair that adds contrastive test pairs (a failing test and a similar passing test) to focus the model.",
      "**RepairAgent:** an autonomous LLM agent moving between three states: understand the bug (tools run_tests, extract_tests, run_fault_localization), collect information to fix it (search_code_base, find_similar_api_calls, read_range, extract_method), try to fix it (write_fix, read_range), via express_hypothesis, discard_hypothesis, collect_more_information and goal_accomplished. **PATCH (4 stages: bug reporting by a tester agent, bug diagnosis and patch generation by a developer agent, patch verification by a reviewer agent, looping between generation and verification; augmented context = commit messages, dependencies, buggy method, similar code):** collaborating agents simulating developers: bug reporter (root cause), code explainer (method intent, rubber-duck), pattern summariser (retrieved similar fixes), patch generator, patch verifier (reviewer judging against intent). Collaboration beat single prompts.",
      "**Design issues:** LLM agent pipeline: design issue analysis agent (static analysis), planning agent, program analysis agents (fan-in/out, call dependencies, coupling), prompt-building agent, localisation ranking agent."
    ] },
    { heading: "Structured bug reports matter", items: [
      "Unstructured reports mix description, steps and environment; GenAI (BRMDS) extracts dimensions: environment, expected behaviour, actual behaviour, bug category, suggested solution, each with an instruction prompt (e.g. 'in no more than 15 words').",
      "Structured reports speed localisation and make later AI steps more accurate."
    ] },
    { heading: "Cautions", items: [
      "Models may hallucinate fixes or break other behaviour; patches that pass weak tests may not be correct; keep tests as the oracle and human review; avoid touching highly coupled code without extra tests."
    ] }
  ],
  pitfalls: [
    "Drawing the loop without labelling who is human and who is GenAI: the question asks you to identify both.",
    "Leaving out validation feedback (tests/lint) and the repeat-until-valid loop.",
    "Omitting localisation (the question is localisation AND repair)."
  ]
},
{
  id: "library-migration", title: "Library migration at scale with GenAI", priority: 11, tier: "likely",
  freq: "sample paper Q5(c) + Topic 9", marks: "6 marks",
  summary: "**Large codebases age unevenly; migrations (e.g. JUnit 3 to 4, Joda-Time to java.time) are slow manual work, so split them into discrete steps: find locations, transform each file with a detailed role-and-rules prompt, validate with traditional tools and tests, and release in paced batches for human review.**",
  mnemonic: "Find, Transform, Validate, Review, Pace",
  source: ["CT4111_Notes_09_Refactoring"],
  sections: [
    { heading: "Why and what", items: [
      "Third-party libraries age: modules fall behind with old versions, outdated APIs, deprecated frameworks. Google's **one-version policy**: every dependency stays up to date across the codebase to minimise drift.",
      "Updates cannot be fully automated, need extensive manual work and often take months or years (and by then must be repeated).",
      "GenAI enables rapid large-scale updates that were previously impractical (Google internal migrations case study, Nikolov 2025)."
    ] },
    { heading: "Example answer: Joda-Time to java.time in a 5000-file Java codebase", items: [
      "**Migration task:** replace every use of org.joda.time classes (Instant, Duration, DateTime) with java.time equivalents, fix imports, and keep behaviour identical, in thousands of files.",
      "**Pipeline:** (1) discovery with code search or static analysis lists affected files and call sites; (2) a deterministic tool does trivial rewrites where possible; (3) the LLM transforms each file with the prompt below; (4) validate: compile, run the file's tests, run linters, and a diff check that rejects unrelated changes (stray comments, reformatting); (5) failed files go to retry or a human; (6) small batches become PRs, paced so reviewers are not overwhelmed; (7) improve prompt from failures.",
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "Find affected files", sub: "search / static analysis" },
        { label: "LLM transforms file", sub: "detailed migration prompt" },
        { label: "Validate", sub: "build, tests, lint, diff checks" },
        { label: "Human review", sub: "small paced PRs" }
      ], direction: "row", loopBack: "failures: fix prompt, retry" }, caption: "Library migration pipeline." },
      { type: "code", text: "You are a senior Java engineer, expert in Joda-Time and java.time. Your task is to remove all usage of org.joda.time from the provided files and replace it with java.time equivalents, preserving behaviour exactly.\n\nRules:\n1. Replace joda.time.Instant with java.time.Instant. new Instant(Long.MAX_VALUE) becomes Instant.MAX; new Instant(0) becomes Instant.EPOCH; the millisecond constructor becomes Instant.ofEpochMilli(); getMillis() becomes toEpochMilli().\n2. Replace joda.time.Duration with java.time.Duration.\n3. Do not call Instant.now(); use our TimeSource.system().now().\n4. Remove all org.joda.time imports and add the needed java.time imports.\n5. Do NOT change anything unrelated: no renaming, no reformatting, no comment edits, no new logging.\n6. If a construct has no safe equivalent, leave it unchanged and add a TODO(joda) comment.\n\nOutput: only the full migrated file, followed by a list of any TODO(joda) items.\n\nFiles: [paste files]" },
      "Why it works: persona, explicit mapping rules, constraints against stray edits, fixed output format; prompts are treated as first-class, versioned artefacts. Human sets the rules from a hand-migrated sample."
    ] },
    { heading: "Lessons (Google)", items: [
      "Split migrations into discrete specialised steps (more reliable, easier to debug). Prefer traditional validation to catch model quirks (stray comments, unwanted edits); traditional steps are cheaper when touching thousands of files.",
      "Pace migrations so review teams are not overwhelmed; build tooling for peripheral tasks (review triage, coordination).",
      "Second example prompt from the lecture: JUnit 3 to JUnit 4: remove junit.framework imports, add import static org.junit.Assert.*, drop the TestCase base class, replace with annotations."
    ] }
  ],
  pitfalls: [
    "Giving only 'ask ChatGPT to migrate': the answer needs the task details, pipeline with validation, and an actual prompt.",
    "No validation and no human review step for the migrated code.",
    "Vague prompt: mapping rules and 'do not change anything else' are the key."
  ]
},
{
  id: "static-analysis-agents", title: "Agentic classification and repair of static-analysis warnings", priority: 12, tier: "core",
  freq: "sample paper Q6(a) + bonus Q(b) + Topic 9", marks: "9 + 5 marks",
  summary: "**A CodeCureAgent-style pipeline uses agents to (1) classify each warning as true or false positive using code-reading tools, (2) plan and generate a minimal fix, (3) validate with the analyser, compiler and tests, (4) rank or review the patch, and (5) hand it to a human; GenAI is needed because rule-based tools give many false positives, no context and no fixes.**",
  mnemonic: "Warn, Classify, Plan, Fix, Validate, Rank, Review",
  source: ["CT4111_Notes_09_Refactoring", "CT4111_Notes_08_Maintenance"],
  sections: [
    { heading: "Agentic approach and roles (diagram)", items: [
      { type: "diagram", kind: "graph", data: { title: "Agents for static-analysis warning classification and repair", directed: true, r: 24, height: 480, nodes: [
        { id: "sa", label: "Static analyser", sub: "SonarQube / Pylint warnings", x: 8, y: 10, color: 2 },
        { id: "cl", label: "Classifier agent", sub: "true or false positive?", x: 38, y: 10, color: 1 },
        { id: "tl", label: "Tools", sub: "read code/docs, find refs, search", x: 38, y: 42, color: 2 },
        { id: "fp", label: "False positive", sub: "suppress with justification", x: 70, y: 10, color: 3 },
        { id: "pl", label: "Planner agent", sub: "fix strategy, minimal change", x: 70, y: 42, color: 1 },
        { id: "fx", label: "Fixer agent", sub: "generate patch", x: 70, y: 74, color: 1 },
        { id: "va", label: "Validation", sub: "compile, tests, re-run analyser", x: 38, y: 74, color: 2 },
        { id: "rk", label: "Ranker / reviewer agent", sub: "score patches 0-3", x: 10, y: 60, color: 1 },
        { id: "hu", label: "Human", sub: "approve PR or suppression", x: 10, y: 88, color: 0 }
      ], edges: [
        { from: "sa", to: "cl", label: "warning" },
        { from: "cl", to: "tl", label: "investigate" },
        { from: "tl", to: "cl", label: "evidence", curve: 40 },
        { from: "cl", to: "fp", label: "FP" },
        { from: "cl", to: "pl", label: "TP" },
        { from: "pl", to: "fx", label: "plan" },
        { from: "fx", to: "va", label: "patch" },
        { from: "va", to: "fx", label: "fail: feedback", curve: 40 },
        { from: "va", to: "rk", label: "pass" },
        { from: "rk", to: "hu", label: "best patch" },
        { from: "fp", to: "hu", label: "confirm", curve: 35 }
      ] }, caption: "Each agent keeps a history of previous actions and outcomes as memory." },
      "**Lecture structure (CodeCureAgent, Joos 2026, slide figure):** (1) run static analysis on the target project; (2) a Classification sub-agent (LLM + tools, update-prompt loop) gives a TP/FP verdict; (3) a Repair sub-agent (LLM + tools) proposes a fix; (4) a Change Approver runs build, static analysis and tests; rejected goes back to repair, approved gives a plausible fix. Tool actions: read docs/code, find references/definitions, search patterns, propose fix/suppression, plan/classify/complete. The separate planner/fixer/ranker boxes in the diagram are a composite of CodeCureAgent and CORE (general-knowledge framing for an exam diagram).",
      "**CORE (Wadhwa 2024), 5 steps:** configure static tools in the build pipeline; process flagged files plus docs; Proposer LLM generates candidate revisions; prune revisions still flagged; Ranker LLM scores the rest (Strong Reject, Weak Reject, Weak Accept, Strong Accept) for the dev team.",
      "**Classifier agent:** decides true positive (TP) or false positive (FP) using tools (read documentation and code, find references and definitions, search patterns). Hallucination and shallow context are its main risk.",
      "**Planner / fixer agents:** propose the minimal fix (or a justified suppression); constrained to one warning at a time and to avoid new warnings.",
      "**Validation:** compile, run tests, re-run the analyser to confirm the warning is gone and no new ones appear; failures loop back with error summaries (limited iterations).",
      "**Ranker / reviewer agent (CORE style):** a second LLM scores patches 0 to 3 (0 strong reject for unrelated changes, 3 strong accept: only edits that fix the warning with least impact); allowed exceptions (deleting comments) vs forbidden (adding print, renaming variables).",
      "**Human:** final approval of PR or suppression; the human also supplies project conventions and decides policy."
    ] },
    { heading: "Prompt components for an agent (CodeCureAgent)", items: [
      "Role and objectives (e.g. decide TP or FP); constraints (do not seek user assistance, avoid new warnings, one warning at a time); available tools and call format; input warning (e.g. 'class variable fields should not have public accessibility'); agent history (previous actions and outcomes: memory, prevents redundancy); response format (JSON for downstream processing)."
    ] },
    { heading: "Related approaches and failure modes", items: [
      "**iSMELL:** a tool selector LLM chooses which expert tools to run for the smell, tool results plus smell definitions and refactoring examples go to the LLM, which then refactors.",
      "**CORE:** propose fixes then rank them with a reviewer LLM, filtering by static analysis.",
      "Why static analysis alone struggles: false positives and low-priority warnings; non-local context needed to fix; broad multi-file impact; remediation may introduce new problems; different tools disagree.",
      "**Failure modes:** wrong classification (hallucination, ignoring context); insufficient context (poor warning docs); edge cases and mismatching conventions; remediation failures (incorrect changes, fixing multiple warnings, no support for creating/renaming/deleting files)."
    ] },
    { heading: "Is GenAI needed for static analysis? (bonus part, 5 marks)", items: [
      "**Yes, as a complement, not a replacement.** Traditional tools (SonarQube, ESLint, Pylint, PMD) are deterministic, fast and cheap but: rule-based with many false positives, no repo-wide context, cannot judge 'soft' rules or intent, give inconsistent results between tools, and mostly cannot fix issues.",
      "GenAI adds: triage and prioritisation of warnings, context-aware true/false-positive decisions, explanations in plain language, handling different ways of writing the same idea (smells, near-miss clones), enforcement of project guidelines beyond linters, and automated repair.",
      "Limits: non-deterministic, hallucination, cost, context limits, may miss real bugs. So **hybrid:** traditional tools detect and validate; GenAI interprets, ranks and repairs; human approves. Traditional validation is also cheaper at scale."
    ] }
  ],
  pitfalls: [
    "Diagram with one box 'AI fixes warnings': the question wants different agents with distinct roles (classify, plan, fix, validate, rank) and a human.",
    "Forgetting classification (false positives): the pipeline is classify THEN repair.",
    "Answering 'no need' for GenAI without acknowledging false positives and missing repair."
  ]
},
{
  id: "code-smells-refactoring", title: "Code smells, design issues and refactoring with GenAI", priority: 23, tier: "possible",
  freq: "Topic 9 (large) + Topic 8", marks: "5-10 marks",
  summary: "**Refactoring improves internal structure without changing behaviour; GenAI can detect smells, plan and implement refactorings (best in multi-agent loops with compile and test checks), but must be guided and validated because it changes semantics, deletes code or hallucinates.**",
  mnemonic: "As-is, To-be, Test coverage, Refactor with tests (4-step workflow)",
  source: ["CT4111_Notes_09_Refactoring", "CT4111_Notes_08_Maintenance"],
  sections: [
    { heading: "Smells and clones", items: [
      "**Code smell (Fowler 1999):** low-quality code that should be refactored, caused by tight schedules, negligence, shortcuts; degrades readability and maintainability.",
      "**Long Method** (too long, many comments suggest splitting). **Shotgun Surgery** (one change touches many classes). **Feature Envy** (a method uses another class's data more than its own). **God Class** (too many responsibilities, violates single responsibility). Refused Bequest (subclass ignores inherited behaviour).",
      { type: "table", head: ["Clone type", "Meaning"], rows: [
        ["Type 1", "Exact copy except whitespace and comments"],
        ["Type 2", "Same structure, renamed identifiers"],
        ["Type 3", "Similar with statements added, removed or changed"],
        ["Type 4", "Different code, same functionality (loop vs stream)"]
      ] },
      "**Test smells:** eager test (many production calls), duplicate assert, assertion roulette (undocumented multiple assertions), magic numbers; in manual tests: ambiguous test, conditional test, misplaced action/precondition/verification, unverified action.",
      "Manual detection is subjective; tools disagree (PMD, JDeodorant, DesigniteJava...). GenAI copes with different expressions of the same idea but has input and context limits: combine with tools."
    ] },
    { heading: "GenAI for smell detection", items: [
      "Direct detection with persona prompts: define the smell (e.g. God Class: many responsibilities, poor cohesion) and demand strict JSON output with classification True/False, supplied with metrics.",
      "iSMELL: select suitable tools, run them, prompt the LLM with results, definitions and examples. Filter and rank fix proposals (CORE). Iterative refinement with agents."
    ] },
    { heading: "Refactoring and workflow", items: [
      "**Refactoring:** improving internal structure without changing external behaviour. Code level (extract/inline method or variable, substitute algorithm, rename); architecture level (decompose monolith into services, extract authentication). 'Three strikes and you refactor.'",
      { type: "diagram", kind: "flow", data: { steps: [
        { label: "1 As-is structure", sub: "what to improve and why" },
        { label: "2 To-be structure", sub: "refactoring strategies" },
        { label: "3 Test coverage", sub: "check and fill gaps" },
        { label: "4 Implement", sub: "small steps, tests as safety net" }
      ], direction: "row" }, caption: "General refactoring workflow." },
      "Prompting: naive unspecific prompt gives variable results; prompts naming the refactoring type and target method work better (Liu et al.).",
      "**RefAgent (multi-agent):** context retrieval tool (dependency graph, quality metrics), planner agent (JSON plan: refactor yes/no and instructions per class and method), generator agent, compiler agent (failed compile: request fix), tester agent (generate and run tests; if tests fail after 20 iterations keep the original code).",
      "Test refactoring: structured prompts with chain of thought (understand intent, recognise smells, apply refactoring rules, rewrite) plus rule knowledge (e.g. convert duplicate asserts to a parameterised test; add messages to asserts) beat naive prompts.",
      "Success is not only functional correctness: maintainability and readability are hard to quantify."
    ] },
    { heading: "Failure modes and mitigation", items: [
      "Semantic changes, unnecessary changes, deleted code, incorrect or inconsistent renaming, scoping and naming conflicts, wrong casts, incomplete refactoring, hallucinated APIs, syntax errors. Traditional refactoring engines also fail on edge cases.",
      "Mitigate: structured prompts with CoT, few-shot examples, different models, test and validation strategies, compile checks, human review; keep tests as safety net (and assess test quality).",
      "**Prompt debt:** brittle, model-dependent prompts that are hard to maintain; prevent by versioning and documenting prompts and constraining with evaluations and strict formats."
    ] }
  ],
  pitfalls: ["Saying AI refactoring is safe without tests: it can alter behaviour silently."]
},
{
  id: "maintenance-debt-triage", title: "Maintenance, technical debt and triage", priority: 28, tier: "possible",
  freq: "Topic 8 (first half)", marks: "5-8 marks",
  summary: "**Maintenance is the dominant lifecycle cost (60-80%); AI-generated code can accelerate duplication and technical debt, so AI must also be used to reduce maintenance; structured change management and bug reports make AI triage effective.**",
  mnemonic: "Maintenance eats 60-80%; debt compounds; structure helps AI",
  source: ["CT4111_Notes_08_Maintenance"],
  sections: [
    { heading: "Definitions", items: [
      "**Software maintenance (ISO/IEC/IEEE 14764):** the totality of activities needed to support a software system. **Sustainment:** keeping the system or service operational.",
      "**Maintainability (ISO/IEC 25010):** capability of a product to be modified by the intended maintainers effectively and efficiently. Characteristics: **analysability**, **changeability**, **stability** (unexpected effects), **modularity**, **reusability**, **testability**.",
      "Maintenance is the main cost driver (60-80% of costs). **Lehman's laws:** continuing change (systems must adapt or become less satisfactory) and increasing complexity (unless work is done to reduce it)."
    ] },
    { heading: "Emerging maintenance crisis and economics", items: [
      "Uncontrolled AI-accelerated growth: redundancy and inconsistency, compounding defects, shorter lifecycles. GitClear study of 211 million lines (2020-2024): code duplication and short-term churn up, reuse (refactored shared modules) sharply down; such issues rarely fail immediately and are easy to miss in review.",
      "Economics (James Shore): each month's output adds a maintenance burden; productivity drops, AI gains disappear quickly and leave a permanent maintenance penalty unless AI output quality is high; AI use for maintenance is essential."
    ] },
    { heading: "Technical debt", items: [
      "**Technical debt (Cunningham):** not-quite-right code causing extra work for the next developer; expedient now, costlier later; carry a little, pay it down quickly. Kinds: code, design, documentation, test.",
      "**AI faces of debt:** governance (over-reliance), prompt (unclear or undocumented prompts), model (variability across versions and providers), fast-integration (rapid unvalidated integration).",
      "**Technical deflation (Shapiro):** cleaning code is increasingly cheap, so debt may become an investment ('borrow expensive human hours, repay with cheap AI hours'), but friction still accumulates."
    ] },
    { heading: "Triage and planning", items: [
      "Systematic change management: track needs, reproducibility, classification, decisions in issue trackers and VCS; externalise implicit knowledge so AI can use it; overhead can cause omissions.",
      "GenAI can make records more explicit, structured and consistent; check alignment of documentation, tests and traceability links; give preliminary prioritisation (humans confirm); semantic search and question answering to localise functionality, data flow, errors.",
      "Structure matters: unstructured bug reports are converted into description, steps to reproduce, expected behaviour, environment (BRMDS).",
      "Challenges: code growth, tight coupling, inconsistent naming, legacy code without docs or tests, duplication, limited long-horizon planning, out-of-distribution new libraries; mitigate with structured prompts, few-shot examples, different models, tests.",
      "Static analysis and metrics (SonarQube, ESLint, Pylint): product vs process metrics; use them to guide AI (avoid touching highly coupled code without more tests); new AI-specific metrics: context limits, tokens, attempts, energy."
    ] }
  ],
  pitfalls: ["Quoting numbers without source: 60-80% (maintenance share), 211M lines (GitClear)."]
},
{
  id: "reverse-engineering-recovery", title: "Reverse engineering, re-engineering and architecture recovery", priority: 33, tier: "possible",
  freq: "Topic 9 (first half)", marks: "4-6 marks",
  summary: "**Reverse engineering recovers design, architecture and requirements from code; re-engineering restructures software into a new form (refactor, migrate, retire); GenAI helps summarise and classify but works best combined with traditional tools and indicators.**",
  mnemonic: "Recover, Restructure, Migrate, Retire",
  source: ["CT4111_Notes_09_Refactoring"],
  sections: [
    { heading: "Definitions", items: [
      "**Reverse engineering:** identify components and relationships to recover documentation and design: interfaces, architecture, technologies, domain rules; recover requirements from code or design; recover file or network formats; create diagrams at a higher abstraction level; prepare for migration. Domain knowledge needed.",
      "**Re-engineering:** restructuring into a new form: refactoring, renovation, re-implementation. Related: **migration** (run in a different environment, e.g. OS or database) and **retirement** (organised end of life).",
      "Success goes beyond functional correctness: maintainability, readability, extensibility are context-dependent and hard to quantify."
    ] },
    { heading: "Architecture recovery", items: [
      "Reconstruct the actual architecture from artefacts (code); labour-intensive and error-prone for big systems; needs judgement to bridge abstraction gaps; automation is limited (lexical info, no context or patterns, implicit dependencies missed). Example: SemArc clustering Bash files into modules and components.",
      "GenAI strengths: summarisation, classification of concepts vs design patterns, fault management; challenges: ambiguous names ('model' and 'view'), different implementation paths, frameworks and libraries.",
      "**Indicators workflow:** define the patterns and criteria to look for, determine the search strategy, run traditional tools, let the LLM interpret results (integrate GenAI with non-GenAI); deductive recovery via chain-of-thought prompting with indicators; visualise (layered views)."
    ] }
  ],
  pitfalls: ["Confusing reverse engineering (understanding) with re-engineering (changing)."]
}
];
