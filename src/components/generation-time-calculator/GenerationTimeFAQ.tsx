import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is generation time?',
    answer: 'Generation time, also known as doubling time, is the time required for a bacterial population to double in number during the exponential growth phase. It\'s a key measure of bacterial growth rate.'
  },
  {
    question: 'How is growth rate calculated?',
    answer: 'Growth rate (μ) is calculated using the formula μ = ln(2)/generation time. It represents the increase in bacterial population per unit time during exponential growth.'
  },
  {
    question: 'What affects generation time?',
    answer: 'Generation time is affected by various factors including temperature, nutrient availability, pH, oxygen levels, and bacterial species. Optimal conditions result in shorter generation times.'
  },
  {
    question: 'What are the different growth phases?',
    answer: 'Bacterial growth has four main phases: lag phase (adaptation), exponential phase (rapid growth), stationary phase (equilibrium), and death phase (population decline).'
  },
  {
    question: 'Why is measuring generation time important?',
    answer: 'Generation time is crucial for understanding bacterial population dynamics, optimizing culture conditions, and predicting bacterial growth in various applications like food safety, biotechnology, and medical research.'
  }
];

export function GenerationTimeFAQ() {
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