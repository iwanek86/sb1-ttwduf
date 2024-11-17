import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long is goat pregnancy?',
    answer: 'Goat pregnancy (gestation) typically lasts 150 days or about 5 months, with a normal range of 145-155 days. The exact duration can vary based on breed, age, and individual factors.'
  },
  {
    question: 'How can I tell if a goat is pregnant?',
    answer: 'Early pregnancy can be confirmed through ultrasound at 30-40 days or blood test at 30 days. Later signs include absence of heat cycles, udder development, increased appetite, and abdominal enlargement.'
  },
  {
    question: 'What special care do pregnant goats need?',
    answer: 'Pregnant goats need proper nutrition with adequate protein and energy, regular health checks, appropriate vaccinations, and exercise. Nutrition requirements increase significantly in the last two months.'
  },
  {
    question: 'When should I separate the pregnant goat?',
    answer: 'Move the doe to a kidding pen about 1-2 weeks before the expected due date. The area should be clean, dry, and draft-free with good bedding and easy access to food and water.'
  },
  {
    question: 'What are the signs of approaching kidding?',
    answer: 'Signs include udder filling, ligament softening, restlessness, pawing at bedding, and isolation from the herd. The doe may also vocalize more and show discharge. These typically appear 12-24 hours before kidding.'
  }
];

export function GoatGestationFAQ() {
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