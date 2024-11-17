import React from 'react';
import { MolarMassCalculator } from '../../components/molar-mass-calculator/MolarMassCalculator';
import { MolarMassGuide } from '../../components/molar-mass-calculator/MolarMassGuide';
import { MolarMassFAQ } from '../../components/molar-mass-calculator/MolarMassFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function MolarMassCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Molar Mass Calculator"
      description="Calculate molar mass and molecular weight of chemical compounds"
      metaDescription="Free online Molar Mass Calculator: Calculate molecular weight and molar mass of chemical compounds. Features formula parsing, atomic mass database, and detailed explanations for chemistry students and researchers."
      keywords={[
        'molar mass calculator',
        'molecular weight calculator',
        'atomic mass calculator',
        'chemical formula calculator',
        'compound mass calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Molar Mass",
        content: "Molar mass is the mass of one mole of a substance, expressed in grams per mole (g/mol). Our calculator helps you determine the molar mass of chemical compounds by analyzing their molecular formulas and using accurate atomic mass values."
      }}
      calculator={
        <MolarMassCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-blue-50 to-indigo-50',
            secondaryColor: 'text-blue-600',
            accentColor: 'bg-blue-100'
          }}
        />
      }
      additionalSections={[
        <MolarMassGuide key="molar-mass-guide" />,
        <MolarMassFAQ key="faq" />
      ]}
      notes={[
        'Uses atomic mass values from periodic table',
        'Supports complex chemical formulas',
        'Handles polyatomic ions',
        'Shows mass contribution of each element',
        'Important for stoichiometry calculations',
        'Essential for solution concentration'
      ]}
    />
  );
}