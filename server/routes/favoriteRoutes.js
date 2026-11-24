import express from 'express';
import {
  toggleFavorite,
  getFavorites,
  removeFavorite,
} from '../controllers/favoriteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, toggleFavorite);
router.get('/', protect, getFavorites);
router.delete('/:id', protect, removeFavorite);

export default router;
