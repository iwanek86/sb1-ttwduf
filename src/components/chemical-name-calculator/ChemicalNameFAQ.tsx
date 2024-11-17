import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is IUPAC nomenclature?',
    answer: 'IUPAC nomenclature is the standardized system for naming chemical compounds developed by the International Union of Pure and Applied Chemistry. It provides unambiguous naming rules that are recognized globally.'
  },
  {
    question: 'Why do some compounds have multiple names?',
    answer: 'Compounds can have multiple names due to historical usage (common names), different naming systems, or regional variations. While IUPAC names are systematic, common names are often used in everyday contexts.'
  },
  {
    question: 'How are chemical formulas written?',
    answer: 'Chemical formulas are written using element symbols and numerical subscripts. The order typically follows electronegativity rules for binary compounds, while more complex molecules follow specific conventions.'
  },
  {
    question: 'What do prefixes like mono-, di-, tri- mean?',
    answer: 'These prefixes indicate the number of atoms of each element in a molecule. Mono- means one, di- means two, tri- means three, and so on. They are essential in systematic naming of molecular compounds.'
  },
  {
    question: 'How are ionic compounds named?',
    answer: 'Ionic compounds are named by stating the cation (positive ion) first, followed by the anion (negative ion). The charge of the ions determines any needed roman numerals or prefixes in the name.'
  }
];

export function ChemicalNameFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-emerald-600" />
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