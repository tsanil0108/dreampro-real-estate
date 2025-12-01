// src/Pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import PropertiesService from '../services/propertyService'; // Fixed import path
import BookingService from '../services/BookingService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeBookings: 0,
    pendingVisits: 0,
    totalRevenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = () => {
    if (!AuthService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    const userData = AuthService.getUser();
    setUser(userData);
  };

  const loadDashboardData = async () => {
    try {
      // Load user properties
      const properties = await PropertiesService.getUserProperties();
      // Load user bookings
      const bookings = await BookingService.getUserBookings();
      
      setStats({
        totalProperties: properties.length,
        activeBookings: bookings.filter(b => b.status === 'confirmed').length,
        pendingVisits: bookings.filter(b => b.status === 'pending').length,
        totalRevenue: bookings.reduce((sum, booking) => sum + (booking.price || 0), 0)
      });

      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error('Dashboard data error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || user?.email}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's your real estate dashboard overview
            </p>
          </div>

          {/* Stats Grid */}
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
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                  <span className="text-2xl">⏳</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Visits</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingVisits}</p>
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

          {/* Recent Bookings & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                <div className="space-y-4">
                  {recentBookings.length > 0 ? (
                    recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{booking.propertyTitle}</p>
                          <p className="text-sm text-gray-600">{booking.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent bookings</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/properties')}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <span className="font-medium text-gray-900">Browse Properties</span>
                    <p className="text-sm text-gray-600 mt-1">Find your dream property</p>
                  </button>

                  <button 
                    onClick={() => navigate('/book-visiting')}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <span className="font-medium text-gray-900">Schedule Visit</span>
                    <p className="text-sm text-gray-600 mt-1">Book property viewing</p>
                  </button>

                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <span className="font-medium text-gray-900">Update Profile</span>
                    <p className="text-sm text-gray-600 mt-1">Manage your account</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;