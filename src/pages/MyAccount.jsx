import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyAccount.css';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        checkAuthentication();
        fetchUserData();
    }, []);

    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [userRes, propertiesRes, bookingsRes, savedRes] = await Promise.all([
                axios.get('http://localhost:8080/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:8080/api/properties/my-properties', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:8080/api/bookings/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:8080/api/users/saved-properties', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setUser(userRes.data);
            setProperties(propertiesRes.data);
            setBookings(bookingsRes.data);
            setSavedProperties(savedRes.data);
            
            setFormData({
                firstName: userRes.data.firstName || '',
                lastName: userRes.data.lastName || '',
                email: userRes.data.email || '',
                phone: userRes.data.phone || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8080/api/users/profile', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setEditMode(false);
            fetchUserData();
            showNotification('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            showNotification('Error updating profile', 'error');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8080/api/users/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
            showNotification('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            showNotification('Error changing password', 'error');
        }
    };

    const cancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this visit?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchUserData();
                showNotification('Visit cancelled successfully!');
            } catch (error) {
                console.error('Error cancelling booking:', error);
                showNotification('Error cancelling visit', 'error');
            }
        }
    };

    const deleteProperty = async (propertyId) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/api/properties/${propertyId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchUserData();
                showNotification('Property deleted successfully!');
            } catch (error) {
                console.error('Error deleting property:', error);
                showNotification('Error deleting property', 'error');
            }
        }
    };

    const removeSavedProperty = async (propertyId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/users/saved-properties/${propertyId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUserData();
            showNotification('Property removed from saved list');
        } catch (error) {
            console.error('Error removing saved property:', error);
            showNotification('Error removing property', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        showNotification('Logged out successfully');
    };

    if (loading) {
        return (
            <div className="myaccount-loading">
                <div className="loading-spinner"></div>
                <p>Loading your account...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="myaccount-error">
                <h2>Access Denied</h2>
                <p>Please log in to access your account.</p>
                <button onClick={() => navigate('/login')} className="login-btn">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="myaccount-container">
            {/* Notification */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <div className="myaccount-header">
                <div className="header-content">
                    <h1>My Account</h1>
                    <p>Welcome back, {user.firstName} {user.lastName}!</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <div className="myaccount-layout">
                {/* Sidebar */}
                <div className="account-sidebar">
                    <div className="user-profile-card">
                        <div className="avatar">
                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </div>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p>{user.email}</p>
                        <div className="member-since">
                            Member since {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        <button 
                            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            📊 Dashboard
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            👤 Profile
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'properties' ? 'active' : ''}`}
                            onClick={() => setActiveTab('properties')}
                        >
                            🏠 My Properties
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            📅 My Visits
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
                            onClick={() => setActiveTab('saved')}
                        >
                            ❤️ Saved Properties
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            🔒 Security
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="account-content">
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="tab-content">
                            <h2>Account Overview</h2>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">🏠</div>
                                    <div className="stat-info">
                                        <h3>{properties.length}</h3>
                                        <p>Listed Properties</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">📅</div>
                                    <div className="stat-info">
                                        <h3>{bookings.length}</h3>
                                        <p>Scheduled Visits</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">❤️</div>
                                    <div className="stat-info">
                                        <h3>{savedProperties.length}</h3>
                                        <p>Saved Properties</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">⭐</div>
                                    <div className="stat-info">
                                        <h3>{user.role}</h3>
                                        <p>Account Type</p>
                                    </div>
                                </div>
                            </div>

                            <div className="recent-activity">
                                <h3>Recent Activity</h3>
                                <div className="activity-list">
                                    {bookings.slice(0, 5).map(booking => (
                                        <div key={booking.id} className="activity-item">
                                            <div className="activity-icon">📅</div>
                                            <div className="activity-details">
                                                <p>Visit scheduled for <strong>{booking.property.title}</strong></p>
                                                <span>{new Date(booking.visitDate).toLocaleDateString()}</span>
                                            </div>
                                            <span className={`activity-status ${booking.status.toLowerCase()}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    ))}
                                    {bookings.length === 0 && (
                                        <p className="no-activity">No recent activity</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>Profile Information</h2>
                                <button 
                                    className="edit-btn"
                                    onClick={() => setEditMode(!editMode)}
                                >
                                    {editMode ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            {!editMode ? (
                                <div className="profile-display">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <label>First Name</label>
                                            <p>{user.firstName}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Last Name</label>
                                            <p>{user.lastName}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Email Address</label>
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Phone Number</label>
                                            <p>{user.phone || 'Not provided'}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Account Type</label>
                                            <p>{user.role}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Member Since</label>
                                            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form className="profile-form" onSubmit={handleProfileUpdate}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="save-btn">
                                        Save Changes
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {/* My Properties Tab */}
                    {activeTab === 'properties' && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>My Properties</h2>
                                <button 
                                    className="primary-btn"
                                    onClick={() => navigate('/add-property')}
                                >
                                    + Add New Property
                                </button>
                            </div>

                            {properties.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">🏠</div>
                                    <h3>No Properties Listed</h3>
                                    <p>Start by listing your first property to reach potential buyers.</p>
                                    <button 
                                        className="cta-btn"
                                        onClick={() => navigate('/add-property')}
                                    >
                                        List Your First Property
                                    </button>
                                </div>
                            ) : (
                                <div className="properties-grid">
                                    {properties.map(property => (
                                        <div key={property.id} className="property-card">
                                            <div className="property-image">
                                                <img 
                                                    src={property.images?.[0] || '/default-property.jpg'} 
                                                    alt={property.title}
                                                />
                                                <span className={`property-status ${property.status.toLowerCase()}`}>
                                                    {property.status}
                                                </span>
                                            </div>
                                            <div className="property-info">
                                                <h3>{property.title}</h3>
                                                <p className="property-price">${property.price?.toLocaleString()}</p>
                                                <p className="property-location">{property.location}</p>
                                                <div className="property-meta">
                                                    <span>{property.bedrooms} beds</span>
                                                    <span>{property.bathrooms} baths</span>
                                                    <span>{property.area} sq ft</span>
                                                </div>
                                            </div>
                                            <div className="property-actions">
                                                <button className="action-btn edit">Edit</button>
                                                <button 
                                                    className="action-btn delete"
                                                    onClick={() => deleteProperty(property.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* My Visits Tab */}
                    {activeTab === 'bookings' && (
                        <div className="tab-content">
                            <h2>My Property Visits</h2>

                            {bookings.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">📅</div>
                                    <h3>No Scheduled Visits</h3>
                                    <p>You haven't scheduled any property visits yet.</p>
                                    <button 
                                        className="cta-btn"
                                        onClick={() => navigate('/properties')}
                                    >
                                        Browse Properties
                                    </button>
                                </div>
                            ) : (
                                <div className="bookings-list">
                                    {bookings.map(booking => (
                                        <div key={booking.id} className="booking-card">
                                            <div className="booking-image">
                                                <img 
                                                    src={booking.property.images?.[0] || '/default-property.jpg'} 
                                                    alt={booking.property.title}
                                                />
                                            </div>
                                            <div className="booking-details">
                                                <h3>{booking.property.title}</h3>
                                                <p className="booking-address">{booking.property.location}</p>
                                                <div className="booking-info">
                                                    <div className="info-item">
                                                        <label>Visit Date:</label>
                                                        <span>{new Date(booking.visitDate).toLocaleString()}</span>
                                                    </div>
                                                    <div className="info-item">
                                                        <label>Status:</label>
                                                        <span className={`status ${booking.status.toLowerCase()}`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    {booking.message && (
                                                        <div className="info-item">
                                                            <label>Message:</label>
                                                            <span>{booking.message}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="booking-actions">
                                                {booking.status === 'PENDING' && (
                                                    <button 
                                                        className="cancel-btn"
                                                        onClick={() => cancelBooking(booking.id)}
                                                    >
                                                        Cancel Visit
                                                    </button>
                                                )}
                                                <button 
                                                    className="view-btn"
                                                    onClick={() => navigate(`/properties/${booking.property.id}`)}
                                                >
                                                    View Property
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Saved Properties Tab */}
                    {activeTab === 'saved' && (
                        <div className="tab-content">
                            <h2>Saved Properties</h2>

                            {savedProperties.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">❤️</div>
                                    <h3>No Saved Properties</h3>
                                    <p>Start browsing properties and save your favorites for later.</p>
                                    <button 
                                        className="cta-btn"
                                        onClick={() => navigate('/properties')}
                                    >
                                        Browse Properties
                                    </button>
                                </div>
                            ) : (
                                <div className="saved-grid">
                                    {savedProperties.map(property => (
                                        <div key={property.id} className="saved-card">
                                            <div className="saved-image">
                                                <img 
                                                    src={property.images?.[0] || '/default-property.jpg'} 
                                                    alt={property.title}
                                                />
                                                <button 
                                                    className="remove-saved"
                                                    onClick={() => removeSavedProperty(property.id)}
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                            <div className="saved-info">
                                                <h3>{property.title}</h3>
                                                <p className="saved-price">${property.price?.toLocaleString()}</p>
                                                <p className="saved-location">{property.location}</p>
                                                <div className="saved-meta">
                                                    <span>{property.bedrooms} beds</span>
                                                    <span>{property.bathrooms} baths</span>
                                                    <span>{property.area} sq ft</span>
                                                </div>
                                            </div>
                                            <div className="saved-actions">
                                                <button 
                                                    className="view-btn"
                                                    onClick={() => navigate(`/properties/${property.id}`)}
                                                >
                                                    View Details
                                                </button>
                                                <button className="inquiry-btn">
                                                    Contact Agent
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="tab-content">
                            <h2>Change Password</h2>
                            <form className="security-form" onSubmit={handlePasswordChange}>
                                <div className="form-group">
                                    <label>Current Password *</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password *</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        required
                                        minLength="6"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password *</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        minLength="6"
                                    />
                                </div>
                                <button type="submit" className="save-btn">
                                    Change Password
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyAccount;