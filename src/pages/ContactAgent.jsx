import React, { useState } from "react";
import { 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaUserTie,
  FaCalendarAlt,
  FaStar,
  FaCheckCircle,
  FaLinkedin,
  FaClock,
  FaBuilding,
  FaHome,
  FaChartLine
} from "react-icons/fa";
import "./ContactAgent.css";

const ContactAgentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    propertyInterest: "",
    budget: "",
    preferredTime: "",
    urgency: "normal"
  });

  const [selectedAgent, setSelectedAgent] = useState(null);

  const agents = [
    {
      id: 1,
      name: "Anil Thakur",
      role: "Senior Real Estate Agent",
      phone: "+91730460314",
      whatsapp: "+91730460314",
      email: "dreamprospaces@gmail.com",
      location: "Mumbai",
      experience: "5+ years",
      propertiesSold: "250+",
      specialties: ["Luxury Apartments", "Commercial Properties", "Investment Properties"],
      languages: ["English", "Hindi", "Marathi"],
      availability: "Mon-Sat: 9AM - 8PM",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
      rating: 4.9,
      bio: "Expert in Mumbai real estate with 5+ years of experience helping clients find their dream properties."
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Residential Property Specialist",
      phone: "+919876543210",
      whatsapp: "+919876543210",
      email: "priya.sharma@dreamprops.com",
      location: "Delhi NCR",
      experience: "8+ years",
      propertiesSold: "180+",
      specialties: ["Luxury Villas", "Builder Floors", "Gated Communities"],
      languages: ["English", "Hindi", "Punjabi"],
      availability: "Mon-Sun: 10AM - 7PM",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300",
      rating: 4.8,
      bio: "Specialized in residential properties with focus on luxury and comfort."
    },

  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const agentName = selectedAgent ? selectedAgent.name : "our team";
    alert(`Thank you ${formData.name}!\n\nYour message has been sent to ${agentName}. We'll contact you within 24 hours.\n\nReference ID: CONT-${Date.now().toString().slice(-6)}`);
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
      propertyInterest: "",
      budget: "",
      preferredTime: "",
      urgency: "normal"
    });
    setSelectedAgent(null);
  };

  const makeCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const sendWhatsApp = (phoneNumber, message = "") => {
    const text = `Hello, I'm interested in real estate services. ${message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const sendEmail = (email, subject = "Real Estate Inquiry", body = "") => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="contact-agent-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>CONTACT OUR REAL ESTATE AGENTS</h1>
          <p className="header-subtitle">Connect directly with expert agents for personalized property guidance</p>
          <div className="header-features">
            <div className="feature">
              <FaCheckCircle className="feature-icon" />
              <span>Direct Communication</span>
            </div>
            <div className="feature">
              <FaStar className="feature-icon" />
              <span>Expert Advice</span>
            </div>
            <div className="feature">
              <FaChartLine className="feature-icon" />
              <span>Market Insights</span>
            </div>
            <div className="feature">
              <FaClock className="feature-icon" />
              <span>Quick Response</span>
            </div>
          </div>
        </div>

        <div className="contact-agent-container">
          {/* Agents List */}
          <div className="agents-section">
            <h2>Our Expert Agents</h2>
            <div className="agents-grid">
              {agents.map(agent => (
                <div 
                  key={agent.id} 
                  className={`agent-card ${selectedAgent?.id === agent.id ? 'selected' : ''}`}
                  onClick={() => handleAgentSelect(agent)}
                >
                  <div className="agent-card-header">
                    <img src={agent.photo} alt={agent.name} className="agent-photo" />
                    <div className="agent-badge">Expert</div>
                    <div className="agent-rating">
                      <FaStar /> {agent.rating}
                    </div>
                  </div>
                  
                  <div className="agent-info">
                    <h3>{agent.name}</h3>
                    <p className="agent-role">{agent.role}</p>
                    
                    <div className="agent-stats">
                      <div className="stat">
                        <FaUserTie />
                        <span>{agent.experience}</span>
                      </div>
                      <div className="stat">
                        <FaBuilding />
                        <span>{agent.propertiesSold}</span>
                      </div>
                      <div className="stat">
                        <FaMapMarkerAlt />
                        <span>{agent.location}</span>
                      </div>
                    </div>

                    <div className="agent-specialties">
                      <strong>Specialties:</strong>
                      <div className="specialties-tags">
                        {agent.specialties.map((specialty, index) => (
                          <span key={index} className="specialty-tag">{specialty}</span>
                        ))}
                      </div>
                    </div>

                    <div className="agent-contact-quick">
                      <div className="contact-buttons">
                        <button 
                          className="btn-call"
                          onClick={(e) => {
                            e.stopPropagation();
                            makeCall(agent.phone);
                          }}
                        >
                          <FaPhone /> Call Now
                        </button>
                        <button 
                          className="btn-whatsapp"
                          onClick={(e) => {
                            e.stopPropagation();
                            sendWhatsApp(agent.whatsapp);
                          }}
                        >
                          <FaWhatsapp /> WhatsApp
                        </button>
                        <button 
                          className="btn-email"
                          onClick={(e) => {
                            e.stopPropagation();
                            sendEmail(agent.email);
                          }}
                        >
                          <FaEnvelope /> Email
                        </button>
                      </div>
                    </div>

                    <div className="agent-details">
                      <p><FaClock /> <strong>Availability:</strong> {agent.availability}</p>
                      <p><strong>Languages:</strong> {agent.languages.join(", ")}</p>
                      <p className="agent-bio">{agent.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-section">
            <div className="form-header">
              <h2>
                {selectedAgent 
                  ? `Contact ${selectedAgent.name}` 
                  : "Send Message to Our Team"
                }
              </h2>
              {selectedAgent && (
                <div className="selected-agent-info">
                  <img src={selectedAgent.photo} alt={selectedAgent.name} className="selected-agent-photo" />
                  <div className="selected-agent-details">
                    <h4>{selectedAgent.name}</h4>
                    <p>{selectedAgent.role}</p>
                    <div className="quick-contact">
                      <button className="btn-call-sm" onClick={() => makeCall(selectedAgent.phone)}>
                        <FaPhone />
                      </button>
                      <button className="btn-whatsapp-sm" onClick={() => sendWhatsApp(selectedAgent.whatsapp)}>
                        <FaWhatsapp />
                      </button>
                      <button className="btn-email-sm" onClick={() => sendEmail(selectedAgent.email)}>
                        <FaEnvelope />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form className="contact-agent-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label><FaUserTie /> Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Your Name"
                    className="form-input"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label><FaPhone /> Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="Your Phone Number"
                    className="form-input"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label><FaEnvelope /> Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Your Email Address"
                  className="form-input"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FaHome /> Property Interest</label>
                  <select
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    className="form-input"
                    onChange={handleChange}
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa/Bungalow</option>
                    <option value="house">Independent House</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="plot">Plot/Land</option>
                    <option value="rental">Rental Property</option>
                    <option value="investment">Investment Property</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    className="form-input"
                    onChange={handleChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-50">Under ₹50 Lakhs</option>
                    <option value="50-100">₹50 Lakhs - ₹1 Crore</option>
                    <option value="100-200">₹1 - ₹2 Crores</option>
                    <option value="200-500">₹2 - ₹5 Crores</option>
                    <option value="500-plus">₹5+ Crores</option>
                    <option value="not-sure">Not Sure</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FaCalendarAlt /> Preferred Contact Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    className="form-input"
                    onChange={handleChange}
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (4PM - 8PM)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    className="form-input"
                    onChange={handleChange}
                  >
                    <option value="normal">Normal (Within 1 week)</option>
                    <option value="urgent">Urgent (Within 2-3 days)</option>
                    <option value="immediate">Immediate (Today/Tomorrow)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Your Requirements / Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  placeholder="Tell us about your property requirements, preferred locations, specific needs, etc..."
                  className="form-textarea"
                  rows="6"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <FaEnvelope /> SEND MESSAGE
                </button>
                <div className="quick-contact-buttons">
                  <p>Or contact directly:</p>
                  <div className="direct-buttons">
                    <button 
                      type="button" 
                      className="btn-call-lg"
                      onClick={() => makeCall("+91730460314")}
                    >
                      <FaPhone /> Call Office
                    </button>
                    <button 
                      type="button" 
                      className="btn-whatsapp-lg"
                      onClick={() => sendWhatsApp("+91730460314", `Hello, I'm interested in properties. Name: ${formData.name || ''}`)}
                    >
                      <FaWhatsapp /> WhatsApp Chat
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-note">
                <FaCheckCircle /> We guarantee a response within 2 working hours during business hours.
              </div>
            </form>
          </div>
        </div>

        {/* Quick Contact Banner */}
        <div className="quick-contact-banner">
          <div className="banner-content">
            <h3>Need Immediate Assistance?</h3>
            <p>Call our 24/7 customer support or use WhatsApp for instant response</p>
            <div className="banner-buttons">
              <button className="btn-call-banner" onClick={() => makeCall("+91730460314")}>
                <FaPhone /> CALL NOW: +91-730460314
              </button>
              <button className="btn-whatsapp-banner" onClick={() => sendWhatsApp("+91730460314")}>
                <FaWhatsapp /> WHATSAPP CHAT
              </button>
              <button className="btn-email-banner" onClick={() => sendEmail("dreamprospaces@gmail.com", "Real Estate Inquiry")}>
                <FaEnvelope /> EMAIL US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAgentPage;