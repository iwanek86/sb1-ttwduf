import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is average atomic mass?',
    answer: 'Average atomic mass is the weighted average of all naturally occurring isotopes of an element. It considers both the mass of each isotope and its natural abundance in the calculation.'
  },
  {
    question: 'How is average atomic mass calculated?',
    answer: 'Average atomic mass is calculated by multiplying each isotope\'s mass by its natural abundance (as a percentage divided by 100), then summing these products. For example: (mass₁ × abundance₁) + (mass₂ × abundance₂) + ...'
  },
  {
    question: 'Why do we use weighted averages?',
    answer: 'Weighted averages account for the different natural abundances of isotopes. Since some isotopes are more common than others, they should have a proportionally larger influence on the average mass.'
  },
  {
    question: 'What affects natural abundance?',
    answer: 'Natural abundance can vary slightly by location and can be affected by geological processes, but is generally consistent enough for practical purposes. Some variation may occur in different environmental samples.'
  },
  {
    question: 'How accurate are the calculations?',
    answer: 'The calculations are highly accurate when using precise isotopic masses and abundances. However, natural variations in isotopic abundance can cause slight differences in average atomic mass depending on the sample source.'
  }
];

export function AverageAtomicMassFAQ() {
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