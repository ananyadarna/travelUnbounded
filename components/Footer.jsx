import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                TRAVEL <span className="text-teal-400">UNBOUNDED</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              India&apos;s most trusted experiential travel experts. We design tailor-made journeys that blend comfort, authentic culture, and raw nature.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#india-destinations" className="hover:text-teal-400 transition-colors">
                  India Packages
                </Link>
              </li>
              <li>
                <Link href="/#international-destinations" className="hover:text-teal-400 transition-colors">
                  International Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Us & Offices
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Plan Your Trip / Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Locations Summary */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-white font-semibold text-base">Our Global Offices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              
              <div className="space-y-1 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" /> Bengaluru HQ
                </p>
                <p>541, 7th Main Rd, HAL 2nd Stage</p>
                <p>Indiranagar, Bengaluru - 560008</p>
              </div>

              <div className="space-y-1 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" /> Kochi Office
                </p>
                <p>LR Towers, S Janatha Road</p>
                <p>Palarivattom, Kochi - 682025</p>
              </div>

              <div className="space-y-1 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" /> Nairobi Office
                </p>
                <p>Westpark Towers, Muthithi Rd</p>
                <p>Nairobi, P.O. Box 6950</p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Travel Unbounded. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for experiential travelers.
          </p>
        </div>
      </div>
    </footer>
  );
}
