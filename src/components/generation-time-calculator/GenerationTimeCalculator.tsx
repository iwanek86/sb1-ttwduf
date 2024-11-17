import React, { useState } from 'react';
import { Clock, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface GenerationTimeCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface GrowthResult {
  generationTime: number;
  growthRate: number;
  doublings: number;
  finalPopulation: number;
  growthPhase: string;
}

export function GenerationTimeCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-teal-50 to-emerald-50',
    secondaryColor: 'text-teal-600',
    accentColor: 'bg-teal-100'
  }
}: GenerationTimeCalculatorProps) {
  const [initialCount, setInitialCount] = useState('');
  const [finalCount, setFinalCount] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [timeUnit, setTimeUnit] = useState('hours');
  const [error, setError] = useState('');
  const [result, setResult] = useState<GrowthResult | null>(null);

  const calculateGrowth = () => {
    setError('');
    setResult(null);

    try {
      const n0 = parseFloat(initialCount);
      const n = parseFloat(finalCount);
      const t = parseFloat(timeInterval);

      if (isNaN(n0) || isNaN(n) || isNaN(t)) {
        setError('Please fill in all required fields');
        return;
      }

      if (n0 <= 0 || n <= 0) {
        setError('Population counts must be greater than zero');
        return;
      }

      if (t <= 0) {
        setError('Time interval must be greater than zero');
        return;
      }

      // Calculate number of generations (doublings)
      const doublings = Math.log2(n / n0);

      // Calculate generation time
      const generationTime = t / doublings;

      // Calculate specific growth rate (μ)
      const growthRate = Math.log(2) / generationTime;

      // Determine growth phase based on rate
      let growthPhase = '';
      if (growthRate <= 0.1) {
        growthPhase = 'Lag Phase';
      } else if (growthRate > 0.1 && growthRate <= 0.5) {
        growthPhase = 'Early Exponential';
      } else if (growthRate > 0.5 && growthRate <= 1.0) {
        growthPhase = 'Mid Exponential';
      } else if (growthRate > 1.0) {
        growthPhase = 'Late Exponential';
      }

      setResult({
        generationTime,
        growthRate,
        doublings,
        finalPopulation: n,
        growthPhase
      });
    } catch (err) {
      setError('Invalid input values');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Clock className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Generation Time Calculator</h2>
          <p className="text-gray-600">Calculate bacterial growth rates and doubling times</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Population (N₀)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={initialCount}
              onChange={(e) => setInitialCount(e.target.value)}
              placeholder="Enter initial count"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Population (N)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={finalCount}
              onChange={(e) => setFinalCount(e.target.value)}
              placeholder="Enter final count"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Interval
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={timeInterval}
              onChange={(e) => setTimeInterval(e.target.value)}
              placeholder="Enter time interval"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Unit
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-teal-600 hover:bg-teal-700"
          onClick={calculateGrowth}
        >
          Calculate Growth
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Generation Time</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.generationTime.toFixed(2)} {timeUnit}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Growth Rate (μ)</h3>
                <p className="text-gray-600">{result.growthRate.toFixed(3)} per {timeUnit}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Number of Doublings</h3>
                <p className="text-gray-600">{result.doublings.toFixed(2)}</p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Growth Phase Analysis</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Current Phase: {result.growthPhase}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full"
                    style={{ width: `${(result.growthRate / 1.5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <ShareResults
              title="Generation Time Calculator Results"
              text={`Bacterial Growth Analysis:
• Generation Time: ${result.generationTime.toFixed(2)} ${timeUnit}
• Growth Rate (μ): ${result.growthRate.toFixed(3)} per ${timeUnit}
• Number of Doublings: ${result.doublings.toFixed(2)}
• Growth Phase: ${result.growthPhase}

Calculate bacterial growth rates at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}