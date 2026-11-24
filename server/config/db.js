import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isUsingFallbackStore = false;
const dataDir = path.join(__dirname, '../data');
const dbFilePath = path.join(dataDir, 'db.json');

// Resilient in-memory / file-backed fallback store
class MemoryCollection {
  constructor(name) {
    this.name = name;
  }

  _readAll() {
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (!fs.existsSync(dbFilePath)) {
        fs.writeFileSync(dbFilePath, JSON.stringify({ users: [], trips: [], destinations: [], saveddestinations: [] }, null, 2));
      }
      const raw = fs.readFileSync(dbFilePath, 'utf8');
      const data = JSON.parse(raw);
      return data[this.name] || [];
    } catch {
      return [];
    }
  }

  _writeAll(items) {
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      let data = {};
      if (fs.existsSync(dbFilePath)) {
        data = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
      }
      data[this.name] = items;
      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`Error saving ${this.name}:`, e);
    }
  }

  async find(query = {}) {
    let items = this._readAll();
    return items.filter(item => {
      for (const key of Object.keys(query)) {
        if (query[key] !== undefined && String(item[key]) !== String(query[key])) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(query = {}) {
    const items = await this.find(query);
    return items[0] || null;
  }

  async findById(id) {
    const items = this._readAll();
    return items.find(item => String(item._id) === String(id) || String(item.id) === String(id)) || null;
  }

  async create(data) {
    const items = this._readAll();
    const newItem = {
      _id: (data._id || (Date.now().toString(36) + Math.random().toString(36).substring(2, 9))),
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.unshift(newItem);
    this._writeAll(items);
    return newItem;
  }

  async insertMany(docs) {
    const items = this._readAll();
    const newItems = docs.map(d => ({
      _id: (d._id || (Date.now().toString(36) + Math.random().toString(36).substring(2, 9))),
      ...d,
      createdAt: d.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    items.push(...newItems);
    this._writeAll(items);
    return newItems;
  }

  async findByIdAndUpdate(id, updates, options = {}) {
    const items = this._readAll();
    const index = items.findIndex(item => String(item._id) === String(id));
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    this._writeAll(items);
    return items[index];
  }

  async findByIdAndDelete(id) {
    const items = this._readAll();
    const index = items.findIndex(item => String(item._id) === String(id));
    if (index === -1) return null;
    const removed = items.splice(index, 1)[0];
    this._writeAll(items);
    return removed;
  }

  async deleteOne(query = {}) {
    const items = this._readAll();
    const index = items.findIndex(item => {
      for (const key of Object.keys(query)) {
        if (String(item[key]) !== String(query[key])) return false;
      }
      return true;
    });
    if (index !== -1) {
      const removed = items.splice(index, 1)[0];
      this._writeAll(items);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }

  async countDocuments(query = {}) {
    const items = await this.find(query);
    return items.length;
  }
}

export const memoryCollections = {
  User: new MemoryCollection('users'),
  Trip: new MemoryCollection('trips'),
  Destination: new MemoryCollection('destinations'),
  SavedDestination: new MemoryCollection('saveddestinations'),
};

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripai';
  try {
    mongoose.set('strictQuery', false);
    // Attempt with 2s timeout
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[TripAI Database] Successfully connected to MongoDB at ${mongoUri}`);
    isUsingFallbackStore = false;
  } catch (err) {
    console.warn(`[TripAI Database] MongoDB not reachable (${err.message}).`);
    console.log('[TripAI Database] Seamlessly running with local persistent JSON fallback store.');
    isUsingFallbackStore = true;
  }
};

export const isFallbackMode = () => isUsingFallbackStore;
