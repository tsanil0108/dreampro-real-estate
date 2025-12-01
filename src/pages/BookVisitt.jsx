import React, { useState } from "react";
import "./BookVisitt.css";

const BookVisit = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    propertyType: "",
    budget: "",
    message: "",
    visitType: "in-person"
  });

  const [selectedProperty, setSelectedProperty] = useState(null);

  const featuredProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: 350000,
      address: "123 Main St, New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      availableDates: ["2024-02-15", "2024-02-16", "2024-02-17"]
    },
    {
      id: 2,
      title: "Luxury Beach Villa",
      price: 1250000,
      address: "456 Ocean Drive, Miami, FL",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      type: "Villa",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400",
      availableDates: ["2024-02-14", "2024-02-18", "2024-02-20"]
    },
    {
      id: 3,
      title: "Contemporary City Loft",
      price: 750000,
      address: "789 Downtown Ave, Chicago, IL",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      type: "Loft",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400",
      availableDates: ["2024-02-16", "2024-02-19", "2024-02-21"]
    }
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", 
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setFormData(prev => ({
      ...prev,
      propertyType: property.type
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingData = {
      ...formData,
      selectedProperty: selectedProperty?.title || "Not specified"
    };
    
    console.log("Booking Data:", bookingData);
    
    alert(`Thank you ${formData.name}! Your visit has been booked successfully.\n\nWe've sent confirmation details to ${formData.email}.\nOur agent will contact you shortly to confirm the appointment.`);
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      propertyType: "",
      budget: "",
      message: "",
      visitType: "in-person"
    });
    setSelectedProperty(null);
  };

  const isFormValid = () => {
    return formData.name && formData.phone && formData.email && 
           formData.preferredDate && formData.preferredTime;
  };

  return (
    <div className="book-visit-page">
      <div className="container">
        <div className="page-header">
          <h1>BOOK A PROPERTY VISIT</h1>
          <p>Schedule your personalized tour with our expert agents</p>
        </div>

        <div className="book-visit-container">
          {/* Featured Properties */}
          <div className="properties-section">
            <h2>Featured Properties</h2>
            <p className="section-subtitle">Select a property to visit or choose your preferred type</p>
            
            <div className="properties-grid">
              {featuredProperties.map(property => (
                <div 
                  key={property.id} 
                  className={`property-card ${selectedProperty?.id === property.id ? 'selected' : ''}`}
                  onClick={() => handlePropertySelect(property)}
                >
                  <img src={property.image} alt={property.title} className="property-image" />
                  <div className="property-info">
                    <h3>{property.title}</h3>
                    <p className="property-price">${property.price.toLocaleString()}</p>
                    <p className="property-address">{property.address}</p>
                    <div className="property-details">
                      <span>🛏 {property.bedrooms} beds</span>
                      <span>🚿 {property.bathrooms} baths</span>
                      <span>📐 {property.sqft} sqft</span>
                    </div>
                    <div className="property-type">{property.type}</div>
                  </div>
                  {selectedProperty?.id === property.id && (
                    <div className="selected-badge">Selected</div>
                  )}
                </div>
              ))}
            </div>

            <div className="selection-info">
              {selectedProperty ? (
                <div className="selected-property-info">
                  <h4>Selected Property:</h4>
                  <p><strong>{selectedProperty.title}</strong> - ${selectedProperty.price.toLocaleString()}</p>
                </div>
              ) : (
                <p className="select-prompt">👆 Click on a property to select it for your visit</p>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form-section">
            <h2>Schedule Your Visit</h2>
            
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Your full name"
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
                    placeholder="Your phone number"
                    className="form-input"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Your email address"
                  className="form-input"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Visit Type</label>
                  <select
                    name="visitType"
                    value={formData.visitType}
                    className="form-input"
                    onChange={handleChange}
                  >
                    <option value="in-person">In-Person Visit</option>
                    <option value="virtual">Virtual Tour</option>
                    <option value="video-call">Video Call Consultation</option>
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
                    <option value="">Select budget</option>
                    <option value="under-500k">Under $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-2m">$1M - $2M</option>
                    <option value="over-2m">Over $2M</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    className="form-input"
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time *</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    className="form-input"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  className="form-input"
                  onChange={handleChange}
                >
                  <option value="">Select property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="condo">Condo</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="form-group">
                <label>Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  placeholder="Any specific requirements or questions..."
                  className="form-textarea"
                  rows="4"
                  onChange={handleChange}
                />
              </div>

              <div className="form-features">
                <h4>What's Included:</h4>
                <ul>
                  <li>✅ Professional guided tour</li>
                  <li>✅ Detailed property walkthrough</li>
                  <li>✅ Q&A session with expert agent</li>
                  <li>✅ Neighborhood overview</li>
                  <li>✅ Financing consultation available</li>
                </ul>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${!isFormValid() ? 'disabled' : ''}`}
                disabled={!isFormValid()}
              >
                CONFIRM BOOKING
              </button>

              <p className="form-note">
                * Our agent will contact you within 2 hours to confirm your appointment details.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookVisit;