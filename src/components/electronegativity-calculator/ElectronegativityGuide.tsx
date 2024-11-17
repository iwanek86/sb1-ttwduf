import React from 'react';
import { Zap, Scale, Atom } from 'lucide-react';

const electronegativityConcepts = [
  {
    title: 'Electronegativity Scales',
    icon: <Scale className="w-5 h-5 text-rose-600" />,
    description: 'Different methods for measuring electron-attracting ability',
    points: [
      'Pauling scale (most common)',
      'Mulliken scale (energy-based)',
      'Allred-Rochow scale (charge-based)',
      'Scale comparisons'
    ]
  },
  {
    title: 'Bond Polarity',
    icon: <Zap className="w-5 h-5 text-rose-600" />,
    description: 'How electronegativity affects electron distribution',
    points: [
      'Nonpolar vs polar bonds',
      'Electronegativity difference',
      'Dipole moments',
      'Bond character'
    ]
  },
  {
    title: 'Periodic Trends',
    icon: <Atom className="w-5 h-5 text-rose-600" />,
    description: 'Patterns of electronegativity in the periodic table',
    points: [
      'Increases left to right',
      'Decreases top to bottom',
      'Group trends',
      'Period trends'
    ]
  }
];

export function ElectronegativityGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Electronegativity</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {electronegativityConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-rose-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-rose-600 rounded-full mr-2"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}