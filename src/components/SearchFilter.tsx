import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { categories } from './CategoryGrid';
import { biologyCalculators } from '../data/biologyCalculators';
import { calculatorsByCategory } from '../data/calculators';

interface SearchResult {
  type: 'category' | 'calculator';
  id: string;
  name: string;
  description: string;
  path: string;
  category?: string;
}

interface SearchFilterProps {
  onSearch: (results: SearchResult[]) => void;
}

export function SearchFilter({ onSearch }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getAllItems = (): SearchResult[] => {
    const results: SearchResult[] = [];

    // Add categories
    categories.forEach(category => {
      results.push({
        type: 'category',
        id: `category-${category.id}`,
        name: category.name,
        description: `${category.name} calculators and tools`,
        path: `/category/${category.id}`
      });
    });

    // Add biology calculators
    Object.entries(biologyCalculators).forEach(([subcategoryId, calculators]) => {
      calculators.forEach(calc => {
        results.push({
          type: 'calculator',
          id: `biology-${subcategoryId}-${calc.id}`,
          name: calc.name,
          description: calc.description,
          path: `/calculator/${calc.id}`,
          category: 'Biology'
        });
      });
    });

    // Add other calculators
    Object.entries(calculatorsByCategory).forEach(([categoryName, calculators]) => {
      calculators.forEach(calc => {
        results.push({
          type: 'calculator',
          id: `${categoryName}-${calc.id}`,
          name: calc.name,
          description: calc.description,
          path: `/calculator/${calc.id}`,
          category: categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
        });
      });
    });

    return results;
  };

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();
    if (!searchTerm) {
      onSearch([]);
      return;
    }

    const allItems = getAllItems();
    const results = allItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      (item.category?.toLowerCase().includes(searchTerm))
    );

    onSearch(results);
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-12">
      <div className="relative">
        <input
          type="text"
          className="w-full px-12 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
          placeholder="Search categories and calculators..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
}