import React, { useState } from 'react';
import { Link2, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface BondOrderCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface BondResult {
  bondOrder: number;
  bondType: string;
  bondStrength: string;
  bondLength: string;
  bondEnergy: number;
}

export function BondOrderCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-cyan-50 to-blue-50',
    secondaryColor: 'text-cyan-600',
    accentColor: 'bg-cyan-100'
  }
}: BondOrderCalculatorProps) {
  const [bondingElectrons, setBondingElectrons] = useState('');
  const [antibondingElectrons, setAntibondingElectrons] = useState('');
  const [result, setResult] = useState<BondResult | null>(null);

  const calculateBondOrder = () => {
    const bonding = parseInt(bondingElectrons);
    const antibonding = parseInt(antibondingElectrons);

    if (isNaN(bonding) || isNaN(antibonding)) {
      return;
    }

    const bondOrder = (bonding - antibonding) / 2;

    let bondType = '';
    let bondStrength = '';
    let bondLength = '';
    let bondEnergy = 0;

    if (bondOrder <= 0) {
      bondType = 'No bond';
      bondStrength = 'None';
      bondLength = 'N/A';
      bondEnergy = 0;
    } else if (bondOrder <= 1) {
      bondType = 'Single bond';
      bondStrength = bondOrder === 1 ? 'Normal' : 'Weak';
      bondLength = 'Long';
      bondEnergy = bondOrder * 100; // Simplified energy calculation
    } else if (bondOrder <= 2) {
      bondType = 'Double bond';
      bondStrength = 'Strong';
      bondLength = 'Medium';
      bondEnergy = bondOrder * 150;
    } else {
      bondType = 'Triple bond';
      bondStrength = 'Very strong';
      bondLength = 'Short';
      bondEnergy = bondOrder * 200;
    }

    setResult({
      bondOrder,
      bondType,
      bondStrength,
      bondLength,
      bondEnergy
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Link2 className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bond Order Calculator</h2>
          <p className="text-gray-600">Calculate molecular bond order and properties</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bonding Electrons
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={bondingElectrons}
              onChange={(e) => setBondingElectrons(e.target.value)}
              placeholder="Enter number of bonding electrons"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Antibonding Electrons
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={antibondingElectrons}
              onChange={(e) => setAntibondingElectrons(e.target.value)}
              placeholder="Enter number of antibonding electrons"
            />
          </div>
        </div>

        <button
          className="btn w-full bg-cyan-600 hover:bg-cyan-700"
          onClick={calculateBondOrder}
        >
          Calculate Bond Order
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Bond Order</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.bondOrder.toFixed(1)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Bond Type</h3>
                <p className="text-gray-600">{result.bondType}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Bond Strength</h3>
                <p className="text-gray-600">{result.bondStrength}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Bond Length</h3>
                <p className="text-gray-600">{result.bondLength}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Bond Energy</h3>
                <p className="text-gray-600">{result.bondEnergy} kJ/mol</p>
              </div>
            </div>

            <ShareResults
              title="Bond Order Calculator Results"
              text={`Bond Order Analysis:
• Bond Order: ${result.bondOrder.toFixed(1)}
• Bond Type: ${result.bondType}
• Bond Strength: ${result.bondStrength}
• Bond Length: ${result.bondLength}
• Bond Energy: ${result.bondEnergy} kJ/mol

Calculate bond orders at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}