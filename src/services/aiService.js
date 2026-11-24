import api from './api';

export const aiService = {
  async generateItinerary(plannerData) {
    const response = await api.post('/ai/generate-itinerary', plannerData);
    return response.data;
  },

  async chatWithAssistant(messages, currentTrip) {
    const response = await api.post('/ai/chat', { messages, currentTrip });
    return response.data;
  },

  async optimizeBudget(tripData, targetSavingsPercent = 15) {
    const response = await api.post('/ai/optimize-budget', { tripData, targetSavingsPercent });
    return response.data;
  },
};

export default aiService;
