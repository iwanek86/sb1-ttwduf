import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackNavigationProps {
  to: string;
  label: string;
  className?: string;
}

export function BackNavigation({ to, label, className = '' }: BackNavigationProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center text-blue-600 hover:text-blue-800 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Link>
  );
}