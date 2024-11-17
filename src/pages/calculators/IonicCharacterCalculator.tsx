import React from 'react';
import { IonicCharacterCalculator } from '../../components/ionic-character-calculator/IonicCharacterCalculator';
import { IonicCharacterGuide } from '../../components/ionic-character-calculator/IonicCharacterGuide';
import { IonicCharacterFAQ } from '../../components/ionic-character-calculator/IonicCharacterFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function IonicCharacterCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Percent Ionic Character Calculator"
      description="Calculate the ionic character of chemical bonds based on electronegativity differences"
      metaDescription="Free online Percent Ionic Character Calculator: Calculate ionic character of chemical bonds using electronegativity differences. Features bond type analysis, polarity calculations, and detailed explanations for chemistry students and researchers."
      keywords={[
        'ionic character calculator',
        'bond polarity calculator',
        'electronegativity difference',
        'bond type calculator',
        'chemical bonding',
        'chemistry calculator'
      ]}
      backLink="/category/chemistry"
      backLabel="Back to Chemistry Calculators"
      introduction={{
        title: "Understanding Ionic Character",
        content: "The percent ionic character of a chemical bond indicates how ionic or covalent the bond is, based on the electronegativity difference between the bonded atoms. Our calculator helps determine this percentage and understand bond properties."
      }}
      calculator={
        <IonicCharacterCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-fuchsia-50 to-purple-50',
            secondaryColor: 'text-fuchsia-600',
            accentColor: 'bg-fuchsia-100'
          }}
        />
      }
      additionalSections={[
        <IonicCharacterGuide key="ionic-guide" />,
        <IonicCharacterFAQ key="faq" />
      ]}
      notes={[
        'Based on Pauling electronegativity scale',
        'Higher differences indicate more ionic character',
        'Affects bond properties and reactivity',
        'Important for predicting chemical behavior',
        'Related to bond polarity',
        'Used in material science and chemistry'
      ]}
    />
  );
}