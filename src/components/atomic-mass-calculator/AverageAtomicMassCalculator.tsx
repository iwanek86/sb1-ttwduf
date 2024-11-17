import React, { useState } from 'react';
import { Scale, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface AverageAtomicMassCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface Isotope {
  mass: number;
  abundance: number;
}

export function AverageAtomicMassCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-indigo-50 to-purple-50',
    secondaryColor: 'text-indigo-600',
    accentColor: 'bg-indigo-100'
  }
}: AverageAtomicMassCalculatorProps) {
  const [isotopes, setIsotopes] = useState<Isotope[]>([
    { mass: 0, abundance: 0 }
  ]);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<{
    averageMass: number;
    contributions: { mass: number; contribution: number }[];
  } | null>(null);

  const addIsotope = () => {
    setIsotopes([...isotopes, { mass: 0, abundance: 0 }]);
    setError('');
  };

  const removeIsotope = (index: number) => {
    if (isotopes.length > 1) {
      const newIsotopes = isotopes.filter((_, i) => i !== index);
      setIsotopes(newIsotopes);
      setError('');
    }
  };

  const updateIsotope = (index: number, field: keyof Isotope, value: number) => {
    const newIsotopes = [...isotopes];
    newIsotopes[index] = { ...newIsotopes[index], [field]: value };
    setIsotopes(newIsotopes);
    setError('');
  };

  const calculateAverageMass = () => {
    const totalAbundance = isotopes.reduce((sum, isotope) => sum + isotope.abundance, 0);
    
    if (Math.abs(totalAbundance - 100) > 0.001) {
      setError('Total abundance must equal 100%');
      return;
    }

    const contributions = isotopes.map(isotope => ({
      mass: isotope.mass,
      contribution: (isotope.mass * isotope.abundance) / 100
    }));

    const averageMass = contributions.reduce((sum, { contribution }) => sum + contribution, 0);

    setResult({ averageMass, contributions });
    setError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Scale className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Average Atomic Mass Calculator</h2>
          <p className="text-gray-600">Calculate weighted average mass from isotopic composition</p>
        </div>
      </div>

      <div className="space-y-6">
        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {isotopes.map((isotope, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Isotope Mass (amu)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={isotope.mass || ''}
                  onChange={(e) => updateIsotope(index, 'mass', parseFloat(e.target.value))}
                  placeholder="Enter mass"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Natural Abundance (%)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={isotope.abundance || ''}
                    onChange={(e) => updateIsotope(index, 'abundance', parseFloat(e.target.value))}
                    placeholder="Enter abundance"
                  />
                  {isotopes.length > 1 && (
                    <button
                      onClick={() => removeIsotope(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Remove isotope"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
            onClick={addIsotope}
          >
            <Plus className="w-4 h-4" />
            <span>Add Isotope</span>
          </button>
          <button
            className="flex-1 btn bg-indigo-600 hover:bg-indigo-700"
            onClick={calculateAverageMass}
          >
            Calculate Average Mass
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Average Atomic Mass</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.averageMass.toFixed(4)} amu
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Mass Contributions</h3>
              <div className="space-y-2">
                {result.contributions.map((contribution, index) => (
                  <div key={index} className="flex justify-between text-gray-600">
                    <span>Mass {contribution.mass} amu</span>
                    <span>{contribution.contribution.toFixed(4)} amu</span>
                  </div>
                ))}
              </div>
            </div>

            <ShareResults
              title="Average Atomic Mass Results"
              text={`Average Atomic Mass Calculation:
• Average Mass: ${result.averageMass.toFixed(4)} amu
• Number of Isotopes: ${isotopes.length}
${result.contributions.map(c => `• Mass ${c.mass} amu contributes ${c.contribution.toFixed(4)} amu`).join('\n')}

Calculate average atomic mass at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}