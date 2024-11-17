import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CalcFactory</h1>
          </Link>
        </div>
      </div>
    </header>
  );
}