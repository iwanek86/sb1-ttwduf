import React, { useState } from 'react';
import { FileText, ArrowDownUp, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface ChemicalNameCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface ConversionResult {
  name: string;
  formula: string;
  type: string;
  alternateNames?: string[];
}

const commonCompounds = {
  'H2O': { name: 'Water', type: 'Molecular compound', alternateNames: ['Dihydrogen monoxide'] },
  'NaCl': { name: 'Sodium chloride', type: 'Ionic compound', alternateNames: ['Table salt', 'Halite'] },
  'CO2': { name: 'Carbon dioxide', type: 'Molecular compound' },
  'NH3': { name: 'Ammonia', type: 'Molecular compound' },
  'CH3COOH': { name: 'Acetic acid', type: 'Organic acid', alternateNames: ['Ethanoic acid'] },
  // Add more compounds as needed
};

export function ChemicalNameCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-emerald-50 to-teal-50',
    secondaryColor: 'text-emerald-600',
    accentColor: 'bg-emerald-100'
  }
}: ChemicalNameCalculatorProps) {
  const [input, setInput] = useState('');
  const [conversionType, setConversionType] = useState<'nameToFormula' | 'formulaToName'>('nameToFormula');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleConversion = () => {
    setError('');
    setResult(null);

    if (!input.trim()) {
      setError('Please enter a chemical name or formula');
      return;
    }

    // For demonstration, we'll use the commonCompounds dictionary
    // In a real implementation, this would use a more comprehensive database
    // and actual conversion logic
    if (conversionType === 'formulaToName') {
      const compound = commonCompounds[input.toUpperCase()];
      if (compound) {
        setResult({
          name: compound.name,
          formula: input.toUpperCase(),
          type: compound.type,
          alternateNames: compound.alternateNames
        });
      } else {
        setError('Formula not found in database');
      }
    } else {
      const compound = Object.entries(commonCompounds).find(
        ([_, value]) => value.name.toLowerCase() === input.toLowerCase()
      );
      if (compound) {
        setResult({
          name: compound[1].name,
          formula: compound[0],
          type: compound[1].type,
          alternateNames: compound[1].alternateNames
        });
      } else {
        setError('Chemical name not found in database');
      }
    }
  };

  const toggleConversionType = () => {
    setConversionType(prev => prev === 'nameToFormula' ? 'formulaToName' : 'nameToFormula');
    setInput('');
    setResult(null);
    setError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <FileText className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chemical Name Calculator</h2>
          <p className="text-gray-600">Convert between chemical names and formulas</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {conversionType === 'nameToFormula' ? 'Name → Formula' : 'Formula → Name'}
          </span>
          <button
            onClick={toggleConversionType}
            className={`p-2 rounded-lg ${customStyles.accentColor} ${customStyles.secondaryColor}`}
            title="Switch conversion direction"
          >
            <ArrowDownUp className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter {conversionType === 'nameToFormula' ? 'Chemical Name' : 'Chemical Formula'}
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={conversionType === 'nameToFormula' ? 'e.g., Water' : 'e.g., H2O'}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={handleConversion}
        >
          Convert
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Chemical Name</h3>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Chemical Formula</h3>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.formula}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Compound Type</h3>
                <p className="text-gray-600">{result.type}</p>
              </div>
              {result.alternateNames && result.alternateNames.length > 0 && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Alternative Names</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {result.alternateNames.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <ShareResults
              title="Chemical Name Conversion Results"
              text={`Chemical Compound Information:
• Name: ${result.name}
• Formula: ${result.formula}
• Type: ${result.type}
${result.alternateNames ? `• Alternative Names: ${result.alternateNames.join(', ')}` : ''}

Convert chemical names and formulas at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}