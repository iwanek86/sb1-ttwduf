import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do cats age compared to humans?',
    answer: 'Cats age much faster than humans in their first two years. The first year equals about 15 human years, the second year adds 9 more years, and each subsequent year is approximately 4 human years.'
  },
  {
    question: 'Why do cats age faster than humans?',
    answer: 'Cats have a faster metabolism and reach maturity more quickly than humans. Their shorter lifespan means they progress through life stages more rapidly, particularly in their early years.'
  },
  {
    question: 'Do indoor and outdoor cats age differently?',
    answer: 'While they age at the same rate, indoor cats typically live longer due to reduced exposure to risks like accidents, diseases, and predators. Indoor cats can live 12-18 years, while outdoor cats often live 8-12 years.'
  },
  {
    question: 'How can I tell my cat\'s age without papers?',
    answer: 'A veterinarian can estimate your cat\'s age by examining their teeth, coat, eyes, and muscle tone. Teeth are particularly useful as kittens get their adult teeth at specific ages.'
  },
  {
    question: 'What age is considered senior for cats?',
    answer: 'Cats are typically considered senior when they reach 11 years old (about 60 human years). However, cats 15 years and older are considered super senior and may need special care.'
  }
];

export function CatAgeFAQ() {
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