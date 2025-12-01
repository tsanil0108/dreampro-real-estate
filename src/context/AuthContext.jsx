import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:8080/api";

  // Check session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("dreampro_token");
        const userData = localStorage.getItem("dreampro_user");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("dreampro_token");
        localStorage.removeItem("dreampro_user");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();

      localStorage.setItem("dreampro_token", data.token);
      localStorage.setItem("dreampro_user", JSON.stringify(data.user));

      setUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Manual Login
  const manualLogin = (userData, token) => {
    localStorage.setItem("dreampro_token", token);
    localStorage.setItem("dreampro_user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("dreampro_token");
    localStorage.removeItem("dreampro_user");
    setUser(null);
    window.location.href = "/";
  };

  // User Auth Checks
  const isAuthenticated = () => !!user;

  const getUserRole = () => user?.role || "guest";

  const getUserFullName = () => {
    if (user?.firstName && user?.lastName)
      return `${user.firstName} ${user.lastName}`;
    return user?.firstName || "User";
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName)
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    return user?.firstName?.[0]?.toUpperCase() || "U";
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem("dreampro_token");

      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Profile update failed");
      }

      const data = await response.json();

      setUser(data.user);
      localStorage.setItem("dreampro_user", JSON.stringify(data.user));

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Change Password
  const changePassword = async (passwordData) => {
    try {
      const token = localStorage.getItem("dreampro_token");

      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Password change failed");
      }

      return { success: true, message: "Password updated" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getToken = () => localStorage.getItem("dreampro_token");

  const hasRole = (role) => user?.role === role;

  const isAdmin = () => user?.role === "ADMIN";

  const isAgent = () => user?.role === "AGENT";

  // Refresh user profile
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("dreampro_token");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("dreampro_user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("User refresh failed:", error);
    }
  };

  const value = {
    user,
    login,
    register,
    manualLogin,
    logout,
    isAuthenticated,
    getUserRole,
    getUserFullName,
    getUserInitials,
    updateProfile,
    changePassword,
    getToken,
    hasRole,
    isAdmin,
    isAgent,
    refreshUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
