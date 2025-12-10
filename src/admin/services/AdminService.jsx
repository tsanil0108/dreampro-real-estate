import axios from 'axios';

// Your Spring Boot is running on localhost:8080 with context path /api/v1
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';
// const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;

// console.log('🔧 Backend Configuration:', {
//   baseURL: API_BASE_URL,
//   adminURL: ADMIN_BASE_URL,
//   environment: process.env.NODE_ENV
// });

// Create axios instance with proper CORS settings
// const adminAxios = axios.create({
//   baseURL: ADMIN_BASE_URL,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   // Your CORS config has allowCredentials: true, so set this to true
//   withCredentials: false, // Set to false since you're using Bearer token
// });

// Add request interceptor
// adminAxios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     // Debug logging
//     console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
//       hasToken: !!token,
//       headers: config.headers
//     });
    
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request setup error:', error);
//     return Promise.reject(error);
//   }
// );

// Add response interceptor

// adminAxios.interceptors.response.use(
//   (response) => {
//     console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
//     return response.data;
//   },
//   (error) => {
//     // Enhanced error logging
//     const errorDetails = {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       data: error.response?.data,
//       isNetworkError: !error.response,
//       isTimeout: error.code === 'ECONNABORTED'
//     };
    
//     console.error('❌ API Error:', errorDetails);
    
//     // Handle CORS errors specifically
//     if (error.message.includes('Network Error') || !error.response) {
//       console.error('🌐 CORS/Network Issue Detected!');
//       console.error('Possible causes:');
//       console.error('1. Spring Boot server not running');
//       console.error('2. CORS misconfiguration');
//       console.error('3. Wrong port (should be 8080)');
//       console.error('4. Wrong context path (should be /api/v1)');
      
//       return Promise.reject({
//         type: 'NETWORK_ERROR',
//         message: 'Cannot connect to backend server. Check:',
//         details: [
//           '1. Is Spring Boot running on http://localhost:8080?',
//           '2. Check console for CORS errors',
//           '3. Verify your CORS configuration allows localhost:3000'
//         ],
//         originalError: error
//       });
//     }
    
//     // Handle 401 Unauthorized (JWT expired)
//     if (error.response?.status === 401) {
//       console.warn('🔒 Session expired - redirecting to login');
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminUser');
      
//       // Use setTimeout to avoid React state updates during render
//       setTimeout(() => {
//         if (!window.location.pathname.includes('/login')) {
//           window.location.href = '/admin/login';
//         }
//       }, 100);
//     }
    
//     // Format error response from Spring Boot
//     const springError = error.response?.data || {};
//     return Promise.reject({
//       status: error.response?.status,
//       message: springError.message || springError.error || 'An error occurred',
//       errors: springError.errors,
//       timestamp: springError.timestamp,
//       path: springError.path,
//       type: 'API_ERROR'
//     });
//   }
// );

const AdminService = {
  // ===== HEALTH CHECK & CONNECTION TEST =====
  testConnection: async () => {
    try {
      console.log('Testing connection to Spring Boot...');
      const response = await axios.get('http://localhost:8080/api/v1/health', {
        timeout: 5000
      });
      return {
        connected: true,
        data: response.data,
        message: '✅ Successfully connected to Spring Boot backend'
      };
    } catch (error) {
      console.error('Connection test failed:', error.message);
      
      // Try different endpoints
      const endpoints = [
        'http://localhost:8080/actuator/health',
        'http://localhost:8080/api/v1/',
        'http://localhost:8080/'
      ];
      
      for (const endpoint of endpoints) {
        try {
          const test = await axios.get(endpoint, { timeout: 3000 });
          return {
            connected: true,
            data: test.data,
            endpoint: endpoint,
            message: `✅ Connected via ${endpoint}`
          };
        } catch (e) {
          console.log(`Failed on ${endpoint}:`, e.message);
        }
      }
      
      throw {
        connected: false,
        message: '❌ Cannot connect to Spring Boot backend',
        details: 'Make sure: 1) Spring Boot is running, 2) Port 8080 is free, 3) No CORS issues',
        error: error.message
      };
    }
  },
  
  // ===== AUTHENTICATION =====
  login: async (credentials) => {
    try {
      console.log('🔑 Attempting login...');
      
      // Note: Adjust endpoint if different in your AuthController
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Login response:', response.data);
      
      // Spring Boot typical response structure
      if (response.data.token || response.data.accessToken) {
        const token = response.data.token || response.data.accessToken;
        const user = response.data.user || response.data;
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        console.log('✅ Login successful, token stored');
        
        return {
          success: true,
          token: token,
          user: user,
          message: response.data.message || 'Login successful'
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      
      // Format error for UI display
      const errorData = error.response?.data || {};
      throw {
        success: false,
        message: errorData.message || 'Login failed. Please check credentials.',
        errors: errorData.errors,
        status: error.response?.status
      };
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    console.log('✅ Logged out');
  },

  // ===== DASHBOARD =====
  getDashboardStats: async () => {
    try {
      const response = await adminAxios.get('/dashboard/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ===== USERS =====
  getAllUsers: async (params = {}) => {
    try {
      const response = await adminAxios.get('/users', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await adminAxios.get(`/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ===== PROPERTIES =====
  getAllProperties: async (params = {}) => {
    try {
      const response = await adminAxios.get('/properties', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  createProperty: async (propertyData) => {
    try {
      // Handle file uploads if needed
      if (propertyData.images && propertyData.images.length > 0) {
        const formData = new FormData();
        
        // Append all form fields
        Object.keys(propertyData).forEach(key => {
          if (key === 'images') {
            propertyData.images.forEach((image, index) => {
              formData.append('images', image);
            });
          } else {
            formData.append(key, propertyData[key]);
          }
        });
        
        const response = await adminAxios.post('/properties', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response;
      } else {
        const response = await adminAxios.post('/properties', propertyData);
        return response;
      }
    } catch (error) {
      throw error;
    }
  },

  // ===== BOOKINGS =====
  getAllBookings: async (params = {}) => {
    try {
      const response = await adminAxios.get('/bookings', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ===== INTERIOR =====
  getInteriorDashboardStats: async () => {
    try {
      const response = await adminAxios.get('/interior/dashboard/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  getInteriorProjects: async (params = {}) => {
    try {
      const response = await adminAxios.get('/interior/projects', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ===== UTILITY METHODS =====
  getAuthToken: () => {
    return localStorage.getItem('adminToken');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('adminUser');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  },

  // Clear all auth data
  clearAuth: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('token'); // just in case
    console.log('🧹 All auth data cleared');
  }
};

// Debug helper
window.debugAuth = () => {
  console.log('🔍 Auth Debug Info:');
  console.log('Token exists:', !!localStorage.getItem('adminToken'));
  console.log('User exists:', !!localStorage.getItem('adminUser'));
  console.log('Current User:', AdminService.getCurrentUser());
  console.log('Is Authenticated:', AdminService.isAuthenticated());
};

export default AdminService;