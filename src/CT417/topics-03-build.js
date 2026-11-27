module.exports = [
  {
    "id": "maven-structure-lifecycle",
    "title": "Maven: directory structure, lifecycle, repositories, dependencies",
    "priority": 10,
    "tier": "core",
    "hint": "likely",
    "freq": "1/7 papers (2023-24 Autumn Q3); hinted Q2",
    "marks": "5-10 marks",
    "summary": "**Maven builds by convention: standard folders, a pom.xml, a lifecycle of ordered phases (validate, compile, test, package, verify, install, deploy) that run plugin goals, and automatic dependency download.**",
    "mnemonic": "Very Cool Tests Pack Very Impressive Deployments: validate, compile, test, package, verify, install, deploy",
    "source": [
      "CT417_Notes_04_Build_Tools_CI",
      "CT417_Exam_2023-2024_1_2_3"
    ],
    "sections": [
      {
        "heading": "What Maven is",
        "items": [
          "**Maven** is a **build tool** for Java: it turns your source code into a finished program with one command.",
          "It compiles the code, copies resource files, compiles and runs tests, packages the result, deploys it and cleans up old output. It can also produce reports and documentation.",
          "Developers wanted an easy, standard way to build projects, a clear description of each project, and an easy way to share JAR files (packaged Java code).",
          "It uses **convention over configuration**: if you put files in the expected folders, you hardly have to configure anything.",
          {
            "type": "p",
            "text": "Benefits compared with building by hand (2023 Autumn Q3a)"
          },
          "Repeatable and automatic: one command compiles, tests and packages.",
          "**Dependency management**: it downloads the libraries you use, plus the libraries those libraries need (**transitive dependencies**).",
          "The same structure across teams and editors (IDEs).",
          "Easy to run automatically on a build server (**CI**, continuous integration).",
          "Many **plugins** (add-ons), and fewer human mistakes.",
          {
            "type": "p",
            "text": "Core features (Q3b)"
          },
          "(1) The project is described in one file, the **POM** (`pom.xml`, Project Object Model).",
          "(2) Dependency management, using **repositories** (stores of libraries), including transitive dependencies.",
          "(3) A standard **build lifecycle** (a fixed order of build stages), carried out by plugins.",
          "(4) Convention over configuration.",
          "(5) **Multi-module** projects (one project made of several smaller ones) and inheritance between their POMs."
        ]
      },
      {
        "heading": "Standard directory layout",
        "items": [
          {
            "type": "diagram",
            "kind": "tree",
            "data": {
              "root": {
                "label": "my-app (project home)",
                "children": [
                  {
                    "label": "pom.xml",
                    "edge": "build descriptor"
                  },
                  {
                    "label": "src",
                    "children": [
                      {
                        "label": "main",
                        "children": [
                          {
                            "label": "java",
                            "edge": "deliverable source code"
                          },
                          {
                            "label": "resources",
                            "edge": "config, properties"
                          }
                        ]
                      },
                      {
                        "label": "test",
                        "children": [
                          {
                            "label": "java",
                            "edge": "unit test source"
                          },
                          {
                            "label": "resources",
                            "edge": "test resources"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "label": "target",
                    "edge": "build output (generated)",
                    "children": [
                      {
                        "label": "classes"
                      },
                      {
                        "label": "my-app-1.0.jar"
                      }
                    ]
                  }
                ]
              }
            },
            "caption": "Maven standard directory layout."
          },
          {
            "type": "table",
            "head": [
              "Path",
              "Contents"
            ],
            "rows": [
              [
                "`pom.xml`",
                "Project Object Model at the project root"
              ],
              [
                "`src/main/java`",
                "Deliverable Java source code"
              ],
              [
                "`src/main/resources`",
                "Resources shipped with the app (application.properties, templates)"
              ],
              [
                "`src/test/java`",
                "Unit/test source (JUnit test classes)"
              ],
              [
                "`src/test/resources`",
                "Resources only needed for tests"
              ],
              [
                "`target/`",
                "Build output: compiled classes, test reports, packaged JAR/WAR (do not commit)"
              ]
            ]
          },
          "Example: with artifactId my-app and version 1.0, `mvn package` compiles, runs tests and creates `target/my-app-1.0.jar`."
        ]
      },
      {
        "heading": "Build lifecycle",
        "items": [
          "A lifecycle is a list of named phases that give order to goal execution. Running a phase runs all earlier phases too: `mvn test` runs validate, compile and test.",
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "validate",
                  "sub": "project correct?"
                },
                {
                  "label": "compile",
                  "sub": "compiler:compile"
                },
                {
                  "label": "test",
                  "sub": "surefire:test"
                },
                {
                  "label": "package",
                  "sub": "jar/war"
                },
                {
                  "label": "verify",
                  "sub": "integration checks"
                },
                {
                  "label": "install",
                  "sub": "to ~/.m2"
                },
                {
                  "label": "deploy",
                  "sub": "to remote repo"
                }
              ],
              "direction": "row"
            },
            "caption": "Default lifecycle phases in order."
          },
          {
            "type": "table",
            "head": [
              "Phase",
              "What happens"
            ],
            "rows": [
              [
                "validate",
                "Check the project is correct and information is available"
              ],
              [
                "compile",
                "Compile the main source code"
              ],
              [
                "test",
                "Run unit tests (Surefire) on the compiled code; packaging not needed"
              ],
              [
                "package",
                "Bundle into JAR/WAR"
              ],
              [
                "verify",
                "Run checks on the package (integration tests, quality gates such as JaCoCo thresholds)"
              ],
              [
                "install",
                "Copy the artefact into the local repository (~/.m2) for other local projects"
              ],
              [
                "deploy",
                "Copy to a remote repository for sharing"
              ]
            ]
          },
          "A **goal** is one specific task, and plugins provide them. Each goal is attached to a phase: the goal `compiler:compile` runs in the compile phase, and `surefire:test` runs in the test phase (Surefire is the plugin that runs unit tests).",
          "`mvn clean` belongs to a separate lifecycle (pre-clean, clean, post-clean) and deletes the `target/` folder.",
          "Typical typed steps of the Java build process (7 marks): resolve dependencies, generate sources, compile sources, compile test sources, execute tests, package (.jar/.war), run health checks/verify, generate reports, install/deploy.",
          {
            "type": "table",
            "head": [
              "Command",
              "Effect"
            ],
            "rows": [
              [
                "`mvn clean`",
                "Delete target/"
              ],
              [
                "`mvn compile`",
                "Compile main code"
              ],
              [
                "`mvn test`",
                "Compile and run unit tests"
              ],
              [
                "`mvn package`",
                "Test and build the JAR in target/"
              ],
              [
                "`mvn clean package -DskipTests`",
                "Fresh build, skip tests (use sparingly)"
              ],
              [
                "`mvn verify`",
                "Run through verify (integration tests, JaCoCo checks)"
              ],
              [
                "`mvn install`",
                "Package and put in local repo"
              ],
              [
                "`mvn dependency:tree`",
                "Show direct and transitive dependencies"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Dependency management and repositories",
        "items": [
          "Dependencies are identified by coordinates: **groupId, artifactId, version** (GAV). If your project depends on a JAR, Maven downloads it and stores it in the local repository.",
          "**Transitive dependencies**: if library A needs library B, Maven pulls B too (a huge benefit that early Maven lacked).",
          "Dependency features: management (control versions of transitive deps), **scope** (compile, test, provided, runtime) so libraries are only on the classpath where needed, and **exclusions** (drop an unwanted transitive dependency).",
          {
            "type": "table",
            "head": [
              "Scope",
              "Available when",
              "Example"
            ],
            "rows": [
              [
                "compile (default)",
                "compile, test, runtime",
                "commons-lang3"
              ],
              [
                "provided",
                "compile and test, not packaged (container supplies it)",
                "servlet-api"
              ],
              [
                "runtime",
                "run and test, not compile",
                "JDBC driver"
              ],
              [
                "test",
                "test code only",
                "JUnit, Mockito"
              ]
            ]
          },
          "**Local repository**: `~/.m2` (Windows `C:\\Users\\<user>\\.m2`). Maven searches local first, then remote repositories (Maven Central at mvnrepository.com, or a company repository).",
          "Large projects use **multi-module** builds: a **parent POM** lists the modules and one command builds them all. Each child POM inherits settings from the parent.",
          "Every POM also inherits from Maven's built-in **super POM**, which sets the default folders and plugins."
        ]
      },
      {
        "heading": "Maven vs Gradle (2023 Autumn)",
        "items": [
          "Maven: XML (pom.xml), convention over configuration, fixed lifecycle, very widely used, declarative.",
          "Gradle: Groovy/Kotlin build scripts, flexible task graph, incremental builds and build cache so often faster, more configurable but less standard.",
          "Both automate compile, test, package and dependency management.",
          "**XML** is a tag-based text format. **Declarative** means you describe what you want rather than writing the steps. An **incremental** build only redoes what changed."
        ]
      }
    ],
    "pitfalls": [
      "Putting tests in src/main or resources in src/main/java: break convention and the build ignores them.",
      "Saying mvn package skips tests: it runs them unless -DskipTests.",
      "Confusing the phase (test) with the goal (surefire:test).",
      "Confusing install (local repo) with deploy (remote repo)."
    ]
  },
  {
    "id": "pom-xml",
    "title": "pom.xml anatomy: coordinates, dependencies, plugins (write a pom)",
    "priority": 11,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q2 (\"pom files\"); 1/7 papers",
    "marks": "5-10 marks",
    "summary": "**A POM declares project coordinates (groupId, artifactId, version, packaging), properties, dependencies and build plugins. Be able to write a complete one from a description and to explain each tag.**",
    "mnemonic": "M-G-A-V-P-D-B: modelVersion, groupId, artifactId, version, packaging/properties, dependencies, build",
    "source": [
      "CT417_Notes_04_Build_Tools_CI",
      "WK10_Introduction_to_JaCoCo"
    ],
    "sections": [
      {
        "heading": "Tag by tag",
        "items": [
          {
            "type": "table",
            "head": [
              "Tag",
              "Purpose"
            ],
            "rows": [
              [
                "`<project>`",
                "Root element of the descriptor"
              ],
              [
                "`<modelVersion>`",
                "Version of the POM model; always 4.0.0"
              ],
              [
                "`<parent>`",
                "Inherit config from another POM (e.g. spring-boot-starter-parent)"
              ],
              [
                "`<groupId>`",
                "Organisation/project namespace, e.g. ie.universityofgalway.vet"
              ],
              [
                "`<artifactId>`",
                "Name of this artefact, e.g. vet-clinic"
              ],
              [
                "`<version>`",
                "Version, e.g. 1.0.0 or 1.0-SNAPSHOT"
              ],
              [
                "`<packaging>`",
                "jar (default), war, pom"
              ],
              [
                "`<name>`, `<description>`",
                "Human readable info"
              ],
              [
                "`<properties>`",
                "Variables such as `java.version`, `project.build.sourceEncoding`"
              ],
              [
                "`<dependencies>`",
                "Libraries the project needs (GAV + scope)"
              ],
              [
                "`<dependencyManagement>`",
                "Central place to fix versions without adding the dependency"
              ],
              [
                "`<build><plugins>`",
                "Configure plugins bound to lifecycle phases"
              ],
              [
                "`<modules>`",
                "Child modules in a multi-module build"
              ]
            ]
          },
          "The three coordinates groupId + artifactId + version uniquely identify the project (and artefact) in a repository."
        ]
      },
      {
        "heading": "Full example: plain Java project with JUnit 5 and JaCoCo",
        "items": [
          {
            "type": "code",
            "text": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\"\n         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n  <modelVersion>4.0.0</modelVersion>\n\n  <groupId>ie.clinic</groupId>\n  <artifactId>vet-clinic</artifactId>\n  <version>1.0.0</version>\n  <packaging>jar</packaging>\n\n  <properties>\n    <maven.compiler.source>17</maven.compiler.source>\n    <maven.compiler.target>17</maven.compiler.target>\n    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n  </properties>\n\n  <dependencies>\n    <dependency>\n      <groupId>org.junit.jupiter</groupId>\n      <artifactId>junit-jupiter</artifactId>\n      <version>5.10.2</version>\n      <scope>test</scope>\n    </dependency>\n    <dependency>\n      <groupId>org.mockito</groupId>\n      <artifactId>mockito-core</artifactId>\n      <version>5.11.0</version>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n\n  <build>\n    <plugins>\n      <plugin>\n        <groupId>org.apache.maven.plugins</groupId>\n        <artifactId>maven-surefire-plugin</artifactId>\n        <version>3.2.5</version>\n      </plugin>\n      <plugin>\n        <groupId>org.jacoco</groupId>\n        <artifactId>jacoco-maven-plugin</artifactId>\n        <version>0.8.11</version>\n        <executions>\n          <execution>\n            <id>prepare-agent</id>\n            <goals><goal>prepare-agent</goal></goals>\n          </execution>\n          <execution>\n            <id>report</id>\n            <phase>test</phase>\n            <goals><goal>report</goal></goals>\n          </execution>\n        </executions>\n      </plugin>\n    </plugins>\n  </build>\n</project>"
          },
          "Plugin = an extension that adds tasks (goals) to the build, packaged as a JAR and added in `<build><plugins>`. Examples: compiler (compile), surefire (run unit tests), jar, jacoco (coverage), spring-boot-maven-plugin (executable JAR).",
          "JaCoCo set-up: `prepare-agent` sets the argLine so Surefire starts the JVM with the JaCoCo agent; `report` reads `target/jacoco.exec` and writes the HTML report to `target/site/jacoco/`. Bound to the test phase, `mvn clean test` produces the report."
        ]
      },
      {
        "heading": "Dependencies in detail",
        "items": [
          "Add a dependency: write its GAV (find it on mvnrepository.com); Maven downloads it and its transitive dependencies.",
          "Use scope `test` for JUnit/Mockito so they are not shipped.",
          "Version conflicts: nearest definition wins; use `dependencyManagement` or exclusions to force versions.",
          "Exclusion example: `<exclusions><exclusion><groupId>commons-logging</groupId><artifactId>commons-logging</artifactId></exclusion></exclusions>` inside a dependency.",
          "**SCA** (software composition analysis) tools such as Dependabot and Trivy read the version numbers in your `pom.xml` to find libraries with known security holes. Fixing one usually means editing the version in the POM."
        ]
      },
      {
        "heading": "Typical exam asks",
        "items": [
          "\"Write a pom.xml for project X using Java 17, with JUnit 5 and Mockito\": use the example above and change coordinates.",
          "\"Explain the highlighted parts of this pom\": go tag by tag using the table.",
          "\"A build fails with a missing artefact / wrong Java version\": check the dependency GAV, the repository, `maven.compiler.release`/`java.version`, then run `mvn -X` or `mvn dependency:tree`."
        ]
      }
    ],
    "pitfalls": [
      "Forgetting packaging, or modelVersion 4.0.0.",
      "Putting test libraries in compile scope.",
      "Leaving the version out of a dependency that has no parent/management to supply it.",
      "Hand-editing target/ instead of the pom."
    ]
  },
  {
    "id": "spring-boot",
    "title": "Spring Boot: starter parent pom, annotations, project structure",
    "priority": 12,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q2 (same question as the pom question); 0/7 papers",
    "marks": "5-10 marks",
    "summary": "**Spring Boot is an opinionated framework: the pom inherits spring-boot-starter-parent, adds starters, and a single @SpringBootApplication class bootstraps an embedded server; controllers, services and repositories are wired by annotations.**",
    "mnemonic": "PSS: Parent pom, Starters, @SpringBootApplication; then Controller-Service-Repository",
    "source": [
      "CT417_Notes_01a_SE_Revision",
      "CT417_Notes_11c_Prometheus",
      "CT417_Notes_06d_DAST"
    ],
    "sections": [
      {
        "heading": "What it is",
        "items": [
          "A **software framework** is ready-made general code that you fill in or override with your own.",
          "**Spring** is a Java framework. Its core job is to create your objects and connect them to each other.",
          "A **bean** is an object that Spring creates and manages for you.",
          "**Spring Boot** makes Spring quick to start, by adding:",
          "**Auto-configuration**: it sets up beans for you, based on which libraries your project includes.",
          "**Starters**: ready-made bundles of libraries that work together.",
          "An **embedded server** (Tomcat): the web server is inside your app, so it runs with just `java -jar`.",
          {
            "type": "p",
            "text": "Starting up (bootstrapping)"
          },
          "The `main` method calls `SpringApplication.run(...)`.",
          "This creates the **application context** (the container holding all the beans), **scans** your packages for classes marked as components, auto-configures and starts the server."
        ]
      },
      {
        "heading": "Spring Boot pom (the usual \"same as the pom question\")",
        "items": [
          {
            "type": "code",
            "text": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\" ...>\n  <modelVersion>4.0.0</modelVersion>\n\n  <parent>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-parent</artifactId>\n    <version>3.2.5</version>\n    <relativePath/>\n  </parent>\n\n  <groupId>ie.clinic</groupId>\n  <artifactId>vet-api</artifactId>\n  <version>0.0.1-SNAPSHOT</version>\n\n  <properties>\n    <java.version>17</java.version>\n  </properties>\n\n  <dependencies>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-data-jpa</artifactId>\n    </dependency>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-actuator</artifactId>\n    </dependency>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-test</artifactId>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n\n  <build>\n    <plugins>\n      <plugin>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-maven-plugin</artifactId>\n      </plugin>\n    </plugins>\n  </build>\n</project>"
          },
          "The **starter parent** is a POM your project inherits from. It sets the default Java version and plugin versions, and manages **dependency versions**. That is why the starters need no `<version>`.",
          {
            "type": "p",
            "text": "Common starters"
          },
          "`spring-boot-starter-web`: web pages and REST APIs, with the Tomcat server and Jackson (converts objects to and from JSON text).",
          "`-data-jpa`: saving objects to a database (JPA is Java's standard for this, Hibernate is the library that does it).",
          "`-test`: testing libraries (JUnit, Mockito, Spring Test).",
          "`-actuator`: web addresses that report the app's health and measurements. `-security`: login and access control.",
          "`spring-boot-maven-plugin` repackages the JAR into an executable **fat JAR** (one file containing your code and all its libraries) and offers `mvn spring-boot:run`.",
          "Monitoring link (week 11): **Prometheus** is a tool that collects measurements from running apps. Add Actuator and `micrometer-registry-prometheus`, then set `management.endpoints.web.exposure.include=health,info,prometheus` so the app offers them at `/actuator/prometheus`."
        ]
      },
      {
        "heading": "Project structure",
        "items": [
          {
            "type": "diagram",
            "kind": "tree",
            "data": {
              "root": {
                "label": "vet-api",
                "children": [
                  {
                    "label": "pom.xml"
                  },
                  {
                    "label": "src/main/java/ie/clinic",
                    "children": [
                      {
                        "label": "VetApiApplication.java",
                        "edge": "@SpringBootApplication"
                      },
                      {
                        "label": "controller",
                        "edge": "REST endpoints"
                      },
                      {
                        "label": "service",
                        "edge": "business logic"
                      },
                      {
                        "label": "repository",
                        "edge": "data access"
                      },
                      {
                        "label": "model",
                        "edge": "entities"
                      }
                    ]
                  },
                  {
                    "label": "src/main/resources",
                    "children": [
                      {
                        "label": "application.properties"
                      }
                    ]
                  },
                  {
                    "label": "src/test/java/ie/clinic",
                    "edge": "tests"
                  }
                ]
              }
            },
            "caption": "Typical Spring Boot layered structure on top of the Maven layout."
          },
          "The app is split into layers: the **controller** handles incoming web requests and replies, calls the **service** (the business rules), which calls the **repository** (database access).",
          "Aim for **high cohesion** (each class has one purpose) and **loose coupling** (classes depend on each other as little as possible).",
          "The main class must sit in a root package so component scanning finds the sub-packages."
        ]
      },
      {
        "heading": "Key annotations",
        "items": [
          {
            "type": "table",
            "head": [
              "Annotation",
              "Meaning"
            ],
            "rows": [
              [
                "`@SpringBootApplication`",
                "= @Configuration + @EnableAutoConfiguration + @ComponentScan on the main class"
              ],
              [
                "`@RestController`",
                "Controller whose return values are written as JSON (@Controller + @ResponseBody)"
              ],
              [
                "`@RequestMapping(\"/api/pets\")`",
                "Base path for a controller/method"
              ],
              [
                "`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`",
                "Map HTTP verb and path to a method"
              ],
              [
                "`@PathVariable`, `@RequestParam`, `@RequestBody`",
                "Bind URL segment, query parameter, JSON body"
              ],
              [
                "`@Service`, `@Repository`, `@Component`",
                "Mark a class as a Spring-managed bean (service, data access, generic)"
              ],
              [
                "`@Autowired` / constructor injection",
                "Inject a dependency; prefer constructor injection (final fields, easy to test)"
              ],
              [
                "`@Entity`, `@Id`, `@GeneratedValue`",
                "JPA mapping of a class to a table"
              ],
              [
                "`@Configuration`, `@Bean`",
                "Define beans in code"
              ],
              [
                "`@Value(\"${key}\")`",
                "Inject a property from application.properties"
              ],
              [
                "`@SpringBootTest`",
                "Load the full application context for an integration test"
              ],
              [
                "`@WebMvcTest`",
                "Test only the web layer (use MockMvc)"
              ],
              [
                "`@MockBean` (Mockito) ",
                "Replace a bean with a mock in the Spring test context"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Minimal working example",
        "items": [
          {
            "type": "code",
            "text": "@SpringBootApplication\npublic class VetApiApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(VetApiApplication.class, args);\n    }\n}\n\n@RestController\n@RequestMapping(\"/api/visits\")\npublic class VisitController {\n    private final VisitService service;\n\n    public VisitController(VisitService service) {   // constructor injection\n        this.service = service;\n    }\n\n    @GetMapping\n    public List<Visit> list(@RequestParam(required = false) Long petId) {\n        return petId == null ? service.findAll() : service.findByPet(petId);\n    }\n}\n\n@Service\npublic class VisitService {\n    private final VisitRepository repo;\n    public VisitService(VisitRepository repo) { this.repo = repo; }\n    public List<Visit> findAll() { return repo.findAll(); }\n    public List<Visit> findByPet(Long petId) { return repo.findByPetId(petId); }\n}\n\npublic interface VisitRepository extends JpaRepository<Visit, Long> {\n    List<Visit> findByPetId(Long petId);\n}"
          },
          "Config: `server.port=8080`, `spring.datasource.url=...`, `management.endpoints.web.exposure.include=health,info`.",
          "Run: `mvn spring-boot:run` or `mvn clean package` then `java -jar target/vet-api-0.0.1-SNAPSHOT.jar`. This JAR is what the Dockerfile copies."
        ]
      }
    ],
    "pitfalls": [
      "Writing versions on every starter (the parent manages them) or forgetting the parent.",
      "Putting the main class in a sub-package so scanning misses sibling packages.",
      "Mixing business logic into the controller; keep the layering.",
      "Using field injection and then being unable to unit test without Spring."
    ]
  },
  {
    "id": "build-basics",
    "title": "What is a build? Libraries and build tools",
    "priority": 29,
    "tier": "low",
    "hint": "unlikely",
    "freq": "hinted unlikely; 1/7 (2023 Autumn Q3)",
    "marks": "3-5 marks",
    "summary": "**A build is the process covering all steps to create a deliverable: generate sources, compile, compile tests, run tests, package, run checks, generate reports.**",
    "mnemonic": "G-C-T-T-P-H-R: Generate, Compile, Test-compile, Test, Package, Health-check, Report",
    "source": [
      "CT417_Notes_04_Build_Tools_CI"
    ],
    "sections": [
      {
        "heading": "Build and libraries",
        "items": [
          "The IDE hides the build behind run/build buttons. A build tool makes it reproducible outside the IDE (CI servers have no IDE).",
          "A **build**: generating sources, compiling sources, compiling test sources, executing tests, packaging (.jar, .war, .ejb), running health checks, generating reports.",
          "Code libraries package reusable functionality (artefacts/dependencies): JAR files in Java, DLL files in Windows/.NET.",
          "Build tools: Maven, Gradle (Java), npm (JavaScript), make (C). They apply build automation: the same steps every time on every machine.",
          "Build output belongs in `target/` or `build/` and is not committed."
        ]
      }
    ],
    "pitfalls": [
      "Treating compile and build as the same thing; a build includes tests, packaging and checks."
    ]
  }
];
