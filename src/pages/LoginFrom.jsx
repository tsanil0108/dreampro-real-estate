import React, { useState, useEffect } from 'react';
import authService from '../services/AuthService';


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.login(formData);
      console.log('Login successful:', result);
      
      // Redirect based on user role
      if (authService.isAdmin()) {
        window.location.href = '/admin/dashboard';
      } else if (authService.isAgent()) {
        window.location.href = '/agent/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default LoginForm;