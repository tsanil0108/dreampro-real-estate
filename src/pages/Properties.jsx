import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Properties.css";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;

  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", 
    "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", 
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
    "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
    "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
    "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi"
  ];

  const availableCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune"];

  // Properties Database with simplified structure
  const properties = [
    // MUMBAI PROPERTIES
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
      image: "https://patonconstructions.in/patontowers/images/img2.jpg",
      available: true,
      status: "Available Now",
      developer: "Paton Constructions",
      featured: true
    },
    {
      id: 2,
      title: "Godrej Nest Tower",
      address: "Kandivali East, Lokhandwala, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://cdn.blox.xyz/projects-2x/godrej-properties-godrej-nest-1746534958.jpg",
      available: true,
      status: "Available Now",
      developer: "Godrej Properties",
      featured: true
    },
    {
      id: 3,
      title: "UK Tower",
      address: "Kandivali East, Hanuman Nagar, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://www.ukrealty.in/project/luxecity-kandivali/img/about-us.jpg",
      available: true,
      status: "Available Now",
      developer: "UK Realty"
    },
    {
      id: 4,
      title: "Mahindra Vista",
      address: "Kandivali East, Damungar, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://projectvista-kandivali.in/public/admin/images/1708101584.jpg",
      available: true,
      status: "Available Now",
      developer: "Mahindra Lifespaces"
    },
    {
      id: 5,
      title: "Aarambh Tower",
      address: "Gandhi Nagar, Malad East, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://www.jllhomes.co.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fjll-global-gdim%2Fimage%2Fupload%2FIN%2FHorizon%2FResi%2FProd%2FJLL_Mum_Aarambh_273_EXT_primary.jpg&w=3840&q=75",
      available: true,
      status: "Available Now",
      developer: "JLL Homes"
    },
    {
      id: 6,
      title: "Lodha Wood",
      address: "Akurli Road, Kandivali East, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://wealthcreatorsheights.com/uploads/file-manager/lodha-wood.webp",
      available: true,
      status: "Available Now",
      developer: "Lodha Group"
    },
    {
      id: 7,
      title: "Kalpataru Estate",
      address: "Powai, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      available: true,
      status: "Available Now",
      developer: "Kalpataru Group"
    },
    {
      id: 8,
      title: "Raheja Vihar",
      address: "Andheri West, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      available: true,
      status: "Available Now",
      developer: "Raheja Group"
    },
    {
      id: 9,
      title: "Hiranandani Gardens",
      address: "Powai, Mumbai",
      city: "Mumbai",
      district: "Mumbai Suburban",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800",
      available: true,
      status: "Available Now",
      developer: "Hiranandani Group"
    },
    {
      id: 10,
      title: "Piramal Aranya",
      address: "Byculla, Mumbai",
      city: "Mumbai",
      district: "Mumbai City",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800",
      available: true,
      status: "Available Now",
      developer: "Piramal Realty"
    },

    // DELHI PROPERTIES
    {
      id: 11,
      title: "DLF Magnolias",
      address: "Gurgaon Sector 42, Delhi",
      city: "Delhi",
      district: "Gurgaon",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
      available: true,
      status: "Available Now",
      developer: "DLF Limited",
      featured: true
    },
    {
      id: 12,
      title: "The Camellias",
      address: "Sector 57, Gurgaon",
      city: "Delhi",
      district: "Gurgaon",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      available: true,
      status: "Available Now",
      developer: "DLF Limited"
    },
    {
      id: 13,
      title: "Godrej Air",
      address: "Sector 85, Gurgaon",
      city: "Delhi",
      district: "Gurgaon",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      available: true,
      status: "Available Now",
      developer: "Godrej Properties"
    },
    {
      id: 14,
      title: "M3M Golf Estate",
      address: "Golf Course Extension, Gurgaon",
      city: "Delhi",
      district: "Gurgaon",
      image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
      available: true,
      status: "Available Now",
      developer: "M3M India"
    },
    {
      id: 15,
      title: "Tata Aerocity",
      address: "Dwarka Expressway, Delhi",
      city: "Delhi",
      district: "Dwarka",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      available: true,
      status: "Available Now",
      developer: "Tata Housing"
    },

    // BANGALORE PROPERTIES
    {
      id: 16,
      title: "Prestige High Fields",
      address: "Whitefield, Bangalore",
      city: "Bangalore",
      district: "Whitefield",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      available: true,
      status: "Available Now",
      developer: "Prestige Group",
      featured: true
    },
    {
      id: 17,
      title: "Brigade Gateway",
      address: "Malleshwaram, Bangalore",
      city: "Bangalore",
      district: "Malleshwaram",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      available: true,
      status: "Available Now",
      developer: "Brigade Group"
    },
    {
      id: 18,
      title: "Sobha Dream Acres",
      address: "Sarjapur Road, Bangalore",
      city: "Bangalore",
      district: "Sarjapur",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      available: true,
      status: "Available Now",
      developer: "Sobha Limited"
    },
    {
      id: 19,
      title: "Godrej Platinum",
      address: "Vijayanagar, Bangalore",
      city: "Bangalore",
      district: "Vijayanagar",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800",
      available: true,
      status: "Available Now",
      developer: "Godrej Properties"
    },

    // HYDERABAD PROPERTIES
    {
      id: 20,
      title: "Prestige High Gloss",
      address: "Gachibowli, Hyderabad",
      city: "Hyderabad",
      district: "Gachibowli",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      available: true,
      status: "Available Now",
      developer: "Prestige Group"
    },
    {
      id: 21,
      title: "My Home Jewel",
      address: "Narsingi, Hyderabad",
      city: "Hyderabad",
      district: "Narsingi",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      available: true,
      status: "Available Now",
      developer: "My Home Group"
    },
    {
      id: 22,
      title: "Aparna Sarovar",
      address: "Kondapur, Hyderabad",
      city: "Hyderabad",
      district: "Kondapur",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      available: true,
      status: "Available Now",
      developer: "Aparna Constructions"
    },

    // PUNE PROPERTIES
    {
      id: 23,
      title: "Kumar Prospera",
      address: "Baner, Pune",
      city: "Pune",
      district: "Baner",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      available: true,
      status: "Available Now",
      developer: "Kumar Properties"
    },
    {
      id: 24,
      title: "Godrej Infinity",
      address: "Wakad, Pune",
      city: "Pune",
      district: "Wakad",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      available: true,
      status: "Available Now",
      developer: "Godrej Properties"
    },
    {
      id: 25,
      title: "Lodha Belmondo",
      address: "Pune-Mumbai Expressway",
      city: "Pune",
      district: "Talegaon",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      available: true,
      status: "Available Now",
      developer: "Lodha Group"
    },

    // COMING SOON PROPERTIES (other cities)
    {
      id: 26,
      title: "Casagrand Builder",
      address: "OMR, Chennai",
      city: "Chennai",
      district: "OMR",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      available: false,
      status: "Coming Soon",
      developer: "Casagrand"
    },
    {
      id: 27,
      title: "South City Projects",
      address: "Tollygunge, Kolkata",
      city: "Kolkata",
      district: "Tollygunge",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      available: false,
      status: "Coming Soon",
      developer: "South City"
    }
  ];

  // Get filtered properties function
  const getFilteredProperties = () => {
    let filtered = [...properties];
    
    // Filter by city if selected
    if (selectedCity && selectedCity !== "All Cities") {
      filtered = filtered.filter(p => p.city === selectedCity);
    }
    
    // Filter by search term if exists
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(property => {
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.address.toLowerCase().includes(searchLower) ||
          property.district.toLowerCase().includes(searchLower) ||
          property.city.toLowerCase().includes(searchLower) ||
          (property.developer && property.developer.toLowerCase().includes(searchLower))
        );
      });
    }
    
    return filtered;
  };

  const filteredProperties = getFilteredProperties();

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty, 
    indexOfLastProperty
  );

  // Handle city select
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
    }
  };

  // Get city property counts
  const getCityPropertyCount = (city) => {
    if (city === "" || city === "All Cities") {
      return properties.filter(p => p.available).length;
    }
    return properties.filter(p => p.city === city && p.available).length;
  };

  // Get total property counts
  const getTotalPropertiesCount = () => {
    return properties.filter(p => p.available).length;
  };

  const getComingSoonCount = () => {
    return properties.filter(p => !p.available).length;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCity]);

  return (
    <div className="properties-page-main">
      <div className="properties-container">
        {/* Page Header */}
<<<<<<< Updated upstream
        <div className="page-header">
          <h1 className="page-title">Premium Properties Across India</h1>
          <p className="page-subtitle">
=======
        <div className="properties-page-header">
          <h1 className="properties-page-title">Premium Properties Across India</h1>
          <p className="properties-page-subtitle">
>>>>>>> Stashed changes
            Currently available in {availableCities.length} cities. More cities launching soon!
          </p>
        </div>

        {/* City Availability Status */}
<<<<<<< Updated upstream
        <div className="availability-info">
          <div className="availability-badge available">
            <span className="status-dot available"></span>
            <span>{getTotalPropertiesCount()} Properties Available</span>
          </div>
          <div className="availability-badge coming-soon">
            <span className="status-dot coming-soon"></span>
            <span>{getComingSoonCount()} Properties Coming Soon</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-box">
              <div className="search-input-container">
                <input 
                  type="text" 
                  placeholder="Search properties by name, location, or city..." 
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-btn" onClick={() => setCurrentPage(1)}>
                  <span>🔍</span>
                </button>
              </div>
              
              {(searchTerm || selectedCity) && (
                <button className="clear-btn" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="quick-filters">
              <div className="filter-label">Filter by City:</div>
              <div className="city-chips">
                <button 
                  className={`city-chip ${selectedCity === "" ? 'active' : ''}`}
                  onClick={() => handleCitySelect("")}
                >
                  All Cities ({getTotalPropertiesCount()})
                </button>
                
                {availableCities.map(city => (
                  <button 
                    key={city}
                    className={`city-chip ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                    <span className="city-count">{getCityPropertyCount(city)}</span>
                    <span className="city-status available">Available</span>
                  </button>
                ))}
                
                {indianCities
                  .filter(city => !availableCities.includes(city))
                  .slice(0, 5)
                  .map(city => (
                    <button 
                      key={city}
                      className={`city-chip coming-soon-chip ${selectedCity === city ? 'active' : ''}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                      <span className="city-status coming-soon">Soon</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Results Info */}
            <div className="results-info">
              <span className="results-count">
                {filteredProperties.length > 0 ? (
                  `Showing ${Math.min(currentProperties.length, propertiesPerPage)} of ${filteredProperties.length} properties`
                ) : (
                  "No properties found"
                )}
              </span>
              {selectedCity && selectedCity !== "" && (
                <span className="selected-city">
                  in <strong>{selectedCity}</strong>
                  {!availableCities.includes(selectedCity) && (
                    <span className="city-availability"> (Coming Soon)</span>
                  )}
                </span>
              )}
              {searchTerm && searchTerm.trim() !== "" && (
                <span className="search-term">
                  for "<strong>{searchTerm}</strong>"
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Properties Grid - UPDATED with dark/light theme */}
        <div className="properties-grid">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <div key={property.id} className={`property-card ${property.featured ? 'featured' : ''}`}>
                
                {/* Property Image */}
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  
                  {/* DARK THEME Available Badge */}
                  <div className="availability-badge-image">
                    {property.available ? (
                      <span className="available-tag">AVAILABLE NOW</span>
                    ) : (
                      <span className="coming-soon-tag-image">COMING SOON</span>
                    )}
                  </div>
                  
                  {/* LIGHT THEME Location Badge */}
                  <div className="location-badge">
                    <span className="city-badge">{property.city}</span>
                    <span className="district-badge">{property.district}</span>
=======
        <div className="properties-availability-info">
          <div className="properties-availability-badge available">
            <span className="properties-status-dot available"></span>
            <span>{getTotalPropertiesCount()} Properties Available</span>
          </div>
          <div className="properties-availability-badge coming-soon">
            <span className="properties-status-dot coming-soon"></span>
            <span>{getComingSoonCount()} Properties Coming Soon</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="properties-search-section">
          <div className="properties-search-container">
            <div className="properties-search-box">
              <div className="properties-search-input-container">
                <input 
                  type="text" 
                  placeholder="Search properties by name, location, or city..." 
                  className="properties-search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                />
                <button className="properties-search-btn" onClick={() => setCurrentPage(1)}>
                  <span>🔍</span>
                </button>
              </div>
              
              {(searchTerm || selectedCity) && (
                <button className="properties-clear-btn" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="properties-quick-filters">
              <div className="properties-filter-label">Filter by City:</div>
              <div className="properties-city-chips">
                <button 
                  className={`properties-city-chip ${selectedCity === "" ? 'properties-city-active' : ''}`}
                  onClick={() => handleCitySelect("")}
                >
                  All Cities ({getTotalPropertiesCount()})
                </button>
                
                {availableCities.map(city => (
                  <button 
                    key={city}
                    className={`properties-city-chip ${selectedCity === city ? 'properties-city-active' : ''}`}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                    <span className="properties-city-count">{getCityPropertyCount(city)}</span>
                    <span className="properties-city-status available">Available</span>
                  </button>
                ))}
                
                {indianCities
                  .filter(city => !availableCities.includes(city))
                  .slice(0, 5)
                  .map(city => (
                    <button 
                      key={city}
                      className={`properties-city-chip properties-coming-soon-chip ${selectedCity === city ? 'properties-city-active' : ''}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                      <span className="properties-city-status coming-soon">Soon</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Results Info */}
            <div className="properties-results-info">
              <span className="properties-results-count">
                {filteredProperties.length > 0 ? (
                  `Showing ${Math.min(currentProperties.length, propertiesPerPage)} of ${filteredProperties.length} properties`
                ) : (
                  "No properties found"
                )}
              </span>
              {selectedCity && selectedCity !== "" && (
                <span className="properties-selected-city">
                  in <strong>{selectedCity}</strong>
                  {!availableCities.includes(selectedCity) && (
                    <span className="properties-city-availability"> (Coming Soon)</span>
                  )}
                </span>
              )}
              {searchTerm && searchTerm.trim() !== "" && (
                <span className="properties-search-term">
                  for "<strong>{searchTerm}</strong>"
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid-main">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <div key={property.id} className={`properties-card ${property.featured ? 'properties-featured' : ''}`}>
                
                {/* Property Image */}
                <div className="properties-image">
                  <img src={property.image} alt={property.title} />
                  
                  {/* Available Badge */}
                  <div className="properties-availability-badge-image">
                    {property.available ? (
                      <span className="properties-available-tag">AVAILABLE NOW</span>
                    ) : (
                      <span className="properties-coming-soon-tag-image">COMING SOON</span>
                    )}
                  </div>
                  
                  {/* Location Badge */}
                  <div className="properties-location-badge">
                    <span className="properties-city-badge">{property.city}</span>
                    <span className="properties-district-badge">{property.district}</span>
>>>>>>> Stashed changes
                  </div>
                </div>

                {/* Property Content */}
<<<<<<< Updated upstream
                <div className="property-content">
                  <div className="property-header">
                    <h3 className="property-title">{property.title}</h3>
                    
                    {/* DARK THEME Developer Badge */}
                    <div className="developer-info">
                      {property.developer && (
                        <span className="developer-badge">{property.developer}</span>
=======
                <div className="properties-content">
                  <div className="properties-header">
                    <h3 className="properties-title">{property.title}</h3>
                    
                    {/* Developer Badge */}
                    <div className="properties-developer-info">
                      {property.developer && (
                        <span className="properties-developer-badge">{property.developer}</span>
>>>>>>> Stashed changes
                      )}
                    </div>
                  </div>
                  
<<<<<<< Updated upstream
                  <p className="property-address">{property.address}</p>
                  
                  {/* DARK THEME Property Details */}
                  <div className="property-details">
                    <div className="detail-row">
                      <span className="detail-label">Status</span>
                      <span className={`detail-value ${property.available ? 'available' : 'coming-soon'}`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">City</span>
                      <span className="detail-value">{property.city}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">District</span>
                      <span className="detail-value">{property.district}</span>
=======
                  <p className="properties-address">{property.address}</p>
                  
                  {/* Property Details */}
                  <div className="properties-details">
                    <div className="properties-detail-row">
                      <span className="properties-detail-label">Status</span>
                      <span className={`properties-detail-value ${property.available ? 'properties-available' : 'properties-coming-soon'}`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="properties-detail-row">
                      <span className="properties-detail-label">City</span>
                      <span className="properties-detail-value">{property.city}</span>
                    </div>
                    <div className="properties-detail-row">
                      <span className="properties-detail-label">District</span>
                      <span className="properties-detail-value">{property.district}</span>
>>>>>>> Stashed changes
                    </div>
                  </div>
                  
                  {/* Divider */}
<<<<<<< Updated upstream
                  <div className="divider"></div>
=======
                  <div className="properties-divider"></div>
>>>>>>> Stashed changes
                  
                  {/* View Details Button */}
                  {property.available ? (
                    <Link 
                      to={`/property/${property.id}`} 
<<<<<<< Updated upstream
                      className="btn-view-details"
=======
                      className="properties-btn-view-details"
>>>>>>> Stashed changes
                    >
                      VIEW DETAILS
                    </Link>
                  ) : (
<<<<<<< Updated upstream
                    <button className="btn-view-details disabled" disabled>
=======
                    <button className="properties-btn-view-details properties-disabled" disabled>
>>>>>>> Stashed changes
                      COMING SOON
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
<<<<<<< Updated upstream
            <div className="no-properties-found">
              <h3>No properties found</h3>
              <p>Try adjusting your search filters or browse properties in available cities.</p>
              <button className="btn-primary" onClick={clearFilters}>
=======
            <div className="properties-no-properties-found">
              <h3>No properties found</h3>
              <p>Try adjusting your search filters or browse properties in available cities.</p>
              <button className="properties-btn-primary" onClick={clearFilters}>
>>>>>>> Stashed changes
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
<<<<<<< Updated upstream
          <div className="pagination">
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
=======
          <div className="properties-pagination">
            <button 
              className={`properties-pagination-btn ${currentPage === 1 ? 'properties-disabled' : ''}`}
>>>>>>> Stashed changes
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
              })
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && page - array[index - 1] > 1 && (
<<<<<<< Updated upstream
                    <span className="pagination-ellipsis">...</span>
                  )}
                  <button
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
=======
                    <span className="properties-pagination-ellipsis">...</span>
                  )}
                  <button
                    className={`properties-pagination-btn ${currentPage === page ? 'properties-active' : ''}`}
>>>>>>> Stashed changes
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
            
            <button 
<<<<<<< Updated upstream
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
=======
              className={`properties-pagination-btn ${currentPage === totalPages ? 'properties-disabled' : ''}`}
>>>>>>> Stashed changes
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}

        {/* Explore Cities */}
<<<<<<< Updated upstream
        <div className="explore-cities">
          <h3>Properties Available in These Cities</h3>
          <div className="all-cities-grid">
            {availableCities.map((city) => (
              <button
                key={city}
                className="city-item available"
                onClick={() => handleCitySelect(city)}
              >
                {city}
                <span className="city-item-count">{getCityPropertyCount(city)} properties</span>
                <span className="city-item-status available">Available Now</span>
=======
        <div className="properties-explore-cities">
          <h3>Properties Available in These Cities</h3>
          <div className="properties-all-cities-grid">
            {availableCities.map((city) => (
              <button
                key={city}
                className="properties-city-item properties-available"
                onClick={() => handleCitySelect(city)}
              >
                {city}
                <span className="properties-city-item-count">{getCityPropertyCount(city)} properties</span>
                <span className="properties-city-item-status properties-available">Available Now</span>
>>>>>>> Stashed changes
              </button>
            ))}
          </div>
          
          <h3>Properties Launching Soon</h3>
<<<<<<< Updated upstream
          <div className="all-cities-grid">
=======
          <div className="properties-all-cities-grid">
>>>>>>> Stashed changes
            {indianCities
              .filter(city => !availableCities.includes(city))
              .slice(0, 12)
              .map((city) => (
                <button
                  key={city}
<<<<<<< Updated upstream
                  className="city-item coming-soon"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                  <span className="city-item-status">Launching Soon</span>
=======
                  className="properties-city-item properties-coming-soon"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                  <span className="properties-city-item-status">Launching Soon</span>
>>>>>>> Stashed changes
                </button>
              ))}
          </div>
        </div>

        {/* Contact CTA */}
<<<<<<< Updated upstream
        <div className="contact-cta">
          <h3>Looking for properties in other cities?</h3>
          <p>Join our waitlist to be notified when we launch in your city</p>
          <div className="cta-buttons">
            <Link to="/contactagent" className="btn-primary">
              JOIN WAITLIST
            </Link>
            <button className="btn-secondary" onClick={clearFilters}>
=======
        <div className="properties-contact-cta">
          <h3>Looking for properties in other cities?</h3>
          <p>Join our waitlist to be notified when we launch in your city</p>
          <div className="properties-cta-buttons">
            <Link to="/contactagent" className="properties-btn-primary">
              JOIN WAITLIST
            </Link>
            <button className="properties-btn-secondary" onClick={clearFilters}>
>>>>>>> Stashed changes
              BROWSE ALL PROPERTIES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;