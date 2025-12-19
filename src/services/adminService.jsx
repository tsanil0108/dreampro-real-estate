// src/services/adminService.js
// import Api, { handleApiError } from './Api';

// Admin-specific URLs
const ADMIN_BASE_URL = '/admin';

// Enhanced admin API instance (if you need different config)
const AdminApi = Api; // We'll use the same instance, but you can create separate one if needed

export const adminService = {
  // ===== AUTHENTICATION =====
  login: async (credentials) => {
    try {
      console.log('🔑 Admin login attempt:', credentials.email);
      
      // Use your auth endpoint - adjust as needed
      const response = await AdminApi.post('/auth/admin/login', credentials);
      
      // Store admin-specific tokens
      const { token, user, refreshToken } = response.data;
      
      if (token) {
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(user));
        if (refreshToken) {
          localStorage.setItem('admin_refresh_token', refreshToken);
        }
        
        // Also set as default token for API calls
        localStorage.setItem('dreampro_token', token);
      }
      
      console.log('✅ Admin login successful');
      return response.data;
    } catch (error) {
      console.error('❌ Admin login failed:', error);
      const message = handleApiError(error);
      throw new Error(message);
    }
  },

  logout: () => {
    // Clear admin-specific data
    const adminItems = ['admin_token', 'admin_user', 'admin_refresh_token'];
    adminItems.forEach(item => localStorage.removeItem(item));
    
    // Also clear general auth data
    Api.clearAuthData();
    
    console.log('✅ Admin logged out');
    return true;
  },

  // ===== HEALTH CHECK =====
  checkBackendHealth: async () => {
    try {
      // Try multiple endpoints to check backend health
      const endpoints = [
        '/health',
        '/actuator/health',
        '/api/v1/health'
      ];
      
      for (const endpoint of endpoints) {
        try {
          const response = await Api.get(endpoint, { timeout: 5000 });
          return {
            healthy: true,
            message: '✅ Backend is running',
            endpoint,
            data: response.data
          };
        } catch (e) {
          console.log(`Endpoint ${endpoint} not available:`, e.message);
        }
      }
      
      // If all endpoints fail
      await Api.checkBackendReachability();
      throw new Error('Backend server is not responding');
      
    } catch (error) {
      return {
        healthy: false,
        message: error.message || '❌ Backend is not reachable',
        error: error
      };
    }
  },

  // ===== DASHBOARD =====
  getDashboardStats: async () => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/dashboard/stats`);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to fetch dashboard stats:', error);
      throw new Error(handleApiError(error));
    }
  },

  getRecentActivities: async (limit = 10) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/activities/recent`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // ===== USER MANAGEMENT =====
  getAllUsers: async (params = {}) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/users`, { params });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  createUser: async (userData) => {
    try {
      const response = await AdminApi.post(`${ADMIN_BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await AdminApi.put(`${ADMIN_BASE_URL}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await AdminApi.delete(`${ADMIN_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  updateUserStatus: async (userId, status) => {
    try {
      const response = await AdminApi.patch(
        `${ADMIN_BASE_URL}/users/${userId}/status`, 
        { status }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // ===== PROPERTY MANAGEMENT =====
  getAllProperties: async (params = {}) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/properties`, { params });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  getPropertyById: async (propertyId) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/properties/${propertyId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  createProperty: async (propertyData) => {
    try {
      // Handle multipart/form-data if there are images
      const formData = new FormData();
      
      Object.keys(propertyData).forEach(key => {
        if (key === 'images' && Array.isArray(propertyData.images)) {
          propertyData.images.forEach((image, index) => {
            formData.append('images', image);
          });
        } else {
          formData.append(key, propertyData[key]);
        }
      });
      
      const response = await AdminApi.post(
        `${ADMIN_BASE_URL}/properties`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  updateProperty: async (propertyId, propertyData) => {
    try {
      const response = await AdminApi.put(
        `${ADMIN_BASE_URL}/properties/${propertyId}`, 
        propertyData
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  deleteProperty: async (propertyId) => {
    try {
      const response = await AdminApi.delete(`${ADMIN_BASE_URL}/properties/${propertyId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  approveProperty: async (propertyId) => {
    try {
      const response = await AdminApi.patch(
        `${ADMIN_BASE_URL}/properties/${propertyId}/approve`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  rejectProperty: async (propertyId, reason) => {
    try {
      const response = await AdminApi.patch(
        `${ADMIN_BASE_URL}/properties/${propertyId}/reject`, 
        { reason }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // ===== BOOKING MANAGEMENT =====
  getAllBookings: async (params = {}) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/bookings`, { params });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  getBookingById: async (bookingId) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await AdminApi.patch(
        `${ADMIN_BASE_URL}/bookings/${bookingId}/status`, 
        { status }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  cancelBooking: async (bookingId, reason) => {
    try {
      const response = await AdminApi.patch(
        `${ADMIN_BASE_URL}/bookings/${bookingId}/cancel`, 
        { reason }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // ===== CATEGORY MANAGEMENT =====
  getAllCategories: async () => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await AdminApi.post(`${ADMIN_BASE_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await AdminApi.put(
        `${ADMIN_BASE_URL}/categories/${categoryId}`, 
        categoryData
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await AdminApi.delete(`${ADMIN_BASE_URL}/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // ===== UTILITY METHODS =====
  getCurrentAdmin: () => {
    try {
      const adminUser = localStorage.getItem('admin_user');
      return adminUser ? JSON.parse(adminUser) : null;
    } catch (error) {
      console.error('Error parsing admin user:', error);
      return null;
    }
  },

  isAdminAuthenticated: () => {
    const adminToken = localStorage.getItem('admin_token');
    const user = adminService.getCurrentAdmin();
    return !!adminToken && user?.role === 'ADMIN';
  },

  getAdminToken: () => {
    return localStorage.getItem('admin_token') || localStorage.getItem('dreampro_token');
  },

  // File upload helper
  uploadFile: async (file, endpoint = '/upload') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await AdminApi.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Export data
  exportData: async (type, params = {}) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/export/${type}`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Bulk operations
  bulkUpdateUsers: async (userIds, updates) => {
    try {
      const response = await AdminApi.patch(
        `${ADMIN_BASE_URL}/users/bulk-update`,
        { userIds, updates }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  bulkDeleteUsers: async (userIds) => {
    try {
      const response = await AdminApi.post(
        `${ADMIN_BASE_URL}/users/bulk-delete`,
        { userIds }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Search everything
  searchAll: async (query, filters = {}) => {
    try {
      const response = await AdminApi.get(`${ADMIN_BASE_URL}/search`, {
        params: { query, ...filters }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// Add global helper for debugging
if (import.meta.env.MODE === 'development') {
  window.adminService = adminService;
  console.log('🔧 Admin Service loaded. Available as window.adminService');
}

export default adminService;