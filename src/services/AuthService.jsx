<<<<<<< Updated upstream
// src/services/authService.js
=======
// src/services/AuthService.js
>>>>>>> Stashed changes
import api from "./Api";

class AuthService {
  constructor() {
    this.tokenKey = 'accessToken';
    this.userKey = 'user';
    this.refreshTokenKey = 'refreshToken';
    console.log('✅ AuthService initialized');
  }

<<<<<<< Updated upstream
  // Login user - UPDATED for your backend response format
=======
  // ✅ Login user
>>>>>>> Stashed changes
  async login(credentials) {
    console.log('🔐 Login attempt:', { email: credentials.email });
    
    try {
<<<<<<< Updated upstream
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data); // Debug log
      
      // Handle your Spring Boot backend response format
      if (response.data.success && response.data.data) {
        const { token, user, refreshToken } = response.data.data;
        
        if (token && user) {
          this.setAuthData(token, user);
          if (refreshToken) {
            localStorage.setItem(this.refreshTokenKey, refreshToken);
          }
        }
      } else {
        throw new Error(response.data.message || 'Login failed');
=======
      console.log('📤 Making request to /api/request/login');
      console.log('🔧 Request config:', {
        url: '/api/request/login',
        data: { email: credentials.email, password: '***' },
        baseURL: api.defaults.baseURL,
        headers: api.defaults.headers.common
      });
      
      const response = await Api.post('/api/request/login', credentials);
      console.log('📥 Login response:', {
        status: response.status,
        headers: response.headers,
        data: response.data
      });
      
      if (response.data.token) {
        const { token, user, refreshToken } = response.data;
        
        console.log('✅ Token received:', token ? 'Yes' : 'No');
        console.log('✅ User received:', user ? 'Yes' : 'No');
        console.log('✅ Refresh token:', refreshToken ? 'Yes' : 'No');
        
        this.setAuthData(token, user);
        
        if (refreshToken) {
          localStorage.setItem(this.refreshTokenKey, refreshToken);
        }
        
        return {
          success: true,
          data: response.data,
          message: 'Login successful'
        };
      } else {
        console.warn('⚠️ No token in response:', response.data);
        return {
          success: false,
          message: response.data?.message || 'Login failed - no token received',
          data: response.data
        };
      }
      
    } catch (error) {
      console.error('❌ Login error details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          headers: error.config?.headers
        }
      });
      
