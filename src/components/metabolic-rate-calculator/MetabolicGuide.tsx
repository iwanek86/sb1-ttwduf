import React from 'react';
import { Flame, Activity, Thermometer } from 'lucide-react';

const metabolicConcepts = [
  {
    title: 'Basal Metabolic Rate',
    icon: <Flame className="w-5 h-5 text-yellow-600" />,
    description: 'Understanding basic energy needs',
    points: [
      'Resting energy expenditure',
      'Species differences',
      'Body composition effects',
      'Age and sex factors'
    ]
  },
  {
    title: 'Activity Factors',
    icon: <Activity className="w-5 h-5 text-yellow-600" />,
    description: 'How activity affects metabolism',
    points: [
      'Exercise intensity',
      'Daily movement',
      'Thermic effect of food',
      'Non-exercise activity'
    ]
  },
  {
    title: 'Environmental Effects',
    icon: <Thermometer className="w-5 h-5 text-yellow-600" />,
    description: 'External factors affecting metabolism',
    points: [
      'Temperature effects',
      'Climate adaptation',
      'Seasonal changes',
      'Habitat influence'
    ]
  }
];

export function MetabolicGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Metabolic Rate</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {metabolicConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
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