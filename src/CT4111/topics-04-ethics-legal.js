module.exports = [
  {
    "id": "bitter-lesson",
    "title": "Sutton's bitter lesson",
    "priority": 13,
    "tier": "likely",
    "freq": "sample paper Q6(b) + Topic 11 (3 article decks)",
    "marks": "8 marks",
    "summary": "**Sutton (2019): across 70 years of AI, general methods that leverage computation (search and learning) beat approaches that build in human knowledge; it is 'bitter' because it defeats the favoured human-centric approach; in SE with GenAI it predicts that hand-built scaffolding (prompt chains, retrieval, agent org charts) will be swept away by better models, while specifying and verifying remain.**",
    "mnemonic": "Compute beats cleverness: Search + Learning scale",
    "source": [
      "CT4111_Notes_11c_Article_Bitter_Lesson",
      "CT4111_Notes_11_Emerging_Topics",
      "CT4111_Notes_11d_Article_Dot_and_Swarm"
    ],
    "sections": [
      {
        "heading": "What the bitter lesson is (3-4 marks)",
        "items": [
          "The **bitter lesson** is an essay by Rich Sutton about how AI research progresses.",
          "**Claim**: \"general methods that leverage computation are ultimately the most effective, and by a large margin.\" The cause is that computing keeps getting exponentially cheaper (**Moore's law**, broadly meant).",
          {
            "type": "p",
            "text": "The pattern"
          },
          "Researchers act as if computing power were fixed, so they build in human knowledge. This helps at first and feels satisfying.",
          "A few years later far more computing arrives, and the knowledge-based approach stalls or even gets in the way.",
          "The breakthrough comes from **scaling computation**: **search** (trying many possibilities) and **learning** (from data)."
        ]
      },
      {
        "heading": "The bitter lesson: examples and conclusion",
        "items": [
          {
            "type": "table",
            "head": [
              "Domain",
              "Human-knowledge approach",
              "What succeeded"
            ],
            "rows": [
              [
                "Chess (1997)",
                "Human understanding of chess structure",
                "Massive deep search (beat Kasparov)"
              ],
              [
                "Go (about 20 years later)",
                "Human knowledge used to avoid search",
                "Search at scale plus learning by self-play"
              ],
              [
                "Speech (1970s on)",
                "Words, phonemes, vocal tract knowledge",
                "Statistical models (HMMs), then deep learning"
              ],
              [
                "Computer vision",
                "Edges, generalised cylinders, SIFT",
                "Deep convolutional networks"
              ]
            ]
          },
          "Words in the table: **self-play** = learning by playing against itself; **phonemes** = speech sounds; **HMMs** = hidden Markov models, a statistical method; **SIFT** and generalised cylinders = hand-designed ways of describing images.",
          "**Why \"bitter\"**: the winner beats a favoured human-like approach, so the lesson is often not accepted. Researchers complained that brute force \"is not how people play chess\".",
          "**Conclusion**: use general methods that keep improving with computing. Do not build in how we think we think. Build only methods that can find structure themselves.",
          "Author: Rich Sutton, a founder of modern **reinforcement learning** (learning from rewards), co-author of its textbook, Turing Award 2024 with Barto."
        ]
      },
      {
        "heading": "Critiques of the bitter lesson",
        "items": [
          "**Rodney Brooks (\"A Better Lesson\")**: human ingenuity moved rather than disappeared. People still design the networks (for example **CNNs**, image networks built to recognise a thing wherever it appears). Training costs shut out most researchers, and Moore's law is slowing.",
          "**Dietterich**: the best systems combine built-in knowledge with brute force. The challenge is knowledge that rules out wrong answers but not right ones.",
          "**Sutton himself (2025)** doubts that LLMs follow his lesson: they learn from human data rather than experience, so they are another human-knowledge approach that will be overtaken.",
          "**Karpathy**: LLMs are \"ghosts, not animals\" (human data is limited and biased), but in practice they do improve with computing."
        ]
      },
      {
        "heading": "Does it apply to SE with GenAI tools? Give two reasons (opinion answer)",
        "items": [
          "**Stance: largely yes, with limits.**",
          {
            "type": "p",
            "text": "Reason 1: hand-built scaffolding is being replaced"
          },
          "\"Scaffolding\" means the extra machinery built around a model: retrieval systems, prompt templates and chains, planning prompts, arrangements of multiple agents.",
          "Newer models search code themselves (a simple text search tool instead of elaborate retrieval), plan their own steps and start helper agents. Mollick calls it \"the bitter lesson applied to the org chart\".",
          "Elaborate set-ups and **prompt debt** may be thrown away at each model upgrade.",
          {
            "type": "p",
            "text": "Reason 2: code can be checked automatically"
          },
          "Tests and compilers say whether an answer works, which gives a **reward signal**. So training and parallel search at huge scale (a 10,000-agent swarm) improve ability faster than human-written rules, as in chess and Go.",
          {
            "type": "p",
            "text": "Caveat"
          },
          "Humans still decide what to build, check it with tests and review, and are accountable.",
          "Guardrails, version control, tests and legal compliance are lasting engineering, not scaffolding. Review at scale and cost still need design.",
          "An engineer delivering this year should invest in the lasting parts (tests, specifications, decision records, verification) and keep fragile prompt tricks cheap and disposable.",
          {
            "type": "p",
            "text": "If you argue \"no\""
          },
          "(1) Much software work cannot be checked automatically (requirements, design taste, ethics).",
          "(2) Regulation, accountability and shared understanding need humans and processes."
        ]
      },
      {
        "heading": "Discussion points from the lecture",
        "items": [
          "Is it a law, or just a pattern seen in four examples? What would count as a counter-example?",
          "Where is human ingenuity in today's coding agents?",
          "Which practices from the course will a better model make unnecessary, and which will last?",
          "How should an engineer who must deliver this year act on a long-run claim?"
        ]
      }
    ],
    "pitfalls": [
      "Defining it as 'bigger models are better' without 'general methods vs built-in human knowledge' and 'search and learning'.",
      "Giving an opinion with no reasons or more or fewer than the number asked (two).",
      "Not naming at least two of Sutton's four examples (chess, Go, speech, vision)."
    ]
  },
  {
    "id": "legal-risks",
    "title": "Legal risks: IP and licensing, GDPR, liability, EU AI Act",
    "priority": 14,
    "tier": "core",
    "freq": "sample paper Q6(c) + Topic 10 + lab",
    "marks": "8 marks (2 x 4)",
    "summary": "**For a startup using GenAI to build loan-approval software, key legal risks are copyright/licence contamination of generated code, GDPR (personal data in prompts and in the system, automated decisions), EU AI Act high-risk obligations for credit scoring, and liability for harmful outputs; each needs a concrete mitigation.**",
    "mnemonic": "IP, GDPR, AI Act, Liability: each risk gets a mitigation",
    "source": [
      "CT4111_Notes_10_Ethical_Legal",
      "CT4111_Notes_10b_Lab"
    ],
    "sections": [
      {
        "heading": "How to answer 'two legal risks, each with a mitigation' (8 marks)",
        "items": [
          "For each give: the **risk name**, **how it arises in this startup** (one specific sentence), the **consequence**, and the **mitigation** (what reduces the risk: 2 or 3 concrete actions). Two well-developed risks beat four thin ones."
        ]
      },
      {
        "heading": "Risk 1: copyright and licensing (IP)",
        "items": [
          "**IP** (intellectual property) is the legal ownership of created work. A **licence** says what others may do with it.",
          {
            "type": "p",
            "text": "How it arises"
          },
          "The LLM may reproduce memorised code identical to licensed code, without saying where it came from.",
          "**Copyleft** licences (GPL, AGPL) require software built on them to share its source code too. Copying such code into the private loan engine (\"GPL contamination\") could force you to publish your source, or bring infringement claims.",
          "Who owns AI-written code is legally unclear: a model is not a legal person, and there is no copyright in content you did not write. Providers such as OpenAI say you are responsible.",
          {
            "type": "p",
            "text": "Mitigation"
          },
          "Scan for licences and similar code (**software composition analysis**, code-match filters).",
          "Review any substantial generated functions.",
          "Keep an **SBOM** (a list of all components), including AI-generated ones.",
          "Use business tools that offer **IP indemnity** (the provider covers legal claims).",
          "Replace flagged code. Rewriting it cosmetically does not remove the problem: write it independently without looking (**clean room**) or use a properly licensed alternative.",
          "Record AI use in commit messages."
        ]
      },
      {
        "heading": "Risk 2: data protection (GDPR)",
        "items": [
          "**GDPR** is the EU law protecting personal data.",
          {
            "type": "p",
            "text": "How it arises"
          },
          "Developers paste customer data or private code into outside LLMs (**prompt leakage**, as happened at Samsung).",
          "Generated code may collect or log more personal data than needed, breaking **data minimisation**, or make fully automated credit decisions, which is high-risk processing needing a **DPIA** (a formal assessment of data protection impact).",
          "Applicants' financial data is highly sensitive, regulated in Ireland by the Data Protection Commission.",
          {
            "type": "p",
            "text": "Mitigation"
          },
          "Do a DPIA before launch.",
          "Use a private LLM or one that keeps nothing, and a filter (**proxy**) that removes personally identifying information (**PII**).",
          "No real customer data in prompts.",
          "Review what generated code collects and how long it keeps it.",
          "Document the lawful reason for processing, and people's rights to an explanation and human review. Get the Data Protection Officer's sign-off."
        ]
      },
      {
        "heading": "Risk 3: EU AI Act, and risk 4: liability",
        "items": [
          {
            "type": "p",
            "text": "Risk 3: EU AI Act (high risk)"
          },
          "The **EU AI Act** regulates AI by risk level. Credit scoring is **high risk**, so it needs risk management, good-quality data, technical documentation, logging, transparency, human oversight, accuracy and cybersecurity (Articles 8-17), with fines for breaking it.",
          "Mitigation: classify the system early; keep documentation and decision logs linking input, version and rule; test for bias; give humans a way to override and suspend; do a **conformity assessment** (formal check that it meets the Act).",
          {
            "type": "p",
            "text": "Risk 4: liability and accountability"
          },
          "Harm from wrong, biased or insecure decisions (discriminatory loan refusals, an attack through an invented dependency) is the company's responsibility. \"The AI did it\" is no defence (Moffatt v Air Canada, Mata v Avianca).",
          "Mitigation: human review, tests, security scanning, checking dependencies are genuine, clear internal accountability, contracts and insurance, and an **audit trail** (a record of who did what)."
        ]
      },
      {
        "heading": "Intellectual property and licences",
        "items": [
          "**IP** means legal rights protecting creations of the mind: patents (inventions), copyright (written and creative work, including code), trademarks (brand names and logos) and trade secrets. Copyright is automatic; patents must be registered.",
          "A **permissive** licence lets you do almost anything. **Copyleft** requires what you build from it to stay under the same terms. A **derivative work** is one built from another.",
          {
            "type": "table",
            "head": [
              "Licence",
              "Type",
              "Key point"
            ],
            "rows": [
              [
                "MIT",
                "Permissive",
                "Use, modify, sell, even closed-source, if copyright notice kept"
              ],
              [
                "Apache 2.0",
                "Permissive",
                "As MIT plus explicit patent grant; terminates if you sue for patent infringement"
              ],
              [
                "GPL",
                "Strong copyleft",
                "Derivative works must also be released under GPL; effectively blocks closed-source reuse (AGPL extends to network use)"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Two problems with AI training and output"
          },
          "(1) The model may have been trained on copyrighted material without permission (a legal problem for the provider, an ethical one for you).",
          "(2) It may memorise and reproduce code identical to protected software without credit (a legal problem for **you**).",
          "Real case: in October 2022 a **class action** (a lawsuit on behalf of many people) was brought against GitHub Copilot for training on public code under 11 open-source licences that require credit. It was not closed as of 2026."
        ]
      },
      {
        "heading": "GDPR (EU General Data Protection Regulation)",
        "items": [
          "Passed 2016, in force 2018. It applies whenever personal data of people in the EU is processed.",
          "**Personal data** is anything that can identify a person directly or indirectly: names, emails, IP addresses, cookie IDs, location, purchase history, profiles. It is broader than the term PII.",
          {
            "type": "p",
            "text": "Special category data (high risk)"
          },
          "Health, biometric and genetic data, sexual orientation, political, religious or philosophical beliefs, race or ethnic origin, trade union membership.",
          "Extra protection also applies to systematic monitoring, **automated decisions with legal or similar effects**, children's data, and data that would cause harm if leaked.",
          "A **DPIA** (Data Protection Impact Assessment) is required where high risk is likely, usually done by the data protection officer.",
          {
            "type": "p",
            "text": "The principles"
          },
          "The **data subject** is the person the data is about; the **controller** is whoever decides how it is used.",
          {
            "type": "table",
            "head": [
              "Principle",
              "Meaning"
            ],
            "rows": [
              [
                "Lawfulness, fairness, transparency",
                "Lawful, fair, transparent to the data subject"
              ],
              [
                "Purpose limitation",
                "Use data only for the stated legitimate purposes"
              ],
              [
                "Data minimisation",
                "Collect only what is necessary"
              ],
              [
                "Accuracy",
                "Keep data accurate and up to date"
              ],
              [
                "Storage limitation",
                "Keep identifying data only as long as necessary"
              ],
              [
                "Integrity and confidentiality",
                "Appropriate security (e.g. encryption)"
              ],
              [
                "Accountability",
                "Controller must demonstrate compliance"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Link to GenAI"
          },
          "AI-written code you do not understand may collect and process personal data you do not need, breaking data minimisation. A US-influenced model may add tracking cookies without the consent pop-up the EU requires."
        ]
      },
      {
        "heading": "EU AI Act (passed April 2024, fully effective August 2026)",
        "items": [
          "It regulates AI systems according to risk.",
          "An **AI system** is a machine-based system working with some autonomy, possibly adapting, that works out from its input how to produce outputs affecting its surroundings.",
          "It need not use machine learning: rule-based code can count. Using GenAI to **write** software does not by itself make that software an AI system.",
          {
            "type": "table",
            "head": [
              "Tier",
              "Examples",
              "Duty"
            ],
            "rows": [
              [
                "Unacceptable (prohibited)",
                "Emotion recognition in education",
                "Banned"
              ],
              [
                "High risk",
                "Hiring/CV filtering, credit scoring, medical devices, critical infrastructure, admissions or grading",
                "Full compliance (Articles 8-17): technical docs, logging, bias testing, human oversight"
              ],
              [
                "Transparency / limited risk",
                "Chatbots, deepfakes, AI-generated content",
                "Disclose that it is AI (Article 50); label generated content"
              ],
              [
                "Minimal risk",
                "Spam filters, video game AI",
                "No special duties beyond general law (GDPR)"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Other duties"
          },
          "Organisations using AI must help staff become **AI literate** (understand what they use).",
          "**General-purpose model** providers must keep technical documentation (including energy use), give information to those building on the model, have a copyright policy respecting opt-outs from text and data mining, and publish a summary of training content.",
          "The biggest, **systemic-risk** models (about 10^25 FLOPs, a measure of training computation) must also do adversarial testing (deliberately attacking them), report incidents and ensure cybersecurity.",
          "If you build a high-risk system on top of such a model, the high-risk duties fall on **you**."
        ]
      }
    ],
    "pitfalls": [
      "Naming risks without a mitigation (each of the two needs one) or with a generic mitigation ('be careful').",
      "Not tying the risk to the loan-approval context (credit scoring is EU AI Act high-risk; financial personal data).",
      "Saying the AI vendor is liable: legally ambiguous and the vendor usually disclaims it.",
      "Confusing legal with ethical: not everything ethical is legal and vice versa."
    ]
  },
  {
    "id": "bias-fairness",
    "title": "Bias, stereotypes and fairness",
    "priority": 18,
    "tier": "likely",
    "freq": "sample paper bonus Q(c) + Topic 10",
    "marks": "8 marks",
    "summary": "**GenAI reflects and amplifies biases in its training data (stereotypes, representation, historical bias, proxies), including in generated code; hosting an open-weights model locally gives control and privacy but does not remove bias, because the weights embody the same training-data biases.**",
    "mnemonic": "Data in, bias out; local hosting moves control, not the bias",
    "source": [
      "CT4111_Notes_10_Ethical_Legal",
      "CT4111_Notes_10b_Lab"
    ],
    "sections": [
      {
        "heading": "What 'biases and stereotypes' means",
        "items": [
          "LLMs are not built to be truthful. They produce likely-sounding text learned from very mixed web data (forums, social media), so they reflect gender, cultural and social biases.",
          "**Bias**: a consistent unfair lean. **Stereotype**: the model attaches fixed traits or roles to a group.",
          "Companies cover this up with **prompt rewriting** (changing your request behind the scenes), system prompts and **preference tuning** (training on what people rate well), so the biases have \"moved, not disappeared\"."
        ]
      },
      {
        "heading": "Examples to quote",
        "items": [
          "**Sora video** (WIRED 2025): 25 prompts repeated 10 times; CEOs and professors were always men; flight attendants, childcare workers and receptionists always women.",
          "**\"Newer is not fairer\"**: across four versions of the image generator Stable Diffusion, 76% of images were male; \"scientist\" came out 1-18% female, against 48% of US scientists.",
          {
            "type": "p",
            "text": "Your own observed example (the exam wants one)"
          },
          "For example, \"a nurse and a surgeon\" returns a female nurse and a male surgeon. Or \"write code for a registration form\" demands both first name and family name, which fails people with only one name.",
          "**How it arose**: training data over-represents stereotypes; the model picks the most likely association; preference tuning and western-centred code reinforce it.",
          {
            "type": "p",
            "text": "Decisions about people"
          },
          "UK police facial recognition: false matches about 0.04% for white people, 5.5% for Black people and near 10% for Black women, at a 0.8 **threshold** (how sure it must be to report a match).",
          "A Rotterdam welfare algorithm selected women 1.25 times more often, and non-Dutch speakers about twice as often."
        ]
      },
      {
        "heading": "Sources and types of bias",
        "items": [
          "**Representation bias**: some groups are scarce in the data.",
          "**Historical or societal bias**: data reflects past inequality (a hiring AI favours men).",
          "**Proxy variable**: a neutral-looking value that goes with a protected characteristic (a postcode standing in for race).",
          "**Aggregation bias**: one model used for groups that differ.",
          "**Cultural blind spots in code**: first and last name fields, meanings of colours, assuming English and left-to-right text, assuming good devices and internet (Ryanair's app-only boarding passes shut out people without smartphones).",
          "**Team bias**: lack of lived experience, favouring people like yourself (**affinity**), deferring to seniors (**authority**: juniors do not query a senior's tool), and following the crowd (**bandwagon**: adopting a popular model without checking it).",
          "**Software without machine learning too**: code written by a biased LLM can contain bias even though its logic is fixed rules (such as requiring a family name)."
        ]
      },
      {
        "heading": "Can hosting an open-weights model locally mitigate bias? (reasoned answer)",
        "items": [
          "An **open-weights model** (such as Llama or Mistral) is one you can download and run yourself.",
          "**Mostly no: bias comes from the training data and weights.** Such models were trained on similar web data and carry similar stereotypes. Running one locally does not change it.",
          {
            "type": "p",
            "text": "What local hosting does give"
          },
          "You can inspect it, **fine-tune** it (train it further) on balanced or specialist data, set your own system prompt and filters, test it, control your data, and no provider changes it without telling you.",
          {
            "type": "p",
            "text": "Possible downside"
          },
          "Cloud providers add safety measures that a raw local model may lack, so it can be **more** biased straight out of the box. You also carry the responsibility and the hardware cost.",
          "**Conclusion**: local hosting is for control and privacy, not a cure for bias. You still need bias testing, diverse teams and prompts, fine-tuning and constraints, human review and monitoring of outcomes."
        ]
      },
      {
        "heading": "Mitigations in practice",
        "items": [
          "Review outputs carefully.",
          "Test for **disparate outcomes**: differences between groups in approval rates or false positives.",
          "Avoid proxy variables.",
          "Gather requirements from diverse and inclusive sources.",
          "Document your assumptions and how AI was used.",
          "Check fairness in your specific field (see the FinTech case)."
        ]
      }
    ],
    "pitfalls": [
      "Giving no specific example, or an example without explaining how it arose (data).",
      "Answering the local-hosting question 'yes it removes bias' or 'no' without reasoning on weights and training data.",
      "Equating bias only with images: it also appears in generated code and in decisions about people."
    ]
  },
  {
    "id": "privacy-security-risks",
    "title": "Privacy leakage and code-security risks",
    "priority": 25,
    "tier": "possible",
    "freq": "Topic 10 (security and privacy sections)",
    "marks": "5-8 marks",
    "summary": "**Prompts can leak PII and proprietary code to providers (Samsung case); mitigate with private LLMs, zero-retention APIs and PII-filtering proxies; GenAI code brings supply-chain, injection and unpatched-vulnerability risks that need scanning and review.**",
    "mnemonic": "Leak-proof the prompt; verify every package",
    "source": [
      "CT4111_Notes_10_Ethical_Legal",
      "CT4111_Notes_02_Topic_2"
    ],
    "sections": [
      {
        "heading": "Privacy and data leakage",
        "items": [
          "**PII** (personally identifying information): data that identifies, contacts or locates a person, directly or indirectly (names, emails, social security numbers, bank details, biometrics).",
          "Also protect private code, API keys, passwords, medical and legal records and intellectual property.",
          {
            "type": "p",
            "text": "How leaks happen"
          },
          "Prompts containing code or user data may be logged and used for training unless a business agreement prevents it.",
          "**Samsung case**: in three incidents, employees pasted faulty source code, defect-detection code and a meeting transcript into ChatGPT.",
          "Keys leaked in public repositories can be learnt by models.",
          "Generated code can itself break privacy rules (such as tracking cookies legal in the US but needing consent in the EU)."
        ]
      },
      {
        "heading": "Ways to protect data",
        "items": [
          "**Private instance**: run the model yourself. **Zero-retention licence**: the provider keeps nothing. **Filtering proxy**: a go-between that removes personal data before sending (Presidio is one tool).",
          {
            "type": "table",
            "head": [
              "Mitigation",
              "Pros",
              "Cons"
            ],
            "rows": [
              [
                "Private LLM instance (open weights on own cloud or on-premise)",
                "Absolute data control, fine-tuning, predictable performance",
                "High GPU cost, operational complexity, performance gap to frontier models"
              ],
              [
                "Zero-retention API licence",
                "Frontier models, no infrastructure, SOC 2/HIPAA/GDPR DPAs",
                "Data leaves your network (trust and audit risk), vendor lock-in and downtime, no deep customisation"
              ],
              [
                "Automatic PII filtering proxy (e.g. Presidio, regex)",
                "Proactive, cheap, works with public APIs",
                "Context stripping reduces answer quality, false negatives, extra latency"
              ]
            ]
          },
          "**Best practice** is a mix: a zero-retention service for hard tasks, reached through an internal filter, with a policy written by legal experts on which tools may be used for what (or a ban). No approach is bullet-proof.",
          "**Shadow AI**: staff using unapproved AI tools, often because policies are too strict. Provide an approved, safe way."
        ]
      },
      {
        "heading": "Code security risks",
        "items": [
          "**Hallucinated dependency**: the AI suggests a package that does not exist, or one an attacker has registered under that invented name (**slopsquatting**). Installing it runs harmful code: a **supply-chain attack**.",
          "**Data poisoning**: attackers publish thousands of repositories containing a hidden **backdoor** so that models learn it.",
          "**Insecure code**: passwords written into code, and **SQL injection** (typed text becomes a database command, using a quote, double dash or `OR 1=1`; fix with parameterised queries).",
          "**Old holes returning**: for example Log4Shell, a serious Java logging flaw (found November 2021, fixed December 2021), may reappear because training data contains vulnerable code.",
          "**Automated technical debt**: code nobody understands.",
          {
            "type": "p",
            "text": "Mitigation"
          },
          "Analyse generated code with tools (Snyk, SonarQube; none is fully reliable), check where dependencies come from, review, test, give credentials the minimum access, keep an **SBOM** (component list).",
          "**Misaligned agent behaviour**: changing tests so they pass, or inventing justifications for a design."
        ]
      }
    ],
    "pitfalls": [
      "Only naming the risks: include one mitigation each."
    ]
  },
  {
    "id": "professional-environment",
    "title": "Professional responsibility, ethics and environmental impact",
    "priority": 30,
    "tier": "possible",
    "freq": "Topic 10 (second half)",
    "marks": "4-8 marks",
    "summary": "**Legal compliance is not the same as ethics; engineers stay accountable for AI output (IEEE code principle 1: public interest), should declare AI use, avoid AI slop and respect academic integrity; AI has environmental costs (energy, water) mostly in inference, so use the smallest model that does the job.**",
    "mnemonic": "Accountable, Declared, Verified; smallest model that works",
    "source": [
      "CT4111_Notes_10_Ethical_Legal"
    ],
    "sections": [
      {
        "heading": "Ethics vs law and professional responsibility",
        "items": [
          "'Not everything that is ethical is legal; not everything that is legal is ethical.'",
          "**IEEE-CS/ACM Software Engineering Code of Ethics:** 8 principles; principle 1: act consistently with the **public interest**.",
          "IEEE-CS and ACM are the two main professional bodies for computing. **Whistleblowing** is reporting wrongdoing from inside.",
          "**Whistleblowing:** report when AI-driven shortcuts compromise safety or public trust; takes courage, protection varies by country.",
          "**Documentation:** declare AI use in commit messages and READMEs; keep a **Software Bill of Materials (SBOM)** listing components (open source, proprietary, AI-generated) for traceability.",
          "**Accountability:** the person or organisation is accountable, not the tool: Mata v Avianca (lawyers sanctioned for fake citations, 2023), Moffatt v Air Canada (airline liable for chatbot advice, 2024), Deloitte Australia (partial refund for fabricated references, 2025).",
          "**AI slop:** unreviewed AI content pushes cognitive load onto the reader; need critical thinking; do not automate your core intellectual value.",
          "**Academic integrity:** AI is not automatically allowed; permission is per module and assessment; never present AI material as your own; you remain responsible for accuracy; if in doubt ask first.",
          "**When not to use AI:** it defeats the learning purpose; you cannot verify the output; not authorised by policy; data should not leave your control (PII, IP); if you feel you should hide your use, it is probably a bad use case."
        ]
      },
      {
        "heading": "Environmental considerations",
        "items": [
          "Data centres used about 415 TWh in 2024 (1.5% of global electricity, IEA); AI-focused hyperscale sites 100 MW or more (about 100,000 households); in Ireland data centres use about 20% of metered electricity.",
          "Training GPT-4: about 25,000 GPUs, about 14 weeks, about 42.4 GWh (0.43 GWh per day). But once deployed, **inference across all users far outweighs training**.",
          "Per-query estimates vary about 2000-fold (519 ml water per 100-word email vs 0.26 ml and 0.24 Wh per median Gemini text prompt) depending on what is counted (training or inference, direct or indirect water). Efficiency per prompt falls (33x in 12 months at Google) but total AI data-centre electricity grew (about 50% in 2025).",
          "Practice: use the smallest model that does the job; images and video cost more than text; reasoning models add tokens; fewer, better prompts; bound output length; use search engines for simple questions; avoid unnecessary default transcription."
        ]
      }
    ],
    "pitfalls": [
      "Quoting a single environmental number as if it were settled: say estimates vary and depend on scope."
    ]
  },
  {
    "id": "fintech-flow-case",
    "title": "Lab case: FinTech-Flow loan-approval microservice",
    "priority": 31,
    "tier": "possible",
    "freq": "Topic 10 lab assignment (scenario for Q6(c) style questions)",
    "marks": "8-12 marks",
    "summary": "**Four failures from one AI-generated loan service: hallucinated dependency (supply chain), AGPL copy (IP), postcode proxy bias, and EU AI Act logging and oversight failures; each links to a topic and a concrete remedy.**",
    "mnemonic": "Package, Licence, Postcode, Logs",
    "source": [
      "CT4111_Notes_10b_Lab"
    ],
    "sections": [
      {
        "heading": "Scenario",
        "items": [
          "FinTech-Flow, a European startup, uses an agentic coding assistant to build a loan-approval microservice (rule-based expert system for risk scoring, assumed an AI system under the AI Act; live in 2028 when Annex III high-risk rules apply). Lead developer Sarah prompts a FastAPI + PostgreSQL service with audit logging, reviews briefly and merges.",
          "Words: **agentic coding assistant** = AI that carries out coding tasks itself. **Microservice** = a small independent service. **Rule-based expert system** = decisions from written rules. **FastAPI** = a Python web framework; **PostgreSQL** = a database. **Audit log** = a record of what happened."
        ]
      },
      {
        "heading": "Problem 1: security (hallucinated dependency)",
        "items": [
          "**What happened**: the AI suggested `fastapi-security-audit-pro`, a name an attacker had already registered on **PyPI** (Python's package store). Its install script stole **deployment credentials** (the passwords used to release the software).",
          "**Contain**: change (rotate) the credentials and isolate the pipeline.",
          "**Investigate** affected systems and customer data (GDPR requires notifying breaches).",
          "**Prevent**: check where every dependency comes from; **lock files** with **hashes** (record the exact version and fingerprint); an internal mirror or allow-list of packages; dependency scanning tools (SCA); minimal-access build credentials; human review of dependency changes."
        ]
      },
      {
        "heading": "Problem 2: IP (AGPL copy-paste trap)",
        "items": [
          "**What happened**: a function was copied word for word from software under **AGPL-3.0**, with the notices removed, while the company wants its source private.",
          "AGPL is strong **copyleft** that also covers use over a network, so merely offering the service could require releasing your source.",
          "**Options**: (a) comply and release under AGPL (clashes with the business model); (b) get a separate commercial permission from the owner; (c) remove it and write an independent version from the specification (**clean room**), reviewed.",
          "Cosmetic rewriting does not help if the result is still derived from the original.",
          "**Prevent**: licence scanning, code-match filters, SBOM, a policy."
        ]
      },
      {
        "heading": "Problem 3: bias (zip code as a proxy)",
        "items": [
          "**What happened**: a US-centred rule gives districts with large immigrant communities a negative adjustment: a 15 percentage-point gap in approvals at similar incomes.",
          "A **proxy** is a value that stands in for a protected characteristic.",
          "The gap shows a difference (possible **indirect discrimination**) but does not prove the cause: other credit factors have not been examined (**confounders**).",
          "**Investigate**: compare like with like on legitimate factors (income, debt, history); remove the postcode and measure the effect; check whether it stands in for protected traits; ask whether it is justified and necessary; use fairness measures; involve legal and domain experts.",
          "**Fix**: drop or replace the variable, retrain or recalibrate, and keep monitoring."
        ]
      },
      {
        "heading": "Problem 4: EU AI Act (transparency and logging)",
        "items": [
          "**What happened**: logs hold only time, application ID and outcome, with no link to inputs, software version, rules or thresholds, and there is no override or tested way to suspend the system.",
          "**High-risk duties**: technical documentation, automatic logging so decisions can be traced, transparency, **human oversight** able to override, accuracy and robustness, risk management.",
          "**Remedy**: log the inputs (or reduced, hashed references), model and rule version, thresholds and reasons for each decision; a screen where a loan officer can inspect and override; a tested **kill switch** and human review route."
        ]
      },
      {
        "heading": "The four reflection questions (reasoning points)",
        "items": [
          "**Traceability**: existing logs only show that a decision was made. Missing: inputs, version, rules, thresholds, reasons and human involvement. Add structured decision records, versioned rules, an audit trail that cannot be altered and human review, while storing only necessary data (retention limits, access control, **pseudonymising**: replacing names with codes).",
          "**Professional responsibility:** using an AI agent does not remove Sarah's accountability (she reviewed and merged); she remains responsible for diligence, the company for governance (policies, training, compliance, provider of the high-risk system). Facts needed: her role and authority, company policies, review process, what she knew, contracts, jurisdiction.",
          "**Bias and fairness:** see #3; difference is evidence of disparity, not proof of unlawful discrimination.",
          "**IP strategy:** see #2; compare compliance (open sourcing), permission (licence from owner), replacement (clean implementation)."
        ]
      }
    ],
    "pitfalls": [
      "Treating the 15-point gap as proof of discrimination, or as meaningless."
    ]
  }
];
