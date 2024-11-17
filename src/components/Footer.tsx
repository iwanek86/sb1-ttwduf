import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CalcFactory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}