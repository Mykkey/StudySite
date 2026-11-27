// "Big picture" graphic per topic. G = boxes of short points, F = step-by-step flow.
const G = (...g) => ({ kind: 'groups', data: { groups: g.map(([title, items]) => ({ title, items: items.split('|') })) } });
const F = (...s) => ({ kind: 'flow', data: { direction: 'col', steps: s.map((x, i) => { const [label, sub] = x.split(':'); return { label, sub, color: i % 5 }; }) } });
module.exports = {
  'delays-smoothing': G(['Material delay', 'Holds items for a while|Stock = Inflow x Delay at steady state'], ['Information delay', 'Smooths a signal|Change = (Input - Smoothed) / ST']),
  'threshold-policies': G(['Epidemic grows if', 'R0 x S / N > 1'], ['Cut the inflow', 'Fewer contacts c|Lower infectivity i|Fewer susceptibles S'], ['Raise the outflow', 'Shorter infectious time d']),
  'disease-model-variants': G(['SIR', 'Immunity is permanent'], ['SIS', 'No immunity|Endemic equilibrium'], ['SEIR', 'Adds a latent period'], ['All assume', 'Homogeneous mixing|Constant parameters']),
  'implementation-tools': G(['Vensim', 'Stock and flow diagram|Built-in Euler|Sensitivity tools'], ['Python', 'Explicit time loop|Easy parameter sweeps']),
  'bg-modelling-process': F('Real system', 'Model:simplified, built for a purpose', 'Simulate:run it over time', 'Integrate:stocks and flows in small time steps'),
  'bg-stochastic-abm': G(['Deterministic', 'Aggregate|Same inputs, same output'], ['Stochastic', 'Randomness|Runs differ'], ['Agent-based', 'Individuals with own rules']),
};
