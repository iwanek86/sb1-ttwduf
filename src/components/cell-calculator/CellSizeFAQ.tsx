import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Why is cell size important?',
    answer: 'Cell size is crucial because it affects the cell\'s ability to exchange materials with its environment, maintain structural integrity, and perform its functions efficiently. The surface area to volume ratio is particularly important for nutrient exchange and waste removal.'
  },
  {
    question: 'What determines cell size?',
    answer: 'Cell size is determined by several factors including genetic control, functional requirements, metabolic needs, and physical constraints such as diffusion distances and surface area to volume ratios.'
  },
  {
    question: 'Why can\'t cells be too large?',
    answer: 'Cells can\'t be too large because diffusion becomes inefficient over long distances. As a cell grows, its volume increases faster than its surface area, making it harder to exchange materials with the environment and maintain cellular functions.'
  },
  {
    question: 'How does cell shape affect size?',
    answer: 'Cell shape affects the surface area to volume ratio. Different shapes can maximize surface area while maintaining the same volume, allowing for more efficient material exchange. This is why many cells have irregular or elongated shapes.'
  },
  {
    question: 'What is the typical size range for cells?',
    answer: 'Most cells range from 1 to 100 micrometers in diameter. Bacterial cells are typically 1-10 μm, while animal cells are usually 10-100 μm. Some specialized cells can be much larger or smaller.'
  }
];

export function CellSizeFAQ() {
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