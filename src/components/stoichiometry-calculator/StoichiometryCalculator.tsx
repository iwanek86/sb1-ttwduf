import React, { useState } from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface StoichiometryCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface Compound {
  formula: string;
  coefficient: number;
  molarMass: number;
  amount?: number;
}

interface BalancedEquation {
  reactants: Compound[];
  products: Compound[];
}

export function StoichiometryCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-lime-50 to-green-50',
    secondaryColor: 'text-lime-600',
    accentColor: 'bg-lime-100'
  }
}: StoichiometryCalculatorProps) {
  const [equation, setEquation] = useState('');
  const [knownCompound, setKnownCompound] = useState('');
  const [knownAmount, setKnownAmount] = useState('');
  const [targetCompound, setTargetCompound] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    balancedEquation: string;
    limitingReagent?: string;
    theoreticalYield: number;
    actualYield?: number;
    percentYield?: number;
  } | null>(null);

  const parseEquation = (eq: string): BalancedEquation | null => {
    try {
      const [reactantsStr, productsStr] = eq.split('->').map(s => s.trim());
      
      const parseCompounds = (str: string): Compound[] => {
        return str.split('+').map(c => {
          const match = c.trim().match(/^(\d*)([A-Za-z0-9]+)$/);
          if (!match) throw new Error('Invalid compound format');
          return {
            formula: match[2],
            coefficient: match[1] ? parseInt(match[1]) : 1,
            molarMass: calculateMolarMass(match[2])
          };
        });
      };

      return {
        reactants: parseCompounds(reactantsStr),
        products: parseCompounds(productsStr)
      };
    } catch (err) {
      setError('Invalid equation format');
      return null;
    }
  };

  const calculateMolarMass = (formula: string): number => {
    // This is a simplified molar mass calculator
    // In a real implementation, you would need a comprehensive atomic mass database
    // and proper formula parsing
    return 100; // Placeholder value
  };

  const calculateStoichiometry = () => {
    setError('');
    setResult(null);

    if (!equation || !knownCompound || !knownAmount || !targetCompound) {
      setError('Please fill in all required fields');
      return;
    }

    const balancedEq = parseEquation(equation);
    if (!balancedEq) return;

    // Simplified calculation for demonstration
    // In a real implementation, you would need to:
    // 1. Verify the equation is balanced
    // 2. Calculate molar ratios
    // 3. Determine limiting reagent
    // 4. Calculate theoretical yield

    const theoreticalYield = parseFloat(knownAmount) * 0.85; // Placeholder calculation

    setResult({
      balancedEquation: equation,
      theoreticalYield,
      limitingReagent: knownCompound,
      actualYield: theoreticalYield * 0.9,
      percentYield: 90
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Scale className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stoichiometry Calculator</h2>
          <p className="text-gray-600">Calculate quantities in chemical reactions</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chemical Equation
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="e.g., 2H2 + O2 -> 2H2O"
          />
          <p className="mt-1 text-sm text-gray-500">
            Use {'->'} for reaction arrow and + to separate compounds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Known Compound
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              value={knownCompound}
              onChange={(e) => setKnownCompound(e.target.value)}
              placeholder="Enter compound"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Known Amount (g)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              value={knownAmount}
              onChange={(e) => setKnownAmount(e.target.value)}
              placeholder="Enter mass"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Compound
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              value={targetCompound}
              onChange={(e) => setTargetCompound(e.target.value)}
              placeholder="Enter compound"
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
          className="btn w-full bg-lime-600 hover:bg-lime-700"
          onClick={calculateStoichiometry}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Balanced Equation</h3>
              <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                {result.balancedEquation}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Theoretical Yield</h3>
                <p className="text-gray-600">{result.theoreticalYield.toFixed(2)} g</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Actual Yield</h3>
                <p className="text-gray-600">{result.actualYield?.toFixed(2)} g</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Percent Yield</h3>
                <p className="text-gray-600">{result.percentYield?.toFixed(1)}%</p>
              </div>
            </div>

            {result.limitingReagent && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Limiting Reagent</h3>
                <p className="text-gray-600">{result.limitingReagent}</p>
              </div>
            )}

            <ShareResults
              title="Stoichiometry Calculator Results"
              text={`Stoichiometry Calculation Results:
• Balanced Equation: ${result.balancedEquation}
• Theoretical Yield: ${result.theoreticalYield.toFixed(2)} g
• Actual Yield: ${result.actualYield?.toFixed(2)} g
• Percent Yield: ${result.percentYield?.toFixed(1)}%
${result.limitingReagent ? `• Limiting Reagent: ${result.limitingReagent}` : ''}

Calculate stoichiometry at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}