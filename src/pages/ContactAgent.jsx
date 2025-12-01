import React, { useState } from "react";
import "./ContactAgent.css";

const ContactAgentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    propertyInterest: ""
  });

  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Real Estate Agent",
      phone: "+1 (555) 123-4567",
      email: "sarah@dreampro.com",
      location: "New York, NY",
      experience: "8+ years",
      specialties: ["Luxury Apartments", "Commercial Properties"],
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Investment Specialist",
      phone: "+1 (555) 987-6543",
      email: "michael@dreampro.com",
      location: "Los Angeles, CA",
      experience: "12+ years",
      specialties: ["Investment Properties", "Villas"],
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent to our agent. We'll contact you within 24 hours.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
      propertyInterest: ""
    });
  };

  return (
    <div className="contact-agent-page">
      <div className="container">
        <div className="page-header">
          <h1>CONTACT OUR AGENTS</h1>
          <p>Get in touch with our expert real estate agents</p>
        </div>

        <div className="contact-agent-container">
          {/* Agents List */}
          <div className="agents-section">
            <h2>Our Expert Agents</h2>
            <div className="agents-grid">
              {agents.map(agent => (
                <div key={agent.id} className="agent-card">
                  <img src={agent.photo} alt={agent.name} className="agent-photo" />
                  <div className="agent-info">
                    <h3>{agent.name}</h3>
                    <p className="agent-role">{agent.role}</p>
                    <p className="agent-experience">Experience: {agent.experience}</p>
                    <div className="agent-specialties">
                      <strong>Specialties:</strong>
                      <ul>
                        {agent.specialties.map((specialty, index) => (
                          <li key={index}>{specialty}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="agent-contact">
                      <p>📞 {agent.phone}</p>
                      <p>📧 {agent.email}</p>
                      <p>📍 {agent.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-section">
            <h2>Send Message</h2>
            <form className="contact-agent-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
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
                <label>Phone Number *</label>
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

              <div className="form-group">
                <label>Email Address *</label>
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

              <div className="form-group">
                <label>Property Interest</label>
                <select
                  name="propertyInterest"
                  value={formData.propertyInterest}
                  className="form-input"
                  onChange={handleChange}
                >
                  <option value="">Select property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                  <option value="commercial">Commercial</option>
                  <option value="investment">Investment Property</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  placeholder="Tell us about your requirements..."
                  className="form-textarea"
                  rows="5"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                SEND MESSAGE TO AGENT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAgentPage;