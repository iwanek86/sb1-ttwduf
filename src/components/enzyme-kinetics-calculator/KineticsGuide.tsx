import React from 'react';
import { Activity, LineChart, Gauge } from 'lucide-react';

const kineticsConcepts = [
  {
    title: 'Reaction Velocity',
    icon: <Activity className="w-5 h-5 text-violet-600" />,
    description: 'Understanding enzyme reaction rates',
    points: [
      'Initial velocity (v0)',
      'Maximum velocity (Vmax)',
      'Substrate effects',
      'Rate measurement'
    ]
  },
  {
    title: 'Kinetic Parameters',
    icon: <Gauge className="w-5 h-5 text-violet-600" />,
    description: 'Key enzyme kinetic constants',
    points: [
      'Michaelis constant (Km)',
      'Turnover number (kcat)',
      'Catalytic efficiency',
      'Substrate affinity'
    ]
  },
  {
    title: 'Data Analysis',
    icon: <LineChart className="w-5 h-5 text-violet-600" />,
    description: 'Methods for analyzing kinetic data',
    points: [
      'Michaelis-Menten plots',
      'Lineweaver-Burk plots',
      'Regression analysis',
      'Parameter estimation'
    ]
  }
];

export function KineticsGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Enzyme Kinetics</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {kineticsConcepts.map((concept) => (
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