import React from 'react';
import { Calculator, GitBranch, BarChart2 } from 'lucide-react';

const hwConcepts = [
  {
    title: 'Allele Frequencies',
    icon: <Calculator className="w-5 h-5 text-pink-600" />,
    description: 'Understanding p and q frequencies',
    points: [
      'p + q = 1',
      'Dominant vs recessive',
      'Population sampling',
      'Frequency changes'
    ]
  },
  {
    title: 'Genotype Distribution',
    icon: <GitBranch className="w-5 h-5 text-pink-600" />,
    description: 'How genotypes are distributed',
    points: [
      'p² + 2pq + q² = 1',
      'Homozygous dominant (p²)',
      'Heterozygous (2pq)',
      'Homozygous recessive (q²)'
    ]
  },
  {
    title: 'Equilibrium Testing',
    icon: <BarChart2 className="w-5 h-5 text-pink-600" />,
    description: 'Testing for HW equilibrium',
    points: [
      'Chi-square test',
      'Expected frequencies',
      'Observed frequencies',
      'Statistical significance'
    ]
  }
];

export function HardyWeinbergGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Hardy-Weinberg Equilibrium</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {hwConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-pink-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
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