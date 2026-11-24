import express from 'express';
import {
  generateItinerary,
  chatWithAssistant,
  optimizeBudget,
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-itinerary', generateItinerary);
router.post('/chat', chatWithAssistant);
router.post('/optimize-budget', optimizeBudget);

export default router;
