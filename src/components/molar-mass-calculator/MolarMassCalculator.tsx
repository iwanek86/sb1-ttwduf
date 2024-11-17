import React, { useState } from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface MolarMassCalculatorProps {
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
  mass: number;
}

const elements: Record<string, Element> = {
  'H': { symbol: 'H', name: 'Hydrogen', mass: 1.008 },
  'He': { symbol: 'He', name: 'Helium', mass: 4.003 },
  'Li': { symbol: 'Li', name: 'Lithium', mass: 6.941 },
  'Be': { symbol: 'Be', name: 'Beryllium', mass: 9.012 },
  'B': { symbol: 'B', name: 'Boron', mass: 10.811 },
  'C': { symbol: 'C', name: 'Carbon', mass: 12.011 },
  'N': { symbol: 'N', name: 'Nitrogen', mass: 14.007 },
  'O': { symbol: 'O', name: 'Oxygen', mass: 15.999 },
  'F': { symbol: 'F', name: 'Fluorine', mass: 18.998 },
  'Na': { symbol: 'Na', name: 'Sodium', mass: 22.990 },
  'Mg': { symbol: 'Mg', name: 'Magnesium', mass: 24.305 },
  'Al': { symbol: 'Al', name: 'Aluminum', mass: 26.982 },
  'Si': { symbol: 'Si', name: 'Silicon', mass: 28.086 },
  'P': { symbol: 'P', name: 'Phosphorus', mass: 30.974 },
  'S': { symbol: 'S', name: 'Sulfur', mass: 32.065 },
  'Cl': { symbol: 'Cl', name: 'Chlorine', mass: 35.453 },
  'K': { symbol: 'K', name: 'Potassium', mass: 39.098 },
  'Ca': { symbol: 'Ca', name: 'Calcium', mass: 40.078 },
  // Add more elements as needed
};

interface ElementCount {
  element: Element;
  count: number;
}

export function MolarMassCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-blue-50 to-indigo-50',
    secondaryColor: 'text-blue-600',
    accentColor: 'bg-blue-100'
  }
}: MolarMassCalculatorProps) {
  const [formula, setFormula] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    totalMass: number;
    elements: ElementCount[];
  } | null>(null);

  const parseFormula = (formula: string): ElementCount[] | null => {
    const elementRegex = /([A-Z][a-z]?)(\d*)/g;
    const elementCounts: ElementCount[] = [];
    let match;

    try {
      while ((match = elementRegex.exec(formula)) !== null) {
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2]) : 1;

        if (!elements[symbol]) {
          throw new Error(`Unknown element: ${symbol}`);
        }

        elementCounts.push({
          element: elements[symbol],
          count: count
        });
      }

      return elementCounts;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      return null;
    }
  };

  const calculateMolarMass = () => {
    setError('');
    setResult(null);

    if (!formula.trim()) {
      setError('Please enter a chemical formula');
      return;
    }

    const elementCounts = parseFormula(formula);
    if (!elementCounts) return;

    const totalMass = elementCounts.reduce(
      (sum, { element, count }) => sum + element.mass * count,
      0
    );

    setResult({
      totalMass,
      elements: elementCounts
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Scale className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Molar Mass Calculator</h2>
          <p className="text-gray-600">Calculate molecular weight of chemical compounds</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chemical Formula
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="e.g., H2O, NaCl, C6H12O6"
          />
          <p className="mt-1 text-sm text-gray-500">
            Use capital letters for elements (e.g., Na for sodium)
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-blue-600 hover:bg-blue-700"
          onClick={calculateMolarMass}
          disabled={!formula.trim()}
        >
          Calculate Molar Mass
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Total Molar Mass</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.totalMass.toFixed(3)} g/mol
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Mass Contributions</h3>
              <div className="space-y-2">
                {result.elements.map(({ element, count }, index) => {
                  const contribution = element.mass * count;
                  const percentage = (contribution / result.totalMass) * 100;
                  
                  return (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="font-mono">{element.symbol}</span>
                        {count > 1 && <sub className="font-mono">{count}</sub>}
                        <span className="text-gray-600 ml-2">({element.name})</span>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{contribution.toFixed(3)} g/mol</p>
                        <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <ShareResults
              title="Molar Mass Calculation Results"
              text={`Molar Mass Calculation for ${formula}:
• Total Molar Mass: ${result.totalMass.toFixed(3)} g/mol
• Element Contributions:
${result.elements.map(({ element, count }) => 
  `  ${element.symbol}${count > 1 ? count : ''}: ${(element.mass * count).toFixed(3)} g/mol`
).join('\n')}

Calculate molar mass at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}