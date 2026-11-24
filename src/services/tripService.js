import api from './api';

export const tripService = {
  async createTrip(tripData) {
    const response = await api.post('/trips', tripData);
    return response.data;
  },

  async getTrips(status) {
    const params = status ? { status } : {};
    const response = await api.get('/trips', { params });
    return response.data;
  },

  async getTripById(id) {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  async updateTrip(id, updates) {
    const response = await api.put(`/trips/${id}`, updates);
    return response.data;
  },

  async deleteTrip(id) {
    const response = await api.delete(`/trips/${id}`);
    return response.data;
  },

  async duplicateTrip(id) {
    const response = await api.post(`/trips/${id}/duplicate`);
    return response.data;
  },
};

export default tripService;
