import SavedDestination from '../models/SavedDestination.js';
import Destination from '../models/Destination.js';

export const toggleFavorite = async (req, res, next) => {
  try {
    const { destinationId } = req.body;
    if (!destinationId) {
      return res.status(400).json({ success: false, message: 'Please provide destinationId' });
    }

    const existing = await SavedDestination.findOne({
      userId: req.user._id,
      destinationId,
    });

    if (existing) {
      await SavedDestination.deleteOne({ _id: existing._id });
      return res.json({ success: true, isFavorited: false, message: 'Removed from saved destinations' });
    }

    const newFavorite = await SavedDestination.create({
      userId: req.user._id,
      destinationId,
    });

    res.status(201).json({ success: true, isFavorited: true, data: newFavorite, message: 'Saved to favorites' });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await SavedDestination.find({ userId: req.user._id });
    const destinationIds = favorites.map(f => f.destinationId);

    const allDestinations = await Destination.find({});
    const savedDestinations = allDestinations.filter(d =>
      destinationIds.some(id => String(id) === String(d._id))
    );

    res.json({ success: true, count: savedDestinations.length, data: savedDestinations });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    await SavedDestination.deleteOne({
      userId: req.user._id,
      destinationId: req.params.id,
    });
    res.json({ success: true, message: 'Removed favorite successfully' });
  } catch (error) {
    next(error);
  }
};
