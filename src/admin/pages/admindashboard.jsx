import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaBuilding, FaCalendarAlt, FaDollarSign, 
  FaChartLine, FaStar, FaArrowUp, FaArrowDown,
  FaHome, FaPaintRoller, FaClipboardCheck, FaChair,
  FaPalette, FaTools, FaWarehouse, FaChartBar,
  FaCog, FaBell, FaSearch, FaFilter, FaDownload,
  FaEye, FaEdit, FaTrash, FaPlus, FaCheckCircle,
  FaExclamationTriangle, FaSync, FaUserCheck, FaUser,
  FaShieldAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import adminService from '../services/AdminService'; // Updated import
import StatsCard from '../components/StatsCard';
import '../../styles/admin-dashboard.css';

const adminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [stats, setStats] = useState({
    realEstate: {
      totalProperties: 0,
      activeListings: 0,
      totalBookings: 0,
      pendingBookings: 0,
      totalRevenue: 0,
      avgRating: 0,
      newProperties: 0,
      soldProperties: 0
    },
    interior: {
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      pendingConsultations: 0,
      totalRevenue: 0,
      teamMembers: 0,
      furnitureItems: 0,
      designTemplates: 0
    },
    users: {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      totalAgents: 0,
      pendingVerifications: 0
    }
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    setCurrentAdmin(adminService.getCurrentAdmin());
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats using adminService
      const dashboardStats = await adminService.getDashboardStats();
      
      // Fetch all users for user stats
      const allUsers = await adminService.getAllUsers();
      const agents = allUsers.filter(user => user.role === 'AGENT' || user.userType === 'AGENT');
      
      // Fetch all properties for real estate stats
      const allProperties = await adminService.getAllProperties();
      const activeProperties = allProperties.filter(prop => prop.status === 'ACTIVE' || prop.status === 'AVAILABLE');
      
      // Fetch all bookings
      const allBookings = await adminService.getAllBookings();
      const pendingBookings = allBookings.filter(booking => 
        booking.status === 'PENDING' || booking.status === 'CONFIRMED'
      );
      
      // Calculate user stats
      const userStats = {
        totalUsers: allUsers.length,
        activeUsers: allUsers.filter(u => u.status === 'ACTIVE').length,
        newUsers: allUsers.filter(u => {
          const userDate = new Date(u.createdAt || u.registrationDate);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return userDate > weekAgo;
        }).length,
        totalAgents: agents.length,
        pendingVerifications: allUsers.filter(u => u.status === 'PENDING').length
      };
      
      // Calculate real estate stats
      const realEstateStats = {
        totalProperties: allProperties.length,
        activeListings: activeProperties.length,
        totalBookings: allBookings.length,
        pendingBookings: pendingBookings.length,
        totalRevenue: allBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0),
        avgRating: allProperties.length > 0 
          ? allProperties.reduce((sum, prop) => sum + (prop.rating || 0), 0) / allProperties.length 
          : 0,
        newProperties: allProperties.filter(prop => {
          const propDate = new Date(prop.createdAt || prop.listingDate);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return propDate > weekAgo;
        }).length,
        soldProperties: allProperties.filter(prop => prop.status === 'SOLD').length
      };
      
      // Set the stats
      setStats({
        realEstate: realEstateStats,
        interior: dashboardStats.interior || stats.interior, // Use your actual interior endpoints
        users: userStats
      });
      
      // Fetch recent activity (you might need to implement this endpoint)
      try {
        const activity = await adminService.getRecentActivities();
        setRecentActivity(activity || []);
      } catch (error) {
        console.log('Recent activities not available:', error);
        setRecentActivity(getMockActivities());
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    setStats({
      realEstate: {
        totalProperties: 356,
        activeListings: 287,
        totalBookings: 189,
        pendingBookings: 24,
        totalRevenue: 1250000,
        avgRating: 4.7,
        newProperties: 42,
        soldProperties: 18
      },
      interior: {
        totalProjects: 128,
        activeProjects: 45,
        completedProjects: 72,
        pendingConsultations: 15,
        totalRevenue: 850000,
        teamMembers: 12,
        furnitureItems: 245,
        designTemplates: 89
      },
      users: {
        totalUsers: 1245,
        activeUsers: 987,
        newUsers: 42,
        totalAgents: 56,
        pendingVerifications: 8
      }
    });

    setRecentActivity(getMockActivities());
    
    setAlerts([
      { id: 1, type: 'warning', message: '3 properties pending approval', time: '1 hour ago' },
      { id: 2, type: 'info', message: 'System maintenance scheduled', time: '2 hours ago' },
      { id: 3, type: 'success', message: 'Backup completed successfully', time: '3 hours ago' }
    ]);

    setPerformanceData({
      revenue: [12000, 19000, 15000, 28000, 22000, 32000, 40000],
      users: [450, 520, 480, 510, 490, 550, 600],
      projects: [12, 15, 10, 18, 14, 20, 22],
      bookings: [25, 30, 22, 35, 28, 40, 45]
    });
  };

  const getMockActivities = () => [
    { id: 1, type: 'property_added', title: 'Luxury Villa Added', time: '2 hours ago', user: 'Admin' },
    { id: 2, type: 'booking_confirmed', title: 'Booking Confirmed', time: '4 hours ago', user: 'John Doe' },
    { id: 3, type: 'property_sold', title: 'Property Sold', time: '1 day ago', user: 'Jane Smith' },
    { id: 4, type: 'project_started', title: 'Modern Apartment Project', time: '1 day ago', user: 'Design Team' },
    { id: 5, type: 'user_registered', title: 'New User Registered', time: '2 hours ago', user: 'newuser@example.com' }
  ];

  const realEstateStats = [
    {
      title: 'Total Properties',
      value: stats.realEstate.totalProperties,
      change: '+8.3%',
      trend: 'up',
      icon: <FaBuilding />,
      color: '#4e73df',
      link: '/admin/properties'
    },
    {
      title: 'Active Listings',
      value: stats.realEstate.activeListings,
      change: '+5.4%',
      trend: 'up',
      icon: <FaHome />,
      color: '#1cc88a',
      link: '/admin/properties?status=active'
    },
    {
      title: 'Total Bookings',
      value: stats.realEstate.totalBookings,
      change: '+12.5%',
      trend: 'up',
      icon: <FaCalendarAlt />,
      color: '#36b9cc',
      link: '/admin/bookings'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.realEstate.totalRevenue.toLocaleString()}`,
      change: '+15.7%',
      trend: 'up',
      icon: <FaDollarSign />,
      color: '#f6c23e',
      link: '/admin/revenue'
    }
  ];

  const interiorStats = [
    {
      title: 'Total Projects',
      value: stats.interior.totalProjects,
      change: '+12.8%',
      trend: 'up',
      icon: <FaClipboardCheck />,
      color: '#6f42c1',
      link: '/admin/interior/projects'
    },
    {
      title: 'Active Projects',
      value: stats.interior.activeProjects,
      change: '+8.3%',
      trend: 'up',
      icon: <FaPaintRoller />,
      color: '#e74a3b',
      link: '/admin/interior/projects?status=active'
    },
    {
      title: 'Completed Projects',
      value: stats.interior.completedProjects,
      change: '+22.7%',
      trend: 'up',
      icon: <FaCheckCircle />,
      color: '#20c9a6',
      link: '/admin/interior/projects?status=completed'
    },
    {
      title: 'Interior Revenue',
      value: `$${stats.interior.totalRevenue.toLocaleString()}`,
      change: '+18.5%',
      trend: 'up',
      icon: <FaDollarSign />,
      color: '#fd7e14',
      link: '/admin/interior/revenue'
    }
  ];

  const userStats = [
    {
      title: 'Total Users',
      value: stats.users.totalUsers,
      change: '+6.2%',
      trend: 'up',
      icon: <FaUsers />,
      color: '#4e73df',
      link: '/admin/users'
    },
    {
      title: 'Active Users',
      value: stats.users.activeUsers,
      change: '+3.4%',
      trend: 'up',
      icon: <FaUserCheck />,
      color: '#1cc88a',
      link: '/admin/users?status=active'
    },
    {
      title: 'Total Agents',
      value: stats.users.totalAgents,
      change: '+5.1%',
      trend: 'up',
      icon: <FaUsers />,
      color: '#36b9cc',
      link: '/admin/agents'
    },
    {
      title: 'New Users (7d)',
      value: stats.users.newUsers,
      change: '+8.9%',
      trend: 'up',
      icon: <FaChartLine />,
      color: '#f6c23e',
      link: '/admin/users?filter=new'
    }
  ];

  const handleRefresh = async () => {
    await fetchDashboardData();
  };

  const handleExport = async (type) => {
    try {
      const data = await adminService.exportData(type);
      
      // Create download link
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert(`${type} data exported successfully!`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const getActivityIcon = (type) => {
    const icons = {
      'property_added': <FaBuilding className="text-primary" />,
      'booking_confirmed': <FaCalendarAlt className="text-success" />,
      'property_sold': <FaDollarSign className="text-warning" />,
      'project_started': <FaPaintRoller className="text-info" />,
      'consultation_scheduled': <FaClipboardCheck className="text-primary" />,
      'design_approved': <FaPalette className="text-success" />,
      'user_registered': <FaUsers className="text-info" />,
      'agent_verified': <FaUserCheck className="text-success" />,
      'profile_updated': <FaUser className="text-warning" />,
      'system_update': <FaCog className="text-secondary" />,
      'backup_completed': <FaSync className="text-success" />,
      'security_scan': <FaShieldAlt className="text-danger" />
    };
    return icons[type] || <FaBell className="text-muted" />;
  };

  const getAlertClass = (type) => {
    const classes = {
      'warning': 'alert-warning',
      'info': 'alert-info',
      'success': 'alert-success',
      'danger': 'alert-danger'
    };
    return classes[type] || 'alert-secondary';
  };

  const handleLogout = () => {
    adminService.logout();
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>
            <FaChartLine className="me-2" />
            Admin Dashboard
          </h1>
          <div className="dashboard-subtitle">
            <span className="badge bg-primary me-2">Real Estate</span>
            <span className="badge bg-success">Interior Work</span>
            <span className="text-muted ms-3">
              Welcome, {currentAdmin?.name || currentAdmin?.email || 'Admin'}!
            </span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="time-range-selector">
            <select 
              className="form-select" 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <button className="btn btn-outline-primary" onClick={handleRefresh}>
            <FaSync className="me-2" />
            Refresh
          </button>
          
          <button className="btn btn-outline-success" onClick={() => handleExport('all')}>
            <FaDownload className="me-2" />
            Export
          </button>

          <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Module Tabs */}
      <div className="module-tabs">
        <button 
          className={`module-tab ${activeModule === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveModule('overview')}
        >
          <FaChartBar className="me-2" />
          Overview
        </button>
        <button 
          className={`module-tab ${activeModule === 'real-estate' ? 'active' : ''}`}
          onClick={() => setActiveModule('real-estate')}
        >
          <FaBuilding className="me-2" />
          Real Estate
        </button>
        <button 
          className={`module-tab ${activeModule === 'interior' ? 'active' : ''}`}
          onClick={() => setActiveModule('interior')}
        >
          <FaPaintRoller className="me-2" />
          Interior Work
        </button>
        <button 
          className={`module-tab ${activeModule === 'users' ? 'active' : ''}`}
          onClick={() => setActiveModule('users')}
        >
          <FaUsers className="me-2" />
          Users
        </button>
        <button 
          className={`module-tab ${activeModule === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveModule('analytics')}
        >
          <FaChartLine className="me-2" />
          Analytics
        </button>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="alerts-section">
          <h5>
            <FaBell className="me-2" />
            System Alerts
          </h5>
          <div className="alerts-container">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert ${getAlertClass(alert.type)} alert-dismissible`}>
                <div className="alert-content">
                  <strong>{alert.type.toUpperCase()}:</strong> {alert.message}
                  <small className="d-block mt-1">{alert.time}</small>
                </div>
                <button type="button" className="btn-close" onClick={() => 
                  setAlerts(alerts.filter(a => a.id !== alert.id))
                }></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview Module */}
      {activeModule === 'overview' && (
        <div className="overview-module">
          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="quick-stat-card total">
                  <div className="stat-icon">
                    <FaBuilding />
                    <FaPaintRoller />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.realEstate.totalProperties + stats.interior.totalProjects}</h3>
                    <p>Total Listings & Projects</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="quick-stat-card revenue">
                  <div className="stat-icon">
                    <FaDollarSign />
                  </div>
                  <div className="stat-content">
                    <h3>${(stats.realEstate.totalRevenue + stats.interior.totalRevenue).toLocaleString()}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="quick-stat-card users">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.users.totalUsers}</h3>
                    <p>Total Users</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="quick-stat-card activity">
                  <div className="stat-icon">
                    <FaChartLine />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.users.activeUsers}</h3>
                    <p>Active Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="stats-grid">
            <div className="stats-section">
              <h4>
                <FaBuilding className="me-2" />
                Real Estate Statistics
              </h4>
              <div className="row">
                {realEstateStats.map((stat, index) => (
                  <div key={index} className="col-xl-3 col-lg-6 mb-4">
                    <StatsCard {...stat} />
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-section">
              <h4>
                <FaPaintRoller className="me-2" />
                Interior Work Statistics
              </h4>
              <div className="row">
                {interiorStats.map((stat, index) => (
                  <div key={index} className="col-xl-3 col-lg-6 mb-4">
                    <StatsCard {...stat} />
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-section">
              <h4>
                <FaUsers className="me-2" />
                User Statistics
              </h4>
              <div className="row">
                {userStats.map((stat, index) => (
                  <div key={index} className="col-xl-3 col-lg-6 mb-4">
                    <StatsCard {...stat} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="activity-section">
            <h4>
              <FaBell className="me-2" />
              Recent Activity
            </h4>
            <div className="activity-card">
              <div className="card-body">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-meta">
                        <span>{activity.user}</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h4>
              <FaCog className="me-2" />
              Quick Actions
            </h4>
            <div className="actions-grid">
              <Link to="/admin/properties/add" className="action-card">
                <div className="action-icon">
                  <FaPlus />
                </div>
                <div className="action-content">
                  <h6>Add New Property</h6>
                  <p>List a new property for sale or rent</p>
                </div>
              </Link>
              
              <Link to="/admin/interior/projects/add" className="action-card">
                <div className="action-icon">
                  <FaClipboardCheck />
                </div>
                <div className="action-content">
                  <h6>Start New Project</h6>
                  <p>Create a new interior design project</p>
                </div>
              </Link>
              
              <Link to="/admin/users/add" className="action-card">
                <div className="action-icon">
                  <FaUserCheck />
                </div>
                <div className="action-content">
                  <h6>Add New User</h6>
                  <p>Register a new user or agent</p>
                </div>
              </Link>
              
              <Link to="/admin/reports" className="action-card">
                <div className="action-icon">
                  <FaChartBar />
                </div>
                <div className="action-content">
                  <h6>Generate Report</h6>
                  <p>Create detailed analytics reports</p>
                </div>
              </Link>
              
              <Link to="/admin/settings" className="action-card">
                <div className="action-icon">
                  <FaCog />
                </div>
                <div className="action-content">
                  <h6>System Settings</h6>
                  <p>Configure system preferences</p>
                </div>
              </Link>
              
              <Link to="/admin/support" className="action-card">
                <div className="action-icon">
                  <FaTools />
                </div>
                <div className="action-content">
                  <h6>Support Center</h6>
                  <p>Get help and support</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Real Estate Module */}
      {activeModule === 'real-estate' && (
        <div className="real-estate-module">
          <div className="module-header">
            <h2>
              <FaBuilding className="me-2" />
              Real Estate Management
            </h2>
            <div className="module-actions">
              <Link to="/admin/properties/add" className="btn btn-primary">
                <FaPlus className="me-2" />
                Add Property
              </Link>
              <Link to="/admin/properties" className="btn btn-outline-secondary">
                <FaEye className="me-2" />
                View All
              </Link>
            </div>
          </div>

          <div className="detailed-stats">
            <div className="row">
              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-value">{stats.realEstate.newProperties}</div>
                  <div className="stat-label">New Properties (7d)</div>
                  <div className="stat-change positive">
                    <FaArrowUp className="me-1" />
                    +12.5%
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-value">{stats.realEstate.soldProperties}</div>
                  <div className="stat-label">Sold Properties (7d)</div>
                  <div className="stat-change positive">
                    <FaArrowUp className="me-1" />
                    +8.3%
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-value">{stats.realEstate.pendingBookings}</div>
                  <div className="stat-label">Pending Bookings</div>
                  <div className="stat-change negative">
                    <FaArrowDown className="me-1" />
                    -2.1%
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-value">{stats.realEstate.avgRating.toFixed(1)}</div>
                  <div className="stat-label">Average Rating</div>
                  <div className="stat-change positive">
                    <FaArrowUp className="me-1" />
                    +0.8%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real Estate Management Content */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Quick Property Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/admin/properties/pending" className="btn btn-warning">
                      Review Pending Properties
                    </Link>
                    <Link to="/admin/properties/featured" className="btn btn-info">
                      Manage Featured Listings
                    </Link>
                    <button className="btn btn-success" onClick={() => handleExport('properties')}>
                      Export Property Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Booking Management</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/admin/bookings/pending" className="btn btn-warning">
                      Pending Bookings ({stats.realEstate.pendingBookings})
                    </Link>
                    <Link to="/admin/bookings/today" className="btn btn-primary">
                      Today's Bookings
                    </Link>
                    <Link to="/admin/bookings/reports" className="btn btn-secondary">
                      Booking Reports
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Module */}
      {activeModule === 'users' && (
        <div className="users-module">
          <div className="module-header">
            <h2>
              <FaUsers className="me-2" />
              User Management
            </h2>
            <div className="module-actions">
              <Link to="/admin/users/add" className="btn btn-primary">
                <FaPlus className="me-2" />
                Add User
              </Link>
              <Link to="/admin/users" className="btn btn-outline-secondary">
                <FaEye className="me-2" />
                View All
              </Link>
            </div>
          </div>

          <div className="detailed-stats">
            <div className="row">
              <div className="col-md-4">
                <div className="stat-box">
                  <div className="stat-value">{stats.users.pendingVerifications}</div>
                  <div className="stat-label">Pending Verifications</div>
                  <div className="stat-change warning">
                    <FaExclamationTriangle className="me-1" />
                    Needs Attention
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="stat-box">
                  <div className="stat-value">{Math.round((stats.users.activeUsers / stats.users.totalUsers) * 100)}%</div>
                  <div className="stat-label">Active Rate</div>
                  <div className="stat-change positive">
                    <FaArrowUp className="me-1" />
                    +4.2%
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="stat-box">
                  <div className="stat-value">{stats.users.totalAgents}</div>
                  <div className="stat-label">Total Agents</div>
                  <div className="stat-change positive">
                    <FaArrowUp className="me-1" />
                    +5.1%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Management Content */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>User Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/admin/users/pending" className="btn btn-warning">
                      Pending Verifications ({stats.users.pendingVerifications})
                    </Link>
                    <Link to="/admin/users/agents" className="btn btn-info">
                      Manage Agents ({stats.users.totalAgents})
                    </Link>
                    <button className="btn btn-success" onClick={() => handleExport('users')}>
                      Export User Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>User Analytics</h5>
                </div>
                <div className="card-body">
                  <p>Total Users: <strong>{stats.users.totalUsers}</strong></p>
                  <p>Active Users: <strong>{stats.users.activeUsers}</strong></p>
                  <p>New Users (7d): <strong>{stats.users.newUsers}</strong></p>
                  <p>Active Rate: <strong>{Math.round((stats.users.activeUsers / stats.users.totalUsers) * 100)}%</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Status Footer */}
      <div className="system-status mt-4">
        <div className="status-item">
          <span className="status-indicator online"></span>
          <span>System Status: <strong>Online</strong></span>
        </div>
        <div className="status-item">
          <span className="status-indicator fast"></span>
          <span>Response Time: <strong>85ms</strong></span>
        </div>
        <div className="status-item">
          <span className="status-indicator secure"></span>
          <span>Security: <strong>Protected</strong></span>
        </div>
        <div className="status-item">
          <span>Last Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default adminDashboard;