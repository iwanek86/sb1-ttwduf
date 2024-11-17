import React, { useState } from 'react';
import { Atom, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface EffectiveNuclearChargeCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface ElectronGroup {
  shell: string;
  electrons: number;
  shieldingValue: number;
}

const electronGroups: ElectronGroup[] = [
  { shell: '1s', electrons: 2, shieldingValue: 0.30 },
  { shell: '2s/2p', electrons: 8, shieldingValue: 0.35 },
  { shell: '3s/3p', electrons: 8, shieldingValue: 0.85 },
  { shell: '3d', electrons: 10, shieldingValue: 1.00 },
  { shell: '4s/4p', electrons: 8, shieldingValue: 1.00 },
  { shell: '4d', electrons: 10, shieldingValue: 1.00 },
  { shell: '4f', electrons: 14, shieldingValue: 1.00 },
];

export function EffectiveNuclearChargeCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-violet-50 to-purple-50',
    secondaryColor: 'text-violet-600',
    accentColor: 'bg-violet-100'
  }
}: EffectiveNuclearChargeCalculatorProps) {
  const [atomicNumber, setAtomicNumber] = useState<number>(0);
  const [electronShell, setElectronShell] = useState<string>('');
  const [result, setResult] = useState<{
    Zeff: number;
    shieldingConstant: number;
    shellDetails: string;
  } | null>(null);

  const calculateShielding = () => {
    if (!atomicNumber || !electronShell) return;

    let shieldingConstant = 0;
    let targetGroupIndex = electronGroups.findIndex(g => g.shell.includes(electronShell));
    
    if (targetGroupIndex === -1) return;

    // Calculate shielding from inner shells
    for (let i = 0; i < targetGroupIndex; i++) {
      shieldingConstant += electronGroups[i].electrons * electronGroups[i].shieldingValue;
    }

    // Calculate shielding from same shell
    const sameShellGroup = electronGroups[targetGroupIndex];
    shieldingConstant += (sameShellGroup.electrons - 1) * sameShellGroup.shieldingValue;

    const Zeff = atomicNumber - shieldingConstant;
    
    setResult({
      Zeff: parseFloat(Zeff.toFixed(2)),
      shieldingConstant: parseFloat(shieldingConstant.toFixed(2)),
      shellDetails: `Electron in ${electronShell} orbital`
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Atom className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Effective Nuclear Charge Calculator</h2>
          <p className="text-gray-600">Calculate Zeff using Slater's rules</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Atomic Number (Z)
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={atomicNumber || ''}
              onChange={(e) => setAtomicNumber(parseInt(e.target.value))}
              placeholder="Enter atomic number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electron Shell
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={electronShell}
              onChange={(e) => setElectronShell(e.target.value)}
            >
              <option value="">Select shell</option>
              {electronGroups.map((group) => (
                <option key={group.shell} value={group.shell}>
                  {group.shell}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn w-full bg-violet-600 hover:bg-violet-700"
          onClick={calculateShielding}
          disabled={!atomicNumber || !electronShell}
        >
          Calculate Zeff
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Effective Nuclear Charge (Zeff)</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.Zeff}
              </p>
              <p className="text-sm text-gray-600 mt-1">{result.shellDetails}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Shielding Constant (S)</h3>
                <p className="text-gray-600">{result.shieldingConstant}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Calculation</h3>
                <p className="text-gray-600">
                  Zeff = Z - S = {atomicNumber} - {result.shieldingConstant}
                </p>
              </div>
            </div>

            <ShareResults
              title="Effective Nuclear Charge Results"
              text={`Effective Nuclear Charge Calculation:
• Atomic Number (Z): ${atomicNumber}
• Electron Shell: ${electronShell}
• Zeff: ${result.Zeff}
• Shielding Constant: ${result.shieldingConstant}

Calculate effective nuclear charge at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}