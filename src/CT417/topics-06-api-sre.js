module.exports = [
  {
    "id": "sli-slo-sla-error-budget",
    "title": "SLI, SLO, SLA and error budget calculations",
    "priority": 4,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q4d (VERY likely, lots from last lecture)",
    "marks": "5-10 marks",
    "summary": "**SLI is what you measured. SLO is your target. SLA is the contract with penalties. The error budget is how much failure the target allows.**",
    "mnemonic": "I measure, O targets, A contracts. Budget = (100 - SLO)% x window; SLI = (total - down) / total",
    "source": [
      "CT417_Notes_11a_Reliability_Monitoring"
    ],
    "sections": [
      {
        "heading": "Definitions (the lecture)",
        "items": [
          "**SRE (Site Reliability Engineering)**: using software engineering to keep large systems reliable, fast and scalable.",
          "It balances new features against stability.",
          {
            "type": "p",
            "text": "The three letters"
          },
          "**SLI (Service Level Indicator)**: a measurement. For example uptime, response time, error rate or throughput.",
          "**SLO (Service Level Objective)**: the target for that measurement, such as 99.95% uptime. It is your internal goal.",
          "**SLA (Service Level Agreement)**: a contract with the customer. Miss it and you pay penalties, such as refunds.",
          "The SLA is usually looser than the SLO, to give you a safety margin.",
          {
            "type": "p",
            "text": "Error budget"
          },
          "How much failure is allowed in a time period.",
          "Error budget = 100% - SLO.",
          "Budget left: you can ship and take risks.",
          "Budget used up: stop risky changes and work on stability.",
          {
            "type": "p",
            "text": "Toil"
          },
          "**Toil** is boring, repeated manual work that could be automated.",
          "It grows as the system grows, unless you cut it.",
          "If toil takes all your time (\"engineering bankruptcy\"), nothing is left to improve things.",
          "Less toil means more time for new ideas, better reliability and faster incident response."
        ]
      },
      {
        "heading": "Formulas",
        "items": [
          {
            "type": "p",
            "text": "How reliable were we? (by time)"
          },
          {
            "type": "formula",
            "label": "Availability SLI (time based)",
            "text": "SLI % = (Total time - Downtime) / Total time x 100"
          },
          {
            "type": "p",
            "text": "How reliable were we? (by requests)"
          },
          {
            "type": "formula",
            "label": "Request based SLI",
            "text": "SLI % = good requests / valid (total) requests x 100"
          },
          {
            "type": "p",
            "text": "How much failure is allowed?"
          },
          {
            "type": "formula",
            "label": "Error budget (percentage)",
            "text": "Error budget % = 100% - SLO %"
          },
          {
            "type": "formula",
            "label": "Allowed downtime",
            "text": "Allowed downtime = (1 - SLO) x window length   (e.g. 0.001 x 43,200 min = 43.2 min)"
          },
          {
            "type": "p",
            "text": "How much have we used?"
          },
          {
            "type": "formula",
            "label": "Budget remaining / consumed",
            "text": "Remaining = Allowed - Actual downtime;  Consumed % = Actual / Allowed x 100"
          },
          {
            "type": "formula",
            "label": "Burn rate",
            "text": "Burn rate = fraction of budget consumed / fraction of window elapsed = actual error rate / allowed error rate"
          },
          {
            "type": "formula",
            "label": "Time until budget exhausted",
            "text": "Time to exhaustion = window / burn rate (burn rate 1 = exactly on budget)"
          },
          {
            "type": "p",
            "text": "Did we meet the target?"
          },
          {
            "type": "formula",
            "label": "SLO met?",
            "text": "Met if SLI >= SLO, equivalently Downtime <= Allowed downtime"
          },
          "**Units**: a 30-day month is 720 hours = 43,200 minutes = 2,592,000 seconds.",
          "A year is 8,760 hours = 525,600 minutes."
        ]
      },
      {
        "heading": "Reference table: allowed downtime (memorise the pattern)",
        "items": [
          {
            "type": "table",
            "head": [
              "SLO",
              "Error budget",
              "Per 30 days (43,200 min)",
              "Per 365 days (525,600 min)",
              "Per 7 days (10,080 min)"
            ],
            "rows": [
              [
                "99%",
                "1%",
                "432 min = 7.2 h",
                "5,256 min = 87.6 h",
                "100.8 min"
              ],
              [
                "99.5%",
                "0.5%",
                "216 min = 3.6 h",
                "2,628 min = 43.8 h",
                "50.4 min"
              ],
              [
                "99.9% (\"three nines\")",
                "0.1%",
                "43.2 min",
                "525.6 min = 8.76 h",
                "10.08 min"
              ],
              [
                "99.95%",
                "0.05%",
                "21.6 min",
                "262.8 min = 4.38 h",
                "5.04 min"
              ],
              [
                "99.99% (\"four nines\")",
                "0.01%",
                "4.32 min",
                "52.56 min",
                "1.008 min"
              ],
              [
                "99.999% (\"five nines\")",
                "0.001%",
                "0.432 min = 25.9 s",
                "5.256 min",
                "6.05 s"
              ]
            ]
          },
          "**Shortcut**: each extra 9 in the target divides the allowed downtime by 10.",
          "99.9% over 30 days is about 43 minutes."
        ]
      },
      {
        "heading": "Worked example 1 (the lecture): uptime SLI",
        "items": [
          "Month: 30 × 24 = 720 hours. The service was down 1.44 hours.",
          "SLI = (720 - 1.44) / 720 × 100 = 718.56 / 720 × 100 = **99.8%**.",
          "Target (SLO) is 99.9%. Allowed downtime = 0.001 × 720 = 0.72 hours (43.2 minutes).",
          "It was down 1.44 hours, more than allowed, so the **SLO is NOT met**.",
          "Over budget by 0.72 hours (43.2 minutes). That is 200% of the budget used."
        ]
      },
      {
        "heading": "Worked example 2: several incidents against a budget",
        "items": [
          "A vet clinic booking system. Target 99.9% over 30 days.",
          "Three outages: 12, 18 and 9 minutes = 39 minutes.",
          "Budget = 0.001 × 43,200 = 43.2 minutes.",
          "Used = 39 / 43.2 = 90.3%. Left = 4.2 minutes.",
          "SLI = (43,200 - 39) / 43,200 × 100 = 99.909%, which is at least 99.9%: **SLO met**.",
          "But only 4.2 minutes remain, so pause risky releases."
        ]
      },
      {
        "heading": "Worked example 3: stricter SLO",
        "items": [
          "Target 99.95% over 30 days. Downtime 25 minutes.",
          "Budget = 0.0005 × 43,200 = 21.6 minutes.",
          "SLI = (43,200 - 25) / 43,200 × 100 = 99.942%.",
          "99.942 is below 99.95, so **not met**.",
          "Over by 3.4 minutes (25 - 21.6). Used = 25 / 21.6 = 115.7%."
        ]
      },
      {
        "heading": "Worked example 4: request-based SLI and error budget in requests",
        "items": [
          "10,000,000 requests in a month, 4,200 failed. Target 99.95%.",
          "SLI = (10,000,000 - 4,200) / 10,000,000 = 99.958%: **met**.",
          "Budget = 0.0005 × 10,000,000 = 5,000 allowed failures.",
          "Used 4,200 = 84%. Left: 800 failures."
        ]
      },
      {
        "heading": "Worked example 5: burn rate",
        "items": [
          "**Burn rate** is how fast you are spending the budget.",
          "Target 99.9% over 30 days (budget 43.2 minutes). After 10 days you have had 30 minutes of downtime.",
          "Budget used: 30 / 43.2 = 0.694.",
          "Time passed: 10 / 30 = 0.333.",
          "Burn rate = 0.694 / 0.333 = **2.08**, so about twice as fast as allowed.",
          "The budget runs out at 30 / 2.08 = 14.4 days, about 4.4 days from now.",
          "**Action**: pause new features and fix reliability."
        ]
      },
      {
        "heading": "Worked example 6: working backwards and composite availability",
        "items": [
          {
            "type": "p",
            "text": "Working backwards"
          },
          "2 hours down in 30 days: SLI = (720 - 2) / 720 = 99.722%.",
          "That meets a 99.5% target but misses 99.9%.",
          "Most downtime allowed for 99.99% over a year = 0.0001 × 525,600 = 52.56 minutes.",
          {
            "type": "p",
            "text": "Services in a chain (all must work)"
          },
          "Multiply them. 99.9% × 99.5% = **99.40%** (0.999 × 0.995 = 0.994005).",
          "Three 99.9% parts in a row = 99.70%.",
          "More links in the chain means lower availability.",
          {
            "type": "p",
            "text": "Backup copies (either one works)"
          },
          "1 - (1 - 0.99)^2 = 99.99%.",
          {
            "type": "p",
            "text": "Speed as the measurement"
          },
          "1,000,000 requests, 962,000 answered under 300 ms: SLI = 96.2%.",
          "A target of \"95% under 300 ms\" is met, with 1.2 points to spare."
        ]
      },
      {
        "heading": "Compliance checks and decisions",
        "items": [
          "**In your answer, state**: the SLI, the target, allowed vs actual downtime, met or not, % of budget used, and what to do.",
          "**Budget healthy**: ship features and experiment.",
          "**Budget gone**: freeze risky changes, fix reliability, hold a blameless review.",
          "**SLA breach**: penalties apply. Keep the SLO stricter than the SLA (SLO 99.95%, SLA 99.9%).",
          "Error budgets give developers and operations one shared view of risk.",
          "Extra, not on the slides: alert on fast burn as well as slow. A burn rate of 14.4 spends 2% of a 30-day budget in 1 hour."
        ]
      }
    ],
    "pitfalls": [
      "Do not mix up hours and minutes.",
      "The budget is 0.1% of the time window, not 99.9% of the downtime.",
      "If downtime is more than allowed, the SLO is **not** met.",
      "SLI = measured, SLO = target, SLA = contract.",
      "Always end with \"met\" or \"not met\" and what the team should do."
    ]
  },
  {
    "id": "mttd-mttr-mtbf",
    "title": "Incident metrics: MTTD, MTTR, MTBF calculations",
    "priority": 19,
    "tier": "likely",
    "hint": "likely",
    "freq": "2/7 papers (2025-26 s1 Q3d, autumn Q3c); hinted calculations",
    "marks": "4-10 marks",
    "summary": "**MTTD = start to detection; MTTR = detection to restoration (as the papers define it); average = sum / number of incidents. Convert everything to one unit first, then identify the incident with the smallest times.**",
    "mnemonic": "Detect time, Repair time: D then R; add up, divide by n",
    "source": [
      "CT417_Exam_2025-2026_1_1_5",
      "CT417_Exam_2025-2026_1_2_3",
      "CT417_Notes_11a_Reliability_Monitoring"
    ],
    "sections": [
      {
        "heading": "Definitions as used in the papers",
        "items": [
          "**MTTD (mean time to detect)**: average time from the incident starting to it being detected.",
          "**MTTR (mean time to repair/recover)**: average time from detection to service restoration (autumn 2025 paper definition). Total downtime = MTTD + MTTR for an incident.",
          "**MTBF (mean time between failures)**: normally operating time between failures divided by the number of failures. The Semester 1 paper told you to ASSUME MTBF = MTTD + MTTR per incident: follow the question's assumption and state it.",
          "High observability and automated alerting reduce MTTD and MTTR."
        ]
      },
      {
        "heading": "Worked example A (2025-26 Semester 1 Q3d)",
        "items": [
          {
            "type": "table",
            "head": [
              "#",
              "MTTD",
              "MTTR",
              "Total downtime",
              "MTBF = MTTD + MTTR"
            ],
            "rows": [
              [
                "1",
                "4 h",
                "2 h",
                "6 h",
                "6 h"
              ],
              [
                "2",
                "30 min = 0.5 h",
                "1 h",
                "1.5 h",
                "1.5 h"
              ],
              [
                "3",
                "6 h",
                "4 h",
                "10 h",
                "10 h"
              ]
            ]
          },
          "Average MTBF = (6 + 1.5 + 10) / 3 = 17.5 / 3 = **5.83 h** (5 h 50 min).",
          "Best performance: **incident 2**: smallest MTTD (30 min) and MTTR (1 h), shortest downtime (1.5 h), because automated alerting was active.",
          "Two improvements: (1) automated alert correlation and tuned alerting thresholds/on-call paging to cut MTTD; (2) runbooks, automated rollback/patch pipelines and better triage to cut MTTR. Also observability (logs, metrics, traces), chaos/game days, blameless postmortems."
        ]
      },
      {
        "heading": "Worked example B (2025-26 Autumn Q3c, from timestamps)",
        "items": [
          {
            "type": "table",
            "head": [
              "Incident",
              "Start",
              "Detected",
              "Restored",
              "MTTD (start to detect)",
              "MTTR (detect to restore)"
            ],
            "rows": [
              [
                "1",
                "09:00",
                "09:40",
                "10:30",
                "40 min",
                "50 min"
              ],
              [
                "2",
                "13:15",
                "13:20",
                "13:50",
                "5 min",
                "30 min"
              ],
              [
                "3",
                "18:00",
                "19:30",
                "21:00",
                "90 min",
                "90 min"
              ]
            ]
          },
          "Average MTTD = (40 + 5 + 90) / 3 = 135 / 3 = **45 min**. Average MTTR = (50 + 30 + 90) / 3 = 170 / 3 = **56.7 min** (56 min 40 s).",
          "Best: **incident 2** (5 min + 30 min = 35 min total outage; incident 1 = 90 min; incident 3 = 180 min)."
        ]
      },
      {
        "heading": "Relating to availability",
        "items": [
          "Total downtime in a period = sum of (MTTD + MTTR) over incidents. Plug it into the SLI formula: example A total downtime 6 + 1.5 + 10 = 17.5 h over a quarter (about 2,160 h): SLI = (2,160 - 17.5) / 2,160 = 99.19%.",
          "To protect an SLO you can reduce frequency (fewer failures), MTTD (detect sooner) or MTTR (recover faster)."
        ]
      }
    ],
    "pitfalls": [
      "Mixing hours and minutes in the average.",
      "Computing MTTR from incident start instead of detection (check the definition in the question).",
      "Forgetting to state the assumption MTBF = MTTD + MTTR when the question gives it.",
      "Not justifying the \"best\" incident with numbers."
    ]
  },
  {
    "id": "api-design-openapi",
    "title": "API design, API-first, OpenAPI and Swagger",
    "priority": 17,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q4b; 0/7 papers",
    "marks": "5-8 marks",
    "summary": "**API-first: agree the contract (OpenAPI) before building. Use nouns for resources and HTTP methods for actions, correct status codes, versioning, additive not breaking changes, and secure with auth, rate limiting, validation and HTTPS.**",
    "mnemonic": "Nouns + verbs + codes; Contract first: Define, Mock, Test, Implement",
    "source": [
      "CT417_Notes_08a_API_First_Design",
      "CT417_Notes_08b_OpenAPI_Swagger"
    ],
    "sections": [
      {
        "heading": "API and API-first",
        "items": [
          "An **API** lets software systems communicate, sharing data and functionality securely. A client sends a request, the API gets data from the server and the response (usually JSON) returns.",
          "**API contract**: methods, data formats and conventions two programs follow: method, path, parameters, status codes and response schema, i.e. the behaviour clients observe and rely on.",
          "**API-first**: treat the contract as a design artefact agreed BEFORE implementing the behaviour behind it. In an existing system: define the intended contract change before changing the implementation.",
          "Workflow: **Define contract, Mock APIs, Test APIs, Implement APIs**. The contract is the single source of truth for development and documentation.",
          "Benefits: consistency across teams; reduced integration risk (issues surface while it is still a design); frontend and backend work in parallel (faster development); safer evolution (changes checked against the contract); better developer experience and onboarding; docs, mocks, tests, SDKs generated from one spec."
        ]
      },
      {
        "heading": "Design best practice",
        "items": [
          "Name resources with **nouns** (plural), let the HTTP **method** say what happens: `/api/pets`, `/api/pets/8/visits`.",
          {
            "type": "table",
            "head": [
              "Method",
              "Use",
              "Typical success code"
            ],
            "rows": [
              [
                "GET",
                "Retrieve resource(s); safe, no change",
                "200 OK"
              ],
              [
                "POST",
                "Create a new resource",
                "201 Created"
              ],
              [
                "PUT",
                "Replace/update an existing resource (or create)",
                "200 OK / 204"
              ],
              [
                "PATCH",
                "Partially update",
                "200 OK"
              ],
              [
                "DELETE",
                "Remove",
                "204 No Content"
              ]
            ]
          },
          {
            "type": "table",
            "head": [
              "Error code",
              "Meaning"
            ],
            "rows": [
              [
                "400 Bad Request",
                "Invalid request parameters"
              ],
              [
                "401 Unauthorized",
                "Authentication required"
              ],
              [
                "403 Forbidden",
                "Authenticated but insufficient permissions"
              ],
              [
                "404 Not Found",
                "Resource not found"
              ],
              [
                "409 Conflict",
                "State conflict (duplicate booking)"
              ],
              [
                "500 Internal Server Error",
                "Generic server error"
              ]
            ]
          },
          "Use a **consistent error format** (JSON with code, message, details) and the right status code.",
          "**Versioning**: URI versioning (`/v1/users`), header versioning (custom header); deprecate gracefully giving clients time to migrate.",
          "**Additive change** (new optional capability, existing requests and responses preserved) vs **breaking change** (removes/changes behaviour clients rely on). Example: `GET /api/visits` still returns the full list while `GET /api/visits?petId=8` adds an optional filter (additive). Making petId mandatory would break existing clients. A cleaner design is not permission to break a contract: make an explicit compatibility decision."
        ]
      },
      {
        "heading": "API security (four points)",
        "items": [
          "**Authentication**: OAuth2 access tokens (delegated, limited access without sharing credentials), JWT (compact, self-contained, stateless tokens carrying claims), API keys (simple identification of calling app, passed in header).",
          "**Rate limiting**: thresholds per API key or IP protect against DoS/abuse (429 Too Many Requests).",
          "**Input validation**: validate types, formats and ranges; prefer allowlists to denylists; parameterised queries.",
          "**HTTPS everywhere**: TLS encrypts data in transit and prevents man-in-the-middle attacks."
        ]
      },
      {
        "heading": "OpenAPI and Swagger",
        "items": [
          "**OpenAPI Specification**: a standard, language-agnostic format (YAML or JSON) describing RESTful APIs. It is the contract between provider and consumer. Since 2015 the specification is called OpenAPI; **Swagger** is the tooling around it.",
          {
            "type": "table",
            "head": [
              "Swagger tool",
              "What it does"
            ],
            "rows": [
              [
                "Swagger Editor",
                "Write OpenAPI definitions with real-time error feedback"
              ],
              [
                "Swagger UI",
                "Interactive API documentation generated from the spec"
              ],
              [
                "Swagger Codegen",
                "Generate server stubs and client SDKs"
              ],
              [
                "SwaggerHub",
                "Team collaboration on API design/docs"
              ]
            ]
          },
          "One spec carries an API from design to docs to code to tests; mock servers let the frontend build in parallel."
        ]
      },
      {
        "heading": "Example OpenAPI document (vet clinic visits)",
        "items": [
          {
            "type": "code",
            "text": "openapi: 3.0.3\ninfo:\n  title: Vet Clinic API\n  version: 1.0.0\nservers:\n  - url: https://api.vetclinic.ie/v1\npaths:\n  /visits:\n    get:\n      summary: List visits, optionally for one pet\n      parameters:\n        - name: petId\n          in: query\n          required: false\n          schema:\n            type: integer\n      responses:\n        '200':\n          description: A list of visits\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/Visit'\n        '400':\n          description: Malformed petId\n        '404':\n          description: Unknown pet\n    post:\n      summary: Record a visit\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/NewVisit'\n      responses:\n        '201':\n          description: Visit created\n  /visits/{id}:\n    get:\n      summary: Get one visit\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: integer\n      responses:\n        '200':\n          description: The visit\n        '404':\n          description: Not found\ncomponents:\n  schemas:\n    Visit:\n      type: object\n      required: [id, petId, date]\n      properties:\n        id: { type: integer }\n        petId: { type: integer }\n        date: { type: string, format: date }\n        notes: { type: string }\n    NewVisit:\n      type: object\n      required: [petId, date]\n      properties:\n        petId: { type: integer }\n        date: { type: string, format: date }\n        notes: { type: string }"
          },
          "Key blocks: `openapi` version, `info`, `servers`, `paths` (each path with methods, parameters, requestBody, responses with status codes), `components/schemas` reused via `$ref`."
        ]
      }
    ],
    "pitfalls": [
      "Using verbs in URLs (/getVisits) instead of nouns + HTTP methods.",
      "Making a breaking change (mandatory new parameter) without versioning.",
      "Confusing OpenAPI (the spec) with Swagger (the tools).",
      "Returning 200 for errors, or 500 for client mistakes."
    ]
  },
  {
    "id": "monitoring-observability",
    "title": "Monitoring, observability, Prometheus and Grafana",
    "priority": 32,
    "tier": "low",
    "hint": "unlikely",
    "freq": "hinted unlikely (tools); concepts est. low",
    "marks": "3-6 marks",
    "summary": "**Monitoring tracks known metrics against thresholds (Prometheus scrapes, Grafana visualises); observability (logs, metrics, traces) explains why. A target being UP means the scrape worked, not that the app is correct.**",
    "mnemonic": "LMT: Logs, Metrics, Traces; Prometheus pulls, Grafana paints",
    "source": [
      "CT417_Notes_11a_Reliability_Monitoring",
      "CT417_Notes_11b_Grafana",
      "CT417_Notes_11c_Prometheus"
    ],
    "sections": [
      {
        "heading": "Monitoring vs observability",
        "items": [
          "**Monitoring**: continuously tracking system metrics (latency, uptime, error rate, throughput, CPU, memory); proactive; alerts when predefined thresholds are crossed; detects KNOWN problems.",
          "**Observability**: deep insight into internal state from outputs, to understand WHY something fails. Three pillars: **logs** (text event records), **metrics** (numbers over time), **traces** (path of a request across services). Reduces MTTR.",
          "**Playbook**: organisational goals, escalation paths, communication, general incident guidelines. **Runbook**: step-by-step technical instructions for an on-call engineer responding to a specific alert.",
          "**Blameless postmortem**: after an incident, document what happened (timeline), why (root cause, 5 Whys) and what to do better; focus on process, not blame.",
          "SRE vs DevOps: DevOps = culture of shared responsibility, CI/CD, IaC; SRE = specific engineering practice with SLOs, error budgets and toil reduction. They complement each other."
        ]
      },
      {
        "heading": "Prometheus",
        "items": [
          "Open-source monitoring system: **pull-based scraping** of an HTTP metrics endpoint, stores **time series** (metric name + labels) in its TSDB, query with **PromQL**, alert rules sent to Alertmanager (email, PagerDuty).",
          "`up{job=\"petclinic\"}` is 1 when the latest scrape succeeded, 0 when it failed. Example query: `sum(rate(http_server_requests_seconds_count[5m]))` (only if the metric exists).",
          "Spring Boot: add `spring-boot-starter-actuator` and `micrometer-registry-prometheus`; expose `management.endpoints.web.exposure.include=health,info,prometheus`.",
          {
            "type": "code",
            "text": "global:\n  scrape_interval: 15s\nscrape_configs:\n  - job_name: \"petclinic\"\n    metrics_path: \"/petclinic/actuator/prometheus\"\n    static_configs:\n      - targets: [\"host.docker.internal:9966\"]"
          },
          "Inside a container, `localhost` means the container itself: use the container name on a shared Docker network."
        ]
      },
      {
        "heading": "Grafana",
        "items": [
          "Visualisation tool: dashboards made of panels; queries Prometheus as a data source (`http://ct417-prometheus:9090`); supports annotations (mark a deployment) and alerting.",
          "Each panel answers one operational question (scrape reachability, request traffic, JVM heap). Alert on impact-related symptoms over an evaluation period, not every spike. Correlation across panels is not causation.",
          "A healthy dashboard or UP target is not the same as a healthy application: also verify the user-facing operation.",
          {
            "type": "code",
            "text": "docker network create ct417-monitoring\ndocker run --detach --name ct417-grafana --network ct417-monitoring --publish 127.0.0.1:3000:3000 grafana/grafana"
          }
        ]
      }
    ],
    "pitfalls": [
      "Treating monitoring and observability as the same thing.",
      "Spending time on tool detail when only the SLI/SLO calculations are likely."
    ]
  }
];
