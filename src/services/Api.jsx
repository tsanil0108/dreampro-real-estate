<<<<<<< Updated upstream
// src/services/Api.js
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
    return Api(originalRequest);
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
const Api = axios.create({
  baseURL: API_BASE_URL,
=======
// services/Api.jsx
import axios from 'axios';

// Create axios instance - REMOVE /api from baseURL!
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // No /api here!
  timeout: 5000,
>>>>>>> Stashed changes
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< Updated upstream
// Request interceptor
Api.interceptors.request.use(
  (config) => {
    // Check if we're online
    if (!navigator.onLine) {
      throw new axios.Cancel('No internet connection');
    }
=======
// Mock mode flag - CHANGE THIS TO false WHEN BACKEND IS WORKING
const USE_MOCK_API = true;
>>>>>>> Stashed changes

// Mock data for testing
const mockData = {
  health: {
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'Spring Boot API',
    version: '1.0.0',
    message: 'Mock API is working'
  },
  authRegister: {
    success: false,
    message: 'User already exists',
    timestamp: new Date().toISOString()
  },
  properties: {
    items: [
      {
        id: 1,
        title: 'Beautiful Apartment',
        price: 1200,
        location: 'New York',
        type: 'Apartment'
      },
      {
        id: 2,
        title: 'Modern Villa',
        price: 3500,
        location: 'Los Angeles',
        type: 'Villa'
      },
      {
        id: 3,
        title: 'Cozy Studio',
        price: 800,
        location: 'Chicago',
        type: 'Studio'
      }
    ],
    total: 3,
    page: 1,
    pageSize: 10
  }
};

// Helper function to create axios-like response
const createMockResponse = (data, status = 200, statusText = 'OK') => {
  return {
    data,
    status,
    statusText,
    headers: {},
    config: {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    request: {}
  };
};

// Helper function to create axios-like error
const createMockError = (message, status = 400, data = null) => {
  const error = new Error(message);
  error.response = createMockResponse(data || { message }, status, getStatusText(status));
  error.request = {};
  error.config = {};
  return error;
};

// Get status text from status code
const getStatusText = (status) => {
  const statusMap = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    500: 'Internal Server Error'
  };
  return statusMap[status] || 'Unknown';
};

// Mock API functions
const mockApi = {
  get: async (url, config) => {
    console.log('🔧 Mock GET:', url);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (url === '/api/health' || url === '/health') {
      return createMockResponse(mockData.health, 200);
    }
    
    if (url === '/api/properties/public' || url === '/properties/public') {
      return createMockResponse(mockData.properties, 200);
    }
    
    if (url === '/api/test/public') {
      return createMockResponse({
        message: 'Public test endpoint is working!',
        timestamp: new Date().toISOString(),
        status: 'success'
      }, 200);
    }
    
    throw createMockError('Not Found', 404, { message: 'Endpoint not found', url });
  },
  
  post: async (url, data, config) => {
    console.log('🔧 Mock POST:', url, data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (url === '/api/auth/register' || url === '/auth/register') {
      // Simulate user already exists error
      throw createMockError('Conflict', 409, mockData.authRegister);
    }
    
    return createMockResponse(
      { success: true, message: 'Created', id: Date.now(), data }, 
      201, 
      'Created'
    );
  },
  
  put: async (url, data, config) => {
    console.log('🔧 Mock PUT:', url, data);
    await new Promise(resolve => setTimeout(resolve, 300));
    return createMockResponse({ success: true, message: 'Updated', data }, 200);
  },
  
  delete: async (url, config) => {
    console.log('🔧 Mock DELETE:', url);
    await new Promise(resolve => setTimeout(resolve, 300));
    return createMockResponse({ success: true, message: 'Deleted' }, 200);
  },
  
  patch: async (url, data, config) => {
    console.log('🔧 Mock PATCH:', url, data);
    await new Promise(resolve => setTimeout(resolve, 300));
    return createMockResponse({ success: true, message: 'Patched', data }, 200);
  },
  
  checkBackendReachability: async () => {
    console.log('🔧 Mock: Checking backend reachability');
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },
  
  clearAuthData: () => {
    console.log('🔧 Mock: Clearing auth data');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
  
  // Add interceptors for compatibility
  interceptors: {
    request: { use: () => ({ eject: () => {} }) },
    response: { use: () => ({ eject: () => {} }) }
  }
};

// Add request interceptor for auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

<<<<<<< Updated upstream
// Response interceptor
Api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log(`✅ API Success: ${response.status} ${response.config.url}`);
=======
// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    return Promise.reject(error);
  }
);

// Real API functions - wrap the axios instance
const realApi = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
  patch: (url, data, config) => axiosInstance.patch(url, data, config),
  
  checkBackendReachability: async () => {
    try {
      const response = await axiosInstance.get('/api/health', {
        timeout: 3000,
        validateStatus: () => true
      });
      return response.status < 500;
    } catch (error) {
      console.error('Backend reachability check failed:', error.message);
      return false;
>>>>>>> Stashed changes
    }
  },
  
  clearAuthData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
  
  // Pass through interceptors from axios instance
  interceptors: axiosInstance.interceptors
};

// Utility function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    return `Server Error ${status}: ${data?.message || data?.error || 'Unknown server error'}`;
  } else if (error.request) {
    return 'Network Error: No response from server. Please check your connection.';
  } else {
    return `Request Error: ${error.message}`;
  }
};

<<<<<<< Updated upstream
// Add utility methods to Api instance for convenience
Api.clearAuthData = clearAuthData;
Api.checkBackendReachability = checkBackendReachability;

export default Api;
=======
// Add handleApiError to both APIs
mockApi.handleApiError = handleApiError;
realApi.handleApiError = handleApiError;

// Choose which API to use
const api = USE_MOCK_API ? mockApi : realApi;

// Export the chosen API instance
export default api;
// Export handleApiError separately
export { handleApiError };
>>>>>>> Stashed changes
