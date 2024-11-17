import React from 'react';
import { AtomCalculator } from '../../components/atom-calculator/AtomCalculator';
import { AtomicStructure } from '../../components/atom-calculator/AtomicStructure';
import { AtomFAQ } from '../../components/atom-calculator/AtomFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function AtomCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Atom Calculator"
      description="Calculate atomic properties, electron configurations, and explore atomic structure with our comprehensive atomic calculator"
      metaDescription="Free online Atom Calculator: Determine atomic properties, electron configurations, and atomic structure. Features interactive periodic table, detailed atomic structure visualization, and expert explanations for chemistry students and professionals."
      keywords={[
        'atom calculator',
        'atomic structure',
        'electron configuration',
        'atomic number calculator',
        'atomic mass calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Atomic Structure",
        content: "Atoms are the fundamental building blocks of matter. Our calculator helps you explore atomic properties, determine electron configurations, and understand atomic structure through interactive calculations and visualizations."
      }}
      calculator={
        <AtomCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-purple-50 to-blue-50',
            secondaryColor: 'text-purple-600',
            accentColor: 'bg-purple-100'
          }}
        />
      }
      additionalSections={[
        <AtomicStructure key="atomic-structure" />,
        <AtomFAQ key="faq" />
      ]}
      notes={[
        'Atomic number determines the number of protons in the nucleus',
        'Mass number is the sum of protons and neutrons',
        'Electron configuration follows the Aufbau principle',
        'Valence electrons determine chemical properties',
        'Isotopes have the same atomic number but different mass numbers',
        'The periodic table organizes elements by atomic structure'
      ]}
    />
  );
}