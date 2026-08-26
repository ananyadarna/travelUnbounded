'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, User, Mail, Phone, Users, Baby, Hotel, CheckCircle, AlertCircle, Send } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function BookingForm() {
  const searchParams = useSearchParams();
  const initialDestination = searchParams ? searchParams.get('destination') : '';

  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    contactNumber: '',
    email: '',
    dateOfTravel: '',
    numberOfPeople: 1,
    hotelCategory: 'Deluxe',
    numberOfChildren: 0,
    preferredDestination: initialDestination || '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  // Minimum date for travel date picker (Tomorrow's date string YYYY-MM-DD)
  const [minDateString, setMinDateString] = useState('');

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinDateString(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Update destination state if URL query param changes
  useEffect(() => {
    if (initialDestination) {
      setFormData((prev) => ({ ...prev, preferredDestination: initialDestination }));
    }
  }, [initialDestination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear inline error on field change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Client-side validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{7,15}$/.test(formData.contactNumber.replace(/[\s-]/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid phone number (digits only)';
    }

    if (!formData.dateOfTravel) {
      newErrors.dateOfTravel = 'Travel date is required';
    } else {
      const selectedDate = new Date(formData.dateOfTravel);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        newErrors.dateOfTravel = 'Travel date must be a future date';
      }
    }

    if (!formData.numberOfPeople || Number(formData.numberOfPeople) < 1) {
      newErrors.numberOfPeople = 'Number of people must be at least 1';
    }

    if (formData.numberOfChildren !== '' && Number(formData.numberOfChildren) < 0) {
      newErrors.numberOfChildren = 'Number of children cannot be negative';
    }

    if (!['Standard', 'Deluxe', 'Luxury'].includes(formData.hotelCategory)) {
      newErrors.hotelCategory = 'Please select a valid hotel category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('Thank you! Our travel expert will contact you within 24 hours.');
        // Reset form fields
        setFormData({
          fullName: '',
          countryCode: '+91',
          contactNumber: '',
          email: '',
          dateOfTravel: '',
          numberOfPeople: 1,
          hotelCategory: 'Deluxe',
          numberOfChildren: 0,
          preferredDestination: '',
        });
        setErrors({});
      } else {
        setServerError(data.message || 'Something went wrong while submitting your enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submission Error:', err);
      setServerError('Network error or server unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl max-w-2xl mx-auto space-y-6">
      
      {/* Form Header */}
      <div className="space-y-2 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Plan Your Customized Tour
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Book Your Experiential Journey
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Fill out your travel details below. Our travel team will contact you with a tailored itinerary.
        </p>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl flex items-start gap-3 shadow-xs animate-fade-in">
          <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Enquiry Submitted Successfully!</h4>
            <p className="text-xs text-emerald-700">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Server Error Banner */}
      {serverError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl flex items-start gap-3 shadow-xs animate-fade-in">
          <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Submission Error</h4>
            <p className="text-xs text-rose-700">{serverError}</p>
          </div>
        </div>
      )}

      {/* Form Controls */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-teal-600" /> Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Ananya Darna"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
              errors.fullName
                ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
            }`}
          />
          {errors.fullName && <p className="text-xs text-rose-600">{errors.fullName}</p>}
        </div>

        {/* Contact Phone Number & Country Code Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-teal-600" /> Contact Number <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 outline-none focus:border-teal-600"
            >
              <option value="+91">🇮🇳 +91 (India)</option>
              <option value="+1">🇺🇸 +1 (USA/Canada)</option>
              <option value="+44">🇬🇧 +44 (UK)</option>
              <option value="+61">🇦🇺 +61 (Australia)</option>
              <option value="+254">🇰🇪 +254 (Kenya)</option>
              <option value="+971">🇦🇪 +971 (UAE)</option>
            </select>

            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className={`flex-1 px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                errors.contactNumber
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
              }`}
            />
          </div>
          {errors.contactNumber && <p className="text-xs text-rose-600">{errors.contactNumber}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-teal-600" /> Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
              errors.email
                ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
            }`}
          />
          {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
        </div>

        {/* Date of Travel & Guests Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Date of Travel */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600" /> Date of Travel <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfTravel"
              value={formData.dateOfTravel}
              min={minDateString}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                errors.dateOfTravel
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
              }`}
            />
            {errors.dateOfTravel && <p className="text-xs text-rose-600">{errors.dateOfTravel}</p>}
          </div>

          {/* Number of People */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-teal-600" /> Number of Adults <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="numberOfPeople"
              min="1"
              value={formData.numberOfPeople}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                errors.numberOfPeople
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100'
              }`}
            />
            {errors.numberOfPeople && <p className="text-xs text-rose-600">{errors.numberOfPeople}</p>}
          </div>

        </div>

        {/* Hotel Category & Children Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Hotel Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-teal-600" /> Hotel Category <span className="text-rose-500">*</span>
            </label>
            <select
              name="hotelCategory"
              value={formData.hotelCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm transition-all outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            >
              <option value="Standard">Standard (3-Star)</option>
              <option value="Deluxe">Deluxe (4-Star)</option>
              <option value="Luxury">Luxury (5-Star / Resort)</option>
            </select>
          </div>

          {/* Number of Children */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Baby className="w-3.5 h-3.5 text-teal-600" /> Children (Optional)
            </label>
            <input
              type="number"
              name="numberOfChildren"
              min="0"
              value={formData.numberOfChildren}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm transition-all outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

        </div>

        {/* Preferred Destination */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Preferred Destination (Optional)
          </label>
          <input
            type="text"
            name="preferredDestination"
            value={formData.preferredDestination}
            onChange={handleChange}
            placeholder="e.g. Kerala, Masai Mara, Ha Long Bay..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm transition-all outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Travel Enquiry</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
