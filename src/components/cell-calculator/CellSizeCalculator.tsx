import React, { useState } from 'react';
import { Box, Calculator } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface CellSizeCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface CellDimensions {
  length: number;
  width: number;
  height: number;
}

export function CellSizeCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-green-50 to-blue-50',
    secondaryColor: 'text-green-600',
    accentColor: 'bg-green-100'
  }
}: CellSizeCalculatorProps) {
  const [cellShape, setCellShape] = useState<'sphere' | 'cube' | 'cylinder' | 'custom'>('sphere');
  const [dimensions, setDimensions] = useState<CellDimensions>({
    length: 0,
    width: 0,
    height: 0
  });
  const [diameter, setDiameter] = useState<number>(0);
  const [result, setResult] = useState<{
    volume: number;
    surfaceArea: number;
    saToVolumeRatio: number;
  } | null>(null);

  const calculateSphericalCell = (d: number) => {
    const radius = d / 2;
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);
    const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
    return { volume, surfaceArea };
  };

  const calculateCubicCell = (side: number) => {
    const volume = Math.pow(side, 3);
    const surfaceArea = 6 * Math.pow(side, 2);
    return { volume, surfaceArea };
  };

  const calculateCylindricalCell = (d: number, h: number) => {
    const radius = d / 2;
    const volume = Math.PI * Math.pow(radius, 2) * h;
    const surfaceArea = 2 * Math.PI * radius * (radius + h);
    return { volume, surfaceArea };
  };

  const calculateCustomCell = (dims: CellDimensions) => {
    const volume = dims.length * dims.width * dims.height;
    const surfaceArea = 2 * (
      dims.length * dims.width +
      dims.length * dims.height +
      dims.width * dims.height
    );
    return { volume, surfaceArea };
  };

  const calculateSize = () => {
    let calculations;

    switch (cellShape) {
      case 'sphere':
        calculations = calculateSphericalCell(diameter);
        break;
      case 'cube':
        calculations = calculateCubicCell(diameter);
        break;
      case 'cylinder':
        calculations = calculateCylindricalCell(diameter, dimensions.height);
        break;
      case 'custom':
        calculations = calculateCustomCell(dimensions);
        break;
      default:
        return;
    }

    const { volume, surfaceArea } = calculations;
    setResult({
      volume,
      surfaceArea,
      saToVolumeRatio: surfaceArea / volume
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Box className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cell Size Calculator</h2>
          <p className="text-gray-600">Calculate cell volume and surface area to volume ratio</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cell Shape
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={cellShape}
            onChange={(e) => setCellShape(e.target.value as any)}
          >
            <option value="sphere">Spherical</option>
            <option value="cube">Cubic</option>
            <option value="cylinder">Cylindrical</option>
            <option value="custom">Custom Rectangular</option>
          </select>
        </div>

        {cellShape === 'custom' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (μm)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={dimensions.length || ''}
                onChange={(e) => setDimensions({...dimensions, length: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (μm)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={dimensions.width || ''}
                onChange={(e) => setDimensions({...dimensions, width: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (μm)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={dimensions.height || ''}
                onChange={(e) => setDimensions({...dimensions, height: parseFloat(e.target.value)})}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {cellShape === 'cylinder' ? 'Diameter' : 'Size'} (μm)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={diameter || ''}
                onChange={(e) => setDiameter(parseFloat(e.target.value))}
              />
            </div>
            {cellShape === 'cylinder' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (μm)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={dimensions.height || ''}
                  onChange={(e) => setDimensions({...dimensions, height: parseFloat(e.target.value)})}
                />
              </div>
            )}
          </div>
        )}

        <button
          className="btn w-full bg-green-600 hover:bg-green-700"
          onClick={calculateSize}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Volume</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.volume.toFixed(2)} μm³
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Surface Area</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.surfaceArea.toFixed(2)} μm²
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SA:V Ratio</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.saToVolumeRatio.toFixed(3)} μm⁻¹
                  </p>
                </div>
              </div>
            </div>

            <ShareResults
              title="Cell Size Calculator Results"
              text={`Cell Size Calculation Results:
• Shape: ${cellShape}
• Volume: ${result.volume.toFixed(2)} μm³
• Surface Area: ${result.surfaceArea.toFixed(2)} μm²
• SA:V Ratio: ${result.saToVolumeRatio.toFixed(3)} μm⁻¹

Calculate cell dimensions at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}