import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health check
  healthCheck: () => api.get('/api/health'),

  // Sports
  getSports: () => api.get('/api/sports'),
  
  // Facilities
  getFacilities: () => api.get('/api/facilities'),
  
  // Coaches
  getCoaches: () => api.get('/api/coaches'),
  
  // Branches
  getBranches: () => api.get('/api/branches'),
  
  // Contact
  submitContactForm: (data) => api.post('/api/contact', data),
  getContactForms: () => api.get('/api/contact-forms'),
};

export default api;