import React, { useState } from 'react';
import { Activity, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface EnzymeKineticsCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface DataPoint {
  substrate: number;
  velocity: number;
}

interface KineticsResult {
  vmax: number;
  km: number;
  kcat?: number;
  catalyticEfficiency?: number;
  lineweaver: {
    slope: number;
    yIntercept: number;
    rSquared: number;
  };
}

export function EnzymeKineticsCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-violet-50 to-blue-50',
    secondaryColor: 'text-violet-600',
    accentColor: 'bg-violet-100'
  }
}: EnzymeKineticsCalculatorProps) {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { substrate: 0, velocity: 0 }
  ]);
  const [enzymeConcentration, setEnzymeConcentration] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<KineticsResult | null>(null);

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { substrate: 0, velocity: 0 }]);
  };

  const removeDataPoint = (index: number) => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.filter((_, i) => i !== index));
    }
  };

  const updateDataPoint = (index: number, field: keyof DataPoint, value: number) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index] = { ...newDataPoints[index], [field]: value };
    setDataPoints(newDataPoints);
  };

  const calculateLinearRegression = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const yIntercept = (sumY - slope * sumX) / n;
    
    // Calculate R-squared
    const yMean = sumY / n;
    const totalSS = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
    const regressionSS = y.reduce((sum, yi, i) => {
      const yPred = slope * x[i] + yIntercept;
      return sum + Math.pow(yPred - yMean, 2);
    }, 0);
    const rSquared = regressionSS / totalSS;

    return { slope, yIntercept, rSquared };
  };

  const calculateKinetics = () => {
    setError('');
    setResult(null);

    try {
      // Validate data points
      if (dataPoints.some(point => point.substrate < 0 || point.velocity < 0)) {
        setError('All values must be non-negative');
        return;
      }

      // Prepare Lineweaver-Burk plot data (1/[S] vs 1/v)
      const linearData = dataPoints
        .filter(point => point.substrate !== 0 && point.velocity !== 0)
        .map(point => ({
          x: 1 / point.substrate,
          y: 1 / point.velocity
        }));

      const regression = calculateLinearRegression(
        linearData.map(p => p.x),
        linearData.map(p => p.y)
      );

      // Calculate kinetic parameters
      const vmax = 1 / regression.yIntercept;
      const km = vmax * regression.slope;

      // Calculate kcat if enzyme concentration is provided
      let kcat, catalyticEfficiency;
      if (enzymeConcentration) {
        const et = parseFloat(enzymeConcentration);
        kcat = vmax / et;
        catalyticEfficiency = kcat / km;
      }

      setResult({
        vmax,
        km,
        kcat,
        catalyticEfficiency,
        lineweaver: regression
      });
    } catch (err) {
      setError('Error calculating kinetic parameters');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Activity className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enzyme Kinetics Calculator</h2>
          <p className="text-gray-600">Calculate Michaelis-Menten parameters and analyze enzyme kinetics</p>
        </div>
      </div>

      <div className="space-y-6">
        {dataPoints.map((point, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                [S] (Substrate Concentration)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                value={point.substrate || ''}
                onChange={(e) => updateDataPoint(index, 'substrate', parseFloat(e.target.value))}
                placeholder="Enter substrate concentration"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                v (Initial Velocity)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  value={point.velocity || ''}
                  onChange={(e) => updateDataPoint(index, 'velocity', parseFloat(e.target.value))}
                  placeholder="Enter initial velocity"
                />
                {dataPoints.length > 1 && (
                  <button
                    onClick={() => removeDataPoint(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          className="w-full px-4 py-2 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50"
          onClick={addDataPoint}
        >
          Add Data Point
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            [E]t (Total Enzyme Concentration) - Optional
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            value={enzymeConcentration}
            onChange={(e) => setEnzymeConcentration(e.target.value)}
            placeholder="Enter enzyme concentration"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-violet-600 hover:bg-violet-700"
          onClick={calculateKinetics}
        >
          Calculate Kinetic Parameters
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Michaelis-Menten Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Vmax</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.vmax.toFixed(3)} units
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Km</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.km.toFixed(3)} units
                  </p>
                </div>
              </div>
            </div>

            {result.kcat && result.catalyticEfficiency && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">kcat</h3>
                  <p className="text-gray-600">{result.kcat.toFixed(3)} s⁻¹</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Catalytic Efficiency</h3>
                  <p className="text-gray-600">{result.catalyticEfficiency.toExponential(3)} M⁻¹s⁻¹</p>
                </div>
              </div>
            )}

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Lineweaver-Burk Analysis</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Slope: {result.lineweaver.slope.toFixed(3)}</p>
                <p className="text-gray-600">Y-intercept: {result.lineweaver.yIntercept.toFixed(3)}</p>
                <p className="text-gray-600">R²: {result.lineweaver.rSquared.toFixed(3)}</p>
              </div>
            </div>

            <ShareResults
              title="Enzyme Kinetics Results"
              text={`Enzyme Kinetics Analysis:
• Vmax: ${result.vmax.toFixed(3)} units
• Km: ${result.km.toFixed(3)} units
${result.kcat ? `• kcat: ${result.kcat.toFixed(3)} s⁻¹` : ''}
${result.catalyticEfficiency ? `• Catalytic Efficiency: ${result.catalyticEfficiency.toExponential(3)} M⁻¹s⁻¹` : ''}
• Lineweaver-Burk Analysis:
  - Slope: ${result.lineweaver.slope.toFixed(3)}
  - Y-intercept: ${result.lineweaver.yIntercept.toFixed(3)}
  - R²: ${result.lineweaver.rSquared.toFixed(3)}

Calculate enzyme kinetics at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}