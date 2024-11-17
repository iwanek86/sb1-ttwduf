import React from 'react';
import { CarryingCapacityCalculator } from '../../components/carrying-capacity-calculator/CarryingCapacityCalculator';
import { CarryingCapacityGuide } from '../../components/carrying-capacity-calculator/CarryingCapacityGuide';
import { CarryingCapacityFAQ } from '../../components/carrying-capacity-calculator/CarryingCapacityFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function CarryingCapacityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Carrying Capacity Calculator"
      description="Calculate environmental carrying capacity and analyze resource limitations for populations"
      metaDescription="Free online Carrying Capacity Calculator: Calculate environmental carrying capacity, analyze resource limitations, and understand population sustainability. Features resource analysis, population projections, and detailed explanations for biology students and researchers."
      keywords={[
        'carrying capacity calculator',
        'environmental capacity',
        'resource limitation',
        'population sustainability',
        'ecological capacity',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Carrying Capacity",
        content: "Carrying capacity is the maximum population size that can be sustained by available environmental resources. Our calculator helps analyze resource limitations, population dynamics, and sustainable population levels."
      }}
      calculator={
        <CarryingCapacityCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-emerald-50 to-green-50',
            secondaryColor: 'text-emerald-600',
            accentColor: 'bg-emerald-100'
          }}
        />
      }
      additionalSections={[
        <CarryingCapacityGuide key="capacity-guide" />,
        <CarryingCapacityFAQ key="faq" />
      ]}
      notes={[
        'Resource availability limits population',
        'Multiple factors affect capacity',
        'Capacity can change over time',
        'Consider seasonal variations',
        'Population dynamics impact capacity',
        'Regular monitoring recommended'
      ]}
    />
  );
}