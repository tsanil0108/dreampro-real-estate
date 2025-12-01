import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "buyer",
    agreeTerms: false,
    newsletter: true
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const userTypes = [
    { value: "buyer", label: "Home Buyer", icon: "🏠", description: "Looking to buy a property" },
    { value: "seller", label: "Home Seller", icon: "💰", description: "Want to sell your property" },
    { value: "investor", label: "Real Estate Investor", icon: "📈", description: "Interested in investment properties" },
    { value: "renter", label: "Renter", icon: "🔑", description: "Looking for rental properties" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep2()) {
      // Simulate API call
      console.log("Signup data:", formData);
      
      // Show success message
      alert(`Welcome to DreamPro, ${formData.firstName}! Your account has been created successfully.`);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        userType: "buyer",
        agreeTerms: false,
        newsletter: true
      });
      setStep(1);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengths = [
      { label: "Very Weak", color: "#ff6b6b" },
      { label: "Weak", color: "#ff8e53" },
      { label: "Fair", color: "#ffd93d" },
      { label: "Good", color: "#6bcf7f" },
      { label: "Strong", color: "#4ecdc4" }
    ];

    return strengths[Math.min(strength, 4)];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="signup-page">
      <div className="container">
        <div className="signup-container">
          {/* Left Side - Form */}
          <div className="signup-form-section">
            <div className="form-header">
              <Link to="/" className="logo">
                <span className="logo-icon">🏠</span>
                <span className="logo-text">DreamPro</span>
              </Link>
              <h1>Create Your Account</h1>
              <p>Join thousands of users finding their dream properties</p>
            </div>

            {/* Progress Steps */}
            <div className="progress-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <span>Basic Info</span>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <span>Security</span>
              </div>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="form-step">
                  <h2>Tell us about yourself</h2>
                  
                  {/* User Type Selection */}
                  <div className="user-type-section">
                    <label>I am a:</label>
                    <div className="user-type-grid">
                      {userTypes.map(type => (
                        <div
                          key={type.value}
                          className={`user-type-card ${
                            formData.userType === type.value ? 'selected' : ''
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, userType: type.value }))}
                        >
                          <div className="type-icon">{type.icon}</div>
                          <div className="type-info">
                            <div className="type-label">{type.label}</div>
                            <div className="type-description">{type.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error' : ''}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <button type="button" className="btn btn-primary btn-next" onClick={handleNextStep}>
                    Continue to Security
                  </button>
                </div>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <div className="form-step">
                  <h2>Create your password</h2>

                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'error' : ''}
                      placeholder="Create a strong password"
                    />
                    {formData.password && (
                      <div className="password-strength">
                        <div 
                          className="strength-bar" 
                          style={{ 
                            width: `${(passwordStrength.strength / 4) * 100}%`,
                            backgroundColor: passwordStrength.color
                          }}
                        ></div>
                        <span className="strength-label">{passwordStrength.label}</span>
                      </div>
                    )}
                    {errors.password && <span className="error-message">{errors.password}</span>}
                    
                    <div className="password-requirements">
                      <h4>Password must contain:</h4>
                      <ul>
                        <li className={formData.password.length >= 8 ? 'met' : ''}>At least 8 characters</li>
                        <li className={/[a-z]/.test(formData.password) ? 'met' : ''}>One lowercase letter</li>
                        <li className={/[A-Z]/.test(formData.password) ? 'met' : ''}>One uppercase letter</li>
                        <li className={/[0-9]/.test(formData.password) ? 'met' : ''}>One number</li>
                      </ul>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>

                  <div className="form-checkboxes">
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                        I agree to the <a href="/terms" className="link">Terms of Service</a> and <a href="/privacy" className="link">Privacy Policy</a> *
                      </label>
                      {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
                    </div>

                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                        Send me real estate insights and property updates
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Create Account
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login" className="link">Sign in</Link>
              </p>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="signup-benefits-section">
            <div className="benefits-content">
              <h2>Join DreamPro Today</h2>
              <p>Start your journey to finding the perfect property</p>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">🔍</div>
                  <div className="benefit-text">
                    <h4>Personalized Search</h4>
                    <p>Get property recommendations based on your preferences</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">💼</div>
                  <div className="benefit-text">
                    <h4>Expert Agents</h4>
                    <p>Connect with top-rated real estate professionals</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">📈</div>
                  <div className="benefit-text">
                    <h4>Market Insights</h4>
                    <p>Access exclusive market data and trends</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">🔔</div>
                  <div className="benefit-text">
                    <h4>Instant Alerts</h4>
                    <p>Be the first to know about new properties</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <div className="benefit-text">
                    <h4>Best Deals</h4>
                    <p>Get notified about price drops and special offers</p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="testimonial-content">
                  "DreamPro helped me find my dream home in just 2 weeks! The personalized recommendations were spot on."
                </div>
                <div className="testimonial-author">
                  <strong>Sarah Johnson</strong>
                  <span>Home Owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;