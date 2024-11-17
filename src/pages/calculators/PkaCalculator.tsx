import React from 'react';
import { PkaCalculator } from '../../components/pka-calculator/PkaCalculator';
import { PkaGuide } from '../../components/pka-calculator/PkaGuide';
import { PkaFAQ } from '../../components/pka-calculator/PkaFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function PkaCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="pKa Calculator"
      description="Calculate acid dissociation constants and analyze acid-base properties"
      metaDescription="Free online pKa Calculator: Calculate acid dissociation constants, analyze acid-base properties, and understand pH relationships. Features Ka to pKa conversion, acid strength analysis, and detailed explanations for chemistry students and researchers."
      keywords={[
        'pKa calculator',
        'acid dissociation constant',
        'Ka calculator',
        'acid strength calculator',
        'pH calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding pKa",
        content: "pKa is the negative logarithm of the acid dissociation constant (Ka), indicating an acid's strength. Our calculator helps you analyze acid-base properties, convert between Ka and pKa, and understand pH relationships."
      }}
      calculator={
        <PkaCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-sky-50 to-blue-50',
            secondaryColor: 'text-sky-600',
            accentColor: 'bg-sky-100'
          }}
        />
      }
      additionalSections={[
        <PkaGuide key="pka-guide" />,
        <PkaFAQ key="faq" />
      ]}
      notes={[
        'pKa = -log₁₀(Ka)',
        'Lower pKa indicates stronger acid',
        'pH = pKa at half-neutralization',
        'Affects buffer capacity',
        'Important for drug design',
        'Critical in biological systems'
      ]}
    />
  );
}