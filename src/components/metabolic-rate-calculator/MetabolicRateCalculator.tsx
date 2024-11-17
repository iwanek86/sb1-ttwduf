import React, { useState } from 'react';
import { Flame, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface MetabolicRateCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface MetabolicResult {
  bmr: number;
  tdee: number;
  method: string;
  activityLevel: string;
  dailyCalories: number;
}

const activityLevels = {
  sedentary: { factor: 1.2, description: 'Little or no exercise' },
  light: { factor: 1.375, description: 'Light exercise 1-3 times/week' },
  moderate: { factor: 1.55, description: 'Moderate exercise 3-5 times/week' },
  active: { factor: 1.725, description: 'Heavy exercise 6-7 times/week' },
  veryActive: { factor: 1.9, description: 'Very heavy exercise, physical job' }
};

export function MetabolicRateCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-yellow-50 to-amber-50',
    secondaryColor: 'text-yellow-600',
    accentColor: 'bg-yellow-100'
  }
}: MetabolicRateCalculatorProps) {
  const [species, setSpecies] = useState('human');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<MetabolicResult | null>(null);

  const calculateHumanBMR = (w: number, h: number, a: number, s: string): number => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = s === 'male' ? bmr + 5 : bmr - 161;
    return bmr;
  };

  const calculateAnimalBMR = (w: number, t: number): number => {
    // Simplified Kleiber's Law with temperature correction
    const baseBMR = 70 * Math.pow(w, 0.75);
    const q10 = 2.0; // Temperature coefficient
    const tempDiff = t - 20; // Reference temperature
    return baseBMR * Math.pow(q10, tempDiff / 10);
  };

  const calculateMetabolicRate = () => {
    setError('');
    setResult(null);

    try {
      const w = parseFloat(weight);
      let bmr: number;
      let method: string;

      if (species === 'human') {
        if (!height || !age || !sex) {
          setError('Please fill in all required fields');
          return;
        }
        const h = parseFloat(height);
        const a = parseFloat(age);
        bmr = calculateHumanBMR(w, h, a, sex);
        method = 'Mifflin-St Jeor';
      } else {
        if (!temperature) {
          setError('Please enter temperature');
          return;
        }
        const t = parseFloat(temperature);
        bmr = calculateAnimalBMR(w, t);
        method = 'Modified Kleiber\'s Law';
      }

      const activityFactor = activityLevels[activityLevel as keyof typeof activityLevels].factor;
      const tdee = bmr * activityFactor;

      setResult({
        bmr,
        tdee,
        method,
        activityLevel: activityLevels[activityLevel as keyof typeof activityLevels].description,
        dailyCalories: tdee
      });
    } catch (err) {
      setError('Invalid input values');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Flame className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Metabolic Rate Calculator</h2>
          <p className="text-gray-600">Calculate BMR and daily energy expenditure</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Species
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="human">Human</option>
            <option value="animal">Other Animal</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {species === 'human' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sex
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Level
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            {Object.entries(activityLevels).map(([key, { description }]) => (
              <option key={key} value={key}>
                {description}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-yellow-600 hover:bg-yellow-700"
          onClick={calculateMetabolicRate}
        >
          Calculate Metabolic Rate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Basal Metabolic Rate (BMR)</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {Math.round(result.bmr)} kcal/day
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Calculated using {result.method}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Activity Level</h3>
                <p className="text-gray-600">{result.activityLevel}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Total Daily Energy Expenditure</h3>
                <p className="text-gray-600">{Math.round(result.tdee)} kcal/day</p>
              </div>
            </div>

            <ShareResults
              title="Metabolic Rate Calculator Results"
              text={`Metabolic Rate Analysis:
• Basal Metabolic Rate (BMR): ${Math.round(result.bmr)} kcal/day
• Total Daily Energy Expenditure: ${Math.round(result.tdee)} kcal/day
• Calculation Method: ${result.method}
• Activity Level: ${result.activityLevel}

Calculate metabolic rates at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}