import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from '../services/AdminService';
import '../../../src/styles/admin-profile.css';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const AdminProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    avatar: '',
    role: '',
    department: '',
    joinDate: '',
    lastLogin: '',
    status: 'active',
    permissions: [],
    notifications: true,
    emailAlerts: true,
    twoFactor: false,
    language: 'en',
    timezone: 'UTC',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const adminData = JSON.parse(localStorage.getItem('adminUser')) || {};
      
      // Mock data - replace with API call
      const mockProfile = {
        id: adminData.id || 1,
        name: adminData.name || 'Administrator',
        email: adminData.email || 'admin@dreampro.com',
        phone: '+1 (555) 123-4567',
        address: '123 Admin Street, Suite 100',
        bio: 'Senior administrator with 5+ years experience in real estate and interior work management.',
        avatar: null,
        role: adminData.role || 'SUPER_ADMIN',
        department: 'Administration',
        joinDate: '2023-01-15',
        lastLogin: new Date().toISOString(),
        status: 'active',
        permissions: ['ALL_ACCESS', 'USER_MANAGEMENT', 'PROPERTY_MANAGEMENT', 'INTERIOR_MANAGEMENT'],
        notifications: true,
        emailAlerts: true,
        twoFactor: false,
        language: 'en',
        timezone: 'America/New_York',
        socialLinks: {
          facebook: 'https://facebook.com/admin',
          twitter: 'https://twitter.com/admin',
          linkedin: 'https://linkedin.com/in/admin',
          instagram: 'https://instagram.com/admin'
        }
      };

      setProfileData(mockProfile);
      setFormData(mockProfile);
      
      // Load avatar if exists
      if (mockProfile.avatar) {
        setAvatarPreview(mockProfile.avatar);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingAvatar(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setUploadingAvatar(false);
    };
    reader.readAsDataURL(file);

    // In real app, upload to server
    // await AdminService.uploadAvatar(file);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    return newErrors;
  };

  const handleSaveProfile = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    try {
      // Save to API
      // await AdminService.updateProfile(formData);
      
      // Update local storage
      const updatedUser = {
        ...JSON.parse(localStorage.getItem('adminUser') || '{}'),
        name: formData.name,
        email: formData.email,
        avatar: avatarPreview
      };
      localStorage.setItem('adminUser', JSON.stringify(updatedUser));
      
      setProfileData(formData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData(profileData);
    setErrors({});
    setEditing(false);
  };

  const handleChangePassword = () => {
    navigate('/admin/change-password');
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      'SUPER_ADMIN': { label: 'Super Admin', color: 'danger' },
      'REAL_ESTATE_ADMIN': { label: 'Real Estate Admin', color: 'primary' },
      'INTERIOR_ADMIN': { label: 'Interior Admin', color: 'success' },
      'MANAGER': { label: 'Manager', color: 'warning' },
      'STAFF': { label: 'Staff', color: 'info' }
    };
    
    const config = roleConfig[role] || { label: role, color: 'secondary' };
    return <span className={`badge bg-${config.color}`}>{config.label}</span>;
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="admin-profile-page">
      <div className="profile-header">
        <h1>
          <Icon className="me-2">👤</Icon>
          Admin Profile
        </h1>
        <div className="header-actions">
          {!editing ? (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              <Icon className="me-2">✏️</Icon>
              Edit Profile
            </button>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                <Icon className="me-2">✕</Icon>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSaveProfile} disabled={saving}>
                <Icon className="me-2">💾</Icon>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
          <button className="btn btn-outline-danger" onClick={handleChangePassword}>
            <Icon className="me-2">🔐</Icon>
            Change Password
          </button>
        </div>
      </div>

      <div className="profile-container">
        {/* Left Sidebar */}
        <div className="profile-sidebar">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img 
                src={avatarPreview || '/default-avatar.png'} 
                alt="Admin Avatar" 
                className="avatar-img"
              />
              {editing && (
                <label className="avatar-upload-btn">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="d-none"
                  />
                  <Icon>📷</Icon>
                  {uploadingAvatar && (
                    <span className="upload-spinner"></span>
                  )}
                </label>
              )}
            </div>
            <h3>{profileData.name}</h3>
            <div className="role-badge">
              {getRoleBadge(profileData.role)}
            </div>
            <p className="department">{profileData.department}</p>
            
            <div className="status-info">
              <div className={`status-indicator ${profileData.status}`}>
                {profileData.status === 'active' ? 'Active' : 'Inactive'}
              </div>
              <div className="login-info">
                <Icon className="me-1">📅</Icon>
                Joined: {new Date(profileData.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="sidebar-menu">
            <button 
              className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <Icon className="me-2">👤</Icon>
              Personal Info
            </button>
            <button 
              className={`menu-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Icon className="me-2">🛡️</Icon>
              Security
            </button>
            <button 
              className={`menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Icon className="me-2">🔔</Icon>
              Notifications
            </button>
            <button 
              className={`menu-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <Icon className="me-2">⚙️</Icon>
              Preferences
            </button>
            <button 
              className={`menu-item ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => setActiveTab('social')}
            >
              <Icon className="me-2">🌐</Icon>
              Social Links
            </button>
            <button 
              className={`menu-item ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Icon className="me-2">🏢</Icon>
              Activity Log
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="content-card">
            {activeTab === 'profile' && (
              <div className="tab-content">
                <h4 className="tab-title">
                  <Icon className="me-2">👤</Icon>
                  Personal Information
                </h4>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <Icon className="input-icon">👤</Icon>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        disabled={!editing}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <Icon className="input-icon">📧</Icon>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        disabled={!editing}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <Icon className="input-icon">📱</Icon>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        disabled={!editing}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <Icon className="input-icon">📍</Icon>
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-control"
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio / Description</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="4"
                    disabled={!editing}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Admin ID:</span>
                    <span className="info-value">{profileData.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Role:</span>
                    <span className="info-value">{getRoleBadge(profileData.role)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Department:</span>
                    <span className="info-value">{profileData.department}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Join Date:</span>
                    <span className="info-value">
                      {new Date(profileData.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Login:</span>
                    <span className="info-value">
                      {new Date(profileData.lastLogin).toLocaleString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className={`status-badge ${profileData.status}`}>
                      {profileData.status}
                    </span>
                  </div>
                </div>

                <div className="permissions-section">
                  <h5>Permissions</h5>
                  <div className="permissions-grid">
                    {profileData.permissions.map((permission, index) => (
                      <span key={index} className="permission-badge">
                        {permission.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-content">
                <h4 className="tab-title">
                  <Icon className="me-2">🛡️</Icon>
                  Security Settings
                </h4>
                
                <div className="security-settings">
                  <div className="security-item">
                    <div className="security-info">
                      <h6>Two-Factor Authentication</h6>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <div className="security-action">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.twoFactor}
                          onChange={(e) => setFormData({...formData, twoFactor: e.target.checked})}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h6>Change Password</h6>
                      <p>Update your account password regularly</p>
                    </div>
                    <div className="security-action">
                      <button className="btn btn-outline-primary" onClick={handleChangePassword}>
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h6>Session Management</h6>
                      <p>View and manage active sessions</p>
                    </div>
                    <div className="security-action">
                      <button className="btn btn-outline-secondary">
                        View Sessions
                      </button>
                    </div>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h6>Login History</h6>
                      <p>Review your account login activity</p>
                    </div>
                    <div className="security-action">
                      <button className="btn btn-outline-info">
                        View History
                      </button>
                    </div>
                  </div>
                </div>

                <div className="security-tips">
                  <h6>Security Tips:</h6>
                  <ul>
                    <li>Use a strong, unique password</li>
                    <li>Enable two-factor authentication</li>
                    <li>Never share your login credentials</li>
                    <li>Log out from shared computers</li>
                    <li>Regularly review your account activity</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="tab-content">
                <h4 className="tab-title">
                  <Icon className="me-2">🔔</Icon>
                  Notification Preferences
                </h4>
                
                <div className="notification-settings">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h6>System Notifications</h6>
                      <p>Receive alerts about system updates and maintenance</p>
                    </div>
                    <div className="notification-action">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.notifications}
                          onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-info">
                      <h6>Email Alerts</h6>
                      <p>Receive important updates via email</p>
                    </div>
                    <div className="notification-action">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.emailAlerts}
                          onChange={(e) => setFormData({...formData, emailAlerts: e.target.checked})}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="notification-categories">
                    <h6>Notification Categories:</h6>
                    <div className="category-list">
                      <div className="category-item">
                        <input type="checkbox" id="cat1" defaultChecked disabled={!editing} />
                        <label htmlFor="cat1">User Registrations</label>
                      </div>
                      <div className="category-item">
                        <input type="checkbox" id="cat2" defaultChecked disabled={!editing} />
                        <label htmlFor="cat2">Property Listings</label>
                      </div>
                      <div className="category-item">
                        <input type="checkbox" id="cat3" defaultChecked disabled={!editing} />
                        <label htmlFor="cat3">Booking Requests</label>
                      </div>
                      <div className="category-item">
                        <input type="checkbox" id="cat4" defaultChecked disabled={!editing} />
                        <label htmlFor="cat4">Payment Transactions</label>
                      </div>
                      <div className="category-item">
                        <input type="checkbox" id="cat5" defaultChecked disabled={!editing} />
                        <label htmlFor="cat5">System Alerts</label>
                      </div>
                      <div className="category-item">
                        <input type="checkbox" id="cat6" defaultChecked disabled={!editing} />
                        <label htmlFor="cat6">Marketing Updates</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="tab-content">
                <h4 className="tab-title">
                  <Icon className="me-2">⚙️</Icon>
                  System Preferences
                </h4>
                
                <div className="preference-settings">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Language</label>
                        <select
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!editing}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Timezone</label>
                        <select
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!editing}
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dashboard Theme</label>
                    <div className="theme-options">
                      <label className="theme-option">
                        <input type="radio" name="theme" defaultChecked disabled={!editing} />
                        <div className="theme-preview light"></div>
                        <span>Light</span>
                      </label>
                      <label className="theme-option">
                        <input type="radio" name="theme" disabled={!editing} />
                        <div className="theme-preview dark"></div>
                        <span>Dark</span>
                      </label>
                      <label className="theme-option">
                        <input type="radio" name="theme" disabled={!editing} />
                        <div className="theme-preview blue"></div>
                        <span>Blue</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dashboard Layout</label>
                    <select className="form-control" disabled={!editing}>
                      <option>Default</option>
                      <option>Compact</option>
                      <option>Expanded</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="tab-content">
                <h4 className="tab-title">
                  <Icon className="me-2">🌐</Icon>
                  Social Media Links
                </h4>
                
                <div className="social-links">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          <Icon className="input-icon text-primary">📘</Icon>
                          Facebook
                        </label>
                        <input
                          type="url"
                          name="socialLinks.facebook"
                          value={formData.socialLinks.facebook}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="https://facebook.com/username"
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          <Icon className="input-icon text-info">🐦</Icon>
                          Twitter
                        </label>
                        <input
                          type="url"
                          name="socialLinks.twitter"
                          value={formData.socialLinks.twitter}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="https://twitter.com/username"
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          <Icon className="input-icon text-primary">💼</Icon>
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          name="socialLinks.linkedin"
                          value={formData.socialLinks.linkedin}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="https://linkedin.com/in/username"
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          <Icon className="input-icon text-danger">📸</Icon>
                          Instagram
                        </label>
                        <input
                          type="url"
                          name="socialLinks.instagram"
                          value={formData.socialLinks.instagram}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="https://instagram.com/username"
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="social-preview">
                    <h6>Preview:</h6>
                    <div className="preview-icons">
                      {formData.socialLinks.facebook && (
                        <a href={formData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                          <Icon className="social-icon facebook">📘</Icon>
                        </a>
                      )}
                      {formData.socialLinks.twitter && (
                        <a href={formData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Icon className="social-icon twitter">🐦</Icon>
                        </a>
                      )}
                      {formData.socialLinks.linkedin && (
                        <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Icon className="social-icon linkedin">💼</Icon>
                        </a>
                      )}
                      {formData.socialLinks.instagram && (
                        <a href={formData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          <Icon className="social-icon instagram">📸</Icon>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="tab-content">
                <h4 className="tab-title">
                  <Icon className="me-2">🏢</Icon>
                  Recent Activity
                </h4>
                
                <div className="activity-timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>Property Added</strong>
                        <span className="timeline-time">2 hours ago</span>
                      </div>
                      <p>Added new property: "Luxury Villa in Miami"</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>User Registered</strong>
                        <span className="timeline-time">4 hours ago</span>
                      </div>
                      <p>New user registration: John Doe (john@example.com)</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>Interior Project Updated</strong>
                        <span className="timeline-time">1 day ago</span>
                      </div>
                      <p>Updated project status: "Modern Apartment Renovation"</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>System Settings Changed</strong>
                        <span className="timeline-time">2 days ago</span>
                      </div>
                      <p>Updated notification settings</p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>Password Changed</strong>
                        <span className="timeline-time">3 days ago</span>
                      </div>
                      <p>Account password updated successfully</p>
                    </div>
                  </div>
                </div>

                <div className="activity-stats">
                  <h6>Activity Statistics (Last 30 Days):</h6>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-value">42</div>
                      <div className="stat-label">Properties Managed</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">18</div>
                      <div className="stat-label">Users Processed</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">24</div>
                      <div className="stat-label">Interior Projects</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">156</div>
                      <div className="stat-label">Total Actions</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-profile-page {
          padding: 20px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .profile-header h1 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
        }
        
        .header-actions {
          display: flex;
          gap: 10px;
        }
        
        .profile-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 25px;
        }
        
        .profile-sidebar {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .avatar-section {
          padding: 30px 20px;
          text-align: center;
          background: linear-gradient(135deg, #2c3e50 0%, #1a252f 100%);
          color: white;
        }
        
        .avatar-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 20px;
        }
        
        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid white;
        }
        
        .avatar-upload-btn {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: #007bff;
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid white;
          transition: all 0.3s;
        }
        
        .avatar-upload-btn:hover {
          background: #0056b3;
        }
        
        .upload-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .avatar-section h3 {
          margin: 10px 0 5px;
          font-size: 1.2rem;
        }
        
        .role-badge {
          margin: 10px 0;
        }
        
        .department {
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        
        .status-info {
          margin-top: 15px;
        }
        
        .status-indicator {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .status-indicator.active {
          background: #28a745;
          color: white;
        }
        
        .status-indicator.inactive {
          background: #dc3545;
          color: white;
        }
        
        .login-info {
          margin-top: 10px;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        
        .sidebar-menu {
          padding: 20px 0;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 12px 20px;
          border: none;
          background: none;
          text-align: left;
          color: #666;
          cursor: pointer;
          transition: all 0.3s;
          border-left: 3px solid transparent;
          font-size: 0.95rem;
        }
        
        .menu-item:hover {
          background: #f8f9fa;
          color: #007bff;
        }
        
        .menu-item.active {
          background: #f0f7ff;
          color: #007bff;
          border-left: 3px solid #007bff;
          font-weight: 500;
        }
        
        .profile-content {
          min-height: 600px;
        }
        
        .content-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 30px;
          height: 100%;
        }
        
        .tab-title {
          color: #2c3e50;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          font-size: 1.2rem;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
          color: #34495e;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .input-icon {
          font-size: 1rem;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .info-item {
          display: flex;
          flex-direction: column;
        }
        
        .info-label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 5px;
        }
        
        .info-value {
          font-weight: 500;
          color: #2c3e50;
        }
        
        .permissions-section {
          margin-top: 25px;
        }
        
        .permissions-section h5 {
          margin-bottom: 15px;
          color: #2c3e50;
        }
        
        .permissions-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .permission-badge {
          padding: 6px 12px;
          background: #e9ecef;
          border-radius: 4px;
          font-size: 0.85rem;
          color: #495057;
        }
        
        .security-settings,
        .notification-settings,
        .preference-settings {
          margin-top: 20px;
        }
        
        .security-item,
        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          margin-bottom: 15px;
          background: #f8f9fa;
        }
        
        .security-info,
        .notification-info {
          flex: 1;
        }
        
        .security-info h6,
        .notification-info h6 {
          margin-bottom: 5px;
          color: #2c3e50;
        }
        
        .security-info p,
        .notification-info p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }
        
        .security-tips {
          margin-top: 30px;
          padding: 20px;
          background: #e9ecef;
          border-radius: 8px;
        }
        
        .security-tips h6 {
          margin-bottom: 10px;
          color: #2c3e50;
        }
        
        .security-tips ul {
          margin: 0;
          padding-left: 20px;
        }
        
        .security-tips li {
          margin-bottom: 5px;
          color: #666;
        }
        
        .notification-categories {
          margin-top: 25px;
        }
        
        .category-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-top: 15px;
        }
        
        .category-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .theme-options {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }
        
        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }
        
        .theme-preview {
          width: 60px;
          height: 40px;
          border-radius: 6px;
          margin-bottom: 8px;
          border: 2px solid transparent;
        }
        
        .theme-preview.light {
          background: #f8f9fa;
          border-color: #dee2e6;
        }
        
        .theme-preview.dark {
          background: #343a40;
          border-color: #212529;
        }
        
        .theme-preview.blue {
          background: #007bff;
          border-color: #0056b3;
        }
        
        .social-links {
          margin-top: 20px;
        }
        
        .social-preview {
          margin-top: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .preview-icons {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }
        
        .social-icon {
          font-size: 2rem;
          transition: transform 0.3s;
        }
        
        .social-icon:hover {
          transform: scale(1.1);
        }
        
        .social-icon.facebook {
          color: #1877f2;
        }
        
        .social-icon.twitter {
          color: #1da1f2;
        }
        
        .social-icon.linkedin {
          color: #0077b5;
        }
        
        .social-icon.instagram {
          color: #e4405f;
        }
        
        .activity-timeline {
          margin-top: 20px;
          position: relative;
          padding-left: 30px;
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 25px;
        }
        
        .timeline-dot {
          position: absolute;
          left: -30px;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #007bff;
        }
        
        .timeline-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 3px solid #007bff;
        }
        
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .timeline-time {
          font-size: 0.85rem;
          color: #666;
        }
        
        .activity-stats {
          margin-top: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        
        .stat-item {
          text-align: center;
          padding: 15px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 0.85rem;
          color: #666;
        }
        
        @media (max-width: 992px) {
          .profile-container {
            grid-template-columns: 1fr;
          }
          
          .profile-sidebar {
            width: 100%;
          }
        }
        
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
          
          .header-actions {
            flex-direction: column;
          }
          
          .theme-options {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .category-list {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProfile;