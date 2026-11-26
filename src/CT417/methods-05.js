module.exports = [
  {
    id: 'classify-docker-failure',
    topicId: 'docker-commands-troubleshooting',
    title: 'Classify and fix a Docker failure',
    when: 'Given a symptom (build error, exited container, unreachable app) and asked to diagnose and fix',
    mnemonic: 'B-I-S-C-N-A: Build, Image, Startup, Configuration, Network, Application',
    steps: [
      '1. Decide which stage failed: docker build (BUILD) or docker run.',
      '2. If it runs: docker ps. Not listed? docker ps -a, then docker logs <name>.',
      '3. Exited: check startup command, missing artefact, runtime version, missing config (env var), app crash.',
      '4. Running but unreachable: check internal port, -p HOST:CONTAINER mapping, app logs, is it listening.',
      '5. Name the category (BUILD, IMAGE, STARTUP, CONFIGURATION, NETWORK/PORT MAPPING or APPLICATION) before touching source code.',
      '6. Apply the smallest fix, rebuild, rerun and verify with an HTTP request.'
    ],
    example: {
      problem: 'docker run -d -p 8080:8080 my-app; docker ps shows nothing. Logs: "Error: Unable to access jarfile app.jar". Diagnose and fix.',
      solution: [
        'docker ps -a shows STATUS Exited (1): the container started and stopped, so it is a STARTUP problem.',
        'docker logs my-app: ENTRYPOINT ["java","-jar","app.jar"] cannot find the JAR in /app.',
        'Cause (missing artefact): the JAR was never built, or it is named my-app-1.0.jar so COPY target/app.jar app.jar did not match.',
        'Fix: ./mvnw clean package, ls target to get the real name, correct the COPY line, docker build -t my-app ., docker run again.',
        'Verify: docker ps, docker logs my-app, curl http://localhost:8080/ responds.'
      ]
    }
  },
  {
    id: 'jacoco-gap-decision',
    topicId: 'jacoco-coverage',
    title: 'Interpret a JaCoCo gap and decide what to do',
    when: 'Given a coverage percentage or report and asked whether to add tests',
    mnemonic: 'Locate, Question, Decide, Re-run',
    steps: [
      '1. Run the tests first (mvn clean test) and fix failures; open target/site/jacoco/index.html.',
      '2. Drill down summary, package, class, method, source; find ONE gap (red or yellow).',
      '3. Ask the four questions: requirement/failure mode, business impact, already tested elsewhere, test gap vs smell vs debt.',
      '4. Choose: add a test for an agreed rule, refactor, or no change (a justified no-change is valid).',
      '5. Re-run and compare the SAME counter at the same level before and after; record what did not change.'
    ],
    example: {
      problem: 'Exam Registry reports 85% instruction and 85% branch coverage. recordScore leaves one branch missed. What do you do?',
      solution: [
        'The percentage alone does not say whether it is good; locate the gap: the recordScore branch for a score outside 0-100.',
        'Requirement: valid scores are in the inclusive range 0-100; outside must be rejected. Impact: invalid grades could be stored, so it matters.',
        'Add a test: -1 and 101 are rejected (and 0 and 100 accepted as boundaries).',
        'Re-run and compare branch coverage before and after. If instruction coverage rose (e.g. 86% to 96%) but branches stay at 18/20 = 90%, say so honestly and investigate the other missed branch rather than inventing rules.'
      ]
    }
  }
];
