import React, { useState } from 'react';
import { Dna, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface DnaSequenceCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface SequenceAnalysis {
  length: number;
  gcContent: number;
  complementary: string;
  rna: string;
  protein?: string;
}

const codonTable: Record<string, string> = {
  'AUA': 'I', 'AUC': 'I', 'AUU': 'I', 'AUG': 'M',
  'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACU': 'T',
  'AAC': 'N', 'AAU': 'N', 'AAA': 'K', 'AAG': 'K',
  'AGC': 'S', 'AGU': 'S', 'AGA': 'R', 'AGG': 'R',
  'CUA': 'L', 'CUC': 'L', 'CUG': 'L', 'CUU': 'L',
  'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCU': 'P',
  'CAC': 'H', 'CAU': 'H', 'CAA': 'Q', 'CAG': 'Q',
  'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGU': 'R',
  'GUA': 'V', 'GUC': 'V', 'GUG': 'V', 'GUU': 'V',
  'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCU': 'A',
  'GAC': 'D', 'GAU': 'D', 'GAA': 'E', 'GAG': 'E',
  'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGU': 'G',
  'UCA': 'S', 'UCC': 'S', 'UCG': 'S', 'UCU': 'S',
  'UUC': 'F', 'UUU': 'F', 'UUA': 'L', 'UUG': 'L',
  'UAC': 'Y', 'UAU': 'Y', 'UAA': '*', 'UAG': '*',
  'UGC': 'C', 'UGU': 'C', 'UGA': '*', 'UGG': 'W'
};

export function DnaSequenceCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-purple-50 to-indigo-50',
    secondaryColor: 'text-purple-600',
    accentColor: 'bg-purple-100'
  }
}: DnaSequenceCalculatorProps) {
  const [sequence, setSequence] = useState('');
  const [analysisType, setAnalysisType] = useState<'basic' | 'transcription' | 'translation'>('basic');
  const [error, setError] = useState('');
  const [result, setResult] = useState<SequenceAnalysis | null>(null);

  const validateSequence = (seq: string): boolean => {
    const validBases = new Set(['A', 'T', 'G', 'C']);
    return seq.split('').every(base => validBases.has(base.toUpperCase()));
  };

  const getComplementary = (seq: string): string => {
    const complement: Record<string, string> = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    return seq.toUpperCase().split('').map(base => complement[base]).join('');
  };

  const transcribe = (seq: string): string => {
    return seq.toUpperCase().replace(/T/g, 'U');
  };

  const translate = (rna: string): string => {
    const codons = rna.match(/.{1,3}/g) || [];
    let protein = '';
    let started = false;

    for (const codon of codons) {
      if (codon === 'AUG' && !started) {
        started = true;
        protein += 'M';
      } else if (started) {
        const aa = codonTable[codon];
        if (aa === '*') break;
        if (aa) protein += aa;
      }
    }

    return protein;
  };

  const analyzeSequence = () => {
    setError('');
    setResult(null);

    if (!sequence.trim()) {
      setError('Please enter a DNA sequence');
      return;
    }

    const cleanSequence = sequence.toUpperCase().replace(/\s/g, '');
    
    if (!validateSequence(cleanSequence)) {
      setError('Invalid DNA sequence. Use only A, T, G, C bases.');
      return;
    }

    const gcCount = (cleanSequence.match(/[GC]/g) || []).length;
    const complementaryStrand = getComplementary(cleanSequence);
    const rnaSequence = transcribe(cleanSequence);

    const analysis: SequenceAnalysis = {
      length: cleanSequence.length,
      gcContent: (gcCount / cleanSequence.length) * 100,
      complementary: complementaryStrand,
      rna: rnaSequence
    };

    if (analysisType === 'translation') {
      analysis.protein = translate(rnaSequence);
    }

    setResult(analysis);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Dna className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">DNA Sequence Calculator</h2>
          <p className="text-gray-600">Analyze DNA sequences and mutations</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Analysis Type
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value as 'basic' | 'transcription' | 'translation')}
          >
            <option value="basic">Basic Analysis</option>
            <option value="transcription">Transcription (DNA → RNA)</option>
            <option value="translation">Translation (DNA → Protein)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DNA Sequence
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Enter DNA sequence (A, T, G, C only)"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-purple-600 hover:bg-purple-700"
          onClick={analyzeSequence}
        >
          Analyze Sequence
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Sequence Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Length</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.length} bp
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">GC Content</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.gcContent.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Complementary Strand</h3>
              <p className="font-mono text-gray-600 break-all">{result.complementary}</p>
            </div>

            {analysisType !== 'basic' && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">RNA Sequence</h3>
                <p className="font-mono text-gray-600 break-all">{result.rna}</p>
              </div>
            )}

            {analysisType === 'translation' && result.protein && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Protein Sequence</h3>
                <p className="font-mono text-gray-600 break-all">{result.protein}</p>
              </div>
            )}

            <ShareResults
              title="DNA Sequence Analysis Results"
              text={`DNA Sequence Analysis:
• Length: ${result.length} bp
• GC Content: ${result.gcContent.toFixed(1)}%
• Complementary Strand: ${result.complementary}
${analysisType !== 'basic' ? `• RNA Sequence: ${result.rna}` : ''}
${result.protein ? `• Protein Sequence: ${result.protein}` : ''}

Analyze DNA sequences at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}