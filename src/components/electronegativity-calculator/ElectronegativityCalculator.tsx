import React, { useState } from 'react';
import { Zap, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface ElectronegativityCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface ElementData {
  symbol: string;
  name: string;
  pauling: number;
  mulliken: number;
  allredRochow: number;
}

const elements: Record<string, ElementData> = {
  'H': { symbol: 'H', name: 'Hydrogen', pauling: 2.20, mulliken: 7.17, allredRochow: 2.20 },
  'F': { symbol: 'F', name: 'Fluorine', pauling: 3.98, mulliken: 10.41, allredRochow: 4.10 },
  'O': { symbol: 'O', name: 'Oxygen', pauling: 3.44, mulliken: 8.40, allredRochow: 3.50 },
  'N': { symbol: 'N', name: 'Nitrogen', pauling: 3.04, mulliken: 7.30, allredRochow: 3.07 },
  'Cl': { symbol: 'Cl', name: 'Chlorine', pauling: 3.16, mulliken: 8.30, allredRochow: 2.83 },
  // Add more elements as needed
};

export function ElectronegativityCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-rose-50 to-pink-50',
    secondaryColor: 'text-rose-600',
    accentColor: 'bg-rose-100'
  }
}: ElectronegativityCalculatorProps) {
  const [element1, setElement1] = useState<string>('');
  const [element2, setElement2] = useState<string>('');
  const [scale, setScale] = useState<'pauling' | 'mulliken' | 'allredRochow'>('pauling');
  const [result, setResult] = useState<{
    element1Data: ElementData;
    element2Data?: ElementData;
    difference?: number;
    bondType: string;
    polarity: string;
  } | null>(null);

  const calculateElectronegativity = () => {
    const el1 = elements[element1];
    const el2 = element2 ? elements[element2] : undefined;

    if (!el1) return;

    let difference = 0;
    let bondType = 'N/A';
    let polarity = 'N/A';

    if (el2) {
      difference = Math.abs(el1[scale] - el2[scale]);
      
      if (difference < 0.4) {
        bondType = 'Nonpolar Covalent';
        polarity = 'Nonpolar';
      } else if (difference < 1.7) {
        bondType = 'Polar Covalent';
        polarity = 'Polar';
      } else {
        bondType = 'Ionic';
        polarity = 'Highly Polar';
      }
    }

    setResult({
      element1Data: el1,
      element2Data: el2,
      difference: el2 ? difference : undefined,
      bondType,
      polarity
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Zap className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Electronegativity Calculator</h2>
          <p className="text-gray-600">Calculate and compare atomic electronegativity values</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Element 1
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              value={element1}
              onChange={(e) => setElement1(e.target.value)}
            >
              <option value="">Select element</option>
              {Object.values(elements).map((el) => (
                <option key={el.symbol} value={el.symbol}>
                  {el.name} ({el.symbol})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Element 2 (optional)
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              value={element2}
              onChange={(e) => setElement2(e.target.value)}
            >
              <option value="">Select element</option>
              {Object.values(elements).map((el) => (
                <option key={el.symbol} value={el.symbol}>
                  {el.name} ({el.symbol})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electronegativity Scale
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              value={scale}
              onChange={(e) => setScale(e.target.value as any)}
            >
              <option value="pauling">Pauling</option>
              <option value="mulliken">Mulliken</option>
              <option value="allredRochow">Allred-Rochow</option>
            </select>
          </div>
        </div>

        <button
          className="btn w-full bg-rose-600 hover:bg-rose-700"
          onClick={calculateElectronegativity}
          disabled={!element1}
        >
          Calculate Electronegativity
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Electronegativity Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">{result.element1Data.name}</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.element1Data[scale].toFixed(2)}
                  </p>
                </div>
                {result.element2Data && (
                  <div>
                    <p className="text-sm text-gray-600">{result.element2Data.name}</p>
                    <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                      {result.element2Data[scale].toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {result.element2Data && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Difference</h3>
                  <p className="text-gray-600">{result.difference?.toFixed(2)}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Bond Type</h3>
                  <p className="text-gray-600">{result.bondType}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Polarity</h3>
                  <p className="text-gray-600">{result.polarity}</p>
                </div>
              </div>
            )}

            <ShareResults
              title="Electronegativity Calculator Results"
              text={`Electronegativity Calculation Results:
• ${result.element1Data.name}: ${result.element1Data[scale].toFixed(2)}
${result.element2Data ? `• ${result.element2Data.name}: ${result.element2Data[scale].toFixed(2)}
• Difference: ${result.difference?.toFixed(2)}
• Bond Type: ${result.bondType}
• Polarity: ${result.polarity}` : ''}

Calculate electronegativity values at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}