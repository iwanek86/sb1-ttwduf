import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is percent composition?',
    answer: 'Percent composition is the mass percentage of each element in a chemical compound. It shows how much of the compound\'s total mass is contributed by each element.'
  },
  {
    question: 'How do you calculate percent composition?',
    answer: 'To calculate percent composition, divide the mass of each element in one mole of the compound by the compound\'s total molar mass, then multiply by 100. The formula is: (element mass ÷ total mass) × 100%.'
  },
  {
    question: 'Why is percent composition important?',
    answer: 'Percent composition helps identify unknown compounds, verify sample purity, determine empirical formulas, and understand the relative abundance of elements in compounds. It\'s essential for chemical analysis and quality control.'
  },
  {
    question: 'What affects percent composition?',
    answer: 'Percent composition depends on the atomic masses of the elements and their ratios in the compound. It remains constant for a pure compound but can vary in mixtures or if impurities are present.'
  },
  {
    question: 'How is this used in real applications?',
    answer: 'Percent composition is used in quality control of chemicals, environmental analysis, pharmaceutical manufacturing, and materials science. It helps verify product composition and ensure manufacturing consistency.'
  }
];

export function PercentCompositionFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-teal-600" />
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