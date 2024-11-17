import React from 'react';
import { Shield, Zap, Layers } from 'lucide-react';

const shieldingConcepts = [
  {
    title: 'Electron Shielding',
    icon: <Shield className="w-5 h-5 text-violet-600" />,
    description: 'How inner electrons reduce nuclear charge felt by outer electrons',
    points: [
      'Inner shell effect',
      'Same shell interactions',
      'Penetration effects',
      'Orbital overlap'
    ]
  },
  {
    title: 'Slater\'s Rules',
    icon: <Layers className="w-5 h-5 text-violet-600" />,
    description: 'Systematic method for calculating shielding constants',
    points: [
      'Shell-based calculations',
      'Orbital type considerations',
      'Group contributions',
      'Empirical values'
    ]
  },
  {
    title: 'Nuclear Attraction',
    icon: <Zap className="w-5 h-5 text-violet-600" />,
    description: 'How effective nuclear charge affects electron behavior',
    points: [
      'Atomic size effects',
      'Ionization energy',
      'Electron affinity',
      'Chemical bonding'
    ]
  }
];

export function ShieldingGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Electron Shielding</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {shieldingConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-violet-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-violet-600 rounded-full mr-2"></span>
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