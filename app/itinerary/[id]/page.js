'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Compass, Calendar, Users, DollarSign, ArrowRight, Printer, Share2, Sparkles, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ShareableItineraryPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchItinerary() {
      try {
        const res = await fetch(`/api/itinerary/${params.id}`);
        const result = await res.json();
        if (result.success) {
          setItinerary(result.data);
        } else {
          setError(result.message || 'Itinerary not found');
        }
      } catch (err) {
        setError('Failed to load itinerary. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    }
    fetchItinerary();
  }, [params.id]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner />
        <p className="text-slate-600 font-medium">Loading your personalized itinerary...</p>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Itinerary Not Found</h1>
        <p className="text-slate-600">{error || 'This itinerary link may have expired or is invalid.'}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const { title, destination, summary, estimatedCost, stayCategory, dayWisePlan, preferences } = itinerary;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 print:p-0 print:m-0 print:max-w-none">
        
        {/* Header Navigation (Hidden on Print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
          >
            ← Back to Travel Unbounded
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-100 shadow-sm transition-colors"
            >
              <Share2 className="w-4 h-4 text-teal-600" />
              {copied ? 'Link Copied!' : 'Share Plan'}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4 text-teal-400" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Custom Travel Unbounded Itinerary
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            {summary}
          </p>

          {/* Key Meta Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-teal-400" /> Destination
              </span>
              <p className="text-white font-bold text-sm sm:text-base truncate">{destination}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-teal-400" /> Duration
              </span>
              <p className="text-white font-bold text-sm sm:text-base">{preferences?.durationDays || dayWisePlan?.length} Days</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-teal-400" /> Travelers
              </span>
              <p className="text-white font-bold text-sm sm:text-base">{preferences?.numberOfAdults || 2} Adults {preferences?.numberOfChildren > 0 ? `, ${preferences.numberOfChildren} Kids` : ''}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-teal-400" /> Est. Cost
              </span>
              <p className="text-teal-400 font-bold text-sm sm:text-base">{estimatedCost}</p>
            </div>
          </div>
        </div>

        {/* Accommodation & Hospitality Highlight */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-700">Recommended Accommodation</h3>
            <p className="text-slate-700 font-semibold text-base">{stayCategory}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            100% Handpicked & Verified Stays
          </div>
        </div>

        {/* Day-Wise Plan Schedule */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 border-b pb-3 border-slate-200">
            Day-by-Day Experience Schedule
          </h2>

          <div className="space-y-6">
            {dayWisePlan?.map((item) => (
              <div
                key={item.day}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-700 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                      {item.day}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Day {item.day}: {item.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-700">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">Morning</span>
                    <p className="leading-relaxed text-slate-600">{item.morning}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">Afternoon</span>
                    <p className="leading-relaxed text-slate-600">{item.afternoon}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">Evening</span>
                    <p className="leading-relaxed text-slate-600">{item.evening}</p>
                  </div>
                </div>

                {item.highlight && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50/80 px-4 py-2.5 rounded-xl border border-teal-100">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Day Highlight:</strong> {item.highlight}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner (Hidden on Print) */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-extrabold">Ready to Book This Itinerary?</h3>
            <p className="text-slate-300 text-sm font-light">
              Submit your dates and our dedicated travel concierge will customize and reserve this trip for you.
            </p>
          </div>
          <Link
            href={`/contact?itineraryId=${itinerary._id}&destination=${encodeURIComponent(destination)}`}
            className="px-8 py-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-transform shrink-0 flex items-center gap-2"
          >
            Book This Itinerary
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
