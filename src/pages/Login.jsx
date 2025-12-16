// src/components/Login.jsx - FULL FIXED VERSION
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaFacebook, 
  FaApple, 
  FaHome,
  FaArrowRight,
  FaSpinner,
  FaShieldAlt,
  FaCheckCircle,
  FaPaintRoller,
  FaChair,
  FaRulerCombined,
  FaToolbox,
  FaPalette,
  FaExclamationTriangle
} from 'react-icons/fa';
import authService from '../services/AuthService';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const navigate = useNavigate();

  // Check backend connection on mount
  useEffect(() => {
    console.log('🔧 Login component mounted');
    checkBackendConnection();
    
    // Check for remember me
    const remember = localStorage.getItem('rememberMe');
    if (remember === 'true') {
      setRememberMe(true);
    }
    
    // Auto-fill test credentials in development
    if (import.meta.env.DEV) {
      setFormData({
        email: 'test@example.com',
        password: 'Test123!'
      });
    }
  }, []);

  const checkBackendConnection = async () => {
    console.log('🌐 Checking backend connection...');
    setBackendStatus('checking');
    const result = await authService.testConnection();
    
    if (result.success) {
      setBackendStatus('online');
      console.log('✅ Backend connection:', result.message);
    } else {
      setBackendStatus('offline');
      console.error('❌ Backend connection failed:', result.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Form submitted');
    console.log('📋 Form data:', formData);
    console.log('🔄 Loading state:', loading);
    console.log('🌐 Backend status:', backendStatus);
    
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    console.log('✅ Validation passed, checking backend...');

    // Check backend first
    if (backendStatus !== 'online') {
      setError('Cannot connect to server. Please check if backend is running.');
      setLoading(false);
      await checkBackendConnection();
      return;
    }

    console.log('🌐 Backend is online, calling authService.login...');

    try {
      // Call the updated authService.login() method
      const result = await authService.login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('🔑 Login result:', result);
      
      if (result.success) {
        console.log('✅ Login successful');
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        
        // Show success message
        alert('Login successful! Welcome back.');
        
        // Redirect on success
        navigate('/dashboard');
      } else {
        console.log('❌ Login failed:', result.message);
        setError(result.message || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('💥 Login error:', err);
      setError(err.message || 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
      console.log('🏁 Login process finished');
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Sign in with ${provider} would be implemented here.`);
  };

  const handleForgotPassword = () => {
    const email = prompt('Please enter your email to reset password:');
    if (email) {
      alert(`Password reset link would be sent to ${email} in a real application.`);
    }
  };

  const handleTestRegistration = async () => {
    setLoading(true);
    setError('');
    
    // Test registration endpoint
    try {
      const testUser = {
        username: `testuser_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'Test123!',
        firstName: 'Test',
        lastName: 'User',
        role: 'USER'
      };
      
      const result = await authService.register(testUser);
      
      if (result.success) {
        setError(`✅ Test registration successful! User: ${testUser.email}`);
      } else {
        setError(`❌ Test registration failed: ${result.message}`);
      }
    } catch (err) {
      setError(`❌ Test error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Debug Button */}
      <button
        onClick={() => {
          console.log('🧪 Debug button clicked');
          console.log('Form data:', formData);
          console.log('Backend status:', backendStatus);
          console.log('Loading:', loading);
          console.log('Remember me:', rememberMe);
          
          // Test backend connection
          checkBackendConnection();
        }}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 9999,
          padding: '8px 12px',
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        🐛 Debug
      </button>

      {/* Animated Background */}
      <div className="login-background">
        <div className="login-floating-shapes">
          <div className="login-shape login-shape-1"></div>
          <div className="login-shape login-shape-2"></div>
          <div className="login-shape login-shape-3"></div>
          <div className="login-shape login-shape-4"></div>
          <div className="login-shape login-shape-5"></div>
        </div>
        
        {/* Background Pattern */}
        <div className="login-bg-pattern"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Brand/Info */}
        <div className="login-hero">
          <div className="login-hero-content">
            <Link to="/" className="login-brand-logo">
              <span className="login-logo-icon">🏠</span>
              <span className="login-logo-text">DreamPro</span>
            </Link>
            
            <div className="login-hero-text">
              <h1 className="login-hero-title">Welcome Back!</h1>
              <p className="login-hero-subtitle">
                Sign in to access your personalized dashboard, saved properties, and interior work projects.
              </p>
            </div>

            {/* Backend Status Indicator */}
            <div className="login-backend-status">
              <div className={`login-status-indicator login-status-${backendStatus}`}>
                {backendStatus === 'online' && '✅ Backend Connected'}
                {backendStatus === 'offline' && '❌ Backend Offline'}
                {backendStatus === 'checking' && '🔄 Checking Connection...'}
              </div>
              {backendStatus === 'offline' && (
                <div className="login-troubleshooting">
                  <p><strong>Backend server is not reachable.</strong></p>
                  <ul>
                    <li>Ensure Spring Boot is running on port 8080</li>
                    <li>Check if backend URL is correct: http://localhost:8080/api</li>
                    <li>Verify CORS configuration in backend</li>
                    <li>Check browser console for errors (F12)</li>
                  </ul>
                  <button 
                    onClick={checkBackendConnection}
                    className="login-retry-btn"
                  >
                    Retry Connection
                  </button>
                  <button 
                    onClick={handleTestRegistration}
                    className="login-test-btn"
                  >
                    Test Registration Endpoint
                  </button>
                </div>
              )}
            </div>

            <div className="login-service-categories">
              <div className="login-service-category">
                <h3 className="login-service-title">
                  <FaHome /> Real Estate Services
                </h3>
                <div className="login-service-features">
                  <div className="login-service-feature">
                    <FaCheckCircle className="login-feature-icon" />
                    <span>Property search & alerts</span>
                  </div>
                  <div className="login-service-feature">
                    <FaCheckCircle className="login-feature-icon" />
                    <span>Virtual property tours</span>
                  </div>
                  <div className="login-service-feature">
                    <FaCheckCircle className="login-feature-icon" />
                    <span>Agent consultations</span>
                  </div>
                  <div className="login-service-feature">
                    <FaCheckCircle className="login-feature-icon" />
                    <span>Investment guidance</span>
                  </div>
                </div>
              </div>

              <div className="login-service-category">
                <h3 className="login-service-title">
                  <FaPaintRoller /> Interior Work Services
                </h3>
                <div className="login-service-features">
                  <div className="login-service-feature">
                    <FaChair className="login-feature-icon" />
                    <span>Custom furniture design</span>
                  </div>
                  <div className="login-service-feature">
                    <FaPalette className="login-feature-icon" />
                    <span>Color consultation</span>
                  </div>
                  <div className="login-service-feature">
                    <FaToolbox className="login-feature-icon" />
                    <span>Carpentry & woodwork</span>
                  </div>
                  <div className="login-service-feature">
                    <FaRulerCombined className="login-feature-icon" />
                    <span>Space planning</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="login-hero-testimonial">
              <div className="login-testimonial-content">
                "DreamPro helped me transform my apartment with beautiful interior work while helping me find the perfect investment property!"
              </div>
              <div className="login-testimonial-author">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User" 
                  className="login-author-avatar"
                />
                <div className="login-author-info">
                  <strong>Rajesh Kumar</strong>
                  <span>Property Investor & Home Owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-card">
            <div className="login-form-header">
              <h2 className="login-form-title">Sign In to Your Account</h2>
              <p className="login-form-subtitle">
                Don't have an account?{' '}
                <Link to="/signup" className="login-signup-link">
                  Create one now
                </Link>
              </p>
            </div>

            {/* Service Type Toggle */}
            <div className="login-service-toggle">
              <div className="login-service-buttons">
                <Link to="/properties" className="login-service-btn login-service-property">
                  <FaHome /> Property Services
                </Link>
                <Link to="/interior-work" className="login-service-btn login-service-interior">
                  <FaPaintRoller /> Interior Work
                </Link>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="login-social-login">
              <p className="login-social-login-label">Or continue with</p>
              <div className="login-social-buttons">
                <button 
                  type="button" 
                  className="login-social-btn login-google-btn"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={backendStatus !== 'online'}
                >
                  <FaGoogle /> Google
                </button>
                <button 
                  type="button" 
                  className="login-social-btn login-facebook-btn"
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={backendStatus !== 'online'}
                >
                  <FaFacebook /> Facebook
                </button>
                <button 
                  type="button" 
                  className="login-social-btn login-apple-btn"
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={backendStatus !== 'online'}
                >
                  <FaApple /> Apple
                </button>
              </div>
            </div>

            <div className="login-divider">
              <span>or use email</span>
            </div>

            <form className="login-main-form" onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label htmlFor="email" className="login-form-label">
                  <FaEnvelope /> Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="login-form-input"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => {
                    console.log('📧 Email changed:', e.target.value);
                    setFormData({...formData, email: e.target.value});
                    setError('');
                  }}
                  onFocus={() => console.log('🔍 Email input focused')}
                  onBlur={() => console.log('📤 Email input blurred')}
                  disabled={backendStatus !== 'online' || loading}
                  style={{ border: '2px solid #4CAF50' }} // Green border for visibility
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="password" className="login-form-label">
                  <FaLock /> Password *
                </label>
                <div className="login-password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    className="login-form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => {
                      console.log('🔐 Password changed:', '•'.repeat(e.target.value.length));
                      setFormData({...formData, password: e.target.value});
                      setError('');
                    }}
                    onFocus={() => console.log('🔍 Password input focused')}
                    disabled={backendStatus !== 'online' || loading}
                    style={{ border: '2px solid #4CAF50' }} // Green border for visibility
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => {
                      console.log('👁️ Password visibility toggled');
                      setShowPassword(!showPassword);
                    }}
                    disabled={backendStatus !== 'online' || loading}
                    style={{ border: '2px solid #2196F3' }} // Blue border for visibility
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="login-form-options">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => {
                      console.log('💾 Remember me changed:', e.target.checked);
                      setRememberMe(e.target.checked);
                    }}
                    disabled={backendStatus !== 'online' || loading}
                    style={{ transform: 'scale(1.2)' }} // Make checkbox more visible
                  />
                  <span className="login-checkmark"></span>
                  Remember me
                </label>
                
                <button 
                  type="button" 
                  className="login-forgot-password-btn"
                  onClick={() => {
                    console.log('🔓 Forgot password clicked');
                    handleForgotPassword();
                  }}
                  disabled={backendStatus !== 'online' || loading}
                  style={{ border: '1px solid #ff9800' }} // Orange border for visibility
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className={`login-error-message ${error.includes('✅') ? 'login-success-message' : ''}`}>
                  {error.includes('❌') ? <FaExclamationTriangle /> : error.includes('✅') ? '✅' : <FaShieldAlt />} 
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password || backendStatus !== 'online'}
                className="login-submit-button"
                onClick={() => console.log('🎯 Submit button clicked')}
                style={{ 
                  border: '3px solid #FF4081',
                  background: loading ? '#ccc' : '#007bff',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="login-spinner" /> Signing In...
                  </>
                ) : (
                  <>
                    Sign In <FaArrowRight />
                  </>
                )}
              </button>

              {/* Quick Test Login (for development) */}
              {import.meta.env.DEV && (
                <div className="login-test-credentials">
                  <button 
                    type="button"
                    onClick={() => {
                      console.log('🧪 Test credentials button clicked');
                      setFormData({
                        email: 'test@example.com',
                        password: 'Test123!'
                      });
                    }}
                    className="login-test-btn-small"
                    style={{ 
                      marginTop: '10px',
                      padding: '5px 10px',
                      background: '#9C27B0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    Fill Test Credentials
                  </button>
                </div>
              )}
            </form>

            <div className="login-form-footer">
              <div className="login-security-note">
                <FaShieldAlt /> Your information is secure with us
              </div>
              
              <div className="login-signup-promo">
                <p className="login-signup-text">
                  New to DreamPro?{' '}
                  <Link to="/signup" className="login-signup-cta">
                    Create your free account
                  </Link>
                </p>
                <p className="login-signup-benefits">
                  Get access to property listings and interior work services
                </p>
              </div>
            </div>

            {/* Quick Service CTAs */}
            <div className="login-quick-ctas">
              <div className="login-quick-property">
                <h3 className="login-quick-title">Looking for Properties?</h3>
                <p className="login-quick-description">Browse thousands of properties</p>
                <Link to="/properties" className="login-quick-btn login-quick-property-btn">
                  <FaHome /> Explore Properties
                </Link>
              </div>
              
              <div className="login-quick-interior">
                <h3 className="login-quick-title">Need Interior Work?</h3>
                <p className="login-quick-description">Transform your space with experts</p>
                <Link to="/interior-work" className="login-quick-btn login-quick-interior-btn">
                  <FaPaintRoller /> View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;