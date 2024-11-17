import React from 'react';
import { SurfaceAreaVolumeCalculator } from '../../components/surface-area-volume-calculator/SurfaceAreaVolumeCalculator';
import { SurfaceAreaVolumeGuide } from '../../components/surface-area-volume-calculator/SurfaceAreaVolumeGuide';
import { SurfaceAreaVolumeFAQ } from '../../components/surface-area-volume-calculator/SurfaceAreaVolumeFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function SurfaceAreaVolumeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Surface Area to Volume Ratio Calculator"
      description="Calculate and analyze surface area to volume ratios for different cell shapes and sizes"
      metaDescription="Free online Surface Area to Volume Ratio Calculator: Calculate SA:V ratios for different cell shapes, analyze size effects, and understand cellular efficiency. Features 3D shape analysis, size optimization, and detailed explanations for biology students and researchers."
      keywords={[
        'surface area to volume ratio',
        'SA:V calculator',
        'cell size calculator',
        'cellular efficiency',
        'diffusion calculator',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Surface Area to Volume Ratio",
        content: "Surface area to volume ratio (SA:V) is crucial for cellular efficiency, affecting nutrient exchange, waste removal, and cellular function. Our calculator helps you analyze how cell shape and size impact this important ratio."
      }}
      calculator={
        <SurfaceAreaVolumeCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-emerald-50 to-teal-50',
            secondaryColor: 'text-emerald-600',
            accentColor: 'bg-emerald-100'
          }}
        />
      }
      additionalSections={[
        <SurfaceAreaVolumeGuide key="sav-guide" />,
        <SurfaceAreaVolumeFAQ key="faq" />
      ]}
      notes={[
        'Higher SA:V ratio means more efficient exchange',
        'Ratio decreases as size increases',
        'Shape affects surface area efficiency',
        'Critical for cell size limitations',
        'Impacts cellular metabolism',
        'Important for understanding cell evolution'
      ]}
    />
  );
}