import React from 'react';
import { Dna, GitBranch, Gauge } from 'lucide-react';

const synthesisConcepts = [
  {
    title: 'Transcription',
    icon: <Dna className="w-5 h-5 text-indigo-600" />,
    description: 'DNA to RNA conversion',
    points: [
      'RNA polymerase action',
      'Base pairing rules',
      'mRNA processing',
      'Gene regulation'
    ]
  },
  {
    title: 'Translation',
    icon: <GitBranch className="w-5 h-5 text-indigo-600" />,
    description: 'RNA to protein conversion',
    points: [
      'Ribosome function',
      'tRNA and codons',
      'Amino acid chain',
      'Protein folding'
    ]
  },
  {
    title: 'Protein Properties',
    icon: <Gauge className="w-5 h-5 text-indigo-600" />,
    description: 'Understanding protein characteristics',
    points: [
      'Amino acid composition',
      'Molecular weight',
      'Isoelectric point',
      'Hydrophobicity'
    ]
  }
];

export function SynthesisGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Protein Synthesis</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {synthesisConcepts.map((concept) => (
          <div key={concept.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                {concept.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{concept.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.points.map((point) => (
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