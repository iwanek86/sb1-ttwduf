import React from 'react';
import { BloodPressureCalculator } from '../../components/blood-pressure-calculator/BloodPressureCalculator';
import { BloodPressureGuide } from '../../components/blood-pressure-calculator/BloodPressureGuide';
import { BloodPressureFAQ } from '../../components/blood-pressure-calculator/BloodPressureFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function BloodPressureCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Blood Pressure Analysis Calculator"
      description="Analyze blood pressure readings, track measurements, and understand cardiovascular health"
      metaDescription="Free online Blood Pressure Analysis Calculator: Analyze blood pressure readings, track measurements over time, and understand cardiovascular health indicators. Features BP classification, trend analysis, and detailed explanations for biology students and healthcare professionals."
      keywords={[
        'blood pressure calculator',
        'BP analysis tool',
        'hypertension calculator',
        'cardiovascular health',
        'systolic diastolic calculator',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Blood Pressure",
        content: "Blood pressure is a vital sign that indicates cardiovascular health. Our calculator helps analyze blood pressure readings, classify measurements according to standard guidelines, and track changes over time."
      }}
      calculator={
        <BloodPressureCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-red-50 to-rose-50',
            secondaryColor: 'text-red-600',
            accentColor: 'bg-red-100'
          }}
        />
      }
      additionalSections={[
        <BloodPressureGuide key="bp-guide" />,
        <BloodPressureFAQ key="faq" />
      ]}
      notes={[
        'Normal BP is below 120/80 mmHg',
        'Systolic pressure indicates heart contraction',
        'Diastolic pressure shows heart relaxation',
        'Multiple readings improve accuracy',
        'Time of day affects readings',
        'Lifestyle factors influence BP'
      ]}
    />
  );
}