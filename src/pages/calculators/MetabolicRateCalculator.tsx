import React from 'react';
import { MetabolicRateCalculator } from '../../components/metabolic-rate-calculator/MetabolicRateCalculator';
import { MetabolicGuide } from '../../components/metabolic-rate-calculator/MetabolicGuide';
import { MetabolicRateFAQ } from '../../components/metabolic-rate-calculator/MetabolicRateFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function MetabolicRateCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Metabolic Rate Calculator"
      description="Calculate basal metabolic rate (BMR) and total daily energy expenditure (TDEE)"
      metaDescription="Free online Metabolic Rate Calculator: Calculate BMR and TDEE, analyze energy requirements, and understand metabolic factors. Features multiple calculation methods, activity level analysis, and detailed explanations for biology students and researchers."
      keywords={[
        'metabolic rate calculator',
        'BMR calculator',
        'TDEE calculator',
        'energy expenditure',
        'metabolism calculator',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Metabolic Rate",
        content: "Metabolic rate represents the energy expended by an organism for basic life functions. Our calculator helps determine basal metabolic rate (BMR) and total daily energy expenditure (TDEE) using various calculation methods."
      }}
      calculator={
        <MetabolicRateCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-yellow-50 to-amber-50',
            secondaryColor: 'text-yellow-600',
            accentColor: 'bg-yellow-100'
          }}
        />
      }
      additionalSections={[
        <MetabolicGuide key="metabolic-guide" />,
        <MetabolicRateFAQ key="faq" />
      ]}
      notes={[
        'BMR varies by species and individual',
        'Activity level affects total expenditure',
        'Multiple calculation methods available',
        'Temperature affects metabolic rate',
        'Body composition impacts BMR',
        'Regular recalculation recommended'
      ]}
    />
  );
}