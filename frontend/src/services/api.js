import axios from 'axios';

// Create Axios client pointing to the backend API port
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically inject JWT token if user is logged in
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Capture unauthorized codes and reject gracefully
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is invalid or expired, clear locally saved session if desired
    if (error.response && error.response.status === 401) {
      // Avoid infinite redirects or clearing state prematurely if still resolving auth state,
      // but log it to help debugging.
      console.warn('API returned 401 Unauthorized.');
    }
    return Promise.reject(error);
  }
);

export default API;
