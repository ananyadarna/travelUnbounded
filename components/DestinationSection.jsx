import React from 'react';
import DestinationCard from './DestinationCard';

export default function DestinationSection({ id, title, subtitle, badgeText, destinations }) {
  return (
    <section id={id} className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          {badgeText && (
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-wider">
              {badgeText}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Responsive Spacious Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

      </div>
    </section>
  );
}
