import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Properties.css";

const Properties = () => {
  const [filter, setFilter] = useState({
    type: "all",
    priceRange: "all",
    bedrooms: "all"
  });

  const sampleProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: 350000,
      address: "123 Main St, New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
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
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400"
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
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400"
    },
    {
      id: 4,
      title: "Mountain Retreat",
      price: 950000,
      address: "321 Alpine Road, Aspen, CO",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4200,
      type: "House",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"
    },
    {
      id: 5,
      title: "Urban Penthouse",
      price: 2200000,
      address: "567 Skyline Blvd, San Francisco, CA",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2400,
      type: "Penthouse",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400"
    },
    {
      id: 6,
      title: "Suburban Family Home",
      price: 650000,
      address: "890 Maple Street, Boston, MA",
      bedrooms: 4,
      bathrooms: 2,
      sqft: 2800,
      type: "House",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"
    },
    {
      id: 7,
      title: "Lakeside Cottage",
      price: 450000,
      address: "234 Lakeview Drive, Seattle, WA",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      type: "Cottage",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400"
    },
    {
      id: 8,
      title: "Modern Condo",
      price: 550000,
      address: "567 Urban Lane, Austin, TX",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      type: "Condo",
      image: "https://images.unsplash.com/photo-1540518614846-7eded102d7c8?w=400"
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProperties = sampleProperties.filter(property => {
    if (filter.type !== "all" && property.type !== filter.type) return false;
    if (filter.bedrooms !== "all" && property.bedrooms !== parseInt(filter.bedrooms)) return false;
    
    if (filter.priceRange !== "all") {
      const price = property.price;
      switch (filter.priceRange) {
        case "under-500k": return price < 500000;
        case "500k-1m": return price >= 500000 && price < 1000000;
        case "1m-2m": return price >= 1000000 && price < 2000000;
        case "over-2m": return price >= 2000000;
        default: return true;
      }
    }
    
    return true;
  });

  // Function to get color scheme based on index
  const getColorScheme = (index) => {
    const schemes = ['default', 'dark', 'luxury', 'nature', 'ocean', 'berry'];
    return schemes[index % 6];
  };

  return (
    <div className="properties-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Discover Your Dream Property</h1>
          <p className="page-subtitle">
            Explore our curated collection of premium properties in prime locations
          </p>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Property Type</label>
              <select name="type" value={filter.type} onChange={handleFilterChange}>
                <option value="all">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Loft">Loft</option>
                <option value="Cottage">Cottage</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select name="priceRange" value={filter.priceRange} onChange={handleFilterChange}>
                <option value="all">Any Price</option>
                <option value="under-500k">Under $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-2m">$1M - $2M</option>
                <option value="over-2m">Over $2M</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Bedrooms</label>
              <select name="bedrooms" value={filter.bedrooms} onChange={handleFilterChange}>
                <option value="all">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <p>Showing {filteredProperties.length} of {sampleProperties.length} properties</p>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {filteredProperties.map((property, index) => (
            <div key={property.id} className="property-card">
              {/* Property Image */}
              <div className="property-image">
                <img src={property.image} alt={property.title} />
                <div className="property-type">{property.type}</div>
              </div>

              {/* Property Content */}
              <div className="property-content">
                <div className="property-header">
                  <h3 className="property-title">{property.title}</h3>
                  <p className="property-price">${property.price.toLocaleString()}</p>
                </div>
                
                <p className="property-address">{property.address}</p>
                
                <div className="property-features">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>{property.sqft} sqft</span>
                </div>

                {/* View Details Button with Color Scheme */}
                <Link 
                  to={`/property/${property.id}`} 
                  className={`btn-view-details ${getColorScheme(index)}`}
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProperties.length === 0 && (
          <div className="no-results">
            <h3>No properties found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Load More Button */}
        <div className="load-more-section">
          <button className="btn btn-outline">
            Load More Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default Properties;