module.exports = [
  {
    id: 'calc-availability-sli',
    topicId: 'sli-slo-sla-error-budget',
    title: 'Calculate an availability SLI and check it against the SLO',
    when: 'Given total time and downtime (or incident list) and an SLO: compute SLI and say if met',
    mnemonic: 'Same units, subtract, divide, x100, compare',
    steps: [
      '1. Convert the window to one unit (30 days = 720 h = 43,200 min).',
      '2. Sum all downtime in that unit.',
      '3. SLI % = (total - downtime) / total x 100.',
      '4. Compare SLI with the SLO: met if SLI >= SLO.',
      '5. State the verdict and the margin, then the action.'
    ],
    example: {
      problem: 'Vet booking API: 30-day month, incidents of 20 min and 30 min. SLO 99.9%. Is the SLO met?',
      solution: [
        'Total = 30 x 24 x 60 = 43,200 min. Downtime = 20 + 30 = 50 min.',
        'SLI = (43,200 - 50) / 43,200 x 100 = 43,150 / 43,200 x 100 = 99.884%.',
        '99.884% < 99.9%: SLO NOT met.',
        'Margin: allowed 43.2 min, actual 50 min, overspent by 6.8 min (115.7% of budget).',
        'Action: freeze risky releases and prioritise reliability work.'
      ]
    }
  },
  {
    id: 'calc-error-budget',
    topicId: 'sli-slo-sla-error-budget',
    title: 'Calculate the error budget and allowed downtime',
    when: 'Given an SLO and window: allowed downtime, budget used and remaining',
    mnemonic: '(100 - SLO)% x window; used / allowed',
    steps: [
      '1. Error budget % = 100 - SLO.',
      '2. Convert the window to minutes.',
      '3. Allowed downtime = budget fraction x window minutes.',
      '4. Used % = actual downtime / allowed x 100.',
      '5. Remaining = allowed - actual.',
      '6. Decide: if remaining is positive keep shipping carefully; if exhausted freeze.'
    ],
    example: {
      problem: 'SLO 99.95% over a 90-day quarter. Incidents so far total 45 minutes. Budget, used, remaining?',
      solution: [
        'Budget % = 0.05%. Window = 90 x 1,440 = 129,600 min.',
        'Allowed downtime = 0.0005 x 129,600 = 64.8 min.',
        'Used = 45 / 64.8 = 69.4%. Remaining = 64.8 - 45 = 19.8 min.',
        'Verdict: SLO still met but 30.6% of budget left; be cautious with risky deployments.',
        'In requests: with 20,000,000 requests the budget is 0.0005 x 20,000,000 = 10,000 failed requests.'
      ]
    }
  },
  {
    id: 'calc-burn-rate',
    topicId: 'sli-slo-sla-error-budget',
    title: 'Calculate burn rate and time to exhaustion',
    when: 'Partway through the window: how fast is the budget being consumed?',
    mnemonic: 'Burn = % budget used / % window elapsed',
    steps: [
      '1. Compute the budget for the whole window (minutes).',
      '2. Fraction used = downtime so far / budget.',
      '3. Fraction elapsed = time elapsed / window.',
      '4. Burn rate = fraction used / fraction elapsed (1 = on target, above 1 = too fast).',
      '5. Time to exhaustion = window / burn rate (from the start of the window).',
      '6. Time left = that value minus time elapsed; recommend action.'
    ],
    example: {
      problem: 'Weekly window (7 days), SLO 99.9%. After 2 days there has been 8 minutes of downtime.',
      solution: [
        'Window = 7 x 1,440 = 10,080 min. Budget = 0.001 x 10,080 = 10.08 min.',
        'Fraction used = 8 / 10.08 = 0.794 (79.4%). Fraction elapsed = 2 / 7 = 0.286.',
        'Burn rate = 0.794 / 0.286 = 2.78.',
        'Exhausted after 7 / 2.78 = 2.52 days from the window start, so about 0.52 days (12.5 hours) from now.',
        'Action: stop feature releases, investigate the failure cause, and protect the remaining 2.08 min.'
      ]
    }
  },
  {
    id: 'calc-composite-availability',
    topicId: 'sli-slo-sla-error-budget',
    title: 'Composite availability of dependent services',
    when: 'A request needs several services (serial) or has redundancy (parallel)',
    mnemonic: 'Serial multiply; parallel 1 - (1 - a)(1 - b)',
    steps: [
      '1. Convert percentages to decimals.',
      '2. Serial (all needed): multiply availabilities.',
      '3. Parallel (any one works): 1 - product of (1 - a).',
      '4. Convert back to % and to allowed downtime (1 - A) x window.',
      '5. Compare with the SLO you promised.'
    ],
    example: {
      problem: 'Checkout needs API 99.95%, database 99.9% and payment gateway 99.8% (all in series). Can you promise 99.9% over 30 days?',
      solution: [
        'A = 0.9995 x 0.999 x 0.998 = 0.9965 (99.65%).',
        'Expected downtime = (1 - 0.9965) x 43,200 = about 151 min per 30 days.',
        '99.65% < 99.9% so you cannot promise 99.9%: the weakest dependency and the chain limit you.',
        'Improvement: add redundancy to the gateway: two independent 99.8% gateways in parallel give 1 - 0.002^2 = 99.9996%, so A = 0.9995 x 0.999 x 0.999996 = 99.85%, still below 99.9% (the database is the next weak link).',
        'Conclusion: promise about 99.8% or improve the database and API too.'
      ]
    }
  },
  {
    id: 'slo-compliance-report',
    topicId: 'sli-slo-sla-error-budget',
    title: 'Compliance check across several services or months',
    when: 'A table of services/months with downtime and SLOs: decide which meet SLO, which breach SLA',
    mnemonic: 'Per row: allowed, actual, verdict',
    steps: [
      '1. For each row compute allowed downtime from its SLO and window.',
      '2. Compare actual with allowed: met or not.',
      '3. Compute SLI % for each.',
      '4. Identify rows that also breach the SLA (contract) and the penalty.',
      '5. Rank by budget consumed and recommend action per row.'
    ],
    example: {
      problem: '30-day month. Auth: SLO 99.95%, down 18 min. Booking: SLO 99.9%, down 40 min. Notifications: SLO 99%, down 300 min. SLA for all is one level lower than the SLO.',
      solution: [
        'Auth: allowed 21.6 min; actual 18 -> SLI = (43,200 - 18)/43,200 = 99.958%; met; 83.3% budget used.',
        'Booking: allowed 43.2 min; actual 40 -> SLI = 99.907%; met; 92.6% used (very little left).',
        'Notifications: allowed 432 min; actual 300 -> SLI = 99.306%; met; 69.4% used.',
        'No SLO is breached, hence no SLA breach. Highest risk: Booking at 92.6% budget used: stop risky changes on it; Auth next at 83.3%.',
        'If Booking had been down 60 min: SLI = 99.861%, SLO missed (budget 139% used); SLA at 99.5%? still met, but the error-budget policy freezes releases.'
      ]
    }
  },
  {
    id: 'mttd-mttr-average',
    topicId: 'mttd-mttr-mtbf',
    title: 'Compute MTTD, MTTR and averages from incident data',
    when: 'Given start/detect/restore times or a table of MTTD/MTTR and asked for averages and best incident',
    mnemonic: 'Subtract timestamps in minutes, then sum and divide',
    steps: [
      '1. Convert all times to minutes.',
      '2. MTTD = detected - started; MTTR = restored - detected (use the paper\'s definition).',
      '3. Total downtime per incident = MTTD + MTTR.',
      '4. Average = sum / number of incidents.',
      '5. Best incident = smallest MTTD, MTTR and total; explain why (automation, monitoring).',
      '6. Suggest 2 improvements.'
    ],
    example: {
      problem: 'Incident 1: start 09:00, detected 09:40, restored 10:30. Incident 2: 13:15, 13:20, 13:50. Incident 3: 18:00, 19:30, 21:00. Calculate average MTTD and MTTR.',
      solution: [
        'Inc 1: MTTD 40, MTTR 50 (total 90). Inc 2: MTTD 5, MTTR 30 (total 35). Inc 3: MTTD 90, MTTR 90 (total 180).',
        'Average MTTD = (40 + 5 + 90) / 3 = 45 min.',
        'Average MTTR = (50 + 30 + 90) / 3 = 56.7 min.',
        'Best: incident 2 (5 min to detect, 35 min total outage).',
        'Improvements: automated alerting with on-call paging to cut MTTD; runbooks and automated rollback to cut MTTR.'
      ]
    }
  },
  {
    id: 'write-openapi-spec',
    topicId: 'api-design-openapi',
    title: 'Design an API and write an OpenAPI fragment',
    when: 'Q4b: design endpoints for a scenario, explain API-first, choose methods and status codes',
    mnemonic: 'Resources (nouns), Methods, Codes, Schema, Security',
    steps: [
      '1. Identify resources (nouns, plural).',
      '2. Map operations to methods: GET list/read, POST create, PUT/PATCH update, DELETE remove.',
      '3. Define parameters (path for identity, query for filters) and request bodies.',
      '4. List responses with status codes (200, 201, 204, 400, 401, 403, 404, 409) and schema.',
      '5. Decide versioning (/v1) and whether a change is additive or breaking.',
      '6. Add security: authentication (OAuth2/JWT), rate limiting, validation, HTTPS.',
      '7. Write the OpenAPI YAML skeleton (openapi, info, paths, components).'
    ],
    example: {
      problem: 'Design the API for the clinic to list a pet\'s visits and to book a new visit without breaking existing clients that call GET /visits.',
      solution: [
        '`GET /v1/visits` returns all visits (existing behaviour kept).',
        '`GET /v1/visits?petId=8` adds an optional filter: additive change, not breaking. 200 with array; 400 for non-numeric petId; 404 if the pet does not exist.',
        '`POST /v1/visits` with body {petId, date, notes}: 201 Created with the visit and Location header; 400 invalid; 409 if the slot is taken.',
        '`GET /v1/visits/{id}`: 200 or 404.',
        'Security: OAuth2 bearer JWT, rate limit per API key, validate types and ranges, HTTPS only.',
        'API-first: write this as openapi.yaml, publish mocks so the front end builds in parallel, generate docs with Swagger UI, then implement.'
      ]
    }
  },
  {
    id: 'prioritise-vulnerabilities',
    topicId: 'sca-security',
    title: 'Prioritise dependency findings and plan remediation',
    when: 'A scan table (severity, exposure, fix available) and "which TWO should be fixed, and how?"',
    mnemonic: 'SEBF then branch-bump-test-review-deploy',
    steps: [
      '1. For each finding note severity, exposure (public/internal/build-time), business impact, fix availability and effort.',
      '2. Rank: critical or high with public/auth exposure and an available fix first.',
      '3. Justify each chosen and each deferred item in one line.',
      '4. Remediation: branch, bump the dependency, update lockfile, run tests, PR review, CI with scans, staging then production with rollback.',
      '5. Verify the alert closes; record the decision.'
    ],
    example: {
      problem: 'Findings: A express 4.17.1 High public API fix yes; B lodash High internal batch fix yes; C React build dep Medium needs major upgrade; D jsonwebtoken 8.5.1 Critical customer sessions fix yes. Which two and how?',
      solution: [
        'Fix D first: critical, protects customer sessions (account takeover risk), fix available.',
        'Fix A second: high severity on the public internet-facing API, fix available.',
        'Defer B (high but internal; schedule) and C (medium, build-time only, major upgrade effort and regression risk).',
        'Workflow for D: `git checkout -b fix/jsonwebtoken`; `npm install jsonwebtoken@<patched>`; commit package.json and lockfile; run tests incl. token verify/expiry/tamper tests; open a PR; CI runs tests, SAST and SCA; reviewer approves; deploy to staging, smoke test, canary to production with the previous image tag kept for rollback.'
      ]
    }
  },
  {
    id: 'compare-sast-dast',
    topicId: 'sast-dast-zap-sonar',
    title: 'Compare SAST and DAST (4-attribute template)',
    when: 'Explain the key differences by when, source access, issue types and tools',
    mnemonic: 'W-S-T-T: When, Source, Types, Tools',
    steps: [
      '1. When in the lifecycle: SAST early (coding/commit/PR); DAST later (running app in test/staging).',
      '2. Source access: SAST needs source/bytecode (white-box); DAST does not (black-box).',
      '3. Issue types: SAST insecure code patterns, injection flows, secrets; DAST runtime issues: headers, cookies, exposed endpoints, auth/session, some injection/XSS.',
      '4. Tools: SonarQube/Semgrep/CodeQL vs OWASP ZAP/Burp.',
      '5. Limits and why combine (plus SCA).'
    ],
    example: {
      problem: 'Explain the key differences between SAST and DAST (5 marks).',
      solution: [
        'When: SAST is run during development/CI before deployment; DAST needs a deployed running app so it runs in staging/after build.',
        'Source: SAST analyses source code or bytecode so access is required; DAST tests from outside over HTTP and needs no code.',
        'Detects: SAST finds insecure patterns and data flows (SQL injection source-to-sink, hard-coded secrets); DAST finds runtime and configuration weaknesses (missing headers, insecure cookies, exposed consoles, authentication flaws).',
        'Tools: SonarQube (SAST), OWASP ZAP (DAST).',
        'Together they cover different surfaces; neither proves the app is secure; add SCA for dependencies.'
      ]
    }
  },
  {
    id: 'zap-sonar-troubleshoot',
    topicId: 'sast-dast-zap-sonar',
    title: 'Fix a failing ZAP step or a slow SonarQube step',
    when: 'Pipeline problem: ZAP job fails/empty report, or SonarQube slows PR feedback; give two causes/fixes with trade-offs',
    mnemonic: 'Cause, Fix, Trade-off (CFT) x2',
    steps: [
      '1. ZAP: is the target running and reachable (health wait, Docker network, URL)?',
      '2. ZAP: are endpoints discovered/authenticated (OpenAPI import, context)?',
      '3. ZAP: do warnings fail the build, is there a timeout, is the report written and uploaded?',
      '4. Sonar: analyse changed code (PR analysis), run the full scan nightly or on merge.',
      '5. Sonar: cache, exclude generated code, parallelise, scale the runner.',
      '6. For each, state the benefit and the trade-off; do not reduce rule quality.'
    ],
    example: {
      problem: 'ZAP in the payment-api staging pipeline fails or produces an empty report. Two causes and fixes (5 marks).',
      solution: [
        'Cause 1: the scan starts before the service is ready, or targets localhost from inside the ZAP container (which is ZAP itself). Fix: wait on the /health endpoint, put both containers on one Docker network and target the service name.',
        'Cause 2: the report is not written or kept: no -r/-J output, no volume, artefact not uploaded, or the step fails on warnings before the upload. Fix: configure report options, mount a writable directory, upload the artefact with `if: always()`, and set thresholds so warnings do not fail the job.',
        'Also: import the OpenAPI spec so POST endpoints are discovered; use a baseline passive scan on PRs and a full active scan nightly.'
      ]
    }
  },
  {
    id: 'refactor-with-patterns',
    topicId: 'design-patterns-refactoring',
    title: 'Refactor if/else code using polymorphism and patterns',
    when: 'Given code branching on role/type/method, refactor with abstract class, Factory, Strategy, OCP',
    mnemonic: 'Branch on type = polymorphism; create by type = Factory; swap algorithm = Strategy',
    steps: [
      '1. Spot the smell: repeated if (role.equals ...) or switch, duplicated methods per type.',
      '2. Extract an abstract class/interface with the varying method.',
      '3. Move each branch body into a subclass implementing it.',
      '4. Make the controller depend on the abstraction only.',
      '5. Move creation to a Factory; make it open for extension (registry map).',
      '6. Name the pattern and the principle (OCP, SRP) and the benefit.'
    ],
    example: {
      problem: 'PaymentService has if (method.equals("card")) ... else if ("wallet") ... else if ("bank") .... New methods are added monthly. Refactor.',
      solution: [
        'Problem: every new method edits tested code (violates OCP) and the class does many things.',
        'Interface: `interface PaymentStrategy { void pay(long cents); }`.',
        'Implementations: `CardPayment`, `WalletPayment`, `BankTransferPayment` each hold their own logic.',
        'Factory/registry: `Map<String, PaymentStrategy> strategies` (Spring injects all beans) selected by key.',
        'Service: `strategies.get(method).pay(cents)`; unknown key throws IllegalArgumentException.',
        'Benefit: add a method by adding one class; each strategy is unit-testable; the service is closed for modification.'
      ]
    }
  },
  {
    id: 'cyclomatic-complexity-calc',
    topicId: 'sqa-metrics-complexity',
    title: 'Calculate cyclomatic complexity',
    when: 'Given a control flow graph (E, N, P) or code with decisions',
    mnemonic: 'E - N + 2P, or decisions + 1',
    steps: [
      '1. If a graph: count edges E and nodes N; P = 1 for one method.',
      '2. CC = E - N + 2P.',
      '3. If code: count decision points (if, else if, for, while, case, catch, && , ||) and add 1.',
      '4. Map to the band: 1-10 low, 11-20 moderate, 21-50 high, over 50 very high.',
      '5. State testing implication: at least CC test cases for basis-path coverage.'
    ],
    example: {
      problem: 'Graph with E = 8, N = 7 (one method). Also count: for (x : a) { if (x > 0 && x < 10) c++; }',
      solution: [
        'CC = E - N + 2P = 8 - 7 + 2(1) = 3: low complexity.',
        'Code: decisions: for (1), if (1), && (1) = 3, so CC = 3 + 1 = 4.',
        'Both are in the 1-10 band: easy to understand and test; need about 4 test paths for the second.'
      ]
    }
  },
  {
    id: 'buffer-overflow-answer',
    topicId: 'security-fundamentals',
    title: 'Answer a buffer overflow / vulnerability code question',
    when: 'Given C code (strcpy) or asked to define buffer overflow and countermeasures',
    mnemonic: 'Define, Show, Exploit, Counter x2',
    steps: [
      '1. Define: data written beyond the buffer boundary corrupts adjacent memory.',
      '2. Point at the exact line (no bounds check, fixed buffer size).',
      '3. Exploit: long input overwrites the return address (or variables), redirects execution to attacker code, crash or privilege escalation.',
      '4. Countermeasure 1 (code): bounds-checked functions and length validation, or safe languages.',
      '5. Countermeasure 2 (platform): stack canaries, ASLR, DEP/NX.',
      '6. Optionally show the fixed code.'
    ],
    example: {
      problem: 'void copyCustomerName(char *input) { char name[8]; strcpy(name, input); printf("%s\\n", name); } Identify the vulnerability, exploit and two countermeasures.',
      solution: [
        'Vulnerability: stack buffer overflow; `strcpy` copies until the null byte without checking the 8-byte size.',
        'Exploit: an input longer than 7 characters overwrites adjacent stack memory including the saved return address; the attacker places shellcode or a return-to-libc address there so the function returns into attacker-controlled code.',
        'Countermeasure 1: use `strncpy(name, input, sizeof(name) - 1)` with explicit termination or `snprintf`, and validate input length.',
        'Countermeasure 2: compile with stack protector (canaries), enable ASLR and non-executable stack (DEP/NX); use code review and static analysis, or a memory-safe language.'
      ]
    }
  },
  {
    id: 'essay-compare-template',
    topicId: 'agile-vs-devops-sre',
    title: 'Answer template: compare A and B / explain and discuss',
    when: 'Any "compare", "distinguish", "discuss benefits and trade-offs" question',
    mnemonic: 'D-T-S-V: Define each, Table the differences, Scenario example, Verdict',
    steps: [
      '1. One-line definition of each.',
      '2. 3-4 contrasting points across the same dimensions (table-like, parallel sentences).',
      '3. One example from the scenario.',
      '4. A verdict or when to choose which.'
    ],
    example: {
      problem: 'Compare monolithic and microservice architecture for the clinic system (4 marks).',
      solution: [
        'Monolith: one codebase deployed as one unit; microservices: independent services with own data.',
        'Scaling: monolith scales whole app; microservices scale only booking or billing.',
        'Fault isolation and technology: failure in a monolith can stop everything; services isolated and may use different stacks.',
        'Cost: monolith simpler to build, deploy, debug; microservices add distributed complexity.',
        'Verdict: start monolithic for a small clinic; split when scaling or team boundaries demand it.'
      ]
    }
  }
];
