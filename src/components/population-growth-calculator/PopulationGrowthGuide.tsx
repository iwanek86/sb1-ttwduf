import React from 'react';
import { TrendingUp, Users, LineChart } from 'lucide-react';

const growthConcepts = [
  {
    title: 'Growth Models',
    icon: <TrendingUp className="w-5 h-5 text-green-600" />,
    description: 'Understanding population growth patterns',
    points: [
      'Exponential growth',
      'Logistic growth',
      'Density dependence',
      'Growth limitations'
    ]
  },
  {
    title: 'Population Dynamics',
    icon: <Users className="w-5 h-5 text-green-600" />,
    description: 'Factors affecting population change',
    points: [
      'Birth rates',
      'Death rates',
      'Immigration',
      'Emigration'
    ]
  },
  {
    title: 'Environmental Factors',
    icon: <LineChart className="w-5 h-5 text-green-600" />,
    description: 'External influences on growth',
    points: [
      'Resource availability',
      'Competition',
      'Predation',
      'Habitat conditions'
    ]
  }
];

export function PopulationGrowthGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Population Growth</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {growthConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
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