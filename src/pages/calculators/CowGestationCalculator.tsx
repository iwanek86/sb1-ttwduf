import React from 'react';
import { CowGestationCalculator } from '../../components/cow-gestation-calculator/CowGestationCalculator';
import { GestationGuide } from '../../components/cow-gestation-calculator/GestationGuide';
import { CowGestationFAQ } from '../../components/cow-gestation-calculator/CowGestationFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function CowGestationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cow Gestation Calculator"
      description="Calculate cow pregnancy duration and track important milestones"
      metaDescription="Free online Cow Gestation Calculator: Track gestation period, predict calving dates, and monitor pregnancy stages. Features comprehensive timeline tracking, health monitoring tips, and expert guidance for cattle management."
      keywords={[
        'cow gestation calculator',
        'cattle pregnancy calculator',
        'calving date calculator',
        'cow pregnancy timeline',
        'bovine gestation calculator',
        'cattle breeding calculator'
      ]}
      backLink="/category/biology/animal-pregnancy"
      backLabel="Back to Animal Pregnancy Calculators"
      introduction={{
        title: "Understanding Cow Gestation",
        content: "Cow gestation typically lasts 283 days (approximately 9.3 months), with a normal range of 279-287 days. Our calculator helps track important milestones and provides guidance for proper care during pregnancy."
      }}
      calculator={
        <CowGestationCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-amber-50 to-yellow-50',
            secondaryColor: 'text-amber-600',
            accentColor: 'bg-amber-100'
          }}
        />
      }
      additionalSections={[
        <GestationGuide key="gestation-guide" />,
        <CowGestationFAQ key="faq" />
      ]}
      notes={[
        'Average gestation is 283 days',
        'Range can be 279-287 days',
        'Regular vet checks recommended',
        'Monitor nutrition and health',
        'Prepare for calving',
        'Track breeding dates'
      ]}
    />
  );
}