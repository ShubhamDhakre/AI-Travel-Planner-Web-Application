import Trip from '../models/Trip.js';

export const createTrip = async (req, res, next) => {
  try {
    const tripData = {
      ...req.body,
      userId: req.user._id,
      createdAt: new Date().toISOString(),
    };

    const trip = await Trip.create(tripData);
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
};

export const getTrips = async (req, res, next) => {
  try {
    const filter = { userId: req.user._id };
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const trips = await Trip.find(filter);
    res.json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    res.json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (String(trip.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this trip' });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, data: updatedTrip });
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (String(trip.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this trip' });
    }

    await Trip.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Trip removed successfully' });
  } catch (error) {
    next(error);
  }
};

export const duplicateTrip = async (req, res, next) => {
  try {
    const originalTrip = await Trip.findById(req.params.id);
    if (!originalTrip) {
      return res.status(404).json({ success: false, message: 'Original trip not found' });
    }

    const duplicatedData = {
      ...originalTrip,
      _id: undefined,
      id: undefined,
      userId: req.user._id,
      destination: `${originalTrip.destination} (Copy)`,
      status: 'Planning',
      createdAt: new Date().toISOString(),
    };

    const newTrip = await Trip.create(duplicatedData);
    res.status(201).json({ success: true, data: newTrip });
  } catch (error) {
    next(error);
  }
};
