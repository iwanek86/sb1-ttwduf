import React from 'react';
import { Zap, GitBranch, Gauge } from 'lucide-react';

const ionicCharacterConcepts = [
  {
    title: 'Electronegativity Difference',
    icon: <Zap className="w-5 h-5 text-fuchsia-600" />,
    description: 'How atomic properties affect bond character',
    points: [
      'Pauling scale values',
      'Difference calculation',
      'Periodic trends',
      'Element properties'
    ]
  },
  {
    title: 'Bond Types',
    icon: <GitBranch className="w-5 h-5 text-fuchsia-600" />,
    description: 'Different types of chemical bonds',
    points: [
      'Ionic bonds',
      'Polar covalent bonds',
      'Nonpolar covalent bonds',
      'Transition regions'
    ]
  },
  {
    title: 'Bond Properties',
    icon: <Gauge className="w-5 h-5 text-fuchsia-600" />,
    description: 'How ionic character affects bond behavior',
    points: [
      'Bond strength',
      'Melting points',
      'Solubility',
      'Chemical reactivity'
    ]
  }
];

export function IonicCharacterGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Ionic Character</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {ionicCharacterConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-fuchsia-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-fuchsia-600 rounded-full mr-2"></span>
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