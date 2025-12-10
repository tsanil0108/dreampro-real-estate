import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminService from '../services/AdminService';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const AddInteriorProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    clientEmail: '',
    clientPhone: '',
    type: 'Residential',
    location: '',
    area: '',
    budget: '',
    startDate: '',
    endDate: '',
    duration: '',
    priority: 'medium',
    description: '',
    designStyle: '',
    teamMembers: [],
    materials: [],
    furnitureItems: [],
    lightingRequirements: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});

  const projectTypes = [
    'Residential', 'Commercial', 'Office', 'Hotel',
    'Restaurant', 'Retail', 'Healthcare', 'Educational'
  ];

  const designStyles = [
    'Modern', 'Contemporary', 'Minimalist', 'Industrial',
    'Scandinavian', 'Traditional', 'Bohemian', 'Rustic',
    'Coastal', 'Mid-century', 'Art Deco', 'Transitional'
  ];

  const teamMembers = [
    { id: 1, name: 'John Designer', role: 'Lead Designer' },
    { id: 2, name: 'Sarah Architect', role: 'Architect' },
    { id: 3, name: 'Mike Contractor', role: 'Project Manager' },
    { id: 4, name: 'Lisa Decorator', role: 'Interior Decorator' }
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchProjectData();
    }
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const project = await AdminService.getInteriorProject(id);
      setFormData(project);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.client.trim()) newErrors.client = 'Client name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.area || formData.area <= 0) newErrors.area = 'Valid area is required';
    if (!formData.budget || formData.budget <= 0) newErrors.budget = 'Valid budget is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    return newErrors;
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
      if (isEditMode) {
        await AdminService.updateInteriorProject(id, formData);
      } else {
        await AdminService.createInteriorProject(formData);
      }
      navigate('/admin/interior/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTeamMemberToggle = (memberId) => {
    setFormData(prev => {
      const updated = [...prev.teamMembers];
      const index = updated.indexOf(memberId);
      
      if (index > -1) {
        updated.splice(index, 1);
      } else {
        updated.push(memberId);
      }
      
      return { ...prev, teamMembers: updated };
    });
  };

  const handleMaterialAdd = () => {
    const newMaterial = prompt('Enter material name:');
    if (newMaterial) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, newMaterial]
      }));
    }
  };

  const handleMaterialRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  if (loading && isEditMode) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading project data...</p>
      </div>
    );
  }

  return (
    <div className="add-interior-project">
      <div className="page-header">
        <h1>
          <Icon className="me-2">🎨</Icon>
          {isEditMode ? 'Edit Interior Project' : 'Add New Interior Project'}
        </h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/admin/interior/projects')}
          >
            <Icon className="me-2">✕</Icon> Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            <Icon className="me-2">💾</Icon>
            {loading ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="project-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h4 className="section-title">Basic Information</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="e.g., Modern Apartment Renovation"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className={`form-control ${errors.client ? 'is-invalid' : ''}`}
                  placeholder="Client full name"
                />
                {errors.client && <div className="invalid-feedback">{errors.client}</div>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Client Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="client@example.com"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Client Phone</label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="form-section">
          <h4 className="section-title">Project Details</h4>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Project Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                >
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Design Style</label>
                <select
                  name="designStyle"
                  value={formData.designStyle}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select style</option>
                  {designStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Location *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    📍
                  </span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                    placeholder="Full project address"
                  />
                </div>
                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              </div>
            </div>
            <div className="col-md-6">
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
                    onChange={handleChange}
                    className={`form-control ${errors.area ? 'is-invalid' : ''}`}
                    placeholder="e.g., 1500"
                    min="1"
                  />
                </div>
                {errors.area && <div className="invalid-feedback">{errors.area}</div>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Budget ($) *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    💰
                  </span>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`form-control ${errors.budget ? 'is-invalid' : ''}`}
                    placeholder="e.g., 50000"
                    min="1"
                  />
                </div>
                {errors.budget && <div className="invalid-feedback">{errors.budget}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Duration (weeks)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Estimated duration in weeks"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Start Date *</label>
                <div className="input-group">
                  <span className="input-group-text">
                    📅
                  </span>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                  />
                </div>
                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>End Date</label>
                <div className="input-group">
                  <span className="input-group-text">
                    📅
                  </span>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team & Materials Section */}
        <div className="form-section">
          <h4 className="section-title">Team & Materials</h4>
          
          <div className="form-group">
            <label>Design Team</label>
            <div className="team-selector">
              {teamMembers.map(member => (
                <div key={member.id} className="team-member-option">
                  <input
                    type="checkbox"
                    id={`member-${member.id}`}
                    checked={formData.teamMembers.includes(member.id)}
                    onChange={() => handleTeamMemberToggle(member.id)}
                  />
                  <label htmlFor={`member-${member.id}`}>
                    <div className="member-avatar">{member.name.charAt(0)}</div>
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Materials Required</label>
            <div className="materials-list">
              {formData.materials.map((material, index) => (
                <div key={index} className="material-item">
                  <span>{material}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleMaterialRemove(index)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleMaterialAdd}
              >
                <Icon className="me-2">➕</Icon> Add Material
              </button>
            </div>
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="form-section">
          <h4 className="section-title">Additional Requirements</h4>
          
          <div className="form-group">
            <label>Furniture Requirements</label>
            <textarea
              name="furnitureItems"
              value={formData.furnitureItems}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="List furniture items needed..."
            />
            <small className="form-text">
              🪑 Specify furniture pieces, brands, or special requirements
            </small>
          </div>

          <div className="form-group">
            <label>Lighting Requirements</label>
            <textarea
              name="lightingRequirements"
              value={formData.lightingRequirements}
              onChange={handleChange}
              className="form-control"
              rows="2"
              placeholder="Special lighting needs..."
            />
            <small className="form-text">
              💡 Specify lighting types, fixtures, or smart lighting needs
            </small>
          </div>

          <div className="form-group">
            <label>Project Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              rows="5"
              placeholder="Describe the project in detail..."
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/interior/projects')}
          >
            <Icon className="me-2">✕</Icon> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            <Icon className="me-2">💾</Icon>
            {loading ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .add-interior-project {
          padding: 20px;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 2px solid #eee;
        }
        
        .page-header h1 {
          margin: 0;
          color: #333;
          display: flex;
          align-items: center;
        }
        
        .header-actions {
          display: flex;
          gap: 10px;
        }
        
        .form-section {
          background: white;
          border-radius: 8px;
          padding: 25px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .section-title {
          color: #555;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          font-weight: 500;
          margin-bottom: 8px;
          display: block;
          color: #444;
        }
        
        .team-selector {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 10px;
        }
        
        .team-member-option {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 10px;
          transition: all 0.3s;
        }
        
        .team-member-option:hover {
          border-color: #007bff;
          background: #f8f9fa;
        }
        
        .team-member-option input[type="checkbox"] {
          display: none;
        }
        
        .team-member-option label {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin: 0;
        }
        
        .member-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #007bff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 12px;
        }
        
        .member-info {
          flex: 1;
        }
        
        .member-name {
          font-weight: 500;
          color: #333;
        }
        
        .member-role {
          font-size: 0.85em;
          color: #666;
        }
        
        .materials-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        
        .material-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: #e9ecef;
          border-radius: 4px;
          font-size: 0.9em;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: #666;
        }
        
        .input-group-text {
          background: #f8f9fa;
          border-right: none;
        }
        
        .input-group .form-control {
          border-left: none;
        }
        
        .input-group .form-control:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
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

export default AddInteriorProject;