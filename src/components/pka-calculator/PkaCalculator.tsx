import React, { useState } from 'react';
import { Beaker, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface PkaCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface AcidData {
  name: string;
  pka: number;
  type: string;
  conjugateBase: string;
}

const commonAcids: Record<string, AcidData> = {
  'HCl': { name: 'Hydrochloric acid', pka: -6.3, type: 'Strong acid', conjugateBase: 'Cl⁻' },
  'H2SO4': { name: 'Sulfuric acid', pka: -3.0, type: 'Strong acid', conjugateBase: 'HSO₄⁻' },
  'CH3COOH': { name: 'Acetic acid', pka: 4.76, type: 'Weak acid', conjugateBase: 'CH₃COO⁻' },
  'H3PO4': { name: 'Phosphoric acid', pka: 2.12, type: 'Weak acid', conjugateBase: 'H₂PO₄⁻' },
  'HF': { name: 'Hydrofluoric acid', pka: 3.17, type: 'Weak acid', conjugateBase: 'F⁻' },
  // Add more acids as needed
};

export function PkaCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-sky-50 to-blue-50',
    secondaryColor: 'text-sky-600',
    accentColor: 'bg-sky-100'
  }
}: PkaCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'ka-to-pka' | 'pka-to-ka'>('ka-to-pka');
  const [kaValue, setKaValue] = useState<string>('');
  const [pkaValue, setPkaValue] = useState<string>('');
  const [selectedAcid, setSelectedAcid] = useState<string>('');
  const [result, setResult] = useState<{
    ka?: number;
    pka?: number;
    acidStrength: string;
    phRelationship: string;
    acidData?: AcidData;
  } | null>(null);

  const calculateValues = () => {
    let ka: number | undefined;
    let pka: number | undefined;
    let acidStrength: string;
    let phRelationship: string;
    let acidData: AcidData | undefined;

    if (selectedAcid) {
      acidData = commonAcids[selectedAcid];
      pka = acidData.pka;
      ka = Math.pow(10, -pka);
    } else if (calculationType === 'ka-to-pka') {
      ka = parseFloat(kaValue);
      pka = -Math.log10(ka);
    } else {
      pka = parseFloat(pkaValue);
      ka = Math.pow(10, -pka);
    }

    if (pka !== undefined) {
      if (pka < 0) {
        acidStrength = 'Very strong acid';
        phRelationship = 'pH will be very low in aqueous solution';
      } else if (pka < 4) {
        acidStrength = 'Strong acid';
        phRelationship = 'pH will be low in aqueous solution';
      } else if (pka < 7) {
        acidStrength = 'Moderate acid';
        phRelationship = 'pH will be moderately acidic in aqueous solution';
      } else {
        acidStrength = 'Weak acid';
        phRelationship = 'pH will be close to neutral in aqueous solution';
      }
    }

    setResult({
      ka,
      pka,
      acidStrength,
      phRelationship,
      acidData
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Beaker className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">pKa Calculator</h2>
          <p className="text-gray-600">Calculate acid dissociation constants</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Common Acids (Optional)
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            value={selectedAcid}
            onChange={(e) => {
              setSelectedAcid(e.target.value);
              setKaValue('');
              setPkaValue('');
            }}
          >
            <option value="">Select an acid</option>
            {Object.entries(commonAcids).map(([formula, data]) => (
              <option key={formula} value={formula}>
                {data.name} ({formula})
              </option>
            ))}
          </select>
        </div>

        {!selectedAcid && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculation Type
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value as 'ka-to-pka' | 'pka-to-ka')}
              >
                <option value="ka-to-pka">Ka to pKa</option>
                <option value="pka-to-ka">pKa to Ka</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {calculationType === 'ka-to-pka' ? 'Ka Value' : 'pKa Value'}
              </label>
              <input
                type="number"
                step={calculationType === 'ka-to-pka' ? '1e-15' : '0.1'}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                value={calculationType === 'ka-to-pka' ? kaValue : pkaValue}
                onChange={(e) => {
                  if (calculationType === 'ka-to-pka') {
                    setKaValue(e.target.value);
                  } else {
                    setPkaValue(e.target.value);
                  }
                }}
                placeholder={calculationType === 'ka-to-pka' ? 'Enter Ka value' : 'Enter pKa value'}
              />
            </div>
          </>
        )}

        <button
          className="btn w-full bg-sky-600 hover:bg-sky-700"
          onClick={calculateValues}
          disabled={!selectedAcid && !kaValue && !pkaValue}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Ka Value</h3>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.ka?.toExponential(4)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">pKa Value</h3>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.pka?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Acid Strength</h3>
                <p className="text-gray-600">{result.acidStrength}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">pH Relationship</h3>
                <p className="text-gray-600">{result.phRelationship}</p>
              </div>
            </div>

            {result.acidData && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Additional Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Type: {result.acidData.type}</p>
                  <p className="text-gray-600">Conjugate Base: {result.acidData.conjugateBase}</p>
                </div>
              </div>
            )}

            <ShareResults
              title="pKa Calculator Results"
              text={`Acid Dissociation Constants:
• Ka: ${result.ka?.toExponential(4)}
• pKa: ${result.pka?.toFixed(2)}
• Acid Strength: ${result.acidStrength}
${result.acidData ? `• Acid Type: ${result.acidData.type}
• Conjugate Base: ${result.acidData.conjugateBase}` : ''}

Calculate acid dissociation constants at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}