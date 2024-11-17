import React, { useState } from 'react';
import { Leaf, Share2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { ShareResults } from '../ShareResults';

interface SpeciesDiversityCalculatorProps {
  theme?: 'light' | 'dark';
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

interface Species {
  name: string;
  count: number;
}

interface DiversityResult {
  shannonIndex: number;
  simpsonIndex: number;
  speciesRichness: number;
  evenness: number;
  totalIndividuals: number;
  dominantSpecies: {
    name: string;
    proportion: number;
  };
}

export function SpeciesDiversityCalculator({
  theme = 'light',
  customStyles = {
    primaryColor: 'from-lime-50 to-green-50',
    secondaryColor: 'text-lime-600',
    accentColor: 'bg-lime-100'
  }
}: SpeciesDiversityCalculatorProps) {
  const [species, setSpecies] = useState<Species[]>([{ name: '', count: 0 }]);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DiversityResult | null>(null);

  const addSpecies = () => {
    setSpecies([...species, { name: '', count: 0 }]);
  };

  const removeSpecies = (index: number) => {
    if (species.length > 1) {
      setSpecies(species.filter((_, i) => i !== index));
    }
  };

  const updateSpecies = (index: number, field: keyof Species, value: string | number) => {
    const newSpecies = [...species];
    newSpecies[index] = {
      ...newSpecies[index],
      [field]: field === 'count' ? parseInt(value as string) || 0 : value
    };
    setSpecies(newSpecies);
  };

  const calculateDiversity = () => {
    setError('');
    setResult(null);

    // Validate input
    if (species.some(s => !s.name || s.count <= 0)) {
      setError('Please provide valid species names and counts');
      return;
    }

    const totalIndividuals = species.reduce((sum, s) => sum + s.count, 0);
    const proportions = species.map(s => s.count / totalIndividuals);

    // Shannon-Wiener Index
    const shannonIndex = -proportions.reduce(
      (sum, p) => sum + (p * Math.log(p)),
      0
    );

    // Simpson's Index
    const simpsonIndex = 1 - proportions.reduce(
      (sum, p) => sum + Math.pow(p, 2),
      0
    );

    // Species Richness
    const speciesRichness = species.length;

    // Evenness (Pielou's evenness)
    const maxDiversity = Math.log(speciesRichness);
    const evenness = shannonIndex / maxDiversity;

    // Dominant Species
    const dominantSpecies = species.reduce((max, s) => 
      s.count > max.count ? s : max
    );

    setResult({
      shannonIndex,
      simpsonIndex,
      speciesRichness,
      evenness,
      totalIndividuals,
      dominantSpecies: {
        name: dominantSpecies.name,
        proportion: dominantSpecies.count / totalIndividuals
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={customStyles.accentColor + " p-3 rounded-lg"}>
          <Leaf className={`w-6 h-6 ${customStyles.secondaryColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Species Diversity Calculator</h2>
          <p className="text-gray-600">Calculate biodiversity indices and analyze community structure</p>
        </div>
      </div>

      <div className="space-y-6">
        {species.map((s, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Species Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                value={s.name}
                onChange={(e) => updateSpecies(index, 'name', e.target.value)}
                placeholder="Enter species name"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Individual Count
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  value={s.count || ''}
                  onChange={(e) => updateSpecies(index, 'count', e.target.value)}
                  placeholder="Enter count"
                />
                {species.length > 1 && (
                  <button
                    onClick={() => removeSpecies(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Remove species"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-lime-600 text-lime-600 rounded-lg hover:bg-lime-50"
            onClick={addSpecies}
          >
            <Plus className="w-4 h-4" />
            <span>Add Species</span>
          </button>
          <button
            className="btn flex-1 bg-lime-600 hover:bg-lime-700"
            onClick={calculateDiversity}
          >
            Calculate Diversity
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${customStyles.accentColor}`}>
              <h3 className="font-medium text-gray-900 mb-2">Diversity Indices</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Shannon-Wiener Index</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.shannonIndex.toFixed(3)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Simpson's Index</p>
                  <p className={`text-lg font-semibold ${customStyles.secondaryColor}`}>
                    {result.simpsonIndex.toFixed(3)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Species Richness</h3>
                <p className="text-gray-600">{result.speciesRichness} species</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Evenness</h3>
                <p className="text-gray-600">{result.evenness.toFixed(3)}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Total Individuals</h3>
                <p className="text-gray-600">{result.totalIndividuals}</p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Dominant Species</h3>
              <p className="text-gray-600">
                {result.dominantSpecies.name} ({(result.dominantSpecies.proportion * 100).toFixed(1)}% of population)
              </p>
            </div>

            <ShareResults
              title="Species Diversity Analysis Results"
              text={`Species Diversity Analysis:
• Shannon-Wiener Index: ${result.shannonIndex.toFixed(3)}
• Simpson's Index: ${result.simpsonIndex.toFixed(3)}
• Species Richness: ${result.speciesRichness} species
• Evenness: ${result.evenness.toFixed(3)}
• Total Individuals: ${result.totalIndividuals}
• Dominant Species: ${result.dominantSpecies.name} (${(result.dominantSpecies.proportion * 100).toFixed(1)}%)

Calculate species diversity at:`}
            />
          </div>
        )}
      </div>
    </div>
  );
}