      const handledError = this.handleError(error);
      return {
        success: false,
        message: handledError.message,
        error: handledError
      };
    }
  }

  // ✅ Register user
  async register(userData) {
    console.log('📝 Registration attempt:', { 
      username: userData.username, 
      email: userData.email 
    });
    
    try {
      console.log('📤 Making request to /api/request/register');
      const response = await Api.post('/api/request/register', userData);
      console.log('📥 Register response:', {
        status: response.status,
        data: response.data
      });
      
      if (response.data.userId || response.data.id || response.data.token || response.data.success) {
        // Auto-login after successful registration if token is provided
        if (response.data.token && response.data.user) {
          this.setAuthData(response.data.token, response.data.user);
        }
        
        return {
          success: true,
          data: response.data,
          message: response.data.message || 'Registration successful'
        };
      } else {
        return {
          success: false,
          message: response.data?.message || 'Registration failed',
          data: response.data
        };
>>>>>>> Stashed changes
      }
      
    } catch (error) {
<<<<<<< Updated upstream
      throw this.handleError(error);
    }
  }

  // Register new user - UPDATED for your backend response format
  async register(userData) {
    try {
      const response = await api.post('/register', userData);
      console.log('Register response:', response.data); // Debug log
      
      // Handle registration response
      if (response.data.success && response.data.data) {
        const user = response.data.data.user || response.data.data;
        // Note: Registration might not return token immediately
        // You can choose to auto-login or redirect to login page
        return response.data;
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user profile - UPDATED for your backend response format
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      
      // Update user data if profile is more detailed
      if (response.data.success && response.data.data) {
        const userData = response.data.data;
        this.setUser(userData);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to get profile');
      }
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user profile - UPDATED for your backend response format
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData);
      
      // Update user in localStorage
      if (response.data.success && response.data.data) {
        const updatedUser = response.data.data;
        this.setUser(updatedUser);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Profile update failed');
      }
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Change password - UPDATED for your backend response format
  async changePassword(passwordData) {
    try {
      const response = await api.post('/auth/change-password', passwordData);
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Password change failed');
      }
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Forgot password - UPDATED for your backend response format
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset password - UPDATED for your backend response format
  async resetPassword(resetData) {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify email - UPDATED for your backend response format
  async verifyEmail(token) {
    try {
      const response = await api.post('/auth/verify-email', { token });
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Email verification failed');
      }
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Refresh token - UPDATED for your backend response format
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(this.refreshTokenKey);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh-token', { refreshToken });
      
      if (response.data.success && response.data.data) {
        const { token, user, refreshToken: newRefreshToken } = response.data.data;
        
        this.setAuthData(token, user);
        if (newRefreshToken) {
          localStorage.setItem(this.refreshTokenKey, newRefreshToken);
        }
        
        return token;
      } else {
        throw new Error(response.data.message || 'Token refresh failed');
      }
      
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  }

  // Logout user
=======
      console.error('❌ Registration error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      const handledError = this.handleError(error);
      return {
        success: false,
        message: handledError.message,
        error: handledError
      };
    }
  }

  // ✅ Logout user
>>>>>>> Stashed changes
  logout() {
    console.log('👋 Logging out user');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    // Clear any API auth header
    if (api.defaults.headers.common['Authorization']) {
      delete api.defaults.headers.common['Authorization'];
    }
    window.location.href = '/login';
  }

  // ✅ Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      console.log('🔍 No token found - not authenticated');
      return false;
    }

    try {
      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        console.log('⏰ Token expired at:', new Date(payload.exp * 1000));
        this.logout();
        return false;
      }
      
      console.log('✅ User authenticated, token valid until:', new Date(payload.exp * 1000));
      return true;
    } catch (error) {
      console.error('❌ Error parsing token:', error);
      this.logout();
      return false;
    }
  }

  // ✅ Get stored token
  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    console.log('🔑 Token retrieved:', token ? 'Yes' : 'No');
    return token;
  }

  // ✅ Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem(this.userKey);
    try {
      const user = userStr ? JSON.parse(userStr) : null;
      console.log('👤 Current user:', user ? user.email || user.username : 'None');
      return user;
    } catch (error) {
      console.error('❌ Error parsing user from localStorage:', error);
      return null;
    }
  }

<<<<<<< Updated upstream
  // Get user display name (using your UserDTO structure)
  getUserDisplayName() {
    const user = this.getCurrentUser();
    if (user) {
      if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
      }
      return user.email || 'User';
    }
    return 'User';
  }

  // Get user initials (using your UserDTO structure)
  getUserInitials() {
    const user = this.getCurrentUser();
    if (user) {
      if (user.firstName && user.lastName) {
        return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
      }
      if (user.firstName) {
        return user.firstName.charAt(0).toUpperCase();
      }
      if (user.email) {
        return user.email.charAt(0).toUpperCase();
      }
    }
    return 'U';
  }

  // Check if user has role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Check if user has any of the specified roles
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return user && roles.includes(user.role);
  }

  // Check if user is admin
  isAdmin() {
    return this.hasRole('ADMIN');
  }

  // Check if user is agent
  isAgent() {
    return this.hasRole('AGENT');
  }

  // Check if user is regular user
  isUser() {
    return this.hasRole('USER') || (!this.isAdmin() && !this.isAgent());
  }

  // Store auth data
=======
  // ✅ Store auth data
