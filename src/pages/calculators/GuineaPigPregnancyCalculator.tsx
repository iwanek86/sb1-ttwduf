import React from 'react';
import { GuineaPigPregnancyCalculator } from '../../components/guinea-pig-calculator/GuineaPigPregnancyCalculator';
import { PregnancyGuide } from '../../components/guinea-pig-calculator/PregnancyGuide';
import { GuineaPigPregnancyFAQ } from '../../components/guinea-pig-calculator/GuineaPigPregnancyFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function GuineaPigPregnancyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Guinea Pig Pregnancy Calculator"
      description="Calculate guinea pig pregnancy duration and track important milestones"
      metaDescription="Free online Guinea Pig Pregnancy Calculator: Track gestation period, predict birth dates, and monitor pregnancy stages. Features comprehensive timeline tracking, health monitoring tips, and expert guidance for guinea pig owners."
      keywords={[
        'guinea pig pregnancy calculator',
        'cavy gestation calculator',
        'guinea pig due date',
        'guinea pig pregnancy timeline',
        'guinea pig birth calculator',
        'pet pregnancy tracker'
      ]}
      backLink="/category/biology/animal-pregnancy"
      backLabel="Back to Animal Pregnancy Calculators"
      introduction={{
        title: "Understanding Guinea Pig Pregnancy",
        content: "Guinea pig pregnancy typically lasts 59-72 days, with an average of 65 days. Our calculator helps track important milestones and provides guidance for proper care during pregnancy."
      }}
      calculator={
        <GuineaPigPregnancyCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-amber-50 to-yellow-50',
            secondaryColor: 'text-amber-600',
            accentColor: 'bg-amber-100'
          }}
        />
      }
      additionalSections={[
        <PregnancyGuide key="pregnancy-guide" />,
        <GuineaPigPregnancyFAQ key="faq" />
      ]}
      notes={[
        'Average gestation is 65 days',
        'Range can be 59-72 days',
        'First pregnancy may be longer',
        'Regular vet checks recommended',
        'Monitor weight and appetite',
        'Ensure proper nutrition'
      ]}
    />
  );
}