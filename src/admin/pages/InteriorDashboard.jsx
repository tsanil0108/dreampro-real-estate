import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import AdminService from '../services/AdminService';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const InteriorDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0,
    furnitureItems: 0,
    designTemplates: 0,
    teamMembers: 0,
    pendingConsultations: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentData, setRecentData] = useState({
    recentProjects: [],
    recentBookings: [],
    recentDesigns: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getInteriorDashboardStats();
      setStats(data.stats);
      setRecentData(data.recentData);
    } catch (error) {
      console.error('Error fetching interior dashboard data:', error);
      // Mock data for demonstration
      setStats({
        totalProjects: 42,
        activeProjects: 18,
        completedProjects: 24,
        totalRevenue: 1250000,
        furnitureItems: 256,
        designTemplates: 89,
        teamMembers: 12,
        pendingConsultations: 8
      });
      setRecentData({
        recentProjects: [
          {
            id: 1,
            title: 'Modern Apartment Renovation',
            client: 'John Smith',
            type: 'Residential',
            status: 'In Progress',
            startDate: '2024-01-15',
            budget: 50000
          },
          {
            id: 2,
            title: 'Office Space Redesign',
            client: 'Tech Corp Inc',
            type: 'Commercial',
            status: 'Planning',
            startDate: '2024-01-20',
            budget: 120000
          },
          {
            id: 3,
            title: 'Luxury Villa Interior',
            client: 'Michael Johnson',
            type: 'Residential',
            status: 'Completed',
            startDate: '2023-12-10',
            budget: 85000
          },
          {
            id: 4,
            title: 'Restaurant Theme Design',
            client: 'Food Paradise',
            type: 'Restaurant',
            status: 'In Progress',
            startDate: '2024-01-05',
            budget: 65000
          }
        ],
        recentDesigns: [
          {
            id: 1,
            title: 'Minimalist Living Room',
            category: 'Modern',
            image: '/design1.jpg'
          },
          {
            id: 2,
            title: 'Industrial Kitchen',
            category: 'Industrial',
            image: '/design2.jpg'
          },
          {
            id: 3,
            title: 'Coastal Bedroom',
            category: 'Coastal',
            image: '/design3.jpg'
          },
          {
            id: 4,
            title: 'Scandinavian Office',
            category: 'Scandinavian',
            image: '/design4.jpg'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const interiorStatsCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: 15.2,
      icon: <Icon>📋</Icon>,
      color: '#4e73df'
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      change: 8.3,
      icon: <Icon>🎨</Icon>,
      color: '#1cc88a'
    },
    {
      title: 'Completed',
      value: stats.completedProjects,
      change: 22.7,
      icon: <Icon>✅</Icon>,
      color: '#36b9cc'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: 18.5,
      icon: <Icon>💰</Icon>,
      color: '#f6c23e'
    },
    {
      title: 'Furniture Items',
      value: stats.furnitureItems,
      change: 5.4,
      icon: <Icon>🛋️</Icon>,
      color: '#e74a3b'
    },
    {
      title: 'Design Templates',
      value: stats.designTemplates,
      change: 12.8,
      icon: <Icon>🎨</Icon>,
      color: '#6f42c1'
    },
    {
      title: 'Team Members',
      value: stats.teamMembers,
      change: 3.2,
      icon: <Icon>👥</Icon>,
      color: '#20c9a6'
    },
    {
      title: 'Pending Consultations',
      value: stats.pendingConsultations,
      change: -2.1,
      icon: <Icon>📅</Icon>,
      color: '#fd7e14'
    }
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={styles.loadingText}>Loading interior dashboard data...</p>
      </div>
    );
  }

  return (
    <div style={styles.interiorDashboard}>
      <div style={styles.dashboardHeader}>
        <h1 style={styles.dashboardTitle}>
          <Icon style={styles.titleIcon}>🎨</Icon>
          Interior Work Dashboard
        </h1>
        <div style={styles.dashboardActions}>
          <button 
            style={styles.refreshButton}
            onClick={fetchDashboardData}
          >
            <Icon style={styles.buttonIcon}>📊</Icon>
            Refresh Data
          </button>
          <div style={styles.dateFilter}>
            <select style={styles.dateSelect}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        {interiorStatsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      <div style={styles.dashboardSections}>
        {/* Recent Projects */}
        <div style={styles.dashboardCard}>
          <div style={styles.cardHeader}>
            <h5 style={styles.cardTitle}>
              <Icon style={styles.cardIcon}>📋</Icon>
              Recent Projects
            </h5>
            <a href="/admin/interior/projects" style={styles.viewAllLink}>
              View All
            </a>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.projectsList}>
              {recentData.recentProjects.map(project => (
                <div key={project.id} style={styles.projectItem}>
                  <div style={styles.projectInfo}>
                    <div style={styles.projectTitle}>{project.title}</div>
                    <div style={styles.projectClient}>{project.client}</div>
                    <div style={styles.projectMeta}>
                      <span style={styles.projectTypeBadge}>{project.type}</span>
                      <span style={styles.projectStatusBadge}>{project.status}</span>
                      <span style={styles.projectDate}>
                        {new Date(project.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div style={styles.projectActions}>
                    <button style={styles.viewButton}>View</button>
                    <button style={styles.updateButton}>Update</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Gallery */}
        <div style={styles.dashboardCard}>
          <div style={styles.cardHeader}>
            <h5 style={styles.cardTitle}>
              <Icon style={styles.cardIcon}>🎨</Icon>
              Design Gallery
            </h5>
            <a href="/admin/interior/designs" style={styles.viewAllLink}>
              View All
            </a>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.designsGrid}>
              {recentData.recentDesigns.slice(0, 4).map(design => (
                <div key={design.id} style={styles.designItem}>
                  <div style={styles.designImagePlaceholder}>
                    <Icon style={styles.designPlaceholderIcon}>🖼️</Icon>
                    {design.title}
                  </div>
                  <div style={styles.designOverlay}>
                    <div style={styles.designOverlayTitle}>{design.title}</div>
                    <div style={styles.designCategory}>{design.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Furniture Inventory */}
        <div style={styles.dashboardCard}>
          <div style={styles.cardHeader}>
            <h5 style={styles.cardTitle}>
              <Icon style={styles.cardIcon}>🛋️</Icon>
              Furniture Inventory
            </h5>
            <a href="/admin/interior/furniture" style={styles.viewAllLink}>
              Manage
            </a>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.inventoryStats}>
              <div style={styles.inventoryItem}>
                <Icon style={styles.inventoryIcon}>🛋️</Icon>
                <div>
                  <div style={styles.inventoryCount}>142</div>
                  <div style={styles.inventoryLabel}>Sofas</div>
                </div>
              </div>
              <div style={styles.inventoryItem}>
                <Icon style={styles.inventoryIcon}>🚿</Icon>
                <div>
                  <div style={styles.inventoryCount}>89</div>
                  <div style={styles.inventoryLabel}>Bathroom Items</div>
                </div>
              </div>
              <div style={styles.inventoryItem}>
                <Icon style={styles.inventoryIcon}>💡</Icon>
                <div>
                  <div style={styles.inventoryCount}>256</div>
                  <div style={styles.inventoryLabel}>Lighting</div>
                </div>
              </div>
              <div style={styles.inventoryItem}>
                <Icon style={styles.inventoryIcon}>📦</Icon>
                <div>
                  <div style={styles.inventoryCount}>432</div>
                  <div style={styles.inventoryLabel}>Materials</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions for Interior Work */}
      <div style={styles.quickActions}>
        <h4 style={styles.quickActionsTitle}>
          <Icon style={styles.actionsIcon}>🔧</Icon>
          Quick Actions
        </h4>
        <div style={styles.actionsGrid}>
          <a href="/admin/interior/projects/add" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#4e73df'}}>📋</div>
            <span>New Project</span>
          </a>
          <a href="/admin/interior/designs/add" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#6f42c1'}}>🎨</div>
            <span>Add Design</span>
          </a>
          <a href="/admin/interior/furniture/add" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#e74a3b'}}>🛋️</div>
            <span>Add Furniture</span>
          </a>
          <a href="/admin/interior/bookings" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#fd7e14'}}>📅</div>
            <span>Consultations</span>
          </a>
          <a href="/admin/interior/teams" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#20c9a6'}}>👥</div>
            <span>Design Teams</span>
          </a>
          <a href="/admin/interior/warehouse" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#858796'}}>📦</div>
            <span>Warehouse</span>
          </a>
          <a href="/admin/interior/materials" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#f6c23e'}}>🧱</div>
            <span>Materials</span>
          </a>
          <a href="/admin/interior/reports" style={styles.actionCard}>
            <div style={{...styles.actionIcon, backgroundColor: '#36b9cc'}}>📈</div>
            <span>Generate Report</span>
          </a>
        </div>
      </div>

      {/* Design Team Status */}
      <div style={styles.dashboardCard}>
        <div style={styles.cardHeader}>
          <h5 style={styles.cardTitle}>
            <Icon style={styles.cardIcon}>👥</Icon>
            Design Team Status
          </h5>
        </div>
        <div style={styles.cardBody}>
          <div style={styles.teamStatus}>
            <div style={styles.teamMember}>
              <div style={styles.memberAvatar}>JD</div>
              <div style={styles.memberInfo}>
                <div style={styles.memberName}>John Designer</div>
                <div style={styles.memberRole}>Lead Designer</div>
              </div>
              <div style={styles.memberStatus}>
                <span style={styles.statusBadge}>Available</span>
                <div style={styles.memberProject}>3 Projects</div>
              </div>
            </div>
            <div style={styles.teamMember}>
              <div style={styles.memberAvatar}>SA</div>
              <div style={styles.memberInfo}>
                <div style={styles.memberName}>Sarah Architect</div>
                <div style={styles.memberRole}>Architect</div>
              </div>
              <div style={styles.memberStatus}>
                <span style={styles.statusBadge}>Busy</span>
                <div style={styles.memberProject}>5 Projects</div>
              </div>
            </div>
            <div style={styles.teamMember}>
              <div style={styles.memberAvatar}>MD</div>
              <div style={styles.memberInfo}>
                <div style={styles.memberName}>Mike Decorator</div>
                <div style={styles.memberRole}>Interior Decorator</div>
              </div>
              <div style={styles.memberStatus}>
                <span style={styles.statusBadge}>Available</span>
                <div style={styles.memberProject}>2 Projects</div>
              </div>
            </div>
            <div style={styles.teamMember}>
              <div style={styles.memberAvatar}>LM</div>
              <div style={styles.memberInfo}>
                <div style={styles.memberName}>Lisa Manager</div>
                <div style={styles.memberRole}>Project Manager</div>
              </div>
              <div style={styles.memberStatus}>
                <span style={{...styles.statusBadge, backgroundColor: '#ffc107', color: '#000'}}>
                  On Leave
                </span>
                <div style={styles.memberProject}>0 Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  interiorDashboard: {
    padding: '20px',
    background: '#f8f9fa',
    minHeight: '100vh'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  dashboardTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.8rem',
    display: 'flex',
    alignItems: 'center'
  },
  titleIcon: {
    marginRight: '10px',
    fontSize: '1.5rem'
  },
  dashboardActions: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  refreshButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500'
  },
  buttonIcon: {
    marginRight: '8px',
    fontSize: '1rem'
  },
  dateFilter: {
    minWidth: '150px'
  },
  dateSelect: {
    width: '100%',
    padding: '10px',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    backgroundColor: 'white',
    color: '#495057',
    fontSize: '0.9rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  dashboardSections: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
    marginBottom: '30px'
  },
  dashboardCard: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#f8f9fa'
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#2c3e50',
    display: 'flex',
    alignItems: 'center'
  },
  cardIcon: {
    marginRight: '10px',
    fontSize: '1.1rem'
  },
  viewAllLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  cardBody: {
    padding: '20px'
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa'
  },
  projectInfo: {
    flex: 1
  },
  projectTitle: {
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '5px',
    fontSize: '1rem'
  },
  projectClient: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '8px'
  },
  projectMeta: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  projectTypeBadge: {
    padding: '3px 10px',
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  projectStatusBadge: {
    padding: '3px 10px',
    backgroundColor: '#fff3cd',
    color: '#856404',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  projectDate: {
    fontSize: '0.85rem',
    color: '#999'
  },
  projectActions: {
    display: 'flex',
    gap: '8px'
  },
  viewButton: {
    padding: '5px 12px',
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  updateButton: {
    padding: '5px 12px',
    backgroundColor: 'transparent',
    color: '#28a745',
    border: '1px solid #28a745',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  designsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px'
  },
  designItem: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '150px',
    backgroundColor: '#e9ecef',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  designImagePlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  designPlaceholderIcon: {
    fontSize: '2rem',
    marginBottom: '10px'
  },
  designOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '10px'
  },
  designOverlayTitle: {
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '3px'
  },
  designCategory: {
    fontSize: '0.8rem',
    color: '#ddd'
  },
  inventoryStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  inventoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  inventoryIcon: {
    fontSize: '2rem'
  },
  inventoryCount: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '5px'
  },
  inventoryLabel: {
    fontSize: '0.9rem',
    color: '#666'
  },
  quickActions: {
    background: 'white',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  quickActionsTitle: {
    marginBottom: '20px',
    color: '#2c3e50',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem'
  },
  actionsIcon: {
    marginRight: '10px',
    fontSize: '1.2rem'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px'
  },
  actionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#2c3e50',
    transition: 'all 0.3s ease'
  },
  actionIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: 'white'
  },
  teamStatus: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  teamMember: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  memberAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  memberInfo: {
    flex: 1
  },
  memberName: {
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '3px'
  },
  memberRole: {
    fontSize: '0.9rem',
    color: '#666'
  },
  memberStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '5px'
  },
  statusBadge: {
    padding: '4px 12px',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  memberProject: {
    fontSize: '0.85rem',
    color: '#666'
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

export default InteriorDashboard;