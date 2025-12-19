import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone,
  FaWhatsapp, FaEnvelope, FaHeart, FaStar, FaShareAlt,
  FaCamera, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaHome,
  FaCar, FaSwimmingPool, FaWifi, FaTree, FaShieldAlt,
  FaUser, FaCheck, FaClock, FaStarHalfAlt, FaArrowLeft,
  FaCalculator, FaFileDownload, FaBuilding, FaParking,
  FaTint, FaThermometerHalf, FaWind, FaLock, FaTv,
  FaUtensils, FaDumbbell, FaChild, FaSchool, FaHospital,
  FaShoppingCart, FaTrain, FaPlane, FaBus, FaSubway,
  FaStar as FaStarSolid, FaRegStar, FaChartLine, FaAward,
  FaCertificate, FaHistory, FaUsers, FaGlobeAsia, FaMap,
  FaDirections, FaExpand, FaImages, FaPlay, FaMapPin,
  FaCompass, FaRoute, FaCarAlt, FaWalking, FaMotorcycle
} from "react-icons/fa";
import "./PropertyViewInfo.css";

const PropertyViewInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ===========================
  // 🔵 COMPREHENSIVE PROPERTY DATABASE WITH DETAILS
  // ===========================
  const propertiesData = [
    {
      id: 1,
      title: "Paton Tower",
      address: "Kandivali East, Lokhandwala, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      price: "₹2.5 Cr - ₹3.8 Cr",
      area: "1100 - 1650 sq.ft.",
      
      // IMAGES FOR PATON TOWER (10 images)
      images: [
        "https://patonconstructions.in/patontowers/images/img2.jpg",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200", // Exterior 2
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200", // Living Room
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200", // Bedroom
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200", // Kitchen
        "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1200", // Bathroom
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200", // Balcony
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200", // Amenities
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200", // View
      ],
      
      // OVERVIEW CONTENT
      overview: {
        description: "Premium residential tower with world-class amenities. Features include modular kitchens, Italian marble flooring, and panoramic city views. Located in the prime area of Kandivali East, this property offers luxury living with modern conveniences.",
        highlights: [
          "✅ Prime location in Kandivali East",
          "✅ Premium finishes and fixtures",
          "✅ Energy-efficient design",
          "✅ 24/7 power backup",
          "✅ Earthquake-resistant structure",
          "✅ Rainwater harvesting system"
        ],
        projectStatus: "Under Construction (80% Complete)",
        launchDate: "January 2023",
        possessionDate: "December 2024",
        totalUnits: "120",
        unitTypes: ["2 BHK", "3 BHK", "4 BHK"],
        facing: "East/West",
        ageOfProperty: "New Launch"
      },
      
      // AMENITIES CONTENT
      amenities: {
        residential: [
          { name: "Swimming Pool", icon: "🏊", category: "Recreational" },
          { name: "Fully Equipped Gym", icon: "💪", category: "Fitness" },
          { name: "Clubhouse", icon: "🏛️", category: "Social" },
          { name: "Children's Play Area", icon: "🎠", category: "Children" },
          { name: "Landscaped Garden", icon: "🌳", category: "Green" },
          { name: "Jogging Track", icon: "🏃", category: "Fitness" },
          { name: "Yoga/Meditation Area", icon: "🧘", category: "Wellness" },
          { name: "Amphitheater", icon: "🎭", category: "Entertainment" }
        ],
        security: [
          { name: "24/7 Security", icon: "👮", category: "Safety" },
          { name: "CCTV Surveillance", icon: "📹", category: "Monitoring" },
          { name: "Intercom Facility", icon: "📞", category: "Communication" },
          { name: "Fire Safety Systems", icon: "🔥", category: "Safety" },
          { name: "Earthquake Resistant", icon: "🏗️", category: "Structural" }
        ],
        convenience: [
          { name: "Power Backup", icon: "⚡", category: "Essential" },
          { name: "Rainwater Harvesting", icon: "💧", category: "Sustainable" },
          { name: "Waste Management", icon: "🗑️", category: "Maintenance" },
          { name: "Visitor Parking", icon: "🅿️", category: "Parking" },
          { name: "Lift Services", icon: "⬆️", category: "Access" }
        ]
      },
      
      // SPECIFICATIONS CONTENT
      specifications: {
        structural: {
          structureType: "RCC Framed Structure",
          flooring: "Italian Marble/Vitrified Tiles",
          wallFinish: "Premium Emulsion Paint",
          doors: "Premium Branded Doors",
          windows: "UPVC Windows with Glass"
        },
        fittings: {
          kitchen: "Modular Kitchen with Hob & Chimney",
          bathrooms: "Premium Sanitaryware & CP Fittings",
          electrical: "Modular Switches with Wiring",
          plumbing: "Concealed Plumbing with CPVC Pipes"
        },
        measurements: {
          bedrooms: "2 & 3 BHK configurations",
          bathrooms: "2 & 3",
          balconies: "2",
          parking: "2 Covered",
          floors: "25",
          units: "120"
        },
        additional: {
          possession: "Dec 2024",
          rera: "P52100012345",
          floorHeight: "10 feet",
          carpetArea: "75-80% of super area"
        }
      },
      
      // LOCATION CONTENT
      location: {
        coordinates: {
          lat: 19.2072,
          lng: 72.8735
        },
        mapZoom: 15,
        advantages: [
          "📍 500m from Lokhandwala Market",
          "📍 1km from Kandivali Railway Station",
          "📍 2km from Western Express Highway",
          "📍 3km from D-Mart & Shopping Malls",
          "📍 4km from Schools & Colleges"
        ],
        nearby: {
          hospitals: ["Kandivali Hospital (2km)", "Seven Hills (5km)", "Kokilaben (8km)"],
          schools: ["Ryan International (3km)", "DAV Public School (4km)", "St. Lawrence (5km)"],
          shopping: ["Infiniti Mall (4km)", "D-Mart (3km)", "Hypercity (5km)"],
          transport: ["Kandivali Station (1km)", "Metro Station (500m)", "Bus Depot (800m)"],
          entertainment: ["PVR Cinema (5km)", "Food Courts (3km)", "Parks (1km)"]
        },
        connectivity: {
          airport: "Chhatrapati Shivaji Airport - 15km",
          railway: "Kandivali Station - 1km",
          metro: "Metro Station - 500m",
          highway: "Western Express Highway - 2km"
        },
        travelTimes: {
          toAirport: "45 mins",
          toRailway: "10 mins",
          toMetro: "5 mins",
          toHighway: "8 mins"
        }
      },
      
      // DEVELOPER CONTENT
      developer: {
        name: "Paton Constructions",
        about: "Leading real estate developer with over 25 years of experience in constructing premium residential and commercial properties across India.",
        achievements: [
          "🏆 'Best Developer Award' 2023",
          "🏆 'Quality Excellence Award' 2022",
          "🏆 'Customer Satisfaction Award' 2021"
        ],
        portfolio: [
          { name: "Paton Grande", location: "Borivali", status: "Completed" },
          { name: "Paton Heights", location: "Andheri", status: "Ongoing" },
          { name: "Paton Business Park", location: "Malad", status: "Completed" }
        ],
        stats: {
          projectsCompleted: "50+",
          yearsExperience: "25+",
          cities: "15+",
          happyCustomers: "5000+",
          ongoingProjects: "12"
        },
        certifications: [
          "✅ RERA Registered",
          "✅ ISO 9001 Certified",
          "✅ Green Building Certified",
          "✅ CREDAI Member"
        ]
      },

      priceDetails: {
        "2 BHK": { price: "₹2.5 Cr", area: "1100 sq.ft." },
        "3 BHK": { price: "₹3.8 Cr", area: "1650 sq.ft." },
        "4 BHK": { price: "₹4.8 Cr", area: "2000 sq.ft." }
      },
      agents: [
        {
          id: "a1",
          name: "Anil Thakur",
          phone: "+917304603314",
          whatsapp: "+917304603314",
          email: "anil@patonconstructions.com",
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
      status: "Under Construction",
      launchDate: "Jan 2023",
      possessionDate: "Dec 2024"
    },
    
    // Additional property with different details structure
    {
      id: 2,
      title: "Godrej Nest Tower",
      address: "Kandivali East, Lokhandwala, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      price: "₹1.8 Cr - ₹4.2 Cr",
      area: "650 - 1800 sq.ft.",
      
      // IMAGES FOR GODREJ NEST TOWER (10 images)
      images: [
        "https://cdn.blox.xyz/projects-2x/godrej-properties-godrej-nest-1746534958.jpg",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200", // Interior 1
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200", // Interior 2
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200", // Interior 3
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200", // Bathroom
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200", // Kitchen
        "https://images.unsplash.com/photo-1600607687645-6de9a4a65270?w=1200", // Living Area
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200", // View
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200", // Amenities 1
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200", // Amenities 2
      ],
      
      // DIFFERENT OVERVIEW CONTENT
      overview: {
        description: "Luxury residential project by Godrej Properties featuring modern architecture and premium amenities. Smart home automation with energy-efficient design.",
        highlights: [
          "✅ Smart Home Automation",
          "✅ Energy Efficient Design",
          "✅ Rainwater Harvesting",
          "✅ Solar Power Integration",
          "✅ Waste Management System",
          "✅ Dual Water Supply"
        ],
        projectStatus: "Ready to Move",
        launchDate: "August 2022",
        possessionDate: "March 2025",
        totalUnits: "250",
        unitTypes: ["1 BHK", "2 BHK", "3 BHK"],
        facing: "North/South",
        ageOfProperty: "New Construction"
      },
      
      // DIFFERENT AMENITIES CONTENT
      amenities: {
        residential: [
          { name: "Infinity Pool", icon: "🌊", category: "Luxury" },
          { name: "Spa & Sauna", icon: "🧖", category: "Wellness" },
          { name: "Business Center", icon: "💼", category: "Business" },
          { name: "Library", icon: "📚", category: "Education" },
          { name: "Party Hall", icon: "🎉", category: "Social" },
          { name: "Tennis Court", icon: "🎾", category: "Sports" }
        ],
        security: [
          { name: "Biometric Access", icon: "🔑", category: "Advanced" },
          { name: "Smart Home Security", icon: "🏠", category: "Tech" },
          { name: "24/7 Patrol", icon: "🚔", category: "Safety" }
        ],
        convenience: [
          { name: "EV Charging", icon: "🔋", category: "Modern" },
          { name: "Pet Park", icon: "🐕", category: "Pet-Friendly" },
          { name: "Day Care", icon: "👶", category: "Family" }
        ]
      },
      
      // DIFFERENT SPECIFICATIONS CONTENT
      specifications: {
        structural: {
          structureType: "Mivan Technology",
          flooring: "Wooden Flooring",
          wallFinish: "Textured Paint",
          doors: "Automatic Doors",
          windows: "Double Glazed Windows"
        },
        fittings: {
          kitchen: "Smart Kitchen Appliances",
          bathrooms: "Jacuzzi & Steam",
          electrical: "Home Automation",
          plumbing: "Sensor-based Fixtures"
        }
      },
      
      // DIFFERENT LOCATION CONTENT
      location: {
        coordinates: {
          lat: 19.2096,
          lng: 72.8740
        },
        mapZoom: 14,
        advantages: [
          "📍 Near International School",
          "📍 Close to IT Park",
          "📍 Adjacent to Golf Course"
        ],
        nearby: {
          hospitals: ["Fortis Hospital", "Apollo Clinic"],
          schools: ["International School", "IB Curriculum School"],
          shopping: ["Premium Mall", "Luxury Boutiques"]
        }
      },
      
      // DIFFERENT DEVELOPER CONTENT
      developer: {
        name: "Godrej Properties",
        about: "One of India's most trusted real estate brands with legacy of over 125 years.",
        achievements: ["🏆 'Most Trusted Brand' Award"],
        stats: {
          projectsCompleted: "200+",
          yearsExperience: "125+"
        }
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

    // Additional Property 3
    {
      id: 3,
      title: "Lodha Wood",
      address: "Akurli Road, Kandivali East, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      price: "₹1.5 Cr - ₹3.2 Cr",
      area: "700 - 1500 sq.ft.",
      
      // IMAGES FOR LODHA WOOD (10 images)
      images: [
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
        "https://images.unsplash.com/photo-1613977257599-0270e67d2c3d?w=1200",
        "https://images.unsplash.com/photo-1613977257368-5a8e8c6d3b3f?w=1200",
        "https://images.unsplash.com/photo-1613977257595-0270e67d2c3e?w=1200",
        "https://images.unsplash.com/photo-1613977257596-0270e67d2c3f?w=1200",
        "https://images.unsplash.com/photo-1613977257597-0270e67d2c40?w=1200",
        "https://images.unsplash.com/photo-1613977257598-0270e67d2c41?w=1200",
        "https://images.unsplash.com/photo-1613977257599-0270e67d2c42?w=1200",
        "https://images.unsplash.com/photo-1613977257600-0270e67d2c43?w=1200",
        "https://images.unsplash.com/photo-1613977257601-0270e67d2c44?w=1200",
        "https://images.unsplash.com/photo-1613977257602-0270e67d2c45?w=1200"
      ],
      
      overview: {
        description: "Premium residential development by Lodha Group featuring contemporary design and sustainable living spaces.",
        highlights: [
          "✅ Sustainable Architecture",
          "✅ Smart Home Features",
          "✅ Energy Efficient Lighting",
          "✅ Water Conservation Systems",
          "✅ Green Building Certified",
          "✅ Centralized AC"
        ],
        projectStatus: "Under Construction",
        launchDate: "March 2023",
        possessionDate: "December 2025",
        totalUnits: "180",
        unitTypes: ["1 BHK", "2 BHK", "3 BHK"],
        facing: "North-East/South-West",
        ageOfProperty: "New Launch"
      },
      // ... rest of property data similar to above
    }
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
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState(0);
  const [mapView, setMapView] = useState("standard"); // standard, satellite, terrain

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

  const nextImage = () => {
    setActiveImageIndex(prev => 
      prev === selectedProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? selectedProperty.images.length - 1 : prev - 1
    );
  };

  const openImageModal = (index) => {
    setActiveModalImage(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const nextModalImage = () => {
    setActiveModalImage(prev => 
      prev === selectedProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = () => {
    setActiveModalImage(prev => 
      prev === 0 ? selectedProperty.images.length - 1 : prev - 1
    );
  };

  const handleKeyDown = (e) => {
    if (showImageModal) {
      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowRight') nextModalImage();
      if (e.key === 'ArrowLeft') prevModalImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showImageModal]);

  // Generate Google Maps URL
  const getGoogleMapsUrl = () => {
    if (!selectedProperty?.location?.coordinates) return "";
    const { lat, lng } = selectedProperty.location.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}&z=${selectedProperty.location.mapZoom || 15}`;
  };

  // Generate directions URL
  const getDirectionsUrl = (destination) => {
    const { lat, lng } = selectedProperty.location.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${destination}`;
  };

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

  return (
    <div className="property-view-container">
      {/* HEADER */}
      <div className="property-header">
        <button className="back-button" onClick={() => navigate('/properties')}>
          <FaArrowLeft /> Back to Properties
        </button>
        <div className="header-actions">
          <button className="share-btn" onClick={() => setShareModal(true)}>
            <FaShareAlt /> Share
          </button>
          <button 
            className={`like-btn ${liked ? 'liked' : ''}`} 
            onClick={() => setLiked(!liked)}
          >
            <FaHeart /> {liked ? 'Saved' : 'Save'}
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
          <span className={`tag status-tag ${selectedProperty.status === 'Ready to Move' ? 'ready' : 'construction'}`}>
            {selectedProperty.status}
          </span>
        </div>
      </div>

      {/* IMAGE GALLERY SECTION */}
      <div className="image-gallery-section">
        <div className="gallery-header">
          <h3><FaImages /> Property Gallery</h3>
          <span className="gallery-count">{selectedProperty.images.length} Images</span>
        </div>
        
        <div className="main-gallery-container">
          {/* Main Large Image */}
          <div className="main-image-display" onClick={() => openImageModal(activeImageIndex)}>
            <img 
              src={selectedProperty.images[activeImageIndex]} 
              alt={`${selectedProperty.title} - Image ${activeImageIndex + 1}`}
              className="main-image"
            />
            <div className="image-overlay">
              <FaExpand /> Click to expand
            </div>
            
            <button className="nav-button prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <FaChevronLeft />
            </button>
            <button className="nav-button next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <FaChevronRight />
            </button>
            
            <div className="image-info">
              <span className="image-counter">
                {activeImageIndex + 1} / {selectedProperty.images.length}
              </span>
            </div>
          </div>
          
          {/* Thumbnail Grid */}
          <div className="thumbnail-grid">
            {selectedProperty.images.slice(0, 6).map((image, index) => (
              <div 
                key={index}
                className={`thumbnail-item ${index === activeImageIndex ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
                {index === 5 && selectedProperty.images.length > 6 && (
                  <div className="more-images-overlay">
                    +{selectedProperty.images.length - 6} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="image-categories">
          <button className="category-btn active">All Photos</button>
          <button className="category-btn">Exterior</button>
          <button className="category-btn">Interior</button>
          <button className="category-btn">Amenities</button>
          <button className="category-btn">Views</button>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="main-content-grid">
        {/* LEFT COLUMN - TABS & DETAILS */}
        <div className="left-column">
          {/* TABS NAVIGATION */}
          <div className="tabs-navigation">
            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <FaHome /> Overview
            </button>
            <button className={`tab-btn ${activeTab === 'amenities' ? 'active' : ''}`} onClick={() => setActiveTab('amenities')}>
              <FaSwimmingPool /> Amenities
            </button>
            <button className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`} onClick={() => setActiveTab('specifications')}>
              <FaRulerCombined /> Specifications
            </button>
            <button className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`} onClick={() => setActiveTab('location')}>
              <FaMapMarkerAlt /> Location
            </button>
            <button className={`tab-btn ${activeTab === 'developer' ? 'active' : ''}`} onClick={() => setActiveTab('developer')}>
              <FaBuilding /> Developer
            </button>
          </div>

          {/* TAB CONTENT - DIFFERENT CONTENT FOR EACH TAB */}
          <div className="tab-content-container">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <div className="tab-header">
                  <h2><FaHome /> Property Overview</h2>
                  <div className="tab-actions">
                    <button className="tab-action-btn">
                      <FaFileDownload /> Download Brochure
                    </button>
                  </div>
                </div>
                <div className="overview-section">
                  <h3>Description</h3>
                  <p className="property-description">{selectedProperty.overview.description}</p>
                  
                  <h3>Project Highlights</h3>
                  <div className="highlights-grid">
                    {selectedProperty.overview.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <FaCheck /> {highlight}
                      </div>
                    ))}
                  </div>
                  
                  <h3>Project Details</h3>
                  <div className="project-details-grid">
                    <div className="detail-card">
                      <FaCalendarAlt />
                      <div>
                        <span className="detail-label">Launch Date</span>
                        <span className="detail-value">{selectedProperty.overview.launchDate}</span>
                      </div>
                    </div>
                    <div className="detail-card">
                      <FaClock />
                      <div>
                        <span className="detail-label">Possession Date</span>
                        <span className="detail-value">{selectedProperty.overview.possessionDate}</span>
                      </div>
                    </div>
                    <div className="detail-card">
                      <FaBuilding />
                      <div>
                        <span className="detail-label">Total Units</span>
                        <span className="detail-value">{selectedProperty.overview.totalUnits}</span>
                      </div>
                    </div>
                    <div className="detail-card">
                      <FaBed />
                      <div>
                        <span className="detail-label">Unit Types</span>
                        <span className="detail-value">{selectedProperty.overview.unitTypes.join(", ")}</span>
                      </div>
                    </div>
                    <div className="detail-card">
                      <FaDirections />
                      <div>
                        <span className="detail-label">Facing</span>
                        <span className="detail-value">{selectedProperty.overview.facing}</span>
                      </div>
                    </div>
                    <div className="detail-card">
                      <FaChartLine />
                      <div>
                        <span className="detail-label">Project Status</span>
                        <span className="detail-value">{selectedProperty.overview.projectStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="amenities-content">
                <div className="tab-header">
                  <h2><FaSwimmingPool /> Amenities & Facilities</h2>
                  <div className="tab-actions">
                    <button className="tab-action-btn">
                      <FaCheck /> Compare
                    </button>
                  </div>
                </div>
                
                <div className="amenities-filter">
                  <button className="filter-btn active">All</button>
                  <button className="filter-btn">Recreational</button>
                  <button className="filter-btn">Fitness</button>
                  <button className="filter-btn">Security</button>
                  <button className="filter-btn">Convenience</button>
                </div>
                
                <div className="amenities-section">
                  <div className="category-header">
                    <h3><FaSwimmingPool /> Residential Amenities</h3>
                    <span className="category-count">{selectedProperty.amenities.residential.length} amenities</span>
                  </div>
                  <div className="amenities-grid">
                    {selectedProperty.amenities.residential.map((amenity, index) => (
                      <div key={index} className="amenity-feature-card">
                        <div className="amenity-icon-large">{amenity.icon}</div>
                        <div className="amenity-info">
                          <h4>{amenity.name}</h4>
                          <span className="amenity-category">{amenity.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="amenities-section">
                  <div className="category-header">
                    <h3><FaShieldAlt /> Security Features</h3>
                    <span className="category-count">{selectedProperty.amenities.security.length} features</span>
                  </div>
                  <div className="security-grid">
                    {selectedProperty.amenities.security.map((feature, index) => (
                      <div key={index} className="security-item">
                        <div className="security-icon">{feature.icon}</div>
                        <span>{feature.name}</span>
                        <span className="security-category">{feature.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="amenities-section">
                  <div className="category-header">
                    <h3><FaCar /> Convenience Features</h3>
                    <span className="category-count">{selectedProperty.amenities.convenience.length} features</span>
                  </div>
                  <div className="convenience-grid">
                    {selectedProperty.amenities.convenience.map((feature, index) => (
                      <div key={index} className="convenience-item">
                        <div className="convenience-icon">{feature.icon}</div>
                        <div>
                          <h4>{feature.name}</h4>
                          <p>{feature.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="specifications-content">
                <div className="tab-header">
                  <h2><FaRulerCombined /> Detailed Specifications</h2>
                  <div className="tab-actions">
                    <button className="tab-action-btn">
                      <FaFileDownload /> Download Specs
                    </button>
                  </div>
                </div>
                
                <div className="specs-section">
                  <h3>Structural Specifications</h3>
                  <div className="specs-table">
                    {Object.entries(selectedProperty.specifications.structural).map(([key, value]) => (
                      <div key={key} className="spec-row">
                        <span className="spec-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="specs-section">
                  <h3>Fittings & Fixtures</h3>
                  <div className="fixtures-grid">
                    {Object.entries(selectedProperty.specifications.fittings).map(([key, value]) => (
                      <div key={key} className="fixture-card">
                        <div className="fixture-icon">
                          {key === 'kitchen' && <FaUtensils />}
                          {key === 'bathrooms' && <FaBath />}
                          {key === 'electrical' && <FaTv />}
                          {key === 'plumbing' && <FaTint />}
                        </div>
                        <div className="fixture-info">
                          <h4>{key.toUpperCase()}</h4>
                          <p>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="specs-section">
                  <h3>Measurements</h3>
                  <div className="measurements-grid">
                    {Object.entries(selectedProperty.specifications.measurements).map(([key, value]) => (
                      <div key={key} className="measurement-item">
                        <div className="measurement-icon">
                          {key === 'bedrooms' && <FaBed />}
                          {key === 'bathrooms' && <FaBath />}
                          {key === 'parking' && <FaParking />}
                          {key === 'floors' && <FaBuilding />}
                          {key === 'units' && <FaHome />}
                          {key === 'balconies' && <FaTree />}
                        </div>
                        <div>
                          <span className="measurement-label">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="measurement-value">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedProperty.specifications.additional && (
                  <div className="specs-section">
                    <h3>Additional Information</h3>
                    <div className="additional-info">
                      {Object.entries(selectedProperty.specifications.additional).map(([key, value]) => (
                        <div key={key} className="info-item">
                          <FaCheck />
                          <div>
                            <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="location-content">
                <div className="tab-header">
                  <h2><FaMapMarkerAlt /> Location Advantages</h2>
                  <div className="tab-actions">
                    <button 
                      className="tab-action-btn"
                      onClick={() => window.open(getGoogleMapsUrl(), '_blank')}
                    >
                      <FaCompass /> Open in Maps
                    </button>
                  </div>
                </div>
                
                {/* DIRECT MAP DISPLAY */}
                <div className="location-map-container">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15075.722256058447!2d${selectedProperty.location.coordinates.lng}!3d${selectedProperty.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${selectedProperty.title} Location Map`}
                  ></iframe>
                  
                  <div className="map-overlay">
                    <button 
                      className={`map-control ${mapView === 'standard' ? 'active' : ''}`}
                      onClick={() => setMapView('standard')}
                    >
                      <FaMap /> Standard
                    </button>
                    <button 
                      className={`map-control ${mapView === 'satellite' ? 'active' : ''}`}
                      onClick={() => setMapView('satellite')}
                    >
                      <FaCompass /> Satellite
                    </button>
                    <button 
                      className="map-control"
                      onClick={() => window.open(getGoogleMapsUrl(), '_blank')}
                    >
                      <FaRoute /> Get Directions
                    </button>
                  </div>
                </div>
                
                {/* Travel Times Section */}
                <div className="location-section">
                  <h3><FaClock /> Travel Times</h3>
                  <div className="location-stats">
                    <div className="location-stat-card">
                      <div className="stat-icon"><FaPlane /></div>
                      <span className="stat-value">{selectedProperty.location.travelTimes?.toAirport || "45 mins"}</span>
                      <span className="stat-label">To Airport</span>
                      <span className="stat-trend trend-up">
                        <FaCarAlt /> By Car
                      </span>
                    </div>
                    <div className="location-stat-card">
                      <div className="stat-icon"><FaTrain /></div>
                      <span className="stat-value">{selectedProperty.location.travelTimes?.toRailway || "10 mins"}</span>
                      <span className="stat-label">To Railway</span>
                      <span className="stat-trend trend-up">
                        <FaWalking /> By Walk
                      </span>
                    </div>
                    <div className="location-stat-card">
                      <div className="stat-icon"><FaSubway /></div>
                      <span className="stat-value">{selectedProperty.location.travelTimes?.toMetro || "5 mins"}</span>
                      <span className="stat-label">To Metro</span>
                      <span className="stat-trend trend-up">
                        <FaWalking /> By Walk
                      </span>
                    </div>
                    <div className="location-stat-card">
                      <div className="stat-icon"><FaRoute /></div>
                      <span className="stat-value">{selectedProperty.location.travelTimes?.toHighway || "8 mins"}</span>
                      <span className="stat-label">To Highway</span>
                      <span className="stat-trend trend-up">
                        <FaMotorcycle /> By Bike
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="location-section">
                  <h3>Key Location Advantages</h3>
                  <div className="advantages-list">
                    {selectedProperty.location.advantages.map((advantage, index) => (
                      <div key={index} className="advantage-item">
                        <FaMapMarkerAlt /> {advantage}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="location-section">
                  <h3>Nearby Facilities</h3>
                  <div className="facilities-grid">
                    <div className="facility-category">
                      <h4><FaHospital /> Hospitals</h4>
                      <ul>
                        {selectedProperty.location.nearby.hospitals.map((hospital, index) => (
                          <li key={index}>{hospital}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="facility-category">
                      <h4><FaSchool /> Schools</h4>
                      <ul>
                        {selectedProperty.location.nearby.schools.map((school, index) => (
                          <li key={index}>{school}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="facility-category">
                      <h4><FaShoppingCart /> Shopping</h4>
                      <ul>
                        {selectedProperty.location.nearby.shopping.map((shop, index) => (
                          <li key={index}>{shop}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="facility-category">
                      <h4><FaTrain /> Transport</h4>
                      <ul>
                        {selectedProperty.location.nearby.transport.map((transport, index) => (
                          <li key={index}>{transport}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="location-section">
                  <h3>Connectivity</h3>
                  <div className="connectivity-grid">
                    <div className="connectivity-item">
                      <FaPlane />
                      <div>
                        <span className="connectivity-label">Airport</span>
                        <span className="connectivity-value">{selectedProperty.location.connectivity.airport}</span>
                      </div>
                    </div>
                    <div className="connectivity-item">
                      <FaTrain />
                      <div>
                        <span className="connectivity-label">Railway Station</span>
                        <span className="connectivity-value">{selectedProperty.location.connectivity.railway}</span>
                      </div>
                    </div>
                    <div className="connectivity-item">
                      <FaSubway />
                      <div>
                        <span className="connectivity-label">Metro Station</span>
                        <span className="connectivity-value">{selectedProperty.location.connectivity.metro}</span>
                      </div>
                    </div>
                    <div className="connectivity-item">
                      <FaBus />
                      <div>
                        <span className="connectivity-label">Highway Access</span>
                        <span className="connectivity-value">{selectedProperty.location.connectivity.highway}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'developer' && (
              <div className="developer-content">
                <div className="tab-header">
                  <h2><FaBuilding /> Developer Information</h2>
                  <div className="tab-actions">
                    <button className="tab-action-btn">
                      <FaFileDownload /> Download Profile
                    </button>
                  </div>
                </div>
                
                <div className="developer-section">
                  <div className="developer-header-card">
                    <div className="developer-logo">
                      <FaBuilding />
                    </div>
                    <div className="developer-title">
                      <h3>{selectedProperty.developer.name}</h3>
                      <div className="developer-tags">
                        <span className="tag-verified"><FaCertificate /> RERA Registered</span>
                        <span className="tag-experience"><FaHistory /> {selectedProperty.developer.stats.yearsExperience} Experience</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="developer-about">
                    <h3>About the Developer</h3>
                    <p>{selectedProperty.developer.about}</p>
                  </div>
                  
                  <div className="developer-section">
                    <h3>Achievements & Awards</h3>
                    <div className="achievements-grid">
                      {selectedProperty.developer.achievements.map((achievement, index) => (
                        <div key={index} className="achievement-card">
                          <FaAward />
                          <p>{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="developer-section">
                    <h3>Developer Statistics</h3>
                    <div className="stats-grid">
                      {Object.entries(selectedProperty.developer.stats).map(([key, value]) => (
                        <div key={key} className="stat-card">
                          <div className="stat-icon">
                            {key.includes('projects') && <FaBuilding />}
                            {key.includes('years') && <FaHistory />}
                            {key.includes('cities') && <FaGlobeAsia />}
                            {key.includes('customers') && <FaUsers />}
                          </div>
                          <div className="stat-info">
                            <span className="stat-value">{value}</span>
                            <span className="stat-label">{key.replace(/([A-Z])/g, ' $1')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="developer-section">
                    <h3>Portfolio</h3>
                    <div className="portfolio-grid">
                      {selectedProperty.developer.portfolio.map((project, index) => (
                        <div key={index} className="portfolio-item">
                          <FaCheck />
                          <div>
                            <h4>{project.name}</h4>
                            <p>{project.location} - {project.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="developer-section">
                    <h3>Certifications</h3>
                    <div className="certifications-grid">
                      {selectedProperty.developer.certifications.map((cert, index) => (
                        <div key={index} className="certification-item">
                          {cert}
                        </div>
                      ))}
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
                  onClick={() => setSelectedBHK(bhk)}
                >
                  <div className="bhk-option-header">
                    <span className="bhk-type">{bhk}</span>
                    {bhk === "4 BHK" && (
                      <span className="badge badge-premium">Premium</span>
                    )}
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
            
            {/* BHK Feature Comparison */}
            <div className="bhk-comparison">
              <h4><FaCheck /> Configuration Features</h4>
              <div className="comparison-features">
                <div className="comparison-feature">
                  <FaCheck /> Modular Kitchen
                </div>
                <div className="comparison-feature">
                  <FaCheck /> Wooden Flooring
                </div>
                <div className="comparison-feature">
                  <FaCheck /> Premium Fittings
                </div>
                <div className="comparison-feature">
                  <FaCheck /> Parking Included
                </div>
              </div>
            </div>
          </div>

          {/* Selected Configuration Details */}
          {selectedBHK && currentPriceDetails && (
            <div className="selected-config-card">
              <h3><FaCalculator /> Price Details</h3>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Base Price</span>
                  <span>{currentPriceDetails.price}</span>
                </div>
                <div className="price-row">
                  <span>Registration & Stamp Duty</span>
                  <span>Approx. ₹2-3 Lacs</span>
                </div>
                <div className="price-row">
                  <span>Maintenance (Monthly)</span>
                  <span>₹3-5 per sq.ft.</span>
                </div>
                <div className="price-total">
                  <span>Total Investment</span>
                  <span>{currentPriceDetails.price} + Taxes</span>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="agent-contact-buttons" style={{ marginTop: '20px' }}>
                <button 
                  className="btn-whatsapp"
                  onClick={() => window.open(`https://wa.me/${primaryAgent.whatsapp}?text=Hi, I'm interested in ${selectedProperty.title} - ${selectedBHK}`, '_blank')}
                >
                  <FaWhatsapp /> Get Quote
                </button>
                <button 
                  className="btn-email"
                  onClick={() => window.location.href = `mailto:${primaryAgent.email}?subject=Price Quote for ${selectedProperty.title} - ${selectedBHK}`}
                >
                  <FaEnvelope /> Email Quote
                </button>
              </div>
            </div>
          )}

          {/* Contact Agent Section */}
          <div className="agents-section">
            <div className="section-header">
              <h3><FaUser /> Contact Agent</h3>
              <span className="agents-count">{selectedProperty.agents.length} Agent Available</span>
            </div>
            
            <div className="agent-card">
              <div className="agent-header">
                <div className="agent-profile">
                  <img src={primaryAgent.photo} alt={primaryAgent.name} />
                  <div className="agent-info">
                    <h4>{primaryAgent.name}</h4>
                    <div className="agent-rating">
                      <FaStarSolid />
                      <span>{primaryAgent.rating}</span>
                      <span className="reviews">({primaryAgent.reviews} reviews)</span>
                    </div>
                    <div className="agent-experience">
                      <FaClock /> {primaryAgent.experience} experience
                    </div>
                  </div>
                </div>
                {primaryAgent.verified && (
                  <span className="verified-tag">
                    <FaCheck /> Verified
                  </span>
                )}
              </div>
              
              {/* Agent Performance Stats */}
              <div className="agent-performance">
                <div className="performance-metric">
                  <span className="metric-value">{primaryAgent.experience}</span>
                  <span className="metric-label">Experience</span>
                </div>
                <div className="performance-metric">
                  <span className="metric-value">{primaryAgent.rating}</span>
                  <span className="metric-label">Rating</span>
                </div>
                <div className="performance-metric">
                  <span className="metric-value">{primaryAgent.reviews}</span>
                  <span className="metric-label">Reviews</span>
                </div>
              </div>
              
              {/* Agent Languages */}
              <div className="agent-languages">
                {primaryAgent.languages.map((language, index) => (
                  <span key={index} className="language-tag">{language}</span>
                ))}
              </div>
              
              <div className="agent-contact-buttons">
                <button className="btn-call" onClick={() => window.location.href = `tel:${primaryAgent.phone}`}>
                  <FaPhone /> Call Now
                </button>
                <button className="btn-whatsapp" onClick={() => window.open(`https://wa.me/${primaryAgent.whatsapp}?text=Hi, I'm interested in ${selectedProperty.title} - ${selectedBHK}`)}>
                  <FaWhatsapp /> WhatsApp
                </button>
                <button className="btn-email" onClick={() => window.location.href = `mailto:${primaryAgent.email}?subject=Inquiry about ${selectedProperty.title}`}>
                  <FaEnvelope /> Email
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Enquiry Form */}
          <div className="quick-enquiry">
            <h3><FaEnvelope /> Quick Enquiry</h3>
            <form className="enquiry-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <select required>
                <option value="">Select BHK</option>
                {Object.keys(selectedProperty.priceDetails).map((bhk) => (
                  <option key={bhk} value={bhk}>{bhk}</option>
                ))}
              </select>
              <textarea placeholder="Your Message (Optional)" rows="3"></textarea>
              <button type="submit" className="btn-submit-enquiry">
                <FaEnvelope /> Submit Enquiry
              </button>
            </form>
            
            <div className="enquiry-benefits">
              <h4><FaCheck /> Why Enquire Now?</h4>
              <div className="benefit-list">
                <div className="benefit-item">
                  <FaCheck /> Get Best Price Quote
                </div>
                <div className="benefit-item">
                  <FaCheck /> Priority Site Visit
                </div>
                <div className="benefit-item">
                  <FaCheck /> Free Consultation
                </div>
                <div className="benefit-item">
                  <FaCheck /> Early Bird Offers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeImageModal}>
              ×
            </button>
            
            <div className="modal-image-container">
              <img 
                src={selectedProperty.images[activeModalImage]} 
                alt={`${selectedProperty.title} - Image ${activeModalImage + 1}`}
                className="modal-image"
              />
              
              <button className="modal-nav-button prev" onClick={prevModalImage}>
                <FaChevronLeft />
              </button>
              <button className="modal-nav-button next" onClick={nextModalImage}>
                <FaChevronRight />
              </button>
              
              <div className="modal-image-info">
                <span className="modal-image-counter">
                  {activeModalImage + 1} / {selectedProperty.images.length}
                </span>
                <span className="modal-image-title">
                  {selectedProperty.title}
                </span>
              </div>
            </div>
            
            <div className="modal-thumbnail-strip">
              {selectedProperty.images.map((image, index) => (
                <div 
                  key={index}
                  className={`modal-thumbnail ${index === activeModalImage ? 'active' : ''}`}
                  onClick={() => setActiveModalImage(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {shareModal && (
        <div className="modal-overlay" onClick={() => setShareModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Property</h3>
              <button className="close-modal" onClick={() => setShareModal(false)}>×</button>
            </div>
            <div className="share-options">
              <button className="share-option">
                <FaWhatsapp /> WhatsApp
              </button>
              <button className="share-option">
                <FaEnvelope /> Email
              </button>
              <button className="share-option">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyViewInfo;