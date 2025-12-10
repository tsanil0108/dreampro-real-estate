import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminService from '../services/AdminService';
//import '../../../src/styles/admin-properties.css';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const AdminProperties = () => {
  const navigate = useNavigate();
  
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const propertyStatuses = [
    { value: 'AVAILABLE', label: 'Available', color: 'success' },
    { value: 'SOLD', label: 'Sold', color: 'danger' },
    { value: 'RENTED', label: 'Rented', color: 'warning' },
    { value: 'PENDING', label: 'Pending', color: 'info' },
    { value: 'DRAFT', label: 'Draft', color: 'secondary' }
  ];
  
  const propertyTypes = [
    'Apartment', 'House', 'Villa', 'Condo', 'Townhouse',
    'Studio', 'Penthouse', 'Duplex', 'Triplex', 'Bungalow',
    'Farmhouse', 'Cabin', 'Loft', 'Commercial', 'Office',
    'Retail', 'Industrial', 'Land', 'Other'
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchQuery, filterStatus, filterType]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      // In real app, fetch from API
      // const data = await AdminService.getProperties();
      
      // Mock data
      const mockProperties = [
        {
          id: 1,
          title: 'Luxury Villa with Pool in Miami',
          type: 'Villa',
          price: 2500000,
          address: '123 Beach Ave, Miami, FL',
          bedrooms: 5,
          bathrooms: 4,
          area: 3500,
          status: 'AVAILABLE',
          featured: true,
          images: [],
          createdAt: '2024-01-15',
          views: 1250,
          likes: 89
        },
        {
          id: 2,
          title: 'Modern Apartment in Downtown',
          type: 'Apartment',
          price: 850000,
          address: '456 Main St, New York, NY',
          bedrooms: 3,
          bathrooms: 2,
          area: 1200,
          status: 'SOLD',
          featured: false,
          images: [],
          createdAt: '2024-01-10',
          views: 890,
          likes: 45
        },
        {
          id: 3,
          title: 'Commercial Office Space',
          type: 'Office',
          price: 1500000,
          address: '789 Business Blvd, Chicago, IL',
          bedrooms: 0,
          bathrooms: 2,
          area: 5000,
          status: 'AVAILABLE',
          featured: true,
          images: [],
          createdAt: '2024-01-05',
          views: 670,
          likes: 23
        },
        {
          id: 4,
          title: 'Lakeside Cabin Retreat',
          type: 'Cabin',
          price: 450000,
          address: '101 Lake View Rd, Seattle, WA',
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          status: 'PENDING',
          featured: false,
          images: [],
          createdAt: '2024-01-03',
          views: 420,
          likes: 67
        },
        {
          id: 5,
          title: 'Penthouse with Panoramic Views',
          type: 'Penthouse',
          price: 3200000,
          address: '202 Skyline Dr, Los Angeles, CA',
          bedrooms: 4,
          bathrooms: 3.5,
          area: 2800,
          status: 'AVAILABLE',
          featured: true,
          images: [],
          createdAt: '2023-12-28',
          views: 2100,
          likes: 156
        },
        {
          id: 6,
          title: 'Family Townhouse',
          type: 'Townhouse',
          price: 650000,
          address: '303 Family St, Boston, MA',
          bedrooms: 4,
          bathrooms: 2.5,
          area: 2200,
          status: 'RENTED',
          featured: false,
          images: [],
          createdAt: '2023-12-25',
          views: 780,
          likes: 34
        },
        {
          id: 7,
          title: 'Downtown Studio Apartment',
          type: 'Studio',
          price: 350000,
          address: '404 Urban Ave, San Francisco, CA',
          bedrooms: 1,
          bathrooms: 1,
          area: 800,
          status: 'AVAILABLE',
          featured: false,
          images: [],
          createdAt: '2023-12-20',
          views: 920,
          likes: 78
        },
        {
          id: 8,
          title: 'Retail Space in Mall',
          type: 'Retail',
          price: 1200000,
          address: '505 Shopping Ct, Dallas, TX',
          bedrooms: 0,
          bathrooms: 2,
          area: 3000,
          status: 'AVAILABLE',
          featured: true,
          images: [],
          createdAt: '2023-12-18',
          views: 560,
          likes: 12
        },
        {
          id: 9,
          title: 'Industrial Warehouse',
          type: 'Industrial',
          price: 2800000,
          address: '606 Factory Rd, Houston, TX',
          bedrooms: 0,
          bathrooms: 4,
          area: 10000,
          status: 'DRAFT',
          featured: false,
          images: [],
          createdAt: '2023-12-15',
          views: 340,
          likes: 5
        },
        {
          id: 10,
          title: 'Vacation Farmhouse',
          type: 'Farmhouse',
          price: 950000,
          address: '707 Country Ln, Denver, CO',
          bedrooms: 5,
          bathrooms: 3,
          area: 3200,
          status: 'AVAILABLE',
          featured: false,
          images: [],
          createdAt: '2023-12-10',
          views: 610,
          likes: 42
        }
      ];
      
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      alert('Error loading properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(property => property.status === filterStatus);
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(property => property.type === filterType);
    }
    
    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSelectProperty = (id) => {
    setSelectedProperties(prev => {
      if (prev.includes(id)) {
        return prev.filter(propertyId => propertyId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map(property => property.id));
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }
    
    try {
      // In real app, call API
      // await AdminService.deleteProperty(id);
      
      setProperties(properties.filter(property => property.id !== id));
      setSelectedProperties(selectedProperties.filter(propertyId => propertyId !== id));
      alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property. Please try again.');
    }
  };

  const handleBulkDelete = () => {
    if (selectedProperties.length === 0) {
      alert('Please select properties to delete.');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) {
      return;
    }
    
    try {
      // In real app, call API for bulk delete
      // await AdminService.bulkDeleteProperties(selectedProperties);
      
      setProperties(properties.filter(property => !selectedProperties.includes(property.id)));
      setSelectedProperties([]);
      alert(`${selectedProperties.length} properties deleted successfully!`);
    } catch (error) {
      console.error('Error deleting properties:', error);
      alert('Error deleting properties. Please try again.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // In real app, update via API
      // await AdminService.updatePropertyStatus(id, newStatus);
      
      setProperties(properties.map(property =>
        property.id === id ? { ...property, status: newStatus } : property
      ));
      alert('Property status updated!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating property status.');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const property = properties.find(p => p.id === id);
      const newFeaturedStatus = !property.featured;
      
      // In real app, update via API
      // await AdminService.toggleFeatured(id, newFeaturedStatus);
      
      setProperties(properties.map(property =>
        property.id === id ? { ...property, featured: newFeaturedStatus } : property
      ));
      alert(`Property ${newFeaturedStatus ? 'marked as featured' : 'removed from featured'}!`);
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('Error updating featured status.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="properties-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="admin-properties-page">
      <div className="page-header">
        <h1>
          <Icon className="me-2">🏢</Icon>
          Properties Management
        </h1>
        <div className="header-actions">
          <button
            className="btn btn-danger"
            onClick={handleBulkDelete}
            disabled={selectedProperties.length === 0}
          >
            <Icon className="me-2">🗑️</Icon>
            Delete Selected ({selectedProperties.length})
          </button>
          <Link to="/admin/properties/add" className="btn btn-primary">
            <Icon className="me-2">➕</Icon>
            Add New Property
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="row">
          <div className="col-md-6">
            <div className="search-box">
              <Icon className="search-icon">🔍</Icon>
              <input
                type="text"
                placeholder="Search properties by title, address, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {propertyStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="filter-summary">
          <span className="badge bg-primary me-2">
            Total: {properties.length}
          </span>
          <span className="badge bg-success me-2">
            Available: {properties.filter(p => p.status === 'AVAILABLE').length}
          </span>
          <span className="badge bg-warning me-2">
            Rented: {properties.filter(p => p.status === 'RENTED').length}
          </span>
          <span className="badge bg-danger me-2">
            Sold: {properties.filter(p => p.status === 'SOLD').length}
          </span>
          <span className="badge bg-info me-2">
            Featured: {properties.filter(p => p.featured).length}
          </span>
        </div>
      </div>

      {/* Properties Table */}
      <div className="properties-table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                    onChange={handleSelectAll}
                    className="form-check-input"
                  />
                </th>
                <th>Property</th>
                <th>Type</th>
                <th>Price</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.length > 0 ? (
                currentProperties.map(property => (
                  <tr key={property.id} className={selectedProperties.includes(property.id) ? 'selected-row' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(property.id)}
                        onChange={() => handleSelectProperty(property.id)}
                        className="form-check-input"
                      />
                    </td>
                    <td>
                      <div className="property-info">
                        <div className="property-title">
                          {property.featured && <span className="featured-badge">⭐</span>}
                          {property.title}
                        </div>
                        <div className="property-address">
                          <Icon className="me-1">📍</Icon>
                          {property.address}
                        </div>
                        <div className="property-meta">
                          <small>
                            Listed: {formatDate(property.createdAt)} | 
                            Views: {property.views} | 
                            Likes: {property.likes}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="property-type-badge">
                        {property.type}
                      </span>
                    </td>
                    <td>
                      <strong className="text-primary">
                        {formatPrice(property.price)}
                      </strong>
                    </td>
                    <td>
                      <div className="property-details">
                        <span className="detail-item">
                          <Icon className="me-1">🛏️</Icon>
                          {property.bedrooms} BR
                        </span>
                        <span className="detail-item">
                          <Icon className="me-1">🛁</Icon>
                          {property.bathrooms} BA
                        </span>
                        <span className="detail-item">
                          <Icon className="me-1">📏</Icon>
                          {property.area.toLocaleString()} sq.ft
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="status-cell">
                        <span className={`status-badge ${property.status.toLowerCase()}`}>
                          {propertyStatuses.find(s => s.value === property.status)?.label || property.status}
                        </span>
                        <select
                          value={property.status}
                          onChange={(e) => handleStatusChange(property.id, e.target.value)}
                          className="status-select"
                        >
                          {propertyStatuses.map(status => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                          title="Edit"
                        >
                          <Icon>✏️</Icon>
                        </button>
                        <button
                          className={`btn btn-sm ${property.featured ? 'btn-warning' : 'btn-outline-warning'} me-1`}
                          onClick={() => handleToggleFeatured(property.id)}
                          title={property.featured ? 'Remove from Featured' : 'Mark as Featured'}
                        >
                          <Icon>⭐</Icon>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-info me-1"
                          onClick={() => navigate(`/admin/properties/view/${property.id}`)}
                          title="View"
                        >
                          <Icon>👁️</Icon>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteProperty(property.id)}
                          title="Delete"
                        >
                          <Icon>🗑️</Icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="empty-state">
                      <Icon className="empty-icon">🏢</Icon>
                      <h4>No properties found</h4>
                      <p>Try adjusting your filters or add a new property.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProperties.length > itemsPerPage && (
          <nav className="pagination-section">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>
              
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
            <div className="pagination-info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProperties.length)} of {filteredProperties.length} properties
            </div>
          </nav>
        )}
      </div>

      <style jsx>{`
        .admin-properties-page {
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
        
        .filters-section {
          background: white;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .search-box {
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          color: #666;
        }
        
        .search-box input {
          padding-left: 40px;
        }
        
        .filter-summary {
          margin-top: 15px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .properties-table-container {
          background: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .table th {
          font-weight: 600;
          color: #495057;
          background: #f8f9fa;
          border-bottom: 2px solid #dee2e6;
        }
        
        .selected-row {
          background-color: rgba(13, 110, 253, 0.05) !important;
        }
        
        .property-info {
          max-width: 300px;
        }
        
        .property-title {
          font-weight: 600;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .featured-badge {
          color: #ffc107;
          font-size: 0.9rem;
        }
        
        .property-address {
          font-size: 0.9rem;
          color: #666;
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .property-meta {
          font-size: 0.8rem;
          color: #999;
        }
        
        .property-type-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #e9ecef;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #495057;
        }
        
        .property-details {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: #666;
        }
        
        .status-cell {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .status-badge.available {
          background: #d1e7dd;
          color: #0f5132;
        }
        
        .status-badge.sold {
          background: #f8d7da;
          color: #842029;
        }
        
        .status-badge.rented {
          background: #fff3cd;
          color: #664d03;
        }
        
        .status-badge.pending {
          background: #cff4fc;
          color: #055160;
        }
        
        .status-badge.draft {
          background: #e2e3e5;
          color: #41464b;
        }
        
        .status-select {
          font-size: 0.85rem;
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          background: white;
        }
        
        .action-buttons {
          display: flex;
          gap: 5px;
        }
        
        .action-buttons .btn {
          padding: 4px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }
        
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          color: #dee2e6;
        }
        
        .empty-state h4 {
          color: #6c757d;
          margin-bottom: 10px;
        }
        
        .empty-state p {
          color: #adb5bd;
        }
        
        .pagination-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
        }
        
        .pagination {
          margin: 0;
        }
        
        .page-link {
          color: #007bff;
          border: 1px solid #dee2e6;
          padding: 8px 16px;
        }
        
        .page-item.active .page-link {
          background-color: #007bff;
          border-color: #007bff;
        }
        
        .pagination-info {
          color: #666;
          font-size: 0.9rem;
        }
        
        .properties-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
          
          .header-actions {
            flex-direction: column;
          }
          
          .filter-summary {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .pagination-section {
            flex-direction: column;
            gap: 15px;
          }
          
          .action-buttons {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProperties;