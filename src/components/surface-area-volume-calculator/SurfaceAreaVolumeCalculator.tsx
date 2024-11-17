import React, { useState } from 'react';
import { Box, Share2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface SurfaceAreaVolumeCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface ShapeCalculation {
  surfaceArea: number;
  volume: number;
  ratio: number;
}

export function SurfaceAreaVolumeCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-emerald-50 to-teal-50',
    secondaryColor: 'text-emerald-600',
    accentColor: 'bg-emerald-100'
  }
}: SurfaceAreaVolumeCalculatorProps) {
  const [shape, setShape] = useState<'sphere' | 'cube' | 'cylinder'>('sphere');
  const [dimensions, setDimensions] = useState({
    radius: '',
    height: '',
    length: ''
  });
  const [result, setResult] = useState<ShapeCalculation | null>(null);
  const [comparisonResults, setComparisonResults] = useState<{
    sphere: ShapeCalculation;
    cube: ShapeCalculation;
    cylinder: ShapeCalculation;
  } | null>(null);

  const calculateSphere = (radius: number): ShapeCalculation => {
    const surfaceArea = 4 * Math.PI * radius * radius;
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);
    return {
      surfaceArea,
      volume,
      ratio: surfaceArea / volume
    };
  };

  const calculateCube = (length: number): ShapeCalculation => {
    const surfaceArea = 6 * length * length;
    const volume = Math.pow(length, 3);
    return {
      surfaceArea,
      volume,
      ratio: surfaceArea / volume
    };
  };

  const calculateCylinder = (radius: number, height: number): ShapeCalculation => {
    const surfaceArea = 2 * Math.PI * radius * (radius + height);
    const volume = Math.PI * radius * radius * height;
    return {
      surfaceArea,
      volume,
      ratio: surfaceArea / volume
    };
  };

  const calculate = () => {
    let calculation: ShapeCalculation | null = null;

    switch (shape) {
      case 'sphere':
        if (dimensions.radius) {
          calculation = calculateSphere(parseFloat(dimensions.radius));
        }
        break;
      case 'cube':
        if (dimensions.length) {
          calculation = calculateCube(parseFloat(dimensions.length));
        }
        break;
      case 'cylinder':
        if (dimensions.radius && dimensions.height) {
          calculation = calculateCylinder(
            parseFloat(dimensions.radius),
            parseFloat(dimensions.height)
          );
        }
        break;
    }

    if (calculation) {
      setResult(calculation);

      // Calculate comparison for same volume
      const targetVolume = calculation.volume;
      const sphereRadius = Math.pow((3 * targetVolume) / (4 * Math.PI), 1/3);
      const cubeLength = Math.pow(targetVolume, 1/3);
      const cylinderRadius = Math.sqrt(targetVolume / (Math.PI * parseFloat(dimensions.height || '1')));

      setComparisonResults({
        sphere: calculateSphere(sphereRadius),
        cube: calculateCube(cubeLength),
        cylinder: calculateCylinder(cylinderRadius, parseFloat(dimensions.height || '1'))
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Box className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Surface Area to Volume Ratio Calculator</h2>
          <p className="text-gray-600">Calculate SA:V ratio for different shapes</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shape
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={shape}
            onChange={(e) => {
              setShape(e.target.value as 'sphere' | 'cube' | 'cylinder');
              setDimensions({ radius: '', height: '', length: '' });
              setResult(null);
              setComparisonResults(null);
            }}
          >
            <option value="sphere">Sphere</option>
            <option value="cube">Cube</option>
            <option value="cylinder">Cylinder</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shape === 'sphere' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Radius (μm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={dimensions.radius}
                onChange={(e) => setDimensions({ ...dimensions, radius: e.target.value })}
                placeholder="Enter radius"
              />
            </div>
          )}

          {shape === 'cube' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (μm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={dimensions.length}
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                placeholder="Enter length"
              />
            </div>
          )}

          {shape === 'cylinder' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Radius (μm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={dimensions.radius}
                  onChange={(e) => setDimensions({ ...dimensions, radius: e.target.value })}
                  placeholder="Enter radius"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (μm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                  placeholder="Enter height"
                />
              </div>
            </>
          )}
        </div>

        <button
          className="btn w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={calculate}
        >
          Calculate Ratio
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Surface Area to Volume Ratio</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.ratio.toFixed(3)} μm⁻¹
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Surface Area</h3>
                <p className="text-gray-600">{result.surfaceArea.toFixed(2)} μm²</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Volume</h3>
                <p className="text-gray-600">{result.volume.toFixed(2)} μm³</p>
              </div>
            </div>

            {comparisonResults && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Shape Comparison (Same Volume)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sphere</span>
                    <span className="font-medium">{comparisonResults.sphere.ratio.toFixed(3)} μm⁻¹</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cube</span>
                    <span className="font-medium">{comparisonResults.cube.ratio.toFixed(3)} μm⁻¹</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cylinder</span>
                    <span className="font-medium">{comparisonResults.cylinder.ratio.toFixed(3)} μm⁻¹</span>
                  </div>
                </div>
              </div>
            )}

            <ShareResults
              title="Surface Area to Volume Ratio Results"
              text={`Surface Area to Volume Analysis:
• Shape: ${shape}
• SA:V Ratio: ${result.ratio.toFixed(3)} μm⁻¹
• Surface Area: ${result.surfaceArea.toFixed(2)} μm²
• Volume: ${result.volume.toFixed(2)} μm³

Shape Comparison (Same Volume):
• Sphere: ${comparisonResults?.sphere.ratio.toFixed(3)} μm⁻¹
• Cube: ${comparisonResults?.cube.ratio.toFixed(3)} μm⁻¹
• Cylinder: ${comparisonResults?.cylinder.ratio.toFixed(3)} μm⁻¹

Calculate surface area to volume ratios at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}