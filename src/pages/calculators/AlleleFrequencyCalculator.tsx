import React, { useState } from 'react';
import { Calculator, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../../components/ShareResults';

interface AlleleFrequencyCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface AlleleData {
  allele: string;
  count: number;
  frequency: number;
  percentage: number;
}

interface GenotypeData {
  genotype: string;
  count: number;
  frequency: number;
  percentage: number;
}

interface AlleleAnalysis {
  alleles: AlleleData[];
  genotypes: GenotypeData[];
  totalAlleles: number;
  totalIndividuals: number;
  isHardyWeinberg: boolean;
  chiSquare?: number;
}

export default function AlleleFrequencyCalculator() {
  const [dominantCount, setDominantCount] = useState('');
  const [heterozygousCount, setHeterozygousCount] = useState('');
  const [recessiveCount, setRecessiveCount] = useState('');
  const [dominantSymbol, setDominantSymbol] = useState('A');
  const [recessiveSymbol, setRecessiveSymbol] = useState('a');
  const [error, setError] = useState('');
  const [result, setResult] = useState<AlleleAnalysis | null>(null);

  const calculateFrequencies = () => {
    setError('');
    setResult(null);

    try {
      const AA = parseInt(dominantCount) || 0;
      const Aa = parseInt(heterozygousCount) || 0;
      const aa = parseInt(recessiveCount) || 0;

      if (AA < 0 || Aa < 0 || aa < 0) {
        setError('Counts cannot be negative');
        return;
      }

      const totalIndividuals = AA + Aa + aa;
      if (totalIndividuals === 0) {
        setError('Total population must be greater than 0');
        return;
      }

      // Calculate allele frequencies
      const totalAlleles = totalIndividuals * 2;
      const dominantAlleles = (2 * AA) + Aa;
      const recessiveAlleles = (2 * aa) + Aa;

      const p = dominantAlleles / totalAlleles;
      const q = recessiveAlleles / totalAlleles;

      // Calculate expected Hardy-Weinberg frequencies
      const expectedAA = p * p * totalIndividuals;
      const expectedAa = 2 * p * q * totalIndividuals;
      const expectedaa = q * q * totalIndividuals;

      // Chi-square test
      const chiSquare = 
        Math.pow(AA - expectedAA, 2) / expectedAA +
        Math.pow(Aa - expectedAa, 2) / expectedAa +
        Math.pow(aa - expectedaa, 2) / expectedaa;

      // Population is in HW equilibrium if chi-square < 5.991 (df=2, p=0.05)
      const isHardyWeinberg = chiSquare < 5.991;

      setResult({
        alleles: [
          {
            allele: dominantSymbol,
            count: dominantAlleles,
            frequency: p,
            percentage: p * 100
          },
          {
            allele: recessiveSymbol,
            count: recessiveAlleles,
            frequency: q,
            percentage: q * 100
          }
        ],
        genotypes: [
          {
            genotype: `${dominantSymbol}${dominantSymbol}`,
            count: AA,
            frequency: AA / totalIndividuals,
            percentage: (AA / totalIndividuals) * 100
          },
          {
            genotype: `${dominantSymbol}${recessiveSymbol}`,
            count: Aa,
            frequency: Aa / totalIndividuals,
            percentage: (Aa / totalIndividuals) * 100
          },
          {
            genotype: `${recessiveSymbol}${recessiveSymbol}`,
            count: aa,
            frequency: aa / totalIndividuals,
            percentage: (aa / totalIndividuals) * 100
          }
        ],
        totalAlleles,
        totalIndividuals,
        isHardyWeinberg,
        chiSquare
      });
    } catch (err) {
      setError('Invalid input values');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <Calculator className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Allele Frequency Calculator</h2>
            <p className="text-gray-600">Calculate allele frequencies and test Hardy-Weinberg equilibrium</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dominant Symbol
              </label>
              <input
                type="text"
                maxLength={1}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={dominantSymbol}
                onChange={(e) => setDominantSymbol(e.target.value.toUpperCase())}
                placeholder="A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recessive Symbol
              </label>
              <input
                type="text"
                maxLength={1}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={recessiveSymbol}
                onChange={(e) => setRecessiveSymbol(e.target.value.toLowerCase())}
                placeholder="a"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {`${dominantSymbol}${dominantSymbol} Count`}
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={dominantCount}
                onChange={(e) => setDominantCount(e.target.value)}
                placeholder="Enter count"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {`${dominantSymbol}${recessiveSymbol} Count`}
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={heterozygousCount}
                onChange={(e) => setHeterozygousCount(e.target.value)}
                placeholder="Enter count"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {`${recessiveSymbol}${recessiveSymbol} Count`}
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={recessiveCount}
                onChange={(e) => setRecessiveCount(e.target.value)}
                placeholder="Enter count"
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
            className="btn w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={calculateFrequencies}
          >
            Calculate Frequencies
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Allele Frequencies</h3>
                <div className="grid grid-cols-2 gap-4">
                  {result.alleles.map((allele) => (
                    <div key={allele.allele} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Allele {allele.allele}</span>
                        <span className="font-medium">{allele.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${allele.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Genotype Distribution</h3>
                <div className="space-y-4">
                  {result.genotypes.map((genotype) => (
                    <div key={genotype.genotype} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{genotype.genotype}</span>
                        <span className="font-medium">{genotype.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${genotype.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Population Size</h3>
                  <p className="text-gray-600">
                    {result.totalIndividuals} individuals
                    <br />
                    {result.totalAlleles} total alleles
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Hardy-Weinberg Equilibrium</h3>
                  <p className={result.isHardyWeinberg ? 'text-green-600' : 'text-red-600'}>
                    Population is {result.isHardyWeinberg ? '' : 'not '}in equilibrium
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    χ² = {result.chiSquare?.toFixed(3)}
                  </p>
                </div>
              </div>

              <ShareResults
                title="Allele Frequency Analysis Results"
                text={`Allele Frequency Analysis:
• Population Size: ${result.totalIndividuals} individuals
• Total Alleles: ${result.totalAlleles}

Allele Frequencies:
${result.alleles.map(a => `• ${a.allele}: ${a.percentage.toFixed(1)}%`).join('\n')}

Genotype Distribution:
${result.genotypes.map(g => `• ${g.genotype}: ${g.percentage.toFixed(1)}%`).join('\n')}

Hardy-Weinberg Equilibrium:
• Status: ${result.isHardyWeinberg ? 'In equilibrium' : 'Not in equilibrium'}
• χ² = ${result.chiSquare?.toFixed(3)}

Calculate allele frequencies at:`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}