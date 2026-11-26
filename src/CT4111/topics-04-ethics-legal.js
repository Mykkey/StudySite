module.exports = [
{
  id: "bitter-lesson", title: "Sutton's bitter lesson", priority: 13, tier: "likely",
  freq: "sample paper Q6(b) + Topic 11 (3 article decks)", marks: "8 marks",
  summary: "**Sutton (2019): across 70 years of AI, general methods that leverage computation (search and learning) beat approaches that build in human knowledge; it is 'bitter' because it defeats the favoured human-centric approach; in SE with GenAI it predicts that hand-built scaffolding (prompt chains, retrieval, agent org charts) will be swept away by better models, while specifying and verifying remain.**",
  mnemonic: "Compute beats cleverness: Search + Learning scale",
  source: ["CT4111_Notes_11c_Article_Bitter_Lesson", "CT4111_Notes_11_Emerging_Topics", "CT4111_Notes_11d_Article_Dot_and_Swarm"],
  sections: [
    { heading: "What the bitter lesson is (3-4 marks)", items: [
      "**Claim:** 'general methods that leverage computation are ultimately the most effective, and by a large margin.' Cause: the exponentially falling cost of computation (generalised Moore's law).",
      "Researchers work as if computation were fixed, so they build in human knowledge, which helps short term and feels satisfying; within a few years far more computation arrives and the knowledge-based approach plateaus or even inhibits progress; breakthrough comes from **scaling computation: search and learning**.",
      { type: "table", head: ["Domain", "Human-knowledge approach", "What succeeded"], rows: [
        ["Chess (1997)", "Human understanding of chess structure", "Massive deep search (beat Kasparov)"],
        ["Go (about 20 years later)", "Human knowledge used to avoid search", "Search at scale plus learning by self-play"],
        ["Speech (1970s on)", "Words, phonemes, vocal tract knowledge", "Statistical models (HMMs), then deep learning"],
        ["Computer vision", "Edges, generalised cylinders, SIFT", "Deep convolutional networks"]
      ] },
      "**Why 'bitter':** success is over a favoured human-centric approach, so it is often incompletely digested; researchers said brute force 'is not how people play chess'.",
      "**Conclusion:** use general methods that keep scaling (search, learning); do not build in how we think we think; build only meta-methods that find structure. 'We want AI agents that can discover like we can, not which contain what we have discovered.'",
      "Author: Rich Sutton, founder of modern reinforcement learning (TD learning, policy gradients), co-author of the RL textbook, Turing Award 2024 with Barto."
    ] },
    { heading: "Critiques", items: [
      "**Rodney Brooks ('A Better Lesson'):** human ingenuity moved rather than vanished (CNNs encode translational invariance; people design architectures); training cost excludes most researchers; Moore's law is slowing. **Dietterich:** top systems combine knowledge engineering with brute force; challenge is encoding knowledge that rules out wrong solutions but not right ones.",
      "**Sutton (2025) himself doubts LLMs follow his lesson:** they learn from human data, not experience, another human-knowledge approach that will be overtaken. **Karpathy:** LLMs are 'ghosts, not animals' (human data finite and biased) but in practice they do scale with computation."
    ] },
    { heading: "Does it apply to SE with GenAI tools? Give two reasons (opinion answer)", items: [
      "**Stance: largely yes, with limits.**",
      "**Reason 1: hand-built scaffolding is being replaced by more capable general models.** Retrieval pipelines, prompt templates and chains, planning prompts and multi-agent organisation charts built for earlier models become unnecessary: models now search code themselves (grep tool instead of elaborate RAG), plan their own steps and spin up sub-agents (Mollick: 'the bitter lesson applied to the org chart'). Elaborate harnesses and prompt debt may be thrown away at each model upgrade.",
      "**Reason 2: coding is verifiable, so compute can be poured into search and self-play.** Tests and compilers give a reward signal, so reinforcement learning and parallel search at scale (10,000-agent swarm) improve ability faster than human-written heuristics, as in chess and Go.",
      "**Caveat (why it is not the whole story):** humans still decide what to build (specification), verify (tests, review) and are accountable; guardrails, version control, tests and legal compliance are durable engineering, not scaffolding; scalable review and cost still need design (Brooks: human ingenuity moves). An engineer shipping this year should invest in durable parts (tests, specs, ADRs, verification) and keep fragile prompt tricks cheap and disposable.",
      "**Alternative stance (if you argue 'no'):** (1) much SE work is not verifiable (requirements, design taste, ethics), so scaling compute does not solve it; (2) regulation, accountability and shared understanding require humans and structured processes (Anthropic still scales human approval by risk)."
    ] },
    { heading: "Discussion points from the lecture", items: [
      "Law or pattern from four examples? What would count as a counter-example? Where is human ingenuity in today's coding agents? Which practices from the course will a better model make redundant, and which are durable? How should an engineer who must ship this year act on a long-run claim?"
    ] }
  ],
  pitfalls: [
    "Defining it as 'bigger models are better' without 'general methods vs built-in human knowledge' and 'search and learning'.",
    "Giving an opinion with no reasons or more or fewer than the number asked (two).",
    "Not naming at least two of Sutton's four examples (chess, Go, speech, vision)."
  ]
},
{
  id: "legal-risks", title: "Legal risks: IP and licensing, GDPR, liability, EU AI Act", priority: 14, tier: "core",
  freq: "sample paper Q6(c) + Topic 10 + lab", marks: "8 marks (2 x 4)",
  summary: "**For a startup using GenAI to build loan-approval software, key legal risks are copyright/licence contamination of generated code, GDPR (personal data in prompts and in the system, automated decisions), EU AI Act high-risk obligations for credit scoring, and liability for harmful outputs; each needs a concrete mitigation.**",
  mnemonic: "IP, GDPR, AI Act, Liability: each risk gets a mitigation",
  source: ["CT4111_Notes_10_Ethical_Legal", "CT4111_Notes_10b_Lab"],
  sections: [
    { heading: "How to answer 'two legal risks, each with a mitigation' (8 marks)", items: [
      "Format for each: **Risk name**, **how it arises in this startup** (one specific sentence), **consequence**, **mitigation** (2-3 concrete actions). Two well-developed risks beat four thin ones.",
      "**Risk 1: copyright and licensing (IP).** The LLM may regurgitate memorised code identical to licensed code (GPL, AGPL), omit attribution, and pull copyleft into the proprietary loan engine ('GPL contamination'), forcing disclosure of source or infringement claims. Ownership of AI-generated code is legally ambiguous (a model is not a legal person; no copyright in content you did not author); providers like OpenAI say you are responsible. **Mitigation:** licence and similarity scanning (software composition analysis, code-match filters), code review of non-trivial generated functions, SBOM including AI-generated components, policy to use enterprise tools with IP indemnity, replace or rewrite flagged code (rewriting cosmetically does not remove the problem; use clean-room or licensed alternatives), record AI use in commits.",
      "**Risk 2: data protection (GDPR).** Developers paste customer data or proprietary code into external LLMs (prompt leakage, Samsung case), and generated code may collect or log more personal data than needed (data minimisation breach) or make fully automated credit decisions (high-risk processing, needs DPIA). Applicants' financial data is highly sensitive and regulated by the Irish Data Protection Commission. **Mitigation:** DPIA before launch; private or zero-retention LLM, PII-filtering proxy, no real customer data in prompts; data minimisation and retention review of generated code; documented lawful basis, rights to explanation and human review; Data Protection Officer sign-off.",
      "**Risk 3: EU AI Act (high risk).** Credit scoring is a high-risk use: needs risk management, quality data, technical documentation, logging, transparency, human oversight, accuracy and cybersecurity (Articles 8-17); fines for non-compliance. **Mitigation:** classify the system early, keep technical documentation and decision logs linking input, version and rule, bias testing, human override and suspension procedure, conformity assessment.",
      "**Risk 4: liability and accountability.** Harm from wrong, biased or insecure decisions (discriminatory loan refusals, hallucinated dependency attack) is the company's liability; 'the AI did it' is no defence (Moffatt v Air Canada, Mata v Avianca). **Mitigation:** human-in-the-loop review, tests, security scanning and dependency verification, clear internal accountability, contracts and insurance, audit trail."
    ] },
    { heading: "Intellectual property and licences", items: [
      "**IP:** legal rights protecting creations of the mind (patents, copyright, trademarks, trade secrets); copyright is automatic, patents need registration.",
      { type: "table", head: ["Licence", "Type", "Key point"], rows: [
        ["MIT", "Permissive", "Use, modify, sell, even closed-source, if copyright notice kept"],
        ["Apache 2.0", "Permissive", "As MIT plus explicit patent grant; terminates if you sue for patent infringement"],
        ["GPL", "Strong copyleft", "Derivative works must also be released under GPL; effectively blocks closed-source reuse (AGPL extends to network use)"]
      ] },
      "Problems: (1) the model may have been trained on copyrighted material without permission (provider legal issue, your ethical issue); (2) it may memorise and regurgitate code identical to protected software, without attribution (your legal problem).",
      "Real case: Oct 2022 class action against GitHub Copilot over training on public repositories under 11 open-source licences (attribution requirements); not closed as of 2026."
    ] },
    { heading: "GDPR (EU General Data Protection Regulation)", items: [
      "Passed 2016, effective 2018; applies whenever personal data of people in the EU are processed. **Personal data** is broader than PII: anything that can identify a person directly or indirectly (names, emails, IP addresses, cookie IDs, location, purchase history, profiles).",
      "**Special category (high risk):** health, biometric and genetic, sexual orientation, political, religious or philosophical beliefs, race or ethnic origin, trade union membership. Extra protection also for systematic monitoring, **automated decisions with legal or similar effects**, children's data, harm if leaked. **DPIA** (Data Protection Impact Assessment) is required for likely high risk; usually done by the data protection officer.",
      { type: "table", head: ["Principle", "Meaning"], rows: [
        ["Lawfulness, fairness, transparency", "Lawful, fair, transparent to the data subject"],
        ["Purpose limitation", "Use data only for the stated legitimate purposes"],
        ["Data minimisation", "Collect only what is necessary"],
        ["Accuracy", "Keep data accurate and up to date"],
        ["Storage limitation", "Keep identifying data only as long as necessary"],
        ["Integrity and confidentiality", "Appropriate security (e.g. encryption)"],
        ["Accountability", "Controller must demonstrate compliance"]
      ] },
      "GenAI link: AI-generated code you do not understand may collect and process unneeded personal data, violating data minimisation; a US-biased model may add tracking cookies without the EU consent pop-up."
    ] },
    { heading: "EU AI Act (passed April 2024, fully effective August 2026)", items: [
      "Risk-based regulation of AI systems. **AI system definition** (see definitions topic): a machine-based system operating with varying autonomy, possibly adaptive, inferring from input how to generate outputs that influence environments. Needs no ML: procedural or rule-based code can qualify; using GenAI to write software does not by itself make it an AI system.",
      { type: "table", head: ["Tier", "Examples", "Duty"], rows: [
        ["Unacceptable (prohibited)", "Emotion recognition in education", "Banned"],
        ["High risk", "Hiring/CV filtering, credit scoring, medical devices, critical infrastructure, admissions or grading", "Full compliance (Articles 8-17): technical docs, logging, bias testing, human oversight"],
        ["Transparency / limited risk", "Chatbots, deepfakes, AI-generated content", "Disclose that it is AI (Article 50); label generated content"],
        ["Minimal risk", "Spam filters, video game AI", "No special duties beyond general law (GDPR)"]
      ] },
      "AI literacy: organisations using AI must support staff AI literacy. **General-purpose models:** providers must keep technical documentation (including energy use), supply downstream documentation, have a copyright policy respecting text-and-data-mining opt-outs, publish a training-content summary; systemic-risk models (about 10^25 FLOPs) add adversarial testing, incident reporting, cybersecurity. If you build a high-risk system on top, the high-risk duties fall on you."
    ] }
  ],
  pitfalls: [
    "Naming risks without a mitigation (each of the two needs one) or with a generic mitigation ('be careful').",
    "Not tying the risk to the loan-approval context (credit scoring is EU AI Act high-risk; financial personal data).",
    "Saying the AI vendor is liable: legally ambiguous and the vendor usually disclaims it.",
    "Confusing legal with ethical: not everything ethical is legal and vice versa."
  ]
},
{
  id: "bias-fairness", title: "Bias, stereotypes and fairness", priority: 18, tier: "likely",
  freq: "sample paper bonus Q(c) + Topic 10", marks: "8 marks",
  summary: "**GenAI reflects and amplifies biases in its training data (stereotypes, representation, historical bias, proxies), including in generated code; hosting an open-weights model locally gives control and privacy but does not remove bias, because the weights embody the same training-data biases.**",
  mnemonic: "Data in, bias out; local hosting moves control, not the bias",
  source: ["CT4111_Notes_10_Ethical_Legal", "CT4111_Notes_10b_Lab"],
  sections: [
    { heading: "What 'biases and stereotypes' means", items: [
      "LLMs are not engineered for truth: they generate plausible sequences from diverse web data (forums, social media), so they reflect gender, cultural and social biases. **Stereotype:** the model associates a group with fixed attributes or roles.",
      "Companies mask the problem with prompt rewriting, system prompts and preference tuning, so stereotype-driven biases have 'moved, not disappeared'."
    ] },
    { heading: "Examples to quote", items: [
      "Sora video (WIRED 2025): in 25 prompts repeated 10 times, CEO and professor were always men; flight attendants, childcare workers, receptionists always women.",
      "'Newer is not fairer': across four Stable Diffusion generations 76% of images were male; 'scientist' came out 1-18% female vs 48% of US scientists.",
      "Your own example (exam wants one you observed): e.g. prompt 'a nurse and a surgeon' returns a female nurse and a male surgeon; 'write code for a registration form' gives mandatory first name plus family name fields (breaks for mononymous cultures). **How it arose:** training data over-represents (historic) stereotypical depictions; model optimises likelihood so it picks the most common association; preference tuning and western-centric code reinforce it.",
      "Decisions about people: UK police facial recognition false positives about 0.04% for white vs 5.5% Black and near 10% Black women at 0.8 threshold; Rotterdam welfare algorithm selected women 1.25x more and non-Dutch speakers about 2x."
    ] },
    { heading: "Sources and types of bias", items: [
      "**Representation bias:** groups under-represented in data. **Historical/societal bias:** data reflects past inequality (hiring AI favours men). **Proxy variables:** neutral feature correlates with protected attribute (zip code as proxy for race). **Aggregation bias:** one model for groups that differ.",
      "**Cultural blind spots in code:** first/last name fields, colour symbolism, English-only and left-to-right assumptions, assumed high-end infrastructure (Ryanair app-only boarding passes exclude people without smartphones).",
      "**Team bias:** lack of lived experience, affinity bias, authority bias (juniors do not flag a senior's tool), bandwagon effect (adopting a popular model unaudited).",
      "**Non-ML software too:** code generated by a biased LLM can embed bias even if the logic is procedural (e.g. requiring a non-empty family name)."
    ] },
    { heading: "Can hosting an open-weights model locally mitigate bias? (reasoned answer)", items: [
      "**Mostly no, bias comes from the data and weights.** An open-weights model such as Llama or Mistral was trained on similar web data, so it carries similar stereotypes; running it locally does not change the weights.",
      "**What local hosting does give:** transparency and inspection, ability to **fine-tune** on balanced or domain data, set your own system prompt, add your own filters and evaluations, full control of data and version stability, no unannounced provider changes.",
      "**Possible downside:** cloud providers add guardrails, prompt rewriting and safety tuning that a raw local model may lack, so a local model can be more biased out of the box; and you now bear responsibility and the infrastructure cost.",
      "**Conclusion:** local hosting is a tool for control and privacy, not a bias cure; mitigation needs bias testing and evaluation sets, diverse teams and prompts, fine-tuning and constraints, human review, and monitoring of outcomes."
    ] },
    { heading: "Mitigations in practice", items: [
      "Review outputs carefully; test for disparate outcomes (approval-rate gaps, false positive rates by group); avoid proxy variables; diverse and inclusive requirements; document assumptions; document AI usage; evaluate domain-specific fairness (see FinTech case)."
    ] }
  ],
  pitfalls: [
    "Giving no specific example, or an example without explaining how it arose (data).",
    "Answering the local-hosting question 'yes it removes bias' or 'no' without reasoning on weights and training data.",
    "Equating bias only with images: it also appears in generated code and in decisions about people."
  ]
},
{
  id: "privacy-security-risks", title: "Privacy leakage and code-security risks", priority: 25, tier: "possible",
  freq: "Topic 10 (security and privacy sections)", marks: "5-8 marks",
  summary: "**Prompts can leak PII and proprietary code to providers (Samsung case); mitigate with private LLMs, zero-retention APIs and PII-filtering proxies; GenAI code brings supply-chain, injection and unpatched-vulnerability risks that need scanning and review.**",
  mnemonic: "Leak-proof the prompt; verify every package",
  source: ["CT4111_Notes_10_Ethical_Legal", "CT4111_Notes_02_Topic_2"],
  sections: [
    { heading: "Privacy and data leakage", items: [
      "**PII:** data that directly or indirectly identifies, contacts or locates a person (names, emails, SSNs, bank details, biometrics). Also protect proprietary code, API keys, passwords, medical and legal records, IP.",
      "Leakage: prompts containing code or user data may be logged and retained for training unless enterprise controls apply. **Samsung case:** employees pasted faulty source code, defect-detection code, and a meeting recording transcript into ChatGPT in three incidents. Keys leaked in public repos can be learnt by models.",
      "Generated code can itself violate privacy (e.g. US-legal tracking cookies without EU consent).",
      { type: "table", head: ["Mitigation", "Pros", "Cons"], rows: [
        ["Private LLM instance (open weights on own cloud or on-premise)", "Absolute data control, fine-tuning, predictable performance", "High GPU cost, operational complexity, performance gap to frontier models"],
        ["Zero-retention API licence", "Frontier models, no infrastructure, SOC 2/HIPAA/GDPR DPAs", "Data leaves your network (trust and audit risk), vendor lock-in and downtime, no deep customisation"],
        ["Automatic PII filtering proxy (e.g. Presidio, regex)", "Proactive, cheap, works with public APIs", "Context stripping reduces answer quality, false negatives, extra latency"]
      ] },
      "**Best practice:** hybrid: zero-retention API for complex tasks routed via an internal PII-filter proxy; legal experts define a policy of which tools for which purposes (or ban); no approach is bullet-proof.",
      "**Shadow AI:** employees using unauthorised AI tools, often because policies are too strict; need a pre-approved safe workflow."
    ] },
    { heading: "Code security risks", items: [
      "**Hallucinated dependency:** AI suggests a package that does not exist (or that an attacker pre-registered, 'slopsquatting'); installing it executes malicious code: a supply-chain attack.",
      "**Data poisoning:** attackers publish thousands of repos with a backdoor so LLM training learns it. **Insecure code generation:** hard-coded credentials, **SQL injection** (data string becomes a command via a single quote, double dash, OR 1=1; fix with parameterised queries). **Reintroducing unpatched vulnerabilities:** e.g. Log4Shell (discovered Nov 2021, patched Dec 2021) may reappear because the training set contains vulnerable code. **Automated technical debt:** black-box code nobody understands.",
      "**Mitigation:** post-generation source-code analysis (Snyk, SonarQube; none is 100% reliable), verify dependencies' provenance, code review, tests, least-privilege credentials, SBOM.",
      "Misaligned agent behaviour: modifying tests so they pass; false rationalisations of design."
    ] }
  ],
  pitfalls: ["Only naming the risks: include one mitigation each."]
},
{
  id: "professional-environment", title: "Professional responsibility, ethics and environmental impact", priority: 30, tier: "possible",
  freq: "Topic 10 (second half)", marks: "4-8 marks",
  summary: "**Legal compliance is not the same as ethics; engineers stay accountable for AI output (IEEE code principle 1: public interest), should declare AI use, avoid AI slop and respect academic integrity; AI has environmental costs (energy, water) mostly in inference, so use the smallest model that does the job.**",
  mnemonic: "Accountable, Declared, Verified; smallest model that works",
  source: ["CT4111_Notes_10_Ethical_Legal"],
  sections: [
    { heading: "Ethics vs law and professional responsibility", items: [
      "'Not everything that is ethical is legal; not everything that is legal is ethical.'",
      "**IEEE-CS/ACM Software Engineering Code of Ethics:** 8 principles; principle 1: act consistently with the **public interest**.",
      "**Whistleblowing:** report when AI-driven shortcuts compromise safety or public trust; takes courage, protection varies by country.",
      "**Documentation:** declare AI use in commit messages and READMEs; keep a **Software Bill of Materials (SBOM)** listing components (open source, proprietary, AI-generated) for traceability.",
      "**Accountability:** the person or organisation is accountable, not the tool: Mata v Avianca (lawyers sanctioned for fake citations, 2023), Moffatt v Air Canada (airline liable for chatbot advice, 2024), Deloitte Australia (partial refund for fabricated references, 2025).",
      "**AI slop:** unreviewed AI content pushes cognitive load onto the reader; need critical thinking; do not automate your core intellectual value.",
      "**Academic integrity:** AI is not automatically allowed; permission is per module and assessment; never present AI material as your own; you remain responsible for accuracy; if in doubt ask first.",
      "**When not to use AI:** it defeats the learning purpose; you cannot verify the output; not authorised by policy; data should not leave your control (PII, IP); if you feel you should hide your use, it is probably a bad use case."
    ] },
    { heading: "Environmental considerations", items: [
      "Data centres used about 415 TWh in 2024 (1.5% of global electricity, IEA); AI-focused hyperscale sites 100 MW or more (about 100,000 households); in Ireland data centres use about 20% of metered electricity.",
      "Training GPT-4: about 25,000 GPUs, about 14 weeks, about 42.4 GWh (0.43 GWh per day). But once deployed, **inference across all users far outweighs training**.",
      "Per-query estimates vary about 2000-fold (519 ml water per 100-word email vs 0.26 ml and 0.24 Wh per median Gemini text prompt) depending on what is counted (training or inference, direct or indirect water). Efficiency per prompt falls (33x in 12 months at Google) but total AI data-centre electricity grew (about 50% in 2025).",
      "Practice: use the smallest model that does the job; images and video cost more than text; reasoning models add tokens; fewer, better prompts; bound output length; use search engines for simple questions; avoid unnecessary default transcription."
    ] }
  ],
  pitfalls: ["Quoting a single environmental number as if it were settled: say estimates vary and depend on scope."]
},
{
  id: "fintech-flow-case", title: "Lab case: FinTech-Flow loan-approval microservice", priority: 31, tier: "possible",
  freq: "Topic 10 lab assignment (scenario for Q6(c) style questions)", marks: "8-12 marks",
  summary: "**Four failures from one AI-generated loan service: hallucinated dependency (supply chain), AGPL copy (IP), postcode proxy bias, and EU AI Act logging and oversight failures; each links to a topic and a concrete remedy.**",
  mnemonic: "Package, Licence, Postcode, Logs",
  source: ["CT4111_Notes_10b_Lab"],
  sections: [
    { heading: "Scenario", items: [
      "FinTech-Flow, a European startup, uses an agentic coding assistant to build a loan-approval microservice (rule-based expert system for risk scoring, assumed an AI system under the AI Act; live in 2028 when Annex III high-risk rules apply). Lead developer Sarah prompts a FastAPI + PostgreSQL service with audit logging, reviews briefly and merges."
    ] },
    { heading: "The four problems and model answers", items: [
      "**#1 Security: hallucinated dependency** (fastapi-security-audit-pro pre-registered on PyPI by an attacker; malicious install script stole deployment credentials). Response: contain (rotate credentials, isolate pipeline), investigate affected systems and customer data (GDPR breach notification duty), then prevent: verify provenance of every dependency, lock files and hashes, internal package mirror or allow-list, SCA tools, least-privilege build credentials, human review of dependency changes.",
      "**#2 IP: AGPL copy-paste trap** (verbatim function from AGPL-3.0 software, notices omitted; company wants proprietary source). AGPL is strong copyleft including network use, so offering the service could require releasing source. Options: (a) comply (release under AGPL: conflicts with business model), (b) obtain alternative commercial permission from the owner, (c) remove and replace by an independent implementation (clean-room from the specification, reviewed). Cosmetic rewriting does not resolve it if the result is still a derivative. Prevention: licence scanning, code-match filters, SBOM, policy.",
      "**#3 Bias: zip code proxy** (US-centric rule; districts with large immigrant communities get negative adjustments; 15 percentage-point approval gap at similar incomes). The gap shows a disparity (possible indirect discrimination) but does not prove causation: other credit factors have not been examined, so it leaves open confounders. Investigate: control for legitimate factors (income, debt, history), test removing the postcode feature and measure impact, check whether postcode is a proxy for protected attributes, assess business justification and necessity, fairness metrics, involve legal and domain experts; fix by dropping or replacing the variable, retraining or recalibrating, ongoing monitoring.",
      "**#4 EU AI Act: transparency and logging** (logs only hold timestamp, application id, outcome; no link to inputs, software version, rules and thresholds; no override or tested suspension procedure). High-risk duties: technical documentation, automatic logging for traceability, transparency, **human oversight** with ability to override, accuracy and robustness, risk management. Remedy: log inputs (or minimised/hashed references), model/rule version, thresholds and reasons per decision; loan-officer inspection and override UI; tested kill-switch and human review path."
    ] },
    { heading: "The four reflection questions (reasoning points)", items: [
      "**Traceability:** existing logs only show that a decision was made; missing: inputs, version, rules, thresholds, reasons, human involvement. Introduce structured decision records, versioned rules, immutable audit trail, human review, with data minimisation (store only necessary fields, retention limits, access control, pseudonymise).",
      "**Professional responsibility:** using an AI agent does not remove Sarah's accountability (she reviewed and merged); she remains responsible for diligence, the company for governance (policies, training, compliance, provider of the high-risk system). Facts needed: her role and authority, company policies, review process, what she knew, contracts, jurisdiction.",
      "**Bias and fairness:** see #3; difference is evidence of disparity, not proof of unlawful discrimination.",
      "**IP strategy:** see #2; compare compliance (open sourcing), permission (licence from owner), replacement (clean implementation)."
    ] }
  ],
  pitfalls: ["Treating the 15-point gap as proof of discrimination, or as meaningless."]
}
];
