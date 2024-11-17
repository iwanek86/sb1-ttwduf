import React, { useState } from 'react';
import { Calculator, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface AnnealingTemperatureCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface PrimerAnalysis {
  tm: number;
  gc: number;
  length: number;
  annealingTemp: number;
  optimalRange: {
    min: number;
    max: number;
  };
}

export function AnnealingTemperatureCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-purple-50 to-blue-50',
    secondaryColor: 'text-purple-600',
    accentColor: 'bg-purple-100'
  }
}: AnnealingTemperatureCalculatorProps) {
  const [forwardPrimer, setForwardPrimer] = useState('');
  const [reversePrimer, setReversePrimer] = useState('');
  const [saltConc, setSaltConc] = useState('50');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    forward: PrimerAnalysis;
    reverse: PrimerAnalysis;
    recommended: number;
  } | null>(null);

  const validateSequence = (seq: string): boolean => {
    return /^[ATCGatcg]+$/.test(seq);
  };

  const calculateGC = (seq: string): number => {
    const gc = (seq.match(/[GCgc]/g) || []).length;
    return (gc / seq.length) * 100;
  };

  const calculateTm = (seq: string, salt: number): number => {
    const gc = calculateGC(seq);
    // Basic nearest-neighbor method with salt correction
    const tmBasic = 2 * (seq.match(/[ATat]/g) || []).length * 2 + 
                   4 * (seq.match(/[GCgc]/g) || []).length;
    const saltCorrection = 16.6 * Math.log10(salt / 1000);
    return tmBasic + saltCorrection;
  };

  const calculateAnnealing = () => {
    setError('');
    setResult(null);

    if (!forwardPrimer || !reversePrimer) {
      setError('Please enter both primer sequences');
      return;
    }

    if (!validateSequence(forwardPrimer) || !validateSequence(reversePrimer)) {
      setError('Invalid sequence. Use only A, T, C, G bases');
      return;
    }

    const salt = parseFloat(saltConc);
    if (isNaN(salt) || salt <= 0) {
      setError('Invalid salt concentration');
      return;
    }

    const forwardAnalysis = {
      tm: calculateTm(forwardPrimer, salt),
      gc: calculateGC(forwardPrimer),
      length: forwardPrimer.length,
      annealingTemp: 0,
      optimalRange: { min: 0, max: 0 }
    };

    const reverseAnalysis = {
      tm: calculateTm(reversePrimer, salt),
      gc: calculateGC(reversePrimer),
      length: reversePrimer.length,
      annealingTemp: 0,
      optimalRange: { min: 0, max: 0 }
    };

    // Calculate annealing temperatures (typically 5°C below Tm)
    forwardAnalysis.annealingTemp = forwardAnalysis.tm - 5;
    reverseAnalysis.annealingTemp = reverseAnalysis.tm - 5;

    // Calculate optimal ranges
    forwardAnalysis.optimalRange = {
      min: forwardAnalysis.annealingTemp - 2,
      max: forwardAnalysis.annealingTemp + 2
    };
    reverseAnalysis.optimalRange = {
      min: reverseAnalysis.annealingTemp - 2,
      max: reverseAnalysis.annealingTemp + 2
    };

    // Recommended annealing temperature
    const recommended = Math.min(
      forwardAnalysis.annealingTemp,
      reverseAnalysis.annealingTemp
    );

    setResult({
      forward: forwardAnalysis,
      reverse: reverseAnalysis,
      recommended
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Calculator className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Annealing Temperature Calculator</h2>
          <p className="text-gray-600">Calculate optimal PCR primer annealing temperatures</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forward Primer (5' → 3')
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={forwardPrimer}
            onChange={(e) => setForwardPrimer(e.target.value.toUpperCase())}
            placeholder="Enter sequence (A, T, C, G only)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reverse Primer (5' → 3')
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={reversePrimer}
            onChange={(e) => setReversePrimer(e.target.value.toUpperCase())}
            placeholder="Enter sequence (A, T, C, G only)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salt Concentration (mM)
          </label>
          <input
            type="number"
            step="1"
            min="0"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={saltConc}
            onChange={(e) => setSaltConc(e.target.value)}
            placeholder="Enter salt concentration"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-purple-600 hover:bg-purple-700"
          onClick={calculateAnnealing}
        >
          Calculate Temperature
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Recommended Annealing Temperature</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.recommended.toFixed(1)}°C
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Forward Primer</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Tm: {result.forward.tm.toFixed(1)}°C</p>
                  <p className="text-gray-600">GC Content: {result.forward.gc.toFixed(1)}%</p>
                  <p className="text-gray-600">Length: {result.forward.length} bp</p>
                  <p className="text-gray-600">
                    Range: {result.forward.optimalRange.min.toFixed(1)} - {result.forward.optimalRange.max.toFixed(1)}°C
                  </p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Reverse Primer</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Tm: {result.reverse.tm.toFixed(1)}°C</p>
                  <p className="text-gray-600">GC Content: {result.reverse.gc.toFixed(1)}%</p>
                  <p className="text-gray-600">Length: {result.reverse.length} bp</p>
                  <p className="text-gray-600">
                    Range: {result.reverse.optimalRange.min.toFixed(1)} - {result.reverse.optimalRange.max.toFixed(1)}°C
                  </p>
                </div>
              </div>
            </div>

            <ShareResults
              title="Annealing Temperature Calculator Results"
              text={`PCR Primer Analysis:
• Recommended Annealing Temperature: ${result.recommended.toFixed(1)}°C

Forward Primer:
• Tm: ${result.forward.tm.toFixed(1)}°C
• GC Content: ${result.forward.gc.toFixed(1)}%
• Length: ${result.forward.length} bp
• Optimal Range: ${result.forward.optimalRange.min.toFixed(1)} - ${result.forward.optimalRange.max.toFixed(1)}°C

Reverse Primer:
• Tm: ${result.reverse.tm.toFixed(1)}°C
• GC Content: ${result.reverse.gc.toFixed(1)}%
• Length: ${result.reverse.length} bp
• Optimal Range: ${result.reverse.optimalRange.min.toFixed(1)} - ${result.reverse.optimalRange.max.toFixed(1)}°C

Calculate annealing temperatures at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}