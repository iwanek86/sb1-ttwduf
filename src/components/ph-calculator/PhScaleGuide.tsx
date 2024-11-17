import React from 'react';
import { Info } from 'lucide-react';

export function PhScaleGuide() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">pH Scale Guide</h2>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
          <Info className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Understanding the pH Scale</h3>
            <p className="text-gray-600 mt-1">
              The pH scale ranges from 0 to 14, with 7 being neutral. Values below 7 are acidic,
              while values above 7 are basic (alkaline).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <h3 className="font-medium text-red-900">Acidic (0-6)</h3>
            <p className="text-red-700 text-sm mt-1">Examples: lemon juice, vinegar, battery acid</p>
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900">Neutral (7)</h3>
            <p className="text-green-700 text-sm mt-1">Examples: pure water, blood</p>
          </div>

          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Basic (8-14)</h3>
            <p className="text-blue-700 text-sm mt-1">Examples: baking soda, soap, bleach</p>
          </div>
        </div>
      </div>
    </div>
  );
}