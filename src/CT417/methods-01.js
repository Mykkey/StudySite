module.exports = [
  {
    id: 'write-good-requirements',
    topicId: 'req-attributes',
    title: 'Write or critique requirements using the attributes',
    when: 'Asked for attributes of good requirements, to improve a vague requirement, or to write requirements for a scenario',
    mnemonic: 'U-C-N-V-F-C-T and WHAT not HOW',
    steps: [
      '1. State assumptions first (2-3 bullets) if the scenario is vague.',
      '2. List 6+ attributes, each with a one-line meaning (unambiguous, complete, necessary, verifiable, feasible, consistent, traceable, solution-neutral).',
      '3. Identify the stakeholders affected.',
      '4. Split FR and NFR; make every NFR measurable (number + condition).',
      '5. Rewrite each vague line as "The system shall ..." or a user story with conditions of satisfaction.',
      '6. Check each rewritten line against the attributes: who tests it, how, is it traceable to a stakeholder need?'
    ],
    example: {
      problem: 'Veterinary clinic: "The booking system should be fast and user friendly and remember pets." Improve it.',
      solution: [
        'Assumptions: reception staff are the main users; peak load is 20 concurrent users; pet records already exist.',
        'Problems: "fast" and "user friendly" are ambiguous and unverifiable; "remember pets" is incomplete and mixes several needs.',
        'FR-1: A receptionist shall be able to book an appointment by selecting an existing pet, a vet and a free 15-minute slot.',
        'FR-2: The system shall prevent two appointments for the same vet and slot (consistent, verifiable by test).',
        'NFR-1: 95% of booking requests shall complete within 2 seconds with 20 concurrent users (measurable).',
        'NFR-2: A new receptionist shall complete a booking in under 3 minutes after 10 minutes of training (usability, testable).',
        'Story: As a receptionist I want to book a visit for a pet so that owners get a confirmed time. Conditions: 1.1 slot shown as taken afterwards; 1.2 owner gets an SMS (D).'
      ]
    }
  },
  {
    id: 'agile-scenario-answer',
    topicId: 'agile-manifesto',
    title: 'Answer an Agile Manifesto / principles scenario question',
    when: 'Q1a: describe the Manifesto, choose a principle to solve a scenario problem, propose solutions or steps',
    mnemonic: 'Values, Principle, Apply, Evidence (VPAE)',
    steps: [
      '1. One sentence: what Agile and the Manifesto are (iterative, customer feedback, adapt).',
      '2. State the 4 values (X over Y) if asked to describe the manifesto.',
      '3. Pick the principle that matches the problem (changing requirements = 2; collaboration = 4; frequent value = 1 or 3; quality = 9; team = 5 or 11; improvement = 12).',
      '4. Quote it in your own words in one line.',
      '5. Give concrete actions in the scenario: backlog, sprint length, demos, tests, CI, stand-ups, product owner.',
      '6. Close with the outcome (what improves).'
    ],
    example: {
      problem: 'A veterinary clinic extends its software with online booking. Owners and vets keep changing what they want, causing rework. Use ONE principle and give TWO solutions (6 marks).',
      solution: [
        'Principle 2: welcome changing requirements, even late in development; Agile harnesses change for the customer\'s advantage.',
        'Solution 1: keep a prioritised product backlog owned by the head vet (product owner); re-order it at every sprint planning so new requests are slotted into the next 2-week sprint rather than disrupting the current one.',
        'Solution 2: end each sprint with a demo of working software (e.g. the booking form) to vets and reception, collecting feedback that becomes new backlog items; combine with automated tests and CI so changes are cheap and safe.',
        'Outcome: change is absorbed in small increments, wrong assumptions are found within 2 weeks, and rework falls.'
      ]
    }
  },
  {
    id: 'change-request-answer',
    topicId: 'req-change-management',
    title: 'Handle a change request (requirements and change management answer)',
    when: 'Q1: a customer asks for a change; describe how you capture, assess, approve and implement it, stating assumptions',
    mnemonic: 'A-S-C-I-D-I-V-T: Assume, Stakeholders, Clarify, Impact, Decide, Implement, Verify, Trace',
    steps: [
      '1. Assumptions: who approves, existing system, constraints.',
      '2. Stakeholders and their concerns.',
      '3. Clarify: restate the request as a requirement, user story, acceptance criteria and open questions; check attributes of good requirements.',
      '4. Impact analysis: affected requirements, components, tests, effort, risk, compatibility (additive or breaking).',
      '5. Decision by the change authority; record priority and readiness separately; record rationale.',
      '6. Implement via an issue, feature branch and pull request with review.',
      '7. Verify with tests (including regression); update docs.',
      '8. Trace: link issue, PR, tests and release; keep history.'
    ],
    example: {
      problem: 'The vet clinic asks: "staff must see only one pet\'s visits instead of the whole list" (change request CR-02). Describe how you manage it.',
      solution: [
        'Assumptions: the head vet is the change authority; the current visit list endpoint must keep working; pet ids are numeric.',
        'Stakeholders: reception (daily use), vets (history), owners (indirect), developers.',
        'Requirement: callers can retrieve visits for a specified pet while full-list behaviour remains. Criteria: petId given returns only that pet\'s visits; no petId returns the full list; unknown pet returns 404 (open question to confirm).',
        'Impact: one controller parameter, service method, repository query, 4 tests, API docs; additive and non-breaking; estimate 1 day, low risk.',
        'Decision: approved, priority High, status Ready once the unknown-pet question is answered (urgent is not the same as ready).',
        'Implement: GitHub issue, branch feature/visits-by-pet, PR with review. Verify: unit and API tests, CI green. Trace: issue linked to PR and tests; release notes updated.'
      ]
    }
  },
  {
    id: 'git-command-sequence',
    topicId: 'git-commands',
    title: 'Write the Git commands for a task and explain each',
    when: 'Asked for the sequence of git commands (e.g. commit a feature, merge it) with reasoning',
    mnemonic: 'SACP-M: Status, Add, Commit, Push, then Merge',
    steps: [
      '1. Check where you are: `git status` (and `git branch`).',
      '2. Stage: `git add <files>` or `git add .`.',
      '3. Commit with a quoted message: `git commit -m "..."`.',
      '4. Integrate others\' work: `git pull` (or `git pull --rebase`) and fix conflicts.',
      '5. Publish: `git push origin <branch>` (`-u` the first time).',
      '6. To merge: `git checkout main`, `git pull`, `git merge <feature>`, `git push`.',
      '7. After each command add a one-line reason (marks are for the reasoning).'
    ],
    example: {
      problem: 'Write the commands to: check status, add all, commit "Implemented new feature", push to remote feature-branch, merge feature-branch into main.',
      solution: [
        '`git status`: see changed/untracked files and current branch.',
        '`git add .`: stage all changes for the commit.',
        '`git commit -m "Implemented new feature"`: save the staged snapshot to the local repository.',
        '`git push origin feature-branch`: upload the commits to the remote feature branch.',
        '`git checkout main`: switch to the branch that receives the merge.',
        '`git pull origin main`: make sure main is up to date.',
        '`git merge feature-branch`: bring the feature commits into main.',
        '`git push origin main`: publish the merged main.'
      ]
    }
  },
  {
    id: 'git-diagnose-command',
    topicId: 'git-commands',
    title: 'Given a command or error: identify the problem and fix it',
    when: '"Given this command / output, identify the problem and how to solve it"',
    mnemonic: 'READ-NAME-FIX: read the message, name the cause, give the exact fix and prevention',
    steps: [
      '1. Read the exact command and output; note branch, remote, flags and quoting.',
      '2. Name the cause in one sentence (wrong branch, nothing staged, remote ahead, no upstream, conflict, quoting).',
      '3. Give the exact corrective commands in order.',
      '4. Say how to verify (`git status`, `git log --oneline`).',
      '5. Add prevention (pull before push, short branches, branch protection).'
    ],
    example: {
      problem: 'A developer on branch feature-x runs `git merge feature-x` then `git push` and the push fails with "rejected: non-fast-forward, fetch first". The feature never reached main. Explain and fix.',
      solution: [
        'Problem 1: `git merge feature-x` while ON feature-x merges the branch into itself ("Already up to date"), so main is untouched. Merge goes INTO the current branch.',
        'Problem 2: the push is rejected because the remote branch has commits the local branch lacks.',
        'Fix: `git pull --rebase origin feature-x` (resolve conflicts if any), `git push origin feature-x`.',
        'Then: `git checkout main`, `git pull origin main`, `git merge feature-x`, `git push origin main` (or open a pull request).',
        'Verify: `git log --oneline --graph` shows the feature commits on main.',
        'Do not use `git push --force`: it can erase teammates\' commits.'
      ]
    }
  },
  {
    id: 'resolve-merge-conflict',
    topicId: 'git-merge-conflicts',
    title: 'Resolve a merge conflict step by step',
    when: 'Merge issue and how to resolve; given conflict markers in a file',
    mnemonic: 'PEACE: Pull, Edit markers, Add, Commit, Examine',
    steps: [
      '1. Run the merge/pull; read "CONFLICT (content)" and `git status` (both modified).',
      '2. Open each conflicted file; understand both sides (HEAD = yours, below ======= = incoming).',
      '3. Decide the correct final code (ours, theirs or combined); delete all markers.',
      '4. Compile and run tests.',
      '5. `git add <file>` for each resolved file.',
      '6. `git commit` to complete the merge, then `git push`.',
      '7. Abort option: `git merge --abort`.'
    ],
    example: {
      problem: 'Two developers edited Pen.java. The file contains: <<<<<<< HEAD / private float length; / ======= / private short length; / >>>>>>> feature/pen-size. Resolve it.',
      solution: [
        'Both sides change the type of `length`: a semantic (type 2) conflict.',
        'Ask which the requirements need: pen lengths are decimal (5.5 cm), so choose `float` (keep HEAD); `short` would truncate.',
        'Edit the file to contain only `private float length;` and update any method from the other branch (e.g. `setLen(float l)`).',
        'Run `mvn test`; fix compile errors from the other branch\'s `short` usage.',
        'Commands: `git add Pen.java`, `git commit -m "Resolve length type conflict (float)"`, `git push origin feature/pen-size`.',
        'Prevention: agree data types in the issue/PR before editing shared classes; pull main daily.'
      ]
    }
  },
  {
    id: 'write-pom',
    topicId: 'pom-xml',
    title: 'Write a pom.xml from a description',
    when: 'Asked to write or complete a pom for a Java project with given dependencies/plugins',
    mnemonic: 'M-G-A-V-P-D-B',
    steps: [
      '1. `<project>` with modelVersion 4.0.0.',
      '2. Coordinates: groupId, artifactId, version, packaging.',
      '3. Properties: Java version (maven.compiler.source/target or java.version) and source encoding.',
      '4. Dependencies: each with GAV and scope (test for JUnit/Mockito).',
      '5. Build plugins: surefire for tests, jacoco (prepare-agent + report), plus packaging plugin if asked.',
      '6. State the commands: `mvn clean package`, `mvn test`, the output path in target/.'
    ],
    example: {
      problem: 'Write a pom for vet-clinic 1.0.0 (jar, group ie.clinic), Java 17, JUnit 5 and Mockito for tests, JaCoCo report.',
      solution: [
        '`<modelVersion>4.0.0</modelVersion>`',
        '`<groupId>ie.clinic</groupId> <artifactId>vet-clinic</artifactId> <version>1.0.0</version> <packaging>jar</packaging>`',
        '`<properties><maven.compiler.source>17</maven.compiler.source><maven.compiler.target>17</maven.compiler.target></properties>`',
        '`<dependency>` junit-jupiter 5.10.2, `<scope>test</scope>`',
        '`<dependency>` mockito-core 5.11.0, `<scope>test</scope>`',
        '`<plugin>` jacoco-maven-plugin 0.8.11 with executions `prepare-agent` and `report` (phase test).',
        'Run: `mvn clean test` builds, runs tests, writes target/site/jacoco/index.html; `mvn package` writes target/vet-clinic-1.0.0.jar.',
        'Full file is in the "pom.xml anatomy" topic.'
      ]
    }
  },
  {
    id: 'write-spring-boot-pom',
    topicId: 'spring-boot',
    title: 'Write a Spring Boot pom and explain the project structure',
    when: 'Q2 Spring Boot version of the pom question',
    mnemonic: 'Parent, Starters, Plugin',
    steps: [
      '1. `<parent>` spring-boot-starter-parent with a version (no relativePath issues: `<relativePath/>`).',
      '2. Your own groupId/artifactId/version.',
      '3. `<properties><java.version>17</java.version>`.',
      '4. Starters without versions: web, data-jpa, actuator, test (scope test).',
      '5. `spring-boot-maven-plugin` in build.',
      '6. Explain layout: main class with @SpringBootApplication in the root package; controller, service, repository, model packages; application.properties.',
      '7. Run with `mvn spring-boot:run` or `java -jar target/*.jar`.'
    ],
    example: {
      problem: 'Create the pom and explain the structure for a vet-api REST service using JPA and monitoring.',
      solution: [
        '`<parent>` org.springframework.boot : spring-boot-starter-parent : 3.2.5 (supplies versions and plugin defaults).',
        'Dependencies: spring-boot-starter-web (REST + Tomcat), spring-boot-starter-data-jpa (database), spring-boot-starter-actuator (health/metrics), spring-boot-starter-test (test scope).',
        'Plugin: spring-boot-maven-plugin builds an executable JAR.',
        'Structure: VetApiApplication (@SpringBootApplication) in ie.clinic; VisitController (@RestController) calls VisitService (@Service) calls VisitRepository (extends JpaRepository); Visit is an @Entity.',
        'Config: server.port=8080 and management.endpoints.web.exposure.include=health,info in application.properties.',
        'Run: `mvn spring-boot:run`; Dockerfile later copies target/vet-api-0.0.1-SNAPSHOT.jar.'
      ]
    }
  }
];
