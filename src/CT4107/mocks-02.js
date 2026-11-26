module.exports = [
{
  id: 'mock2', title: 'Mock Paper 2', duration: 120,
  instructions: 'FORMAT ASSUMED: no real paper was supplied for CT4107. This mock assumes: 120 minutes, answer any 3 of 5 questions, 20 marks each. Show assumptions and arithmetic. Original questions.',
  questions: [
    { n: 1, marks: 20,
      scenario: 'BinBuddy is a sensor fitted to commercial wheelie bins that reports fill level so waste companies collect only when needed. Possible customers: restaurants, hotels, supermarkets, university campuses, apartment management companies, and local councils.',
      parts: [
        { label: 'a', marks: 6, topicId: 'market-segmentation', text: 'Complete a segmentation matrix row (end user, task, benefit, urgency, size, competition) for two of the segments.',
          outline: ['End user is a person, e.g. facilities manager (1 each)', 'Task and benefit (1 each)', 'Urgency, size order of magnitude, competition incl. do nothing (1 each segment)'] },
        { label: 'b', marks: 10, topicId: 'beachhead-market', text: 'Score four segments against the seven beachhead criteria in a table, rank them and recommend a beachhead.',
          outline: ['Seven criteria (2)', 'Four candidates and consistent ratings using the Very High to Show Stopper scale (3)', 'Show stopper or elimination (1)', 'Ranking (1)', 'Winner with deciding factors (2)', 'Next adjacent market (1)'] },
        { label: 'c', marks: 4, topicId: 'beachhead-market', text: 'Explain the three conditions that define a market and test your chosen beachhead against them.',
          outline: ['Buys the same product (1)', 'Similar sales process (1)', 'Word of mouth exists (1)', 'Applied to the chosen segment (1)'] }
      ] },
    { n: 2, marks: 20,
      scenario: 'Beachhead: apartment management companies in Ireland. Assume 1,500 companies, each manages an average of 40 bins; sensor price EUR 55 per bin, expected life 5 years, plus EUR 1 per bin per month subscription. A competitor survey suggests customers budget EUR 20 per bin per year for waste optimisation, of which 40% could go to this solution.',
      parts: [
        { label: 'a', marks: 6, topicId: 'tam-sam-som', text: 'Annualise the revenue per bin using (i) the one-time charge, (ii) the subscription, and (iii) the budget method.',
          outline: ['(i) 55/5 = EUR 11 per bin per year (2)', '(ii) 1 x 12 = EUR 12 per year, so one-time plus subscription = EUR 23 (2)', '(iii) 20 x 0.4 = EUR 8 per year (2)'] },
        { label: 'b', marks: 6, topicId: 'tam-sam-som', text: 'Choose a consensus revenue per bin with reasons and compute TAM.',
          outline: ['Notes range 8-23 (1)', 'Chooses a defensible figure, e.g. EUR 15 and explains that budget caps willingness to pay (2)', 'Units = 1,500 x 40 = 60,000 bins (1)', 'TAM = 60,000 x 15 = EUR 900,000 per year (2)'] },
        { label: 'c', marks: 4, topicId: 'tam-sam-som', text: 'If only companies in Dublin and Cork (45% of the market) can be served and you expect a 12% share, compute SAM and SOM.',
          outline: ['SAM = 900,000 x 0.45 = EUR 405,000 (2)', 'SOM = 405,000 x 0.12 = EUR 48,600 (2)'] },
        { label: 'd', marks: 4, topicId: 'tam-sam-som', text: 'Discuss two weaknesses of this estimate.',
          outline: ['Assumed price and share not validated (1)', 'Bins per company average hides variation (1)', 'Ignores competitors or replacement cycle (1)', 'Suggest validation by interviews / landing page (1)'] }
      ] },
    { n: 3, marks: 20,
      parts: [
        { label: 'a', marks: 8, topicId: 'customer-persona', text: 'Create a persona for an apartment property manager, and list the six parts of an end-user profile.',
          outline: ['Named persona with background and demographics (2)', 'Psychographics, goals, pains (3)', 'Weighted priorities summing to 100 (1)', 'Six profile parts named (2)'] },
        { label: 'b', marks: 6, topicId: 'primary-market-research', text: 'Describe three primary market research methods you would use to validate the persona and segment.',
          outline: ['Three methods, e.g. contextual interviews at the bin store, observation of collection days, landing page test (1 each)', 'What each reveals (0.5 each)', 'PMR never ends and underlies the steps (0.5)'] },
        { label: 'c', marks: 6, topicId: 'life-cycle-use-case', text: 'Give stages 1 to 5 of the full life-cycle use case for the persona.',
          outline: ['Need and catalyst, e.g. overflowing bins complaint (1)', 'Find (1)', 'Analyse competitors/alternatives (1)', 'Acquire (1)', 'Pay (1)', 'Who/when/where/how specified (1)'] }
      ] },
    { n: 4, marks: 20,
      parts: [
        { label: 'a', marks: 8, topicId: 'qvp', text: 'Write a QVP for BinBuddy. As-is: 3 fixed collections per week cost EUR 30 each; to-be: collect when 80% full. Assume 2 collections per week on average with the sensor.',
          outline: ['Priority identified: collection cost (1)', 'As-is annual cost 3 x 30 x 52 = EUR 4,680 per bin cluster (2)', 'To-be 2 x 30 x 52 = EUR 3,120 (2)', 'Saving EUR 1,560 per year = 33% (2)', 'One-sentence QVP and note on validation (1)'] },
        { label: 'b', marks: 6, topicId: 'core-competitive-position', text: 'Define a competitive moat with its three dimensions and suggest a core for BinBuddy. Include the competitive position chart axes.',
          outline: ['Moat definition (1)', 'Unique, grows, important (2)', 'Core suggestion e.g. route optimisation data (1)', 'Axes from persona priorities, do nothing plotted (2)'] },
        { label: 'c', marks: 6, topicId: 'windows-of-opportunity', text: 'Identify a window of opportunity and a trigger for selling BinBuddy.',
          outline: ['Define window and trigger (2)', 'Window e.g. waste-charge increase, contract renewal (2)', 'Trigger e.g. free pilot month, limited places (2)'] }
      ] },
    { n: 5, marks: 20,
      parts: [
        { label: 'a', marks: 8, topicId: 'creativity-ideation', text: 'Describe the five-step creative process and the four elements of creativity.',
          outline: ['Objective, data gathering, problem design, ideation, selection (2.5)', 'One-line each description (2.5)', 'Problem finding/solving, relevance, value, novelty (2)', 'Spend time on problem first (1)'] },
        { label: 'b', marks: 6, topicId: 'ideation-techniques', text: 'Apply four SCAMPER prompts to a wheelie bin.',
          outline: ['Four valid prompts with distinct, sensible ideas (1.5 each)'] },
        { label: 'c', marks: 6, topicId: 'intro-innovation', text: 'Explain Innovation = Invention x Commercialisation and illustrate with an example.',
          outline: ['Invention is a creative idea (1)', 'Innovation makes it feasible and valued by customers (1)', 'Product of both: zero if not commercialised (2)', 'Example e.g. 3M adhesive to Post-it (2)'] }
      ] }
  ]
}
];
