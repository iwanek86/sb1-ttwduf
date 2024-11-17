import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is effective nuclear charge?',
    answer: 'Effective nuclear charge (Zeff) is the net positive charge experienced by an electron in an atom, taking into account the shielding effect of other electrons. It\'s calculated as the difference between the atomic number and the shielding constant.'
  },
  {
    question: 'How do Slater\'s rules work?',
    answer: 'Slater\'s rules provide a systematic method for calculating the shielding constant. They consider the contributions of different electron groups based on their shell and orbital type, with inner electrons providing more shielding than electrons in the same shell.'
  },
  {
    question: 'Why is effective nuclear charge important?',
    answer: 'Effective nuclear charge helps explain atomic and ionic size trends, ionization energies, and electron affinities. It\'s crucial for understanding chemical bonding and periodic trends in chemical properties.'
  },
  {
    question: 'What affects shielding effectiveness?',
    answer: 'Shielding effectiveness depends on the type of orbital (s, p, d, f), the principal quantum number, and the relative position of electrons. Inner shell electrons shield more effectively than same-shell electrons.'
  },
  {
    question: 'How does Zeff affect atomic properties?',
    answer: 'Higher Zeff values result in stronger attraction between electrons and the nucleus, leading to smaller atomic size, higher ionization energy, and greater electron affinity. This affects chemical reactivity and bonding behavior.'
  }
];

export function NuclearChargeFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-violet-600" />
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