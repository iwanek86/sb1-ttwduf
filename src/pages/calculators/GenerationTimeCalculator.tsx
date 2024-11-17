import React from 'react';
import { GenerationTimeCalculator } from '../../components/generation-time-calculator/GenerationTimeCalculator';
import { GenerationTimeGuide } from '../../components/generation-time-calculator/GenerationTimeGuide';
import { GenerationTimeFAQ } from '../../components/generation-time-calculator/GenerationTimeFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function GenerationTimeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Generation Time Calculator"
      description="Calculate bacterial generation time and growth rate"
      metaDescription="Free online Generation Time Calculator: Calculate bacterial growth rates, doubling times, and generation intervals. Features growth curve analysis, rate calculations, and detailed explanations for microbiology researchers."
      keywords={[
        'generation time calculator',
        'bacterial growth calculator',
        'doubling time calculator',
        'growth rate calculator',
        'microbial growth',
        'cell biology calculator'
      ]}
      backLink="/category/biology/cell-biology"
      backLabel="Back to Cell Biology Calculators"
      introduction={{
        title: "Understanding Generation Time",
        content: "Generation time, or doubling time, is the time required for a bacterial population to double in number. Our calculator helps analyze bacterial growth rates and population dynamics using various measurement methods."
      }}
      calculator={
        <GenerationTimeCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-teal-50 to-emerald-50',
            secondaryColor: 'text-teal-600',
            accentColor: 'bg-teal-100'
          }}
        />
      }
      additionalSections={[
        <GenerationTimeGuide key="generation-guide" />,
        <GenerationTimeFAQ key="faq" />
      ]}
      notes={[
        'Based on exponential growth phase',
        'Considers lag and stationary phases',
        'Accounts for growth conditions',
        'Calculates specific growth rate',
        'Determines population dynamics',
        'Helps optimize culture conditions'
      ]}
    />
  );
}