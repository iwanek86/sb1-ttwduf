import React from 'react';
import { Circle, ArrowUp, Layers } from 'lucide-react';

const orbitalConcepts = [
  {
    title: 'Aufbau Principle',
    icon: <ArrowUp className="w-5 h-5 text-amber-600" />,
    description: 'How electrons fill atomic orbitals',
    points: [
      'Lowest energy first',
      'n + l rule',
      'Orbital filling order',
      'Energy level progression'
    ]
  },
  {
    title: 'Hund\'s Rule',
    icon: <Circle className="w-5 h-5 text-amber-600" />,
    description: 'Electron distribution in orbitals',
    points: [
      'Maximum multiplicity',
      'Parallel spins first',
      'Degenerate orbitals',
      'Spin alignment'
    ]
  },
  {
    title: 'Pauli Principle',
    icon: <Layers className="w-5 h-5 text-amber-600" />,
    description: 'Electron occupancy rules',
    points: [
      'Two electrons per orbital',
      'Opposite spins',
      'Quantum numbers',
      'Orbital capacity'
    ]
  }
];

export function OrbitalGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Electron Orbitals</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {orbitalConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
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