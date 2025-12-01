// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
const isDevelopment = import.meta.env.MODE === 'development';

// Enhanced error handler
const enhanceError = (error) => {
  if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
    return {
      message: 'Cannot connect to server. Please check if the backend is running.',
      code: error.code,
      isNetworkError: true,
      originalError: error
    };
  }
  
  if (error.message?.includes('Network Error')) {
    return {
      message: 'Network error. Please check your internet connection and ensure the server is running.',
      code: 'NETWORK_ERROR',
      isNetworkError: true,
      originalError: error
    };
  }
  
  if (error.message?.includes('timeout')) {
    return {
      message: 'Request timeout. The server is taking too long to respond.',
      code: 'TIMEOUT',
      isTimeout: true,
      originalError: error
    };
  }
  
  return error;
};

// Clear auth data
const clearAuthData = () => {
  const items = ['dreampro_token', 'accessToken', 'refreshToken', 'dreampro_user', 'user'];
  items.forEach(item => localStorage.removeItem(item));
};

// Check backend reachability
const checkBackendReachability = async () => {
  const baseUrl = API_BASE_URL.replace('/api/v1', '');
  
  try {
    await fetch(`${baseUrl}/health`, { 
      method: 'GET',
      mode: 'no-cors'
    });
    console.log('✅ Backend server is reachable');
    return true;
  } catch (err) {
    console.error('❌ Backend server is not reachable:', baseUrl);
    console.log('💡 Please ensure:');
    console.log('   1. Backend server is running');
    console.log('   2. Correct port (usually 8080)');
    console.log('   3. No CORS issues');
    console.log('   4. Network connectivity');
    return false;
  }
};

// Handle token refresh
const handleTokenRefresh = async (error, originalRequest) => {
  originalRequest._retry = true;
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    clearAuthData();
    window.location.href = '/login';
    return Promise.reject(error);
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    localStorage.setItem('dreampro_token', accessToken);
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
    }
    
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return api(originalRequest);
  } catch (refreshError) {
    clearAuthData();
    window.location.href = '/login';
    return Promise.reject(refreshError);
  }
};

// Handle HTTP errors
const handleHttpError = (error) => {
  const { status, data } = error.response;
  
  const enhancedError = {
    message: data?.message || `Server error: ${status}`,
    status: status,
    data: data,
    originalError: error
  };
  
  console.error(`❌ HTTP ${status} Error:`, enhancedError.message);
  return Promise.reject(enhancedError);
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Check if we're online
    if (!navigator.onLine) {
      throw new axios.Cancel('No internet connection');
    }

    // Get token from multiple possible locations
    const token = localStorage.getItem('dreampro_token') || 
                  localStorage.getItem('accessToken') || 
                  localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (isDevelopment) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(enhanceError(error));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle cancellation (like no internet)
    if (axios.isCancel(error)) {
      console.error('❌ Request cancelled:', error.message);
      return Promise.reject(enhanceError(error));
    }

    // Handle network errors
    if (!error.response) {
      const networkError = enhanceError(error);
      console.error('🌐 Network Error:', networkError.message);
      
      // Check if backend is reachable
      if (isDevelopment) {
        checkBackendReachability();
      }
      
      return Promise.reject(networkError);
    }

    // Handle 401 Unauthorized (token refresh logic)
    if (error.response.status === 401 && !originalRequest._retry) {
      return handleTokenRefresh(error, originalRequest);
    }

    // Handle other HTTP errors
    return handleHttpError(error);
  }
);

// Enhanced error handler for components
export const handleApiError = (error) => {
  if (error.isNetworkError) {
    return error.message;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export const isOnline = () => navigator.onLine;

// Add utility methods to api instance for convenience
api.clearAuthData = clearAuthData;
api.checkBackendReachability = checkBackendReachability;

export default api;