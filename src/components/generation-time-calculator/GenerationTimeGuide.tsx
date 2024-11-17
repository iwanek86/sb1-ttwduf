import React from 'react';
import { Clock, LineChart, Settings } from 'lucide-react';

const growthConcepts = [
  {
    title: 'Growth Phases',
    icon: <Clock className="w-5 h-5 text-teal-600" />,
    description: 'Understanding bacterial growth stages',
    points: [
      'Lag phase',
      'Exponential phase',
      'Stationary phase',
      'Death phase'
    ]
  },
  {
    title: 'Growth Rate',
    icon: <LineChart className="w-5 h-5 text-teal-600" />,
    description: 'Measuring population increase',
    points: [
      'Doubling time',
      'Specific growth rate',
      'Population dynamics',
      'Growth curves'
    ]
  },
  {
    title: 'Growth Factors',
    icon: <Settings className="w-5 h-5 text-teal-600" />,
    description: 'Factors affecting growth rate',
    points: [
      'Temperature',
      'Nutrient availability',
      'pH conditions',
      'Oxygen levels'
    ]
  }
];

export function GenerationTimeGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Generation Time</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {growthConcepts.map((concept) => (
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