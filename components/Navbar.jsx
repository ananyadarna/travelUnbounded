'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                TRAVEL <span className="text-teal-700">UNBOUNDED</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400 block">
                Experiential Travel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link href="/" className="hover:text-teal-700 transition-colors py-1">
              Home
            </Link>
            <Link href="/#destinations" className="hover:text-teal-700 transition-colors py-1">
              Destinations
            </Link>
            <Link href="/about" className="hover:text-teal-700 transition-colors py-1">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-teal-700 transition-colors py-1">
              Contact
            </Link>
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 shadow-md shadow-teal-700/20 hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-slate-50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-base font-medium text-slate-700 hover:text-teal-700 border-b border-slate-50"
          >
            Home
          </Link>
          <Link
            href="/#destinations"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-base font-medium text-slate-700 hover:text-teal-700 border-b border-slate-50"
          >
            Destinations
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-base font-medium text-slate-700 hover:text-teal-700 border-b border-slate-50"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-base font-medium text-slate-700 hover:text-teal-700 border-b border-slate-50"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-teal-700 text-white font-semibold text-sm shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              Plan Your Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
