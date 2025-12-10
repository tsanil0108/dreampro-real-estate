import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaSave, FaTimes, FaUpload, FaPlus, FaTrash,
  FaHome, FaMapMarkerAlt, FaDollarSign, FaRulerCombined,
  FaBed, FaBath, FaCalendarAlt, FaImages, FaList,
  FaEdit
} from 'react-icons/fa';
import AdminService from '../services/AdminService';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const [existingImages, setExistingImages] = useState([]);

  const propertyTypes = [
    'Apartment', 'House', 'Villa', 'Condo', 'Townhouse',
    'Studio', 'Penthouse', 'Duplex', 'Triplex', 'Bungalow',
    'Farmhouse', 'Cabin', 'Loft', 'Commercial', 'Office',
    'Retail', 'Industrial', 'Land', 'Other'
  ];
  
  const commonAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Balcony',
    'Terrace', 'Elevator', 'Security', 'Concierge', 'Pet Friendly',
    'Air Conditioning', 'Heating', 'Fireplace', 'Laundry', 'Storage',
    'WiFi', 'Cable TV', 'Furnished', 'Unfurnished', 'Wheelchair Access'
  ];
  
  const propertyStatuses = [
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'SOLD', label: 'Sold' },
    { value: 'RENTED', label: 'Rented' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'DRAFT', label: 'Draft' }
  ];

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const property = await AdminService.getPropertyById(id);
      
      // Convert existing images for preview
      if (property.images && property.images.length > 0) {
        setExistingImages(property.images);
        setPreviewImages(property.images.map((_, index) => 
          `${property.images[index]}?t=${Date.now()}`
        ));
      }
      
      setFormData({
        ...property,
        price: property.price || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        area: property.area || '',
        yearBuilt: property.yearBuilt || '',
        amenities: property.amenities || []
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      alert('Error loading property data');
      navigate('/admin/properties');
    } finally {
      setLoading(false);
    }
  };

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
    if (formData.images.length === 0 && existingImages.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
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

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setPreviewImages(prev => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== newIndex)
      }));
    }
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

    setSaving(true);
    try {
      // Combine existing and new images
      const allImages = [...existingImages, ...formData.images];
      
      await AdminService.updateProperty(id, {
        ...formData,
        images: allImages
      });
      
      alert('Property updated successfully!');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error updating property:', error);
      alert(error.response?.data?.message || 'Error updating property. Please try again.');
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading property data...</p>
      </div>
    );
  }

  return (
    <div className="edit-property-page">
      <div className="page-header">
        <h1>
          <FaEdit className="me-2" />
          Edit Property: {formData.title.substring(0, 30)}...
        </h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/admin/properties')}
            disabled={saving}
          >
            <FaTimes className="me-2" /> Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={saving || uploading}
          >
            <FaSave className="me-2" />
            {saving ? 'Saving...' : 'Update Property'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        {/* Reuse the same form structure as AddProperty */}
        {/* Basic Information Section */}
        <div className="form-section">
          <h4 className="section-title">
            <FaHome className="me-2" />
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
              placeholder="Describe the property in detail..."
              maxLength="2000"
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
        </div>

        {/* Pricing & Status Section */}
        <div className="form-section">
          <h4 className="section-title">
            <FaDollarSign className="me-2" />
            Pricing & Status
          </h4>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Price *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaDollarSign />
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    placeholder="e.g., 500000"
                    min="0"
                  />
                </div>
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
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
          </div>
        </div>

        {/* Location Section */}
        <div className="form-section">
          <h4 className="section-title">
            <FaMapMarkerAlt className="me-2" />
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
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Specifications */}
        <div className="form-section">
          <h4 className="section-title">
            <FaRulerCombined className="me-2" />
            Property Specifications
          </h4>
          
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Bedrooms *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaBed />
                  </span>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.bedrooms ? 'is-invalid' : ''}`}
                    min="0"
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
                    <FaBath />
                  </span>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.bathrooms ? 'is-invalid' : ''}`}
                    min="0"
                    step="0.5"
                  />
                </div>
                {errors.bathrooms && <div className="invalid-feedback">{errors.bathrooms}</div>}
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="form-group">
                <label>Area (sq.ft) *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaRulerCombined />
                  </span>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleNumberChange}
                    className={`form-control ${errors.area ? 'is-invalid' : ''}`}
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
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleNumberChange}
                    className="form-control"
                    min="1800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="form-section">
          <h4 className="section-title">
            <FaList className="me-2" />
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
                placeholder="Type an amenity and press Add"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAmenityAdd}
                disabled={!amenityInput.trim()}
              >
                <FaPlus /> Add
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
                  {formData.amenities.includes(amenity) && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          </div>
          
          {formData.amenities.length > 0 && (
            <div className="selected-amenities">
              <h6>Selected Amenities:</h6>
              <div className="amenity-list">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span>{amenity}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeAmenity(index)}
                    >
                      <FaTrash />
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
            <FaImages className="me-2" />
            Property Images
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
                <FaUpload className="upload-icon" />
                <h5>Click to upload more images</h5>
                <p>or drag and drop</p>
              </div>
            </label>
          </div>
          
          {(existingImages.length > 0 || previewImages.length > existingImages.length) && (
            <div className="image-preview-grid">
              <h6>Current Images ({previewImages.length}):</h6>
              <div className="preview-grid">
                {previewImages.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <div className="preview-overlay">
                      <span className="image-number">{index + 1}</span>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeImage(index, index < existingImages.length)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="cover-badge">Cover Image</div>
                    )}
                    {index < existingImages.length && (
                      <div className="existing-badge">Existing</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/properties')}
            disabled={saving}
          >
            <FaTimes className="me-2" /> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving || uploading}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Saving...
              </>
            ) : (
              <>
                <FaSave className="me-2" />
                Update Property
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;