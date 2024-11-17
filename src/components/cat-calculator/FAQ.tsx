import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long is a cat pregnancy?',
    answer: 'Cat pregnancy typically lasts between 63-67 days, with an average of 65 days from the date of mating.'
  },
  {
    question: 'How can I tell if my cat is pregnant?',
    answer: 'Early signs include pink nipples (2-3 weeks), morning sickness, increased appetite, and weight gain. A veterinarian can confirm pregnancy through physical examination or ultrasound.'
  },
  {
    question: 'When can you feel kittens moving in a pregnant cat?',
    answer: 'Kitten movement can usually be felt around day 40-45 of pregnancy, though this may vary. Your veterinarian can show you how to safely feel for movement.'
  },
  {
    question: 'What should I feed my pregnant cat?',
    answer: 'Pregnant cats need high-quality kitten food that\'s rich in protein and calories. Consult your vet for specific dietary recommendations based on your cat\'s needs.'
  },
  {
    question: 'When should I prepare a nesting box?',
    answer: 'Prepare a nesting box around week 7-8 of pregnancy (about 2 weeks before the due date). Place it in a quiet, warm, and safe location.'
  },
  {
    question: 'How accurate is the pregnancy calculator?',
    answer: 'The calculator provides estimates based on average cat pregnancy duration. Individual pregnancies may vary by a few days. Regular vet check-ups are recommended for more accurate monitoring.'
  }
];

export function FAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
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