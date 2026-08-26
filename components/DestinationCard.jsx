import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Check, Tag } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const { name, country, formattedPrice, image, description, highlights } = destination;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col hover:-translate-y-1">
      
      {/* Media Image Header */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Location Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1.5 border border-white/10 shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-teal-400" />
          <span>{country}</span>
        </div>

        {/* Destination Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-2xl font-extrabold tracking-tight group-hover:text-teal-300 transition-colors">
            {name}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          
          {/* Price Callout Row inside Card Body */}
          <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Package Rate</span>
            <div className="flex items-center gap-1 text-teal-800 font-extrabold text-sm">
              <Tag className="w-3.5 h-3.5 text-teal-600" />
              <span>Starting from {formattedPrice}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Experience Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Top Highlights
              </span>
              <div className="space-y-1">
                {highlights.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href={`/contact?destination=${encodeURIComponent(name)}`}
            className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Enquire Package</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
}
