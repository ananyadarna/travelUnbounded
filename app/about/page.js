import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Users, Compass, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | Travel Unbounded',
  description: 'Learn about Travel Unbounded, our story, office locations in Bengaluru, Kochi, and Nairobi, and why travelers trust our experiential journeys.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider border border-teal-500/30">
            Our Story & Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About Travel Unbounded
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            India&apos;s premier experiential travel specialists crafting journeys built around people, authentic culture, and raw nature.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 text-teal-700">
            <Compass className="w-8 h-8" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              India&apos;s Most Trusted Experiential Travel Experts
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 text-base">
            <p>
              <strong>Travel Unbounded</strong> was born from a simple belief — that the best journeys aren&apos;t sold from a catalogue. They&apos;re built around the people taking them.
            </p>
            <p>
              Headquartered in Bangalore with offices in Kerala and Nairobi, we design trips that blend comfort, culture, and raw nature. Every destination, resort, and activity we recommend has been personally experienced by our team.
            </p>
            <p>
              From spotting the Big Five at dawn in the Masai Mara to cruising Ha Long Bay at sunset — we go where real stories are written, and we bring you along.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-teal-700 tracking-wider">The Unbounded Difference</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Why Choose Us</h2>
          <p className="text-sm text-slate-600">Four pillars that set our travel experiences apart.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Personally Vetted</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every resort, safari route, and excursion is personally tested and verified by our travel team before recommendation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Native Local Guides</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Travel alongside expert native guides who share rich cultural stories, wildlife tracking secrets, and local wisdom.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Tailor-Made Plans</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Flexible day-by-day itineraries customized to your preferred pace, budget, hotel standards, and interests.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">24x7 Concierge</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated trip managers available round the clock during your travel for seamless assistance and peace of mind.
            </p>
          </div>

        </div>
      </section>

      {/* Office Locations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-teal-700 tracking-wider">Global Reach</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Our Offices</h2>
          <p className="text-sm text-slate-600">Visit or contact our team across our three main hubs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Bengaluru HQ */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" /> Headquarters
              </div>
              <h3 className="text-xl font-bold text-slate-900">Bengaluru</h3>
              <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                <p className="font-semibold text-slate-800">541, 7th Main Rd, HAL 2nd Stage</p>
                <p>Indiranagar, Bengaluru - 560008</p>
                <p>India</p>
              </div>
            </div>
          </div>

          {/* Kochi Office */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" /> Kerala Office
              </div>
              <h3 className="text-xl font-bold text-slate-900">Kochi</h3>
              <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                <p className="font-semibold text-slate-800">LR Towers, S Janatha Road</p>
                <p>Palarivattom, Kochi - 682025</p>
                <p>India</p>
              </div>
            </div>
          </div>

          {/* Nairobi Office */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" /> Kenya Office
              </div>
              <h3 className="text-xl font-bold text-slate-900">Nairobi</h3>
              <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                <p className="font-semibold text-slate-800">Westpark Towers, Muthithi Road</p>
                <p>Nairobi, P.O. Box 6950, Postal Code 00100</p>
                <p>Kenya</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Footer */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-lg shadow-teal-700/20 transition-colors"
        >
          Plan Your Next Journey
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
