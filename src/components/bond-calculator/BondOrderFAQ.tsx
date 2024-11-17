import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is bond order?',
    answer: 'Bond order is a measure of the number of chemical bonds between atoms in a molecule. It is calculated as half the difference between bonding and antibonding electrons. Higher bond orders indicate stronger and shorter bonds.'
  },
  {
    question: 'How is bond order calculated?',
    answer: 'Bond order is calculated using the formula: (number of bonding electrons - number of antibonding electrons) ÷ 2. The result indicates the effective number of bonds between atoms.'
  },
  {
    question: 'What do different bond orders mean?',
    answer: 'A bond order of 1 indicates a single bond, 2 indicates a double bond, and 3 indicates a triple bond. Fractional bond orders are possible and suggest intermediate bond strengths.'
  },
  {
    question: 'How does bond order affect stability?',
    answer: 'Higher bond orders generally indicate greater molecular stability due to stronger bonds. However, very high bond orders can sometimes lead to increased reactivity in certain molecules.'
  },
  {
    question: 'Why are antibonding electrons important?',
    answer: 'Antibonding electrons weaken chemical bonds by occupying molecular orbitals that oppose bonding. They reduce the effective bond order and therefore the bond strength between atoms.'
  }
];

export function BondOrderFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-cyan-600" />
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