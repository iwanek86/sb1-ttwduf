import React from 'react';
import { PopulationGrowthCalculator } from '../../components/population-growth-calculator/PopulationGrowthCalculator';
import { PopulationGrowthGuide } from '../../components/population-growth-calculator/PopulationGrowthGuide';
import { PopulationGrowthFAQ } from '../../components/population-growth-calculator/PopulationGrowthFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function PopulationGrowthCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Population Growth Calculator"
      description="Calculate population dynamics, growth rates, and carrying capacity for ecological systems"
      metaDescription="Free online Population Growth Calculator: Calculate population dynamics, analyze growth rates, and determine carrying capacity. Features multiple growth models, population projections, and detailed explanations for biology students and researchers."
      keywords={[
        'population growth calculator',
        'carrying capacity calculator',
        'population dynamics',
        'growth rate calculator',
        'ecological modeling',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Population Growth",
        content: "Population growth is a fundamental concept in ecology that describes how populations change over time. Our calculator helps analyze different growth models, predict population sizes, and understand factors affecting population dynamics."
      }}
      calculator={
        <PopulationGrowthCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-green-50 to-emerald-50',
            secondaryColor: 'text-green-600',
            accentColor: 'bg-green-100'
          }}
        />
      }
      additionalSections={[
        <PopulationGrowthGuide key="growth-guide" />,
        <PopulationGrowthFAQ key="faq" />
      ]}
      notes={[
        'Exponential vs. logistic growth',
        'Carrying capacity limits growth',
        'Growth rate affects population size',
        'Environmental factors impact growth',
        'Density dependence consideration',
        'Time scale affects predictions'
      ]}
    />
  );
}