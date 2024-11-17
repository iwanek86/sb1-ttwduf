import React from 'react';
import { SpeciesDiversityCalculator } from '../../components/species-diversity-calculator/SpeciesDiversityCalculator';
import { DiversityGuide } from '../../components/species-diversity-calculator/DiversityGuide';
import { DiversityFAQ } from '../../components/species-diversity-calculator/DiversityFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

const SpeciesDiversityCalculatorPage: React.FC = () => {
  return (
    <CalculatorPageTemplate
      title="Species Diversity Index Calculator"
      description="Calculate biodiversity indices, analyze species richness, and understand ecological diversity"
      metaDescription="Free online Species Diversity Index Calculator: Calculate Shannon-Wiener index, Simpson's diversity index, and species richness. Features multiple diversity metrics, community analysis, and detailed explanations for biology students and researchers."
      keywords={[
        'species diversity calculator',
        'biodiversity index',
        'shannon wiener index',
        'simpson diversity index',
        'species richness',
        'ecology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Species Diversity",
        content: "Species diversity is a measure of biodiversity that considers both species richness and evenness in a community. Our calculator helps analyze ecological communities using various diversity indices and provides insights into community structure."
      }}
      calculator={
        <SpeciesDiversityCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-lime-50 to-green-50',
            secondaryColor: 'text-lime-600',
            accentColor: 'bg-lime-100'
          }}
        />
      }
      additionalSections={[
        <DiversityGuide key="diversity-guide" />,
        <DiversityFAQ key="faq" />
      ]}
      notes={[
        'Higher diversity indicates healthier ecosystems',
        'Consider both richness and evenness',
        'Multiple indices provide different insights',
        'Sample size affects calculations',
        'Compare similar habitats',
        'Regular monitoring recommended'
      ]}
    />
  );
};

export default SpeciesDiversityCalculatorPage;