import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import aiService from '../services/aiService';
import tripService from '../services/tripService';
import destinationService from '../services/destinationService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [currentTrip, setCurrentTrip] = useState(() => {
    try {
      const saved = localStorage.getItem('tripai_current_trip');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [trips, setTrips] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync current trip to localStorage
  useEffect(() => {
    if (currentTrip) {
      try {
        localStorage.setItem('tripai_current_trip', JSON.stringify(currentTrip));
      } catch (e) {
        console.error('Failed to cache current trip:', e);
      }
    }
  }, [currentTrip]);

  // Load user trips & favorites when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTrips();
      fetchFavorites();
    } else {
      setTrips([]);
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await tripService.getTrips();
      if (res.success && res.data) {
        setTrips(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch user trips:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await destinationService.getFavorites();
      if (res.success && res.data) {
        setFavorites(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch favorites:', err.message);
    }
  };

  const generateTrip = async (plannerData) => {
    try {
      setIsGenerating(true);
      const res = await aiService.generateItinerary(plannerData);
      if (res.success && res.data) {
        setCurrentTrip(res.data);
        showToast('Your personalized AI travel itinerary is ready! ✨', 'success');
        
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#06B6D4', '#FF5A36', '#0F243E']
          });
        } catch {
          // ignore
        }
        return res.data;
      }
      throw new Error(res.message || 'Failed to generate itinerary');
    } catch (err) {
      showToast(err.message || 'Error generating trip plan. Please try again.', 'error');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const saveTrip = async (tripToSave = currentTrip) => {
    if (!isAuthenticated) {
      showToast('Please login or create an account to save your trips.', 'warning');
      return false;
    }

    if (!tripToSave) {
      showToast('No trip available to save.', 'error');
      return false;
    }

    try {
      setLoading(true);
      const res = await tripService.createTrip(tripToSave);
      if (res.success && res.data) {
        setTrips((prev) => [res.data, ...prev]);
        setCurrentTrip(res.data);
        showToast('Trip successfully saved to your dashboard! 🚀', 'success');
        return res.data;
      }
    } catch (err) {
      showToast(err.message || 'Could not save trip.', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateExpenses = async (newExpenses) => {
    if (!currentTrip) return;
    const updated = {
      ...currentTrip,
      expenses: {
        ...currentTrip.expenses,
        ...newExpenses,
      },
    };
    setCurrentTrip(updated);

    if (currentTrip._id && isAuthenticated) {
      try {
        await tripService.updateTrip(currentTrip._id, { expenses: updated.expenses });
        showToast('Trip expenses updated.', 'success');
      } catch (err) {
        showToast('Expenses updated locally.', 'info');
      }
    }
  };

  const deleteTrip = async (id) => {
    try {
      await tripService.deleteTrip(id);
      setTrips((prev) => prev.filter((t) => t._id !== id));
      if (currentTrip?._id === id) {
        setCurrentTrip(null);
        localStorage.removeItem('tripai_current_trip');
      }
      showToast('Trip deleted successfully.', 'info');
    } catch (err) {
      showToast(err.message || 'Could not delete trip.', 'error');
    }
  };

  const duplicateTrip = async (id) => {
    try {
      const res = await tripService.duplicateTrip(id);
      if (res.success && res.data) {
        setTrips((prev) => [res.data, ...prev]);
        showToast('Trip duplicated successfully! 📋', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Could not duplicate trip.', 'error');
    }
  };

  const toggleFavorite = async (destinationId) => {
    if (!isAuthenticated) {
      showToast('Please login to save favorite destinations.', 'warning');
      return;
    }

    try {
      const res = await destinationService.toggleFavorite(destinationId);
      if (res.success) {
        if (res.isFavorited) {
          showToast('Destination added to your favorites! ❤️', 'success');
        } else {
          showToast('Destination removed from favorites.', 'info');
        }
        await fetchFavorites();
      }
    } catch (err) {
      showToast(err.message || 'Could not update favorites.', 'error');
    }
  };

  const isFavorite = (destinationId) => {
    return favorites.some(
      (f) => String(f._id) === String(destinationId) || String(f.id) === String(destinationId)
    );
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        setCurrentTrip,
        trips,
        favorites,
        loading,
        isGenerating,
        generateTrip,
        saveTrip,
        updateExpenses,
        deleteTrip,
        duplicateTrip,
        toggleFavorite,
        isFavorite,
        fetchTrips,
        fetchFavorites,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

export default TripContext;
