import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is the cell cycle?',
    answer: 'The cell cycle is the series of events that cells undergo as they grow and divide. It includes interphase (G1, S, and G2 phases) and the M phase (mitosis and cytokinesis).'
  },
  {
    question: 'How long does cell division take?',
    answer: 'Cell division time varies greatly by cell type. Human cells typically take 24 hours to complete one cycle, while yeast cells can divide every 2 hours, and embryonic cells can divide even faster.'
  },
  {
    question: 'What affects cell division timing?',
    answer: 'Cell division timing is affected by factors including cell type, nutrients, growth factors, temperature, and cell cycle checkpoints that ensure proper division.'
  },
  {
    question: 'Why do different cells divide at different rates?',
    answer: 'Different division rates reflect cellular functions and needs. Skin cells divide frequently to replace lost cells, while nerve cells rarely divide. This is regulated by growth factors and genetic controls.'
  },
  {
    question: 'What are cell cycle checkpoints?',
    answer: 'Checkpoints are control mechanisms that ensure proper cell division. They verify DNA integrity, cell size, and environmental conditions before allowing progression through the cell cycle.'
  }
];

export function CellDivisionFAQ() {
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