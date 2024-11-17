import React, { useState } from 'react';
import { Zap, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface IonicCharacterCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface Element {
  symbol: string;
  name: string;
  electronegativity: number;
}

const elements: Record<string, Element> = {
  'H': { symbol: 'H', name: 'Hydrogen', electronegativity: 2.20 },
  'Li': { symbol: 'Li', name: 'Lithium', electronegativity: 0.98 },
  'Na': { symbol: 'Na', name: 'Sodium', electronegativity: 0.93 },
  'K': { symbol: 'K', name: 'Potassium', electronegativity: 0.82 },
  'F': { symbol: 'F', name: 'Fluorine', electronegativity: 3.98 },
  'Cl': { symbol: 'Cl', name: 'Chlorine', electronegativity: 3.16 },
  'Br': { symbol: 'Br', name: 'Bromine', electronegativity: 2.96 },
  'I': { symbol: 'I', name: 'Iodine', electronegativity: 2.66 },
  'O': { symbol: 'O', name: 'Oxygen', electronegativity: 3.44 },
  'N': { symbol: 'N', name: 'Nitrogen', electronegativity: 3.04 },
  'C': { symbol: 'C', name: 'Carbon', electronegativity: 2.55 },
  // Add more elements as needed
};

export function IonicCharacterCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-fuchsia-50 to-purple-50',
    secondaryColor: 'text-fuchsia-600',
    accentColor: 'bg-fuchsia-100'
  }
}: IonicCharacterCalculatorProps) {
  const [element1, setElement1] = useState<string>('');
  const [element2, setElement2] = useState<string>('');
  const [result, setResult] = useState<{
    ionicCharacter: number;
    electronegativityDifference: number;
    bondType: string;
    bondStrength: string;
  } | null>(null);

  const calculateIonicCharacter = () => {
    if (!element1 || !element2) return;

    const el1 = elements[element1];
    const el2 = elements[element2];

    const difference = Math.abs(el1.electronegativity - el2.electronegativity);
    // Pauling's formula: % ionic character = 100(1 - e^(-0.25 * ΔEN²))
    const ionicCharacter = 100 * (1 - Math.exp(-0.25 * difference * difference));

    let bondType: string;
    let bondStrength: string;

    if (ionicCharacter < 15) {
      bondType = 'Nonpolar Covalent';
      bondStrength = 'Weak polarity';
    } else if (ionicCharacter < 50) {
      bondType = 'Polar Covalent';
      bondStrength = 'Moderate polarity';
    } else {
      bondType = 'Ionic';
      bondStrength = 'Strong polarity';
    }

    setResult({
      ionicCharacter,
      electronegativityDifference: difference,
      bondType,
      bondStrength
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Zap className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ionic Character Calculator</h2>
          <p className="text-gray-600">Calculate bond ionic character from electronegativity values</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Element 1
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              value={element1}
              onChange={(e) => setElement1(e.target.value)}
            >
              <option value="">Select element</option>
              {Object.values(elements).map((el) => (
                <option key={el.symbol} value={el.symbol}>
                  {el.name} ({el.symbol}) - EN: {el.electronegativity}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Element 2
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              value={element2}
              onChange={(e) => setElement2(e.target.value)}
            >
              <option value="">Select element</option>
              {Object.values(elements).map((el) => (
                <option key={el.symbol} value={el.symbol}>
                  {el.name} ({el.symbol}) - EN: {el.electronegativity}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn w-full bg-fuchsia-600 hover:bg-fuchsia-700"
          onClick={calculateIonicCharacter}
          disabled={!element1 || !element2}
        >
          Calculate Ionic Character
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Ionic Character</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.ionicCharacter.toFixed(1)}%
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">ΔEN</h3>
                <p className="text-gray-600">{result.electronegativityDifference.toFixed(2)}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Bond Type</h3>
                <p className="text-gray-600">{result.bondType}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Bond Strength</h3>
                <p className="text-gray-600">{result.bondStrength}</p>
              </div>
            </div>

            <ShareResults
              title="Ionic Character Calculator Results"
              text={`Bond Analysis Results:
• Elements: ${elements[element1].name}-${elements[element2].name}
• Ionic Character: ${result.ionicCharacter.toFixed(1)}%
• Electronegativity Difference: ${result.electronegativityDifference.toFixed(2)}
• Bond Type: ${result.bondType}
• Bond Strength: ${result.bondStrength}

Calculate ionic character at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}