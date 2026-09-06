import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export default function DestinationCard({ destination }) {
  // Support both dynamic DB objects (title, location, price) and static data objects (name, country, formattedPrice)
  const cardTitle = destination.title || destination.name;
  const cardLocation = destination.location || destination.country;
  
  const getFormattedPrice = () => {
    if (typeof destination.price === 'string' && destination.price.trim().length > 0) {
      return destination.price;
    }
    if (destination.formattedPrice) {
      return `${destination.formattedPrice} per person`;
    }
    if (typeof destination.price === 'number') {
      return `₹${destination.price.toLocaleString('en-IN')} per person`;
    }
    return 'Custom Quote';
  };

  const cardPrice = getFormattedPrice();
  const image = destination.image;
  const description = destination.description;
  const highlights = destination.highlights || [];
  const duration = destination.duration || '5 Days';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-teal-600/30 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={cardTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        {/* Location Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-sm">
          <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
          <span>{cardLocation}</span>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          {duration}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors leading-tight">
            {cardTitle}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3.5">
          
          {/* Price Callout Container */}
          <div className="flex items-center justify-between bg-teal-50/60 px-3.5 py-2 rounded-xl border border-teal-100">
            <span className="text-[11px] font-bold text-teal-900 uppercase tracking-wider">Package Pricing</span>
            <span className="text-xs font-extrabold text-teal-800">{cardPrice}</span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Highlights List */}
          {highlights && highlights.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Key Experience Highlights
              </span>
              <div className="space-y-1">
                {highlights.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action Call to Action */}
        <div className="pt-2">
          <Link
            href={`/contact?destination=${encodeURIComponent(cardTitle)}`}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-2 shadow-sm group-hover:bg-teal-700"
          >
            <span>Enquire Custom Package</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
}
