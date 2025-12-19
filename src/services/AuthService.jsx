// src/services/authService.js
// import api from "./Api";

class AuthService {
  constructor() {
    this.tokenKey = 'accessToken';
    this.userKey = 'user';
    this.refreshTokenKey = 'refreshToken';
    console.log('✅ AuthService initialized');
  }

  // Login user - UPDATED for your backend response format
  async login(credentials) {
    console.log('🔐 Login attempt:', { email: credentials.email });
    
    try {
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
      }
      
    } catch (error) {
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
      };
    }
    
    // Handle request timeout/no response
    if (axiosError.request) {
      return { 
        message: error.message || 'An unexpected error occurred',
        status: 500,
        isNetworkError: false
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