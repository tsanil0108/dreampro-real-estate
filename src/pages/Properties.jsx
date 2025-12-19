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
      title: "Poton Tower",
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
    <div className="properties-page">
      <div className="container">
        {/* Page Header */}
        <div className="properties-page-header">
          <h1 className="page-title">Premium Properties Across India</h1>
          <p className="page-subtitle">
            Currently available in {availableCities.length} cities. More cities launching soon!
          </p>
        </div>

        {/* City Availability Status */}
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
                  Search
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
                    <span> (Coming Soon)</span>
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

        {/* Properties Grid */}
        <div className="properties-grid">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <div key={property.id} className={`property-card ${property.featured ? 'featured' : ''}`}>
                
                {/* Property Image */}
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  
                  {/* Availability Badge */}
                  <div className="availability-badge-image">
                    {property.available ? (
                      <span className="available-tag">AVAILABLE NOW</span>
                    ) : (
                      <span className="coming-soon-tag-image">COMING SOON</span>
                    )}
                  </div>
                  
                  {/* Location Badge */}
                  <div className="location-badge">
                    <span className="city-badge">{property.city}</span>
                    <span className="district-badge">{property.district}</span>
                  </div>
                </div>

                {/* Property Content */}
                <div className="property-content">
                  <div className="property-header">
                    <h3 className="property-title">{property.title}</h3>
                    
                    {/* Developer Badge */}
                    <div className="developer-info">
                      {property.developer && (
                        <span className="developer-badge">{property.developer}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="property-address">{property.address}</p>
                  
                  {/* Property Details */}
  
  
                  
                  {/* Divider */}
                  <div className="divider"></div>
                  
                  {/* View Details Button */}
                  {property.available ? (
                    <Link 
                      to={`/property/${property.id}`} 
                      className="btn-view-details"
                    >
                      VIEW DETAILS
                    </Link>
                  ) : (
                    <button className="btn-view-details disabled" disabled>
                      COMING SOON
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-properties-found">
              <h3>No properties found</h3>
              <p>Try adjusting your search filters or browse properties in available cities.</p>
              <button className="btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
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
                    <span className="pagination-ellipsis">...</span>
                  )}
                  <button
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
            
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}

        {/* Explore Cities */}
        <div className="explore-cities">
          <h3>Properties Available in These Cities</h3>
          <div className="all-cities-grid">
            {availableCities.map((city) => (
              <button
                key={city}
                className="city-item"
                onClick={() => handleCitySelect(city)}
              >
                {city}
                <span className="city-item-count">{getCityPropertyCount(city)} properties</span>
                <span className="city-item-status available">Available Now</span>
              </button>
            ))}
          </div>
          
          <h3>Properties Launching Soon</h3>
          <div className="all-cities-grid">
            {indianCities
              .filter(city => !availableCities.includes(city))
              .slice(0, 12)
              .map((city) => (
                <button
                  key={city}
                  className="city-item coming-soon"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                  <span className="city-item-status coming-soon">Launching Soon</span>
                </button>
              ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="contact-cta">
          <h3>Looking for properties in other cities?</h3>
          <p>Join our waitlist to be notified when we launch in your city</p>
          <div className="cta-buttons">
            <Link to="/contactagent" className="btn-primary">
              JOIN WAITLIST
            </Link>
            <button className="btn-secondary" onClick={clearFilters}>
              BROWSE ALL PROPERTIES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;