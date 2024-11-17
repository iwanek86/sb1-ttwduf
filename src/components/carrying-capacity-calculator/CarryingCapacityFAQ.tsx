import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is carrying capacity?',
    answer: 'Carrying capacity is the maximum population size that can be sustained indefinitely in an environment given the available resources (food, water, space, etc.). It represents the balance between population growth and resource limitations.'
  },
  {
    question: 'How is carrying capacity calculated?',
    answer: 'Carrying capacity is calculated by analyzing available resources and the requirements per individual. The most limiting resource determines the overall capacity. Multiple factors including food, water, space, and other environmental resources are considered.'
  },
  {
    question: 'Why do carrying capacities change?',
    answer: 'Carrying capacities can change due to seasonal variations in resource availability, environmental changes, habitat modification, competition with other species, and human activities that affect resource availability or quality.'
  },
  {
    question: 'What affects resource utilization?',
    answer: 'Resource utilization is affected by population size, individual requirements, resource availability, efficiency of resource use, competition, and environmental conditions. Different populations may use resources more or less efficiently.'
  },
  {
    question: 'How can carrying capacity be increased?',
    answer: 'Carrying capacity can be increased by improving resource availability, reducing individual resource requirements, increasing resource use efficiency, enhancing habitat quality, or reducing competition for resources.'
  }
];

export function CarryingCapacityFAQ() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-b border-gray-200 pb-6 last:border-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}