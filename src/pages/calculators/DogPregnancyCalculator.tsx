import React from 'react';
import { DogPregnancyCalculator } from '../../components/dog-pregnancy-calculator/DogPregnancyCalculator';
import { PregnancyGuide } from '../../components/dog-pregnancy-calculator/PregnancyGuide';
import { DogPregnancyFAQ } from '../../components/dog-pregnancy-calculator/DogPregnancyFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function DogPregnancyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Dog Pregnancy Calculator"
      description="Calculate dog pregnancy duration and track important milestones"
      metaDescription="Free online Dog Pregnancy Calculator: Track canine gestation period, predict whelping dates, and monitor pregnancy stages. Features comprehensive timeline tracking, health monitoring tips, and expert guidance for dog breeders."
      keywords={[
        'dog pregnancy calculator',
        'canine gestation calculator',
        'whelping date calculator',
        'dog pregnancy timeline',
        'dog breeding calculator',
        'puppy due date'
      ]}
      backLink="/category/biology/animal-pregnancy"
      backLabel="Back to Animal Pregnancy Calculators"
      introduction={{
        title: "Understanding Dog Pregnancy",
        content: "Dog pregnancy typically lasts 63 days from ovulation, with a normal range of 58-68 days from breeding. Our calculator helps track important milestones and provides guidance for proper care during pregnancy."
      }}
      calculator={
        <DogPregnancyCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-blue-50 to-indigo-50',
            secondaryColor: 'text-blue-600',
            accentColor: 'bg-blue-100'
          }}
        />
      }
      additionalSections={[
        <PregnancyGuide key="pregnancy-guide" />,
        <DogPregnancyFAQ key="faq" />
      ]}
      notes={[
        'Average gestation is 63 days',
        'Range can be 58-68 days',
        'Regular vet checks recommended',
        'Monitor nutrition and health',
        'Prepare whelping box',
        'Track breeding dates'
      ]}
    />
  );
}