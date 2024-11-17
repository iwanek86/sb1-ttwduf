import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is atomic number?',
    answer: 'The atomic number is the number of protons in an atom\'s nucleus. It defines the element and determines its chemical properties. All atoms of the same element have the same atomic number.'
  },
  {
    question: 'How is mass number calculated?',
    answer: 'Mass number is the total number of protons and neutrons in an atom\'s nucleus. It can be calculated by adding the number of protons (atomic number) and the number of neutrons.'
  },
  {
    question: 'What are electron shells?',
    answer: 'Electron shells are energy levels around an atom\'s nucleus where electrons are found. Each shell can hold a specific maximum number of electrons, following the 2n² rule, where n is the shell number.'
  },
  {
    question: 'What are valence electrons?',
    answer: 'Valence electrons are the electrons in the outermost shell of an atom. They determine the atom\'s chemical properties and how it bonds with other atoms. Most atoms are most stable with 8 valence electrons.'
  },
  {
    question: 'How is electron configuration written?',
    answer: 'Electron configuration shows how electrons are distributed in atomic orbitals. It uses numbers and letters (1s, 2s, 2p, etc.) to indicate the shell and subshell, followed by the number of electrons in that subshell.'
  }
];

export function AtomFAQ() {
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