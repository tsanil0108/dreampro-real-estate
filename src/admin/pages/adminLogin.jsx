import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaLock, FaUser, FaEye, FaEyeSlash, FaBuilding, 
  FaPaintRoller, FaSignInAlt, FaShieldAlt 
} from 'react-icons/fa';
import AdminService from '../services/AdminService';
import '../../styles/admin-Login.css';

const adminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setLoginError('');

    try {
      const response = await AdminService.login(formData);
      
      if (response.success) {
        // Store auth data
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminUser', JSON.stringify(response.user));
        
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('adminRemember', 'true');
        }
        
        // Show success message
        alert('Login successful! Redirecting to dashboard...');
        
        // Redirect to dashboard
        navigate('/admin/dashboard');
      } else {
        setLoginError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoginError(error.message || 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (loginError) setLoginError('');
  };

  const handleDemoLogin = (type) => {
    const demoCredentials = {
      'real-estate': { email: 'admin@dreampro.com', password: 'admin123' },
      'interior': { email: 'interior@dreampro.com', password: 'interior123' },
      'super': { email: 'superadmin@dreampro.com', password: 'super123' }
    };
    
    setFormData({
      ...formData,
      email: demoCredentials[type].email,
      password: demoCredentials[type].password,
      rememberMe: true
    });
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        {/* Left Panel - Info */}
        <div className="login-info-panel">
          <div className="info-header">
            <div className="brand-logo">
              <FaBuilding className="real-estate-icon" />
              <FaPaintRoller className="interior-icon" />
            </div>
            <h1>DreamPro Admin</h1>
            <p className="brand-subtitle">Unified Management Platform</p>
          </div>

          <div className="platform-features">
            <div className="feature-section">
              <h4><FaBuilding className="me-2" /> Real Estate Management</h4>
              <ul>
                <li>Property Listings & Management</li>
                <li>Agent & Client Management</li>
                <li>Booking & Schedule Management</li>
                <li>Sales Analytics & Reports</li>
              </ul>
            </div>

            <div className="feature-section">
              <h4><FaPaintRoller className="me-2" /> Interior Work Management</h4>
              <ul>
                <li>Project Planning & Tracking</li>
                <li>Design & Material Management</li>
                <li>Team & Resource Allocation</li>
                <li>Client Consultation Management</li>
              </ul>
            </div>
          </div>

          <div className="security-info">
            <FaShieldAlt className="security-icon" />
            <p>Secure admin portal with multi-factor authentication and activity logging</p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-form-panel">
          <div className="form-card">
            <div className="form-header">
              <h2><FaSignInAlt className="me-2" /> Admin Login</h2>
              <p className="form-subtitle">Access your management dashboard</p>
            </div>

            {loginError && (
              <div className="alert alert-danger">
                <strong>Error:</strong> {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>
                  <FaUser className="input-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="admin@dreampro.com"
                  disabled={loading}
                  autoComplete="username"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label>
                  <FaLock className="input-icon" />
                  Password
                </label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="form-options">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="form-check-input"
                    disabled={loading}
                  />
                  <label htmlFor="rememberMe" className="form-check-label">
                    Remember me
                  </label>
                </div>
                <Link to="/admin/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="me-2" />
                    Sign In
                  </>
                )}
              </button>

              <div className="demo-section">
                <p className="demo-label">Quick Demo Access:</p>
                <div className="demo-buttons">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleDemoLogin('real-estate')}
                    disabled={loading}
                  >
                    <FaBuilding className="me-2" />
                    Real Estate Admin
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => handleDemoLogin('interior')}
                    disabled={loading}
                  >
                    <FaPaintRoller className="me-2" />
                    Interior Admin
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleDemoLogin('super')}
                    disabled={loading}
                  >
                    <FaShieldAlt className="me-2" />
                    Super Admin
                  </button>
                </div>
              </div>

              <div className="login-footer">
                <div className="divider">
                  <span>or</span>
                </div>
                
                <div className="alternative-actions">
                  <Link to="/" className="btn btn-outline-secondary">
                    ← Back to Main Site
                  </Link>
                  <Link to="/admin/support" className="btn btn-link">
                    Need Help?
                  </Link>
                </div>

                <div className="system-status">
                  <div className="status-item">
                    <span className="status-indicator online"></span>
                    System Status: <strong>Online</strong>
                  </div>
                  <div className="status-item">
                    <span className="status-indicator secure"></span>
                    Connection: <strong>Secure</strong>
                  </div>
                </div>

                <div className="copyright">
                  <p className="mb-0">
                    © {new Date().getFullYear()} DreamPro Management System v2.0
                  </p>
                  <small className="text-muted">
                    Last updated: {new Date().toLocaleDateString()}
                  </small>
                </div>
              </div>
            </form>
          </div>

          <div className="security-notice">
            <FaShieldAlt className="me-2" />
            <span>
              <strong>Security Notice:</strong> This is a secure system. Unauthorized access is prohibited.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminLogin;