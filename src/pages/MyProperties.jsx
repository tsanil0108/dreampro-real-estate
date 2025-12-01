// src/pages/MyProperties.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PropertiesService from '../services/propertyService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MyProperties.css';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    loadMyProperties();
  }, []);

  const loadMyProperties = async () => {
    try {
      let userProperties = [];
      
      if (user?.role === 'agent') {
        userProperties = await PropertiesService.getUserProperties();
      } else {
        // For regular users, show saved properties
        userProperties = await PropertiesService.getSavedProperties();
      }
      
      setProperties(userProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true;
    if (filter === 'active') return property.status === 'active';
    if (filter === 'sold') return property.status === 'sold';
    if (filter === 'pending') return property.status === 'pending';
    return true;
  });

  if (loading) {
    return (
      <div className="my-properties-container">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading properties...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="my-properties-container">
      <Navbar />
      
      <main className="my-properties-main">
        <div className="container">
          <div className="my-properties-header">
            <h1>My Properties</h1>
            <p>Manage your {user?.role === 'agent' ? 'listed' : 'saved'} properties</p>
          </div>

          {/* Filters */}
          <div className="properties-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({properties.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${filter === 'sold' ? 'active' : ''}`}
              onClick={() => setFilter('sold')}
            >
              Sold
            </button>
          </div>

          {/* Properties Grid */}
          <div className="properties-grid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
                <div key={property.id} className="property-card">
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                    <div className="property-status">
                      <span className={`status-badge status-${property.status}`}>
                        {property.status}
                      </span>
                    </div>
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

                    <div className="property-actions">
                      <button className="btn-view">View Details</button>
                      {user?.role === 'agent' && (
                        <button className="btn-edit">Edit</button>
                      )}
                      <button className="btn-remove">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>No properties found</h3>
                <p>
                  {user?.role === 'agent' 
                    ? "You haven't listed any properties yet."
                    : "You haven't saved any properties yet."
                  }
                </p>
                <button className="btn-primary">
                  {user?.role === 'agent' ? 'Add New Property' : 'Browse Properties'}
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

export default MyProperties;