import React, { useState } from 'react';
import { Wind, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface OxygenConsumptionCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface ConsumptionResult {
  rq: number;
  oxygenConsumption: number;
  co2Production: number;
  substrateUtilization: {
    carbohydrates: number;
    fats: number;
    proteins: number;
  };
  metabolicRate: number;
}

export function OxygenConsumptionCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-blue-50 to-cyan-50',
    secondaryColor: 'text-blue-600',
    accentColor: 'bg-blue-100'
  }
}: OxygenConsumptionCalculatorProps) {
  const [oxygenIn, setOxygenIn] = useState('');
  const [oxygenOut, setOxygenOut] = useState('');
  const [co2In, setCo2In] = useState('');
  const [co2Out, setCo2Out] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ConsumptionResult | null>(null);

  const calculateConsumption = () => {
    setError('');
    setResult(null);

    try {
      const o2In = parseFloat(oxygenIn);
      const o2Out = parseFloat(oxygenOut);
      const co2i = parseFloat(co2In);
      const co2o = parseFloat(co2Out);
      const flow = parseFloat(flowRate);
      const temp = parseFloat(temperature);

      if ([o2In, o2Out, co2i, co2o, flow, temp].some(isNaN)) {
        setError('Please fill in all required fields');
        return;
      }

      // Calculate oxygen consumption and CO2 production
      const o2Consumption = (o2In - o2Out) * flow;
      const co2Production = (co2o - co2i) * flow;

      // Calculate RQ
      const rq = co2Production / o2Consumption;

      // Estimate substrate utilization based on RQ
      let carbs = 0, fats = 0, proteins = 0;

      if (rq >= 1.0) {
        carbs = 100;
      } else if (rq <= 0.7) {
        fats = 100;
      } else {
        // Linear interpolation between fat and carbohydrate metabolism
        carbs = ((rq - 0.7) / 0.3) * 100;
        fats = 100 - carbs;
      }

      // Adjust for protein metabolism (simplified model)
      if (rq > 0.7 && rq < 1.0) {
        proteins = 15; // Assume constant protein metabolism
        carbs *= 0.85;
        fats *= 0.85;
      }

      // Calculate metabolic rate (simplified)
      const metabolicRate = o2Consumption * 4.82; // kcal/L O2

      setResult({
        rq,
        oxygenConsumption: o2Consumption,
        co2Production,
        substrateUtilization: {
          carbohydrates: carbs,
          fats,
          proteins
        },
        metabolicRate
      });
    } catch (err) {
      setError('Invalid input values');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Wind className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Oxygen Consumption Calculator</h2>
          <p className="text-gray-600">Calculate RQ and analyze metabolic substrates</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              O₂ Input (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={oxygenIn}
              onChange={(e) => setOxygenIn(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              O₂ Output (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={oxygenOut}
              onChange={(e) => setOxygenOut(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CO₂ Input (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={co2In}
              onChange={(e) => setCo2In(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CO₂ Output (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={co2Out}
              onChange={(e) => setCo2Out(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flow Rate (L/min)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={flowRate}
              onChange={(e) => setFlowRate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperature (°C)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
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
          className="btn w-full bg-blue-600 hover:bg-blue-700"
          onClick={calculateConsumption}
        >
          Calculate Consumption
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Respiratory Quotient (RQ)</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.rq.toFixed(3)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">O₂ Consumption</h3>
                <p className="text-gray-600">{result.oxygenConsumption.toFixed(2)} L/min</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">CO₂ Production</h3>
                <p className="text-gray-600">{result.co2Production.toFixed(2)} L/min</p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Substrate Utilization</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Carbohydrates</span>
                    <span className="text-sm font-medium">{result.substrateUtilization.carbohydrates.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${result.substrateUtilization.carbohydrates}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Fats</span>
                    <span className="text-sm font-medium">{result.substrateUtilization.fats.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${result.substrateUtilization.fats}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Proteins</span>
                    <span className="text-sm font-medium">{result.substrateUtilization.proteins.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${result.substrateUtilization.proteins}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Metabolic Rate</h3>
              <p className="text-gray-600">{result.metabolicRate.toFixed(1)} kcal/min</p>
            </div>

            <ShareResults
              title="Oxygen Consumption Results"
              text={`Oxygen Consumption Analysis:
• Respiratory Quotient (RQ): ${result.rq.toFixed(3)}
• O₂ Consumption: ${result.oxygenConsumption.toFixed(2)} L/min
• CO₂ Production: ${result.co2Production.toFixed(2)} L/min
• Substrate Utilization:
  - Carbohydrates: ${result.substrateUtilization.carbohydrates.toFixed(1)}%
  - Fats: ${result.substrateUtilization.fats.toFixed(1)}%
  - Proteins: ${result.substrateUtilization.proteins.toFixed(1)}%
• Metabolic Rate: ${result.metabolicRate.toFixed(1)} kcal/min

Calculate oxygen consumption at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}