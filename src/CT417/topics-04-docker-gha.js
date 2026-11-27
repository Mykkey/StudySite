module.exports = [
  {
    "id": "dockerfile",
    "title": "Dockerfile: instructions and steps to construct one",
    "priority": 7,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q3 (write a Dockerfile, steps to construct); 2/7 papers involve Docker builds",
    "marks": "6-12 marks",
    "summary": "**Inspect the project, decide build vs runtime, then write FROM (runtime image), WORKDIR, COPY (the artefact), EXPOSE (port), ENTRYPOINT (start command), and build with docker build -t name .**",
    "mnemonic": "F-W-C-R-E-E: FROM, WORKDIR, COPY, RUN, EXPOSE, ENTRYPOINT",
    "source": [
      "CT417_Notes_05b_Docker",
      "CT417_Notes_05a_Deployment_Tools"
    ],
    "sections": [
      {
        "heading": "Words you need first",
        "items": [
          {
            "type": "p",
            "text": "A **Dockerfile** is a text file of instructions for building a Docker **image**. An image is a package holding your app and everything it needs to run. A **container** is a running copy of an image."
          },
          {
            "type": "p",
            "text": "Other words on these pages:"
          },
          "**Build**: turning source code into something runnable.",
          "**Artefact**: the file the build produces. For Java this is a **JAR** file (a zipped bundle of compiled code).",
          "**Runtime**: the software needed to run the artefact, such as Java or Node.",
          "**Base image**: the ready-made image yours starts from, for example one with Java already installed.",
          "**Port**: a numbered door that a program listens on for network requests."
        ]
      },
      {
        "heading": "Steps to construct a Dockerfile (the lecturer's question: \"steps to construct\")",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                "1 Inspect the repository",
                "2 How is it built? what artefact?",
                "3 What runtime executes it?",
                "4 What files go in the image?",
                "5 Configuration and port",
                "6 Start command",
                "7 Write Dockerfile",
                "8 Build and verify"
              ],
              "direction": "row"
            },
            "caption": "Think through the project before typing instructions."
          },
          "1. **Inspect** the project: `ls`, `cat pom.xml`. A `pom.xml` file means Maven/Java, `package.json` means Node, `requirements.txt` means Python.",
          "2. **Build** the artefact: `./mvnw clean package` produces `target/app.jar`.",
          "3. **Choose the runtime**: if the project needs Java 17, use a matching base image such as `eclipse-temurin:17-jre`.",
          "4. **Choose the files**: which must be in the image (the JAR, config)? Everything else stays out.",
          "5. **Configuration and port**: pass settings and secrets in as environment variables (values given to a program from outside), and note the port the app uses (here 8080).",
          "6. **Startup command**: `java -jar app.jar`.",
          "7. **Write** the Dockerfile, 8. **build** it (`docker build -t my-app .`) and **verify** it works (run, ps, logs, curl)."
        ]
      },
      {
        "heading": "Working out the base image and folder (slides, steps 1-3)",
        "items": [
          {
            "type": "p",
            "text": "Steps 1-2: inspect the repository"
          },
          "Look at `pom.xml`, `mvnw`, `src/main/resources/application.properties` and `target/`.",
          "Decide what artefact is produced, and which runtime **and version** runs it.",
          "A **tag** is the version label after the colon in an image name. The base image tag is part of the environment your app runs in, so choose it deliberately.",
          "Match the project's Java version. Do not copy a `FROM` line blindly from the internet, and avoid `:latest`, because it changes over time so builds are not repeatable.",
          {
            "type": "p",
            "text": "Step 3: where the app lives inside the image"
          },
          "`WORKDIR /app` picks a folder inside the image. Your own computer's folder paths do not exist there."
        ]
      },
      {
        "heading": "The build context and what to leave out (steps 4-5)",
        "items": [
          {
            "type": "p",
            "text": "Step 4: understand the build context"
          },
          "The **build context** is the folder Docker is given to copy files from. In `docker build -t my-app .` the final `.` means \"the current folder\".",
          "In `COPY`, the left side is a path in the build context and the right side is a location inside the image.",
          "Docker cannot copy a file it cannot see. A common mistake is running the build from a folder that has no `target/app.jar`.",
          {
            "type": "p",
            "text": "Step 5: control the context with .dockerignore"
          },
          "`.dockerignore` lists files Docker must not see: `.git`, `.idea`, `.vscode`, `*.log`, `.env`.",
          "This sends less data and lowers the chance of secrets getting in. It is **not** a replacement for proper secret handling.",
          "Leave `target/` in if you build the JAR on your own machine. It can be ignored if the JAR is built inside Docker."
        ]
      },
      {
        "heading": "Port, startup command and configuration (steps 6-8)",
        "items": [
          {
            "type": "p",
            "text": "Step 6: the port"
          },
          "Find the port the app **actually** listens on (Spring Boot uses 8080) and put it in `EXPOSE`. Do not copy a port from an example.",
          "`-p 9090:8080` sends port 9090 on your machine (the **host**) to port 8080 in the container.",
          {
            "type": "p",
            "text": "Step 7: the startup command"
          },
          "`java -jar app.jar` is written as `ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]`.",
          "`RUN` happens at **build time**, while the image is being made. `ENTRYPOINT` and `CMD` say what runs when a container **starts**.",
          "`CMD` is often a default command or default arguments that can be overridden.",
          {
            "type": "p",
            "text": "Step 8: configuration"
          },
          "Keep settings out of the image. Supply secrets when you run it, with `-e`."
        ]
      },
      {
        "heading": "What each instruction answers, and where to build (steps 9-10)",
        "items": [
          {
            "type": "p",
            "text": "Step 9: each instruction answers a question"
          },
          "`FROM`: which runtime environment?",
          "`WORKDIR`: where does the app live and run?",
          "`COPY`: which artefact goes in the image?",
          "`EXPOSE`: which internal port?",
          "`ENTRYPOINT`: which process starts?",
          {
            "type": "p",
            "text": "Step 10: build the JAR outside or inside Docker"
          },
          "**Option A, outside**: run `./mvnw clean package` on your machine or the build server, then `COPY` the JAR. Building the software and building the container stay separate, and the JAR must already exist.",
          "**Option B, inside**: a **multi-stage** Dockerfile has one stage that builds the JAR and a second, smaller stage that only runs it.",
          "This makes clear that building needs more tools than running does.",
          "`-DskipTests` (skip the tests during this build) is a choice about your process, not a Docker rule. Ask: where in our delivery process is correctness checked?"
        ]
      },
      {
        "heading": "Caching, other languages and verifying (steps 11-13)",
        "items": [
          {
            "type": "p",
            "text": "Step 11: layers and cache"
          },
          "Each instruction creates a **layer**, which Docker saves and reuses if nothing it depends on has changed (the **cache**).",
          "So copy things that rarely change (`pom.xml`, downloading libraries) **before** things that change often (`src`).",
          "With `COPY . .` followed by `RUN mvn package`, any file change makes Docker redo everything.",
          "Understand why the order matters, but do not distort the build just to gain speed.",
          {
            "type": "p",
            "text": "Step 12: the same reasoning works for other languages"
          },
          "Spring Boot: `pom.xml`, Maven or Gradle, a JAR, Java, `java -jar`.",
          "Node/Express: `package.json` and its lockfile (exact versions), npm, Node, `npm start` or `node ...`.",
          "Python/Flask: `requirements.txt`, Python, `python ...` or an app server command.",
          {
            "type": "p",
            "text": "Step 13: a successful build is not a working app"
          },
          "`docker build` succeeding only proves Docker could follow the instructions.",
          "Keep checking: image exists, run it, container stays running (`docker ps`), read `docker logs`, check the port mapping, send an HTTP request, get a response."
        ]
      },
      {
        "heading": "Dockerfile derivation checklist (slide)",
        "items": [
          "What build system? What artefact reaches the final image? Which runtime and version? Why this base image?",
          "What is the build context? Does every COPY source exist inside it? Is a .dockerignore appropriate?",
          "What internal port? What command starts the app? Which instructions run at image-build time and which command at container start?",
          "Are secrets/configuration supplied at runtime rather than embedded? Does the final image contain unneeded build tools? Does the container remain running? Can the app actually be reached and exercised?",
          {
            "type": "note",
            "text": "Workflow to quote: Inspect, derive, build, run, verify. The idea to keep: build the application, build the image, run containers from that image. The image is the reusable deployment package; the container is a disposable runtime instance."
          }
        ]
      },
      {
        "heading": "Instructions explained",
        "items": [
          {
            "type": "table",
            "head": [
              "Instruction",
              "Purpose",
              "Notes"
            ],
            "rows": [
              [
                "`FROM image:tag`",
                "Base image (OS + runtime) every Dockerfile starts from",
                "Pin a version, e.g. `eclipse-temurin:17-jre`; JRE enough to RUN; JDK/Maven needed to BUILD"
              ],
              [
                "`WORKDIR /app`",
                "Set the working directory inside the image; created if missing",
                "Not your host path; later COPY/RUN/ENTRYPOINT are relative to it"
              ],
              [
                "`COPY src dest`",
                "Copy files from the build context (host) into the image",
                "`COPY target/app.jar app.jar` puts /app/app.jar; context = folder given to `docker build`"
              ],
              [
                "`ADD`",
                "Like COPY plus URL and tar extraction",
                "Prefer COPY"
              ],
              [
                "`RUN cmd`",
                "Execute a command at BUILD time and commit a new layer",
                "e.g. `RUN mvn clean package -DskipTests`, `RUN npm ci`"
              ],
              [
                "`ENV KEY=value`",
                "Set an environment variable in the image",
                "Never put secrets here: they stay in the image/history"
              ],
              [
                "`ARG`",
                "Build-time variable",
                "Not available at run time"
              ],
              [
                "`EXPOSE 8080`",
                "Documents the port the app listens on",
                "Does not publish it; use `-p` at run time"
              ],
              [
                "`ENTRYPOINT [\"java\",\"-jar\",\"app.jar\"]`",
                "The fixed command run when the container starts",
                "Exec (JSON) form so signals reach the process"
              ],
              [
                "`CMD [...]`",
                "Default arguments / command, overridable at `docker run`",
                "ENTRYPOINT + CMD: CMD supplies default args"
              ],
              [
                "`USER app`",
                "Run as a non-root user",
                "Security best practice"
              ],
              [
                "`HEALTHCHECK`",
                "Command Docker runs to test the container is healthy",
                "Used by orchestrators"
              ],
              [
                "`VOLUME`",
                "Declare a mount point for persistent data",
                "Containers are ephemeral"
              ],
              [
                "`LABEL`",
                "Metadata (maintainer, version)",
                "Optional"
              ]
            ]
          },
          {
            "type": "note",
            "text": "RUN executes while creating the IMAGE (docker build). ENTRYPOINT/CMD determine what executes in the CONTAINER (docker run)."
          }
        ]
      },
      {
        "heading": "Dockerfile 1: simple, JAR built outside",
        "items": [
          {
            "type": "code",
            "text": "FROM eclipse-temurin:17-jre\nWORKDIR /app\nCOPY target/app.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"
          },
          "Build outside first (`./mvnw clean package`, Maven on host or CI), then `docker build -t my-app .`. The image is small because it has only a JRE and the JAR."
        ]
      },
      {
        "heading": "Dockerfile 2: multi-stage (build inside Docker)",
        "items": [
          {
            "type": "code",
            "text": "# Stage 1: build\nFROM maven:3.9-eclipse-temurin-17 AS build\nWORKDIR /workspace\nCOPY pom.xml .\nRUN mvn dependency:go-offline\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\n# Stage 2: runtime\nFROM eclipse-temurin:17-jre\nWORKDIR /app\nCOPY --from=build /workspace/target/app.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"
          },
          "Stage 1 has JDK + Maven (large) to BUILD; stage 2 has only a Java runtime to RUN. `COPY --from=build` takes just the JAR. The final image is small and has no build tools.",
          "**Layer caching**: copy `pom.xml` and resolve dependencies BEFORE copying `src`. Source changes often, dependencies rarely, so the expensive dependency layer is reused. Bad: `COPY . .` then `RUN mvn package` re-downloads dependencies every time.",
          "**.dockerignore** keeps files out of the build context: `target/`, `.git`, `.idea`, `.vscode`, `*.log`, `.env`. Smaller, faster builds and no secrets leaked.",
          "The **JDK** (Java Development Kit) can compile code. The **JRE** (Java Runtime Environment) can only run it, so it is smaller."
        ]
      },
      {
        "heading": "Dockerfile 3: Node.js microservice (SkyBank style)",
        "items": [
          {
            "type": "code",
            "text": "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nEXPOSE 3000\nUSER node\nCMD [\"node\", \"server.js\"]"
          }
        ]
      },
      {
        "heading": "Configuration and secrets",
        "items": [
          "Read configuration in code from the environment: `System.getenv(\"YOUTUBE_API_KEY\")`.",
          "Bad: `ENV YOUTUBE_API_KEY=actual-secret-value` in the Dockerfile (the secret becomes part of the image and its build history).",
          "Good: inject at run time: `docker run -e YOUTUBE_API_KEY=\"$YOUTUBE_API_KEY\" -p 8080:8080 my-app`. Same image, different runtime configuration.",
          "Ports: `-p HOST:CONTAINER`, e.g. `-p 9090:8080` makes the app reachable at localhost:9090 while it listens on 8080 inside."
        ]
      }
    ],
    "pitfalls": [
      "Writing EXPOSE and thinking the port is published; you still need -p.",
      "Using the latest tag or a JDK image for runtime without reason.",
      "Putting secrets in ENV or COPYing .env into the image.",
      "COPY path wrong because the JAR was never built, or is excluded by .dockerignore.",
      "Explaining only what lines do, not the steps/reasoning for constructing the file."
    ]
  },
  {
    "id": "docker-commands-troubleshooting",
    "title": "Docker commands and troubleshooting",
    "priority": 8,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q3 part 2; 2/7 papers (2025-26 s1 and autumn Q1)",
    "marks": "6-10 marks",
    "summary": "**Verify in order: image exists, container running (docker ps), logs (docker logs), port mapping, HTTP check. For failures use docker ps -a and docker logs to find why it exited.**",
    "mnemonic": "B-R-P-L-E: build, run, ps, logs, exec",
    "source": [
      "CT417_Notes_05b_Docker",
      "CT417_Notes_05a_Deployment_Tools",
      "CT417_Exam_2025-2026_1_1_5",
      "CT417_Exam_2025-2026_1_2_3"
    ],
    "sections": [
      {
        "heading": "Command list",
        "items": [
          {
            "type": "table",
            "head": [
              "Command",
              "Meaning"
            ],
            "rows": [
              [
                "`docker --version`, `docker run hello-world`",
                "Check install and that the daemon works"
              ],
              [
                "`docker build -t my-app .`",
                "Build an image from the Dockerfile in the current directory (`.` = build context); `-t` names/tags it"
              ],
              [
                "`docker build -t my-app:1.0 -t my-app:latest .`",
                "Apply several tags"
              ],
              [
                "`docker images`",
                "List local images"
              ],
              [
                "`docker run -d --name my-app-container -p 8080:8080 my-app`",
                "`-d` detached, `--name` name it, `-p HOST:CONTAINER` publish port"
              ],
              [
                "`docker run -e APP_MODE=prod ...`",
                "Set environment variable at run time"
              ],
              [
                "`docker ps`",
                "Running containers"
              ],
              [
                "`docker ps -a`",
                "All containers including stopped/exited ones"
              ],
              [
                "`docker logs <name>` (`-f` to follow)",
                "Container stdout/stderr: first place to look when it fails"
              ],
              [
                "`docker stop <name>`",
                "Stop a running container"
              ],
              [
                "`docker start <name>`",
                "Start an existing stopped container"
              ],
              [
                "`docker restart <name>`",
                "Stop then start"
              ],
              [
                "`docker rm <name>`",
                "Remove a stopped container (`-f` forces)"
              ],
              [
                "`docker rmi <image>`",
                "Remove an image"
              ],
              [
                "`docker exec -it <name> /bin/sh`",
                "Open a shell inside a running container (if the image has one)"
              ],
              [
                "`docker inspect <name>`",
                "Full low-level JSON (ports, env, mounts, state)"
              ],
              [
                "`docker pull image:tag` / `docker push image:tag`",
                "Download from / upload to a registry"
              ],
              [
                "`docker login ghcr.io`",
                "Authenticate to a registry"
              ],
              [
                "`docker tag my-app ghcr.io/org/my-app:1.0`",
                "Add a registry name/tag to an image"
              ],
              [
                "`docker compose up -d` / `down`",
                "Start/stop the multi-container stack defined in docker-compose.yml"
              ],
              [
                "`docker manifest inspect image:tag`",
                "Check whether a tag exists in the registry"
              ],
              [
                "`docker system prune`",
                "Clean unused data"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Standard verification sequence",
        "items": [
          {
            "type": "code",
            "text": "docker build -t my-app .\ndocker run -d --name my-app-container -p 8080:8080 my-app\ndocker ps\ndocker logs my-app-container\ncurl http://localhost:8080/\n# if it is not running:\ndocker ps -a\ndocker logs my-app-container"
          },
          "Reasoning: image exists, container remains running, inspect `docker ps`, inspect `docker logs`, verify port mapping, make an HTTP request, application responds.",
          "Image vs container: an image is an immutable layered template; a container is a running instance. One image can create many independent containers, each with different ports/env."
        ]
      },
      {
        "heading": "Troubleshooting approach (slide)",
        "items": [
          "If the container exits immediately: `docker ps -a` then `docker logs <name>`. Possible causes (slide list): incorrect startup command; missing artefact; incompatible runtime; missing configuration; application startup failure.",
          "If the container is running but the app is unreachable, investigate: the application's internal listening port; the `-p HOST_PORT:CONTAINER_PORT` mapping; application logs; whether the service is actually listening.",
          "Do not immediately rewrite the application source. First decide whether the problem is BUILD, IMAGE, STARTUP, CONFIGURATION, NETWORK / PORT MAPPING or APPLICATION. That distinction is part of deployment engineering."
        ]
      },
      {
        "heading": "Troubleshooting table",
        "items": [
          {
            "type": "table",
            "head": [
              "Symptom",
              "Likely cause",
              "Diagnose and fix"
            ],
            "rows": [
              [
                "Build: \"COPY failed: file not found target/app.jar\"",
                "JAR not built yet, wrong path, or target excluded by .dockerignore",
                "Run `mvn clean package` first (or use multi-stage), check `ls target`, fix path/.dockerignore"
              ],
              [
                "Build: \"pull access denied / manifest unknown\" for base image",
                "Wrong image name/tag, typo, no network",
                "Check name and tag on the registry; `docker pull` it manually"
              ],
              [
                "Run: container exits immediately (`docker ps` empty)",
                "App crashed or main process ended",
                "`docker ps -a` shows Exited code; `docker logs <name>`; fix error, rebuild"
              ],
              [
                "\"no main manifest attribute\" / \"Error: Unable to access jarfile\"",
                "Plain JAR not executable, wrong file name, wrong WORKDIR",
                "Use spring-boot-maven-plugin repackage; match ENTRYPOINT to actual jar name"
              ],
              [
                "\"UnsupportedClassVersionError\"",
                "Built with a newer Java than the runtime image",
                "Use matching base image (build with 17, run on 17)"
              ],
              [
                "\"port is already allocated\" / \"address already in use\"",
                "Host port taken by another container/process",
                "Use another host port `-p 9090:8080` or stop the other container (`docker ps`)"
              ],
              [
                "Container runs but browser cannot connect",
                "-p missing or swapped (CONTAINER:HOST), app bound to 127.0.0.1 inside container, wrong port",
                "Check `docker ps` PORTS column; use `-p HOST:CONTAINER`; bind to 0.0.0.0"
              ],
              [
                "\"container name already in use\"",
                "Old container with same name exists",
                "`docker rm -f <name>` then run again"
              ],
              [
                "App fails: null API key / missing config",
                "Environment variable not provided",
                "`docker run -e KEY=...` or env file; never bake into image"
              ],
              [
                "Exit code 137",
                "Killed: out of memory (OOM) or `docker kill`",
                "Increase memory limit or fix the leak; inspect `docker inspect` State.OOMKilled"
              ],
              [
                "\"exec: /bin/bash not found\"",
                "Slim/alpine image has no bash",
                "Use `/bin/sh`"
              ],
              [
                "`docker pull` -> \"manifest unknown\" for :latest",
                "That tag was never pushed to the registry",
                "`docker manifest inspect`; push the tag, or pull an existing tag (e.g. the commit SHA)"
              ],
              [
                "`docker push` -> \"denied/unauthorized\"",
                "Not logged in or token lacks write:packages",
                "`docker login`; use token with correct scope"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Worked case: \"manifest unknown\" in a GitHub Actions deployment",
        "items": [
          {
            "type": "code",
            "text": "Run docker pull ghcr.io/skybankai/payment-api:latest\nError response from daemon: manifest for ghcr.io/skybankai/payment-api:latest not found: manifest unknown\nError: Process completed with exit code 1"
          },
          "**Cause**: the build job only pushed the tag `:<commit-sha>`; no job ever pushed `:latest`. The deploy job pulls `:latest`, which does not exist in GHCR, so the registry replies \"manifest unknown\". Build succeeds because it only needs to push the SHA tag; deploy fails because it references a different tag.",
          "**GHCR** (GitHub Container Registry) is GitHub's online store for images. A **registry** is any such store. A **commit SHA** is the long unique ID Git gives each commit, often used as an image tag.",
          "**Diagnose with git + docker**: `git log -1` and the workflow run show the SHA that was built; `docker manifest inspect ghcr.io/skybankai/payment-api:<sha>` succeeds while `:latest` fails; `git diff` / read the workflow to see the tags pushed.",
          "**Rectify**: tag and push both (see GitHub Actions topic), re-run the workflow, then redeploy; better still deploy by SHA.",
          {
            "type": "code",
            "text": "docker pull ghcr.io/skybankai/payment-api:latest\ndocker compose up -d payment-api\ndocker ps\ndocker logs payment-api --tail 50\ncurl -f http://localhost:3000/health"
          }
        ]
      },
      {
        "heading": "Containers vs VMs, why containers",
        "items": [
          "A **virtual machine (VM)** imitates a whole computer and runs its own full operating system, so it is heavy and slow to start.",
          "A **container** shares the host's operating system core (the **kernel**) and only packages the app and what it depends on, so it is light and starts fast.",
          "Why: **portability** (same everywhere), **scalability** (microservices), **efficiency** (fewer resources), **isolation** (no interference), **faster deployment/rollback** (start in seconds).",
          "Why not just a JAR? A JAR is the artefact; execution still needs the right runtime, libraries and configuration. The image packages all of that."
        ]
      }
    ],
    "pitfalls": [
      "Using docker ps and forgetting -a when the container has exited.",
      "Not checking docker logs first: it usually names the exact error.",
      "Reversing -p: it is HOST:CONTAINER.",
      "Describing commands without saying what they confirm in the verification chain."
    ]
  },
  {
    "id": "github-actions",
    "title": "GitHub Actions: workflow YAML anatomy, triggers, jobs, steps",
    "priority": 9,
    "tier": "core",
    "hint": "likely",
    "freq": "3/7 papers (2024-25 Q1c, 2025-26 s1 Q1b, autumn Q1); hinted",
    "marks": "5-10 marks",
    "summary": "**A workflow (YAML in .github/workflows) has name, on (triggers), jobs (each with runs-on and steps). Steps either use an action (uses) or run a shell command (run). needs orders jobs; secrets hold credentials.**",
    "mnemonic": "N-O-J-R-S: name, on, jobs, runs-on, steps (uses/run)",
    "source": [
      "CT417_Exam_2024-2025_1_1_5",
      "CT417_Exam_2025-2026_1_1_5",
      "CT417_Exam_2025-2026_1_2_3",
      "CT417_Notes_04_Build_Tools_CI"
    ],
    "sections": [
      {
        "heading": "Anatomy",
        "items": [
          {
            "type": "table",
            "head": [
              "Key",
              "Meaning"
            ],
            "rows": [
              [
                "`name`",
                "Workflow name shown in the Actions tab"
              ],
              [
                "`on`",
                "Trigger events: `push`, `pull_request`, `workflow_dispatch` (manual), `schedule` (cron), `release`; filter with `branches:`"
              ],
              [
                "`env`",
                "Environment variables for the workflow/job/step"
              ],
              [
                "`permissions`",
                "Scopes granted to GITHUB_TOKEN (e.g. `packages: write`)"
              ],
              [
                "`jobs`",
                "Named jobs; run in parallel by default"
              ],
              [
                "`runs-on`",
                "Runner: `ubuntu-latest`, `windows-latest`, `macos-latest`"
              ],
              [
                "`needs`",
                "Job dependency: this job waits for another and runs after it succeeds"
              ],
              [
                "`if`",
                "Condition, e.g. `github.event_name == 'push'` or `github.ref == 'refs/heads/main'`"
              ],
              [
                "`strategy.matrix`",
                "Run the job over several versions (JDK 11/17, OS)"
              ],
              [
                "`steps`",
                "Ordered list of steps in a job; share the runner filesystem"
              ],
              [
                "`uses`",
                "Run a reusable action, e.g. `actions/checkout@v4`"
              ],
              [
                "`with`",
                "Inputs for an action (java-version, path, etc.)"
              ],
              [
                "`run`",
                "Run a shell command"
              ],
              [
                "`secrets.NAME`",
                "Encrypted repository secret, never hard-code credentials"
              ],
              [
                "`${{ github.sha }}`",
                "Expression: commit SHA of the run"
              ]
            ]
          },
          "Terms: **workflow** (the YAML file), **event** (trigger), **job** (set of steps on one runner), **step** (one task), **action** (reusable unit), **runner** (VM that executes the job), **artefact** (files stored from a run).",
          "**GitHub Actions** is GitHub's built-in automation. You describe steps in a file, and GitHub runs them for you when something happens, such as a push.",
          "YAML rules: indentation with spaces (2) defines structure; `-` starts a list item; `key: value` pairs. A tab or wrong indent breaks the workflow."
        ]
      },
      {
        "heading": "Example: Java CI with Maven, JaCoCo, Docker (test on PRs, build image on main)",
        "items": [
          {
            "type": "code",
            "text": "name: vet-clinic-ci\n\non:\n  pull_request:\n  push:\n    branches: [main]\n\nenv:\n  IMAGE: ghcr.io/vetclinic/vet-api\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Set up JDK 17\n        uses: actions/setup-java@v4\n        with:\n          distribution: temurin\n          java-version: '17'\n          cache: maven\n      - name: Build, test and coverage\n        run: mvn --batch-mode clean verify\n      - name: Upload coverage report\n        uses: actions/upload-artifact@v4\n        with:\n          name: jacoco-report\n          path: target/site/jacoco\n\n  docker:\n    needs: test\n    if: github.event_name == 'push' && github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      packages: write\n    steps:\n      - uses: actions/checkout@v4\n      - name: Log in to GHCR\n        run: echo \"${{ secrets.GITHUB_TOKEN }}\" | docker login ghcr.io -u ${{ github.actor }} --password-stdin\n      - name: Build image with SHA and latest tags\n        run: docker build -t $IMAGE:${{ github.sha }} -t $IMAGE:latest .\n      - name: Push both tags\n        run: |\n          docker push $IMAGE:${{ github.sha }}\n          docker push $IMAGE:latest\n\n  deploy-staging:\n    needs: docker\n    runs-on: ubuntu-latest\n    steps:\n      - name: Deploy to staging\n        run: ssh deploy@staging.example.com \"docker pull $IMAGE:${{ github.sha }} && docker compose up -d\""
          },
          "Read it as: PR runs `test` only; push to main runs `test`, then `docker`, then `deploy-staging` in order because of `needs`."
        ]
      },
      {
        "heading": "Explaining the 2024-25 workflow (7 marks): \"what does the build job do?\"",
        "items": [
          {
            "type": "code",
            "text": "name: Build and Test Java Application\non:\n  push:\n    branches:\n      - main\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v2\n      - name: Set up JDK 11\n        uses: actions/setup-java@v1\n        with:\n          java-version: '11'\n      - name: Build with Maven\n        run: mvn clean package\n      - name: Run tests and generate a code coverage report\n        run: mvn verify\n      - name: Build container image\n        run: docker build -t my-app .\n      - name: Push container image to registry\n        run: docker push myregistry/my-app:latest"
          },
          {
            "type": "p",
            "text": "What it does"
          },
          "**Trigger**: runs on every push to `main` only, not on pull requests.",
          "The job `build` runs on a **runner**: a fresh temporary Ubuntu Linux machine.",
          "1. **Checkout**: downloads the repository's code onto the runner (version v2 is outdated).",
          "2. **Set up JDK 11**: installs Java 11 so Maven can compile.",
          "3. `mvn clean package`: deletes the old `target` folder, compiles, runs unit tests, builds the JAR.",
          "4. `mvn verify`: runs the later checks (integration tests, and a code coverage report if set up). Tests run twice, which is wasteful.",
          "5. `docker build -t my-app .`: builds the image from the Dockerfile using the JAR.",
          "6. `docker push myregistry/my-app:latest`: uploads the image to a registry (an online image store)."
        ]
      },
      {
        "heading": "Problems with that workflow (bonus marks)",
        "items": [
          "There is no `docker login`, so the push will fail.",
          "The image is built as `my-app` but pushed as `myregistry/my-app:latest`. The names (**tags**) do not match.",
          "It only uses `:latest`, with no version or commit tag, so you cannot **roll back** (return to the previous version).",
          "Nothing is tested on pull requests.",
          "The action versions and JDK 11 are old.",
          "There is no **dependency cache** (saved copies of downloaded libraries), so every run downloads them again.",
          "There is no handling of secrets and no security scan."
        ]
      },
      {
        "heading": "Rewriting the \"build and push\" step (2025-26 autumn Q1b, 5 marks)",
        "items": [
          {
            "type": "code",
            "text": "- name: Build and push image\n  run: |\n    docker build -t $IMAGE:${{ github.sha }} -t $IMAGE:latest .\n    docker push $IMAGE:${{ github.sha }}\n    docker push $IMAGE:latest"
          },
          "Build once with two `-t` tags (same image id), then push each tag. `docker push --all-tags $IMAGE` is an equivalent shorthand. The deploy job pulling `:latest` now finds a manifest.",
          "Also valid: the `docker/build-push-action` with `tags:` listing both. Commit SHA gives an immutable version for rollback; latest is a moving pointer.",
          "An **immutable** tag always means the same image. A **moving pointer** such as `latest` is re-assigned to whichever image was pushed most recently."
        ]
      },
      {
        "heading": "Designing a pipeline (2025-26 s1 Q1b: Node.js microservice)",
        "items": [
          {
            "type": "code",
            "text": "name: node-service\non:\n  pull_request:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: npm }\n      - run: npm ci\n      - run: npm test\n  image:\n    needs: test\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo \"${{ secrets.GHCR_TOKEN }}\" | docker login ghcr.io -u skybankai --password-stdin\n      - run: |\n          docker build -t ghcr.io/skybankai/svc:${{ github.sha }} .\n          docker push ghcr.io/skybankai/svc:${{ github.sha }}\n  deploy-staging:\n    needs: image\n    runs-on: ubuntu-latest\n    steps:\n      - run: ssh deploy@staging \"docker pull ghcr.io/skybankai/svc:${{ github.sha }} && docker compose up -d\""
          },
          "Key steps to list and explain: trigger (PR + main), checkout, set up runtime + cache, install (`npm ci`), run tests, (add SAST/SCA scan), log in to registry, build image tagged with SHA, push, deploy to staging with the same tag, smoke test.",
          "**SAST** scans your own code for security problems. **SCA** checks the libraries you use for known problems.",
          "**Staging** is a practice copy of the live system. A **smoke test** is a quick check that the main things work."
        ]
      },
      {
        "heading": "Risky pipeline and improvements (2025-26 s1 Q1c)",
        "items": [
          "**Canary** release: give the new version to a few users first. **Blue-green**: run old and new side by side and switch traffic over. **Feature flag**: a setting that turns a feature on or off without redeploying.",
          {
            "type": "table",
            "head": [
              "Risk in design",
              "Improvement"
            ],
            "rows": [
              [
                "Tests only on main: bugs found after merge",
                "Run tests on every pull request; protect main (required checks + review)"
              ],
              [
                "Every commit to main deploys straight to production: no staging, no approval",
                "Deploy to staging first, smoke tests, then manual approval (environment protection) before production; or canary/blue-green"
              ],
              [
                "No rollback strategy: a bad release causes downtime",
                "Immutable versioned images (SHA tags); keep previous version; redeploy previous tag or `git revert`; feature flags; health-check-based automatic rollback"
              ],
              [
                "Latest tag only",
                "Tag by SHA/semantic version"
              ],
              [
                "No security scans",
                "SAST, SCA/dependency scan, container scan in the pipeline"
              ]
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "Wrong indentation or tabs in YAML; mixing `uses` and `run` in the same step.",
      "Forgetting `needs`, so jobs run in parallel and deploy before build finishes.",
      "Hard-coding passwords/tokens instead of `secrets`.",
      "Building the image under one name and pushing another, or pushing without docker login.",
      "Pulling `:latest` when only a SHA tag was pushed."
    ]
  },
  {
    "id": "docker-concepts",
    "title": "Containerisation concepts: images, containers, layers, VMs",
    "priority": 20,
    "tier": "likely",
    "freq": "est. medium (week 5); 2019 Q2c",
    "marks": "3-6 marks",
    "summary": "**Containers package an app with its dependencies and share the host OS kernel; an image is an immutable layered template, a container is a running instance of it.**",
    "mnemonic": "Image = recipe/template, Container = the meal; PEIFI: Portability, Efficiency, Isolation, Faster deployment, scalability",
    "source": [
      "CT417_Notes_05a_Deployment_Tools",
      "CT417_Notes_05b_Docker"
    ],
    "sections": [
      {
        "heading": "Concepts",
        "items": [
          "**Containerisation**: packaging software code and all its dependencies so it runs uniformly across any infrastructure. Like shipping containers in logistics.",
          "**Container**: an isolated environment where an application runs, giving consistent behaviour across dev, test and production.",
          "**Image**: a standardised package with the files, binaries, libraries and configuration needed to run a container. **Immutable** (change = new image) and **layered** (each layer a set of file-system changes: base OS, runtime, dependencies, app).",
          "Image to container: `docker run` creates a container from an image; many containers can come from one image and be configured differently (host port, env vars).",
          "Build flow: source code, Maven/Gradle, JAR, `docker build`, Docker image, `docker run`, running container. Dockerfile is the recipe."
        ]
      },
      {
        "heading": "Containers vs virtual machines",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "Virtual machine",
              "Container"
            ],
            "rows": [
              [
                "Virtualises",
                "Hardware (hypervisor)",
                "Operating system"
              ],
              [
                "Size",
                "Heavy: full guest OS each",
                "Lightweight: shares host kernel"
              ],
              [
                "Startup",
                "Minutes",
                "Seconds"
              ],
              [
                "Isolation",
                "Strong (separate kernel)",
                "Process-level isolation"
              ],
              [
                "Resource use",
                "Higher",
                "More efficient"
              ]
            ]
          },
          "Benefits: portability, scalability (microservices), efficiency, isolation, faster deployment and rollback."
        ]
      }
    ],
    "pitfalls": [
      "Saying containers contain a full OS: they share the host kernel.",
      "Confusing image and container."
    ]
  },
  {
    "id": "cicd-concepts",
    "title": "CI/CD pipelines: goals, benefits, pitfalls, pipeline improvements",
    "priority": 25,
    "tier": "low",
    "hint": "unlikely",
    "freq": "6/7 papers historically, but hinted unlikely this year",
    "marks": "6-15 marks",
    "summary": "**CI merges and tests every change automatically; CD delivers/deploys it through automated stages. Benefits: fast feedback, fewer integration conflicts, reliable releases. Pitfalls: flaky tests, slow pipelines, poor culture, security gaps.**",
    "mnemonic": "Build, Test, Scan, Package, Deploy, Observe (BTSPDO)",
    "source": [
      "CT417_Notes_04_Build_Tools_CI",
      "CT417_Exam_2024-2025_1_1_5",
      "CT417_Exam_2025-2026_1_1_5",
      "CT417_Exam_2023-2024_1_1_5"
    ],
    "sections": [
      {
        "heading": "Definitions",
        "items": [
          "**Continuous Integration (CI)**: developers integrate code into a shared mainline frequently; each integration is built and tested automatically.",
          "**Continuous Delivery**: every passing change is automatically prepared for release; production deployment is a manual approval. **Continuous Deployment**: every passing change is released to production automatically.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                "Commit / PR",
                "Build",
                "Unit tests",
                "SAST + SCA",
                "Package / image",
                "Deploy staging",
                "DAST + smoke tests",
                "Deploy production",
                "Monitor"
              ],
              "direction": "row"
            },
            "caption": "A secure CI/CD pipeline."
          }
        ]
      },
      {
        "heading": "Advantages of CI (3 marks) and goals/benefits of CI/CD",
        "items": [
          "Early bug detection and fast feedback (broken build visible in minutes).",
          "Fewer integration conflicts and smaller, easier merges.",
          "Reliable, repeatable, automated builds and releases; less manual error.",
          "Faster, more frequent releases and shorter time-to-market.",
          "Higher quality through automated regression tests and code quality gates."
        ]
      },
      {
        "heading": "Pitfalls/challenges and strategies",
        "items": [
          {
            "type": "table",
            "head": [
              "Challenge",
              "Strategy"
            ],
            "rows": [
              [
                "Slow pipeline, long feedback",
                "Parallel jobs, caching, incremental analysis, test selection, split fast PR checks from slow nightly ones"
              ],
              [
                "Flaky tests erode trust",
                "Fix/quarantine, deterministic tests (fixed clock), no sleeps"
              ],
              [
                "Cultural resistance, skills gap",
                "Training, small pilots, shared ownership (DevOps culture)"
              ],
              [
                "Toolchain complexity and cost",
                "Standardise on one platform, infrastructure as code, start simple"
              ],
              [
                "Environment mismatch (works in staging, fails in prod)",
                "Containers, IaC, staging-production parity"
              ],
              [
                "Security checks late or manual",
                "Shift left: SAST, SCA, secret scanning, DAST in pipeline"
              ],
              [
                "Risky production deploys",
                "Canary/blue-green, feature flags, automated rollback, approvals"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Words in that table"
          },
          "**Pipeline**: the automatic chain of build, test and deploy steps. **Quarantine** a flaky test: set it aside until fixed.",
          "**DevOps**: development and operations teams working as one. **Infrastructure as code** (IaC): servers set up from files in version control.",
          "**Parity**: keeping two environments the same. **SAST/SCA/DAST**: security checks of your code, your libraries and the running app.",
          "**Canary/blue-green**: release to a few users first, or run old and new side by side and switch. **Rollback**: return to the previous version."
        ]
      },
      {
        "heading": "Model answer: four improvements for FoodieGo (8 marks)",
        "items": [
          "1. Automate tests (unit, integration, regression) on every pull request instead of manual testing: faster, consistent releases at peak periods.",
          "2. Trunk-based / short-lived branches with CI on every merge and mandatory PR checks to cut integration conflicts.",
          "3. Staging environment identical to production (containers/IaC), smoke tests, canary or blue-green deployment and automated rollback to stop bad updates causing downtime.",
          "4. Shift-left security: SAST (SonarQube), SCA/dependency scan, secret scan on PRs and DAST on staging, failing the build on high severity findings."
        ]
      }
    ],
    "pitfalls": [
      "Writing generic definitions only; tie every point to the scenario problem.",
      "Confusing continuous delivery with continuous deployment."
    ]
  }
];
