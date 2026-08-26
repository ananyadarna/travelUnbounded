import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-slate-900 overflow-hidden text-white min-h-[560px] flex items-center">
      
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            Experiential & Curated Safaris
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
            India&apos;s Most Trusted <br />
            <span className="text-teal-400">Experiential Travel</span> Experts
          </h1>

          {/* Subheading Description */}
          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
            Discover journeys built around people, culture, and raw nature. From spotting the Big Five at dawn in Masai Mara to cruising tranquil Kerala backwaters — we go where real stories are written.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base shadow-xl shadow-teal-600/30 hover:shadow-teal-500/40 transition-colors"
            >
              Plan Your Trip
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="#destinations"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/20 transition-colors"
            >
              <Compass className="w-5 h-5 text-teal-300" />
              Explore Destinations
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Personally Vetted Trips</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Native Local Guides</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>24x7 Concierge Support</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
