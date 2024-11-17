import React, { useState } from 'react';
import { Beaker, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface MolarityCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface CalculationResult {
  molarity: number;
  moles?: number;
  volume?: number;
  dilutionResult?: {
    finalVolume: number;
    finalMolarity: number;
  };
}

export function MolarityCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-orange-50 to-amber-50',
    secondaryColor: 'text-orange-600',
    accentColor: 'bg-orange-100'
  }
}: MolarityCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'molarity' | 'dilution'>('molarity');
  const [moles, setMoles] = useState<string>('');
  const [volume, setVolume] = useState<string>('');
  const [initialMolarity, setInitialMolarity] = useState<string>('');
  const [initialVolume, setInitialVolume] = useState<string>('');
  const [finalVolume, setFinalVolume] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateMolarity = () => {
    if (calculationType === 'molarity') {
      const molesValue = parseFloat(moles);
      const volumeValue = parseFloat(volume);
      
      if (molesValue && volumeValue) {
        const molarity = molesValue / volumeValue;
        setResult({
          molarity,
          moles: molesValue,
          volume: volumeValue
        });
      }
    } else {
      const M1 = parseFloat(initialMolarity);
      const V1 = parseFloat(initialVolume);
      const V2 = parseFloat(finalVolume);
      
      if (M1 && V1 && V2) {
        const M2 = (M1 * V1) / V2;
        setResult({
          molarity: M1,
          dilutionResult: {
            finalVolume: V2,
            finalMolarity: M2
          }
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Beaker className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Molarity Calculator</h2>
          <p className="text-gray-600">Calculate solution concentration and perform dilutions</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Type
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value as 'molarity' | 'dilution')}
          >
            <option value="molarity">Calculate Molarity</option>
            <option value="dilution">Dilution (M₁V₁ = M₂V₂)</option>
          </select>
        </div>

        {calculationType === 'molarity' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moles of Solute
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={moles}
                onChange={(e) => setMoles(e.target.value)}
                placeholder="Enter moles"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volume (L)
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Enter volume in liters"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Molarity (M₁)
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={initialMolarity}
                onChange={(e) => setInitialMolarity(e.target.value)}
                placeholder="Enter initial molarity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Volume (V₁) in L
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={initialVolume}
                onChange={(e) => setInitialVolume(e.target.value)}
                placeholder="Enter initial volume"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Final Volume (V₂) in L
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={finalVolume}
                onChange={(e) => setFinalVolume(e.target.value)}
                placeholder="Enter final volume"
              />
            </div>
          </div>
        )}

        <button
          className="btn w-full bg-orange-600 hover:bg-orange-700"
          onClick={calculateMolarity}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              {calculationType === 'molarity' ? (
                <>
                  <h3 className="font-medium text-gray-900 mb-2">Molarity</h3>
                  <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                    {result.molarity.toFixed(3)} M
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-medium text-gray-900 mb-2">Final Molarity (M₂)</h3>
                  <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                    {result.dilutionResult?.finalMolarity.toFixed(3)} M
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calculationType === 'molarity' ? (
                <>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Moles of Solute</h3>
                    <p className="text-gray-600">{result.moles?.toFixed(3)} mol</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Solution Volume</h3>
                    <p className="text-gray-600">{result.volume?.toFixed(3)} L</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Initial Conditions</h3>
                    <p className="text-gray-600">M₁ = {result.molarity.toFixed(3)} M</p>
                    <p className="text-gray-600">V₁ = {initialVolume} L</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Final Conditions</h3>
                    <p className="text-gray-600">M₂ = {result.dilutionResult?.finalMolarity.toFixed(3)} M</p>
                    <p className="text-gray-600">V₂ = {result.dilutionResult?.finalVolume} L</p>
                  </div>
                </>
              )}
            </div>

            <ShareResults
              title="Molarity Calculator Results"
              text={calculationType === 'molarity' ? 
                `Molarity Calculation Results:
• Molarity: ${result.molarity.toFixed(3)} M
• Moles of Solute: ${result.moles?.toFixed(3)} mol
• Solution Volume: ${result.volume?.toFixed(3)} L` :
                `Dilution Calculation Results:
• Initial Molarity (M₁): ${result.molarity.toFixed(3)} M
• Initial Volume (V₁): ${initialVolume} L
• Final Molarity (M₂): ${result.dilutionResult?.finalMolarity.toFixed(3)} M
• Final Volume (V₂): ${result.dilutionResult?.finalVolume} L`}
            />
          </div>
        )}
      </div>
    </div>
  );
}