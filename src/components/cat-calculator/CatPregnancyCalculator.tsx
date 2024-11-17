import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface CatPregnancyCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  onDateCalculated?: (dates: {
    dueDate: string;
    firstTrimester: string;
    secondTrimester: string;
    thirdTrimester: string;
    nestingBehavior: string;
  }) => void;
}

export function CatPregnancyCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-blue-50 to-purple-50',
    secondaryColor: 'text-blue-600',
    accentColor: 'bg-blue-100'
  },
  onDateCalculated
}: CatPregnancyCalculatorProps) {
  const [matingDate, setMatingDate] = useState('');
  const [results, setResults] = useState<{
    dueDate: string;
    firstTrimester: string;
    secondTrimester: string;
    thirdTrimester: string;
    nestingBehavior: string;
  } | null>(null);

  const calculateDates = (date: string) => {
    const mating = new Date(date);
    
    // Cat pregnancy typically lasts 63-67 days, using 65 as average
    const dueDate = new Date(mating);
    dueDate.setDate(mating.getDate() + 65);

    const firstTrimester = new Date(mating);
    firstTrimester.setDate(mating.getDate() + 21);

    const secondTrimester = new Date(mating);
    secondTrimester.setDate(mating.getDate() + 42);

    const nestingDate = new Date(mating);
    nestingDate.setDate(mating.getDate() + 58);

    const dates = {
      dueDate: dueDate.toLocaleDateString(),
      firstTrimester: firstTrimester.toLocaleDateString(),
      secondTrimester: secondTrimester.toLocaleDateString(),
      thirdTrimester: secondTrimester.toLocaleDateString(),
      nestingBehavior: nestingDate.toLocaleDateString(),
    };

    setResults(dates);
    onDateCalculated?.(dates);
  };

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textColor = theme === 'light' ? 'text-gray-900' : 'text-gray-100';
  const subTextColor = theme === 'light' ? 'text-gray-600' : 'text-gray-300';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  return (
    <div className={`${bgColor} rounded-xl shadow-sm p-6 mb-8`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className={`${customStyles.accentColor} p-3 rounded-lg`}>
          <Calendar className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>Calculate Due Date</h2>
          <p className={`${subTextColor} mt-2`}>Enter the mating date to calculate important milestones</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="mating-date" className={`block text-sm font-medium ${subTextColor} mb-2`}>
            Mating Date
          </label>
          <input
            type="date"
            id="mating-date"
            className={`w-full px-4 py-2 rounded-lg border ${borderColor} focus:ring-2 focus:ring-blue-500 focus:border-transparent ${bgColor} ${textColor}`}
            value={matingDate}
            onChange={(e) => setMatingDate(e.target.value)}
          />
        </div>

        <button
          className={`w-full px-4 py-2 rounded-lg ${customStyles.accentColor} ${customStyles.secondaryColor} font-medium hover:opacity-90 transition-opacity`}
          onClick={() => calculateDates(matingDate)}
          disabled={!matingDate}
        >
          Calculate Dates
        </button>
      </div>

      {results && (
        <>
          <div className="mt-8 space-y-4">
            <div className={`flex items-start space-x-4 p-4 ${customStyles.accentColor} rounded-lg`}>
              <Info className={`w-5 h-5 ${customStyles.secondaryColor} mt-1`} />
              <div>
                <h3 className={`font-medium ${textColor}`}>Expected Due Date</h3>
                <p className={`${customStyles.secondaryColor} font-semibold`}>{results.dueDate}</p>
                <p className={`text-sm ${subTextColor} mt-1`}>
                  Cat pregnancy typically lasts 63-67 days from mating
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 border ${borderColor} rounded-lg`}>
                <h3 className={`font-medium ${textColor}`}>First Trimester Ends</h3>
                <p className={subTextColor}>{results.firstTrimester}</p>
              </div>

              <div className={`p-4 border ${borderColor} rounded-lg`}>
                <h3 className={`font-medium ${textColor}`}>Second Trimester Ends</h3>
                <p className={subTextColor}>{results.secondTrimester}</p>
              </div>

              <div className={`p-4 border ${borderColor} rounded-lg`}>
                <h3 className={`font-medium ${textColor}`}>Third Trimester Begins</h3>
                <p className={subTextColor}>{results.thirdTrimester}</p>
              </div>

              <div className={`p-4 border ${borderColor} rounded-lg`}>
                <h3 className={`font-medium ${textColor}`}>Expected Nesting Behavior</h3>
                <p className={subTextColor}>{results.nestingBehavior}</p>
              </div>
            </div>
          </div>

          <ShareResults
            title="Cat Pregnancy Calculator Results"
            text={`My cat's pregnancy timeline:
• Due Date: ${results.dueDate}
• First Trimester Ends: ${results.firstTrimester}
• Second Trimester Ends: ${results.secondTrimester}
• Expected Nesting: ${results.nestingBehavior}

Calculate your cat's pregnancy timeline at:`}
          />
        </>
      )}
    </div>
  );
}