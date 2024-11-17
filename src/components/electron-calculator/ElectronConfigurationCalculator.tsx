import React, { useState } from 'react';
import { Atom, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface ElectronConfigurationCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  configuration: string;
  nobleGasConfig: string;
  valenceElectrons: number;
}

const elements: Record<number, ElementData> = {
  1: { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, configuration: '1s¹', nobleGasConfig: '1s¹', valenceElectrons: 1 },
  2: { symbol: 'He', name: 'Helium', atomicNumber: 2, configuration: '1s²', nobleGasConfig: '1s²', valenceElectrons: 2 },
  3: { symbol: 'Li', name: 'Lithium', atomicNumber: 3, configuration: '1s²2s¹', nobleGasConfig: '[He]2s¹', valenceElectrons: 1 },
  // Add more elements as needed
};

export function ElectronConfigurationCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-amber-50 to-orange-50',
    secondaryColor: 'text-amber-600',
    accentColor: 'bg-amber-100'
  }
}: ElectronConfigurationCalculatorProps) {
  const [atomicNumber, setAtomicNumber] = useState<string>('');
  const [result, setResult] = useState<ElementData | null>(null);
  const [showOrbitalDiagram, setShowOrbitalDiagram] = useState(false);

  const generateOrbitalDiagram = (config: string): string[] => {
    // This is a simplified version - you would want to expand this
    // to show actual orbital diagrams with arrows for electrons
    return config.split(' ').map(orbital => {
      const [shell, electrons] = orbital.split(/([0-9]+)/);
      return `${shell}: ${'↑↓'.repeat(parseInt(electrons)/2)}`;
    });
  };

  const calculateConfiguration = () => {
    const number = parseInt(atomicNumber);
    if (number && elements[number]) {
      setResult(elements[number]);
    } else {
      alert('Please enter a valid atomic number');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Atom className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Electron Configuration Calculator</h2>
          <p className="text-gray-600">Calculate electron arrangements in atomic orbitals</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Atomic Number
          </label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={atomicNumber}
            onChange={(e) => setAtomicNumber(e.target.value)}
            placeholder="Enter atomic number"
          />
        </div>

        <button
          className="btn w-full bg-amber-600 hover:bg-amber-700"
          onClick={calculateConfiguration}
        >
          Calculate Configuration
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Element</h3>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.name} ({result.symbol})
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Atomic Number</h3>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.atomicNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Full Configuration</h3>
                <p className="text-gray-600 font-mono">{result.configuration}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Noble Gas Notation</h3>
                <p className="text-gray-600 font-mono">{result.nobleGasConfig}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Valence Electrons</h3>
                <p className="text-gray-600">{result.valenceElectrons}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                className={`px-4 py-2 rounded-lg ${customStyles.accentColor} ${customStyles.secondaryColor}`}
                onClick={() => setShowOrbitalDiagram(!showOrbitalDiagram)}
              >
                {showOrbitalDiagram ? 'Hide' : 'Show'} Orbital Diagram
              </button>
            </div>

            {showOrbitalDiagram && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Orbital Diagram</h3>
                <div className="space-y-2 font-mono">
                  {generateOrbitalDiagram(result.configuration).map((orbital, index) => (
                    <div key={index} className="text-gray-600">{orbital}</div>
                  ))}
                </div>
              </div>
            )}

            <ShareResults
              title="Electron Configuration Results"
              text={`Electron Configuration for ${result.name} (${result.symbol}):
• Atomic Number: ${result.atomicNumber}
• Full Configuration: ${result.configuration}
• Noble Gas Notation: ${result.nobleGasConfig}
• Valence Electrons: ${result.valenceElectrons}

Calculate electron configurations at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}