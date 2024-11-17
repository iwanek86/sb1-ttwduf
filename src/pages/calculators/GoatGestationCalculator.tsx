import React from 'react';
import { GoatGestationCalculator } from '../../components/goat-gestation-calculator/GoatGestationCalculator';
import { GestationGuide } from '../../components/goat-gestation-calculator/GestationGuide';
import { GoatGestationFAQ } from '../../components/goat-gestation-calculator/GoatGestationFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function GoatGestationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Goat Gestation Calculator"
      description="Calculate goat pregnancy duration and track important milestones"
      metaDescription="Free online Goat Gestation Calculator: Track gestation period, predict kidding dates, and monitor pregnancy stages. Features comprehensive timeline tracking, health monitoring tips, and expert guidance for goat breeders."
      keywords={[
        'goat gestation calculator',
        'goat pregnancy calculator',
        'kidding date calculator',
        'goat pregnancy timeline',
        'goat breeding calculator',
        'kid due date'
      ]}
      backLink="/category/biology/animal-pregnancy"
      backLabel="Back to Animal Pregnancy Calculators"
      introduction={{
        title: "Understanding Goat Gestation",
        content: "Goat pregnancy typically lasts 150 days (approximately 5 months), with a normal range of 145-155 days. Our calculator helps track important milestones and provides guidance for proper care during pregnancy."
      }}
      calculator={
        <GoatGestationCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-green-50 to-emerald-50',
            secondaryColor: 'text-green-600',
            accentColor: 'bg-green-100'
          }}
        />
      }
      additionalSections={[
        <GestationGuide key="gestation-guide" />,
        <GoatGestationFAQ key="faq" />
      ]}
      notes={[
        'Average gestation is 150 days',
        'Range can be 145-155 days',
        'Regular vet checks recommended',
        'Monitor nutrition and health',
        'Prepare for kidding',
        'Track breeding dates'
      ]}
    />
  );
}