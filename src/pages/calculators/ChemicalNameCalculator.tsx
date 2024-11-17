import React from 'react';
import { ChemicalNameCalculator } from '../../components/chemical-name-calculator/ChemicalNameCalculator';
import { NomenclatureGuide } from '../../components/chemical-name-calculator/NomenclatureGuide';
import { ChemicalNameFAQ } from '../../components/chemical-name-calculator/ChemicalNameFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function ChemicalNameCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Chemical Name Calculator"
      description="Convert between chemical names and formulas, and understand chemical nomenclature rules"
      metaDescription="Free online Chemical Name Calculator: Convert between chemical names and formulas. Features IUPAC nomenclature rules, common naming conventions, and expert explanations for chemistry students and professionals."
      keywords={[
        'chemical name calculator',
        'chemical formula converter',
        'IUPAC nomenclature',
        'chemical compound names',
        'molecular formula calculator',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Chemical Nomenclature",
        content: "Chemical nomenclature is the systematic way of naming chemical compounds. Our calculator helps you convert between chemical names and formulas while learning IUPAC naming conventions and common naming rules."
      }}
      calculator={
        <ChemicalNameCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-emerald-50 to-teal-50',
            secondaryColor: 'text-emerald-600',
            accentColor: 'bg-emerald-100'
          }}
        />
      }
      additionalSections={[
        <NomenclatureGuide key="nomenclature-guide" />,
        <ChemicalNameFAQ key="faq" />
      ]}
      notes={[
        'IUPAC names follow strict systematic rules',
        'Common names are widely used but not systematic',
        'Prefixes indicate number of atoms (mono-, di-, tri-, etc.)',
        'Oxidation states affect compound names',
        'Some compounds have multiple acceptable names',
        'Formula writing follows standard conventions'
      ]}
    />
  );
}