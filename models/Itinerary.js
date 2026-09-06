import mongoose from 'mongoose';

const ItinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  preferences: {
    destinationType: String,
    travelStyle: String,
    budgetCategory: String,
    durationDays: Number,
    numberOfAdults: Number,
    numberOfChildren: Number,
  },
  summary: {
    type: String,
    trim: true,
  },
  estimatedCost: {
    type: String,
    trim: true,
  },
  stayCategory: {
    type: String,
    trim: true,
  },
  dayWisePlan: [
    {
      day: Number,
      title: String,
      morning: String,
      afternoon: String,
      evening: String,
      highlight: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Itinerary || mongoose.model('Itinerary', ItinerarySchema);
