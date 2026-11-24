import express from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  duplicateTrip,
} from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTrip);
router.get('/', protect, getTrips);
router.get('/:id', getTripById); // allow shared viewing
router.put('/:id', protect, updateTrip);
router.delete('/:id', protect, deleteTrip);
router.post('/:id/duplicate', protect, duplicateTrip);

export default router;
