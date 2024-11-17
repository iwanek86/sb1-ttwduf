import React from 'react';
import { MolecularWeightCalculator } from '../../components/molecular-weight-calculator/MolecularWeightCalculator';
import { MolecularWeightGuide } from '../../components/molecular-weight-calculator/MolecularWeightGuide';
import { MolecularWeightFAQ } from '../../components/molecular-weight-calculator/MolecularWeightFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function MolecularWeightCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Molecular Weight Calculator"
      description="Calculate molecular weight and molar mass of chemical compounds"
      metaDescription="Free online Molecular Weight Calculator: Calculate molecular mass and molar mass of chemical compounds. Features formula parsing, atomic mass database, and detailed explanations for chemistry students and researchers."
      keywords={[
        'molecular weight calculator',
        'molar mass calculator',
        'molecular mass calculator',
        'chemical formula calculator',
        'compound mass calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Molecular Weight",
        content: "Molecular weight (MW) is the sum of atomic weights of all atoms in a molecule. Our calculator helps you determine molecular weights by analyzing chemical formulas using accurate atomic mass values."
      }}
      calculator={
        <MolecularWeightCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-sky-50 to-blue-50',
            secondaryColor: 'text-sky-600',
            accentColor: 'bg-sky-100'
          }}
        />
      }
      additionalSections={[
        <MolecularWeightGuide key="molecular-weight-guide" />,
        <MolecularWeightFAQ key="faq" />
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