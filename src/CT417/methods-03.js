module.exports = [
  {
    id: 'write-junit-tests',
    topicId: 'unit-testing-junit',
    title: 'Write JUnit 5 tests for a method',
    when: 'Q4c: write/design unit tests (e.g. Calculator, discount, validator)',
    mnemonic: 'NBEZ: Normal, Boundary, Error, Zero/empty; each as Arrange-Act-Assert',
    steps: [
      '1. Read the contract: inputs, outputs, rules, exceptions.',
      '2. List cases: normal, boundary (min, max, just outside), invalid (null, negative), empty/zero, special (overflow).',
      '3. One @Test per behaviour with a descriptive name.',
      '4. Arrange the object and inputs; Act by calling once; Assert with the right assertion (delta for doubles, assertThrows for errors).',
      '5. Use @BeforeEach for shared setup; @ParameterizedTest for many inputs.',
      '6. Mock external dependencies; do not mock the unit under test.',
      '7. Say what each test proves in one line.'
    ],
    example: {
      problem: 'Write tests for `double discount(int ageYears, double price)` of a vet clinic: under 2 years or over 10 years of age get 20% off; price below 0 throws IllegalArgumentException.',
      solution: [
        '`@Test void youngPetGetsTwentyPercentOff() { assertEquals(80.0, calc.discount(1, 100.0), 0.001); }` (normal rule)',
        '`@Test void seniorPetGetsTwentyPercentOff() { assertEquals(80.0, calc.discount(11, 100.0), 0.001); }`',
        '`@Test void adultPetPaysFullPrice() { assertEquals(100.0, calc.discount(5, 100.0), 0.001); }`',
        'Boundaries: `discount(2, 100.0)` expects 100.0 (age 2 is not under 2); `discount(10, 100.0)` expects 100.0 (not over 10); `discount(1, ...)` and `discount(11, ...)` already cover the other side.',
        '`@Test void zeroPriceIsZero() { assertEquals(0.0, calc.discount(1, 0.0), 0.001); }`',
        '`@Test void negativePriceThrows() { assertThrows(IllegalArgumentException.class, () -> calc.discount(5, -1.0)); }`',
        'Parameterised alternative: `@ParameterizedTest @CsvSource({"1,100,80", "2,100,100", "10,100,100", "11,100,80"})`.'
      ]
    }
  },
  {
    id: 'write-mockito-test',
    topicId: 'unit-testing-junit',
    title: 'Write a unit test with a mocked dependency',
    when: 'The class under test calls a repository, email service or API',
    mnemonic: 'Mock the edges, verify the effects',
    steps: [
      '1. Identify the dependencies injected into the class (constructor injection).',
      '2. Declare them as @Mock and the class as @InjectMocks with @ExtendWith(MockitoExtension.class).',
      '3. Arrange: stub with `when(...).thenReturn(...)`.',
      '4. Act: call the method.',
      '5. Assert on the returned result (not on the stub).',
      '6. Verify interactions that matter: `verify(mock).method(...)`, `never()`, `times(n)`.',
      '7. Add a rejection test and check state is unchanged.'
    ],
    example: {
      problem: 'Test `ReminderService.sendReminders(List<Appointment>)` which uses an EmailSender and a Clock; only appointments within 24 hours are emailed.',
      solution: [
        'Arrange: `Clock clock = Clock.fixed(Instant.parse("2026-01-05T09:00:00Z"), ZoneOffset.UTC); EmailSender sender = mock(EmailSender.class); ReminderService svc = new ReminderService(sender, clock);`',
        'Data: appointment A at 2026-01-05T12:00 (within 24 h) and B at 2026-01-08T12:00 (outside).',
        'Act: `int sent = svc.sendReminders(List.of(A, B));`',
        'Assert: `assertEquals(1, sent);`',
        'Verify: `verify(sender, times(1)).send(eq(A.ownerEmail()), anyString()); verify(sender, never()).send(eq(B.ownerEmail()), anyString());`',
        'Why: the fixed clock makes the test repeatable; the mock isolates email; assertions check the observable result and the interaction.'
      ]
    }
  },
  {
    id: 'critique-code',
    topicId: 'code-critique-flawed-code',
    title: 'Find what is wrong with this code (design critique)',
    when: 'Q4c part: "given this code, identify the problem in this implementation" (not syntax), 5 marks',
    mnemonic: 'SNUMOC: Side effects, Null, Unclear names, Mutability, One-liner overload, Coupling',
    steps: [
      '1. Say in one line what the code is meant to do (intent).',
      '2. Scan SNUMOC: side effects (mutation in getters/streams), null/Optional misuse, naming and magic values, mutable leaks and static state, overloaded one-liners, hard-wired time/IO/new.',
      '3. For each flaw write: PROBLEM, WHY (bug risk, surprise, untestable), FIX.',
      '4. Give a short corrected snippet for the most important flaw.',
      '5. Mention how the fix makes unit testing possible.',
      '6. Aim for 4-5 distinct points; one mark each.'
    ],
    example: {
      problem: 'public Optional<Owner> find(String id) { return Optional.of(repo.get(id)); }  /  public List<String> emails() { List<String> out = new ArrayList<>(); owners.stream().filter(o -> o.getEmail() != null).forEach(o -> out.add(o.getEmail().toLowerCase())); lastRun = new Date(); return out; }',
      solution: [
        'Intent: look up an owner, and list all owner emails in lower case.',
        'Flaw 1 (null/Optional): `Optional.of(...)` throws NPE when `repo.get` returns null, so absence is never expressed. Fix: `Optional.ofNullable(repo.get(id))`.',
        'Flaw 2 (stream side effect): `forEach` mutates an external list; breaks with parallel streams and is not declarative. Fix: `owners.stream().map(Owner::getEmail).filter(Objects::nonNull).map(String::toLowerCase).collect(toList())`.',
        'Flaw 3 (hidden side effect): a method called `emails()` silently updates `lastRun`; calling it to display data changes state. Fix: separate the command or remove the field.',
        'Flaw 4 (untestable): `new Date()` hard-codes the clock so the result cannot be asserted deterministically. Fix: inject a `Clock`.',
        'Flaw 5 (mutability): the returned list type is mutable and `owners` may be exposed; return `List.copyOf` / unmodifiable. Also name `find` does not say what it finds by.'
      ]
    }
  },
  {
    id: 'tdd-worked-cycle',
    topicId: 'tdd',
    title: 'Demonstrate TDD (red, green, refactor) for a requirement',
    when: 'Asked to show or explain TDD for a small feature with code',
    mnemonic: 'RED - GREEN - REFACTOR - next RED',
    steps: [
      '1. Write the requirement as one concrete example (input and expected output).',
      '2. RED: write the test; add a stub so it compiles; run and show it fails on the assertion.',
      '3. GREEN: write the least code that passes; run; all tests green.',
      '4. REFACTOR: tidy names/duplication without changing behaviour; tests stay green.',
      '5. Repeat for the next behaviour (edge case, error case).',
      '6. Finish by listing benefits (design, regression safety, living documentation).'
    ],
    example: {
      problem: 'Requirement: DoseCalculator returns 10 mg per kg of body weight for a dog; weight must be positive.',
      solution: [
        'RED 1: `assertEquals(150.0, new DoseCalculator().dose(15.0), 0.001);` with stub `double dose(double kg) { return -1; }` fails: expected 150.0 but was -1.0.',
        'GREEN 1: `double dose(double kg) { return kg * 10; }` passes.',
        'REFACTOR: extract `private static final double MG_PER_KG = 10;` and use it; run tests: still green.',
        'RED 2: `assertThrows(IllegalArgumentException.class, () -> calc.dose(0));` fails because 0 returns 0.',
        'GREEN 2: add `if (kg <= 0) throw new IllegalArgumentException("weight must be positive");` passes.',
        'REFACTOR: nothing needed. Result: two tests document the rules and protect future changes.'
      ]
    }
  },
  {
    id: 'coverage-calculation',
    topicId: 'jacoco-coverage',
    title: 'Calculate line and branch coverage for a method and tests',
    when: 'Given code and a test set, compute line/branch coverage or choose tests for 100%',
    mnemonic: 'Count lines run / executable lines; count outcomes taken / (2 x decisions)',
    steps: [
      '1. List executable lines (exclude braces, comments, method header unless told).',
      '2. List decisions (if, loop condition, case); branches = 2 per decision.',
      '3. For each test, trace which lines and which branch outcomes run.',
      '4. Union across tests.',
      '5. Line coverage = executed lines / executable lines; branch coverage = outcomes taken / total outcomes.',
      '6. To reach 100% pick inputs that take each outcome (true and false).'
    ],
    example: {
      problem: 'int classify(int age): lines: L2 if (age < 0), L3 throw, L5 if (age < 18), L6 return 0, L8 return 1. Tests: classify(10) only. Then add tests to reach 100%.',
      solution: [
        'Executable lines 5 (L2, L3, L5, L6, L8); decisions 2 so 4 branches.',
        'classify(10): runs L2, L5, L6 = 3/5 = 60% lines; branches: L2 false, L5 true = 2/4 = 50%.',
        'Add classify(-1): runs L2, L3 (union L2, L3, L5, L6 = 4/5 = 80%); branch L2 true added = 3/4 = 75%.',
        'Add classify(30): runs L8 (all 5 lines = 100%); branch L5 false added = 4/4 = 100%.',
        'Three tests (-1, 10, 30) give 100% line and 100% branch coverage. Note 100% does not prove the assertions are right.'
      ]
    }
  },
  {
    id: 'coverage-strategy-answer',
    topicId: 'jacoco-coverage',
    title: 'Explain how to find and raise low coverage (JaCoCo)',
    when: '"Explain how you would use a coverage tool to find low-coverage areas and propose a strategy to increase coverage without slowing the pipeline"',
    mnemonic: 'Measure, Locate, Judge, Test, Gate',
    steps: [
      '1. Measure: add JaCoCo (prepare-agent + report), run `mvn clean test`, open target/site/jacoco/index.html (or Istanbul/nyc, Coverage.py).',
      '2. Locate: drill from summary to package, class, method, source; look for red lines and yellow branches in the critical module.',
      '3. Judge: for each gap ask which requirement/risk it represents and whether it is already covered.',
      '4. Test: write fast isolated unit tests (mocks, parameterised tests) for important uncovered branches and boundaries.',
      '5. Gate: `jacoco:check` rule on the critical package; run in CI on PRs; upload the report.',
      '6. Keep the pipeline fast: unit tests only on PR; slow integration tests nightly; parallel execution; dependency cache.'
    ],
    example: {
      problem: 'The payment module has low coverage. Explain how you would find and fix it (5 marks).',
      solution: [
        'Run the build with the coverage agent; open the report and sort the payment package by missed branches.',
        'Find e.g. `refund()` with red lines and `applyDiscount()` with half-covered branches.',
        'Decide which are business-critical (refund limits, rounding, currency).',
        'Add parameterised unit tests for each missed branch and boundary, mocking the gateway so they run in milliseconds.',
        'Add a JaCoCo check requiring 80% branch coverage on the payment package so it cannot regress; heavier gateway integration tests run nightly so PR feedback stays fast.'
      ]
    }
  }
];
