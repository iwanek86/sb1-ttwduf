import React, { useState } from 'react';
import { Calendar, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface DogPregnancyCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface PregnancyDates {
  matingDate: string;
  dueDate: string;
  earlyDueDate: string;
  lateDueDate: string;
  firstTrimester: string;
  secondTrimester: string;
  thirdTrimester: string;
  nestingDate: string;
}

export function DogPregnancyCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-blue-50 to-indigo-50',
    secondaryColor: 'text-blue-600',
    accentColor: 'bg-blue-100'
  }
}: DogPregnancyCalculatorProps) {
  const [matingDate, setMatingDate] = useState('');
  const [isFirstPregnancy, setIsFirstPregnancy] = useState(false);
  const [result, setResult] = useState<PregnancyDates | null>(null);

  const calculateDates = () => {
    const mating = new Date(matingDate);
    
    // Add average gestation period (63 days) for due date
    const dueDate = new Date(mating);
    dueDate.setDate(mating.getDate() + 63);

    // Calculate early and late due dates (58-68 days)
    const earlyDueDate = new Date(mating);
    earlyDueDate.setDate(mating.getDate() + 58);
    
    const lateDueDate = new Date(mating);
    lateDueDate.setDate(mating.getDate() + 68);

    // Calculate trimester dates
    const firstTrimester = new Date(mating);
    firstTrimester.setDate(mating.getDate() + 21);

    const secondTrimester = new Date(mating);
    secondTrimester.setDate(mating.getDate() + 42);

    // Nesting behavior typically starts 1 week before due date
    const nesting = new Date(dueDate);
    nesting.setDate(dueDate.getDate() - 7);

    setResult({
      matingDate: mating.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      earlyDueDate: earlyDueDate.toLocaleDateString(),
      lateDueDate: lateDueDate.toLocaleDateString(),
      firstTrimester: firstTrimester.toLocaleDateString(),
      secondTrimester: secondTrimester.toLocaleDateString(),
      thirdTrimester: secondTrimester.toLocaleDateString(),
      nestingDate: nesting.toLocaleDateString()
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Calendar className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dog Pregnancy Calculator</h2>
          <p className="text-gray-600">Track pregnancy timeline and important dates</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breeding Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={matingDate}
            onChange={(e) => setMatingDate(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="first-pregnancy"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={isFirstPregnancy}
            onChange={(e) => setIsFirstPregnancy(e.target.checked)}
          />
          <label htmlFor="first-pregnancy" className="ml-2 text-sm text-gray-700">
            First pregnancy (may require additional monitoring)
          </label>
        </div>

        <button
          className="btn w-full bg-blue-600 hover:bg-blue-700"
          onClick={calculateDates}
          disabled={!matingDate}
        >
          Calculate Dates
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Expected Whelping Date Range</h3>
              <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                {result.earlyDueDate} - {result.lateDueDate}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Average due date: {result.dueDate}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">First Trimester End</h3>
                <p className="text-gray-600">{result.firstTrimester}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Second Trimester End</h3>
                <p className="text-gray-600">{result.secondTrimester}</p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Important Dates</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Expected nesting behavior: {result.nestingDate}
                </p>
                <p className="text-sm text-gray-500">
                  Prepare whelping box before nesting begins
                </p>
              </div>
            </div>

            <ShareResults
              title="Dog Pregnancy Calculator Results"
              text={`Dog Pregnancy Timeline:
• Breeding Date: ${result.matingDate}
• Due Date Range: ${result.earlyDueDate} - ${result.lateDueDate}
• Average Due Date: ${result.dueDate}
• First Trimester End: ${result.firstTrimester}
• Second Trimester End: ${result.secondTrimester}
• Nesting Behavior: ${result.nestingDate}

Calculate dog pregnancy dates at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}