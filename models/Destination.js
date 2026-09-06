import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Destination title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['India', 'International'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  price: {
    type: String,
    required: [true, 'Starting price is required'],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  highlights: {
    type: [String],
    default: [],
  },
  isFeatured: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
