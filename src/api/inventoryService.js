import apiClient from './client';

export const inventoryService = {
  getInventory: async (filters = {}) => {
    // API Placeholder: GET /inventory?bloodGroup=...
    const response = await apiClient.get('/inventory', { params: filters });
    return response.data;
  },

  addBloodUnit: async (unitData) => {
    // API Placeholder: POST /inventory
    const response = await apiClient.post('/inventory', unitData);
    return response.data;
  },

  updateBloodUnit: async (id, unitData) => {
    // API Placeholder: PUT /inventory/:id
    const response = await apiClient.put(`/inventory/${id}`, unitData);
    return response.data;
  },

  deleteBloodUnit: async (id) => {
    // API Placeholder: DELETE /inventory/:id
    const response = await apiClient.delete(`/inventory/${id}`);
    return response.data;
  }
};
