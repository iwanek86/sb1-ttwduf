import React from 'react';
import { Scale, Calculator, Beaker } from 'lucide-react';

const stoichiometryConcepts = [
  {
    title: 'Balanced Equations',
    icon: <Scale className="w-5 h-5 text-lime-600" />,
    description: 'Understanding chemical equation balancing',
    points: [
      'Conservation of mass',
      'Coefficient rules',
      'Element counting',
      'Equation verification'
    ]
  },
  {
    title: 'Molar Ratios',
    icon: <Calculator className="w-5 h-5 text-lime-600" />,
    description: 'How coefficients relate to moles',
    points: [
      'Stoichiometric ratios',
      'Mole calculations',
      'Mass conversions',
      'Limiting reagents'
    ]
  },
  {
    title: 'Reaction Yields',
    icon: <Beaker className="w-5 h-5 text-lime-600" />,
    description: 'Understanding reaction efficiency',
    points: [
      'Theoretical yield',
      'Actual yield',
      'Percent yield',
      'Yield optimization'
    ]
  }
];

export function StoichiometryGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Stoichiometry</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {stoichiometryConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-lime-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-lime-600 rounded-full mr-2"></span>
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