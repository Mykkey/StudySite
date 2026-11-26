module.exports = {
  name: "Generative AI for Software Engineering",
  evidence: "past-papers",
  exam: {
    summary: [
      "2 hours, written exam (70% of the module); you MUST get 40% in this exam to pass the module (else INC).",
      "Section 1: answer 2 of 3 questions (Q1-Q3). Section 2: answer 2 of 3 questions (Q4-Q6). So 4 questions in total.",
      "Every question is worth 25 marks, 'marked equally'. Questions have lettered parts with marks in brackets, e.g. (a) [10], (b) [5], (c) [10].",
      "Roughly 4.8 minutes per 5 marks: about 28-30 minutes per question, leaving ~5 minutes spare. Aim for 1 distinct, named point per mark."
    ],
    structure: [
      { label: "Section 1 (Q1-Q3), answer 2", detail: "Foundations and early lifecycle: modes of AI use, definitions, requirements engineering (AI4RE), prompts, ADRs and design, SDLC phases, SE principles, RAG." },
      { label: "Section 2 (Q4-Q6), answer 2", detail: "Later lifecycle and society: testing and TDD, maintenance (modification types, fault localisation, library migration), static analysis agents, Sutton's bitter lesson, legal and ethical risks." },
      { label: "Typical part types", detail: "Define/distinguish [8-10]; recommend + justify [5]; list/describe components [3-4]; 'propose a detailed prompt' [12]; 'outline with a diagram' [9-10]; opinion with two reasons [8]." },
      { label: "Bonus practice question", detail: "The sample paper adds a 4th Section 2 question (mutation testing, need for GenAI in static analysis, bias/stereotypes, verifiable tasks). Treat it as fair game." }
    ],
    freq: [
      { topic: "Modes of AI use (conversational / editing / agent)", count: 1, of: 1 },
      { topic: "Definitions (GenAI, ML, guardrails, self-play, HITL)", count: 1, of: 1 },
      { topic: "AI4RE process and resources", count: 1, of: 1 },
      { topic: "ADR components and GenAI benefits", count: 1, of: 1 },
      { topic: "SDLC six phases and where to use GenAI", count: 1, of: 1 },
      { topic: "Changed SE principles (DRY, abstraction, reqs before code, IaC)", count: 1, of: 1 },
      { topic: "RAG", count: 1, of: 1 },
      { topic: "GenAI + TDD, test-suite prompting", count: 1, of: 1 },
      { topic: "Modification types, fault localisation and repair, library migration", count: 1, of: 1 },
      { topic: "Agentic static analysis triage and repair", count: 1, of: 1 },
      { topic: "Bitter lesson", count: 1, of: 1 },
      { topic: "Legal risks (IP, GDPR, liability, EU AI Act)", count: 1, of: 1 },
      { topic: "Mutation testing, bias, verifiable tasks (bonus Q)", count: 1, of: 1 }
    ],
    years: [
      { year: "Sample paper (the only paper available)", themes: [
        "Q1 Modes of AI use [10] + recommend a mode per scenario [5] + five definitions [10]",
        "Q2 AI4RE process and resources [10], programmatic prompt scenario [3], ADR components [4], GenAI benefits for ADRs [8]",
        "Q3 One SDLC phase for GenAI, refer to all six [12], changed SE principles [8], RAG [5]",
        "Q4 GenAI in TDD [9], detailed prompt for ManagePrint test suite [12], prompt changes that matter [4]",
        "Q5 Modification request types and GenAI [9], fault localisation and repair with diagram [10], library migration + sample prompt [6]",
        "Q6 Agentic static-analysis triage and repair with diagram [9], bitter lesson [8], legal risks for Irish loan startup [8]",
        "Bonus: mutation testing [6], need for GenAI in static analysis [5], bias and open weights [8], verifiable tasks [6]"
      ] }
    ],
    tips: [
      "Mark-per-point rule: if a part is worth 10, write about 8-10 distinct, named points; if 5, write 5. Use headed sub-parts (i), (ii), (iii) exactly as the question lists them.",
      "When a question says 'refer to X, Y and Z' (e.g. background vs foreground, sync vs async, human role) tick off each named item explicitly or you lose those marks.",
      "'Define and distinguish' means definition of each + a comparison on the same axes (use a table-like layout: role of human, context, output artefact, sync/async).",
      "'Propose a detailed prompt' questions: write the actual prompt text, with role, context, task, constraints, output format, examples. Then add 1-2 lines explaining why each part is there.",
      "Diagram questions: draw boxes for the human and for each GenAI agent, label the arrows (what is passed), and show the loop back. Label who does what.",
      "'In your opinion' questions: take a clear stance, give exactly the number of reasons asked (e.g. two), and acknowledge one counter-argument.",
      "Use lecture vocabulary: human in the loop, guardrails, context window, RAG, red-green-refactor, killed/surviving mutants, ADR, C4, modification request, GDPR principles, EU AI Act risk tiers.",
      "You can choose questions: pick the 2+2 where you can hit every sub-part. Read all six before choosing; do not pick a question whose final part you cannot answer."
    ],
    note: "There is only ONE (sample) past paper, so topic priority combines it with lecture emphasis: every theme in the sample paper is ranked first, then topics that received heavy lecture time (testing, maintenance, ethics) and finally topics with little or no examinable content (agent classification, tool set-up). The sample paper's freq entries are '1/1'; lecturer slides also list 'Some exam questions' (SDLC phases, jagged intelligence, chain of thought, tools for LLMs, help in the feedback phase), which are folded in."
  },
  hints: null
};
