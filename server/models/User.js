import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { memoryCollections, isFallbackMode } from '../config/db.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: '',
  },
  preferences: {
    currency: { type: String, default: 'USD' },
    travelStyle: { type: String, default: 'Balanced' },
    dietary: { type: [String], default: [] },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const MongooseUser = mongoose.model('User', userSchema);

// Model wrapper that supports MongoDB or fallback seamlessly
export const User = {
  async findOne(query) {
    if (isFallbackMode()) {
      const user = await memoryCollections.User.findOne(query);
      if (user) {
        user.matchPassword = async function (p) {
          return await bcrypt.compare(p, this.password);
        };
      }
      return user;
    }
    return MongooseUser.findOne(query);
  },
  async findById(id) {
    if (isFallbackMode()) {
      return memoryCollections.User.findById(id);
    }
    return MongooseUser.findById(id).select('-password');
  },
  async create(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userData = {
      ...data,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      preferences: data.preferences || { currency: 'USD', travelStyle: 'Balanced', dietary: [] }
    };
    if (isFallbackMode()) {
      const existing = await memoryCollections.User.findOne({ email: data.email.toLowerCase() });
      if (existing) {
        throw new Error('User already exists with this email');
      }
      return memoryCollections.User.create(userData);
    }
    return MongooseUser.create(userData);
  },
  async findByIdAndUpdate(id, updates) {
    if (isFallbackMode()) {
      return memoryCollections.User.findByIdAndUpdate(id, updates);
    }
    return MongooseUser.findByIdAndUpdate(id, updates, { new: true }).select('-password');
  }
};

export default User;
