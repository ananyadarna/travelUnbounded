import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import DestinationSection from '@/components/DestinationSection';
import { indiaDestinations, internationalDestinations } from '@/data/destinations';
import { Compass, ShieldCheck, HeartHandshake, PhoneCall, Plane } from 'lucide-react';

export const metadata = {
  title: 'Travel Unbounded | Experiential Travel Experts',
  description: 'Explore curated travel packages for India and top international destinations. Personal vetted experiences, authentic itineraries, and 24x7 support.',
};

export default function HomePage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Banner */}
      <Hero />

      {/* Trust Badges Bar */}
      <div className="bg-white border-y border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Customized Trips</p>
                <p className="text-[11px] text-slate-500">Tailored to your itinerary</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">100% Verified</p>
                <p className="text-[11px] text-slate-500">Personally tested stays</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Local Expert Guides</p>
                <p className="text-[11px] text-slate-500">Native cultural insights</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">24x7 Support</p>
                <p className="text-[11px] text-slate-500">Dedicated trip manager</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div id="destinations">
        {/* India Destinations Grid */}
        <DestinationSection
          id="india-destinations"
          badgeText="Domestic Getaways"
          title="Explore Incredible India"
          subtitle="From Kerala's peaceful backwaters to Ladakh's high mountain passes, experience hand-picked Indian destinations."
          destinations={indiaDestinations}
        />

        {/* International Destinations Grid */}
        <DestinationSection
          id="international-destinations"
          badgeText="World Expeditions"
          title="Popular International Destinations"
          subtitle="Immerse yourself in wildlife safaris, tropical coasts, and northern lights across world-famous travel spots."
          destinations={internationalDestinations}
        />
      </div>

      {/* Call to Action Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Plane className="w-3.5 h-3.5 text-teal-300" /> Ready to travel?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Start Planning Your Bespoke Holiday Today
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Connect with our experienced travel designers to craft a custom itinerary tailored specifically to your dates, group size, and preferences.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
              >
                Submit Travel Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
