import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is ionic character?',
    answer: 'Ionic character is the degree to which a chemical bond exhibits ionic behavior, expressed as a percentage. It\'s determined by the electronegativity difference between bonded atoms and indicates how electron density is distributed in the bond.'
  },
  {
    question: 'How is ionic character calculated?',
    answer: 'Ionic character is calculated using Pauling\'s formula: % ionic character = 100(1 - e^(-0.25 × ΔEN²)), where ΔEN is the electronegativity difference between the bonded atoms.'
  },
  {
    question: 'What affects ionic character?',
    answer: 'Ionic character is primarily affected by the electronegativity difference between bonded atoms. Larger differences result in higher ionic character. Atomic size, electron configuration, and periodic trends also play a role.'
  },
  {
    question: 'How does ionic character affect properties?',
    answer: 'Higher ionic character typically results in stronger bonds, higher melting points, greater solubility in polar solvents, and more ionic-type chemical behavior. It also affects crystal structure and electrical conductivity.'
  },
  {
    question: 'What are the bond type ranges?',
    answer: 'Generally, bonds with less than 15% ionic character are considered nonpolar covalent, 15-50% are polar covalent, and above 50% are predominantly ionic. However, these boundaries are not strict.'
  }
];

export function IonicCharacterFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-fuchsia-600" />
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