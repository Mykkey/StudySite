module.exports = [
  {
    "id": "unit-testing-junit",
    "title": "Unit testing with JUnit 5: writing tests, assertions, AAA, mocking",
    "priority": 13,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q4c (you must write tests); 1/7 papers (Calculator.add, 6 marks)",
    "marks": "6-10 marks",
    "summary": "**A unit test checks one small unit in isolation, fast and repeatably. Write it as Arrange-Act-Assert with a descriptive name, test normal, boundary and error cases, and mock external dependencies.**",
    "mnemonic": "AAA: Arrange, Act, Assert; and FIRST: Fast, Independent, Repeatable, Self-validating, Timely",
    "source": [
      "CT417_Notes_09a_Unit_Testing",
      "CT417_Notes_09c_Unit_Testing_Challenges",
      "CT417_Notes_10c_Testing_for_Security",
      "CT417_Exam_2023-2024_1_1_5"
    ],
    "sections": [
      {
        "heading": "What and why",
        "items": [
          "**Unit testing** checks the **smallest testable parts** of the code (one method or class), one behaviour at a time. The tests run automatically.",
          "**JUnit** is the most popular Java testing framework. **Mockito** creates **mocks**: fake stand-ins for the other things your code uses.",
          "Benefits: early bug detection; improved code quality (testable means modular); safe refactoring (tests prove behaviour is intact); faster development cycle (rerun in seconds); runs in CI to catch regressions.",
          "Principles: **isolate** the unit (no real database or network: use stand-ins), **repeatable** (same result in any order, on any machine), **fast**, and **independent** (no shared data between tests).",
          {
            "type": "p",
            "text": "The test pyramid"
          },
          "Many fast **unit tests** at the bottom (one piece of logic).",
          "Fewer **component or controller tests** in the middle (does the web request behave correctly?).",
          "A few **end-to-end tests** at the top (does the whole app do what the user needs?).",
          "**Integration tests** check that modules work correctly together."
        ]
      },
      {
        "heading": "JUnit 5 building blocks",
        "items": [
          {
            "type": "table",
            "head": [
              "Element",
              "Use"
            ],
            "rows": [
              [
                "`@Test`",
                "Marks a test method"
              ],
              [
                "`@BeforeEach` / `@AfterEach`",
                "Run before/after every test (fresh fixture each time)"
              ],
              [
                "`@BeforeAll` / `@AfterAll`",
                "Once per class (static)"
              ],
              [
                "`@DisplayName(\"...\")`",
                "Readable name"
              ],
              [
                "`@Disabled`",
                "Skip a test"
              ],
              [
                "`@ParameterizedTest` + `@CsvSource` / `@ValueSource`",
                "Same test with several inputs"
              ],
              [
                "`assertEquals(expected, actual)`",
                "Equality; for doubles `assertEquals(e, a, delta)`"
              ],
              [
                "`assertTrue` / `assertFalse`",
                "Boolean conditions"
              ],
              [
                "`assertNull` / `assertNotNull`",
                "Null checks"
              ],
              [
                "`assertThrows(Ex.class, () -> ...)`",
                "Expect an exception"
              ],
              [
                "`assertAll(...)`",
                "Group several assertions"
              ],
              [
                "`assertSame` / `assertNotEquals`",
                "Reference identity / inequality"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Anatomy of a test: Arrange, Act, Assert",
        "items": [
          {
            "type": "code",
            "text": "import static org.junit.jupiter.api.Assertions.assertEquals;\nimport org.junit.jupiter.api.Test;\n\nclass CalculatorTest {\n    @Test\n    void evaluatesSumOfThreeNumbers() {\n        Calculator calculator = new Calculator();      // Arrange\n        int sum = calculator.evaluate(\"1+2+3\");        // Act\n        assertEquals(6, sum);                          // Assert\n    }\n}"
          },
          "Arrange = set up context and inputs; Act = call the method under test; Assert = check the result matches expectation.",
          "Naming: say the behaviour and condition, e.g. `addReturnsNegativeWhenBothOperandsNegative`. One behaviour per test. Avoid over-mocking. Test edge cases, not only the happy path."
        ]
      },
      {
        "heading": "Worked answer: tests for Calculator.add (2023-24 Q4c, 6 marks)",
        "items": [
          {
            "type": "code",
            "text": "class CalculatorTest {\n    private final Calculator calc = new Calculator();\n\n    @Test\n    void addsTwoPositiveNumbers() {\n        assertEquals(5, calc.add(2, 3));\n    }\n\n    @Test\n    void addsTwoNegativeNumbers() {\n        assertEquals(-5, calc.add(-2, -3));\n    }\n\n    @Test\n    void addsPositiveAndNegativeToZero() {\n        assertEquals(0, calc.add(5, -5));\n    }\n\n    @Test\n    void zeroIsIdentity() {\n        assertEquals(7, calc.add(7, 0));\n        assertEquals(0, calc.add(0, 0));\n    }\n\n    @Test\n    void integerOverflowWraps() {\n        // documents current behaviour: int overflow wraps to MIN_VALUE\n        assertEquals(Integer.MIN_VALUE, calc.add(Integer.MAX_VALUE, 1));\n    }\n}"
          },
          "Three test cases required by the question: (1) positive operands, (2) negative operands (and mixed sign), (3) zero / boundary values (MAX_VALUE overflow). Explain WHY each is chosen: different sign combinations exercise different arithmetic paths; zero is the identity; overflow is the boundary of the int type. If the requirement says overflow must be rejected, implement `Math.addExact` and `assertThrows(ArithmeticException.class, ...)`."
        ]
      },
      {
        "heading": "Boundary tests and exceptions (EmailAddress style)",
        "items": [
          {
            "type": "p",
            "text": "The rules for this hospital email example"
          },
          "The domain must be hospital.com. Total length 15 to 77 characters. The local part (before the @) may use a-z, 0-9 and one dot, and must not start or end with a dot.",
          {
            "type": "p",
            "text": "What to test"
          },
          "A **boundary test** checks values right at, and just past, a limit.",
          "**Accept**: exactly 15 characters, exactly 77 characters, a local part at its limit.",
          "**Reject**: 14 characters, 78 characters, more than one @, wrong domain, a subdomain, a leading or trailing dot, more than one dot, null, \"null\", \"0\", whitespace, an underscore.",
          {
            "type": "code",
            "text": "@Test\nvoid rejectsAddressShorterThanFifteenCharacters() {\n    assertThrows(IllegalArgumentException.class,\n        () -> new EmailAddress(\"a@hospital.com\"));   // 14 chars\n}\n\n@ParameterizedTest\n@ValueSource(strings = {\"jane@hospital.com\", \"jane01@hospital.com\", \"jane.doe@hospital.com\"})\nvoid acceptsValidAddresses(String email) {\n    assertEquals(email, new EmailAddress(email).value());\n}"
          },
          "Check rejections as well as successes, and that a rejected operation leaves existing data unchanged."
        ]
      },
      {
        "heading": "The EmailAddress class and its slide test values",
        "items": [
          {
            "type": "p",
            "text": "The idea"
          },
          "A **domain primitive** (or **value object**) is a small class for one important real-world idea, here an email address, instead of a plain String.",
          "Its constructor checks the value, with `matchesPattern(value, regex, message)` (a **regex** is a text pattern), so an invalid address can never exist.",
          "A new rule, such as rejecting null or empty, is then added in one place (versions 1, 2 and 3 of the class on the slides).",
          "Naming classes and methods after the real business terms is called **domain-driven design**.",
          {
            "type": "p",
            "text": "Values to accept"
          },
          "Exactly 15 characters: `repeat(\"X\", 2) + \"@hospital.com\"` (2 + 13).",
          "Local part of 64 characters: `repeat(\"X\", 64) + \"@hospital.com\"`, which is also exactly 77 characters (64 + 13).",
          {
            "type": "p",
            "text": "Values to reject"
          },
          "Exactly 14 characters: `a@hospital.com`. Local part of 65: `repeat(\"X\", 65) + ...`.",
          "`vv@b@hospital.com`, `repeat(\"X\", 5) + \"@hospitals.com\"`, `vv.vv@here.hospital.com`.",
          "`.jane@hospital.com`, `jane.@hospital.com`, `Jane.h.doe@hospital.com`.",
          "Also null, \"null\", \"0\", a tab, and \"Jane_Doe@hospital.com\". `StringUtils.repeat` builds the long test strings."
        ]
      },
      {
        "heading": "Mocking with Mockito",
        "items": [
          "A **mock** replaces a dependency (repository, email service, API client) so only your class is under test. Stub a return value with `when(...).thenReturn(...)`; verify an interaction with `verify(...)`.",
          {
            "type": "code",
            "text": "@ExtendWith(MockitoExtension.class)\nclass AppointmentServiceTest {\n    @Mock AppointmentRepository repo;\n    @Mock NotificationService notifier;\n    @InjectMocks AppointmentService service;\n\n    @Test\n    void booksAppointmentAndNotifiesOwner() {\n        // Arrange\n        Pet pet = new Pet(1L, \"Rex\", \"owner@mail.ie\");\n        when(repo.isSlotFree(LocalDateTime.of(2026, 1, 5, 10, 0))).thenReturn(true);\n\n        // Act\n        boolean booked = service.book(pet, LocalDateTime.of(2026, 1, 5, 10, 0));\n\n        // Assert\n        assertTrue(booked);\n        verify(repo).save(any(Appointment.class));\n        verify(notifier, times(1)).send(eq(\"owner@mail.ie\"), anyString());\n    }\n\n    @Test\n    void rejectsBookingWhenSlotTaken() {\n        when(repo.isSlotFree(any())).thenReturn(false);\n        boolean booked = service.book(new Pet(1L, \"Rex\", \"o@mail.ie\"), LocalDateTime.now());\n        assertFalse(booked);\n        verify(repo, never()).save(any());\n        verifyNoInteractions(notifier);\n    }\n}"
          },
          "A test that only reads back a stubbed value proves the configuration, not the code. Keep the behaviour under test real; mock only what crosses the test boundary."
        ]
      },
      {
        "heading": "Unit tests in CI/CD",
        "items": [
          "Run automatically on every push/PR (`mvn test` or `mvn verify` in the workflow) for fast feedback and regression protection.",
          "Metrics: code coverage (how much is executed; high coverage helps confidence but is not the only quality measure) and flakiness (tests that fail randomly erode trust)."
        ]
      }
    ],
    "pitfalls": [
      "Tests with no assertions, or asserting only that a mock returns what you stubbed.",
      "Only happy-path tests: always add negative, zero, boundary and exception cases.",
      "Tests that depend on each other, on order, on the real database, time or random values.",
      "One giant test covering many behaviours; vague names like test1."
    ]
  },
  {
    "id": "code-critique-flawed-code",
    "title": "Find what is wrong with this code (design and intent flaws)",
    "priority": 14,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q4c (5 marks): not syntax; one-liners, functional Java",
    "marks": "5 marks",
    "summary": "**Ignore syntax. Look for hidden side effects, null handling, unclear names, mutability, overloaded one-liners (streams, lambdas, Optional misuse) and untestable coupling. For each say the problem, why it matters, and the fix.**",
    "mnemonic": "SNUMOC: Side effects, Null handling, Unclear names, Mutability, Overloaded one-liners, Coupling/untestable (Some Nasty Unseen Mistakes Often Creep in)",
    "source": [
      "CT417_Notes_09a_Unit_Testing",
      "CT417_Notes_09c_Unit_Testing_Challenges",
      "CT417_Notes_10a_Software_Quality",
      "CT417_Notes_07_Software_Architecture"
    ],
    "sections": [
      {
        "heading": "How to attack it",
        "items": [
          "The first sub-part is \"identify the problem in this implementation\". The code compiles. The lecturer writes dense one-liners and functional Java (streams, lambdas, Optional) to hide the flaw, so slow down and ask: what does this actually do, and what could go wrong or surprise a caller?",
          {
            "type": "p",
            "text": "Checklist (SNUMOC)"
          },
          "**S**ide effects: does something that looks like a read also change data?",
          "**N**ull handling: missing values that cause a crash (NullPointerException, NPE).",
          "**U**nclear naming and **magic numbers** (unexplained values written straight into code).",
          "**M**utability: can outside code change this object's internal data?",
          "**O**verloaded one-liners: too much in one line, with business rules hidden inside.",
          "**C**oupling that blocks testing: creating collaborators with `new` inside methods, using today's date or printing directly.",
          "Structure of each point (1-1.5 marks): the problem, why it is a problem (bug risk / maintainability / testability), the fix (ideally a 2-5 line rewrite).",
          "Link to testing: if you cannot test a piece on its own (time, input/output or randomness built in), the design is flawed. Link to **SRP** (Single Responsibility Principle: one job each): if the name needs \"and\", the method does too much."
        ]
      },
      {
        "heading": "Example 1: hidden side effect in a getter",
        "items": [
          {
            "type": "code",
            "text": "public class Invoice {\n    private final List<LineItem> items = new ArrayList<>();\n\n    public double getTotal() {\n        double total = 0;\n        for (LineItem i : items) {\n            total += i.getPrice() * i.getQty();\n            i.setBilled(true);          // mutates state\n        }\n        items.removeIf(i -> i.getQty() == 0);   // mutates the list\n        return total;\n    }\n}"
          },
          "**Problem**: `getTotal()` reads like a query but changes state (marks items billed, removes items). Calling it twice or just to display a total changes the data.",
          "**Why**: surprising behaviour, order-dependent results, hard to test (the first call differs from the second), not thread safe.",
          "**Fix**: separate query from command: `getTotal()` is pure; `markBilled()` is an explicit method. `double total = items.stream().mapToDouble(i -> i.getPrice() * i.getQty()).sum();`",
          "A **pure** method only returns a value and changes nothing. **Thread safe** means it still works when several parts of a program run it at once.",
          "Also: `double` for money (rounding); use `BigDecimal` or integer cents."
        ]
      },
      {
        "heading": "Example 2: stream/forEach with external mutation",
        "items": [
          {
            "type": "code",
            "text": "public List<String> activeOwnerNames(List<Owner> owners) {\n    List<String> names = new ArrayList<>();\n    owners.stream()\n          .filter(o -> o.getPets().size() > 0)\n          .forEach(o -> names.add(o.getName().toUpperCase()));\n    return names;\n}"
          },
          "**Problem**: `forEach` is used to mutate an outside list from inside the lambda (side effect in a stream). It also dereferences `getName()` and `getPets()` with no null check.",
          "**Why**: breaks if someone switches to `parallelStream()` (race condition, ArrayList not thread-safe, lost elements); defeats the declarative purpose of streams; hard to reason about.",
          "A **stream** is Java's way of processing a list step by step, and a **lambda** is a small unnamed function such as `o -> o.getName()`. A **race condition** is a bug caused by two threads changing the same thing at once.",
          "**Fix**: `return owners.stream().filter(o -> !o.getPets().isEmpty()).map(o -> o.getName().toUpperCase()).collect(Collectors.toList());` and handle null names; `!isEmpty()` is clearer than `size() > 0`."
        ]
      },
      {
        "heading": "Example 3: Optional misuse",
        "items": [
          {
            "type": "code",
            "text": "public Optional<Pet> findPet(String id) {\n    Pet pet = repo.find(id);          // returns null when absent\n    return Optional.of(pet);          // (1)\n}\n\npublic String petName(String id) {\n    Optional<Pet> p = findPet(id);\n    if (p.isPresent()) {\n        return p.get().getName();\n    } else {\n        return null;                   // (2)\n    }\n}\n\nPet p = findPet(\"42\").get();           // (3)"
          },
          "`Optional` is a Java box that either holds a value or is empty, so callers must deal with \"not found\".",
          "(1) `Optional.of(null)` throws NullPointerException: use `Optional.ofNullable(pet)`.",
          "(2) Returning null from a method that already models absence defeats Optional; callers still get NPEs. isPresent/get is just a null check in disguise.",
          "(3) `.get()` with no check throws NoSuchElementException.",
          "**Fix**: `return Optional.ofNullable(repo.find(id));` and `return findPet(id).map(Pet::getName).orElse(\"unknown\");` or `.orElseThrow(() -> new PetNotFoundException(id))`. Do not use Optional for fields or method parameters."
        ]
      },
      {
        "heading": "Example 4: null handling and magic values",
        "items": [
          {
            "type": "code",
            "text": "public Visit latest(Pet pet) {\n    Visit result = null;\n    for (Visit v : pet.getVisits()) {          // visits may be null\n        if (result == null || v.getDate().isAfter(result.getDate())) result = v;\n    }\n    return result;                              // null when none\n}\n\npublic int ageInYears(Pet pet) {\n    if (pet.getBirth() == null) return -1;       // magic value\n    return Period.between(pet.getBirth(), LocalDate.now()).getYears();\n}"
          },
          "**Problems**: possible NPE on `getVisits()`; returns null for \"no visits\" so every caller must remember a null check; -1 is a magic \"error\" value that can be summed or displayed as an age; hardcoded `LocalDate.now()` makes the age test dependent on the date.",
          "**Fix**: return empty collections not null; `Optional<Visit> latest(...)` via `visits.stream().max(Comparator.comparing(Visit::getDate))`; throw `IllegalStateException` or return `OptionalInt`; inject a `Clock`."
        ]
      },
      {
        "heading": "Example 5: mutability leaks",
        "items": [
          {
            "type": "code",
            "text": "public class Clinic {\n    public static List<Appointment> ALL = new ArrayList<>();   // global mutable state\n    private final List<Vet> vets = new ArrayList<>();\n    public List<Vet> getVets() { return vets; }                // leaks internals\n    public Date opened;                                         // mutable public field\n}"
          },
          "**Problems**: `final` only stops reassigning the reference, not changing the list; any caller can `getVets().clear()`, bypassing rules; the public static list shares state between tests and threads (tests become order-dependent); `Date` is mutable.",
          "**Fix**: return `List.copyOf(vets)` or `Collections.unmodifiableList(vets)`; provide `addVet(Vet v)` with validation; remove static state (inject a repository); use `LocalDate`; make fields private; consider immutable value objects (records)."
        ]
      },
      {
        "heading": "Example 6: untestable, tightly coupled code",
        "items": [
          {
            "type": "code",
            "text": "public void sendReminders(List<Appointment> list) {\n    EmailService svc = new EmailService(\"smtp.clinic.ie\");     // hard-wired\n    for (Appointment a : list) {\n        if (a.getTime().isBefore(LocalDateTime.now().plusDays(1))) {  // wall clock\n            svc.send(a.getOwner().getEmail(), \"Reminder \" + new Random().nextInt());\n            System.out.println(\"sent to \" + a.getOwner().getEmail());\n        }\n    }\n}"
          },
          "**Problems**: creates its own collaborator, so a test would send real emails; depends on the system clock and randomness (non-repeatable, flaky); prints instead of returning/logging; returns void so there is nothing to assert; mixes selection logic with sending.",
          "**Fix**: constructor-inject an `EmailSender` interface and a `java.time.Clock`; extract `dueWithin24h(list)`; return the number sent or the list. Now a test uses a mock sender and `Clock.fixed(...)` for deterministic results.",
          "A **collaborator** is another object this one uses. **Constructor injection** means passing it in when the object is created, so a test can pass in a fake. A **flaky** test passes and fails at random."
        ]
      },
      {
        "heading": "Example 7: the overloaded one-liner",
        "items": [
          {
            "type": "code",
            "text": "public double p(List<Double> l, double d) {\n    return l.stream().filter(x -> x > d).mapToDouble(x -> x * 1.23).sum() / (l.size() == 0 ? 1 : l.size());\n}"
          },
          "**Problems**: name `p` and parameters `l`, `d` say nothing; the magic number 1.23 hides a tax rate; it filters, taxes, sums and averages in one line (SRP); divides by the TOTAL list size rather than the filtered count (probably a bug); the ternary hack silently returns 0 for an empty list; `double` for money.",
          "**Fix**: `private static final double VAT_RATE = 0.23;` `averageGrossAbove(List<Double> netPrices, double threshold)`; compute filtered list, handle empty explicitly (throw or Optional), divide by `filtered.size()`, use BigDecimal."
        ]
      },
      {
        "heading": "Other Java traps worth naming",
        "items": [
          "`==` on Strings or boxed `Integer` compares references (use `equals`, and `\"x\".equals(var)` to avoid NPE).",
          "Reusing a consumed stream throws IllegalStateException; streams are single-use.",
          "Swallowing exceptions: `catch (Exception e) {}` hides failures; catch the specific one and log or rethrow.",
          "Modifying a collection while iterating it throws ConcurrentModificationException.",
          "Boolean flag parameters (`process(order, true, false)`) are unreadable; use enums/methods.",
          "Long parameter lists, deep nesting, **god classes** (one class doing everything), duplicated code, and high **cyclomatic complexity** (many different paths through the code).",
          "Time/randomness/IO inside business logic: not repeatable, not testable.",
          "Integer division and floating point equality (`0.1 + 0.2 == 0.3` is false)."
        ]
      }
    ],
    "pitfalls": [
      "Pointing out syntax or formatting: the question says the problem is not syntactic.",
      "Naming the problem without the consequence or the fix.",
      "Saying \"one-liners are bad\" in general: say WHICH hidden behaviour is the trap.",
      "Missing the side effect hidden inside a stream (forEach/peek/map mutating state)."
    ]
  },
  {
    "id": "tdd",
    "title": "Test-Driven Development: Red, Green, Refactor",
    "priority": 15,
    "tier": "core",
    "hint": "likely",
    "freq": "hinted Q4c; 0/7 papers",
    "marks": "5-8 marks",
    "summary": "**Write a failing test first (red), write the minimum code to pass it (green), then improve the code without changing behaviour (refactor); repeat per behaviour.**",
    "mnemonic": "RED - GREEN - REFACTOR, then next RED",
    "source": [
      "CT417_Notes_09b_TDD",
      "CT417_Notes_09a_Unit_Testing"
    ],
    "sections": [
      {
        "heading": "The cycle",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "RED",
                  "sub": "write a failing test"
                },
                {
                  "label": "Run: it fails",
                  "sub": "for the expected reason"
                },
                {
                  "label": "GREEN",
                  "sub": "minimum code to pass"
                },
                {
                  "label": "Run: all pass"
                },
                {
                  "label": "REFACTOR",
                  "sub": "clean up, same behaviour"
                }
              ],
              "direction": "row",
              "loopBack": "next behaviour: new failing test"
            },
            "caption": "TDD cycle."
          },
          "**Red**: the test states the requirement and fails initially. The first run must fail for the expected reason (assertion), not a build error, otherwise the test proves nothing.",
          "**Green**: write just enough code to make the test pass; no extra features.",
          "**Refactor**: improve structure (remove duplication, clearer names) while all tests stay green; no new behaviour in this phase.",
          "A new behaviour (such as handling an empty list) starts a new cycle with a new failing test.",
          "**BDD** (behaviour-driven development) starts from a test describing a whole feature. While that one fails, you may go round the red-green-refactor cycle many times.",
          "**Given-When-Then** describes a scenario: given a starting state, when an action happens, then expect a result. It helps you design test cases, even without any BDD tool.",
          "**TDD** (test-driven development) means writing the test before the code it tests."
        ]
      },
      {
        "heading": "Why TDD and challenges",
        "items": [
          {
            "type": "p",
            "text": "Benefits"
          },
          "Every line of code has a test.",
          "Code is designed to be testable, which means loosely connected parts.",
          "Small steps and fast feedback.",
          "The tests act as up-to-date documentation of what the code should do.",
          "You can **refactor** (tidy the code without changing behaviour) safely, and fewer defects are found late.",
          {
            "type": "p",
            "text": "Challenges"
          },
          "It needs discipline and skill, and is slower at first.",
          "It is hard on **legacy** (old) or badly designed code.",
          "Using too many mocks makes **brittle** tests, which break when harmless details change.",
          {
            "type": "p",
            "text": "The iceberg"
          },
          "TDD is only the visible tip. Underneath it needs clean code, good tests, a testable design, a technology the team knows, and a team that feels safe to work this way.",
          "Best practice: write tests first, keep them small, run them often, never skip the refactor."
        ]
      },
      {
        "heading": "Worked example: GradeBook (from the lecture)",
        "items": [
          {
            "type": "p",
            "text": "Requirement: a GradeBook containing 90, 80 and 70 should report an average of 80."
          },
          {
            "type": "code",
            "text": "// RED: GradeBookTest\n@Test\npublic void calculatesAverageOfThreeGrades() {\n    GradeBook gradeBook = new GradeBook();\n    gradeBook.addGrade(90);\n    gradeBook.addGrade(80);\n    gradeBook.addGrade(70);\n    assertEquals(80.0, gradeBook.calculateAverage(), 0.0001);\n}\n\n// stub so it compiles but fails on the assertion (expected 80.0, actual -1.0)\npublic class GradeBook {\n    public void addGrade(int grade) { }\n    public double calculateAverage() { return -1.0; }\n}"
          },
          {
            "type": "code",
            "text": "// GREEN: just enough\npublic class GradeBook {\n    private final List<Integer> grades = new ArrayList<>();\n    public void addGrade(int grade) { grades.add(grade); }\n    public double calculateAverage() {\n        int sum = 0;\n        for (int grade : grades) { sum += grade; }\n        return (double) sum / grades.size();\n    }\n}\n\n// REFACTOR: same behaviour, tidier\npublic double calculateAverage() {\n    int sum = grades.stream().mapToInt(Integer::intValue).sum();\n    return (double) sum / grades.size();\n}"
          },
          {
            "type": "code",
            "text": "// NEXT RED: empty gradebook (currently returns NaN because 0/0 in double arithmetic)\n@Test\npublic void emptyGradeBookReturnsZero() {\n    assertEquals(0.0, new GradeBook().calculateAverage(), 0.0001);\n}\n// GREEN: add the guard\npublic double calculateAverage() {\n    if (grades.isEmpty()) return 0.0;\n    return (double) grades.stream().mapToInt(Integer::intValue).sum() / grades.size();\n}"
          }
        ]
      }
    ],
    "pitfalls": [
      "Writing the code first and the test after (that is not TDD).",
      "Making the test pass with too much code, or skipping refactor.",
      "Refactoring while a test is red.",
      "A first test that fails because of a compile error rather than the assertion."
    ]
  },
  {
    "id": "jacoco-coverage",
    "title": "Code coverage and JaCoCo",
    "priority": 16,
    "tier": "core",
    "hint": "likely",
    "freq": "3/7 papers (coverage in Q2 each of 2024-26); hinted JaCoCo",
    "marks": "4-8 marks",
    "summary": "**Coverage measures what the tests EXECUTE (line, branch, method, instruction, complexity), not whether assertions are right. JaCoCo instruments bytecode via a JVM agent and reports in target/site/jacoco. Use gaps as questions, not targets.**",
    "mnemonic": "LIB-MC: Line, Instruction, Branch, Method, Complexity; executed is not verified",
    "source": [
      "CT417_Notes_10b_JaCoCo",
      "WK10_Introduction_to_JaCoCo",
      "CT417_Notes_10d_Measuring_Code_Coverage",
      "CT417_Notes_10a_Software_Quality"
    ],
    "sections": [
      {
        "heading": "Coverage types",
        "items": [
          {
            "type": "table",
            "head": [
              "Type",
              "Measures"
            ],
            "rows": [
              [
                "Line (statement)",
                "% of executable lines run by the tests (excludes comments, method headers)"
              ],
              [
                "Branch",
                "Whether both true and false outcomes of every decision (if, loop, switch) ran. Twice as many branches as conditionals"
              ],
              [
                "Method / function",
                "Every method called at least once"
              ],
              [
                "Instruction",
                "Executed bytecode instructions (JaCoCo's base counter)"
              ],
              [
                "Complexity",
                "Cyclomatic complexity covered: a review guide, not a verdict"
              ]
            ]
          },
          "High coverage can signal robust testing but does not guarantee quality: coverage measures execution, not the correctness of assertions. A line can be green with no assertion at all."
        ]
      },
      {
        "heading": "Worked calculation: line vs branch",
        "items": [
          {
            "type": "task",
            "show": 1,
            "q": [
              "Find line and branch coverage after testing classify(10), then after adding classify(-1), then classify(30)."
            ],
            "own": [
              {
                "type": "formula",
                "label": "Line coverage",
                "text": "lines run / executable lines × 100"
              },
              {
                "type": "formula",
                "label": "Branch coverage",
                "text": "branch outcomes taken / all branch outcomes × 100"
              }
            ]
          },
          {
            "type": "code",
            "text": "1  int classify(int age) {\n2      if (age < 0) {\n3          throw new IllegalArgumentException();\n4      }\n5      if (age < 18) {\n6          return 0;\n7      }\n8      return 1;\n9  }"
          },
          "Executable lines: 2, 3, 5, 6, 8 = 5 lines. Branches: 2 decisions x 2 outcomes = 4.",
          "Test classify(10): lines 2, 5, 6 run = 3/5 = **60% line**; branches: first if false, second if true = 2/4 = **50% branch**.",
          "Add classify(-1): lines 2, 3, 5, 6 = 4/5 = 80%; branches +1 (first if true) = 3/4 = 75%.",
          "Add classify(30): all 5 lines = 100%; branches 4/4 = 100%.",
          "Classic trap: `if (x > 0) y = 1;` with one test x = 5 gives 100% line coverage but only 50% branch coverage (the false path never ran)."
        ]
      },
      {
        "heading": "How JaCoCo works and how to run it",
        "items": [
          "**Code coverage** is how much of your code ran while the tests ran. **JaCoCo** (Java Code Coverage) is a tool that measures it.",
          {
            "type": "p",
            "text": "How it works"
          },
          "It runs an **agent**: a helper loaded inside the **JVM** (the program that runs Java).",
          "The agent **instruments** the compiled code (**bytecode**), meaning it adds tracking, and records which instructions execute during the tests.",
          "The record is written to `target/jacoco.exec`, then turned into a web page report.",
          {
            "type": "p",
            "text": "The Maven setup"
          },
          {
            "type": "code",
            "text": "<plugin>\n  <groupId>org.jacoco</groupId>\n  <artifactId>jacoco-maven-plugin</artifactId>\n  <version>0.8.11</version>\n  <executions>\n    <execution>\n      <id>prepare-agent</id>\n      <goals><goal>prepare-agent</goal></goals>\n    </execution>\n    <execution>\n      <id>report</id>\n      <phase>test</phase>\n      <goals><goal>report</goal></goals>\n    </execution>\n  </executions>\n</plugin>"
          },
          "`prepare-agent` sets `argLine`, a start-up setting that **Surefire** (Maven's test runner) uses, so the agent is loaded.",
          "`report` reads `jacoco.exec` and writes `target/site/jacoco/index.html`. It normally runs in the verify phase; here it is attached to test, so `mvn clean test` produces the report.",
          {
            "type": "p",
            "text": "Running it and reading the report"
          },
          "Run `mvn clean test` (or `mvn clean verify`) and open `target/site/jacoco/index.html`.",
          "A failing test stops the build before the report is made. To get one anyway: `mvn clean test -Dmaven.test.failure.ignore=true`.",
          "Drill down: summary, package, class, method, source.",
          "**Green** = covered. **Yellow** = partly covered (one side of an if was missed). **Red** = never ran.",
          "The counters are Instructions, Lines, Branches and Complexity. One overall percentage can hide very different classes."
        ]
      },
      {
        "heading": "Interpreting and improving coverage",
        "items": [
          "Ask of each gap: which requirement or failure mode is this code? Would a miss violate business behaviour? Is it already tested elsewhere? Is it missing tests, maintainability debt, or code not worth acting on? A justified decision not to change anything is valid.",
          "Do not invent rules (null handling, validation) just to raise a score. 100% coverage is neither necessary nor sufficient. No arbitrary 80/90/100% target.",
          "Exam answer (explain how to use a tool to find low coverage + one strategy): run JaCoCo on the payment module, open the HTML report, sort by missed branches/lines, inspect red/yellow lines in critical business classes. Strategy: write fast, isolated unit tests (mocked dependencies) for uncovered branches and boundary rules; parameterised tests; set a `jacoco:check` rule on the critical package; run heavy integration tests nightly so the PR pipeline stays fast; run unit tests in parallel and cache dependencies.",
          "A **quality gate** such as `jacoco:check` fails the build if coverage drops below a limit you set. The **PR pipeline** is the set of automatic checks run on each pull request.",
          {
            "type": "code",
            "text": "<execution>\n  <id>check</id>\n  <goals><goal>check</goal></goals>\n  <configuration>\n    <rules>\n      <rule>\n        <element>BUNDLE</element>\n        <limits>\n          <limit>\n            <counter>BRANCH</counter>\n            <value>COVEREDRATIO</value>\n            <minimum>0.80</minimum>\n          </limit>\n        </limits>\n      </rule>\n    </rules>\n  </configuration>\n</execution>"
          },
          "Other tools: Istanbul/nyc (JavaScript), Coverage.py (Python). In CI use the existing workflow, upload the report as an artefact; do not duplicate workflows.",
          "Role of coverage in unit testing (2 marks): shows which code the tests exercise, highlights untested paths, supports refactoring confidence and CI quality gates; it is a necessary-not-sufficient indicator."
        ]
      },
      {
        "heading": "Lecturer's coverage method: the ideas and first steps (week 10 slides)",
        "items": [
          {
            "type": "p",
            "text": "Three ideas of JaCoCo"
          },
          "**Instrumentation**: tracking is added to the compiled code to see what runs during tests.",
          "**Reporting**: Maven produces summaries (instruction, line, branch, complexity) with the source code highlighted.",
          "**Interpretation**: neither a green line nor a high percentage proves the intended requirement was checked.",
          {
            "type": "p",
            "text": "Step 0: meaningful tests first"
          },
          "Run `java -version`, `mvn -version`, `mvn clean test`. Fix failing tests **before** looking at coverage.",
          "In the module's PetClinic and Exam Registry practice projects: do not create a new project, add the plugin again, write a second GitHub Actions workflow, or switch to JDK 17 just to get reports.",
          {
            "type": "p",
            "text": "Step 1: open the report"
          },
          "Start at the summary, then drill down to package, class, method, source.",
          "Slide example: instruction and branch coverage both 85%, but classes differ a lot, and one class page shows three methods in `Student` that never ran."
        ]
      },
      {
        "heading": "Lecturer's coverage method: judging and improving",
        "items": [
          {
            "type": "p",
            "text": "Step 2: \"85% instruction coverage: is that good?\""
          },
          "The percentage alone cannot answer. Ask four questions:",
          "Which requirement or way of failing does this untested code represent?",
          "Would a missed case break important business behaviour?",
          "Is it already checked by another suitable test?",
          "Is it missing test protection, a maintainability problem, or not worth acting on now?",
          "A tool finding is something to investigate, not an order to add tests.",
          {
            "type": "p",
            "text": "Steps 3 and 4"
          },
          "Add one test for an agreed business rule (Exam Registry: scores from 0 to 100 inclusive are valid; anything else must be rejected).",
          "Instruction coverage can rise (86% to 96%) while branch coverage stays at 90% (the same 2 of 20 branches still missed). So a percentage alone does not tell you which test to write.",
          {
            "type": "p",
            "text": "Step 5: name the problem correctly"
          },
          "**Missing behaviour test**: a documented rule or rejection case is not tested.",
          "**Code smell**: a warning sign in the code, such as duplication, a very long method or tangled logic.",
          "**Technical debt**: a design shortcut that keeps costing time later.",
          "Adding a test does not make code easier to change.",
          {
            "type": "p",
            "text": "Step 6: compare before and after"
          },
          "Compare the same counter at the same level (package, class or method). Record missed branches honestly, and ask whether another test or a tidy-up is worth its cost. 100% coverage is neither necessary nor sufficient."
        ]
      },
      {
        "heading": "Coverage practice projects and counters",
        "items": [
          "**Exam Registry** uses JUnit 5 (Jupiter) and JaCoCo 0.8.11. **PetClinic** uses older JUnit 4-style tests and JaCoCo 0.8.2 (JDK 11).",
          "PetClinic checkpoint command: `./mvnw --batch-mode clean verify`. Find **one** justified improvement, keep behaviour the same, and compare before and after.",
          {
            "type": "p",
            "text": "Counters (slide)"
          },
          "**Instructions**: bytecode instructions that ran.",
          "**Lines**: source lines that ran, were missed or partly ran.",
          "**Branches**: which sides of ifs and switches ran or were missed.",
          "**Complexity**: a measure of paths through the code, guiding where to look closer. It does not automatically mean the code must change."
        ]
      }
    ],
    "pitfalls": [
      "Equating high coverage with correctness.",
      "Forgetting that a method can have 100% instruction coverage but miss a branch.",
      "Saying coverage target must be 100%.",
      "Mixing up `prepare-agent` (before tests) and `report` (after tests)."
    ]
  },
  {
    "id": "test-doubles-flaky",
    "title": "Test doubles, over-mocking and flaky tests",
    "priority": 23,
    "tier": "possible",
    "freq": "est. medium (week 9)",
    "marks": "3-6 marks",
    "summary": "**Stub supplies answers, mock verifies interactions, spy wraps real objects, fake is a simple working substitute. Over-mocking hides bugs; flaky tests pass and fail randomly: fix with injected clocks and controlled async.**",
    "mnemonic": "Stub answers, Mock verifies, Spy watches, Fake works (in memory)",
    "source": [
      "CT417_Notes_09c_Unit_Testing_Challenges"
    ],
    "sections": [
      {
        "heading": "Test doubles",
        "items": [
          {
            "type": "table",
            "head": [
              "Double",
              "Role",
              "Example"
            ],
            "rows": [
              [
                "Stub",
                "Supplies predefined answers so the unit gets controlled inputs",
                "`when(repo.find(1)).thenReturn(pet)`"
              ],
              [
                "Mock",
                "Stub that also lets the test verify interactions",
                "`verify(notifier).send(...)` called once"
              ],
              [
                "Spy",
                "Wraps a real object; real behaviour with selective stubbing/verification",
                "`spy(new ArrayList<>())`"
              ],
              [
                "Fake",
                "Simplified working substitute",
                "In-memory repository"
              ]
            ]
          },
          "Why mock: isolate the unit, run fast (no real DB), repeatable outcomes. A passing mock test does not prove the real repository or network integration works: that needs integration tests."
        ]
      },
      {
        "heading": "Over-mocking",
        "items": [
          "Mocking so many collaborators that tests pass although the real objects are buggy; tests become brittle and unreadable.",
          "Do not mock critical business logic; do not test logic only through mocks; mock only the boundary (DB, network, clock).",
          "If repository and API client are both mocked, bugs in the real integration are never caught."
        ]
      },
      {
        "heading": "Flaky tests",
        "items": [
          "A flaky test passes or fails intermittently with no code change. Causes: uncontrolled services (DB, APIs), timing and timeouts, random data, async and multithreading, test-order dependence, wall-clock time.",
          "Why bad: developer time wasted diagnosing, pipelines fail randomly, trust erodes and tests get ignored.",
          "Mitigation: make inputs deterministic; **inject a `java.time.Clock`** and use `Clock.fixed(...)` in the test; isolate external services in unit tests but keep separate integration tests; control async completion explicitly rather than `Thread.sleep`; retries can diagnose infrastructure flakiness but must not hide nondeterminism.",
          {
            "type": "code",
            "text": "class Reminder {\n    private final Clock clock;\n    Reminder(Clock clock) { this.clock = clock; }\n    boolean isDue(LocalDateTime t) { return t.isBefore(LocalDateTime.now(clock).plusDays(1)); }\n}\n\n// test\nClock fixed = Clock.fixed(Instant.parse(\"2026-01-05T09:00:00Z\"), ZoneOffset.UTC);\nassertTrue(new Reminder(fixed).isDue(LocalDateTime.of(2026, 1, 5, 12, 0)));"
          }
        ]
      },
      {
        "heading": "Practical takeaways",
        "items": [
          "1. Keep the behaviour under test real. 2. Assert observable results, not merely that a stub returns what it was told. 3. Avoid wall-clock time, randomness, order dependence and arbitrary sleeps. 4. Check rejected operations and that state is unchanged after rejection."
        ]
      }
    ],
    "pitfalls": [
      "Confusing mock and stub.",
      "Adding retries instead of fixing the nondeterminism."
    ]
  },
  {
    "id": "sqa-metrics-complexity",
    "title": "Software quality assurance, code smells and cyclomatic complexity",
    "priority": 33,
    "tier": "low",
    "hint": "unlikely",
    "freq": "hinted: CC formula unlikely; est. low",
    "marks": "3-5 marks",
    "summary": "**QA is a process (prevent defects) while testing finds defects in the product. Metrics: coverage, code smells, cyclomatic complexity CC = E - N + 2P (equals decision points + 1).**",
    "mnemonic": "CC = E - N + 2P: Edges minus Nodes plus two Paths-components",
    "source": [
      "CT417_Notes_10a_Software_Quality"
    ],
    "sections": [
      {
        "heading": "SQA concepts",
        "items": [
          "**SQA** (software quality assurance): a systematic process making sure software meets quality standards at every stage. It reviews standards, tools, procedures and methods; it is not just testing at the end.",
          "**Shift left**: do quality work earlier (in design and coding), because defects are cheaper to fix then.",
          {
            "type": "p",
            "text": "QA compared with testing"
          },
          "**QA** is about the **process**, and is proactive: it prevents problems.",
          "**Testing** checks the **product**, and is reactive: it catches defects.",
          "**Proactive** activities: code reviews, writing tests first (TDD), static analysis.",
          "**Reactive** activities: bug tracking, incident reports, **regression testing** (checking old features still work), fixing things after release.",
          {
            "type": "p",
            "text": "Static and dynamic testing"
          },
          "**Static**: examine the code or documents without running them (inspection, a tool such as SonarQube).",
          "**Dynamic**: run the code (unit, integration, system, functional and non-functional tests; can find **memory leaks**, where memory is never freed)."
        ]
      },
      {
        "heading": "Code smells",
        "items": [
          "A code smell is a symptom in the source that indicates deeper problems or technical debt: long methods, duplicated code, large classes (violating Single Responsibility), excessive comments, poor naming, dead code.",
          "Smells raise complexity and make code harder to maintain and test. Missing behaviour tests, smells and technical debt are different things: a test protects behaviour but does not make the code easier to change."
        ]
      },
      {
        "heading": "Cyclomatic complexity",
        "items": [
          "**Cyclomatic complexity** counts the independent paths through some code. More decision points (if, for, while, case, &&, ||) means higher complexity and more tests needed.",
          {
            "type": "p",
            "text": "The control flow graph"
          },
          "Draw the code as a graph: each block of code is a **node**, and each possible jump from one block to another is an **edge**.",
          {
            "type": "formula",
            "label": "Cyclomatic complexity",
            "text": "CC = E - N + 2P"
          },
          "E = number of edges, N = number of nodes, P = number of separate connected graphs (1 for a single method).",
          "Shortcut: CC = number of decision points + 1.",
          "Worked: E = 8, N = 7, P = 1 gives CC = 8 - 7 + 2(1) = 3.",
          {
            "type": "table",
            "head": [
              "CC",
              "Meaning"
            ],
            "rows": [
              [
                "1-10",
                "Low: easy to understand and maintain"
              ],
              [
                "11-20",
                "Moderate: increased testing effort"
              ],
              [
                "21-50",
                "High: difficult to maintain and test, higher bug risk"
              ],
              [
                "> 50",
                "Very high: unmanageable, refactor"
              ]
            ]
          },
          "Good practice: code reviews, automatic tests in the pipeline, and dashboards (SonarQube, Jenkins) that warn when measures get worse."
        ]
      }
    ],
    "pitfalls": [
      "Forgetting the 2P term.",
      "Treating a complexity warning as an automatic refactor order."
    ]
  }
];
