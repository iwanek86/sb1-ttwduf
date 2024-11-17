import React from 'react';
import { Box, ArrowDownUp, Maximize2 } from 'lucide-react';

const savConcepts = [
  {
    title: 'Shape Effects',
    icon: <Box className="w-5 h-5 text-emerald-600" />,
    description: 'How shape influences SA:V ratio',
    points: [
      'Spherical efficiency',
      'Edge effects',
      'Surface irregularities',
      'Shape optimization'
    ]
  },
  {
    title: 'Size Impact',
    icon: <ArrowDownUp className="w-5 h-5 text-emerald-600" />,
    description: 'Relationship between size and ratio',
    points: [
      'Scaling effects',
      'Size limitations',
      'Growth constraints',
      'Optimal ranges'
    ]
  },
  {
    title: 'Biological Importance',
    icon: <Maximize2 className="w-5 h-5 text-emerald-600" />,
    description: 'Why SA:V ratio matters',
    points: [
      'Nutrient exchange',
      'Waste removal',
      'Cell efficiency',
      'Size evolution'
    ]
  }
];

export function SurfaceAreaVolumeGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Surface Area to Volume Ratio</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {savConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
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