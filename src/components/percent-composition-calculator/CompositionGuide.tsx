import React from 'react';
import { PieChart, Calculator, Beaker } from 'lucide-react';

const compositionConcepts = [
  {
    title: 'Mass Percentage',
    icon: <PieChart className="w-5 h-5 text-teal-600" />,
    description: 'Understanding element composition by mass',
    points: [
      'Element mass contribution',
      'Percentage calculations',
      'Relative abundance',
      'Composition analysis'
    ]
  },
  {
    title: 'Formula Analysis',
    icon: <Calculator className="w-5 h-5 text-teal-600" />,
    description: 'How to analyze chemical formulas',
    points: [
      'Element identification',
      'Atomic mass values',
      'Subscript interpretation',
      'Mass relationships'
    ]
  },
  {
    title: 'Applications',
    icon: <Beaker className="w-5 h-5 text-teal-600" />,
    description: 'Uses of percent composition',
    points: [
      'Empirical formulas',
      'Chemical analysis',
      'Quality control',
      'Material verification'
    ]
  }
];

export function CompositionGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Percent Composition</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {compositionConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-teal-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
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