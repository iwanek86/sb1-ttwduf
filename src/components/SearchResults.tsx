import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FolderOpen } from 'lucide-react';

interface SearchResult {
  type: 'category' | 'calculator';
  id: string;
  name: string;
  description: string;
  path: string;
  category?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
        {results.map((result) => (
          <Link
            key={result.id}
            to={result.path}
            className="flex items-start space-x-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${
              result.type === 'category' ? 'bg-purple-100' : 'bg-blue-100'
            }`}>
              {result.type === 'category' ? (
                <FolderOpen className="w-6 h-6 text-purple-600" />
              ) : (
                <Calculator className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{result.name}</h3>
              <p className="text-gray-600">{result.description}</p>
              {result.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                  {result.category}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}