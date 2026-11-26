module.exports = [
  {
    id: 'sli-slo-sla-error-budget',
    title: 'SLI, SLO, SLA and error budget calculations',
    priority: 4,
    tier: 'core',
    hint: 'likely',
    freq: 'hinted Q4d (VERY likely, lots from last lecture)',
    marks: '5-10 marks',
    summary: '**SLI = measured value, SLO = target for it, SLA = contract with penalties. Availability = uptime / total time x 100; error budget = 100% - SLO converted to minutes (or requests); compare actual downtime with the budget to decide if the SLO is met.**',
    mnemonic: 'I measure, O targets, A contracts. Budget = (100 - SLO)% x window; SLI = (total - down) / total',
    source: ['CT417_Notes_11a_Reliability_Monitoring'],
    sections: [
      {
        heading: 'Definitions (the lecture)',
        items: [
          '**SRE (Site Reliability Engineering)**: applies software engineering to operations to ensure reliability, performance and scalability of large systems; balances new features with stability; reduces toil.',
          '**SLI (Service Level Indicator)**: a metric that measures the performance/reliability of a service, e.g. request latency, availability (uptime), error rate, throughput.',
          '**SLO (Service Level Objective)**: a specific target for an SLI, e.g. 99.95% uptime. An internal performance goal engineers strive to meet.',
          '**SLA (Service Level Agreement)**: a formal contract between provider and user that defines penalties (credits, refunds) if the SLO/agreed level is not met. SLAs are usually looser than internal SLOs so you have margin.',
          '**Error budget**: how much downtime/failure is acceptable within a time frame. Error budget = 100% - SLO. While budget remains, teams can deploy and take risks; when it is exhausted, focus shifts to stability and risky changes pause.',
          '**Toil**: repetitive, manual, automatable operations work that SRE minimises by automation. Toil grows with system scale unless actively reduced; if toil takes an unmanageable share of capacity ("engineering bankruptcy") there is no capacity left to reduce toil or improve the business. Reducing toil frees engineers for innovation, higher reliability and faster incident response.'
        ]
      },
      {
        heading: 'Formulas',
        items: [
          { type: 'formula', label: 'Availability SLI (time based)', text: 'SLI % = (Total time - Downtime) / Total time x 100' },
          { type: 'formula', label: 'Request based SLI', text: 'SLI % = good requests / valid (total) requests x 100' },
          { type: 'formula', label: 'Error budget (percentage)', text: 'Error budget % = 100% - SLO %' },
          { type: 'formula', label: 'Allowed downtime', text: 'Allowed downtime = (1 - SLO) x window length   (e.g. 0.001 x 43,200 min = 43.2 min)' },
          { type: 'formula', label: 'Budget remaining / consumed', text: 'Remaining = Allowed - Actual downtime;  Consumed % = Actual / Allowed x 100' },
          { type: 'formula', label: 'Burn rate', text: 'Burn rate = fraction of budget consumed / fraction of window elapsed = actual error rate / allowed error rate' },
          { type: 'formula', label: 'Time until budget exhausted', text: 'Time to exhaustion = window / burn rate (burn rate 1 = exactly on budget)' },
          { type: 'formula', label: 'SLO met?', text: 'Met if SLI >= SLO, equivalently Downtime <= Allowed downtime' },
          'Unit sanity: 30-day month = 30 x 24 = 720 h = 43,200 min = 2,592,000 s. A year = 8,760 h = 525,600 min.'
        ]
      },
      {
        heading: 'Reference table: allowed downtime (memorise the pattern)',
        items: [
          { type: 'table', head: ['SLO', 'Error budget', 'Per 30 days (43,200 min)', 'Per 365 days (525,600 min)', 'Per 7 days (10,080 min)'], rows: [
            ['99%', '1%', '432 min = 7.2 h', '5,256 min = 87.6 h', '100.8 min'],
            ['99.5%', '0.5%', '216 min = 3.6 h', '2,628 min = 43.8 h', '50.4 min'],
            ['99.9% ("three nines")', '0.1%', '43.2 min', '525.6 min = 8.76 h', '10.08 min'],
            ['99.95%', '0.05%', '21.6 min', '262.8 min = 4.38 h', '5.04 min'],
            ['99.99% ("four nines")', '0.01%', '4.32 min', '52.56 min', '1.008 min'],
            ['99.999% ("five nines")', '0.001%', '0.432 min = 25.9 s', '5.256 min', '6.05 s']
          ] },
          'Shortcut: for 99.9% each extra 9 divides the budget by 10. For a 30-day month 99.9% is about 43 min (the slide says "about 43 minutes").'
        ]
      },
      {
        heading: 'Worked example 1 (the lecture): uptime SLI',
        items: [
          'Total time = 30 x 24 = 720 h. Downtime = 1.44 h.',
          'SLI = (720 - 1.44) / 720 x 100 = 718.56 / 720 x 100 = **99.8%**.',
          'SLO = 99.9%: allowed downtime = 0.001 x 720 = 0.72 h (43.2 min). Actual 1.44 h > 0.72 h so the **SLO is NOT met**. Budget overspent by 0.72 h (43.2 min), i.e. 200% consumed.'
        ]
      },
      {
        heading: 'Worked example 2: several incidents against a budget',
        items: [
          'Vet clinic booking API, SLO 99.9% over 30 days. Incidents: 12 min, 18 min, 9 min = 39 min.',
          'Budget = 0.001 x 43,200 = 43.2 min. Consumed = 39 / 43.2 = 90.3%. Remaining = 4.2 min.',
          'SLI = (43,200 - 39) / 43,200 x 100 = 99.909% >= 99.9%: **SLO met**, but only 4.2 min left, so freeze risky releases and prioritise stability.'
        ]
      },
      {
        heading: 'Worked example 3: stricter SLO',
        items: [
          'SLO 99.95% over 30 days, downtime 25 min. Budget = 0.0005 x 43,200 = 21.6 min.',
          'SLI = (43,200 - 25) / 43,200 x 100 = 99.942%. 99.942 < 99.95 so **not met**; overspent by 3.4 min (25 - 21.6); consumed = 25 / 21.6 = 115.7%.'
        ]
      },
      {
        heading: 'Worked example 4: request-based SLI and error budget in requests',
        items: [
          'A service handled 10,000,000 requests in a month and 4,200 failed. SLO 99.95%.',
          'SLI = (10,000,000 - 4,200) / 10,000,000 = 99.958% >= 99.95%: **met**.',
          'Budget in requests = 0.0005 x 10,000,000 = 5,000 failures. Used 4,200 = 84%. Remaining 800 failures.'
        ]
      },
      {
        heading: 'Worked example 5: burn rate',
        items: [
          'SLO 99.9% / 30 days (budget 43.2 min). After 10 days 30 min of downtime has occurred.',
          'Fraction consumed = 30 / 43.2 = 0.694. Fraction of window elapsed = 10 / 30 = 0.333. Burn rate = 0.694 / 0.333 = **2.08** (burning 2.08 times faster than allowed).',
          'At this rate the budget runs out at 30 days / 2.08 = 14.4 days, i.e. about 4.4 days from now, long before the 30-day window ends. Action: pause features and fix reliability.'
        ]
      },
      {
        heading: 'Worked example 6: working backwards and composite availability',
        items: [
          'Downtime of 2 h in 30 days: SLI = (720 - 2) / 720 = 99.722%. That meets a 99.5% SLO but misses 99.9%.',
          'Largest downtime for 99.99% over 365 days = 0.0001 x 525,600 = 52.56 min.',
          'Chained services (all must work): availability multiplies. 99.9% x 99.5% = 99.9 x 0.995 = **99.40%** (0.999 x 0.995 = 0.994005). Three 99.9% components in series = 99.70%. Chained dependencies lower overall availability.',
          'Redundant pair (either works): 1 - (1 - 0.99)^2 = 99.99%.',
          'Latency SLI: 1,000,000 requests, 962,000 served under 300 ms: SLI = 96.2%. SLO "95% under 300 ms" is met with 1.2 points of margin.'
        ]
      },
      {
        heading: 'Compliance checks and decisions',
        items: [
          'State: SLI value, SLO target, allowed vs actual downtime, met / not met, % budget consumed, what to do.',
          'Budget healthy: ship features, run experiments. Budget exhausted: freeze risky changes, work on reliability, review in a blameless postmortem.',
          'SLA breach: SLO is internal; an SLA is a contract. If actual < SLA level, penalties/credits apply. Keep SLO stricter than SLA (SLO 99.95%, SLA 99.9%).',
          'Error budgets align developers and operations: shared view of risk so uptime does not cost innovation.',
          'Extra (SRE workbook, not in slides): alert on fast burn (e.g. burn rate 14.4 spends 2% of a 30-day budget in 1 hour) as well as slow burn.'
        ]
      }
    ],
    pitfalls: [
      'Using 30 days = 720 hours = 43,200 minutes inconsistently (mixing hours and minutes).',
      'Calculating 99.9% of the downtime instead of 0.1% of the window.',
      'Saying SLO met when actual downtime exceeds the allowed downtime.',
      'Confusing SLI (measured), SLO (target) and SLA (contract with penalties).',
      'Forgetting the verdict sentence; always conclude "SLO met / not met" and say what the team should do.'
    ]
  },

  {
    id: 'mttd-mttr-mtbf',
    title: 'Incident metrics: MTTD, MTTR, MTBF calculations',
    priority: 19,
    tier: 'likely',
    hint: 'likely',
    freq: '2/7 papers (2025-26 s1 Q3d, autumn Q3c); hinted calculations',
    marks: '4-10 marks',
    summary: '**MTTD = start to detection; MTTR = detection to restoration (as the papers define it); average = sum / number of incidents. Convert everything to one unit first, then identify the incident with the smallest times.**',
    mnemonic: 'Detect time, Repair time: D then R; add up, divide by n',
    source: ['CT417_Exam_2025-2026_1_1_5', 'CT417_Exam_2025-2026_1_2_3', 'CT417_Notes_11a_Reliability_Monitoring'],
    sections: [
      {
        heading: 'Definitions as used in the papers',
        items: [
          '**MTTD (mean time to detect)**: average time from the incident starting to it being detected.',
          '**MTTR (mean time to repair/recover)**: average time from detection to service restoration (autumn 2025 paper definition). Total downtime = MTTD + MTTR for an incident.',
          '**MTBF (mean time between failures)**: normally operating time between failures divided by the number of failures. The Semester 1 paper told you to ASSUME MTBF = MTTD + MTTR per incident: follow the question\'s assumption and state it.',
          'High observability and automated alerting reduce MTTD and MTTR.'
        ]
      },
      {
        heading: 'Worked example A (2025-26 Semester 1 Q3d)',
        items: [
          { type: 'table', head: ['#', 'MTTD', 'MTTR', 'Total downtime', 'MTBF = MTTD + MTTR'], rows: [
            ['1', '4 h', '2 h', '6 h', '6 h'],
            ['2', '30 min = 0.5 h', '1 h', '1.5 h', '1.5 h'],
            ['3', '6 h', '4 h', '10 h', '10 h']
          ] },
          'Average MTBF = (6 + 1.5 + 10) / 3 = 17.5 / 3 = **5.83 h** (5 h 50 min).',
          'Best performance: **incident 2**: smallest MTTD (30 min) and MTTR (1 h), shortest downtime (1.5 h), because automated alerting was active.',
          'Two improvements: (1) automated alert correlation and tuned alerting thresholds/on-call paging to cut MTTD; (2) runbooks, automated rollback/patch pipelines and better triage to cut MTTR. Also observability (logs, metrics, traces), chaos/game days, blameless postmortems.'
        ]
      },
      {
        heading: 'Worked example B (2025-26 Autumn Q3c, from timestamps)',
        items: [
          { type: 'table', head: ['Incident', 'Start', 'Detected', 'Restored', 'MTTD (start to detect)', 'MTTR (detect to restore)'], rows: [
            ['1', '09:00', '09:40', '10:30', '40 min', '50 min'],
            ['2', '13:15', '13:20', '13:50', '5 min', '30 min'],
            ['3', '18:00', '19:30', '21:00', '90 min', '90 min']
          ] },
          'Average MTTD = (40 + 5 + 90) / 3 = 135 / 3 = **45 min**. Average MTTR = (50 + 30 + 90) / 3 = 170 / 3 = **56.7 min** (56 min 40 s).',
          'Best: **incident 2** (5 min + 30 min = 35 min total outage; incident 1 = 90 min; incident 3 = 180 min).'
        ]
      },
      {
        heading: 'Relating to availability',
        items: [
          'Total downtime in a period = sum of (MTTD + MTTR) over incidents. Plug it into the SLI formula: example A total downtime 6 + 1.5 + 10 = 17.5 h over a quarter (about 2,160 h): SLI = (2,160 - 17.5) / 2,160 = 99.19%.',
          'To protect an SLO you can reduce frequency (fewer failures), MTTD (detect sooner) or MTTR (recover faster).'
        ]
      }
    ],
    pitfalls: [
      'Mixing hours and minutes in the average.',
      'Computing MTTR from incident start instead of detection (check the definition in the question).',
      'Forgetting to state the assumption MTBF = MTTD + MTTR when the question gives it.',
      'Not justifying the "best" incident with numbers.'
    ]
  },

  {
    id: 'api-design-openapi',
    title: 'API design, API-first, OpenAPI and Swagger',
    priority: 17,
    tier: 'core',
    hint: 'likely',
    freq: 'hinted Q4b; 0/7 papers',
    marks: '5-8 marks',
    summary: '**API-first: agree the contract (OpenAPI) before building. Use nouns for resources and HTTP methods for actions, correct status codes, versioning, additive not breaking changes, and secure with auth, rate limiting, validation and HTTPS.**',
    mnemonic: 'Nouns + verbs + codes; Contract first: Define, Mock, Test, Implement',
    source: ['CT417_Notes_08a_API_First_Design', 'CT417_Notes_08b_OpenAPI_Swagger'],
    sections: [
      {
        heading: 'API and API-first',
        items: [
          'An **API** lets software systems communicate, sharing data and functionality securely. A client sends a request, the API gets data from the server and the response (usually JSON) returns.',
          '**API contract**: methods, data formats and conventions two programs follow: method, path, parameters, status codes and response schema, i.e. the behaviour clients observe and rely on.',
          '**API-first**: treat the contract as a design artefact agreed BEFORE implementing the behaviour behind it. In an existing system: define the intended contract change before changing the implementation.',
          'Workflow: **Define contract, Mock APIs, Test APIs, Implement APIs**. The contract is the single source of truth for development and documentation.',
          'Benefits: consistency across teams; reduced integration risk (issues surface while it is still a design); frontend and backend work in parallel (faster development); safer evolution (changes checked against the contract); better developer experience and onboarding; docs, mocks, tests, SDKs generated from one spec.'
        ]
      },
      {
        heading: 'Design best practice',
        items: [
          'Name resources with **nouns** (plural), let the HTTP **method** say what happens: `/api/pets`, `/api/pets/8/visits`.',
          { type: 'table', head: ['Method', 'Use', 'Typical success code'], rows: [
            ['GET', 'Retrieve resource(s); safe, no change', '200 OK'],
            ['POST', 'Create a new resource', '201 Created'],
            ['PUT', 'Replace/update an existing resource (or create)', '200 OK / 204'],
            ['PATCH', 'Partially update', '200 OK'],
            ['DELETE', 'Remove', '204 No Content']
          ] },
          { type: 'table', head: ['Error code', 'Meaning'], rows: [
            ['400 Bad Request', 'Invalid request parameters'],
            ['401 Unauthorized', 'Authentication required'],
            ['403 Forbidden', 'Authenticated but insufficient permissions'],
            ['404 Not Found', 'Resource not found'],
            ['409 Conflict', 'State conflict (duplicate booking)'],
            ['500 Internal Server Error', 'Generic server error']
          ] },
          'Use a **consistent error format** (JSON with code, message, details) and the right status code.',
          '**Versioning**: URI versioning (`/v1/users`), header versioning (custom header); deprecate gracefully giving clients time to migrate.',
          '**Additive change** (new optional capability, existing requests and responses preserved) vs **breaking change** (removes/changes behaviour clients rely on). Example: `GET /api/visits` still returns the full list while `GET /api/visits?petId=8` adds an optional filter (additive). Making petId mandatory would break existing clients. A cleaner design is not permission to break a contract: make an explicit compatibility decision.'
        ]
      },
      {
        heading: 'API security (four points)',
        items: [
          '**Authentication**: OAuth2 access tokens (delegated, limited access without sharing credentials), JWT (compact, self-contained, stateless tokens carrying claims), API keys (simple identification of calling app, passed in header).',
          '**Rate limiting**: thresholds per API key or IP protect against DoS/abuse (429 Too Many Requests).',
          '**Input validation**: validate types, formats and ranges; prefer allowlists to denylists; parameterised queries.',
          '**HTTPS everywhere**: TLS encrypts data in transit and prevents man-in-the-middle attacks.'
        ]
      },
      {
        heading: 'OpenAPI and Swagger',
        items: [
          '**OpenAPI Specification**: a standard, language-agnostic format (YAML or JSON) describing RESTful APIs. It is the contract between provider and consumer. Since 2015 the specification is called OpenAPI; **Swagger** is the tooling around it.',
          { type: 'table', head: ['Swagger tool', 'What it does'], rows: [
            ['Swagger Editor', 'Write OpenAPI definitions with real-time error feedback'],
            ['Swagger UI', 'Interactive API documentation generated from the spec'],
            ['Swagger Codegen', 'Generate server stubs and client SDKs'],
            ['SwaggerHub', 'Team collaboration on API design/docs']
          ] },
          'One spec carries an API from design to docs to code to tests; mock servers let the frontend build in parallel.'
        ]
      },
      {
        heading: 'Example OpenAPI document (vet clinic visits)',
        items: [
          { type: 'code', text: 'openapi: 3.0.3\ninfo:\n  title: Vet Clinic API\n  version: 1.0.0\nservers:\n  - url: https://api.vetclinic.ie/v1\npaths:\n  /visits:\n    get:\n      summary: List visits, optionally for one pet\n      parameters:\n        - name: petId\n          in: query\n          required: false\n          schema:\n            type: integer\n      responses:\n        \'200\':\n          description: A list of visits\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: \'#/components/schemas/Visit\'\n        \'400\':\n          description: Malformed petId\n        \'404\':\n          description: Unknown pet\n    post:\n      summary: Record a visit\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              $ref: \'#/components/schemas/NewVisit\'\n      responses:\n        \'201\':\n          description: Visit created\n  /visits/{id}:\n    get:\n      summary: Get one visit\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: integer\n      responses:\n        \'200\':\n          description: The visit\n        \'404\':\n          description: Not found\ncomponents:\n  schemas:\n    Visit:\n      type: object\n      required: [id, petId, date]\n      properties:\n        id: { type: integer }\n        petId: { type: integer }\n        date: { type: string, format: date }\n        notes: { type: string }\n    NewVisit:\n      type: object\n      required: [petId, date]\n      properties:\n        petId: { type: integer }\n        date: { type: string, format: date }\n        notes: { type: string }' },
          'Key blocks: `openapi` version, `info`, `servers`, `paths` (each path with methods, parameters, requestBody, responses with status codes), `components/schemas` reused via `$ref`.'
        ]
      }
    ],
    pitfalls: [
      'Using verbs in URLs (/getVisits) instead of nouns + HTTP methods.',
      'Making a breaking change (mandatory new parameter) without versioning.',
      'Confusing OpenAPI (the spec) with Swagger (the tools).',
      'Returning 200 for errors, or 500 for client mistakes.'
    ]
  },

  {
    id: 'monitoring-observability',
    title: 'Monitoring, observability, Prometheus and Grafana',
    priority: 32,
    tier: 'low',
    hint: 'unlikely',
    freq: 'hinted unlikely (tools); concepts est. low',
    marks: '3-6 marks',
    summary: '**Monitoring tracks known metrics against thresholds (Prometheus scrapes, Grafana visualises); observability (logs, metrics, traces) explains why. A target being UP means the scrape worked, not that the app is correct.**',
    mnemonic: 'LMT: Logs, Metrics, Traces; Prometheus pulls, Grafana paints',
    source: ['CT417_Notes_11a_Reliability_Monitoring', 'CT417_Notes_11b_Grafana', 'CT417_Notes_11c_Prometheus'],
    sections: [
      {
        heading: 'Monitoring vs observability',
        items: [
          '**Monitoring**: continuously tracking system metrics (latency, uptime, error rate, throughput, CPU, memory); proactive; alerts when predefined thresholds are crossed; detects KNOWN problems.',
          '**Observability**: deep insight into internal state from outputs, to understand WHY something fails. Three pillars: **logs** (text event records), **metrics** (numbers over time), **traces** (path of a request across services). Reduces MTTR.',
          '**Playbook**: organisational goals, escalation paths, communication, general incident guidelines. **Runbook**: step-by-step technical instructions for an on-call engineer responding to a specific alert.',
          '**Blameless postmortem**: after an incident, document what happened (timeline), why (root cause, 5 Whys) and what to do better; focus on process, not blame.',
          'SRE vs DevOps: DevOps = culture of shared responsibility, CI/CD, IaC; SRE = specific engineering practice with SLOs, error budgets and toil reduction. They complement each other.'
        ]
      },
      {
        heading: 'Prometheus',
        items: [
          'Open-source monitoring system: **pull-based scraping** of an HTTP metrics endpoint, stores **time series** (metric name + labels) in its TSDB, query with **PromQL**, alert rules sent to Alertmanager (email, PagerDuty).',
          '`up{job="petclinic"}` is 1 when the latest scrape succeeded, 0 when it failed. Example query: `sum(rate(http_server_requests_seconds_count[5m]))` (only if the metric exists).',
          'Spring Boot: add `spring-boot-starter-actuator` and `micrometer-registry-prometheus`; expose `management.endpoints.web.exposure.include=health,info,prometheus`.',
          { type: 'code', text: 'global:\n  scrape_interval: 15s\nscrape_configs:\n  - job_name: "petclinic"\n    metrics_path: "/petclinic/actuator/prometheus"\n    static_configs:\n      - targets: ["host.docker.internal:9966"]' },
          'Inside a container, `localhost` means the container itself: use the container name on a shared Docker network.'
        ]
      },
      {
        heading: 'Grafana',
        items: [
          'Visualisation tool: dashboards made of panels; queries Prometheus as a data source (`http://ct417-prometheus:9090`); supports annotations (mark a deployment) and alerting.',
          'Each panel answers one operational question (scrape reachability, request traffic, JVM heap). Alert on impact-related symptoms over an evaluation period, not every spike. Correlation across panels is not causation.',
          'A healthy dashboard or UP target is not the same as a healthy application: also verify the user-facing operation.',
          { type: 'code', text: 'docker network create ct417-monitoring\ndocker run --detach --name ct417-grafana --network ct417-monitoring --publish 127.0.0.1:3000:3000 grafana/grafana' }
        ]
      }
    ],
    pitfalls: ['Treating monitoring and observability as the same thing.', 'Spending time on tool detail when only the SLI/SLO calculations are likely.']
  }
];
