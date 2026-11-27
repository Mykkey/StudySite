// "Big picture" graphic per topic. G = boxes of short points, F = step-by-step flow.
const G = (...g) => ({ kind: 'groups', data: { groups: g.map(([title, items]) => ({ title, items: items.split('|') })) } });
const F = (...s) => ({ kind: 'flow', data: { direction: 'col', steps: s.map((x, i) => { const [label, sub] = x.split(':'); return { label, sub, color: i % 5 }; }) } });
module.exports = {
  'market-segmentation': F('Brainstorm many segments', 'Fill the matrix:end user, task, benefit, urgency, size, competition', 'Narrow to 5-6 candidates'),
  'customer-persona': G(['A persona is', 'One named, realistic person|From the beachhead market'], ['Describe', 'Demographics|Psychographics|Goals, pains, behaviours|A picture'], ['Use', 'Touchstone for every decision']),
  'end-user-profile': G(['Who', 'Demographics|Psychographics'], ['Their world', 'Proxy products|Watering holes|Day in the life'], ['Priorities', 'Weighted, summing to 100']),
  'business-model-basics': G(['Business model', 'How value is created, delivered, captured'], ['Revenue model', 'How money is made|Pricing and channels'], ['Business plan', 'Long document|Strategy and forecasts']),
  'disciplined-entrepreneurship': F('Idea', 'Segmentation, beachhead, end-user profile', 'Persona and use case', 'Quantified value proposition and spec', 'Business Model Canvas', 'Video pitch'),
  'windows-of-opportunity': F('Window opens:buyer is open to your offer', 'Trigger:an action that creates urgency', 'Examples:discount, limited supply, time limit, free stuff, sales rep'),
  'ideation-techniques': G(['SCAMPER', 'Substitute|Combine|Adapt|Modify|Put to another use|Eliminate|Reverse'], ['SIT', 'Subtraction|Division|Multiplication|Unification|Attribute dependency']),
  'types-of-innovation': G(['What changes', 'Product|Process|Service|Business model'], ['How it changes', 'Incremental / sustaining|Frugal|Reinnovation|Disruptive']),
  'pitch-video-deliverables': G(['2-minute video', 'Clear and upfront'], ['Cover', 'Idea|USP|Competition|Facts, figures, references'], ['Vital', 'Sound quality']),
};
