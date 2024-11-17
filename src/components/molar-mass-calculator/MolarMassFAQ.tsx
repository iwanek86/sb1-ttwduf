import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is molar mass?',
    answer: 'Molar mass is the mass of one mole of a substance, expressed in grams per mole (g/mol). It is calculated by summing the atomic masses of all atoms in a molecule multiplied by their respective quantities.'
  },
  {
    question: 'How do you calculate molar mass?',
    answer: 'To calculate molar mass, identify each element in the chemical formula, multiply its atomic mass by the number of atoms present, and sum all these products. For example, for H2O: (2 × H) + (1 × O) = (2 × 1.008) + (1 × 15.999) = 18.015 g/mol.'
  },
  {
    question: 'Why is molar mass important?',
    answer: 'Molar mass is essential for stoichiometry calculations, determining solution concentrations, and converting between mass and moles. It\'s a fundamental concept in chemistry that helps quantify chemical reactions and prepare solutions.'
  },
  {
    question: 'What are the units of molar mass?',
    answer: 'Molar mass is expressed in grams per mole (g/mol). This unit represents the mass in grams of one mole of a substance, where a mole is 6.022 × 10²³ particles (Avogadro\'s number).'
  },
  {
    question: 'How do you handle polyatomic ions?',
    answer: 'Polyatomic ions are treated as units in the formula. Calculate the molar mass of the entire ion by summing its constituent atoms, then multiply by the number of times it appears in the compound.'
  }
];

export function MolarMassFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600" />
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