import React from 'react';
import { ProteinSynthesisCalculator } from '../../components/protein-synthesis-calculator/ProteinSynthesisCalculator';
import { SynthesisGuide } from '../../components/protein-synthesis-calculator/SynthesisGuide';
import { ProteinSynthesisFAQ } from '../../components/protein-synthesis-calculator/ProteinSynthesisFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function ProteinSynthesisCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Protein Synthesis Calculator"
      description="Calculate amino acid sequences, analyze protein properties, and understand the genetic code"
      metaDescription="Free online Protein Synthesis Calculator: Calculate amino acid sequences from DNA/RNA, analyze protein properties, and understand genetic code translation. Features codon analysis, protein property prediction, and detailed explanations for biology students and researchers."
      keywords={[
        'protein synthesis calculator',
        'amino acid sequence calculator',
        'genetic code translator',
        'protein property calculator',
        'codon usage calculator',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding Protein Synthesis",
        content: "Protein synthesis is the process of creating proteins from genetic information. Our calculator helps you analyze DNA sequences, perform transcription and translation, and predict protein properties from amino acid sequences."
      }}
      calculator={
        <ProteinSynthesisCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-indigo-50 to-blue-50',
            secondaryColor: 'text-indigo-600',
            accentColor: 'bg-indigo-100'
          }}
        />
      }
      additionalSections={[
        <SynthesisGuide key="synthesis-guide" />,
        <ProteinSynthesisFAQ key="faq" />
      ]}
      notes={[
        'Start codon is AUG (Methionine)',
        'Stop codons are UAA, UAG, UGA',
        'Each codon codes for one amino acid',
        'Reading frame is crucial for translation',
        'Protein properties depend on sequence',
        'Post-translational modifications possible'
      ]}
    />
  );
}