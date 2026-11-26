module.exports = {
  name: 'Software Engineering III',
  evidence: 'past-papers',
  exam: {
    summary: [
      'Duration 2 hours. Answer any 3 of 4 questions (the lecturer says: attempt all four and the best three count). Each question is 20 marks, total 60 converted to a percentage.',
      'No MCQs. Every question is scenario-based (a company with a problem: a veterinary clinic, a delivery firm, a bank) and mixes short explanations, code/command writing and calculations.',
      'Reported question shapes for the current exam: Q1 has 4 parts, Q2 has 3 parts, Q3 has 3 parts, Q4 has 4 parts. About 3 of the 4 questions come from weeks 1-6; roughly half of one question comes from the last lecture (week 12: SLI/SLO/error budget).',
      'The paper is brand new each year: same flow as before, different content and different scenarios. Do not memorise last year\'s answers; learn the methods.'
    ],
    structure: [
      { label: 'Q1 (20)', detail: 'Part (a) = something from the Agile Manifesto (week 1: the 4 values and 12 principles). Rest = requirements and change management. "Where necessary, state any assumptions". Attributes of good requirements are flagged as important.' },
      { label: 'Q2 (20)', detail: 'Maven directory structure / pom.xml / Spring Boot pom (the "same question" as the pom one), plus Git: list and explain Git commands (about 10 marks), or "given this command, identify the problem and fix it" (last year it was a merge issue and how to resolve it).' },
      { label: 'Q3 (20)', detail: 'Docker: write/construct a Dockerfile (steps to construct) plus troubleshooting and Docker commands. GitHub Actions (workflow YAML) can also appear. Docker is a two-part question: part 1 Dockerfile, part 2 troubleshooting.' },
      { label: 'Q4 (20)', detail: '(a) SCA / software security or JaCoCo; (b) API design / OpenAPI; (c) unit tests + TDD (you must write unit tests) and a "what is wrong with this code" critique worth about 5 marks; (d) calculations: SLI, SLO, error budget (heavily from week 12).' }
    ],
    freq: [
      { topic: 'CI/CD pipeline, GitHub Actions, pipeline improvements/pitfalls', count: 6, of: 7 },
      { topic: 'Security fundamentals (vulnerability, countermeasure, zero-day, buffer overflow)', count: 5, of: 7 },
      { topic: 'Design patterns / refactoring (factory, polymorphism, OCP)', count: 4, of: 7 },
      { topic: 'Git commands / merge conflicts', count: 4, of: 7 },
      { topic: 'SAST vs DAST, SonarQube, OWASP ZAP, code coverage', count: 3, of: 7 },
      { topic: 'Docker / virtualisation / troubleshooting a failed deployment', count: 3, of: 7 },
      { topic: 'Formal specification (Z notation) - older syllabus', count: 3, of: 7 },
      { topic: 'Agile Manifesto / principles', count: 2, of: 7 },
      { topic: 'MTTD / MTTR / MTBF calculation', count: 2, of: 7 },
      { topic: 'JUnit test cases (Calculator add)', count: 1, of: 7 },
      { topic: 'Maven / build process', count: 1, of: 7 },
      { topic: 'SCA / dependency scan prioritisation', count: 1, of: 7 }
    ],
    years: [
      { year: '2019-20 (old syllabus)', themes: ['Q1 git commit sequence (4), architectural styles (8), IaaS/PaaS/SaaS (3), style vs pattern (5)', 'Q2 design patterns + UML (8), component services, hypervisors/Docker (6), proxy errors', 'Q3 continuous software development system (6), kernels, plugin architecture', 'Q4 CAP/ACID/BASE, VirtualBox networking, layered architecture'] },
      { year: '2021-22 (old syllabus)', themes: ['Section A: Z formal specification (surjective function, train booking, supermarket, football)', 'Section B: Secure by Design (cookies, XSS, SQL injection, password hashing, dictionary attacks)'] },
      { year: '2023-24 Semester 1 (answer all, 15 marks each)', themes: ['Q1 Agile manifesto + 12 principles (Soccermatic)', 'Q2 Z spec of a terminal Cursor', 'Q3 RFC 2828 vulnerability/countermeasure, zero-day lifecycle, buffer overflow', 'Q4 CI advantages/pitfalls, JUnit tests for Calculator.add'] },
      { year: '2023-24 Autumn (answer all, 15 marks each)', themes: ['Q1 Agile principles for a CRM system', 'Q2 Z spec Cursor again', 'Q3 Maven vs Gradle benefits, features, build steps', 'Q4 CI/CD goals + challenges (Jenkins, Docker), buffer overflow'] },
      { year: '2024-25 (any 3 of 4, 20 marks, CT417 lecturer)', themes: ['Q1 FoodieGo CI/CD improvements (8), git commands for feature branch (5), explain a GitHub Actions YAML (7)', 'Q2 SAST vs DAST, why in pipeline, role of coverage, SonarQube slow, ZAP failing, low coverage', 'Q3 vulnerability, countermeasure, zero-day lifecycle, buffer overflow + countermeasures', 'Q4 design patterns, refactoring, polymorphism, Factory, Open/Closed'] },
      { year: '2025-26 Semester 1', themes: ['Q1 SkyBankAI: failed docker pull log (git+docker diagnose), design GitHub Actions pipeline, risky pipeline, merge conflicts', 'Q2 SAST/DAST, ZAP failures, SonarQube slow, coverage tool', 'Q3 definitions, MTTD/MTTR/MTBF average, buffer overflow', 'Q4 refactoring, design patterns, abstract User + Factory'] },
      { year: '2025-26 Autumn', themes: ['Q1 GitHub Actions YAML + failed manifest unknown: find cause, rewrite build step with sha + latest tags, docker commands on staging, 4 workflow improvements', 'Q2 SAST/DAST, ZAP, SonarQube, coverage (same shape)', 'Q3 SCA findings table (pick two to fix), remediation workflow, MTTD/MTTR from timestamps, C strcpy overflow', 'Q4 refactoring + patterns (same as Semester 1)'] }
    ],
    tips: [
      'Spend about 36 minutes per question (120 min / 3) and about 1.8 minutes per mark. Attempt all four in the first hour if you can and finish the best three; the highest three count.',
      'Always answer scenario questions in the scenario (name the clinic/bank, name its services). Generic answers lose the application marks.',
      'Requirements/change questions: write "Assumptions:" first (2-3 bullets) then answer. This is explicitly rewarded.',
      'When asked to write code (Dockerfile, pom, workflow, JUnit, git commands) write it line by line with a one-line reason per line. Marks go to each correct instruction and its explanation.',
      'For "identify the problem in this code" give: the problem, why it is a problem (consequence), the fix, ideally a rewritten snippet. The lecturer says the flaws are design and intent flaws, not syntax errors.',
      'For calculations show the formula, the numbers, the unit conversion, the result and a one-line verdict (SLO met or not). Method marks survive arithmetic slips.',
      'Command questions: if you forget a command name, explain what it should do; "explain git commands if you forget them" earns partial credit.'
    ],
    note: 'Evidence is mixed. The three oldest papers (2019-22) and the two 2023-24 papers include topics no longer in the notes (architectural styles, Z notation, XSS and cookies, hypervisors). They are covered briefly in the low-priority "legacy" topic. The 2024-26 papers are the best guide to the the lecturer format, but the lecturer hints (below) override pure frequency: hinted topics are ordered first even where they never appeared in a past paper (requirements, Agile principles, Maven/pom, Git commands, API, TDD).'
  },
  hints: {
    source: 'Reported by the student from the lecturer; unverified',
    likely: [
      'Agile principles (Q1a: from the Agile Manifesto, week 1 slides)',
      'Requirements and change management (Q1), "where necessary, state any assumptions", same as the checkpoint requirement exercise',
      'Attributes of good requirements (Q1, flagged important)',
      'Git commands (list and explain, 10 marks), merge conflicts, merge issues and how to resolve them',
      'Given a command: identify the problem and how to fix it',
      'GitHub Actions',
      'Docker: write a Dockerfile (steps to construct), troubleshooting, Docker commands (this is the only Docker part)',
      'Maven directory structure, pom.xml files, Spring Boot (same question as the pom question, Q2)',
      'SCA security (Software Composition Analysis)',
      'Unit tests (Q4c): you must write unit tests, JUnit',
      'TDD (Q4c), JaCoCo, API / OpenAPI (Q4b)',
      'SLI, SLO, error budget calculations (Q4d, lots of material from the last lecture)',
      'Weeks 1-6 supply roughly 3 of the 4 questions; half of one question is from week 12'
    ],
    unlikely: [
      'Agile vs DevOps comparison',
      'What is a build',
      'Monolithic architecture / microservices / software architecture in general',
      'Monitoring, observability, Grafana, Prometheus (tools)',
      'Definitions (pure definition questions)',
      'Cyclomatic complexity formula',
      'CI/CD as a concept',
      'Week 7 content (architecture evolution)',
      'Other security (no heartbeat etc.), DevSecOps (marked n?)',
      'SDLC',
      'Integration tests',
      'Ticket lifecycles (Jira/GitHub issue lifecycle)',
      'Questions exactly the same as last year: the paper is brand new, same flow, different content and scenarios'
    ],
    questionShapes: [
      'Question formats: Q1 has 4 parts, Q2 has 3 parts, Q3 has 3 parts, Q4 has 4 parts; each question is 20 marks; answer 3 of 4 (answer all, best counts); no MCQ',
      'Scenario 1 is about a veterinary clinic extending its existing software system',
      'Q1: (a) Agile manifesto item, then requirements and change management with stated assumptions',
      'Q2: Maven / pom / Spring Boot (the "same" question) and Git: last year was "merge issue and how to resolve"; this year expect "given this command, identify the problem and fix it"; one question asks you to list Git commands (10 marks)',
      'Q3: Docker is two parts: part 1 Dockerfile (steps to construct), part 2 troubleshooting; remember the Docker commands',
      'Q4: (a) SCA/security or JaCoCo, (b) API, (c) unit test + TDD (half a question) including a 5-mark "what is wrong with this code" (design/intent flaws, one-liners, functional Java), (d) SLI/SLO/error budget calculations',
      'Everything on the exam has been covered in class except maybe one item; doing the checkpoints helps'
    ],
    notes: [
      'CONFLICT FLAGGED: monitoring tools (Grafana, Prometheus) are reported unlikely, BUT SLI/SLO/SLA/error-budget calculations are reported very likely (Q4d, lots from the last lecture, week 12). Treat them as separate: skip tool detail, drill the calculations. This site has a dedicated high-priority topic for them.',
      'Past papers 2023-26 asked vulnerability / countermeasure / zero-day / buffer overflow and SAST/DAST/ZAP/SonarQube almost every year, but the hints list "other security" and "definitions" as unlikely. Their topics are kept with full content but tiered low or possible; the SAST/DAST/coverage topics are kept as "likely" because three consecutive recent papers asked them and JaCoCo/SCA are hinted.',
      'Code critique: the first sub-part is "identify the problem in this implementation", nothing syntactic. The lecturer writes many one-liners and uses functional Java (streams, lambdas, Optional) to trick you. Revise the code-critique topic and method.',
      'Unit test question: you will have to write the tests yourself, so practise writing JUnit 5 tests by hand with assertions, Arrange-Act-Assert and a mock.',
      'Topics flagged unlikely still have full content: the lecturer said everything was covered in class, so they can appear in short parts.'
    ]
  }
};
