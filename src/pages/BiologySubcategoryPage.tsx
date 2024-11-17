import React from 'react';
import { useParams } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { biologyCalculators } from '../data/biologyCalculators';
import { BackNavigation } from '../components/BackNavigation';

function BiologySubcategoryPage() {
  const { subcategoryId } = useParams();
  
  const subcategoryNames: Record<string, string> = {
    'cell-biology': 'Cell Biology',
    'genetics': 'Genetics',
    'physiology': 'Physiology',
    'ecology': 'Ecology',
    'biochemistry': 'Biochemistry',
    'animal-pregnancy': 'Animal Pregnancy',
    'cat-health': 'Cat Health'
  };

  const calculators = subcategoryId ? biologyCalculators[subcategoryId as keyof typeof biologyCalculators] : [];
  const subcategoryName = subcategoryId ? subcategoryNames[subcategoryId] : '';

  if (!calculators) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Subcategory not found</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackNavigation 
        to="/category/biology"
        label="Back to Biology"
        className="mb-8"
      />

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{subcategoryName} Calculators</h1>
        <p className="text-lg text-gray-600">
          Specialized calculators for {subcategoryName.toLowerCase()} calculations and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => (
          <div
            key={calculator.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{calculator.name}</h3>
                <p className="text-gray-600 mb-4">{calculator.description}</p>
                <a 
                  href={`/calculator/${calculator.id}`}
                  className="btn"
                >
                  Open Calculator
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default BiologySubcategoryPage;