import React from 'react';
import { Calculator } from 'lucide-react';
import { BackNavigation } from './BackNavigation';

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

interface CategoryTemplateProps {
  categoryName: string;
  categoryDescription: string;
  categoryIcon: React.ReactNode;
  categoryColor: string;
  backLink: string;
  backLabel: string;
  subcategories: Subcategory[];
  totalCalculators: number;
}

export function CategoryTemplate({
  categoryName,
  categoryDescription,
  categoryIcon,
  categoryColor,
  backLink,
  backLabel,
  subcategories,
  totalCalculators
}: CategoryTemplateProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackNavigation 
        to={backLink}
        label={backLabel}
        className="mb-8"
      />

      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`p-3 rounded-lg ${categoryColor}`}>
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName} Calculators</h1>
            <p className="text-gray-600 mt-2">
              {totalCalculators} calculators available
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-600">
          {categoryDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {subcategory.name}
                  <span className="ml-2 text-sm text-gray-500">
                    ({subcategory.calculators.length} calculators)
                  </span>
                </h3>
                <p className="text-gray-600 mb-4">{subcategory.description}</p>
                <div className="space-y-2">
                  {subcategory.calculators.map((calc) => (
                    <a
                      key={calc.id}
                      href={`/calculator/${calc.id}`}
                      className="block text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {calc.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}