import React from 'react';
import { CellDivisionTimeCalculator } from '../../components/cell-division-calculator/CellDivisionTimeCalculator';
import { MitosisGuide } from '../../components/cell-division-calculator/MitosisGuide';
import { CellDivisionFAQ } from '../../components/cell-division-calculator/CellDivisionFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function CellDivisionTimeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cell Division Time Calculator"
      description="Calculate mitosis phase durations and analyze cell cycle timing"
      metaDescription="Free online Cell Division Time Calculator: Calculate mitosis phase durations, analyze cell cycle timing, and understand cell division stages. Features interactive phase analysis, cell cycle visualization, and detailed explanations for biology students and researchers."
      keywords={[
        'cell division calculator',
        'mitosis time calculator',
        'cell cycle duration',
        'mitotic phase calculator',
        'cell biology calculator',
        'mitosis phases'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Cell Division",
        content: "Cell division is a complex process involving multiple phases. Our calculator helps you analyze the timing of mitotic phases, understand cell cycle duration, and calculate division rates for different cell types."
      }}
      calculator={
        <CellDivisionTimeCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-green-50 to-emerald-50',
            secondaryColor: 'text-green-600',
            accentColor: 'bg-green-100'
          }}
        />
      }
      additionalSections={[
        <MitosisGuide key="mitosis-guide" />,
        <CellDivisionFAQ key="faq" />
      ]}
      notes={[
        'Cell cycle varies by cell type',
        'Mitosis is divided into distinct phases',
        'G1, S, and G2 comprise interphase',
        'M phase includes mitosis and cytokinesis',
        'Environmental factors affect timing',
        'Cell checkpoints regulate division'
      ]}
    />
  );
}