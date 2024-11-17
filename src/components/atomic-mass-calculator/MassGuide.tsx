import React from 'react';
import { Scale, Atom, BarChart2 } from 'lucide-react';

const massConcepts = [
  {
    title: 'Atomic Mass',
    icon: <Scale className="w-5 h-5 text-purple-600" />,
    description: 'The weighted average mass of all naturally occurring isotopes of an element',
    points: [
      'Measured in atomic mass units (amu)',
      'Considers isotopic abundance',
      'Found on periodic table',
      'Used in chemical calculations'
    ]
  },
  {
    title: 'Mass Number',
    icon: <Atom className="w-5 h-5 text-purple-600" />,
    description: 'The total number of protons and neutrons in an atom\'s nucleus',
    points: [
      'Whole number value',
      'Different for each isotope',
      'Determines isotope identity',
      'Used in nuclear chemistry'
    ]
  },
  {
    title: 'Isotopic Distribution',
    icon: <BarChart2 className="w-5 h-5 text-purple-600" />,
    description: 'The natural occurrence of different isotopes of an element',
    points: [
      'Expressed as percentages',
      'Varies by element',
      'Affects average mass',
      'Determined experimentally'
    ]
  }
];

export function MassGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Atomic Mass</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {massConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
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