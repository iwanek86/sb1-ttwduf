import React from 'react';
import { HelpCircle } from 'lucide-react';

export function PhFAQ() {
  const faqs = [
    {
      question: 'What is pH?',
      answer: 'pH is a measure of the hydrogen ion concentration in a solution, indicating how acidic or basic it is. The scale ranges from 0 to 14, with 7 being neutral.'
    },
    {
      question: 'How do I interpret pH values?',
      answer: 'Values below 7 are acidic, 7 is neutral, and values above 7 are basic (alkaline). Each whole number represents a tenfold change in acidity or alkalinity.'
    },
    {
      question: 'What is pOH?',
      answer: 'pOH is the negative logarithm of the hydroxide ion concentration. It complements pH, and their sum always equals 14 in water at 25°C.'
    },
    {
      question: 'Why is pH important?',
      answer: 'pH is crucial in many fields including chemistry, biology, medicine, agriculture, and industry. It affects chemical reactions, biological processes, and product quality.'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}