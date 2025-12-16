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
<<<<<<< Updated upstream
      title: "Poton Tower",
=======
      title: "Paton Tower",
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        "2 BHK": { price: "₹2.5 Cr", area: "1100 sq.ft." },
        "3 BHK": { price: "₹3.8 Cr", area: "1650 sq.ft." },
        "4 BHK": { price: "₹4.8 Cr", area: "1650 sq.ft." },
        "5 BHK": { price: "₹3.8 Cr", area: "1650 sq.ft." },
=======
        "2 BHK": { price: "₹1.25 Cr", area: "950 sq.ft." },
        "3 BHK": { price: "₹2.5 Cr", area: "1350 sq.ft." },
        "4 BHK": { price: "₹3.5 Cr", area: "1800 sq.ft." },
        "5 BHK": { price: "₹4.2 Cr", area: "2200 sq.ft." },
        "6 BHK": { price: "₹5.0 Cr", area: "2600 sq.ft." },
        "Studio": { price: "₹55 Lacs", area: "500 sq.ft." },
        "Penthouse": { price: "₹6.8 Cr", area: "3000 sq.ft." }
>>>>>>> Stashed changes
      },
      agents: [
        {
          id: "a1",
<<<<<<< Updated upstream
          name: "Anil thakur",
          phone: "+918356962978",
          whatsapp: "+918356962978",
          email: "rajesh@dreampro.com",
=======
          name: "Anil Thakur",
          phone: "+917304603314",
          whatsapp: "+91730460314",
          email: "anil@patonconstructions.com",
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        "1 BHK": { price: "₹75 Lacs", area: "650 sq.ft." },
        "2 BHK": { price: "₹2.5 Cr", area: "1100 sq.ft." },
        "3 BHK": { price: "₹2.85 Cr", area: "1500 sq.ft." },
=======
        "1 BHK": { price: "₹1.2 Cr", area: "650 sq.ft." },
        "2 BHK": { price: "₹2.1 Cr", area: "950 sq.ft." },
        "3 BHK": { price: "₹3.0 Cr", area: "1350 sq.ft." },
        "4 BHK": { price: "₹4.2 Cr", area: "1800 sq.ft." },
        "Penthouse": { price: "₹6.5 Cr", area: "2800 sq.ft." },
        "Duplex": { price: "₹5.5 Cr", area: "2200 sq.ft." }
>>>>>>> Stashed changes
      },
      agents: [
        {
          id: "a2",
          name: "Vikram Singh",
          phone: "+919900112233",
<<<<<<< Updated upstream
          whatsapp: "+919900112233",
          email: "vikram@dreampro.com",
=======
          whatsapp: "7304603314",
          email: "vikram@godrejproperties.com",
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======


        {
      id: 3,
      title: "UK Tower",
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
        "1 BHK": { price: "₹1.2 Cr", area: "650 sq.ft." },
        "2 BHK": { price: "₹2.1 Cr", area: "950 sq.ft." },
        "3 BHK": { price: "₹3.0 Cr", area: "1350 sq.ft." },
        "4 BHK": { price: "₹4.2 Cr", area: "1800 sq.ft." },
        "Penthouse": { price: "₹6.5 Cr", area: "2800 sq.ft." },
        "Duplex": { price: "₹5.5 Cr", area: "2200 sq.ft." }
      },
      agents: [
        {
          id: "a2",
          name: "Vikram Singh",
          phone: "+919900112233",
          whatsapp: "+919900112233",
          email: "vikram@godrejproperties.com",
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


>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <div className="loading-container">
        <div className="loading-spinner"></div>
=======
      <div className="property-view-loading-container">
        <div className="property-view-loading-spinner"></div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className="property-view-container">
      {/* HEADER */}
      <div className="property-header">
        
        
        <div className="header-actions">
          <button className="share-btn" onClick={handleShare}>
            <FaShareAlt /> Share
          </button>
          <button 
            className={`like-btn ${liked ? 'liked' : ''}`} 
=======
    <div className="property-view-page-main">
      {/* HEADER */}
      <div className="property-view-header">
        <div className="property-view-header-actions">
          <button className="property-view-share-btn" onClick={handleShare}>
            <FaShareAlt /> Share
          </button>
          <button 
            className={`property-view-like-btn ${liked ? 'property-view-liked' : ''}`} 
>>>>>>> Stashed changes
            onClick={toggleLike}
          >
            <FaHeart /> {liked ? 'Saved' : 'Save'}
          </button>
<<<<<<< Updated upstream

          <button className="back-button" onClick={() => navigate('/properties')}>
          <FaArrowLeft /> Back to Properties
        </button>

          
=======
          <button className="property-view-back-button" onClick={() => navigate('/properties')}>
            <FaArrowLeft /> Back to Properties
          </button>
>>>>>>> Stashed changes
        </div>
      </div>

      {/* PROPERTY TITLE & LOCATION */}
<<<<<<< Updated upstream
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
=======
      <div className="property-view-title-section">
        <h1 className="property-view-main-title">{selectedProperty.title}</h1>
        <div className="property-view-location-info">
          <FaMapMarkerAlt />
          <span>{selectedProperty.address}, {selectedProperty.city}</span>
        </div>
        <div className="property-view-tags">
          <span className="property-view-tag property-view-price-tag">
            {currentPriceDetails ? currentPriceDetails.price : selectedProperty.price}
          </span>
          <span className="property-view-tag property-view-bhk-tag">
            {Object.keys(selectedProperty.priceDetails).join(", ")} Available
          </span>
          <span className="property-view-tag property-view-area-tag">{selectedProperty.area}</span>
          <span className="property-view-tag property-view-status-tag">{selectedProperty.status}</span>
>>>>>>> Stashed changes
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
<<<<<<< Updated upstream
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
=======
      <div className="property-view-main-content-grid">
        {/* LEFT COLUMN - IMAGES & DETAILS */}
        <div className="property-view-left-column">
          {/* IMAGE GALLERY */}
          <div className="property-view-image-gallery-card">
            <div className="property-view-gallery-header">
              <h3><FaCamera /> Property Gallery</h3>
              <span className="property-view-image-counter">{activeImageIndex + 1}/{selectedProperty.images.length}</span>
            </div>
            
            <div className="property-view-main-image-container">
              <img 
                src={selectedProperty.images[activeImageIndex]} 
                alt={selectedProperty.title} 
                className="property-view-main-image" 
              />
              
              <button className="property-view-nav-button property-view-prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className="property-view-nav-button property-view-next" onClick={nextImage}>
>>>>>>> Stashed changes
                <FaChevronRight />
              </button>
            </div>
            
<<<<<<< Updated upstream
            <div className="thumbnail-strip">
              {selectedProperty.images.map((src, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-container ${index === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={src} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
=======
            <div className="property-view-thumbnail-strip">
              {selectedProperty.images.map((src, index) => (
                <div 
                  key={index} 
                  className={`property-view-thumbnail-container ${index === activeImageIndex ? 'property-view-thumbnail-active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={src} alt={`Thumbnail ${index + 1}`} className="property-view-thumbnail" />
>>>>>>> Stashed changes
                </div>
              ))}
            </div>
          </div>

          {/* TABS NAVIGATION */}
<<<<<<< Updated upstream
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
=======
          <div className="property-view-tabs-navigation">
            <button 
              className={`property-view-tab-btn ${activeTab === 'overview' ? 'property-view-tab-active' : ''}`}
>>>>>>> Stashed changes
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
<<<<<<< Updated upstream
              className={`tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
=======
              className={`property-view-tab-btn ${activeTab === 'amenities' ? 'property-view-tab-active' : ''}`}
>>>>>>> Stashed changes
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
            <button 
<<<<<<< Updated upstream
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
=======
              className={`property-view-tab-btn ${activeTab === 'specifications' ? 'property-view-tab-active' : ''}`}
>>>>>>> Stashed changes
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
<<<<<<< Updated upstream
              className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`}
=======
              className={`property-view-tab-btn ${activeTab === 'location' ? 'property-view-tab-active' : ''}`}
>>>>>>> Stashed changes
              onClick={() => setActiveTab('location')}
            >
              Location
            </button>
            <button 
<<<<<<< Updated upstream
              className={`tab-btn ${activeTab === 'developer' ? 'active' : ''}`}
=======
              className={`property-view-tab-btn ${activeTab === 'developer' ? 'property-view-tab-active' : ''}`}
>>>>>>> Stashed changes
              onClick={() => setActiveTab('developer')}
            >
              Developer
            </button>
          </div>

          {/* TAB CONTENT */}
<<<<<<< Updated upstream
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
=======
          <div className="property-view-tab-content">
            {activeTab === 'overview' && (
              <div className="property-view-overview-content">
                <h3 className="property-view-content-title">Property Overview</h3>
                <p className="property-view-description">{selectedProperty.description}</p>
                
                {selectedBHK && (
                  <div className="property-view-selected-bhk-display">
                    <h4>Currently Selected: <span className="property-view-highlighted-bhk">{selectedBHK}</span></h4>
                    <div className="property-view-current-price-info">
                      <span className="property-view-current-price">Price: {currentPriceDetails.price}</span>
                      <span className="property-view-current-area">Area: {currentPriceDetails.area}</span>
>>>>>>> Stashed changes
                    </div>
                  </div>
                )}
                
<<<<<<< Updated upstream
                <div className="key-features">
                  <h4>Key Features</h4>
                  <div className="features-grid">
                    {selectedProperty.features.map((feature, index) => (
                      <div key={index} className="feature-item">
=======
                <div className="property-view-key-features">
                  <h4 className="property-view-features-title">Key Features</h4>
                  <div className="property-view-features-grid">
                    {selectedProperty.features.map((feature, index) => (
                      <div key={index} className="property-view-feature-item">
>>>>>>> Stashed changes
                        <FaCheck /> {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
<<<<<<< Updated upstream
              <div className="amenities-content">
                <h3>Amenities & Facilities</h3>
                <div className="amenities-grid">
                  {selectedProperty.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <div className="amenity-icon">
=======
              <div className="property-view-amenities-content">
                <h3 className="property-view-content-title">Amenities & Facilities</h3>
                <div className="property-view-amenities-grid">
                  {selectedProperty.amenities.map((amenity, index) => (
                    <div key={index} className="property-view-amenity-item">
                      <div className="property-view-amenity-icon">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                      <span>{amenity}</span>
=======
                      <span className="property-view-amenity-name">{amenity}</span>
>>>>>>> Stashed changes
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
<<<<<<< Updated upstream
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
=======
              <div className="property-view-specifications-content">
                <h3 className="property-view-content-title">Property Specifications</h3>
                <div className="property-view-specs-grid">
                  <div className="property-view-spec-item">
                    <FaBed />
                    <div className="property-view-spec-details">
                      <span className="property-view-spec-label">Bedrooms</span>
                      <span className="property-view-spec-value">{selectedProperty.specifications.bedrooms}</span>
                    </div>
                  </div>
                  <div className="property-view-spec-item">
                    <FaBath />
                    <div className="property-view-spec-details">
                      <span className="property-view-spec-label">Bathrooms</span>
                      <span className="property-view-spec-value">{selectedProperty.specifications.bathrooms}</span>
                    </div>
                  </div>
                  <div className="property-view-spec-item">
                    <FaHome />
                    <div className="property-view-spec-details">
                      <span className="property-view-spec-label">Balconies</span>
                      <span className="property-view-spec-value">{selectedProperty.specifications.balconies}</span>
                    </div>
                  </div>
                  <div className="property-view-spec-item">
                    <FaCar />
                    <div className="property-view-spec-details">
                      <span className="property-view-spec-label">Parking</span>
                      <span className="property-view-spec-value">{selectedProperty.specifications.parking}</span>
                    </div>
                  </div>
                  <div className="property-view-spec-item">
                    <FaRulerCombined />
                    <div className="property-view-spec-details">
                      <span className="property-view-spec-label">Total Floors</span>
                      <span className="property-view-spec-value">{selectedProperty.specifications.floors}</span>
                    </div>
                  </div>
                  <div className="property-view-spec-item">
                    <FaClock />
                    <div className="property-view-spec-details">
                      <span className="property-view-spec-label">Possession</span>
                      <span className="property-view-spec-value">{selectedProperty.specifications.possession}</span>
>>>>>>> Stashed changes
                    </div>
                  </div>
                </div>
                
                {selectedProperty.specifications.rera && (
<<<<<<< Updated upstream
                  <div className="rera-info">
                    <h4>RERA Registration</h4>
                    <p><FaShieldAlt /> RERA ID: {selectedProperty.specifications.rera}</p>
=======
                  <div className="property-view-rera-info">
                    <h4 className="property-view-rera-title">RERA Registration</h4>
                    <p className="property-view-rera-id"><FaShieldAlt /> RERA ID: {selectedProperty.specifications.rera}</p>
>>>>>>> Stashed changes
                  </div>
                )}
              </div>
            )}

            {activeTab === 'location' && (
<<<<<<< Updated upstream
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
=======
              <div className="property-view-location-content">
                <h3 className="property-view-content-title">Location Advantages</h3>
                <div className="property-view-location-map">
                  <div className="property-view-map-placeholder">
                    <FaMapMarkerAlt />
                    <p className="property-view-map-text">Map view of {selectedProperty.address}</p>
                    <button className="property-view-view-map-btn">View on Google Maps</button>
                  </div>
                </div>
                <div className="property-view-location-highlights">
                  <h4 className="property-view-location-title">Nearby Facilities</h4>
                  <ul className="property-view-location-list">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
              <div className="property-view-developer-content">
                <h3 className="property-view-content-title">Developer Information</h3>
                <div className="property-view-developer-card">
                  <div className="property-view-developer-header">
                    <h4 className="property-view-developer-name">{selectedProperty.developer}</h4>
                    <span className="property-view-verified-badge">
                      <FaCheck /> Verified Developer
                    </span>
                  </div>
                  <p className="property-view-developer-description">
                    Leading real estate developer with {selectedProperty.status.toLowerCase()} projects across India.
                  </p>
                  <div className="property-view-developer-stats">
                    <div className="property-view-stat-item">
                      <span className="property-view-stat-label">Projects Completed</span>
                      <span className="property-view-stat-value">50+</span>
                    </div>
                    <div className="property-view-stat-item">
                      <span className="property-view-stat-label">Years Experience</span>
                      <span className="property-view-stat-value">25+</span>
                    </div>
                    <div className="property-view-stat-item">
                      <span className="property-view-stat-label">Cities</span>
                      <span className="property-view-stat-value">15+</span>
>>>>>>> Stashed changes
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - PRICE SELECTOR & ACTIONS */}
<<<<<<< Updated upstream
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
=======
        <div className="property-view-right-column">
          
          {/* BHK SELECTOR */}
          <div className="property-view-bhk-selector-card">
            <h3 className="property-view-bhk-title"><FaBed /> Select Configuration</h3>
            <div className="property-view-bhk-options-grid">
              {Object.entries(selectedProperty.priceDetails).map(([bhk, data]) => (
                <div 
                  key={bhk}
                  className={`property-view-bhk-option ${bhk === selectedBHK ? 'property-view-bhk-active' : ''}`}
                  onClick={() => handleBHKSelect(bhk)}
                >
                  <div className="property-view-bhk-option-header">
                    <span className="property-view-bhk-icon">
                      {getBHKCount(bhk) === 1 ? "🏠" : getBHKCount(bhk) === 2 ? "🏡" : getBHKCount(bhk) >= 3 ? "🏘️" : "🏢"}
                    </span>
                    <span className="property-view-bhk-type">{bhk}</span>
                  </div>
                  <div className="property-view-bhk-option-price">{data.price}</div>
                  <div className="property-view-bhk-option-area">{data.area}</div>
                  {bhk === selectedBHK && (
                    <div className="property-view-selected-indicator">
>>>>>>> Stashed changes
                      <FaCheck /> Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SELECTED BHK DETAILS */}
          {selectedBHK && currentPriceDetails && (
<<<<<<< Updated upstream
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
              
           
=======
            <div className="property-view-selected-bhk-details-card">
              <h3 className="property-view-bhk-details-title"><FaHome /> {selectedBHK} Details</h3>
              <div className="property-view-details-grid">
                <div className="property-view-detail-item">
                  <span className="property-view-detail-label">Price</span>
                  <span className="property-view-detail-value property-view-price-highlight">{currentPriceDetails.price}</span>
                </div>
                <div className="property-view-detail-item">
                  <span className="property-view-detail-label">Area</span>
                  <span className="property-view-detail-value">{currentPriceDetails.area}</span>
                </div>
                <div className="property-view-detail-item">
                  <span className="property-view-detail-label">Configuration</span>
                  <span className="property-view-detail-value">{selectedBHK}</span>
                </div>
              </div>
>>>>>>> Stashed changes
            </div>
          )}

          {/* AGENT CONTACT */}
<<<<<<< Updated upstream
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
=======
          <div className="property-view-agents-section">
            <div className="property-view-agents-header">
              <h3 className="property-view-agents-title"><FaUser /> Contact Agent</h3>
              <span className="property-view-agents-count">{selectedProperty.agents.length} Agents Available</span>
            </div>
            
            {selectedProperty.agents.map((agent) => (
              <div key={agent.id} className="property-view-agent-card">
                <div className="property-view-agent-header">
                  <div className="property-view-agent-profile">
                    <img src={agent.photo} alt={agent.name} className="property-view-agent-photo" />
                    <div className="property-view-agent-info">
                      <h4 className="property-view-agent-name">{agent.name}</h4>
                      <div className="property-view-agent-rating">
                        <FaStar />
                        <span className="property-view-agent-rating-value">{agent.rating}</span>
                        <span className="property-view-agent-reviews">({agent.reviews} reviews)</span>
                      </div>
                      <div className="property-view-agent-experience">
>>>>>>> Stashed changes
                        <FaClock /> {agent.experience} experience
                      </div>
                    </div>
                  </div>
                  {agent.verified && (
<<<<<<< Updated upstream
                    <span className="verified-tag">
=======
                    <span className="property-view-verified-tag">
>>>>>>> Stashed changes
                      <FaCheck /> Verified
                    </span>
                  )}
                </div>
                
<<<<<<< Updated upstream
                <div className="agent-details">
                  <div className="languages">
                    <strong>Languages:</strong> {agent.languages.join(', ')}
                  </div>
                  <div className="specializations">
                    <strong>Specializations:</strong> {agent.specializations.join(', ')}
                  </div>
                  <div className="availability">
=======
                <div className="property-view-agent-details">
                  <div className="property-view-agent-languages">
                    <strong>Languages:</strong> {agent.languages.join(', ')}
                  </div>
                  <div className="property-view-agent-specializations">
                    <strong>Specializations:</strong> {agent.specializations.join(', ')}
                  </div>
                  <div className="property-view-agent-availability">
>>>>>>> Stashed changes
                    <strong>Availability:</strong> {agent.availability}
                  </div>
                </div>
                
<<<<<<< Updated upstream
                <div className="agent-contact-buttons">
                  <button className="btn-call" onClick={() => callAgent(agent.phone)}>
                    <FaPhone /> Call
                  </button>
                  <button className="btn-whatsapp" onClick={() => whatsappAgent(agent)}>
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <button className="btn-email" onClick={() => mailAgent(agent)}>
=======
                <div className="property-view-agent-contact-buttons">
                  <button className="property-view-btn-call" onClick={() => callAgent(agent.phone)}>
                    <FaPhone /> Call
                  </button>
                  <button className="property-view-btn-whatsapp" onClick={() => whatsappAgent(agent)}>
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <button className="property-view-btn-email" onClick={() => mailAgent(agent)}>
>>>>>>> Stashed changes
                    <FaEnvelope /> Email
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ENQUIRY */}
<<<<<<< Updated upstream
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
=======
          <div className="property-view-quick-enquiry">
            <h3 className="property-view-enquiry-title">Quick Enquiry</h3>
            {selectedBHK && (
              <div className="property-view-selected-bhk-enquiry-info">
                <span className="property-view-selected-bhk-enquiry-label">Selected: </span>
                <span className="property-view-selected-bhk-enquiry-value">{selectedBHK} - {currentPriceDetails?.price}</span>
              </div>
            )}
            <form className="property-view-enquiry-form" onSubmit={handleQuickEnquirySubmit}>
              <input type="text" name="name" placeholder="Your Name" required className="property-view-enquiry-input"/>
              <input type="tel" name="phone" placeholder="Phone Number" required className="property-view-enquiry-input"/>
              <input type="email" name="email" placeholder="Email Address" className="property-view-enquiry-input"/>
              <textarea name="message" placeholder="Your Message (Optional)" className="property-view-enquiry-textarea"></textarea>
              <button type="submit" className="property-view-btn-submit-enquiry">Submit Enquiry</button>
              <p className="property-view-privacy-note">
>>>>>>> Stashed changes
                By submitting, you agree to our Terms & Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {shareModal && (
<<<<<<< Updated upstream
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
=======
        <div className="property-view-modal-overlay">
          <div className="property-view-share-modal">
            <div className="property-view-modal-header">
              <h3 className="property-view-modal-title">Share Property</h3>
              <button className="property-view-close-modal" onClick={() => setShareModal(false)}>×</button>
            </div>
            <div className="property-view-share-options">
              <button className="property-view-share-option" onClick={copyShareLink}>
                <FaShareAlt /> Copy Link
              </button>
              <button className="property-view-share-option" onClick={() => whatsappAgent(primaryAgent)}>
                <FaWhatsapp /> WhatsApp
              </button>
              <button className="property-view-share-option" onClick={() => mailAgent(primaryAgent)}>
>>>>>>> Stashed changes
                <FaEnvelope /> Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CTA */}
<<<<<<< Updated upstream
      <div className="footer-cta">
        <div className="cta-content">
          <h3>Need Assistance?</h3>
          <p>Get expert advice from our real estate consultants</p>
          <div className="cta-buttons">
            <button className="btn-cta-primary" onClick={() => callAgent(primaryAgent.phone)}>
              <FaPhone /> Request Call Back
            </button>
            <button className="btn-cta-secondary" onClick={() => whatsappAgent(primaryAgent)}>
=======
      <div className="property-view-footer-cta">
        <div className="property-view-cta-content">
          <h3 className="property-view-cta-title">Need Assistance?</h3>
          <p className="property-view-cta-text">Get expert advice from our real estate consultants</p>
          <div className="property-view-cta-buttons">
            <button className="property-view-btn-cta-primary" onClick={() => callAgent(primaryAgent.phone)}>
              <FaPhone /> Request Call Back
            </button>
            <button className="property-view-btn-cta-secondary" onClick={() => whatsappAgent(primaryAgent)}>
>>>>>>> Stashed changes
              <FaWhatsapp /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyViewInfo;