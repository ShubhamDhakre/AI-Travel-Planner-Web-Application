import mongoose from 'mongoose';
import { memoryCollections, isFallbackMode } from '../config/db.js';

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureCity: {
    type: String,
    default: '',
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  travelers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    type: { type: String, default: 'Solo' }, // Solo, Couple, Family, Friends
  },
  budget: {
    tier: { type: String, default: 'Moderate' }, // Budget, Moderate, Luxury
    total: { type: Number, default: 1500 },
    currency: { type: String, default: 'USD' },
  },
  travelPreferences: [{ type: String }],
  accommodationPreferences: {
    type: { type: String, default: 'Hotel' },
    tier: { type: String, default: 'Moderate' },
  },
  transportation: {
    type: String,
    default: 'Flight',
  },
  additionalNotes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Planning', 'Upcoming', 'Completed'],
    default: 'Planning',
  },
  coverImage: {
    type: String,
    default: '',
  },
  weatherInfo: {
    temperature: { type: String, default: '22°C' },
    condition: { type: String, default: 'Sunny' },
    icon: { type: String, default: 'sun' },
    forecast: { type: String, default: 'Pleasant and mild' },
  },
  itinerary: [
    {
      day: { type: Number, required: true },
      date: { type: String },
      title: { type: String, required: true },
      description: { type: String },
      theme: { type: String },
      morning: {
        activities: [{ type: String }],
        places: [{ type: String }],
        estimatedCost: { type: Number, default: 0 },
      },
      afternoon: {
        activities: [{ type: String }],
        places: [{ type: String }],
        lunchRecommendation: { type: String },
        estimatedCost: { type: Number, default: 0 },
      },
      evening: {
        activities: [{ type: String }],
        places: [{ type: String }],
        dinnerRecommendation: { type: String },
        estimatedCost: { type: Number, default: 0 },
      },
      transportation: { type: String },
      travelTime: { type: String },
      dailyEstimatedBudget: { type: Number, default: 0 },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
  ],
  expenses: {
    transportation: { type: Number, default: 0 },
    accommodation: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    activities: { type: Number, default: 0 },
    shopping: { type: Number, default: 0 },
    miscellaneous: { type: Number, default: 0 },
    customItems: [
      {
        id: { type: String },
        category: { type: String },
        name: { type: String },
        amount: { type: Number },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongooseTrip = mongoose.model('Trip', tripSchema);

export const Trip = {
  async find(query = {}) {
    if (isFallbackMode()) {
      return memoryCollections.Trip.find(query);
    }
    return MongooseTrip.find(query).sort({ createdAt: -1 });
  },
  async findById(id) {
    if (isFallbackMode()) {
      return memoryCollections.Trip.findById(id);
    }
    return MongooseTrip.findById(id);
  },
  async create(data) {
    if (isFallbackMode()) {
      return memoryCollections.Trip.create(data);
    }
    return MongooseTrip.create(data);
  },
  async findByIdAndUpdate(id, updates) {
    if (isFallbackMode()) {
      return memoryCollections.Trip.findByIdAndUpdate(id, updates);
    }
    return MongooseTrip.findByIdAndUpdate(id, updates, { new: true });
  },
  async findByIdAndDelete(id) {
    if (isFallbackMode()) {
      return memoryCollections.Trip.findByIdAndDelete(id);
    }
    return MongooseTrip.findByIdAndDelete(id);
  },
};

export default Trip;
