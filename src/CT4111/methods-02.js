module.exports = [
{
  id: "weighted-score-matrix", topicId: "architecture-design", title: "Score architecture alternatives with a weighted matrix",
  when: "Asked to compare architectural options against weighted criteria and pick one",
  mnemonic: "Weight x score, sum, pick, then add what AI is blind to",
  steps: [
    "1. List criteria with weights summing to 100% (e.g. performance 30, security 25, maintainability 25, cost 20).",
    "2. Score each alternative 0-10 per criterion.",
    "3. Multiply weight by score for each cell.",
    "4. Sum per alternative.",
    "5. Pick the highest, then check human-only factors (team skills, budget).",
    "6. Record it in an ADR (Proposed, then Accepted)."
  ],
  example: {
    problem: "Slide scores: Monolith 8,7,6,9; Micro 6,9,7,6; Serverless 7,8,9,7; Hybrid 8,8,8,8.",
    solution: [
      "Monolith: 0.3x8 + 0.25x7 + 0.25x6 + 0.2x9 = 2.4+1.75+1.5+1.8 = 7.45",
      "Micro: 1.8+2.25+1.75+1.2 = 7.00",
      "Serverless: 2.1+2.0+2.25+1.4 = 7.75",
      "Hybrid: 2.4+2.0+2.0+1.6 = 8.00, so Hybrid wins."
    ]
  }
},
{
  id: "mutation-ratio", topicId: "mutation-testing", title: "Compute a mutation ratio",
  when: "Given counts of killed, surviving and equivalent mutants",
  mnemonic: "Killed over (Total minus Equivalent)",
  steps: [
    "1. Count total mutants.",
    "2. Remove equivalent mutants (undetectable) from the denominator.",
    "3. Divide killed by the remaining total.",
    "4. Surviving non-equivalent mutants show which tests to add."
  ],
  example: {
    problem: "20 mutants: 14 killed, 3 equivalent, 3 survived.",
    solution: ["Ratio = 14 / (20 - 3) = 14/17 = 0.824 (82.4%).", "Write tests that kill the 3 survivors."]
  }
},
{
  id: "stakeholder-prompt-steps", topicId: "ai4re-process", title: "Run the AI4RE Identify Stakeholders templates",
  when: "Asked to describe or apply the AI4RE process on a system description",
  mnemonic: "Fill, Group, Attach, Individuals, Validate",
  steps: [
    "1. Define placeholders: [DOMAIN], [SYSTEM], [FORMAT].",
    "2. Run Prompt 1: groups sorted by influence, classified System / Immediate / Wider, assumptions listed separately.",
    "3. Optionally prepare an org chart file (anonymised) to attach.",
    "4. Run Prompt 2: map groups to individuals or roles, state assumptions, keep group names identical.",
    "5. Validate with domain experts before planning interviews."
  ],
  example: {
    problem: "Restaurant adds delivery with Google Maps routing and e-bike riders.",
    solution: ["Prompt 1 gives Customers, Owner, Riders (System, High); Payment providers (Immediate, High); Owner's son (Wider, Low).", "Without an org chart Prompt 2 output is illustrative only; confirm with the owner."]
  }
}
];
