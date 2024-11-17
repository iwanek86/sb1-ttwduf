import React from 'react';
import { Clock } from 'lucide-react';

const ageStages = [
  {
    stage: 'Kitten (0-1 year)',
    humanEquivalent: '0-15 years',
    description: 'Rapid growth and development phase',
    characteristics: [
      'Rapid physical growth',
      'Learning basic behaviors',
      'High energy levels',
      'Development of social skills'
    ]
  },
  {
    stage: 'Junior (1-2 years)',
    humanEquivalent: '15-24 years',
    description: 'Young adult phase',
    characteristics: [
      'Reaching full size',
      'High activity levels',
      'Social maturity',
      'Territorial behavior development'
    ]
  },
  {
    stage: 'Prime (3-6 years)',
    humanEquivalent: '28-40 years',
    description: 'Peak adult years',
    characteristics: [
      'Peak physical condition',
      'Established routines',
      'Stable behavior patterns',
      'Strong hunting skills'
    ]
  },
  {
    stage: 'Mature (7-10 years)',
    humanEquivalent: '44-56 years',
    description: 'Middle-aged phase',
    characteristics: [
      'Slight activity decrease',
      'Weight management important',
      'Established personalities',
      'May show early aging signs'
    ]
  },
  {
    stage: 'Senior (11-14 years)',
    humanEquivalent: '60-72 years',
    description: 'Senior years',
    characteristics: [
      'Reduced activity',
      'More rest periods',
      'May need dietary changes',
      'Regular vet checks important'
    ]
  },
  {
    stage: 'Super Senior (15+ years)',
    humanEquivalent: '76+ years',
    description: 'Golden years',
    characteristics: [
      'Special care needed',
      'Reduced mobility',
      'Changed sleep patterns',
      'Extra medical attention'
    ]
  }
];

export function AgingGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Cat Life Stages Guide</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ageStages.map((stage) => (
          <div key={stage.stage} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{stage.stage}</h3>
            <p className="text-blue-600 font-medium mb-2">Human age: {stage.humanEquivalent}</p>
            <p className="text-gray-600 text-sm mb-3">{stage.description}</p>
            <ul className="space-y-2">
              {stage.characteristics.map((trait) => (
                <li key={trait} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}