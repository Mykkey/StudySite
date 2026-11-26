module.exports = [
{
  id: 'mock3', title: 'Mock Paper 3', duration: 120,
  instructions: 'FORMAT ASSUMED: no real paper was supplied for CT4107. This mock assumes: 120 minutes, answer any 3 of 5 questions, 20 marks each. Show assumptions and arithmetic. Original questions.',
  questions: [
    { n: 1, marks: 20,
      scenario: 'TutorMatch is an app that matches secondary-school Leaving Cert students with university students as paid tutors, with scheduling, payment and ratings built in. Candidate segments: Leaving Cert students in Dublin, rural Leaving Cert students, parents of Junior Cert students, adult learners, international students, and schools.',
      parts: [
        { label: 'a', marks: 4, topicId: 'market-segmentation', text: 'What is the difference between the end user and the economic buyer? Identify both for two of the segments.',
          outline: ['End user uses product; economic buyer pays (2)', 'Two segments with both identified, e.g. student/parent (2)'] },
        { label: 'b', marks: 10, topicId: 'beachhead-market', text: 'Select a beachhead market. Show a scoring table of at least four segments against the seven criteria and discuss the deciding factors.',
          outline: ['Seven criteria (2)', 'Table 4 candidates with ratings (3)', 'Show stopper treatment (1)', 'Ranking (1)', 'Deciding factors tied to access, value, competition, strategic value (3)'] },
        { label: 'c', marks: 6, topicId: 'primary-market-research', text: 'Describe how you would validate your choice with primary market research before committing.',
          outline: ['Customer interviews with open questions (2)', 'Landing page test with email/payment capture (2)', 'Observation or user test (1)', 'Never-ending iterative research (1)'] }
      ] },
    { n: 2, marks: 20,
      scenario: 'Beachhead: Leaving Cert students in Dublin who want maths tuition. Assume 25,000 Leaving Cert students in Dublin, 30% take paid tuition, those who do buy 20 sessions a year, and TutorMatch takes EUR 6 commission per session. You can reach 60% of them through partner schools and expect 5% share in year 3.',
      parts: [
        { label: 'a', marks: 8, topicId: 'tam-sam-som', text: 'Compute TAM in EUR per year with a clear bottom-up calculation.',
          outline: ['Users N = 25,000 x 0.30 = 7,500 (2)', 'F = 20 sessions, price EUR 6 (2)', 'TAM = 7,500 x 20 x 6 = EUR 900,000 (4)'] },
        { label: 'b', marks: 6, topicId: 'tam-sam-som', text: 'Compute SAM and SOM.',
          outline: ['SAM = 900,000 x 0.6 = EUR 540,000 (3)', 'SOM = 540,000 x 0.05 = EUR 27,000 (3)'] },
        { label: 'c', marks: 6, topicId: 'tam-sam-som', text: 'Explain what the result says about the viability of the beachhead and propose a follow-on market.',
          outline: ['SOM small, so revenue limited (2)', 'Assumptions to validate (1)', 'Follow-on: other counties, other subjects, Junior Cert (2)', 'Beachhead small is fine if it yields references and word of mouth (1)'] }
      ] },
    { n: 3, marks: 20,
      parts: [
        { label: 'a', marks: 6, topicId: 'customer-persona', text: 'Write a persona for the beachhead and explain why a persona is used.',
          outline: ['Named persona with demographics, psychographics (2)', 'Goals and pains (2)', 'Priorities weighted (1)', 'Why: focus, touchstone for decisions (1)'] },
        { label: 'b', marks: 8, topicId: 'life-cycle-use-case', text: 'Describe stages 6 to 10 of the full life-cycle use case, each with who, when, where, how.',
          outline: ['Install/set up (1.5)', 'Use and get value (1.5)', 'Determine value gained (1.5)', 'Buy more (1.5)', 'Tell others (1.5)', 'Who/when/where/how specified (0.5)'] },
        { label: 'c', marks: 6, topicId: 'windows-of-opportunity', text: 'Explain windows of opportunity and triggers and give one of each for TutorMatch.',
          outline: ['Window definition (1)', 'Trigger definition (1)', 'Window e.g. start of Leaving Cert year / mock exams (2)', 'Trigger e.g. first session free, limited tutors (2)'] }
      ] },
    { n: 4, marks: 20,
      parts: [
        { label: 'a', marks: 8, topicId: 'qvp', text: 'Write a QVP for TutorMatch using a priority of your choice and assumed numbers. Explain why quantification matters.',
          outline: ['Priority #1 e.g. time to find a qualified tutor or cost per hour (1)', 'As-is X with number (2)', 'To-be Y with number (2)', 'Difference and sentence (1)', 'Why: cannot demonstrate value without measuring (1)', 'Validate with customers / no priority decreases (1)'] },
        { label: 'b', marks: 6, topicId: 'product-spec-mvbp', text: 'Describe what a high-level product specification should contain and what it should avoid. Define the MVBP.',
          outline: ['Visual, customer view, benefits (2)', 'Avoid price, detail, building (1)', 'MVBP: value, payment, feedback loop (3)'] },
        { label: 'c', marks: 6, topicId: 'core-competitive-position', text: 'State TutorMatch\'s core and plot its competitive position against three alternatives and do nothing.',
          outline: ['Core identified and moat test (2)', 'Axes: persona priorities (1)', 'Three alternatives (e.g. grinds agencies, YouTube, school study) plus do nothing (2)', 'Own position justified (1)'] }
      ] },
    { n: 5, marks: 20,
      parts: [
        { label: 'a', marks: 10, topicId: 'business-model-canvas', text: 'Fill in a Business Model Canvas for TutorMatch. Explain how the revenue streams and cost structure link to the other blocks.',
          outline: ['All nine blocks (5)', 'Two-sided: students/parents and tutors (1)', 'Revenue: commission, premium subscription (1)', 'Costs: platform, payment fees, acquisition (1)', 'Links: costs map to activities/resources; revenue to segments (2)'] },
        { label: 'b', marks: 5, topicId: 'disciplined-entrepreneurship', text: 'Outline the Disciplined Entrepreneurship process and argue that entrepreneurship can be taught.',
          outline: ['24 steps and six questions (2)', 'Steps 1-11 order (1)', 'Process not magic (Aulet) (1)', 'Common language and structure (1)'] },
        { label: 'c', marks: 5, topicId: 'types-of-innovation', text: 'Distinguish frugal, reinnovation and disruptive innovation with examples.',
          outline: ['Frugal: low cost for overlooked consumers, GE ECG (1.5)', 'Reinnovation: reuse materials, ocean plastic yarn (1.5)', 'Disruptive: low-end entrant displaces incumbent, Airbnb (1.5)', 'Distinction clear (0.5)'] }
      ] }
  ]
}
];
