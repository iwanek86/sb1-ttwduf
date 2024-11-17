import React from 'react';
import { Wind, Activity, Thermometer } from 'lucide-react';

const consumptionConcepts = [
  {
    title: 'Respiratory Quotient',
    icon: <Wind className="w-5 h-5 text-blue-600" />,
    description: 'Understanding RQ and metabolism',
    points: [
      'CO₂/O₂ ratio',
      'Substrate indicators',
      'Normal ranges',
      'Metabolic implications'
    ]
  },
  {
    title: 'Substrate Utilization',
    icon: <Activity className="w-5 h-5 text-blue-600" />,
    description: 'How RQ indicates fuel use',
    points: [
      'Carbohydrate metabolism',
      'Fat oxidation',
      'Protein breakdown',
      'Mixed fuel use'
    ]
  },
  {
    title: 'Environmental Factors',
    icon: <Thermometer className="w-5 h-5 text-blue-600" />,
    description: 'External effects on consumption',
    points: [
      'Temperature effects',
      'Pressure changes',
      'Humidity impact',
      'Activity influence'
    ]
  }
];

export function OxygenConsumptionGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Oxygen Consumption</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {consumptionConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
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