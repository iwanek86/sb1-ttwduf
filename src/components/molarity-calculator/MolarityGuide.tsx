import React from 'react';
import { Beaker, Scale, TestTube } from 'lucide-react';

const molarityConcepts = [
  {
    title: 'Solution Concentration',
    icon: <TestTube className="w-5 h-5 text-orange-600" />,
    description: 'Understanding molarity and solution strength',
    points: [
      'Moles per liter (M)',
      'Concentration units',
      'Solution preparation',
      'Concentration effects'
    ]
  },
  {
    title: 'Dilution Principles',
    icon: <Beaker className="w-5 h-5 text-orange-600" />,
    description: 'How dilution affects concentration',
    points: [
      'M₁V₁ = M₂V₂ relationship',
      'Volume changes',
      'Concentration changes',
      'Dilution factors'
    ]
  },
  {
    title: 'Solution Preparation',
    icon: <Scale className="w-5 h-5 text-orange-600" />,
    description: 'Steps for making solutions',
    points: [
      'Mass measurements',
      'Volume measurements',
      'Proper mixing',
      'Standard solutions'
    ]
  }
];

export function MolarityGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Molarity</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {molarityConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
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