import React, { useState } from "react";
import { 
  FaHome, 
  FaPaintRoller, 
  FaCalendarAlt, 
  FaClock, 
  FaPhone, 
  FaCheckCircle, 
  FaUser, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import "./BookVisitt.css";

const BookVisit = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    date: "",
    time: "",
    address: "",
    selectedCategory: "" // "real-estate" or "interior"
  });

  const [activeCategory, setActiveCategory] = useState("interior");

  const serviceCategories = [
    {
      id: "interior",
      name: "Interior Work",
      icon: <FaPaintRoller />,
      description: "Carpentry, furniture, and design services",
      services: [
        { id: "carpentry", name: "Carpentry Work", icon: "🛠️" },
        { id: "furniture", name: "Custom Furniture", icon: "🛋️" },
        { id: "wardrobe", name: "Wardrobe Making", icon: "👔" },
        { id: "kitchen", name: "Kitchen Design", icon: "🍳" },
        { id: "painting", name: "Painting Work", icon: "🎨" },
        { id: "consultation", name: "Design Consultation", icon: "💡" }
      ]
    },
    {
      id: "real-estate",
      name: "Real Estate",
      icon: <FaHome />,
      description: "Property visits and consultations",
      services: [
        { id: "property-visit", name: "Property Visit", icon: "🏠" },
        { id: "home-loan", name: "Home Loan Guidance", icon: "💰" },
        { id: "legal", name: "Legal Consultation", icon: "⚖️" },
        { id: "valuation", name: "Property Valuation", icon: "📊" },
        { id: "rental", name: "Rental Services", icon: "🏘️" },
        { id: "investment", name: "Investment Advice", icon: "📈" }
      ]
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setFormData({
      ...formData,
      selectedCategory: categoryId,
      serviceType: ""
    });
  };

  const handleServiceSelect = (serviceId) => {
    setFormData({
      ...formData,
      serviceType: serviceId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.selectedCategory || !formData.serviceType) {
      alert("Please fill in all required fields");
      return;
    }

    const selectedCategory = serviceCategories.find(cat => cat.id === formData.selectedCategory);
    const selectedService = selectedCategory.services.find(s => s.id === formData.serviceType);
    
    const bookingData = {
      ...formData,
      category: selectedCategory.name,
      service: selectedService.name
    };

    console.log("Booking Data:", bookingData);
    
    alert(`Thank you ${formData.name}!\n\nYour booking for ${selectedService.name} has been confirmed.\nOur expert will contact you shortly at ${formData.phone}.`);
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      serviceType: "",
      date: "",
      time: "",
      address: "",
      selectedCategory: ""
    });
    setActiveCategory("interior");
  };

  const currentServices = serviceCategories.find(cat => cat.id === activeCategory)?.services || [];

  return (
    <div className="book-visit-container">
      <h1>Book Service Visit</h1>
      <p>Schedule a visit with our experts for interior work or real estate services</p>

      {/* Category Selection */}
      <div className="category-selection">
        <h3>Select Service Category</h3>
        <div className="category-tabs">
          {serviceCategories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
              <span className="tab-description">{category.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Service Selection */}
      <div className="services-section">
        <h3>Select Service Type</h3>
        <div className="services-grid">
          {currentServices.map(service => (
            <div 
              key={service.id}
              className={`service-card ${formData.serviceType === service.id ? 'selected' : ''}`}
              onClick={() => handleServiceSelect(service.id)}
            >
              <span className="service-icon">{service.icon}</span>
              <span className="service-name">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label><FaUser /> Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your full name"
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
              placeholder="Enter phone number"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label><FaMapMarkerAlt /> Your Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Enter site/property address"
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label><FaCalendarAlt /> Preferred Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label><FaClock /> Preferred Time</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="">Select preferred time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={!formData.name || !formData.phone || !formData.selectedCategory || !formData.serviceType}
        >
          Book Free Consultation
        </button>

        <p className="note">
          Our expert will visit your site, provide consultation, and give you a detailed proposal.
        </p>
      </form>

      {/* Benefits Section */}
      <div className="benefits">
        <h3>Why Choose Our Services?</h3>
        
        {activeCategory === "interior" ? (
          <div className="benefits-grid">
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>Free Site Visit</h4>
              <p>Expert site inspection and measurement</p>
            </div>
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>Professional Craftsmen</h4>
              <p>Skilled carpenters and designers</p>
            </div>
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>3D Design Mockup</h4>
              <p>Visualize your space before work begins</p>
            </div>
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>Material Guidance</h4>
              <p>Expert advice on materials and finishes</p>
            </div>
          </div>
        ) : (
          <div className="benefits-grid">
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>Property Tours</h4>
              <p>Visit multiple properties with experts</p>
            </div>
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>Home Loan Assistance</h4>
              <p>Guidance on financing options</p>
            </div>
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>Legal Support</h4>
              <p>Documentation and legal assistance</p>
            </div>
            <div className="benefit">
              <FaCheckCircle className="benefit-icon" />
              <h4>Investment Advice</h4>
              <p>Expert property investment guidance</p>
            </div>
          </div>
        )}
      </div>

      {/* Current Selection Display */}
      {formData.selectedCategory && formData.serviceType && (
        <div className="selection-summary">
          <h4>You have selected:</h4>
          <div className="selected-items">
            <span className="selected-category">
              {serviceCategories.find(cat => cat.id === formData.selectedCategory)?.name}
            </span>
            <span className="arrow">→</span>
            <span className="selected-service">
              {currentServices.find(s => s.id === formData.serviceType)?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookVisit;