import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is enzyme kinetics?',
    answer: 'Enzyme kinetics is the study of how enzymes catalyze biochemical reactions. It involves measuring reaction rates and understanding how factors like substrate concentration, temperature, and pH affect enzyme activity.'
  },
  {
    question: 'What is the Michaelis-Menten equation?',
    answer: 'The Michaelis-Menten equation (v = Vmax[S]/(Km + [S])) describes the relationship between substrate concentration [S] and reaction velocity (v). Vmax is the maximum velocity, and Km is the Michaelis constant.'
  },
  {
    question: 'What does Km tell us?',
    answer: 'Km (Michaelis constant) is the substrate concentration at which the reaction rate is half of Vmax. It indicates an enzyme\'s affinity for its substrate - a lower Km means higher affinity.'
  },
  {
    question: 'What is kcat?',
    answer: 'kcat (turnover number) is the maximum number of substrate molecules converted to product per enzyme molecule per second. It represents the catalytic capacity of an enzyme under optimal conditions.'
  },
  {
    question: 'What is catalytic efficiency?',
    answer: 'Catalytic efficiency (kcat/Km) measures how efficiently an enzyme converts substrate to product. Higher values indicate better enzyme performance, with diffusion-limited enzymes approaching 10⁸-10⁹ M⁻¹s⁻¹.'
  }
];

export function EnzymeKineticsFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-violet-600" />
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