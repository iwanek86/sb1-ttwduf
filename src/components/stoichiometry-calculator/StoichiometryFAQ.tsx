import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is stoichiometry?',
    answer: 'Stoichiometry is the calculation of relative quantities of reactants and products in chemical reactions. It involves using balanced equations to determine how much product can be made from given amounts of reactants.'
  },
  {
    question: 'How do you balance chemical equations?',
    answer: 'To balance chemical equations, add coefficients before compounds to ensure equal numbers of each type of atom on both sides. Start with the most complex molecules and work towards simpler ones, while maintaining the chemical formulas.'
  },
  {
    question: 'What is a limiting reagent?',
    answer: 'A limiting reagent is the reactant that is completely consumed in a reaction and determines the maximum amount of product that can be formed. Other reactants are in excess and will have leftovers.'
  },
  {
    question: 'How do you calculate percent yield?',
    answer: 'Percent yield is calculated by dividing the actual yield by the theoretical yield and multiplying by 100: (actual yield ÷ theoretical yield) × 100%. It indicates reaction efficiency.'
  },
  {
    question: 'Why are actual yields usually less than theoretical yields?',
    answer: 'Actual yields are usually lower due to factors like incomplete reactions, side reactions, impure reactants, loss during collection, and experimental error. Perfect 100% yields are rare in real chemical processes.'
  }
];

export function StoichiometryFAQ() {
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