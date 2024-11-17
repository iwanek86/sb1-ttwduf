import React from 'react';
import { CatAgeCalculator } from '../../components/cat-calculator/CatAgeCalculator';
import { AgingGuide } from '../../components/cat-calculator/AgingGuide';
import { CatAgeFAQ } from '../../components/cat-calculator/CatAgeFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function CatAgeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cat Age Calculator"
      description="Convert your cat's age to human years and understand their life stage with our accurate cat age calculator"
      metaDescription="Free online Cat Age Calculator: Convert cat years to human years accurately. Understand your cat's life stage, development, and care needs based on their age. Features detailed aging guide and expert insights for better pet care."
      keywords={[
        'cat age calculator',
        'cat years to human years',
        'feline age conversion',
        'how old is my cat',
        'cat life stages',
        'pet age calculator'
      ]}
      backLink="/category/biology/cat-health"
      backLabel="Back to Cat Health Calculators"
      introduction={{
        title: "Understanding Cat Age",
        content: "Cats age differently than humans, with their first year equivalent to about 15 human years. Our calculator helps you understand your cat's age in human years and their current life stage, enabling better care and health monitoring."
      }}
      calculator={
        <CatAgeCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-blue-50 to-purple-50',
            secondaryColor: 'text-blue-600',
            accentColor: 'bg-blue-100'
          }}
        />
      }
      additionalSections={[
        <AgingGuide key="aging-guide" />,
        <CatAgeFAQ key="faq" />
      ]}
      notes={[
        'Cats reach adulthood by 1 year of age',
        'The first year equals about 15 human years',
        'The second year adds about 9 more human years',
        'Each year after that is about 4 human years',
        'Indoor cats generally live longer than outdoor cats',
        'Regular vet check-ups are essential for longevity'
      ]}
    />
  );
}