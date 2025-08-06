import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Export all API functions
export const getPopular = (count = 10) => 
  api.get(`/recommend/popular?count=${count}`);

export const getTrendingBooks = (count = 15) => 
  api.get(`/recommend/trending?count=${count}`);

export const searchBooks = (query) => 
  api.get(`/search`, { params: { q: query } });

export const getBook = (isbn) => 
  api.get(`/book/${isbn}`);

export const getSimilar = (isbn, count = 10) => 
  api.get(`/recommend/similar/${isbn}?count=${count}`);

export const getUserRecs = (userId, count = 10) => 
  api.get(`/recommend/user/${userId}?count=${count}`);

export const getRandomUser = () => 
  api.get('/random-user');

export const getSVDRecs = (userId, count = 10) => 
  api.get(`/recommend/svd/${userId}?count=${count}`);

export const getUserRatings = (userId) => 
  api.get(`/user/${userId}/ratings`);

export const getGenreRecommendations = (genre) => 
  api.get(`/recommend/genre/${encodeURIComponent(genre)}`);

export const getPopularGenres = () => 
  api.get('/genres');

export const getStatus = () => 
  api.get('/status');

export default api;
