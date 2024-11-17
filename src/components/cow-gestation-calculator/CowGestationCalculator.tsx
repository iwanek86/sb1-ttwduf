import React, { useState } from 'react';
import { Calendar, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface CowGestationCalculatorProps {
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
  checkupDate: string;
}

export function CowGestationCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-amber-50 to-yellow-50',
    secondaryColor: 'text-amber-600',
    accentColor: 'bg-amber-100'
  }
}: CowGestationCalculatorProps) {
  const [matingDate, setMatingDate] = useState('');
  const [isFirstPregnancy, setIsFirstPregnancy] = useState(false);
  const [result, setResult] = useState<PregnancyDates | null>(null);

  const calculateDates = () => {
    const mating = new Date(matingDate);
    
    // Add average gestation period (283 days) for due date
    const dueDate = new Date(mating);
    dueDate.setDate(mating.getDate() + 283);

    // Calculate early and late due dates (279-287 days)
    const earlyDueDate = new Date(mating);
    earlyDueDate.setDate(mating.getDate() + 279);
    
    const lateDueDate = new Date(mating);
    lateDueDate.setDate(mating.getDate() + 287);

    // Calculate trimester dates
    const firstTrimester = new Date(mating);
    firstTrimester.setDate(mating.getDate() + 94);

    const secondTrimester = new Date(mating);
    secondTrimester.setDate(mating.getDate() + 188);

    // Checkup date (1 month before due date)
    const checkup = new Date(dueDate);
    checkup.setDate(dueDate.getDate() - 30);

    setResult({
      matingDate: mating.toLocaleDateString(),
      dueDate: dueDate.toLocaleDateString(),
      earlyDueDate: earlyDueDate.toLocaleDateString(),
      lateDueDate: lateDueDate.toLocaleDateString(),
      firstTrimester: firstTrimester.toLocaleDateString(),
      secondTrimester: secondTrimester.toLocaleDateString(),
      thirdTrimester: secondTrimester.toLocaleDateString(),
      checkupDate: checkup.toLocaleDateString()
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Calendar className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cow Gestation Calculator</h2>
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
            First pregnancy (may require additional monitoring)
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
              <h3 className="font-medium text-gray-900 mb-2">Expected Calving Date Range</h3>
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
                  Pre-calving check: {result.checkupDate}
                </p>
                <p className="text-sm text-gray-500">
                  Schedule regular health checks throughout pregnancy
                </p>
              </div>
            </div>

            <ShareResults
              title="Cow Gestation Calculator Results"
              text={`Cow Pregnancy Timeline:
• Breeding Date: ${result.matingDate}
• Due Date Range: ${result.earlyDueDate} - ${result.lateDueDate}
• Average Due Date: ${result.dueDate}
• First Trimester End: ${result.firstTrimester}
• Second Trimester End: ${result.secondTrimester}
• Pre-calving Check: ${result.checkupDate}

Calculate cow gestation dates at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}