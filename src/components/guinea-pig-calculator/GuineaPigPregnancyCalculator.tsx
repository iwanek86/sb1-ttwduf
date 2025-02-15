import React, { useState } from 'react';
import { Calendar, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface GuineaPigPregnancyCalculatorProps {
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
  weightCheckDate: string;
}

export function GuineaPigPregnancyCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-amber-50 to-yellow-50',
    secondaryColor: 'text-amber-600',
    accentColor: 'bg-amber-100'
  }
}: GuineaPigPregnancyCalculatorProps) {
  const [matingDate, setMatingDate] = useState('');
  const [isFirstPregnancy, setIsFirstPregnancy] = useState(false);
  const [result, setResult] = useState<PregnancyDates | null>(null);

  const calculateDates = () => {
    const mating = new Date(matingDate);
    
    // Add average gestation period (65 days) for due date
    const dueDate = new Date(mating);
    dueDate.setDate(mating.getDate() + 65);

    // Calculate early and late due dates (59-72 days)
    const earlyDueDate = new Date(mating);
    earlyDueDate.setDate(mating.getDate() + 59);
    
    const lateDueDate = new Date(mating);
    lateDueDate.setDate(mating.getDate() + (isFirstPregnancy ? 72 : 70));

    // Calculate trimester dates
    const firstTrimester = new Date(mating);
    firstTrimester.setDate(mating.getDate() + 21);

    const secondTrimester = new Date(mating);
    secondTrimester.setDate(mating.getDate() + 42);

    // Weight check date (2 weeks before due date)
    const weightCheck = new Date(dueDate);
    weightCheck.setDate(dueDate.getDate() - 14);

    setResult({
      matingDate: mating.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      earlyDueDate: earlyDueDate.toLocaleDateString(),
      lateDueDate: lateDueDate.toLocaleDateString(),
      firstTrimester: firstTrimester.toLocaleDateString(),
      secondTrimester: secondTrimester.toLocaleDateString(),
      thirdTrimester: secondTrimester.toLocaleDateString(),
      weightCheckDate: weightCheck.toLocaleDateString()
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Calendar className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Guinea Pig Pregnancy Calculator</h2>
          <p className="text-gray-600">Track pregnancy timeline and important dates</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mating Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={matingDate}
            onChange={(e) => setMatingDate(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="first-pregnancy"
            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            checked={isFirstPregnancy}
            onChange={(e) => setIsFirstPregnancy(e.target.checked)}
          />
          <label htmlFor="first-pregnancy" className="ml-2 text-sm text-gray-700">
            This is the first pregnancy
          </label>
        </div>

        <button
          className="btn w-full bg-amber-600 hover:bg-amber-700"
          onClick={calculateDates}
          disabled={!matingDate}
        >
          Calculate Dates
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Expected Due Date Range</h3>
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
              <h3 className="font-medium text-gray-900 mb-2">Important Check-ups</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Weight monitoring: {result.weightCheckDate}
                </p>
                <p className="text-sm text-gray-500">
                  Regular weight checks are crucial in the final two weeks
                </p>
              </div>
            </div>

            <ShareResults
              title="Guinea Pig Pregnancy Calculator Results"
              text={`Guinea Pig Pregnancy Timeline:
• Mating Date: ${result.matingDate}
• Due Date Range: ${result.earlyDueDate} - ${result.lateDueDate}
• Average Due Date: ${result.dueDate}
• First Trimester End: ${result.firstTrimester}
• Second Trimester End: ${result.secondTrimester}
• Weight Check Date: ${result.weightCheckDate}

Calculate guinea pig pregnancy dates at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}