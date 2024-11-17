import React, { useState } from 'react';
import { Clock, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface CellDivisionTimeCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface CellType {
  name: string;
  averageCycleTime: number;
  phaseDistribution: {
    G1: number;
    S: number;
    G2: number;
    M: number;
  };
}

const cellTypes: Record<string, CellType> = {
  'human-epithelial': {
    name: 'Human Epithelial Cell',
    averageCycleTime: 24,
    phaseDistribution: { G1: 11, S: 8, G2: 4, M: 1 }
  },
  'yeast': {
    name: 'Yeast Cell',
    averageCycleTime: 2,
    phaseDistribution: { G1: 0.75, S: 0.5, G2: 0.5, M: 0.25 }
  },
  'embryonic': {
    name: 'Early Embryonic Cell',
    averageCycleTime: 0.5,
    phaseDistribution: { G1: 0.1, S: 0.2, G2: 0.1, M: 0.1 }
  }
};

export function CellDivisionTimeCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-green-50 to-emerald-50',
    secondaryColor: 'text-green-600',
    accentColor: 'bg-green-100'
  }
}: CellDivisionTimeCalculatorProps) {
  const [cellType, setCellType] = useState<string>('');
  const [cycleTime, setCycleTime] = useState<string>('');
  const [customDistribution, setCustomDistribution] = useState({
    G1: '',
    S: '',
    G2: '',
    M: ''
  });
  const [result, setResult] = useState<{
    totalTime: number;
    phases: {
      name: string;
      duration: number;
      percentage: number;
    }[];
    doublingRate: number;
  } | null>(null);

  const calculateTiming = () => {
    let totalTime: number;
    let phaseDistribution: { G1: number; S: number; G2: number; M: number };

    if (cellType) {
      const selectedCell = cellTypes[cellType];
      totalTime = selectedCell.averageCycleTime;
      phaseDistribution = selectedCell.phaseDistribution;
    } else {
      totalTime = parseFloat(cycleTime);
      const total = Object.values(customDistribution).reduce(
        (sum, val) => sum + parseFloat(val || '0'),
        0
      );
      phaseDistribution = {
        G1: (parseFloat(customDistribution.G1) / total) * totalTime,
        S: (parseFloat(customDistribution.S) / total) * totalTime,
        G2: (parseFloat(customDistribution.G2) / total) * totalTime,
        M: (parseFloat(customDistribution.M) / total) * totalTime
      };
    }

    const phases = [
      { name: 'G1 Phase', value: phaseDistribution.G1 },
      { name: 'S Phase', value: phaseDistribution.S },
      { name: 'G2 Phase', value: phaseDistribution.G2 },
      { name: 'M Phase', value: phaseDistribution.M }
    ].map(phase => ({
      name: phase.name,
      duration: phase.value,
      percentage: (phase.value / totalTime) * 100
    }));

    setResult({
      totalTime,
      phases,
      doublingRate: 24 / totalTime // Divisions per day
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Clock className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cell Division Time Calculator</h2>
          <p className="text-gray-600">Calculate cell cycle phase durations</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cell Type (Optional)
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={cellType}
            onChange={(e) => {
              setCellType(e.target.value);
              setCycleTime('');
              setCustomDistribution({ G1: '', S: '', G2: '', M: '' });
            }}
          >
            <option value="">Custom Cell Type</option>
            {Object.entries(cellTypes).map(([id, type]) => (
              <option key={id} value={id}>
                {type.name} ({type.averageCycleTime}h cycle)
              </option>
            ))}
          </select>
        </div>

        {!cellType && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Cycle Time (hours)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={cycleTime}
                onChange={(e) => setCycleTime(e.target.value)}
                placeholder="Enter total cycle time"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['G1', 'S', 'G2', 'M'].map((phase) => (
                <div key={phase}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {phase} Phase (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={customDistribution[phase as keyof typeof customDistribution]}
                    onChange={(e) => setCustomDistribution({
                      ...customDistribution,
                      [phase]: e.target.value
                    })}
                    placeholder="Enter percentage"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <button
          className="btn w-full bg-green-600 hover:bg-green-700"
          onClick={calculateTiming}
          disabled={!cellType && !cycleTime}
        >
          Calculate Division Time
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Total Cycle Time</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.totalTime.toFixed(1)} hours
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.phases.map((phase) => (
                <div key={phase.name} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{phase.name}</h3>
                  <p className="text-gray-600">{phase.duration.toFixed(1)}h</p>
                  <p className="text-sm text-gray-500">({phase.percentage.toFixed(1)}%)</p>
                </div>
              ))}
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Cell Division Rate</h3>
              <p className="text-gray-600">
                {result.doublingRate.toFixed(1)} divisions per day
              </p>
            </div>

            <ShareResults
              title="Cell Division Time Results"
              text={`Cell Division Analysis:
• Total Cycle Time: ${result.totalTime.toFixed(1)} hours
• Phase Durations:
${result.phases.map(phase => 
  `  ${phase.name}: ${phase.duration.toFixed(1)}h (${phase.percentage.toFixed(1)}%)`
).join('\n')}
• Division Rate: ${result.doublingRate.toFixed(1)} divisions/day

Calculate cell division timing at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}