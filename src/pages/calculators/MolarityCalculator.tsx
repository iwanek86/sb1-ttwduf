import React from 'react';
import { MolarityCalculator } from '../../components/molarity-calculator/MolarityCalculator';
import { MolarityGuide } from '../../components/molarity-calculator/MolarityGuide';
import { MolarityFAQ } from '../../components/molarity-calculator/MolarityFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function MolarityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Molarity Calculator"
      description="Calculate solution concentration and molarity with precision"
      metaDescription="Free online Molarity Calculator: Calculate solution concentrations, perform dilution calculations, and convert between concentration units. Features comprehensive solution analysis and detailed explanations for chemistry students and researchers."
      keywords={[
        'molarity calculator',
        'solution concentration calculator',
        'dilution calculator',
        'moles calculator',
        'concentration units',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Molarity",
        content: "Molarity (M) is the number of moles of solute per liter of solution. Our calculator helps you determine solution concentrations, perform dilution calculations, and convert between different concentration units."
      }}
      calculator={
        <MolarityCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-orange-50 to-amber-50',
            secondaryColor: 'text-orange-600',
            accentColor: 'bg-orange-100'
          }}
        />
      }
      additionalSections={[
        <MolarityGuide key="molarity-guide" />,
        <MolarityFAQ key="faq" />
      ]}
      notes={[
        'Molarity = moles of solute / liters of solution',
        'Accounts for solution volume changes',
        'Important for solution preparation',
        'Used in dilution calculations',
        'Critical for chemical analysis',
        'Standard for expressing concentration'
      ]}
    />
  );
}