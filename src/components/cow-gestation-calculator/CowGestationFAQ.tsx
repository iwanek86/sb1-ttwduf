import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long is cow pregnancy?',
    answer: 'Cow pregnancy (gestation) typically lasts 283 days or about 9.3 months, with a normal range of 279-287 days. The exact duration can vary based on factors like breed, age, and individual variation.'
  },
  {
    question: 'How can I tell if a cow is pregnant?',
    answer: 'Early pregnancy can be confirmed through rectal palpation by a veterinarian around 35-40 days after breeding, or through ultrasound at 28-30 days. Later signs include absence of heat cycles, increased abdomen size, and udder development.'
  },
  {
    question: 'What special care do pregnant cows need?',
    answer: 'Pregnant cows need proper nutrition with adequate protein and energy, regular health checks, appropriate vaccinations, and stress minimization. Nutrition requirements increase significantly in the last trimester.'
  },
  {
    question: 'When should I separate the pregnant cow?',
    answer: 'Move the cow to a calving area about 1-2 weeks before the expected due date. This area should be clean, dry, and quiet, with good footing and protection from weather extremes.'
  },
  {
    question: 'What are the signs of approaching calving?',
    answer: 'Signs include udder filling, relaxation of pelvic ligaments, vulvar swelling, restlessness, and isolation from the herd. These typically appear 1-2 weeks before calving.'
  }
];

export function CowGestationFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-amber-600" />
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