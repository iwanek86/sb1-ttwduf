import React, { useState } from 'react';
import { Atom, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface AtomCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface AtomicProperties {
  atomicNumber: number;
  massNumber: number;
  neutrons: number;
  electronConfiguration: string;
  valenceElectrons: number;
  shellConfiguration: string[];
}

const elements = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, massNumber: 1 },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, massNumber: 4 },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, massNumber: 7 },
  // Add more elements as needed
];

export function AtomCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-purple-50 to-blue-50',
    secondaryColor: 'text-purple-600',
    accentColor: 'bg-purple-100'
  }
}: AtomCalculatorProps) {
  const [element, setElement] = useState('');
  const [massNumber, setMassNumber] = useState('');
  const [result, setResult] = useState<AtomicProperties | null>(null);

  const calculateElectronConfiguration = (atomicNumber: number): string => {
    // Simplified electron configuration calculation
    const shells = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s'];
    let electrons = atomicNumber;
    let configuration = [];
    
    for (const shell of shells) {
      const maxElectrons = shell.includes('s') ? 2 : shell.includes('p') ? 6 : 10;
      if (electrons === 0) break;
      const shellElectrons = Math.min(electrons, maxElectrons);
      configuration.push(`${shell}${shellElectrons}`);
      electrons -= shellElectrons;
    }
    
    return configuration.join(' ');
  };

  const calculateProperties = () => {
    const selectedElement = elements.find(e => e.symbol === element);
    if (!selectedElement) return;

    const mass = parseInt(massNumber) || selectedElement.massNumber;
    const atomicNumber = selectedElement.atomicNumber;
    const neutrons = mass - atomicNumber;
    const electronConfig = calculateElectronConfiguration(atomicNumber);
    
    // Calculate valence electrons (simplified)
    const valence = atomicNumber % 8 === 0 ? 8 : atomicNumber % 8;
    
    // Calculate shell configuration
    const shells = electronConfig.split(' ').map(shell => {
      const [orbital, electrons] = shell.split(/([0-9]+)/);
      return `${orbital}: ${electrons} electrons`;
    });

    setResult({
      atomicNumber,
      massNumber: mass,
      neutrons,
      electronConfiguration: electronConfig,
      valenceElectrons: valence,
      shellConfiguration: shells
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Atom className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Atomic Structure Calculator</h2>
          <p className="text-gray-600">Calculate atomic properties and electron configuration</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Element Symbol
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={element}
              onChange={(e) => setElement(e.target.value)}
            >
              <option value="">Select an element</option>
              {elements.map(e => (
                <option key={e.symbol} value={e.symbol}>
                  {e.symbol} - {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mass Number (optional)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={massNumber}
              onChange={(e) => setMassNumber(e.target.value)}
              placeholder="Default mass number will be used"
            />
          </div>
        </div>

        <button
          className="btn w-full bg-purple-600 hover:bg-purple-700"
          onClick={calculateProperties}
          disabled={!element}
        >
          Calculate Properties
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Basic Properties</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Atomic Number</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.atomicNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mass Number</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.massNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Neutrons</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.neutrons}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valence Electrons</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.valenceElectrons}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Electron Configuration</h3>
              <p className="text-gray-600 font-mono">{result.electronConfiguration}</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Shell Configuration</h3>
              <div className="space-y-2">
                {result.shellConfiguration.map((shell, index) => (
                  <p key={index} className="text-gray-600">{shell}</p>
                ))}
              </div>
            </div>

            <ShareResults
              title="Atom Calculator Results"
              text={`Atomic Properties for ${element}:
• Atomic Number: ${result.atomicNumber}
• Mass Number: ${result.massNumber}
• Neutrons: ${result.neutrons}
• Valence Electrons: ${result.valenceElectrons}
• Electron Configuration: ${result.electronConfiguration}

Calculate atomic properties at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}