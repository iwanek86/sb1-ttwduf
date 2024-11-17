import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TestTube, 
  Leaf, 
  ArrowLeftRight, 
  Building2, 
  Coffee, 
  DollarSign, 
  Pi, 
  Dumbbell, 
  Apple, 
  Heart, 
  BarChart2, 
  MoreHorizontal 
} from 'lucide-react';

export const categories = [
  { id: 'biology', name: 'Biology', icon: <Calculator className="w-6 h-6" />, color: 'bg-red-100 text-red-600' },
  { id: 'chemistry', name: 'Chemistry', icon: <TestTube className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
  { id: 'ecology', name: 'Ecology', icon: <Leaf className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
  { id: 'conversion', name: 'Conversion', icon: <ArrowLeftRight className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
  { id: 'construction', name: 'Construction', icon: <Building2 className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'everyday', name: 'Everyday', icon: <Coffee className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600' },
  { id: 'finance', name: 'Finance', icon: <DollarSign className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600' },
  { id: 'math', name: 'Math', icon: <Pi className="w-6 h-6" />, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'sport', name: 'Sport', icon: <Dumbbell className="w-6 h-6" />, color: 'bg-pink-100 text-pink-600' },
  { id: 'food', name: 'Food', icon: <Apple className="w-6 h-6" />, color: 'bg-rose-100 text-rose-600' },
  { id: 'health', name: 'Health', icon: <Heart className="w-6 h-6" />, color: 'bg-red-100 text-red-600' },
  { id: 'statistics', name: 'Statistics', icon: <BarChart2 className="w-6 h-6" />, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'other', name: 'Other', icon: <MoreHorizontal className="w-6 h-6" />, color: 'bg-gray-100 text-gray-600' },
];

interface CategoryGridProps {
  filteredCategories: typeof categories;
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export function CategoryGrid({ filteredCategories, activeCategory, onCategoryClick }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCategories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className={`p-6 rounded-xl shadow-sm transition-all duration-200 ${
            category.color
          } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            activeCategory === category.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onCategoryClick(category.id)}
        >
          <div className="flex flex-col items-center space-y-4">
            {category.icon}
            <span className="text-lg font-medium">{category.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}