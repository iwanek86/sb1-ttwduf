import React from 'react';
import { Maximize2, MinusCircle, PlusCircle } from 'lucide-react';

const sizeFactors = [
  {
    title: 'Surface Area to Volume Ratio',
    icon: <Maximize2 className="w-5 h-5 text-green-600" />,
    description: 'The relationship between a cell\'s surface area and its volume',
    points: [
      'Affects nutrient exchange efficiency',
      'Smaller cells have higher ratios',
      'Limits maximum cell size',
      'Critical for cellular function'
    ]
  },
  {
    title: 'Size Limitations',
    icon: <MinusCircle className="w-5 h-5 text-green-600" />,
    description: 'Factors that constrain cell size',
    points: [
      'Diffusion distance limits',
      'Nuclear control span',
      'Metabolic requirements',
      'Structural integrity'
    ]
  },
  {
    title: 'Size Advantages',
    icon: <PlusCircle className="w-5 h-5 text-green-600" />,
    description: 'Benefits of different cell sizes',
    points: [
      'Specialized functions',
      'Storage capacity',
      'Mechanical strength',
      'Energy efficiency'
    ]
  }
];

export function CellSizeGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Cell Size</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {sizeFactors.map((factor) => (
          <div key={factor.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                {factor.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{factor.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{factor.description}</p>
            <ul className="space-y-2">
              {factor.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
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