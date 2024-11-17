import React from 'react';
import { CatPregnancyCalculator } from '../../components/cat-calculator/CatPregnancyCalculator';
import { FAQ } from '../../components/cat-calculator/FAQ';
import { PregnancyStages } from '../../components/cat-calculator/PregnancyStages';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

function CatPregnancyPage() {
  return (
    <CalculatorPageTemplate
      title="Cat Pregnancy Calculator"
      description="Track your cat's pregnancy journey and prepare for the arrival of kittens with our comprehensive calculator"
      keywords={[
        'cat pregnancy calculator',
        'cat gestation calculator',
        'cat due date calculator',
        'feline pregnancy timeline',
        'cat pregnancy stages'
      ]}
      backLink="/category/biology/animal-pregnancy"
      backLabel="Back to Animal Pregnancy Calculators"
      introduction={{
        title: "Understanding Cat Pregnancy",
        content: "Cat pregnancy, also known as cat gestation, typically lasts between 63-67 days from the first day of mating. During this time, your cat will go through various physical and behavioral changes as she prepares for motherhood. Our calculator helps you track important milestones and prepare for the arrival of kittens."
      }}
      calculator={
        <CatPregnancyCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-blue-50 to-purple-50',
            secondaryColor: 'text-blue-600',
            accentColor: 'bg-blue-100'
          }}
          onDateCalculated={(dates) => {
            console.log('Due date:', dates.dueDate);
          }}
        />
      }
      additionalSections={[
        <PregnancyStages />,
        <FAQ />
      ]}
      notes={[
        'This calculator provides estimates based on average cat pregnancy duration.',
        'Individual cat pregnancies may vary by a few days.',
        'Regular veterinary check-ups are essential during pregnancy.',
        'Contact your vet immediately if you notice any concerning symptoms.',
        'Prepare a nesting box and supplies well before the due date.'
      ]}
    />
  );
}

export default CatPregnancyPage;