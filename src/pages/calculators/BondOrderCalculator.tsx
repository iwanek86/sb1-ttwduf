import React from 'react';
import { BondOrderCalculator } from '../../components/bond-calculator/BondOrderCalculator';
import { BondingGuide } from '../../components/bond-calculator/BondingGuide';
import { BondOrderFAQ } from '../../components/bond-calculator/BondOrderFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function BondOrderCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Bond Order Calculator"
      description="Calculate molecular bond orders, electron distribution, and bond strength in chemical compounds"
      metaDescription="Free online Bond Order Calculator: Calculate molecular bond orders, analyze electron distribution, and determine bond strength. Features Lewis structure analysis, molecular orbital theory, and expert explanations for chemistry students and researchers."
      keywords={[
        'bond order calculator',
        'molecular bonding calculator',
        'electron distribution',
        'bond strength calculator',
        'chemical bonding',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Bond Order",
        content: "Bond order represents the number of electron pairs shared between two atoms in a molecule. It helps predict bond strength, stability, and molecular behavior. Our calculator assists in determining bond orders using electron counting and molecular orbital theory."
      }}
      calculator={
        <BondOrderCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-cyan-50 to-blue-50',
            secondaryColor: 'text-cyan-600',
            accentColor: 'bg-cyan-100'
          }}
        />
      }
      additionalSections={[
        <BondingGuide key="bonding-guide" />,
        <BondOrderFAQ key="faq" />
      ]}
      notes={[
        'Bond order = (bonding electrons - antibonding electrons) ÷ 2',
        'Higher bond order indicates stronger bonds',
        'Fractional bond orders are possible',
        'Bond order affects bond length and energy',
        'Multiple bonds have higher bond orders',
        'Bond order helps predict molecular stability'
      ]}
    />
  );
}