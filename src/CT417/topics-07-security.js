module.exports = [
  {
    "id": "sca-security",
    "title": "SCA: Software Composition Analysis, dependencies and supply chain",
    "priority": 18,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted (\"SCA security y\", Q4a); 1/7 papers (2025-26 autumn Q3a,b) + scenario mentions",
    "marks": "5-10 marks",
    "summary": "**SCA scans the third-party and transitive dependencies you ship for known vulnerabilities (CVEs). Prioritise by severity, exposure, business impact and fix availability; remediate through a branch, version bump, tests, review, CI and safe deployment.**",
    "mnemonic": "SEBF: Severity, Exposure, Business impact, Fix available",
    "source": [
      "CT417_Notes_06a_Software_Security",
      "CT417_Notes_06c_Static_Code_Analysis",
      "CT417_Notes_06b_Security_Vulnerabilities",
      "CT417_Exam_2025-2026_1_2_3"
    ],
    "sections": [
      {
        "heading": "Why SCA: supply chain security",
        "items": [
          {
            "type": "p",
            "text": "Words"
          },
          "A **dependency** is a library written by someone else that your app uses.",
          "The **software supply chain** is everything that goes into your software from outside. If one dependency is hacked, every app using it is affected.",
          "**Direct dependencies** are ones you choose and list in a **manifest** (`pom.xml` for Java, `package.json` for JavaScript).",
          "**Transitive dependencies** are pulled in by those dependencies. You cannot easily control them, and the manifest alone does not show everything that ends up deployed.",
          {
            "type": "p",
            "text": "SAST compared with SCA"
          },
          "**SAST** (static application security testing) reads **your own** code: which patterns look risky and deserve a look? Its evidence is a file, line, rule and data path.",
          "**SCA** (software composition analysis) checks what you **inherited**: which of your libraries have known security holes? Its evidence is a package, version, how you got it, and the published warning (advisory).",
          "You write code and also inherit software, so both need checking.",
          {
            "type": "p",
            "text": "What an SCA tool does"
          },
          "Lists every component (a **software bill of materials**, SBOM).",
          "Shows the dependency tree.",
          "Adds vulnerability details: the ID and how severe it is.",
          "Raises alerts for vulnerable dependencies, and checks licences."
        ]
      },
      {
        "heading": "Tools and vocabulary",
        "items": [
          {
            "type": "p",
            "text": "Dependabot (built into GitHub)"
          },
          "It reduces risk from vulnerable dependencies, keeps software up to date and saves manual work.",
          "Three features: (1) **security alerts**, (2) **security updates** (it opens a pull request upgrading to the fixed version), (3) **version updates** (routine upgrades).",
          "Other tools: **Trivy** (scans Docker images and folders), **OWASP Dependency-Check**, **Snyk**, `npm audit`.",
          {
            "type": "p",
            "text": "What a security alert contains"
          },
          "Package name, and the vulnerability IDs: a GitHub advisory (GHSA-xxxx) and a CVE number (CVE-2024-xxxx).",
          "Severity: Low, Moderate, High or Critical.",
          "Which versions are affected and which are fixed.",
          "Whether the dependency is direct or transitive, the manifest file, and links.",
          {
            "type": "p",
            "text": "CVE and CWE"
          },
          "**CVE** (Common Vulnerabilities and Exposures): a unique public ID for one known security hole. The list is run by an organisation called MITRE.",
          "**CWE** (Common Weakness Enumeration): the **categories** of mistake behind those holes (there are far fewer of these)."
        ]
      },
      {
        "heading": "A finding is evidence, not a verdict",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                "Finding",
                "Verify the condition",
                "Check exposure and reachability",
                "Consider consequence and context",
                "Make a security decision",
                "Act where justified",
                "Retest"
              ],
              "direction": "row"
            },
            "caption": "Reasoning chain for any scanner finding."
          },
          {
            "type": "p",
            "text": "Three different words"
          },
          "A **finding** is something a tool noticed.",
          "A **vulnerability** is a weakness you have checked and found to matter in this system.",
          "A **risk** is the harm and how likely it is, given how the system is deployed.",
          "High severity does not automatically mean change the code at once. Severity helps decide what to investigate first.",
          "A **false positive** is a wrong warning. \"Not exploitable (usable by an attacker) here and now\" is **not** the same thing.",
          "A successful scanner run does not mean the application has no risk."
        ]
      },
      {
        "heading": "Prioritising findings (2025-26 autumn Q3a, pick TWO to fix)",
        "items": [
          {
            "type": "table",
            "head": [
              "Finding",
              "Package / version",
              "Severity",
              "Exposure",
              "Fix",
              "Verdict"
            ],
            "rows": [
              [
                "A auth-api",
                "express 4.17.1",
                "High",
                "Public API",
                "Yes",
                "FIX: high severity on an internet-facing authentication service, fix available"
              ],
              [
                "B payment-api",
                "lodash 4.17.20",
                "High",
                "Internal batch processing",
                "Yes",
                "Next: high but internal exposure; schedule soon"
              ],
              [
                "C web-app",
                "React deps 4.0.3",
                "Medium",
                "Build-time scripts",
                "Requires major upgrade",
                "Defer: medium, not runtime, costly upgrade"
              ],
              [
                "D auth-api",
                "jsonwebtoken 8.5.1",
                "Critical",
                "Customer session tokens",
                "Yes",
                "FIX FIRST: critical, protects session tokens/authentication, fix available"
              ]
            ]
          },
          "**Answer**: fix **D** (critical, used for customer sessions: token forgery/account takeover, fix exists) and **A** (high, public API on the authentication service). Justify with severity, exposure, business impact (authentication and banking trust, compliance) and fix availability. B is internal, C is medium/build-time and needs a risky major upgrade."
        ]
      },
      {
        "heading": "Safe remediation workflow for the top finding (5 marks)",
        "items": [
          "1. **Git**: create a branch `fix/jsonwebtoken-upgrade` from main (or accept the Dependabot PR).",
          "2. **Package management**: upgrade to the patched version (`npm install jsonwebtoken@latest-patched` or edit pom.xml), commit the updated manifest and lockfile, check transitive impact (`npm ls`, `mvn dependency:tree`), read the changelog for breaking changes.",
          "3. **Test**: run unit and integration tests locally; add a regression test for token verification (valid, expired, tampered).",
          "4. **CI/CD**: push, open a pull request; CI runs build, tests, SAST and SCA again (the alert should disappear).",
          "5. **Review**: at least one reviewer approves; branch protection requires green checks.",
          "6. **Deploy safely**: merge, deploy to staging, smoke test and DAST, then production by canary/blue-green with monitoring and a rollback plan (redeploy the previous image tag).",
          "7. **Verify and record**: confirm the alert is closed, document the decision, keep the SBOM updated."
        ]
      }
    ],
    "pitfalls": [
      "Ranking by severity alone: exposure, business impact and fix availability must be argued.",
      "Believing transitive dependencies are not your responsibility.",
      "Updating a library and deploying straight to production with no tests or rollback.",
      "Mixing up SCA (dependencies) and SAST (your code)."
    ]
  },
  {
    "id": "sast-dast-zap-sonar",
    "title": "SAST, DAST, SonarQube and OWASP ZAP in the pipeline",
    "priority": 22,
    "tier": "likely",
    "freq": "3/7 papers (2024-25 Q2, 2025-26 s1 Q2, autumn Q2)",
    "marks": "5-20 marks",
    "summary": "**SAST analyses source code without running it (early, needs code); DAST attacks the running app from outside (later, no code needed). They find different things, so use both in CI/CD. Tune SonarQube with incremental analysis; fix ZAP failures by ensuring the target is up and reports are saved.**",
    "mnemonic": "SAST = Source, Static, Soon (early). DAST = Dynamic, Deployed, Down-the-line",
    "source": [
      "CT417_Notes_06c_Static_Code_Analysis",
      "CT417_Notes_06d_DAST",
      "CT417_Notes_06e_OWASP_ZAP",
      "CT417_Exam_2024-2025_1_1_5",
      "CT417_Exam_2025-2026_1_1_5",
      "CT417_Exam_2025-2026_1_2_3"
    ],
    "sections": [
      {
        "heading": "SAST vs DAST (5-mark comparison)",
        "items": [
          "**SAST** (static application security testing) inspects the **source code** without running it.",
          "**DAST** (dynamic application security testing) attacks or probes the **running app** from outside.",
          {
            "type": "table",
            "head": [
              "",
              "SAST (Static Application Security Testing)",
              "DAST (Dynamic Application Security Testing)"
            ],
            "rows": [
              [
                "When",
                "Early: while coding, on commit/PR, before running (shift left)",
                "Later: needs a running app, in test/staging, after deployment"
              ],
              [
                "Source code needed?",
                "Yes (white-box: source, bytecode, config)",
                "No (black-box: only HTTP/HTTPS surface)"
              ],
              [
                "Finds",
                "Insecure code patterns, injection flows (source to sink), hard-coded secrets, dangerous APIs, also bugs/code smells",
                "Runtime issues: missing security headers, cookie flags, exposed endpoints (h2-console), auth/session problems, error handling, some injection/XSS, config issues"
              ],
              [
                "Misses",
                "Runtime configuration, whether it is reachable/exploitable",
                "Unreachable code, paths the scanner never discovers, logic flaws, dependency issues not exercised"
              ],
              [
                "Speed/cost",
                "Fast, cheap to fix (early)",
                "Slower, needs environment"
              ],
              [
                "Tools",
                "SonarQube, Semgrep, CodeQL",
                "OWASP ZAP, Burp Suite"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Words in that table"
          },
          "**Shift left**: check earlier in development. **White-box**: the tool can see the code. **Black-box**: it only sees what an outsider sees.",
          "An **injection flow** is user input travelling from where it enters (the **source**) to a dangerous operation such as a database query (the **sink**).",
          "**XSS**: an attacker getting their script to run in another user's browser. **h2-console**: a database admin page that should not be public.",
          "The third kind of check, **SCA**, looks at your libraries for known holes."
        ]
      },
      {
        "heading": "Why all three, and why in CI/CD",
        "items": [
          "They see different things and none gives the complete picture:",
          "SAST: what the code suggests might be wrong.",
          "SCA: known weaknesses in components.",
          "DAST: what an outside user can observe.",
          {
            "type": "p",
            "text": "Why run them in the automatic pipeline (CI/CD, 2 marks)"
          },
          "Finds vulnerabilities early and automatically on every change, when they are cheaper to fix.",
          "Consistent (not relying only on manual checks), keeps releases fast, and leaves ongoing evidence for **compliance** (proving rules are followed)."
        ]
      },
      {
        "heading": "How static analysis works",
        "items": [
          {
            "type": "p",
            "text": "Steps"
          },
          "Read the program, work out its structure, apply rules, follow how data and control move through it, report findings, then a human investigates.",
          {
            "type": "p",
            "text": "Techniques"
          },
          "**Syntax and structural rules**: patterns in how the code is written.",
          "**Semantic analysis**: what names and types actually mean.",
          "**Data-flow analysis**: follows data from where it enters (source) to a sensitive operation (sink).",
          "**Control-flow analysis**: follows the possible paths of execution.",
          {
            "type": "p",
            "text": "Reasons for a false positive (a wrong warning)"
          },
          "The tool misunderstood the code, the pattern can never actually run, the feature is unused, another protection already covers it, or it is real but low risk here."
        ]
      },
      {
        "heading": "OWASP ZAP (Zed Attack Proxy)",
        "items": [
          "**ZAP** is a free DAST tool. It sits between your browser and the running app as a **proxy** (a go-between that sees all the traffic), and can also explore and scan by itself.",
          {
            "type": "p",
            "text": "Parts"
          },
          "**History**: every request and response.",
          "**Sites tree**: the web addresses it has discovered.",
          "**Spider**: follows links automatically to discover pages.",
          "**Passive scan**: only looks at the traffic (headers, cookies, leaked information). Low impact.",
          "**Active scan**: sends attack-like requests. It is intrusive and can change data, so use it only on systems you are allowed to test.",
          {
            "type": "p",
            "text": "Judging an alert"
          },
          "Each alert has a **risk** (how bad it could be) and a **confidence** (how sure ZAP is).",
          "Check: the alert, the request and response, the affected address, what the rule means, the context, try to reproduce it, then decide.",
          "If ZAP never discovers an address, it never tests it. Addresses that only accept POST (sending data) may be missed by the spider."
        ]
      },
      {
        "heading": "Why ZAP fails in a pipeline: causes and fixes (2 x 2 marks / 5 marks)",
        "items": [
          {
            "type": "table",
            "head": [
              "Likely technical cause",
              "Practical fix"
            ],
            "rows": [
              [
                "Target app not running/ready when the scan starts, or wrong URL / network (localhost inside the ZAP container is ZAP itself)",
                "Start the staging app first, wait for the health endpoint, put ZAP and the app on the same Docker network and use the service name"
              ],
              [
                "Scan finds nothing: spider cannot reach POST/REST endpoints or authenticated areas",
                "Seed ZAP with the OpenAPI spec or known URLs, configure authentication/context, use API scan mode"
              ],
              [
                "Pipeline step fails on warnings (non-zero exit of baseline scan) or times out on a long active scan",
                "Set alert thresholds/ignore rules, limit scan scope and duration, run baseline passive scan on PRs and full active scan nightly"
              ],
              [
                "No report produced: output not written/mounted or artefact not uploaded",
                "Use report options (`-r`/`-J`), mount a writable volume, upload as a workflow artefact (`actions/upload-artifact`) even on failure (`if: always()`)"
              ],
              [
                "Resource limits/memory on the runner, or permissions on the report directory",
                "Larger runner, increase memory, fix directory permissions"
              ]
            ]
          }
        ]
      },
      {
        "heading": "SonarQube slowing the pipeline: two improvements with trade-offs",
        "items": [
          {
            "type": "table",
            "head": [
              "Improvement",
              "Why it works",
              "Trade-off"
            ],
            "rows": [
              [
                "Incremental / pull-request analysis of changed files only; analyse new code (quality gate on new code)",
                "Scans a small diff instead of the whole code base, so feedback is fast",
                "Legacy code issues are not re-examined each PR; need periodic full scans"
              ],
              [
                "Run the full scan asynchronously/nightly or on merge to main, in parallel to build/tests",
                "Takes the slow scan off the PR critical path",
                "Findings arrive later, so a vulnerable change could merge before the result"
              ],
              [
                "Exclude generated, test, vendor and third-party code; cache the scanner cache and dependencies",
                "Less code to analyse; no repeated downloads",
                "Risk of excluding something that matters; cache management"
              ],
              [
                "Dedicated/larger runner or analyse modules in parallel",
                "More compute reduces time",
                "Costs more infrastructure"
              ]
            ]
          },
          "Do not reduce quality: keep the same rules and quality gate; change WHEN and WHAT is analysed, not how strictly."
        ]
      }
    ],
    "pitfalls": [
      "Saying DAST needs source code or SAST needs a running app.",
      "Treating a scanner alert as proof of a vulnerability.",
      "Suggesting disabling rules to speed up SonarQube (reduces quality).",
      "Running ZAP active scan on systems you do not own."
    ]
  },
  {
    "id": "security-fundamentals",
    "title": "Security fundamentals: vulnerability, zero-day, buffer overflow, injection",
    "priority": 26,
    "tier": "low",
    "hint": "unlikely",
    "freq": "5/7 papers historically (definitions, zero-day, buffer overflow); hinted unlikely (\"other security, definitions\")",
    "marks": "2-10 marks",
    "summary": "**Vulnerability = a weakness that could be exploited; countermeasure reduces threat/vulnerability/attack; zero-day = flaw unknown to the vendor with no patch; buffer overflow = writing past a buffer to corrupt memory, countered by bounds-checking, stack canaries, ASLR, DEP.**",
    "mnemonic": "Zero-day lifecycle: Introduced, Discovered, Exploited, Disclosed, Patched (IDEDP)",
    "source": [
      "CT417_Notes_06a_Software_Security",
      "CT417_Notes_06b_Security_Vulnerabilities",
      "CT417_Exam_2024-2025_1_1_5",
      "CT417_Exam_2025-2026_1_2_3"
    ],
    "sections": [
      {
        "heading": "Definitions (RFC 2828 Internet Security Glossary)",
        "items": [
          "RFC 2828 is a published internet glossary of security terms.",
          "**Software security**: building and developing software so that it resists attacks and keeps working when attacked. It is an ongoing concern, not a feature.",
          "**Vulnerability**: a flaw or weakness in a system's design, implementation, operation or management that could be exploited to break its security rules. Most systems have some, and in software they mainly come from defects. Whether an attack works depends on how serious the weakness is, how strong the attack is and how good the defences are.",
          "**Threat**: a possible event that uses a vulnerability to cause harm. It can be intentional (a cyberattack) or accidental (an earthquake).",
          "**Countermeasure**: anything that reduces a threat, vulnerability or attack, by preventing it, limiting the harm, or detecting and reporting it. Examples: patching (installing fixes), input validation, a firewall, code review.",
          "**Exploit**: software, data or commands that take advantage of a vulnerability to cause unintended behaviour. A **remote** exploit works over a network with no prior access. A **local** one needs access first and usually gains higher permissions (**privilege escalation**)."
        ]
      },
      {
        "heading": "CIA, STRIDE and code-level threats",
        "items": [
          "**CIA**: **Confidentiality** (only the right people can read), **Integrity** (data is not wrongly changed), **Availability** (the system is there when needed).",
          {
            "type": "p",
            "text": "STRIDE, six kinds of threat"
          },
          "**Spoofing**: pretending to be someone else.",
          "**Tampering**: changing data.",
          "**Repudiation**: denying you did something.",
          "**Information disclosure**: leaking data.",
          "**Denial of service**: making the system unusable.",
          "**Elevation of privilege**: gaining permissions you should not have.",
          {
            "type": "p",
            "text": "Code-level threats"
          },
          "**Unintentional**: caused by not knowing secure coding, such as a buffer overflow.",
          "**Intentional**: a malicious insider plants a **logic bomb** (code that does harm when some condition is met).",
          "Defences: security training, **static analysis** (checking code without running it) and **dynamic analysis** (checking it while running), peer code review, job rotation, mandatory holidays."
        ]
      },
      {
        "heading": "Zero-day vulnerability and its life cycle",
        "items": [
          "**Zero-day vulnerability**: a flaw unknown to the vendor/developer (or without an available patch), so there are \"zero days\" to fix it before it can be exploited. A **zero-day exploit/attack** uses it. Examples: Stuxnet (industrial control systems), WannaCry 2017 (Windows exploit).",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                "1 Introduction: flaw created in code",
                "2 Discovery: attacker/researcher finds it, vendor unaware",
                "3 Exploitation: exploit developed and used (zero-day window)",
                "4 Disclosure: vendor learns / public advisory, CVE",
                "5 Patch: fix released and deployed; window closes"
              ],
              "direction": "row"
            },
            "caption": "Five-stage zero-day life cycle (orderings vary slightly; state yours)."
          },
          "Risk persists until users apply the patch; mitigations before a patch: virtual patching/WAF rules, network segmentation, least privilege, monitoring and rapid incident response.",
          "A **patch** is a fix. **Virtual patching** blocks the attack at a **WAF** (web application firewall) before the real fix exists. **Network segmentation** splits the network so damage cannot spread. **Least privilege** gives each user or program only the access it needs."
        ]
      },
      {
        "heading": "Buffer overflow",
        "items": [
          "**Definition**: an attacker (or bug) puts more data into a fixed-size buffer than it can hold, so the excess spills into adjacent memory, overwriting program data or code such as the saved return address. Unsafe C functions (`strcpy`, `gets`, `sprintf`) do no bounds checks.",
          {
            "type": "code",
            "text": "#include <stdio.h>\n#include <string.h>\nvoid copyCustomerName(char *input) {\n    char name[8];\n    strcpy(name, input);      // no length check: input longer than 7 chars overflows\n    printf(\"%s\\n\", name);\n}"
          },
          "**Exploit**: the **stack** is the memory holding a function's local variables and the **return address** (where to continue afterwards). The attacker sends a long input that overwrites that address so it points at their own code (**shellcode**). When the function returns, their code runs with the program's permissions. Results: code execution, privilege escalation, or a crash.",
          {
            "type": "p",
            "text": "Countermeasures (give two)"
          },
          "(1) **Safe coding**: functions that check length (`strncpy` with a terminator, `snprintf`, `fgets`), or languages that manage memory safely (Java, Rust).",
          "(2) **Platform defences**: **stack canaries** (a check value that reveals overwriting, turned on with `-fstack-protector`), **ASLR** (memory locations are randomised), **DEP/NX** (data memory cannot be run as code).",
          "Also: code review, static analysis, **fuzzing** (throwing random input at a program), least privilege.",
          {
            "type": "code",
            "text": "void copyCustomerName(const char *input) {\n    char name[8];\n    strncpy(name, input, sizeof(name) - 1);\n    name[sizeof(name) - 1] = '\\0';\n    printf(\"%s\\n\", name);\n}"
          }
        ]
      },
      {
        "heading": "Common web vulnerability families (week 6)",
        "items": [
          {
            "type": "p",
            "text": "SQL injection"
          },
          "User input changes the structure of a database query, so data is treated as commands.",
          "Bad: `\"SELECT * FROM users WHERE username = '\" + username + \"'\"`.",
          "Fix: **parameterised queries**, `prepareStatement(\"... WHERE username = ?\")` then `setString`. Validation helps but does not replace this.",
          {
            "type": "p",
            "text": "XSS (cross-site scripting)"
          },
          "An attacker's text is sent back to a browser and run there as a script.",
          "Defences: **output encoding** (display special characters as plain text), safe page templates, **Content Security Policy** (the site tells the browser which scripts may run).",
          {
            "type": "p",
            "text": "CSRF (cross-site request forgery)"
          },
          "A user's browser is tricked into sending a request that changes something, using their logged-in identity.",
          "Defences: **CSRF tokens** (a secret value each real form carries), **SameSite cookies** (not sent from other sites), checking the request's origin.",
          {
            "type": "p",
            "text": "Others"
          },
          "**Insecure deserialisation**: rebuilding objects from untrusted data does something unintended. Restrict which types are allowed.",
          "**Improper input validation**: assumptions about type, length, range or format are never checked. Validate where untrusted data enters, using allowlists.",
          "Security misconfiguration (wrong settings), insecure dependencies and human error are behind most issues."
        ]
      }
    ],
    "pitfalls": [
      "Defining zero-day as \"a new virus\": it is an unpatched vulnerability unknown to the vendor.",
      "Describing buffer overflow without saying what is overwritten and what the attacker gains.",
      "Giving only one countermeasure when two are requested.",
      "Fixing SQL injection only with input validation instead of parameterised queries."
    ]
  },
  {
    "id": "devsecops",
    "title": "DevSecOps: shifting security left",
    "priority": 27,
    "tier": "low",
    "hint": "unlikely",
    "freq": "hinted \"n?\"; est. low",
    "marks": "3-6 marks",
    "summary": "**DevSecOps integrates security throughout the DevOps lifecycle and moves it earlier (shift left) so vulnerabilities are found when cheap to fix, using automated security testing in CI/CD.**",
    "mnemonic": "Shift left: Security as Code, Automate tests, Continuous monitoring, IaC, Training",
    "source": [
      "CT417_Notes_06a_Software_Security"
    ],
    "sections": [
      {
        "heading": "Why and what",
        "items": [
          {
            "type": "p",
            "text": "The problem"
          },
          "Traditionally security was checked at the end, so costly vulnerabilities reached the live system.",
          "Faster development, **microservices** (many small services), containers and cloud give attackers more places to try (a bigger **attack surface**).",
          "2023 saw more supply-chain attacks (through third-party software), **phishing** (tricking people into giving details) and **ransomware** (locking data until paid).",
          {
            "type": "p",
            "text": "The idea"
          },
          "**DevOps** is development and operations working as one. **DevSecOps** builds security into every stage of it.",
          "**Shift left**: do security earlier, before deployment. Fixes are cheaper and easier, there are fewer ways in for attackers, and problems are visible sooner.",
          {
            "type": "p",
            "text": "Benefits"
          },
          "Less time spent fixing bugs, continuous security (automatic tests and monitoring), better **compliance** with rules such as GDPR (data protection) and PCI-DSS (card payments), and shared responsibility between teams.",
          {
            "type": "p",
            "text": "Best practices"
          },
          "**Security as code**: security rules and tests stored in version control.",
          "**Automated testing** in the pipeline: static, dynamic and dependency checks.",
          "**Continuous monitoring**.",
          "**Infrastructure as code**: servers set up from files, so the secure setup is repeatable.",
          "Training and awareness."
        ]
      }
    ],
    "pitfalls": [
      "Treating security as a final gate; the point is early and continuous."
    ]
  }
];
