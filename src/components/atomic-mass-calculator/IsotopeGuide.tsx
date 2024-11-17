import React from 'react';
import { Atom, Scale, BarChart2 } from 'lucide-react';

const isotopeInfo = [
  {
    title: 'Isotopic Mass',
    icon: <Scale className="w-5 h-5 text-indigo-600" />,
    description: 'The mass of a specific isotope of an element',
    points: [
      'Measured in atomic mass units (amu)',
      'Includes protons and neutrons',
      'Varies between isotopes',
      'Determined experimentally'
    ]
  },
  {
    title: 'Natural Abundance',
    icon: <BarChart2 className="w-5 h-5 text-indigo-600" />,
    description: 'The percentage of each isotope found in nature',
    points: [
      'Expressed as percentage',
      'Sum equals 100%',
      'Varies by location',
      'Affects average mass'
    ]
  },
  {
    title: 'Mass Contribution',
    icon: <Atom className="w-5 h-5 text-indigo-600" />,
    description: 'How each isotope affects the average atomic mass',
    points: [
      'Weighted by abundance',
      'Mass × abundance percentage',
      'Summed for average',
      'Proportional effect'
    ]
  }
];

export function IsotopeGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Isotopes</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {isotopeInfo.map((info) => (
          <div key={info.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                {info.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{info.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{info.description}</p>
            <ul className="space-y-2">
              {info.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
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