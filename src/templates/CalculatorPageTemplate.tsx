import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface CalculatorPageTemplateProps {
  title: string;
  description: string;
  keywords: string[];
  backLink: string;
  backLabel: string;
  introduction: {
    title: string;
    content: string;
  };
  calculator: ReactNode;
  additionalSections?: ReactNode[];
  notes?: string[];
  metaDescription?: string;
}

export function CalculatorPageTemplate({
  title,
  description,
  keywords,
  backLink,
  backLabel,
  introduction,
  calculator,
  additionalSections,
  notes,
  metaDescription
}: CalculatorPageTemplateProps) {
  return (
    <>
      <Helmet>
        <title>{title} | CalcFactory</title>
        <meta 
          name="description" 
          content={metaDescription || description}
        />
        <meta 
          name="keywords" 
          content={keywords.join(', ')}
        />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to={backLink}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backLabel}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{introduction.title}</h2>
          <p className="text-gray-600">{introduction.content}</p>
        </div>

        {calculator}

        {additionalSections?.map((section, index) => (
          <div key={index}>{section}</div>
        ))}

        {notes && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}