import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TestTube, Share2 } from 'lucide-react';

export function PhCalculator() {
  const [phValue, setPhValue] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'ph-to-h' | 'h-to-ph'>('ph-to-h');
  const [result, setResult] = useState<{ h: number; poh: number } | null>(null);

  const calculateValues = () => {
    const ph = parseFloat(phValue);
    if (!isNaN(ph)) {
      const h = Math.pow(10, -ph);
      const poh = 14 - ph;
      setResult({ h, poh });
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/category/chemistry"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Chemistry Calculators
      </Link>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-purple-100 p-3 rounded-lg">
            <TestTube className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">pH Calculator</h1>
            <p className="text-gray-600 mt-2">Calculate pH, pOH, and [H+] concentration</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Type
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'ph-to-h' | 'h-to-ph')}
            >
              <option value="ph-to-h">pH to [H+]</option>
              <option value="h-to-ph">[H+] to pH</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {calculationType === 'ph-to-h' ? 'pH Value' : '[H+] Concentration (mol/L)'}
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={phValue}
              onChange={(e) => setPhValue(e.target.value)}
            />
          </div>

          <button
            className="btn w-full"
            onClick={calculateValues}
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">Results</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-900">
                    [H+] = {result.h.toExponential(4)} mol/L
                  </p>
                  <p className="text-gray-900">
                    pOH = {result.poh.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <button
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  const text = `pH Analysis Results:\npH: ${phValue}\n[H+]: ${result.h.toExponential(4)} mol/L\npOH: ${result.poh.toFixed(2)}`;
                  if (navigator.share) {
                    navigator.share({
                      title: 'pH Analysis Results',
                      text: text
                    });
                  } else {
                    navigator.clipboard.writeText(text);
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Results</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About pH Calculations</h2>
        <div className="prose prose-blue max-w-none">
          <ul className="space-y-2 text-gray-600">
            <li>pH scale ranges from 0 to 14</li>
            <li>pH below 7 is acidic, above 7 is basic, and 7 is neutral</li>
            <li>Each pH unit represents a tenfold change in H+ concentration</li>
            <li>pOH + pH = 14 in aqueous solutions at 25°C</li>
            <li>[H+] × [OH-] = 1.0 × 10^-14 at 25°C</li>
          </ul>
        </div>
      </div>
    </main>
  );
}