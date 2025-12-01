// src/pages/SavedProperties.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PropertiesService from '../services/propertyService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './SavedProperties.css';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedProperties();
  }, []);

  const loadSavedProperties = async () => {
    try {
      const properties = await PropertiesService.getSavedProperties();
      setSavedProperties(properties);
    } catch (error) {
      console.error('Error loading saved properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromSaved = async (propertyId) => {
    try {
      await PropertiesService.removeFromSaved(propertyId);
      setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
    } catch (error) {
      console.error('Error removing property:', error);
    }
  };

  if (loading) {
    return (
      <div className="saved-properties-container">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading saved properties...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="saved-properties-container">
      <Navbar />
      
      <main className="saved-properties-main">
        <div className="container">
          <div className="saved-properties-header">
            <h1>Saved Properties</h1>
            <p>Your favorite properties ({savedProperties.length})</p>
          </div>

          <div className="saved-properties-grid">
            {savedProperties.length > 0 ? (
              savedProperties.map(property => (
                <div key={property.id} className="saved-property-card">
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                    <button 
                      className="remove-saved-btn"
                      onClick={() => removeFromSaved(property.id)}
                      title="Remove from saved"
                    >
                      ❌
                    </button>
                  </div>
                  
                  <div className="property-content">
                    <h3 className="property-title">{property.title}</h3>
                    <p className="property-location">{property.location}</p>
                    <p className="property-price">${property.price.toLocaleString()}</p>
                    
                    <div className="property-details">
                      <span>🛏️ {property.bedrooms} beds</span>
                      <span>🚿 {property.bathrooms} baths</span>
                      <span>📏 {property.area} sqft</span>
                    </div>

                    <div className="property-features">
                      {property.features?.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>

                    <div className="property-actions">
                      <button className="btn-view">View Details</button>
                      <button className="btn-contact">Contact Agent</button>
                      <button className="btn-schedule">Schedule Visit</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">💖</div>
                <h3>No saved properties yet</h3>
                <p>Start browsing properties and save your favorites!</p>
                <button className="btn-primary" onClick={() => window.location.href = '/properties'}>
                  Browse Properties
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SavedProperties;