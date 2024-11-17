import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is electron configuration?',
    answer: 'Electron configuration is the arrangement of electrons around an atom\'s nucleus. It shows how electrons are distributed in atomic orbitals, following specific rules and principles of quantum mechanics.'
  },
  {
    question: 'What is noble gas notation?',
    answer: 'Noble gas notation is a shorthand way of writing electron configurations by using the symbol of the previous noble gas in brackets, followed by the remaining electron configuration.'
  },
  {
    question: 'What are valence electrons?',
    answer: 'Valence electrons are the electrons in the outermost shell of an atom. They determine the atom\'s chemical properties and how it bonds with other atoms.'
  },
  {
    question: 'How do you read orbital diagrams?',
    answer: 'Orbital diagrams show electron distribution using boxes (orbitals) and arrows (electrons). Up and down arrows represent electrons with opposite spins, and boxes represent available orbitals.'
  },
  {
    question: 'Why are some configurations irregular?',
    answer: 'Some elements have irregular configurations due to the stability gained from having half-filled or fully-filled subshells. This is why some electrons may fill different orbitals than predicted by the standard order.'
  }
];

export function ElectronConfigFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-amber-600" />
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