>>>>>>> Stashed changes
  setAuthData(token, user) {
    console.log('💾 Storing auth data');
    this.setToken(token);
    this.setUser(user);
    // Set default Authorization header for future requests
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('🔧 Set Authorization header');
    }
  }

  // ✅ Set token
  setToken(token) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
      console.log('💾 Token stored in localStorage');
    }
  }

  // ✅ Set user
  setUser(user) {
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
      console.log('💾 User stored in localStorage:', user.email || user.username);
    }
  }

  // ✅ Error handler - COMPLETE VERSION
  handleError(error) {
    console.error('Auth Service Error:', error);
    
<<<<<<< Updated upstream
    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      return {
        message: 'Cannot connect to server. Please check if the backend is running.',
        isNetworkError: true,
        status: 0
      };
    }
    
    if (error.response?.data) {
      const backendError = error.response.data;
      return {
        message: backendError.message || 'An error occurred',
        status: error.response.status,
        data: backendError,
        isNetworkError: false
      };
    } else if (error.request) {
      return { 
        message: 'No response from server. Please check your connection.',
        status: 0,
        isNetworkError: true
=======
    // Extract original Axios error if exists
    const axiosError = error.originalError || error;
    
    // Handle network errors
    if (axiosError.code === 'NETWORK_ERROR' || 
        axiosError.message?.includes('Network Error') ||
        axiosError.message?.includes('ERR_NETWORK') ||
        axiosError.message?.includes('Failed to fetch')) {
      return {
        message: 'Cannot connect to server. Please check if backend is running and your internet connection.',
        isNetworkError: true,
        status: 0,
        code: 'NETWORK_ERROR',
        originalError: axiosError
      };
    }
    
    // Handle HTTP errors from response
    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data || {};
      
      let userMessage = 'An error occurred';
      let isAuthError = false;
      
      // Customize messages based on HTTP status
      switch (status) {
        case 400:
          userMessage = data.message || data.error || 'Invalid request. Please check your input.';
          break;
        case 401:
          userMessage = data.message || data.error || 'Authentication failed. Please check your credentials.';
          isAuthError = true;
          break;
        case 403:
          userMessage = data.message || data.error || 'Access denied. You do not have permission to access this resource.';
          isAuthError = true;
          break;
        case 404:
          userMessage = data.message || data.error || 'Resource not found. The requested endpoint does not exist.';
          break;
        case 409:
          userMessage = data.message || data.error || 'Conflict. This resource already exists.';
          break;
        case 422:
          userMessage = data.message || data.error || 'Validation error. Please check your data.';
          if (data.errors) {
            userMessage += ': ' + Object.values(data.errors).join(', ');
          }
          break;
        case 429:
          userMessage = data.message || data.error || 'Too many requests. Please try again later.';
          break;
        case 500:
          userMessage = data.message || data.error || 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          userMessage = data.message || data.error || 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          userMessage = data.message || data.error || `Error ${status}: ${axiosError.response.statusText}`;
      }
      
      return {
        message: userMessage,
        status: status,
        data: data,
        isNetworkError: false,
        isAuthError: isAuthError,
        code: `HTTP_${status}`,
        originalError: axiosError
>>>>>>> Stashed changes
      };
    }
    
    // Handle request timeout/no response
    if (axiosError.request) {
      return { 
<<<<<<< Updated upstream
        message: error.message || 'An unexpected error occurred',
        status: 500,
        isNetworkError: false
=======
        message: 'No response from server. The request timed out or the server is not responding.',
        status: 0,
        isNetworkError: true,
        code: 'NO_RESPONSE',
        originalError: axiosError
      };
    }
    
    // Handle request configuration errors
    if (axiosError.code === 'ECONNABORTED') {
      return {
        message: 'Request timeout. Please try again.',
        status: 0,
        isNetworkError: true,
        code: 'TIMEOUT',
        originalError: axiosError
      };
    }
    
    // Handle CORS errors
    if (axiosError.message?.includes('CORS') || axiosError.message?.includes('cross-origin')) {
      return {
        message: 'CORS error. Please check backend CORS configuration.',
        status: 0,
        isNetworkError: false,
        code: 'CORS_ERROR',
        originalError: axiosError
      };
    }
    
    // Unknown error
    return { 
      message: axiosError.message || 'An unexpected error occurred',
      status: 500,
      isNetworkError: false,
      code: 'UNKNOWN_ERROR',
      originalError: axiosError
    };
  }

  // ✅ Test backend connection
  async testConnection() {
    console.log('🌐 Testing backend connection...');
    
    const testEndpoints = [
      '/api/request/test',
      '/api/test/public',
      '/api/health',
      '/health',
      '/test/public',
      '/',  // Root endpoint
      '/api/',  // API root
    ];
    
    for (const endpoint of testEndpoints) {
      try {
        console.log(`🔍 Testing: ${endpoint}`);
        const response = await api.get(endpoint, { timeout: 5000 });
        console.log(`✅ ${endpoint}:`, response.status, response.data);
        
        if (response.status === 200 || response.status === 204) {
          return {
            success: true,
            endpoint: endpoint,
            status: response.status,
            data: response.data,
            message: `Backend reachable at ${endpoint}`
          };
        }
      } catch (error) {
        console.log(`❌ ${endpoint}:`, error.message);
        if (error.response) {
          console.log(`Status: ${error.response.status}, Data:`, error.response.data);
          // Even 404/405 means backend is reachable
          if (error.response.status === 404 || error.response.status === 405 || error.response.status === 401) {
            return {
              success: true,
              endpoint: endpoint,
              status: error.response.status,
              data: error.response.data,
              message: `Backend reachable but endpoint returns ${error.response.status}`
            };
          }
        }
        continue;
      }
    }
    
    console.error('❌ All endpoints failed');
    return {
      success: false,
      message: 'Cannot reach any backend endpoint. Please check: 1) Backend is running, 2) Correct port, 3) CORS configuration',
      isNetworkError: true,
      code: 'BACKEND_UNREACHABLE'
    };
  }

  // ✅ Test registration endpoint
  async testRegistration() {
    console.log('🧪 Testing registration endpoint...');
    
    const testUser = {
      username: `testuser_${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'Test123!',
      firstName: 'Test',
      lastName: 'User',
      role: 'USER'
    };
    
    try {
      console.log('📤 Testing with user:', { 
        username: testUser.username, 
        email: testUser.email 
      });
      
      const result = await this.register(testUser);
      console.log('📥 Registration test result:', result);
      return result;
    } catch (error) {
      console.error('Registration test error:', error);
      return {
        success: false,
        message: error.message,
        error: error
>>>>>>> Stashed changes
      };
    }
  }

  // ✅ Refresh token (if your API supports it)
  async refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      console.log('❌ No refresh token available');
      return { success: false, message: 'No refresh token available' };
    }
    
    try {
      console.log('🔄 Attempting token refresh');
      const response = await Api.post('/api/request/refresh', { refreshToken });
      
      if (response.data.token) {
        this.setToken(response.data.token);
        console.log('✅ Token refreshed successfully');
        return {
          success: true,
          token: response.data.token,
          message: 'Token refreshed'
        };
      }
      
      return {
        success: false,
        message: response.data?.message || 'Token refresh failed'
      };
    } catch (error) {
      console.error('❌ Token refresh error:', error);
      const handledError = this.handleError(error);
      return {
        success: false,
        message: handledError.message,
        error: handledError
      };
    }
  }

  // ✅ Clear all auth data
  clearAuthData() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    if (api.defaults.headers.common['Authorization']) {
      delete api.defaults.headers.common['Authorization'];
    }
    console.log('🧹 All auth data cleared');
  }

  // ✅ Validate token format
  validateToken(token) {
    if (!token) return false;
    
    try {
      // Check if it's a JWT token (3 parts separated by dots)
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Try to decode the payload
      const payload = JSON.parse(atob(parts[1]));
      
      // Check for required JWT fields
      if (!payload.exp || !payload.iat) return false;
      
      return true;
    } catch (error) {
      console.error('❌ Token validation error:', error);
      return false;
    }
  }

  // Test backend connection
  async testConnection() {
    try {
      const response = await api.get('/auth/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

// ✅ Create and export a singleton instance
const authServiceInstance = new AuthService();
export default authServiceInstance;