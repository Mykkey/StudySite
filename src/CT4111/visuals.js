// "Big picture" graphic per topic. G = boxes of short points, F = step-by-step flow.
const G = (...g) => ({ kind: 'groups', data: { groups: g.map(([title, items]) => ({ title, items: items.split('|') })) } });
const F = (...s) => ({ kind: 'flow', data: { direction: 'col', steps: s.map((x, i) => { const [label, sub] = x.split(':'); return { label, sub, color: i % 5 }; }) } });
module.exports = {
  'adr-genai': G(['An ADR records', 'Title, status, date, deciders|Context|Decision|Alternatives, pros and cons|Consequences'], ['GenAI helps', 'Consistency|Research|Onboarding|Governance'], ['Risk', 'Hallucination|Accountability gap']),
  'sdlc-genai': F('Requirements', 'Design', 'Coding', 'Testing', 'Deployment', 'Feedback'),
  'se-principles-changed': G(['Weakens', 'DRY: copies are cheap'], ['Shifts', 'Abstraction: to specs and modular context'], ['Strengthens', 'Requirements before code: prompt = spec'], ['Extends', 'Infrastructure as code: prompts, skills, agent config']),
  'test-suite-prompting': F('Role, task and class', 'Language and framework', 'Context and business rules:name them', 'Scenarios and edge cases', 'What to avoid:shallow asserts', 'Quality rules and output format'),
  'bitter-lesson': G(['The lesson', 'General methods that use computation win'], ['Those methods', 'Search|Learning'], ['In SE', 'Hand-built scaffolding gets swept away|Specifying and verifying remain']),
  'legal-risks': G(['Copyright and licences', 'Contaminated generated code'], ['GDPR', 'Personal data|Automated decisions'], ['EU AI Act', 'Credit scoring is high-risk'], ['Liability', 'Harmful outputs']),
  'programmatic-prompts': F('Your code builds the prompt', 'Calls the LLM API', 'LLM returns structured output', 'Code parses it', 'Next step uses it'),
  'bias-fairness': G(['Comes from', 'Stereotypes|Representation|Historical bias|Proxies'], ['Appears in', 'Answers|Generated code'], ['Note', 'Local hosting gives privacy, not freedom from bias']),
  'verifiable-tasks': F('Task has an automatic check:compile, tests, proof', 'Cheap reward signal', 'Reinforcement learning and self-play', 'Rapid improvement:this is why coding moved fast'),
  'prompt-engineering': F('Instruction', 'Context', 'Input data', 'Output indicator', 'Iterate:test, analyse, improve'),
  'test-oracle-quality': G(['Oracle problem', 'Is this result correct?|AI may not know intent'], ['Result', 'Shallow tests that pass'], ['Good tests are', 'Trustworthy|Maintainable|Refactor-resilient|Thorough']),
  'implementation-workflows': F('Reviewer:least AI autonomy', 'Support', 'Junior developer', 'Test-driven', 'Vibecoding:most AI autonomy'),
  'privacy-security-risks': G(['Leaks', 'PII|Proprietary code|Samsung case'], ['Leak fixes', 'Private LLM|Zero-retention API|PII-filtering proxy'], ['Code risks', 'Supply chain|Injection|Unpatched flaws: scan and review']),
  'llm-concepts': G(['Basics', 'Predicts next token|Limited context window'], ['Failure modes', 'Jagged frontier|Confident hallucination'], ['What helps', 'Chain of thought|Tools and RAG|Agentic harness']),
  'qa-criteria-failure-analysis': G(['QA architect', 'Acceptance criteria|Edge cases|Severity|Automation level'], ['Failure analyst', 'Stack trace + test + code|Bug in test or code?|Suggested fix']),
  'maintenance-debt-triage': G(['Fact', 'Maintenance is 60-80% of cost'], ['Danger', 'AI code speeds up duplication and debt'], ['Response', 'Use AI to maintain too|Change management|Good bug reports']),
  'version-control-ai': F('Commit before AI works', 'Give it its own branch', 'Review the diff:treat it like a junior', 'Merge only if it holds up'),
  'professional-environment': G(['Ethics', 'Legal is not the same as ethical|You stay accountable'], ['Honesty', 'Declare AI use|Avoid AI slop|Academic integrity'], ['Environment', 'Energy and water|Mostly inference|Use smallest model that works']),
  'fintech-flow-case': G(['1. Supply chain', 'Hallucinated dependency'], ['2. IP', 'AGPL code copied'], ['3. Bias', 'Postcode as proxy'], ['4. EU AI Act', 'No logging or oversight']),
  're-fundamentals': F('Elicitation', 'Interpretation', 'Negotiation', 'Documentation', 'Validation', 'Management:change and tracing, throughout'),
  'reverse-engineering-recovery': G(['Reverse engineering', 'Recover design and requirements from code'], ['Re-engineering', 'Refactor|Migrate|Retire'], ['GenAI', 'Summarise and classify|Best with traditional tools']),
  'ai-code-review': F('Machines read most code', 'Layered checks', 'Human approval scaled to risk', 'Fast rollback:goal is less human time, no more reverts'),
  'dot-and-swarm': G(['Dot', 'A personal agent'], ['Swarm', '10,000 agents on Navier-Stokes'], ['Humans still', 'Choose the target|Check results'], ['Open issue', 'Principal-agent problem']),
  'agents-and-tools': G(['Generative AI', 'Reactive|Stateless per call'], ['Agentic AI', 'Perceive, plan, act loop|Memory|Tools']),
};
