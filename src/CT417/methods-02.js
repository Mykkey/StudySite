module.exports = [
  {
    id: 'write-dockerfile',
    topicId: 'dockerfile',
    title: 'Construct and write a Dockerfile (steps and instructions)',
    when: 'Q3: write a Dockerfile for a given application, or describe the steps to construct one',
    mnemonic: 'F-W-C-R-E-E: FROM, WORKDIR, COPY, RUN, EXPOSE, ENTRYPOINT',
    steps: [
      '1. Inspect: what build system (pom.xml / package.json) and what artefact does it produce?',
      '2. Pick the runtime base image matching the version (Java 17 gives eclipse-temurin:17-jre); avoid latest.',
      '3. FROM then WORKDIR /app.',
      '4. COPY the artefact (or, for multi-stage, copy pom.xml, resolve dependencies, copy src, RUN build).',
      '5. EXPOSE the application port; read config from environment variables, no secrets in ENV.',
      '6. ENTRYPOINT in exec form with the start command.',
      '7. Add .dockerignore; then `docker build -t name .` and verify with run, ps, logs, curl.',
      '8. Explain each line in one phrase.'
    ],
    example: {
      problem: 'Write a Dockerfile for the Spring Boot vet-api (Java 17, Maven, listens on 8080) that builds inside Docker, and give the build/run commands.',
      solution: [
        '`FROM maven:3.9-eclipse-temurin-17 AS build`: stage 1 image with JDK and Maven to build.',
        '`WORKDIR /workspace`: build directory in the image.',
        '`COPY pom.xml .` then `RUN mvn dependency:go-offline`: cache dependencies in their own layer.',
        '`COPY src ./src` then `RUN mvn clean package -DskipTests`: compile and package the JAR (tests run in CI).',
        '`FROM eclipse-temurin:17-jre`: stage 2 small runtime image, JRE only.',
        '`WORKDIR /app` and `COPY --from=build /workspace/target/vet-api.jar app.jar`: take just the JAR.',
        '`EXPOSE 8080`: document the port.',
        '`ENTRYPOINT ["java", "-jar", "app.jar"]`: command run at container start.',
        'Commands: `docker build -t vet-api .`, `docker run -d --name vet-api -p 8080:8080 -e DB_PASSWORD="$DB_PASSWORD" vet-api`, `docker ps`, `docker logs vet-api`, `curl http://localhost:8080/actuator/health`.',
        '.dockerignore: target/, .git, .idea, *.log, .env.'
      ]
    }
  },
  {
    id: 'docker-troubleshoot',
    topicId: 'docker-commands-troubleshooting',
    title: 'Troubleshoot a Docker build/run/deploy failure',
    when: 'Part 2 of the Docker question: a container does not start/run, or a pull/push fails; give commands and fix',
    mnemonic: 'PLIE: ps -a, logs, inspect, exec',
    steps: [
      '1. Classify: build time, start time, network/port, registry (pull/push).',
      '2. `docker ps -a`: is it running, or Exited with which code?',
      '3. `docker logs <name>` (add `--tail 50`): read the actual error.',
      '4. `docker inspect <name>` for ports, env, mounts, OOMKilled; `docker exec -it <name> /bin/sh` to look inside.',
      '5. Check the port mapping HOST:CONTAINER and that the app binds to 0.0.0.0.',
      '6. For registry errors check tag exists (`docker manifest inspect`), login and permissions.',
      '7. Fix the root cause (Dockerfile, env, command, tag), rebuild/redeploy, verify with ps, logs and curl.'
    ],
    example: {
      problem: 'Deployment log: "docker pull ghcr.io/skybankai/payment-api:latest: manifest unknown". The build job pushed only the commit SHA tag. Diagnose, identify the cause and redeploy.',
      solution: [
        'Diagnose: read the workflow: build pushes `$IMAGE:${{ github.sha }}` only; deploy pulls `:latest`.',
        'Confirm: `docker manifest inspect ghcr.io/skybankai/payment-api:<sha>` works; `docker manifest inspect ...:latest` fails; `git log -1` shows the SHA built.',
        'Cause: the `latest` tag was never pushed, so the registry has no such manifest. The build passes because pushing the SHA tag succeeds; deploy fails because it asks for a different tag.',
        'Rectify: change the build to `docker build -t $IMAGE:$SHA -t $IMAGE:latest .` and push both tags (commit with `git add`, `git commit`, `git push`).',
        'Redeploy on staging: `docker pull ghcr.io/skybankai/payment-api:latest`, `docker compose up -d payment-api`, `docker ps`, `docker logs payment-api --tail 50`, `curl -f http://localhost:3000/health`.',
        'Prevent: deploy the immutable SHA tag, keep `latest` as a convenience only.'
      ]
    }
  },
  {
    id: 'explain-workflow-yaml',
    topicId: 'github-actions',
    title: 'Explain a GitHub Actions workflow (what does this job do?)',
    when: 'Given a YAML, explain what it does (e.g. 7 marks) and spot problems',
    mnemonic: 'T-J-S-P: Trigger, Job/runner, Steps in order, Problems',
    steps: [
      '1. Trigger (`on`): which events and branches.',
      '2. Jobs: names, `runs-on`, `needs` (order), `if` conditions.',
      '3. Walk each step in order: `uses` (what action) / `run` (what command does) and the result.',
      '4. State what the whole job achieves end to end (build, test, image, publish).',
      '5. Point out risks: no docker login, tag mismatch, latest only, no PR tests, old versions, duplicate test runs, no cache or scan.',
      '6. Offer one improvement for each risk.'
    ],
    example: {
      problem: 'Explain: on push to main; job build on ubuntu-latest: checkout@v2; setup-java@v1 JDK 11; `mvn clean package`; `mvn verify`; `docker build -t my-app .`; `docker push myregistry/my-app:latest`.',
      solution: [
        'Trigger: every push to main only; pull requests are not tested.',
        'One job `build` on a fresh Ubuntu VM.',
        'Checkout: fetches the code. Setup JDK 11: installs Java for Maven.',
        '`mvn clean package`: delete target, compile, run unit tests, create the JAR.',
        '`mvn verify`: later lifecycle phases (integration tests, quality checks, JaCoCo report if configured); unit tests run again.',
        '`docker build -t my-app .`: builds the image from the Dockerfile.',
        '`docker push myregistry/my-app:latest`: pushes to the registry.',
        'Problems: no `docker login` so the push fails; local image is named my-app but the pushed name is myregistry/my-app (needs `docker tag` or a matching -t); only the latest tag (no versioning or rollback); no PR trigger; duplicate test run; outdated action versions; no scans or caching.'
      ]
    }
  },
  {
    id: 'write-workflow',
    topicId: 'github-actions',
    title: 'Write a CI/CD workflow YAML (test on PR, build and push on main, deploy)',
    when: 'Design/write a GitHub Actions pipeline for a given stack and requirements',
    mnemonic: 'N-O-J-R-S then needs/if/secrets',
    steps: [
      '1. `name` and `on`: `pull_request` plus `push: branches: [main]`.',
      '2. Job test: checkout, set up language (with cache), install, test (and scan).',
      '3. Job image: `needs: test`, `if` only on push to main, login with secrets, build with SHA tag (and latest), push.',
      '4. Job deploy-staging: `needs: image`, deploy using the SHA tag, smoke test.',
      '5. Use `secrets.*`, never plain credentials; set `permissions` when using GHCR.',
      '6. Explain each job and key step in one line.'
    ],
    example: {
      problem: 'Node.js microservice: run tests on PRs, build and push an image after merge to main, deploy to staging. List and explain the key steps.',
      solution: [
        '`on: pull_request` and `push: branches: [main]`: test PRs, publish only on main.',
        'Job `test`: `actions/checkout@v4`, `actions/setup-node@v4` (node 20, cache npm), `npm ci`, `npm test`.',
        'Job `image`: `needs: test`, `if: github.ref == \'refs/heads/main\'`; log in to GHCR using a secret; `docker build -t ghcr.io/org/svc:${{ github.sha }} .`; `docker push` the same tag.',
        'Job `deploy-staging`: `needs: image`; ssh or compose deploy pulling that exact SHA tag; run a health-check curl.',
        'Why: PR tests stop bad code merging; image built once and promoted; SHA tag is traceable and supports rollback; staging validates before production.',
        'Full YAML in the "GitHub Actions" topic.'
      ]
    }
  },
  {
    id: 'fix-build-push-step',
    topicId: 'github-actions',
    title: 'Rewrite a build-and-push step with SHA and latest tags',
    when: 'Image built with one tag but deploy needs another; version tagging rule',
    mnemonic: 'One build, two -t, two pushes',
    steps: [
      '1. Identify which tags are pushed and which are pulled.',
      '2. Build once with several `-t` options.',
      '3. Push each tag (or `docker push --all-tags`).',
      '4. Make sure login precedes the push.',
      '5. Recommend deploying the SHA tag; keep latest for convenience.'
    ],
    example: {
      problem: 'Rewrite the Build and push image step so that both the commit SHA tag and latest are available.',
      solution: [
        '`- name: Build and push image`',
        '`  run: |`',
        '`    docker build -t $IMAGE:${{ github.sha }} -t $IMAGE:latest .`',
        '`    docker push $IMAGE:${{ github.sha }}`',
        '`    docker push $IMAGE:latest`',
        'Explanation: both -t flags tag the same image; each push publishes a manifest, so deploy\'s pull of :latest succeeds.'
      ]
    }
  },
  {
    id: 'pipeline-risk-improvements',
    topicId: 'cicd-concepts',
    title: 'Identify pipeline risks and propose improvements',
    when: 'Given a flawed pipeline or business problems, propose 4 improvements (pre-merge control, staging control, rollback, versioning)',
    mnemonic: 'P-S-R-V: Pre-merge, Staging, Rollback, Versioning',
    steps: [
      '1. List each symptom and map it to a missing control.',
      '2. Pre-merge: tests and scans on every PR, required reviews, branch protection.',
      '3. Staging/deploy: staging identical to production, smoke tests, approval gate, canary or blue-green.',
      '4. Rollback: keep previous immutable image, redeploy previous tag, health-check auto rollback, feature flags.',
      '5. Versioning: tag by commit SHA or semantic version, avoid mutable latest only.',
      '6. Tie each improvement to the scenario problem it solves.'
    ],
    example: {
      problem: 'Junior pipeline: tests only on main, every commit to main deploys to production, no rollback. Identify risks and propose improvements.',
      solution: [
        'Risks: bugs found only after merge; broken code reaches customers; downtime with no way back; no review or staging.',
        'Pre-merge control: run unit tests and SAST/SCA on every pull request; protect main with required checks and review.',
        'Staging control: auto-deploy to staging, run smoke/DAST tests, then manual approval (protected environment) for production, using canary rollout.',
        'Rollback: keep the previous versioned image and redeploy it (`docker pull app:<prev-sha>`), or `git revert` and re-run the pipeline; health-check failure triggers automatic rollback.',
        'Versioning rule: tag images with the commit SHA (and semantic version on release); never deploy a bare `latest`.'
      ]
    }
  }
];
