import React from 'react';
import { Calendar, Heart, Baby } from 'lucide-react';

const stages = [
  {
    title: 'First Trimester (Days 1-21)',
    icon: <Calendar className="w-6 h-6 text-amber-600" />,
    description: 'Early development stage with subtle changes',
    signs: [
      'Slight weight gain',
      'Normal appetite',
      'Possible behavior changes',
      'Continue regular diet'
    ]
  },
  {
    title: 'Second Trimester (Days 22-42)',
    icon: <Heart className="w-6 h-6 text-amber-600" />,
    description: 'Growth phase with noticeable changes',
    signs: [
      'Visible weight gain',
      'Increased appetite',
      'Enlarged abdomen',
      'Gentle handling needed'
    ]
  },
  {
    title: 'Third Trimester (Days 43-65)',
    icon: <Baby className="w-6 h-6 text-amber-600" />,
    description: 'Final preparation for birth',
    signs: [
      'Significant weight gain',
      'Visible movement',
      'Nesting behavior',
      'Extra calcium needed'
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
              <div className="bg-amber-100 p-2 rounded-lg">
                {stage.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{stage.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{stage.description}</p>
            <ul className="space-y-2">
              {stage.signs.map((sign) => (
                <li key={sign} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}