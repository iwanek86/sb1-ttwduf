import React from 'react';
import { BookOpen, FileText, Layers } from 'lucide-react';

const nomenclatureRules = [
  {
    title: 'IUPAC Rules',
    icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
    description: 'Systematic naming conventions for chemical compounds',
    points: [
      'Parent chain identification',
      'Numbering system rules',
      'Prefix and suffix usage',
      'Oxidation state notation'
    ]
  },
  {
    title: 'Common Names',
    icon: <FileText className="w-5 h-5 text-emerald-600" />,
    description: 'Traditional and widely used compound names',
    points: [
      'Historical naming patterns',
      'Industry standard names',
      'Trivial name recognition',
      'Regional variations'
    ]
  },
  {
    title: 'Formula Writing',
    icon: <Layers className="w-5 h-5 text-emerald-600" />,
    description: 'Rules for writing chemical formulas correctly',
    points: [
      'Element order conventions',
      'Subscript placement',
      'Charge notation',
      'Structural representation'
    ]
  }
];

export function NomenclatureGuide() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chemical Nomenclature Guide</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {nomenclatureRules.map((rule) => (
          <div key={rule.title} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                {rule.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{rule.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{rule.description}</p>
            <ul className="space-y-2">
              {rule.points.map((point) => (
                <li key={point} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}