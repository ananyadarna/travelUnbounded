import React from 'react';
import DestinationCard from './DestinationCard';

export default function DestinationSection({ id, title, subtitle, badgeText, destinations }) {
  return (
    <section id={id} className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          {badgeText && (
            <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {badgeText}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations?.map((destination) => (
            <DestinationCard key={destination.id || destination._id || destination.slug} destination={destination} />
          ))}
        </div>

      </div>
    </section>
  );
}
