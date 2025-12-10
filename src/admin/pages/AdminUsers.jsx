import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminService from '../services/AdminService';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const AdminUsers = () => {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const userRoles = [
    { value: 'USER', label: 'Regular User', color: 'primary' },
    { value: 'AGENT', label: 'Agent', color: 'success' },
    { value: 'PREMIUM_USER', label: 'Premium User', color: 'warning' },
    { value: 'ADMIN', label: 'Admin', color: 'danger' },
    { value: 'MODERATOR', label: 'Moderator', color: 'info' }
  ];
  
  const userStatuses = [
    { value: 'ACTIVE', label: 'Active', color: 'success' },
    { value: 'INACTIVE', label: 'Inactive', color: 'secondary' },
    { value: 'SUSPENDED', label: 'Suspended', color: 'danger' },
    { value: 'PENDING', label: 'Pending', color: 'warning' },
    { value: 'BLOCKED', label: 'Blocked', color: 'dark' }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, filterRole, filterStatus]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // In real app, fetch from API
      // const data = await AdminService.getUsers();
      
      // Mock data
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          role: 'USER',
          status: 'ACTIVE',
          joinedDate: '2023-12-01',
          lastLogin: '2024-01-15T10:30:00',
          properties: 2,
          bookings: 5,
          avatar: null
        },
        {
          id: 2,
          name: 'Sarah Smith',
          email: 'sarah@example.com',
          phone: '+1 (555) 987-6543',
          role: 'AGENT',
          status: 'ACTIVE',
          joinedDate: '2023-11-15',
          lastLogin: '2024-01-14T14:20:00',
          properties: 12,
          bookings: 0,
          avatar: null
        },
        {
          id: 3,
          name: 'Michael Johnson',
          email: 'michael@example.com',
          phone: '+1 (555) 456-7890',
          role: 'PREMIUM_USER',
          status: 'ACTIVE',
          joinedDate: '2023-10-20',
          lastLogin: '2024-01-13T09:15:00',
          properties: 1,
          bookings: 3,
          avatar: null
        },
        {
          id: 4,
          name: 'Emma Wilson',
          email: 'emma@example.com',
          phone: '+1 (555) 234-5678',
          role: 'USER',
          status: 'INACTIVE',
          joinedDate: '2023-09-05',
          lastLogin: '2023-12-20T16:45:00',
          properties: 0,
          bookings: 0,
          avatar: null
        },
        {
          id: 5,
          name: 'David Brown',
          email: 'david@example.com',
          phone: '+1 (555) 876-5432',
          role: 'AGENT',
          status: 'PENDING',
          joinedDate: '2024-01-05',
          lastLogin: '2024-01-05T11:00:00',
          properties: 0,
          bookings: 0,
          avatar: null
        },
        {
          id: 6,
          name: 'Lisa Taylor',
          email: 'lisa@example.com',
          phone: '+1 (555) 345-6789',
          role: 'USER',
          status: 'SUSPENDED',
          joinedDate: '2023-08-15',
          lastLogin: '2023-11-30T13:25:00',
          properties: 0,
          bookings: 2,
          avatar: null
        },
        {
          id: 7,
          name: 'Robert Clark',
          email: 'robert@example.com',
          phone: '+1 (555) 765-4321',
          role: 'PREMIUM_USER',
          status: 'ACTIVE',
          joinedDate: '2023-07-22',
          lastLogin: '2024-01-12T08:45:00',
          properties: 3,
          bookings: 8,
          avatar: null
        },
        {
          id: 8,
          name: 'Jennifer Lee',
          email: 'jennifer@example.com',
          phone: '+1 (555) 987-1234',
          role: 'USER',
          status: 'ACTIVE',
          joinedDate: '2023-06-30',
          lastLogin: '2024-01-14T17:30:00',
          properties: 0,
          bookings: 1,
          avatar: null
        },
        {
          id: 9,
          name: 'Thomas White',
          email: 'thomas@example.com',
          phone: '+1 (555) 654-3210',
          role: 'AGENT',
          status: 'BLOCKED',
          joinedDate: '2023-05-10',
          lastLogin: '2023-10-15T12:10:00',
          properties: 5,
          bookings: 0,
          avatar: null
        },
        {
          id: 10,
          name: 'Amanda Hall',
          email: 'amanda@example.com',
          phone: '+1 (555) 432-1098',
          role: 'ADMIN',
          status: 'ACTIVE',
          joinedDate: '2023-04-01',
          lastLogin: '2024-01-15T09:00:00',
          properties: 0,
          bookings: 0,
          avatar: null
        },
        {
          id: 11,
          name: 'Christopher King',
          email: 'chris@example.com',
          phone: '+1 (555) 321-0987',
          role: 'MODERATOR',
          status: 'ACTIVE',
          joinedDate: '2023-03-15',
          lastLogin: '2024-01-14T15:45:00',
          properties: 0,
          bookings: 0,
          avatar: null
        },
        {
          id: 12,
          name: 'Jessica Scott',
          email: 'jessica@example.com',
          phone: '+1 (555) 210-9876',
          role: 'USER',
          status: 'ACTIVE',
          joinedDate: '2023-02-20',
          lastLogin: '2024-01-13T11:20:00',
          properties: 1,
          bookings: 4,
          avatar: null
        }
      ];
      
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error loading users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }
    
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev => {
      if (prev.includes(id)) {
        return prev.filter(userId => userId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      // In real app, call API
      // await AdminService.deleteUser(id);
      
      setUsers(users.filter(user => user.id !== id));
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      alert('Please select users to delete.');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
      return;
    }
    
    try {
      // In real app, call API for bulk delete
      // await AdminService.bulkDeleteUsers(selectedUsers);
      
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      alert(`${selectedUsers.length} users deleted successfully!`);
    } catch (error) {
      console.error('Error deleting users:', error);
      alert('Error deleting users. Please try again.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // In real app, update via API
      // await AdminService.updateUserStatus(id, newStatus);
      
      setUsers(users.map(user =>
        user.id === id ? { ...user, status: newStatus } : user
      ));
      alert('User status updated!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating user status.');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      // In real app, update via API
      // await AdminService.updateUserRole(id, newRole);
      
      setUsers(users.map(user =>
        user.id === id ? { ...user, role: newRole } : user
      ));
      alert('User role updated!');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Error updating user role.');
    }
  };

  const handleSendMessage = (email) => {
    const message = prompt(`Enter message for ${email}:`);
    if (message) {
      alert(`Message sent to ${email}: "${message}"`);
      // In real app, send email notification
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={styles.loadingText}>Loading users...</p>
      </div>
    );
  }

  return (
    <div style={styles.adminUsersPage}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>
          <Icon style={styles.titleIcon}>👥</Icon>
          Users Management
        </h1>
        <div style={styles.headerActions}>
          <button
            style={styles.deleteButton}
            onClick={handleBulkDelete}
            disabled={selectedUsers.length === 0}
          >
            <Icon style={styles.buttonIcon}>🗑️</Icon>
            Delete Selected ({selectedUsers.length})
          </button>
          <Link to="/admin/users/add" style={styles.addButton}>
            <Icon style={styles.buttonIcon}>➕</Icon>
            Add New User
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div style={styles.filtersSection}>
        <div className="row" style={styles.filterRow}>
          <div className="col-md-6">
            <div style={styles.searchBox}>
              <Icon style={styles.searchIcon}>🔍</Icon>
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              style={styles.filterSelect}
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              {userRoles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              style={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {userStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={styles.filterSummary}>
          <span style={styles.summaryBadge}>
            Total: {users.length}
          </span>
          <span style={{...styles.summaryBadge, backgroundColor: '#28a745'}}>
            Active: {users.filter(u => u.status === 'ACTIVE').length}
          </span>
          <span style={{...styles.summaryBadge, backgroundColor: '#ffc107'}}>
            Agents: {users.filter(u => u.role === 'AGENT').length}
          </span>
          <span style={{...styles.summaryBadge, backgroundColor: '#dc3545'}}>
            Suspended: {users.filter(u => u.status === 'SUSPENDED').length}
          </span>
          <span style={{...styles.summaryBadge, backgroundColor: '#17a2b8'}}>
            Premium: {users.filter(u => u.role === 'PREMIUM_USER').length}
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div style={styles.tableContainer}>
        <div className="table-responsive">
          <table className="table table-hover" style={styles.usersTable}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="form-check-input"
                  />
                </th>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status</th>
                <th>Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id} style={selectedUsers.includes(user.id) ? styles.selectedRow : {}}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="form-check-input"
                      />
                    </td>
                    <td>
                      <div style={styles.userInfo}>
                        <div style={styles.avatarContainer}>
                          <div style={styles.avatar}>
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div style={styles.userDetails}>
                          <div style={styles.userName}>
                            {user.name}
                          </div>
                          <div style={styles.userMeta}>
                            <small>
                              ID: {user.id} | Joined: {formatDate(user.joinedDate)}
                            </small>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={styles.contactInfo}>
                        <div style={styles.contactItem}>
                          <Icon style={styles.contactIcon}>📧</Icon>
                          <a href={`mailto:${user.email}`} style={styles.contactLink}>
                            {user.email}
                          </a>
                        </div>
                        <div style={styles.contactItem}>
                          <Icon style={styles.contactIcon}>📱</Icon>
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={styles.roleCell}>
                        <span style={{...styles.roleBadge, ...getRoleStyle(user.role)}}>
                          {userRoles.find(r => r.value === user.role)?.label || user.role}
                        </span>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          style={styles.roleSelect}
                        >
                          {userRoles.map(role => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div style={styles.statusCell}>
                        <span style={{...styles.statusBadge, ...getStatusStyle(user.status)}}>
                          {userStatuses.find(s => s.value === user.status)?.label || user.status}
                        </span>
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value)}
                          style={styles.statusSelect}
                        >
                          {userStatuses.map(status => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div style={styles.activityInfo}>
                        <div style={styles.activityItem}>
                          <Icon style={styles.activityIcon}>🏠</Icon>
                          <span>{user.properties} properties</span>
                        </div>
                        <div style={styles.activityItem}>
                          <Icon style={styles.activityIcon}>📅</Icon>
                          <span>{user.bookings} bookings</span>
                        </div>
                        <div style={styles.activityItem}>
                          <Icon style={styles.activityIcon}>🕒</Icon>
                          <small>Last login: {formatDateTime(user.lastLogin)}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={styles.actionButtons}>
                        <button
                          style={styles.actionButton}
                          onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                          title="Edit User"
                        >
                          <Icon>✏️</Icon>
                        </button>
                        <button
                          style={{...styles.actionButton, backgroundColor: '#17a2b8', borderColor: '#17a2b8'}}
                          onClick={() => navigate(`/admin/users/view/${user.id}`)}
                          title="View Profile"
                        >
                          <Icon>👁️</Icon>
                        </button>
                        <button
                          style={{...styles.actionButton, backgroundColor: '#28a745', borderColor: '#28a745'}}
                          onClick={() => handleSendMessage(user.email)}
                          title="Send Message"
                        >
                          <Icon>✉️</Icon>
                        </button>
                        <button
                          style={{...styles.actionButton, backgroundColor: '#dc3545', borderColor: '#dc3545'}}
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                        >
                          <Icon>🗑️</Icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={styles.emptyState}>
                    <div style={styles.emptyStateContent}>
                      <Icon style={styles.emptyIcon}>👥</Icon>
                      <h4 style={styles.emptyTitle}>No users found</h4>
                      <p style={styles.emptyText}>Try adjusting your filters or add a new user.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <nav style={styles.paginationSection}>
            <ul className="pagination" style={styles.pagination}>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)} style={styles.pageLink}>
                  Previous
                </button>
              </li>
              
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(index + 1)}
                    style={{...styles.pageLink, ...(currentPage === index + 1 ? styles.activePageLink : {})}}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)} style={styles.pageLink}>
                  Next
                </button>
              </li>
            </ul>
            <div style={styles.paginationInfo}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

// Helper function to get role badge styles
const getRoleStyle = (role) => {
  const roleStyles = {
    'USER': { backgroundColor: '#e3f2fd', color: '#1565c0' },
    'AGENT': { backgroundColor: '#e8f5e9', color: '#2e7d32' },
    'PREMIUM_USER': { backgroundColor: '#fff3e0', color: '#ef6c00' },
    'ADMIN': { backgroundColor: '#ffebee', color: '#c62828' },
    'MODERATOR': { backgroundColor: '#e0f7fa', color: '#006064' }
  };
  return roleStyles[role] || { backgroundColor: '#f5f5f5', color: '#616161' };
};

// Helper function to get status badge styles
const getStatusStyle = (status) => {
  const statusStyles = {
    'ACTIVE': { backgroundColor: '#d4edda', color: '#155724' },
    'INACTIVE': { backgroundColor: '#e2e3e5', color: '#383d41' },
    'SUSPENDED': { backgroundColor: '#f8d7da', color: '#721c24' },
    'PENDING': { backgroundColor: '#fff3cd', color: '#856404' },
    'BLOCKED': { backgroundColor: '#d6d8d9', color: '#1b1e21' }
  };
  return statusStyles[status] || { backgroundColor: '#f5f5f5', color: '#616161' };
};

// Styles
const styles = {
  adminUsersPage: {
    padding: '20px',
    background: '#f8f9fa',
    minHeight: '100vh'
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  pageTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.8rem',
    display: 'flex',
    alignItems: 'center'
  },
  titleIcon: {
    marginRight: '10px'
  },
  headerActions: {
    display: 'flex',
    gap: '10px'
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  buttonIcon: {
    marginRight: '8px'
  },
  filtersSection: {
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  filterRow: {
    marginBottom: '15px'
  },
  searchBox: {
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1rem',
    color: '#666'
  },
  searchInput: {
    width: '100%',
    padding: '10px 10px 10px 40px',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    fontSize: '1rem'
  },
  filterSelect: {
    width: '100%',
    padding: '10px',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  filterSummary: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '15px'
  },
  summaryBadge: {
    padding: '5px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  tableContainer: {
    background: 'white',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  usersTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  selectedRow: {
    backgroundColor: 'rgba(13, 110, 253, 0.05) !important'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatarContainer: {
    flexShrink: 0
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  userDetails: {
    flex: 1
  },
  userName: {
    fontWeight: '600',
    marginBottom: '4px',
    color: '#2c3e50'
  },
  userMeta: {
    fontSize: '0.85rem',
    color: '#666'
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem'
  },
  contactIcon: {
    fontSize: '0.9rem',
    color: '#666'
  },
  contactLink: {
    color: '#007bff',
    textDecoration: 'none'
  },
  roleCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  roleBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
    textAlign: 'center'
  },
  roleSelect: {
    fontSize: '0.85rem',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #dee2e6',
    backgroundColor: 'white'
  },
  statusCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
    textAlign: 'center'
  },
  statusSelect: {
    fontSize: '0.85rem',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #dee2e6',
    backgroundColor: 'white'
  },
  activityInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#666'
  },
  activityIcon: {
    fontSize: '0.9rem'
  },
  actionButtons: {
    display: 'flex',
    gap: '5px'
  },
  actionButton: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px'
  },
  emptyStateContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#dee2e6'
  },
  emptyTitle: {
    color: '#6c757d',
    marginBottom: '10px'
  },
  emptyText: {
    color: '#adb5bd'
  },
  paginationSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #dee2e6'
  },
  pagination: {
    margin: 0,
    display: 'flex',
    gap: '5px'
  },
  pageLink: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#007bff',
    border: '1px solid #dee2e6',
    textDecoration: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  activePageLink: {
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff'
  },
  paginationInfo: {
    color: '#666',
    fontSize: '0.9rem'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    color: '#666'
  },
  loadingText: {
    marginTop: '15px'
  }
};

export default AdminUsers;