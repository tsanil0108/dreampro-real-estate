import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone,
  FaWhatsapp, FaEnvelope, FaHeart, FaStar, FaShareAlt,
  FaCamera, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaHome,
  FaCar, FaSwimmingPool, FaWifi, FaTree, FaShieldAlt,
  FaUser, FaCheck, FaClock, FaStarHalfAlt, FaArrowLeft,
  FaCalculator, FaFileDownload
} from "react-icons/fa";
import "./PropertyViewInfo.css";

const PropertyViewInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ===========================
  // 🔵 PROPERTY DATABASE
  // ===========================
  const propertiesData = [
    {
      id: 1,
      title: "Poton Tower",
      address: "Kandivali East, Lokhandwala, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      price: "₹2.5 Cr - ₹3.8 Cr",
      area: "1100 - 1650 sq.ft.",
      description: "Premium residential tower with world-class amenities. Features include modular kitchens, Italian marble flooring, and panoramic city views.",
      images: [
        "https://patonconstructions.in/patontowers/images/img2.jpg",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200"
      ],
      amenities: [
        "Swimming Pool", "Gym", "Clubhouse", "Children's Play Area",
        "Parking", "24/7 Security", "Landscaped Garden", "Power Backup"
      ],
      features: [
        "Modular Kitchen", "Italian Marble Flooring", "Smart Home Features",
        "Central AC", "Balcony with View", "Wooden Flooring in Bedrooms"
      ],
      specifications: {
        bedrooms: "2 & 3",
        bathrooms: "2 & 3",
        balconies: "2",
        parking: "2 Covered",
        floors: "25",
        units: "120",
        possession: "Dec 2024",
        rera: "P52100012345"
      },
      priceDetails: {
        "1 BHK": { price: "₹75 Lacs", area: "650 sq.ft." },
        "2 BHK": { price: "₹2.5 Cr", area: "1100 sq.ft." },
        "3 BHK": { price: "₹3.8 Cr", area: "1650 sq.ft." },
        "4 BHK": { price: "₹4.8 Cr", area: "1650 sq.ft." },
        "5 BHK": { price: "₹3.8 Cr", area: "1650 sq.ft." },
      },
      agents: [
        {
          id: "a1",
          name: "Anil thakur",
          phone: "+918356962978",
          whatsapp: "+918356962978",
          email: "rajesh@dreampro.com",
          rating: 4.8,
          reviews: 127,
          experience: "8 years",
          photo: "https://randomuser.me/api/portraits/men/32.jpg",
          languages: ["Hindi", "English", "Marathi"],
          specializations: ["Luxury Apartments", "Commercial", "Resale"],
          availability: "9 AM - 8 PM",
          verified: true
        }
      ],
      developer: "Paton Constructions",
      status: "Under Construction",
      launchDate: "Jan 2023",
      possessionDate: "Dec 2024"
    },
    {
      id: 2,
      title: "Godrej Nest Tower",
      address: "Kandivali East, Lokhandwala, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      price: "₹1.8 Cr - ₹4.2 Cr",
      area: "650 - 1800 sq.ft.",
      description: "Luxury residential project by Godrej Properties featuring modern architecture and premium amenities.",
      images: [
        "https://cdn.blox.xyz/projects-2x/godrej-properties-godrej-nest-1746534958.jpg",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200"
      ],
      amenities: [
        "Swimming Pool", "Gym", "Clubhouse", "Sports Court",
        "Jogging Track", "Amphitheater", "Day Care", "Library"
      ],
      features: [
        "Smart Home Automation", "Energy Efficient", "Rainwater Harvesting",
        "Solar Power", "Waste Management", "Dual Water Supply"
      ],
      specifications: {
        bedrooms: "1, 2 & 3",
        bathrooms: "1, 2 & 3",
        balconies: "1-3",
        parking: "1-2 Covered",
        floors: "30",
        units: "250",
        possession: "Mar 2025",
        rera: "G52100012346"
      },
      priceDetails: {
        "1 BHK": { price: "₹75 Lacs", area: "650 sq.ft." },
        "2 BHK": { price: "₹2.5 Cr", area: "1100 sq.ft." },
        "3 BHK": { price: "₹2.85 Cr", area: "1500 sq.ft." },
      },
      agents: [
        {
          id: "a2",
          name: "Vikram Singh",
          phone: "+919900112233",
          whatsapp: "+919900112233",
          email: "vikram@dreampro.com",
          rating: 4.6,
          reviews: 156,
          experience: "10 years",
          photo: "https://randomuser.me/api/portraits/men/75.jpg",
          languages: ["Hindi", "English"],
          specializations: ["Godrej Projects", "Premium Properties"],
          availability: "9:30 AM - 8:30 PM",
          verified: true
        }
      ],
      developer: "Godrej Properties",
      status: "Ready to Move",
      launchDate: "Aug 2022",
      possessionDate: "Mar 2025"
    },
  ];

  // ===========================
  // 🔵 STATE MANAGEMENT
  // ===========================
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [shareModal, setShareModal] = useState(false);
  const [selectedBHK, setSelectedBHK] = useState(null);

  // ===========================
  // 🔵 USE EFFECTS
  // ===========================
  useEffect(() => {
    const property = propertiesData.find(p => p.id === parseInt(id));
    if (property) {
      setSelectedProperty(property);
      const availableBHKS = Object.keys(property.priceDetails);
      if (availableBHKS.length > 0) {
        setSelectedBHK(availableBHKS[0]);
      }
    } else {
      navigate('/properties');
    }
  }, [id, navigate]);

  // ===========================
  // 🔵 FUNCTIONS
  // ===========================
  const toggleLike = () => {
    setLiked(!liked);
  };

  const callAgent = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const whatsappAgent = (agent) => {
    const num = agent.whatsapp ? agent.whatsapp.replace(/\D/g, "") : '919876500000';
    const currentPrice = selectedProperty.priceDetails[selectedBHK]?.price || selectedProperty.price;
    
    let message = `Hello, I am interested in ${selectedProperty.title}`;
    if (selectedBHK) {
      message += ` for the ${selectedBHK} configuration (${currentPrice}).`;
    } else {
      message += ` priced from ${selectedProperty.price}.`;
    }
    
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const mailAgent = (agent) => {
    const currentPrice = selectedProperty.priceDetails[selectedBHK]?.price || selectedProperty.price;
    const subject = `Inquiry: ${selectedProperty.title} - ${selectedBHK}`;
    const body = `Hello ${agent.name},\n\nI am interested in the property:\n\nProperty: ${selectedProperty.title}\nConfiguration: ${selectedBHK}\nPrice: ${currentPrice}\nArea: ${selectedProperty.priceDetails[selectedBHK]?.area || 'N/A'}\n\nPlease contact me with more details.\n\nBest regards,\n[Your Name]`;
    
    window.location.href = `mailto:${agent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const prevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? selectedProperty.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImageIndex(prev => 
      prev === selectedProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuickEnquirySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    alert(`Enquiry for ${selectedProperty.title} - ${selectedBHK} received!\nWe will contact you shortly on ${data.phone}.`);
    e.target.reset();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProperty.title + " - " + selectedBHK,
        text: `Check out this property: ${selectedProperty.title} - ${selectedBHK}: ${selectedProperty.priceDetails[selectedBHK]?.price}`,
        url: window.location.href,
      });
    } else {
      setShareModal(true);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShareModal(false);
  };

  const handleBHKSelect = (bhk) => {
    setSelectedBHK(bhk);
  };

  // Calculate BHK count from string (e.g., "2 BHK" -> 2)
  const getBHKCount = (bhk) => {
    const match = bhk?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // ===========================
  // 🔵 LOADING STATE
  // ===========================
  if (!selectedProperty) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  // Get primary agent
  const primaryAgent = selectedProperty.agents[0];
  const currentPriceDetails = selectedProperty.priceDetails[selectedBHK];

  // ===========================
  // 🔵 RENDER UI
  // ===========================
  return (
    <div className="property-view-container">
      {/* HEADER */}
      <div className="property-header">
        
        
        <div className="header-actions">
          <button className="share-btn" onClick={handleShare}>
            <FaShareAlt /> Share
          </button>
          <button 
            className={`like-btn ${liked ? 'liked' : ''}`} 
            onClick={toggleLike}
          >
            <FaHeart /> {liked ? 'Saved' : 'Save'}
          </button>

          <button className="back-button" onClick={() => navigate('/properties')}>
          <FaArrowLeft /> Back to Properties
        </button>

          
        </div>
      </div>

      {/* PROPERTY TITLE & LOCATION */}
      <div className="property-title-section">
        <h1>{selectedProperty.title}</h1>
        <div className="location-info">
          <FaMapMarkerAlt />
          <span>{selectedProperty.address}, {selectedProperty.city}</span>
        </div>
        <div className="property-tags">
          <span className="tag price-tag">
            {currentPriceDetails ? currentPriceDetails.price : selectedProperty.price}
          </span>
          <span className="tag bhk-tag">
            {Object.keys(selectedProperty.priceDetails).join(", ")} Available
          </span>
          <span className="tag area-tag">{selectedProperty.area}</span>
          <span className="tag status-tag">{selectedProperty.status}</span>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="main-content-grid">
        {/* LEFT COLUMN - IMAGES & DETAILS */}
        <div className="left-column">
          {/* IMAGE GALLERY */}
          <div className="image-gallery-card">
            <div className="gallery-header">
              <h3><FaCamera /> Property Gallery</h3>
              <span className="image-counter">{activeImageIndex + 1}/{selectedProperty.images.length}</span>
            </div>
            
            <div className="main-image-container">
              <img 
                src={selectedProperty.images[activeImageIndex]} 
                alt={selectedProperty.title} 
                className="main-image" 
              />
              
              <button className="nav-button prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className="nav-button next" onClick={nextImage}>
                <FaChevronRight />
              </button>
            </div>
            
            <div className="thumbnail-strip">
              {selectedProperty.images.map((src, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-container ${index === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={src} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`}
              onClick={() => setActiveTab('location')}
            >
              Location
            </button>
            <button 
              className={`tab-btn ${activeTab === 'developer' ? 'active' : ''}`}
              onClick={() => setActiveTab('developer')}
            >
              Developer
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <h3>Property Overview</h3>
                <p className="property-description">{selectedProperty.description}</p>
                
                {selectedBHK && (
                  <div className="selected-bhk-display">
                    <h4>Currently Selected: <span className="highlighted-bhk">{selectedBHK}</span></h4>
                    <div className="current-price-info">
                      <span className="current-price">Price: {currentPriceDetails.price}</span>
                      <span className="current-area">Area: {currentPriceDetails.area}</span>
                    </div>
                  </div>
                )}
                
                <div className="key-features">
                  <h4>Key Features</h4>
                  <div className="features-grid">
                    {selectedProperty.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <FaCheck /> {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="amenities-content">
                <h3>Amenities & Facilities</h3>
                <div className="amenities-grid">
                  {selectedProperty.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <div className="amenity-icon">
                        {amenity.includes('Pool') && <FaSwimmingPool />}
                        {amenity.includes('Gym') && <FaSwimmingPool />}
                        {amenity.includes('Parking') && <FaCar />}
                        {amenity.includes('Security') && <FaShieldAlt />}
                        {amenity.includes('Garden') && <FaTree />}
                        {amenity.includes('Wifi') && <FaWifi />}
                        {!amenity.includes('Pool') && !amenity.includes('Gym') && 
                         !amenity.includes('Parking') && !amenity.includes('Security') &&
                         !amenity.includes('Garden') && !amenity.includes('Wifi') && 
                         <FaCheck />}
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="specifications-content">
                <h3>Property Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <FaBed />
                    <div>
                      <span className="spec-label">Bedrooms</span>
                      <span className="spec-value">{selectedProperty.specifications.bedrooms}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <FaBath />
                    <div>
                      <span className="spec-label">Bathrooms</span>
                      <span className="spec-value">{selectedProperty.specifications.bathrooms}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <FaHome />
                    <div>
                      <span className="spec-label">Balconies</span>
                      <span className="spec-value">{selectedProperty.specifications.balconies}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <FaCar />
                    <div>
                      <span className="spec-label">Parking</span>
                      <span className="spec-value">{selectedProperty.specifications.parking}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <FaRulerCombined />
                    <div>
                      <span className="spec-label">Total Floors</span>
                      <span className="spec-value">{selectedProperty.specifications.floors}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <FaClock />
                    <div>
                      <span className="spec-label">Possession</span>
                      <span className="spec-value">{selectedProperty.specifications.possession}</span>
                    </div>
                  </div>
                </div>
                
                {selectedProperty.specifications.rera && (
                  <div className="rera-info">
                    <h4>RERA Registration</h4>
                    <p><FaShieldAlt /> RERA ID: {selectedProperty.specifications.rera}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="location-content">
                <h3>Location Advantages</h3>
                <div className="location-map">
                  <div className="map-placeholder">
                    <FaMapMarkerAlt />
                    <p>Map view of {selectedProperty.address}</p>
                    <button className="view-map-btn">View on Google Maps</button>
                  </div>
                </div>
                <div className="location-highlights">
                  <h4>Nearby Facilities</h4>
                  <ul>
                    <li>✅ 500m from Metro Station</li>
                    <li>✅ 1km from Shopping Mall</li>
                    <li>✅ 2km from Hospital</li>
                    <li>✅ 3km from International School</li>
                    <li>✅ 4km from Airport</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'developer' && (
              <div className="developer-content">
                <h3>Developer Information</h3>
                <div className="developer-card">
                  <div className="developer-header">
                    <h4>{selectedProperty.developer}</h4>
                    <span className="verified-badge">
                      <FaCheck /> Verified Developer
                    </span>
                  </div>
                  <p className="developer-description">
                    Leading real estate developer with {selectedProperty.status.toLowerCase()} projects across India.
                  </p>
                  <div className="developer-stats">
                    <div className="stat-item">
                      <span className="stat-label">Projects Completed</span>
                      <span className="stat-value">50+</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Years Experience</span>
                      <span className="stat-value">25+</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Cities</span>
                      <span className="stat-value">15+</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - PRICE SELECTOR & ACTIONS */}
        <div className="right-column">
          
          {/* BHK SELECTOR */}
          <div className="bhk-selector-card">
            <h3><FaBed /> Select Configuration</h3>
            <div className="bhk-options-grid">
              {Object.entries(selectedProperty.priceDetails).map(([bhk, data]) => (
                <div 
                  key={bhk}
                  className={`bhk-option ${bhk === selectedBHK ? 'active' : ''}`}
                  onClick={() => handleBHKSelect(bhk)}
                >
                  <div className="bhk-option-header">
                    <span className="bhk-icon">
                      {getBHKCount(bhk) === 1 ? "🏠" : getBHKCount(bhk) === 2 ? "🏡" : "🏘️"}
                    </span>
                    <span className="bhk-type">{bhk}</span>
                  </div>
                  <div className="bhk-option-price">{data.price}</div>
                  <div className="bhk-option-area">{data.area}</div>
                  {bhk === selectedBHK && (
                    <div className="selected-indicator">
                      <FaCheck /> Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SELECTED BHK DETAILS */}
          {selectedBHK && currentPriceDetails && (
            <div className="selected-bhk-details-card">
              <h3><FaHome /> {selectedBHK} Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Price</span>
                  <span className="detail-value price-highlight">{currentPriceDetails.price}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Area</span>
                  <span className="detail-value">{currentPriceDetails.area}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Configuration</span>
                  <span className="detail-value">{selectedBHK}</span>
                </div>
              </div>
              
           
            </div>
          )}

          {/* AGENT CONTACT */}
          <div className="agents-section">
            <div className="section-header">
              <h3><FaUser /> Contact Agent</h3>
              <span className="agents-count">{selectedProperty.agents.length} Agents Available</span>
            </div>
            
            {selectedProperty.agents.map((agent) => (
              <div key={agent.id} className="agent-card">
                <div className="agent-header">
                  <div className="agent-profile">
                    <img src={agent.photo} alt={agent.name} />
                    <div className="agent-info">
                      <h4>{agent.name}</h4>
                      <div className="agent-rating">
                        <FaStar />
                        <span>{agent.rating}</span>
                        <span className="reviews">({agent.reviews} reviews)</span>
                      </div>
                      <div className="agent-experience">
                        <FaClock /> {agent.experience} experience
                      </div>
                    </div>
                  </div>
                  {agent.verified && (
                    <span className="verified-tag">
                      <FaCheck /> Verified
                    </span>
                  )}
                </div>
                
                <div className="agent-details">
                  <div className="languages">
                    <strong>Languages:</strong> {agent.languages.join(', ')}
                  </div>
                  <div className="specializations">
                    <strong>Specializations:</strong> {agent.specializations.join(', ')}
                  </div>
                  <div className="availability">
                    <strong>Availability:</strong> {agent.availability}
                  </div>
                </div>
                
                <div className="agent-contact-buttons">
                  <button className="btn-call" onClick={() => callAgent(agent.phone)}>
                    <FaPhone /> Call
                  </button>
                  <button className="btn-whatsapp" onClick={() => whatsappAgent(agent)}>
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <button className="btn-email" onClick={() => mailAgent(agent)}>
                    <FaEnvelope /> Email
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ENQUIRY */}
          <div className="quick-enquiry">
            <h3>Quick Enquiry</h3>
            {selectedBHK && (
              <div className="selected-bhk-info">
                <span className="selected-bhk-label">Selected: </span>
                <span className="selected-bhk-value">{selectedBHK} - {currentPriceDetails?.price}</span>
              </div>
            )}
            <form className="enquiry-form" onSubmit={handleQuickEnquirySubmit}>
              <input type="text" name="name" placeholder="Your Name" required/>
              <input type="tel" name="phone" placeholder="Phone Number" required/>
              <input type="email" name="email" placeholder="Email Address" />
              <textarea name="message" placeholder="Your Message (Optional)"></textarea>
              <button type="submit" className="btn-submit-enquiry">Submit Enquiry</button>
              <p className="privacy-note">
                By submitting, you agree to our Terms & Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {shareModal && (
        <div className="modal-overlay">
          <div className="share-modal">
            <div className="modal-header">
              <h3>Share Property</h3>
              <button className="close-modal" onClick={() => setShareModal(false)}>×</button>
            </div>
            <div className="share-options">
              <button className="share-option" onClick={copyShareLink}>
                <FaShareAlt /> Copy Link
              </button>
              <button className="share-option" onClick={() => whatsappAgent(primaryAgent)}>
                <FaWhatsapp /> WhatsApp
              </button>
              <button className="share-option" onClick={() => mailAgent(primaryAgent)}>
                <FaEnvelope /> Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CTA */}
      <div className="footer-cta">
        <div className="cta-content">
          <h3>Need Assistance?</h3>
          <p>Get expert advice from our real estate consultants</p>
          <div className="cta-buttons">
            <button className="btn-cta-primary" onClick={() => callAgent(primaryAgent.phone)}>
              <FaPhone /> Request Call Back
            </button>
            <button className="btn-cta-secondary" onClick={() => whatsappAgent(primaryAgent)}>
              <FaWhatsapp /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyViewInfo;