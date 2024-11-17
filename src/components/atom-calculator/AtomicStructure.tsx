import React from 'react';
import { Circle, Layers } from 'lucide-react';

const atomicComponents = [
  {
    name: 'Nucleus',
    description: 'The dense central region of an atom containing protons and neutrons',
    properties: [
      'Contains protons (positive charge)',
      'Contains neutrons (neutral charge)',
      'Most of the atom\'s mass',
      'Very small volume'
    ]
  },
  {
    name: 'Electron Shells',
    description: 'Regions around the nucleus where electrons are likely to be found',
    properties: [
      'Electrons orbit in shells',
      'Each shell has a maximum capacity',
      'Shells fill from inside out',
      'Determines atomic size'
    ]
  },
  {
    name: 'Valence Electrons',
    description: 'Electrons in the outermost shell that participate in chemical bonding',
    properties: [
      'Determines chemical properties',
      'Involved in bonding',
      'Maximum of 8 electrons',
      'Defines oxidation state'
    ]
  }
];

export function AtomicStructure() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Circle className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Atomic Structure Guide</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {atomicComponents.map((component) => (
          <div key={component.name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Layers className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{component.name}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{component.description}</p>
            <ul className="space-y-2">
              {component.properties.map((property) => (
                <li key={property} className="text-gray-600 text-sm flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  {property}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}