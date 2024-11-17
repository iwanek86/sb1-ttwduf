import React from 'react';
import { Thermometer, Calculator, Settings } from 'lucide-react';

const annealingConcepts = [
  {
    title: 'Temperature Basics',
    icon: <Thermometer className="w-5 h-5 text-purple-600" />,
    description: 'Understanding annealing temperature',
    points: [
      'Primer-template binding',
      'Specificity control',
      'Temperature ranges',
      'PCR optimization'
    ]
  },
  {
    title: 'Calculation Methods',
    icon: <Calculator className="w-5 h-5 text-purple-600" />,
    description: 'How to determine optimal temperature',
    points: [
      'Nearest-neighbor method',
      'GC content analysis',
      'Salt corrections',
      'Empirical formulas'
    ]
  },
  {
    title: 'Optimization',
    icon: <Settings className="w-5 h-5 text-purple-600" />,
    description: 'Fine-tuning PCR conditions',
    points: [
      'Temperature gradients',
      'Buffer conditions',
      'Primer design',
      'Troubleshooting'
    ]
  }
];

export function AnnealingGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Annealing Temperature</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {annealingConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
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