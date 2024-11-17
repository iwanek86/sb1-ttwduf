import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is exponential growth?',
    answer: 'Exponential growth occurs when a population increases at a constant rate over time, with each individual producing a fixed number of offspring. The population grows faster as it gets larger, resulting in a J-shaped curve.'
  },
  {
    question: 'What is logistic growth?',
    answer: 'Logistic growth occurs when population growth is limited by factors like resources or space. Growth starts exponentially but slows as the population approaches carrying capacity, resulting in an S-shaped curve.'
  },
  {
    question: 'What is carrying capacity?',
    answer: 'Carrying capacity is the maximum population size that can be sustained indefinitely in an environment given the available resources (food, water, space, etc.). It represents the upper limit in logistic growth.'
  },
  {
    question: 'How is growth rate calculated?',
    answer: 'Growth rate is calculated as the percentage change in population size per unit time. It considers births, deaths, immigration, and emigration. A positive rate indicates growth, while a negative rate indicates decline.'
  },
  {
    question: 'What affects population growth?',
    answer: 'Population growth is affected by birth rates, death rates, immigration, emigration, resource availability, competition, predation, disease, and environmental conditions. These factors can be density-dependent or density-independent.'
  }
];

export function PopulationGrowthFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-green-600" />
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