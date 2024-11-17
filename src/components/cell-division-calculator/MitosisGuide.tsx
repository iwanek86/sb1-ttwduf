import React from 'react';
import { Clock, GitBranch, Gauge } from 'lucide-react';

const mitosisConcepts = [
  {
    title: 'Cell Cycle Phases',
    icon: <Clock className="w-5 h-5 text-green-600" />,
    description: 'Understanding the stages of cell division',
    points: [
      'G1 (Growth Phase 1)',
      'S (DNA Synthesis)',
      'G2 (Growth Phase 2)',
      'M (Mitosis)'
    ]
  },
  {
    title: 'Mitotic Stages',
    icon: <GitBranch className="w-5 h-5 text-green-600" />,
    description: 'Detailed breakdown of mitosis',
    points: [
      'Prophase',
      'Metaphase',
      'Anaphase',
      'Telophase'
    ]
  },
  {
    title: 'Timing Factors',
    icon: <Gauge className="w-5 h-5 text-green-600" />,
    description: 'What affects cell division speed',
    points: [
      'Cell type differences',
      'Environmental conditions',
      'Growth factors',
      'Cell checkpoints'
    ]
  }
];

export function MitosisGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Cell Division</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {mitosisConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
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