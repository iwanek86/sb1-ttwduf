import React, { useState } from 'react';
import { Dna, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface ProteinSynthesisCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface ProteinAnalysis {
  sequence: string;
  length: number;
  molecularWeight: number;
  isoelectricPoint: number;
  aminoAcidComposition: Record<string, number>;
  properties: {
    hydrophobic: number;
    polar: number;
    charged: number;
  };
}

const aminoAcids: Record<string, {
  name: string;
  weight: number;
  pI: number;
  type: 'hydrophobic' | 'polar' | 'charged';
}> = {
  'A': { name: 'Alanine', weight: 89.1, pI: 6.0, type: 'hydrophobic' },
  'R': { name: 'Arginine', weight: 174.2, pI: 10.76, type: 'charged' },
  'N': { name: 'Asparagine', weight: 132.1, pI: 5.41, type: 'polar' },
  'D': { name: 'Aspartic Acid', weight: 133.1, pI: 2.77, type: 'charged' },
  'C': { name: 'Cysteine', weight: 121.2, pI: 5.07, type: 'polar' },
  'E': { name: 'Glutamic Acid', weight: 147.1, pI: 3.22, type: 'charged' },
  'Q': { name: 'Glutamine', weight: 146.2, pI: 5.65, type: 'polar' },
  'G': { name: 'Glycine', weight: 75.1, pI: 5.97, type: 'hydrophobic' },
  'H': { name: 'Histidine', weight: 155.2, pI: 7.59, type: 'charged' },
  'I': { name: 'Isoleucine', weight: 131.2, pI: 6.02, type: 'hydrophobic' },
  'L': { name: 'Leucine', weight: 131.2, pI: 5.98, type: 'hydrophobic' },
  'K': { name: 'Lysine', weight: 146.2, pI: 9.74, type: 'charged' },
  'M': { name: 'Methionine', weight: 149.2, pI: 5.74, type: 'hydrophobic' },
  'F': { name: 'Phenylalanine', weight: 165.2, pI: 5.48, type: 'hydrophobic' },
  'P': { name: 'Proline', weight: 115.1, pI: 6.30, type: 'hydrophobic' },
  'S': { name: 'Serine', weight: 105.1, pI: 5.68, type: 'polar' },
  'T': { name: 'Threonine', weight: 119.1, pI: 5.60, type: 'polar' },
  'W': { name: 'Tryptophan', weight: 204.2, pI: 5.89, type: 'hydrophobic' },
  'Y': { name: 'Tyrosine', weight: 181.2, pI: 5.66, type: 'polar' },
  'V': { name: 'Valine', weight: 117.1, pI: 5.96, type: 'hydrophobic' }
};

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

export function ProteinSynthesisCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-indigo-50 to-blue-50',
    secondaryColor: 'text-indigo-600',
    accentColor: 'bg-indigo-100'
  }
}: ProteinSynthesisCalculatorProps) {
  const [inputType, setInputType] = useState<'dna' | 'rna' | 'protein'>('dna');
  const [sequence, setSequence] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ProteinAnalysis | null>(null);

  const validateSequence = (seq: string, type: 'dna' | 'rna' | 'protein'): boolean => {
    const validBases = {
      dna: new Set(['A', 'T', 'G', 'C']),
      rna: new Set(['A', 'U', 'G', 'C']),
      protein: new Set(Object.keys(aminoAcids))
    };
    return seq.split('').every(char => validBases[type].has(char.toUpperCase()));
  };

  const transcribe = (dna: string): string => {
    return dna.toUpperCase().replace(/T/g, 'U');
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

  const analyzeProtein = (proteinSeq: string): ProteinAnalysis => {
    const composition: Record<string, number> = {};
    let totalWeight = 0;
    let properties = { hydrophobic: 0, polar: 0, charged: 0 };

    for (const aa of proteinSeq) {
      const aminoAcid = aminoAcids[aa];
      composition[aa] = (composition[aa] || 0) + 1;
      totalWeight += aminoAcid.weight;
      properties[aminoAcid.type]++;
    }

    // Simplified isoelectric point calculation
    const isoelectricPoint = Object.entries(composition).reduce(
      (sum, [aa, count]) => sum + aminoAcids[aa].pI * count,
      0
    ) / proteinSeq.length;

    return {
      sequence: proteinSeq,
      length: proteinSeq.length,
      molecularWeight: totalWeight,
      isoelectricPoint,
      aminoAcidComposition: composition,
      properties: {
        hydrophobic: (properties.hydrophobic / proteinSeq.length) * 100,
        polar: (properties.polar / proteinSeq.length) * 100,
        charged: (properties.charged / proteinSeq.length) * 100
      }
    };
  };

  const calculateProtein = () => {
    setError('');
    setResult(null);

    if (!sequence.trim()) {
      setError('Please enter a sequence');
      return;
    }

    const cleanSequence = sequence.toUpperCase().replace(/\s/g, '');
    
    if (!validateSequence(cleanSequence, inputType)) {
      setError(`Invalid ${inputType.toUpperCase()} sequence`);
      return;
    }

    let proteinSequence: string;
    
    if (inputType === 'dna') {
      const rna = transcribe(cleanSequence);
      proteinSequence = translate(rna);
    } else if (inputType === 'rna') {
      proteinSequence = translate(cleanSequence);
    } else {
      proteinSequence = cleanSequence;
    }

    if (!proteinSequence) {
      setError('No valid protein sequence could be generated');
      return;
    }

    setResult(analyzeProtein(proteinSequence));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Dna className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Protein Synthesis Calculator</h2>
          <p className="text-gray-600">Calculate protein sequences and properties</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Type
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={inputType}
            onChange={(e) => {
              setInputType(e.target.value as 'dna' | 'rna' | 'protein');
              setSequence('');
              setResult(null);
            }}
          >
            <option value="dna">DNA Sequence</option>
            <option value="rna">RNA Sequence</option>
            <option value="protein">Protein Sequence</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sequence
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder={`Enter ${inputType.toUpperCase()} sequence`}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-indigo-600 hover:bg-indigo-700"
          onClick={calculateProtein}
        >
          Analyze Sequence
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Protein Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Length</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.length} amino acids
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Molecular Weight</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.molecularWeight.toFixed(1)} Da
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Protein Sequence</h3>
              <p className="font-mono text-gray-600 break-all">{result.sequence}</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Amino Acid Composition</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(result.aminoAcidComposition).map(([aa, count]) => (
                  <div key={aa} className="flex justify-between">
                    <span className="text-gray-600">{aminoAcids[aa].name}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Properties</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Isoelectric Point (pI)</p>
                  <p className="font-medium">{result.isoelectricPoint.toFixed(2)}</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Hydrophobic Residues</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${result.properties.hydrophobic}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right">{result.properties.hydrophobic.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Polar Residues</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${result.properties.polar}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right">{result.properties.polar.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Charged Residues</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${result.properties.charged}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right">{result.properties.charged.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>

            <ShareResults
              title="Protein Analysis Results"
              text={`Protein Analysis Results:
• Length: ${result.length} amino acids
• Molecular Weight: ${result.molecularWeight.toFixed(1)} Da
• Isoelectric Point: ${result.isoelectricPoint.toFixed(2)}
• Composition:
  - Hydrophobic: ${result.properties.hydrophobic.toFixed(1)}%
  - Polar: ${result.properties.polar.toFixed(1)}%
  - Charged: ${result.properties.charged.toFixed(1)}%

Analyze protein sequences at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}