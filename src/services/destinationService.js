import api from './api';

export const destinationService = {
  async getDestinations(filters = {}) {
    const response = await api.get('/destinations', { params: filters });
    return response.data;
  },

  async getDestinationById(id) {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  },

  async searchDestinations(q) {
    const response = await api.get('/destinations/search', { params: { q } });
    return response.data;
  },

  async getFavorites() {
    const response = await api.get('/favorites');
    return response.data;
  },

  async toggleFavorite(destinationId) {
    const response = await api.post('/favorites', { destinationId });
    return response.data;
  },

  async removeFavorite(destinationId) {
    const response = await api.delete(`/favorites/${destinationId}`);
    return response.data;
  },
};

export default destinationService;
