// src/pages/AgentDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropertiesService from '../services/propertyService';
import BookingService from '../services/BookingService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './AgentDashboard.css';


const AgentDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    monthlyEarnings: 0
  });
  const [recentProperties, setRecentProperties] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getUser } = useAuth();

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = () => {
    const userData = getUser();
    if (!userData || userData.role !== 'agent') {
      navigate('/dashboard');
      return;
    }
    setUser(userData);
  };

  const loadDashboardData = async () => {
    try {
      const properties = await PropertiesService.getUserProperties();
      const bookings = await BookingService.getAgentBookings();
      
      const monthlyEarnings = bookings
        .filter(b => b.status === 'confirmed' && new Date(b.date).getMonth() === new Date().getMonth())
        .reduce((sum, booking) => sum + (booking.commission || 0), 0);

      setStats({
        totalProperties: properties.length,
        activeListings: properties.filter(p => p.status === 'active').length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        totalRevenue: bookings.reduce((sum, booking) => sum + (booking.commission || 0), 0),
        monthlyEarnings
      });

      setRecentProperties(properties.slice(0, 3));
      setPendingBookings(bookings.filter(b => b.status === 'pending').slice(0, 5));
    } catch (error) {
      console.error('Agent dashboard data error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agent dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Agent Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name}! Manage your properties and bookings.
            </p>
          </div>

          {/* Agent Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                  <span className="text-2xl">⏳</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.monthlyEarnings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Bookings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Bookings</h2>
                <div className="space-y-4">
                  {pendingBookings.length > 0 ? (
                    pendingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{booking.propertyTitle}</p>
                          <p className="text-sm text-gray-600">{booking.date} • {booking.time}</p>
                          <p className="text-sm text-gray-500">By: {booking.clientName}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">Approve</button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Reject</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No pending bookings</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Properties</h2>
                <div className="space-y-4">
                  {recentProperties.length > 0 ? (
                    recentProperties.map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{property.title}</p>
                          <p className="text-sm text-gray-600">{property.price}</p>
                          <span className={`px-2 py-1 rounded text-xs ${
                            property.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                        <button 
                          onClick={() => navigate(`/properties/${property.id}`)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        >
                          View
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No properties listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => navigate('/properties/new')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 text-left"
                >
                  <span className="font-medium text-gray-900">➕ Add New Property</span>
                  <p className="text-sm text-gray-600 mt-1">List a new property</p>
                </button>

                <button 
                  onClick={() => navigate('/agent/bookings')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 text-left"
                >
                  <span className="font-medium text-gray-900">📋 Manage Bookings</span>
                  <p className="text-sm text-gray-600 mt-1">View all bookings</p>
                </button>

                <button 
                  onClick={() => navigate('/agent/analytics')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 text-left"
                >
                  <span className="font-medium text-gray-900">📊 View Analytics</span>
                  <p className="text-sm text-gray-600 mt-1">Performance insights</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgentDashboard;