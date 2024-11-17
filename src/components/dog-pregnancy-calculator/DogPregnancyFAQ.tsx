import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long is dog pregnancy?',
    answer: 'Dog pregnancy (gestation) typically lasts 63 days from ovulation, with a normal range of 58-68 days from breeding. The exact duration can vary based on breed size, litter size, and individual factors.'
  },
  {
    question: 'How can I tell if my dog is pregnant?',
    answer: 'Early pregnancy can be confirmed through veterinary examination around 25-35 days after breeding. Signs include decreased appetite early on, followed by increased appetite, weight gain, enlarged nipples, and behavioral changes.'
  },
  {
    question: 'What special care do pregnant dogs need?',
    answer: 'Pregnant dogs need proper nutrition with increased calories in later stages, regular gentle exercise, veterinary check-ups, and a clean, quiet environment. Avoid strenuous activity and maintain regular vaccinations as recommended by your vet.'
  },
  {
    question: 'When should I prepare the whelping box?',
    answer: 'Prepare the whelping box 1-2 weeks before the due date. Place it in a quiet, warm area where the mother feels secure. The box should be large enough for the mother to move comfortably and have raised sides to contain the puppies.'
  },
  {
    question: 'What are the signs of approaching labor?',
    answer: 'Signs include restlessness, nesting behavior, decreased appetite, temperature drop below 100°F (normal is 101-102.5°F), and clear vaginal discharge. These typically appear 12-24 hours before labor begins.'
  }
];

export function DogPregnancyFAQ() {
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