import React from 'react';
import { Link2, Zap, Shield } from 'lucide-react';

const bondingConcepts = [
  {
    title: 'Bond Order',
    icon: <Link2 className="w-5 h-5 text-cyan-600" />,
    description: 'Understanding electron distribution',
    points: [
      'Bonding vs antibonding',
      'Electron counting',
      'Order calculation',
      'Bond stability'
    ]
  },
  {
    title: 'Bond Properties',
    icon: <Zap className="w-5 h-5 text-cyan-600" />,
    description: 'Physical characteristics of bonds',
    points: [
      'Bond strength',
      'Bond length',
      'Bond energy',
      'Bond polarity'
    ]
  },
  {
    title: 'Molecular Stability',
    icon: <Shield className="w-5 h-5 text-cyan-600" />,
    description: 'How bonds affect molecules',
    points: [
      'Structural integrity',
      'Reactivity patterns',
      'Energy states',
      'Molecular geometry'
    ]
  }
];

export function BondingGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Chemical Bonding</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {bondingConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-cyan-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-cyan-600 rounded-full mr-2"></span>
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