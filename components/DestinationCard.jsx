import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Tag, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const { id, name, country, formattedPrice, image, description, highlights } = destination;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      
      {/* Destination Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Country Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <MapPin className="w-3 h-3 text-teal-400" />
          {country}
        </div>

        {/* Destination Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-xl font-bold tracking-tight drop-shadow-sm">{name}</h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Price Header */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Package Rate</span>
            <div className="flex items-center gap-1 text-teal-700 font-extrabold text-lg">
              <Tag className="w-4 h-4 text-teal-600" />
              <span>Starting from {formattedPrice}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-1">
              {highlights.slice(0, 2).map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                  <span className="truncate">{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link
            href={`/contact?destination=${encodeURIComponent(name)}`}
            className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            Enquire Now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
