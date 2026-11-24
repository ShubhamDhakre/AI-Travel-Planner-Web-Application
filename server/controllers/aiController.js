import geminiService from '../services/geminiService.js';

export const generateItinerary = async (req, res, next) => {
  try {
    const {
      destination,
      departureCity,
      startDate,
      endDate,
      travelers,
      budget,
      travelPreferences,
      accommodationPreferences,
      transportation,
      additionalNotes,
    } = req.body;

    if (!destination || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Destination, startDate, and endDate are required fields',
      });
    }

    const generatedTrip = await geminiService.generateItinerary({
      destination,
      departureCity,
      startDate,
      endDate,
      travelers,
      budget,
      travelPreferences,
      accommodationPreferences,
      transportation,
      additionalNotes,
    });

    res.json({
      success: true,
      data: generatedTrip,
    });
  } catch (error) {
    next(error);
  }
};

export const chatWithAssistant = async (req, res, next) => {
  try {
    const { messages, currentTrip } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide messages array' });
    }

    const response = await geminiService.chatWithAssistant(messages, currentTrip);
    res.json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

export const optimizeBudget = async (req, res, next) => {
  try {
    const { tripData, targetSavingsPercent } = req.body;
    if (!tripData) {
      return res.status(400).json({ success: false, message: 'Please provide tripData to optimize' });
    }

    const optimization = await geminiService.optimizeBudget(tripData, targetSavingsPercent || 15);
    res.json({ success: true, data: optimization });
  } catch (error) {
    next(error);
  }
};
