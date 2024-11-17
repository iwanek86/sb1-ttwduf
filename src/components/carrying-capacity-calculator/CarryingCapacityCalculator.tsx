import React, { useState } from 'react';
import { Scale, Share2, AlertCircle } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface CarryingCapacityCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface Resource {
  name: string;
  available: number;
  perIndividual: number;
}

interface CapacityResult {
  totalCapacity: number;
  limitingResource: string;
  resourceUtilization: {
    resource: string;
    capacity: number;
    utilizationPercent: number;
  }[];
  sustainabilityScore: number;
  recommendations: string[];
}

export function CarryingCapacityCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-emerald-50 to-green-50',
    secondaryColor: 'text-emerald-600',
    accentColor: 'bg-emerald-100'
  }
}: CarryingCapacityCalculatorProps) {
  const [resources, setResources] = useState<Resource[]>([
    { name: 'Food', available: 0, perIndividual: 0 },
    { name: 'Water', available: 0, perIndividual: 0 },
    { name: 'Space', available: 0, perIndividual: 0 }
  ]);
  const [currentPopulation, setCurrentPopulation] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<CapacityResult | null>(null);

  const calculateCapacity = () => {
    setError('');
    setResult(null);

    try {
      // Validate inputs
      if (resources.some(r => r.available <= 0 || r.perIndividual <= 0)) {
        setError('Please enter valid resource values');
        return;
      }

      // Calculate capacity for each resource
      const capacities = resources.map(resource => ({
        resource: resource.name,
        capacity: Math.floor(resource.available / resource.perIndividual),
        utilizationPercent: parseFloat(currentPopulation) / (resource.available / resource.perIndividual) * 100
      }));

      // Find limiting resource (lowest capacity)
      const limitingCapacity = capacities.reduce((min, current) => 
        current.capacity < min.capacity ? current : min
      );

      // Calculate sustainability score (0-100)
      const sustainabilityScore = Math.min(100, Math.max(0,
        100 - (parseFloat(currentPopulation) / limitingCapacity.capacity * 100)
      ));

      // Generate recommendations
      const recommendations = [
        sustainabilityScore < 50 ? 'Reduce population or increase resources' : 'Population level is sustainable',
        `Focus on managing ${limitingCapacity.resource.toLowerCase()} availability`,
        'Monitor resource consumption trends',
        'Consider seasonal resource variations',
        'Implement resource conservation measures'
      ];

      setResult({
        totalCapacity: limitingCapacity.capacity,
        limitingResource: limitingCapacity.resource,
        resourceUtilization: capacities,
        sustainabilityScore,
        recommendations
      });
    } catch (err) {
      setError('Invalid input values');
    }
  };

  const updateResource = (index: number, field: keyof Resource, value: number) => {
    const newResources = [...resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setResources(newResources);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Scale className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Carrying Capacity Calculator</h2>
          <p className="text-gray-600">Calculate sustainable population limits based on resources</p>
        </div>
      </div>

      <div className="space-y-6">
        {resources.map((resource, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {resource.name} Available
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={resource.available || ''}
                onChange={(e) => updateResource(index, 'available', parseFloat(e.target.value))}
                placeholder={`Enter total ${resource.name.toLowerCase()} available`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {resource.name} Per Individual
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={resource.perIndividual || ''}
                onChange={(e) => updateResource(index, 'perIndividual', parseFloat(e.target.value))}
                placeholder={`Enter ${resource.name.toLowerCase()} needed per individual`}
              />
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Population
          </label>
          <input
            type="number"
            min="0"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={currentPopulation}
            onChange={(e) => setCurrentPopulation(e.target.value)}
            placeholder="Enter current population size"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <button
          className="btn w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={calculateCapacity}
        >
          Calculate Carrying Capacity
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Maximum Carrying Capacity</h3>
              <p className={`text-2xl font-bold ${customStyles.secondaryColor}`}>
                {result.totalCapacity.toLocaleString()} individuals
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Limited by {result.limitingResource.toLowerCase()} availability
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Resource Utilization</h3>
              <div className="space-y-4">
                {result.resourceUtilization.map((resource) => (
                  <div key={resource.resource}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">{resource.resource}</span>
                      <span className="text-sm font-medium">
                        {resource.utilizationPercent.toFixed(1)}% utilized
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${Math.min(100, resource.utilizationPercent)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Sustainability Score</h3>
                <p className={`text-lg font-semibold ${
                  result.sustainabilityScore > 75 ? 'text-green-600' :
                  result.sustainabilityScore > 50 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {result.sustainabilityScore.toFixed(1)}%
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Population Status</h3>
                <p className="text-gray-600">
                  {parseFloat(currentPopulation) > result.totalCapacity ? 'Over capacity' : 'Within capacity'}
                </p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <ShareResults
              title="Carrying Capacity Analysis Results"
              text={`Carrying Capacity Analysis:
• Maximum Capacity: ${result.totalCapacity.toLocaleString()} individuals
• Limiting Resource: ${result.limitingResource}
• Sustainability Score: ${result.sustainabilityScore.toFixed(1)}%
• Resource Utilization:
${result.resourceUtilization.map(r => 
  `  - ${r.resource}: ${r.utilizationPercent.toFixed(1)}% utilized`
).join('\n')}

Calculate carrying capacity at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}