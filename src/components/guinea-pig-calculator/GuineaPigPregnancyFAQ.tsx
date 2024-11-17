import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long is a guinea pig pregnancy?',
    answer: 'Guinea pig pregnancy typically lasts 59-72 days, with an average of 65 days. First-time pregnancies may be slightly longer, and the range allows for normal variation.'
  },
  {
    question: 'How can I tell if my guinea pig is pregnant?',
    answer: 'Signs include weight gain, enlarged abdomen, increased appetite, and changes in behavior. A veterinarian can confirm pregnancy through physical examination or ultrasound.'
  },
  {
    question: 'What special care does a pregnant guinea pig need?',
    answer: 'Pregnant guinea pigs need extra calcium, vitamin C, and high-quality hay. Avoid handling in late pregnancy, provide quiet environment, and ensure fresh water. Regular vet check-ups are important.'
  },
  {
    question: 'When should I separate the male?',
    answer: 'Separate the male immediately after mating is observed or pregnancy is suspected. Female guinea pigs can become pregnant again immediately after giving birth.'
  },
  {
    question: 'How many babies do guinea pigs usually have?',
    answer: 'Guinea pigs typically have 2-4 pups per litter, though litters of 1-6 are possible. Unlike many rodents, guinea pig babies are born fully developed with fur and open eyes.'
  }
];

export function GuineaPigPregnancyFAQ() {
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