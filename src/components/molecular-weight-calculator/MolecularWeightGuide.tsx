import React from 'react';
import { Scale, Calculator, Beaker } from 'lucide-react';

const molecularWeightConcepts = [
  {
    title: 'Molecular Mass',
    icon: <Scale className="w-5 h-5 text-sky-600" />,
    description: 'Understanding molecular weight calculations',
    points: [
      'Sum of atomic masses',
      'Mass per mole',
      'Isotopic considerations',
      'Unit conversions'
    ]
  },
  {
    title: 'Formula Analysis',
    icon: <Calculator className="w-5 h-5 text-sky-600" />,
    description: 'How to analyze chemical formulas',
    points: [
      'Element identification',
      'Subscript interpretation',
      'Polyatomic ions',
      'Empirical formulas'
    ]
  },
  {
    title: 'Applications',
    icon: <Beaker className="w-5 h-5 text-sky-600" />,
    description: 'Uses of molecular weight',
    points: [
      'Solution preparation',
      'Stoichiometry',
      'Concentration calculations',
      'Chemical analysis'
    ]
  }
];

export function MolecularWeightGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Molecular Weight</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {molecularWeightConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-sky-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
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