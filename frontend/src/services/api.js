import axios from 'axios';

// Purana: baseURL: 'http://localhost:8000/api/v1',
// Naya:
const API = axios.create({
  baseURL: '/api/v1', 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;