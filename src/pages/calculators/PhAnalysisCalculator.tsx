import React from 'react';
import { PhCalculator } from '../../components/ph-calculator/PhCalculator';
import { PhScaleGuide } from '../../components/ph-calculator/PhScaleGuide';
import { PhFAQ } from '../../components/ph-calculator/PhFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function PhAnalysisCalculator() {
  return (
    <CalculatorPageTemplate
      title="pH Analysis Calculator"
      description="Calculate pH levels, hydrogen ion concentration, and analyze acid-base properties with our comprehensive pH calculator"
      keywords={[
        'pH calculator',
        'acid base calculator',
        'pH scale calculator',
        'hydrogen ion concentration',
        'pOH calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding pH Analysis",
        content: "pH is a measure of the hydrogen ion concentration in a solution, indicating its acidity or alkalinity. Our calculator helps you analyze pH levels, calculate pOH, and determine hydrogen ion concentrations for various solutions."
      }}
      calculator={
        <PhCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-blue-50 to-purple-50',
            secondaryColor: 'text-blue-600',
            accentColor: 'bg-blue-100'
          }}
        />
      }
      additionalSections={[
        <PhScaleGuide key="scale-guide" />,
        <PhFAQ key="faq" />
      ]}
      notes={[
        'pH values range from 0 to 14, with 7 being neutral',
        'Values below 7 indicate acidic solutions',
        'Values above 7 indicate basic (alkaline) solutions',
        'Each whole pH number represents a factor of ten',
        'Temperature can affect pH measurements'
      ]}
    />
  );
}