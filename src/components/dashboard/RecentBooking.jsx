// src/Components/dashboard/RecentBookings.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingService from '../../services/BookingService';

import './RecentBooking.css';

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentBookings();
  }, []);

  const loadRecentBookings = async () => {
    try {
      const allBookings = await BookingService.getUserBookings();
      const recent = allBookings.slice(0, 5); // Get latest 5 bookings
      setBookings(recent);
    } catch (error) {
      console.error('Error loading bookings:', error);
      // Sample data
      setBookings([
        {
          id: 1,
          propertyTitle: "Luxury Villa with Pool",
          propertyId: 101,
          date: "2024-01-20",
          time: "14:00",
          status: "confirmed",
          price: 2500000
        },
        {
          id: 2,
          propertyTitle: "Modern Downtown Apartment",
          propertyId: 102,
          date: "2024-01-22",
          time: "11:00",
          status: "pending",
          price: 750000
        },
        {
          id: 3,
          propertyTitle: "Suburban Family Home",
          propertyId: 103,
          date: "2024-01-18",
          time: "15:30",
          status: "confirmed",
          price: 450000
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
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
          <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
          <Link 
            to="/book-visiting" 
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="space-y-3">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {booking.propertyTitle}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600">
                      {formatDate(booking.date)} at {booking.time}
                    </span>
                    {booking.price && (
                      <span className="text-sm font-medium text-gray-900">
                        ${booking.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">📅</div>
              <p className="text-gray-500 mb-4">No bookings yet</p>
              <Link 
                to="/book-visiting" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Schedule Your First Visit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;