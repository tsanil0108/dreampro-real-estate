import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
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
import AdminDashboard from './pages/AdminDashboard';
import CreateAgentAccount from './pages/CreateAgentAccount';
import MyProperties from './pages/MyProperties';
import SavedProperties from './pages/SavedProperties';
import AdminPanel from './pages/AdminPenel';
import { InteriorPage } from './pages/Interior';
import User from './pages/User';
import MyAccount from './pages/MyAccount';
import ApiTester from './services/ApiTester';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />

              {/* Authentication Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />

              {/* Properties Page */}
              <Route path="/properties" element={<Properties />} />

              {/* Contact Agent Page */}
              <Route path="/contactagent" element={<ContactAgentPage />} />

              {/* Book Visit Page */}
              <Route path="/BookVisitt" element={<BookVisitt />} />

              {/* Blog Page */}
              <Route path="/Blogg" element={<Blogg />} />

              {/* Contact Page */}
              <Route path="/contact" element={<Contact />} />

              {/* About Page */}
              <Route path="/about" element={<About />} />

              {/* Dashboard Pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* User Properties */}
              <Route path="/my-properties" element={<MyProperties />} />
              <Route path="/saved" element={<SavedProperties />} />

              {/* Admin Panel */}
              <Route path="/Admin" element={<AdminPanel />} />

              {/* Create Agent Account - ADD THIS ROUTE */}
              <Route path="/create-agent-account" element={<CreateAgentAccount />} />
              <Route path="/agent/signup" element={<CreateAgentAccount />} />

              <Route path="/interior" element={<InteriorPage />} />

              <Route path="/user" element={<User />} />

              <Route path="/my-account" element={<MyAccount />} />

              {/* API Tester Route - ADDED HERE */}
              <Route path="/api-tester" element={<ApiTester />} />
              <Route path="/debug" element={<ApiTester />} />
              <Route path="/test-api" element={<ApiTester />} />

              {/* Additional Routes for Better Navigation */}
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
      </Router>
    </AuthProvider>
  );
}

export default App;