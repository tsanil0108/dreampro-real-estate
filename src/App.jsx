import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

// Import Main App Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import ContactAgentPage from "./pages/ContactAgent";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Blogg from './pages/Blogg';
import BookVisitt from './pages/BookVisitt';
import Logout from './pages/Logout';
import Contact from './pages/Contact';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import AgentDashboard from './pages/AgentDashboard';
import CreateAgentAccount from './pages/CreateAgentAccount';
import MyProperties from './pages/MyProperties';
import SavedProperties from './pages/SavedProperties';
import AdminPanel from './pages/AdminPenel';
import { InteriorPage } from './pages/Interior';
import User from './pages/User';
import MyAccount from './pages/MyAccount';
import ApiTester from './services/ApiTester';
import PropertyViewInfo from './pages/PropertyViewInfo';

import ProjectComplete from './pages/Interior/ProjectComplete';
//import PropertyDetail from './pages/PropertyDetail';

// Import Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminUsers from './admin/pages/AdminUsers';
import AdminProperties from './admin/pages/AdminProperties';
import AdminProfile from './admin/pages/AdminProfile';
import AddProperty from './admin/pages/AddProperty';
import EditProperty from './admin/pages/EditProperty';
import InteriorDashboard from './admin/pages/InteriorDashboard';
import InteriorProjects from './admin/pages/InteriorProjects';
import AddInteriorProject from './admin/pages/AddInteriorProject';

<<<<<<< Updated upstream
=======
import WorkCategories from './pages/Interior/WorkCategories';


>>>>>>> Stashed changes
// Import Styles
import './App.css';
import './styles/admin.css';
import './styles/admin-login.css';
import './styles/admin-dashboard.css';
import './styles/admin-profile.css';
import './styles/property-form.css';
import './styles/sidebar.css';
import './styles/navbar.css';

// Protected Route Component for regular users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("dreampro_token");
  return token ? children : <Navigate to="/login" />;
};

// Admin Protected Route Component
const AdminProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('dreampro_user') || '{}');
  
  if (adminToken || user?.role === 'ADMIN') {
    return children;
  }
  
  return <Navigate to="/admin/login" />;
};

// Agent Protected Route Component
const AgentProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('dreampro_user') || '{}');
  
  if (user?.role === 'AGENT' || user?.role === 'ADMIN') {
    return children;
  }
  
  return <Navigate to="/login" />;
};

// Main Layout Component (for non-admin routes)
const MainLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contactagent" element={<ContactAgentPage />} />
          <Route path="/BookVisitt" element={<BookVisitt />} />
          <Route path="/Blogg" element={<Blogg />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/api-tester" element={<ApiTester />} />
          <Route path="/debug" element={<ApiTester />} />
          <Route path="/test-api" element={<ApiTester />} />

          {/* <Route path="/property/:id" element={<PropertyDetail />} /> */}

<<<<<<< Updated upstream
       <Route path="/property/:id" element={<PropertyViewInfo />} /> 
=======
       <Route path="/property/:id" element={<PropertyViewInfo />} />
       
         <Route path="/work-categories" element={<WorkCategories />} /> 
>>>>>>> Stashed changes


       <Route path="/project-complete" element={<ProjectComplete />} />  
          
          {/* Interior Routes */}
          <Route path="/interior" element={<InteriorPage />} />
          
          {/* Protected User Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/agent/dashboard" element={
            <AgentProtectedRoute>
              <AgentDashboard />
            </AgentProtectedRoute>
          } />
          <Route path="/create-agent-account" element={
            <ProtectedRoute>
              <CreateAgentAccount />
            </ProtectedRoute>
          } />
          <Route path="/agent/signup" element={
            <ProtectedRoute>
              <CreateAgentAccount />
            </ProtectedRoute>
          } />
          <Route path="/my-properties" element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          } />
          <Route path="/saved" element={
            <ProtectedRoute>
              <SavedProperties />
            </ProtectedRoute>
          } />
          <Route path="/user" element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />
          <Route path="/my-account" element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          } />
          
          {/* Admin Panel (legacy route - redirects to new admin) */}
          <Route path="/Admin" element={
            <AdminProtectedRoute>
              <AdminPanel />
            </AdminProtectedRoute>
          } />
          
          {/* Additional Public Routes */}
          <Route
            path="/buyers"
            element={
              <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '50vh' }}>
                <h1>For Buyers</h1>
                <p>Page coming soon - Explore our premium properties</p>
              </div>
            }
          />
          <Route
            path="/sellers"
            element={
              <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '50vh' }}>
                <h1>For Sellers</h1>
                <p>Page coming soon - List your property with us</p>
              </div>
            }
          />
          <Route
            path="/services"
            element={
              <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '50vh' }}>
                <h1>Our Services</h1>
                <p>Page coming soon - Discover our comprehensive real estate services</p>
              </div>
            }
          />
          
          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '50vh' }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" style={{ color: '#667eea', textDecoration: 'underline' }}>
                  Return to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      
        <Routes>
          {/* ===== ADMIN ROUTES ===== */}
          
          {/* Admin Login (public route) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Dashboard Routes (with layout) */}
          <Route path="/admin/*" element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="properties/add" element={<AddProperty />} />
            <Route path="properties/edit/:id" element={<EditProperty />} />
            <Route path="profile" element={<AdminProfile />} />
            
            {/* Interior Admin Routes */}
            <Route path="interior/dashboard" element={<InteriorDashboard />} />
            <Route path="interior/projects" element={<InteriorProjects />} />
            <Route path="interior/projects/add" element={<AddInteriorProject />} />
            <Route path="interior/projects/edit/:id" element={<AddInteriorProject />} />
            
            {/* Catch all admin routes */}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Route>

          {/* ===== MAIN APP ROUTES ===== */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;