import React, { useState } from 'react';
import { Scale, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface AtomicMassCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface IsotopeData {
  massNumber: number;
  abundance: number;
  atomicMass: number;
}

export function AtomicMassCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-purple-50 to-blue-50',
    secondaryColor: 'text-purple-600',
    accentColor: 'bg-purple-100'
  }
}: AtomicMassCalculatorProps) {
  const [isotopes, setIsotopes] = useState<IsotopeData[]>([
    { massNumber: 0, abundance: 0, atomicMass: 0 }
  ]);
  const [result, setResult] = useState<{
    weightedAverage: number;
    contributions: { massNumber: number; contribution: number }[];
  } | null>(null);

  const addIsotope = () => {
    setIsotopes([...isotopes, { massNumber: 0, abundance: 0, atomicMass: 0 }]);
  };

  const removeIsotope = (index: number) => {
    if (isotopes.length > 1) {
      const newIsotopes = isotopes.filter((_, i) => i !== index);
      setIsotopes(newIsotopes);
    }
  };

  const updateIsotope = (index: number, field: keyof IsotopeData, value: number) => {
    const newIsotopes = [...isotopes];
    newIsotopes[index] = { ...newIsotopes[index], [field]: value };
    setIsotopes(newIsotopes);
  };

  const calculateAtomicMass = () => {
    const totalAbundance = isotopes.reduce((sum, isotope) => sum + isotope.abundance, 0);
    
    if (Math.abs(totalAbundance - 100) > 0.01) {
      alert('Total abundance must equal 100%');
      return;
    }

    const weightedAverage = isotopes.reduce((sum, isotope) => 
      sum + (isotope.atomicMass * (isotope.abundance / 100)), 0);

    const contributions = isotopes.map(isotope => ({
      massNumber: isotope.massNumber,
      contribution: isotope.atomicMass * (isotope.abundance / 100)
    }));

    setResult({ weightedAverage, contributions });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Scale className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Atomic Mass Calculator</h2>
          <p className="text-gray-600">Calculate weighted average atomic mass from isotopes</p>
        </div>
      </div>

      <div className="space-y-6">
        {isotopes.map((isotope, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mass Number
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={isotope.massNumber || ''}
                onChange={(e) => updateIsotope(index, 'massNumber', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Abundance (%)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={isotope.abundance || ''}
                onChange={(e) => updateIsotope(index, 'abundance', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Atomic Mass (amu)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  step="0.0001"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={isotope.atomicMass || ''}
                  onChange={(e) => updateIsotope(index, 'atomicMass', parseFloat(e.target.value))}
                />
                {isotopes.length > 1 && (
                  <button
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    onClick={() => removeIsotope(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            className="btn bg-purple-600 hover:bg-purple-700 flex-1"
            onClick={calculateAtomicMass}
          >
            Calculate Atomic Mass
          </button>
          <button
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
            onClick={addIsotope}
          >
            Add Isotope
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Weighted Average Atomic Mass</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.weightedAverage.toFixed(4)} amu
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Isotopic Contributions</h3>
              <div className="space-y-2">
                {result.contributions.map((contribution, index) => (
                  <div key={index} className="flex justify-between text-gray-600">
                    <span>Mass {contribution.massNumber}</span>
                    <span>{contribution.contribution.toFixed(4)} amu</span>
                  </div>
                ))}
              </div>
            </div>

            <ShareResults
              title="Atomic Mass Calculator Results"
              text={`Atomic Mass Calculation Results:
• Weighted Average: ${result.weightedAverage.toFixed(4)} amu
• Number of Isotopes: ${isotopes.length}
${result.contributions.map(c => `• Mass ${c.massNumber}: ${c.contribution.toFixed(4)} amu`).join('\n')}

Calculate atomic mass at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}