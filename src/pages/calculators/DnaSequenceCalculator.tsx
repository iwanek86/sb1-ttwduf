import React from 'react';
import { DnaSequenceCalculator } from '../../components/dna-sequence-calculator/DnaSequenceCalculator';
import { DnaGuide } from '../../components/dna-sequence-calculator/DnaGuide';
import { DnaSequenceFAQ } from '../../components/dna-sequence-calculator/DnaSequenceFAQ';
import { CalculatorPageTemplate } from '../../templates/CalculatorPageTemplate';

export default function DnaSequenceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="DNA Sequence Calculator"
      description="Analyze DNA sequences, calculate complementary strands, and identify mutations"
      metaDescription="Free online DNA Sequence Calculator: Analyze DNA sequences, calculate complementary strands, and identify mutations. Features sequence analysis, transcription/translation tools, and detailed explanations for biology students and researchers."
      keywords={[
        'DNA sequence calculator',
        'DNA analysis tool',
        'complementary strand calculator',
        'mutation analyzer',
        'transcription calculator',
        'biology calculator'
      ]}
      backLink="/category/biology"
      backLabel="Back to Biology Calculators"
      introduction={{
        title: "Understanding DNA Sequences",
        content: "DNA sequences are the fundamental code of life. Our calculator helps you analyze DNA sequences, generate complementary strands, transcribe to RNA, translate to proteins, and identify potential mutations."
      }}
      calculator={
        <DnaSequenceCalculator
          theme="light"
          customStyles={{
            primaryColor: 'from-purple-50 to-indigo-50',
            secondaryColor: 'text-purple-600',
            accentColor: 'bg-purple-100'
          }}
        />
      }
      additionalSections={[
        <DnaGuide key="dna-guide" />,
        <DnaSequenceFAQ key="faq" />
      ]}
      notes={[
        'DNA uses A, T, G, C nucleotides',
        'A pairs with T, G pairs with C',
        'RNA uses U instead of T',
        'Codons are 3-nucleotide sequences',
        'Start codon is AUG',
        'Stop codons are UAA, UAG, UGA'
      ]}
    />
  );
}