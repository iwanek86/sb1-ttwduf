import React, { useState } from 'react';
import { Users, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface PopulationGrowthCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface GrowthResult {
  finalPopulation: number;
  growthRate: number;
  timeToDouble: number;
  carryingCapacity?: number;
  projections: {
    time: number;
    population: number;
  }[];
  model: string;
}

export function PopulationGrowthCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-green-50 to-emerald-50',
    secondaryColor: 'text-green-600',
    accentColor: 'bg-green-100'
  }
}: PopulationGrowthCalculatorProps) {
  const [initialPopulation, setInitialPopulation] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [timeSpan, setTimeSpan] = useState('');
  const [carryingCapacity, setCarryingCapacity] = useState('');
  const [growthModel, setGrowthModel] = useState<'exponential' | 'logistic'>('exponential');
  const [error, setError] = useState('');
  const [result, setResult] = useState<GrowthResult | null>(null);

  const calculateExponentialGrowth = (
    N0: number,
    r: number,
    t: number,
    intervals: number = 10
  ): number[] => {
    const populations: number[] = [];
    for (let i = 0; i <= intervals; i++) {
      const currentTime = (t / intervals) * i;
      populations.push(N0 * Math.exp(r * currentTime));
    }
    return populations;
  };

  const calculateLogisticGrowth = (
    N0: number,
    r: number,
    t: number,
    K: number,
    intervals: number = 10
  ): number[] => {
    const populations: number[] = [];
    for (let i = 0; i <= intervals; i++) {
      const currentTime = (t / intervals) * i;
      populations.push(
        (K * N0 * Math.exp(r * currentTime)) /
        (K + N0 * (Math.exp(r * currentTime) - 1))
      );
    }
    return populations;
  };

  const calculateGrowth = () => {
    setError('');
    setResult(null);

    try {
      const N0 = parseFloat(initialPopulation);
      const r = parseFloat(growthRate) / 100; // Convert percentage to decimal
      const t = parseFloat(timeSpan);
      const K = carryingCapacity ? parseFloat(carryingCapacity) : undefined;

      if (isNaN(N0) || isNaN(r) || isNaN(t)) {
        setError('Please fill in all required fields');
        return;
      }

      if (growthModel === 'logistic' && !K) {
        setError('Carrying capacity is required for logistic growth');
        return;
      }

      const timePoints = Array.from({ length: 11 }, (_, i) => i * (t / 10));
      let populations: number[];
      let finalPopulation: number;

      if (growthModel === 'exponential') {
        populations = calculateExponentialGrowth(N0, r, t);
        finalPopulation = populations[populations.length - 1];
      } else {
        if (!K) return;
        populations = calculateLogisticGrowth(N0, r, t, K);
        finalPopulation = populations[populations.length - 1];
      }

      const timeToDouble = Math.log(2) / r;
      
      const projections = timePoints.map((time, index) => ({
        time,
        population: populations[index]
      }));

      setResult({
        finalPopulation,
        growthRate: r * 100,
        timeToDouble,
        carryingCapacity: K,
        projections,
        model: growthModel
      });
    } catch (err) {
      setError('Invalid input values');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Users className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Population Growth Calculator</h2>
          <p className="text-gray-600">Calculate and project population dynamics</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Growth Model
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={growthModel}
            onChange={(e) => setGrowthModel(e.target.value as 'exponential' | 'logistic')}
          >
            <option value="exponential">Exponential Growth</option>
            <option value="logistic">Logistic Growth</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Population
            </label>
            <input
              type="number"
              min="0"
              step="1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={initialPopulation}
              onChange={(e) => setInitialPopulation(e.target.value)}
              placeholder="Enter initial size"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Growth Rate (% per time unit)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              placeholder="Enter growth rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Span
            </label>
            <input
              type="number"
              min="0"
              step="1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={timeSpan}
              onChange={(e) => setTimeSpan(e.target.value)}
              placeholder="Enter time span"
            />
          </div>
          {growthModel === 'logistic' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Carrying Capacity
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={carryingCapacity}
                onChange={(e) => setCarryingCapacity(e.target.value)}
                placeholder="Enter carrying capacity"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-green-600 hover:bg-green-700"
          onClick={calculateGrowth}
        >
          Calculate Growth
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Final Population</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {Math.round(result.finalPopulation).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Using {result.model} growth model
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Growth Rate</h3>
                <p className="text-gray-600">{result.growthRate.toFixed(2)}% per time unit</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Time to Double</h3>
                <p className="text-gray-600">{result.timeToDouble.toFixed(2)} time units</p>
              </div>
              {result.carryingCapacity && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Carrying Capacity</h3>
                  <p className="text-gray-600">{result.carryingCapacity.toLocaleString()}</p>
                </div>
              )}
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Population Projections</h3>
              <div className="space-y-2">
                {result.projections.map((point, index) => (
                  <div key={index} className="flex justify-between text-gray-600">
                    <span>Time {point.time.toFixed(1)}</span>
                    <span>{Math.round(point.population).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <ShareResults
              title="Population Growth Calculator Results"
              text={`Population Growth Analysis:
• Model: ${result.model} growth
• Initial Population: ${parseInt(initialPopulation).toLocaleString()}
• Final Population: ${Math.round(result.finalPopulation).toLocaleString()}
• Growth Rate: ${result.growthRate.toFixed(2)}% per time unit
• Time to Double: ${result.timeToDouble.toFixed(2)} time units
${result.carryingCapacity ? `• Carrying Capacity: ${result.carryingCapacity.toLocaleString()}` : ''}

Calculate population growth at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}