import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is electronegativity?',
    answer: 'Electronegativity is a measure of an atom\'s ability to attract electrons when forming a chemical bond. Higher values indicate a stronger attraction for electrons.'
  },
  {
    question: 'How does electronegativity affect bonding?',
    answer: 'Electronegativity differences between atoms determine bond type and polarity. Small differences result in covalent bonds, while large differences lead to ionic bonds.'
  },
  {
    question: 'Why are there different electronegativity scales?',
    answer: 'Different scales measure electronegativity using various properties: Pauling uses bond energies, Mulliken uses electron affinities and ionization energies, and Allred-Rochow uses nuclear charge and atomic radius.'
  },
  {
    question: 'How do you predict bond polarity?',
    answer: 'Bond polarity is predicted by the electronegativity difference between atoms. Differences less than 0.4 indicate nonpolar bonds, 0.4-1.7 indicate polar covalent bonds, and greater than 1.7 suggest ionic bonds.'
  },
  {
    question: 'What are periodic trends in electronegativity?',
    answer: 'Electronegativity generally increases from left to right across a period (due to increasing nuclear charge) and decreases down a group (due to increasing atomic size and electron shielding).'
  }
];

export function ElectronegativityFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-rose-600" />
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