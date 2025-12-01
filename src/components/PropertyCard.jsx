import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <div className="property-badges">
          <span className="property-type">{property.type}</span>
          <span className="property-featured">Featured</span>
        </div>
        <div className="property-overlay">
          <Link to={`/property/${property.id}`} className="btn-view-details">
            VIEW DETAILS
          </Link>
        </div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-price">{formatPrice(property.price)}</p>
        <p className="property-address">{property.address}</p>
        
        <div className="property-features">
          <div className="feature">
            <span className="feature-icon">🛏️</span>
            <span className="feature-text">{property.bedrooms} Beds</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚿</span>
            <span className="feature-text">{property.bathrooms} Baths</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📏</span>
            <span className="feature-text">{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="property-actions">
          <button className="btn-favorite">❤️</button>
          <Link to={`/property/${property.id}`} className="btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;