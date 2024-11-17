import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is atomic mass?',
    answer: 'Atomic mass is the weighted average mass of all naturally occurring isotopes of an element, measured in atomic mass units (amu). It considers both the mass and abundance of each isotope.'
  },
  {
    question: 'How is atomic mass calculated?',
    answer: 'Atomic mass is calculated by multiplying each isotope\'s mass by its natural abundance (as a decimal), then summing these products. The result is the weighted average mass of the element.'
  },
  {
    question: 'What is an atomic mass unit (amu)?',
    answer: 'An atomic mass unit (amu) is defined as exactly 1/12 the mass of a carbon-12 atom. This standard provides a convenient scale for expressing atomic and molecular masses.'
  },
  {
    question: 'Why do elements have different isotopes?',
    answer: 'Isotopes are atoms of the same element with different numbers of neutrons in their nuclei. While they have the same number of protons (atomic number), their different neutron counts result in different mass numbers.'
  },
  {
    question: 'How does isotopic abundance affect atomic mass?',
    answer: 'The natural abundance of isotopes determines their contribution to the element\'s average atomic mass. More abundant isotopes have a greater influence on the final weighted average.'
  }
];

export function AtomicMassFAQ() {
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