// src/services/authService.js
import api from "./Api"; // Fixed typo: apii -> api

class AuthService {
  constructor() {
    this.tokenKey = 'accessToken';
    this.userKey = 'user';
    this.refreshTokenKey = 'refreshToken';
  }

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.data?.token) {
        const { token, user } = response.data.data;
        this.setAuthData(token, user);
      } else if (response.data.accessToken) {
        // Alternative response format
        const { accessToken, user } = response.data;
        this.setAuthData(accessToken, user);
      } else if (response.data.token) {
        // Another common format
        const { token, user } = response.data;
        this.setAuthData(token, user);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Auto-login after registration if token is returned
      if (response.data.data?.token || response.data.accessToken || response.data.token) {
        const token = response.data.data?.token || response.data.accessToken || response.data.token;
        const user = response.data.data?.user || response.data.user;
        if (token && user) {
          this.setAuthData(token, user);
        }
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      
      // Update user data if profile is more detailed
      if (response.data.data) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...response.data.data };
          this.setUser(updatedUser);
        }
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData);
      
      // Update user in localStorage
      if (response.data.data) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...response.data.data };
          this.setUser(updatedUser);
        }
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Refresh token (if your API supports it)
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(this.refreshTokenKey);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh-token', { refreshToken });
      
      if (response.data.accessToken) {
        this.setToken(response.data.accessToken);
        return response.data.accessToken;
      }
      
      throw new Error('No access token in response');
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

  // Check if user has role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Check if user has any of the specified roles
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return roles.includes(user?.role);
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
    return this.hasRole('USER');
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
    
    if (error.response?.data) {
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      return { 
        message: 'No response from server. Please check your connection.',
        status: 0
      };
    } else {
      return { 
        message: error.message || 'An unexpected error occurred',
        status: 500
      };
    }
  }

  // Clear auth data without redirect (useful for silent logout)
  clearAuthData() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;