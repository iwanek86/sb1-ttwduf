import React, { useState } from 'react';
import { Cat, Calculator } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface CatAgeCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export function CatAgeCalculator({
  theme = 'light',
  customStyles
}: CatAgeCalculatorProps) {
  const [catAge, setCatAge] = useState<string>('');
  const [catAgeType, setCatAgeType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<{
    humanAge: number;
    lifeStage: string;
    description: string;
  } | null>(null);

  const calculateAge = () => {
    const ageInYears = catAgeType === 'years' 
      ? parseFloat(catAge)
      : parseFloat(catAge) / 12;

    let humanAge: number;
    let lifeStage: string;
    let description: string;

    if (ageInYears < 1) {
      humanAge = ageInYears * 15;
      lifeStage = 'Kitten';
      description = 'Your cat is in their early development stage, experiencing rapid growth and learning.';
    } else if (ageInYears < 2) {
      humanAge = 15;
      lifeStage = 'Junior';
      description = 'Your cat is a young adult, full of energy and continuing to develop socially.';
    } else if (ageInYears < 6) {
      humanAge = 24 + ((ageInYears - 2) * 4);
      lifeStage = 'Prime';
      description = 'Your cat is in their prime years, fully mature and typically very active.';
    } else if (ageInYears < 10) {
      humanAge = 40 + ((ageInYears - 6) * 4);
      lifeStage = 'Mature';
      description = 'Your cat is mature and settled, equivalent to a middle-aged human.';
    } else if (ageInYears < 14) {
      humanAge = 56 + ((ageInYears - 10) * 4);
      lifeStage = 'Senior';
      description = 'Your cat is entering their senior years, may need extra care and attention.';
    } else {
      humanAge = 72 + ((ageInYears - 14) * 4);
      lifeStage = 'Super Senior';
      description = 'Your cat is in their golden years, requiring special care and regular vet check-ups.';
    }

    setResult({ humanAge, lifeStage, description });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles?.accentColor || 'bg-blue-100'}>
          <Cat className={`w-6 h-6 ${customStyles?.secondaryColor || 'text-blue-600'}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cat Age Calculator</h2>
          <p className="text-gray-600">Convert cat years to human years</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cat's Age
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={catAge}
              onChange={(e) => setCatAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Unit
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={catAgeType}
              onChange={(e) => setCatAgeType(e.target.value as 'years' | 'months')}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <button
          className="btn w-full"
          onClick={calculateAge}
          disabled={!catAge}
        >
          Calculate Age
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles?.accentColor || 'bg-blue-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Human Age Equivalent</h3>
                <span className={`text-2xl font-bold ${customStyles?.secondaryColor || 'text-blue-600'}`}>
                  {Math.round(result.humanAge)} years
                </span>
              </div>
              <p className="text-gray-600 text-sm">{result.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Life Stage</h3>
                <p className="text-gray-600">{result.lifeStage}</p>
              </div>
            </div>

            <ShareResults
              title="Cat Age Calculator Results"
              text={`My cat's age in human years:
• Cat Age: ${catAge} ${catAgeType}
• Human Age: ${Math.round(result.humanAge)} years
• Life Stage: ${result.lifeStage}

Calculate your cat's age in human years at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}