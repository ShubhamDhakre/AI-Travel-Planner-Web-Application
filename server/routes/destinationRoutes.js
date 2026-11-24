import express from 'express';
import {
  getDestinations,
  getDestinationById,
  searchDestinations,
} from '../controllers/destinationController.js';

const router = express.Router();

router.get('/', getDestinations);
router.get('/search', searchDestinations);
router.get('/:id', getDestinationById);

export default router;
