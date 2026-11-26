module.exports = [
  {
    id: 'design-patterns-refactoring',
    title: 'Refactoring, polymorphism, Factory and other design patterns',
    priority: 24,
    tier: 'possible',
    freq: '4/7 papers (2019; 2024-25 Q4; 2025-26 s1 Q4 and autumn Q4); not in the hint list',
    marks: '4-20 marks',
    summary: '**Refactoring restructures code without changing behaviour to remove duplication and coupling. Replace role if/else with an abstract User + subclasses (polymorphism), a Factory for creation, Strategy for payment methods, Observer for notifications, honouring the Open/Closed Principle.**',
    mnemonic: 'Branch on type? Use polymorphism. Creating by type? Factory. Swappable algorithm? Strategy. Notify many? Observer',
    source: ['CT417_Exam_2024-2025_1_1_5', 'CT417_Exam_2025-2026_1_1_5', 'CT417_Exam_2025-2026_1_2_3', 'CT417_Notes_07_Software_Architecture'],
    sections: [
      {
        heading: 'Why design patterns and refactoring (4-mark answers)',
        items: [
          '**Design pattern**: a reusable, proven solution to a recurring design problem, described by name, problem, solution and consequences. Importance: shared vocabulary, proven structure, maintainability and extensibility, loose coupling, less duplication, faster design, promotes OO principles (SOLID).',
          '**Refactoring**: restructuring existing code without changing external behaviour. Improves reusability by: removing duplicated logic into shared methods/classes; extracting abstractions (interfaces/abstract classes) so many callers reuse one implementation; splitting large classes into cohesive units (SRP); lowering coupling so parts can be reused independently; making code easier to test, which lets you refactor safely; reducing technical debt.',
          '**Cohesion/coupling**: aim for high cohesion (a class has one well-defined purpose = Single Responsibility) and loose coupling (depend on abstractions, limit dependencies).',
          '**Open/Closed Principle (OCP)**: open for extension, closed for modification: add new behaviour by adding new classes, not editing tested code.'
        ]
      },
      {
        heading: 'Refactoring 1: polymorphism instead of per-role methods (2024-25 Q4c)',
        items: [
          { type: 'code', text: 'public abstract class User {\n    protected final String username;\n    protected final String password;\n    protected User(String username, String password) {\n        this.username = username;\n        this.password = password;\n    }\n    public abstract boolean authenticate();      // each role implements its own logic\n}\n\npublic class Customer extends User {\n    public Customer(String u, String p, String loyaltyId) { super(u, p); }\n    @Override public boolean authenticate() {\n        System.out.println("Authenticated Customer");\n        return true;\n    }\n}\n\npublic class Manager extends User {\n    public Manager(String u, String p, String storeLocation) { super(u, p); }\n    @Override public boolean authenticate() {\n        System.out.println("Authenticated Manager");\n        return true;\n    }\n}\n\npublic class UserController {\n    public boolean authenticate(User user) {      // one method for all roles\n        return user != null && user.authenticate();\n    }\n}' },
          'The controller depends on the abstraction `User`. A new role needs a new subclass only; no if/else chain to edit.'
        ]
      },
      {
        heading: 'Refactoring 2: Factory pattern for creation (2024-25 Q4d)',
        items: [
          { type: 'code', text: 'public class UserController {\n    public User createAccount(String role, String username, String password, String extraInfo) {\n        User user = UserFactory.createUser(role, username, password, extraInfo);\n        // persist user, send welcome message ...\n        return user;\n    }\n}' },
          'The two duplicated methods (createCustomerAccount, createManagerAccount) collapse into one that delegates object creation to the factory. Creation logic is centralised; the controller does not use `new Customer(...)`.'
        ]
      },
      {
        heading: 'Refactoring 3: Open/Closed factory (2024-25 Q4e)',
        items: [
          { type: 'code', text: '@FunctionalInterface\ninterface UserCreator {\n    User create(String username, String password, String extraInfo);\n}\n\npublic class UserFactory {\n    private static final Map<String, UserCreator> CREATORS = new HashMap<>();\n    static {\n        register("customer", Customer::new);\n        register("manager", Manager::new);\n    }\n    public static void register(String role, UserCreator creator) {\n        CREATORS.put(role.toLowerCase(), creator);\n    }\n    public static User createUser(String role, String username, String password, String extraInfo) {\n        UserCreator creator = CREATORS.get(role.toLowerCase());\n        if (creator == null) throw new IllegalArgumentException("Invalid role: " + role);\n        return creator.create(username, password, extraInfo);\n    }\n}\n\n// adding Admin needs no change to createUser:\nUserFactory.register("admin", Admin::new);' },
          'The original switch must be edited for every new role (violates OCP). A registry map (or Spring-injected `Map<String, UserCreator>` of beans) lets new roles register themselves. Reflection is another option but is less type-safe.'
        ]
      },
      {
        heading: 'SkyBankAI: other problems and patterns (2025-26 Q4b)',
        items: [
          { type: 'table', head: ['Problem in the scenario', 'Pattern', 'Why it helps'], rows: [
            ['Repetitive logic for different user roles (if role equals ...)', 'Factory + polymorphism (abstract User)', 'One creation point and role-specific behaviour in subclasses: extensible, no controller edits (OCP)'],
            ['Payment methods handled by conditional statements', 'Strategy', 'Each method (card, bank transfer, wallet) implements `PaymentStrategy.pay()`; choose at runtime; add a method without touching existing code'],
            ['Hard-coded notification integrations (email, SMS, push)', 'Observer (or Strategy/Adapter behind an interface)', 'Publishers notify subscribed channels; add/remove channels without changing the core; adapters isolate vendor APIs'],
            ['Asynchronous workflows planned', 'Observer / event-driven messaging, Command', 'Decouple producers from consumers; queue work; easier scaling and retry']
          ] },
          'Format for each (3 marks): describe the specific problem, name the pattern, explain the improvement in extensibility, maintainability or modularity.',
          { type: 'code', text: 'interface PaymentStrategy { void pay(long amountCents); }\nclass CardPayment implements PaymentStrategy { public void pay(long c) { /* card gateway */ } }\nclass WalletPayment implements PaymentStrategy { public void pay(long c) { /* wallet */ } }\nclass Checkout {\n    private final PaymentStrategy strategy;\n    Checkout(PaymentStrategy strategy) { this.strategy = strategy; }\n    void complete(long cents) { strategy.pay(cents); }\n}' }
        ]
      },
      {
        heading: 'Pattern vs architectural style (2019)',
        items: [
          'An **architectural style** is a high-level organisation of a whole system (layered, client-server, microservices, pipe-and-filter, plugin). A **design pattern** is a lower-level solution to a recurring design problem inside a component (Factory, Observer, Singleton, Proxy).',
          'Example: a microservices architecture whose services internally use the Factory and Strategy patterns.'
        ]
      }
    ],
    pitfalls: [
      'Describing patterns in the abstract without writing or sketching the refactored classes.',
      'Keeping the if/else role switch inside the factory and calling it OCP-compliant.',
      'Changing behaviour while "refactoring".',
      'Forgetting to name the pattern when the question asks for it.'
    ]
  },

  {
    id: 'agile-vs-devops-sre',
    title: 'Agile vs DevOps, DevOps practices and SRE',
    priority: 28,
    tier: 'low',
    hint: 'unlikely',
    freq: 'hinted unlikely (Agile vs DevOps)',
    marks: '3-6 marks',
    summary: '**Agile = iterative development with customer feedback; DevOps = automation and collaboration between development and operations across delivery; SRE applies software engineering to operations with SLOs and error budgets.**',
    mnemonic: 'Agile builds the right thing in iterations; DevOps ships it reliably; SRE keeps it running',
    source: ['CT417_Notes_01b_Agile_DevOps', 'CT417_Notes_11a_Reliability_Monitoring', 'CT417_Notes_01a_SE_Revision'],
    sections: [
      {
        heading: 'Comparison',
        items: [
          { type: 'table', head: ['', 'Agile', 'DevOps', 'SRE'], rows: [
            ['Focus', 'Iterative development and customer feedback; shorter feedback loop', 'Automating delivery; collaboration and integration of dev and ops; whole process faster releases', 'Reliability, performance, scalability using software engineering on operations'],
            ['Practices', 'Sprints, backlog, stand-ups, retrospectives', 'CI/CD pipelines, Infrastructure as Code (Terraform, Ansible), monitoring and logging, shared ownership', 'SLIs/SLOs/SLAs, error budgets, toil reduction, blameless postmortems'],
            ['Gap it fills', 'Speeds development but stops short of deployment/maintenance', 'Fills the operations, infrastructure and automation gap Agile does not cover', 'Adds rigorous engineering to large-scale operations']
          ] },
          'DevOps = Development + Operations: a culture and practices integrating the two. DevOps engineer entry point is normally a software engineering role. Netflix and Spotify combine Agile with DevOps for continuous delivery and high availability.',
          'Benefits of Agile + DevOps: faster, more frequent delivery; better communication; fewer deployment errors; adapt to feedback; higher quality; shorter time to market.'
        ]
      }
    ],
    pitfalls: ['Presenting Agile and DevOps as competitors; they complement each other.']
  },

  {
    id: 'architecture-monolith-microservices',
    title: 'Software architecture: monolith, microservices, cohesion/coupling, ADRs',
    priority: 30,
    tier: 'low',
    hint: 'unlikely',
    freq: 'hinted unlikely (week 7 content); 2019 old syllabus architecture questions',
    marks: '4-8 marks',
    summary: '**Architecture is the structure of components and how they interact. Monoliths are simple to build and deploy but scale and change as one unit; microservices are independently deployable and scalable but add distributed complexity.**',
    mnemonic: 'Mono = one unit, Micro = many small independent services',
    source: ['CT417_Notes_07_Software_Architecture'],
    sections: [
      {
        heading: 'Concepts',
        items: [
          '**Software architecture**: the structure and organisation of a system\'s components and how they interact; the blueprint for functional and non-functional requirements. The right architecture makes systems scalable, maintainable and efficient.',
          '**High cohesion**: a class has a single, well-defined purpose (Single Responsibility, avoid "Swiss army knife" classes). **Loose coupling**: classes have limited dependencies, use abstractions, so internals can change without affecting others.',
          'Four views: **logical** (static design model), **process** (dynamic view), **physical** (mapping onto hardware), **development** (organisation of components in the development environment).'
        ]
      },
      {
        heading: 'Monolithic vs microservices',
        items: [
          { type: 'table', head: ['Aspect', 'Monolithic', 'Microservices'], rows: [
            ['Codebase', 'Single, unified', 'Multiple independent codebases'],
            ['Deployment', 'Single unit', 'Each service independently'],
            ['Scalability', 'Scale the whole system', 'Scale individual services (e.g. payment only)'],
            ['Technology', 'One stack', 'Different stacks per service'],
            ['Fault isolation', 'Failure can take everything down', 'Failures isolated'],
            ['Data', 'Usually shared database', 'Decentralised: each service owns its data'],
            ['Strengths', 'Simple development, easy deployment, easy debugging', 'Flexibility, scalability, fault isolation'],
            ['Weaknesses', 'Hard to scale parts, maintenance grows, tight coupling, slow risky deployments', 'Distributed-system complexity, operations and monitoring overhead']
          ] },
          'Netflix, Amazon and Uber moved to microservices for global scale. For small applications a monolith is often simpler.'
        ]
      },
      {
        heading: 'Architecture Decision Record (ADR)',
        items: [
          'A short document capturing an architectural decision and its context, visible to developers and stakeholders, revealing the motivation behind decisions.',
          'Nygard format: **Title, Context, Decision, Status, Consequences**.'
        ]
      }
    ],
    pitfalls: ['Claiming microservices are always better; state the trade-offs.']
  },

  {
    id: 'serverless-faas',
    title: 'Serverless and Function-as-a-Service',
    priority: 31,
    tier: 'low',
    hint: 'unlikely',
    freq: 'week 8; hinted unlikely (architecture)',
    marks: '3-6 marks',
    summary: '**Serverless: the provider runs the servers and you write code; FaaS deploys short stateless event-triggered functions with automatic scaling and pay-per-use billing; the main drawback is cold-start latency.**',
    mnemonic: 'Events trigger, Auto-scale, Pay per use; fight cold starts with small packages and provisioned concurrency',
    source: ['CT417_Notes_08c_Serverless_FaaS'],
    sections: [
      {
        heading: 'Definitions and features',
        items: [
          '**Serverless**: the developer focuses on code; the cloud provider manages infrastructure (servers still exist). **FaaS** is a subset: small, stateless, short-lived functions run in response to events. Examples: AWS Lambda, Azure Functions, Google Cloud Functions.',
          'Four principles: event-driven execution; automatic scaling; no server management; on-demand billing (no cost when idle).',
          'FaaS components: function, event source, FaaS provider, execution environment, scaling mechanism, invocation (sync/async), monitoring and logging, external state/storage.',
          { type: 'table', head: ['Aspect', 'Traditional', 'Serverless'], rows: [['Infrastructure', 'Managed by developers', 'Managed by provider'], ['Scaling', 'Manual/pre-configured', 'Automatic'], ['Billing', 'Allocated resources', 'Per execution'], ['State', 'Can keep in process', 'Stateless: external storage'], ['Cold start', 'Usually long-running', 'Possible startup delay']] },
          'Microservices suit steady APIs and complex domains (you manage the platform); serverless suits event-driven, bursty glue code.'
        ]
      },
      {
        heading: 'Cold start',
        items: [
          'A cold start is the delay when no warm environment is ready: first call after deployment or inactivity, scaling from zero, host change, expired instance. Cost: latency from milliseconds to seconds, reduced throughput in bursts, variability.',
          'Mitigation: lighter runtimes (Python/Node over Java/.NET), small package, remove unused dependencies, keep shared data outside handlers, cache; keep warm by scheduled invocation (costs); **provisioned concurrency**; SnapStart.',
          'Architecture components: functions, API gateway (routing, authentication, throttling), event sources, data storage, managed authentication, third-party services.',
          'Drawbacks: monitoring, security and debugging complexity; platform lock-in; shared security responsibility.'
        ]
      }
    ],
    pitfalls: ['Saying there are no servers; the provider runs them.']
  },

  {
    id: 'sdlc-software-basics',
    title: 'Software, SDLC, functional vs non-functional, frameworks (week 1)',
    priority: 34,
    tier: 'low',
    hint: 'unlikely',
    freq: 'hinted unlikely (SDLC, definitions)',
    marks: '2-4 marks',
    summary: '**Software = instructions + data structures + documentation; it is engineered not manufactured and does not wear out. SE builds large systems by teams using process, methods and tools.**',
    mnemonic: 'Software = Instructions + Data + Docs',
    source: ['CT417_Notes_01a_SE_Revision', 'CT417_Notes_00_Module_Overview'],
    sections: [
      {
        heading: 'Key definitions',
        items: [
          '**Software** (textbook): (I) instructions that when executed provide desired features, function and performance; (II) data structures that let programs manipulate information; (III) descriptive information (hard copy and virtual) describing operation and use. Types: commercial, open-source, freeware, shareware, SaaS.',
          'Software is a logical not physical component, is developed/engineered (not manufactured), does not wear out, is built from abstract logic, and must meet functional and non-functional requirements.',
          'Ariane 5 failure: a 64-bit number crammed into a 16-bit space caused overflow that crashed primary and backup computers (same software); cost nearly $8b with a $500m payload; software reused from Ariane 4 where it worked. Lesson: need resilient, correct software and re-validation when reusing.',
          '**Software engineering**: the field of CS dealing with building systems so large or complex they are built by teams (Ghezzi); a process, a collection of methods and an array of tools for high-quality software (Pressman). DevOps = software engineering + IT operations.',
          '**SDLC**: the process used to design, develop and test software; many approaches (waterfall, agile, etc.), each focusing on a different aspect from planning to continuous improvement.',
          '**Framework**: an abstraction where common code providing generic functionality can be selectively overridden or specialised by user code (Spring Boot, Django, React, Angular, Flask, TensorFlow). **Low-code/no-code**: build applications with GUIs and embedded functions with little or no hand-written code.'
        ]
      },
      {
        heading: 'Module facts',
        items: [
          'Assessment: continuous assessment 30% (individual weekly checkpoints WK02-WK11, PetClinic) and final exam 70% (2 hours, weeks 1-12). Weekly topics: WK01 overview, WK02 Git, WK03 requirements and change, WK04 build and CI, WK05 containers, WK06 DevSecOps, WK07 architecture, WK08 APIs, WK09 testing and TDD, WK10 quality and technical debt, WK11 reliability and observability.'
        ]
      }
    ],
    pitfalls: ['Spending time on definitions the lecturer flagged as unlikely.']
  },

  {
    id: 'legacy-topics',
    title: 'Legacy topics in older papers (Z notation, architecture styles, virtualisation, web security)',
    priority: 35,
    tier: 'low',
    hint: 'unlikely',
    freq: '2019-2023 papers only; not in the current notes',
    marks: '5-20 marks (old papers)',
    summary: '**The 2019-2023 papers asked topics no longer in the current notes: Z formal specification, architectural styles, hypervisors and VirtualBox networking, CAP/ACID/BASE, cookies/XSS/SQL injection/hashing. A brief safety-net summary.**',
    mnemonic: 'Old syllabus: Z, styles, VMs, CAP, cookies/XSS. New syllabus: DevOps toolchain',
    source: ['CT417_Exam_2019-2020_1_1_5', 'CT417_Exam_2021-2022_1_1_5', 'CT417_Exam_2023-2024_1_1_5', 'CT417_Exam_2023-2024_1_2_3'],
    sections: [
      {
        heading: 'Why this is here',
        items: [
          { type: 'warn', text: 'These topics are not in the CT417 notes provided and the lecturer says the exam is from weeks 1-12 of the current notes. Revise only if everything else is done.' }
        ]
      },
      {
        heading: 'Formal specification with Z',
        items: [
          'Formal specification precisely and mathematically describes requirements/behaviour. Advantages: removes ambiguity; allows reasoning and proof of properties; finds errors early; basis for systematic testing; improves understanding.',
          'Notation: P X power set; `X -> Y` total function; `X +-> Y` partial function; `X -» Y` surjective function (every element of Y is the image of some x: ran f = Y); `dom`, `ran`; `#S` size; `U` union; `\\` set difference; `(+)` function override; primes (x\') mean after state; `?` input; `!` output; `Delta S` operation changes state S; `Xi S` state unchanged.',
          'Surjective example: f : {1,2,3} -» {a,b} with f = {1 |-> a, 2 |-> b, 3 |-> a}. ran f = {a,b} so it is surjective.',
          'Cursor (terminal display): state: line : 1..numLines, column : 1..numColumns. Init: line\' = 1 and column\' = 1. DownKeyNormal: Delta Cursor, precondition line < numLines, line\' = line + 1, column\' = column. DownKeyAtBottom: Xi Cursor with precondition line = numLines (cursor stays). Full behaviour: DownKey = DownKeyNormal or DownKeyAtBottom (schema disjunction).',
          'Train booking: state: booked : P PERSON, #booked <= trainCapacity. Init: booked = {}. Book: Delta TrainBooking, p? : PERSON, p? not in booked, #booked < trainCapacity, booked\' = booked U {p?}. Cancel: p? in booked, booked\' = booked \\ {p?}.',
          'Supermarket: state: carried : P ITEM; level : ITEM +-> N; dom level = carried (every carried item has a level, nothing else does). Init: carried = {} and level = {}. Buy: Delta SupermarketItems, item? in carried, qty? : N, qty? <= level(item?), level\' = level (+) {item? |-> level(item?) - qty?}, carried\' = carried.'
        ]
      },
      {
        heading: 'Architecture, virtualisation, cloud, CAP',
        items: [
          'Architectural styles: layered (layers with a purpose; an open layer may be bypassed), client-server, pipe-and-filter, microkernel/plugin architecture, microservices. Monolithic kernel (all OS services in kernel space) vs microkernel (minimal kernel, services in user space; more modular, safer, but IPC overhead).',
          'IaaS (rented VMs/storage/network, e.g. need for raw compute), PaaS (platform to deploy code, e.g. developers wanting no server management), SaaS (finished application, e.g. email/CRM users).',
          'Type 1 hypervisor runs directly on hardware (bare metal); Type 2 runs on a host OS (VirtualBox). Host = physical machine; guest = VM. Virtual appliance = pre-built VM image. Docker = OS-level containers sharing the host kernel.',
          'VirtualBox networking: NAT (guest behind host NAT, can reach out, not reachable from outside), Bridged adapter (guest appears as own device on the physical LAN with its own IP), NAT network (several guests share one NAT network and can talk to each other and out).',
          '**CAP theorem**: a distributed store cannot guarantee all of Consistency, Availability and Partition tolerance at once; under a partition choose C or A. **ACID** (atomicity, consistency, isolation, durability) favours consistency; **BASE** (basically available, soft state, eventually consistent) favours availability.',
          'Proxy vs callback object pitfalls: stale/inconsistent state, network failure/latency (remote call can fail), identity and equality problems (proxy is not the real object).'
        ]
      },
      {
        heading: 'Secure by design (2021)',
        items: [
          'Cookies for login, shop basket and forum: session cookie holding a random session id (not user data), flags `Secure` (HTTPS only), `HttpOnly` (not readable by JavaScript), `SameSite` (CSRF), `Path`, `Domain`, `Expires/Max-Age`. Lifecycle: set via `Set-Cookie` on login, sent with every request, refreshed/expired on timeout, destroyed on logout.',
          '**Reflected XSS**: script in a crafted link parameter echoed straight back by the server and run in the victim\'s browser. **Persistent (stored) XSS**: script saved (forum post) and served to every viewer. Outcomes: session cookie theft/hijack, defacement, phishing, actions as the victim. Hardening: output encoding, input validation, CSP, HttpOnly cookies.',
          '**SQL injection**: input like `\' OR \'1\'=\'1` alters the query to bypass login or dump/modify credentials; prevent with prepared statements, least-privilege DB accounts, validation.',
          'Password hashing: store salted slow hashes (bcrypt, Argon2, PBKDF2), never plain text. Good hash: deterministic, pre-image resistant (one-way), collision resistant, avalanche effect. **Dictionary attack**: hash common passwords and compare with leaked hashes; defend with salts, slow hashing, rate limiting and strong password policy.'
        ]
      }
    ],
    pitfalls: ['Prioritising this over the hinted topics.']
  }
];
