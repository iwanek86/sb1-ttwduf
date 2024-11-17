import React from 'react';
import { Scale, Leaf, BarChart2 } from 'lucide-react';

const capacityConcepts = [
  {
    title: 'Resource Limitations',
    icon: <Scale className="w-5 h-5 text-emerald-600" />,
    description: 'Understanding resource constraints',
    points: [
      'Resource availability',
      'Individual requirements',
      'Limiting factors',
      'Resource efficiency'
    ]
  },
  {
    title: 'Population Dynamics',
    icon: <BarChart2 className="w-5 h-5 text-emerald-600" />,
    description: 'How populations respond to capacity',
    points: [
      'Growth patterns',
      'Density dependence',
      'Population pressure',
      'Capacity fluctuations'
    ]
  },
  {
    title: 'Environmental Factors',
    icon: <Leaf className="w-5 h-5 text-emerald-600" />,
    description: 'External influences on capacity',
    points: [
      'Seasonal changes',
      'Habitat quality',
      'Competition effects',
      'Environmental stress'
    ]
  }
];

export function CarryingCapacityGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Carrying Capacity</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {capacityConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
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