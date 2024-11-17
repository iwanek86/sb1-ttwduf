import React from 'react';
import { Heart, Activity, AlertCircle } from 'lucide-react';

const bpConcepts = [
  {
    title: 'Blood Pressure Basics',
    icon: <Heart className="w-5 h-5 text-red-600" />,
    description: 'Understanding BP measurements',
    points: [
      'Systolic pressure',
      'Diastolic pressure',
      'Normal ranges',
      'Measurement timing'
    ]
  },
  {
    title: 'Risk Factors',
    icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    description: 'What affects blood pressure',
    points: [
      'Age and genetics',
      'Lifestyle factors',
      'Medical conditions',
      'Medications'
    ]
  },
  {
    title: 'Management',
    icon: <Activity className="w-5 h-5 text-red-600" />,
    description: 'Controlling blood pressure',
    points: [
      'Regular monitoring',
      'Healthy diet',
      'Physical activity',
      'Stress management'
    ]
  }
];

export function BloodPressureGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Blood Pressure</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {bpConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
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