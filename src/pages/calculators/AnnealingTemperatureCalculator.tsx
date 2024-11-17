import React from 'react';
import { AnnealingTemperatureCalculator } from '../../components/annealing-temperature-calculator/AnnealingTemperatureCalculator';
import { AnnealingGuide } from '../../components/annealing-temperature-calculator/AnnealingGuide';
import { AnnealingTemperatureFAQ } from '../../components/annealing-temperature-calculator/AnnealingTemperatureFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function AnnealingTemperatureCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Annealing Temperature Calculator"
      description="Calculate optimal annealing temperature for PCR primers"
      metaDescription="Free online Annealing Temperature Calculator: Calculate optimal annealing temperatures for PCR primers. Features sequence analysis, melting temperature calculation, and detailed explanations for molecular biology researchers."
      keywords={[
        'annealing temperature calculator',
        'PCR primer calculator',
        'melting temperature calculator',
        'primer Tm calculator',
        'PCR optimization',
        'molecular biology calculator'
      ]}
      backLink="/category/biology/cell-biology"
      backLabel="Back to Cell Biology Calculators"
      introduction={{
        title: "Understanding Annealing Temperature",
        content: "Annealing temperature is crucial for PCR success, determining primer-template specificity. Our calculator helps determine optimal annealing temperatures based on primer sequences and conditions."
      }}
      calculator={
        <AnnealingTemperatureCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-purple-50 to-blue-50',
            secondaryColor: 'text-purple-600',
            accentColor: 'bg-purple-100'
          }}
        />
      }
      additionalSections={[
        <AnnealingGuide key="annealing-guide" />,
        <AnnealingTemperatureFAQ key="faq" />
      ]}
      notes={[
        'Based on nearest-neighbor thermodynamics',
        'Considers primer length and GC content',
        'Accounts for salt concentration',
        'Optimizes for PCR specificity',
        'Helps prevent primer dimers',
        'Improves amplification efficiency'
      ]}
    />
  );
}