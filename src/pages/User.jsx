import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';

const User = () => {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        fetchUserData();
        fetchUserProperties();
        fetchUserBookings();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
            setFormData({
                firstName: response.data.firstName || '',
                lastName: response.data.lastName || '',
                email: response.data.email || '',
                phone: response.data.phone || '',
                currentPassword: '',
                newPassword: ''
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/properties/my-properties', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching user properties:', error);
        }
    };

    const fetchUserBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/bookings/my-bookings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching user bookings:', error);
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
            await axios.put('http://localhost:8080/api/users/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditMode(false);
            fetchUserData();
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8080/api/users/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormData({ ...formData, currentPassword: '', newPassword: '' });
            alert('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error changing password');
        }
    };

    const cancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchUserBookings();
                alert('Booking cancelled successfully!');
            } catch (error) {
                console.error('Error cancelling booking:', error);
                alert('Error cancelling booking');
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
                fetchUserProperties();
                alert('Property deleted successfully!');
            } catch (error) {
                console.error('Error deleting property:', error);
                alert('Error deleting property');
            }
        }
    };

    if (loading) {
        return (
            <div className="user-loading">
                <div className="loading-spinner"></div>
                <p>Loading user data...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="user-error">
                <h2>User Not Found</h2>
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="user-container">
            <div className="user-header">
                <h1>My Account</h1>
                <p>Welcome back, {user.firstName}!</p>
            </div>

            <div className="user-tabs">
                <button 
                    className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button 
                    className={`tab-button ${activeTab === 'properties' ? 'active' : ''}`}
                    onClick={() => setActiveTab('properties')}
                >
                    My Properties
                </button>
                <button 
                    className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    My Bookings
                </button>
                <button 
                    className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    Security
                </button>
            </div>

            <div className="user-content">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="tab-content">
                        <div className="profile-header">
                            <h2>Profile Information</h2>
                            <button 
                                className="edit-btn"
                                onClick={() => setEditMode(!editMode)}
                            >
                                {editMode ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {!editMode ? (
                            <div className="profile-info">
                                <div className="info-item">
                                    <label>First Name:</label>
                                    <span>{user.firstName}</span>
                                </div>
                                <div className="info-item">
                                    <label>Last Name:</label>
                                    <span>{user.lastName}</span>
                                </div>
                                <div className="info-item">
                                    <label>Email:</label>
                                    <span>{user.email}</span>
                                </div>
                                <div className="info-item">
                                    <label>Phone:</label>
                                    <span>{user.phone || 'Not provided'}</span>
                                </div>
                                <div className="info-item">
                                    <label>Member Since:</label>
                                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ) : (
                            <form className="profile-form" onSubmit={handleProfileUpdate}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="save-btn">Save Changes</button>
                            </form>
                        )}
                    </div>
                )}

                {/* My Properties Tab */}
                {activeTab === 'properties' && (
                    <div className="tab-content">
                        <div className="properties-header">
                            <h2>My Properties</h2>
                            <button className="add-property-btn">
                                Add New Property
                            </button>
                        </div>

                        {properties.length === 0 ? (
                            <div className="empty-state">
                                <p>You haven't listed any properties yet.</p>
                                <button className="cta-btn">List Your First Property</button>
                            </div>
                        ) : (
                            <div className="properties-grid">
                                {properties.map(property => (
                                    <div key={property.id} className="property-card">
                                        <div className="property-image">
                                            <img 
                                                src={property.images && property.images.length > 0 
                                                    ? property.images[0] 
                                                    : '/default-property.jpg'} 
                                                alt={property.title}
                                            />
                                            <span className={`property-status ${property.status.toLowerCase()}`}>
                                                {property.status}
                                            </span>
                                        </div>
                                        <div className="property-info">
                                            <h3>{property.title}</h3>
                                            <p className="property-price">${property.price.toLocaleString()}</p>
                                            <p className="property-location">{property.location}</p>
                                            <div className="property-details">
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

                {/* My Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="tab-content">
                        <h2>My Property Visits</h2>

                        {bookings.length === 0 ? (
                            <div className="empty-state">
                                <p>You haven't booked any property visits yet.</p>
                            </div>
                        ) : (
                            <div className="bookings-list">
                                {bookings.map(booking => (
                                    <div key={booking.id} className="booking-card">
                                        <div className="booking-info">
                                            <h3>{booking.property.title}</h3>
                                            <p className="booking-date">
                                                Visit Date: {new Date(booking.visitDate).toLocaleString()}
                                            </p>
                                            <p className="booking-status">
                                                Status: <span className={`status ${booking.status.toLowerCase()}`}>
                                                    {booking.status}
                                                </span>
                                            </p>
                                            {booking.message && (
                                                <p className="booking-message">Message: {booking.message}</p>
                                            )}
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
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                    minLength="6"
                                />
                            </div>
                            <button type="submit" className="save-btn">Change Password</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;