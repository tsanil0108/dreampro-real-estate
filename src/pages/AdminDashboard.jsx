// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropertiesService from '../services/propertyService';
import BookingService from '../services/BookingService';
import UserService from '../services/UserService'; // Changed from named to default import
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingApprovals: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getUser } = useAuth();

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = () => {
    const userData = getUser();
    if (!userData || userData.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    setUser(userData);
  };

  const loadDashboardData = async () => {
    try {
      const [users, properties, bookings] = await Promise.all([
        UserService.getAllUsers(),
        PropertiesService.getAllProperties(),
        BookingService.getAllBookings()
      ]);

      const pendingProperties = properties.filter(p => p.status === 'pending');
      
      setStats({
        totalUsers: users.length,
        totalProperties: properties.length,
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce((sum, booking) => sum + (booking.price || 0), 0),
        pendingApprovals: pendingProperties.length
      });

      setRecentUsers(users.slice(0, 5));
      setRecentProperties(pendingProperties.slice(0, 5));
    } catch (error) {
      console.error('Admin dashboard data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveProperty = async (propertyId) => {
    try {
      await PropertiesService.updateProperty(propertyId, { status: 'active' });
      loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error approving property:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name}! Manage the entire platform.
            </p>
          </div>

          {/* Admin Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
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
                <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Properties for Approval */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Properties Pending Approval</h2>
                <div className="space-y-4">
                  {recentProperties.length > 0 ? (
                    recentProperties.map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{property.title}</p>
                          <p className="text-sm text-gray-600">{property.price} • {property.location}</p>
                          <p className="text-sm text-gray-500">By: {property.agentName}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => approveProperty(property.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                          >
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Reject</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No properties pending approval</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Users</h2>
                <div className="space-y-4">
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'agent'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <button 
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        >
                          View
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No users</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Admin Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => navigate('/admin/users')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 text-left"
                >
                  <span className="font-medium text-gray-900">👥 Manage Users</span>
                  <p className="text-sm text-gray-600 mt-1">User management</p>
                </button>

                <button 
                  onClick={() => navigate('/admin/properties')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 text-left"
                >
                  <span className="font-medium text-gray-900">🏠 All Properties</span>
                  <p className="text-sm text-gray-600 mt-1">Property management</p>
                </button>

                <button 
                  onClick={() => navigate('/admin/bookings')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 text-left"
                >
                  <span className="font-medium text-gray-900">📋 All Bookings</span>
                  <p className="text-sm text-gray-600 mt-1">Booking management</p>
                </button>

                <button 
                  onClick={() => navigate('/admin/analytics')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200 text-left"
                >
                  <span className="font-medium text-gray-900">📊 Analytics</span>
                  <p className="text-sm text-gray-600 mt-1">Platform analytics</p>
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

export default AdminDashboard;