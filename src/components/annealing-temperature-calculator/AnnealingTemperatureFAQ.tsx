import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is annealing temperature?',
    answer: 'Annealing temperature is the temperature at which PCR primers bind to their complementary sequences on the template DNA. It\'s typically 5°C below the primer melting temperature (Tm) and is crucial for PCR specificity.'
  },
  {
    question: 'How does salt concentration affect annealing?',
    answer: 'Salt concentration affects the stability of primer-template binding. Higher salt concentrations increase the melting temperature by stabilizing the DNA duplex, while lower concentrations decrease it.'
  },
  {
    question: 'What is the optimal primer length?',
    answer: 'Optimal primer length is typically 18-22 nucleotides. Shorter primers may lack specificity, while longer primers may have reduced binding efficiency and increased risk of secondary structure formation.'
  },
  {
    question: 'How does GC content affect annealing?',
    answer: 'GC content affects primer melting temperature because G-C pairs have three hydrogen bonds compared to A-T\'s two bonds. Higher GC content results in higher melting and annealing temperatures.'
  },
  {
    question: 'What causes non-specific binding?',
    answer: 'Non-specific binding can occur when the annealing temperature is too low, primers are poorly designed, or salt concentrations are suboptimal. This can lead to unwanted PCR products and reduced efficiency.'
  }
];

export function AnnealingTemperatureFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-purple-600" />
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