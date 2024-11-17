import React from 'react';
import { useParams } from 'react-router-dom';
import { Calculator, Beaker, Leaf, Brain, Dna, Microscope } from 'lucide-react';
import { categories } from '../components/CategoryGrid';
import { biologyCalculators } from '../data/biologyCalculators';
import { chemistryCalculators } from '../data/chemistryCalculators';
import { CategoryPageTemplate } from '../templates/CategoryPageTemplate';

const calculatorsByCategory = {
  biology: [
    { id: 'cell-biology', name: 'Cell Biology', description: 'Cellular calculations and analysis' },
    { id: 'genetics', name: 'Genetics', description: 'Genetic and heredity calculations' },
    { id: 'physiology', name: 'Physiology', description: 'Physiological processes and measurements' },
    { id: 'ecology', name: 'Ecology', description: 'Ecological calculations and population dynamics' },
    { id: 'biochemistry', name: 'Biochemistry', description: 'Biochemical reactions and processes' },
    { id: 'animal-pregnancy', name: 'Animal Pregnancy', description: 'Gestation period calculators for various animals' },
    { id: 'cat-health', name: 'Cat Health', description: 'Comprehensive cat health and medication calculators' }
  ],
  chemistry: [
    { id: 'general', name: 'General Chemistry', description: 'Basic atomic and molecular calculations' },
    { id: 'solutions', name: 'Solutions', description: 'Solution chemistry and concentration calculations' },
    { id: 'reactions', name: 'Reactions', description: 'Chemical reaction and stoichiometry calculations' }
  ],
  ecology: [
    { id: 'biodiversity', name: 'Biodiversity', description: 'Species diversity calculations' },
    { id: 'population', name: 'Population', description: 'Population dynamics analysis' }
  ]
};

const categoryIcons = {
  biology: <Calculator className="w-6 h-6" />,
  chemistry: <Beaker className="w-6 h-6" />,
  ecology: <Leaf className="w-6 h-6" />
};

const BiologyGuide = () => (
  <div className="mt-24 space-y-16">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-600" />
          Understanding Biological Calculations
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          Our comprehensive suite of biology calculators helps you analyze and understand complex biological processes, from cellular mechanics to ecosystem dynamics.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
        <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Dna className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Molecular Biology</h3>
        <p className="text-gray-600">
          Calculate DNA sequences, protein synthesis rates, and enzyme kinetics with precision. Perfect for molecular biology research and studies.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Microscope className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Cell Biology</h3>
        <p className="text-gray-600">
          Analyze cell size, division rates, and metabolic processes. Essential tools for understanding cellular dynamics and growth patterns.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Leaf className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Ecology</h3>
        <p className="text-gray-600">
          Study population dynamics, biodiversity indices, and ecosystem interactions with our specialized ecological calculators.
        </p>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="grid gap-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">How accurate are biological calculations?</h3>
          <p className="text-gray-600">Our calculators use peer-reviewed formulas and standardized methods to ensure high accuracy. However, biological systems are complex, so results should be considered alongside experimental data and real-world observations.</p>
        </div>
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Which calculator should I use for my research?</h3>
          <p className="text-gray-600">Choose based on your specific research area. For molecular studies, use our DNA and protein calculators. For ecological research, our population and diversity calculators are most appropriate. Each calculator includes detailed guidelines for its specific use case.</p>
        </div>
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Can I use these calculators for academic research?</h3>
          <p className="text-gray-600">Yes! Our calculators are designed for both educational and research purposes. They follow established scientific principles and can be cited in academic work. We recommend verifying critical calculations through multiple methods.</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How to Use Our Biology Calculators</h2>
      <div className="grid md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-blue-600">1</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Select Calculator</h3>
          <p className="text-gray-600">
            Choose the appropriate calculator for your specific biological analysis
          </p>
        </div>

        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-blue-600">2</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Input Data</h3>
          <p className="text-gray-600">
            Enter your experimental or observational data into the calculator
          </p>
        </div>

        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-blue-600">3</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Results</h3>
          <p className="text-gray-600">
            Get instant, accurate calculations with detailed analysis
          </p>
        </div>

        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-blue-600">4</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Export & Share</h3>
          <p className="text-gray-600">
            Save your results or share them with colleagues
          </p>
        </div>
      </div>
    </div>
  </div>
);

function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Category not found</p>
      </div>
    );
  }

  const categoryConfig = {
    ...categories.find(c => c.id === categoryId),
    icon: categoryIcons[categoryId as keyof typeof categoryIcons],
    subcategories: calculatorsByCategory[categoryId as keyof typeof calculatorsByCategory] || []
  };

  const getTotalCalculators = (catId: string) => {
    if (catId === 'biology') {
      return Object.values(biologyCalculators).reduce((total, subcategory) => total + subcategory.length, 0);
    }
    if (catId === 'chemistry') {
      return Object.values(chemistryCalculators).reduce((total, subcategory) => total + subcategory.length, 0);
    }
    return calculatorsByCategory[catId as keyof typeof calculatorsByCategory]?.length || 0;
  };

  const formatSubcategories = (catId: string) => {
    if (catId === 'biology') {
      return calculatorsByCategory.biology.map(sub => ({
        ...sub,
        calculators: biologyCalculators[sub.id as keyof typeof biologyCalculators] || []
      }));
    }
    if (catId === 'chemistry') {
      return calculatorsByCategory.chemistry.map(sub => ({
        ...sub,
        calculators: chemistryCalculators[sub.id as keyof typeof chemistryCalculators] || []
      }));
    }
    return calculatorsByCategory[catId as keyof typeof calculatorsByCategory]?.map(sub => ({
      ...sub,
      calculators: []
    })) || [];
  };

  return (
    <>
      <CategoryPageTemplate
        categoryConfig={categoryConfig}
        getTotalCalculators={() => getTotalCalculators(categoryId)}
        formatSubcategories={() => formatSubcategories(categoryId)}
      />
      {categoryId === 'biology' && <BiologyGuide />}
    </>
  );
}

export default CategoryPage;