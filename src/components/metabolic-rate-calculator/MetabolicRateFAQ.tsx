import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is basal metabolic rate (BMR)?',
    answer: 'Basal metabolic rate (BMR) is the minimum amount of energy required to maintain basic life functions at rest, such as breathing, circulation, and cell production. It represents about 60-75% of daily energy expenditure.'
  },
  {
    question: 'How does activity level affect metabolism?',
    answer: 'Activity level increases total daily energy expenditure above BMR. The more active you are, the more energy you need. This is calculated using activity factors that multiply BMR to estimate total daily needs.'
  },
  {
    question: 'Why do metabolic rates vary between species?',
    answer: 'Metabolic rates vary due to differences in body size, temperature regulation (warm vs. cold-blooded), activity levels, and evolutionary adaptations. Smaller organisms generally have higher metabolic rates per unit mass.'
  },
  {
    question: 'How does temperature affect metabolism?',
    answer: 'Temperature significantly affects metabolism, especially in ectothermic (cold-blooded) animals. Generally, metabolic rate increases with temperature up to an optimal point, following the Q10 principle.'
  },
  {
    question: 'What factors influence BMR?',
    answer: 'BMR is influenced by body size, composition (muscle vs. fat), age, sex, genetics, hormones, temperature, and health status. Regular exercise and muscle mass tend to increase BMR.'
  }
];

export function MetabolicRateFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-yellow-600" />
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