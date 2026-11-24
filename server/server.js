import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import Destination from './models/Destination.js';
import { initialDestinations } from './utils/seedData.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
await connectDB();

// Auto-seed destination catalog if empty
try {
  const count = await Destination.countDocuments();
  if (count === 0) {
    console.log('[TripAI Seeder] Seeding initial curated destinations...');
    await Destination.insertMany(initialDestinations);
    console.log(`[TripAI Seeder] Successfully seeded ${initialDestinations.length} world-class destinations.`);
  } else {
    console.log(`[TripAI Seeder] Found ${count} destinations in catalog.`);
  }
} catch (seedErr) {
  console.warn('[TripAI Seeder] Warning during auto-seed:', seedErr.message);
}

// Global Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TripAI Full-Stack Travel Backend',
    timestamp: new Date().toISOString(),
    aiEngine: process.env.GEMINI_API_KEY ? 'Gemini 1.5 Flash (Configured)' : 'TripAI Built-in Synthesizer Engine (Demo/Offline Ready)',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 TripAI API Server running on http://localhost:${PORT}`);
  console.log(`✨ Environment: ${process.env.NODE_ENV || 'development'}`);
});
