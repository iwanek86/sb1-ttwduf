import React from 'react';
import { Calendar, Heart, Baby } from 'lucide-react';

const stages = [
  {
    title: 'First Trimester (Days 1-94)',
    icon: <Calendar className="w-6 h-6 text-amber-600" />,
    description: 'Early development stage',
    points: [
      'Embryo development',
      'Pregnancy confirmation',
      'Nutritional adjustment',
      'Health assessment'
    ]
  },
  {
    title: 'Second Trimester (Days 95-188)',
    icon: <Heart className="w-6 h-6 text-amber-600" />,
    description: 'Growth and development phase',
    points: [
      'Rapid fetal growth',
      'Increased nutrition needs',
      'Regular monitoring',
      'Vaccination schedule'
    ]
  },
  {
    title: 'Third Trimester (Days 189-283)',
    icon: <Baby className="w-6 h-6 text-amber-600" />,
    description: 'Final preparation for calving',
    points: [
      'Maximum fetal growth',
      'Calving preparation',
      'Close monitoring',
      'Nutritional focus'
    ]
  }
];

export function GestationGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pregnancy Stages</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg">
                {stage.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{stage.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{stage.description}</p>
            <ul className="space-y-2">
              {stage.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
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