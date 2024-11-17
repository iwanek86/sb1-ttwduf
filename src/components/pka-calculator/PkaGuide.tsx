import React from 'react';
import { Beaker, ArrowDownUp, Gauge } from 'lucide-react';

const pkaConcepts = [
  {
    title: 'Acid Strength',
    icon: <Gauge className="w-5 h-5 text-sky-600" />,
    description: 'How pKa indicates acid strength',
    points: [
      'Lower pKa = stronger acid',
      'Relationship to pH',
      'Dissociation extent',
      'Conjugate base strength'
    ]
  },
  {
    title: 'Ka and pKa',
    icon: <ArrowDownUp className="w-5 h-5 text-sky-600" />,
    description: 'Understanding the relationship between Ka and pKa',
    points: [
      'Logarithmic relationship',
      'Conversion formulas',
      'Numerical significance',
      'Scale interpretation'
    ]
  },
  {
    title: 'Applications',
    icon: <Beaker className="w-5 h-5 text-sky-600" />,
    description: 'Practical uses of pKa values',
    points: [
      'Buffer solutions',
      'Drug development',
      'Biochemical systems',
      'Chemical analysis'
    ]
  }
];

export function PkaGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding pKa</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {pkaConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-sky-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-2"></span>
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