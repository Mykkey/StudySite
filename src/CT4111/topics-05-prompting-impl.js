module.exports = [
  {
    "id": "programmatic-prompts",
    "title": "Programmatic prompts: LLM as an API",
    "priority": 16,
    "tier": "likely",
    "freq": "sample paper Q2(b) + Topic 3",
    "marks": "3 marks",
    "summary": "**A programmatic prompt is one built by a program and consumed by a program: your code assembles a prompt, calls the LLM through an API, and parses the structured output into the next step, e.g. automatic bug-report classification in a CI script.**",
    "mnemonic": "Program in, program out",
    "source": [
      "CT4111_Notes_03_Prompting_and_Context",
      "CT4111_Notes_04_Requirements_Engineering"
    ],
    "sections": [
      {
        "heading": "Three workflows and who creates / consumes the prompt",
        "items": [
          {
            "type": "table",
            "head": [
              "Setting",
              "Prompt and context created by",
              "Output consumed by"
            ],
            "rows": [
              [
                "Standalone chatbot (chat UI)",
                "Human",
                "Human"
              ],
              [
                "Chatbot integrated with codebase (IDE prompt)",
                "Human (plus tool-added context)",
                "Human"
              ],
              [
                "Programmatic prompt (LLM as an API)",
                "Program",
                "Program"
              ]
            ]
          },
          "Example from lecture: using the IDE interactively is human/human; 'our team's scripts for bug classification' is program/program."
        ]
      },
      {
        "heading": "Scenario answer (3 marks)",
        "items": [
          "**Scenario:** a team's CI script receives each new bug report, builds a prompt from a template (instruction, project context, the report text, a few labelled examples, output format 'respond only with JSON {severity, component, duplicate_of}'), calls the LLM API, validates and parses the JSON, then sets labels and assignee in the issue tracker; low-confidence or invalid results go to a human.",
          "**Why it fits:** repetitive, high-volume, well-defined text task; no human in the loop for each call; the LLM replaces training a custom classifier (new task = new prompt).",
          "**Other scenarios:** NFR classification of requirements documents; extracting API endpoints into JSON; generating commit messages or release notes; summarising logs; PII redaction; test-data generation; code-review comments on every PR; migrating thousands of files with a fixed prompt (library migration).",
          {
            "type": "p",
            "text": "Design points"
          },
          "State the output format (such as JSON, a structured text format) and check it, retrying if wrong, because nothing guarantees compliance.",
          "Use system prompts and templates (a **system prompt** sets standing instructions) and **few-shot** examples (a few worked examples in the prompt).",
          "Use a low **temperature** (less randomness) for consistency.",
          "Handle cost, delay and request limits, protect private data, and version and test prompts like code."
        ]
      }
    ],
    "pitfalls": [
      "Giving a chatbot scenario: the point is that no human types the prompt or reads the raw output."
    ]
  },
  {
    "id": "prompt-engineering",
    "title": "Prompt engineering for code",
    "priority": 20,
    "tier": "possible",
    "freq": "Topics 2 and 3 (two lectures) + labs",
    "marks": "5-12 marks",
    "summary": "**A good prompt has instruction, context, input data and output indicator; be specific, say what to do rather than what not to do, give examples (few-shot), allow reasoning (chain of thought), fix the output format, and iterate: test, analyse, improve.**",
    "mnemonic": "I-C-I-O: Instruction, Context, Input, Output; then iterate",
    "source": [
      "CT4111_Notes_03_Prompting_and_Context",
      "CT4111_Notes_02_Topic_2"
    ],
    "sections": [
      {
        "heading": "Paradigm shift and elements",
        "items": [
          "**Old way**: **pre-train** a model, then **fine-tune** it on many labelled examples. A new task needed new data and training.",
          "**Now: train, prompt, predict**: describe a new task and the model does it without retraining.",
          "A **prompt** is the instructions and input that guide the response.",
          {
            "type": "p",
            "text": "Four elements"
          },
          "**Instruction**: the task, as a verb (write, classify, summarise).",
          "**Context**: outside information that steers the model.",
          "**Input data**: the question or data.",
          "**Output indicator**: the type or format wanted.",
          "Another breakdown (Topic 2): context, task, requirements, constraints.",
          {
            "type": "p",
            "text": "Good and bad"
          },
          "\"Write a Python function that sorts a list of dictionaries by the price key ascending; handle missing keys gracefully\" beats \"Write a function to sort data\".",
          "Sample prompt: \"Create a Python Flask REST API with GET /users, GET /users/:id, POST, PUT, DELETE; include validation and error handling; in-memory store.\""
        ]
      },
      {
        "heading": "Practical tips: wording",
        "items": [
          "**Instruction**: use a verb, try different wording, use headers such as `### Instruction ###`.",
          "**Specificity**: detailed descriptions work better, but very long prompts can hurt. Avoid vagueness (\"2-3 sentences\", not \"briefly\"; \"for high school students\").",
          "**Say what to do**: LLMs tend to do things they were told **not** to do. Give failure cases, and say \"if you do not know, say I do not know\".",
          "Use AI to turn a bad prompt into a good one (for example to rewrite and criticise user stories)."
        ]
      },
      {
        "heading": "Few-shot, chain-of-thought and output format",
        "items": [
          {
            "type": "p",
            "text": "Few-shot prompting"
          },
          "Put 1 to 5 examples in the prompt.",
          "Pros: better results, shows the format, little effort. Cons: sensitive to how many and which examples; hard for complex tasks.",
          "Like people, LLMs do better with examples, struggle with \"don'ts\", vague tasks and irrelevant information, and favour the first and last items (**primacy and recency**).",
          {
            "type": "p",
            "text": "Chain-of-thought (CoT)"
          },
          "The model reasons step by step before answering.",
          "Pros: solves harder problems, mistakes are visible. Cons: long output, more computing, errors within steps, may go in circles.",
          "**think tags** are a convention giving it a space to reason, not a built-in feature; many apps hide it.",
          {
            "type": "p",
            "text": "Output formatting"
          },
          "Ask explicitly (a single code block, JSON) for consistent results a program can process. There is no guarantee, so retry if invalid."
        ]
      },
      {
        "heading": "Iterating and best practice",
        "items": [
          {
            "type": "p",
            "text": "Iterative design"
          },
          "Start with a simple **zero-shot** test (no examples). Then improve: change instructions, add examples, ask for more reasoning. Check the output: unclear or wrong? too much or too little detail? right style and format?",
          {
            "type": "p",
            "text": "Handling unclear requirements"
          },
          "Identify missing or conflicting requirements, ask questions, state assumptions, and do not generate code until these are settled. **Critique-revise** loops (have it criticise then redo) and building up in small prompts help.",
          {
            "type": "p",
            "text": "Best practices"
          },
          "Start small and iterate, give the relevant code, state constraints (speed, security), use guardrails (types, interfaces, tests), ask for explanations, define what success looks like, review and refine."
        ]
      },
      {
        "heading": "Risks of generated code",
        "items": [
          "The model predicts likely next words, so it can invent libraries, functions and logic that do not exist or are wrong.",
          "Security and legal: vulnerabilities, sending private code to other companies, copyright and licence breaches.",
          "A **misaligned** agent (one pursuing something other than what you meant) may change the tests to make them pass.",
          "For reuse and maintenance, write prompts that can be used again, and ask for clean, modular, documented code."
        ]
      }
    ],
    "pitfalls": [
      "Writing 'don't do X' lists without positive instructions.",
      "Assuming the output format will always be obeyed."
    ]
  },
  {
    "id": "implementation-workflows",
    "title": "Implementation workflows: perspectives and five levels of AI adoption",
    "priority": 24,
    "tier": "possible",
    "freq": "Topic 6 lecture",
    "marks": "6-10 marks",
    "summary": "**Five workflows with increasing AI autonomy (reviewer, support, junior developer, test-driven, vibecoding), each with different pros, cons and best-fit tasks, viewed through four perspectives: prompting as specification, human in the loop, embodied agents, agents as an orchestra.**",
    "mnemonic": "Review, Support, Junior, Test, Vibes (RSJTV)",
    "source": [
      "CT4111_Notes_06_Implementation_Workflows"
    ],
    "sections": [
      {
        "heading": "Four perspectives",
        "items": [
          {
            "type": "p",
            "text": "1. Prompting as specification"
          },
          "In traditional programming the code says both **what** and **how**. With LLMs these come apart. The model cannot guess the \"what\", so the developer must specify it carefully: requirements work matters more.",
          {
            "type": "p",
            "text": "2. Human in the loop"
          },
          "A person makes the hard decisions and is responsible for quality and bad outcomes. This needs skilled people, but relying on LLMs may erode skills. Is it a real safeguard or false comfort?",
          {
            "type": "p",
            "text": "3. Embodied agents"
          },
          "Given a **shell** (command line: `cd`, `ls`, `cat`), an agent \"exists\" somewhere: it can move around, act, and follow different instructions in each folder. It is an actor, not just an adviser.",
          {
            "type": "p",
            "text": "4. Agents as an orchestra"
          },
          "Run many agents (for example with the **LangChain** library), each with its own role, tools and place; you are the conductor. For example one agent per failing test, one to merge, one to implement."
        ]
      },
      {
        "heading": "Five workflows",
        "items": [
          {
            "type": "table",
            "head": [
              "Workflow",
              "How",
              "Pros",
              "Cons / best when"
            ],
            "rows": [
              [
                "0 No AI",
                "Dev implements, human PR review",
                "High quality, no compute cost, strong codebase awareness",
                "Slow, limited by team skills, lazy 'LGTM' reviews, knowledge loss when devs leave"
              ],
              [
                "1 LLM as reviewer",
                "Dev implements; LLM reviews PR; discussion with LLM",
                "Rapid review and back-and-forth; developer keeps awareness",
                "Less cross-pollination and mentoring (safeguard: knowledge-sharing sessions); does not replace linters/tests; substitute or additional to human?"
              ],
              [
                "2 LLM as support",
                "Dev implements with LLM help (search, explain, implement, trace, brainstorm edge cases, pre-review)",
                "Fully in loop, high expertise, no org change, low risk",
                "Limited speed-up; deskilling unclear. Best when LLM has context (RAG, MCP), dev keeps control, task needs human expertise"
              ],
              [
                "3 LLM as junior developer",
                "Ticket assigned to agent; agent opens PR; human reviews",
                "Very rapid; control via issue and review",
                "Review becomes bottleneck; reviewers rarely validate everything so hallucinations slip through. Best with strong quality safeguards, well-specified incremental tasks, clear context"
              ],
              [
                "4 LLM in TDD",
                "Dev writes tests; agents implement until pass",
                "Removes review bottleneck; requirements enforced by tests",
                "Needs thorough tests; LLM may cheat tests; LLM lock-in; token cost"
              ],
              [
                "5 Vibecoding",
                "LLM writes ticket, code, review; human just uses product",
                "No or low skills; quick start",
                "Low quality, hard to control, correctness unknown. Best for rapid prototypes with no reuse, hackathons, unfamiliar language"
              ]
            ]
          },
          "Summary line from lecture: review = quick turnaround but risks technical debt; support = maintain quality, limited speed; junior = faster, reviewing is the bottleneck; test = expensive upfront, hard to maintain; vibes = requires no expertise, very rapid, inflexible.",
          "Words in the table: **PR** = pull request. **LGTM** = \"looks good to me\" (an approval without real checking). **MCP** = a standard way to connect tools and data to a model. **Cross-pollination** = team members learning from each other.",
          "Skills: reusable instruction bundles (e.g. test-generation skill with steps and constraints) are part of agent workflows."
        ]
      }
    ],
    "pitfalls": [
      "Calling vibecoding 'bad' without saying when it is appropriate (prototypes, hackathons)."
    ]
  },
  {
    "id": "version-control-ai",
    "title": "Version control for AI-assisted development",
    "priority": 29,
    "tier": "possible",
    "freq": "Topic 2 lecture + lab",
    "marks": "4-6 marks",
    "summary": "**Version control provides auditability and recoverability: commit before an AI works, give it its own branch, review its diff and merge only if it holds up; treat the AI like a junior developer.**",
    "mnemonic": "Commit, Branch, Diff, Review, Merge-or-Revert",
    "source": [
      "CT4111_Notes_02_Topic_2"
    ],
    "sections": [
      {
        "heading": "Git model",
        "items": [
          "Four places: **working tree** (files now), **staging area** (selected for next commit), **local repository** (.git history, offline), **remote repository** (shared).",
          "Commands: git add, commit, push move changes down; clone, pull bring them back; status shows state; **diff** shows unstaged changes; git show shows what a commit changed; log reads history; **git restore** discards uncommitted work; **git revert** undoes a shared commit.",
          "A **commit** is a saved snapshot (who, when, why). A **branch** is a parallel line of development (one per feature or fix); merging combines lines, **conflicts** appear when the same lines changed and need human resolution.",
          "GitHub/GitLab host remotes and add pull requests (merge requests), review threads, issues and permissions (not part of git). **The diff is the unit of review; the PR is the unit of decision.**"
        ]
      },
      {
        "heading": "Good practice with AI",
        "items": [
          "**Commit before** setting an AI tool to work: a clean working tree means git diff shows exactly what it did. If wrong: restore or revert.",
          "Treat the AI like a **junior developer**: its own branch, review its diff, merge only if it holds up. A repository agent works on the repo directly; automated review agents read diffs.",
          "Benefits: auditable record of all AI and human changes; ability to revert errors; version control adds guardrails to AI.",
          "Lab: fork a repo, make a small change on a branch using AI, open a PR, accept it on your fork."
        ]
      }
    ],
    "pitfalls": [
      "Letting an agent edit an uncommitted working tree: you cannot separate its changes from yours."
    ]
  },
  {
    "id": "llm-concepts",
    "title": "LLM concepts: tokens, context, hallucination, jagged frontier, chain of thought, tools",
    "priority": 26,
    "tier": "possible",
    "freq": "Topic 1 'some exam questions'",
    "marks": "3-6 marks",
    "summary": "**An LLM predicts the next token from a limited context window; it can seem brilliant and fail on easy tasks (jagged frontier), hallucinate confidently, and becomes useful through chain of thought, tools, RAG and agentic harnesses.**",
    "mnemonic": "Predict, Context, Jagged, Hallucinate, Think, Tools",
    "source": [
      "CT4111_Notes_01a_Overview"
    ],
    "sections": [
      {
        "heading": "Concepts: prediction, jagged ability and hallucination",
        "items": [
          "**Next-token predictor**: an LLM produces one **token** (word or word piece) at a time, adds it to the text and repeats. The \"stochastic parrot\" view says it is only prediction, yet it learns to plan ahead to write coherent text. Output varies between runs (**non-deterministic**).",
          "**Jagged intelligence** (jagged frontier): AI beats humans at some tasks yet fails at ones that seem easier, so its ability is uneven and unpredictable (Dell'Acqua et al.).",
          {
            "type": "p",
            "text": "Misjudging what an LLM can do"
          },
          "**False negative**: \"it cannot solve this easy problem\" (it might with another prompt, newer model or another try).",
          "**False positive**: \"it solved this hard problem!\" (perhaps it or something similar was in the training data, such as building a website or game from scratch).",
          "**Hallucination**: wrong answers, or things made up outright (calling a function that does not exist), said confidently, like a student guessing in an exam. Reduce it with context, retrieval, tests and checking."
        ]
      },
      {
        "heading": "Concepts: thinking, tools and context",
        "items": [
          "**Chain of thought** (CoT): use extra tokens to think before answering (restate the problem and assumptions, work step by step). It improves hard tasks and exposes reasoning errors (though apps often hide it), but costs tokens and time.",
          "**Tools**: web search, calculator, searching, running and testing code on disk, the command line, **MCP servers** (a standard way to plug tools in).",
          "**RAG**: a \"Google search over your codebase\".",
          "**Reasoning models** think before answering. **Agentic** models are an LLM plus a **harness** (the program around it that gives tools and loops): proactive, long-running, goal-driven.",
          {
            "type": "p",
            "text": "Making a one-token-at-a-time model useful"
          },
          "Run it in a loop, prompt well, give context and tools, let it think, and wrap it in an agent that gets feedback from tests.",
          "**Context window**: a limited number of tokens; the middle gets forgotten; long chats cost more.",
          "Statistics for colour: 41% of code is AI-generated; over 80% of developers report productivity gains, but only 33% trust AI output and 75% manually review every snippet."
        ]
      },
      {
        "heading": "A day in the life: pre-AI vs post-AI engineer",
        "items": [
          "**Before AI**: read bug tickets, hold the context in your head, hand-write routine code, test manually, write documentation from scratch.",
          "**After AI**: tickets prioritised by AI; one agent per ticket using failing-then-passing tests to confirm fixes; you review generated code for style, consistency and bloat; documentation is generated; more time to plan the architecture."
        ]
      }
    ],
    "pitfalls": [
      "Calling hallucination 'lying': it is plausible-sounding prediction without grounding."
    ]
  },
  {
    "id": "agents-and-tools",
    "title": "Generative vs agentic AI, agent types and tools",
    "priority": 36,
    "tier": "low",
    "freq": "Topic 2 + Topic 5 (IBM classification marked not examinable) + getting-started lab",
    "marks": "2-4 marks",
    "summary": "**Generative AI is reactive and stateless per call; agentic AI runs a perceive-plan-act loop with memory and tools; the IBM agent taxonomy (simple reflex to hybrid) is not examinable; tool set-up slides (Copilot, Cline + Gemini) are practical only.**",
    "mnemonic": "Reactive vs proactive; reflex, model, goal, utility, learning",
    "source": [
      "CT4111_Notes_02_Topic_2",
      "CT4111_Notes_05_Design",
      "CT4111_Notes_01b_Getting_Started_AI_Coding"
    ],
    "sections": [
      {
        "heading": "Generative vs agentic",
        "items": [
          {
            "type": "table",
            "head": [
              "Generative AI",
              "Agentic AI"
            ],
            "rows": [
              [
                "Reactive prompt-response",
                "Proactive perceive-plan-act loop without manual triggers"
              ],
              [
                "Content creation, translation, transformation",
                "Autonomous multi-step goal achievement"
              ],
              [
                "Stateless per call unless augmented (RAG)",
                "Persistent memory and context across steps and sessions"
              ],
              [
                "Outputs for human review",
                "Calls external tools, services, APIs"
              ],
              [
                "Informational risk: hallucination checks",
                "Operational risk: strict guardrails and audit trails"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Agent types (IBM, not examinable)",
        "items": [
          "**Simple reflex**: if-then rules, no memory. **Model-based reflex**: keeps an internal picture of the world.",
          "**Goal-based**: acts to reach a goal. **Utility-based**: picks what scores highest.",
          "**Learning**: improves itself, using a critic, a learning part and a part that suggests experiments.",
          "**Hierarchical**: a manager delegates to simpler agents. Also **multi-agent** systems and **hybrids**.",
          "**Reflexion agent**: a generator, a search tool and a reviser, producing answers with checked sources.",
          "Tools: GitHub Copilot, Claude Code, ChatGPT and Codex, Cursor, Amazon Q Developer."
        ]
      },
      {
        "heading": "Getting started (lab, practical only)",
        "items": [
          "Free options in VS Code: GitHub Copilot (Student Developer Pack via education.github.com; needs verified university email, name matching student card, proof of enrolment) and Google Gemini Flash with API key via the Cline extension (bring your own key, auto-approve settings). Treat API keys like passwords; never submit them."
        ]
      }
    ],
    "pitfalls": [
      "Spending exam time on IBM agent types: slides say not examinable."
    ]
  }
];
