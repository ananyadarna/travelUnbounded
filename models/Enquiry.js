import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  countryCode: {
    type: String,
    default: '+91',
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
  },
  dateOfTravel: {
    type: Date,
    required: [true, 'Travel date is required'],
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Number of people is required'],
    min: [1, 'Number of people must be at least 1'],
  },
  hotelCategory: {
    type: String,
    required: [true, 'Hotel category is required'],
    enum: ['Standard', 'Deluxe', 'Luxury'],
  },
  numberOfChildren: {
    type: Number,
    default: 0,
    min: [0, 'Number of children cannot be negative'],
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Converted', 'Closed'],
    default: 'New',
  },
  notes: {
    type: String,
    default: '',
    trim: true,
  },
  itineraryId: {
    type: String,
    default: null,
  },
  itineraryDetails: {
    type: Object,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
