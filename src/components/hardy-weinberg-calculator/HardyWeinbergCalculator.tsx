import React, { useState } from 'react';
import { Calculator, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface HardyWeinbergCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface HWResult {
  alleleFrequencies: {
    p: number;
    q: number;
  };
  genotypeFrequencies: {
    dominant: number;
    heterozygous: number;
    recessive: number;
  };
  populationCounts: {
    dominant: number;
    heterozygous: number;
    recessive: number;
    total: number;
  };
  chiSquare?: {
    value: number;
    pValue: number;
    isEquilibrium: boolean;
  };
}

export function HardyWeinbergCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-pink-50 to-rose-50',
    secondaryColor: 'text-pink-600',
    accentColor: 'bg-pink-100'
  }
}: HardyWeinbergCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'frequencies' | 'counts'>('frequencies');
  const [dominantFreq, setDominantFreq] = useState('');
  const [heterozygousFreq, setHeterozygousFreq] = useState('');
  const [recessiveFreq, setRecessiveFreq] = useState('');
  const [dominantCount, setDominantCount] = useState('');
  const [heterozygousCount, setHeterozygousCount] = useState('');
  const [recessiveCount, setRecessiveCount] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<HWResult | null>(null);

  const calculateChiSquare = (observed: number[], expected: number[]): number => {
    return observed.reduce((sum, obs, i) => {
      const exp = expected[i];
      return sum + Math.pow(obs - exp, 2) / exp;
    }, 0);
  };

  const getPValue = (chiSquare: number, df: number): number => {
    // Simplified p-value calculation for df=2
    // In a real implementation, you would use a proper statistical library
    const x = chiSquare / 2;
    return Math.exp(-x) * (1 + x);
  };

  const calculateHW = () => {
    setError('');
    setResult(null);

    try {
      let p: number, q: number;
      let dominant: number, heterozygous: number, recessive: number;
      let total: number;

      if (calculationType === 'frequencies') {
        dominant = parseFloat(dominantFreq) || 0;
        heterozygous = parseFloat(heterozygousFreq) || 0;
        recessive = parseFloat(recessiveFreq) || 0;
        total = dominant + heterozygous + recessive;

        if (Math.abs(total - 1) > 0.001) {
          setError('Frequencies must sum to 1');
          return;
        }
      } else {
        dominant = parseInt(dominantCount) || 0;
        heterozygous = parseInt(heterozygousCount) || 0;
        recessive = parseInt(recessiveCount) || 0;
        total = dominant + heterozygous + recessive;

        if (total === 0) {
          setError('Total population count must be greater than 0');
          return;
        }

        // Convert counts to frequencies
        dominant /= total;
        heterozygous /= total;
        recessive /= total;
      }

      // Calculate allele frequencies
      p = dominant + (heterozygous / 2);
      q = recessive + (heterozygous / 2);

      // Expected frequencies under HW equilibrium
      const expectedDominant = p * p;
      const expectedHeterozygous = 2 * p * q;
      const expectedRecessive = q * q;

      // Chi-square test
      const observed = [dominant, heterozygous, recessive].map(f => f * total);
      const expected = [expectedDominant, expectedHeterozygous, expectedRecessive].map(f => f * total);
      const chiSquare = calculateChiSquare(observed, expected);
      const pValue = getPValue(chiSquare, 2);

      setResult({
        alleleFrequencies: { p, q },
        genotypeFrequencies: {
          dominant: expectedDominant,
          heterozygous: expectedHeterozygous,
          recessive: expectedRecessive
        },
        populationCounts: {
          dominant: Math.round(dominant * total),
          heterozygous: Math.round(heterozygous * total),
          recessive: Math.round(recessive * total),
          total
        },
        chiSquare: {
          value: chiSquare,
          pValue,
          isEquilibrium: pValue > 0.05
        }
      });
    } catch (err) {
      setError('Invalid input values');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Calculator className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hardy-Weinberg Calculator</h2>
          <p className="text-gray-600">Calculate allele frequencies and test for equilibrium</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Type
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={calculationType}
            onChange={(e) => {
              setCalculationType(e.target.value as 'frequencies' | 'counts');
              setDominantFreq('');
              setHeterozygousFreq('');
              setRecessiveFreq('');
              setDominantCount('');
              setHeterozygousCount('');
              setRecessiveCount('');
              setResult(null);
            }}
          >
            <option value="frequencies">Genotype Frequencies</option>
            <option value="counts">Population Counts</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {calculationType === 'frequencies' ? 'Dominant (AA) Frequency' : 'Dominant (AA) Count'}
            </label>
            <input
              type={calculationType === 'frequencies' ? 'number' : 'number'}
              step={calculationType === 'frequencies' ? '0.01' : '1'}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={calculationType === 'frequencies' ? dominantFreq : dominantCount}
              onChange={(e) => calculationType === 'frequencies' ? 
                setDominantFreq(e.target.value) : 
                setDominantCount(e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {calculationType === 'frequencies' ? 'Heterozygous (Aa) Frequency' : 'Heterozygous (Aa) Count'}
            </label>
            <input
              type={calculationType === 'frequencies' ? 'number' : 'number'}
              step={calculationType === 'frequencies' ? '0.01' : '1'}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={calculationType === 'frequencies' ? heterozygousFreq : heterozygousCount}
              onChange={(e) => calculationType === 'frequencies' ? 
                setHeterozygousFreq(e.target.value) : 
                setHeterozygousCount(e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {calculationType === 'frequencies' ? 'Recessive (aa) Frequency' : 'Recessive (aa) Count'}
            </label>
            <input
              type={calculationType === 'frequencies' ? 'number' : 'number'}
              step={calculationType === 'frequencies' ? '0.01' : '1'}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={calculationType === 'frequencies' ? recessiveFreq : recessiveCount}
              onChange={(e) => calculationType === 'frequencies' ? 
                setRecessiveFreq(e.target.value) : 
                setRecessiveCount(e.target.value)
              }
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-pink-600 hover:bg-pink-700"
          onClick={calculateHW}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Allele Frequencies</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">p (dominant allele)</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.alleleFrequencies.p.toFixed(4)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">q (recessive allele)</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.alleleFrequencies.q.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Expected Genotype Frequencies</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">AA (p²)</p>
                  <p className="font-medium">{result.genotypeFrequencies.dominant.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aa (2pq)</p>
                  <p className="font-medium">{result.genotypeFrequencies.heterozygous.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">aa (q²)</p>
                  <p className="font-medium">{result.genotypeFrequencies.recessive.toFixed(4)}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Population Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">AA Count</p>
                  <p className="font-medium">{result.populationCounts.dominant}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aa Count</p>
                  <p className="font-medium">{result.populationCounts.heterozygous}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">aa Count</p>
                  <p className="font-medium">{result.populationCounts.recessive}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-medium">{result.populationCounts.total}</p>
                </div>
              </div>
            </div>

            {result.chiSquare && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Hardy-Weinberg Equilibrium Test</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    χ² value: {result.chiSquare.value.toFixed(4)}
                  </p>
                  <p className="text-gray-600">
                    p-value: {result.chiSquare.pValue.toFixed(4)}
                  </p>
                  <p className={result.chiSquare.isEquilibrium ? 'text-green-600' : 'text-red-600'}>
                    Population is {result.chiSquare.isEquilibrium ? 'in' : 'not in'} Hardy-Weinberg equilibrium
                  </p>
                </div>
              </div>
            )}

            <ShareResults
              title="Hardy-Weinberg Calculator Results"
              text={`Hardy-Weinberg Analysis Results:
• Allele Frequencies:
  - p (dominant): ${result.alleleFrequencies.p.toFixed(4)}
  - q (recessive): ${result.alleleFrequencies.q.toFixed(4)}

• Expected Genotype Frequencies:
  - AA: ${result.genotypeFrequencies.dominant.toFixed(4)}
  - Aa: ${result.genotypeFrequencies.heterozygous.toFixed(4)}
  - aa: ${result.genotypeFrequencies.recessive.toFixed(4)}

• Population Distribution:
  - AA: ${result.populationCounts.dominant}
  - Aa: ${result.populationCounts.heterozygous}
  - aa: ${result.populationCounts.recessive}
  - Total: ${result.populationCounts.total}

${result.chiSquare ? `• Hardy-Weinberg Test:
  - χ² value: ${result.chiSquare.value.toFixed(4)}
  - p-value: ${result.chiSquare.pValue.toFixed(4)}
  - Status: Population is ${result.chiSquare.isEquilibrium ? 'in' : 'not in'} equilibrium` : ''}

Calculate population genetics at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}