import React, { useState } from 'react';
import '../../../src/styles/navbar.css';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const AdminNavbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New user registered', time: '5 mins ago' },
    { id: 2, text: 'Property booking confirmed', time: '1 hour ago' },
    { id: 3, text: 'System update completed', time: '2 hours ago' },
  ]);

  const adminUser = JSON.parse(localStorage.getItem('adminUser')) || {};

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <form onSubmit={handleSearch} className="search-form">
          <Icon className="search-icon">🔍</Icon>
          <input
            type="text"
            placeholder="Search users, properties, bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </div>
      
      <div className="navbar-right">
        <div className="notification-dropdown">
          <button className="notification-btn">
            <Icon>🔔</Icon>
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
          <div className="notification-dropdown-content">
            <div className="notification-header">
              <h6>Notifications</h6>
              <span className="badge">{notifications.length} New</span>
            </div>
            <div className="notification-list">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <p>{notification.text}</p>
                    <small>{notification.time}</small>
                    <button 
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="mark-read-btn"
                    >
                      Mark as read
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-notifications">No new notifications</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="user-dropdown">
          <button className="user-btn">
            <Icon className="user-avatar">👤</Icon>
            <span className="user-name">{adminUser.name || 'Admin'}</span>
          </button>
          <div className="user-dropdown-content">
            <div className="user-info">
              <Icon className="dropdown-avatar">👤</Icon>
              <div>
                <strong>{adminUser.name || 'Administrator'}</strong>
                <small>{adminUser.email || 'admin@dreampro.com'}</small>
              </div>
            </div>
            <a href="/admin/profile" className="dropdown-item">Profile</a>
            <a href="/admin/settings" className="dropdown-item">Settings</a>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item logout-item" onClick={() => {
              localStorage.removeItem('adminToken');
              localStorage.removeItem('adminUser');
              window.location.href = '/admin/login';
            }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;