import mongoose from 'mongoose';
import { memoryCollections, isFallbackMode } from '../config/db.js';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    default: 'Global',
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gallery: [{ type: String }],
  attractions: [{ type: String }],
  averageBudget: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    level: { type: String, default: 'Moderate' }, // Budget, Moderate, Luxury
  },
  bestTimeToVisit: {
    type: String,
    required: true,
  },
  categories: [{ type: String }], // Adventure, Beaches, Mountains, Culture, Food, etc.
  rating: {
    type: Number,
    default: 4.8,
  },
  reviewsCount: {
    type: Number,
    default: 120,
  },
  localCuisine: [{ type: String }],
  travelTips: [{ type: String }],
  nearbyDestinations: [{ type: String }],
  coordinates: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongooseDestination = mongoose.model('Destination', destinationSchema);

export const Destination = {
  async find(query = {}) {
    if (isFallbackMode()) {
      return memoryCollections.Destination.find(query);
    }
    return MongooseDestination.find(query);
  },
  async findById(id) {
    if (isFallbackMode()) {
      return memoryCollections.Destination.findById(id);
    }
    return MongooseDestination.findById(id);
  },
  async create(data) {
    if (isFallbackMode()) {
      return memoryCollections.Destination.create(data);
    }
    return MongooseDestination.create(data);
  },
  async insertMany(docs) {
    if (isFallbackMode()) {
      return memoryCollections.Destination.insertMany(docs);
    }
    return MongooseDestination.insertMany(docs);
  },
  async countDocuments(query = {}) {
    if (isFallbackMode()) {
      return memoryCollections.Destination.countDocuments(query);
    }
    return MongooseDestination.countDocuments(query);
  },
};

export default Destination;
