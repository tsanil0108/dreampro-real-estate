import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from '../services/AdminService';
import '../../../src/styles/Property-form.css';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const AddProperty = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'Apartment',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    bedrooms: '',
    bathrooms: '',
    area: '',
    yearBuilt: '',
    latitude: '',
    longitude: '',
    amenities: [],
    images: [],
    ownerId: '',
    status: 'AVAILABLE',
    featured: false,
    virtualTour: ''
  });
  
  const [errors, setErrors] = useState({});
  const [amenityInput, setAmenityInput] = useState('');
  
  // Property types
  const propertyTypes = [
    'Apartment', 'House', 'Villa', 'Condo', 'Townhouse',
    'Studio', 'Penthouse', 'Duplex', 'Triplex', 'Bungalow',
    'Farmhouse', 'Cabin', 'Loft', 'Commercial', 'Office',
    'Retail', 'Industrial', 'Land', 'Other'
  ];
  
  // Common amenities
  const commonAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Balcony',
    'Terrace', 'Elevator', 'Security', 'Concierge', 'Pet Friendly',
    'Air Conditioning', 'Heating', 'Fireplace', 'Laundry', 'Storage',
    'WiFi', 'Cable TV', 'Furnished', 'Unfurnished', 'Wheelchair Access'
  ];
  
  // Property statuses
  const propertyStatuses = [
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'SOLD', label: 'Sold' },
    { value: 'RENTED', label: 'Rented' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'DRAFT', label: 'Draft' }
  ];
  
  // Countries
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia',
    'Germany', 'France', 'Spain', 'Italy', 'Japan', 'China',
    'India', 'Brazil', 'Mexico', 'South Africa', 'United Arab Emirates'
  ];

  useEffect(() => {
    // Fetch current user as default owner
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (user) {
      setFormData(prev => ({
        ...prev,
        ownerId: user.id
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Property title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.bedrooms || formData.bedrooms < 0) newErrors.bedrooms = 'Number of bedrooms is required';
    if (!formData.bathrooms || formData.bathrooms < 0) newErrors.bathrooms = 'Number of bathrooms is required';
    if (!formData.area || formData.area <= 0) newErrors.area = 'Valid area is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    
    return newErrors;
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);

    try {
      // In a real app, you would upload to cloud storage
      // For now, we'll simulate with base64
      const imagePromises = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      const uploadedImages = await Promise.all(imagePromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAmenityAdd = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()]
      }));
      setAmenityInput('');
    }
  };

  const handleCommonAmenityClick = (amenity) => {
    if (!formData.amenities.includes(amenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await AdminService.createProperty(formData);
      alert('Property created successfully!');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error creating property:', error);
      alert(error.response?.data?.message || 'Error creating property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value)
    }));
  };

  return (
    <div className="add-property-page">
      <div className="page-header">
        <h1>
          <Icon className="me-2">🏠</Icon>
          Add New Property
        </h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/admin/properties')}
            disabled={loading}
          >
            <Icon className="me-2">✕</Icon> Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || uploading}
          >
            <Icon className="me-2">💾</Icon>
            {loading ? 'Saving...' : 'Save Property'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h4 className="section-title">
            <Icon className="me-2">🏠</Icon>
            Basic Information
          </h4>
          
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <label>Property Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="e.g., Luxury 3-Bedroom Apartment with Sea View"
                  maxLength="200"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                <small className="form-text text-muted">
                  Make it descriptive and appealing to potential buyers/renters
                </small>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="form-group">
                <label>Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="form-control"
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              rows="5"
              placeholder="Describe the property in detail. Include features, benefits, and unique selling points..."
              maxLength="2000"
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            <small className="form-text text-muted">
              {formData.description.length}/2000 characters
            </small>
          </div>
        </div>

        {/* Pricing & Status Section */}
        <div className="form-section">
          <h4 className="section-title">
            <Icon className="me-2">💰</Icon>
            Pricing & Status
          </h4>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Price *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    💰
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    placeholder="e.g., 500000"
                    min="0"
                    step="1000"
                  />
                </div>
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                <small className="form-text text-muted">
                  Enter the price in USD. Use whole numbers only.
                </small>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <label>Property Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                >
                  {propertyStatuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="featured">
                  Mark as Featured Property
                </label>
                <small className="form-text text-muted d-block">
                  Featured properties appear prominently on the homepage
                </small>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <label>Virtual Tour URL</label>
                <input
                  type="url"
                  name="virtualTour"
                  value={formData.virtualTour}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://example.com/virtual-tour"
                />
                <small className="form-text text-muted">
                  Link to 360° virtual tour or video walkthrough
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="form-section">
          <h4 className="section-title">
            <Icon className="me-2">📍</Icon>
            Location Details
          </h4>
          
          <div className="form-group">
            <label>Full Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              placeholder="e.g., 123 Main Street"
              maxLength="500"
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  placeholder="e.g., New York"
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <label>State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., New York"
                />
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>ZIP/Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., 10001"
                />
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="form-group">
                <label>Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleCoordinatesChange}
                  className="form-control"
                  placeholder="e.g., 40.7128"
                  step="any"
                  min="-90"
                  max="90"
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleCoordinatesChange}
                  className="form-control"
                  placeholder="e.g., -74.0060"
                  step="any"
                  min="-180"
                  max="180"
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <small className="form-text text-muted">
              Coordinates are optional but recommended for map display. Use decimal format.
            </small>
          </div>
        </div>

        {/* Property Specifications */}
        <div className="form-section">
          <h4 className="section-title">
            <Icon className="me-2">📏</Icon>
            Property Specifications
          </h4>
          
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Bedrooms *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    🛏️
                  </span>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.bedrooms ? 'is-invalid' : ''}`}
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>
                {errors.bedrooms && <div className="invalid-feedback">{errors.bedrooms}</div>}
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="form-group">
                <label>Bathrooms *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    🛁
                  </span>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.bathrooms ? 'is-invalid' : ''}`}
                    placeholder="0"
                    min="0"
                    step="0.5"
                  />
                </div>
                {errors.bathrooms && <div className="invalid-feedback">{errors.bathrooms}</div>}
                <small className="form-text text-muted">
                  Use 0.5 for half bathrooms
                </small>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="form-group">
                <label>Area (sq.ft) *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    📏
                  </span>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.area ? 'is-invalid' : ''}`}
                    placeholder="e.g., 1500"
                    min="1"
                  />
                </div>
                {errors.area && <div className="invalid-feedback">{errors.area}</div>}
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="form-group">
                <label>Year Built</label>
                <div className="input-group">
                  <span className="input-group-text">
                    📅
                  </span>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleNumberChange}
                    className="form-control"
                    placeholder="e.g., 2020"
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="form-section">
          <h4 className="section-title">
            <Icon className="me-2">📋</Icon>
            Amenities & Features
          </h4>
          
          <div className="form-group">
            <label>Add Amenities</label>
            <div className="amenity-input-group">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                className="form-control"
                placeholder="Type an amenity and press Add or select from common ones below"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAmenityAdd())}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAmenityAdd}
                disabled={!amenityInput.trim()}
              >
                <Icon>➕</Icon> Add
              </button>
            </div>
          </div>
          
          <div className="common-amenities">
            <h6>Common Amenities:</h6>
            <div className="amenity-tags">
              {commonAmenities.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  className={`amenity-tag ${formData.amenities.includes(amenity) ? 'selected' : ''}`}
                  onClick={() => handleCommonAmenityClick(amenity)}
                >
                  {amenity}
                  {formData.amenities.includes(amenity) && (
                    <span className="check-mark">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {formData.amenities.length > 0 && (
            <div className="selected-amenities">
              <h6>Selected Amenities ({formData.amenities.length}):</h6>
              <div className="amenity-list">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span>{amenity}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeAmenity(index)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Images Section */}
        <div className="form-section">
          <h4 className="section-title">
            <Icon className="me-2">🖼️</Icon>
            Property Images *
          </h4>
          
          {errors.images && (
            <div className="alert alert-danger">
              {errors.images}
            </div>
          )}
          
          <div className="image-upload-area">
            <label className="upload-label">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="d-none"
                disabled={uploading}
              />
              <div className="upload-box">
                <Icon className="upload-icon">📤</Icon>
                <h5>Click to upload images</h5>
                <p>or drag and drop</p>
                <small className="text-muted">
                  PNG, JPG, GIF up to 10MB each. First image will be the cover.
                </small>
                {uploading && (
                  <div className="upload-progress">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Uploading...</span>
                    </div>
                    <span>Uploading images...</span>
                  </div>
                )}
              </div>
            </label>
          </div>
          
          {previewImages.length > 0 && (
            <div className="image-preview-grid">
              <h6>Uploaded Images ({previewImages.length}):</h6>
              <div className="preview-grid">
                {previewImages.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <div className="preview-overlay">
                      <span className="image-number">{index + 1}</span>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeImage(index)}
                      >
                        🗑️
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="cover-badge">Cover Image</div>
                    )}
                  </div>
                ))}
              </div>
              <small className="form-text text-muted">
                Drag and drop images to reorder. The first image will be displayed as the cover.
              </small>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/properties')}
            disabled={loading}
          >
            <Icon className="me-2">✕</Icon> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || uploading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Saving...
              </>
            ) : (
              <>
                <Icon className="me-2">💾</Icon>
                Save Property
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .add-property-page {
          padding: 20px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .page-header h1 {
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
        
        .property-form {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .form-section {
          background: white;
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .section-title {
          color: #2c3e50;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #eaeaea;
          display: flex;
          align-items: center;
          font-size: 1.2rem;
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-group label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
          color: #34495e;
        }
        
        .form-text {
          margin-top: 5px;
          font-size: 0.875rem;
        }
        
        .amenity-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .amenity-input-group .form-control {
          flex: 1;
        }
        
        .common-amenities {
          margin-bottom: 25px;
        }
        
        .common-amenities h6 {
          font-weight: 600;
          margin-bottom: 15px;
          color: #2c3e50;
        }
        
        .amenity-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .amenity-tag {
          padding: 8px 16px;
          border: 2px solid #dee2e6;
          background: white;
          border-radius: 20px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          color: #495057;
        }
        
        .amenity-tag:hover {
          border-color: #adb5bd;
          transform: translateY(-1px);
        }
        
        .amenity-tag.selected {
          background: #007bff;
          border-color: #007bff;
          color: white;
          position: relative;
        }
        
        .check-mark {
          margin-left: 5px;
          font-weight: bold;
        }
        
        .selected-amenities {
          margin-top: 20px;
        }
        
        .selected-amenities h6 {
          font-weight: 600;
          margin-bottom: 15px;
          color: #2c3e50;
        }
        
        .amenity-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .amenity-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: #e9ecef;
          border-radius: 6px;
          font-size: 0.875rem;
        }
        
        .image-upload-area {
          margin-bottom: 25px;
        }
        
        .upload-label {
          cursor: pointer;
          display: block;
        }
        
        .upload-box {
          border: 3px dashed #dee2e6;
          border-radius: 10px;
          padding: 40px;
          text-align: center;
          transition: all 0.3s;
        }
        
        .upload-box:hover {
          border-color: #007bff;
          background: #f8f9fa;
        }
        
        .upload-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          color: #6c757d;
        }
        
        .upload-box h5 {
          margin-bottom: 10px;
          color: #2c3e50;
        }
        
        .upload-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
          color: #007bff;
        }
        
        .image-preview-grid {
          margin-top: 30px;
        }
        
        .image-preview-grid h6 {
          font-weight: 600;
          margin-bottom: 15px;
          color: #2c3e50;
        }
        
        .preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .preview-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 3px 6px rgba(0,0,0,0.1);
        }
        
        .preview-item img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          display: block;
        }
        
        .preview-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .image-number {
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        
        .cover-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: #28a745;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .input-group-text {
          background: #f8f9fa;
          border-right: none;
        }
        
        .input-group .form-control {
          border-left: none;
        }
        
        .form-check-input:checked {
          background-color: #007bff;
          border-color: #007bff;
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .header-actions {
            width: 100%;
          }
          
          .header-actions button {
            flex: 1;
          }
          
          .amenity-input-group {
            flex-direction: column;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .form-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddProperty;