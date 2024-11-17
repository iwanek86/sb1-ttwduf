import React from 'react';
import { EnzymeKineticsCalculator } from '../../components/enzyme-kinetics-calculator/EnzymeKineticsCalculator';
import { KineticsGuide } from '../../components/enzyme-kinetics-calculator/KineticsGuide';
import { EnzymeKineticsFAQ } from '../../components/enzyme-kinetics-calculator/EnzymeKineticsFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function EnzymeKineticsCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Enzyme Kinetics Calculator"
      description="Calculate enzyme kinetic parameters and analyze reaction rates"
      metaDescription="Free online Enzyme Kinetics Calculator: Calculate Michaelis-Menten parameters, analyze reaction rates, and determine enzyme efficiency. Features kinetic parameter analysis, Lineweaver-Burk plots, and detailed explanations for biochemistry students and researchers."
      keywords={[
        'enzyme kinetics calculator',
        'michaelis menten calculator',
        'km calculator',
        'vmax calculator',
        'enzyme efficiency',
        'biochemistry calculator'
      ]}
      backLink="/category/biology/biochemistry"
      backLabel="Back to Biochemistry Calculators"
      introduction={{
        title: "Understanding Enzyme Kinetics",
        content: "Enzyme kinetics describes how enzymes catalyze biochemical reactions. Our calculator helps analyze reaction rates, determine Michaelis-Menten parameters, and understand enzyme efficiency through comprehensive kinetic analysis."
      }}
      calculator={
        <EnzymeKineticsCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-violet-50 to-blue-50',
            secondaryColor: 'text-violet-600',
            accentColor: 'bg-violet-100'
          }}
        />
      }
      additionalSections={[
        <KineticsGuide key="kinetics-guide" />,
        <EnzymeKineticsFAQ key="faq" />
      ]}
      notes={[
        'Vmax represents maximum reaction velocity',
        'Km indicates substrate affinity',
        'kcat measures catalytic turnover',
        'Catalytic efficiency = kcat/Km',
        'Use initial velocities for accuracy',
        'Ensure steady-state conditions'
      ]}
    />
  );
}