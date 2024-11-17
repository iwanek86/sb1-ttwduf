import React from 'react';
import { HardyWeinbergCalculator } from '../../components/hardy-weinberg-calculator/HardyWeinbergCalculator';
import { HardyWeinbergGuide } from '../../components/hardy-weinberg-calculator/HardyWeinbergGuide';
import { HardyWeinbergFAQ } from '../../components/hardy-weinberg-calculator/HardyWeinbergFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function HardyWeinbergCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Hardy-Weinberg Calculator"
      description="Calculate allele frequencies and analyze population genetics using the Hardy-Weinberg equilibrium"
      metaDescription="Free online Hardy-Weinberg Calculator: Calculate allele frequencies, analyze population genetics, and understand genetic equilibrium. Features genotype distribution analysis, chi-square testing, and detailed explanations for biology students and researchers."
      keywords={[
        'hardy weinberg calculator',
        'allele frequency calculator',
        'population genetics',
        'genetic equilibrium',
        'genotype distribution',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Hardy-Weinberg Equilibrium",
        content: "The Hardy-Weinberg principle describes how allele and genotype frequencies remain stable in a population under specific conditions. Our calculator helps analyze population genetics and test for genetic equilibrium."
      }}
      calculator={
        <HardyWeinbergCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-pink-50 to-rose-50',
            secondaryColor: 'text-pink-600',
            accentColor: 'bg-pink-100'
          }}
        />
      }
      additionalSections={[
        <HardyWeinbergGuide key="hw-guide" />,
        <HardyWeinbergFAQ key="faq" />
      ]}
      notes={[
        'p² + 2pq + q² = 1 (genotype frequencies)',
        'p + q = 1 (allele frequencies)',
        'Assumes random mating',
        'No mutation or migration',
        'Large population size',
        'No natural selection'
      ]}
    />
  );
}