import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is molarity?',
    answer: 'Molarity (M) is a measure of solution concentration that expresses the number of moles of solute per liter of solution. It\'s one of the most common ways to express concentration in chemistry.'
  },
  {
    question: 'How do you calculate molarity?',
    answer: 'Molarity is calculated by dividing the number of moles of solute by the volume of solution in liters. The formula is M = moles/liters. For example, 2 moles in 1 liter gives a 2M solution.'
  },
  {
    question: 'What is the dilution equation?',
    answer: 'The dilution equation is M₁V₁ = M₂V₂, where M₁ and V₁ are the initial molarity and volume, and M₂ and V₂ are the final molarity and volume. This equation shows that the number of moles remains constant during dilution.'
  },
  {
    question: 'Why is molarity important?',
    answer: 'Molarity is important for preparing solutions, performing chemical reactions, and maintaining proper concentrations in various applications. It\'s essential in laboratory work, industrial processes, and chemical analysis.'
  },
  {
    question: 'How do you prepare a solution of specific molarity?',
    answer: 'To prepare a solution, first calculate the mass of solute needed using the desired molarity and volume. Dissolve this mass in less than the final volume of solvent, then add solvent to reach the final volume while stirring.'
  }
];

export function MolarityFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-orange-600" />
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