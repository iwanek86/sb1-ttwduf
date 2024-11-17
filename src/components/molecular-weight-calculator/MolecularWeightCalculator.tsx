import React, { useState } from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface MolecularWeightCalculatorProps {
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
  'Ca': { symbol: 'Ca', name: 'Calcium', mass: 40.078 }
};

interface ElementContribution {
  element: Element;
  count: number;
  mass: number;
  percentage: number;
}

export function MolecularWeightCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-sky-50 to-blue-50',
    secondaryColor: 'text-sky-600',
    accentColor: 'bg-sky-100'
  }
}: MolecularWeightCalculatorProps) {
  const [formula, setFormula] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    totalMass: number;
    elements: ElementContribution[];
    empiricalFormula: string;
  } | null>(null);

  const parseFormula = (formula: string): ElementContribution[] | null => {
    const elementRegex = /([A-Z][a-z]?)(\d*)/g;
    const elementCounts: ElementContribution[] = [];
    let match;
    let totalMass = 0;

    try {
      while ((match = elementRegex.exec(formula)) !== null) {
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2]) : 1;

        if (!elements[symbol]) {
          throw new Error(`Unknown element: ${symbol}`);
        }

        const mass = elements[symbol].mass * count;
        totalMass += mass;

        elementCounts.push({
          element: elements[symbol],
          count,
          mass,
          percentage: 0 // Will be calculated after total mass is known
        });
      }

      return elementCounts.map(elem => ({
        ...elem,
        percentage: (elem.mass / totalMass) * 100
      }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      return null;
    }
  };

  const calculateEmpiricalFormula = (elements: ElementContribution[]): string => {
    // Find the smallest count
    const minCount = Math.min(...elements.map(e => e.count));
    
    // Divide all counts by the GCD
    const counts = elements.map(e => e.count / minCount);
    
    // Create empirical formula
    return elements.map((e, i) => 
      e.element.symbol + (counts[i] === 1 ? '' : Math.round(counts[i]))
    ).join('');
  };

  const calculateMolecularWeight = () => {
    setError('');
    setResult(null);

    if (!formula.trim()) {
      setError('Please enter a chemical formula');
      return;
    }

    const elementContributions = parseFormula(formula);
    if (!elementContributions) return;

    const totalMass = elementContributions.reduce((sum, { mass }) => sum + mass, 0);
    const empiricalFormula = calculateEmpiricalFormula(elementContributions);

    setResult({
      totalMass,
      elements: elementContributions,
      empiricalFormula
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Scale className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Molecular Weight Calculator</h2>
          <p className="text-gray-600">Calculate molecular mass of chemical compounds</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chemical Formula
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
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
          className="btn w-full bg-sky-600 hover:bg-sky-700"
          onClick={calculateMolecularWeight}
          disabled={!formula.trim()}
        >
          Calculate Molecular Weight
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Molecular Weight</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.totalMass.toFixed(3)} g/mol
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Molecular Formula</h3>
                <p className="text-gray-600 font-mono">{formula}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Empirical Formula</h3>
                <p className="text-gray-600 font-mono">{result.empiricalFormula}</p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Element Composition</h3>
              <div className="space-y-4">
                {result.elements.map(({ element, count, percentage, mass }, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-mono">{element.symbol}</span>
                        {count > 1 && <sub className="font-mono">{count}</sub>}
                        <span className="text-gray-600 ml-2">({element.name})</span>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                          {percentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sky-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Mass contribution: {mass.toFixed(3)} g/mol
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ShareResults
              title="Molecular Weight Calculator Results"
              text={`Molecular Weight Analysis for ${formula}:
• Molecular Weight: ${result.totalMass.toFixed(3)} g/mol
• Empirical Formula: ${result.empiricalFormula}
• Element Composition:
${result.elements.map(({ element, percentage, mass }) => 
  `  ${element.symbol}: ${percentage.toFixed(2)}% (${mass.toFixed(3)} g/mol)`
).join('\n')}

Calculate molecular weights at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}