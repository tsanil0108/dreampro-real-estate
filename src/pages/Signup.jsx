import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaPaintRoller, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLock, 
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaStar,
  FaHandshake,
  FaSpinner
} from "react-icons/fa";
import "./Signup.css";

// This would typically be your backend API endpoint
const API_BASE_URL = "https://your-backend-api.com/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    serviceType: "", // "property" or "interior"
    agreeTerms: false,
    newsletter: true
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const serviceTypes = [
    { 
      value: "property", 
      label: "Property Services", 
      icon: <FaHome />, 
      description: "Buy, sell, or invest in properties",
      features: [
        "Property search & alerts",
        "Expert agent matching",
        "Market value estimation",
        "Virtual tours"
      ]
    },
    { 
      value: "interior", 
      label: "Interior Work", 
      icon: <FaPaintRoller />, 
      description: "Interior design, renovation, or construction",
      features: [
        "Free design consultation",
        "Material selection",
        "3D visualization",
        "Project management"
      ]
    }
  ];

  // Real email validation
  const validateEmail = async (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Check for disposable/temporary emails
    const disposableDomains = [
      "tempmail.com", "mailinator.com", "guerrillamail.com", 
      "10minutemail.com", "throwawaymail.com", "yopmail.com"
    ];
    
    const domain = email.split('@')[1].toLowerCase();
    if (disposableDomains.some(d => domain.includes(d))) {
      return "Please use a permanent email address";
    }

    // In a real app, you would check with your backend API for existing email
    // try {
    //   const response = await fetch(`${API_BASE_URL}/check-email`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    //   });
    //   
    //   const data = await response.json();
    //   if (data.exists) {
    //     return "Email already registered. Please login instead.";
    //   }
    // } catch (error) {
    //   console.error("Email check failed:", error);
    // }

    return "";
  };

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

  const validateStep1 = async () => {
    const newErrors = {};

    // Validate service type
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailError = await validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        newErrors.phone = "Phone number must be 10 digits";
      } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
        newErrors.phone = "Please enter a valid Indian mobile number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character (@$!%*?&)";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (await validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, this would be your API call
      // const response = await fetch(`${API_BASE_URL}/signup`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // 
      // const data = await response.json();
      // 
      // if (response.ok) {
      //   setRegistrationSuccess(true);
      // } else {
      //   throw new Error(data.message || 'Signup failed');
      // }

      // For demo - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful registration
      setRegistrationSuccess(true);
      
      // In real app, you might want to automatically log the user in
      // or redirect them to login page after a delay
      
    } catch (error) {
      alert(`Signup failed: ${error.message}`);
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleCreateAnother = () => {
    setRegistrationSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      serviceType: "",
      agreeTerms: false,
      newsletter: true
    });
    setStep(1);
    setErrors({});
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
      <div className="signup-container">
        {/* Left Side - Form */}
        <div className="signup-form-section">
          <div className="form-header">
            <Link to="/" className="logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">DreamPro</span>
            </Link>
            <h1>Create Your Account</h1>
            <p className="subtitle">Join DreamPro for property services or interior work</p>
          </div>

          {!registrationSuccess ? (
            <>
              {/* Progress Steps */}
              <div className="progress-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <span>Service & Info</span>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <span>Security</span>
                </div>
              </div>

              <form className="signup-form" onSubmit={handleSubmit}>
                {/* Step 1: Service Selection & Basic Info */}
                {step === 1 && (
                  <div className="form-step">
                    <h2>What service do you need?</h2>
                    
                    {/* Service Type Selection */}
                    <div className="service-type-section">
                      <label className="section-label">Select Service Type *</label>
                      {errors.serviceType && (
                        <span className="error-message">{errors.serviceType}</span>
                      )}
                      <div className="service-type-grid">
                        {serviceTypes.map(service => (
                          <div
                            key={service.value}
                            className={`service-type-card ${
                              formData.serviceType === service.value ? 'selected' : ''
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
                          >
                            <div className="service-icon">{service.icon}</div>
                            <div className="service-info">
                              <div className="service-label">{service.label}</div>
                              <div className="service-description">{service.description}</div>
                              <div className="service-features">
                                {service.features.map((feature, index) => (
                                  <span key={index} className="feature-tag">
                                    <FaCheck /> {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">
                          <FaUser /> First Name *
                        </label>
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
                        <label htmlFor="lastName">
                          <FaUser /> Last Name *
                        </label>
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
                      <label htmlFor="email">
                        <FaEnvelope /> Email Address *
                      </label>
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
                      <label htmlFor="phone">
                        <FaPhone /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                        placeholder="Enter your 10-digit phone number"
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <button 
                      type="button" 
                      className="btn btn-primary btn-next"
                      onClick={handleNextStep}
                    >
                      Continue to Security <FaArrowRight />
                    </button>
                  </div>
                )}

                {/* Step 2: Password Creation */}
                {step === 2 && (
                  <div className="form-step">
                    <h2>Create Your Password</h2>

                    <div className="form-group">
                      <label htmlFor="password">
                        <FaLock /> Password *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="Create a strong password"
                      />
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="password-strength">
                          <div className="strength-bars">
                            {[1, 2, 3, 4, 5].map((index) => (
                              <div 
                                key={index}
                                className={`strength-bar ${index <= passwordStrength.strength ? 'active' : ''}`}
                                style={{ backgroundColor: passwordStrength.color }}
                              ></div>
                            ))}
                          </div>
                          <span className="strength-label">
                            Strength: <strong>{passwordStrength.label}</strong>
                          </span>
                        </div>
                      )}
                      
                      {errors.password && <span className="error-message">{errors.password}</span>}
                      
                      {/* Password Requirements */}
                      <div className="password-requirements">
                        <h4>Password Requirements:</h4>
                        <ul>
                          <li className={formData.password.length >= 8 ? 'met' : ''}>
                            <FaCheck /> At least 8 characters
                          </li>
                          <li className={/[a-z]/.test(formData.password) ? 'met' : ''}>
                            <FaCheck /> One lowercase letter
                          </li>
                          <li className={/[A-Z]/.test(formData.password) ? 'met' : ''}>
                            <FaCheck /> One uppercase letter
                          </li>
                          <li className={/\d/.test(formData.password) ? 'met' : ''}>
                            <FaCheck /> One number
                          </li>
                          <li className={/[@$!%*?&]/.test(formData.password) ? 'met' : ''}>
                            <FaCheck /> One special character (@$!%*?&)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        <FaLock /> Confirm Password *
                      </label>
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
                          Send me updates and offers from DreamPro
                        </label>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        onClick={handlePrevStep}
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="spinner" /> Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            /* Registration Success Step */
            <div className="success-step">
              <div className="success-icon">
                <div className="checkmark-circle">
                  <FaCheck />
                </div>
              </div>
              
              <div className="success-content">
                <h2>Account Created Successfully! 🎉</h2>
                
                <div className="success-details">
                  <div className="success-message">
                    <p>
                      Welcome to <strong>DreamPro</strong>, <strong>{formData.firstName}</strong>!
                    </p>
                    <p className="user-email">
                      Email: <strong>{formData.email}</strong>
                    </p>
                    <div className="service-selected">
                      <strong>Service Type:</strong>{" "}
                      {serviceTypes.find(s => s.value === formData.serviceType)?.label}
                    </div>
                  </div>

                  <div className="success-benefits">
                    <h4>What's next?</h4>
                    <ul>
                      <li><FaCheck /> Complete your profile for better recommendations</li>
                      <li><FaCheck /> Browse available properties or interior services</li>
                      <li><FaCheck /> Get personalized matches based on your preferences</li>
                      <li><FaCheck /> Contact certified agents/designers directly</li>
                    </ul>
                  </div>
                </div>

                <div className="success-actions">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleGoToLogin}
                  >
                    Go to Login
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={handleCreateAnother}
                  >
                    Create Another Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {!registrationSuccess && (
            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login" className="link">Sign in</Link>
              </p>
            </div>
          )}
        </div>

        {/* Right Side - Benefits */}
        <div className="signup-benefits-section">
          <div className="benefits-content">
            <h2>Why Join DreamPro?</h2>
            <p className="benefits-subtitle">Your journey starts here</p>
            
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaShieldAlt />
                </div>
                <div className="benefit-text">
                  <h4>Secure Account</h4>
                  <p>Your information is protected with industry-standard security</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaStar />
                </div>
                <div className="benefit-text">
                  <h4>Verified Services</h4>
                  <p>All properties and service providers are verified</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaHandshake />
                </div>
                <div className="benefit-text">
                  <h4>Trusted Partners</h4>
                  <p>Connect with certified agents and interior designers</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaHome />
                </div>
                <div className="benefit-text">
                  <h4>Personalized Experience</h4>
                  <p>Get recommendations based on your preferences</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaPaintRoller />
                </div>
                <div className="benefit-text">
                  <h4>Quality Guarantee</h4>
                  <p>We ensure quality standards for all services</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                "DreamPro made finding my dream home so easy! The verification process gave me confidence in the properties."
              </div>
              <div className="testimonial-author">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="User" 
                  className="author-avatar"
                />
                <div className="author-info">
                  <strong>Priya Sharma</strong>
                  <span>Verified Home Owner</span>
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