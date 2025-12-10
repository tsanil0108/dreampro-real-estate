import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AdminNavbar from './components/AdminNavbar';
import ModuleSelector from './components/ModuleSelector';
import '../../src/styles/admin.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('real-estate');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        activeModule={activeModule}
      />
      <div className={`admin-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <AdminNavbar 
          toggleSidebar={toggleSidebar}
          activeModule={activeModule}
        />
        <ModuleSelector 
          activeModule={activeModule}
          setActiveModule={setActiveModule}
        />
        <main className="admin-main">
          <div className="container-fluid py-4">
            <Outlet context={{ activeModule }} />
          </div>
        </main>
        <footer className="admin-footer">
          <div className="container-fluid">
            <p className="mb-0">
              © {new Date().getFullYear()} DreamPro {activeModule === 'real-estate' ? 'Real Estate' : 'Interior Work'} Admin. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;