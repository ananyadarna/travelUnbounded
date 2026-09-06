'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bot, X, Sparkles, Send, Compass, Calendar, Users, DollarSign, ArrowRight, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AIChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  // User preference state
  const [preferences, setPreferences] = useState({
    destinationType: 'India',
    travelStyle: 'Wildlife Safari',
    budgetCategory: 'Mid-Range',
    durationDays: 5,
    adults: 2,
    children: 0,
  });

  const travelStyleOptions = [
    { label: 'Wildlife Safari', desc: 'Tiger tracking & native game drives' },
    { label: 'Kerala Backwaters', desc: 'Houseboats & spice plantations' },
    { label: 'Himalayan Trek', desc: 'High mountain passes & monasteries' },
    { label: 'Tropical Coast', desc: 'Beaches, coral reefs & island tours' },
    { label: 'Culture & Heritage', desc: 'Ancient monuments & local crafts' },
    { label: 'Luxury Relaxation', desc: 'Boutique eco-resorts & wellness' },
  ];

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      generateItinerary();
    }
  };

  const generateItinerary = async () => {
    setLoading(true);
    setStep(5); // Loading / Result view
    try {
      const res = await fetch('/api/chat/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
      const result = await res.json();
      if (result.success) {
        setGeneratedItinerary(result);
      } else {
        alert(result.message || 'Failed to generate itinerary');
        setStep(4);
      }
    } catch (err) {
      alert('Error generating itinerary. Please try again.');
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setStep(1);
    setGeneratedItinerary(null);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 print:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white font-bold shadow-2xl hover:shadow-teal-700/40 hover:scale-105 transition-all duration-300 border border-teal-400/30"
          aria-label="Open AI Travel Planner"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-teal-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
          </div>
          <span className="text-sm tracking-wide hidden sm:inline">AI Trip Planner</span>
          <Sparkles className="w-4 h-4 text-teal-400 opacity-80 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Chat Drawer / Modal Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[620px] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl z-50 overflow-hidden flex flex-col print:hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Travel Unbounded AI <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                </h3>
                <p className="text-[11px] text-teal-300/80">Custom Day-by-Day Itinerary Designer</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 overflow-y-auto flex-1 space-y-5 text-sm text-slate-200">
            
            {/* Step 1: Destination Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  👋 <strong>Hello traveler!</strong> Where would you like to plan your custom journey?
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-teal-400 uppercase tracking-wider block">
                    Choose Destination Region
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['India', 'International'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setPreferences({ ...preferences, destinationType: type })}
                        className={`p-3.5 rounded-xl text-left border text-xs font-bold transition-all ${
                          preferences.destinationType === type
                            ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-600/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {type === 'India' ? '🇮🇳 Incredible India' : '🌍 World Expeditions'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
                >
                  Continue to Travel Style
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Travel Style Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
                  What experience vibe are you seeking for your {preferences.destinationType} trip?
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {travelStyleOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setPreferences({ ...preferences, travelStyle: opt.label })}
                      className={`w-full p-3 rounded-xl text-left border transition-all ${
                        preferences.travelStyle === opt.label
                          ? 'bg-teal-600/30 border-teal-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-bold text-xs text-white">{opt.label}</p>
                      <p className="text-[11px] text-slate-400 font-light">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="w-2/3 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    Continue to Budget
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Budget Category */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
                  Select your preferred accommodation & experience tier:
                </div>

                <div className="space-y-2.5">
                  {[
                    { tier: 'Budget', label: 'Comfort Essential', desc: 'Handpicked 3★ eco-stays & shared small group experiences' },
                    { tier: 'Mid-Range', label: 'Experiential Deluxe', desc: 'Boutique heritage hotels, private transfers & native guides' },
                    { tier: 'Luxury', label: 'Ultra Luxury Safari', desc: '5★ wilderness lodges, private houseboats & exclusive access' },
                  ].map((b) => (
                    <button
                      key={b.tier}
                      onClick={() => setPreferences({ ...preferences, budgetCategory: b.tier })}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                        preferences.budgetCategory === b.tier
                          ? 'bg-teal-600/30 border-teal-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-bold text-xs text-teal-300">{b.label} ({b.tier})</p>
                      <p className="text-[11px] text-slate-400 font-light">{b.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="w-2/3 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    Set Duration & Group
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Duration & Group Details */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
                  Finally, specify your trip duration and number of travelers:
                </div>

                <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <label className="text-slate-400 font-medium block mb-1">Trip Duration (Days):</label>
                    <input
                      type="number"
                      min="2"
                      max="14"
                      value={preferences.durationDays}
                      onChange={(e) => setPreferences({ ...preferences, durationDays: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-bold focus:border-teal-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">Adults (12+ yrs):</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={preferences.adults}
                        onChange={(e) => setPreferences({ ...preferences, adults: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-bold focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">Children (0-11 yrs):</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={preferences.children}
                        onChange={(e) => setPreferences({ ...preferences, children: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-bold focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(3)}
                    className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={generateItinerary}
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    Generate AI Itinerary
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Loading State or Display Generated Itinerary */}
            {step === 5 && (
              <div>
                {loading ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-teal-300 font-bold text-sm">Designing your custom day-wise itinerary...</p>
                    <p className="text-xs text-slate-400 font-light">Selecting vetted stays, native experiences & route timings.</p>
                  </div>
                ) : generatedItinerary ? (
                  <div className="space-y-4">
                    <div className="bg-teal-950/60 p-3.5 rounded-2xl border border-teal-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Custom Plan Ready
                        </span>
                        <span className="text-xs font-bold text-emerald-400">{generatedItinerary.data.estimatedCost}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug">
                        {generatedItinerary.data.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        {generatedItinerary.data.summary}
                      </p>
                    </div>

                    {/* Day Highlights Preview */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Itinerary Schedule Overview</p>
                      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 text-xs">
                        {generatedItinerary.data.dayWisePlan?.map((d) => (
                          <div key={d.day} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                            <span className="font-bold text-teal-400">Day {d.day}: {d.title}</span>
                            <p className="text-[11px] text-slate-400 line-clamp-2">{d.morning}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2">
                      <Link
                        href={`/itinerary/${generatedItinerary.itineraryId}`}
                        target="_blank"
                        className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View & Print Full Itinerary
                      </Link>

                      <Link
                        href={`/contact?itineraryId=${generatedItinerary.itineraryId}&destination=${encodeURIComponent(generatedItinerary.data.destination)}`}
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        Book This Custom Trip
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={resetChat}
                        className="w-full py-2 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Design Another Itinerary
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
}
