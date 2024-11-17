import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is surface area to volume ratio?',
    answer: 'Surface area to volume ratio (SA:V) is the amount of surface area per unit volume of an object. In cells, it indicates how efficiently materials can be exchanged with the environment relative to the cell\'s size.'
  },
  {
    question: 'Why is SA:V ratio important for cells?',
    answer: 'SA:V ratio determines how efficiently a cell can exchange materials with its environment. Higher ratios allow for more efficient nutrient uptake, waste removal, and gas exchange, which are essential for cell survival.'
  },
  {
    question: 'How does size affect SA:V ratio?',
    answer: 'As an object grows larger, its volume increases faster than its surface area, resulting in a decreasing SA:V ratio. This is why cells have size limitations and why larger organisms need specialized systems for material exchange.'
  },
  {
    question: 'Which shape has the best SA:V ratio?',
    answer: 'For a given volume, a sphere has the smallest surface area and thus the lowest SA:V ratio. However, many cells adopt different shapes to balance efficiency with other functional requirements.'
  },
  {
    question: 'How do cells optimize their SA:V ratio?',
    answer: 'Cells can optimize their SA:V ratio through various strategies including remaining small, developing irregular surfaces (like microvilli), flattening, or elongating. Each adaptation helps increase surface area relative to volume.'
  }
];

export function SurfaceAreaVolumeFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-emerald-600" />
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