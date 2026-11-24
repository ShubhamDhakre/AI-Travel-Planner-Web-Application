import mongoose from 'mongoose';
import { memoryCollections, isFallbackMode } from '../config/db.js';

const savedDestinationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongooseSavedDestination = mongoose.model('SavedDestination', savedDestinationSchema);

export const SavedDestination = {
  async find(query = {}) {
    if (isFallbackMode()) {
      return memoryCollections.SavedDestination.find(query);
    }
    return MongooseSavedDestination.find(query);
  },
  async findOne(query = {}) {
    if (isFallbackMode()) {
      return memoryCollections.SavedDestination.findOne(query);
    }
    return MongooseSavedDestination.findOne(query);
  },
  async create(data) {
    if (isFallbackMode()) {
      return memoryCollections.SavedDestination.create(data);
    }
    return MongooseSavedDestination.create(data);
  },
  async deleteOne(query = {}) {
    if (isFallbackMode()) {
      return memoryCollections.SavedDestination.deleteOne(query);
    }
    return MongooseSavedDestination.deleteOne(query);
  },
};

export default SavedDestination;
