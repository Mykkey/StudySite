const c = (id, topicId, front, back, hook) => (hook ? { id, topicId, front, back, hook } : { id, topicId, front, back });
module.exports = [
  // dockerfile (lecturer's step sequence and checklist)
  c('df-s1', 'dockerfile', 'Does a successful docker build prove the app works?', 'No. It only proves Docker could execute the instructions. Run, ps, logs, port mapping, HTTP request to verify.'),
  c('df-s2', 'dockerfile', 'What does the final "." in docker build -t my-app . mean?', 'Use the current directory as the build context.'),
  c('df-s3', 'dockerfile', 'COPY target/app.jar app.jar: what are the two sides?', 'Left = path inside the build context (host); right = location inside the image (relative to WORKDIR).'),
  c('df-s4', 'dockerfile', 'Why can COPY fail even with correct syntax?', 'The source is not inside the build context (built from the wrong directory, JAR not built, or excluded by .dockerignore).'),
  c('df-s5', 'dockerfile', 'Is .dockerignore a substitute for secret management?', 'No. It reduces context size and the chance of leaking .env, but secrets must be supplied at runtime.'),
  c('df-s6', 'dockerfile', 'Which question does each Dockerfile instruction answer?', 'FROM: which runtime? WORKDIR: where does the app live? COPY: which artefact? EXPOSE: which internal port? ENTRYPOINT: which process starts?', 'F-W-C-E-E'),
  c('df-s7', 'dockerfile', 'RUN versus ENTRYPOINT/CMD?', 'RUN executes at image build time; ENTRYPOINT/CMD define what runs when the container starts.'),
  c('df-s8', 'dockerfile', 'Option A vs Option B for building the JAR?', 'A: build outside Docker (host/CI) then COPY the JAR. B: multi-stage build inside Docker, copy only the JAR to a runtime stage.'),
  c('df-s9', 'dockerfile', 'Is -DskipTests a universal Docker rule?', 'No, it is a pipeline decision. Ask: where in our delivery process is correctness verified?'),
  c('df-s10', 'dockerfile', 'Layer-cache rule for Dockerfile order?', 'Put relatively stable inputs (pom.xml, dependencies) before frequently changing ones (src). COPY . . before RUN mvn package invalidates the cache.'),
  c('df-s11', 'dockerfile', 'Dockerfile workflow in five words?', 'Inspect, derive, build, run, verify.'),
  c('df-s12', 'dockerfile', 'Typical startup evidence for Spring Boot / Node / Flask?', 'Spring Boot: pom.xml, JAR, java -jar. Node: package.json, npm start or node. Flask: requirements.txt, python or app server command.'),
  c('df-s13', 'dockerfile', 'Why is the base-image tag an engineering dependency?', 'It defines the execution environment (runtime version). Do not copy a FROM line from Stack Overflow or use :latest.'),
  // troubleshooting
  c('dt-s1', 'docker-commands-troubleshooting', 'Name the six categories a Docker problem falls into.', 'BUILD, IMAGE, STARTUP, CONFIGURATION, NETWORK/PORT MAPPING, APPLICATION. Classify before rewriting source.', 'B-I-S-C-N-A'),
  c('dt-s2', 'docker-commands-troubleshooting', 'Container exits immediately: first commands and causes?', 'docker ps -a, docker logs. Causes: wrong startup command, missing artefact, incompatible runtime, missing configuration, app startup failure.'),
  c('dt-s3', 'docker-commands-troubleshooting', 'Container running but app unreachable: what to check?', 'Internal listening port, -p HOST_PORT:CONTAINER_PORT mapping, application logs, whether the service is actually listening.'),
  c('dt-s4', 'docker-commands-troubleshooting', 'The verification chain after docker run?', 'Image exists, container remains running (docker ps), docker logs, port mapping, HTTP request, application responds.'),
  // jacoco
  c('jc-s1', 'jacoco-coverage', 'Three ideas of JaCoCo in the lecture?', 'Instrumentation (bytecode tracks execution), reporting (instruction, line, branch, complexity), interpretation (high % does not prove requirement checked).', 'I-R-I'),
  c('jc-s2', 'jacoco-coverage', 'Four questions to ask about a coverage gap?', 'Which requirement/failure mode? Would a miss break important business behaviour? Already tested elsewhere? Missing test, maintainability issue, or not worth action?'),
  c('jc-s3', 'jacoco-coverage', 'Missing test vs code smell vs technical debt?', 'Missing test: uncovered documented rule. Smell: duplication, long method, coupling. Technical debt: design trade-off with ongoing cost.'),
  c('jc-s4', 'jacoco-coverage', 'Why can instruction coverage rise while branch coverage stays the same?', 'Added tests may run more instructions but not the missed branch outcomes (slide: 86% to 96% instruction, branch still 90%, 2 of 20 missed).'),
  c('jc-s5', 'jacoco-coverage', 'Exam Registry score rule used in the JaCoCo practical?', 'Valid scores are the inclusive range 0-100; outside it must be rejected.'),
  c('jc-s6', 'jacoco-coverage', 'JaCoCo versions in the practicals?', 'Exam Registry: JUnit Jupiter 5, JaCoCo 0.8.11. PetClinic: JUnit 4-style tests, JaCoCo 0.8.2 (./mvnw --batch-mode clean verify).'),
  // sre
  c('sre-s1', 'sli-slo-sla-error-budget', 'What is "engineering bankruptcy"?', 'Toil takes an unmanageable share of capacity, leaving none to reduce toil or improve the business.'),
  c('sre-s2', 'sli-slo-sla-error-budget', 'Slide example: 720 h month, 1.44 h downtime, SLO 99.9%?', 'SLI = 99.8%. Allowed downtime 0.72 h (43.2 min). 1.44 h exceeds it, so the SLO is not met.'),
  // unit testing
  c('ut-s1', 'unit-testing-junit', 'What is a domain primitive (EmailAddress)?', 'A value object for an important domain concept that validates itself on construction, so invalid values cannot exist.'),
  c('ut-s2', 'unit-testing-junit', 'EmailAddress boundary lengths in the slides?', 'Accept exactly 15 and exactly 77 chars; reject 14 chars, 65-char local part, multiple @, wrong domain, subdomain, leading/trailing dot, more than one dot.'),
  // requirements
  c('rq-s1', 'req-change-management', 'Name the two lanes from request to engineering evidence.', 'Requirements maturity: raw request, clarified requirement, ready for engineering. Evidence: Issue, Pull Request, implementation, test, evidence (history, checks, traceability).'),
  c('rq-s2', 'req-change-management', 'Can an urgent change be not ready?', 'Yes. Priority (urgency) and readiness are different concerns.')
];
