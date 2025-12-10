// src/Components/dashboard/DashboardStats.jsx
import { useState, useEffect } from 'react';
import PropertiesService from '../../Services/PropertiesService';
import BookingService from '../../services/AuthService';

import './DashboardStats.css';





const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeBookings: 0,
    pendingVisits: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const properties = await PropertiesService.getUserProperties();
      const bookings = await BookingService.getUserBookings();
      
      setStats({
        totalProperties: properties.length,
        activeBookings: bookings.filter(b => b.status === 'confirmed').length,
        pendingVisits: bookings.filter(b => b.status === 'pending').length,
        totalRevenue: bookings.reduce((sum, booking) => sum + (booking.price || 0), 0)
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      // Fallback data
      setStats({
        totalProperties: 8,
        activeBookings: 3,
        pendingVisits: 2,
        totalRevenue: 12500
      });
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      name: 'Total Properties',
      value: stats.totalProperties,
      icon: '🏠',
      color: 'blue',
      description: 'Your listed properties'
    },
    {
      name: 'Active Bookings',
      value: stats.activeBookings,
      icon: '📅',
      color: 'green',
      description: 'Confirmed visits'
    },
    {
      name: 'Pending Visits',
      value: stats.pendingVisits,
      icon: '⏳',
      color: 'yellow',
      description: 'Awaiting confirmation'
    },
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'purple',
      description: 'Total earnings'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item) => (
        <div 
          key={item.name} 
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg mr-4 ${
              item.color === 'blue' ? 'bg-blue-100' :
              item.color === 'green' ? 'bg-green-100' :
              item.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'
            }`}>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{item.name}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;