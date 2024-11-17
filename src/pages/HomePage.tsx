import React, { useState } from 'react';
import { CategoryGrid, categories } from '../components/CategoryGrid';
import { PopularCalculators } from '../components/PopularCalculators';
import { SearchFilter } from '../components/SearchFilter';
import { SearchResults } from '../components/SearchResults';
import { Helmet } from 'react-helmet-async';
import { Calculator, Brain, Zap, Globe, Share2 } from 'lucide-react';

interface SearchResult {
  type: 'category' | 'calculator';
  id: string;
  name: string;
  description: string;
  path: string;
  category?: string;
}

function HomePage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <>
      <Helmet>
        <title>CalcFactory - Your One-Stop Calculator Solution | Free Online Calculators</title>
        <meta 
          name="description" 
          content="Access hundreds of free online calculators for science, math, chemistry, biology, and more. CalcFactory offers precise calculations, instant results, and expert insights for students, professionals, and researchers."
        />
        <meta 
          name="keywords" 
          content="online calculators, scientific calculator, math calculator, chemistry calculator, biology calculator, free calculator, calculation tools"
        />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Your One-Stop Calculator Solution
          </h1>
          <p className="text-xl text-gray-600">
            Access hundreds of specialized calculators for every field
          </p>
        </div>

        <SearchFilter onSearch={setSearchResults} />
        <SearchResults results={searchResults} />

        {searchResults.length === 0 && (
          <>
            <CategoryGrid 
              filteredCategories={categories}
              activeCategory={activeCategory}
              onCategoryClick={setActiveCategory}
            />
            <PopularCalculators />
          </>
        )}

        <div className="mt-24 space-y-24">
          {/* Rest of the content remains unchanged */}
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to CalcFactory</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Your comprehensive online calculation platform designed for students, professionals, researchers, and anyone seeking precise calculations across various fields.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Precision</h3>
              <p className="text-gray-600">
                Get accurate results with our rigorously tested calculation algorithms
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise</h3>
              <p className="text-gray-600">
                Developed by experts in their respective fields for reliable results
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Speed</h3>
              <p className="text-gray-600">
                Instant calculations and results for all your computational needs
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Free access to all calculators with no registration required
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How to Use CalcFactory</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Calculator</h3>
                <p className="text-gray-600">
                  Browse categories or use search to find your needed calculator
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Enter Values</h3>
                <p className="text-gray-600">
                  Input your data into the calculator's fields
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Results</h3>
                <p className="text-gray-600">
                  Receive instant, accurate calculations
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Results</h3>
                <p className="text-gray-600">
                  Share calculations with friends and colleagues
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose CalcFactory</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Time-Saving</h3>
                <p className="text-gray-600">Get quick results without complex manual calculations</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User-Friendly</h3>
                <p className="text-gray-600">Intuitive interface designed for ease of use</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive</h3>
                <p className="text-gray-600">Wide range of calculators for various fields</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Educational</h3>
                <p className="text-gray-600">Learn while calculating with detailed explanations</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile-Friendly</h3>
                <p className="text-gray-600">Access calculators on any device, anywhere</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Updates</h3>
                <p className="text-gray-600">New calculators and features added regularly</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;