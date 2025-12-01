// src/Components/dashboard/PropertyOverview.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertiesService from '../../Services/PropertiesService';

import './PropertyOverview.css';

const PropertyOverview = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const userProperties = await PropertiesService.getUserProperties();
      setProperties(userProperties.slice(0, 4)); // Show latest 4 properties
    } catch (error) {
      console.error('Error loading properties:', error);
      // Sample data
      setProperties([
        {
          id: 1,
          title: "Luxury Villa with Pool",
          address: "456 Ocean Drive, Miami, FL",
          price: 2500000,
          type: "villa",
          bedrooms: 5,
          bathrooms: 4,
          area: 3500,
          status: "available",
          image: "/api/placeholder/300/200"
        },
        {
          id: 2,
          title: "Modern Downtown Apartment",
          address: "123 Main St, New York, NY",
          price: 750000,
          type: "apartment",
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          status: "sold",
          image: "/api/placeholder/300/200"
        },
        {
          id: 3,
          title: "Suburban Family Home",
          address: "789 Pine Rd, Austin, TX",
          price: 450000,
          type: "house",
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          status: "available",
          image: "/api/placeholder/300/200"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'house':
        return '🏡';
      case 'apartment':
        return '🏢';
      case 'villa':
        return '🏰';
      case 'condo':
        return '🏘️';
      default:
        return '🏠';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Property Overview</h2>
          <Link 
            to="/properties" 
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div 
                key={property.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {getTypeIcon(property.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {property.address}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ${property.price.toLocaleString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                      <span>{property.bedrooms} bed</span>
                      <span>•</span>
                      <span>{property.bathrooms} bath</span>
                      <span>•</span>
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">🏠</div>
              <p className="text-gray-500 mb-4">No properties listed yet</p>
              <Link 
                to="/properties/add" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add Your First Property
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;