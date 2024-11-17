import React from 'react';
import { StoichiometryCalculator } from '../../components/stoichiometry-calculator/StoichiometryCalculator';
import { StoichiometryGuide } from '../../components/stoichiometry-calculator/StoichiometryGuide';
import { StoichiometryFAQ } from '../../components/stoichiometry-calculator/StoichiometryFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function StoichiometryCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Stoichiometry Calculator"
      description="Balance chemical equations and calculate reactant/product quantities in chemical reactions"
      metaDescription="Free online Stoichiometry Calculator: Balance chemical equations, calculate molar ratios, and determine limiting reagents. Features reaction yield analysis, mass-to-mass conversions, and detailed explanations for chemistry students and researchers."
      keywords={[
        'stoichiometry calculator',
        'chemical equation balancer',
        'limiting reagent calculator',
        'reaction yield calculator',
        'molar ratio calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Stoichiometry",
        content: "Stoichiometry is the calculation of reactant and product amounts in chemical reactions. Our calculator helps you balance equations, determine limiting reagents, and calculate theoretical yields based on balanced chemical equations."
      }}
      calculator={
        <StoichiometryCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-lime-50 to-green-50',
            secondaryColor: 'text-lime-600',
            accentColor: 'bg-lime-100'
          }}
        />
      }
      additionalSections={[
        <StoichiometryGuide key="stoichiometry-guide" />,
        <StoichiometryFAQ key="faq" />
      ]}
      notes={[
        'Equations must be balanced',
        'Follows conservation of mass',
        'Considers molar ratios',
        'Accounts for limiting reagents',
        'Calculates theoretical yield',
        'Important for reaction analysis'
      ]}
    />
  );
}