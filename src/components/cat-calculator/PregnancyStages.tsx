import React from 'react';
import { Calendar, Heart, Baby } from 'lucide-react';

const stages = [
  {
    title: 'First Trimester (Days 1-21)',
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
    description: 'Early development stage where implantation occurs. Few visible signs except for possible morning sickness and subtle behavioral changes.',
    signs: [
      'Slight weight gain',
      'Increased appetite',
      'Pink nipples (around day 15-18)',
      'Morning sickness (possible)',
    ]
  },
  {
    title: 'Second Trimester (Days 22-42)',
    icon: <Heart className="w-6 h-6 text-blue-600" />,
    description: 'Physical changes become more noticeable as kittens develop. Your cat may show increased appetite and affection.',
    signs: [
      'Visible weight gain',
      'Enlarged abdomen',
      'Increased appetite',
      'More affectionate behavior',
    ]
  },
  {
    title: 'Third Trimester (Days 43-65)',
    icon: <Baby className="w-6 h-6 text-blue-600" />,
    description: 'Final stage of pregnancy with rapid kitten growth. Your cat will begin preparing for labor.',
    signs: [
      'Significant weight gain',
      'Visible kitten movement',
      'Nesting behavior',
      'Milk production begins',
    ]
  }
];

export function PregnancyStages() {
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
              {stage.signs.map((sign) => (
                <li key={sign} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
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