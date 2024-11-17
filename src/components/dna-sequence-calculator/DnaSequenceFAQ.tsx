import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is DNA sequence analysis?',
    answer: 'DNA sequence analysis involves examining the order of nucleotides (A, T, G, C) in a DNA molecule. It helps understand genetic information, identify mutations, and predict protein sequences.'
  },
  {
    question: 'Why is GC content important?',
    answer: 'GC content affects DNA stability because G-C base pairs have three hydrogen bonds compared to A-T\'s two bonds. Higher GC content generally indicates more stable DNA and can influence gene expression and DNA melting temperature.'
  },
  {
    question: 'How does transcription work?',
    answer: 'Transcription converts DNA to RNA by replacing thymine (T) with uracil (U) and creating a complementary strand. This RNA can then be used as a template for protein synthesis.'
  },
  {
    question: 'What is the genetic code?',
    answer: 'The genetic code is the set of rules by which DNA/RNA sequences are translated into proteins. Each three-letter codon (triplet) of nucleotides corresponds to a specific amino acid or a stop signal.'
  },
  {
    question: 'How are mutations identified?',
    answer: 'Mutations are identified by comparing DNA sequences to reference sequences. Changes can include substitutions (different base), insertions (added base), or deletions (removed base), which may affect protein structure and function.'
  }
];

export function DnaSequenceFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-purple-600" />
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