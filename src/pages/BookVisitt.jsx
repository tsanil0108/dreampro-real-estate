import React, { useState } from "react";
import { 
  FaHome, 
  FaPaintRoller, 
  FaCalendarAlt, 
  FaClock, 
  FaPhone, 
  FaCheckCircle, 
  FaUser, 
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCopy,
  FaExternalLinkAlt
} from "react-icons/fa";
import "./BookVisitt.css";

const BookVisit = () => {
  // WhatsApp numbers for different services
  const WHATSAPP_NUMBERS = {
    "interior": "917304603314", // Interior work number
    "real-estate": "918356962978" // Real estate number
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    date: "",
    time: "",
    address: "",
    selectedCategory: "" // "real-estate" or "interior"
  });

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [targetNumber, setTargetNumber] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const [activeCategory, setActiveCategory] = useState("interior");

  const serviceCategories = [
    {
      id: "interior",
      name: "Interior Work",
      icon: <FaPaintRoller />,
      description: "Carpentry, furniture, and design services",
      whatsappNumber: WHATSAPP_NUMBERS.interior,
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
      whatsappNumber: WHATSAPP_NUMBERS["real-estate"],
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

  const generateMessage = () => {
    const selectedCategory = serviceCategories.find(cat => cat.id === formData.selectedCategory);
    const selectedService = selectedCategory.services.find(s => s.id === formData.serviceType);
    
    let message = `*NEW SERVICE BOOKING REQUEST*\n\n`;
    message += `👤 *Name:* ${formData.name}\n`;
    message += `📱 *Phone:* ${formData.phone}\n`;
    message += `📋 *Service Category:* ${selectedCategory.name}\n`;
    message += `🛠️ *Service Type:* ${selectedService.name}\n`;
    
    if (formData.date) {
      const dateObj = new Date(formData.date);
      const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      message += `📅 *Preferred Date:* ${formattedDate}\n`;
    }
    if (formData.time) message += `⏰ *Preferred Time:* ${formData.time}\n`;
    if (formData.address) message += `📍 *Address:* ${formData.address}\n\n`;
    
    message += `✅ I'm interested in proceeding with this service. Please contact me.\n\n`;
    message += `_Booking made through website_`;
    
    return message;
  };

  const createWhatsAppUrl = (number, message) => {
    // Multiple URL formats to try
    const formats = [
      `whatsapp://send?phone=${number}&text=${encodeURIComponent(message)}`,
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`
    ];
    return formats;
  };

  const openWhatsApp = (url) => {
    // Try to open WhatsApp
    window.location.href = url;
    
    // Fallback: Open in new tab after a delay
    setTimeout(() => {
      window.open(url, '_blank');
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.selectedCategory || !formData.serviceType) {
      alert("⚠️ Please fill in all required fields marked with *");
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      alert("❌ Please enter a valid 10-digit phone number");
      return;
    }

    const selectedCategory = serviceCategories.find(cat => cat.id === formData.selectedCategory);
    const message = generateMessage();
    const number = selectedCategory.whatsappNumber;
    
    // Generate and show message
    setGeneratedMessage(message);
    setTargetNumber(number);
    setShowMessageBox(true);
    setCopySuccess("");
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage)
      .then(() => {
        setCopySuccess("✓ Message copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setCopySuccess("Failed to copy");
      });
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(`+${targetNumber}`)
      .then(() => {
        setCopySuccess("✓ Number copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setCopySuccess("Failed to copy");
      });
  };

  const handleSendWhatsApp = () => {
    const urls = createWhatsAppUrl(targetNumber, generatedMessage);
    
    // Try first format
    openWhatsApp(urls[0]);
    
    // If first doesn't work, user can try others
    console.log("WhatsApp URLs:", urls);
  };

  const handleManualSend = () => {
    const selectedCategory = serviceCategories.find(cat => cat.id === formData.selectedCategory);
    
    alert(
      `📱 *Manual WhatsApp Instructions:*\n\n` +
      `1. Open WhatsApp on your phone\n` +
      `2. Save this number: +${selectedCategory.whatsappNumber}\n` +
      `3. Send this message:\n\n` +
      `${generatedMessage}\n\n` +
      `OR\n` +
      `4. Click "Open WhatsApp" below to try automatic sending`
    );
  };

  const currentServices = serviceCategories.find(cat => cat.id === activeCategory)?.services || [];

  return (
    <div className="book-visit-container">
      <div className="whatsapp-header">
        <FaWhatsapp className="whatsapp-icon-large" />
        <h1>📱 Book Service Visit via WhatsApp</h1>
        <p className="whatsapp-subtitle">
          Fill the form below and we'll help you send a WhatsApp message
        </p>
      </div>

      {/* Category Selection */}
      <div className="category-selection">
        <h3>📋 Select Service Category</h3>
        <div className="category-tabs">
          {serviceCategories.map(category => (
            <button
              key={category.id}
              type="button"
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
              <span className="tab-description">{category.description}</span>
              <span className="tab-whatsapp">
                <FaWhatsapp /> WhatsApp: +{category.whatsappNumber}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Service Selection */}
      <div className="services-section">
        <h3>🛠️ Select Service Type</h3>
        <div className="services-grid">
          {currentServices.map(service => (
            <div 
              key={service.id}
              className={`service-card ${formData.serviceType === service.id ? 'selected' : ''}`}
              onClick={() => handleServiceSelect(service.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleServiceSelect(service.id)}
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
              minLength="2"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label><FaPhone /> WhatsApp Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Enter 10-digit WhatsApp number"
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="form-group">
          <label><FaMapMarkerAlt /> Site/Property Address</label>
          <textarea
            name="address"
            value={formData.address}
            placeholder="Enter site/property address (optional)"
            onChange={handleChange}
            autoComplete="street-address"
            rows="3"
            className="address-textarea"
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
              <option value="">Select preferred time (optional)</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="whatsapp-submit-btn"
          disabled={!formData.name || !formData.phone || !formData.selectedCategory || !formData.serviceType}
        >
          <FaWhatsapp className="whatsapp-btn-icon" />
          Generate WhatsApp Message
          <span className="btn-subtext">We'll create and help you send it</span>
        </button>

        <div className="whatsapp-info">
          <FaWhatsapp className="info-icon" />
          <p>
            <strong>How it works:</strong> Fill the form, click generate, and we'll show you the message to send via WhatsApp.
          </p>
        </div>
      </form>

      {/* WhatsApp Message Box */}
      {showMessageBox && (
        <div className="message-box-overlay">
          <div className="message-box">
            <div className="message-box-header">
              <h3><FaWhatsapp /> Your WhatsApp Message is Ready!</h3>
              <button 
                className="close-btn"
                onClick={() => setShowMessageBox(false)}
              >
                ×
              </button>
            </div>
            
            <div className="message-box-content">
              <div className="target-info">
                <h4>Send to:</h4>
                <div className="number-display">
                  <FaWhatsapp className="whatsapp-icon" />
                  <span className="phone-number">+{targetNumber}</span>
                  <button 
                    className="copy-btn small"
                    onClick={handleCopyNumber}
                    title="Copy phone number"
                  >
                    <FaCopy /> Copy Number
                  </button>
                </div>
              </div>

              <div className="message-preview">
                <h4>Your Message:</h4>
                <div className="message-text">
                  {generatedMessage.split('\n').map((line, index) => (
                    <div key={index} className="message-line">
                      {line}
                    </div>
                  ))}
                </div>
                <div className="message-actions">
                  <button 
                    className="copy-btn"
                    onClick={handleCopyMessage}
                  >
                    <FaCopy /> Copy Message
                  </button>
                  <button 
                    className="whatsapp-btn"
                    onClick={handleSendWhatsApp}
                  >
                    <FaWhatsapp /> Open WhatsApp
                  </button>
                </div>
              </div>

              <div className="instructions">
                <h4>📱 How to Send:</h4>
                <ol>
                  <li>Click "Open WhatsApp" to try automatic sending</li>
                  <li>OR Copy the message and number above</li>
                  <li>Open WhatsApp on your phone</li>
                  <li>Save the number +{targetNumber} to contacts</li>
                  <li>Paste and send the message</li>
                </ol>
              </div>

              {copySuccess && (
                <div className="copy-success">
                  {copySuccess}
                </div>
              )}

              <div className="manual-fallback">
                <button 
                  className="manual-btn"
                  onClick={handleManualSend}
                >
                  <FaExternalLinkAlt /> Need Help? Click for step-by-step instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Numbers Section */}
      <div className="contact-numbers">
        <h3>📞 Direct WhatsApp Numbers</h3>
        <div className="numbers-grid">
          {serviceCategories.map(category => {
            const message = `Hello! I'm interested in ${category.name} services. Can you please provide more information?`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${category.whatsappNumber}&text=${encodeURIComponent(message)}`;
            
            return (
              <div key={category.id} className="number-card">
                <div className="number-card-header">
                  {category.icon}
                  <h4>{category.name}</h4>
                </div>
                <div className="number-card-body">
                  <div className="whatsapp-number">
                    <FaWhatsapp />
                    <span>+{category.whatsappNumber}</span>
                  </div>
                  <p className="number-description">{category.description}</p>
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-whatsapp-link"
                    onClick={(e) => {
                      // Try to open in app first
                      e.preventDefault();
                      window.location.href = whatsappUrl;
                      setTimeout(() => {
                        window.open(whatsappUrl, '_blank');
                      }, 500);
                    }}
                  >
                    <FaWhatsapp /> Chat Directly
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits">
        <h3>✨ Why Book via WhatsApp?</h3>
        <div className="benefits-grid">
          <div className="benefit">
            <FaWhatsapp className="benefit-icon" />
            <h4>Instant Response</h4>
            <p>Get immediate confirmation and quick replies</p>
          </div>
          <div className="benefit">
            <FaCheckCircle className="benefit-icon" />
            <h4>Free Consultation</h4>
            <p>No charges for site visits and expert advice</p>
          </div>
          <div className="benefit">
            <FaCheckCircle className="benefit-icon" />
            <h4>Easy Communication</h4>
            <p>Share photos, videos, and documents easily</p>
          </div>
          <div className="benefit">
            <FaCheckCircle className="benefit-icon" />
            <h4>Track Conversations</h4>
            <p>Keep all communication in one place</p>
          </div>
        </div>
      </div>

      {/* Current Selection Display */}
      {formData.selectedCategory && formData.serviceType && !showMessageBox && (
        <div className="selection-summary">
          <h4>📝 Ready to generate message:</h4>
          <div className="selected-items">
            <span className="selected-category">
              {serviceCategories.find(cat => cat.id === formData.selectedCategory)?.name}
            </span>
            <span className="arrow">→</span>
            <span className="selected-service">
              {currentServices.find(s => s.id === formData.serviceType)?.name}
            </span>
          </div>
          <div className="whatsapp-target">
            <FaWhatsapp />
            Will be sent to: +{serviceCategories.find(cat => cat.id === formData.selectedCategory)?.whatsappNumber}
          </div>
        </div>
      )}

      {/* Troubleshooting Tips */}
      <div className="troubleshooting-tips">
        <h4>⚠️ WhatsApp Issues?</h4>
        <p>If WhatsApp links don't work:</p>
        <ul>
          <li>1. Make sure WhatsApp is installed on your device</li>
          <li>2. Use "Copy Message" and send manually</li>
          <li>3. Save our numbers: +91 73046 03314 (Interior) or +91 83569 62978 (Real Estate)</li>
          <li>4. Try from your mobile device instead of desktop</li>
        </ul>
      </div>
    </div>
  );
};

export default BookVisit;