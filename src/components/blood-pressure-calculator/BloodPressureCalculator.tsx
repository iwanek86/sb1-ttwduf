import React, { useState } from 'react';
import { Heart, Share2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface BloodPressureCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface BPReading {
  systolic: number;
  diastolic: number;
  pulse?: number;
  time: string;
  date: string;
}

interface BPAnalysis {
  classification: string;
  risk: string;
  recommendations: string[];
  averages: {
    systolic: number;
    diastolic: number;
    pulse?: number;
  };
  trend?: 'increasing' | 'decreasing' | 'stable';
}

const bpCategories = [
  { name: 'Normal', systolicRange: [0, 120], diastolicRange: [0, 80], risk: 'Low' },
  { name: 'Elevated', systolicRange: [120, 129], diastolicRange: [0, 80], risk: 'Moderate' },
  { name: 'Stage 1 Hypertension', systolicRange: [130, 139], diastolicRange: [80, 89], risk: 'High' },
  { name: 'Stage 2 Hypertension', systolicRange: [140, 999], diastolicRange: [90, 999], risk: 'Very High' }
];

export function BloodPressureCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-red-50 to-rose-50',
    secondaryColor: 'text-red-600',
    accentColor: 'bg-red-100'
  }
}: BloodPressureCalculatorProps) {
  const [readings, setReadings] = useState<BPReading[]>([]);
  const [currentReading, setCurrentReading] = useState<BPReading>({
    systolic: 0,
    diastolic: 0,
    pulse: undefined,
    time: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [result, setResult] = useState<BPAnalysis | null>(null);

  const addReading = () => {
    if (!currentReading.systolic || !currentReading.diastolic) {
      setError('Please enter both systolic and diastolic values');
      return;
    }

    if (currentReading.systolic <= currentReading.diastolic) {
      setError('Systolic pressure must be higher than diastolic pressure');
      return;
    }

    setReadings([...readings, currentReading]);
    setCurrentReading({
      systolic: 0,
      diastolic: 0,
      pulse: undefined,
      time: '',
      date: new Date().toISOString().split('T')[0]
    });
    setError('');
  };

  const removeReading = (index: number) => {
    setReadings(readings.filter((_, i) => i !== index));
  };

  const classifyBP = (systolic: number, diastolic: number) => {
    for (const category of bpCategories) {
      if (
        systolic >= category.systolicRange[0] &&
        systolic < category.systolicRange[1] &&
        diastolic >= category.diastolicRange[0] &&
        diastolic < category.diastolicRange[1]
      ) {
        return category;
      }
    }
    return bpCategories[0]; // Default to normal if no match
  };

  const analyzeReadings = () => {
    if (readings.length === 0) {
      setError('Please add at least one reading');
      return;
    }

    const avgSystolic = readings.reduce((sum, r) => sum + r.systolic, 0) / readings.length;
    const avgDiastolic = readings.reduce((sum, r) => sum + r.diastolic, 0) / readings.length;
    const avgPulse = readings.some(r => r.pulse) 
      ? readings.reduce((sum, r) => sum + (r.pulse || 0), 0) / readings.filter(r => r.pulse).length 
      : undefined;

    const classification = classifyBP(avgSystolic, avgDiastolic);

    // Analyze trend
    let trend: 'increasing' | 'decreasing' | 'stable' | undefined;
    if (readings.length >= 3) {
      const firstHalf = readings.slice(0, Math.floor(readings.length / 2));
      const secondHalf = readings.slice(Math.floor(readings.length / 2));
      const avgFirst = firstHalf.reduce((sum, r) => sum + r.systolic, 0) / firstHalf.length;
      const avgSecond = secondHalf.reduce((sum, r) => sum + r.systolic, 0) / secondHalf.length;
      const difference = avgSecond - avgFirst;
      if (Math.abs(difference) < 5) {
        trend = 'stable';
      } else {
        trend = difference > 0 ? 'increasing' : 'decreasing';
      }
    }

    const recommendations = [
      classification.name !== 'Normal' ? 'Monitor blood pressure regularly' : 'Continue healthy lifestyle',
      classification.risk !== 'Low' ? 'Consult healthcare provider' : 'Maintain current habits',
      'Stay physically active',
      'Maintain healthy diet',
      'Limit sodium intake',
      'Manage stress levels'
    ];

    setResult({
      classification: classification.name,
      risk: classification.risk,
      recommendations,
      averages: {
        systolic: avgSystolic,
        diastolic: avgDiastolic,
        pulse: avgPulse
      },
      trend
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Heart className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blood Pressure Analysis</h2>
          <p className="text-gray-600">Track and analyze blood pressure readings</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Systolic (mmHg)
            </label>
            <input
              type="number"
              min="0"
              max="300"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={currentReading.systolic || ''}
              onChange={(e) => setCurrentReading({
                ...currentReading,
                systolic: parseInt(e.target.value)
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diastolic (mmHg)
            </label>
            <input
              type="number"
              min="0"
              max="200"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={currentReading.diastolic || ''}
              onChange={(e) => setCurrentReading({
                ...currentReading,
                diastolic: parseInt(e.target.value)
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pulse (optional)
            </label>
            <input
              type="number"
              min="0"
              max="200"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={currentReading.pulse || ''}
              onChange={(e) => setCurrentReading({
                ...currentReading,
                pulse: parseInt(e.target.value)
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={currentReading.time}
              onChange={(e) => setCurrentReading({
                ...currentReading,
                time: e.target.value
              })}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
            onClick={addReading}
          >
            <Plus className="w-4 h-4" />
            <span>Add Reading</span>
          </button>
          <button
            className="btn flex-1 bg-red-600 hover:bg-red-700"
            onClick={analyzeReadings}
            disabled={readings.length === 0}
          >
            Analyze Readings
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {readings.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-4">Recorded Readings</h3>
            <div className="space-y-2">
              {readings.map((reading, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex space-x-4">
                    <span className="text-gray-600">{reading.date}</span>
                    <span className="text-gray-600">{reading.time}</span>
                    <span className={customStyles.secondaryColor}>
                      {reading.systolic}/{reading.diastolic} mmHg
                    </span>
                    {reading.pulse && (
                      <span className="text-gray-600">{reading.pulse} bpm</span>
                    )}
                  </div>
                  <button
                    onClick={() => removeReading(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Blood Pressure Classification</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.classification}
              </p>
              <p className="text-sm text-gray-600 mt-1">Risk Level: {result.risk}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Average Systolic</h3>
                <p className="text-gray-600">{Math.round(result.averages.systolic)} mmHg</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Average Diastolic</h3>
                <p className="text-gray-600">{Math.round(result.averages.diastolic)} mmHg</p>
              </div>
              {result.averages.pulse && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Average Pulse</h3>
                  <p className="text-gray-600">{Math.round(result.averages.pulse)} bpm</p>
                </div>
              )}
            </div>

            {result.trend && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Trend Analysis</h3>
                <p className="text-gray-600 capitalize">Blood pressure is {result.trend}</p>
              </div>
            )}

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <ShareResults
              title="Blood Pressure Analysis Results"
              text={`Blood Pressure Analysis:
• Classification: ${result.classification}
• Risk Level: ${result.risk}
• Averages:
  - Systolic: ${Math.round(result.averages.systolic)} mmHg
  - Diastolic: ${Math.round(result.averages.diastolic)} mmHg
  ${result.averages.pulse ? `  - Pulse: ${Math.round(result.averages.pulse)} bpm` : ''}
${result.trend ? `• Trend: Blood pressure is ${result.trend}` : ''}

Analyze blood pressure readings at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}