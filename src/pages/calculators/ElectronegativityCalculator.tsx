import React from 'react';
import { ElectronegativityCalculator } from '../../components/electronegativity-calculator/ElectronegativityCalculator';
import { ElectronegativityGuide } from '../../components/electronegativity-calculator/ElectronegativityGuide';
import { ElectronegativityFAQ } from '../../components/electronegativity-calculator/ElectronegativityFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function ElectronegativityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Electronegativity Calculator"
      description="Calculate and compare atomic electronegativity values using different scales and understand bonding properties"
      metaDescription="Free online Electronegativity Calculator: Calculate atomic electronegativity values, compare elements, and analyze bonding properties. Features multiple electronegativity scales, bond polarity analysis, and detailed explanations for chemistry students and researchers."
      keywords={[
        'electronegativity calculator',
        'atomic electronegativity',
        'pauling scale calculator',
        'bond polarity calculator',
        'chemical bonding',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Electronegativity",
        content: "Electronegativity is a measure of an atom's ability to attract electrons in a chemical bond. Our calculator helps you determine electronegativity values, compare elements, and understand bond polarity using various electronegativity scales."
      }}
      calculator={
        <ElectronegativityCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-rose-50 to-pink-50',
            secondaryColor: 'text-rose-600',
            accentColor: 'bg-rose-100'
          }}
        />
      }
      additionalSections={[
        <ElectronegativityGuide key="electronegativity-guide" />,
        <ElectronegativityFAQ key="faq" />
      ]}
      notes={[
        'Pauling scale is most commonly used',
        'Values range from 0.7 to 4.0',
        'Higher values indicate stronger electron attraction',
        'Affects bond polarity and type',
        'Trends exist across periodic table',
        'Important for predicting chemical behavior'
      ]}
    />
  );
}