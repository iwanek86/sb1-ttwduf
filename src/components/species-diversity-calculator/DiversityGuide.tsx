import React from 'react';
import { Leaf, BarChart2, Scale } from 'lucide-react';

const diversityConcepts = [
  {
    title: 'Diversity Indices',
    icon: <Scale className="w-5 h-5 text-lime-600" />,
    description: 'Understanding biodiversity metrics',
    points: [
      'Shannon-Wiener Index',
      'Simpson\'s Index',
      'Species richness',
      'Species evenness'
    ]
  },
  {
    title: 'Community Structure',
    icon: <BarChart2 className="w-5 h-5 text-lime-600" />,
    description: 'Analyzing species distribution',
    points: [
      'Relative abundance',
      'Dominant species',
      'Rare species',
      'Population patterns'
    ]
  },
  {
    title: 'Ecological Factors',
    icon: <Leaf className="w-5 h-5 text-lime-600" />,
    description: 'Influences on diversity',
    points: [
      'Habitat conditions',
      'Resource availability',
      'Competition',
      'Disturbance'
    ]
  }
];

export function DiversityGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Species Diversity</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {diversityConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-lime-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-lime-600 rounded-full mr-2"></span>
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