import React from 'react';
import { AtomicMassCalculator } from '../../components/atomic-mass-calculator/AtomicMassCalculator';
import { MassGuide } from '../../components/atomic-mass-calculator/MassGuide';
import { AtomicMassFAQ } from '../../components/atomic-mass-calculator/AtomicMassFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function AtomicMassCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Atomic Mass Calculator"
      description="Calculate atomic mass, isotopic mass, and explore the relationship between atomic number and mass number"
      metaDescription="Free online Atomic Mass Calculator: Calculate atomic mass, isotopic mass, and molecular weight. Features periodic table integration, isotope analysis, and detailed explanations for chemistry students and professionals."
      keywords={[
        'atomic mass calculator',
        'isotope mass calculator',
        'molecular weight calculator',
        'atomic weight calculator',
        'mass number calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Atomic Mass",
        content: "Atomic mass is the weighted average of all naturally occurring isotopes of an element. Our calculator helps you determine atomic mass, analyze isotopic contributions, and understand mass-related atomic properties."
      }}
      calculator={
        <AtomicMassCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-purple-50 to-blue-50',
            secondaryColor: 'text-purple-600',
            accentColor: 'bg-purple-100'
          }}
        />
      }
      additionalSections={[
        <MassGuide key="mass-guide" />,
        <AtomicMassFAQ key="faq" />
      ]}
      notes={[
        'Atomic mass is measured in atomic mass units (amu)',
        'One amu is defined as 1/12 the mass of a carbon-12 atom',
        'Mass number is the sum of protons and neutrons',
        'Isotopes have the same atomic number but different mass numbers',
        'Natural abundance affects weighted average atomic mass',
        'Molecular mass is the sum of atomic masses in a molecule'
      ]}
    />
  );
}