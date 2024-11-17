import React from 'react';
import { EffectiveNuclearChargeCalculator } from '../../components/nuclear-charge-calculator/EffectiveNuclearChargeCalculator';
import { ShieldingGuide } from '../../components/nuclear-charge-calculator/ShieldingGuide';
import { NuclearChargeFAQ } from '../../components/nuclear-charge-calculator/NuclearChargeFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function EffectiveNuclearChargeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Effective Nuclear Charge Calculator"
      description="Calculate effective nuclear charge using Slater's rules and understand electron shielding effects"
      metaDescription="Free online Effective Nuclear Charge Calculator: Calculate Zeff using Slater's rules. Features electron configuration analysis, shielding effect calculations, and detailed explanations for chemistry students and researchers."
      keywords={[
        'effective nuclear charge calculator',
        'Slater rules calculator',
        'electron shielding',
        'Zeff calculator',
        'atomic structure',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Effective Nuclear Charge",
        content: "Effective nuclear charge (Zeff) is the net positive charge experienced by an electron in a multi-electron atom. Our calculator uses Slater's rules to determine the shielding effect and calculate Zeff for any electron configuration."
      }}
      calculator={
        <EffectiveNuclearChargeCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-violet-50 to-purple-50',
            secondaryColor: 'text-violet-600',
            accentColor: 'bg-violet-100'
          }}
        />
      }
      additionalSections={[
        <ShieldingGuide key="shielding-guide" />,
        <NuclearChargeFAQ key="faq" />
      ]}
      notes={[
        'Zeff = Z - S (where Z is atomic number and S is shielding constant)',
        'Inner electrons shield outer electrons from nuclear charge',
        'Slater\'s rules provide systematic shielding calculations',
        'Effective charge affects atomic/ionic size',
        'Higher Zeff results in stronger electron attraction',
        'Shielding varies by orbital type and electron configuration'
      ]}
    />
  );
}