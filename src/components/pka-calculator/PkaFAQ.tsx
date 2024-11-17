import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is pKa?',
    answer: 'pKa is the negative logarithm of the acid dissociation constant (Ka). It indicates how readily an acid gives up a proton, with lower values indicating stronger acids.'
  },
  {
    question: 'How do you convert between Ka and pKa?',
    answer: 'To convert Ka to pKa, use the formula pKa = -log₁₀(Ka). To convert pKa to Ka, use Ka = 10^(-pKa). The relationship is logarithmic, similar to pH and [H⁺].'
  },
  {
    question: 'What does pKa tell you about acid strength?',
    answer: 'pKa indicates acid strength: lower values mean stronger acids. Strong acids have pKa < 0, moderate acids have pKa between 0-4, and weak acids have pKa > 4.'
  },
  {
    question: 'How does pKa relate to pH?',
    answer: 'At the half-neutralization point of an acid, the pH equals the pKa. This is important for buffer solutions, where pH ≈ pKa ± log([base]/[acid]).'
  },
  {
    question: 'Why is pKa important in chemistry?',
    answer: 'pKa is crucial for understanding acid-base reactions, designing buffer solutions, predicting chemical behavior, and in biochemistry for understanding protein function and drug absorption.'
  }
];

export function PkaFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-sky-600" />
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