import React from 'react';
import DestinationCard from './DestinationCard';

export default function DestinationSection({ id, title, subtitle, badgeText, destinations }) {
  return (
    <section id={id} className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          {badgeText && (
            <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {badgeText}
            </span>
          )}
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

      </div>
    </section>
  );
}
