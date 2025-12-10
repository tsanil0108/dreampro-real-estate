// src/services/authService.js
import api from "./Api";

class AuthService {
  constructor() {
    this.tokenKey = 'accessToken';
    this.userKey = 'user';
    this.refreshTokenKey = 'refreshToken';
  }

  // Login user - UPDATED for your backend response format
  async login(credentials) {
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
      
      return response.data;
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
    // Clear all auth-related data
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    
    // Optional: Call backend logout endpoint
    // Note: This might fail if token is already invalid, so we don't await it
    // api.post('/auth/logout').catch(() => {});
    
    // Redirect to login page
    window.location.href = '/login';
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode token payload to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        // Token is expired, clear it
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      // Invalid token format
      this.logout();
      return false;
    }
  }

  // Get stored token
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem(this.userKey);
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
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
    this.setToken(token);
    this.setUser(user);
  }

  // Set token separately
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Set user separately
  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Get auth headers for API calls
  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Error handler
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
    } else {
      return { 
        message: error.message || 'An unexpected error occurred',
        status: 500,
        isNetworkError: false
      };
    }
  }

  // Clear auth data without redirect (useful for silent logout)
  clearAuthData() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
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

// Create and export a singleton instance
const authService = new AuthService();
export default authService;