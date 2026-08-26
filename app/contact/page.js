import React, { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MapPin, Mail, PhoneCall, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Plan Your Trip / Contact Us | Travel Unbounded',
  description: 'Submit your travel enquiry to plan a customized trip to Kerala, Ladakh, Kenya, Ha Long Bay and more. Get 24x7 travel designer support.',
};

export default function ContactPage() {
  return (
    <div className="space-y-16 py-12 pb-24">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Direct Concierge Service
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Plan Your Unbounded Journey
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto font-normal">
          Tell us about your dream destination, travel dates, and group preferences. Our experiential travel designers will craft a personalized itinerary for you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Booking Form (Suspense boundary for searchParams) */}
          <div className="lg:col-span-7">
            <Suspense fallback={
              <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-xl text-center space-y-4">
                <LoadingSpinner size="lg" className="text-teal-700" />
                <p className="text-sm text-slate-500 font-medium">Loading booking form...</p>
              </div>
            }>
              <BookingForm />
            </Suspense>
          </div>

          {/* Side Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Why Book With Us */}
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-extrabold tracking-tight">What Happens Next?</h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Enquiry Review</h4>
                    <p className="text-slate-300">Our travel designer assigned to your destination reviews your travel preferences.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Customized Itinerary Draft</h4>
                    <p className="text-slate-300">We send a day-wise itinerary draft with hotel options and pricing via email/WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Trip Refinement & Confirmation</h4>
                    <p className="text-slate-300">Refine activities or stay choices until your itinerary is 100% perfect.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-teal-300 font-medium">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Response guaranteed within 24 business hours</span>
              </div>
            </div>

            {/* Direct Contact Offices Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900">Direct Office Contacts</h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" /> Bengaluru HQ
                  </p>
                  <p>541, 7th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru – 560008</p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" /> Kochi Office
                  </p>
                  <p>LR Towers, S Janatha Road, Palarivattom, Kochi – 682025</p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" /> Nairobi Office
                  </p>
                  <p>Westpark Towers, Muthithi Road, Nairobi, P.O. Box 6950, Code 00100</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
