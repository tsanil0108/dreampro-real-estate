// src/components/LogoutButton.jsx
import { useState } from 'react';
import authService from '../services/AuthService';
import './Login.css'

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      // Redirect to login page after logout
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      authService.clearTokens();
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition duration-200"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default Logout;