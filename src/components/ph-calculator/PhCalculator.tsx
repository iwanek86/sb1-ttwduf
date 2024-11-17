import React, { useState } from 'react';
import { Beaker, Calculator, Share2 } from 'lucide-react';

interface PhCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export function PhCalculator({ 
  theme = 'light',
  customStyles = {
    primaryColor: 'from-blue-50 to-purple-50',
    secondaryColor: 'text-blue-600',
    accentColor: 'bg-blue-100'
  }
}: PhCalculatorProps) {
  const [phValue, setPhValue] = useState<string>('');
  const [result, setResult] = useState<{
    type: string;
    hydrogenConcentration: number;
    hydroxideConcentration: number;
    pOH: number;
  } | null>(null);

  const calculatePh = () => {
    const ph = parseFloat(phValue);
    if (isNaN(ph) || ph < 0 || ph > 14) {
      alert('Please enter a valid pH value between 0 and 14');
      return;
    }

    const hydrogenConcentration = Math.pow(10, -ph);
    const pOH = 14 - ph;
    const hydroxideConcentration = Math.pow(10, -pOH);

    setResult({
      type: ph < 7 ? 'acidic' : ph > 7 ? 'basic' : 'neutral',
      hydrogenConcentration,
      hydroxideConcentration,
      pOH
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Beaker className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">pH Calculator</h2>
          <p className="text-gray-600">Calculate pH properties and concentrations</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="ph-value" className="block text-sm font-medium text-gray-700 mb-2">
            Enter pH Value (0-14)
          </label>
          <input
            type="number"
            id="ph-value"
            min="0"
            max="14"
            step="0.1"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={phValue}
            onChange={(e) => setPhValue(e.target.value)}
          />
        </div>

        <button
          className="btn w-full"
          onClick={calculatePh}
          disabled={!phValue}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Solution Type</h3>
              <p className={`text-lg font-semibold capitalize ${
                result.type === 'acidic' ? 'text-red-600' :
                result.type === 'basic' ? 'text-blue-600' :
                'text-green-600'
              }`}>
                {result.type}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">[H⁺] Concentration</h3>
                <p className="text-gray-600">{result.hydrogenConcentration.toExponential(4)} mol/L</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">[OH⁻] Concentration</h3>
                <p className="text-gray-600">{result.hydroxideConcentration.toExponential(4)} mol/L</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">pOH Value</h3>
                <p className="text-gray-600">{result.pOH.toFixed(2)}</p>
              </div>
            </div>

            <button
              className="flex items-center justify-center space-x-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={() => {
                const text = `pH Analysis Results:\npH: ${phValue}\nType: ${result.type}\n[H⁺]: ${result.hydrogenConcentration.toExponential(4)} mol/L\n[OH⁻]: ${result.hydroxideConcentration.toExponential(4)} mol/L\npOH: ${result.pOH.toFixed(2)}`;
                navigator.clipboard.writeText(text);
                alert('Results copied to clipboard!');
              }}
            >
              <Share2 className="w-4 h-4" />
              <span>Share Results</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}