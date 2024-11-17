import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is protein synthesis?',
    answer: 'Protein synthesis is the process by which cells build proteins using genetic instructions from DNA. It involves two main steps: transcription (DNA to RNA) and translation (RNA to protein).'
  },
  {
    question: 'How does the genetic code work?',
    answer: 'The genetic code consists of three-letter codons that specify amino acids. Each codon in messenger RNA (mRNA) corresponds to a specific amino acid or a stop signal, allowing the cell to build proteins based on DNA sequences.'
  },
  {
    question: 'What affects protein properties?',
    answer: 'Protein properties are determined by their amino acid sequence. Factors include the types of amino acids (hydrophobic, polar, charged), their order, and their interactions, which influence structure, function, and stability.'
  },
  {
    question: 'What is isoelectric point (pI)?',
    answer: 'The isoelectric point is the pH at which a protein carries no net electrical charge. It\'s important for protein purification and understanding protein behavior in different pH environments.'
  },
  {
    question: 'Why is amino acid composition important?',
    answer: 'Amino acid composition affects protein structure, stability, and function. The ratio of hydrophobic, polar, and charged residues influences protein folding, solubility, and interactions with other molecules.'
  }
];

export function ProteinSynthesisFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-b border-gray-200 pb-6 last:border-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}