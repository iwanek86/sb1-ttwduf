import React from 'react';
import { Dna, GitBranch, Code } from 'lucide-react';

const dnaConcepts = [
  {
    title: 'DNA Structure',
    icon: <Dna className="w-5 h-5 text-purple-600" />,
    description: 'Understanding DNA base pairing and structure',
    points: [
      'Base pair rules',
      'Double helix structure',
      'Nucleotide composition',
      'GC content significance'
    ]
  },
  {
    title: 'Transcription',
    icon: <GitBranch className="w-5 h-5 text-purple-600" />,
    description: 'DNA to RNA conversion process',
    points: [
      'RNA base changes',
      'Template strand',
      'Coding strand',
      'Transcription factors'
    ]
  },
  {
    title: 'Translation',
    icon: <Code className="w-5 h-5 text-purple-600" />,
    description: 'RNA to protein conversion',
    points: [
      'Genetic code',
      'Start/stop codons',
      'Amino acid sequence',
      'Protein synthesis'
    ]
  }
];

export function DnaGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding DNA Analysis</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {dnaConcepts.map((concept) => (
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