import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateAgentAccount.css';

const CreateAgentAccount = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePhoto: null,
    
    // Professional Information
    licenseNumber: '',
    licenseState: '',
    yearsExperience: '',
    specialties: [],
    bio: '',
    
    // Agency Information
    agencyName: '',
    agencyAddress: '',
    agencyPhone: '',
    website: '',
    
    // Social Media
    linkedin: '',
    instagram: '',
    facebook: '',
    
    // Account Credentials
    password: '',
    confirmPassword: '',
    
    // Terms
    agreeToTerms: false,
    receiveUpdates: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const specialtiesOptions = [
    "Residential Sales",
    "Commercial Real Estate",
    "Luxury Properties",
    "Investment Properties",
    "Rentals",
    "New Developments",
    "Property Management",
    "International Properties",
    "Vacation Homes",
    "Land & Lots"
  ];

  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox" && name === "specialties") {
      const updatedSpecialties = formData.specialties.includes(value)
        ? formData.specialties.filter(spec => spec !== value)
        : [...formData.specialties, value];
      
      setFormData(prev => ({
        ...prev,
        specialties: updatedSpecialties
      }));
    } else if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateStep = (step) => {
    // Simple validation - you can expand this
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.licenseNumber && formData.licenseState && formData.yearsExperience && formData.specialties.length > 0;
      case 3:
        return formData.agencyName && formData.agencyAddress;
      case 4:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && formData.agreeToTerms;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      // Reset form or redirect
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', profilePhoto: null,
        licenseNumber: '', licenseState: '', yearsExperience: '', specialties: [], bio: '',
        agencyName: '', agencyAddress: '', agencyPhone: '', website: '',
        linkedin: '', instagram: '', facebook: '',
        password: '', confirmPassword: '',
        agreeToTerms: false, receiveUpdates: true
      });
      setCurrentStep(1);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="create-agent-account-page">
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <Link to="/" className="back-button">
            ← Back to Home
          </Link>
          <h1>Join Our Elite Agent Network</h1>
          <p>Create your professional profile and start connecting with premium clients</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Personal Info</span>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Professional</span>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Agency</span>
            </div>
            <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
              <span className="step-number">4</span>
              <span className="step-label">Account</span>
            </div>
          </div>
        </div>

        <div className="contact-content">
          {/* Form Section */}
          <div className="contact-form-section">
            <h2>Create Your Agent Account</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="form-step">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="profilePhoto">Profile Photo</label>
                    <input
                      type="file"
                      id="profilePhoto"
                      name="profilePhoto"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h3>Professional Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="licenseNumber">License Number *</label>
                      <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter your license number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="licenseState">License State *</label>
                      <select
                        id="licenseState"
                        name="licenseState"
                        value={formData.licenseState}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="yearsExperience">Years of Experience *</label>
                    <select
                      id="yearsExperience"
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Specialties *</label>
                    <div className="specialties-grid">
                      {specialtiesOptions.map(specialty => (
                        <label key={specialty} className="specialty-checkbox">
                          <input
                            type="checkbox"
                            name="specialties"
                            value={specialty}
                            checked={formData.specialties.includes(specialty)}
                            onChange={handleChange}
                          />
                          <span className="checkmark"></span>
                          {specialty}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Professional Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your professional background and expertise..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Agency Information */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h3>Agency Information</h3>
                  <div className="form-group">
                    <label htmlFor="agencyName">Agency/Brokerage Name *</label>
                    <input
                      type="text"
                      id="agencyName"
                      name="agencyName"
                      value={formData.agencyName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your agency name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="agencyAddress">Agency Address *</label>
                    <input
                      type="text"
                      id="agencyAddress"
                      name="agencyAddress"
                      value={formData.agencyAddress}
                      onChange={handleChange}
                      required
                      placeholder="Enter your agency address"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="agencyPhone">Agency Phone</label>
                      <input
                        type="tel"
                        id="agencyPhone"
                        name="agencyPhone"
                        value={formData.agencyPhone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website">Website</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Social Media Profiles</label>
                    <div className="social-inputs">
                      <div className="social-input">
                        <span className="social-icon">💼</span>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          placeholder="LinkedIn Profile URL"
                        />
                      </div>
                      <div className="social-input">
                        <span className="social-icon">📷</span>
                        <input
                          type="url"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                          placeholder="Instagram Profile URL"
                        />
                      </div>
                      <div className="social-input">
                        <span className="social-icon">👥</span>
                        <input
                          type="url"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleChange}
                          placeholder="Facebook Profile URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Account Setup */}
              {currentStep === 4 && (
                <div className="form-step">
                  <h3>Account Setup</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password">Password *</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Create a strong password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password *</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="terms-checkbox">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                      />
                      <span className="checkmark"></span>
                      I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link> *
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="terms-checkbox">
                      <input
                        type="checkbox"
                        name="receiveUpdates"
                        checked={formData.receiveUpdates}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      I want to receive updates about new features and opportunities
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                  >
                    ← Previous
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleNextStep}
                  >
                    Continue →
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account 🎉'}
                  </button>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="success-message">
                  ✅ Account created successfully! Welcome to DreamPro!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="error-message">
                  ❌ Please fill in all required fields correctly.
                </div>
              )}
            </form>
          </div>

          {/* Benefits Section */}
          <div className="contact-info-section">
            <h2>Why Join DreamPro?</h2>
            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">🏆</div>
                <div className="info-content">
                  <h4>Premium Listings</h4>
                  <p>Access exclusive luxury properties<br />and high-value clients</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📊</div>
                <div className="info-content">
                  <h4>Advanced Tools</h4>
                  <p>Powerful analytics dashboard<br />and marketing resources</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🤝</div>
                <div className="info-content">
                  <h4>Direct Connections</h4>
                  <p>Connect directly with serious<br />buyers and sellers</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">💼</div>
                <div className="info-content">
                  <h4>Professional Network</h4>
                  <p>Join our elite network<br />of top-performing agents</p>
                </div>
              </div>
            </div>

            {/* Support Information */}
            <div className="office-hours">
              <h3>Agent Support</h3>
              <div className="hours-list">
                <div className="hour-item">
                  <span>Onboarding Assistance</span>
                  <span>1-on-1 Setup</span>
                </div>
                <div className="hour-item">
                  <span>Technical Support</span>
                  <span>24/7 Available</span>
                </div>
                <div className="hour-item">
                  <span>Training Resources</span>
                  <span>Always Available</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-section">
              <h3>Our Agent Network</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Active Agents</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">$2B+</span>
                  <span className="stat-label">Annual Sales</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Elevate Your Real Estate Career?</h2>
          <p>Join thousands of successful agents who trust DreamPro to grow their business.</p>
          <div className="cta-buttons">
            <button className="cta-btn-primary">Start Your Application</button>
            <button className="cta-btn-secondary">Schedule a Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentAccount;