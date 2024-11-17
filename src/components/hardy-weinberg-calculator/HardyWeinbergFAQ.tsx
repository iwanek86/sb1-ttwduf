import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is Hardy-Weinberg equilibrium?',
    answer: 'Hardy-Weinberg equilibrium is a principle stating that allele and genotype frequencies in a population will remain constant from generation to generation under specific conditions, including random mating and no selection pressure.'
  },
  {
    question: 'How do you calculate allele frequencies?',
    answer: 'Allele frequencies (p and q) are calculated from genotype frequencies. For a dominant allele (A), p = frequency of AA + (½ × frequency of Aa). For a recessive allele (a), q = frequency of aa + (½ × frequency of Aa).'
  },
  {
    question: 'What conditions are required for Hardy-Weinberg equilibrium?',
    answer: 'The conditions include: random mating, no natural selection, no mutation, no migration (gene flow), and large population size. Violations of these conditions can cause deviations from equilibrium.'
  },
  {
    question: 'How do you test for Hardy-Weinberg equilibrium?',
    answer: 'Hardy-Weinberg equilibrium is tested using a chi-square test comparing observed genotype frequencies to expected frequencies calculated from allele frequencies. A p-value > 0.05 suggests the population is in equilibrium.'
  },
  {
    question: 'Why is Hardy-Weinberg equilibrium important?',
    answer: 'Hardy-Weinberg equilibrium provides a null model for population genetics. Deviations from equilibrium can indicate evolutionary forces at work, such as selection, mutation, or non-random mating.'
  }
];

export function HardyWeinbergFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-pink-600" />
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