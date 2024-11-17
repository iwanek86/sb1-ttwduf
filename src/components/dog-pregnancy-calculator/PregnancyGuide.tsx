import React from 'react';
import { Calendar, Heart, Baby } from 'lucide-react';

const stages = [
  {
    title: 'First Trimester (Days 1-21)',
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
    description: 'Early development stage',
    points: [
      'Fertilization and implantation',
      'Early embryo development',
      'Subtle behavioral changes',
      'Regular diet maintenance'
    ]
  },
  {
    title: 'Second Trimester (Days 22-42)',
    icon: <Heart className="w-6 h-6 text-blue-600" />,
    description: 'Growth and development phase',
    points: [
      'Puppy development',
      'Increased appetite',
      'Weight gain begins',
      'Veterinary check-ups'
    ]
  },
  {
    title: 'Third Trimester (Days 43-63)',
    icon: <Baby className="w-6 h-6 text-blue-600" />,
    description: 'Final preparation for whelping',
    points: [
      'Rapid puppy growth',
      'Nesting behavior',
      'Milk production begins',
      'Whelping preparation'
    ]
  }
];

export function PregnancyGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pregnancy Stages</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                {stage.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{stage.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{stage.description}</p>
            <ul className="space-y-2">
              {stage.points.map((point) => (
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