import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const popularCalculators = [
  {
    name: 'Cell Size Calculator',
    path: '/calculator/cell-size',
    description: 'Calculate cell dimensions and surface area to volume ratio'
  },
  {
    name: 'DNA Sequence Calculator',
    path: '/calculator/dna-sequence',
    description: 'Analyze DNA sequences and transcription'
  },
  {
    name: 'Molecular Weight Calculator',
    path: '/calculator/molecular-weight',
    description: 'Calculate molecular mass of chemical compounds'
  }
];

export function PopularCalculators() {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Calculators</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularCalculators.map((calc) => (
          <Link
            key={calc.name}
            to={calc.path}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{calc.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{calc.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}