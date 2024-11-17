import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Calculator {
  id: string;
  name: string;
  description: string;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  calculators: Calculator[];
}

interface CategoryConfig {
  id?: string;
  name?: string;
  icon?: React.ReactNode;
  color?: string;
  subcategories: Subcategory[];
}

interface CategoryPageTemplateProps {
  categoryConfig: CategoryConfig;
  getTotalCalculators: () => number;
  formatSubcategories: () => Subcategory[];
}

export function CategoryPageTemplate({ 
  categoryConfig, 
  getTotalCalculators,
  formatSubcategories 
}: CategoryPageTemplateProps) {
  if (!categoryConfig.id) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Category not found</p>
      </div>
    );
  }

  const subcategories = formatSubcategories();
  const totalCalculators = getTotalCalculators();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Categories
      </Link>

      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`p-3 rounded-lg ${categoryConfig.color}`}>
            {categoryConfig.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryConfig.name} Calculators</h1>
            <p className="text-gray-600 mt-2">
              {totalCalculators} calculators available
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-600">
          Explore our collection of specialized {categoryConfig.name?.toLowerCase()} calculators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {subcategory.name}
              <span className="ml-2 text-sm text-gray-500">
                ({subcategory.calculators.length} calculators)
              </span>
            </h3>
            <p className="text-gray-600 mb-4">{subcategory.description}</p>
            <div className="space-y-2">
              {subcategory.calculators.map((calc) => (
                <Link
                  key={calc.id}
                  to={`/calculator/${calc.id}`}
                  className="block text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {calc.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}