import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What do blood pressure numbers mean?',
    answer: 'Blood pressure is measured with two numbers: systolic (top number) shows pressure during heart beats, and diastolic (bottom number) shows pressure between beats. For example, 120/80 mmHg.'
  },
  {
    question: 'What is considered normal blood pressure?',
    answer: 'Normal blood pressure is generally considered to be below 120/80 mmHg. Elevated is 120-129/<80 mmHg, Stage 1 hypertension is 130-139/80-89 mmHg, and Stage 2 hypertension is 140+/90+ mmHg.'
  },
  {
    question: 'When should I measure blood pressure?',
    answer: 'Take readings at the same time each day, preferably in the morning before medications and in the evening. Avoid caffeine, exercise, and smoking for 30 minutes before measuring.'
  },
  {
    question: 'Why does blood pressure fluctuate?',
    answer: 'Blood pressure naturally varies throughout the day due to factors like activity level, stress, medications, food and drink intake, and time of day. This is why multiple readings over time are important.'
  },
  {
    question: 'How can I lower my blood pressure?',
    answer: 'Lifestyle changes can help lower blood pressure, including regular exercise, reducing sodium intake, maintaining healthy weight, limiting alcohol, managing stress, and following a healthy diet like DASH.'
  }
];

export function BloodPressureFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-red-600" />
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