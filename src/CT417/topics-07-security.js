module.exports = [
  {
    id: 'sca-security',
    title: 'SCA: Software Composition Analysis, dependencies and supply chain',
    priority: 18,
    tier: 'core',
    hint: 'likely',
    freq: 'hinted ("SCA security y", Q4a); 1/7 papers (2025-26 autumn Q3a,b) + scenario mentions',
    marks: '5-10 marks',
    summary: '**SCA scans the third-party and transitive dependencies you ship for known vulnerabilities (CVEs). Prioritise by severity, exposure, business impact and fix availability; remediate through a branch, version bump, tests, review, CI and safe deployment.**',
    mnemonic: 'SEBF: Severity, Exposure, Business impact, Fix available',
    source: ['CT417_Notes_06a_Software_Security', 'CT417_Notes_06c_Static_Code_Analysis', 'CT417_Notes_06b_Security_Vulnerabilities', 'CT417_Exam_2025-2026_1_2_3'],
    sections: [
      {
        heading: 'Why SCA: supply chain security',
        items: [
          'Modern apps use hundreds of third-party components; software supply chains are a major attack surface. A compromised dependency compromises everything that uses it.',
          '**Direct dependencies** are chosen by us and declared in a manifest (pom.xml, package.json). **Transitive dependencies** are pulled in by those dependencies: we cannot easily control them, and reading only the manifest is not enough to know the deployed component set.',
          '**SAST vs SCA**: SAST asks "which security-relevant patterns or flows in OUR code deserve investigation?"; SCA asks "which known vulnerable components have we INHERITED?" Evidence: SAST = file, line, rule, flow; SCA = package, version, dependency path, advisory/CVE. We write code AND inherit software; both need checking.',
          '**SCA tool functions**: component inventory (bill of materials, SBOM), dependency tree visualisation, vulnerability data enrichment (CVE/GHSA/severity), alerts on vulnerable dependencies, licence checks.'
        ]
      },
      {
        heading: 'Tools and vocabulary',
        items: [
          '**Dependabot** (GitHub-native): reduces risk from vulnerable dependencies, keeps software up to date, minimises manual effort. Features: 1 **Security alerts**, 2 **Security updates** (auto PR to the patched version), 3 **Version updates** (routine updates).',
          'Other SCA/component tools: Trivy (images and filesystems), OWASP Dependency-Check, Snyk, `npm audit`.',
          'A security alert contains: package name, vulnerability id (GitHub Advisory GHSA-xxxx), CVE identifier (CVE-2024-xxxx), severity (Low/Moderate/High/Critical), affected version range, patched version range, dependency type (direct/transitive), manifest file path, reference links.',
          '**CVE** (Common Vulnerabilities and Exposures): public reference method and unique identifier for known vulnerabilities, maintained by MITRE. **CWE** (Common Weakness Enumeration): categorises the types of weaknesses behind CVEs (fewer entries).'
        ]
      },
      {
        heading: 'A finding is evidence, not a verdict',
        items: [
          { type: 'diagram', kind: 'flow', data: { steps: ['Finding', 'Verify the condition', 'Check exposure and reachability', 'Consider consequence and context', 'Make a security decision', 'Act where justified', 'Retest'], direction: 'row' }, caption: 'Reasoning chain for any scanner finding.' },
          'Distinguish: finding (tool observed something), vulnerability (weakness verified and relevant to this system), risk (consequence and likelihood in the deployment context).',
          'HIGH severity does not automatically mean change code immediately; severity helps prioritise investigation. "Not currently exploitable in this context" is not the same as "false positive".',
          'A successful scanner run does not mean the application has no risk.'
        ]
      },
      {
        heading: 'Prioritising findings (2025-26 autumn Q3a, pick TWO to fix)',
        items: [
          { type: 'table', head: ['Finding', 'Package / version', 'Severity', 'Exposure', 'Fix', 'Verdict'], rows: [
            ['A auth-api', 'express 4.17.1', 'High', 'Public API', 'Yes', 'FIX: high severity on an internet-facing authentication service, fix available'],
            ['B payment-api', 'lodash 4.17.20', 'High', 'Internal batch processing', 'Yes', 'Next: high but internal exposure; schedule soon'],
            ['C web-app', 'React deps 4.0.3', 'Medium', 'Build-time scripts', 'Requires major upgrade', 'Defer: medium, not runtime, costly upgrade'],
            ['D auth-api', 'jsonwebtoken 8.5.1', 'Critical', 'Customer session tokens', 'Yes', 'FIX FIRST: critical, protects session tokens/authentication, fix available']
          ] },
          '**Answer**: fix **D** (critical, used for customer sessions: token forgery/account takeover, fix exists) and **A** (high, public API on the authentication service). Justify with severity, exposure, business impact (authentication and banking trust, compliance) and fix availability. B is internal, C is medium/build-time and needs a risky major upgrade.'
        ]
      },
      {
        heading: 'Safe remediation workflow for the top finding (5 marks)',
        items: [
          '1. **Git**: create a branch `fix/jsonwebtoken-upgrade` from main (or accept the Dependabot PR).',
          '2. **Package management**: upgrade to the patched version (`npm install jsonwebtoken@latest-patched` or edit pom.xml), commit the updated manifest and lockfile, check transitive impact (`npm ls`, `mvn dependency:tree`), read the changelog for breaking changes.',
          '3. **Test**: run unit and integration tests locally; add a regression test for token verification (valid, expired, tampered).',
          '4. **CI/CD**: push, open a pull request; CI runs build, tests, SAST and SCA again (the alert should disappear).',
          '5. **Review**: at least one reviewer approves; branch protection requires green checks.',
          '6. **Deploy safely**: merge, deploy to staging, smoke test and DAST, then production by canary/blue-green with monitoring and a rollback plan (redeploy the previous image tag).',
          '7. **Verify and record**: confirm the alert is closed, document the decision, keep the SBOM updated.'
        ]
      }
    ],
    pitfalls: [
      'Ranking by severity alone: exposure, business impact and fix availability must be argued.',
      'Believing transitive dependencies are not your responsibility.',
      'Updating a library and deploying straight to production with no tests or rollback.',
      'Mixing up SCA (dependencies) and SAST (your code).'
    ]
  },

  {
    id: 'sast-dast-zap-sonar',
    title: 'SAST, DAST, SonarQube and OWASP ZAP in the pipeline',
    priority: 22,
    tier: 'likely',
    freq: '3/7 papers (2024-25 Q2, 2025-26 s1 Q2, autumn Q2)',
    marks: '5-20 marks',
    summary: '**SAST analyses source code without running it (early, needs code); DAST attacks the running app from outside (later, no code needed). They find different things, so use both in CI/CD. Tune SonarQube with incremental analysis; fix ZAP failures by ensuring the target is up and reports are saved.**',
    mnemonic: 'SAST = Source, Static, Soon (early). DAST = Dynamic, Deployed, Down-the-line',
    source: ['CT417_Notes_06c_Static_Code_Analysis', 'CT417_Notes_06d_DAST', 'CT417_Notes_06e_OWASP_ZAP', 'CT417_Exam_2024-2025_1_1_5', 'CT417_Exam_2025-2026_1_1_5', 'CT417_Exam_2025-2026_1_2_3'],
    sections: [
      {
        heading: 'SAST vs DAST (5-mark comparison)',
        items: [
          { type: 'table', head: ['', 'SAST (Static Application Security Testing)', 'DAST (Dynamic Application Security Testing)'], rows: [
            ['When', 'Early: while coding, on commit/PR, before running (shift left)', 'Later: needs a running app, in test/staging, after deployment'],
            ['Source code needed?', 'Yes (white-box: source, bytecode, config)', 'No (black-box: only HTTP/HTTPS surface)'],
            ['Finds', 'Insecure code patterns, injection flows (source to sink), hard-coded secrets, dangerous APIs, also bugs/code smells', 'Runtime issues: missing security headers, cookie flags, exposed endpoints (h2-console), auth/session problems, error handling, some injection/XSS, config issues'],
            ['Misses', 'Runtime configuration, whether it is reachable/exploitable', 'Unreachable code, paths the scanner never discovers, logic flaws, dependency issues not exercised'],
            ['Speed/cost', 'Fast, cheap to fix (early)', 'Slower, needs environment'],
            ['Tools', 'SonarQube, Semgrep, CodeQL', 'OWASP ZAP, Burp Suite']
          ] },
          '**SCA** (third): dependencies and known CVEs. The three see different surfaces and complement each other: none gives a complete picture. SAST = what the source suggests might be wrong; SCA = known weaknesses in components; DAST = what an external client can observe.',
          'Why integrate in CI/CD (2 marks): finds vulnerabilities early and automatically on every change, cheaper to fix, consistent (no manual-only checks), keeps release speed, provides continuous security evidence and compliance (shift-left).'
        ]
      },
      {
        heading: 'How static analysis works',
        items: [
          'Source/program representation, parse structure, apply rules and analysis, track data flow and control flow, report findings, human investigation.',
          'Techniques: syntax/structural rules, semantic analysis (names, types), data-flow analysis (source to sensitive sink), control-flow analysis.',
          'False positives: tool misunderstood code, unreachable pattern, unused capability, another control mitigates, valid but low context risk.'
        ]
      },
      {
        heading: 'OWASP ZAP (Zed Attack Proxy)',
        items: [
          'DAST tool placed between a client/browser and the running app: intercepting proxy plus automated spider and scanner. Parts: **History** (requests/responses), **Sites tree** (discovered paths), **Passive scan** (inspects traffic, no attack payloads: headers, cookies, disclosure), **Active scan** (sends attack-like requests: intrusive, may change state, only against systems you are authorised to test).',
          'Alerts have a **risk** (potential impact) and **confidence**; triage: alert, request/response, affected URL, rule explanation, context, reproduce, judgement. "No discovery means no meaningful test": POST endpoints may not be found by spidering.',
          'Passive vs active: passive does not generate attacks and is low impact; active probes aggressively.'
        ]
      },
      {
        heading: 'Why ZAP fails in a pipeline: causes and fixes (2 x 2 marks / 5 marks)',
        items: [
          { type: 'table', head: ['Likely technical cause', 'Practical fix'], rows: [
            ['Target app not running/ready when the scan starts, or wrong URL / network (localhost inside the ZAP container is ZAP itself)', 'Start the staging app first, wait for the health endpoint, put ZAP and the app on the same Docker network and use the service name'],
            ['Scan finds nothing: spider cannot reach POST/REST endpoints or authenticated areas', 'Seed ZAP with the OpenAPI spec or known URLs, configure authentication/context, use API scan mode'],
            ['Pipeline step fails on warnings (non-zero exit of baseline scan) or times out on a long active scan', 'Set alert thresholds/ignore rules, limit scan scope and duration, run baseline passive scan on PRs and full active scan nightly'],
            ['No report produced: output not written/mounted or artefact not uploaded', 'Use report options (`-r`/`-J`), mount a writable volume, upload as a workflow artefact (`actions/upload-artifact`) even on failure (`if: always()`)'],
            ['Resource limits/memory on the runner, or permissions on the report directory', 'Larger runner, increase memory, fix directory permissions']
          ] }
        ]
      },
      {
        heading: 'SonarQube slowing the pipeline: two improvements with trade-offs',
        items: [
          { type: 'table', head: ['Improvement', 'Why it works', 'Trade-off'], rows: [
            ['Incremental / pull-request analysis of changed files only; analyse new code (quality gate on new code)', 'Scans a small diff instead of the whole code base, so feedback is fast', 'Legacy code issues are not re-examined each PR; need periodic full scans'],
            ['Run the full scan asynchronously/nightly or on merge to main, in parallel to build/tests', 'Takes the slow scan off the PR critical path', 'Findings arrive later, so a vulnerable change could merge before the result'],
            ['Exclude generated, test, vendor and third-party code; cache the scanner cache and dependencies', 'Less code to analyse; no repeated downloads', 'Risk of excluding something that matters; cache management'],
            ['Dedicated/larger runner or analyse modules in parallel', 'More compute reduces time', 'Costs more infrastructure']
          ] },
          'Do not reduce quality: keep the same rules and quality gate; change WHEN and WHAT is analysed, not how strictly.'
        ]
      }
    ],
    pitfalls: [
      'Saying DAST needs source code or SAST needs a running app.',
      'Treating a scanner alert as proof of a vulnerability.',
      'Suggesting disabling rules to speed up SonarQube (reduces quality).',
      'Running ZAP active scan on systems you do not own.'
    ]
  },

  {
    id: 'security-fundamentals',
    title: 'Security fundamentals: vulnerability, zero-day, buffer overflow, injection',
    priority: 26,
    tier: 'low',
    hint: 'unlikely',
    freq: '5/7 papers historically (definitions, zero-day, buffer overflow); hinted unlikely ("other security, definitions")',
    marks: '2-10 marks',
    summary: '**Vulnerability = a weakness that could be exploited; countermeasure reduces threat/vulnerability/attack; zero-day = flaw unknown to the vendor with no patch; buffer overflow = writing past a buffer to corrupt memory, countered by bounds-checking, stack canaries, ASLR, DEP.**',
    mnemonic: 'Zero-day lifecycle: Introduced, Discovered, Exploited, Disclosed, Patched (IDEDP)',
    source: ['CT417_Notes_06a_Software_Security', 'CT417_Notes_06b_Security_Vulnerabilities', 'CT417_Exam_2024-2025_1_1_5', 'CT417_Exam_2025-2026_1_2_3'],
    sections: [
      {
        heading: 'Definitions (RFC 2828 Internet Security Glossary)',
        items: [
          '**Software security**: implementing mechanisms and development practices so software resists attacks and keeps functioning when attacked; it is a concern, not a feature.',
          '**Vulnerability** (RFC 2828): a flaw or weakness in a system\'s design, implementation, or operation and management that could be exploited to violate the system\'s security policy. Most systems have some; success of an attack depends on the degree of vulnerability, the strength of the attack and the effectiveness of countermeasures. In software they mainly arise from defects.',
          '**Threat**: a potential negative action or event facilitated by a vulnerability that results in an unwanted impact; intentional (cyberattack) or accidental (earthquake).',
          '**Countermeasure**: an action, device, procedure or technique that reduces a threat, a vulnerability or an attack, by eliminating or preventing it, minimising the harm it can cause, or discovering and reporting it so corrective action can be taken (e.g. patching, input validation, firewall, code review).',
          '**Exploit**: software, data or commands that take advantage of a vulnerability to cause unintended behaviour (control, privilege escalation, DoS). Remote exploit works over a network without prior access; local exploit needs prior access and usually escalates privileges.',
          '**CIA**: Confidentiality, Integrity, Availability. **STRIDE** threats: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.',
          'Code-level threats: unintentional (lack of secure-coding knowledge, e.g. buffer overflow); intentional (malicious insider logic bomb). Mitigations: security training, static and dynamic analysis, peer code review, job rotation, mandatory vacation.'
        ]
      },
      {
        heading: 'Zero-day vulnerability and its life cycle',
        items: [
          '**Zero-day vulnerability**: a flaw unknown to the vendor/developer (or without an available patch), so there are "zero days" to fix it before it can be exploited. A **zero-day exploit/attack** uses it. Examples: Stuxnet (industrial control systems), WannaCry 2017 (Windows exploit).',
          { type: 'diagram', kind: 'flow', data: { steps: ['1 Introduction: flaw created in code', '2 Discovery: attacker/researcher finds it, vendor unaware', '3 Exploitation: exploit developed and used (zero-day window)', '4 Disclosure: vendor learns / public advisory, CVE', '5 Patch: fix released and deployed; window closes'], direction: 'row' }, caption: 'Five-stage zero-day life cycle (orderings vary slightly; state yours).' },
          'Risk persists until users apply the patch; mitigations before a patch: virtual patching/WAF rules, network segmentation, least privilege, monitoring and rapid incident response.'
        ]
      },
      {
        heading: 'Buffer overflow',
        items: [
          '**Definition**: an attacker (or bug) puts more data into a fixed-size buffer than it can hold, so the excess spills into adjacent memory, overwriting program data or code such as the saved return address. Unsafe C functions (`strcpy`, `gets`, `sprintf`) do no bounds checks.',
          { type: 'code', text: '#include <stdio.h>\n#include <string.h>\nvoid copyCustomerName(char *input) {\n    char name[8];\n    strcpy(name, input);      // no length check: input longer than 7 chars overflows\n    printf("%s\\n", name);\n}' },
          '**Exploit**: attacker supplies a long input that overwrites the saved return address on the stack with the address of injected shellcode (or existing code), so on return the attacker\'s code runs with the program\'s privileges (code execution, privilege escalation, crash/DoS).',
          '**Countermeasures (give two)**: (1) safe coding: bounds-checked functions and explicit length validation (`strncpy` with terminator, `snprintf`, `fgets`), or memory-safe languages (Java, Rust); (2) platform defences: stack canaries (compiler `-fstack-protector`), ASLR (randomise memory layout), DEP/NX (non-executable stack/heap); also code review, static analysis, fuzzing, least privilege.',
          { type: 'code', text: 'void copyCustomerName(const char *input) {\n    char name[8];\n    strncpy(name, input, sizeof(name) - 1);\n    name[sizeof(name) - 1] = \'\\0\';\n    printf("%s\\n", name);\n}' }
        ]
      },
      {
        heading: 'Common web vulnerability families (week 6)',
        items: [
          '**SQL injection**: untrusted input changes the structure of a query (data becomes instructions). Bad: `"SELECT * FROM users WHERE username = \'" + username + "\'"`. Fix: parameterised queries `prepareStatement("... WHERE username = ?")` with `setString`; validation helps but does not replace parameterisation.',
          '**XSS (cross-site scripting)**: attacker data is returned to the browser where it is executed as script. Controls: context-appropriate output encoding, safe templating, Content Security Policy.',
          '**CSRF**: a browser is induced to send an unwanted state-changing request with the user\'s credentials. Controls: CSRF tokens, SameSite cookies, origin validation.',
          '**Insecure deserialisation**: untrusted serialised data rebuilt into objects triggers unintended behaviour; restrict types.',
          '**Improper input validation**: assumptions about type, length, range, format, allowed values not enforced; validate at trust boundaries, allowlists.',
          'Security misconfiguration, insecure dependencies and human error are the key vulnerabilities behind most issues.'
        ]
      }
    ],
    pitfalls: [
      'Defining zero-day as "a new virus": it is an unpatched vulnerability unknown to the vendor.',
      'Describing buffer overflow without saying what is overwritten and what the attacker gains.',
      'Giving only one countermeasure when two are requested.',
      'Fixing SQL injection only with input validation instead of parameterised queries.'
    ]
  },

  {
    id: 'devsecops',
    title: 'DevSecOps: shifting security left',
    priority: 27,
    tier: 'low',
    hint: 'unlikely',
    freq: 'hinted "n?"; est. low',
    marks: '3-6 marks',
    summary: '**DevSecOps integrates security throughout the DevOps lifecycle and moves it earlier (shift left) so vulnerabilities are found when cheap to fix, using automated security testing in CI/CD.**',
    mnemonic: 'Shift left: Security as Code, Automate tests, Continuous monitoring, IaC, Training',
    source: ['CT417_Notes_06a_Software_Security'],
    sections: [
      {
        heading: 'Why and what',
        items: [
          'Traditional cycles put security at the end, so costly vulnerabilities reached production. Faster development, microservices, containers and cloud increase attack surface; 2023 saw more supply-chain attacks, phishing and ransomware.',
          '**DevSecOps**: integrate security throughout the entire DevOps lifecycle. **Shift left**: do security earlier to catch vulnerabilities before deployment: cheaper and easier to fix, fewer attack vectors, real-time visibility.',
          'Benefits: reduced time to fix bugs; continuous security (automated tests and monitoring); better compliance (GDPR, PCI-DSS) via continuous checks; improved collaboration (security is shared responsibility).',
          'Best practices: **security as code** (policies/tests in version control), **automated testing** in CI/CD (static, dynamic, dependency checks), **continuous monitoring**, **infrastructure as code** (secure repeatable configuration), training and awareness.'
        ]
      }
    ],
    pitfalls: ['Treating security as a final gate; the point is early and continuous.']
  }
];
