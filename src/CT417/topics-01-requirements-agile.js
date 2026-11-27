module.exports = [
  {
    "id": "req-attributes",
    "title": "Attributes of good requirements, user stories and FR/NFR",
    "priority": 1,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q1 (important); 0/7 past papers",
    "marks": "5-10 marks",
    "summary": "**A requirement says what the system must do, not how. A good one is clear, complete, needed, testable, doable, consistent and traceable.**",
    "mnemonic": "U-C-N-V-F-C-T: Unambiguous, Complete, Necessary, Verifiable, Feasible, Consistent, Traceable (WHAT, not HOW)",
    "source": [
      "CT417_Notes_03_Requirements_Change_Management",
      "CT417_Notes_01a_SE_Revision"
    ],
    "sections": [
      {
        "heading": "What is a requirement",
        "items": [
          "A **requirement** is something the system must do or have, because someone needs it.",
          "It can be a capability, a property or a limit.",
          {
            "type": "p",
            "text": "Requests are easy to misread"
          },
          "\"Build a system to help TAs grade more efficiently\" hides many questions.",
          "What counts as efficient? What does grading include?",
          "Take it at face value and developers build the wrong thing.",
          {
            "type": "p",
            "text": "Stakeholders"
          },
          "A **stakeholder** is anyone who affects the system or is affected by it: users, owners, regulators, support staff.",
          "Missing one is like designing a house without asking who will live in it.",
          "Each has different worries. Students fear unfair grades, TAs fear workload, instructors fear complaints.",
          "The requirements must balance these."
        ]
      },
      {
        "heading": "Attributes of good requirements (learn these for Q1)",
        "items": [
          {
            "type": "table",
            "head": [
              "Attribute",
              "Meaning",
              "Test question"
            ],
            "rows": [
              [
                "Unambiguous / clear",
                "Only one possible interpretation; no vague words (fast, easy, user-friendly, efficient)",
                "Could two developers read it differently?"
              ],
              [
                "Complete",
                "Contains everything needed to design and test it (who, what, conditions, limits)",
                "Is any information missing?"
              ],
              [
                "Concise",
                "One requirement per statement, short",
                "Does it say more than one thing?"
              ],
              [
                "Necessary",
                "Removing it would leave a real need unmet; appropriate to the hierarchy level",
                "What happens if we leave it out?"
              ],
              [
                "Verifiable (testable)",
                "Can be proved by test, inspection, demonstration or analysis",
                "How will we know it has been met?"
              ],
              [
                "Attainable / feasible",
                "Can be achieved within technology, budget, time",
                "Can it actually be built?"
              ],
              [
                "Consistent",
                "Does not contradict other requirements (internally consistent)",
                "Does it conflict with another?"
              ],
              [
                "Traceable",
                "Linked up to a stakeholder need and down to design, code and tests",
                "Where did it come from and where is it implemented/tested?"
              ],
              [
                "Solution-neutral (WHAT not HOW)",
                "States the need, not the implementation, unless a constraint",
                "Does it dictate a technology without reason?"
              ]
            ]
          },
          {
            "type": "note",
            "text": "Wording from the slides, worth quoting: good requirements are concise, unambiguous, solution-neutral where appropriate, internally consistent, necessary, verifiable and attainable."
          },
          "They say **what**, not how.",
          "They can be checked by a test or independent analysis.",
          "They are necessary and pitched at the right level of the system.",
          "They are feasible, consistent, and traceable to the requirements above and below."
        ]
      },
      {
        "heading": "Functional vs non-functional requirements",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "Functional (FR)",
              "Non-functional (NFR)"
            ],
            "rows": [
              [
                "About",
                "Product features: what the system does",
                "Product properties: how well, the experience of the user"
              ],
              [
                "Examples",
                "Receptionist can book an appointment",
                "Booking page loads in under 2 seconds"
              ],
              [
                "Capture",
                "Use cases, user stories, sequence diagrams, state machines",
                "Global constraints, hard to capture in use cases"
              ],
              [
                "Traceability",
                "Usually traced to one module/class/function",
                "Usually cannot be implemented in a single module"
              ],
              [
                "Typical list",
                "Create, read, update, delete, notify",
                "Availability, maintainability, performance, privacy, reliability, scalability, security, usability"
              ]
            ]
          },
          "Turn a vague quality into something you can measure.",
          "**Slide example**: \"With a 4-core server and 16 GB RAM the system should service at least 200 simultaneous clients with less than 300 ms latency.\"",
          "**Vague**: \"The system should be fast.\"",
          "**Measurable**: \"95% of search requests return in under 500 ms with 100 concurrent users.\""
        ]
      },
      {
        "heading": "User stories",
        "items": [
          "A **user story** is a short sentence saying who wants what, and why.",
          {
            "type": "formula",
            "label": "User story template",
            "text": "As a <role> I want <capability> so that I can <get some benefit>"
          },
          "It fits on a small card. It may have prerequisites, and has a priority.",
          "**Conditions of satisfaction** (acceptance criteria): testable behaviour, seen from the user's side.",
          "They are numbered inside the story (1.1, 1.2) and each has a priority (E = essential, D = desirable).",
          {
            "type": "p",
            "text": "Pothole example"
          },
          "Story 1: \"As a citizen I want to report potholes so that the town can do something about them.\" (E)",
          "1.1: report a pothole (E).",
          "1.2: see whether my pothole has been repaired (E).",
          "1.3: see whether someone already reported it (D).",
          "1.4: see the estimated repair time (D).",
          "A good story is **INVEST**: Independent, Negotiable, Valuable, Estimable, Small, Testable."
        ]
      },
      {
        "heading": "Worked example: rewriting a bad requirement (veterinary clinic)",
        "items": [
          {
            "type": "p",
            "text": "Bad requirement: \"The clinic system shall be easy to use and quickly show a pet's history.\""
          },
          "\"Easy\" and \"quickly\" cannot be tested.",
          "\"History\" is not defined.",
          "It is two requirements stuck together.",
          {
            "type": "p",
            "text": "Better"
          },
          "**Functional**: \"FR-12: A receptionist shall be able to retrieve all visits for a selected pet, ordered by date, from the pet record screen.\"",
          "**Non-functional**: \"NFR-4: The visit list for a pet with up to 200 visits shall display within 2 seconds for 95% of requests with 20 concurrent users.\"",
          "**Story**: \"As a vet I want to see a pet's previous visits so that I can avoid repeating treatments.\"",
          "1.1: visits listed newest first.",
          "1.2: an unknown pet gives a clear message.",
          "1.3: the existing full visit list still works.",
          {
            "type": "note",
            "text": "In the exam, state assumptions when the scenario is vague. For example: visits are stored with a pet id, reception uses the existing web screen, and 200 visits is a realistic maximum."
          }
        ]
      },
      {
        "heading": "How to get complete requirements (elicitation)",
        "items": [
          "**Elicitation** means finding out what people need. One method is never enough.",
          "**1.** Interview stakeholders (broad needs).",
          "**2.** Watch real work (hidden complications).",
          "**3.** Run workshops with several stakeholders (settle conflicts).",
          "**4.** Build prototypes (check you understood).",
          "**5.** Read policy documents (limits and rules).",
          "**6.** Walk through detailed scenarios (find gaps).",
          "**Warning signs**: only talking to managers, leading questions, using one method, missing quiet people."
        ]
      }
    ],
    "pitfalls": [
      "Give at least six attributes, each with its meaning and a vet-clinic style example.",
      "Say what, not how (\"use MySQL\" is how), unless it is a real constraint.",
      "Avoid words you cannot measure, such as fast, secure or user-friendly.",
      "State your assumptions. The lecturer asks for them."
    ]
  },
  {
    "id": "agile-manifesto",
    "title": "Agile Manifesto: 4 values and 12 principles",
    "priority": 2,
    "tier": "core",
    "hint": "likely",
    "freq": "2/7 papers (2023-24 x2) + hinted Q1a",
    "marks": "4-9 marks",
    "summary": "**The Agile Manifesto has 4 values and 12 principles. Question 1a asks you to describe it and apply 2 or 3 principles to a scenario.**",
    "mnemonic": "Values: People, Software, Customer, Change (PSCC). Principles: Customer, People, Product, Reflect",
    "source": [
      "CT417_Notes_01b_Agile_DevOps"
    ],
    "sections": [
      {
        "heading": "Agile in one paragraph",
        "items": [
          "**Agile** means building software in small working pieces.",
          "You get feedback often, deliver often and adapt quickly.",
          "The **Manifesto for Agile Software Development** was written in 2001.",
          "It says: we are uncovering better ways of developing software by doing it and helping others do it.",
          "Its key line: \"While there is value in the items on the right, we value the items on the left more.\""
        ]
      },
      {
        "heading": "The four values",
        "items": [
          {
            "type": "table",
            "head": [
              "Value (preferred)",
              "Over",
              "What it means in practice"
            ],
            "rows": [
              [
                "Individuals and interactions",
                "processes and tools",
                "Talk to people daily; tools support the team, they do not replace conversation"
              ],
              [
                "Working software",
                "comprehensive documentation",
                "A running increment is the measure of progress; document just enough"
              ],
              [
                "Customer collaboration",
                "contract negotiation",
                "Customer is part of the team, reviews each sprint; do not hide behind the contract"
              ],
              [
                "Responding to change",
                "following a plan",
                "Re-plan every sprint; changing requirements are welcome"
              ]
            ]
          },
          "**Slide quote**: \"The highest priority is to satisfy the customer through early and continuous delivery of valuable software.\""
        ]
      },
      {
        "heading": "The twelve principles (learn all; the exam picks one or more)",
        "items": [
          {
            "type": "table",
            "head": [
              "#",
              "Principle (short)",
              "Group"
            ],
            "rows": [
              [
                "1",
                "Satisfy the customer through early and continuous delivery of valuable software",
                "Customer"
              ],
              [
                "2",
                "Welcome changing requirements, even late in development; harness change for competitive advantage",
                "Customer"
              ],
              [
                "3",
                "Deliver working software frequently, from a couple of weeks to a couple of months, preferring the shorter scale",
                "Customer"
              ],
              [
                "4",
                "Business people and developers work together daily throughout the project",
                "Customer"
              ],
              [
                "5",
                "Build projects around motivated individuals; give them the environment and support they need and trust them",
                "People"
              ],
              [
                "6",
                "Face-to-face conversation is the most efficient and effective way to convey information",
                "People"
              ],
              [
                "7",
                "Working software is the primary measure of progress",
                "Product"
              ],
              [
                "8",
                "Agile processes promote sustainable development: a constant pace indefinitely",
                "People"
              ],
              [
                "9",
                "Continuous attention to technical excellence and good design enhances agility",
                "Product"
              ],
              [
                "10",
                "Simplicity, the art of maximising the amount of work not done, is essential",
                "Product"
              ],
              [
                "11",
                "The best architectures, requirements and designs emerge from self-organising teams",
                "People"
              ],
              [
                "12",
                "At regular intervals the team reflects on how to become more effective, then tunes and adjusts its behaviour",
                "Reflect"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Frameworks that implement Agile",
        "items": [
          {
            "type": "p",
            "text": "Scrum"
          },
          "Work in **sprints** of 2-4 weeks.",
          "Meetings: sprint planning, daily stand-up, sprint review, retrospective.",
          "**Product owner**: owns the to-do list (backlog) and priorities.",
          "**Scrum master**: removes blockers and coaches the process.",
          "**Development team**: builds it.",
          {
            "type": "p",
            "text": "Others"
          },
          "**Kanban**: show work on a board and limit how much is in progress at once.",
          "**XP (Extreme Programming)**: pair programming, test-driven development, continuous integration, small frequent releases.",
          "**Lean**: cut waste, maximise value."
        ]
      },
      {
        "heading": "Model answers to the past-paper shapes",
        "items": [
          {
            "type": "p",
            "text": "Shape 1: \"Describe the Manifesto and list TWO principles\" (4 marks)"
          },
          "One sentence on what it is.",
          "The four value pairs.",
          "Two principles, one line each. For example: welcome changing requirements (2) and deliver working software often (3).",
          {
            "type": "p",
            "text": "Shape 2: \"Changing requirements cause delays. Pick one principle and give TWO solutions\" (6 marks)"
          },
          "Choose principle 2, welcome change.",
          "**Solution 1**: keep a prioritised backlog and re-order it at each sprint planning, so new needs go into the next sprint.",
          "**Solution 2**: short 2-week sprints with a demo, so wrong assumptions are caught early.",
          "**Solution 3**: automated tests and continuous integration, so changes are cheap and safe.",
          {
            "type": "p",
            "text": "Shape 3: \"Five steps using principle 4 to fix poor predictions\" (5 marks)"
          },
          "Principle 4: business people and developers work together daily.",
          "**1.** Put a product owner in the team, available every day.",
          "**2.** Agree together what \"accurate enough\" means, as a testable target (for example 70% match accuracy).",
          "**3.** Stakeholders attend sprint reviews and try the model.",
          "**4.** Add user concerns to the backlog as stories.",
          "**5.** Review in a retrospective, adjust data and model, then measure again.",
          {
            "type": "p",
            "text": "Shape 4: \"Three principles for XYZ, and how to apply them to its CRM project\" (6 + 9 marks)"
          },
          "**Customer collaboration**: the product owner reviews stories each sprint, and sales staff test each version.",
          "**Responding to change**: re-prioritise each sprint. A new \"lead scoring\" request replaces a less valuable feature.",
          "**Working software**: each sprint ends with something usable, such as contact search, shown at the review and shipped through CI/CD."
        ]
      }
    ],
    "pitfalls": [
      "Apply each point to the scenario. Do not just recite.",
      "Keep the 4 values (X over Y) separate from the 12 principles.",
      "Do not write Agile vs Waterfall. The lecturer says 1a is about the Manifesto.",
      "Agile does not mean no documentation. It values working software **over** heavy documentation."
    ]
  },
  {
    "id": "req-change-management",
    "title": "Requirements engineering, management and change control",
    "priority": 3,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q1 (checkpoint style); 0/7 papers",
    "marks": "8-15 marks",
    "summary": "**Requirements are gathered, written down, checked, then managed. Every change is recorded, assessed, approved, built, tested and traced. State your assumptions.**",
    "mnemonic": "Capture - Clarify - Commit - Change-control - Trace (the 5 Cs of requirements management)",
    "source": [
      "CT417_Notes_03_Requirements_Change_Management"
    ],
    "sections": [
      {
        "heading": "Requirements engineering process",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                "Elicit (interviews, observation, workshops)",
                "Analyse and negotiate conflicts",
                "Specify (stories, criteria, NFRs)",
                "Validate (prototypes, review)",
                "Manage (change, trace, baseline)"
              ],
              "direction": "row",
              "loopBack": "requirements evolve, repeat"
            },
            "caption": "Requirements engineering is iterative, not a one-off phase."
          },
          "The first request is only a starting point, not the full requirement.",
          "Keep the original request.",
          "Then add the clarified requirement, the acceptance criteria and any open questions."
        ]
      },
      {
        "heading": "Requirements management (what it is)",
        "items": [
          "Collect needs from the market, business strategy, customers and others.",
          "Turn needs into requirements, and check the meaning with whoever asked.",
          "Get management and the team to commit to them.",
          "Keep a history of changes and **why** they were made.",
          "Keep links both ways between requirements, plans and the things you build (**traceability**).",
          "Find and fix any mismatches between them."
        ]
      },
      {
        "heading": "Why we \"engineer\" requirements",
        "items": [
          "**Check they are met**: confirm early that the product covers the main requirements.",
          "**Responsibility**: it is clear who builds each one.",
          "**Visibility**: shows who has what, and where teams depend on each other.",
          "**Assess change**: see quickly what a change affects.",
          "**Support V&V** (verification and validation): gives data to check requirements and designs early."
        ]
      },
      {
        "heading": "Traceability and change authority",
        "items": [
          "Requirements come in levels: stakeholder needs, then system requirements, then component requirements.",
          "**Link upwards**: why does this exist?",
          "**Link downwards**: where is it designed, coded and tested?",
          "A **change authority** (a change board, or the product owner) decides if a change is accepted.",
          "Developers do not just make changes informally.",
          {
            "type": "table",
            "head": [
              "Step",
              "What happens",
              "Output"
            ],
            "rows": [
              [
                "1 Raise",
                "Stakeholder submits a change request (CR); original wording kept",
                "CR recorded as an issue/work item"
              ],
              [
                "2 Clarify",
                "Ask what, why, who, edge cases; write acceptance criteria and open questions",
                "Clarified requirement"
              ],
              [
                "3 Impact analysis",
                "Which requirements, components, tests, schedule, cost, risks are affected?",
                "Impact report, estimate"
              ],
              [
                "4 Decide",
                "Change authority approves, rejects, defers; set priority",
                "Decision recorded with rationale"
              ],
              [
                "5 Implement",
                "Branch, code, pull request with review",
                "Change in code"
              ],
              [
                "6 Verify",
                "Tests prove the criteria and existing behaviour still works (regression)",
                "Test evidence"
              ],
              [
                "7 Update and trace",
                "Update documents, link issue to PR and tests, release notes",
                "Traceable history"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Readiness vs priority (lecture point)",
        "items": [
          "**Readiness** and **priority** are different things.",
          "Readiness: raw request, then clarified, then ready to build.",
          "Priority: high, medium or low.",
          "A change can be urgent and still not ready.",
          "**Ready** means: clear requirement, acceptance criteria, open questions solved or visible, an owner, and enough agreement to start.",
          "Moving a card to \"Ready\" does not make the missing decisions. The tool only records the agreement."
        ]
      },
      {
        "heading": "Tooling: Jira vs GitHub Issues + Projects",
        "items": [
          "**Jira**: for larger organisations with many teams, dependencies, roadmaps, permissions and reporting.",
          "Its terms: project, epic, story/task, backlog, assignee, workflow, board, priority, acceptance criteria.",
          "**GitHub Issues + Projects**: built around the code repository.",
          "**Issue**: the detailed record (request, clarified requirement, acceptance criteria, discussion).",
          "**Project**: the board or backlog, with status and priority.",
          "**Pull request**: links the code to the issue.",
          "The tool changes but the thinking does not. Pick a tool that fits the size of the job.",
          "**Evidence chain**: Issue, then Pull Request, code, test, and proof (merge history, CI checks)."
        ]
      },
      {
        "heading": "Worked example: PetClinic CR-02 (veterinary clinic)",
        "items": [
          {
            "type": "p",
            "text": "The request"
          },
          "\"Staff have to read the whole visit list by hand. They need one pet's visits, without breaking the current list.\"",
          {
            "type": "p",
            "text": "Turn it into something buildable"
          },
          "**Requirement**: callers can get the visits for a chosen pet, and the full list still works as before.",
          "**Criterion 1**: with a pet id, return only that pet's visits.",
          "**Criterion 2**: with no pet id, return the full list, unchanged.",
          "**Open question**: unknown pet, return 404 or an empty list?",
          "**Open question**: badly formed pet id, return 400?",
          "**Open question**: known pet with no visits, return an empty list?",
          "This only adds an optional parameter, so it does not break existing users.",
          {
            "type": "note",
            "text": "Assumptions to state: visit ids and pet ids are numbers, the existing endpoint must stay compatible, and the head vet approves the change."
          }
        ]
      },
      {
        "heading": "Answer template for \"manage this change request\" (20-mark Q1 style)",
        "items": [
          "**1.** Assumptions (2-3 bullets).",
          "**2.** Stakeholders and what each cares about.",
          "**3.** The requirement as a user story, with acceptance criteria and non-functional requirements.",
          "**4.** Check it is unambiguous, testable, consistent and traceable.",
          "**5.** Change control: raise it, assess impact, authority decides, build on a branch with a PR, test, update the links.",
          "**6.** Tools: issue, board, pull request, and Git history as the record."
        ]
      }
    ],
    "pitfalls": [
      "Name who decides (change authority) and include an impact analysis step.",
      "Do not forget traceability (issue, PR, tests) and the reasons for changes.",
      "State assumptions when the question invites it.",
      "Priority and readiness are not the same."
    ]
  }
];
