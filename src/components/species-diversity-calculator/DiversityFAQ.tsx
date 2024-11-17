import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is species diversity?',
    answer: 'Species diversity is a measure of biodiversity that considers both the number of different species (richness) and their relative abundances (evenness) in a community. It provides insights into ecosystem health and stability.'
  },
  {
    question: 'What does the Shannon-Wiener Index measure?',
    answer: 'The Shannon-Wiener Index measures species diversity by combining richness and evenness. Higher values indicate greater diversity. It\'s sensitive to rare species and considers the proportional abundance of each species.'
  },
  {
    question: 'How is Simpson\'s Index different?',
    answer: 'Simpson\'s Index measures the probability that two randomly selected individuals belong to different species. It ranges from 0 to 1, with higher values indicating greater diversity. It gives more weight to common species.'
  },
  {
    question: 'Why is evenness important?',
    answer: 'Evenness measures how equally abundant different species are in a community. High evenness indicates a stable ecosystem where resources are well-distributed. Low evenness suggests dominance by one or few species.'
  },
  {
    question: 'How do you interpret diversity indices?',
    answer: 'Diversity indices should be compared between similar habitats or over time. Higher values generally indicate healthier ecosystems, but local context matters. Consider multiple indices for a complete understanding.'
  }
];

export function DiversityFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-lime-600" />
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