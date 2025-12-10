import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../../src/styles/sidebar.css';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const Sidebar = ({ isOpen, toggleSidebar, activeModule }) => {
  const navigate = useNavigate();

  const realEstateMenu = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/properties', label: 'Properties', icon: '🏢' },
    { path: '/admin/properties/add', label: 'Add Property', icon: '➕' },
    { path: '/admin/bookings', label: 'Property Bookings', icon: '📅' },
    { path: '/admin/reviews', label: 'Property Reviews', icon: '💬' },
    { path: '/admin/locations', label: 'Locations', icon: '📍' },
    { path: '/admin/agents', label: 'Agents', icon: '👤' },
    { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const interiorWorkMenu = [
    { path: '/admin/interior/dashboard', label: 'Interior Dashboard', icon: '📊' },
    { path: '/admin/interior/projects', label: 'Projects', icon: '📋' },
    { path: '/admin/interior/projects/add', label: 'New Project', icon: '➕' },
    { path: '/admin/interior/categories', label: 'Categories', icon: '📂' },
    { path: '/admin/interior/furniture', label: 'Furniture', icon: '🪑' },
    { path: '/admin/interior/materials', label: 'Materials', icon: '📦' },
    { path: '/admin/interior/designs', label: 'Design Gallery', icon: '🎨' },
    { path: '/admin/interior/teams', label: 'Design Teams', icon: '👥' },
    { path: '/admin/interior/bookings', label: 'Consultations', icon: '📅' },
    { path: '/admin/interior/warehouse', label: 'Warehouse', icon: '🏭' },
    { path: '/admin/interior/tools', label: 'Tools', icon: '🔧' },
    { path: '/admin/interior/settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const menuItems = activeModule === 'real-estate' ? realEstateMenu : interiorWorkMenu;

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'} ${activeModule}`}>
      <div className="sidebar-header">
        <h3 className="brand">
          {activeModule === 'real-estate' ? (
            <Icon className="brand-icon">🏠</Icon>
          ) : (
            <Icon className="brand-icon">🎨</Icon>
          )}
          {isOpen && <span>{activeModule === 'real-estate' ? 'Real Estate' : 'Interior Work'} Admin</span>}
        </h3>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      
      <div className="module-badge">
        <span className={`badge ${activeModule}`}>
          {activeModule === 'real-estate' ? '🏢 Real Estate' : '🎨 Interior Work'}
        </span>
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `menu-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon className="menu-icon">{item.icon}</Icon>
            {isOpen && <span className="menu-label">{item.label}</span>}
          </NavLink>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <Icon className="logout-icon">🚪</Icon>
          {isOpen && <span>Logout</span>}
        </button>
      </div>

      <style jsx>{`
        .admin-sidebar {
          background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%);
          color: white;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .admin-sidebar.open {
          width: 250px;
        }
        
        .admin-sidebar.closed {
          width: 70px;
        }
        
        .admin-sidebar.real-estate {
          border-right: 4px solid #007bff;
        }
        
        .admin-sidebar.interior-work {
          border-right: 4px solid #28a745;
        }
        
        .sidebar-header {
          padding: 20px 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          font-size: 1.1rem;
          color: white;
        }
        
        .brand-icon {
          font-size: 1.5rem;
          min-width: 24px;
        }
        
        .sidebar-toggle {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        
        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .module-badge {
          padding: 10px 15px;
          text-align: center;
        }
        
        .badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .badge.real-estate {
          background: #007bff;
          color: white;
        }
        
        .badge.interior-work {
          background: #28a745;
          color: white;
        }
        
        .sidebar-menu {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 20px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s;
          border-left: 3px solid transparent;
        }
        
        .menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-left: 3px solid #007bff;
        }
        
        .menu-item.active {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-left: 3px solid #007bff;
        }
        
        .menu-icon {
          font-size: 1.2rem;
          min-width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .menu-label {
          font-size: 0.9rem;
          white-space: nowrap;
        }
        
        .sidebar-footer {
          padding: 20px 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 15px;
          width: 100%;
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          color: white;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }
        
        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .logout-icon {
          font-size: 1.2rem;
          min-width: 24px;
        }
        
        /* Scrollbar styling */
        .sidebar-menu::-webkit-scrollbar {
          width: 5px;
        }
        
        .sidebar-menu::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-menu::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        .sidebar-menu::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        
        @media (max-width: 768px) {
          .admin-sidebar.closed {
            width: 0;
            overflow: hidden;
          }
          
          .admin-sidebar.open {
            width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;