import React from 'react';
import { AverageAtomicMassCalculator } from '../../components/atomic-mass-calculator/AverageAtomicMassCalculator';
import { IsotopeGuide } from '../../components/atomic-mass-calculator/IsotopeGuide';
import { AverageAtomicMassFAQ } from '../../components/atomic-mass-calculator/AverageAtomicMassFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function AverageAtomicMassCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Average Atomic Mass Calculator"
      description="Calculate the weighted average atomic mass of elements based on their isotopic composition and natural abundance"
      metaDescription="Free online Average Atomic Mass Calculator: Calculate weighted average atomic mass from isotopic composition. Features isotope analysis, abundance calculations, and detailed explanations for chemistry students and researchers."
      keywords={[
        'average atomic mass calculator',
        'isotope mass calculator',
        'weighted average mass',
        'isotopic abundance',
        'atomic weight calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Average Atomic Mass",
        content: "Average atomic mass represents the weighted average of all naturally occurring isotopes of an element. Our calculator helps you determine this value by considering both the mass and natural abundance of each isotope."
      }}
      calculator={
        <AverageAtomicMassCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-indigo-50 to-purple-50',
            secondaryColor: 'text-indigo-600',
            accentColor: 'bg-indigo-100'
          }}
        />
      }
      additionalSections={[
        <IsotopeGuide key="isotope-guide" />,
        <AverageAtomicMassFAQ key="faq" />
      ]}
      notes={[
        'Average atomic mass is measured in atomic mass units (amu)',
        'Natural abundance is expressed as a percentage',
        'The sum of all isotope abundances must equal 100%',
        'Each isotope contributes proportionally to the average mass',
        'More abundant isotopes have a greater influence on the average',
        'Mass spectrometry is used to determine isotopic abundance'
      ]}
    />
  );
}