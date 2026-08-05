const fs = require('fs');

const file = 'scripts/generate-pages.js';
let content = fs.readFileSync(file, 'utf8');

const additionalRoutes = 
  { outDir: 'team', path: '/team', title: 'Team — \', description: 'The current team at Axiom.' },
  { outDir: 'team/2025-legacy', path: '/team/2025-legacy', title: '2025 Legacy — \', description: 'The 2025 legacy of Axiom.' },
  { outDir: 'team/2024', path: '/team/2024', title: '2024 Team — \', description: 'The 2024 team of Axiom.' },
  { outDir: 'team/2023', path: '/team/2023', title: '2023 Team — \', description: 'The 2023 team of Axiom.' },
  { outDir: 'events/2023', path: '/events/2023', title: 'Events 2023 — \', description: 'Events from 2023.' },
  { outDir: 'events/2024', path: '/events/2024', title: 'Events 2024 — \', description: 'Events from 2024.' },
  { outDir: 'events/2025', path: '/events/2025', title: 'Events 2025 — \', description: 'Events from 2025.' },
  { outDir: 'events/2026', path: '/events/2026', title: 'Events 2026 — \', description: 'Events from 2026.' },
  { outDir: 'games/butterfly-job', path: '/games/butterfly-job', title: 'Butterfly Job — \', description: 'Butterfly Job Game.' },
  { outDir: 'games/fallacy-detective', path: '/games/fallacy-detective', title: 'Fallacy Detective — \', description: 'Fallacy Detective Game.' },
  { outDir: 'games/philosopher-match', path: '/games/philosopher-match', title: 'Philosopher Match — \', description: 'Philosopher Match Game.' },
  { outDir: 'games/concept-map', path: '/games/concept-map', title: 'Concept Map — \', description: 'Concept Map Game.' },
  { outDir: 'games/argument-reconstruction', path: '/games/argument-reconstruction', title: 'Argument Reconstruction — \', description: 'Argument Reconstruction Game.' },
  { outDir: 'games/paradigm-shift', path: '/games/paradigm-shift', title: 'Paradigm Shift — \', description: 'Paradigm Shift Game.' },
  { outDir: 'privacy', path: '/privacy', title: 'Privacy Policy — \', description: 'Privacy Policy.' },
  { outDir: '404', path: '/404', title: 'Not Found — \', description: 'Page not found.' }
];

content = content.replace(']', additionalRoutes);

// Remove the old /about/2024, /about/2023, /about since they are replaced by /team
content = content.replace(/\{[^}]*outDir: 'about'[^}]*\},/g, '');
content = content.replace(/\{[^}]*outDir: 'about\/202[34]'[^}]*\},/g, '');

fs.writeFileSync(file, content);
console.log('updated routes in generate-pages.js');
