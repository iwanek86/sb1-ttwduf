import React from 'react';
import { CellSizeCalculator } from '../../components/cell-calculator/CellSizeCalculator';
import { CellSizeGuide } from '../../components/cell-calculator/CellSizeGuide';
import { CellSizeFAQ } from '../../components/cell-calculator/CellSizeFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function CellSizeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cell Size Calculator"
      description="Calculate cell dimensions, volume, and surface area to volume ratio for different cell types"
      metaDescription="Free online Cell Size Calculator: Calculate cell dimensions, volume, and surface area to volume ratio. Features 3D visualization, comparison tools, and expert explanations for biology students and researchers."
      keywords={[
        'cell size calculator',
        'cell volume calculator',
        'surface area to volume ratio',
        'cell dimensions',
        'cell biology calculator',
        'cellular measurements'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Cell Size",
        content: "Cell size is crucial for cellular function and efficiency. Our calculator helps you analyze cell dimensions, calculate volumes, and understand the important relationship between surface area and volume in cellular biology."
      }}
      calculator={
        <CellSizeCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-green-50 to-blue-50',
            secondaryColor: 'text-green-600',
            accentColor: 'bg-green-100'
          }}
        />
      }
      additionalSections={[
        <CellSizeGuide key="size-guide" />,
        <CellSizeFAQ key="faq" />
      ]}
      notes={[
        'Cell size affects nutrient exchange efficiency',
        'Surface area to volume ratio is critical for cell function',
        'Most cells are between 1 and 100 micrometers',
        'Cell shape influences total surface area',
        'Size limitations are due to diffusion constraints',
        'Larger cells often require specialized structures'
      ]}
    />
  );
}