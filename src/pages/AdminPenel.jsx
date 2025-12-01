// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import PropertiesService from '../services/propertyService';
import BookingService from '../services/BookingService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AdminPenel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
    pendingApprovals: 0
  });
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    loadAdminData();
  }, []);

  const checkAdminAccess = () => {
    if (!user || !isAdmin()) {
      navigate('/dashboard');
      return;
    }
  };

  const loadAdminData = async () => {
    try {
      const [usersData, propertiesData, bookingsData] = await Promise.all([
        UserService.getAllUsers(),
        PropertiesService.getAllProperties(),
        BookingService.getAllBookings()
      ]);

      const pendingProperties = propertiesData.filter(p => p.status === 'pending');

      setStats({
        totalUsers: usersData.length,
        totalProperties: propertiesData.length,
        totalBookings: bookingsData.length,
        pendingApprovals: pendingProperties.length
      });

      setUsers(usersData.slice(0, 10));
      setProperties(pendingProperties.slice(0, 10));
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveProperty = async (propertyId) => {
    try {
      await PropertiesService.updateProperty(propertyId, { status: 'active' });
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      setStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
    } catch (error) {
      console.error('Error approving property:', error);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await UserService.deleteUser(userId);
        setUsers(prev => prev.filter(u => u.id !== userId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-panel-container">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin panel...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <Navbar />
      
      <main className="admin-panel-main">
        <div className="container">
          <div className="admin-header">
            <h1>Admin Panel</h1>
            <p>Manage your real estate platform</p>
          </div>

          {/* Admin Tabs */}
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button
              className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Users
            </button>
            <button
              className={`admin-tab ${activeTab === 'properties' ? 'active' : ''}`}
              onClick={() => setActiveTab('properties')}
            >
              🏠 Properties
            </button>
            <button
              className={`admin-tab ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              ⏳ Approvals
            </button>
          </div>

          {/* Tab Content */}
          <div className="admin-content">
            {activeTab === 'overview' && (
              <div className="overview-grid">
                <div className="admin-stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.totalUsers}</div>
                    <div className="stat-label">Total Users</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">🏠</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.totalProperties}</div>
                    <div className="stat-label">Total Properties</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">📋</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.totalBookings}</div>
                    <div className="stat-label">Total Bookings</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <div className="stat-number">{stats.pendingApprovals}</div>
                    <div className="stat-label">Pending Approvals</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="users-table">
                <h3>Recent Users</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge role-${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="btn-view">View</button>
                          <button 
                            className="btn-delete"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'approvals' && (
              <div className="approvals-list">
                <h3>Properties Pending Approval</h3>
                {properties.length > 0 ? (
                  properties.map(property => (
                    <div key={property.id} className="approval-item">
                      <div className="approval-info">
                        <h4>{property.title}</h4>
                        <p>{property.location} • ${property.price.toLocaleString()}</p>
                        <p>Submitted by: {property.agentName}</p>
                      </div>
                      <div className="approval-actions">
                        <button 
                          className="btn-approve"
                          onClick={() => approveProperty(property.id)}
                        >
                          Approve
                        </button>
                        <button className="btn-reject">Reject</button>
                        <button className="btn-view">View</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No properties pending approval</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanel;