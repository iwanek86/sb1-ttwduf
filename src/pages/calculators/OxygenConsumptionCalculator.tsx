import React from 'react';
import { OxygenConsumptionCalculator } from '../../components/oxygen-consumption-calculator/OxygenConsumptionCalculator';
import { OxygenConsumptionGuide } from '../../components/oxygen-consumption-calculator/OxygenConsumptionGuide';
import { OxygenConsumptionFAQ } from '../../components/oxygen-consumption-calculator/OxygenConsumptionFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function OxygenConsumptionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Oxygen Consumption Calculator"
      description="Calculate respiratory quotient (RQ) and analyze oxygen consumption rates"
      metaDescription="Free online Oxygen Consumption Calculator: Calculate respiratory quotient (RQ), analyze oxygen consumption rates, and understand metabolic substrate utilization. Features RQ analysis, metabolic rate calculations, and detailed explanations for biology students and researchers."
      keywords={[
        'oxygen consumption calculator',
        'respiratory quotient calculator',
        'RQ calculator',
        'metabolic rate calculator',
        'cellular respiration',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Oxygen Consumption",
        content: "Oxygen consumption and respiratory quotient (RQ) are key indicators of metabolic activity and substrate utilization. Our calculator helps analyze oxygen consumption rates, calculate RQ values, and understand metabolic patterns."
      }}
      calculator={
        <OxygenConsumptionCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-blue-50 to-cyan-50',
            secondaryColor: 'text-blue-600',
            accentColor: 'bg-blue-100'
          }}
        />
      }
      additionalSections={[
        <OxygenConsumptionGuide key="oxygen-guide" />,
        <OxygenConsumptionFAQ key="faq" />
      ]}
      notes={[
        'RQ varies by metabolic substrate',
        'Carbohydrates RQ ≈ 1.0',
        'Proteins RQ ≈ 0.8',
        'Fats RQ ≈ 0.7',
        'Temperature affects consumption',
        'Activity level impacts rates'
      ]}
    />
  );
}