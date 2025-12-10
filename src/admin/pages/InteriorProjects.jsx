import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaEdit, FaTrash, 
  FaEye, FaCheckCircle, FaTimesCircle, FaPlus,
  FaCalendarAlt, FaUser, FaDollarSign, FaRulerCombined,
  FaPalette, FaClipboardCheck, FaClock, FaCheck
} from 'react-icons/fa';
import AdminService from '../services/AdminService';

const InteriorProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    priority: 'all'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchTerm, filters, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getInteriorProjects();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let result = [...projects];

    // Search filter
    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(project => project.status === filters.status);
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(project => project.type === filters.type);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      result = result.filter(project => project.priority === filters.priority);
    }

    setFilteredProjects(result);
  };

  const projectTypes = [
    'Residential', 'Commercial', 'Office', 'Hotel',
    'Restaurant', 'Retail', 'Healthcare', 'Educational'
  ];

  const projectStatuses = {
    'pending': 'Pending',
    'planning': 'Planning',
    'design': 'Design Phase',
    'execution': 'Execution',
    'finishing': 'Finishing',
    'completed': 'Completed',
    'cancelled': 'Cancelled'
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'warning',
      'planning': 'info',
      'design': 'primary',
      'execution': 'success',
      'finishing': 'light',
      'completed': 'success',
      'cancelled': 'danger'
    };
    return `badge bg-${statusClasses[status] || 'secondary'}`;
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'high': 'danger',
      'medium': 'warning',
      'low': 'success'
    };
    return `badge bg-${priorityClasses[priority] || 'secondary'}`;
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await AdminService.deleteInteriorProject(projectId);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="interior-projects">
      <div className="page-header">
        <h1><FaClipboardCheck className="me-2" /> Interior Projects Management</h1>
        <div className="header-actions">
          <a href="/admin/interior/projects/add" className="btn btn-primary">
            <FaPlus className="me-2" /> New Project
          </a>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search projects by title, client, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select 
              className="form-select" 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              {Object.entries(projectStatuses).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select 
              className="form-select" 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="all">All Types</option>
              {projectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select 
              className="form-select" 
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card-header">
              <div className="project-title-section">
                <h5 className="project-title">{project.title}</h5>
                <div className="project-client">
                  <FaUser className="me-1" /> {project.client}
                </div>
              </div>
              <div className="project-actions">
                <button className="btn btn-sm btn-outline-primary">
                  <FaEye />
                </button>
                <button className="btn btn-sm btn-outline-warning">
                  <FaEdit />
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="project-card-body">
              <div className="project-meta">
                <div className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  <div>
                    <div className="meta-label">Start Date</div>
                    <div className="meta-value">{project.startDate}</div>
                  </div>
                </div>
                <div className="meta-item">
                  <FaClock className="meta-icon" />
                  <div>
                    <div className="meta-label">Duration</div>
                    <div className="meta-value">{project.duration} weeks</div>
                  </div>
                </div>
                <div className="meta-item">
                  <FaDollarSign className="meta-icon" />
                  <div>
                    <div className="meta-label">Budget</div>
                    <div className="meta-value">${project.budget.toLocaleString()}</div>
                  </div>
                </div>
                <div className="meta-item">
                  <FaRulerCombined className="meta-icon" />
                  <div>
                    <div className="meta-label">Area</div>
                    <div className="meta-value">{project.area} sq.ft</div>
                  </div>
                </div>
              </div>

              <div className="project-description">
                {project.description}
              </div>

              <div className="project-tags">
                <span className={getStatusBadge(project.status)}>
                  {projectStatuses[project.status]}
                </span>
                <span className={getPriorityBadge(project.priority)}>
                  {project.priority} Priority
                </span>
                <span className="badge bg-info">
                  <FaPalette className="me-1" /> {project.type}
                </span>
                <span className="badge bg-secondary">
                  {project.location}
                </span>
              </div>

              <div className="project-team">
                <div className="team-label">Design Team:</div>
                <div className="team-members">
                  {project.teamMembers?.map((member, index) => (
                    <div key={index} className="team-avatar">
                      {member.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-progress">
                <div className="progress-label">
                  <span>Progress: {project.progress}%</span>
                  <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="project-card-footer">
              <div className="footer-actions">
                <button className="btn btn-sm btn-success">
                  <FaCheck className="me-1" /> Update Progress
                </button>
                <button className="btn btn-sm btn-primary">
                  <FaClipboardCheck className="me-1" /> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <FaClipboardCheck className="no-projects-icon" />
          <h4>No projects found</h4>
          <p>Try changing your search criteria or add a new project</p>
          <a href="/admin/interior/projects/add" className="btn btn-primary">
            <FaPlus className="me-2" /> Create New Project
          </a>
        </div>
      )}
    </div>
  );
};

export default InteriorProjects;