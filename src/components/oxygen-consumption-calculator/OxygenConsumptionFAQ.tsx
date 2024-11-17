import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is respiratory quotient (RQ)?',
    answer: 'Respiratory quotient (RQ) is the ratio of carbon dioxide produced to oxygen consumed during metabolism. It indicates which energy substrates (carbohydrates, fats, or proteins) are being metabolized.'
  },
  {
    question: 'How do RQ values indicate substrate use?',
    answer: 'Different RQ values indicate different substrate utilization: 1.0 for pure carbohydrate metabolism, 0.7 for pure fat metabolism, and around 0.8 for protein metabolism. Mixed substrate use gives intermediate values.'
  },
  {
    question: 'What affects oxygen consumption?',
    answer: 'Oxygen consumption is affected by physical activity, body size, temperature, metabolic rate, and the type of substrate being metabolized. Environmental factors like altitude can also influence consumption rates.'
  },
  {
    question: 'Why measure CO₂ production?',
    answer: 'CO₂ production measurement, along with O₂ consumption, helps determine RQ and understand which energy sources are being used. It\'s essential for calculating energy expenditure and metabolic rate.'
  },
  {
    question: 'How is metabolic rate calculated?',
    answer: 'Metabolic rate is calculated from oxygen consumption using conversion factors. Each liter of oxygen consumed represents approximately 4.82 kcal of energy expenditure, varying slightly with the substrate being metabolized.'
  }
];

export function OxygenConsumptionFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600" />
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