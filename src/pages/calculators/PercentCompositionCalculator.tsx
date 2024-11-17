import React from 'react';
import { PercentCompositionCalculator } from '../../components/percent-composition-calculator/PercentCompositionCalculator';
import { CompositionGuide } from '../../components/percent-composition-calculator/CompositionGuide';
import { PercentCompositionFAQ } from '../../components/percent-composition-calculator/PercentCompositionFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function PercentCompositionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Percent Composition Calculator"
      description="Calculate the mass percentage of elements in chemical compounds"
      metaDescription="Free online Percent Composition Calculator: Calculate mass percentages of elements in chemical compounds. Features formula parsing, composition analysis, and detailed explanations for chemistry students and researchers."
      keywords={[
        'percent composition calculator',
        'mass percentage calculator',
        'elemental composition',
        'chemical formula analysis',
        'empirical formula',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Percent Composition",
        content: "Percent composition reveals the mass percentage of each element in a chemical compound. Our calculator helps you determine these percentages by analyzing molecular formulas and using accurate atomic mass values."
      }}
      calculator={
        <PercentCompositionCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-teal-50 to-green-50',
            secondaryColor: 'text-teal-600',
            accentColor: 'bg-teal-100'
          }}
        />
      }
      additionalSections={[
        <CompositionGuide key="composition-guide" />,
        <PercentCompositionFAQ key="faq" />
      ]}
      notes={[
        'Uses atomic mass values from periodic table',
        'Supports complex chemical formulas',
        'Shows mass percentage of each element',
        'Important for empirical formula determination',
        'Useful for chemical analysis',
        'Essential for compound identification'
      ]}
    />
  );
}