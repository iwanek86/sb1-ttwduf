import React from 'react';
import { ElectronConfigurationCalculator } from '../../components/electron-calculator/ElectronConfigurationCalculator';
import { OrbitalGuide } from '../../components/electron-calculator/OrbitalGuide';
import { ElectronConfigFAQ } from '../../components/electron-calculator/ElectronConfigFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function ElectronConfigurationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Electron Configuration Calculator"
      description="Calculate electron configurations, determine orbital diagrams, and understand atomic electron arrangements"
      metaDescription="Free online Electron Configuration Calculator: Generate electron configurations and orbital diagrams. Features Aufbau principle visualization, noble gas notation, and detailed explanations for chemistry students and researchers."
      keywords={[
        'electron configuration calculator',
        'orbital diagram generator',
        'atomic structure calculator',
        'electron arrangement',
        'aufbau principle',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Electron Configuration",
        content: "Electron configuration describes how electrons are distributed in atomic orbitals. Our calculator uses the Aufbau principle, Pauli exclusion principle, and Hund's rule to determine the correct arrangement of electrons in an atom."
      }}
      calculator={
        <ElectronConfigurationCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-amber-50 to-orange-50',
            secondaryColor: 'text-amber-600',
            accentColor: 'bg-amber-100'
          }}
        />
      }
      additionalSections={[
        <OrbitalGuide key="orbital-guide" />,
        <ElectronConfigFAQ key="faq" />
      ]}
      notes={[
        'Follows the Aufbau principle for electron filling',
        'Applies Hund\'s rule for orbital filling',
        'Considers Pauli exclusion principle',
        'Shows noble gas notation',
        'Indicates valence electrons',
        'Displays orbital diagram representation'
      ]}
    />
  );
}