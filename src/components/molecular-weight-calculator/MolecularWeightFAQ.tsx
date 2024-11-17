import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is molecular weight?',
    answer: 'Molecular weight (MW) is the sum of the atomic weights of all atoms in a molecule. It represents the mass of one mole of a substance and is typically expressed in grams per mole (g/mol).'
  },
  {
    question: 'How do you calculate molecular weight?',
    answer: 'To calculate molecular weight, identify each element in the chemical formula, multiply its atomic mass by the number of atoms present, and sum all these products. For example, for H2O: (2 × H) + (1 × O) = (2 × 1.008) + (1 × 15.999) = 18.015 g/mol.'
  },
  {
    question: 'What is the difference between molecular weight and molar mass?',
    answer: 'Molecular weight and molar mass are numerically identical but have different contexts. Molecular weight is a dimensionless relative mass, while molar mass is expressed in g/mol and represents the mass of one mole of a substance.'
  },
  {
    question: 'How is molecular weight used in chemistry?',
    answer: 'Molecular weight is essential for stoichiometry calculations, determining solution concentrations, calculating gas properties, and preparing chemical solutions. It\'s a fundamental concept in quantitative chemistry.'
  },
  {
    question: 'What is empirical formula and how is it related to molecular weight?',
    answer: 'An empirical formula shows the simplest whole-number ratio of atoms in a compound. The molecular weight helps determine the relationship between empirical and molecular formulas, as the molecular formula is often a multiple of the empirical formula.'
  }
];

export function MolecularWeightFAQ() {
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